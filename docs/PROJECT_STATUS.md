## PROJECT STATUS: inim-dx

### このドキュメントの目的
- このファイルは、`inim-dx` プロジェクトの現在地を第三者でも短時間で把握できるように整理する常設ステータス資料です。
- 管理画面に追加・更新を行った場合は、本ファイルを必ず同じ作業内で更新します。
- 更新後は、日本語の文字化けがないかを必ず確認します。

### 現在の主対象
- 現在の実装対象は、`inim-dx` の管理画面です。
- 画面仕様の正本:
  - `prompts/cross-project-handover-admin-implementation.md`
  - `references/design/11-admin-mockup-standalone.html`
- DB 設計の正本:
  - `C:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\docs\08-db-design.html`

### 実装方針
- 公開サイトの既存実装へ影響を出さないことを最優先に進めています。
- そのため、公開サイト用の `js/site-shell.js` と `css/style.css` は変更しない方針です。
- 管理画面は、専用の `js/admin-app.js` と `css/admin-app.css` に分離して実装しています。
- `app/` 配下の HTML は、管理画面専用アセットを参照するための差し替えに限定しています。

### ここまでの変更範囲
#### 新規追加
- `css/admin-app.css`
- `js/admin-app.js`
- `app/pages/journey.html`
- `docs/AI_CONTEXT_PROMPT.md`
- `docs/admin-implementation-status.md`
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

### 現在までに実装済みの内容
#### 認証・アカウント
- Supabase セッション確認
- 管理画面ログイン
- ログアウト
- パスワード再設定メール送信
- パスワード更新

#### ユーザー情報取得
- `user_profiles.auth_user_id` によるプロフィール取得
- `user_role_assignments.user_profile_id` と `roles.role_code` によるロール取得

#### 管理画面UI
- 管理画面専用シェル
- ダッシュボード
- トップ編集
- 導線設定
- 公開管理
- アカウント設定

#### データ連携
- `top_hero_items` の一覧・編集
- `journey_steps` の一覧・編集
- `content_assets` の取得
- `top_hero_items.asset_id` の選択式入力
- `reservations` と `inquiries` の件数取得

### DB 設計に合わせて確定済みの主な編集項目
#### `top_hero_items`
- `title`
- `lead_text`
- `cta_label`
- `cta_url`
- `asset_id`
- `display_order`
- `is_active`

#### `journey_steps`
- `step_no`
- `step_name`
- `link_url`
- `helper_text`
- `is_visible`

### 現在の既知課題
#### 1. パスワード再設定リンクの遷移先が誤っている
- 実際の再設定メールでは、`redirect_to=https://maxedix20251005.github.io/inim-dx/` になっていました。
- 本来必要なのは、`https://maxedix20251005.github.io/inim-dx/app/password/reset.html` です。
- このため、メールリンクから `reset.html` へ戻れず、再設定が完了しません。
- 管理画面側コードでは、`forgot-password` 送信時の `redirectTo` を `reset.html` へ明示する修正を入れました。
- `js/site-config.js` にも `adminResetRedirectUrl` を追加し、設定ファイル上でも同じ reset URL を参照するようにしました。
- 次回は、再送メールの `redirect_to` 実値と Supabase の Email Template を再確認します。

#### 2. 再設定メールのレート制限に到達した
- 確認済みエラー: `email rate limit exceeded`
- 現時点では、時間を置いてから再送確認が必要です。

#### 3. ロール表示が未取得の可能性がある
- ダッシュボード上で `権限: 未取得`、プロフィールカードで `unknown` と表示されたケースがありました。
- 認証後の `user_profiles` または `user_role_assignments` 連携の再確認が必要です。

### 次に優先して進める作業
1. `PROJECT_STATUS.md` を起点に運用継続する
2. `AI_CONTEXT_PROMPT.md` を復元用コンテキストとして都度更新運用する
3. パスワード再設定フローの `redirectTo` を実動確認する
4. 時間を置いて `forgot.html` から再設定メールを再送し、`redirect_to` を確認する
5. リセット完了後に再ログインし、ロール表示を確認する
6. その後に入力バリデーションと UI 改善へ進む

### 再開時の確認手順
1. GitHub Pages 上で以下を直接開けるか確認する
   - `https://maxedix20251005.github.io/inim-dx/app/login.html`
   - `https://maxedix20251005.github.io/inim-dx/app/password/forgot.html`
   - `https://maxedix20251005.github.io/inim-dx/app/password/reset.html`
2. `forgot.html` から再設定メールを1回だけ送る
3. メールを開く前に、リンク内の `redirect_to=` の値を確認する
4. 遷移先が `reset.html` なら、パスワード更新を実行する
5. 再ログイン後、権限表示と Console エラー有無を確認する

### 確認時の報告フォーマット
- `再送:` 成功 / rate limit 継続
- `メールリンクの redirect_to:` 実際の値
- `遷移先:` reset.html / トップ / その他
- `パスワード更新:` 成功 / 失敗
- `再ログイン:` 成功 / 失敗
- `権限表示:` 正常 / 未取得のまま
- `Console:` エラーなし / エラーあり
- `補足:` 必要に応じて詳細

### 参照ドキュメント
- `docs/admin-implementation-status.md`
- `docs/WIP.md`
- `docs/AI_CONTEXT_PROMPT.md`

### 確認済み事項
- 公開サイト用の `js/site-shell.js` は未変更です。
- 公開サイト用の `css/style.css` は未変更です。
- 本ファイル更新後、日本語の文字化け確認を行う前提です。
