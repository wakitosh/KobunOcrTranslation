"""Reviewable, opt-in installation on RHEL 9. No changes without --apply.

Invoke from a reviewed Git checkout under Omeka's modules directory. This uses
the standard-library Python 3.9 to prepare a separate Python 3.11 environment.
"""
from __future__ import annotations

import argparse
import grp
import json
import os
from pathlib import Path
import pwd
import re
import shlex
import shutil
import subprocess
import sys
import tempfile
import time
from urllib.request import Request, urlopen

UNIT = 'kobun-ocr-control.service'
MARKER = '# Managed by KobunOcrTranslation install_rhel9.py'
MODELS = ['qwen35-9b-q4km', 'qwen3-4b-q4km', 'none']


def absolute_path(value):
    if not re.fullmatch(r'/[A-Za-z0-9_./-]+', value) or '..' in Path(value).parts:
        raise argparse.ArgumentTypeError('Use an absolute path without spaces, .. or special characters.')
    return Path(value)


def account(value):
    if not re.fullmatch(r'[a-z_][a-z0-9_-]{0,30}', value):
        raise argparse.ArgumentTypeError('Invalid Unix account name.')
    return value


def host(value):
    value = value.lower()
    if not re.fullmatch(r'[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?', value) or '..' in value:
        raise argparse.ArgumentTypeError('Specify a hostname, without scheme or path.')
    return value


def arguments(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--omeka-root', type=absolute_path, default=Path('/opt/omeka-s'))
    parser.add_argument('--prefix', type=absolute_path, default=Path('/opt/kobun-ocr-translation'))
    parser.add_argument('--php-user', type=account, required=True, help='Unix user running PHP-FPM/httpd (e.g. apache)')
    parser.add_argument('--service-user', type=account, default='kobunocr')
    parser.add_argument('--model', choices=MODELS, default=MODELS[0])
    parser.add_argument('--image-host', type=host, action='append', required=True, help='IIIF image host; repeat if necessary')
    parser.add_argument('--resource-host', type=host, action='append', default=[], help='Archive/manifest host; repeat if necessary')
    parser.add_argument('--threads', type=int, default=2)
    parser.add_argument('--cpu-quota', type=int, default=200, help='Percent of one CPU; 200 = two CPUs total')
    parser.add_argument('--memory-max', default=None, help='Aggregate service cap, e.g. 16G; this is not a measured requirement')
    parser.add_argument('--configure-selinux', action='store_true', help='Explicitly label PHP files and enable httpd_can_network_connect')
    parser.add_argument('--apply', action='store_true', help='Perform installation; default only prints plan')
    args = parser.parse_args(argv)
    args.memory_max = args.memory_max or {'none': '4G', MODELS[1]: '8G', MODELS[0]: '16G'}[args.model]
    if not 1 <= args.threads <= 64 or not 1 <= args.cpu_quota <= 6400 or not re.fullmatch(r'[1-9][0-9]*[MG]', args.memory_max):
        parser.error('Invalid CPU/thread/memory limit.')
    if args.service_user in ('root', args.php_user):
        parser.error('Use a dedicated non-root service user distinct from the PHP user.')
    prefix, omeka = args.prefix.absolute(), args.omeka_root.absolute()
    if prefix == Path('/opt') or prefix == Path('/') or omeka == prefix or omeka in prefix.parents or prefix in omeka.parents:
        parser.error('Backend prefix must be separate from the Omeka tree.')
    if Path('/opt') not in prefix.parents:
        parser.error('This installer places the backend under /opt.')
    args.prefix, args.omeka_root = prefix, omeka
    return args


def paths(args):
    return args.omeka_root/'modules/KobunOcrTranslation', args.prefix/'runtime', args.prefix/'backend'


def unit_text(args, group):
    _, runtime, backend = paths(args)
    return f"""{MARKER}
[Unit]
Description=Omeka Kobun OCR control service
After=network.target

[Service]
Type=simple
User={args.service_user}
Group={group}
WorkingDirectory={runtime}
UMask=0077
ExecStart={runtime}/venv/bin/python {backend}/worker/control_server.py --runtime {runtime}
Restart=on-failure
RestartSec=5
KillMode=control-group
TimeoutStopSec=30
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ReadWritePaths={runtime}
CPUAccounting=true
CPUQuota={args.cpu_quota}%
MemoryAccounting=true
MemoryMax={args.memory_max}
MemorySwapMax=0
Nice=10
IOWeight=10

[Install]
WantedBy=multi-user.target
"""


def backend_config(args):
    return {'backend_url': 'http://127.0.0.1:8766', 'control_url': 'http://127.0.0.1:8767',
            'token_file': str(args.prefix/'php/backend-token'), 'image_hosts': args.image_host,
            'resource_hosts': list(dict.fromkeys(args.image_host + args.resource_host))}


def setup_command(args):
    _, runtime, backend = paths(args)
    return ['systemd-run', '--unit=kobun-ocr-setup', '--wait', '--pipe', '--collect',
            f'--property=User={args.service_user}', f'--property=WorkingDirectory={runtime}',
            '--property=UMask=0077', f'--property=CPUQuota={args.cpu_quota}%',
            f'--property=MemoryMax={args.memory_max}', '--property=MemorySwapMax=0', '--property=Nice=10',
            f'--setenv=HOME={runtime}', f'--setenv=KOBUN_RUNTIME={runtime}',
            f'--setenv=KOBUN_BUILD_JOBS={args.threads}',
            'bash', str(backend/'worker/setup-rhel9.sh'), args.model]


def plan(args):
    module, runtime, backend = paths(args)
    print('RHEL 9 installation plan (no changes without --apply)')
    print(f'Omeka module: {module}\nBackend code: {backend}\nPrivate runtime: {runtime}')
    print(f'Account: {args.service_user}; PHP token reader: {args.php_user}; Model: {args.model}')
    print(f'CPU cap: {args.cpu_quota}% (100% = one CPU); memory cap: {args.memory_max}; threads/build jobs: {args.threads}')
    print('1. Check OS, inactive services, ports 8765/8766/8767, paths, accounts and free disk (20 GiB recommended for 9B).')
    print('2. Install Python 3.11, pip, ACL tools, and (with LLM) git/gcc-c++/cmake/make/libcurl-devel using dnf.')
    print('3. Create the dedicated nologin account if absent. Copy worker code to the private backend tree.')
    print('4. Build the virtual environment/llama.cpp and fetch pinned, hash-verified models in a limited temporary systemd job:')
    print('   ' + shlex.join(setup_command(args)))
    print('5. Preserve existing data/token; grant only the PHP user ACL access to token/config, outside the web tree.')
    print('6. Register and enable ONE permanent control service; do not start OCR/LLM inference automatically.')
    print('7. Check authenticated control status. Do not modify Omeka DB, local.config.php, web services or firewall.')
    if args.configure_selinux:
        print('SELinux: explicitly label PHP files httpd_sys_content_t and set httpd_can_network_connect=on (persistent; affects all httpd-domain processes).')
    else:
        print('SELinux: no policy/boolean changes; operator must adjust permissions if enforcing.')
    if args.prefix != Path('/opt/kobun-ocr-translation'):
        print(f'Custom prefix: configure kobun_ocr in Omeka local.config.php from {args.prefix}/php/backend.json.')
    print('\nPermanent unit:\n' + unit_text(args, args.service_user))


def run(command, **kwargs):
    print('+ ' + shlex.join(map(str, command)), flush=True)
    return subprocess.run(list(map(str, command)), check=True, **kwargs)


def reject_symlinks(path):
    for candidate in [path, *path.parents]:
        if candidate.is_symlink():
            raise ValueError(f'Refusing symlink path: {candidate}')


def preflight(args):
    if sys.platform != 'linux' or os.geteuid() != 0:
        raise ValueError('--apply requires root on RHEL 9.')
    release = Path('/etc/os-release').read_text()
    if not re.search(r'^ID="?rhel"?$', release, re.M) or not re.search(r'^VERSION_ID="?9\.', release, re.M):
        raise ValueError('Only RHEL 9 is supported by this installer.')
    module, runtime, _ = paths(args)
    if module.resolve() != Path(__file__).resolve().parent.parent or not (args.omeka_root/'bootstrap.php').is_file():
        raise ValueError('Run the script from the Git checkout in this Omeka modules directory.')
    for path in [args.prefix, runtime, args.prefix/'php', runtime/'backend-token',
                 runtime/'config.json', runtime/'config.json.before-install',
                 runtime/'processes.json', Path('/etc/systemd/system')/UNIT]:
        reject_symlinks(path)
    if args.prefix.exists() and args.prefix.stat().st_uid != 0:
        raise ValueError('An existing backend prefix must be root-owned.')
    backend = args.prefix/'backend'
    if backend.exists():
        for path in [backend, *backend.rglob('*')]:
            reject_symlinks(path)
    php = pwd.getpwnam(args.php_user)
    if php.pw_uid == 0:
        raise ValueError('PHP user must not be root.')
    try:
        user = pwd.getpwnam(args.service_user)
        if user.pw_uid == 0 or user.pw_shell not in ('/sbin/nologin', '/usr/sbin/nologin', '/bin/false'):
            raise ValueError('Existing service account must be non-root and have a nologin shell.')
        if user.pw_uid == php.pw_uid or php.pw_gid in os.getgrouplist(user.pw_name, user.pw_gid):
            raise ValueError('Use an independent service account without membership in the PHP group.')
        if runtime.exists() and runtime.stat().st_uid != user.pw_uid:
            raise ValueError('Existing runtime belongs to a different account.')
    except KeyError:
        if runtime.exists():
            raise ValueError('Runtime already exists but its service account is missing.')
    state = subprocess.run(['systemctl', 'is-active', UNIT], text=True, capture_output=True).stdout.strip()
    if state in ('active', 'activating', 'reloading', 'deactivating'):
        raise ValueError('Control service is running. Finish jobs and stop it explicitly before installation/update.')
    setup_state = subprocess.run(['systemctl', 'is-active', 'kobun-ocr-setup.service'], text=True, capture_output=True).stdout.strip()
    if setup_state in ('active', 'activating', 'reloading', 'deactivating'):
        raise ValueError('Another backend setup is running.')
    old_unit = Path('/etc/systemd/system')/UNIT
    if old_unit.exists() and not old_unit.read_text().startswith(MARKER):
        raise ValueError('Existing control unit was not created by this installer; ask the operator to review it.')
    listeners = subprocess.check_output(['ss', '-H', '-ltn'], text=True)
    for line in listeners.splitlines():
        if any(re.search(rf':{port}\s', line) for port in (8765, 8766, 8767)):
            raise ValueError('An OCR/LLM/control port is already in use; no services were stopped.')
    processes = runtime/'processes.json'
    if processes.exists():
        for entry in json.loads(processes.read_text()).values():
            try:
                os.kill(int(entry['pid']), 0)
            except ProcessLookupError:
                continue
            raise ValueError('A recorded backend process is still present; stop it explicitly.')
    disk_parent = args.prefix
    while not disk_parent.exists():
        disk_parent = disk_parent.parent
    minimum = {'none': 3, MODELS[1]: 10, MODELS[0]: 20}[args.model] * 1024**3
    if not (runtime/'config.json').exists() and shutil.disk_usage(disk_parent).free < minimum:
        raise ValueError('Insufficient free disk for initial setup (models, build and virtual environment).')


def write_file(path, text, mode=0o644):
    reject_symlinks(path)
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as temp:
        temp.write(text.encode())
        temporary = Path(temp.name)
    temporary.chmod(mode)
    temporary.replace(path)


def install(args):
    preflight(args)  # Every refusal above occurs before system changes.
    module, runtime, backend = paths(args)
    packages = ['python3.11', 'python3.11-pip', 'acl']
    if args.model != 'none':
        packages += ['git', 'gcc-c++', 'cmake', 'make', 'libcurl-devel']
    if args.configure_selinux:
        packages += ['policycoreutils-python-utils']
    run(['dnf', 'install', '-y', *packages])
    try:
        pwd.getpwnam(args.service_user)
    except KeyError:
        run(['useradd', '--system', '--user-group', '--home-dir', str(runtime), '--shell', '/sbin/nologin', args.service_user])
    user = pwd.getpwnam(args.service_user)
    group = grp.getgrgid(user.pw_gid).gr_name
    run(['install', '-d', '-o', 'root', '-g', 'root', '-m', '0755', args.prefix, backend])
    run(['install', '-d', '-o', args.service_user, '-g', group, '-m', '0700', runtime])
    reject_symlinks(backend/'worker')
    # No access to the restricted Omeka tree is granted to the backend account.
    # Copy only source/config; never models, runtime files or Git metadata.
    def ignore(directory, names):
        return [name for name in names if name in ('__pycache__', '.DS_Store', '.git')
                or name.endswith(('.pyc', '.gguf', '.onnx'))]
    for source in (module/'worker').rglob('*'):
        if source.is_symlink():
            raise ValueError(f'Refusing symlink in backend source: {source}')
    shutil.copytree(module/'worker', backend/'worker', dirs_exist_ok=True, ignore=ignore)
    for path in [backend/'worker', *(backend/'worker').rglob('*')]:
        reject_symlinks(path)
        os.chown(path, 0, 0)
        path.chmod(0o755 if path.is_dir() else 0o644)
    config_file = runtime/'config.json'
    if config_file.exists():
        run(['runuser', '-u', args.service_user, '--', 'cp', '--preserve=mode', config_file, runtime/'config.json.before-install'])
    run(setup_command(args))
    # Add deployment-specific values without discarding existing jobs/reviews.
    config = json.loads(config_file.read_text())
    config.update(threads=args.threads, image_hosts=args.image_host)
    write_file(config_file, json.dumps(config, ensure_ascii=False, indent=2), 0o600)
    os.chown(config_file, user.pw_uid, user.pw_gid)
    php_dir = args.prefix/'php'
    reject_symlinks(php_dir)
    run(['install', '-d', '-o', 'root', '-g', 'root', '-m', '0700', php_dir])
    run(['setfacl', '-b', '-k', php_dir])
    for name, content in [('backend-token', (runtime/'backend-token').read_text()), ('backend.json', json.dumps(backend_config(args), indent=2))]:
        write_file(php_dir/name, content, 0o600)
        run(['setfacl', '-m', f'u:{args.php_user}:r--', php_dir/name])
    run(['setfacl', '-m', f'u:{args.php_user}:r-x', php_dir])
    if args.configure_selinux and subprocess.check_output(['getenforce'], text=True).strip() != 'Disabled':
        label = re.escape(str(php_dir)) + r'(/.*)?'
        existing = subprocess.check_output(['semanage', 'fcontext', '-l', '-C'], text=True)
        if any(line.split()[0] == label for line in existing.splitlines() if line.strip()):
            run(['semanage', 'fcontext', '-m', '-t', 'httpd_sys_content_t', label])
        else:
            run(['semanage', 'fcontext', '-a', '-t', 'httpd_sys_content_t', label])
        run(['restorecon', '-R', php_dir])
        run(['setsebool', '-P', 'httpd_can_network_connect', 'on'])
    for name in ('backend-token', 'backend.json'):
        run(['runuser', '-u', args.php_user, '--', 'test', '-r', php_dir/name])
    unit = Path('/etc/systemd/system')/UNIT
    write_file(unit, unit_text(args, group))
    run(['systemd-analyze', 'verify', unit])
    run(['systemctl', 'daemon-reload'])
    run(['systemctl', 'enable', '--now', UNIT])
    token = (runtime/'backend-token').read_text().strip()
    for attempt in range(10):
        try:
            with urlopen(Request('http://127.0.0.1:8767/status', headers={'Authorization': 'Bearer ' + token}), timeout=3) as response:
                if response.status == 200:
                    print('Control service authenticated health check OK. OCR/LLM remain stopped.')
                    break
        except OSError:
            if attempt == 9:
                raise RuntimeError('Control service did not respond. Check journalctl -u ' + UNIT)
            time.sleep(1)
    print('Enable the module in Omeka, then start worker/LLM from its settings. See INSTALL_RHEL9.md.')
    if args.prefix != Path('/opt/kobun-ocr-translation'):
        print('Custom prefix requires Omeka local.config.php settings from ' + str(php_dir/'backend.json'))


def main(argv=None):
    args = arguments(argv)
    plan(args)
    if args.apply:
        install(args)


if __name__ == '__main__':
    try:
        main()
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as error:
        print('Installation stopped: ' + str(error), file=sys.stderr)
        print('No automatic service shutdown or rollback was performed. Resolve the cause and rerun with services stopped.', file=sys.stderr)
        sys.exit(1)
