# DOCUMENT CATALOG / ドキュメント目録

## Purpose / 目的
- JA: `docs/` 配下の文書を一覧化し、文書名・概要・利用目的を即座に把握できるようにする。
- EN: Provide a quick reference index of all documents in `docs/`, including name, summary, and purpose.

## Catalog / 目録
| Document | Summary / 概要 | Purpose / 目的 |
|---|---|---|
| `AI_BUILD_PROMPT.md` | AI再開時の実行プロンプト。必読順・完了条件・更新マトリクスを定義。 | 新規スレッドでの即時再開と作業品質統一。 |
| `NEXT_CHAT_HANDOFF.md` | 次チャット向け引継ぎテンプレート。状態・優先事項・再開手順を整理。 | 端末/スレッド切替時の再開ロス防止。 |
| `ACCOUNT_AUTH_SYSTEM_NOTES.md` | アカウント/認証領域の詳細実装メモ（Supabase連携含む）。 | 認証関連の保守・改修時の技術参照。 |
| `CROSS_PROJECT_HANDOVER_ADMIN_IMPLEMENTATION.md` | 別リポジトリ向け管理画面実装引継ぎ文。 | クロスプロジェクト移行時の仕様・実装方針共有。 |
| `PROJECT_STATUS.md` | プロジェクト全体の現在地、優先タスク、確定方針を記録。 | 現状把握の正本。意思決定の起点。 |
| `WIP.md` | 直近作業の運用メモ（進行中・次アクション・再開手順）。 | 当日運用と短期タスク管理。 |
| `ISSUE_LIST.md` | 不具合/課題の履歴台帳。原因・対策・再発防止を記録。 | 問題管理とナレッジ蓄積。 |
| `AI_CONTEXT_PROMPT.md` | AI用コンテキスト復元ファイル。実装背景と注意点を統合。 | AI再開時の前提同期。 |
| `DESIGN_GUIDELINE.md` | UI/UX基準（配色・タイポ・レイアウト・コンポーネント）を定義。 | デザイン整合性の維持。 |
| `TECH_SPEC.md` | システム構成、機能/非機能要件、データモデル方針を定義。 | 技術仕様の正本。実装判断基準。 |
| `FEATURE_BACKLOG.md` | 今後の機能追加アイデアの優先管理（状態・検討論点を記録）。 | 機能候補の評価と優先順位付け。 |
| `DOCUMENTATION_GOVERNANCE_GUIDELINE.md` | 文書体系・更新タイミング・管理ルールを規定。 | ドキュメント運用統制。 |
| `ADMIN_IMPLEMENTATION_STATUS.md` | 管理画面実装の詳細進捗と方針を整理。 | 管理画面領域の履歴参照。 |
| `SUPABASE_CUSTOMER_ACCOUNT.md` | 顧客アカウント機能のSupabase設計案。 | 会員系機能のDB/認証設計参照。 |
| `SQL_MIGRATION_PLAN.md` | 旧テーブル名から新命名への移行手順・結果。 | DB移行作業の実行/監査参照。 |
| `WORKSHOP_BOOKING_DATA_DESIGN.md` | ワークショップ予約データ設計（追加テーブル案含む）。 | 予約機能拡張時の設計基準。 |
| `WORKSHOP_BOOKING_SQL_RUNBOOK.md` | 予約関連SQLの実行手順書。 | SQL適用と検証の標準手順。 |

## Maintenance Rule / 更新ルール
- JA: ドキュメントの追加・名称変更・削除時は本目録を同タスク内で更新する。
- EN: Update this catalog in the same task whenever documents are added, renamed, or removed.
- JA: 参照パス変更時は関連文書内リンクも同時更新する。
- EN: When document paths change, update all cross-references at the same time.
