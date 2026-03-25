# NEXT CHAT HANDOFF / 次チャット引継ぎ

## 1. Handoff Purpose / 引継ぎ目的
- JA: 新しいチャット/端末で、同じ前提・同じ優先順位で即時再開するための実行用メモ。
- EN: Execution memo to restart immediately in a new chat/device with identical assumptions and priorities.

## 2. Mandatory Read Order / 必読順
1. `docs/10_PROJECT/PROJECT_STATUS.md`
2. `docs/10_PROJECT/ISSUE_LIST.md`
3. `docs/10_PROJECT/WIP.md`
4. `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
5. `docs/30_TECH/TECH_SPEC.md`
6. `docs/00_GOVERNANCE/DOCUMENTATION_GOVERNANCE_GUIDELINE.md`
7. `docs/80_HANDOFF/AI_BUILD_PROMPT.md`

## 3. Current Project State / 現在のプロジェクト状態
- JA: 公開導線は `Top -> Workshop -> Booking` を中心に整備済み。
- EN: Public conversion flow is structured around `Top -> Workshop -> Booking`.
- JA: 予約導線は `workshop.html -> workshop-booking.html -> workshop-booking-entry.html -> workshop-booking-confirm.html`。
- EN: Booking flow runs across the four workshop pages above.
- JA: 確認画面から Supabase `bookings` への保存は実装済み。
- EN: Insert into Supabase `bookings` from confirm page is implemented.
- JA: 命名規約は `bookings / enquiries` に統一済み。
- EN: Naming standard is already unified to `bookings / enquiries`.

## 4. Canonical Sources / 正本
- Design: `references/design/05-wireframe.html`, `references/design/06-design-guide.html`
- Specification: `references/design/07-specification.html`
- DB Design: `references/design/08-db-design.html`
- Business intent/KPI: `references/design/01-proposal.html`

## 5. Operational Rules (Must) / 必須運用ルール
- JA: 実装前に不明点を確認し、曖昧仕様を独断で固定しない。
- EN: Clarify unknowns before coding; do not lock ambiguous specs unilaterally.
- JA: 実装差分があるタスクは、同タスク内で文書更新を完了する。
- EN: Any code change must include documentation updates in the same task.
- JA: 不具合は `docs/10_PROJECT/ISSUE_LIST.md` に即記録する。
- EN: Record issues immediately in `docs/10_PROJECT/ISSUE_LIST.md`.
- JA: 全ドキュメントは Bilingual（JA/EN）で維持する。
- EN: Keep all documents bilingual (JA/EN).

## 6. Recommended Next Task / 推奨次タスク
1. JA: `plan_id` / `session_id` の実データ確定方式を決める。
   EN: Finalise real-data mapping for `plan_id` / `session_id`.
2. JA: 予約送信後の Thanks ページ導線と表示項目を確定する。
   EN: Finalise post-submit thanks page flow and content.
3. JA: 管理画面の `bookings / enquiries` 詳細管理（F-009）を段階実装する。
   EN: Implement phased admin detail management for `bookings / enquiries` (F-009).

## 7. Open Risks / 未解決リスク
- JA: 予約導線の一部が Draft 前提で、実データ運用境界が未確定。
- EN: Parts of the booking flow are still draft-oriented with unresolved production boundaries.
- JA: 管理画面の仕様書対象機能（特に F-008/F-009）に未実装領域が残る。
- EN: Admin features in spec (notably F-008/F-009) remain partially implemented.

## 8. Restart Checklist / 再開チェックリスト
1. Read mandatory docs in order.
2. Summarise current status in 5 bullets.
3. Define one smallest executable task with acceptance criteria.
4. Implement after confirmation.
5. Update `PROJECT_STATUS.md` + related docs.

## 9. Verification Checklist / 検証チェックリスト
- JA/EN: Public key flow navigation works (Top -> Workshop -> Booking).
- JA/EN: Booking submit works without console errors.
- JA/EN: Updated docs contain no mojibake (UTF-8).
- JA/EN: File paths and table names are consistent with code.

## 10. Reporting Format / 報告フォーマット
- `Task:`
- `Changes:`
- `Verification:`
- `Docs Updated:`
- `Risks/Follow-up:`



