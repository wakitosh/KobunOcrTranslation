<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

use Laminas\EventManager\Event;
use Laminas\EventManager\SharedEventManagerInterface;
use Laminas\Mvc\MvcEvent;
use Laminas\Mvc\Controller\AbstractController;
use Laminas\Validator\Csrf;
use Laminas\View\Renderer\PhpRenderer;
use Omeka\Module\AbstractModule;

class Module extends AbstractModule
{
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return ['Laminas\Loader\StandardAutoloader' => ['namespaces' => [
            __NAMESPACE__ => __DIR__ . '/src',
        ]]];
    }

    public function onBootstrap(MvcEvent $event)
    {
        parent::onBootstrap($event);
        $services = $this->getServiceLocator();
        $acl = $services->get('Omeka\Acl');
        $configured = (array) $services->get('Omeka\Settings')->get('kobun_ocr_transcription_roles', []);
        $valid = array_keys($acl->getRoleLabels(true));
        $roles = array_values(array_unique(array_merge(
            ['global_admin', 'site_admin'], array_intersect($configured, $valid)
        )));
        $acl->allow($roles, Controller\WorkspaceController::class);
        $acl->allow(null, Controller\ReadingController::class);
    }

    public function attachListeners(SharedEventManagerInterface $sharedEventManager): void
    {
        $sharedEventManager->attach(
            'Omeka\Form\SiteSettingsForm',
            'form.add_elements',
            [$this, 'addSiteSettings']
        );
        $sharedEventManager->attach(
            'Omeka\Form\SiteSettingsForm',
            'form.add_input_filters',
            [$this, 'addSiteSettingsFilters']
        );
    }

    public function addSiteSettings(Event $event): void
    {
        $form = $event->getTarget();
        $settings = $this->getServiceLocator()->get('Omeka\Settings\Site');
        $groups = $form->getOption('element_groups');
        $groups['kobun_ocr'] = '古典籍 OCR 閲覧支援';
        $form->setOption('element_groups', $groups);
        $form->add([
            'name' => 'kobun_ocr_public_translation_enabled',
            'type' => 'checkbox',
            'options' => [
                'element_group' => 'kobun_ocr',
                'label' => '公開画面で実験的な機械現代語訳を許可',
                'info' => '訳文には「機械生成・未確認」と注意事項を表示します。LLMを停止したままでも翻刻支援は使えます。',
            ],
            'attributes' => ['value' => (int) $settings->get('kobun_ocr_public_translation_enabled', 0)],
        ]);
    }

    public function addSiteSettingsFilters(Event $event): void
    {
        $filter = $event->getParam('inputFilter');
        $filter->add(['name' => 'kobun_ocr_public_translation_enabled', 'required' => false]);
    }

    public function getConfigForm(PhpRenderer $renderer)
    {
        $services = $this->getServiceLocator();
        $acl = $services->get('Omeka\Acl');
        $selected = (array) $services->get('Omeka\Settings')->get('kobun_ocr_transcription_roles', []);
        $scopes = (array) $services->get('Omeka\Settings')->get('kobun_ocr_transcription_scopes', []);
        $selectedModel = (string) $services->get('Omeka\Settings')->get('kobun_ocr_llm_model_profile', 'qwen35-9b-q4km');
        $catalog = json_decode((string) file_get_contents(__DIR__ . '/worker/models.json'), true);
        $models = is_array($catalog['llm'] ?? null) ? $catalog['llm'] : [];
        $html = $renderer->partial('kobun-ocr-translation/config/visitor-policy', [
            'policy' => VisitorLlmPolicy::load($services->get('Omeka\Settings')),
        ]);
        $modelOptions = '';
        $modelDownloads = '';
        foreach ($models as $model) {
            $id = (string) ($model['id'] ?? '');
            $size = ((int) ($model['size_bytes'] ?? 0)) / 1000000000;
            $modelOptions .= '<option value="' . $renderer->escapeHtmlAttr($id) . '"' . ($id === $selectedModel ? ' selected' : '') . '>'
                . $renderer->escapeHtml((string) ($model['name'] ?? $id) . sprintf('（%.2f GB、%s）', $size, (string) ($model['license'] ?? ''))) . '</option>';
            $modelDownloads .= '<li>' . $renderer->escapeHtml((string) ($model['name'] ?? $id))
                . ': <code>python3 modules/KobunOcrTranslation/worker/assets.py fetch --runtime /path/to/private/runtime --model '
                . $renderer->escapeHtml($id) . '</code></li>';
        }
        $html .= '<fieldset><legend>翻刻を修正できる役割と資料範囲</legend>'
            . '<p>グローバル管理者とサイト管理者は常に全資料を扱えます。追加する役割ごとに、Omekaでその利用者が所有する資料だけを許可するか、閲覧できる全資料を許可するかを選びます。</p>';
        foreach ($acl->getRoleLabels(true) as $role => $label) {
            if (in_array($role, ['global_admin', 'site_admin'], true)) {
                continue;
            }
            $id = 'kobun-ocr-role-' . $role;
            $scopeId = 'kobun-ocr-scope-' . $role;
            $scope = ($scopes[$role] ?? 'owned') === 'all' ? 'all' : 'owned';
            $html .= '<div class="field"><div class="field-meta"><label for="' . $renderer->escapeHtmlAttr($id) . '">'
                . '<input type="checkbox" id="' . $renderer->escapeHtmlAttr($id)
                . '" name="kobun_ocr_transcription_roles[]" value="' . $renderer->escapeHtmlAttr($role) . '"'
                . (in_array($role, $selected, true) ? ' checked' : '') . '>'
                . $renderer->escapeHtml($renderer->translate($label)) . '</label></div>'
                . '<div class="inputs"><select id="' . $renderer->escapeHtmlAttr($scopeId)
                . '" name="kobun_ocr_transcription_scopes[' . $renderer->escapeHtmlAttr($role) . ']">'
                . '<option value="owned"' . ($scope === 'owned' ? ' selected' : '') . '>自分が所有する資料のみ</option>'
                . '<option value="all"' . ($scope === 'all' ? ' selected' : '') . '>閲覧できるすべての資料</option>'
                . '</select><p class="explanation">「自分が所有する資料」は、Omekaのアイテム所有者がログイン利用者になっている資料です。</p></div></div>';
        }
        $html .= '<p>追加した役割は、許可範囲内の保存済み作業の閲覧・翻刻修正・履歴確認だけを行えます。資料の新規取込、レイアウト変更、OCR再実行、現代語訳の実行はできません。</p></fieldset>';
        $identity = $services->get('Omeka\AuthenticationService')->getIdentity();
        if ($identity && $identity->getRole() === 'global_admin') {
            $endpoint = $renderer->url('admin/kobun-ocr', ['action' => 'service']);
            $csrf = (new Csrf(['name' => 'kobun_ocr', 'timeout' => 3600]))->getHash();
            $html .= '<fieldset id="kobun-service-control" data-endpoint="' . $renderer->escapeHtmlAttr($endpoint)
                . '" data-csrf="' . $renderer->escapeHtmlAttr($csrf) . '"><legend>実行サービス</legend>'
                . '<p>全体管理者のみ操作できます。処理中のジョブがある場合、停止と再起動はできません。</p>'
                . '<div class="kobun-service-row" data-service="worker"><strong>OCR worker</strong> <span class="kobun-service-status" role="status">確認中…</span>'
                . '<span class="kobun-service-actions"><button type="button" data-action="start">起動</button> '
                . '<button type="button" data-action="stop">停止</button> <button type="button" data-action="restart">再起動</button></span></div>'
                . '<div class="kobun-service-row" data-service="llama"><strong>LLMサーバ</strong> <span class="kobun-service-status" role="status">確認中…</span>'
                . '<span class="kobun-service-actions"><button type="button" data-action="start">起動</button> '
                . '<button type="button" data-action="stop">停止</button> <button type="button" data-action="restart">再起動</button></span></div>'
                . '<div class="kobun-service-model"><label for="kobun-ocr-llm-model">起動するモデル</label>'
                . '<select id="kobun-ocr-llm-model" disabled>' . $modelOptions . '</select>'
                . '<p id="kobun-service-model-help">状態を確認しています…</p>'
                . '<p>LLMサーバを停止 → 取得済みモデルを選択 → LLMサーバを起動、の順に操作します。設定フォームの保存は不要です。workerの設定更新と復帰は自動で行います。</p>'
                . '<p>35B-A3Bは推論時に一部のパラメータを使うMoEモデルですが、重み全体を保持するメモリが必要です。設置先の資源上限と訳質・速度を確認してください。</p>'
                . '<details><summary>未取得モデルの導入方法</summary>'
                . '<p>初回の取得・実行環境の構築はサーバ管理者が行います。モデルは設定保存や起動操作ではダウンロードしません。実際の非公開ランタイムのパスを指定してください。</p>'
                . '<ul>' . $modelDownloads . '</ul></details></div>'
                . '<p><button type="button" id="kobun-service-refresh">状態を更新</button></p>'
                . '<p id="kobun-service-message" role="status" aria-live="polite"></p></fieldset>'
                . '<link rel="stylesheet" href="' . $renderer->escapeHtmlAttr($renderer->assetUrl('service-control.css', 'KobunOcrTranslation')) . '">'
                . '<script defer src="' . $renderer->escapeHtmlAttr($renderer->assetUrl('service-control.js', 'KobunOcrTranslation')) . '"></script>';
        }
        return $html;
    }

    public function handleConfigForm(AbstractController $controller)
    {
        $services = $this->getServiceLocator();
        $acl = $services->get('Omeka\Acl');
        $submitted = $controller->params()->fromPost('kobun_ocr_transcription_roles', []);
        try {
            $policy = VisitorLlmPolicy::validate($controller->params()->fromPost(VisitorLlmPolicy::SETTING, []));
        } catch (\InvalidArgumentException $e) {
            $controller->messenger()->addError($e->getMessage());
            return false;
        }
        $submitted = is_array($submitted) ? $submitted : [];
        $valid = array_diff(array_keys($acl->getRoleLabels(true)), ['global_admin', 'site_admin']);
        $roles = array_values(array_intersect($valid, $submitted));
        $submittedScopes = $controller->params()->fromPost('kobun_ocr_transcription_scopes', []);
        $submittedScopes = is_array($submittedScopes) ? $submittedScopes : [];
        $scopes = [];
        foreach ($roles as $role) {
            $scopes[$role] = ($submittedScopes[$role] ?? 'owned') === 'all' ? 'all' : 'owned';
        }
        $services->get('Omeka\Settings')->set('kobun_ocr_transcription_roles', $roles);
        $services->get('Omeka\Settings')->set('kobun_ocr_transcription_scopes', $scopes);
        $services->get('Omeka\Settings')->set(VisitorLlmPolicy::SETTING, $policy);
        return true;
    }
}
