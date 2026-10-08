"""NFS mount and local-fallback guards; no mounts or model downloads."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

import assets
import model_storage as storage
from manage import initialize


class ModelStorageTest(unittest.TestCase):
    def mount(self, path, fstype='nfs4', options='rw,hard'):
        return {'target': str(path), 'fstype': fstype, 'options': options}

    def test_an_existing_directory_is_not_a_model_mount(self):
        with tempfile.TemporaryDirectory() as temp:
            models = Path(temp).resolve()/'models'
            models.mkdir()
            for fstype in ('ext4', 'autofs', 'tmpfs'):
                with self.subTest(fstype=fstype), patch.object(storage, 'filesystem', return_value=self.mount(models, fstype)):
                    with self.assertRaisesRegex(ValueError, 'refusing local fallback'):
                        storage.require_nfs_models(models)
            with patch.object(storage, 'filesystem', return_value=self.mount(models.parent)):
                with self.assertRaisesRegex(ValueError, 'not an NFS mount point'):
                    storage.require_nfs_models(models)

    def test_missing_and_symlink_mount_paths_are_rejected(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp).resolve()
            with self.assertRaisesRegex(ValueError, 'Mount the NFS'):
                storage.require_nfs_models(root/'missing')
            (root/'target').mkdir()
            (root/'models').symlink_to(root/'target', target_is_directory=True)
            with self.assertRaisesRegex(ValueError, 'symlinks'):
                storage.require_nfs_models(root/'models')

    def test_readonly_mount_can_run_but_cannot_download(self):
        with tempfile.TemporaryDirectory() as temp:
            models = Path(temp).resolve()
            with patch.object(storage, 'filesystem', return_value=self.mount(models, options='ro,hard')):
                storage.require_nfs_models(models)
                with self.assertRaisesRegex(ValueError, 'writable NFS'):
                    storage.require_nfs_models(models, writable=True)

    def test_check_uses_service_access_and_can_defer_root_squash_access(self):
        with tempfile.TemporaryDirectory() as temp:
            models = Path(temp).resolve()
            with patch.object(storage, 'filesystem', return_value=self.mount(models)), patch.object(storage.os, 'access', return_value=False):
                with self.assertRaisesRegex(ValueError, 'service account'):
                    storage.require_nfs_models(models)
                storage.require_nfs_models(models, writable=True, check_access=False)

    def test_fetch_cannot_write_to_an_unmounted_directory_even_without_environment(self):
        with tempfile.TemporaryDirectory() as temp:
            runtime = Path(temp).resolve()
            models = runtime/'models'
            models.mkdir()
            (runtime/'config.json').write_text(json.dumps({'models_storage': 'nfs'}))
            before = {str(file.relative_to(runtime)): file.read_bytes() for file in runtime.rglob('*') if file.is_file()}
            with patch.dict(os.environ, {}, clear=True), patch.object(storage, 'filesystem', return_value=self.mount(models, 'ext4')):
                with patch.object(sys, 'argv', ['assets.py', 'fetch', '--runtime', str(runtime), '--ocr']), patch.object(assets, 'acquire') as acquire:
                    with self.assertRaisesRegex(ValueError, 'refusing local fallback'):
                        assets.main()
                    acquire.assert_not_called()
            after = {str(file.relative_to(runtime)): file.read_bytes() for file in runtime.rglob('*') if file.is_file()}
            self.assertEqual(after, before)

    def test_first_setup_environment_checks_mount_before_config_exists(self):
        with tempfile.TemporaryDirectory() as temp:
            runtime = Path(temp).resolve()
            (runtime/'models').mkdir()
            with patch.dict(os.environ, {'KOBUN_MODELS_NFS': '1'}), patch.object(storage, 'filesystem', return_value=self.mount(runtime/'models')):
                self.assertTrue(storage.check_runtime_models(runtime, writable=True))
            with patch.dict(os.environ, {}, clear=True), patch.object(storage, 'filesystem') as filesystem:
                self.assertFalse(storage.check_runtime_models(runtime))
                filesystem.assert_not_called()

    def test_nfs_setting_survives_model_changes_and_environment_removal(self):
        with tempfile.TemporaryDirectory() as temp:
            runtime = Path(temp).resolve()
            models = runtime/'models'
            models.mkdir()
            with patch.object(storage, 'filesystem', return_value=self.mount(models)), patch('manage.verify', return_value=True):
                with patch.dict(os.environ, {'KOBUN_MODELS_NFS': '1'}):
                    self.assertEqual(initialize(runtime, 'qwen35-9b-q4km')['models_storage'], 'nfs')
                with patch.dict(os.environ, {}, clear=True):
                    self.assertEqual(initialize(runtime, 'qwen35-35b-a3b-q4km')['models_storage'], 'nfs')
            with patch.dict(os.environ, {}, clear=True), patch.object(storage, 'filesystem', return_value=self.mount(models, 'ext4')):
                with self.assertRaisesRegex(ValueError, 'refusing local fallback'):
                    initialize(runtime)

    def test_findmnt_resolves_the_existing_parent_and_refuses_bad_output(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp).resolve()
            response = json.dumps({'filesystems': [self.mount(root, 'ext4')]})
            with patch.object(storage.subprocess, 'run', return_value=SimpleNamespace(stdout=response)) as run:
                self.assertEqual(storage.filesystem(root/'not-created'/'data')['fstype'], 'ext4')
                self.assertIn(str(root), run.call_args.args[0])
                self.assertEqual(run.call_args.kwargs['timeout'], 10)
            for response in ('invalid json', '{}', '{"filesystems": []}', '{"filesystems": [{}]}'):
                with self.subTest(response=response), patch.object(storage.subprocess, 'run', return_value=SimpleNamespace(stdout=response)):
                    with self.assertRaisesRegex(ValueError, 'Cannot determine'):
                        storage.filesystem(root)
            with patch.object(storage.subprocess, 'run', side_effect=subprocess.TimeoutExpired('findmnt', 10)):
                with self.assertRaisesRegex(ValueError, 'Cannot determine'):
                    storage.filesystem(root)


if __name__ == '__main__':
    unittest.main()
