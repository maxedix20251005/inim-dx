# WIP / 作業メモ

## 1. Objective This Sprint / 目的
- JA: Top -> Workshop 予約導線の完走率改善と、運用管理の安定化を進める。
- EN: Improve completion rate for Top -> Workshop booking flow and stabilise admin operations.

## 2. Current Status / 現在の状況
- JA: 公開側の予約フロー（workshop → booking → entry → confirm → thanks）は動作確認済み。
- EN: Public booking flow (workshop → booking → entry → confirm → thanks) is verified.
- JA: 2.6（管理者アクセス制御 + 予約LED運用）および 2.9（非adminアクセス検証）はクローズ済み。
- EN: 2.6 (admin access + booking LED governance) and 2.9 (non-admin access verification) are closed.
- JA: 2.3（Digital Blend AI Recommendation）は実装・改善・不具合修正まで完了し、2026-04-04 にクローズ。
- EN: 2.3 (Digital Blend AI Recommendation) has been completed end-to-end and closed on 2026-04-04.
- JA: 2.4（Blend Save and Reuse）は 2.4C Deferred 維持のままクローズし、現フォーカスは 2.1 / 2.5 / Store-Shop 高リスク改名。
- EN: 2.4 (Blend Save and Reuse) is now closed with 2.4C kept Deferred; current focus is 2.1 / 2.5 / high-risk Store-Shop rename.
- JA: 2.1 / 2.5 は On-hold（Deferred）へ移行し、現フェーズはプロジェクト全体のクリーンアップを優先。
- EN: 2.1 / 2.5 moved to On-hold (Deferred); this phase prioritizes full-project cleanup.

## 3. In Progress / 進行中
- JA: クリーンアップ計画（リンク整合・文言統一・テスト最終化・運用手順整備）の優先順位整理。
- EN: Prioritising cleanup plan items (link consistency, copy consistency, test finalisation, operation runbook tidy-up).

## 4. Next Actions / 次のアクション
1. JA: 公開ページ全体のリンク有効性と disabled方針を最終点検する（ヘッダー/フッター/カードCTA）。
   EN: Final-check active/disabled link consistency across public pages (header/footer/card CTAs).
2. JA: 文言最終統一（日本語優先、英語補助）とボタンラベル一貫性を横断確認する。
   EN: Run final copy consistency pass (Japanese-first with English support) including button labels.
3. JA: TEST_PLAN の主要シナリオを実行し、結果ログを PROJECT_STATUS/WIP に反映する。
   EN: Execute key TEST_PLAN scenarios and reflect outcomes in PROJECT_STATUS/WIP.
4. JA: 運用切替手順（demo/open_demo -> admin_only）と SQL 手順を最終レビューする。
   EN: Final-review operational switch steps (demo/open_demo -> admin_only) and SQL runbook.

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
- 2026-04-04: Smart Scent SP cosmetic fix (overlay clipping).
  - JA: SP幅で `overlay-top` と `overlay-result` の余白/位置を再調整し、上部ピルの見切れと重なりを抑制。
  - EN: Tuned mobile spacing/position for `overlay-top` and `overlay-result` to prevent top pill clipping/overlap.
  - JA: 反映漏れ回避のため CSS クエリを `v=20260404b` へ更新。
  - EN: Bumped CSS cache version to `v=20260404b` to avoid stale-style rendering.
- 2026-04-04: Smart Scent SP spacing refinement (topbar-to-result gap).
  - JA: SP表示で `香りを体験する！デジタル調香` から `あなたの香り` までの間隔を縮小（`overlay-result` の開始位置を上方調整）。
  - EN: Reduced the mobile vertical gap between the Smart Scent topbar and `あなたの香り` by moving the result overlay upward.
  - JA: 併せて SP の topbar 余白/ギャップを詰め、見た目密度を最適化。
  - EN: Also tightened mobile topbar padding/gap for a denser and cleaner first-view layout.
- 2026-04-04: Smart Scent SP gap tuning follow-up.
  - JA: 要望に合わせて SP の `topbar` と `content` 間ギャップを `20px` に調整。
  - EN: Updated SP gap between `topbar` and `content` to `20px` per user request.
- 2026-04-04: Smart Scent gap fix correction (`.experience-page` -> `.app`).
  - JA: ギャップ指定先を修正。`topbar` と `content` の親は `.app` のため、`row-gap: 20px` を `.app` に適用。
  - EN: Corrected gap target: since `topbar`/`content` are children of `.app`, applied `row-gap: 20px` on `.app`.
- 2026-04-04: 2.4 hardening + closure.
  - JA: 保存候補の正規化/降順ソート/上限管理（20件）を追加し、DB失敗時のローカル保存メッセージを明確化。
  - EN: Added saved-candidate normalization/newest-first sorting/20-item cap and clarified local-fallback messaging on DB failure.
  - JA: 2.4C（複製/共有リンク）は Deferred のまま維持し、2.4本体をクローズ。
  - EN: Kept 2.4C (duplicate/share-link) Deferred and closed the main 2.4 scope.
- 2026-04-04: Section-kicker consistency sweep on `subpages/` (excluding admin pages).
  - JA: `subpages/` 配下の公開ページを横断点検し、`section-kicker` の日本語表記を英語トーンへ統一（Shop/Booking/Guide 系を含む）。
  - EN: Performed a cross-page sweep in `subpages/` and unified remaining Japanese `section-kicker` labels to English tone (including shop/booking/guide pages).
- 2026-04-04: Footer title tone reverted to English.
  - JA: 共通シェルのフッター見出しを `SHOP INFO / GUIDE / SUPPORT / ACCOUNT` に戻し、デザイン方針に合わせて英語トーンを維持。
  - EN: Reverted shared-footer titles to `SHOP INFO / GUIDE / SUPPORT / ACCOUNT` to keep the intended English visual tone.
- 2026-04-04: Final responsive sweep pass-1 (public subpages).
  - JA: 旧リダイレクトページ `search-store-info.html` / `shops.html` に viewport meta を追加し、SP表示時の拡大崩れリスクを解消。
  - EN: Added viewport meta to legacy redirect pages (`search-store-info.html` / `shops.html`) to prevent mobile scaling/layout issues.
  - JA: `workshop-booking` の詳細テーブルにSP横スクロール対応を追加し、狭幅でのはみ出しを抑制。
  - EN: Added mobile horizontal-scroll handling for `workshop-booking` detail tables to avoid overflow on narrow screens.
- 2026-04-04: Final responsive sweep pass-2 (mobile wrap/tap stability).
  - JA: Smart Scent の `top-actions` をSPで折返し可能化し、狭幅端末で `操作ガイド` と `Sound` ピルの重なり/詰まりを回避。
  - EN: Enabled wrapping for Smart Scent `top-actions` on mobile to avoid overlap/clipping between guide link and sound pill.
  - JA: Workshop の固定CTA文言と予約ボタン文言を折返し許可し、SPでのテキスト見切れを防止。
  - EN: Allowed wrapping for Workshop sticky CTA text and reserve-action button labels to prevent truncation on small screens.
- 2026-04-04: Cleanup close-out verification batch (items 4/5/6).
  - JA: TEST_PLAN の E2Eスモーク対象（Top→Workshop→Booking、Smart Scent保存/編集/読込）を実施ログ化。
  - EN: Logged TEST_PLAN E2E smoke closure for Top→Workshop→Booking and Smart Scent save/edit/load.
  - JA: `open_demo <-> admin_only` 切替 runbook（SQL 13/14 + config）を最終レビューし、想定挙動を再確認。
  - EN: Final-reviewed admin mode runbook (`open_demo <-> admin_only`) including SQL 13/14 and config switch expectations.
  - JA: handoverパックとして `docs/80_HANDOFF/RELEASE_HANDOVER_2026-04-04.md` を新規作成し、Deferredのみ残課題一覧を確定。
  - EN: Added `docs/80_HANDOFF/RELEASE_HANDOVER_2026-04-04.md` with final summary and deferred-only residual items.
- 2026-04-04: Cleanup Link Audit pass-1 (header/footer/cards).
  - JA: 公開HTMLの相対 `href` を点検し、実在しない favicon 参照（`logo-inim-dx.jpg`）を 7ページで `logo-inim-dx.png` へ修正。
  - EN: Audited relative `href` links across public HTML and fixed non-existent favicon targets (`logo-inim-dx.jpg`) to `logo-inim-dx.png` on 7 pages.
  - JA: query/hash/template 正規化込みの再監査で、相対リンク切れ 0 件を確認。
  - EN: Re-audit with query/hash/template normalization confirmed 0 broken relative links.
- 2026-04-04: Cleanup Copy/CTA consistency pass-1 (Japanese-first).
  - JA: フッター見出し（Shop Info/Guide/Support/Account）と news-strip `Latest` を日本語化（ショップ情報/ガイド/サポート/アカウント/最新情報）。
  - EN: Localized footer titles and news-strip label to Japanese-first wording.
  - JA: Smart Scent の主要表示ラベルを `Sound/Blend Score` から `サウンド/調香スコア` へ統一。
  - EN: Standardized Smart Scent labels from `Sound/Blend Score` to `サウンド/調香スコア`.
  - JA: `Workshop Plans` キッカー、`Sale` タイトル/キッカー、`Next Action`（カードmeta/alt）を日本語表記へ統一。
  - EN: Unified `Workshop Plans`, `Sale`, and `Next Action` card meta/alt labels into Japanese wording.
  - JA: 追補として、フッターの動的再描画経路に残っていた `Account` 表記と `Customer Account` 表記を `アカウント` へ統一。
  - EN: Follow-up fix: unified remaining runtime `Account`/`Customer Account` labels to `アカウント`.
  - JA: item系/brand系の汎用ラベル `Item Detail` / `Overview` を `アイテム詳細` / `概要` に統一。
  - EN: Unified generic item/brand labels `Item Detail` / `Overview` to `アイテム詳細` / `概要`.
- 2026-04-04: Copy preference follow-up (section-kicker + Sound revert).
  - JA: デザイン方針に合わせ、`section-kicker` は英語表記へ戻し（例: `Sale`, `Workshop Plans`, `Item Detail`, `Overview`）、Smart Scent の `Sound` 表記を復帰。
  - EN: Per design preference, restored `section-kicker` labels to English and reverted Smart Scent `Sound` wording.
- 2026-04-04: Section-kicker English expansion (index/workshop).
  - JA: `index.html` と `workshop.html` の `section-kicker` も英語トーンへ統一（Booking Shortcut / Experience Banner / Experience Flow / Pick Up / New Arrival / Workshop / Value / Scene / Flow / Next Step / Program / FAQ / Shops）。
  - EN: Expanded English section-kicker rule to `index.html` and `workshop.html` with consistent tone labels.
