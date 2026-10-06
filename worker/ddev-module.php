<?php
// Local DDEV setup/test helper. Never callable through HTTP.
if (PHP_SAPI !== 'cli' || getenv('IS_DDEV_PROJECT') !== 'true') {
    exit("This helper is only for the local DDEV CLI.\n");
}
require dirname(__DIR__, 3) . '/bootstrap.php';
$app = Omeka\Mvc\Application::init(require OMEKA_PATH . '/application/config/application.config.php');
$services = $app->getServiceManager();
$auth = $services->get('Omeka\AuthenticationService');
$action = $argv[1] ?? '';
$role = in_array($argv[2] ?? '', ['global_admin', 'site_admin', 'editor', 'reviewer', 'author', 'researcher'], true)
    ? $argv[2] : 'global_admin';
$user = $services->get('Omeka\EntityManager')->getRepository(Omeka\Entity\User::class)
    ->findOneBy(['role' => $role, 'isActive' => true]);
if (!$user) { throw new RuntimeException("No active local $role user exists."); }
$roleSnapshot = OMEKA_PATH . '/var/kobun-ocr-translation/test-role-setting.json';
$publicSnapshot = OMEKA_PATH . '/var/kobun-ocr-translation/test-public-setting.json';
if ($action === 'enable-test-role') {
    if ($role === 'global_admin' || is_file($roleSnapshot)) {
        throw new RuntimeException('Choose a non-administrator role and restore any earlier test first.');
    }
    $marker = '__KOBUN_SETTING_MISSING__';
    $settings = $services->get('Omeka\Settings');
    $previous = $settings->get('kobun_ocr_transcription_roles', $marker);
    $previousScopes = $settings->get('kobun_ocr_transcription_scopes', $marker);
    file_put_contents($roleSnapshot, json_encode(['value' => $previous, 'scopes' => $previousScopes]));
    chmod($roleSnapshot, 0600);
    $settings->set('kobun_ocr_transcription_roles', [$role]);
    $settings->set('kobun_ocr_transcription_scopes', [$role => 'all']);
    echo "Temporary transcription role enabled for all readable materials: $role\n";
} elseif ($action === 'restore-test-role') {
    if (!is_file($roleSnapshot)) { throw new RuntimeException('No temporary role setting exists.'); }
    $snapshot = json_decode(file_get_contents($roleSnapshot), true);
    $previous = $snapshot['value'];
    $previousScopes = $snapshot['scopes'] ?? '__KOBUN_SETTING_MISSING__';
    $settings = $services->get('Omeka\Settings');
    $settings->set('kobun_ocr_transcription_roles',
        $previous === '__KOBUN_SETTING_MISSING__' ? null : $previous);
    $settings->set('kobun_ocr_transcription_scopes',
        $previousScopes === '__KOBUN_SETTING_MISSING__' ? null : $previousScopes);
    unlink($roleSnapshot);
    echo "Transcription role setting restored.\n";
} elseif ($action === 'enable-public-test') {
    $siteId = (int) ($argv[2] ?? 0);
    if ($siteId <= 0 || is_file($publicSnapshot)) {
        throw new RuntimeException('Specify one site id and restore any earlier public test first.');
    }
    $settings = $services->get('Omeka\Settings\Site');
    $settings->setTargetId($siteId);
    $marker = '__KOBUN_SETTING_MISSING__';
    file_put_contents($publicSnapshot, json_encode(['site_id' => $siteId,
        'translation' => $settings->get('kobun_ocr_public_translation_enabled', $marker)]));
    chmod($publicSnapshot, 0600);
    $settings->set('kobun_ocr_public_translation_enabled', false);
    echo "Temporary public translation disabled for site $siteId; the theme must include the reading assistance block.\n";
} elseif ($action === 'restore-public-test') {
    if (!is_file($publicSnapshot)) { throw new RuntimeException('No temporary public setting exists.'); }
    $snapshot = json_decode(file_get_contents($publicSnapshot), true);
    $settings = $services->get('Omeka\Settings\Site');
    $settings->setTargetId((int) $snapshot['site_id']);
    $settings->set('kobun_ocr_public_translation_enabled',
        $snapshot['translation'] === '__KOBUN_SETTING_MISSING__' ? null : $snapshot['translation']);
    unlink($publicSnapshot);
    echo "Public reading assistance setting restored.\n";
} elseif ($action === 'install') {
    $auth->setStorage(new Laminas\Authentication\Storage\NonPersistent());
    $auth->getStorage()->write($user);
    $manager = $services->get('Omeka\ModuleManager');
    $module = $manager->getModule('KobunOcrTranslation');
    if ($module->getState() === Omeka\Module\Manager::STATE_NOT_INSTALLED) {
        $manager->install($module);
    } elseif ($module->getState() === Omeka\Module\Manager::STATE_NEEDS_UPGRADE) {
        $manager->upgrade($module);
    } elseif ($module->getState() === Omeka\Module\Manager::STATE_NOT_ACTIVE) {
        $manager->activate($module);
    }
    echo "KobunOcrTranslation: " . $module->getState() . "\n";
} elseif ($action === 'test-session') {
    $suffix = $role === 'global_admin' ? '' : '-' . $role;
    $file = OMEKA_PATH . "/var/kobun-ocr-translation/test-cookie$suffix.json";
    $handler = new Omeka\Session\SaveHandler\Db($services->get('Omeka\Connection'));
    if (is_file($file)) {
        $handler->destroy(json_decode(file_get_contents($file), true)[0]['value']);
    }
    $id = bin2hex(random_bytes(24));
    // The web session uses PHP's standard serializer and the Laminas_Auth namespace.
    $handler->write($id, 'Laminas_Auth|' . serialize(['storage' => $user->getId()]));
    $cookie = [['name' => md5(OMEKA_PATH), 'value' => $id, 'domain' => 'omeka-s.ddev.site',
        'path' => '/', 'httpOnly' => true, 'secure' => true, 'sameSite' => 'Lax']];
    file_put_contents($file, json_encode($cookie));
    chmod($file, 0600);
    echo "Temporary test session saved privately; remove with end-test-session.\n";
} elseif ($action === 'end-test-session') {
    $suffix = $role === 'global_admin' ? '' : '-' . $role;
    $file = OMEKA_PATH . "/var/kobun-ocr-translation/test-cookie$suffix.json";
    if (is_file($file)) {
        $cookie = json_decode(file_get_contents($file), true)[0];
        (new Omeka\Session\SaveHandler\Db($services->get('Omeka\Connection')))->destroy($cookie['value']);
        unlink($file);
    }
    echo "Temporary test session removed.\n";
} else {
    exit("Usage: install | test-session [role] | end-test-session [role] | enable-test-role role | restore-test-role role | enable-public-test site-id | restore-public-test\n");
}
