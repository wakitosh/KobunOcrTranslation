"""Run real OCR/LLM stages in a temporary Store without updating research documents."""
import argparse
import json
from pathlib import Path
import tempfile
import time
from store import Store


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--config', type=Path, required=True)
    parser.add_argument('--image', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    config = json.loads(args.config.read_text())
    config.pop('ndl_root', None)
    config['ndl_code_root'] = str(Path(__file__).parent/'vendor/ndlkotenocr')
    args.output.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='integration-', dir=args.output) as temp:
        store = Store(Path(temp)/'data', config)
        try:
            doc = store.create({'media_id': 1, 'item_id': 1, 'image_url': 'local-fixture'}, args.image.read_bytes())
            for operation in ['layout', 'recognize', 'translate']:
                if operation == 'translate':
                    doc = store.save_translation_input(doc['id'], {'base_revision': doc['revision'],
                        'line_ids': [line['id'] for line in doc['lines'][:4]],
                        'text': ''.join(line['raw'] for line in doc['lines'][:4])})
                store.submit(doc['id'], {'operation': operation, 'base_revision': doc['revision']})
                deadline = time.monotonic() + 310
                while time.monotonic() < deadline:
                    doc = store.get(doc['id'])
                    if doc['job']['status'] in ['completed', 'error']:
                        break
                    time.sleep(0.1)
                if doc['job']['status'] != 'completed':
                    raise RuntimeError(doc['job'])
                (args.output/f'{operation}.json').write_text(json.dumps(doc, ensure_ascii=False, indent=2))
                print(json.dumps({'operation': operation, 'lines': len(doc['lines']),
                    'milliseconds': round(doc['last_metrics']['end_to_end_ms']), 'translation': doc.get('translation')}, ensure_ascii=False), flush=True)
        finally:
            store.close()


if __name__ == '__main__':
    main()
