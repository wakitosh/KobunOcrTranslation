<?php
declare(strict_types=1);
require __DIR__ . '/../src/ClientAddress.php';
use KobunOcrTranslation\ClientAddress as Address;

$checks = 0;
function check(bool $condition): void {
    global $checks;
    if (!$condition) { throw new RuntimeException('Client address check failed'); }
    $checks++;
}
$direct = ['REMOTE_ADDR' => '203.0.113.5', 'HTTP_X_FORWARDED_FOR' => '198.51.100.9'];
check(Address::resolve($direct, []) === '203.0.113.5');
check(Address::resolve($direct, ['10.0.0.1']) === '203.0.113.5');
$proxied = ['REMOTE_ADDR' => '10.0.0.1', 'HTTP_X_FORWARDED_FOR' => '198.51.100.9'];
check(Address::resolve($proxied, ['10.0.0.1']) === '198.51.100.9');
check(Address::resolve($proxied, []) === '10.0.0.1');
// A forged first entry is ignored: the visitor is the last untrusted hop.
$forged = ['REMOTE_ADDR' => '10.0.0.1', 'HTTP_X_FORWARDED_FOR' => '1.2.3.4, 198.51.100.9'];
check(Address::resolve($forged, ['10.0.0.1']) === '198.51.100.9');
$chain = ['REMOTE_ADDR' => '10.0.0.1', 'HTTP_X_FORWARDED_FOR' => '198.51.100.9, 10.0.0.2'];
check(Address::resolve($chain, ['10.0.0.1', '10.0.0.2']) === '198.51.100.9');
check(Address::resolve(['REMOTE_ADDR' => '10.0.0.1', 'HTTP_X_FORWARDED_FOR' => 'nonsense'], ['10.0.0.1']) === '10.0.0.1');
check(Address::resolve(['REMOTE_ADDR' => '10.0.0.1'], ['10.0.0.1']) === '10.0.0.1');
check(Address::resolve([], []) === '');

$secret = str_repeat('s', 40);
check(preg_match('/\A[a-f0-9]{64}\z/', Address::key('203.0.113.5', $secret)) === 1);
check(Address::key('203.0.113.5', $secret) !== Address::key('203.0.113.6', $secret));
check(Address::key('203.0.113.5', $secret) !== Address::key('203.0.113.5', strrev($secret) . 'x'));
check(Address::key('2001:db8:1:2:aaaa::1', $secret) === Address::key('2001:db8:1:2:bbbb::2', $secret));
check(Address::key('2001:db8:1:2::1', $secret) !== Address::key('2001:db8:1:3::1', $secret));
echo "$checks client address checks passed\n";
