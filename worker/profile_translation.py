"""Run fixed translation cases and measure the resident LLM on the same host; no service changes."""
import argparse
from datetime import datetime, timezone
import json
import math
from pathlib import Path
import statistics
import time
from urllib.parse import urlsplit
from engine import translate
from measure import host_info, ProcessMonitor


def validate_cases(cases):
    if not isinstance(cases, list) or not cases:
        raise ValueError('Cases must be a non-empty JSON array')
    ids = set()
    for case in cases:
        if not isinstance(case, dict) or not isinstance(case.get('id'), str) or not case['id'] or not isinstance(case.get('text'), str) or not case['text'].strip():
            raise ValueError('Each case requires a non-empty id and text')
        if case['id'] in ids:
            raise ValueError('Case ids must be unique')
        ids.add(case['id'])


def summarize(trials):
    successful = [trial['elapsed_seconds'] for trial in trials if 'error' not in trial]
    return {'trials': len(trials), 'successes': len(successful),
        'median_seconds': statistics.median(successful) if successful else None,
        'p95_seconds': sorted(successful)[math.ceil(len(successful)*0.95)-1] if len(successful) >= 20 else None,
        'rss_peak_sampled_bytes': max(trial['llm_process']['rss_peak_sampled_bytes'] for trial in trials)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--config', type=Path, required=True)
    parser.add_argument('--cases', type=Path, default=Path(__file__).parent.parent/'evaluation/cases.json')
    parser.add_argument('--case-id', help='Run just this case for an initial short probe')
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--llama-pid', type=int, required=True, help='PID of the measured LLM; must be on this host')
    parser.add_argument('--repeat', type=int, default=1)
    parser.add_argument('--label', required=True, help='Host/CPU allocation label, e.g. mac-cpu4')
    args = parser.parse_args()
    if not 1 <= args.repeat <= 20: parser.error('--repeat must be between 1 and 20')
    config = json.loads(args.config.read_text())
    if urlsplit(config['llm_url']).hostname not in ('localhost', '127.0.0.1', '::1'):
        parser.error('Run this measurement on the LLM host with a loopback llm_url')
    cases = json.loads(args.cases.read_text())
    validate_cases(cases)
    if args.case_id:
        cases = [case for case in cases if case['id'] == args.case_id]
        if not cases: parser.error('No matching --case-id')
    # Each experiment owns a new directory; never overwrite earlier measurements.
    args.output.mkdir(parents=True, exist_ok=False)
    (args.output/'.htaccess').write_text('Require all denied\n')
    result = {'label': args.label, 'started_at': datetime.now(timezone.utc).isoformat(), 'host': host_info(), 'model': {key: config.get(key) for key in
        ['llm_model', 'llm_model_sha256', 'llama_revision', 'threads', 'context_size', 'prompt_revision']},
        'notes': ['Model already loaded; cache state appears in each response.',
            'Measurements apply to this host and PID, not to another server.',
            'Do not run alongside other inference requests; process CPU/RSS includes all its requests.'], 'trials': []}
    for repeat in range(args.repeat):
        for index, case in enumerate(cases):
            folder = args.output/f'run-{repeat+1:02d}-{index+1:02d}'
            folder.mkdir()
            trial = {'case': case, 'repeat': repeat+1}
            monitor = ProcessMonitor(args.llama_pid).start()
            if 'llama' not in monitor.samples[0]['executable'].lower():
                monitor.finish(); raise ValueError('Selected PID is not a llama process')
            start = time.perf_counter()
            try:
                output = translate({'lines': [{'id': 'input', 'raw': case['text']}], 'input_text': case['text'], 'run_dir': str(folder)}, config)
                trial['result'] = output
            except Exception as exc:
                trial['error'] = str(exc)
            finally:
                trial['elapsed_seconds'] = time.perf_counter()-start
                trial['llm_process'] = monitor.finish()
            result['trials'].append(trial)
            (args.output/'profile.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
            print(json.dumps({'case': case.get('id', index), 'seconds': round(trial['elapsed_seconds'],2),
                'rss_gib': round(trial['llm_process']['rss_peak_sampled_bytes']/2**30,2), 'error': trial.get('error')}, ensure_ascii=False), flush=True)
    result['summary_by_case'] = {case['id']: summarize([trial for trial in result['trials'] if trial['case']['id'] == case['id']]) for case in cases}
    result['summary_note'] = 'Timing is grouped by case. P95 is omitted with fewer than 20 successful trials per case. Success means the request completed, not that the translation is accurate.'
    result['finished_at'] = datetime.now(timezone.utc).isoformat()
    (args.output/'profile.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
