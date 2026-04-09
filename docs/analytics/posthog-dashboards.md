# PostHog Dashboards — Setup Guide

A copy-pasteable guide to build the 5 critical dashboards for Thyself, using the events already wired in `src/lib/posthog.ts`.

## Prerequisite

You should already have:
- PostHog account at https://us.posthog.com
- `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` set as env vars (local `.env.local` + Vercel production)
- The app live and receiving events (verify in PostHog → Live events)

---

## Dashboard 1 — Onboarding Funnel

**Why:** Shows where new users drop off. The single highest-leverage retention insight.

**Events in order:**
1. `quiz_started` (assessment = onboarding_quick)
2. `quiz_completed`
3. `type_revealed`
4. `onboarding_completed`

**Build steps:**
1. PostHog → Insights → New insight → **Funnel**
2. Add steps in the order above
3. Conversion window: 1 hour
4. Breakdown by: `enneagramType` (to see per-type drop-off)
5. Time range: last 30 days, rolling
6. Save as "Onboarding Funnel"
7. Pin to dashboard: "Acquisition" (create if doesn't exist)

**What to look for:**
- Drop between `quiz_started` → `quiz_completed`: if > 40%, the quiz is too long or confusing
- Drop between `type_revealed` → `onboarding_completed`: if > 30%, the email gate is too aggressive
- Any type with significantly worse completion: copy may not resonate for that type

---

## Dashboard 2 — Retention by Type

**Why:** Find out which types stick around and which churn. Lets you prioritize type-specific content.

**Steps:**
1. PostHog → Insights → New insight → **Retention**
2. Starting event: `onboarding_completed`
3. Returning event: `daily_completed` OR `passion_checkin_completed` OR `$pageview`
4. Breakdown by: `enneagramType` (person property)
5. Rolling window: Day 1, 7, 14, 30
6. Save as "Retention by Type"
7. Pin to dashboard: "Retention"

**Expected benchmarks:**
- Day 1 return: > 50% (anything under = onboarding too heavy)
- Day 7 return: > 25% (the hook test)
- Day 30 return: > 10% (the habit test)
- Type 4, 5, 9 typically highest retention (introverted, reflective)
- Type 3, 7, 8 typically lowest (need more novelty)

---

## Dashboard 3 — Mirror Engagement

**Why:** Mirror is your most distinctive feature. Are users actually using it?

**Metrics:**

**Insight 1 — Funnel:**
- `mirror_viewed` → `mirror_analyzed`
- Good conversion: > 40%
- Bad conversion: < 15% (page isn't landing)

**Insight 2 — Trends:**
- Event: `mirror_analyzed`
- Breakdown by: `confidence` (very low / low / medium / high)
- Breakdown by: `enneagramType`
- Time range: last 30 days

**Insight 3 — Averages:**
- Event: `mirror_analyzed`
- Math: average of `wordCount`
- Good: > 300 (people writing enough for real signal)
- Bad: < 150 (people testing with too little text)

**Save all three to dashboard: "Mirror"**

---

## Dashboard 4 — Sharing & Virality

**Why:** Tracks the Co-Star-style growth lever. If this doesn't work, you need to invest elsewhere.

**Insight 1 — Funnel (share conversion):**
- `identity_card_viewed` → `identity_card_shared` OR `identity_card_downloaded`
- Good: > 20%
- Bad: < 5%

**Insight 2 — Share method breakdown:**
- Event: `identity_card_shared`
- Breakdown by: `method` (native_file / native_text / clipboard)
- Shows if iOS native sheet is getting used vs desktop clipboard fallback

**Insight 3 — Share-to-install (requires UTM):**
- You'll need to add `?ref=share` to identity card URLs
- Then filter pageviews with `utm_source == share`
- Track from share event to new `onboarding_completed` with UTM

**Save to dashboard: "Growth"**

---

## Dashboard 5 — Monetization

**Why:** The signal acquirers want to see.

**Insight 1 — Revenue trend:**
- Event: `purchase_completed`
- Math: total of `amount` (numeric property — add it to your purchase events)
- Time range: rolling 30 days

**Insight 2 — Purchase by type:**
- Event: `purchase_completed`
- Breakdown by: `enneagramType`
- Tells you which types actually convert
- Expected: high-Neuroticism types (4, 6) and high-Conscientiousness (1, 3) convert most; high-Openness (5, 7) explore more but pay less

**Insight 3 — Pack popularity:**
- Event: `purchase_completed`
- Breakdown by: `pack_id` (starter / popular / mega / ultimate)
- Shows which headline copy is working

**Save to dashboard: "Revenue"**

---

## Property Setup — once per person

PostHog stores **person properties** that persist across all events. These are set via `setUserProperty()` in the instrumentation.

**Currently set (from instrumentation):**
- `enneagramType` (number 1-9)
- `instinct` (string "sp" | "sx" | "so" | null)
- `firstTypeDate` (ISO date string)
- `hasCompletedDeepAssessment` (boolean)

**To add later (manual, in settings page):**
- `email` (for cross-identifying when user signs up)
- `displayName`
- `platform` (web / ios / android — detect via Capacitor)

**Use these for:**
- Funnel breakdowns (every chart above can be segmented by type)
- Email campaign triggers (e.g., "all users who are type 5 and haven't done deep assessment")
- Cohort analysis (users who signed up in week X vs week Y)

---

## Live events to watch during your first week

In PostHog → Activity → Live events, watch for:

✅ Expected events firing:
- `$pageview` — every page load
- `quiz_started` / `quiz_completed` — when testing onboarding
- `type_revealed` — on quiz result
- `mirror_viewed` / `mirror_analyzed` — on Mirror page
- `identity_card_viewed` / `identity_card_shared` — on Identity card
- `passion_checkin_completed` — daily ritual
- `$set` — tagging users with enneagramType

❌ Red flags:
- Zero events firing = PostHog not initialized (check `NEXT_PUBLIC_POSTHOG_KEY` env var is set on Vercel)
- Events firing without `enneagramType` property = user completed quiz but `setUserProperty` didn't run (check onboarding handleAssessmentComplete)

---

## Monthly review ritual

Once a month, go through these dashboards and ask:
1. **Onboarding Funnel** — Is the drop-off getting better or worse? Is any type disproportionately dropping?
2. **Retention** — Which types are sticking? Which are churning? Can I make type-specific content for the churners?
3. **Mirror** — Are people actually using it? Is the word count going up or down?
4. **Growth** — Shares per view trending up or down? Is the Identity Card driving real traffic?
5. **Revenue** — $ per user trending up? Which pack is winning?

Screenshot each dashboard, drop into a monthly note, write 3 bullets: what's working, what's not, what to try next month.

---

## Alternative — add PostHog webhook → Slack

If you're checking dashboards daily, consider setting up a Slack notification for key events:
- New `purchase_completed` → Slack ping (celebrate revenue)
- New `onboarding_completed` → daily digest count
- Any error event → immediate alert

PostHog → Settings → Integrations → Slack
