<?php
declare(strict_types=1);

namespace KobunOcrTranslation\Controller;

use Laminas\Http\Client;
use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\Session\Container;
use Laminas\Validator\Csrf;
use KobunOcrTranslation\VisitorLlmPolicy;

class PublicRateLimitException extends \RuntimeException
{
    public int $retryAfter;
    public int $retryAt;
    public int $limit;

    public function __construct(int $retryAfter, int $retryAt, int $limit, string $subject)
    {
        $this->retryAfter = $retryAfter;
        $this->retryAt = $retryAt;
        $this->limit = $limit;
        $minutes = max(1, (int) ceil($retryAfter / 60));
        parent::__construct("この端末では{$subject}を1時間に{$limit}回まで利用できます。次に試せるまで約{$minutes}分です。", 429);
    }
}

/** Public, site-scoped access to sanitized reading assistance results. */
class ReadingController extends AbstractActionController
{
    private function jsonResponse(array $data, int $status = 200)
    {
        $response = $this->getResponse();
        $response->setStatusCode($status);
        $response->getHeaders()->addHeaderLine('Content-Type', 'application/json; charset=utf-8');
        $response->getHeaders()->addHeaderLine('Cache-Control', 'no-store, private');
        $response->getHeaders()->addHeaderLine('X-Content-Type-Options', 'nosniff');
        $response->setContent(json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
        return $response;
    }

    private function services()
    {
        return $this->getEvent()->getApplication()->getServiceManager();
    }

    private function options(): array
    {
        return $this->services()->get('Config')['kobun_ocr'];
    }

    private function cacheAdministrator()
    {
        $identity = $this->services()->get('Omeka\\AuthenticationService')->getIdentity();
        return $identity && $identity->getRole() === 'global_admin' ? $identity : null;
    }

    private function enabled(bool $translation = false): bool
    {
        $settings = $this->services()->get('Omeka\Settings\Site');
        if ($translation && !(bool) $settings->get('kobun_ocr_public_translation_enabled', false)) {
            return false;
        }
        $services = $this->services();
        $theme = $services->get('Omeka\Site\ThemeManager')->getCurrentTheme();
        $blocks = $services->get('Omeka\ResourcePageBlockLayoutManager')->getResourcePageBlocks($theme);
        foreach ($blocks['items'] ?? [] as $regionBlocks) {
            if (in_array('kobunReadingAssistance', $regionBlocks, true)) {
                return true;
            }
        }
        return false;
    }

    private function requirePost(): array
    {
        if (!$this->getRequest()->isPost()) {
            throw new \InvalidArgumentException('POSTで送信してください。');
        }
        $header = $this->getRequest()->getHeaders()->get('X-Kobun-CSRF');
        if (!$header || !(new Csrf(['name' => 'kobun_ocr_public', 'timeout' => 3600]))->isValid($header->getFieldValue())) {
            throw new \RuntimeException('画面の有効期限が切れました。ページを再読み込みしてください。', 403);
        }
        if (strlen($this->getRequest()->getContent()) > 8192) {
            throw new \InvalidArgumentException('入力が大きすぎます。');
        }
        $body = json_decode($this->getRequest()->getContent(), true, 16, JSON_THROW_ON_ERROR);
        if (!is_array($body)) {
            throw new \InvalidArgumentException('入力形式が不正です。');
        }
        return $body;
    }

    private function site()
    {
        return $this->currentSite();
    }

    private function itemBelongsToSite($item): bool
    {
        if (!$item->isPublic()) {
            return false;
        }
        $siteId = (int) $this->site()->id();
        foreach ($item->sites() as $site) {
            if ((int) $site->id() === $siteId) {
                return true;
            }
        }
        return false;
    }

    private function imageSource($media, string $workflow): array
    {
        $item = $media->item();
        if (!$media->isPublic() || !$this->itemBelongsToSite($item)) {
            throw new \RuntimeException('この画像は公開されていません。', 404);
        }
        $data = $media->mediaData();
        if ($media->ingester() !== 'iiif' || !is_array($data)) {
            throw new \InvalidArgumentException('この画像は現在のOCR対象形式ではありません。');
        }
        $service = rtrim((string) ($data['id'] ?? $data['@id'] ?? ''), '/');
        $uri = parse_url($service);
        if (!$uri || ($uri['scheme'] ?? '') !== 'https'
            || !in_array(strtolower((string) ($uri['host'] ?? '')), $this->options()['image_hosts'], true)
            || isset($uri['user']) || isset($uri['pass']) || isset($uri['query']) || isset($uri['fragment'])
            || (isset($uri['port']) && $uri['port'] !== 443)) {
            throw new \InvalidArgumentException('この画像サービスはOCR対象として許可されていません。');
        }
        return [
            'workflow' => $workflow,
            'item_id' => (int) $item->id(),
            'media_id' => (int) $media->id(),
            'item_identifier' => (string) $item->value('dcterms:identifier'),
            'title' => (string) $media->displayTitle(),
            'item_title' => (string) $item->displayTitle(),
            'service_id' => $service,
            'image_url' => $service . '/full/!2400,2400/0/default.jpg',
            'native_width' => (int) ($data['width'] ?? 0),
            'native_height' => (int) ($data['height'] ?? 0),
            'canvas_id' => null,
        ];
    }

    private function upstream(string $method, string $endpoint, ?array $body = null)
    {
        $options = $this->options();
        $token = @file_get_contents($options['token_file']);
        if (!$token) {
            throw new \RuntimeException('閲覧支援は現在利用できません。', 503);
        }
        $client = new Client(rtrim($options['backend_url'], '/') . '/' . $endpoint, [
            'timeout' => 45,
            'maxredirects' => 0,
        ]);
        $client->setMethod($method);
        $client->setHeaders(['Authorization' => 'Bearer ' . trim($token)]);
        if ($body !== null) {
            $client->setEncType('application/json');
            $client->setRawBody(json_encode($body, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
        }
        return $client->send();
    }

    private function decode($response): array
    {
        $data = json_decode($response->getBody(), true, 64, JSON_THROW_ON_ERROR);
        if (!$response->isSuccess()) {
            throw new \RuntimeException((string) ($data['error'] ?? 'OCR処理を開始できません。'), $response->getStatusCode());
        }
        return $data;
    }

    private function readPublicDocument(string $id): array
    {
        if (!preg_match('/^[a-f0-9]{24}$/', $id)) {
            throw new \RuntimeException('結果が見つかりません。', 404);
        }
        $doc = $this->decode($this->upstream('GET', 'documents/' . $id));
        $source = $doc['source'] ?? [];
        $media = $this->api()->read('media', (int) ($source['media_id'] ?? 0))->getContent();
        $expected = $this->imageSource($media, (string) ($doc['workflow'] ?? 'editorial'));
        if ((int) ($source['item_id'] ?? 0) !== $expected['item_id']
            || ($source['service_id'] ?? '') !== $expected['service_id']
            || (($doc['workflow'] ?? 'editorial') === 'editorial' && ($doc['publication_state'] ?? 'draft') !== 'published')) {
            throw new \RuntimeException('結果が見つかりません。', 404);
        }
        return $doc;
    }

    private function rateLimit(string $bucket): void
    {
        $options = $this->options();
        $limit = $bucket === 'translation'
            ? max(1, (int) ($options['public_translations_per_hour'] ?? 6))
            : max(1, (int) ($options['public_ocr_pages_per_hour'] ?? $options['public_jobs_per_hour'] ?? 24));
        // v2 counts one requested page, rather than layout and recognition as
        // two separate jobs. The site id keeps independent site allowances.
        $session = new Container('kobun_ocr_public_limits_v2');
        $key = (int) $this->site()->id() . ':' . $bucket;
        $now = time();
        $buckets = (array) ($session->buckets ?? []);
        $times = array_values(array_filter((array) ($buckets[$key] ?? []), static fn ($time) => is_int($time) && $time > $now - 3600));
        if (count($times) >= $limit) {
            $retryAt = min($times) + 3600;
            $subject = $bucket === 'translation' ? '現代語訳' : '新しいページの翻刻';
            throw new PublicRateLimitException(max(1, $retryAt - $now), $retryAt, $limit, $subject);
        }
        $times[] = $now;
        $buckets[$key] = $times;
        $session->buckets = $buckets;
    }

    private function releaseRateLimit(string $bucket): void
    {
        $session = new Container('kobun_ocr_public_limits_v2');
        $key = (int) $this->site()->id() . ':' . $bucket;
        $buckets = (array) ($session->buckets ?? []);
        $times = (array) ($buckets[$key] ?? []);
        array_pop($times);
        $buckets[$key] = $times;
        $session->buckets = $buckets;
    }

    private function submit(array $doc, string $operation, ?string $rateBucket = null): array
    {
        if (in_array($doc['job']['status'] ?? '', ['queued', 'running'], true)) {
            return $doc;
        }
        if ($rateBucket !== null) {
            $this->rateLimit($rateBucket);
        }
        try {
            return $this->decode($this->upstream('POST', 'documents/' . $doc['id'] . '/jobs', [
                'operation' => $operation,
                'base_revision' => (int) $doc['revision'],
            ]));
        } catch (\Throwable $e) {
            // A rejected queue request did not consume inference capacity.
            if ($rateBucket !== null) {
                $this->releaseRateLimit($rateBucket);
            }
            throw $e;
        }
    }

    private function publicData(array $doc): array
    {
        $published = ($doc['workflow'] ?? 'editorial') === 'editorial'
            && ($doc['publication_state'] ?? 'draft') === 'published';
        $lines = [];
        $verticalLines = 0;
        foreach ((array) ($doc['lines'] ?? []) as $line) {
            if (array_key_exists('raw', $line)) {
                $direction = in_array($line['direction'] ?? '', ['vertical', 'horizontal'], true)
                    ? $line['direction']
                    : ((float) ($line['width'] ?? 0) < (float) ($line['height'] ?? 0) ? 'vertical' : 'horizontal');
                if ($direction === 'vertical') {
                    $verticalLines++;
                }
                $lines[] = [
                    'order' => (int) ($line['readingOrder'] ?? count($lines) + 1),
                    'text' => (string) $line['raw'],
                    'direction' => $direction,
                ];
            }
        }
        usort($lines, static fn (array $a, array $b): int => $a['order'] <=> $b['order']);
        $writingDirection = count($lines) < $verticalLines * 2 ? 'vertical' : 'horizontal';
        $savedReadingDirection = (string) ($doc['reading_direction'] ?? 'auto');
        $readingDirection = in_array($savedReadingDirection, ['ltr', 'rtl'], true)
            ? $savedReadingDirection
            : ($writingDirection === 'vertical' ? 'rtl' : 'ltr');
        $translationEnabled = $this->enabled(true);
        $translation = $translationEnabled ? ($doc['translation'] ?? null) : null;
        return [
            'id' => (string) $doc['id'],
            'quality' => $published ? 'published' : 'machine',
            'label' => $published ? '図書館確認済み' : '機械生成・未確認',
            'status' => (string) ($doc['status'] ?? 'image'),
            'revision' => (int) ($doc['revision'] ?? 0),
            // A published snapshot stays stable while an administrator starts
            // a new draft operation against the same editorial document.
            'job' => !$published && isset($doc['job']) ? [
                'operation' => (string) ($doc['job']['operation'] ?? ''),
                'status' => (string) ($doc['job']['status'] ?? ''),
                'error' => (string) ($doc['job']['error'] ?? ''),
                'phase' => (string) ($doc['job']['phase'] ?? ''),
            ] : null,
            'lines' => $lines,
            'writing_direction' => $writingDirection,
            'reading_direction' => $readingDirection,
            'transcription' => implode("\n", array_column($lines, 'text')),
            'transcription_credit' => $published ? (string) ($doc['transcription_credit'] ?? '') : '',
            'transcription_metadata' => $published ? (array) ($doc['transcription_metadata'] ?? []) : [],
            'translation' => is_array($translation) ? [
                'text' => (string) ($translation['text'] ?? ''),
                'model' => (string) ($translation['model'] ?? ''),
                'provider' => (string) ($translation['provider'] ?? ''),
                'human_edited' => (bool) ($translation['human_edited'] ?? false),
                'method' => (string) ($translation['method'] ?? (!empty($translation['model']) ? 'machine' : 'manual')),
                'uncertainties' => array_values((array) ($translation['uncertainties'] ?? [])),
                'warnings' => array_values((array) ($translation['review_warnings'] ?? [])),
            ] : null,
            'translation_available' => $translationEnabled,
            'can_manage_cache' => ($doc['workflow'] ?? '') === 'assist' && $this->cacheAdministrator() !== null,
            'provenance' => [
                'image_sha256' => (string) ($doc['image_sha256'] ?? ''),
                'operations' => (array) ($doc['provenance'] ?? []),
                'reviewed_at' => $published ? ($doc['reviewed_at'] ?? null) : null,
            ],
        ];
    }

    public function startAction()
    {
        try {
            if (!$this->enabled()) {
                throw new \RuntimeException('このサイトでは閲覧支援を公開していません。', 404);
            }
            $body = $this->requirePost();
            $media = $this->api()->read('media', (int) ($body['media_id'] ?? 0))->getContent();
            $editorialSource = $this->imageSource($media, 'editorial');
            $publishedResponse = $this->upstream('POST', 'documents/find', $editorialSource);
            if ($publishedResponse->isSuccess()) {
                $published = json_decode($publishedResponse->getBody(), true, 64, JSON_THROW_ON_ERROR);
                if (($published['publication_state'] ?? 'draft') === 'published') {
                    return $this->jsonResponse($this->publicData($published));
                }
            }
            $source = $this->imageSource($media, 'assist');
            $doc = $this->decode($this->upstream('POST', 'documents', $source));
            if (!$doc['lines'] && !in_array($doc['job']['status'] ?? '', ['queued', 'running'], true)) {
                $doc = $this->submit($doc, 'layout', 'ocr');
            } elseif (($doc['job']['status'] ?? '') === 'error'
                && array_filter($doc['lines'], static fn ($line) => !array_key_exists('raw', $line))) {
                $doc = $this->submit($doc, 'recognize');
            }
            return $this->jsonResponse($this->publicData($doc), 202);
        } catch (PublicRateLimitException $e) {
            return $this->jsonResponse([
                'error' => $e->getMessage(),
                'retry_after' => $e->retryAfter,
                'retry_at' => $e->retryAt,
                'limit' => $e->limit,
            ], 429);
        } catch (\JsonException | \InvalidArgumentException $e) {
            return $this->jsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Throwable $e) {
            $status = in_array((int) $e->getCode(), [403, 404, 409, 429, 503], true) ? (int) $e->getCode() : 503;
            return $this->jsonResponse(['error' => $e->getMessage() ?: '閲覧支援を開始できません。'], $status);
        }
    }

    public function statusAction()
    {
        try {
            if (!$this->enabled()) {
                throw new \RuntimeException('結果が見つかりません。', 404);
            }
            $doc = $this->readPublicDocument((string) $this->params()->fromQuery('id', ''));
            return $this->jsonResponse($this->publicData($doc));
        } catch (\Throwable $e) {
            $status = (int) $e->getCode() === 404 ? 404 : 503;
            return $this->jsonResponse(['error' => $e->getMessage() ?: '結果を取得できません。'], $status);
        }
    }

    public function cacheAction()
    {
        try {
            // The cache is shared across sites. Site administrators and
            // editorial contributors cannot change it through this endpoint.
            $identity = $this->cacheAdministrator();
            if (!$identity) {
                throw new \RuntimeException('共有キャッシュの操作には全体管理者の権限が必要です。', 403);
            }
            if (!$this->enabled()) {
                throw new \RuntimeException('このサイトでは閲覧支援を公開していません。', 404);
            }
            $body = $this->requirePost();
            if (count($body) !== 4 || array_diff(array_keys($body), ['id', 'target', 'action', 'base_revision'])
                || !is_string($body['id'] ?? null) || !is_int($body['base_revision'] ?? null)
                || !in_array($body['target'] ?? null, ['transcription', 'translation'], true)
                || !in_array($body['action'] ?? null, ['delete', 'regenerate'], true)) {
                throw new \InvalidArgumentException('キャッシュ操作の指定が不正です。');
            }
            if ($body['target'] === 'translation' && !$this->enabled(true)) {
                throw new \RuntimeException('このサイトでは機械現代語訳を公開していません。', 403);
            }
            $doc = $this->readPublicDocument($body['id']);
            if (($doc['workflow'] ?? '') !== 'assist') {
                throw new \RuntimeException('確認・公開用のデータはキャッシュ操作の対象外です。', 409);
            }
            // Maintenance always uses the library's local engine, independently
            // of the visitor's provider/key and hourly generation allowance.
            $updated = $this->decode($this->upstream('POST', 'documents/' . $doc['id'] . '/cache', [
                'target' => $body['target'], 'action' => $body['action'],
                'base_revision' => $body['base_revision'],
                'actor' => ['id' => (int) $identity->getId(), 'name' => (string) $identity->getName(),
                    'role' => (string) $identity->getRole()],
            ]));
            return $this->jsonResponse($this->publicData($updated), $body['action'] === 'regenerate' ? 202 : 200);
        } catch (\JsonException | \InvalidArgumentException $e) {
            return $this->jsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Throwable $e) {
            $status = in_array((int) $e->getCode(), [403, 404, 409, 429, 503], true) ? (int) $e->getCode() : 503;
            return $this->jsonResponse(['error' => $e->getMessage() ?: 'キャッシュを変更できません。'], $status);
        }
    }

    public function runAction()
    {
        try {
            if (!$this->enabled()) {
                throw new \RuntimeException('このサイトでは閲覧支援を公開していません。', 404);
            }
            $body = $this->requirePost();
            $operation = (string) ($body['operation'] ?? '');
            if (!in_array($operation, ['recognize', 'translate'], true)) {
                throw new \InvalidArgumentException('処理の指定が不正です。');
            }
            if ($operation === 'translate' && !$this->enabled(true)) {
                throw new \RuntimeException('このサイトでは機械現代語訳を公開していません。', 403);
            }
            if ($operation === 'translate' && !VisitorLlmPolicy::allowsLocal(VisitorLlmPolicy::load($this->services()->get('Omeka\Settings')))) {
                throw new \RuntimeException('管理者の設定により、公開画面ではローカルLLMを利用できません。', 403);
            }
            $doc = $this->readPublicDocument((string) ($body['id'] ?? ''));
            if (($doc['workflow'] ?? 'editorial') !== 'assist') {
                throw new \RuntimeException('確認済みデータに追加処理はできません。', 409);
            }
            if ($operation === 'recognize' && (!$doc['lines']
                || !array_filter($doc['lines'], static fn ($line) => !array_key_exists('raw', $line)))) {
                throw new \RuntimeException('文字認識を開始できる状態ではありません。', 409);
            }
            if ($operation === 'translate' && (!$doc['lines'] || array_filter($doc['lines'], static fn ($line) => !array_key_exists('raw', $line)))) {
                throw new \RuntimeException('先に文字認識を完了してください。', 409);
            }
            if ($operation === 'translate' && !empty($doc['translation'])) {
                return $this->jsonResponse($this->publicData($doc));
            }
            $doc = $this->submit($doc, $operation, $operation === 'translate' ? 'translation' : null);
            return $this->jsonResponse($this->publicData($doc), 202);
        } catch (PublicRateLimitException $e) {
            return $this->jsonResponse([
                'error' => $e->getMessage(),
                'retry_after' => $e->retryAfter,
                'retry_at' => $e->retryAt,
                'limit' => $e->limit,
            ], 429);
        } catch (\JsonException | \InvalidArgumentException $e) {
            return $this->jsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Throwable $e) {
            $status = in_array((int) $e->getCode(), [403, 404, 409, 429, 503], true) ? (int) $e->getCode() : 503;
            return $this->jsonResponse(['error' => $e->getMessage() ?: '処理を開始できません。'], $status);
        }
    }
}
