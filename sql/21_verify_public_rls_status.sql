-- 1) Check RLS status for workshop tables touched by the fix
select
    c.relname as table_name,
    c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in (
    'workshop_plans',
    'workshop_sessions',
    'workshop_plan_inclusions',
    'workshop_plan_flow_steps'
  )
order by c.relname;

-- 2) List current policies for those tables
select
    tablename,
    policyname,
    cmd,
    roles
from pg_policies
where schemaname = 'public'
  and tablename in (
    'workshop_plans',
    'workshop_sessions',
    'workshop_plan_inclusions',
    'workshop_plan_flow_steps'
  )
order by tablename, policyname;

-- 3) Show any public-schema tables still missing RLS
-- (excludes common PostGIS/Supabase extension tables)
select
    c.relname as table_name,
    c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relkind = 'r'
  and c.relname not like 'spatial_ref_sys%'
  and c.relrowsecurity = false
order by c.relname;

