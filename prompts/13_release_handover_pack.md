# Prompt 13: Release + Handover Pack

Use Prompts 01-12 as baseline.

## Objective
Prepare a release-ready handover package that enables limited rollout, safe rollback, and clear continuation for next phases.

## Scope
1. Release summary package
- Create/update handover summary document with:
  - implemented scope
  - verified scope
  - deferred-only items
  - known operational caveats

2. Release notes draft
- Provide GitHub-ready release note text
- Keep bilingual format (English first, Japanese follows)
- Mention limited audience release context

3. Admin operation runbook inclusion
- Include explicit mode handling:
  - `open_demo`
  - `admin_only`
- Include SQL apply/revert steps and expected behavior outcomes

4. Deferred-only list
- Confirm deferred items from backlog are the only open carry-over
- Ensure no closed/in-progress item is accidentally listed as deferred

5. Final artifact map
- Provide concise list of key documents for operators:
  - WIP
  - Project Status
  - Test Plan
  - Feature Backlog
  - Release/Handover docs

## Mandatory References for This Prompt
- `docs/80_HANDOFF/NEXT_CHAT_HANDOFF.md`
- `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md`
- `docs/80_HANDOFF/ACCOUNT_AUTH_SYSTEM_NOTES.md`
- `docs/10_PROJECT/PROJECT_STATUS.md`
- `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- `docs/60_TEST/TEST_PLAN.md`

## Deliverables
- `RELEASE_HANDOVER_YYYY-MM-DD.md` style summary
- `RELEASE_NOTE_DRAFT_YYYY-MM-DD.md` bilingual release note
- Deferred-only carry-over list validated

## Acceptance Criteria
- Handover doc and release note are publication-ready
- Rollback/runbook instructions are explicit and reproducible
- Deferred list is accurate and minimal
- Docs are bilingual and UTF-8 safe

## Required Output Format
Return:
1. Artifacts created/updated
2. Final summary points
3. Deferred-only list
4. Rollback/runbook checklist
5. Publishing notes (pre-release recommendation)

## Implementation Notes
- Optimize for operational clarity over narrative verbosity
- Keep wording precise for release managers
- If any ambiguity remains, flag as explicit “Operator confirmation required”
