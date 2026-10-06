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
