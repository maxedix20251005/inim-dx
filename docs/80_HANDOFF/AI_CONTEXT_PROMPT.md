# AI CONTEXT PROMPT / inim-dx 完全復元用

このファイルは、作業途中からでも `inim-dx` の現状を正確に復元し、同じ前提で開発を再開するための AI 向けコンテキストです。新しい AI に渡す場合は、このファイルをそのまま読ませたうえで、必要に応じて `PROJECT_STATUS.md` と `WIP.md` を続けて参照させてください。

## 1. あなたの役割 / Role
- あなたは `inim-dx` のフルスタックエンジニアです。
- 既存の公開サイトへ影響を出さないことを最優先に、管理画面の実装を継続してください。
- 不明点は実装前に確認してください。
- 出力は構造化してください。
- 変更は差分で示してください。
- 初心者でも理解できる説明を付けてください。
- 日本語の文字化けがないか、変更後に必ず確認してください。
- 変更のたびに、少なくとも `docs/10_PROJECT/PROJECT_STATUS.md` と `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md` を更新してください。
- 不具合や詰まりが発生した場合は、`docs/10_PROJECT/ISSUE_LIST.md` に必ず追記し、関連ドキュメントと一緒に更新してください。
- 管理画面に関する実装変更があれば、`docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md` と必要に応じて `docs/10_PROJECT/WIP.md` も更新してください。

## 2. プロジェクト概要 / Project Overview
- プロジェクト名: `inim-dx`
- 現在の主対象: 管理画面実装
- 目的:
  - `inim-dx` の管理者向け画面を実装する
  - 公開サイトの既存 UI / JS / CSS へ影響を出さずに進める
  - まずは「トップ編集」と「導線設定」を優先実装する

## 3. 正本ドキュメント / Canonical Docs
- プロジェクト全体のコンセプトを理解・確認・振り返りする場合は、常に `docs/01-proposal.html` を参照し、現在の実装や判断内容に矛盾がないか確認してください。
- 画面仕様の正本:
  - `docs/80_HANDOFF/CROSS_PROJECT_HANDOVER_ADMIN_IMPLEMENTATION.md`
  - `references/design/11-admin-mockup-standalone.html`
- 補助デザイン:
  - `references/design/05-wireframe.html`
  - `references/design/06-design-guide.html`
- DB 設計の正本:
  - `C:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\docs\08-db-design.html`
- Workshop 予約データ設計の補助資料:
  - `docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md`
- Workshop 予約 SQL 実行手順:
  - `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`
- 進捗管理:
  - `docs/10_PROJECT/PROJECT_STATUS.md`
  - `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md`
  - `docs/10_PROJECT/WIP.md`
- Issue 管理:
  - `docs/10_PROJECT/ISSUE_LIST.md`

## 4. 技術構成 / Tech Stack
- フロント:
  - 静的 HTML
  - Vanilla JavaScript
  - CSS
- 認証 / DB:
  - Supabase
- ホスティング:
  - GitHub Pages

## 5. 実装方針 / Implementation Policy
- 公開サイト用の既存ファイルは原則変更しない
  - `css/style.css`
- ただし 2026-03-22 の Workshop 予約導線 Draft 追加では、公開側の導線追加に必要な最小差分として `js/site-shell.js` と `subpages/workshop.html` を更新済み
- 管理画面は専用ファイルへ分離して実装する
  - `js/admin-app.js`
  - `css/admin-app.css`
- `app/` 配下 HTML は、管理画面専用アセットを参照する差し替えに限定する
- ロールバックしやすいように、変更範囲を局所化する
- Workshop の予約と問い合わせに関する呼称は、DB を除き `bookings / enquiries` に統一する
- 2026-03-22 時点で、DB rename migration は実行済みで、現行 DB 名称は `bookings`, `booking_status_logs`, `enquiries`, `enquiry_status_logs`
- 英語表記が必要な場合は Australian English に統一する
- 次の主実装は、管理画面の `bookings / enquiries` 詳細化ではなく、公開側 [`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) `#reserve` から始まる Workshop 予約導線の整理です

## 6. ここまでの主な変更範囲 / Change Scope
#### 新規追加
- `css/admin-app.css`
- `js/admin-app.js`
- `app/pages/journey.html`
- `subpages/workshop-booking.html`
- `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md`
- `docs/10_PROJECT/PROJECT_STATUS.md`
- `docs/10_PROJECT/WIP.md`

#### 参照先変更
- `subpages/workshop.html`
- `app/login.html`
- `app/dashboard.html`
- `app/publish.html`
- `app/pages/home.html`
- `app/pages/workshop.html`
- `app/users/me.html`
- `app/password/forgot.html`
- `app/password/reset.html`
- `js/site-shell.js`

## 7. 現在実装済みの内容 / Implemented Scope
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
- `content_assets` の検索・絞り込み UI
- `content_assets` フィルタの使い方説明表示
- `top_hero_items` 一覧・編集
- `top_hero_items` 基本入力バリデーション
- `top_hero_items.cta_url` のURL形式厳密化
- 管理画面 HTML のバージョン文字列によるキャッシュ制御
- `journey_steps` 一覧・編集
- `journey_steps` 基本入力バリデーション
- 保存後 UI 改善
- `bookings` 件数表示
- `enquiries` 件数表示
- `bookings / enquiries` の直近一覧表示
- `booking_type` / `booked_at` への追随

#### 公開側 Workshop 導線
- [`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) に `#reserve` セクションがある
- 2026-03-22 時点で、Workshop 専用予約画面 [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) の Draft を追加済み
- `workshop.html` の `予約フォームへ進む` は `./workshop-booking.html` を向く
- 予約ページ Draft は、カレンダー、日別スロット表示、詳細4タブで構成
- 2026-03-22 の改修で、カレンダー記号は記号のみ表示へ調整し、選択中の日付をカレンダー直下にも表示するようにした
- 2026-03-22 の追加入力で、[`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html) を追加し、`予約へ進む` から日時・料金・予約方式を引き継いで入力 Draft に遷移できる
- 2026-03-22 の調整で、予約入力 Draft の submit は入力 validity とポリシー同意が揃うまで disabled にし、`参加人数` の縦位置を `電話番号` と揃えた
- `file://` 直開きでのクエリ付き遷移警告に備え、予約入力画面への遷移 URL は `new URL()` で組み立てる方式へ変更した
- 2026-03-22 の確認結果を受けて、予約入力 Draft の STEP 表示は `STEP 1 = 完了済み`, `STEP 2 = 処理中で強調`, `STEP 3 = 次段階` の見せ方へ調整した
- 2026-03-22 の追加実装で、STEP 3 用の確認画面 Draft `subpages/workshop-booking-confirm.html` を追加し、STEP 2 の入力値と選択枠を引き継いで確認できる
- 2026-03-22 の追加調整で、確認画面から STEP 2 に戻った際も、入力済みの代表者情報と人数を保持して再編集できる
- 2026-03-22 の追加実装で、STEP 2 の入力 validity check として `contact_name` 必須、`contact_email` 必須 + 形式、`contact_phone` 必須 + 電話番号形式、`party_size` 1〜4名必須選択を実装した
- 2026-03-22 の追加調整で、STEP 2 の必須ラベルには赤 `*` を付与し、blur 時に各フィールド下へエラー表示を出すようにした。電話番号は固定電話 / 携帯電話・IP 電話を判定して桁数を確認し、入力中に `-` を自動整形するようにした
- 2026-03-22 の追加調整で、電話番号の局番判定を詳細化し、`03 / 06`、主要な 3 桁市外局番、その他固定電話、`050 / 070 / 080 / 090`、`0120`、`0800`、`0570` を認識して `-` パターンと桁数を出し分けるようにした
- 2026-03-22 の追加実装で、STEP 1 → STEP 2 → STEP 3 の遷移時に `date_key`, `Shop`, `storeLabel`, `plan_id`, `session_id` をクエリ引き継ぎするようにした
- 2026-03-22 の追加実装で、STEP 3 確認画面 `subpages/workshop-booking-confirm.html` の送信ボタンを Supabase `bookings` 保存へ接続した
- 保存時はログイン中ユーザーの `user_profiles.id` を `customer_profile_id` に使い、店舗名から `Shops.id` を解決して insert する
- ログイン未実施時やプロフィール不整合時は、確認画面内でエラーメッセージを表示し、`account.html#login` へ誘導する
- 2026-03-22 の追加調整で、予約導線のキャッシュ判別用に `build=20260322b` をクエリ引き継ぎし、確認画面に `Booking build` を表示するようにした
- 2026-03-23 の追加調整で、`store_id` 解決は `Shops` 一覧に対する表記ゆれ吸収マッチへ変更し、`浅草店が見つからない` エラーの対策を入れた
- 2026-03-23 の追加調整で、`Multiple GoTrueClient instances` 警告対策として `window.__INIM_SUPABASE_CLIENT` の singleton 化を `js/site-shell.js` と確認画面側に適用した
- 2026-03-23 のユーザー再確認で、`Booking build: 20260322b`、予約送信成功、予約ID表示あり、Console エラーなしを確認した
- 別端末再開時の混乱防止として、`docs/10_PROJECT/WIP.md` に「必須ルール」と「再開ショート手順」を追記した
- `app/` 配下も確認したが、現時点では電話番号入力フィールド自体が存在しないため、同ロジックの適用対象はまだない。今後 `app` 側に電話番号入力を追加する際は、同等の validity と整形を適用する前提とする
- 2026-03-22 の導線整理で、`workshop.html` の `予約する` と 3 コースの各予約ボタンは、いったんすべて `./workshop-booking.html` へ統一した
- 同日の追加調整で、`行き先を選ぶ` で選択した店舗を `Shop` クエリとして `workshop-booking.html` へ引き継ぎ、予約画面側でも選択状態を維持するようにした
- DB 追加は不要だった。`workshop_sessions.store_id` と既存 `bookings.store_id` がすでに存在するため、SQL `07_` は未作成
- 2026-03-22 のユーザー確認で、店舗引き継ぎ、予約画面の店舗選択表示、選択店舗の開催日のみ表示はすべて正常、Console エラーなしを確認した
- Reminder: `workshop_plans` / `workshop_sessions` 確定後に、予約画面で各プランをどう見せるか、各コースボタンから何を初期反映するかを再設計する
- 予約データ設計案は `docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md` に整理済み
- 追加テーブル作成 SQL は `sql/05_create_workshop_booking_tables.sql`
- 検証 SQL は `sql/06_verify_workshop_booking_tables.sql`
- 実行手順は `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`
- 2026-03-22 の実確認で、カレンダー記号は良好、SQL ファイル構成は良好、Runbook も良好だった
- 同日の検証で、追加テーブル、`bookings` 追加列、関連 index の存在確認まで完了している
- `デジタル調香を試す` への導線も併設されているため、予約前体験との関係整理が必要
- 2026-03-25 追加: `07_add_currency_code_and_party_limits.sql` を適用し、`currency_code` と `min/max_party_size` を plans/sessions/bookings に統合。`08_verify_workshop_booking_schema.sql` で検証済み。
- 2026-03-25 追加: `workshop-booking.html` に Supabase 接続LEDを設置（緑=接続、橙=未接続/エラー）。セッション未登録時はモック表示で暫定対応。

## 8. DB 設計に基づく重要テーブル / Key Tables
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

## 9. 重要な現状認識 / Current Findings
#### 公開側との分離
- 公開サイト用の `css/style.css` は未変更です。
- 公開サイト用の `js/site-shell.js` は、Workshop 予約 Draft 追加に必要な最小差分のみ更新しています。
- 管理画面の実装は `js/admin-app.js` と `css/admin-app.css` に分離されています。

#### ログイン画面の自動遷移
- `app/login.html` は、既存セッションがある場合に `app/dashboard.html` へ自動遷移します。
- これは現状の実装仕様です。

#### パスワード再設定の問題
- 過去に、再設定メールの `redirect_to` がトップページになっていました。
- そのため、メールリンクから `app/password/reset.html` に戻れず、リセット導線が壊れていました。
- `js/admin-app.js` では、`forgot-password` 送信時の `redirectTo` を `app/password/reset.html` 優先にする修正を入れています。
- 2026-03-21 の確認で、実メールの `redirect_to` も `app/password/reset.html` となり、パスワード再設定は成功しました。

#### レート制限
- Supabase の再設定メール送信で `email rate limit exceeded` が発生した履歴があります。
- 短時間の連続送信は避け、確認は1回ずつ行ってください。

#### ロール表示
- ダッシュボードで `権限: 未取得`、プロフィールカードで `unknown` と表示されたケースがあります。
- 次回確認時は、再ログイン後にロール取得結果も必ず確認してください。
- 2026-03-21 の最新確認では、`user_profiles` 取得クエリが `400` で失敗したため、プロフィール取得は `select("*")` を優先する実環境追従型に更新されています。
- 管理画面 HTML の CSS / JS 参照にはバージョン文字列が付いており、GitHub Pages で古いスクリプトが残る前提も確認対象です。
- さらに、既存ロゴ画像を `rel="icon"` で明示し、`/favicon.ico` の `404` を避ける対応を入れています。
- 2026-03-21 の最新確認では、ロール表示は `Admin`、`account_status` は `active` で正常化し、Console エラーも解消しました。

#### トップ編集と導線設定の入力バリデーション
- `top_hero_items` では、`title`、`lead_text`、`cta_label`、`cta_url`、`display_order` の基本入力バリデーションを実装済みです。
- `cta_url` は `abc` のような不正値を保存できないことを実画面で確認済みです。
- `top_hero_items.asset_id` には、キーワード検索とバケット絞り込み UI を追加済みで、2026-03-21 の実画面で表示確認まで完了しています。
- `top_hero_items.asset_id` には、上段で絞り込み、下段で実選択することが分かる説明文も追加済みです。
- サイドバーの `セッション確認` ボタンは、背景と文字色を調整し、視認性改善が反映されていることを確認済みです。
- `journey_steps` では、`step_no`、`step_name`、`link_url`、`helper_text` の基本入力バリデーションを追加済みです。
- 2026-03-21 の確認で、`journey_steps` のフロント側検証をすり抜けてバックエンド制約エラーが出たため、`saveRecord()` 側でも必ず入力検証を通すように修正済みです。
- サイドバー下部に `Admin build` を表示し、キャッシュ反映状況を目視確認できるようにしています。
- 保存成功時は、通知にレコード名と保存時刻を表示し、一覧側でも直近更新行を `更新済み` としてハイライトします。
- 保存後も編集中レコードの選択状態を維持します。
- 保存直後の再取得でも通知が消えないように修正済みです。
- `更新済み` バッジは改行しにくい表示へ調整済みです。
- ダッシュボードと公開管理には、`bookings / enquiries` の直近 5 件を read-only で表示するスナップショットを追加済みです。
- トップ編集と導線設定の左右パネルは、等幅ではなく情報量に合わせた比率へ調整済みです。
- 管理画面 HTML のバージョン文字列は `20260322a` です。
- 画面・docs・コード上の呼称は `bookings / enquiries` に統一済みです。
- `js/admin-app.js` の DB 参照は、rename 後の `bookings`, `enquiries`, `booking_type`, `booked_at` に追随済みです。
- 2026-03-21 の最終確認では、アセット説明文は良好、トップ編集の左右比率は良好、導線設定の左右比率は微調整余地ありでした。
- 2026-03-21 の実画面確認で、`journey_steps` の各バリデーションは正常動作し、正常値保存も成功、Console エラーなしを確認済みです。
- 2026-03-22 の現状把握で、`workshop.html#reserve` は存在するが、予約 CTA はまだ `../index.html#contact` に接続されていることを確認済みです。
- その後、`subpages/workshop-booking.html` の Draft を追加し、空き状況カレンダー、選択日の時間帯表示、`予約へ進む` ボタン、詳細4タブまで実装しました。
- さらに、Workshop 予約の推奨テーブルとして `workshop_plans`, `workshop_plan_inclusions`, `workshop_plan_flow_steps`, `workshop_sessions` を `docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md` に整理しました。
- したがって、次はこの Draft を基に公開側予約画面の必要入力項目を固め、その後に `bookings / enquiries` 管理画面の詳細化へ進むべき状態です。

## 10. 直近の再開手順 / Restart Steps
1. `docs/10_PROJECT/PROJECT_STATUS.md` を確認する
2. `docs/10_PROJECT/WIP.md` を確認する
3. `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md` を確認する
4. [`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) の `#reserve` セクションを確認する
5. `予約フォームへ進む` が `./workshop-booking.html` を向いていることを確認する
6. [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) の Draft UI を確認する
7. `docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md` を確認する
8. `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md` を確認する
9. 予約画面で必要になる入力項目を整理する
10. 必要なら `bookings / enquiries` の追加項目を検討する
11. GitHub Pages 上で以下 URL を直接開けるか確認する
   - `https://maxedix20251005.github.io/inim-dx/app/pages/home.html`
   - `https://maxedix20251005.github.io/inim-dx/app/pages/journey.html`
   - `https://maxedix20251005.github.io/inim-dx/app/users/me.html`
12. ダッシュボードで `Recent Bookings` と `Recent Enquiries` が表示されるか確認する
13. `app/publish.html` でも同じ一覧が表示されるか確認する
14. サイドバー下部の `Admin build` が `20260322a` であることを確認する

## 11. 次に優先する実装候補 / Next Candidates
1. `subpages/workshop-booking.html` と `subpages/workshop-booking-entry.html` の Draft、`docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md` を基に予約入力項目を確定する
2. 予約保存成功後の完了画面（thanks）と表示内容を確定する
3. `workshop_sessions` 実データ連携で `session_id` / `plan_id` の保存を確定する
4. その後に `bookings / enquiries` の詳細管理画面着手

## 12. 変更時の必須チェック / Mandatory Checks
- 変更が公開側へ波及していないか確認する
- 変更ファイルが管理画面側に閉じているか確認する
- 日本語の文字化けがないか再読込で確認する
- 変更内容を `docs/10_PROJECT/PROJECT_STATUS.md` に反映する
- この `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md` にも反映する
- 不具合や詰まりがあった場合は `docs/10_PROJECT/ISSUE_LIST.md` にも反映する
- 必要に応じて `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md` と `docs/10_PROJECT/WIP.md` を更新する

## 13. ユーザーへの報告ルール / Reporting Rules
- まず結論を短く伝える
- その後、変更点を構造化して示す
- 差分要約を入れる
- 初心者でも理解できる言葉で補足する
- ユーザー確認が必要な場合は、確認手順と報告フォーマットをセットで提示する

## 14. このファイルの更新ルール / Update Rules
- このファイルは使い回しの雛形ではなく、現在の実プロジェクト状態を保持する運用ファイルです。
- 今後、実装・調査・方針変更・既知課題の変化があったら、必ず更新してください。
- 次回の AI がこのファイルだけ読んでも、途中から高い精度で再開できる状態を維持してください。

## 15. 2026-03-28 Follow-up / 引継ぎ追記
- JA: `subpages/workshop-booking.html` の `選択中プラン` バーで `プランを変更する` 右寄せ要望に対し、CSS調整に加えてアクションDOM順を `全プランを表示 -> プランを変更する` へ変更。
- JA: 本件はユーザー要望により `docs/10_PROJECT/ISSUE_LIST.md` へ Issue `2026-03-28-28` として記録済み（修正適用済み・最終確認待ち）。
- EN: For plan-context action alignment, actions were reordered (`Clear All Plans -> Change Plan`) to ensure `Change Plan` stays rightmost.
- EN: Tracked in `ISSUE_LIST.md` as Issue `2026-03-28-28` per user request, even with fix applied.

## 16. 2026-03-28 Slice-8 / 引継ぎ追記
- JA: `2.2 Top -> Workshop Flow Reinforcement` の追加スライスとして、`workshop-plans` / `workshop-booking` に fixed 次アクションCTAを追加。
- JA: Booking側 fixed CTA は日付選択時のみ表示される（未選択時は非表示）。
- JA: Top/Workshop/Plans の主要CTA文言を `予約枠` 表現へ統一。
- EN: Added sticky next-action CTA on plans/booking; booking CTA appears only after date selection.
- EN: Unified core CTA copy to `予約枠` wording across Top/Workshop/Plans.

## 17. 2026-03-28 PROGRAM Handoff Fix / 引継ぎ追記
- JA: `workshop.html` PROGRAMカード経由で booking に遷移した際、`選択プラン` が未表示になる不整合を修正。
- JA: PROGRAMカードCTAへ `data-plan-code/name` を追加し、`syncBookingLinks()` で `planCode/planName` を明示引継ぎ。
- EN: Fixed missing selected-plan context from Workshop PROGRAM cards to Booking by passing `planCode/planName` in booking-link sync.

## 18. 2026-03-28 PROGRAM DB Migration / 引継ぎ追記
- JA: Issue `2026-03-28-29` の恒久対応として、`workshop.html` PROGRAMを静的3カードからDB連動表示へ移行。
- JA: `workshop_plans`（active, sort_order asc, limit 3）を表示し、`workshop_plan_inclusions`（最大3件）をカード内反映。
- JA: PROGRAMカードCTAは `data-plan-code/name` を保持し、store連動時に booking へ `planCode/planName + Shop/storeLabel` を引継ぎ。
- EN: Permanent fix applied by migrating Workshop PROGRAM cards to DB-driven top-3 plans and preserving robust booking handoff parameters.

## 19. 2026-03-28 Issue Status Update / 引継ぎ追記
- JA: ユーザー確認により Issue `2026-03-28-28` と `2026-03-28-29` は `解消済み` へ更新済み。
- EN: Issues `2026-03-28-28` and `2026-03-28-29` are now closed after user verification.

## 20. 2026-03-28 Backlog Status Sync / 引継ぎ追記
- JA: `2.12 Breadcrumb Navigation` は実装済みを再確認（public: `site-shell.js` の `page-breadcrumb`、admin: `admin-app.js` の `admin-breadcrumb`）。
- JA: `docs/20_PRODUCT/FEATURE_BACKLOG.md` の `2.12` を `Accepted` へ更新済み。
- EN: Re-verified breadcrumb implementation on both shells and updated backlog item `2.12` to `Accepted`.

## 21. 2026-03-28 IA Refinement Slice-1 / 引継ぎ追記
- JA: `2.13` を `In Progress` へ移行し、taxonomy alignment の第1スライスを反映。
- JA: `site-shell.js` でトップレベル表記を `セール` に統一し、breadcrumb の `sale/itemSale` 判定重複を解消。
- JA: `subpages/sitemap.html` を runtime ナビ構造に合わせた5分類へ再編（トップレベル/予約導線/カテゴリ詳細/サポートアカウント/管理画面）。
- EN: Started `2.13` with slice-1 IA alignment by normalizing taxonomy and restructuring sitemap to mirror runtime navigation groups.

## 22. 2026-03-28 IA Refinement Slice-2 / 引継ぎ追記
- JA: `site-shell.js` に `disabledPublicPageKeys` を導入し、Footer/Sidebar/Account の disabled-link 判定を共通化。
- JA: `renderPublicPageLink` / `renderDisabledTextLink` でリンク生成を統一し、初期表示と auth 再描画で状態差が出ないよう整理。
- EN: Added centralized disabled-link policy (`disabledPublicPageKeys`) and unified link rendering for footer/sidebar/account across both initial and auth-updated UI states.

## 23. 2026-03-28 IA Refinement Slice-3 / 引継ぎ追記
- JA: `workshop-plans.html` の `data-page-key` を `workshop` から `workshopPlans` へ修正し、導線ページを固有キーで識別可能にした。
- JA: `site-shell.js` の `pages` / breadcrumb / current 判定へ `workshopPlans` と `workshopBookingThanks` を追加し、Plans->Booking->Thanks の階層整合を改善。
- JA: Workshop導線ラベルを `予約枠選択` / `申込情報入力` / `予約内容確認` / `予約完了` に合わせ、`香りと遊ぶ` サブメニューへ `プラン比較` を追加。
- EN: Added explicit page-key coverage for `workshopPlans` and `workshopBookingThanks`, improving breadcrumb/nav-current consistency across the full workshop booking flow.

## 24. 2026-03-28 Booking Floating Shortcut Panel / 引継ぎ追記
- JA: `workshop-booking.html` の fixed CTA をミニフローティングパネルへ再設計し、説明文を削除して `予約する` タイトル + 2ボタン構成へ変更。
- JA: ボタンは `空き枠を確認する`（日付選択時は `◯◯ の予約枠を確認する`）と `プランを比較する`。
- JA: デスクトップは右下固定、モバイルは下部ドック表示に切替。
- EN: Replaced verbose sticky CTA with a compact floating shortcut panel (title + two buttons), including responsive desktop/mobile dock behavior.

## 25. 2026-03-28 Floating CTA Follow-up / 引継ぎ追記
- JA: `workshop-booking` の floating CTA は、長い日付文言でボタンが窮屈になるため、パネル幅拡張 + ボタン折返し可へ調整済み。
- JA: `workshop.html` の予約ボタンは下部 `Reservation` セクション配置から、右下固定のフローティングCTAへ移設（`予約フォームへ進む` / `デジタル調香を試す`）。
- EN: Follow-up refinement completed: booking floating CTA now supports longer labels, and Workshop reservation actions were relocated from bottom section to persistent floating CTA.

## 26. 2026-03-28 IA Refinement Slice-4 / 引継ぎ追記
- JA: `sitemap.html` のトップレベル表記を runtime ナビ準拠へ調整（`トップ` -> `Home`）。
- JA: 公開未準備ページに `準備中` マーカーを追加し、公開状態を sitemap 上で判別しやすくした。
- JA: `css/style.css` に sitemap 用マーカースタイル（pill）を追加。
- EN: Added sitemap label/status consistency improvements by aligning `Home` naming and introducing clear coming-soon badges.

## 27. 2026-03-28 IA Refinement Slice-5 / 引継ぎ追記
- JA: sitemap 管理カードの名称を `ワークショップ予約管理 / ワークショッププラン管理` へ統一。
- JA: `adminAccessMode` を参照する動的バッジ/注記を追加し、`open_demo` と `admin_only` の現在値を可視化。
- JA: `css/style.css` にモード別バッジスタイル（warning/info系）を追加。
- EN: Added admin naming consistency and dynamic `adminAccessMode` visibility (badge + note) on sitemap.

## 28. 2026-03-28 IA Refinement Slice-6 / 引継ぎ追記
- JA: sitemap の `準備中` リンクへ `is-disabled` / `aria-disabled="true"` / `tabindex="-1"` を適用し、誤遷移を防止。
- JA: `css/style.css` に sitemap disabled-link 表示スタイルを追加し、非活性リンクを視覚的にも明確化。
- EN: Synced sitemap coming-soon links with runtime disabled-link behavior (non-clickable + explicit disabled styling).

## 29. 2026-03-28 IA Refinement Slice-7 / 引継ぎ追記
- JA: `sitemap.html` に `disabledPageFiles` 実行時判定を追加し、対象リンクへ disabled 属性/クラスを動的適用。
- JA: 非対象リンクは disabled 属性を除去し、有効リンクの状態を維持。
- JA: 上記ロジックは `adminAccessMode` 表示ロジックと同一初期化内で実行。
- EN: Added runtime policy-driven sitemap disabling to reduce manual drift while preserving adminAccessMode badge behavior.

## 30. 2026-03-28 IA Refinement Slice-8 / 引継ぎ追記
- JA: `site-config.js` に `disabledPublicPageKeys` を追加し、公開未準備ページ定義を設定値へ移管。
- JA: `site-shell.js` は同設定を参照（未設定時フォールバックあり）し、公開ナビ/フッターの disabled 判定を実行。
- JA: `sitemap.html` も同設定を参照してキーから対象ファイルを解決し、disabled 判定を適用。
- EN: Centralized disabled public-page policy in `site-config.js` and wired both runtime shell and sitemap to this single source.

## 31. 2026-03-28 IA Refinement Slice-9 / 引継ぎ追記
- JA: sitemap 公開リンクに `data-page-key` を付与し、disabled 判定をファイル名解析からキー一致へ変更。
- JA: 手動の disabled 属性ハードコードを撤去し、実行時ポリシー適用へ一本化。
- EN: Reworked sitemap disable logic to `data-page-key` matching, removing brittle filename parsing and hardcoded disabled attributes.

## 32. 2026-03-28 IA Refinement Slice-10 / 引継ぎ追記
- JA: sitemap の `small(準備中)` 表示を、disabled 判定と同時制御へ変更（無効時表示 / 有効時非表示）。
- JA: `disabledPublicPageKeys` 更新時にリンク状態と `準備中` ラベルの不一致が出ないよう改善。
- EN: Synced `coming-soon` badge visibility with runtime disabled policy to prevent state-label mismatch.

## 33. 2026-03-28 IA Refinement Slice-11 / 引継ぎ追記
- JA: disabled リンクで `small(準備中)` が存在しない場合も実行時に自動生成するよう変更。
- JA: enabled リンクへ切替時は既存 `small` を削除し、バッジ残骸を防止。
- EN: Upgraded sitemap badge handling to runtime generation/removal so no manual badge markup maintenance is required.

## 34. 2026-03-28 IA Refinement Slice-12 / 引継ぎ追記
- JA: sitemap の policy 管理リンクから静的 `small(準備中)` マークアップを除去。
- JA: `準備中` 表示は slice-11 の runtime 生成ロジックに一本化。
- EN: Removed static coming-soon badge markup from sitemap links and fully relied on runtime badge generation.

## 35. 2026-03-28 IA Refinement Slice-13 / 引継ぎ追記
- JA: `site-config.js` に `comingSoonBadgeLabel` を追加し、sitemap の `準備中` バッジ文言を設定値で制御可能にした。
- JA: `sitemap.html` のバッジ生成ロジックは固定文言を廃止し、`comingSoonBadgeLabel` を参照。
- EN: Externalized sitemap coming-soon badge copy into config (`comingSoonBadgeLabel`) for operational control.

## 36. 2026-03-28 IA Refinement Slice-14 / 引継ぎ追記
- JA: `disabledPublicPageKeys` を適用前に正規化（trim/重複除去/未知キー除外）する処理を shell/sitemap 双方へ追加。
- JA: 正規化後に有効キーが空の場合は、既定 disabled リストへフォールバックするよう統一。
- EN: Hardened disabled policy parsing by sanitizing config values before applying in both shell and sitemap.

## 37. 2026-03-28 IA Refinement Slice-15 / 引継ぎ追記
- JA: sitemap の既定 disabled 対象を、スクリプト固定配列から `data-default-disabled` 属性起点へ移行。
- JA: 設定適用対象は sitemap 内の `data-page-key` 既知リンクに限定し、未知キーは安全に無視。
- EN: Replaced hardcoded sitemap fallback keys with markup-driven defaults and bounded config application to known page keys.

## 38. 2026-03-28 IA Refinement Slice-16 / 引継ぎ追記
- JA: `site-config.js` に `sitemapAdminAccessCopy` を追加し、管理アクセス表示（バッジ接頭辞/注記文言）を設定値へ移管。
- JA: sitemap スクリプトは固定文言を廃止し、設定値参照 + 未設定時フォールバックへ変更。
- EN: Externalized sitemap admin-access copy into config with safe fallback defaults.

## 39. 2026-03-28 IA Refinement Slice-17 / 引継ぎ追記
- JA: `adminAccessMode` の未知値を `admin_only` へ正規化する処理を追加。
- JA: 管理バッジは描画前に mode クラスを初期化してから再付与するよう変更。
- EN: Hardened sitemap admin-mode rendering by normalizing unknown values and clearing stale badge classes before apply.

## 40. 2026-03-28 IA Refinement Slice-18 / 引継ぎ追記
- JA: sitemap 実行時ロジックへ `readText` / `unique` ヘルパーを導入し、既定値処理と配列正規化の重複を整理。
- JA: 文言 fallback を `defaults` オブジェクトへ集約し、後続拡張時の編集点を縮小。
- EN: Refactored sitemap runtime script for maintainability by consolidating defaults and normalization helpers.

## 41. 2026-03-28 IA Refinement Slice-19 / 引継ぎ追記
- JA: `site-shell.js` のトップナビ disabled 判定を固定配列から設定ポリシー導出へ変更。
- JA: `disabledPublicPageKeys` のトップレベル対象キーのみを抽出して `disabledGlobalNavKeys` を生成。
- EN: Synchronized top-level nav disabled state with shared policy by deriving keys from config.

## 42. 2026-03-28 IA Refinement Slice-20 / 引継ぎ追記
- JA: `FEATURE_BACKLOG` の `2.13` を `Accepted` へ更新し、IA refinement フェーズをクローズ。
- EN: Closed backlog item `2.13` as accepted after completing IA consistency and policy centralization work.

## 43. 2026-03-28 Placeholder Build Slice-1 / 引継ぎ追記
- JA: `2.14` を開始し、`subpages/scent-search.html` を MVP 実装（キーワード検索 + カテゴリフィルタ + 関連ページリスト）。
- JA: `scentSearch` を shared disabled policy から除外し、公開ナビ/サイトマップで有効化。
- JA: `FEATURE_BACKLOG` の `2.14` を `In Progress` へ更新済み。
- EN: Started `2.14` with the first implemented page (`scent-search`) and enabled `scentSearch` in shared navigation policy.

## 44. 2026-03-28 Placeholder Build Slice-2 / 引継ぎ追記
- JA: `subpages/search-shop-info.html` を MVP-B（運営情報 + 短いストーリー + 地図埋め込み）方針で更新。
- JA: 店舗選択チップ（浅草/柴又/ソラマチ）に連動して、`営業時間/住所/アクセス/予約枠/おすすめ` と地図表示が切替わる。
- JA: `この店舗で予約枠を確認する` は `Shop/storeLabel` を維持して `workshop-booking` へ遷移。
- JA: `js/site-shell.js` の `searchStoreInfo.latest` を公開済み案内へ更新。
- EN: Delivered `2.14` slice-2 by implementing a Shop info page with concise operations, short story copy, embedded map switching, and booking handoff continuity.

## 45. 2026-03-28 Placeholder Build Slice-3 / 引継ぎ追記
- JA: `subpages/search-projects.html` を実装し、読み物ハブ（キーワード検索 + カテゴリフィルタ + カード一覧）を追加。
- JA: 体験導線/デジタル調香/店舗背景は公開導線として遷移可能、記事系後続コンテンツは `準備中` 表示で区別。
- JA: `css/style.css` に `projects-search-*` を追加し、レスポンシブ表示を含めて整備。
- JA: `js/site-shell.js` の `searchProjects.latest` を公開済み文言へ更新。
- EN: Delivered `2.14` slice-3 by creating a filterable projects/story hub with clear live-vs-coming-soon states and updated published status copy.

## 46. 2026-03-28 Placeholder Build Slice-4 / 引継ぎ追記
- JA: `subpages/search-events.html` を実装し、イベント一覧（キーワード検索 + 開催ステータス絞り込み + カード表示）を追加。
- JA: カードに `受付中/準備中`、開催期間、対象店舗、概要を表示し、受付中のみ遷移CTAを有効化。
- JA: `css/style.css` に `events-search-*` を追加し、モバイル1カラム表示へ対応。
- JA: `js/site-shell.js` の `searchEvents.latest` を公開済み文言へ更新。
- EN: Delivered `2.14` slice-4 by adding a searchable/filterable events listing with explicit open-vs-coming states and responsive UI.

## 47. 2026-03-28 Global Nav IA Restructure / 引継ぎ追記
- JA: 公開グローバルナビを指定順序へ再編（`Home -> 香りと遊ぶ -> ブランド -> アイテム -> 記事 -> イベント -> 実店舗 -> Admin`）。
- JA: `記事` は `search-projects`、`イベント` は `search-events`、`実店舗` は `search-shop-info` へ遷移先を変更。
- JA: `Admin` は既存ロジックのままグローバルナビ右端表示を維持。
- EN: Reworked top-level public nav to the requested order and remapped Article/Event/Shop links to implemented search pages while keeping Admin at the right edge.

## 48. 2026-03-28 Brand WAtoYO-only Activation / 引継ぎ追記
- JA: ブランド公開方針を `WAtoYOのみ有効` へ切替（top-level Brand は有効化、Brand詳細露出は WAtoYO のみに制限）。
- JA: `site-config.js` の `disabledPublicPageKeys` から `brand` を除外。
- JA: `site-shell.js` の Brandサブメニューを `brandWatoyo` 単独へ変更し、`latest` 文言を公開状態へ更新。
- JA: `sitemap.html` で top-level `ブランド` の default-disabled を解除し、ブランド詳細一覧を `ブランド: WAtoYO` のみに整理。
- EN: Switched Brand policy to WAtoYO-only exposure by enabling top-level Brand and limiting submenu/sitemap detail entries to WAtoYO.

## 49. 2026-03-28 Items 2-group Activation / 引継ぎ追記
- JA: アイテム公開方針を `アロマ / ハンドクリーム` の2グループ有効へ切替（top-level Items を有効化）。
- JA: `site-config.js` の `disabledPublicPageKeys` から `items` を除外。
- JA: `site-shell.js` の Itemsサブメニューを `itemHomeFragrance` / `itemBodyCare` の2件に限定し、表示ラベルを `アロマ` / `ハンドクリーム` へ更新。
- JA: `sitemap.html` で top-level `アイテム` の default-disabled を解除し、カテゴリ詳細のアイテム一覧を2件のみに整理。
- EN: Switched Items policy to two active groups (Aroma/Hand Cream) by enabling top-level Items and limiting submenu/sitemap detail entries accordingly.

## 50. 2026-03-28 Draft Page Build (WAtoYO/Aroma/Hand Cream) / 引継ぎ追記
- JA: `brand-watoyo.html` / `item-home-fragrance.html` / `item-body-care.html` を画像資産ベースでドラフト実装。
- JA: 使用画像:
  - WAtoYO: `images/inim-dx_watoyo/WATOYO_WA.png`, `WATOYO_YO.png`, `WATOYO_WAYO.png`
  - Aroma: `images/inim-dx_items/aroma_neroli.png`, `aroma_vanilla.png`, `aroma_musk.png`
  - Hand Cream: `images/inim-dx_items/handcream_rose.png`, `handcream_daphne.png`, `handcream_seablue.png`
- JA: `css/style.css` に共通 `catalog-*` スタイルを追加し、3ページ共通UI（hero/grid/card）を適用。
- EN: Drafted the three requested pages with provided assets and introduced shared `catalog-*` styles for consistent UI across Brand/Item pages.

## 51. 2026-03-28 Product Hero Simplification / 引継ぎ追記
- JA: 3ページ（WAtoYO/Aroma/Hand Cream）のヒーローからCTAボタン2件を削除。
- JA: ヒーロー右側の大画像を削除し、`catalog-hero--single` で1カラム表示へ変更。
- JA: 下段の3商品カード（画像 + 説明）はそのまま維持。
- EN: Simplified all three product-page heroes by removing CTA buttons and right hero image, while keeping the bottom three product cards unchanged.

## 52. 2026-03-28 Parent-only Nav + Top Spacing Tightening / 引継ぎ追記
- JA: グローバルナビの `ブランド` / `アイテム` を親メニュー専用（非リンク）へ変更し、サブメニュー遷移のみへ統一。
- JA: `css/style.css` に対象ページキー別の `main` 上部余白縮小ルール（`padding-top: 12px`）を追加。
- JA: 対象キー: `brandWatoyo`, `itemHomeFragrance`, `itemBodyCare`, `searchProjects`, `searchEvents`, `searchStoreInfo`。
- EN: Converted Brand/Items top-nav entries to parent-only submenu labels and tightened top spacing on requested pages by key-based `main` padding override.

## 53. 2026-03-28 Top-space Correction + Shop Wording / 引継ぎ追記
- JA: 上部余白の未調整箇所を補正するため、対象ページキーの `.section` にも `padding-top` 縮小を適用。
- JA: `Shop` 表記を `Shop` 表記へ更新（`search-shop-info` 見出し、footer title、workshopラベル、shell title）。
- EN: Applied section-level top-padding tightening to fully remove remaining top gap and standardized visible English wording from `Shop` to `Shop`.

## 54. 2026-03-28 Route Rename (search-shop-info) / 引継ぎ追記
- JA: `subpages/search-shop-info.html` を `subpages/search-shop-info.html` へリネーム。
- JA: runtime/sitemap/search-hub/docs 内の参照パスを新URLへ更新し、旧パスは非存在を確認。
- EN: Renamed the route file to `search-shop-info.html` and updated all references across runtime navigation, sitemap, search hub, and docs.







## 56. 2026-04-02 Mojibake Recurrence Recovery (Public Shell)
- EN: Resolved recurrent mojibake in public shell labels (header/global nav/footer).
- EN: Recovery method: restore `js/site-shell.js` from known-good source, then reapply only approved theme-switcher changes.
- EN: Validation: UTF-8 save, mojibake scan (`rg -n -F "\\uFFFD" docs`) no-hit on shell assets, and user confirmation.
- EN: Ongoing rule: perform mojibake + UTF-8 verification after each shell/doc edit task before closure.


## 57. 2026-04-03 Mobile Nav Regression Hotfix / 引継ぎ追記
- JA: モバイルナビ改修後、`header / global nav / footer` が非表示になる重大回帰を確認（Console: `Unexpected token '}' at js/site-shell.js:463`）。
- JA: 原因は `renderMobileNav()` テンプレート断片の重複混入（重複ブロックが構文を破壊）。
- JA: 重複ブロックを除去して `js/site-shell.js` を修正。Issue `2026-04-03-33` を追加し、状態はユーザー再確認待ち（Monitoring）。
- EN: Critical regression found after mobile-nav refactor: shell (`header/global nav/footer`) failed to render due to `Unexpected token '}'` at `js/site-shell.js:463`.
- EN: Root cause was duplicated template code inside `renderMobileNav()`.
- EN: Applied hotfix by removing the duplicate block, logged as Issue `2026-04-03-33`, and set status to Monitoring pending user verification.
