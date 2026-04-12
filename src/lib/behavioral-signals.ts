// Behavioral Signals: Passive Psychometric Data Collection
//
// Tracks feature avoidance patterns, session dropout points, and usage
// timing as personality signals. Based on:
//   - Mischel & Shoda CAPS model (1995): personality IS if-then signatures
//   - Hayes et al. (2004): experiential avoidance as transdiagnostic marker
//   - Adan et al. (2012): chronotype-personality correlations
//
// All data stays on-device (localStorage). No server calls.
// User can see and export everything via /data-usage.

const AVOIDANCE_KEY = "psyche-feature-avoidance";
const DROPOUT_KEY = "psyche-exercise-dropouts";
const USAGE_TIMING_KEY = "psyche-usage-timing";
const ENGAGEMENT_KEY = "psyche-feature-engagement";

export interface AvoidanceRecord {
  feature: string;
  skippedCount: number;
  offeredCount: number;
  lastSkipped: string;
}

export interface DropoutRecord {
  lessonId: string;
  exerciseId: string;
  exerciseType: string;
  timestamp: string;
}

export interface UsageTiming {
  date: string;
  hour: number;
  dayOfWeek: number;
  sessionDurationMs: number;
}

// ── Feature Avoidance Tracking ──────────────────────────────────────────────

/**
 * Record that a feature was offered to the user. Call this when a
 * skippable card (body map, practice of opposite, morning reflection, etc.)
 * is rendered on HubView.
 */
export function recordFeatureOffered(feature: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(AVOIDANCE_KEY);
    const records: Record<string, AvoidanceRecord> = raw ? JSON.parse(raw) : {};
    if (!records[feature]) {
      records[feature] = { feature, skippedCount: 0, offeredCount: 0, lastSkipped: "" };
    }
    records[feature].offeredCount += 1;
    localStorage.setItem(AVOIDANCE_KEY, JSON.stringify(records));
  } catch {}
}

/**
 * Record that the user SKIPPED a feature (pressed "Skip" or dismissed).
 */
export function recordFeatureSkipped(feature: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(AVOIDANCE_KEY);
    const records: Record<string, AvoidanceRecord> = raw ? JSON.parse(raw) : {};
    if (!records[feature]) {
      records[feature] = { feature, skippedCount: 0, offeredCount: 0, lastSkipped: "" };
    }
    records[feature].skippedCount += 1;
    records[feature].lastSkipped = new Date().toISOString();
    localStorage.setItem(AVOIDANCE_KEY, JSON.stringify(records));
  } catch {}
}

/**
 * Record that the user ENGAGED with a feature (completed it).
 */
export function recordFeatureEngaged(feature: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(ENGAGEMENT_KEY);
    const records: Record<string, number> = raw ? JSON.parse(raw) : {};
    records[feature] = (records[feature] ?? 0) + 1;
    localStorage.setItem(ENGAGEMENT_KEY, JSON.stringify(records));
  } catch {}
}

/**
 * Get all avoidance records sorted by skip rate (highest first).
 */
export function getAvoidancePatterns(): Array<AvoidanceRecord & { skipRate: number }> {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(AVOIDANCE_KEY);
    if (!raw) return [];
    const records: Record<string, AvoidanceRecord> = JSON.parse(raw);
    return Object.values(records)
      .filter(r => r.offeredCount >= 3) // need at least 3 offers to be meaningful
      .map(r => ({
        ...r,
        skipRate: r.offeredCount > 0 ? r.skippedCount / r.offeredCount : 0,
      }))
      .sort((a, b) => b.skipRate - a.skipRate);
  } catch {
    return [];
  }
}

// ── Exercise Dropout Tracking ───────────────────────────────────────────────

/**
 * Record that the user abandoned an exercise mid-lesson.
 */
export function recordExerciseDropout(lessonId: string, exerciseId: string, exerciseType: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(DROPOUT_KEY);
    const records: DropoutRecord[] = raw ? JSON.parse(raw) : [];
    records.push({ lessonId, exerciseId, exerciseType, timestamp: new Date().toISOString() });
    localStorage.setItem(DROPOUT_KEY, JSON.stringify(records.slice(-100))); // keep last 100
  } catch {}
}

/**
 * Get dropout patterns: which exercise types cause the most abandonment.
 */
export function getDropoutPatterns(): Array<{ exerciseType: string; count: number }> {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DROPOUT_KEY);
    if (!raw) return [];
    const records: DropoutRecord[] = JSON.parse(raw);
    const counts: Record<string, number> = {};
    for (const r of records) {
      counts[r.exerciseType] = (counts[r.exerciseType] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([exerciseType, count]) => ({ exerciseType, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}

// ── Usage Timing ────────────────────────────────────────────────────────────

/**
 * Record a session start (call on app open / HubView mount).
 */
export function recordSessionStart() {
  if (typeof window === "undefined") return;
  try {
    const now = new Date();
    const raw = localStorage.getItem(USAGE_TIMING_KEY);
    const records: UsageTiming[] = raw ? JSON.parse(raw) : [];
    records.push({
      date: now.toISOString().slice(0, 10),
      hour: now.getHours(),
      dayOfWeek: now.getDay(),
      sessionDurationMs: 0, // updated on unmount
    });
    localStorage.setItem(USAGE_TIMING_KEY, JSON.stringify(records.slice(-90)));
    // Store session start for duration calc
    sessionStorage.setItem("psyche-session-start", String(now.getTime()));
  } catch {}
}

/**
 * Update the last session's duration (call on page unload or background).
 */
export function recordSessionEnd() {
  if (typeof window === "undefined") return;
  try {
    const startStr = sessionStorage.getItem("psyche-session-start");
    if (!startStr) return;
    const durationMs = Date.now() - parseInt(startStr, 10);
    const raw = localStorage.getItem(USAGE_TIMING_KEY);
    if (!raw) return;
    const records: UsageTiming[] = JSON.parse(raw);
    if (records.length > 0) {
      records[records.length - 1].sessionDurationMs = durationMs;
      localStorage.setItem(USAGE_TIMING_KEY, JSON.stringify(records));
    }
  } catch {}
}

/**
 * Get usage timing insights.
 */
export function getTimingInsights(): {
  peakHour: number;
  peakDay: string;
  avgSessionMinutes: number;
  totalSessions: number;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USAGE_TIMING_KEY);
    if (!raw) return null;
    const records: UsageTiming[] = JSON.parse(raw);
    if (records.length < 3) return null;

    // Peak hour
    const hourCounts: Record<number, number> = {};
    for (const r of records) hourCounts[r.hour] = (hourCounts[r.hour] ?? 0) + 1;
    const peakHour = Object.entries(hourCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "9";

    // Peak day
    const dayCounts: Record<number, number> = {};
    for (const r of records) dayCounts[r.dayOfWeek] = (dayCounts[r.dayOfWeek] ?? 0) + 1;
    const peakDayNum = Object.entries(dayCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "1";
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const peakDay = dayNames[parseInt(peakDayNum, 10)] ?? "Monday";

    // Avg session
    const durations = records.filter(r => r.sessionDurationMs > 10000); // filter out bounces
    const avgMs = durations.length
      ? durations.reduce((a, b) => a + b.sessionDurationMs, 0) / durations.length
      : 0;

    return {
      peakHour: parseInt(peakHour, 10),
      peakDay,
      avgSessionMinutes: Math.round(avgMs / 60000),
      totalSessions: records.length,
    };
  } catch {
    return null;
  }
}

// ── Avoidance Insight Generation ────────────────────────────────────────────

const FEATURE_LABELS: Record<string, { label: string; typeRelevance: Record<number, string> }> = {
  "body-map": {
    label: "Body check-in",
    typeRelevance: {
      5: "Type 5s often avoid somatic data. The retreat to the mind skips the body.",
      7: "Type 7s move fast past body signals. Staying with sensation is the growth edge.",
      3: "Type 3s bypass body signals to keep performing. The body holds what the image cannot.",
    },
  },
  "practice-opposite": {
    label: "Practice of the Opposite",
    typeRelevance: {
      9: "Type 9s avoid the challenge because it asks for assertion. That avoidance IS the pattern.",
      1: "Type 1s avoid imperfection exercises. The discomfort is the medicine.",
      6: "Type 6s avoid uncertainty exercises. The avoidance reinforces the doubt.",
    },
  },
  "morning-intention": {
    label: "Morning intention",
    typeRelevance: {
      7: "Type 7s skip the morning anchor because commitment feels like a cage.",
      5: "Type 5s skip the morning practice to preserve energy. But it costs 60 seconds.",
    },
  },
  "evening-reflection": {
    label: "Evening reflection",
    typeRelevance: {
      3: "Type 3s skip the evening review because it requires slowing down and feeling.",
      8: "Type 8s skip the evening reflection because vulnerability surfaces when the day is done.",
    },
  },
  "state-checkin": {
    label: "State check-in",
    typeRelevance: {
      9: "Type 9s skip the state check-in because noticing internal states risks waking up anger.",
      7: "Type 7s skip state tracking because it means sitting with whatever is actually there.",
    },
  },
  "question-of-week": {
    label: "Question of the week",
    typeRelevance: {
      7: "Type 7s dismiss the weekly question because it asks for depth instead of breadth.",
      3: "Type 3s skip the question because it cannot be completed or won.",
    },
  },
};

/**
 * Generate a type-specific avoidance insight from the user's behavioral data.
 * Returns null if not enough data.
 */
export function generateAvoidanceInsight(enneagramType: number | null): string | null {
  if (!enneagramType) return null;
  const patterns = getAvoidancePatterns();
  if (!patterns.length) return null;

  const topAvoided = patterns[0];
  if (topAvoided.skipRate < 0.5) return null; // not avoiding enough to be meaningful

  const featureInfo = FEATURE_LABELS[topAvoided.feature];
  if (!featureInfo) return null;

  const typeInsight = featureInfo.typeRelevance[enneagramType];
  if (typeInsight) {
    return `You've skipped the ${featureInfo.label} ${topAvoided.skippedCount} out of ${topAvoided.offeredCount} times. ${typeInsight}`;
  }

  return `You've skipped the ${featureInfo.label} ${Math.round(topAvoided.skipRate * 100)}% of the time. The features you avoid are often the ones closest to your growth edge.`;
}
