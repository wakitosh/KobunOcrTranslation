<?php
declare(strict_types=1);

namespace KobunOcrTranslation;

/** Extract page-scoped plain-text transcriptions from a WordprocessingML file. */
class DocxTranscriptionParser
{
    private const WORD_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
    private const MAX_XML_BYTES = 12_000_000;
    private const MAX_SECTIONS = 1000;
    private const MAX_LINES_PER_SECTION = 500;
    private const MAX_LINE_CHARS = 4000;

    public function parse(string $path, string $filename = ''): array
    {
        if (!class_exists(\ZipArchive::class) || !class_exists(\DOMDocument::class)) {
            throw new \RuntimeException('Word取込にはPHPのzip・dom拡張が必要です。');
        }
        $zip = new \ZipArchive();
        if ($zip->open($path) !== true) {
            throw new \InvalidArgumentException('Wordファイルを開けません。拡張子が.docxのファイルを選択してください。');
        }
        $headerXml = [];
        try {
            $stat = $zip->statName('word/document.xml');
            if (!$stat || ($stat['size'] ?? 0) <= 0 || ($stat['size'] ?? 0) > self::MAX_XML_BYTES) {
                throw new \InvalidArgumentException('Word本文が見つからないか、大きすぎます。');
            }
            $xml = $zip->getFromName('word/document.xml');
            for ($index = 0; $index < $zip->numFiles; $index++) {
                $name = (string) $zip->getNameIndex($index);
                if (preg_match('~^word/header\d+\.xml$~', $name)) {
                    $value = $zip->getFromName($name);
                    if (is_string($value) && strlen($value) <= 100_000) {
                        $headerXml[] = $value;
                    }
                }
            }
        } finally {
            $zip->close();
        }
        if (!is_string($xml) || $xml === '') {
            throw new \InvalidArgumentException('Word本文を読み取れません。');
        }

        $previous = libxml_use_internal_errors(true);
        try {
            $document = new \DOMDocument();
            if (!$document->loadXML($xml, LIBXML_NONET | LIBXML_NOBLANKS | LIBXML_NOERROR | LIBXML_NOWARNING)) {
                throw new \InvalidArgumentException('Word本文のXMLが不正です。');
            }
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }
        $xpath = new \DOMXPath($document);
        $xpath->registerNamespace('w', self::WORD_NS);
        $nodes = $xpath->query('/w:document/w:body//w:p[not(ancestor::w:txbxContent)]');
        if (!$nodes) {
            throw new \InvalidArgumentException('Word本文に段落がありません。');
        }

        $paragraphs = [];
        foreach ($nodes as $paragraph) {
            $text = $this->paragraphText($paragraph, $xpath);
            $text = str_replace(["\r\n", "\r", "\u{00a0}"], ["\n", "\n", ' '], $text);
            $text = preg_replace('/[ \t\n\x{3000}]+$/u', '', $text) ?? $text;
            if ($text !== '') {
                $paragraphs[] = $text;
            }
        }
        if (!$paragraphs) {
            throw new \InvalidArgumentException('Word本文から文字列を抽出できません。');
        }

        $legend = [];
        $inLegend = false;
        $transcriptionStarted = false;
        $sections = [];
        $current = null;
        $fallback = [];
        foreach ($paragraphs as $paragraph) {
            $heading = preg_replace('/[\s　]+/u', '', $paragraph);
            if (preg_match('/^[二2２][、.．]凡例$/u', $heading)) {
                $inLegend = true;
                continue;
            }
            if (preg_match('/^[三3３][、.．]翻刻$/u', $heading)) {
                $inLegend = false;
                $transcriptionStarted = true;
                continue;
            }
            if ($inLegend) {
                if (str_starts_with(ltrim($paragraph), '・') && count($legend) < 30) {
                    $legend[] = mb_substr($paragraph, 0, 2000);
                }
                continue;
            }

            $marker = $this->pageMarker($paragraph);
            if ($marker !== null) {
                $transcriptionStarted = true;
                if ($current !== null) {
                    $sections[] = $current;
                }
                if (count($sections) >= self::MAX_SECTIONS) {
                    throw new \InvalidArgumentException('Word本文のページ区切りが多すぎます。');
                }
                $current = ['label' => $marker, 'lines' => []];
                continue;
            }
            if (!$transcriptionStarted) {
                continue;
            }
            if ($current !== null && preg_match('/^(注|註|参考文献)$/u', trim($paragraph))) {
                break;
            }
            $parts = preg_split('/\n/u', $paragraph) ?: [];
            foreach ($parts as $part) {
                $part = rtrim($part, " \t");
                if ($part === '') {
                    continue;
                }
                if (mb_strlen($part) > self::MAX_LINE_CHARS) {
                    throw new \InvalidArgumentException('Word本文に4000文字を超える行があります。');
                }
                if ($current !== null) {
                    if (count($current['lines']) >= self::MAX_LINES_PER_SECTION) {
                        throw new \InvalidArgumentException($current['label'] . 'の行数が500行を超えています。');
                    }
                    $current['lines'][] = $part;
                } else {
                    $fallback[] = $part;
                }
            }
        }
        if ($current !== null) {
            $sections[] = $current;
        }
        $sections = array_values(array_filter($sections, static fn (array $section): bool => (bool) $section['lines']));
        if (!$sections && $fallback) {
            if (count($fallback) > self::MAX_LINES_PER_SECTION) {
                throw new \InvalidArgumentException('Word本文の行数が500行を超えています。丁付を追加するか、ページごとに分割してください。');
            }
            $sections[] = ['label' => '文書全体', 'lines' => $fallback];
        }
        if (!$sections) {
            throw new \InvalidArgumentException('丁付または翻刻本文を検出できません。');
        }

        $metadata = $this->publicationMetadata($paragraphs, $headerXml);

        return [
            'filename' => $filename,
            'sections' => $sections,
            'legend' => $legend,
            'metadata' => $metadata,
            'notation' => [
                '［丁数オ／ウ］をページ区切りとして検出',
                '右ルビ・上側の注記を ^(...) に変換',
                '左ルビ・下側の注記を _(...) に変換',
                '下線を ＿...＿ に変換',
                '字下げ、踊り字、括弧類を保持',
            ],
        ];
    }

    /** Extract editable citation candidates; callers must still review them. */
    private function publicationMetadata(array $paragraphs, array $headerXml): array
    {
        $metadata = [];
        if (isset($paragraphs[0]) && mb_strlen($paragraphs[0]) <= 500) {
            $metadata['title'] = trim($paragraphs[0]);
        }
        $authorLine = null;
        foreach (array_slice($paragraphs, 1, 6) as $paragraph) {
            if (str_contains($paragraph, '・') && mb_strlen($paragraph) <= 2000) {
                $authorLine = $paragraph;
                break;
            }
        }
        if ($authorLine !== null) {
            $names = preg_split('/\s*・\s*/u', trim($authorLine)) ?: [];
            $names = array_values(array_filter(array_map(static fn (string $name): string =>
                preg_replace('/[ \x{3000}]+/u', ' ', trim($name)) ?? trim($name), $names)));
            if ($names) {
                $metadata['contributors'] = implode("\n", $names);
            }
        }

        $candidates = [];
        foreach ($headerXml as $xml) {
            $previous = libxml_use_internal_errors(true);
            $header = new \DOMDocument();
            $loaded = $header->loadXML($xml, LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING);
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
            if (!$loaded) {
                continue;
            }
            $xpath = new \DOMXPath($header);
            $xpath->registerNamespace('w', self::WORD_NS);
            $text = '';
            foreach ($xpath->query('//w:t') ?: [] as $node) {
                $text .= $node->textContent;
            }
            if (preg_match('/『([^』]{1,500})』第([^号]{1,100})号\s*(.+?)\s*([12][0-9]{3})\s*$/u', trim($text), $match)) {
                $candidate = [
                    'journal_title' => trim($match[1]),
                    'journal_issue' => '第' . trim($match[2]) . '号',
                    'publisher' => trim($match[3]),
                    'publication_year' => $match[4],
                ];
                $key = json_encode($candidate, JSON_UNESCAPED_UNICODE);
                $candidates[$key] = ($candidates[$key] ?? 0) + 1;
            }
        }
        if ($candidates) {
            arsort($candidates);
            $candidate = json_decode((string) array_key_first($candidates), true);
            if (is_array($candidate)) {
                $metadata += $candidate;
            }
        }
        if (!empty($metadata['title']) && !empty($metadata['contributors'])
            && !empty($metadata['journal_title']) && !empty($metadata['publication_year'])) {
            $authors = str_replace("\n", '・', $metadata['contributors']);
            $metadata['citation'] = $authors . '（' . $metadata['publication_year'] . '）「'
                . $metadata['title'] . '」『' . $metadata['journal_title'] . '』'
                . ($metadata['journal_issue'] ?? '') . '。';
        }
        return $metadata;
    }

    private function pageMarker(string $text): ?string
    {
        $trimmed = trim($text);
        return preg_match('/^[［\[]\s*[一二三四五六七八九十百〇零0-9０-９]+\s*(?:オ|ウ|表|裏)\s*[］\]]$/u', $trimmed)
            ? $trimmed : null;
    }

    private function paragraphText(\DOMNode $paragraph, \DOMXPath $xpath): string
    {
        $nodes = $xpath->query('.//w:ruby | .//w:r[not(ancestor::w:del) and not(ancestor::w:ruby) and not(descendant::w:ruby)]', $paragraph);
        if (!$nodes) {
            return '';
        }
        $result = '';
        $buffer = '';
        $format = '';
        $fieldCode = null;
        $fieldDisplay = '';
        $fieldSeparated = false;
        $flush = static function () use (&$result, &$buffer, &$format): void {
            if ($buffer === '') {
                return;
            }
            $text = $buffer;
            if (str_contains($format, 'underline')) {
                $text = '＿' . $text . '＿';
            }
            if (str_contains($format, 'superscript')) {
                $text = '^(' . $text . ')';
            }
            $result .= $text;
            $buffer = '';
        };

        foreach ($nodes as $node) {
            if ($node->localName === 'ruby') {
                $flush();
                $base = $this->nodeText($xpath->query('.//w:rubyBase//w:r', $node), $xpath);
                $reading = $this->nodeText($xpath->query('.//w:rt//w:r', $node), $xpath);
                $result .= $base . ($reading !== '' ? '^(' . $reading . ')' : '');
                $format = '';
                continue;
            }
            $fieldType = $xpath->evaluate('string(w:fldChar/@w:fldCharType)', $node);
            if ($fieldType === 'begin') {
                $flush();
                $fieldCode = '';
                $fieldDisplay = '';
                $fieldSeparated = false;
                continue;
            }
            if ($fieldCode !== null) {
                foreach ($xpath->query('.//w:instrText', $node) ?: [] as $instruction) {
                    $fieldCode .= $instruction->textContent;
                }
                if ($fieldType === 'separate') {
                    $fieldSeparated = true;
                } elseif ($fieldSeparated && $fieldType !== 'end') {
                    $fieldDisplay .= $this->runText($node, $xpath);
                }
                if ($fieldType === 'end') {
                    $converted = $this->equationRubyText($fieldCode);
                    $result .= $converted ?? $fieldDisplay;
                    $fieldCode = null;
                    $fieldDisplay = '';
                    $fieldSeparated = false;
                }
                continue;
            }
            if ($xpath->evaluate('boolean(w:rPr/w:vanish)', $node)) {
                continue;
            }
            $text = $this->runText($node, $xpath);
            if ($text === '') {
                continue;
            }
            $nextFormat = '';
            if ($xpath->evaluate('string(w:rPr/w:vertAlign/@w:val)', $node) === 'superscript') {
                $nextFormat .= 'superscript ';
            }
            $underline = $xpath->evaluate('string(w:rPr/w:u/@w:val)', $node);
            if ($underline !== '' && $underline !== 'none' && $underline !== '0') {
                $nextFormat .= 'underline';
            }
            $nextFormat = trim($nextFormat);
            if ($nextFormat !== $format) {
                $flush();
                $format = $nextFormat;
            }
            $buffer .= $text;
        }
        $flush();
        return $result;
    }

    /** Convert legacy Word EQ overstrike fields used for left/right ruby. */
    private function equationRubyText(string $code): ?string
    {
        if (!preg_match('/^\s*EQ\b/iu', $code)) {
            return null;
        }
        $overstrike = strpos($code, '\\o');
        if ($overstrike === false) {
            return null;
        }
        $open = strpos($code, '(', $overstrike + 2);
        if ($open === false) {
            return null;
        }
        $content = $this->parenthesizedContent($code, $open);
        if ($content === null) {
            return null;
        }

        $base = '';
        $right = [];
        $left = [];
        foreach ($this->splitFieldArguments($content) as $argument) {
            $argument = $this->trimFieldText($argument);
            if (preg_match('/^\\\\s\\\\(up|do)\s+\d+\s*(\()/iu', $argument, $match, PREG_OFFSET_CAPTURE)) {
                $annotation = $this->parenthesizedContent($argument, $match[2][1]);
                $annotation = $annotation === null ? '' : $this->trimFieldText($annotation);
                if ($annotation !== '') {
                    if (mb_strtolower($match[1][0]) === 'up') {
                        $right[] = $annotation;
                    } else {
                        $left[] = $annotation;
                    }
                }
            } elseif ($argument !== '') {
                $base = $argument;
            }
        }
        if ($base === '' || (!$right && !$left)) {
            return null;
        }
        foreach ($right as $annotation) {
            $base .= '^(' . $annotation . ')';
        }
        foreach ($left as $annotation) {
            $base .= '_(' . $annotation . ')';
        }
        return $base;
    }

    private function parenthesizedContent(string $value, int $open): ?string
    {
        if (($value[$open] ?? '') !== '(') {
            return null;
        }
        $depth = 0;
        $quoted = false;
        $length = strlen($value);
        for ($index = $open; $index < $length; ++$index) {
            $character = $value[$index];
            if ($character === '"') {
                $quoted = !$quoted;
                continue;
            }
            if ($quoted) {
                continue;
            }
            if ($character === '(') {
                ++$depth;
            } elseif ($character === ')' && --$depth === 0) {
                return substr($value, $open + 1, $index - $open - 1);
            }
        }
        return null;
    }

    private function splitFieldArguments(string $value): array
    {
        $arguments = [];
        $start = 0;
        $depth = 0;
        $quoted = false;
        $length = strlen($value);
        for ($index = 0; $index < $length; ++$index) {
            $character = $value[$index];
            if ($character === '"') {
                $quoted = !$quoted;
            } elseif (!$quoted && $character === '(') {
                ++$depth;
            } elseif (!$quoted && $character === ')') {
                --$depth;
            } elseif (!$quoted && $depth === 0 && $character === ',') {
                $arguments[] = substr($value, $start, $index - $start);
                $start = $index + 1;
            }
        }
        $arguments[] = substr($value, $start);
        return $arguments;
    }

    private function trimFieldText(string $value): string
    {
        return preg_replace('/^[\s\x{3000}]+|[\s\x{3000}]+$/u', '', $value) ?? trim($value);
    }

    private function nodeText($runs, \DOMXPath $xpath): string
    {
        $text = '';
        if ($runs) {
            foreach ($runs as $run) {
                $text .= $this->runText($run, $xpath);
            }
        }
        return $text;
    }

    private function runText(\DOMNode $run, \DOMXPath $xpath): string
    {
        $text = '';
        $content = $xpath->query('.//w:t | .//w:tab | .//w:br | .//w:cr', $run);
        if (!$content) {
            return $text;
        }
        foreach ($content as $node) {
            $text .= $node->localName === 't' ? $node->textContent
                : ($node->localName === 'tab' ? "\t" : "\n");
        }
        return $text;
    }
}
