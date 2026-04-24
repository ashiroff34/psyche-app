-- Priority 4: Compatibility feature
-- Creates relationships + compatibility_scores tables with invite flow
-- Apply: supabase db push

create table if not exists relationships (
  id              uuid primary key default gen_random_uuid(),
  initiator_id    uuid not null references auth.users(id) on delete cascade,
  partner_id      uuid references auth.users(id) on delete set null,
  -- Unique 8-char invite code (e.g. "TH4X9B2K")
  invite_code     text not null unique,
  status          text not null default 'pending'
    check (status in ('pending', 'active', 'archived')),
  -- Relationship label (optional, user-defined)
  label           text,  -- e.g. "Partner", "Best Friend", "Colleague"
  -- Pre-computed compatibility insight
  compatibility_score float check (compatibility_score between 0.0 and 1.0),
  compatibility_notes jsonb,  -- { "strengths": [...], "tensions": [...], "tips": [...] }
  -- Timestamps
  created_at      timestamptz not null default now(),
  accepted_at     timestamptz,
  updated_at      timestamptz not null default now()
);

-- RLS: both participants can see the relationship
alter table relationships enable row level security;

create policy "relationships: initiator or partner can read"
  on relationships for select
  using (
    auth.uid() = initiator_id
    or auth.uid() = partner_id
  );

create policy "relationships: initiator can insert"
  on relationships for insert
  with check (auth.uid() = initiator_id);

create policy "relationships: initiator or partner can update"
  on relationships for update
  using (
    auth.uid() = initiator_id
    or auth.uid() = partner_id
  );

-- Invite code lookup (public — anyone with the code can find the pending invite)
create policy "relationships: invite_code lookup for pending"
  on relationships for select
  using (status = 'pending');

-- Updated-at trigger
create or replace function update_relationships_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger relationships_updated_at
  before update on relationships
  for each row execute function update_relationships_updated_at();

-- Indexes
create index if not exists relationships_initiator_idx on relationships(initiator_id);
create index if not exists relationships_partner_idx on relationships(partner_id);
create index if not exists relationships_invite_code_idx on relationships(invite_code);
create index if not exists relationships_status_idx on relationships(status) where status = 'pending';
