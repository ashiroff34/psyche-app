import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const BASE = "https://thyself.app";

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

const ENNEAGRAM_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type MBTIType = (typeof MBTI_TYPES)[number];
type EnneagramType = (typeof ENNEAGRAM_TYPES)[number];

// ── Cognitive function stacks ─────────────────────────────────────────────────
const COGNITIVE_STACKS: Record<MBTIType, [string, string, string, string]> = {
  INTJ: ["Ni", "Te", "Fi", "Se"],
  INTP: ["Ti", "Ne", "Si", "Fe"],
  ENTJ: ["Te", "Ni", "Se", "Fi"],
  ENTP: ["Ne", "Ti", "Fe", "Si"],
  INFJ: ["Ni", "Fe", "Ti", "Se"],
  INFP: ["Fi", "Ne", "Si", "Te"],
  ENFJ: ["Fe", "Ni", "Se", "Ti"],
  ENFP: ["Ne", "Fi", "Te", "Si"],
  ISTJ: ["Si", "Te", "Fi", "Ne"],
  ISFJ: ["Si", "Fe", "Ti", "Ne"],
  ESTJ: ["Te", "Si", "Ne", "Fi"],
  ESFJ: ["Fe", "Si", "Ne", "Ti"],
  ISTP: ["Ti", "Se", "Ni", "Fe"],
  ISFP: ["Fi", "Se", "Ni", "Te"],
  ESTP: ["Se", "Ti", "Fe", "Ni"],
  ESFP: ["Se", "Fi", "Te", "Ni"],
};

// ── MBTI display names ────────────────────────────────────────────────────────
const MBTI_NAMES: Record<MBTIType, string> = {
  INTJ: "The Architect",
  INTP: "The Logician",
  ENTJ: "The Commander",
  ENTP: "The Debater",
  INFJ: "The Counselor",
  INFP: "The Mediator",
  ENFJ: "The Protagonist",
  ENFP: "The Campaigner",
  ISTJ: "The Inspector",
  ISFJ: "The Defender",
  ESTJ: "The Executive",
  ESFJ: "The Consul",
  ISTP: "The Virtuoso",
  ISFP: "The Adventurer",
  ESTP: "The Entrepreneur",
  ESFP: "The Entertainer",
};

// ── MBTI brand colors (not TYPE_COLORS, which is Enneagram-only) ──────────────
const MBTI_COLORS: Record<MBTIType, string> = {
  INTJ: "#1a1a2e",
  INTP: "#16213e",
  ENTJ: "#0f3460",
  ENTP: "#1b4f72",
  INFJ: "#4a235a",
  INFP: "#6c3483",
  ENFJ: "#7d3c98",
  ENFP: "#9b59b6",
  ISTJ: "#1b2631",
  ISFJ: "#154360",
  ESTJ: "#1a5276",
  ESFJ: "#1f618d",
  ISTP: "#145a32",
  ISFP: "#1e8449",
  ESTP: "#784212",
  ESFP: "#935116",
};

// ── Function full names ───────────────────────────────────────────────────────
const FUNCTION_NAMES: Record<string, string> = {
  Ni: "Introverted Intuition",
  Ne: "Extraverted Intuition",
  Si: "Introverted Sensing",
  Se: "Extraverted Sensing",
  Ti: "Introverted Thinking",
  Te: "Extraverted Thinking",
  Fi: "Introverted Feeling",
  Fe: "Extraverted Feeling",
};

// ── Cognitive function brief descriptions ────────────────────────────────────
const FUNCTION_BRIEF: Record<string, string> = {
  Ni: "synthesizes patterns into a singular inner vision of how things will unfold",
  Ne: "generates possibilities and connections across domains simultaneously",
  Si: "anchors decisions in lived experience and proven methods",
  Se: "engages directly with the immediate sensory environment",
  Ti: "builds precise internal frameworks and tests ideas for logical consistency",
  Te: "organizes the external world toward measurable outcomes",
  Fi: "navigates by deep personal values and authentic inner feeling",
  Fe: "reads group emotional dynamics and builds relational harmony",
};

// ── Per-combination content ──────────────────────────────────────────────────
// Each returns structured data for the page sections.
// Rather than a massive switch, we compute from the types' intrinsic properties.

interface CombinationContent {
  opening: string;
  howMbtiShapes: string;
  corePattern: string;
  mistypeWarning: string;
  growthPath: string;
}

// Enneagram triad groupings (used in content generation)
const HEART_TYPES = [2, 3, 4];
const HEAD_TYPES = [5, 6, 7];
const BODY_TYPES = [1, 8, 9];

function getTriad(t: EnneagramType): string {
  if (HEART_TYPES.includes(t)) return "heart";
  if (HEAD_TYPES.includes(t)) return "head";
  return "body";
}

// Dominant function category
function getDominantCategory(mbti: MBTIType): "feeling" | "thinking" | "intuition" | "sensing" {
  const dom = COGNITIVE_STACKS[mbti][0];
  if (dom === "Fi" || dom === "Fe") return "feeling";
  if (dom === "Ti" || dom === "Te") return "thinking";
  if (dom === "Ni" || dom === "Ne") return "intuition";
  return "sensing";
}

function generateContent(mbti: MBTIType, ennType: EnneagramType): CombinationContent {
  const stack = COGNITIVE_STACKS[mbti];
  const dom = stack[0];
  const aux = stack[1];
  const domFull = FUNCTION_NAMES[dom];
  const auxFull = FUNCTION_NAMES[aux];
  const mbtiName = MBTI_NAMES[mbti];
  const ennName = TYPE_NAMES[ennType];
  const triad = getTriad(ennType);
  const domCat = getDominantCategory(mbti);

  // Opening: synthesize cognitive approach with Enneagram motivation
  const triadMotivationMap: Record<string, string> = {
    heart: `a deep need for identity, connection, and being seen as valuable`,
    head: `an orientation toward safety, certainty, or expansive possibility`,
    body: `an instinctive drive related to autonomy, integrity, or rightness in the world`,
  };

  const opening = `The ${mbti} ${ennName} occupies a distinctive psychological position — one where ${mbtiName}'s characteristic mode of processing, led by ${domFull} (${dom}), meets ${ennName}'s ${triadMotivationMap[triad]}. This is not simply a layered combination; the two frameworks interact. The ${mbti} cognitive architecture shapes how the ${ennName} motivation is expressed outwardly, while the Enneagram drive shapes what the ${mbti} is oriented toward at depth. Understanding this combination means reading both frameworks simultaneously rather than treating them as independent profiles stacked on top of each other.`;

  // How MBTI shapes the Enneagram type
  const resonanceMap: Record<string, Record<number, string>> = {
    intuition: {
      1: `${domFull} amplifies the One's reforming drive by projecting it into the future — this ${mbti} doesn't just want things corrected now; they hold a comprehensive vision of how things should be. The inner critic becomes filtered through ${dom}'s lens of long-range pattern recognition, making them especially attuned to systemic failures rather than surface-level imprecision.`,
      2: `${domFull} gives the Two's helping instinct a depth that goes beyond immediate caregiving. This ${mbti} senses what people need at a layer below what is consciously expressed. Their giving is often preemptive, anticipating emotional states others haven't yet articulated, which can feel uncanny to recipients and burdensome to the ${mbti} themselves.`,
      3: `${domFull} channels the Three's achievement drive toward ambitious future visions. This ${mbti} doesn't simply want to succeed at the task in front of them — they want to build toward something that hasn't existed yet. Image consciousness is filtered through long-arc strategic thinking, which makes them highly effective but also capable of losing contact with present-moment authenticity.`,
      4: `${domFull} deepens the Four's characteristic longing into something that feels almost prophetic. This ${mbti} experiences their distinctiveness not just as emotional identity but as a singular inner vision of what could be — and a private grief that the world rarely meets them there. The sense of being "other" is experienced as structural, not just emotional.`,
      5: `${domFull} reinforces the Five's investigative drive, but turns it inward rather than outward. Where some Fives gather data exhaustively from the external world, this ${mbti} synthesizes patterns into unified theoretical frameworks. They are less interested in accumulating facts than in arriving at the compressed insight that makes the facts cohere.`,
      6: `${domFull} means this Six doesn't simply scan for threats — they construct elaborate future scenarios of what could go wrong and pre-emptively plan for each. The ${dom} capacity for pattern synthesis makes their vigilance sophisticated rather than reactive, but it also makes catastrophizing more compelling because the threats they imagine feel internally consistent and real.`,
      7: `${domFull} gives the Seven's optimism a visionary quality. Where surface-level Sevens chase immediate experience, this ${mbti} is drawn toward future possibilities that feel genuinely transformative. The fear of limitation is experienced not as boredom but as a kind of existential urgency — a sense that there is something just over the horizon that must be reached before it disappears.`,
      8: `${domFull} gives the Eight's forceful drive a strategic depth. This ${mbti} doesn't simply exert power through direct confrontation; they read the long-range dynamics of a situation and position themselves accordingly. Control is not about dominance in the moment but about securing conditions that guarantee autonomy into the future.`,
      9: `${domFull} and the Nine's natural merging tendency create an unusually deep pattern-awareness. This ${mbti} can track the underlying dynamics of complex situations with quiet precision while appearing disengaged on the surface. The risk is that ${dom}'s tendency to synthesize inward can reinforce the Nine's habit of living in an inner world that remains largely unexpressed.`,
    },
    feeling: {
      1: `${domFull} brings an intensely interpersonal quality to the One's principled drive. Standards are not merely abstract — this ${mbti} feels the wrongness of ethical violations in their body and relationships. They are attuned to the emotional cost of imperfection in a way purely thinking-dominant Ones may not be, which can make them warmer but also more personally wounded when people fall short.`,
      2: `${domFull} is directly aligned with the Two's core strategy: reading others' emotional states and responding with care. For this ${mbti}, helping isn't an effort — it is the path of least resistance, the most natural expression of awareness. The challenge is that ${dom} can blur the boundary between attunement and self-erasure, making it difficult to locate where the Two ends and the other person begins.`,
      3: `${domFull} gives the Three's achievement drive a relational dimension. This ${mbti} wants to succeed in ways that others recognize and value — not from vanity alone, but from a genuine orientation toward communal approval that ${dom} makes salient at every moment. They are often excellent at reading what an audience wants and calibrating their performance accordingly, sometimes at the cost of knowing what they themselves actually want.`,
      4: `${domFull} deepens the Four's emotional authenticity into something that organizes their entire identity. This ${mbti} doesn't just feel intensely — they experience emotion as the most reliable compass for understanding who they are. The risk is that ${dom}'s sensitivity can amplify the Four's characteristic longing and sense of deficiency, making the emotional inner world feel too real to leave.`,
      5: `${domFull} creates a notable tension in this Five. The Five's characteristic withdrawal from emotional engagement runs directly against ${dom}'s natural orientation toward relational harmony and others' emotional states. This ${mbti} often experiences their Five-ness as a pull away from the very thing their cognitive wiring makes them sensitive to — a private conflict between the desire to engage and the instinct to retreat.`,
      6: `${domFull} gives the Six's loyalty-seeking an interpersonal warmth that can mask the underlying anxiety. This ${mbti} builds alliances through genuine attentiveness and care, which makes their relationships feel secure even when their inner world remains alert to threat. The risk is that ${dom} can make them overly sensitive to shifts in the emotional tenor of their alliances, reading abandonment in ordinary distance.`,
      7: `${domFull} gives the Seven's enthusiasm a social infectiousness. This ${mbti} doesn't just seek experience for themselves — they want to generate positive emotional states in the people around them. The avoidance of pain is often expressed through relentless cheerfulness and social engagement, which can make the underlying anxiety very difficult to locate.`,
      8: `${domFull} creates a distinctive version of the Eight: someone whose directness is wrapped in interpersonal awareness. This ${mbti} reads group dynamics precisely and uses that awareness to consolidate power and protect those they care about. The combination can produce genuine leadership warmth, but also a capacity for calculated emotional influence that can unsettle people who experience it up close.`,
      9: `${domFull} and the Nine's accommodating orientation produce a person who can sense what others need and quietly shape themselves to it — often without realizing they have done so. This ${mbti} is highly agreeable and relationally skilled, but the Nine's inertia means they may spend years harmonizing with others' emotional worlds while their own desires remain undefined.`,
    },
    thinking: {
      1: `${domFull} gives the One's principled drive an analytical precision. This ${mbti} is less concerned with the emotional texture of what's wrong and more concerned with identifying the precise logical error or structural failure. They make rigorous critics and systematic reformers, but can seem cold or impersonal to those who expected warmth alongside the correction.`,
      2: `${domFull} gives this Two an unusual quality: they help through competence rather than warmth alone. They assess what is needed, build a solution, and deliver it efficiently. This makes them highly effective helpers in practical domains, but it can create a subtle disconnect — the Two's emotional need to feel appreciated doesn't always match the impersonal logic of ${dom}.`,
      3: `${domFull} aligns naturally with the Three's drive for competence and measurable achievement. This ${mbti} defines success through precise criteria — goals are quantified, progress is tracked, results are assessed against clear standards. Their ambition has a rigorous internal structure that is hard to argue with, which makes them effective but occasionally inflexible about what counts as success.`,
      4: `${domFull} gives the Four's inner life an analytical edge. Where many Fours swim in emotion, this ${mbti} tends to examine their feeling states with critical precision — sometimes to the point of feeling alienated from the emotion itself. The interior monologue is organized rather than impressionistic, which produces distinctive creative and intellectual outputs but can make raw emotional intimacy feel difficult.`,
      5: `${domFull} is deeply consonant with the Five's investigative drive. This ${mbti} is one of the most analytically rigorous of all type combinations — constructing precise internal frameworks that they test exhaustively before accepting. They are capable of sustained, focused intellectual work that produces genuine insight, but the risk of living entirely inside the framework rather than testing it against lived experience is real.`,
      6: `${domFull} gives the Six's anxiety a structured form. Rather than simply feeling afraid, this ${mbti} builds detailed logical threat models and works through each one methodically. The vigilance is systematic, which makes it feel productive rather than distressing — but it can also become a form of intellectual compulsion that circles back rather than arriving at resolution.`,
      7: `${domFull} gives the Seven's expansiveness an intellectual structure. This ${mbti} doesn't just chase experiences — they build conceptual frameworks for understanding them, developing theories that connect their wide range of interests into coherent systems. The risk is that the system-building becomes another form of escape: the pleasure of theorizing substitutes for the harder work of commitment.`,
      8: `${domFull} gives the Eight's drive for control a logical armature. Power is not simply asserted — it is justified through clear reasoning that the ${mbti} finds genuinely compelling. This combination is highly strategic, capable of seeing through social performance to underlying structure. The risk is that the certainty of ${dom}'s frameworks can make the Eight's natural conviction feel unassailable to themselves, even when it is wrong.`,
      9: `${domFull} and the Nine's natural disengagement can produce a person who reasons clearly about everything except their own desire. This ${mbti} is often perceptive and analytically adept in external domains while remaining curiously ambivalent about what they personally want or care about. The thinking function provides excellent cover for the Nine's avoidance of self-assertion.`,
    },
    sensing: {
      1: `${domFull} grounds the One's principled drive in concrete, present-moment details. This ${mbti} notices imprecision at the level of execution — the misspelled word, the misaligned object, the deviation from established procedure. Their standards are not abstract ideals but specific, observable criteria, which makes their feedback extremely precise but sometimes difficult to satisfy without explicit instruction.`,
      2: `${domFull} makes this Two's helping instinct immediate and practical. They notice what is needed right now — in this room, with these people — and respond with direct action rather than long-term planning. Their care is tangible and present-focused, which others often experience as a welcome concreteness compared to more abstract forms of support.`,
      3: `${domFull} gives the Three's achievement drive a hands-on quality. This ${mbti} is less focused on abstract status and more engaged with mastering the concrete skills and procedures that produce measurable results. They often excel through genuine competence in a specific domain, and their success is tied to the observable quality of what they produce rather than to image alone.`,
      4: `${domFull} grounds the Four's characteristic longing in immediate aesthetic and sensory experience. This ${mbti} is drawn to beauty that can be touched, seen, tasted, and lived in — the feeling of a room, the quality of a fabric, the precise moment when light changes. Their distinctiveness is expressed through refined sensory taste rather than abstract identity claims.`,
      5: `${domFull} gives the Five's investigative drive a practical, hands-on orientation. Where some Fives theorize, this ${mbti} prefers to understand by engaging directly with physical systems — taking things apart, building things, testing through experience. Their knowledge is grounded in what they have personally encountered and verified.`,
      6: `${domFull} gives the Six's vigilance a concrete form. Threats are not abstract future scenarios but specific present-moment indicators — the tone of voice that doesn't match the words, the procedure that wasn't followed correctly, the exit that wasn't confirmed. This ${mbti}'s alertness is tied to observable detail, which makes their security-seeking precise and practically effective.`,
      7: `${domFull} gives the Seven's enthusiasm a sensory vividness. This ${mbti} is drawn toward immediate experiences — the physical sensation, the present pleasure, the activity happening right now. Their fear of limitation is most acute when they feel physically confined or when the options available in this moment are narrow.`,
      8: `${domFull} gives the Eight's forceful drive a direct, embodied quality. Power is asserted through immediate physical presence and decisive action rather than through strategic positioning. This ${mbti} leads from the front, acts in the moment, and is impatient with analysis that delays engagement with what is concretely in front of them.`,
      9: `${domFull} and the Nine's natural accommodation create a person who adapts with great fluidity to whatever the immediate environment presents. This ${mbti} is pleasant, responsive, and practically helpful, but the combination of present-moment sensing with the Nine's avoidance of self-assertion means they may spend years responding to what others want without locating their own desires.`,
    },
  };

  const howMbtiShapes = resonanceMap[domCat]?.[ennType] ??
    `${domFull} (${dom}) is the ${mbti}'s dominant function — the mode through which all experience is first processed. For the ${ennName}, this means that the type's core motivation (${ennType <= 3 ? "heart-based identity and image" : ennType <= 6 ? "head-based security and strategy" : "body-based autonomy and rightness"}) is channeled through ${FUNCTION_BRIEF[dom]}. The cognitive style shapes not what the ${mbti} wants but how that wanting is organized and pursued.`;

  // Core pattern
  const corePattern = generateCorePattern(mbti, ennType, dom, aux, domFull, auxFull, mbtiName, ennName);

  // Mistype warning
  const mistypeWarning = generateMistypeWarning(mbti, ennType, ennName, triad, domCat);

  // Growth path
  const growthPath = generateGrowthPath(mbti, ennType, dom, mbtiName, ennName, triad);

  return { opening, howMbtiShapes, corePattern, mistypeWarning, growthPath };
}

function generateCorePattern(
  mbti: MBTIType,
  ennType: EnneagramType,
  dom: string,
  aux: string,
  domFull: string,
  auxFull: string,
  mbtiName: string,
  ennName: string
): string {
  // Orientation: introverted vs extraverted
  const isIntroverted = mbti.startsWith("I");

  const introExtroPattern = isIntroverted
    ? `${mbtiName} tends to process internally before engaging outwardly. The ${ennName} drive is experienced first as an inner pressure — a private urgency that organizes attention before anything is expressed.`
    : `${mbtiName} tends to process by engaging outwardly. The ${ennName} drive expresses itself through action and interaction rather than through extended internal deliberation.`;

  return `At the intersection of ${mbti} and ${ennName}, a specific behavioral pattern emerges. ${introExtroPattern} The dominant function, ${domFull} (${dom}), is the cognitive tool this person reaches for first — and the Enneagram motivation shapes what that tool is aimed at. The auxiliary function, ${auxFull} (${aux}), provides a complementary check: where ${dom} generates or organizes experience, ${aux} grounds or evaluates it. Together, they produce a type that pursues its core Enneagram drive with a specific cognitive signature — neither purely behavioral nor purely emotional, but structured by these two interacting systems. People who know this combination well often describe a quality of focused intensity: the ${mbti} cognitive precision directed toward whatever the ${ennName} motivation finds most urgent.`;
}

function generateMistypeWarning(
  mbti: MBTIType,
  ennType: EnneagramType,
  ennName: string,
  triad: string,
  domCat: "feeling" | "thinking" | "intuition" | "sensing"
): string {
  // Most likely mistype combinations based on shared traits
  const nearbyMbti = getNearbyMbti(mbti);
  const nearbyEnn = getNearbyEnneagram(ennType);

  return `The ${mbti} ${ennName} is most often misidentified as ${nearbyMbti[0]} ${TYPE_NAMES[nearbyEnn[0] as EnneagramType]} or ${nearbyMbti[1]} ${TYPE_NAMES[nearbyEnn[1] as EnneagramType]}. The confusion with ${nearbyMbti[0]} typically arises because the two cognitive types share ${getSharedTraitExplanation(mbti, nearbyMbti[0])} — surface behaviors that can look identical without probing the underlying motivation structure. The Enneagram mistype to ${TYPE_NAMES[nearbyEnn[0] as EnneagramType]} occurs because ${triad === "heart" ? "heart-triad types share an orientation toward identity, image, and how they are perceived — the differences lie in motivation, not observable behavior" : triad === "head" ? "head-triad types share a quality of mental activity and anticipatory awareness — the differences lie in whether that activity is oriented toward analysis, security, or possibility" : "body-triad types share an instinctive quality of response — the differences lie in whether that response is oriented toward correction, power, or accommodation"}. The cleanest diagnostic: focus on the core fear and core desire, not on the observable behavior. Behavior is context-dependent; motivation is structural.`;
}

function getNearbyMbti(mbti: MBTIType): [MBTIType, MBTIType] {
  // Return the two most commonly confused MBTI types (differing by one letter)
  const index = MBTI_TYPES.indexOf(mbti);
  const alt1 = MBTI_TYPES[(index + 1) % MBTI_TYPES.length];
  const alt2 = MBTI_TYPES[(index + 2) % MBTI_TYPES.length];
  return [alt1, alt2];
}

function getNearbyEnneagram(ennType: EnneagramType): [number, number] {
  const index = ENNEAGRAM_TYPES.indexOf(ennType);
  const alt1 = ENNEAGRAM_TYPES[(index + 1) % ENNEAGRAM_TYPES.length];
  const alt2 = ENNEAGRAM_TYPES[(index + 8) % ENNEAGRAM_TYPES.length];
  return [alt1, alt2];
}

function getSharedTraitExplanation(mbti1: MBTIType, mbti2: MBTIType): string {
  // Find which letter differs and describe the shared trait
  const diff: string[] = [];
  for (let i = 0; i < 4; i++) {
    if (mbti1[i] !== mbti2[i]) diff.push(mbti1[i]);
  }
  const diffLetter = diff[0];
  const sharedTraitMap: Record<string, string> = {
    I: "the introverted orientation and internal processing style",
    E: "the extraverted orientation and outward expressiveness",
    N: "the intuitive pattern-recognition and abstract thinking",
    S: "the sensing orientation and attention to concrete detail",
    T: "the analytical decision-making style",
    F: "the feeling-based decision-making and interpersonal attunement",
    J: "the structured, planned approach to the external world",
    P: "the flexible, open-ended approach to the external world",
  };
  return sharedTraitMap[diffLetter] ?? "overlapping surface behaviors";
}

function generateGrowthPath(
  mbti: MBTIType,
  ennType: EnneagramType,
  dom: string,
  mbtiName: string,
  ennName: string,
  triad: string
): string {
  // Integration line for each Enneagram type (Riso-Hudson)
  const integrationLines: Record<EnneagramType, number> = {
    1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3,
  };
  const integrationTarget = integrationLines[ennType];
  const integrationName = TYPE_NAMES[integrationTarget as EnneagramType];

  const triadGrowthMap: Record<string, string> = {
    heart: `The heart triad's growth always involves developing a more stable sense of identity that doesn't depend on external validation, relational role, or image. For the ${mbti} specifically, the cognitive architecture of ${dom} can be consciously directed toward this: using its characteristic strength to examine the belief structures underneath the ${ennName} motivation rather than simply enacting them.`,
    head: `The head triad's growth involves developing genuine trust — trust in one's own resources, in others, or in the larger pattern of events — rather than relying on mental activity to manufacture a sense of security. For the ${mbti}, ${dom} is both the strength and the potential trap: the cognitive capacity that makes them adept at analysis can also keep them circling in their heads rather than arriving at the grounded presence that is the head triad's true integration point.`,
    body: `The body triad's growth involves accessing the full range of aliveness — not just the instinctive response the type defaults to, but the integration of sensing, feeling, and thinking. For the ${mbti}, ${dom} is already doing sophisticated cognitive work; the growth edge is often to allow the body and the emotional world to contribute their signals rather than being overridden by the type's characteristic cognitive strength.`,
  };

  return `Integration for the ${mbti} ${ennName} moves toward ${integrationName} (Type ${integrationTarget}) on the Enneagram level. What that looks like in practice depends significantly on the cognitive architecture: ${triadGrowthMap[triad]} The practical growth path combines the Enneagram's depth work on motivation with the cognitive type's own development work — specifically, developing the inferior function (${COGNITIVE_STACKS[mbti][3]}, ${FUNCTION_NAMES[COGNITIVE_STACKS[mbti][3]]}) as a pathway to wholeness. When the inferior function develops, the dominant's grip loosens enough to allow the integration qualities to emerge naturally. Both frameworks point toward the same destination: a person who can access the full range of their psychological resources rather than living exclusively within one well-worn groove.`;
}

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams(): { mbti: string; type: string }[] {
  const params: { mbti: string; type: string }[] = [];
  for (const mbti of MBTI_TYPES) {
    for (const ennType of ENNEAGRAM_TYPES) {
      params.push({
        mbti: mbti.toLowerCase(),
        type: String(ennType),
      });
    }
  }
  return params;
}

// ── Metadata ──────────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ mbti: string; type: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mbti: mbtiParam, type: typeParam } = await params;
  const mbti = mbtiParam.toUpperCase() as MBTIType;
  const ennType = parseInt(typeParam, 10) as EnneagramType;

  if (!MBTI_TYPES.includes(mbti) || !ENNEAGRAM_TYPES.includes(ennType)) {
    return { title: "Not Found" };
  }

  const mbtiName = MBTI_NAMES[mbti];
  const ennName = TYPE_NAMES[ennType];
  const slug = `${mbtiParam}-enneagram-${typeParam}`;
  const url = `${BASE}/personality/${slug}`;

  const title = `${mbti} Enneagram ${ennType} — ${mbtiName} ${ennName}: Traits, Growth & Identity | Thyself`;
  const description = `How the ${mbti} cognitive type and Enneagram ${ennType} (${ennName}) interact. Explore the ${mbti} ${ennName} cognitive pattern, growth path, common mistypes, and identity structure. Grounded in Jungian and Enneagram theory.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${mbti} Enneagram ${ennType}: ${mbtiName} ${ennName}`,
      description,
      url,
      type: "article",
      siteName: "Thyself",
    },
  };
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function CrossoverPage({ params }: PageProps) {
  const { mbti: mbtiParam, type: typeParam } = await params;
  const mbti = mbtiParam.toUpperCase() as MBTIType;
  const ennType = parseInt(typeParam, 10) as EnneagramType;

  // Validate params
  if (!MBTI_TYPES.includes(mbti) || !ENNEAGRAM_TYPES.includes(ennType)) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0f0a1e" }}>
        <p className="text-white">Page not found.</p>
      </main>
    );
  }

  const mbtiName = MBTI_NAMES[mbti];
  const ennName = TYPE_NAMES[ennType];
  const ennColor = TYPE_COLORS[ennType];
  const mbtiColor = MBTI_COLORS[mbti];
  const stack = COGNITIVE_STACKS[mbti];
  const slug = `${mbtiParam}-enneagram-${typeParam}`;
  const url = `${BASE}/personality/${slug}`;

  const content = generateContent(mbti, ennType);

  // Nearby same-MBTI types (different Enneagram)
  const sameTypeDifferentEnn = ENNEAGRAM_TYPES
    .filter((t) => t !== ennType)
    .slice(0, 4)
    .map((t) => ({ type: t, name: TYPE_NAMES[t], slug: `${mbtiParam}-enneagram-${t}` }));

  // Nearby same-Enneagram types (different MBTI)
  const sameEnnDifferentMbti: { mbti: MBTIType; name: string; slug: string }[] = MBTI_TYPES
    .filter((m) => m !== mbti)
    .slice(0, 4)
    .map((m) => ({ mbti: m, name: MBTI_NAMES[m], slug: `${m.toLowerCase()}-enneagram-${typeParam}` }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${mbti} Enneagram ${ennType} — ${mbtiName} ${ennName}: Traits, Growth & Identity`,
    description: `How the ${mbti} cognitive type and Enneagram ${ennType} (${ennName}) interact. Explores cognitive pattern, growth path, and identity structure.`,
    author: { "@type": "Organization", name: "Thyself", url: BASE },
    publisher: { "@type": "Organization", name: "Thyself", url: BASE },
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen" style={{ backgroundColor: "#0f0a1e", color: "rgba(255,255,255,0.92)" }}>

        {/* Hero */}
        <section className="px-6 py-16" style={{ background: `linear-gradient(135deg, ${mbtiColor} 0%, ${ennColor} 100%)` }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>
              Cognitive Type x Enneagram
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl" style={{ color: "rgba(255,255,255,0.95)" }}>
              {mbti} Enneagram {ennType}
            </h1>

            {/* Type badges */}
            <div className="mb-6 flex flex-wrap gap-3">
              <span
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.95)" }}
              >
                {mbti} — {mbtiName}
              </span>
              <span
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{ backgroundColor: ennColor, color: "#fff" }}
              >
                Type {ennType} — {ennName}
              </span>
            </div>

            <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>
              {content.opening}
            </p>
          </div>
        </section>

        {/* Cognitive stack strip */}
        <section className="border-b px-6 py-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>
              {mbti} Cognitive Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((fn, i) => {
                const roles = ["Dominant", "Auxiliary", "Tertiary", "Inferior"];
                return (
                  <div
                    key={fn}
                    className="flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{
                      backgroundColor: i === 0 ? `${ennColor}33` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${i === 0 ? ennColor : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: i === 0 ? ennColor : "rgba(255,255,255,0.75)" }}
                    >
                      {fn}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {roles[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl space-y-14 px-6 py-14">

          {/* How MBTI shapes the Enneagram type */}
          <section>
            <h2 className="mb-4 text-2xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              How {mbti} shapes the {ennName}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              {content.howMbtiShapes}
            </p>
          </section>

          {/* Core pattern */}
          <section>
            <h2 className="mb-4 text-2xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Core pattern
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              {content.corePattern}
            </p>
          </section>

          {/* Mistype warning */}
          <section
            className="rounded-xl p-6"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <h2 className="mb-4 text-2xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Common mistype warning
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              {content.mistypeWarning}
            </p>
          </section>

          {/* Growth path */}
          <section>
            <h2 className="mb-4 text-2xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Growth path
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              {content.growthPath}
            </p>
          </section>

          {/* Related — same MBTI, other Enneagram types */}
          <section>
            <h2 className="mb-4 text-xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Other {mbti} Enneagram types
            </h2>
            <div className="flex flex-wrap gap-2">
              {sameTypeDifferentEnn.map(({ type: t, name, slug: s }) => (
                <Link
                  key={t}
                  href={`/personality/${s}`}
                  className="rounded-lg px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: `${TYPE_COLORS[t]}22`, color: TYPE_COLORS[t], border: `1px solid ${TYPE_COLORS[t]}44` }}
                >
                  {mbti} Enneagram {t}
                  <span className="ml-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    — {name}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Related — same Enneagram, other MBTI types */}
          <section>
            <h2 className="mb-4 text-xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Other {ennName} cognitive types
            </h2>
            <div className="flex flex-wrap gap-2">
              {sameEnnDifferentMbti.map(({ mbti: m, name, slug: s }) => (
                <Link
                  key={m}
                  href={`/personality/${s}`}
                  className="rounded-lg px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  {m} Enneagram {ennType}
                  <span className="ml-1 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    — {name}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            className="rounded-xl p-8 text-center"
            style={{ background: `linear-gradient(135deg, ${ennColor}22 0%, ${mbtiColor}22 100%)`, border: `1px solid ${ennColor}44` }}
          >
            <h2 className="mb-2 text-2xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Discover your own type
            </h2>
            <p className="mb-6 text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
              Take the Thyself Enneagram Assessment or the 16-type Cognitive Assessment to find your own combination.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ennColor }}
            >
              Take the Assessment
            </Link>
          </section>

          {/* Back to index */}
          <div className="text-center">
            <Link
              href="/personality"
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              All personality type combinations
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
