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
- 2026-03-31: 2.3B implemented. Added AI recommendation apply/undo controls with in-session blend backup on subpages/smart-scent-design.html.
- 2026-03-31: Added user-blend total cap (max 100%) on smart-scent-design slider with total indicator (total: x / 100).

- 2026-03-31: 2.3C step-1 implemented. Added local candidate save/list/load/delete UI (localStorage) on smart-scent-design page.
- 2026-03-31: Updated Digital Blend layout so the left motion pane stays sticky while scrolling on desktop/tablet (mobile keeps normal flow).
- 2026-03-31: Added Operation Guide link + Japanese guide modal on smart-scent-design (close by X/backdrop/Esc).
- 2026-03-31: Updated Operation Guide link style (16px blue hyperlink tone) and enforced Smart Scent initial blend reset on page open (including bfcache pageshow).
- 2026-03-31: Strengthened Smart Scent open-reset by applying initial blend reset on every pageshow event (not only persisted=true).

- JA: 2026-03-31 Smart Scent変更まとめ（2.3A-2.3D）: AI提案、適用/取り消し、100%上限、候補保存、操作ガイド、表示時リセットを実装。
- EN: 2026-03-31 Smart Scent change summary (2.3A-2.3D): implemented AI suggestion, apply/undo, 100% cap, candidate save, operation guide, and open-time reset.
- JA: 2026-03-31 2.4A 着手。候補保存を DB 優先化（smart_scent_blends + RLS）し、未ログイン/障害時はローカル保存へフォールバック。
- EN: 2026-03-31 Started 2.4A. Candidate persistence is now DB-first (smart_scent_blends + RLS) with local fallback for no-login/error cases.
- JA: 2026-03-31 2.4B 実装。保存済み候補の編集/更新（DB + local）と updated_at トリガーSQL（sql/19）を追加。
- EN: 2026-03-31 Implemented 2.4B. Added edit/update for saved candidates (DB + local) and updated_at trigger SQL (sql/19).
- JA: 2026-03-31 Smart Scent 候補保存3ボタンのラベル折返しを解消（1行表示化）。
- EN: 2026-03-31 Fixed label wrapping on the 3 candidate-save action buttons in Smart Scent (single-line display).
- JA: 2026-03-31 候補保存3ボタンのはみ出し対策として、3列幅/余白/文字サイズを再調整。
- EN: 2026-03-31 Re-tuned triple action button row (column width/padding/font size) to prevent overflow outside the frame.
- JA: 2026-03-31 Smart Scent のボタンサイズを全体調整（main/secondary/mini を段階的に縮小）。
- EN: 2026-03-31 Normalized Smart Scent button sizes across main/secondary/mini actions for better overall balance.
- JA: 2026-03-31 Smart Scent ボタン縮小を追加調整し、CSSバージョンを更新して反映漏れを回避。
- EN: 2026-03-31 Applied an additional Smart Scent button-size reduction and bumped CSS version to avoid cache-miss reflection issues.
- JA: 2026-03-31 候補保存3ボタンの高さを再調整（36px）し、他アクションボタンとの高さ整合を改善。
- EN: 2026-03-31 Re-adjusted the candidate-save 3-button row height to 36px to align with other action buttons.
- JA: 2026-03-31 保存行ボタンの高さ差分原因（triple専用ルール）を是正し、min-height を 42px に統一。CSS版を 20260331f に更新。
- EN: 2026-03-31 Fixed save-row height mismatch caused by the triple-row override and unified min-height to 42px; bumped CSS version to 20260331f.
- JA: 2026-03-31 2.4C（複製/共有リンク）は On-hold に設定。次は 2.5 検討へ進む。
- EN: 2026-03-31 Set 2.4C (duplicate/share-link) to On-hold. Next focus moves to 2.5.
- JA: 2026-03-31 2A-2B として公開主要4ページの文言統一を実施（操作ガイド表記、Workshop概要ラベル、プラン読込文言、予約診断ラベルの日本語化）。
- EN: 2026-03-31 Completed 2A-2B wording normalization on 4 core public pages (guide label, workshop proof labels, plan-loading text, and booking diagnostics labels in Japanese).
- JA: 2026-03-31 2C-2D を実施。公開主要4ページで見出し/ラベル/説明文を日本語中心へ統一し、文言の可読性・一貫性を改善。
- EN: 2026-03-31 Completed 2C-2D. Standardized headings/labels/copy to Japanese-first across 4 core public pages for improved readability and consistency.
- JA: 2026-03-31 Step 4 実施。公開サブページ横断の文言整合チェックを行い、予約導線（plans/entry/confirm/thanks）と案内系ページ（shop-info/shopping-guide）の英語見出し・ラベルを日本語中心へ統一。
- EN: 2026-03-31 Step 4 executed. Completed cross-subpage wording consistency sweep and normalized English headings/labels to Japanese-first on booking-flow pages (plans/entry/confirm/thanks) and guide pages (shop-info/shopping-guide).
- 2026-04-02: Closed recurrent mojibake in public shell text by restoring `js/site-shell.js` from a known-good revision and reapplying approved theme-switcher deltas only.
- 2026-04-02: Added mandatory close-out checks: run mojibake scan (`rg -n -F "\\uFFFD" docs`) and verify UTF-8 encoding before completing shell/doc tasks.
- 2026-04-03: Added Issue `2026-04-03-33` for shell render regression (`Unexpected token '}'` in `js/site-shell.js`) after mobile nav refactor; removed duplicated `renderMobileNav()` fragment and moved status to Monitoring until user confirms.
- 2026-04-04: Pre-2.3 wording alignment (global nav + workshop CTA).
  - JA: グローバルナビ `香りと遊ぶ` を `香りを体験する` に変更し、プルダウンを `ワークショップ体験ガイド / プランを見る / 予約する / 体験ステップ / デジタル調香を試す` へ統一。
  - EN: Renamed workshop top nav to `香りを体験する` and standardized dropdown labels to action-oriented wording.
  - JA: `index/workshop/booking/thanks/brand` の比較系CTAを `プランを見る` に統一し、`デジタル調香` 導線文言も整合。
  - EN: Standardized key workshop CTAs to `プランを見る` and aligned digital-blend CTA wording across related pages.
- 2026-04-04: 2.3 layout polish step-1 implemented (smart-scent-design).
  - JA: コントロール側UIを STEP 1〜4 の構成へ再編し、AI提案・現在確認・候補保存の役割を分離。
  - EN: Reorganized control-side UI into STEP 1–4 and separated AI suggestion, current-check, and candidate-save responsibilities.
  - JA: AI CTA を `おすすめを提案する` へ統一し、提案結果カードの見出しとステップバッジを追加。
  - EN: Unified AI CTA wording to `おすすめを提案する` and added result heading + step badges.
- 2026-04-04: 2.3 layout polish step-1b (AI-first flow order).
  - JA: smart-scent-design の操作順序を AI先行へ変更（STEP1 AI提案 → STEP2 手動調整 → STEP3 確認 → STEP4 保存）。
  - EN: Switched smart-scent-design to AI-first operation order and renumbered the step sequence accordingly.
- 2026-04-04: 2.3 layout polish step-1c (remove redundant Step-3 CTA).
  - JA: `この香りを見る` を削除し、STEP 3 を `香りの最終調整` へ変更。結果はリアルタイム更新前提に統一。
  - EN: Removed redundant `この香りを見る` in Step 3 and renamed it to `香りの最終調整`, fully aligning with real-time result updates.
- 2026-04-04: 2.3 layout polish step-2 implemented (saved-candidate readability + responsive density).
  - JA: 保存済み候補カードに保存種別/メモ/更新日時を追加し、再利用判断情報を強化。
  - EN: Added source/memo/timestamp metadata to saved-candidate cards for better reuse decisions.
  - JA: 1180px以下で 3ボタン行を 2列+1列に最適化、720px以下で保存カードとミニボタンの可読性を改善。
  - EN: Optimized triple action row for medium width and improved saved-card/mobile button readability under 720px.
- 2026-04-04: 2.4 storage-mode sync hotfix (post-login auto switch).
  - JA: `smart-scent-design` で認証状態変更リスナーを追加し、ページ表示中にログイン/ログアウトしても保存先を自動切替（クラウド/ローカル）できるよう修正。
  - EN: Added auth-state listener on `smart-scent-design` so in-page sign-in/sign-out automatically switches candidate storage mode (cloud/local) without reload.
- 2026-04-04: Smart Scent console-noise cleanup (audio + favicon).
  - JA: `smart-scent-design` の Tone.js を遅延読込化し、初期表示時の AudioContext 警告発生を抑制。
  - EN: Switched `smart-scent-design` Tone.js to lazy-load so AudioContext warnings do not appear on initial page load.
  - JA: `favicon.ico` 404 を解消するため、ページfavicon指定とルート `favicon.ico` を追加。
  - EN: Resolved favicon 404 by adding explicit page favicon link and root `favicon.ico`.
