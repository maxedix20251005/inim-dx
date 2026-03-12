create extension if not exists "pgcrypto";

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text not null,
    display_name text,
    email text not null,
    status text not null default 'active',
    favorite_store text,
    newsletter_opt_in boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    deleted_at timestamptz
);

create table if not exists public.customer_preferences (
    profile_id uuid primary key references public.profiles(id) on delete cascade,
    preferred_scent_family text,
    preferred_experience text,
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists customer_preferences_set_updated_at on public.customer_preferences;
create trigger customer_preferences_set_updated_at
before update on public.customer_preferences
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.customer_preferences enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "preferences_select_own" on public.customer_preferences;
create policy "preferences_select_own"
on public.customer_preferences
for select
to authenticated
using (auth.uid() = profile_id);

drop policy if exists "preferences_insert_own" on public.customer_preferences;
create policy "preferences_insert_own"
on public.customer_preferences
for insert
to authenticated
with check (auth.uid() = profile_id);

drop policy if exists "preferences_update_own" on public.customer_preferences;
create policy "preferences_update_own"
on public.customer_preferences
for update
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);
