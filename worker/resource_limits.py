"""Host-aware initial caps and the narrow local systemd resource-control client.

Python 3.9 compatible for the RHEL installer. Never chooses inference concurrency.
"""
from __future__ import annotations
import json
import math
import os
from pathlib import Path
import socket
import sys

UNIT = 'kobun-ocr-control.service'
SOCKET = '/run/kobun-ocr-resources.sock'
MIB = 1024**2
MODEL_MEMORY = {'none': 4096, 'qwen3-4b-q4km': 8192, 'qwen35-9b-q4km': 16384,
                'qwen35-35b-a3b-q4km': 49152}


def validate(value):
    if not isinstance(value, dict) or set(value) != {'cpu_quota', 'memory_max_mib'}:
        raise ValueError('CPU・メモリ上限の項目が不正です。')
    if any(type(value[key]) is not int for key in value):
        raise ValueError('CPU・メモリ上限は数値で指定してください。')
    if not 1 <= value['cpu_quota'] <= 6400 or not 256 <= value['memory_max_mib'] <= 1048576 \
            or value['memory_max_mib'] % 256:
        raise ValueError('CPUは1～6400%、メモリは0.25～1024 GiB（0.25 GiB単位）で指定してください。')
    return dict(value)


def host_resources(cgroup=None):
    """Exclude the service's own cap, but respect parent/container allocations."""
    cpus = float(len(os.sched_getaffinity(0)) if hasattr(os, 'sched_getaffinity') else os.cpu_count() or 1)
    memory = {}
    try:
        for row in Path('/proc/meminfo').read_text().splitlines():
            key, value = row.split(':', 1)
            memory[key] = int(value.split()[0]) * 1024
    except (OSError, ValueError):
        if sys.platform == 'darwin':
            import subprocess
            memory['MemTotal'] = int(subprocess.check_output(['/usr/sbin/sysctl', '-n', 'hw.memsize'], text=True))
        else:
            raise RuntimeError('サーバのメモリ容量を確認できません。')
    total = memory['MemTotal']
    available = memory.get('MemAvailable', total)
    base = Path('/sys/fs/cgroup')
    if cgroup is None:
        try:
            current = next(row[3:] for row in Path('/proc/self/cgroup').read_text().splitlines() if row.startswith('0::'))
            cgroup = base / current.lstrip('/')
        except (OSError, StopIteration):
            cgroup = None
    if cgroup is not None:
        node = Path(cgroup)
        while node == base or base in node.parents:
            try:
                quota, period = (node/'cpu.max').read_text().split()
                if quota != 'max': cpus = min(cpus, int(quota) / int(period))
            except (OSError, ValueError):
                pass
            try:
                cap = (node/'memory.max').read_text().strip()
                if cap != 'max':
                    total = min(total, int(cap))
                    available = min(available, max(0, int(cap) - int((node/'memory.current').read_text())))
            except (OSError, ValueError):
                pass
            if node == base: break
            node = node.parent
    return {'cpus': cpus, 'memory_total_mib': total // MIB, 'memory_available_mib': available // MIB}


def recommended(host, model='none'):
    # Half the effective CPU allocation, capped at two CPUs. A quarter of RAM,
    # half the currently available RAM, and a model-specific ceiling for memory.
    memory = min(MODEL_MEMORY.get(model, MODEL_MEMORY['none']), host['memory_total_mib'] // 4,
                 host['memory_available_mib'] // 2)
    memory = memory // 256 * 256
    if memory < 256:
        raise ValueError('初期上限を設定するためのメモリが不足しています。')
    return validate({'cpu_quota': max(1, min(200, math.floor(host['cpus'] * 50))), 'memory_max_mib': memory})


def request(body):
    with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as client:
        client.settimeout(45)
        client.connect(SOCKET)
        client.sendall(json.dumps(body).encode() + b'\n')
        response = b''
        while b'\n' not in response:
            chunk = client.recv(4096)
            if not chunk or len(response) + len(chunk) > 16384:
                raise RuntimeError('資源制御サービスの応答が不正です。')
            response += chunk
    data = json.loads(response.split(b'\n', 1)[0])
    if not data.get('ok'):
        raise RuntimeError(data.get('error', '資源上限を反映できません。'))
    return data['resources']


def status(model='none'):
    if sys.platform != 'linux':
        return {'supported': False, 'reason': 'CPU・メモリの強制上限はLinux/systemd環境で設定できます。'}
    try:
        data = request({'action': 'status'})
        try:
            defaults = recommended(data['host'], model)
        except ValueError:
            defaults = data['applied']
        return dict(data, supported=True, defaults=defaults)
    except (OSError, ValueError, RuntimeError):
        return {'supported': False, 'reason': '資源制御サービスが未導入または応答しません。RHELの資源制御サービスを導入・更新してください。'}


def apply(value):
    policy = validate(value)
    try:
        return request({'action': 'apply', 'policy': policy})
    except (OSError, ValueError) as exc:
        raise RuntimeError('資源制御サービスに接続できません。導入・起動状態を確認してください。') from exc
