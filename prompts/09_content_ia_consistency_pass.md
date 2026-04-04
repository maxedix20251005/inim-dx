# Prompt 09: Content + IA Consistency Pass

Use Prompts 01-08 as baseline.

## Objective
Run a site-wide content and IA consistency pass so navigation, labels, CTA wording, and hierarchy remain coherent across all public pages.

## Scope
1. IA consistency
- Validate top-level nav order and submenu structure
- Ensure sitemap hierarchy matches live navigation
- Ensure breadcrumb hierarchy aligns with page-key map

2. Copy and label consistency
- Apply the agreed copy policy:
  - Japanese-first body text
  - English tone allowed for section-kicker labels
- Normalize duplicate/inconsistent wording for CTA labels
- Keep Shop/Store terminology consistent with chosen policy

3. CTA consistency
- Ensure equivalent actions use equivalent labels across pages
- Remove or disable duplicate/conflicting CTA blocks
- Confirm disabled-policy links remain visibly disabled and non-clickable

4. Footer/header consistency
- Footer titles remain `SHOP INFO / GUIDE / SUPPORT / ACCOUNT`
- Header utility and nav states remain consistent after auth-state changes

5. Link integrity
- Re-check relative links in `index.html` and `subpages/*.html`
- Confirm no broken static links in public pages

## Deliverables
- Normalized IA/copy/CTA behavior across public pages
- Updated sitemap/breadcrumb references where needed
- Link integrity check results documented

## Acceptance Criteria
- Navigation, sitemap, and breadcrumb no longer disagree
- CTA wording is consistent for same-intent actions
- Footer/header labels remain stable under auth-state transitions
- Public static relative links audit reports 0 broken links

## Required Output Format
Return:
1. What you changed
2. Why
3. Files changed
4. How to test (IA/copy/link checklist)
5. Doc updates
6. Open risks

## Implementation Notes
- Prefer low-risk wording/layout refinements over structural rewrites
- Do not introduce new page concepts in this pass
- Keep bilingual docs updated with concrete before/after wording examples
