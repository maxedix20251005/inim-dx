# Prompt 02: Foundation Setup

Use Prompt 01 as baseline rules and continue in the same project.

## Objective
Establish a stable technical foundation before feature implementation.

## Scope
1. Validate/Create base structure (if missing):
- `index.html`
- `subpages/`
- `css/`
- `js/`
- `sql/`
- `docs/`

2. Ensure shared shell/config wiring:
- `js/site-config.js` (single source of runtime config)
- `js/site-shell.js` (shared nav/footer/breadcrumb renderer)
- Base include pattern in public pages (`data-page-key`, `data-root`, shared CSS/JS loading)

3. Establish core CSS baseline:
- token variables (color, spacing, line, shadow)
- responsive breakpoints (`1180`, `980`, `720`)
- base button/input/card behavior

4. Set global operational flags in config (with safe defaults):
- `enablePublicSideNav`
- `adminAccessMode` (`open_demo` / `admin_only`)
- `showBookingDiagnostics`
- `disabledPublicPageKeys`

5. Add safety checks:
- prevent unknown `adminAccessMode` from breaking behavior (normalize to `admin_only`)
- avoid duplicate shell rendering

## Deliverables
- Working shared shell rendered on `index.html` and at least one `subpages/*.html`
- No console error on initial load from shared shell/config path
- Foundation notes added to docs (JA/EN)

## Acceptance Criteria
- Public pages load with consistent header/footer structure from shared shell
- `site-config.js` toggles are consumed without runtime error
- Mobile/desktop baseline layout is stable
- Docs updated bilingually with changed files and test steps

## Required Output Format
Return:
1. What you changed
2. Why
3. Files changed
4. How to test (exact steps)
5. Doc updates
6. Open risks

## Implementation Notes
- Keep edits minimal and reversible
- Do not start workshop flow or smart-scent logic yet
- If files already exist, refactor only what is needed to align with this foundation
