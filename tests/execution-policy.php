<?php
declare(strict_types=1);
require dirname(__DIR__, 3) . '/vendor/autoload.php';
require __DIR__ . '/../src/ExecutionPolicy.php';
require __DIR__ . '/../src/Controller/ReadingController.php';
use KobunOcrTranslation\ExecutionPolicy as Policy;

$checks = 0;
function check(bool $condition): void {
    global $checks;
    if (!$condition) { throw new RuntimeException('Execution policy check failed'); }
    $checks++;
}
$settings = new class {
    public $value = null;
    public function get($key, $default = null) { return $this->value ?? $default; }
};
$defaults = Policy::defaults();
check(Policy::load($settings) === $defaults);
check($defaults === ['ocr_concurrency' => 1, 'llm_concurrency' => 1, 'total_concurrency' => 1, 'max_waiting' => 3, 'session_pending' => 1]);
check(Policy::validate(array_map('strval', $defaults)) === $defaults);
foreach ([['ocr_concurrency' => 0], ['llm_concurrency' => 5], ['total_concurrency' => true],
    ['max_waiting' => -1], ['session_pending' => '1e2'], ['unexpected' => 1]] as $change) {
    try { Policy::validate(array_replace($defaults, $change)); check(false); }
    catch (InvalidArgumentException $e) { check(true); }
}
check(Policy::validate(array_replace($defaults, ['max_waiting' => '0']))['max_waiting'] === 0);
$settings->value = ['damaged' => 100];
check(Policy::load($settings) === $defaults);

// Busy reasons survive the PHP adapter; worker details and admission identities do not.
$controller = new \KobunOcrTranslation\Controller\ReadingController();
$decode = new ReflectionMethod($controller, 'decode');
$errorData = new ReflectionMethod($controller, 'errorData');
foreach (['queue_full', 'session_busy'] as $reason) {
    $response = new class($reason) {
        public function __construct(private string $reason) {}
        public function getBody() { return json_encode(['error' => '混雑案内', 'error_reason' => $this->reason, 'request_scope' => 'secret-scope']); }
        public function isSuccess() { return false; }
        public function getStatusCode() { return 429; }
    };
    try { $decode->invoke($controller, $response); check(false); }
    catch (\KobunOcrTranslation\Controller\ExecutionBusyException $e) {
        check($e->getCode() === 429 && $errorData->invoke($controller, $e, 'fallback')
            === ['error' => '混雑案内', 'error_reason' => $reason]);
    }
}
echo "$checks execution policy checks passed\n";
