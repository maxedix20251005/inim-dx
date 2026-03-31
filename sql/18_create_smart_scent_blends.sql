-- 18_create_smart_scent_blends.sql
-- Quick Guide:
-- 1) Run this in Supabase SQL Editor.
-- 2) This creates the table used by smart-scent-design candidate save/list/load/delete.
-- 3) Verify with the check query at the bottom.
--
-- Safety / Access model:
-- - RLS is enabled.
-- - Users can read/insert/update/delete only their own rows (auth.uid() = auth_user_id).

begin;

create extension if not exists pgcrypto;

create table if not exists public.smart_scent_blends (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  blend_name text not null,
  blend_memo text not null default '',
  notes_json jsonb not null,
  recommendation_reason text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint smart_scent_blends_name_len check (char_length(blend_name) between 1 and 120),
  constraint smart_scent_blends_notes_is_array check (jsonb_typeof(notes_json) = 'array')
);

create index if not exists idx_smart_scent_blends_user_created
  on public.smart_scent_blends (auth_user_id, created_at desc);

alter table public.smart_scent_blends enable row level security;

-- Read own rows only
drop policy if exists smart_scent_blends_select_own on public.smart_scent_blends;
create policy smart_scent_blends_select_own
  on public.smart_scent_blends
  for select
  using (auth.uid() = auth_user_id);

-- Insert own rows only
drop policy if exists smart_scent_blends_insert_own on public.smart_scent_blends;
create policy smart_scent_blends_insert_own
  on public.smart_scent_blends
  for insert
  with check (auth.uid() = auth_user_id);

-- Update own rows only
drop policy if exists smart_scent_blends_update_own on public.smart_scent_blends;
create policy smart_scent_blends_update_own
  on public.smart_scent_blends
  for update
  using (auth.uid() = auth_user_id)
  with check (auth.uid() = auth_user_id);

-- Delete own rows only
drop policy if exists smart_scent_blends_delete_own on public.smart_scent_blends;
create policy smart_scent_blends_delete_own
  on public.smart_scent_blends
  for delete
  using (auth.uid() = auth_user_id);

commit;

-- Optional check query
select
  auth_user_id,
  blend_name,
  created_at
from public.smart_scent_blends
order by created_at desc
limit 20;
