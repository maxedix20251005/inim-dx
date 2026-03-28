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
- 2026-03-27: Step5 completed for 04/05/06. UI text labels/messages localized to Japanese and read-only disabled visibility aligned. Asset version: 20260327k.
- 2026-03-27: Step2 save-fix applied on 04/06. Write auth check now uses strict non-login detection (started-without-session or anonymous provider => read-only), aligned with 05. Asset version: 20260327l.

- 2026-03-27: Added FEATURE_BACKLOG 2.13 for site structure review + IA refinement (public/admin hierarchy review).
- 2026-03-28: Backlog status audit completed.
  - JA: `2.6`（管理者アクセス制御 + LED運用）と `2.7`（ダッシュボード導線）を実装実績に合わせて `Accepted` へ更新。
  - EN: Updated `2.6` and `2.7` to `Accepted` in FEATURE_BACKLOG to match delivered implementation.
- 2026-03-28: Started `2.2 Top -> Workshop Flow Reinforcement` (slice-1).
  - JA: `index.html` の Hero/Experience Banner/Journey に予約・比較・次アクションCTAを追加し、トップから Workshop/Booking への遷移を短縮。
  - EN: Added booking/comparison/next-action CTAs in Hero, Experience Banner, and Journey on `index.html` to reduce click depth from Top to Workshop/Booking.
  - JA: `css/style.css` に `.journey__actions` を追加し、モバイルでは縦積み表示に切替。
  - EN: Added `.journey__actions` in `css/style.css` with mobile vertical stacking behavior.
- 2026-03-28: Public booking diagnostics visibility updated.
  - JA: `Data Diagnostics` パネルを既定で非表示化（`showBookingDiagnostics: false`）。
  - EN: `Data Diagnostics` panel is now hidden by default via `showBookingDiagnostics: false`.
  - JA: 調査時のみ `js/site-config.js` で `showBookingDiagnostics: true` に切替して再表示可能。
  - EN: For troubleshooting, set `showBookingDiagnostics: true` in `js/site-config.js` to show diagnostics again.
- 2026-03-28: Booking page top-strip cleanup + LED relocation.
  - JA: 上部 `WORKSHOP BOOKING` ストリップを削除し、LED を Hero kicker（`booking-hero`）へ移動。
  - EN: Removed the top `WORKSHOP BOOKING` strip and relocated LED into the Hero kicker (`booking-hero`).
  - JA: 診断パネルは既定非表示のまま維持し、表示残り（タイトル/LED重複）を解消。
  - EN: Kept diagnostics hidden by default and removed remaining visible artifacts (title/duplicated LED).
- 2026-03-28: Continued `2.2 Top -> Workshop Flow Reinforcement` (slice-2).
  - JA: `subpages/workshop.html` に中段の意思決定ブロック（`#decision`）を追加し、比較/空き枠確認/店舗選択の3導線を短手順化。
  - EN: Added a mid-page decision block (`#decision`) in `subpages/workshop.html` to shorten three paths: compare plans / check slots / choose store.
  - JA: `css/workshop.css` へ `workshop-decision` のレスポンシブスタイルを追加。
  - EN: Added responsive `workshop-decision` styles in `css/workshop.css`.
- 2026-03-28: Decision CTA contrast fix applied.
  - JA: `#decision` の `店舗を選んで進む` ボタン（ghost）の背景同化を解消するため、セクション限定で色/境界線/hover/focus を上書き。
  - EN: Applied section-scoped color/border/hover/focus override to fix low contrast on `店舗を選んで進む` ghost CTA in `#decision`.
- 2026-03-28: Continued `2.8 Workshop Plan Page Formalisation`.
  - JA: `subpages/workshop-plans.html` に比較フィルタ・並び順・下部予約CTAを追加し、プラン選定から予約遷移までの導線を明確化。
  - EN: Added comparison filters, sort options, and a bottom booking CTA in `subpages/workshop-plans.html` to clarify plan-to-booking flow.
  - JA: 予約遷移URLに `planId` を追加し、`planCode` / `planName` と合わせて引継ぎ。
  - EN: Added `planId` to booking handoff query along with `planCode` and `planName`.
- 2026-03-28: Continued `2.8` with booking-page plan preselection.
  - JA: `subpages/workshop-booking.html` で `planId`（fallback: `planCode`/`planName`）を受け取り、該当プランのセッションに絞って表示するよう変更。
  - EN: `subpages/workshop-booking.html` now consumes `planId` (fallback: `planCode`/`planName`) and filters visible sessions to the matched plan.
  - JA: サマリーに `選択プラン` を追加し、プラン一致/不一致の状態が分かるようにした。
  - EN: Added `Selected Plan` summary row for clear matched/unmatched context.
- 2026-03-28: Continued `2.8` with plan-context controls on booking page.
  - JA: `subpages/workshop-booking.html` に `選択中プラン` コンテキストバーを追加し、`プランを変更する` / `全プランを表示` を提供。
  - EN: Added a `Selected Plan` context bar in `subpages/workshop-booking.html` with `Change Plan` and `Show All Plans` actions.
  - JA: `全プランを表示` は `planId/planCode/planName` クエリを除去して同ページを再表示し、プラン絞り込みを解除。
  - EN: `Show All Plans` reloads booking page without `planId/planCode/planName` params to clear plan filtering.
- 2026-03-28: In-progress backlog recheck completed before next start.
  - JA: `2.8` / `2.10` / `2.11` は実装と検証記録が揃っているため `Accepted` へ更新。
  - EN: Promoted `2.8` / `2.10` / `2.11` to `Accepted` after confirming implementation and test coverage.
  - JA: `DESIGN_GUIDELINE` と `TECH_SPEC` に、Workshop 管理導線の配置ルール（管理サイドナビ正本、公開側は Admin 入口のみ）を追記。
  - EN: Added navigation placement governance to `DESIGN_GUIDELINE` and `TECH_SPEC` (admin sidebar as canonical path, public nav keeps only Admin entry).
- 2026-03-28: Continued `2.2 Top -> Workshop Flow Reinforcement` (slice-3).
  - JA: 完了画面 `subpages/workshop-booking-thanks.html` にステータス別案内と次アクション導線を追加。
  - EN: Added status-specific guidance and next-step actions on `subpages/workshop-booking-thanks.html`.
  - JA: `同じ条件で別日程を探す` で `store/storeLabel/planName` を保持した再検索遷移を追加。
  - EN: Added rebook action that keeps `store/storeLabel/planName` context for quick alternate-date search.
- 2026-03-28: Continued `2.2 Top -> Workshop Flow Reinforcement` (slice-4).
  - JA: `index.html` の Hero CTA を予約優先へ再配置し、Hero直下に `Booking Shortcut` ブロックを追加。
  - EN: Rebalanced Top hero CTAs toward booking-first and added a dedicated `Booking Shortcut` block below hero in `index.html`.
  - JA: `空き枠確認 / プラン比較 / 詳細確認` の3導線を固定し、Top からの意思決定を短縮。
  - EN: Fixed three entry routes (slot check / plan compare / detail view) to shorten decision time from Top.
- 2026-03-28: Top CTA contrast tuning applied after UI review.
  - JA: `#hero-banner` / `journey` / `booking-shortcut` の ghost ボタンを `workshop #decision` と同系統配色へ変更し、視認性を改善。
  - EN: Updated ghost buttons in `#hero-banner`, `journey`, and `booking-shortcut` to the same color system as `workshop #decision` for better visibility.
- 2026-03-28: Public nav temporary lock applied for non-ready pages.
  - JA: Global Navi の `ブランド/アイテム/香りから探す/記事/Sale/実店舗` を無効化。
  - EN: Disabled `Brand/Items/Search by scent/Articles/Sale/Stores` in Global Navi.
  - JA: Footer `Guide/Support` は `サイトマップ` を除き無効化（公開準備完了後に復帰予定）。
  - EN: Footer `Guide/Support` links are disabled except `Sitemap` until pages are production-ready.
- 2026-03-28: Header notice strip cleanup applied by request.
  - JA: ヘッダー上部の `ショッピングガイド / お問い合わせ` エリアを削除し、情報重複を解消。
  - EN: Removed the top `Shopping Guide / Contact` notice strip to reduce redundant header space.
  - JA: フッター `Guide` に `ショッピングガイド`（disabled）を追加し、フッター `お問い合わせ` は有効維持。
  - EN: Added disabled `ショッピングガイド` under footer `Guide`, while keeping footer `お問い合わせ` active.
- 2026-03-28: Final temporary-link lock adjustment applied.
  - JA: utility header の `検索` と footer Account の `お問い合わせ` を disabled 化し、未実装ページ導線を停止。
  - EN: Disabled utility-header `Search` and footer-account `Contact` to prevent access to not-ready pages.
  - JA: `FEATURE_BACKLOG` に `2.14 Create All Placeholder Pages` を追加（優先バックログ完了後に順次作成）。
  - EN: Added `2.14 Create All Placeholder Pages` to `FEATURE_BACKLOG` for phased page creation after priority backlog completion.
- 2026-03-28: Additional utility-header lock applied.
  - JA: 右上 `カート` リンクを disabled 化し、未実装ページへの遷移を停止。
  - EN: Disabled top-right `Cart` link in utility header for not-ready page protection.
  - JA: `2.14` の対象範囲に `cart/contact` を追記。
  - EN: Extended `2.14` scope explicitly with `cart/contact`.
- 2026-03-28: Continued `2.2 Top -> Workshop Flow Reinforcement` (slice-5).
  - JA: `subpages/workshop-booking.html` に 3ステップ進行表示を追加し、Step1開始時点で全体フローを可視化。
  - EN: Added a 3-step progress strip on `subpages/workshop-booking.html` to make the full booking flow visible from Step 1.
  - JA: `css/workshop-booking.css` で current ステップ強調とモバイル縦積み表示を追加。
  - EN: Added current-step emphasis and mobile stacked layout in `css/workshop-booking.css`.
- 2026-03-28: Continued `2.2 Top -> Workshop Flow Reinforcement` (slice-6).
  - JA: `subpages/workshop.html` のプラン導線へ `store/storeLabel` 引継ぎを追加し、店舗選択後の比較導線で文脈ロストを防止。
  - EN: Added `store/storeLabel` handoff to plan links in `subpages/workshop.html` to prevent context loss after store selection.
  - JA: `subpages/workshop-plans.html` の各予約CTAと下部CTAで、受け取った店舗コンテキストを booking 遷移へ再引継ぎ。
  - EN: `subpages/workshop-plans.html` now forwards received store context to all booking CTAs, including bottom CTA.
- 2026-03-28: Top CTA layout refinement applied after visual review.
  - JA: Hero 3ボタンを同幅グリッド化し、縦位置の不揃いを解消。
  - EN: Converted hero CTAs to equal-width grid for vertical alignment consistency.
  - JA: Booking Shortcut の情報タグを横並びに変更。
  - EN: Changed booking-shortcut info tags from vertical stack to horizontal layout.
  - JA: Journey ボタンを各ステップカード直下へ移設し、カードと同幅に拡張。
  - EN: Moved journey buttons under each step card and expanded them to full card width.
- 2026-03-28: Top CTA/Journey contrast follow-up applied.
  - JA: Hero CTA を縦積み（vertical）へ変更し、ボタン配置の整列を改善。
  - EN: Switched hero CTAs to vertical stacking for clearer alignment.
  - JA: Journey の STEP 1 ghost ボタンを Experience Banner と同系統の配色へ調整し、視認性を改善。
  - EN: Updated Journey Step-1 ghost button to the same visible color scheme as Experience Banner.
- 2026-03-28: Continued `2.2 Top -> Workshop Flow Reinforcement` (slice-7).
  - JA: confirm -> thanks で `plan_id/store/storeLabel` を引継ぎ、完了画面からの再予約精度を改善。
  - EN: Passed `plan_id/store/storeLabel` from confirm to thanks to improve rebooking precision.
  - JA: Thanks の再予約CTAで `planId` を優先付与し、`planName` フォールバックとの併用で一致率を向上。
  - EN: Rebook CTA now prioritizes `planId` with `planName` fallback for robust plan matching.
- 2026-03-28: Booking plan-context bar visibility simplification.
  - JA: `selectedPlan` が有効な場合のみ `選択中プラン` バーを表示し、不一致/未解決時は非表示へ変更。
  - EN: `Selected Plan` bar now appears only when a valid selected plan exists; hidden for unresolved/mismatch cases.
- 2026-03-28: Booking summary-plan fallback aligned with context-bar rule.
  - JA: 不一致クエリ時の `指定プラン不一致（全体表示）` を廃止し、未解決時は `未指定` 表示へ統一。
  - EN: Removed mismatch label from summary-plan fallback and unified unresolved state to `Unspecified`.
- 2026-03-28: Booking plan-name placeholder guard applied.
  - JA: `plan_name` が空/`-`/`未指定` の場合は `選択中プラン` バーを非表示にし、`選択プラン` サマリーも `未指定` 表示へ統一。
  - EN: Added guard to hide selected-plan bar when `plan_name` is empty/`-`/`Unspecified`; summary also falls back to `Unspecified`.
- 2026-03-28: Booking plan-context hide control hardened.
  - JA: ダッシュ系プレースホルダー（`- / ー / － / – / —`）を非表示判定に追加し、`hidden + display:none + aria-hidden` でバー非表示を強制。
  - EN: Hardened selected-plan bar hiding with broader dash-placeholder detection and explicit `hidden + display:none + aria-hidden` enforcement.
- 2026-03-28: Booking plan-context action alignment tweak.
  - JA: `選択中プラン` バーの `プランを変更する` ボタンを右寄せ配置に調整。
  - EN: Adjusted `Change Plan` action to be right-aligned within selected-plan context bar.
- 2026-03-28: Booking plan-context right alignment stabilized.
  - JA: バーを `grid(1fr + auto)` 化し、`actions` を `justify-self:end` で固定して右寄せ崩れを防止（モバイルは1カラム維持）。
  - EN: Stabilized right alignment with `grid(1fr + auto)` and `justify-self:end`; mobile keeps single-column/full-width behavior.
- 2026-03-28: Booking plan-context action order adjusted (final check).
  - JA: `プランを変更する` を右端固定にするため、アクション順を `全プランを表示` -> `プランを変更する` へ変更し、Issue `2026-03-28-28` として記録。
  - EN: Reordered actions to keep `Change Plan` as the rightmost control and logged it as Issue `2026-03-28-28`.
- 2026-03-28: Continued `2.2 Top -> Workshop Flow Reinforcement` (slice-8).
  - JA: `workshop-plans` / `workshop-booking` に fixed 次アクションCTAを追加（Booking側は日付選択時のみ表示）。
  - EN: Added fixed next-action CTAs on `workshop-plans` and `workshop-booking` (booking CTA appears only after a date is selected).
  - JA: Top/Workshop/Plans の主要文言を `予約枠` 表現へ統一。
  - EN: Unified major CTA wording to `予約枠` across Top/Workshop/Plans.
- 2026-03-28: PROGRAM panel -> booking selected-plan handoff fix.
  - JA: `workshop.html` PROGRAMカードCTAに `data-plan-code/name` を付与し、`syncBookingLinks()` で `planCode/planName` を store パラメータと併せて引継ぐよう修正。
  - EN: Fixed PROGRAM-card plan handoff by adding `data-plan-code/name` and syncing `planCode/planName` together with store params.
- 2026-03-28: PROGRAM section DB-driven migration (Issue 2026-03-28-29 permanent fix).
  - JA: `workshop.html` のPROGRAMを静的カードから `workshop_plans` 読み込み（active最大3件）へ移行し、`workshop_plan_inclusions` 表示と booking クエリ引継ぎを統合。
  - EN: Migrated Workshop PROGRAM from static cards to DB-driven cards (up to 3 active plans), including inclusion-point rendering and unified booking handoff.
- 2026-03-28: Issue closure confirmed by user.
  - JA: Issue `2026-03-28-28` / `2026-03-28-29` はユーザー確認完了により `解消済み` へ更新。
  - EN: Issues `2026-03-28-28` and `2026-03-28-29` were closed after user verification.
- 2026-03-28: Backlog status sync for breadcrumb item.
  - JA: `2.12 Breadcrumb Navigation` は実装済み（public: `site-shell.js`, admin: `admin-app.js`）を確認し、`Accepted` へ更新。
  - EN: Confirmed `2.12 Breadcrumb Navigation` is already implemented (public/admin) and updated backlog status to `Accepted`.
- 2026-03-28: Started `2.13 Site Structure Review + IA Refinement` (slice-1).
  - JA: runtime ナビとの整合を優先し、`Sale -> セール` 表記統一、breadcrumb の `sale/itemSale` 重複判定を整理、`sitemap.html` を導線別グルーピングへ再編。
  - EN: Began IA refinement slice-1 by aligning runtime taxonomy, fixing breadcrumb overlap, and reorganizing sitemap into flow-oriented groups.
- 2026-03-28: Continued `2.13` (slice-2: footer taxonomy + disabled policy).
  - JA: `disabledPublicPageKeys` を導入し、Footer/Sidebar/Account の disabled リンク判定を共通化。初期描画と再描画で挙動差が出ないよう統一。
  - EN: Added centralized `disabledPublicPageKeys` policy and unified disabled-link rendering across footer/sidebar/account in both initial and auth-updated states.
- 2026-03-28: Continued `2.13` (slice-3: workshop page-key and breadcrumb consistency).
  - JA: `workshop-plans.html` の `data-page-key` を `workshopPlans` へ修正し、`site-shell.js` に `workshopPlans` / `workshopBookingThanks` を正式登録。
  - EN: Fixed `workshop-plans.html` page-key to `workshopPlans` and registered `workshopPlans` / `workshopBookingThanks` in `site-shell.js`.
  - JA: Workshop導線ラベルを予約フロー表現へ整合し、breadcrumb/current判定へ Plans/Thanks を追加。
  - EN: Aligned workshop-flow labels to booking terminology and added Plans/Thanks into breadcrumb/current-state resolution.
- 2026-03-28: Booking floating reservation panel refinement.
  - JA: `workshop-booking.html` の固定導線をミニパネル化し、`予約する` 見出しと2ボタン（`空き枠を確認する` / `プランを比較する`）のみへ簡素化。
  - EN: Refined booking fixed CTA into a compact floating panel with only title + two actions (`Check Availability` / `Compare Plans`).
  - JA: モバイルは下部ドック表示、日付選択時は第1ボタン文言を日付連動で更新。
  - EN: Mobile now uses bottom dock behavior; primary button label updates with selected date context.
- 2026-03-28: Floating CTA readability + Workshop page CTA relocation.
  - JA: `workshop-booking` の floating ボタンを折返し対応に変更し、長い日付文言でも欠けないよう幅/行高を調整。
  - EN: Updated booking floating buttons for multiline readability so long date labels do not clip.
  - JA: `workshop.html` の下部予約ボタン群をフローティングCTAへ移設（`予約フォームへ進む` / `デジタル調香を試す`）。
  - EN: Moved Workshop reservation actions from bottom panel into a persistent floating CTA.
- 2026-03-28: Continued `2.13` (slice-4: sitemap label/status consistency).
  - JA: `sitemap.html` のトップレベル先頭を `Home` 表記へ統一し、runtime グローバルナビとのラベル整合を強化。
  - EN: Normalized sitemap top-level label to `Home` to match runtime global navigation.
  - JA: 公開未準備ページに `準備中` マーカーを付与し、閲覧者が公開状態を判断しやすいよう改善。
  - EN: Added `準備中` markers to not-ready public pages to make publish status explicit.
- 2026-03-28: Continued `2.13` (slice-5: admin naming + access-mode visibility).
  - JA: sitemap 管理カードの表記を `ワークショップ予約管理 / ワークショッププラン管理` に統一し、公開側表記と混在しないよう整理。
  - EN: Unified admin sitemap labels to `ワークショップ予約管理 / ワークショッププラン管理` for cleaner IA naming.
  - JA: `adminAccessMode` に応じてバッジ/注記が切替わる表示を追加し、`open_demo` と `admin_only` の現在設定をページ上で確認可能にした。
  - EN: Added `adminAccessMode`-driven badge/note rendering so current admin access mode is visible on sitemap.
- 2026-03-28: Continued `2.13` (slice-6: sitemap disabled-link behavior sync).
  - JA: sitemap の `準備中` リンクに `aria-disabled` と非活性スタイルを適用し、クリック遷移を無効化。
  - EN: Synced sitemap `coming-soon` links with disabled behavior (`aria-disabled` + non-clickable styling).
  - JA: runtime の global/footer disabled ポリシーと同じ運用意図になるよう統一。
  - EN: Aligned sitemap behavior with runtime global/footer disabled-link policy intent.
- 2026-03-28: Continued `2.13` (slice-7: runtime policy-driven sitemap disabling).
  - JA: `sitemap.html` のリンクを実行時に走査し、`disabledPageFiles` ポリシーで `is-disabled/aria-disabled/tabindex` を自動適用するよう変更。
  - EN: Added runtime sitemap link scanning to auto-apply disabled state via `disabledPageFiles` policy.
  - JA: 非対象リンクは属性を除去して有効状態を維持し、手動クラス管理への依存を低減。
  - EN: Active links now have disabled attributes removed automatically, reducing manual maintenance drift.
- 2026-03-28: Continued `2.13` (slice-8: centralized disabled policy source).
  - JA: `site-config.js` に `disabledPublicPageKeys` を追加し、公開未準備ページ定義を設定値として一元化。
  - EN: Added `disabledPublicPageKeys` into `site-config.js` as the single source of disabled public-page policy.
  - JA: `site-shell.js` と `sitemap.html` の双方で同設定を参照するよう変更し、片側更新漏れを防止。
  - EN: Updated both `site-shell.js` and `sitemap.html` to read the same policy config, preventing drift.
- 2026-03-28: Continued `2.13` (slice-9: data-page-key based sitemap policy matching).
  - JA: sitemap 公開リンクへ `data-page-key` を付与し、disabled 判定を URL 解析依存からキー一致判定へ移行。
  - EN: Added `data-page-key` to sitemap links and moved disable logic from URL parsing to key-based matching.
  - JA: 手動 `is-disabled/aria-disabled/tabindex` の埋め込みを除去し、実行時ポリシー適用へ統一。
  - EN: Removed hardcoded disabled attributes from markup and unified behavior under runtime policy application.
- 2026-03-28: Continued `2.13` (slice-10: coming-soon badge runtime sync).
  - JA: sitemap スクリプトで `small(準備中)` の表示/非表示を disabled 判定と同時に制御するよう変更。
  - EN: Updated sitemap runtime logic to toggle `coming-soon` badges in sync with disabled policy state.
  - JA: ページ有効化時に `準備中` ラベルが自動で消えるようになり、手動修正を不要化。
  - EN: Enabled pages now auto-hide the `coming-soon` label, removing manual cleanup work.
- 2026-03-28: Continued `2.13` (slice-11: runtime-generated coming-soon badge).
  - JA: disabled 対象リンクで `準備中` バッジが未存在でも自動追加されるようにし、表示文言をスクリプトで標準化。
  - EN: Added runtime badge creation for disabled links and standardized `coming-soon` label text in script.
  - JA: enabled 化されたリンクは `small` バッジを DOM から削除し、マークアップ残骸を残さない挙動へ変更。
  - EN: Enabled links now remove stale `<small>` badges from DOM to avoid leftover markup artifacts.
- 2026-03-28: Continued `2.13` (slice-12: static badge markup removal).
  - JA: sitemap の policy 管理リンクから静的 `<small>準備中</small>` を削除し、実行時生成へ一本化。
  - EN: Removed static `<small>準備中</small>` from policy-managed sitemap links and unified badge rendering at runtime.
  - JA: 表示状態の管理責務を HTML からスクリプトへ移し、編集ミスによる表示差異を防止。
  - EN: Shifted badge-state responsibility from HTML to script to reduce manual inconsistency risk.
- 2026-03-28: Continued `2.13` (slice-13: coming-soon label config externalization).
  - JA: `site-config.js` に `comingSoonBadgeLabel` を追加し、sitemap バッジ文言を設定値から参照するよう変更。
  - EN: Added `comingSoonBadgeLabel` in `site-config.js` and switched sitemap badge text to config-driven rendering.
  - JA: 文言の運用変更を HTML/JS 修正なしで実施できる構成へ更新。
  - EN: Updated architecture so badge copy can be changed operationally without code edits in sitemap script/markup.
- 2026-03-28: Continued `2.13` (slice-14: disabled policy sanitization).
  - JA: `disabledPublicPageKeys` を適用前に正規化（trim/重複除去/未知キー除外）する処理を shell/sitemap 両方へ追加。
  - EN: Added pre-apply sanitization for `disabledPublicPageKeys` (trim/dedupe/unknown-key filter) in both shell and sitemap.
  - JA: 正規化後に有効キーがない場合は既定リストへフォールバックする挙動を統一。
  - EN: Unified fallback behavior to default list when sanitized config becomes empty.
- 2026-03-28: Continued `2.13` (slice-15: markup-driven sitemap fallback defaults).
  - JA: sitemap の default disabled 判定を固定配列ではなく `data-default-disabled` 属性から生成する方式へ変更。
  - EN: Replaced hardcoded sitemap fallback key list with defaults derived from `data-default-disabled` markup.
  - JA: 設定適用は `data-page-key` が存在するリンクに限定し、sitemap 内未定義キーの影響を遮断。
  - EN: Limited config application to links with known sitemap `data-page-key` values.
- 2026-03-28: Continued `2.13` (slice-16: sitemap admin-copy externalization).
  - JA: `site-config.js` に `sitemapAdminAccessCopy` を追加し、admin access バッジ/注記文言を設定化。
  - EN: Added `sitemapAdminAccessCopy` in config for sitemap admin badge/note text management.
  - JA: sitemap スクリプトは固定文言を廃止し、設定値（未設定時フォールバック）を参照するよう更新。
  - EN: Updated sitemap script to consume config copy with safe fallback defaults instead of hardcoded strings.
- 2026-03-28: Continued `2.13` (slice-17: admin mode rendering hardening).
  - JA: `adminAccessMode` の未知値を `admin_only` へ正規化し、mode 判定を安定化。
  - EN: Normalized unknown `adminAccessMode` values to `admin_only` for stable mode handling.
  - JA: バッジクラスを描画前に初期化してから付与し、クラス残留による誤表示を防止。
  - EN: Reset badge mode classes before re-applying the current one to avoid stale visual state.
- 2026-03-28: Continued `2.13` (slice-18: sitemap script maintainability refactor).
  - JA: `readText` / `unique` ヘルパーと `defaults` 集約を導入し、sitemap 実行時ロジックの重複を削減。
  - EN: Introduced `readText`/`unique` helpers and consolidated defaults for cleaner sitemap runtime logic.
- 2026-03-28: Continued `2.13` (slice-19: global-nav disable sync).
  - JA: `disabledGlobalNavKeys` を固定定義から、`disabledPublicPageKeys` 由来の動的導出へ変更。
  - EN: Switched global-nav disabled keys from static list to config-derived subset of `disabledPublicPageKeys`.
- 2026-03-28: Closed `2.13` as accepted (slice-20 closure).
  - JA: IA整合タスクの完了判定を反映し、`FEATURE_BACKLOG` の `2.13` を `Accepted` へ更新。
  - EN: Marked `2.13` as `Accepted` in `FEATURE_BACKLOG` after final consistency pass.
