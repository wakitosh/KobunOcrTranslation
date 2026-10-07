# 配布構成・モデルの配置

## 配布物を分ける

| 配布・配置単位 | 内容 | 扱い |
|---|---|---|
| OmekaモジュールZIP | PHP、構築済みJS/CSS、編集可能なUIソース、worker、NDL実行用ソース、ライセンス | 小容量。モデル・入力画像・秘密情報を含まない |
| OCRモデル | RTMDet 40,188,733 bytes、PARSeq 42,442,247 bytes、合計82.63 MB | 設置者が別途取得。CC BY 4.0 |
| 翻訳モデル（選択式） | Qwen3.5-9B Q4_K_M: 6,169,341,984 bytes（6.17 GB / 5.75 GiB） | 設置者が別途取得。訳文は人による確認が必要。Apache 2.0 |
| 翻訳モデル（比較用） | Qwen3-4B-Instruct-2507 Q4_K_M: 2,497,280,736 bytes（2.50 GB / 2.33 GiB） | 小容量の選択肢。訳文は人による確認が必要。Apache 2.0 |
| 実行環境 | Python仮想環境、llama.cpp、ログ、認証情報、作業データ | 設置者のサーバに別途配置 |

GBは10進、GiBは2進。ファイル容量と実行時メモリは異なります。9Bモデルは画像入力用の追加モデル（mmproj）を使用せず、OCR後のテキストだけを受け取ります。

モデルの固定リビジョン、ファイル名、容量、SHA-256、取得先、ライセンスへのリンクは [`worker/models.json`](worker/models.json) に集約しています。モデルの有効化・モジュールのインストール時にはダウンロードしません。設置者が `assets.py fetch` またはセットアップスクリプトを明示実行します。既存ファイルはサイズとSHA-256を照合し、不一致を上書きしません。中断ファイルは `.partial` のままで、検証完了後に正式名へ移します。

| モデルID | モデル | GGUF容量 |
| --- | --- | --- |
| `qwen3-4b-q4km` | Qwen3-4B-Instruct-2507 | 2.50 GB |
| `qwen35-9b-q4km` | Qwen3.5-9B | 6.17 GB |
| `qwen35-35b-a3b-q4km` | Qwen3.5-35B-A3B | 22.29 GB |

35B-A3Bは総パラメータ35B、推論時に約3Bを使用するMoEモデルです。重み全体を保持する必要があり、3Bのモデルと同じメモリ量では動きません。一括インストーラで35Bを選ぶ場合、初回の空き容量は40 GiB以上、サービスのメモリ上限は初期値48Gです。これは設置時の容量確認と資源上限であり、必要メモリ・速度の保証ではありません。設置先で実測してください。

## 同梱ソースとライセンス

**両プロジェクトの元リポジトリ全体をモジュールに添付する必要はありません。** 確認した固定版はいずれもCC BY 4.0です。同ライセンスの第2条(a)(1)は一部の複製・配布と翻案物の配布を認め、第3条(a)は提供された著作者・著作権等の表示、ライセンス・免責等の通知、合理的に実行可能な原資料へのリンク、変更の表示等を要求しています。元ソース一式を併送する条項はありません。[CC BY 4.0 日本語リーガルコード](https://creativecommons.org/licenses/by/4.0/legalcode.ja)

同梱するソースと依存関係は次のとおりです。

- **みんなで翻刻OCR**：改変した `ui/ImageViewer.tsx`、`ui/viewer.css` と、それを構築した画面を配布します。元アプリのブラウザ推論・モデルキャッシュ・他サービス連携の実装は不要です。作者・出典・固定版・変更内容は画面と `THIRD_PARTY_NOTICES.md` に記載しています。
- **NDL古典籍OCR-Lite**：workerがRTMDet/PARSeq/読み順処理をimportするので、そのコードは実行時に必要です。約211 KBの実行用ソースを `worker/vendor/ndlkotenocr` に未改変で同梱しました。GUI、学習用コード、サンプル、重み、Git履歴は除外しています。対象ファイルと原版のハッシュは `ORIGIN.json` で確認できます。元リポジトリの別cloneには依存しません。
- **第三者依存物**：上記とは別のライセンスを持つ部分もあります。NDLの `LICENCE_DEPENDENCEIES` と各JSライブラリのライセンスを同梱しています。Python依存パッケージ・llama.cppは別途導入します。

独自コードはGPL-3.0-or-later、取り込んだ部分はそれぞれの表示・ライセンスを保持します。配布ZIPには編集可能なソース、ビルド設定、依存バージョン、GPL本文も含めます。

Qwenモデルも本体とは別のライセンスです。モデルファイルは同梱せず、配布元から取得します。将来モデル入りのオフライン媒体を配布する場合は、その固定版のApache 2.0本文、著作権・NOTICE（存在する場合）と変換元・量子化版の表示を媒体に含めてください。[Qwen3.5-9B公式モデルカード](https://huggingface.co/Qwen/Qwen3.5-9B)、[Apache 2.0 第4条](https://www.apache.org/licenses/LICENSE-2.0)

## RHEL 9.7への設置（単一サーバ・CPU実行）

**RHEL 9.7の一括導入は[INSTALL_RHEL9.md](INSTALL_RHEL9.md)を参照してください。** `/opt/omeka-s`のモジュールディレクトリへGitHubのコードを取得し、`worker/install_rhel9.py`で`/opt/kobun-ocr-translation`へバックエンドを構築します。計画表示が初期動作で、`--apply`時だけ専用ユーザ作成・環境構築・サービス登録を行います。Omekaの配置先、PHP実行ユーザ、IIIFホストは設置環境に合わせて指定してください。

以下は構成を個別に確認したい場合の手動設置例です。一括導入と併用せず、配置・ユーザ・接続設定を揃えてください。

以下はOmeka Sの配置先を `/var/www/omeka-s`、非公開の実行領域を `/var/lib/kobun-ocr-translation` とした例です。実際の配置先、PHP実行ユーザー、IIIFホストは環境に合わせて置き換えてください。workerとLLMサーバは個別の常駐サービスを登録せず、Omekaのモジュール設定画面から起動・停止します。画面から両者を起動できるよう、**運用サービスだけ**をsystemdで常駐させます。この手順はRHEL 9.7向けに作成しましたが、RHEL 9.7実機での導入・性能検証はまだ行っていません。

RHEL 9の標準Pythonは3.9ですが、Python 3.11を`python3.11`と`python3.11-pip`のパッケージで併用できます。workerはPython 3.11の仮想環境をWeb非公開の実行領域に作成し、システムの`python3`は変更しません。Red Hatも、Pythonパッケージをシステム全体へ直接pipで導入せず、仮想環境を使う方法を案内しています。[RHEL 9のPython手順](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/installing_and_using_dynamic_programming_languages/assembly_installing-and-using-python_installing-and-using-dynamic-programming-languages)

### 1. 実行領域とモデルを準備

設置者がRHEL 9.7のパッケージと、専用の実行ユーザーを用意します。次の例はCPU版のllama.cppを固定版 `b10980` からビルドし、OCRモデルと選択したGGUFモデルをダウンロード・ハッシュ検証します。`setup-rhel9.sh` はrootではなく専用ユーザーで実行してください。モデル取得とビルドには十分な空き容量と時間が必要です。

```sh
sudo dnf install python3.11 python3.11-pip git gcc-c++ cmake make
sudo useradd --system --user-group --home-dir /var/lib/kobun-ocr-translation --shell /sbin/nologin kobunocr
sudo install -d -o kobunocr -g kobunocr -m 0700 /var/lib/kobun-ocr-translation
cd /var/www/omeka-s
sudo -u kobunocr env KOBUN_RUNTIME=/var/lib/kobun-ocr-translation \
  bash modules/KobunOcrTranslation/worker/setup-rhel9.sh qwen35-9b-q4km
```

容量や速度を優先する場合はモデルIDを `qwen3-4b-q4km` に変更できます。セットアップは`requirements.lock`のPython依存、OCRモデル、llama.cpp実行ファイル、LLMモデルと`config.json`・`backend-token`をWeb非公開領域へ置きます。モデルやllama.cppのソースはモジュールZIPに含まれません。llama.cppのビルド方法は[公式server手順](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)に準じ、[b10980リリース](https://github.com/ggml-org/llama.cpp/releases/tag/b10980)を固定して使用します。RHEL 9.7上での性能と必要メモリは設置先で実測してください。

### 2. Omekaから運用サービスへ接続

PHPが`backend-token`を読める必要があります。実行領域全体をPHPに公開せず、トークンだけをWeb公開ディレクトリ外の秘密ファイルへコピーします。以下はPHPのUnixユーザー・グループが`apache`の場合の例です。環境によりその名前を変更してください。

```sh
sudo install -d -o root -g apache -m 0750 /etc/omeka-s
sudo install -o root -g apache -m 0640 \
  /var/lib/kobun-ocr-translation/backend-token /etc/omeka-s/kobun-backend-token
```

Omekaの`config/local.config.php`に次を設定します。両サービスを同じホストに置く想定なので、通信先はループバックです。ポート8765（LLM）、8766（worker）、8767（運用サービス）を外部へ公開しないでください。

```php
'kobun_ocr' => [
    'backend_url' => 'http://127.0.0.1:8766',
    'control_url' => 'http://127.0.0.1:8767',
    'token_file' => '/etc/omeka-s/kobun-backend-token',
    'image_hosts' => ['iiif.example.ac.jp'],
    'resource_hosts' => ['archive.example.ac.jp'],
    'public_ocr_pages_per_hour' => 24,
    'public_translations_per_hour' => 6,
],
```

トークンを再生成した場合はPHP側の秘密ファイルにも再コピーしてください。SELinuxでPHPからのループバック接続や秘密ファイルの読取が拒否される場合は、監査ログで拒否箇所を確認し、対象のポリシー・ファイルラベルを調整します。Webサーバーからの外向き接続には`httpd_can_network_connect`が関係する構成があります。[RHEL 9のWebサーバー説明](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/deploying_web_servers_and_reverse_proxies/setting-up-and-configuring-nginx_deploying-web-servers-and-reverse-proxies)、[SELinuxのファイルラベル説明](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_selinux/configuring-selinux-for-applications-and-services-with-non-standard-configurations_using-selinux)

### 3. 運用サービスだけをsystemdで常駐

`/etc/systemd/system/kobun-ocr-control.service`を次の内容で作成します。運用サービスは認証付きの状態取得と起動・停止操作を受け付け、`manage.py`経由でworkerとLLMサーバを起動します。worker用の別のsystemdユニットは作成しません。

```ini
[Unit]
Description=Omeka Kobun OCR control service
After=network.target

[Service]
Type=simple
User=kobunocr
Group=kobunocr
WorkingDirectory=/var/www/omeka-s
UMask=0077
ExecStart=/var/lib/kobun-ocr-translation/venv/bin/python /var/www/omeka-s/modules/KobunOcrTranslation/worker/control_server.py --runtime /var/lib/kobun-ocr-translation
Restart=on-failure
RestartSec=5
KillMode=control-group
NoNewPrivileges=true
ProtectSystem=strict
ReadWritePaths=/var/lib/kobun-ocr-translation

[Install]
WantedBy=multi-user.target
```

```sh
sudo systemd-analyze verify /etc/systemd/system/kobun-ocr-control.service
sudo systemctl daemon-reload
sudo systemctl enable --now kobun-ocr-control.service
sudo systemctl status kobun-ocr-control.service
```

運用サービス自体が停止した場合の起動は`sudo systemctl start kobun-ocr-control.service`、更新後の再起動は`sudo systemctl restart kobun-ocr-control.service`です。状態確認は`sudo systemctl status kobun-ocr-control.service`、ログは`sudo journalctl -u kobun-ocr-control.service -n 100`で確認できます。カスタムユニットの配置・`daemon-reload`・`enable --now`は[RHEL 9のsystemd手順](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd)に従います。

**この構成で運用サービスを再起動・停止すると、同じsystemd制御グループに属するworkerとLLMサーバも停止します。** その後は設定画面から必要なサービスを起動してください。workerとLLMサーバはOS起動時には自動起動しません。これはsystemdの標準的な制御グループ単位の停止動作です。[systemdのKillMode説明](https://www.man7.org/linux/man-pages/man5/systemd.kill.5.html)

### 4. ブラウザから起動・停止

Omekaの全体管理者で「モジュール」→「Kobun OCR / Translation」→「設定」→「実行サービス」を開き、workerの「起動」を押します。OCRが「準備済み」になったことを確認してください。現代語訳を使う場合だけ、LLMサーバも「起動」します。処理中ジョブがある間は停止・再起動できません。設定画面の操作には、サービス設定フォームの保存は不要です。

取得済みモデルは、設定画面からLLMサーバの停止 →「起動するモデル」で選択 → LLMサーバの起動の順に切り替えます。workerが稼働中の場合は設定更新と復帰を自動で行います。CPU／Metal・スレッド数・文脈長と、保存済みの訳は維持します。新しいモデルの初回取得・資源上限の変更はサーバ管理者が実施してください。既存環境はworkerと運用サービスの更新・再起動が必要です。

macOSのローカル設置と運用サービス用LaunchAgentの起動方法は[LOCAL_MACOS.md](LOCAL_MACOS.md)に分けて記載しています。

## 商用APIを併用する場合

モジュール設定の「訪問者の現代語訳設定」で、公開画面のフォーム表示、許可するLLM・保存方法、選択・モデル変更・キー入力・接続確認の可否と初期値を指定します。全サイトの訪問者に共通で、管理者の編集画面には適用しません。既存のブラウザ設定が許可範囲外になった場合はそのキーを再利用せず、許可した方法で再登録を求めます。ローカルLLMの公開実行はサーバ側でも許可を確認します。具体的な設定例は[README.md](README.md#管理者による訪問者設定の制御)を参照してください。

訪問者が選んだOpenAI・Anthropic・Googleへの通信はブラウザが直接行います。Omeka・workerには商用APIキーを設定しません。公開画面の一時的な商用訳はサーバへ保存せず、管理画面で管理者が明示的に保存した訳だけを作業データへ記録します。商用APIによる訳にローカルLLMサーバの起動は不要です。OCRと作業データの保存には従来どおりworkerを使用します。

サイトでContent Security Policy（CSP）を設定している場合は、`connect-src`に使用するサービスの`https://api.openai.com`、`https://api.anthropic.com`、`https://generativelanguage.googleapis.com`を許可してください。任意のAPI接続先やサーバ側の中継は追加していません。商用APIと暗号化保存の利用にはHTTPSが必要です。接続時はCookieとRefererを送信しないため、HTTPリファラ制限付きのAPIキーでは拒否される場合があります。

呼び出し仕様は[OpenAI Responses API](https://developers.openai.com/api/docs/guides/text)、[Anthropic Messages API](https://platform.claude.com/docs/en/api/messages/create)、[Gemini generateContent](https://ai.google.dev/api/generate-content?hl=en)に従っています。OpenAIには`store: false`を指定しますが、提供者のその他のデータ保持・利用条件を変更する設定ではありません。[OpenAIの状態保存設定](https://developers.openai.com/api/docs/guides/migrate-to-responses)

## 配布ZIPを作る

```sh
npm --prefix modules/KobunOcrTranslation ci
npm --prefix modules/KobunOcrTranslation run build
python3 modules/KobunOcrTranslation/worker/package.py --output /tmp/kobun-ocr-releases
```

ZIP、ZIPのSHA-256、含まれる全ファイルのハッシュ一覧を出力します。許可したファイルだけを梱包し、モデル・node_modules・参照リポジトリ・入力画像・実行ログ・トークン・設置環境固有の内部資料は入りません。構築済みアセットを含むため、利用者側のNode.js/npmは不要です。ZIPを `modules/` に展開して通常のモジュール操作で有効化できますが、OCR/翻訳の実行には別途workerとモデルが必要です。
