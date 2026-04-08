/**
 * PostHog analytics client
 *
 * Usage anywhere in the app:
 *   import { posthog } from "@/lib/posthog";
 *   posthog.capture("quiz_completed", { enneagramType: 5 });
 *
 * Initialised lazily — safe to call on the server (no-ops there).
 *
 * Set NEXT_PUBLIC_POSTHOG_KEY in your env to activate.
 * Get your key at https://app.posthog.com/project/settings
 */

import posthogJs from "posthog-js";

const POSTHOG_KEY  = process.env.NEXT_PUBLIC_POSTHOG_KEY  ?? "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialised = false;

function init() {
  if (typeof window === "undefined") return; // SSR guard
  if (initialised || !POSTHOG_KEY) return;
  initialised = true;

  posthogJs.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false, // We fire manually via the provider
    capture_pageleave: true,
    // Respect user privacy
    opt_out_capturing_by_default: false,
    autocapture: true,
  });
}

// Re-export the posthog instance with a lazy init wrapper
export const posthog = {
  /** Identify a user (call once you have a stable ID, e.g. their device UUID) */
  identify(id: string, properties?: Record<string, unknown>) {
    init();
    if (!POSTHOG_KEY) return;
    posthogJs.identify(id, properties);
  },

  /** Record a custom event */
  capture(event: string, properties?: Record<string, unknown>) {
    init();
    if (!POSTHOG_KEY) return;
    posthogJs.capture(event, properties);
  },

  /** Record a page view */
  pageview(path?: string) {
    init();
    if (!POSTHOG_KEY) return;
    posthogJs.capture("$pageview", { $current_url: path ?? window.location.href });
  },

  /** Reset identity (e.g. on logout) */
  reset() {
    if (!POSTHOG_KEY) return;
    posthogJs.reset();
  },
};

// Named events for consistency across the codebase
export const EVENTS = {
  // Onboarding
  ONBOARDING_STARTED:       "onboarding_started",
  ONBOARDING_COMPLETED:     "onboarding_completed",
  TYPE_REVEALED:            "type_revealed",

  // Assessments
  QUIZ_STARTED:             "quiz_started",
  QUIZ_COMPLETED:           "quiz_completed",
  QUIZ_SKIPPED:             "quiz_skipped",

  // Daily practice
  DAILY_COMPLETED:          "daily_completed",
  STREAK_MILESTONE:         "streak_milestone",

  // Store / monetisation
  CHECKOUT_INITIATED:       "checkout_initiated",
  PURCHASE_COMPLETED:       "purchase_completed",
  PRO_SUBSCRIBED:           "pro_subscribed",

  // Sharing
  SHARE_INITIATED:          "share_initiated",
  SHARE_COMPLETED:          "share_completed",

  // Engagement
  LESSON_COMPLETED:         "lesson_completed",
  ARC_COMPLETED:            "arc_completed",
};
