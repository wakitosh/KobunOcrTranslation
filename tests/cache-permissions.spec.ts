// Local integration: temporary documents only; existing archive work is untouched.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const runtime = path.resolve('../../var/kobun-ocr-translation');
const dataRoot = path.join(runtime, 'data');
const itemId = 4570911;
const endpoint = '/s/pub_ja/kobun-reading/cache';
const sourceText = '春はあけぼの。やうやう白くなりゆく山ぎは。';
let assist: any, editorial: any;
const temporary: string[] = [];
const cookie = (role: string) => JSON.parse(fs.readFileSync(path.join(runtime,
  `test-cookie${role === 'global_admin' ? '' : '-' + role}.json`), 'utf8'));

test.describe.configure({ mode: 'serial' });
test.beforeAll(() => {
  const existing = fs.readdirSync(dataRoot).map(id => path.join(dataRoot, id, 'document.json'))
    .filter(file => fs.existsSync(file)).map(file => JSON.parse(fs.readFileSync(file, 'utf8')))
    .find(doc => doc.source?.item_id === itemId);
  if (!existing) throw new Error('Local public-page fixture source is missing');
  for (const workflow of ['assist', 'editorial']) {
    const id = crypto.randomBytes(12).toString('hex'), folder = path.join(dataRoot, id);
    fs.mkdirSync(folder); temporary.push(folder);
    fs.copyFileSync(path.join(dataRoot, existing.id, 'image.jpg'), path.join(folder, 'image.jpg'));
    const doc = { id, workflow, source: { ...existing.source, workflow }, width: existing.width, height: existing.height,
      image_sha256: existing.image_sha256, revision: 1, history_count: 1, created_at: Date.now() / 1000,
      publication_state: workflow === 'editorial' ? 'published' : 'draft', status: 'translate', reading_direction: 'auto',
      lines: [{ id: 'fixture', x: 10, y: 10, width: 15, height: 80, readingOrder: 1, raw: sourceText }], regions: [],
      translation: { text: 'テスト用の旧訳', model: 'fixture' }, provenance: {}, last_metrics: {} };
    fs.writeFileSync(path.join(folder, 'document.json'), JSON.stringify(doc));
    fs.mkdirSync(path.join(folder, 'history'));
    fs.writeFileSync(path.join(folder, 'history/000001.json'), JSON.stringify({ event: 'fixture', document: doc }));
    if (workflow === 'assist') assist = doc; else editorial = doc;
  }
});
test.afterAll(() => { temporary.forEach(folder => fs.rmSync(folder, { recursive: true, force: true })); });

test('real Omeka roles, CSRF, item binding and editorial protection guard the cache endpoint', async ({ browser }) => {
  for (const role of ['anonymous', 'site_admin', 'researcher', 'global_admin']) {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    if (role !== 'anonymous') await context.addCookies(cookie(role));
    try {
      const rendered = await context.request.get(`/s/pub_ja/item/${itemId}`);
      expect(rendered.status()).toBe(200);
      const html = await rendered.text();
      const csrf = html.match(/data-csrf="([^"]+)"/)![1];
      expect(html.includes('data-cache=')).toBe(role === 'global_admin');
      const status = await context.request.get(`/s/pub_ja/kobun-reading/status?id=${assist.id}`);
      expect(status.status()).toBe(200);
      expect((await status.json()).can_manage_cache).toBe(role === 'global_admin');
      const body = { id: assist.id, target: 'translation', action: 'delete', base_revision: 1 };
      const post = (data: any, token = csrf) => context.request.post(endpoint, { headers: { 'X-Kobun-CSRF': token }, data });
      if (role !== 'global_admin') {
        expect((await post(body)).status()).toBe(403);
        expect((await post({ ...body, actor: { id: 1, name: 'forged', role: 'global_admin' } })).status()).toBe(403);
      } else {
        expect((await post(body, 'invalid-token')).status()).toBe(403);
        expect((await post({ ...body, actor: { id: 1, name: 'forged', role: 'global_admin' } })).status()).toBe(400);
        expect((await post({ ...body, id: editorial.id })).status()).toBe(409);
        const invalid = { ...assist, source: { ...assist.source, item_id: 0 } };
        const file = path.join(dataRoot, assist.id, 'document.json');
        fs.writeFileSync(file, JSON.stringify(invalid));
        try { expect((await post(body)).status()).toBe(404); }
        finally { fs.writeFileSync(file, JSON.stringify(assist)); }
      }
      // Ordinary run must not provide a back door to re-recognize cached text.
      const recognize = await context.request.post('/s/pub_ja/kobun-reading/run', {
        headers: { 'X-Kobun-CSRF': csrf }, data: { id: assist.id, operation: 'recognize' },
      });
      expect(recognize.status()).toBe(409);
      expect(JSON.parse(fs.readFileSync(path.join(dataRoot, assist.id, 'document.json'), 'utf8'))).toEqual(assist);
    } finally { await context.close(); }
  }
});

test('administrator manages a temporary shared cache through PHP and the running OCR/LLM worker', async ({ browser }) => {
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  await context.addCookies(cookie('global_admin'));
  try {
    const page = await context.newPage();
    await page.goto(`/s/pub_ja/item/${itemId}`);
    await page.waitForLoadState('networkidle');
    const csrf = (await page.locator('.kobun-reading').getAttribute('data-csrf'))!;
    let current = assist;
    const change = async (target: string, action: string) => {
      const result = await context.request.post(endpoint, { headers: { 'X-Kobun-CSRF': csrf },
        data: { id: current.id, target, action, base_revision: current.revision } });
      expect(result.status(), await result.text()).toBe(action === 'regenerate' ? 202 : 200);
      current = await result.json();
    };
    const finished = async () => {
      await expect.poll(async () => {
        const result = await context.request.get(`/s/pub_ja/kobun-reading/status?id=${current.id}`);
        expect(result.status()).toBe(200);
        current = await result.json();
        return current.job?.status;
      }, { intervals: [500, 1000], timeout: 120000 }).toMatch(/completed|error/);
      expect(current.job.status, current.job.error).toBe('completed');
    };
    await change('translation', 'delete');
    expect(current.translation).toBeNull();
    expect(current.transcription).toBe(sourceText);
    await change('translation', 'regenerate');
    await finished();
    expect(current.translation.text.length).toBeGreaterThan(0);
    expect(current.translation.model).not.toBe('fixture');
    await change('transcription', 'regenerate');
    await finished();
    expect(current.lines.length).toBeGreaterThan(0);
    expect(current.transcription).not.toBe(sourceText);
    expect(current.translation).toBeNull();
    await change('transcription', 'delete');
    expect(current.lines).toEqual([]);
    expect(current.translation).toBeNull();
    const history = fs.readdirSync(path.join(dataRoot, assist.id, 'history')).sort().map(name =>
      JSON.parse(fs.readFileSync(path.join(dataRoot, assist.id, 'history', name), 'utf8')));
    expect(history.slice(1).every(record => record.actor.role === 'global_admin')).toBe(true);
    expect(history.some(record => record.event === 'cache_transcription_regenerated')).toBe(true);
    expect(history.some(record => record.event === 'cache_translation_regenerated')).toBe(true);
    expect(JSON.parse(fs.readFileSync(path.join(dataRoot, editorial.id, 'document.json'), 'utf8'))).toEqual(editorial);
  } finally {
    // Wait before cleanup if an assertion failed during a queued inference.
    await expect.poll(() => {
      const doc = JSON.parse(fs.readFileSync(path.join(dataRoot, assist.id, 'document.json'), 'utf8'));
      return ['queued', 'running'].includes(doc.job?.status);
    }, { timeout: 120000 }).toBe(false);
    await context.close();
  }
});
