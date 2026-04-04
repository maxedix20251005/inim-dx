# Prompt 14: Final Audit + Freeze

Use Prompts 01-13 as baseline.

## Objective
Run final pre-release audit and freeze preparation so the build can be safely published as a limited pre-release.

## Scope
1. Final technical audit
- Public route existence check (index + key subpages)
- Static relative link audit (`index.html` + `subpages/*.html`)
- Console-noise risk check (known warnings/errors)
- Config sanity check (`site-config.js` runtime toggles)

2. Documentation audit
- Ensure status/test/backlog/handover documents are synchronized
- Confirm deferred-only list is accurate
- Confirm bilingual updates are present and UTF-8 safe
- Verify against these source docs:
  - `docs/00_GOVERNANCE/DOCUMENT_CATALOG.md`
  - `docs/00_GOVERNANCE/DOCUMENTATION_GOVERNANCE_GUIDELINE.md`
  - `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
  - `docs/20_PRODUCT/FEATURE_BACKLOG.md`
  - `docs/30_TECH/TECH_SPEC.md`
  - `docs/50_OPERATIONS/CHECKLIST_SUPABASE.md`
  - `docs/60_TEST/TEST_PLAN.md`
  - `docs/80_HANDOFF/RELEASE_HANDOVER_*.md`

3. Operational audit
- Confirm admin mode rollback path is explicit and reproducible
- Confirm limited-release guidance exists (pre-release recommendation)

4. Freeze package prep
- Provide release freeze checklist
- Provide commit-grouping recommendation (if changes exist)
- Provide operator go/no-go checklist

## Deliverables
- Final audit result summary (Pass/Fail with evidence)
- Release-freeze checklist
- Go/No-go criteria and next action recommendation

## Acceptance Criteria
- No blocker issue in key public flows and link integrity
- Docs and handover artifacts are internally consistent
- Admin mode runbook is explicit and validated
- Release decision can be made without ambiguity

## Required Output Format
Return:
1. Audit items executed
2. Results (Pass/Fail + evidence)
3. Freeze checklist
4. Go/No-go decision recommendation
5. Follow-up actions (if any)

## Implementation Notes
- Do not introduce feature changes during final audit
- Keep report concise, factual, and operator-focused
- If any blocker appears, record issue + rollback suggestion immediately
