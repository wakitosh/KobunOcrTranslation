(() => {
  const root = document.querySelector('#kobun-reading-cache-policy');
  if (!root) return;
  const button = root.querySelector('.kobun-cache-refresh'), status = root.querySelector('.kobun-cache-status');
  const refresh = async () => {
    button.disabled = true;
    try {
      const response = await fetch(root.dataset.endpoint, { credentials: 'same-origin', cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '一時保存の使用状況を取得できません。');
      status.textContent = `使用中: ${data.documents.toLocaleString()}件 · ${(data.bytes / 1024**2).toFixed(1)} MiB ／ 上限: ${data.policy.max_documents.toLocaleString()}件 · ${data.policy.max_megabytes.toLocaleString()} MiB。処理中: ${data.pending}件。`;
    } catch (error) { status.textContent = error.message; }
    finally { button.disabled = false; }
  };
  button.addEventListener('click', refresh);
  void refresh();
})();
