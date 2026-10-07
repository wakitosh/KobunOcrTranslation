import { test, expect, type Page, type Locator } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const origin = 'https://kobun.test';
const assetPath = '/modules/KobunOcrTranslation/asset/';
const storageKey = 'kobun-reading-window-v1';
const popup = (page: Page) => page.locator('.kobun-reading__dialog');
const box = async (element: Locator) => (await element.boundingBox())!;

async function fixture(page: Page, options: { translation?: boolean; data?: Record<string, unknown> } = {}) {
  const html = execFileSync('php', ['tests/reading-fixture.php', options.translation ? 'enabled' : 'disabled'], { encoding: 'utf8' });
  await page.route('**/*', route => route.abort());
  await page.route(`${origin}/**`, route => {
    const pathname = new URL(route.request().url()).pathname;
    if (pathname.startsWith(assetPath)) {
      const filename = path.resolve('asset', pathname.slice(assetPath.length));
      if (!filename.startsWith(path.resolve('asset') + path.sep)) return route.abort();
      return route.fulfill({ body: fs.readFileSync(filename), contentType: filename.endsWith('.css') ? 'text/css' : 'text/javascript' });
    }
    if (pathname === '/') return route.fulfill({ body: html, contentType: 'text/html' });
    if (pathname === '/reading/start') return route.fulfill({ json: {
      id: '1234567890abcdef12345678', quality: 'published', label: '図書館確認済み', status: 'published', job: null,
      lines: [{ order: 1, text: '春はあけぼの。', direction: 'vertical' }], transcription: '春はあけぼの。',
      writing_direction: 'vertical', reading_direction: 'rtl', translation: null, translation_available: false,
      transcription_credit: '翻刻班', transcription_metadata: {},
      ...options.data,
    } });
    return route.abort();
  });
  await page.goto(origin);
  await open(page);
}

test.describe('touch reading windows', () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });

  test('desktop, portrait phone, and landscape phone retain their own window geometry', async ({ page }, testInfo) => {
    await page.addInitScript(key => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({
        version: 1, left: 830, top: 70, width: 620, height: 700,
      }));
    }, storageKey);
    await fixture(page);
    const portrait = await box(popup(page));
    expect(portrait.width).toBeCloseTo(374, 0);
    const leftHandle = page.getByRole('button', { name: '左下からサイズを変更' });
    await leftHandle.focus();
    await leftHandle.press('ArrowRight');
    const adjusted = await box(popup(page));
    await page.setViewportSize({ width: 844, height: 390 });
    await expect.poll(async () => (await box(popup(page))).width).toBeGreaterThan(800);
    const landscape = await box(popup(page));
    expect(landscape.height).toBeLessThan(390);
    await page.screenshot({ path: testInfo.outputPath('phone-landscape.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect.poll(async () => (await box(popup(page))).width).toBeCloseTo(adjusted.width, 0);
    await sameBox(popup(page), adjusted);
    await page.setViewportSize({ width: 1600, height: 1100 });
    await expect.poll(async () => (await box(popup(page))).width).toBeCloseTo(620, 0);
    await sameBox(popup(page), { x: 830, y: 70, width: 620, height: 700 });
    await page.getByRole('button', { name: '閉じる', exact: true }).tap();
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page);
    await sameBox(popup(page), adjusted);
    await page.reload();
    await open(page);
    await sameBox(popup(page), adjusted);
  });

  test('tablet defaults leave room for the image and keep drag and resize usable', async ({ page, browserName }, testInfo) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await fixture(page);
    const portrait = await box(popup(page));
    expect(portrait.width).toBeGreaterThan(480);
    expect(portrait.x).toBeGreaterThan(200);
    await page.screenshot({ path: testInfo.outputPath('tablet-portrait.png') });
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect.poll(async () => (await box(popup(page))).width).toBeLessThan(512);
    const landscape = await box(popup(page));
    expect(landscape.x).toBeGreaterThan(512);
    const client = browserName === 'chromium' ? await page.context().newCDPSession(page) : null;
    const touchDrag = async (target: Locator, dx: number, dy: number) => {
      if (!client) return drag(page, target, dx, dy);
      const rect = await box(target), x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
      await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (let step = 1; step <= 5; step++) await client.send('Input.dispatchTouchEvent', {
        type: 'touchMove', touchPoints: [{ x: x + dx * step / 5, y: y + dy * step / 5 }],
      });
      await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    };
    await touchDrag(page.locator('.kobun-reading__modal-title'), -60, 30);
    const moved = await box(popup(page));
    expect(moved.x).toBeCloseTo(landscape.x - 60, 0);
    expect(moved.y).toBeCloseTo(landscape.y + 30, 0);
    const leftHandle = page.getByRole('button', { name: '左下からサイズを変更' });
    expect((await box(leftHandle)).width).toBeGreaterThanOrEqual(44);
    await touchDrag(leftHandle, -70, 20);
    const resized = await box(popup(page));
    expect(resized.width).toBeCloseTo(moved.width + 70, 0);
    expect(resized.height).toBeCloseTo(moved.height + 20, 0);
    expect(resized.x + resized.width).toBeCloseTo(moved.x + moved.width, 0);
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect.poll(async () => (await box(popup(page))).width).toBeCloseTo(portrait.width, 0);
    await sameBox(popup(page), portrait);
  });

  for (const direction of ['rtl', 'ltr']) {
    test(`long ${direction} vertical text, rights data, and LLM settings fit a phone`, async ({ page }, testInfo) => {
      const text = '春はあけぼの。やうやう白くなりゆく山ぎは。'.repeat(5);
      await fixture(page, { translation: true, data: {
        lines: Array.from({ length: 8 }, (_, index) => ({ order: index + 1, text, direction: 'vertical' })),
        transcription: text.repeat(8), reading_direction: direction,
        transcription_metadata: { title: '古典籍翻刻の研究成果', contributors: '翻刻研究班',
          publication_url: 'https://example.org/research/' + 'a'.repeat(120), citation: '古典籍翻刻データの出典情報。'.repeat(12) },
        translation: { method: 'manual', text: '春は、夜明けのころがよい。'.repeat(20) },
      } });
      const transcription = page.locator('.kobun-reading__transcription');
      await expect(transcription.locator('p').first()).toHaveText(text);
      expect((await box(transcription.locator('p').first())).height)
        .toBeLessThan(await page.locator('.kobun-reading__window-body').evaluate(element => element.clientHeight));
      const columnFlow = await transcription.locator('p').first().evaluate(element => {
        const text = element.firstChild!, range = document.createRange();
        range.setStart(text, 0); range.setEnd(text, 1);
        const first = range.getBoundingClientRect().left;
        range.setStart(text, text.textContent!.length - 1); range.setEnd(text, text.textContent!.length);
        return range.getBoundingClientRect().left - first;
      });
      expect(direction === 'rtl' ? -columnFlow : columnFlow).toBeGreaterThan(20);
      const before = await box(transcription.locator('p').first());
      await transcription.evaluate((element, direction) => {
        element.scrollLeft = direction === 'rtl' ? -element.scrollWidth : element.scrollWidth;
      }, direction);
      expect(Math.abs((await box(transcription.locator('p').first())).x - before.x)).toBeGreaterThan(20);
      const attribution = page.locator('.kobun-reading__attribution');
      await attribution.scrollIntoViewIfNeeded();
      expect(await attribution.locator('dl').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1);
      expect(await page.locator('.kobun-reading__window-body').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const body = page.locator('.kobun-reading__window-body');
      await body.evaluate(element => { element.scrollTop = 0; });
      await page.screenshot({ path: testInfo.outputPath(`phone-${direction}.png`) });
      const translationTab = page.getByRole('tab', { name: '現代語訳' });
      expect((await box(translationTab)).height).toBeGreaterThanOrEqual(44);
      await translationTab.tap();
      await expect(page.locator('.kobun-reading__translation')).toContainText('春は、夜明けのころがよい。');
      await page.locator('.kobun-llm summary').tap();
      await page.locator('.kobun-llm select[data-field="provider"]').selectOption('openai');
      const input = page.locator('.kobun-llm input[data-field="key"]');
      expect(await input.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
      expect(await body.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      await expect(page.getByRole('button', { name: '閉じる', exact: true })).toBeInViewport();
    });
  }

  test('software keyboard and safe areas fit the window without overwriting saved sizes or pinch zoom', async ({ page }) => {
    await page.addInitScript(() => {
      const viewport = Object.assign(new EventTarget(), { width: 390, height: 844, offsetTop: 0, offsetLeft: 0, scale: 1 });
      Object.defineProperty(window, 'visualViewport', { value: viewport, configurable: true });
      (window as any).fixtureViewport = viewport;
    });
    await fixture(page);
    const initial = await box(popup(page));
    await page.evaluate(() => {
      const viewport = (window as any).fixtureViewport;
      viewport.height = 180; viewport.offsetTop = 50; viewport.dispatchEvent(new Event('resize'));
    });
    await expect.poll(async () => { const rect = await box(popup(page)); return rect.y + rect.height; }).toBeLessThanOrEqual(222);
    expect((await box(popup(page))).y).toBeGreaterThanOrEqual(58);
    await expect(page.getByRole('button', { name: '閉じる', exact: true })).toBeInViewport();
    await page.getByRole('button', { name: '閉じる', exact: true }).tap();
    expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).height, storageKey)).toBeCloseTo(initial.height, 0);
    await page.evaluate(() => {
      const viewport = (window as any).fixtureViewport;
      viewport.height = 844; viewport.offsetTop = 0; viewport.dispatchEvent(new Event('resize'));
    });
    await open(page);
    await sameBox(popup(page), initial);
    await page.evaluate(() => {
      const viewport = (window as any).fixtureViewport;
      viewport.width = 195; viewport.height = 422; viewport.scale = 2; viewport.dispatchEvent(new Event('resize'));
    });
    await sameBox(popup(page), initial);
    await popup(page).evaluate(element => {
      element.style.setProperty('--kobun-reading-safe-left', '24px');
      element.style.setProperty('--kobun-reading-safe-right', '24px');
      element.style.setProperty('--kobun-reading-safe-bottom', '20px');
      const viewport = (window as any).fixtureViewport;
      viewport.width = 390; viewport.height = 844; viewport.scale = 1; viewport.dispatchEvent(new Event('resize'));
    });
    await expect.poll(async () => (await box(popup(page))).x).toBeGreaterThanOrEqual(24);
    const safe = await box(popup(page));
    expect(safe.x + safe.width).toBeLessThanOrEqual(366);
    expect(safe.y + safe.height).toBeLessThanOrEqual(824);
  });
});
async function open(page: Page) {
  await page.getByRole('button', { name: 'このページを翻刻する' }).click();
  await expect(popup(page)).toBeVisible();
}
async function drag(page: Page, target: Locator, dx: number, dy: number) {
  const rect = await box(target);
  const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + dx, y + dy, { steps: 5 });
  await page.mouse.up();
}
async function sameBox(element: Locator, expected: { x: number; y: number; width: number; height: number }) {
  const actual = await box(element);
  for (const name of ['x', 'y', 'width', 'height'] as const) expect(actual[name]).toBeCloseTo(expected[name], 0);
}

test('dragged position and left-corner size survive closing, another page, and reload', async ({ page }) => {
  await fixture(page);
  expect(await popup(page).evaluate(element => element.matches(':modal'))).toBe(false);
  const initial = await box(popup(page));
  await drag(page, page.locator('.kobun-reading__modal-title'), -180, 60);
  const moved = await box(popup(page));
  expect(moved.x).toBeCloseTo(initial.x - 180, 0);
  expect(moved.y).toBeCloseTo(initial.y + 60, 0);
  const leftHandle = page.getByRole('button', { name: '左下からサイズを変更' });
  await drag(page, leftHandle, -120, 50);
  const resized = await box(popup(page));
  expect(resized.width).toBeCloseTo(moved.width + 120, 0);
  expect(resized.height).toBeCloseTo(moved.height + 50, 0);
  expect(resized.x + resized.width).toBeCloseTo(moved.x + moved.width, 0);
  await leftHandle.focus();
  await leftHandle.press('ArrowRight');
  await leftHandle.press('Shift+ArrowUp');
  const adjusted = await box(popup(page));
  expect(adjusted.width).toBeCloseTo(resized.width - 16, 0);
  expect(adjusted.height).toBeCloseTo(resized.height - 4, 0);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), storageKey))
    .toMatchObject({ version: 1, left: adjusted.x, top: adjusted.y, width: adjusted.width, height: adjusted.height });
  await page.getByRole('button', { name: '閉じる', exact: true }).click();
  await open(page);
  await sameBox(popup(page), adjusted);
  await page.evaluate(() => { (window as any).fixtureCanvas = 'c2'; (window as any).fixtureListeners.forEach((fn: () => void) => fn()); });
  await expect(popup(page)).toBeHidden();
  await open(page);
  await sameBox(popup(page), adjusted);
  await page.reload();
  await expect(popup(page)).toBeHidden();
  await open(page);
  await sameBox(popup(page), adjusted);
});

test('both resize handles stay at the window edge while its content scrolls', async ({ page }) => {
  await fixture(page);
  await page.locator('.kobun-reading__transcription').evaluate(element => {
    const text = document.createElement('div'); text.style.height = '2000px'; element.append(text);
  });
  const body = page.locator('.kobun-reading__window-body');
  await body.evaluate(element => { element.scrollTop = element.scrollHeight; });
  expect(await body.evaluate(element => element.scrollTop)).toBeGreaterThan(100);
  const before = await box(popup(page));
  for (const corner of ['left', 'right']) {
    const handle = await box(page.locator(`[data-resize-corner=${corner}]`));
    expect(handle.y + handle.height).toBeCloseTo(before.y + before.height, 0);
  }
  await drag(page, page.getByRole('button', { name: '右下からサイズを変更' }), -80, -50);
  const after = await box(popup(page));
  expect(after.width).toBeCloseTo(before.width - 80, 0);
  expect(after.height).toBeCloseTo(before.height - 50, 0);
  expect(after.x).toBeCloseTo(before.x, 0);
});

test('saved and live geometry are constrained to a smaller viewport', async ({ page }) => {
  await page.addInitScript(key => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ version: 1, left: 850, top: 460, width: 620, height: 450 }));
  }, storageKey);
  await fixture(page);
  await page.setViewportSize({ width: 480, height: 360 });
  // The browser dispatches its resize event after setViewportSize resolves.
  await expect.poll(async () => { const rect = await box(popup(page)); return rect.x + rect.width; }).toBeLessThanOrEqual(472);
  const rect = await box(popup(page));
  expect(rect.x).toBeGreaterThanOrEqual(8);
  expect(rect.y).toBeGreaterThanOrEqual(8);
  expect(rect.x + rect.width).toBeLessThanOrEqual(472);
  expect(rect.y + rect.height).toBeLessThanOrEqual(352);
  await expect(page.getByRole('button', { name: '閉じる', exact: true })).toBeInViewport();
  await expect(page.getByRole('button', { name: '左下からサイズを変更' })).toBeInViewport();
  await drag(page, page.locator('.kobun-reading__modal-title'), -2000, -2000);
  const moved = await box(popup(page));
  expect(moved.x).toBe(8); expect(moved.y).toBe(8);
  await page.reload();
  await open(page);
  await sameBox(popup(page), moved);
});

for (const unavailable of [false, true]) {
  test(`window still moves and resizes when storage is ${unavailable ? 'disabled' : 'invalid'}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(({ key, unavailable }) => {
      if (!unavailable) { localStorage.setItem(key, '{invalid json'); return; }
      for (const name of ['getItem', 'setItem'] as const) {
        const original = Storage.prototype[name];
        Storage.prototype[name] = function (...args: any[]) {
          if (args[0] === key) throw new DOMException('Storage disabled', 'SecurityError');
          return original.apply(this, args as [string, string]);
        };
      }
    }, { key: storageKey, unavailable });
    await fixture(page);
    const initial = await box(popup(page));
    await drag(page, page.locator('.kobun-reading__modal-title'), -80, 30);
    await drag(page, page.getByRole('button', { name: '左下からサイズを変更' }), -60, 20);
    const after = await box(popup(page));
    expect(after.x).toBeCloseTo(initial.x - 140, 0);
    expect(after.width).toBeCloseTo(initial.width + 60, 0);
    await page.keyboard.press('Escape');
    await open(page);
    await sameBox(popup(page), after);
    expect(errors).toEqual([]);
  });
}
