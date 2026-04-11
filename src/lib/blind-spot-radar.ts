// Blind Spot Radar
//
// Cross-references multiple data streams (state check-ins, body map,
// feature avoidance, journal language, session timing, reaction time)
// to surface correlations the user cannot see themselves. Then filters
// through the Enneagram type's known attention blind spots to prioritize
// the insights the user is LEAST likely to notice on their own.
//
// No ML needed. Correlations + a static blind spot matrix derived from
// Enneagram theory.

import { getAvoidancePatterns, getTimingInsights } from "@/lib/behavioral-signals";
import { collectTextCorpus, analyzeLinguistics, computeGrowthVector } from "@/lib/living-mirror";

export interface BlindSpotInsight {
  title: string;
  body: string;
  dataPoints: string; // what data was cross-referenced
  severity: "notice" | "pattern" | "alert";
}

// What each type's attention habitually skips
// Based on Enneagram theory: each type has systematic blind spots
const TYPE_BLIND_SPOTS: Record<number, string[]> = {
  1: ["body-tension", "anger-signal", "emotional-avoidance", "perfectionism-cost"],
  2: ["own-needs", "giving-pattern", "boundary-erosion", "self-neglect"],
  3: ["emotional-flatness", "performance-exhaustion", "authenticity-gap", "rest-avoidance"],
  4: ["ordinary-dismissal", "comparison-frequency", "action-avoidance", "suffering-identity"],
  5: ["body-disconnection", "isolation-pattern", "engagement-avoidance", "energy-hoarding"],
  6: ["trust-capacity", "anxiety-baseline", "authority-seeking", "worst-case-frequency"],
  7: ["depth-avoidance", "discomfort-escape", "commitment-pattern", "staying-difficulty"],
  8: ["vulnerability-avoidance", "softness-suppression", "control-frequency", "impact-on-others"],
  9: ["anger-suppression", "preference-erasure", "merging-pattern", "self-neglect"],
};

/**
 * Generate blind spot insights by cross-referencing available data streams.
 */
export function generateBlindSpotInsights(enneagramType: number): BlindSpotInsight[] {
  if (typeof window === "undefined") return [];
  const insights: BlindSpotInsight[] = [];
  const blindSpots = TYPE_BLIND_SPOTS[enneagramType] ?? [];

  // 1. Feature avoidance × type blind spot
  const avoidance = getAvoidancePatterns();
  if (avoidance.length > 0) {
    const topAvoided = avoidance[0];
    if (topAvoided.skipRate > 0.5) {
      const avoidanceMap: Record<string, string> = {
        "body-map": "body-disconnection",
        "practice-opposite": "depth-avoidance",
        "morning-intention": "commitment-pattern",
        "evening-reflection": "emotional-avoidance",
        "state-checkin": "body-disconnection",
      };
      const mappedBlindSpot = avoidanceMap[topAvoided.feature];
      if (mappedBlindSpot && blindSpots.includes(mappedBlindSpot)) {
        insights.push({
          title: "You are avoiding something your type is built not to notice",
          body: `You skip the ${topAvoided.feature.replace(/-/g, " ")} ${Math.round(topAvoided.skipRate * 100)}% of the time. For your type, this specific avoidance aligns with a known blind spot. The feature you avoid most is often the one closest to your growth edge.`,
          dataPoints: "Feature avoidance data + Enneagram blind spot matrix",
          severity: "pattern",
        });
      }
    }
  }

  // 2. Journal language analysis × type pattern
  const corpus = collectTextCorpus();
  if (corpus.length >= 5) {
    const profile = analyzeLinguistics(corpus);
    const growth = computeGrowthVector(corpus);

    // High hedging + Type 6 = doubt-as-default
    if (enneagramType === 6 && profile.hedgingRatio > 0.02) {
      insights.push({
        title: "Your language defaults to uncertainty",
        body: `${Math.round(profile.hedgingRatio * 1000) / 10}% of your words are hedging language ("maybe", "I think", "probably"). For your type, doubt is not just a feeling, it is embedded in how you construct sentences. This is your blind spot made visible in text.`,
        dataPoints: "Journal linguistic analysis + Enneagram type 6 pattern",
        severity: "pattern",
      });
    }

    // Low agency + Type 9 = preference erasure
    if (enneagramType === 9 && profile.agencyRatio < 0.005) {
      insights.push({
        title: "Your words rarely claim agency",
        body: `"I chose", "I decided", "I want" appear less than 0.5% of the time in your writing. For your type, this pattern of absent agency in language mirrors the pattern of absent agency in life. You describe things happening to you more than things you chose.`,
        dataPoints: "Journal agency word ratio + Enneagram type 9 pattern",
        severity: "alert",
      });
    }

    // Low emotion words + Type 3 = emotional flatness
    if (enneagramType === 3 && profile.emotionWords < 1.5) {
      insights.push({
        title: "Your reflections rarely name emotions",
        body: `Only ${Math.round(profile.emotionWords * 10) / 10}% of your words are emotion words. Your writing describes what happened and what you did, but not how you felt. For your type, this efficiency in language mirrors a deeper pattern: bypassing feelings to get to the next achievement.`,
        dataPoints: "Journal emotion word ratio + Enneagram type 3 pattern",
        severity: "pattern",
      });
    }

    // High insight words + Type 5 = understanding-as-defense
    if (enneagramType === 5 && profile.insightWords > 3) {
      insights.push({
        title: "You understand more than you act on",
        body: `${Math.round(profile.insightWords * 10) / 10}% of your words are insight words ("realize", "understand", "notice"). That is high. For your type, the question is not whether you see the pattern, it is whether seeing the pattern has changed anything. Understanding can be its own defense.`,
        dataPoints: "Journal insight word ratio + Enneagram type 5 pattern",
        severity: "notice",
      });
    }

    // Growth vector stall
    if (growth.direction === "stable" && corpus.length > 15) {
      insights.push({
        title: "Your language has plateaued",
        body: `Across ${corpus.length} entries, your linguistic patterns have not shifted measurably. This is not failure. But it may mean the practice has become routine rather than confrontational. Growth in language usually tracks growth in awareness. If the language is flat, the awareness may be coasting.`,
        dataPoints: "Growth vector analysis (early vs recent entries)",
        severity: "notice",
      });
    }
  }

  // 3. Session timing × type pattern
  const timing = getTimingInsights();
  if (timing && timing.totalSessions >= 7) {
    // Late-night usage + certain types
    if (timing.peakHour >= 22 || timing.peakHour <= 3) {
      if (enneagramType === 4 || enneagramType === 5 || enneagramType === 6) {
        insights.push({
          title: "You come to the app when the world is quiet",
          body: `Your peak usage is ${timing.peakHour > 12 ? timing.peakHour - 12 : timing.peakHour}${timing.peakHour >= 12 ? "pm" : "am"}. For your type, late-night self-reflection can be the most honest kind, but it can also be the most ruminative. Notice whether you are reflecting or spiraling.`,
          dataPoints: "Session timing data + Enneagram type pattern",
          severity: "notice",
        });
      }
    }

    // Very short sessions + Type 7 = depth avoidance
    if (enneagramType === 7 && timing.avgSessionMinutes < 3) {
      insights.push({
        title: "Your sessions are shorter than average",
        body: `Average session: ${timing.avgSessionMinutes} minutes. For your type, brevity can mean efficiency, but it can also mean you are skimming the surface to avoid what slowing down would reveal. What would a 10-minute session feel like?`,
        dataPoints: "Session duration data + Enneagram type 7 pattern",
        severity: "pattern",
      });
    }
  }

  // 4. Body map × type center
  try {
    const bodyRaw = localStorage.getItem("psyche-body-history");
    if (bodyRaw) {
      const bodyHistory = JSON.parse(bodyRaw);
      if (bodyHistory.length >= 5) {
        // Check if tension consistently sits in the type's center
        const centerMap: Record<number, string> = {
          8: "gut", 9: "gut", 1: "gut",
          2: "heart", 3: "heart", 4: "heart",
          5: "head", 6: "head", 7: "head",
        };
        const expectedCenter = centerMap[enneagramType];
        // Count how often tension is in the expected center
        let matchCount = 0;
        for (const entry of bodyHistory) {
          const answers = entry.answers;
          if (!answers) continue;
          // Map body parts to centers
          const bodyToCenter: Record<string, string> = {
            chest: "heart", shoulders: "heart",
            belly: "gut", jaw: "gut",
            breath: "head",
          };
          for (const [part, value] of Object.entries(answers)) {
            if (value === 2 && bodyToCenter[part] === expectedCenter) matchCount++;
          }
        }
        if (matchCount >= 3) {
          const centerLabels: Record<string, string> = { gut: "body center (belly and jaw)", heart: "heart center (chest and shoulders)", head: "head center (neck and breathing)" };
          insights.push({
            title: `Your tension pattern matches your type's center`,
            body: `Across ${bodyHistory.length} body check-ins, tension consistently shows up in your ${centerLabels[expectedCenter] ?? expectedCenter}. This is the ${expectedCenter} center, which is exactly where your Enneagram type holds its core pattern. Your body is confirming what the type system predicts.`,
            dataPoints: "Body map history + Enneagram center theory",
            severity: "notice",
          });
        }
      }
    }
  } catch {}

  // Sort by severity (alert > pattern > notice)
  const severityOrder: Record<string, number> = { alert: 0, pattern: 1, notice: 2 };
  insights.sort((a, b) => (severityOrder[a.severity] ?? 2) - (severityOrder[b.severity] ?? 2));

  return insights.slice(0, 3); // top 3
}
