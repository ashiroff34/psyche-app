# Data Model Runbook — Thyself

**Last updated:** 2026-04-22
**For:** Engineering diligence, Supabase schema reference

---

## Schema overview

All tables live in Supabase (PostgreSQL). Row-Level Security (RLS) is enabled on all user data tables. Public content tables (lessons, enneagram_types) use RLS to allow read access without auth.

---

## Core tables

### `profiles`

Extends Supabase Auth `auth.users`. Created on sign-up via trigger.

```sql
profiles (
  id             uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          text,
  display_name   text,
  enneagram_type integer CHECK (enneagram_type BETWEEN 1 AND 9),
  mbti_type      text,         -- Thyself Type Index result (16-type)
  subtype        text,         -- sp | sx | so
  wing           integer,      -- 1-9 (adjacent type)
  onboarding_complete boolean DEFAULT false,
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
)
```

RLS: users can only read/update their own row.

---

### `lessons`

Learning content — Enneagram, Jungian, Big Five frameworks.

```sql
lessons (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  framework      text NOT NULL,  -- 'enneagram' | 'jungian' | 'big_five'
  type_target    text,           -- null = all types, '4' = type 4 only
  title          text NOT NULL,
  content        jsonb NOT NULL, -- {sections: [...], questions: [...]}
  tier           integer DEFAULT 2, -- 2=recall, 3=application, 4=analysis
  order_index    integer,
  is_published   boolean DEFAULT false,
  created_at     timestamptz DEFAULT now()
)
```

RLS: read-only public. Admin can write (service role).

---

### `lesson_progress`

Per-user lesson completion and XP.

```sql
lesson_progress (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id      uuid REFERENCES lessons(id) ON DELETE CASCADE,
  completed      boolean DEFAULT false,
  score          integer,            -- 0-100
  xp_earned      integer DEFAULT 0,
  completed_at   timestamptz,
  UNIQUE (user_id, lesson_id)
)
```

RLS: users see only their own rows.

---

### `daily_observations` (content table)

Type-specific daily observation content. Not user-specific.

```sql
daily_observations (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enneagram_type integer NOT NULL CHECK (enneagram_type BETWEEN 1 AND 9),
  subtype        text,    -- null = all subtypes
  content        text NOT NULL,
  author_voice   text DEFAULT 'naranjo', -- 'naranjo' | 'riso_hudson'
  scheduled_for  date,
  is_published   boolean DEFAULT false
)
```

RLS: read-only public.

---

## Planned tables (Priority 2–5)

### `user_streaks` (Priority 2)

```sql
user_streaks (
  user_id            uuid PRIMARY KEY REFERENCES profiles(id),
  current_streak     integer DEFAULT 0,
  longest_streak     integer DEFAULT 0,
  last_activity_date date,        -- use Intl.DateTimeFormat("en-CA") timezone
  total_days_active  integer DEFAULT 0,
  freeze_tokens      integer DEFAULT 0  -- StreakSaver mechanic
)
```

---

### `assessments` (Priority 3)

```sql
assessments (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid REFERENCES profiles(id),
  type           text NOT NULL,  -- 'thyself_16type' | 'thyself_9type'
  result         jsonb NOT NULL,  -- raw scores per type/dimension
  final_type     text,           -- computed result
  confidence     float,          -- 0-1 calibration confidence
  completed_at   timestamptz DEFAULT now()
)
```

> Assessment naming: never "RHETI", never "MBTI". Use "Thyself Enneagram Assessment" and "Thyself Type Index".

---

### `relationships` (Priority 4)

```sql
relationships (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  initiator_id   uuid REFERENCES profiles(id),
  partner_id     uuid REFERENCES profiles(id),
  invite_code    text UNIQUE,
  status         text DEFAULT 'pending', -- 'pending' | 'active' | 'archived'
  compatibility_score float,
  created_at     timestamptz DEFAULT now()
)
```

---

### `journal_entries` (Priority 5)

Encrypted client-side before write. Server stores ciphertext only.

```sql
journal_entries (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid REFERENCES profiles(id),
  prompt_id      uuid,             -- references journal_prompts
  ciphertext     text NOT NULL,    -- AES-256-GCM encrypted on client
  iv             text NOT NULL,    -- initialization vector
  created_at     timestamptz DEFAULT now()
)
```

> The server NEVER sees plaintext journal content. Key derivation from user password happens client-side.

---

## Migration files

Ready-to-apply SQL migrations for Priorities 2–5 live in `supabase/migrations/`:

| File | Creates |
|---|---|
| `20260422000002_user_streaks.sql` | `user_streaks` + auto-create trigger |
| `20260422000003_assessments.sql` | `assessments` + demote-previous trigger |
| `20260422000004_relationships.sql` | `relationships` + invite_code index |
| `20260422000005_journal.sql` | `journal_prompts` + `journal_entries` (encrypted) |

Apply via Supabase SQL Editor (see `supabase/migrations/README.md`).

## Migration policy

- All schema changes go through `supabase/migrations/` as versioned SQL files
- Apply via Supabase Dashboard → SQL Editor (or `supabase db push` if CLI is configured)
- Never alter a production table directly from the dashboard — always via migration files
- New tables require RLS policy before `is_published` is set to true

---

## Indexes

Critical indexes (add as tables grow):

```sql
-- lesson_progress: user's lesson history
CREATE INDEX ON lesson_progress(user_id, completed_at DESC);

-- user_streaks: quick streak lookup on login
-- Primary key covers this (user_id is PK)

-- daily_observations: today's feed
CREATE INDEX ON daily_observations(enneagram_type, scheduled_for);
```
