"""Supervisor authorization and safety checks without touching local services."""
import http.client
from http.server import ThreadingHTTPServer
import json
from pathlib import Path
import tempfile
import threading
import unittest
from unittest.mock import patch

from control_server import ServiceControl, make_handler
from manage import initialize, write_config


class FakeControl(ServiceControl):
    def __init__(self):
        self.lock = threading.Lock()
        self.calls = []
        self.pending = 0
        self.managed = True
        self.llm_installed = True
        self.operation = None
        self.llama_running = True

    def config(self):
        return {'llm_model_id': 'qwen35-9b-q4km' if self.llm_installed else ''}

    def models(self):
        return [{'id': 'qwen35-9b-q4km', 'available': True}, {'id': 'qwen35-35b-a3b-q4km', 'available': True},
                {'id': 'qwen3-4b-q4km', 'available': False}]

    def _freeze_worker(self, before, token):
        if not self.managed:
            raise RuntimeError('Unmanaged worker')
        return True

    def _resume_worker(self, token):
        pass

    def status(self, token):
        return {'worker': {'running': True, 'managed': self.managed, 'pending': self.pending, 'responding': True,
                    'ocr_ready': True},
                'llama': {'running': self.llama_running, 'managed': True, 'ready': True, 'model': 'test'}}

    def _operate_one(self, service, action):
        self.calls.append((service, action))


class ControlTest(unittest.TestCase):
    def setUp(self):
        self.control = FakeControl()
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), make_handler(self.control, 'secret'))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()

    def call(self, method, path, body=None, token='secret'):
        client = http.client.HTTPConnection('127.0.0.1', self.server.server_port)
        headers = {'Authorization': 'Bearer ' + token}
        if body is not None:
            body = json.dumps(body)
            headers['Content-Type'] = 'application/json'
        client.request(method, path, body=body, headers=headers)
        response = client.getresponse()
        result = response.status, json.loads(response.read())
        client.close()
        return result

    def test_auth_and_allowlist(self):
        self.assertEqual(self.call('GET', '/status', token='wrong')[0], 401)
        self.assertEqual(self.call('GET', '/status')[0], 200)
        self.assertEqual(self.call('POST', '/control', {'service': '../worker', 'action': 'stop'})[0], 400)
        self.assertEqual(self.call('POST', '/control', {'service': 'worker', 'action': 'shell'})[0], 400)
        self.assertEqual(self.control.calls, [])

    def test_pending_job_blocks_stop_and_restart(self):
        self.control.pending = 1
        for service in ('worker', 'llama'):
            for action in ('stop', 'restart'):
                self.assertEqual(self.call('POST', '/control', {'service': service, 'action': action})[0], 409)
        self.assertEqual(self.control.calls, [])

    def test_unmanaged_running_worker_cannot_be_stopped(self):
        self.control.managed = False
        self.assertEqual(self.call('POST', '/control', {'service': 'worker', 'action': 'stop'})[0], 409)
        self.assertEqual(self.control.calls, [])

    def test_managed_service_restart(self):
        self.assertEqual(self.call('POST', '/control', {'service': 'llama', 'action': 'restart'})[0], 200)
        self.assertEqual(self.control.calls, [('llama', 'restart')])

    def test_ocr_only_does_not_start_an_uninstalled_llm(self):
        self.control.llm_installed = False
        self.assertEqual(self.call('POST', '/control', {'service': 'llama', 'action': 'start'})[0], 400)
        self.assertEqual(self.control.calls, [])

    def test_model_parameters_are_restricted_and_unavailable_models_do_not_start(self):
        for body in (
            {'service': 'llama', 'action': 'start', 'model_id': '../private.gguf'},
            {'service': 'worker', 'action': 'start', 'model_id': 'qwen35-9b-q4km'},
            {'service': 'llama', 'action': 'stop', 'model_id': 'qwen35-9b-q4km'},
            {'service': 'llama', 'action': 'start', 'model_id': []},
            {'service': 'llama', 'action': 'start', 'model_id': 'qwen3-4b-q4km'},
            {'service': 'llama', 'action': 'start', 'command': 'anything'},
        ):
            with self.subTest(body=body):
                self.assertEqual(self.call('POST', '/control', body)[0], 400)
        self.assertEqual(self.control.calls, [])

    def test_model_change_requires_stopped_llm_and_idle_worker(self):
        body = {'service': 'llama', 'action': 'start', 'model_id': 'qwen35-35b-a3b-q4km'}
        self.assertEqual(self.call('POST', '/control', body)[0], 409)
        self.control.llama_running = False
        self.control.pending = 1
        self.assertEqual(self.call('POST', '/control', body)[0], 409)
        self.assertEqual(self.control.calls, [])

    def test_concurrent_operation_is_rejected_without_waiting(self):
        with self.control.lock:
            self.assertEqual(self.call('POST', '/control', {'service': 'worker', 'action': 'start'})[0], 409)


class TransactionControl(ServiceControl):
    """Simulated processes, real initialization/configuration/rollback on a private fixture."""
    def __init__(self, runtime):
        with patch('manage.verify', return_value=True):
            initialize(runtime, 'qwen35-9b-q4km')
        super().__init__(runtime)
        self.services = {'worker': True, 'llama': False}
        self.calls = []
        self.paused = False
        self.fail_verification = False
        self.fail_start = False
        self.unknown_worker = False

    def models(self):
        return [{'id': 'qwen35-9b-q4km', 'available': True}, {'id': 'qwen35-35b-a3b-q4km', 'available': True}]

    def health(self, url, token=None):
        if ':8766/' in url:
            if not self.services['worker'] or self.unknown_worker: return None
            return {'ocr_ready': True, 'pending': 0, 'maintenance': self.paused, 'llm_ready': self.services['llama']}
        return {} if self.services['llama'] else None

    def _pid_state(self, name):
        return self.services[name]

    def _maintenance(self, enabled, token):
        self.paused = enabled

    def _operate_one(self, service, action):
        self.calls.append((service, action, self.config()['llm_model_id']))
        if service == 'llama' and action == 'start' and self.fail_start:
            raise RuntimeError('Start failed')
        self.services[service] = action == 'start'
        if service == 'worker' and action == 'start': self.paused = False

    def _run(self, command):
        self.calls.append(('initialize', command[-1]))
        with patch('manage.verify', return_value=not self.fail_verification):
            initialize(self.runtime, command[-1])


class ModelTransactionTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.control = TransactionControl(Path(self.temp.name))
        config = self.control.config()
        config['llm_backend'] = 'metal'
        write_config(self.control.runtime, config)

    def tearDown(self):
        self.temp.cleanup()

    def switch(self):
        with patch('manage.sys.platform', 'darwin'):
            return self.control.operate('llama', 'start', 'secret', 'qwen35-35b-a3b-q4km')

    def test_worker_reloads_model_and_backend_is_preserved(self):
        status = self.switch()
        self.assertEqual(status['llama']['model_id'], 'qwen35-35b-a3b-q4km')
        self.assertEqual(status['llama']['backend'], 'metal')
        self.assertEqual(self.control.calls[-1], ('worker', 'start', 'qwen35-35b-a3b-q4km'))
        self.assertEqual(self.control.services, {'worker': True, 'llama': True})
        self.assertFalse(self.control.paused)
        self.assertIsNone(self.control.operation)

    def test_originally_stopped_worker_remains_stopped(self):
        self.control.services['worker'] = False
        self.switch()
        self.assertFalse(self.control.services['worker'])
        self.assertFalse(any(call[0] == 'worker' for call in self.control.calls))

    def test_failed_verification_and_start_restore_configuration_and_worker(self):
        original = self.control.config()
        for failure in ('fail_verification', 'fail_start'):
            setattr(self.control, failure, True)
            with self.subTest(failure=failure), self.assertRaisesRegex(RuntimeError, '元の設定'):
                self.switch()
            self.assertEqual(self.control.config(), original)
            self.assertEqual(self.control.services, {'worker': True, 'llama': False})
            self.assertFalse(self.control.paused)
            setattr(self.control, failure, False)

    def test_unknown_worker_health_prevents_shutdown(self):
        self.control.unknown_worker = True
        with self.assertRaisesRegex(RuntimeError, '確認できません'):
            self.switch()
        self.assertEqual(self.control.calls, [])

    def test_lost_pause_response_resumes_worker_without_changing_configuration(self):
        original = self.control.config()
        def maintenance(enabled, token):
            self.control.paused = enabled
            if enabled: raise RuntimeError('Response lost after pause')
        with patch.object(self.control, '_maintenance', side_effect=maintenance):
            with self.assertRaisesRegex(RuntimeError, 'Response lost'):
                self.switch()
        self.assertFalse(self.control.paused)
        self.assertEqual(self.control.config(), original)
        self.assertEqual(self.control.calls, [])

    def test_start_resumes_a_worker_left_paused_by_an_interrupted_operation(self):
        self.control.paused = True
        self.control.operate('llama', 'start', 'secret')
        self.assertFalse(self.control.paused)
        self.assertTrue(self.control.services['worker'])

    def test_status_reads_current_configuration_and_availability_without_hashing(self):
        entry = {'id': 'fixture', 'name': 'Fixture', 'filename': 'fixture.gguf', 'size_bytes': 3, 'license': 'Test'}
        file = self.control.runtime/'models/fixture.gguf'; file.parent.mkdir(exist_ok=True); file.write_bytes(b'abc')
        binary = self.control.runtime/'llama/llama-b10980/llama-server'; binary.parent.mkdir(parents=True); binary.touch()
        with patch('control_server.catalog', return_value={'llm': [entry]}):
            self.assertTrue(ServiceControl.models(self.control)[0]['available'])
            file.write_bytes(b'broken')
            self.assertFalse(ServiceControl.models(self.control)[0]['available'])
        config = self.control.config(); config.update(llm_model_id='', llm_model=''); write_config(self.control.runtime, config)
        self.assertEqual(self.control.status('secret')['llama']['model_id'], '')


if __name__ == '__main__':
    unittest.main()
