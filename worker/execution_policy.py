"""Explicit inference limits; no host-resource detection or automatic scaling."""
import json
from pathlib import Path

DEFAULTS = {'ocr_concurrency': 1, 'llm_concurrency': 1, 'total_concurrency': 1,
            'max_waiting': 3, 'session_pending': 1}
BOUNDS = {'ocr_concurrency': (1, 8), 'llm_concurrency': (1, 4), 'total_concurrency': (1, 8),
          'max_waiting': (0, 64), 'session_pending': (1, 4)}


def validate_policy(value):
    if not isinstance(value, dict) or set(value) != set(DEFAULTS):
        raise ValueError('同時実行設定の項目が不正です。')
    if any(type(value[key]) is not int or not low <= value[key] <= high
           for key, (low, high) in BOUNDS.items()):
        raise ValueError('同時実行数・待機件数が指定可能な範囲外です。')
    return dict(value)


def load_policy(data_root):
    file = Path(data_root)/'execution-policy.json'
    return validate_policy(json.loads(file.read_text())) if file.exists() else dict(DEFAULTS)


def llm_parallel(policy):
    return min(policy['llm_concurrency'], policy['total_concurrency'])
