"""Install/update only the narrow resource-control socket on an existing backend.

No downloads, account creation, OCR/LLM restarts or resource changes. --apply is
required. The normal RHEL installer calls the same function automatically.
"""
from __future__ import annotations
import argparse
import os
from pathlib import Path
import pwd
import re
import subprocess
import tempfile

MARKER = '# Managed by KobunOcrTranslation resource control'
NAME = 'kobun-ocr-resources'


def units(backend, user):
    return {NAME + '.socket': f'''{MARKER}
[Unit]
Description=Kobun OCR resource control socket
[Socket]
ListenStream=/run/kobun-ocr-resources.sock
SocketUser={user}
SocketMode=0600
RemoveOnStop=true
[Install]
WantedBy=sockets.target
''', NAME + '.service': f'''{MARKER}
[Unit]
Description=Kobun OCR fixed-unit resource control
[Service]
ExecStart=/usr/bin/python3 -I {backend}/resource_control.py --service-user {user}
User=root
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ProtectControlGroups=true
RestrictAddressFamilies=AF_UNIX
MemoryMax=128M
CPUQuota=25%
UMask=0077
'''}


def install(backend, user):
    backend = Path(backend)
    if os.geteuid() != 0 or not re.fullmatch(r'/opt/[A-Za-z0-9_./-]+', str(backend)) or '..' in backend.parts:
        raise ValueError('Use root and a backend path below /opt.')
    if not re.fullmatch(r'[a-z_][a-z0-9_-]{0,30}', user) or pwd.getpwnam(user).pw_uid == 0:
        raise ValueError('Use a dedicated non-root service user.')
    # Root never executes or imports writable files from the backend account.
    for path in [backend, *backend.parents, backend/'resource_control.py', backend/'resource_limits.py']:
        if path.is_symlink() or path.stat().st_uid != 0 or path.stat().st_mode & 0o022:
            raise ValueError('Root resource helper paths must be root-owned and not group/world writable: ' + str(path))
    destination = Path('/etc/systemd/system')
    contents = units(backend, user)
    for name in contents:
        path = destination/name
        if path.is_symlink() or path.exists() and not path.read_text().startswith(MARKER):
            raise ValueError('Refusing an unmanaged resource-control unit: ' + str(path))
    for name, content in contents.items():
        with tempfile.NamedTemporaryFile(dir=destination, mode='w', delete=False) as stream:
            stream.write(content)
            temporary = Path(stream.name)
        temporary.chmod(0o644)
        temporary.replace(destination/name)
    subprocess.run(['/usr/bin/systemd-analyze', 'verify', *[str(destination/name) for name in contents]], check=True)
    subprocess.run(['/usr/bin/systemctl', 'daemon-reload'], check=True)
    # Refresh the root helper after a source update; do not restart the inference
    # supervisor or its children here.
    subprocess.run(['/usr/bin/systemctl', 'stop', NAME + '.service'], check=True)
    subprocess.run(['/usr/bin/systemctl', 'enable', '--now', NAME + '.socket'], check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--backend', type=Path, required=True, help='Root-owned private backend/worker directory')
    parser.add_argument('--service-user', default='kobunocr')
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    print('Resource control only: fixed unit kobun-ocr-control.service; fixed CPU/memory properties; Unix socket for ' + args.service_user)
    if args.apply:
        install(args.backend, args.service_user)
        print('Resource-control socket enabled. Existing OCR/LLM and their caps are unchanged.')
    else:
        print('No changes without --apply.')


if __name__ == '__main__': main()
