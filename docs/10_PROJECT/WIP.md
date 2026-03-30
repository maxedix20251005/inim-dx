# WIP / 作業メモ

## 1. Objective This Sprint / 目的
- JA: Top -> Workshop 予約導線の完走率改善と、運用管理の安定化を進める。
- EN: Improve completion rate for Top -> Workshop booking flow and stabilise admin operations.

## 2. Current Status / 現在の状況
- JA: 公開側の予約フロー（workshop → booking → entry → confirm → thanks）は動作確認済み。
- EN: Public booking flow (workshop → booking → entry → confirm → thanks) is verified.
- JA: 管理画面の予約・問い合わせ管理は read-only/権限制御を含めて整備済み。
- EN: Admin booking/enquiry management is in place with read-only gating.
- JA: 2.14 未実装ページ作成は完了（support はフッター区分のみ）。
- EN: 2.14 placeholder page creation is complete (support is footer category only).

## 3. In Progress / 進行中
- JA: 2.2 Top → Workshop 導線改善の最終チェックとクローズ判断。
- EN: Final checks and close-out decision for 2.2 Top → Workshop flow reinforcement.

## 4. Next Actions / 次のアクション
1. JA: 2.2 の残チェックを明文化し、未実施項目がなければ Close へ。
   EN: Define remaining checks for 2.2 and close if all are satisfied.
2. JA: 必要なら 2.10（管理導線最適化）の着手順を決定。
   EN: If needed, decide kickoff order for 2.10 (admin IA optimisation).
3. JA: ドキュメント UTF-8/リンク整合の簡易チェックを継続。
   EN: Continue quick UTF-8 and link-validity checks.

## 5. On Hold / 保留
- JA: Spring Boot/Java API は規模拡大時の将来フェーズ。
- EN: Spring Boot/Java API remains a future-phase option.

## 6. Open Issues (Linked) / 参照
- JA/EN: 最新の Issue は `docs/10_PROJECT/ISSUE_LIST.md` を参照。

## 7. Restart Checklist / 再開チェック
1. `docs/10_PROJECT/PROJECT_STATUS.md`
2. `docs/10_PROJECT/ISSUE_LIST.md`
3. `docs/20_PRODUCT/FEATURE_BACKLOG.md`
4. `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
5. 予約フロー関連ページ（`subpages/workshop-*.html`）

## 8. Update Log / 更新履歴
- 2026-03-30: Mojibake recovery. Backed up corrupted WIP to `docs/90_WIP/WIP_mojibake_backup_20260330.md` and rebuilt this file in UTF-8.
- 2026-03-30: Closed 2.14 Create All Placeholder Pages (support is footer category only).
- 2026-03-30: Sitemap optimised and non-required links removed.
- 2026-03-30: Store/Shop low-risk updates completed; high-risk follow-up deferred.
- 2026-03-30: Mojibake recovery applied to FEATURE_BACKLOG.md and WIP.md (backups saved).
- 2026-03-30: Restored subpages/workshop-booking.html from commit e486df8 to fix layout regression caused by accidental selector/id rename (ooking-store-* mismatch).
- 2026-03-30: Closed 2.2 Top -> Workshop Flow Reinforcement after user UAT pass (CTA/plan-to-booking/thanks actions).
- 2026-03-30: Backlog text cleanup: removed （着手中） from 2.2 title and closed 2.10 after implementation re-check.
- 2026-03-30: Closed 2.11 (Sitemap) and 2.12 (Breadcrumb) by user confirmation.