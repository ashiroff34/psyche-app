# Architecture Runbook — Thyself

**Last updated:** 2026-04-22
**For:** Engineering diligence, integration planning, new team members

---

## Overview

Thyself is a typology learning app (Enneagram, Jungian cognitive functions, Big Five) built as a Next.js web app with a Capacitor shell for iOS/Android.

**Stack:**
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Database:** Supabase (PostgreSQL + auth + real-time + storage)
- **Hosting:** Vercel (web — manual deploy via `npx vercel --prod --yes`), App Store + Google Play (mobile)
- **Mobile shell:** Capacitor (web-to-native bridge)
- **Analytics:** PostHog (in-flight as of April 2026)
- **Payments:** RevenueCat (planned — Priority 7)
- **AI content:** Claude API (anthropic SDK) — content generation system prompt in `.claude/CONTENT_SYSTEM.md`

---

## Directory structure

```
psyche-app 2/
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (auth)/        # Login, signup, onboarding
│   │   ├── admin/         # Admin dashboard (PostHog, content management)
│   │   ├── api/           # API routes (Supabase server actions)
│   │   ├── daily/         # Daily observation feed
│   │   ├── enneagram/     # Enneagram SEO landing pages
│   │   ├── cognitive-functions/ # MBTI/cognitive function pages
│   │   ├── compatibility/ # Compatibility pages
│   │   ├── lessons/       # Guided learning modules
│   │   └── quiz/          # Assessment flow
│   ├── components/        # Shared UI components
│   │   ├── ui/            # Base design system (buttons, cards, inputs)
│   │   └── [feature]/     # Feature-specific components
│   ├── data/              # Static type data
│   │   └── enneagram.ts   # TYPE_COLORS, type metadata (canonical source)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities, Supabase client, analytics
│   └── types/             # TypeScript type definitions
├── docs/
│   ├── runbooks/          # This directory — operational docs
│   ├── analytics/         # PostHog dashboards and cohort configs
│   └── app-store/         # App Store screenshots, metadata
├── ios/                   # Capacitor iOS project
├── android/               # Capacitor Android project
└── supabase/              # Supabase migrations and config
```

---

## Data flow

```
User → Vercel Edge → Next.js Server → Supabase (Postgres + RLS)
                                    ↓
                              PostHog (events)
                                    ↓
                        RevenueCat (purchases) [planned]
```

**Authentication:** Supabase Auth (magic link + OAuth). Session stored in `supabase.auth.session`. All API routes validate via `supabase.auth.getUser()`.

**Row-Level Security:** every Supabase table has RLS enabled. Users can only read/write their own rows. Exception: `enneagram_types`, `lessons` (read-only public tables).

---

## Key design decisions

### TYPE_COLORS is the single source of truth
All Enneagram type colors are defined in `src/data/enneagram.ts` and imported wherever needed. Never hardcode hex values — always `import { TYPE_COLORS } from '@/data/enneagram'`.

### No `as any` policy
TypeScript strict mode is on. All types are explicit. Any `as any` cast is a bug to fix (tracked by `/research-loop`).

### Date handling
All dates use `Intl.DateTimeFormat("en-CA")` for local-timezone formatting. Never use `new Date("YYYY-MM-DD")` (UTC midnight bug).

### Content accuracy
All psychological content (Enneagram descriptions, cognitive function explanations, Big Five correlations) follows the source hierarchy: Ichazo → Naranjo → Riso-Hudson → Fauvre. The `blinky` AI agent fact-checks all content before it ships.

---

## Key tables (Supabase)

| Table | Purpose | Status |
|---|---|---|
| `profiles` | User profile, type results, onboarding state | Live |
| `lessons` | Learning content (Enneagram, Jungian, Big Five) | Live |
| `lesson_progress` | Per-user lesson completion | Live |
| `daily_observations` | Daily type observation feed | Live |
| `user_streaks` | Streak tracking (Priority 2) | Planned |
| `assessments` | Proprietary assessment results (Priority 3) | Planned |
| `relationships` | Compatibility connections (Priority 4) | Planned |
| `journal_entries` | Encrypted journal (Priority 5) | Planned |

---

## Third-party integrations

| Service | Purpose | Auth method |
|---|---|---|
| Supabase | DB, auth, storage, real-time | Service role key (server-side) |
| Vercel | Hosting, edge functions, preview deploys | GitHub OAuth |
| PostHog | Product analytics | POSTHOG_KEY env var |
| RevenueCat | Subscription payments | SDK (planned) |
| Capacitor | iOS/Android shell | Native SDK |

---

## Scaling considerations

- **Current traffic:** Early-stage. Supabase free tier is sufficient.
- **When to upgrade Supabase:** >500 concurrent connections, or >7 GB database, or when >100K MAU.
- **Vercel Pro:** needed when: >100GB bandwidth/month, or when ISR revalidation < 60s is required, or when team adds second developer.
- **CDN:** Vercel handles this automatically. No Cloudflare needed unless custom headers are required.
