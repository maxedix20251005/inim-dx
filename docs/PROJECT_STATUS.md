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
- `top_hero_items` の基本入力バリデーション
- `top_hero_items.cta_url` のURL形式厳密化

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
#### 1. ロール表示が未取得の可能性がある
- ダッシュボード上で `権限: 未取得`、プロフィールカードで `unknown` と表示されたケースがありました。
- 認証後の `user_profiles` または `user_role_assignments` 連携の再確認が必要です。
- `app/users/me.html` で `user_role_assignments` の取得結果も確認できるようにし、ロール未取得時の切り分けをしやすくしました。
- 2026-03-21 の最新確認では、`user_profiles` 取得で `400` が発生しました。
- 管理画面側では、`user_profiles` をまず `select("*")` で取得し、存在しない列名指定による `400` を避ける方針へ修正しました。
- `account_status` が実環境で返ってこない場合、UI 上は `未取得` 表示のままとします。
- あわせて、管理画面 HTML の `admin-app.css` / `site-config.js` / `admin-app.js` にバージョン付き参照を付与し、GitHub Pages キャッシュで古い JS が残る状況を避けるようにしました。
- `cta_url` 厳密化後も旧JSキャッシュが残るケースに備え、管理画面 HTML のバージョン文字列を `20260321c` へ更新しました。
- サイドバーの `セッション確認` ボタンは、背景だけでなく文字色も明色へ変更しました。
- 2026-03-21 の最新確認では、`user_profiles` とロール表示は正常化し、残る Console エラーは `/favicon.ico` の `404` のみでした。このため、既存ロゴ画像を `rel="icon"` で明示する対応を入れました。

#### 2. パスワード再設定フロー
- `forgot-password` 送信時の `redirectTo` を `app/password/reset.html` に明示し、`js/site-config.js` にも `adminResetRedirectUrl` を追加しました。
- `app/password/forgot.html` 上で、現在のページURL、設定値、実際の `redirectTo` を確認できます。
- 2026-03-21 の最新確認では、再設定メールの `redirect_to` は `https://maxedix20251005.github.io/inim-dx/app/password/reset.html` となり、パスワード再設定は成功しました。

### 次に優先して進める作業
1. `PROJECT_STATUS.md` を起点に運用継続する
2. `AI_CONTEXT_PROMPT.md` を復元用コンテキストとして都度更新運用する
3. 再ログイン後にロール表示を確認する
4. `app/users/me.html` で `user_role_assignments` の取得内容を確認する
5. `user_profiles` の取得結果と Console の `400` が解消したか確認する
6. `top_hero_items` の入力バリデーションを確認する
7. その後に UI 改善へ進む

### 再開時の確認手順
1. GitHub Pages 上の `app/login.html` からログインする
2. `app/dashboard.html` で権限表示を確認する
3. `app/users/me.html` を開く
4. `取得済み user_profiles` と `取得済み user_role_assignments` を確認する
5. Console エラー有無を確認する

### 確認時の報告フォーマット
- `再ログイン:` 成功 / 失敗
- `権限表示:` 正常 / 未取得のまま
- `user_role_assignments:` 取得あり / 取得なし
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
