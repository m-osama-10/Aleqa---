-- =====================================================================
--  ALIEQA — Supabase schema migration (initial)
--  Animal-feed ration calculator with full RLS, indexes, triggers.
--  Run in Supabase SQL Editor (Dashboard → SQL → New query).
-- =====================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";      -- gen_random_uuid()

-- =====================================================================
--  Helper: updated_at trigger
-- =====================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
--  1. PROFILES  (1-to-1 with auth.users)
-- =====================================================================
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text        not null,
  full_name       text,
  avatar_url      text,
  phone           text,
  role            text        not null default 'user' check (role in ('user','admin')),
  locale          text        not null default 'ar',
  theme           text        not null default 'system' check (theme in ('light','dark','system')),
  is_guest        boolean     not null default false,
  guest_expires_at timestamptz,
  last_seen_at    timestamptz default now(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  deleted_at      timestamptz
);

create index if not exists profiles_role_idx        on public.profiles(role);
create index if not exists profiles_email_idx       on public.profiles(email);
create index if not exists profiles_deleted_at_idx  on public.profiles(deleted_at);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create profile when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
--  2. SUBSCRIPTIONS
-- =====================================================================
create table if not exists public.subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  plan            text not null default 'free' check (plan in ('free','pro','premium')),
  status          text not null default 'active' check (status in ('active','cancelled','expired','pending')),
  started_at      timestamptz not null default now(),
  expires_at      timestamptz,
  provider        text,
  provider_sub_id text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  deleted_at      timestamptz
);

create index if not exists subscriptions_user_id_idx   on public.subscriptions(user_id);
create index if not exists subscriptions_status_idx    on public.subscriptions(status);
create index if not exists subscriptions_expires_at_idx on public.subscriptions(expires_at);

drop trigger if exists subscriptions_updated_at on public.subscriptions;
create trigger subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- =====================================================================
--  3. NOTIFICATIONS
-- =====================================================================
create table if not exists public.notifications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  title       text not null,
  body        text not null,
  type        text not null default 'info' check (type in ('info','warning','success','error','ad','system')),
  data        jsonb default '{}'::jsonb,
  is_read     boolean not null default false,
  is_broadcast boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists notifications_user_id_idx   on public.notifications(user_id);
create index if not exists notifications_is_read_idx   on public.notifications(is_read);
create index if not exists notifications_created_at_idx on public.notifications(created_at desc);
create index if not exists notifications_broadcast_idx on public.notifications(is_broadcast) where is_broadcast = true;

drop trigger if exists notifications_updated_at on public.notifications;
create trigger notifications_updated_at before update on public.notifications
  for each row execute function public.set_updated_at();

-- =====================================================================
--  4. ADS  (dynamic, never hardcoded)
-- =====================================================================
create table if not exists public.ads (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  image_url   text,
  button_text text,
  link_url    text,
  placement   text not null default 'home' check (placement in ('home','calculator','results','sidebar','banner','interstitial')),
  priority    integer not null default 0,
  enabled     boolean not null default true,
  start_date  timestamptz,
  end_date    timestamptz,
  impressions integer not null default 0,
  clicks      integer not null default 0,
  created_by  uuid references auth.users(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists ads_enabled_idx      on public.ads(enabled) where deleted_at is null;
create index if not exists ads_priority_idx     on public.ads(priority desc);
create index if not exists ads_placement_idx    on public.ads(placement);
create index if not exists ads_dates_idx        on public.ads(start_date, end_date);

drop trigger if exists ads_updated_at on public.ads;
create trigger ads_updated_at before update on public.ads
  for each row execute function public.set_updated_at();

-- =====================================================================
--  5. SETTINGS  (dynamic key-value)
-- =====================================================================
create table if not exists public.settings (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique,
  value       text not null,
  value_type  text not null default 'string' check (value_type in ('string','boolean','number','json')),
  category    text not null default 'general',
  description text,
  is_public   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists settings_key_idx     on public.settings(key);
create index if not exists settings_public_idx  on public.settings(is_public) where deleted_at is null;
create index if not exists settings_category_idx on public.settings(category);

drop trigger if exists settings_updated_at on public.settings;
create trigger settings_updated_at before update on public.settings
  for each row execute function public.set_updated_at();

-- =====================================================================
--  6. CALCULATOR CATEGORIES
-- =====================================================================
create table if not exists public.calculator_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  name_en     text,
  description text,
  icon        text,
  sort_order  integer not null default 0,
  enabled     boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists calc_cats_slug_idx    on public.calculator_categories(slug);
create index if not exists calc_cats_sort_idx    on public.calculator_categories(sort_order);
create index if not exists calc_cats_enabled_idx on public.calculator_categories(enabled) where deleted_at is null;

drop trigger if exists calc_cats_updated_at on public.calculator_categories;
create trigger calc_cats_updated_at before update on public.calculator_categories
  for each row execute function public.set_updated_at();

-- =====================================================================
--  7. CALCULATORS
-- =====================================================================
create table if not exists public.calculators (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid references public.calculator_categories(id) on delete set null,
  slug        text not null unique,
  name        text not null,
  name_en     text,
  description text,
  icon        text,
  animal_key  text,
  config      jsonb not null default '{}'::jsonb,
  sort_order  integer not null default 0,
  enabled     boolean not null default true,
  is_premium  boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists calculators_slug_idx       on public.calculators(slug);
create index if not exists calculators_category_idx   on public.calculators(category_id);
create index if not exists calculators_enabled_idx    on public.calculators(enabled) where deleted_at is null;
create index if not exists calculators_sort_idx       on public.calculators(sort_order);
create index if not exists calculators_animal_key_idx on public.calculators(animal_key);

drop trigger if exists calculators_updated_at on public.calculators;
create trigger calculators_updated_at before update on public.calculators
  for each row execute function public.set_updated_at();

-- =====================================================================
--  8. FAVORITES
-- =====================================================================
create table if not exists public.favorites (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  calculator_id uuid references public.calculators(id) on delete cascade,
  animal_key    text,
  name          text,
  payload       jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);

create index if not exists favorites_user_id_idx     on public.favorites(user_id);
create index if not exists favorites_calculator_idx  on public.favorites(calculator_id);
create index if not exists favorites_user_created_idx on public.favorites(user_id, created_at desc);

drop trigger if exists favorites_updated_at on public.favorites;
create trigger favorites_updated_at before update on public.favorites
  for each row execute function public.set_updated_at();

-- =====================================================================
--  9. HISTORY
-- =====================================================================
create table if not exists public.history (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  calculator_id uuid references public.calculators(id) on delete set null,
  animal_key    text,
  name          text,
  payload       jsonb not null default '{}'::jsonb,
  duration_ms   integer,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);

create index if not exists history_user_id_idx      on public.history(user_id);
create index if not exists history_user_created_idx on public.history(user_id, created_at desc);
create index if not exists history_calculator_idx   on public.history(calculator_id);

drop trigger if exists history_updated_at on public.history;
create trigger history_updated_at before update on public.history
  for each row execute function public.set_updated_at();

-- =====================================================================
--  10. FEEDBACK
-- =====================================================================
create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null,
  subject    text not null,
  message    text not null,
  rating     integer check (rating between 1 and 5),
  contact    text,
  status     text not null default 'open' check (status in ('open','in_progress','resolved','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists feedback_user_id_idx   on public.feedback(user_id);
create index if not exists feedback_status_idx    on public.feedback(status);
create index if not exists feedback_created_idx   on public.feedback(created_at desc);

drop trigger if exists feedback_updated_at on public.feedback;
create trigger feedback_updated_at before update on public.feedback
  for each row execute function public.set_updated_at();

-- =====================================================================
--  11. APP VERSIONS
-- =====================================================================
create table if not exists public.app_versions (
  id           uuid primary key default gen_random_uuid(),
  version      text not null,
  platform     text not null default 'android' check (platform in ('android','ios','web')),
  build_number integer not null default 1,
  download_url text,
  release_notes text,
  is_force_update boolean not null default false,
  is_active    boolean not null default true,
  min_os_version text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz
);

create index if not exists app_versions_version_idx on public.app_versions(version);
create index if not exists app_versions_platform_idx on public.app_versions(platform);
create index if not exists app_versions_active_idx on public.app_versions(is_active) where deleted_at is null;

drop trigger if exists app_versions_updated_at on public.app_versions;
create trigger app_versions_updated_at before update on public.app_versions
  for each row execute function public.set_updated_at();

-- =====================================================================
--  12. DEVICE TOKENS  (Expo Push)
-- =====================================================================
create table if not exists public.device_tokens (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  token       text not null,
  platform    text not null default 'android' check (platform in ('android','ios','web')),
  app_version text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists device_tokens_user_id_idx on public.device_tokens(user_id);
create unique index if not exists device_tokens_token_uniq on public.device_tokens(token) where deleted_at is null;
create index if not exists device_tokens_active_idx on public.device_tokens(is_active) where deleted_at is null;

drop trigger if exists device_tokens_updated_at on public.device_tokens;
create trigger device_tokens_updated_at before update on public.device_tokens
  for each row execute function public.set_updated_at();

-- =====================================================================
--  SEED: SETTINGS
-- =====================================================================
insert into public.settings (key, value, value_type, category, description, is_public) values
  ('maintenance_mode',     'false',                    'boolean', 'general',    'Disable app for everyone except admins', false),
  ('minimum_version',      '1.0.0',                    'string',  'general',    'Minimum app version allowed to run',     true),
  ('privacy_policy',       'https://alieqa.app/privacy','string', 'legal',      'Privacy policy URL',                     true),
  ('terms',                'https://alieqa.app/terms',  'string', 'legal',      'Terms of service URL',                   true),
  ('contact_email',        'support@alieqa.app',        'string', 'contact',    'Support email',                          true),
  ('support_url',          'https://alieqa.app/support','string', 'contact',    'Support page URL',                       true),
  ('facebook',             'https://facebook.com/alieqa','string','social',     'Facebook page',                          true),
  ('whatsapp',             'https://wa.me/201000000000','string', 'social',     'WhatsApp contact',                       true),
  ('telegram',             'https://t.me/alieqa',       'string', 'social',     'Telegram channel',                       true),
  ('app_name',             'Alieqa',                    'string', 'branding',   'Application display name',               true),
  ('primary_color',        '#16a34a',                   'string', 'branding',   'Primary brand color',                    true),
  ('max_history_items',    '50',                        'number', 'limits',     'Max history items per user',             false),
  ('max_favorites_items',  '100',                       'number', 'limits',     'Max favorites per user',                 false),
  ('ads_enabled',          'true',                      'boolean', 'ads',        'Master switch for ads',                  true)
on conflict (key) do nothing;

-- =====================================================================
--  SEED: CALCULATOR CATEGORIES + CALCULATORS
-- =====================================================================
insert into public.calculator_categories (slug, name, name_en, description, icon, sort_order, enabled) values
  ('ruminants', 'المجترات',       'Ruminants',       'الأبقار والجاموس والأغنام',          '🐄', 0, true),
  ('poultry',   'الدواجن',         'Poultry',         'دجاج البياض والتسمين',               '🐔', 1, true),
  ('nutrition', 'التغذية',         'Nutrition',       'حاسبات التغذية العامة',              '🌾', 2, true)
on conflict (slug) do nothing;

insert into public.calculators (category_id, slug, name, name_en, description, icon, animal_key, sort_order, enabled, is_premium) values
  ((select id from public.calculator_categories where slug='ruminants'), 'dairy-cow',    'بقرة حلوب',   'Dairy Cow',          'حساب العليقة للبقرة الحلوب',           '🐄', 'dairy_cow',    0, true, false),
  ((select id from public.calculator_categories where slug='ruminants'), 'dairy-buffalo','جاموس حلوب',  'Dairy Buffalo',      'حساب العليقة للجاموس الحلوب',          '🐃', 'dairy_buffalo',1, true, false),
  ((select id from public.calculator_categories where slug='ruminants'), 'fattening-buffalo','جاموس تسمين','Fattening Buffalo','حساب العليقة لجاموس التسمين',          '🐃', 'buffalo',      2, true, false),
  ((select id from public.calculator_categories where slug='ruminants'), 'fattening-sheep','خروف تسمين', 'Fattening Sheep',    'حساب العليقة لخروف التسمين',           '🐑', 'sheep',        3, true, false),
  ((select id from public.calculator_categories where slug='ruminants'), 'calf',         'عجل',         'Calf',               'حساب العليقة للعجل الصغير',            '🐂', 'calf',         4, true, false),
  ((select id from public.calculator_categories where slug='poultry'),   'layer',        'دجاج بياض',   'Layer Chicken',      'حساب العليقة لدجاج البياض',            '🐔', 'layer',        5, true, false),
  ((select id from public.calculator_categories where slug='poultry'),   'layer-breeder','أمهات بياض',  'Layer Breeder',      'حساب العليقة لأمهات دجاج البياض',      '🐤', 'layer_breeder',6, true, true),
  ((select id from public.calculator_categories where slug='poultry'),   'broiler',      'دجاج تسمين',  'Broiler',            'حساب العليقة لدجاج التسمين',           '🐤', 'broiler',      7, true, false),
  ((select id from public.calculator_categories where slug='poultry'),   'broiler-starter','بادي تسمين', 'Broiler Starter',    'حساب العليقة البادي لدجاج التسمين',    '🐤', 'broiler_starter',8,true, true)
on conflict (slug) do nothing;

-- =====================================================================
--  SEED: SAMPLE AD
-- =====================================================================
insert into public.ads (title, description, image_url, button_text, link_url, placement, priority, enabled, start_date, end_date)
values (
  'مزارع الأليقة — خصم ٢٠٪ على الأعلاف',
  'اطلب أعلافك الآن واحصل على خصم ٢٠٪ على أول طلب. توصيل لكل المحافظات.',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800',
  'اطلب الآن',
  'https://alieqa.app/shop',
  'home',
  10,
  true,
  now(),
  now() + interval '90 days'
) on conflict do nothing;

-- =====================================================================
--  ROW LEVEL SECURITY
-- =====================================================================

-- ---------- Helper: is_admin ----------
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and deleted_at is null
  );
$$;

-- ---------- 1. PROFILES ----------
alter table public.profiles enable row level security;

create policy "profiles_select_self_or_admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles_update_self"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles_insert_self"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "profiles_delete_self_or_admin"
  on public.profiles for delete
  using (id = auth.uid() or public.is_admin());

-- ---------- 2. SUBSCRIPTIONS ----------
alter table public.subscriptions enable row level security;

create policy "subs_select_self_or_admin"
  on public.subscriptions for select
  using (user_id = auth.uid() or public.is_admin());

create policy "subs_insert_self"
  on public.subscriptions for insert
  with check (user_id = auth.uid());

create policy "subs_update_self_or_admin"
  on public.subscriptions for update
  using (user_id = auth.uid() or public.is_admin());

create policy "subs_delete_self_or_admin"
  on public.subscriptions for delete
  using (user_id = auth.uid() or public.is_admin());

-- ---------- 3. NOTIFICATIONS ----------
alter table public.notifications enable row level security;

create policy "notif_select_own_or_broadcast"
  on public.notifications for select
  using (
    user_id = auth.uid()
    or is_broadcast = true
    or public.is_admin()
  );

create policy "notif_update_own"
  on public.notifications for update
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

create policy "notif_insert_admin"
  on public.notifications for insert
  with check (public.is_admin() or user_id = auth.uid());

create policy "notif_delete_admin"
  on public.notifications for delete
  using (public.is_admin() or user_id = auth.uid());

-- ---------- 4. ADS ----------
alter table public.ads enable row level security;

create policy "ads_select_public"
  on public.ads for select
  using (
    (deleted_at is null
    and enabled = true
    and (start_date is null or start_date <= now())
    and (end_date is null or end_date >= now()))
    or public.is_admin()
  );

create policy "ads_insert_admin"
  on public.ads for insert
  with check (public.is_admin());

create policy "ads_update_admin"
  on public.ads for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "ads_delete_admin"
  on public.ads for delete
  using (public.is_admin());

-- ---------- 5. SETTINGS ----------
alter table public.settings enable row level security;

create policy "settings_select_public"
  on public.settings for select
  using ((is_public = true and deleted_at is null) or public.is_admin());

create policy "settings_insert_admin"
  on public.settings for insert
  with check (public.is_admin());

create policy "settings_update_admin"
  on public.settings for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "settings_delete_admin"
  on public.settings for delete
  using (public.is_admin());

-- ---------- 6. CALCULATOR CATEGORIES ----------
alter table public.calculator_categories enable row level security;

create policy "calc_cats_select_public"
  on public.calculator_categories for select
  using (deleted_at is null or public.is_admin());

create policy "calc_cats_insert_admin"
  on public.calculator_categories for insert
  with check (public.is_admin());

create policy "calc_cats_update_admin"
  on public.calculator_categories for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "calc_cats_delete_admin"
  on public.calculator_categories for delete
  using (public.is_admin());

-- ---------- 7. CALCULATORS ----------
alter table public.calculators enable row level security;

create policy "calculators_select_public"
  on public.calculators for select
  using (deleted_at is null or public.is_admin());

create policy "calculators_insert_admin"
  on public.calculators for insert
  with check (public.is_admin());

create policy "calculators_update_admin"
  on public.calculators for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "calculators_delete_admin"
  on public.calculators for delete
  using (public.is_admin());

-- ---------- 8. FAVORITES ----------
alter table public.favorites enable row level security;

create policy "fav_select_own"
  on public.favorites for select
  using (user_id = auth.uid());

create policy "fav_insert_own"
  on public.favorites for insert
  with check (user_id = auth.uid());

create policy "fav_update_own"
  on public.favorites for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "fav_delete_own"
  on public.favorites for delete
  using (user_id = auth.uid());

-- ---------- 9. HISTORY ----------
alter table public.history enable row level security;

create policy "hist_select_own"
  on public.history for select
  using (user_id = auth.uid());

create policy "hist_insert_own"
  on public.history for insert
  with check (user_id = auth.uid());

create policy "hist_update_own"
  on public.history for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "hist_delete_own"
  on public.history for delete
  using (user_id = auth.uid());

-- ---------- 10. FEEDBACK ----------
alter table public.feedback enable row level security;

create policy "feedback_select_own_or_admin"
  on public.feedback for select
  using (user_id = auth.uid() or public.is_admin());

create policy "feedback_insert_own"
  on public.feedback for insert
  with check (user_id = auth.uid() or user_id is null);

create policy "feedback_update_admin"
  on public.feedback for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "feedback_delete_admin"
  on public.feedback for delete
  using (public.is_admin());

-- ---------- 11. APP VERSIONS ----------
alter table public.app_versions enable row level security;

create policy "versions_select_public"
  on public.app_versions for select
  using ((is_active = true and deleted_at is null) or public.is_admin());

create policy "versions_insert_admin"
  on public.app_versions for insert
  with check (public.is_admin());

create policy "versions_update_admin"
  on public.app_versions for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "versions_delete_admin"
  on public.app_versions for delete
  using (public.is_admin());

-- ---------- 12. DEVICE TOKENS ----------
alter table public.device_tokens enable row level security;

create policy "tokens_select_own_or_admin"
  on public.device_tokens for select
  using (user_id = auth.uid() or public.is_admin());

create policy "tokens_insert_own"
  on public.device_tokens for insert
  with check (user_id = auth.uid());

create policy "tokens_update_own"
  on public.device_tokens for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "tokens_delete_own"
  on public.device_tokens for delete
  using (user_id = auth.uid());

-- =====================================================================
--  RPC: increment ad impression / click (safe)
-- =====================================================================
create or replace function public.increment_ad_stat(ad_uuid uuid, stat text)
returns void
language sql
security definer set search_path = public
as $$
  update public.ads
     set impressions = case when stat = 'impression' then impressions + 1 else impressions end,
         clicks      = case when stat = 'click'      then clicks + 1      else clicks end
   where id = ad_uuid and deleted_at is null;
$$;

-- =====================================================================
--  RPC: get public settings as a JSON object (key -> typed value)
-- =====================================================================
create or replace function public.get_public_settings()
returns jsonb
language sql
security definer set search_path = public
as $$
  select coalesce(jsonb_object_agg(
    key,
    case value_type
      when 'boolean' then to_jsonb(value::boolean)
      when 'number'  then to_jsonb(value::numeric)
      when 'json'    then value::jsonb
      else to_jsonb(value)
    end
  ), '{}'::jsonb)
  from public.settings
  where is_public = true and deleted_at is null;
$$;

-- =====================================================================
--  RPC: get active ads for a placement (public-safe)
-- =====================================================================
create or replace function public.get_active_ads(p_placement text default null)
returns setof public.ads
language sql
security definer set search_path = public
as $$
  select *
  from public.ads
  where deleted_at is null
    and enabled = true
    and (start_date is null or start_date <= now())
    and (end_date is null or end_date >= now())
    and (p_placement is null or placement = p_placement)
  order by priority desc, created_at desc;
$$;

-- =====================================================================
--  RPC: get unread notification count for current user
-- =====================================================================
create or replace function public.get_unread_count()
returns integer
language sql
security definer set search_path = public
as $$
  select count(*)::integer
  from public.notifications
  where deleted_at is null
    and is_read = false
    and (user_id = auth.uid() or is_broadcast = true);
$$;

-- Done.
