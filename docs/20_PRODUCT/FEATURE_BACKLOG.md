# FEATURE BACKLOG / 機能追加バックログ

## 1. Purpose / 目的
- JA: 今後の機能追加アイデアを、実装判断可能な粒度で管理する。
- EN: Manage upcoming feature ideas at an implementation-ready decision level.
- JA: `PROJECT_STATUS.md` は現状と優先順、`TECH_SPEC.md` は技術仕様、`本書` は機能候補の評価・優先管理を担う。
- EN: `PROJECT_STATUS.md` tracks current priorities, `TECH_SPEC.md` defines technical rules, and this document manages candidate features and prioritisation.

## 2. Prioritised Ideas / 優先アイデア

### 2.1 Content Update Enhancement / コンテンツ更新新機能の充実
- Status: `Proposed`
- JA: 管理画面のコンテンツ更新機能（記事・カード・導線・素材）の運用性を高める。
- EN: Improve admin operability for content updates (articles, cards, journey, assets).
- Scope candidates:
  - JA: 一括更新、下書き/公開切替、変更履歴、更新差分プレビュー
  - EN: Bulk update, draft/publish switch, change history, diff preview

### 2.2 Top -> Workshop Flow Reinforcement / トップからワークショップ導線強化（着手中）
- Status: `In Progress`
- JA: 既存着手中。CTA配置・比較導線・予約完了導線を改善し、到達率を高める。
- EN: Already in progress. Improve CTA placement, comparison flow, and booking completion path to raise reach rate.
- KPI link:
  - JA/EN: Reach rate (Top -> Workshop), CVR (Workshop -> Booking)

### 2.3 Digital Blend AI Recommendation / デジタル調香AIレコメンド
- Status: `Proposed`
- JA: 「気分」「悩み」「変えたいこと」を入力すると、AIが香り候補を提案する機能を検討・追加する。
- EN: Add AI-based fragrance recommendation from user mood/problem-to-change inputs.
- Scope candidates:
  - JA: テキスト入力、推奨ノート表示、理由説明、候補保存
  - EN: Text input, recommended notes, rationale, candidate save

### 2.4 Blend Save and Reuse / 調香データ保存・再利用
- Status: `Proposed`
- JA: 調香した香りを DB に保存し、再編集・再利用できる機能を追加する。
- EN: Save blended scent data to DB for reuse and re-editing.
- Scope candidates:
  - JA: マイ調香一覧、再読み込み、複製、共有リンク（任意）
  - EN: My blends list, reload, duplicate, optional share link

### 2.5 Workshop x Product Discount Logic / ワークショップ×製品購入の相互特典
- Status: `Proposed`
- JA: ワークショップ参加で製品割引、または製品購入でワークショップ割引の相互特典を検討する。
- EN: Evaluate reciprocal discount logic between workshop participation and product purchase.
- Scope candidates:
  - JA: クーポン発行条件、適用期限、併用可否、不正防止ルール
  - EN: Coupon issuance criteria, validity, stackability, anti-abuse rules

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

### 2.6 Admin Access Restriction + Booking LED Governance / 管理者アクセス制御と予約LED運用
- Status: `Proposed`
- JA: 予約管理画面は `role_code = admin` ユーザーのみに表示制限し、公開予約画面の Supabase 接続LED を運用監視項目として明文化する。
- EN: Restrict booking-management screen visibility to users with `role_code = admin`, and formalise booking-page Supabase LED as an operational monitoring item.
- Scope candidates:
  - JA: admin判定の強制、非admin時のアクセス拒否、LED状態の監視手順
  - EN: enforced admin-role check, deny access for non-admin users, LED state monitoring runbook

### 2.7 Dashboard Link Exposure / ダッシュボード導線の明示
- Status: `Proposed`
- JA: 公開/関連ページから管理ダッシュボードへの導線を明示し、運用者が迷わず管理画面へ遷移できるようにする。
- EN: Expose clear navigation links to admin dashboard from relevant pages for operator usability.

### 2.8 Workshop Plan Page Formalisation / ワークショッププラン専用ページ整備
- Status: `In Progress`
- JA: 「プランを見る」の遷移先として専用ページを設け、プラン比較から予約導線へ接続する。
- EN: Provide a dedicated plan page for “View Plans”, bridging plan comparison to booking entry.

### 2.9 Non-admin Access Verification Backlog / 非adminアクセス検証バックログ
- Status: `Proposed`
- JA: 非adminロールでのログイン検証環境が未整備のため、アクセス拒否シナリオを後続テストとしてバックログ管理する。
- EN: Non-admin login verification is currently blocked by environment constraints; keep deny-access scenario as backlog test item.

### 2.10 Workshop Plan/Course Management IA Optimisation / ワークショッププラン管理導線の情報設計最適化
- Status: `In Progress`
- JA: 現状、ワークショップのプラン/コース管理画面への導線が見つけにくいため、管理者向けナビゲーション構造を再設計する。
- EN: Current navigation to workshop plan/course management is hard to find; redesign admin IA and entry points.
- Scope candidates:
  - JA: 管理画面のグローバルナビ再編（Dashboard配下の明示セクション化）
  - EN: Restructure admin global navigation with explicit workshop-management section
  - JA: workshop-booking.html の「開催期間/対象店舗/予約方式/料金目安」を DB連携で動的表示に置換（静的文言の解消）
  - EN: Replace static booking summary labels in workshop-booking.html with DB-driven dynamic values
  - JA: プラン管理画面への導線をヘッダー/サイド/フッターのどこに置くかを統一ルール化
  - EN: Define a consistent placement rule for plan-management links across header/side/footer


