
-- LOOKADO / LOOKADO PRO - Supabase foundation
create extension if not exists pgcrypto;

create table businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  slug text unique not null,
  description text,
  city text,
  address text,
  latitude numeric,
  longitude numeric,
  rating numeric(3,2) default 0,
  review_count int default 0,
  membership text not null default 'start' check (membership in ('start','pro','business')),
  created_at timestamptz not null default now()
);

create table business_categories (
  business_id uuid references businesses(id) on delete cascade,
  category text not null,
  primary key (business_id, category)
);

create table team_members (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  user_id uuid,
  name text not null,
  role text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  category text,
  duration_minutes int not null check(duration_minutes > 0),
  price numeric(10,2) not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table service_team (
  service_id uuid references services(id) on delete cascade,
  team_member_id uuid references team_members(id) on delete cascade,
  primary key(service_id, team_member_id)
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid,
  name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete restrict,
  service_id uuid not null references services(id) on delete restrict,
  team_member_id uuid not null references team_members(id) on delete restrict,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'pending' check(status in ('pending','confirmed','cancelled','completed','no_show')),
  source text not null default 'app',
  notes text,
  created_at timestamptz not null default now()
);

create index idx_appointments_team_time on appointments(team_member_id, starts_at, ends_at);
create index idx_appointments_business_time on appointments(business_id, starts_at);

create table favorites (
  customer_id uuid references customers(id) on delete cascade,
  business_id uuid references businesses(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(customer_id,business_id)
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  business_id uuid not null references businesses(id) on delete cascade,
  appointment_id uuid references appointments(id) on delete set null,
  rating int not null check(rating between 1 and 5),
  body text,
  created_at timestamptz not null default now()
);

create table membership_subscriptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  plan text not null check(plan in ('start','pro','business')),
  provider text,
  provider_subscription_id text,
  status text not null default 'active',
  starts_at timestamptz not null default now(),
  renews_at timestamptz
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references appointments(id) on delete cascade,
  channel text not null check(channel in ('email','sms','whatsapp','push')),
  recipient text not null,
  template_key text not null,
  status text not null default 'queued',
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

-- Production TODO:
-- 1. Supabase Auth
-- 2. RLS by customer/business ownership
-- 3. atomic slot availability function
-- 4. calendar integrations
-- 5. Stripe subscriptions and optional deposits
