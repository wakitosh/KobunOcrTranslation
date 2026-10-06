"""Install the control service as a per-user macOS LaunchAgent."""
import argparse
import os
from pathlib import Path
import plistlib
import subprocess
import sys


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime', type=Path, required=True)
    parser.add_argument('--label', default='local.omeka-s.kobun-ocr-translation-control')
    args = parser.parse_args()
    runtime = args.runtime.resolve()
    python = runtime/'venv/bin/python'
    if not python.is_file():
        python = Path(sys.executable).resolve()
    command = [str(python), str(Path(__file__).with_name('control_server.py').resolve()),
        '--runtime', str(runtime)]
    if not (runtime/'backend-token').is_file() or not (runtime/'config.json').is_file():
        parser.error('Initialize the runtime before installing the control service')
    directory = Path.home()/'Library/LaunchAgents'
    directory.mkdir(parents=True, exist_ok=True)
    plist = directory/(args.label + '.plist')
    data = {'Label': args.label, 'ProgramArguments': command, 'RunAtLoad': True,
        'KeepAlive': True, 'WorkingDirectory': str(Path(__file__).resolve().parents[3]),
        'StandardOutPath': str(runtime/'control.log'), 'StandardErrorPath': str(runtime/'control.log')}
    target = f'gui/{os.getuid()}/{args.label}'
    loaded = subprocess.run(['launchctl', 'print', target], capture_output=True).returncode == 0
    if loaded:
        subprocess.run(['launchctl', 'bootout', target], check=True)
    plist.write_bytes(plistlib.dumps(data))
    subprocess.run(['launchctl', 'bootstrap', f'gui/{os.getuid()}', str(plist)], check=True)
    print(f'Installed {args.label}: {plist}')


if __name__ == '__main__':
    main()
