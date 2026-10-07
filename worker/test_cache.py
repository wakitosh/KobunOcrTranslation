"""Shared-cache permissions, atomic replacement and editorial isolation."""
import copy
from http.server import ThreadingHTTPServer
import io
import json
import tempfile
import threading
import time
import unittest
import urllib.error
import urllib.request

from PIL import Image
from server import make_handler
from store import Store, Problem
from cache_policy import DEFAULTS

ACTOR = {'id': 17, 'name': 'キャッシュ管理者', 'role': 'global_admin'}
LINE = {'id': 'old', 'x': 10, 'y': 10, 'width': 15, 'height': 80, 'readingOrder': 1, 'raw': '以前の翻刻'}


class CacheTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.release, self.started = threading.Event(), threading.Event()
        self.calls, self.fail_recognition = [], False
        self.store = Store(self.temp.name, {}, self.runner)
        self.store.set_cache_policy({**DEFAULTS, 'translation_mode': 'shared'})
        image = io.BytesIO()
        Image.new('RGB', (100, 120), 'white').save(image, 'JPEG')
        source = {'media_id': 1, 'item_id': 1, 'image_url': 'https://example.org/image.jpg'}
        self.editorial = self.store.create(source, image.getvalue())
        self.editorial.update(publication_state='published', lines=[copy.deepcopy(LINE)], translation={'text': '確認済み訳'})
        self.store.commit(self.editorial, 'publication_published', ACTOR)
        self.doc = self.store.create({**source, 'workflow': 'assist'}, image.getvalue())
        self.doc.update(lines=[copy.deepcopy(LINE)], translation={'text': '以前の訳'}, status='translate',
            translation_generated_at=time.time(), translation_fingerprint=self.store._fingerprints.translation(),
            provenance={'layout': {}, 'recognize': {}, 'translate': {}},
            job={'id': 'old-job', 'operation': 'translate', 'status': 'error', 'error': '以前の失敗'})
        self.store.commit(self.doc, 'cached_result')

    def tearDown(self):
        self.release.set()
        self.store.close()
        self.temp.cleanup()

    def runner(self, payload, folder):
        self.calls.append(copy.deepcopy(payload))
        self.started.set()
        if not self.release.wait(5):
            raise RuntimeError('Test synchronization timeout')
        if payload['operation'] == 'translate':
            return {'translation': {'text': '新しい訳'}, 'metrics': {'prompt_revision': 'test'}}
        if payload['operation'] == 'layout':
            return {'lines': [{**LINE, 'id': 'new', 'raw': None}], 'regions': [], 'metrics': {'ndl_revision': 'test'}}
        if self.fail_recognition:
            raise RuntimeError('Recognition failure')
        return {'lines': [{**payload['lines'][0], 'raw': '新しい翻刻'}], 'regions': [], 'metrics': {'ndl_revision': 'test'}}

    def body(self, target='translation', action='delete', **changes):
        return {**dict(target=target, action=action, base_revision=self.doc['revision'], actor=ACTOR), **changes}

    def wait_done(self):
        deadline = time.monotonic() + 5
        while time.monotonic() < deadline:
            doc = self.store.get(self.doc['id'])
            if doc.get('job', {}).get('status') in ('completed', 'error') and not self.store.pending:
                return doc
            time.sleep(.01)
        self.fail('Job did not finish')

    def test_roles_forged_fields_and_editorial_are_rejected_without_changes(self):
        for actor in [None, {**ACTOR, 'role': 'site_admin'}, {**ACTOR, 'role': 'researcher'},
                      {**ACTOR, 'id': True}, {**ACTOR, 'name': ''}]:
            with self.subTest(actor=actor), self.assertRaises(Problem) as error:
                self.store.manage_cache(self.doc['id'], self.body(actor=actor))
            self.assertEqual(error.exception.status, 403)
        for extra in [{'force': True}, {'target': 'layout'}, {'action': 'execute'}, {'base_revision': True}]:
            with self.subTest(extra=extra), self.assertRaises(Problem):
                self.store.manage_cache(self.doc['id'], self.body(**extra))
        with self.assertRaises(Problem) as error:
            self.store.manage_cache(self.editorial['id'], self.body(base_revision=self.editorial['revision']))
        self.assertEqual(error.exception.status, 409)
        self.assertEqual(self.store.get(self.doc['id']), self.doc)
        self.assertEqual(self.store.get(self.editorial['id']), self.editorial)

    def test_translation_deletion_retains_ocr_and_history_and_clears_stale_failure(self):
        updated = self.store.manage_cache(self.doc['id'], self.body())
        self.assertIsNone(updated['translation'])
        self.assertEqual(updated['lines'], self.doc['lines'])
        self.assertNotIn('job', updated)
        self.assertNotIn('translate', updated['provenance'])
        history = self.store.history(self.doc['id'])
        self.assertNotIn('以前の訳', json.dumps(history, ensure_ascii=False))
        self.assertEqual(history[-1]['event'], 'cache_translation_deleted')
        self.assertEqual(history[-1]['actor'], ACTOR)
        self.assertEqual(self.store.get(self.editorial['id']), self.editorial)

    def test_transcription_deletion_invalidates_translation_and_preserves_image(self):
        image = (self.store.directory(self.doc['id'])/'image.jpg').read_bytes()
        updated = self.store.manage_cache(self.doc['id'], self.body('transcription'))
        self.assertEqual(updated['lines'], [])
        self.assertIsNone(updated['translation'])
        self.assertNotIn('job', updated)
        self.assertEqual(updated['provenance'], {})
        self.assertEqual((self.store.directory(self.doc['id'])/'image.jpg').read_bytes(), image)
        self.assertEqual(self.store.history(self.doc['id'])[-1]['actor'], ACTOR)

    def test_translation_regeneration_preserves_old_until_success_and_records_actor(self):
        accepted = self.store.manage_cache(self.doc['id'], self.body(action='regenerate'))
        self.assertEqual(accepted['translation'], self.doc['translation'])
        self.assertTrue(self.started.wait(2))
        self.assertEqual(self.calls[0]['input_text'], '以前の翻刻')
        with self.assertRaises(Problem):
            self.store.manage_cache(self.doc['id'], self.body(base_revision=accepted['revision']))
        self.release.set()
        updated = self.wait_done()
        self.assertEqual(updated['translation']['text'], '新しい訳')
        self.assertEqual(updated['lines'], self.doc['lines'])
        history = self.store.history(self.doc['id'])
        self.assertEqual(history[-2]['event'], 'cache_translation_regeneration_requested')
        self.assertEqual(history[-1]['event'], 'cache_translation_regenerated')
        self.assertEqual(history[-1]['actor'], ACTOR)

    def test_ocr_pipeline_failure_retains_both_results_then_retry_replaces_atomically(self):
        self.fail_recognition = True
        self.store.manage_cache(self.doc['id'], self.body('transcription', 'regenerate'))
        self.assertTrue(self.started.wait(2))
        self.assertEqual(self.store.get(self.doc['id'])['lines'], self.doc['lines'])
        self.release.set()
        failed = self.wait_done()
        self.assertEqual(failed['job']['status'], 'error')
        self.assertEqual(failed['lines'], self.doc['lines'])
        self.assertEqual(failed['translation'], self.doc['translation'])
        self.assertEqual(self.store.history(self.doc['id'])[-1]['actor'], ACTOR)
        self.fail_recognition = False
        self.doc = failed
        self.store.manage_cache(self.doc['id'], self.body('transcription', 'regenerate'))
        updated = self.wait_done()
        self.assertEqual([call['operation'] for call in self.calls], ['layout', 'recognize', 'layout', 'recognize'])
        self.assertEqual(self.calls[-1]['lines'][0]['id'], 'new')
        self.assertEqual(updated['lines'][0]['raw'], '新しい翻刻')
        self.assertIsNone(updated['translation'])
        self.assertNotIn('translate', updated['provenance'])
        self.assertIn('layout', updated['provenance'])
        self.assertIn('recognize', updated['provenance'])
        self.assertEqual(self.store.get(self.editorial['id']), self.editorial)

    def test_admission_failures_do_not_modify_old_results_or_history(self):
        def unavailable(target):
            raise Problem('Engine unavailable', 503)
        with self.assertRaises(Problem):
            self.store.manage_cache(self.doc['id'], self.body(action='regenerate'), before_regenerate=unavailable)
        self.store.set_maintenance(True)
        with self.assertRaises(Problem):
            self.store.manage_cache(self.doc['id'], self.body(action='regenerate'))
        self.store.set_maintenance(False)
        self.store.pending = 4
        with self.assertRaises(Problem):
            self.store.manage_cache(self.doc['id'], self.body(action='regenerate'))
        self.store.pending = 0
        with self.assertRaises(Problem):
            self.store.manage_cache(self.doc['id'], self.body(base_revision=self.doc['revision'] - 1))
        with self.assertRaises(Problem):
            self.store.submit(self.doc['id'], {'operation': 'ocr', 'base_revision': self.doc['revision']})
        self.assertEqual(self.store.get(self.doc['id']), self.doc)
        self.assertEqual(len(self.store.history(self.doc['id'])), self.doc['revision'])

    def test_authenticated_http_cache_route_enforces_permissions_and_readiness(self):
        server = ThreadingHTTPServer(('127.0.0.1', 0), make_handler(self.store, 'test-token', {'image_hosts': ['example.org']}))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        def request(body, token='test-token'):
            req = urllib.request.Request(f'http://127.0.0.1:{server.server_port}/documents/{self.doc["id"]}/cache',
                data=json.dumps(body).encode(), headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
            try:
                with urllib.request.urlopen(req) as response:
                    return response.status, json.load(response)
            except urllib.error.HTTPError as error:
                return error.code, json.load(error)
        try:
            self.assertEqual(request(self.body(), 'wrong-token')[0], 401)
            self.assertEqual(request(self.body(actor={**ACTOR, 'role': 'site_admin'}))[0], 403)
            self.assertEqual(request(self.body(action='regenerate'))[0], 503)
            self.assertEqual(request(self.body('transcription', 'regenerate'))[0], 503)
            self.assertEqual(self.store.get(self.doc['id']), self.doc)
            status, updated = request(self.body())
            self.assertEqual(status, 200)
            self.assertIsNone(updated['translation'])
        finally:
            server.shutdown()
            server.server_close()
            thread.join()


if __name__ == '__main__':
    unittest.main()
