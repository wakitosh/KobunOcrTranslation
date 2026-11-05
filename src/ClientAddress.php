<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

/** The network address a public request is counted against. */
final class ClientAddress
{
    /** X-Forwarded-For is a client-supplied header unless a known proxy added it. */
    public static function resolve(array $server, array $trustedProxies): string
    {
        $remote = (string) ($server['REMOTE_ADDR'] ?? '');
        if (!in_array($remote, $trustedProxies, true)) {
            return $remote;
        }
        // Each proxy appends what it saw, so the last address it was not given
        // by another trusted proxy is the visitor.
        $hops = explode(',', (string) ($server['HTTP_X_FORWARDED_FOR'] ?? ''));
        foreach (array_reverse(array_map('trim', $hops)) as $hop) {
            if (!filter_var($hop, FILTER_VALIDATE_IP)) {
                break;
            }
            if (!in_array($hop, $trustedProxies, true)) {
                return $hop;
            }
        }
        return $remote;
    }

    /** One IPv6 visitor usually controls a whole /64, so that is what counts. */
    public static function key(string $address, string $secret): string
    {
        $packed = @inet_pton($address);
        if ($packed !== false && strlen($packed) === 16) {
            $address = bin2hex(substr($packed, 0, 8));
        }
        return hash_hmac('sha256', 'client:' . $address, $secret);
    }
}
