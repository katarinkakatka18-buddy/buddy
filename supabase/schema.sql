create table providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  subcategory text,
  location text not null,
  tier text default 'free',
  rating numeric default 0,
  reviews integer default 0,
  price_from numeric,
  price_unit text,
  verified boolean default false,
  bio text,
  tags text[],
  phone text,
  email text,
  created_at timestamptz default now()
);

alter table providers enable row level security;

create policy "Public read access" on providers
  for select using (true);

create policy "Public insert access" on providers
  for insert with check (true);
