# Prompt 05: Workshop Flow Implementation

Use Prompts 01-04 as baseline.

## Objective
Implement the complete public workshop conversion flow end-to-end with clear state handoff and user-friendly CTA behavior.

## Target Flow
`index.html` -> `subpages/workshop.html` -> `subpages/workshop-booking.html` -> `subpages/workshop-booking-entry.html` -> `subpages/workshop-booking-confirm.html` -> `subpages/workshop-booking-thanks.html`

## Scope
1. CTA and route wiring
- Ensure all workshop-related CTAs route to the correct next page
- Keep wording consistent for action clarity (compare/view/book/next step)

2. Parameter/state handoff
- Carry selected plan/store/date/session context across steps
- Preserve edit-back behavior:
  - confirm -> entry keeps entered values
  - entry -> booking keeps selected slot context where possible

3. Booking page UX
- Calendar/list selection behavior
- Selected date/slot panel updates correctly
- Time-slot actions route with required parameters

4. Entry/Confirm/Thanks behavior
- Entry page validates required fields and policy agreement
- Confirm page displays all submitted values and supports edit return
- Thanks page shows completion summary and next actions

5. Stability requirements
- Avoid dead-end navigation
- Avoid duplicate/contradictory CTA labels
- Handle missing query params gracefully with user guidance

## Mandatory References for This Prompt
- `docs/40_DATA/WORKSHOP_BOOKING_DATA_DESIGN.md`
- `docs/30_TECH/TECH_SPEC.md`
- `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`
- `docs/60_TEST/TEST_PLAN.md` (workshop flow scenarios)

## Deliverables
- End-to-end workshop flow works without broken transitions
- Required context values are preserved through confirm/thanks
- User can recover from missing context or go back to prior step

## Acceptance Criteria
- Top-to-thanks path is executable in one pass
- Confirm page reflects actual entry input and selected slot
- Back-navigation preserves data (no unexpected reset)
- Mobile and desktop both keep usable CTA access

## Required Output Format
Return:
1. What you changed
2. Why
3. Files changed
4. How to test (E2E checklist)
5. Doc updates
6. Open risks

## Implementation Notes
- Keep data transfer transparent via URL params and/or controlled state
- Do not hardcode single-date mocks that hide empty-data conditions
- Maintain Japanese-first copy with English section-kicker tone where adopted
