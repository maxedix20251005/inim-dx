-- 17_revoke_admin_role.sql
-- Quick Guide:
-- 1) Replace target_email below.
-- 2) Run this script in Supabase SQL Editor.
-- 3) Verify with sql/15_check_admin_users.sql (query 1 or 2).
--
-- Safety:
-- - Fails if admin role is missing.
-- - Fails if auth user/profile is missing.
-- - Removes only admin assignment for the target user.

begin;

do $$
declare
  target_email text := 'replace-with-user-email@example.com';
  v_admin_role_id uuid;
  v_auth_user_id uuid;
  v_user_profile_id uuid;
  v_deleted int;
begin
  select r.id into v_admin_role_id
  from public.roles r
  where lower(coalesce(r.role_code, '')) = 'admin'
  limit 1;

  if v_admin_role_id is null then
    raise exception 'Admin role not found in public.roles (role_code=admin).';
  end if;

  select u.id into v_auth_user_id
  from auth.users u
  where lower(u.email) = lower(target_email)
  limit 1;

  if v_auth_user_id is null then
    raise exception 'Auth user not found for email: %', target_email;
  end if;

  select up.id into v_user_profile_id
  from public.user_profiles up
  where up.auth_user_id = v_auth_user_id
  limit 1;

  if v_user_profile_id is null then
    raise exception 'user_profiles row not found for auth_user_id: %', v_auth_user_id;
  end if;

  delete from public.user_role_assignments ura
  where ura.user_profile_id = v_user_profile_id
    and ura.role_id = v_admin_role_id;

  get diagnostics v_deleted = row_count;

  if v_deleted = 0 then
    raise notice 'No change: target user did not have admin role. user_profile_id=%', v_user_profile_id;
  else
    raise notice 'Revoked admin role. user_profile_id=%', v_user_profile_id;
  end if;
end $$;

commit;

-- Optional quick verify
select
  up.auth_user_id,
  coalesce(nullif(up.display_name, ''), nullif(to_jsonb(up) ->> 'full_name', ''), '(no name)') as display_name,
  au.email,
  r.role_code
from public.user_role_assignments ura
join public.roles r on r.id = ura.role_id
join public.user_profiles up on up.id = ura.user_profile_id
left join auth.users au on au.id = up.auth_user_id
where lower(coalesce(r.role_code, '')) = 'admin'
order by 2;