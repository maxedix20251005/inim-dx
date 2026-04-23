begin;

-- Fix Security Advisor warning:
-- function_search_path_mutable
alter function public.set_smart_scent_blends_updated_at()
    set search_path = pg_catalog, public;

alter function public.set_updated_at()
    set search_path = pg_catalog, public;

commit;

-- Verify
select
    n.nspname as schema_name,
    p.proname as function_name,
    p.proconfig
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('set_smart_scent_blends_updated_at', 'set_updated_at')
order by p.proname;

