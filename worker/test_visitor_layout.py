"""Visitor geometry edits stay private, respect admission, and leave shared/official data intact."""
import copy
import io
import tempfile
import threading
import time
import unittest

from PIL import Image
from store import Store, Problem

SCOPE = 'a' * 64
LINE = {'id': 'line1', 'x': 10, 'y': 10, 'width': 15, 'height': 80,
        'readingOrder': 1, 'classId': 1, 'confidence': .9, 'raw': '共有の本文'}


class VisitorLayoutTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.release, self.started = threading.Event(), threading.Event()
        self.payloads = []
        self.store = Store(self.temp.name, {}, self.runner)
        image = io.BytesIO()
        Image.new('RGB', (100, 120), 'white').save(image, 'JPEG')
        self.image = image.getvalue()
        self.source = {'media_id': 1, 'item_id': 1, 'service_id': 'https://example.org/iiif/1',
                       'image_url': 'https://example.org/image.jpg'}
        self.shared = self.create('assist', 'shared')
        self.official = self.create('editorial', 'shared')
        self.official.update(publication_state='published', transcription_credit='確認班')
        self.store.commit(self.official, 'published')

    def tearDown(self):
        self.release.set()
        self.store.close()
        self.temp.cleanup()

    def create(self, workflow, scope):
        doc = self.store.create({**self.source, 'workflow': workflow, 'cache_scope': scope}, self.image)
        doc.update(lines=[copy.deepcopy(LINE)], status='recognize', translation=None)
        self.store.commit(doc, 'fixture')
        return doc

    def runner(self, payload, folder):
        self.payloads.append(copy.deepcopy(payload)); self.started.set()
        if not self.release.wait(5):
            raise RuntimeError('Test synchronization timeout')
        return {'lines': [{**line, 'raw': '自分用の再認識結果'} for line in payload['lines']], 'regions': [], 'metrics': {}}

    def body(self, **changes):
        return {'scope': SCOPE, 'request_scope': 'b' * 64, 'base_revision': self.shared['revision'],
                'reading_direction': 'rtl', 'lines': [{'id': 'line1', 'x': 12, 'y': 10, 'width': 16, 'height': 80}], **changes}

    def wait_done(self, ident):
        self.release.set()
        deadline = time.monotonic() + 5
        while time.monotonic() < deadline:
            doc = self.store.get(ident)
            if doc.get('job', {}).get('status') == 'completed' and not self.store.pending:
                return doc
            time.sleep(.01)
        self.fail('Recognition did not finish')

    def test_shared_and_official_unchanged_and_result_private(self):
        result = self.store.recognize_private_layout(self.shared['id'], self.body())
        self.assertNotEqual(result['id'], self.shared['id'])
        self.assertEqual(result['source']['cache_scope'], SCOPE)
        self.assertTrue(result['visitor_layout'])
        self.assertEqual(result['reading_direction'], 'rtl')
        completed = self.wait_done(result['id'])
        self.assertEqual(completed['lines'][0]['raw'], '自分用の再認識結果')
        self.assertEqual(completed['lines'][0]['x'], 12)
        self.assertEqual(self.store.get(self.shared['id']), self.shared)
        self.assertEqual(self.store.get(self.official['id']), self.official)
        self.assertNotIn('raw', self.payloads[0]['lines'][0])
        self.assertNotIn('transcription_credit', completed)
        self.assertIsNone(completed['translation'])
        self.assertEqual((self.store.directory(completed['id'])/'image.jpg').read_bytes(), self.image)

    def test_own_private_result_can_be_adjusted_again(self):
        first = self.wait_done(self.store.recognize_private_layout(self.shared['id'], self.body())['id'])
        second = self.store.recognize_private_layout(first['id'], self.body(base_revision=first['revision'], reading_direction='ltr'))
        self.assertEqual(second['id'], first['id'])
        completed = self.wait_done(second['id'])
        self.assertEqual(completed['reading_direction'], 'ltr')
        self.assertEqual(len(self.payloads), 2)

    def test_manual_frame_when_detector_found_no_rows(self):
        self.shared['lines'] = []
        self.store.commit(self.shared, 'empty_detection')
        result = self.wait_done(self.store.recognize_private_layout(self.shared['id'], self.body())['id'])
        self.assertEqual(len(result['lines']), 1)
        self.assertEqual(result['lines'][0]['raw'], '自分用の再認識結果')
        self.assertEqual(self.store.get(self.shared['id'])['lines'], [])

    def test_foreign_scope_and_official_are_rejected(self):
        private = self.create('assist', 'c' * 64)
        for doc, status in [(private, 404), (self.official, 409)]:
            with self.subTest(status=status), self.assertRaises(Problem) as error:
                self.store.recognize_private_layout(doc['id'], self.body(base_revision=doc['revision']))
            self.assertEqual(error.exception.status, status)
            self.assertEqual(self.store.get(doc['id']), doc)
        with self.assertRaises(Problem):
            self.store.recognize_private_layout(self.shared['id'], self.body(scope='shared'))

    def test_geometry_text_injection_and_stale_revision_do_not_create_copies(self):
        baseline = len(list(self.store.temporary_root.glob('*/document.json')))
        changes = [dict(base_revision=-1), dict(reading_direction='bad'), dict(lines=[]),
            dict(lines=[{'id': 'line1', 'x': -1, 'y': 0, 'width': 10, 'height': 20}]),
            dict(lines=[{'id': 'line1', 'x': 0, 'y': 0, 'width': 101, 'height': 20}]),
            dict(lines=[{'id': 'line1', 'x': True, 'y': 0, 'width': 10, 'height': 20}]),
            dict(lines=[{**self.body()['lines'][0], 'raw': '任意の本文'}]), dict(actor={'role': 'global_admin'}),
            dict(lines=[{'id': f'full{i}', 'x': 0, 'y': 0, 'width': 100, 'height': 120} for i in range(3)]),
            dict(lines=self.body()['lines'] * 501)]
        for change in changes:
            with self.subTest(change=change), self.assertRaises(Problem):
                self.store.recognize_private_layout(self.shared['id'], self.body(**change))
        self.assertEqual(len(list(self.store.temporary_root.glob('*/document.json'))), baseline)
        self.assertEqual(self.store.get(self.shared['id']), self.shared)

    def test_busy_session_and_maintenance_reject_before_copy(self):
        accepted = self.store.recognize_private_layout(self.shared['id'], self.body())
        count = len(list(self.store.temporary_root.glob('*/document.json')))
        with self.assertRaises(Problem) as error:
            self.store.recognize_private_layout(self.shared['id'], self.body())
        self.assertEqual(error.exception.status, 429)
        self.assertEqual(len(list(self.store.temporary_root.glob('*/document.json'))), count)
        self.wait_done(accepted['id'])
        self.store.set_maintenance(True)
        with self.assertRaises(Problem) as error:
            self.store.recognize_private_layout(self.shared['id'], self.body())
        self.assertEqual(error.exception.status, 503)

    def test_forget_removes_private_parent_and_child_without_404(self):
        private = self.wait_done(self.store.recognize_private_layout(self.shared['id'], self.body())['id'])
        child = self.store.create({**self.source, 'workflow': 'assist_translation', 'cache_scope': SCOPE}, self.image)
        child['parent_id'] = private['id']; self.store.write(child)
        self.store.forget_private({'scope': SCOPE, 'target': 'all'})
        for doc in [private, child]:
            with self.assertRaises(Problem) as error:
                self.store.get(doc['id'])
            self.assertEqual(error.exception.status, 404)
        self.assertEqual(self.store.get(self.shared['id']), self.shared)


if __name__ == '__main__':
    unittest.main()
