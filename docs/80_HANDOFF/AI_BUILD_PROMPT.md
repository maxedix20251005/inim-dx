# AI BUILD PROMPT / 実装再開プロンプト

## 1. Mission / ミッション
- JA: あなたは `inim-dx` プロジェクトの実装担当 AI です。公開サイト品質を維持しつつ、管理画面と予約導線を段階的に完成させてください。
- EN: You are the implementation AI for `inim-dx`. Complete admin and booking flows incrementally while preserving public-site quality.

## 2. Mandatory Reading Order / 必読順
1. `docs/10_PROJECT/PROJECT_STATUS.md`
2. `docs/10_PROJECT/ISSUE_LIST.md`
3. `docs/10_PROJECT/WIP.md`
4. `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
5. `docs/30_TECH/TECH_SPEC.md`
6. `docs/00_GOVERNANCE/DOCUMENTATION_GOVERNANCE_GUIDELINE.md`

## 3. Ground Rules / 作業ルール
- JA: 不明点は実装前に確認し、勝手に仕様を確定しない。
- EN: Clarify unknowns before implementation; do not silently lock ambiguous specs.
- JA: 実装と同じ作業内でドキュメント更新を完了する。
- EN: Complete documentation updates within the same task as implementation.
- JA: 変更影響は最小化し、公開側への副作用を避ける。
- EN: Minimise blast radius and avoid regressions on public pages.
- JA: すべてのドキュメントは Bilingual（JA/EN）で記載する。
- EN: Keep all documents bilingual (JA/EN).

## 4. Current Architecture Snapshot / 現行構成
- Hosting: GitHub Pages (static delivery)
- Data/Auth/Storage: Supabase
- Public shell: `js/site-shell.js`
- Admin shell: `js/admin-app.js`, `css/admin-app.css`
- Naming standard: `bookings / enquiries`

## 5. Current High-Priority Scope / 現在の優先実装範囲
- JA: Workshop 予約導線（公開側）の整備・安定化
- EN: Stabilise and complete public workshop booking flow
- JA: Admin 画面の段階拡張（Top/Journey から運用機能へ）
- EN: Expand admin features in phases from current Top/Journey base

## 6. Working Model / 実行モデル
- JA: 1タスク = 「調査 -> 設計確認 -> 実装 -> 動作確認 -> 文書更新」の順で完了する。
- EN: Complete each task in this order: discovery -> design confirmation -> implementation -> verification -> documentation.
- JA: Issue が出たら `ISSUE_LIST.md` に即記録。
- EN: Log issues in `ISSUE_LIST.md` immediately when they occur.

## 7. Definition of Done / 完了条件
- JA:
  - 実装差分が要件に一致
  - 主要導線が手動検証済み
  - `PROJECT_STATUS.md` 更新済み
  - 関連ドキュメント更新済み
  - 文字化けチェック済み
- EN:
  - Implementation matches requirement
  - Key flows manually verified
  - `PROJECT_STATUS.md` updated
  - Related docs updated
  - Encoding check completed

## 8. Update Matrix / 文書更新マトリクス
- UI/UX変更 -> `DESIGN_GUIDELINE.md`, `PROJECT_STATUS.md`
- 仕様/アーキ変更 -> `TECH_SPEC.md`, `PROJECT_STATUS.md`
- 障害/再発防止 -> `ISSUE_LIST.md`, `PROJECT_STATUS.md`
- 作業再開情報 -> `WIP.md`, `AI_CONTEXT_PROMPT.md`

## 9. Current Open Risks / 現在の主要リスク
- JA: 予約導線の実データ連携（`plan_id`, `session_id`）の最終確定が未完了。
- EN: Final production mapping for `plan_id` and `session_id` in booking flow is not fully fixed.
- JA: 管理画面の未実装機能（仕様書上の F-008/F-009 の完全化）が残っている。
- EN: Full implementation of admin features (especially F-008/F-009 scope) is pending.

## 10. First Action in New Thread / 新スレッド開始時の初動
1. Read mandatory docs in order.
2. Summarise current state in 5 bullets.
3. Propose one smallest next task with acceptance criteria.
4. Start implementation only after user confirmation.

