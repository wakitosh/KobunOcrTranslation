import { test, expect, type Page, type Locator } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const origin = 'https://kobun.test';
const assetPath = '/modules/KobunOcrTranslation/asset/';
const storageKey = 'kobun-reading-window-v1';
const popup = (page: Page) => page.locator('.kobun-reading__dialog');
const box = async (element: Locator) => (await element.boundingBox())!;

async function fixture(page: Page) {
  const html = execFileSync('php', ['tests/reading-fixture.php', 'disabled'], { encoding: 'utf8' });
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
    } });
    return route.abort();
  });
  await page.goto(origin);
  await open(page);
}
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
