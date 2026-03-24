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
