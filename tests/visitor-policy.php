<?php
declare(strict_types=1);

// Use Omeka's installed dependencies, but no application bootstrap, database or network.
require dirname(__DIR__, 3) . '/vendor/autoload.php';
require __DIR__ . '/../src/VisitorLlmPolicy.php';
require __DIR__ . '/../Module.php';
require __DIR__ . '/../src/Controller/ReadingController.php';

use KobunOcrTranslation\VisitorLlmPolicy as Policy;
use Laminas\EventManager\EventManager;
use Laminas\Mvc\Application;
use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\Mvc\MvcEvent;
use Laminas\ServiceManager\ServiceManager;
use Laminas\Validator\Csrf;

$checks = 0;
function check(bool $condition, string $label): void
{
    global $checks;
    if (!$condition) {
        throw new RuntimeException($label);
    }
    $checks++;
}
function rejects(array $policy): void
{
    try {
        Policy::validate($policy);
    } catch (InvalidArgumentException $e) {
        check(true, 'invalid configuration rejected');
        return;
    }
    check(false, 'invalid configuration accepted');
}
class MemorySettings
{
    public array $values = [];
    public function get($key, $default = null) { return $this->values[$key] ?? $default; }
    public function set($key, $value) { $this->values[$key] = $value; }
}
class ConfigController extends AbstractActionController
{
    public array $posted;
    public array $errors = [];
    public function params() { return new class($this->posted) {
        private array $posted;
        public function __construct(array $posted) { $this->posted = $posted; }
        public function fromPost($key, $default = null) { return $this->posted[$key] ?? $default; }
    }; }
    public function messenger() { return $this; }
    public function addError($message) { $this->errors[] = $message; }
}
$settings = new MemorySettings();
check(Policy::load($settings) === Policy::defaults(), 'existing installations keep their defaults');
rejects(array_replace(Policy::defaults(), ['providers' => []]));
rejects(array_replace(Policy::defaults(), ['providers' => [['local']]]));
rejects(array_replace(Policy::defaults(), ['storage_modes' => ['plain']]));
rejects(array_replace(Policy::defaults(), ['models' => ['openai' => 'bad/id']]));
rejects(array_replace(Policy::defaults(), ['model_choice' => false]));
check(Policy::validate(array_replace(Policy::defaults(), ['form_enabled' => false]))['default_provider'] === 'local',
    'hiding the form alone keeps local operation without unused commercial model IDs');
check(Policy::validate(array_replace(Policy::defaults(), ['model_choice' => false, 'provider_choice' => false]))['default_provider'] === 'local',
    'fixing provider to local does not require models for unavailable commercial choices');

$policy = array_replace(Policy::defaults(), ['providers' => ['openai'], 'storage_modes' => ['plain'],
    'default_provider' => 'openai', 'default_storage' => 'plain']);
$controller = new ConfigController();
$controller->posted = [Policy::SETTING => $policy, 'kobun_ocr_llm_model_profile' => 'qwen35-9b-q4km'];
$services = new ServiceManager(['services' => [
    'Omeka\Settings' => $settings,
    'Omeka\Acl' => new class { public function getRoleLabels($all) { return ['global_admin' => 'Admin', 'editor' => 'Editor']; } },
]]);
$module = new \KobunOcrTranslation\Module();
$module->setServiceLocator($services);
check($module->handleConfigForm($controller), 'module form saves valid configuration');
check(Policy::load($settings) === Policy::validate($policy), 'policy round trips through Omeka settings');
$before = $settings->values;
$controller->posted[Policy::SETTING]['default_storage'] = 'encrypted';
check(!$module->handleConfigForm($controller), 'module form rejects incompatible default');
check($settings->values === $before && count($controller->errors) === 1, 'invalid form leaves all settings unchanged');
$settings->set(Policy::SETTING, ['providers' => []]);
check(!Policy::load($settings)['form_enabled'] && Policy::load($settings)['providers'] === ['local'], 'damaged settings close commercial access');

// Exercise the actual HTTP action: valid CSRF, no database or backend request.
foreach ([
    $policy,
    array_replace(Policy::defaults(), ['provider_choice' => false, 'default_provider' => 'openai']),
    array_replace(Policy::defaults(), ['form_enabled' => false, 'default_provider' => 'openai',
        'models' => ['openai' => 'fixed', 'anthropic' => 'fixed', 'google' => 'fixed']]),
] as $restricted) {
    $global = new MemorySettings();
    $global->set(Policy::SETTING, $restricted);
    $site = new MemorySettings();
    $site->set('kobun_ocr_public_translation_enabled', true);
    $services = new ServiceManager(['services' => [
        'Omeka\Settings' => $global, 'Omeka\Settings\Site' => $site,
        'Omeka\Site\ThemeManager' => new class { public function getCurrentTheme() { return 'fixture'; } },
        'Omeka\ResourcePageBlockLayoutManager' => new class {
            public function getResourcePageBlocks($theme) { return ['items' => [['kobunReadingAssistance']]]; }
        },
    ]]);
    $reading = new \KobunOcrTranslation\Controller\ReadingController();
    $request = $reading->getRequest();
    $request->setMethod('POST')->setContent('{"id":"1234567890abcdef12345678","operation":"translate"}');
    $request->getHeaders()->addHeaderLine('X-Kobun-CSRF', (new Csrf(['name' => 'kobun_ocr_public', 'timeout' => 3600]))->getHash());
    $event = new MvcEvent();
    $event->setApplication(new Application($services, new EventManager(), $request, $reading->getResponse()));
    $reading->setEvent($event);
    $response = $reading->runAction();
    check($response->getStatusCode() === 403, 'crafted request cannot start a disallowed local LLM');
    check(str_contains($response->getContent(), 'ローカルLLMを利用できません'), 'denial happens before any document/backend lookup');
}
check(Policy::allowsLocal(Policy::defaults()), 'local LLM remains available by default');
check(Policy::allowsLocal(array_replace(Policy::defaults(), ['form_enabled' => false, 'providers' => ['local']])),
    'hiding visitor settings does not disable default local LLM');
echo "$checks checks passed\n";
