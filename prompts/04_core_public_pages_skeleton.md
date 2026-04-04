# Prompt 04: Core Public Pages (Skeleton First)

Use Prompts 01-03 as baseline.

## Objective
Create the full public page skeleton set with consistent shared structure, routing keys, and section placeholders before feature-level logic.

## Scope
1. Create/normalize core public pages:
- `index.html`
- `subpages/workshop.html`
- `subpages/workshop-plans.html`
- `subpages/workshop-booking.html`
- `subpages/workshop-booking-entry.html`
- `subpages/workshop-booking-confirm.html`
- `subpages/workshop-booking-thanks.html`
- `subpages/smart-scent-design.html`
- `subpages/search-projects.html`
- `subpages/search-events.html`
- `subpages/search-shop-info.html`
- `subpages/brand.html`
- `subpages/items.html`
- `subpages/contact.html`
- `subpages/shopping-guide.html`
- `subpages/privacy.html`
- `subpages/legal.html`
- `subpages/sitemap.html`

2. Enforce skeleton consistency
- Each page has:
  - `data-page-key`
  - shared shell include pattern
  - page-level main section structure
  - clear section blocks with stable IDs/classes for later feature prompts
- Ensure viewport meta and favicon are present

3. Placeholder strategy
- Add concise, production-style placeholders (not lorem ipsum)
- Keep CTA placeholders aligned to intended flow (without implementing full logic yet)

4. Language/style policy
- Japanese-first body copy
- section-kicker may use English tone for design consistency
- avoid mixed broken terminology (Shop/Store consistency)

## Deliverables
- All target public pages exist and render through shared shell
- Page key map and breadcrumb hierarchy can resolve all created pages
- No obvious route gaps for next prompts

## Acceptance Criteria
- `index` and all listed `subpages` open without shell/runtime errors
- Header/footer/breadcrumb appear consistently
- Skeleton sections are ready for Prompt 05+ feature implementation
- Documentation updated bilingually with page list and verification steps

## Required Output Format
Return:
1. What you changed
2. Why
3. Files changed
4. How to test (page-open checklist)
5. Doc updates
6. Open risks

## Implementation Notes
- Do not yet implement booking DB submit logic or Smart Scent persistence internals
- Focus on robust structure and future-proof IDs/classes
- Keep edits reversible and modular
