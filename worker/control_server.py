"""Small authenticated supervisor for the Omeka module's service controls.

Run separately from the OCR worker, so a stopped worker can be started again.
Only fixed service names and actions are accepted; no caller supplied commands.
"""
from __future__ import annotations

import argparse
import hmac
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import subprocess
import sys
import threading
from urllib.error import URLError
from urllib.request import Request, urlopen

from manage import owned


class ServiceControl:
    def __init__(self, runtime: Path):
        self.runtime = runtime.resolve()
        self.lock = threading.Lock()
        config = json.loads((self.runtime/'config.json').read_text())
        self.llm_url = config.get('llm_url', 'http://127.0.0.1:8765').rstrip('/')
        self.llm_installed = config.get('llm_model_id') != ''

    def health(self, url: str, token: str | None = None) -> dict | None:
        headers = {'Authorization': 'Bearer ' + token} if token else {}
        try:
            with urlopen(Request(url, headers=headers), timeout=2) as response:
                return json.load(response) if response.status == 200 else None
        except (OSError, ValueError, URLError):
            return None

    def _pid_state(self, name: str) -> bool:
        path = self.runtime/'processes.json'
        try:
            entry = json.loads(path.read_text()).get(name)
            return bool(entry and owned(name, entry))
        except (OSError, ValueError, KeyError):
            return False

    def status(self, token: str) -> dict:
        worker = self.health('http://127.0.0.1:8766/health', token)
        llama = self.health(self.llm_url + '/health') if self.llm_installed else None
        worker_managed = self._pid_state('worker')
        llama_managed = self._pid_state('llama')
        return {
            'worker': {'running': worker is not None or worker_managed, 'responding': worker is not None,
                'managed': worker_managed,
                'ocr_ready': bool(worker and worker.get('ocr_ready')),
                'pending': worker.get('pending', 0) if worker else None},
            'llama': {'running': llama is not None or llama_managed, 'managed': llama_managed,
                'ready': bool(worker and worker.get('llm_ready')) if worker else llama is not None,
                'model': worker.get('llm_model', '') if worker else ''},
        }

    def _run(self, command: list[str]) -> None:
        result = subprocess.run(command, capture_output=True, text=True, timeout=120)
        if result.returncode:
            detail = (result.stderr or result.stdout).strip()[-500:]
            raise RuntimeError(detail or 'サービス操作に失敗しました。')

    def _operate_one(self, service: str, action: str) -> None:
        command = [sys.executable, str(Path(__file__).with_name('manage.py')),
                   'stop' if action == 'restart' else action, '--runtime', str(self.runtime),
                   '--service', service]
        self._run(command)
        if action == 'restart':
            command[2] = 'start'
            self._run(command)

    def operate(self, service: str, action: str, token: str) -> dict:
        if service not in ('worker', 'llama') or action not in ('start', 'stop', 'restart'):
            raise ValueError('不正なサービス操作です。')
        if service == 'llama' and action in ('start', 'restart') and not self.llm_installed:
            raise ValueError('ローカルLLMは未導入です。モデルを導入してから起動してください。')
        with self.lock:
            before = self.status(token)
            if action in ('stop', 'restart') and (before['worker']['pending'] or 0) > 0:
                raise RuntimeError('処理中のジョブがあります。完了後に停止・再起動してください。')
            if action in ('stop', 'restart') and before[service]['running'] and not before[service]['managed']:
                raise RuntimeError('このプロセスは運用サービスの管理外です。起動方式を確認してください。')
            if action == 'start' and before[service]['running']:
                return before
            self._operate_one(service, action)
            return self.status(token)


def make_handler(control: ServiceControl, token: str):
    class Handler(BaseHTTPRequestHandler):
        server_version = 'KobunControl/1'

        def respond(self, code: int, value: dict):
            body = json.dumps(value, ensure_ascii=False).encode()
            self.send_response(code)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('X-Content-Type-Options', 'nosniff')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def handle_request(self):
            self.connection.settimeout(125)
            if not hmac.compare_digest(self.headers.get('Authorization', ''), 'Bearer ' + token):
                return self.respond(401, {'error': '認証が必要です。'})
            try:
                if self.command == 'GET' and self.path == '/status':
                    return self.respond(200, control.status(token))
                if self.command == 'POST' and self.path == '/control':
                    size = int(self.headers.get('Content-Length', '0'))
                    if size < 1 or size > 512:
                        raise ValueError('JSON本文が不正です。')
                    body = json.loads(self.rfile.read(size))
                    if not isinstance(body, dict):
                        raise ValueError('JSONオブジェクトが必要です。')
                    return self.respond(200, control.operate(body.get('service'), body.get('action'), token))
                return self.respond(404, {'error': '操作が見つかりません。'})
            except (ValueError, json.JSONDecodeError) as exc:
                return self.respond(400, {'error': str(exc)})
            except (RuntimeError, subprocess.TimeoutExpired) as exc:
                return self.respond(409, {'error': str(exc)})

        do_GET = handle_request
        do_POST = handle_request

    return Handler


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime', type=Path, required=True)
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', type=int, default=8767)
    args = parser.parse_args()
    control = ServiceControl(args.runtime)
    token = (control.runtime/'backend-token').read_text().strip()
    if not token:
        raise ValueError('backend-token is empty')
    server = ThreadingHTTPServer((args.host, args.port), make_handler(control, token))
    server.serve_forever()


if __name__ == '__main__':
    main()
