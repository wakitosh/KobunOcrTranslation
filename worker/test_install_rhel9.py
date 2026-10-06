"""Installer safety and OCR-only configuration tests; no server changes/network."""
import contextlib
import io
import json
from pathlib import Path
from types import SimpleNamespace
import tempfile
import unittest
from unittest.mock import patch

import install_rhel9 as installer
from manage import initialize


class InstallTest(unittest.TestCase):
    def args(self, *extra):
        return installer.arguments(['--php-user', 'limewww', '--image-host', 'dc.tulips.tsukuba.ac.jp', *extra])

    def test_default_is_read_only_with_limited_nine_b_model(self):
        with patch.object(installer, 'install') as install, patch.object(installer.subprocess, 'run') as run:
            with contextlib.redirect_stdout(io.StringIO()) as output:
                installer.main(['--php-user', 'limewww', '--image-host', 'dc.tulips.tsukuba.ac.jp'])
        install.assert_not_called()
        run.assert_not_called()
        self.assertIn('CPU cap: 200%', output.getvalue())
        self.assertIn('memory cap: 16G', output.getvalue())
        self.assertIn('qwen35-9b-q4km', output.getvalue())

    def test_unit_and_setup_are_scoped_to_backend_user_and_opt(self):
        args = self.args()
        unit = installer.unit_text(args, 'kobunocr')
        self.assertIn('User=kobunocr', unit)
        self.assertIn('CPUQuota=200%', unit)
        self.assertIn('MemoryMax=16G', unit)
        self.assertIn('ProtectSystem=strict', unit)
        self.assertIn('ReadWritePaths=/opt/kobun-ocr-translation/runtime', unit)
        self.assertNotIn('ReadWritePaths=/opt/omeka-s', unit)
        self.assertNotIn('library', unit)
        command = installer.setup_command(args)
        self.assertIn('--property=User=kobunocr', command)
        self.assertIn('--property=CPUQuota=200%', command)
        self.assertIn('--property=MemoryMax=16G', command)
        self.assertEqual(command[-1], 'qwen35-9b-q4km')
        self.assertEqual(installer.backend_config(args)['token_file'], '/opt/kobun-ocr-translation/php/backend-token')
        self.assertEqual(self.args('--model', 'none').memory_max, '4G')

    def test_invalid_paths_accounts_and_resource_limits_rejected(self):
        for extra in [('--prefix', '/opt/omeka-s/data'), ('--prefix', '/opt'),
                      ('--service-user', 'root'), ('--service-user', 'limewww'),
                      ('--threads', '0'), ('--memory-max', 'infinity'),
                      ('--prefix', '/opt/path with spaces'), ('--image-host', 'https://example.org')]:
            with self.subTest(extra=extra), contextlib.redirect_stderr(io.StringIO()):
                with self.assertRaises(SystemExit):
                    self.args(*extra)

    def preflight(self, active='inactive', listeners=''):
        args = self.args()
        fake_user = SimpleNamespace(pw_name='kobunocr', pw_uid=1001, pw_gid=1001, pw_shell='/sbin/nologin')
        php_user = SimpleNamespace(pw_uid=1004, pw_gid=1002)
        with contextlib.ExitStack() as stack:
            stack.enter_context(patch.object(installer.sys, 'platform', 'linux'))
            stack.enter_context(patch.object(installer.os, 'geteuid', return_value=0))
            stack.enter_context(patch.object(installer, '__file__', '/opt/omeka-s/modules/KobunOcrTranslation/worker/install_rhel9.py'))
            stack.enter_context(patch.object(Path, 'read_text', return_value='ID="rhel"\nVERSION_ID="9.7"\n'))
            stack.enter_context(patch.object(Path, 'is_symlink', return_value=False))
            stack.enter_context(patch.object(Path, 'is_file', return_value=True))
            stack.enter_context(patch.object(Path, 'exists', lambda path: str(path) in ('/opt', '/')))
            stack.enter_context(patch.object(installer.pwd, 'getpwnam', side_effect=lambda name: php_user if name == 'limewww' else fake_user))
            stack.enter_context(patch.object(installer.os, 'getgrouplist', return_value=[1001]))
            stack.enter_context(patch.object(installer.subprocess, 'run', return_value=SimpleNamespace(stdout=active)))
            stack.enter_context(patch.object(installer.subprocess, 'check_output', return_value=listeners))
            stack.enter_context(patch.object(installer.shutil, 'disk_usage', return_value=SimpleNamespace(free=100*1024**3)))
            installer.preflight(args)

    def test_active_service_or_occupied_port_refused_before_mutation(self):
        with self.assertRaisesRegex(ValueError, 'running'):
            self.preflight(active='active')
        with self.assertRaisesRegex(ValueError, 'port is already in use'):
            self.preflight(listeners='LISTEN 0 128 127.0.0.1:8765 0.0.0.0:*\n')
        self.preflight()

    def test_ocr_only_can_initialize_without_fetching_an_llm_and_keeps_existing_token(self):
        with tempfile.TemporaryDirectory() as temp:
            runtime = Path(temp)
            (runtime/'backend-token').write_text('existing-secret-token')
            with patch('manage.model_entry') as entry, patch('manage.verify') as verify:
                config = initialize(runtime, ocr_only=True)
            entry.assert_not_called()
            verify.assert_not_called()
            self.assertEqual(config['llm_model_id'], '')
            self.assertEqual(config['llm_model'], '')
            self.assertEqual((runtime/'backend-token').read_text(), 'existing-secret-token')
            self.assertEqual(initialize(runtime), config)
            (runtime/'config.json').write_text(json.dumps({**config, 'image_hosts': ['custom.example.org']}))
            self.assertEqual(initialize(runtime, ocr_only=True)['image_hosts'], ['custom.example.org'])
            with self.assertRaisesRegex(ValueError, 'not both'):
                initialize(runtime, 'qwen35-9b-q4km', ocr_only=True)

    def test_existing_model_or_running_process_blocks_unsafe_reconfiguration(self):
        with tempfile.TemporaryDirectory() as temp:
            runtime = Path(temp)
            initialize(runtime, ocr_only=True)
            with patch('manage.verify', return_value=False):
                with self.assertRaisesRegex(ValueError, 'not verified'):
                    initialize(runtime, 'qwen35-9b-q4km')
            (runtime/'processes.json').write_text(json.dumps({'worker': {'pid': 123, 'marker': 'test'}}))
            with patch('manage.owned', return_value=True):
                with self.assertRaisesRegex(ValueError, 'Stop the local servers'):
                    initialize(runtime, ocr_only=True)


if __name__ == '__main__':
    unittest.main()
