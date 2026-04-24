-- Priority 3: Proprietary assessments
-- Creates assessments table for Thyself Type Index (16-type) + Thyself Enneagram Assessment (9-type)
-- TRADEMARK WARNING: Never name columns or values "mbti", "rheti", or "myers_briggs"
-- Apply: supabase db push

create table if not exists assessments (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  -- Assessment type: 'thyself_16type' or 'thyself_9type' (never 'mbti' or 'rheti')
  type           text not null check (type in ('thyself_16type', 'thyself_9type')),
  -- Raw dimension scores as JSON
  -- For thyself_16type: { "EI": 0.7, "SN": 0.3, "TF": 0.6, "JP": 0.8 }
  -- For thyself_9type:  { "1": 0.2, "2": 0.8, ..., "9": 0.4 }
  raw_scores     jsonb not null,
  -- Final computed result
  -- For thyself_16type: e.g. "INFJ"
  -- For thyself_9type:  e.g. "4" (string for consistency)
  final_type     text,
  -- Optional dominant wing (Enneagram only): e.g. "4w5"
  wing           text,
  -- Optional instinctual variant (Enneagram only): 'sp' | 'sx' | 'so'
  instinct       text check (instinct in ('sp', 'sx', 'so', null)),
  -- Calibration confidence 0-1 (from FSRS or item-response theory)
  confidence     float check (confidence between 0.0 and 1.0),
  -- Source: 'onboarding_quick' | 'full_assessment' | 'deep_dive'
  source         text not null default 'onboarding_quick',
  -- Whether this is the user's current/canonical result
  is_current     boolean not null default true,
  completed_at   timestamptz not null default now()
);

-- RLS
alter table assessments enable row level security;

create policy "assessments: owner read"
  on assessments for select
  using (auth.uid() = user_id);

create policy "assessments: owner insert"
  on assessments for insert
  with check (auth.uid() = user_id);

-- When a new assessment is inserted as is_current, demote the previous one
create or replace function demote_previous_assessment()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.is_current = true then
    update assessments
    set is_current = false
    where user_id = new.user_id
      and type = new.type
      and id != new.id;
  end if;
  return new;
end;
$$;

create trigger assessments_demote_previous
  after insert on assessments
  for each row execute function demote_previous_assessment();

-- Indexes
create index if not exists assessments_user_id_idx on assessments(user_id);
create index if not exists assessments_user_current_idx on assessments(user_id, type) where is_current = true;
