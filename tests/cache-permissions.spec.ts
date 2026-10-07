// Local integration: synthetic fixtures only; existing archive work is untouched.
import { test, expect, type BrowserContext } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const runtime = path.resolve('../../var/kobun-ocr-translation');
const dataRoot = path.join(runtime, 'data'), cacheRoot = path.join(dataRoot, 'temporary');
const itemId = 4570911, reading = '/s/pub_ja/kobun-reading/';
const sourceText = '春はあけぼの。やうやう白くなりゆく山ぎは。';
let assist: any, editorial: any;
const folders: string[] = [];
const cookie = (role: string) => JSON.parse(fs.readFileSync(path.join(runtime,
  `test-cookie${role === 'global_admin' ? '' : '-' + role}.json`), 'utf8'));
const docFile = (doc: any) => path.join(doc.workflow === 'editorial' ? dataRoot : cacheRoot, doc.id, 'document.json');
const readDoc = (doc: any) => JSON.parse(fs.readFileSync(docFile(doc), 'utf8'));
async function view(context: BrowserContext) {
  const response = await context.request.get(`/s/pub_ja/item/${itemId}`);
  expect(response.status()).toBe(200);
  const html = await response.text();
  return { html, headers: { 'X-Kobun-CSRF': html.match(/data-csrf="([^"]+)"/)![1],
    'X-Kobun-Reading': html.match(/data-reading="([^"]+)"/)![1] } };
}
test.describe.configure({ mode: 'serial' });
test.beforeAll(() => {
  const existing = fs.readdirSync(dataRoot).map(id => path.join(dataRoot, id, 'document.json'))
    .filter(file => fs.existsSync(file)).map(file => JSON.parse(fs.readFileSync(file, 'utf8')))
    .find(doc => doc.source?.item_id === itemId);
  if (!existing) throw new Error('Local public-page fixture source is missing');
  const fingerprints = JSON.parse(execFileSync(path.join(runtime, 'venv/bin/python'), ['-c',
    'import json,sys;from pathlib import Path;from cache_policy import Fingerprints;from translation_policy import worker_config;f=Fingerprints(worker_config(json.loads((Path(sys.argv[1])/"config.json").read_text())));print(json.dumps({"ocr":f.ocr(),"translation":f.translation()}))', runtime],
    { cwd: path.resolve('worker'), encoding: 'utf8' }));
  for (const workflow of ['assist', 'editorial']) {
    const id = crypto.randomBytes(12).toString('hex'), folder = path.join(workflow === 'assist' ? cacheRoot : dataRoot, id);
    fs.mkdirSync(folder); folders.push(folder);
    fs.copyFileSync(path.join(dataRoot, existing.id, 'image.jpg'), path.join(folder, 'image.jpg'));
    const doc = { id, workflow, source: { ...existing.source, workflow, cache_scope: 'shared' },
      width: existing.width, height: existing.height, image_sha256: existing.image_sha256,
      revision: 1, history_count: 1, created_at: Date.now() / 1000, ocr_generated_at: Date.now() / 1000,
      retention_version: 1, ocr_fingerprint: fingerprints.ocr, translation_fingerprint: fingerprints.translation,
      publication_state: workflow === 'editorial' ? 'published' : 'draft', status: 'recognize', reading_direction: 'auto',
      lines: [{ id: 'fixture', x: 10, y: 10, width: 15, height: 80, readingOrder: 1, raw: sourceText }], regions: [],
      translation: null, provenance: {}, last_metrics: {} };
    fs.writeFileSync(path.join(folder, 'document.json'), JSON.stringify(doc));
    fs.mkdirSync(path.join(folder, 'history'));
    fs.writeFileSync(path.join(folder, 'history/000001.json'), JSON.stringify(workflow === 'editorial'
      ? { event: 'fixture', document: doc } : { event: 'fixture', document_id: id }));
    if (workflow === 'assist') assist = doc; else editorial = doc;
  }
});
test.afterAll(() => {
  folders.forEach(folder => fs.rmSync(folder, { recursive: true, force: true }));
  execFileSync(path.join(runtime, 'venv/bin/python'), ['-c',
    'import sqlite3,sys;db=sqlite3.connect(sys.argv[1]);db.executemany("DELETE FROM documents WHERE id=?",[(v,) for v in sys.argv[2:]]);db.commit();db.close()',
    path.join(dataRoot, 'cache-index.sqlite3'), ...folders.map(folder => path.basename(folder))]);
});

test('real roles, CSRF, item binding and editorial protection guard cache operations', async ({ browser }) => {
  for (const role of ['anonymous', 'site_admin', 'researcher', 'global_admin']) {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    if (role !== 'anonymous') await context.addCookies(cookie(role));
    try {
      const { html, headers } = await view(context);
      expect(html.includes('data-cache=')).toBe(role === 'global_admin');
      const status = await context.request.get(reading + `status?id=${assist.id}`, { headers });
      expect(status.status(), await status.text()).toBe(200);
      const data = await status.json();
      expect(data.can_manage_cache).toBe(role === 'global_admin');
      expect(data.can_manage_translation_cache).toBe(false);
      expect(data.translation_scope).toBe('private');
      expect(data.ocr_expires_at).toBeCloseTo(assist.ocr_generated_at + 86400, 0);
      const body = { id: assist.id, target: 'transcription', action: 'delete', base_revision: 1 };
      const post = (data: any, token = headers['X-Kobun-CSRF']) => context.request.post(reading + 'cache',
        { headers: { ...headers, 'X-Kobun-CSRF': token }, data });
      if (role !== 'global_admin') {
        expect((await post(body)).status()).toBe(403);
        expect((await post({ ...body, actor: {} })).status()).toBe(403);
      } else {
        expect((await post(body, 'invalid-token')).status()).toBe(403);
        expect((await post({ ...body, actor: {} })).status()).toBe(400);
        expect((await post({ ...body, target: 'translation' })).status()).toBe(403);
        expect((await post({ ...body, id: editorial.id })).status()).toBe(409);
        fs.writeFileSync(docFile(assist), JSON.stringify({ ...assist, source: { ...assist.source, item_id: 0 } }));
        try { expect((await post(body)).status()).toBe(404); }
        finally { fs.writeFileSync(docFile(assist), JSON.stringify(assist)); }
      }
      expect((await context.request.post(reading + 'run', { headers,
        data: { id: assist.id, operation: 'recognize' } })).status()).toBe(409);
      expect(readDoc(assist)).toEqual(assist);
      const usage = await context.request.get('/admin/kobun-ocr/cache');
      if (role === 'global_admin') {
        expect(usage.status(), await usage.text()).toBe(200);
        expect((await usage.json()).policy).toMatchObject({ translation_mode: 'private', max_documents: 1000 });
      } else if (role !== 'anonymous') expect(usage.status()).toBe(403);
    } finally { await context.close(); }
  }
});

test('real local translation is private to its browser and view, preserves parents and is physically erased', async ({ browser }) => {
  const owner = await browser.newContext({ ignoreHTTPSErrors: true }), other = await browser.newContext({ ignoreHTTPSErrors: true });
  const children: string[] = [];
  try {
    const { headers } = await view(owner), otherView = await view(other);
    for (const parent of [assist, editorial]) {
      const before = readDoc(parent);
      const queued = await owner.request.post(reading + 'run', { headers, data: { id: parent.id, operation: 'translate' } });
      expect(queued.status(), await queued.text()).toBe(202);
      let current = await queued.json();
      const child = current.translation_request_id;
      expect(child).toMatch(/^[a-f0-9]{24}$/); children.push(child);
      const url = reading + `status?id=${parent.id}&translation_id=${child}`;
      // A copied nonce cannot grant access to another session.
      expect((await other.request.get(url, { headers: { ...otherView.headers,
        'X-Kobun-Reading': headers['X-Kobun-Reading'] } })).status()).toBe(404);
      // A second tab uses another nonce, even in the same browser.
      expect((await owner.request.get(url, { headers: { ...headers,
        'X-Kobun-Reading': crypto.randomBytes(32).toString('hex') } })).status()).toBe(404);
      const shared = await other.request.get(reading + `status?id=${parent.id}`, { headers: otherView.headers });
      expect((await shared.json()).translation).toBeNull();
      await expect.poll(async () => {
        const result = await owner.request.get(url, { headers });
        expect(result.status(), await result.text()).toBe(200);
        current = await result.json(); return current.job?.status;
      }, { intervals: [500, 1000], timeout: 120000 }).toMatch(/completed|error/);
      expect(current.job.status, current.job.error).toBe('completed');
      expect(current.translation_scope).toBe('private');
      expect(current.translation.text.length).toBeGreaterThan(0);
      expect(current.translation.model).toContain('35B');
      expect(current.translation_expires_at).toBeGreaterThan(Date.now() / 1000);
      expect(readDoc(parent)).toEqual(before);
      expect((await other.request.post(reading + 'forget', { headers: otherView.headers, data: { target: 'all' } })).status()).toBe(200);
      expect(fs.existsSync(path.join(cacheRoot, child))).toBe(true);
      const forgotten = await owner.request.post(reading + 'forget', { headers, data: { target: 'translation' } });
      expect(forgotten.status(), await forgotten.text()).toBe(200);
      expect(fs.existsSync(path.join(cacheRoot, child))).toBe(false);
      expect(readDoc(parent)).toEqual(before);
    }
  } finally {
    await expect.poll(() => children.some(id => {
      const file = path.join(cacheRoot, id, 'document.json');
      return fs.existsSync(file) && ['queued', 'running'].includes(JSON.parse(fs.readFileSync(file, 'utf8')).job?.status);
    }), { timeout: 120000 }).toBe(false);
    children.forEach(id => fs.rmSync(path.join(cacheRoot, id), { recursive: true, force: true }));
    await owner.close(); await other.close();
  }
});

test('global administrator regenerates shared OCR and sees cache limits and usage in the settings', async ({ browser }) => {
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  await context.addCookies(cookie('global_admin'));
  try {
    const { headers } = await view(context);
    let current = readDoc(assist);
    const result = await context.request.post(reading + 'cache', { headers,
      data: { id: assist.id, target: 'transcription', action: 'regenerate', base_revision: current.revision } });
    expect(result.status(), await result.text()).toBe(202);
    await expect.poll(async () => {
      const status = await context.request.get(reading + `status?id=${assist.id}`, { headers });
      expect(status.status()).toBe(200); current = await status.json(); return current.job?.status;
    }, { intervals: [500, 1000], timeout: 120000 }).toMatch(/completed|error/);
    expect(current.job.status, current.job.error).toBe('completed');
    expect(current.lines.length).toBeGreaterThan(0);
    expect(current.transcription).not.toBe(sourceText); expect(current.translation).toBeNull();
    const history = fs.readdirSync(path.join(cacheRoot, assist.id, 'history')).map(name => JSON.parse(fs.readFileSync(path.join(cacheRoot, assist.id, 'history', name), 'utf8')));
    expect(history.some(row => row.event === 'cache_transcription_regenerated' && row.actor.role === 'global_admin')).toBe(true);
    expect(history.every(row => !row.document)).toBe(true);
    expect(readDoc(editorial)).toEqual(editorial);
    const page = await context.newPage();
    await page.goto('/admin/module/configure?id=KobunOcrTranslation');
    await expect(page.locator('#kobun-reading-cache-policy')).toBeVisible();
    await expect(page.locator('#kobun-cache-ocr_mode')).toHaveValue('shared');
    await expect(page.locator('#kobun-cache-translation_mode')).toHaveValue('private');
    await expect(page.locator('#kobun-cache-private_ttl_minutes')).toHaveValue('60');
    await expect(page.locator('.kobun-cache-status')).toContainText('使用中:');
  } finally {
    await expect.poll(() => ['queued', 'running'].includes(readDoc(assist).job?.status), { timeout: 120000 }).toBe(false);
    await context.close();
  }
});
