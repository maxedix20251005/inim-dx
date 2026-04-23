begin;

-- Enable RLS on workshop public-read tables.
-- This addresses Supabase Security Advisor "rls_disabled_in_public".
alter table if exists public.workshop_plans enable row level security;
alter table if exists public.workshop_sessions enable row level security;
alter table if exists public.workshop_plan_inclusions enable row level security;
alter table if exists public.workshop_plan_flow_steps enable row level security;

-- Public read: active plans.
drop policy if exists workshop_plans_public_select_active on public.workshop_plans;
create policy workshop_plans_public_select_active
on public.workshop_plans
for select
to anon, authenticated
using (status = 'active');

-- Public read: published sessions in visible statuses.
drop policy if exists workshop_sessions_public_select_published on public.workshop_sessions;
create policy workshop_sessions_public_select_published
on public.workshop_sessions
for select
to anon, authenticated
using (
    published_at is not null
    and session_status in ('open', 'limited', 'full', 'closed')
);

-- Public read: inclusions only for active plans.
drop policy if exists workshop_plan_inclusions_public_select_active_plan on public.workshop_plan_inclusions;
create policy workshop_plan_inclusions_public_select_active_plan
on public.workshop_plan_inclusions
for select
to anon, authenticated
using (
    exists (
        select 1
        from public.workshop_plans wp
        where wp.id = workshop_plan_inclusions.plan_id
          and wp.status = 'active'
    )
);

-- Public read: flow steps only for active plans.
drop policy if exists workshop_plan_flow_steps_public_select_active_plan on public.workshop_plan_flow_steps;
create policy workshop_plan_flow_steps_public_select_active_plan
on public.workshop_plan_flow_steps
for select
to anon, authenticated
using (
    exists (
        select 1
        from public.workshop_plans wp
        where wp.id = workshop_plan_flow_steps.plan_id
          and wp.status = 'active'
    )
);

commit;

