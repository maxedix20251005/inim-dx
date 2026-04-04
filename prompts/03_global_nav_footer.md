# Prompt 03: Global Navigation + Footer

Use Prompt 01 and 02 as baseline.

## Objective
Implement a professional, consistent global navigation and footer system across public pages.

## Scope
1. Global navigation (desktop + mobile)
- Ordered top-level menu support
- Hover-based drilldown for items with children (desktop)
- Expand/collapse panel for mobile nav
- Current-page highlighting (`is-current` / `aria-current`)
- Parent-only mode support for menu groups (no direct parent-page link when configured)

2. Navigation policy controls (config-driven)
- Respect `disabledPublicPageKeys` from `js/site-config.js`
- Disabled links should be visibly disabled and non-clickable
- Keep structure visible even when links are disabled (for future rollout)

3. Footer standardization
- Four title columns:
  - `SHOP INFO`
  - `GUIDE`
  - `SUPPORT`
  - `ACCOUNT`
- Keep account area compatible with auth state changes (logged-in/logged-off rendering)
- Footer links must follow current enabled/disabled policy

4. UX behavior requirements
- Hover submenu must remain selectable (no focus-loss collapse when pointer moves into submenu)
- Touch/mobile behavior must not rely on hover
- Keyboard accessibility: tab-focus visible, Enter/Space usable on toggles

## Deliverables
- Shared nav/footer behavior implemented in `js/site-shell.js`
- Consistent nav/footer rendered on `index.html` and all `subpages/*.html` public pages
- No duplicate navigation blocks (avoid side-nav vs global-nav redundancy unless explicitly enabled)

## Acceptance Criteria
- Top-level menu order matches configured IA
- Submenus are stable and clickable on desktop hover
- Mobile menu is usable and collapses/opens correctly
- Footer titles are exactly: `SHOP INFO / GUIDE / SUPPORT / ACCOUNT`
- Disabled policy is reflected consistently in nav + footer

## Required Output Format
Return:
1. What you changed
2. Why
3. Files changed
4. How to test (desktop/mobile + keyboard checks)
5. Doc updates
6. Open risks

## Implementation Notes
- Keep labels/copy aligned with established style (section-kicker can remain English tone)
- Avoid introducing new frameworks
- Ensure no mojibake in Japanese labels
