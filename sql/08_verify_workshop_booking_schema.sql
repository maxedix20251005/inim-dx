-- Verification script for workshop booking schema (columns, tables, indexes)

-- Tables
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'workshop_plans',
    'workshop_plan_inclusions',
    'workshop_plan_flow_steps',
    'workshop_sessions'
  )
order by table_name;

-- Bookings columns (workshop-related)
select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'bookings'
  and column_name in (
    'session_id',
    'plan_id',
    'quoted_price_jpy',
    'currency_code',
    'booking_method',
    'contact_name',
    'contact_email',
    'contact_phone',
    'party_size',
    'special_requests',
    'internal_note',
    'confirmed_at'
  )
order by column_name;

-- Relevant indexes
select indexname
from pg_indexes
where schemaname = 'public'
  and indexname in (
    'idx_workshop_sessions_unique_slot',
    'idx_workshop_plans_status_sort',
    'idx_workshop_plan_inclusions_plan_order',
    'idx_workshop_plan_flow_steps_plan_order',
    'idx_workshop_sessions_calendar_lookup',
    'idx_workshop_sessions_plan_lookup',
    'idx_bookings_session_id',
    'idx_bookings_plan_id',
    'idx_bookings_contact_email'
  )
order by indexname;
