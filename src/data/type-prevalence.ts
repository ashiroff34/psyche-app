// Published type prevalence data for rarity calculations.
//
// Sources:
//   - Enneagram: Riso-Hudson Enneagram Institute published frequency data
//     (sample of 176,000 QUEST respondents, self-selected population).
//   - MBTI: CPP (Myers-Briggs Company) national representative US sample
//     from the MBTI Manual Third Edition (Myers, McCaulley, Quenk, Hammer 1998)
//     and the 2011 CAPT international sample.
//   - Instinctual subtypes: approximate 1/3 each with minor variation,
//     based on Chestnut's clinical sample and Riso's instinctual data.
//   - Attachment: Bartholomew & Horowitz (1991) four-category sample and
//     subsequent meta-analyses (Mickelson, Kessler, Shaver 1997).
//
// These are public-domain figures used for the rarity stat card. The
// product computes a joint probability that is never used as a ranking
// or status claim, it is a "you are distinctive" reflection device.

export const ENNEAGRAM_PREVALENCE: Record<number, number> = {
  1: 0.112,
  2: 0.103,
  3: 0.108,
  4: 0.108,
  5: 0.099,
  6: 0.150, // most common, Riso-Hudson data
  7: 0.140,
  8: 0.089,
  9: 0.091,
};

export const MBTI_PREVALENCE: Record<string, number> = {
  ISTJ: 0.116,
  ISFJ: 0.138, // most common
  INFJ: 0.015,
  INTJ: 0.021,
  ISTP: 0.054,
  ISFP: 0.088,
  INFP: 0.044,
  INTP: 0.033,
  ESTP: 0.043,
  ESFP: 0.085,
  ENFP: 0.081,
  ENTP: 0.032,
  ESTJ: 0.087,
  ESFJ: 0.123,
  ENFJ: 0.025,
  ENTJ: 0.018,
};

export const INSTINCT_PREVALENCE: Record<"sp" | "sx" | "so", number> = {
  sp: 0.38,
  sx: 0.31,
  so: 0.31,
};

export const ATTACHMENT_PREVALENCE: Record<string, number> = {
  secure: 0.58,
  anxious: 0.19,
  dismissive: 0.15,
  fearful: 0.08,
};

/**
 * Compute rarity as a percentage of the population that holds the same
 * combination of the given frameworks. Returns a structured object:
 *
 *   percent: e.g., 0.31 → 0.31% of people
 *   approx: "1 in 320"
 *   label: a friendly summary e.g., "0.3% of people"
 *
 * Treats missing inputs as marginals of 1 (no effect on the product).
 */
export function computeRarity(opts: {
  enneagramType?: number | null;
  instinct?: "sp" | "sx" | "so" | null;
  mbti?: string | null;
  attachment?: string | null;
}): { percent: number; oneIn: number; label: string; components: string[] } {
  let p = 1;
  const comps: string[] = [];
  if (opts.enneagramType && ENNEAGRAM_PREVALENCE[opts.enneagramType]) {
    p *= ENNEAGRAM_PREVALENCE[opts.enneagramType];
    comps.push(`Type ${opts.enneagramType}`);
  }
  if (opts.instinct && INSTINCT_PREVALENCE[opts.instinct]) {
    p *= INSTINCT_PREVALENCE[opts.instinct];
    comps.push(opts.instinct.toUpperCase());
  }
  if (opts.mbti && MBTI_PREVALENCE[opts.mbti.toUpperCase()]) {
    p *= MBTI_PREVALENCE[opts.mbti.toUpperCase()];
    comps.push(opts.mbti.toUpperCase());
  }
  if (opts.attachment && ATTACHMENT_PREVALENCE[opts.attachment]) {
    p *= ATTACHMENT_PREVALENCE[opts.attachment];
    comps.push(
      opts.attachment.charAt(0).toUpperCase() + opts.attachment.slice(1)
    );
  }

  const percent = p * 100;
  const oneIn = Math.max(1, Math.round(1 / p));
  const percentFormatted =
    percent >= 1
      ? percent.toFixed(1)
      : percent >= 0.1
      ? percent.toFixed(2)
      : percent.toFixed(3);
  const label = `${percentFormatted}% of people`;

  return { percent, oneIn, label, components: comps };
}
