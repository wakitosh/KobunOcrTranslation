<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

use Laminas\Http\Client;

final class ReadingCachePolicy
{
    public const SETTING = 'kobun_ocr_reading_cache_policy';
    public const BOUNDS = [
        'ocr_ttl_hours' => [1, 720], 'translation_ttl_minutes' => [1, 1440],
        'private_ttl_minutes' => [1, 1440], 'max_documents' => [4, 100000], 'max_megabytes' => [16, 1048576],
    ];

    public static function defaults(): array
    {
        return ['ocr_mode' => 'shared', 'ocr_ttl_hours' => 24,
            'translation_mode' => 'private', 'translation_ttl_minutes' => 60,
            'private_ttl_minutes' => 60, 'max_documents' => 1000, 'max_megabytes' => 1024];
    }

    public static function load($settings): array
    {
        $value = $settings->get(self::SETTING);
        if ($value === null) {
            return self::defaults();
        }
        try {
            return self::validate($value);
        } catch (\InvalidArgumentException $e) {
            return array_replace(self::defaults(), ['ocr_mode' => 'private']);
        }
    }

    public static function validate($value): array
    {
        if (!is_array($value) || count($value) !== count(self::defaults())
            || array_diff(array_keys($value), array_keys(self::defaults()))) {
            throw new \InvalidArgumentException('閲覧支援の一時保存設定が不正です。設定画面を再読み込みしてください。');
        }
        $policy = [];
        foreach (['ocr_mode', 'translation_mode'] as $name) {
            if (!in_array($value[$name] ?? null, ['private', 'shared'], true)) {
                throw new \InvalidArgumentException('一時保存の共有方法が不正です。');
            }
            $policy[$name] = $value[$name];
        }
        foreach (self::BOUNDS as $name => [$minimum, $maximum]) {
            $number = $value[$name] ?? null;
            if ((!is_int($number) && !(is_string($number) && preg_match('/\A[0-9]{1,7}\z/', $number)))
                || (int) $number < $minimum || (int) $number > $maximum) {
                throw new \InvalidArgumentException('一時保存の時間・件数・容量が指定可能な範囲外です。');
            }
            $policy[$name] = (int) $number;
        }
        return $policy;
    }

    public static function synchronize(array $options, array $policy): void
    {
        $token = @file_get_contents($options['token_file']);
        if (!$token) {
            throw new \RuntimeException('一時保存設定を反映できません。workerの接続設定を確認してください。', 503);
        }
        $client = new Client(rtrim($options['backend_url'], '/') . '/cache-policy', ['timeout' => 15, 'maxredirects' => 0]);
        $client->setMethod('POST');
        $client->setHeaders(['Authorization' => 'Bearer ' . trim($token)]);
        $client->setEncType('application/json');
        $client->setRawBody(json_encode($policy, JSON_THROW_ON_ERROR));
        if (!$client->send()->isSuccess()) {
            throw new \RuntimeException('一時保存設定を反映できません。workerを更新・再起動してください。', 503);
        }
    }
}
