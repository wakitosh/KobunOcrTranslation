#!/usr/bin/env bash
# Prepare the private runtime on RHEL 9. Run as the dedicated service user.
set -euo pipefail
umask 077

KOBUN_MODULE="$(cd "$(dirname "$0")/.." && pwd)"
KOBUN_RUNTIME="${KOBUN_RUNTIME:-/var/lib/kobun-ocr-translation}"
if [ "$#" -ne 1 ]; then
    echo 'Usage: KOBUN_RUNTIME=/private/path bash worker/setup-rhel9.sh qwen35-9b-q4km | qwen3-4b-q4km | none' >&2
    exit 1
fi
KOBUN_MODEL_ID="$1"
case "$KOBUN_MODEL_ID" in qwen35-9b-q4km|qwen3-4b-q4km|none) ;; *) echo 'Unknown model selection.' >&2; exit 1 ;; esac
KOBUN_BUILD_JOBS="${KOBUN_BUILD_JOBS:-2}"
if ! [[ "$KOBUN_BUILD_JOBS" =~ ^[1-9][0-9]*$ ]]; then echo 'Invalid build jobs.' >&2; exit 1; fi
if [ ! -f /etc/os-release ]; then
    echo 'RHEL 9 is required.' >&2
    exit 1
fi
# shellcheck disable=SC1091
. /etc/os-release
if [ "${ID:-}" != rhel ] || [[ "${VERSION_ID:-}" != 9.* ]]; then
    echo 'This setup script targets RHEL 9. See DISTRIBUTION.md for other systems.' >&2
    exit 1
fi

mkdir -p "$KOBUN_RUNTIME/models" "$KOBUN_RUNTIME/llama"
chmod 0700 "$KOBUN_RUNTIME"
if ! command -v python3.11 >/dev/null 2>&1; then
    echo 'Install the python3.11 and python3.11-pip RHEL packages first.' >&2
    exit 1
fi
if [ ! -x "$KOBUN_RUNTIME/venv/bin/python" ]; then
    python3.11 -m venv "$KOBUN_RUNTIME/venv"
fi
"$KOBUN_RUNTIME/venv/bin/python" -m pip install --only-binary=:all: -r "$KOBUN_MODULE/worker/requirements.lock"

if [ "$KOBUN_MODEL_ID" = none ]; then
    "$KOBUN_RUNTIME/venv/bin/python" "$KOBUN_MODULE/worker/assets.py" fetch --runtime "$KOBUN_RUNTIME" --ocr
    "$KOBUN_RUNTIME/venv/bin/python" "$KOBUN_MODULE/worker/manage.py" init --runtime "$KOBUN_RUNTIME" --ocr-only
    echo 'OCR runtime prepared (no local LLM).'
    exit 0
fi

KOBUN_LLAMA="$KOBUN_RUNTIME/llama/llama-b10980"
if [ ! -x "$KOBUN_LLAMA/llama-server" ]; then
    KOBUN_SOURCE="$KOBUN_RUNTIME/llama/source-b10980"
    if [ ! -d "$KOBUN_SOURCE/.git" ]; then
        git clone --depth 1 --branch b10980 https://github.com/ggml-org/llama.cpp "$KOBUN_SOURCE"
    fi
    if [ "$(git -C "$KOBUN_SOURCE" rev-parse HEAD)" != 6ec1a7e956cfd5dfc111b6d3fa8e7d2c219106db ]; then
        echo 'llama.cpp source is not the expected b10980 commit.' >&2
        exit 1
    fi
    cmake -S "$KOBUN_SOURCE" -B "$KOBUN_SOURCE/build" -DCMAKE_BUILD_TYPE=Release
    cmake --build "$KOBUN_SOURCE/build" --config Release --target llama-server -j "$KOBUN_BUILD_JOBS"
    mkdir -p "$KOBUN_LLAMA"
    cp -a "$KOBUN_SOURCE/build/bin/." "$KOBUN_LLAMA/"
    test -x "$KOBUN_LLAMA/llama-server"
fi

"$KOBUN_RUNTIME/venv/bin/python" "$KOBUN_MODULE/worker/assets.py" fetch \
    --runtime "$KOBUN_RUNTIME" --ocr --model "$KOBUN_MODEL_ID"
"$KOBUN_RUNTIME/venv/bin/python" "$KOBUN_MODULE/worker/manage.py" init \
    --runtime "$KOBUN_RUNTIME" --model "$KOBUN_MODEL_ID"
echo 'Runtime prepared. Install and start the control systemd service, then start worker/LLM in Omeka settings.'
