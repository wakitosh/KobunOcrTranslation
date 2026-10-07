"""Temporary storage must expire physically, isolate scopes, and protect editorial work."""
import copy
import io
import json
import os
from pathlib import Path
import tempfile
import threading
import time
import unittest
from unittest.mock import patch

from PIL import Image
from cache_policy import DEFAULTS, validate_policy
from store import Store, Problem

LINE = {'id': 'l1', 'x': 10, 'y': 10, 'width': 10, 'height': 80, 'readingOrder': 1, 'raw': '春はあけぼの'}
SOURCE = {'media_id': 1, 'item_id': 1, 'image_url': 'https://example.org/page.jpg'}
A, B = 'a' * 64, 'b' * 64


class RetentionTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.release, self.started = threading.Event(), threading.Event()
        self.fail = False
        image = io.BytesIO()
        Image.new('RGB', (100, 120), 'white').save(image, 'JPEG')
        self.image = image.getvalue()
        self.store = Store(self.temp.name, {}, self.runner)

    def tearDown(self):
        self.release.set()
        self.store.close()
        self.temp.cleanup()

    def runner(self, payload, folder):
        self.started.set()
        if not self.release.wait(5):
            raise RuntimeError('Test runner timeout')
        if self.fail:
            raise RuntimeError('Test inference failure')
        (folder/'output.json').write_text('private output')
        return {'translation': {'text': '春は夜明けがよい。', 'model': 'test'}, 'metrics': {}}

    def doc(self, *, workflow='assist', scope='shared', media=1):
        source = {**SOURCE, 'media_id': media, 'workflow': workflow, 'cache_scope': scope}
        doc = self.store.create(source, self.image)
        doc.update(lines=[copy.deepcopy(LINE)], status='recognize', ocr_generated_at=time.time())
        self.store.commit(doc, 'recognized')
        return doc

    def private(self, parent, scope=A):
        return self.store.start_private_translation(parent['id'], {'scope': scope, 'base_revision': parent['revision']})

    def done(self, ident):
        self.release.set()
        deadline = time.monotonic() + 5
        while self.store.pending and time.monotonic() < deadline:
            time.sleep(.01)
        self.assertEqual(self.store.pending, 0)
        return self.store.get(ident)

    def test_policy_validation_and_persistence(self):
        self.assertEqual(self.store.cache_policy, DEFAULTS)
        for change in ({'max_documents': True}, {'ocr_ttl_hours': 0}, {'private_ttl_minutes': 1441},
                       {'translation_mode': 'forever'}, {'max_megabytes': '1024'}, {'unexpected': 1}):
            with self.subTest(change=change), self.assertRaises(ValueError):
                validate_policy({**DEFAULTS, **change})
        chosen = {**DEFAULTS, 'ocr_mode': 'private', 'private_ttl_minutes': 15}
        self.store.set_cache_policy(chosen)
        self.store.close()
        self.store = Store(self.temp.name, {}, self.runner)
        self.assertEqual(self.store.cache_policy, chosen)

    def test_ocr_absolute_expiry_deletes_image_history_and_logs_but_not_editorial(self):
        doc, editorial = self.doc(), self.doc(workflow='editorial')
        # Pre-workflow versions of official work remain protected too.
        editorial.pop('workflow')
        self.store.write(editorial)
        official = (self.store.directory(editorial['id'])/'document.json').read_bytes()
        folder = self.store.directory(doc['id'])
        (folder/'runs'/'test').mkdir(parents=True)
        (folder/'runs'/'test'/'stdout.log').write_text('machine text')
        expiry = doc['ocr_generated_at'] + 24 * 3600
        with patch('cache_storage.time.time', return_value=expiry-1):
            self.assertIsNotNone(self.store.existing(doc['source']))
            self.assertEqual(self.store.cache_expiry(self.store.get(doc['id'])), expiry)
        with patch('cache_storage.time.time', return_value=expiry):
            with self.assertRaises(Problem) as error:
                self.store.get(doc['id'])
            self.assertEqual(error.exception.status, 410)
            self.assertIsNone(self.store.existing(doc['source']))
            self.store.cleanup_cache()
        self.assertFalse(folder.exists())
        self.assertEqual((self.store.directory(editorial['id'])/'document.json').read_bytes(), official)
        self.assertIn('document', self.store.history(editorial['id'])[0])

    def test_private_ocr_scopes_and_indexed_lookup(self):
        self.store.set_cache_policy({**DEFAULTS, 'ocr_mode': 'private'})
        a, b = self.doc(scope=A), self.doc(scope=B)
        self.assertNotEqual(a['id'], b['id'])
        with patch.object(self.store, 'list', side_effect=AssertionError('Lookup scanned all documents')):
            self.assertEqual(self.store.existing(a['source'])['id'], a['id'])
            self.assertEqual(self.store.existing(b['source'])['id'], b['id'])
            self.assertIsNone(self.store.existing({**SOURCE, 'workflow': 'assist'}))
        with patch('cache_storage.time.time', return_value=a['ocr_generated_at'] + 3600):
            self.store.cleanup_cache()
        self.assertFalse((self.store.temporary_root/a['id']).exists())

    def test_private_translation_is_separate_and_only_active_requests_join(self):
        parent = self.doc()
        before = self.store.get(parent['id'])
        a, fresh = self.private(parent)
        self.assertTrue(fresh)
        self.assertTrue(self.started.wait(2))
        joined, fresh = self.private(parent)
        self.assertFalse(fresh)
        self.assertEqual(joined['id'], a['id'])
        b, fresh = self.private(parent, B)
        self.assertTrue(fresh)
        self.assertNotEqual(a['id'], b['id'])
        completed = self.done(a['id'])
        self.assertEqual(completed['translation']['text'], '春は夜明けがよい。')
        self.assertEqual(self.store.get(parent['id']), before)
        newer, fresh = self.private(parent)
        self.assertTrue(fresh)
        self.assertNotEqual(newer['id'], a['id'])
        self.done(newer['id'])
        history = self.store.history(a['id'])
        self.assertNotIn('春は夜明けがよい。', json.dumps(history, ensure_ascii=False))
        self.assertTrue(all('document' not in entry for entry in history))

    def test_private_expiry_is_from_completion_and_forget_never_deletes_shared_or_official(self):
        parent, official = self.doc(), self.doc(workflow='editorial')
        child, _ = self.private(parent)
        child = self.done(child['id'])
        expiry = child['translation_generated_at'] + 3600
        folder = self.store.directory(child['id'])
        self.store.forget_private({'scope': B, 'target': 'all'})
        self.assertTrue(folder.exists())
        with patch('cache_storage.time.time', return_value=expiry-1):
            self.assertEqual(self.store.get(child['id'])['translation'], child['translation'])
        with patch('cache_storage.time.time', return_value=expiry):
            self.store.cleanup_cache()
        self.assertFalse(folder.exists())
        self.assertEqual(self.store.get(parent['id'])['lines'], parent['lines'])
        self.assertIsNotNone(self.store.get(official['id']))

    def test_forget_running_private_job_defers_removal_until_safe(self):
        parent = self.doc()
        child, _ = self.private(parent)
        self.assertTrue(self.started.wait(2))
        self.store.forget_private({'scope': A, 'target': 'translation'})
        self.assertTrue(self.store.get(child['id'])['discard_requested'])
        self.release.set()
        deadline = time.monotonic() + 5
        while self.store.pending and time.monotonic() < deadline:
            time.sleep(.01)
        # Cleanup runs inside the same lock as pending decrement.
        with self.store.lock:
            self.assertFalse((self.store.temporary_root/child['id']).exists())
            self.assertEqual(self.store.get(parent['id'])['lines'], parent['lines'])

    def test_failed_translation_expires_from_failure_completion(self):
        parent = self.doc()
        self.fail = True
        child, _ = self.private(parent)
        child = self.done(child['id'])
        self.assertEqual(child['job']['status'], 'error')
        self.assertEqual(self.store.cache_expiry(child), child['cache_completed_at'] + 3600)
        with patch('cache_storage.time.time', return_value=child['cache_completed_at'] + 3600):
            self.store.cleanup_cache()
        self.assertFalse((self.store.temporary_root/child['id']).exists())

    def test_new_request_does_not_join_a_private_job_marked_for_disposal(self):
        parent = self.doc()
        old, _ = self.private(parent)
        self.assertTrue(self.started.wait(2))
        self.store.forget_private({'scope': A, 'target': 'translation'})
        newer, fresh = self.private(parent)
        self.assertTrue(fresh)
        self.assertNotEqual(old['id'], newer['id'])
        self.assertEqual(self.done(newer['id'])['job']['status'], 'completed')
        self.assertFalse((self.store.temporary_root/old['id']).exists())

    def test_editorial_transcription_allows_private_translation_but_official_translation_prevents_it(self):
        parent = self.doc(workflow='editorial')
        with self.assertRaises(Problem):
            self.private(parent)
        parent['publication_state'] = 'published'
        self.store.commit(parent, 'publication_published')
        child, _ = self.private(parent)
        self.done(child['id'])
        parent['translation'] = {'text': '図書館が確認した訳'}
        self.store.commit(parent, 'publication_published')
        self.store.cleanup_cache()
        self.assertFalse((self.store.temporary_root/child['id']).exists())
        with self.assertRaises(Problem):
            self.private(parent)
        self.assertEqual(self.store.get(parent['id'])['translation']['text'], '図書館が確認した訳')

    def test_changed_parent_or_model_invalidates_private_translation(self):
        parent = self.doc()
        child, _ = self.private(parent)
        self.done(child['id'])
        parent['lines'][0]['raw'] = '本文の訂正'
        self.store.commit(parent, 'recognized')
        self.store.cleanup_cache()
        self.assertFalse((self.store.temporary_root/child['id']).exists())
        child, _ = self.private(parent)
        self.done(child['id'])
        self.store.config['prompt_revision'] = 'new-prompt'
        self.store.cleanup_cache()
        self.assertFalse((self.store.temporary_root/child['id']).exists())
        self.assertIsNotNone(self.store.get(parent['id']))

    def test_shared_translation_expiry_scrubs_all_text_and_logs_and_keeps_ocr(self):
        self.store.set_cache_policy({**DEFAULTS, 'translation_mode': 'shared', 'translation_ttl_minutes': 1})
        doc = self.doc()
        doc.update(translation={'text': '期限付きの訳'}, translation_generated_at=time.time(),
            translation_fingerprint=self.store._fingerprints.translation(), job={'operation': 'translate', 'status': 'completed', 'input_text': '原文'})
        self.store.commit(doc, 'translate')
        folder = self.store.directory(doc['id'])
        (folder/'runs'/'old').mkdir(parents=True)
        (folder/'runs'/'old'/'output.json').write_text('期限付きの訳')
        legacy = folder/'history'/'legacy.json'
        legacy.write_text(json.dumps({'event': 'translate', 'document': doc}, ensure_ascii=False))
        with patch('cache_storage.time.time', return_value=doc['translation_generated_at'] + 60):
            self.store.cleanup_cache()
        updated = self.store.get(doc['id'])
        self.assertIsNone(updated['translation'])
        self.assertEqual(updated['lines'], doc['lines'])
        self.assertNotIn('job', updated)
        self.assertFalse((folder/'runs'/'old').exists())
        self.assertNotIn('期限付きの訳', json.dumps(self.store.history(doc['id']), ensure_ascii=False))

    def test_policy_changed_during_shared_translation_does_not_publish_output(self):
        self.store.set_cache_policy({**DEFAULTS, 'translation_mode': 'shared'})
        doc = self.doc()
        self.store.submit(doc['id'], {'operation': 'translate', 'base_revision': doc['revision']})
        self.assertTrue(self.started.wait(2))
        self.store.set_cache_policy(DEFAULTS)
        updated = self.done(doc['id'])
        self.assertIsNone(updated['translation'])
        self.assertEqual(list((self.store.directory(doc['id'])/'runs').glob('*')), [])

    def test_weight_change_invalidates_ocr_and_parent_children_not_editorial(self):
        models = Path(self.temp.name)/'weights'
        models.mkdir()
        weight = models/'rtmdet-s-1280x1280.onnx'
        weight.write_bytes(b'original')
        self.store.config['ndl_model_dir'] = str(models)
        parent, official = self.doc(), self.doc(workflow='editorial')
        child, _ = self.private(parent)
        self.done(child['id'])
        weight.write_bytes(b'changed weight')
        self.store.cleanup_cache()
        self.assertFalse((self.store.temporary_root/parent['id']).exists())
        self.assertFalse((self.store.temporary_root/child['id']).exists())
        self.assertIsNotNone(self.store.get(official['id']))

    def test_capacity_evicts_oldest_completed_work_and_protects_active_and_editorial(self):
        self.store.set_cache_policy({**DEFAULTS, 'max_documents': 4, 'max_megabytes': 16})
        official = self.doc(workflow='editorial')
        docs = [self.doc(media=i) for i in range(4)]
        new = self.doc(media=5)
        self.assertFalse((self.store.temporary_root/docs[0]['id']).exists())
        self.assertEqual(self.store.cleanup_cache()['documents'], 4)
        self.assertIsNotNone(self.store.get(official['id']))
        with self.store.lock:
            for doc in [*docs[1:], new]:
                doc['job'] = {'operation': 'recognize', 'status': 'running'}
                self.store.write(doc)
            with self.assertRaises(Problem) as error:
                self.doc(media=6)
            self.assertEqual(error.exception.status, 429)
            for doc in [*docs[1:], new]:
                doc.pop('job'); self.store.write(doc)
        (self.store.directory(new['id'])/'big.log').write_bytes(b'x' * (17 * 1024**2))
        self.assertLessEqual(self.store.cleanup_cache()['bytes'], 16 * 1024**2)
        self.assertFalse((self.store.temporary_root/new['id']).exists())

    def test_private_clone_preserves_parent_at_capacity_and_stats_recount_children(self):
        self.store.set_cache_policy({**DEFAULTS, 'max_documents': 4})
        parent = self.doc()
        others = [self.doc(media=i) for i in range(2, 5)]
        child, _ = self.private(parent)
        self.done(child['id'])
        self.assertIsNotNone(self.store.get(parent['id']))
        self.assertFalse((self.store.temporary_root/others[0]['id']).exists())
        parent['ocr_generated_at'] -= 25 * 3600
        self.store.write(parent)
        usage = self.store.cleanup_cache()
        self.assertEqual(usage['documents'], 2)
        self.assertFalse((self.store.temporary_root/child['id']).exists())

    def test_restart_removes_legacy_unbounded_cache_and_only_temporary_orphans(self):
        official = self.doc(workflow='editorial')
        legacy = self.doc()
        legacy.pop('retention_version')
        self.store.write(legacy)
        orphan = self.store.temporary_root/('c'*24)
        orphan.mkdir(); (orphan/'image.jpg').write_bytes(self.image)
        os.utime(orphan, (time.time()-3601,) * 2)
        unrelated = self.store.root/('d'*24)
        unrelated.mkdir(); (unrelated/'notes').write_text('Not temporary assistance')
        self.store.close()
        self.store = Store(self.temp.name, {}, self.runner)
        self.assertFalse((self.store.temporary_root/legacy['id']).exists())
        self.assertFalse(orphan.exists())
        self.assertTrue(unrelated.exists())
        self.assertIsNotNone(self.store.get(official['id']))


if __name__ == '__main__':
    unittest.main()
