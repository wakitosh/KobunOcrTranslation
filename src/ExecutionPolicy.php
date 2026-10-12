<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

use Laminas\Http\Client;

final class ExecutionPolicy
{
    public const SETTING = 'kobun_ocr_execution_policy';
    public const BOUNDS = ['ocr_concurrency' => [1, 8], 'llm_concurrency' => [1, 4],
        'total_concurrency' => [1, 8], 'max_waiting' => [0, 64], 'session_pending' => [1, 4]];

    public static function defaults(): array
    {
        return ['ocr_concurrency' => 1, 'llm_concurrency' => 1, 'total_concurrency' => 1,
            'max_waiting' => 3, 'session_pending' => 1];
    }

    public static function load($settings): array
    {
        try {
            return self::validate($settings->get(self::SETTING, self::defaults()));
        } catch (\InvalidArgumentException $e) {
            return self::defaults();
        }
    }

    public static function validate($value): array
    {
        if (!is_array($value) || count($value) !== count(self::BOUNDS)
            || array_diff(array_keys($value), array_keys(self::BOUNDS))) {
            throw new \InvalidArgumentException('同時実行設定が不正です。設定画面を再読み込みしてください。');
        }
        $result = [];
        foreach (self::BOUNDS as $key => [$low, $high]) {
            $number = $value[$key] ?? null;
            if ((!is_int($number) && !(is_string($number) && preg_match('/\A[0-9]{1,2}\z/', $number)))
                || (int) $number < $low || (int) $number > $high) {
                throw new \InvalidArgumentException('同時実行数・待機件数が指定可能な範囲外です。');
            }
            $result[$key] = (int) $number;
        }
        return $result;
    }

    public static function synchronize(array $options, array $policy): array
    {
        $token = @file_get_contents($options['token_file']);
        if (!$token) {
            throw new \RuntimeException('同時実行設定を反映できません。workerの接続設定を確認してください。', 503);
        }
        $client = new Client(rtrim($options['backend_url'], '/') . '/execution-policy', ['timeout' => 5, 'maxredirects' => 0]);
        $client->setMethod('POST');
        $client->setHeaders(['Authorization' => 'Bearer ' . trim($token)]);
        $client->setEncType('application/json');
        $client->setRawBody(json_encode($policy, JSON_THROW_ON_ERROR));
        $response = $client->send();
        if (!$response->isSuccess()) {
            throw new \RuntimeException('同時実行設定を反映できません。workerを更新・再起動してください。', 503);
        }
        return json_decode($response->getBody(), true, 16, JSON_THROW_ON_ERROR);
    }
}
