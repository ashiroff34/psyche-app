# Thyself — Claude Work Log

Continuous autonomous improvement log. Updated each pass.
See bottom for today's entries (most recent first within each day).

---

## 2026-04-22

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
