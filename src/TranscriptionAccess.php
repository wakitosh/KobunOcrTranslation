<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

/** The public edit link and workspace must use the same role and item scope. */
final class TranscriptionAccess
{
    public static function canEdit($settings, $identity): bool
    {
        return $identity && (in_array($identity->getRole(), ['global_admin', 'site_admin'], true)
            || in_array($identity->getRole(), (array) $settings->get('kobun_ocr_transcription_roles', []), true));
    }

    public static function scope($settings, $identity): string
    {
        if ($identity && in_array($identity->getRole(), ['global_admin', 'site_admin'], true)) {
            return 'all';
        }
        $scopes = (array) $settings->get('kobun_ocr_transcription_scopes', []);
        return $identity && ($scopes[$identity->getRole()] ?? 'owned') === 'all' ? 'all' : 'owned';
    }

    public static function canAccessItem($settings, $identity, $item): bool
    {
        if (!self::canEdit($settings, $identity)) {
            return false;
        }
        if (self::scope($settings, $identity) === 'all') {
            return true;
        }
        $owner = $item->owner();
        return $owner && (int) $owner->id() === (int) $identity->getId();
    }
}
