"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Check,
  ChevronRight,
  Heart,
  Zap,
  Compass,
  Brain,
  Layers,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Flame,
  Star,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { enneagramTypes } from "@/data/enneagram";
import {
  instinctualVariants,
  instinctualStackings,
  subtypes,
} from "@/data/subtypes";
import { mbtiTypes } from "@/data/cognitive-functions";
import { tritypes, getCanonicalTritypeCode, getOrderedTritypeThyself } from "@/data/tritypes";

/* ─────────────────────────────────────────────────────────────────────────────
   INLINE DATA (sourced from daily/page.tsx typeInsights + typeChallenges)
───────────────────────────────────────────────────────────────────────────── */
const typeInsights: Record<number, string[]> = {
  1: [
    "Notice today when your inner critic activates. Instead of pushing it away, ask: 'What are you trying to protect me from?' The critic learned the wrong method. but it has good intentions.",
    "Perfection is a moving target your mind invented. Pick one task today and declare it 'done enough.' Practice the radical act of letting something be sufficient.",
    "Your integration line is Type 7. Do one thing purely for fun today. zero productivity attached. Notice how the inner critic reacts. That reaction IS the work.",
  ],
  2: [
    "Practice identifying one need YOU have today. not a need you're meeting for others. Just notice it. You don't have to act. Simply acknowledge: 'I need ___.'",
    "Your integration line is Type 4. Spend 20 minutes alone today doing something purely for your own pleasure. not to share, not to show. Just for you.",
    "Giving often carries an invisible price tag. Today, notice when you offer help. is there a quiet hope the person will respond in a certain way?",
  ],
  3: [
    "Notice the gap today between what you're performing and what you actually feel. The performance is so automatic for Threes that it takes real practice to catch it.",
    "Your integration line is Type 6. Check in with someone you trust. not to perform, but to say 'I've been struggling with ___.' Notice if that feels dangerous.",
    "Rest is radical self-revelation for a Three. In rest, the performer has nowhere to hide. Schedule 30 unstructured minutes today and notice who shows up.",
  ],
  4: [
    "The fixation of Type 4 is Melancholy. returning again and again to what's missing. Today, interrupt that habit once: name three things that are actually present and good.",
    "Your integration line is Type 1. Pick a task you've been 'not ready' for and do the first step mechanically, without waiting for inspiration. Notice what happens.",
    "Your emotional depth is genuinely rare. The growth edge: depth without drama. Feeling fully without using the feeling as identity.",
  ],
  5: [
    "Your integration line is Type 8. Take one decisive action today in an area where you've been observing or analyzing. Embodied action is the fastest path through the 5's retreat.",
    "Avarice. 5's passion. is the hoarding of energy, time, and inner space. Where are you over-conserving today in a way that's keeping you contracted?",
    "Your privacy and self-sufficiency are genuine strengths. The shadow: isolation that prevents the very understanding you seek. Other people ARE the data you need.",
  ],
  6: [
    "Anxiety often has a specific object if you look closely. Write down the one thing you're most anxious about. Then: 'What's the actual probability?' and 'What would I do if it happened?'",
    "Your integration line is Type 9. Practice sitting with not-knowing for 5 minutes today. Don't research, plan, or ask anyone. Just rest in uncertainty.",
    "Loyalty is one of your most beautiful qualities. Are you loyal because people deserve it, or because leaving feels too scary?",
  ],
  7: [
    "Today's challenge: stay with one feeling of discomfort instead of moving on. Just 5 minutes. Anxiety, boredom, sadness. whatever comes. It won't kill you, and it WILL teach you something.",
    "Your integration line is Type 5. Choose one topic today and go deep instead of wide. Depth is the antidote to the 7's scattered brilliance.",
    "Commitment creates freedom. When you stay with something through the difficult middle, you access depth unavailable to those who leave early.",
  ],
  8: [
    "Your integration line is Type 2. Do one vulnerable thing today. Not weakness. vulnerability. Share something you're genuinely uncertain about with someone you trust.",
    "Lust. 8's passion. is the need to feel fully alive through power or intensity. Where are you seeking intensity today that might be covering a softer feeling underneath?",
    "Your directness is a gift. The growth edge is the delivery. The same truth, offered with care rather than force, is far more powerful.",
  ],
  9: [
    "Your integration line is Type 3. Pick one priority that is YOURS. not the family's, not your partner's. Take one step toward it today, even a tiny one.",
    "Sloth. 9's passion. is not laziness. It's the forgetting of your own agenda in the merge with others' priorities. What do YOU want?",
    "Your capacity to hold multiple perspectives is profound. The shadow: holding so many that you lose your own. What is your actual position on something that matters?",
  ],
};

const typeChallenges: Record<number, string[]> = {
  1: [
    "Find one small imperfection today and consciously choose not to fix it. Let it be. Notice the discomfort dissolving.",
    "Send a message to someone you've been critical of expressing genuine appreciation for something they do well.",
    "Set a timer for 15 minutes and do something playful with zero agenda. Doodle, dance, play a game.",
    "Write down your inner critic's most frequent phrase. Then write a compassionate response as if from your wisest friend.",
    "Share one mistake you made recently with someone close to you. not to explain or justify it, just to name it.",
  ],
  2: [
    "Ask for help with something today. even something small. Let someone else do the giving.",
    "Write down three things you want. not for others, just for yourself. Read them out loud.",
    "Have a conversation today without asking how the other person is doing first. Start with sharing something about yourself.",
    "Cancel one commitment that you made out of obligation rather than genuine desire.",
    "Tell one person clearly what you need from them this week. Use the words 'I need.'",
  ],
  3: [
    "Have one conversation today where you admit you don't know something. without pivoting to what you do know.",
    "Spend 30 minutes completely offline and unproductive. No podcasts, no thinking about work. Just be.",
    "Write down who you are when you're not succeeding at anything. Who is the 'you' beneath all the accomplishments?",
    "Tell someone close to you about something you're currently failing at or finding hard.",
    "Complete one task today without telling anyone about it or posting about it.",
  ],
  4: [
    "Do one ordinary, mundane task with full presence and appreciation today. Dishes, walking, making coffee.",
    "Reach out to someone and say something positive about them. with no accompanying complaint or emotional intensity.",
    "Write for 10 minutes about something you're grateful for that you usually overlook because it's 'too ordinary.'",
    "Finish one creative project you've been waiting to feel inspired enough to complete.",
    "Notice one moment today where you feel comparative to others. Write down what the comparison is actually pointing at.",
  ],
  5: [
    "Reach out to someone you care about just to connect. no agenda, no information to exchange. Just to be in contact.",
    "Join a conversation you'd normally observe from the edges. Contribute without preparing your contribution first.",
    "Share something you're currently uncertain about or learning. without having mastered it first.",
    "Spend 20 minutes in your body: walk, stretch, exercise, cook. Without processing it mentally.",
    "Do one thing that requires trusting someone else's competence rather than doing it yourself.",
  ],
  6: [
    "Make one small decision today entirely on your own. no asking for opinions, no double-checking. Trust yourself.",
    "Notice a worry you've been running. Write out the actual worst case. Then write how you'd handle it.",
    "Reach out to someone in your support system. not to process anxiety, just to connect.",
    "Challenge one assumption you've been treating as certainty. What would it look like if you were wrong?",
    "Do something courageous today. however small. Notice that you survived.",
  ],
  7: [
    "Sit still for 15 minutes with no phone, no input. Just be with whatever comes up.",
    "Keep one commitment you've been tempted to reschedule or escape.",
    "Write about something painful from your past without reframing it into a positive.",
    "Go deep on one subject today instead of wide across many.",
    "Finish something you started. The ending is where the real learning lives.",
  ],
  8: [
    "Let someone else solve a problem you would normally handle. Don't intervene.",
    "Share something you're afraid of with someone you trust. Use the word 'afraid.'",
    "Ask for something you need instead of demanding it or taking it.",
    "Practice listening in a conversation without planning your response. Just receive.",
    "Do something gentle today. for yourself or someone else. Notice how strength and softness coexist.",
  ],
  9: [
    "Name one thing you want today. clearly, without hedging.",
    "State an opinion in a conversation without immediately softening it.",
    "Notice one moment where you merged with someone else's preference. Ask: what did I actually want?",
    "Take one step toward a long-deferred personal goal.",
    "Say no to one request that doesn't align with your own priorities.",
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   BASIC PROPOSITION GENERATOR (static synthesis from type data)
───────────────────────────────────────────────────────────────────────────── */
const basicPropositions: Record<number, string> = {
  1: "If I am good enough and everything is in order, I will be worthy of love and beyond criticism.",
  2: "If I am indispensable and loved by others, I will be safe from the pain of feeling unwanted.",
  3: "If I am successful and admired, I will have the value that I fear I lack inside.",
  4: "If I find my true, unique self and express it fully, I will at last feel complete and belonging.",
  5: "If I understand everything thoroughly, I will be competent enough to face the world without being overwhelmed.",
  6: "If I stay alert to danger and maintain strong alliances, I will be protected from the threats I fear.",
  7: "If I keep my options open and stay positive, I will never be trapped in pain or deprivation.",
  8: "If I stay strong and in control, no one will be able to harm or dominate me.",
  9: "If I keep the peace and avoid conflict, I will maintain my inner calm and everyone will remain connected to me.",
};

/* ─────────────────────────────────────────────────────────────────────────────
   NARRATIVE PARAGRAPH GENERATOR
───────────────────────────────────────────────────────────────────────────── */
function buildNarrativeParagraph(typeNum: number, coreFear: string, coreDesire: string): string {
  const propositions: Record<number, string> = {
    1: `At the center of your psychology is a tension between what is and what could be. Your ${coreFear.toLowerCase()} drives a relentless inner critic that holds both yourself and the world to impossible standards. Yet underneath that drive lives your ${coreDesire.toLowerCase()}. a genuine longing for wholeness, not perfection. Your growth edge is learning that integrity doesn't require flawlessness, and that the world can be both imperfect and worthy of love.`,
    2: `Your inner world revolves around connection. its presence, its depth, and the ever-present fear of its absence. The shadow of ${coreFear.toLowerCase()} keeps you focused outward, reading others' needs before they are spoken. But your core desire. to ${coreDesire.toLowerCase()}. can only be truly met when you turn that same generous attention toward yourself. The path is learning that receiving is not weakness, and that your needs deserve the same care you give so freely.`,
    3: `You move through the world at speed, adapting to what the situation requires and succeeding by almost any measure. But beneath the capability lives a quieter fear: ${coreFear.toLowerCase()}. Your desire to ${coreDesire.toLowerCase()} is real. the work is discovering that this worth exists independent of what you've done. The most radical act for a Three is simply to stop, feel, and be seen without performing.`,
    4: `Depth is your native country. You carry an emotional richness that most people never access, and a longing. ${coreDesire.toLowerCase()}. that drives everything you create. The shadow is that aching sense of ${coreFear.toLowerCase()}, which can keep you searching for what's missing rather than inhabiting what's here. Your journey is learning that you are already the thing you're looking for, and that the ordinary contains exactly as much meaning as the extraordinary.`,
    5: `You navigate the world through understanding. building models, seeking mastery, protecting your inner space from depletion. The fear of ${coreFear.toLowerCase()} keeps your castle well-defended. But your deeper desire. to ${coreDesire.toLowerCase()}. is one that emerges through engagement, not just preparation. The bridge is discovering that connecting with others and with life doesn't drain you; it completes the knowledge you've been building alone.`,
    6: `Your mind is an excellent threat detector, scanning the horizon for dangers others miss. This vigilance comes from the deep fear of ${coreFear.toLowerCase()}. and it has protected you many times. But your desire for ${coreDesire.toLowerCase()} ultimately rests not in the external world, but in trusting your own inner knowing. Courage isn't the absence of fear for a Six; it's acting from your own center despite the doubt.`,
    7: `Your brilliance is in possibility. you see options, connections, and silver linings that others miss entirely. The shadow is the fear of ${coreFear.toLowerCase()}, which keeps you moving forward into the next experience before the current one is complete. Your desire to ${coreDesire.toLowerCase()} is achievable. but it lives in depth, not breadth. The profound irony is that staying present with difficulty, rather than escaping it, leads to the very aliveness you seek.`,
    8: `You meet the world with directness and intensity, refusing to be diminished or controlled. The core fear. ${coreFear.toLowerCase()}. shaped an armored self that is genuinely powerful. But your desire to ${coreDesire.toLowerCase()} is a form of care, and care includes vulnerability. Your deepest growth comes when you discover that your tenderness doesn't make you less powerful; it makes you more fully yourself.`,
    9: `You carry an extraordinary capacity for acceptance, for seeing all sides, for holding the peace that others can't sustain. The fear of ${coreFear.toLowerCase()} can keep you merged with others' agendas, comfortable but invisible to yourself. Your desire. ${coreDesire.toLowerCase()}. is available to you right now. The path is simply this: you exist, you matter, and what you want deserves to be named and pursued.`,
  };
  return propositions[typeNum] || `Your core psychology is shaped by the fear of ${coreFear.toLowerCase()} and the longing to ${coreDesire.toLowerCase()}. Understanding this dynamic is the foundation of lasting growth.`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   COGNITIVE CORRELATION NOTE
───────────────────────────────────────────────────────────────────────────── */
function getCognitiveNote(mbti: string, ennea: number): string {
  const notes: Record<string, Partial<Record<number, string>>> = {
    INTJ: { 1: "INTJ + 1 combines Ni's long-range precision with the One's perfectionist drive. a powerful vision held to exacting standards.", 5: "INTJ + 5 is one of the most classically 'withdrawn investigator' combinations: Ni's pattern recognition paired with the Five's sovereign inner world.", 8: "INTJ + 8 produces a strategic, forceful visionary who tolerates little inefficiency and sees clearly where power should flow." },
    INTP: { 5: "INTP + 5 creates a deeply analytical, self-contained thinker who pursues understanding for its own sake, often ahead of its time.", 4: "INTP + 4 blends Ti's logical precision with the Four's emotional authenticity. a thinker who feels everything deeply and expresses it precisely." },
    INFJ: { 4: "INFJ + 4 is profoundly sensitive and creative. Ni's symbolic vision amplified by the Four's emotional depth and longing for meaning.", 1: "INFJ + 1 creates an idealistic reformer with both prophetic insight and principled standards, holding the world to a vision most can't yet see.", 9: "INFJ + 9 is deeply empathic and conflict-averse, holding extraordinary wisdom while struggling to surface their own perspective in groups." },
    INFP: { 4: "INFP + 4 is the archetype of the depth-seeker: Fi's authentic values fused with the Four's emotional intensity and longing for identity.", 9: "INFP + 9 creates a gentle dreamer. deeply feeling, conflict-avoidant, and carrying rich inner worlds often unexpressed to the world." },
    ENFJ: { 2: "ENFJ + 2 is the quintessential helper-leader: Fe's attunement to others amplified by the Two's need to be needed and deeply loved.", 3: "ENFJ + 3 creates a charismatic achiever who connects deeply while also needing to be seen as successful and admired." },
    ENFP: { 7: "ENFP + 7 is boundless enthusiasm: Ne's love of possibility fused with the Seven's drive to experience everything. magnetic and perpetually in motion.", 4: "ENFP + 4 creates a deeply expressive creative who oscillates between expansive possibilities and aching longing for something authentically their own." },
    ENTJ: { 8: "ENTJ + 8 is one of the most commanding combinations. Te's organizational drive fused with the Eight's force of will and intolerance of control.", 3: "ENTJ + 3 produces a driven achiever who builds impressive things and can struggle to slow down long enough to feel anything at all." },
    ENTP: { 7: "ENTP + 7 is a restless idea-generator: Ne's love of possibility combined with the Seven's fear of being trapped. endlessly stimulating and hard to pin down.", 5: "ENTP + 5 creates an unconventional, systems-thinking investigator who loves debate and has little patience for conventional wisdom." },
    ISTJ: { 1: "ISTJ + 1 pairs Si's meticulous memory of how things should be done with the One's principled need for correctness. deeply reliable, sometimes rigid.", 6: "ISTJ + 6 is the loyal traditionalist: Si's attachment to precedent combined with the Six's need for security and clear structures to trust." },
    ISFJ: { 2: "ISFJ + 2 is the tireless caregiver. Si's attentive memory for others' needs fused with the Two's drive to be indispensable.", 6: "ISFJ + 6 creates a loyal, quietly vigilant protector who holds the group's history and watches carefully for anything that could go wrong." },
    ESTJ: { 1: "ESTJ + 1 creates the archetype of principled leadership. Te's drive for order married to the One's need for everything to be done correctly.", 8: "ESTJ + 8 produces a decisive, commanding executor who creates systems and enforces them without hesitation." },
    ESFJ: { 2: "ESFJ + 2 is perhaps the warmest, most attentive combination. Fe's attunement to group harmony fused with the Two's personal devotion to the people they love.", 6: "ESFJ + 6 creates a loyal, duty-bound protector of the group who monitors social dynamics closely and acts to preserve harmony and safety." },
    ISTP: { 5: "ISTP + 5 is intensely self-contained. Ti's logical systems-thinking paired with the Five's sovereign inner world and minimal social needs.", 8: "ISTP + 8 creates a quiet powerhouse: self-reliant, direct, capable of tremendous decisive action, and deeply uncomfortable with any form of vulnerability." },
    ISFP: { 4: "ISFP + 4 is one of the purest expressions of aesthetic sensitivity. Fi's values-driven authenticity amplified by the Four's longing for a unique, beautiful existence.", 9: "ISFP + 9 is gentle, attuned, and conflict-averse. a deep feeler who merges easily with environments and struggles to surface their own distinct preferences." },
    ESTP: { 8: "ESTP + 8 is force in motion. Se's immediate engagement with reality combined with the Eight's intensity and intolerance for being controlled.", 7: "ESTP + 7 creates a high-energy hedonist: Se's love of the immediate experience fused with the Seven's drive to squeeze maximum life from every moment." },
    ESFP: { 7: "ESFP + 7 is pure aliveness. Se's sensory delight in the present moment combined with the Seven's irrepressible enthusiasm for more of everything.", 2: "ESFP + 2 creates a warm, generous social presence who wants everyone to feel good and is genuinely energized by the people around them." },
  };
  return notes[mbti]?.[ennea] || `${mbti} and Enneagram Type ${ennea} create a distinctive intersection: your cognitive wiring shapes how you pursue your core motivations, amplifying both your gifts and your growth edges.`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION CARD WRAPPER
───────────────────────────────────────────────────────────────────────────── */
function SectionCard({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 20,
        padding: "28px 28px",
        marginBottom: 16,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────────────────────── */
function SectionHeader({
  icon,
  label,
  accent = "#7c3aed",
}: {
  icon: React.ReactNode;
  label: string;
  accent?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: `${accent}22`,
          border: `1px solid ${accent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function ReportPage() {
  const { profile, loaded } = useProfile();
  const [copied, setCopied] = useState(false);

  /* ── Derived data ──────────────────────────────────────────────────────── */
  const typeData = profile.enneagramType
    ? enneagramTypes.find((t) => t.number === profile.enneagramType)
    : null;

  // Instinctual stacking
  const stackingCode = profile.instinctualStacking?.toLowerCase();
  const stackingData = stackingCode
    ? instinctualStackings.find((s) => s.code === stackingCode)
    : null;

  // Dominant instinct & subtype
  const dominantInstinct = stackingCode
    ? (stackingCode.split("/")[0] as "sp" | "sx" | "so")
    : null;
  const dominantInstinctData = dominantInstinct
    ? instinctualVariants.find((v) => v.code === dominantInstinct)
    : null;

  // Enneagram subtype
  const subtypeData =
    typeData && dominantInstinct
      ? subtypes.find(
          (s) => s.type === typeData.number && s.instinct === dominantInstinct
        )
      : null;

  // Wings
  const wingLeft = typeData ? parseInt(typeData.wings.left.split(",")[0].replace("w", "").charAt(1)) : null;
  const wingRight = typeData ? parseInt(typeData.wings.right.split(",")[0].replace("w", "").charAt(1)) : null;
  const wingLeftName = wingLeft ? typeData?.wings.left.split(",")[1]?.trim() : null;
  const wingRightName = wingRight ? typeData?.wings.right.split(",")[1]?.trim() : null;

  // Integration / disintegration
  const integrationTypeData = typeData
    ? enneagramTypes.find((t) => t.number === typeData.integrationLine)
    : null;
  const disintegrationTypeData = typeData
    ? enneagramTypes.find((t) => t.number === typeData.disintegrationLine)
    : null;

  // Cognitive
  const cognitiveData = profile.cognitiveType
    ? mbtiTypes.find((t) => t.code === profile.cognitiveType)
    : null;

  // Tritype
  const tritypeFirst = profile.tritypeFirst ?? profile.tritypeHead;
  const tritypeSecond = profile.tritypeSecond ?? profile.tritypeHeart;
  const tritypeThird = profile.tritypeThird ?? profile.tritypeGut;
  const hasTri = tritypeFirst && tritypeSecond && tritypeThird;
  const tritypeArchetype = hasTri
    ? getOrderedTritypeThyself(
        [tritypeFirst!, tritypeSecond!, tritypeThird!],
        tritypes
      )
    : null;
  const tritypeCanonical = hasTri
    ? getCanonicalTritypeCode([tritypeFirst!, tritypeSecond!, tritypeThird!])
    : null;
  const tritypeData = tritypeCanonical
    ? tritypes.find((t) => t.code === tritypeCanonical)
    : null;

  // Type color
  const typeColor = typeData?.color ?? "#7c3aed";

  /* ── Share handler ─────────────────────────────────────────────────────── */
  const handleShare = () => {
    const typeLine = typeData
      ? `Type ${typeData.number}. ${typeData.name}`
      : "Unknown Type";
    const stackLine = stackingData ? ` | ${stackingData.code} instinct` : "";
    const mbtiLine = profile.cognitiveType ? ` | ${profile.cognitiveType}` : "";
    const text = `My Thyself Report: ${typeLine}${stackLine}${mbtiLine}`;
    if (navigator.share) {
      navigator.share({ title: "My Thyself Type Report", text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  /* ── Loading ───────────────────────────────────────────────────────────── */
  if (!loaded) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f0a1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid rgba(124,58,237,0.3)",
            borderTopColor: "#7c3aed",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── No type set ───────────────────────────────────────────────────────── */
  if (!profile.enneagramType && !profile.cognitiveType) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f0a1e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "rgba(124,58,237,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Star style={{ color: "#7c3aed", width: 28, height: 28 }} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "white", marginBottom: 12 }}>
          No Profile Yet
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 380, marginBottom: 32, lineHeight: 1.6 }}>
          Set up your Enneagram type to generate a personalized report.
        </p>
        <Link
          href="/profile"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            borderRadius: 12,
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            color: "white",
            fontWeight: 600,
            fontSize: 15,
            textDecoration: "none",
          }}
        >
          Build Your Profile <ChevronRight style={{ width: 16, height: 16 }} />
        </Link>
      </div>
    );
  }

  const displayName = profile.displayName;
  const insights = profile.enneagramType ? typeInsights[profile.enneagramType] ?? [] : [];
  const challenges = profile.enneagramType ? typeChallenges[profile.enneagramType] ?? [] : [];

  /* ── HERO gradient ─────────────────────────────────────────────────────── */
  const heroGradient = `linear-gradient(160deg, ${typeColor}33 0%, #0f0a1e 55%)`;

  return (
    <div style={{ minHeight: "100vh", background: "#0f0a1e", color: "white" }}>
      {/* Hero */}
      <div
        style={{
          background: heroGradient,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "0 0 40px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${typeColor}18 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Nav bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px 0",
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          <Link
            href="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              padding: "8px 12px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <ArrowLeft style={{ width: 15, height: 15 }} />
            Profile
          </Link>
          <button
            onClick={handleShare}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 500,
              padding: "8px 14px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
              cursor: "pointer",
            }}
          >
            {copied ? (
              <>
                <Check style={{ width: 14, height: 14, color: "#4ade80" }} />
                <span style={{ color: "#4ade80" }}>Copied</span>
              </>
            ) : (
              <>
                <Share2 style={{ width: 14, height: 14 }} />
                Share
              </>
            )}
          </button>
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "48px 20px 0",
            textAlign: "center",
          }}
        >
          {displayName && (
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              Your Thyself Report, {displayName}
            </p>
          )}

          {/* Big type number */}
          {typeData && (
            <>
              <div
                style={{
                  fontSize: 88,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: typeColor,
                  marginBottom: 4,
                  fontVariantNumeric: "tabular-nums",
                  textShadow: `0 0 60px ${typeColor}44`,
                }}
              >
                {typeData.number}
              </div>
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 12,
                  letterSpacing: "-0.01em",
                }}
              >
                {typeData.name}
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 20,
                  fontStyle: "italic",
                }}
              >
                "{typeData.alias}"
              </p>
            </>
          )}

          {/* Badges row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            {subtypeData && (
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  background: `${typeColor}22`,
                  border: `1px solid ${typeColor}55`,
                  color: typeColor,
                }}
              >
                {dominantInstinct?.toUpperCase()}{typeData?.number}. {subtypeData.name.split(",")[1]?.trim() || subtypeData.name}
              </span>
            )}
            {hasTri && (
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  background: "rgba(79,70,229,0.2)",
                  border: "1px solid rgba(79,70,229,0.4)",
                  color: "#818cf8",
                }}
              >
                {profile.tritype || `${tritypeFirst}${tritypeSecond}${tritypeThird}`}
                {tritypeArchetype ? `. ${tritypeArchetype}` : ""}
              </span>
            )}
            {profile.cognitiveType && (
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  background: "rgba(20,184,166,0.15)",
                  border: "1px solid rgba(20,184,166,0.35)",
                  color: "#2dd4bf",
                }}
              >
                {profile.cognitiveType}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 80px" }}>

        {/* ── 1. Core Psychology ──────────────────────────────────────────── */}
        {typeData && (
          <SectionCard index={0}>
            <SectionHeader icon={<Heart style={{ width: 17, height: 17 }} />} label="Core Psychology" accent="#e879f9" />

            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              {/* Fear */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.18)",
                }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(239,68,68,0.7)", marginBottom: 6 }}>Core Fear</p>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.5 }}>{typeData.coreFear}</p>
              </div>
              {/* Desire */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(74,222,128,0.06)",
                  border: "1px solid rgba(74,222,128,0.18)",
                }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(74,222,128,0.7)", marginBottom: 6 }}>Core Desire</p>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.5 }}>{typeData.coreDesire}</p>
              </div>
              {/* Proposition */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(251,191,36,0.06)",
                  border: "1px solid rgba(251,191,36,0.18)",
                }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,191,36,0.65)", marginBottom: 6 }}>Basic Proposition</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.55, fontStyle: "italic" }}>
                  {basicPropositions[typeData.number]}
                </p>
              </div>
            </div>

            {/* Narrative paragraph */}
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.75 }}>
              {buildNarrativeParagraph(typeData.number, typeData.coreFear, typeData.coreDesire)}
            </p>
          </SectionCard>
        )}

        {/* ── 2. Growth & Stress Arrows ───────────────────────────────────── */}
        {typeData && integrationTypeData && disintegrationTypeData && (
          <SectionCard index={1}>
            <SectionHeader icon={<TrendingUp style={{ width: 17, height: 17 }} />} label="Growth & Stress Arrows" accent="#34d399" />

            <div style={{ display: "grid", gap: 12 }}>
              {/* Integration */}
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: 14,
                  background: "rgba(52,211,153,0.07)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
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
                      borderRadius: 10,
                      background: integrationTypeData.color + "33",
                      border: `2px solid ${integrationTypeData.color}66`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      fontWeight: 800,
                      color: integrationTypeData.color,
                    }}
                  >
                    {integrationTypeData.number}
                  </div>
                  <div style={{ width: 2, height: 24, background: "rgba(52,211,153,0.3)", borderRadius: 2 }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(52,211,153,0.5)" }} />
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(52,211,153,0.7)", marginBottom: 5 }}>When Growing</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 6 }}>
                    Move toward Type {integrationTypeData.number}. {integrationTypeData.name}
                  </p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.58)", lineHeight: 1.55 }}>
                    {typeData.growthTips[3] || `At your best, you embody the healthy qualities of Type ${integrationTypeData.number}: ${integrationTypeData.coreDesire.toLowerCase()}.`}
                  </p>
                </div>
              </div>

              {/* Disintegration */}
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: 14,
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.18)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
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
                      borderRadius: 10,
                      background: disintegrationTypeData.color + "33",
                      border: `2px solid ${disintegrationTypeData.color}66`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      fontWeight: 800,
                      color: disintegrationTypeData.color,
                    }}
                  >
                    {disintegrationTypeData.number}
                  </div>
                  <div style={{ width: 2, height: 24, background: "rgba(239,68,68,0.3)", borderRadius: 2 }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(239,68,68,0.5)" }} />
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(239,68,68,0.7)", marginBottom: 5 }}>Under Stress</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 6 }}>
                    Take on qualities of Type {disintegrationTypeData.number}. {disintegrationTypeData.name}
                  </p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.58)", lineHeight: 1.55 }}>
                    {`Under significant stress, unhealthy ${disintegrationTypeData.name.toLowerCase()} patterns can emerge: ${disintegrationTypeData.unhealthyTraits.slice(0, 3).join(", ")}.`}
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        )}

        {/* ── 3. Instinctual Stacking ─────────────────────────────────────── */}
        {(stackingData || dominantInstinctData) && (
          <SectionCard index={2}>
            <SectionHeader icon={<Layers style={{ width: 17, height: 17 }} />} label="Instinctual Stacking" accent="#fb923c" />

            {/* Stack visual */}
            {stackingCode && (
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                {stackingCode.split("/").map((inst, i) => {
                  const iv = instinctualVariants.find((v) => v.code === inst);
                  const isFirst = i === 0;
                  const isLast = i === stackingCode.split("/").length - 1;
                  return (
                    <div key={inst} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          padding: "8px 16px",
                          borderRadius: 10,
                          background: isFirst
                            ? "rgba(251,146,60,0.2)"
                            : isLast
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(255,255,255,0.07)",
                          border: isFirst
                            ? "1px solid rgba(251,146,60,0.45)"
                            : "1px solid rgba(255,255,255,0.1)",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: isFirst
                              ? "#fb923c"
                              : isLast
                              ? "rgba(255,255,255,0.3)"
                              : "rgba(255,255,255,0.65)",
                            marginBottom: 2,
                          }}
                        >
                          {inst.toUpperCase()}
                        </p>
                        <p
                          style={{
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: isFirst
                              ? "rgba(251,146,60,0.7)"
                              : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {isFirst ? "Dominant" : isLast ? "Blind Spot" : "Secondary"}
                        </p>
                      </div>
                      {!isLast && (
                        <ChevronRight style={{ width: 14, height: 14, color: "rgba(255,255,255,0.25)" }} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Dominant instinct description */}
            {dominantInstinctData && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 8 }}>
                  {dominantInstinctData.fullName}
                </p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 12 }}>
                  {dominantInstinctData.description}
                </p>
              </div>
            )}

            {/* Subtype box */}
            {subtypeData && (
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(251,146,60,0.06)",
                  border: "1px solid rgba(251,146,60,0.18)",
                  marginBottom: 12,
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,146,60,0.65)", marginBottom: 6 }}>
                  Your Subtype. {subtypeData.chestnutName}
                  {subtypeData.isCountertype && (
                    <span style={{ marginLeft: 8, fontSize: 10, background: "rgba(251,146,60,0.2)", padding: "2px 6px", borderRadius: 4, color: "#fb923c" }}>
                      Countertype
                    </span>
                  )}
                </p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>
                  {subtypeData.description.slice(0, 280)}…
                </p>
              </div>
            )}

            {/* Stacking characteristics */}
            {stackingData && (
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>
                  {stackingData.name}. {stackingData.description}
                </p>
                <div style={{ display: "grid", gap: 6 }}>
                  {stackingData.characteristics.slice(0, 4).map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fb923c", marginTop: 7, flexShrink: 0 }} />
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.58)", lineHeight: 1.55 }}>{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionCard>
        )}

        {/* ── 4. Wings ────────────────────────────────────────────────────── */}
        {typeData && wingLeft && wingRight && (
          <SectionCard index={3}>
            <SectionHeader icon={<Compass style={{ width: 17, height: 17 }} />} label="Wings" accent="#818cf8" />

            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 20 }}>
              Your type is flanked by two adjacent types. One or both may influence your expression.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {/* Left wing */}
              {(() => {
                const wt = enneagramTypes.find((t) => t.number === wingLeft);
                const isActive = profile.enneagramWing?.endsWith(String(wingLeft));
                return (
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: 14,
                      background: isActive ? `${wt?.color}15` : "rgba(255,255,255,0.04)",
                      border: isActive ? `1px solid ${wt?.color}40` : "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: `${wt?.color}33`,
                          border: `1.5px solid ${wt?.color}55`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 800,
                          color: wt?.color,
                        }}
                      >
                        {wingLeft}
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                          {typeData?.number}w{wingLeft}
                        </p>
                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{wingLeftName}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>
                      {wt?.brief}
                    </p>
                    {isActive && (
                      <p style={{ fontSize: 10, fontWeight: 700, color: wt?.color, marginTop: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Your wing
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* Right wing */}
              {(() => {
                const wt = enneagramTypes.find((t) => t.number === wingRight);
                const isActive = profile.enneagramWing?.endsWith(String(wingRight));
                return (
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: 14,
                      background: isActive ? `${wt?.color}15` : "rgba(255,255,255,0.04)",
                      border: isActive ? `1px solid ${wt?.color}40` : "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: `${wt?.color}33`,
                          border: `1.5px solid ${wt?.color}55`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 800,
                          color: wt?.color,
                        }}
                      >
                        {wingRight}
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                          {typeData?.number}w{wingRight}
                        </p>
                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{wingRightName}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>
                      {wt?.brief}
                    </p>
                    {isActive && (
                      <p style={{ fontSize: 10, fontWeight: 700, color: wt?.color, marginTop: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Your wing
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          </SectionCard>
        )}

        {/* ── 5. Tritype ─────────────────────────────────────────────────── */}
        {hasTri && tritypeData && (
          <SectionCard index={4}>
            <SectionHeader icon={<Brain style={{ width: 17, height: 17 }} />} label="Tritype" accent="#a78bfa" />

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              {[tritypeFirst, tritypeSecond, tritypeThird].map((n, i) => {
                const td = enneagramTypes.find((t) => t.number === n);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 11,
                        background: `${td?.color}22`,
                        border: `2px solid ${td?.color}55`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 800,
                        color: td?.color,
                      }}
                    >
                      {n}
                    </div>
                    {i < 2 && (
                      <ChevronRight style={{ width: 14, height: 14, color: "rgba(255,255,255,0.2)" }} />
                    )}
                  </div>
                );
              })}
            </div>

            {tritypeArchetype && (
              <p style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 10 }}>
                {tritypeArchetype}
              </p>
            )}
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 16 }}>
              {tritypeData.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(74,222,128,0.65)", marginBottom: 8 }}>Strengths</p>
                {tritypeData.strengths.slice(0, 3).map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(74,222,128,0.6)", marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{s}</p>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(248,113,113,0.65)", marginBottom: 8 }}>Challenges</p>
                {tritypeData.challenges.slice(0, 3).map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(248,113,113,0.6)", marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        )}

        {/* ── 6. Cognitive Connection ─────────────────────────────────────── */}
        {cognitiveData && typeData && (
          <SectionCard index={5}>
            <SectionHeader icon={<Zap style={{ width: 17, height: 17 }} />} label="Cognitive Connection" accent="#2dd4bf" />

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  padding: "10px 18px",
                  borderRadius: 12,
                  background: "rgba(45,212,191,0.12)",
                  border: "1px solid rgba(45,212,191,0.3)",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#2dd4bf",
                  letterSpacing: "0.04em",
                }}
              >
                {cognitiveData.code}
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{cognitiveData.name}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{cognitiveData.brief}</p>
              </div>
            </div>

            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.7 }}>
              {getCognitiveNote(cognitiveData.code, typeData.number)}
            </p>

            {cognitiveData.stack && cognitiveData.stack.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Function Stack</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {cognitiveData.stack.slice(0, 4).map((fn, i) => (
                    <span
                      key={fn}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        background: i === 0 ? "rgba(45,212,191,0.15)" : "rgba(255,255,255,0.05)",
                        border: i === 0 ? "1px solid rgba(45,212,191,0.35)" : "1px solid rgba(255,255,255,0.1)",
                        color: i === 0 ? "#2dd4bf" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {fn}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </SectionCard>
        )}

        {/* ── 7. Growth Challenges ────────────────────────────────────────── */}
        {challenges.length > 0 && (
          <SectionCard index={6}>
            <SectionHeader icon={<AlertTriangle style={{ width: 17, height: 17 }} />} label="Areas for Growth" accent="#f59e0b" />

            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 16, lineHeight: 1.55 }}>
              Specific, actionable invitations for your growth journey as a Type {typeData?.number}.
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              {challenges.slice(0, 5).map((challenge, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: "rgba(245,158,11,0.05)",
                    border: "1px solid rgba(245,158,11,0.15)",
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 7,
                      background: "rgba(245,158,11,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#f59e0b",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>{challenge}</p>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* ── 8. Daily Insights ───────────────────────────────────────────── */}
        {insights.length > 0 && (
          <SectionCard index={7}>
            <SectionHeader icon={<Lightbulb style={{ width: 17, height: 17 }} />} label="Insights for Your Type" accent="#7c3aed" />

            <div style={{ display: "grid", gap: 14 }}>
              {insights.slice(0, 3).map((insight, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: "3px solid rgba(124,58,237,0.45)",
                    paddingLeft: 18,
                    paddingTop: 4,
                    paddingBottom: 4,
                  }}
                >
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, fontStyle: "italic" }}>
                    "{insight}"
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* ── Journal Prompts ─────────────────────────────────────────────── */}
        {typeData && typeData.journalPrompts.length > 0 && (
          <SectionCard index={8}>
            <SectionHeader icon={<Flame style={{ width: 17, height: 17 }} />} label="Reflection Prompts" accent="#f472b6" />
            <div style={{ display: "grid", gap: 10 }}>
              {typeData.journalPrompts.slice(0, 3).map((prompt, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 12,
                    background: "rgba(244,114,182,0.05)",
                    border: "1px solid rgba(244,114,182,0.15)",
                  }}
                >
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.65 }}>
                    {prompt}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* ── CTA Footer ─────────────────────────────────────────────────── */}
        <motion.div
          custom={9}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ textAlign: "center", marginTop: 32, padding: "0 16px" }}
        >
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>
            This report is generated from your profile data. Update your type on the profile page to refresh it.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "11px 20px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} />
              Back to Profile
            </Link>
            <Link
              href="/enneagram/learn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "11px 20px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Explore Your Type <ChevronRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
