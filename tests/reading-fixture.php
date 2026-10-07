<?php
// Render the actual public template without a running Omeka instance.
require __DIR__ . '/../src/VisitorLlmPolicy.php';
class ReadingFixture
{
    public function currentSite() { return new class { public function slug() { return 'fixture'; } }; }
    public function assetUrl($name, $module) { return "/modules/$module/asset/$name"; }
    public function escapeHtmlAttr($value) { return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8'); }
    public function url($route, $params) { return '/reading/' . $params['action']; }
    public function render($translationEnabled, $visitorLlmPolicy, $cacheAdministrator = false) {
        $pages = [['id' => 1, 'service' => 'https://images.test/1'], ['id' => 2, 'service' => 'https://images.test/2']];
        $csrf = 'fixture-csrf';
        include __DIR__ . '/../view/kobun-ocr-translation/reading/panel.phtml';
    }
}
echo '<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>閲覧支援テスト</title><body><div id="fixture" class="mirador viewer"></div>';
echo '<script>window.fixtureCanvas="c1";window.fixtureListeners=[];window.miradors={fixture:{store:{getState:()=>({windows:{w:{canvasId:window.fixtureCanvas,manifestId:"m"}},manifests:{m:{json:{items:[{id:"c1",items:[{items:[{body:{service:{id:"https://images.test/1"}}}]}]},{id:"c2",items:[{items:[{body:{service:{id:"https://images.test/2"}}}]}]}]}}}}),subscribe:fn=>{window.fixtureListeners.push(fn);return ()=>{}}}}};</script>';
(new ReadingFixture())->render(($argv[1] ?? '') !== 'disabled',
    isset($argv[2]) ? json_decode($argv[2], true, 16, JSON_THROW_ON_ERROR) : \KobunOcrTranslation\VisitorLlmPolicy::defaults(),
    ($argv[3] ?? '') === 'global_admin');
echo '</body></html>';
