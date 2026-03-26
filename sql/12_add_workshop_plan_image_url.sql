begin;

alter table public.workshop_plans
    add column if not exists plan_image_url text;

comment on column public.workshop_plans.plan_image_url is
    'Public URL or relative path for workshop plan card image';

commit;

