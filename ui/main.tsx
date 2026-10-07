/**
 * Reading-order keyboard/button behavior and vertical result layout are adapted from
 * honkoku-ocr-web, Yuta Hashimoto, CC BY 4.0, revision 24469701412edda5be26c89784a29c7525bbb899.
 * Changes: Omeka workflow integration; horizontal-mode controls; textarea editing and persistence.
 */
import { createRoot } from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';
import { ImageViewer, type ImageViewerHandle } from './ImageViewer';
import type { BoundingBox, Document, LineBox, Page, ReadingDirection, TranscriptionMetadata } from './types';
import { boxDirection, directionName, effectiveReadingDirection, lineDirection, pageDirection,
  readingDirectionName, reorderForReadingDirection } from './direction';
import './workspace.css';
import './viewer.css';
import { llmState, subscribeLlm, mountLlmSettings, providerNames, confirmCommercial, translateCommercial, type ExternalTranslation } from './llm';
import '../asset/llm-settings.css';

const root = document.getElementById('kobun-workspace')!;
const canManage = root.dataset.canManage === '1';
const canEditTranscription = root.dataset.canEditTranscription === '1';
const transcriptionScope = root.dataset.transcriptionScope === 'all' ? 'all' : 'owned';
const endpointUrl = (endpoint: string) => `${root.dataset.proxy}?endpoint=${encodeURIComponent(endpoint)}`;
async function readResponse(response: Response) {
  if (!response.headers.get('content-type')?.includes('json')) throw new Error('ログイン状態と接続を確認し、ページを再読み込みしてください。');
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `通信に失敗しました (${response.status})`);
  return data;
}
async function api<T>(endpoint: string, method = 'GET', body?: unknown): Promise<T> {
  return readResponse(await fetch(endpointUrl(endpoint), { method, credentials: 'same-origin', cache: 'no-store',
    headers: { 'Content-Type': 'application/json', 'X-Kobun-CSRF': root.dataset.csrf! },
    body: body === undefined ? undefined : JSON.stringify(body) }));
}
type Stage = 'source' | 'layout' | 'transcription' | 'translation' | 'publication';
const steps: { id: Stage; title: string; description: string }[] = [
  { id: 'source', title: '資料・ページ', description: '対象資料を選び、その資料の画像ページを選びます。' },
  { id: 'layout', title: 'レイアウト調整', description: '行の枠と読み順を確認してから、文字を認識します。' },
  { id: 'transcription', title: '翻刻確認', description: '画像と照らし合わせ、認識した文字を直します。' },
  { id: 'translation', title: '現代語訳（任意）', description: '必要に応じて翻訳する範囲と本文を確認し、訳文を作ります。' },
  { id: 'publication', title: '確認・公開', description: '責任表示と権利情報を確認し、公開状態を変更します。' },
];
const active = (doc: Document | null) => ['queued', 'running'].includes(doc?.job?.status || '');
const inferStage = (doc: Document): Stage => doc.publication_state === 'reviewed' || doc.publication_state === 'published'
  || !!doc.transcription_credit || !!doc.review_note || Object.keys(doc.transcription_metadata || {}).length > 0 ? 'publication'
  : doc.translation || doc.translation_draft ? 'translation'
  : doc.lines.length && doc.lines.every(line => line.raw !== undefined) ? 'transcription' : 'layout';
const ordered = (lines: LineBox[]) => lines.map((line, i) => ({ ...line, readingOrder: i + 1 }));
const labels: Record<string, string> = { layout: 'レイアウト認識', recognize: '文字認識', translate: '現代語訳', queued: '処理待ち', running: '処理中', human_edit: 'レイアウトの手動修正', transcription_edit: '翻刻の修正', image_saved: '画像の保存', translation_input_edit: '翻訳用本文の編集', translation_manual: '現代語訳の入力・修正', translation_commercial: '商用LLMの現代語訳を取り込み', translation_delete: '現代語訳の削除', publication_draft: '下書きへ変更', publication_reviewed: '確認済みへ変更', publication_published: '公開', publication_metadata: '責任表示・研究成果情報の変更', interrupted: '中断', error: '処理失敗' };
const publicationLabels = { draft: '下書き', reviewed: '確認済み', published: '公開中' } as const;
type ImportSection = { label: string; lines: string[] };
type ImportResult = { filename: string; sections: ImportSection[]; legend: string[]; notation: string[]; metadata?: TranscriptionMetadata };
function compactMetadata(metadata: TranscriptionMetadata): TranscriptionMetadata {
  return Object.fromEntries(Object.entries(metadata).flatMap(([key, value]) => {
    const text = typeof value === 'string' ? value.trim() : '';
    return text ? [[key, text]] : [];
  })) as TranscriptionMetadata;
}
function importedLines(text: string) {
  const values = text.replace(/\r\n?/g, '\n').split('\n').map(line => line.replace(/[ \t]+$/u, ''));
  while (values.length && values.at(-1) === '') values.pop();
  return values;
}
function plainTextSections(text: string): ImportSection[] {
  const rows = importedLines(text);
  const sections: ImportSection[] = [];
  let current: ImportSection | null = null;
  const marker = /^[［\[]\s*[一二三四五六七八九十百〇零0-9０-９]+\s*(?:オ|ウ|表|裏)\s*[］\]]$/u;
  for (const row of rows) {
    if (marker.test(row.trim())) {
      if (current?.lines.length) sections.push(current);
      current = { label: row.trim(), lines: [] };
    } else if (current) current.lines.push(row);
  }
  if (current?.lines.length) sections.push(current);
  return sections.length ? sections : [{ label: 'テキスト全体', lines: rows }];
}
function download(name: string, text: string, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = name; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function LlmSettings() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => mountLlmSettings(host.current!), []);
  return <div ref={host} />;
}
function Workspace() {
  const params = new URLSearchParams(location.search);
  const [identifier, setIdentifier] = useState(params.get('identifier') || '');
  const [loadedIdentifier, setLoadedIdentifier] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [pages, setPages] = useState<Page[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [doc, setDoc] = useState<Document | null>(null);
  const docId = useRef<string | null>(null);
  const [stage, setStage] = useState<Stage>('source');
  const [lines, setLines] = useState<LineBox[]>([]);
  const [readingDirection, setReadingDirection] = useState<ReadingDirection>('auto');
  const [selected, setSelected] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [undo, setUndo] = useState<LineBox[][]>([]);
  const [redo, setRedo] = useState<LineBox[][]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [health, setHealth] = useState<{ ocr_ready: boolean; llm_ready: boolean; llm_model?: string; llm_model_id?: string } | null>(null);
  const [regionMode, setRegionMode] = useState(false);
  const [region, setRegion] = useState<BoundingBox | null>(null);
  const [showBoxes, setShowBoxes] = useState(true);
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(1);
  const [draft, setDraft] = useState('');
  const [draftDirty, setDraftDirty] = useState(false);
  const [manualTranslation, setManualTranslation] = useState('');
  const [manualTranslationDirty, setManualTranslationDirty] = useState(false);
  const [translationEditing, setTranslationEditing] = useState(false);
  const [translationView, setTranslationView] = useState<'input' | 'result'>('input');
  const [llm, setLlm] = useState(llmState);
  const [externalDraft, setExternalDraft] = useState<(ExternalTranslation & { line_ids: string[] }) | null>(null);
  const [commercialRunning, setCommercialRunning] = useState(false);
  const commercialAbort = useRef<AbortController | null>(null);
  const [recordOpen, setRecordOpen] = useState(false);
  const [history, setHistory] = useState<{ event: string; recorded_at: number; actor?: { id: number; name: string; role: string }; document: Document }[] | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [transcriptionCredit, setTranscriptionCredit] = useState('');
  const [transcriptionMetadata, setTranscriptionMetadata] = useState<TranscriptionMetadata>({});
  const [attributionOpen, setAttributionOpen] = useState(false);
  const [importSections, setImportSections] = useState<ImportSection[]>([]);
  const [importSectionSelection, setImportSectionSelection] = useState<number[]>([]);
  const [importText, setImportText] = useState('');
  const [importLegend, setImportLegend] = useState<string[]>([]);
  const [importNotation, setImportNotation] = useState<string[]>([]);
  const [importSource, setImportSource] = useState('');
  const viewer = useRef<ImageViewerHandle>(null);
  const busy = pending || active(doc);
  const contentUnsaved = dirty || draftDirty || manualTranslationDirty;
  const reviewMetadataDirty = !!doc && canManage
    && (reviewNote !== (doc.review_note || '') || transcriptionCredit !== (doc.transcription_credit || '')
      || JSON.stringify(compactMetadata(transcriptionMetadata)) !== JSON.stringify(compactMetadata(doc.transcription_metadata || {})));
  const unsaved = contentUnsaved || reviewMetadataDirty;
  const selectedIds = lines.slice(rangeStart - 1, rangeEnd).map(line => line.id);
  const hasText = !!lines.length && lines.every(line => line.raw !== undefined);
  const currentTranslation = !dirty && !draftDirty ? doc?.translation : null;
  const stepIndex = steps.findIndex(step => step.id === stage);
  const writingDirection = pageDirection(lines);
  const verticalWriting = writingDirection === 'vertical';
  const effectiveReading = effectiveReadingDirection(writingDirection, readingDirection);
  const earlierKey = verticalWriting ? (effectiveReading === 'rtl' ? 'ArrowRight' : 'ArrowLeft') : 'ArrowUp';
  const laterKey = verticalWriting ? (effectiveReading === 'rtl' ? 'ArrowLeft' : 'ArrowRight') : 'ArrowDown';
  const earlierArrow = earlierKey === 'ArrowRight' ? '→' : earlierKey === 'ArrowLeft' ? '←' : '↑';
  const laterArrow = laterKey === 'ArrowRight' ? '→' : laterKey === 'ArrowLeft' ? '←' : '↓';
  const materials = Array.from(documents.reduce((map, saved) => {
    const id = saved.source.item_id;
    const existing = map.get(id);
    if (existing) existing.count += 1;
    else map.set(id, { id, title: saved.source.item_title, identifier: saved.source.item_identifier || '', count: 1 });
    return map;
  }, new Map<number, { id: number; title: string; identifier: string; count: number }>()).values());
  const currentItemId = pages[0]?.item_id ?? doc?.source.item_id ?? 0;

  function accept(next: Document, preserveReviewMetadata = false) {
    docId.current = next.id; setDoc(next); setLines(next.lines); setDirty(false); setUndo([]); setRedo([]);
    setReadingDirection(next.reading_direction || 'auto');
    setRegion(null); setRegionMode(false); setHistory(null); setRecordOpen(false); setDraftDirty(false);
    setManualTranslation(next.translation?.text || ''); setManualTranslationDirty(false); setTranslationEditing(false);
    setExternalDraft(null);
    if (!preserveReviewMetadata) {
      setReviewNote(next.review_note || '');
      setTranscriptionCredit(next.transcription_credit || '');
      setTranscriptionMetadata(next.transcription_metadata || {});
      setAttributionOpen(Object.keys(next.transcription_metadata || {}).length === 0);
    }
    setDraft(next.translation_draft?.text ?? next.translation?.input ?? next.lines.map(line => line.raw || '').join(''));
    const ids = next.translation_draft?.line_ids ?? next.translation?.line_ids;
    const indexes = next.lines.flatMap((line, i) => !ids || ids.includes(line.id) ? [i + 1] : []);
    setRangeStart(indexes[0] || 1); setRangeEnd(indexes.at(-1) || 1);
  }
  async function guarded(work: () => Promise<void>) {
    setPending(true); setError('');
    try { await work(); } catch (e) { setError((e as Error).message); } finally { setPending(false); }
  }
  function mayLeave() { return !unsaved || window.confirm('保存していない変更があります。破棄してページを移動しますか。'); }
  async function loadPages(page = 1, legacyItemId?: string) {
    if (busy || (page === 1 && !mayLeave())) return;
    await guarded(async () => {
      const query = legacyItemId ? `item_id=${encodeURIComponent(legacyItemId)}` : `identifier=${encodeURIComponent(page === 1 ? identifier : loadedIdentifier)}`;
      const result = await readResponse(await fetch(`${root.dataset.pages}?${query}&page=${page}`, { cache: 'no-store' }));
      setPages(result.pages); setItemTitle(result.title); setPageIndex(page); setPageTotal(result.total);
      setIdentifier(result.identifier); setLoadedIdentifier(result.identifier);
      if (page === 1) { docId.current = null; setDoc(null); setLines([]); setDirty(false); setDraftDirty(false); setStage('source'); }
    });
  }
  async function openPage(page: Page) {
    if (busy || !mayLeave()) return;
    await guarded(async () => {
      const saved = documents.find(item => item.source.media_id === page.media_id);
      if (!canManage && !saved) throw new Error('このページには保存済みの作業がありません。管理者が作業を作成してから修正できます。');
      const next = saved ? await api<Document>(`documents/${saved.id}`)
        : await api<Document>('documents', 'POST', { media_id: page.media_id });
      next.source.item_identifier = page.item_identifier;
      accept(next); setSelected(null); setStage(inferStage(next)); setTranslationView(next.translation ? 'result' : 'input');
      setDocuments(await api<Document[]>('documents'));
    });
  }
  async function openDocument(id: string) {
    if (busy || !mayLeave()) return;
    await guarded(async () => {
      const next = await api<Document>(`documents/${id}`);
      const result = await readResponse(await fetch(`${root.dataset.pages}?item_id=${next.source.item_id}&page=1`, { cache: 'no-store' }));
      next.source.item_identifier = result.identifier;
      setPages(result.pages); setItemTitle(result.title); setPageIndex(1); setPageTotal(result.total);
      setIdentifier(result.identifier); setLoadedIdentifier(result.identifier);
      accept(next); setSelected(null); setStage(inferStage(next)); setTranslationView(next.translation ? 'result' : 'input');
    });
  }
  useEffect(() => {
    const unsubscribe = subscribeLlm(() => setLlm(llmState()));
    return () => { unsubscribe(); commercialAbort.current?.abort(); };
  }, []);
  useEffect(() => {
    api<NonNullable<typeof health>>('health').then(setHealth).catch(e => setError(e.message));
    api<Document[]>('documents').then(setDocuments).catch(() => {});
    if (params.get('item_id')) void loadPages(1, params.get('item_id')!);
    else if (params.get('identifier')) void loadPages();
  }, []);
  useEffect(() => {
    if (!doc || !active(doc)) return;
    const id = doc.id;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    async function poll() {
      try {
        const next = await api<Document>(`documents/${id}`);
        if (stopped || docId.current !== id) return;
        setDoc(next); setError('');
        if (!active(next)) {
          accept(next);
          if (next.job?.status === 'error') setError(next.job.error || '処理に失敗しました。');
          else if (next.job?.operation === 'recognize') setStage('transcription');
          else if (next.job?.operation === 'translate') { setStage('translation'); setTranslationView('result'); }
          return;
        }
      } catch (e) { if (!stopped) setError(`状態取得を再試行しています。${(e as Error).message}`); }
      if (!stopped) timer = setTimeout(poll, 1200);
    }
    timer = setTimeout(poll, 1000);
    return () => { stopped = true; clearTimeout(timer); };
  }, [doc?.id, doc?.job?.id]);
  useEffect(() => {
    const prevent = (event: BeforeUnloadEvent) => { if (unsaved || commercialRunning) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', prevent);
    return () => window.removeEventListener('beforeunload', prevent);
  }, [unsaved, commercialRunning]);
  useEffect(() => {
    setImportSections([]); setImportSectionSelection([]); setImportText('');
    setImportLegend([]); setImportNotation([]); setImportSource('');
  }, [doc?.id]);

  function edit(next: LineBox[]) {
    if (busy || stage === 'layout' && !canManage || stage === 'transcription' && !canEditTranscription) return;
    setUndo([...undo.slice(-29), lines]); setRedo([]); setLines(ordered(next)); setDirty(true); setHistory(null);
  }
  function undoEdit() {
    if (!undo.length || busy) return;
    setRedo([...redo, lines]); setLines(undo[undo.length - 1]); setUndo(undo.slice(0, -1)); setDirty(true);
  }
  function redoEdit() {
    if (!redo.length || busy) return;
    setUndo([...undo, lines]); setLines(redo[redo.length - 1]); setRedo(redo.slice(0, -1)); setDirty(true);
  }
  function updateBox(order: number, box: BoundingBox) {
    if (stage === 'layout') edit(lines.map(line => line.readingOrder === order
      ? { ...line, ...box, direction: boxDirection(box), raw: undefined, machineRaw: undefined } : line));
  }
  function deleteLine(order: number) { if (stage === 'layout') { edit(lines.filter(line => line.readingOrder !== order)); setSelected(null); } }
  function moveLine(delta: number) {
    const i = lines.findIndex(line => line.readingOrder === selected);
    if (stage !== 'layout' || i < 0 || i + delta < 0 || i + delta >= lines.length) return;
    const next = [...lines]; [next[i], next[i + delta]] = [next[i + delta], next[i]]; edit(next); setSelected(i + delta + 1);
  }
  function addLine() {
    if (!doc || !region) return;
    const line: LineBox = { ...region, id: crypto.randomUUID(), confidence: 0, classId: 1,
      readingOrder: lines.length + 1, direction: boxDirection(region) };
    edit([...lines, line]); setSelected(line.readingOrder); setRegionMode(false); setRegion(null);
  }
  function changeReadingDirection(next: ReadingDirection) {
    if (!canManage || stage !== 'layout' || next === readingDirection) return;
    if (lines.some(line => line.raw !== undefined)
      && !window.confirm('読み方向を変えると文字認識結果を解除します。保存済みの版は履歴に残ります。続けますか。')) return;
    const reordered = reorderForReadingDirection(lines, writingDirection, next)
      .map(line => ({ ...line, raw: undefined, machineRaw: undefined }));
    setReadingDirection(next);
    edit(reordered);
    setSelected(null);
  }
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (busy || !['layout', 'transcription'].includes(stage) || (event.target as HTMLElement).closest('input,textarea,select,[contenteditable]')) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); if (event.shiftKey) redoEdit(); else undoEdit(); return; }
      if (stage !== 'layout' || selected === null) return;
      if (event.key === earlierKey || event.key === laterKey) {
        event.preventDefault(); event.stopImmediatePropagation(); moveLine(event.key === earlierKey ? -1 : 1);
      }
      if (event.key === 'Delete' || event.key === 'Backspace') { event.preventDefault(); deleteLine(selected); }
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', key, true); return () => window.removeEventListener('keydown', key, true);
  });
  async function saveLines(): Promise<Document> {
    if (!doc) throw new Error('ページを選択してください。');
    if (!dirty) return doc;
    const next = stage === 'transcription'
      ? await api<Document>(`documents/${doc.id}/transcription`, 'PUT', { base_revision: doc.revision,
          lines: lines.map(line => ({ id: line.id, raw: line.raw ?? '' })) })
      : await api<Document>(`documents/${doc.id}/layout`, 'PUT', {
          base_revision: doc.revision, lines, reading_direction: readingDirection,
        });
    accept(next, true); return next;
  }
  async function saveAll(ensureTranslationInput = false): Promise<Document> {
    const saveManual = stage === 'translation' && manualTranslationDirty;
    const manualText = manualTranslation;
    if (saveManual && externalDraft && (externalDraft.input !== draft || JSON.stringify(externalDraft.line_ids) !== JSON.stringify(selectedIds))) {
      throw new Error('生成後に翻訳用本文または行の範囲が変わっています。本文を元に戻すか、入力をキャンセルしてから作り直してください。');
    }
    let next = await saveLines();
    if (stage === 'translation' && (draftDirty || (ensureTranslationInput && !next.translation_draft))) {
      next = await api<Document>(`documents/${next.id}/translation-input`, 'PUT', {
        base_revision: next.revision, text: draft,
        line_ids: selectedIds,
      });
      accept(next, true);
    }
    if (saveManual) {
      next = await api<Document>(`documents/${next.id}/translation`, 'PUT', {
        base_revision: next.revision, text: manualText,
        input: next.translation_draft?.text ?? draft,
        line_ids: next.translation_draft?.line_ids ?? selectedIds,
        ...(externalDraft ? { method: 'commercial', provider: externalDraft.provider, model: externalDraft.model,
          prompt_revision: externalDraft.prompt_revision, human_edited: manualText !== externalDraft.text } : {}),
      });
      accept(next, true);
    }
    if (canManage && (reviewNote !== (next.review_note || '') || transcriptionCredit !== (next.transcription_credit || '')
      || JSON.stringify(compactMetadata(transcriptionMetadata)) !== JSON.stringify(compactMetadata(next.transcription_metadata || {})))) {
      next = await api<Document>(`documents/${next.id}/review`, 'PUT', {
        base_revision: next.revision, state: next.publication_state || 'draft', note: reviewNote,
        credit: transcriptionCredit, metadata: compactMetadata(transcriptionMetadata),
      });
      accept(next);
    }
    return next;
  }
  async function go(next: Stage) {
    if (busy) return;
    if (stage === 'translation' && next !== 'translation' && (draftDirty || manualTranslationDirty)) {
      if (!window.confirm('保存していない翻訳用本文または現代語訳の編集を破棄して移動しますか。')) return;
      setDraft(doc?.translation_draft?.text ?? doc?.translation?.input ?? lines.map(line => line.raw || '').join(''));
      setDraftDirty(false); setManualTranslation(doc?.translation?.text || ''); setManualTranslationDirty(false); setTranslationEditing(false);
    }
    if (dirty) await guarded(async () => { await saveLines(); setStage(next); if (next === 'translation') setTranslationView('input'); });
    else { setStage(next); if (next === 'translation') setTranslationView('input'); }
    setRegionMode(false); setRegion(null);
  }
  async function run(operation: string) {
    if (!doc || busy || !canManage) return;
    if (operation === 'translate' && llm.provider !== 'local') {
      if (!confirmCommercial(draft)) return;
      await guarded(async () => {
        const next = await saveAll(true);
        const controller = new AbortController(); commercialAbort.current = controller;
        setCommercialRunning(true); setTranslationView('result');
        try {
          const result = await translateCommercial(next.translation_draft!.text, controller.signal);
          setExternalDraft({ ...result, line_ids: next.translation_draft!.line_ids }); setManualTranslation(result.text); setManualTranslationDirty(true); setTranslationEditing(true);
        } finally { commercialAbort.current = null; setCommercialRunning(false); }
      });
      return;
    }
    const force = operation === 'layout' && lines.length > 0;
    if (force && !window.confirm('レイアウトと翻刻を再認識結果に置き換えます。保存済みの版は履歴に残ります。続けますか。')) return;
    if (operation === 'recognize' && lines.some(line => line.raw) && !window.confirm('文字を再認識します。保存済みの翻刻は履歴に残ります。続けますか。')) return;
    await guarded(async () => {
      const next = operation === 'translate' ? await saveAll(true) : await saveLines();
      setDoc(await api<Document>(`documents/${next.id}/jobs`, 'POST', { operation, base_revision: next.revision, force,
        line_ids: operation === 'translate' ? next.translation_draft?.line_ids : undefined }));
      if (operation === 'translate') setTranslationView('result');
    });
  }
  function changeRange(start: number, end: number) {
    if (!canManage) return;
    if (draftDirty && !window.confirm('翻訳用本文の編集を破棄し、選択した行から作り直しますか。')) return;
    const first = Math.min(start, end), last = Math.max(start, end);
    setRangeStart(first); setRangeEnd(last); setDraft(lines.slice(first - 1, last).map(line => line.raw || '').join('')); setDraftDirty(true); setTranslationView('input');
  }
  function selectImportSections(selection: number[], sections = importSections) {
    const indexes = Array.from(new Set(selection)).filter(index => !!sections[index]).sort((a, b) => a - b);
    setImportSectionSelection(indexes);
    setImportText(indexes.flatMap(index => sections[index].lines).join('\n'));
  }
  function toggleImportSection(index: number, checked: boolean) {
    selectImportSections(checked
      ? [...importSectionSelection, index]
      : importSectionSelection.filter(selectedIndex => selectedIndex !== index));
  }
  async function readImportFile(file: File) {
    if (file.size <= 0 || file.size > 10_000_000) {
      setError('取込ファイルは10 MB以内にしてください。'); return;
    }
    await guarded(async () => {
      let sections: ImportSection[], legend: string[] = [], notation: string[] = [];
      if (file.name.toLowerCase().endsWith('.docx')) {
        const form = new FormData(); form.append('file', file);
        const result = await readResponse(await fetch(root.dataset.importUrl!, {
          method: 'POST', credentials: 'same-origin', cache: 'no-store',
          headers: { 'X-Kobun-CSRF': root.dataset.csrf! }, body: form,
        })) as ImportResult;
        sections = result.sections; legend = result.legend || []; notation = result.notation || [];
        if (result.metadata && Object.keys(result.metadata).length) {
          setTranscriptionMetadata(current => ({ ...result.metadata, ...compactMetadata(current) }));
        }
      } else if (file.name.toLowerCase().endsWith('.txt') || file.type.startsWith('text/')) {
        sections = plainTextSections(await file.text());
      } else {
        throw new Error('Word（.docx）またはテキスト（.txt）ファイルを選択してください。');
      }
      if (!sections.length) throw new Error('取込可能な翻刻本文が見つかりません。');
      setImportSections(sections); setImportLegend(legend); setImportNotation(notation);
      setImportSource(`${file.name} · ${sections.length}ページ候補`); selectImportSections([0], sections);
    });
  }
  async function applyImportedText() {
    if (!doc || busy || !canEditTranscription) return;
    const values = importedLines(importText);
    if (values.length !== lines.length) {
      setError(`取込テキストは${values.length}行、画像のレイアウトは${lines.length}行です。改行を調整して行数を一致させてください。`);
      return;
    }
    if (!values.some(value => value.trim())) {
      setError('翻刻を1文字以上入力してください。'); return;
    }
    if (lines.some(line => line.raw?.trim())
      && !window.confirm('現在の翻刻を取込テキストで置き換えます。保存済みの版は履歴に残ります。続けますか。')) return;
    if (stage === 'layout') {
      await guarded(async () => {
        const saved = await saveLines();
        setUndo([]); setRedo([]);
        setLines(saved.lines.map((line, index) => ({ ...line, raw: values[index] })));
        setDirty(true); setStage('transcription'); setSelected(null);
      });
    } else {
      edit(lines.map((line, index) => ({ ...line, raw: values[index] })));
    }
  }
  async function deleteTranslation() {
    if (!doc?.translation || busy || !canManage) return;
    if (!window.confirm('この現代語訳を削除します。翻訳用本文と過去の履歴は残ります。よろしいですか。')) return;
    await guarded(async () => {
      const next = await api<Document>(`documents/${doc.id}/translation`, 'DELETE', { base_revision: doc.revision });
      accept(next, true);
      setTranslationView('input');
    });
  }
  function beginManualTranslation() {
    if (!canManage || busy) return;
    setExternalDraft(null);
    setManualTranslation(doc?.translation?.text || '');
    setManualTranslationDirty(false);
    setTranslationEditing(true);
    setTranslationView('result');
  }
  function cancelManualTranslation() {
    setExternalDraft(null);
    setManualTranslation(doc?.translation?.text || '');
    setManualTranslationDirty(false);
    setTranslationEditing(false);
    if (!doc?.translation) setTranslationView('input');
  }
  async function saveManualTranslation() {
    if (!doc || !canManage || busy || !manualTranslation.trim()) return;
    if (!manualTranslationDirty && doc.translation) { setTranslationEditing(false); return; }
    await guarded(async () => {
      await saveAll(true);
      setTranslationView('result');
    });
  }
  async function exportRecord() {
    if (!doc) return;
    await guarded(async () => { const versions = await api<unknown[]>(`documents/${doc.id}/history`); download(`${doc.id}-record.json`, JSON.stringify({ document: doc, history: versions }, null, 2), 'application/json'); });
  }
  async function toggleRecord() {
    if (recordOpen) { setRecordOpen(false); return; }
    setRecordOpen(true);
    if (doc && history === null) await guarded(async () => setHistory(await api(`documents/${doc.id}/history`)));
  }
  async function advanceToPublication() {
    if (!doc || busy) return;
    await guarded(async () => {
      await saveAll();
      setStage('publication');
    });
  }
  async function setPublication(state: 'draft' | 'reviewed' | 'published') {
    if (!doc || !canManage || busy || contentUnsaved) return;
    await guarded(async () => accept(await api<Document>(`documents/${doc.id}/review`, 'PUT', {
      base_revision: doc.revision, state, note: reviewNote, credit: transcriptionCredit,
      metadata: compactMetadata(transcriptionMetadata),
    })));
  }
  const selectedLine = lines.find(line => line.readingOrder === selected);
  const sourceNeedsLoad = !pages.length || identifier !== loadedIdentifier;
  const publicationState = doc?.publication_state || 'draft';
  const metadataCount = Object.keys(compactMetadata(transcriptionMetadata)).length;
  const primaryLabel = stage === 'source' ? !canManage ? pages.length ? '左から画像ページを選んでください' : '上から対象資料を選んでください'
    : sourceNeedsLoad ? '資料を開く' : '一覧からページを選んでください'
    : stage === 'layout' ? !canManage ? 'レイアウトは閲覧のみ' : lines.length ? '調整を確定して文字認識' : 'レイアウトを認識'
    : stage === 'transcription' ? dirty ? canManage ? '翻刻の修正を保存して次へ' : '翻刻の修正を保存'
      : canManage ? '翻刻を確定して訳文の準備へ' : '翻刻は保存されています'
    : stage === 'translation' ? translationView === 'result'
      ? translationEditing ? externalDraft ? '生成した現代語訳を保存' : '入力した現代語訳を保存' : currentTranslation ? '確認・公開へ' : '現代語訳を入力'
      : canManage ? llm.provider === 'local' ? 'この本文を現代語訳' : `${providerNames[llm.provider]}でこの本文を現代語訳` : '現代語訳は実験機能です'
    : publicationState === 'draft' ? '確認済みにする'
      : publicationState === 'reviewed' ? '公開する' : '公開中';
  const primaryDisabled = busy || (stage === 'source' ? !identifier.trim() || !sourceNeedsLoad : !doc
    || (stage === 'layout' ? !canManage || !health?.ocr_ready
      : stage === 'transcription' ? !canEditTranscription || !hasText || !lines.some(line => line.raw?.trim()) || (!canManage && !dirty)
      : stage === 'translation' ? translationView === 'result'
        ? translationEditing ? !canManage || !manualTranslation.trim() : !currentTranslation
        : !canManage || !draft.trim() || (llm.provider === 'local' ? !health?.llm_ready : !llm.hasKey || !llm.model)
      : !canManage || !hasText || !transcriptionCredit.trim() || publicationState === 'published' || contentUnsaved));
  function primary() {
    if (stage === 'source') void loadPages();
    else if (stage === 'layout') void run(lines.length ? 'recognize' : 'layout');
    else if (stage === 'transcription') void guarded(async () => { await saveLines(); if (canManage) { setStage('translation'); setTranslationView('input'); } });
    else if (stage === 'translation') {
      if (translationView === 'result' && translationEditing) void saveManualTranslation();
      else if (translationView === 'result' && currentTranslation) void advanceToPublication();
      else void run('translate');
    } else if (publicationState === 'draft') void setPublication('reviewed');
    else if (publicationState === 'reviewed') void setPublication('published');
  }

  return <section className="kobun-app" aria-label="古典籍の実験ワークスペース">
    <div className="kobun-heading"><div className="kobun-material-picker"><label htmlFor="kobun-material">対象資料</label>
        <select id="kobun-material" value={currentItemId || ''} disabled={busy || !materials.length} onChange={e => e.target.value && void loadPages(1, e.target.value)}>
          <option value="">保存済み資料から選択</option>
          {!!currentItemId && !materials.some(material => material.id === currentItemId) && <option value={currentItemId}>{itemTitle || doc?.source.item_title}</option>}
          {materials.map(material => <option key={material.id} value={material.id}>{material.title} — {material.identifier || '識別子なし'}（{material.count}ページ作業済み）</option>)}
        </select></div>
      <div className="kobun-utilities"><span className="kobun-muted">{canManage ? '管理者 · 全工程を操作可能' : canEditTranscription
        ? `翻刻修正者 · ${transcriptionScope === 'all' ? '閲覧可能な全資料' : '自分が所有する資料'}のみ` : '閲覧のみ'}</span>
        <span className="kobun-muted">{health ? `OCR ${health.ocr_ready ? '準備済み' : '未準備'} · 現代語訳 ${health.llm_ready ? '準備済み' : '未準備'}${health.llm_model ? ` · ${health.llm_model}` : ''}` : '接続を確認中'}</span>
        {doc && <span className={`kobun-publication is-${doc.publication_state || 'draft'}`}>{publicationLabels[doc.publication_state || 'draft']}</span>}</div></div>
    <ol className="kobun-steps" aria-label="作業の手順">{steps.map((step, i) => <li key={step.id}>
      <button aria-current={stage === step.id ? 'step' : undefined} disabled={busy || (i === 1 && !doc) || (i > 1 && !hasText)} onClick={() => go(step.id)}><span>{i + 1}</span>{step.title}</button>
    </li>)}</ol>
    <div className="kobun-record-toggle"><button className="kobun-link kobun-disclosure" aria-expanded={recordOpen}
      aria-controls="kobun-work-history" disabled={!doc || busy} onClick={() => void toggleRecord()}>作業履歴</button></div>
    {error && <div role="alert" className="kobun-error">{error}<button onClick={() => setError('')} aria-label="メッセージを閉じる">×</button></div>}
    {recordOpen && doc && <div className="kobun-record" id="kobun-work-history"><h3>作業履歴</h3>
      <div className="kobun-tools"><button disabled={busy || unsaved} onClick={exportRecord}>記録を保存 (.json)</button></div>
      {history === null ? <p className="kobun-muted">履歴を読み込んでいます…</p>
        : history.length ? <ol id="kobun-history-list">{history.map(entry => <li key={entry.document.revision}>版 {entry.document.revision} · {labels[entry.event] || entry.event} · {new Date(entry.recorded_at * 1000).toLocaleString('ja-JP')}{entry.actor ? ` · ${entry.actor.name} (${entry.actor.role})` : ''}</li>)}</ol>
        : <p className="kobun-muted">過去の版はありません。</p>}
      <details><summary>画像・処理条件</summary><pre>{JSON.stringify({ source: doc.source, image_sha256: doc.image_sha256, metrics: doc.last_metrics }, null, 2)}</pre></details>
    </div>}
    <div className="kobun-stage-description"><b>{steps[stepIndex].title}</b><span>{steps[stepIndex].description}</span></div>
    {stage === 'source' && (canManage ? <form className="kobun-source" onSubmit={e => { e.preventDefault(); if (!primaryDisabled) void loadPages(); }}>
      <label htmlFor="kobun-identifier">別の資料を指定</label><input id="kobun-identifier" value={identifier} disabled={busy} placeholder="dcterms:identifier または公開URL" onChange={e => setIdentifier(e.target.value)} />
      <p className="kobun-muted">保存済み資料は上の「対象資料」から選べます。新しく取り込む資料は識別子、または Clean Url の公開URLで開きます。</p>
    </form> : <div className="kobun-source"><p>上の「対象資料」から作業する資料を選んでください。</p>
      <p className="kobun-muted">権限範囲内で、保存済みの作業がある資料だけを表示しています。</p></div>)}
    <div className="kobun-layout">
      <aside className="kobun-pages" aria-label="画像ページ一覧"><div className="kobun-page-context"><span>選択中の資料</span>
        <strong>{itemTitle || '未選択'}</strong>{loadedIdentifier && <small>{loadedIdentifier}</small>}</div>
        <h3>画像ページ {pageTotal ? `(${pageTotal})` : ''}</h3>
        {!pages.length && <p className="kobun-muted">対象資料を選ぶと、その資料の画像だけがここに並びます。</p>}
        {pages.map(page => { const saved = documents.some(item => item.source.media_id === page.media_id); return <button
          className={doc?.source.media_id === page.media_id ? 'is-selected' : ''} disabled={busy || (!canManage && !saved)}
          title={!canManage && !saved ? '管理者がまだ作業を作成していない画像です' : undefined}
          key={page.media_id} onClick={() => openPage(page)}>
          <b>{page.position}</b><span><strong>{page.title}</strong><small>{saved ? '作業済み' : '未着手'}</small></span></button>; })}
        {pageTotal > 100 && <div className="kobun-tools"><button disabled={pageIndex <= 1 || busy} onClick={() => loadPages(pageIndex - 1)}>前</button><span>{pageIndex}</span><button disabled={pageIndex * 100 >= pageTotal || busy} onClick={() => loadPages(pageIndex + 1)}>次</button></div>}
      </aside>
      <div className="kobun-editor">
        <div className="kobun-tools kobun-image-tools"><label><input type="checkbox" checked={showBoxes} onChange={e => setShowBoxes(e.target.checked)} />行の枠を表示</label>
          {stage === 'layout' && <label className="kobun-reading-direction">読み方向
            <select aria-label="読み方向" value={readingDirection} disabled={!doc || busy || !canManage}
              onChange={e => changeReadingDirection(e.target.value as ReadingDirection)}>
              <option value="auto">自動（縦: 右→左／横: 左→右）</option>
              <option value="ltr">左から右</option><option value="rtl">右から左</option>
            </select></label>}
          {stage === 'layout' && canManage && <><button disabled={!doc || busy} aria-pressed={regionMode} onClick={() => { setRegionMode(!regionMode); setSelected(null); }}>枠を描く</button>
            {regionMode && <button disabled={!region || busy} onClick={addLine}>描いた範囲を追加</button>}</>}
        </div>
        <div className="kobun-viewer viewer-wrap">
          {doc ? <ImageViewer ref={viewer} dataUrl={endpointUrl(`documents/${doc.id}/image`)} lines={lines} regions={doc.regions}
            showOverlays={showBoxes} selectedOrder={busy ? null : selected} editable={stage === 'layout' && canManage && !busy}
            onSelectLine={busy ? () => {} : setSelected} onUpdateLine={updateBox} onDeleteLine={deleteLine}
            regionMode={!busy && stage === 'layout' && regionMode} selectedRegion={region} onRegionDraw={setRegion} />
            : <div className="kobun-empty"><b>{pages.length ? '画像ページを選択してください' : '資料の画像を見ながら作業します'}</b><p>{pages.length ? '左の一覧から、作業する画像を開きます。' : canManage ? '資料の識別子を入力するか、上の対象資料から選んでください。' : '上の対象資料から選んでください。'}</p></div>}
        </div>
        {((stage === 'layout' && canManage) || (stage === 'transcription' && canEditTranscription)) && <div className="kobun-tools kobun-image-tools">
          <button disabled={!undo.length || busy} onClick={undoEdit}>元に戻す</button><button disabled={!redo.length || busy} onClick={redoEdit}>やり直す</button>
          {stage === 'layout' && <><span className="kobun-order-label">読み順</span>
            <button className="kobun-order-arrow" aria-label={`選択行を後ろへ（${laterArrow}キー）`}
              title={`読み順を後ろへ（${laterArrow}キー）`} disabled={selected === null || busy} onClick={() => moveLine(1)}>{laterArrow}</button>
            <button className="kobun-order-arrow" aria-label={`選択行を前へ（${earlierArrow}キー）`}
              title={`読み順を前へ（${earlierArrow}キー）`} disabled={selected === null || busy} onClick={() => moveLine(-1)}>{earlierArrow}</button>
            <button disabled={selected === null || busy} onClick={() => selected !== null && deleteLine(selected)}>行を削除</button></>}
        </div>}
        <p className="kobun-caption">{doc ? `${doc.width} × ${doc.height} px · ${lines.length}行${lines.length ? ` · ${directionName(writingDirection)} · 読み方向 ${readingDirectionName(readingDirection, writingDirection)}` : ''} · 版 ${doc.revision}` : 'ホイールで拡大・縮小、ドラッグで画像を移動できます。'}</p>
      </div>
      <div className="kobun-results">
        {stage === 'source' && <div className="kobun-guide"><h3>一つのページを、順に確認</h3><p>画像の行を整え、翻刻を確かめ、その本文から現代語訳を作ります。</p><p>次の操作は、画面下の緑色のボタンに表示されます。</p><p className="kobun-muted">保存済みのページは、前回の作業から再開できます。</p></div>}
        {(stage === 'layout' || stage === 'transcription') && !!lines.length && canEditTranscription && <div className="kobun-transcription-actions">
          <details className="kobun-import">
            <summary>翻刻済みテキストを取り込む</summary>
            <p className="kobun-muted">Wordの丁付ごとの本文、または1行を画像の1行に対応させたテキストを取り込めます。複数の丁付は文書内の順につないで反映します。</p>
            <label className="kobun-import-file">Word／テキストファイル
              <input type="file" accept=".docx,.txt,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                disabled={busy} onChange={event => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ''; if (file) void readImportFile(file); }} />
            </label>
            {importSource && <p className="kobun-muted">{importSource}</p>}
            {!!importSections.length && <fieldset className="kobun-import-sections">
              <legend>取り込むページ（複数選択できます）</legend>
              {importSections.map((section, index) => <label key={`${section.label}-${index}`}>
                <input type="checkbox" checked={importSectionSelection.includes(index)} disabled={busy}
                  onChange={event => toggleImportSection(index, event.target.checked)} />
                <span>{section.label}</span><small>{section.lines.length}行</small>
              </label>)}
            </fieldset>}
            {!!importNotation.length && <p className="kobun-muted">解析: {importNotation.join('／')}</p>}
            {!!importLegend.length && <details><summary>検出した凡例（{importLegend.length}項目）</summary><ul>{importLegend.map((rule, index) => <li key={index}>{rule}</li>)}</ul></details>}
            <label htmlFor="kobun-import-text">取込内容（1行＝画像の1行）</label>
            <textarea id="kobun-import-text" value={importText} disabled={busy} placeholder="ここへ翻刻済みテキストを貼り付けることもできます。"
              onChange={event => setImportText(event.target.value)} />
            <p className={importedLines(importText).length === lines.length ? 'kobun-import-count is-matched' : 'kobun-import-count'}>
              {!!importSections.length && <>選択 {importSectionSelection.length}ページ · </>}取込 {importedLines(importText).length}行 ／ レイアウト {lines.length}行
            </p>
            <button className="kobun-primary" disabled={busy || importedLines(importText).length !== lines.length}
              onClick={() => void applyImportedText()}>選択したページを取り込む</button>
          </details>
          {stage === 'transcription' && <button className="kobun-link" disabled={!hasText} onClick={() => download(`${doc!.id}-transcription.txt`, lines.map(line => line.raw || '').join('\n'))}>翻刻をダウンロード</button>}
        </div>}
        {stage === 'layout' && <><h3>行の枠と読み順</h3><p className="kobun-muted">行を選ぶと画像上の枠を調整できます。番号の順に文字を読み取ります。{lines.length && canManage ? `${earlierArrow}・${laterArrow}キー、または画像下の矢印で順番を入れ替えられます。` : ''}</p>
          {!lines.length && <p>下の「レイアウトを認識」から始めます。</p>}
          <p className="kobun-direction" aria-live="polite">{directionName(writingDirection)} · {readingDirectionName(readingDirection, writingDirection)}</p>
          <ol className={`kobun-order is-${writingDirection} reading-${effectiveReading}`}>{lines.map(line => <li key={line.id} data-line-id={line.id} className={`is-${lineDirection(line)}`}><button className={selected === line.readingOrder ? 'is-selected' : ''} onClick={() => { setSelected(line.readingOrder); viewer.current?.scrollToLine(line.readingOrder); }}><b>{line.readingOrder}</b><span>{line.raw || `${Math.round(line.width)} × ${Math.round(line.height)} px`}</span></button></li>)}</ol>
          {selectedLine && <p className="kobun-muted">行 {selectedLine.readingOrder} を選択中</p>}
          {!!lines.length && canManage && <details><summary>レイアウトをやり直す</summary><p className="kobun-muted">現在の枠と翻刻を置き換えます。保存済みの版は履歴に残ります。</p><button disabled={busy || !health?.ocr_ready} onClick={() => run('layout')}>レイアウトを再認識</button></details>}
        </>}
        {stage === 'transcription' && <><h3>画像と翻刻を照合</h3><p className="kobun-muted">番号を押すと該当する行へ移動します。{canEditTranscription ? '保存済みの翻刻も修正できます。' : 'このアカウントは閲覧のみです。'}</p>
          {canEditTranscription && doc?.translation && <p className="kobun-notice">翻刻を修正すると、現在の翻訳用本文と現代語訳は履歴に残したうえで解除されます。</p>}
          {!!lines.length && <p className="kobun-direction" aria-live="polite">{directionName(writingDirection)} · {readingDirectionName(readingDirection, writingDirection)}</p>}
          <ol className={`kobun-lines is-${writingDirection} reading-${effectiveReading}`}>{lines.map(line => <li key={line.id} className={`${selected === line.readingOrder ? 'is-selected ' : ''}is-${lineDirection(line)}`}><button onClick={() => { setSelected(line.readingOrder); viewer.current?.scrollToLine(line.readingOrder); }}>{line.readingOrder}</button>
            <textarea className={`is-${lineDirection(line)}`} aria-label={`行 ${line.readingOrder} の翻刻`} value={line.raw ?? ''} disabled={busy || !canEditTranscription} onChange={e => edit(lines.map(item => item.id === line.id ? { ...item, raw: e.target.value } : item))} /></li>)}</ol>
        </>}
        {stage === 'translation' && <>{canManage && <LlmSettings />}<div className="kobun-tabs" role="tablist" aria-label="翻訳の表示">
          <button id="kobun-input-tab" role="tab" aria-selected={translationView === 'input'} aria-controls="kobun-input-panel" onClick={() => setTranslationView('input')}>翻訳する本文</button>
          <button id="kobun-result-tab" role="tab" aria-selected={translationView === 'result'} aria-controls="kobun-result-panel" disabled={!canManage && !currentTranslation && !active(doc)}
            onClick={() => { setTranslationView('result'); if (!currentTranslation && canManage && !translationEditing) beginManualTranslation(); }}>現代語訳</button></div>
          {translationView === 'input' ? <div id="kobun-input-panel" role="tabpanel" aria-labelledby="kobun-input-tab"><h3>翻訳する範囲</h3><div className="kobun-range">
            <label>開始行<select aria-label="翻訳の開始行" value={rangeStart} disabled={busy || !canManage} onChange={e => changeRange(Number(e.target.value), rangeEnd)}>{lines.map(line => <option key={line.id} value={line.readingOrder}>{line.readingOrder}</option>)}</select></label><span>〜</span>
            <label>終了行<select aria-label="翻訳の終了行" value={rangeEnd} disabled={busy || !canManage} onChange={e => changeRange(rangeStart, Number(e.target.value))}>{lines.map(line => <option key={line.id} value={line.readingOrder}>{line.readingOrder}</option>)}</select></label></div>
            <p className="kobun-muted">文や段落が途中で切れない範囲を選びます。画像上の改行はつなげています。見出しや注記は必要に応じて除いてください。</p>
            <label htmlFor="kobun-translation-input">翻訳用本文</label><textarea id="kobun-translation-input" value={draft} disabled={busy || !canManage} onChange={e => { setDraft(e.target.value); setDraftDirty(true); }} />
            <p className="kobun-muted">{draft.length}文字 · ここでの編集は翻刻には反映されません。現代語訳は実験的な補助機能です。</p>
            <div className="kobun-result-actions"><button className="kobun-link" disabled={busy || !canManage} onClick={() => changeRange(rangeStart, rangeEnd)}>選択した翻刻から作り直す</button>
              {canManage && <button className="kobun-link" disabled={busy} onClick={beginManualTranslation}>{currentTranslation ? '保存済みの現代語訳を修正' : '現代語訳を手入力'}</button>}</div>
          </div> : <div id="kobun-result-panel" role="tabpanel" aria-labelledby="kobun-result-tab">
            {commercialRunning ? <div role="status"><p>商用LLMで訳文を生成しています…</p><button onClick={() => commercialAbort.current?.abort()}>生成を中止</button></div>
              : active(doc) ? <p role="status">訳文を生成しています…</p> : translationEditing ? <div className="kobun-manual-translation">
              {externalDraft && <p className="kobun-notice">商用LLMによる機械生成・未確認の訳です。確認して保存してください。使用モデル: {externalDraft.model} · {providerNames[externalDraft.provider]}</p>}
              <label htmlFor="kobun-manual-translation">現代語訳</label>
              <textarea id="kobun-manual-translation" value={manualTranslation} disabled={busy || !canManage} maxLength={32000}
                placeholder="管理者が確認した現代語訳を入力してください。" onChange={event => { setManualTranslation(event.target.value); setManualTranslationDirty(true); }} />
              <p className="kobun-muted">{manualTranslation.length}文字 · {externalDraft ? '商用LLMの訳として、モデル・取込者・版履歴を記録します。' : '管理者による入力として、入力者と版履歴を記録します。'}</p>
              <div className="kobun-result-actions"><button disabled={busy} onClick={cancelManualTranslation}>入力をキャンセル</button></div>
            </div> : currentTranslation ? <><p className="kobun-notice">{currentTranslation.method === 'manual' ? '管理者が入力した訳文です。' : '機械が生成した訳です。原文と照合して確認してください。'}</p>
              {currentTranslation.review_warnings?.map(warning => <p className="kobun-notice" key={warning}>{warning}</p>)}
              <div className="kobun-translation">{currentTranslation.text}</div><p className="kobun-muted">{currentTranslation.method === 'manual' ? '管理者による入力' : currentTranslation.model}{currentTranslation.provider ? ` · ${providerNames[currentTranslation.provider]}` : ''}{currentTranslation.human_edited ? ' · 管理者による修正あり' : ''} · 行 {rangeStart}〜{rangeEnd}</p>
              {!!currentTranslation.uncertainties?.length && <div className="kobun-uncertainties"><h3>原文と照合する箇所</h3>
                <p className="kobun-muted">読みの候補は機械による推定です。翻刻・翻訳用本文には自動反映しません。</p>
                <ul>{currentTranslation.uncertainties.map((note, i) => <li key={i}><q>{note.source}</q><p>{note.reason}</p>{note.reading && <p>読みの候補：{note.reading}</p>}</li>)}</ul>
              </div>}
              <details><summary>この訳に使った本文</summary><p className="kobun-prewrap">{currentTranslation.input}</p></details>
              <div className="kobun-result-actions"><button className="kobun-link" disabled={busy} onClick={() => download(`${doc!.id}-translation.txt`, currentTranslation.text)}>訳文をダウンロード</button>
                {canManage && <button className="kobun-link" disabled={busy} onClick={beginManualTranslation}>この現代語訳を修正</button>}
                {canManage && <button className="kobun-danger" disabled={busy} onClick={() => void deleteTranslation()}>この現代語訳を削除</button>}</div></> : <p>翻訳する本文を確認してください。</p>}
          </div>}
        </>}
        {stage === 'publication' && doc && <section className="kobun-publication-panel">
          <div className="kobun-publication-summary"><h3>公開状態</h3>
            <p><span className={`kobun-publication is-${publicationState}`}>{publicationLabels[publicationState]}</span></p>
            <dl><dt>翻刻</dt><dd>{hasText ? `${lines.length}行` : '未完成'}</dd><dt>現代語訳</dt><dd>{doc.translation ? 'あり' : 'なし（翻刻だけでも公開できます）'}</dd></dl>
            <p className="kobun-muted">公開中のデータだけが資料ページで機械生成結果より優先して表示されます。翻刻や訳文を変更すると下書きへ戻ります。</p>
          </div>
          <label className="kobun-required-field"><span className="kobun-field-label">翻刻責任者 <b>必須</b></span><input type="text" value={transcriptionCredit} disabled={!canManage || busy} maxLength={500}
            placeholder="氏名、担当グループ名など" onChange={event => setTranscriptionCredit(event.target.value)} /></label>
          <p className="kobun-muted">公開中の翻刻とともに、責任表示として公開ページへ表示します。</p>
          {!transcriptionCredit.trim() && canManage && <p className="kobun-notice">確認済みにするには、翻刻責任者を入力してください。</p>}
          <details className="kobun-attribution-disclosure" open={attributionOpen}
            onToggle={event => setAttributionOpen(event.currentTarget.open)}>
            <summary>研究成果・権利情報（{metadataCount ? `${metadataCount}項目入力済み` : '未入力'}）</summary>
            <fieldset className="kobun-attribution-editor" disabled={!canManage || busy}>
            <p className="kobun-muted">作成者を研究成果として識別・引用できる情報と、利用条件を記録します。Word取込で検出した値は候補として自動入力されます。</p>
            <label className="is-wide">成果名<input value={transcriptionMetadata.title || ''} maxLength={500}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, title: event.target.value }))} /></label>
            <label className="is-wide">作成者（1名につき1行）<textarea value={transcriptionMetadata.contributors || ''} maxLength={2000}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, contributors: event.target.value }))} /></label>
            <label className="is-wide">作成者識別子（ORCID・researchmap等、対応する順に1名につき1行）<textarea
              value={transcriptionMetadata.contributor_identifiers || ''} maxLength={2000}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, contributor_identifiers: event.target.value }))} /></label>
            <label>所属<input value={transcriptionMetadata.affiliation || ''} maxLength={1000}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, affiliation: event.target.value }))} /></label>
            <label>役割・分担<input value={transcriptionMetadata.contribution_note || ''} maxLength={2000}
              placeholder="翻刻、校訂、資料調査など" onChange={event => setTranscriptionMetadata(value => ({ ...value, contribution_note: event.target.value }))} /></label>
            <label>掲載誌<input value={transcriptionMetadata.journal_title || ''} maxLength={500}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, journal_title: event.target.value }))} /></label>
            <label>巻号<input value={transcriptionMetadata.journal_issue || ''} maxLength={200} placeholder="第30号"
              onChange={event => setTranscriptionMetadata(value => ({ ...value, journal_issue: event.target.value }))} /></label>
            <label>雑誌識別子<input value={transcriptionMetadata.journal_identifiers || ''} maxLength={500}
              placeholder="ISSN 0000-0000／NCID AAXXXXXXXX" onChange={event => setTranscriptionMetadata(value => ({ ...value, journal_identifiers: event.target.value }))} /></label>
            <label>刊行年<input value={transcriptionMetadata.publication_year || ''} maxLength={20} inputMode="numeric"
              onChange={event => setTranscriptionMetadata(value => ({ ...value, publication_year: event.target.value }))} /></label>
            <label>発行日<input type="date" value={transcriptionMetadata.publication_date || ''} maxLength={30}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, publication_date: event.target.value }))} /></label>
            <label>掲載ページ<input value={transcriptionMetadata.publication_pages || ''} maxLength={100} placeholder="1–26"
              onChange={event => setTranscriptionMetadata(value => ({ ...value, publication_pages: event.target.value }))} /></label>
            <label className="is-wide">発行主体<input value={transcriptionMetadata.publisher || ''} maxLength={500}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, publisher: event.target.value }))} /></label>
            <label>DOI／恒久識別子<input value={transcriptionMetadata.doi || ''} maxLength={300}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, doi: event.target.value }))} /></label>
            <label>掲載先URL<input type="url" value={transcriptionMetadata.publication_url || ''} maxLength={2000}
              placeholder="https://…" onChange={event => setTranscriptionMetadata(value => ({ ...value, publication_url: event.target.value }))} /></label>
            <label>権利状態<select value={transcriptionMetadata.rights_status || ''}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, rights_status: event.target.value as TranscriptionMetadata['rights_status'] }))}>
              <option value="">未設定</option><option value="copyrighted">著作権あり</option>
              <option value="not_asserted">翻刻本文について著作権を主張しない</option>
              <option value="undetermined">権利状態を確認中</option><option value="other">その他・個別条件</option>
            </select></label>
            <label>権利者<input value={transcriptionMetadata.rights_holder || ''} maxLength={500}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, rights_holder: event.target.value }))} /></label>
            <label className="is-wide">権利に関する説明<textarea value={transcriptionMetadata.rights_statement || ''} maxLength={2000}
              placeholder="翻刻本文、校訂、注釈など、権利表示の対象を明記してください。"
              onChange={event => setTranscriptionMetadata(value => ({ ...value, rights_statement: event.target.value }))} /></label>
            <label>利用条件・ライセンス<input value={transcriptionMetadata.license_label || ''} maxLength={300} placeholder="CC BY 4.0 など"
              onChange={event => setTranscriptionMetadata(value => ({ ...value, license_label: event.target.value }))} /></label>
            <label>ライセンスURL<input type="url" value={transcriptionMetadata.license_url || ''} maxLength={2000} placeholder="https://…"
              onChange={event => setTranscriptionMetadata(value => ({ ...value, license_url: event.target.value }))} /></label>
            <label className="is-wide">推奨引用表記<textarea value={transcriptionMetadata.citation || ''} maxLength={3000}
              onChange={event => setTranscriptionMetadata(value => ({ ...value, citation: event.target.value }))} /></label>
            </fieldset>
          </details>
          <label className="kobun-review-note">確認メモ<textarea value={reviewNote} disabled={!canManage || busy} maxLength={2000}
            placeholder="画像との照合範囲、未確認箇所、判断事項など" onChange={event => setReviewNote(event.target.value)} /></label>
          {!canManage && <p className="kobun-muted">このアカウントでは公開状態を変更できません。</p>}
        </section>}
      </div>
    </div>
    <div className="kobun-actionbar"><div className="kobun-action-status" role="status">{commercialRunning ? <><span className="kobun-spinner" />商用LLMで現代語訳を生成中</> : active(doc) ? <><span className="kobun-spinner" />{labels[doc!.job!.operation]} · {labels[doc!.job!.status]}</> : unsaved ? '未保存の変更があります' : doc ? '変更は保存されています' : '資料を開いて開始'}</div>
      <div className="kobun-tools">{stepIndex > 0 && <button disabled={busy} onClick={() => go(steps[stepIndex - 1].id)}>戻る</button>}
        {doc && <button disabled={busy || !unsaved || (dirty && stage === 'transcription' && !canEditTranscription)
          || (dirty && stage !== 'transcription' && !canManage) || (draftDirty && !canManage)
          || (draftDirty && !draft.trim())} onClick={() => guarded(async () => { await saveAll(); })}>{stage === 'publication' ? '入力内容を保存' : '途中保存'}</button>}
        {stage === 'translation' && canManage && !translationEditing && !(translationView === 'result' && currentTranslation) && <button disabled={busy || manualTranslationDirty || (draftDirty && !draft.trim())}
          onClick={() => void advanceToPublication()}>{currentTranslation ? '確認・公開へ' : '現代語訳を作らず確認・公開へ'}</button>}
        {stage === 'publication' && publicationState === 'reviewed' && <button disabled={busy || contentUnsaved} onClick={() => void setPublication('draft')}>下書きへ戻す</button>}
        {stage === 'publication' && publicationState === 'published' && <button disabled={busy || contentUnsaved} onClick={() => void setPublication('reviewed')}>公開を取り下げる</button>}
        <button className="kobun-primary" disabled={primaryDisabled} onClick={primary}>{primaryLabel}</button></div></div>
    <div className="kobun-credit">レイアウト編集UI: <a href="https://github.com/yuta1984/honkoku-ocr-web" target="_blank" rel="noreferrer">みんなで翻刻OCR</a>（Yuta Hashimoto, 2025）を改変 · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a> · OCR: NDL古典籍OCR-Lite</div>
  </section>;
}
createRoot(root).render(<Workspace />);
