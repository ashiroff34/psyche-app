# Supabase Migrations

Schema migrations for Thyself. Each file corresponds to a dev priority.

## How to apply

The Thyself project uses Supabase via URL + anon key (not Supabase CLI). Apply migrations manually:

1. Go to [Supabase Dashboard](https://app.supabase.com) → your project → SQL Editor
2. Open the migration file
3. Paste and run the SQL
4. Verify the table exists in Table Editor

> Optional: If you set up `supabase init` and link a project, you can use `supabase db push` instead.

---

## Migration files

| File | Priority | Status | What it creates |
|---|---|---|---|
| `20260422000002_user_streaks.sql` | Priority 2 | READY TO APPLY | `user_streaks` table, RLS, auto-create trigger, updated-at trigger |
| `20260422000003_assessments.sql` | Priority 3 | READY TO APPLY | `assessments` table, RLS, demote-previous trigger |
| `20260422000004_relationships.sql` | Priority 4 | READY TO APPLY | `relationships` table, RLS, invite_code unique index |
| `20260422000005_journal.sql` | Priority 5 | READY TO APPLY | `journal_prompts` + `journal_entries` (encrypted), strict RLS |

---

## Migration order

Apply in filename order (they're numbered sequentially). Each migration is self-contained with `create table if not exists` so re-running is safe.

---

## After applying

Update `docs/runbooks/data-model.md` — change table status from "Planned" to "Live".

Update session memory: `~/.claude/projects/.../memory/project_thyself_session_state.md` — mark the priority as "table created."
