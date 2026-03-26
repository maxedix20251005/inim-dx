-- 14_revert_admin_demo_read_policies.sql
-- Purpose:
--   Rollback demo-read policies created by 13_admin_demo_read_policies.sql.

begin;

drop policy if exists demo_read_bookings_anon on public.bookings;
drop policy if exists demo_read_bookings_authenticated on public.bookings;
drop policy if exists demo_read_enquiries_anon on public.enquiries;
drop policy if exists demo_read_enquiries_authenticated on public.enquiries;

commit;
