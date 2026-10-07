// Only window geometry is persisted; reading results and API keys are not stored here.
const storageKey = 'kobun-reading-window-v1';
const fields = ['left', 'top', 'width', 'height'];
const layouts = ['wide', 'tablet-portrait', 'phone-portrait', 'phone-landscape'];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const validGeometry = value => value && fields.every(name => Number.isFinite(value[name]))
  && value.width > 0 && value.height > 0;
const layout = () => {
  const width = window.innerWidth, height = window.innerHeight;
  if (width <= 600 || (width <= 950 && height <= 500)) return width > height ? 'phone-landscape' : 'phone-portrait';
  return width <= 1024 && height > width ? 'tablet-portrait' : 'wide';
};

export function mountReadingWindow(dialog) {
  const heading = dialog.querySelector('.kobun-reading__modal-heading');
  const handles = [...dialog.querySelectorAll('[data-resize-corner]')];
  let gesture = null, currentLayout = null, preferred = null, frame = null;
  const profiles = {};

  const rectangle = () => {
    const rect = dialog.getBoundingClientRect();
    return Object.fromEntries(fields.map(name => [name, rect[name]]));
  };
  const limits = () => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const style = getComputedStyle(dialog);
    const edge = side => Math.max(8, parseFloat(style.getPropertyValue(`--kobun-reading-safe-${side}`)) || 0);
    // Follow the software keyboard, but allow normal pinch zoom without reshaping the window.
    const visual = window.visualViewport;
    const viewport = visual && Math.abs(visual.scale - 1) < .01 ? visual
      : { width: window.innerWidth, height: window.innerHeight, offsetLeft: 0, offsetTop: 0 };
    const left = viewport.offsetLeft + edge('left'), top = viewport.offsetTop + edge('top');
    const right = viewport.offsetLeft + viewport.width - edge('right');
    const bottom = viewport.offsetTop + viewport.height - edge('bottom');
    const availableWidth = Math.max(1, right - left);
    const availableHeight = Math.max(1, bottom - top);
    return { left, top, right, bottom, maxWidth: availableWidth, maxHeight: availableHeight,
      minWidth: Math.min(availableWidth, 20 * rem),
      minHeight: Math.min(availableHeight, 16 * rem) };
  };
  const fit = geometry => {
    const bound = limits();
    const width = clamp(geometry.width, bound.minWidth, bound.maxWidth);
    const height = clamp(geometry.height, bound.minHeight, bound.maxHeight);
    return { width, height,
      left: clamp(geometry.left, bound.left, bound.right - width),
      top: clamp(geometry.top, bound.top, bound.bottom - height) };
  };
  const apply = (geometry, remember = false) => {
    const bound = limits();
    // A keyboard can leave less room than the CSS minimum height.
    dialog.style.minWidth = `${bound.minWidth}px`; dialog.style.minHeight = `${bound.minHeight}px`;
    for (const name of fields) dialog.style[name] = `${geometry[name]}px`;
    dialog.style.right = 'auto'; dialog.style.bottom = 'auto'; dialog.style.margin = '0';
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    dialog.style.setProperty('--kobun-reading-column-height', `${clamp(geometry.height - 14 * rem, 8 * rem, 24 * rem)}px`);
    if (remember) profiles[currentLayout] = preferred = geometry;
  };
  const defaults = () => {
    for (const name of [...fields, 'right', 'bottom', 'margin', 'min-width', 'min-height']) dialog.style.removeProperty(name);
    return rectangle();
  };
  const save = () => {
    // A closed block must not overwrite another block's more recent geometry.
    if (!dialog.open || !preferred) return;
    profiles[currentLayout] = preferred;
    try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, ...preferred, layout: currentLayout, profiles })); }
    catch { /* Storage can be disabled or full; moving and resizing still work. */ }
  };
  const restore = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved?.version === 1) {
        for (const name of layouts) if (validGeometry(saved.profiles?.[name])) {
          profiles[name] = Object.fromEntries(fields.map(field => [field, saved.profiles[name][field]]));
        }
        // Existing desktop geometry remains usable without narrowing a phone window.
        if (validGeometry(saved)) profiles[layouts.includes(saved.layout) ? saved.layout : 'wide'] =
          Object.fromEntries(fields.map(field => [field, saved[field]]));
      }
    } catch { /* Ignore invalid or unavailable storage. */ }
    currentLayout = layout();
    preferred = profiles[currentLayout] || defaults();
    profiles[currentLayout] = preferred;
    apply(fit(preferred));
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
      ? right - bound.left : bound.right - initial.left);
    const maxHeight = Math.min(bound.maxHeight, bound.bottom - initial.top);
    const width = clamp(initial.width + (corner === 'left' ? -dx : dx), Math.min(bound.minWidth, maxWidth), maxWidth);
    const height = clamp(initial.height + dy, Math.min(bound.minHeight, maxHeight), maxHeight);
    apply({ left: corner === 'left' ? right - width : initial.left, top: initial.top, width, height }, true);
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
      else apply(fit({ ...initial, left: initial.left + dx, top: initial.top + dy }), true);
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
  const reflow = () => {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null; finish();
      if (!dialog.open) return;
      const next = layout();
      if (next !== currentLayout) {
        currentLayout = next;
        preferred = profiles[next] || defaults();
        profiles[next] = preferred;
      }
      // Temporary viewport changes must not replace the user's saved dimensions.
      apply(fit(preferred));
    });
  };
  window.addEventListener('resize', reflow);
  window.visualViewport?.addEventListener('resize', reflow);
  window.visualViewport?.addEventListener('scroll', reflow);
  window.addEventListener('pagehide', () => { finish(); save(); });
  return { restore, save };
}
