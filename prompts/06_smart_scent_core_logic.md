# Prompt 06: Smart Scent Core Logic

Use Prompts 01-05 as baseline.

## Objective
Implement the Smart Scent experience UI/UX and core logic so users can generate, adjust, and manage scent candidates in a reliable flow.

## Scope
1. Core interaction model
- Step-based control layout (AI-first flow)
- Note ratio adjustments with clear limits (sum cap behavior)
- Real-time result update panel

2. AI recommendation block
- Input fields for mood/problem/change
- Recommendation generation (rule-based initial logic acceptable)
- Apply recommendation / Undo apply behavior

3. Candidate management UI
- Save candidate (name + optional memo)
- Saved list rendering with metadata
- Load / Edit / Delete actions
- Empty-state guidance copy

4. UX quality
- Clear status message area (success/error/info)
- No confusing duplicate CTAs
- Mobile readability and action-button stability

5. Safety behavior
- Graceful handling when storage/auth backend is unavailable
- Fallback messaging without blocking core interaction

## Deliverables
- Fully interactive Smart Scent page flow
- Candidate lifecycle UI (save/load/edit/delete) working in-page
- Stable mobile/desktop behavior with no major overlap/clipping

## Acceptance Criteria
- User can generate recommendation, apply, undo, then save candidate
- Saved candidate can be loaded and edited without state corruption
- UI shows clear message on fallback conditions
- Layout remains usable at mobile breakpoints

## Required Output Format
Return:
1. What you changed
2. Why
3. Files changed
4. How to test (interaction checklist)
5. Doc updates
6. Open risks

## Implementation Notes
- Keep architecture ready for DB-first persistence in next prompt
- Keep wording consistent with site tone (JA-first body, English kicker where applicable)
- Avoid autoplay/audio warnings on initial load (user gesture first)
