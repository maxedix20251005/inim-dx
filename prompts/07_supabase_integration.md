# Prompt 07: Supabase Integration

Use Prompts 01-06 as baseline.

## Objective
Integrate Supabase for authentication and data persistence with robust fallback behavior and RLS-aware access patterns.

## Scope
1. Supabase client and config wiring
- Use `js/site-config.js` as single config source
- Validate `supabaseUrl`, publishable key, redirect URLs
- Ensure singleton client usage to avoid duplicate client warnings

2. Auth/session integration
- Initialize and sync auth state in shared shell
- Handle login/register/account modal flow integration
- Reflect auth state in nav/footer/account areas

3. Workshop booking persistence
- Connect confirm submission to bookings table write path
- Resolve/store plan/store/session context safely
- Ensure success route to thanks page with summary payload

4. Smart Scent persistence (DB-first)
- Use `smart_scent_blends` for save/list/update/delete
- Respect user ownership policies (own rows only)
- Fallback to local storage when:
  - no login
  - DB/RLS error
  - network error

5. RLS and SQL support
- Ensure SQL scripts are prepared/documented for:
  - blend table and update trigger
  - demo read policy apply/revert (if admin demo mode required)

6. Error handling and messaging
- Show user-readable status messages
- Avoid silent failure
- Keep behavior deterministic when switching login state in-page

## Mandatory References for This Prompt
- `docs/30_TECH/TECH_SPEC.md`
- `docs/30_TECH/SUPABASE_CUSTOMER_ACCOUNT.md`
- `docs/30_TECH/SQL_MIGRATION_PLAN.md`
- `docs/50_OPERATIONS/CHECKLIST_SUPABASE.md`
- `docs/50_OPERATIONS/WORKSHOP_BOOKING_SQL_RUNBOOK.md`
- `docs/60_TEST/ACCOUNT_TEST_RESULT.md`

## Deliverables
- Auth-aware shell and page behavior
- Booking submit connected to Supabase
- Smart Scent DB-first persistence with local fallback
- SQL/runbook references documented

## Acceptance Criteria
- Logged-in user can persist Smart Scent candidates to DB and re-load/edit
- Logged-off or DB-fail path falls back cleanly to local storage
- Booking confirm can submit and route to thanks with valid summary
- No duplicate Supabase client warnings in console

## Required Output Format
Return:
1. What you changed
2. Why
3. Files changed
4. How to test (auth + booking + smart scent persistence checklist)
5. Doc updates
6. Open risks

## Implementation Notes
- Keep all secrets out of code (publishable key only in public config)
- Maintain explicit operational instructions for mode/sql switching
- Do not weaken production security defaults without documented demo scope
