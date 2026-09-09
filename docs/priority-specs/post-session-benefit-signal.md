# Spec — Post-Session Benefit Signal

**Source:** [competitor-radar 2026-09-09](../competitor-radar-2026-09-09.md), Findings 3 and 4
**Competitor origin:** Headspace — post-session "how are you feeling" touchpoint
**Effort:** Easy. One component edit, one analytics event, one wire-up.
**Status:** Specced. Awaiting founder instruction (no-new-features rule).

---

## The problem

Thyself's session-completion moment is reward-only. The user is told they earned XP, extended a streak, and fed a companion. They are never asked whether the session did anything.

That is a gap in two directions:

**Retention.** Reward confirms compliance. Attribution confirms value. A user who has never consciously registered "that helped" has no reason to return once the streak's novelty wears off, and no reason to pay. Headspace's post-session check is the cheapest known instrument for manufacturing that registration, and it is the one piece of their funnel Thyself has not copied.

**Diligence.** `src/lib/analytics.ts` carries 267 lines of typed events and `src/lib/posthog.ts` 24 named constants, and not one of them is a self-reported outcome. Every number Thyself can put in a data room is engagement: opens, completions, streaks, conversions. An acquirer in the psychometrics space asks whether the product changes anything. Today that question has no answer because it was never asked.

## The design

One question, one tap, at the end of a completed daily session. Never blocking, never more than one screen, always skippable by dismissing.

**Copy** (reflective register, no clinical framing, no "AI", no dashes, no emojis):

> Anything shift?
>
> [ Yes, something moved ]  [ Not really ]  [ Too soon to tell ]

Three options, not a 1-5 scale. A scale invites a mid-point and produces a mean that means nothing; three buckets produce a proportion that is directly chartable and directly comparable across cohorts. "Too soon to tell" is load-bearing — without it the honest non-answer gets absorbed into "Not really" and depresses the signal.

Ask at most **once per day**, gated on a `psyche-benefit-signal-<YYYY-MM-DD>` key, and only after a session the user actually completed. Follow the existing date convention: `new Intl.DateTimeFormat("en-CA").format(new Date())` — never `new Date("YYYY-MM-DD")`.

Do not ask on the user's first ever session. Nothing has had time to shift and a "Not really" on day one is noise that will drag the baseline down.

## The surface

Use the orphaned component. [`src/components/daily/DailyCompleteOverlay.tsx`](../../src/components/daily/DailyCompleteOverlay.tsx) has zero importers today — `grep -rn "DailyComplete" src/` matches only its own definition. It is already built for exactly this moment: it takes `{ show, streak, xpEarned, onDismiss }`, renders the streak and XP, auto-dismisses after 6 seconds, and carries correct `role="dialog"` / `aria-modal` semantics.

Two changes to it:

1. Add an optional `onBenefit?: (answer: "moved" | "not_really" | "too_soon") => void` prop. When present, render the three buttons below the existing "Keep the streak going!" CTA and **cancel the 6-second auto-dismiss** while the question is unanswered — an auto-dismissing question is a question that mostly goes unanswered. Restore the auto-dismiss once an answer is tapped or the user taps through.
2. Wire it into `src/app/daily/page.tsx` at the daily-goal celebration site (`showDailyGoalCelebration`, declared at line 723, rendered at line 2335), passing the streak and XP already in scope.

If for any reason the overlay is not the right host, delete it rather than leaving it orphaned — but it is the right host, and reusing it makes this a wire-up rather than a new surface.

## Analytics

Add to the Engagement block of the event union in `src/lib/analytics.ts`, matching the existing alignment style:

```ts
| { event: "session_benefit_reported"; properties: { answer: "moved" | "not_really" | "too_soon"; enneagram_type?: number; streak?: number; session_number?: number } }
```

And to the "Daily practice" block in `src/lib/posthog.ts`:

```ts
SESSION_BENEFIT_REPORTED: "session_benefit_reported",
```

`session_number` is what makes this diligence-grade rather than decorative: it lets the proportion of "moved" be plotted against tenure, which is the chart that answers "does it work" instead of "do they show up". Also add a `session_benefit_skipped` event (dismissed without answering) so the response rate is knowable and the proportion has a denominator.

## Acceptance

- One question, one tap, at most once per day, never on session 1.
- Dismissing without answering is always possible and fires `session_benefit_skipped`.
- Auto-dismiss is suppressed while the question is live.
- `DailyCompleteOverlay` has at least one importer.
- `npx tsc --noEmit` passes.
- No `as any`, no magic numbers, no `key={index}`, no hardcoded domains.
- Copy passes dinky: no "AI", no dashes in UI text, no emojis, no mystical register.

## Suggested commits

```
feat: ask whether the session shifted anything at daily completion
```

or, if the wire-up and the question land separately:

```
fix: wire the orphaned daily completion overlay into the daily flow
feat: add a post-session benefit signal inspired by headspace
```

## Follow-on, not in scope

Once the signal has run for a few weeks it becomes the input to two things worth having: a "moved" proportion segmented by `session_number` for the data room, and a paywall-timing hypothesis — a user who has just reported that something moved is in the highest-intent state the product ever produces, and the pricing surface currently does not know it.
