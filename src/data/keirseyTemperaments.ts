// Keirsey Temperament System
// Source: David Keirsey, "Please Understand Me" (1978) and "Please Understand Me II" (1998)
//
// Keirsey diverged from Jung and Myers-Briggs by organizing the 16 types
// into four temperaments based on the SN and TF/JP dichotomies.
// His temperaments describe patterns of need, value, and self-image that
// remain stable across a person's life.

export interface KeirseyTemperament {
  id: "SP" | "SJ" | "NF" | "NT";
  name: string; // Artisan, Guardian, Idealist, Rational
  subtitle: string; // Keirsey's own subtitle
  color: string;
  bg: string;
  border: string;
  description: string; // 150–200 words grounded in Keirsey's Please Understand Me
  coreNeed: string;
  coreValue: string;
  coreFeeling: string; // what they most want to feel about themselves
  types: string[]; // MBTI types in this temperament
  enneagramCorrelations: string; // 2–3 sentences on Enneagram overlap
}

export const keirseyTemperaments: KeirseyTemperament[] = [
  {
    id: "SP",
    name: "Artisan",
    subtitle: "The Performer",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.25)",
    types: ["ISTP", "ISFP", "ESTP", "ESFP"],
    coreNeed: "Freedom to act in the moment",
    coreValue: "Concrete action and sensory impact",
    coreFeeling: "Graceful and daring",
    description:
      "Artisans are the most adaptable of all temperaments. present-focused, concrete, and action-oriented. Where others plan or theorize, Artisans act. They trust what they can see, touch, and do right now, and they are gifted at reading situations in real time and responding with precision. Keirsey saw Artisans as driven by an insatiable appetite for sensory stimulation and immediate impact. They want to make something happen, now, and they are extraordinarily skilled at improvising under pressure. Their deepest need is freedom: freedom to move, to change course, and to follow where their impulses lead without being constrained by rules, schedules, or social expectations. They can be reckless, and they often struggle with long-range planning and routine, but they bring a vitality and spontaneity to every situation. At their best, Artisans are virtuosic. whether on a stage, in a workshop, on an athletic field, or in a crisis.",
    enneagramCorrelations:
      "SP Artisans most commonly correlate with Enneagram 7 (the freedom-seeking, sensation-hungry epicure), Type 8 (the powerful, action-oriented challenger), and Type 9 (the easygoing, present-focused peacemaker). The Artisan's resistance to constraint and love of the immediate moment resonates strongly with the Type 7 strategy of staying in motion. ESTP and ESFP often share the Type 7 or Type 8 pattern, while ISTP and ISFP frequently correlate with 5, 9, or 4.",
  },
  {
    id: "SJ",
    name: "Guardian",
    subtitle: "The Conservator",
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    border: "rgba(16,185,129,0.25)",
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
    coreNeed: "Belonging and security through duty",
    coreValue: "Responsibility, tradition, and reliability",
    coreFeeling: "Dependable and belonging",
    description:
      "Guardians are the backbone of every stable institution. duty-bound, security-seeking, and deeply invested in the traditions and structures that hold communities together. Keirsey described Guardians as the temperament most attuned to social responsibility: they work, follow rules, honor obligations, and take seriously the idea that society depends on people who do their part. They are reliable to a fault, and they are deeply uncomfortable with chaos, irresponsibility, or anyone who shirks their obligations. Their core need is belonging. to be part of something larger and to know their place is secure within it. Guardians tend to distrust novelty for its own sake; they want proven approaches and incremental improvement, not revolutionary change. They are the world's caretakers, managers, and faithful servants of institutions, and without them very little of organized civilization would function. Their challenge is rigidity. clinging to 'the way things are done' past the point of usefulness.",
    enneagramCorrelations:
      "SJ Guardians most commonly correlate with Enneagram 1 (the conscientious, principled reformer), Type 2 (the devoted, duty-driven helper), and Type 6 (the loyal, security-seeking loyalist). The Guardian's deep investment in doing things correctly and belonging to reliable structures maps closely onto the Type 6 search for a trustworthy system and authority. ISTJ and ESTJ often resonate with Type 1 or Type 6, while ISFJ and ESFJ frequently correlate with Type 2 or Type 9.",
  },
  {
    id: "NF",
    name: "Idealist",
    subtitle: "The Catalyst",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    border: "rgba(139,92,246,0.25)",
    types: ["INFJ", "INFP", "ENFJ", "ENFP"],
    coreNeed: "Meaning and authentic self-actualization",
    coreValue: "Identity, authenticity, and human potential",
    coreFeeling: "Significant and unique",
    description:
      "Idealists are the temperament most driven by meaning and the search for authentic identity. in themselves, and in others. Keirsey saw Idealists as uniquely focused on the question of who they truly are and who they can become. They are future-oriented and empathic, gifted at seeing the latent potential in every person they meet. Idealists need their work and relationships to mean something; a life of mere material comfort is hollow to them. They gravitate toward roles that allow them to foster growth, cultivate understanding, and serve as catalysts for human transformation. teachers, counselors, writers, and spiritual leaders in disproportionate numbers. Their core need is to feel significant: to know that their unique self matters and makes a difference. They can become disillusioned when reality falls persistently short of their vision of what human beings could be, and they may struggle with the gap between the ideal and the actual.",
    enneagramCorrelations:
      "NF Idealists most commonly correlate with Enneagram 4 (the identity-seeking individualist), Type 2 (the empathic helper), and Type 9 (the peaceful, accepting mediator). The Idealist's preoccupation with authentic identity and human potential resonates most directly with the Type 4 pattern of seeking what is deeply and uniquely true about oneself. INFJ and INFP often map onto 4, 9, or 5; ENFJ frequently correlates with 2 or 3; ENFP correlates frequently with 7, 4, or 2.",
  },
  {
    id: "NT",
    name: "Rational",
    subtitle: "The Architect",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.10)",
    border: "rgba(14,165,233,0.25)",
    types: ["INTJ", "INTP", "ENTJ", "ENTP"],
    coreNeed: "Mastery and competence",
    coreValue: "Knowledge, systems, and intellectual independence",
    coreFeeling: "Capable and masterful",
    description:
      "Rationals are the temperament most driven by the relentless pursuit of knowledge and competence. Keirsey described Rationals as the rarest temperament and the one most oriented toward theoretical, systems-level thinking. They are natural architects. of ideas, organizations, and strategies. Rationals are deeply independent thinkers who distrust authority that cannot justify itself logically, and they hold themselves to impossibly high standards of intellectual rigor. Their core need is to feel competent: to master whatever domain they enter. To be seen as incompetent. by themselves or others. is acutely painful. Rationals are future-oriented and pragmatic in the deepest sense: they want to understand how things actually work so they can redesign them to work better. They are often criticized for being cold or arrogant, but this misreads their nature. They care deeply about truth and excellence; they simply have no patience for sentimentality, tradition for its own sake, or arguments that appeal to authority rather than logic.",
    enneagramCorrelations:
      "NT Rationals most commonly correlate with Enneagram 5 (the knowledge-hoarding investigator), Type 1 (the principled perfectionist), and Type 3 (the competence-driven achiever). The Rational's drive for mastery and intellectual independence maps most directly onto the Type 5 strategy of accumulating knowledge as a buffer against an overwhelming world. INTJ often correlates with 5, 1, or 3; INTP with 5 or 9; ENTJ with 3, 1, or 8; ENTP with 7, 5, or 3.",
  },
];

// Returns the Keirsey temperament ID for a given MBTI type code
export function getTemperamentForType(typeCode: string): "SP" | "SJ" | "NF" | "NT" | null {
  for (const temp of keirseyTemperaments) {
    if (temp.types.includes(typeCode.toUpperCase())) return temp.id;
  }
  return null;
}

// Returns the full temperament object for a given MBTI type code
export function getTemperamentDataForType(typeCode: string): KeirseyTemperament | null {
  return keirseyTemperaments.find((t) => t.types.includes(typeCode.toUpperCase())) ?? null;
}
