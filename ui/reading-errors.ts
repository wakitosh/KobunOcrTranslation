/** Public reading controls have no text editor, line selection or server settings.
 * Normalize both saved worker errors and live responses at the presentation boundary.
 * Editorial screens keep the original errors with their own available controls.
 */
export function publicReadingError(error: unknown, translation = true): string {
  const raw = error instanceof Error ? error.message : String(error || '');
  const text = raw.replace(/^(?:ValueError|RuntimeError|Problem):\s*/, '');
  const help = '時間を置いても解消しない場合は、サイトの管理者にお問い合わせください。';
  if (/文脈上限|本文.*16000|送信する本文は/.test(text)) {
    return 'このページの本文は、現代語訳サービスが対応する文字数の範囲外です。';
  }
  if (/(?:訳|訳文).*途中.*終了|(?:訳文|現代語訳).*完了しませんでした|出力上限/.test(text)) {
    return '現代語訳の生成が最後まで完了しませんでした。';
  }
  if (/原文と(?:ほぼ)?同じ出力|現代語訳として採用しませんでした/.test(text)) {
    return '現代語訳として十分な結果が得られなかったため、訳を表示できませんでした。';
  }
  if (/URLError|<urlopen error|Connection refused|翻訳サーバに接続/.test(text)) {
    return translation
      ? '現代語訳のサービスに接続できませんでした。しばらくしてからお試しください。翻刻は閲覧できます。'
      : '閲覧支援のサービスに接続できませんでした。しばらくしてからお試しください。';
  }
  if (/先に(?:文字認識|レイアウト)|未認識の行/.test(text)) {
    return '現代語訳を作る前に、「このページを翻刻する」から翻刻を表示してください。';
  }
  if (/範囲を|選択行|本文の範囲|翻訳条件|実行記録|ログを|モデル.*(?:導入|指定|変更|確認|見直)|接続設定|設定を確認|対話形式|訳文の直接入力|ブラウザの外部通信制限|API側のブラウザ接続対応|sampling|top_k/.test(text)) {
    return translation ? `現代語訳のサービスは現在利用できません。${help}` : `画像の読み取りを完了できませんでした。${help}`;
  }
  if (/POSTで送信/.test(text)) return '操作を受け付けられませんでした。ページを再読み込みしてお試しください。';
  return text || (translation ? '現代語訳を作成できませんでした。' : '画像の読み取りを完了できませんでした。');
}
