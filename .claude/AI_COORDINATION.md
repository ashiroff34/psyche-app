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

## Session: Full App Bug Audit + Opacity Fix (March 26, 2026)

### What was done:

**1. Fixed Daily page blank-on-load (critical visual bug):**
- Root cause: `HubView.tsx` had all permanent content sections with `initial={{ opacity: 0 }}` in framer-motion. Combined with the `if (!loaded) return null` guard, every page load caused a 1-2 second blank flash.
- Fix: Changed all permanent-content `motion.div` elements from `initial={{ opacity: 0, ... }}` → `initial={{ opacity: 1, ... }}`
- Kept all `AnimatePresence` children with `opacity: 0` (they animate in/out intentionally)

**2. Fixed duplicate `"use client"` in HubView.tsx:**
- Lines 1 AND 3 both had `"use client"` — removed the duplicate

**3. Fixed QuizFullscreen.tsx self-competition badge opacity:**
- Badge section outside AnimatePresence had `initial={{ opacity: 0, y: 6 }}` → changed to `initial={{ opacity: 1, y: 0 }}`

**4. Full 14-page interactive audit — all pages verified working:**
- Home, Daily (Hub/Path/Reading/Quiz), Enneagram, Assess, Learn, Cognitive, Compare, Journal, Dashboard, Store, Game, Avatar, Profile, History, Settings
- Node tap → NodeBottomSheet → QuizFullscreen → answer → XP toast → Correct explanation: all working
- Zero console errors after fixes (only the known XPCelebration hooks order warning, non-crashing)

**5. Committed all fixes + uncommitted work from other sessions:**
- Commit `6e03c22`: "Fix Daily page opacity flash + audit all app pages"
- 37 files changed, 4309 insertions(+), 117 deletions(-)

### Files modified by this session:
- `src/components/daily/HubView.tsx` — removed duplicate "use client", fixed opacity:0 initial states
- `src/components/daily/QuizFullscreen.tsx` — fixed badge opacity:0 outside AnimatePresence

### Known issues (not fixed, low priority):
- `XPCelebration` hooks order warning in console — non-crashing, from `useGameState`'s 31+ hooks
- `/api/subscribe-reminders` and `/api/subscribe` → 404 (routes in api-backend/ not served by Next.js dev server; both have silent try/catch)

---

## Session: Pet System, Shop, Hat Layering, Deployment (March 26, 2026)

### What was done:

**1. AnimatedPet.tsx — new PNG-based pet component:**
- Replaced `PetSprite` (SVG) with `AnimatedPet` in `src/components/AnimatedPet.tsx`
- Loads `/public/pets/pet-{type}.png` (9 Masko-generated chibi PNGs, 512×512 RGBA)
- Applies CSS mood filters (brightness/saturate/sepia/grayscale) per pet status
- Layers hat PNG on top using absolute positioning (top: -4.5%, left: 50% + translateX, width: 68%)
- Hat calibrator tool at `/public/hat-calibrator.html` for visual positioning

**2. Shop hat PNGs:**
- `/public/shop/hat-crown.png`, `hat-wizard.png`, `hat-flower.png`, `hat-santa.png`, `hat-catears.png`
- Shop cards now show actual PNGs instead of emoji (via `png` field on `OutfitItem`)
- Outfit slots also show PNGs for equipped hats

**3. Inventory + equipping fixes:**
- Auto-equip on purchase: buying an item immediately equips it
- Collapsible "Inventory" section on avatar page shows all owned items with equip/unequip buttons
- `OutfitItem` type in `usePetState.ts` gained optional `png` field

**4. Pet sync fix (daily tab):**
- Daily page previously loaded pet state once from localStorage on mount (stale)
- Fixed: daily page now uses `usePetState` hook directly — pet widget is always live

**5. Onboarding + Tutorial UX:**
- Removed "Start Enneagram Assessment" button from last onboarding step (path cards handle navigation)
- "Skip Tutorial" button made larger and more visible in `Tutorial.tsx`

**6. Deployment setup:**
- `next.config.ts`: `output: "export"` now always enabled (was gated behind `GITHUB_PAGES=true`)
- `netlify.toml`: fixed redirect from `/* → /index.html` to `/* → /:splat`
- App is on Netlify auto-deploying from `ashiroff34/psyche-app` main branch

**7. Metadata fix:**
- Moved `themeColor` and `viewport` from `metadata` export to `viewport` export in `layout.tsx` (Next.js deprecation fix)

### Files modified by this session:
- `src/components/AnimatedPet.tsx` (new)
- `src/app/avatar/page.tsx` (AnimatedPet, inventory, auto-equip, hat PNG in slots)
- `src/hooks/usePetState.ts` (added `png` field to OutfitItem, hat PNG paths)
- `src/app/daily/page.tsx` (pet sync via usePetState hook)
- `src/app/layout.tsx` (viewport metadata fix)
- `src/app/onboarding/page.tsx` (removed "Start Enneagram Assessment" button)
- `src/components/Tutorial.tsx` (bigger skip button)
- `next.config.ts` (always static export)
- `netlify.toml` (fixed redirect)
- `public/hat-calibrator.html` (new dev tool)
- `public/pets/pet-1.png` through `pet-9.png` (new)
- `public/shop/hat-crown.png`, `hat-wizard.png`, `hat-flower.png`, `hat-santa.png`, `hat-catears.png` (new)

### Known issues / still pending:
- Hat positions use same defaults for all pets — calibration per hat/pet combo not done yet
- Frames, accessories, backgrounds have no PNGs yet (emoji only)
- Chibi hat display (in "Your Chibi" section) still shows emoji crown, not PNG

---

## Session: Hearts System Fix + Read Directory (March 26, 2026)

### What was done:

**1. Fixed heart refill timing bug in `useGameState.ts`:**
- Root cause: `refillHearts()` reset `heartsRefillTime` to `new Date().toISOString()` after adding hearts — destroying partial progress toward the next heart. E.g., 45 min → add 1 heart, reset timer → the 15 min progress toward the next heart was erased.
- Fix: Advance `heartsRefillTime` by exactly `heartsToAdd * HEART_REFILL_MS` from original start, preserving partial progress.
- Changed refill interval: 30 minutes → **10 minutes** per heart.
- Updated auto-refill `useEffect` to use 10 min constant.

**2. Added `gainHeart()` to `useGameState`:**
- Adds 1 heart directly (used by reading rewards). Exported in hook return.

**3. Updated "Out of Hearts" screen in `QuizFullscreen.tsx`:**
- Added live countdown timer (MM:SS) showing time until next heart refills.
- Added **"Read & Explore Types"** primary CTA → routes to `/read`.
- Token-refill button moved to secondary (amber outlined style).
- Copy updated: "30 minutes" → "10 minutes".
- Added `heartsRefillTime` prop to QuizFullscreen.

**4. Created `/read` reading directory page (`src/app/read/page.tsx`):**
- Hero: "Pass the time while your hearts refill".
- Live hearts status bar with fill animation.
- 6 reading section cards with colors: Enneagram Types, Jungian Functions, Compare Types, Correlations, History, Sources.
- Reading earns hearts: every 3 minutes on `/read` = +1 heart via `gainHeart()`.
- Toast when heart earned.
- Token shop link for fast refill.

**5. Fixed `AiTypeNuanceCard` in `/enneagram/learn/page.tsx`:**
- Was showing an empty card (AI removed, no fallback content).
- Added `TYPE_NUANCES` — static substantive per-type insights for all 9 types.
- Removed broken UI: "Generating insight..." subtitle, "New Insight" refresh button.
- Cleaned unused imports: `useCallback`, `useRef`, `RefreshCw`.

### Files modified by this session:
- `src/hooks/useGameState.ts` — timing fix, 30→10 min, added `gainHeart`
- `src/components/daily/QuizFullscreen.tsx` — new out-of-hearts screen, countdown, read button
- `src/app/daily/page.tsx` — pass `heartsRefillTime` to QuizFullscreen
- `src/app/read/page.tsx` — **NEW** reading directory page
- `src/app/enneagram/learn/page.tsx` — fixed empty AiTypeNuanceCard, cleanup
- `.claude/AI_COORDINATION.md` — updated

### Known issues (pre-existing, not fixed):
- `/api/subscribe-reminders` and `/api/subscribe` → 404 (Capacitor static export)
- `XPCelebration` hooks order warning — non-crashing
- Hat positions need per-hat/pet calibration (from Pet System session)

---

## How to use this file:
1. Before starting work, read this file
2. Check if the files you want to edit were modified by another session
3. After completing work, add your changes below with a date/time header

---

**Session: 2026-04-22 (autonomous meta-loop)**

**What was done:**

**1. Claude Code infrastructure built (global)**
- 39 global commands + 11 global agents (all in ~/.claude/)
- Thyself Pac-Man team: inky/blinky/pinky/dinky/linky/winky (in .claude/agents/)
- Thyself commands: ship/acq-rotation/learn/content-audit/research-loop/research-status/seo (in .claude/commands/)
- Glossary compressed 612→97 lines; setup-briefing updated; narrator updated

**2. Acquisition-readiness docs built**
- docs/runbooks/deploy.md — deploy steps (manual: npx vercel --prod --yes), rollback, env vars
- docs/runbooks/architecture.md — stack, directory structure, design decisions
- docs/runbooks/data-model.md — Supabase schema (live + planned for Priority 2-5)
- docs/runbooks/incident-response.md — P0-P3 severity matrix, playbook
- docs/ip-assignments/README.md + TEMPLATE.md — IP assignment tracking + template
- docs/seo-tracker.md — SEO page tracker (all 1,000 target routes, monthly targets)

**3. Infrastructure discoveries**
- Priority 1 (Analytics) is ~80% done: posthog.ts + analytics.ts + admin page exist. Blocker: POSTHOG_KEY empty in .env.local
- Priority 2 (Streak): 0 references for user_streaks/StreakCard — NOT STARTED
- SEO: /enneagram/[type] is client-side (no SEO value). 0 dedicated static pages. /seo command ready to generate them.
- Slop baseline: 4 as any, 1 key={index}, 2 new Date("..."), 5 console.log

### Files modified by this session:
- `.claude/agents/` — all 6 Thyself agents created (inky/blinky/pinky/dinky/linky/winky)
- `.claude/commands/` — all 7 commands created (ship/acq-rotation/learn/content-audit/research-loop/research-status/seo)
- `.claude/research-state.md` — slop baseline stub
- `docs/runbooks/deploy.md` — NEW
- `docs/runbooks/architecture.md` — NEW
- `docs/runbooks/data-model.md` — NEW
- `docs/runbooks/incident-response.md` — NEW
- `docs/ip-assignments/README.md` — NEW
- `docs/ip-assignments/TEMPLATE.md` — NEW
- `docs/seo-tracker.md` — NEW
- `.claude/AI_COORDINATION.md` — updated

### Known issues (unchanged):
- POSTHOG_KEY is empty — PostHog not active in prod until key is added to Vercel env vars
- Priority 2-7 not started (need Arianna's direction)
