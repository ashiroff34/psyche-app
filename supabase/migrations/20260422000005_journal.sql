-- Priority 5: Journal with client-side encryption
-- Creates journal_entries + journal_prompts tables
-- IMPORTANT: journal_entries stores ciphertext ONLY — server never sees plaintext
-- Encryption: AES-256-GCM on client, key derived from user password / device key
-- Apply: supabase db push

-- Prompt library (public read, admin write)
create table if not exists journal_prompts (
  id             uuid primary key default gen_random_uuid(),
  framework      text not null,  -- 'enneagram' | 'jungian' | 'big_five'
  type_target    integer,        -- null = all types; 1-9 for Enneagram, null for cognitive/big5
  subtype        text,           -- null | 'sp' | 'sx' | 'so'
  prompt_text    text not null,
  -- Growth area: 'self_awareness' | 'relationships' | 'work' | 'growth'
  growth_area    text not null default 'self_awareness',
  difficulty     integer not null default 1 check (difficulty between 1 and 3),
  is_published   boolean not null default false,
  created_at     timestamptz not null default now()
);

alter table journal_prompts enable row level security;

-- Anyone can read published prompts
create policy "journal_prompts: public read"
  on journal_prompts for select
  using (is_published = true);

-- Encrypted journal entries (server sees ONLY ciphertext + IV)
create table if not exists journal_entries (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  prompt_id      uuid references journal_prompts(id) on delete set null,
  -- AES-256-GCM encrypted content — client decrypts with device key
  ciphertext     text not null,
  -- Base64-encoded initialization vector (unique per entry)
  iv             text not null,
  -- Word count of plaintext (client-computed before encryption — for stats only)
  word_count     integer,
  -- Mood/energy rating (optional, unencrypted for analytics)
  mood           integer check (mood between 1 and 5),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- RLS: strict owner-only access
alter table journal_entries enable row level security;

create policy "journal_entries: owner read"
  on journal_entries for select
  using (auth.uid() = user_id);

create policy "journal_entries: owner insert"
  on journal_entries for insert
  with check (auth.uid() = user_id);

create policy "journal_entries: owner update"
  on journal_entries for update
  using (auth.uid() = user_id);

create policy "journal_entries: owner delete"
  on journal_entries for delete
  using (auth.uid() = user_id);

-- Updated-at trigger
create or replace function update_journal_entries_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger journal_entries_updated_at
  before update on journal_entries
  for each row execute function update_journal_entries_updated_at();

-- Indexes
create index if not exists journal_entries_user_id_idx on journal_entries(user_id);
create index if not exists journal_entries_created_at_idx on journal_entries(user_id, created_at desc);
create index if not exists journal_prompts_framework_idx on journal_prompts(framework, type_target) where is_published = true;
