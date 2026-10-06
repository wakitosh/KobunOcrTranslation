"""Supervisor authorization and safety checks without touching local services."""
import http.client
from http.server import ThreadingHTTPServer
import json
import threading
import unittest

from control_server import ServiceControl, make_handler


class FakeControl(ServiceControl):
    def __init__(self):
        self.lock = threading.Lock()
        self.calls = []
        self.pending = 0
        self.managed = True

    def status(self, token):
        return {'worker': {'running': True, 'managed': self.managed, 'pending': self.pending,
                    'ocr_ready': True},
                'llama': {'running': True, 'managed': True, 'ready': True, 'model': 'test'}}

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


if __name__ == '__main__':
    unittest.main()
