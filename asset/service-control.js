(() => {
  const panel = document.getElementById('kobun-service-control');
  if (!panel) return;
  const message = panel.querySelector('#kobun-service-message');
  const rows = [...panel.querySelectorAll('[data-service]')];
  const modelSelect = panel.querySelector('#kobun-ocr-llm-model');
  const modelHelp = panel.querySelector('#kobun-service-model-help');
  const refresh = panel.querySelector('#kobun-service-refresh');
  let busy = false, latest = null, timer = null;

  function render(data) {
    const previous = latest;
    latest = data;
    const switching = !!data.operation;
    if (modelSelect) {
      const choices = Array.isArray(data.models) ? data.models : [];
      const selected = !data.llama.running && previous?.llama.model_id === data.llama.model_id
        ? modelSelect.value : data.llama.model_id;
      if (data.model_switch_supported) {
        modelSelect.replaceChildren(...choices.map(model => {
          const option = document.createElement('option');
          option.value = model.id;
          option.textContent = `${model.name}（${(model.size_bytes / 1e9).toFixed(2)} GB、${model.license}） · ${model.availability}`;
          option.disabled = !model.available;
          return option;
        }));
        modelSelect.value = choices.some(model => model.id === selected) ? selected
          : data.llama.model_id || choices.find(model => model.available)?.id || '';
      }
      modelSelect.disabled = busy || switching || data.llama.running || !data.model_switch_supported || !choices.some(model => model.available);
      modelHelp.textContent = !data.model_switch_supported
        ? '運用サービスを更新・再起動すると、この画面でモデルを切り替えられます。'
        : switching ? '実行サービスの操作中です。'
        : data.llama.running ? 'モデルを変更するには、先にLLMサーバを停止してください。'
        : choices.some(model => model.available) ? '取得済みモデルを選び、LLMサーバの「起動」を押してください。起動時にファイルの整合性を検証します。'
        : '利用できるモデルがありません。サーバ管理者が初回導入を行ってください。';
    }
    const selectedModel = data.models?.find(model => model.id === modelSelect?.value);
    for (const row of rows) {
      const service = data[row.dataset.service];
      const status = row.querySelector('.kobun-service-status');
      if (!service) { status.textContent = '状態不明'; continue; }
      const words = [service.running ? '稼働中' : service.managed ? '起動待ち' : '停止中'];
      if (row.dataset.service === 'worker' && service.running) {
        words.push(service.maintenance ? '処理受付を一時停止中' : service.ocr_ready ? 'OCR準備済み' : service.responding ? 'OCR未準備' : '応答待ち');
        if (service.pending !== null) words.push(`処理中 ${service.pending} 件`);
      }
      if (row.dataset.service === 'llama') {
        if (service.running) words.push(service.ready ? '応答可能' : 'モデル読込中');
        if (service.model) words.push(service.model);
        if (service.backend) words.push(service.backend === 'metal' ? 'Metal' : 'CPU');
      }
      status.textContent = words.join(' ・ ');
      for (const button of row.querySelectorAll('[data-action]')) {
        button.disabled = busy || switching || (button.dataset.action === 'start' && service.running)
          || (button.dataset.action === 'stop' && !service.running && !service.managed)
          || (button.dataset.action !== 'start' && service.running && !service.managed)
          || (button.dataset.action !== 'start' && (data.worker.pending || 0) > 0)
          || (row.dataset.service === 'llama' && button.dataset.action === 'start' && data.model_switch_supported && !selectedModel?.available);
      }
    }
  }

  async function fetchStatus() {
    const response = await fetch(panel.dataset.endpoint, { credentials: 'same-origin', cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
    return data;
  }

  async function request(service, action) {
    if (timer) clearTimeout(timer);
    busy = true;
    panel.querySelectorAll('button').forEach(button => { button.disabled = true; });
    if (modelSelect) modelSelect.disabled = true;
    message.textContent = action === 'start' && service === 'llama'
      ? 'モデルを検証し、LLMサーバを起動しています。切替時はworkerの設定も更新します…'
      : action ? 'サービスを操作しています…' : '状態を確認しています…';
    try {
      let data;
      if (action) {
        const body = { service, action };
        if (service === 'llama' && action === 'start' && latest?.model_switch_supported) body.model_id = modelSelect.value;
        const response = await fetch(panel.dataset.endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Kobun-CSRF': panel.dataset.csrf },
          body: JSON.stringify(body), credentials: 'same-origin',
        });
        data = await response.json();
        if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
      } else data = await fetchStatus();
      busy = false;
      render(data);
      message.textContent = data.llama.running && !data.llama.ready ? 'モデルを読み込んでいます。準備状態は自動で更新します。'
        : action ? '操作が完了しました。' : '';
    } catch (error) {
      busy = false;
      try { render(await fetchStatus()); }
      catch {
        latest = null;
        rows.forEach(row => {
          row.querySelector('.kobun-service-status').textContent = '確認できません';
          row.querySelectorAll('button').forEach(button => { button.disabled = true; });
        });
        if (modelSelect) modelSelect.disabled = true;
      }
      message.textContent = error.message;
    } finally {
      refresh.disabled = false;
      if (latest && (latest.operation || (latest.llama.running && !latest.llama.ready)
        || (latest.worker.running && !latest.worker.responding))) timer = setTimeout(() => request(), 2000);
    }
  }

  modelSelect?.addEventListener('change', () => { if (latest) render(latest); });
  panel.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || busy || button.disabled) return;
    if (button.dataset.action) request(button.closest('[data-service]').dataset.service, button.dataset.action);
    else if (button.id === 'kobun-service-refresh') request();
  });
  request();
})();
