"""Expiry, private-result isolation, cleanup and indexed assistance lookups."""
import copy
import json
from pathlib import Path
import re
import shutil
import sqlite3
import threading
import time

from cache_policy import CACHE_WORKFLOWS, DEFAULTS, VERSION, Fingerprints, transcription_digest, validate_policy


def problem(message, status=400):
    from store import Problem
    raise Problem(message, status)


def folder_bytes(folder):
    return sum(file.stat().st_size for file in folder.rglob('*') if not file.is_symlink() and file.is_file())


class CacheStorage:
    def _init_cache(self):
        self._cache_protected = set()
        self.temporary_root = self.root/'temporary'
        self.temporary_root.mkdir(exist_ok=True)
        self._fingerprints = Fingerprints(self.config)
        file = self.root/'cache-policy.json'
        self.cache_policy = validate_policy(json.loads(file.read_text())) if file.exists() else dict(DEFAULTS)
        self._cache_db = sqlite3.connect(self.root/'cache-index.sqlite3', check_same_thread=False)
        self._cache_db.execute('CREATE TABLE IF NOT EXISTS documents (id TEXT PRIMARY KEY, workflow TEXT NOT NULL, '
            'media INTEGER, url TEXT, scope TEXT, parent TEXT, expires REAL)')
        self._cache_db.execute('CREATE INDEX IF NOT EXISTS sources ON documents(workflow,media,url,scope)')
        self._cache_db.execute('CREATE INDEX IF NOT EXISTS parents ON documents(parent,scope)')
        self._cache_db.execute('DELETE FROM documents')
        for file in self._document_files():
            self._index_doc(json.loads(file.read_text()))
        self._cache_stop = threading.Event()
        self._cache_thread = None

    def _document_files(self):
        return [*self.root.glob('*/document.json'), *self.temporary_root.glob('*/document.json')]

    def _start_cache_cleanup(self):
        self.cleanup_cache()
        def reap():
            while not self._cache_stop.wait(60):
                try:
                    self.cleanup_cache()
                except Exception as exc:
                    # Do not log documents or credentials, and retry next minute.
                    print(f'Cache cleanup failed: {type(exc).__name__}', flush=True)
        self._cache_thread = threading.Thread(target=reap, name='kobun-cache-cleanup', daemon=True)
        self._cache_thread.start()

    def cache_scope(self, source):
        scope = source.get('cache_scope', 'shared')
        if scope != 'shared' and (not isinstance(scope, str) or not re.fullmatch(r'[a-f0-9]{64}', scope)):
            problem('閲覧セッションの指定が不正です。')
        if source.get('workflow') == 'assist_translation' and scope == 'shared':
            problem('個人用の現代語訳には閲覧セッションが必要です。')
        return scope

    def cache_expiry(self, doc):
        if doc.get('workflow') not in CACHE_WORKFLOWS:
            return None
        policy = self.cache_policy
        private = doc['workflow'] == 'assist_translation' or self.cache_scope(doc['source']) != 'shared'
        origin = (doc.get('translation_generated_at') if doc['workflow'] == 'assist_translation'
            else doc.get('ocr_generated_at')) or doc.get('cache_completed_at') or doc.get('created_at', 0)
        return origin + (policy['private_ttl_minutes'] * 60 if private or not doc.get('ocr_generated_at')
            else policy['ocr_ttl_hours'] * 3600)

    def _index_doc(self, doc):
        source = doc['source']
        self._cache_db.execute('INSERT OR REPLACE INTO documents VALUES (?,?,?,?,?,?,?)',
            (doc['id'], doc.get('workflow', 'editorial'), source.get('media_id'), source.get('image_url'),
             self.cache_scope(source), doc.get('parent_id'), self.cache_expiry(doc)))
        self._cache_db.commit()

    def _read_raw(self, ident):
        try:
            return json.loads((self.directory(ident)/'document.json').read_text())
        except FileNotFoundError:
            problem('一時的な結果は期限切れ、または削除されています。もう一度実行してください。', 404)

    def _cache_invalid(self, doc):
        if doc.get('workflow') not in CACHE_WORKFLOWS:
            return False
        if doc.get('retention_version') != VERSION:
            return True
        if doc['workflow'] == 'assist_translation':
            if doc.get('translation_fingerprint') != self._fingerprints.translation():
                return True
            try:
                parent = self._read_raw(doc['parent_id'])
            except Exception:
                return True
            if parent.get('workflow', 'editorial') == 'editorial' and (
                parent.get('publication_state') != 'published' or parent.get('translation')):
                return True
            return (self._cache_invalid(parent) or (self.cache_expiry(parent) is not None
                and time.time() >= self.cache_expiry(parent)) or doc.get('source_fingerprint') != transcription_digest(parent))
        return (doc.get('ocr_fingerprint') != self._fingerprints.ocr()
            or (self.cache_scope(doc['source']) == 'shared' and self.cache_policy['ocr_mode'] != 'shared'))

    def _busy(self, doc):
        return doc.get('job', {}).get('status') in ('queued', 'running')

    def _delete_cache_doc(self, doc):
        # Missing/legacy workflow is always editorial and never deleted here.
        if doc.get('workflow') not in CACHE_WORKFLOWS or self._busy(doc) or doc['id'] in self._cache_protected:
            return False
        folder = self.directory(doc['id'])
        if folder.is_symlink():
            problem('一時保存領域の構成を確認してください。', 503)
        if folder.exists():
            shutil.rmtree(folder)
        self._cache_db.execute('DELETE FROM documents WHERE id=?', (doc['id'],))
        self._cache_db.commit()
        self._invalidate_children(doc['id'])
        return True

    def _invalidate_children(self, ident):
        for (child_id,) in self._cache_db.execute('SELECT id FROM documents WHERE parent=?', (ident,)).fetchall():
            child = self._read_raw(child_id)
            if self._busy(child):
                child['discard_requested'] = True
                self.write(child)
            else:
                self._delete_cache_doc(child)

    def _scrub_translation(self, doc, event='temporary_translation_removed', keep_run=None):
        """Remove expired output from current state, all versions and run logs."""
        folder = self.directory(doc['id'])
        from store import atomic_json
        # Audit entries retain actors/times, never expired machine text.
        for file in (folder/'history').glob('*.json'):
            record = json.loads(file.read_text())
            if 'document' in record:
                record.pop('document')
                atomic_json(file, record)
        for run in (folder/'runs').glob('*'):
            if run.name != keep_run:
                shutil.rmtree(run)
        doc.update(translation=None, translation_draft=None, last_metrics={})
        doc.setdefault('provenance', {}).pop('translate', None)
        for key in ('translation_generated_at', 'translation_fingerprint', 'translation_attempted_at'):
            doc.pop(key, None)
        if doc.get('job', {}).get('operation') == 'translate':
            doc.pop('job', None)
            doc['status'] = 'recognize'
        if event:
            self.commit(doc, event)

    def _translation_expired(self, doc, now):
        return (doc.get('workflow') == 'assist' and (doc.get('translation') is not None or doc.get('translation_attempted_at'))
            and (self.cache_policy['translation_mode'] != 'shared'
                or self.cache_scope(doc['source']) != 'shared'
                or doc.get('translation_fingerprint') != self._fingerprints.translation()
                or now >= (doc.get('translation_generated_at') or doc.get('translation_attempted_at') or 0)
                + self.cache_policy['translation_ttl_minutes'] * 60))

    def _check_cache(self, doc):
        if doc.get('workflow') not in CACHE_WORKFLOWS:
            return doc
        now = time.time()
        if not self._busy(doc) and (doc.get('discard_requested') or self._cache_invalid(doc) or now >= self.cache_expiry(doc)):
            self._delete_cache_doc(doc)
            problem('一時的な結果の有効期限が切れました。もう一度実行してください。', 410)
        if self._translation_expired(doc, now):
            if self._busy(doc):
                # The running inference may still write its private logs.
                doc['translation'] = None
            else:
                self._scrub_translation(doc)
        return doc

    def set_cache_policy(self, value):
        from store import atomic_json
        policy = validate_policy(value)
        with self.lock:
            changed = policy != self.cache_policy
            if changed:
                atomic_json(self.root/'cache-policy.json', policy)
                self.cache_policy = policy
                self.cleanup_cache()
            return dict(self.cache_policy)

    def cleanup_cache(self):
        with self.lock:
            candidates, removed, purged, now = [], 0, 0, time.time()
            orphans = []
            for folder in self.temporary_root.iterdir():
                if (not folder.is_symlink() and folder.is_dir() and re.fullmatch(r'[a-f0-9]{24}', folder.name)
                    and not (folder/'document.json').exists()):
                    if now >= folder.stat().st_mtime + self.cache_policy['private_ttl_minutes'] * 60:
                        shutil.rmtree(folder); removed += 1
                    else:
                        orphans.append(folder)
            rows = self._cache_db.execute("SELECT id FROM documents WHERE workflow IN ('assist','assist_translation')").fetchall()
            for (ident,) in rows:
                try:
                    doc = self._read_raw(ident)
                except Exception:
                    self._cache_db.execute('DELETE FROM documents WHERE id=?', (ident,)); self._cache_db.commit()
                    continue
                if doc.get('workflow') not in CACHE_WORKFLOWS:
                    self._index_doc(doc)
                    continue
                if not self._busy(doc):
                    if doc.get('discard_requested') or self._cache_invalid(doc) or now >= self.cache_expiry(doc):
                        removed += int(self._delete_cache_doc(doc))
                        continue
                    if self._translation_expired(doc, now):
                        self._scrub_translation(doc); purged += 1
                self._index_doc(doc)
                candidates.append((self.cache_expiry(doc), ident, folder_bytes(self.directory(ident)), self._busy(doc)))
            size, count = sum(row[2] for row in candidates) + sum(folder_bytes(folder) for folder in orphans), len(candidates) + len(orphans)
            for folder in orphans:
                if count > self.cache_policy['max_documents'] or size > self.cache_policy['max_megabytes'] * 1024**2:
                    size -= folder_bytes(folder); count -= 1; shutil.rmtree(folder); removed += 1
            for _, ident, amount, busy in sorted(candidates):
                if count <= self.cache_policy['max_documents'] and size <= self.cache_policy['max_megabytes'] * 1024**2:
                    break
                if not busy:
                    try:
                        if self._delete_cache_doc(self._read_raw(ident)):
                            count -= 1; size -= amount; removed += 1
                    except Exception:
                        continue
            # Deleting a parent also deletes its private children. Recount the
            # remaining directories rather than reporting stale candidate totals.
            remaining = [self.directory(ident) for (ident,) in self._cache_db.execute(
                "SELECT id FROM documents WHERE workflow IN ('assist','assist_translation')").fetchall()]
            remaining.extend(folder for folder in orphans if folder.exists())
            return {'removed_documents': removed, 'purged_translations': purged,
                'documents': len(remaining), 'bytes': sum(folder_bytes(folder) for folder in remaining),
                'pending': self.pending, 'policy': dict(self.cache_policy)}

    def _ensure_cache_capacity(self, amount):
        self.cleanup_cache()
        # Staging leftovers from an interrupted write are safe to reclaim:
        # this directory contains temporary assistance data only.
        for folder in self.temporary_root.iterdir():
            if not folder.is_symlink() and folder.is_dir() and re.fullmatch(r'[a-f0-9]{24}', folder.name) and not (folder/'document.json').exists():
                shutil.rmtree(folder)
        rows = self._cache_db.execute("SELECT id FROM documents WHERE workflow IN ('assist','assist_translation') ORDER BY expires").fetchall()
        docs = [self._read_raw(ident) for (ident,) in rows]
        sizes = {doc['id']: folder_bytes(self.directory(doc['id'])) for doc in docs}
        count, size = len(docs), sum(sizes.values())
        for doc in docs:
            if count < self.cache_policy['max_documents'] and size + amount <= self.cache_policy['max_megabytes'] * 1024**2:
                return
            if self._delete_cache_doc(doc):
                count -= 1; size -= sizes[doc['id']]
        if count >= self.cache_policy['max_documents'] or size + amount > self.cache_policy['max_megabytes'] * 1024**2:
            problem('一時保存領域が使用中です。処理が完了してからもう一度実行してください。', 429)

    def start_private_translation(self, ident, body):
        if set(body) != {'scope', 'base_revision'} or body['scope'] == 'shared':
            problem('閲覧セッションの指定が不正です。')
        scope = self.cache_scope({'workflow': 'assist_translation', 'cache_scope': body['scope']})
        with self.lock:
            parent = self.get(ident)
            if parent.get('workflow', 'editorial') == 'editorial' and (
                parent.get('publication_state') != 'published' or parent.get('translation')):
                problem('確認・公開用データへの追加処理はできません。', 409)
            if parent.get('workflow') == 'assist_translation' or (
                self.cache_scope(parent['source']) not in ('shared', scope)):
                problem('結果が見つかりません。', 404)
            self.check_revision(parent, body['base_revision'])
            if not parent['lines'] or any('raw' not in line for line in parent['lines']):
                problem('先に文字認識を完了してください。')
            for (child_id,) in self._cache_db.execute('SELECT id FROM documents WHERE parent=? AND scope=?', (ident, scope)).fetchall():
                child = self._read_raw(child_id)
                if self._busy(child) and not child.get('discard_requested'):
                    return child, False
            if self.maintenance or self.pending >= 4:
                problem('処理待ち、または実行サービスの切替中です。少し待ってから実行してください。', 429)
            source = {**parent['source'], 'workflow': 'assist_translation', 'cache_scope': scope}
            self._cache_protected.add(ident)
            try:
                child = self.create(source, (self.directory(ident)/'image.jpg').read_bytes())
            finally:
                self._cache_protected.discard(ident)
            child.update(parent_id=ident, source_fingerprint=transcription_digest(parent),
                lines=copy.deepcopy(parent['lines']), regions=copy.deepcopy(parent['regions']),
                reading_direction=parent.get('reading_direction', 'auto'), status='recognize')
            self.commit(child, 'private_translation_input')
            try:
                return self.submit(child['id'], {'operation': 'translate', 'base_revision': child['revision']}), True
            except Exception:
                self._delete_cache_doc(child)
                raise

    def forget_private(self, body):
        if set(body) != {'scope', 'target'} or body['target'] not in ('translation', 'all') or body['scope'] == 'shared':
            problem('閲覧セッションの指定が不正です。')
        scope = self.cache_scope({'cache_scope': body['scope']})
        with self.lock:
            removed = 0
            for (ident,) in self._cache_db.execute("SELECT id FROM documents WHERE scope=? AND workflow IN ('assist','assist_translation')", (scope,)).fetchall():
                doc = self._read_raw(ident)
                if body['target'] == 'translation' and doc['workflow'] != 'assist_translation':
                    continue
                if self._busy(doc):
                    doc['discard_requested'] = True; self.write(doc)
                else:
                    removed += int(self._delete_cache_doc(doc))
            return {'removed_documents': removed}
