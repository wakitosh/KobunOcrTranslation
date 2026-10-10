"""Check a separately mounted NFS model directory without changing storage.

Compatible with the RHEL 9 installer interpreter (Python 3.9). Mount setup and
NAS permissions remain the operator's responsibility.
"""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys

NFS_TYPES = ('nfs', 'nfs4')


def filesystem(path):
    path = Path(path).absolute()
    while not path.exists():
        path = path.parent
    try:
        result = subprocess.run(['findmnt', '--json', '--first-only', '--target', str(path),
            '--output', 'TARGET,FSTYPE,OPTIONS'], check=True, capture_output=True, text=True, timeout=10)
        mounts = json.loads(result.stdout)['filesystems']
        if len(mounts) == 1 and mounts[0].get('fstype') == 'autofs':
            # Enter the directory to activate a direct automount. findmnt can
            # still select the autofs placeholder when NFS is stacked on it;
            # filtering filesystem types selects the actual model share.
            os.stat(str(path) + '/.')
            result = subprocess.run(['findmnt', '--json', '--first-only', '--target', str(path),
                '--types', ','.join(NFS_TYPES), '--output', 'TARGET,FSTYPE,OPTIONS'],
                check=True, capture_output=True, text=True, timeout=10)
            mounts = json.loads(result.stdout)['filesystems']
        if len(mounts) != 1 or not all(mounts[0].get(key) for key in ('target', 'fstype', 'options')):
            raise ValueError('Incomplete mount information')
        return mounts[0]
    except (OSError, ValueError, KeyError, subprocess.SubprocessError) as error:
        raise ValueError('Cannot determine the filesystem for ' + str(path)) from error


def require_nfs_models(models, writable=False, check_access=True):
    models = Path(models).absolute()
    if any(path.is_symlink() for path in (models, *models.parents)):
        raise ValueError('The NFS model path must not use symlinks: ' + str(models))
    if not models.is_dir():
        raise ValueError('Mount the NFS model directory first: ' + str(models))
    mount = filesystem(models)
    if mount['fstype'] not in NFS_TYPES or Path(mount['target']) != models:
        raise ValueError('The model directory is not an NFS mount point; refusing local fallback: ' + str(models))
    access = os.R_OK | os.X_OK
    if writable:
        access |= os.W_OK
        if 'rw' not in mount['options'].split(','):
            raise ValueError('Model acquisition requires a writable NFS mount: ' + str(models))
    if check_access and not os.access(models, access):
        raise ValueError('The service account cannot access the NFS model directory: ' + str(models))
    return mount


def check_runtime_models(runtime, config=None, writable=False):
    runtime = Path(runtime)
    if config is None:
        file = runtime/'config.json'
        config = json.loads(file.read_text()) if file.exists() else {}
    nfs = os.environ.get('KOBUN_MODELS_NFS') == '1' or config.get('models_storage') == 'nfs'
    if nfs:
        require_nfs_models(runtime/'models', writable=writable)
    return nfs


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    target = parser.add_mutually_exclusive_group(required=True)
    target.add_argument('--models', type=Path)
    target.add_argument('--runtime', type=Path)
    parser.add_argument('--writable', action='store_true')
    args = parser.parse_args()
    if args.models:
        require_nfs_models(args.models, writable=args.writable)
        print('NFS model mount check OK: ' + str(args.models))
    elif check_runtime_models(args.runtime, writable=args.writable):
        print('NFS model mount check OK: ' + str(args.runtime/'models'))


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
