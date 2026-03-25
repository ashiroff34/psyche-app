# AI Coordination Log — Thyself App

**Purpose:** This file is a shared coordination log between multiple Claude Code sessions working on the same project. Before making changes, read this file. After making changes, update it.

---

## Session: Assessment Overhaul (March 25, 2026)

### What was done:

**1. Removed from Enneagram Assess Page (`/enneagram/assess`):**
- This or That assessment mode
- Scenario Mode assessment mode
- All imports of `ThisOrThat` and `ScenarioAssessment` from this page
- All related handlers (`handleThisOrThatComplete`, `handleScenarioComplete`)

**2. Added Self-Identification as recommended first option on `/enneagram/assess`:**
- Uses `SelfIdentification` component from `@/components/assessments/SelfIdentification.tsx`
- Amber "Recommended" badge, full-width card at top
- Saves type via `updateProfile({ enneagramType })` + XP

**3. Created new "Type Assessments" hub page (`/assessments`):**
- Sub-tabs: Enneagram | Jungian | Scientific
- All assessments listed with badges (Recommended, Most Scientific)
- Added to Navigation More menu as "Type Assessments" with Zap icon

**4. Created 7 new assessment data files in `src/data/assessments/`:**
- `essential-enneagram.ts` — 9 paragraphs + 14 narrowing questions
- `ieq9-style.ts` — 175 Likert items (core 90, wing 36, instinct 30, stress/growth 19)
- `personality-path.ts` — 83 questions across 6 adaptive rounds
- `michael-caloz.ts` — 12 sections × 9 statements = 108 items
- `mistype-investigator.ts` — 11 pairs × ~8 questions = 93 items
- `big-five.ts` — 120 IPIP-NEO items (24 per factor, 6 facets each)
- `cognitive-type.ts` — 80 items (10 per function) + type stacks

**5. Created 6 reusable assessment components in `src/components/assessments/`:**
- `SelfIdentification.tsx` — Enneagram self-ID guided flow
- `JungianSelfIdentification.tsx` — Jungian/cognitive self-ID guided flow
- `ParagraphAssessment.tsx` — paragraph identification UI
- `LikertAssessment.tsx` — reusable 1-5 Likert scale
- `StructuredAssessment.tsx` — section-based rating (Caloz-style)
- `AdaptiveAssessment.tsx` — multi-round progressive assessment
- `MistypeInvestigator.tsx` — type-pair comparison tool
- `AssessmentGuide.tsx` — pre-assessment "how to take this" guide (6 tips)

**6. Created 8 assessment route pages in `src/app/assessments/`:**
- `/assessments` — hub page with sub-tabs
- `/assessments/essential-enneagram`
- `/assessments/ieq9-integrative`
- `/assessments/personality-path`
- `/assessments/michael-caloz`
- `/assessments/mistype-investigator`
- `/assessments/big-five` (inline results, no separate results page)
- `/assessments/cognitive-type`
- `/assessments/jungian-self-id`

**7. Removed ALL Anthropic AI from the app:**
- Deleted `/api/ai-insight/route.ts`
- Removed AI fetch calls from: `daily/page.tsx`, `profile/page.tsx`, `journal/page.tsx`, `enneagram/learn/page.tsx`
- Replaced daily AI insight with 1,000 curated static insights

**8. Created 1,000 daily insights in `src/data/`:**
- `daily-insights-1.ts` — insights 1-250
- `daily-insights-2.ts` — insights 251-500
- `daily-insights-3.ts` — insights 501-750
- `daily-insights-4.ts` — insights 751-1000
- `daily-insights-index.ts` — central index with `getTodayInsight()` helper

**9. Modified existing files:**
- `src/components/Navigation.tsx` — Added "Type Assessments" to More menu; SwipeNavigator changed from overlay div to document event listeners (fixes click-blocking bug)
- `src/hooks/useProfile.ts` — Added `bigFiveScores`, `selfIdentified`, `assessmentHistory` to PsycheProfile interface
- `src/app/enneagram/assess/page.tsx` — Removed This or That + Scenario, added Self-ID
- `src/app/daily/page.tsx` — Replaced AI insight with static daily insights from curated collection

**10. Assessment Guide shows before every assessment:**
- 6 research-backed tips (from RHETI, Chestnut, response bias research)
- Users can skip if they want

---

## Files to be careful with (modified by this session):
- `src/components/Navigation.tsx`
- `src/hooks/useProfile.ts`
- `src/app/enneagram/assess/page.tsx`
- `src/app/daily/page.tsx`
- `src/app/profile/page.tsx`
- `src/app/journal/page.tsx`
- `src/app/enneagram/learn/page.tsx`

**If you need to edit these files, READ THEM FIRST to see current state.**

---

## Session: UX Polish + Capacitor + Bug Fixes (March 24-25, 2026)

### What was done:

**1. Capacitor setup for iOS/Android App Store:**
- Installed @capacitor/core, @capacitor/ios, @capacitor/android + native plugins
- Configured next.config.ts for static export (`output: "export"`)
- Moved API routes to `api-backend/` (separate from static build)
- Added PWA manifest.json, native meta tags
- Generated iOS and Android native projects
- Build scripts: `build:ios`, `build:android`, `cap:ios`, `cap:android`

**2. Fixed all framer-motion opacity:0 bugs (21 files):**
- Every `initial={{ opacity: 0 }}` outside AnimatePresence changed to `opacity: 1`

**3. Fixed 5 critical gamification bugs:**
- Dual XP system (quiz XP now writes to both stores)
- Dual pet system unified
- Store token claims matched to actual code
- 11 broken badges now have working triggers
- Streak increments from quizzes

**4. Assessment scoring verification:**
- All 9 assessments verified accurate against external sources
- Fixed double-counting bug in Michael Caloz StructuredAssessment.tsx

**5. Tutorial system:**
- Slideshow tutorial with real screenshots
- Skip button + swipe navigation
- Auto-plays for new users after onboarding

**6. Navigation overhaul:**
- Bottom tab bar (Duolingo-style): Home, Daily, Pet, Store, Profile
- Back button always present with localStorage page history
- Swipe between tabs globally
- Explore dropdown for all other pages

**7. 450 daily quiz questions + 450 growth prompts:**
- `src/data/type-quizzes.ts` (7,665 lines)
- `src/data/daily-practices.ts` (461 lines)
- `src/data/rewards.ts` + `src/components/DailyQuiz.tsx`
- `src/app/enneagram/quiz/page.tsx` (full 50-question quiz per type)

**8. Settings page + email reminders:**
- `/settings` with profile, notifications, app prefs, account sections
- Resend API integration for daily reminder emails
- Bug report in Settings + Explore menu

**9. Ouroboros logo (user's custom SVG):**
- Replaced Psi symbol with user's traced ouroboros snake
- Applied across entire app

**10. Renamed app: Psyche → Archetype → Thyself**

### Files modified by this session:
- `src/components/Navigation.tsx` (major rewrite — bottom tabs, back button, swipe)
- `src/app/daily/page.tsx` (quiz system, then restored old layout)
- `src/app/page.tsx` (home page states, tutorial integration)
- `src/app/onboarding/page.tsx` (tutorial auto-start, terms acceptance)
- `src/components/Tutorial.tsx` (slideshow tutorial)
- `src/app/settings/page.tsx` (new)
- `src/app/compare/page.tsx` (removed compatibility score)
- `src/app/profile/page.tsx` (hooks fix)
- `src/app/cognitive/results/page.tsx` (JSON.parse fix)
- `src/components/assessments/StructuredAssessment.tsx` (double-counting fix)
- `next.config.ts` (static export)
- `capacitor.config.ts` (new)
- All 21 page files (opacity:0 fixes)

---

## Session: Bug Scanner & Monitoring (March 25, 2026)

### What was done:

**1. Full app health audit — 30+ routes tested:**
- All 17 core routes return 200 OK: `/`, `/daily`, `/enneagram`, `/enneagram/assess`, `/enneagram/learn`, `/cognitive`, `/cognitive/assess`, `/cognitive/learn`, `/compare`, `/journal`, `/dashboard`, `/store`, `/game`, `/avatar`, `/profile`, `/history`, `/correlations`
- All 8 assessment routes return 200 OK: `/assessments`, `/assessments/essential-enneagram`, `/assessments/ieq9-integrative`, `/assessments/personality-path`, `/assessments/michael-caloz`, `/assessments/mistype-investigator`, `/assessments/big-five`, `/assessments/cognitive-type`, `/assessments/jungian-self-id`
- Additional routes verified: `/settings`, `/onboarding`, `/enneagram/quiz?type=4`, `/enneagram/results`, `/cognitive/results`

**2. Interactive testing completed:**
- All bottom nav links (Home, Daily, Pet, Store, Profile) → correct destinations
- All Explore menu links → correct destinations
- Assessment hub: Enneagram/Jungian/Scientific tabs switch correctly
- Self-Identification flow: button → AssessmentGuide → works
- Enneagram learn: type selection, accordion expand, tab switching (Instinctual Variants, Stackings, Tritypes, Deep Systems) — all work
- Cognitive learn: 8 Functions / 16 Types toggle, function card click (Ni detail) — works
- Compare: type selection in both panels, Swap button — works
- Journal: type selection shows prompts — works
- Dashboard: Growth/Stress toggle — works
- Daily: Today's Practice / Deep Learning / My Stats tabs — work
- Store: Buy buttons, subscription toggle — work
- Game: Feed/Treat pet buttons — work

**3. Bugs found and status:**

| Bug | Severity | Status |
|-----|----------|--------|
| `daily-insights-index.ts` importing missing files (1 & 4) | Critical (crashed all routes) | FIXED — files were being created by another session; clean `.next` rebuild resolved |
| `/api/subscribe-reminders` and `/api/subscribe` — 404 (routes in api-backend/ not served) | Low | KNOWN — silently fails with try/catch. Caused by Capacitor static export moving API routes out |
| 4 `href="#"` links on home page (locked path items) | None | BY DESIGN — locked "Streak" and "Advanced" path nodes |
| Webpack `.next` cache degrades over extended dev sessions | Infra | KNOWN — Next.js dev server issue. Fix: periodic `rm -rf .next` |

**4. API issues identified:**
- `src/app/settings/page.tsx:316` — `fetch("/api/subscribe-reminders")` → 404 (route in api-backend/, not served by Next.js)
- `src/app/onboarding/page.tsx:576` — `fetch("/api/subscribe")` → 404 (same reason)
- Both have silent error handling (try/catch {} or fire-and-forget) so they don't crash
- All Anthropic AI calls were already removed by the Assessment Overhaul session
- No `process.env` references remain in source
- No broken imports found

**5. Infrastructure actions (no source code modified):**
- Wiped corrupted `.next` caches multiple times during monitoring
- Copied `favicon-32.png` to correct public directory (Ferrero Website copy only)
- Started/restarted dev server on port 3001 via `psyche-dev` launch config

### Files modified by this session:
- **NONE** — this session only monitored and diagnosed. No source code was changed.
- This coordination file (`AI_COORDINATION.md`) was updated with findings.

---

## How to use this file:
1. Before starting work, read this file
2. Check if the files you want to edit were modified by another session
3. After completing work, add your changes below with a date/time header
