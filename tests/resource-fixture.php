<?php
class ResourceFixture {
    public function render() {
        $resourcePolicy = ['cpu_quota' => 200, 'memory_max_mib' => 49152];
        include __DIR__ . '/../view/kobun-ocr-translation/config/resource-policy.phtml';
    }
}
require __DIR__ . '/../src/ResourcePolicy.php';
echo '<!doctype html><html><meta charset="utf-8"><link rel="stylesheet" href="/modules/KobunOcrTranslation/asset/service-control.css"><fieldset id="kobun-service-control" data-endpoint="/service" data-csrf="fixture">';
(new ResourceFixture())->render();
foreach (['worker','llama'] as $service) {
    echo '<div class="kobun-service-row" data-service="'.$service.'"><strong>'.$service.'</strong><span class="kobun-service-status"></span><button type="button" data-action="start">起動</button><button type="button" data-action="stop">停止</button></div>';
}
echo '<button id="kobun-service-refresh" type="button">状態を更新</button><p id="kobun-service-message" role="status"></p></fieldset><script src="/modules/KobunOcrTranslation/asset/service-control.js"></script></html>';
