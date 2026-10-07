"""Bounded, temporary reading assistance. Editorial data has no cache expiry."""
import hashlib
import json
from pathlib import Path

DEFAULTS = {
    'ocr_mode': 'shared', 'ocr_ttl_hours': 24,
    'translation_mode': 'private', 'translation_ttl_minutes': 60,
    'private_ttl_minutes': 60, 'max_documents': 1000, 'max_megabytes': 1024,
}
BOUNDS = {'ocr_ttl_hours': (1, 720), 'translation_ttl_minutes': (1, 1440),
    'private_ttl_minutes': (1, 1440), 'max_documents': (4, 100000), 'max_megabytes': (16, 1048576)}
CACHE_WORKFLOWS = ('assist', 'assist_translation')
VERSION = 1


def validate_policy(value):
    if not isinstance(value, dict) or set(value) != set(DEFAULTS):
        raise ValueError('一時保存設定の項目が不正です。')
    for key in ('ocr_mode', 'translation_mode'):
        if value[key] not in ('shared', 'private'):
            raise ValueError('共有方法は「共有なし」か「期限付き共有」で指定してください。')
    for key, (minimum, maximum) in BOUNDS.items():
        if type(value[key]) is not int or not minimum <= value[key] <= maximum:
            raise ValueError('一時保存の時間・件数・容量が範囲外です。')
    return dict(value)


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def transcription_digest(doc):
    return digest([(line.get('id'), line.get('raw')) for line in doc.get('lines', [])])


class Fingerprints:
    def __init__(self, config):
        self.config, self.files = config, {}

    def weight(self, file):
        file = Path(file)
        try:
            stat = file.stat()
        except FileNotFoundError:
            return 'missing'
        signature = (str(file), stat.st_mtime_ns, stat.st_size)
        if signature not in self.files:
            with file.open('rb') as stream:
                self.files = {**{key: value for key, value in self.files.items() if key[0] != str(file)},
                    signature: hashlib.file_digest(stream, 'sha256').hexdigest()}
        return self.files[signature]

    def ocr(self):
        config = self.config
        models = Path(config.get('ndl_model_dir') or Path(config.get('ndl_root', ''))/'src/model')
        return digest({'adapter': 'explicit-cpu-threads-v1', 'revision': config.get('ndl_revision'),
            'layout': self.weight(models/'rtmdet-s-1280x1280.onnx'),
            'recognition': self.weight(models/'parseq-ndl-32x384-tiny-10.onnx')})

    def translation(self):
        from translation_policy import MODERN_PROMPT
        return digest({**{key: self.config.get(key) for key in ('llm_model_id', 'llm_model_sha256',
            'llama_revision', 'prompt_revision', 'sampling', 'enable_thinking', 'max_output_tokens', 'context_size')},
            'prompt_code': hashlib.sha256(MODERN_PROMPT.encode()).hexdigest()})
