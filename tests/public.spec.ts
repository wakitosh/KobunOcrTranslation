import { test, expect } from '@playwright/test';

test('public item offers clearly labelled, site-scoped reading assistance', async ({ page, request }) => {
  let expectedMediaId = 0;
  let limited = false;
  let publishedWithoutTranslation = false;
  await page.route('**/s/pub_ja/kobun-reading/start', async route => {
    expect(route.request().method()).toBe('POST');
    expect(route.request().headers()['x-kobun-csrf']).toBeTruthy();
    expect(route.request().postDataJSON().media_id).toBe(expectedMediaId);
    if (limited) return route.fulfill({ status: 429, json: {
      error: 'この端末では新しいページの翻刻を1時間に24回まで利用できます。次に試せるまで約2分です。',
      retry_after: 120, retry_at: Math.floor(Date.now() / 1000) + 120, limit: 24,
    } });
    if (publishedWithoutTranslation) return route.fulfill({ json: {
      id: '1234567890abcdef12345678', quality: 'published', label: '図書館確認済み', status: 'published', revision: 5,
      job: null, lines: [{ order: 1, text: 'つれづれなるままに', direction: 'vertical' }],
      writing_direction: 'vertical', reading_direction: 'rtl', transcription: 'つれづれなるままに',
      translation: null, translation_available: true, transcription_credit: '翻刻班', transcription_metadata: {},
    } });
    await route.fulfill({ json: {
      id: '1234567890abcdef12345678', quality: 'machine', label: '機械生成・未確認', status: 'recognize', revision: 3,
      job: { operation: 'recognize', status: 'completed', error: '' },
      lines: [{ order: 1, text: 'つれづれなるままに', direction: 'vertical' }, { order: 2, text: '日暮らし硯に向かひて', direction: 'vertical' }],
      writing_direction: 'vertical', reading_direction: 'rtl',
      transcription: 'つれづれなるままに\n日暮らし硯に向かひて', translation: null,
      transcription_credit: '筑波大学附属図書館 古典籍翻刻班',
      transcription_metadata: { title: '筑波大学附属図書館蔵『中務内侍乃日記』の翻刻（一）',
        contributors: '加藤 咲子\n泉 沙希\n中尾 涼\n佐藤 龍弥', journal_title: '筑波日本語研究',
        journal_issue: '第30号', publication_year: '2026', rights_status: 'copyrighted',
        rights_holder: '加藤咲子・泉沙希・中尾涼・佐藤龍弥',
        publication_url: 'https://tsukuba.repo.nii.ac.jp/search?page=1&size=20&sort=custom_sort&search_type=2&q=59' },
      translation_available: true, provenance: { image_sha256: 'test', operations: {} },
    } });
  });
  await page.route('**/s/pub_ja/kobun-reading/run', async route => {
    expect(route.request().postDataJSON().operation).toBe('translate');
    await route.fulfill({ json: {
      id: '1234567890abcdef12345678', quality: 'machine', label: '機械生成・未確認', status: 'recognize', revision: 3,
      job: { operation: 'translate', status: 'running', error: '' },
      lines: [{ order: 1, text: 'つれづれなるままに', direction: 'vertical' }, { order: 2, text: '日暮らし硯に向かひて', direction: 'vertical' }],
      writing_direction: 'vertical', reading_direction: 'rtl', transcription: 'つれづれなるままに\n日暮らし硯に向かひて',
      translation: null, translation_available: true, provenance: { image_sha256: 'test', operations: {} },
    } });
  });
  await page.route('**/s/pub_ja/kobun-reading/status?**', route => route.fulfill({ json: {
    id: '1234567890abcdef12345678', quality: 'machine', label: '機械生成・未確認', status: 'translate', revision: 4,
    job: { operation: 'translate', status: 'completed', error: '' },
    lines: [{ order: 1, text: 'つれづれなるままに', direction: 'vertical' }, { order: 2, text: '日暮らし硯に向かひて', direction: 'vertical' }],
    writing_direction: 'vertical', reading_direction: 'rtl', transcription: 'つれづれなるままに\n日暮らし硯に向かひて',
    translation: { text: 'することもなく、一日中硯に向かって。', model: 'Qwen3.5-9B Q4_K_M', warnings: [] },
    translation_available: true, provenance: { image_sha256: 'test', operations: {} },
  } }));
  await page.goto('/s/pub_ja/item/4570911');
  const panel = page.locator('.kobun-reading');
  test.skip(await panel.count() === 0, 'Enable this site’s public reading assistance setting for the live public-page check.');
  const publicTranslationEnabled = await panel.getAttribute('data-translation') === '1';
  await expect(panel.locator('.kobun-reading__heading')).toHaveCount(0);
  await expect(panel.locator('.kobun-reading__current')).toHaveCount(0);
  expect(await panel.evaluate(element => ({
    top: getComputedStyle(element).marginTop,
    bottom: getComputedStyle(element).marginBottom,
  }))).toEqual({ top: '0px', bottom: '20px' });
  const pages = JSON.parse((await panel.getAttribute('data-pages')) || '[]');
  expect(pages).toHaveLength(106);
  expectedMediaId = pages[1].id;
  const secondCanvas = await page.evaluate(() => {
    const node = document.querySelector('.mirador.viewer') as HTMLElement;
    const store = (window as any).miradors[node.id].store;
    const state = store.getState();
    const viewerWindow: any = Object.values(state.windows)[0];
    const manifest = state.manifests[viewerWindow.manifestId || viewerWindow.loadedManifest].json;
    return (manifest.items || manifest.sequences[0].canvases)[1].id
      || (manifest.items || manifest.sequences[0].canvases)[1]['@id'];
  });
  await page.evaluate(canvas => { location.hash = `canvas=${encodeURIComponent(canvas)}`; }, secondCanvas);
  const start = panel.getByRole('button', { name: 'このページを翻刻する' });
  await expect(start).toBeEnabled();
  const startBox = (await start.boundingBox())!;
  const stateBox = (await panel.locator('.kobun-reading__state').boundingBox())!;
  expect(startBox.x).toBeLessThan(stateBox.x);
  expect(Math.abs(startBox.y - stateBox.y)).toBeLessThanOrEqual(2);
  await start.click();
  await expect(panel.locator('.kobun-reading__state')).toHaveText('機械生成・未確認');
  await expect(panel.locator('.kobun-reading__quality')).toContainText('機械が生成した未確認');
  await expect(panel.locator('.kobun-reading__responsibility')).toHaveText('翻刻責任者: 筑波大学附属図書館 古典籍翻刻班');
  await expect(panel.locator('.kobun-reading__attribution')).toContainText('加藤 咲子');
  await expect(panel.locator('.kobun-reading__attribution')).toContainText('筑波日本語研究 · 第30号 · 2026');
  await expect(panel.locator('.kobun-reading__attribution')).toContainText('著作権あり');
  await expect(panel.locator('.kobun-reading__provenance-details')).toContainText('OCR: NDL古典籍OCR-Lite');
  await expect(panel.locator('.kobun-reading__provenance')).toHaveCount(0);
  expect(await popupOrder(panel)).toEqual(publicTranslationEnabled
    ? ['quality', 'tabs', 'content', 'attribution', 'responsibility', 'provenance']
    : ['quality', 'content', 'attribution', 'responsibility', 'provenance']);
  await expect(panel.locator('.kobun-reading__transcription')).toContainText('つれづれなるままに');
  await expect(panel.locator('.kobun-reading__transcription')).toHaveClass(/is-vertical/);
  await expect(panel.locator('.kobun-reading__transcription')).toHaveClass(/reading-rtl/);
  expect(await panel.locator('.kobun-reading__transcription p').first().evaluate(element => getComputedStyle(element).writingMode)).toBe('vertical-rl');
  const popup = panel.locator('.kobun-reading__dialog');
  await expect(popup).toBeVisible();
  expect(await popup.evaluate(element => element.matches(':modal'))).toBe(false);
  expect(await popup.evaluate(element => getComputedStyle(element).resize)).toBe('both');
  const beforeDrag = (await popup.boundingBox())!;
  const handle = (await panel.locator('[data-drag-handle]').boundingBox())!;
  await page.mouse.move(handle.x + 80, handle.y + 18);
  await page.mouse.down();
  await page.mouse.move(handle.x - 40, handle.y + 68, { steps: 5 });
  await page.mouse.up();
  const afterDrag = (await popup.boundingBox())!;
  expect(afterDrag.x).toBeLessThan(beforeDrag.x - 80);
  expect(afterDrag.y).toBeGreaterThan(beforeDrag.y + 30);
  await page.mouse.move(afterDrag.x + afterDrag.width - 2, afterDrag.y + afterDrag.height - 2);
  await page.mouse.down();
  await page.mouse.move(afterDrag.x + afterDrag.width + 70, afterDrag.y + afterDrag.height + 50, { steps: 5 });
  await page.mouse.up();
  const afterResize = (await popup.boundingBox())!;
  expect(afterResize.width).toBeGreaterThan(afterDrag.width + 40);
  expect(afterResize.height).toBeGreaterThan(afterDrag.height + 25);
  if (publicTranslationEnabled) {
    await panel.getByRole('tab', { name: '現代語訳' }).click();
    await expect(panel.getByRole('tabpanel')).toContainText('現代語訳は機械生成');
    await panel.getByRole('button', { name: '実験的な現代語訳を作る' }).click();
    await expect(panel.locator('.kobun-reading__progress')).toContainText('現代語訳を生成しています');
    await expect(panel.locator('.kobun-reading__translation')).toContainText('一日中硯に向かって');
    await expect(panel.locator('.kobun-reading__model')).toHaveText('使用モデル: Qwen3.5-9B Q4_K_M');
    await expect(panel.locator('.kobun-reading__progress')).toBeHidden();
    await panel.getByRole('button', { name: '閉じる' }).click();
    publishedWithoutTranslation = true;
    await start.click();
    await panel.getByRole('tab', { name: '現代語訳' }).click();
    await expect(panel.locator('.kobun-reading__translation-empty-message')).toHaveText('現代語訳は保存されていません。');
  } else {
    await expect(panel.locator('.kobun-reading__tabs')).toHaveCount(0);
    await expect(panel.getByRole('tab', { name: '翻刻' })).toHaveCount(0);
    await expect(panel.getByRole('tab', { name: '現代語訳' })).toHaveCount(0);
    await expect(panel.locator('[data-panel="translation"]')).toHaveCount(0);
    await expect(panel.locator('.kobun-reading__translation')).toHaveCount(0);
    await expect(panel.getByRole('button', { name: '実験的な現代語訳を作る' })).toHaveCount(0);
  }

  await panel.getByRole('button', { name: '閉じる' }).click();
  limited = true;
  await start.click();
  await expect(panel.locator('.kobun-reading__state')).toHaveText('利用上限');
  await expect(panel.locator('.kobun-reading__message')).toContainText('次に試せるまで約2分');
  await expect(panel.getByRole('button', { name: /以降に再試行/ })).toBeDisabled();

  const missingCsrf = await request.post('/s/pub_ja/kobun-reading/start', { data: { media_id: 4570912 } });
  expect(missingCsrf.status()).toBe(403);
  const unknown = await request.get('/s/pub_ja/kobun-reading/status?id=000000000000000000000000');
  expect(unknown.status()).toBe(404);
});

async function popupOrder(panel: import('@playwright/test').Locator) {
  return panel.locator('.kobun-reading__dialog').evaluate(dialog => {
    const firstPanel = dialog.querySelector('.kobun-reading__tabpanel');
    return [...dialog.children].flatMap(element => {
      if (element.classList.contains('kobun-reading__quality')) return ['quality'];
      if (element.classList.contains('kobun-reading__tabs')) return ['tabs'];
      if (element === firstPanel) return ['content'];
      if (element.classList.contains('kobun-reading__responsibility')) return ['responsibility'];
      if (element.classList.contains('kobun-reading__attribution')) return ['attribution'];
      if (element.classList.contains('kobun-reading__provenance-details')) return ['provenance'];
      return [];
    });
  });
}
