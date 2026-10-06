"""Private, versioned prototype storage; one inference subprocess at a time."""
from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
import copy
import hashlib
import io
import json
import math
import os
from pathlib import Path
import re
import subprocess
import sys
import threading
import time
import uuid


class Problem(Exception):
    def __init__(self, message, status=400):
        super().__init__(message)
        self.status = status


def atomic_json(file, value):
    temp = file.with_suffix(".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, allow_nan=False, indent=2))
    os.replace(temp, file)


def validate_lines(lines, width, height):
    if not isinstance(lines, list) or len(lines) > 500:
        raise Problem("行は500件以内の配列で指定してください。")
    result, ids = [], set()
    for i, line in enumerate(lines):
        if not isinstance(line, dict) or not isinstance(line.get('id'), str) or not re.fullmatch(r"[A-Za-z0-9_-]{1,80}", line['id']):
            raise Problem("行IDが不正です。")
        if line["id"] in ids:
            raise Problem("行IDが重複しています。")
        ids.add(line["id"])
        coords = []
        for key in ("x", "y", "width", "height"):
            value = line.get(key)
            if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
                raise Problem("枠の座標には有限の数値が必要です。")
            coords.append(round(value))
        x, y, w, h = coords
        if x < 0 or y < 0 or w < 4 or h < 4 or x+w > width or y+h > height:
            raise Problem("枠が画像の範囲外、または小さすぎます。")
        raw = line.get("raw")
        if raw is not None and (not isinstance(raw, str) or len(raw) > 4000):
            raise Problem("1行の翻刻は4000文字以内で指定してください。")
        row = {"id": line["id"], "x": x, "y": y, "width": w, "height": h,
            "readingOrder": i+1, "classId": 1, "confidence": 0,
            "direction": "vertical" if w < h else "horizontal"}
        if raw is not None:
            row["raw"] = raw
        result.append(row)
    return result


def validate_reading_direction(value):
    if value not in ('auto', 'ltr', 'rtl'):
        raise Problem('読み方向は自動、左から右、右から左のいずれかで指定してください。')
    return value


def validate_workflow(value):
    if value not in ('editorial', 'assist'):
        raise Problem('作業区分が不正です。')
    return value


TRANSCRIPTION_METADATA_LIMITS = {
    'title': 500, 'contributors': 2000, 'contributor_identifiers': 2000,
    'affiliation': 1000, 'contribution_note': 2000,
    'journal_title': 500, 'journal_issue': 200, 'journal_identifiers': 500,
    'publication_year': 20, 'publication_date': 30,
    'publication_pages': 100, 'publisher': 500, 'doi': 300, 'publication_url': 2000,
    'rights_status': 30, 'rights_holder': 500, 'rights_statement': 2000,
    'license_label': 300, 'license_url': 2000, 'citation': 3000,
}


def validate_transcription_metadata(value):
    if value is None:
        return {}
    if not isinstance(value, dict) or set(value) - set(TRANSCRIPTION_METADATA_LIMITS):
        raise Problem('研究成果・権利情報の項目が不正です。')
    result = {}
    for key, limit in TRANSCRIPTION_METADATA_LIMITS.items():
        text = value.get(key, '')
        if not isinstance(text, str) or len(text) > limit:
            raise Problem('研究成果・権利情報の文字数が上限を超えています。')
        text = text.strip()
        if text:
            result[key] = text
    if result.get('rights_status') not in (None, 'copyrighted', 'not_asserted', 'undetermined', 'other'):
        raise Problem('権利状態が不正です。')
    if result.get('rights_status') == 'copyrighted' and not result.get('rights_holder'):
        raise Problem('「著作権あり」を選ぶ場合は権利者を入力してください。')
    if result.get('rights_status') == 'other' and not result.get('rights_statement'):
        raise Problem('「その他・個別条件」を選ぶ場合は権利に関する説明を入力してください。')
    for key in ('publication_url', 'license_url'):
        url = result.get(key)
        if url and not re.fullmatch(r'https?://[^\s]{1,1990}', url):
            raise Problem('掲載先・ライセンスのURLはhttpまたはhttpsで入力してください。')
    return result


class Store:
    def __init__(self, root, config, runner=None):
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)
        self.config = config
        self.lock = threading.RLock()
        self.executor = ThreadPoolExecutor(max_workers=1, thread_name_prefix="kobun")
        self.pending = 0
        self.runner = runner or self.run_engine
        # Interrupted work is visible and can be retried; never silently restarted.
        for file in self.root.glob("*/document.json"):
            doc = json.loads(file.read_text())
            if doc.get("job", {}).get("status") in ("queued", "running"):
                doc["job"].update(status="error", error="実行部が停止しました。保存済み状態から再実行してください。")
                doc["status"] = "error"
                self.commit(doc, "interrupted")

    def directory(self, ident):
        if not isinstance(ident, str) or not re.fullmatch(r"[a-f0-9]{24}", ident):
            raise Problem("作業IDが不正です。", 404)
        return self.root / ident

    def get(self, ident):
        with self.lock:
            try:
                return json.loads((self.directory(ident) / "document.json").read_text())
            except FileNotFoundError:
                raise Problem("作業が見つかりません。", 404)

    def list(self):
        with self.lock:
            return [json.loads(f.read_text()) for f in sorted(self.root.glob("*/document.json"), reverse=True)]

    def history(self, ident):
        self.get(ident)
        with self.lock:
            return [json.loads(f.read_text()) for f in sorted((self.directory(ident)/"history").glob("*.json"))]

    def write(self, doc):
        atomic_json(self.directory(doc["id"])/"document.json", doc)

    def commit(self, doc, event, actor=None):
        doc["revision"] += 1
        doc["history_count"] = doc["revision"]
        folder = self.directory(doc["id"])/"history"
        folder.mkdir(exist_ok=True)
        record = {"event": event, "recorded_at": time.time(), "document": doc}
        if actor is not None:
            record['actor'] = actor
        atomic_json(folder/f'{doc["revision"]:06d}.json', record)
        self.write(doc)

    def existing(self, source):
        workflow = validate_workflow(source.get('workflow', 'editorial'))
        for doc in self.list():
            if (doc.get('workflow', 'editorial') == workflow
                and doc["source"]["media_id"] == source["media_id"]
                and doc["source"]["image_url"] == source["image_url"]):
                return doc
        return None

    def create(self, source, data, fetch_ms=0):
        from PIL import Image
        Image.MAX_IMAGE_PIXELS = 25_000_000
        with Image.open(io.BytesIO(data)) as image:
            width, height = image.size
            if width < 4 or height < 4 or width*height > 25_000_000 or image.format != "JPEG":
                raise Problem("入力は2500万画素以下のJPEG画像で指定してください。")
            image.load()
        digest = hashlib.sha256(data).hexdigest()
        workflow = validate_workflow(source.get('workflow', 'editorial'))
        # Preserve identifiers made before workflows were introduced.
        identity = f'{source["media_id"]}:{digest}' if workflow == 'editorial' else f'{workflow}:{source["media_id"]}:{digest}'
        ident = hashlib.sha256(identity.encode()).hexdigest()[:24]
        with self.lock:
            folder = self.directory(ident)
            if (folder/"document.json").exists():
                return self.get(ident)
            folder.mkdir(exist_ok=True)
            (folder/"image.jpg").write_bytes(data)
            doc = {"id": ident, "workflow": workflow, "publication_state": "draft", "source": source,
                "width": width, "height": height, "image_sha256": digest,
                "revision": 0, "history_count": 0, "lines": [], "regions": [], "translation": None,
                "reading_direction": "auto", "status": "image", "created_at": time.time(),
                "last_metrics": {"image_fetch_ms": fetch_ms}}
            self.commit(doc, "image_saved")
            return doc

    def check_revision(self, doc, revision):
        if type(revision) is not int or revision != doc["revision"]:
            raise Problem("別の画面で更新されました。ページを開き直してから調整してください。", 409)
        if doc.get("job", {}).get("status") in ("queued", "running"):
            raise Problem("処理中のため変更できません。", 409)

    def save_layout(self, ident, body):
        with self.lock:
            doc = self.get(ident)
            self.check_revision(doc, body.get("base_revision"))
            reading_direction = validate_reading_direction(body.get('reading_direction', doc.get('reading_direction', 'auto')))
            direction_changed = reading_direction != doc.get('reading_direction', 'auto')
            lines = validate_lines(body.get("lines"), doc["width"], doc["height"])
            previous = {line["id"]: line for line in doc["lines"]}
            for line in lines:
                if direction_changed:
                    line.pop("raw", None)
                    line.pop("machineRaw", None)
                old = previous.get(line["id"])
                same_box = old and all(line[k] == old[k] for k in ("x", "y", "width", "height"))
                if same_box:
                    for key in ("confidence", "ndlClass"):
                        if key in old:
                            line[key] = old[key]
                    if not direction_changed and 'machineRaw' in old:
                        line['machineRaw'] = old['machineRaw']
                elif old:
                    # A stale transcription must not be associated with a changed crop.
                    line.pop("raw", None)
            doc.update(lines=lines, reading_direction=reading_direction,
                translation=None, translation_draft=None, status="edited", publication_state='draft')
            self.commit(doc, "human_edit")
            return doc

    def save_transcription(self, ident, body):
        """Update line text only; geometry, order, OCR output and history remain attributable."""
        with self.lock:
            doc = self.get(ident)
            self.check_revision(doc, body.get('base_revision'))
            submitted = body.get('lines')
            if not isinstance(submitted, list) or len(submitted) != len(doc['lines']):
                raise Problem('翻刻の行数が保存済みレイアウトと一致しません。')
            values = {}
            for line in submitted:
                if not isinstance(line, dict) or set(line) != {'id', 'raw'}:
                    raise Problem('翻刻には行IDと本文だけを指定してください。')
                ident_value, raw = line['id'], line['raw']
                if not isinstance(ident_value, str) or ident_value in values:
                    raise Problem('翻刻の行IDが不正です。')
                if not isinstance(raw, str) or len(raw) > 4000:
                    raise Problem('1行の翻刻は4000文字以内で指定してください。')
                values[ident_value] = raw
            stored_ids = [line['id'] for line in doc['lines']]
            if list(values) != stored_ids:
                raise Problem('翻刻の行と読み順が保存済みレイアウトと一致しません。')
            if not any(raw.strip() for raw in values.values()):
                raise Problem('翻刻を1文字以上入力してください。')
            actor = body.get('actor')
            if (not isinstance(actor, dict) or type(actor.get('id')) is not int or actor['id'] <= 0
                or not isinstance(actor.get('name'), str) or not actor['name'] or len(actor['name']) > 200
                or not isinstance(actor.get('role'), str) or not re.fullmatch(r'[a-z_]{1,80}', actor['role'])):
                raise Problem('編集者の記録が不正です。')
            changed = False
            for line in doc['lines']:
                if line.get('raw') != values[line['id']]:
                    line['raw'] = values[line['id']]
                    changed = True
            if not changed:
                return doc
            recorded_at = time.time()
            doc.update(translation=None, translation_draft=None, status='transcription', publication_state='draft',
                transcription_updated_at=recorded_at, transcription_editor=actor)
            self.commit(doc, 'transcription_edit', actor)
            return doc

    def translation_input(self, doc, body):
        selected = body.get('line_ids')
        lines = doc['lines']
        if not isinstance(selected, list) or not selected or any(not isinstance(s, str) for s in selected):
            raise Problem('翻訳する行の範囲を指定してください。')
        ids = [line['id'] for line in lines]
        if len(set(selected)) != len(selected) or not set(selected).issubset(ids):
            raise Problem('翻訳対象の行が不正です。')
        first = ids.index(selected[0])
        if ids[first:first+len(selected)] != selected:
            raise Problem('読み順に連続した行を指定してください。')
        text = body.get('text')
        if not isinstance(text, str) or not text.strip() or len(text) > 16000:
            raise Problem('翻訳用本文は1〜16000文字で入力してください。')
        targets = lines[first:first+len(selected)]
        if any('raw' not in line for line in targets):
            raise Problem('範囲内に未認識の行があります。翻刻を確認してください。')
        return {'text': text, 'line_ids': selected,
            'source_transcription': '\n'.join(line['raw'] for line in targets)}

    def save_translation_input(self, ident, body):
        with self.lock:
            doc = self.get(ident)
            self.check_revision(doc, body.get('base_revision'))
            draft = self.translation_input(doc, body)
            if doc.get('translation_draft') == draft:
                return doc
            doc.update(translation_draft=draft, translation=None, publication_state='draft')
            self.commit(doc, 'translation_input_edit')
            return doc

    def delete_translation(self, ident, body):
        """Remove the current generated translation while retaining input and version history."""
        with self.lock:
            doc = self.get(ident)
            self.check_revision(doc, body.get('base_revision'))
            if doc.get('translation') is None:
                return doc
            actor = body.get('actor')
            if (not isinstance(actor, dict) or type(actor.get('id')) is not int or actor['id'] <= 0
                or not isinstance(actor.get('name'), str) or not actor['name'] or len(actor['name']) > 200
                or not isinstance(actor.get('role'), str) or not re.fullmatch(r'[a-z_]{1,80}', actor['role'])):
                raise Problem('削除者の記録が不正です。')
            doc.update(translation=None, status='translation_deleted', publication_state='draft')
            self.commit(doc, 'translation_delete', actor)
            return doc

    def save_manual_translation(self, ident, body):
        """Save an editorial translation, including browser-imported commercial output."""
        with self.lock:
            doc = self.get(ident)
            if doc.get('workflow', 'editorial') != 'editorial':
                raise Problem('公開閲覧用の機械処理結果には訳文を入力できません。')
            self.check_revision(doc, body.get('base_revision'))
            if any(key in body for key in ('api_key', 'key', 'passphrase')):
                raise Problem('APIキーやパスフレーズはサーバへ送信できません。')
            method = body.get('method', 'manual')
            if method not in ('manual', 'commercial'):
                raise Problem('現代語訳の作成方法が不正です。')
            provider, model, prompt_revision = '', '', ''
            if method == 'commercial':
                provider, model = body.get('provider'), body.get('model')
                prompt_revision = body.get('prompt_revision')
                if (provider not in ('openai', 'anthropic', 'google')
                    or not isinstance(model, str) or not re.fullmatch(r'[A-Za-z0-9._-]{1,120}', model)
                    or prompt_revision != 'kobun-browser-translation-1'
                    or type(body.get('human_edited', False)) is not bool):
                    raise Problem('商用LLMのモデル・生成情報が不正です。')
            text = body.get('text')
            if not isinstance(text, str) or not text.strip() or len(text) > 32000:
                raise Problem('現代語訳は1〜32000文字で入力してください。')
            source = self.translation_input(doc, {
                'text': body.get('input'), 'line_ids': body.get('line_ids'),
            })
            actor = body.get('actor')
            if (not isinstance(actor, dict) or type(actor.get('id')) is not int or actor['id'] <= 0
                or not isinstance(actor.get('name'), str) or not actor['name'] or len(actor['name']) > 200
                or not isinstance(actor.get('role'), str) or not re.fullmatch(r'[a-z_]{1,80}', actor['role'])):
                raise Problem('訳文入力者の記録が不正です。')
            translation = {
                'text': text.strip(), 'input': source['text'], 'line_ids': source['line_ids'],
                'source_transcription': source['source_transcription'],
                'input_edited': source['text'] != source['source_transcription'].replace('\n', ''),
                'method': method, 'model': model, 'uncertainties': [], 'review_warnings': [],
                'editor': actor, 'edited_at': time.time(),
            }
            if method == 'commercial':
                from translation_policy import check_text
                try:
                    translation['text'], warnings, _ = check_text(text, source['text'])
                except ValueError as error:
                    raise Problem(str(error)) from error
                translation.update(provider=provider, prompt_revision=prompt_revision,
                    human_edited=body.get('human_edited', False),
                    origin='browser_import',
                    review_warnings=['商用LLMの生成結果を管理者がブラウザから取り込んだ訳です。内容を確認してください。', *warnings])
            if doc.get('translation') == translation:
                return doc
            event = 'translation_commercial' if method == 'commercial' else 'translation_manual'
            doc.update(translation=translation, translation_draft=source,
                status=event, publication_state='draft')
            self.commit(doc, event, actor)
            return doc

    def save_review(self, ident, body):
        """Record an accountable editorial decision without changing generated content."""
        with self.lock:
            doc = self.get(ident)
            if doc.get('workflow', 'editorial') != 'editorial':
                raise Problem('公開閲覧用の機械処理結果は審査対象にできません。')
            self.check_revision(doc, body.get('base_revision'))
            state = body.get('state')
            if state not in ('draft', 'reviewed', 'published'):
                raise Problem('公開状態が不正です。')
            if state in ('reviewed', 'published'):
                if not doc.get('lines') or any('raw' not in line for line in doc['lines']):
                    raise Problem('全行の翻刻を確認してから状態を変更してください。')
            if (state == 'published'
                    and doc.get('publication_state', 'draft') not in ('reviewed', 'published')):
                raise Problem('先に確認済みにしてください。', 409)
            actor = body.get('actor')
            if (not isinstance(actor, dict) or type(actor.get('id')) is not int or actor['id'] <= 0
                or not isinstance(actor.get('name'), str) or not actor['name'] or len(actor['name']) > 200
                or not isinstance(actor.get('role'), str) or not re.fullmatch(r'[a-z_]{1,80}', actor['role'])):
                raise Problem('確認者の記録が不正です。')
            note = body.get('note', '')
            if not isinstance(note, str) or len(note) > 2000:
                raise Problem('確認メモは2000文字以内で入力してください。')
            credit = body.get('credit', '')
            if not isinstance(credit, str) or len(credit) > 500:
                raise Problem('翻刻責任者は500文字以内で入力してください。')
            credit = credit.strip()
            if state in ('reviewed', 'published') and not credit:
                raise Problem('確認済みまたは公開にするには、翻刻責任者を入力してください。')
            metadata = validate_transcription_metadata(body.get('metadata'))
            state_changed = doc.get('publication_state', 'draft') != state
            if (not state_changed and doc.get('review_note', '') == note
                    and doc.get('transcription_credit', '') == credit
                    and doc.get('transcription_metadata', {}) == metadata):
                return doc
            doc.update(publication_state=state, reviewed_at=time.time(), reviewer=actor,
                       review_note=note, transcription_credit=credit, transcription_metadata=metadata)
            self.commit(doc, 'publication_' + state if state_changed else 'publication_metadata', actor)
            return doc

    def submit(self, ident, body):
        with self.lock:
            doc = self.get(ident)
            operation = body.get("operation")
            if operation not in ("layout", "recognize", "translate"):
                raise Problem("未対応の処理です。")
            selected = body.get('line_ids')
            draft = doc.get('translation_draft') if operation == 'translate' else None
            if draft:
                if selected is not None and selected != draft['line_ids']:
                    raise Problem('保存した翻訳用本文と行範囲が一致しません。')
                selected = draft['line_ids']
            # A double click joins an existing identical operation, without spawning a process.
            current = doc.get("job", {})
            if current.get("status") in ("queued", "running"):
                if current["operation"] == operation and current.get("line_ids") == selected:
                    return doc
                raise Problem("このページは処理中です。", 409)
            self.check_revision(doc, body.get("base_revision"))
            if operation == "layout" and doc["lines"] and not body.get("force"):
                raise Problem("レイアウトの再認識には確認が必要です。", 409)
            if operation in ("recognize", "translate") and not doc["lines"]:
                raise Problem("先にレイアウトを認識・調整してください。")
            if selected is not None and (not isinstance(selected, list) or not selected
                or any(not isinstance(s, str) for s in selected) or len(set(selected)) != len(selected)
                or not set(selected).issubset({line["id"] for line in doc["lines"]})):
                raise Problem("翻訳対象の行が不正です。")
            if operation == "translate":
                targets = [line for line in doc["lines"] if selected is None or line["id"] in selected]
                if any("raw" not in line for line in targets) or not any(line.get("raw", "").strip() for line in targets):
                    raise Problem("未認識の行があります。先に文字認識または翻刻入力を行ってください。")
            if self.pending >= 4:
                raise Problem("処理待ちが上限に達しました。完了後に再実行してください。", 429)
            job = {"id": uuid.uuid4().hex, "operation": operation, "status": "queued", "line_ids": selected,
                "input_revision": doc["revision"], "accepted_at": time.time()}
            if operation == 'translate':
                job['input_text'] = draft['text'] if draft else ''.join(line.get('raw', '') for line in targets)
            doc["job"] = job
            self.write(doc)
            self.pending += 1
            self.executor.submit(self.perform, ident, copy.deepcopy(job))
            return doc

    def run_engine(self, payload, folder):
        atomic_json(folder/"input.json", payload)
        started = time.perf_counter()
        try:
            completed = subprocess.run([sys.executable, str(Path(__file__).with_name("engine.py")),
                "--input", str(folder/"input.json"), "--output", str(folder/"output.json")],
                capture_output=True, text=True, timeout=self.config.get("job_timeout", 300))
        except subprocess.TimeoutExpired as exc:
            (folder/'stdout.log').write_bytes(exc.stdout or b'')
            (folder/'stderr.log').write_bytes(exc.stderr or b'')
            raise
        (folder/"stdout.log").write_text(completed.stdout)
        (folder/"stderr.log").write_text(completed.stderr)
        if completed.returncode:
            reason = completed.stderr.strip().splitlines()[-1] if completed.stderr.strip() else "文字認識処理が終了しました。"
            raise Problem(reason[:600], 500)
        result = json.loads((folder/"output.json").read_text())
        result["metrics"]["subprocess_wall_ms"] = (time.perf_counter()-started)*1000
        return result

    def perform(self, ident, job):
        try:
            with self.lock:
                doc = self.get(ident)
                job.update(status="running", started_at=time.time())
                doc["job"] = job
                self.write(doc)
                folder = self.directory(ident)/"runs"/job["id"]
                folder.mkdir(parents=True)
                payload = {"config": self.config, "operation": job["operation"], "line_ids": job.get("line_ids"),
                    "run_dir": str(folder),
                    "image_path": str(self.directory(ident)/"image.jpg"), "lines": doc["lines"], "regions": doc["regions"],
                    "reading_direction": doc.get('reading_direction', 'auto')}
                if job['operation'] == 'translate':
                    payload['input_text'] = job['input_text']
            result = self.runner(payload, folder)
            with self.lock:
                doc = self.get(ident)
                if doc["revision"] != job["input_revision"] or doc["job"]["id"] != job["id"]:
                    raise Problem("入力の版が変わったため結果を採用しませんでした。", 409)
                if job["operation"] in ("layout", "recognize"):
                    validate_lines(result["lines"], doc["width"], doc["height"])
                    doc.update(lines=result["lines"], regions=result.get("regions", []), translation=None, translation_draft=None)
                else:
                    doc["translation"] = result["translation"]
                metrics = {**result["metrics"], "queue_ms": (job["started_at"]-job["accepted_at"])*1000,
                    "end_to_end_ms": (time.time()-job["accepted_at"])*1000}
                job.update(status="completed", finished_at=time.time(), metrics=metrics)
                provenance = doc.setdefault('provenance', {})
                provenance[job['operation']] = {key: metrics[key] for key in (
                    'ndl_revision', 'weights_sha256', 'llm_model_sha256', 'llama_revision',
                    'prompt_revision', 'engine_ms', 'end_to_end_ms') if key in metrics}
                provenance[job['operation']]['recorded_at'] = time.time()
                doc.update(job=job, last_metrics=metrics, status=job["operation"], publication_state='draft')
                self.commit(doc, job["operation"])
        except Exception as exc:
            with self.lock:
                doc = self.get(ident)
                error = "処理が制限時間を超えたため停止しました。" if isinstance(exc, subprocess.TimeoutExpired) else str(exc)
                metrics = {'end_to_end_ms': (time.time()-job['accepted_at'])*1000,
                    'queue_ms': (job.get('started_at', time.time())-job['accepted_at'])*1000,
                    'failure_type': type(exc).__name__, 'job_timeout_seconds': self.config.get('job_timeout', 300)}
                job.update(status="error", error=error, finished_at=time.time(), metrics=metrics)
                doc.update(job=job, status="error", last_metrics=metrics)
                self.commit(doc, "error")
        finally:
            with self.lock:
                self.pending -= 1

    def close(self):
        self.executor.shutdown(wait=True)
