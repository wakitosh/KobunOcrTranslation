"""Hourly allowances per network client, shared by all of its browser sessions."""
from __future__ import annotations

from collections import deque
import re
import threading
import time

from store import Problem

WINDOW_SECONDS = 3600
MAX_CLIENTS = 50000
BUCKETS = ('ocr', 'translation')


class ClientAllowance:
    """Counts in memory: a worker restart simply starts a new window."""

    def __init__(self, clock=time.time, max_clients=MAX_CLIENTS):
        self.clock = clock
        self.max_clients = max_clients
        self.lock = threading.Lock()
        self.clients = {}

    def handle(self, body):
        key, bucket, limit, action = (body.get(name) for name in ('key', 'bucket', 'limit', 'action'))
        if (not isinstance(key, str) or not re.fullmatch(r'[a-f0-9]{64}', key) or bucket not in BUCKETS
                or type(limit) is not int or not 1 <= limit <= 100000 or action not in ('take', 'release')):
            raise Problem('接続元の利用枠の指定が不正です。')
        with self.lock:
            now = self.clock()
            times = self.clients.setdefault((key, bucket), deque())
            while times and times[0] <= now - WINDOW_SECONDS:
                times.popleft()
            if action == 'release':
                if times:
                    times.pop()
                return {'allowed': True}
            if len(times) >= limit:
                retry_at = int(times[0]) + WINDOW_SECONDS
                return {'allowed': False, 'limit': limit, 'retry_at': retry_at, 'retry_after': max(1, retry_at - int(now))}
            times.append(now)
            self._bound(now)
            return {'allowed': True}

    def _bound(self, now):
        if len(self.clients) <= self.max_clients:
            return
        for client, times in list(self.clients.items()):
            if not times or times[-1] <= now - WINDOW_SECONDS:
                del self.clients[client]
        # Many addresses at once must not grow the worker without limit.
        while len(self.clients) > self.max_clients:
            del self.clients[next(iter(self.clients))]
