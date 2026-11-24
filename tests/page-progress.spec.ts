import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// Actual built admin UI with isolated data: no login, research records or inference.
const origin = 'https://kobun.test', assets = '/modules/KobunOcrTranslation/asset/';
const image = fs.readFileSync('tests/fixtures/viewer.jpg');
const source = (media: number, item = 10) => ({ media_id: media, item_id: item, position: media,
  item_title: `表示試験${item}`, item_identifier: `fixture_${item}`, title: `画像${media}`,
  service_id: `https://images.test/${media}`, image_url: `https://images.test/${media}/image.jpg`,
  native_width: 600, native_height: 900, canvas_id: null });
const line = (raw?: string) => ({ id: 'line1', x: 100, y: 100, width: 40, height: 650, readingOrder: 1,
  classId: 1, confidence: .9, direction: 'vertical', ...(raw !== undefined ? { raw } : {}) });
const document = (media: number, extra = {}, item = 10) => ({ id: String(media).padStart(24, '0'), source: source(media, item),
  width: 600, height: 900, image_sha256: 'fixture', revision: 1, history_count: 1, status: 'image',
  lines: [], regions: [], translation: null, publication_state: 'draft', workflow: 'editorial', ...extra });

async function fixture(page: Page) {
  page.setDefaultTimeout(10000);
  const docs: any[] = [document(2), document(3, { status: 'image_saved' }),
    document(4, { status: 'layout', lines: [line()] }),
    document(5, { status: 'recognize', lines: [line('本文')], transcription_metadata: { title: '研究成果名' } }),
    document(6, { lines: [line('本文')], translation_draft: { text: '翻訳用本文', line_ids: ['line1'] } }),
    document(7, { lines: [line('本文')], translation: { text: '現代語訳', input: '本文', line_ids: ['line1'] } }),
    document(8, { lines: [line('本文')], transcription_credit: '確認班' }),
    document(9, { lines: [line('本文')], publication_state: 'reviewed' }),
    document(10, { lines: [line('本文')], publication_state: 'published' }),
    document(11, { job: { id: 'queued', operation: 'layout', status: 'queued' } }),
    document(12, { status: 'layout', job: { id: 'empty', operation: 'layout', status: 'completed' } }),
    document(13, { status: 'error', job: { id: 'failed', operation: 'layout', status: 'error' } }),
    document(14, { status: 'edited' }), document(15, { provenance: { layout: {} } }),
    document(16, { transcription_metadata: { title: '保存済みの研究成果情報' } }),
    document(201, {}, 20), document(202, {}, 20)];
  let lists = 0;
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => route.abort());
  await page.route(`${origin}/**`, route => {
    const request = route.request(), url = new URL(request.url());
    if (url.pathname.startsWith(assets)) {
      const file = path.resolve('asset', url.pathname.slice(assets.length));
      if (!file.startsWith(path.resolve('asset') + path.sep)) return route.abort();
      return route.fulfill({ body: fs.readFileSync(file), contentType: file.endsWith('.css') ? 'text/css' : 'text/javascript' });
    }
    if (url.pathname === '/') return route.fulfill({ contentType: 'text/html', body: `<!doctype html><meta charset="utf-8">
      <link rel="stylesheet" href="${assets}dist/workspace.css">
      <div id="kobun-workspace" data-proxy="/proxy" data-pages="/pages" data-csrf="fixture" data-can-manage="1" data-can-edit-transcription="1"></div>
      <script type="module" src="${assets}dist/workspace.js"></script>` });
    if (url.pathname === '/pages') {
      const item = Number(url.searchParams.get('item_id') || url.searchParams.get('identifier')?.split('_').at(-1) || 10);
      const pages = item === 10 ? Array.from({ length: 16 }, (_, i) => source(i + 1))
        : item === 20 ? [source(201, 20), source(202, 20)] : [source(301, 30)];
      return route.fulfill({ json: { title: `表示試験${item}`, identifier: `fixture_${item}`, item_id: item, total: pages.length, pages } });
    }
    if (url.pathname === '/proxy') {
      const endpoint = url.searchParams.get('endpoint')!;
      if (endpoint === 'health') return route.fulfill({ json: { ocr_ready: true, llm_ready: false } });
      if (endpoint.endsWith('/image')) return route.fulfill({ contentType: 'image/jpeg', body: image });
      if (endpoint === 'documents') {
        if (request.method() === 'GET') { lists++; return route.fulfill({ json: docs }); }
        const media = request.postDataJSON().media_id;
        const saved = document(media, {}, media === 301 ? 30 : 10); docs.push(saved);
        return route.fulfill({ json: saved });
      }
      const saved = docs.find(doc => doc.id === endpoint.split('/')[1]);
      if (!saved) return route.abort();
      if (endpoint.endsWith('/jobs')) {
        saved.job = { id: 'new-detection', operation: 'layout', status: 'queued' };
      } else if (saved.job?.id === 'new-detection' && saved.job.status === 'queued') {
        // A successful detector may return zero lines. That must still be started work.
        saved.job.status = 'completed'; saved.status = 'layout'; saved.revision++;
      }
      return route.fulfill({ json: saved });
    }
    return route.abort();
  });
  await page.goto(`${origin}/?identifier=fixture_10`);
  await expect(page.locator('.kobun-pages > button')).toHaveCount(16);
  return { errors, lists: () => lists };
}

test('saved states distinguish image loading, empty or failed detection, editing and publication', async ({ page }, testInfo) => {
  const state = await fixture(page);
  const rows = page.locator('.kobun-pages > button');
  const expected = ['未着手', '画像読込のみ', '画像読込のみ', 'レイアウト調整', '翻刻確認', '現代語訳', '現代語訳',
    '確認・公開', '確認済み', '公開中', 'レイアウト調整', 'レイアウト調整', 'レイアウト調整', 'レイアウト調整', 'レイアウト調整', 'レイアウト調整'];
  for (let i = 0; i < expected.length; i++) await expect(rows.nth(i).locator('small').first()).toHaveText(expected[i]);
  await expect(rows.nth(10)).toContainText('レイアウト認識待ち');
  await expect(rows.nth(12)).toContainText('レイアウト認識に失敗');
  await expect(page.locator('#kobun-material option[value="10"]')).toContainText('13ページ着手済み・画像読込のみ 2ページ');
  await page.setViewportSize({ width: 1024, height: 1000 });
  expect(await page.locator('.kobun-pages').evaluate(el => el.scrollWidth > el.clientWidth)).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('image-only-progress.png'), fullPage: true });
  expect(state.errors).toEqual([]);
});

test('opening an image only changes the loaded count; detection and reload keep the correct counts', async ({ page }) => {
  const state = await fixture(page);
  const first = page.locator('.kobun-pages > button').first();
  const material = page.locator('#kobun-material option[value="10"]');
  await first.click();
  await expect(first).toContainText('画像読込のみ');
  await expect(material).toContainText('13ページ着手済み・画像読込のみ 3ページ');
  expect(state.lists()).toBe(1);
  await page.reload();
  await expect(material).toContainText('13ページ着手済み・画像読込のみ 3ページ');
  await first.click();
  await page.getByRole('button', { name: 'レイアウトを認識', exact: true }).click();
  await expect(first).toContainText('レイアウト認識待ち');
  await expect(material).toContainText('14ページ着手済み・画像読込のみ 2ページ');
  await expect(first.locator('small')).toHaveCount(1); // Completed, no longer queued.
  await expect(first).toContainText('レイアウト調整');
  await page.reload();
  await expect(first).toContainText('レイアウト調整');
  await expect(material).toContainText('14ページ着手済み・画像読込のみ 2ページ');
  expect(state.errors).toEqual([]);
});

test('materials with only loaded images stay selectable and untouched materials stay unstarted', async ({ page }) => {
  const state = await fixture(page);
  const material = page.locator('#kobun-material');
  await expect(material.locator('option[value="20"]')).toContainText('（画像読込のみ 2ページ）');
  await material.selectOption('20');
  await expect(page.locator('.kobun-pages > button')).toHaveCount(2);
  await page.locator('.kobun-pages > button').first().click();
  await expect(material.locator('option[value="20"]')).toContainText('（画像読込のみ 2ページ）');
  await page.getByRole('button', { name: /1.*資料・ページ/ }).click();
  await page.getByLabel('別の資料を指定').fill('fixture_30');
  await page.getByRole('button', { name: '資料を開く', exact: true }).click();
  await expect(material.locator('option[value="30"]')).toContainText('（未着手）');
  await expect(page.locator('.kobun-pages > button').first()).toContainText('未着手');
  await page.locator('.kobun-pages > button').first().click();
  await expect(material.locator('option[value="30"]')).toContainText('（画像読込のみ 1ページ）');
  expect(state.errors).toEqual([]);
});
