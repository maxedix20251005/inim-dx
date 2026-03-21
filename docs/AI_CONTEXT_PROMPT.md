## AI CONTEXT PROMPT: inim-dx 完全復元用

このファイルは、作業途中からでも `inim-dx` の現状を正確に復元し、同じ前提で開発を再開するための AI 向けコンテキストです。新しい AI に渡す場合は、このファイルをそのまま読ませたうえで、必要に応じて `PROJECT_STATUS.md` と `WIP.md` を続けて参照させてください。

### あなたの役割
- あなたは `inim-dx` のフルスタックエンジニアです。
- 既存の公開サイトへ影響を出さないことを最優先に、管理画面の実装を継続してください。
- 不明点は実装前に確認してください。
- 出力は構造化してください。
- 変更は差分で示してください。
- 初心者でも理解できる説明を付けてください。
- 日本語の文字化けがないか、変更後に必ず確認してください。
- 変更のたびに、少なくとも `docs/PROJECT_STATUS.md` と `docs/AI_CONTEXT_PROMPT.md` を更新してください。
- 管理画面に関する実装変更があれば、`docs/admin-implementation-status.md` と必要に応じて `docs/WIP.md` も更新してください。

### プロジェクト概要
- プロジェクト名: `inim-dx`
- 現在の主対象: 管理画面実装
- 目的:
  - `inim-dx` の管理者向け画面を実装する
  - 公開サイトの既存 UI / JS / CSS へ影響を出さずに進める
  - まずは「トップ編集」と「導線設定」を優先実装する

### 正本ドキュメント
- プロジェクト全体のコンセプトを理解・確認・振り返りする場合は、常に `docs/01-proposal.html` を参照し、現在の実装や判断内容に矛盾がないか確認してください。
- 画面仕様の正本:
  - `prompts/cross-project-handover-admin-implementation.md`
  - `references/design/11-admin-mockup-standalone.html`
- 補助デザイン:
  - `references/design/05-wireframe.html`
  - `references/design/06-design-guide.html`
- DB 設計の正本:
  - `C:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\docs\08-db-design.html`
- 進捗管理:
  - `docs/PROJECT_STATUS.md`
  - `docs/admin-implementation-status.md`
  - `docs/WIP.md`

### 技術構成
- フロント:
  - 静的 HTML
  - Vanilla JavaScript
  - CSS
- 認証 / DB:
  - Supabase
- ホスティング:
  - GitHub Pages

### 実装方針
- 公開サイト用の既存ファイルは原則変更しない
  - `js/site-shell.js`
  - `css/style.css`
- 管理画面は専用ファイルへ分離して実装する
  - `js/admin-app.js`
  - `css/admin-app.css`
- `app/` 配下 HTML は、管理画面専用アセットを参照する差し替えに限定する
- ロールバックしやすいように、変更範囲を局所化する

### ここまでの主な変更範囲
#### 新規追加
- `css/admin-app.css`
- `js/admin-app.js`
- `app/pages/journey.html`
- `docs/admin-implementation-status.md`
- `docs/PROJECT_STATUS.md`
- `docs/WIP.md`

#### 参照先変更
- `app/login.html`
- `app/dashboard.html`
- `app/publish.html`
- `app/pages/home.html`
- `app/pages/workshop.html`
- `app/users/me.html`
- `app/password/forgot.html`
- `app/password/reset.html`

### 現在実装済みの内容
#### 認証
- Supabase セッション確認
- 管理画面ログイン
- ログアウト
- パスワード再設定メール送信
- パスワード更新

#### ユーザー / ロール取得
- `user_profiles.auth_user_id` によるプロフィール取得
- `user_role_assignments.user_profile_id` と `roles.role_code` によるロール取得

#### 管理画面
- 管理画面専用シェル
- ダッシュボード
- トップ編集
- 導線設定
- 公開管理
- アカウント設定

#### データ連携
- `content_assets` 取得
- `top_hero_items` 一覧・編集
- `journey_steps` 一覧・編集
- `reservations` 件数取得
- `inquiries` 件数取得

### DB 設計に基づく重要テーブル
#### `user_profiles`
- 主な利用カラム:
  - `id`
  - `auth_user_id`
  - `display_name`
  - `account_status`

#### `roles`
- 主な利用カラム:
  - `role_code`
  - `role_name`

#### `user_role_assignments`
- 主な利用カラム:
  - `user_profile_id`
  - `role_id`

#### `content_assets`
- 主な利用カラム:
  - `id`
  - `bucket_name`
  - `file_path`
  - `file_type`
  - `mime_type`
  - `alt_text`

#### `top_hero_items`
- 主な編集カラム:
  - `title`
  - `lead_text`
  - `cta_label`
  - `cta_url`
  - `asset_id`
  - `display_order`
  - `is_active`

#### `journey_steps`
- 主な編集カラム:
  - `step_no`
  - `step_name`
  - `link_url`
  - `helper_text`
  - `is_visible`

### 重要な現状認識
#### 公開側との分離
- 公開サイト用の `js/site-shell.js` と `css/style.css` は未変更です。
- 管理画面の実装は `js/admin-app.js` と `css/admin-app.css` に分離されています。

#### ログイン画面の自動遷移
- `app/login.html` は、既存セッションがある場合に `app/dashboard.html` へ自動遷移します。
- これは現状の実装仕様です。

#### パスワード再設定の問題
- 過去に、再設定メールの `redirect_to` がトップページになっていました。
- そのため、メールリンクから `app/password/reset.html` に戻れず、リセット導線が壊れていました。
- `js/admin-app.js` では、`forgot-password` 送信時の `redirectTo` を `app/password/reset.html` 優先にする修正を入れています。
- ただし、実メールで正しく反映されたかは、再送確認がまだ必要です。

#### レート制限
- Supabase の再設定メール送信で `email rate limit exceeded` が発生した履歴があります。
- 短時間の連続送信は避け、確認は1回ずつ行ってください。

#### ロール表示
- ダッシュボードで `権限: 未取得`、プロフィールカードで `unknown` と表示されたケースがあります。
- 次回確認時は、再ログイン後にロール取得結果も必ず確認してください。
- 2026-03-21 の最新確認では、`user_profiles` 取得クエリが `400` で失敗したため、プロフィール取得は `select("*")` を優先する実環境追従型に更新されています。
- 管理画面 HTML の CSS / JS 参照にはバージョン文字列が付いており、GitHub Pages で古いスクリプトが残る前提も確認対象です。
- さらに、既存ロゴ画像を `rel="icon"` で明示し、`/favicon.ico` の `404` を避ける対応を入れています。

### 直近の再開手順
1. `docs/PROJECT_STATUS.md` を確認する
2. `docs/WIP.md` を確認する
3. `docs/admin-implementation-status.md` を確認する
4. `js/admin-app.js` の現在の `forgot-password` 実装を確認する
5. GitHub Pages 上で以下 URL を直接開けるか確認する
   - `https://maxedix20251005.github.io/inim-dx/app/login.html`
   - `https://maxedix20251005.github.io/inim-dx/app/password/forgot.html`
   - `https://maxedix20251005.github.io/inim-dx/app/password/reset.html`
6. レート制限解除後、`forgot.html` から再設定メールを1回だけ送る
7. メールを開く前に `redirect_to=` を確認する
8. `reset.html` に遷移したらパスワード更新を試す
9. 再ログインしてロール表示を確認する
10. `app/users/me.html` で `user_profiles` と `user_role_assignments` の取得結果を確認する

### 次に優先する実装候補
1. パスワード再設定フローの実動確認完了
2. ロール取得不整合の切り分け
3. `top_hero_items` / `journey_steps` の入力バリデーション追加
4. `content_assets` の検索・絞り込み UI 追加
5. `reservations` / `inquiries` の詳細管理画面着手

### 変更時の必須チェック
- 変更が公開側へ波及していないか確認する
- 変更ファイルが管理画面側に閉じているか確認する
- 日本語の文字化けがないか再読込で確認する
- 変更内容を `docs/PROJECT_STATUS.md` に反映する
- この `docs/AI_CONTEXT_PROMPT.md` にも反映する
- 必要に応じて `docs/admin-implementation-status.md` と `docs/WIP.md` を更新する

### ユーザーへの報告ルール
- まず結論を短く伝える
- その後、変更点を構造化して示す
- 差分要約を入れる
- 初心者でも理解できる言葉で補足する
- ユーザー確認が必要な場合は、確認手順と報告フォーマットをセットで提示する

### このファイルの更新ルール
- このファイルは使い回しの雛形ではなく、現在の実プロジェクト状態を保持する運用ファイルです。
- 今後、実装・調査・方針変更・既知課題の変化があったら、必ず更新してください。
- 次回の AI がこのファイルだけ読んでも、途中から高い精度で再開できる状態を維持してください。
