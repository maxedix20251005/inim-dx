# DOCUMENTATION GOVERNANCE GUIDELINE / ドキュメント運用ガイドライン

## 1. Purpose / 目的
- JA: 本ガイドは、スクラッチ開発から運用フェーズまで、プロジェクト文書を体系的に管理するための共通ルールを定義する。
- EN: This guide defines common rules for structured documentation management from scratch development through operations.
- JA: 目的は「情報の分散・重複・陳腐化」を防ぎ、誰が再開しても同じ前提で作業できる状態を維持すること。
- EN: The objective is to prevent fragmentation, duplication, and staleness, and keep the project restartable by any contributor.

## 2. Core Principles / 基本原則
- JA: Single Source of Truth（正本の明確化）を徹底する。
- EN: Enforce single source of truth for each topic.
- JA: 変更は「実装」と「文書更新」を同一作業内で完了する。
- EN: Complete code changes and documentation updates within the same task.
- JA: 事実と推測を分離して記載する。
- EN: Separate facts from assumptions.
- JA: 全ドキュメントは Bilingual（日本語/English）で管理する。
- EN: All documents are managed bilingually (Japanese/English).

## 3. Document Set and Ownership / 文書セットと責務

### 3.1 Mandatory Documents / 必須ドキュメント
- `docs/10_PROJECT/PROJECT_STATUS.md`
  - JA: 現在地、優先タスク、確定方針、変更範囲の要約。
  - EN: Current state, priorities, confirmed policies, and change scope summary.
- `docs/10_PROJECT/ISSUE_LIST.md`
  - JA: 不具合・障害・詰まりの履歴台帳。
  - EN: Historical ledger of defects/incidents/blockers.
- `docs/10_PROJECT/WIP.md`
  - JA: 直近作業の実務メモ（次アクション、保留事項、再開手順）。
  - EN: Working memo for immediate tasks (next actions, on-hold items, restart steps).
- `docs/80_HANDOFF/AI_CONTEXT_PROMPT.md`
  - JA: 別スレッド/別端末での再開用コンテキスト。
  - EN: Context handoff for restart in another thread/device.
- `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
  - JA: UI/UX、配色、タイポ、レイアウト、コンポーネント基準。
  - EN: UI/UX, colour, typography, layout, and component standards.
- `docs/30_TECH/TECH_SPEC.md`
  - JA: システム構成、機能仕様、非機能要件、データモデル方針。
  - EN: System architecture, functional/non-functional requirements, and data model policy.
- `docs/80_HANDOFF/AI_BUILD_PROMPT.md`
  - JA: AI 実装再開用 One-off + 継続更新用プロンプト資産。
  - EN: One-off + continuously updated AI build prompt asset.

### 3.2 Optional Supporting Documents / 補助ドキュメント
- JA: テーマ別資料（例: `SUPABASE_CUSTOMER_ACCOUNT.md`, SQL runbook, data design）を追加可能。
- EN: Topic-specific documents (e.g., Supabase account plan, SQL runbooks, data design) may be added.
- JA: 補助資料は必ず「どの正本を補完するか」を明記する。
- EN: Supporting docs must explicitly state which primary document they supplement.

### 3.3 Folder Taxonomy / フォルダ体系
- `docs/00_GOVERNANCE`: ガバナンス、目録、運用ルール。
- `docs/10_PROJECT`: 進捗、課題、日次運用。
- `docs/20_PRODUCT`: 画面設計、機能企画。
- `docs/30_TECH`: 技術仕様、実装方針。
- `docs/40_DATA`: データモデル設計。
- `docs/50_OPERATIONS`: 運用手順、チェックリスト、Runbook。
- `docs/60_TEST`: テスト計画、テストケース、検証結果、受入記録。
- `docs/80_HANDOFF`: AI/人向け引継ぎ・再開文書。
- `docs/90_WIP`: 草案・検証途中の作業文書。
- JA: `docs/60_HANDOFF` は 2026-03-25 で廃止し、`docs/80_HANDOFF` へ統合した。
- EN: `docs/60_HANDOFF` was retired on 2026-03-25 and consolidated into `docs/80_HANDOFF`.

## 4. Update Timing / 更新タイミング

### 4.1 When Documentation Must Be Updated / 文書更新が必須となるタイミング
- JA: 仕様変更、UI変更、DB変更、導線変更、運用ルール変更が発生したとき。
- EN: Whenever specifications, UI, DB, flow, or operational rules change.
- JA: 不具合の発生・原因特定・対策完了の各タイミング。
- EN: At issue occurrence, root-cause identification, and fix completion.
- JA: リリース判断に関わる意思決定を行ったとき。
- EN: When release-impacting decisions are made.

### 4.2 Minimum Required Updates per Change / 変更時の最小更新セット
- JA: 実装差分がある場合、最低でも `PROJECT_STATUS.md` と関連文書1点以上を更新する。
- EN: For any implementation change, update at least `PROJECT_STATUS.md` and one related document.
- JA: 不具合対応時は `ISSUE_LIST.md` の更新を必須とする。
- EN: For issue fixes, updating `ISSUE_LIST.md` is mandatory.
- JA: テスト実施またはテスト方針変更時は、`docs/60_TEST/` 配下の関連文書を同タスク内で更新する。
- EN: When tests are executed or test policy changes, update related docs under `docs/60_TEST/` within the same task.

## 5. Issue Management Standard / Issue管理標準

### 5.1 Required Fields / 必須項目
- JA/EN: `発生日時(Date)`, `環境(Environment)`, `内容(Summary)`, `詳細(Detail)`, `Status`, `Solution`, `Closed Date`

### 5.2 Status Lifecycle / ステータス遷移
- JA/EN: `Open -> Investigating -> Fixing -> Monitoring -> Closed`
- JA: 再発時は同一 Issue を Reopen せず、新規 Issue を発番し相互参照する。
- EN: On recurrence, create a new issue and cross-reference; do not silently overwrite prior history.

## 6. Versioning and Traceability / 版管理と追跡性
- JA: 文書は Git で履歴管理し、削除より追記・更新を優先する。
- EN: Use Git history for traceability; prefer updates/additions over deletion.
- JA: 重要な方針変更は `PROJECT_STATUS.md` に日付付きで残す。
- EN: Record major policy changes in `PROJECT_STATUS.md` with explicit dates.
- JA: 技術仕様・設計方針変更は `TECH_SPEC.md` / `DESIGN_GUIDELINE.md` に反映する。
- EN: Reflect architecture/design changes in `TECH_SPEC.md` / `DESIGN_GUIDELINE.md`.

## 7. Writing Standard / 記述標準
- JA: 見出し構造を固定し、短文・箇条書きで可読性を優先する。
- EN: Use stable heading structure with concise bullet-first writing.
- JA: テーブル/一覧は比較・運用に必要な粒度まで。
- EN: Keep tables/lists at actionable comparison depth.
- JA: ファイルパス・画面名・テーブル名は実物と一致させる。
- EN: Use exact file paths, screen names, and table names.
- JA: 曖昧語（「たぶん」「適宜」）は避け、判断条件を明記する。
- EN: Avoid ambiguous wording; define decision conditions explicitly.

## 8. Review and Quality Gate / レビューと品質ゲート
- JA: 文書更新後は、以下を最低限確認する。
- EN: After updates, validate at least the following:
  - JA/EN: 文字化けがないこと（UTF-8）
  - JA/EN: リンク先パスが存在すること
  - JA/EN: 現行実装と整合していること
  - JA/EN: Bilingual 記載が欠けていないこと

## 9. RACI (Lightweight) / 役割分担（簡易）
- JA: `Responsible` 実装担当者: 変更に伴う文書更新を実行。
- EN: `Responsible` Implementer: performs required documentation updates.
- JA: `Accountable` プロジェクト管理者: 正本の整合性を最終承認。
- EN: `Accountable` Project lead: final owner of canonical consistency.
- JA: `Consulted` ドメイン担当: 要件・用語・運用妥当性を確認。
- EN: `Consulted` Domain owner: validates requirement/terminology/operations.
- JA: `Informed` 関係者: 変更通知を受ける。
- EN: `Informed` Stakeholders: receive change notifications.

## 10. Startup Checklist (From Scratch) / スクラッチ開始時チェックリスト
1. JA: `PROJECT_STATUS.md` に初期目的・対象範囲・除外範囲を定義する。
   EN: Define initial goals, scope, and out-of-scope in `PROJECT_STATUS.md`.
2. JA: `DESIGN_GUIDELINE.md` と `TECH_SPEC.md` を先に確定し、実装の判断軸を固定する。
   EN: Finalise `DESIGN_GUIDELINE.md` and `TECH_SPEC.md` first to lock decision criteria.
3. JA: `ISSUE_LIST.md` テンプレートを作成し、最初の運用ルールを記載する。
   EN: Prepare `ISSUE_LIST.md` template and initial operating rules.
4. JA: `WIP.md` に直近タスクと再開手順を定義する。
   EN: Define immediate tasks and restart steps in `WIP.md`.
5. JA: `AI_BUILD_PROMPT.md` に初期コンテキストを記載し、以降差分更新する。
   EN: Write initial context in `AI_BUILD_PROMPT.md` and keep it incrementally updated.

## 11. Change Control Rule / 変更統制ルール
- JA: 「文書未更新の実装完了」は完了とみなさない。
- EN: An implementation is not considered complete if required documentation is not updated.
- JA: 例外運用を行う場合は `PROJECT_STATUS.md` に理由・期限・解消条件を明記する。
- EN: If exceptions are needed, record reason, expiry, and exit criteria in `PROJECT_STATUS.md`.

## 12. Source and Alignment / 参照と整合
- JA: 本ガイドは本プロジェクトで整備済み資料を横断統合した運用規約である。
- EN: This guideline is a cross-integrated governance policy derived from the project’s existing documentation assets.







