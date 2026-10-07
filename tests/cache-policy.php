<?php
declare(strict_types=1);

// No application database, backend service, real credentials or network.
require dirname(__DIR__, 3) . '/vendor/autoload.php';
require __DIR__ . '/../src/ReadingCachePolicy.php';
require __DIR__ . '/../src/ReadingScope.php';
require __DIR__ . '/../src/VisitorLlmPolicy.php';
require __DIR__ . '/../Module.php';

use KobunOcrTranslation\ReadingCachePolicy as Policy;
use KobunOcrTranslation\ReadingScope;
use Laminas\Session\Container;
use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\ServiceManager\ServiceManager;

$checks = 0;
function check(bool $value, string $label): void {
    global $checks;
    if (!$value) throw new RuntimeException($label);
    $checks++;
}
$settings = new class {
    public $value = null;
    public function get($key) { return $this->value; }
};
$defaults = Policy::defaults();
check(Policy::load($settings) === $defaults, 'initial settings');
check($defaults['ocr_ttl_hours'] === 24 && $defaults['translation_mode'] === 'private'
    && $defaults['private_ttl_minutes'] === 60, 'initial policy');
$posted = array_map('strval', $defaults);
check(Policy::validate($posted) == $defaults, 'form strings become integer limits');
foreach ([['ocr_ttl_hours' => 0], ['private_ttl_minutes' => 1441], ['max_documents' => true],
    ['max_megabytes' => '1e3'], ['translation_mode' => 'forever'], ['extra' => 1]] as $invalid) {
    try {
        Policy::validate(array_replace($defaults, $invalid));
        check(false, 'invalid policy accepted');
    } catch (InvalidArgumentException $e) { check(true, 'invalid policy rejected'); }
}
$settings->value = ['damaged' => true];
check(Policy::load($settings)['ocr_mode'] === 'private'
    && Policy::load($settings)['translation_mode'] === 'private', 'damaged policy closes sharing');

$manager = (new Container('scope_test'))->getManager();
$manager->start();
$nonce = ReadingScope::token();
$secret = str_repeat('s', 64);
$own = ReadingScope::derive($nonce, $secret);
check(preg_match('/\A[a-f0-9]{64}\z/', $own) === 1, 'opaque worker scope');
check(ReadingScope::derive($nonce, $secret) === $own, 'same view and browser scope');
check(ReadingScope::derive(ReadingScope::token(), $secret) !== $own, 'separate view scope');
$manager->regenerateId();
check(ReadingScope::derive($nonce, $secret) !== $own, 'same nonce in another session cannot read private output');
try {
    ReadingScope::derive('invalid', $secret); check(false, 'invalid nonce accepted');
} catch (RuntimeException $e) { check($e->getCode() === 403, 'invalid nonce denied'); }
$manager->destroy();

class CacheSettings {
    public array $values = [];
    public function get($key, $default = null) { return $this->values[$key] ?? $default; }
    public function set($key, $value) { $this->values[$key] = $value; }
}
class CacheConfigController extends AbstractActionController {
    public array $posted = [], $errors = [], $warnings = [];
    public function params() { return new class($this->posted) {
        public function __construct(private array $posted) {}
        public function fromPost($key, $default = null) { return $this->posted[$key] ?? $default; }
    }; }
    public function messenger() { return $this; }
    public function addError($message) { $this->errors[] = $message; }
    public function addWarning($message) { $this->warnings[] = $message; }
}
$global = new CacheSettings();
$auth = new class {
    public string $role = 'global_admin';
    public function getIdentity() { return $this; }
    public function getRole() { return $this->role; }
};
$services = new ServiceManager(['services' => [
    'Omeka\Settings' => $global, 'Omeka\AuthenticationService' => $auth,
    'Omeka\Acl' => new class { public function getRoleLabels($all) { return ['global_admin' => 'Admin', 'site_admin' => 'Site admin']; } },
    // Missing token prevents synchronization without making a network request.
    'Config' => ['kobun_ocr' => ['token_file' => __DIR__ . '/nonexistent-test-token']],
]]);
$module = new \KobunOcrTranslation\Module();
$module->setServiceLocator($services);
$controller = new CacheConfigController();
$controller->posted = [\KobunOcrTranslation\VisitorLlmPolicy::SETTING => \KobunOcrTranslation\VisitorLlmPolicy::defaults(),
    Policy::SETTING => array_replace($posted, ['ocr_mode' => 'private', 'private_ttl_minutes' => '15'])];
check($module->handleConfigForm($controller), 'global administrator saves policy while worker is unavailable');
check(Policy::load($global)['private_ttl_minutes'] === 15 && count($controller->warnings) === 1,
    'save persists policy and reports deferred synchronization');
$before = $global->values;
$controller->posted[Policy::SETTING]['max_documents'] = '0';
check(!$module->handleConfigForm($controller) && $global->values === $before, 'invalid limits leave every setting unchanged');
$auth->role = 'site_admin';
$controller->posted[Policy::SETTING] = $posted;
check($module->handleConfigForm($controller) && $global->values[Policy::SETTING] === $before[Policy::SETTING],
    'non-global administrator cannot forge a cache-policy update');
echo "$checks checks passed\n";
