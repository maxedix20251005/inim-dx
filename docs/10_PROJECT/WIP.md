# WIP / 作業メモ

## 1. Objective This Sprint / 目的
- JA: Top -> Workshop 予約導線の完走率改善と、運用管理の安定化を進める。
- EN: Improve completion rate for Top -> Workshop booking flow and stabilise admin operations.

## 2. Current Status / 現在の状況
- JA: 公開側の予約フロー（workshop → booking → entry → confirm → thanks）は動作確認済み。
- EN: Public booking flow (workshop → booking → entry → confirm → thanks) is verified.
- JA: 2.6（管理者アクセス制御 + 予約LED運用）および 2.9（非adminアクセス検証）はクローズ済み。
- EN: 2.6 (admin access + booking LED governance) and 2.9 (non-admin access verification) are closed.
- JA: 主要バックログは 2.x クローズ群の整合更新後、次フェーズ選定待ち。
- EN: Major 2.x closures are documented; next-phase prioritisation is pending.

## 3. In Progress / 進行中
- JA: 次フェーズ候補（Store/Shop高リスク改名、2.1/2.3/2.4）の優先順位整理。
- EN: Prioritisation of next-phase items (high-risk Store/Shop rename, 2.1/2.3/2.4).

## 4. Next Actions / 次のアクション
1. JA: Store/Shop 高リスク改名タスクのスコープと影響範囲を確定する。
   EN: Define scope and impact boundary for high-risk Store/Shop renaming.
2. JA: 2.1 / 2.3 / 2.4 の着手優先順位を決める。
   EN: Decide kickoff priority among 2.1 / 2.3 / 2.4.
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
- 2026-03-30: Restored subpages/workshop-booking.html from commit e486df8 to fix layout regression caused by accidental selector/id rename (booking-store-* mismatch).
- 2026-03-30: Closed 2.2 Top -> Workshop Flow Reinforcement after user UAT pass (CTA/plan-to-booking/thanks actions).
- 2026-03-30: Backlog text cleanup: removed （着手中） from 2.2 title and closed 2.10 after implementation re-check.
- 2026-03-30: Closed 2.11 (Sitemap) and 2.12 (Breadcrumb) by user confirmation.
- 2026-03-31: Reviewed Accepted backlog items; closed 2.7 / 2.8 / 2.13.
- 2026-03-31: Closed 2.6 (Admin Access Restriction + Booking LED Governance) based on user test results (A/B/D pass, C blocked for non-admin).
- 2026-03-31: Closed 2.9 (Non-admin Access Verification Backlog) after non-admin deny-access verification under admin_only mode.
- 2026-03-31: WIP consistency cleanup after 2.6/2.9 closure (updated Current Status/In Progress/Next Actions).
- 2026-03-31: 2.3A started. Added Digital Blend AI recommendation panel (mood/problem/change inputs + rule-based suggestions) to subpages/smart-scent-design.html.
