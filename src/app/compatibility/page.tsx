"use client";

import { getReferralShareUrl } from "@/lib/referral";
import { TYPE_COLORS } from "@/data/enneagram";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2, Check, UserPlus, Sparkles, Heart, Zap, MessageCircle } from "lucide-react";
import { toPng } from "html-to-image";
import { assetPath } from "@/lib/assetPath";

// ─── Constants ────────────────────────────────────────────────────────────────


const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer",
  2: "The Helper",
  3: "The Achiever",
  4: "The Individualist",
  5: "The Investigator",
  6: "The Loyalist",
  7: "The Enthusiast",
  8: "The Challenger",
  9: "The Peacemaker",
};

// Triads for fallback generation
const TRIADS: Record<string, number[]> = {
  Gut: [8, 9, 1],
  Heart: [2, 3, 4],
  Head: [5, 6, 7],
};

function getTriad(n: number): string {
  for (const [triad, types] of Object.entries(TRIADS)) {
    if (types.includes(n)) return triad;
  }
  return "Unknown";
}

// ─── Compatibility Data ───────────────────────────────────────────────────────

interface CompatibilityData {
  insight: string;
  strengths: string[];
  edges: string[];
  tip: string;
}

// Key format: always "min-max" (e.g., "1-2" not "2-1")
function pairKey(a: number, b: number): string {
  return `${Math.min(a, b)}-${Math.max(a, b)}`;
}

const COMPATIBILITY_MATRIX: Record<string, CompatibilityData> = {
  // ── Same-type pairs ──────────────────────────────────────────────────────
  "1-1": {
    insight:
      "Two Reformers together share a deep commitment to doing things right, which can create a beautifully principled partnership or an exhausting cycle of mutual criticism. You understand each other's inner critic instantly, which is both a relief and a risk.",
    strengths: [
      "Shared integrity and moral purpose create a rock-solid foundation",
      "Both hold high standards. no one lets the other off the hook",
      "Deep mutual respect for discipline, effort, and doing good work",
    ],
    edges: [
      "The inner critic goes stereo. both of you can spiral into perfectionism together",
      "Difficulty relaxing or celebrating; there's always something to improve",
      "Competing visions of 'the right way' can create stubborn standoffs",
    ],
    tip: "Schedule explicit time for play and imperfection. let something be 'good enough' together, on purpose.",
  },
  "2-2": {
    insight:
      "Two Helpers share extraordinary warmth and attentiveness, but the same pattern that makes you generous can leave you both waiting for the other to admit they need something. The relationship flourishes when both of you practice receiving as gracefully as you give.",
    strengths: [
      "Lavish mutual care. you both intuitively anticipate each other's needs",
      "A naturally emotionally attuned environment where feelings are honored",
      "Shared joy in nurturing others, whether family, friends, or community",
    ],
    edges: [
      "Neither wants to be the 'needy' one. real needs go unspoken",
      "Resentment can quietly build if both keep score unconsciously",
      "Over-focusing on others' wellbeing at the expense of your own relationship",
    ],
    tip: "Take turns asking each other directly: 'What do you need from me right now?'. and mean it.",
  },
  "3-3": {
    insight:
      "Two Achievers together can build something remarkable, but success can become the third presence in the relationship. You'll need to deliberately carve out space to simply be. not perform, not accomplish. together.",
    strengths: [
      "Mutual drive and ambition create a high-energy, highly functional partnership",
      "Genuine appreciation for each other's competence and accomplishments",
      "Shared ability to adapt, pivot, and make things happen",
    ],
    edges: [
      "Authentic emotional connection can get crowded out by productivity",
      "Competitive undercurrents may surface, even if both deny it",
      "Risk of defining the relationship by what you achieve rather than who you are",
    ],
    tip: "Create a standing ritual. a walk, a meal. where neither of you talks about goals, work, or achievements.",
  },
  "4-4": {
    insight:
      "Two Individualists create a relationship of extraordinary emotional depth and creative richness. The shadow side is that shared melancholy can become a mutual dwelling place; you both need to consciously reach toward what's beautiful and present, not just what's absent.",
    strengths: [
      "Profound emotional attunement. you speak each other's inner language",
      "Creative resonance that produces art, meaning, and genuine beauty",
      "A rare mutual permission to be fully, rawly yourself",
    ],
    edges: [
      "Melancholy can compound. two people drawn to longing can feed each other's",
      "Competitive suffering or uniqueness can create subtle one-upmanship",
      "Intensity without grounding can destabilize both people simultaneously",
    ],
    tip: "Balance your shared depth with explicit gratitude for the ordinary. notice what's already here, not only what's missing.",
  },
  "5-5": {
    insight:
      "Two Investigators create an intellectually rich sanctuary where both can think without intrusion. The challenge is that both retreating to separate inner worlds can leave genuine intimacy unexplored. you'll need to actively choose to show each other what's inside.",
    strengths: [
      "Deep mutual respect for autonomy, space, and intellectual independence",
      "Conversations of extraordinary depth and rigor",
      "Neither overwhelms the other. both are comfortable with quiet and solitude",
    ],
    edges: [
      "Emotional connection can be permanently deferred in favor of more thinking",
      "Two people each managing scarcity can leave both feeling quietly unseen",
      "Decisions can stall indefinitely while both continue gathering information",
    ],
    tip: "Choose one topic each week where you share your actual feelings. not your analysis of your feelings, but the raw experience itself.",
  },
  "6-6": {
    insight:
      "Two Loyalists share a rare depth of trustworthiness and commitment that can create an unusually stable bond. The risk is that shared anxiety can amplify. when both of you spiral into worst-case thinking, you need a shared agreement to interrupt the loop.",
    strengths: [
      "Extraordinary loyalty and commitment. both of you show up when it matters",
      "Mutual understanding of anxiety without judgment or dismissal",
      "Shared values around reliability, honesty, and community",
    ],
    edges: [
      "Anxiety can echo and escalate when both catastrophize together",
      "Overthinking decisions can lead to paralysis on things that need action",
      "Both scanning for threats can make the environment feel perpetually unsafe",
    ],
    tip: "Agree on a phrase. a codeword. to interrupt shared spiraling and redirect toward what you actually know to be true right now.",
  },
  "7-7": {
    insight:
      "Two Enthusiasts create a relationship of extraordinary vitality, curiosity, and fun. The shadow is that depth, conflict, and the harder parts of connection can be collectively avoided. you'll need to deliberately choose to stay when it gets uncomfortable.",
    strengths: [
      "Boundless energy, adventure, and delight in each other's company",
      "Mutual permission to be curious, expansive, and to chase what excites you",
      "Genuine joy in exploration. neither drags the other toward limitation",
    ],
    edges: [
      "Conflict avoidance can leave real issues buried under another activity",
      "Difficulty sustaining commitment when the novelty of something wears off",
      "Two people generating options without grounding can spin without landing",
    ],
    tip: "Build in a regular 'stay and feel' conversation. one where neither of you is allowed to reframe, pivot, or redirect for at least ten minutes.",
  },
  "8-8": {
    insight:
      "Two Challengers create a relationship of extraordinary honesty, intensity, and mutual respect. when healthy. Two dominant forces sharing space will need to negotiate power consciously, or the relationship becomes a collision zone.",
    strengths: [
      "Radical mutual honesty. neither of you flinches from hard truths",
      "Deep respect earned through directness; neither needs to be protected",
      "Shared strength means both can bring their full force to any challenge",
    ],
    edges: [
      "Power struggles can escalate without natural deescalation",
      "Vulnerability can feel like tactical exposure. opening up is genuinely hard",
      "Both moving at full speed in different directions requires active coordination",
    ],
    tip: "Establish a turn-taking norm for decisions: one person 'drives' per domain, and both honor it rather than re-litigating every call.",
  },
  "9-9": {
    insight:
      "Two Peacemakers create a deeply comfortable, harmonious space where both feel accepted. The shadow is that important things go unsaid, decisions go unmade, and growth gets indefinitely deferred in the service of not rocking the boat.",
    strengths: [
      "Profound mutual acceptance. neither judges, neither pushes",
      "A genuinely peaceful environment where both feel seen and calm",
      "Shared generosity and goodwill toward each other and the world",
    ],
    edges: [
      "Conflict avoidance means real issues accumulate unaddressed",
      "Priorities and passions can get lost in mutual accommodation",
      "Inertia can settle in. neither partner initiates growth or change",
    ],
    tip: "Take turns naming one thing you actually want. not what would be fine, but what you genuinely prefer. and practice honoring each other's answer.",
  },

  // ── Cross-type pairs ─────────────────────────────────────────────────────
  "1-2": {
    insight:
      "The Reformer and the Helper are united by a genuine desire to make the world better. one through standards, the other through service. When healthy, this creates principled and humane action; when stressed, the One's criticism lands as rejection and the Two's helpfulness feels like management.",
    strengths: [
      "Shared commitment to doing good in the world",
      "The One provides structure and vision; the Two provides warmth and care",
      "Deeply invested in each other's and others' wellbeing",
    ],
    edges: [
      "The One critiques; the Two personalizes every critique as rejection",
      "The Two's indirect emotional appeals clash with the One's rational directness",
      "Both can feel the other doesn't appreciate their core motivation",
    ],
    tip: "One: lead with appreciation before correction. Two: ask for what you need directly instead of hoping it gets noticed.",
  },
  "1-3": {
    insight:
      "The Reformer and the Achiever are both Competency types. they share a drive to do things excellently and are frustrated by mediocrity. The One wants things done right; the Three wants things done effectively. These are often the same goal, but they diverge memorably under pressure.",
    strengths: [
      "Both have exceptionally high standards and the drive to meet them",
      "Mutual competence earns deep mutual respect",
      "Complementary: One grounds in ethics, Three grounds in results",
    ],
    edges: [
      "The Three's shortcuts feel like moral compromises to the One",
      "The One's ethical rigidity feels like inefficiency to the Three",
      "Both can become too focused on doing to make space for being",
    ],
    tip: "Agree in advance on which goal matters most right now. integrity or impact. so neither feels their core value is being overridden.",
  },
  "1-4": {
    insight:
      "Both the Reformer and the Individualist reach toward an ideal. the One through discipline, the Four through authentic feeling. They share integration lines, which means each holds the other's potential growth. They can inspire each other profoundly or frustrate each other deeply.",
    strengths: [
      "Mutual appreciation for depth, meaning, and refusing the superficial",
      "The One's structure gives form to the Four's vision",
      "Both are deeply committed to living with integrity",
    ],
    edges: [
      "The One wants the Four to manage their emotions; the Four wants the One to feel more",
      "The One's criticism feels devastating to the Four's identity",
      "The Four's emotional intensity can overwhelm the One's inner order",
    ],
    tip: "One: offer acknowledgment before offering improvement. Four: distinguish between 'I feel criticized' and 'I am being criticized.'",
  },
  "1-6": {
    insight:
      "The Reformer and the Loyalist share a profound dedication to values, responsibility, and doing what's right. Both can be prone to worry and self-criticism, but they also both show up when it counts. This pairing often produces extraordinary trust.",
    strengths: [
      "Shared commitment to responsibility, reliability, and ethical living",
      "Both value loyalty and won't abandon each other in hard times",
      "Mutually reinforcing conscientiousness creates real stability",
    ],
    edges: [
      "Both can spiral into anxiety and self-doubt at the same time",
      "The One's certainty about right action can feel authoritarian to the Six",
      "The Six's questioning of authority can feel like undermining to the One",
    ],
    tip: "Channel your shared conscientiousness outward. toward a cause or project. so it doesn't turn into mutual criticism.",
  },
  "1-8": {
    insight:
      "The Reformer and the Challenger share a fierce commitment to truth and a low tolerance for hypocrisy. Both are capable of righteous anger. The difference is that the One turns much of that energy inward while the Eight projects it outward. which creates both respect and collision.",
    strengths: [
      "Mutual respect for directness, honesty, and standing for what's right",
      "Neither backs down from hard conversations or hard truths",
      "Shared passion for justice can make them a powerful team",
    ],
    edges: [
      "Both convinced of their own rightness can create immovable standoffs",
      "The One resents the Eight's disregard for rules; the Eight resents the One's rigidity",
      "High tension when values align but methods diverge sharply",
    ],
    tip: "Before a conflict escalates, ask: 'Are we actually disagreeing about the goal, or just the method?'. you may be closer than it feels.",
  },
  "1-9": {
    insight:
      "The Reformer and the Peacemaker share a core wing. they are natural neighbors on the Enneagram. The One wants to improve; the Nine wants to accept. This tension is one of the most instructive dynamics in personal growth, and in relationship it can be both deeply complementary and deeply frustrating.",
    strengths: [
      "The Nine softens the One's self-criticism with genuine acceptance",
      "The One gives direction and purpose to the Nine's tendency to drift",
      "Both genuinely care about doing what's right and avoiding harm",
    ],
    edges: [
      "The One's urgency clashes with the Nine's pace",
      "The Nine's conflict avoidance frustrates the One's directness",
      "The One may feel like they're carrying all the initiative; the Nine may feel constantly corrected",
    ],
    tip: "One: trust that gentle progress still counts. Nine: choose one thing that matters to you and advocate for it directly.",
  },
  "2-3": {
    insight:
      "Both Heart types, the Helper and the Achiever are drawn to being valued, appreciated, and seen. The Two wants to be loved for their care; the Three wants to be admired for their success. They understand each other's longing even when they express it differently.",
    strengths: [
      "Shared warmth, relational intelligence, and social ease",
      "The Three's confidence complements the Two's nurturing",
      "Both genuinely invested in relationships and in being known",
    ],
    edges: [
      "Both can perform rather than reveal, leaving authentic connection thin",
      "The Two may feel the Three loves achievement more than people; the Three may feel smothered",
      "Competing emotional needs can create a subtle 'who needs more?' dynamic",
    ],
    tip: "Make space for the question neither of you naturally asks: 'Who are we when we're not trying to impress or please anyone?'",
  },
  "2-4": {
    insight:
      "The Helper and the Individualist share a deep emotional life and a longing to be truly seen. The Two expresses this through giving; the Four expresses it through depth of feeling. Together they can create a relationship of remarkable emotional richness. when neither is in their wound.",
    strengths: [
      "Mutual emotional attunement and genuine empathy",
      "The Two's warmth holds the Four's intensity with acceptance",
      "The Four's depth gives the Two permission to want and feel, not just give",
    ],
    edges: [
      "The Four needs to be seen in their uniqueness; the Two needs to be indispensable. both can feel unappreciated",
      "The Two's giving can feel intrusive when the Four needs to be alone with their feelings",
      "Both can become absorbed in the emotional weather and lose practical footing",
    ],
    tip: "Two: ask permission before stepping in to help. Four: receive care as care, not control.",
  },
  "2-6": {
    insight:
      "The Helper and the Loyalist are among the most relationship-oriented pairings on the Enneagram. Both are warm, committed, and care deeply about the people they love. Together they create a remarkably safe and secure bond, when trust is solid.",
    strengths: [
      "Mutual warmth, dedication, and genuine investment in each other",
      "Both show up reliably and take relationships seriously",
      "A strong sense of safety and belonging. neither abandons the other",
    ],
    edges: [
      "Both can rely on reassurance rather than developing internal security",
      "The Two's helpfulness can tip into managing; the Six reads it as control",
      "Shared anxiety can create a feedback loop rather than stability",
    ],
    tip: "Practice giving and receiving reassurance without immediately escalating to problem-solving. sometimes 'I hear you' is the whole answer.",
  },
  "2-8": {
    insight:
      "The Helper and the Challenger are a classic paradox: one leads with warmth, the other with force, yet both are intensely relational and fiercely protective of the people they love. This pairing tends to produce remarkable chemistry and remarkable friction in equal measure.",
    strengths: [
      "The Eight's strength gives the Two safety to finally stop over-giving",
      "The Two's warmth reaches the Eight in ways few others can",
      "Both are protective, generous, and intensely loyal when they trust you",
    ],
    edges: [
      "The Eight's bluntness feels like rejection to the Two",
      "The Two's emotional bids can feel manipulative to the Eight",
      "Power dynamics can calcify: the Eight dominates, the Two accommodates",
    ],
    tip: "Eight: slow down enough to ask how they're doing and actually wait for the answer. Two: say directly what you need without wrapping it in a gift.",
  },
  "2-9": {
    insight:
      "The Helper and the Peacemaker share a natural warmth and deep desire for harmony in relationships. Both are giving, easy to be around, and conflict-averse. which creates a gentle, supportive bond, but one that can drift if neither speaks up about what they actually need.",
    strengths: [
      "Mutual generosity, acceptance, and ease with each other",
      "Genuine warmth that creates a nurturing, low-drama environment",
      "Both deeply attentive to others' comfort and wellbeing",
    ],
    edges: [
      "Needs go unspoken. both prioritize the other's comfort to the point of self-erasure",
      "Important decisions get perpetually deferred",
      "Both can become resentful without either having named what went wrong",
    ],
    tip: "Once a week, each of you names one actual preference without immediately qualifying it with 'but whatever you want is fine.'",
  },
  "3-4": {
    insight:
      "The Achiever and the Individualist share their integration lines. each holds what the other is moving toward. The Three wants substance; the Four wants recognition. Together they can create work and love of striking authenticity and quality, when the envy and competition is navigated.",
    strengths: [
      "The Four's depth gives the Three's ambition genuine meaning",
      "The Three's effectiveness helps the Four bring their vision into form",
      "Both are drawn to originality, quality, and doing something that matters",
    ],
    edges: [
      "The Three's focus on image can feel hollow to the Four's depth-seeking",
      "The Four's perceived withdrawal can feel like rejection to the Three's performer",
      "Mutual envy: each secretly wants what the other seems to have",
    ],
    tip: "Take turns asking: 'What are you actually proud of right now?'. and celebrate the answer, not just the achievement behind it.",
  },
  "3-5": {
    insight:
      "The Achiever and the Investigator are a fascinating pairing across triads: one leads with action and image, the other with analysis and withdrawal. Together they can cover remarkable ground, but they'll need to bridge their very different relationships to emotion and visibility.",
    strengths: [
      "Complementary intelligence: Three brings strategy and charisma, Five brings depth and analysis",
      "Both respect competence and will earn each other's admiration",
      "Neither is particularly emotionally demanding. both value space",
    ],
    edges: [
      "The Three's need for recognition baffles the Five's preference for privacy",
      "The Five's withdrawal can feel like rejection to the Three",
      "Both can prioritize their work over each other for long stretches",
    ],
    tip: "Schedule deliberate connection time where neither of you is performing or analyzing. just present with each other.",
  },
  "3-6": {
    insight:
      "The Achiever and the Loyalist both care about credibility and being trusted, but they earn it differently. the Three through success, the Six through reliability. When aligned, this creates an unusually effective and dependable team; under stress, trust becomes fragile.",
    strengths: [
      "Shared investment in being seen as trustworthy and capable",
      "The Three's confidence steadies the Six's anxiety; the Six's loyalty grounds the Three",
      "Both value commitment and follow-through",
    ],
    edges: [
      "The Six questions the Three's image management and can see through performances",
      "The Three can find the Six's doubt and caution exhausting",
      "Trust cracks when either one feels like the other is performing rather than being real",
    ],
    tip: "Three: let the Six see you fail or doubt. it builds more trust than any success. Six: let the Three's confidence expand your sense of what's possible.",
  },
  "3-7": {
    insight:
      "The Achiever and the Enthusiast are both high-energy, positive, and forward-moving. Together they create an exciting, generative partnership. and also one that can avoid stillness, depth, and difficulty at impressive speed.",
    strengths: [
      "Infectious energy, enthusiasm, and mutual encouragement",
      "Both are adaptable, social, and skilled at making things happen",
      "Each amplifies the other's confidence and momentum",
    ],
    edges: [
      "Both can avoid slowing down for real emotional connection",
      "The Three's image-consciousness can constrain the Seven's wild spontaneity",
      "Neither wants to be the one who names what isn't working",
    ],
    tip: "Build in one 'real talk' conversation per week. no brainstorming, no planning, just honest check-in on how you each actually are.",
  },
  "4-6": {
    insight:
      "The Individualist and the Loyalist both live with a heightened sense of what could go wrong or what might be missing. for different reasons. The Four grieves what isn't there; the Six worries about what might come. Together they can create unusual depth and security, when both feel safe enough to trust.",
    strengths: [
      "Both are emotionally honest and capable of genuine vulnerability",
      "The Six's loyalty creates the safety the Four needs to be fully themselves",
      "The Four's depth gives the Six's loyalty a worthy home",
    ],
    edges: [
      "Shared emotional intensity can create a volatile environment",
      "The Four's need for uniqueness can feel like instability to the Six",
      "The Six's anxiety about the relationship can feel like a lack of trust to the Four",
    ],
    tip: "Name your actual fear beneath the reaction. 'I'm scared you'll leave' is more connective than 'you never understand me.'",
  },
  "4-5": {
    insight:
      "The Individualist and the Investigator both live in rich, complex inner worlds and share a depth that most relationships never reach. The Four reaches toward connection; the Five retreats from it. This difference is the central tension and the central gift of this pairing.",
    strengths: [
      "Mutual appreciation for depth, complexity, and authentic inner life",
      "The Five's framework gives the Four's feeling a shape",
      "The Four's meaning gives the Five's knowledge a soul",
    ],
    edges: [
      "The Four's emotional reach overwhelms the Five's energetic limits",
      "The Five's withdrawal devastates the Four's sense of being wanted",
      "Both may feel perpetually misunderstood, just in different ways",
    ],
    tip: "Four: 'I need you present' lands better than 'you don't care.' Five: showing up briefly and fully is worth more than long, depleting sessions.",
  },
  "4-9": {
    insight:
      "The Individualist and the Peacemaker create a sanctuary of unusual acceptance. The Four brings depth and authenticity; the Nine brings warmth and non-judgment. Together they offer each other what they most need. to be seen without being fixed.",
    strengths: [
      "The Nine's acceptance gives the Four rare permission to simply be",
      "The Four's depth helps the Nine access their own buried emotions",
      "A genuinely non-competitive, deeply accepting relational space",
    ],
    edges: [
      "The Nine's conflict avoidance leaves the Four's intensity unmet",
      "The Four may feel the Nine never truly takes a stand",
      "Both can drift. the Nine through inertia, the Four through longing",
    ],
    tip: "Nine: name one strong preference this week without softening it. Four: receive the Nine's acceptance as its own form of depth, not a lack of engagement.",
  },
  "5-7": {
    insight:
      "The Investigator and the Enthusiast both live in their minds but in very different ways. the Five contracts and deepens, the Seven expands and multiplies. They fascinate each other, and they frustrate each other in almost equal measure.",
    strengths: [
      "Shared love of ideas, curiosity, and mental stimulation",
      "The Seven's energy can draw the Five out into the world",
      "The Five's depth can give the Seven's curiosity real grounding",
    ],
    edges: [
      "The Seven's constant generation of options overwhelms the Five's need to consolidate",
      "The Five's withdrawal into silence can feel like abandonment to the Seven",
      "Different paces: Seven moves fast; Five moves carefully",
    ],
    tip: "Meet in the middle: Seven, slow down for one deep conversation. Five, say yes to one adventure without having analyzed it first.",
  },
  "5-8": {
    insight:
      "The Investigator and the Challenger seem opposite. one retreats, one advances. but both are intensely autonomous, dislike dependency, and will fight fiercely to protect their own territory. When they respect each other, few relationships are more honest.",
    strengths: [
      "Mutual respect for competence, independence, and directness",
      "Neither needs the other to be softer than they are",
      "Deep trust when it's earned. and both know how to earn it",
    ],
    edges: [
      "Both can be dismissive of emotional needs. their own and each other's",
      "The Eight's intensity can overwhelm the Five's carefully managed resources",
      "Power struggles over control and information can harden into walls",
    ],
    tip: "Five: share one piece of your thinking out loud before it's finished. the Eight will feel more included. Eight: ask questions before drawing conclusions.",
  },
  "5-9": {
    insight:
      "The Investigator and the Peacemaker share a quiet depth and an appreciation for spacious, unpressured companionship. Both are comfortable with silence, with solitude-in-togetherness, and with letting things unfold rather than forcing them.",
    strengths: [
      "Mutual appreciation for space, calm, and unforced presence",
      "Rare freedom from drama. neither generates it, neither needs it",
      "The Nine's acceptance invites the Five to venture out; the Five's depth gives the Nine something to engage with",
    ],
    edges: [
      "Important things can go permanently unspoken between two avoiders",
      "Inertia can settle in. neither pushes toward growth or change",
      "Both can merge with their inner world and lose sight of the relationship itself",
    ],
    tip: "Choose one thing each month that neither of you would choose alone. and actually do it.",
  },
  "6-7": {
    insight:
      "The Loyalist and the Enthusiast share an integration line. the Six moves toward Seven in health. The Seven's optimism and the Six's carefulness are a natural counterbalance: together, they can plan for challenges without letting fear stop them from living fully.",
    strengths: [
      "The Seven's confidence steadies the Six's anxiety beautifully",
      "The Six's groundedness gives the Seven's adventures a safe base to return to",
      "Both deeply loyal once trust is established",
    ],
    edges: [
      "The Seven's avoidance of difficulty frustrates the Six's need to plan for it",
      "The Six's worry can dampen the Seven's enthusiasm and generate the very conflict the Seven is trying to avoid",
      "Different risk tolerances can make decisions a source of ongoing friction",
    ],
    tip: "Name your anxiety as anxiety, not as evidence. and name the adventure as adventure, not as avoidance.",
  },
  "6-8": {
    insight:
      "The Loyalist and the Challenger share a fierce protectiveness and a radar for inauthenticity. Both value loyalty above almost everything. When trust is established, this is one of the most rock-solid bonds on the Enneagram. when it's broken, the fallout is severe.",
    strengths: [
      "Fierce mutual loyalty once trust is established",
      "Both protect the people they love with great intensity",
      "Direct communication. neither likes pretense",
    ],
    edges: [
      "The Eight's force can trigger the Six's anxiety into either flight or counter-aggression",
      "The Six's testing of loyalty can feel exhausting or insulting to the Eight",
      "Both can become adversarial when they should be collaborating",
    ],
    tip: "Eight: earn trust by being consistent, not just powerful. Six: let the Eight's directness be care, not threat, until proven otherwise.",
  },
  "6-9": {
    insight:
      "The Loyalist and the Peacemaker share a profound desire for safety, stability, and belonging. Together they often create extraordinarily warm, reliable homes and communities. The shadow is that neither is naturally growth-oriented, and comfort can turn into stagnation.",
    strengths: [
      "Shared warmth, reliability, and genuine investment in others",
      "Both create a sense of safety and groundedness that attracts others",
      "Mutual acceptance. neither one judges the other harshly",
    ],
    edges: [
      "Neither tends to initiate growth, change, or difficult conversations",
      "The Six's anxiety and the Nine's avoidance can reinforce each other",
      "Important things can be perpetually deferred in the name of keeping peace",
    ],
    tip: "Take turns being the one who names a thing that needs addressing. and commit to staying with it rather than smoothing it over.",
  },
  "7-8": {
    insight:
      "The Enthusiast and the Challenger are both bold, high-energy, and unwilling to be constrained. Together they create a relationship of remarkable vitality and freedom. and one where restraint, depth, and emotional safety may need to be consciously cultivated.",
    strengths: [
      "Shared love of boldness, directness, and not wasting time",
      "Both push each other toward more of everything. bigger, bolder, freer",
      "A mutual appreciation for living fully and refusing diminishment",
    ],
    edges: [
      "Neither is naturally inclined toward yielding, vulnerability, or slowing down",
      "The Eight's dominance and the Seven's independence can create a power struggle dressed as adventure",
      "Tenderness can feel threatening to both. depth is easier to avoid than to cultivate",
    ],
    tip: "Challenge each other to one act of deliberate vulnerability per week. and hold each other to it.",
  },
  "7-9": {
    insight:
      "The Enthusiast and the Peacemaker both avoid pain, but in different ways. the Seven sprints past it toward the next good thing, the Nine merges away from it into comfortable numbness. Together they create a warm, easy-going relationship that may need a deliberate push toward reality.",
    strengths: [
      "Genuinely easy, low-conflict, and joyful together",
      "The Seven's energy activates the Nine; the Nine's calm grounds the Seven",
      "Shared generosity and warmth make them delightful company",
    ],
    edges: [
      "Both avoid discomfort. real problems can go perpetually unaddressed",
      "The Seven's pace can overwhelm the Nine's need for groundedness",
      "Neither is naturally inclined to push into difficulty, which is required for growth",
    ],
    tip: "Name one hard truth. each of you. in your next conversation. Not to fix anything, just to practice saying what's real.",
  },
  "8-9": {
    insight:
      "The Challenger and the Peacemaker are wing neighbors and natural complements. one moves outward with force, the other stays still with acceptance. Together they can create a relationship of unusual completeness: the Eight's strength protects the Nine's softness, and the Nine's calm is the one thing that can truly reach the Eight.",
    strengths: [
      "The Nine is often the only person who doesn't need the Eight to be smaller",
      "The Eight gives the Nine's gentle nature genuine protection and strength",
      "Complementary energies create a remarkably balanced dynamic",
    ],
    edges: [
      "The Eight's force can cause the Nine to go underground rather than engage",
      "The Nine's conflict avoidance leaves the Eight feeling like they're fighting alone",
      "The Nine can disappear emotionally while remaining physically present. and the Eight may not notice until it's late",
    ],
    tip: "Eight: lower your voice a notch and ask what the Nine actually thinks. not what's fine, what they actually think. Nine: say it even if the Eight seems to already have decided.",
  },
};

// ─── Fallback Generator ───────────────────────────────────────────────────────

function generateFallback(a: number, b: number): CompatibilityData {
  const triadA = getTriad(a);
  const triadB = getTriad(b);
  const nameA = TYPE_NAMES[a];
  const nameB = TYPE_NAMES[b];

  const sameTriad = triadA === triadB;

  const triadDescriptions: Record<string, string> = {
    Gut: "instinctual, body-based wisdom. they act first and process later",
    Heart: "emotional intelligence and relational attunement. they feel first",
    Head: "mental clarity and strategy. they think and plan before acting",
  };

  const sameTriadInsight = `${nameA} and ${nameB} both operate from the ${triadA} center. ${triadDescriptions[triadA]}. This creates natural kinship and mutual understanding of each other's core drives, though your shared blind spots may need a third perspective to illuminate.`;

  const crossTriadInsight = `${nameA} operates from the ${triadA} center (${triadDescriptions[triadA]}), while ${nameB} operates from the ${triadB} center (${triadDescriptions[triadB]}). This difference is one of the richest sources of both complementarity and misunderstanding between you.`;

  return {
    insight: sameTriad ? sameTriadInsight : crossTriadInsight,
    strengths: sameTriad
      ? [
          `Both process experience through the same center, creating deep mutual recognition`,
          `Shared instincts mean you often know what the other needs without words`,
          `Your similarities create a safe foundation for genuine honesty`,
        ]
      : [
          `Your different centers offer each other perspectives that feel genuinely foreign. and genuinely valuable`,
          `${nameA}'s ${triadA.toLowerCase()} wisdom balances ${nameB}'s ${triadB.toLowerCase()} approach`,
          `Cross-triad pairings often accelerate growth by making each person's blind spots visible`,
        ],
    edges: sameTriad
      ? [
          `Shared patterns can amplify. especially the defensive ones`,
          `Both may avoid the same territory, which means no one maps it`,
          `Without differences to create friction, growth requires more deliberate intention`,
        ]
      : [
          `Each may find the other's approach to problems genuinely puzzling or frustrating`,
          `What feels obvious to one can feel alien to the other`,
          `Under stress, your different centers drive you in opposite directions`,
        ],
    tip: sameTriad
      ? `Actively seek out perspectives from the other two centers. a friend, a book, a conversation. to develop your shared blind spots.`
      : `When you feel most misunderstood, name which center you're operating from: 'I'm reacting from my ${triadA.toLowerCase()} right now.' It builds the bridge.`,
  };
}

function getCompatibilityData(a: number, b: number): CompatibilityData {
  const key = pairKey(a, b);
  return COMPATIBILITY_MATRIX[key] || generateFallback(a, b);
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function CompatibilityPage() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const [myType, setMyType] = useState<number | null>(null);
  const [friendType, setFriendType] = useState<number | null>(null);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tokenAwarded, setTokenAwarded] = useState(false);
  const [showTokenBadge, setShowTokenBadge] = useState(false);

  // Load user's type from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        if (profile?.enneagramType) {
          setMyType(Number(profile.enneagramType));
        }
      }
    } catch {
      // silently ignore
    }
  }, []);

  const compatibility = myType && friendType ? getCompatibilityData(myType, friendType) : null;

  // Award 10 tokens once per day on share
  const awardShareTokens = useCallback(() => {
    try {
      const today = new Intl.DateTimeFormat("en-CA").format(new Date());
      const storageKey = `psyche-last-compat-share-${today}`;
      if (localStorage.getItem(storageKey)) return; // already awarded today

      const raw = localStorage.getItem("psyche-game-state");
      const state = raw ? JSON.parse(raw) : {};
      state.tokens = (state.tokens ?? 0) + 10;
      state.totalTokensEarned = (state.totalTokensEarned ?? 0) + 10;
      localStorage.setItem("psyche-game-state", JSON.stringify(state));
      localStorage.setItem(storageKey, "1");
      setTokenAwarded(true);
      setShowTokenBadge(true);
      setTimeout(() => { if (mountedRef.current) setShowTokenBadge(false); }, 3000);
    } catch {
      // silently ignore
    }
  }, []);

  const handleShare = useCallback(async () => {
    if (!cardRef.current || !myType || !friendType) return;
    setSharing(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const blob = await fetch(dataUrl).then((r) => r.blob());
      const file = new File([blob], "thyself-compatibility.png", { type: "image/png" });

      const shareData: ShareData & { files?: File[] } = {
        title: `Type ${myType} + Type ${friendType} Compatibility`,
        text: `I compared my Enneagram type with a friend on Thyself! Find your type free at thyself.app`,
        files: [file],
      };

      let shared = false;
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        shared = true; // resolved = OS-confirmed share
      } else if (navigator.share) {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: "https://thyself.app",
        });
        shared = true;
      } else {
        // Download fallback (no share API, so no verification possible)
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "thyself-compatibility.png";
        a.click();
      }

      // Only award tokens when navigator.share() actually resolved
      if (shared) awardShareTokens();
    } catch (err: unknown) {
      const isAbort = err instanceof Error && err.name === "AbortError";
      // AbortError = user cancelled share sheet. No tokens.
      if (!isAbort) {
        try {
          const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "thyself-compatibility.png";
          a.click();
          // Download fallback, no token award (unverified);
        } catch {
          // give up silently
        }
      }
    } finally {
      setSharing(false);
    }
  }, [myType, friendType, awardShareTokens]);

  const handleCopyInvite = useCallback(async () => {
    try {
      const referralCode = localStorage.getItem("psyche-my-referral-code");
      const url = referralCode
        ? `${getReferralShareUrl()}`
        : "https://thyself.app";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => { if (mountedRef.current) setCopied(false); }, 2000);
    } catch {
      // silently ignore
    }
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "#0f0a1e" }}
    >
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 pt-safe-top" style={{ background: "#0f0a1e" }}>
        <div className="max-w-lg mx-auto flex items-center gap-3 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "rgba(255,255,255,0.7)" }} />
          </button>
          <div>
            <h1 className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
              Compare with a Friend
            </h1>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Enneagram compatibility
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 pb-24 max-w-lg mx-auto w-full space-y-6 pt-2">

        {/* Your type pill */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-medium mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
            YOUR TYPE
          </p>
          {myType ? (
            <div className="flex items-center gap-3">
              <TypeBadge type={myType} size="lg" />
              <div>
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                  Type {myType}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {TYPE_NAMES[myType]}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              No type found. complete an assessment first.
            </p>
          )}
        </div>

        {/* Friend type selector */}
        <div>
          <p className="text-xs font-medium mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
            YOUR FRIEND'S TYPE
          </p>
          <div className="grid grid-cols-9 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => (
              <button
                key={t}
                onClick={() => setFriendType(friendType === t ? null : t)}
                className="flex flex-col items-center gap-1 rounded-xl py-2 transition-all"
                style={{
                  background:
                    friendType === t
                      ? `${TYPE_COLORS[t]}22`
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${friendType === t ? TYPE_COLORS[t] + "88" : "rgba(255,255,255,0.08)"}`,
                  transform: friendType === t ? "scale(1.05)" : "scale(1)",
                }}
                aria-label={`Select type ${t}. ${TYPE_NAMES[t]}`}
                aria-pressed={friendType === t}
              >
                <span
                  className="text-sm font-bold leading-none"
                  style={{ color: friendType === t ? TYPE_COLORS[t] : "rgba(255,255,255,0.6)" }}
                >
                  {t}
                </span>
              </button>
            ))}
          </div>
          {friendType && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: `${TYPE_COLORS[friendType]}11`,
                border: `1px solid ${TYPE_COLORS[friendType]}33`,
              }}
            >
              <TypeBadge type={friendType} size="sm" />
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                {TYPE_NAMES[friendType]}
              </span>
            </motion.div>
          )}
        </div>

        {/* Compatibility analysis */}
        <AnimatePresence>
          {compatibility && myType && friendType && (
            <motion.div
              key={`${myType}-${friendType}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Side-by-side visual */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <TypeBadge type={myType} size="xl" />
                    <p className="text-xs font-medium text-center" style={{ color: "rgba(255,255,255,0.6)" }}>
                      You
                    </p>
                    <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {TYPE_NAMES[myType]}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${TYPE_COLORS[myType]}33, ${TYPE_COLORS[friendType]}33)`,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <Sparkles className="w-3 h-3 inline mr-1 opacity-70" />
                      match
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <TypeBadge type={friendType} size="xl" />
                    <p className="text-xs font-medium text-center" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Friend
                    </p>
                    <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {TYPE_NAMES[friendType]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Insight */}
              <AnalysisCard
                icon={<Sparkles className="w-4 h-4" />}
                title="Compatibility Insight"
                accentColor="#a78bfa"
              >
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {compatibility.insight}
                </p>
              </AnalysisCard>

              {/* Strengths */}
              <AnalysisCard
                icon={<Heart className="w-4 h-4" />}
                title="Strengths Together"
                accentColor="#34d399"
              >
                <ul className="space-y-2">
                  {compatibility.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-snug" style={{ color: "rgba(255,255,255,0.75)" }}>
                      <span className="mt-0.5 shrink-0 text-emerald-400 text-xs">✦</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </AnalysisCard>

              {/* Growth edges */}
              <AnalysisCard
                icon={<Zap className="w-4 h-4" />}
                title="Growth Edges"
                accentColor="#fb923c"
              >
                <ul className="space-y-2">
                  {compatibility.edges.map((e, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-snug" style={{ color: "rgba(255,255,255,0.75)" }}>
                      <span className="mt-0.5 shrink-0 text-orange-400 text-xs">◆</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </AnalysisCard>

              {/* Communication tip */}
              <AnalysisCard
                icon={<MessageCircle className="w-4 h-4" />}
                title="Communication Tip"
                accentColor="#60a5fa"
              >
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {compatibility.tip}
                </p>
              </AnalysisCard>

              {/* Share button */}
              <button
                onClick={handleShare}
                disabled={sharing}
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-sm transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${TYPE_COLORS[myType]}, ${TYPE_COLORS[friendType]})`,
                  color: "#fff",
                  opacity: sharing ? 0.6 : 1,
                }}
              >
                <Share2 className="w-4 h-4" />
                {sharing ? "Creating card…" : "Share this match"}
              </button>

              {/* Token awarded badge */}
              <AnimatePresence>
                {showTokenBadge && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center gap-2 text-xs font-medium"
                    style={{ color: "#facc15" }}
                  >
                    <span>🪙</span>
                    +10 tokens for sharing!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Invite flow */}
              <div
                className="rounded-2xl p-4 flex items-center justify-between gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    Friend hasn't tried Thyself yet?
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Invite them to find their type. it's free
                  </p>
                </div>
                <button
                  onClick={handleCopyInvite}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium shrink-0 transition-all"
                  style={{
                    background: copied ? "rgba(52,211,153,0.15)" : "rgba(139,92,246,0.15)",
                    border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(139,92,246,0.3)"}`,
                    color: copied ? "#34d399" : "#a78bfa",
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      Copy invite
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Off-screen shareable card (9:16) */}
      {myType && friendType && (
        <div
          className="fixed"
          style={{ left: "-9999px", top: 0, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <ShareCard
            ref={cardRef}
            myType={myType}
            friendType={friendType}
            insight={compatibility?.insight ?? ""}
          />
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeBadge({ type, size }: { type: number; size: "sm" | "lg" | "xl" }) {
  const sizeMap = { sm: "w-7 h-7 text-sm", lg: "w-10 h-10 text-base", xl: "w-14 h-14 text-xl" };
  return (
    <div
      className={`${sizeMap[size]} rounded-2xl flex items-center justify-center font-bold text-white`}
      style={{ background: TYPE_COLORS[type] }}
    >
      {type}
    </div>
  );
}

function AnalysisCard({
  icon,
  title,
  accentColor,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: accentColor }}>{icon}</span>
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

// ─── Shareable Card (9:16) ────────────────────────────────────────────────────

import React from "react";

const ShareCard = React.forwardRef<
  HTMLDivElement,
  { myType: number; friendType: number; insight: string }
>(function ShareCardInner({ myType, friendType, insight }, ref) {
  const colorA = TYPE_COLORS[myType];
  const colorB = TYPE_COLORS[friendType];
  const nameA = TYPE_NAMES[myType];
  const nameB = TYPE_NAMES[friendType];

  // Truncate insight for card
  const shortInsight = insight.length > 180 ? insight.slice(0, 177) + "…" : insight;

  const [imgAError, setImgAError] = React.useState(false);
  const [imgBError, setImgBError] = React.useState(false);

  return (
    <div
      ref={ref}
      style={{
        width: 360,
        height: 640,
        background: "#0f0a1e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "32px 24px 24px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background gradient blobs */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: colorA,
          opacity: 0.12,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: colorB,
          opacity: 0.12,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Top label */}
      <div style={{ textAlign: "center", width: "100%" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 6,
          }}
        >
          Enneagram Compatibility
        </p>
      </div>

      {/* Types side by side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          width: "100%",
        }}
      >
        <TypeCardColumn
          type={myType}
          name={nameA}
          color={colorA}
          label="You"
          showSprite={!imgAError}
          onImgError={() => setImgAError(true)}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${colorA}55, ${colorB}55)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            ✦
          </div>
        </div>

        <TypeCardColumn
          type={friendType}
          name={nameB}
          color={colorB}
          label="Friend"
          showSprite={!imgBError}
          onImgError={() => setImgBError(true)}
        />
      </div>

      {/* Insight */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: "16px 18px",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 8,
          }}
        >
          Key Insight
        </p>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {shortInsight}
        </p>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>
          Discover your Enneagram type. free
        </p>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colorA}, ${colorB})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          thyself.app
        </p>
      </div>
    </div>
  );
});

function TypeCardColumn({
  type,
  name,
  color,
  label,
  showSprite,
  onImgError,
}: {
  type: number;
  name: string;
  color: string;
  label: string;
  showSprite: boolean;
  onImgError: () => void;
}) {
  const spriteSrc = assetPath(`/sprites/chibi/${type}-sp${type}.png`) + "?v=2";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        flex: 1,
      }}
    >
      {/* Sprite or fallback circle */}
      {showSprite ? (
        <img
          src={spriteSrc}
          alt={`Type ${type} chibi`}
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
          onError={onImgError}
        />
      ) : (
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `${color}22`,
            border: `2px solid ${color}66`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 800,
            color,
          }}
        >
          {type}
        </div>
      )}

      {/* Type number large */}
      <div
        style={{
          fontSize: 40,
          fontWeight: 900,
          color,
          lineHeight: 1,
        }}
      >
        {type}
      </div>

      {/* Type name */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(255,255,255,0.65)",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {name}
      </div>

      {/* Label badge */}
      <div
        style={{
          fontSize: 10,
          padding: "2px 8px",
          borderRadius: 20,
          background: `${color}22`,
          color: color,
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
    </div>
  );
}
