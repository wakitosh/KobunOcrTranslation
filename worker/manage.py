"""Manage local OCR and CPU/Metal LLM servers; models and private data stay outside the module."""
import argparse
import json
import os
from pathlib import Path
import signal
import secrets
import subprocess
import sys
import tempfile
import time
from assets import catalog, model_entry, verify
from translation_policy import MODERN_REVISION
from model_storage import check_runtime_models

# Development default shared with the Omeka module configuration. Production
# installations should set KOBUN_RUNTIME to a private application-data path
# such as /var/lib/omeka-s/kobun-ocr-translation.
DEFAULT_RUNTIME = Path(__file__).resolve().parents[3] / 'var/kobun-ocr-translation'


def running(pid):
    try:
        os.kill(pid, 0)
        return True
    except ProcessLookupError:
        return False
    except PermissionError:
        # EPERM from kill(pid, 0) means the process exists but is not signalable.
        return True


def owned(name, entry):
    if not running(entry['pid']):
        return False
    try:
        result = subprocess.run(['ps', '-p', str(entry['pid']), '-o', 'command='], capture_output=True, text=True)
    except OSError:
        return False
    return entry['marker'] in result.stdout


def write_config(runtime, config):
    """Readers see either the old or the complete new private configuration."""
    with tempfile.NamedTemporaryFile(mode='w', dir=runtime, prefix='.config-', delete=False) as stream:
        temporary = Path(stream.name)
        try:
            json.dump(config, stream, ensure_ascii=False, indent=2)
            stream.flush()
            os.fsync(stream.fileno())
            os.replace(temporary, runtime/'config.json')
        finally:
            temporary.unlink(missing_ok=True)


def initialize(runtime, model_id=None, ocr_only=False, llm_backend=None):
    if model_id and ocr_only:
        raise ValueError('Choose --model or --ocr-only, not both.')
    if llm_backend not in (None, 'cpu', 'metal') or (llm_backend == 'metal' and sys.platform != 'darwin'):
        raise ValueError('Choose cpu, or metal on macOS.')
    if ocr_only and llm_backend:
        raise ValueError('An LLM backend requires a model.')
    runtime.mkdir(parents=True, exist_ok=True)
    (runtime/'.htaccess').write_text('Require all denied\n')
    token = runtime/'backend-token'
    if not token.exists():
        token.write_text(secrets.token_urlsafe(40)); token.chmod(0o600)
    file = runtime/'config.json'
    config = json.loads(file.read_text()) if file.exists() else {}
    nfs_models = check_runtime_models(runtime, config)
    if not model_id and not ocr_only and not llm_backend and config:
        return config
    if not model_id and not ocr_only:
        raise ValueError('Choose --model or --ocr-only explicitly. Run assets.py list first.')
    state_file = runtime/'processes.json'
    state = json.loads(state_file.read_text()) if state_file.exists() else {}
    if any(owned(name, entry) for name, entry in state.items()):
        raise ValueError('Stop the local servers before changing models.')
    entry = model_entry(model_id) if model_id else None
    model = runtime/'models'/entry['filename'] if entry else None
    if entry and not verify(model, entry):
        raise ValueError(f'Model not verified: {model}. Fetch or place it first with assets.py.')
    defaults = {'threads': 4, 'llm_url': 'http://127.0.0.1:8765', 'llama_revision': 'b10980', 'llm_backend': 'cpu',
        'context_size': 4096, 'enable_thinking': False, 'max_output_tokens': 1024, 'job_timeout': 300,
        'image_hosts': ['dc.tulips.tsukuba.ac.jp']}
    config = {**defaults, **config, 'ndl_model_dir': str(runtime/'models/ndl'),
        'models_storage': 'nfs' if nfs_models else 'local',
        'ndl_code_root': str(Path(__file__).parent/'vendor/ndlkotenocr'),
        'ndl_revision': 'ede4283845cdc0ba2bda8b7ebfc3dc80b33c92c8',
        'llm_model_id': model_id or '', 'llm_model_path': str(model) if model else '', 'llm_model': entry['name'] if entry else '',
        'llm_model_sha256': entry['sha256'] if entry else '', 'llm_token_file': str(token),
        'llm_backend': llm_backend or config.get('llm_backend', 'cpu'),
        'prompt_revision': MODERN_REVISION, 'max_output_tokens': 1024,
        'sampling': {'temperature': 0}, 'no_repack': False, 'skip_chat_parsing': False,
        **(entry.get('translation_profile', {}) if entry else {})}
    config.pop('ndl_root', None)
    write_config(runtime, config)
    return config


def llama_command(runtime, config):
    backend = config.get('llm_backend', 'cpu')
    if backend not in ('cpu', 'metal') or (backend == 'metal' and sys.platform != 'darwin'):
        raise ValueError('Choose cpu, or metal on macOS.')
    command = [str(runtime/'llama/llama-b10980/llama-server'), '--model', config['llm_model_path'],
        '--alias', config['llm_model'], '--host', '127.0.0.1', '--port', '8765',
        '--api-key-file', str(runtime/'backend-token'), '--cors-origins', 'http://localhost', '--verbosity', '4',
        '--fit', 'off', '--parallel', '1', '--ctx-size', str(config['context_size']),
        '--threads', str(config['threads']), '--threads-batch', str(config['threads']), '--jinja']
    if backend == 'cpu':
        command += ['--device', 'none', '--n-gpu-layers', '0', '--no-kv-offload', '--no-op-offload']
    else:
        command += ['--device', 'MTL0', '--n-gpu-layers', '99']
    if config.get('no_repack'):
        command.append('--no-repack')
    if config.get('skip_chat_parsing'):
        if config.get('enable_thinking'):
            raise ValueError('skip_chat_parsing requires a non-thinking model/profile')
        command.append('--skip-chat-parsing')
    return command


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['init', 'start', 'stop', 'status'])
    parser.add_argument('--runtime', type=Path, default=Path(os.environ.get('KOBUN_RUNTIME', DEFAULT_RUNTIME)))
    parser.add_argument('--model', help='Model id; only for init. See assets.py list.')
    parser.add_argument('--llm-backend', choices=['cpu', 'metal'], help='Only for init; default preserves the current backend (cpu on first setup).')
    parser.add_argument('--ocr-only', action='store_true', help='Initialize without a local LLM; only for init.')
    parser.add_argument('--service', choices=['all', 'llama', 'worker'], default='all',
        help='Start or stop one service. The default is both services.')
    args = parser.parse_args()
    runtime = args.runtime.resolve()
    if (args.model or args.ocr_only or args.llm_backend) and args.action != 'init':
        parser.error('--model/--ocr-only/--llm-backend are only accepted with init; stop before switching')
    if args.action == 'init':
        config = initialize(runtime, args.model, args.ocr_only, args.llm_backend)
        print(f'Config: {runtime / "config.json"}\nModel: {config["llm_model"]}\nBackend: {config.get("llm_backend", "cpu")}')
        return
    pidfile = runtime/'processes.json'
    state = json.loads(pidfile.read_text()) if pidfile.exists() else {}
    if args.action == 'status':
        print(json.dumps({name: {'pid': entry['pid'], 'running': owned(name, entry)}
            for name, entry in state.items() if args.service in ('all', name)}, indent=2))
        return
    if args.action == 'stop':
        for name in ['worker', 'llama']:
            if args.service not in ('all', name):
                continue
            entry = state.get(name)
            if entry and owned(name, entry):
                os.killpg(entry['pid'], signal.SIGTERM)
                for _ in range(50):
                    if not owned(name, entry):
                        break
                    time.sleep(0.1)
                if owned(name, entry):
                    raise RuntimeError(f'{name} is still stopping; retry status/stop.')
                print(f'Stopped {name}')
            state.pop(name, None)
        if state:
            pidfile.write_text(json.dumps(state, indent=2))
        else:
            pidfile.unlink(missing_ok=True)
        return
    config = initialize(runtime)
    if not config.get('llm_model_id'):
        if args.service == 'llama':
            raise ValueError('Local LLM is not installed. Initialize with --model first.')
        if args.service == 'all':
            args.service = 'worker'
    if args.service in ('all', 'llama'):
        entry = model_entry(config['llm_model_id'])
        if not verify(Path(config['llm_model_path']), entry):
            raise ValueError('LLM model failed size/SHA-256 verification')
    if args.service in ('all', 'worker'):
        for model in catalog()['ocr']:
            if not verify(Path(config['ndl_model_dir'])/model['filename'], model):
                raise ValueError(f'OCR model missing or invalid: {model["filename"]}')
    commands = {
        'llama': llama_command(runtime, config),
        'worker': [str(runtime/'venv/bin/python'), str(Path(__file__).with_name('server.py')), '--runtime', str(runtime)],
    }
    for name, command in commands.items():
        if args.service not in ('all', name):
            continue
        if name in state and owned(name, state[name]):
            print(f'{name} already running'); continue
        with (runtime/f'{name}.log').open('ab') as log:
            process = subprocess.Popen(command, stdout=log, stderr=log, stdin=subprocess.DEVNULL, start_new_session=True)
        state[name] = {'pid': process.pid, 'marker': command[0] if name == 'llama' else command[1]}
        pidfile.write_text(json.dumps(state, indent=2))
        time.sleep(0.3)
        if process.poll() is not None:
            raise RuntimeError(f'{name} exited; see {runtime/name}.log')
        print(f'Started {name} (PID {process.pid})')
    print('Open /admin/kobun-ocr in Omeka. Model loading may take a few seconds.')


if __name__ == '__main__':
    main()
