# Behavioral Hooks Radar — 2026-09-09

Audit of Thyself's retention psychology against the six levers Duolingo / Headspace / Noom
use to drive daily habit. Non-interactive scheduled run — report only, no code changed.

**Verdict: all six hooks wired on the live surface. Retention foundation is solid.**
No implementation performed — there was no hook gap to close. One non-hook finding
(dead code holding a stale streak hero) is logged below for founder sign-off.

---

## Hook-by-hook

### 1. Loss aversion (streak fear) — WIRED (strong)
The 3-layer stack is intact and has been tightened since the July pass:
- `src/components/streak/StreakCard.tsx:38` — passive at-risk state, evening-only
  (`streak > 0 && !dailyCompleted && hours >= 18`), suppressed once the daily goal is met
- `src/components/streak/StreakCard.tsx:49-57` — 8pm push scheduled on app open with an
  unmet goal, and tomorrow's warning pre-scheduled once today is done, so the absent user
  is still reachable
- `src/components/daily/HubView.tsx:423-431` — `StreakSaver` modal at streak >= 3, evening,
  goal unmet, once-per-day dismissal
- `src/components/ComebackModal.tsx` — graduated post-absence recovery with per-type copy
  and streak-reset acknowledgment (`:277`)
- Personal-best anchoring present at `HubView.tsx:1018` and `QuizFullscreen.tsx:565-577`

No gap.

### 2. Variable reward schedule — WIRED
- `src/components/daily/TokenDropOverlay.tsx:42-55` — true variable-ratio drop
  (`rollTokenDrop`: drop chance roll, then a 3-tier amount roll), mounted in
  `QuizFullscreen.tsx:642` so it fires inside the core daily loop
- Daily insight / challenge / community voice rotate deterministically by day-of-year
  (`src/app/daily/page.tsx:1040-1046`). Deterministic is correct here — a "daily" that
  changes on refresh reads as broken, not delightful.

No gap.

### 3. Identity reinforcement — WIRED (strong)
Type identity is threaded through the daily loop, not just the profile:
- `src/app/daily/page.tsx:1042-1046` — type-specific insight, challenge, and peer voice
- `:1066-1067` — quiz pool filtered to `typeSpecific` questions
- `:1514, :1527, :1738` — shadow modal, morning observation, and welcome all type-keyed
- `ComebackModal.tsx:26-41` — return copy differs per type (a One returns carrying a broken
  standard; a Nine braced for pressure)

No gap.

### 4. Progress illusion — WIRED (strong)
- `src/components/daily/HubView.tsx:439-448` — 52-week activity heatmap read from
  `psyche-activity-log`, so the user sees distance covered, not only work remaining
- XP, tokens, hearts, daily percentage, and the lesson path all render persistent progress

No gap.

### 5. Social proof — WIRED (thin, unchanged from July)
- `src/app/page.tsx:273` — "Thousands of people mapping their psyche" (static)
- `src/data/community-voices.ts` + `daily/page.tsx:2903` — one peer voice per day, per type
- `src/components/RarityCard.tsx` — cross-framework rarity ("1 in N"), the strongest
  proof asset and a genuine differentiation moat

Still the softest of the six, and still for the same reason: strengthening it honestly
requires real aggregate counts. Inventing "X people discovered their type this week" is a
brand-honesty and diligence risk. Recommend leaving as-is until PostHog aggregates can
back a real number.

### 6. Endowed progress — WIRED (strong)
- `src/app/page.tsx:362` — pre-filled 14% bar on the entry screen (Nunes & Dreze 2006)
- `src/app/onboarding/page.tsx:239, 250, 504` — non-zero mastery number + "Achievement
  Unlocked" card 1.5s after the type reveal
- `src/components/daily/HubView.tsx:450-458` — first-hub-visit head-start banner when the
  user already carries XP from assessments

No gap.

---

## Non-hook finding: dead dashboard in `src/app/page.tsx`

`DashboardScreen` (`src/app/page.tsx:653-992`, ~340 lines) is defined but never rendered.
`HomePage` redirects `state === "dashboard"` to `/daily` (`:1000-1002`) and the early return
at `:1005` catches that state before any render. `dashboardTypeQuotes`,
`dashboardCommunityNotes`, and `getTodayInsight` are referenced only from this dead block.

Why it matters here: the dead block contains a Streak Hero (`:790-812`) with **no at-risk
state and no personal-best line** — it renders the same warm orange flame at 10pm with the
goal unmet as it does at 8am. It is unreachable today, so there is zero user impact, but it
is a trap: anyone reviving the root dashboard would ship a streak surface that silently
undoes hook 1.

Not fixed autonomously — a 340-line deletion is a founder call, and it is outside this
task's remit. Logged as a follow-up.

---

## Actions taken

None. All six hooks present; no implementation was warranted.
