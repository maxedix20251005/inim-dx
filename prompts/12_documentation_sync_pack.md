# Prompt 12: Documentation Sync Pack

Use Prompts 01-11 as baseline.

## Objective
Synchronize all project documents after each implementation/test block so status, decisions, and runbooks remain accurate and bilingual.

## Scope
1. Mandatory document synchronization
- `docs/10_PROJECT/WIP.md`
- `docs/10_PROJECT/PROJECT_STATUS.md`
- `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- `docs/60_TEST/TEST_PLAN.md`
- `docs/10_PROJECT/ISSUE_LIST.md` (when defects/risks are identified)

2. Update quality rules
- Every update must include JA/EN
- Keep entries date-stamped and traceable
- Distinguish clearly between:
  - implemented
  - verified
  - deferred
  - proposed

3. Consistency checks
- Ensure backlog status and project status do not conflict
- Ensure test results referenced in status docs exist in TEST_PLAN
- Ensure deferred-only items are explicitly listed for handover
- Ensure updates align with governance/product source docs:
  - `docs/00_GOVERNANCE/DOCUMENT_CATALOG.md`
  - `docs/00_GOVERNANCE/DOCUMENTATION_GOVERNANCE_GUIDELINE.md`
  - `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- Ensure technical/operational consistency with:
  - `docs/30_TECH/TECH_SPEC.md`
  - `docs/30_TECH/SQL_MIGRATION_PLAN.md`
  - `docs/30_TECH/SUPABASE_CUSTOMER_ACCOUNT.md`
  - `docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md`
  - `docs/50_OPERATIONS/CHECKLIST_SUPABASE.md`
  - `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`
  - `docs/80_HANDOFF/NEXT_CHAT_HANDOFF.md`
  - `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md`

4. Encoding safety
- Save docs in UTF-8
- Run mojibake scan and correct issues before closure
- Exclude template/backup artifacts from source-of-truth sync decisions:
  - `docs/00_GOVERNANCE/TEMPLATES/*`
  - `docs/90_WIP/*`

5. Change-log discipline
- Add concise “what changed / why / evidence” notes
- Avoid ambiguous summaries without file-level traceability

## Deliverables
- Updated bilingual docs synchronized with latest code/test state
- Status/backlog/test alignment confirmed
- No new mojibake introduced

## Acceptance Criteria
- Core docs are mutually consistent
- Deferred items are explicit and current
- Test execution and status updates are linked
- Mojibake scan produces no new content corruption

## Required Output Format
Return:
1. Docs updated
2. Key entries added/changed
3. Consistency checks performed
4. Encoding/mojibake check result
5. Remaining doc risks

## Implementation Notes
- Treat docs as release artifacts, not optional notes
- If uncertainty exists, record as open assumption in WIP/PROJECT_STATUS
- Keep bilingual wording clear and concise (English first where requested)
