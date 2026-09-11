# Conversion Radar — 2026-09-11

Audit of paywall placement, pricing copy, and conversion triggers.

## Already solid (no action)

- **Peak-moment trigger.** Every assessment that produces a result either renders
  `PostAssessmentUpsell` inline or routes to `/enneagram/results` / `/cognitive/results`,
  both of which carry their own upsell. No assessment dead-ends without a next step.
- **Trial length.** 7 days, not 14. Applied to every `pro_*` pack in `/api/checkout`.
- **Anchoring order.** `/pricing` reads Annual ($47) → Monthly ($7.99) → Free, so the
  highest total is read first. Variant is tagged `pricing_annual_first_v2` for PostHog.
- **Identity + loss framing.** Headline, `proBenefit`, and `lossFrame` all come from
  `type-paywall-copy.ts` and adapt per Enneagram type.
- **Therapy anchor.** "One therapy session is $200. A year of Thyself is $47."
- **Risk reversal with an exit.** Trial promise is paired with a stated cancellation path.
- **Abandoned-checkout recovery.** Stripe cancel returns to `/pricing?checkout=cancelled`
  with a "Nothing was charged" banner, and the funnel records `checkout_failed` so
  technical drop-off is distinguishable from a change of mind.
- **One canonical price.** Every surface imports from `data/pro-pricing.ts`.

## Fixed this pass (commit 351f895)

1. **`/pricing` sold Pro to people who already had it.** `/store` guards the Pro CTA with
   `proUnlocked`; `/pricing` had no such check, and 15 surfaces link to it. A subscriber
   saw "Try Free for 7 Days" on a live button that opens a second Stripe subscription for
   the same account. Now: CTAs disabled and labelled "Pro active", persuasion copy replaced
   with a confirmation line, abandoned-checkout banner suppressed, and `paywall_view` no
   longer fires for subscribers (they inflate the denominator of a conversion rate they
   cannot move). Cancellation line stays visible to everyone.
2. **"Best value" was an unverified claim.** The annual card carried the badge but never
   stated the delta, leaving the reader to multiply $7.99 by twelve. An anchor the reader
   has to compute is not an anchor. Now states "Save $48.88 a year — 51% off monthly",
   reusing the constants `/store` already renders.
3. **Trial length had two sources.** `/api/checkout` set `trial_period_days: 7` as a
   literal while three surfaces promised `PRO_TRIAL_DAYS`. Same drift class as the
   $4.99/$7.99 bug (cd6daa2). The route now imports the constant.

tsc: PASS. Committed and pushed.

## Open findings (not actioned — need founder decision)

- **No cancellation save flow.** There is no self-serve cancel at all; the only path is
  emailing support. A "pause instead" or "here's what you'll lose" screen has nothing to
  attach to until self-serve cancellation exists. Building either is a new feature, which
  the no-new-features rule defers. Flagging because involuntary-churn handling is something
  a diligence team looks for.
- **Trial length is still hardcoded in 13 display strings.** `journal`, `history`,
  `cognitive/{assess,learn,results}`, `enneagram/{learn,[type],results}`,
  `assessments/cognitive-type`, `MilestoneModal`, `CognitivePremiumGate`,
  `QuickTypeAssessment`, `PostLessonUpgradeBanner`. They agree with the constant today, so
  changing `PRO_TRIAL_DAYS` would make the server grant one length while the copy promises
  another. Mechanical to centralize; left out of this commit to keep it reviewable.
- **Social proof is unquantified.** "Thousands are mapping their psyche with Thyself" is
  vaguer than a specific number would be, but a specific number has to be true. Worth
  revisiting once MAU supports a real figure — the FTC-era wellness standard the page
  already follows makes an unsupported count a worse trade than a vague one.
- **No lifetime tier.** The priority-7 spec lists $149.99 lifetime as a third anchor above
  annual. `/pricing` tops out at $47, so the highest anchor on the page is the product
  being sold. Adding a tier is a pricing decision, not a code fix.
