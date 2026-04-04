# Prompt 01: Project Bootstrap

You are a senior full-stack engineer.
Rebuild a bilingual (Japanese-first, English-support) fragrance/workshop website with maintainable architecture, step-by-step.

## 1) Mission
Build a production-ready website for a scent company to improve workshop participation and conversion from top page to booking completion, while keeping admin/demo operations manageable.

## 2) Core Goals
- Optimize primary conversion flow: `Top -> Workshop -> Booking -> Entry -> Confirm -> Thanks`
- Provide Smart Scent digital experience with candidate save/reuse
- Support limited public release and demo-mode admin visibility
- Keep docs always synchronized in bilingual format (JA/EN)

## 3) Constraints
- Japanese text must never mojibake
- Shared shell architecture for consistent nav/footer/breadcrumb
- Public and admin concerns separated
- Config-driven behavior for access mode:
  - `open_demo`
  - `admin_only`
- All changes must be incremental and testable

## 4) Tech/Structure Requirements
- Frontend: HTML/CSS/Vanilla JS
- Data/Auth: Supabase (client-side integration)
- Config entry: `js/site-config.js`
- Shared shell entry: `js/site-shell.js`
- Public pages under `subpages/`
- SQL scripts under `sql/`
- Docs under `docs/` (update every block)

## 5) Quality Rules
- No destructive rewrites
- Keep style consistent with existing design tokens/components
- Prefer small, composable functions
- Add version-friendly CSS/JS references where needed for cache control
- Every delivered block must include:
  1. changed files
  2. verification steps
  3. doc updates

## 6) Mandatory Documentation Updates (every block)
Update these when relevant:
- `docs/10_PROJECT/WIP.md`
- `docs/10_PROJECT/PROJECT_STATUS.md`
- `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- `docs/60_TEST/TEST_PLAN.md`
- `docs/10_PROJECT/ISSUE_LIST.md` (if issue found)

All docs must be bilingual: English + Japanese.

## 6.1 Mandatory Reference Documents (read before implementation)
Always review and reflect decisions from these documents during rebuild:
- `docs/00_GOVERNANCE/DOCUMENT_CATALOG.md`
- `docs/00_GOVERNANCE/DOCUMENTATION_GOVERNANCE_GUIDELINE.md`
- `docs/20_PRODUCT/DESIGN_GUIDELINE.md`
- `docs/20_PRODUCT/FEATURE_BACKLOG.md`
- `docs/30_TECH/TECH_SPEC.md`
- `docs/30_TECH/SQL_MIGRATION_PLAN.md`
- `docs/30_TECH/SUPABASE_CUSTOMER_ACCOUNT.md`
- `docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md`
- `docs/50_OPERATIONS/CHECKLIST_SUPABASE.md`
- `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`
- `docs/60_TEST/TEST_PLAN.md`
- `docs/80_HANDOFF/NEXT_CHAT_HANDOFF.md`
- `docs/80_HANDOFF/ADMIN_IMPLEMENTATION_STATUS.md`

If implementation conflicts with these references, explicitly flag the conflict and propose an aligned alternative before proceeding.

## 6.2 Exclusions (do not treat as source-of-truth)
- `docs/00_GOVERNANCE/TEMPLATES/*` (templates only)
- `docs/90_WIP/*` (backup/scratch artifacts)

## 7) Output Format for Every Block
Return:
1. **What you changed**
2. **Why**
3. **Files changed**
4. **How to test**
5. **Doc updates**
6. **Open risks (if any)**

## 8) First Execution Task After Bootstrap
Prepare and output a concrete implementation plan for:
- foundation setup,
- shell/nav/footer,
- core public skeleton pages,
with clear phase boundaries and acceptance criteria.
