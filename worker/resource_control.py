"""Root socket-activated helper: only two properties of ONE fixed unit.

No caller supplied command, unit name, path, environment or model is accepted.
The socket and SO_PEERCRED restrict calls to the dedicated backend Unix user.
"""
from __future__ import annotations
import argparse
import json
import os
from pathlib import Path
import pwd
import socket
import struct
import subprocess
import sys

# -I ignores user/PYTHONPATH packages; this directory must be root-owned.
sys.path.insert(0, str(Path(__file__).resolve().parent))
from resource_limits import UNIT, MIB, host_resources, validate


def properties():
    result = subprocess.run(['/usr/bin/systemctl', 'show', UNIT,
        '--property=CPUQuotaPerSecUSec,MemoryMax,MemoryCurrent,ControlGroup,LoadState'],
        check=True, capture_output=True, text=True, timeout=5)
    values = dict(row.split('=', 1) for row in result.stdout.splitlines() if '=' in row)
    if values.get('LoadState') != 'loaded': raise RuntimeError('OCR運用サービスが登録されていません。')
    return values


def snapshot():
    values = properties()
    # cpu.max is machine-readable and avoids parsing systemd's formatted times.
    group = Path('/sys/fs/cgroup') / values.get('ControlGroup', '').lstrip('/')
    quota = None
    try:
        maximum, period = (group/'cpu.max').read_text().split()
        if maximum != 'max': quota = round(int(maximum) / int(period) * 100)
    except (OSError, ValueError):
        pass
    if quota is None:
        # Inactive units have no cgroup. systemd returns e.g. '2s' or '500ms'.
        import re
        time = values.get('CPUQuotaPerSecUSec', '')
        matches = re.findall(r'([0-9.]+)(min|ms|us|s)', time)
        if matches and re.sub(r'([0-9.]+)(min|ms|us|s)|\s+', '', time) == '':
            quota = round(sum(float(number) * {'min': 6000, 's': 100, 'ms': .1, 'us': .0001}[unit] for number, unit in matches))
    cap = values.get('MemoryMax', 'infinity')
    return {'applied': {'cpu_quota': quota, 'memory_max_mib': int(cap) // MIB if cap.isdigit() else None},
        'memory_current_mib': int(values.get('MemoryCurrent', '0')) // MIB if values.get('MemoryCurrent', '').isdigit() else 0,
        'host': host_resources(group.parent if values.get('ControlGroup') else Path('/sys/fs/cgroup/system.slice'))}


def handle(body):
    if not isinstance(body, dict): raise ValueError('不正な要求です。')
    if body == {'action': 'status'}: return snapshot()
    if set(body) != {'action', 'policy'} or body['action'] != 'apply': raise ValueError('許可されていない資源操作です。')
    policy = validate(body['policy'])
    before = snapshot()
    if policy['cpu_quota'] > before['host']['cpus'] * 100 or policy['memory_max_mib'] > before['host']['memory_total_mib']:
        raise ValueError('サーバに割り当てられたCPU・メモリ容量を超える上限は設定できません。')
    # Refuse a cap too close to present use. The supervisor additionally requires
    # stopped worker/LLM before lowering memory, avoiding RSS/file-cache surprises.
    if policy['memory_max_mib'] < (before['applied']['memory_max_mib'] or 1048576) \
            and policy['memory_max_mib'] < before['memory_current_mib'] + 256:
        raise ValueError('現在のメモリ使用量に近すぎます。workerとLLMを停止してから変更してください。')
    if policy == before['applied']: return before
    old = before['applied']
    command = ['/usr/bin/systemctl', 'set-property', UNIT,
        f"CPUQuota={policy['cpu_quota']}%", f"MemoryMax={policy['memory_max_mib'] * MIB}", 'MemorySwapMax=0']
    try:
        subprocess.run(command, check=True, capture_output=True, text=True, timeout=8)
        after = snapshot()
        if after['applied'] != policy: raise RuntimeError('資源上限の反映を確認できません。')
        return after
    except (subprocess.SubprocessError, RuntimeError, OSError, ValueError) as exc:
        # A failed request must not silently leave partially applied properties.
        rollback = ['/usr/bin/systemctl', 'set-property', UNIT,
            'CPUQuota=' + (str(old['cpu_quota']) + '%' if old['cpu_quota'] is not None else ''),
            'MemoryMax=' + (str(old['memory_max_mib'] * MIB) if old['memory_max_mib'] is not None else 'infinity'), 'MemorySwapMax=0']
        try:
            subprocess.run(rollback, check=True, capture_output=True, timeout=8)
            if snapshot()['applied'] != old: raise RuntimeError('Unexpected restored resource limits')
        except (subprocess.SubprocessError, RuntimeError, OSError, ValueError):
            raise RuntimeError('資源上限の復元を確認できません。サーバ管理者がsystemdの実値を確認してください。') from exc
        raise RuntimeError('資源上限を反映できなかったため、前の上限へ戻しました。') from exc


def serve_connection(connection, allowed_uid):
    connection.settimeout(5)
    try:
        _, uid, _ = struct.unpack('3i', connection.getsockopt(socket.SOL_SOCKET, socket.SO_PEERCRED, 12))
        if uid != allowed_uid: raise ValueError('このUnixユーザには資源操作を許可していません。')
        body = b''
        while b'\n' not in body:
            chunk = connection.recv(1024)
            if not chunk or len(body) + len(chunk) > 2048: raise ValueError('要求が不正です。')
            body += chunk
        result = {'ok': True, 'resources': handle(json.loads(body.split(b'\n', 1)[0]))}
    except (OSError, ValueError, RuntimeError, subprocess.SubprocessError):
        # Only our own validation messages are shown; systemctl stderr may carry
        # installation-specific paths and never needs to reach the browser.
        exc = sys.exc_info()[1]
        result = {'ok': False, 'error': str(exc) if isinstance(exc, (ValueError, RuntimeError)) else '資源制御サービスの操作に失敗しました。'}
    connection.sendall(json.dumps(result, ensure_ascii=False).encode() + b'\n')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--service-user', required=True)
    args = parser.parse_args()
    if os.geteuid() != 0 or os.environ.get('LISTEN_PID') != str(os.getpid()) or os.environ.get('LISTEN_FDS') != '1':
        raise RuntimeError('Run only as the root systemd socket service.')
    uid = pwd.getpwnam(args.service_user).pw_uid
    if uid == 0: raise ValueError('Use a dedicated non-root backend user.')
    listener = socket.socket(fileno=3)
    while True:
        connection, _ = listener.accept()
        with connection:
            try: serve_connection(connection, uid)
            except OSError: pass


if __name__ == '__main__': main()
