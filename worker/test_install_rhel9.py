"""Installer safety and OCR-only configuration tests; no server changes/network."""
import contextlib
import io
import json
import shutil
import subprocess
import sys
from pathlib import Path
from types import SimpleNamespace
import tempfile
import unittest
from unittest.mock import patch

import install_rhel9 as installer
from manage import initialize, llama_command


class InstallTest(unittest.TestCase):
    def args(self, *extra):
        return installer.arguments(['--php-user', 'phpfixture', '--image-host', 'iiif.example.org', *extra])

    def check_runtime(self, worker, cwd):
        # Execute the real embedded check, without running dnf, pip, model
        # downloads, service registration or any other installation step.
        script = Path(__file__).with_name('setup-rhel9.sh').read_text()
        program = script.partition("<<'KOBUN_PY_CHECK'\n")[2].partition('\nKOBUN_PY_CHECK')[0]
        self.assertTrue(program)
        return subprocess.run([sys.executable, '-c', program, str(worker)],
            cwd=cwd, capture_output=True, text=True, timeout=10)

    def test_runtime_check_supports_sqlite_without_touching_existing_data(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            doc = root/'data'/'legacy-visitor-cache'/'document.json'
            doc.parent.mkdir(parents=True)
            doc.write_text('{"workflow":"assist","text":"existing text"}')
            before = {str(file.relative_to(root)): file.read_bytes() for file in root.rglob('*') if file.is_file()}
            result = self.check_runtime(Path(__file__).resolve().parent, root)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn('SQLite and cache modules check OK', result.stdout)
            after = {str(file.relative_to(root)): file.read_bytes() for file in root.rglob('*') if file.is_file()}
            self.assertEqual(after, before)

    def test_runtime_check_rejects_incomplete_updated_worker_copy(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            shutil.copyfile(Path(__file__).with_name('cache_policy.py'), root/'cache_policy.py')
            result = self.check_runtime(root, root)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('complete updated worker sources', result.stderr)
            self.assertIn('cache_storage', result.stderr)

    def test_runtime_check_rejects_an_interpreter_without_sqlite_support(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root/'sqlite3.py').write_text('raise ImportError("fixture: sqlite support unavailable")\n')
            result = self.check_runtime(root, root)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('Python sqlite3 support', result.stderr)
            self.assertIn('sqlite support unavailable', result.stderr)

    def test_default_is_read_only_with_limited_nine_b_model(self):
        with patch.object(installer, 'install') as install, patch.object(installer.subprocess, 'run') as run:
            with contextlib.redirect_stdout(io.StringIO()) as output:
                installer.main(['--php-user', 'phpfixture', '--image-host', 'iiif.example.org'])
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
        self.assertNotIn('Group=phpfixture', unit)
        command = installer.setup_command(args)
        self.assertIn('--property=User=kobunocr', command)
        self.assertIn('--property=CPUQuota=200%', command)
        self.assertIn('--property=MemoryMax=16G', command)
        self.assertEqual(command[-1], 'qwen35-9b-q4km')
        self.assertEqual(installer.backend_config(args)['token_file'], '/opt/kobun-ocr-translation/php/backend-token')
        self.assertEqual(self.args('--model', 'none').memory_max, '4G')

    def test_moe_model_uses_its_own_resource_cap_and_setup_selection(self):
        args = self.args('--model', 'qwen35-35b-a3b-q4km')
        self.assertEqual(args.memory_max, '48G')
        self.assertIn('MemoryMax=48G', installer.unit_text(args, 'kobunocr'))
        self.assertEqual(installer.setup_command(args)[-1], 'qwen35-35b-a3b-q4km')

    def test_cpu_default_and_explicit_metal_commands_preserve_auth_and_context(self):
        config = {'llm_model_path': '/private/models/model.gguf', 'llm_model': 'fixture', 'context_size': 4096, 'threads': 4}
        cpu = llama_command(Path('/private/runtime'), config)
        self.assertEqual(cpu[cpu.index('--device')+1], 'none')
        self.assertEqual(cpu[cpu.index('--n-gpu-layers')+1], '0')
        self.assertIn('--no-kv-offload', cpu)
        self.assertIn('--no-op-offload', cpu)
        with patch('manage.sys.platform', 'darwin'):
            metal = llama_command(Path('/private/runtime'), {**config, 'llm_backend': 'metal'})
        self.assertEqual(metal[metal.index('--device')+1], 'MTL0')
        self.assertEqual(metal[metal.index('--n-gpu-layers')+1], '99')
        self.assertNotIn('--no-kv-offload', metal)
        self.assertNotIn('--no-op-offload', metal)
        for command in (cpu, metal):
            self.assertEqual(command[command.index('--api-key-file')+1], '/private/runtime/backend-token')
            self.assertEqual(command[command.index('--ctx-size')+1], '4096')
        with patch('manage.sys.platform', 'linux'), self.assertRaisesRegex(ValueError, 'macOS'):
            llama_command(Path('/private/runtime'), {**config, 'llm_backend': 'metal'})
        with self.assertRaisesRegex(ValueError, 'Choose cpu'):
            llama_command(Path('/private/runtime'), {**config, 'llm_backend': 'unknown'})

    def test_model_switch_preserves_or_explicitly_changes_the_backend(self):
        with tempfile.TemporaryDirectory() as temp:
            runtime = Path(temp)
            with patch('manage.sys.platform', 'darwin'), patch('manage.verify', return_value=True):
                first = initialize(runtime, 'qwen35-9b-q4km', llm_backend='metal')
                self.assertEqual(first['llm_backend'], 'metal')
                switched = initialize(runtime, 'qwen35-35b-a3b-q4km')
                self.assertEqual(switched['llm_backend'], 'metal')
                self.assertEqual(switched['llm_model'], 'Qwen3.5-35B-A3B')
                cpu = initialize(runtime, 'qwen35-35b-a3b-q4km', llm_backend='cpu')
                self.assertEqual(cpu['llm_backend'], 'cpu')

    def test_invalid_paths_accounts_and_resource_limits_rejected(self):
        for extra in [('--prefix', '/opt/omeka-s/data'), ('--prefix', '/opt'),
                      ('--service-user', 'root'), ('--service-user', 'phpfixture'),
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
            stack.enter_context(patch.object(installer.pwd, 'getpwnam', side_effect=lambda name: php_user if name == 'phpfixture' else fake_user))
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
