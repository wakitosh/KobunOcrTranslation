<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

/** Public-page controls; editorial LLM settings remain independent. No credentials are stored here. */
final class VisitorLlmPolicy
{
    public const SETTING = 'kobun_ocr_visitor_llm_policy';
    public const PROVIDERS = [
        'local' => '図書館のローカルLLM', 'openai' => 'OpenAI (GPT)',
        'anthropic' => 'Anthropic (Claude)', 'google' => 'Google (Gemini)',
    ];
    public const STORAGE = [
        'memory' => 'このページだけ', 'plain' => 'このブラウザに保存（平文）',
        'encrypted' => 'パスフレーズで暗号化して保存',
    ];
    public const CONTROLS = [
        'form_enabled' => '訪問者に「現代語訳の設定」フォームを表示する',
        'provider_choice' => '訪問者によるLLMの選択を許可する',
        'model_choice' => '訪問者によるモデルIDの変更を許可する',
        'storage_choice' => '訪問者による保存方法の選択を許可する',
        'key_input' => '訪問者によるAPIキーの入力・変更を許可する',
        'connection_test' => '接続確認・モデル一覧の取得を許可する',
    ];

    public static function defaults(): array
    {
        return array_fill_keys(array_keys(self::CONTROLS), true) + [
            'providers' => array_keys(self::PROVIDERS), 'storage_modes' => array_keys(self::STORAGE),
            'default_provider' => 'local', 'default_storage' => 'memory',
            'models' => ['openai' => '', 'anthropic' => '', 'google' => ''],
        ];
    }

    public static function load($settings): array
    {
        $value = $settings->get(self::SETTING);
        if ($value === null) {
            return self::defaults();
        }
        try {
            return self::validate($value);
        } catch (\InvalidArgumentException $e) {
            // A damaged stored policy must not accidentally enable commercial services.
            return array_replace(self::defaults(), ['form_enabled' => false, 'providers' => ['local']]);
        }
    }

    public static function validate($value): array
    {
        if (!is_array($value)) {
            throw new \InvalidArgumentException('訪問者のLLM設定の形式が不正です。');
        }
        $policy = self::defaults();
        foreach (self::CONTROLS as $name => $label) {
            $policy[$name] = !empty($value[$name]);
        }
        foreach (['providers' => self::PROVIDERS, 'storage_modes' => self::STORAGE] as $name => $choices) {
            $submitted = $value[$name] ?? [];
            if (!is_array($submitted) || count(array_filter($submitted, 'is_string')) !== count($submitted)
                || array_diff($submitted, array_keys($choices))) {
                throw new \InvalidArgumentException('訪問者に許可するLLM・保存方法の指定が不正です。');
            }
            $policy[$name] = array_values(array_intersect(array_keys($choices), $submitted));
            if (!$policy[$name]) {
                throw new \InvalidArgumentException('利用できるLLMと保存方法は、それぞれ少なくとも1つ許可してください。現代語訳全体を無効にする場合はサイト設定を使用してください。');
            }
        }
        foreach (['default_provider' => 'providers', 'default_storage' => 'storage_modes'] as $name => $allowed) {
            if (!in_array($value[$name] ?? null, $policy[$allowed], true)) {
                throw new \InvalidArgumentException('LLMと保存方法の初期値は、許可した選択肢から選んでください。');
            }
            $policy[$name] = $value[$name];
        }
        $models = $value['models'] ?? [];
        if (!is_array($models)) {
            throw new \InvalidArgumentException('モデルIDの指定が不正です。');
        }
        $effectiveProviders = $policy['form_enabled'] && $policy['provider_choice']
            ? $policy['providers'] : [$policy['default_provider']];
        foreach ($policy['models'] as $provider => $unused) {
            if (isset($models[$provider]) && !is_string($models[$provider])) {
                throw new \InvalidArgumentException('モデルIDの指定が不正です。');
            }
            $model = trim($models[$provider] ?? '');
            if ($model !== '' && !preg_match('/\A[a-zA-Z0-9._-]{1,120}\z/', $model)) {
                throw new \InvalidArgumentException('モデルIDは120文字以内の英数字・ハイフン・ピリオド・アンダースコアで指定してください。');
            }
            if ((!$policy['model_choice'] || !$policy['form_enabled']) && in_array($provider, $effectiveProviders, true) && $model === '') {
                throw new \InvalidArgumentException('モデルIDの変更または設定フォームを無効にする場合、訪問者が利用できる商用LLMのモデルIDを指定してください。');
            }
            $policy['models'][$provider] = $model;
        }
        return $policy;
    }

    public static function allowsLocal(array $policy): bool
    {
        return in_array('local', $policy['providers'], true)
            && (($policy['form_enabled'] && $policy['provider_choice']) || $policy['default_provider'] === 'local');
    }
}
