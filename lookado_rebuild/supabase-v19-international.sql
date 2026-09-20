-- LOOKADO v19 international geography (additive migration)
alter table public.businesses add column if not exists country_code text;
alter table public.businesses add column if not exists country text;
alter table public.businesses add column if not exists latitude double precision;
alter table public.businesses add column if not exists longitude double precision;
alter table public.businesses add column if not exists timezone text;
alter table public.businesses add column if not exists currency text default 'EUR';
create index if not exists businesses_country_city_idx on public.businesses(country_code, city);
create index if not exists businesses_lat_lng_idx on public.businesses(latitude, longitude);
