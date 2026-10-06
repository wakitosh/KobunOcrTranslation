<?php
declare(strict_types=1);

namespace KobunOcrTranslation\Site\ResourcePageBlockLayout;

use Laminas\View\Renderer\PhpRenderer;
use Omeka\Api\Representation\AbstractResourceEntityRepresentation;
use Omeka\Api\Representation\ItemRepresentation;
use Omeka\Site\ResourcePageBlockLayout\ResourcePageBlockLayoutInterface;

class ReadingAssistance implements ResourcePageBlockLayoutInterface
{
    public function getLabel(): string
    {
        return '古典籍 OCR 閲覧支援';
    }

    public function getCompatibleResourceNames(): array
    {
        return ['items'];
    }

    public function render(PhpRenderer $view, AbstractResourceEntityRepresentation $resource): string
    {
        return $resource instanceof ItemRepresentation ? $view->readingAssistance($resource) : '';
    }
}
