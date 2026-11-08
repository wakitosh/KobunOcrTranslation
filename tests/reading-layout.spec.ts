import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const origin = 'https://kobun.test', assets = '/modules/KobunOcrTranslation/asset/';
test.setTimeout(45000);
test.beforeEach(async ({ page }) => { page.setDefaultTimeout(12000); });
const id = 'a'.repeat(24), privateId = 'b'.repeat(24);
const boxes = [420, 330, 240].map((x, i) => ({ id: `line${i + 1}`, x, y: 50, width: 40, height: 650,
  readingOrder: i + 1, classId: 1, confidence: .9, direction: 'vertical', raw: ['甲の本文', '乙の本文', '丙の本文'][i] }));

async function fixture(page: Page, options: { published?: boolean; defer?: boolean; reject?: boolean; horizontal?: boolean; empty?: boolean } = {}) {
  const lines = options.empty ? [] : options.horizontal ? boxes.map((line, i) => ({ ...line, x: 40, y: 100 + i * 150, width: 500, height: 40, direction: 'horizontal' })) : boxes;
  const data = { id, revision: 7, quality: options.published ? 'published' : 'machine', label: options.published ? '図書館確認済み' : '機械生成・未確認',
    status: options.empty ? 'layout' : 'recognize', job: null, layout_line_count: lines.length,
    lines: lines.map(line => ({ order: line.readingOrder, text: line.raw, direction: line.direction })),
    writing_direction: options.horizontal ? 'horizontal' : 'vertical', reading_direction: options.horizontal ? 'ltr' : 'rtl',
    transcription: lines.map(line => line.raw).join('\n'), translation: null, translation_available: true,
    transcription_metadata: {}, can_adjust_layout: !options.published, transcription_scope: 'shared' };
  const calls: { path: string; body: any; nonce: string }[] = [];
  const assetRequests: string[] = [];
  let last: any = null, rejected = false;
  let release = () => {};
  const gate = new Promise<void>(resolve => { release = resolve; });
  const html = execFileSync('php', ['tests/reading-fixture.php', 'enabled'], { encoding: 'utf8' });
  await page.route('**/*', route => route.abort());
  await page.route(`${origin}/**`, async route => {
    const request = route.request(), pathname = new URL(request.url()).pathname;
    if (pathname.startsWith(assets)) {
      assetRequests.push(pathname);
      const filename = path.resolve('asset', pathname.slice(assets.length));
      if (!filename.startsWith(path.resolve('asset') + path.sep)) return route.abort();
      return route.fulfill({ body: fs.readFileSync(filename), contentType: filename.endsWith('.css') ? 'text/css' : 'text/javascript' });
    }
    if (pathname === '/') return route.fulfill({ body: html, contentType: 'text/html' });
    calls.push({ path: pathname, body: request.method() === 'POST' ? request.postDataJSON() : null,
      nonce: request.headers()['x-kobun-reading'] || '' });
    if (pathname === '/reading/start') return route.fulfill({ json: data });
    if (pathname === '/reading/layout') {
      if (options.defer) await gate;
      return route.fulfill({ json: { id, revision: 7, width: 600, height: 900, reading_direction: 'auto', lines } });
    }
    if (pathname === '/reading/layout-image') return route.fulfill({ contentType: 'image/svg+xml', body:
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900"><rect width="600" height="900" fill="#faf5e8"/></svg>' });
    if (pathname === '/reading/layout-recognize') {
      if (options.reject && !rejected) { rejected = true; return route.fulfill({ status: 429, json: { error: '現在処理が混み合っています。少し待ってから再実行してください。', error_reason: 'queue_full' } }); }
      last = request.postDataJSON();
      return route.fulfill({ status: 202, json: { ...data, id: privateId, visitor_layout: true, transcription_scope: 'private',
        status: 'edited', layout_line_count: last.lines.length, lines: [], revision: 2, job: { operation: 'recognize', status: 'queued', jobs_ahead: 1 } } });
    }
    if (pathname === '/reading/status') return route.fulfill({ json: { ...data, id: privateId, visitor_layout: true,
      transcription_scope: 'private', revision: 3, transcription: '修正後の本文', reading_direction: last?.reading_direction || 'rtl',
      status: 'recognize', layout_line_count: last?.lines.length || 1,
      lines: [{ order: 1, text: '修正後の本文', direction: options.horizontal ? 'horizontal' : 'vertical' }], job: null } });
    if (pathname === '/reading/forget') return route.fulfill({ json: { removed_documents: 1 } });
    return route.abort();
  });
  await page.goto(origin);
  await page.getByRole('button', { name: 'このページを翻刻する', exact: true }).click();
  return { calls, assetRequests, release, submitted: () => last };
}
const editor = (page: Page) => page.getByRole('region', { name: '自分用のレイアウト調整' });
async function open(page: Page) {
  await page.getByRole('button', { name: 'レイアウトを調整', exact: true }).click();
  await expect(editor(page)).toBeVisible();
  await expect(page.locator('.osd-line')).toHaveCount(3);
}

test('visitor edits use the shared image controls, reorder, undo, add, delete and privately recognize', async ({ page }, testInfo) => {
  const state = await fixture(page);
  expect(state.assetRequests.some(url => /public-layout|viewer-/.test(url))).toBe(false);
  await open(page);
  await page.getByRole('button', { name: '行 2 を選択', exact: true }).click();
  await page.getByRole('button', { name: '行 2 を選択', exact: true }).press('ArrowRight');
  await expect(page.locator('.kobun-public-layout__order li').first()).toContainText('乙の本文');
  await page.getByRole('button', { name: '元に戻す', exact: true }).click();
  await expect(page.locator('.kobun-public-layout__order li').first()).toContainText('甲の本文');
  await page.getByRole('button', { name: 'やり直す', exact: true }).click();
  await expect(page.locator('.kobun-public-layout__order li').first()).toContainText('乙の本文');
  await page.locator('.kobun-public-layout__order li').first().locator('button').dragTo(page.locator('.kobun-public-layout__order li').last().locator('button'));
  await expect(page.locator('.kobun-public-layout__order li').last()).toContainText('乙の本文');
  await page.getByRole('button', { name: '行 1 を選択', exact: true }).click();
  await expect(page.locator('.edit-layer')).toBeVisible();
  await page.locator('.edit-move').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // Allow the image's fit-to-line animation to finish.
  const move = (await page.locator('.edit-move').boundingBox())!;
  await page.mouse.move(move.x + move.width / 2, move.y + move.height / 4);
  await page.mouse.down(); await page.mouse.move(move.x + move.width / 2 - 12, move.y + move.height / 4 + 5, { steps: 5 }); await page.mouse.up();
  await page.getByText('行枠の詳しい調整', { exact: true }).click();
  await expect(page.getByLabel('行枠のX座標')).not.toHaveValue('420');
  await page.getByLabel('行枠の幅').fill('45');
  await page.getByRole('button', { name: '中央に行を追加', exact: true }).click();
  await expect(page.locator('.kobun-public-layout__order li')).toHaveCount(4);
  await page.getByRole('button', { name: '選択した行を削除', exact: true }).click();
  await expect(page.locator('.kobun-public-layout__order li')).toHaveCount(3);
  await page.getByLabel('レイアウトの読み方向').selectOption('ltr');
  await page.screenshot({ path: testInfo.outputPath('desktop-layout.png') });
  await page.getByRole('button', { name: 'このレイアウトで翻刻する', exact: true }).click();
  await expect(page.locator('.kobun-reading__progress')).toContainText('処理待ち');
  await expect(page.locator('.kobun-reading__transcription')).toContainText('修正後の本文');
  expect(state.submitted()).toMatchObject({ id, base_revision: 7, reading_direction: 'ltr' });
  for (const line of state.submitted().lines) expect(Object.keys(line).sort()).toEqual(['height', 'id', 'width', 'x', 'y']);
  expect(state.calls.filter(call => call.path.startsWith('/reading/layout')).every(call => /^[a-f0-9]{64}$/.test(call.nonce))).toBe(true);
  await expect(page.locator('.kobun-reading__retention')).toContainText('この閲覧画面だけ');
  await page.getByRole('button', { name: '閉じる', exact: true }).click();
  await page.getByRole('button', { name: 'このページを翻刻する', exact: true }).click();
  await expect(page.locator('.kobun-reading__transcription')).toContainText('修正後の本文');
  expect(state.calls.filter(call => call.path === '/reading/start')).toHaveLength(1);
});

test.describe('touch layout editing', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  test('horizontal pages have accessible controls, direction-aware keyboard order and no overflow', async ({ page }, testInfo) => {
    await fixture(page, { horizontal: true }); await open(page);
    await expect(page.locator('.kobun-public-layout__order')).toHaveClass(/is-horizontal/);
    await page.getByRole('button', { name: '行 2 を選択', exact: true }).click();
    await page.getByRole('button', { name: '行 2 を選択', exact: true }).press('ArrowUp');
    await expect(page.locator('.kobun-public-layout__order li').first()).toContainText('乙の本文');
    const dimensions = await editor(page).evaluate(element => ({ width: element.clientWidth, scroll: element.scrollWidth }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 1);
    expect((await page.getByRole('button', { name: '枠を描く', exact: true }).boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await page.getByRole('button', { name: '枠を描く', exact: true }).tap();
    await expect(page.locator('.edit-layer')).toHaveCount(0);
    await page.locator('.kobun-public-layout__viewer').scrollIntoViewIfNeeded();
    const view = (await page.locator('.kobun-public-layout__viewer').boundingBox())!;
    const touch = await page.context().newCDPSession(page);
    const x = view.x + view.width * .4, y = view.y + view.height * .4;
    await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let step = 1; step <= 4; step++) await touch.send('Input.dispatchTouchEvent', {
      type: 'touchMove', touchPoints: [{ x: x + 10 * step, y: y + 10 * step }],
    });
    await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.getByRole('button', { name: '描いた枠を追加', exact: true }).tap();
    await expect(page.locator('.kobun-public-layout__order li')).toHaveCount(4);
    await page.getByText('行枠の詳しい調整', { exact: true }).click();
    await page.getByLabel('行枠のX座標').fill('50');
    await expect(page.getByLabel('行枠のX座標')).toHaveValue('50');
    await page.screenshot({ path: testInfo.outputPath('phone-layout.png') });
  });
});

test('confirmed official data has no visitor layout controls', async ({ page }) => {
  const state = await fixture(page, { published: true });
  await expect(page.getByRole('button', { name: 'レイアウトを調整', exact: true })).toBeHidden();
  expect(state.calls.filter(call => call.path.startsWith('/reading/layout'))).toEqual([]);
  expect(state.assetRequests.some(url => /public-layout|viewer-/.test(url))).toBe(false);
});

test('a page with no detected rows can receive manual frames without automatic failed recognition', async ({ page }) => {
  const state = await fixture(page, { empty: true });
  await expect(page.locator('.kobun-reading__dialog')).toBeVisible();
  await expect(page.locator('.kobun-reading__message')).toContainText('行枠がありません');
  await page.getByRole('button', { name: 'レイアウトを調整', exact: true }).click();
  await expect(editor(page)).toBeVisible();
  await page.getByText('行枠の詳しい調整', { exact: true }).click();
  await page.getByRole('button', { name: '中央に行を追加', exact: true }).click();
  await expect(page.locator('.kobun-public-layout__order li')).toHaveCount(1);
  await page.getByRole('button', { name: 'このレイアウトで翻刻する', exact: true }).click();
  await expect(page.locator('.kobun-reading__transcription')).toContainText('修正後の本文');
  expect(state.submitted().lines).toHaveLength(1);
});

test('cancelling a changed layout leaves the original reading result intact', async ({ page }) => {
  const state = await fixture(page); await open(page);
  await page.getByRole('button', { name: '行 2 を選択', exact: true }).click();
  await page.getByRole('button', { name: '選択行を前へ', exact: true }).click();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: '結果に戻る', exact: true }).click();
  await expect(editor(page)).toHaveCount(0);
  await expect(page.locator('.kobun-reading__transcription p').first()).toHaveText('甲の本文');
  expect(state.submitted()).toBeNull();
});

test('a full queue preserves the edited layout and allows retry', async ({ page }) => {
  const state = await fixture(page, { reject: true }); await open(page);
  await page.getByRole('button', { name: '行 1 を選択', exact: true }).click();
  await page.getByText('行枠の詳しい調整', { exact: true }).click();
  await page.getByLabel('行枠の幅').fill('55');
  await page.getByRole('button', { name: 'このレイアウトで翻刻する', exact: true }).click();
  await expect(editor(page).getByRole('alert')).toContainText('混み合っています');
  await expect(page.getByLabel('行枠の幅')).toHaveValue('55');
  expect(state.submitted()).toBeNull();
  await page.getByRole('button', { name: 'このレイアウトで翻刻する', exact: true }).click();
  await expect(page.locator('.kobun-reading__transcription')).toContainText('修正後の本文');
  expect(state.submitted().lines[0].width).toBe(55);
});

test('a delayed layout response cannot appear after the Mirador canvas changes', async ({ page }) => {
  const state = await fixture(page, { defer: true });
  await page.getByRole('button', { name: 'レイアウトを調整', exact: true }).click();
  await page.evaluate(() => { (window as any).fixtureCanvas = 'c2'; (window as any).fixtureListeners.forEach((fn: () => void) => fn()); });
  await expect(page.locator('.kobun-reading__dialog')).not.toBeVisible();
  state.release(); await page.waitForTimeout(250);
  await expect(editor(page)).toHaveCount(0);
  expect(state.calls.filter(call => call.path === '/reading/layout-image')).toHaveLength(0);
});
