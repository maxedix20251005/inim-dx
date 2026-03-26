-- 13_admin_demo_read_policies.sql
-- Purpose:
--   Demo-only policy set to allow list visibility on admin operation pages
--   without login (open_demo mode).
-- Warning:
--   This exposes bookings/enquiries rows to anon/authenticated API roles.
--   Apply only in demo environments, and rollback with 14_revert_admin_demo_read_policies.sql.

begin;

alter table if exists public.bookings enable row level security;
alter table if exists public.enquiries enable row level security;

do $$
begin
    if not exists (
        select 1 from pg_policies
        where schemaname = 'public'
          and tablename = 'bookings'
          and policyname = 'demo_read_bookings_anon'
    ) then
        create policy demo_read_bookings_anon
            on public.bookings
            for select
            to anon
            using (true);
    end if;
end $$;

do $$
begin
    if not exists (
        select 1 from pg_policies
        where schemaname = 'public'
          and tablename = 'bookings'
          and policyname = 'demo_read_bookings_authenticated'
    ) then
        create policy demo_read_bookings_authenticated
            on public.bookings
            for select
            to authenticated
            using (true);
    end if;
end $$;

do $$
begin
    if not exists (
        select 1 from pg_policies
        where schemaname = 'public'
          and tablename = 'enquiries'
          and policyname = 'demo_read_enquiries_anon'
    ) then
        create policy demo_read_enquiries_anon
            on public.enquiries
            for select
            to anon
            using (true);
    end if;
end $$;

do $$
begin
    if not exists (
        select 1 from pg_policies
        where schemaname = 'public'
          and tablename = 'enquiries'
          and policyname = 'demo_read_enquiries_authenticated'
    ) then
        create policy demo_read_enquiries_authenticated
            on public.enquiries
            for select
            to authenticated
            using (true);
    end if;
end $$;

commit;
