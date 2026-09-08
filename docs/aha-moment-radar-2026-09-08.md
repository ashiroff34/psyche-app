# Aha-Moment Radar — 2026-09-08

**Thyself's number: 12 taps / ~2.5–3 minutes from home to type reveal.**
Benchmark: Duolingo 60s, Headspace 3 min. Thyself sits at the Headspace end. Path length is fine.

No commits touched the onboarding funnel since 2026-09-07. The one change to `QuickTypeAssessment.tsx` (e967c42) added a `?from=quick_result` query param to the post-result pricing link. Structure verified unchanged.

**But this run found a live copy bug at the aha moment itself, and shipped the fix.**

---

## Shipped this run

**The recognition sentence at the type reveal was dead code. Fixed.**

[onboarding/page.tsx:353](src/app/onboarding/page.tsx:353) rendered:

```tsx
{resolveTypeAwareCopy("reveal.welcome", result.type) || revealSentence}
```

`getTypeAwareCopy` ([type-aware-copy.ts:245](src/data/type-aware-copy.ts:245)) returns a non-empty string for every type 1–9 and a `default` otherwise. It never returns falsy. So the `|| revealSentence` branch never executed, and `TYPE_REVEAL_SENTENCES` ([onboarding/page.tsx:99](src/app/onboarding/page.tsx:99)) — nine purpose-written recognition lines — has been unreachable since 003078d (2026-04-09).

Both blocks landed in that same commit. The type-aware system was rolled out across ~12 surfaces at once and this one shadowed a better-suited line without anyone noticing.

What the user actually read at the single most emotional moment in the funnel, versus what was written for it:

| Type | Rendered (reveal.welcome) | Shadowed (TYPE_REVEAL_SENTENCES) |
|---|---|---|
| 5 | "You've protected your inner world carefully. You're safe here. Read at your own pace. **Nothing costs anything you weren't already going to spend.**" | "You see what others miss. Your mind is your compass." |
| 9 | "**Everything you need, in one place. No decisions. Just the path.**" | "You make peace possible. Now make it for yourself, too." |
| 6 | "You've been preparing for something your whole life. This might be the preparation that actually matters. **Trusted sources throughout.**" | "You build loyalty that lasts a lifetime. Trust begins with yourself." |
| 4 | "You've always felt different. There's a reason for that, and it's not a deficiency. **This space is built for depth.**" | "You transform suffering into meaning. That is your gift and your work." |

The `reveal.welcome` variants are welcome-to-the-app copy — they describe the product (pricing reassurance, source credibility, feature framing). The aha moment is the one place in the app where the sentence must be a mirror, not a pitch. Type 5's line puts a **pricing message** two lines under the type name, four seconds after the confetti.

**Fix:** precedence swapped to `{revealSentence || resolveTypeAwareCopy("reveal.welcome", result.type)}`, with a comment explaining why. One line. Nothing deleted, no reorder, no hedging touched, and the type-aware variants remain as the fallback path. tsc: PASS.

**Note for the conversion radar:** the demoted `reveal.welcome` lines are good copy in the wrong place. They belong on a post-reveal welcome surface (step 6, the email gate, or first dashboard load) where product framing is appropriate. Currently they render nowhere.

---

## 1. New-user journey map — 12 taps (unchanged)

| # | Screen | File |
|---|---|---|
| 1 | Home hero → "Discover my type" → `/onboarding?fromEnter=true` | [page.tsx](src/app/page.tsx) |
| 2 | Type Preview interstitial → "Start the assessment" | [onboarding/page.tsx:645](src/app/onboarding/page.tsx:645) |
| 3–5 | Triage Q1–Q3 (find your center) | [QuickTypeAssessment.tsx:45](src/components/assessments/QuickTypeAssessment.tsx:45) |
| 6–8 | Center-specific Q1–Q3 | [:129](src/components/assessments/QuickTypeAssessment.tsx:129) / [:210](src/components/assessments/QuickTypeAssessment.tsx:210) / [:291](src/components/assessments/QuickTypeAssessment.tsx:291) |
| 9 | Confirm screen (top type vs runner-up) | |
| 10–12 | Instinct Q1–Q3 | [:571](src/components/assessments/QuickTypeAssessment.tsx:571) |
| — | Processing screen (2.5s, passive) | [:1184](src/components/assessments/QuickTypeAssessment.tsx:1184) |
| — | **AHA — TypeRevealScreen** | [onboarding/page.tsx:220](src/app/onboarding/page.tsx:220) |

3 + 3 + 1 + 3 = 10 answer taps + 2 navigation taps. The "10 questions · ~3 minutes" copy is accurate. Name entry is correctly skipped when `fromEnter=true`. 380ms forced delay per answer ([:981](src/components/assessments/QuickTypeAssessment.tsx:981)) ≈ 3.8s of pure waiting, plus 2.5s processing.

## 2. Signup wall — CLEAN

No `src/middleware.ts` anywhere in the tree (verified by `find`). No route guards, no auth redirect in `page.tsx`, `onboarding/page.tsx`, or `QuickTypeAssessment.tsx`. Email gate is step 6, **after** the step-4 reveal, and skippable. Duolingo pattern, done correctly.

## 3. Assessment length — GOOD

10 taps, well under the 25-question drop-off threshold.

## 4. Result page quality — STRONGER NOW, STILL UNDERCUT BY ORDER

Opening: chibi sprite (200px, spring) → type badge → "The {typeName}" → **now the recognition sentence** → Wound/Passion/Fixation/Armor → confetti on mount. With today's fix the first four elements are all recognition, no product framing.

DOM order below that is unchanged:

```
W/P/F/A bullets                                          ← recognition peaks here
Confidence meter (22%, orange, "Low, starting point")    :379
"Why this might be wrong" (collapsible)                  :409
"Not sure yet? That's normal."                           :452
/mirror link ("Optional · experimental")                 :469
Achievement Unlocked card (+25 tokens, appears at 1.5s)  :501
CTA "This is me →"                                       :543
"This doesn't feel like me → Try Type N"                 :558
SHARE CARD (TypeIdentityCard)                            :576
"Get your shareable identity card" → /identity           :596
```

The hedging must stay — CLAUDE.md forbids pseudoscience framing and predictive-accuracy claims, and the `── Hedge Hard ──` comments show it was deliberate. The issue is position, not existence.

## 5. Processing moment — PRESENT

2.5s two-stage screen: "Mapping your pattern..." → (1.2s) → "Finding your type...". Result held in `pendingResultValue`, delivered on fade-out. Headspace pattern.

## 6. Share moment — PRESENT BUT BURIED

`TypeIdentityCard` embedded at reveal (comment: "Peak-moment shareable"), `useVerifiedShare` awards +20 tokens. Renders 9th at `delay: 0.9`, roughly four phone-screens down. Peak virality is the first ~15 seconds; almost nobody scrolls that far before tapping "This is me →".

---

## Biggest friction point (unchanged, still founder-gated)

**The share card and primary CTA sit below three consecutive confidence-hedging blocks, so the peak-emotional moment is spent on doubt instead of on recognition, sharing, or forward motion.**

### Recommended fix — NOT applied

Reorder `TypeRevealScreen` only. No copy deleted, no hedging removed:

1. Chibi → badge → name → recognition sentence → W/P/F/A *(unchanged)*
2. Share card + Achievement Unlocked — capture the peak
3. CTA "This is me →" and runner-up button
4. Confidence meter, "Why this might be wrong", "Not sure yet?" — below the fold, fully intact
5. /mirror link, /identity link

**Why not shipped:** `project_engagement_patterns.md` records an explicit rule — onboarding is an A/B target, never a replace target; changes route through a PostHog feature flag with both variants live. Reordering the highest-conversion screen in the funnel is exactly what that rule exists for, and how prominently the app disclaims itself is a founder ethics call. Ready as variant `reveal_order_v2` against current order as control, measured on `share_card_*_post_result` and step-4 → step-6 continue rate.

Today's copy fix was shipped because it is a correctness bug (unreachable code path restoring the sentence the screen was designed around), not a layout or ordering change.

---

## Logged, not fixed

- **Layout shift on the reveal screen.** The Achievement Unlocked card mounts at 1.5s ([onboarding/page.tsx:501](src/app/onboarding/page.tsx:501)) *above* the CTA, pushing "This is me →" down mid-reach. Reserving its height would fix the mis-tap risk, but it touches reveal-screen layout — bundle it into `reveal_order_v2`.
- **Animation delays run out of visual order.** CTA is `delay: 0.6`, but elements above it are at 0.68 ("Not sure yet") and 0.78 (/mirror link). The button appears before the blocks above it. Cosmetic; same A/B bundle.
- **Emoji in onboarding UI** — violates the no-emoji rule. `MOTIVATION_OPTIONS` ([:695](src/app/onboarding/page.tsx:695)) uses 🔍 💞 🌱 🎯 😔; `PRACTICE_TIME_OPTIONS` ([:1137](src/app/onboarding/page.tsx:1137)) uses ☀️ 🌤️ 🌙. Both post-aha (steps 11–12). Removing them changes row layout — needs a design decision (drop the glyph column vs. Lucide icons).
- **`TYPE_COLORS` vs `enneagramTypes[].color` disagree for Type 6** inside `src/data/enneagram.ts` — `TYPE_COLORS[6] = "#27AE60"` (green) vs `enneagramTypes[6].color = "#7A8FA6"` (gray-blue). Pre-existing; picking a canonical Six color is a design call.
- **Per-answer delay 380ms → 220ms** would save ~1.6s. Cheap, but it is a funnel timing change — A/B bundle.
