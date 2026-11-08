/**
 * Reading-order controls adapted from honkoku-ocr-web by Yuta Hashimoto, CC BY 4.0,
 * revision 24469701412edda5be26c89784a29c7525bbb899. See THIRD_PARTY_NOTICES.md.
 * Changes: private visitor results, compact layout, numeric edits and isolated undo history.
 */
import { createRoot } from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';
import { ImageViewer, type ImageViewerHandle } from './ImageViewer';
import { boxDirection, effectiveReadingDirection, pageDirection, reorderForReadingDirection } from './direction';
import type { BoundingBox, LineBox, ReadingDirection } from './types';
import './viewer.css';
import './public-layout.css';

interface Layout {
  id: string; revision: number; width: number; height: number;
  lines: LineBox[]; reading_direction: ReadingDirection;
}
interface Options {
  imageUrl: string;
  onSubmit: (body: { id: string; base_revision: number; reading_direction: ReadingDirection;
    lines: { id: string; x: number; y: number; width: number; height: number }[] }) => Promise<void>;
  onCancel: () => void;
}
type Snapshot = { lines: LineBox[]; direction: ReadingDirection };
const ordered = (lines: LineBox[]) => lines.map((line, i) => ({ ...line, readingOrder: i + 1 }));

export function mountPublicLayout(host: HTMLElement, layout: Layout, options: Options) {
  const root = createRoot(host), dirty = { current: false };
  root.render(<Editor layout={layout} options={options} dirty={dirty} />);
  return { destroy: () => root.unmount(), isDirty: () => dirty.current };
}

function Editor({ layout, options, dirty }: { layout: Layout; options: Options; dirty: { current: boolean } }) {
  const [lines, setLines] = useState(ordered(layout.lines));
  const [direction, setDirection] = useState<ReadingDirection>(layout.reading_direction || 'auto');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [undo, setUndo] = useState<Snapshot[]>([]), [redo, setRedo] = useState<Snapshot[]>([]);
  const [drawing, setDrawing] = useState(false), [region, setRegion] = useState<BoundingBox | null>(null);
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  const viewer = useRef<ImageViewerHandle>(null), live = useRef(true);
  const regionHost = useRef<HTMLElement>(null);
  useEffect(() => { live.current = true; regionHost.current?.focus({ preventScroll: true }); return () => { live.current = false; }; }, []);
  const selected = lines.find(line => line.id === selectedId);
  const writing = pageDirection(lines.length ? lines : layout.lines), reading = effectiveReadingDirection(writing, direction);
  const previousKey = writing === 'vertical' ? (reading === 'rtl' ? 'ArrowRight' : 'ArrowLeft') : 'ArrowUp';
  const nextKey = writing === 'vertical' ? (reading === 'rtl' ? 'ArrowLeft' : 'ArrowRight') : 'ArrowDown';
  const snapshot = (): Snapshot => ({ lines, direction });
  function edit(next: LineBox[], nextDirection = direction) {
    if (busy) return;
    setUndo(history => [...history.slice(-29), snapshot()]); setRedo([]);
    setLines(ordered(next)); setDirection(nextDirection); dirty.current = true; setError('');
  }
  function restore(back: boolean) {
    const history = back ? undo : redo, target = history.at(-1);
    if (!target || busy) return;
    if (back) { setRedo(history => [...history, snapshot()]); setUndo(undo.slice(0, -1)); }
    else { setUndo(history => [...history, snapshot()]); setRedo(redo.slice(0, -1)); }
    setLines(target.lines); setDirection(target.direction); dirty.current = true;
  }
  function select(order: number | null) { setSelectedId(lines.find(line => line.readingOrder === order)?.id || null); }
  function moveTo(index: number) {
    const from = lines.findIndex(line => line.id === selectedId);
    if (from < 0 || index < 0 || index >= lines.length || from === index || busy) return;
    const next = [...lines], [row] = next.splice(from, 1); next.splice(index, 0, row); edit(next);
  }
  function move(delta: number) { moveTo(lines.findIndex(line => line.id === selectedId) + delta); }
  function update(order: number, box: BoundingBox) {
    edit(lines.map(line => line.readingOrder === order ? { ...line, ...box, direction: boxDirection(box), raw: undefined } : line));
  }
  function remove(order: number) { edit(lines.filter(line => line.readingOrder !== order)); setSelectedId(null); }
  function add(box: BoundingBox) {
    if (lines.length >= 500) { setError('行枠は500件まで追加できます。'); return; }
    const next: LineBox = { ...box, id: crypto.randomUUID(), classId: 1, confidence: 0,
      readingOrder: lines.length + 1, direction: boxDirection(box) };
    edit([...lines, next]); setSelectedId(next.id); setDrawing(false); setRegion(null);
  }
  function addCentered() {
    const visible = viewer.current?.getVisibleImageBounds() || { x: 0, y: 0, width: layout.width, height: layout.height };
    const width = Math.max(4, Math.min(layout.width, Math.round(visible.width * (writing === 'vertical' ? .12 : .7))));
    const height = Math.max(4, Math.min(layout.height, Math.round(visible.height * (writing === 'vertical' ? .7 : .12))));
    add({ x: Math.round(Math.max(0, Math.min(layout.width - width, visible.x + (visible.width - width) / 2))),
      y: Math.round(Math.max(0, Math.min(layout.height - height, visible.y + (visible.height - height) / 2))), width, height });
  }
  async function submit() {
    if (!lines.length || busy) return;
    setBusy(true); setError('');
    try {
      await options.onSubmit({ id: layout.id, base_revision: layout.revision, reading_direction: direction,
        lines: lines.map(({ id, x, y, width, height }) => ({ id, x, y, width, height })) });
    } catch (error) { if (live.current) setError((error as Error).message); }
    finally { if (live.current) setBusy(false); }
  }
  return <section ref={regionHost} tabIndex={-1} className="kobun-public-layout" aria-label="自分用のレイアウト調整" aria-busy={busy} onKeyDown={e => {
    if ((e.target as HTMLElement).closest('input,textarea,select')) return;
    if ((e.key === 'Delete' || e.key === 'Backspace') && selected && !busy) { e.preventDefault(); remove(selected.readingOrder); return; }
    if (!(e.ctrlKey || e.metaKey)) return;
    if (e.key.toLowerCase() === 'z') { e.preventDefault(); restore(!e.shiftKey); }
    else if (e.key.toLowerCase() === 'y') { e.preventDefault(); restore(false); }
  }}>
    <p className="kobun-public-layout__notice">自分用の未確認の翻刻を作り直します。他の訪問者の結果には反映されません。</p>
    <div className="kobun-public-layout__toolbar">
      <label>読み方向<select aria-label="レイアウトの読み方向" value={direction} disabled={busy}
        onChange={e => { const next = e.target.value as ReadingDirection; edit(reorderForReadingDirection(lines, writing, next), next); }}>
        <option value="auto">自動（縦: 右→左／横: 左→右）</option><option value="ltr">左から右</option><option value="rtl">右から左</option>
      </select></label>
      <button type="button" disabled={!undo.length || busy} onClick={() => restore(true)}>元に戻す</button>
      <button type="button" disabled={!redo.length || busy} onClick={() => restore(false)}>やり直す</button>
    </div>
    <div className="kobun-public-layout__viewer viewer-wrap">
      <ImageViewer ref={viewer} dataUrl={options.imageUrl} lines={lines} regions={[]} showOverlays selectedOrder={selected?.readingOrder ?? null}
        editable={!busy} onSelectLine={select} onUpdateLine={update} onDeleteLine={remove}
        regionMode={drawing && !busy} selectedRegion={region} onRegionDraw={setRegion} />
    </div>
    <div className="kobun-public-layout__toolbar">
      <button type="button" aria-pressed={drawing} disabled={busy || lines.length >= 500} onClick={() => { setDrawing(!drawing); setRegion(null); }}>枠を描く</button>
      {drawing && <button type="button" disabled={!region || busy} onClick={() => region && add(region)}>描いた枠を追加</button>}
      <button type="button" disabled={!selected || busy} onClick={() => selected && remove(selected.readingOrder)}>選択した行を削除</button>
    </div>
    <p className="kobun-public-layout__hint">行枠を選んで移動・サイズ変更できます。行一覧ではドラッグ、矢印キー、前後ボタンで順番を変えられます。</p>
    {!lines.length && <p className="kobun-public-layout__hint">行枠がありません。「枠を描く」か「行枠の詳しい調整」から追加してください。</p>}
    <ol className={`kobun-public-layout__order is-${writing} reading-${reading}`} aria-label="行の読み順" onKeyDown={e => {
      if (e.key === previousKey || e.key === nextKey) { e.preventDefault(); move(e.key === previousKey ? -1 : 1); }
    }}>
      {lines.map((line, index) => <li key={line.id}><button type="button" disabled={busy} draggable={!busy}
        className={selectedId === line.id ? 'is-selected' : ''} aria-pressed={selectedId === line.id}
        aria-label={`行 ${index + 1} を選択`} onClick={() => { setSelectedId(line.id); viewer.current?.scrollToLine(line.readingOrder); }}
        onFocus={() => setSelectedId(line.id)} onDragStart={e => { setSelectedId(line.id); e.dataTransfer.setData('text/plain', line.id); }}
        onDragOver={e => e.preventDefault()} onDrop={e => {
          e.preventDefault(); const id = e.dataTransfer.getData('text/plain'), from = lines.findIndex(row => row.id === id);
          if (from < 0 || from === index) return;
          const next = [...lines], [row] = next.splice(from, 1); next.splice(index, 0, row); edit(next); setSelectedId(id);
        }}><b>{index + 1}</b><span>{line.raw || '（未認識）'}</span></button></li>)}
    </ol>
    <div className="kobun-public-layout__toolbar">
      <button type="button" disabled={!selected || selected.readingOrder === 1 || busy} onClick={() => move(-1)}>選択行を前へ</button>
      <button type="button" disabled={!selected || selected.readingOrder === lines.length || busy} onClick={() => move(1)}>選択行を後ろへ</button>
      <span>{lines.length}行{selected ? ` · 行 ${selected.readingOrder} を選択中` : ''}</span>
    </div>
    <details><summary>行枠の詳しい調整</summary>
      <p className="kobun-public-layout__hint">座標と大きさを数値でも変更できます。</p>
      <button type="button" disabled={busy || lines.length >= 500} onClick={addCentered}>中央に行を追加</button>
      {selected && <div className="kobun-public-layout__coordinates">{(['x', 'y', 'width', 'height'] as const).map((key, i) => <label key={key}>
        {['X座標', 'Y座標', '幅', '高さ'][i]}<input type="number" aria-label={['行枠のX座標', '行枠のY座標', '行枠の幅', '行枠の高さ'][i]}
          key={`${selected.id}-${key}-${Math.round(selected[key])}`} defaultValue={Math.round(selected[key])}
          min={i < 2 ? 0 : 4} disabled={busy} onChange={() => { dirty.current = true; }}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); } }} onBlur={e => {
            if (!Number.isFinite(e.currentTarget.valueAsNumber)) { e.currentTarget.value = String(Math.round(selected[key])); return; }
            const max = key === 'x' ? layout.width - selected.width : key === 'y' ? layout.height - selected.height
              : key === 'width' ? layout.width - selected.x : layout.height - selected.y;
            const value = Math.max(i < 2 ? 0 : 4, Math.min(max, Math.round(e.currentTarget.valueAsNumber)));
            if (value === selected[key]) { e.currentTarget.value = String(value); return; }
            update(selected.readingOrder, { x: selected.x, y: selected.y, width: selected.width, height: selected.height, [key]: value });
          }} /></label>)}</div>}
    </details>
    {error && <p role="alert" className="kobun-public-layout__error">{error}</p>}
    <p className="kobun-public-layout__credit">編集UI: <a href="https://github.com/yuta1984/honkoku-ocr-web" target="_blank" rel="noopener noreferrer">みんなで翻刻OCR</a>
      （橋本雄太、<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>）を改変。</p>
    <div className="kobun-public-layout__actions">
      <button type="button" className="is-primary" disabled={busy || !lines.length} onClick={() => void submit()}>{busy ? '再認識を開始しています…' : 'このレイアウトで翻刻する'}</button>
      <button type="button" disabled={busy} onClick={options.onCancel}>結果に戻る</button>
    </div>
  </section>;
}
