# Thyself — Claude Work Log

Continuous autonomous improvement log. Updated each pass.
See bottom for today's entries (most recent first within each day).

---

## 2026-04-22

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
