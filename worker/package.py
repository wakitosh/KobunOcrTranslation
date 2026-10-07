"""Build a source-included Omeka ZIP; large/private runtime files are excluded by allowlist."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

MODULE = Path(__file__).resolve().parent.parent
ROOT_FILES = ['Module.php', 'README.md', 'CHANGELOG.md', 'DISTRIBUTION.md', 'INSTALL_RHEL9.md', 'LOCAL_MACOS.md', 'THIRD_PARTY_NOTICES.md', 'LICENSE',
    'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.js', 'playwright.config.ts', 'playwright.llm.config.ts', 'playwright.reading.config.ts',
    'tests/llm.spec.ts', 'tests/service.spec.ts', 'tests/cache-permissions.spec.ts', 'tests/reading-window.spec.ts', 'tests/reading-fixture.php', 'tests/visitor-policy.php', 'tests/backend-config.php']
PATTERNS = ['config/*.php', 'config/*.ini', 'src/**/*.php', 'view/**/*.phtml', 'asset/dist/*', 'asset/*.js', 'asset/*.css',
    'ui/*.tsx', 'ui/*.ts', 'ui/*.css', 'licenses/*.txt', 'evaluation/*.json', 'worker/*.py',
    'worker/*.sh', 'worker/requirements.lock', 'worker/models.json', 'worker/vendor/ndlkotenocr/**/*']


def release_files():
    files = {MODULE/name for name in ROOT_FILES}
    for pattern in PATTERNS:
        files.update(file for file in MODULE.glob(pattern) if file.is_file() and '__pycache__' not in file.parts)
    for file in files:
        relative = file.relative_to(MODULE)
        if file.is_symlink() or file.suffix in ('.gguf', '.onnx', '.pyc') or file.stat().st_size > 2_000_000:
            raise ValueError(f'Unexpected release file: {relative}')
    return sorted(files)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    version = json.loads((MODULE/'package.json').read_text())['version']
    archive = args.output/f'KobunOcrTranslation-{version}.zip'
    hashes = {}
    with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as output:
        for file in release_files():
            name = str(Path('KobunOcrTranslation')/file.relative_to(MODULE))
            content = file.read_bytes()
            info = zipfile.ZipInfo(name, date_time=(2026, 9, 15, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = (0o100644 << 16)
            output.writestr(info, content)
            hashes[name] = hashlib.sha256(content).hexdigest()
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    (archive.with_suffix('.sha256')).write_text(f'{digest}  {archive.name}\n')
    (archive.with_suffix('.manifest.json')).write_text(json.dumps({'version': version,
        'size_bytes': archive.stat().st_size, 'sha256': digest, 'files': hashes}, indent=2))
    print(f'{archive}: {archive.stat().st_size:,} bytes; {len(hashes)} files; SHA-256 {digest}')


if __name__ == '__main__':
    main()
