<?php
declare(strict_types=1);

// Operator-created deployment settings, outside the web tree. No secrets here.
// config/local.config.php remains the final Omeka configuration override.
$file = getenv('KOBUN_BACKEND_CONFIG') ?: '/opt/kobun-ocr-translation/php/backend.json';
if (!is_readable($file)) {
    return [];
}
$deployment = json_decode((string) file_get_contents($file), true);
if (!is_array($deployment)) {
    return [];
}
$settings = [];
foreach (['backend_url' => 'KOBUN_BACKEND_URL', 'control_url' => 'KOBUN_CONTROL_URL', 'token_file' => 'KOBUN_TOKEN_FILE'] as $name => $environment) {
    $value = $deployment[$name] ?? null;
    if (!is_string($value) || preg_match('/[\x00-\x1f]/', $value)
        || ($name === 'token_file' ? !str_starts_with($value, '/') : !preg_match('~\Ahttp://127\.0\.0\.1:[0-9]{1,5}\z~', $value))) {
        return [];
    }
    if (!getenv($environment)) {
        $settings[$name] = $value;
    }
}
foreach (['image_hosts', 'resource_hosts'] as $name) {
    $values = $deployment[$name] ?? null;
    if (!is_array($values) || !$values) {
        return [];
    }
    foreach ($values as $value) {
        if (!is_string($value) || !preg_match('/\A[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?\z/', $value) || str_contains($value, '..')) {
            return [];
        }
    }
    $settings[$name] = array_values(array_unique($values));
}
return $settings;
