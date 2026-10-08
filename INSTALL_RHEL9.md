# RHEL 9.7への一括導入

RHEL 9.7上でOCRとローカルLLMをCPU実行するための手順です。標準モデルはQwen3.5-9Bで、4B、35B-A3BまたはOCRのみの構成も選択できます。サーバ管理者が設置環境の運用規程に従って実施してください。インストーラは**`--apply`がなければ計画表示だけ**です。モデル、実行環境、秘密ファイルはGitリポジトリに含めません。

## 導入前に確認する項目

- Omeka Sの配置先と、その `modules/` ディレクトリへの書込権限
- PHP-FPM/httpdでPHPを実行するUnixユーザと、IIIF画像・マニフェストのホスト名
- RHELのパッケージリポジトリ、Python 3.9以上、rootまたはsudoによる導入作業の実行権限
- バックエンド配置先の空き容量（9Bの初回構築は20GiB以上が目安）、CPU・メモリの使用可能量
- TCP/8765～8767番ポートと既存サービスの利用状況、SELinuxの設定

以下ではOmekaを `/opt/omeka-s`、PHP実行ユーザを `apache`、IIIF画像ホストを `iiif.example.org`、マニフェストのホストを `archive.example.org` とした例を示します。これらは実際の配置先・ユーザ・ホストへ置き換えてください。Omekaの配置先が異なる場合はインストーラに `--omeka-root /path/to/omeka-s` を指定します。処理負荷・必要メモリ・訳質は設置先で検証してください。

## 1. GitHubからモジュールを取得

以下のcloneは、既存のmodulesディレクトリに書ける通常ユーザで実行します。既存ディレクトリがある場合は上書きせず確認してください。

```sh
sudo dnf install -y git
git clone https://github.com/wakitosh/KobunOcrTranslation.git /opt/omeka-s/modules/KobunOcrTranslation
```

ソース・構築済みJS/CSS・worker・ライセンスが揃います。サーバ側でnpmを実行する必要はありません。

## 2. 計画表示後、承認された作業を一括実行

```sh
python3 /opt/omeka-s/modules/KobunOcrTranslation/worker/install_rhel9.py \
  --php-user apache --image-host iiif.example.org --resource-host archive.example.org
```

表示内容を確認してから、同じコマンドに`sudo`と`--apply`を追加します。

```sh
sudo python3 /opt/omeka-s/modules/KobunOcrTranslation/worker/install_rhel9.py \
  --php-user apache --image-host iiif.example.org --resource-host archive.example.org --apply
```

標準Python 3.9でインストーラを動かし、実行用Python 3.11は別途導入します。RHELのパッケージリポジトリが利用可能で、GitHub/raw.githubusercontent.com・PyPI/files.pythonhosted.org・Hugging Faceとそのダウンロード先へHTTPS通信できる必要があります。外向き通信が制限されている場合は運用業者と取得方法を調整してください。プロキシ環境では一時構築サービスにも必要な設定を渡す運用が必要です。

スクリプトが行う作業：

1. RHEL 9、アカウント、空き容量、ポート、既存サービスの状態を確認。使用中のサービス・ポートがあれば変更前に拒否
2. 必要RPMを導入し、専用のnologinユーザ`kobunocr`を作成。適合する既存ユーザは再利用
3. workerコードをroot所有の別領域へコピー。専用ユーザへOmekaの管理権限を追加せず、Omekaの権限を変更しない
4. 専用ユーザによる一時systemdサービスでPython仮想環境を構築し、固定版llama.cppを2並列でビルド。CPU・メモリ制限は構築時にも適用
5. Python 3.11・SQLite・一時保存用コードの読込を確認してから、固定版のOCR・選択したLLMモデルを取得し、容量・SHA-256を検証。既存データとトークンを保持し、既存設定はバックアップ
6. PHPユーザだけにACLで秘密ファイルの読取権限を付与し、常駐する運用サービスを登録・起動
7. 認証付き状態取得を確認。OCR・LLMはまだ起動しない

パッケージ導入やビルドの途中で失敗した場合、成功した作業は残ります。原因を解消して再実行できます。データ削除やサービスの自動停止・自動巻戻しは行いません。

## 配置と資源の制限

| パス | 内容・権限 |
|---|---|
| `/opt/omeka-s/modules/KobunOcrTranslation` | GitHubから取得するモジュール本体 |
| `/opt/kobun-ocr-translation/backend/worker` | root所有の実行用ソースのコピー |
| `/opt/kobun-ocr-translation/runtime` | kobunocrのみが使う仮想環境、llama.cpp、モデル、設定、ログ、作業データ |
| `/opt/kobun-ocr-translation/php` | root所有の接続設定とトークン。指定したPHP実行ユーザだけにACLで読取を許可 |
| `/etc/systemd/system/kobun-ocr-control.service` | 常駐登録する唯一のユニット |

9B構成の初期上限は`CPUQuota=200%`（1CPUを100%として2CPU相当）、`MemoryMax=16G`、swap使用なし、OCR/LLMのスレッド数2です。上限は運用サービスと、その配下のworker・LLMの合計に適用します。16Gは**負荷を抑えるための上限で、実測済みの必要メモリではありません**。上限に達すると当該処理が終了する場合があります。CPU上限を抑える分、訳の生成時間は長くなる可能性があります。[RHEL向けsystemdの資源制限](https://redhat-plumbers.github.io/systemd-rhel9/systemd.resource-control.html)

変更する場合は初回実行時に`--threads 4 --cpu-quota 400 --memory-max 20G`等を指定できます。4Bは`--model qwen3-4b-q4km`、OCRのみは`--model none`です。OCRのみ構成ではllama.cpp・LLMモデルを取得しません。

35B-A3Bは`--model qwen35-35b-a3b-q4km`を指定します。モデルだけで22.29GBあり、初回は40GiB以上の空き容量を確認します。この構成の初期メモリ上限は48Gで、CPU上限・スレッド数は9Bと同じです。共有サーバでこのメモリ上限を許容できるか確認し、実行前に設置先の負荷と必要メモリを検証してください。

### モデルだけをNFSに置く場合

`--models-nfs`を追加すると、`/opt/kobun-ocr-translation/runtime/models`を**NFSのマウントポイントとして必須**にします。コード、Python環境、llama.cpp、設定、認証トークン、作業データ、SQLite索引、ログはローカルに残します。カスタム`--prefix`では、その配下の`runtime/models`を使います。

導入業者・サーバ管理者が先に準備する内容：

1. 専用のnologinユーザ`kobunocr`を作成し、NAS側のアクセス権とUID/GIDを合わせる。NFS構成では、インストーラ実行前にこのユーザが必要です。
2. `runtime/models`へ専用のNFS領域をマウントし、再起動後もsystemdがマウントできるよう登録する。**ディレクトリを作るだけでは未完了**です。
3. 専用ユーザが親ディレクトリを通過でき、モデル領域を読み書きできるようにする。`root_squash`を維持したまま、NAS側で権限を設定してください。インストーラはNFSの所有者・ACL・export・マウント設定を変更しません。

マウントポイントのために作成したroot所有の`runtime`は、その直下に`models`だけがある場合、インストーラがローカルの親ディレクトリを専用ユーザ所有へ設定できます。ほかのデータがある場合は、既存所有者の確認を省略しません。

承認・マウント後に、35B-A3B構成の計画を確認する例：

```sh
python3 /opt/omeka-s/modules/KobunOcrTranslation/worker/install_rhel9.py \
  --php-user apache --image-host iiif.example.org --resource-host archive.example.org \
  --models-nfs --model qwen35-35b-a3b-q4km
```

実行時は同じコマンドに`sudo`と`--apply`を追加します。NFS未マウント、通常のディレクトリ、symlink、読取専用マウント、専用ユーザのアクセス権不足は導入前に拒否します。更新時にも`--models-nfs`を指定してください。

空き容量は別々に確認します。LLMありの初回構築はローカル10GiB以上、NFSは未取得モデルの合計容量＋1GiB以上を必要とします（35B-A3BとOCRの新規取得なら約22GiB以上）。これは導入時の最小条件であり、作業データ・バックアップ・ほかのサービスの増加分は別途確保してください。取得済みファイルはサイズだけで必要な追加容量を計算し、実際の取得・起動時には従来どおりSHA-256を検証します。

常駐サービスと一時構築サービスにマウント依存関係を設定し、起動時にも実際のNFSマウントを確認します。設定にNFS配置を記録するため、モデル取得コマンドを直接実行しても、未マウントのローカルディレクトリへのダウンロードを拒否します。NFSの読込・ハッシュ検証の時間と、初回・二回目以降の翻訳時間は設置環境で比較してください。特に35Bでは起動時に約22GBをハッシュ検証するため、低速な接続では管理画面の通信やサービス操作のタイムアウトに達する可能性があります。ネットワーク断時の応答時間はNFSの設定にも依存します。

SQLiteをNFSに置く構成は一括インストーラでは対象外です。[SQLite公式のネットワーク保存に関する説明](https://sqlite.org/useovernet.html)、[RHEL向けsystemdのマウント依存関係](https://redhat-plumbers.github.io/systemd-rhel9/systemd.unit.html#RequiresMountsFor=)

実行領域の親は`--prefix /opt/kobun-backend`で変更できます（パスは英数字等で指定）。その場合は、生成された`php/backend.json`に従ってOmekaの`config/local.config.php`へ`kobun_ocr`を設定してください。標準配置ではモジュールが接続設定を自動読込するため、その編集は不要です。既存の`local.config.php`に`kobun_ocr`がある場合はそちらが優先されます。トークンの値は設定ファイルへ直接記載せず、秘密ファイルのパスを指定してください。

## 3. Omeka側で有効化

全体管理者がモジュールを有効化し、設定の「実行サービス」からworkerとLLMを起動します。OCRが準備済みになり、LLMのモデルが9Bであることを確認します。テーマに閲覧支援ブロックを割り当て、公開現代語訳と訪問者のLLM利用範囲を設定してください。OCRのみの場合は訪問者のローカルLLMを許可しない設定にします。

「閲覧支援の一時保存」で、翻刻の共有方法・期限、現代語訳の共有方法、処理用データの保存時間・件数・容量上限を確認します。初期値は翻刻24時間の共有・現代語訳の共有なし・処理用データ60分・1000件・1024 MiBです。workerが `runtime/data/temporary/` とSQLite索引を自動作成し、期限切れデータを毎分削除します。SQLiteはPython標準ライブラリを使い、別のDBサービス・SQLiteのコマンド・cron登録は不要です。図書館の編集・確認・公開用データと版履歴は、一時保存の削除対象に含めません。

管理者による少数ページの試験から始め、処理時間・メモリ・既存公開サービスへの影響を確認してください。モデルサイズやサーバの仕様だけで、訳質や処理時間は保証されません。

取得済みモデルの切替は同じ設定画面で、LLMサーバの停止 → モデル選択 → LLMサーバの起動の順に行います。workerの設定更新・復帰は自動で行い、処理中の切替は拒否します。新しいモデルの初回取得とサービスの資源上限の変更は、サーバ管理者が行います。画面でモデルを変えてもsystemdのメモリ・CPU上限は変わりません。

## 運用・更新・停止

```sh
sudo systemctl status kobun-ocr-control.service
sudo journalctl -u kobun-ocr-control.service -n 100
```

モジュール更新時は、処理完了後にブラウザでworkerとLLMを停止し、`sudo systemctl stop kobun-ocr-control.service`を実行します。Git checkoutで`git pull --ff-only`し、インストーラを設置時と同じ引数で再実行すると実行用コピーも更新します。画面でモデルを切り替えた場合は、`--model`に現在選択しているモデルIDを指定してください。省略すると標準の9Bを選択します。CPU・メモリ上限やホストの指定も設置環境に合わせます。常駐サービスの再起動・停止は配下のworker・LLMも停止させるため、再開時はブラウザから起動します。

### 0.11系への更新

Omekaのモジュールだけを更新せず、上記のインストーラを`--apply`付きで再実行して、`/opt/kobun-ocr-translation/backend/worker`の実行用コピーも更新してください。新しい一時保存用Pythonファイルも自動でコピーします。既存の検証済みモデルは再利用し、SQLite索引の手動作成・追加の常駐サービス登録は不要です。Omeka管理画面でモジュールの更新を適用し、workerを起動します。

**このworker起動時に、期限情報のない旧訪問者キャッシュを削除します。** 編集・確認・公開用の作業と版履歴は保持します。旧workerに接続したままでは新しい共有方針を保証できないため、公開画面の処理は停止します。一時保存領域をバックアップから除く場合は`runtime/data/temporary/`と`runtime/data/cache-index.sqlite3`を除外対象とし、公式作業・設定・トークンは引き続き保存してください。

利用を止める場合は同じ手順で処理を止め、`sudo systemctl disable --now kobun-ocr-control.service`を実行します。Omekaでモジュールを無効化します。保存データ・モデル・ユーザは削除しません。バックアップ対象は非公開の`runtime`（特に`data`、`config.json`、トークン）とします。

SELinuxが有効な場合は、必要なポリシーをサーバ管理者が判断してください。`--configure-selinux`を明示するとPHP用ディレクトリのラベルと`httpd_can_network_connect`を設定します。このbooleanはhttpdドメイン全体に作用するため、設置環境への影響を確認してから指定してください。[Red HatのWebサーバー・SELinux手順](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/deploying_web_servers_and_reverse_proxies/setting-up-and-configuring-nginx_deploying-web-servers-and-reverse-proxies)
