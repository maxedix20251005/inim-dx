# TEST PLAN / テスト計画

## Purpose / 目的
- JA: 本プロジェクトのテスト方針・対象・完了条件を管理する。
- EN: Manage test strategy, scope, and completion criteria for this project.

## Scope / 対象範囲
- JA: 公開側ワークショップ予約導線（`workshop.html` と関連CTA）の遷移整合確認。
- EN: Validate public workshop booking flow consistency (`workshop.html` and related CTAs).

## Entry Criteria / 開始条件
- JA: 対象ページが最新デプロイ済みであること。
- EN: Target pages are deployed with latest updates.
- JA: ブラウザキャッシュをハードリロード済みであること。
- EN: Browser cache is hard-refreshed.

## Exit Criteria / 完了条件
- JA: 対象CTAがすべて `subpages/workshop-booking.html` へ遷移すること。
- EN: All target CTAs route to `subpages/workshop-booking.html`.
- JA: Console エラーが発生しないこと。
- EN: No console errors occur during the verification.

## Test Types / テスト種別
- JA: Manual（画面遷移確認）
- EN: Manual (navigation validation)

## Test Execution Log / テスト実行ログ
- Date: 2026-03-25
- Target Task: #1 予約導線整理
- Result:
  - `#1 予約導線`: OK
  - `workshop.html CTA`: OK
  - `ex-workshop.html CTA`: OK
  - `遷移先`: `subpages/workshop-booking.html`
  - `Console`: エラーなし
- Note:
  - JA: `ex-workshop.html` はバックアップ扱い。今後は通常変更対象から外す。
  - EN: `ex-workshop.html` is treated as backup and should be excluded from routine changes.

## Traceability / 追跡
- JA: Issue連携は `docs/10_PROJECT/ISSUE_LIST.md` を参照する。
- EN: Link issues to `docs/10_PROJECT/ISSUE_LIST.md`.

## Planned Verification / 予定確認
- Date: 2026-03-25
- Target Task: #2 予約入力必須項目と確認フロー確定
- Checks:
  - `contact_name`, `contact_email`, `contact_phone`, `party_size` の必須バリデーション
  - 入力不備時は「確認画面へ進む」が無効のままであること
  - 確認画面でURL改ざん等により必須値不足がある場合、送信不可になること
  - STEP 1 -> STEP 2 -> STEP 3 の遷移と戻り導線が維持されること
- Date: 2026-03-25
- Target Task: #3 予約完了（Thanks）導線
- Checks:
  - 確認画面で予約送信成功後、`subpages/workshop-booking-thanks.html` へ自動遷移すること
  - Thanks画面で `booking_id`, `status`, `label/date`, `gather`, `party_size` が表示されること
  - Console エラーが発生しないこと- Date: 2026-03-26
- Target Task: #3 予約完了（Thanks）導線 / 認証失敗ハンドリング
- Checks:
  - 未ログイン状態で送信した場合、`Auth session missing` 生文ではなくログイン誘導メッセージが表示されること
  - ログイン後に再送信すると Thanks 画面へ遷移すること
  - Console エラーが発生しないこと- Date: 2026-03-26
- Target Task: Workshop sessions 実データ表示
- Checks:
  - `workshop_sessions` が0件の場合は固定モック（4/5）を表示しないこと
  - 空状態メッセージが表示されること（date range / RLS / seed data確認）
  - `workshop_sessions` 登録後は該当日がカレンダーへ反映されること


## 2026-03-26 追加テスト / Added Test
- 対象: Workshop Booking public data bootstrap (`09/10/11`)
- 手順:
  1. Supabase SQL Editor で `sql/09_seed_workshop_booking_master_and_sessions.sql` を実行
  2. `sql/11_verify_workshop_public_data.sql` で `active_plans_count > 0` と `published_sessions_count > 0` を確認
  3. 予約画面 Diagnostics が `Plans>0`, `Sessions>0` になることを確認
  4. 0件のままなら `sql/10_workshop_public_read_policies.sql` 実行後に `sql/11` を再実行
- 期待結果:
  - 公開予約カレンダーに複数日が表示される
  - `Source=Supabase`, `Error=-`, `Plans/Sessions` が 0 でない

## 2026-03-26 追加テスト / Added Test (Booking Management Screen)
- 対象: `app/pages/workshop.html`
- 手順:
  1. 管理者ログイン後、`app/pages/workshop.html` を開く
  2. 一覧表示で bookings が表示されることを確認
  3. キーワード/ステータス/方式/日付で絞り込みできることを確認
  4. 任意行を選択し `status` と `internal_note` を更新
  5. 再読込後も更新値が維持されることを確認
- 期待結果:
  - Supabase 直接参照なしで予約運用確認が可能
  - 更新失敗時は画面上にエラーメッセージが表示される

## 2026-03-26 追加テスト / Added Test (Workshop + Slider)
- 対象:
  - `subpages/workshop.html` (CSS externalisation / links)
  - `subpages/workshop-plans.html` (new page)
  - `index.html` (hero slider)
- 手順:
  1. `subpages/workshop.html` を開き、レイアウト崩れがないことを確認
  2. 「プランを見る」で `subpages/workshop-plans.html` へ遷移することを確認
  3. `subpages/workshop.html` の「ダッシュボード」で `app/dashboard.html` へ遷移することを確認
  4. `index.html` でヒーロー画像が3秒ごとに切り替わることを確認
- 期待結果:
  - workshop ページにインラインCSSが存在しない
  - プラン導線/ダッシュボード導線が有効
  - トップスライダーが自動再生される

## 2026-03-26 追加テスト / Added Test (Admin Access Control)
- 対象:
  - `app/dashboard.html`
  - `app/pages/workshop.html`
- 手順:
  1. admin ロールでログインし、両ページにアクセス
  2. non-admin ロールでログインし、同じURLへアクセス
- 期待結果:
  - admin: ページ表示可
  - non-admin: 管理データが表示されずアクセス拒否される

## 2026-03-26 追加テスト / Added Test (Booking LED + Runtime Data)
- 対象: `subpages/workshop-booking.html`
- 手順:
  1. 公開予約ページを開く
  2. Diagnostics の `Source/Error/Plans/Sessions` を確認
  3. カレンダーで予約可能日の選択ができることを確認
- 期待結果:
  - `Source=Supabase`, `Error=-`, `Plans>0`, `Sessions>0`
  - LED が緑で表示される
  - 予約可能日が表示される

## 2026-03-26 追加テスト / Added Test (Workshop Plans DB Binding)
- 対象: `subpages/workshop-plans.html`
- 手順:
  1. ページを開いて plans status を確認
  2. active plan 件数が表示されることを確認
  3. 各カードから予約画面へ遷移できることを確認
- 期待結果:
  - Supabase接続時は `workshop_plans` を表示
  - `workshop_plan_inclusions` があれば要点がカードに表示される
  - データ未取得時はフォールバックカードを表示

## 2026-03-26 追加テスト / Added Test (Admin-Only Site Links)
- 対象: 公開ページヘッダー/サイド/フッター (`js/site-shell.js`)
- 手順:
  1. admin ログイン状態で公開ページを開く
  2. Global Navigation / Side Navi / Footer に adminリンクが表示されることを確認
  3. 非ログインまたは一般ユーザー状態で同ページを開き、adminリンクが表示されないことを確認
- 期待結果:
  - admin のみ管理リンクを視認できる
  - 一般ユーザーに管理リンクが露出しない

## 2026-03-26 追加テスト / Added Test (Workshop Plan Images + Admin Logo)
- 対象:
  - subpages/workshop-plans.html
  - app/dashboard.html, app/publish.html, app/pages/home.html（admin shell pages）
- 手順:
  1. sql/12_add_workshop_plan_image_url.sql を実行する
  2. sql/09_seed_workshop_booking_master_and_sessions.sql を再実行する
  3. subpages/workshop-plans.html を開き、各カード画像がDB値またはフォールバックで表示されることを確認する
  4. 任意の管理画面を開き、ロゴが左上サイドバー内に表示されることを確認する
- 期待結果:
  - plan_image_url を設定したプランは指定画像が表示される
  - 未設定時はフォールバック画像が表示される
  - 管理画面ロゴは左上で統一される




## 2026-03-26 追加テスト / Added Test (Booking Summary Dynamic)
- 対象: `subpages/workshop-booking.html`
- 手順:
  1. ページを開き、Summary 4項目が固定文言でなくデータ連動値になることを確認
  2. `workshop_sessions` 期間変更後に開催期間表示が追従することを確認
  3. `workshop_plans.base_price_jpy` の最小値変更後に料金目安が追従することを確認
- 期待結果:
  - 開催期間/対象店舗/予約方式/料金目安がDB由来で表示される

## 2026-03-26 追加テスト / Added Test (Workshop Plan Admin Screen)
- 対象:
  - `app/pages/workshop-plans.html`
  - `app/pages/workshop.html`
- 手順:
  1. admin で `app/pages/workshop-plans.html` を開く
  2. 既存プランを編集し保存後、`subpages/workshop-plans.html` へ反映されることを確認
  3. Inclusion を追加/削除し、公開プランカードへ反映されることを確認
  4. `app/pages/workshop.html` から `Plan Management` リンクで遷移できることを確認
- 期待結果:
  - プラン管理が画面から実行できる
  - 保存内容が公開プランページに反映される


## 2026-03-26 追加テスト / Added Test (Sitemap Page + Footer Link)
- 対象:
  - `subpages/sitemap.html`
  - `js/site-shell.js` footer Guide links
- 手順:
  1. 任意の公開ページのFooterから「サイトマップ」を押下
  2. `subpages/sitemap.html` が表示されることを確認
  3. Public/Adminリンクから各代表ページへ遷移できることを確認
- 期待結果:
  - Footer「サイトマップ」からサイト構造ページへ遷移できる
  - サイト構造確認とページ探索が可能

## 2026-03-26 追加テスト / Added Test (Task #3 Booking Completion Hardening)
- 対象:
  - `subpages/workshop-booking-entry.html`
  - `subpages/workshop-booking-confirm.html`
  - `subpages/workshop-booking-thanks.html`
- 手順:
  1. `workshop-booking.html` から有効な予約枠を選択し、entry -> confirm へ遷移する
  2. confirm 画面で「予約枠確認OK」プリフライト表示が出ることを確認する
  3. `session_id` または `plan_id` を欠損させたURLで confirm を開き、送信がブロックされることを確認する
  4. 満席/非公開セッション、または非activeプランを選んだ場合に送信がブロックされることを確認する
  5. 正常送信後、thanks 画面で status が利用者向けラベル（pending/confirmed など）で表示されることを確認する
- 期待結果:
  - 送信前に予約枠の実データ検証が必ず実行される
  - 不正/無効な予約枠では `bookings` insert が行われない
  - 正常な予約のみ完了画面へ遷移する
