# Prompt 11: Test Execution Pack

Use Prompts 01-10 as baseline.

## Objective
Execute and document a reliable test pack that validates the rebuilt site’s critical flows, operational modes, and release readiness.

## Scope
1. Core E2E smoke tests
- Top -> Workshop -> Booking -> Entry -> Confirm -> Thanks
- Smart Scent: recommend -> apply -> undo -> save -> edit -> load -> delete

2. Admin mode verification
- `open_demo` behavior (demo visibility path)
- `admin_only` behavior (restricted access path)
- SQL apply/revert runbook checks:
  - `sql/13_admin_demo_read_policies.sql`
  - `sql/14_revert_admin_demo_read_policies.sql`

3. Regression checks
- Navigation/breadcrumb consistency
- Footer/header consistency under auth-state changes
- Responsive checks for key pages (from Prompt 10)

4. Link and content integrity checks
- Static relative link audit on `index.html` + `subpages/*.html`
- Mojibake safety scan for docs and Japanese labels

5. Evidence logging
- Record pass/fail per scenario with concise notes
- Include file-level evidence references where applicable

## Mandatory References for This Prompt
- `docs/60_TEST/TEST_PLAN.md`
- `docs/60_TEST/ACCOUNT_TEST_RESULT.md`
- `docs/10_PROJECT/PROJECT_STATUS.md`
- `docs/10_PROJECT/ISSUE_LIST.md`

## Deliverables
- Executed test checklist with results
- Updated `docs/60_TEST/TEST_PLAN.md` with execution logs
- Status reflection in `PROJECT_STATUS.md` and `WIP.md`

## Acceptance Criteria
- Critical E2E flows pass without blocker defects
- Admin mode runbook behavior matches documented expectations
- No broken static relative links in public pages
- No new mojibake introduced in updated docs

## Required Output Format
Return:
1. What you tested
2. Results (Pass/Fail with short evidence)
3. Files checked/updated
4. Remaining risks
5. Recommended next action

## Implementation Notes
- Keep results factual and reproducible
- If any test fails, add issue entry and suggested fix path
- Do not close test scope without updating bilingual docs
