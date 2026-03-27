# WIP / 作業中サマリ

## 1. Objective This Sprint / 現在スプリントの目的
- JA: Workshop 予約導線と管理画面運用の整合を維持しつつ、次実装に即着手できる状態を保つ。
- EN: Keep booking-flow and admin operations aligned and ready for immediate next implementation.

## 2. Current Status / 現在の状態
- JA: 予約導線は `workshop.html -> workshop-booking.html -> workshop-booking-entry.html -> workshop-booking-confirm.html` で動作。
- EN: Booking flow currently works across four public pages.
- JA: 確認画面から Supabase `bookings` への保存導線は実装済み。
- EN: Insert path to Supabase `bookings` is implemented from confirm page.
- JA: 命名は `bookings / enquiries` に統一済み。
- EN: Naming has been standardised to `bookings / enquiries`.

## 3. In Progress / 進行中
- JA: ドキュメント体系の統一運用（本ファイル・AI_BUILD_PROMPT 統一化）。
- EN: Unified documentation operations (this file and AI build prompt alignment).

## 4. Next Actions / 次アクション
1. JA: Workshop予約の `plan_id` / `session_id` 実データ確定方針を決める。
   EN: Finalise production mapping strategy for `plan_id` / `session_id`.
2. JA: 予約完了後の Thanks 導線と表示仕様を確定する。
   EN: Define post-booking thanks flow and UI content.
3. JA: 管理画面の `bookings / enquiries` 詳細管理（仕様 F-009）を段階実装する。
   EN: Implement phased admin detail management for `bookings / enquiries` (spec F-009).

## 5. On Hold / 保留事項
- JA: Spring Boot/Java API 層追加は要件増加時の次フェーズ判断。
- EN: Spring Boot/Java API layer remains a future-phase option triggered by complexity growth.

## 6. Open Issues (Linked) / 未解決課題（リンク）
- JA: 詳細は `docs/10_PROJECT/ISSUE_LIST.md` を正本とする。
- EN: `docs/10_PROJECT/ISSUE_LIST.md` is the source of truth for active/resolved issues.

## 7. Restart Checklist / 再開チェック
1. `docs/10_PROJECT/PROJECT_STATUS.md` を読む
2. `docs/10_PROJECT/ISSUE_LIST.md` を読む
3. `docs/30_TECH/TECH_SPEC.md` と `docs/20_PRODUCT/DESIGN_GUIDELINE.md` を読む
4. `subpages/workshop-booking*.html` の現行導線を確認
5. 実装着手前にタスク受入条件を1段落で定義
6. 関連ドキュメント更新の常時チェック（PROJECT_STATUS / WIP / ISSUE_LIST / TEST_PLAN）

## 8. Handoff Notes / 引継ぎメモ
- JA: 変更時は必ず `PROJECT_STATUS.md` 更新を同タスク内で実施する。
- EN: Always update `PROJECT_STATUS.md` within the same task as code changes.
- JA: 文字化け（UTF-8）とリンク切れを最終チェックする。
- EN: Run final UTF-8 and link-validity checks.


## Update Log / 更新ログ
- 2026-03-25: Supabase 通貨/人数カラム追従（07/08 SQL 適用）、公開予約フローは Thanks まで動作確認。`workshop-booking.html` に接続LEDを追加（緑=接続、橙=フォールバック）。実データ未投入時はモック表示で暫定対応。次は Supabase に複数 `workshop_sessions` を登録してカレンダー多日表示を検証する。
- 2026-03-25: docs 再編（カテゴリ別フォルダ化）、`references/settings` と `wip` の文書を `docs` 配下へ標準移管、参照リンク更新。
- 2026-03-25: `docs/60_HANDOFF` -> `docs/80_HANDOFF` に変更。`docs/60_TEST` を新設。Governance/Catalog 反映済み。
- 2026-03-25: テンプレート群を `wip/` から `docs/00_GOVERNANCE/TEMPLATES/` へ移動。`docs/60_TEST` は実テスト文書専用運用に固定。
- 2026-03-25: `test/test-account-result.md` を `docs/60_TEST/ACCOUNT_TEST_RESULT.md` へ移動し、ガバナンス準拠で再整形。
- 2026-03-25: 今後作業 1〜10 を再判定。#1（Workshop予約導線整理）を Completed として `PROJECT_STATUS` に反映。
- 2026-03-25: タスク #1 の実装差分として `subpages/ex-workshop.html` の予約CTAを `workshop-booking.html` に統一。`PROJECT_STATUS` へ完了反映。
- 2026-03-25: #1 の実動作確認結果（OK）を `docs/60_TEST/TEST_PLAN.md` へ反映。`ex-workshop.html` はバックアップ扱いで通常変更対象外とする。

- 2026-03-25: タスク #2 を実装反映。確認画面側で必須値再検証を追加し、`PROJECT_STATUS` の #2 を Completed 化。

- 2026-03-25: 予約入力/確認ページで発生した文字化けを修正。2ファイルをHEAD復元後、#2の必要差分のみ再適用し、Issueを docs/10_PROJECT/ISSUE_LIST.md に追記。

- 2026-03-25: `subpages/workshop-booking-entry.html` / `subpages/workshop-booking-confirm.html` のインラインCSSを `css/workshop-booking-flow.css` へ外部化。再発防止として `.editorconfig` を追加し、UTF-8をリポジトリ既定に固定。

- 2026-03-25: `subpages/workshop-booking.html` の日セル内ステータス文言（開催無し/予約可など）を削除。日セルは記号のみ表示し、意味説明は下部Legendに集約。

- 2026-03-25: タスク #3 の初期実装として `subpages/workshop-booking-thanks.html` を追加し、確認画面送信成功後の自動遷移を実装。

- 2026-03-26: 予約確認画面の送信失敗（`Auth session missing!`）に対処。認証確認を `getSession()` へ切替し、未ログイン時メッセージとログイン導線を改善。

- 2026-03-26: 予約カレンダーの「4/5固定モック」フォールバックを廃止。Supabase 0件時は空状態を明示表示し、取得範囲を当月初日〜12か月先へ拡大。

- 2026-03-26: Workshop Booking 0 row 恒久対策として SQL を追加。`sql/09_seed_workshop_booking_master_and_sessions.sql`（seed）, `sql/10_workshop_public_read_policies.sql`（public read policy）, `sql/11_verify_workshop_public_data.sql`（検証）。
- 2026-03-26: `Sessions>0` でも空き表示されない不具合を修正。`subpages/workshop-booking.html` で store lookup を `store_id` ベースへ切替（`buildStoreByIdMap` 追加、store key 正規化）。
- 2026-03-26: `app/pages/workshop.html` にフル予約管理画面を実装（一覧、検索/絞り込み、詳細、status/internal_note 更新）。スタンドアロン構成で `bookings` を直接参照し、`stores` / `user_profiles` を補助参照。
- 2026-03-26: `subpages/workshop.html` のインラインCSSを `css/workshop.css` へ外部化。`プランを見る` 導線を `subpages/workshop-plans.html` に変更。予約CTA帯へ Dashboard リンクを追加。トップページスライダーは初期化タイミングを `DOMContentLoaded` 併用へ修正。
- 2026-03-26: Task #1 実装。`app/dashboard.html` を admin ロール限定に変更（`js/admin-app.js` の accessRules で `appDashboard: ["admin"]` を追加）。
- 2026-03-26: `app/pages/workshop.html` に admin ロールチェックを追加。非adminは一覧表示せず `Access denied` を表示。
- 2026-03-26: Task #2 完了。公開予約ページの稼働チェック（Diagnostics + LED + data件数）を `CHECKLIST_SUPABASE` / `TEST_PLAN` に追加。
- 2026-03-26: Task #3 着手/反映。`subpages/workshop-plans.html` を Supabase連携化（`workshop_plans` 読み込み、`workshop_plan_inclusions` 任意表示、データ未取得時はフォールバック表示）。
- 2026-03-26: 公開側ナビに admin 専用リンクを追加（Global Navigation / Side Navi / Footer）。`site-shell.js` で admin ロール検知時のみ表示。
- 2026-03-26: `subpages/workshop.html` から管理画面ボタンを削除し、公開導線を一般ユーザー向けに統一。
- 2026-03-26: 管理画面に右上ロゴと「メインサイトへ戻る」導線を追加。
- 2026-03-26: 非adminログイン検証は環境未整備のため FEATURE_BACKLOG に保留登録。
- 2026-03-26: Added DB image column migration for workshop plans (sql/12_add_workshop_plan_image_url.sql), updated seed data with plan_image_url, rebuilt subpages/workshop-plans.html in UTF-8 with DB image binding, and moved admin logo to left-top brand area.
- 2026-03-26: Aligned `subpages/workshop-plans.html` card structure to match `subpages/workshop.html` card layout pattern (intro/detail card + image-last cards) while keeping DB-driven plan images.
- 2026-03-26: Normalised workshop-plan card title sizing, corrected plan image mapping to workshop canonical assets (`Workshop_ (9-1).png` / `Workshop_ (2-1).png`), and removed sidebar eyebrow text from admin top-left brand block.
- 2026-03-26: Added backlog item for workshop plan/course management IA optimisation and dynamic booking summary replacement (currently static text).
- 2026-03-26: Implemented dynamic booking summary panel on workshop booking page; static generic values removed.
- 2026-03-26: Mojibake remediation completed for `subpages/workshop-booking.html` (UTF-8 rebuilt page).
- 2026-03-26: Implemented `app/pages/workshop-plans.html` + `css/app-workshop-plans.css` and added `Plan Management` link from `app/pages/workshop.html`.

- 2026-03-26: Refined `app/pages/workshop-plans.html` visual design to align with `DESIGN_GUIDELINE` tokens (palette, typography, spacing, button/input standards) via `css/app-workshop-plans.css` refresh.
- 2026-03-26: Shared footer Guide first link label changed from `Top` to `サイトマップ` in `js/site-shell.js`.
- 2026-03-26: Created `subpages/sitemap.html` to visualise full site structure (public + admin links) for IA review and quick navigation.
- 2026-03-26: Updated shared footer guide link in `js/site-shell.js` to route `サイトマップ` -> `subpages/sitemap.html`.
- 2026-03-26: Added backlog item `2.12 Breadcrumb Navigation` in `FEATURE_BACKLOG.md` for shared hierarchy cues on public/admin pages.
- 2026-03-26: Task #3 hardening slice implemented for booking completion quality.
  - JA: 確認画面で送信前プリフライト（予約枠の実在/公開状態/満席判定/プランactive判定）を追加し、送信可否を画面内で明示化。
  - EN: Added pre-submit preflight on confirm page (slot existence/public state/full-capacity checks and plan active-state check) with explicit in-page sendability feedback.
  - JA: 参加人数はセッション/プランの `min_party_size`〜`max_party_size` で再検証するよう変更。
  - EN: Party size is now revalidated against session/plan `min_party_size` to `max_party_size` at submit time.
  - JA: 公開予約フロー文言の Draft 表記を除去し、完了画面のステータス表示を利用者向け文言へ変換。
  - EN: Removed draft-facing wording from public booking flow and converted thanks status display to user-readable messaging.
- 2026-03-26: Step 1 UX conversion tuning completed on public booking page.
  - JA: `workshop-booking.html` のヒーロー説明と選択バー文言を、予約完了までの次アクションが分かる表現へ更新。
  - EN: Updated `workshop-booking.html` hero/selection-bar copy so users can clearly understand the next action toward completion.
  - JA: `css/workshop-booking.css` で店舗チップ、日付セル、予約枠カード、選択バーCTAの視覚強度を上げ、予約導線の視認性を改善。
  - EN: Increased visual emphasis for store chips, date cells, slot cards, and selection-bar CTA in `css/workshop-booking.css` to improve booking-flow visibility.
- 2026-03-26: Calendar layout refinement applied (single-month + selected-date panel).
  - JA: カレンダーを2か月同時表示から1か月表示へ変更し、月送りナビゲーション（`<` / `>`）を追加。
  - EN: Changed calendar from dual-month display to a single-month view with month navigation (`<` / `>`).
  - JA: カレンダー横に `Selected Date` パネルを追加し、選択中日程の文脈情報を保持したまま予約枠選択へ誘導。
  - EN: Added a side `Selected Date` panel to keep contextual details visible and guide users into slot selection.
- 2026-03-26: Removed duplicated labels/CTA in Step 1 booking UI.
  - JA: 下段 `Selected Date` 重複表示を削除し、右側パネルの情報表示に一本化。
  - EN: Removed duplicated lower `Selected Date` display and unified context into the side panel.
  - JA: 重複していた遷移CTAを整理し、`この日程の予約枠を見る` の単一導線へ統一。
  - EN: Consolidated duplicate navigation CTAs into a single route via `この日程の予約枠を見る`.
- 2026-03-26: Admin flow upgrade (phase 1) applied.
  - JA: ダッシュボードに `Operations Home` を追加し、当日運用で見るべき booking/enquiry 指標を集約。
  - EN: Added `Operations Home` to dashboard to centralise booking/enquiry indicators for daily operations.
  - JA: 予約管理画面に quick tabs、SLA表示、詳細パネル quick actions、メモテンプレートを追加して triage 速度を改善。
  - EN: Improved triage speed in booking management with quick tabs, SLA labels, detail-panel quick actions, and note templates.
- 2026-03-26: Admin navigation IA updated after user review.
  - JA: サイドナビに `Workshop予約管理` / `Workshopプラン管理` を追加し、Dashboard から直接アクセス可能にした。
  - EN: Added `Workshop予約管理` / `Workshopプラン管理` to side navigation for direct access from dashboard.
  - JA: （当時）`Unassigned Enquiries` は専用画面未実装のため、暫定遷移先として Publish を運用。
  - EN: (At that time) `Unassigned Enquiries` used Publish as a temporary destination before dedicated screen delivery.
- 2026-03-26: Enquiries management screen delivered.
  - JA: `app/pages/enquiries.html` を追加し、問い合わせの一覧・優先キュー（unassigned/open/stale）・詳細更新を実装。
  - EN: Added `app/pages/enquiries.html` with enquiry listing, priority queues (unassigned/open/stale), and detail updates.
  - JA: `Unassigned Enquiries` の dashboard 導線を専用画面へ切替し、Publish 経由の暫定運用を終了。
  - EN: Switched dashboard `Unassigned Enquiries` routing to the dedicated screen and ended the temporary Publish-based flow.

- 2026-03-26: Admin page layout consistency update completed.
  - JA: `app/pages/workshop.html` / `app/pages/workshop-plans.html` / `app/pages/enquiries.html` を `home.html` と同じ管理画面シェル（サイドナビ + 共通ヘッダー）へ統一。
  - EN: Unified `app/pages/workshop.html` / `app/pages/workshop-plans.html` / `app/pages/enquiries.html` into the same admin shell layout as `home.html` (side navigation + shared top header).
  - JA: 各ページロジックを `js/admin-workshop-page.js` / `js/admin-workshop-plans-page.js` / `js/admin-enquiries-page.js` に分離し、`js/admin-app.js` 側のページホストへ描画する構成へ変更。
  - EN: Split each page logic into `js/admin-workshop-page.js` / `js/admin-workshop-plans-page.js` / `js/admin-enquiries-page.js`, rendering into page hosts provided by `js/admin-app.js`.
- 2026-03-26: Fixed empty-content regression on admin pages 04/05/06.
  - JA: `js/admin-app.js` の再描画により `Workshop予約管理` / `Workshopプラン管理` / `問い合わせ管理` の本文DOMが消える問題を修正。
  - EN: Fixed an admin-shell rerender issue where page-body DOM disappeared on `Workshop Bookings` / `Workshop Plans` / `Enquiries`.
  - JA: `admin:render` イベント連携を追加し、各ページモジュールを再マウント可能にした。
  - EN: Added `admin:render` event wiring so each page module remounts after shell rerender.
- 2026-03-26: UI consistency adjustments applied for admin operations screens.
  - JA: Enquiries 画面の一覧幅を縮小し、詳細編集側の作業領域を拡張。
  - EN: Narrowed the Enquiries list pane and expanded the detail-edit working area.
  - JA: Workshop Plans 画面を Workshop Bookings と同系統デザインへ統一（panel/table/form/button/spacing）。
  - EN: Aligned Workshop Plans visual system with Workshop Bookings (panel/table/form/button/spacing).
- 2026-03-26: Enquiries width tuning iteration #2 applied.
  - JA: 一覧カラムがまだ広いとの指摘に対応し、詳細パネル優先となるよう `.eq-grid` 比率を再調整。
  - EN: Adjusted `.eq-grid` again to prioritize detail-panel width after feedback that the list pane was still too wide.
- 2026-03-26: Enquiries width tuning finalised to match Workshop Bookings.
  - JA: Enquiries の2カラム比率を `1.4fr .9fr` に変更し、Workshop Bookings と同一レイアウト幅へ統一。
  - EN: Finalized Enquiries two-column ratio to `1.4fr .9fr`, matching the Workshop Bookings layout width.
- 2026-03-26: Enquiries overflow fix applied after width-ratio alignment.
  - JA: 幅比率を合わせた後に発生した横はみ出しを、`minmax(0, ...)` + `min-width:0` + `overflow-wrap:anywhere` で修正。
  - EN: Fixed post-ratio horizontal overflow using `minmax(0, ...)`, `min-width:0`, and `overflow-wrap:anywhere` safeguards.
- 2026-03-26: Phase 2 hardening slice #1 delivered on Enquiries (06).
  - JA: Enquiries に列ソート、ページング、フィルタ永続化（localStorage）、quick URL同期、空/エラー状態表示を追加。
  - EN: Added column sorting, pagination, persisted filters (localStorage), quick URL sync, and empty/error table states to Enquiries.
- 2026-03-26: Phase 2 hardening slice #2 delivered on Bookings (04) and Plans (05).
  - JA: 04/05 に列ソート、ページング、状態保持（localStorage）を追加し、大量データ時の運用探索性を改善。
  - EN: Added column sorting, pagination, and persisted state (localStorage) to 04/05 for better high-volume operational usability.
- 2026-03-26: Public navigation IA consolidation implemented (rollback-safe).
  - JA: 公開サイドナビを feature flag（`enablePublicSideNav`）で停止し、グローバルナビ単一運用へ移行。
  - EN: Disabled public side navigation via feature flag (`enablePublicSideNav`) and moved to a single global-navigation model.
  - JA: 旧サイドナビはコード保持しており、フラグONで即時ロールバック可能。
  - EN: Legacy side-nav code is retained and can be rolled back instantly by enabling the flag.
- 2026-03-26: Public header/nav UX redesign delivered (logo + no notice text + drilldown nav).
  - JA: ヘッダー左上をロゴ表示へ変更し、notice bar の案内文を削除。
  - EN: Replaced top-left header text with logo and removed notice-bar message text.
  - JA: グローバルナビを drilldown 化し、サイドナビ由来の子メニューを統合。
  - EN: Upgraded global navigation with drilldown menus populated from side-nav child structure.
- 2026-03-26: Global nav interaction/typography refinement applied.
  - JA: Desktop では親メニュー hover でサブメニュー展開、Mobile ではトグル開閉を維持。
  - EN: Desktop now expands submenus on hover, while mobile keeps toggle-based opening.
  - JA: グローバルナビのトップレベル文字を太字＋中央配置へ調整。
  - EN: Updated global-nav top-level labels to bold and centered alignment.
- 2026-03-26: Global nav submenu hover-stability fix applied.
  - JA: 親→子メニュー遷移時の hover ロストを防ぐため、dropdown位置と hover bridge を調整。
  - EN: Improved hover stability by reducing dropdown gap and adding a hover bridge between parent and submenu.
- 2026-03-26: Admin demo-access switch delivered.
  - JA: `js/site-config.js` に `adminAccessMode`（`open_demo` / `admin_only`）を追加。現設定は `open_demo`。
  - EN: Added `adminAccessMode` (`open_demo` / `admin_only`) in `js/site-config.js`; current value is `open_demo`.
  - JA: `js/admin-workshop-page.js` / `js/admin-workshop-plans-page.js` / `js/admin-enquiries-page.js` で、`open_demo` 時は未ログイン強制リダイレクトを無効化。
  - EN: Disabled login-forced redirect in 3 admin page modules when `adminAccessMode` is `open_demo`.
  - JA: `admin_only` へ戻す場合は `js/site-config.js` の値変更のみで切替可能。
  - EN: Rollback to secure mode is a config-only change (`adminAccessMode: 'admin_only'`).
- 2026-03-26: Global nav `Admin` visibility updated per UX request.
  - JA: 未ログイン時でも `Admin` メニューを常時表示するよう変更（`js/site-shell.js`）。
  - EN: `Admin` menu is now always visible in global nav even when logged off (`js/site-shell.js`).
  - JA: DOM 構造を他メニューと同一化（`.category-nav__item > a`）し、表示一貫性を確保。
  - EN: Matched DOM pattern with other menus (`.category-nav__item > a`) for consistent UI.
- 2026-03-26: Demo-mode data visibility fix for admin operations pages.
  - JA: `open_demo` + 未ログイン時に `signInAnonymously()` を試行し、RLS下でも一覧取得できるよう調整。
  - EN: Added `signInAnonymously()` attempt in `open_demo` when logged off, so list queries can run under authenticated session where allowed by RLS.
  - JA: 対象は `js/admin-app.js` / `js/admin-workshop-page.js` / `js/admin-workshop-plans-page.js` / `js/admin-enquiries-page.js`。
  - EN: Scope: `js/admin-app.js` / `js/admin-workshop-page.js` / `js/admin-workshop-plans-page.js` / `js/admin-enquiries-page.js`.
- 2026-03-26: Root-cause verified for `0/0` on admin bookings/enquiries in open demo mode.
  - JA: publishable key 直叩きで `bookings/enquiries` が `200 []` を返し、RLS非表示であることを確認。
  - EN: Verified via direct publishable-key API check that `bookings/enquiries` return `200 []` due to RLS visibility.
  - JA: デモ表示用として `sql/13_admin_demo_read_policies.sql`（適用）と `sql/14_revert_admin_demo_read_policies.sql`（巻き戻し）を追加。
  - EN: Added `sql/13_admin_demo_read_policies.sql` (apply) and `sql/14_revert_admin_demo_read_policies.sql` (rollback) for demo visibility.
- 2026-03-26: Rollback runbook added for `open_demo` -> `admin_only`.
  - JA: 実施順は `sql/14_revert_admin_demo_read_policies.sql` 実行 -> `js/site-config.js` の `adminAccessMode` を `admin_only` へ変更 -> ハードリロード -> 未ログイン時リダイレクト確認。
  - EN: Required order is: run `sql/14_revert_admin_demo_read_policies.sql` -> set `adminAccessMode` to `admin_only` in `js/site-config.js` -> hard refresh -> verify logged-off redirect to login.

- 2026-03-27: Archived docs/90_WIP/WIP_TEST_WORKSHOP.md as non-canonical due to mojibake corruption and added explicit source-of-truth pointers.
- 2026-03-27: docs/90_WIP/WIP_TEST_WORKSHOP.md は文字化けにより正本外（Archive）として扱う方針を明記し、正本参照先を追記。

## 4A. Today Execution Slice (2026-03-27) / 本日の実行スライス
- JA: 本日は「公開予約 Step 1 のUI文言/誘導の微調整」に限定し、DB仕様変更・SQL追加・管理画面機能追加は行わない。
- EN: Today is limited to micro-improvements in public booking Step 1 copy/guidance only; no DB spec change, no SQL, and no admin feature expansion.
- Scope In:
  - JA: `subpages/workshop-booking.html` の見出し/補助文言/CTA文言の明確化
  - EN: Clarify heading/supporting copy/CTA wording in `subpages/workshop-booking.html`
  - JA: 必要最小限のスタイル調整（可読性・視認性）
  - EN: Minimal style tuning for readability/visibility
- Scope Out:
  - JA: `plan_id` / `session_id` の実データ仕様変更
  - EN: Any production contract change for `plan_id` / `session_id`
  - JA: `bookings` insert payload や Supabase 認証/RLSロジック変更
  - EN: Any `bookings` payload or Supabase auth/RLS logic change
  - JA: 管理画面 (`app/pages/*`, `js/admin-*.js`) の機能追加
  - EN: Any admin feature change (`app/pages/*`, `js/admin-*.js`)

## 4B. Acceptance Criteria (Today) / 本日の受入条件
1. JA: 予約ページ Step 1 で「次に何をするか」が文言で明確に理解できる。
   EN: Step 1 clearly communicates the next action in wording.
2. JA: 日付未選択時は予約枠確認CTAが誤解を生まない非活性/案内状態である。
   EN: Before date selection, slot-check CTA remains non-confusing in disabled/guidance state.
3. JA: 日付選択後、`この日程の予約枠を見る` で下段予約枠へ遷移できる。
   EN: After date selection, `この日程の予約枠を見る` links correctly to slot section.
4. JA: 既存機能退行なし（Diagnostics、store/date選択、Console errorなし）。
   EN: No regression in existing behavior (Diagnostics, store/date selection, no console errors).
5. JA: 同一タスク内で `PROJECT_STATUS.md` / `WIP.md` / `TEST_PLAN.md` を更新する。
   EN: `PROJECT_STATUS.md` / `WIP.md` / `TEST_PLAN.md` must be updated in the same task.

- 2026-03-27: Step 1 UX micro-tuning (public booking) applied. Updated subpages/workshop-booking.html copy/labels (hero, summary, availability, selected-date, legend, slot lead text) and improved disabled CTA clarity in css/workshop-booking.css without DB/SQL/admin logic changes.
- 2026-03-27: 公開予約 Step 1 のUX微調整を実施。subpages/workshop-booking.html の文言・ラベル（ヒーロー、要約、予約可能日、選択日、凡例、予約枠説明）を更新し、css/workshop-booking.css で非活性CTAの視認性を改善。DB/SQL/管理画面ロジック変更はなし。

- 2026-03-27: Step4 admin UX speed-up applied on Enquiries. In js/admin-enquiries-page.js, quick status buttons (Mark In Progress / Mark Responded / Mark Closed) now auto-submit via form.requestSubmit() after setting status (one-click update).
- 2026-03-27: Step4 管理画面UX改善（Enquiries）を実施。js/admin-enquiries-page.js で quick status ボタン（Mark In Progress / Mark Responded / Mark Closed）押下時に status 設定後 form.requestSubmit() で即時保存する1クリック更新へ変更。
- 2026-03-27: Step4 fix: quick status save in Enquiries now uses requestSubmit with submit-event fallback (dispatchEvent) for browser compatibility; status no longer reverts after click.
- 2026-03-27: Step4 管理画面UX改善（Enquiries）を実施。js/admin-enquiries-page.js の quick status ボタン押下時に status 設定後の保存を submit 経由で確実化し、クリック後の戻り（revert）を防止。
- 2026-03-27: Admin save fix applied. Enquiries and Workshop updates now require logged-in (non-anonymous) session and show explicit read-only message in open_demo anonymous mode; quick status buttons submit with compatibility fallback.

## 4A. Today Execution Slice (2026-03-27)
- Scope today: admin page stability + issue logging.
- Save persistence issue in `open_demo` anonymous mode is logged and deferred.
- Priority fix: admin sidebar visibility/scroll and white overlay issue on pages 04/05/06.

## 4B. Acceptance Criteria (Today)
1. Sidebar on admin pages 04/05/06 shows items 01-08 on desktop.
2. Sidebar can scroll independently when viewport height is small.
3. No white overlay panel blocks the lower-left area.

## 4C. Progress Log (2026-03-27)
- Applied Enquiries quick-status submit fallback (`requestSubmit` + submit-event fallback).
- Applied admin sidebar visibility fix candidate in `css/admin-app.css`.
- Bumped admin assets to `20260327c` for cache refresh.
- Logged save issue + visibility issue in issue list.

- 2026-03-27: Admin sidebar visibility fix (20260327c) user-verified as working on pages 04/05/06.

- 2026-03-27: Admin read-only UX applied for anonymous open_demo session (Enquiries/Workshop). Update + quick-status buttons are disabled and fixed message is shown. Asset version: 20260327d.

- 2026-03-27: Admin 04/06 button labels localized to Japanese and action-button style unified per design guideline (min-height 44px, radius 10px, consistent typography). Asset version: 20260327g.

- 2026-03-27: Admin 05 (Workshopプラン管理) aligned with 04/06 design/visibility. Button labels are Japanese and action-button style is unified per guideline. Anonymous open_demo session is now explicit read-only (save/delete/add controls disabled). Asset version: 20260327i.
- 2026-03-27: Admin 05 follow-up fix applied. Non-login demo session is now always treated as read-only on Workshop Plans, and disabled-button visibility is explicit. Asset version: 20260327j.
