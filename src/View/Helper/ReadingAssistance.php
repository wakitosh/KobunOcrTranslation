<?php
declare(strict_types=1);

namespace KobunOcrTranslation\View\Helper;

use Laminas\Validator\Csrf;
use KobunOcrTranslation\VisitorLlmPolicy;
use Laminas\View\Helper\AbstractHelper;
use Omeka\Api\Representation\ItemRepresentation;

class ReadingAssistance extends AbstractHelper
{
    private array $config;
    private $siteSettings;
    private $settings;

    public function __construct(array $config, $siteSettings, $settings)
    {
        $this->config = $config;
        $this->siteSettings = $siteSettings;
        $this->settings = $settings;
    }

    public function __invoke(ItemRepresentation $item): string
    {
        if (!$item->isPublic()) {
            return '';
        }

        $hosts = array_map('strtolower', (array) ($this->config['image_hosts'] ?? []));
        $pages = [];
        foreach ($item->media() as $media) {
            $data = $media->mediaData();
            $service = is_array($data) ? rtrim((string) ($data['id'] ?? $data['@id'] ?? ''), '/') : '';
            $host = strtolower((string) (parse_url($service, PHP_URL_HOST) ?? ''));
            if ($media->isPublic() && $media->ingester() === 'iiif' && $service !== '' && in_array($host, $hosts, true)) {
                $pages[] = [
                    'id' => (int) $media->id(),
                    'title' => (string) $media->displayTitle(),
                    'service' => $service,
                ];
            }
        }
        if (!$pages) {
            return '';
        }

        return $this->getView()->partial('kobun-ocr-translation/reading/panel', [
            'pages' => $pages,
            'csrf' => (new Csrf(['name' => 'kobun_ocr_public', 'timeout' => 3600]))->getHash(),
            'translationEnabled' => (bool) $this->siteSettings->get('kobun_ocr_public_translation_enabled', false),
            'visitorLlmPolicy' => VisitorLlmPolicy::load($this->settings),
        ]);
    }
}
