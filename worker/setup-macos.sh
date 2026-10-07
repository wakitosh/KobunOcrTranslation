#!/bin/bash
# Reproducible local bootstrap, scoped to this prototype's directory.
set -euo pipefail
KOBUN_MODULE="$(cd "$(dirname "$0")/.." && pwd)"
KOBUN_ROOT="$(cd "$KOBUN_MODULE/../.." && pwd)"
KOBUN_RUNTIME="${KOBUN_RUNTIME:-$KOBUN_ROOT/var/kobun-ocr-translation}"
if [ "$#" -ne 1 ]; then
    echo 'Usage: KOBUN_RUNTIME=/private/path bash worker/setup-macos.sh qwen35-9b-q4km'
    echo 'Choose explicitly: qwen35-9b-q4km (6.17 GB), qwen3-4b-q4km (2.50 GB), or qwen35-35b-a3b-q4km (22.29 GB). See worker/models.json for licenses.'
    exit 1
fi
KOBUN_MODEL_ID="$1"
if [ "$(uname -s)" != Darwin ] || [ "$(uname -m)" != arm64 ]; then
    echo 'This bootstrap is for Apple Silicon macOS. See README for other hosts.' >&2
    exit 1
fi
mkdir -p "$KOBUN_RUNTIME" "$KOBUN_RUNTIME/models" "$KOBUN_RUNTIME/llama"
printf '%s\n' 'Require all denied' > "$KOBUN_RUNTIME/.htaccess"
if [ ! -x "$KOBUN_RUNTIME/bootstrap/bin/uv" ]; then
    python3 -m pip install --target "$KOBUN_RUNTIME/bootstrap" 'uv==0.12.14'
fi
export UV_CACHE_DIR="$KOBUN_RUNTIME/uv-cache"
export UV_PYTHON_INSTALL_DIR="$KOBUN_RUNTIME/python"
export UV_PYTHON_BIN_DIR="$KOBUN_RUNTIME/bin"
KOBUN_UV="$KOBUN_RUNTIME/bootstrap/bin/uv"
"$KOBUN_UV" python install 3.11.16
if [ ! -x "$KOBUN_RUNTIME/venv/bin/python" ]; then
    "$KOBUN_UV" venv --python 3.11.16 "$KOBUN_RUNTIME/venv"
fi
"$KOBUN_UV" pip sync --python "$KOBUN_RUNTIME/venv/bin/python" "$KOBUN_MODULE/worker/requirements.lock"
if [ ! -x "$KOBUN_RUNTIME/llama/llama-b10980/llama-server" ]; then
    curl -fL --retry 2 https://github.com/ggml-org/llama.cpp/releases/download/b10980/llama-b10980-bin-macos-arm64.tar.gz -o "$KOBUN_RUNTIME/llama/b10980.tar.gz"
    printf '%s  %s\n' '8ef4d520e97f619bad5830953163dbea54f765b53a65b46eaa0a34da9d83e5e4' "$KOBUN_RUNTIME/llama/b10980.tar.gz" | shasum -a 256 -c -
    tar -xzf "$KOBUN_RUNTIME/llama/b10980.tar.gz" -C "$KOBUN_RUNTIME/llama"
fi
"$KOBUN_RUNTIME/venv/bin/python" "$KOBUN_MODULE/worker/assets.py" fetch --runtime "$KOBUN_RUNTIME" --ocr --model "$KOBUN_MODEL_ID"
"$KOBUN_RUNTIME/venv/bin/python" "$KOBUN_MODULE/worker/manage.py" init --runtime "$KOBUN_RUNTIME" --model "$KOBUN_MODEL_ID"
echo 'Setup complete. Install the control LaunchAgent, then start worker/LLM in Omeka settings. See LOCAL_MACOS.md.'
