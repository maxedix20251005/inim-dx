# TECH SPEC / 技術仕様書

## 0. Document Scope / 本書の対象
- JA: 本書は `inim-dx` の実装・運用に必要な技術仕様を定義する。対象は公開サイト、管理画面、Supabase 連携、データモデル、非機能要件。
- EN: This document defines technical specifications for `inim-dx`, covering public site, admin app, Supabase integration, data model, and non-functional requirements.
- JA: 正本は `references/design/07-specification.html` と `references/design/08-db-design.html`。事業意図/KPI は `references/design/01-proposal.html` で補完。
- EN: Primary sources are `07-specification.html` and `08-db-design.html`, with business intent/KPI context from `01-proposal.html`.

## 1. Business and Product Goals / 事業・プロダクト目標
- JA: 短期は「流入増」より「到達率 × CVR 改善」を主指標として、予約数回復を狙う。
- EN: Short-term priority is booking recovery via improved reach rate and CVR rather than traffic expansion.
- JA: 公開導線の最適化（Top → Workshop → Booking）と、管理運用の効率化を同時に実現する。
- EN: Optimise public conversion flow (Top → Workshop → Booking) while streamlining operational management.

## 2. System Architecture / システムアーキテクチャ

### 2.1 Runtime Architecture / 実行構成
- JA: 公開サイトと管理画面は静的 HTML/CSS/JavaScript を GitHub Pages で配信。
- EN: Public and admin UIs are static HTML/CSS/JavaScript hosted on GitHub Pages.
- JA: 認証・DB・ストレージは Supabase（Auth / Postgres / Storage）を利用。
- EN: Authentication, DB, and storage are provided by Supabase (Auth / Postgres / Storage).
- JA: フロントエンドは Supabase JS クライアント経由で CRUD と認証処理を実行。
- EN: Frontend performs authentication and CRUD via Supabase JS client.
- JA: 将来、複雑ロジックや外部連携が増えた場合は Spring Boot (Java) / Edge Functions を API 層として追加可能。
- EN: Spring Boot (Java) or Edge Functions can be introduced later as an API layer for advanced logic/integrations.

### 2.2 Separation of Concerns / 責務分離
- JA: 表示層（GitHub Pages）とデータ層（Supabase）を明確に分離する。
- EN: Keep presentation layer (GitHub Pages) separate from data/auth layer (Supabase).
- JA: 公開用 UI と管理用 UI はアセット/コードを分離し、影響範囲を局所化する。
- EN: Public and admin assets/code are separated to localise change impact.

## 3. Application Scope / アプリケーション範囲

### 3.1 Public Site / 公開サイト
- JA: ブランド訴求、商品導線、ワークショップ導線、デジタル調香体験、予約導線を提供。
- EN: Provides brand/product discovery, workshop funnel, digital blending experience, and booking flow.

### 3.2 Admin App / 管理画面
- JA: ログイン、ダッシュボード、トップ編集、導線設定、公開管理、ユーザー設定を中核として運用。
- EN: Core admin screens include login, dashboard, top-content editing, journey settings, publish checks, and account settings.
- JA: 仕様書上の管理機能群（カード/商品/店舗/記事/ユーザー/予約問い合わせ/アセット）は段階実装前提。
- EN: Broader admin capabilities in the spec (cards/products/stores/articles/users/bookings-enquiries/assets) are phased.

## 4. Functional Requirements (Priority) / 機能要件（優先）

### 4.1 F-001 Authentication and Authorisation / 認証・権限管理
- JA: メール/パスワードログイン、セッション維持、パスワード再設定、権限別表示制御。
- EN: Email/password login, session persistence, password reset, role-based menu/view control.
- JA: 未認証状態で管理画面を利用不可とする。
- EN: Unauthenticated access to admin pages is blocked.

### 4.2 F-002 Top Hero/Slider Management / トップヒーロー管理
- JA: `title / lead_text / cta_label / cta_url / asset_id / display_order / is_active` を編集可能とする。
- EN: Allow editing of `title / lead_text / cta_label / cta_url / asset_id / display_order / is_active`.
- JA: 入力バリデーションと保存後プレビュー反映を必須とする。
- EN: Validation and post-save preview refresh are required.

### 4.3 F-003 Journey Management / 体験導線設定
- JA: ステップ番号、表示名、リンク、表示可否、並び順を管理する。
- EN: Manage step number, label, URL, visibility, and ordering.
- JA: URL形式不正・重複順序・未入力を行単位で検出する。
- EN: Validate invalid URL, duplicate order, and required fields at row level.

### 4.4 F-008 User Management / ユーザー管理
- JA: 検索/絞り込み、詳細確認、状態更新、権限確認を提供する。
- EN: Provide search/filter, detail view, status update, and role visibility.
- JA: 強権限変更は将来拡張に委譲可能とする。
- EN: Privileged role changes may be delegated to future extension paths.

### 4.5 F-009 Booking/Enquiry Management / 予約・問い合わせ管理
- JA: 一覧、詳細、ステータス更新、CSV出力を提供する。
- EN: Provide listing, detail, status updates, and CSV export.
- JA: 顧客・店舗への関連遷移を提供する。
- EN: Support related navigation to customer/store contexts.

## 5. Current Booking Flow (Public) / 現在の予約導線（公開）
- JA: 現行導線は `workshop.html -> workshop-booking.html -> workshop-booking-entry.html -> workshop-booking-confirm.html`。
- EN: Current funnel is `workshop.html -> workshop-booking.html -> workshop-booking-entry.html -> workshop-booking-confirm.html`.
- JA: 確認画面から `bookings` へ保存する。`customer_profile_id` と `store_id` を解決し insert する。
- EN: Confirm page inserts into `bookings`, resolving `customer_profile_id` and `store_id`.
- JA: 命名は rename 後の `bookings / enquiries` を標準とする。
- EN: Naming standard follows post-rename entities: `bookings / enquiries`.

## 6. Data Model / データモデル

### 6.1 Core Entities / 主要エンティティ
- JA/EN:
  - `auth.users` (Supabase-managed identities)
  - `user_profiles` (application profile / account metadata)
  - `roles`, `user_role_assignments` (RBAC)
  - `content_assets` (media metadata)
  - `top_hero_items`, `journey_steps` (public content)
  - `stores` (store master)
  - `bookings`, `booking_status_logs`
  - `enquiries`, `enquiry_status_logs`

### 6.2 Relationship Summary / リレーション概要
- JA: `auth.users` と `user_profiles` は 1:1。
- EN: `auth.users` to `user_profiles` is 1:1.
- JA: `roles` と `user_profiles` は `user_role_assignments` を介した多対多。
- EN: `roles` and `user_profiles` are many-to-many via `user_role_assignments`.
- JA: `content_assets` は `top_hero_items` 等から参照される。
- EN: `content_assets` is referenced from content tables such as `top_hero_items`.
- JA: `stores` は `bookings` に 1:N で接続。
- EN: `stores` has a 1:N relation to `bookings`.
- JA: `bookings` / `enquiries` はそれぞれ履歴ログテーブルを持つ。
- EN: `bookings` and `enquiries` each have status log tables.

### 6.3 Index and Constraints Policy / インデックス・制約方針
- JA: 検索キー、状態+時系列、外部キーに対するインデックスを標準適用する。
- EN: Apply indexes by default to search keys, status+time axes, and foreign keys.
- JA: 主な unique 例: `user_profiles.auth_user_id`、`roles.role_code`、表示順制約等。
- EN: Typical unique constraints include `user_profiles.auth_user_id`, `roles.role_code`, and display-order constraints.

## 7. Security Requirements / セキュリティ要件
- JA: 管理画面は Supabase Auth 認証必須。
- EN: Admin access requires Supabase Auth.
- JA: RLS でロール別の参照/更新範囲を制御する。
- EN: Enforce role-scoped read/write via RLS.
- JA: 鍵情報は公開リポジトリに直書きしない。HTTPS 通信を前提とする。
- EN: Do not hardcode secrets in public repos; enforce HTTPS-only transport.
- JA: 監査対象操作（ログイン、保存、状態更新、利用停止）を記録する。
- EN: Log auditable operations (login, save, status changes, account suspension).
- JA: 将来の MFA 導入を阻害しない設計とする。
- EN: Keep architecture compatible with future MFA enablement.

## 8. Non-Functional Requirements / 非機能要件

### 8.1 Performance / 性能
- JA: 主要管理画面の初期表示は通常時 3 秒以内を目標。
- EN: Target initial load within 3 seconds for key admin pages under normal conditions.

### 8.2 Reliability and Error Handling / 信頼性・障害対応
- JA: 認証失敗、保存失敗、取得失敗を分類し、再試行導線を提示する。
- EN: Classify auth/save/fetch failures and provide clear retry guidance.
- JA: 無料枠制約発生時の運用代替（CSV確認等）を用意する。
- EN: Define operational fallback for free-tier constraints (e.g., CSV-based checks).

### 8.3 Data Protection and Recovery / データ保全・復旧
- JA: DB/Storage は Supabase 機能を前提に保全し、誤更新時の復旧手順を文書化する。
- EN: Use Supabase safeguards for DB/storage and document recovery procedures for accidental changes.
- JA: 予約/問い合わせなど重要データは定期エクスポート可能とする。
- EN: Ensure periodic export capability for critical data (bookings/enquiries).

### 8.4 Compatibility / 対応環境
- JA: 公開サイトは PC/Tablet/Mobile、管理画面は PC/Tablet 主対象。
- EN: Public site targets PC/tablet/mobile; admin targets PC/tablet primarily.

## 9. Implementation Strategy / 実装戦略
- JA: Phase1 は導線と価値伝達の Quick Win を優先し、指標で検証する。
- EN: Phase1 prioritises quick wins in flow and value communication, validated by metrics.
- JA: 指標は `到達率 / CVR / 予約数` を中核に段階拡張する。
- EN: Scale iteratively using `reach rate / CVR / booking volume` as core metrics.
- JA: 現実装は静的配信 + Supabase 中心で進め、必要時に API 層を後付けする。
- EN: Continue with static delivery + Supabase-first implementation, adding API layer only when necessary.

## 10. Source Documents / 参照ドキュメント
- `references/design/07-specification.html`
- `references/design/08-db-design.html`
- `references/design/01-proposal.html`

## 11. Planned Enhancements / 追加検討機能
- JA: 次の機能は技術検討対象としてバックログ管理し、要件確定後に本書へ仕様として昇格します。
- EN: The following features are tracked as technical candidates and will be promoted into formal specs after requirement confirmation.
- docs/FEATURE_BACKLOG.md を参照:
  - Content update enhancement
  - Top -> Workshop flow reinforcement
  - Digital blend AI recommendation
  - Blend save and reuse
  - Workshop-product reciprocal discount logic

