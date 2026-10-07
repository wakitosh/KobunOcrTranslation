"""Authenticated local OCR service. Browsers only use Omeka's scoped PHP adapters."""
from __future__ import annotations

import argparse
import fcntl
import hmac
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import importlib.util
import json
import os
from pathlib import Path
import secrets
import threading
import time
from urllib.parse import urlsplit
import urllib.request

from store import Store, Problem
from translation_policy import worker_config


def check_image_url(url, hosts):
    try:
        uri = urlsplit(url)
        valid = uri.scheme == "https" and uri.hostname in hosts and uri.port in (None, 443)
        valid = valid and not uri.username and not uri.password and not uri.fragment and not uri.query
        if not valid:
            raise ValueError()
    except (ValueError, TypeError):
        raise Problem("許可対象外の画像URLです。")
    return url


def fetch_image(url, hosts):
    class CheckedRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            check_image_url(newurl, hosts)
            return super().redirect_request(req, fp, code, msg, headers, newurl)
    opener = urllib.request.build_opener(CheckedRedirect())
    req = urllib.request.Request(check_image_url(url, hosts), headers={"User-Agent": "Omeka-KobunOCR/0.8"})
    with opener.open(req, timeout=30) as response:
        data = response.read(20*1024*1024 + 1)
        if len(data) > 20*1024*1024:
            raise Problem("画像のサイズが20 MiBを超えます。")
        return data


def make_handler(store, token, config):
    downloads = threading.Semaphore(1)

    def require_translation_ready():
        try:
            if not config.get('llm_model_id'):
                raise ValueError('No model')
            with urllib.request.urlopen(config['llm_url'] + '/health', timeout=2) as response:
                if response.status != 200:
                    raise ValueError('Not ready')
        except Exception:
            raise Problem('現代語訳のモデルは停止中または読み込み中です。準備が整ってから再実行してください。', 503)

    def require_cache_engine(target):
        if target == 'translation':
            require_translation_ready()
        else:
            model_dir = Path(config.get('ndl_model_dir', Path(config.get('ndl_root', ''))/'src/model'))
            if (not all((model_dir/name).is_file() for name in
                ['rtmdet-s-1280x1280.onnx', 'parseq-ndl-32x384-tiny-10.onnx'])
                or importlib.util.find_spec('onnxruntime') is None):
                raise Problem('OCRの実行環境が準備されていません。管理画面で起動状態を確認してください。', 503)

    class Handler(BaseHTTPRequestHandler):
        server_version = "KobunOCR/0.1"

        def log_message(self, fmt, *args):
            # Tokens are only in headers and are never logged.
            print(f'{self.log_date_time_string()} {fmt % args}', flush=True)

        def respond(self, status, value, content_type="application/json; charset=utf-8"):
            data = value if isinstance(value, bytes) else json.dumps(value, ensure_ascii=False, allow_nan=False).encode()
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(data)

        def body(self):
            size = int(self.headers.get("Content-Length", 0))
            if size < 1 or size > 524288:
                raise Problem("JSON本文が空、または大きすぎます。")
            value = json.loads(self.rfile.read(size))
            if not isinstance(value, dict):
                raise Problem("JSONオブジェクトが必要です。")
            return value

        def process(self):
            self.connection.settimeout(45)
            if not hmac.compare_digest(self.headers.get("Authorization", ""), "Bearer " + token):
                self.respond(401, {"error": "認証が必要です。"})
                return
            try:
                parts = urlsplit(self.path).path.strip("/").split("/")
                if parts == ["health"] and self.command == "GET":
                    ready = False
                    try:
                        if config.get('llm_model_id') == '':
                            raise ValueError('Local LLM not installed')
                        with urllib.request.urlopen(config["llm_url"] + "/health", timeout=1) as response:
                            ready = response.status == 200
                    except Exception:
                        pass
                    model_dir = Path(config.get('ndl_model_dir', Path(config.get('ndl_root', ''))/'src/model'))
                    ocr = all((model_dir/name).is_file()
                        for name in ['rtmdet-s-1280x1280.onnx', 'parseq-ndl-32x384-tiny-10.onnx'])
                    ocr = ocr and importlib.util.find_spec("onnxruntime") is not None
                    self.respond(200, {"ocr_ready": ocr, "llm_ready": ready, "pending": store.pending, "max_pending": 4,
                        "worker_concurrency": 1, "ndl_revision": config["ndl_revision"], "llm_model": config["llm_model"],
                        "llm_model_id": config.get("llm_model_id", ""), 'maintenance': store.maintenance,
                        'prompt_revision': config.get('prompt_revision')})
                    return
                if parts == ['maintenance'] and self.command == 'POST':
                    self.respond(200, store.set_maintenance(self.body().get('enabled')))
                    return
                if parts == ['cache-policy']:
                    if self.command == 'POST':
                        self.respond(200, store.set_cache_policy(self.body()))
                        return
                    if self.command == 'GET':
                        self.respond(200, store.cleanup_cache())
                        return
                if parts == ['private', 'forget'] and self.command == 'POST':
                    self.respond(200, store.forget_private(self.body()))
                    return
                if parts == ["documents"]:
                    if self.command == "GET":
                        self.respond(200, store.list())
                        return
                    if self.command == "POST":
                        source = self.body()
                        if source.get('workflow') == 'assist_translation':
                            raise Problem('個人用の訳は翻刻から作成してください。')
                        for key in ("media_id", "item_id"):
                            if type(source.get(key)) is not int or source[key] <= 0:
                                raise Problem("Media IDとItem IDが必要です。")
                        check_image_url(source.get("image_url"), config["image_hosts"])
                        existing = store.existing(source)
                        if existing:
                            self.respond(200, existing)
                            return
                        if not downloads.acquire(blocking=False):
                            raise Problem("別の画像を取得中です。少し待って開き直してください。", 429)
                        try:
                            started = time.perf_counter()
                            data = fetch_image(source["image_url"], config["image_hosts"])
                            doc = store.create(source, data, (time.perf_counter()-started)*1000)
                        finally:
                            downloads.release()
                        self.respond(201, doc)
                        return
                if parts == ["documents", "find"] and self.command == "POST":
                    source = self.body()
                    for key in ("media_id", "item_id"):
                        if type(source.get(key)) is not int or source[key] <= 0:
                            raise Problem("Media IDとItem IDが必要です。")
                    check_image_url(source.get("image_url"), config["image_hosts"])
                    existing = store.existing(source)
                    if existing is None:
                        raise Problem("作業が見つかりません。", 404)
                    self.respond(200, existing)
                    return
                if len(parts) in (2, 3) and parts[0] == "documents":
                    ident = parts[1]
                    store.get(ident)
                    if len(parts) == 2 and self.command == "GET":
                        self.respond(200, store.get(ident))
                        return
                    if len(parts) == 3:
                        if parts[2] == "image" and self.command == "GET":
                            self.respond(200, (store.directory(ident)/"image.jpg").read_bytes(), "image/jpeg")
                            return
                        if parts[2] == "history" and self.command == "GET":
                            self.respond(200, store.history(ident))
                            return
                        if parts[2] == "layout" and self.command == "PUT":
                            self.respond(200, store.save_layout(ident, self.body()))
                            return
                        if parts[2] == "transcription" and self.command == "PUT":
                            self.respond(200, store.save_transcription(ident, self.body()))
                            return
                        if parts[2] == 'translation-input' and self.command == 'PUT':
                            self.respond(200, store.save_translation_input(ident, self.body()))
                            return
                        if parts[2] == 'translation' and self.command == 'PUT':
                            self.respond(200, store.save_manual_translation(ident, self.body()))
                            return
                        if parts[2] == 'translation' and self.command == 'DELETE':
                            self.respond(200, store.delete_translation(ident, self.body()))
                            return
                        if parts[2] == 'review' and self.command == 'PUT':
                            self.respond(200, store.save_review(ident, self.body()))
                            return
                        if parts[2] == 'cache' and self.command == 'POST':
                            body = self.body()
                            doc = store.manage_cache(ident, body, before_regenerate=require_cache_engine)
                            self.respond(202 if body['action'] == 'regenerate' else 200, doc)
                            return
                        if parts[2] == 'private-translation' and self.command == 'POST':
                            require_translation_ready()
                            doc, created = store.start_private_translation(ident, self.body())
                            self.respond(202 if created else 200, doc)
                            return
                        if parts[2] == "jobs" and self.command == "POST":
                            body = self.body()
                            if body.get('operation') == 'translate':
                                require_translation_ready()
                            self.respond(202, store.submit(ident, body))
                            return
                raise Problem("操作が見つかりません。", 404)
            except Problem as exc:
                self.respond(exc.status, {"error": str(exc)})
            except (ValueError, KeyError, TypeError) as exc:
                self.respond(400, {"error": "入力の形式を確認してください。"})
            except Exception as exc:
                self.log_message("%s: %s", type(exc).__name__, str(exc)[:300])
                self.respond(500, {"error": "実行部でエラーが発生しました。ログを確認してください。"})

        do_GET = process
        do_POST = process
        do_PUT = process
        do_DELETE = process

    return Handler


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--runtime", type=Path, required=True)
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8766)
    args = parser.parse_args()
    runtime = args.runtime.resolve()
    # A second process must not mark another worker's jobs as interrupted.
    lease = (runtime/"worker.lock").open("a")
    fcntl.flock(lease, fcntl.LOCK_EX | fcntl.LOCK_NB)
    config = worker_config(json.loads((runtime/"config.json").read_text()))
    token_file = runtime/"backend-token"
    if not token_file.exists():
        token_file.write_text(secrets.token_urlsafe(40))
        token_file.chmod(0o600)
    token = token_file.read_text().strip()
    if len(token) < 32:
        raise ValueError("実行部の認証トークンが短すぎます。")
    store = Store(runtime/"data", config)
    server = ThreadingHTTPServer((args.host, args.port), make_handler(store, token, config))
    print(f'Kobun OCR listening on {args.host}:{args.port}; one inference worker; private data: {runtime / "data"}', flush=True)
    try:
        server.serve_forever()
    finally:
        server.server_close()
        store.close()


if __name__ == "__main__":
    main()
