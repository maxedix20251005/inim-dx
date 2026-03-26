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
