# TEST PLAN TEMPLATE / テスト計画テンプレート

## Purpose / 目的
- EN: Define test scope, approach, and exit criteria.
- JA: テスト範囲、方式、完了条件を定義します。

## Scope / 対象範囲
- `[TEST_SCOPE]`

## Entry Criteria / 開始条件
- `[ENTRY_CRITERIA]`

## Exit Criteria / 完了条件
- `[EXIT_CRITERIA]`

## Test Types / テスト種別
- Unit: `[Y/N]`
- Integration: `[Y/N]`
- E2E: `[Y/N]`
- Manual: `[Y/N]`

## Test Cases / テストケース
| ID | Feature | Preconditions | Steps | Expected | Result | Date | Owner |
|---|---|---|---|---|---|---|---|
| `TC-001` | `[FEATURE]` | `[PRE]` | `[STEPS]` | `[EXPECTED]` | `Pass/Fail` | `[YYYY-MM-DD]` | `[OWNER]` |

## Defect Linkage / 不具合連携
- EN: Link failed cases to `ISSUE_LIST.md`.
- JA: Fail ケースは `ISSUE_LIST.md` と連携します。

## Quality Note / 品質注意
- EN: Validate UTF-8 and no mojibake if Japanese text is present.
- JA: 日本語を含む場合は UTF-8 と文字化けを確認します。
