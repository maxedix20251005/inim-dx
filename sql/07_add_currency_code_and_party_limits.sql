begin;

-- Add currency_code to workshop_plans (idempotent)
alter table public.workshop_plans
    add column if not exists currency_code varchar(3) not null default 'JPY';

do $$
begin
    if not exists (
        select 1 from pg_constraint where conname = 'workshop_plans_currency_code_check'
    ) then
        alter table public.workshop_plans
            add constraint workshop_plans_currency_code_check
            check (currency_code is null or length(currency_code) = 3);
    end if;
end $$;

-- Add currency_code and party limits to workshop_sessions (idempotent)
alter table public.workshop_sessions
    add column if not exists currency_code varchar(3) not null default 'JPY',
    add column if not exists min_party_size smallint,
    add column if not exists max_party_size smallint;

do $$
begin
    if not exists (
        select 1 from pg_constraint where conname = 'workshop_sessions_currency_code_check'
    ) then
        alter table public.workshop_sessions
            add constraint workshop_sessions_currency_code_check
            check (currency_code is null or length(currency_code) = 3);
    end if;

    if not exists (
        select 1 from pg_constraint where conname = 'workshop_sessions_min_party_size_check'
    ) then
        alter table public.workshop_sessions
            add constraint workshop_sessions_min_party_size_check
            check (min_party_size is null or min_party_size >= 1);
    end if;

    if not exists (
        select 1 from pg_constraint where conname = 'workshop_sessions_max_party_size_check'
    ) then
        alter table public.workshop_sessions
            add constraint workshop_sessions_max_party_size_check
            check (
                max_party_size is null
                or max_party_size >= 1
                or (min_party_size is null or max_party_size >= min_party_size)
            );
    end if;
end $$;

-- Add currency_code to bookings (idempotent)
alter table public.bookings
    add column if not exists currency_code varchar(3) default 'JPY';

do $$
begin
    if not exists (
        select 1 from pg_constraint where conname = 'bookings_currency_code_check'
    ) then
        alter table public.bookings
            add constraint bookings_currency_code_check
            check (currency_code is null or length(currency_code) = 3);
    end if;
end $$;

commit;
