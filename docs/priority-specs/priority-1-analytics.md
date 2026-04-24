# Priority 1 — Analytics: Implementation Spec

**Status:** ~80% DONE (as of 2026-04-22)
**Remaining blocker:** `NEXT_PUBLIC_POSTHOG_KEY` is empty in `.env.local` and Vercel production env vars

---

## What's already built

| Component | File | Status |
|---|---|---|
| PostHog client | `src/lib/posthog.ts` | ✓ Done — EVENTS enum, identify, capture, reset |
| Typed analytics wrapper | `src/lib/analytics.ts` | ✓ Done — typed track(), platform detection, version |
| Admin dashboard | `src/app/admin/page.tsx` | ✓ Done — metrics dashboard with PostHog embeds |
| PostHog dashboards guide | `docs/analytics/posthog-dashboards.md` | ✓ Done — 5 dashboards documented |
| Event calls in codebase | Various | ✓ Partial — 29 posthog.capture + 14 EVENTS. calls |

---

## What's remaining (human action required)

### Step 1: Create PostHog account and project

1. Go to https://app.posthog.com → sign up / log in
2. Create new project: "Thyself"
3. Copy your Project API Key

### Step 2: Add key to local dev

Edit `.env.local`:
```
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_KEY_HERE
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Restart dev server: `npx next dev -p 3003`

### Step 3: Verify events are firing

1. Open the app → do an action (start quiz, complete daily)
2. PostHog dashboard → Activity → Live events
3. Should see `quiz_started`, `daily_completed`, etc. within 30 seconds

### Step 4: Add key to Vercel production

1. Vercel dashboard → Project → Settings → Environment Variables
2. Add `NEXT_PUBLIC_POSTHOG_KEY` = your key
3. Add `NEXT_PUBLIC_POSTHOG_HOST` = `https://us.i.posthog.com`
4. Redeploy: `npx vercel --prod --yes`

### Step 5: Build the 5 PostHog dashboards

Follow `docs/analytics/posthog-dashboards.md` to build:
1. Onboarding Funnel
2. Retention by Type
3. Mirror Engagement
4. Sharing & Virality
5. Monetization

---

## Events that are NOT yet fired (gaps found in codebase)

These events are defined in the EVENTS enum but may not be called anywhere:
- `STREAK_MILESTONE` — needs Priority 2 (streak) to be built first
- `LESSON_COMPLETED` — check if called in `src/app/lessons/`
- `ARC_COMPLETED` — check if called in lesson arc completion flow
- `PRO_SUBSCRIBED` — needs Priority 7 (paywall) to be built first

Verify coverage: `grep -rn "EVENTS\." src/ --include="*.ts" --include="*.tsx"`

---

## Supabase materialized views (optional, for admin dashboard)

The admin page mentions `mv_dau_mau` and `mv_retention_cohorts`. These are PostHog-powered for now (no Supabase views needed at early stage). Build if PostHog direct embeds become too slow.

---

## Diligence artifact

The `/admin` route + PostHog dashboards are the primary diligence artifact for Priority 1. When an acquirer asks "show me your engagement metrics," share the admin page password and PostHog dashboard links.
