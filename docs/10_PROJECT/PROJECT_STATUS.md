# PROJECT STATUS / inim-dx

## 1. このドキュメントの目的 / Purpose
- このファイルは、`inim-dx` プロジェクトの現在地を第三者でも短時間で把握できるように整理する常設ステータス資料です。
- 管理画面に追加・更新を行った場合は、本ファイルを必ず同じ作業内で更新します。
- 不具合や詰まりの履歴は `docs/10_PROJECT/ISSUE_LIST.md` を必ず参照し、本ファイル更新時も必要に応じて同時更新します。
- 更新後は、日本語の文字化けがないかを必ず確認します。

## 2. 現在の主対象 / Current Focus
- 現在の実装対象は、`inim-dx` の管理画面です。
- 画面仕様の正本:
  - `docs/80_HANDOFF/CROSS_PROJECT_HANDOVER_ADMIN_IMPLEMENTATION.md`
  - `references/design/11-admin-mockup-standalone.html`
- DB 設計の正本:
  - `C:\Users\maxsh\OneDrive\Documents\EDIX\src\portfolio\docs\08-db-design.html`
- Workshop 予約データ設計の補助資料:
  - `docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md`
- Workshop 予約 SQL 実行手順:
  - `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`
- Issue 管理:
  - `docs/10_PROJECT/ISSUE_LIST.md`

## 3. 実装方針 / Implementation Policy
- 公開サイトの既存実装へ影響を出さないことを最優先に進めています。
- そのため、公開サイト用の `css/style.css` は変更しない方針です。
- ただし 2026-03-22 の Workshop 予約導線 Draft 追加では、公開側の導線追加に必要な最小差分として `js/site-shell.js` と `subpages/workshop.html` を更新しています。
- 管理画面は、専用の `js/admin-app.js` と `css/admin-app.css` に分離して実装しています。
- `app/` 配下の HTML は、管理画面専用アセットを参照するための差し替えに限定しています。
- Workshop の予約と問い合わせに関する呼称は、`bookings / enquiries` に統一します。
- 2026-03-22 時点で、Supabase rename migration 実行により DB テーブル名は `bookings`, `booking_status_logs`, `enquiries`, `enquiry_status_logs` に更新済みです。
- 英語表記が必要な場合は、今後 Australian English に統一します。
- 次の主実装は、管理画面の詳細化ではなく、公開側 [`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) の `#reserve` から始まる予約導線設計です。

## 4. ここまでの変更範囲 / Change Scope
#### 新規追加
- `css/admin-app.css`
- `js/admin-app.js`
- `app/pages/journey.html`
- `subpages/workshop-booking.html`
- `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md`
- `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md`
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

## 5. 現在までに実装済みの内容 / Implemented Scope
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

## 6. DB 設計に合わせて確定済みの主な編集項目 / Confirmed DB-aligned Fields
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

## 7. 現在の既知課題 / Known Issues
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
- 導線設定の左右比率微調整は残課題ですが、優先度は Workshop 予約導線設計の後ろに置いています。
- 同時に、画面・docs・コード上の呼称は `bookings / enquiries` へ統一しました。

#### 8. Workshop 予約導線の現状把握
- [`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) の `#reserve` セクションは存在します。
- 2026-03-22 時点では、`予約フォームへ進む` ボタンは [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) を参照するよう更新しました。
- 2026-03-22 の追加入力で、[`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) の各 `予約へ進む` は [`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html) へ遷移し、選択した日時・料金・予約方式を引き継ぐようにしました。
- 同セクションには `デジタル調香を試す` への導線もあり、予約前体験との関係整理が必要です。
- 予約ページ Draft では、上部カレンダーで空き状況を `○ / □ / △ / × / -` で表示し、予約可能日を選ぶと下部に時間帯、集合時間、料金、`予約へ進む` ボタンが表示される構成を作成しました。
- 2026-03-22 の改修で、カレンダー記号は枠線付きではなく記号のみの表示へ調整し、選択中の日付をカレンダー直下にも表示するようにしました。
- 予約ページ下部には、`プラン情報`、`体験の流れ`、`集合場所・体験場所`、`注意事項・その他` の4タブも Draft 実装しています。
- 予約入力 Draft として [`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html) を追加し、`contact_name`, `contact_email`, `contact_phone`, `party_size`, `special_requests` を基準に公開入力項目を整理し始めました。
- 2026-03-22 の調整で、`確認 Draft を表示する` は入力 validity とポリシー同意が揃うまで disabled にし、`参加人数` の縦位置も `電話番号` と揃うようにしました。
- 同日の `file://` 直開きでは、クエリ付き相対遷移でブラウザ警告が出るケースがあったため、予約入力画面への遷移 URL は `new URL()` で組み立てる方式へ変更しました。
- 2026-03-22 の確認結果を受けて、予約入力 Draft の STEP 表示は `STEP 1 = 完了済み`, `STEP 2 = 処理中で強調`, `STEP 3 = 次段階` の見せ方へ調整しました。
- 2026-03-22 の追加実装で、STEP 3 用の確認画面 Draft [`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html) を追加し、STEP 2 の入力値と選択枠を引き継いで確認できるようにしました。
- 2026-03-22 の追加調整で、確認画面から STEP 2 に戻った際も、`contact_name`, `contact_email`, `contact_phone`, `party_size`, `special_requests` を保持したまま再編集できるようにしました。
- 2026-03-22 の追加実装で、STEP 2 の入力 validity check として `contact_name` 必須、`contact_email` 必須 + 形式、`contact_phone` 必須 + 電話番号形式、`party_size` 1〜4名必須選択を実装しました。
- 2026-03-22 の追加調整で、STEP 2 の必須ラベルには赤 `*` を付与し、blur 時に各フィールド下へエラー表示を出すようにしました。電話番号は固定電話 / 携帯電話・IP 電話を判定して桁数を確認し、入力中に `-` を自動整形するようにしました。
- 2026-03-22 の追加調整で、電話番号の局番判定を詳細化し、`03 / 06`、主要な 3 桁市外局番、その他固定電話、`050 / 070 / 080 / 090`、`0120`、`0800`、`0570` を認識して `-` パターンと桁数を出し分けるようにしました。
- 2026-03-22 の追加実装で、STEP 1 → STEP 2 → STEP 3 の遷移時に `date_key`, `Shop`, `storeLabel`, `plan_id`, `session_id` をクエリ引き継ぎするようにしました。
- 2026-03-22 の追加実装で、[`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html) の送信ボタンを Supabase `bookings` 保存へ接続しました。
- 保存時は `user_profiles` を `auth_user_id` で解決して `customer_profile_id` を設定し、`Shops` から店舗名で `store_id` を解決して insert します。
- 保存 payload は `booking_type`, `booked_at`, `participant_count`, `status`, `note` に加え、拡張列 `session_id`, `plan_id`, `quoted_price_jpy`, `booking_method`, `contact_name`, `contact_email`, `contact_phone`, `party_size`, `special_requests`, `internal_note`, `confirmed_at` を設定します（値がない項目は `null`）。
- ログイン未実施やプロフィール不整合時は、確認画面でエラーメッセージを表示し、`account.html#login` への導線を表示します。
- 2026-03-22 の追加調整で、予約導線のキャッシュ判別用に `build=20260322b` をクエリ引き継ぎし、確認画面に `Booking build` 表示を追加しました。
- 2026-03-23 の追加調整で、`store_id` 解決は `Shops` 一覧に対する表記ゆれ吸収マッチ（日本語/英語ヒント、正規化比較）へ変更し、`浅草店が見つからない` エラーの再発を防ぐようにしました。
- 2026-03-23 の追加調整で、`Multiple GoTrueClient instances` 警告を解消するため、`window.__INIM_SUPABASE_CLIENT` による singleton 化を `js/site-shell.js` と確認画面側の両方に適用しました。
- 2026-03-23 のユーザー再確認で、`Booking build: 20260322b`、予約送信成功、予約ID表示あり、Console エラーなしを確認しました。
- 別端末再開時の混乱防止として、`docs/10_PROJECT/WIP.md` に「必須ルール」と「再開ショート手順」を追記済みです。
- `app/` 配下も確認しましたが、2026-03-22 時点では電話番号入力フィールド自体が存在しないため、同ロジックの適用対象はまだありません。今後 `app` 側に電話番号入力を追加する際は、同等の validity と整形を適用する前提とします。
- 2026-03-22 の導線整理で、[`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) の `予約する` と 3 コースの各予約ボタンは、いったんすべて [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) へ統一しました。
- 同日の追加調整で、`workshop.html` の `行き先を選ぶ` で選択した店舗 (`浅草店 / 柴又店 / ソラマチ店`) を `Shop` クエリとして [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) へ引き継ぎ、予約画面側でも選択状態を維持するようにしました。
- DB 追加は不要でした。`workshop_sessions.store_id` と既存 `bookings.store_id` がすでに存在するため、今回は SQL `07_` の新規追加は行っていません。
- 2026-03-22 のユーザー確認で、店舗引き継ぎ、予約画面の店舗選択表示、選択店舗の開催日のみ表示はすべて正常、Console エラーなしを確認しました。
- Reminder: `workshop_plans` / `workshop_sessions` を正本化した後で、予約画面に各プランをどう表示し、どのコースから来たかをどう初期反映するかを再設計すること。
- Workshop 予約のデータ設計案は [`docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md) に整理しました。推奨テーブルは `workshop_plans`, `workshop_plan_inclusions`, `workshop_plan_flow_steps`, `workshop_sessions` です。
- 追加テーブル作成 SQL は [`sql/05_create_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/05_create_workshop_booking_tables.sql) に作成し、検証 SQL は [`sql/06_verify_workshop_booking_tables.sql`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/sql/06_verify_workshop_booking_tables.sql) に作成しました。
- 実行手順は [`docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md) に整理しました。
- 2026-03-22 の実確認で、カレンダー記号は良好、SQL ファイル構成は良好、Runbook も良好でした。
- 同日の検証で、`workshop_plans`, `workshop_plan_inclusions`, `workshop_plan_flow_steps`, `workshop_sessions` の存在確認と、`bookings` 追加列、および関連 index 群の作成確認まで完了しています。
- したがって、次は `bookings / enquiries` の管理画面詳細化ではなく、この公開側予約画面で必要項目を先に確定するのが適切です。

## 8. 次に優先して進める作業 / Next Priorities
1. `PROJECT_STATUS.md` を起点に運用継続する
2. `AI_CONTEXT_PROMPT.md` を復元用コンテキストとして都度更新運用する
3. （完了）[`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) `#reserve` 起点の予約導線整理（`subpages/ex-workshop.html` の予約CTAも `workshop-booking.html` に統一済み）
4. （完了）[`subpages/workshop-booking-entry.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-entry.html) を基に、公開側の必須入力項目と確認フローを確定（確認画面で必須値再検証を追加）
5. `bookings` 保存成功後の完了画面（thanks）導線と、`session_id` / `plan_id` を実データで確定する
6. その後に `app/` 側の `bookings / enquiries` 管理画面詳細化へ進む

## 9. 再開時の確認手順 / Restart Checklist
1. [`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) の `#reserve` セクションを確認する
2. `予約フォームへ進む` が [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) を向いていることを確認する
3. 予約画面 Draft のカレンダー、時間帯表示、詳細タブを確認する
4. 予約画面に必要な入力項目を整理する
5. その整理結果をもとに `bookings / enquiries` の追加項目有無を判断する
6. その後に `app/` 側の詳細画面設計へ進む

## 10. 確認時の報告フォーマット / Reporting Format
- `予約導線の起点:` 確認済み / 未確認
- `現行CTA:` `./workshop-booking.html` / その他
- `Draft UI:` 良好 / 要改善
- `必要入力項目:` 整理済み / 未整理
- `補足:` 必要に応じて詳細
- `Console:` エラーなし / エラーあり

## 11. 参照ドキュメント / References
- `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md`
- `docs/10_PROJECT/WIP.md`
- `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md`
- `docs/10_PROJECT/ISSUE_LIST.md`

## 12. 確認済み事項 / Verified Items
- 公開サイト用の `js/site-shell.js` は、Workshop 予約 Draft 追加に必要な最小差分のみ更新済みです。
- 公開サイト用の `css/style.css` は未変更です。
- 本ファイル更新後、日本語の文字化け確認を行う前提です。

### ドキュメント更新（2026-03-24）
- docs/20_PRODUCT/DESIGN_GUIDELINE.md を追加しました。
- docs/30_TECH/TECH_SPEC.md を追加しました。

### ドキュメント更新（2026-03-24 追記）
- docs/00_GOVERNANCE/DOCUMENTATION_GOVERNANCE_GUIDELINE.md を追加しました。

### ドキュメント更新（2026-03-24 追加）
- docs/80_HANDOFF/AI_BUILD_PROMPT.md を新規作成し、文書運用ガイドラインに合わせて統一しました。
- docs/10_PROJECT/WIP.md をテンプレート統一フォーマットへ更新しました。

### ドキュメント更新（2026-03-24 追加2）
- docs/80_HANDOFF/NEXT_CHAT_HANDOFF.md を統一テンプレートへ更新しました。

### ドキュメント更新（2026-03-24 追加3）
- docs/80_HANDOFF/ACCOUNT_AUTH_SYSTEM_NOTES.md を docs/80_HANDOFF/NEXT_CHAT_HANDOFF.md と同じ見出し粒度（番号付き章）へ整形しました（内容変更なし）。



## 13. ドキュメント更新（2026-03-24 追加4） / Documentation Update
- 指定順で次の文書を整形しました: docs/80_HANDOFF/CROSS_PROJECT_HANDOVER_ADMIN_IMPLEMENTATION.md, docs/80_HANDOFF/AI_CONTEXT_PROMPT.md, docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md, docs/10_PROJECT/PROJECT_STATUS.md, docs/10_PROJECT/ISSUE_LIST.md, docs/30_TECH/SUPABASE_CUSTOMER_ACCOUNT.md。
- prompts/*.md を docs/ 配下へ移動しました。
- 参照パス prompts/... を docs/... へ一括更新しました。
- docs/00_GOVERNANCE/DOCUMENT_CATALOG.md（ドキュメント目録）を新規追加しました。


## 14. 今後の機能追加候補 / Feature Backlog
- 今後の機能追加アイデアは docs/20_PRODUCT/FEATURE_BACKLOG.md を正本として管理します。
- 本ファイルでは、実装優先度が確定した項目のみを 次に優先して進める作業 へ昇格します。
- 現在の主な候補: 
  - コンテンツ更新新機能の充実
  - トップページからワークショップページへの導線強化（着手中）
  - デジタル調香AIレコメンド機能
  - デジタル調香データのDB保存・再利用機能
  - ワークショップ参加/製品購入の相互特典施策


### ドキュメント更新（2026-03-24 追加5）
- docs/20_PRODUCT/FEATURE_BACKLOG.md を新規追加し、今後の機能追加アイデア管理の正本を分離しました。
- docs/10_PROJECT/PROJECT_STATUS.md に 機能追加候補 セクションを追加しました。
- docs/30_TECH/TECH_SPEC.md に Planned Enhancements を追加しました。
- docs/00_GOVERNANCE/DOCUMENT_CATALOG.md に FEATURE_BACKLOG.md を追加しました。


### ドキュメント更新（2026-03-25 追加）
- docs をカテゴリ別サブフォルダ（`00_GOVERNANCE`〜`90_WIP`）へ再編しました。
- `references/settings/checkclist-supabase.md` を `docs/50_OPERATIONS/CHECKLIST_SUPABASE.md` へ移動・名称統一しました。
- `wip/test-workshop.md`, `wip/testing-ws-1.html` を `docs/90_WIP/` 配下へ移動し、WIP文書として標準化しました。
- 主要ドキュメント間の参照パスを新ディレクトリ構成へ更新しました。
- `docs/00_GOVERNANCE/DOCUMENT_CATALOG.md` を新構成に合わせて更新しました。


### ドキュメント更新（2026-03-25 追加2）
- `docs/60_HANDOFF` を `docs/80_HANDOFF` へリネームしました。
- 参照リンク（Markdown内）を `docs/80_HANDOFF/*` へ一括更新しました。
- `docs/60_TEST` を新設しました（今後のテスト計画・テストケース管理用）。
- `docs/00_GOVERNANCE/DOCUMENTATION_GOVERNANCE_GUIDELINE.md` にフォルダ体系更新（60_TEST/80_HANDOFF）とテスト文書更新ルールを反映しました。
- `docs/00_GOVERNANCE/DOCUMENT_CATALOG.md` の Folder Policy に `60_TEST` を追加しました。

### ドキュメント更新（2026-03-25 追加3）
- `wip` に配置していたテンプレート群を `docs/00_GOVERNANCE/TEMPLATES/` へ移動しました。
- `docs/60_TEST` は実テスト成果物（シナリオ/ケース/結果）専用の配置方針を明確化しました。
- `docs/00_GOVERNANCE/DOCUMENT_CATALOG.md` にテンプレート群の目録を追記しました。

### ドキュメント更新（2026-03-25 追加4）
- `test/test-account-result.md` を `docs/60_TEST/ACCOUNT_TEST_RESULT.md` へ移動しました。
- 文字化けを解消し、新ガバナンス準拠（Bilingual/UTF-8/構造化）で再整形しました。
- `docs/00_GOVERNANCE/DOCUMENT_CATALOG.md` に `ACCOUNT_TEST_RESULT.md` を追記しました。

## 15. 作業ステータス再確認（2026-03-25） / Task Status Recheck
1. Workshop予約導線整理（`workshop.html #reserve` 起点）: `Completed`
2. 予約入力必須項目と確認フロー確定: `Completed`
3. 予約完了（Thanks）導線と `session_id` / `plan_id` 実データ確定: `In Progress`（通貨/人数カラム適用とThanks到達を確認。実セッション登録とUUID取得が残タスク）
4. `app/` 側 `bookings / enquiries` 詳細管理: `Not Started`
5. Top -> Workshop 導線強化: `In Progress`
6. コンテンツ更新新機能の充実: `Proposed`
7. デジタル調香AIレコメンド: `Proposed`
8. 調香データ保存・再利用: `Proposed`
9. Workshop x Product 相互特典: `Proposed`
10. Spring Boot/Java API 層追加判断: `On Hold`


### ドキュメント更新（2026-03-25 追加5）
- タスク #1（Workshop予約導線整理）の再確認に基づき、`subpages/ex-workshop.html` の予約CTAを `../index.html#contact` から `./workshop-booking.html` に統一しました。
- `次に優先して進める作業` の 3 番を「完了」表記へ更新しました。

### ドキュメント更新（2026-03-25 追加6）
- ユーザー実施の #1 動作確認結果（All OK / Console エラーなし）を `docs/60_TEST/TEST_PLAN.md` に記録しました。
- `ex-workshop.html` はバックアップ扱いとして、今後は通常変更対象から除外する運用メモを追記しました。


### ドキュメント更新（2026-03-25 追加7）
- タスク #2（予約入力必須項目と確認フロー確定）に対応し、`subpages/workshop-booking-confirm.html` に確認画面側の必須値再検証を追加しました。
- `subpages/workshop-booking-entry.html` は文字化け復旧のため `HEAD` 正常版へ復元し、文言調整は保留としました。
- `作業ステータス再確認` の #2 を `Completed` へ更新しました。
- `次に優先して進める作業` の 4 番を「完了」表記へ更新しました。

### ドキュメント更新（2026-03-25 追加8）
- `subpages/workshop-booking-entry.html` / `subpages/workshop-booking-confirm.html` の文字化けを復旧しました。
- `subpages/workshop-booking-confirm.html` には #2 要件（確認画面側の必須値再検証、`internal_note` の `public_booking` 化）を再適用しました。
- 文字化け事象を `docs/10_PROJECT/ISSUE_LIST.md`（Issue 2026-03-25-17）へ追記しました。

### ドキュメント更新（2026-03-25 追加9）
- `subpages/workshop-booking-entry.html` と `subpages/workshop-booking-confirm.html` の `<style>` を外部CSS `css/workshop-booking-flow.css` へ移動しました。
- 文字化け再発防止として `.editorconfig` を追加し、`charset = utf-8` を全体既定に設定しました。

### ドキュメント更新（2026-03-25 追加10）
- タスク #3 の初期実装として、`subpages/workshop-booking-thanks.html` と `css/workshop-booking-thanks.css` を追加しました。
- `subpages/workshop-booking-confirm.html` の予約送信成功後、予約ID等をクエリ引き継ぎして Thanks 画面へ自動遷移するよう更新しました。

### ドキュメント更新（2026-03-25 追加11）
- Supabase 側に `currency_code` とセッション人数上限/下限を追加する SQL を適用（`07_add_currency_code_and_party_limits.sql`）。検証用 `08_verify_workshop_booking_schema.sql` でカラム/インデックスを確認済み。
- `workshop-booking.html` に Supabase 接続LEDを追加（緑=接続、橙=フォールバック）。接続があってもセッション未登録時はモック表示で暫定稼働。

### 2026-03-26 Update (Workshop 0-row mitigation)
- Added SQL assets for permanent workshop public data bootstrap and verification:
  - `sql/09_seed_workshop_booking_master_and_sessions.sql`
  - `sql/10_workshop_public_read_policies.sql`
  - `sql/11_verify_workshop_public_data.sql`
- New standard sequence for new/empty environments: `05 -> 07 -> 09 -> 11`.
- If diagnostics still shows `Plans=0 / Sessions=0` with Shops visible, run `10 -> 11` to validate read policy exposure.

### 2026-03-26 Update (Booking Management Screen)
- Added full booking management page at `app/pages/workshop.html`.
- Implemented: booking list, keyword search, status filter, method filter, date-range filter, row detail view.
- Implemented update actions: `status` and `internal_note` update to `bookings` table (with `confirmed_at` auto-set when status becomes `confirmed`).
- Added dedicated stylesheet: `css/app-workshop-bookings.css`.

### 2026-03-26 Update (Workshop Page + Slider)
- Externalised inline CSS in `subpages/workshop.html` to `css/workshop.css`.
- Added dedicated plan page `subpages/workshop-plans.html` and rewired "プランを見る" links.
- Added dashboard link from workshop reserve actions to `app/dashboard.html`.
- Fixed top-page slider init timing in `index.html` by combining `DOMContentLoaded` and `site-shell:ready` startup.

### 2026-03-26 Update (Admin-Only Access)
- Enforced admin-only access on `app/dashboard.html` via `js/admin-app.js` access rule.
- Enforced admin-only access on `app/pages/workshop.html` by role resolution (`user_profiles` + `user_role_assignments` + `roles`).
- Non-admin users now receive access denial instead of management data.

### 2026-03-26 Update (Task #2 Completed)
- Added runtime operational checklist for booking Diagnostics/LED in `docs/50_OPERATIONS/CHECKLIST_SUPABASE.md`.
- Added dedicated test scenario for booking runtime data health in `docs/60_TEST/TEST_PLAN.md`.
- This closes Task #2 (LED + booking operational verification flow).

### 2026-03-26 Update (Task #3 In Progress)
- `subpages/workshop-plans.html` now loads active plans from `workshop_plans`.
- Optional inclusion bullets are loaded from `workshop_plan_inclusions` when available.
- Added fallback rendering when Supabase data/config is unavailable.

### 2026-03-26 Update (Admin Link Governance + UI)
- Added admin-only site links (Global Navigation / Side Navi / Footer) via runtime role gating in `js/site-shell.js`.
- Removed admin entry button from public workshop reserve panel.
- Added top-right logo and "Back to main site" link in admin UI (`js/admin-app.js` + `css/admin-app.css`).
- Added non-admin access verification as backlog due unavailable non-admin login test environment.

### 2026-03-26 Update (Workshop Plan Images + Admin Logo Position)
- Added schema migration sql/12_add_workshop_plan_image_url.sql to Shop workshop plan image URL/path in DB.
- Updated seed script sql/09_seed_workshop_booking_master_and_sessions.sql to populate plan_image_url for active plans.
- Rebuilt subpages/workshop-plans.html in clean UTF-8 and bound plan card images to workshop_plans.plan_image_url with fallback images.
- Moved admin logo to left-top brand area (same placement concept as main site) and removed topbar logo duplication.
- 2026-03-26: Updated workshop plans card DOM pattern to match workshop page visual composition while preserving Supabase image binding.
- 2026-03-26: UI adjustment: unified workshop-plan card title typography; updated seeded/default plan images to workshop canonical files; removed `admin-brand__eyebrow` from sidebar header.
- 2026-03-26: `subpages/workshop-booking.html` summary panel (`開催期間/対象店舗/予約方式/料金目安`) switched from static text to runtime DB-derived values (`workshop_sessions`, `Shops`, `workshop_plans`).
- 2026-03-26: Fixed mojibake in `subpages/workshop-booking.html` by rebuilding the page in UTF-8 and removing broken Japanese strings/tags while preserving booking flow IDs and DB summary behavior.
- 2026-03-26: Added admin screen `app/pages/workshop-plans.html` for DB-driven workshop plan management (create/update/delete + inclusion management) and linked it from booking management screen.
- 2026-03-26: Refined `app/pages/workshop-plans.html` visual design to align with `DESIGN_GUIDELINE` tokens (palette, typography, spacing, button/input standards) via `css/app-workshop-plans.css` refresh.
- 2026-03-26: Shared footer Guide first link label changed from `Top` to `サイトマップ` in `js/site-shell.js`.
- 2026-03-26: Created `subpages/sitemap.html` to visualise full site structure (public + admin links) for IA review and quick navigation.
- 2026-03-26: Updated shared footer guide link in `js/site-shell.js` to route `サイトマップ` -> `subpages/sitemap.html`.
- 2026-03-26: Added backlog item `2.12 Breadcrumb Navigation` in `FEATURE_BACKLOG.md` for shared hierarchy cues on public/admin pages.
- 2026-03-26: Task #3 hardening update applied to booking completion flow.
  - JA: `subpages/workshop-booking-confirm.html` で送信前の予約枠プリフライト検証（`session_id`/`plan_id` 必須、`workshop_sessions` + `workshop_plans` 実データ再確認、満席/非公開/非active プランの送信ブロック）を追加。
  - EN: Added pre-submit booking-slot preflight validation in `subpages/workshop-booking-confirm.html` (required `session_id`/`plan_id`, live revalidation against `workshop_sessions` + `workshop_plans`, and blocking on full/unpublished/non-active plan states).
  - JA: 送信 payload は確認時の実データ（方式、価格、日時、人数範囲）を優先採用し、`bookings` 保存の整合性を強化。
  - EN: Submit payload now prioritises live-confirmed values (method, price, date-time, party-size range) to improve `bookings` write consistency.
  - JA: 公開側 UI 文言を Draft 表現から本番向け表現へ更新（entry/confirm/thanks）、完了画面のステータス表示を利用者向けラベル化。
  - EN: Updated public booking UI copy from draft phrasing to production-ready messaging (entry/confirm/thanks), and mapped thanks-page status text to user-facing labels.
  - JA: `subpages/workshop-booking.html` の Supabase client 生成を singleton 化し、クライアント重複生成リスクを低減。
  - EN: Switched `subpages/workshop-booking.html` Supabase client creation to singleton to reduce duplicate client-instance risk.
- 2026-03-26: Task #3 UX conversion tuning applied on Step 1 (`subpages/workshop-booking.html` + `css/workshop-booking.css`).
  - JA: カレンダー選択から予約枠確認への次アクションを強化するため、選択バーCTAを Primary 化し、文言を「次に何をするか」が明確な内容へ更新。
  - EN: Strengthened the next-action from calendar selection to slot confirmation by promoting the selection-bar CTA to Primary and rewriting copy for clearer action intent.
  - JA: 選択可能日・店舗チップ・予約枠カードの hover/selected 視認性を改善し、クリック判断をしやすく調整。
  - EN: Improved hover/selected visibility on selectable days, Shop chips, and slot cards to reduce click hesitation.
  - JA: 凡例をタグ化し、選択バーを sticky 表示（モバイルでは通常表示）にして、スクロール中でも予約導線を維持。
  - EN: Converted legend into tag-style pills and made the selection bar sticky (reverted to static on mobile) to keep conversion guidance visible during scroll.
- 2026-03-26: Booking calendar IA updated to 1-month navigation + right-side selected-date context (`subpages/workshop-booking.html` + `css/workshop-booking.css`).
  - JA: カレンダー表示を 1か月単位へ変更し、`<` / `>` で前月・翌月へ移動できるUIを追加（境界月ではボタン無効）。
  - EN: Changed calendar rendering to a single-month view and added `<` / `>` month navigation controls with boundary-state disabling.
  - JA: カレンダー右側に `Selected Date` パネルを追加し、選択日・店舗・状態・料金目安を常時表示。
  - EN: Added a right-side `Selected Date` panel to continuously show selected date, Shop, status, and indicative price.
  - JA: 日付選択に連動して表示月が自動追従し、`この日程の予約枠を見る` CTA で下部の予約枠へ遷移可能。
  - EN: Month view now auto-syncs with selected date, and a dedicated CTA (`この日程の予約枠を見る`) links users directly to slot selection.
- 2026-03-26: Duplicate UI cues in booking step were consolidated for clarity.
  - JA: 下段パネル側の `Selected Date` 表示（見出し重複）を削除し、右側 `Selected Date` パネルを正本表示として統一。
  - EN: Removed duplicated `Selected Date` cues in the lower panel and unified context display into the right-side `Selected Date` panel.
  - JA: `予約枠を確認する` と `この日程の予約枠を見る` の重複CTAを解消し、後者1つへ統一。
  - EN: Removed duplicated CTAs (`予約枠を確認する` and `この日程の予約枠を見る`) and standardised on a single CTA flow.
- 2026-03-26: Admin UX/flow improvement started (Dashboard + Booking Operations).
  - JA: `js/admin-app.js` に `Operations Home` を追加し、`Today's Bookings / Tomorrow / Pending Requests / Stale Pending (>24h) / Unassigned Enquiries` の運用指標カードを実装。
  - EN: Added `Operations Home` in `js/admin-app.js` with operational KPI cards for `Today's Bookings / Tomorrow / Pending Requests / Stale Pending (>24h) / Unassigned Enquiries`.
  - JA: ダッシュボード指標から `app/pages/workshop.html?quick=...` へ遷移できる運用ショートカットを追加し、優先対応キューへ直接到達可能にした。
  - EN: Added direct shortcuts from dashboard metrics to priority queues via `app/pages/workshop.html?quick=...`.
  - JA: `app/pages/workshop.html` に quick-filter tabs（`all/today/tomorrow/pending/stale_pending`）と URL クエリ連動を追加。
  - EN: Added quick-filter tabs (`all/today/tomorrow/pending/stale_pending`) with URL query sync in `app/pages/workshop.html`.
  - JA: 予約一覧に `Contact` と `SLA` 列を追加し、`pending/requested/in_progress` の経過時間（Overdue判定）を可視化。
  - EN: Added `Contact` and `SLA` columns to booking list with elapsed-time/overdue visibility for `pending/requested/in_progress`.
  - JA: 詳細パネルにステータス即時更新ボタン（In Progress / Confirmed / Cancelled）と内部メモテンプレートチップを追加し、更新操作を短縮。
  - EN: Added quick status actions (In Progress / Confirmed / Cancelled) and internal-note template chips in detail panel to shorten update flow.
- 2026-03-26: Admin IA follow-up adjustment (navigation + enquiry link intent).
  - JA: ダッシュボードのサイドナビへ `Workshop予約管理`（`app/pages/workshop.html`）と `Workshopプラン管理`（`app/pages/workshop-plans.html`）を追加。
  - EN: Added `Workshop予約管理` (`app/pages/workshop.html`) and `Workshopプラン管理` (`app/pages/workshop-plans.html`) to dashboard side navigation.
  - JA: （当時）`Unassigned Enquiries` は専用画面未実装のため `Publish` を暫定導線として運用。
  - EN: (At that time) `Unassigned Enquiries` temporarily routed to `Publish` before a dedicated screen was implemented.
- 2026-03-26: Dedicated enquiries admin screen implemented.
  - JA: `app/pages/enquiries.html` と `css/app-enquiries.css` を新規追加し、問い合わせ一覧・詳細・更新（status / assigned_to / internal note）を管理画面で完結できるようにした。
  - EN: Added `app/pages/enquiries.html` and `css/app-enquiries.css` to provide a dedicated admin workflow for enquiry list/detail/update (`status / assigned_to / internal note`).
  - JA: quick tabs（`all/unassigned/open/stale_open`）と URL クエリ連動（`?quick=...`）を実装し、優先キューへ直接遷移可能にした。
  - EN: Implemented quick tabs (`all/unassigned/open/stale_open`) with URL query sync (`?quick=...`) for direct priority-queue access.
  - JA: `Unassigned Enquiries` カードの遷移先を `app/pages/enquiries.html?quick=unassigned` へ変更し、Publish 暫定導線を解消。
  - EN: Rewired `Unassigned Enquiries` card to `app/pages/enquiries.html?quick=unassigned`, removing the temporary Publish dependency.
  - JA: `app/pages/workshop.html` と `app/pages/workshop-plans.html` のヘッダーリンクに `Enquiries` を追加し、運用導線を相互接続。
  - EN: Added `Enquiries` header links in `app/pages/workshop.html` and `app/pages/workshop-plans.html` to improve cross-screen operations flow.


### ドキュメント更新（2026-03-26 追加4）
- 管理画面の `app/pages/workshop.html` / `app/pages/workshop-plans.html` / `app/pages/enquiries.html` を `app/pages/home.html` と同じアプリシェル構成（`data-page-key` + `#page-main` + `js/admin-app.js`）へ統一しました。
- 3画面の実装ロジックは `js/admin-workshop-page.js` / `js/admin-workshop-plans-page.js` / `js/admin-enquiries-page.js` へ分離し、サイドナビ付きレイアウト内で描画する方式に変更しました。
- `js/admin-app.js` は `appPagesWorkshop` / `appPagesWorkshopPlans` / `appPagesEnquiries` 用の専用ホストを描画するよう更新しました。
### ドキュメント更新（2026-03-26 追加5）
- 管理画面 `appPagesWorkshop` / `appPagesWorkshopPlans` / `appPagesEnquiries` で本文が空表示になる不具合を修正しました。
- 原因は `js/admin-app.js` の再描画でページホストが再生成され、専用ページJSで生成したDOMが消えることでした。
- `js/admin-app.js` の `render()` 後に `admin:render` イベントを発火し、各ページJSが再描画後に再マウントする方式へ変更しました。
- 対象JS: `js/admin-app.js`, `js/admin-workshop-page.js`, `js/admin-workshop-plans-page.js`, `js/admin-enquiries-page.js`.
### ドキュメント更新（2026-03-26 追加6）
- `app/pages/enquiries.html` の2カラム比率を調整し、一覧カラム幅を狭めて詳細パネル領域を拡張しました（`css/app-enquiries.css`）。
- `app/pages/workshop-plans.html` のUIスタイルを `app/pages/workshop.html` と同系統へ統一しました（パネル、テーブル、入力、ボタン、余白体系を同様の設計へ変更）。
- 対象ファイル: `css/app-workshop-plans.css`, `css/app-enquiries.css`.
### ドキュメント更新（2026-03-26 追加7）
- Enquiries 画面の一覧領域が依然広いという運用フィードバックを反映し、2カラム比率を再調整しました。
- `css/app-enquiries.css` の `.eq-grid` を `minmax(520px, 0.82fr) minmax(460px, 1.18fr)` へ変更し、詳細パネル優先の横幅配分にしています。
### ドキュメント更新（2026-03-26 追加8）
- Enquiries の一覧/詳細2カラム幅を、Workshop Bookings と同一比率へ統一しました。
- `css/app-enquiries.css` の `.eq-grid` を `1.4fr .9fr` に変更し、運用画面間の視覚・操作一貫性を優先しました。
### ドキュメント更新（2026-03-26 追加9）
- Enquiries 画面で画面幅を超えて右側が欠ける事象を修正しました。
- `css/app-enquiries.css` に overflow-safe のグリッド指定（`minmax(0, ...)`）と `min-width: 0` を追加し、フィルタ行および2カラム本文の横はみ出しを抑制しました。
- 詳細パネルの長いID文字列でレイアウトが押し広がらないよう、`.eq-kv span` に `overflow-wrap: anywhere` を追加しました。
### ドキュメント更新（2026-03-26 追加10）
- Admin hardening Phase 2 の第1スライスとして、`06 Enquiries` にページング・列ソート・フィルタ状態保持を追加しました。
- 追加内容:
  - テーブル列ソート（ID / Created / Status / Category / Subject / Assigned / SLA）
  - ページング（Prev/Next、ページ情報、1ページ件数 10/20/50/100）
  - quick/filter/sort/page size の localStorage 保持（`admin_enquiries_preferences_v1`）
  - quick tab の URL クエリ同期（`?quick=...`）
  - 空結果時・取得失敗時のテーブル内メッセージ表示
- 対象ファイル: `js/admin-enquiries-page.js`, `css/app-enquiries.css`.
### ドキュメント更新（2026-03-26 追加11）
- Admin hardening Phase 2 の第2スライスとして、`04 Workshop Bookings` と `05 Workshop Plans` にページング・列ソート・状態保持を追加しました。
- `04 Workshop Bookings` 追加内容:
  - 列ソート（ID / Booked At / Status / Contact / Shop / Party / SLA）
  - ページング（Prev/Next、ページ情報、Rows 10/20/50/100）
  - quick/filter/sort/page size の localStorage 保持（`admin_workshop_bookings_preferences_v1`）
  - quick tab の URL クエリ同期（`?quick=...`）
  - 空結果/取得失敗時のテーブルメッセージ表示
- `05 Workshop Plans` 追加内容:
  - 列ソート（Code / Name / Status / Sort）
  - ページング（Prev/Next、ページ情報、Rows 10/20/50/100）
  - sort/page size の localStorage 保持（`admin_workshop_plans_preferences_v1`）
  - 空結果/取得失敗時のテーブルメッセージ表示
- 対象ファイル: `js/admin-workshop-page.js`, `js/admin-workshop-plans-page.js`, `css/app-workshop-bookings.css`, `css/app-workshop-plans.css`.
### ドキュメント更新（2026-03-26 追加12）
- 公開サイトの重複ナビ問題に対応し、サイドナビを機能フラグで無効化（既定OFF）しました。
- 追加フラグ: `js/site-config.js` の `enablePublicSideNav`。
  - `false`（既定）: サイドナビ非表示、グローバルナビ中心運用
  - `true`: 旧サイドナビ構成へ即時ロールバック可能
- グローバルナビ強化:
  - `aria-current="page"` 付与で現在ページのアクセシビリティを改善
  - 浮遊ナビの compact 状態（`is-compact`）を追加し、スクロール時の占有面積を縮小
  - サイドナビOFF時のモバイル余白補正（左余白過大の解消）
- 対象ファイル: `js/site-shell.js`, `css/style.css`, `js/site-config.js`.
### ドキュメント更新（2026-03-26 追加13）
- 公開ヘッダーの左上表示をテキストからロゴへ変更しました（`images/logo/logo-inim-dx.png`）。
- notice bar の左テキスト（配送・返品・お支払い...）を削除し、導線リンクのみ表示に変更しました。
- グローバルナビを drilldown 対応へ刷新し、子メニューを既存サイドナビ構成（group items）から抽出して表示するようにしました。
- グローバルナビ改善内容:
  - top-level + child current state 表示
  - submenu toggle（開閉）と outside click / Esc でのクローズ
  - `aria-current="page"` の維持
- rollback: `js/site-config.js` の `enablePublicSideNav: true` で旧サイドナビを即時復帰可能です。
- 対象ファイル: `js/site-shell.js`, `css/style.css`, `js/site-config.js`.
### ドキュメント更新（2026-03-26 追加14）
- グローバルナビの drilldown 表示をクリック主導から hover 展開中心へ調整しました（Desktop）。
- モバイルでは従来どおりトグルで開閉できるよう、`category-nav__toggle` を 980px 以下で表示する構成にしています。
- グローバルナビの可読性向上として、トップレベル項目を太字化し、中央寄せに統一しました。
- 対象ファイル: `css/style.css`.
### ドキュメント更新（2026-03-26 追加15）
- グローバルナビの hover drilldown で、親メニューから子メニューへマウス移動時にフォーカスが切れて閉じる問題を修正しました。
- `css/style.css` にて dropdown の縦ギャップを縮小（`top: calc(100% + 2px)`）し、`has-children` 項目に hover bridge（透明領域）を追加しました。
- これにより、親→子へのポインタ移動中でも hover 状態を維持できるようにしています。
### ドキュメント更新（2026-03-26 追加16）
- 管理画面のデモ公開要件に対応するため、`js/site-config.js` に `adminAccessMode` フラグを追加しました。
- 値は2モードです。
  - `open_demo`: 未ログイン含む全ユーザーが管理画面（`app/dashboard.html`, `app/pages/*`）へアクセス可能
  - `admin_only`: 従来どおりログイン必須 + ロール制御
- 現在値はデモ用途で `adminAccessMode: 'open_demo'` に設定しています。
- `js/admin-workshop-page.js` / `js/admin-workshop-plans-page.js` / `js/admin-enquiries-page.js` の未ログイン時強制リダイレクトを、`open_demo` 時はバイパスするよう更新しました。
- `js/admin-app.js` では既存の `adminAccessMode` 分岐により、`open_demo` 時はサイドナビ表示と保護ページ表示を許可し、`admin_only` に戻すと即時ロックダウンできます。
- EN: Added switchable admin access mode via `adminAccessMode` in `js/site-config.js`.
  - `open_demo`: allow access to admin pages without login (for demo)
  - `admin_only`: require login and role-based access control
- EN: Current setting is `open_demo` for demo use, and can be rolled back by changing only config value.
### ドキュメント更新（2026-03-26 追加17）
- 公開ヘッダーのグローバルナビ `Admin` メニュー表示をロール依存から常時表示へ変更しました。
- `js/site-shell.js` の `renderAdminLinks()` を更新し、未ログイン時でも `Admin` を表示します。
- `Admin` は他メニューと同じ `.category-nav__item > a` 構造で描画するようにし、見た目・挙動を統一しました。
- `app/*` ページ表示時は `Admin` に `is-current` を付与します。
- EN: Updated global navigation to always show `Admin` regardless of login/role state.
- EN: Admin nav item now uses the same `.category-nav__item` structure as other top-level menus and keeps current-state highlight on `app/*` pages.
### ドキュメント更新（2026-03-26 追加18）
- `open_demo` で未ログイン時に `Workshop Bookings` / `Enquiries` の一覧が0件表示になる事象へ対処しました。
- 原因: 画面アクセスは許可されても、Supabase RLS のためデータ取得時に authenticated セッションが必要なケースがあるため。
- 対応: `js/admin-app.js` と `js/admin-workshop-page.js` / `js/admin-workshop-plans-page.js` / `js/admin-enquiries-page.js` で、`open_demo` かつ未ログイン時に `supabase.auth.signInAnonymously()` を試行する処理を追加。
- これにより、匿名認証が有効な環境では authenticated セッションを確立して一覧取得できるようになります。
- EN: Fixed zero-record behavior in `open_demo` when logged off by adding anonymous-auth bootstrap before admin data queries.
- EN: In environments where Supabase anonymous auth is enabled, pages can now establish an authenticated session and load booking/enquiry records.
### ドキュメント更新（2026-03-26 追加19）
- `open_demo` で `Workshop Bookings / Enquiries` が `0/0` になる原因を確認しました。
- 原因: Supabase publishable key（anon）で `bookings` / `enquiries` を直接確認した結果、HTTP 200 かつ `[]`（RLSにより非表示）でした。
- 対応として、デモ専用の read policy SQL を追加しました。
  - `sql/13_admin_demo_read_policies.sql`（適用）
  - `sql/14_revert_admin_demo_read_policies.sql`（ロールバック）
- これにより、デモ環境では未ログインでも `bookings` / `enquiries` 一覧を表示可能にできます（適用後）。
- EN: Confirmed root cause of `0/0` was RLS visibility (`200 []` for `bookings/enquiries` via publishable key).
- EN: Added demo-only policy scripts to enable/rollback read access:
  - `sql/13_admin_demo_read_policies.sql`
  - `sql/14_revert_admin_demo_read_policies.sql`
### ドキュメント更新（2026-03-26 追加20: open_demo から admin_only への戻し手順）
- JA: デモ終了後に保護モードへ戻す標準手順（順番厳守）
  1. Supabase SQL Editor で `sql/14_revert_admin_demo_read_policies.sql` を実行（demo read policy を削除）
  2. `js/site-config.js` の `adminAccessMode` を `open_demo` から `admin_only` へ変更
  3. ブラウザをハードリロードしてキャッシュを破棄
  4. 未ログインで `app/dashboard.html` / `app/pages/workshop.html` / `app/pages/enquiries.html` を開き、`app/login.html` へリダイレクトされることを確認
  5. 管理者ログイン後は従来どおりデータ表示・更新できることを確認
- EN: Standard rollback procedure from demo-open mode to secure admin-only mode (strict order):
  1. Run `sql/14_revert_admin_demo_read_policies.sql` in Supabase SQL Editor.
  2. Change `adminAccessMode` in `js/site-config.js` from `open_demo` to `admin_only`.
  3. Hard-refresh browser cache.
  4. Verify logged-off access to admin pages redirects to `app/login.html`.
  5. Verify admin users can still view/update data after login.

### 2026-03-27 (Planned Slice) / 本日予定スライス
- JA: 本日の実装は公開予約 Step 1（`subpages/workshop-booking.html`）の文言/導線の微調整に限定する。
- EN: Today’s implementation is limited to micro-tuning of wording/guidance in public booking Step 1 (`subpages/workshop-booking.html`).
- JA: DB仕様、SQL、`bookings` 保存ロジック、管理画面機能は変更しない。
- EN: No changes to DB spec, SQL, `bookings` save logic, or admin features.
- JA: 受入条件は `docs/10_PROJECT/WIP.md` の `4B. Acceptance Criteria (Today)` を正本とする。
- EN: Acceptance criteria source of truth is `4B. Acceptance Criteria (Today)` in `docs/10_PROJECT/WIP.md`.

### 2026-03-27 (Step 1 UX Micro-tuning) / 公開予約 Step 1 微調整
- JA: subpages/workshop-booking.html の Step 1 表示文言を整理し、文字化け表示が混在していた箇所を利用者向け文言へ統一しました（Hero/summary/availability/Shop/selected-date/legend/slot intro）。
- EN: Standardised Step 1 user-facing copy in subpages/workshop-booking.html, replacing corrupted display fragments with clear booking wording (Hero/summary/availability/Shop/selected-date/legend/slot intro).
- JA: css/workshop-booking.css の .booking-selected-date__cta.is-disabled を調整し、非活性状態の判別を明確化しました。
- EN: Tuned .booking-selected-date__cta.is-disabled in css/workshop-booking.css for clearer disabled-state affordance.
- JA: 変更範囲は公開予約 Step 1 の表示/視認性のみ。DB仕様、SQL、`bookings` 保存処理、管理画面機能は未変更です。
- EN: Scope is limited to public booking Step 1 display/usability only; DB spec, SQL, `bookings` save logic, and admin features are unchanged.


### 2026-03-27 (Admin UX Step4) / Enquiries 1クリック更新
- JA: js/admin-enquiries-page.js の data-quick-status ボタン操作を、status選択のみから『status設定 + 即時submit』へ変更しました。
- EN: Updated data-quick-status actions in js/admin-enquiries-page.js from status-only selection to set status + immediate submit.
- JA: これにより Enquiries 詳細パネルで Mark In Progress / Mark Responded / Mark Closed が1クリックで更新完了します。
- EN: This enables one-click completion for Mark In Progress / Mark Responded / Mark Closed in Enquiries detail panel.
- JA: 変更範囲は管理画面 Enquiries の操作UXのみで、DB仕様・SQL・公開側UIには影響しません。
- EN: Scope is limited to admin Enquiries operation UX; no DB spec, SQL, or public UI impact.
- 2026-03-27: Enquiries quick-status compatibility fix applied. After setting status by quick button, submit is triggered via requestSubmit() or submit-event fallback (dispatchEvent) to avoid non-submit/revert behavior in some browsers.
- 2026-03-27: Added admin save guard for anonymous demo sessions (read-only message) in enquiries/workshop pages, and added quick-status submit fallback for browser compatibility.

### 2026-03-27 Update (Admin UI Stability)
- Save persistence in `open_demo` anonymous mode remains deferred (read-only behavior).
- Admin sidebar visibility/overlay fix applied for pages 04/05/06.
- Admin asset version updated to `20260327c` for revalidation.

- 2026-03-27: Admin sidebar visibility issue resolved and user-verified (20260327c confirmed working).

- 2026-03-27: Added explicit read-only UI in admin anonymous demo mode; saving requires login. (Enquiries/Workshop, version 20260327d)

- 2026-03-27: Localized admin operation button labels (04/06) to Japanese and standardized action-button shape/style according to design guideline.

### 2026-03-27 追加更新（Admin 05 UI/Visibility）
- `app/pages/workshop-plans.html` / `js/admin-workshop-plans-page.js` / `css/app-workshop-plans.css` を 04/06 と同じ運用UI方針へ調整しました。
- ボタンラベルを日本語化し、ボタン形状（44px高/10px角丸/同一タイポ）を統一しました。
- `open_demo` 匿名セッションでは 05 を閲覧専用化し、保存・削除・追加操作を無効化しました。
- 管理画面アセット版を `20260327i` へ更新しました。
- 2026-03-27 follow-up: page 05 read-only判定を強化し、未ログイン（demo guest）では常に保存系ボタンを無効化。無効状態の見た目も明示化。asset: 20260327j
- 2026-03-27 Step5: 04/05/06 の文言を日本語へ統一（pager/detail/message）し、read-only無効状態の見た目を統一。asset: 20260327k
- 2026-03-27 Step2: 04/06 に 05 と同じ厳格な書込判定を適用（未ログイン開始 or anonymous provider は保存不可/read-only）。asset: 20260327l

- 2026-03-27: FEATURE_BACKLOG 2.13 added to review site structure and refine IA/navigation hierarchy.
### ドキュメント更新（2026-03-28 追加21）
- `docs/20_PRODUCT/FEATURE_BACKLOG.md` の状態見直しを実施し、以下を `Accepted` へ更新しました。
  - `2.6 Admin Access Restriction + Booking LED Governance`
  - `2.7 Dashboard Link Exposure`
- 根拠:
  - `app/dashboard.html` / `app/pages/workshop.html` の管理側アクセス制御実装
  - `docs/50_OPERATIONS/CHECKLIST_SUPABASE.md` / `docs/60_TEST/TEST_PLAN.md` での LED 運用確認
  - 公開導線から `app/dashboard.html` への遷移導線実装と検証記録
- 併せて `2.2 Top -> Workshop Flow Reinforcement` の当日スライス（第1弾）を実装。
  - `index.html` Hero に `ワークショップを予約する` CTA を追加
  - `index.html` Experience Banner に `プランを比較する` / `予約枠を確認する` CTA を追加
  - `index.html` Journey セクションに 3ステップ導線ショートカット（STEP1/2/3）を追加
  - `css/style.css` に `.journey__actions` を追加し、モバイル縦積みへ対応
- EN: Reclassified backlog items `2.6` and `2.7` to `Accepted` based on implemented controls and verification history.
- EN: Started `2.2` in-progress work (slice-1) by strengthening Top-to-Workshop conversion CTAs on `index.html` and adding responsive styling in `css/style.css`.
### ドキュメント更新（2026-03-28 追加22）
- 公開予約ページの `Data Diagnostics` パネルを既定で非表示にしました（ユーザー表示から除外）。
- 制御フラグを追加:
  - `js/site-config.js` -> `showBookingDiagnostics: false`（既定）
- `subpages/workshop-booking.html` では、診断値は内部更新しつつ、`showBookingDiagnostics !== true` の場合はパネルを表示しません。
- 必要時は `showBookingDiagnostics: true` に変更すると診断パネルを再表示できます。
- EN: Hid public booking `Data Diagnostics` panel by default for cleaner UI.
- EN: Added config flag `showBookingDiagnostics` (default `false`) to toggle panel visibility when troubleshooting is needed.
### ドキュメント更新（2026-03-28 追加23）
- 公開予約ページ上部に残っていた `WORKSHOP BOOKING` ストリップを削除しました（診断UIの視覚露出を完全に抑制）。
- Supabase 接続 LED は `booking-hero` 領域へ移動し、Hero の kicker 行で表示する構成へ変更しました。
- 変更ファイル:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- EN: Removed the remaining top strip and moved the Supabase LED into the `booking-hero` kicker area.
- EN: Diagnostics panel remains hidden by default and no longer leaves visible header artifacts.
### ドキュメント更新（2026-03-28 追加24）
- `2.2 Top -> Workshop Flow Reinforcement` の第2スライスとして、`subpages/workshop.html` に中段意思決定ブロック（`#decision`）を追加しました。
- 追加内容:
  - 「迷ったら、ここから次の一歩」セクションを追加
  - `プランを比較する` / `空き枠を確認する` / `店舗を選んで進む` の3アクション導線を明示
  - `空き枠を確認する` は `data-booking-link="true"` で既存の店舗クエリ引継ぎロジックに接続
- `css/workshop.css` に `workshop-decision` 系スタイルを追加し、Desktop/Mobile で崩れないレイアウトへ調整しました。
- EN: Implemented `2.2` slice-2 by adding a mid-page decision block (`#decision`) on `subpages/workshop.html` with three clear next actions.
- EN: Added responsive `workshop-decision` styling in `css/workshop.css`, and connected booking CTA to existing Shop-query handoff logic.
### ドキュメント更新（2026-03-28 追加25）
- Workshop 中段 `#decision` ブロックの第3ボタン（`店舗を選んで進む` / `button--ghost`）が背景同化して見えにくい問題を修正しました。
- `css/workshop.css` に `workshop-decision` 専用の `button--ghost` コントラスト上書きを追加し、通常/hover/focus の視認性を改善しました。
- 影響範囲は `workshop-decision` セクション内のみで、共通 `.button--ghost` 仕様は維持しています。
- EN: Fixed low-contrast visibility issue of the third decision CTA (`button--ghost`) by adding a scoped override in `css/workshop.css`.
- EN: Change is isolated to `workshop-decision` and does not alter global ghost-button behavior.
### ドキュメント更新（2026-03-28 追加26）
- `2.8 Workshop Plan Page Formalisation` の実装を継続し、`subpages/workshop-plans.html` に比較操作UIを追加しました。
- 追加内容:
  - クイックフィルタ（`すべて / 短時間で体験 / じっくり体験 / ペア・ギフト向け`）
  - 並び順セレクト（`おすすめ順 / 価格が低い順 / 所要時間が短い順`）
  - 下部CTA `空き枠を確認して予約へ進む`
  - 各プラン予約リンクに `planId` クエリ引継ぎを追加（既存 `planCode` / `planName` に加えて受け渡し）
- `css/workshop.css` へ `workshop-plan-controls` / `workshop-plan-cta` のレスポンシブスタイルを追加しました。
- EN: Continued `2.8` by adding formal comparison controls to `subpages/workshop-plans.html` (quick filters, sort selector, bottom booking CTA) and passing `planId` in booking handoff query.
- EN: Added responsive styles for plan controls/CTA in `css/workshop.css`.
### ドキュメント更新（2026-03-28 追加27）
- `2.8 Workshop Plan Page Formalisation` の次スライスとして、`subpages/workshop-booking.html` にプラン引継ぎ反映を実装しました。
- 追加内容:
  - URLクエリ `planId/plan_id`（優先）・`planCode/plan_code`・`planName/plan_name` を解析
  - 一致プランがある場合、`workshop_sessions` を該当 `plan_id` で絞り込み表示
  - 予約サマリーに `選択プラン` 行を追加し、選択状態を明示
  - 価格目安は選択プラン基準で表示
  - 既存互換として `Shop` / `storeLabel` クエリも維持
- EN: Implemented plan-handoff consumption on `subpages/workshop-booking.html` by resolving `planId` (with code/name fallbacks), filtering sessions by selected plan, and surfacing selected-plan context in summary.
- EN: Backward compatibility for Shop query handoff remains intact.
### ドキュメント更新（2026-03-28 追加28）
- `2.8 Workshop Plan Page Formalisation` の追加スライスとして、`subpages/workshop-booking.html` に「選択中プラン」コンテキストバーを追加しました。
- 追加内容:
  - `選択中プラン` の明示表示（一致時はプラン名、不一致時は `指定プラン不一致`）
  - `プランを変更する`（`workshop-plans.html` へ戻る）
  - `全プランを表示`（`planId/planCode/planName` 系クエリを除去して同ページ再表示）
- 目的:
  - プラン選択後の予約画面で、ユーザーが迷わず「変更/解除」できる戻り導線を提供し、離脱を減らす。
- 変更ファイル:
  - `subpages/workshop-booking.html`
- `css/workshop-booking.css`
- EN: Added a booking-page “selected plan” context bar as another `2.8` slice.
- EN: Users can now change plan (back to plans page) or clear plan filters (reload booking without `plan*` query params), improving plan-to-booking continuity.
### ドキュメント更新（2026-03-28 追加29）
- `docs/20_PRODUCT/FEATURE_BACKLOG.md` の `In Progress` 項目を再点検し、実装反映済みの以下を `Accepted` に更新しました。
  - `2.8 Workshop Plan Page Formalisation`
  - `2.10 Workshop Plan/Course Management IA Optimisation`
  - `2.11 Sitemap Page Creation + Footer Link Finalisation`
- 根拠:
  - 2.8: `subpages/workshop-plans.html` 比較UI + `planId` 引継ぎ + `subpages/workshop-booking.html` 側の受け取り/解除導線実装
  - 2.10: 管理サイドナビの `Workshop予約管理` / `Workshopプラン管理` 常設、公開予約サマリーの動的表示化、導線配置方針の明文化
  - 2.11: `subpages/sitemap.html` 作成済み、フッター `サイトマップ` が同ページへ接続済み
- あわせて、導線配置ルールを以下へ追記し、運用正本を明確化しました。
  - `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
- `docs/30_TECH/TECH_SPEC.md`
- EN: Re-audited in-progress backlog items and promoted `2.8`, `2.10`, and `2.11` to `Accepted` based on delivered implementation and documented navigation governance.
- EN: Added explicit placement/governance rules to `DESIGN_GUIDELINE.md` and `TECH_SPEC.md` to prevent future IA drift.
### ドキュメント更新（2026-03-28 追加30）
- `2.2 Top -> Workshop Flow Reinforcement` の第3スライスとして、`subpages/workshop-booking-thanks.html` の完了後導線を強化しました。
- 追加内容:
  - ステータス別案内文を追加（`pending / confirmed / cancelled`）
  - 次アクションブロックを追加し、完了後の再行動を明示
  - `同じ条件で別日程を探す` ボタンを追加し、`Shop/storeLabel/planName` を引継いで `workshop-booking.html` へ再遷移
  - `プラン比較ページへ戻る` ボタンを追加
- 変更ファイル:
  - `subpages/workshop-booking-thanks.html`
  - `css/workshop-booking-thanks.css`
- EN: Implemented `2.2` slice-3 by improving post-booking completion guidance on `workshop-booking-thanks.html`.
- EN: Added status-specific guidance plus next-step CTAs, including rebooking with carried `Shop/storeLabel/planName` context.
### ドキュメント更新（2026-03-28 追加31）
- `2.2 Top -> Workshop Flow Reinforcement` の第4スライスとして、`index.html` に予約ショートカットブロックを追加し、Top 直下から予約意図を強化しました。
- 追加内容:
  - Hero CTA 優先順位を予約中心に再構成（`予約枠を今すぐ確認する` を primary）
  - Hero 直下に `Booking Shortcut` ブロックを追加
  - `空き枠を確認する` / `プラン比較から始める` / `ワークショップ詳細を見る` の3導線を固定配置
  - 店舗開催情報と「比較から予約へ遷移可能」の補助文言を追加
- 変更ファイル:
  - `index.html`
  - `css/style.css`
- EN: Implemented `2.2` slice-4 by adding a dedicated booking shortcut block under Top hero and reprioritising hero CTAs toward booking.
- EN: Added three clear entry routes (check slots / compare plans / view workshop detail) to reduce decision friction from Top.
### ドキュメント更新（2026-03-28 追加32）
- Topページの CTA 視認性改善として、`#hero-banner` / `journey` / `booking-shortcut` の ghost ボタン配色を `workshop.html #decision` と同系統へ調整しました。
- 変更内容:
  - 薄背景 + 濃色テキスト + 明確な境界線へ変更
  - hover/focus 時は accent 色で強調
- 対象ファイル:
  - `css/style.css`
- 目的:
  - 背景同化による「ボタンが見えにくい」問題を解消し、Top からの導線認知を改善
- EN: Improved CTA visibility on Top page by aligning ghost-button color scheme in `#hero-banner`, `journey`, and `booking-shortcut` with the `workshop.html #decision` style.
- EN: This resolves low-contrast/invisible button appearance on light backgrounds.
### ドキュメント更新（2026-03-28 追加33）
- 公開ナビの公開範囲調整として、未準備ページへのリンクを一時無効化しました。
- 変更内容:
  - Global Navi で以下を無効化: `ブランド` / `アイテム` / `香りから探す` / `記事` / `Sale` / `実店舗`
  - Footer の `Guide` / `Support` で `サイトマップ` 以外を無効化
  - 無効リンクは `aria-disabled="true"` と視覚スタイル（低コントラスト + 非活性カーソル）を適用
- 対象ファイル:
  - `js/site-shell.js`
  - `css/style.css`
- EN: Temporarily disabled links to not-ready pages in public navigation.
- EN: Disabled top-level global nav categories (except Home / 香りと遊ぶ / Admin) and footer Guide/Support links except `サイトマップ`, with `aria-disabled` and disabled visual states.
### ドキュメント更新（2026-03-28 追加34）
- ヘッダー上部の `ショッピングガイド / お問い合わせ` ストリップ（notice bar）を削除しました。
- フッター `Guide` に `ショッピングガイド` を追加し、他の準備中リンクと同様に disabled 表示へ統一しました。
- フッター `Account` の `お問い合わせ` は運用導線として有効なまま維持しています。
- 対象ファイル:
- `js/site-shell.js`
- EN: Removed the top notice strip (`ショッピングガイド / お問い合わせ`) for cleaner header structure.
- EN: Added a disabled `ショッピングガイド` entry in footer `Guide` while keeping footer `お問い合わせ` active.
### ドキュメント更新（2026-03-28 追加35）
- 未準備ページリンクの追加調整として、`検索`（utility header）と `お問い合わせ`（footer Account）を disabled 化しました。
- これにより、公開側の未実装導線は `サイトマップ` を除き一時停止状態となります。
- 併せて、`docs/20_PRODUCT/FEATURE_BACKLOG.md` に `2.14 Create All Placeholder Pages` を追加しました。
  - 優先バックログ完了後に、未実装ページを優先順で1ページずつ作成する方針です。
- 対象ファイル:
  - `js/site-shell.js`
  - `css/style.css`
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- EN: Additionally disabled `Search` (utility header) and `Contact` (footer Account) until pages are ready.
- EN: Added backlog item `2.14 Create All Placeholder Pages` to build non-ready pages one by one after prioritized backlog completion.
### ドキュメント更新（2026-03-28 追加36）
- 追加調整として、utility header 右上の `カート` を disabled 化しました（未実装ページ導線の停止）。
- `FEATURE_BACKLOG` の `2.14 Create All Placeholder Pages` scope に `cart/contact` を明示追加しました。
- 対象ファイル:
  - `js/site-shell.js`
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- EN: Disabled top-right `Cart` link in utility header until page readiness.
- EN: Explicitly added `cart/contact` into backlog item `2.14` scope for phased page creation later.
### ドキュメント更新（2026-03-28 追加37）
- `2.2 Top -> Workshop Flow Reinforcement` の第5スライスとして、`subpages/workshop-booking.html` に 3ステップ進行表示を追加しました。
- 追加内容:
  - `STEP 1 日付と時間帯を選ぶ`（current）
  - `STEP 2 申込情報を入力する`
  - `STEP 3 確認して送信する`
- 目的:
  - 予約開始画面（Step1）で全体の流れを先に提示し、途中離脱を減らす
- 変更ファイル:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- EN: Implemented `2.2` slice-5 by adding a clear 3-step progress strip to `subpages/workshop-booking.html` (Step 1 current, Step 2 input, Step 3 confirm).
- EN: This improves user orientation at the start of booking and clarifies the path to completion.
### ドキュメント更新（2026-03-28 追加38）
- `2.2 Top -> Workshop Flow Reinforcement` の第6スライスとして、店舗コンテキスト引継ぎを強化しました。
- 追加内容:
  - `subpages/workshop.html` で店舗選択時、`プランを見る / プランを選ぶ / プランを比較する` へも `Shop/storeLabel` クエリを引継ぎ
  - `subpages/workshop-plans.html` で `Shop/storeLabel` を受け取り、各 `このプランで予約する` と下部CTAの遷移先へ再引継ぎ
  - プラン一覧ステータス行に `Shop: {storeLabel}` を併記して文脈を可視化
- 変更ファイル:
  - `subpages/workshop.html`
  - `subpages/workshop-plans.html`
- EN: Implemented `2.2` slice-6 by preserving selected-Shop context across `workshop -> plans -> booking`.
- EN: Shop query params are now passed through plan links and booking CTAs to reduce context loss during comparison flow.
### ドキュメント更新（2026-03-28 追加39）
- Topページの導線視認性改善として、CTA配置を再調整しました。
- 変更内容:
  - Hero の3ボタンを同幅グリッドへ変更し、縦位置を揃えて整列表示
  - `Booking Shortcut` の補足情報を横並びレイアウトへ変更
  - `Journey` の導線ボタンをカード外共通帯から各STEPカード直下へ移設し、カード幅いっぱいで表示
- 変更ファイル:
  - `index.html`
  - `css/style.css`
- EN: Improved Top-page CTA readability by aligning hero buttons in equal-width grid, switching booking-shortcut meta to horizontal layout, and moving journey actions under each step card with full card width.
### ドキュメント更新（2026-03-28 追加40）
- TopページUIの追加調整として、以下を修正しました。
- 変更内容:
  - Hero CTA を横並びから縦積み配置へ変更（`予約枠を今すぐ確認する / プランを比較する / 先にデジタル調香を試す`）
  - Experience Flow（Journey）の `STEP 1` ボタン（ghost）が背景に埋もれる問題を修正し、Experience Banner と同系統の視認性ルールへ統一
- 対象ファイル:
  - `css/style.css`
- EN: Applied follow-up Top-page UI refinements: hero CTAs are now vertically aligned, and Journey Step-1 ghost button contrast is aligned with Experience Banner style for consistent visibility.
### ドキュメント更新（2026-03-28 追加41）
- `2.2 Top -> Workshop Flow Reinforcement` の第7スライスとして、完了画面からの再予約導線で `plan_id` を保持するよう改善しました。
- 変更内容:
  - `subpages/workshop-booking-confirm.html` から Thanks 遷移時に `plan_id` / `Shop` / `storeLabel` を追加引継ぎ
  - `subpages/workshop-booking-thanks.html` の `同じ条件で別日程を探す` で `planId` を優先付与し、プラン一致精度を向上
- 対象ファイル:
  - `subpages/workshop-booking-confirm.html`
  - `subpages/workshop-booking-thanks.html`
- EN: Implemented `2.2` slice-7 by preserving `plan_id` through confirm -> thanks and reusing it in rebook CTA (`planId`), improving exact plan preselection.
### ドキュメント更新（2026-03-28 追加42）
- `subpages/workshop-booking.html` の `選択中プラン` コンテキストバー表示条件を見直しました。
- 変更内容:
  - 有効な `selectedPlan` が存在する場合のみ表示
  - 不一致/未解決時はバー自体を非表示（`-` や不一致文言を表示しない）
- 目的:
  - ユーザーに不要な疑問を与える中間状態表示を避け、表示意味を明確化
- 対象ファイル:
  - `subpages/workshop-booking.html`
- EN: Refined plan-context bar visibility on booking page: show only when a valid selected plan exists; hide it for unresolved/mismatch states to avoid confusing UI.
### ドキュメント更新（2026-03-28 追加43）
- `subpages/workshop-booking.html` のサマリー `選択プラン` 表示を、上記バー表示方針と整合させました。
- 変更内容:
  - 不一致クエリ時の `指定プラン不一致（全体表示）` 文言を廃止
  - `selectedPlan` 解決不可時は常に `未指定` を表示
- 目的:
  - バー非表示時にサマリーだけ不一致表示になるズレをなくし、解釈負荷を削減
- 対象ファイル:
  - `subpages/workshop-booking.html`
  - `docs/60_TEST/TEST_PLAN.md`
- EN: Aligned summary behavior with the plan-context-bar rule: removed mismatch wording and now show `Unspecified` when no valid selected plan is resolved.
### ドキュメント更新（2026-03-28 追加44）
- `subpages/workshop-booking.html` の `選択中プラン` 表示条件を追加調整しました。
- 変更内容:
  - `selectedPlan` が存在しても `plan_name` が空 / `-` / `未指定` の場合は、コンテキストバーを非表示に統一
  - サマリー `選択プラン` も同条件で `未指定` 表示へ統一
- 目的:
  - `選択中プラン: -` のような見かけ上の表示漏れを防止し、意図しない可視状態を解消
- 対象ファイル:
  - `subpages/workshop-booking.html`
- EN: Added a stricter visibility guard for selected-plan UI: hide context bar when plan name is empty/`-`/`Unspecified`, and keep summary as `Unspecified` for those placeholder states.
### ドキュメント更新（2026-03-28 追加45）
- `選択中プラン` バーが残存表示する事象に対して、非表示制御を二重化しました。
- 変更内容:
  - JS: `plan_name` 判定を拡張（`-` だけでなく `ー/－/–/—` などダッシュ系プレースホルダーも非表示対象）
  - JS: 非表示時に `hidden=true` に加え `style.display='none'` と `aria-hidden='true'` を明示
  - CSS: `.booking-plan-context[hidden] { display: none !important; }` を追加
- 目的:
  - ブラウザ差分・スタイル競合があっても `選択中プラン` バーが確実に消えるようにする
- 対象ファイル:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- EN: Added a defensive double-lock for selected-plan context bar hiding (stronger placeholder detection + explicit JS/CSS hidden enforcement) to prevent residual visibility.
### ドキュメント更新（2026-03-28 追加46）
- `選択中プラン` バー内の `プランを変更する` ボタン位置を右寄せに調整しました。
- 変更内容:
  - `.booking-plan-context__actions` に `margin-left: auto; justify-content: flex-end;` を追加
- 目的:
  - ボタンをバー右端へ揃え、視線誘導と操作位置の一貫性を改善
- 対象ファイル:
  - `css/workshop-booking.css`
- EN: Right-aligned the `Change Plan` button inside the selected-plan context bar for cleaner action placement.
### ドキュメント更新（2026-03-28 追加47）
- `選択中プラン` バーの右寄せをさらに安定化しました。
- 変更内容:
  - `.booking-plan-context` を `grid`（`1fr + auto`）へ変更し、操作領域の配置を明示
  - `.booking-plan-context__actions` に `justify-self: end` を追加
  - モバイル時（`max-width: 720px`）は `1カラム` へ戻し、既存の全幅ボタン挙動を維持
- 目的:
  - 画面幅やテキスト長によって右寄せが崩れるケースを防止
- 対象ファイル:
  - `css/workshop-booking.css`
- EN: Stabilized right alignment by converting plan-context layout to explicit grid placement while preserving full-width mobile actions.
### ドキュメント更新（2026-03-28 追加48）
- `選択中プラン` バーで、`プランを変更する` を最右端に固定するため、アクションDOM順を見直しました。
- 変更内容:
  - `subpages/workshop-booking.html` のアクション順を `全プランを表示` -> `プランを変更する` に変更
  - 併せて本件を `docs/10_PROJECT/ISSUE_LIST.md` に記録（Issue `2026-03-28-28`）
- 目的:
  - `button--ghost` が見えにくい環境でも、`プランを変更する` の右端配置を視覚的に保証
- 対象ファイル:
  - `subpages/workshop-booking.html`
  - `docs/10_PROJECT/ISSUE_LIST.md`
- EN: Reordered plan-context actions so `Change Plan` is always the rightmost control, and recorded this as Issue `2026-03-28-28` for traceability.
### ドキュメント更新（2026-03-28 追加49）
- `2.2 Top -> Workshop Flow Reinforcement` の第8スライスとして、Plans/Booking に共通の「次アクション」固定CTAを追加しました。
- 変更内容:
  - `subpages/workshop-plans.html` に fixed `workshop-sticky-next` を追加（`予約枠を確認する`）
  - `subpages/workshop-booking.html` に fixed `booking-sticky-next` を追加（有効日付選択時のみ表示）
  - `css/workshop.css` / `css/workshop-booking.css` に Desktop/Mobile 用固定CTAスタイルを追加
  - 主要導線文言を `空き枠` から `予約枠` へ統一（Top/Workshop/Plans）
- 目的:
  - 比較中・日付選択中のどちらの状態でも、次アクションを常時視認できるようにして離脱を減らす
- 対象ファイル:
  - `subpages/workshop-plans.html`
  - `subpages/workshop-booking.html`
  - `subpages/workshop.html`
  - `index.html`
  - `css/workshop.css`
  - `css/workshop-booking.css`
- EN: Implemented `2.2` slice-8 by adding sticky “next action” CTAs on Plans/Booking and normalizing key copy to `予約枠` wording for consistency.
### ドキュメント更新（2026-03-28 追加50）
- `workshop.html` の PROGRAM パネルから booking へ遷移した際に `選択プラン` が反映されない問題を修正しました。
- 変更内容:
  - PROGRAMカードの予約ボタンに `data-plan-code` / `data-plan-name` を付与
  - `syncBookingLinks()` で `planCode/planName` クエリを明示引継ぎ（Shop/storeLabel と同時に付与）
  - 既存クエリ汚染を避けるため、plan系クエリを毎回再生成
- 目的:
  - `workshop-plans.html` 経由と同等に、PROGRAMパネル経由でも booking の `選択プラン` を安定表示する
- 対象ファイル:
  - `subpages/workshop.html`
- EN: Fixed missing selected-plan context when navigating from `workshop.html` PROGRAM cards to booking by explicitly passing `planCode/planName` in booking-link sync.
### ドキュメント更新（2026-03-28 追加51）
- Issue `2026-03-28-29` の恒久対策として、`workshop.html` PROGRAM セクションを DB連動へ移行しました。
- 変更内容:
  - 静的3カードを廃止し、`workshop_plans` から `status=active` を `sort_order` 昇順で最大3件表示
  - `workshop_plan_inclusions` を先頭3件までカード内表示
  - CTA は `data-plan-code/name` を持ち、store選択連動時に `planCode/planName + Shop/storeLabel` を同時引継ぎ
  - 見出しを「3つのコース」固定文言から、DB件数に追従しやすい文言へ調整
- 目的:
  - PROGRAM経由と plans経由の予約導線を同一データソース化し、`選択プラン` 反映不整合を防止
- 対象ファイル:
  - `subpages/workshop.html`
  - `docs/10_PROJECT/ISSUE_LIST.md`
- EN: Implemented the permanent fix for Issue `2026-03-28-29` by making `workshop.html` PROGRAM cards DB-driven (up to 3 active plans), aligning plan handoff behavior with `workshop-plans.html`.
### ドキュメント更新（2026-03-28 追加52）
- ユーザー確認結果を反映し、Issue の状態を更新しました。
- 更新内容:
  - Issue `2026-03-28-28`: `解消済み（ユーザー確認済み）` へ変更
  - Issue `2026-03-28-29`: `解消済み（ユーザー確認済み）` へ変更
- 対象ファイル:
  - `docs/10_PROJECT/ISSUE_LIST.md`
- EN: Reflected user verification and closed Issues `2026-03-28-28` and `2026-03-28-29` as resolved.
### ドキュメント更新（2026-03-28 追加53）
- `2.12 Breadcrumb Navigation` の実装有無を再確認し、状態を更新しました。
- 確認結果:
  - 公開側: `js/site-shell.js` で `page-breadcrumb` を共通描画（`aria-label="breadcrumb"`）
  - 管理側: `js/admin-app.js` で `admin-breadcrumb` を描画（`aria-label="パンくず"`）
  - スタイル: `css/style.css` / `css/admin-app.css` に対応スタイルあり
- 更新内容:
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md` の `2.12` を `Proposed` -> `Accepted` へ変更
- EN: Re-verified breadcrumb implementation on both public/admin shells and promoted backlog item `2.12` from `Proposed` to `Accepted`.
### ドキュメント更新（2026-03-28 追加54）
- `2.13 Site Structure Review + IA Refinement` に着手し、IA整合の第1スライス（taxonomy alignment）を適用しました。
- 変更内容:
  - `js/site-shell.js` のトップレベル表記を統一（`Sale` -> `セール`）
  - breadcrumb 親子判定の `sale` グループから `itemSale` を除外し、カテゴリ重複を解消
  - `subpages/sitemap.html` を runtime ナビ構造に合わせて再編
    - `公開ナビ（トップレベル）`
    - `ワークショップ予約導線`
    - `公開ページ（カテゴリ詳細）`
    - `サポート / アカウント`
    - `管理画面`
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md` の `2.13` を `In Progress` に更新
- 目的:
  - 実際のナビ構造とサイトマップ分類のズレを縮小し、探索時の認知負荷を下げる
- 対象ファイル:
  - `js/site-shell.js`
  - `subpages/sitemap.html`
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- EN: Started `2.13` and delivered slice-1 taxonomy alignment by normalizing top-level labels and restructuring sitemap groups to mirror runtime navigation.
### ドキュメント更新（2026-03-28 追加55）
- `2.13` 第2スライスとして、footer taxonomy と disabled-link 運用を共通ポリシー化しました。
- 変更内容:
  - `js/site-shell.js` に `disabledPublicPageKeys` を追加し、公開未準備ページの非活性判定を一元化
  - `renderPublicPageLink()` / `renderDisabledTextLink()` を追加し、Footer/Sidebar/Account 再描画のリンク生成を統一
  - Footer 内の `Guide` / `Support` / `Account` をページキー連動で描画し、disabled 表示ルールを統一
  - Sidebar の standalone（`ショッピングガイド`）初期描画も同じ disabled ポリシーに統一
- 目的:
  - 画面やログイン状態によって disabled 表示がぶれる問題を防止し、IA運用ルールを実装へ固定化
- 対象ファイル:
  - `js/site-shell.js`
- EN: Delivered `2.13` slice-2 by centralizing disabled-link policy and unifying footer/sidebar/account link rendering behavior.
### ドキュメント更新（2026-03-28 追加56）
- `2.13` 第3スライスとして、ワークショップ導線ページキーとパンくず階層の整合性を改善しました。
- 変更内容:
  - `subpages/workshop-plans.html` の `data-page-key` を `workshop` から `workshopPlans` へ修正
  - `js/site-shell.js` の `pages` 定義に `workshopPlans` / `workshopBookingThanks` を追加
  - Workshop系ラベルを予約導線に合わせて調整（`予約枠選択` / `申込情報入力` / `予約内容確認` / `予約完了`）
  - breadcrumb / current-top-level 判定へ `workshopPlans` / `workshopBookingThanks` を追加
  - `香りと遊ぶ` の子メニューへ `プラン比較` を追加
- 目的:
  - workshop フロー内で現在地（パンくず・ナビ current 状態）が実ページと一致するようにする
- 対象ファイル:
  - `js/site-shell.js`
  - `subpages/workshop-plans.html`
- EN: Delivered `2.13` slice-3 by fixing workshop flow page-key registration and breadcrumb/nav-state consistency across Plans/Booking/Thanks.
### ドキュメント更新（2026-03-28 追加57）
- `workshop-booking` に、最小構成の floating 予約ショートカットパネルを追加しました。
- 変更内容:
  - 既存の sticky CTA を再設計し、テキスト説明を廃止して `タイトル + 2ボタン` 構成へ変更
  - 表示要素を `予約する` / `空き枠を確認する` / `プランを比較する` に統一
  - デスクトップは右下固定のミニパネル、モバイルは下部ドック表示へ調整
  - 日付選択時は第1ボタン文言のみ `◯◯ の予約枠を確認する` に更新
- 目的:
  - 画面占有を抑えながら、予約導線の次アクションを常時明示する
- 対象ファイル:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- EN: Added a compact floating reservation shortcut panel on `workshop-booking` with title + two action buttons, optimized for desktop and mobile.
### ドキュメント更新（2026-03-28 追加58）
- 浮動CTAの視認性改善と、`workshop.html` の予約導線配置を更新しました。
- 変更内容:
  - `workshop-booking` の floating パネル幅を拡張し、ボタン文言を折返し可能に調整（長い日付文言でも欠けない）
  - `workshop.html` で下部予約ボタン群を廃止し、`予約する` ミニフローティングCTA（`予約フォームへ進む` / `デジタル調香を試す`）へ移行
  - モバイルでは下部ドック表示を維持
- 目的:
  - CTAの可読性向上と、ページ下部までスクロールしなくても予約導線へアクセスできる構成にする
- 対象ファイル:
  - `css/workshop-booking.css`
  - `subpages/workshop.html`
  - `css/workshop.css`
- EN: Improved floating CTA readability (wider, multiline-safe buttons) and moved Workshop reservation actions from bottom section to a persistent floating panel.
### ドキュメント更新（2026-03-28 追加59）
- `2.13` 第4スライスとして、サイトマップのラベル整合と公開準備状態の可視化を実施しました。
- 変更内容:
  - `subpages/sitemap.html` のトップレベル先頭ラベルを runtime ナビに合わせて `Home` へ統一
  - 公開未準備ページに `準備中` マーカーを追記（ブランド/アイテム/香りから探す/記事/セール/実店舗、Support配下各種）
  - `css/style.css` に sitemap 用 `small` マーカーの表示スタイルを追加
- 目的:
  - ナビ実装とサイトマップ表記の差異を減らし、利用者に公開状態を明示する
- 対象ファイル:
  - `subpages/sitemap.html`
  - `css/style.css`
- EN: Delivered `2.13` slice-4 by aligning sitemap labels with runtime navigation and surfacing coming-soon states via clear badges.
### ドキュメント更新（2026-03-28 追加60）
- `2.13` 第5スライスとして、管理画面導線の命名統一とアクセスモード可視化を実装しました。
- 変更内容:
  - `subpages/sitemap.html` 管理カード内の名称を `Workshop予約管理 / Workshopプラン管理` から `ワークショップ予約管理 / ワークショッププラン管理` へ統一
  - 管理カード見出しに `adminAccessMode` 連動のステータスバッジを追加（`open_demo` / `admin_only`）
  - 説明文も `adminAccessMode` に応じて切替表示し、現在のデモ公開状態を明示
  - `css/style.css` に admin-access バッジのモード別スタイルを追加
- 目的:
  - サイトマップ上で管理導線の命名とアクセス制御状態を即時に理解できるようにする
- 対象ファイル:
  - `subpages/sitemap.html`
  - `css/style.css`
- EN: Delivered `2.13` slice-5 by normalizing admin naming in sitemap and adding live `adminAccessMode` visibility badges/notes.
### ドキュメント更新（2026-03-28 追加61）
- `2.13` 第6スライスとして、sitemap のリンク挙動を runtime の disabled ポリシーに合わせました。
- 変更内容:
  - `subpages/sitemap.html` の公開未準備リンク（トップレベル + Support群）に `is-disabled` / `aria-disabled="true"` / `tabindex="-1"` を付与
  - `css/style.css` に sitemap 向け disabled 表示（非活性配色・ポインタ無効化）を追加
- 目的:
  - sitemap 上でも「準備中」ページは誤遷移を防ぎ、実運用のナビ挙動と一貫させる
- 対象ファイル:
  - `subpages/sitemap.html`
  - `css/style.css`
- EN: Delivered `2.13` slice-6 by making coming-soon sitemap links non-interactive and visually consistent with runtime disabled-link behavior.
### ドキュメント更新（2026-03-28 追加62）
- `2.13` 第7スライスとして、sitemap disabled 判定を実行時ポリシー化しました。
- 変更内容:
  - `subpages/sitemap.html` に `disabledPageFiles` 判定を追加し、対象リンクへ `is-disabled` / `aria-disabled` / `tabindex` を動的適用
  - 非対象リンクは属性を除去し、有効リンクとして維持
  - 既存の `adminAccessMode` バッジ切替ロジックと同じ初期化ブロック内で実行
- 目的:
  - sitemap 側の手動マーク漏れを減らし、runtime disabled 方針とのズレを抑制する
- 対象ファイル:
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-7 by making sitemap disabled-link state policy-driven at runtime to reduce drift.
### ドキュメント更新（2026-03-28 追加63）
- `2.13` 第8スライスとして、公開未準備ページポリシーの設定値を単一化しました。
- 変更内容:
  - `js/site-config.js` に `disabledPublicPageKeys` を追加し、公開未準備ページ定義を設定化
  - `js/site-shell.js` の disabled 判定を設定参照へ変更（未設定時は既定値フォールバック）
  - `subpages/sitemap.html` も同設定を参照し、キー -> ファイル変換で disabled 対象を判定
- 目的:
  - runtime ナビと sitemap の disabled 対象を同一ソースで管理し、運用中のズレを防止する
- 対象ファイル:
  - `js/site-config.js`
  - `js/site-shell.js`
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-8 by centralizing disabled public-page policy in `site-config.js` and wiring both runtime nav and sitemap to the same source.
### ドキュメント更新（2026-03-28 追加64）
- `2.13` 第9スライスとして、sitemap の disabled 判定を `data-page-key` 基準へ統一しました。
- 変更内容:
  - `subpages/sitemap.html` の公開リンクへ `data-page-key` を付与
  - disabled 判定を `href(ファイル名)` ベースから `data-page-key` ベースへ変更
  - 手動の disabled 属性ハードコードを除去し、実行時ポリシー適用へ一本化
- 目的:
  - リンクURL変更時でも disabled 判定が壊れにくい構成にし、`site-shell.js` のキー体系と整合させる
- 対象ファイル:
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-9 by switching sitemap disable logic to `data-page-key` matching, removing brittle filename-based coupling.
### ドキュメント更新（2026-03-28 追加65）
- `2.13` 第10スライスとして、sitemap の `準備中` マーカー表示も設定ポリシー連動へ統一しました。
- 変更内容:
  - `subpages/sitemap.html` の実行時判定で、disabled 対象のみ `small(準備中)` を表示
  - enabled 対象へ切り替わったリンクは、`準備中` マーカーを自動非表示
- 目的:
  - `disabledPublicPageKeys` 変更時に、リンク状態と `準備中` 表示の不整合を防止する
- 対象ファイル:
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-10 by making `coming soon` badge visibility policy-driven alongside disabled-link state.
### ドキュメント更新（2026-03-28 追加66）
- `2.13` 第11スライスとして、sitemap の `準備中` マーカーを実行時生成へ移行しました。
- 変更内容:
  - disabled リンクでは `small(準備中)` を存在チェックして表示・未存在時は自動追加
  - enabled リンクでは `small` マーカーを DOM から除去
  - `準備中` 文言をスクリプト側で標準化
- 目的:
  - HTML 側の手動マーカー編集依存を減らし、設定変更時の表示ズレを防止する
- 対象ファイル:
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-11 by generating/removing `coming-soon` badges at runtime based on policy state.
### ドキュメント更新（2026-03-28 追加67）
- `2.13` 第12スライスとして、sitemap マークアップから静的 `準備中` バッジを除去しました。
- 変更内容:
  - `subpages/sitemap.html` の policy 対象リンクから手動 `<small>準備中</small>` を削除
  - `準備中` 表示は slice-11 で導入済みの実行時ロジックに一本化
- 目的:
  - HTML の手動保守点を減らし、表示状態を設定ポリシー起点へ統一
- 対象ファイル:
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-12 by removing static coming-soon badge markup and relying fully on runtime policy rendering.
### ドキュメント更新（2026-03-28 追加68）
- `2.13` 第13スライスとして、`準備中` バッジ文言を設定値化しました。
- 変更内容:
  - `js/site-config.js` に `comingSoonBadgeLabel` を追加（既定値: `準備中`）
  - `subpages/sitemap.html` のバッジ生成ロジックを設定参照へ変更
- 目的:
  - バッジ文言変更時にスクリプト改修を不要化し、運用設定で調整可能にする
- 対象ファイル:
  - `js/site-config.js`
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-13 by externalizing the coming-soon badge label into site config.
### ドキュメント更新（2026-03-28 追加69）
- `2.13` 第14スライスとして、`disabledPublicPageKeys` の設定値解釈を堅牢化しました。
- 変更内容:
  - `js/site-shell.js` で設定配列を正規化（trim / 重複除去 / 未知キー除外）してから適用
  - `subpages/sitemap.html` でも同様に正規化して policy 判定へ適用
  - 有効な設定キーが空になる場合は既定リストへフォールバック
- 目的:
  - 設定ミス（空白混入・重複・typo）で disabled 判定が不安定になるリスクを低減する
- 対象ファイル:
  - `js/site-shell.js`
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-14 by sanitizing/validating `disabledPublicPageKeys` before applying policy in shell and sitemap.
### ドキュメント更新（2026-03-28 追加70）
- `2.13` 第15スライスとして、sitemap 側の disabled fallback をマークアップ起点へ移行しました。
- 変更内容:
  - `subpages/sitemap.html` の対象リンクに `data-default-disabled="true"` を付与
  - sitemap スクリプト内の固定 fallback 配列を廃止し、`data-default-disabled` 付きリンクから既定リストを生成
  - 設定値（`disabledPublicPageKeys`）は sitemap 内で利用可能な `data-page-key` に対してのみ適用
- 目的:
  - sitemap 固有の重複定義を減らし、リンク追加/変更時のメンテナンス負荷を下げる
- 対象ファイル:
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-15 by replacing hardcoded sitemap fallback keys with markup-driven defaults (`data-default-disabled`).
### ドキュメント更新（2026-03-28 追加71）
- `2.13` 第16スライスとして、sitemap 管理アクセス表示文言を設定値化しました。
- 変更内容:
  - `js/site-config.js` に `sitemapAdminAccessCopy`（badgePrefix/openDemoNote/adminOnlyNote）を追加
  - `subpages/sitemap.html` の admin モード表示で固定文言を廃止し、設定値（未設定時は既定値）を参照
- 目的:
  - デモ説明文や表記調整を設定変更のみで反映できるようにし、運用時の修正コストを削減
- 対象ファイル:
  - `js/site-config.js`
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-16 by externalizing sitemap admin-access badge/note copy into site config.
### ドキュメント更新（2026-03-28 追加72）
- `2.13` 第17スライスとして、sitemap の admin access mode 表示ロジックを堅牢化しました。
- 変更内容:
  - `adminAccessMode` が想定外値の場合は `admin_only` へ正規化して扱う
  - バッジ描画前に mode クラス（`open-demo/admin-only`）を初期化してから再付与
- 目的:
  - 設定値ゆらぎや将来的な切替順序変更があっても、表示クラスの残留や誤表示を防止する
- 対象ファイル:
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-17 by normalizing unknown admin mode values and resetting badge mode classes before rendering.
### ドキュメント更新（2026-03-28 追加73）
- `2.13` 第18スライスとして、sitemap ポリシースクリプトを整理・共通化しました。
- 変更内容:
  - `readText` / `unique` ヘルパーを追加し、文言/配列正規化処理の重複を削減
  - fallback 既定文言を `defaults` オブジェクトへ集約
  - disabled キーの集合生成を簡素化
- 目的:
  - sitemap スクリプトの保守性を上げ、設定追加時の実装ミスを減らす
- 対象ファイル:
  - `subpages/sitemap.html`
- EN: Delivered `2.13` slice-18 by refactoring sitemap runtime policy script for maintainability.
### ドキュメント更新（2026-03-28 追加74）
- `2.13` 第19スライスとして、トップレベルナビの disabled 判定を設定ポリシーと同期しました。
- 変更内容:
  - `js/site-shell.js` の `disabledGlobalNavKeys` を固定配列から動的導出へ変更
  - `disabledPublicPageKeys` のうちトップレベル対象キーのみを抽出して適用
- 目的:
  - 設定変更時に、トップナビと sitemap/footer の disabled 状態が乖離しないようにする
- 対象ファイル:
  - `js/site-shell.js`
- EN: Delivered `2.13` slice-19 by deriving top-level nav disabled keys from the shared config policy.
### ドキュメント更新（2026-03-28 追加75）
- `2.13 Site Structure Review + IA Refinement` を完了と判断し、バックログ状態を `Accepted` へ更新しました。
- 完了判定の要点:
  - sitemap / runtime ナビ / disabled policy / admin mode 表示の整合が取れた
  - 設定起点（`site-config.js`）で主要ポリシーが管理可能になった
- 更新内容:
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md` の `2.13` を `In Progress` -> `Accepted` へ更新
- EN: Closed `2.13` as `Accepted` after completing IA alignment and policy centralization across public sitemap/runtime navigation.
### ドキュメント更新（2026-03-28 追加76）
- `2.14 Create All Placeholder Pages` に着手し、優先順の第1実装として `香りから探す` ハブページを実装しました。
- 変更内容:
  - `subpages/scent-search.html` に Japanese-first の検索UI（キーワード + カテゴリフィルタ + 結果リスト）を追加
  - 結果リストは現行導線ページ（店舗情報/読み物/イベント/ワークショップ/予約/プラン/デジタル調香/サイトマップ）への遷移を提供
  - `css/style.css` に `scent-search-*` スタイル群を追加（レスポンシブ含む）
  - `js/site-config.js` の `disabledPublicPageKeys` から `scentSearch` を除外し、公開ナビ導線を有効化
  - `js/site-shell.js` の default disabled リストからも `scentSearch` を除外
  - `subpages/sitemap.html` の `scentSearch` から `data-default-disabled` を除外
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md` の `2.14` を `Proposed` -> `In Progress` に更新
- 目的:
  - 「香りから探す」導線を placeholder 状態から最小実装へ進め、検索起点で関連ページへ移動できる状態を作る
- 対象ファイル:
  - `subpages/scent-search.html`
  - `css/style.css`
  - `js/site-config.js`
  - `js/site-shell.js`
  - `subpages/sitemap.html`
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- EN: Started `2.14` and delivered the first page (`scent-search`) with a keyword/filter/list search hub, while enabling `scentSearch` in shared navigation policy.
### ドキュメント更新（2026-03-28 追加77）
- `2.14 Create All Placeholder Pages` の第2実装として、`実店舗情報` ページを公開可能レベルへ更新しました。
- 変更内容:
  - `subpages/search-shop-info.html` を Japanese-first で整備（店舗選択チップ + 店舗ごとの短いストーリー + 運営情報）
  - 運営情報は `営業時間 / 住所 / アクセス / 予約枠 / おすすめ` を表示し、店舗切替で内容が同期更新
  - Google Map 埋め込みを維持し、選択店舗に応じて地図タイトルと埋め込みクエリを切替
  - 予約導線CTAは店舗パラメータ（`Shop` / `storeLabel`）を維持して `workshop-booking` へ遷移
  - `js/site-shell.js` の `searchStoreInfo.latest` を公開済み文言へ更新
- 目的:
  - `search` グループの2ページ目として、店舗比較から予約への最短導線を整備する
- 対象ファイル:
  - `subpages/search-shop-info.html`
  - `js/site-shell.js`
- EN: Delivered `2.14` slice-2 by upgrading `search-shop-info` with concise Shop operations, short story copy, embedded maps, and booking handoff continuity.
### ドキュメント更新（2026-03-28 追加78）
- `2.14 Create All Placeholder Pages` の第3実装として、`プロジェクト・読み物` ページを公開可能レベルへ更新しました。
- 変更内容:
  - `subpages/search-projects.html` を Japanese-first で実装（キーワード検索 + カテゴリフィルタ + 読み物カード一覧）
  - 体験導線/デジタル調香/店舗背景を「公開中」、記事系の後続コンテンツを「準備中」表示で明確化
  - 主要導線（`workshop` / `smart-scent-design` / `search-shop-info`）へ直接遷移できるCTAを配置
  - `css/style.css` に `projects-search-*` スタイル群を追加（レスポンシブ含む）
  - `js/site-shell.js` の `searchProjects.latest` を公開済み文言へ更新
- 目的:
  - `search` グループの3ページ目として、読み物起点の回遊導線を先行実装し、公開済み/準備中を判別しやすくする
- 対象ファイル:
  - `subpages/search-projects.html`
  - `css/style.css`
  - `js/site-shell.js`
- EN: Delivered `2.14` slice-3 by implementing a filterable projects/stories hub with clear available-vs-coming-soon states and direct links to active journey pages.
### ドキュメント更新（2026-03-28 追加79）
- `2.14 Create All Placeholder Pages` の第4実装として、`イベント情報` ページを公開可能レベルへ更新しました。
- 変更内容:
  - `subpages/search-events.html` を Japanese-first で実装（キーワード検索 + 開催ステータスフィルタ + イベントカード一覧）
  - イベントカードに `受付中/準備中` ステータス、開催期間、対象店舗、概要を表示
  - `受付中` イベントは予約/導線ページへ遷移可能、`準備中` は非遷移ラベルで誤操作を防止
  - `css/style.css` に `events-search-*` スタイル群を追加（レスポンシブ含む）
  - `js/site-shell.js` の `searchEvents.latest` を公開済み文言へ更新
- 目的:
  - `search` グループの4ページ目として、イベント起点の回遊導線と公開状態の視認性を確保する
- 対象ファイル:
  - `subpages/search-events.html`
  - `css/style.css`
  - `js/site-shell.js`
- EN: Delivered `2.14` slice-4 by implementing a searchable/filterable events page with clear open-vs-coming states and active booking/navigation handoff for live events.
### ドキュメント更新（2026-03-28 追加80）
- 公開グローバルナビの構成を、指定順序・指定リンク先へ再編しました。
- 変更内容:
  - 並び順を `Home -> 香りと遊ぶ -> ブランド -> アイテム -> 記事 -> イベント -> 実店舗 -> Admin` に変更
  - `記事` の遷移先を `search-projects.html` へ変更
  - `イベント` のトップレベル項目を追加し、遷移先を `search-events.html` へ設定
  - `実店舗` の遷移先を `search-shop-info.html` へ変更
  - `Admin` は既存どおりグローバルナビ右端表示を維持
  - グローバルナビの disabled 対象キーを `brand/items` のみに調整（実装済み search pages は常時有効）
- 目的:
  - 公開導線の主目的（体験・記事・イベント・店舗）を上位表示し、クリック意図と遷移先を一致させる
- 対象ファイル:
  - `js/site-shell.js`
- EN: Reordered and retargeted the global navigation to the requested IA, mapping Article/Event/Shops to implemented search pages and keeping Admin as the rightmost item.
### ドキュメント更新（2026-03-28 追加81）
- ブランド導線を `WAtoYO` のみ公開する運用へ切り替えました。
- 変更内容:
  - `js/site-config.js` の `disabledPublicPageKeys` から `brand` を除外し、トップレベル `ブランド` を有効化
  - `js/site-shell.js` の `ブランド` サブメニューを `WAtoYO` 単独表示へ変更
  - `subpages/sitemap.html` でトップレベル `ブランド` の default-disabled 指定を解除
  - `subpages/sitemap.html` のブランド詳細一覧を `ブランド: WAtoYO` のみに整理
  - `js/site-shell.js` の `brand` / `brandWatoyo` の latest 文言を公開状態に更新
- 目的:
  - 現時点の公開方針（BrandはWAtoYOのみ有効）をナビとサイトマップへ一貫反映する
- 対象ファイル:
  - `js/site-config.js`
  - `js/site-shell.js`
  - `subpages/sitemap.html`
- EN: Activated Brand with WAtoYO-only exposure by enabling top-level brand and limiting Brand submenu/sitemap detail links to WAtoYO.
### ドキュメント更新（2026-03-28 追加82）
- アイテム導線を `アロマ / ハンドクリーム` の2グループ公開へ切り替えました。
- 変更内容:
  - `js/site-config.js` の `disabledPublicPageKeys` から `items` を除外し、トップレベル `アイテム` を有効化
  - `js/site-shell.js` の `アイテム` サブメニューを `itemHomeFragrance` / `itemBodyCare` の2件に限定
  - `js/site-shell.js` の表示ラベルを `ホームフレグランス -> アロマ`、`ボディケア -> ハンドクリーム` へ更新
  - `subpages/sitemap.html` でトップレベル `アイテム` の default-disabled 指定を解除
  - `subpages/sitemap.html` のアイテム詳細一覧を `アイテム: アロマ` / `アイテム: ハンドクリーム` のみに整理
  - `js/site-shell.js` の `items` / 対象2グループの latest 文言を公開状態に更新
- 目的:
  - 現在の公開方針（Itemsは2グループのみ有効）をグローバルナビ・サイドナビ・サイトマップへ一貫反映する
- 対象ファイル:
  - `js/site-config.js`
  - `js/site-shell.js`
  - `subpages/sitemap.html`
- EN: Activated Items with a two-group policy (Aroma/Hand Cream) and synchronized nav/sitemap exposure to those two item groups only.
### ドキュメント更新（2026-03-28 追加83）
- `WAtoYO / アロマ / ハンドクリーム` の3ページを、提供画像を用いてドラフト実装しました。
- 変更内容:
  - `subpages/brand-watoyo.html` にブランド紹介ヒーロー + 3ビジュアルカード（`WAtoYO_WA/WAtoYO_YO/WAtoYO_WAYO`）を追加
  - `subpages/item-home-fragrance.html` にアロマページを実装（`aroma_neroli / aroma_vanilla / aroma_musk`）
  - `subpages/item-body-care.html` にハンドクリームページを実装（`handcream_rose / handcream_daphne / handcream_seablue`）
  - `css/style.css` に3ページ共通の `catalog-*` スタイル群を追加（hero/grid/card + responsive）
- 目的:
  - 画像資産を利用して、公開導線で参照可能な最小ページ群を先行整備する
- 対象ファイル:
  - `subpages/brand-watoyo.html`
  - `subpages/item-home-fragrance.html`
  - `subpages/item-body-care.html`
  - `css/style.css`
- EN: Delivered draft implementations for the three requested pages (WAtoYO, Aroma, Hand Cream) using the provided image assets and shared catalog UI styles.
### ドキュメント更新（2026-03-28 追加84）
- `WAtoYO / アロマ / ハンドクリーム` ページのヒーロー構成を、商品ページ向けに簡素化しました。
- 変更内容:
  - 3ページ共通でヒーロー内のCTAボタン2件を削除
  - 3ページ共通でヒーロー右側の大画像を削除
  - 下段の3商品カード（画像 + 商品説明）は維持
  - `css/style.css` に `catalog-hero--single` を追加し、1カラム表示へ調整
- 目的:
  - CTA主導ページではなく商品紹介ページとして、情報密度と視線誘導を適正化する
- 対象ファイル:
  - `subpages/brand-watoyo.html`
  - `subpages/item-home-fragrance.html`
  - `subpages/item-body-care.html`
  - `css/style.css`
- EN: Simplified the three product pages by removing hero CTA buttons and right-side hero image while preserving the bottom three product cards.
### ドキュメント更新（2026-03-28 追加85）
- ブランド/アイテム/記事/イベント/実店舗（検索系）ページの上部余白を縮小し、一覧導線を早く視認できるように調整しました。
- 変更内容:
  - `css/style.css` に対象ページキー別の `main { padding-top: 12px; }` を追加
  - 対象キー: `brandWatoyo / itemHomeFragrance / itemBodyCare / searchProjects / searchEvents / searchStoreInfo`
  - グローバルナビの `ブランド` と `アイテム` を親メニュー専用（非リンク）へ変更
  - `ブランド` / `アイテム` は hover 展開でサブメニュー遷移のみを提供（親ページ遷移を廃止）
  - モバイル用ナビセレクタも `category-nav__label` を含むよう補正し、表示崩れを防止
- 目的:
  - 商品・一覧ページでのファーストビュー情報量を増やし、親メニュークリックによる不要遷移をなくす
- 対象ファイル:
  - `css/style.css`
  - `js/site-shell.js`
- EN: Tightened top spacing on the requested listing/product pages and converted `Brand/Items` top-nav entries to parent-only submenu triggers (no direct parent-page links).
### ドキュメント更新（2026-03-28 追加86）
- 上部余白調整の未反映を補正し、`Shop` 表記を `Shop` 表記へ統一しました。
- 変更内容:
  - 対象ページ（Brand/Items/Articles/Events/Shops）で `main` だけでなく `.section` の `padding-top` も縮小
  - `search-shop-info.html` の英語見出しを `Shop` から `Shop` へ変更（title/kicker/subtitle/select）
  - `site-shell.js` の `Search / Shop Info` を `Search / Shop Info`、`Shops` を `Shops` に変更
  - フッター英語見出しを `Shop Info` から `Shop Info` へ変更
  - `workshop.html` のラベル `Shop` を `Shop` へ変更
- 目的:
  - 余白調整の体感差を確実に出し、英語表記を `Shop` へ統一する
- 対象ファイル:
  - `css/style.css`
  - `subpages/search-shop-info.html`
  - `subpages/workshop.html`
  - `js/site-shell.js`
- EN: Fixed remaining top-space gap by tightening section padding as well, and standardized visible English wording from `Shop` to `Shop`.
### ドキュメント更新（2026-03-28 追加87）
- 実店舗情報ページのURLを `search-shop-info.html` から `search-shop-info.html` へ変更しました。
- 変更内容:
  - ファイル名を `subpages/search-shop-info.html` へリネーム
  - `site-shell` / `sitemap` / `scent-search` / テスト計画 / 引継ぎ文書の参照URLを新パスへ更新
  - 旧パス `subpages/search-shop-info.html` は削除状態（非存在）を確認
- 目的:
  - `Shop` 表記方針に合わせ、URL命名も `shop` に統一する
- 対象ファイル:
  - `subpages/search-shop-info.html`
  - `js/site-shell.js`
  - `subpages/sitemap.html`
  - `subpages/scent-search.html`
  - `docs/10_PROJECT/PROJECT_STATUS.md`
  - `docs/60_TEST/TEST_PLAN.md`
  - `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md`
- EN: Renamed the shop-info page path from `search-shop-info.html` to `search-shop-info.html` and updated all runtime/doc references.
### ドキュメント更新（2026-03-28 追加88）
- トップページのヘッダー導線と商品掲載順を調整し、`About` への直接導線を追加しました。
- 変更内容:
  - 右上ユーティリティから `検索` / `カート` を削除（アカウント導線のみ表示）
  - `Pick Up` を `WAtoYO` 3点構成へ差し替え（`WA / YO / WAYO`）
  - `New Arrivals` を `アロマ3点 + ハンドクリーム3点` 構成へ差し替え
  - グローバルナビ `Home` 配下に `About` サブメニューを追加し、`index.html#about` へジャンプ可能に変更
  - `ABOUT` セクションへ `images/others/about.png` を追加し、説明文を補強
- 目的:
  - 初期導線を整理し、現在公開中カテゴリに合わせた商品訴求へ統一する
  - トップページ下部 `ABOUT` への到達性を高める
- 対象ファイル:
  - `js/site-shell.js`
  - `index.html`
  - `css/style.css`
- EN: Refined top-page navigation/content by removing Search/Cart utility links, swapping Pick Up/New Arrivals to the requested WAtoYO/Aroma/Hand Cream lineup, and adding a `Home > About` submenu jump with enriched About section imagery.
### ドキュメント更新（2026-03-28 追加89）
- トップページの `Pick Up` / `New Arrivals` 画像の縦寸を拡張し、商品ビジュアルの見え方を改善しました。
- 変更内容:
  - `css/style.css` にセクション限定の画像比率上書きを追加
  - `pickup-grid` と `product-grid` のカード画像を `aspect-ratio: 4 / 5` に変更
  - 他ページ共通カードスタイル（`1 / 1`）は維持し、影響範囲をトップページ2セクションのみに限定
- 目的:
  - WAYO / AROMA / HAND CREAM 画像の高さ不足を解消し、視認性を向上させる
- 対象ファイル:
  - `css/style.css`
- EN: Increased image height for top-page `Pick Up` and `New Arrivals` cards by overriding their aspect ratio to `4/5`, while keeping global card behavior unchanged elsewhere.
### ドキュメント更新（2026-03-28 追加90）
- `WAtoYO / アロマ / ハンドクリーム` の各ページで、商品画像の縦寸を拡張しました。
- 変更内容:
  - `css/style.css` の `.catalog-card img` 高さを `240px -> 280px` に変更
  - 対象は `catalog-card` を利用する3ページ（`brand-watoyo` / `item-home-fragrance` / `item-body-care`）
- 目的:
  - 3ページの商品画像表示が低く見える状態を改善し、視認性を向上
- 対象ファイル:
  - `css/style.css`
- EN: Increased product image height on WAtoYO/Aroma/Hand Cream catalog cards by updating `.catalog-card img` from `240px` to `280px`.
### ドキュメント更新（2026-03-28 追加91）
- `WAtoYO / アロマ / ハンドクリーム` の画像高さ指定を、`index.html` と同じ比率制御へ修正しました。
- 変更内容:
  - `.catalog-card img` の固定高 (`280px`) を廃止
  - `index.html` と同じ `aspect-ratio: 4 / 5` + `height: auto` へ変更
- 目的:
  - トップページカードと同等の見え方（縦比率）に統一し、固定px指定による差異を解消
- 対象ファイル:
  - `css/style.css`
- EN: Corrected catalog card image sizing to match `index.html` by replacing fixed pixel height with `aspect-ratio: 4/5` and `height: auto`.
### ドキュメント更新（2026-03-28 追加93）
- `2.14` の次スライスとして、`shopping-guide` / `contact` / `account` を placeholder から実ページ化しました。
- 変更内容:
  - `subpages/shopping-guide.html` を Japanese-first のガイドページとして実装（配送・支払い・返品の3ブロック）
  - `subpages/contact.html` を Japanese-first の問い合わせ導線ページとして実装（予約・商品・法人の3窓口）
  - `subpages/account.html` を Japanese-first のアカウント入口ページとして実装（ログイン・会員登録・設定）
  - `css/style.css` の `content-hub-*` スタイルを再利用し、3ページを統一レイアウトで表示
  - `js/site-shell.js` の `shoppingGuide` / `contact` / `account` latest 文言を公開済みステータスへ更新
- 目的:
  - `guide/support/account` 系ページ群の未実装領域を縮小し、実導線として利用可能な状態へ引き上げる
- 対象ファイル:
  - `subpages/shopping-guide.html`
  - `subpages/contact.html`
  - `subpages/account.html`
  - `css/style.css`
  - `js/site-shell.js`
- EN: Completed the next `2.14` slice by replacing placeholders for `shopping-guide`, `contact`, and `account` with Japanese-first draft pages and published-status latest copy.
### ドキュメント更新（2026-03-28 追加94）
- `2.14` の次スライスとして、`legal` / `privacy` / `newsletter` / `rss` / `cart` を placeholder から実ページ化しました。
- 変更内容:
  - `subpages/legal.html` を法的表示ドラフトページとして実装
  - `subpages/privacy.html` をプライバシーポリシードラフトページとして実装
  - `subpages/newsletter.html` をメルマガ設定案内ページとして実装
  - `subpages/rss.html` をRSS/ATOM配信案内ページとして実装
  - `subpages/cart.html` をカート機能準備中の案内ページとして実装（商品/予約導線付き）
  - `css/style.css` に `policy-*` / `cart-*` スタイルを追加
  - `js/site-shell.js` の `legal/privacy/newsletter/rss/cart` latest 文言を公開済みステータスへ更新
- 目的:
  - `guide/support/cart/legal` 系の未実装領域を縮小し、ユーザーが参照できる最低限の情報ページ群を確保する
- 対象ファイル:
  - `subpages/legal.html`
  - `subpages/privacy.html`
  - `subpages/newsletter.html`
  - `subpages/rss.html`
  - `subpages/cart.html`
  - `css/style.css`
  - `js/site-shell.js`
- EN: Completed another `2.14` slice by implementing draft pages for `legal/privacy/newsletter/rss/cart`, adding shared policy/cart styles, and updating latest-copy status.
### ドキュメント更新（2026-03-28 追加95）
- `about` ページを新規ドラフト実装し、`Home > About` の遷移先をトップ内アンカーから専用ページへ変更しました。
- 変更内容:
  - `subpages/about.html` を Japanese-first で実装（ブランド方針説明 + 画像 + 2CTA）
  - `js/site-shell.js` の `Home` サブメニュー `About` を `subpages/about.html` へリンク変更
  - `about` の breadcrumb/current-state を `Brand` 配下から独立ページ扱いへ修正
  - `about.latest` 文言を公開済みステータスへ更新
- 目的:
  - トップ下部ジャンプ導線を、独立した説明ページ導線へ置き換えて情報の見通しを改善する
- 対象ファイル:
  - `subpages/about.html`
  - `js/site-shell.js`
- EN: Implemented a dedicated Japanese-first `about` page and switched `Home > About` from in-page anchor jump to standalone page navigation, including breadcrumb/state cleanup.
### ドキュメント更新（2026-03-28 追加96）
- `index.html` から `ABOUT` セクションを削除し、`About` 導線を専用ページへ一本化しました。
- 変更内容:
  - トップページ下部の `ABOUT` セクション（`#about`）を削除
  - `Home > About` は `subpages/about.html` への遷移導線として維持
- 目的:
  - トップページ情報量を整理し、`About` の閲覧先を明確化する
- 対象ファイル:
  - `index.html`
  - `js/site-shell.js`
- EN: Removed the `ABOUT` block from top page and kept `Home > About` as a dedicated-page route for cleaner information architecture.

### ドキュメント更新（2026-03-28 追加97）
- `privacy` / `legal` を、より運用向けの構造化レイアウトへ刷新しました。
- 変更内容:
  - `subpages/privacy.html` を章立て構成（取得情報・利用目的・第三者提供・保管・開示）へ再設計
  - `subpages/legal.html` を項目表形式（法的表示テーブル）へ再設計
  - `css/style.css` に `policy-hero` / `policy-sections` / `policy-table` / `policy-footer` を追加
  - モバイル時は法的表示テーブルを1カラム化して可読性を確保
- 目的:
  - ポリシーページの可読性・信頼感を高め、実運用に近い見せ方へ整える
- 対象ファイル:
  - `subpages/privacy.html`
  - `subpages/legal.html`
  - `css/style.css`
- EN: Upgraded `privacy` and `legal` into professional structured policy pages (sectioned privacy clauses + legal notice table) with responsive policy styling.
### ドキュメント更新（2026-03-28 追加98）
- Aboutページの2カラムで、テキスト側と画像カード側の上端位置を揃える微調整を行いました。
- 変更内容:
  - `subpages/about.html` に `about-page` クラスを追加
  - `css/style.css` に `.about-page .split-layout*` の上端揃え補正を追加
- 目的:
  - About ページの視線開始位置を整え、左右カラムの読み始めを一致させる
- 対象ファイル:
  - `subpages/about.html`
  - `css/style.css`
- EN: Fine-tuned About page alignment so text and image-card columns start from the same top edge.

### ドキュメント更新（2026-03-28 追加99）
- フッターの `プライバシーポリシー` / `法的表示` リンクを有効化しました。
- 変更内容:
  - `js/site-config.js` の `disabledPublicPageKeys` から `legal` / `privacy` を除外
  - `js/site-shell.js` の default disabled list から `legal` / `privacy` を除外
- 目的:
  - 実装済みの法務ページへフッターから直接遷移できる状態にする
- 対象ファイル:
  - `js/site-config.js`
  - `js/site-shell.js`
- EN: Activated footer links for `Privacy Policy` and `Legal` by removing those keys from disabled-link policy lists.

### ドキュメント更新（2026-03-28 追加100）
- `brand` / `items` 親ページを placeholder から professional hub へ刷新しました。
- 変更内容:
  - `subpages/brand.html` をブランドハブ化（WAtoYO導線 + 方針 + 次アクション）
  - `subpages/items.html` をアイテムハブ化（アロマ/ハンドクリーム導線 + 次アクション）
  - `css/style.css` に `content-hub-card--primary` を追加して主導線カードを強調
  - `js/site-shell.js` の `brand/items` latest 文言を公開済みステータスへ更新
- 目的:
  - 親ページの情報価値を高め、公開済み子ページへの遷移判断をしやすくする
- 対象ファイル:
  - `subpages/brand.html`
  - `subpages/items.html`
  - `css/style.css`
  - `js/site-shell.js`
- EN: Upgraded `brand` and `items` parent pages into professional hub pages with clearer child-page routing and stronger primary-card emphasis.
### ドキュメント更新（2026-03-28 追加101）
- About ページの左右カラム上端揃えについて、追加の位置補正を適用しました。
- 変更内容:
  - `.about-page .split-layout` の gap / margin を再調整
  - `.split-layout__panel` に微調整オフセットを追加し、左テキスト開始位置との見た目を一致
  - `split-layout__copy` の先頭段落余白を明示的にリセット
- 目的:
  - About ページで「テキスト開始位置」と「画像カード開始位置」の上端をより視覚的に揃える
- 対象ファイル:
  - `css/style.css`
- EN: Applied stronger alignment adjustments on About page so text-start and image-card top edge visually line up.

### ドキュメント更新（2026-03-28 追加102）
- `brand/items` ハブで指定画像へ差し替え、あわせて最近実装ページ群の上部余白を圧縮しました。
- 変更内容:
  - `subpages/brand.html`
  - `Brand Policy` 画像を `Lineup image_ (5).png` へ変更
  - `Next Action` 画像を `Workshop_ (10).png` へ変更
  - `subpages/items.html`
  - `Next Action` 画像を `Workshop_ (10).png` へ変更
  - `css/style.css`
  - recently filled pages（about/brand/items/article/sale/Shops/shoppingGuide/contact/account/legal/privacy/newsletter/rss/cart）の `main` と `.section` 上部余白を `search-shop-info` と同水準へ縮小
- 目的:
  - 指定ビジュアル反映と、最近実装ページのファーストビュー密度を揃える
- 対象ファイル:
  - `subpages/brand.html`
  - `subpages/items.html`
  - `css/style.css`
- EN: Swapped Brand/Items hub images per request and tightened top spacing across recently implemented pages to match the compact level used on `search-shop-info`.
### ドキュメント更新（2026-03-28 追加103）
- Aboutレイアウト不整合を Issue 化し、構造修正で解消しました。
- 変更内容:
  - `ISSUE_LIST` に `Issue 2026-03-28-30` を追加
  - `about.html` の見出し/リードを左カラム内へ統合し、右カードと同一行開始へ変更
  - margin 調整依存ではなく、DOM構造で上端整列を実現
- 目的:
  - Aboutページの上端ズレを恒久的に解消する
- 対象ファイル:
  - `subpages/about.html`
  - `css/style.css`
  - `docs/10_PROJECT/ISSUE_LIST.md`
- EN: Logged and fixed the About alignment issue via structural layout correction (same-row start), not margin-only tweaks.

### ドキュメント更新（2026-03-28 追加104）
- 実装確認済みページのリンクを有効化し、次ページ（login/register）を実装しました。
- 変更内容:
  - `disabledPublicPageKeys` を空配列化し、公開導線リンクを有効化
  - `site-shell` 側 disabled policy を empty-config 運用で解釈できるよう補正
  - `subpages/login.html` / `subpages/register.html` を実ページ化（モーダル導線連携）
  - `css/style.css` に `auth-*` スタイルを追加
  - `site-shell` の `login/register` latest 文言を公開済みステータスへ更新
- 目的:
  - placeholder 完了済みページを導線上で有効化し、次実装ページを段階的に閉じる
- 対象ファイル:
  - `js/site-config.js`
  - `js/site-shell.js`
  - `subpages/login.html`
  - `subpages/register.html`
  - `css/style.css`
- EN: Activated links for implemented pages and completed the next pages (`login/register`) with modal-compatible standalone layouts.
### ドキュメント更新（2026-03-28 追加92）
- `2.14` の次スライスとして、`article` / `sale` / `Shops` の3ページを placeholder から実ページ化しました。
- 変更内容:
  - `subpages/article.html` を Japanese-first の記事ハブとして実装（3カード + 関連導線）
  - `subpages/sale.html` を Japanese-first の限定オファーページとして実装（WAtoYO/アロマ/ハンドクリーム導線）
  - `subpages/Shops.html` を Japanese-first の実店舗案内として実装（浅草/柴又/ソラマチ比較 + 予約導線）
  - `css/style.css` に `content-hub-*` 共通スタイルを追加（カード/グリッド/モバイル対応）
  - `js/site-shell.js` の `article` / `sale` / `Shops` latest 文言を公開済みステータスへ更新
- 目的:
  - `2.14 Create All Placeholder Pages` の優先対象（article/sale/Shops）を先行で実装し、閲覧可能な最小導線を確保する
- 対象ファイル:
  - `subpages/article.html`
  - `subpages/sale.html`
  - `subpages/Shops.html`
  - `css/style.css`
  - `js/site-shell.js`
- EN: Completed the next `2.14` slice by replacing placeholders with Japanese-first draft pages for `article`, `sale`, and `Shops`, including shared hub styles and published latest-copy updates.

### ドキュメント更新（2026-03-28 追加105）
- 公開導線最終調整として、`brand/items` 親リンク有効化・フッターコピー更新・可視性改善・問い合わせ導線修正を実施しました。
- 変更内容:
  - `js/site-shell.js`
  - グローバルナビの `ブランド` / `アイテム` を親リンクとして有効化（サブメニュー併用）
  - フッター下部コピーを `© 2026 inim-dx. All rights reserved.` へ更新
  - `items` current-state 判定に詳細ページキー（DIY/Sale/Ecology/RefillTools/GiftSet）を追加
  - `subpages/contact.html`
  - Products導線を `items.html`、Business導線を `about.html` に変更
  - Business/Products ボタンを可読性の高い `button--secondary` に統一
  - `css/style.css`
  - `content-hub` / `policy-footer` / `auth-panel` 上の `button--ghost` コントラストを強化
- 目的:
  - 親ハブページへの直接遷移を有効にし、フッター表記とボタン視認性、問い合わせ先導線の整合性を改善する
- 対象ファイル:
  - `js/site-shell.js`
  - `subpages/contact.html`
  - `css/style.css`
- EN: Finalized public-routing polish by activating clickable Brand/Items parent links, replacing footer copyright text, improving ghost-button contrast on light surfaces, and correcting Contact page product/business destinations.

### ドキュメント更新（2026-03-28 追加106）
- `contact` と `shopping-guide` のカード画像を指定アセットへ差し替えました。
- 変更内容:
  - `subpages/contact.html`
  - WORKSHOP: `Workshop_ (1).png`
  - PRODUCTS: `Lineup image_ (2).png`
  - BUSINESS: `others_ (5).png`
  - `subpages/shopping-guide.html`
  - DELIVERY: `others_ (7).png`
  - PAYMENT: `others_ (10).png`
  - RETURN: `others_ (14).png`
- 目的:
  - ページ内容とビジュアル文脈を合わせ、各窓口カードの意味を即時認識しやすくする
- 対象ファイル:
  - `subpages/contact.html`
  - `subpages/shopping-guide.html`
- EN: Swapped `contact` and `shopping-guide` card images to the specified assets so each card’s visual context better matches its role.

### ドキュメント更新（2026-03-28 追加107）
- `contact` ページの Products/Business ブロック文言とCTA状態を調整しました。
- 変更内容:
  - `subpages/contact.html`
  - Products:
    - 説明文を削除し、連絡先（Phone / Address / Email）へ差し替え
    - 既存CTAボタンを撤去
  - Business:
    - 既存本文は維持
    - CTAを非活性化し、ボタン表示文言を `準備中` へ変更
- 目的:
  - 連絡先情報の即時提示を優先し、Business導線は準備状態を明確化する
- 対象ファイル:
  - `subpages/contact.html`
- EN: Updated `contact` page copy and CTA state: Products now shows direct contact details with no CTA, and Business keeps its description but shows a disabled `準備中` button.

### ドキュメント更新（2026-03-28 追加108）
- フッター `Guide` から重複情報リンクを削除しました（ショッピングガイドへ集約）。
- 変更内容:
  - `js/site-shell.js`
  - `配送・送料について` / `返品について` / `お支払い方法について` を footer 表示から削除
  - `ショッピングガイド` をガイド情報の単一導線として維持
- 目的:
  - フッター情報の重複を減らし、導線をシンプルに保つ
- 対象ファイル:
  - `js/site-shell.js`
- EN: Removed duplicated footer Guide entries (`Delivery/Returns/Payment`) and kept `Shopping Guide` as the single route for those topics.

### ドキュメント更新（2026-03-28 追加109）
- `ISSUE_LIST.md` の記載崩れを修正し、Issue節の整合性を回復しました。
- 変更内容:
  - `docs/10_PROJECT/ISSUE_LIST.md`
  - `Issue 2026-03-27-26` に症状/原因/対策/状態を補完
  - `Issue 2026-03-28-30` に混入していた 27-26 の英語行（Action/Status）を除去
- 目的:
  - Issue単位での履歴追跡性を維持し、確認待ち/解消済み判定を誤読させない
- 対象ファイル:
  - `docs/10_PROJECT/ISSUE_LIST.md`
- EN: Normalized `ISSUE_LIST.md` by restoring complete fields for Issue `2026-03-27-26` and removing misplaced lines accidentally mixed into Issue `2026-03-28-30`.

### ドキュメント更新（2026-03-28 追加110）
- ユーザー確認完了に基づき、以下 Issue を `解消済み（ユーザー確認済み）` へ更新しました。
- 更新対象:
  - `Issue 2026-03-25-17`
  - `Issue 2026-03-26-18`
  - `Issue 2026-03-26-19`
  - `Issue 2026-03-26-20`
  - `Issue 2026-03-28-30`
- 目的:
  - 再確認待ち・SQL適用待ちの状態を解消し、実運用上の未解決項目を正確化する
- 対象ファイル:
  - `docs/10_PROJECT/ISSUE_LIST.md`
- EN: Based on user re-verification, closed five pending issues as `resolved (user verified)` including the former recheck/SQL-pending items.

### ドキュメント更新（2026-03-28 追加111）
- `Issue 2026-03-21-06`（GitHub Pagesキャッシュ残留の監視項目）をクローズしました。
- 変更内容:
  - `docs/10_PROJECT/ISSUE_LIST.md`
  - 状態を `継続監視` から `解消済み（ユーザー確認済み）` へ更新
  - 2026-03-28 時点で「再発なし」のユーザー確認結果を追記
- 目的:
  - 本日終了時点の未解決 Issue を正確化し、運用ステータスを最新化する
- 対象ファイル:
  - `docs/10_PROJECT/ISSUE_LIST.md`
- EN: Closed `Issue 2026-03-21-06` after user confirmation of no recurrence and updated status from monitoring to resolved (user verified).

### ドキュメント更新（2026-04-04 追加112）
- 2.3着手前の導線文言統一として、`ワークショップ系ナビ/CTA` のラベルを visitor 向けに再整理しました。
- 変更内容:
  - `js/site-shell.js`
  - グローバルナビ: `香りと遊ぶ` → `香りを体験する`
  - ドロップダウン: `ワークショップ体験ガイド / プランを見る / 予約する / 体験ステップ / デジタル調香を試す` に統一
  - `workshopPlans` ラベル/最新情報文言を `プランを見る` ベースへ調整
  - `index.html`
  - ワークショップ関連CTA文言を `プランを見る` / `デジタル調香を試す` 基準へ統一
  - `subpages/workshop.html`, `subpages/workshop-booking.html`, `subpages/workshop-booking-thanks.html`, `subpages/brand.html`
  - 比較導線のCTA文言を `プランを見る` 基準に統一
  - `subpages/scent-search.html`, `subpages/search-projects.html`, `subpages/smart-scent-design.html`
  - 検索/導線カード文言も新命名へ整合
- 目的:
  - グローバルナビ、プルダウン、主要CTAの表現を統一し、初回訪問者が次アクションを即判断できるようにする
- 対象ファイル:
  - `js/site-shell.js`
  - `index.html`
  - `subpages/workshop.html`
  - `subpages/workshop-booking.html`
  - `subpages/workshop-booking-thanks.html`
  - `subpages/brand.html`
  - `subpages/scent-search.html`
  - `subpages/search-projects.html`
  - `subpages/smart-scent-design.html`
- EN: As a pre-2.3 terminology pass, unified workshop-related global-nav/dropdown/CTA wording to visitor-friendly action labels (`Experience`, `View Plans`, `Try Digital Blend`) across key pages.


### Doc Update (2026-03-30)
- EN: Shop -> Shop label sweep (A & B) completed on public pages.
- EN: Added alias redirect pages for shops.html and search-Shop-info.html.
### Doc Update (2026-03-30)
- EN: Replaced remaining Shop labels in mockup reference + CSS comment (Shop wording).
### Doc Update (2026-03-30)
- EN: Replaced historical Store/Stores wording with Shop/Shops across docs/*.md for consistency.
### Doc Update (2026-03-30)
- EN: Merged FUTURE_BACKLOG into FEATURE_BACKLOG and deleted FUTURE_BACKLOG.md.
### Doc Update (2026-03-30)
- JA: FEATURE_BACKLOG.md を日本語のみ構成へ更新（英語併記削除）。
### Doc Update (2026-03-30)
- JA/EN: FEATURE_BACKLOG.md をバイリンガル構成に戻しました。
### Doc Update (2026-03-30)
- EN: Closed 2.14 Create All Placeholder Pages (support treated as footer category).
### Doc Update (2026-03-30)
- EN: Removed Cart/Article/Sale/Shop links from sitemap page.
### Doc Update (2026-03-30)
- EN: Reconfirmed 2.14 Create All Placeholder Pages as Closed in FEATURE_BACKLOG.md.
### Doc Update (2026-03-30)
- EN: Recovered FEATURE_BACKLOG.md and WIP.md from mojibake; backups saved under docs/90_WIP/.
### Doc Update (2026-03-30)
- EN: Restored subpages/workshop-booking.html from commit e486df8 to recover booking layout after selector/id mismatch regression.
### Doc Update (2026-03-30)
- EN: Closed 2.2 Top -> Workshop Flow Reinforcement based on user UAT confirmation.
### Doc Update (2026-03-30)
- EN: Updated backlog labels: removed （着手中） from 2.2 title and set 2.10 to Closed after implementation verification.
### Doc Update (2026-03-30)
- EN: Closed backlog items 2.11 (Sitemap) and 2.12 (Breadcrumb) based on user confirmation.

### Doc Update (2026-03-31)
- EN: Re-reviewed Accepted backlog items and closed 2.7 (Dashboard Link Exposure), 2.8 (Workshop Plan Page Formalisation), and 2.13 (Site Structure Review + IA Refinement).
### Doc Update (2026-03-31)
- EN: Kept 2.6 open for final operation-level closure checks (admin_only baseline and non-admin deny verification scope).
### Doc Update (2026-03-31)
- EN: Re-validated PROJECT_STATUS.md and WIP.md with UTF-8 read path and confirmed no active mojibake in current source files.

### Doc Update (2026-03-31)
- EN: Closed 2.6 (Admin Access Restriction + Booking LED Governance) after user verification; non-admin access is blocked under admin_only mode.

### Doc Update (2026-03-31)
- EN: Closed 2.9 (Non-admin Access Verification Backlog) after verifying non-admin access denial behavior in admin_only mode.

### Doc Update (2026-03-31)
- EN: Applied WIP/FEATURE_BACKLOG consistency cleanup after 2.6/2.9 closure (removed stale in-progress wording).

### Doc Update (2026-03-31)
- EN: Started 2.3A (Digital Blend AI initial version): added mood/problem/change inputs and a rule-based recommendation card to subpages/smart-scent-design.html.


### Doc Update (2026-03-31)
- EN: Implemented 2.3B on Digital Blend page: added apply/undo recommendation controls with in-session pre-apply blend backup and restore.

### Doc Update (2026-03-31)
- EN: Added total-ratio guard for Digital Blend user editing (sum capped at 100%) and displayed current total indicator.

### Doc Update (2026-03-31)
- EN: Implemented 2.3C step-1 UI for Digital Blend candidate persistence (localStorage-based save/list/load/delete).

### Doc Update (2026-03-31)
- EN: Updated smart-scent-design layout to keep the left visual/motion pane sticky during scroll on desktop/tablet.

### Doc Update (2026-03-31)
- EN: Added Operation Guide modal to smart-scent-design with Japanese usage steps and quick tips (X/backdrop/Esc close).

### Doc Update (2026-03-31)
- EN: Updated Operation Guide link visual style and added deterministic initial-blend reset on smart-scent-design page open (including bfcache restore path).

### Doc Update (2026-03-31)
- EN: Strengthened smart-scent-design open-reset logic to run on every pageshow event so browser-restored scale state is always overwritten.

### Doc Update (2026-03-31)
- JA: Smart Scent の直近更新（2.3A-2.3D）を文書上も JA/EN で統一追記。ガイドには『初期表示は人気バランス例』『リセットで初期例へ戻る』を明記。
- EN: Added a bilingual JA/EN summary for recent Smart Scent updates (2.3A-2.3D). Guide now explicitly states that initial view is a popular starter blend and reset returns to that starter.

### Doc Update (2026-03-31)
- JA: 2.4A として smart-scent-design の候補保存を DB 優先へ移行。sql/18_create_smart_scent_blends.sql（テーブル + RLS）を追加し、DB不可時はローカル保存へ自動フォールバック。
- EN: Implemented 2.4A by moving smart-scent-design candidate persistence to DB-first. Added sql/18_create_smart_scent_blends.sql (table + RLS) with automatic local fallback when DB is unavailable.

### Doc Update (2026-03-31)
- JA: 2.4B として保存済み候補の編集更新機能を追加。sql/19_add_smart_scent_blends_updated_at_trigger.sql を追加し、DB更新時の updated_at を自動化。
- EN: Implemented 2.4B with saved-candidate edit/update support and added sql/19_add_smart_scent_blends_updated_at_trigger.sql to auto-maintain updated_at on DB updates.

### Doc Update (2026-03-31)
- JA: Smart Scent の候補保存アクション3ボタン（更新/キャンセル/表示切替）を1行表示へ調整。
- EN: Adjusted Smart Scent candidate-save action buttons (update/cancel/toggle) to keep labels on a single line.

### Doc Update (2026-03-31)
- JA: Smart Scent の候補保存3ボタンが枠外にはみ出す問題を修正（3列幅を可変化、padding/fontを追加縮小）。
- EN: Fixed Smart Scent triple action button overflow by switching to flexible 3-column width and further reducing padding/font.

### Doc Update (2026-03-31)
- JA: Smart Scent 内のボタン密度を全体最適化（primary/secondary/mini の高さ・padding・文字サイズを調整）。
- EN: Optimized button density across Smart Scent by tuning height/padding/font for primary, secondary, and mini actions.

### Doc Update (2026-03-31)
- JA: Smart Scent のボタン密度をさらに縮小し、smart-scent-design-app.css?v=20260331d へ更新してキャッシュ起因の未反映を解消。
- EN: Further reduced Smart Scent button density and bumped to smart-scent-design-app.css?v=20260331d to resolve cache-related non-reflection.

### Doc Update (2026-03-31)
- JA: Smart Scent の候補保存3ボタンの高さを 36px に再調整し、周辺アクションとの高さ一貫性を改善。CSSバージョンを 20260331e へ更新。
- EN: Re-tuned Smart Scent candidate-save 3-button row to 36px for better height consistency and bumped CSS version to 20260331e.

### Doc Update (2026-03-31)
- JA: Smart Scent 保存行の専用ボタンルールを再調整し、上段アクションと高さを一致化（min-height 42px）。
- EN: Re-adjusted Smart Scent save-row button override to match upper action-row height (min-height 42px).

### Doc Update (2026-03-31)
- JA: 2.4C（複製/共有リンク）は現時点で必須ではないため On-hold（Deferred）へ変更し、次優先を 2.5 へ移行。
- EN: Marked 2.4C (duplicate/share-link) as On-hold (Deferred) since it is not mandatory now; moved next priority to 2.5.

### Doc Update (2026-03-31)
- JA: 公開主要4ページ（index / smart-scent-design / workshop / workshop-booking）の文言一貫性改善 2A-2B を実施。英語ラベル混在を整理し、運用メッセージを日本語へ統一（例: 操作ガイド、対象/所要時間/開催店舗/体験フロー、プラン読込ステータス、予約診断ラベル）。
- EN: Completed 2A-2B wording-consistency pass on 4 core public pages (index / smart-scent-design / workshop / workshop-booking). Reduced mixed-language labels and standardized operational messages in Japanese (e.g., guide label, workshop proof labels, plan-load status, booking diagnostics labels).

### Doc Update (2026-03-31)
- JA: 2C-2D として公開主要4ページのコピー最終調整を実施（section-kicker を日本語中心へ統一、説明文の混在語を整理、予約ページの日付/枠ラベルを日本語化、Smart Scent の主要UIラベルを日本語化）。
- EN: Completed 2C-2D copy polish on 4 core public pages (Japanese-first section-kicker labels, cleaned mixed-language sentences, Japanese labels for booking date/slot sections, and Japanese localization of core Smart Scent UI labels).

### Doc Update (2026-03-31)
- JA: Step 4（公開サブページ全体の文言整合チェック）を実施。見出し/セクションラベル/予約導線の文言を日本語中心へ統一し、予約関連ページ（plans/entry/confirm/thanks）と案内ページ（shop-info/shopping-guide）の残存英語ラベルを整理。
- EN: Executed Step 4 full public-subpage consistency sweep. Standardized headings/section labels/booking-flow copy to Japanese-first and cleaned remaining English labels in booking-related pages (plans/entry/confirm/thanks) and guide pages (shop-info/shopping-guide).

### Documentation Update (2026-04-02 Add 115)
- EN: Recovered recurrent public-shell mojibake by restoring `js/site-shell.js` from a known-good revision and reapplying only approved theme-switcher changes.
- EN: Confirmed render recovery on header/global nav/footer after UTF-8 re-save.
- EN: Added mandatory close-out checks for shell/doc edits: mojibake scan and UTF-8 verification before task closure.
- Files:
  - `js/site-shell.js`
  - `css/style.css`
  - `docs/10_PROJECT/PROJECT_STATUS.md`
  - `docs/10_PROJECT/ISSUE_LIST.md`
  - `docs/10_PROJECT/WIP.md`
  - `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md`

### Documentation Update (2026-04-02 Add 116)
- EN: Pruned low-readability theme palettes from public styling and selector options.
- EN: Removed 12 palettes from both CSS tokens and header theme dropdown: `p02`, `p03`, `p11`, `p20`, `p21`, `p22`, `p24`, `p27`, `p28`, `p36`, `p38`, `p39`.
- EN: Active theme count is now 28 palettes.
- Files:
  - `css/style.css`
  - `js/site-shell.js`
  - `docs/20_PRODUCT/DESIGN_GUIDELINE.md`


### Documentation Update (2026-04-02 Add 117)
- EN: Applied user-approved English label set for all active 28 theme options.
- EN: This update changes display names only; IDs, tier groups, and color tokens remain unchanged.
- Files:
  - `js/site-shell.js`
  - `docs/20_PRODUCT/DESIGN_GUIDELINE.md`

### Documentation Update (2026-04-02 Add 118)
- EN: Removed the theme type/group selector (`Safe / Creative / Strong`) from the header.
- EN: Theme dropdown now always shows all active 28 themes.
- EN: Scope is selector behavior only; IDs and color tokens remain unchanged.
- Files:
  - `js/site-shell.js`
  - `docs/20_PRODUCT/DESIGN_GUIDELINE.md`


### Documentation Update (2026-04-03 Add 119)
- EN: Logged and fixed a public-shell regression where `header/global nav/footer` disappeared due to a JavaScript syntax error after mobile-nav refactor.
- EN: Root cause was a duplicated template fragment in `renderMobileNav()` causing `Unexpected token '}'` in `js/site-shell.js`.
- EN: Added Issue `2026-04-03-33` and applied hotfix by removing the duplicate block.
- EN: Current status is `Monitoring` until user re-verifies visual recovery.
- Files:
  - `js/site-shell.js`
  - `docs/10_PROJECT/ISSUE_LIST.md`
  - `docs/10_PROJECT/PROJECT_STATUS.md`
  - `docs/10_PROJECT/WIP.md`
  - `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md`
  - `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
### ドキュメント更新（2026-04-04 追加113）
- 2.3 レイアウト改善の第1段として、smart-scent-design の情報階層とCTA配置を整理しました。
- 変更内容:
  - `subpages/smart-scent-design.html`
  - 右側コントロールを `STEP 1 香りノート` → `STEP 2 AIレコメンド` → `STEP 3 現在の調香を確認` → `STEP 4 候補を保存` へ再編
  - AI提案CTAを `おすすめを提案する` へ変更
  - 保存操作を独立セクション化し、読み込み一覧との関係を明確化
  - `css/smart-scent-design-app.css`
  - ステップバッジ (`.panel-step`) を追加
  - AIパネル強調、提案結果見出し (`.ai-result-head`) を追加
  - 保存セクション (`.save-panel`) スタイルを追加
- 目的:
  - 初回訪問者が「次に何をすべきか」を段階的に理解できる画面構造にする
- 対象ファイル:
  - `subpages/smart-scent-design.html`
  - `css/smart-scent-design-app.css`
- EN: Implemented 2.3 layout polish step-1 by restructuring the right control flow into clear steps and improving action grouping (AI suggestion, current blend check, and saved-candidate management).
### ドキュメント更新（2026-04-04 追加114）
- 2.3 レイアウト改善の方針調整として、smart-scent-design を `AI先行フロー` に並べ替えました。
- 変更内容:
  - `subpages/smart-scent-design.html`
  - パネル順序を `AIレコメンド` → `香りノート調整` → `現在の調香を確認` → `候補を保存` に変更
  - ステップ表示を `STEP 1`〜`STEP 4` へ再採番
  - `香りノート` タイトルを `香りノート調整` に変更
- 目的:
  - 初回訪問者が「まずAIで方向性を作ってから微調整する」体験を自然に理解できる順序へ整える
- 対象ファイル:
  - `subpages/smart-scent-design.html`
- EN: Reordered smart-scent-design controls to an AI-first flow and renumbered steps to match display order (Step1 AI → Step2 Manual Tuning → Step3 Review → Step4 Save).
### ドキュメント更新（2026-04-04 追加115）
- 2.3 レイアウト改善の微調整として、STEP 3 から冗長CTAを削除しました。
- 変更内容:
  - `subpages/smart-scent-design.html`
  - `STEP 3` タイトルを `香りの最終調整` に変更
  - `この香りを見る` ボタンを削除（リアルタイム反映のため不要）
  - ガイド文言を「左側結果はリアルタイム更新」に更新
  - `css/smart-scent-design-app.css`
  - STEP 3 の単一ボタン行レイアウトに合わせて `.cta-row` を右寄せ単一列へ調整
- 目的:
  - 操作重複を減らし、ユーザーに「比率変更 = 即時反映」の理解を明確化する
- 対象ファイル:
  - `subpages/smart-scent-design.html`
  - `css/smart-scent-design-app.css`
- EN: Removed the redundant Step-3 “view blend” CTA and renamed Step 3 to `香りの最終調整`, clarifying that the left blend result updates in real time.
### ドキュメント更新（2026-04-04 追加116）
- 2.3 レイアウト改善の次スライスとして、保存済み候補の可読性とレスポンシブ密度を改善しました。
- 変更内容:
  - `subpages/smart-scent-design.html`
  - 保存候補カードに `保存種別（クラウド/ローカル）`、`メモ`、`更新日時` 表示を追加
  - 候補比率表示を `%` 付きに統一
  - 空状態文言を「次アクション付き」の案内へ変更
  - `css/smart-scent-design-app.css`
  - 保存候補カードの情報階層（name/source/meta/memo/stamp）をスタイル追加
  - 中間幅（<=1180px）で 3ボタン行を 2列+最下段1列へ最適化
  - モバイル（<=720px）で保存カード上段とミニボタンの可読性を改善
- 目的:
  - 保存済み候補の比較・再利用判断をしやすくし、端末幅ごとの詰まりを減らす
- 対象ファイル:
  - `subpages/smart-scent-design.html`
  - `css/smart-scent-design-app.css`
- EN: Improved saved-candidate readability and responsive density for 2.3 polish by adding source/memo/timestamp metadata, clearer empty-state guidance, and better medium/mobile action-row layouts.
### ドキュメント更新（2026-04-04 追加117）
- 2.4 運用修正として、Smart Scent の保存先判定を `初期化時のみ` から `認証状態追従` に更新しました。
- 変更内容:
  - `subpages/smart-scent-design.html`
  - `supabase.auth.onAuthStateChange` リスナーを追加し、ページ表示中のログイン/ログアウトで `blendStorageMode` を即時再判定
  - 判定更新後に保存候補一覧を再読込/再描画し、リロード不要でクラウド保存へ遷移可能に変更
  - 終了時に subscription を解除する `beforeunload` クリーンアップを追加
- 目的:
  - 「ログイン済みなのにローカル保存のまま」になる状態を解消し、保存先表示と実際の保存先の不一致を防止する
- 対象ファイル:
  - `subpages/smart-scent-design.html`
- EN: Added an auth-state sync hotfix for Smart Scent. Storage mode now follows live sign-in/sign-out state via `onAuthStateChange`, refreshes saved candidates without reload, and unsubscribes on unload.
### ドキュメント更新（2026-04-04 追加118）
- Smart Scent のコンソール警告抑制対応を実施しました（機能影響なし）。
- 変更内容:
  - `subpages/smart-scent-design.html`
  - Tone.js の静的読込を廃止し、Sound ON 操作時のみ遅延読込する方式へ変更
  - `<link rel="icon">` を追加し、ページ側の favicon 参照を明示
  - ルート `favicon.ico` を追加して `/favicon.ico` 404 を解消
- 目的:
  - 初期表示時の不要な AudioContext 警告と favicon 404 ノイズを減らし、検証時のエラー判別を容易にする
- 対象ファイル:
  - `subpages/smart-scent-design.html`
  - `favicon.ico`
- EN: Reduced Smart Scent console noise by lazy-loading Tone.js after user gesture and fixing favicon resolution (`/favicon.ico` 404).
### ドキュメント更新（2026-04-04 追加119）
- SP表示の軽微崩れに対して、Smart Scent のオーバーレイ配置をモバイル向けに補正しました。
- 変更内容:
  - `css/smart-scent-design-app.css`
  - `@media (max-width: 720px)` で `experience-shell / overlay-top / overlay-pill / overlay-result` の余白・位置・サイズを調整
  - `subpages/smart-scent-design.html`
  - CSS クエリを `smart-scent-design-app.css?v=20260404b` に更新
- 目的:
  - SPで上部ピルが見切れる、または結果カードと近接しすぎる表示を是正する
- 対象ファイル:
  - `css/smart-scent-design-app.css`
  - `subpages/smart-scent-design.html`
- EN: Applied a mobile-only cosmetic fix for Smart Scent overlay layout (top pills/result card spacing) and bumped CSS version to ensure immediate reflection.
### ドキュメント更新（2026-04-04 追加120）
- SP視認性の微調整として、Smart Scent の「上部ヘッダー」と「あなたの香り」カードの縦間隔を最適化しました。
- 変更内容:
  - `css/smart-scent-design-app.css`
  - SP向け `overlay-result` の `top` を `118px` 相当から `98px` 相当へ調整し、初期画面の間延びを抑制
  - `css/style.css`
  - SP向け `topbar` の `padding/gap` と `experience-page` の `gap` を縮小
- 目的:
  - 主要情報（タイトル→結果カード）を近接させ、スマホ初見時の視線移動量を減らす
- 対象ファイル:
  - `css/smart-scent-design-app.css`
  - `css/style.css`
- EN: Refined mobile spacing by reducing the vertical gap between Smart Scent topbar and the `あなたの香り` card, plus tighter topbar density for better first-view readability.
### ドキュメント更新（2026-04-04 追加121）
- SPギャップ調整の追加要望に対応し、Smart Scent ページの `topbar` と `content` の間隔を明示的に `20px` へ設定しました。
- 変更内容:
  - `css/style.css`
  - `@media (max-width: 720px)` の `.experience-page` `gap` を `20px` に調整
- 目的:
  - SP初期表示でヘッダー直下の余白を適切に確保し、見た目の詰まりを防止する
- 対象ファイル:
  - `css/style.css`
- EN: Applied follow-up SP spacing request by setting the Smart Scent `topbar` to `content` gap to `20px` at mobile breakpoint.
### ドキュメント更新（2026-04-04 追加122）
- 上記ギャップ調整の適用先を是正しました。`topbar` と `content` は `.experience-page` ではなく `.app` 配下のため、実効ギャップは `.app` の `row-gap` で管理します。
- 変更内容:
  - `css/style.css`
  - `.app` に `row-gap: 20px` を追加
  - 誤設定だった SP向け `.experience-page` の `gap` 指定を削除
- 目的:
  - 画面幅に関係なく、`topbar` と `content` の間隔を確実に `20px` で表示する
- 対象ファイル:
  - `css/style.css`
- EN: Corrected the gap implementation target to `.app` and enforced `row-gap: 20px` so topbar/content spacing works consistently across viewports.
### ドキュメント更新（2026-04-04 追加123）
- 2.3（Digital Blend AI Recommendation）をクローズしました。
- クローズ根拠:
  - JA: 機能本体（AI提案、適用/取消、候補保存、操作ガイド）に加え、保存先同期（ログイン後自動クラウド切替）とコンソール警告抑制、SP表示調整まで完了。
  - EN: Core features (AI suggestion, apply/undo, candidate save, operation guide) plus storage-mode sync, console-noise cleanup, and SP layout tuning are completed.
  - JA: ユーザー確認として機能動作・表示改善・SPギャップ調整の OK を取得済み。
  - EN: User confirmation received for functional behavior, visual refinements, and SP gap adjustments.
- 次候補（優先検討）:
  - JA: `2.4` 残スコープ整理（特に 2.4C の扱い確定）
  - JA: `2.1` 管理画面更新機能のMVP定義（下書き/公開・履歴・差分）
  - JA: `2.5` 相互特典ロジックの要件定義（運用/会計連携判断）
  - EN: Next candidates are 2.4 scope finalisation, 2.1 admin-update MVP definition, and 2.5 reciprocal-discount requirement design.
### ドキュメント更新（2026-04-04 追加124）
- 2.4（Blend Save and Reuse）をクローズしました（2.4C Deferred維持）。
- 変更内容:
  - `subpages/smart-scent-design.html`
  - 保存候補のローカル読込時にデータ正規化を追加
  - 保存候補一覧を `updatedAt/createdAt` 降順に統一
  - 保存候補上限を定数化（20件）し、保存/読込時に同一ルールを適用
  - クラウド保存失敗時のローカルフォールバックメッセージを具体化（更新失敗時も誤解がない文言へ）
- クローズ範囲:
  - JA: 2.4A/2.4B（DB保存、編集更新、ローカルフォールバック、運用ハードニング）
  - EN: 2.4A/2.4B including DB persistence, edit/update, local fallback, and operational hardening
- 継続保留:
  - JA: 2.4C（複製/共有リンク）は Deferred を維持し、別優先で再評価
  - EN: 2.4C (duplicate/share-link) remains Deferred for later reprioritisation
### ドキュメント更新（2026-04-04 追加125）
- 2.1 / 2.5 を On-hold（Deferred）へ移行し、終盤フェーズの優先を「全体クリーンアップ」に変更しました。
- 変更内容:
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md`
  - 2.1 `Content Update Enhancement` の status を `Deferred` へ更新
  - 2.5 `Workshop x Product Discount Logic` の status を `Deferred` へ更新
  - `docs/10_PROJECT/WIP.md`
  - In Progress / Next Actions をクリーンアップ中心へ更新
- 目的:
  - 新規機能追加を凍結し、品質・整合・運用手順の最終仕上げを優先する
- EN: Moved 2.1 and 2.5 to On-hold (Deferred) and shifted current priority to site-wide cleanup and handover readiness.
### ドキュメント更新（2026-04-04 追加126）
- クリーンアップ #1 として、公開ページのリンク有効性監査（pass-1）を実施しました。
- 変更内容:
  - `subpages/sitemap.html`
  - `subpages/workshop.html`
  - `subpages/workshop-booking.html`
  - `subpages/workshop-booking-entry.html`
  - `subpages/workshop-booking-confirm.html`
  - `subpages/workshop-booking-thanks.html`
  - `subpages/workshop-plans.html`
  - 上記 7ページの favicon 参照を `../images/logo/logo-inim-dx.jpg` から実在ファイル `../images/logo/logo-inim-dx.png` へ修正
- 監査結果:
  - JA: query/hash/template 正規化込みで、公開HTML相対 `href` のリンク切れは 0 件
  - EN: After normalization (query/hash/template), broken relative `href` count is 0 across public HTML files.
### ドキュメント更新（2026-04-04 追加127）
- クリーンアップ #2（文言/CTA整合 pass-1）として、公開主要ページの日本語優先ラベル統一を実施しました。
- 変更内容:
  - `js/site-shell.js`
  - news-strip `Latest` を `最新情報` へ変更
  - フッター見出しを `ショップ情報 / ガイド / サポート / アカウント` へ統一
  - page label の一部を日本語優先へ更新（`itemSale: セール`, `smartScent: デジタル調香`）
  - 動的フッター再描画経路と account gateway のラベル `Account / Customer Account` を `アカウント` へ統一
  - `subpages/smart-scent-design.html`
  - `Sound` / `Blend Score` / `Sound：...` を `サウンド` / `調香スコア` へ統一
  - `subpages/workshop-plans.html`
  - キッカー `Workshop Plans` を `ワークショッププラン` へ変更
  - `subpages/sale.html`
  - `<title>Sale` とキッカー `Sale` を `セール` へ変更
  - `subpages/brand*.html`, `subpages/items.html`, `subpages/item-*.html`
  - カードmeta `Next Action` と `alt=\"next action\"` を日本語（`次のアクション`）へ統一
  - `subpages/item-*.html`, `subpages/brand-*.html`
  - 汎用ラベル `Item Detail` / `Overview` を `アイテム詳細` / `概要` へ統一
  - `subpages/contact.html`
  - カードmetaを `ワークショップ / 商品 / 法人・協業` へ変更
  - account gateway の説明文を日本語化
- 目的:
  - 公開導線で英語ラベル混在を減らし、日本語中心の情報認知を揃える
- EN: Executed cleanup #2 copy/CTA consistency pass-1 with Japanese-first labels across footer, Smart Scent, workshop plans, sale page, and hub card meta text.
### ドキュメント更新（2026-04-04 追加128）
- デザイン方針の再確認により、`section-kicker` の英語表記を優先し、Smart Scent の `Sound` 表記を復帰しました。
- 変更内容:
  - `subpages/workshop-plans.html`: `section-kicker` を `Workshop Plans` へ復帰
  - `subpages/sale.html`: `section-kicker` を `Sale` へ復帰
  - `subpages/item-*.html`: `section-kicker` を `Item Detail` へ復帰
  - `subpages/ex-workshop.html`: `section-kicker` を `Overview` へ復帰
  - `subpages/smart-scent-design.html`: `Sound` ラベル/ステータス文言（OFF/ERROR含む）を英語表記へ復帰
- 目的:
  - `section-kicker` の視覚トーンを英語で統一し、既存デザイン意図（cool/compact）を維持する
- EN: Restored English `section-kicker` tone and reverted Smart Scent `Sound` wording per UI direction.
### ドキュメント更新（2026-04-04 追加129）
- `section-kicker` 英語方針を `index/workshop` へ拡張適用しました。
- 変更内容:
  - `index.html`
  - `予約ショートカット / 体験バナー / 体験フロー / ピックアップ / 新着` を
    `Booking Shortcut / Experience Banner / Experience Flow / Pick Up / New Arrival` へ変更
  - `subpages/workshop.html`
  - `ワークショップ / 価値 / シーン / フロー / 次の一歩 / プログラム / よくある質問 / 店舗` を
    `Workshop / Value / Scene / Flow / Next Step / Program / FAQ / Shops` へ変更
- 目的:
  - Top〜Workshop の主要導線で `section-kicker` デザイン言語を英語トーンで統一する
- EN: Expanded the English `section-kicker` design rule to top/workshop key sections for consistent visual tone.
### ドキュメント更新（2026-04-04 追加130）
- `subpages/`（admin除く）の `section-kicker` 整合チェックを実施し、残っていた日本語キッカーを英語トーンへ統一しました。
- 変更内容:
  - `subpages/search-shop-info.html`
    - `店舗情報` / `店舗選択` -> `Shop Info` / `Shop Selection`
  - `subpages/shopping-guide.html`
    - `ショッピングガイド` -> `Shopping Guide`
  - `subpages/workshop-booking.html`
    - `ワークショップ予約` / `空き状況` / `店舗` / `選択中の日程` / `予約枠`
      -> `Workshop Booking` / `Availability` / `Shops` / `Selected Date` / `Time Slots`
  - `subpages/workshop-booking-entry.html`
    - `予約情報入力` / `予約フォーム` / `予約ガイド` / `選択中の枠`
      -> `Booking Entry` / `Booking Form` / `Booking Guide` / `Selected Slot`
  - `subpages/workshop-booking-confirm.html`
    - `予約内容確認` -> `Booking Confirmation`
  - `subpages/workshop-booking-thanks.html`
    - `予約完了` -> `Booking Complete`
  - `subpages/workshop.html`（コメント化セクション内）
    - `予約` -> `Reservation`
- 目的:
  - 公開サブページ全体で `section-kicker` の英語デザインルールを維持し、視覚トーンのばらつきを解消する
- EN: Completed a consistency sweep across public `subpages` and converted remaining Japanese `section-kicker` labels to English for a unified visual tone.
### ドキュメント更新（2026-04-04 追加131）
- フッター見出しの英語トーン要望に合わせ、共通シェルのタイトルを再調整しました。
- 変更内容:
  - `js/site-shell.js`
  - `ショップ情報 / ガイド / サポート / アカウント`
    -> `SHOP INFO / GUIDE / SUPPORT / ACCOUNT`
  - ログイン状態で再描画されるフッター列見出しも `ACCOUNT` に統一
- 目的:
  - フッター見出しの視覚トーンを英語で統一し、既存デザイン方針（section-kicker英語）と整合させる
- EN: Reverted shared footer titles to English and aligned both initial render and auth-state re-render paths.
### ドキュメント更新（2026-04-04 追加132）
- Final responsive sweep（pass-1）として、公開サブページのSP基礎耐性を補強しました。
- 変更内容:
  - `subpages/search-store-info.html`
  - `subpages/shops.html`
    - `meta name="viewport"` を追加（旧URLリダイレクトページのSP表示を安定化）
  - `css/workshop-booking.css`
    - `@media (max-width: 720px)` で `booking-detail__table` に横スクロール対応を追加
    - `th/td` の nowrap 指定で列崩れを抑え、必要時スクロールで閲覧可能化
- 目的:
  - 旧エントリページ経由時のSP表示不整合を予防し、予約詳細テーブルの横はみ出しを回避する
- EN: Final responsive sweep pass-1 hardened mobile behavior for legacy redirect pages and booking detail table overflow handling.
### ドキュメント更新（2026-04-04 追加133）
- Final responsive sweep（pass-2）として、SP狭幅時の折返し安定性を改善しました。
- 変更内容:
  - `css/style.css`
    - `@media (max-width: 720px)` の `.top-actions` に `flex-wrap` を追加
    - `.top-actions .sound-pill` を右寄せ維持（`margin-left: auto`）
  - `css/workshop.css`
    - `.workshop-reserve__actions .button` の `white-space` を `normal` 化し、改行許可
    - SP時 `.workshop-sticky-next__text` を改行許可（`white-space: normal` + `line-height` 調整）
- 目的:
  - SP狭幅（特に 320-390px）で、固定CTAとヘッダー操作部のテキスト詰まり/見切れを防止する
- EN: Final responsive sweep pass-2 improved small-screen text wrapping stability in Smart Scent header actions and Workshop CTA elements.
### ドキュメント更新（2026-04-04 追加134）
- 最終クリーンアップとして、E2Eスモーク検証記録・admin mode runbook検証・handoverパック整理を実施しました。
- 変更内容:
  - `docs/60_TEST/TEST_PLAN.md`
    - `Top -> Workshop -> Booking` と `Smart Scent save/edit/load` の実施ログ項目を追加
    - `open_demo <-> admin_only` 切替 runbook の検証ログ項目を追加
  - `docs/10_PROJECT/WIP.md`
    - クリーンアップ項目 3/4 の完了ログを追記
  - `docs/80_HANDOFF/RELEASE_HANDOVER_2026-04-04.md`（新規）
    - 最終ステータス要約、admin mode手順、Deferredのみの残課題一覧を整理
- 検証要点:
  - JA: 公開導線（Top→Workshop→Booking）と Smart Scent 候補操作（保存/編集/読込）は現行実装で整合
  - JA: `adminAccessMode` は未知値を `admin_only` 扱いに正規化され、`open_demo`/`admin_only` の切替手順は SQL 13/14 + config 変更で再現可能
  - EN: Public flow and Smart Scent candidate operations are consistent; admin mode switching remains reproducible via SQL 13/14 and config toggle with safe normalization fallback.
### ドキュメント更新（2026-04-04 追加135）
- 限定公開向けのリリースノート草案と最終read-only監査結果を追加しました。
- 変更内容:
  - `docs/80_HANDOFF/RELEASE_NOTE_DRAFT_2026-04-04.md`（新規、JA/EN併記）
  - 公開主要ルート（Top/Workshop/Booking/Smart Scent/検索/ガイド/法務/問い合わせ）のファイル存在確認
  - `index.html` + `subpages/*.html` の静的相対 `href` 監査（テンプレート式除外）を実施
- 監査結果:
  - JA: 主要ルートファイルは全件存在
  - JA: 静的相対リンク切れは `0` 件（`index/subpages`）
  - EN: All key route files exist, and static relative-link audit found `0` broken links in `index/subpages`.
