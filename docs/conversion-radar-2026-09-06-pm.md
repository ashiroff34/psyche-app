# Conversion Radar — 2026-09-06 (PM)

Addendum to `conversion-radar-2026-09-06.md`. The morning pass marked audit
item 5 (post-assessment hook) as PASS on the basis that `PostAssessmentUpsell`
covered "the four secondary assessments." That count was wrong: it enumerated
the four pages that already imported the component rather than the set of pages
that actually render a result screen.

**Verdict: one real gap found and closed. Three assessments were delivering a
full result and then dropping the user with no upgrade path.**

---

## Gap — Peak-end rule violated on three assessment result screens

`src/app/assessments/{values,regulatory-focus,decentering}/page.tsx` each score
the user, render a complete inline result screen, and then hand off with a bare
navigation link: "See triangulation", "Done", "Back to practice". No upsell, no
Pro mention, no trigger label.

**Principle violated: peak-end rule.** The moment a result lands is the highest
intent point in the flow — the user has just spent 2 to 5 minutes answering
questions about themselves and is reading the answer. Ending that moment on a
plain nav link spends the peak and returns nothing. These three were the only
scored assessments in the app still doing it.

**Secondary effect: funnel blindness.** With no `?from=` label, any traffic
these screens did send to `/pricing` landed in the `direct` bucket, so their
conversion was unmeasurable in PostHog.

### Fix applied

Added `PostAssessmentUpsell` above the final CTA on all three, matching the
pattern already shipped on big-five, tritype, attachment, and instinctual.
Copy follows the conversion playbook: loss frame in the body, trial-framed CTA,
routes to `/pricing` (never `/store`), hidden for existing Pro subscribers.

| Page | Trigger label | Headline |
|---|---|---|
| `values` | `values_result` | "Your values say what matters. Your type says why it had to." |
| `regulatory-focus` | `regulatory_focus_result` | "You know which way you lean. Not yet why you lean that way." |
| `decentering` | `decentering_result` | "You can measure decentering. Practicing it is the harder part." |

Each body names what stays out of reach without Pro rather than listing
features. The decentering loss frame is the most literal of the three: the page
itself tells the user to retake monthly to track growth, and the practice that
moves the score is the thing behind the paywall.

Paywall entry points: 6 → 9. `npx tsc --noEmit` passes.

---

## Audit items re-verified this pass (unchanged, no action)

- **1. Trigger timing** — all entry points remain at emotional peaks.
- **2. Pricing psychology** — anchoring, social proof, identity value prop,
  loss frame, therapy anchor all present. Scarcity still deliberately absent
  (trust-based pricing, post-Noom-FTC standard). Do not add.
- **3. Trial mechanics** — 7-day on all `pro_*` packs.
- **4. CTA copy** — zero feature-focused CTAs. Still clean.
- **6. Cancellation friction** — still no in-app cancel or retention flow.
  Carried forward from the morning doc as new work, not built.

## Correction to the morning doc

`conversion-radar-2026-09-06.md` item 5 should read PASS *as of this PM pass*.
It was not accurate when written. Future radar runs should enumerate assessment
pages by whether they render a result screen, not by whether they already
import the upsell component — the latter is circular and will keep missing
exactly the pages that need it.

## Not addressed

Nine `/pricing` links still carry no `?from=` label (journal, history,
cognitive learn/assess, enneagram learn, enneagram type page, quick assessment,
cognitive-type). These are gates rather than result screens, so the peak-end
argument does not apply, but they do collapse into the `direct` bucket and
blur funnel segmentation. Low risk to label; left for a founder-directed pass
since it touches nine files across unrelated surfaces.
