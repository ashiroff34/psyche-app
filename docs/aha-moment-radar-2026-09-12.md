# Aha-Moment Radar — 2026-09-12

## Summary

| Check | Status |
|---|---|
| Auth wall before content | CLEAN, no `src/middleware.ts`, no route guards on `/`, `/onboarding`, `/assessments/quick` |
| Assessment length | CLEAN, 6 questions to type name, 10 to full result |
| Result emotional resonance | Onboarding reveal STRONG; `/enneagram/results` clinical opening (queued 09-11) |
| Processing moment | PRESENT, 2.5s two-beat in `QuickTypeAssessment` |
| Share at peak | `/enneagram/results` STRONG (in-hero); onboarding reveal buried under hedge stack (queued 09-10) |
| Home aha path | 12 taps, ~2 to 3 min (unchanged) |
| SEO type-page aha path | 12 taps (after 09-11 fix) |
| **SEO funnel measurable?** | **was NO, now YES** |

The 09-10 and 09-11 audits still hold, so this pass didn't repeat them. It checked whether yesterday's fix can be measured.

---

## BIGGEST FRICTION POINT

**Yesterday's fix sent SEO traffic to a page that fired no analytics at all, so nobody could see whether organic visitors ever reach the aha moment.**

What `grep` showed before this pass:

| Event | `/onboarding` | `/assessments/quick` |
|---|---|---|
| `quiz_started` | fires ([onboarding/page.tsx:1574](../src/app/onboarding/page.tsx)) | **none** |
| `quiz_completed` | fires (:1625) | **none** |
| `type_revealed` | fires (:1632) | **none** |
| `quiz_skipped` | none | **none** |

Commit 94ff5a0 (09-11) pointed the 9 Enneagram type SEO pages at `/assessments/quick`. Six other surfaces link there too: assessments, identity, r, growth, dashboard, mirror. Every quiz start, finish and reveal on that page was invisible in PostHog. So the funnel Priority 6 exists to feed (SEO landing, quiz, reveal) had no denominator and no completion count. That also meant nobody could check whether the 09-11 fix worked. An acquirer's diligence team would find an SEO program with no measurable path to activation.

This is the same gap 8d4b1f6 closed for onboarding on 09-04, just on the second entry point.

### Shipped this pass

[src/app/assessments/quick/page.tsx](../src/app/assessments/quick/page.tsx)
- `quiz_started` fires once on mount. It is tagged `assessment: "quick_type_finder"`, `length: 10`, plus a `source` read from `?from=`, which defaults to `direct`.
- On completion, `quiz_completed` and `type_revealed` fire with the same payload shape as onboarding, and `source` is set to `quick_page_<from>`.
- `quiz_skipped` fires on the skip path. That event was defined but never fired anywhere.

[src/components/seo/EnneagramTypePage.tsx:394](../src/components/seo/EnneagramTypePage.tsx)
- CTA href `/assessments/quick` → `/assessments/quick?from=seo_type_page`

This doesn't change any UI, copy or routing. `npx tsc --noEmit`: PASS.

**Funnel now readable in PostHog:** `quiz_started{source=seo_type_page}` → `quiz_completed{source=quick_page_seo_type_page}` → `identity_card_shared`.

---

## Still queued for founder sign-off (unchanged)

1. **09-10:** in `TypeRevealScreen`, move the share card above the four hedge blocks. It's a pure reorder and no copy is deleted.
2. **09-11:** apply the SEO CTA fix to the other 171 SEO pages, and extract a shared `<SeoAssessmentCta>`. When that ships, add `?from=seo_<family>` so each page family shows up as its own row in the funnel above.
3. **09-11:** on `/enneagram/results`, show the recognition sentence and W/P/F/A block above `typeData.brief`. Right now it opens with the clinical "Top Matches (iEQ9)" chip.

---

## Verdict

Aha path is tight: 12 taps, no auth wall, 6 questions to type, processing beat present, share button present on both reveal surfaces. This pass fixed measurement, not friction. The SEO entry point can now be tracked.
