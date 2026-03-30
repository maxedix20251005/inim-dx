# FEATURE BACKLOG / 機能追加バックログ

## 1. Purpose / 目的
- JA: 今後の機能追加アイデアを、実装判断可能な粒度で管理する。
- EN: Manage upcoming feature ideas at an implementation-ready decision level.
- JA: `PROJECT_STATUS.md` は現状と優先順、`TECH_SPEC.md` は技術仕様、本書は機能候補の評価・優先管理を担う。
- EN: `PROJECT_STATUS.md` tracks current priorities, `TECH_SPEC.md` defines technical rules, and this document manages candidate features and prioritisation.

## 2. Prioritised Ideas / 優先アイデア

### 2.1 Content Update Enhancement / コンテンツ更新新機能の充実
- Status: `Proposed`
- JA: 管理画面のコンテンツ更新機能（記事・カード・導線・素材）の運用性を高める。
- EN: Improve admin operability for content updates (articles, cards, journey, assets).
- Scope candidates:
  - JA: 一括更新、下書き/公開切替、変更履歴、更新差分プレビュー
  - EN: Bulk update, draft/publish switch, change history, diff preview

### 2.2 Top -> Workshop Flow Reinforcement / トップからワークショップ導線強化
- Status: `Closed`
- JA: CTA配置・比較導線・予約完了導線を改善し、到達率とCVRを高める。
- EN: Improve CTA placement, comparison flow, and booking completion path to raise reach rate and CVR.
- KPI link:
  - JA/EN: Reach rate (Top -> Workshop), CVR (Workshop -> Booking)
- Completed checks:
- 2.2 UAT closure / 2.2 UATクローズ
  - JA: ユーザー確認により完了（2026-03-30）
  - EN: Completed by user confirmation (2026-03-30)
  - JA: トップ〜ワークショップ間のCTA配置が最新構成で意図通りか確認
  - EN: Confirmed CTA placement from top to workshop matches the latest layout intent
  - JA: プラン比較→予約導線が迷いなく辿れるか再確認
  - EN: Re-verified plan comparison → booking path clarity
  - JA: 予約完了後の次アクション（thanks/導線）が明確か確認
  - EN: Confirmed post-booking thank-you and next-action guidance are clear

### 2.3 Digital Blend AI Recommendation / デジタル調香AIレコメンド
- Status: `Proposed`
- JA: 「気分」「悩み」「変えたいこと」入力からAIが香り候補を提案する機能を検討・追加する。
- EN: Add AI-based fragrance recommendation from user mood/problem-to-change inputs.
- Scope candidates:
  - JA: テキスト入力、推奨ノート表示、理由説明、候補保存
  - EN: Text input, recommended notes, rationale, candidate save

### 2.4 Blend Save and Reuse / 調香データ保存・再利用
- Status: `Proposed`
- JA: 調香データを DB に保存し、再編集・再利用できる機能を追加する。
- EN: Save blended scent data to DB for reuse and re-editing.
- Scope candidates:
  - JA: マイ調香一覧、再読み込み、複製、共有リンク（任意）
  - EN: My blends list, reload, duplicate, optional share link

### 2.5 Workshop x Product Discount Logic / ワークショップ×製品購入の相互特典
- Status: `Proposed`
- JA: 参加で製品割引、購入でワークショップ割引の相互特典を検討する。
- EN: Evaluate reciprocal discount logic between workshop participation and product purchase.
- Scope candidates:
  - JA: クーポン発行条件、適用期限、併用可否、不正防止ルール
  - EN: Coupon issuance criteria, validity, stackability, anti-abuse rules

### 2.6 Admin Access Restriction + Booking LED Governance / 管理者アクセス制御と予約LED運用
- Status: `Accepted`
- JA: 予約管理画面は `role_code = admin` のみに制限し、公開予約画面の Supabase 接続LED を運用監視項目として明文化する。
- EN: Restrict booking-management screen visibility to users with `role_code = admin`, and formalise booking-page Supabase LED as an operational monitoring item.
- Scope candidates:
  - JA: admin判定の強制、非admin時のアクセス拒否、LED状態の監視手順
  - EN: enforced admin-role check, deny access for non-admin users, LED state monitoring runbook

### 2.7 Dashboard Link Exposure / ダッシュボード導線の明示
- Status: `Accepted`
- JA: 公開/関連ページから管理ダッシュボードへの導線を明示する。
- EN: Expose clear navigation links to admin dashboard from relevant pages.

### 2.8 Workshop Plan Page Formalisation / ワークショッププラン専用ページ整備
- Status: `Accepted`
- JA: 「プランを見る」の遷移先として専用ページを設ける。
- EN: Provide a dedicated plan page for “View Plans”.

### 2.9 Non-admin Access Verification Backlog / 非adminアクセス検証バックログ
- Status: `Proposed`
- JA: 非adminロールでの検証環境が未整備のため、アクセス拒否シナリオを後続テストとして管理する。
- EN: Non-admin login verification is blocked by environment constraints; keep deny-access scenario as backlog test item.

### 2.10 Workshop Plan/Course Management IA Optimisation / ワークショッププラン管理導線の情報設計最適化
- Status: `Closed`
- JA: 管理画面のプラン/コース管理導線が分かりにくいため、IAを再設計する。
- EN: Redesign admin IA to make plan/course management entry points clear.
- JA: 実装反映済み（管理サイドナビ常設、公開予約サマリー動的化、導線配置統一）。
- EN: Completed in implementation (admin side-nav entries, dynamic public booking summary, unified routing placement).
- Scope candidates:
  - JA: 管理画面グローバルナビ再編（Workshop管理セクションの明示）
  - EN: Restructure admin global navigation with explicit workshop-management section
  - JA: workshop-booking.html の予約概要を DB 連動で動的表示へ置換
  - EN: Replace static booking summary labels with DB-driven values
  - JA: プラン管理導線の配置ルールを統一（ヘッダー/サイド/フッター）
  - EN: Define a consistent placement rule for plan-management links

### 2.11 Sitemap Page Creation + Footer Link Finalisation / サイトマップページ作成とフッター導線確定
- Status: `Closed`
- JA: `sitemap.html` を作成し、公開/管理導線を一覧化する。
- EN: Create `sitemap.html` to list public/admin navigation paths.

### 2.12 Breadcrumb Navigation / パンくずナビゲーション整備
- Status: `Closed`
- JA: 主要ページにパンくずを追加し、階層把握を容易にする。
- EN: Add breadcrumb navigation to major pages for hierarchy clarity.

- 2.11/2.12 closure / 2.11/2.12 クローズ
  - JA: ユーザー確認により完了（2026-03-30）
  - EN: Closed by user confirmation (2026-03-30).

### 2.13 Site Structure Review + IA Refinement / サイト構造レビューとIA再設計
- Status: `Accepted`
- JA: 公開/管理の導線を棚卸しし、階層/命名を再整理する。
- EN: Review public/admin structure and refine IA and naming.

### 2.14 Create All Placeholder Pages / 未実装ページ一括作成
- Status: `Closed`
- JA: 主要な公開ページを作成済み（support はフッター区分のみ）。
- EN: Placeholder pages completed (support is footer category only).

### Store/Shop Renaming Follow-up / Store/Shop表記の残作業
- Status: `Proposed`
- JA: 低リスク対応は完了。高リスク領域（識別子/URL）を別タスクで検討する。
- EN: Low-risk updates are complete. High-risk areas (identifiers/URLs) are deferred.
- Scope candidates:
  - JA: DBテーブル `stores` / APIパラメータ / JS変数名 / `data-page-key` 等の改名
  - EN: Rename technical identifiers (DB table `stores`, API params, JS variable names, `data-page-key`)
  - JA: `stores.html` 等の恒久URL変更（リダイレクト設計含む）
  - EN: Permanent file/URL changes (e.g., `stores.html`) with redirect strategy

## 3. Decision Points / 要決定事項
1. JA: 各候補の実装フェーズ（Phase1/2/3）
   EN: Implementation phase for each item (Phase1/2/3)
2. JA: KPIの優先順位（到達率/CVR/リピート率/客単価）
   EN: KPI priority (reach rate/CVR/repeat/AOV)
3. JA: AI推奨のデータ責務（ルールベース開始かLLM直結か）
   EN: Data responsibility for AI recommendation (rule-based start vs direct LLM)
4. JA: 特典ロジックの会計連携要否
   EN: Whether discount logic requires accounting/payment integration

## 4. Update Rule / 更新ルール
- JA: アイデアの状態変更（Proposed/In Progress/Accepted/Deferred/Rejected）は本書で管理する。
- EN: Track idea state transitions (Proposed/In Progress/Accepted/Deferred/Rejected) in this document.
- JA: 実装確定した項目は `PROJECT_STATUS.md` の優先作業へ昇格し、仕様確定は `TECH_SPEC.md` へ反映する。
- EN: Once approved for implementation, promote items to `PROJECT_STATUS.md` priorities and reflect final specs in `TECH_SPEC.md`.

## Recovery Note / 復旧メモ
- JA: 2026-03-30 に mojibake が発生したため、`docs/90_WIP/FEATURE_BACKLOG_mojibake_backup_20260330.md` にバックアップし、本文をUTF-8で再構築した。
- EN: Mojibake detected on 2026-03-30; backed up to `docs/90_WIP/FEATURE_BACKLOG_mojibake_backup_20260330.md` and rebuilt this file in UTF-8.
