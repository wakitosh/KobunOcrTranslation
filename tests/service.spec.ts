import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test('global administrator sees service status and authorized controls', async ({ page, context }) => {
  await context.addCookies(JSON.parse(fs.readFileSync('../../var/kobun-ocr-translation/test-cookie.json', 'utf8')));
  await page.goto('/admin/module/configure?id=KobunOcrTranslation');
  const panel = page.locator('#kobun-service-control');
  await expect(panel).toBeVisible();
  await expect(panel.locator('[data-service="worker"] .kobun-service-status')).toContainText('稼働中');
  await expect(panel.locator('[data-service="llama"] .kobun-service-status')).toContainText('稼働中');
  await expect(panel.locator('#kobun-service-message')).toBeEmpty();
  const endpoint = (await panel.getAttribute('data-endpoint'))!;
  const csrf = (await panel.getAttribute('data-csrf'))!;
  expect((await context.request.post(endpoint, { data: { service: 'worker', action: 'start' } })).status()).toBe(403);
  const alreadyRunning = await context.request.post(endpoint, {
    headers: { 'X-Kobun-CSRF': csrf }, data: { service: 'worker', action: 'start' },
  });
  expect(alreadyRunning.status()).toBe(200);
  expect((await alreadyRunning.json()).worker.running).toBe(true);
  for (const body of [
    { service: 'llama', action: 'start', model_id: '../private.gguf' },
    { service: 'worker', action: 'start', model_id: 'qwen35-9b-q4km' },
    { service: 'llama', action: 'start', model_id: null },
    { service: 'llama', action: 'start', command: 'anything' },
  ]) {
    expect((await context.request.post(endpoint, { headers: { 'X-Kobun-CSRF': csrf }, data: body })).status()).toBe(400);
  }
});

test('model controls select only installed models and follow loading and rollback states', async ({ page, context }) => {
  await context.addCookies(JSON.parse(fs.readFileSync('../../var/kobun-ocr-translation/test-cookie.json', 'utf8')));
  const models = JSON.parse(fs.readFileSync('worker/models.json', 'utf8')).llm.map((model: any) => ({
    ...model, available: model.id !== 'qwen3-4b-q4km', availability: model.id === 'qwen3-4b-q4km' ? '未取得' : '取得済み',
  }));
  let state = {
    worker: { running: true, managed: true, responding: true, ocr_ready: true, pending: 0, maintenance: false },
    llama: { running: true, managed: true, ready: true, model: 'Qwen3.5-35B-A3B', model_id: 'qwen35-35b-a3b-q4km', backend: 'metal' },
    models, operation: null, model_switch_supported: true,
  };
  const posted: any[] = [];
  let failed = false;
  await page.route('**/admin/kobun-ocr/service', route => {
    if (route.request().method() === 'POST') {
      const body = route.request().postDataJSON(); posted.push(body);
      if (body.action === 'stop') state.llama.running = false;
      if (body.action === 'start') {
        if (failed) return route.fulfill({ status: 409, json: { error: 'モデル切替に失敗しました。元の設定へ戻しました。' } });
        state.llama = { ...state.llama, running: true, ready: false, model_id: body.model_id,
          model: models.find((model: any) => model.id === body.model_id).name };
      }
    } else if (state.llama.running) state.llama.ready = true;
    return route.fulfill({ json: state });
  });
  await page.goto('/admin/module/configure?id=KobunOcrTranslation');
  const panel = page.locator('#kobun-service-control'), row = panel.locator('[data-service="llama"]');
  const select = panel.locator('#kobun-ocr-llm-model');
  await expect(select).toHaveValue('qwen35-35b-a3b-q4km');
  await expect(select).toBeDisabled();
  await row.locator('[data-action="stop"]').click();
  await expect(select).toBeEnabled();
  expect(await select.locator('option[value="qwen3-4b-q4km"]').isDisabled()).toBe(true);
  await select.selectOption('qwen35-9b-q4km');
  await row.locator('[data-action="start"]').click();
  await expect(row.locator('.kobun-service-status')).toContainText('モデル読込中');
  await expect(select).toBeDisabled();
  await expect(row.locator('.kobun-service-status')).toContainText('応答可能');
  expect(posted[1]).toEqual({ service: 'llama', action: 'start', model_id: 'qwen35-9b-q4km' });
  await expect(select).toHaveValue('qwen35-9b-q4km');
  await row.locator('[data-action="stop"]').click();
  await expect(select).toBeEnabled();
  await select.selectOption('qwen35-35b-a3b-q4km'); failed = true;
  await row.locator('[data-action="start"]').click();
  await expect(panel.locator('#kobun-service-message')).toContainText('元の設定へ戻しました');
  await expect(row.locator('.kobun-service-status')).toContainText('Qwen3.5-9B');
  await expect(select).toBeEnabled();
});

test('site administrator cannot access service controls', async ({ browser }) => {
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  await context.addCookies(JSON.parse(fs.readFileSync('../../var/kobun-ocr-translation/test-cookie-site_admin.json', 'utf8')));
  try {
    const response = await context.request.get('/admin/kobun-ocr/service');
    expect(response.status()).toBe(403);
    expect((await response.json()).error).toContain('全体管理者');
  } finally {
    await context.close();
  }
});
