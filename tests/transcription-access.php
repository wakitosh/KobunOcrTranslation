<?php
declare(strict_types=1);
require dirname(__DIR__, 3) . '/vendor/autoload.php';
require __DIR__ . '/../src/TranscriptionAccess.php';
require __DIR__ . '/../src/Controller/WorkspaceController.php';
use KobunOcrTranslation\TranscriptionAccess as Access;

$checks = 0;
function check(bool $condition): void {
    global $checks;
    if (!$condition) { throw new RuntimeException('Transcription access check failed'); }
    $checks++;
}
$settings = new class {
    public array $values = [];
    public function get($name, $default = null) { return $this->values[$name] ?? $default; }
};
function user(string $role, int $id = 7) {
    return new class($role, $id) {
        public function __construct(private string $role, private int $id) {}
        public function getRole() { return $this->role; }
        public function getId() { return $this->id; }
    };
}
function item(?int $ownerId) {
    return new class($ownerId) {
        public function __construct(private ?int $ownerId) {}
        public function owner() {
            return $this->ownerId === null ? null : new class($this->ownerId) {
                public function __construct(private int $ownerId) {}
                public function id() { return $this->ownerId; }
            };
        }
    };
}
foreach ([null, user('researcher'), user('author'), user('guest')] as $identity) {
    check(!Access::canEdit($settings, $identity));
    check(!Access::canAccessItem($settings, $identity, item(7)));
}
foreach (['global_admin', 'site_admin'] as $role) {
    check(Access::canEdit($settings, user($role)));
    check(Access::scope($settings, user($role)) === 'all');
    foreach ([7, 8, null] as $ownerId) check(Access::canAccessItem($settings, user($role), item($ownerId)));
}
$settings->values['kobun_ocr_transcription_roles'] = ['researcher'];
check(Access::canEdit($settings, user('researcher')));
check(Access::scope($settings, user('researcher')) === 'owned');
check(Access::canAccessItem($settings, user('researcher'), item(7)));
check(!Access::canAccessItem($settings, user('researcher'), item(8)));
check(!Access::canAccessItem($settings, user('researcher'), item(null)));
$settings->values['kobun_ocr_transcription_scopes'] = ['researcher' => 'all', 'guest' => 'all'];
check(Access::canAccessItem($settings, user('researcher'), item(8)));
check(Access::canAccessItem($settings, user('researcher'), item(null)));
check(!Access::canAccessItem($settings, user('guest'), item(7)));
check(!Access::canAccessItem($settings, null, item(7)));
$settings->values['kobun_ocr_transcription_scopes']['researcher'] = 'invalid';
check(Access::scope($settings, user('researcher')) === 'owned');
check(!Access::canAccessItem($settings, user('researcher'), item(8)));

// Exercise the actual pages action without an Omeka database or backend. The
// order deliberately differs from media id order, as real manifests can do.
$material = new class {
    public array $images = [];
    public function id() { return 10; }
    public function value($term) { return 'rb_test'; }
    public function displayTitle() { return '資料'; }
    public function owner() { return new class { public function id() { return 8; } }; }
    public function media() { return $this->images; }
};
foreach ([999, 998, ...range(300, 181)] as $id) {
    $material->images[] = new class($id, $material) {
        public function __construct(private int $id, private $material) {}
        public function id() { return $this->id; }
        public function isPublic() { return $this->id !== 999; }
        public function ingester() { return $this->id === 998 ? 'upload' : 'iiif'; }
        public function item() { return $this->material; }
        public function displayTitle() { return '画像' . $this->id; }
        public function mediaData() { return ['id' => 'https://images.test/' . $this->id]; }
    };
}
$authentication = new class {
    public $identity;
    public function getIdentity() { return $this->identity; }
};
$services = new \Laminas\ServiceManager\ServiceManager(['services' => [
    'Omeka\Settings' => $settings,
    'Omeka\AuthenticationService' => $authentication,
    'Omeka\ModuleManager' => new class { public function getModule($name) { return null; } },
    'Config' => ['kobun_ocr' => ['image_hosts' => ['images.test']]],
]]);
$app = new \Laminas\Mvc\Application($services, new \Laminas\EventManager\EventManager(),
    new \Laminas\Http\Request(), new \Laminas\Http\Response());
function pages($app, $material, array $query) {
    $controller = new class($material, $query) extends \KobunOcrTranslation\Controller\WorkspaceController {
        public function __construct(private $material, private array $query) {}
        public function params() { return new class($this->query) {
            public function __construct(private array $query) {}
            public function fromQuery($key, $default = null) { return $this->query[$key] ?? $default; }
        }; }
        public function api() { return $this; }
        public function read($resource, $id) {
            if ($resource !== 'items' || $id !== 10) throw new RuntimeException('Unknown item');
            return new class($this->material) {
                public function __construct(private $material) {}
                public function getContent() { return $this->material; }
            };
        }
    };
    $controller->setEvent((new \Laminas\Mvc\MvcEvent())->setApplication($app));
    return $controller->pagesAction();
}
$authentication->identity = user('global_admin');
foreach (['300' => [1, 1], '201' => [1, 100], '200' => [2, 101], '181' => [2, 120]] as $id => [$page, $position]) {
    $response = pages($app, $material, ['item_id' => '10', 'media_id' => (string) $id]);
    $data = json_decode($response->getContent(), true, 16, JSON_THROW_ON_ERROR);
    check($response->getStatusCode() === 200 && $data['page'] === $page && $data['total'] === 120);
    $row = array_values(array_filter($data['pages'], fn ($row) => $row['media_id'] === (int) $id))[0];
    check($row['position'] === $position && $row['item_id'] === 10);
}
$response = pages($app, $material, ['item_id' => '10', 'page' => '2']);
$data = json_decode($response->getContent(), true);
check($response->getStatusCode() === 200 && $data['pages'][0]['media_id'] === 200);
foreach (['999', '998', '1', '0', '-1', 'not-an-id', ['200']] as $id) {
    check(pages($app, $material, ['item_id' => '10', 'media_id' => $id])->getStatusCode() === 400);
}
$authentication->identity = user('researcher');
$settings->values['kobun_ocr_transcription_scopes']['researcher'] = 'owned';
check(pages($app, $material, ['item_id' => '10', 'media_id' => '200'])->getStatusCode() === 403);
$settings->values['kobun_ocr_transcription_scopes']['researcher'] = 'all';
check(pages($app, $material, ['item_id' => '10', 'media_id' => '200'])->getStatusCode() === 200);
$authentication->identity = null;
check(pages($app, $material, ['item_id' => '10', 'media_id' => '200'])->getStatusCode() === 403);
echo "$checks transcription access and page binding checks passed\n";
