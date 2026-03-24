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
- JA: 詳細は `docs/ISSUE_LIST.md` を正本とする。
- EN: `docs/ISSUE_LIST.md` is the source of truth for active/resolved issues.

## 7. Restart Checklist / 再開チェック
1. `docs/PROJECT_STATUS.md` を読む
2. `docs/ISSUE_LIST.md` を読む
3. `docs/TECH_SPEC.md` と `docs/DESIGN_GUIDELINE.md` を読む
4. `subpages/workshop-booking*.html` の現行導線を確認
5. 実装着手前にタスク受入条件を1段落で定義

## 8. Handoff Notes / 引継ぎメモ
- JA: 変更時は必ず `PROJECT_STATUS.md` 更新を同タスク内で実施する。
- EN: Always update `PROJECT_STATUS.md` within the same task as code changes.
- JA: 文字化け（UTF-8）とリンク切れを最終チェックする。
- EN: Run final UTF-8 and link-validity checks.
