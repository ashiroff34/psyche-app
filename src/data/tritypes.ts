// Tritype System
// Based on Katherine Fauvre's research
// Each person uses one type from each center:
// Gut (8, 9, 1), Heart (2, 3, 4), Head (5, 6, 7)
//
// ORDER MATTERS in tritypes (Katherine Fauvre's system):
// The first number = dominant/core type (most used)
// The second number = second most used type
// The third number = third most used type
// e.g., "5-1-4" means 5 is dominant, 1 second, 4 third
//
// The same 3 types in different orders are different tritypes with
// different archetype names and expressions.
//
// Note: archetype names in the ordered lookup follow Fauvre where documented.
// Names not found in Fauvre's published archetypes are app-original descriptive labels.

export interface TritypeCenter {
  name: string;
  types: number[];
  question: string;
  description: string;
}

export interface Tritype {
  code: string; // e.g., "531", sorted canonical code (for lookup by type set)
  archetype: string;
  description: string;
  strengths: string[];
  challenges: string[];
}

// Ordered archetypes: key is the ORDERED tritype string (e.g., "514")
// meaning Type 5 dominant, Type 1 second, Type 4 third.
// These represent Katherine Fauvre's named archetypes for specific orderings.
// Only the most common/documented orderings are named; others fall back to
// the canonical unordered archetype name.
export const orderedTritypeThyselfs: Record<string, string> = {
  // Type 1 dominant
  "147": "The Visionary Idealist",
  "152": "The Teacher",  // 1-5-2
  "126": "The Mentor",  // 1-2-6
  "125": "The Mentor",
  "162": "The Mentor",
  "135": "The Strategist",  // 1-3-5 (Fauvre canonical name for this combination)

  // Type 2 dominant
  "217": "The Loving Advisor",  // 2-1-7
  "248": "The Passionate Humanitarian",  // 2-4-8

  // Type 3 dominant
  "378": "The Mover Shaker",
  "316": "The Taskmaster",

  // Type 4 dominant
  "415": "The Contemplative Individualist",  // 4-1-5
  "459": "The Contemplative",

  // Type 5 dominant
  "514": "The Technical Expert",  // 5-1-4
  "593": "The Problem Solver",

  // Type 6 dominant
  "629": "The Supportive Advisor",
  "692": "The Good Samaritan",

  // Type 7 dominant
  "738": "The Opportunist",
  "783": "The Entrepreneur",

  // Type 8 dominant
  "852": "The Strategist",
  "837": "The Empire Builder",

  // Type 9 dominant
  "952": "The Mediating Expert",
  "947": "The Gentle Spirit",
};

// Returns the center for a given type number
export function getCenter(type: number): "gut" | "heart" | "head" {
  if ([8, 9, 1].includes(type)) return "gut";
  if ([2, 3, 4].includes(type)) return "heart";
  return "head"; // 5, 6, 7
}

// Returns the canonical sorted code for a set of types (for looking up in tritypes[])
export function getCanonicalTritypeCode(types: number[]): string {
  return [...types].sort((a, b) => a - b).join("");
}

// Looks up the archetype name for an ORDERED tritype [dominant, second, third]
// First checks named ordered archetypes, then falls back to unordered tritype data
export function getOrderedTritypeThyself(
  ordered: [number, number, number],
  tritypeData: Tritype[]
): string | undefined {
  const orderedKey = ordered.join("");
  if (orderedTritypeThyselfs[orderedKey]) {
    return orderedTritypeThyselfs[orderedKey];
  }
  // Fallback: look up canonical unordered archetype
  const canonical = getCanonicalTritypeCode(ordered);
  return tritypeData.find(t => t.code === canonical)?.archetype;
}

// Validates that three selected types are from different centers
export function validateTritypeCenters(types: number[]): { valid: boolean; error?: string } {
  if (types.length < 2) return { valid: true };
  const centers = types.map(getCenter);
  const unique = new Set(centers);
  if (unique.size < centers.length) {
    const dup = centers.find((c, i) => centers.indexOf(c) !== i);
    const centerName = dup === "gut" ? "Gut (8, 9, 1)" : dup === "heart" ? "Heart (2, 3, 4)" : "Head (5, 6, 7)";
    return { valid: false, error: `You already selected a ${centerName} center type. Each slot must come from a different center.` };
  }
  return { valid: true };
}

export const tritypeCenters: TritypeCenter[] = [
  {
    name: "Head Center (Thinking)",
    types: [5, 6, 7],
    question: "How do you manage fear and uncertainty?",
    description: "The head center governs how we process information, manage anxiety, and navigate uncertainty. Type 5 withdraws to think, Type 6 scans for threats and seeks security, Type 7 reframes to find positive possibilities. Your head center type reveals your primary mental strategy for dealing with the unknown."
  },
  {
    name: "Heart Center (Feeling)",
    types: [2, 3, 4],
    question: "How do you manage your sense of identity and worth?",
    description: "The heart center governs self-image, identity, emotional processing, and how we relate to others. Type 2 gains worth through helping, Type 3 through achievement and image, Type 4 through authenticity and uniqueness. Your heart center type reveals how you construct and protect your sense of self."
  },
  {
    name: "Gut Center (Instinct)",
    types: [8, 9, 1],
    question: "How do you manage anger and assert your boundaries?",
    description: "The gut center governs instinctive responses, anger, autonomy, and boundaries. Type 8 expresses anger outwardly and takes control, Type 9 falls asleep to anger and merges with others, Type 1 internalizes anger as a critical inner voice pushing for perfection. Your gut center type reveals your relationship with power and self-assertion."
  }
];

// All 27 tritype combinations with archetypes and descriptions
export const tritypes: Tritype[] = [
  // 125 combinations
  { code: "125", archetype: "The Mentor", description: "Principled, helpful, and analytical. Combines the One's drive for improvement with the Two's desire to help and the Five's depth of knowledge. Creates a thoughtful, caring teacher who helps others improve through deep understanding.", strengths: ["Deep knowledge applied to helping others", "Principled and caring", "Thorough and methodical support"], challenges: ["Can be critical while trying to help", "May overwhelm others with advice", "Difficulty receiving help themselves"] },
  { code: "126", archetype: "The Supporter", description: "Principled, helpful, and loyal. Combines duty, service, and vigilance into a deeply responsible caretaker who anticipates what others need while maintaining high standards.", strengths: ["Deeply responsible and reliable", "Anticipates others' needs", "Strong moral compass in service"], challenges: ["Can be anxious about doing enough", "May sacrifice own needs for duty", "Rigidity in how help should look"] },
  { code: "127", archetype: "The Teacher", description: "Principled, helpful, and enthusiastic. Combines integrity with warmth and optimism. An energetic helper who uplifts others while maintaining standards of excellence.", strengths: ["Inspiring and uplifting", "Combines warmth with principles", "Energetic and positive influence"], challenges: ["May avoid difficult truths", "Can scatter their helping energy", "Frustration when reality doesn't match ideals"] },
  { code: "135", archetype: "The Strategist", description: "Principled, achieving, and investigative. An intensely self-reliant, intellectually capable, and achievement-oriented character focused on competence, correctness, and mastery. Often the most self-contained and driven of the 1-based tritypes.", strengths: ["Deep expertise and competence", "Efficient and results-oriented", "High standards backed by knowledge"], challenges: ["Can be emotionally detached", "May prioritize competence over connection", "Perfectionistic about expertise"] },
  { code: "136", archetype: "The Taskmaster", description: "Principled, achieving, and loyal. Combines achievement, duty, and conscientiousness. A reliable high-performer who achieves within established systems and structures.", strengths: ["Reliable and high-achieving", "Works well within systems", "Combines ambition with responsibility"], challenges: ["Can be rigid about the 'right' way to succeed", "Anxiety about performance", "May overwork from combined duty and achievement drive"] },
  { code: "137", archetype: "The Systems Builder", description: "Principled, achieving, and enthusiastic. Combines ambition with optimism and standards. An energetic achiever who builds things with integrity and vision.", strengths: ["Visionary and principled achiever", "Energetic and optimistic", "Builds with integrity"], challenges: ["Impatient with imperfection", "May overcommit", "Difficulty slowing down to reflect"] },
  { code: "145", archetype: "The Researcher", description: "Principled, individualistic, and investigative. Combines depth, authenticity, and precision. A deeply thoughtful individual who seeks understanding through both emotional and intellectual depth.", strengths: ["Profound depth of understanding", "Authentic and principled", "Highly perceptive and insightful"], challenges: ["Can be withdrawn and overly critical", "May feel isolated by their standards", "Struggle between emotional and analytical modes"] },
  { code: "146", archetype: "The Philosopher", description: "Principled, individualistic, and loyal. Combines authenticity, integrity, and vigilance. A deeply thoughtful individual who questions everything while seeking both truth and meaning.", strengths: ["Deep questioning and truth-seeking", "Authentic and principled", "Sensitive to injustice"], challenges: ["Can be anxious and self-doubting", "Melancholic about imperfect reality", "May struggle with decisiveness"] },
  { code: "147", archetype: "The Visionary", description: "Principled, individualistic, and enthusiastic. Combines idealism, creativity, and optimism. A uniquely creative soul who envisions beautiful possibilities and holds them to high standards.", strengths: ["Creative and visionary", "Combines idealism with enthusiasm", "Authentic and optimistic expression"], challenges: ["May be unrealistic about possibilities", "Frustrated when reality falls short", "Can scatter between ideals and ideas"] },

  // 258 combinations
  { code: "258", archetype: "The Strategist", description: "Helpful, investigative, and powerful. Combines service, knowledge, and strength. A protective and knowledgeable advisor who uses deep understanding to help and empower others.", strengths: ["Powerful and knowledgeable helper", "Strategic and protective", "Combines warmth with strength"], challenges: ["Can be controlling in helping", "May overwhelm with intensity", "Difficulty showing vulnerability"] },
  { code: "259", archetype: "The Peacekeeper", description: "Helpful, investigative, and peaceful. A warm, quiet, gentle, and deeply caring character who prefers to support from the background and maintains peace through both empathy and wisdom.", strengths: ["Gentle and insightful helper", "Accepting and knowledgeable", "Non-intrusive support"], challenges: ["Can be passive in their helping", "May withdraw when overwhelmed", "Difficulty asserting boundaries"] },
  { code: "251", archetype: "The Advisor", description: "Helpful, investigative, and principled. Combines care, expertise, and integrity. A deeply knowledgeable helper who gives precise, principled guidance.", strengths: ["Expert and principled advisor", "Combines warmth with precision", "Thorough and ethical support"], challenges: ["Can be critical in their helping", "May over-intellectualize emotions", "High standards for both self and others"] },

  // 358 combinations
  { code: "358", archetype: "The Solution Master", description: "Achieving, investigative, and powerful. Combines ambition, knowledge, and force. The most strategically powerful tritype, driven to succeed through expertise and sheer willpower.", strengths: ["Extremely competent and driven", "Strategic and powerful", "Results-oriented with depth"], challenges: ["Can be ruthlessly efficient", "May intimidate others", "Difficulty with vulnerability and softness"] },
  { code: "359", archetype: "The Thinker", description: "Achieving, investigative, and peaceful. Combines ambition with depth and acceptance. A quietly competent achiever who works behind the scenes with deep understanding.", strengths: ["Quietly competent and knowledgeable", "Combines achievement with equanimity", "Strategic without being aggressive"], challenges: ["May be too passive about their ambitions", "Can detach from emotional engagement", "Struggle to self-promote"] },
  { code: "351", archetype: "The Technical Achiever", description: "Achieving, investigative, and principled. Combines success-drive, expertise, and integrity. Pursues excellence through mastery and principled execution.", strengths: ["Masterful and principled achiever", "Deep expertise applied to goals", "High standards of execution"], challenges: ["Perfectionistic about outcomes", "Can be emotionally detached", "May overwork in pursuit of mastery"] },

  // 458 combinations
  { code: "458", archetype: "The Scholar", description: "Individualistic, investigative, and powerful. Combines emotional depth, intellectual rigor, and intensity. The most intensely independent tritype, deeply original thinkers who refuse to conform.", strengths: ["Profoundly original thinking", "Intense depth and independence", "Courageous authenticity"], challenges: ["Can be intensely withdrawn", "May alienate others with intensity", "Struggle with belonging anywhere"] },
  { code: "459", archetype: "The Contemplative", description: "Individualistic, investigative, and peaceful. Combines emotional depth, knowledge-seeking, and inner calm. The most withdrawn tritype, deeply reflective souls who live rich inner lives.", strengths: ["Profound inner life and insight", "Deeply contemplative and perceptive", "Non-judgmental awareness"], challenges: ["Most withdrawn tritype, risk of total isolation", "Can struggle to engage with external world", "May be lost in inner experience"] },
  { code: "451", archetype: "The Perfectionist", description: "Individualistic, investigative, and principled. Combines authenticity, depth, and integrity. Seeks to understand the deepest truths and express them with precision.", strengths: ["Deep truth-seeking and precision", "Authentic and principled expression", "Profound standards of integrity"], challenges: ["Intensely self-critical", "Can be harsh in pursuit of truth", "May feel nothing is ever good enough"] },

  // 268 combinations
  { code: "268", archetype: "The Rescuer", description: "Helpful, loyal, and powerful. Combines caring, vigilance, and strength. A fierce protector who identifies threats to loved ones and acts decisively to help.", strengths: ["Fierce and protective", "Loyal and devoted helper", "Strong and action-oriented care"], challenges: ["Can be overbearing in protection", "May see threats everywhere", "Controlling in the name of caring"] },
  { code: "269", archetype: "The Good Samaritan", description: "Helpful, loyal, and peaceful. Combines caring, duty, and harmony. A warm, dependable presence who creates safe, harmonious spaces for others.", strengths: ["Warm and harmonizing", "Deeply dependable and loyal", "Creates safety for others"], challenges: ["Can lose self in service to others", "May avoid necessary conflict", "Difficulty asserting personal needs"] },
  { code: "261", archetype: "The Caretaker", description: "Helpful, loyal, and principled. Combines care, responsibility, and integrity. A devoted helper who serves with both warmth and strong moral standards.", strengths: ["Devoted and principled caretaker", "Combines warmth with integrity", "Reliable and morally grounded"], challenges: ["Can be rigid about how care should look", "Anxious about doing the right thing", "May exhaust themselves in service"] },

  // 368 combinations
  { code: "368", archetype: "The Justice Fighter", description: "Achieving, loyal, and powerful. Combines drive, duty, and force. A formidable achiever who fights for what's right with strategic intensity.", strengths: ["Formidable and strategic", "Fights for justice and results", "Combines achievement with loyalty"], challenges: ["Can be intimidating and aggressive", "May use success to mask insecurity", "Difficulty trusting others"] },
  { code: "369", archetype: "The Mediator", description: "Achieving, loyal, and peaceful. Combines adaptability, responsibility, and harmony. The most 'every-person' tritype, highly adaptable and focused on fitting in and keeping peace.", strengths: ["Extremely adaptable and harmonious", "Responsible and reliable", "Good at reading social situations"], challenges: ["Can lose authentic self in adaptation", "May avoid standing out", "Difficulty identifying own desires"] },
  { code: "361", archetype: "The Disciplinarian", description: "Achieving, loyal, and principled. Combines ambition, duty, and integrity into a highly responsible achiever who leads through both competence and principle.", strengths: ["Highly responsible leader", "Combines achievement with principle", "Dutiful and competent"], challenges: ["Can be rigid and controlling", "Anxious about performance and correctness", "May overwork from combined drives"] },

  // 468 combinations
  { code: "468", archetype: "The Truth Teller", description: "Individualistic, loyal, and powerful. Combines emotional depth, vigilance, and intensity. A reactive, passionate truth-speaker who confronts inauthenticity with force.", strengths: ["Powerfully authentic", "Courageous truth-telling", "Deeply passionate and loyal"], challenges: ["Most emotionally reactive tritype", "Can be volatile and confrontational", "May alienate others with intensity"] },
  { code: "469", archetype: "The Seeker", description: "Individualistic, loyal, and peaceful. Combines depth, questioning, and acceptance. A gentle searcher for meaning who moves between doubt and trust.", strengths: ["Deep and questioning spirit", "Combines sensitivity with acceptance", "Genuine and searching"], challenges: ["Can be paralyzed by doubt", "May struggle with identity and belonging", "Difficulty taking decisive action"] },
  { code: "461", archetype: "The Idealist", description: "Individualistic, loyal, and principled. Combines authenticity, questioning, and integrity. A deeply principled individualist who seeks both truth and meaning.", strengths: ["Deeply principled and authentic", "Combines questioning with integrity", "Strong moral compass"], challenges: ["Can be self-righteous about authenticity", "Anxious and self-critical", "May feel perpetually dissatisfied"] },

  // 278 combinations
  { code: "278", archetype: "The Messenger", description: "Helpful, enthusiastic, and powerful. Combines enthusiastic generosity, visionary enthusiasm, and forceful impact. A bold, inspiring, and warmly assertive type who wants to uplift others through confident action.", strengths: ["Charismatic and generous", "Energetic and uplifting", "Powerful positive presence"], challenges: ["Can be overwhelming in intensity", "May avoid depth for positivity", "Difficulty with limits and boundaries"] },
  { code: "279", archetype: "The Peacemaker", description: "Helpful, enthusiastic, and peaceful. The most positive and upbeat tritype, combines warmth, optimism, and harmony into an endlessly pleasant and accommodating presence.", strengths: ["Endlessly positive and warm", "Harmonizing and enthusiastic", "Creates pleasant environments"], challenges: ["Most conflict-avoidant tritype", "May be superficially positive", "Difficulty with anger or negative emotions"] },
  { code: "271", archetype: "The Helper-Teacher", description: "Helpful, enthusiastic, and principled. Combines care, optimism, and standards into an enthusiastic teacher-helper who uplifts others while maintaining principles.", strengths: ["Enthusiastic and principled helper", "Inspiring and warm teacher", "Combines optimism with standards"], challenges: ["Can be preachy or overbearing", "May scatter between helping and perfecting", "Frustrated when good intentions aren't enough"] },

  // 378 combinations
  { code: "378", archetype: "The Mover & Shaker", description: "Achieving, enthusiastic, and powerful. The most assertive and action-oriented tritype, combines ambition, energy, and force into a dynamo of achievement and impact.", strengths: ["Extremely driven and energetic", "Powerful and charismatic achiever", "Makes things happen decisively"], challenges: ["Can be ruthlessly ambitious", "May steamroll others", "Difficulty slowing down or reflecting"] },
  { code: "379", archetype: "The Ambassador", description: "Achieving, enthusiastic, and peaceful. The most pleasant and socially polished tritype, combines adaptability, positivity, and harmony into effortless social grace.", strengths: ["Socially graceful and charming", "Adaptable and optimistic", "Creates pleasant group dynamics"], challenges: ["Can be superficial", "May avoid confrontation at all costs", "Difficulty with depth and authenticity"] },
  { code: "371", archetype: "The Achiever-Perfectionist", description: "Achieving, enthusiastic, and principled. Combines success-drive, optimism, and integrity into an ambitious visionary who achieves with both energy and standards.", strengths: ["Ambitious with integrity", "Energetic and principled achiever", "Visionary and optimistic leader"], challenges: ["Workaholic tendencies", "Impatient with imperfection", "May burn out from combined drives"] },

  // 478 combinations
  { code: "478", archetype: "The Messenger", description: "Individualistic, enthusiastic, and powerful. Combines creativity, energy, and force into a passionately original voice that demands to be heard.", strengths: ["Powerfully creative and original", "Charismatic and passionate messenger", "Refuses to be silenced"], challenges: ["Can be overwhelming and intense", "May demand constant attention", "Difficulty with structure and routine"] },
  { code: "479", archetype: "The Gentle Spirit", description: "Individualistic, enthusiastic, and peaceful. The most idealistic and dreamy tritype, combines creativity, imagination, and inner peace into a uniquely gentle visionary.", strengths: ["Uniquely creative and gentle", "Imaginative and peaceful", "Authentic and optimistic"], challenges: ["Can be unrealistic and escapist", "May avoid practical demands", "Difficulty with confrontation or asserting needs"] },
  { code: "471", archetype: "The Creative Idealist", description: "Individualistic, enthusiastic, and principled. Combines authenticity, vision, and integrity into an idealistic creative who holds both imagination and standards.", strengths: ["Creatively principled", "Visionary with integrity", "Authentic and idealistic"], challenges: ["Frustrated by imperfect reality", "Can be harshly self-critical about creative work", "May oscillate between inspiration and criticism"] },

  // Additional key tritypes
  // Note: 528 is not listed here as a separate entry — 258 and 528 represent the same
  // three types and are unified under code "258" in the unordered canonical array.
  // The ordered lookup (orderedTritypeThyselfs) distinguishes dominant-type orderings.
  { code: "531", archetype: "The Technical Innovator", description: "Investigative, achieving, and principled. Combines deep knowledge, competence-drive, and integrity. A highly capable individual who pursues mastery with both intellectual depth and principled standards. Extremely independent, precise, and driven by understanding.", strengths: ["Deeply knowledgeable and competent", "Independent and principled", "Precise and standards-driven", "Strategic and intellectually rigorous"], challenges: ["Can be emotionally detached", "May be overly critical of self and others", "Difficulty with emotional expression", "May prioritize competence over connection"] },
  { code: "539", archetype: "The Contemplative Strategist", description: "Investigative, achieving, and peaceful. Combines analytical depth, quiet ambition, and equanimity. Works behind the scenes with deep understanding and calm determination.", strengths: ["Quietly brilliant and strategic", "Calm and deeply knowledgeable", "Efficient without being aggressive"], challenges: ["Can be too withdrawn", "May undervalue own accomplishments", "Difficulty engaging emotionally"] },
  { code: "541", archetype: "The Specialist", description: "Investigative, individualistic, and principled. Combines deep investigation, emotional authenticity, and integrity. Seeks profound understanding through both mind and heart.", strengths: ["Profoundly deep understanding", "Authentic and principled", "Highly specialized and precise"], challenges: ["Can be intensely self-critical", "Risk of isolation through standards", "May feel chronically dissatisfied"] },
  { code: "548", archetype: "The Iconoclast", description: "Investigative, individualistic, and powerful. Combines intellectual depth, emotional intensity, and personal power. A fiercely independent original thinker.", strengths: ["Fiercely independent and original", "Deep and intensely powerful", "Refuses to conform"], challenges: ["Can be intimidating and withdrawn", "May alienate others", "Struggle with trust and vulnerability"] },
  { code: "582", archetype: "The Strategic Helper", description: "Investigative, powerful, and helpful. Combines knowledge, force, and care into a protector who uses expertise to empower others.", strengths: ["Knowledgeable protector", "Uses power to help", "Strategic and caring"], challenges: ["Can be controlling", "May dominate while 'helping'", "Difficulty showing vulnerability"] },
  { code: "593", archetype: "The Diplomatic Achiever", description: "Investigative, peaceful, and achieving. Combines depth, harmony, and quiet ambition. Achieves through understanding and diplomatic skill.", strengths: ["Diplomatically ambitious", "Deeply understanding", "Achieves without confrontation"], challenges: ["May avoid necessary conflict", "Can be passive about goals", "Difficulty being direct"] },
  { code: "612", archetype: "The Guardian", description: "Loyal, principled, and helpful. Combines vigilance, integrity, and care into a deeply responsible protector who serves through duty and devotion.", strengths: ["Devoted and responsible guardian", "Combines duty with warmth", "Anticipates and prevents problems"], challenges: ["Can be anxiously over-protective", "Rigid about how things should be done", "May exhaust themselves in service"] },
  { code: "613", archetype: "The Responsible Achiever", description: "Loyal, principled, and achieving. Combines duty, standards, and drive. A conscientious high-performer who achieves within established rules and structures.", strengths: ["Conscientious and high-achieving", "Reliable and principled", "Works effectively within systems"], challenges: ["Can be rigid and anxious", "May overwork from combined drives", "Difficulty with ambiguity"] },
  { code: "614", archetype: "The Philosopher Guardian", description: "Loyal, principled, and individualistic. Combines questioning, integrity, and emotional depth. A deeply thoughtful individual seeking both truth and meaning.", strengths: ["Deep truth-seeker", "Principled and authentic", "Thoughtful and perceptive"], challenges: ["Can be paralyzed by doubt", "Intensely self-critical", "May struggle with belonging"] },
  { code: "729", archetype: "The Optimistic Peacemaker", description: "Enthusiastic, helpful, and peaceful. The most positive and conflict-avoiding tritype. Combines joy, warmth, and harmony.", strengths: ["Extremely warm and positive", "Harmonizing and joyful", "Creates safe, happy spaces"], challenges: ["Avoids all negativity", "Can be superficially positive", "Difficulty facing hard truths"] },
  { code: "731", archetype: "The Energetic Reformer", description: "Enthusiastic, achieving, and principled. Combines optimism, ambition, and integrity into a dynamic visionary who drives change with energy and standards.", strengths: ["Dynamic and principled", "Energetic achiever", "Visionary with integrity"], challenges: ["Can be impatient", "May spread too thin", "Frustrated by slowness of change"] },
  { code: "748", archetype: "The Passionate Creative", description: "Enthusiastic, individualistic, and powerful. Combines energy, creativity, and force into a magnetic, original personality that refuses to be contained.", strengths: ["Magnetic and creative", "Energetic and original", "Powerful self-expression"], challenges: ["Can be overwhelming", "May resist all structure", "Difficulty with commitment"] },
  { code: "825", archetype: "The Powerful Advisor", description: "Powerful, helpful, and investigative. Combines strength, care, and knowledge. A commanding presence who protects and advises from deep expertise.", strengths: ["Commanding and knowledgeable", "Protective advisor", "Strategic and caring leader"], challenges: ["Can be domineering", "May control through knowledge", "Difficulty with vulnerability"] },
  { code: "836", archetype: "The Commander", description: "Powerful, achieving, and loyal. Combines force, ambition, and duty. A formidable leader who commands through competence and loyalty.", strengths: ["Formidable and strategic leader", "Combines power with duty", "Decisive and loyal"], challenges: ["Can be intimidating", "May demand excessive loyalty", "Difficulty delegating control"] },
  { code: "946", archetype: "The Peaceful Philosopher", description: "Peaceful, individualistic, and loyal. Combines acceptance, depth, and questioning. A gentle, searching soul who seeks meaning through contemplation.", strengths: ["Gentle and contemplative", "Deeply questioning and accepting", "Non-judgmental truth-seeker"], challenges: ["Can be indecisive and withdrawn", "May avoid asserting themselves", "Struggle with action and initiative"] },
  { code: "953", archetype: "The Quiet Strategist", description: "Peaceful, investigative, and achieving. Combines calm, depth, and quiet ambition. Works effectively behind the scenes with understanding and patience.", strengths: ["Calm and strategic", "Patient and deeply understanding", "Achieves without drama"], challenges: ["Can be too passive", "May not advocate for themselves", "Difficulty with urgency"] },
  { code: "962", archetype: "The Peacekeeper", description: "Peaceful, loyal, and helpful. Combines harmony, duty, and care. A deeply devoted peacemaker who serves through quiet, steady support.", strengths: ["Deeply devoted and harmonizing", "Reliable and caring", "Creates stable, supportive environments"], challenges: ["Can lose self entirely in service", "Avoids all conflict", "May not know own needs"] },
  { code: "973", archetype: "The Positive Achiever", description: "Peaceful, enthusiastic, and achieving. Combines harmony, optimism, and ambition. An easygoing achiever who succeeds through charm and positive energy.", strengths: ["Charming and successful", "Combines ease with achievement", "Positive and ambitious"], challenges: ["May avoid depth", "Can be superficially pleasant", "Difficulty with conflict or criticism"] },
  { code: "984", archetype: "The Gentle Warrior", description: "Peaceful, powerful, and individualistic. Combines calm acceptance with fierce independence and emotional depth. A quietly intense individual.", strengths: ["Quietly powerful and deep", "Combines peace with intensity", "Authentic and grounded"], challenges: ["Internal tension between peace and anger", "May suppress then erupt", "Difficulty with consistent emotional expression"] },
];
