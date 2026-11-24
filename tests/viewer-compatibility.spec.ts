import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Synthetic JPEG, actual built viewers, no Omeka login or inference services.
const origin = 'https://kobun.test', assets = '/modules/KobunOcrTranslation/asset/';
const image = fs.readFileSync('tests/fixtures/viewer.jpg');
const id = 'a'.repeat(24);
const lines = [{ id: 'line1', x: 100, y: 100, width: 40, height: 650, readingOrder: 1,
  confidence: .9, classId: 1, raw: '試験用の本文', direction: 'vertical' }];
const source = { media_id: 1, item_id: 1, item_title: '表示試験', item_identifier: 'fixture', title: '画像1',
  service_id: 'https://images.test/1', image_url: 'https://images.test/1/image.jpg', native_width: 600,
  native_height: 900, canvas_id: null, position: 1 };
type Graphics = 'normal' | 'unavailable' | 'blank';
type Surface = 'admin' | 'public';

async function fixture(page: Page, surface: Surface, graphics: Graphics, brokenImage = false) {
  page.setDefaultTimeout(12000);
  if (graphics !== 'normal') await page.addInitScript(mode => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: any[]) {
      if (/^(webgl2?|experimental-webgl)$/.test(type) && mode === 'unavailable') return null;
      const context = (getContext as any).call(this, type, ...args);
      if (/^(webgl2?|experimental-webgl)$/.test(type) && context && mode === 'blank') {
        // The context is available but the GPU produces no pixels: support detection alone succeeds.
        context.drawArrays = () => {};
        context.drawElements = () => {};
      }
      return context;
    } as typeof getContext;
  }, graphics);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const doc = { id, source, width: 600, height: 900, revision: 1, history_count: 1, workflow: 'editorial',
    publication_state: 'draft', status: 'recognize', lines, regions: [], translation: null, reading_direction: 'rtl' };
  const reading = { id, revision: 1, quality: 'machine', label: '機械生成・未確認', status: 'recognize', job: null,
    layout_line_count: lines.length, lines: [{ order: 1, text: lines[0].raw, direction: 'vertical' }],
    writing_direction: 'vertical', reading_direction: 'rtl', transcription: lines[0].raw, translation: null,
    translation_available: false, transcription_metadata: {}, can_adjust_layout: true, transcription_scope: 'shared' };
  let fail = brokenImage;
  let imageRequests = 0;
  await page.route('**/*', route => route.abort());
  await page.route(`${origin}/**`, route => {
    const request = route.request(), url = new URL(request.url());
    if (url.pathname.startsWith(assets)) {
      const file = path.resolve('asset', url.pathname.slice(assets.length));
      if (!file.startsWith(path.resolve('asset') + path.sep)) return route.abort();
      return route.fulfill({ body: fs.readFileSync(file), contentType: file.endsWith('.css') ? 'text/css' : 'text/javascript' });
    }
    if (url.pathname === '/') return route.fulfill({ contentType: 'text/html', body: surface === 'public'
      ? execFileSync('php', ['tests/reading-fixture.php', 'disabled'], { encoding: 'utf8' })
      : `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${assets}dist/workspace.css">
        <div id="kobun-workspace" data-proxy="/proxy" data-pages="/pages" data-csrf="fixture" data-can-manage="1" data-can-edit-transcription="1"></div>
        <script type="module" src="${assets}dist/workspace.js"></script>` });
    if (url.pathname === '/pages') return route.fulfill({ json: { title: source.item_title, identifier: 'fixture',
      item_id: 1, total: 1, pages: [source] } });
    const endpoint = url.pathname === '/proxy' ? url.searchParams.get('endpoint') : url.pathname;
    if (endpoint?.endsWith('/image') || endpoint === '/reading/layout-image') {
      imageRequests++;
      // A 200 HTML login/error page is not a decodable image.
      return route.fulfill({ body: fail ? Buffer.from('<html>not an image</html>') : image,
        contentType: fail ? 'text/html' : 'image/jpeg' });
    }
    if (endpoint === 'health') return route.fulfill({ json: { ocr_ready: true, llm_ready: false } });
    if (endpoint === 'documents') return route.fulfill({ json: [doc] });
    if (endpoint === `documents/${id}`) return route.fulfill({ json: doc });
    if (endpoint === '/reading/start') return route.fulfill({ json: reading });
    if (endpoint === '/reading/layout') return route.fulfill({ json: { ...doc, reading_direction: 'rtl' } });
    return route.abort();
  });
  await page.goto(surface === 'admin' ? `${origin}/?item_id=1&media_id=1` : origin);
  if (surface === 'public') {
    await page.getByRole('button', { name: 'このページを翻刻する', exact: true }).click();
    await page.getByRole('button', { name: 'レイアウトを調整', exact: true }).click();
  } else await page.getByRole('button', { name: /2.*レイアウト調整/ }).click();
  return { errors, recover: () => { fail = false; }, imageRequests: () => imageRequests };
}

async function expectImagePixels(page: Page) {
  // A successful HTTP response and line overlays do not prove the image was drawn.
  await expect.poll(() => page.locator('.osd-host canvas').first().evaluate((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    return context ? [...context.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data] : [];
  })).toEqual([239, 220, 180, 255]);
}

for (const surface of ['admin', 'public'] as const) {
  for (const graphics of ['normal', 'unavailable', 'blank'] as const) {
    test(`${surface}: image pixels and editable frames with ${graphics} WebGL`, async ({ page }, testInfo) => {
      const state = await fixture(page, surface, graphics);
      await expectImagePixels(page);
      await expect(page.locator('.osd-line')).toHaveCount(1);
      await page.locator('.osd-line').click();
      await expect(page.locator('.edit-layer')).toBeVisible();
      const before = await page.locator('.edit-layer').boundingBox();
      const handle = (await page.locator('.edit-e').boundingBox())!;
      await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
      await page.mouse.down(); await page.mouse.move(handle.x + handle.width / 2 + 20, handle.y + handle.height / 2, { steps: 5 }); await page.mouse.up();
      await expect.poll(async () => (await page.locator('.edit-layer').boundingBox())!.width).toBeGreaterThan(before!.width + 10);
      await page.screenshot({ path: testInfo.outputPath(`${surface}-${graphics}.png`) });
      expect(state.errors).toEqual([]);
    });
  }
  test(`${surface}: an image error is visible and retry restores pixels without losing the layout`, async ({ page }) => {
    const state = await fixture(page, surface, 'unavailable', true);
    await expect(page.locator('.osd-image-error')).toBeVisible();
    state.recover();
    await page.getByRole('button', { name: '画像を再読み込み', exact: true }).click();
    if (surface === 'public') {
      // Retrying the same Blob cannot repair a bad response. Reopen the editor
      // to fetch a new protected image; no transcription or geometry is saved.
      await expect(page.locator('.osd-image-error')).toBeVisible();
      await page.getByRole('button', { name: '結果に戻る', exact: true }).click();
      await page.getByRole('button', { name: 'レイアウトを調整', exact: true }).click();
    }
    await expectImagePixels(page);
    await expect(page.locator('.osd-image-error')).toHaveCount(0);
    await expect(page.locator('.osd-line')).toHaveCount(1);
    expect(state.imageRequests()).toBeGreaterThanOrEqual(2);
    expect(state.errors).toEqual([]);
  });
}
