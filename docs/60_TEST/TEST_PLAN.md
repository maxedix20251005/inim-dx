# TEST PLAN / テスト計画

## Purpose / 目的
- JA: 本プロジェクトのテスト方針・対象・完了条件を管理する。
- EN: Manage test strategy, scope, and completion criteria for this project.

## Scope / 対象範囲
- JA: 公開側ワークショップ予約導線（`workshop.html` と関連CTA）の遷移整合確認。
- EN: Validate public workshop booking flow consistency (`workshop.html` and related CTAs).

## Entry Criteria / 開始条件
- JA: 対象ページが最新デプロイ済みであること。
- EN: Target pages are deployed with latest updates.
- JA: ブラウザキャッシュをハードリロード済みであること。
- EN: Browser cache is hard-refreshed.

## Exit Criteria / 完了条件
- JA: 対象CTAがすべて `subpages/workshop-booking.html` へ遷移すること。
- EN: All target CTAs route to `subpages/workshop-booking.html`.
- JA: Console エラーが発生しないこと。
- EN: No console errors occur during the verification.

## Test Types / テスト種別
- JA: Manual（画面遷移確認）
- EN: Manual (navigation validation)

## Test Execution Log / テスト実行ログ
- Date: 2026-03-25
- Target Task: #1 予約導線整理
- Result:
  - `#1 予約導線`: OK
  - `workshop.html CTA`: OK
  - `ex-workshop.html CTA`: OK
  - `遷移先`: `subpages/workshop-booking.html`
  - `Console`: エラーなし
- Note:
  - JA: `ex-workshop.html` はバックアップ扱い。今後は通常変更対象から外す。
  - EN: `ex-workshop.html` is treated as backup and should be excluded from routine changes.

## Traceability / 追跡
- JA: Issue連携は `docs/10_PROJECT/ISSUE_LIST.md` を参照する。
- EN: Link issues to `docs/10_PROJECT/ISSUE_LIST.md`.

## Planned Verification / 予定確認
- Date: 2026-03-25
- Target Task: #2 予約入力必須項目と確認フロー確定
- Checks:
  - `contact_name`, `contact_email`, `contact_phone`, `party_size` の必須バリデーション
  - 入力不備時は「確認画面へ進む」が無効のままであること
  - 確認画面でURL改ざん等により必須値不足がある場合、送信不可になること
  - STEP 1 -> STEP 2 -> STEP 3 の遷移と戻り導線が維持されること
- Date: 2026-03-25
- Target Task: #3 予約完了（Thanks）導線
- Checks:
  - 確認画面で予約送信成功後、`subpages/workshop-booking-thanks.html` へ自動遷移すること
  - Thanks画面で `booking_id`, `status`, `label/date`, `gather`, `party_size` が表示されること
  - Console エラーが発生しないこと- Date: 2026-03-26
- Target Task: #3 予約完了（Thanks）導線 / 認証失敗ハンドリング
- Checks:
  - 未ログイン状態で送信した場合、`Auth session missing` 生文ではなくログイン誘導メッセージが表示されること
  - ログイン後に再送信すると Thanks 画面へ遷移すること
  - Console エラーが発生しないこと- Date: 2026-03-26
- Target Task: Workshop sessions 実データ表示
- Checks:
  - `workshop_sessions` が0件の場合は固定モック（4/5）を表示しないこと
  - 空状態メッセージが表示されること（date range / RLS / seed data確認）
  - `workshop_sessions` 登録後は該当日がカレンダーへ反映されること

