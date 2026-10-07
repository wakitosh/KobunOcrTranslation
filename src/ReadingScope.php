<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

use Laminas\Session\Container;

/** Bind each page's nonce to the Omeka browser session, without exposing its ID. */
final class ReadingScope
{
    public static function token(): string
    {
        return bin2hex(random_bytes(32));
    }

    public static function derive(string $token, string $secret): string
    {
        if (!preg_match('/\A[a-f0-9]{64}\z/', $token)) {
            throw new \RuntimeException('閲覧画面の情報が無効です。ページを再読み込みしてください。', 403);
        }
        if (strlen(trim($secret)) < 32) {
            throw new \RuntimeException('閲覧支援の接続設定を確認してください。', 503);
        }
        $manager = (new Container('kobun_ocr_public_scopes'))->getManager();
        $manager->start();
        return hash_hmac('sha256', $manager->getId() . ':' . $token, trim($secret));
    }
}
