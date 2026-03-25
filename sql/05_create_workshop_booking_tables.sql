begin;

create table if not exists public.workshop_plans (
    id uuid primary key default gen_random_uuid(),
    plan_code varchar(50) not null unique,
    plan_name varchar(120) not null,
    plan_summary text not null,
    plan_description text not null,
    booking_label varchar(120),
    duration_min_minutes smallint not null check (duration_min_minutes > 0),
    duration_max_minutes smallint check (duration_max_minutes is null or duration_max_minutes >= duration_min_minutes),
    base_price_jpy integer not null check (base_price_jpy >= 0),
    currency_code varchar(3) not null default 'JPY',
    pair_price_jpy integer check (pair_price_jpy is null or pair_price_jpy >= 0),
    min_party_size smallint not null default 1 check (min_party_size >= 1),
    max_party_size smallint not null default 1 check (max_party_size >= min_party_size),
    available_period_start date,
    available_period_end date,
    meeting_place_text text,
    experience_place_text text,
    access_text text,
    cancellation_policy_text text,
    notice_text text,
    hero_asset_id uuid references public.content_assets(id) on delete set null,
    status varchar(20) not null default 'draft' check (status in ('draft', 'active', 'inactive')),
    sort_order smallint not null default 1,
    created_by uuid references public.user_profiles(id) on delete set null,
    updated_by uuid references public.user_profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint workshop_plans_period_check check (
        available_period_end is null
        or available_period_start is null
        or available_period_end >= available_period_start
    )
);

create table if not exists public.workshop_plan_inclusions (
    id uuid primary key default gen_random_uuid(),
    plan_id uuid not null references public.workshop_plans(id) on delete cascade,
    inclusion_text varchar(255) not null,
    display_order smallint not null default 1,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.workshop_plan_flow_steps (
    id uuid primary key default gen_random_uuid(),
    plan_id uuid not null references public.workshop_plans(id) on delete cascade,
    step_no smallint not null check (step_no >= 1),
    step_title varchar(120) not null,
    step_description text not null,
    asset_id uuid references public.content_assets(id) on delete set null,
    display_order smallint not null default 1,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint workshop_plan_flow_steps_plan_step_no_key unique (plan_id, step_no)
);

create table if not exists public.workshop_sessions (
    id uuid primary key default gen_random_uuid(),
    plan_id uuid not null references public.workshop_plans(id) on delete cascade,
    store_id uuid not null references public.stores(id) on delete restrict,
    session_date date not null,
    gather_time time not null,
    start_time time not null,
    end_time time not null,
    booking_method varchar(20) not null check (booking_method in ('instant', 'request')),
    min_party_size smallint check (min_party_size is null or min_party_size >= 1),
    max_party_size smallint check (max_party_size is null or (max_party_size >= 1 and (min_party_size is null or max_party_size >= min_party_size))),
    capacity_total smallint not null check (capacity_total >= 1),
    capacity_reserved smallint not null default 0 check (capacity_reserved >= 0),
    session_status varchar(20) not null default 'open' check (session_status in ('open', 'limited', 'full', 'closed', 'cancelled')),
    price_override_jpy integer check (price_override_jpy is null or price_override_jpy >= 0),
    currency_code varchar(3) not null default 'JPY',
    public_note varchar(255),
    request_deadline_at timestamptz,
    published_at timestamptz,
    created_by uuid references public.user_profiles(id) on delete set null,
    updated_by uuid references public.user_profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint workshop_sessions_time_check check (end_time > start_time),
    constraint workshop_sessions_capacity_check check (capacity_reserved <= capacity_total)
);

create unique index if not exists idx_workshop_sessions_unique_slot
    on public.workshop_sessions (plan_id, store_id, session_date, start_time);

create index if not exists idx_workshop_plans_status_sort
    on public.workshop_plans (status, sort_order);

create index if not exists idx_workshop_plan_inclusions_plan_order
    on public.workshop_plan_inclusions (plan_id, display_order);

create index if not exists idx_workshop_plan_flow_steps_plan_order
    on public.workshop_plan_flow_steps (plan_id, display_order);

create index if not exists idx_workshop_sessions_calendar_lookup
    on public.workshop_sessions (session_date, session_status, booking_method);

create index if not exists idx_workshop_sessions_plan_lookup
    on public.workshop_sessions (plan_id, session_date, start_time);

alter table public.bookings
    add column if not exists session_id uuid references public.workshop_sessions(id) on delete set null,
    add column if not exists plan_id uuid references public.workshop_plans(id) on delete set null,
    add column if not exists quoted_price_jpy integer,
    add column if not exists currency_code varchar(3) default 'JPY',
    add column if not exists booking_method varchar(20),
    add column if not exists contact_name varchar(120),
    add column if not exists contact_email varchar(255),
    add column if not exists contact_phone varchar(40),
    add column if not exists party_size smallint,
    add column if not exists special_requests text,
    add column if not exists internal_note text,
    add column if not exists confirmed_at timestamptz;

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'bookings_booking_method_check'
    ) then
        alter table public.bookings
            add constraint bookings_booking_method_check
            check (booking_method is null or booking_method in ('instant', 'request'));
    end if;

    if not exists (
        select 1
        from pg_constraint
        where conname = 'bookings_party_size_check'
    ) then
        alter table public.bookings
            add constraint bookings_party_size_check
            check (party_size is null or party_size >= 1);
    end if;

    if not exists (
        select 1
        from pg_constraint
        where conname = 'bookings_quoted_price_jpy_check'
    ) then
        alter table public.bookings
            add constraint bookings_quoted_price_jpy_check
            check (quoted_price_jpy is null or quoted_price_jpy >= 0);
    end if;

    if not exists (
        select 1
        from pg_constraint
        where conname = 'bookings_currency_code_check'
    ) then
        alter table public.bookings
            add constraint bookings_currency_code_check
            check (currency_code is null or length(currency_code) = 3);
    end if;
end $$;

create index if not exists idx_bookings_session_id
    on public.bookings (session_id);

create index if not exists idx_bookings_plan_id
    on public.bookings (plan_id);

create index if not exists idx_bookings_contact_email
    on public.bookings (contact_email);

commit;
