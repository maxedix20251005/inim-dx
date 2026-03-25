# ACCOUNT TEST RESULT / アカウント機能テスト結果

## 1. Metadata / メタ情報
- EN: Last Updated: 2026-03-14
- JA: 最終更新日: 2026-03-14
- EN: Scope: Customer account features (UAT)
- JA: 対象範囲: 顧客向けアカウント機能（UAT）
- EN: Environment: GitHub Pages + Supabase
- JA: 環境: GitHub Pages + Supabase

## 2. Purpose / 目的
- EN: Record test results for account login/profile/preferences/password/reset/deactivation flows.
- JA: ログイン、プロフィール、好み設定、パスワード変更・再設定、退会（無効化）フローの検証結果を記録する。

## 3. Preconditions / 事前条件
- EN: Latest GitHub Pages deployment is reflected.
- JA: GitHub Pages の最新デプロイが反映済み。
- EN: Supabase `Site URL` and `Redirect URLs` are configured.
- JA: Supabase の `Site URL` / `Redirect URLs` が設定済み。
- EN: Required schema SQL is applied.
- JA: 必要なスキーマ SQL が適用済み。
- EN: Browser cache is hard reloaded before test.
- JA: テスト前にブラウザをハードリロード済み。

## 4. Test Summary / テストサマリー
### 4.1 Normal Flow / 通常系
- EN: Login flow works and account modal opens correctly.
- JA: ログイン導線は正常、アカウントモーダル表示も正常。
- EN: Profile display/update is reflected in UI and Supabase `profiles`.
- JA: プロフィール表示・更新は UI と Supabase `profiles` に反映。
- EN: Preferences save updates summary and fallback display works.
- JA: 好み設定の保存でサマリー更新、fallback 表示も正常。
- EN: Password change succeeds and next login accepts new password.
- JA: パスワード変更後、次回ログインで新パスワードが有効。
- EN: Deactivation flow sets `deleted_at` and `status=inactive`, then blocks login.
- JA: 退会（無効化）で `deleted_at` と `status=inactive` が設定され、以後ログイン不可。

### 4.2 Recovery Flow for Rate Limit / レート制限時の回復系
- EN: `email rate limit exceeded` can occur on repeated auth emails.
- JA: 認証メール連続送信で `email rate limit exceeded` が発生し得る。
- EN: Recovery checks confirmed mail sending, redirect link validity, and `profiles` auto creation.
- JA: 回復確認としてメール送信、redirect リンク、`profiles` 自動作成を確認。
- EN: Password reset email flow works with correct `redirect_to`.
- JA: パスワード再設定メールは `redirect_to` 正常時に動作。

## 5. Evidence Checklist / 証跡チェック
- EN: Execution date/time
- JA: 実行日時
- EN: Tested URL
- JA: テスト対象 URL
- EN: Test user
- JA: テストユーザー
- EN: Expected vs Actual
- JA: 期待値 / 実績値
- EN: Error message (if any)
- JA: エラーメッセージ（発生時）
- EN: Supabase verification result
- JA: Supabase 側確認結果

## 6. Findings / 所見
- EN: `email rate limit exceeded` is mainly a Supabase Auth behavior under repeated requests.
- JA: `email rate limit exceeded` は、反復要求時の Supabase Auth 側挙動が主因。
- EN: Post-deploy validation of JS and redirect settings is important on GitHub Pages.
- JA: GitHub Pages ではデプロイ直後の JS / redirect 設定確認が重要。
- EN: Consistency between `profiles.email` and `auth.users.email` remains a watch point.
- JA: `profiles.email` と `auth.users.email` の整合は継続監視ポイント。

## 7. Open Items / 未完了項目
- EN: Add strict validation rules for preferences modal.
- JA: preferences モーダルの厳密バリデーション追加。
- EN: Define expected behavior for re-login after deactivation.
- JA: 退会後再ログイン挙動の期待仕様確定。
- EN: Clarify UI policy for users with `deleted_at`.
- JA: `deleted_at` ユーザーの UI 表示方針確定。
- EN: Define handling policy when `auth.users.email` changes.
- JA: `auth.users.email` 変更時の運用方針確定。
- EN: Add monitoring for confirmation-email deliverability.
- JA: 確認メール到達性の監視追加。

## 8. Governance Note / ガバナンス注記
- EN: This document was reformatted to governance-compliant structure (Bilingual, UTF-8, structured sections).
- JA: 本文書は新ガバナンス準拠（Bilingual、UTF-8、構造化見出し）で再整形済み。
