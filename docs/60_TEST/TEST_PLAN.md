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

## 2026-03-26 追加テスト / Added Test (Step 1 UX Conversion Tuning)
- 対象:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- 手順:
  1. 公開予約ページを開き、ヒーロー文言が「店舗選択 -> 日付選択 -> 申込」の順で理解できる内容になっていることを確認する
  2. 店舗チップ、予約可能日、予約枠カードに hover/selected の視認差があることを確認する
  3. 選択バーCTAが Primary 表現で表示され、`#booking-slots-panel` へ遷移できることを確認する
  4. Desktop 幅では選択バーがスクロール中に追従表示されること、Mobile 幅では通常表示に戻ることを確認する
  5. レイアウト崩れや Console エラーがないことを確認する
- 期待結果:
  - 予約ページの次アクションが視覚的・文言的に明確である
  - Step 1 から Step 2（予約枠選択）への遷移意図が弱まらない
  - Desktop/Mobile で表示ルールどおりに選択バーが動作する

## 2026-03-26 追加テスト / Added Test (Single-Month Calendar + Selected Date Panel)
- 対象:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- 手順:
  1. 予約ページを開き、カレンダーが1か月分のみ表示されることを確認する
  2. `<` / `>` を押して前月・翌月へ遷移できること、先頭/末尾月で無効化されることを確認する
  3. 任意の日付を選択し、右側 `Selected Date` パネルの「選択日 / 店舗 / 状態 / 料金目安」が更新されることを確認する
  4. `この日程の予約枠を見る` から `#booking-slots-panel` へ遷移し、該当日の予約枠が表示されることを確認する
  5. モバイル幅で `Selected Date` パネルがカレンダー下に崩れず表示されることを確認する
- 期待結果:
  - 月送り操作と選択日コンテキスト表示が一貫して動作する
  - 日付選択から予約枠確認までの導線が切れない
  - レスポンシブ時も主要情報が失われない

## 2026-03-26 追加テスト / Added Test (Duplicate UI Consolidation)
- 対象:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- 手順:
  1. 予約ページを開き、`Selected Date` が右側パネルの1箇所のみで表示されることを確認する
  2. 下段予約枠セクションに重複した `Selected Date` 見出し/日付文脈がないことを確認する
  3. `予約枠を確認する` が表示されず、`この日程の予約枠を見る` の1つのみで遷移できることを確認する
  4. 日付未選択時は右側CTAが無効表示になり、日付選択後に有効化されることを確認する
- 期待結果:
  - 予約ページの文脈表示とCTAが重複せず、一意に理解できる
  - ユーザーが次アクションを迷わず選択できる

## 2026-03-26 追加テスト / Added Test (Admin Dashboard Operations Home)
- 対象:
  - `app/dashboard.html`
  - `js/admin-app.js`
  - `css/admin-app.css`
- 手順:
  1. admin ログイン後に dashboard を開く
  2. `Operations Home` カードに `Today's Bookings / Tomorrow / Pending Requests / Stale Pending / Unassigned Enquiries` が表示されることを確認する
  3. 各カードリンクから `app/pages/workshop.html?quick=...`（または publish）へ遷移できることを確認する
  4. Data health 表示が `ok` または `partial` で表示されることを確認する
- 期待結果:
  - 運用優先度に沿った KPI が dashboard で即時確認できる
  - 優先キューへの遷移導線が機能する

## 2026-03-26 追加テスト / Added Test (Admin Booking Quick-Flow)
- 対象:
  - `app/pages/workshop.html`
  - `css/app-workshop-bookings.css`
- 手順:
  1. `?quick=today`, `?quick=tomorrow`, `?quick=pending`, `?quick=stale_pending` で画面を開き、quick tab 状態と一覧結果が連動することを確認する
  2. 予約一覧に `Contact` と `SLA` 列が表示されることを確認する
  3. `pending/requested/in_progress` の古いデータで `Overdue` 表示になることを確認する
  4. 詳細パネルの `Mark In Progress / Mark Confirmed / Mark Cancelled` を使って status を切替できることを確認する
  5. メモテンプレートボタン押下で `Internal Note` へ文言が入力され、保存できることを確認する
- 期待結果:
  - quick filter による優先キュー確認が可能
  - SLA可視化により未対応案件を識別できる
  - 詳細更新操作が短手順で完了できる

## 2026-03-26 追加テスト / Added Test (Admin Side Navi Workshop Links)
- 対象:
  - `app/dashboard.html`
  - `js/admin-app.js`
- 手順:
  1. admin ログイン後、ダッシュボードのサイドナビを確認する
  2. `Workshop予約管理` を押下し、`app/pages/workshop.html` へ遷移することを確認する
  3. `Workshopプラン管理` を押下し、`app/pages/workshop-plans.html` へ遷移することを確認する
- 期待結果:
  - Dashboard から booking / plan 管理画面へ直接遷移できる

## 2026-03-26 追加テスト / Added Test (Unassigned Enquiries Link Routing)
- 対象:
  - `app/dashboard.html`
  - `js/admin-app.js`
- 手順:
  1. dashboard の `Operations Home` で `Unassigned Enquiries` カードを確認する
  2. リンク押下で `app/pages/enquiries.html?quick=unassigned` へ遷移することを確認する
- 期待結果:
  - dashboard から未割当問い合わせキューへ直接遷移できる

## 2026-03-26 追加テスト / Added Test (Dedicated Enquiries Management Screen)
- 対象:
  - `app/pages/enquiries.html`
  - `css/app-enquiries.css`
  - `js/admin-app.js`（dashboard link）
- 手順:
  1. Dashboard の `Unassigned Enquiries` カードから `app/pages/enquiries.html?quick=unassigned` へ遷移する
  2. enquiries 一覧が表示され、quick tab が `Unassigned` で有効化されることを確認する
  3. `Open` / `Stale >24h` / `All` タブ切替で一覧件数が更新されることを確認する
  4. 任意行選択後、`status`、`assigned_to`、`internal note`（または note）を更新できることを確認する
  5. Workshop Bookings / Workshop Plans 画面ヘッダーの `Enquiries` リンクから同画面へ遷移できることを確認する
- 期待結果:
  - 問い合わせ運用が専用画面で完結する
  - Unassigned 監視導線が dashboard から直接機能する
  - 予約管理/プラン管理画面からの相互導線が機能する

## 2026-03-26 追加テスト / Added Test (Admin Shell Layout Consistency)
- 対象:
  - `app/pages/workshop.html`
  - `app/pages/workshop-plans.html`
  - `app/pages/enquiries.html`
  - `js/admin-app.js`
- 手順:
  1. admin でログインし、上記3ページをそれぞれ開く
  2. `app/pages/home.html` と同じサイドナビと共通ヘッダーが表示されることを確認する
  3. サイドナビから `Workshop予約管理` / `Workshopプラン管理` / `問い合わせ管理` を相互遷移し、レイアウトが維持されることを確認する
  4. 各ページの一覧・詳細・更新操作が従来どおり動作することを確認する
- 期待結果:
  - 3ページとも管理画面共通シェルで表示される
  - サイドナビ導線が統一され、ページ遷移後も操作文脈が維持される
  - 機能退行（表示崩れ、操作不能）が発生しない

## 2026-03-26 追加テスト / Added Test (Admin 04/05/06 Empty Body Regression)
- 対象:
  - `app/pages/workshop.html`
  - `app/pages/workshop-plans.html`
  - `app/pages/enquiries.html`
  - `js/admin-app.js` and page modules
- 手順:
  1. admin でログイン後、04/05/06 を順に開く
  2. 初回表示で本文（一覧/フォーム）が描画されることを確認する
  3. サイドナビで 04 -> 05 -> 06 -> 04 と往復遷移する
  4. 各遷移後も本文が空にならず、フィルタ/更新操作が可能なことを確認する
- 期待結果:
  - シェル再描画後もページ本文が維持される
  - 04/05/06 のデータ表示が安定して継続する

## 2026-03-26 追加テスト / Added Test (Enquiries Width + Plans UI Consistency)
- 対象:
  - `app/pages/enquiries.html`
  - `app/pages/workshop-plans.html`
  - `css/app-enquiries.css`
  - `css/app-workshop-plans.css`
- 手順:
  1. `app/pages/enquiries.html` を開き、一覧テーブル領域が従来より狭く、詳細パネルの視認領域が広がっていることを確認する
  2. `app/pages/workshop-plans.html` を開き、`app/pages/workshop.html` と同様のパネル枠/ボタン色/テーブル選択状態/入力部品スタイルになっていることを確認する
  3. Plans 画面で行選択、保存、Inclusion 追加/削除の操作時にレイアウト崩れがないことを確認する
  4. モバイル幅（<=980px）で両画面とも1カラムに折りたたまれ、操作可能なことを確認する
- 期待結果:
  - Enquiries は詳細中心の作業レイアウトになる
  - Workshop Plans は Workshop Bookings と統一感のある運用UIになる
  - 主要操作でスタイル/配置崩れが発生しない

## 2026-03-26 追加テスト / Added Test (Enquiries Width Re-Tuning #2)
- 対象:
  - `app/pages/enquiries.html`
  - `css/app-enquiries.css`
- 手順:
  1. Desktop 幅で `app/pages/enquiries.html` を開く
  2. 一覧パネルが前回より狭く、詳細パネルが明確に広いことを確認する
  3. 代表的な長文 Subject 行で一覧が横スクロールまたは省略表示され、詳細側操作領域を圧迫しないことを確認する
  4. 980px 以下で1カラムへ折りたたまれることを確認する
- 期待結果:
  - Enquiries は詳細対応中心のレイアウト比率になる
  - レスポンシブ動作と操作性を維持する

## 2026-03-26 追加テスト / Added Test (Enquiries Width = Workshop Bookings)
- 対象:
  - `app/pages/enquiries.html`
  - `app/pages/workshop.html`
  - `css/app-enquiries.css`
- 手順:
  1. Desktop 幅で `app/pages/workshop.html` と `app/pages/enquiries.html` を開く
  2. 一覧パネルと詳細パネルの幅比率が同等（`1.4fr .9fr`）であることを確認する
  3. Enquiries 一覧で Subject が過度に欠けず、詳細パネルの編集操作も維持されることを確認する
  4. 980px 以下で両画面とも1カラムに折りたたまれることを確認する
- 期待結果:
  - Enquiries と Workshop Bookings の2カラム幅が統一される
  - 操作性と可読性のバランスが両画面で一致する

## 2026-03-26 追加テスト / Added Test (Enquiries Horizontal Overflow Fix)
- 対象:
  - `app/pages/enquiries.html`
  - `css/app-enquiries.css`
- 手順:
  1. Desktop 幅でページを開き、フィルタ行の右端（検索ボタン含む）が画面内に収まることを確認する
  2. 一覧 + 詳細の2カラム表示で、右カラムが画面外へはみ出さないことを確認する
  3. 詳細パネルで長いUUIDやメール文字列が表示されても横スクロールで全体レイアウトが崩れないことを確認する
  4. 980px 以下で1カラム折りたたみへ遷移することを確認する
- 期待結果:
  - Enquiries 画面に水平はみ出しが発生しない
  - 幅比率（Workshop Bookings同等）を維持したまま表示安定性が確保される

## 2026-03-26 追加テスト / Added Test (Phase 2 Slice #1: Enquiries Pagination/Sorting/Persistence)
- 対象:
  - `app/pages/enquiries.html`
  - `js/admin-enquiries-page.js`
  - `css/app-enquiries.css`
- 手順:
  1. `app/pages/enquiries.html` を開き、各列ヘッダークリックで昇順/降順ソートが切替わることを確認する
  2. Pager の `Prev/Next` と `Rows(10/20/50/100)` 変更で表示件数とページ情報が連動することを確認する
  3. quick/filter/sort/page size を設定後にページを再読込し、状態が復元されることを確認する
  4. `?quick=unassigned` などURL指定で該当quickが優先適用されることを確認する
  5. 条件に一致するデータが0件のとき `No enquiries matched your filter.` が表示されることを確認する
  6. 取得エラー時にテーブル内へ `Load failed: ...` が表示されることを確認する
- 期待結果:
  - Enquiries 画面で大量データ運用時の探索性が向上する
  - 再訪時も前回の作業コンテキスト（filter/sort/page size）が維持される
  - 空データ/エラー時に操作判断可能な状態表示がされる

## 2026-03-26 追加テスト / Added Test (Phase 2 Slice #2: Bookings/Plans Pagination+Sorting)
- 対象:
  - `app/pages/workshop.html`
  - `app/pages/workshop-plans.html`
  - `js/admin-workshop-page.js`
  - `js/admin-workshop-plans-page.js`
- 手順:
  1. `app/pages/workshop.html` で各列ヘッダーソート、Prev/Next、Rows変更が動作することを確認する
  2. Bookings の quick/filter/sort/page size を設定して再読込し、状態が復元されることを確認する
  3. `?quick=today` などURL指定時に quick が優先適用されることを確認する
  4. `app/pages/workshop-plans.html` で各列ヘッダーソート、Prev/Next、Rows変更が動作することを確認する
  5. Plans の sort/page size を変更して再読込し、状態が復元されることを確認する
  6. 0件条件または取得失敗時にテーブル内メッセージが表示されることを確認する
- 期待結果:
  - 04/05/06 すべてでページング＋ソート基盤が揃う
  - 再訪時の作業コンテキスト保持により運用効率が向上する

## 2026-03-26 追加テスト / Added Test (Public Nav Consolidation + Rollback Flag)
- 対象:
  - `js/site-config.js`
  - `js/site-shell.js`
  - `css/style.css`
- 手順:
  1. `enablePublicSideNav: false` で公開ページを開き、サイドナビが表示されずグローバルナビのみ表示されることを確認する
  2. グローバルナビの現在ページに `aria-current="page"` が付与されることを確認する
  3. スクロール時にグローバルナビへ `is-floating` と `is-compact` が適用され、表示が詰まることを確認する
  4. 980px 以下で公開ページを開き、左余白過大が発生しないことを確認する
  5. `enablePublicSideNav: true` に変更して再確認し、旧サイドナビ＋ハンバーガー構成へ戻ることを確認する
- 期待結果:
  - 公開導線は重複ナビなしで運用できる
  - ロールバック手段が設定値のみで機能する
  - Desktop/Mobile でナビ表示崩れが発生しない

## 2026-03-26 追加テスト / Added Test (Public Header + Drilldown Global Nav)
- 対象:
  - `js/site-shell.js`
  - `css/style.css`
  - `js/site-config.js`
- 手順:
  1. 公開ページを開き、左上が `images/logo/logo-inim-dx.jpg` 表示になっていることを確認する
  2. notice bar に「配送・返品・お支払い...」文言が表示されないことを確認する
  3. グローバルナビの親メニュー（例: ブランド / アイテム / 香りから探す / 香りと遊ぶ）で子メニューが開くことを確認する
  4. 子メニュー項目が旧サイドナビの構成と一致することを確認する
  5. 画面外クリックまたは Esc で submenu が閉じることを確認する
  6. 現在ページに `is-current` と `aria-current="page"` が適用されることを確認する
  7. `enablePublicSideNav: true` へ変更した場合、旧サイドナビが再表示されることを確認する
- 期待結果:
  - 公開ヘッダーはロゴ中心で重複情報が減り、視認性が向上する
  - グローバルナビ単体で主要導線と子導線に到達できる
  - ロールバックは設定値変更のみで可能

## 2026-03-26 追加テスト / Added Test (Global Nav Hover Expand + Typography)
- 対象:
  - `css/style.css`
  - `js/site-shell.js`
- 手順:
  1. Desktop 幅で公開ページを開き、親メニューにホバーした際に子メニューが展開されることを確認する
  2. 親メニューからマウスを外すと子メニューが閉じることを確認する
  3. グローバルナビのトップレベル文字が太字かつ中央配置であることを確認する
  4. 980px 以下で開き、トグル操作で子メニューが開閉できることを確認する
- 期待結果:
  - Desktop は hover で直感的に drilldown が利用できる
  - Mobile は誤操作を抑えたトグル開閉を維持する
  - ナビ文字の視認性が向上している

## 2026-03-26 追加テスト / Added Test (Global Nav Hover Bridge)
- 対象:
  - `css/style.css`
- 手順:
  1. Desktop 幅で親メニューへホバーし、submenu を展開する
  2. 親メニューから submenu へマウスを移動し、submenu が閉じずに維持されることを確認する
  3. submenu 項目をクリックして遷移できることを確認する
- 期待結果:
  - hover drilldown の実運用で submenu を安定して選択できる
## 2026-03-26 追加テスト / Added Test (Admin Access Mode Switch: open_demo vs admin_only)
- 対象:
  - `js/site-config.js`
  - `js/admin-app.js`
  - `js/admin-workshop-page.js`
  - `js/admin-workshop-plans-page.js`
  - `js/admin-enquiries-page.js`
- 手順:
  1. `adminAccessMode: "open_demo"` に設定し、未ログイン状態で `app/dashboard.html` / `app/pages/workshop.html` / `app/pages/workshop-plans.html` / `app/pages/enquiries.html` を開く
  2. 各画面で本文データが表示されることを確認する（ログイン画面へリダイレクトされない）
  3. `adminAccessMode: "admin_only"` に切替えて同URLを再確認する
  4. 未ログイン時は `app/login.html` へリダイレクトされることを確認する
- 期待結果:
  - `open_demo`: 未ログインでも管理画面アクセス可能（デモ運用）
  - `admin_only`: 従来どおりログイン必須で保護される
  - EN: Admin access behavior switches correctly by config without code changes.
## 2026-03-26 追加テスト / Added Test (Global Nav Admin Always Visible)
- 対象:
  - `js/site-shell.js`
- 手順:
  1. 未ログイン状態で公開ページを開き、グローバルナビに `Admin` が表示されることを確認する
  2. ログイン状態でも `Admin` が表示され続けることを確認する
  3. `Admin` の見た目（高さ、余白、ホバー）が他トップメニューと同一であることを確認する
  4. `app/dashboard.html` を開いたとき `Admin` が current 表示（`is-current`）になることを確認する
- 期待結果:
  - `Admin` はセッション有無に関係なく常時表示される
  - グローバルナビ内で他メニューと同じUI構造・挙動を維持する
  - EN: Admin top-level menu remains visible at all times with consistent styling/active state behavior.
## 2026-03-26 追加テスト / Added Test (Open Demo Anonymous Session Bootstrap)
- 対象:
  - `js/admin-app.js`
  - `js/admin-workshop-page.js`
  - `js/admin-workshop-plans-page.js`
  - `js/admin-enquiries-page.js`
- 手順:
  1. `adminAccessMode: "open_demo"` に設定し、ログアウト状態で `app/pages/workshop.html` と `app/pages/enquiries.html` を開く
  2. 一覧が0件固定でなく、実データ件数（またはRLSエラー表示）へ遷移することを確認する
  3. Supabase で Anonymous auth を有効/無効それぞれで挙動を確認する
- 期待結果:
  - Anonymous auth 有効時: 匿名認証セッションが確立され、一覧データが表示される
  - Anonymous auth 無効時: 認証確立不可のためデータ取得は制限されるが、画面自体は `open_demo` として表示継続される
  - EN: Demo mode attempts anonymous-auth bootstrap and loads records when policy/environment permits.
## 2026-03-26 追加テスト / Added Test (Demo Read Policy Apply/Rollback for Admin Ops)
- 対象:
  - `sql/13_admin_demo_read_policies.sql`
  - `sql/14_revert_admin_demo_read_policies.sql`
  - `app/pages/workshop.html`
  - `app/pages/enquiries.html`
- 手順:
  1. `sql/13_admin_demo_read_policies.sql` を Supabase SQL Editor で実行する
  2. ログアウト状態 + `adminAccessMode: "open_demo"` で `Workshop Bookings / Enquiries` を開き、一覧に実データが表示されることを確認する
  3. `sql/14_revert_admin_demo_read_policies.sql` を実行する
  4. 同条件で再確認し、再び `0/0` になる（またはRLSにより非表示になる）ことを確認する
- 期待結果:
  - 適用時: デモ用途の一覧確認が可能
  - 巻き戻し時: RLS保護状態へ即時復帰
  - EN: Apply/rollback scripts switch demo visibility predictably for admin operations pages.
## 2026-03-26 追加テスト / Added Test (Rollback to Admin-Only: Final Security Restore)
- 対象:
  - `sql/14_revert_admin_demo_read_policies.sql`
  - `js/site-config.js`
  - `app/dashboard.html`
  - `app/pages/workshop.html`
  - `app/pages/enquiries.html`
- 手順:
  1. `sql/14_revert_admin_demo_read_policies.sql` を実行する
  2. `js/site-config.js` で `adminAccessMode: "admin_only"` に変更する
  3. ブラウザをハードリロードする
  4. 未ログインで対象URLへアクセスし、`app/login.html` に遷移することを確認する
  5. 管理者ログイン後は対象ページでデータ表示・更新が可能なことを確認する
- 期待結果:
  - デモ向けの公開読取状態が解除される
  - 管理画面はログイン必須の通常保護状態へ復帰する
  - EN: Security posture returns to admin-only with predictable rollback behavior.

## 2026-03-27 追加テスト / Added Test (Step 1 Copy + Disabled CTA Clarity)
- 対象:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- 手順:
  1. 予約ページを開き、Hero/summary/availability/store/selected-date/legend/slot intro の文言が文字化けなく表示されることを確認する
  2. 日付未選択時、`この日程の予約枠を見る` が非活性表示（誤操作不能）であることを確認する
  3. 日付選択後、同CTAから `#booking-slots-panel` へ遷移できることを確認する
  4. Diagnostics、店舗選択、日付選択、予約枠表示が従来どおり動作することを確認する
  5. Console エラーが発生しないことを確認する
- 期待結果:
  - Step 1 の次アクション理解が改善される
  - 既存導線・機能に退行がない
  - EN: Step 1 action intent is clearer with no regressions in existing booking flow.


## 2026-03-27 追加テスト / Added Test (Enquiries Quick Status One-Click Save)
- 対象:
  - `js/admin-enquiries-page.js`
  - `app/pages/enquiries.html`
- 手順:
  1. `app/pages/enquiries.html` で任意の問い合わせを選択する
  2. `Mark In Progress` を押下し、`Update Enquiry` を押さずに status が更新されることを確認する
  3. 同様に `Mark Responded` / `Mark Closed` でも1クリック更新されることを確認する
  4. 更新後に一覧再取得され、選択中レコードが維持されることを確認する
  5. Console エラーが発生しないことを確認する
- 期待結果:
  - quick status 操作が1クリックで保存完了する
  - Enquiries triage のクリック数が削減される
  - EN: Quick status actions persist in one click with no regressions.
- Recheck note (2026-03-27): verify quick-status update persists on environments where requestSubmit is unsupported, using submit-event fallback path.
- Recheck note (2026-03-27): in open_demo anonymous session, update actions must show read-only message; after admin login, updates must persist.

## 2026-03-27 Added Test (Admin Sidebar Visibility / Overlay Fix)
- Target files:
  - `css/admin-app.css`
  - `app/pages/workshop.html`
  - `app/pages/workshop-plans.html`
  - `app/pages/enquiries.html`
- Steps:
  1. Hard refresh (`Ctrl+F5`) after asset version update to `20260327c`.
  2. Open pages 04/05/06 and verify sidebar shows items 01-08.
  3. Reduce window height and verify sidebar scroll works independently.
  4. Verify no white panel overlays lower-left area.

- Result (2026-03-27): Sidebar visibility/overlay fix passed user verification with asset version 20260327c.

## 2026-03-27 Added Test (Admin Anonymous Read-Only UX)
- Target: `js/admin-enquiries-page.js`, `js/admin-workshop-page.js`
- Verify in `open_demo` anonymous session:
  1. `Update Enquiry` / `Update Booking` buttons are disabled.
  2. quick-status buttons are disabled.
  3. Fixed message appears: `Demo mode is read-only. Login required to save.`

## 2026-03-27 Added Test (Admin JA Labels + Unified Button Style)
- Target: `js/admin-workshop-page.js`, `js/admin-enquiries-page.js`, `css/app-workshop-bookings.css`, `css/app-enquiries.css`
- Check: action buttons in 04/06 are Japanese labels and same geometry/style (44px height, 10px radius).


- Result (2026-03-27): Footer「サイトマップ」から subpages/sitemap.html へ遷移し、更新済みの公開/管理導線一覧（管理アクセス注記含む）を確認。
## 2026-03-28 追加テスト / Added Test (Top -> Workshop Flow Reinforcement Slice-1)
- 対象:
  - `index.html`
  - `css/style.css`
- 手順:
  1. トップ Hero の CTA に `ワークショップを予約する` が表示され、`subpages/workshop-booking.html` へ遷移できることを確認する
  2. Experience Banner の CTA に `プランを比較する` (`subpages/workshop-plans.html`) と `予約枠を確認する` (`subpages/workshop-booking.html`) が表示されることを確認する
  3. Journey セクション下に STEP1/2/3 導線ボタンが表示され、それぞれ
     - STEP 1: `subpages/smart-scent-design.html`
     - STEP 2: `subpages/workshop.html`
     - STEP 3: `subpages/workshop-booking.html`
     へ遷移することを確認する
  4. 720px 以下でボタン群が縦積み表示され、レイアウト崩れがないことを確認する
  5. Console エラーが発生しないことを確認する
- 期待結果:
  - Top から Workshop/Booking への遷移が短手順で明確になる
  - モバイル/デスクトップ双方で CTA 群の可読性が維持される
  - EN: Conversion path from Top to Workshop/Booking is clearer with no layout regression.
## 2026-03-28 追加テスト / Added Test (Booking Diagnostics Visibility Toggle)
- 対象:
  - `js/site-config.js`
  - `subpages/workshop-booking.html`
- 手順:
  1. `showBookingDiagnostics: false` で予約ページを開き、`Data Diagnostics` パネルが表示されないことを確認する
  2. `showBookingDiagnostics: true` に変更して再読込し、`Data Diagnostics` パネルが表示されることを確認する
  3. いずれの設定でもカレンダー/予約枠/店舗選択の挙動が変わらないことを確認する
- 期待結果:
  - 本番表示では診断情報が非表示になる
  - 調査時のみ設定で再表示できる
  - EN: Diagnostics panel visibility can be toggled without affecting booking behavior.
## 2026-03-28 追加テスト / Added Test (Booking Top Strip Removal + LED Relocation)
- 対象:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- 手順:
  1. 予約ページを開き、上部に独立した `WORKSHOP BOOKING` ストリップが表示されないことを確認する
  2. LED が Hero 領域の kicker 行に表示されることを確認する
  3. `showBookingDiagnostics: false` のまま Diagnostics パネルが表示されないことを確認する
  4. カレンダー/予約枠/店舗選択に機能退行がないことを確認する
- 期待結果:
  - 上部ノイズ表示が除去され、Hero 内でLED表示が一貫する
  - Diagnostics は既定で完全非表示を維持する
  - EN: Top-strip artifacts are removed and LED placement is unified in hero without regression.
## 2026-03-28 追加テスト / Added Test (Workshop Mid-Page Decision Block)
- 対象:
  - `subpages/workshop.html`
  - `css/workshop.css`
- 手順:
  1. Workshop ページで `#flow` の下に `#decision` ブロックが表示されることを確認する
  2. `プランを比較する` が `subpages/workshop-plans.html` へ遷移することを確認する
  3. `空き枠を確認する` が `subpages/workshop-booking.html` へ遷移することを確認する
  4. `店舗を選んで進む` が `#location` へスクロール遷移することを確認する
  5. 720px 以下で `#decision` のボタン群が縦積み表示され、レイアウト崩れがないことを確認する
- 期待結果:
  - Workshop ページ中段で次アクション選択が明確になり、予約導線の迷いを減らせる
  - 既存の店舗選択・予約リンク挙動に退行がない
  - EN: Mid-page decision block improves action clarity without regression in existing flow.
## 2026-03-28 追加テスト / Added Test (Decision Ghost CTA Contrast)
- 対象:
  - `css/workshop.css`
  - `subpages/workshop.html`
- 手順:
  1. `#decision` の `店舗を選んで進む` ボタンが通常状態で明確に読めることを確認する
  2. hover/focus 時に文字色・境界線・背景の変化が確認できることを確認する
  3. `プランを比較する` / `空き枠を確認する` の表示優先度が維持されることを確認する
- 期待結果:
  - 第3CTAの視認性が改善される
  - セクション外の `.button--ghost` には影響しない
  - EN: Ghost CTA in decision block remains readable while global ghost-button behavior stays unchanged.
## 2026-03-28 追加テスト / Added Test (Workshop Plans Comparison Controls + planId Handoff)
- 対象:
  - `subpages/workshop-plans.html`
  - `css/workshop.css`
- 手順:
  1. プランページを開き、クイックフィルタ4種（すべて/短時間/じっくり/ペア・ギフト）が表示されることを確認する
  2. 各フィルタ押下で表示件数表示（`x / y plans`）とカード一覧が連動することを確認する
  3. 並び順セレクト（おすすめ順/価格が低い順/所要時間が短い順）でカード順が切替わることを確認する
  4. カードの `このプランで予約する` 押下時、遷移先URLに `planId` / `planCode` / `planName` が含まれることを確認する
  5. 下部CTA `空き枠を確認して予約へ進む` が `subpages/workshop-booking.html` へ遷移することを確認する
  6. モバイル幅でフィルタ・並び順・CTAのレイアウトが崩れないことを確認する
- 期待結果:
  - プラン比較操作が画面内で完結し、予約導線への遷移判断がしやすくなる
  - booking 画面への引継ぎ情報が増え、後続のプラン初期反映に利用可能になる
  - EN: Plan-page comparison and booking handoff become more explicit and consistent.
## 2026-03-28 追加テスト / Added Test (Workshop Booking Plan Handoff Consumption)
- 対象:
  - `subpages/workshop-plans.html`
  - `subpages/workshop-booking.html`
- 手順:
  1. `workshop-plans.html` の `このプランで予約する` から遷移し、URLに `planId` / `planCode` / `planName` が含まれることを確認する
  2. 遷移先 `workshop-booking.html` でサマリー `選択プラン` が対象プラン名になることを確認する
  3. カレンダー/予約枠が対象プランのセッションのみに絞られて表示されることを確認する
  4. `planId` を外し `planCode` のみで遷移した場合でも一致解決できることを確認する
  5. 不一致値（存在しない `planId`）で遷移した場合、全体表示へフォールバックし、`選択プラン` が不一致表示になることを確認する
  6. `store` / `storeLabel` クエリ併用時、店舗初期選択が維持されることを確認する
- 期待結果:
  - プラン選択から予約枠表示まで一貫した文脈が維持される
  - 既存の店舗引継ぎ互換性を崩さない
  - EN: Plan handoff context is consumed consistently while preserving store-handoff compatibility.
## 2026-03-28 追加テスト / Added Test (Booking Plan Context Bar: Change/Clear)
- 対象:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- 手順:
  1. `planId` 付きで booking ページを開き、`選択中プラン` バーが表示されることを確認する
  2. `プランを変更する` で `subpages/workshop-plans.html` へ遷移できることを確認する
  3. `全プランを表示` 押下で同ページ再表示され、URL から `planId/planCode/planName` が除去されることを確認する
  4. 解除後、サマリー `選択プラン` が `未指定` となり、全体セッション表示へ戻ることを確認する
  5. 不一致クエリ（存在しない planId）時は `選択中プラン` バーが表示されないことを確認する
- 期待結果:
  - 予約画面上でプラン変更と絞り込み解除が迷わず実行できる
  - プラン不一致時はバー非表示となり、中間状態の誤解を避けられる
  - `plan_name` が空/`-`/`未指定` のプレースホルダー状態でもバーは非表示になる
  - EN: Booking page provides clear plan-context actions, and hides the context bar for invalid/mismatch plan queries to avoid ambiguous UI state.
## 2026-03-28 追加テスト / Added Test (Workshop IA Navigation Governance)
- 対象:
  - `app/dashboard.html`（admin shell + side nav）
  - `subpages/workshop-booking.html`
  - `subpages/workshop-plans.html`
  - `subpages/sitemap.html`
- 手順:
  1. 管理画面でサイドナビに `Workshop予約管理` / `Workshopプラン管理` が常時表示されることを確認する
  2. 公開側グローバルナビで `Admin` は表示されるが、`Workshop予約管理` / `Workshopプラン管理` の直接リンクが露出しないことを確認する
  3. `workshop-plans.html` -> `workshop-booking.html` 遷移で `planId` が引継がれることを確認する
  4. `workshop-booking.html` の `プランを変更する` で `workshop-plans.html` へ戻れることを確認する
  5. フッター `サイトマップ` から `subpages/sitemap.html` へ遷移し、公開/管理導線一覧が確認できることを確認する
- 期待結果:
  - Workshop 管理導線は admin サイドナビを正本入口として維持される
  - 公開導線は一般利用者向けに保たれ、管理詳細リンクを混在させない
  - 比較 -> 予約の文脈遷移とサイトマップ導線が継続して機能する
  - EN: IA placement rule is consistently enforced across public/admin navigation and plan-to-booking flow.
## 2026-03-28 追加テスト / Added Test (Booking Completion Next-Step CTAs)
- 対象:
  - `subpages/workshop-booking-thanks.html`
  - `css/workshop-booking-thanks.css`
- 手順:
  1. 予約送信後に完了画面を開き、ステータス別案内文が表示されることを確認する（`pending/confirmed/cancelled`）
  2. `同じ条件で別日程を探す` を押下し、`workshop-booking.html` へ遷移することを確認する
  3. 上記遷移URLに `store` / `storeLabel` / `planName` が含まれることを確認する（値が存在する場合）
  4. `プラン比較ページへ戻る` で `workshop-plans.html` に遷移できることを確認する
  5. 既存の `ワークショップページへ戻る` / `トップへ戻る` が引き続き動作することを確認する
- 期待結果:
  - 予約完了後の次アクションが明確化され、再予約・比較へ短手順で戻れる
  - 完了画面が離脱終点ではなく、次の導線起点として機能する
  - EN: Completion page works as a conversion continuation point with clear rebook/compare actions.
## 2026-03-28 追加テスト / Added Test (Top Booking Shortcut Block + Hero CTA Priority)
- 対象:
  - `index.html`
  - `css/style.css`
- 手順:
  1. Top Hero の primary CTA が `予約枠を今すぐ確認する` になっていることを確認する
  2. Hero 直下に `Booking Shortcut` ブロックが表示されることを確認する
  3. `空き枠を確認する` で `subpages/workshop-booking.html` へ遷移することを確認する
  4. `プラン比較から始める` で `subpages/workshop-plans.html` へ遷移することを確認する
  5. `ワークショップ詳細を見る` で `subpages/workshop.html` へ遷移することを確認する
  6. 720px 以下でボタンが縦積み表示され、レイアウト崩れがないことを確認する
- 期待結果:
  - Top ページ直下で予約起点が明確になり、予約導線への到達が早くなる
  - Desktop/Mobile 両方でCTA視認性と操作性が維持される
  - EN: Top-page booking intent is strengthened with a clear shortcut block and responsive CTA behavior.
## 2026-03-28 追加テスト / Added Test (Top CTA Contrast Alignment with Workshop Decision)
- 対象:
  - `css/style.css`
  - `index.html`
- 手順:
  1. Top の `#hero-banner` CTA で ghost ボタン（`予約枠を確認する`）が背景に埋もれず読めることを確認する
  2. Journey の `STEP 1 を試す` ボタンが背景同化せず視認できることを確認する
  3. Booking Shortcut の `ワークショップ詳細を見る` ボタンが同系統配色で視認できることを確認する
  4. 各 ghost ボタン hover/focus 時に accent 強調へ変化することを確認する
- 期待結果:
  - Topページの ghost ボタンが light background 上でも判読可能である
  - `workshop.html #decision` と同系統の視覚ルールが適用される
  - EN: Ghost-button contrast on Top page matches workshop decision styling and remains accessible on light surfaces.
## 2026-03-28 追加テスト / Added Test (Temporary Link Disable in Public Nav/Footer)
- 対象:
  - `js/site-shell.js`
  - `css/style.css`
- 手順:
  1. Global Navi で `ブランド / アイテム / 香りから探す / 記事 / Sale / 実店舗` がクリック遷移しないことを確認する
  2. `香りと遊ぶ` と `Home`、`Admin` は引き続き遷移可能であることを確認する
  3. Footer `Guide` で `サイトマップ` のみ遷移可能、他リンクは無効であることを確認する
  4. Footer `Support` の各リンクが無効であることを確認する
  5. 無効リンクが視覚的に判別可能（disabled style）であることを確認する
- 期待結果:
  - 未準備ページへの誤遷移を防ぎつつ、公開導線として必要なリンクは維持される
  - `aria-disabled` と非活性スタイルにより、無効状態が明確に伝わる
  - EN: Non-ready destinations are safely blocked while keeping essential public navigation available.
## 2026-03-28 追加テスト / Added Test (Header Notice Strip Removal + Footer Guide Adjustment)
- 対象:
  - `js/site-shell.js`
- 手順:
  1. 公開ページを開き、ヘッダー上部の `ショッピングガイド / お問い合わせ` ストリップが表示されないことを確認する
  2. フッター `Guide` に `ショッピングガイド` が表示され、disabled で遷移しないことを確認する
  3. フッター `Account` の `お問い合わせ` は後続方針に応じて有効/無効を確認する
- 期待結果:
  - ヘッダー上部の重複導線が整理される
  - `ショッピングガイド` はフッターに移動して disabled 管理できる
  - `お問い合わせ` は後続調整で disabled 管理へ移行可能な構成である
  - EN: Header clutter is reduced while footer guide placement is consolidated and ready for contact-link lock if needed.
## 2026-03-28 追加テスト / Added Test (Search + Cart + Contact Temporary Disable)
- 対象:
  - `js/site-shell.js`
  - `css/style.css`
- 手順:
  1. Utility header の `検索` が disabled で遷移しないことを確認する
  2. Utility header の `カート` が disabled で遷移しないことを確認する
  3. Footer Account の `お問い合わせ` が disabled で遷移しないことを確認する
  4. `サイトマップ` は引き続き有効遷移できることを確認する
  5. disabled リンクが視覚的に判別可能（色/カーソル）であることを確認する
- 期待結果:
  - 未実装ページへの入口（検索/カート/お問い合わせ）が停止される
  - 公開導線として必要な `サイトマップ` は維持される
  - EN: Search/cart/contact placeholders are safely disabled while sitemap remains accessible.
## 2026-03-28 追加テスト / Added Test (Booking Step-Progress Strip on Step1)
- 対象:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- 手順:
  1. 予約ページを開き、`STEP 1/2/3` の進行表示が表示されることを確認する
  2. `STEP 1` が current スタイルで強調表示されることを確認する
  3. カレンダー・店舗選択・予約枠表示の既存機能に退行がないことを確認する
  4. 1100px 以下でステップ表示が縦積みになり、テキスト欠けがないことを確認する
- 期待結果:
  - 予約開始時点で全体フローが明確に理解できる
  - 既存予約機能を維持したまま視認性が向上する
  - EN: Users can understand the full booking process from Step 1 without regressions.
## 2026-03-28 追加テスト / Added Test (Store Context Handoff: Workshop -> Plans -> Booking)
- 対象:
  - `subpages/workshop.html`
  - `subpages/workshop-plans.html`
  - `subpages/workshop-booking.html`
- 手順:
  1. `workshop.html` で店舗チップを `浅草店/柴又店/ソラマチ店` のいずれかに切替える
  2. `プランを見る` または `プランを比較する` へ遷移し、URLに `store` / `storeLabel` が含まれることを確認する
  3. `workshop-plans.html` の各 `このプランで予約する` を押下し、遷移先URLに `planId` と `store/storeLabel` が同時に含まれることを確認する
  4. `workshop-plans.html` 下部CTA `空き枠を確認して予約へ進む` でも `store/storeLabel` が引継がれることを確認する
  5. `workshop-booking.html` で対象店舗が初期選択されていることを確認する
- 期待結果:
  - 店舗選択後の比較導線でコンテキストが維持される
  - 比較ページ経由でも booking 画面の初期店舗選択が失われない
  - EN: Store context remains intact across workshop, plans, and booking transitions.
## 2026-03-28 追加テスト / Added Test (Top CTA Alignment + Journey Per-Step Actions)
- 対象:
  - `index.html`
  - `css/style.css`
- 手順:
  1. Hero の3ボタンが同じ高さ・同じ幅で横並び表示されることを確認する
  2. Booking Shortcut の2つの情報タグが横並び表示されることを確認する
  3. Journey の各STEPカード直下に対応ボタン（STEP1/2/3）が配置され、カード幅いっぱいで表示されることを確認する
  4. 720px 以下で Hero ボタンが縦積みになり、レイアウト崩れがないことを確認する
- 期待結果:
  - Hero CTA の視認性と整列性が改善される
  - Booking Shortcut 情報のスキャン性が向上する
  - Journey 導線が各ステップ直下で理解しやすくなる
  - EN: CTA alignment and per-step action placement improve readability and conversion clarity on Top page.
## 2026-03-28 追加テスト / Added Test (Hero Vertical CTA + Journey Ghost Contrast)
- 対象:
  - `css/style.css`
  - `index.html`
- 手順:
  1. Hero の3ボタンが縦積み表示されることを確認する
  2. Journey の STEP 1 ボタン（ghost）が背景に埋もれず表示されることを確認する
  3. Journey の STEP 1 ghost が hover/focus 時に accent 強調へ変化することを確認する
  4. Experience Banner のボタン系統と Journey ボタンの視認性ルールが一致していることを確認する
- 期待結果:
  - Hero CTA が縦方向に整列し、操作対象が認識しやすい
  - Journey の ghost ボタンが明確に視認できる
  - EN: Hero vertical CTA layout and journey ghost-button contrast are both clear and consistent.
## 2026-03-28 追加テスト / Added Test (Confirm->Thanks plan_id Handoff for Rebooking)
- 対象:
  - `subpages/workshop-booking-confirm.html`
  - `subpages/workshop-booking-thanks.html`
- 手順:
  1. 通常予約フローで confirm から送信し、thanks へ遷移する
  2. thanks URL に `plan_id` / `store` / `storeLabel` が含まれることを確認する
  3. `同じ条件で別日程を探す` を押下し、booking URL に `planId` が含まれることを確認する
  4. booking 画面で `選択プラン` と店舗初期選択が一致することを確認する
- 期待結果:
  - 完了画面経由の再予約でもプラン・店舗の文脈が保持される
  - `planName` のみ依存より高い一致精度で再検索できる
  - EN: Rebooking from thanks preserves exact plan/store context via `plan_id` handoff.
## 2026-03-28 追加テスト / Added Test (Sticky Next-Action CTA + Copy Consistency)
- 対象:
  - `subpages/workshop-plans.html`
  - `subpages/workshop-booking.html`
  - `subpages/workshop.html`
  - `index.html`
- 手順:
  1. `workshop-plans.html` を開き、右下（mobileは下部）に `予約枠を確認する` fixed CTA が表示されることを確認する
  2. `store/storeLabel` クエリ付き遷移時、fixed CTA のリンク先にも同クエリが引継がれることを確認する
  3. `workshop-booking.html` を開き、初期状態では fixed CTA が非表示であることを確認する
  4. 予約可能日を選択すると fixed CTA が表示され、文言が `◯◯ の予約枠へ進む` へ更新されることを確認する
  5. Top/Workshop/Plans の主要CTA文言が `予約枠` 表現へ統一されていることを確認する
- 期待結果:
  - 比較ページと予約ページの双方で、次アクションが常時視認できる
  - Booking 側は未選択時に誤操作を誘発せず、選択後にのみ導線を強調する
  - EN: Sticky next-action CTAs guide progression without ambiguity, and CTA copy stays consistent across Top->Workshop->Plans->Booking flow.
## 2026-03-28 追加テスト / Added Test (Workshop PROGRAM Plan Handoff to Booking)
- 対象:
  - `subpages/workshop.html`
  - `subpages/workshop-booking.html`
- 手順:
  1. `workshop.html#program` で `このプランで予約する` / `一番人気で予約する` / `ペア体験を予約する` をそれぞれ押下する
  2. 遷移先 URL に `planCode` と `planName` が含まれることを確認する
  3. `workshop-booking.html` で `選択プラン` が `未指定` ではなく対象プラン名で表示されることを確認する
  4. `選択中プラン` コンテキストバーが表示されることを確認する
- 期待結果:
  - PROGRAM パネル経由でも `workshop-plans.html` 経由と同じくプラン文脈が保持される
  - booking 側のプラン一致解決に失敗しない
  - EN: Plan context is preserved from Workshop PROGRAM cards to Booking, matching plans-page behavior.
## 2026-03-28 追加テスト / Added Test (Workshop PROGRAM DB-Driven Top-3)
- 対象:
  - `subpages/workshop.html`
  - `workshop_plans`, `workshop_plan_inclusions`（Supabase）
- 手順:
  1. `workshop.html#program` を開き、PROGRAMカードがDB由来で表示されることを確認する
  2. `status=active` の plan が4件以上ある場合でも、表示が最大3件に制限されることを確認する
  3. `sort_order` を変更し、PROGRAMの表示順が追従することを確認する
  4. 各カードの `このプランで予約する` から booking へ遷移し、`選択プラン` が一致することを確認する
  5. `workshop_plan_inclusions` がある場合、カード内に先頭3件が表示されることを確認する
- 期待結果:
  - PROGRAMは静的文言ではなくDBの `workshop_plans` を正本として表示される
  - 最大3件表示と順序制御が一貫して機能する
  - EN: PROGRAM section is DB-driven from `workshop_plans` with deterministic top-3 ordering and consistent booking handoff.
## 2026-03-28 追加テスト / Added Test (Breadcrumb Rendering: Public + Admin)
- 対象:
  - `js/site-shell.js`
  - `js/admin-app.js`
  - `css/style.css`
  - `css/admin-app.css`
- 手順:
  1. 公開ページ（例: `subpages/workshop-booking.html`）を開き、`page-breadcrumb` が表示されることを確認する
  2. 公開パンくずの末尾が `aria-current="page"` で現在ページを示すことを確認する
  3. 管理ページ（例: `app/pages/workshop.html`）を開き、`admin-breadcrumb` が表示されることを確認する
  4. 管理パンくずで `Dashboard` など上位階層へ遷移できることを確認する
- 期待結果:
  - 公開/管理の両方で現在地と階層が視覚的に理解できる
  - 共通シェルで継続してパンくず描画される
  - EN: Breadcrumbs render consistently on both public/admin shells with valid current-page semantics.
## 2026-03-28 追加テスト / Added Test (IA Slice-1: Taxonomy + Sitemap Alignment)
- 対象:
  - `js/site-shell.js`
  - `subpages/sitemap.html`
- 手順:
  1. 公開グローバルナビで `セール` 表記が表示されることを確認する
  2. `item-sale.html` を開き、breadcrumb が `Home > アイテム > SALE` 系で解決され、`セール` 系の重複親判定が起きないことを確認する
  3. `subpages/sitemap.html` を開き、以下の分類見出しが表示されることを確認する
     - `公開ナビ（トップレベル）`
     - `ワークショップ予約導線`
     - `公開ページ（カテゴリ詳細）`
     - `サポート / アカウント`
     - `管理画面`
  4. `公開ナビ（トップレベル）` の項目が runtime グローバルナビと同じ集合（Home/ブランド/アイテム/香りから探す/香りと遊ぶ/記事/セール/実店舗/Admin）であることを確認する
- 期待結果:
  - ラベル命名と情報分類が runtime ナビと sitemap で整合する
  - ユーザーが探索時に階層を誤解しにくい構成になる
  - EN: Runtime taxonomy and sitemap grouping stay consistent, reducing navigation ambiguity.
## 2026-03-28 追加テスト / Added Test (IA Slice-2: Unified Disabled-Link Policy)
- 対象:
  - `js/site-shell.js`
  - 公開ページの Header / Sidebar / Footer
- 手順:
  1. 未ログインで公開ページを開き、`ショッピングガイド`（Sidebar standalone / Footer Guide）がともに disabled 表示で遷移しないことを確認する
  2. ログイン状態へ切替後、同リンクが再描画後も disabled のまま維持されることを確認する
  3. Footer `Support`（プライバシーポリシー / メルマガ登録・解除 / RSS）が共通ルールで disabled 表示されることを確認する
  4. Footer `Account` の `お問い合わせ` が未ログイン/ログインの両方で disabled 表示されることを確認する
  5. `サイトマップ` は有効リンクとして遷移可能であることを確認する
- 期待結果:
  - disabled 判定が初期表示と認証後再描画で一致する
  - Footer/Sidebar のリンク状態がページ単位ではなく共通ポリシーで管理される
  - EN: Disabled-link behavior remains consistent across initial/auth-updated renders via a single shared policy.
## 2026-03-28 追加テスト / Added Test (IA Slice-3: Workshop Page-Key + Breadcrumb Consistency)
- 対象:
  - `js/site-shell.js`
  - `subpages/workshop-plans.html`
  - `subpages/workshop-booking-thanks.html`
- 手順:
  1. `subpages/workshop-plans.html` を開き、breadcrumb が `Home > 香りと遊ぶ > プラン比較` で表示されることを確認する
  2. `subpages/workshop-booking.html` / `subpages/workshop-booking-entry.html` / `subpages/workshop-booking-confirm.html` / `subpages/workshop-booking-thanks.html` を順に開き、末尾ラベルが `予約枠選択/申込情報入力/予約内容確認/予約完了` で一致することを確認する
  3. 上記ページ群でグローバルナビの `香りと遊ぶ` が current 状態になることを確認する
  4. `香りと遊ぶ` のサブメニューに `プラン比較` が表示され、`workshop-plans.html` へ遷移できることを確認する
- 期待結果:
  - workshop導線のページキーとラベルが runtime ナビ/パンくずで一貫する
  - Plans/Booking/Thanks のどこにいても同じ階層として認知できる
  - EN: Workshop flow pages keep consistent key/label mapping, breadcrumb hierarchy, and nav-current behavior.
## 2026-03-28 追加テスト / Added Test (Booking Floating Reservation Panel)
- 対象:
  - `subpages/workshop-booking.html`
  - `css/workshop-booking.css`
- 手順:
  1. `workshop-booking.html` を開き、右下に floating ミニパネルが表示されることを確認する
  2. パネル構成が `予約する` タイトル + 2ボタン（`空き枠を確認する` / `プランを比較する`）のみであることを確認する
  3. 日付未選択時に第1ボタン文言が `空き枠を確認する` であることを確認する
  4. 任意の日付を選択し、第1ボタン文言が `◯◯ の予約枠を確認する` に変化することを確認する
  5. モバイル幅で下部ドック表示に切り替わり、2ボタンが押下可能なことを確認する
- 期待結果:
  - 説明テキストなしでも、短い固定パネルだけで次アクションが理解できる
  - desktop/mobile で視認性と操作性が維持される
  - EN: Minimal floating panel keeps booking actions clear and usable across desktop and mobile.
## 2026-03-28 追加テスト / Added Test (Floating CTA Width + Workshop Relocation)
- 対象:
  - `subpages/workshop-booking.html`
  - `subpages/workshop.html`
  - `css/workshop-booking.css`
  - `css/workshop.css`
- 手順:
  1. `workshop-booking.html` で日付選択後、floating CTA 1stボタンの長文（`◯◯ の予約枠を確認する`）が欠けずに2行以内で表示されることを確認する
  2. `workshop.html` を開き、画面右下に `予約する` フローティングCTA（`予約フォームへ進む` / `デジタル調香を試す`）が表示されることを確認する
  3. `workshop.html#reserve` の下部セクション内に旧ボタン群が表示されないことを確認する
  4. モバイル幅で両ページとも下部ドック表示になり、2ボタンが押下可能であることを確認する
- 期待結果:
  - 長文CTAでも視認性が落ちない
  - Workshopページの予約導線が常時アクセス可能になる
  - EN: CTA readability remains stable with long labels, and Workshop reservation access is persistent via floating panel.
## 2026-03-28 追加テスト / Added Test (IA Slice-4: Sitemap Label + Readiness Markers)
- 対象:
  - `subpages/sitemap.html`
  - `css/style.css`
- 手順:
  1. `subpages/sitemap.html` の `公開ナビ（トップレベル）` 先頭ラベルが `Home` であることを確認する
  2. `ブランド/アイテム/香りから探す/記事/セール/実店舗` に `準備中` マーカーが表示されることを確認する
  3. `サポート / アカウント` で未準備ページ（ショッピングガイド/お問い合わせ/カート/プライバシー/法的表示/RSS/メルマガ）に `準備中` マーカーが表示されることを確認する
  4. `準備中` マーカーが pill スタイルで可読性を保って表示されることを確認する
- 期待結果:
  - sitemap ラベルが runtime ナビと一致する
  - 公開可否の状態が視覚的に明確になる
  - EN: Sitemap labels stay runtime-consistent and coming-soon states are clearly visible.
## 2026-03-28 追加テスト / Added Test (IA Slice-5: Admin Naming + Access Mode Badge)
- 対象:
  - `subpages/sitemap.html`
  - `js/site-config.js`
  - `css/style.css`
- 手順:
  1. `subpages/sitemap.html` の管理カードで `ワークショップ予約管理 / ワークショッププラン管理` 表記になっていることを確認する
  2. `adminAccessMode: "open_demo"` の状態で sitemap を開き、見出しバッジが `アクセス設定: open_demo`、注記がデモ閲覧可能内容になることを確認する
  3. `adminAccessMode: "admin_only"` へ切替後に再読込し、見出しバッジが `アクセス設定: admin_only`、注記が管理者限定アクセス内容になることを確認する
  4. モード別でバッジ色が異なる（open_demo: warning系 / admin_only: info系）ことを確認する
- 期待結果:
  - 管理導線の名称が一貫する
  - 現在の admin 公開モードを sitemap 上で即時判別できる
  - EN: Admin naming is consistent and current `adminAccessMode` is clearly visible with mode-specific styling.
## 2026-03-28 追加テスト / Added Test (IA Slice-6: Sitemap Disabled-Link Behavior Sync)
- 対象:
  - `subpages/sitemap.html`
  - `css/style.css`
- 手順:
  1. sitemap の `準備中` 表示リンク（例: ブランド / ショッピングガイド）に `is-disabled` 表示が適用されていることを確認する
  2. マウスクリックで対象リンクが遷移しないことを確認する
  3. キーボードタブ移動で `準備中` リンクがフォーカス対象にならない（`tabindex="-1"`）ことを確認する
  4. `Home` / `香りと遊ぶ` / `サイトマップ` / `Admin` など有効リンクは従来どおり遷移可能であることを確認する
- 期待結果:
  - sitemap の `準備中` リンクが runtime disabled ルールと同様に非活性で動作する
  - 有効リンクと非活性リンクの区別が視覚・操作の両面で明確になる
  - EN: Coming-soon sitemap links are non-interactive, while active links remain fully navigable.
## 2026-03-28 追加テスト / Added Test (IA Slice-7: Policy-Driven Sitemap Disable Runtime)
- 対象:
  - `subpages/sitemap.html`
- 手順:
  1. `sitemap.html` を開き、`ブランド` 等の準備中リンクに `is-disabled` クラスが動的付与されることを確認する（DevTools可）
  2. `Home` や `香りと遊ぶ` など有効リンクには `aria-disabled` / `tabindex=-1` が付与されていないことを確認する
  3. ページ再読込後も同じ disabled 判定が再適用されることを確認する
  4. `adminAccessMode` バッジ表示（open_demo/admin_only）が従来どおり機能することを確認する
- 期待結果:
  - sitemap disabled 状態が静的ハードコードではなくポリシー判定で一貫適用される
  - admin access-mode 表示ロジックとの共存で回帰がない
  - EN: Sitemap disable states are applied consistently at runtime by policy without breaking admin-mode badge rendering.
## 2026-03-28 追加テスト / Added Test (IA Slice-8: Single Source Disabled Policy)
- 対象:
  - `js/site-config.js`
  - `js/site-shell.js`
  - `subpages/sitemap.html`
- 手順:
  1. `js/site-config.js` の `disabledPublicPageKeys` に `sale` が含まれる状態で、公開グローバルナビの `セール` が disabled であることを確認する
  2. 同状態で `sitemap.html` の `セール` も disabled であることを確認する
  3. `disabledPublicPageKeys` から `sale` を一時的に外して再読込し、公開ナビと sitemap の `セール` がともに有効化されることを確認する
  4. 元の設定へ戻し、再読込後に再び両方 disabled へ戻ることを確認する
- 期待結果:
  - disabled 対象変更が `site-config.js` だけで公開ナビと sitemap の両方に反映される
  - 運用時の設定更新でリンク状態が乖離しない
  - EN: A single config change updates disabled-link behavior consistently across runtime navigation and sitemap.
## 2026-03-28 追加テスト / Added Test (IA Slice-9: data-page-key Matching on Sitemap)
- 対象:
  - `subpages/sitemap.html`
  - `js/site-config.js`
- 手順:
  1. `sitemap.html` の公開リンクに `data-page-key` が付与されていることを確認する（DevTools可）
  2. `disabledPublicPageKeys` に含まれるキー（例: `brand`）のリンクが disabled 表示になることを確認する
  3. `disabledPublicPageKeys` に含まれないキー（例: `workshop` / `sitemap`）のリンクが有効であることを確認する
  4. `brand.html` などの href を仮に変更しても、`data-page-key="brand"` が維持される限り disabled 判定が変わらないことを確認する
- 期待結果:
  - sitemap disabled 判定が URL 文字列ではなく `data-page-key` で安定動作する
  - `site-shell.js` と同じページキー体系で運用できる
  - EN: Sitemap disable behavior is robust to URL changes by relying on stable page keys.
## 2026-03-28 追加テスト / Added Test (IA Slice-10: Coming-soon Badge Runtime Sync)
- 対象:
  - `subpages/sitemap.html`
  - `js/site-config.js`
- 手順:
  1. `disabledPublicPageKeys` に含まれるキー（例: `sale`）のリンクで `準備中` マーカーが表示されることを確認する
  2. 同キーを `disabledPublicPageKeys` から外して再読込し、リンクが有効化されると同時に `準備中` マーカーが非表示になることを確認する
  3. キーを設定へ戻して再読込し、リンク非活性 + `準備中` マーカー表示が復帰することを確認する
- 期待結果:
  - `disabled` 状態と `準備中` 表示が常に同期する
  - 設定変更時にリンク状態とバッジ表示の矛盾が発生しない
  - EN: Coming-soon badge visibility stays consistent with disabled policy state.
## 2026-03-28 追加テスト / Added Test (IA Slice-11: Runtime Badge Generation/Cleanup)
- 対象:
  - `subpages/sitemap.html`
  - `js/site-config.js`
- 手順:
  1. DevTools で任意の disabled 対象リンク（例: `sale`）の `small` ノードを一時削除し、再読込後に `準備中` バッジが自動再生成されることを確認する
  2. `disabledPublicPageKeys` から当該キーを外して再読込し、`small` バッジが DOM から削除されることを確認する
  3. 設定を戻して再読込し、同リンクに再び `準備中` バッジが表示されることを確認する
- 期待結果:
  - `準備中` バッジはマークアップ依存ではなく、ポリシー状態から実行時に再構築される
  - enabled/disabled の切替でバッジ残骸が残らない
  - EN: Coming-soon badges are generated and cleaned up at runtime without manual HTML maintenance.
## 2026-03-28 追加テスト / Added Test (IA Slice-12: Static Badge Markup Removal)
- 対象:
  - `subpages/sitemap.html`
- 手順:
  1. `sitemap.html` のソースを確認し、policy 管理リンクに静的 `<small>準備中</small>` が含まれていないことを確認する
  2. ページ表示時に disabled 対象リンクへ `準備中` バッジが動的表示されることを確認する
  3. enabled 対象リンクに `準備中` バッジが表示されないことを確認する
- 期待結果:
  - バッジ表示は HTML 静的記述ではなく runtime 判定でのみ制御される
  - マークアップと実表示の責務分離が明確になる
  - EN: Badge rendering is fully runtime-driven with no static badge dependency in markup.
## 2026-03-28 追加テスト / Added Test (IA Slice-13: Config-Driven Badge Label)
- 対象:
  - `js/site-config.js`
  - `subpages/sitemap.html`
- 手順:
  1. `comingSoonBadgeLabel` が `準備中` の状態で sitemap を開き、disabled リンクのバッジ文言が `準備中` であることを確認する
  2. `comingSoonBadgeLabel` を一時的に別文言（例: `Coming Soon`）へ変更し再読込、disabled リンクのバッジが同文言へ切替わることを確認する
  3. 設定を `準備中` に戻し、再読込後に表示が戻ることを確認する
- 期待結果:
  - `準備中` バッジ文言が設定値から反映される
  - 文言変更で sitemap スクリプト修正が不要
  - EN: Coming-soon badge copy is fully controlled by site config.
## 2026-03-28 追加テスト / Added Test (IA Slice-14: Disabled Policy Sanitization)
- 対象:
  - `js/site-config.js`
  - `js/site-shell.js`
  - `subpages/sitemap.html`
- 手順:
  1. `disabledPublicPageKeys` に `[" brand ", "brand", "unknownKey", "sale"]` を設定して再読込する
  2. 公開ナビと sitemap で `brand` と `sale` のみ disabled 適用されることを確認する
  3. `unknownKey` があってもエラーなく表示継続することを確認する
  4. `disabledPublicPageKeys` を空配列または無効値のみへ変更し、既定 disabled 対象へフォールバックすることを確認する
- 期待結果:
  - 設定値の空白・重複・未知キーが吸収され、disabled 判定が安定動作する
  - shell と sitemap の適用結果が一致する
  - EN: Disabled policy remains stable under malformed config and stays consistent across shell and sitemap.
## 2026-03-28 追加テスト / Added Test (IA Slice-15: Markup-Driven Sitemap Fallback)
- 対象:
  - `subpages/sitemap.html`
  - `js/site-config.js`
- 手順:
  1. `sitemap.html` の既定非活性対象リンクに `data-default-disabled="true"` が付与されていることを確認する
  2. `disabledPublicPageKeys` を未設定（または空）にして再読込し、`data-default-disabled="true"` のリンクが disabled になることを確認する
  3. `data-default-disabled` がないリンク（例: `workshop` / `sitemap`）は有効状態を維持することを確認する
  4. `disabledPublicPageKeys` に sitemap 未定義キーを追加しても、表示に影響しないことを確認する
- 期待結果:
  - sitemap の fallback disabled 判定がマークアップ由来で動作する
  - sitemap 未定義キーに対して安全に無視される
  - EN: Sitemap fallback defaults are markup-driven and robust against unknown config keys.
## 2026-03-28 追加テスト / Added Test (IA Slice-16: Config-Driven Admin Access Copy)
- 対象:
  - `js/site-config.js`
  - `subpages/sitemap.html`
- 手順:
  1. `sitemapAdminAccessCopy.badgePrefix` を変更して再読込し、管理カードバッジの先頭文言が反映されることを確認する
  2. `adminAccessMode: "open_demo"` で `openDemoNote` 文言が注記へ表示されることを確認する
  3. `adminAccessMode: "admin_only"` で `adminOnlyNote` 文言が注記へ表示されることを確認する
  4. `sitemapAdminAccessCopy` を一時削除して再読込し、既定文言へフォールバックすることを確認する
- 期待結果:
  - 管理アクセス表示文言が設定値で制御できる
  - 設定未定義時も既定文言で安定表示される
  - EN: Sitemap admin-access copy is configurable and safely falls back to defaults.
## 2026-03-28 追加テスト / Added Test (IA Slice-17: Admin Mode Rendering Hardening)
- 対象:
  - `subpages/sitemap.html`
  - `js/site-config.js`
- 手順:
  1. `adminAccessMode` を想定外値（例: `open-demo`, `foobar`）に設定して再読込し、`admin_only` 表示へ正規化されることを確認する
  2. `adminAccessMode: "open_demo"` へ戻して再読込し、バッジクラスが `sitemap-admin-status--open-demo` のみになることを確認する
  3. `adminAccessMode: "admin_only"` へ切替再読込し、バッジクラスが `sitemap-admin-status--admin-only` のみになることを確認する
- 期待結果:
  - 未知モードでも表示が破綻せず `admin_only` 扱いで安定する
  - モード切替時に古いクラスが残らない
  - EN: Admin mode rendering remains stable for unknown values and keeps badge classes clean across mode switches.
## 2026-03-28 追加テスト / Added Test (IA Slice-18: Sitemap Script Refactor Safety)
- 対象:
  - `subpages/sitemap.html`
  - `js/site-config.js`
- 手順:
  1. 既定設定で sitemap を開き、disabled リンク表示・`準備中` バッジ・admin access 表示が従来どおり機能することを確認する
  2. `comingSoonBadgeLabel` / `sitemapAdminAccessCopy` を変更し、反映が維持されることを確認する
- 期待結果:
  - リファクタ後も挙動回帰がない
  - EN: Refactor preserves existing runtime behavior and config-driven rendering.
## 2026-03-28 追加テスト / Added Test (IA Slice-19: Top Nav Disabled Sync)
- 対象:
  - `js/site-config.js`
  - `js/site-shell.js`
  - 公開グローバルナビ
- 手順:
  1. `disabledPublicPageKeys` から `sale` を外して再読込し、トップナビ `セール` が有効化されることを確認する
  2. 同キーを戻して再読込し、`セール` が disabled 表示へ戻ることを確認する
  3. sitemap の `sale` とトップナビ `セール` の状態が一致することを確認する
- 期待結果:
  - トップナビ disabled 状態が共有ポリシーと同期する
  - EN: Top-level nav disabled state stays synchronized with shared disabled policy.
## 2026-03-28 追加テスト / Added Test (IA Slice-20: Backlog Closure)
- 対象:
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- 手順:
  1. `2.13 Site Structure Review + IA Refinement` の `Status` が `Accepted` であることを確認する
- 期待結果:
  - IA refinement の完了状態が backlog へ反映されている
  - EN: Backlog closure status for 2.13 is correctly recorded as accepted.
