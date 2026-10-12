<?php
declare(strict_types=1);
namespace KobunOcrTranslation;

use Laminas\Http\Client;

/** Store confirmed OS caps; never automatically resize an existing service. */
final class ResourcePolicy
{
    public const SETTING = 'kobun_ocr_resource_policy';

    public static function validate($value): array
    {
        if (!is_array($value) || count($value) !== 2 || array_diff(array_keys($value), ['cpu_quota', 'memory_max_mib'])) {
            throw new \InvalidArgumentException('CPU・メモリ上限の項目が不正です。');
        }
        $result = [];
        foreach ($value as $key => $number) {
            if (!is_int($number) && !(is_string($number) && preg_match('/\A[0-9]{1,7}\z/', $number))) {
                throw new \InvalidArgumentException('CPU・メモリ上限は数値で指定してください。');
            }
            $result[$key] = (int) $number;
        }
        if ($result['cpu_quota'] < 1 || $result['cpu_quota'] > 6400 || $result['memory_max_mib'] < 256
            || $result['memory_max_mib'] > 1048576 || $result['memory_max_mib'] % 256) {
            throw new \InvalidArgumentException('CPUは1～6400%、メモリは0.25～1024 GiB（0.25 GiB単位）で指定してください。');
        }
        return ['cpu_quota' => $result['cpu_quota'], 'memory_max_mib' => $result['memory_max_mib']];
    }

    public static function fromForm($value): array
    {
        if (!is_array($value) || count($value) !== 2 || array_diff(array_keys($value), ['cpu_quota', 'memory_gib'])
            || !is_string($value['memory_gib']) || !preg_match('/\A[0-9]{1,4}(?:\.[0-9]{1,2})?\z/', $value['memory_gib'])) {
            throw new \InvalidArgumentException('CPU・メモリ上限の入力が不正です。');
        }
        return self::validate(['cpu_quota' => $value['cpu_quota'], 'memory_max_mib' => (int) round((float) $value['memory_gib'] * 1024)]);
    }

    public static function load($settings): ?array
    {
        try { return self::validate($settings->get(self::SETTING)); }
        catch (\InvalidArgumentException $e) { return null; }
    }

    public static function observe($settings, array $status): void
    {
        if (self::load($settings) !== null || empty($status['resources']['supported'])) { return; }
        try { $settings->set(self::SETTING, self::validate($status['resources']['applied'])); }
        catch (\InvalidArgumentException $e) { /* Unbounded/unavailable OS caps must not be represented as enforced limits. */ }
    }

    public static function initialize($settings, array $options): void
    {
        if (self::load($settings) !== null) { return; }
        try { self::observe($settings, self::contact($options)); }
        catch (\Throwable $e) { /* Backend may be installed later; first successful status completes initialization. */ }
    }

    public static function contact(array $options, ?array $policy = null): array
    {
        $token = @file_get_contents($options['token_file']);
        if (!$token) { throw new \RuntimeException('資源上限を反映できません。運用サービスの接続設定を確認してください。'); }
        $client = new Client(rtrim($options['control_url'], '/') . ($policy === null ? '/status' : '/resources'),
            ['timeout' => $policy === null ? 3 : 60, 'maxredirects' => 0]);
        $client->setMethod($policy === null ? 'GET' : 'POST');
        $client->setHeaders(['Authorization' => 'Bearer ' . trim($token)]);
        if ($policy !== null) {
            $client->setEncType('application/json');
            $client->setRawBody(json_encode(self::validate($policy), JSON_THROW_ON_ERROR));
        }
        $response = $client->send();
        $data = json_decode($response->getBody(), true, 16, JSON_THROW_ON_ERROR);
        if (!$response->isSuccess()) {
            throw new \RuntimeException((string) ($data['error'] ?? '資源上限を反映できません。運用サービスを確認してください。'));
        }
        if ($policy !== null && (empty($data['resources']['supported']) || self::validate($data['resources']['applied'] ?? null) !== $policy)) {
            throw new \RuntimeException('設定した資源上限の実値を確認できません。状態を更新して確認してください。');
        }
        return $data;
    }
}
