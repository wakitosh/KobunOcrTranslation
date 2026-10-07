# macOSローカル環境の起動と復旧

Linux（RHEL 9.7）向けの設置手順は[DISTRIBUTION.md](DISTRIBUTION.md)を参照してください。この文書は開発用Macで運用サービスを起動するための補足です。worker用LaunchAgentは使用しません。workerとLLMサーバはOmekaのモジュール設定画面から起動します。

## 初回の登録

Omekaのルートから実行します。モデルの準備が済んでいない場合は、最初に`setup-macos.sh`を実行します。

```sh
KOBUN_RUNTIME="$PWD/var/kobun-ocr-translation" \
  bash modules/KobunOcrTranslation/worker/setup-macos.sh qwen35-9b-q4km
python3 modules/KobunOcrTranslation/worker/install_control_macos.py \
  --runtime "$PWD/var/kobun-ocr-translation"
```

`install_control_macos.py`が`~/Library/LaunchAgents/local.omeka-s.kobun-ocr-translation-control.plist`を作成し、運用サービスをすぐ起動します。以後はログイン時に起動し、異常終了時はlaunchdが再起動します。設定画面の「実行サービス」でworkerと、必要ならLLMサーバの「起動」を押してください。

## モデル切替とMetal実行

取得済みモデルは、設定画面でLLMサーバを停止し、「起動するモデル」を選んでLLMサーバを起動すると切り替わります。workerの設定更新・復帰は自動です。CPU／Metalの方式は引き継ぎます。

新しいモデルの取得や、CPUからMetalへの変更は設置者が行います。次は35B-A3BのQ4_K_M版を初めて取得し、Apple SiliconのGPUで実行する例です。モデルだけで22.29GBあり、十分な空き容量・メモリが必要です。実行方式の変更時は、設定画面でworkerとLLMサーバを停止してから以下を実行します。

```sh
python3 modules/KobunOcrTranslation/worker/assets.py fetch \
  --runtime "$PWD/var/kobun-ocr-translation" --model qwen35-35b-a3b-q4km
python3 modules/KobunOcrTranslation/worker/manage.py init \
  --runtime "$PWD/var/kobun-ocr-translation" --model qwen35-35b-a3b-q4km \
  --llm-backend metal
```

その後、設定画面からLLMサーバとworkerを起動します。`--llm-backend cpu`でCPU実行へ戻せます。指定しない場合は既存の実行方式を維持し、初回はCPU実行です。MetalはmacOS専用です。RHELではCPU実行を使用します。

## 運用サービス自体の起動・状態確認

```sh
launchctl print gui/$(id -u)/local.omeka-s.kobun-ocr-translation-control
launchctl kickstart -k gui/$(id -u)/local.omeka-s.kobun-ocr-translation-control
```

上は順に状態確認と再起動です。運用サービスが`bootout`で登録解除されている場合は、次のコマンドで起動します。

```sh
launchctl bootstrap gui/$(id -u) \
  "$HOME/Library/LaunchAgents/local.omeka-s.kobun-ocr-translation-control.plist"
```

設定を更新するときは、初回と同じ`install_control_macos.py --runtime ...`を再実行します。既存の運用サービスを置き換えて起動します。ログは`var/kobun-ocr-translation/control.log`です。運用サービスを再起動しても、Mac上で別プロセスとして動いているworkerとLLMサーバはそのままです。
