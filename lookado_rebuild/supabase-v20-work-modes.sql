-- LOOKADO v20 work modes / international business profile
-- This migration was applied to the connected LOOKADO Supabase project on 2026-09-20.
alter table public.businesses
  add column if not exists work_mode text not null default 'venue',
  add column if not exists public_address boolean not null default true,
  add column if not exists service_radius_km integer,
  add column if not exists country_code text,
  add column if not exists country text,
  add column if not exists latitude double precision,
  add column if not exists longitude double precision,
  add column if not exists currency text not null default 'EUR';
