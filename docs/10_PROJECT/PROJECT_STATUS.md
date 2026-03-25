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
- 2026-03-22 の追加実装で、STEP 1 → STEP 2 → STEP 3 の遷移時に `date_key`, `store`, `storeLabel`, `plan_id`, `session_id` をクエリ引き継ぎするようにしました。
- 2026-03-22 の追加実装で、[`subpages/workshop-booking-confirm.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking-confirm.html) の送信ボタンを Supabase `bookings` 保存へ接続しました。
- 保存時は `user_profiles` を `auth_user_id` で解決して `customer_profile_id` を設定し、`stores` から店舗名で `store_id` を解決して insert します。
- 保存 payload は `booking_type`, `booked_at`, `participant_count`, `status`, `note` に加え、拡張列 `session_id`, `plan_id`, `quoted_price_jpy`, `booking_method`, `contact_name`, `contact_email`, `contact_phone`, `party_size`, `special_requests`, `internal_note`, `confirmed_at` を設定します（値がない項目は `null`）。
- ログイン未実施やプロフィール不整合時は、確認画面でエラーメッセージを表示し、`account.html#login` への導線を表示します。
- 2026-03-22 の追加調整で、予約導線のキャッシュ判別用に `build=20260322b` をクエリ引き継ぎし、確認画面に `Booking build` 表示を追加しました。
- 2026-03-23 の追加調整で、`store_id` 解決は `stores` 一覧に対する表記ゆれ吸収マッチ（日本語/英語ヒント、正規化比較）へ変更し、`浅草店が見つからない` エラーの再発を防ぐようにしました。
- 2026-03-23 の追加調整で、`Multiple GoTrueClient instances` 警告を解消するため、`window.__INIM_SUPABASE_CLIENT` による singleton 化を `js/site-shell.js` と確認画面側の両方に適用しました。
- 2026-03-23 のユーザー再確認で、`Booking build: 20260322b`、予約送信成功、予約ID表示あり、Console エラーなしを確認しました。
- 別端末再開時の混乱防止として、`docs/10_PROJECT/WIP.md` に「必須ルール」と「再開ショート手順」を追記済みです。
- `app/` 配下も確認しましたが、2026-03-22 時点では電話番号入力フィールド自体が存在しないため、同ロジックの適用対象はまだありません。今後 `app` 側に電話番号入力を追加する際は、同等の validity と整形を適用する前提とします。
- 2026-03-22 の導線整理で、[`subpages/workshop.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop.html) の `予約する` と 3 コースの各予約ボタンは、いったんすべて [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) へ統一しました。
- 同日の追加調整で、`workshop.html` の `行き先を選ぶ` で選択した店舗 (`浅草店 / 柴又店 / ソラマチ店`) を `store` クエリとして [`subpages/workshop-booking.html`](C:/Users/maxsh/OneDrive/Documents/EDIX/src/inim-dx/subpages/workshop-booking.html) へ引き継ぎ、予約画面側でも選択状態を維持するようにしました。
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
