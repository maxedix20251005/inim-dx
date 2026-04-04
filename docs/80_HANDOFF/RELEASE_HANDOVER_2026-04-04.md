# RELEASE / HANDOVER PACK (2026-04-04)

## 1. Scope / 対象範囲
- JA: 公開サイト（Top / Workshop / Booking / Smart Scent）と管理アクセス運用の最終クリーンアップ結果。
- EN: Final cleanup outcomes for public site flows (Top / Workshop / Booking / Smart Scent) and admin-access operations.

## 2. Final Status Summary / 最終ステータス要約
- JA: Top -> Workshop -> Booking フローは導線実装・レスポンシブ調整まで完了し、直近確認で動作OK。
- EN: Top -> Workshop -> Booking flow is complete including routing and responsive hardening, and is recently verified as OK.
- JA: Smart Scent は候補の保存/編集/読み込み（DB優先 + ローカルフォールバック）まで実装済み。
- EN: Smart Scent candidate save/edit/load is implemented (DB-first with local fallback).
- JA: 管理アクセスは `open_demo` / `admin_only` のモード切替とSQLロールバック手順を含め、運用手順を確認済み。
- EN: Admin access operations are verified for `open_demo` / `admin_only`, including SQL rollback/apply steps.

## 3. Admin Mode Runbook (Verified) / 管理モード運用手順（検証済み）

### 3.1 Current Mode / 現在設定
- `js/site-config.js`: `adminAccessMode: 'open_demo'`

### 3.2 open_demo for demo / デモ公開モード（open_demo）
1. `js/site-config.js` を `adminAccessMode: 'open_demo'` に設定
2. Supabase SQL Editor で `sql/13_admin_demo_read_policies.sql` を実行
3. ハードリロード後、未ログインでも admin ページ表示可（デモ閲覧）

EN:
1. Set `adminAccessMode: 'open_demo'` in `js/site-config.js`.
2. Run `sql/13_admin_demo_read_policies.sql` in Supabase SQL Editor.
3. Hard refresh; admin pages are viewable while logged off (demo visibility).

### 3.3 rollback to admin_only / 本番想定（admin_only）へ戻す
1. Supabase SQL Editor で `sql/14_revert_admin_demo_read_policies.sql` を実行
2. `js/site-config.js` を `adminAccessMode: 'admin_only'` に変更
3. ハードリロードして未ログイン時の保護動作（ログイン要求）を確認

EN:
1. Run `sql/14_revert_admin_demo_read_policies.sql`.
2. Change `adminAccessMode` to `'admin_only'` in `js/site-config.js`.
3. Hard refresh and verify logged-off users are protected (login required).

## 4. Deferred Items Only / 保留項目（Deferredのみ）
- `2.1 Content Update Enhancement` (`docs/20_PRODUCT/FEATURE_BACKLOG.md`)
- `2.4C Duplicate/Share Link for blends` (`docs/20_PRODUCT/FEATURE_BACKLOG.md`)
- `2.5 Workshop x Product Discount Logic` (`docs/20_PRODUCT/FEATURE_BACKLOG.md`)

JA: 上記以外の主要公開導線/表示調整はクローズ済み。
EN: Core public-flow and presentation cleanup items are closed except the deferred list above.

## 5. Operator Quick Checklist / 運用者向け最終チェック
1. Top -> Workshop -> Booking -> Entry -> Confirm -> Thanks を 1 回通しで確認
2. Smart Scent で 保存 -> 編集 -> 更新 -> 読み込み を確認
3. Admin mode を `open_demo` と `admin_only` の両方で確認

EN:
1. Run one end-to-end pass: Top -> Workshop -> Booking -> Entry -> Confirm -> Thanks.
2. Verify Smart Scent save -> edit -> update -> load.
3. Verify both admin modes (`open_demo` and `admin_only`).
