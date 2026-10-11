<?php
declare(strict_types=1);

require dirname(__DIR__) . '/src/DocxTranscriptionParser.php';

use KobunOcrTranslation\DocxTranscriptionParser;

if (!class_exists(ZipArchive::class) || !class_exists(DOMDocument::class)) {
    fwrite(STDERR, "zip and dom extensions are required\n");
    exit(1);
}

$path = tempnam(sys_get_temp_dir(), 'kobun-docx-');
if ($path === false) {
    throw new RuntimeException('Could not create a temporary file.');
}
$xml = <<<'XML'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>古典資料の翻刻</w:t></w:r></w:p>
    <w:p><w:r><w:t>研究者甲・研究者乙</w:t></w:r></w:p>
    <w:p><w:r><w:t>三、翻刻</w:t></w:r></w:p>
    <w:p><w:r><w:t>［一オ］</w:t></w:r></w:p>
    <w:p>
      <w:r><w:t>又</w:t></w:r>
      <w:r><w:fldChar w:fldCharType="begin"/></w:r>
      <w:r><w:instrText>EQ \* jc0 \o(\s\do 5( （弘　　安） ),こうあん)</w:instrText></w:r>
      <w:r><w:fldChar w:fldCharType="end"/></w:r>
      <w:r><w:t>三年</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:fldChar w:fldCharType="begin"/></w:r>
      <w:r><w:instrText>EQ \o(\s\up 8(（え）),\s\do 5(（筵　道）),るゑんたう)</w:instrText></w:r>
      <w:r><w:fldChar w:fldCharType="end"/></w:r>
    </w:p>
    <w:p><w:r><w:ruby><w:rt><w:r><w:t>みぎ</w:t></w:r></w:rt><w:rubyBase><w:r><w:t>字</w:t></w:r></w:rubyBase></w:ruby></w:r></w:p>
    <w:p>
      <w:r><w:t>〈</w:t></w:r>
      <w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>頭注</w:t></w:r>
      <w:r><w:t>（人物）〉</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>〈</w:t></w:r>
      <w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>脚注末尾の書入〉</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>本文</w:t></w:r>
      <w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>注</w:t></w:r>
      <w:r><w:t>七を確かめる</w:t></w:r>
      <w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>（よみ）</w:t></w:r>
      <w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>注八</w:t></w:r>
      <w:r><w:t>続き注１２</w:t><w:footnoteReference w:id="1"/><w:endnoteReference w:id="1"/></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>〈</w:t></w:r>
      <w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>頭注一日の書入〉</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:fldChar w:fldCharType="begin"/></w:r>
      <w:r><w:instrText>EQ \o(\s\up 8(注二),注意書き)</w:instrText></w:r>
      <w:r><w:fldChar w:fldCharType="end"/></w:r>
    </w:p>
    <w:p><w:r><w:t>［一ウ］</w:t></w:r></w:p>
    <w:p><w:r><w:t>次のページの本文註十</w:t></w:r></w:p>
    <w:p><w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>注一</w:t></w:r></w:p>
    <w:p><w:r><w:t>編集者による注の説明は翻刻に含めない。</w:t></w:r></w:p>
  </w:body>
</w:document>
XML;

try {
    $zip = new ZipArchive();
    if ($zip->open($path, ZipArchive::OVERWRITE) !== true) {
        throw new RuntimeException('Could not create a test DOCX.');
    }
    $zip->addFromString('word/document.xml', $xml);
    $zip->addFromString('word/header1.xml', '<?xml version="1.0" encoding="UTF-8"?><w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:r><w:t>『研究誌』第七号大学研究会2026</w:t></w:r></w:p></w:hdr>');
    $zip->addFromString('word/footnotes.xml', '<?xml version="1.0" encoding="UTF-8"?><w:footnotes xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:footnote w:id="1"><w:p><w:r><w:t>Word編集者の脚注本文</w:t></w:r></w:p></w:footnote></w:footnotes>');
    $zip->addFromString('word/endnotes.xml', '<?xml version="1.0" encoding="UTF-8"?><w:endnotes xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:endnote w:id="1"><w:p><w:r><w:t>Word編集者の後注本文</w:t></w:r></w:p></w:endnote></w:endnotes>');
    $zip->close();

    $result = (new DocxTranscriptionParser())->parse($path, 'ruby-test.docx');
    $actual = $result['sections'][0]['lines'] ?? [];
    $expected = [
        '又こうあん_(（弘　　安）)三年',
        'るゑんたう^(（え）)_(（筵　道）)',
        '字^(みぎ)',
        '〈頭注（人物）〉',
        '〈脚注末尾の書入〉',
        '本文を確かめる^(（よみ）)続き',
        '〈頭注一日の書入〉',
        '注意書き',
    ];
    if ($actual !== $expected) {
        fwrite(STDERR, "Unexpected transcription:\n" . json_encode($actual, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n");
        exit(1);
    }
    if (!in_array('左ルビ・下側の注記を _(...) に変換', $result['notation'] ?? [], true)) {
        fwrite(STDERR, "Left-ruby notation is missing.\n");
        exit(1);
    }
    if (($result['sections'][1]['lines'] ?? []) !== ['次のページの本文'] || count($result['sections']) !== 2) {
        throw new RuntimeException('Unexpected page or editorial notes: ' . json_encode($result['sections'], JSON_UNESCAPED_UNICODE));
    }
    $citation = $result['metadata']['citation'] ?? '';
    if ($citation !== '研究者甲・研究者乙（2026）「古典資料の翻刻」『研究誌』第七号.') {
        throw new RuntimeException('Citation candidates must end with an ASCII period.');
    }
    echo "DOCX ruby, marginal/editorial notes and citation parser tests passed.\n";
} finally {
    @unlink($path);
}
