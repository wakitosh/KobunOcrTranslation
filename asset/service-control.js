(() => {
  const panel = document.getElementById('kobun-service-control');
  if (!panel) return;
  const message = panel.querySelector('#kobun-service-message');
  const rows = [...panel.querySelectorAll('[data-service]')];
  let busy = false;

  function render(data) {
    for (const row of rows) {
      const service = data[row.dataset.service];
      const status = row.querySelector('.kobun-service-status');
      if (!service) {
        status.textContent = '状態不明';
        continue;
      }
      const words = [service.running ? '稼働中' : service.managed ? '起動待ち' : '停止中'];
      if (row.dataset.service === 'worker' && service.running) {
        words.push(service.ocr_ready ? 'OCR準備済み' : service.responding ? 'OCR未準備' : '応答待ち');
        if (service.pending !== null) words.push(`処理中 ${service.pending} 件`);
      }
      if (row.dataset.service === 'llama' && service.running) {
        words.push(service.ready ? '応答可能' : 'モデル読込中');
        if (service.model) words.push(service.model);
      }
      status.textContent = words.join(' ・ ');
      for (const button of row.querySelectorAll('[data-action]')) {
        button.disabled = busy || (button.dataset.action === 'start' && service.running)
          || (button.dataset.action === 'stop' && !service.running && !service.managed)
          || (button.dataset.action !== 'start' && service.running && !service.managed)
          || (button.dataset.action !== 'start' && (data.worker.pending || 0) > 0);
      }
    }
  }

  async function request(service, action) {
    busy = true;
    panel.querySelectorAll('button').forEach((button) => { button.disabled = true; });
    message.textContent = action ? 'サービスを操作しています…' : '状態を確認しています…';
    try {
      const response = await fetch(panel.dataset.endpoint, {
        method: action ? 'POST' : 'GET',
        headers: action ? { 'Content-Type': 'application/json', 'X-Kobun-CSRF': panel.dataset.csrf } : {},
        body: action ? JSON.stringify({ service, action }) : undefined,
        credentials: 'same-origin',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
      busy = false;
      render(data);
      message.textContent = action ? '操作を受け付けました。起動後の準備状態は「状態を更新」で確認できます。' : '';
    } catch (error) {
      busy = false;
      rows.forEach((row) => {
        row.querySelector('.kobun-service-status').textContent = '確認できません';
        row.querySelectorAll('button').forEach((button) => { button.disabled = true; });
      });
      message.textContent = error.message;
    } finally {
      panel.querySelector('#kobun-service-refresh').disabled = false;
    }
  }

  panel.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || busy) return;
    const action = button.dataset.action;
    if (action) request(button.closest('[data-service]').dataset.service, action);
    else if (button.id === 'kobun-service-refresh') request();
  });
  request();
})();
