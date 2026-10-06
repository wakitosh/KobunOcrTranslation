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
  </w:body>
</w:document>
XML;

try {
    $zip = new ZipArchive();
    if ($zip->open($path, ZipArchive::OVERWRITE) !== true) {
        throw new RuntimeException('Could not create a test DOCX.');
    }
    $zip->addFromString('word/document.xml', $xml);
    $zip->close();

    $result = (new DocxTranscriptionParser())->parse($path, 'ruby-test.docx');
    $actual = $result['sections'][0]['lines'] ?? [];
    $expected = [
        '又こうあん_(（弘　　安）)三年',
        'るゑんたう^(（え）)_(（筵　道）)',
        '字^(みぎ)',
    ];
    if ($actual !== $expected) {
        fwrite(STDERR, "Unexpected transcription:\n" . json_encode($actual, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n");
        exit(1);
    }
    if (!in_array('左ルビ・下側の注記を _(...) に変換', $result['notation'] ?? [], true)) {
        fwrite(STDERR, "Left-ruby notation is missing.\n");
        exit(1);
    }
    echo "DOCX ruby parser test passed.\n";
} finally {
    @unlink($path);
}
