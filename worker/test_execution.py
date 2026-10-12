"""Bounded inference scheduling, browser-session admission and LLM slot sizing."""
import copy
import io
import json
from pathlib import Path
import tempfile
import threading
import time
import unittest
from http.server import ThreadingHTTPServer
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from PIL import Image
from execution_policy import DEFAULTS, validate_policy
from cache_policy import DEFAULTS as CACHE_DEFAULTS
from manage import llama_command
from store import Store, Problem
from server import make_handler


class ExecutionTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.release = threading.Event()
        self.condition = threading.Condition()
        self.calls, self.active = [], {'ocr': 0, 'llm': 0}
        self.maximum = {'ocr': 0, 'llm': 0, 'total': 0}
        self.fail = False
        self.store = Store(self.temp.name, {}, self.runner)
        image = io.BytesIO()
        Image.new('RGB', (100, 120), 'white').save(image, 'JPEG')
        self.image = image.getvalue()

    def tearDown(self):
        self.release.set()
        self.store.close()
        self.temp.cleanup()

    def runner(self, payload, folder):
        kind = 'llm' if payload['operation'] == 'translate' else 'ocr'
        with self.condition:
            self.calls.append(kind)
            self.active[kind] += 1
            self.maximum[kind] = max(self.maximum[kind], self.active[kind])
            self.maximum['total'] = max(self.maximum['total'], sum(self.active.values()))
            self.condition.notify_all()
        try:
            if not self.release.wait(5):
                raise RuntimeError('Test synchronization timeout')
            if self.fail:
                raise RuntimeError('Test inference failure')
            return {'lines': copy.deepcopy(payload['lines']), 'translation': {'text': '試験訳'}, 'metrics': {}}
        finally:
            with self.condition:
                self.active[kind] -= 1

    def doc(self, number, workflow='editorial'):
        doc = self.store.create({'media_id': number, 'item_id': 1, 'workflow': workflow,
            'image_url': 'https://example.org/page.jpg'}, self.image)
        doc['lines'] = [{'id': 'l', 'x': 10, 'y': 10, 'width': 10, 'height': 80,
                         'readingOrder': 1, 'raw': '本文'}]
        self.store.write(doc)
        return doc

    def submit(self, doc, operation='recognize', scope=None):
        return self.store.submit(doc['id'], {'operation': operation, 'base_revision': doc['revision'],
            **({'request_scope': scope} if scope else {})})

    def started(self, count):
        with self.condition:
            self.assertTrue(self.condition.wait_for(lambda: len(self.calls) >= count, 3))

    def done(self):
        self.release.set()
        with self.store._idle:
            self.assertTrue(self.store._idle.wait_for(lambda: self.store.pending == 0, 5))

    def policy(self, **changes):
        return self.store.set_execution_policy({**DEFAULTS, **changes})

    def test_individual_and_common_slots_bound_shared_and_editorial_jobs(self):
        self.store.set_cache_policy({**CACHE_DEFAULTS, 'translation_mode': 'shared'})
        self.policy(ocr_concurrency=2, llm_concurrency=2, total_concurrency=3, max_waiting=2)
        docs = [self.doc(n, 'assist' if n % 2 else 'editorial') for n in range(1, 7)]
        self.submit(docs[0]); self.submit(docs[1]); self.submit(docs[2], 'translate')
        self.started(3)
        self.assertEqual(self.active, {'ocr': 2, 'llm': 1})
        first = self.submit(docs[3]); second = self.submit(docs[4], 'translate')
        self.assertEqual(first['job']['jobs_ahead'], 3)
        self.assertEqual(second['job']['jobs_ahead'], 4)
        with self.assertRaises(Problem) as error:
            self.submit(docs[5])
        self.assertEqual(error.exception.status, 429)
        self.assertEqual(error.exception.details['error_reason'], 'queue_full')
        self.assertNotIn('job', self.store.get(docs[5]['id']))
        self.assertEqual(self.store.execution_status()['waiting'], 2)
        self.done()
        self.assertEqual(len(self.calls), 5)
        self.assertLessEqual(self.maximum['total'], 3)
        self.assertLessEqual(self.maximum['ocr'], 2)
        self.assertLessEqual(self.maximum['llm'], 2)

    def test_an_available_operation_slot_can_start_when_other_class_is_waiting(self):
        self.policy(total_concurrency=2, max_waiting=1)
        self.submit(self.doc(1)); self.started(1)
        queued = self.submit(self.doc(2))
        self.submit(self.doc(3), 'translate'); self.started(2)
        self.assertEqual(self.active, {'ocr': 1, 'llm': 1})
        self.assertEqual(self.store.get(queued['id'])['job']['status'], 'queued')
        self.done()

    def test_zero_waiting_and_limit_reduction_preserve_existing_work(self):
        self.policy(ocr_concurrency=2, total_concurrency=2, max_waiting=1)
        self.submit(self.doc(1)); self.submit(self.doc(2)); self.started(2)
        waiting = self.submit(self.doc(3))
        self.policy(max_waiting=0)
        self.assertEqual(self.store.execution_status()['running'], 2)
        self.assertEqual(self.store.execution_status()['waiting'], 1)
        with self.assertRaises(Problem): self.submit(self.doc(4))
        self.done()
        self.assertEqual(self.store.get(waiting['id'])['job']['status'], 'completed')
        self.release.clear()
        self.submit(self.doc(5))
        with self.assertRaises(Problem): self.submit(self.doc(6))
        self.done()

    def test_session_limit_spans_pages_and_operations_and_same_job_joins(self):
        self.policy(total_concurrency=3)
        first = self.doc(1, 'assist')
        self.submit(first, scope='a' * 64); self.started(1)
        joined = self.submit(first, scope='a' * 64)
        self.assertEqual(joined['job']['id'], self.store.get(first['id'])['job']['id'])
        with self.assertRaises(Problem) as error:
            self.submit(self.doc(2), 'translate', 'a' * 64)
        self.assertEqual(error.exception.details['error_reason'], 'session_busy')
        self.submit(self.doc(3), 'translate', 'b' * 64); self.started(2)
        # Viewing a result consumes no slot and does not admit another request.
        self.assertEqual(self.store.get(first['id'])['id'], first['id'])
        self.assertEqual(self.store.pending, 2)
        self.done()
        self.submit(self.doc(4), scope='a' * 64); self.done()

    def test_failure_releases_session_and_execution_slots(self):
        self.fail = True
        first = self.doc(1)
        self.submit(first, scope='a' * 64); self.done()
        self.assertEqual(self.store.get(first['id'])['job']['status'], 'error')
        self.fail = False
        second = self.doc(2)
        self.submit(second, scope='a' * 64); self.done()
        self.assertEqual(self.store.get(second['id'])['job']['status'], 'completed')

    def test_live_llm_limit_never_exceeds_the_running_server_slots(self):
        self.store._llm_capacity = lambda: 1
        status = self.policy(llm_concurrency=2, total_concurrency=3)
        self.assertTrue(status['llm_restart_required'])
        self.assertEqual(status['effective_llm_concurrency'], 1)
        self.submit(self.doc(1), 'translate'); self.started(1)
        waiting = self.submit(self.doc(2), 'translate')
        self.submit(self.doc(3)); self.started(2)
        self.assertEqual(self.active, {'ocr': 1, 'llm': 1})
        self.assertEqual(self.store.get(waiting['id'])['job']['status'], 'queued')
        self.done()

    def test_validation_persistence_and_llm_context_per_slot(self):
        for changes in ({'ocr_concurrency': True}, {'llm_concurrency': 5}, {'max_waiting': -1},
                        {'total_concurrency': '2'}, {'extra': 1}):
            with self.subTest(changes=changes), self.assertRaises(ValueError):
                validate_policy({**DEFAULTS, **changes})
        chosen = {**DEFAULTS, 'llm_concurrency': 2, 'total_concurrency': 3}
        self.store.set_execution_policy(chosen)
        self.store.close()
        self.store = Store(self.temp.name, {}, self.runner)
        self.assertEqual(self.store.execution_policy, chosen)
        runtime = Path(self.temp.name)/'runtime'
        (runtime/'data').mkdir(parents=True)
        (runtime/'data/execution-policy.json').write_text(json.dumps(chosen))
        command = llama_command(runtime, {'llm_model_path': '/model.gguf', 'llm_model': 'test',
            'context_size': 4096, 'threads': 2})
        self.assertEqual(command[command.index('--parallel') + 1], '2')
        self.assertEqual(command[command.index('--ctx-size') + 1], '8192')

    def test_policy_api_requires_authentication_and_health_reports_the_applied_limits(self):
        config = {'llm_model_id': '', 'llm_model': '', 'ndl_revision': 'test'}
        server = ThreadingHTTPServer(('127.0.0.1', 0), make_handler(self.store, 'test-token', config))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        def call(path, body=None, authorized=True):
            headers = {'Authorization': 'Bearer test-token'} if authorized else {}
            request = Request(f'http://127.0.0.1:{server.server_port}/{path}', headers=headers,
                data=json.dumps(body).encode() if body is not None else None)
            try:
                response = urlopen(request, timeout=3)
            except HTTPError as exc:
                response = exc
            with response:
                return response.status, json.load(response)
        try:
            self.assertEqual(call('execution-policy', authorized=False)[0], 401)
            self.assertEqual(call('execution-policy', {**DEFAULTS, 'total_concurrency': True})[0], 400)
            self.assertEqual(self.store.execution_policy, DEFAULTS)
            chosen = {**DEFAULTS, 'total_concurrency': 2}
            self.assertEqual(call('execution-policy', chosen)[1]['policy'], chosen)
            self.assertEqual(call('execution-policy')[1]['waiting'], 0)
            health = call('health')[1]
            self.assertEqual(health['worker_concurrency'], 2)
            self.assertEqual(health['execution']['policy'], chosen)
            self.assertEqual(health['max_pending'], 5)
        finally:
            server.shutdown(); thread.join(); server.server_close()


if __name__ == '__main__':
    unittest.main()
