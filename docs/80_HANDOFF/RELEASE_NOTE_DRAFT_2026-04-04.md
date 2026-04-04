# inim-dx Release Note (Draft) - 2026-04-04

## Summary / 概要
EN: This release finalizes the public workshop journey and project cleanup for limited GitHub Pages access.  
JA: 本リリースは、限定公開の GitHub Pages 向けに公開導線（Workshop/Booking）と最終クリーンアップを確定したものです。

- EN: Public flow stabilized: **Top -> Workshop -> Booking -> Entry -> Confirm -> Thanks**
- JA: 公開導線を安定化: **Top -> Workshop -> Booking -> Entry -> Confirm -> Thanks**
- EN: Smart Scent improved: **save/edit/load candidates** with DB-first persistence and local fallback
- JA: Smart Scent 改善: 候補の**保存/編集/読込**を DB優先 + ローカルフォールバックで安定化
- EN: Responsive hardening completed for key mobile scenarios
- JA: 主要モバイル表示のレスポンシブ補強を完了
- EN: Copy/CTA consistency sweep completed (English section-kicker tone + Japanese-first body copy)
- JA: 文言/CTA整合を完了（section-kicker 英語トーン + 本文日本語優先）
- EN: Admin operation runbook verified (`open_demo` <-> `admin_only`)
- JA: 管理運用 runbook（`open_demo` <-> `admin_only`）の検証を完了

## Audience / Access / 公開対象
- EN: This release is intended for a **limited audience** on GitHub Pages.
- JA: 本リリースは GitHub Pages 上での**限定公開**を想定しています。
- EN: Current config is set for demo visibility:
- JA: 現在の設定はデモ閲覧向けです:
  - `js/site-config.js`: `adminAccessMode: 'open_demo'`
- EN: For restricted admin operation, rollback to `admin_only`:
- JA: 管理者限定運用へ戻す場合は `admin_only` へ切替:
  1. Run `sql/14_revert_admin_demo_read_policies.sql`
  2. Set `adminAccessMode: 'admin_only'` in `js/site-config.js`
  3. Hard refresh and confirm login-required behavior

## Key Improvements / 主な改善
1. Workshop Booking UX/Flow
   - Refined booking step flow and selected-plan handoff consistency
   - Floating CTA usability improvements on mobile/desktop
   - Booking detail table overflow handling for small screens

2. Smart Scent
   - Candidate save/edit/load/delete flow finalized
   - Cloud-first storage (`smart_scent_blends`) with robust local fallback
   - Auth-state sync hotfix (mode changes without page reload)
   - Audio and favicon console-noise cleanup

3. Consistency and Polish
   - Section-kicker labels unified to English across public pages
   - Footer section titles reverted to English (`SHOP INFO / GUIDE / SUPPORT / ACCOUNT`)
   - Final responsive sweep pass-1/pass-2 completed and validated

## Verification Snapshot / 検証サマリー
- E2E smoke scope: **Pass**
  - `index.html` -> `subpages/workshop.html` -> booking flow pages
  - Smart Scent save/edit/load behavior and storage mode logic
- Admin mode runbook scope: **Pass**
  - `open_demo` / `admin_only` mode logic and SQL apply/revert scripts validated
- Link audit (public HTML relative links): **0 broken links**

## Deferred Items (Only) / 保留項目（Deferredのみ）
- `2.1 Content Update Enhancement`
- `2.4C Duplicate/Share Link for blends`
- `2.5 Workshop x Product Discount Logic`

## Reference Docs / 参照資料
- `docs/80_HANDOFF/RELEASE_HANDOVER_2026-04-04.md`
- `docs/10_PROJECT/PROJECT_STATUS.md`
- `docs/60_TEST/TEST_PLAN.md`
- `docs/20_PRODUCT/FEATURE_BACKLOG.md`
