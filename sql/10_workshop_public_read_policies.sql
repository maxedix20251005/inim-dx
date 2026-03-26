begin;

-- Public read for active workshop plans
drop policy if exists workshop_plans_public_select_active on public.workshop_plans;
create policy workshop_plans_public_select_active
on public.workshop_plans
for select
to anon, authenticated
using (status = 'active');

-- Public read for published workshop sessions
drop policy if exists workshop_sessions_public_select_published on public.workshop_sessions;
create policy workshop_sessions_public_select_published
on public.workshop_sessions
for select
to anon, authenticated
using (
    published_at is not null
    and session_status in ('open', 'limited', 'full', 'closed')
);

commit;
