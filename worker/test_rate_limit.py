"""Per-client allowances, on their own and through the authenticated worker route."""
import json
import tempfile
import threading
import unittest
from http.server import ThreadingHTTPServer
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from rate_limit import ClientAllowance, WINDOW_SECONDS
from server import make_handler
from store import Problem, Store

KEY, OTHER = 'a' * 64, 'b' * 64


class ClientAllowanceTest(unittest.TestCase):
    def setUp(self):
        self.now = 1000.0
        self.allowance = ClientAllowance(clock=lambda: self.now)

    def take(self, key=KEY, bucket='ocr', limit=2):
        return self.allowance.handle({'key': key, 'bucket': bucket, 'limit': limit, 'action': 'take'})

    def test_limit_is_per_client_and_per_bucket(self):
        self.assertTrue(self.take()['allowed'])
        self.assertTrue(self.take()['allowed'])
        refused = self.take()
        self.assertFalse(refused['allowed'])
        self.assertEqual(refused['limit'], 2)
        self.assertEqual(refused['retry_at'], 1000 + WINDOW_SECONDS)
        self.assertEqual(refused['retry_after'], WINDOW_SECONDS)
        self.assertTrue(self.take(key=OTHER)['allowed'])
        self.assertTrue(self.take(bucket='translation')['allowed'])

    def test_window_slides(self):
        self.take()
        self.now += 10
        self.take()
        self.assertFalse(self.take()['allowed'])
        self.now = 1000 + WINDOW_SECONDS
        self.assertTrue(self.take()['allowed'])
        self.assertFalse(self.take()['allowed'])

    def test_release_returns_one_use(self):
        self.take()
        self.take()
        self.allowance.handle({'key': KEY, 'bucket': 'ocr', 'limit': 2, 'action': 'release'})
        self.assertTrue(self.take()['allowed'])
        self.assertFalse(self.take()['allowed'])

    def test_release_without_use_is_harmless(self):
        self.assertEqual(self.allowance.handle({'key': KEY, 'bucket': 'ocr', 'limit': 2, 'action': 'release'}), {'allowed': True})

    def test_invalid_requests_are_refused(self):
        valid = {'key': KEY, 'bucket': 'ocr', 'limit': 2, 'action': 'take'}
        for change in ({'key': 'short'}, {'key': 1}, {'bucket': 'other'}, {'limit': 0}, {'limit': True},
                       {'limit': '2'}, {'limit': 100001}, {'action': 'reset'}):
            with self.assertRaises(Problem):
                self.allowance.handle({**valid, **change})

    def test_memory_stays_bounded(self):
        allowance = ClientAllowance(clock=lambda: self.now, max_clients=3)
        for index in range(10):
            allowance.handle({'key': f'{index:064x}', 'bucket': 'ocr', 'limit': 2, 'action': 'take'})
        self.assertLessEqual(len(allowance.clients), 3)

    def test_expired_clients_are_dropped_first(self):
        allowance = ClientAllowance(clock=lambda: self.now, max_clients=2)
        allowance.handle({'key': KEY, 'bucket': 'ocr', 'limit': 2, 'action': 'take'})
        self.now += WINDOW_SECONDS + 1
        allowance.handle({'key': OTHER, 'bucket': 'ocr', 'limit': 2, 'action': 'take'})
        allowance.handle({'key': 'c' * 64, 'bucket': 'ocr', 'limit': 2, 'action': 'take'})
        self.assertNotIn((KEY, 'ocr'), allowance.clients)
        self.assertIn((OTHER, 'ocr'), allowance.clients)


class RouteTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.store = Store(self.temp.name, {})
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), make_handler(self.store, 'x' * 40, {'image_hosts': []}))
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.url = f'http://127.0.0.1:{self.server.server_port}/client-allowance'

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.store.close()
        self.temp.cleanup()

    def post(self, body, token='x' * 40):
        request = Request(self.url, data=json.dumps(body).encode(), method='POST',
            headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
        with urlopen(request, timeout=5) as response:
            return json.load(response)

    def test_route_takes_and_refuses(self):
        body = {'key': KEY, 'bucket': 'ocr', 'limit': 1, 'action': 'take'}
        self.assertTrue(self.post(body)['allowed'])
        self.assertFalse(self.post(body)['allowed'])

    def test_route_requires_the_token(self):
        with self.assertRaises(HTTPError) as caught:
            self.post({'key': KEY, 'bucket': 'ocr', 'limit': 1, 'action': 'take'}, token='y' * 40)
        self.assertEqual(caught.exception.code, 401)

    def test_route_rejects_bad_input(self):
        with self.assertRaises(HTTPError) as caught:
            self.post({'key': 'short', 'bucket': 'ocr', 'limit': 1, 'action': 'take'})
        self.assertEqual(caught.exception.code, 400)


if __name__ == '__main__':
    unittest.main()
