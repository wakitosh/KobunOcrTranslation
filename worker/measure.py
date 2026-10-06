"""Read-only, sampled process measurements for macOS and Linux (standard library only)."""
import os
from pathlib import Path
import platform
import subprocess
import threading
import time


def command(args):
    return subprocess.check_output(args, text=True, timeout=3, stderr=subprocess.DEVNULL).strip()


def cpu_seconds(value):
    days, _, clock = value.partition('-')
    total = int(days)*86400 if clock else 0
    parts = (clock or days).split(':')
    for power, part in enumerate(reversed(parts)):
        total += float(part)*60**power
    return total


def process_sample(pid):
    try:
        values = command(['ps', '-p', str(pid), '-o', 'pid=,rss=,time=,comm=']).split(maxsplit=3)
        if len(values) != 4 or int(values[0]) != pid:
            return None
        return {'pid': pid, 'rss_bytes': int(values[1])*1024, 'cpu_seconds': cpu_seconds(values[2]),
            'executable': Path(values[3]).name}
    except (subprocess.SubprocessError, OSError, ValueError):
        return None


def linux_process_limits(pid):
    result = {'pid': pid, 'affinity_cpus': len(os.sched_getaffinity(pid))}
    for entry in Path(f'/proc/{pid}/cgroup').read_text().splitlines():
        if entry.startswith('0::'):
            folder = Path('/sys/fs/cgroup')/entry[3:].lstrip('/')
            result['cgroup_v2_leaf'] = {name: (folder/name).read_text().strip()
                for name in ['cpu.max', 'memory.max', 'memory.swap.max', 'pids.max'] if (folder/name).is_file()}
    result['note'] = 'Leaf cgroup values only; ancestor cgroups may impose further limits.'
    return result


def host_info():
    result = {'os': platform.system(), 'release': platform.release(), 'architecture': platform.machine(),
        'python': platform.python_version(), 'logical_cpus': os.cpu_count(), 'cpu_model': None,
        'memory_total_bytes': None, 'memory_available_bytes': None, 'load_average': list(os.getloadavg())}
    try:
        if platform.system() == 'Darwin':
            result['cpu_model'] = command(['sysctl', '-n', 'machdep.cpu.brand_string'])
            result['memory_total_bytes'] = int(command(['sysctl', '-n', 'hw.memsize']))
        elif platform.system() == 'Linux':
            for line in Path('/proc/cpuinfo').read_text().splitlines():
                if line.startswith('model name'):
                    result['cpu_model'] = line.split(':', 1)[1].strip(); break
            memory = {line.split(':')[0]: int(line.split()[1])*1024 for line in Path('/proc/meminfo').read_text().splitlines()}
            result['memory_total_bytes'] = memory['MemTotal']
            result['memory_available_bytes'] = memory.get('MemAvailable')
            result['collector_process_limits'] = linux_process_limits(os.getpid())
    except (OSError, ValueError, subprocess.SubprocessError) as exc:
        result['measurement_note'] = type(exc).__name__
    return result


class ProcessMonitor:
    """RSS includes resident model pages; sampled maximum is not an allocation/RAM minimum."""
    def __init__(self, pid, interval=0.5):
        self.pid = pid
        self.interval = interval
        self.samples = []
        self.stop_event = threading.Event()
        self.thread = None
        self.missing = 0

    def sample(self):
        sample = process_sample(self.pid)
        if sample:
            self.samples.append({'elapsed_seconds': time.monotonic()-self.start_time, **sample})
        else:
            self.missing += 1

    def start(self):
        self.start_time = time.monotonic()
        self.sample()
        if not self.samples:
            raise ValueError(f'Cannot read process {self.pid}')
        self.limits = None
        if platform.system() == 'Linux':
            try:
                self.limits = linux_process_limits(self.pid)
            except OSError as exc:
                self.limits = {'measurement_note': type(exc).__name__}
        def poll():
            while not self.stop_event.wait(self.interval):
                self.sample()
        self.thread = threading.Thread(target=poll, daemon=True); self.thread.start()
        return self

    def finish(self):
        self.stop_event.set()
        if self.thread: self.thread.join(timeout=4)
        self.sample()
        first, last = self.samples[0], self.samples[-1]
        return {'pid': self.pid, 'executable': first['executable'], 'sampling_interval_seconds': self.interval,
            'rss_before_bytes': first['rss_bytes'], 'rss_peak_sampled_bytes': max(s['rss_bytes'] for s in self.samples),
            'rss_after_bytes': last['rss_bytes'], 'cpu_seconds_delta': last['cpu_seconds']-first['cpu_seconds'],
            'sample_count': len(self.samples), 'missing_samples': self.missing,
            'process_limits': self.limits,
            'scope': 'selected process only; includes mmap resident pages; excludes other processes and GPU memory',
            'samples': self.samples}
