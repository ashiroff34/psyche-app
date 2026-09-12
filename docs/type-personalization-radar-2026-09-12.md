# Type-Aware Personalization Radar — 2026-09-12

## Verdict

Type-aware UX is still **solid** across all six audited layers. Nothing has
regressed since the 2026-09-11 pass. This pass went through the remaining
low-reference routes and made one small ordering and copy fix on `/arcs`.

## Six layers (checked again)

| # | Layer | Status | Evidence (type refs per file) |
|---|---|---|---|
| 1 | Personalized CTAs | PERSONALIZED | `daily/page.tsx` 28, `profile/page.tsx` 54, `growth/page.tsx` 9 |
| 2 | Daily observations | PERSONALIZED | unchanged since 09-11 (type-keyed `Record<number, ...>` data files) |
| 3 | Growth tips | PERSONALIZED | `growth/page.tsx` unlock gate + type-keyed growth edges |
| 4 | Assessment result page | PERSONALIZED | `enneagram/results` 12, `cognitive/results` uses `getPaywallCopy` |
| 5 | Paywall copy | PERSONALIZED | `type-paywall-copy.ts` consumed on `/pricing` and both results pages |
| 6 | Lesson progression | PERSONALIZED (order) / PARTIAL (text) | `orderUnitsForType` live at `lessons/page.tsx:526`; 23 lessons marked `personalized: true` |

`type-aware-copy.ts` still has 8 surfaces, and every one is wired to the page that uses it.

## Fixed this pass

**`/arcs` upcoming list ignored the reader's type.** Every arc is tied to a
type: three growth arcs (4 to 1, 9 to 3, 5 to 8) and six shadow arcs
(1 to 4, 3 to 9, 7 to 1, 8 to 5, 6 to 3, 2 to 8). The list still rendered in
the same order for everyone, so a Two had to scroll past six other arcs to
reach the arc written for Twos. `orderArcsForType()` now moves the reader's own
arcs to the top (growth first, then shadow) and adds "Your type." to their
subtitle, the same pattern the lessons page uses. It changes order only:
everything stays locked, and readers with no type yet see the original order.
Arc directions were checked against the Riso-Hudson integration and
disintegration lines, and all nine are correct.

**Copy defect, same file.** Ten prompts and teasers had lost their dashes and
been left with a period in mid-sentence ("Spend 10 minutes on it. imperfectly.",
"not the enemy of beauty. it is its architecture."). They now use commas or a
colon, and no dashes were reintroduced.

tsc passes (exit 0).

## Open (founder decision; this is feature or content work, not polish)

- **Active arc is Type 4 for everyone.** `ACTIVE_ARC = ARCS[0]`, and only
  `arc-4-1` has its 30 prompts. A Type 8 is enrolled in "Turning Longing into
  Craft". A real fix means writing a 30-prompt set for each of the other types
  (pinky writes, blinky checks) and then selecting the active arc by type. Stored
  progress is keyed on `arcId`, so switching the arc for someone already enrolled
  would reset their progress. That needs a migration decision first.
- **Hardcoded domain on `/arcs`.** `useVerifiedShare({ url: "https://thyself.app/arcs" })`
  breaks the no-hardcoded-domains rule. `src/lib` has no site URL constant to use
  yet, so this was left for a code-quality pass.
- **Lesson text coverage** is still at 23 of ~149 (see 09-10 report, gap A).
- **Dead `MilestoneCelebration.tsx`** still exists (see 09-10 report, gap B).
- **`/read`** links to `/enneagram/learn`, which already reads the user's type,
  so the list order on `/read` doesn't need changing.
