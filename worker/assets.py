"""Explicit model acquisition. No network activity on module activation or worker start."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import urllib.request

MANIFEST = Path(__file__).with_name('models.json')


def catalog():
    return json.loads(MANIFEST.read_text())


def model_entry(model_id):
    for entry in catalog()['llm']:
        if entry['id'] == model_id:
            return entry
    raise ValueError(f'Unknown model: {model_id}')


def verify(file, entry):
    if not file.is_file() or file.stat().st_size != entry['size_bytes']:
        return False
    with file.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest() == entry['sha256']


def acquire(file, entry):
    if verify(file, entry):
        print(f'Verified: {file.name}', flush=True)
        return
    if file.exists():
        raise ValueError(f'Existing file does not match manifest; move it aside first: {file}')
    file.parent.mkdir(parents=True, exist_ok=True)
    temp = file.with_suffix(file.suffix + '.partial')
    print(f'Download {file.name}: {entry["size_bytes"] / 1e9:.2f} GB, {entry["license"]}\n{entry["license_url"]}', flush=True)
    # Incomplete downloads are never treated as a usable model.
    with urllib.request.urlopen(entry['url'], timeout=120) as response, temp.open('wb') as output:
        shutil.copyfileobj(response, output, 1024 * 1024)
    if not verify(temp, entry):
        raise ValueError(f'Download failed size/SHA-256 check: {temp}')
    os.replace(temp, file)
    print(f'Verified: {file.name}', flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['list', 'fetch', 'verify'])
    parser.add_argument('--runtime', type=Path)
    parser.add_argument('--model', help='Explicit LLM selection; see list')
    parser.add_argument('--ocr', action='store_true', help='Select the two NDL OCR models')
    args = parser.parse_args()
    if args.action == 'list':
        print(MANIFEST.read_text())
        return
    if not args.runtime or not (args.model or args.ocr):
        parser.error('--runtime and --model and/or --ocr are required')
    entries = []
    if args.ocr:
        entries += [(args.runtime/'models/ndl'/entry['filename'], entry) for entry in catalog()['ocr']]
    if args.model:
        entry = model_entry(args.model)
        entries.append((args.runtime/'models'/entry['filename'], entry))
    for file, entry in entries:
        if args.action == 'fetch':
            acquire(file, entry)
        elif not verify(file, entry):
            raise ValueError(f'Missing or invalid model: {file}')
        else:
            print(f'Verified: {file.name}')


if __name__ == '__main__':
    main()
