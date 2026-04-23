# Thyself — Claude Work Log

Continuous autonomous improvement log. Updated each pass.
See bottom for today's entries (most recent first within each day).

---

## 2026-04-22

### Pass 25 — Pet page: ChibiSprite instead of AnimatedPet (correct chibi art)

**`src/app/pet/page.tsx`** — Swapped `AnimatedPet` back to `ChibiSprite` (chibi art style), keeping the full wardrobe system from Pass 24 intact:
- Replaced `AnimatedPet` import with `ChibiSprite`, `Image` (next/image), and `assetPath`
- Removed unused `Sparkles` lucide import
- Added `HAT_FILE` map at module scope (same crown/wizard/flower/santa/cat-ears keys as in AnimatedPet)
- Derived `chibiState: ChibiState` from current mood: fed/played → `"happy"`, sick/dead → `"hurt"`, else → `"idle"`
- Derived `hatSrc` from `equippedItems.hat` via `HAT_FILE` map
- Replaced the outer `motion.div` + `AnimatedPet` with a `position: relative` wrapper div containing `ChibiSprite` (animation now handled internally by ChibiSprite) plus an absolute-positioned `<Image>` hat overlay (top: -4.5%, left: 50%, translateX -50%, 68% size) when a hat is equipped

`npx tsc --noEmit` clean. Deployed to production.

### Pass 24 — Pet wardrobe + full type in manual picker

**`src/app/pet/page.tsx`** — Full rewrite to add the wardrobe system:
- Swapped `ChibiSprite` → `AnimatedPet` so equipped hats render on the chibi
- Added Care / Wardrobe tab switcher
- Wardrobe tab: currently-equipped strip with unequip buttons; category tabs (Hats / Frames / Effects / Backgrounds); item grid showing owned items (equip/unequip) and shop items (buy with tokens)
- Token balance displayed in header
- Buy feedback bubbles ("Got it!" / "Not enough tokens")
- Imports `useGameState` for real token spending

**`src/app/onboarding/page.tsx`** — Expanded `ManualTypePicker` to collect full type:
- Wing picker: two valid wings per type (e.g. 4w3 / 4w5), tap-to-toggle, optional
- Instinctual subtype: sp / sx / so pills, optional
- Tritype: shows the other two centers (gut/heart/head), pick one from each, optional
- Label copy: "Enter what you know — skip anything you're unsure about"
- `saveManual` updated to accept and persist `wing`, `instinct`, `tritypeSecond`, `tritypeThird` → writes `enneagramWing`, `instinctualStacking`, `enneagramSubtype`, `tritypeFirst/Second/Third`, `tritype` to profile
- All new fields are optional; core type still required

`npx tsc --noEmit` clean.

### Pass 23 — ARIA dialog semantics on 5 more modals + UTC date fix in behavioral-signals

**ARIA (WCAG 2.1 4.1.2):** Added `role="dialog"`, `aria-modal="true"`, and `aria-label` to 5 full-screen overlay components that were missing dialog semantics (Pass 11 fixed 3; this gets 5 more):
- `src/components/daily/OnboardingOverlay.tsx` — `aria-label="Onboarding"` on outer `motion.div`
- `src/components/daily/DailyCompleteOverlay.tsx` — `aria-label="Daily session complete"` on outer `motion.div`
- `src/components/StreakFreezeShop.tsx` — `aria-label="Streak Shop"` on inner card `motion.div`
- `src/components/GroundingExercise.tsx` — `aria-label="Grounding exercise"` on inner card `div`
- `src/components/daily/LessonBriefOverlay.tsx` — `aria-label="Lesson overview"` on outer `motion.div`

**UTC date bug:** `src/lib/behavioral-signals.ts` — `recordSessionStart()` was recording session date as `now.toISOString().slice(0, 10)` (UTC). Fixed to `getLocalDateKey(now)` — session chronotype data (used for personality-timing correlations) now records the user's local date correctly. Added import for `getLocalDateKey` from `@/lib/date-utils`.

`npx tsc --noEmit` clean.

### Pass 22 — Restore Pet tab to bottom nav (replacing Mirrors)

User requested the Pet tab back as the third bottom nav item. Mirrors was previously swapped in during the pet/game hub removal pass.

**`src/components/Navigation.tsx`**
- WHEEL_SPOKES: `/mirrors` (Mirrors, Layers icon, purple) → `/pet` (Pet, Heart icon, rose `#f43f5e`)
- SwipeNavigator tabOrder: `/mirrors` → `/pet`
- `Layers` import retained (still used in the "Your Data" hamburger menu item)

**`src/app/pet/page.tsx`**
- Restored original 208-line Pet page (health/hunger stats, feed/play buttons, ChibiSprite) recovered from git history (`9010ad1^`)

`npx tsc --noEmit` clean.

### Pass 21 — Brand copy: tab screens and assessment intros aligned to brand voice

Spread brand voice ("understand why you are the way you are") through the core tab screens and assessment entry points. Copy only, no layout or structural changes.

**`src/app/assessments/page.tsx`**
- Know tab header: "Map yourself" → "Map your psychology"; "Your full map" → "Your full psychological map"; subhead reframed around "pattern" not generic self-mapping
- "Your starting path" section label → "Where to begin"
- GrowthTab empty state CTA: "Find your type" → "Find my pattern"
- Three Mirrors hero: removed dash, reframed "real insight" → "real self-knowledge"
- Big Five DIMENSIONS description: "most scientifically validated personality model" → "most rigorously validated trait model"
- Big Five ALL_ASSESSMENTS subtitle and description rewritten to be more precise and less quiz-framing
- Recommendation `why` copy: clarified Ichazo/Naranjo as "original" frameworks; Big Five framing shifted from pop-validation to empirical cross-validation; mistype investigator copy sharpened
- `getRecommendation` instinctual stacking: "determines" → "shapes" (less deterministic framing)
- Jungian recommendation: reframed "where real self-knowledge lives" → "where the deepest patterns become visible"

**`src/app/growth/page.tsx`**
- Empty state CTA: "Discover my type in 3 minutes →" → "Find my pattern in 3 minutes" (no arrow, no "discover")
- Empty state body: "specific fears to face" → "specific fears to understand" (recognition not prescription framing)

**`src/app/mirrors/page.tsx`**
- Hero subtitle: "Three independent lenses on who you are" → "Three independent lenses on your psychological pattern"
- Three "Take the assessment" links → "Start the assessment"
- Coherent-mirrors state: added "not just performing alignment" for depth
- Incomplete-mirrors empty state: rewritten to foreground motivation/traits/values divergence framing

**`src/app/assessments/self-id/page.tsx`**
- Intro headline: "Find yourself in the text" → "Recognize your pattern in the text"
- Intro body: "two people can act identically but be completely different types" → clarified as "driven by completely different core fears" (motivation-first framing)
- Intro second paragraph: "not just what you do" → "what drives you when no one is watching"
- CTA: "Begin Reading" → "Start Reading"
- Fixed header subtitle: "Find yourself" → "Find your pattern"
- Reading phase instruction: "when one resonates from the inside" → "when you recognize yourself from the inside, not just the behavior"
- Confirm overlay: "Trust your inner recognition" → "If it resonates from the inside, it's probably right" (warmer, less oracular)

**`src/app/mirror/page.tsx`**
- Hero headline: "What your own words say about you" → "What your own words reveal about you"
- Hero body: "quizzes can't catch" → "assessments can't catch" (we're not a quiz)

`npx tsc --noEmit` clean.

### Pass 20 — Brand copy: hero, onboarding, and metadata updated to reflect brand positioning

Updated all hero and entry copy to reflect the brand tagline "understand why you are the way you are." Key changes:

- **`src/app/page.tsx`** (EnterScreen hero): Headline changed from "Know thyself. completely." to "Finally understand why you are the way you are." Thesis line now foregrounds the psyche-map framing: "Before therapy, before any real change, you need a map of your own psyche." Sub-line: "Typology gives you that map. Not transformation. Recognition." Proof pills rewritten from "9 core patterns / research-backed / private & honest" to "self-knowledge, not a quiz / grounded in real psychology / private and honest." Chibi bubble and endowed-progress label updated.
- **`src/app/onboarding/page.tsx`** (StepWelcome): Headline from "Know thyself completely." to "Understand why you are the way you are." Enneagram description reframed from "archetypal system mapping 9 personality types" to "9 core psychological patterns — each defined by core fear, core desire, and a lifelong pattern of attention." CTA from "Discover my type" to "Find my pattern." StepTypePreview description now explicitly says "not a personality quiz." StepTypePreview CTA from "Show me my type" to "Start the assessment." ManualTypePicker subhead updated to "You already know your type. Let's build on that self-knowledge."
- **`src/app/layout.tsx`** (metadata): Title, description, OG, Twitter, and JSON-LD all updated to use the tagline and brand voice.
- `npx tsc --noEmit` clean.

### Pass 19 — Dead code removal: unused exports in lib/

- **`src/lib/behavioral-signals.ts`**: removed `recordFeatureEngaged`, `recordExerciseDropout`, `getDropoutPatterns`, `DropoutRecord` interface, and `DROPOUT_KEY`/`ENGAGEMENT_KEY` constants — zero consumers anywhere in src/.
- **`src/lib/local-embed.ts`**: removed `isEmbedderLoading` and `isEmbedderReady` — exported but never imported outside the module.
- **`src/lib/referral.ts`**: removed `buildShareMessage` — exported but never imported anywhere in src/.
- `npx tsc --noEmit` clean.

### Pass 18 — External link security: add rel="noopener noreferrer" to unguarded external anchors

- **`src/app/privacy/page.tsx`**: Stripe privacy link had no `target` or `rel`. Added `target="_blank" rel="noopener noreferrer"`.
- **`src/app/terms/page.tsx`**: findahelpline.com crisis-line link had no `target` or `rel`. Added `target="_blank" rel="noopener noreferrer"`.
- All other flagged links (`beta/page.tsx` ×2, `MistypeInvestigator.tsx`) already had correct `rel="noopener noreferrer"` — grep false positives from multi-line matching.
- `layout.tsx` Google Fonts `<link>` is a stylesheet link element, not an anchor — not applicable.
- Form `onSubmit`: zero instances missing `e.preventDefault()`.
- `npx tsc --noEmit` clean.

### Pass 17 — Audit async useEffect anti-pattern and unguarded JSON.parse(localStorage)

- **useEffect(async)**: zero instances found in `src/` — codebase is clean.
- **JSON.parse(localStorage) without try/catch**: audited all 24 instances across 14 files. Every single call is already wrapped in a try/catch block. No crashes waiting to happen.
- No code changes required — the codebase already applies correct defensive storage patterns throughout.

### Pass 16 — Hoist inline constant arrays to module scope (perf: avoid fresh allocation on every render)

- `src/components/daily/PathIteration1.tsx`: removed duplicate `sectionColors` array inside component body (it was already defined inside `flattenNodes`); extracted as module-level `SECTION_COLORS` used by both call sites.
- `src/components/daily/PathView.tsx`: hoisted `positions` and `align` arrays (previously re-created on every iteration of a `.map()` call) to module-level `NODE_POSITIONS` / `NODE_ALIGN`.
- `src/components/DailyQuiz.tsx`: hoisted `LETTERS` (inside `useMemo`) and `VISUAL_LETTERS` (in render body) to a single module-level `OPTION_LETTERS` constant.

`npx tsc --noEmit` — clean.

### Pass 15 — Replace index keys with stable string keys on shuffled quiz option lists
- **fix**: Changed `key={i}` / `key={idx}` to `key={opt}` (the option string itself) for all shuffled answer-option lists in `QuizFullscreen.tsx`, `history/page.tsx`, `MultipleChoiceExercise.tsx`, `ScenarioExercise.tsx`, `StorySceneExercise.tsx`, and `FillInBlankExercise.tsx` — index keys on shuffled lists cause React to reuse DOM nodes when the question changes, potentially preserving stale button state across questions

### Pass 14 — Fix stale closure in EngagementNudge showNextNudge
- **fix**: Replaced `useState<Set<string>>` + `[shown]` dep in `showNextNudge` useCallback with a `shownRef` ref — the callback now has stable `[]` deps, the re-entry useEffect can properly list `showNextNudge` as a dep instead of suppressing it with `eslint-disable-line`, and the unused `shown` state (never read in JSX) is removed entirely

### Pass 13 — Fix hardcoded domain in profile referral link
- **fix**: Replaced hardcoded `https://thyself.app` in the referral share link in `src/app/profile/page.tsx` with `window.location.origin` (with SSR fallback) so staging and preview deployments generate correct referral URLs

### Pass 11 — Add dialog ARIA semantics to modal overlays
- **fix**: Added `role="dialog"`, `aria-modal="true"`, and `aria-label` to the inner card container of `TypeDiscoveryModal`, `MilestoneModal`, and `ComebackModal` — all three rendered as full-screen overlays with no ARIA dialog semantics, making them invisible to screen reader users as dialog regions (WCAG 2.1 4.1.2 fail)

### Pass 10 — Link select label to voice picker in AudioReflection
- **fix**: Added `htmlFor="audio-reflection-voice"` to the Voice `<label>` and `id="audio-reflection-voice"` to the `<select>` in `src/components/AudioReflection.tsx` — the label and select were visually paired but had no programmatic association, making the control inaccessible to screen readers (WCAG 2.1 1.3.1 fail)

### Pass 9 — Accessible form labels on all inputs
- **fix**: Added `aria-label` or linked `htmlFor`/`id` pairs to 12 unlabeled `<input>` elements across 8 files — onboarding name/email/chibi name/time pickers, daily morning/evening reflection, daily reminder time, hub email signup, glossary search, settings display name/email/beta code, journal note, drift life event, morning observation email, audio reflection speed/pitch sliders, and daily observation email — all previously had no programmatic label association making them inaccessible to screen readers

### Pass 8 — Replace hardcoded domain in compatibility share handlers
- **fix**: Replaced two `"https://thyself.app"` hardcoded fallbacks in `src/app/compatibility/page.tsx` share and copy-invite handlers with `window.location.origin` — these handlers always run in browser context so `window` is available, and using `window.location.origin` ensures staging/preview deployments share the correct URL

### Pass 7 — Remove `as any` cast in useSounds webkitAudioContext
- **fix**: Replaced `(window as any).webkitAudioContext` in `src/hooks/useSounds.ts` with a typed `WindowWithWebkit` interface, eliminating the `as any` cast while preserving Safari vendor-prefix fallback support

### Pass 6 — Remove `as any` casts in HubView fresh-start state
- **fix**: Added explicit generic type `{ visible, window, copy: FreshStartCopy | null, dismissKey?: string }` to the `useState` initializer in `src/components/daily/HubView.tsx`, replacing `null as any` and two `(freshStartState as any).dismissKey` casts — state is now fully type-safe and `dismissKey` is properly typed as optional

### Pass 5 — Remove `as any` cast in cognitive results normalizer
- **fix**: Widened `allScores` type in `src/app/cognitive/results/page.tsx` to `{ func?: string; key?: string; score: number; percentage: number }[]`, eliminating two `as any` casts in the old/new format normalizer — now type-safe with a `?? ""` fallback

### Pass 4 — ComebackModal stale copy + token amount mismatch
- **fix**: Removed dead "chibi" references from moderate-segment re-engagement copy in `src/components/ComebackModal.tsx` — chibi/pet system was removed; copy now consistent with rest of app
- **fix**: Replaced hardcoded "+50 tokens" and "Claim your 25 tokens" UI labels with `displayTokenBonus` computed from the same ladder as `handleClaim`, so the displayed reward amount always matches the actual award (+25 moderate, +40 empathetic, +75 freshStart)

### Pass 3 — Icon-only close buttons a11y
- **fix**: Added `type="button"` + `aria-label="Close"` to bare X-icon close buttons in `src/components/TikTokTypeCard.tsx` and `src/components/GlossaryTip.tsx` — prevents accidental form submit, fixes screen readers announcing bare "button" with no label

### Pass 2 — NodeSheet close button a11y
- **fix**: Added `type="button"` + `aria-label="Close"` to icon-only close button in `src/components/learn/NodeSheet.tsx` — prevents accidental form submit, fixes screen reader announcing bare "button"

### Pass 1 — Research & Cleanup
- **refactor**: Removed dead lucide imports (`Brain`, `Compass`, `Sprout`) from `Navigation.tsx`
- **fix**: Added `line-clamp-2` to search result preview text in `Search.tsx` to prevent overflow
- **verified**: `layout.tsx` localStorage script is SSR-safe (browser-only `dangerouslySetInnerHTML` + `try/catch`)

---

## 2026-04-21

### Deployed to production — https://psyche-app-two.vercel.app
- **fix**: Bust Vercel CDN cache for chibi sprites with `?v=2` across 8 files
- **feat**: Search keyboard navigation — ↑↓ arrows, Enter to select, hover sync, `scrollIntoView`, `aria-label`
- **fix**: Empty state in search now shows at 1 char typed (was 2)
- **feat**: Three Mirrors feature added to top of Know tab, Explore tab, and Growth tab as hero cards
- **feat**: Mirrors tab added to bottom nav (replaced Pet)
- **fix**: `(moderate)` text overlap in cognitive results — switched to `flex-col` stacking with `truncate`
- **refactor**: Removed Game Hub and Pet system entirely — pages redirect to `/assessments`
- **refactor**: Removed pet variants from `RetentionBanner`, `EngagementNudge`, `ComebackModal`
- **fix**: `capacitor.config.ts` — use `KeyboardResize.Body` enum instead of bare string `'body'`
- **fix**: Added `node_modules 2/` to `.gitignore` and `tsconfig.json` exclude to fix Vercel builds
- **fix**: Added `.vercelignore` to exclude `node_modules 2/`, `android/`, `scripts/` from deploys
