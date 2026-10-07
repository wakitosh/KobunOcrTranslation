import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const origin = 'https://kobun.test';
const assetPath = '/modules/KobunOcrTranslation/asset/';
const storageKey = 'kobun-translation-llm-v1';
const fakeKey = 'fake-test-key-never-a-real-credential';
const passphrase = 'fixture-long-passphrase';
const source = '春はあけぼの。やうやう白くなりゆく山ぎは。';
const translated = '春は夜明けのころがよい。だんだん白くなっていく山の端がよい。';
const id = '1234567890abcdef12345678';
const publicData = () => ({ id, quality: 'published', label: '図書館確認済み', status: 'published', revision: 4,
  job: null, lines: [{ order: 1, text: source, direction: 'vertical' }], transcription: source,
  writing_direction: 'vertical', reading_direction: 'rtl', translation: null, translation_available: true,
  transcription_credit: '非送信の翻刻責任者', transcription_metadata: { contributors: '非送信の氏名' } });
const response = (provider: string, text = translated) => provider === 'openai'
  ? { status: 'completed', model: 'fixture-text-1', output: [{ type: 'message', content: [{ type: 'output_text', text }] }] }
  : provider === 'anthropic' ? { stop_reason: 'end_turn', model: 'fixture-text-1', content: [{ type: 'thinking', thinking: '非表示の推論' }, { type: 'text', text }] }
    : { modelVersion: 'fixture-text-1', candidates: [{ finishReason: 'STOP', content: { parts: [{ thought: true, text: '非表示の推論' }, { text }] } }] };

async function serveAssets(page: Page, html: string) {
  // Block every unmocked request. These tests cannot call a real paid API.
  await page.route('**/*', route => route.abort());
  await page.route(`${origin}/**`, route => {
    const pathname = new URL(route.request().url()).pathname;
    if (pathname.startsWith(assetPath)) {
      const filename = path.resolve('asset', pathname.slice(assetPath.length));
      if (!filename.startsWith(path.resolve('asset') + path.sep)) return route.abort();
      return route.fulfill({ body: fs.readFileSync(filename), contentType: filename.endsWith('.css') ? 'text/css' : 'text/javascript' });
    }
    if (pathname === '/' || pathname === '/admin') return route.fulfill({ body: html, contentType: 'text/html' });
    return route.abort();
  });
}
async function publicFixture(page: Page, enabled = true, policy?: Record<string, unknown>, data: Record<string, unknown> = publicData()) {
  const args = ['tests/reading-fixture.php', enabled ? 'enabled' : 'disabled'];
  if (policy) args.push(JSON.stringify(policy));
  await serveAssets(page, execFileSync('php', args, { encoding: 'utf8' }));
  await page.route(`${origin}/reading/start`, route => route.fulfill({ json: data }));
  await page.goto(origin);
  await page.getByRole('button', { name: 'このページを翻刻する' }).click();
  if (enabled) await page.getByRole('tab', { name: '現代語訳', exact: true }).click();
}
async function configure(page: Page, provider = 'openai', mode = 'memory') {
  const settings = page.locator('.kobun-llm');
  await settings.locator('summary').click();
  await settings.getByLabel('使用するLLM').selectOption(provider);
  await settings.getByLabel('モデルID', { exact: true }).fill('fixture-text');
  await settings.getByLabel(/^APIキー/).fill(fakeKey);
  await settings.locator(`input[type=radio][value=${mode}]`).check();
  if (mode === 'encrypted') await settings.getByLabel('暗号化用パスフレーズ', { exact: true }).fill(passphrase);
  await settings.getByRole('button', { name: '設定・キーを登録', exact: true }).click();
  await expect(settings.locator('.kobun-llm__status')).toContainText('設定を登録');
  await expect(settings.locator('[data-field=key]')).toHaveValue('');
}
const client = (page: Page, code: string) => page.evaluate(async ({ url, code }) => {
  const api = await import(url); return await new Function('api', `return (async()=>{${code}})()`)(api);
}, { url: origin + assetPath + 'dist/llm.js', code });

const policyDefaults = () => ({
  form_enabled: true, provider_choice: true, model_choice: true, storage_choice: true, key_input: true, connection_test: true,
  providers: ['local', 'openai', 'anthropic', 'google'], storage_modes: ['memory', 'plain', 'encrypted'],
  default_provider: 'local', default_storage: 'memory', models: { openai: '', anthropic: '', google: '' },
});
const policyClient = (page: Page, code: string) => client(page,
  'const policy=api.visitorLlmPolicy(JSON.parse(document.querySelector(".kobun-reading").dataset.llmPolicy));' + code);
async function savedPlain(page: Page, provider = 'openai') {
  await page.addInitScript(({ storageKey, fakeKey, provider }) => {
    localStorage.setItem(storageKey, JSON.stringify({ version: 1, provider, model: 'previous-model', storage: 'plain', key: fakeKey }));
  }, { storageKey, fakeKey, provider });
}

test('local-only visitor policy ignores a previously saved commercial key without limiting editorial settings', async ({ page }) => {
  let calls = 0;
  await savedPlain(page);
  await publicFixture(page, true, { ...policyDefaults(), providers: ['local'] });
  await page.route('https://api.openai.com/**', route => { calls++; return route.abort(); });
  await page.locator('.kobun-llm summary').click();
  expect(await page.locator('[data-field=provider] option').evaluateAll(options => options.map(o => (o as HTMLOptionElement).value))).toEqual(['local']);
  await expect(page.locator('.kobun-llm__status')).toContainText('許可範囲外');
  expect(await policyClient(page, 'return api.llmState(policy);')).toMatchObject({ provider: 'local', hasKey: false, restricted: true });
  // The public policy never mutates the independent editorial client or erases another site's settings.
  expect(await client(page, 'return api.llmState();')).toMatchObject({ provider: 'openai', hasKey: true });
  await expect(policyClient(page, 'await api.translateCommercial("本文", undefined, policy);')).rejects.toThrow('商用LLMを選択');
  await expect(policyClient(page, 'await api.saveLlm({provider:"openai",model:"x",storage:"plain"},"new-key","",policy);')).rejects.toThrow('許可されていません');
  await expect(page.locator('.kobun-reading__translate')).toBeHidden();
  expect(calls).toBe(0);
  await page.getByRole('button', { name: '保存設定・キーを消去' }).click();
  expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBeNull();
});

test('browser-storage-only commercial policy uses admin defaults and offers only the allowed options', async ({ page }) => {
  await publicFixture(page, true, { ...policyDefaults(), providers: ['openai'], storage_modes: ['plain'],
    default_provider: 'openai', default_storage: 'plain', models: { openai: 'fixture-text' } });
  await page.locator('.kobun-llm summary').click();
  await expect(page.getByLabel('使用するLLM')).toHaveValue('openai');
  await expect(page.getByLabel('モデルID', { exact: true })).toHaveValue('fixture-text');
  await expect(page.locator('input[type=radio][value=plain]')).toBeChecked();
  await expect(page.locator('input[type=radio][value=memory]')).toBeHidden();
  await expect(page.locator('input[type=radio][value=encrypted]')).toBeHidden();
  await page.getByLabel(/^APIキー/).fill(fakeKey);
  await page.getByRole('button', { name: '設定・キーを登録', exact: true }).click();
  await expect(page.locator('.kobun-llm__status')).toContainText('設定を登録');
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), storageKey)).toMatchObject({ provider: 'openai', storage: 'plain', key: fakeKey });
  await expect(policyClient(page, 'await api.saveLlm({provider:"openai",model:"fixture-text",storage:"memory"},"new-key","",policy);')).rejects.toThrow('許可されていません');
  await page.route('https://api.openai.com/v1/responses', route => route.fulfill({ json: response('openai') }));
  page.once('dialog', dialog => dialog.accept());
  await page.locator('.kobun-reading__translate').click();
  await expect(page.locator('.kobun-reading__translation')).toHaveText(translated);
});

test('a disallowed saved storage mode cannot silently supply credentials to an allowed provider', async ({ page }) => {
  await savedPlain(page);
  await publicFixture(page, true, { ...policyDefaults(), providers: ['openai'], storage_modes: ['memory'], default_provider: 'openai' });
  let calls = 0;
  await page.route('https://api.openai.com/**', route => { calls++; return route.abort(); });
  expect(await policyClient(page, 'return api.llmState(policy);')).toMatchObject({ provider: 'openai', storage: 'memory', hasKey: false, restricted: true });
  await page.locator('.kobun-reading__translate').click();
  await expect(page.locator('.kobun-reading__external-status')).toContainText('許可された保存方法');
  await expect(policyClient(page, 'await api.listLlmModels(policy);')).rejects.toThrow('APIキーを登録');
  await expect(policyClient(page, 'await api.saveLlm({provider:"openai",model:"fixture-text",storage:"memory"},"","",policy);')).rejects.toThrow('APIキーを入力');
  expect(calls).toBe(0);
});

test('individual visitor fields can be fixed while an existing allowed key still generates with the fixed model', async ({ page }) => {
  await savedPlain(page);
  const policy = { ...policyDefaults(), provider_choice: false, storage_choice: false, model_choice: false, key_input: false, connection_test: false,
    providers: ['local', 'openai'], default_provider: 'openai', default_storage: 'plain', models: { openai: 'fixed-model' } };
  await publicFixture(page, true, policy);
  await page.locator('.kobun-llm summary').click();
  for (const name of ['provider', 'model', 'key']) await expect(page.locator('[data-field=' + name + ']')).toBeDisabled();
  await expect(page.locator('input[type=radio][value=plain]')).toBeChecked();
  await expect(page.locator('input[type=radio][value=plain]')).toBeDisabled();
  await expect(page.getByRole('button', { name: '接続確認・モデル一覧を取得' })).toBeHidden();
  await expect(policyClient(page, 'await api.listLlmModels(policy);')).rejects.toThrow('許可されていません');
  await expect(policyClient(page, 'await api.saveLlm({provider:"openai",model:"fixed-model",storage:"plain"},"new-key","",policy);')).rejects.toThrow('許可されていません');
  await expect(policyClient(page, 'await api.saveLlm({provider:"openai",model:"other-model",storage:"plain"},"","",policy);')).rejects.toThrow('許可されていません');
  await page.route('https://api.openai.com/v1/responses', route => {
    expect(route.request().postDataJSON().model).toBe('fixed-model');
    return route.fulfill({ json: response('openai') });
  });
  page.once('dialog', dialog => dialog.accept());
  await page.locator('.kobun-reading__translate').click();
  await expect(page.locator('.kobun-reading__translation')).toHaveText(translated);
  await expect(page.getByRole('button', { name: '保存設定・キーを消去' })).toBeEnabled();
});

test('hiding the settings form fixes the provider and preserves cleanup without exposing visitor fields', async ({ page }) => {
  await savedPlain(page);
  await publicFixture(page, true, { ...policyDefaults(), form_enabled: false, providers: ['local'] });
  await expect(page.locator('.kobun-llm form')).toHaveCount(0);
  await expect(page.locator('.kobun-llm summary')).toHaveCount(0);
  expect(await policyClient(page, 'return api.llmState(policy);')).toMatchObject({ provider: 'local', hasKey: false });
  await page.getByRole('button', { name: '保存設定・キーを消去' }).click();
  expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBeNull();
  await expect(page.locator('.kobun-llm')).toBeHidden();
});

test('a hidden settings form can use an existing allowed commercial key with administrator fixed values', async ({ page }) => {
  await savedPlain(page);
  await publicFixture(page, true, { ...policyDefaults(), form_enabled: false, providers: ['openai'], default_provider: 'openai',
    default_storage: 'plain', models: { openai: 'fixed-model' } });
  await expect(page.locator('.kobun-llm form')).toHaveCount(0);
  await page.route('https://api.openai.com/v1/responses', route => {
    expect(route.request().postDataJSON().model).toBe('fixed-model');
    return route.fulfill({ json: response('openai') });
  });
  page.once('dialog', dialog => dialog.accept());
  await page.locator('.kobun-reading__translate').click();
  await expect(page.locator('.kobun-reading__translation')).toHaveText(translated);
});

test('encrypted credentials remain unlockable when key editing is disabled', async ({ page }) => {
  await serveAssets(page, '<!doctype html><body>Setup fixture'); await page.goto(origin);
  await client(page, 'await api.saveLlm({provider:"openai",model:"fixture-text",storage:"encrypted"},' + JSON.stringify(fakeKey) + ',' + JSON.stringify(passphrase) + ');');
  await publicFixture(page, true, { ...policyDefaults(), key_input: false, providers: ['openai'], default_provider: 'openai',
    storage_modes: ['encrypted'], default_storage: 'encrypted' });
  await page.locator('.kobun-llm summary').click();
  await expect(page.locator('[data-field=key]')).toBeDisabled();
  await page.getByLabel('暗号化用パスフレーズ', { exact: true }).fill(passphrase);
  await page.getByRole('button', { name: 'ロック解除', exact: true }).click();
  await expect(page.locator('.kobun-llm__status')).toContainText('ロックを解除');
  expect(await policyClient(page, 'return api.llmState(policy);')).toMatchObject({ hasKey: true, locked: false });
  await page.getByRole('button', { name: 'ロックする', exact: true }).click();
  expect(await policyClient(page, 'return api.llmState(policy);')).toMatchObject({ hasKey: false, locked: true });
});

for (const provider of ['openai', 'anthropic', 'google']) {
  test(`${provider}: public BYOK sends only text to its provider and keeps the result private`, async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
    let calls = 0, runs = 0;
    await publicFixture(page);
    await page.route(`${origin}/reading/run`, route => { runs++; return route.abort(); });
    const url = provider === 'openai' ? 'https://api.openai.com/v1/responses' : provider === 'anthropic'
      ? 'https://api.anthropic.com/v1/messages' : 'https://generativelanguage.googleapis.com/v1beta/models/fixture-text:generateContent';
    await page.route(url, async route => {
      calls++;
      const headers = route.request().headers(), body = route.request().postDataJSON();
      const encoded = JSON.stringify(body);
      expect(encoded).not.toContain(fakeKey); expect(encoded).not.toContain('非送信'); expect(encoded).not.toContain('images.test');
      expect(headers.referer).toBeUndefined(); expect(headers.cookie).toBeUndefined();
      if (provider === 'openai') { expect(headers.authorization).toBe(`Bearer ${fakeKey}`); expect(body.store).toBe(false); expect(body.input).toBe(source); }
      else if (provider === 'anthropic') { expect(headers['x-api-key']).toBe(fakeKey); expect(headers['anthropic-dangerous-direct-browser-access']).toBe('true'); expect(body.messages[0].content).toBe(source); }
      else { expect(headers['x-goog-api-key']).toBe(fakeKey); expect(route.request().url()).not.toContain(fakeKey); expect(body.contents[0].parts[0].text).toBe(source); }
      await route.fulfill({ json: response(provider) });
    });
    await configure(page, provider);
    expect(calls).toBe(0);
    expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBeNull();
    page.once('dialog', dialog => { expect(dialog.message()).toContain('料金'); void dialog.accept(); });
    await page.locator('.kobun-reading__translate').click();
    await expect(page.locator('.kobun-reading__translation')).toHaveText(translated);
    await expect(page.locator('.kobun-reading__model')).toContainText('fixture-text-1');
    await expect(page.locator('.kobun-reading__external-status')).toContainText('自分用の訳');
    await expect(page.locator('.kobun-reading__quality')).toContainText('現代語訳は機械生成・未確認');
    expect(calls).toBe(1); expect(runs).toBe(0);
    expect(await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage }))).not.toContain(translated);
    await page.getByRole('button', { name: '保存設定・キーを消去' }).click();
    await expect(page.locator('.kobun-reading__translation')).toBeHidden();
    expect(await client(page, 'return api.llmState();')).toMatchObject({ provider: 'local', hasKey: false });
    expect(errors).toEqual([]);
  });
}

test('encrypted localStorage requires an unlock after reload and binds the key to provider/model', async ({ page, context }) => {
  await publicFixture(page); await configure(page, 'openai', 'encrypted');
  const encrypted = await page.evaluate(key => localStorage.getItem(key)!, storageKey);
  expect(encrypted).not.toContain(fakeKey); expect(encrypted).not.toContain(passphrase);
  expect(JSON.parse(encrypted).sealed).toBeTruthy();
  await page.reload();
  expect(await client(page, 'return api.llmState();')).toMatchObject({ provider: 'openai', hasKey: false, locked: true });
  await expect(client(page, 'await api.unlockLlm("wrong-passphrase");')).rejects.toThrow('ロックを解除できません');
  expect(await client(page, 'return api.llmState();')).toMatchObject({ hasKey: false });
  await client(page, `await api.unlockLlm(${JSON.stringify(passphrase)});`);
  expect(await client(page, 'return api.llmState();')).toMatchObject({ hasKey: true, locked: false });
  await client(page, 'api.lockLlm();');
  expect(await client(page, 'return api.llmState();')).toMatchObject({ hasKey: false, locked: true });
  // Authenticated encryption refuses to release an OpenAI key after storage metadata is changed to another service.
  await page.evaluate(key => { const record = JSON.parse(localStorage.getItem(key)!); record.provider = 'anthropic'; localStorage.setItem(key, JSON.stringify(record)); }, storageKey);
  await page.reload();
  await expect(client(page, `await api.unlockLlm(${JSON.stringify(passphrase)});`)).rejects.toThrow('ロックを解除できません');
  await client(page, 'api.forgetLlm();');
  expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBeNull();
  // Explicit plain persistence is restored, and deletion in another tab invalidates this tab too.
  await client(page, `await api.saveLlm({provider:"openai",model:"fixture-text",storage:"plain"},${JSON.stringify(fakeKey)});`);
  const other = await context.newPage();
  await serveAssets(other, '<!doctype html><body>Second tab'); await other.goto(origin);
  expect(await client(other, 'return api.llmState();')).toMatchObject({ hasKey: true });
  await client(other, 'api.forgetLlm();');
  await expect.poll(() => client(page, 'return api.llmState();')).toMatchObject({ provider: 'local', hasKey: false });
});

test('connection check lists models without generation; errors and truncation are never retried', async ({ page }) => {
  await publicFixture(page); await configure(page);
  let generations = 0;
  await page.route('https://api.openai.com/v1/models', route => route.fulfill({ json: { data: [{ id: 'gpt-fixture' }, { id: 'gpt-image-fixture' }] } }));
  await page.getByRole('button', { name: '接続確認・モデル一覧を取得' }).click();
  await expect(page.locator('.kobun-llm__status')).toContainText('1件');
  expect(await page.locator('datalist option').getAttribute('value')).toBe('gpt-fixture');
  await page.route('https://api.openai.com/v1/responses', route => { generations++; return route.fulfill({ status: 429, json: { error: { message: fakeKey } } }); });
  page.once('dialog', dialog => dialog.accept()); await page.locator('.kobun-reading__translate').click();
  await expect(page.locator('.kobun-reading__external-status')).toContainText('HTTP 429');
  await expect(page.locator('.kobun-reading__external-status')).not.toContainText(fakeKey);
  expect(generations).toBe(1);
  await page.route('https://api.openai.com/v1/responses', route => { generations++; return route.fulfill({ json: { ...response('openai'), status: 'incomplete' } }); });
  page.once('dialog', dialog => dialog.accept()); await page.locator('.kobun-reading__translate').click();
  await expect(page.locator('.kobun-reading__external-status')).toContainText('完了しませんでした');
  expect(generations).toBe(2); await expect(page.locator('.kobun-reading__translation')).toBeHidden();
});

test('memory credentials expire on reload or idle, including when browser storage is disabled', async ({ page }) => {
  await serveAssets(page, '<!doctype html><body>Memory test'); await page.goto(origin);
  await page.clock.install();
  await client(page, `await api.saveLlm({provider:"openai",model:"fixture-text",storage:"memory"},${JSON.stringify(fakeKey)});`);
  await page.clock.fastForward(15 * 60 * 1000);
  expect(await client(page, 'return api.llmState();')).toMatchObject({ hasKey: false });
  await client(page, `await api.saveLlm({provider:"openai",model:"fixture-text",storage:"memory"},${JSON.stringify(fakeKey)});`);
  await page.reload();
  expect(await client(page, 'return api.llmState();')).toMatchObject({ provider: 'local', hasKey: false });
  await page.evaluate(() => { Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } }); });
  await client(page, `await api.saveLlm({provider:"google",model:"fixture-text",storage:"memory"},${JSON.stringify(fakeKey)});`);
  expect(await client(page, 'return api.llmState();')).toMatchObject({ provider: 'google', hasKey: true });
});

test('changing the Mirador canvas cancels commercial generation and discards late results', async ({ page }) => {
  await publicFixture(page); await configure(page);
  let started = false;
  await page.route('https://api.openai.com/v1/responses', async route => {
    started = true; await new Promise(resolve => setTimeout(resolve, 250));
    await route.fulfill({ json: response('openai') }).catch(() => {});
  });
  page.once('dialog', dialog => dialog.accept()); await page.locator('.kobun-reading__translate').click();
  await expect.poll(() => started).toBe(true);
  await page.evaluate(() => { (window as any).fixtureCanvas = 'c2'; (window as any).fixtureListeners.forEach((fn: () => void) => fn()); });
  await expect(page.locator('.kobun-reading__dialog')).toBeHidden();
  await expect(page.locator('.kobun-reading__state')).toHaveText('実行前');
  await page.waitForTimeout(350);
  await expect(page.locator('.kobun-reading__translation')).not.toHaveText(translated);
});

test('disabled public translation has no settings or translation tab', async ({ page }) => {
  await publicFixture(page, false);
  await expect(page.locator('.kobun-llm')).toHaveCount(0);
  await expect(page.getByRole('tab', { name: '現代語訳' })).toHaveCount(0);
});

test('the public entry passes its module version to the window and LLM dependencies', async ({ page }) => {
  const html = execFileSync('php', ['tests/reading-fixture.php', 'enabled'], { encoding: 'utf8' })
    .replace('asset/reading.js"', 'asset/reading.js?v=fixture-update"');
  await serveAssets(page, html);
  const queries: string[] = [], windowQueries: string[] = [];
  await page.route(`${origin}${assetPath}reading-window.js*`, route => {
    const url = new URL(route.request().url()); windowQueries.push(url.search);
    return route.fulfill({ contentType: 'text/javascript', body: url.search
      ? fs.readFileSync('asset/reading-window.js') : 'export const oldWindow = true;' });
  });
  await page.route(`${origin}${assetPath}dist/llm.js*`, route => {
    const url = new URL(route.request().url()); queries.push(url.search);
    // Simulate an already cached dependency with none of the new exports.
    return route.fulfill({ contentType: 'text/javascript', body: url.search
      ? fs.readFileSync('asset/dist/llm.js') : 'export const oldModule = true;' });
  });
  await page.route(`${origin}/reading/start`, route => route.fulfill({ json: publicData() }));
  await page.goto(origin);
  await page.getByRole('button', { name: 'このページを翻刻する' }).click();
  await expect(page.locator('.kobun-reading__transcription')).toHaveText(source);
  expect(queries).toEqual(['?v=fixture-update']);
  expect(windowQueries).toEqual(['?v=fixture-update']);
});

for (const enabled of [true, false]) {
  test(`a cached local translation failure does not report an OCR failure (translation ${enabled ? 'enabled' : 'disabled'})`, async ({ page }) => {
    await publicFixture(page, enabled, undefined, { ...publicData(), quality: 'machine', status: 'error',
      job: { operation: 'translate', status: 'error', error: 'urllib.error.URLError: <urlopen error [Errno 61] Connection refused>' } });
    await expect(page.locator('.kobun-reading__message')).toHaveText('機械翻刻を表示しました。');
    if (enabled) {
      await expect(page.locator('.kobun-reading__warnings')).toContainText('前回の現代語訳');
      await expect(page.locator('.kobun-reading__warnings')).not.toContainText('URLError');
      await expect(page.locator('.kobun-reading__warnings')).toContainText('しばらくしてから');
      await expect(page.locator('.kobun-reading__translation-empty-message')).toHaveText('現代語訳は保存されていません。');
      await expect(page.getByRole('button', { name: '実験的な現代語訳を作る' })).toBeEnabled();
      await page.getByRole('tab', { name: '翻刻', exact: true }).click();
      await expect(page.locator('.kobun-reading__warnings')).toBeHidden();
    } else await expect(page.locator('.kobun-reading__warnings')).toHaveCount(0);
    await expect(page.locator('.kobun-reading__transcription')).toHaveText(source);
    await expect(page.getByRole('button', { name: 'このページを翻刻する' })).toBeEnabled();
  });
}

const storedEditorialErrors = [
  ['truncated output', 'ValueError: 訳が途中で終了しました。範囲を絞って再実行してください。', '最後まで完了しませんでした'],
  ['context limit', 'ValueError: 翻訳入力が文脈上限を超えます。選択行で範囲を絞って実行してください。', '対応する文字数'],
  ['quality rejected', '原文とほぼ同じ出力のため、現代語訳として採用しませんでした。モデルまたは翻訳条件を見直してください。', '十分な結果'],
  ['backend settings', '翻訳エンジンが要求を処理できませんでした（HTTP 500）。モデルの接続設定と実行記録を確認してください。', 'サイトの管理者'],
  ['LLM installation', 'ローカルLLMは未導入です。モデルを導入するか、商用APIまたは訳文の直接入力を使用してください。', 'サイトの管理者'],
];
for (const [name, error, expected] of storedEditorialErrors) {
  test(`saved ${name} error offers only public reading actions`, async ({ page }) => {
    await publicFixture(page, true, undefined, { ...publicData(), quality: 'machine', status: 'error',
      job: { operation: 'translate', status: 'error', error } });
    const warning = page.locator('.kobun-reading__warnings');
    await expect(warning).toContainText(expected);
    await expect(warning).not.toContainText(/範囲を絞|選択行|見直してください|設定と実行記録|導入する|直接入力|ValueError|再実行できます/);
    await page.getByRole('tab', { name: '翻刻', exact: true }).click();
    await expect(page.locator('.kobun-reading__transcription')).toHaveText(source);
  });
}

test('live local errors also omit instructions to edit a translation range', async ({ page }) => {
  await publicFixture(page, true, undefined, { ...publicData(), quality: 'machine' });
  await page.route(`${origin}/reading/run`, route => route.fulfill({ status: 503,
    json: { error: '選択行で範囲を絞って実行してください。' } }));
  await page.getByRole('button', { name: '実験的な現代語訳を作る' }).click();
  await expect(page.locator('.kobun-reading__message')).toContainText('サイトの管理者');
  await expect(page.locator('.kobun-reading__message')).not.toContainText(/範囲を|選択行/);
});

for (const provider of ['anthropic', 'google']) {
  test(`${provider} truncated public generation never asks to edit the source or output limit`, async ({ page }) => {
    await publicFixture(page); await configure(page, provider);
    const data = provider === 'anthropic' ? { ...response(provider), stop_reason: 'max_tokens' }
      : { candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: '未完の訳' }] } }] };
    await page.route(provider === 'anthropic' ? 'https://api.anthropic.com/**' : 'https://generativelanguage.googleapis.com/**', route => route.fulfill({ json: data }));
    page.once('dialog', dialog => dialog.accept());
    await page.locator('.kobun-reading__translate').click();
    await expect(page.locator('.kobun-reading__external-status')).toContainText('最後まで完了しませんでした');
    await expect(page.locator('.kobun-reading__external-status')).not.toContainText(/本文の範囲|モデルを変更|出力上限/);
    await expect(page.locator('.kobun-reading__translation')).toBeHidden();
    // The editorial API preserves the actionable message for its text editor.
    if (provider === 'anthropic') {
      await expect(client(page, 'await api.translateCommercial("編集可能な本文");')).rejects.toThrow('本文の範囲を短く');
    }
  });
}

test('oversized public text is explained without suggesting an unavailable text editor', async ({ page }) => {
  await publicFixture(page, true, undefined, { ...publicData(), transcription: source.repeat(1000) });
  await configure(page);
  let calls = 0;
  await page.route('https://api.openai.com/**', route => { calls++; return route.abort(); });
  page.once('dialog', dialog => dialog.accept());
  await page.locator('.kobun-reading__translate').click();
  await expect(page.locator('.kobun-reading__external-status')).toContainText('対応する文字数');
  await expect(page.locator('.kobun-reading__external-status')).not.toContainText(/文字にしてください|範囲を/);
  expect(calls).toBe(0);
});

test('storage failure cannot suggest a forbidden page-only storage mode', async ({ page }) => {
  await publicFixture(page, true, { ...policyDefaults(), storage_modes: ['plain'], default_storage: 'plain' });
  await expect(page.locator('.kobun-llm__notice')).not.toContainText('このページだけ');
  await page.locator('.kobun-llm summary').click();
  await page.getByLabel('使用するLLM').selectOption('openai');
  await page.getByLabel('モデルID', { exact: true }).fill('fixture-text');
  await page.getByLabel(/^APIキー/).fill(fakeKey);
  await page.evaluate(key => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (name, value) {
      if (name === key) throw new DOMException('Storage disabled', 'SecurityError');
      return original.call(this, name, value);
    };
  }, storageKey);
  await page.getByRole('button', { name: '設定・キーを登録', exact: true }).click();
  await expect(page.locator('.kobun-llm__status')).toContainText('サイトデータ保存設定');
  await expect(page.locator('.kobun-llm__status')).not.toContainText('このページだけ');
});

test('a public visitor with key input disabled is referred to the administrator', async ({ page }) => {
  await publicFixture(page, true, { ...policyDefaults(), providers: ['openai'], default_provider: 'openai',
    key_input: false, model_choice: false, models: { openai: 'fixture-text' } });
  await page.locator('.kobun-reading__translate').click();
  await expect(page.locator('.kobun-reading__external-status')).toContainText('サイトの管理者');
  await expect(page.locator('.kobun-reading__external-status')).not.toContainText('APIキーを登録');
});

test('the default local LLM still follows the existing server job flow', async ({ page }) => {
  await publicFixture(page);
  await page.route(`${origin}/reading/start`, route => route.fulfill({ json: { ...publicData(), quality: 'machine' } }));
  await page.route(`${origin}/reading/run`, route => {
    expect(route.request().postDataJSON()).toEqual({ id, operation: 'translate' });
    return route.fulfill({ json: { ...publicData(), quality: 'machine', job: { operation: 'translate', status: 'running' } } });
  });
  await page.route(`${origin}/reading/status?**`, route => route.fulfill({ json: { ...publicData(), quality: 'machine', translation: { text: translated, model: 'local-fixture' }, job: { operation: 'translate', status: 'completed' } } }));
  await page.getByRole('button', { name: '閉じる', exact: true }).click();
  await page.getByRole('button', { name: 'このページを翻刻する' }).click();
  await page.getByRole('tab', { name: '現代語訳', exact: true }).click();
  await page.getByRole('button', { name: '実験的な現代語訳を作る' }).click();
  await expect(page.locator('.kobun-reading__progress')).toContainText('生成しています');
  await expect(page.locator('.kobun-reading__translation')).toHaveText(translated);
  await expect(page.locator('.kobun-reading__model')).toHaveText('使用モデル: local-fixture');
});

test('admin reviews commercial output before saving its model provenance, without sending credentials to Omeka', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  const doc: any = { id, width: 600, height: 900, revision: 3, regions: [], history_count: 0, image_sha256: 'fixture',
    source: { media_id: 1, item_id: 1, title: '画像1', item_title: 'テスト資料', item_identifier: 'rb_test' },
    lines: [{ id: 'a', raw: source, x: 500, y: 50, width: 40, height: 750, confidence: .9, classId: 1, readingOrder: 1, direction: 'vertical' }],
    translation_draft: { text: source, line_ids: ['a'], source_transcription: source }, translation: null,
    publication_state: 'draft', review_note: '', transcription_credit: '', transcription_metadata: {} };
  await serveAssets(page, `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${assetPath}dist/workspace.css"><div id="kobun-workspace" data-proxy="/proxy" data-pages="/pages" data-csrf="fixture" data-can-manage="1" data-can-edit-transcription="1"></div><script type="module" src="${assetPath}dist/workspace.js"></script>`);
  await page.route(`${origin}/pages?**`, route => route.fulfill({ json: { identifier: 'rb_test', title: 'テスト資料', total: 1, pages: [{ ...doc.source, position: 1 }] } }));
  let saved: any = null;
  await page.route(`${origin}/proxy?**`, route => {
    const endpoint = new URL(route.request().url()).searchParams.get('endpoint')!;
    if (endpoint === 'health') return route.fulfill({ json: { ocr_ready: true, llm_ready: false } });
    if (endpoint.endsWith('/image')) return route.fulfill({ body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=', 'base64'), contentType: 'image/png' });
    if (route.request().method() === 'PUT') {
      const body = route.request().postDataJSON(); expect(JSON.stringify(body)).not.toContain(fakeKey);
      if (endpoint.endsWith('/translation')) {
        saved = body; doc.translation = { ...body }; doc.translation_draft = { text: body.input, line_ids: body.line_ids, source_transcription: source }; doc.revision++;
      }
    }
    return route.fulfill({ json: endpoint === 'documents' ? [doc] : doc });
  });
  await page.route('https://api.openai.com/v1/responses', route => route.fulfill({ json: response('openai') }));
  await page.goto(`${origin}/admin?identifier=rb_test`);
  await page.getByRole('button', { name: /画像1/ }).click();
  await configure(page);
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'OpenAI (GPT)でこの本文を現代語訳', exact: true }).click();
  await expect(page.locator('#kobun-manual-translation')).toHaveValue(translated);
  expect(saved).toBeNull();
  await page.locator('#kobun-manual-translation').fill(translated + '（確認）');
  await page.getByRole('button', { name: '生成した現代語訳を保存', exact: true }).click();
  await expect(page.locator('.kobun-translation')).toContainText('（確認）');
  expect(saved).toMatchObject({ method: 'commercial', provider: 'openai', model: 'fixture-text-1', human_edited: true, prompt_revision: 'kobun-browser-translation-1' });
  expect(errors).toEqual([]);
});
