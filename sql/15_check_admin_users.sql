-- 15_check_admin_users.sql
-- Purpose:
--   Check who has which role(s), including admin.
-- Usage:
--   Run each SELECT in Supabase SQL Editor.

-- 1) All users with role assignments (one row per role)
select
  up.id as user_profile_id,
  up.auth_user_id,
  coalesce(
    nullif(up.display_name, ''),
    nullif(to_jsonb(up) ->> 'full_name', ''),
    '(no name)'
  ) as display_name,
  up.account_status,
  au.email as auth_email,
  lower(coalesce(r.role_code, '(no role)')) as role_code,
  coalesce(r.role_name, '(no role)') as role_name,
  ura.created_at as role_assigned_at
from public.user_profiles up
left join auth.users au
  on au.id = up.auth_user_id
left join public.user_role_assignments ura
  on ura.user_profile_id = up.id
left join public.roles r
  on r.id = ura.role_id
order by
  coalesce(
    nullif(up.display_name, ''),
    nullif(to_jsonb(up) ->> 'full_name', ''),
    au.email,
    up.auth_user_id::text
  ),
  role_code;

-- 2) All users with aggregated roles (one row per user)
select
  up.id as user_profile_id,
  up.auth_user_id,
  coalesce(
    nullif(up.display_name, ''),
    nullif(to_jsonb(up) ->> 'full_name', ''),
    '(no name)'
  ) as display_name,
  up.account_status,
  au.email as auth_email,
  coalesce(
    string_agg(distinct lower(coalesce(r.role_code, '')), ', ')
      filter (where r.role_code is not null),
    '(no role)'
  ) as role_codes,
  count(distinct r.id) as role_count
from public.user_profiles up
left join auth.users au
  on au.id = up.auth_user_id
left join public.user_role_assignments ura
  on ura.user_profile_id = up.id
left join public.roles r
  on r.id = ura.role_id
group by up.id, up.auth_user_id, up.display_name, up.account_status, au.email
order by
  coalesce(
    nullif(up.display_name, ''),
    nullif(to_jsonb(up) ->> 'full_name', ''),
    au.email,
    up.auth_user_id::text
  );

-- 3) Role summary (how many assignments per role)
select
  lower(coalesce(r.role_code, '(null)')) as role_code,
  coalesce(r.role_name, '(null)') as role_name,
  count(*) as assigned_count
from public.user_role_assignments ura
join public.roles r
  on r.id = ura.role_id
group by 1, 2
order by 1;

-- 4) Admin users only (quick filter)
select
  up.id as user_profile_id,
  up.auth_user_id,
  coalesce(
    nullif(up.display_name, ''),
    nullif(to_jsonb(up) ->> 'full_name', ''),
    '(no name)'
  ) as display_name,
  up.account_status,
  au.email as auth_email,
  r.role_code,
  r.role_name,
  ura.created_at as role_assigned_at
from public.user_role_assignments ura
join public.roles r
  on r.id = ura.role_id
join public.user_profiles up
  on up.id = ura.user_profile_id
left join auth.users au
  on au.id = up.auth_user_id
where lower(coalesce(r.role_code, '')) = 'admin'
order by coalesce(
  nullif(up.display_name, ''),
  nullif(to_jsonb(up) ->> 'full_name', ''),
  au.email,
  up.auth_user_id::text
);