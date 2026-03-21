## inim-dx 管理画面 実装整理メモ

### この資料の目的
- この資料は、`inim-dx` の管理画面実装について、第三者が現状を短時間で把握できるように整理した作業メモです。
- 画面仕様の正本は `prompts/cross-project-handover-admin-implementation.md` と `references/design/11-admin-mockup-standalone.html`、DB 設計の正本は `C:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\docs\08-db-design.html` です。
- 今後、管理画面に追加・更新を行った場合は、この資料も必ず更新します。

### 今回の実装方針
- 公開サイト側の既存ページに影響を出さないことを最優先にしました。
- そのため、公開サイトで使っている `js/site-shell.js` と `css/style.css` は変更していません。
- 管理画面専用の描画と認証処理は、新規の `js/admin-app.js` と `css/admin-app.css` に分離しています。
- 既存の `app/` 配下HTMLは、参照先を管理画面専用アセットに差し替えるだけに留めています。

### ここまでの変更範囲
#### 新規追加
- `css/admin-app.css`
- `js/admin-app.js`
- `app/pages/journey.html`

#### 参照先のみ変更
- `app/login.html`
- `app/dashboard.html`
- `app/publish.html`
- `app/pages/home.html`
- `app/pages/workshop.html`
- `app/users/me.html`
- `app/password/forgot.html`
- `app/password/reset.html`

### 現在実装されている内容
#### 認証・セッション
- Supabase セッション確認
- 管理画面ログイン
- パスワード再設定メール送信
- パスワード更新
- ログアウト
- `user_profiles.auth_user_id` によるプロフィール取得
- `user_role_assignments.user_profile_id` と `roles.role_code` によるロール取得

#### 管理画面UI
- 管理画面専用サイドバー
- ダッシュボード
- トップ編集
- 導線設定
- 公開管理
- アカウント設定

#### データ取得
- `user_profiles`
- `user_role_assignments`
- `roles`
- `content_assets`
- `top_hero_items`
- `journey_steps`
- `reservations`
- `inquiries`

#### DB設計書へ合わせて確定した編集項目
- `top_hero_items`
  - `title`
  - `lead_text`
  - `cta_label`
  - `cta_url`
  - `asset_id`
  - `display_order`
  - `is_active`
- `journey_steps`
  - `step_no`
  - `step_name`
  - `link_url`
  - `helper_text`
  - `is_visible`

### 現時点の注意点
- 直近の実装は、まず安全に画面を分離することを優先して入れています。
- DB 設計書 `08-db-design.html` に合わせて、プロフィール取得・ロール取得・トップ編集・導線設定の主要カラムは確定済みです。
- `top_hero_items.asset_id` は `content_assets` の画像アセット候補から選択できる状態に更新済みです。
- パスワード再設定メールの `redirectTo` は、管理画面の `app/password/reset.html` を優先するよう `js/admin-app.js` 側で明示しました。
- `js/site-config.js` にも `adminResetRedirectUrl` を追加し、設定レベルでも管理画面用 reset URL を明示しました。
- `app/password/forgot.html` では、現在のページURL、設定値、実際の `redirectTo` を表示し、切り分けしやすくしました。
- 2026-03-21 時点の最新確認では、受信メール内の `redirect_to` は `app/password/reset.html` となり、パスワード再設定は成功しました。
- 次の切り分け用に、`app/users/me.html` で `user_role_assignments` の取得結果も確認できるようにしました。
- `user_profiles` 取得で `400` が発生するケースに備え、`js/admin-app.js` のプロフィール取得は `select("*")` を優先する実環境追従型へ変更しました。
- 管理画面 HTML の CSS / JS 参照にはバージョン文字列を付け、GitHub Pages のキャッシュ影響を受けにくくしました。
- 既存ロゴ画像を `rel="icon"` で明示し、`/favicon.ico` の `404` を避ける対応を入れました。
- `top_hero_items` では、`title`、`lead_text`、`cta_label`、`cta_url`、`display_order` の基本入力バリデーションを追加しました。
- `cta_url` は、`/` 始まりか `http://` / `https://` 始まりのみを許可するよう厳密化しました。
- `top_hero_items` では、`abc` のような不正な `cta_url` が保存されないことを確認しました。
- `journey_steps` では、`step_no`、`step_name`、`link_url`、`helper_text` の基本入力バリデーションを追加しました。
- `journey_steps` では、保存処理側でも入力バリデーションを通すようにし、空欄の `0` 化や不正 URL の保存を防ぐようにしました。
- 管理画面 HTML のバージョン文字列は `20260321e` に更新し、最新 JS / CSS を読み込みやすくしました。
- サイドバーの `セッション確認` ボタンは、視認性改善のため背景をグレー系、文字色を明色へ変更しました。
- `セッション確認` ボタンの視認性改善が反映されていることを確認しました。
- サイドバー下部に `Admin build` 表示を追加し、キャッシュ反映状況を画面上で確認できるようにしました。
- 一方で、入力値バリデーション強化や、保存後のUI改善はまだ残っています。

### 既知の未完了事項
- `journey_steps` の入力バリデーションを実画面で確認する
- `content_assets` の検索・絞り込み UI は未実装
- `reservations` / `inquiries` の詳細画面は未着手
- 保存後の UI 改善

### ロールバック方針
- 今回の変更は、`app/` 配下のHTML参照先差し替えと、管理画面専用ファイルの追加に限定しています。
- ロールバックする場合は、以下を戻せば元の状態に戻せます。
  - `app/` 配下HTMLの `admin-app.css` / `admin-app.js` 参照を元に戻す
  - `app/pages/journey.html` を削除する
  - `css/admin-app.css` を削除する
  - `js/admin-app.js` を削除する

### 確認結果
- 公開サイト用の `js/site-shell.js` は未変更
- 公開サイト用の `css/style.css` は未変更
- 更新後、日本語の文字化けが起きていないことをファイル再読込で確認済み

### 今後の運用ルール
- 管理画面に追加・更新を行った場合は、この資料を同じ作業内で必ず更新する
- 更新後は、日本語の文字化けがないかを必ず確認する
- DB や画面仕様の正本が更新された場合は、この資料の参照元も合わせて更新する
