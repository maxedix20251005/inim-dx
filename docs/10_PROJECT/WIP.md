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
