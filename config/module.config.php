<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

use Laminas\Router\Http\Segment;

return [
    'controllers' => ['invokables' => [
        Controller\WorkspaceController::class => Controller\WorkspaceController::class,
        Controller\ReadingController::class => Controller\ReadingController::class,
    ]],
    'router' => ['routes' => [
        'kobun-ocr-reading' => [
            'type' => Segment::class,
            'options' => [
                'route' => '/s/:site-slug/kobun-reading/:action',
                'constraints' => ['action' => 'start|status|run'],
                'defaults' => [
                    'controller' => Controller\ReadingController::class,
                    '__SITE__' => true,
                ],
            ],
        ],
        'admin' => ['child_routes' => ['kobun-ocr' => [
        'type' => 'Segment',
        'options' => [
            'route' => '/kobun-ocr[/:action]',
            'constraints' => ['action' => 'index|pages|proxy|import|service'],
            'defaults' => ['__NAMESPACE__' => __NAMESPACE__ . '\\Controller',
                'controller' => Controller\WorkspaceController::class, 'action' => 'index'],
        ],
    ]]]]],
    'navigation' => ['AdminModule' => [[
        'label' => '古典籍 OCR・現代語訳', 'route' => 'admin/kobun-ocr',
        'resource' => Controller\WorkspaceController::class, 'privilege' => 'index',
    ]]],
    'view_manager' => ['template_path_stack' => [__DIR__ . '/../view']],
    'view_helpers' => ['factories' => [
        'readingAssistance' => Service\ViewHelper\ReadingAssistanceFactory::class,
    ]],
    'resource_page_block_layouts' => ['invokables' => [
        'kobunReadingAssistance' => Site\ResourcePageBlockLayout\ReadingAssistance::class,
    ]],
    // Override these deployment-specific values in config/local.config.php.
    'kobun_ocr' => array_replace([
        'backend_url' => getenv('KOBUN_BACKEND_URL') ?: 'http://127.0.0.1:8766',
        'control_url' => getenv('KOBUN_CONTROL_URL') ?: 'http://127.0.0.1:8767',
        'token_file' => getenv('KOBUN_TOKEN_FILE') ?: OMEKA_PATH . '/var/kobun-ocr-translation/backend-token',
        'image_hosts' => ['dc.tulips.tsukuba.ac.jp'],
        'resource_hosts' => ['dc.tulips.tsukuba.ac.jp', 'omeka-s.ddev.site'],
        'public_ocr_pages_per_hour' => 24,
        'public_translations_per_hour' => 6,
    ], require __DIR__ . '/backend.config.php'),
];
