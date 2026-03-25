# PROJECT GOVERNANCE AND RULE TEMPLATE / プロジェクト運用ガバナンステンプレート

## 0. How To Use / 使い方
- EN: This is a reusable template for any project.
- JA: この文書は、どのプロジェクトにも流用できるテンプレートです。
- EN: Replace placeholders like `[PROJECT_NAME]`, `[OWNER]`, and `[DATE]`.
- JA: `[PROJECT_NAME]`、`[OWNER]`、`[DATE]` などのプレースホルダを置換してください。
- EN: Treat this as a starter. Each project must update and maintain its own copy.
- JA: ひな型として利用し、各プロジェクトで必ず更新・維持してください。

## 1. Purpose / 目的
- EN: Standardize workflow, management rules, and documentation quality.
- JA: 開発手順、管理ルール、ドキュメント品質を標準化します。
- EN: Keep work restartable by any contributor.
- JA: 誰でも再開できる状態を維持します。

## 2. Core Principles / 基本原則
- EN: Keep a clear Single Source of Truth per topic.
- JA: トピックごとに正本（Single Source of Truth）を明確化します。
- EN: Complete implementation and documentation updates in the same task.
- JA: 実装変更と文書更新を同一タスクで完了します。
- EN: Separate facts, decisions, and assumptions.
- JA: 事実・判断・仮説を分離して記録します。

## 3. Encoding And Language Quality / 文字コードと言語品質
- EN: Use UTF-8 for all markdown documents.
- JA: Markdown 文書は UTF-8 を使用します。
- EN: If documents include Japanese, verify there is no mojibake after every update.
- JA: 日本語を含む場合、更新ごとに文字化けがないことを確認します。
- EN: Check readability in editor view and Git diff.
- JA: エディタ表示と Git 差分の両方で可読性を確認します。

## 4. Standard Document Set / 標準ドキュメント
- EN/JA: `PROJECT_STATUS.md` - Current state and priorities / 現在地と優先事項
- EN/JA: `WIP.md` - Immediate next steps / 直近作業
- EN/JA: `ISSUE_LIST.md` - Issue history / 課題履歴
- EN/JA: `TECH_SPEC.md` - Technical source of truth / 技術仕様の正本
- EN/JA: `DESIGN_GUIDELINE.md` - UI/UX standards / デザイン基準
- EN/JA: `TEST_PLAN.md` - Test strategy / テスト方針
- EN/JA: `DOCUMENT_CATALOG.md` - Document index / 文書目録

## 5. Operating Rules / 運用ルール
1. EN: Confirm design and impact scope before implementation.
   JA: 実装前に設計と影響範囲を確認します。
2. EN: Validate changes and record results.
   JA: 変更後に検証し、結果を記録します。
3. EN: Update `PROJECT_STATUS.md` and at least one related document per implementation change.
   JA: 実装差分ごとに `PROJECT_STATUS.md` と関連文書を更新します。
4. EN: Update `ISSUE_LIST.md` on issue status changes.
   JA: Issue の状態変更時は `ISSUE_LIST.md` を更新します。
5. EN: Update `TEST_PLAN.md` when test scope or result changes.
   JA: テスト方針や結果が変わったら `TEST_PLAN.md` を更新します。

## 6. Change Control / 変更統制
- EN: High-risk changes (DB/auth/billing/public navigation) require prior approval.
- JA: 高リスク変更（DB/認証/課金/公開導線）は事前承認を必須とします。
- EN: Prepare rollback steps before high-impact changes.
- JA: 高影響変更はロールバック手順を先に定義します。

## 7. Roles (RACI Lite) / 役割
- EN/JA: Responsible - implementer updates code/docs / 実装担当がコードと文書を更新
- EN/JA: Accountable - project owner approves decisions / プロジェクト責任者が最終判断
- EN/JA: Consulted - domain expert validates business logic / ドメイン担当が妥当性確認
- EN/JA: Informed - stakeholders receive updates / 関係者へ共有

## 8. Template Maintenance / テンプレート維持
- EN: Keep this template project-agnostic.
- JA: このテンプレートはプロジェクト非依存で維持します。
- EN: Add project-specific values only in each project copy.
- JA: プロジェクト固有情報はコピー先で追記します。
