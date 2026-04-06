"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Sparkles, Users, Zap, TrendingUp, Heart, Share2, Copy, Check, Info, ChevronRight } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import NextStepBanner from "@/components/NextStepBanner";
import { relationshipDynamics } from "@/data/relationshipDynamics";

// ─── Type Groupings ────────────────────────────────────────────────────────────
const HARMONIC_GROUPS: Record<string, number[]> = {
  Positive: [2, 7, 9],
  Competency: [1, 3, 5],
  Reactive: [4, 6, 8],
};
const CENTERS: Record<string, number[]> = {
  Gut: [8, 9, 1],
  Heart: [2, 3, 4],
  Head: [5, 6, 7],
};

function getHarmonicGroup(n: number): string {
  for (const [g, arr] of Object.entries(HARMONIC_GROUPS)) {
    if (arr.includes(n)) return g;
  }
  return "";
}
function getCenter(n: number): string {
  for (const [c, arr] of Object.entries(CENTERS)) {
    if (arr.includes(n)) return c;
  }
  return "";
}
function areWingNeighbors(a: number, b: number): boolean {
  const diff = Math.abs(a - b);
  return diff === 1 || (a === 1 && b === 9) || (a === 9 && b === 1);
}

function calculateScore(a: number, b: number): number {
  let score = 10;
  const typeA = enneagramTypes.find((t) => t.number === a);
  const typeB = enneagramTypes.find((t) => t.number === b);
  if (!typeA || !typeB) return score;
  if (getHarmonicGroup(a) === getHarmonicGroup(b)) score += 30;
  if (typeA.integrationLine === b || typeB.integrationLine === a) score += 25;
  if (getCenter(a) === getCenter(b)) score += 20;
  if (areWingNeighbors(a, b)) score += 15;
  return Math.min(score, 100);
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Natural Allies";
  if (score >= 60) return "Growth Partners";
  if (score >= 40) return "Complementary";
  if (score >= 20) return "Challenging but Rewarding";
  return "High Friction";
}

// ─── Pair Content ──────────────────────────────────────────────────────────────
interface PairContent {
  score: number;
  label: string;
  summary: string;
  together: { strengths: string[]; sharedValues: string[]; superpower: string };
  friction: { coreTension: string; typeATriggers: string[]; typeBTriggers: string[]; recurringMisunderstanding: string };
  growth: { typeALearns: string; typeBLearns: string; healthyVision: string };
  realLife: { romantic: string; friends: string; work: string; famousPairs: string[] };
}

const TYPE_PAIR_CONTENT: Record<string, PairContent> = {
  "1-2": {
    score: 65,
    label: "Growth Partners",
    summary: "The Reformer and the Helper are united by a genuine desire to make the world better, one through standards, the other through service.",
    together: {
      strengths: ["Shared commitment to moral integrity", "Complementary action styles, one plans, one nurtures", "Both deeply invested in the welfare of others"],
      sharedValues: ["Doing what is right", "Care for community", "Purposeful living"],
      superpower: "When healthy, they build institutions and communities that are both principled and deeply humane, structure infused with warmth.",
    },
    friction: {
      coreTension: "The One critiques systems and people; the Two personalizes everything. The One's criticism lands as rejection on the Two, while the Two's emotional warmth feels like boundary-crossing to the One.",
      typeATriggers: ["Two's indirect expressions of need", "Feeling managed through helpfulness", "Emotional appeals over rational argument"],
      typeBTriggers: ["One's impersonal tone when correcting", "Being told they're 'too much'", "Standards applied to the relationship itself"],
      recurringMisunderstanding: "The One says 'I'm just pointing out how it could be better' while the Two hears 'you're not good enough.' Neither realizes the other is driven by a wound, not a verdict.",
    },
    growth: {
      typeALearns: "The One learns from the Two that love cannot be earned through perfection, it exists unconditionally, and tenderness is not weakness.",
      typeBLearns: "The Two learns from the One that real love sometimes means holding a standard, not just saying yes, and that self-respect is its own form of care.",
      healthyVision: "Both give freely, the One gives wisdom and principled guidance, the Two gives warmth and care, without score-keeping or resentment.",
    },
    realLife: {
      romantic: "This pairing often reads as the dependable couple others admire, but needs conscious communication about emotional bids versus critiques.",
      friends: "Natural allies in causes and volunteer work; they bond through shared projects but must leave space for play outside improvement.",
      work: "A powerful combination in nonprofits, healthcare, or education, the One sets the bar, the Two maintains the human element.",
      famousPairs: ["Atticus Finch & Calpurnia (To Kill a Mockingbird)", "Immanuel Kant & his devoted household staff"],
    },
  },
  "1-4": {
    score: 55,
    label: "Complementary",
    summary: "Both share a longing for the ideal, but the One seeks perfection through discipline while the Four seeks it through authentic feeling.",
    together: {
      strengths: ["Mutual appreciation for depth and meaning", "Both dislike superficiality", "Shared disintegration line makes them understand each other's shadow"],
      sharedValues: ["Authenticity", "Beauty", "Personal integrity"],
      superpower: "They produce work of unusual depth and moral beauty, the One's structure gives form to the Four's vision.",
    },
    friction: {
      coreTension: "The One wants the Four to control their emotions; the Four wants the One to feel more. Each experiences the other's coping strategy as the problem.",
      typeATriggers: ["Four's mood fluctuations", "Being accused of being cold or rigid", "Emotional intensity that derails progress"],
      typeBTriggers: ["One's judgment of their feelings as excessive", "Being told to 'just move on'", "Feeling edited or corrected"],
      recurringMisunderstanding: "The One tries to fix the Four's feelings through logic, which the Four experiences as proof they are fundamentally misunderstood, confirming their deepest fear.",
    },
    growth: {
      typeALearns: "The One learns from the Four that the inner life is not a mess to be controlled but a landscape to be explored, and that grief has its own wisdom.",
      typeBLearns: "The Four learns from the One that consistent discipline and ethical commitment can transform longing into legacy.",
      healthyVision: "Together they create with beauty and rigor, neither sacrificing form for feeling nor feeling for form.",
    },
    realLife: {
      romantic: "Intensely connected when both are healthy; can spiral into mutual criticism and dramatic withdrawal when stressed.",
      friends: "Long, deep conversations about meaning, aesthetics, and what's wrong with the world, followed by long silences that both interpret differently.",
      work: "Outstanding in design, writing, or any creative discipline with ethical stakes; friction arises over process and perfectionism.",
      famousPairs: ["Virginia Woolf & Leonard Woolf", "Tolstoy & his wife Sophia"],
    },
  },
  "1-5": {
    score: 70,
    label: "Growth Partners",
    summary: "Two of the most self-contained types find common ground in their love of competence, clarity, and getting things right.",
    together: {
      strengths: ["Both value intellectual rigor", "Mutual respect for boundaries and autonomy", "Can work in focused silence without anxiety"],
      sharedValues: ["Integrity", "Precision", "Mastery"],
      superpower: "They build systems and bodies of knowledge that are both ethically grounded and intellectually rigorous, rare in any field.",
    },
    friction: {
      coreTension: "The One wants action and moral engagement; the Five wants more data before committing. The One sees the Five as detached; the Five sees the One as reactive.",
      typeATriggers: ["Five's reluctance to commit", "Feeling dismissed as 'too emotional' for having convictions", "Intellectual analysis of situations that feel morally urgent"],
      typeBTriggers: ["One's certainty about complex issues", "Being pushed to act before analysis is complete", "Moral framing of problems the Five sees as technical"],
      recurringMisunderstanding: "The One believes the Five lacks moral conviction; the Five believes the One lacks epistemic humility. Both are partially right.",
    },
    growth: {
      typeALearns: "The One learns from the Five that certainty is a hypothesis, not a verdict, and that more information makes convictions stronger, not weaker.",
      typeBLearns: "The Five learns from the One that knowledge without application is its own form of evasion, and that taking a moral stand is part of intellectual integrity.",
      healthyVision: "Expert, principled, and curious together, they become the rare thinkers who are both deeply informed and deeply committed.",
    },
    realLife: {
      romantic: "Quietly powerful, they respect each other's space and minds; intimacy is intellectual before it's emotional, which suits both.",
      friends: "Book clubs, workshops, long walks with challenging conversation; they don't see each other often but it always matters when they do.",
      work: "Superb in research, law, philosophy, or policy, one grounds the inquiry in ethics, the other in evidence.",
      famousPairs: ["Bertrand Russell & Alfred North Whitehead", "Hannah Arendt & Mary McCarthy"],
    },
  },
  "1-7": {
    score: 45,
    label: "Complementary",
    summary: "The One and the Seven are each other's integration directions, the One relaxes toward Seven's joy, the Seven matures toward One's discipline.",
    together: {
      strengths: ["The Seven's optimism lifts the One's heaviness", "The One's focus completes the Seven's many beginnings", "Together they can combine idealism with enthusiasm"],
      sharedValues: ["Improvement", "Living meaningfully", "Engaging fully with the world"],
      superpower: "The One gives projects principles; the Seven gives them momentum, together they can sustain idealistic endeavors that others abandon.",
    },
    friction: {
      coreTension: "The One's inner critic clashes directly with the Seven's inner permission-giver. What the Seven calls adventure, the One calls irresponsibility.",
      typeATriggers: ["Seven's inconsistency and follow-through failures", "Treating serious matters lightly", "Being 'talked out of' a criticism with reframes"],
      typeBTriggers: ["One's judgment and correction", "Feeling trapped by standards and rules", "Having fun dismissed as unproductive"],
      recurringMisunderstanding: "The One believes the Seven avoids reality; the Seven believes the One turns everything into a problem. Neither fully recognizes their own defensive pattern in this dynamic.",
    },
    growth: {
      typeALearns: "The One learns from the Seven that joy is not a reward earned after suffering, it is available now, without conditions.",
      typeBLearns: "The Seven learns from the One that depth and commitment create a satisfaction that novelty never can.",
      healthyVision: "A life lived with both purpose and pleasure, the One's conscience keeps them honest, the Seven's delight keeps them alive.",
    },
    realLife: {
      romantic: "Electrifying and difficult, the attraction is mutual but the values tension requires enormous conscious work.",
      friends: "The Seven drags the One on adventures they'd never choose; the One finishes what the Seven starts, often a wonderful combination.",
      work: "Powerful if roles are clear: Seven generates, One refines. Terrible if they're competing for the same authority.",
      famousPairs: ["Oscar Wilde & Lord Alfred Douglas", "Anthony Bourdain (7) & his editorial team"],
    },
  },
  "1-9": {
    score: 75,
    label: "Growth Partners",
    summary: "A naturally calming pairing: the Nine's acceptance soothes the One's inner critic, and the One's purpose gives the Nine direction.",
    together: {
      strengths: ["Nine's peace de-escalates One's tension", "One's clarity helps Nine avoid drifting", "Mutual non-drama in daily life"],
      sharedValues: ["Harmony", "Doing what is right", "Quiet consistency"],
      superpower: "They create environments of calm integrity, workplaces and homes where things are done well and nobody is shouting.",
    },
    friction: {
      coreTension: "The One is driven by urgency about what must be fixed; the Nine resists urgency itself. The Nine's equanimity reads as passivity or indifference to the One.",
      typeATriggers: ["Nine's apparent lack of urgency about real problems", "Passive-aggressive avoidance of conflict", "Difficulty getting a clear yes or no"],
      typeBTriggers: ["One's critical tone", "Feeling pressured to have stronger opinions", "Being corrected in front of others"],
      recurringMisunderstanding: "The One believes the Nine doesn't care; the Nine believes the One cares too much about the wrong things. Both are working from a distorted read of the other.",
    },
    growth: {
      typeALearns: "The One learns from the Nine that some things don't need to be fixed, and that presence is sometimes more valuable than improvement.",
      typeBLearns: "The Nine learns from the One that peaceful acceptance without discernment becomes complicity, and that standing for something is its own form of love.",
      healthyVision: "Grounded and purposeful together, the One's clarity and the Nine's acceptance combine into a rare equanimity that actually gets things done.",
    },
    realLife: {
      romantic: "One of the more naturally stable pairings; the challenge is avoiding a slow drift where the Nine merges with the One's agenda entirely.",
      friends: "Easy, reliable friendship, they work side by side without competing, but need to check in about the Nine's actual preferences.",
      work: "Excellent co-leadership pairing if roles are distributed: the One handles standards, the Nine handles diplomacy.",
      famousPairs: ["Abraham Lincoln (1) & his general Ulysses Grant (9)", "Hermione Granger (1) & Neville Longbottom (9)"],
    },
  },
  "2-3": {
    score: 60,
    label: "Growth Partners",
    summary: "Two Heart types who understand achievement and approval from the inside, they can build remarkable things together if they stay honest.",
    together: {
      strengths: ["Both socially intelligent and charming", "Can mobilize people toward shared goals", "Mutual appreciation for meaningful impact"],
      sharedValues: ["Connection", "Success", "Being seen and valued"],
      superpower: "They can build movements, the Two warms the audience, the Three inspires them; together they create belonging and momentum simultaneously.",
    },
    friction: {
      coreTension: "The Two gives personally and expects emotional reciprocity; the Three performs warmth but keeps authentic feelings behind the scenes. The Two eventually feels used.",
      typeATriggers: ["Three's instrumentalization of relationships", "Feeling like a support role, not a partner", "Three's image-maintenance that feels fake"],
      typeBTriggers: ["Two's emotional demands in busy seasons", "Possessiveness that threatens the Three's independence", "Being 'known' too well in ways that feel exposed"],
      recurringMisunderstanding: "The Two believes the Three is using them; the Three believes the Two is trying to control them. Both are avoiding the real question: can we be loved just for who we are?",
    },
    growth: {
      typeALearns: "The Two learns from the Three that being capable and self-directed is not selfish, and that healthy love includes space for individual ambition.",
      typeBLearns: "The Three learns from the Two that the most lasting success is built on genuine relationships, not managed impressions.",
      healthyVision: "Both achieve and give freely, the Three's drive paired with the Two's relational depth creates leaders people genuinely want to follow.",
    },
    realLife: {
      romantic: "Glamorous and energetic, but prone to codependency and impression management; deepens beautifully when both do inner work.",
      friends: "Natural best friends in ambitious social circles, but need regular honesty checks to avoid mutual enabling.",
      work: "A PR firm's dream team; extraordinary in sales, fundraising, or any field where results and relationships intertwine.",
      famousPairs: ["Taylor Swift (3) & her inner circle (2s)", "Oprah Winfrey (2/3) & Gayle King"],
    },
  },
  "2-4": {
    score: 50,
    label: "Complementary",
    summary: "Both Heart types with rich emotional worlds, but the Two looks outward to feel while the Four looks inward, a beautiful tension.",
    together: {
      strengths: ["Deep emotional attunement", "Both value authentic connection", "Can hold complexity and nuance in conversation"],
      sharedValues: ["Emotional truth", "Meaningful relationships", "Beauty and depth"],
      superpower: "They create emotional containers large enough for the full human experience, the Two's warmth plus the Four's depth equals extraordinary intimacy.",
    },
    friction: {
      coreTension: "The Two needs to be needed; the Four needs to be understood in their uniqueness. The Four's self-focus frustrates the Two; the Two's help-first approach feels intrusive to the Four.",
      typeATriggers: ["Four's apparent ingratitude for care offered", "Being pushed away when trying to connect", "Four's absorption in their own inner landscape"],
      typeBTriggers: ["Two hovering when the Four needs solitude", "Help that comes with an unspoken ledger", "Being 'managed' emotionally rather than witnessed"],
      recurringMisunderstanding: "The Two says 'I'm just trying to help' and the Four experiences it as 'you think I can't handle myself.' Both are trying to connect but using opposite strategies.",
    },
    growth: {
      typeALearns: "The Two learns from the Four that authentic emotional presence is more valuable than endless helpfulness, sometimes just being seen is the gift.",
      typeBLearns: "The Four learns from the Two that reaching toward others, not just inward, is how identity is forged and confirmed.",
      healthyVision: "Deeply intimate, mutually witnessed, two people who finally feel fully seen and loved for exactly who they are.",
    },
    realLife: {
      romantic: "Magnetic and deeply feeling; can become enmeshed if neither cultivates separateness. When healthy, extraordinary.",
      friends: "The kind of friendship that feels like literature, long, honest, transformative.",
      work: "Exceptional in therapeutic, artistic, or counseling contexts where emotional depth is the product.",
      famousPairs: ["Frida Kahlo (4) & Diego Rivera (with 2 traits)", "Anne of Green Gables (4) & Diana Barry (2)"],
    },
  },
  "2-6": {
    score: 70,
    label: "Growth Partners",
    summary: "Both are oriented toward others and community, the Two through love, the Six through loyalty, creating a deeply committed bond.",
    together: {
      strengths: ["Mutual investment in people and relationships", "Six's vigilance + Two's care creates a protective circle", "Both show up when it matters"],
      sharedValues: ["Loyalty", "Community", "Being there for others"],
      superpower: "They build tribes: the Two attracts people with warmth, the Six vets for safety and commitment, together they create communities of genuine belonging.",
    },
    friction: {
      coreTension: "The Two gives without asking; the Six needs to test trustworthiness before opening. The Two can feel the Six is withholding; the Six can feel the Two is trying too hard.",
      typeATriggers: ["Six's suspicion of the Two's motives", "Being questioned after giving generously", "The Six's worst-case-scenario thinking"],
      typeBTriggers: ["Two's needs appearing when the Six is already overwhelmed", "Feeling indebted by the Two's generosity", "Intrusion into the Six's carefully managed inner circle"],
      recurringMisunderstanding: "The Two interprets Six's guardedness as rejection; the Six interprets Two's generosity as manipulation. Trust, once earned, runs very deep between them.",
    },
    growth: {
      typeALearns: "The Two learns from the Six that not everyone who doesn't need you is abandoning you, and that loyalty tested is loyalty proven.",
      typeBLearns: "The Six learns from the Two that giving without a ledger is possible, and that love doesn't always have an ulterior motive.",
      healthyVision: "A partnership of absolute mutual trust, rare, earned, and enduring.",
    },
    realLife: {
      romantic: "Warm and stable; both need reassurance and can provide it generously when secure.",
      friends: "Lifelong friends who show up in crises, remember birthdays, and never stop checking in.",
      work: "Social work, community organizing, or team-based care environments, where relationships are the work.",
      famousPairs: ["Samwise Gamgee (6) & Frodo Baggins (4/9, with 2 caretaking from Sam)", "Lorelai Gilmore (7/2) & Sookie St. James (2/6)"],
    },
  },
  "2-8": {
    score: 55,
    label: "Complementary",
    summary: "An archetypal match of the Giver and the Protector, powerful, charged, and full of mutual recognition once the defenses drop.",
    together: {
      strengths: ["Both are intensely relational beneath the surface", "Eight's directness gives Two permission to have needs", "Two's warmth disarms Eight's armor"],
      sharedValues: ["Protecting those they love", "Making things happen", "Loyalty"],
      superpower: "When secure, they become a force of nature, the Two mobilizes people through care, the Eight through conviction; together, unstoppable.",
    },
    friction: {
      coreTension: "The Two manipulates through helpfulness; the Eight controls through dominance. Both deny their own vulnerability in opposite ways.",
      typeATriggers: ["Eight's bluntness that bypasses emotional sensitivity", "Being challenged rather than appreciated", "Feeling controlled rather than partnered"],
      typeBTriggers: ["Two's indirect expression of needs", "Feeling guilted or emotionally managed", "Care that feels like a trap"],
      recurringMisunderstanding: "The Two believes the Eight is cruel; the Eight believes the Two is manipulative. Both are right about the shadow side, but wrong about the intent.",
    },
    growth: {
      typeALearns: "The Two learns from the Eight that asking for what you want directly is not weakness, it's the only honest way to be loved.",
      typeBLearns: "The Eight learns from the Two that vulnerability is not a liability, it's the door through which real love enters.",
      healthyVision: "Two powerful people who protect each other openly, ask for what they need, and fight fiercely for everyone they love.",
    },
    realLife: {
      romantic: "Intense, passionate, and prone to power struggles; one of the most transformative pairings when both do the work.",
      friends: "Ride or die once established, the kind of friend who will show up at 3am no questions asked.",
      work: "The Two as chief of staff to the Eight's CEO is a classic pairing, until the Two starts expecting recognition the Eight doesn't think to give.",
      famousPairs: ["Michelle Obama (2/1) & Barack Obama (9/5)", "Miranda Priestly (8) & her assistant Andy (1/2, Devil Wears Prada)"],
    },
  },
  "3-6": {
    score: 60,
    label: "Growth Partners",
    summary: "The Achiever and the Loyalist share an integration line, the Three matures toward Six's commitment, and the Six grows toward Three's confidence.",
    together: {
      strengths: ["Both excel under pressure with clear goals", "Six's loyalty grounds Three's ambition", "Three's competence soothes Six's anxiety"],
      sharedValues: ["Responsibility", "Getting results", "Being seen as reliable"],
      superpower: "They create organizations and teams that both perform at a high level and maintain genuine loyalty, a rare combination.",
    },
    friction: {
      coreTension: "The Three performs confidence; the Six tests for authenticity. The Six's doubt undermines the Three's image; the Three's self-promotion triggers the Six's suspicion.",
      typeATriggers: ["Six's questions that feel like distrust", "Being asked to slow down and check in emotionally", "Skepticism during high-momentum moments"],
      typeBTriggers: ["Three's shifting presentations depending on audience", "Feeling like a supporting character in the Three's success story", "Image over substance"],
      recurringMisunderstanding: "The Three believes the Six is holding them back; the Six believes the Three is outrunning their own character. Both need to see that authenticity and achievement are not opposites.",
    },
    growth: {
      typeALearns: "The Three learns from the Six that enduring success is built on genuine loyalty, and that the people who stay through the failures are the ones worth having.",
      typeBLearns: "The Six learns from the Three that forward momentum is sometimes the cure for anxiety, and that competence builds the security they crave.",
      healthyVision: "Confident and committed, achieving together in ways that last because the foundation is real.",
    },
    realLife: {
      romantic: "Compatible when the Three is willing to be known and the Six is willing to believe what they see; requires consistent authenticity.",
      friends: "The Six becomes the Three's most honest mirror; the Three becomes the Six's model for courageous action.",
      work: "Outstanding in high-stakes professional environments, tech, law, corporate, where performance and loyalty both matter.",
      famousPairs: ["Harvey Specter (3) & Mike Ross (6, Suits)", "Jay Gatsby (3) & Nick Carraway (6, The Great Gatsby)"],
    },
  },
  "3-7": {
    score: 65,
    label: "Growth Partners",
    summary: "Two of the most energetic and future-oriented types, they build, launch, and inspire together at a pace that dazzles others.",
    together: {
      strengths: ["Mutual high energy and optimism", "Both action-oriented and future-focused", "Neither gets bogged down in process when results are in sight"],
      sharedValues: ["Success", "Experience", "Making things happen"],
      superpower: "They launch things, products, events, movements, with a combination of the Three's strategic drive and the Seven's infectious enthusiasm.",
    },
    friction: {
      coreTension: "The Three wants credit and direction; the Seven wants freedom and options. Competing egos and different definitions of success create friction.",
      typeATriggers: ["Seven's scattered follow-through", "Credit being shared when the Three did the heavy lifting", "Pivoting away from the original plan"],
      typeBTriggers: ["Three's need for control of the narrative", "Being slotted into a supporting role", "The relentlessness of Three's drive"],
      recurringMisunderstanding: "The Three believes they're leading; the Seven believes they're collaborating. Neither has had the meta-conversation about power.",
    },
    growth: {
      typeALearns: "The Three learns from the Seven that delight and play are not distractions from success, they're sometimes the source of the best ideas.",
      typeBLearns: "The Seven learns from the Three that commitment to one thing deeply, rather than many things lightly, is where real satisfaction lives.",
      healthyVision: "Purposeful and joyful, achieving great things while genuinely enjoying the ride.",
    },
    realLife: {
      romantic: "Electric and fast-moving; need to slow down long enough to actually know each other, not just experience each other.",
      friends: "The adventure duo, always booking the trip, launching the idea, going to the party.",
      work: "Founding team energy: fast, exciting, and potentially chaotic without a structure-oriented third person.",
      famousPairs: ["Elon Musk (3/8) & Richard Branson (7)", "Robin Hood (7) & Will Scarlet (3)"],
    },
  },
  "3-9": {
    score: 55,
    label: "Complementary",
    summary: "The Nine's calm acceptance is a profound relief to the Three who exhausts themselves performing, and the Three gives the Nine direction and energy.",
    together: {
      strengths: ["Nine's peace relaxes Three's compulsive striving", "Three's momentum pulls Nine out of inertia", "A natural complementarity of drive and acceptance"],
      sharedValues: ["Harmony", "Forward movement", "Being liked and appreciated"],
      superpower: "They make success feel effortless and kind, the Three drives the vision, the Nine ensures nobody gets left behind.",
    },
    friction: {
      coreTension: "The Three needs to be seen achieving; the Nine merges with the Three's agenda until they lose themselves, then passively resist without explanation.",
      typeATriggers: ["Nine's difficulty committing to a direction", "Passive resistance that comes without warning", "Not receiving clear positive acknowledgment"],
      typeBTriggers: ["Three's incessant forward momentum", "Feeling like a means to an end", "Never being asked what they actually want"],
      recurringMisunderstanding: "The Nine becomes the Three's supportive backdrop and eventually feels invisible. The Three doesn't know the Nine is unhappy because the Nine never said so.",
    },
    growth: {
      typeALearns: "The Three learns from the Nine that being rather than achieving is not laziness, and that the Nine's genuine presence is more valuable than their productivity.",
      typeBLearns: "The Nine learns from the Three that visibility is not vanity, and that knowing what you want and pursuing it is a form of love for yourself and others.",
      healthyVision: "Energized and at peace, moving forward with purpose while savoring the journey.",
    },
    realLife: {
      romantic: "Often a lasting couple; the challenge is ensuring the Nine doesn't completely disappear into the Three's identity.",
      friends: "The Nine is the Three's most calming presence; the Three drags the Nine into life's richness.",
      work: "A Three boss with a Nine chief of staff runs smoothly until the Nine's needs are overlooked for too long.",
      famousPairs: ["Tony Stark (3/8) & Pepper Potts (1/9)", "Carrie Bradshaw (3/4) & Aidan Shaw (9)"],
    },
  },
  "4-5": {
    score: 75,
    label: "Growth Partners",
    summary: "Two of the most inwardly oriented types, when they find each other, it feels like being understood for the first time.",
    together: {
      strengths: ["Mutual depth and intellectual/emotional complexity", "Both cherish solitude and don't crowd each other", "Five's analysis + Four's emotion = rare holistic understanding"],
      sharedValues: ["Authenticity", "Depth", "Independence", "Meaning"],
      superpower: "They create art, theory, and insight that actually plumbs the depths, the Five's framework gives the Four's feeling a shape, and the Four's meaning gives the Five's knowledge a soul.",
    },
    friction: {
      coreTension: "The Four reaches toward connection; the Five retreats from it. The Four's emotional intensity overwhelms the Five; the Five's withdrawal devastates the Four.",
      typeATriggers: ["Five's emotional unavailability", "Retreating during conflict", "Explaining feelings rather than feeling them together"],
      typeBTriggers: ["Four's emotional demands depleting resources", "Intensity that feels like intrusion", "Being the emotional anchor for someone else's storms"],
      recurringMisunderstanding: "The Four believes the Five doesn't care; the Five believes the Four will consume them. Both are protecting against annihilation, just in opposite directions.",
    },
    growth: {
      typeALearns: "The Four learns from the Five that understanding something is also a form of love, and that space can coexist with deep connection.",
      typeBLearns: "The Five learns from the Four that letting someone witness your inner world is not depletion, it is the most nourishing form of contact.",
      healthyVision: "A partnership of extraordinary inner life, each the other's most trusted witness, exploring meaning together without losing the self.",
    },
    realLife: {
      romantic: "The 'cerebral and emotional hermits' pairing, profoundly intimate but requires active bridging of the emotional-rational divide.",
      friends: "Often begin as intellectual collaborators and discover they are actually soulmates.",
      work: "Academic research, philosophical writing, independent creative work, extraordinary when neither has to perform for an audience.",
      famousPairs: ["Sylvia Plath (4) & Ted Hughes (5/8)", "Simone de Beauvoir (4/5) & Jean-Paul Sartre (5)"],
    },
  },
  "4-7": {
    score: 40,
    label: "Complementary",
    summary: "The Four wants to dive deep into what hurts; the Seven wants to surface quickly toward what delights, a fundamental tension of depth versus breadth.",
    together: {
      strengths: ["Seven's lightness can lift Four's melancholy", "Four's depth can give Seven's experience genuine meaning", "Both are creative and original"],
      sharedValues: ["Authenticity", "Vivid experience", "Self-expression"],
      superpower: "They can create the kind of work that is both joyful and profound, art, music, stories that hit hard without being dark.",
    },
    friction: {
      coreTension: "The Four sees the Seven as avoiding depth; the Seven sees the Four as wallowing in it. This is essentially a disagreement about what constitutes a meaningful life.",
      typeATriggers: ["Seven reframing sadness as an obstacle to overcome", "Being 'cheered up' rather than witnessed", "Feeling dismissed as 'too heavy'"],
      typeBTriggers: ["Four's gravitational pull toward suffering", "Emotional demands that curtail freedom", "Being made to feel guilty for being happy"],
      recurringMisunderstanding: "The Four experiences the Seven as emotionally avoidant; the Seven experiences the Four as emotionally addicted. Neither sees how each is defending against the same fear of being trapped.",
    },
    growth: {
      typeALearns: "The Four learns from the Seven that joy is not a betrayal of depth, delight is as authentic an experience as grief.",
      typeBLearns: "The Seven learns from the Four that sitting with pain, not escaping it, is what transforms experience into wisdom.",
      healthyVision: "A life of vivid, honest experience, neither avoiding pain nor cultivating it, but moving through the full spectrum with presence.",
    },
    realLife: {
      romantic: "Magnetic at first, the Four is enchanted by the Seven's brightness, the Seven by the Four's mystery. Sustaining it requires enormous mutual stretching.",
      friends: "The Four becomes the Seven's most honest mirror; the Seven becomes the Four's most needed antidote.",
      work: "Best in creative fields where both depth and energy matter, theater, music, filmmaking.",
      famousPairs: ["Amy Winehouse (4) & Mark Ronson (7, producer/creative partner)", "Anne Shirley (4) & Diana Barry (7, Anne of Green Gables)"],
    },
  },
  "4-8": {
    score: 55,
    label: "Complementary",
    summary: "An unexpected but powerful pairing, both are intense, authentic, and refuse to be small, which creates both collision and profound recognition.",
    together: {
      strengths: ["Mutual respect for directness and emotional honesty", "Both hate pretense", "Eight's strength protects Four's vulnerability; Four's depth humanizes Eight"],
      sharedValues: ["Authenticity", "Intensity", "Truth-telling"],
      superpower: "They can hold space for the full truth of human experience, the Eight with courage, the Four with feeling, creating relationships and work of rare power.",
    },
    friction: {
      coreTension: "The Eight steamrolls with force; the Four deflects with emotional withdrawal. Neither backs down, but they fight in entirely different registers.",
      typeATriggers: ["Eight's bulldozing over emotional nuance", "Being told to toughen up", "Feeling that their inner world is dismissed"],
      typeBTriggers: ["Four's emotional manipulation and moodiness", "Feeling guilt-tripped rather than confronted directly", "Slowness to act"],
      recurringMisunderstanding: "The Eight thinks the Four is dramatizing; the Four thinks the Eight is brutal. Both are actually expressing the same wound, fear of being powerless, through radically different masks.",
    },
    growth: {
      typeALearns: "The Four learns from the Eight that claiming your power is not aggression, it is the most honest form of self-expression.",
      typeBLearns: "The Eight learns from the Four that tenderness is its own form of power, and that being moved by something is not weakness.",
      healthyVision: "Fierce and feeling together, two people who can handle the full truth of each other and the world.",
    },
    realLife: {
      romantic: "Passionate and tempestuous; when both are healthy, one of the most honest and alive relationships possible.",
      friends: "The kind of friendship that survives brutal honesty because both prefer it to comfortable lies.",
      work: "Outstanding in activism, artistic direction, or any context that needs both emotional intelligence and raw courage.",
      famousPairs: ["Anaïs Nin (4) & Henry Miller (8)", "Brené Brown (4/6) & Oprah Winfrey (2/8)"],
    },
  },
  "4-9": {
    score: 65,
    label: "Growth Partners",
    summary: "The Four seeks depth; the Nine seeks peace, together they create a rare sanctuary where both uniqueness and acceptance are honored.",
    together: {
      strengths: ["Nine's acceptance soothes Four's longing to be understood", "Four's depth draws out Nine's own unexplored inner life", "Both value genuine, unhurried connection"],
      sharedValues: ["Authenticity", "Peace", "Inner life", "Non-judgment"],
      superpower: "They create a space of profound acceptance, the Four feels seen without judgment; the Nine feels safe to have genuine desires and depths.",
    },
    friction: {
      coreTension: "The Four craves active emotional engagement; the Nine can be passive, which the Four reads as abandonment. The Nine needs peace; the Four's emotional intensity disturbs it.",
      typeATriggers: ["Nine's withdrawal into numbness during emotional storms", "Feeling placated rather than truly met", "Nine's preference for harmony over honesty"],
      typeBTriggers: ["Four's constant emotional processing", "Conflict that could have been avoided", "Being asked to have opinions and take positions"],
      recurringMisunderstanding: "The Four believes the Nine doesn't care enough; the Nine believes the Four is creating problems. Both are protecting their deepest need in ways that inadvertently threaten the other's.",
    },
    growth: {
      typeALearns: "The Four learns from the Nine that equanimity is not indifference, and that some suffering can be released rather than explored.",
      typeBLearns: "The Nine learns from the Four that having deep feelings and expressing them honestly is not destructive, it is the path to genuine intimacy.",
      healthyVision: "Still and deep, a relationship with the rare quality of both profound peace and genuine emotional truth.",
    },
    realLife: {
      romantic: "Tender and genuine; needs active cultivation of both honesty and peace rather than defaulting to one or the other.",
      friends: "Long, comfortable, honest relationships, the kind where silence is never awkward.",
      work: "Best in creative or therapeutic settings; may struggle with the urgency of competitive environments.",
      famousPairs: ["John Keats (4) & Fanny Brawne (9)", "Charlie Brown (6/9) & Lucy (8, but 4/9 dynamic in their tenderness)"],
    },
  },
  "5-8": {
    score: 55,
    label: "Complementary",
    summary: "Two intensely private, self-sufficient types who both respect autonomy, when they trust each other, the depth of connection is extraordinary.",
    together: {
      strengths: ["Mutual respect for boundaries", "Both value competence and directness", "Neither plays games or deals in pretense"],
      sharedValues: ["Autonomy", "Competence", "Truth without sentiment"],
      superpower: "They build and innovate in ways nobody else can, the Five's conceptual depth plus the Eight's executive force equals projects of real consequence.",
    },
    friction: {
      coreTension: "The Eight wants decisive action; the Five wants complete analysis. The Eight sees the Five as paralyzed by thinking; the Five sees the Eight as reckless.",
      typeATriggers: ["Eight's pressure to commit before analysis is complete", "Intrusion into carefully managed mental space", "Confusing volume with correctness"],
      typeBTriggers: ["Five's endless deliberation during moments that require action", "Emotional coldness that reads as indifference", "Retreating when challenge arises"],
      recurringMisunderstanding: "The Eight believes the Five lacks conviction; the Five believes the Eight lacks wisdom. Both are actually demonstrating their deepest competency while misreading each other's approach.",
    },
    growth: {
      typeALearns: "The Five learns from the Eight that action is itself a form of intelligence, and that decisiveness is sometimes the most responsible choice.",
      typeBLearns: "The Eight learns from the Five that strategic restraint is not weakness, thinking before striking is what separates force from power.",
      healthyVision: "Strategic and powerful, thinking and action unified in service of something genuinely important.",
    },
    realLife: {
      romantic: "Slow to begin but deeply loyal; once trust is established, an extraordinarily stable and honest partnership.",
      friends: "Respect before friendship, they test each other's competence first, then open up; the friendship, once formed, is indestructible.",
      work: "CTO and CEO archetypes, each needs the other to be complete; can be brilliant if they negotiate authority clearly.",
      famousPairs: ["Steve Wozniak (5) & Steve Jobs (8)", "Sherlock Holmes (5) & Inspector Lestrade (6/8)"],
    },
  },
  "5-9": {
    score: 70,
    label: "Growth Partners",
    summary: "Two types who need space to be themselves, they find in each other a rare partner who doesn't crowd or demand, creating quiet but profound connection.",
    together: {
      strengths: ["Mutual comfort with silence and solitude together", "Both nonjudgmental and accepting", "Nine's warmth gradually draws Five out; Five's depth gradually awakens Nine's inner life"],
      sharedValues: ["Peace", "Autonomy", "Thinking things through"],
      superpower: "They create intellectual and emotional spaces of extraordinary calm, environments where important ideas can be explored without urgency or noise.",
    },
    friction: {
      coreTension: "Both can go so far inward that the relationship itself becomes invisible. The Nine merges with the Five's detachment; the Five mistakes the Nine's accommodation for genuine alignment.",
      typeATriggers: ["Nine's merging that blurs their own perspective", "Difficulty knowing what the Nine actually thinks", "Passive inertia that never challenges"],
      typeBTriggers: ["Five's complete retreat into their inner world", "Feeling like a comfortable fixture rather than a person", "The relationship drifting with no one steering"],
      recurringMisunderstanding: "Neither type creates conflict, so conflicts never get resolved, they simply accumulate beneath a surface of contentment until the distance becomes unbridgeable.",
    },
    growth: {
      typeALearns: "The Five learns from the Nine that presence doesn't deplete, being with another person in genuine contact is restorative, not exhausting.",
      typeBLearns: "The Nine learns from the Five that having a distinct, independent perspective is not aggression, it is the foundation of genuine intimacy.",
      healthyVision: "A partnership of real togetherness, both fully present and fully themselves, at peace and deeply engaged.",
    },
    realLife: {
      romantic: "Comfortable and quietly deep; needs someone (or both of them) to actively cultivate closeness rather than letting the relationship coast.",
      friends: "The ideal philosophical companion, walks, reading, gentle but genuine conversation.",
      work: "Research, writing, or any reflective work; extraordinary productivity when not pressured by external urgency.",
      famousPairs: ["Thoreau (5) & Emerson (1/5/9 transcendentalist circle)", "Bilbo Baggins (5/9) & Gandalf (5/8)"],
    },
  },
  "6-9": {
    score: 75,
    label: "Growth Partners",
    summary: "Both types seek safety and belonging, the Six through vigilance, the Nine through harmony, and together they create one of the warmest, most stable bonds in the Enneagram.",
    together: {
      strengths: ["Deep mutual loyalty and commitment", "Nine's peace calms Six's anxiety; Six's loyalty gives Nine a reason to stay present", "Both deeply devoted to their people"],
      sharedValues: ["Security", "Belonging", "Reliability", "Community"],
      superpower: "They create homes, families, and communities that feel genuinely safe, not performatively, but structurally, because both are always watching out.",
    },
    friction: {
      coreTension: "The Six anticipates danger and wants to address it; the Nine prefers to assume everything is fine. The Six's anxiety disturbs the Nine's peace; the Nine's minimizing intensifies the Six's anxiety.",
      typeATriggers: ["Nine's inability to take threats seriously", "Passive resistance when Six needs action", "Feeling alone in worry"],
      typeBTriggers: ["Six's catastrophizing creating problems that didn't exist", "Anxiety as the relationship's default state", "Being pressured to respond to hypothetical crises"],
      recurringMisunderstanding: "The Six sees the Nine as dangerously naive; the Nine sees the Six as dangerously alarmist. Both are right that the other's strategy has a blind spot, the art is integrating both.",
    },
    growth: {
      typeALearns: "The Six learns from the Nine that inner peace is not ignorance, it is a real resource that can be cultivated and that makes clearer thinking possible.",
      typeBLearns: "The Nine learns from the Six that healthy vigilance is a form of care, noticing what could go wrong is how we protect what we love.",
      healthyVision: "Safe and serene, a relationship where security is both felt and actively maintained, and where peace is earned through honest engagement with reality.",
    },
    realLife: {
      romantic: "One of the most naturally stable long-term partnerships, low drama, high loyalty, deeply warm.",
      friends: "The neighborhood friends who've known each other for thirty years and still call every week.",
      work: "Human resources, education, community building, anywhere trust and stability are the actual deliverable.",
      famousPairs: ["Marge & Homer Simpson (9/6, though both have 6 and 9 traits)", "Samwise Gamgee (6) & Bilbo Baggins (9/5)"],
    },
  },
  "7-9": {
    score: 70,
    label: "Growth Partners",
    summary: "Both are easygoing, present-oriented, and want life to feel good, they create an easy, joyful partnership that needs conscious depth to fully flourish.",
    together: {
      strengths: ["Mutual enjoyment of life's pleasures and experiences", "Neither takes themselves too seriously", "Seven's energy + Nine's peace = genuinely enjoyable company"],
      sharedValues: ["Happiness", "Freedom", "Ease", "Good experiences"],
      superpower: "They create an atmosphere of genuine enjoyment, parties, adventures, creative spaces, where people feel welcome and alive.",
    },
    friction: {
      coreTension: "The Seven escapes pain through activity; the Nine escapes through merging and numbing. Together, they can create a very comfortable avoidance of anything difficult.",
      typeATriggers: ["Nine's slowing the pace during exciting opportunities", "Passive resistance that blocks momentum", "Difficulty getting a clear yes"],
      typeBTriggers: ["Seven's relentless pace leaving the Nine behind", "Feeling dragged through too many experiences", "Seven's impatience with the Nine's deliberateness"],
      recurringMisunderstanding: "They may be so focused on enjoyment that they avoid the conversations that would actually deepen their bond, mistaking comfortable happiness for genuine intimacy.",
    },
    growth: {
      typeALearns: "The Seven learns from the Nine that slowing down is not missing out, depth requires a stillness the Seven hasn't allowed themselves.",
      typeBLearns: "The Nine learns from the Seven that enthusiasm and forward motion are not overwhelming, they are invitations to come alive.",
      healthyVision: "Joyful and present, fully alive to the moment, not running from anything, genuinely grateful for what is.",
    },
    realLife: {
      romantic: "Easy and fun; needs both partners to consciously develop the depth and honesty that doesn't come naturally to either.",
      friends: "The adventure partners, always up for something; the challenge is whether they also show up for grief and difficulty.",
      work: "Event planning, hospitality, creative direction, any context where optimism and warmth are the product.",
      famousPairs: ["Winnie the Pooh (9) & Tigger (7)", "Leslie Knope (2/1) & Ben Wyatt (1/5); the 7/9 dynamic is April & Andy in Parks and Recreation"],
    },
  },
};

// ─── Dynamic fallback ──────────────────────────────────────────────────────────
function buildDynamicContent(a: number, b: number): PairContent {
  const typeA = enneagramTypes.find((t) => t.number === a);
  const typeB = enneagramTypes.find((t) => t.number === b);
  if (!typeA || !typeB) return { score: 0, label: "Unknown", summary: "Could not find type data.", together: { strengths: [], sharedValues: [], superpower: "" }, friction: { coreTension: "", typeATriggers: [], typeBTriggers: [], recurringMisunderstanding: "" }, growth: { typeALearns: "", typeBLearns: "", healthyVision: "" }, realLife: { romantic: "", friends: "", work: "", famousPairs: [] } };
  const score = calculateScore(a, b);
  const label = getScoreLabel(score);
  const centerA = getCenter(a);
  const centerB = getCenter(b);
  const sameCenterNote = centerA === centerB ? `Both come from the ${centerA} Center, giving them a shared emotional instinct. ` : "";
  return {
    score,
    label,
    summary: `${typeA.name} and ${typeB.name} meet between the desire to ${typeA.coreDesire.toLowerCase().slice(0, 40)} and the desire to ${typeB.coreDesire.toLowerCase().slice(0, 40)}. ${sameCenterNote}Their path forward lies in recognizing the fear beneath each other's surface behavior.`,
    together: {
      strengths: [
        `${typeA.name}'s ${typeA.keyTraits[0].toLowerCase()} balances ${typeB.name}'s ${typeB.keyTraits[0].toLowerCase()}`,
        `Shared commitment to growth when both are healthy`,
        `Each brings a perspective the other genuinely lacks`,
      ],
      sharedValues: [
        centerA === centerB ? `${centerA} Center intelligence` : "Complementary intelligences",
        "Authenticity in their respective styles",
        "Genuine care for others in their own way",
      ],
      superpower: `${typeA.name}'s ${typeA.healthyTraits[0].toLowerCase()} combined with ${typeB.name}'s ${typeB.healthyTraits[0].toLowerCase()} creates a rare combination of gifts that neither possesses alone.`,
    },
    friction: {
      coreTension: `${typeA.name} fears ${typeA.coreFear.toLowerCase()}, while ${typeB.name} fears ${typeB.coreFear.toLowerCase()}, these fears can make each read the other as a threat.`,
      typeATriggers: [
        `When ${typeB.name} appears to confirm their deepest fear`,
        `${typeB.averageTraits[0]} behavior at stress`,
        `Misreading ${typeB.name}'s coping strategy as a character flaw`,
      ],
      typeBTriggers: [
        `When ${typeA.name} appears to confirm their deepest fear`,
        `${typeA.averageTraits[0]} behavior at stress`,
        `Misreading ${typeA.name}'s coping strategy as a character flaw`,
      ],
      recurringMisunderstanding: `${typeA.name} interprets ${typeB.name}'s behavior through their own fear, and vice versa, each inadvertently triggers what the other is most trying to avoid.`,
    },
    growth: {
      typeALearns: `${typeA.name} learns from ${typeB.name} that ${typeB.coreDesire.toLowerCase()} is a valid goal, and that there is more than one way to live with integrity.`,
      typeBLearns: `${typeB.name} learns from ${typeA.name} that ${typeA.coreDesire.toLowerCase()} is a valid goal, and gains access to capacities they haven't developed.`,
      healthyVision: `Both integrated and at peace with themselves, they find their respective strengths are complementary rather than competing, creating something neither could build alone.`,
    },
    realLife: {
      romantic: `This pairing requires both partners to understand each other's core fears and desires deeply, when that happens, genuine transformation is possible.`,
      friends: `A friendship built on respecting difference, they challenge each other to grow in the ways they most need.`,
      work: `Effective when roles are clear and each type's strengths are in play; friction arises when they compete on the other's home turf.`,
      famousPairs: [`(Curated famous pairs not available for this pairing, content is dynamically generated)`],
    },
  };
}

function getPairContent(a: number, b: number): PairContent {
  const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
  if (TYPE_PAIR_CONTENT[key]) return TYPE_PAIR_CONTENT[key];
  return buildDynamicContent(a, b);
}

// ─── Type Button Grid ──────────────────────────────────────────────────────────
function TypeGrid({
  selected,
  onSelect,
  label,
}: {
  selected: number | null;
  onSelect: (n: number) => void;
  label: string;
}) {
  return (
    <div className="flex-1 rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-4">{label}</div>
      <div className="grid grid-cols-3 gap-2.5">
        {enneagramTypes.map((t) => {
          const isSelected = selected === t.number;
          return (
            <button
              key={t.number}
              onClick={() => onSelect(t.number)}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl p-3 transition-all duration-200 border text-center`}
              style={isSelected
                ? { background: "rgba(139,92,246,0.25)", borderColor: "rgba(139,92,246,0.5)" }
                : { background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.09)" }}
            >
              <span className="text-xl font-bold" style={{ color: isSelected ? "#fff" : "rgba(255,255,255,0.8)" }}>{t.number}</span>
              <span className="text-[10px] font-medium leading-tight" style={{ color: isSelected ? "rgba(196,181,253,1)" : "rgba(255,255,255,0.35)" }}>
                {t.name.replace("The ", "")}
              </span>
            </button>
          );
        })}
      </div>
      {selected && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: enneagramTypes.find((t) => t.number === selected)?.color }}
          >
            {selected}
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
              {enneagramTypes.find((t) => t.number === selected)?.name}
            </div>
            <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              {enneagramTypes.find((t) => t.number === selected)?.alias}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Quick Facts Strip ─────────────────────────────────────────────────────────
function QuickFacts({ typeA, typeB }: { typeA: number; typeB: number }) {
  const a = enneagramTypes.find((t) => t.number === typeA);
  const b = enneagramTypes.find((t) => t.number === typeB);
  if (!a || !b) return <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Type data not found.</p>;
  return (
    <div className="grid grid-cols-2 gap-3">
      {[a, b].map((t, i) => (
        <motion.div
          key={t.number}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: t.color }}
            >
              {t.number}
            </div>
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>{t.name}</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex gap-2">
              <span className="w-14 shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>Fear</span>
              <span className="leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>{t.coreFear}</span>
            </div>
            <div className="flex gap-2">
              <span className="w-14 shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>Desire</span>
              <span className="leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>{t.coreDesire}</span>
            </div>
            <div className="flex gap-2">
              <span className="w-14 shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>Essence</span>
              <span className="font-semibold text-violet-400">{t.keyTraits[0]}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tabs ──────────────────────────────────────────────────────────────────────
type Tab = "together" | "friction" | "growth" | "reallife";

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "together", label: "Together", icon: Sparkles },
  { id: "friction", label: "Friction", icon: Zap },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "reallife", label: "In Real Life", icon: Heart },
];

function TabPanel({ typeA, typeB, content }: { typeA: number; typeB: number; content: PairContent }) {
  const [activeTab, setActiveTab] = useState<Tab>("together");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    together: null, friction: null, growth: null, reallife: null,
  });

  const a = enneagramTypes.find((t) => t.number === typeA);
  const b = enneagramTypes.find((t) => t.number === typeB);

  if (!a || !b) return <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Type data not found.</p>;

  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      {/* Tab Bar */}
      <div className="flex relative" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium flex-1 justify-center transition-colors duration-150`}
              style={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.35)" }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "together" && (
            <motion.div
              key="together"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Shared Strengths</div>
                <div className="space-y-2">
                  {content.together.strengths.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                      {s}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Shared Values</div>
                <div className="flex flex-wrap gap-2">
                  {content.together.sharedValues.map((v, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full text-violet-300" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">Their Superpower</div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{content.together.superpower}</p>
              </div>
            </motion.div>
          )}

          {activeTab === "friction" && (
            <motion.div
              key="friction"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="p-4 rounded-2xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">Core Tension</div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{content.friction.coreTension}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: a.color }}>{a.number}</div>
                    <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>What triggers {a.name.replace("The ", "")}</div>
                  </div>
                  <div className="space-y-1.5">
                    {content.friction.typeATriggers.map((t, i) => (
                      <div key={i} className="text-xs flex items-start gap-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <span className="text-rose-400 mt-0.5">▸</span>{t}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: b.color }}>{b.number}</div>
                    <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>What triggers {b.name.replace("The ", "")}</div>
                  </div>
                  <div className="space-y-1.5">
                    {content.friction.typeBTriggers.map((t, i) => (
                      <div key={i} className="text-xs flex items-start gap-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <span className="text-rose-400 mt-0.5">▸</span>{t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>The Recurring Misunderstanding</div>
                <p className="text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.6)" }}>&ldquo;{content.friction.recurringMisunderstanding}&rdquo;</p>
              </div>
            </motion.div>
          )}

          {activeTab === "growth" && (
            <motion.div
              key="growth"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {[
                { type: a, learns: content.growth.typeALearns },
                { type: b, learns: content.growth.typeBLearns },
              ].map(({ type, learns }, i) => (
                <motion.div
                  key={type.number}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-2xl"
                  style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: type.color }}>{type.number}</div>
                    <div className="text-xs font-semibold text-emerald-400">{type.name} learns&hellip;</div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{learns}</p>
                </motion.div>
              ))}
              <div className="p-4 rounded-2xl" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
                <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">When Both Are Healthy</div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{content.growth.healthyVision}</p>
              </div>
            </motion.div>
          )}

          {activeTab === "reallife" && (
            <motion.div
              key="reallife"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {[
                { label: "As Romantic Partners", content: content.realLife.romantic, color: "rose" },
                { label: "As Close Friends", content: content.realLife.friends, color: "sky" },
                { label: "As Coworkers", content: content.realLife.work, color: "indigo" },
              ].map((section, i) => (
                <motion.div
                  key={section.label}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.09 }}
                  className="p-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <div className="text-xs font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>{section.label}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{section.content}</p>
                </motion.div>
              ))}
              {content.realLife.famousPairs.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Famous &amp; Fictional Pairs</div>
                  <div className="flex flex-wrap gap-2">
                    {content.realLife.famousPairs.map((p, i) => (
                      <span key={i} className="px-3 py-1.5 text-xs rounded-xl font-medium text-violet-300" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
function CompatibilityMeter({ typeA, typeB }: { typeA: number; typeB: number }) {
  const score = calculateScore(typeA, typeB);
  // Qualitative labels only, no pseudoscientific percentages
  const label = score >= 80 ? "Natural Allies" :
    score >= 65 ? "Strong Connection" :
    score >= 50 ? "Complementary" :
    score >= 35 ? "Growth-Oriented" :
    "High Friction, High Growth";
  const desc = score >= 80 ? "These types intuitively understand each other and share compatible worldviews." :
    score >= 65 ? "A strong pairing with natural chemistry and shared values." :
    score >= 50 ? "Different strengths that complement each other, both can learn a lot." :
    score >= 35 ? "Challenging but rewarding, this pairing pushes both types to grow." :
    "Significant friction, but also the deepest potential for transformation.";
  const colorClass =
    score >= 80 ? "from-emerald-400 to-teal-500" :
    score >= 65 ? "from-sky-400 to-indigo-500" :
    score >= 50 ? "from-violet-400 to-purple-500" :
    score >= 35 ? "from-amber-400 to-orange-400" :
    "from-rose-400 to-red-500";
  const textColor =
    score >= 80 ? "text-emerald-400" :
    score >= 65 ? "text-sky-400" :
    score >= 50 ? "text-violet-400" :
    score >= 35 ? "text-amber-400" :
    "text-rose-400";

  return (
    <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>Dynamic</span>
        <span className={`text-xs font-bold ${textColor}`}>{label}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
        />
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>More friction</span>
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>More natural</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
      <div className="flex items-start gap-1.5 mt-2">
        <Info className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.2)" }} />
        <p className="text-[10px] italic leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          Based on Enneagram structural patterns, not a prediction of relationship success. Individual health, growth, and context matter far more than type.
        </p>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [typeA, setTypeA] = useState<number | null>(null);
  const [typeB, setTypeB] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [userEnneagramType, setUserEnneagramType] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        if (profile.enneagramType) setUserEnneagramType(Number(profile.enneagramType));
      }
    } catch {}
  }, []);

  const bothSelected = typeA !== null && typeB !== null;
  const pairContent = bothSelected ? getPairContent(typeA!, typeB!) : null;

  const handleSwap = () => {
    setTypeA(typeB);
    setTypeB(typeA);
  };

  const handleShare = async () => {
    if (!typeA || !typeB || !pairContent) return;
    const nameA = enneagramTypes.find(t => t.number === typeA)?.name ?? `Type ${typeA}`;
    const nameB = enneagramTypes.find(t => t.number === typeB)?.name ?? `Type ${typeB}`;
    const score = calculateScore(typeA, typeB);
    const label = getScoreLabel(score);
    const text = `${nameA} + ${nameB}: ${label}\n\n"${pairContent.summary}"\n\nExplore your type on Thyself →`;
    if (navigator.share) {
      try { await navigator.share({ title: `${nameA} & ${nameB} Compatibility`, text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#0f0a1e" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-violet-400 text-xs font-medium mb-4" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}>
            <Users className="w-3 h-3" /> Compatibility Explorer
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>Type Compatibility</h1>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Select two Enneagram types to explore how they relate, in love, friendship, and work.
          </p>
        </motion.div>

        {/* Personalized Relationship Patterns — shown only if user has a type */}
        {userEnneagramType && (() => {
          const userTypeData = enneagramTypes.find(t => t.number === userEnneagramType);
          if (!userTypeData) return null;

          const integrationTypeNum = userTypeData.integrationLine;
          const disintegrationTypeNum = userTypeData.disintegrationLine;
          // Determine wing type: use right wing (number + 1, wrapping 9→1)
          const wingTypeNum = userEnneagramType === 9 ? 1 : userEnneagramType + 1;

          const pairs = [
            {
              label: "Integration (Growth Line)",
              typeNums: [userEnneagramType, integrationTypeNum] as [number, number],
              note: `Where you go in growth — Type ${integrationTypeNum}'s qualities as growth edge`,
            },
            {
              label: "Disintegration (Stress Line)",
              typeNums: [userEnneagramType, disintegrationTypeNum] as [number, number],
              note: `Where you go under stress — Type ${disintegrationTypeNum}'s patterns activated`,
            },
            {
              label: "Wing Connection",
              typeNums: [userEnneagramType, wingTypeNum] as [number, number],
              note: `Your adjacent wing — influences your core type's expression`,
            },
          ];

          return (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                    Your Relationship Patterns
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Type {userEnneagramType} · {userTypeData.name} — key dynamics for your type
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                {pairs.map(({ label, typeNums, note }) => {
                  const [a, b] = typeNums;
                  const typeAData = enneagramTypes.find(t => t.number === a);
                  const typeBData = enneagramTypes.find(t => t.number === b);
                  const pairContent = getPairContent(a, b);
                  return (
                    <button
                      key={label}
                      onClick={() => { setTypeA(a); setTypeB(b); }}
                      className="text-left p-4 rounded-2xl transition-all hover:scale-[1.02]"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
                          style={{ backgroundColor: typeAData?.color ?? "#666" }}
                        >
                          {a}
                        </div>
                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>+</span>
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
                          style={{ backgroundColor: typeBData?.color ?? "#666" }}
                        >
                          {b}
                        </div>
                        <ChevronRight className="w-3 h-3 ml-auto shrink-0" style={{ color: "rgba(255,255,255,0.2)" }} />
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(139,92,246,0.7)" }}>
                        {label}
                      </p>
                      <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {pairContent?.summary?.slice(0, 80) ?? note}{pairContent?.summary && pairContent.summary.length > 80 ? "…" : ""}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="text-[10px] italic text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                Tap a card to explore the full pairing below, or use the selectors to compare any two types.
              </p>
            </motion.div>
          );
        })()}

        {/* Type Selectors */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 mb-10">
          <TypeGrid selected={typeA} onSelect={setTypeA} label="Type A" />

          {/* Swap Button */}
          <div className="flex sm:flex-col items-center justify-center gap-2 py-2 sm:py-8">
            <button
              onClick={handleSwap}
              disabled={!typeA && !typeB}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-40 hover:text-violet-400"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Swap</span>
            </button>
          </div>

          <TypeGrid selected={typeB} onSelect={setTypeB} label="Type B" />
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {bothSelected && pairContent && (
            <motion.div
              key={`${typeA}-${typeB}`}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              {/* Compatibility Overview */}
              <div className="rounded-3xl p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="flex flex-col gap-4">
                  {typeA === typeB && (
                    <p className="text-xs font-medium text-violet-400 rounded-full px-3 py-1 w-fit" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}>
                      Same-type pairing, see how two {enneagramTypes.find(t => t.number === typeA)?.name}s relate
                    </p>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: enneagramTypes.find(t => t.number === typeA)?.color }}>
                          {typeA}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{enneagramTypes.find(t => t.number === typeA)?.name}</span>
                      </div>
                      <span className="text-lg" style={{ color: "rgba(255,255,255,0.2)" }}>+</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: enneagramTypes.find(t => t.number === typeB)?.color }}>
                          {typeB}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{enneagramTypes.find(t => t.number === typeB)?.name}</span>
                      </div>
                    </div>
                    {/* Share button */}
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      onClick={handleShare}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-violet-500/20"
                      style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa" }}
                    >
                      {copied ? <><Check className="w-3.5 h-3.5" />Copied!</> : <><Share2 className="w-3.5 h-3.5" />Share</>}
                    </motion.button>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{pairContent.summary}</p>

                  {/* Vibe meter */}
                  <CompatibilityMeter typeA={typeA!} typeB={typeB!} />

                  <div className="flex flex-wrap gap-2">
                    {[
                      getCenter(typeA!) === getCenter(typeB!) && `Shared ${getCenter(typeA!)} Center`,
                      getHarmonicGroup(typeA!) === getHarmonicGroup(typeB!) && `Same Harmonic Group`,
                      areWingNeighbors(typeA!, typeB!) && "Wing Neighbors",
                      (enneagramTypes.find(t => t.number === typeA)?.integrationLine === typeB || enneagramTypes.find(t => t.number === typeB)?.integrationLine === typeA) && "Integration Connection",
                    ].filter(Boolean).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 text-[11px] font-medium rounded-full text-sky-300" style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}>
                        {tag as string}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Panel */}
              <TabPanel typeA={typeA!} typeB={typeB!} content={pairContent} />

              {/* Quick Facts Strip */}
              <QuickFacts typeA={typeA!} typeB={typeB!} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!bothSelected && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.12)" }}>
              <Users className="w-7 h-7 text-violet-400" />
            </div>
            <p className="font-serif text-lg mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              {typeA === null && typeB === null
                ? "Select two types to begin"
                : "Select a second type to compare"}
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>Explore compatibility across all 9 types</p>
          </motion.div>
        )}

        <NextStepBanner
          href="/correlations"
          label="See how types correlate across systems"
          sublabel="Explore statistical patterns between Enneagram and cognitive function types"
          icon={<ArrowLeftRight className="w-5 h-5" />}
          color="#14b8a6"
        />
      </div>
    </div>
  );
}
