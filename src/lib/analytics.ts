/**
 * Thyself — Typed Analytics
 *
 * Single source of truth for all PostHog events.
 * Every analytics call MUST go through track() — no raw posthog.capture() calls.
 *
 * This file is the EventSchema required by the dev instructions:
 * "Every analytics event must be typed in a central EventSchema type file —
 *  no raw strings anywhere."
 *
 * All events automatically receive: user_id, session_id, platform, app_version, timestamp.
 */

import { posthog } from "@/lib/posthog";

// ─── Platform detection ───────────────────────────────────────────────────────

function getPlatform(): "web" | "ios" | "android" {
  if (typeof window === "undefined") return "web";
  // Capacitor injects window.Capacitor when running natively
  const cap = (window as unknown as { Capacitor?: { getPlatform?: () => string } }).Capacitor;
  if (cap?.getPlatform) {
    const p = cap.getPlatform();
    if (p === "ios") return "ios";
    if (p === "android") return "android";
  }
  return "web";
}

const APP_VERSION = "1.0.0";

// ─── Session ID (persists for 30 min of inactivity) ───────────────────────────

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server";
  try {
    const KEY = "psyche-session-id";
    const TS_KEY = "psyche-session-ts";
    const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

    const lastTs = Number(localStorage.getItem(TS_KEY) ?? 0);
    const now = Date.now();

    if (!localStorage.getItem(KEY) || now - lastTs > TIMEOUT_MS) {
      const id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
      localStorage.setItem(TS_KEY, String(now));
      return id;
    }
    localStorage.setItem(TS_KEY, String(now)); // refresh timestamp
    return localStorage.getItem(KEY)!;
  } catch {
    return "anon-session";
  }
}

function getUserId(): string {
  if (typeof window === "undefined") return "server";
  try {
    return localStorage.getItem("psyche-device-id") ?? "anon";
  } catch {
    return "anon";
  }
}

// ─── Base properties (attached to every event) ────────────────────────────────

function baseProps() {
  return {
    user_id: getUserId(),
    session_id: getOrCreateSessionId(),
    platform: getPlatform(),
    app_version: APP_VERSION,
  } as const;
}

// ─── Event Schema ─────────────────────────────────────────────────────────────
// Discriminated union — every event name maps to its required properties.
// Add new events here; never call posthog.capture() directly elsewhere.

export type EventSchema =
  // ── App lifecycle ──────────────────────────────────────────────────────────
  | { event: "app_open";                  properties: { first_open: boolean; days_since_last_open: number } }

  // ── Lessons ────────────────────────────────────────────────────────────────
  | { event: "lesson_start";              properties: { lesson_id: string; framework: Framework; type_focus: number; lesson_index: number } }
  | { event: "lesson_complete";           properties: { lesson_id: string; framework: Framework; time_spent_seconds: number; score: number } }
  | { event: "arc_complete";              properties: { arc_id: string; framework: Framework; type_focus: number } }

  // ── Quizzes ────────────────────────────────────────────────────────────────
  | { event: "quiz_start";                properties: { quiz_id: string; framework: Framework; question_count: number } }
  | { event: "quiz_complete";             properties: { quiz_id: string; framework: Framework; question_count: number; score_pct: number; time_spent_seconds?: number } }
  | { event: "quiz_skip";                 properties: { quiz_id: string; framework: Framework } }

  // ── Assessments ────────────────────────────────────────────────────────────
  | { event: "assessment_start";          properties: { instrument: Instrument; question_count?: number } }
  | { event: "assessment_complete";       properties: { instrument: Instrument; result_type: string; confidence_score: number; time_spent_seconds: number; result_changed?: boolean; previous_result?: string } }

  // ── Streak ─────────────────────────────────────────────────────────────────
  | { event: "streak_continued";          properties: { current_streak: number; longest_streak: number; time_of_day: string } }
  | { event: "streak_broken";             properties: { broken_streak: number; longest_streak: number; time_of_day: string } }
  | { event: "streak_saver_used";         properties: { current_streak: number; saves_remaining: number } }
  | { event: "streak_milestone";          properties: { milestone: 7 | 30 | 100 | 365; current_streak: number } }

  // ── Paywall ────────────────────────────────────────────────────────────────
  | { event: "paywall_view";              properties: { trigger_event: string; paywall_variant: string; framework: Framework; user_lessons_completed: number } }
  | { event: "subscription_start";        properties: { product_id: string; price: number; period: "monthly" | "annual" | "lifetime"; revenue_cat_id?: string } }
  | { event: "subscription_cancel";       properties: { product_id: string; period: "monthly" | "annual" | "lifetime"; revenue_cat_id?: string; cancel_reason?: string } }
  | { event: "checkout_initiated";        properties: { product_id: string; price: number; period: "monthly" | "annual" | "lifetime"; trigger: string } }

  // ── Journal ────────────────────────────────────────────────────────────────
  | { event: "journal_entry_created";     properties: { prompt_id: string; word_count: number; framework: Framework; type_facet?: string; mood?: string; resonated?: boolean } }

  // ── Compatibility ──────────────────────────────────────────────────────────
  | { event: "compatibility_view";        properties: { user_type: string; compared_type: string; framework: Framework; shared_via: boolean } }
  | { event: "compatibility_share";       properties: { user_type: string; compared_type: string; framework: Framework } }

  // ── Notifications ──────────────────────────────────────────────────────────
  | { event: "notification_sent";         properties: { notification_type: string; streak_day: number; send_time: string; delay_seconds: number } }
  | { event: "notification_opened";       properties: { notification_type: string; streak_day: number; send_time: string; delay_seconds: number } }
  | { event: "push_opt_in";              properties: { trigger_screen: string; user_lessons_completed: number; streak_day: number } }

  // ── Onboarding ─────────────────────────────────────────────────────────────
  | { event: "onboarding_started";        properties?: Record<string, unknown> }
  | { event: "onboarding_completed";      properties: { method: "quiz" | "manual" | "skip"; enneagram_type?: number; instinct?: string; duration_seconds?: number } }
  | { event: "type_revealed";             properties: { enneagram_type: number; instinct?: string; confidence?: number } }

  // ── Identity card ──────────────────────────────────────────────────────────
  | { event: "identity_card_viewed";      properties: { enneagram_type?: number; instinct?: string } }
  | { event: "identity_card_shared";      properties: { enneagram_type?: number; instinct?: string; method?: string } }
  | { event: "identity_card_downloaded";  properties: { enneagram_type?: number; instinct?: string } }
  | { event: "identity_card_flipped";     properties: { enneagram_type?: number } }

  // ── Engagement ─────────────────────────────────────────────────────────────
  | { event: "daily_completed";           properties: { enneagram_type?: number; mode?: string; duration_seconds?: number } }
  | { event: "passion_checkin_completed"; properties: { enneagram_type?: number; passion?: string; rating?: number } }
  | { event: "mirror_viewed";             properties?: Record<string, unknown> }
  | { event: "mirror_analyzed";           properties: { word_count: number; entries: number; growth_direction: string } }

  // ── Sharing ────────────────────────────────────────────────────────────────
  | { event: "share_initiated";           properties: { content_type: string; framework?: Framework } }
  | { event: "share_completed";           properties: { content_type: string; framework?: Framework; method?: string } }

  // ── Misc engagement ────────────────────────────────────────────────────────
  | { event: "chibi_named";               properties: { name_length: number; used_suggestion: boolean } }
  | { event: "rarity_card_shared";        properties: { percent: number; one_in: number } }
  | { event: "rarity_card_downloaded";    properties: { percent: number } }
  | { event: "audio_reflection_started";  properties: { enneagram_type?: number; ambient?: string } }
  | { event: "pair_mini_completed";       properties: { friend_type?: string; from_type?: string } }
  | { event: "pair_invite_sent";          properties: { from_type?: string } }
  | { event: "reminder_set";             properties: { time: string; source: string } }
  | { event: "tiktok_frame_shared";       properties: { has_type: boolean } }
  | { event: "tiktok_frame_downloaded";   properties: { has_type: boolean } }
  | { event: "implementation_intention_set"; properties: { time: string } }
  | { event: "bookmark_added";            properties: { content_type: string; content_id: string } }
  | { event: "search_query";             properties: { query: string; result_count: number } };

// ─── Supporting types ─────────────────────────────────────────────────────────

export type Framework = "enneagram" | "mbti" | "big5" | "jungian" | "mixed";
export type Instrument = "thyself_9type" | "thyself_16type" | "big5_ipip" | "ieq9_integrative";

// ─── Core track() function ────────────────────────────────────────────────────

/**
 * The ONE function to call for analytics throughout the app.
 * Auto-attaches user_id, session_id, platform, app_version to every event.
 *
 * @example
 *   import { track } from "@/lib/analytics";
 *   track({ event: "lesson_complete", properties: { lesson_id: "l-001", framework: "enneagram", time_spent_seconds: 42, score: 0.85 } });
 */
export function track<T extends EventSchema>(payload: T): void {
  if (typeof window === "undefined") return; // SSR guard
  try {
    const { event, properties } = payload as { event: string; properties?: Record<string, unknown> };
    posthog.capture(event, {
      ...baseProps(),
      ...(properties ?? {}),
    });
  } catch {
    // Analytics must never break the app
  }
}

// ─── app_open helpers ─────────────────────────────────────────────────────────

/**
 * Track app_open with first_open and days_since_last_open calculated automatically.
 * Call once per session in PostHogProvider.
 */
export function trackAppOpen(): void {
  if (typeof window === "undefined") return;
  try {
    const LAST_OPEN_KEY = "psyche-last-open";
    const now = Date.now();
    const lastOpen = Number(localStorage.getItem(LAST_OPEN_KEY) ?? 0);
    const firstOpen = lastOpen === 0;
    const daysSinceLastOpen = firstOpen ? 0 : Math.floor((now - lastOpen) / 86_400_000);

    localStorage.setItem(LAST_OPEN_KEY, String(now));

    track({
      event: "app_open",
      properties: { first_open: firstOpen, days_since_last_open: daysSinceLastOpen },
    });
  } catch {
    // fail silently
  }
}

// ─── Convenience helpers (type-safe named functions) ──────────────────────────

export const Analytics = {
  appOpen: trackAppOpen,

  lessonStart: (p: Extract<EventSchema, { event: "lesson_start" }>["properties"]) =>
    track({ event: "lesson_start", properties: p }),

  lessonComplete: (p: Extract<EventSchema, { event: "lesson_complete" }>["properties"]) =>
    track({ event: "lesson_complete", properties: p }),

  quizStart: (p: Extract<EventSchema, { event: "quiz_start" }>["properties"]) =>
    track({ event: "quiz_start", properties: p }),

  quizComplete: (p: Extract<EventSchema, { event: "quiz_complete" }>["properties"]) =>
    track({ event: "quiz_complete", properties: p }),

  assessmentStart: (p: Extract<EventSchema, { event: "assessment_start" }>["properties"]) =>
    track({ event: "assessment_start", properties: p }),

  assessmentComplete: (p: Extract<EventSchema, { event: "assessment_complete" }>["properties"]) =>
    track({ event: "assessment_complete", properties: p }),

  streakContinued: (p: Extract<EventSchema, { event: "streak_continued" }>["properties"]) =>
    track({ event: "streak_continued", properties: p }),

  streakBroken: (p: Extract<EventSchema, { event: "streak_broken" }>["properties"]) =>
    track({ event: "streak_broken", properties: p }),

  streakMilestone: (p: Extract<EventSchema, { event: "streak_milestone" }>["properties"]) =>
    track({ event: "streak_milestone", properties: p }),

  paywallView: (p: Extract<EventSchema, { event: "paywall_view" }>["properties"]) =>
    track({ event: "paywall_view", properties: p }),

  subscriptionStart: (p: Extract<EventSchema, { event: "subscription_start" }>["properties"]) =>
    track({ event: "subscription_start", properties: p }),

  journalEntryCreated: (p: Extract<EventSchema, { event: "journal_entry_created" }>["properties"]) =>
    track({ event: "journal_entry_created", properties: p }),

  compatibilityView: (p: Extract<EventSchema, { event: "compatibility_view" }>["properties"]) =>
    track({ event: "compatibility_view", properties: p }),

  onboardingCompleted: (p: Extract<EventSchema, { event: "onboarding_completed" }>["properties"]) =>
    track({ event: "onboarding_completed", properties: p }),

  typeRevealed: (p: Extract<EventSchema, { event: "type_revealed" }>["properties"]) =>
    track({ event: "type_revealed", properties: p }),

  pushOptIn: (p: Extract<EventSchema, { event: "push_opt_in" }>["properties"]) =>
    track({ event: "push_opt_in", properties: p }),
} as const;
