import { llmState, subscribeLlm, mountLlmSettings, providerNames, confirmCommercial, translateCommercial, visitorLlmPolicy } from './dist/llm.js';
import { mountReadingWindow } from './reading-window.js';

(() => {
  'use strict';
  const labels = { layout: '画像内の行を検出しています', recognize: '文字を読み取っています', translate: '現代語訳を作っています' };

  const canvasId = canvas => String(canvas?.id || canvas?.['@id'] || '');
  const serviceId = canvas => {
    const body = canvas?.items?.[0]?.items?.[0]?.body || canvas?.images?.[0]?.resource || {};
    const service = Array.isArray(body.service) ? body.service[0] : body.service;
    return String(service?.id || service?.['@id'] || '').replace(/\/$/, '');
  };
  const manifestCanvases = manifest => {
    if (Array.isArray(manifest?.items)) return manifest.items;
    if (Array.isArray(manifest?.sequences?.[0]?.canvases)) return manifest.sequences[0].canvases;
    return [];
  };
  const viewerSnapshot = () => {
    for (const node of document.querySelectorAll('.mirador.viewer')) {
      const store = window.miradors?.[node.id]?.store;
      if (!store?.getState) continue;
      const state = store.getState();
      const windowId = Object.keys(state.windows || {})[0];
      const viewerWindow = windowId ? state.windows[windowId] : null;
      if (!viewerWindow) continue;
      const manifestId = viewerWindow.manifestId || viewerWindow.loadedManifest;
      const entry = state.manifests?.[manifestId];
      return { store, current: String(viewerWindow.canvasId || ''), canvases: manifestCanvases(entry?.json || entry) };
    }
    return null;
  };

  document.querySelectorAll('.kobun-reading:not([data-ready])').forEach(root => {
    root.dataset.ready = '1';
    const get = name => root.querySelector(`.kobun-reading__${name}`);
    const pages = JSON.parse(root.dataset.pages || '[]');
    const translationEnabled = root.dataset.translation === '1';
    const startButton = get('start'), message = get('message');
    const startLabel = startButton.textContent;
    const dialog = get('dialog'), quality = get('quality'), transcription = get('transcription');
    const translation = get('translation'), translationEmpty = get('translation-empty');
    const translationEmptyMessage = get('translation-empty-message');
    const warnings = get('warnings'), translateButton = get('translate'), state = get('state');
    const progress = get('progress'), model = get('model'), responsibility = get('responsibility');
    const attribution = get('attribution'), attributionList = attribution.querySelector('dl');
    const readingWindow = mountReadingWindow(dialog);
    const tabs = [...root.querySelectorAll('.kobun-reading__tab')];
    const panels = [...root.querySelectorAll('.kobun-reading__tabpanel')];
    let selectedPage = null, current = null, timer = null, advancing = false, unsubscribe = null;
    let externalAbort = null, privateTranslation = null;
    let policy;
    try { policy = visitorLlmPolicy(JSON.parse(root.dataset.llmPolicy)); }
    catch { policy = visitorLlmPolicy(null); }
    if (translationEnabled) mountLlmSettings(get('llm-settings'), policy);
    const externalStatus = get('external-status'), cancelTranslation = get('cancel-translation'), clearPrivate = get('clear-private');
    const cancelExternal = () => { if (externalAbort) externalAbort.abort(); externalAbort = null; };

    const request = async (url, body) => {
      const response = await fetch(url, {
        method: body ? 'POST' : 'GET', credentials: 'same-origin', cache: 'no-store',
        headers: body ? { 'Content-Type': 'application/json', 'X-Kobun-CSRF': root.dataset.csrf } : {},
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(data.error || `通信に失敗しました (${response.status})`);
        error.retryAfter = Number(data.retry_after || 0);
        error.retryAt = Number(data.retry_at || 0);
        throw error;
      }
      return data;
    };
    const stop = () => { if (timer) window.clearTimeout(timer); timer = null; };
    const closeDialog = () => {
      readingWindow.save();
      if (dialog.open && dialog.close) dialog.close();
      else dialog.removeAttribute('open');
    };
    const openDialog = () => {
      if (dialog.open) return;
      if (dialog.show) dialog.show();
      else dialog.setAttribute('open', '');
      readingWindow.restore();
    };
    const setState = (text, className = 'kobun-reading__state') => {
      state.textContent = text; state.title = text; state.className = className;
    };
    const setProgress = text => {
      progress.hidden = !text;
      progress.querySelector('b').textContent = text;
    };
    const activateTab = name => {
      if (name === 'translation' && !translationEnabled) name = 'transcription';
      tabs.forEach(tab => {
        const active = tab.dataset.tab === name;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.panel !== name; });
      get('modal-title').textContent = name === 'translation' ? '現代語訳' : '翻刻';
    };
    const resetResult = () => {
      cancelExternal(); privateTranslation = null;
      if (externalStatus) externalStatus.textContent = '';
      stop(); current = null; advancing = false; closeDialog();
      setState('実行前');
      setProgress('');
      if (model) { model.hidden = true; model.textContent = ''; }
      if (translation) { translation.hidden = true; translation.textContent = ''; warnings.replaceChildren(); }
      transcription.replaceChildren();
      responsibility.hidden = true; responsibility.textContent = '';
      attribution.hidden = true; attributionList.replaceChildren();
      message.textContent = ''; startButton.textContent = startLabel;
      startButton.disabled = !selectedPage; activateTab('transcription');
    };
    const choosePage = snapshot => {
      const hashCanvas = () => new URLSearchParams(String(location.hash || '').replace(/^#/, '')).get('canvas') || '';
      const currentCanvas = snapshot.current || hashCanvas();
      let index = snapshot.canvases.findIndex(canvas => canvasId(canvas) === currentCanvas);
      if (index < 0 && !currentCanvas && snapshot.canvases.length) index = 0;
      let next = index >= 0 ? pages[index] : null;
      if (index >= 0) {
        const service = serviceId(snapshot.canvases[index]);
        next = pages.find(page => String(page.service || '').replace(/\/$/, '') === service) || next;
      }
      if (!next) {
        if (selectedPage) { selectedPage = null; resetResult(); }
        startButton.disabled = true;
        message.textContent = '現在のcanvasに対応するOCR対象画像が見つかりません。'; return;
      }
      if (selectedPage?.id !== next.id) {
        selectedPage = next; resetResult();
      }
      startButton.disabled = false;
    };
    const attachViewer = () => {
      const snapshot = viewerSnapshot();
      if (!snapshot) return false;
      choosePage(snapshot);
      unsubscribe = snapshot.store.subscribe(() => {
        const next = viewerSnapshot();
        if (next) choosePage(next);
      });
      return true;
    };
    let viewerAttempts = 0;
    const viewerTimer = window.setInterval(() => {
      viewerAttempts += 1;
      if (attachViewer() || viewerAttempts >= 200) {
        window.clearInterval(viewerTimer);
        if (!selectedPage) {
          message.textContent = 'Miradorの読み込み後にページを再表示してください。';
        }
      }
    }, 150);

    const showError = error => {
      stop(); advancing = false; setProgress('');
      if (error.retryAfter > 0) {
        const retryTime = error.retryAt > 0
          ? new Date(error.retryAt * 1000).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
          : '';
        message.textContent = `${error.message}${retryTime ? ` 再試行の目安は${retryTime}です。` : ''}`;
        setState('利用上限'); startButton.disabled = true;
        startButton.textContent = retryTime ? `${retryTime}以降に再試行` : startLabel;
        timer = window.setTimeout(() => {
          timer = null; setState('実行前');
          message.textContent = '再度ご利用いただけます。'; startButton.textContent = startLabel;
          startButton.disabled = !selectedPage;
        }, error.retryAfter * 1000);
        return;
      }
      startButton.textContent = startLabel; startButton.disabled = !selectedPage;
      message.textContent = error.message; setState('利用できません');
    };
    const run = async operation => {
      if (!current || advancing) return;
      advancing = true;
      try { current = await request(root.dataset.run, { id: current.id, operation }); render(current); }
      catch (error) { showError(error); }
      finally { advancing = false; }
    };
    const poll = async () => {
      if (!current) return;
      try { current = await request(`${root.dataset.status}?id=${encodeURIComponent(current.id)}`); render(current); }
      catch (error) { showError(error); }
    };
    const render = data => {
      stop(); current = data;
      if (privateTranslation && privateTranslation.input !== data.transcription) privateTranslation = null;
      const active = ['queued', 'running'].includes(data.job?.status);
      startButton.textContent = startLabel;
      startButton.disabled = active || !!externalAbort || !selectedPage;
      setState(data.label, `kobun-reading__state is-${data.quality}`);
      quality.textContent = data.quality === 'published'
        ? '図書館で内容を確認し、公開したデータです。'
        : '機械が生成した未確認の読み取り結果です。';
      if (privateTranslation) quality.textContent = data.quality === 'published'
        ? '翻刻は図書館が確認・公開したデータです。自分用の現代語訳は機械生成・未確認です。'
        : '翻刻と自分用の現代語訳は機械生成・未確認です。';
      responsibility.hidden = !data.transcription_credit;
      responsibility.textContent = data.transcription_credit ? `翻刻責任者: ${data.transcription_credit}` : '';
      const metadata = data.transcription_metadata || {};
      const rightsLabels = {
        copyrighted: '著作権あり', not_asserted: '翻刻本文について著作権を主張しない',
        undetermined: '権利状態を確認中', other: 'その他・個別条件',
      };
      const journal = [metadata.journal_title, metadata.journal_issue, metadata.publication_date || metadata.publication_year,
      metadata.publication_pages ? `pp. ${metadata.publication_pages}` : ''].filter(Boolean).join(' · ');
      const entries = [
        ['成果名', metadata.title], ['作成者', metadata.contributors], ['作成者識別子', metadata.contributor_identifiers],
        ['所属', metadata.affiliation], ['役割・分担', metadata.contribution_note], ['掲載誌', journal],
        ['雑誌識別子', metadata.journal_identifiers], ['発行主体', metadata.publisher],
        ['DOI／恒久識別子', metadata.doi], ['掲載先', metadata.publication_url, metadata.publication_url],
        ['権利状態', rightsLabels[metadata.rights_status] || ''], ['権利者', metadata.rights_holder],
        ['権利に関する説明', metadata.rights_statement],
        ['利用条件', metadata.license_label || metadata.license_url, metadata.license_url],
        ['推奨引用', metadata.citation],
      ].filter(entry => entry[1]);
      attributionList.replaceChildren(...entries.flatMap(([label, value, url]) => {
        const term = document.createElement('dt'); term.textContent = label;
        const description = document.createElement('dd');
        if (url) {
          const link = document.createElement('a'); link.href = url; link.textContent = value;
          link.target = '_blank'; link.rel = 'noopener noreferrer'; description.append(link);
        } else description.textContent = value;
        return [term, description];
      }));
      attribution.hidden = entries.length === 0;
      const failed = data.job?.status === 'error';
      const translationFailed = failed && data.job.operation === 'translate';
      if (failed && !translationFailed) message.textContent = data.job.error || '翻刻の処理に失敗しました。';
      if (active) {
        message.textContent = `${labels[data.job.operation] || '処理しています'}…`;
        if (data.job.operation === 'translate' && translationEnabled) {
          setProgress('現代語訳を生成しています…');
          openDialog(); activateTab('translation');
        }
        timer = window.setTimeout(poll, 1500); return;
      }
      setProgress(externalAbort ? '商用LLMで現代語訳を生成しています…' : '');
      if (data.quality === 'machine' && data.status === 'layout') {
        message.textContent = '文字認識に進みます…'; void run('recognize'); return;
      }
      if (data.lines.length) {
        const writingDirection = data.writing_direction === 'vertical' ? 'vertical' : 'horizontal';
        const readingDirection = data.reading_direction === 'rtl' ? 'rtl' : 'ltr';
        transcription.className = `kobun-reading__transcription is-${writingDirection} reading-${readingDirection}`;
        transcription.replaceChildren(...data.lines.map(line => {
          const p = document.createElement('p');
          p.className = `is-${line.direction === 'vertical' ? 'vertical' : 'horizontal'}`;
          p.textContent = line.text || '（判読結果なし）'; return p;
        }));
        if (!failed || translationFailed) message.textContent = data.quality === 'published' ? '確認済みの内容を表示しました。' : '機械翻刻を表示しました。';
        openDialog();
      }
      if (translationEnabled) {
        const shownTranslation = privateTranslation || data.translation;
        warnings.replaceChildren();
        if (shownTranslation?.text) {
          translation.hidden = false; translation.textContent = shownTranslation.text; translationEmpty.hidden = true;
          const methodLabel = shownTranslation.method === 'manual' ? '作成方法: 管理者による入力'
            : shownTranslation.model ? `使用モデル: ${shownTranslation.model}${shownTranslation.provider ? ` · ${providerNames[shownTranslation.provider] || shownTranslation.provider}` : ''}${shownTranslation.human_edited ? ' · 管理者による修正あり' : ''}` : '';
          model.hidden = !methodLabel;
          model.textContent = methodLabel;
          shownTranslation.warnings?.forEach(text => {
            const p = document.createElement('p'); p.className = 'kobun-reading__warning'; p.textContent = text; warnings.append(p);
          });
          if (data.job?.operation === 'translate' && !failed) activateTab('translation');
        } else {
          translation.hidden = true; translation.textContent = ''; translationEmpty.hidden = false;
          translationEmptyMessage.textContent = '現代語訳は保存されていません。';
          model.hidden = true; model.textContent = '';
        }
        if (translationFailed && !privateTranslation && !externalAbort) {
          const p = document.createElement('p'); p.className = 'kobun-reading__warning';
          const error = String(data.job.error || '');
          const detail = /URLError|<urlopen error|Connection refused/.test(error)
            ? '翻訳サーバに接続できませんでした。'
            : error.replace(/^(?:ValueError|RuntimeError):\s*/, '') || '訳の作成中にエラーが発生しました。';
          p.textContent = `前回の現代語訳の作成に失敗しました。${detail} 翻刻はそのまま閲覧できます。現代語訳を作るボタンから再実行できます。`;
          warnings.prepend(p);
        }
      }
      if (translateButton) {
        const state = llmState(policy), commercial = state.provider !== 'local';
        translateButton.hidden = !(data.lines.length && data.translation_available && (commercial || (data.quality === 'machine' && !data.translation)));
        translateButton.disabled = !!externalAbort || active;
        translateButton.textContent = commercial ? `${providerNames[state.provider]}で${privateTranslation ? '訳を作り直す' : '自分用の現代語訳を作る'}` : '実験的な現代語訳を作る';
        cancelTranslation.hidden = !externalAbort;
        clearPrivate.hidden = !privateTranslation;
        clearPrivate.disabled = !!externalAbort;
      }
    };

    startButton.addEventListener('click', async () => {
      if (!selectedPage) return;
      stop(); closeDialog(); message.textContent = '結果を確認しています…'; startButton.disabled = true;
      try { current = await request(root.dataset.start, { media_id: Number(selectedPage.id) }); render(current); }
      catch (error) { showError(error); }
    });
    tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
    get('close').addEventListener('click', closeDialog);
    window.addEventListener('keydown', event => { if (event.key === 'Escape' && dialog.open) closeDialog(); });
    if (translateButton) translateButton.addEventListener('click', async () => {
      if (!current || advancing || externalAbort || ['queued', 'running'].includes(current.job?.status)) return;
      const settings = llmState(policy);
      if (settings.provider === 'local') {
        translateButton.hidden = true; message.textContent = '現代語訳を準備しています…';
        setProgress('現代語訳を開始しています…'); void run('translate'); return;
      }
      if (!settings.hasKey || !settings.model) {
        const details = get('llm-settings').querySelector('details');
        if (details) details.open = true;
        externalStatus.textContent = policy.form_enabled
          ? '許可された保存方法でモデルとAPIキーを登録するか、保存したキーのロックを解除してください。'
          : '管理者により設定フォームが無効になっています。利用できるAPIキーが登録されていません。'; return;
      }
      const source = current.transcription || current.lines.map(line => line.text).join('\n');
      if (!confirmCommercial(source, policy)) return;
      const controller = new AbortController(); externalAbort = controller;
      externalStatus.textContent = '商用LLMに本文を送信しています…'; render(current); activateTab('translation');
      try {
        const result = await translateCommercial(source, controller.signal, policy);
        if (externalAbort !== controller || controller.signal.aborted) return;
        privateTranslation = result;
        externalStatus.textContent = 'このページを開いている間だけ表示する、自分用の訳です。図書館の公開データには保存されません。';
      } catch (error) {
        if (externalAbort !== controller) return;
        externalStatus.textContent = error.message;
      } finally {
        if (externalAbort === controller) { externalAbort = null; render(current); activateTab('translation'); }
      }
    });
    if (cancelTranslation) cancelTranslation.addEventListener('click', () => { if (externalAbort) externalAbort.abort(); });
    if (clearPrivate) clearPrivate.addEventListener('click', () => { privateTranslation = null; externalStatus.textContent = '自分用の訳を消去しました。'; render(current); });
    if (translationEnabled) {
      subscribeLlm(() => { const wasOpen = dialog.open; if (current) render(current); if (!wasOpen) closeDialog(); });
      window.addEventListener('kobun-llm-forget', () => { cancelExternal(); privateTranslation = null; externalStatus.textContent = ''; if (current) render(current); });
      window.addEventListener('pagehide', () => { cancelExternal(); privateTranslation = null; translation.textContent = ''; });
    }
    window.addEventListener('beforeunload', () => { if (unsubscribe) unsubscribe(); });
  });
})();
