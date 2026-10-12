<?php
declare(strict_types=1);
require dirname(__DIR__, 3) . '/vendor/autoload.php';
require __DIR__ . '/../src/ResourcePolicy.php';
use KobunOcrTranslation\ResourcePolicy as Policy;
$checks = 0;
function check(bool $value): void {
    global $checks;
    if (!$value) throw new RuntimeException('Resource policy check failed');
    $checks++;
}
$cap = ['cpu_quota' => 200, 'memory_max_mib' => 49152];
check(Policy::validate($cap) === $cap);
check(Policy::validate(['memory_max_mib' => '49152', 'cpu_quota' => '200']) === $cap);
check(Policy::fromForm(['cpu_quota' => '200', 'memory_gib' => '48']) === $cap);
check(Policy::fromForm(['cpu_quota' => '150', 'memory_gib' => '42.25']) === ['cpu_quota' => 150, 'memory_max_mib' => 43264]);
foreach ([null, [], array_replace($cap, ['cpu_quota' => true]), array_replace($cap, ['cpu_quota' => 0]),
    array_replace($cap, ['memory_max_mib' => 257]), $cap + ['unit' => 'httpd.service']] as $bad) {
    try { Policy::validate($bad); check(false); } catch (InvalidArgumentException $e) { check(true); }
}
foreach ([['cpu_quota'=>'200','memory_gib'=>'infinity'],['cpu_quota'=>'200','memory_gib'=>'42.1'],
    ['cpu_quota'=>'200','memory_gib'=>true],['cpu_quota'=>'200','memory_gib'=>'48','property'=>'User=root']] as $bad) {
    try { Policy::fromForm($bad); check(false); } catch (InvalidArgumentException $e) { check(true); }
}
$settings = new class {
    public array $values = [];
    public function get($key) { return $this->values[$key] ?? null; }
    public function set($key,$value) { $this->values[$key]=$value; }
};
check(Policy::load($settings) === null);
Policy::observe($settings,['resources'=>['supported'=>false]]);
check(Policy::load($settings) === null);
Policy::observe($settings,['resources'=>['supported'=>true,'applied'=>$cap,'defaults'=>['cpu_quota'=>100,'memory_max_mib'=>8192]]]);
check(Policy::load($settings) === $cap);
Policy::observe($settings,['resources'=>['supported'=>true,'applied'=>['cpu_quota'=>100,'memory_max_mib'=>8192]]]);
check(Policy::load($settings) === $cap);
// Existing settings skip contact and survive an install/upgrade unchanged.
Policy::initialize($settings,[]);
check(Policy::load($settings) === $cap);
$settings->values=[];
Policy::observe($settings,['resources'=>['supported'=>true,'applied'=>['cpu_quota'=>null,'memory_max_mib'=>null]]]);
check(Policy::load($settings) === null);

// Omeka role/CSRF checks reject requests before any upstream resource call.
require __DIR__ . '/../src/Controller/WorkspaceController.php';
$authentication = new class { public $identity; public function getIdentity() { return $this->identity; } };
$services = new Laminas\ServiceManager\ServiceManager(['services'=>['Omeka\AuthenticationService'=>$authentication]]);
$app = new Laminas\Mvc\Application($services,new Laminas\EventManager\EventManager(),new Laminas\Http\Request(),new Laminas\Http\Response());
foreach ([null,'site_admin','researcher','global_admin'] as $role) {
    $authentication->identity = $role === null ? null : new class($role) {
        public function __construct(private string $role) {} public function getRole(){return $this->role;}
    };
    $controller = new KobunOcrTranslation\Controller\WorkspaceController();
    $controller->setEvent((new Laminas\Mvc\MvcEvent())->setApplication($app));
    $controller->getRequest()->setMethod('POST')->setContent(json_encode(['service'=>'resources','action'=>'apply','policy'=>$cap]));
    check($controller->serviceAction()->getStatusCode() === 403);
}
echo "$checks resource policy and authorization checks passed\n";
