# 運用業者への依頼文（Teams投稿用）

alex4のOmeka Sに古典籍のOCR・現代語訳機能を追加したく、以下の作業の承認・実施をお願いします（RHEL 9.7、Omeka：`/opt/omeka-s`、PHPユーザ：`limewww`）。

- モジュールは https://github.com/wakitosh/KobunOcrTranslation から取得します。Node.jsは不要です。
- 専用のログイン不可ユーザ `kobunocr` を作成し、実行環境・データを `/opt/kobun-ocr-translation` に置きます。既存の `library` グループには追加しません。
- Python 3.11・pip・Git・CMake・libcurl-devel等を導入します。Python依存は専用環境へ入れ、システムPythonは変更しません。GitHub・PyPI・Hugging FaceへのHTTPS取得が必要です。
- OCRモデル約83MB、9Bモデル約6.17GBを取得します。初回は環境構築分を含め20GiB以上の空きを目安とします。
- 常駐登録は `kobun-ocr-control.service` の1つです。OCR・LLMはOmeka画面から操作し、127.0.0.1の8765～8767番だけを使います。外部ポートの開放は不要です。
- 構築・運用時の初期上限はCPU2コア相当・メモリ合計16GiBです。導入後に性能・負荷を確認します。

計画表示用インストーラを用意しており、承認後に `--apply` 付きで1回実行すればバックエンド構築・サービス登録まで進みます。既存Webサービスの再起動・DB変更・SELinux変更は行いません。導入は未実施です。詳細：`INSTALL_RHEL9.md`。
