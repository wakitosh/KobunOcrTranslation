"""Record comparable local model/prompt trials. Quality judgments remain separate."""
import argparse
import copy
import json
from pathlib import Path
import time
from engine import translate, PROMPT_REVISION

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--cases', type=Path, default=Path(__file__).parent.parent/'evaluation/cases.json')
    parser.add_argument('--prompts', nargs='+', help='Default: the revision in config; list revisions explicitly for comparisons')
    args = parser.parse_args()
    config = json.loads(args.config.read_text()); cases = json.loads(args.cases.read_text())
    args.output.mkdir(parents=True, exist_ok=False)
    (args.output/'.htaccess').write_text('Require all denied\n')
    for revision in args.prompts or [config.get('prompt_revision', PROMPT_REVISION)]:
        for case in cases:
            trial = copy.deepcopy(config); trial['prompt_revision'] = revision
            started = time.perf_counter()
            run_dir = args.output/(case['id']+'--'+revision)
            run_dir.mkdir(exist_ok=True)
            try:
                result = translate({'lines': [{'id': case['id'], 'raw': case['text']}], 'input_text': case['text'], 'run_dir': str(run_dir)}, trial)
                record = {'case': case, 'result': result, 'elapsed_seconds': time.perf_counter()-started,
                    'quality_assessment': 'pending human review; not automatically scored'}
            except Exception as exc:
                record = {'case': case, 'error': str(exc), 'elapsed_seconds': time.perf_counter()-started}
            (args.output/(case['id']+'--'+revision+'.json')).write_text(json.dumps(record, ensure_ascii=False, indent=2))
            print(json.dumps({'case': case['id'], 'prompt': revision, 'output': record.get('result', {}).get('translation', {}).get('text'),
                'error': record.get('error'), 'seconds': round(record['elapsed_seconds'], 2)}, ensure_ascii=False), flush=True)

if __name__ == '__main__': main()
