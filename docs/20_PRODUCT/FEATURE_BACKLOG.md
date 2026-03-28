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
- Status: `Accepted`
- JA: 予約管理画面は `role_code = admin` ユーザーのみに表示制限し、公開予約画面の Supabase 接続LED を運用監視項目として明文化する。
- EN: Restrict booking-management screen visibility to users with `role_code = admin`, and formalise booking-page Supabase LED as an operational monitoring item.
- Scope candidates:
  - JA: admin判定の強制、非admin時のアクセス拒否、LED状態の監視手順
  - EN: enforced admin-role check, deny access for non-admin users, LED state monitoring runbook

### 2.7 Dashboard Link Exposure / ダッシュボード導線の明示
- Status: `Accepted`
- JA: 公開/関連ページから管理ダッシュボードへの導線を明示し、運用者が迷わず管理画面へ遷移できるようにする。
- EN: Expose clear navigation links to admin dashboard from relevant pages for operator usability.

### 2.8 Workshop Plan Page Formalisation / ワークショッププラン専用ページ整備
- Status: `Accepted`
- JA: 「プランを見る」の遷移先として専用ページを設け、プラン比較から予約導線へ接続する。
- EN: Provide a dedicated plan page for “View Plans”, bridging plan comparison to booking entry.

### 2.9 Non-admin Access Verification Backlog / 非adminアクセス検証バックログ
- Status: `Proposed`
- JA: 非adminロールでのログイン検証環境が未整備のため、アクセス拒否シナリオを後続テストとしてバックログ管理する。
- EN: Non-admin login verification is currently blocked by environment constraints; keep deny-access scenario as backlog test item.

### 2.10 Workshop Plan/Course Management IA Optimisation / ワークショッププラン管理導線の情報設計最適化
- Status: `Accepted`
- JA: 現状、ワークショップのプラン/コース管理画面への導線が見つけにくいため、管理者向けナビゲーション構造を再設計する。
- EN: Current navigation to workshop plan/course management is hard to find; redesign admin IA and entry points.
- Scope candidates:
  - JA: 管理画面のグローバルナビ再編（Dashboard配下の明示セクション化）
  - EN: Restructure admin global navigation with explicit workshop-management section
  - JA: workshop-booking.html の「開催期間/対象店舗/予約方式/料金目安」を DB連携で動的表示に置換（静的文言の解消）
  - EN: Replace static booking summary labels in workshop-booking.html with DB-driven dynamic values
  - JA: プラン管理画面への導線をヘッダー/サイド/フッターのどこに置くかを統一ルール化
  - EN: Define a consistent placement rule for plan-management links across header/side/footer



### 2.11 Sitemap Page Creation + Footer Link Finalisation / サイトマップページ作成とフッター導線確定
- Status: `Accepted`
- JA: フッターの「サイトマップ」リンクに対応する `sitemap.html` を新規作成し、全ページ導線を一覧化する。
- EN: Create a dedicated `sitemap.html` page for the footer sitemap link and list all site navigation paths.
- Scope candidates:
  - JA: 公開ページ/管理ページの導線一覧表示（管理画面は権限注記付き）
  - EN: List public and admin navigation paths (admin links with access notes)
  - JA: `04-sitemap` と実装差分の可視化
  - EN: Highlight differences between `04-sitemap` and implemented pages
  - JA: フッター「サイトマップ」リンクを `sitemap.html` に切り替え
  - EN: Switch footer “サイトマップ” link target to `sitemap.html`

### 2.12 Breadcrumb Navigation / パンくずナビゲーション整備
- Status: `Accepted`
- JA: 現在地と階層を可視化するパンくずを主要ページに追加し、目的ページの探索時間を短縮する。
- EN: Add breadcrumb navigation to major pages so users can quickly understand hierarchy and find target pages.
- Scope candidates:
  - JA: 公開ページ（カテゴリ/商品/ワークショップ/記事）への共通パンくず導入
  - EN: Shared breadcrumb for public pages (category/item/workshop/article)
  - JA: 管理画面ページ（Dashboard配下）のパンくず導入
  - EN: Breadcrumb for admin screens under dashboard hierarchy
  - JA: `site-shell.js` での共通レンダリング化
  - EN: Centralised rendering via `site-shell.js`



### 2.13 Site Structure Review + IA Refinement / サイト構造レビューとIA再設計
- Status: `Accepted`
- JA: 現行サイト構造（公開/管理）の導線を棚卸しし、情報設計とナビゲーション階層を再整理する。
- EN: Review current public/admin site structure and refine IA + navigation hierarchy.
- Scope candidates:
  - JA: sitemap と実装ページの差分整理、階層ルールの再定義、命名/ラベル整合
  - EN: Diff sitemap vs implementation, redefine hierarchy rules, align naming/labels

### 2.14 Create All Placeholder Pages / 未実装ページ一括作成
- Status: `In Progress`
- JA: 現在「準備中」の公開ページを、優先バックログ完了後に順次作成する。
- EN: Create currently not-ready public pages one by one after prioritized backlog items are completed.
- Scope candidates:
  - JA: `brand/items/search/article/sale/stores/guide/support/cart/contact` 系ページの段階実装
  - EN: Phased implementation of `brand/items/search/article/sale/stores/guide/support/cart/contact` page groups
  - JA: 各ページの最小構成（情報設計・文言・CTA）を先に揃え、その後データ連携を実装
  - EN: Deliver minimum viable page structures (IA/copy/CTA) first, then integrate data progressively
  - JA: 公開準備完了時に disabled リンクを有効化
  - EN: Re-enable currently disabled links as each page group becomes production-ready
