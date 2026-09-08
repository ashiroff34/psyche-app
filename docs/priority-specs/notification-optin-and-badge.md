# Spec — Push opt-in priming, decline handling, and app icon badge

**Source:** competitor-radar 2026-09-08
**Priority relevance:** Priority 2 (streak mechanic) — repairs the push layer of the 3-layer loss-aversion stack. Also Priority 1 (analytics) — adds the missing push opt-in rate.
**Effort:** Easy for both parts. One library file, one onboarding step, one app-resume listener.
**Status:** SPECCED, NOT BUILT. Awaiting founder go-ahead per the no-new-features rule.

---

## Part 1 — Push opt-in priming and decline handling

### The problem

`requestNativePermission()` at [src/lib/capacitor-notifications.ts:24](../../src/lib/capacitor-notifications.ts:24) is exported but never called from anywhere in `src/`. The OS permission dialog is instead raised implicitly inside `scheduleDailyReminder()`, which runs from `persistImplementationIntent()` when the user taps a practice time during onboarding ([src/app/onboarding/page.tsx:1168](../../src/app/onboarding/page.tsx:1168)).

Three consequences:

1. **Cold prompt.** The OS dialog appears attached to a tap the user reads as "pick a time." Nothing has said what the notification does or why it helps. Industry evidence puts soft-prompt priming at roughly +35 percent opt-in versus a cold ask.
2. **Silent permanent failure.** `scheduleDailyReminder` returns `false` on decline; `persistImplementationIntent` wraps the call in a bare `catch {}` and ignores the return. The implementation intention is written to `localStorage` and the onboarding advances as if it worked. It did not.
3. **The whole push layer dies, not one feature.** A decline also kills `scheduleStreakWarning` and `scheduleTomorrowStreakWarning`. The middle layer of the streak loss-aversion stack (passive card, push, StreakSaver modal) is gone, and nothing records that.

### Change 1a — priming step before the OS prompt

Add a priming screen in onboarding immediately before `StepImplementationIntention` ([src/app/onboarding/page.tsx:1186](../../src/app/onboarding/page.tsx:1186)), or fold the priming copy into the top of that step so it is read before any tap can fire the prompt.

Requirements:
- Explain the benefit in Thyself's voice before the OS dialog. No "AI" label, no dashes in UI text, no emoji, no mystical framing.
- Offer a genuine decline that does not raise the OS prompt at all. Preserving the ability to ask again later is the entire point of priming, and the OS gives exactly one chance.
- Suggested copy direction (route through pinky and dinky before shipping): name the concrete thing the reminder does, at the time they just chose, rather than asking for "notifications" in the abstract.

### Change 1b — call `requestNativePermission()` explicitly and handle the result

In `persistImplementationIntent()`:
- Call `requestNativePermission()` explicitly after the user accepts the priming step, and branch on its boolean.
- Persist the outcome under a stable key, e.g. `psyche-push-permission` with values `granted` / `denied` / `unasked`, so the rest of the app can read it.
- On `false`, do not fail silently. The intent should still persist (it is used for in-app copy), but the app now knows the push layer is unavailable for this user.

### Change 1c — instrument it

Emit PostHog events on both branches, e.g. `push_permission_prompted`, `push_permission_granted`, `push_permission_denied`, carrying the practice-time choice. This is the number the codebase currently cannot answer: what fraction of users can receive a push at all.

Diligence value: without it, the measured effect of the streak mechanic is diluted by an unknown share of users for whom two of its three layers never fired. With it, retention can be segmented by push availability, which makes the streak mechanic's real lift legible to an acquirer.

### Change 1d — in-app fallback when denied

When `psyche-push-permission` is `denied`, `EngagementNudge` and `StreakCard` are the only surviving surfaces. Consider strengthening the in-app at-risk state for that segment, and offering a single, non-nagging path to re-enable in Settings (deep link to OS settings). Do not re-prompt automatically; the OS will not show the dialog twice.

---

## Part 2 — App icon badge

### The problem

Duolingo's published test on the app-icon red dot for a missed lesson measured **+1.6 percent DAU** in isolation. Thyself has replicated every other piece of Duolingo's retention architecture and not this one.

Audit result: no `badge` field on any notification in `capacitor-notifications.ts`; no `setBadgeCount`, no `applicationIconBadgeNumber`, no badge plugin in `package.json`. The only `Badge` symbols in `src/` are the achievement-badge type in `useGameState.ts`, which is unrelated.

`@capacitor/local-notifications` is already a dependency and already supports a `badge` field on the notification object, so this needs no new dependency.

### Change 2a — set the badge

Add `badge: 1` to the notification objects in `scheduleDailyReminder`, `scheduleStreakWarning`, and `scheduleTomorrowStreakWarning`.

Note the platform split: on iOS the badge rides on the delivered notification. On Android, badge behavior is launcher-dependent and generally follows the notification dot rather than a count. Treat iOS as the surface where this measurably works, and let Android degrade to its native dot. Do not add a third-party badge plugin for Android parity; the payoff does not justify the dependency.

### Change 2b — clear the badge on resume

`@capacitor/app` is already a dependency. Add an `appStateChange` listener that, when the app becomes active, clears the badge and removes delivered notifications (`LocalNotifications.removeAllDeliveredNotifications()`).

Place the listener where it runs once for the app shell rather than per-page. A stale badge that never clears is worse than no badge: it trains users to ignore it, which is the failure mode that makes badges feel like spam.

### Change 2c — respect the brand line

The badge is a count on an icon, not a growth-hack surface. One badge for one unmet daily goal. Never stack counts, never badge for marketing or upsell moments. Escalating badge counts read as nagging and contradict the reflective-contemplative positioning, in the same way the leaderboard ban does.

---

## Why these two ship together

Both live in `src/lib/capacitor-notifications.ts` and both concern what the user sees when the app is closed. They are one review pass, one tsc run, one commit each.

They also hedge each other. The badge is the one closed-app loss-aversion surface that survives a push decline, so shipping it alongside the opt-in fix means the denied segment is not left with nothing.

---

## Sequencing

1. Part 1 first, with instrumentation, and let the opt-in rate accumulate for a week or two.
2. Part 2 alongside or immediately after.
3. Only then revisit queue items 4, 5, and 6 (tiered inactivity push, adaptive timing, trial drip). All three sit on top of the push layer and their ceiling is the opt-in rate, so building them before knowing that number is premature.

## Acceptance checks

- `npx tsc --noEmit` passes.
- A declined permission is observable: the persisted key is set and a PostHog event fires.
- Onboarding still completes cleanly on decline, with no dead-end and no visible error.
- The badge clears on app resume, verified on a device or simulator, not just in code review.
- dinky review before ship: no "AI" label, no dashes in UI text, no emoji, no mystical terminology in the priming copy.

## Suggested commit messages

- `fix: prime push permission before the os prompt and handle decline`
- `feat: app icon badge for unmet daily goal inspired by duolingo`
