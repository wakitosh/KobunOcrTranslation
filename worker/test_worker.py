import copy
import io
import json
from pathlib import Path
import tempfile
import threading
import time
import unittest
from unittest.mock import patch
from http.server import ThreadingHTTPServer
import urllib.error
import urllib.request

from PIL import Image
from store import Store, Problem, validate_lines, validate_reading_direction
from server import check_image_url, make_handler
from engine import order_lines, reverse_grapheme_clusters, translate


def line(ident='a', **changes):
    return dict(id=ident, x=10, y=10, width=15, height=80, readingOrder=1, classId=1, confidence=0.7, **changes)


class WorkerTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.release = threading.Event()
        self.started = threading.Event()
        self.calls = []
        self.store = Store(self.temp.name, {}, self.runner)
        image = Image.new('RGB', (100, 120), 'white')
        stream = io.BytesIO(); image.save(stream, 'JPEG'); self.image = stream.getvalue()
        self.doc = self.create(1)

    def tearDown(self):
        self.release.set()
        self.store.close()
        self.temp.cleanup()

    def create(self, media):
        return self.store.create({'media_id': media, 'item_id': 1, 'image_url': 'https://example.org/image.jpg'}, self.image)

    def runner(self, payload, folder):
        self.calls.append(copy.deepcopy(payload)); self.started.set()
        if not self.release.wait(5):
            raise RuntimeError('Test synchronization timeout')
        return {'translation': {'text': '試験訳', 'input': payload.get('input_text')}, 'lines': [dict(l, raw='認識文', machineRaw='認識文') for l in payload['lines']] or [line()], 'metrics': {'inference_ms': 1}}

    def save(self, lines):
        self.doc = self.store.save_layout(self.doc['id'], {'base_revision': self.doc['revision'], 'lines': lines})
        return self.doc

    def wait_done(self, ident=None):
        ident = ident or self.doc['id']
        deadline = time.monotonic()+5
        while time.monotonic() < deadline:
            doc = self.store.get(ident)
            if doc.get('job', {}).get('status') in ('completed', 'error'):
                return doc
            time.sleep(0.01)
        self.fail('job did not finish')

    def test_maintenance_rejects_new_jobs_and_cannot_interrupt_running_work(self):
        self.assertEqual(self.store.set_maintenance(True), {'maintenance': True})
        with self.assertRaisesRegex(Problem, '切替中'):
            self.store.submit(self.doc['id'], {'operation': 'layout', 'base_revision': self.doc['revision']})
        self.assertEqual(self.calls, [])
        self.store.set_maintenance(False)
        self.store.submit(self.doc['id'], {'operation': 'layout', 'base_revision': self.doc['revision']})
        self.assertTrue(self.started.wait(2))
        with self.assertRaisesRegex(Problem, '処理中'):
            self.store.set_maintenance(True)
        self.assertFalse(self.store.maintenance)
        self.release.set(); self.wait_done()
        self.store.set_maintenance(True)
        for value in (None, 1, 'true'):
            with self.assertRaises(Problem): self.store.set_maintenance(value)

    def test_invalid_geometry_and_duplicate_ids(self):
        for value in [float('nan'), float('inf'), -1, True, '2']:
            row = line(); row['x'] = value
            with self.subTest(value=value), self.assertRaises(Problem):
                validate_lines([row], 100, 120)
        with self.assertRaises(Problem): validate_lines([line(), line()], 100, 120)
        row = line(); row['width'] = 200
        with self.assertRaises(Problem): validate_lines([row], 100, 120)

    def test_writing_direction_is_derived_from_line_geometry(self):
        vertical = validate_lines([{**line(), 'direction': 'horizontal'}], 100, 120)[0]
        horizontal = validate_lines([{**line(), 'width': 80, 'height': 15}], 100, 120)[0]
        self.assertEqual(vertical['direction'], 'vertical')
        self.assertEqual(horizontal['direction'], 'horizontal')

    def test_reading_direction_is_validated_saved_and_sent_to_worker(self):
        for value in ('', 'left', None, 1):
            with self.subTest(value=value), self.assertRaises(Problem):
                validate_reading_direction(value)
        self.assertEqual(validate_reading_direction('rtl'), 'rtl')
        self.doc = self.store.save_layout(self.doc['id'], {'base_revision': self.doc['revision'],
            'reading_direction': 'rtl', 'lines': [line(raw='古い認識')]})
        self.assertEqual(self.doc['reading_direction'], 'rtl')
        self.assertNotIn('raw', self.doc['lines'][0])
        self.store.submit(self.doc['id'], {'operation': 'recognize', 'base_revision': self.doc['revision']})
        self.assertTrue(self.started.wait(2))
        self.assertEqual(self.calls[0]['reading_direction'], 'rtl')
        self.release.set(); self.wait_done()

    def test_explicit_reading_direction_orders_boxes_and_horizontal_text(self):
        vertical = [
            {**line('right'), 'x': 70, 'direction': 'vertical'},
            {**line('left'), 'x': 10, 'direction': 'vertical'},
        ]
        self.assertEqual([row['id'] for row in order_lines(vertical, 'ltr')], ['left', 'right'])
        horizontal = [
            {**line('left'), 'x': 10, 'width': 60, 'height': 15, 'direction': 'horizontal'},
            {**line('right'), 'x': 70, 'width': 20, 'height': 15, 'direction': 'horizontal'},
        ]
        self.assertEqual([row['id'] for row in order_lines(horizontal, 'rtl')], ['right', 'left'])
        self.assertEqual(reverse_grapheme_clusters('か\u3099な'), 'なか\u3099')

    def test_stale_revision_rejected(self):
        old = self.doc['revision']; self.save([line(raw='手入力')])
        with self.assertRaises(Problem) as error:
            self.store.save_layout(self.doc['id'], {'base_revision': old, 'lines': []})
        self.assertEqual(error.exception.status, 409)
        self.assertEqual(self.store.get(self.doc['id'])['lines'][0]['raw'], '手入力')

    def test_transcription_edit_preserves_layout_and_records_actor(self):
        self.save([line('a', raw='機械の文字'), dict(line('b', raw='続き'), x=30)])
        self.doc['lines'][0]['machineRaw'] = '機械の文字'
        self.doc['lines'][1]['machineRaw'] = 'OCR続き'
        self.doc['translation_draft'] = {'text': '古い入力', 'line_ids': ['a'], 'source_transcription': '機械の文字'}
        self.doc['translation'] = {'text': '古い訳'}
        self.store.write(self.doc)
        before = copy.deepcopy(self.doc['lines'])
        actor = {'id': 17, 'name': '翻刻担当者', 'role': 'reviewer'}
        self.doc = self.store.save_transcription(self.doc['id'], {'base_revision': self.doc['revision'],
            'lines': [{'id': 'a', 'raw': '人が直した文字'}, {'id': 'b', 'raw': '続き'}], 'actor': actor})
        self.assertEqual(self.doc['lines'][0]['raw'], '人が直した文字')
        self.assertEqual(self.doc['lines'][0]['machineRaw'], '機械の文字')
        for current, old in zip(self.doc['lines'], before):
            self.assertEqual([current[key] for key in ('id', 'x', 'y', 'width', 'height', 'readingOrder')],
                [old[key] for key in ('id', 'x', 'y', 'width', 'height', 'readingOrder')])
        self.assertIsNone(self.doc['translation']); self.assertIsNone(self.doc['translation_draft'])
        self.assertEqual(self.doc['transcription_editor'], actor)
        history = self.store.history(self.doc['id'])[-1]
        self.assertEqual(history['event'], 'transcription_edit')
        self.assertEqual(history['actor'], actor)
        with self.assertRaisesRegex(Problem, '別の画面'):
            self.store.save_transcription(self.doc['id'], {'base_revision': self.doc['revision']-1,
                'lines': [{'id': 'a', 'raw': '競合'}, {'id': 'b', 'raw': '続き'}], 'actor': actor})

    def test_transcription_edit_cannot_change_layout_or_spoof_shape(self):
        self.save([line('a', raw='本文'), dict(line('b', raw='続き'), x=30)])
        actor = {'id': 1, 'name': '管理者', 'role': 'global_admin'}
        valid = {'base_revision': self.doc['revision'], 'actor': actor,
            'lines': [{'id': 'a', 'raw': '本文'}, {'id': 'b', 'raw': '続き'}]}
        invalid = [
            [{**valid['lines'][0], 'x': 99}, valid['lines'][1]],
            list(reversed(valid['lines'])), valid['lines'][:1],
            [{'id': 'a', 'raw': ''}, {'id': 'b', 'raw': ''}],
        ]
        for lines in invalid:
            with self.subTest(lines=lines), self.assertRaises(Problem):
                self.store.save_transcription(self.doc['id'], {**valid, 'lines': lines})
        with self.assertRaisesRegex(Problem, '編集者'):
            self.store.save_transcription(self.doc['id'], {**valid, 'actor': {'id': 1, 'name': '', 'role': 'global_admin'}})
        same = self.store.save_transcription(self.doc['id'], valid)
        self.assertEqual(same['revision'], self.doc['revision'])

    def test_double_submit_joins_and_blocks_edits(self):
        self.save([line()]); body = {'operation': 'recognize', 'base_revision': self.doc['revision']}
        first = self.store.submit(self.doc['id'], body)
        self.assertTrue(self.started.wait(2))
        second = self.store.submit(self.doc['id'], body)
        self.assertEqual(first['job']['id'], second['job']['id'])
        with self.assertRaises(Problem): self.save([])
        self.assertEqual(len(self.calls), 1)
        self.release.set(); result = self.wait_done()
        self.assertEqual(result['lines'][0]['machineRaw'], '認識文')

    def test_edited_crops_and_order_reach_worker(self):
        self.save([line('b'), line('a')])
        self.doc['lines'][0]['x'] = 25
        self.save(self.doc['lines'])
        self.store.submit(self.doc['id'], {'operation': 'recognize', 'base_revision': self.doc['revision']})
        self.assertTrue(self.started.wait(2))
        self.assertEqual([l['id'] for l in self.calls[0]['lines']], ['b', 'a'])
        self.assertEqual(self.calls[0]['lines'][0]['x'], 25)
        self.release.set(); self.doc = self.wait_done()
        old = copy.deepcopy(self.doc)
        self.doc['lines'][0]['raw'] = '人の修正'
        self.save(self.doc['lines'])
        self.assertEqual(self.doc['lines'][0]['machineRaw'], '認識文')
        self.doc['lines'][0]['height'] -= 5
        self.save(self.doc['lines'])
        self.assertNotIn('raw', self.doc['lines'][0]); self.assertNotIn('machineRaw', self.doc['lines'][0])
        history = self.store.history(self.doc['id'])
        self.assertEqual(history[old['revision']-1]['document']['lines'][0]['raw'], '認識文')

    def test_queue_is_bounded_and_serial(self):
        ids = []
        for i in range(1, 5):
            doc = self.create(i); ids.append(doc['id'])
            self.store.submit(doc['id'], {'operation': 'layout', 'base_revision': doc['revision']})
        self.assertTrue(self.started.wait(2)); self.assertEqual(len(self.calls), 1)
        extra = self.create(5)
        with self.assertRaises(Problem) as error:
            self.store.submit(extra['id'], {'operation': 'layout', 'base_revision': extra['revision']})
        self.assertEqual(error.exception.status, 429)
        self.release.set()
        for ident in ids: self.wait_done(ident)
        self.assertEqual(len(self.calls), 4)

    def test_error_preserves_edits_and_releases_slot(self):
        self.save([line(raw='保存した翻刻')])
        def fail(payload, folder): raise TimeoutError('test timeout')
        self.store.runner = fail
        self.store.submit(self.doc['id'], {'operation': 'recognize', 'base_revision': self.doc['revision']})
        result = self.wait_done()
        self.assertEqual(result['job']['status'], 'error')
        self.assertEqual(result['lines'][0]['raw'], '保存した翻刻')
        self.assertEqual(self.store.pending, 0)

    def test_translation_draft_preserves_ocr_and_validates_contiguous_range(self):
        self.save([line('a', raw='前半'), line('b', raw='後半'), line('c')])
        body = {'base_revision': self.doc['revision'], 'line_ids': ['a', 'b'], 'text': '前半と後半。'}
        for ids in [['a', 'c'], ['b', 'a'], ['a', 'a'], ['missing'], [], ['c']]:
            with self.subTest(ids=ids), self.assertRaises(Problem):
                self.store.save_translation_input(self.doc['id'], {**body, 'line_ids': ids})
        self.doc = self.store.save_translation_input(self.doc['id'], body)
        self.assertEqual(self.doc['lines'][0]['raw'], '前半')
        self.assertEqual(self.doc['translation_draft']['source_transcription'], '前半\n後半')
        with self.assertRaises(Problem):
            self.store.save_translation_input(self.doc['id'], body)  # old revision
        submit = {'operation': 'translate', 'base_revision': self.doc['revision']}
        first = self.store.submit(self.doc['id'], submit)
        self.assertTrue(self.started.wait(2))
        self.assertEqual(self.store.submit(self.doc['id'], submit)['job']['id'], first['job']['id'])
        self.assertEqual(self.calls[0]['input_text'], '前半と後半。')
        self.assertEqual(self.calls[0]['line_ids'], ['a', 'b'])  # unrecognized c is excluded
        self.release.set(); self.doc = self.wait_done()
        self.doc['lines'][0]['raw'] = '修正した前半'
        self.save(self.doc['lines'])
        self.assertIsNone(self.doc['translation_draft'])
        self.assertEqual(self.store.history(self.doc['id'])[body['base_revision']]['document']['translation_draft']['text'], '前半と後半。')

    def test_translation_draft_rejects_range_mismatch_and_blank(self):
        self.save([line('a', raw='本文'), line('b', raw='続き')])
        body = {'base_revision': self.doc['revision'], 'line_ids': ['a'], 'text': '本文。'}
        for text in ['', '  ', 'x' * 16001, None]:
            with self.subTest(text=str(text)[:15]), self.assertRaises(Problem):
                self.store.save_translation_input(self.doc['id'], {**body, 'text': text})
        self.doc = self.store.save_translation_input(self.doc['id'], body)
        with self.assertRaisesRegex(Problem, '一致'):
            self.store.submit(self.doc['id'], {'operation': 'translate', 'base_revision': self.doc['revision'], 'line_ids': ['b']})

    def test_delete_translation_keeps_input_and_records_previous_result(self):
        self.save([line('a', raw='古文')])
        draft = {'text': '古文', 'line_ids': ['a'], 'source_transcription': '古文'}
        translation = {'text': '現代語訳', 'input': '古文', 'line_ids': ['a'], 'model': 'test-model'}
        self.doc.update(translation_draft=draft, translation=translation, publication_state='published')
        self.store.commit(self.doc, 'translate')
        previous_revision = self.doc['revision']
        actor = {'id': 17, 'name': '管理者', 'role': 'global_admin'}

        self.doc = self.store.delete_translation(self.doc['id'], {'base_revision': previous_revision, 'actor': actor})
        self.assertIsNone(self.doc['translation'])
        self.assertEqual(self.doc['translation_draft'], draft)
        self.assertEqual(self.doc['publication_state'], 'draft')
        self.assertEqual(self.doc['status'], 'translation_deleted')
        history = self.store.history(self.doc['id'])
        self.assertEqual(history[-1]['event'], 'translation_delete')
        self.assertEqual(history[-1]['actor'], actor)
        self.assertEqual(history[-2]['document']['translation'], translation)

        unchanged = self.store.delete_translation(self.doc['id'], {'base_revision': self.doc['revision'], 'actor': actor})
        self.assertEqual(unchanged['revision'], self.doc['revision'])

    def test_unrecognized_translation_rejected(self):
        self.save([line()])
        with self.assertRaises(Problem):
                self.store.submit(self.doc['id'], {'operation': 'translate', 'base_revision': self.doc['revision']})

    def test_real_subprocess_timeout_is_recorded(self):
        self.store.runner = self.store.run_engine
        self.store.config['job_timeout'] = 0.000001
        self.store.submit(self.doc['id'], {'operation': 'layout', 'base_revision': self.doc['revision']})
        doc = self.wait_done()
        self.assertEqual(doc['job']['status'], 'error')
        self.assertIn('制限時間', doc['job']['error'])
        self.assertEqual(self.store.pending, 0)

    def test_restart_marks_interruption_without_rerun(self):
        doc = self.store.get(self.doc['id'])
        doc['job'] = {'status': 'running'}; self.store.write(doc)
        other = Store(self.temp.name, {}, self.runner)
        try:
            self.assertEqual(other.get(doc['id'])['job']['status'], 'error')
            self.assertEqual(self.calls, [])
        finally: other.close()

    def test_image_identity_keeps_media_separate(self):
        self.assertEqual(self.create(1)['id'], self.doc['id'])
        self.assertNotEqual(self.create(2)['id'], self.doc['id'])

    def test_public_assistance_is_stored_separately_from_editorial_work(self):
        source = {'media_id': 1, 'item_id': 1, 'image_url': 'https://example.org/image.jpg', 'workflow': 'assist'}
        assist = self.store.create(source, self.image)
        self.assertNotEqual(assist['id'], self.doc['id'])
        self.assertEqual(assist['workflow'], 'assist')
        self.assertEqual(self.store.existing(source)['id'], assist['id'])
        self.assertEqual(self.store.existing({**source, 'workflow': 'editorial'})['id'], self.doc['id'])

    def test_review_requires_two_steps_and_content_changes_return_to_draft(self):
        actor = {'id': 1, 'name': '管理者', 'role': 'global_admin'}
        metadata = {'title': '中務内侍乃日記の翻刻', 'contributors': '加藤咲子\n泉沙希',
            'journal_title': '筑波日本語研究', 'journal_issue': '第30号',
            'publication_url': 'https://example.org/article', 'rights_status': 'copyrighted',
            'rights_holder': '翻刻作成者'}
        self.save([line(raw='確認した翻刻')])
        with self.assertRaisesRegex(Problem, '先に確認済み'):
            self.store.save_review(self.doc['id'], {'base_revision': self.doc['revision'],
                'state': 'published', 'note': '', 'actor': actor})
        with self.assertRaisesRegex(Problem, '翻刻責任者'):
            self.store.save_review(self.doc['id'], {'base_revision': self.doc['revision'],
                'state': 'reviewed', 'note': '画像と照合', 'credit': '', 'actor': actor})
        self.doc = self.store.save_review(self.doc['id'], {'base_revision': self.doc['revision'],
            'state': 'reviewed', 'note': '画像と照合', 'credit': '古典籍翻刻班',
            'metadata': metadata, 'actor': actor})
        self.assertEqual(self.doc['publication_state'], 'reviewed')
        self.assertEqual(self.doc['transcription_credit'], '古典籍翻刻班')
        self.assertEqual(self.doc['transcription_metadata']['journal_issue'], '第30号')
        self.doc = self.store.save_review(self.doc['id'], {'base_revision': self.doc['revision'],
            'state': 'published', 'note': '画像と照合', 'credit': '古典籍翻刻班',
            'metadata': metadata, 'actor': actor})
        self.assertEqual(self.doc['publication_state'], 'published')
        self.doc = self.store.save_review(self.doc['id'], {'base_revision': self.doc['revision'],
            'state': 'published', 'note': '画像と照合', 'credit': '古典籍翻刻班（改訂）',
            'metadata': {**metadata, 'rights_statement': '翻刻作成者が校訂部分の権利を保持'}, 'actor': actor})
        self.assertEqual(self.doc['transcription_credit'], '古典籍翻刻班（改訂）')
        self.assertEqual(self.store.history(self.doc['id'])[-1]['event'], 'publication_metadata')
        with self.assertRaisesRegex(Problem, 'URL'):
            self.store.save_review(self.doc['id'], {'base_revision': self.doc['revision'],
                'state': 'published', 'note': '', 'credit': '古典籍翻刻班', 'metadata': {'publication_url': 'javascript:alert(1)'},
                'actor': actor})
        with self.assertRaisesRegex(Problem, '権利者'):
            self.store.save_review(self.doc['id'], {'base_revision': self.doc['revision'],
                'state': 'published', 'note': '', 'credit': '古典籍翻刻班', 'metadata': {'rights_status': 'copyrighted'},
                'actor': actor})
        self.doc = self.store.save_transcription(self.doc['id'], {'base_revision': self.doc['revision'],
            'lines': [{'id': 'a', 'raw': '再修正した翻刻'}], 'actor': actor})
        self.assertEqual(self.doc['publication_state'], 'draft')
        self.assertEqual(self.store.history(self.doc['id'])[-1]['event'], 'transcription_edit')
        assist = self.store.create({'media_id': 9, 'item_id': 1,
            'image_url': 'https://example.org/assist.jpg', 'workflow': 'assist'}, self.image)
        with self.assertRaisesRegex(Problem, '審査対象'):
            self.store.save_review(assist['id'], {'base_revision': assist['revision'],
                'state': 'reviewed', 'note': '', 'actor': actor})

    def test_review_accepts_empty_optional_metadata(self):
        actor = {'id': 1, 'name': '管理者', 'role': 'global_admin'}
        self.save([line(raw='確認した翻刻')])
        self.doc = self.store.save_review(self.doc['id'], {
            'base_revision': self.doc['revision'], 'state': 'reviewed',
            'note': '', 'credit': '古典籍翻刻班', 'metadata': {}, 'actor': actor,
        })
        self.assertEqual(self.doc['publication_state'], 'reviewed')
        self.assertEqual(self.doc['transcription_metadata'], {})

    def test_administrator_can_save_and_replace_a_manual_translation(self):
        actor = {'id': 1, 'name': '管理者', 'role': 'global_admin'}
        self.save([line(raw='つれづれなるままに')])
        self.doc = self.store.save_manual_translation(self.doc['id'], {
            'base_revision': self.doc['revision'], 'text': 'することもなく、',
            'input': 'つれづれなるままに', 'line_ids': ['a'], 'actor': actor,
        })
        self.assertEqual(self.doc['translation']['text'], 'することもなく、')
        self.assertEqual(self.doc['translation']['method'], 'manual')
        self.assertEqual(self.doc['translation']['editor'], actor)
        self.assertEqual(self.doc['translation_draft']['line_ids'], ['a'])
        self.assertEqual(self.store.history(self.doc['id'])[-1]['event'], 'translation_manual')
        with self.assertRaisesRegex(Problem, '1〜32000文字'):
            self.store.save_manual_translation(self.doc['id'], {
                'base_revision': self.doc['revision'], 'text': ' ',
                'input': 'つれづれなるままに', 'line_ids': ['a'], 'actor': actor,
            })

    def test_commercial_translation_import_records_model_without_credentials(self):
        self.save([line(raw='春はあけぼの。')])
        body = {'base_revision': self.doc['revision'], 'text': '春は夜明けのころがよい。',
            'input': '春はあけぼの。', 'line_ids': ['a'],
            'actor': {'id': 1, 'name': '管理者', 'role': 'global_admin'},
            'method': 'commercial', 'provider': 'openai', 'model': 'fixture-text-1',
            'prompt_revision': 'kobun-browser-translation-1', 'human_edited': True}
        for change in ({'provider': 'unknown'}, {'model': 'https://untrusted.test'},
                       {'prompt_revision': 'unknown'}, {'human_edited': 'yes'}, {'api_key': 'test-only-key'}):
            with self.subTest(change=change), self.assertRaises(Problem):
                self.store.save_manual_translation(self.doc['id'], {**body, **change})
        self.doc = self.store.save_manual_translation(self.doc['id'], body)
        self.assertEqual(self.doc['translation']['model'], 'fixture-text-1')
        self.assertEqual(self.doc['translation']['method'], 'commercial')
        self.assertTrue(self.doc['translation']['human_edited'])
        self.assertEqual(self.doc['publication_state'], 'draft')
        self.assertEqual(self.store.history(self.doc['id'])[-1]['event'], 'translation_commercial')
        self.assertNotIn('api_key', json.dumps(self.store.history(self.doc['id'])))
        self.doc = self.store.save_manual_translation(self.doc['id'], {
            **body, 'base_revision': self.doc['revision'], 'method': 'manual', 'text': '春は明け方がよい。'})
        self.assertEqual(self.doc['translation']['method'], 'manual')
        self.assertEqual(self.store.history(self.doc['id'])[-2]['document']['translation']['model'], 'fixture-text-1')

    def test_http_auth_and_source_allowlist(self):
        for url in ['http://example.org/a', 'https://127.0.0.1/a', 'https://example.org@localhost/a',
                    'https://example.org:444/a', 'https://example.org/a?x=1']:
            with self.subTest(url=url), self.assertRaises(Problem): check_image_url(url, ['example.org'])
        server = ThreadingHTTPServer(('127.0.0.1', 0), make_handler(self.store, 'secret', {}))
        thread = threading.Thread(target=server.serve_forever, daemon=True); thread.start()
        try:
            url = f'http://127.0.0.1:{server.server_port}/documents'
            with self.assertRaises(urllib.error.HTTPError) as error: urllib.request.urlopen(url)
            self.assertEqual(error.exception.code, 401)
            with urllib.request.urlopen(urllib.request.Request(url, headers={'Authorization': 'Bearer secret'})) as response:
                self.assertEqual(len(json.load(response)), 1)
            maintenance = url.replace('/documents', '/maintenance')
            for token, status in (('wrong', 401), ('secret', 200)):
                request = urllib.request.Request(maintenance, data=b'{"enabled":true}',
                    headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
                if status == 401:
                    with self.assertRaises(urllib.error.HTTPError) as error: urllib.request.urlopen(request)
                    self.assertEqual(error.exception.code, status)
                    self.assertFalse(self.store.maintenance)
                else:
                    with urllib.request.urlopen(request) as response:
                        self.assertTrue(json.load(response)['maintenance'])
            self.store.set_maintenance(False)
            request = urllib.request.Request(url + '/' + self.doc['id'] + '/jobs',
                data=json.dumps({'operation': 'translate', 'base_revision': self.doc['revision']}).encode(),
                headers={'Authorization': 'Bearer secret', 'Content-Type': 'application/json'})
            with self.assertRaises(urllib.error.HTTPError) as error: urllib.request.urlopen(request)
            self.assertEqual(error.exception.code, 503)
            self.assertIn('停止中または読み込み中', json.load(error.exception)['error'])
            self.assertEqual(self.store.pending, 0)
        finally: server.shutdown(); thread.join(); server.server_close()


class TranslationTest(unittest.TestCase):
    def test_custom_input_prompt_version_and_overlap_review(self):
        source = 'これは原文とほとんど同じ表現が続く確認用の本文です。'
        response = {'choices': [{'finish_reason': 'stop', 'message': {'content': source}}]}
        with patch('engine.local_json', side_effect=[{'prompt': 'x'}, {'tokens': [1]}, response]) as call:
            result = translate({'lines': [line(raw='画像からの翻刻')], 'input_text': source},
                {'llm_url': 'http://local', 'llm_model': 'test', 'prompt_revision':'kobun-ja-translation-2'})
        self.assertEqual(call.call_args.args[2]['messages'][1]['content'], source)
        self.assertFalse(call.call_args.args[2]['chat_template_kwargs']['enable_thinking'])
        self.assertTrue(result['translation']['input_edited'])
        self.assertEqual(result['translation']['source_transcription'], '画像からの翻刻')
        self.assertEqual(result['translation']['prompt_revision'], 'kobun-ja-translation-2')
        self.assertTrue(result['translation']['review_warnings'])

    def test_context_limit_does_not_silently_truncate(self):
        with patch('engine.local_json', side_effect=[{'prompt': 'x'}, {'tokens': [1]*3100}]) as call:
            with self.assertRaisesRegex(ValueError, '文脈上限'):
                translate({'lines': [line(raw='本文')]}, {'llm_url': 'http://local', 'context_size': 4096, 'prompt_revision':'kobun-ja-translation-2'})
            self.assertEqual(call.call_count, 2)

    def test_selected_input_and_truncated_response_saved(self):
        response = {'choices': [{'finish_reason': 'length', 'message': {'content': '途中'}}]}
        with tempfile.TemporaryDirectory() as temp, patch('engine.local_json', side_effect=[{'prompt': 'x'}, {'tokens': [1]}, response]) as call:
            with self.assertRaisesRegex(ValueError, '途中'):
                translate({'lines': [line('a', raw='対象'), line('b', raw='対象外')], 'line_ids': ['a'], 'run_dir': temp},
                    {'llm_url': 'http://local', 'llm_model': 'test', 'prompt_revision':'kobun-ja-translation-2'})
            self.assertEqual(call.call_args.args[2]['messages'][1]['content'], '対象')
            self.assertEqual(json.loads((Path(temp)/'llm-response.json').read_text()), response)


if __name__ == '__main__': unittest.main()
