# Aha-Moment Radar — 2026-09-13

## Summary

| Check | Status |
|---|---|
| Auth wall before content | CLEAN. No `src/middleware.ts` and no `src/app/(auth)/` |
| Enneagram assessment length | CLEAN. 6 questions to type name, 10 to full result |
| Enneagram processing moment | PRESENT. 2.5s two-beat |
| Enneagram share at peak | `/enneagram/results` is STRONG. On the onboarding reveal it is still buried under 4 hedge blocks (queued 09-10) |
| Home aha path (Enneagram) | 12 taps, ~2 to 3 min (unchanged) |
| **Jungian aha path** | **was a dead end (infinite "Redirecting..." screen). Now it reaches a Pro gate. There is still no free 16-type reveal** |

The 09-10, 09-11 and 09-12 Enneagram findings still hold, and all three queued items remain unshipped. This pass audited the other framework: a visitor who wants their four-letter Jungian type.

---

## BIGGEST FRICTION POINT

**For 5.5 months the "Expert recommended" Jungian self-ID route has frozen on a "Redirecting to cognitive assessment..." screen that never redirects. There has been no free way to reach a 16-type result, even though 16 SEO pages promise one.**

### How it broke
- `a1e8cb4` (2026-03-28, "restore corrupted files") replaced the page with an 8-line stub. The stub displays "Redirecting..." but has no redirect logic.
- `f3477ad` (2026-03-29, "remove dead code") then deleted the 323-line `JungianSelfIdentification` component, because nothing imported it anymore.

### Who lands on the dead screen
| Surface | Copy shown |
|---|---|
| `/assessments` dimension card "Cognitive Type" | "Your Jungian function stack" |
| `/assessments` recommended-next card (for anyone without a cognitive type) | "Jungian Self-Identification · ~15 min · Expert recommended" |
| `/assessments` Jungian tab, first item | same |
| `src/data/searchIndex.ts` | in-app search result |

### What a Jungian SEO visitor actually hits
All 16 `/cognitive-functions/[type]` pages carry this CTA: "Take the free Thyself Type Index. 10 minutes, no email required." It links to `/assessments`.
1. `/assessments` opens on the **Enneagram** tab (`useState<Tab>("enneagram")`, no `?tab=` support). That is one extra tap and a wrong-framework first impression.
2. Jungian tab options:
   - Self-ID: **dead screen**, before this pass
   - Cognitive Functions Full (68 Q, ~25 min): **Pro-locked**
   - Advanced Cognitive Type (80 Q, ~12 min): **Pro-locked**
3. "Thyself Type Index" appears **nowhere in `src/` except those 16 SEO pages**. No instrument by that name exists.

So the page's "free, 10 minutes" promise ends at either a frozen screen or a paywall. Beyond the churn, an acquirer's diligence team would read a "free" claim that leads to a paywall as a consumer-claims problem.

### Shipped this pass
[src/app/assessments/jungian-self-id/page.tsx](../src/app/assessments/jungian-self-id/page.tsx)
- The stub now does what its own copy says: `router.replace("/cognitive/assess")`. It uses the same pattern as `src/app/enneagram/assess/page.tsx`.
- Users no longer freeze. They land on the existing Pro gate, which has a "Try Pro Free" CTA and a "Back to Assessments" exit.
- No copy, pricing or gating changes. `npx tsc --noEmit`: PASS.

This is a stop-the-bleeding fix, not the aha fix. A free Jungian reveal still doesn't exist.

---

## Queued for founder sign-off

**New, 09-13: decide whether Jungian typing has a free path.** This is a monetization call, so it was not shipped autonomously.
- **Option A:** restore `JungianSelfIdentification` from `927fb0c` (323 lines, free, self-selected type → `/cognitive/results`). It needs blinky (Jung/Beebe accuracy) and dinky (no dashes, emojis or trademarked terms) review before it ships, because the content has not been touched since March.
- **Option B:** keep Jungian typing Pro-only. Then rewrite the 16 SEO CTAs so they stop promising "free Thyself Type Index. 10 minutes". Also update the three `/assessments` cards, which still advertise "~15 min · Expert recommended" for a route that is now a paywall.
- **Either way:** add `?tab=jungian` support to `/assessments` and point the 16 cognitive-function SEO pages at it with `from=seo_cognitive_page`.

**Unchanged:**
1. **09-10:** in `TypeRevealScreen`, move the share card above the 4 hedge blocks (pure reorder).
2. **09-11:** roll the SEO CTA fix out to the remaining pages (183 files still link to bare `/assessments`) and extract `<SeoAssessmentCta>`.
3. **09-11:** on `/enneagram/results`, lead with the recognition sentence and the W/P/F/A block, not the "Top Matches (iEQ9)" chip.

---

## Verdict

**Enneagram path:** 12 taps, no auth wall, share present. Tight.

**Jungian path:** no free path reaches an aha. Before this pass it ended on a dead screen; it now ends on an honest Pro gate. Closing the gap needs the founder's A/B decision above.
