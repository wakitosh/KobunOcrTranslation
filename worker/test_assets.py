import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import io

from assets import acquire, verify


class AssetsTest(unittest.TestCase):
    def test_partial_is_not_promoted_on_integrity_error(self):
        with tempfile.TemporaryDirectory() as temp:
            target = Path(temp)/'model.gguf'
            entry = {'size_bytes': 4, 'sha256': hashlib.sha256(b'good').hexdigest(),
                'license': 'test', 'license_url': 'https://example.test/license', 'url': 'https://example.test/model'}
            with patch('assets.urllib.request.urlopen', return_value=io.BytesIO(b'bad!')):
                with self.assertRaises(ValueError): acquire(target, entry)
            self.assertFalse(target.exists())
            self.assertTrue(target.with_suffix('.gguf.partial').exists())
            with patch('assets.urllib.request.urlopen', return_value=io.BytesIO(b'good')):
                acquire(target, entry)
            self.assertTrue(verify(target, entry))
            with patch('assets.urllib.request.urlopen') as network:
                acquire(target, entry)
                network.assert_not_called()

    def test_bundled_ndl_files_match_original_revision(self):
        root = Path(__file__).parent/'vendor/ndlkotenocr'
        origin = json.loads((root/'ORIGIN.json').read_text())
        for relative, digest in origin['files'].items():
            with self.subTest(file=relative):
                self.assertEqual(hashlib.sha256((root/relative).read_bytes()).hexdigest(), digest)


if __name__ == '__main__':
    unittest.main()
