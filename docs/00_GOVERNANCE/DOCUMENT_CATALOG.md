# DOCUMENT CATALOG / ドキュメント目録

## Purpose / 目的
- JA: `docs/` 配下の文書を一覧化し、文書名・配置場所・目的を即座に把握できるようにする。
- EN: Provide a quick index of all documents in `docs/` with filename, location, and purpose.

## Catalog / 目録
| File | Path | Summary / 概要 | Purpose / 目的 |
|---|---|---|---|
| `DOCUMENTATION_GOVERNANCE_GUIDELINE.md` | `docs/00_GOVERNANCE/` | 文書運用ルール。 | ドキュメント運用統制。 |
| `DOCUMENT_CATALOG.md` | `docs/00_GOVERNANCE/` | 全文書の目録。 | 文書探索・参照性向上。 |
| `PROJECT_GOVERNANCE_AND_RULE_TEMPLATE.md` | `docs/00_GOVERNANCE/TEMPLATES/` | プロジェクト非依存の運用ルール雛形。 | 他プロジェクトへの再利用テンプレート。 |
| `PROJECT_GOVERNANCE_GUIDELINE_FORMAL_TEMPLATE.md` | `docs/00_GOVERNANCE/TEMPLATES/` | 正式版ガイドライン雛形。 | 初期導入時の正式文書作成。 |
| `DOCUMENT_CATALOG_TEMPLATE.md` | `docs/00_GOVERNANCE/TEMPLATES/` | 目録テンプレート。 | 文書目録の初期作成。 |
| `PROJECT_STATUS_TEMPLATE.md` | `docs/00_GOVERNANCE/TEMPLATES/` | ステータステンプレート。 | 状況管理の標準化。 |
| `WIP_TEMPLATE.md` | `docs/00_GOVERNANCE/TEMPLATES/` | 作業メモテンプレート。 | 再開手順と短期管理の標準化。 |
| `ISSUE_LIST_TEMPLATE.md` | `docs/00_GOVERNANCE/TEMPLATES/` | 課題台帳テンプレート。 | 不具合管理の標準化。 |
| `TEST_PLAN_TEMPLATE.md` | `docs/00_GOVERNANCE/TEMPLATES/` | テスト計画テンプレート。 | テスト計画作成の標準化。 |
| `TEMPLATE_USAGE_GUIDE.md` | `docs/00_GOVERNANCE/TEMPLATES/` | テンプレート適用手順。 | 他プロジェクト展開時の手順統一。 |
| `PROJECT_STATUS.md` | `docs/10_PROJECT/` | 全体ステータスと優先作業。 | 現状把握の正本。 |
| `WIP.md` | `docs/10_PROJECT/` | 直近作業メモ。 | 当日運用の再開性確保。 |
| `ISSUE_LIST.md` | `docs/10_PROJECT/` | 課題/不具合台帳。 | 問題管理と再発防止。 |
| `DESIGN_GUIDELINE.md` | `docs/20_PRODUCT/` | 画面設計・UI/UX基準。 | デザイン整合性維持。 |
| `FEATURE_BACKLOG.md` | `docs/20_PRODUCT/` | 機能追加候補一覧。 | 優先順位付けと計画化。 |
| `TECH_SPEC.md` | `docs/30_TECH/` | 技術仕様書。 | 実装判断基準の明確化。 |
| `SUPABASE_CUSTOMER_ACCOUNT.md` | `docs/30_TECH/` | 顧客アカウントのSupabase設計。 | 認証/会員系の設計参照。 |
| `SQL_MIGRATION_PLAN.md` | `docs/30_TECH/` | SQL移行計画。 | DB移行の実行・監査。 |
| `WORKSHOP_BOOKING_DATA_DESIGN.md` | `docs/40_DATA/` | 予約データモデル設計。 | 予約機能のデータ拡張基準。 |
| `WORKSHOP_BOOKING_SQL_RUNBOOK.md` | `docs/50_OPERATIONS/` | 予約関連SQL手順。 | 手順標準化と事故防止。 |
| `CHECKLIST_SUPABASE.md` | `docs/50_OPERATIONS/` | Supabase設定チェックリスト。 | 環境設定漏れ防止。 |
| `TEST_PLAN.md` | `docs/60_TEST/` | テスト方針・範囲・完了条件。 | テスト計画の正本。 |
| `ACCOUNT_TEST_RESULT.md` | `docs/60_TEST/` | アカウント機能UAT結果。 | アカウント検証結果の記録と再利用。 |
| `AI_BUILD_PROMPT.md` | `docs/80_HANDOFF/` | AI再開用ビルドプロンプト。 | 別スレッドでの即時再開。 |
| `AI_CONTEXT_PROMPT.md` | `docs/80_HANDOFF/` | AIコンテキスト復元用。 | 前提同期の高速化。 |
| `NEXT_CHAT_HANDOFF.md` | `docs/80_HANDOFF/` | 次チャット引継ぎ。 | 再開ロス防止。 |
| `ACCOUNT_AUTH_SYSTEM_NOTES.md` | `docs/80_HANDOFF/` | 認証系詳細メモ。 | 認証改修時の参照。 |
| `ADMIN_IMPLEMENTATION_STATUS.md` | `docs/80_HANDOFF/` | 管理画面実装状況。 | 管理画面領域の進捗把握。 |
| `CROSS_PROJECT_HANDOVER_ADMIN_IMPLEMENTATION.md` | `docs/80_HANDOFF/` | クロスPJ引継ぎ。 | 別リポジトリ連携。 |
| `WIP_TEST_WORKSHOP.md` | `docs/90_WIP/` | ワークショップ試験メモ。 | 試験中ドラフト記録。 |
| `WIP_TESTING_WS_1.html` | `docs/90_WIP/` | ワークショップ試験HTML。 | UI試作の一時保管。 |

## Folder Policy / フォルダ方針
- `00_GOVERNANCE`: 文書運用ルールと目録。
- `10_PROJECT`: 状況・課題・作業管理。
- `20_PRODUCT`: 画面設計と機能企画。
- `30_TECH`: 技術仕様・実装方針。
- `40_DATA`: データ設計。
- `50_OPERATIONS`: 実行手順・チェックリスト。
- `60_TEST`: テスト計画・テストケース・検証結果。
- `80_HANDOFF`: AI/人の引継ぎ文書。
- `90_WIP`: 草案・検証中ドキュメント。

## Maintenance Rule / 更新ルール
- JA: ドキュメントの追加・名称変更・削除時は本目録を同タスク内で更新する。
- EN: Update this catalog in the same task whenever documents are added, renamed, or removed.
- JA: 参照パス変更時は関連文書内リンクも同時更新する。
- EN: When document paths change, update all cross-references at the same time.







