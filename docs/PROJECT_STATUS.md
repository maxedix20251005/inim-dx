## PROJECT STATUS: inim-dx

### このドキュメントの目的
- このファイルは、`inim-dx` プロジェクトの現在地を第三者でも短時間で把握できるように整理する常設ステータス資料です。
- 管理画面に追加・更新を行った場合は、本ファイルを必ず同じ作業内で更新します。
- 不具合や詰まりの履歴は `docs/ISSUE_LIST.md` を必ず参照し、本ファイル更新時も必要に応じて同時更新します。
- 更新後は、日本語の文字化けがないかを必ず確認します。

### 現在の主対象
- 現在の実装対象は、`inim-dx` の管理画面です。
- 画面仕様の正本:
  - `prompts/cross-project-handover-admin-implementation.md`
  - `references/design/11-admin-mockup-standalone.html`
- DB 設計の正本:
  - `C:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\docs\08-db-design.html`
- Issue 管理:
  - `docs/ISSUE_LIST.md`

### 実装方針
- 公開サイトの既存実装へ影響を出さないことを最優先に進めています。
- そのため、公開サイト用の `js/site-shell.js` と `css/style.css` は変更しない方針です。
- 管理画面は、専用の `js/admin-app.js` と `css/admin-app.css` に分離して実装しています。
- `app/` 配下の HTML は、管理画面専用アセットを参照するための差し替えに限定しています。
- Workshop の予約と問い合わせに関する呼称は、今後 `bookings / enquiries` に統一します。
- 2026-03-22 時点で、Supabase rename migration 実行により DB テーブル名は `bookings`, `booking_status_logs`, `enquiries`, `enquiry_status_logs` に更新済みです。
- 英語表記が必要な場合は、今後 Australian English に統一します。

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
- `content_assets` の検索・絞り込み UI
- `bookings` と `enquiries` の件数表示
- `bookings` と `enquiries` の直近一覧表示
- `booking_type` / `booked_at` への追随
- `top_hero_items` の基本入力バリデーション
- `top_hero_items.cta_url` のURL形式厳密化
- `journey_steps` の基本入力バリデーション
- 保存後 UI の改善

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
#### 1. 認証・ロール表示の切り分けは完了
- ダッシュボード上で `権限: 未取得`、プロフィールカードで `unknown` と表示されたケースがありました。
- `app/users/me.html` で `user_role_assignments` の取得結果も確認できるようにし、ロール未取得時の切り分けをしやすくしました。
- 2026-03-21 の最新確認では、`user_profiles` とロール表示は正常化し、`account_status` も `active` で取得できています。
- Console エラーも解消済みで、残っていた `/favicon.ico` の `404` には `rel="icon"` の明示で対応しました。
- 管理画面 HTML の `admin-app.css` / `site-config.js` / `admin-app.js` にはバージョン付き参照を付与し、GitHub Pages キャッシュで古い JS が残る状況を避けています。
- `cta_url` 厳密化と `セッション確認` ボタン視認性改善も、実画面確認まで完了しています。

#### 2. パスワード再設定フロー
- `forgot-password` 送信時の `redirectTo` を `app/password/reset.html` に明示し、`js/site-config.js` にも `adminResetRedirectUrl` を追加しました。
- `app/password/forgot.html` 上で、現在のページURL、設定値、実際の `redirectTo` を確認できます。
- 2026-03-21 の最新確認では、再設定メールの `redirect_to` は `https://maxedix20251005.github.io/inim-dx/app/password/reset.html` となり、パスワード再設定は成功しました。

#### 3. 導線設定の入力バリデーション確認
- `journey_steps` 向けに、`step_no`、`step_name`、`link_url`、`helper_text` の基本入力バリデーションを追加しました。
- `step_no` は必須、1以上の整数、重複禁止です。
- `step_name` は必須、40文字以内です。
- `link_url` は必須、255文字以内、`/` 始まりまたは `http://` / `https://` 始まりのみ許可です。
- `helper_text` は120文字以内です。
- 2026-03-21 の確認では、画面キャッシュまたは保存処理経路の問題で、フロント側検証をすり抜けて Supabase 側の制約エラーが出るケースがありました。
- これに対して、`saveRecord()` 側でも `journey_steps` の入力検証を必ず通すようにし、空欄の `0` 化や不正 URL の保存を防ぐようにしました。
- この差分はその後の UI 改善差分に統合され、現行の管理画面 HTML バージョンは `20260321f` です。
- サイドバー下部の `Admin build` 表示で、現在の配信バージョンを画面上で確認できるようにしました。
- 2026-03-21 の実画面確認で、各バリデーションは正常動作し、正常値保存も成功、Console エラーなしを確認しました。

#### 4. 保存後 UI 改善
- 保存成功時の通知に、更新したレコード名と保存時刻を表示するようにしました。
- 一覧テーブルでは、直近に保存した行へ `更新済み` バッジとハイライトを表示します。
- 保存後も編集中レコードの選択状態を維持するようにし、先頭行へ戻る挙動を避けました。
- 保存成功後の再取得で通知が消えないよう、`loadPageData({ preserveNotice: true })` を導入しました。
- `更新済み` バッジには `nowrap` を入れ、改行しにくくしました。
- この差分に合わせて、管理画面 HTML のバージョン文字列を `20260321g` へ更新しました。

#### 5. content_assets の検索・絞り込み UI
- トップ編集の `asset_id` 選択に、キーワード検索とバケット絞り込みを追加しました。
- キーワードは `id`, `file_path`, `alt_text`, `bucket_name`, `file_type`, `mime_type` を対象に検索します。
- 選択中アセットがフィルタ条件外でも候補から消えないようにし、保存時の選択ロストを防いでいます。
- 候補件数を `候補: x件 / 全y件` で表示するようにしました。
- 検索欄の使い方が直感的に分かるよう、`画像アセットID` の横に「上で絞り込み、下で実際のアセットを選択します。」の説明を追加しました。
- 2026-03-21 の実画面確認で、検索欄とバケット絞り込みの表示が確認できました。
- この差分に合わせて、管理画面 HTML のバージョン文字列を `20260321h` へ更新しました。

#### 6. bookings / enquiries の read-only 拡張
- ダッシュボードで、件数だけでなく `bookings` と `enquiries` の直近 5 件を確認できるようにしました。
- `bookings` は `booking_type`, `booked_at`, `participant_count`, `status`, `store_id`, `customer_profile_id` を表示します。
- `enquiries` は `subject`, `category`, `status`, `created_at`, `assigned_to`, `customer_profile_id` を表示します。
- まずは安全性優先で read-only 表示に留め、更新機能はまだ入れていません。
- `app/publish.html` にも同じスナップショットを表示し、公開前チェックと合わせて確認できるようにしました。
- トップ編集と導線設定の左右パネルは、一覧と編集フォームの情報量に合わせて比率を調整しました。等幅ではなく、一覧を少し広げつつ編集フォームの可読性も維持する設定です。
- 2026-03-21 の実画面確認で、ダッシュボード一覧と公開管理一覧は正常、`Admin build: 20260321i`、Console エラーなしを確認しました。
- 2026-03-22 に Supabase rename migration 実行後、`js/admin-app.js` の参照テーブル名とカラム名を `bookings`, `enquiries`, `booking_type`, `booked_at` へ更新しました。
- この差分に合わせて、管理画面 HTML のバージョン文字列を `20260322a` へ更新しました。

#### 7. アセット説明文と左右パネル比率
- `画像アセットID` の横に、フィルタの使い方を示す説明文を追加しました。
- 2026-03-21 の最終確認で、アセット説明文は良好、トップ編集の左右比率は良好を確認しました。
- 一方で、導線設定の左右比率は「概ね良好だが、まだ微調整余地あり」という結果です。
- 次回は [`app/pages/journey.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/pages/journey.html) の左右比率を中心に微調整を行うのが最優先です。
- 同時に、画面・docs・コード上の呼称は `bookings / enquiries` へ統一しました。

### 次に優先して進める作業
1. `PROJECT_STATUS.md` を起点に運用継続する
2. `AI_CONTEXT_PROMPT.md` を復元用コンテキストとして都度更新運用する
3. `bookings / enquiries` の read-only 一覧が rename 後 DB で正常表示されるか確認する
4. `bookings / enquiries` の詳細管理画面を検討する

### 再開時の確認手順
1. [`app/pages/journey.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/app/pages/journey.html) を開く
2. サイドバー下部の `Admin build` が `20260322a` であることを確認する
3. 左右パネル比率を確認し、一覧の見やすさとフォームの可読性を見比べる
4. 必要なら `bookings / enquiries` の詳細管理画面着手へ進む

### 確認時の報告フォーマット
- `導線設定の左右比率:` 良好 / 要改善
- `補正後の見やすさ:` 改善 / 変化なし / 悪化
- `Admin build:` 20260322a / その他
- `補足:` 必要に応じて詳細
- `Console:` エラーなし / エラーあり

### 参照ドキュメント
- `docs/admin-implementation-status.md`
- `docs/WIP.md`
- `docs/AI_CONTEXT_PROMPT.md`
- `docs/ISSUE_LIST.md`

### 確認済み事項
- 公開サイト用の `js/site-shell.js` は未変更です。
- 公開サイト用の `css/style.css` は未変更です。
- 本ファイル更新後、日本語の文字化け確認を行う前提です。
