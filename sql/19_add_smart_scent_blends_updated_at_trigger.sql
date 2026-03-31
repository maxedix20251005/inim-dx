-- 19_add_smart_scent_blends_updated_at_trigger.sql
-- Quick Guide:
-- 1) Run after sql/18_create_smart_scent_blends.sql.
-- 2) Adds/refreshes trigger to auto-update updated_at on row update.

begin;

create or replace function public.set_smart_scent_blends_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_smart_scent_blends_set_updated_at on public.smart_scent_blends;

create trigger trg_smart_scent_blends_set_updated_at
before update on public.smart_scent_blends
for each row
execute function public.set_smart_scent_blends_updated_at();

commit;

-- Optional verify (requires existing rows)
select id, blend_name, created_at, updated_at
from public.smart_scent_blends
order by updated_at desc
limit 20;
