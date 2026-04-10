// Mirror V2 synthesis layer
//
// Takes the existing LIWC-lite Big Five output from personality-scorer
// and layers on inferred attachment style and inferred Schwartz values,
// plus a one-line "you write like a ..." synthesis.
//
// The inferences are rough heuristics grounded in:
//   - Attachment: Bartholomew & Horowitz (1991) two-axis model mapped to
//     Big Five (Noftle & Shaver, 2006; Shaver & Mikulincer, 2005).
//     Anxious ≈ high N + high E; Avoidant ≈ low A + low E; Secure ≈ low N + moderate E.
//   - Values: Parks-Leduc, Feldman, & Bardi (2015) meta-analysis of Big Five
//     ↔ Schwartz values correlations.
//
// This is NOT a validated instrument. It's a plausible text-based read to
// trigger reflection, which is what the Mirror feature is for.

import type { BigFiveScores } from "@/lib/personality-scorer";
import type { AttachmentStyle } from "@/data/attachment";
import type { SchwartzValue } from "@/data/psychometrics/schwartz-values";

export interface MirrorV2Extras {
  inferredAttachment: {
    style: AttachmentStyle;
    confidence: "low" | "medium" | "high";
    reasoning: string;
  };
  inferredTopValues: SchwartzValue[]; // top 2-3
  inferredBottomValues: SchwartzValue[];
  synthesisLine: string;
}

export function mirrorV2Extras(bigFive: BigFiveScores, wordCount: number): MirrorV2Extras {
  const conf: "low" | "medium" | "high" =
    wordCount < 100 ? "low" : wordCount < 300 ? "medium" : "high";

  // Attachment inference
  // Axis 1 (anxiety): high N signals high anxiety
  // Axis 2 (avoidance): low A + low E signals high avoidance
  const anxietyAxis = bigFive.N; // 0-100
  const avoidanceAxis = 100 - (bigFive.A + bigFive.E) / 2;

  let style: AttachmentStyle;
  let reasoning: string;
  if (anxietyAxis >= 60 && avoidanceAxis >= 55) {
    style = "fearful";
    reasoning = "High neuroticism alongside low agreeableness and extraversion — the push-pull of wanting closeness and fearing it.";
  } else if (anxietyAxis >= 60 && avoidanceAxis < 55) {
    style = "anxious";
    reasoning = "High neuroticism with preserved warmth — the pattern of seeking reassurance rather than retreating.";
  } else if (anxietyAxis < 55 && avoidanceAxis >= 55) {
    style = "dismissive";
    reasoning = "Low neuroticism with low warmth and withdrawal — the pattern of managing intimacy by keeping it at arm's length.";
  } else {
    style = "secure";
    reasoning = "Moderate to low neuroticism with intact warmth — the pattern of being able to depend on others without losing yourself.";
  }

  // Value inference from Parks-Leduc et al. (2015)
  // - High Openness → Self-Direction, Universalism, Stimulation
  // - High Conscientiousness → Achievement, Security, Conformity
  // - High Extraversion → Achievement, Stimulation, Hedonism
  // - High Agreeableness → Benevolence, Universalism, Conformity
  // - High Neuroticism → (no strong value correlation; slight Security)

  const scores: Record<SchwartzValue, number> = {
    selfDirection: bigFive.O * 0.6,
    stimulation: bigFive.O * 0.3 + bigFive.E * 0.3,
    hedonism: bigFive.E * 0.4,
    achievement: bigFive.C * 0.3 + bigFive.E * 0.25,
    power: bigFive.E * 0.2 - bigFive.A * 0.3 + 50,
    security: bigFive.C * 0.25 + bigFive.N * 0.15,
    conformity: bigFive.C * 0.2 + bigFive.A * 0.3,
    tradition: bigFive.C * 0.15 + bigFive.A * 0.2,
    benevolence: bigFive.A * 0.55,
    universalism: bigFive.O * 0.35 + bigFive.A * 0.35,
  };
  const sorted = (Object.entries(scores) as [SchwartzValue, number][]).sort(
    ([, a], [, b]) => b - a
  );
  const inferredTopValues = sorted.slice(0, 3).map(([k]) => k);
  const inferredBottomValues = sorted.slice(-2).map(([k]) => k);

  // One-line synthesis
  const attachLabel =
    style === "secure"
      ? "securely attached"
      : style === "anxious"
      ? "anxiously attached"
      : style === "dismissive"
      ? "dismissively attached"
      : "fearfully attached";

  const dominantTrait =
    bigFive.O > 65 ? "highly open" :
    bigFive.C > 65 ? "conscientious" :
    bigFive.E > 65 ? "extraverted" :
    bigFive.A > 65 ? "warm" :
    bigFive.N > 65 ? "emotionally reactive" :
    "reserved";

  const synthesisLine = `You write like someone ${dominantTrait} and ${attachLabel}.`;

  return {
    inferredAttachment: {
      style,
      confidence: conf,
      reasoning,
    },
    inferredTopValues,
    inferredBottomValues,
    synthesisLine,
  };
}
