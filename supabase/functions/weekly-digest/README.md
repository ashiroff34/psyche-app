# Weekly Digest — Supabase Edge Function

A type-aware weekly reflection email that goes out once a week to users who opted in.

## What you'll need

1. **Resend account** — sign up at https://resend.com (3,000 emails/month free)
2. **Verified sending domain** — add your domain in Resend's dashboard, verify DNS records
3. **Supabase project** — you already have this
4. **Supabase CLI** — `brew install supabase/tap/supabase`

## Setup steps

### 1. Add a `weekly_digest_opt_in` column to your `profiles` table

In the Supabase SQL editor:

```sql
alter table profiles add column if not exists weekly_digest_opt_in boolean default false;
alter table profiles add column if not exists enneagram_type integer;
alter table profiles add column if not exists display_name text;
```

(Skip any columns you already have.)

### 2. Set the edge function secrets

In the Supabase dashboard → Edge Functions → Settings → Secrets:

```
RESEND_API_KEY=<your Resend API key>
RESEND_FROM_EMAIL=reflections@thyself.app  (or whatever you verified)
```

### 3. Deploy the function

From the project root:

```bash
supabase login              # first time only
supabase link --project-ref <your-project-ref>
supabase functions deploy weekly-digest
```

### 4. Schedule it via pg_cron

In the Supabase SQL editor:

```sql
-- Enable required extensions (idempotent)
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Schedule: every Sunday at 2pm UTC (adjust as needed)
select cron.schedule(
  'weekly-digest',
  '0 14 * * 0',
  $$
  select net.http_post(
    url := 'https://<your-project-ref>.supabase.co/functions/v1/weekly-digest',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer <your-anon-key>'
    ),
    body := '{}'::jsonb
  );
  $$
);
```

### 5. Test it manually

```bash
curl -X POST https://<your-project-ref>.supabase.co/functions/v1/weekly-digest \
  -H "Authorization: Bearer <your-anon-key>"
```

You should get back `{"sent": N, "failed": 0, "errors": []}`.

### 6. Wire the opt-in UI

The opt-in checkbox needs to go on `/settings` (or similar) with a simple Supabase update:

```typescript
await supabase
  .from("profiles")
  .update({ weekly_digest_opt_in: true, email: user.email })
  .eq("id", user.id);
```

See `src/app/settings/page.tsx` for the opt-in toggle UI (added in the same commit as this function).

## What gets sent

Every Sunday at 2pm UTC, each opted-in user receives a type-aware reflection prompt:

- **Type 1**: "Your week, by the standard"
- **Type 2**: "Who did you carry this week?"
- **Type 3**: "The version of you that landed — and the one that didn't"
- **Type 4**: "The feeling you didn't quite name"
- **Type 5**: "What you rationed this week"
- **Type 6**: "What your brain kept checking for"
- **Type 7**: "What you almost kept running from"
- **Type 8**: "What you protected this week"
- **Type 9**: "What got smoothed over"

Each email includes:
- Type-specific subject
- Greeting (uses display name if set)
- One reflection prompt (type-specific, from `REFLECTIONS` constant)
- CTA button → journal page
- Manage-preferences footer link

## Analytics to track

Add these PostHog events once the function is running:
- `weekly_digest_sent` — per recipient, with type
- `weekly_digest_opened` — via Resend webhook
- `weekly_digest_clicked` — when user clicks CTA

## Cost estimate at 10K users

- 10K users × 4 weeks/month = 40K emails/month
- Resend free tier: 3K/month
- Resend Pro: $20/month for 50K emails
- Worst case: $20/month. Negligible.
