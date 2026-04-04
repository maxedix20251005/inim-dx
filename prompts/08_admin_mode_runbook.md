# Prompt 08: Admin Mode + Runbook Verification

Use Prompts 01-07 as baseline.

## Objective
Implement and verify operational admin access modes with clear, reversible runbook steps for demo and restricted operation.

## Scope
1. Access mode behavior
- Support config-driven mode in `js/site-config.js`:
  - `open_demo`
  - `admin_only`
- Normalize unknown values safely to `admin_only`

2. UI behavior by mode
- In `open_demo`:
  - Admin navigation entry is visible to all users
  - Admin pages can be opened for demo visibility (read policies permitting)
- In `admin_only`:
  - Admin pages require login and role-based access
  - Non-admin users are blocked/redirected appropriately

3. SQL runbook alignment
- Apply demo read policies script:
  - `sql/13_admin_demo_read_policies.sql`
- Revert demo read policies script:
  - `sql/14_revert_admin_demo_read_policies.sql`
- Keep procedure order explicit and reproducible

4. Expected behavior documentation
- Define expected behavior matrix:
  - logged-in admin
  - logged-in non-admin
  - logged-off user
  - open_demo vs admin_only

5. Verification checklist
- Verify mode badge/note visibility where configured (e.g., sitemap/admin copy)
- Verify no misleading writable actions in anonymous demo session where backend denies writes

## Mandatory References for This Prompt
- `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`
- `docs/50_OPERATIONS/CHECKLIST_SUPABASE.md`
- `docs/10_PROJECT/PROJECT_STATUS.md` (admin mode history/constraints)
- `docs/10_PROJECT/ISSUE_LIST.md` (admin-mode known pitfalls)
- `docs/60_TEST/TEST_PLAN.md` (open_demo/admin_only scenarios)

## Deliverables
- Stable mode-switch implementation
- Reversible SQL/config runbook with exact steps
- Verified expected behavior entries in test/docs

## Acceptance Criteria
- Mode can be switched by config without code edits elsewhere
- Unknown mode string does not break app behavior
- SQL apply/revert + config toggle yields expected access state
- Docs include bilingual runbook and behavior matrix

## Required Output Format
Return:
1. What you changed
2. Why
3. Files changed
4. How to test (mode-switch checklist)
5. Doc updates
6. Open risks

## Implementation Notes
- Demo mode must be explicitly documented as non-production security posture
- Keep secure default behavior aligned to `admin_only`
- Avoid hidden mode side effects outside documented scope
