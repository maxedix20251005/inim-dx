begin;

-- 1) Seed active workshop plans (idempotent by plan_code)
insert into public.workshop_plans (
    plan_code,
    plan_name,
    plan_summary,
    plan_description,
    plan_image_url,
    booking_label,
    duration_min_minutes,
    duration_max_minutes,
    base_price_jpy,
    currency_code,
    pair_price_jpy,
    min_party_size,
    max_party_size,
    available_period_start,
    available_period_end,
    meeting_place_text,
    experience_place_text,
    access_text,
    cancellation_policy_text,
    notice_text,
    status,
    sort_order
)
values
(
    'asakusa_standard_60',
    '浅草スタンダード（60分）',
    '香りの方向性を短時間で見つける体験コース。',
    'ヒアリング、ノート選定、簡易ブレンドを行う基本コースです。',
    '../images/Workshop/Workshop_ (9-1).png',
    'スタンダード 60分',
    60,
    75,
    5500,
    'JPY',
    10000,
    1,
    4,
    current_date,
    current_date + 120,
    'inim-dx 浅草店 1F 集合',
    'inim-dx Workshop Space',
    'つくばエクスプレス浅草駅から徒歩6分',
    '前日18:00以降のキャンセルは1名分料金が発生します。',
    '香り選定後にアレルギーの有無を確認します。',
    'active',
    10
),
(
    'asakusa_premium_90',
    '浅草プレミアム（90分）',
    'ノート追加と対話を含む深掘り調香コース。',
    '標準体験に加えて、ノート追加と印象調整を行う上位コースです。',
    '../images/Workshop/Workshop_ (2-1).png',
    'プレミアム 90分',
    90,
    110,
    8800,
    'JPY',
    16000,
    1,
    2,
    current_date,
    current_date + 120,
    'inim-dx 浅草店 1F 集合',
    'inim-dx Workshop Space',
    'つくばエクスプレス浅草駅から徒歩6分',
    '前日18:00以降のキャンセルは1名分料金が発生します。',
    '試香数が多いため、開始10分前までに集合してください。',
    'active',
    20
)
on conflict (plan_code)
do update set
    plan_name = excluded.plan_name,
    plan_summary = excluded.plan_summary,
    plan_description = excluded.plan_description,
    plan_image_url = excluded.plan_image_url,
    booking_label = excluded.booking_label,
    duration_min_minutes = excluded.duration_min_minutes,
    duration_max_minutes = excluded.duration_max_minutes,
    base_price_jpy = excluded.base_price_jpy,
    currency_code = excluded.currency_code,
    pair_price_jpy = excluded.pair_price_jpy,
    min_party_size = excluded.min_party_size,
    max_party_size = excluded.max_party_size,
    available_period_start = excluded.available_period_start,
    available_period_end = excluded.available_period_end,
    meeting_place_text = excluded.meeting_place_text,
    experience_place_text = excluded.experience_place_text,
    access_text = excluded.access_text,
    cancellation_policy_text = excluded.cancellation_policy_text,
    notice_text = excluded.notice_text,
    status = excluded.status,
    sort_order = excluded.sort_order,
    updated_at = now();

-- 2) Seed 60 days of workshop sessions for up to 3 active stores (idempotent by unique slot)
with ranked_stores as (
    select
        s.id as store_id,
        row_number() over (order by s.store_name asc, s.id asc) as store_rank
    from public.stores s
    where coalesce(s.is_active, true) = true
      and s.deleted_at is null
    limit 3
),
active_plans as (
    select id, plan_code
    from public.workshop_plans
    where status = 'active'
      and plan_code in ('asakusa_standard_60', 'asakusa_premium_90')
),
target_dates as (
    select (current_date + gs)::date as session_date
    from generate_series(0, 60) as gs
),
slot_candidates as (
    select
        td.session_date,
        rs.store_id,
        rs.store_rank,
        ap.id as plan_id,
        ap.plan_code,
        case
            when extract(dow from td.session_date) in (0, 6) then true
            when rs.store_rank = 1 and extract(dow from td.session_date) in (5) then true
            when rs.store_rank = 2 and extract(dow from td.session_date) in (1) then true
            when rs.store_rank = 3 and extract(dow from td.session_date) in (4) then true
            else false
        end as is_open_day
    from target_dates td
    cross join ranked_stores rs
    join active_plans ap on (
        (rs.store_rank in (1, 2) and ap.plan_code = 'asakusa_standard_60')
        or (rs.store_rank = 3 and ap.plan_code = 'asakusa_premium_90')
    )
)
insert into public.workshop_sessions (
    plan_id,
    store_id,
    session_date,
    gather_time,
    start_time,
    end_time,
    booking_method,
    min_party_size,
    max_party_size,
    capacity_total,
    capacity_reserved,
    session_status,
    price_override_jpy,
    currency_code,
    public_note,
    published_at
)
select
    sc.plan_id,
    sc.store_id,
    sc.session_date,
    case when extract(dow from sc.session_date) in (0, 6) then time '10:20' else time '13:20' end as gather_time,
    case when extract(dow from sc.session_date) in (0, 6) then time '10:30' else time '13:30' end as start_time,
    case
        when sc.plan_code = 'asakusa_premium_90' then
            case when extract(dow from sc.session_date) in (0, 6) then time '12:00' else time '15:00' end
        else
            case when extract(dow from sc.session_date) in (0, 6) then time '11:45' else time '14:45' end
    end as end_time,
    case when extract(dow from sc.session_date) in (0, 6) then 'instant' else 'request' end as booking_method,
    null,
    null,
    case when sc.plan_code = 'asakusa_premium_90' then 4 else 6 end as capacity_total,
    case
        when extract(dow from sc.session_date) = 6 then 1
        when extract(dow from sc.session_date) = 0 then 2
        else 0
    end as capacity_reserved,
    case
        when extract(dow from sc.session_date) = 0 then 'limited'
        else 'open'
    end as session_status,
    null,
    'JPY',
    case
        when extract(dow from sc.session_date) = 0 then '週末は混雑します。'
        when extract(dow from sc.session_date) in (0, 6) then '土日開催日'
        else 'リクエスト受付中'
    end as public_note,
    now()
from slot_candidates sc
where sc.is_open_day = true
on conflict (plan_id, store_id, session_date, start_time)
do update set
    gather_time = excluded.gather_time,
    end_time = excluded.end_time,
    booking_method = excluded.booking_method,
    min_party_size = excluded.min_party_size,
    max_party_size = excluded.max_party_size,
    capacity_total = excluded.capacity_total,
    capacity_reserved = excluded.capacity_reserved,
    session_status = excluded.session_status,
    price_override_jpy = excluded.price_override_jpy,
    currency_code = excluded.currency_code,
    public_note = excluded.public_note,
    published_at = excluded.published_at,
    updated_at = now();

commit;
