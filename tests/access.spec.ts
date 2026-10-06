import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test.beforeEach(async ({ context }) => {
  await context.addCookies(JSON.parse(fs.readFileSync('../../var/kobun-ocr-translation/test-cookie.json', 'utf8')));
});

test('live proxy: login, CSRF, private files, identifier and Clean Url', async ({ page, context, browser }) => {
  const anonymous = await browser.newContext({ ignoreHTTPSErrors: true });
  try {
    const response = await anonymous.request.get('https://omeka-s.ddev.site/admin/kobun-ocr/proxy?endpoint=documents');
    expect(new URL(response.url()).pathname).toBe('/login');
  } finally { await anonymous.close(); }
  await page.goto('/admin/kobun-ocr');
  const mutation = await context.request.post('/admin/kobun-ocr/proxy?endpoint=documents', { data: { media_id: 5425799 } });
  expect(mutation.status()).toBe(403);
  expect((await context.request.get('/admin/kobun-ocr/proxy?endpoint=../config')).status()).toBe(400);
  expect([403, 404]).toContain((await context.request.get('/var/kobun-ocr-translation/backend-token')).status());
  for (const identifier of ['rb_10076700084', 'https://dc.tulips.tsukuba.ac.jp/s/pub_ja/document/rb_10076700084']) {
    const response = await context.request.get('/admin/kobun-ocr/pages', { params: { identifier } });
    const data = await response.json();
    expect(data.error, JSON.stringify(data)).toBeUndefined();
    expect(data.item_id).toBe(4570911);
    expect(data.identifier).toBe('rb_10076700084');
    expect(data.pages[2].media_id).toBe(4570914);
  }
  for (const identifier of ['4570911', 'not-an-identifier', 'https://example.org/document/rb_10076700084']) {
    expect((await context.request.get('/admin/kobun-ocr/pages', { params: { identifier } })).status()).toBe(400);
  }
  await page.setViewportSize({ width: 950, height: 900 });
  await expect(page.locator('.kobun-heading')).toBeVisible();
  expect((await page.locator('.kobun-heading').boundingBox())!.height).toBeLessThan(180);
  const app = await page.locator('.kobun-app').boundingBox();
  expect(app!.x + app!.width).toBeLessThanOrEqual(950);
  await page.goto('/admin/module/configure?id=KobunOcrTranslation');
  await expect(page.getByRole('group', { name: '翻刻を修正できる役割と資料範囲' })).toBeVisible();
  await expect(page.getByRole('option', { name: '自分が所有する資料のみ' }).first()).toBeAttached();
});

test('owned-material scope filters lists and blocks direct page access', async ({ page, context, browser }) => {
  const docsResponse = await context.request.get('/admin/kobun-ocr/proxy', { params: { endpoint: 'documents' } });
  const docs = await docsResponse.json();
  const candidate = docs.find((doc: { source: { item_id: number } }) => doc.source.item_id === 4570911);
  expect(candidate, 'The fixed administrator-owned test item is required').toBeTruthy();

  await page.goto('/admin/module/configure?id=KobunOcrTranslation');
  await page.locator('#kobun-ocr-scope-researcher').selectOption('owned');
  await page.getByRole('button', { name: /送信|Submit/ }).click();
  const researcher = await browser.newContext({ ignoreHTTPSErrors: true });
  await researcher.addCookies(JSON.parse(fs.readFileSync('../../var/kobun-ocr-translation/test-cookie-researcher.json', 'utf8')));
  try {
    const filtered = await researcher.request.get('/admin/kobun-ocr/proxy', { params: { endpoint: 'documents' } });
    expect(filtered.status()).toBe(200);
    expect((await filtered.json()).some((doc: { source: { item_id: number } }) =>
      doc.source.item_id === candidate!.source.item_id)).toBe(false);
    const direct = await researcher.request.get('/admin/kobun-ocr/pages', {
      params: { item_id: candidate!.source.item_id },
    });
    expect(direct.status()).toBe(403);
    expect((await direct.json()).error).toContain('許可範囲外');
  } finally {
    await researcher.close();
    await page.goto('/admin/module/configure?id=KobunOcrTranslation');
    await page.locator('#kobun-ocr-scope-researcher').selectOption('all');
    await page.getByRole('button', { name: /送信|Submit/ }).click();
  }
});

test('configured transcription role can edit text but cannot manage workflow', async ({ browser }) => {
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  await context.addCookies(JSON.parse(fs.readFileSync('../../var/kobun-ocr-translation/test-cookie-researcher.json', 'utf8')));
  try {
    const page = await context.newPage();
    await page.goto('https://omeka-s.ddev.site/admin/kobun-ocr');
    const workspace = page.locator('#kobun-workspace');
    await expect(workspace).toHaveAttribute('data-can-manage', '0');
    await expect(workspace).toHaveAttribute('data-can-edit-transcription', '1');
    await expect(workspace).toHaveAttribute('data-transcription-scope', 'all');
    const csrf = (await workspace.getAttribute('data-csrf'))!;
    const proxy = '/admin/kobun-ocr/proxy';
    const documentsResponse = await context.request.get(proxy, { params: { endpoint: 'documents' } });
    expect(documentsResponse.status()).toBe(200);
    const documents = await documentsResponse.json();
    expect(documents.length).toBeGreaterThan(0);
    const doc = documents[0];
    const headers = { 'X-Kobun-CSRF': csrf };
    const textOnly = doc.lines.map((line: { id: string; raw?: string }) => ({ id: line.id, raw: line.raw || '' }));
    const stale = await context.request.put(proxy, { params: { endpoint: `documents/${doc.id}/transcription` },
      headers, data: { base_revision: doc.revision - 1, lines: textOnly } });
    expect(stale.status()).toBe(409);
    const forbiddenLayout = await context.request.put(proxy, { params: { endpoint: `documents/${doc.id}/layout` },
      headers, data: { base_revision: doc.revision, lines: doc.lines } });
    expect(forbiddenLayout.status()).toBe(403);
    const forbiddenJob = await context.request.post(proxy, { params: { endpoint: `documents/${doc.id}/jobs` },
      headers, data: { base_revision: doc.revision, operation: 'recognize' } });
    expect(forbiddenJob.status()).toBe(403);
  } finally {
    await context.close();
  }
});
