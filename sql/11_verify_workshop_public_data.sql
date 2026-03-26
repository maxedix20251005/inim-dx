-- 1) RLS enabled state
select
    c.relname as table_name,
    c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('workshop_plans', 'workshop_sessions', 'stores')
order by c.relname;

-- 2) Select policies
select
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd,
    roles
from pg_policies
where schemaname = 'public'
  and tablename in ('workshop_plans', 'workshop_sessions', 'stores')
order by tablename, policyname;

-- 3) Public page minimum data
select count(*) as stores_count
from public.stores
where coalesce(is_active, true) = true
  and deleted_at is null;

select count(*) as active_plans_count
from public.workshop_plans
where status = 'active';

select count(*) as published_sessions_count
from public.workshop_sessions
where published_at is not null
  and session_date >= current_date;

-- 4) Sample rows (next 10 slots)
select
    ws.session_date,
    ws.start_time,
    ws.booking_method,
    ws.session_status,
    ws.capacity_total,
    ws.capacity_reserved,
    s.store_name,
    wp.plan_name
from public.workshop_sessions ws
join public.stores s on s.id = ws.store_id
join public.workshop_plans wp on wp.id = ws.plan_id
where ws.published_at is not null
  and ws.session_date >= current_date
order by ws.session_date, ws.start_time
limit 10;
