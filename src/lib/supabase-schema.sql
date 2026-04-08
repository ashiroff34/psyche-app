-- Confessions table
create table confessions (
  id uuid default gen_random_uuid() primary key,
  text text not null check (char_length(text) <= 140),
  type_number int not null check (type_number between 1 and 9),
  reactions jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  device_id text
);

-- Enable RLS
alter table confessions enable row level security;

-- Anyone can read confessions
create policy "Anyone can read confessions" on confessions for select using (true);

-- Anyone can insert confessions
create policy "Anyone can insert confessions" on confessions for insert with check (true);

-- Anyone can update reactions
create policy "Anyone can update reactions" on confessions for update using (true);

-- Index for ordering
create index confessions_created_at_idx on confessions (created_at desc);
