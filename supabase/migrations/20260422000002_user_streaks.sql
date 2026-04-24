-- Priority 2: Streak mechanic
-- Creates user_streaks table with freeze token support
-- Apply: supabase db push (from supabase/ directory)

create table if not exists user_streaks (
  user_id            uuid primary key references auth.users(id) on delete cascade,
  current_streak     integer not null default 0,
  longest_streak     integer not null default 0,
  last_activity_date date,
  -- Use Intl.DateTimeFormat("en-CA") on client — never new Date("YYYY-MM-DD") (UTC midnight bug)
  total_days_active  integer not null default 0,
  freeze_tokens      integer not null default 0,
  -- Timestamps
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- RLS: users see only their own streak
alter table user_streaks enable row level security;

create policy "user_streaks: owner read"
  on user_streaks for select
  using (auth.uid() = user_id);

create policy "user_streaks: owner insert"
  on user_streaks for insert
  with check (auth.uid() = user_id);

create policy "user_streaks: owner update"
  on user_streaks for update
  using (auth.uid() = user_id);

-- Auto-create streak row on new profile (triggered by auth.users insert)
-- Called after profiles trigger fires
create or replace function handle_new_user_streak()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into user_streaks (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created_streak
  after insert on auth.users
  for each row execute function handle_new_user_streak();

-- Updated-at trigger
create or replace function update_user_streaks_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_streaks_updated_at
  before update on user_streaks
  for each row execute function update_user_streaks_updated_at();

-- Index: fast lookup during daily page load
create index if not exists user_streaks_user_id_idx on user_streaks(user_id);
create index if not exists user_streaks_last_activity_idx on user_streaks(last_activity_date);
