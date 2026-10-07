// Only window geometry is persisted; reading results and API keys are not stored here.
const storageKey = 'kobun-reading-window-v1';
const fields = ['left', 'top', 'width', 'height'];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function mountReadingWindow(dialog) {
  const heading = dialog.querySelector('.kobun-reading__modal-heading');
  const handles = [...dialog.querySelectorAll('[data-resize-corner]')];
  let gesture = null, lastGeometry = null;

  const rectangle = () => {
    const rect = dialog.getBoundingClientRect();
    return Object.fromEntries(fields.map(name => [name, rect[name]]));
  };
  const limits = () => {
    const margin = 8;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const availableWidth = Math.max(1, window.innerWidth - margin * 2);
    const availableHeight = Math.max(1, window.innerHeight - margin * 2);
    return { margin, maxWidth: availableWidth, maxHeight: availableHeight,
      minWidth: Math.min(availableWidth, 20 * rem),
      minHeight: Math.min(availableHeight, 16 * rem) };
  };
  const fit = geometry => {
    const bound = limits();
    const width = clamp(geometry.width, bound.minWidth, bound.maxWidth);
    const height = clamp(geometry.height, bound.minHeight, bound.maxHeight);
    return { width, height,
      left: clamp(geometry.left, bound.margin, window.innerWidth - bound.margin - width),
      top: clamp(geometry.top, bound.margin, window.innerHeight - bound.margin - height) };
  };
  const apply = geometry => {
    for (const name of fields) dialog.style[name] = `${geometry[name]}px`;
    dialog.style.right = 'auto'; dialog.style.bottom = 'auto'; dialog.style.margin = '0';
    lastGeometry = geometry;
  };
  const save = () => {
    // A closed block must not overwrite another block's more recent geometry.
    if (!dialog.open) return;
    lastGeometry = rectangle();
    try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, ...lastGeometry })); }
    catch { /* Storage can be disabled or full; moving and resizing still work. */ }
  };
  const restore = () => {
    let geometry = lastGeometry || rectangle();
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved?.version === 1 && fields.every(name => Number.isFinite(saved[name]))
          && saved.width > 0 && saved.height > 0) geometry = saved;
    } catch { /* Ignore invalid or unavailable storage. */ }
    apply(fit(geometry));
  };
  const finish = () => {
    if (!gesture) return;
    const previous = gesture;
    gesture = null;
    if (previous.target.hasPointerCapture(previous.pointerId)) previous.target.releasePointerCapture(previous.pointerId);
    heading.classList.remove('is-dragging');
    document.body.style.userSelect = previous.userSelect;
    save();
  };
  const resize = (initial, corner, dx, dy) => {
    const bound = limits();
    const right = initial.left + initial.width;
    const maxWidth = Math.min(bound.maxWidth, corner === 'left'
      ? right - bound.margin : window.innerWidth - bound.margin - initial.left);
    const maxHeight = Math.min(bound.maxHeight, window.innerHeight - bound.margin - initial.top);
    const width = clamp(initial.width + (corner === 'left' ? -dx : dx), Math.min(bound.minWidth, maxWidth), maxWidth);
    const height = clamp(initial.height + dy, Math.min(bound.minHeight, maxHeight), maxHeight);
    apply({ left: corner === 'left' ? right - width : initial.left, top: initial.top, width, height });
  };
  const bindPointer = (target, corner = null) => {
    target.addEventListener('pointerdown', event => {
      if (!dialog.open || gesture || event.button !== 0
          || (!corner && event.target.closest('button, a, input, select, textarea'))) return;
      apply(fit(rectangle()));
      gesture = { target, corner, pointerId: event.pointerId, x: event.clientX, y: event.clientY,
        initial: rectangle(), userSelect: document.body.style.userSelect };
      target.setPointerCapture(event.pointerId);
      if (!corner) heading.classList.add('is-dragging');
      document.body.style.userSelect = 'none';
      event.preventDefault();
    });
    target.addEventListener('pointermove', event => {
      if (!gesture || gesture.pointerId !== event.pointerId) return;
      const { initial, corner, x, y } = gesture;
      const dx = event.clientX - x, dy = event.clientY - y;
      if (corner) resize(initial, corner, dx, dy);
      else apply(fit({ ...initial, left: initial.left + dx, top: initial.top + dy }));
    });
    for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) target.addEventListener(name, event => {
      if (gesture?.pointerId === event.pointerId) finish();
    });
  };
  bindPointer(heading);
  handles.forEach(handle => {
    const corner = handle.dataset.resizeCorner;
    bindPointer(handle, corner);
    handle.addEventListener('keydown', event => {
      if (!dialog.open || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      const step = event.shiftKey ? 4 : 16;
      resize(rectangle(), corner,
        event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0,
        event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0);
      save(); event.preventDefault();
    });
  });
  dialog.addEventListener('close', () => { finish(); save(); });
  window.addEventListener('resize', () => {
    finish();
    if (dialog.open) apply(fit(rectangle()));
  });
  window.addEventListener('pagehide', () => { finish(); save(); });
  return { restore, save };
}
