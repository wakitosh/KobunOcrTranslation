<?php
declare(strict_types=1);

namespace KobunOcrTranslation\Controller;

use Laminas\Http\Client;
use Laminas\Validator\Csrf;
use Laminas\View\Model\ViewModel;
use Laminas\Mvc\Controller\AbstractActionController;
use KobunOcrTranslation\ReadingCachePolicy;

/** Omeka-authenticated adapter: Omeka owns authorization and resolves image sources. */
class WorkspaceController extends AbstractActionController
{
    public function cacheAction()
    {
        $identity = $this->identity();
        if (!$identity || $identity->getRole() !== 'global_admin') {
            $this->getResponse()->setStatusCode(403);
            return $this->jsonResponse(['error' => '一時保存領域の管理は全体管理者に限られています。']);
        }
        if (!$this->getRequest()->isGet()) {
            $this->getResponse()->setStatusCode(405);
            return $this->jsonResponse(['error' => 'GETで送信してください。']);
        }
        try {
            $services = $this->getEvent()->getApplication()->getServiceManager();
            ReadingCachePolicy::synchronize($this->options(), ReadingCachePolicy::load($services->get('Omeka\Settings')));
            $result = $this->upstream('GET', 'cache-policy');
            if (!$result->isSuccess()) {
                throw new \RuntimeException('Cache status unavailable');
            }
            return $this->jsonResponse(json_decode($result->getBody(), true, 16, JSON_THROW_ON_ERROR));
        } catch (\Throwable $e) {
            $this->getResponse()->setStatusCode(503);
            return $this->jsonResponse(['error' => '一時保存の使用状況を取得できません。workerの起動状態を確認してください。']);
        }
    }

    private function jsonResponse(array $data)
    {
        $response = $this->getResponse();
        $response->getHeaders()->addHeaderLine('Content-Type', 'application/json; charset=utf-8');
        $response->getHeaders()->addHeaderLine('Cache-Control', 'no-store');
        $response->getHeaders()->addHeaderLine('X-Content-Type-Options', 'nosniff');
        $response->setContent(json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
        return $response;
    }

    private function options(): array
    {
        return $this->getEvent()->getApplication()->getServiceManager()->get('Config')['kobun_ocr'];
    }

    private function identity()
    {
        return $this->getEvent()->getApplication()->getServiceManager()
            ->get('Omeka\AuthenticationService')->getIdentity();
    }

    private function isAdministrator(): bool
    {
        $identity = $this->identity();
        return $identity && in_array($identity->getRole(), ['global_admin', 'site_admin'], true);
    }

    /** Service controls affect all sites and are restricted to Omeka global administrators. */
    public function serviceAction()
    {
        $identity = $this->identity();
        if (!$identity || $identity->getRole() !== 'global_admin') {
            $this->getResponse()->setStatusCode(403);
            return $this->jsonResponse(['error' => 'サービス操作は全体管理者に限られています。']);
        }
        $request = $this->getRequest();
        $method = $request->getMethod();
        if (!in_array($method, ['GET', 'POST'], true)) {
            $this->getResponse()->setStatusCode(405);
            return $this->jsonResponse(['error' => '許可されていない操作です。']);
        }
        if ($method === 'POST') {
            $header = $request->getHeaders()->get('X-Kobun-CSRF');
            if (!$header || !(new Csrf(['name' => 'kobun_ocr', 'timeout' => 3600]))->isValid($header->getFieldValue())) {
                $this->getResponse()->setStatusCode(403);
                return $this->jsonResponse(['error' => 'セッションの有効期限が切れました。画面を再読み込みしてください。']);
            }
        }
        try {
            $options = $this->options();
            $token = @file_get_contents($options['token_file']);
            if (!$token) {
                throw new \RuntimeException('認証トークンを読み込めません。');
            }
            $body = null;
            if ($method === 'POST') {
                if (strlen($request->getContent()) > 512) {
                    throw new \InvalidArgumentException('入力が大きすぎます。');
                }
                $body = json_decode($request->getContent(), true, 8, JSON_THROW_ON_ERROR);
                if (!is_array($body) || !in_array($body['service'] ?? null, ['worker', 'llama'], true)
                    || !in_array($body['action'] ?? null, ['start', 'stop', 'restart'], true)
                    || array_diff(array_keys($body), ['service', 'action', 'model_id'])) {
                    throw new \InvalidArgumentException('不正なサービス操作です。');
                }
                if (array_key_exists('model_id', $body)) {
                    $catalog = json_decode((string) file_get_contents(dirname(__DIR__, 2) . '/worker/models.json'), true);
                    if ($body['service'] !== 'llama' || $body['action'] !== 'start'
                        || !is_string($body['model_id'])
                        || !in_array($body['model_id'], array_column($catalog['llm'], 'id'), true)) {
                        throw new \InvalidArgumentException('LLMサーバの起動時に登録済みモデルを選択してください。');
                    }
                }
            }
            $client = new Client(rtrim((string) ($options['control_url'] ?? ''), '/') . ($method === 'GET' ? '/status' : '/control'),
                ['timeout' => 300, 'maxredirects' => 0]);
            $client->setMethod($method);
            $client->setHeaders(['Authorization' => 'Bearer ' . trim($token)]);
            if ($body !== null) {
                $client->setEncType('application/json');
                $client->setRawBody(json_encode($body, JSON_THROW_ON_ERROR));
            }
            $upstream = $client->send();
            $this->getResponse()->setStatusCode($upstream->getStatusCode());
            $result = json_decode($upstream->getBody(), true, 16, JSON_THROW_ON_ERROR);
            if ($method === 'POST' && $upstream->isSuccess() && isset($result['llama']['model_id'])) {
                $this->getEvent()->getApplication()->getServiceManager()->get('Omeka\Settings')
                    ->set('kobun_ocr_llm_model_profile', $result['llama']['model_id']);
            }
            return $this->jsonResponse($result);
        } catch (\InvalidArgumentException | \JsonException $e) {
            $this->getResponse()->setStatusCode(400);
            return $this->jsonResponse(['error' => $e->getMessage()]);
        } catch (\Throwable $e) {
            $this->getResponse()->setStatusCode(503);
            return $this->jsonResponse(['error' => '運用サービスに接続できません。起動状態と接続設定を確認してください。']);
        }
    }

    private function canEditTranscription(): bool
    {
        if ($this->isAdministrator()) {
            return true;
        }
        $identity = $this->identity();
        $roles = (array) $this->getEvent()->getApplication()->getServiceManager()
            ->get('Omeka\Settings')->get('kobun_ocr_transcription_roles', []);
        return $identity && in_array($identity->getRole(), $roles, true);
    }

    private function transcriptionScope(): string
    {
        if ($this->isAdministrator()) {
            return 'all';
        }
        $identity = $this->identity();
        $scopes = (array) $this->getEvent()->getApplication()->getServiceManager()
            ->get('Omeka\Settings')->get('kobun_ocr_transcription_scopes', []);
        return $identity && ($scopes[$identity->getRole()] ?? 'owned') === 'all' ? 'all' : 'owned';
    }

    private function canAccessItem($item): bool
    {
        if (!$this->canEditTranscription()) {
            return false;
        }
        if ($this->transcriptionScope() === 'all') {
            return true;
        }
        $identity = $this->identity();
        $owner = $item->owner();
        return $identity && $owner && (int) $owner->id() === (int) $identity->getId();
    }

    private function actor(): array
    {
        $identity = $this->identity();
        return ['id' => (int) $identity->getId(), 'name' => (string) $identity->getName(),
            'role' => (string) $identity->getRole()];
    }

    public function indexAction()
    {
        return new ViewModel([
            'csrf' => (new Csrf(['name' => 'kobun_ocr', 'timeout' => 3600]))->getHash(),
            'canManageWorkflow' => $this->isAdministrator(),
            'canEditTranscription' => $this->canEditTranscription(),
            'transcriptionScope' => $this->transcriptionScope(),
        ]);
    }

    private function cleanOptions(): array
    {
        $services = $this->getEvent()->getApplication()->getServiceManager();
        $module = $services->get('Omeka\ModuleManager')->getModule('CleanUrl');
        return $module && $module->getState() === 'active'
            ? (array) $services->get('Omeka\Settings')->get('cleanurl_item') : [];
    }

    private function itemIdentifier($item): string
    {
        $services = $this->getEvent()->getApplication()->getServiceManager();
        return $this->cleanOptions()
            ? $services->get('ViewRenderer')->getResourceIdentifier($item, false, empty($this->cleanOptions()['prefix_part_of']))
            : (string) $item->value('dcterms:identifier');
    }

    private function resolveItem(string $input)
    {
        $input = trim($input);
        if ($input === '' || strlen($input) > 2000) {
            throw new \InvalidArgumentException('資料の識別子を入力してください。');
        }
        $options = $this->cleanOptions();
        if (preg_match('~^https?://~i', $input)) {
            $uri = parse_url($input);
            $hosts = array_merge($this->options()['resource_hosts'] ?? [], [$this->getRequest()->getUri()->getHost()]);
            if (!$uri || !in_array(strtolower($uri['host'] ?? ''), $hosts, true) || isset($uri['user']) || isset($uri['pass'])
                || isset($uri['port']) && !in_array($uri['port'], [80, 443], true)) {
                throw new \InvalidArgumentException('このOmekaの公開資料URLを入力してください。');
            }
            $patterns = array_filter(array_merge([$options['default'] ?? '', $options['short'] ?? ''], $options['paths'] ?? []));
            $identifier = null;
            foreach ($patterns as $pattern) {
                // Use the configured Clean Url item pattern, never fetch a submitted URL.
                $regex = preg_quote(trim($pattern, '/'), '~');
                $capture = !empty($options['keep_slash']) ? '.+' : '[^/]+';
                $regex = str_replace(['\{item_identifier\}', '\{item_identifier_short\}'], '(?<identifier>' . $capture . ')', $regex);
                $regex = str_replace(['\{item_set_identifier\}', '\{item_set_identifier_short\}', '\{item_set_id\}'], '[^/]+', $regex);
                if (strpos($regex, '(?<identifier>') !== false && strpos($regex, '\{') === false
                    && preg_match('~(?:^|/)' . $regex . '/?$~u', $uri['path'] ?? '', $matches)) {
                    $identifier = rawurldecode($matches['identifier']);
                    break;
                }
            }
            if ($identifier === null) {
                throw new \InvalidArgumentException('Clean Urlの資料URL、または資料の識別子を入力してください。');
            }
            $input = $identifier;
        } else {
            $input = rawurldecode($input);
        }
        $prefix = $options['prefix'] ?? '';
        $variants = [$input];
        if ($prefix !== '' && (empty($options['prefix_part_of']) || strpos($input, $prefix) !== 0)) {
            $variants = [$prefix . $input, $prefix . ' ' . $input];
        }
        $property = $options['property'] ?? 'dcterms:identifier';
        $propertyTerm = is_numeric($property)
            ? $this->api()->read('properties', (int) $property)->getContent()->term() : $property;
        $normalize = static function (string $value) use ($options): string {
            return !empty($options['case_sensitive']) ? $value : mb_strtolower($value);
        };
        $matches = [];
        foreach (array_unique($variants) as $variant) {
            // Core eq also matches URI/resource titles and uses the DB collation.
            // Check actual identifier literals before declaring a unique match.
            $result = $this->api()->search('items', ['property' => [[
                'property' => $property, 'type' => 'eq', 'text' => $variant,
            ]], 'per_page' => 100, 'limit' => 100]);
            foreach ($result->getContent() as $item) {
                foreach ($item->value($propertyTerm, ['all' => true]) as $value) {
                    if ($value->value() !== null && $normalize((string) $value->value()) === $normalize($variant)) {
                        $matches[$item->id()] = $item;
                        break;
                    }
                }
                if (count($matches) > 1) {
                    break;
                }
            }
            if (count($matches) < 2 && $result->getTotalResults() > 100) {
                throw new \InvalidArgumentException('一致候補が多いため識別子を確定できません。別の識別子を指定してください。');
            }
            if (count($matches) > 1) {
                break;
            }
        }
        if (count($matches) > 1) {
            throw new \InvalidArgumentException('同じ識別子の資料が複数あります。識別子の重複を解消してください。');
        }
        if (!$matches) {
            throw new \InvalidArgumentException('資料が見つかりません。識別子と閲覧権限を確認してください。');
        }
        $item = reset($matches);
        if ($options) {
            $resolved = $this->getEvent()->getApplication()->getServiceManager()->get('ViewRenderer')
                ->getResourceFromIdentifier($input, 'items');
            if (!$resolved || $resolved->id() !== $item->id()) {
                throw new \InvalidArgumentException('Clean Urlの識別子設定と一致しません。');
            }
            return $resolved;
        }
        return $item;
    }

    private function imageSource($media): array
    {
        $data = $media->mediaData();
        if ($media->ingester() !== 'iiif' || !is_array($data)) {
            throw new \InvalidArgumentException('この機能はIIIF画像メディアを対象とします。');
        }
        $service = rtrim((string) ($data['id'] ?? $data['@id'] ?? ''), '/');
        $uri = parse_url($service);
        if (!$uri || ($uri['scheme'] ?? '') !== 'https'
            || !in_array($uri['host'] ?? '', $this->options()['image_hosts'], true)
            || isset($uri['user']) || isset($uri['pass']) || isset($uri['query']) || isset($uri['fragment'])
            || (isset($uri['port']) && $uri['port'] !== 443)) {
            throw new \InvalidArgumentException('許可対象外の画像サービスです。');
        }
        $title = (string) $media->displayTitle();
        if (preg_match('~^https?://~', $title)) {
            $title = '画像 ' . $media->id();
        }
        return [
            'item_id' => $media->item()->id(), 'media_id' => $media->id(),
            'item_identifier' => $this->itemIdentifier($media->item()),
            'title' => $title, 'item_title' => (string) $media->item()->displayTitle(),
            'service_id' => $service, 'image_url' => $service . '/full/!2400,2400/0/default.jpg',
            'native_width' => (int) ($data['width'] ?? 0), 'native_height' => (int) ($data['height'] ?? 0),
            'canvas_id' => null,
        ];
    }

    public function pagesAction()
    {
        try {
            $input = (string) $this->params()->fromQuery('identifier', '');
            // Legacy bookmarked links remain readable; the UI uses identifiers.
            $item = $input !== '' ? $this->resolveItem($input)
                : $this->api()->read('items', (int) $this->params()->fromQuery('item_id'))->getContent();
            if (!$this->canAccessItem($item)) {
                $this->getResponse()->setStatusCode(403);
                return $this->jsonResponse(['error' => 'この資料は翻刻修正の許可範囲外です。']);
            }
            $itemId = $item->id();
            $page = max(1, (int) $this->params()->fromQuery('page', 1));
            $allPages = [];
            // IiifServer builds the manifest from ItemRepresentation::media(),
            // whose Doctrine association is ordered by media.position. The media
            // API does not support `sort_by=position`, so using an API search here
            // silently fell back to resource id order and could interleave image
            // sets that Mirador displays in separate groups.
            foreach ($item->media() as $media) {
                if (!$media->isPublic()) {
                    // Match the public manifest used by Mirador.
                    continue;
                }
                try {
                    $row = $this->imageSource($media);
                    $row['position'] = count($allPages) + 1;
                    $allPages[] = $row;
                } catch (\InvalidArgumentException $e) {
                    // Unsupported media do not acquire a false page identity.
                }
            }
            $perPage = 100;
            $pages = array_slice($allPages, ($page - 1) * $perPage, $perPage);
            return $this->jsonResponse(['item_id' => $itemId, 'identifier' => $this->itemIdentifier($item), 'title' => (string) $item->displayTitle(),
                'pages' => $pages, 'page' => $page, 'total' => count($allPages)]);
        } catch (\InvalidArgumentException $e) {
            $this->getResponse()->setStatusCode(400);
            return $this->jsonResponse(['error' => $e->getMessage()]);
        } catch (\Exception $e) {
            $this->getResponse()->setStatusCode(400);
            return $this->jsonResponse(['error' => '資料を取得できません。識別子と閲覧権限を確認してください。']);
        }
    }

    public function importAction()
    {
        if (!$this->getRequest()->isPost()) {
            $this->getResponse()->setStatusCode(405);
            return $this->jsonResponse(['error' => 'POSTで送信してください。']);
        }
        if (!$this->canEditTranscription()) {
            $this->getResponse()->setStatusCode(403);
            return $this->jsonResponse(['error' => '翻刻を修正する権限がありません。']);
        }
        $header = $this->getRequest()->getHeaders()->get('X-Kobun-CSRF');
        if (!$header || !(new Csrf(['name' => 'kobun_ocr', 'timeout' => 3600]))->isValid($header->getFieldValue())) {
            $this->getResponse()->setStatusCode(403);
            return $this->jsonResponse(['error' => 'セッションの有効期限が切れました。画面を再読み込みしてください。']);
        }
        try {
            $file = $this->params()->fromFiles('file');
            if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
                throw new \InvalidArgumentException('Wordファイルを選択してください。');
            }
            $name = (string) ($file['name'] ?? '');
            $size = (int) ($file['size'] ?? 0);
            $path = (string) ($file['tmp_name'] ?? '');
            if ($size <= 0 || $size > 10_000_000 || !is_file($path)) {
                throw new \InvalidArgumentException('Wordファイルは10 MB以内にしてください。');
            }
            if (strtolower(pathinfo($name, PATHINFO_EXTENSION)) !== 'docx') {
                throw new \InvalidArgumentException('拡張子が.docxのWordファイルを選択してください。');
            }
            $parser = new \KobunOcrTranslation\DocxTranscriptionParser();
            return $this->jsonResponse($parser->parse($path, mb_substr($name, 0, 240)));
        } catch (\InvalidArgumentException | \RuntimeException $e) {
            $this->getResponse()->setStatusCode(400);
            return $this->jsonResponse(['error' => $e->getMessage()]);
        } catch (\Throwable $e) {
            $this->getResponse()->setStatusCode(500);
            return $this->jsonResponse(['error' => 'Wordファイルを解析できません。ファイル形式を確認してください。']);
        }
    }

    private function upstream(string $method, string $endpoint, ?array $body = null)
    {
        $options = $this->options();
        $token = @file_get_contents($options['token_file']);
        if (!$token) {
            throw new \RuntimeException('OCR実行部が未準備です。');
        }
        $client = new Client(rtrim($options['backend_url'], '/') . '/' . $endpoint, [
            'timeout' => 45, 'maxredirects' => 0,
        ]);
        $client->setMethod($method);
        $client->setHeaders(['Authorization' => 'Bearer ' . trim($token)]);
        if ($body !== null) {
            $client->setEncType('application/json');
            $client->setRawBody(json_encode($body, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
        }
        return $client->send();
    }

    private function canReadDocument(array $doc): bool
    {
        try {
            if (($doc['workflow'] ?? 'editorial') !== 'editorial') {
                return false;
            }
            $source = $doc['source'];
            $media = $this->api()->read('media', (int) $source['media_id'])->getContent();
            $item = $this->api()->read('items', (int) $source['item_id'])->getContent();
            return $media->item()->id() === $item->id()
                && $this->canAccessItem($item)
                && $this->imageSource($media)['service_id'] === $source['service_id'];
        } catch (\Throwable $e) {
            return false;
        }
    }

    public function proxyAction()
    {
        $request = $this->getRequest();
        $method = $request->getMethod();
        $endpoint = (string) $this->params()->fromQuery('endpoint', 'health');
        $allowed = [
            'GET' => '~^(health|documents|documents/[a-f0-9]{24}(/image|/history)?)$~',
            'POST' => '~^(documents|documents/[a-f0-9]{24}/jobs)$~',
            'PUT' => '~^documents/[a-f0-9]{24}/(layout|transcription|translation-input|translation|review)$~',
            'DELETE' => '~^documents/[a-f0-9]{24}/translation$~',
        ];
        if (!isset($allowed[$method]) || !preg_match($allowed[$method], $endpoint)) {
            $this->getResponse()->setStatusCode(400);
            return $this->jsonResponse(['error' => '不正な操作です。']);
        }
        if ($method !== 'GET') {
            $transcriptionEdit = preg_match('~^documents/[a-f0-9]{24}/transcription$~', $endpoint) === 1;
            if ($transcriptionEdit ? !$this->canEditTranscription() : !$this->isAdministrator()) {
                $this->getResponse()->setStatusCode(403);
                return $this->jsonResponse(['error' => $transcriptionEdit
                    ? '翻刻を修正する権限がありません。' : 'この操作は管理者に限られています。']);
            }
        }
        if ($method !== 'GET') {
            $header = $request->getHeaders()->get('X-Kobun-CSRF');
            if (!$header || !(new Csrf(['name' => 'kobun_ocr', 'timeout' => 3600]))->isValid($header->getFieldValue())) {
                $this->getResponse()->setStatusCode(403);
                return $this->jsonResponse(['error' => 'セッションの有効期限が切れました。画面を再読み込みしてください。']);
            }
        }
        try {
            if (strlen($request->getContent()) > 524288) {
                throw new \InvalidArgumentException('入力が大きすぎます。');
            }
            $body = $method === 'GET' ? null : json_decode($request->getContent(), true, 64, JSON_THROW_ON_ERROR);
            if ($method !== 'GET' && !is_array($body)) {
                throw new \InvalidArgumentException('JSONオブジェクトが必要です。');
            }
            if ($endpoint === 'documents' && $method === 'POST') {
                $media = $this->api()->read('media', (int) ($body['media_id'] ?? 0))->getContent();
                // The browser cannot submit an arbitrary image URL to the worker.
                $body = $this->imageSource($media);
                $body['workflow'] = 'editorial';
            }
            if (($method === 'PUT' && preg_match('~/(transcription|translation|review)$~', $endpoint))
                || ($method === 'DELETE' && str_ends_with($endpoint, '/translation'))) {
                // The authenticated Omeka identity, never browser input, is written to the audit record.
                $body['actor'] = $this->actor();
            }
            if ($method === 'PUT' && str_ends_with($endpoint, '/review')
                && array_key_exists('metadata', $body) && $body['metadata'] === []) {
                // json_decode(..., true) cannot distinguish {} from []. Keep the
                // optional, empty metadata value as a JSON object for the worker.
                $body['metadata'] = new \stdClass();
            }
            // Recheck Omeka visibility even when returning a cached image or history.
            if (preg_match('~^(documents/[a-f0-9]{24})(?:/|$)~', $endpoint, $match)) {
                $metadata = $this->upstream('GET', $match[1]);
                $record = json_decode($metadata->getBody(), true, 64, JSON_THROW_ON_ERROR);
                if (!$metadata->isSuccess() || !$this->canReadDocument($record)) {
                    $this->getResponse()->setStatusCode(404);
                    return $this->jsonResponse(['error' => '作業が見つからないか、閲覧権限がありません。']);
                }
            }
            $upstream = $this->upstream($method, $endpoint, $body);
            if ($endpoint === 'documents' && $method === 'GET' && $upstream->isSuccess()) {
                $records = json_decode($upstream->getBody(), true, 64, JSON_THROW_ON_ERROR);
                $this->getResponse()->getHeaders()->addHeaderLine('Cache-Control', 'no-store');
                return $this->jsonResponse(array_values(array_filter($records, [$this, 'canReadDocument'])));
            }
            $response = $this->getResponse();
            $response->setStatusCode($upstream->getStatusCode());
            $response->getHeaders()->addHeaderLine('Cache-Control', 'no-store');
            $response->getHeaders()->addHeaderLine('X-Content-Type-Options', 'nosniff');
            $response->getHeaders()->addHeaderLine('Content-Type',
                substr($endpoint, -6) === '/image' && $upstream->isSuccess() ? 'image/jpeg' : 'application/json; charset=utf-8');
            $response->setContent($upstream->getBody());
            return $response;
        } catch (\InvalidArgumentException | \JsonException $e) {
            $this->getResponse()->setStatusCode(400);
            return $this->jsonResponse(['error' => $e->getMessage()]);
        } catch (\Throwable $e) {
            $this->getResponse()->setStatusCode(503);
            return $this->jsonResponse(['error' => 'OCR実行部に接続できません。起動状態と接続設定を確認してください。']);
        }
    }
}
