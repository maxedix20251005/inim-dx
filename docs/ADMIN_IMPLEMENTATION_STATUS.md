# ADMIN IMPLEMENTATION STATUS / inim-dx 管理画面 実装整理メモ

## 1. この資料の目的 / Purpose
- この資料は、`inim-dx` の管理画面実装について、第三者が現状を短時間で把握できるように整理した作業メモです。
- 画面仕様の正本は `docs/CROSS_PROJECT_HANDOVER_ADMIN_IMPLEMENTATION.md` と `references/design/11-admin-mockup-standalone.html`、DB 設計の正本は `C:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\docs\08-db-design.html` です。
- 不具合と再発防止履歴の正本は `docs/ISSUE_LIST.md` です。
- 今後、管理画面に追加・更新を行った場合は、この資料も必ず更新します。

## 2. 今回の実装方針 / Implementation Policy
- 公開サイト側の既存ページに影響を出さないことを最優先にしました。
- そのため、公開サイトで使っている `js/site-shell.js` と `css/style.css` は変更していません。
- 管理画面専用の描画と認証処理は、新規の `js/admin-app.js` と `css/admin-app.css` に分離しています。
- 既存の `app/` 配下HTMLは、参照先を管理画面専用アセットに差し替えるだけに留めています。
- Workshop の予約と問い合わせに関する呼称は、今後 `bookings / enquiries` に統一します。
- 2026-03-22 時点で、DB テーブル名は `bookings`, `booking_status_logs`, `enquiries`, `enquiry_status_logs` へ rename migration 済みです。
- 英語表記は Australian English に統一します。

## 3. ここまでの変更範囲 / Change Scope
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

## 4. 現在実装されている内容 / Implemented Scope
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
- `bookings` 表示
- `enquiries` 表示

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

## 5. 現時点の注意点 / Notes
- 直近の実装は、まず安全に画面を分離することを優先して入れています。
- DB 設計書 `08-db-design.html` に合わせて、プロフィール取得・ロール取得・トップ編集・導線設定の主要カラムは確定済みです。
- `top_hero_items.asset_id` は `content_assets` の画像アセット候補から選択できる状態に更新済みです。
- `top_hero_items.asset_id` には、キーワード検索とバケット絞り込み UI を追加しました。
- `top_hero_items.asset_id` の横には、上段が絞り込み、下段が実選択であることを示す補足文を追加しました。
- ダッシュボードと公開管理では、`bookings / enquiries` の直近 5 件を read-only で確認できるようにしました。
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
- 保存成功時は、通知にレコード名と保存時刻を表示するようにしました。
- 一覧テーブルでは、直近更新行に `更新済み` バッジとハイライトを出すようにしました。
- 保存後も編集中レコードの選択状態を維持するようにしました。
- 保存直後の再取得でも通知が消えないようにしました。
- `更新済み` バッジは改行しにくい表示へ調整しました。
- トップ編集と導線設定の左右パネルは、等幅ではなく情報量に合わせた比率へ調整しました。
- 画面・docs・コード上の呼称は `bookings / enquiries` に統一しました。
- Supabase rename migration 後、`js/admin-app.js` の参照テーブル名とカラム名を `bookings`, `enquiries`, `booking_type`, `booked_at` へ追随させました。
- 管理画面 HTML のバージョン文字列は `20260322a` に更新し、最新 JS / CSS を読み込みやすくしました。
- 2026-03-21 の最終確認では、アセット説明文は良好、トップ編集の左右比率は良好、導線設定の左右比率は微調整余地ありという評価でした。
- サイドバーの `セッション確認` ボタンは、視認性改善のため背景をグレー系、文字色を明色へ変更しました。
- `セッション確認` ボタンの視認性改善が反映されていることを確認しました。
- サイドバー下部に `Admin build` 表示を追加し、キャッシュ反映状況を画面上で確認できるようにしました。
- 2026-03-21 の実画面確認で、`journey_steps` の入力バリデーションは正常動作し、正常値保存も成功、Console エラーなしを確認しました。
- 一方で、入力値バリデーション強化や、保存後のUI改善はまだ残っています。

## 6. 既知の未完了事項 / Open Items
- `bookings / enquiries` の詳細画面は未着手
- `bookings / enquiries` の直近一覧 UI 実画面確認
- `app/pages/journey.html` の左右パネル比率の微調整

## 7. ロールバック方針 / Rollback
- 今回の変更は、`app/` 配下のHTML参照先差し替えと、管理画面専用ファイルの追加に限定しています。
- ロールバックする場合は、以下を戻せば元の状態に戻せます。
  - `app/` 配下HTMLの `admin-app.css` / `admin-app.js` 参照を元に戻す
  - `app/pages/journey.html` を削除する
  - `css/admin-app.css` を削除する
  - `js/admin-app.js` を削除する

## 8. 確認結果 / Verification
- 公開サイト用の `js/site-shell.js` は未変更
- 公開サイト用の `css/style.css` は未変更
- 更新後、日本語の文字化けが起きていないことをファイル再読込で確認済み

## 9. 今後の運用ルール / Operational Rules
- 管理画面に追加・更新を行った場合は、この資料を同じ作業内で必ず更新する
- 不具合や詰まりが発生した場合は、`docs/ISSUE_LIST.md` を同じ作業内で必ず更新する
- 更新後は、日本語の文字化けがないかを必ず確認する
- DB や画面仕様の正本が更新された場合は、この資料の参照元も合わせて更新する



