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

from assets import catalog, model_entry
from manage import owned, write_config


class ServiceControl:
    def __init__(self, runtime: Path):
        self.runtime = runtime.resolve()
        self.lock = threading.Lock()
        self.operation = None
        self.config()

    def config(self):
        try:
            return json.loads((self.runtime/'config.json').read_text())
        except (OSError, ValueError) as exc:
            raise RuntimeError('実行設定を読み込めません。設置状態を確認してください。') from exc

    def models(self):
        executable = (self.runtime/'llama/llama-b10980/llama-server').is_file()
        result = []
        for entry in catalog()['llm']:
            file = self.runtime/'models'/entry['filename']
            try:
                downloaded = not file.is_symlink() and file.is_file() and file.stat().st_size == entry['size_bytes']
            except OSError:
                downloaded = False
            result.append({key: entry[key] for key in ('id', 'name', 'size_bytes', 'license')} | {
                'available': downloaded and executable,
                'availability': '取得済み' if downloaded and executable else 'LLM実行環境未導入' if not executable else '未取得・ファイル不一致',
            })
        return result

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
        config = self.config()
        worker = self.health('http://127.0.0.1:8766/health', token)
        llama = self.health(config.get('llm_url', 'http://127.0.0.1:8765').rstrip('/') + '/health') if config.get('llm_model_id') else None
        worker_managed = self._pid_state('worker')
        llama_managed = self._pid_state('llama')
        return {
            'worker': {'running': worker is not None or worker_managed, 'responding': worker is not None,
                'managed': worker_managed,
                'ocr_ready': bool(worker and worker.get('ocr_ready')),
                'pending': worker.get('pending', 0) if worker else None,
                'maintenance': bool(worker and worker.get('maintenance'))},
            'llama': {'running': llama is not None or llama_managed, 'managed': llama_managed,
                'ready': bool(worker and worker.get('llm_ready')) if worker else llama is not None,
                'model': config.get('llm_model', ''), 'model_id': config.get('llm_model_id', ''),
                'backend': config.get('llm_backend', 'cpu')},
            'models': self.models(), 'model_switch_supported': True, 'operation': self.operation,
        }

    def _maintenance(self, enabled, token):
        request = Request('http://127.0.0.1:8766/maintenance',
            data=json.dumps({'enabled': enabled}).encode(),
            headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
        try:
            with urlopen(request, timeout=5) as response:
                result = json.load(response)
            if result.get('maintenance') is not enabled:
                raise ValueError('Unexpected maintenance state')
        except (OSError, ValueError) as exc:
            raise RuntimeError('workerの新規処理受付を切り替えられません。処理完了と、workerの更新・再起動を確認してください。') from exc

    def _freeze_worker(self, before, token):
        worker = before['worker']
        if not worker['running']:
            return False
        if not worker['managed'] or not worker.get('responding') or worker['pending'] is None:
            raise RuntimeError('workerの管理状態・処理中件数を確認できません。起動方式と応答状態を確認してください。')
        try:
            self._maintenance(True, token)
        except RuntimeError:
            # A response can be lost after the worker has already paused.
            try:
                self._maintenance(False, token)
            except RuntimeError:
                pass
            raise
        return True

    def _resume_worker(self, token):
        if self._pid_state('worker'):
            self._maintenance(False, token)

    def _switch_and_start(self, model_id, before):
        previous = self.config()
        worker_running = before['worker']['running']
        try:
            if worker_running:
                self._operate_one('worker', 'stop')
            self._run([sys.executable, str(Path(__file__).with_name('manage.py')), 'init',
                '--runtime', str(self.runtime), '--model', model_id])
            self._operate_one('llama', 'start')
            if worker_running:
                self._operate_one('worker', 'start')
        except Exception as exc:
            try:
                if self._pid_state('llama'):
                    self._operate_one('llama', 'stop')
                if self._pid_state('worker') and self.config().get('llm_model_id') != previous.get('llm_model_id'):
                    self._operate_one('worker', 'stop')
                write_config(self.runtime, previous)
                if worker_running and not self._pid_state('worker'):
                    self._operate_one('worker', 'start')
            except Exception as recovery:
                raise RuntimeError('モデル切替と復旧に失敗しました。実行サービスの状態を確認してください。') from recovery
            raise RuntimeError('モデル切替に失敗しました。元の設定へ戻しました。' + str(exc)) from exc

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

    def operate(self, service: str, action: str, token: str, model_id=None) -> dict:
        if service not in ('worker', 'llama') or action not in ('start', 'stop', 'restart'):
            raise ValueError('不正なサービス操作です。')
        if model_id is not None:
            if service != 'llama' or action != 'start' or not isinstance(model_id, str):
                raise ValueError('モデルはLLMサーバの起動時にだけ選択できます。')
            try:
                model_entry(model_id)
            except ValueError as exc:
                raise ValueError('登録されていないモデルです。') from exc
            if not any(model['id'] == model_id and model['available'] for model in self.models()):
                raise ValueError('モデルまたはLLM実行環境が未導入です。取得済みモデルを選択してください。')
        if not self.lock.acquire(blocking=False):
            raise RuntimeError('別のサービス操作を実行中です。完了後に操作してください。')
        paused = False
        self.operation = 'model-start' if model_id else service + '-' + action
        try:
            before = self.status(token)
            changing = model_id is not None and model_id != self.config().get('llm_model_id')
            if changing and before['llama']['running']:
                raise RuntimeError('LLMサーバを停止してからモデルを変更してください。')
            if service == 'llama' and action in ('start', 'restart') and not (model_id or self.config().get('llm_model_id')):
                raise ValueError('ローカルLLMは未導入です。モデルを導入してから起動してください。')
            if (action in ('stop', 'restart') or changing) and (before['worker']['pending'] or 0) > 0:
                raise RuntimeError('処理中のジョブがあります。完了後に停止・再起動してください。')
            if action in ('stop', 'restart') and before[service]['running'] and not before[service]['managed']:
                raise RuntimeError('このプロセスは運用サービスの管理外です。起動方式を確認してください。')
            if action == 'start' and before[service]['running']:
                return before
            if action in ('stop', 'restart') or changing or before['worker'].get('maintenance'):
                paused = self._freeze_worker(before, token)
            if changing:
                self._switch_and_start(model_id, before)
            else:
                self._operate_one(service, action)
            return self.status(token)
        finally:
            try:
                if paused:
                    self._resume_worker(token)
            finally:
                self.operation = None
                self.lock.release()


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
            self.connection.settimeout(305)
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
                    if set(body) - {'service', 'action', 'model_id'}:
                        raise ValueError('未対応の操作項目です。')
                    if 'model_id' in body and not isinstance(body['model_id'], str):
                        raise ValueError('モデルIDには文字列を指定してください。')
                    result = control.operate(body.get('service'), body.get('action'), token, body.get('model_id'))
                    result['operation'] = None
                    if result.get('worker'):
                        result['worker']['maintenance'] = False
                    return self.respond(200, result)
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
