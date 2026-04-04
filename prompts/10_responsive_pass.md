# Prompt 10: Responsive Pass (Pass-1 + Pass-2)

Use Prompts 01-09 as baseline.

## Objective
Complete a final responsive sweep focused on practical usability across desktop/tablet/mobile with low-risk, high-impact fixes.

## Scope
### Pass-1 (Structural responsiveness)
1. Identify and fix layout breakpoints where:
- content overflows viewport
- fixed/min widths break narrow screens
- tables/cards clip outside containers
- legacy redirect pages miss viewport meta

2. Prioritize key pages:
- `index.html`
- `subpages/workshop.html`
- `subpages/workshop-booking*.html`
- `subpages/smart-scent-design.html`
- `subpages/contact.html`

3. Add safe overflow handling where needed:
- horizontal scroll wrappers for wide tables on small screens
- grid-to-single-column fallbacks

### Pass-2 (UX polish on small screens)
1. Improve text wrapping/tap usability:
- floating CTA labels
- button labels in multi-action rows
- top action bars and pills

2. Ensure mobile interaction quality:
- no overlap of critical controls
- readable line-height and spacing
- tap targets remain usable

3. Verify no regressions in desktop layout

## Deliverables
- Responsive fixes implemented in focused CSS/HTML patches
- Explicit pass-1/pass-2 change log
- Validation checklist added to test docs

## Acceptance Criteria
- No major clipping/overflow in key flow pages at common widths
- Mobile CTA and action controls are readable/tappable
- Desktop layout remains visually stable
- Responsive checks documented bilingually

## Required Output Format
Return:
1. What you changed (pass-1 / pass-2)
2. Why
3. Files changed
4. How to test (device-width checklist)
5. Doc updates
6. Open risks

## Implementation Notes
- Prefer minimal CSS changes in existing style system
- Avoid broad refactors during final sweep
- Keep fixes traceable by page and breakpoint
