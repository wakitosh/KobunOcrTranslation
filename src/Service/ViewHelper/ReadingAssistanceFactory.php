<?php
declare(strict_types=1);

namespace KobunOcrTranslation\Service\ViewHelper;

use Interop\Container\ContainerInterface;
use KobunOcrTranslation\View\Helper\ReadingAssistance;
use Laminas\ServiceManager\Factory\FactoryInterface;

class ReadingAssistanceFactory implements FactoryInterface
{
    public function __invoke(ContainerInterface $services, $requestedName, ?array $options = null): ReadingAssistance
    {
        return new ReadingAssistance(
            (array) ($services->get('Config')['kobun_ocr'] ?? []),
            $services->get('Omeka\Settings\Site'),
            $services->get('Omeka\Settings')
        );
    }
}
