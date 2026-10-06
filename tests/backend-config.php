<?php
// Validate the operator-generated settings without touching an Omeka database.
declare(strict_types=1);
$file = tempnam(sys_get_temp_dir(), 'kobun-config-');
putenv('KOBUN_BACKEND_CONFIG=' . $file);
function check($condition) { if (!$condition) { throw new RuntimeException('Backend configuration check failed'); } }
function loadBackend() { return require __DIR__ . '/../config/backend.config.php'; }
try {
    $value = ['backend_url' => 'http://127.0.0.1:8766', 'control_url' => 'http://127.0.0.1:8767',
        'token_file' => '/opt/kobun-ocr-translation/php/backend-token',
        'image_hosts' => ['dc.tulips.tsukuba.ac.jp'], 'resource_hosts' => ['dc.tulips.tsukuba.ac.jp']];
    file_put_contents($file, json_encode($value));
    check(loadBackend() === $value);
    putenv('KOBUN_BACKEND_URL=http://127.0.0.1:9999');
    $loaded = loadBackend();
    check(!isset($loaded['backend_url']) && $loaded['control_url'] === $value['control_url']);
    putenv('KOBUN_BACKEND_URL');
    file_put_contents($file, '{"broken":');
    check(loadBackend() === []);
    $value['token_file'] = "/opt/file\nmalformed";
    file_put_contents($file, json_encode($value));
    check(loadBackend() === []);
    unlink($file);
    check(loadBackend() === []);
    echo "Backend deployment configuration checks passed\n";
} finally {
    putenv('KOBUN_BACKEND_CONFIG');
    if (file_exists($file)) { unlink($file); }
}
