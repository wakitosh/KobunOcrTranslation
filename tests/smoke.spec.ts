import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import type { Document } from '../ui/types';

// Real Omeka shell/ACL/assets, isolated fake API data. Never overwrite a research document.
const runtime = '../../var/kobun-ocr-translation';
fs.mkdirSync('var/test-results/direction-v1', { recursive: true });
fs.mkdirSync('var/test-results/translation-v3', { recursive: true });
const fixture: Document = JSON.parse(fs.readFileSync(`${runtime}/data/6b5fb2347d22e7f8ebff0416/document.json`, 'utf8'));

test('five stages, edited OCR, optional translation, publication, history and downloads', async ({ page, context }) => {
  await context.addCookies(JSON.parse(fs.readFileSync(`${runtime}/test-cookie.json`, 'utf8')));
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const doc: Document = structuredClone(fixture);
  doc.lines = []; doc.translation = null; doc.translation_draft = null; doc.publication_state = 'draft';
  doc.review_note = ''; doc.transcription_credit = ''; doc.transcription_metadata = {}; delete doc.job;
  doc.source.item_identifier = 'rb_10076700084';
  let submittedText = '', translatedIds: string[] = [], original = '', transcriptionSaves = 0;
  let savedReadingDirection = '';
  await page.route('**/admin/kobun-ocr/pages?**', route => route.fulfill({ json: {
    item_id: doc.source.item_id, identifier: 'rb_10076700084', title: '徒然草 , 上', total: 1,
    pages: [{ ...doc.source, position: 3 }],
  } }));
  await page.route('**/admin/kobun-ocr/proxy?**', async route => {
    const endpoint = new URL(route.request().url()).searchParams.get('endpoint')!;
    const method = route.request().method();
    if (endpoint === 'health') return route.fulfill({ json: { ocr_ready: true, llm_ready: true, llm_model: 'Test model' } });
    if (endpoint.endsWith('/image')) return route.fulfill({ body: fs.readFileSync(`${runtime}/data/${fixture.id}/image.jpg`), contentType: 'image/jpeg' });
    if (endpoint === 'documents') return route.fulfill({ json: method === 'GET' ? [] : doc });
    if (endpoint.endsWith('/layout')) {
      const body = route.request().postDataJSON();
      doc.lines = body.lines; doc.reading_direction = body.reading_direction; savedReadingDirection = body.reading_direction;
      doc.translation = null; doc.translation_draft = null; doc.publication_state = 'draft'; doc.revision++;
    }
    if (endpoint.endsWith('/transcription')) {
      const body = route.request().postDataJSON(); transcriptionSaves++;
      doc.lines = doc.lines.map(line => ({ ...line, raw: body.lines.find((entry: { id: string; raw: string }) => entry.id === line.id).raw }));
      doc.translation = null; doc.translation_draft = null; doc.publication_state = 'draft'; doc.revision++;
    }
    if (endpoint.endsWith('/translation-input')) {
      const body = route.request().postDataJSON();
      submittedText = body.text;
      doc.translation_draft = { text: body.text, line_ids: body.line_ids, source_transcription: doc.lines.filter(l => body.line_ids.includes(l.id)).map(l => l.raw).join('\n') };
      doc.translation = null; doc.publication_state = 'draft'; doc.revision++;
    }
    if (endpoint.endsWith('/translation') && method === 'PUT') {
      const body = route.request().postDataJSON();
      doc.translation_draft = { text: body.input, line_ids: body.line_ids,
        source_transcription: doc.lines.filter(l => body.line_ids.includes(l.id)).map(l => l.raw).join('\n') };
      doc.translation = { text: body.text, input: body.input, line_ids: body.line_ids,
        source_transcription: doc.translation_draft.source_transcription, model: '', method: 'manual', uncertainties: [] };
      doc.publication_state = 'draft'; doc.status = 'translation_manual'; doc.revision++;
    }
    if (endpoint.endsWith('/translation') && method === 'DELETE') {
      doc.translation = null; doc.publication_state = 'draft'; doc.status = 'translation_deleted'; doc.revision++;
    }
    if (endpoint.endsWith('/jobs')) {
      const body = route.request().postDataJSON();
      doc.job = { id: `${doc.revision}-${body.operation}`, operation: body.operation, status: 'queued' };
      await route.fulfill({ json: doc });
      if (body.operation === 'layout') doc.lines = structuredClone(fixture.lines.slice(0, 4)).map(l => { delete l.raw; delete l.machineRaw; return l; });
      if (body.operation === 'recognize') doc.lines = doc.lines.map((l, i) => ({ ...l, raw: ['つれづれなるままに','日暮らし硯に向かひて','心にうつりゆく','よしなしごとを'][i], machineRaw: 'OCRの原文' }));
      if (body.operation === 'translate') {
        translatedIds = body.line_ids;
        original = doc.lines[0].raw!;
        doc.translation = { text: 'することもなく、硯に向かって一日を過ごしながら。', input: submittedText, line_ids: translatedIds, model: 'Test model', uncertainties: [{ source: '向かひて', reason: '試験用の確認箇所', reading: '向かって' }] };
      }
      doc.job.status = 'completed'; doc.revision++; return;
    }
    if (endpoint.endsWith('/history')) return route.fulfill({ json: [{ event: 'test', recorded_at: 0, document: doc }] });
    if (endpoint.endsWith('/review')) {
      const body = route.request().postDataJSON();
      doc.publication_state = body.state; doc.review_note = body.note; doc.transcription_credit = body.credit;
      doc.transcription_metadata = body.metadata; doc.revision++;
    }
    return route.fulfill({ json: doc });
  });
  await page.route('**/admin/kobun-ocr/import', route => route.fulfill({ json: {
    filename: '翻刻.docx', legend: ['・上付きの注記を保持する。'],
    notation: ['右ルビ・上側の注記を ^(...) に変換', '左ルビ・下側の注記を _(...) に変換'],
    metadata: { title: '筑波大学附属図書館蔵『中務内侍乃日記』の翻刻（一）',
      contributors: '加藤 咲子\n泉 沙希\n中尾 涼\n佐藤 龍弥', journal_title: '筑波日本語研究',
      journal_issue: '第30号', publication_year: '2026', publisher: '筑波大学大学院博士課程人文社会系日本語学研究室' },
    sections: [
      { label: '［一ウ］', lines: ['つれづれなるままに', '日暮らし硯に向かひて'] },
      { label: '［二オ］', lines: ['心にうつりゆく', 'よしなしごとを'] },
    ],
  } }));
  await page.goto('/admin/kobun-ocr');
  await page.getByLabel('別の資料を指定').fill('rb_10076700084');
  await page.getByRole('button', { name: '資料を開く', exact: true }).click();
  await page.locator('.kobun-pages>button').first().click();
  await expect(page.locator('[aria-current=step]')).toContainText('レイアウト調整');
  await page.getByRole('button', { name: 'レイアウトを認識', exact: true }).click();
  await expect(page.locator('.kobun-order li')).toHaveCount(4);
  await expect(page.locator('.kobun-order')).toHaveClass(/is-vertical/);
  await expect(page.getByText('縦書き · 自動（右から左）', { exact: true })).toBeVisible();
  const secondLineId = await page.locator('.kobun-order li').nth(1).getAttribute('data-line-id');
  await page.locator('.kobun-order button').nth(1).click();
  await page.locator('.kobun-order button').nth(1).evaluate((element: HTMLElement) => element.blur());
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.kobun-order li').first()).toHaveAttribute('data-line-id', secondLineId!);
  await page.getByRole('button', { name: '選択行を後ろへ（←キー）' }).click();
  await expect(page.locator('.kobun-order li').nth(1)).toHaveAttribute('data-line-id', secondLineId!);
  await page.screenshot({ path: 'var/test-results/direction-v1/layout-vertical.png', fullPage: true });
  await page.locator('.kobun-order button').first().click();
  await expect(page.locator('.edit-layer')).toBeVisible();
  await expect.poll(async () => {
    const viewer = await page.locator('.kobun-viewer').boundingBox();
    const badge = await page.locator('.osd-line.selected .osd-order').boundingBox();
    return !!viewer && !!badge
      && badge.y >= viewer.y
      && badge.y + badge.height <= viewer.y + viewer.height;
  }).toBe(true);
  await page.getByLabel('読み方向').selectOption('ltr');
  await expect(page.locator('.kobun-order')).toHaveClass(/reading-ltr/);
  await page.getByRole('button', { name: '調整を確定して文字認識', exact: true }).click();
  expect(savedReadingDirection).toBe('ltr');
  await expect(page.getByLabel('行 1 の翻刻')).toHaveValue('つれづれなるままに');
  await expect(page.locator('.kobun-lines')).toHaveClass(/is-vertical/);
  expect(await page.getByLabel('行 1 の翻刻').evaluate(el => getComputedStyle(el).writingMode)).toBe('vertical-rl');
  await page.getByText('翻刻済みテキストを取り込む', { exact: true }).click();
  await page.locator('.kobun-import input[type=file]').setInputFiles({
    name: '翻刻.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', buffer: Buffer.from('test'),
  });
  await expect(page.getByRole('group', { name: '取り込むページ（複数選択できます）' })).toBeVisible();
  await expect(page.getByLabel('［一ウ］')).toBeChecked();
  await page.getByLabel('［二オ］').check();
  await expect(page.locator('.kobun-import-count')).toHaveText('選択 2ページ · 取込 4行 ／ レイアウト 4行');
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: '選択したページを取り込む' }).click();
  await expect(page.getByLabel('行 2 の翻刻')).toHaveValue('日暮らし硯に向かひて');
  await page.screenshot({ path: 'var/test-results/direction-v1/transcription-vertical.png', fullPage: true });
  await expect(page.locator('.edit-layer')).toHaveCount(0);
  await page.getByLabel('行 1 の翻刻').fill('つれづれなるままに、');
  await page.getByRole('button', { name: '翻刻の修正を保存して次へ' }).click();
  await expect(page.getByLabel('翻訳用本文')).toHaveValue('つれづれなるままに、日暮らし硯に向かひて心にうつりゆくよしなしごとを');
  await page.getByLabel('翻訳の終了行').selectOption('2');
  await page.getByLabel('翻訳用本文').fill('つれづれなるままに、日暮らし硯に向かひて。');
  await page.screenshot({ path: 'var/test-results/translation-v3/workspace-input.png', fullPage: true });
  await page.getByRole('button', { name: 'この本文を現代語訳', exact: true }).click();
  await expect(page.locator('.kobun-translation')).toContainText('することもなく');
  await expect(page.getByText('試験用の確認箇所')).toBeVisible();
  await expect(page.getByText('読みの候補：向かって')).toBeVisible();
  await page.screenshot({ path: 'var/test-results/translation-v3/workspace-uncertainties.png', fullPage: true });
  expect(translatedIds).toEqual(doc.lines.slice(0, 2).map(l => l.id));
  expect(submittedText).toBe('つれづれなるままに、日暮らし硯に向かひて。');
  expect(original).toBe('つれづれなるままに、');
  const tabStyle = await page.getByRole('tab', { name: '現代語訳', exact: true }).evaluate(el => getComputedStyle(el).backgroundColor);
  const primaryStyle = await page.locator('.kobun-primary').evaluate(el => getComputedStyle(el).backgroundColor);
  expect(tabStyle).not.toBe(primaryStyle);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: '訳文をダウンロード' }).click();
  expect(fs.readFileSync((await (await download).path())!, 'utf8')).toContain('することもなく');
  await page.getByRole('button', { name: '確認・公開へ', exact: true }).click();
  await expect(page.locator('[aria-current=step]')).toContainText('確認・公開');
  await expect(page.locator('.kobun-publication-summary')).toContainText('現代語訳');
  await page.locator('.kobun-record-toggle button').click();
  await expect(page.locator('.kobun-record-toggle button')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#kobun-history-list')).toBeVisible();
  await page.locator('.kobun-record-toggle button').click();
  await expect(page.locator('#kobun-history-list')).toHaveCount(0);
  await page.getByLabel('翻刻責任者').fill('筑波大学附属図書館 古典籍翻刻班');
  await page.getByText(/^研究成果・権利情報/).click();
  await expect(page.getByLabel('成果名')).toHaveValue('筑波大学附属図書館蔵『中務内侍乃日記』の翻刻（一）');
  const titleFieldLayout = await page.getByLabel('成果名').evaluate((input: HTMLInputElement) => {
    const label = input.closest('label')!;
    const inputBox = input.getBoundingClientRect();
    const labelBox = label.getBoundingClientRect();
    return { labelDisplay: getComputedStyle(label).display, fontWeight: getComputedStyle(input).fontWeight,
      inputTop: inputBox.top, labelTop: labelBox.top, inputWidth: inputBox.width, labelWidth: labelBox.width };
  });
  expect(titleFieldLayout.labelDisplay).toBe('grid');
  expect(titleFieldLayout.fontWeight).toBe('400');
  expect(titleFieldLayout.inputTop).toBeGreaterThan(titleFieldLayout.labelTop);
  expect(titleFieldLayout.inputWidth).toBeGreaterThanOrEqual(titleFieldLayout.labelWidth - 1);
  await expect(page.getByLabel('掲載誌')).toHaveValue('筑波日本語研究');
  await page.getByLabel('掲載先URL').fill('https://tsukuba.repo.nii.ac.jp/search?page=1&size=20&sort=custom_sort&search_type=2&q=59');
  await page.getByLabel('権利状態').selectOption('copyrighted');
  await page.getByLabel('権利者').fill('加藤咲子・泉沙希・中尾涼・佐藤龍弥');
  await page.getByLabel('確認メモ').fill('画像と翻刻を照合済み');
  await page.getByRole('button', { name: '確認済みにする' }).click();
  await expect(page.locator('.kobun-heading .kobun-publication')).toHaveText('確認済み');
  expect(doc.transcription_credit).toBe('筑波大学附属図書館 古典籍翻刻班');
  expect(doc.transcription_metadata?.journal_issue).toBe('第30号');
  await page.getByRole('button', { name: '公開する' }).click();
  await expect(page.locator('.kobun-heading .kobun-publication')).toHaveText('公開中');
  await page.locator('.kobun-record-toggle button').click();
  const recordDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: '記録を保存 (.json)' }).click();
  const record = JSON.parse(fs.readFileSync((await (await recordDownload).path())!, 'utf8'));
  expect(record.document.translation.input).toBe(submittedText);
  expect(record.history).toHaveLength(1);
  await page.locator('.kobun-steps button').filter({ hasText: '現代語訳（任意）' }).click();
  await page.getByRole('tab', { name: '現代語訳', exact: true }).click();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'この現代語訳を削除', exact: true }).click();
  await expect(page.getByLabel('翻訳用本文')).toHaveValue(submittedText);
  await expect(page.locator('.kobun-translation')).toHaveCount(0);
  expect(doc.translation).toBeNull();
  expect(doc.publication_state).toBe('draft');
  await page.getByRole('button', { name: '現代語訳を手入力', exact: true }).click();
  await page.getByRole('textbox', { name: '現代語訳', exact: true }).fill('することもなく、硯に向かって過ごしている。');
  await page.getByRole('button', { name: '入力した現代語訳を保存', exact: true }).click();
  await expect(page.locator('.kobun-translation')).toContainText('硯に向かって過ごしている');
  await expect(page.getByText('管理者が入力した訳文です。')).toBeVisible();
  expect(doc.translation?.method).toBe('manual');
  expect(doc.translation?.model).toBe('');
  await page.getByRole('button', { name: '翻刻確認' }).click();
  await page.getByLabel('行 2 の翻刻').fill('日暮らし硯に向かひて、');
  await page.getByRole('button', { name: '翻刻の修正を保存して次へ' }).click();
  await expect(page.locator('.kobun-heading .kobun-publication')).toHaveText('下書き');
  await expect(page.getByLabel('翻訳用本文')).toHaveValue(/日暮らし硯に向かひて、/);
  expect(transcriptionSaves).toBe(2);
  expect(errors).toEqual([]);
});

test('horizontal OCR geometry selects horizontal layout and transcription UI', async ({ page, context }) => {
  await context.addCookies(JSON.parse(fs.readFileSync(`${runtime}/test-cookie.json`, 'utf8')));
  const doc: Document = structuredClone(fixture);
  doc.source.item_identifier = 'horizontal_test';
  doc.lines = doc.lines.slice(0, 3).map((line, index) => {
    const horizontal = { ...line, x: 10, y: 20 + index * 35, width: 160, height: 24, raw: `横書き行${index + 1}` };
    delete horizontal.direction;
    return horizontal;
  });
  doc.translation = null; doc.translation_draft = null; delete doc.job;
  doc.publication_state = 'draft'; doc.review_note = ''; doc.transcription_credit = ''; doc.transcription_metadata = {};
  await page.route('**/admin/kobun-ocr/pages?**', route => route.fulfill({ json: {
    item_id: doc.source.item_id, identifier: 'horizontal_test', title: '横書き試験', total: 1,
    pages: [{ ...doc.source, position: 1 }],
  } }));
  await page.route('**/admin/kobun-ocr/proxy?**', route => {
    const endpoint = new URL(route.request().url()).searchParams.get('endpoint')!;
    if (endpoint === 'health') return route.fulfill({ json: { ocr_ready: true, llm_ready: false } });
    if (endpoint === 'documents') return route.fulfill({ json: route.request().method() === 'GET' ? [doc] : doc });
    if (endpoint.endsWith('/image')) return route.fulfill({ body: fs.readFileSync(`${runtime}/data/${fixture.id}/image.jpg`), contentType: 'image/jpeg' });
    return route.fulfill({ json: doc });
  });
  await page.goto('/admin/kobun-ocr?identifier=horizontal_test');
  await expect(page.getByLabel('対象資料')).toHaveValue(String(doc.source.item_id));
  await expect(page.getByText('選択中の資料')).toBeVisible();
  await expect(page.getByText('保存済みの作業')).toHaveCount(0);
  await page.locator('.kobun-pages>button').first().click();
  await expect(page.locator('[aria-current=step]')).toContainText('翻刻確認');
  await expect(page.locator('.kobun-lines')).toHaveClass(/is-horizontal/);
  await expect(page.getByText('横書き · 自動（左から右）', { exact: true })).toBeVisible();
  expect(await page.getByLabel('行 1 の翻刻').evaluate(el => getComputedStyle(el).writingMode)).toBe('horizontal-tb');
  await page.getByRole('button', { name: '翻刻を確定して訳文の準備へ' }).click();
  await expect(page.getByRole('button', { name: '現代語訳を作らず確認・公開へ' })).toBeEnabled();
  await page.getByRole('button', { name: '現代語訳を作らず確認・公開へ' }).click();
  await expect(page.locator('[aria-current=step]')).toContainText('確認・公開');
  await page.screenshot({ path: 'var/test-results/direction-v1/transcription-horizontal.png', fullPage: true });
});
