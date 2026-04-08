"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Heart, AlertTriangle, Lightbulb, Feather, Flame, Users, Shield, Zap, Layers, Star, Brain, Eye, Swords, Lock, Sparkles, BookOpen, Info } from "lucide-react";
import { enneagramTypes, type EnneagramType } from "@/data/enneagram";
import { subtypes, instinctualVariants, instinctualStackings } from "@/data/subtypes";
import { tritypes, tritypeCenters } from "@/data/tritypes";
import { naranjoFramework, hornevianGroups, harmonicGroups, objectRelationsGroups, centersOfIntelligence, misidentifications } from "@/data/deep-enneagram";
import { useProfile } from "@/hooks/useProfile";
import { markTopicComplete } from "@/hooks/useGameState";
import NextStepBanner from "@/components/NextStepBanner";
import { Compass as CompassIcon, Users2 } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   Advanced Enneagram content paywall
   ═══════════════════════════════════════════════════════════════════ */
const ENNEAGRAM_ADV_UNLOCK_KEY = "psyche-enneagram-advanced-unlocked";
const ENNEAGRAM_ADV_UNLOCK_COST = 100;

function AdvancedContentGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [tokens, setTokens] = useState(0);
  const [spending, setSpending] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(ENNEAGRAM_ADV_UNLOCK_KEY) === "true");
      const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
      setTokens(typeof gs.tokens === "number" ? gs.tokens : 0);
    } catch { setUnlocked(false); }
  }, []);

  const handleUnlock = () => {
    if (tokens < ENNEAGRAM_ADV_UNLOCK_COST) {
      setErr(`You need ${ENNEAGRAM_ADV_UNLOCK_COST - tokens} more tokens. Earn them through daily practice.`);
      return;
    }
    setSpending(true);
    try {
      const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
      gs.tokens = (typeof gs.tokens === "number" ? gs.tokens : 0) - ENNEAGRAM_ADV_UNLOCK_COST;
      localStorage.setItem("psyche-game-state", JSON.stringify(gs));
      localStorage.setItem(ENNEAGRAM_ADV_UNLOCK_KEY, "true");
      setUnlocked(true);
    } catch { setErr("Something went wrong."); setSpending(false); }
  };

  if (unlocked === null) return null;
  if (unlocked) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-sm mx-auto mt-8 flex flex-col items-center text-center px-4"
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
        <Lock className="w-7 h-7" style={{ color: "#a78bfa" }} />
      </div>
      <h2 className="text-xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>Advanced Enneagram</h2>
      <p className="text-sm mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
        Unlock Instinctual Stackings, Tritypes, and Deep Systems — the full depth of the Enneagram beyond type.
      </p>
      <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-full"
        style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)" }}>
        <Zap className="w-4 h-4 text-amber-400" />
        <span className="text-sm font-bold text-amber-300">{ENNEAGRAM_ADV_UNLOCK_COST} tokens</span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>· you have {tokens}</span>
      </div>
      {err && <p className="text-xs text-red-400 mb-3">{err}</p>}
      <button
        onClick={handleUnlock}
        disabled={spending || tokens < ENNEAGRAM_ADV_UNLOCK_COST}
        className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, #7c3aed, #d946ef)", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}
      >
        {spending ? "Unlocking…" : tokens >= ENNEAGRAM_ADV_UNLOCK_COST ? "Unlock Advanced Content" : "Not enough tokens yet"}
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TYPE NUANCE CARD, static deep insights per type
   ═══════════════════════════════════════════════════════════════════ */
const TYPE_NUANCES: Record<number, string> = {
  1: "Ones are often misread as simply perfectionistic, but the deeper drive is a desperate need to be good in a morally absolute sense. The inner critic isn't external, it is the One's own voice turned inward with relentless intensity. Healthy Ones learn that goodness isn't earned through flawlessness; it is expressed through acceptance of imperfection, both in themselves and the world.",
  2: "Twos are not merely helpful, they are often running from the terror of being unwanted if they show up with needs of their own. The generosity can be genuine and the manipulation unconscious. The core wound isn't about love being withheld; it's about the belief that love must be earned through service. Growth for Twos means discovering they are allowed to receive.",
  3: "Threes don't just want success, they want to become the image of success so completely that they lose track of who they actually are underneath. The efficiency and charm are real, but they often function as armor. The deepest fear isn't failure; it's being exposed as worthless without the achievements. Healthy Threes develop an identity that exists independently of performance.",
  4: "Fours are not simply emotional, they are acutely attuned to the gap between what is and what could be, and they live in that gap. The longing isn't just romantic; it's ontological. They feel something essential is missing from their very being. The irony is that this intense focus on what's absent causes them to overlook the depth they already possess.",
  5: "Fives aren't cold, they are protecting an inner world that feels easily overwhelmed and depleted by contact. The retreat into knowledge is often a substitute for the aliveness they're afraid to fully inhabit. The core fear isn't about being incompetent; it's about being incapable of surviving the demands of life. Healthy Fives discover that engagement doesn't drain them, it restores them.",
  6: "Sixes don't simply worry, they are running an ongoing threat-detection system shaped by a foundational distrust of their own inner guidance. The loyalty they offer is a form of outsourcing authority to trusted sources. What looks like doubt is often a deep, unacknowledged competence that the Six refuses to rely on. Growth means learning to trust what they already know.",
  7: "Sevens aren't just optimistic, they are running from pain with extraordinary creativity and speed. The mental leaping between possibilities isn't purely joyful; it's often an escape from the present moment's limitations. The deepest fear isn't being bored; it's being trapped in suffering with no exit. Healthy Sevens discover that staying with difficulty doesn't destroy them, it deepens them.",
  8: "Eights don't simply want control, they are guarding a tenderness so fierce they learned early to armour it completely. The aggression and intensity are real, but underneath is often a profound protectiveness toward those they love. The core fear isn't weakness; it's betrayal, being vulnerable and then abandoned. Healthy Eights learn that their softness is their greatest strength.",
  9: "Nines don't merely avoid conflict, they have learned to dissolve their own will so completely that they sometimes can't locate what they actually want. The peace they create is often real, but it comes at the cost of their own presence. The deepest pattern isn't laziness; it's a habit of self-forgetting so thorough that asserting their own perspective feels like an act of aggression. Growth means showing up as themselves.",
};

function AiTypeNuanceCard({ typeNumber }: { typeNumber: number }) {
  const insight = TYPE_NUANCES[typeNumber] || "";

  if (!insight) return null;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl p-6"
      style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400/10 to-violet-400/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-900/30 to-transparent rounded-bl-full pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-sm shadow-indigo-900/50">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: "rgba(167,139,250,0.9)" }}>Deep Nuance: Type {typeNumber}</div>
            <div className="text-[10px]" style={{ color: "rgba(167,139,250,0.6)" }}>What most people miss about this type</div>
          </div>
        </div>

        <p className="leading-relaxed text-sm font-serif" style={{ color: "rgba(255,255,255,0.75)" }}>{insight}</p>
      </div>
    </motion.div>
  );
}

function ExpandableSection({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left transition">
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-sky-500" />
          <span className="font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   CollapsibleDeepCard — for deep-systems subgroups with custom colored headers
   ─────────────────────────────────────────────────────────────────────────── */
function CollapsibleDeepCard({
  headerBg,
  border,
  headerContent,
  children,
  defaultOpen = false,
}: {
  headerBg: string;
  border: string;
  headerContent: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-2 transition-opacity active:opacity-70"
        style={{ background: headerBg }}
      >
        <div className="flex-1 min-w-0">{headerContent}</div>
        <div className="mt-0.5 flex-shrink-0">
          {open
            ? <ChevronUp className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
            : <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.03)" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Original teacher perspectives per type
   ─────────────────────────────────────────────────────────────────────────── */
const TEACHER_PERSPECTIVES: Record<number, { ichazo: string; naranjo: string; risoHudson: string }> = {
  1: {
    ichazo: "Oscar Ichazo identified the Holy Idea for this type as Holy Perfection — the direct recognition that reality is already whole and complete. The loss of this perception produces the fixation of Resentment: a compulsive scanning for what is wrong, and a tightening against imperfection that becomes indistinguishable from the person's own conscience.",
    naranjo: "Claudio Naranjo characterized this type's passion as Anger — not explosive rage, but suppressed resentment expressed as relentless demand for correctness. In his clinical work, he observed how the One's inner critic functions as an internalized punishing parent, turned inward with a ferocity that exceeds anything the original environment actually required.",
    risoHudson: "Riso and Hudson placed this type's core fear as being condemned or fundamentally flawed, with the basic desire to be good and to have integrity. In their Levels of Development, the highest expression of this type is the truly principled person who has transcended their own standards into genuine wisdom — accepting imperfection in themselves and the world.",
  },
  2: {
    ichazo: "Ichazo's Holy Idea for this type is Holy Will — the recognition that love does not need to be earned and that genuine will arises naturally from contact with being. The loss of this produces Pride: an inflated self-image built on indispensability, where the Two becomes the giver of love but loses access to being a receiver of it.",
    naranjo: "Naranjo identified Pride as this type's root passion — not arrogance but a rejection of one's own neediness. He described a subtle grandiosity in which the Two maintains a self-image as giver, helper, and sustainer, while remaining unconscious of their own significant emotional hunger. His clinical observations pointed to a deep terror of being ordinary or dispensable.",
    risoHudson: "Riso and Hudson described this type's core fear as being unloved and unwanted, with the basic desire to feel loved. They observed that at average levels the helping becomes conditional — unconsciously building debt — while at high levels of development the Two achieves genuine unconditional love, freely given without agenda or expectation.",
  },
  3: {
    ichazo: "Ichazo assigned Holy Law or Holy Harmony as the Holy Idea — the recognition that value and worth are inherent in being, not produced by doing. The passion is Deceit, but Ichazo meant self-deceit: the Three loses contact with authentic feeling and comes to genuinely believe they are the image they have constructed.",
    naranjo: "Naranjo identified Vanity as the passion — a love of image, but more precisely, an identification so complete with performance and achievement that the Three no longer has access to who they are beneath the performing. He noted that this is among the most culturally rewarded character structures in Western societies, which makes the distortion especially invisible.",
    risoHudson: "Riso and Hudson identified this type's core fear as being worthless, with the basic desire to feel valuable and worthwhile. They introduced the crucial observation that the Three has lost touch with their own heart — not because they lack feeling, but because the feeling center has been bypassed in service of efficient performance. Recovery means finding themselves beneath the role.",
  },
  4: {
    ichazo: "Ichazo's Holy Idea for this type is Holy Origin — the recognition that one's deepest nature is not deficient but connected to all of being. The loss of this produces Envy: a painful sense that others possess something essential the Four is missing, a turning of longing outward rather than inward toward their own inherent depth.",
    naranjo: "Naranjo characterized the Four's passion as Envy, treating it as a structural state — not jealousy of specific things, but a pervasive sense of existential lack. He observed the Four's tendency to use emotional intensity as a substitute for presence, and identified romantic melancholy as a defense against the more unbearable experience of ordinary satisfaction.",
    risoHudson: "Riso and Hudson named this type's core fear as having no personal significance, with the basic desire to find themselves and their significance. They identified the key developmental move as letting go of the past, recognizing that the Four's attachment to their own emotional history is both their richness and their primary obstacle to living fully in the present.",
  },
  5: {
    ichazo: "Ichazo's Holy Idea is Holy Omniscience — the direct knowing that comes from contact with being itself, not from accumulated information. The passion of Avarice describes the Five's hoarding not just of objects but of energy, time, and inner resources, maintained through a deeply held belief that engagement will deplete what little they have.",
    naranjo: "Naranjo characterized this type through the passion of Avarice — a radical withholding from the world, particularly in the domain of self-expression and emotional contact. He observed the Five as living in substitutes for life: ideas and systems replacing the lived experience of being present and engaged. The retreat into knowledge becomes a substitute for aliveness.",
    risoHudson: "Riso and Hudson identified this type's core fear as being helpless, incapable, and overwhelmed, with the basic desire to be capable and competent. They noted that at high levels of development, Fives become visionary thinkers who have integrated their intellectual gifts with genuine presence — no longer observers of life but participants in it.",
  },
  6: {
    ichazo: "Ichazo assigned Holy Strength or Holy Faith as this type's Holy Idea — the inner knowing that support and guidance are available from within. The passion of Fear describes a structural distrust of this inner knowing, producing the constant outsourcing of authority to external sources regarded as more reliable than the Six's own perception.",
    naranjo: "Naranjo identified Cowardice as the root passion — not physical timidity, but a failure to trust one's own inner authority. He distinguished the phobic Six (openly anxious, seeking reassurance) from the counterphobic Six (confronting feared objects aggressively as a defense against fear), both organized around the same structural distrust of the self.",
    risoHudson: "Riso and Hudson identified this type's core fear as being without support and guidance, with the basic desire to have security and support. They made the crucial distinction between authority issues (distrust of external authority) and the underlying problem (distrust of inner authority), identifying self-reliance as this type's central developmental task.",
  },
  7: {
    ichazo: "Ichazo's Holy Idea is Holy Work or Holy Wisdom — the recognition that suffering and limitation are not obstacles to fulfillment but part of a meaningful whole. The passion of Gluttony describes the Seven's compulsive reaching for more experiences and options as a defense against the confrontation with present-moment limitation.",
    naranjo: "Naranjo characterized the Seven's passion as Gluttony — a hunger not for food but for experience, stimulation, and possibility. He observed the Seven as having a particularly sophisticated relationship with pain: the avoidance is not direct denial but a rapid creative reframing that transforms difficulty into opportunity so fast that the pain is never actually felt.",
    risoHudson: "Riso and Hudson identified this type's core fear as being deprived and in pain, with the basic desire to be satisfied and content. They observed that at high levels of development, the Seven integrates the capacity to stay with difficulty and discovers that the depth they sought through variety was available in the present moment all along.",
  },
  8: {
    ichazo: "Ichazo assigned Holy Truth as this type's Holy Idea — the direct recognition of reality as it is, without distortion or pretense. The passion of Lust (intensity) describes the Eight's compulsive need for direct, unmediated contact with reality: a preference for collision over distance, and a fundamental intolerance of anything that feels false or controlled.",
    naranjo: "Naranjo identified this type's passion as Lust — not primarily sexual, but a need for intensity and excess in all domains. He characterized the Eight as someone who learned that vulnerability leads to betrayal and built a character structure organized around preventing any such exposure, becoming formidable enough that betrayal becomes unlikely.",
    risoHudson: "Riso and Hudson identified this type's core fear as being harmed or controlled, with the basic desire to protect themselves and determine their own course. They noted the Eight's great challenge is developing genuine trust — discovering that vulnerability, the thing they protect against most fiercely, is also the source of the deep connection they secretly want.",
  },
  9: {
    ichazo: "Ichazo's Holy Idea for this type is Holy Love — the recognition that one is loved not for what one does or becomes, but for the simple fact of existing. The passion of Sloth is not physical inactivity but a fundamental inertia of the self: a failure to exert oneself in the direction of one's own growth, presence, and becoming.",
    naranjo: "Naranjo characterized the Nine's passion as Laziness — specifically, laziness of self-development: a failure to invest in becoming more fully themselves. He observed the Nine as the most self-forgetting of the types, not because they are simple, but because the self-erasure is so thorough and habitual that it has become invisible even to the Nine themselves.",
    risoHudson: "Riso and Hudson identified this type's core fear as loss and separation, with the basic desire to have inner stability and peace of mind. They observed that the Nine's central developmental challenge is waking up to their own existence — recognizing that the self they keep sacrificing to maintain peace is not a threat to peace but its actual foundation.",
  },
};

function TeacherPerspectivesSection({ typeNumber }: { typeNumber: number }) {
  const data = TEACHER_PERSPECTIVES[typeNumber];
  if (!data) return null;
  return (
    <ExpandableSection title="Original Teachers" icon={BookOpen}>
      <div className="space-y-4">
        <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          How the original architects of the Enneagram understood this type — from Oscar Ichazo&apos;s Arica system and Claudio Naranjo&apos;s clinical adaptations, to Don Riso and Russ Hudson&apos;s contemporary synthesis.
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: "rgba(245,158,11,0.2)", color: "#fcd34d" }}>OI</div>
              <div className="text-xs font-semibold text-amber-400">Oscar Ichazo</div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Arica Institute · Protoanalysis</div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{data.ichazo}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: "rgba(139,92,246,0.2)", color: "#c4b5fd" }}>CN</div>
              <div className="text-xs font-semibold text-violet-400">Claudio Naranjo</div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Character and Neurosis · SAT Program</div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{data.naranjo}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.15)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: "rgba(14,165,233,0.2)", color: "#7dd3fc" }}>RH</div>
              <div className="text-xs font-semibold text-sky-400">Don Riso &amp; Russ Hudson</div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Personality Types · The Enneagram Institute</div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{data.risoHudson}</p>
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
}

// ── Myth vs Reality data ─────────────────────────────────────────────────────
const MYTHS: Record<number, { myth: string; reality: string }[]> = {
  1: [
    { myth: "Ones are controlling perfectionists who boss people around.", reality: "Ones direct their inner critic inward, they judge themselves far more harshly than others. Their standards are primarily a burden they carry, not a weapon." },
    { myth: "Ones are rigid and can't relax.", reality: "Healthy Ones are principled AND joyful. Integration to Seven lets them access spontaneity and genuine delight." },
    { myth: "Ones always follow the rules.", reality: "Ones follow their own internalized moral code, which sometimes puts them at odds with conventional rules when those rules feel unjust." },
  ],
  2: [
    { myth: "Twos are just nice, selfless people.", reality: "Twos have deep needs for love and approval. Their giving is often unconsciously strategic, a way to feel indispensable and loved." },
    { myth: "Twos are doormats.", reality: "Twos can be fierce advocates and even manipulative when their need to be needed is threatened. They can be quite assertive about being needed." },
    { myth: "Twos don't have needs.", reality: "Twos have enormous emotional needs they often can't admit to themselves. Their growth involves learning to ask for what they need directly." },
  ],
  3: [
    { myth: "Threes are shallow status-seekers.", reality: "Threes genuinely believe their worth comes from what they achieve. The performing isn't cynical, it's how they try to earn love." },
    { myth: "Threes know exactly who they are.", reality: "Threes often have no idea who they are beneath the image. 'Who am I when I'm not performing?' is a genuinely terrifying question for them." },
    { myth: "Threes are confident.", reality: "Threes avoid failure precisely because deep down they fear they have no value without success. The confidence is often a performance." },
  ],
  4: [
    { myth: "Fours are just dramatic and self-pitying.", reality: "Fours have an exceptional capacity to feel, and to hold emotional complexity that others deny. This depth is a genuine gift, not just drama." },
    { myth: "Fours want to be miserable.", reality: "Fours romanticize suffering not because they enjoy it, but because they're more comfortable with intense feeling than with the flat ordinary." },
    { myth: "Fours are always sad.", reality: "Healthy Fours are among the most creatively alive, empathically present, and deeply authentic people you'll meet." },
  ],
  5: [
    { myth: "Fives are cold and emotionless.", reality: "Fives feel deeply but experience emotions as overwhelming. Their emotional world is private and intense, not absent." },
    { myth: "Fives are antisocial.", reality: "Fives deeply value their few close relationships. They withdraw to protect their energy, not because they dislike people." },
    { myth: "Fives just want to be left alone.", reality: "Fives want to connect, but on their own terms and timeline. Forced social interaction depletes; chosen connection nourishes." },
  ],
  6: [
    { myth: "Sixes are cowardly and anxious.", reality: "Sixes can be extraordinarily courageous precisely because they feel fear and move through it anyway. Many Sixes are counter-phobic and appear fearless." },
    { myth: "Sixes are paranoid.", reality: "Sixes have a sophisticated ability to anticipate problems and see through hidden agendas. This threat-detection, in healthy range, is a superpower." },
    { myth: "Sixes need constant reassurance.", reality: "Healthy Sixes develop genuine inner knowing and can trust themselves. Their growth is toward self-trust, not dependency." },
  ],
  7: [
    { myth: "Sevens are just hedonists who avoid responsibility.", reality: "Sevens use busyness and positivity to escape anxiety about pain and limitation. The constant motion is a defense, not mere selfishness." },
    { myth: "Sevens are always happy.", reality: "Sevens have enormous anxiety underneath. The happiness is real, but it's also a strategy against experiencing deprivation or suffering." },
    { myth: "Sevens are shallow.", reality: "Healthy Sevens are deeply curious, generative, and capable of extraordinary commitment when they find their true purpose." },
  ],
  8: [
    { myth: "Eights are bullies who like dominating others.", reality: "Eights move first because they've learned that vulnerability leads to being controlled or betrayed. Their toughness is self-protection." },
    { myth: "Eights don't have soft feelings.", reality: "Eights have enormous tenderness they guard fiercely. Their anger often shields a deep loyalty and love for those they protect." },
    { myth: "Eights are always confrontational.", reality: "Eights choose their battles. With people they trust, they can be remarkably gentle, playful, and open-hearted." },
  ],
  9: [
    { myth: "Nines are just passive and easy-going.", reality: "Nines have a deep, persistent passive resistance that can be one of the most stubborn forces in the Enneagram. Their compliance conceals enormous hidden agendas." },
    { myth: "Nines don't have strong opinions.", reality: "Nines do have opinions, they just struggle to prioritize them. When they finally wake up to their own position, they can be immovable." },
    { myth: "Nines are peaceful because they're content.", reality: "Nines have numbed themselves to inner conflict to avoid disruption. The peace is a practiced avoidance, not genuine equanimity." },
  ],
};

// ── Type in Action data ──────────────────────────────────────────────────────
const TYPE_IN_ACTION: Record<number, { conflict: string; love: string; work: string; stress: string }> = {
  1: { conflict: "Becomes precise and critical; lays out exactly what went wrong. May lecture or repeat their point. Often represses anger and expresses it as icy correctness or biting sarcasm.", love: "Highly devoted but can be critical of the partner. Shows love through acts of service and improvement. Struggles to express warmth spontaneously.", work: "Sets high standards, catches errors others miss, leads by example. Can become resentful when others don't match their effort.", stress: "Becomes anxious and scattered, suddenly acting impulsive or self-indulgent in ways very unlike their usual self (moves to 4, then 7 under extreme stress)." },
  2: { conflict: "Withdraws hurt feelings while continuing to help, then eventually explodes. May guilt-trip or become martyr-like. Rarely names what they actually need.", love: "Highly attentive and caring; intuits their partner's needs. Can become possessive or manipulative if their own love needs go unmet.", work: "Builds strong relationships; becomes the person everyone trusts. Can overextend, struggle to say no, or become resentful of being taken for granted.", stress: "Becomes aggressive and domineering, suddenly asserting needs they've suppressed for too long. Can shift to controlling or demanding (moves to 8)." },
  3: { conflict: "Becomes more promotional of their position; frames the conflict in terms of outcomes. May dismiss emotional aspects as inefficient. Avoids looking bad.", love: "Highly attentive initially; may be more focused on the relationship's image than its depth. Struggles to be genuinely vulnerable with partners.", work: "Drives results, adapts communication style to each audience, thrives in competitive environments. Can shade truth to maintain image.", stress: "Becomes disengaged, apathetic, and melancholic, suddenly losing motivation and withdrawing from the performing mode (moves to 9)." },
  4: { conflict: "Feels the emotional wound intensely; may withdraw or respond with dramatic language. Focuses on the meaning behind the conflict, not just the facts.", love: "Deeply romantic and intense; idealizes partners then feels devastated by ordinary relationship reality. Needs to feel truly seen and special.", work: "Brings exceptional creativity and originality; can struggle with routine tasks. Needs work that feels meaningful and authentic.", stress: "Becomes hyperactive and scattered, throwing themselves into busyness to escape the pain (moves to 2, or overworks like a 1)." },
  5: { conflict: "Retreats internally; needs time to process before responding. Hates being ambushed with emotional demands. May respond days later with a well-formulated email.", love: "Extremely loyal and devoted within chosen relationships. Needs significant alone time even in close relationships. Shows love through presence and thought.", work: "Thrives in deep focus work; the go-to expert. Struggles with open-office environments, constant meetings, and interpersonal politics.", stress: "Becomes hyperactive and impulsive, suddenly acting out in ways completely out of character, scattered and disorganized (moves to 7)." },
  6: { conflict: "Tests the relationship; may become aggressive to see if the other person will stay. Looks for proof of loyalty. Can be accusatory or suspicious.", love: "Among the most loyal partners when trust is established. Takes commitment seriously; needs consistent reassurance early on. Extremely warm once safe.", work: "Builds strong team loyalty, anticipates problems, excellent at risk assessment. Can be slow to decide due to worst-case thinking.", stress: "Becomes competitive, arrogant, and aggressive, temporarily acting out the opposite of their usual cooperative style (moves to 3 or 9 under extreme stress)." },
  7: { conflict: "Reframes the conflict as fixable and moves quickly past it. May minimize the other person's hurt. Has a strong aversion to sustained negative feeling.", love: "Highly playful and fun partners; bring joy and adventure. Can struggle with sustained depth, commitment, or sitting with partner's pain.", work: "Generates ideas prolifically, keeps team energy high, makes tedious work fun. Struggles to finish projects, follow through on details.", stress: "Becomes perfectionistic and self-critical, suddenly fixating on what's wrong rather than what's possible (moves to 1)." },
  8: { conflict: "Confronts directly and immediately. Respects others who stand their ground. Tests whether you'll fight back or fold. Forgives quickly once it's out.", love: "Fiercely protective and generous with people they love. Needs to feel trusted, not managed. Reveals tenderness only to the very few they trust.", work: "Takes charge naturally; makes things happen. Can dominate meetings, steamroll others' ideas, or see subtlety as weakness.", stress: "Withdraws, becomes reclusive and secretive, isolating in an uncharacteristic way (moves to 5)." },
  9: { conflict: "Avoids it as long as possible. Uses passive resistance, agreeing but not following through. Can suddenly explode after prolonged suppression of a position.", love: "Highly accommodating and supportive partner. Can lose their own identity in the relationship. Needs to be encouraged to voice their true preferences.", work: "Excellent mediator and team player. Can struggle with deadlines, taking initiative, or saying no to additional requests.", stress: "Becomes anxious, hypervigilant, and worry-prone, suddenly alert to all the problems they'd been ignoring (moves to 6)." },
};

// ── Flip Card Component ───────────────────────────────────────────────────────
function FlipCard({ myth, reality, color }: { myth: string; reality: string; color: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      {!flipped ? (
        <div className="rounded-2xl p-4" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.2)" }}>
              <span className="text-[10px] font-bold" style={{ color: "#f87171" }}>X</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#f87171" }}>Myth</span>
          </div>
          <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{myth}</p>
          <div className="text-[10px] mt-3" style={{ color: "rgba(248,113,113,0.6)" }}>Tap to reveal reality</div>
        </div>
      ) : (
        <div className="rounded-2xl border p-4" style={{ backgroundColor: `${color}18`, borderColor: `${color}35` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}30` }}>
              <span className="text-[10px] font-bold" style={{ color }}>OK</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>Reality</span>
          </div>
          <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>{reality}</p>
          <div className="text-[10px] mt-3" style={{ color: `${color}80` }}>Tap to see myth</div>
        </div>
      )}
    </div>
  );
}

function MythRealitySection({ typeNumber, typeColor }: { typeNumber: number; typeColor: string }) {
  const myths = MYTHS[typeNumber] || [];
  if (!myths.length) return null;
  return (
    <ExpandableSection title="Myth vs Reality" icon={Eye}>
      <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Tap each card to reveal what&apos;s actually true.</p>
      <div className="grid sm:grid-cols-3 gap-3">
        {myths.map((item, i) => (
          <FlipCard key={i} myth={item.myth} reality={item.reality} color={typeColor} />
        ))}
      </div>
    </ExpandableSection>
  );
}

function TypeInAction({ typeNumber, typeColor }: { typeNumber: number; typeColor: string }) {
  const data = TYPE_IN_ACTION[typeNumber];
  if (!data) return null;
  const scenarios = [
    { label: "In Conflict", content: data.conflict, style: { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }, labelColor: "#f87171" },
    { label: "In Love", content: data.love, style: { background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.18)" }, labelColor: "#f472b6" },
    { label: "At Work", content: data.work, style: { background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.18)" }, labelColor: "#38bdf8" },
    { label: "Under Stress", content: data.stress, style: { background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.18)" }, labelColor: "#fbbf24" },
  ];
  return (
    <ExpandableSection title="Type in Action" icon={Zap}>
      <div className="grid sm:grid-cols-2 gap-3">
        {scenarios.map((s) => (
          <div key={s.label} className="rounded-2xl p-4" style={s.style}>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: s.labelColor }}>{s.label}</div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>{s.content}</p>
          </div>
        ))}
      </div>
    </ExpandableSection>
  );
}

function TypeDetail({ type }: { type: EnneagramType }) {
  const typeSubtypes = subtypes.filter((s) => s.type === type.number);
  const relatedTritypes = tritypes.filter((t) => t.code.split("").map(Number).includes(type.number));

  return (
    <div className="max-w-3xl mx-auto page-enter">

      {/* Sources citation banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl mb-5" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
        <BookOpen className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs leading-relaxed font-mono" style={{ color: "rgba(196,181,253,0.85)" }}>
          Sources: Naranjo, <em>Character &amp; Neurosis</em> (1994) · Ichazo protoanalysis · Chestnut, <em>The Complete Enneagram</em> (2013) · Riso-Hudson, <em>Wisdom of the Enneagram</em> (1999) · Horney, <em>Our Inner Conflicts</em> (1945)
        </div>
      </div>

      {/* Header */}
      <div className="p-8 rounded-3xl mb-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-serif font-bold shrink-0" style={{ backgroundColor: type.color }}>
            {type.number}
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>{type.name}</h2>
            <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{type.alias}</p>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{type.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {type.keyTraits.map((trait) => (
                <span key={trait} className="px-3 py-1 text-xs rounded-lg font-medium" style={{ backgroundColor: `${type.color}20`, color: type.color }}>{trait}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wings */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Left Wing</div>
          <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{type.wings.left}</div>
        </div>
        <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Right Wing</div>
          <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{type.wings.right}</div>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-3">
        <ExpandableSection title="Core Motivation & Fears" icon={Heart} defaultOpen>
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)" }}>
              <div className="text-xs font-medium text-emerald-400 mb-1">Core Desire</div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>{type.coreDesire}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
              <div className="text-xs font-medium text-rose-400 mb-1">Core Fear</div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>{type.coreFear}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.18)" }}>
              <div className="text-xs font-medium text-sky-400 mb-1">Core Motivation</div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>{type.coreMotivation}</p>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection title="Levels of Development" icon={TrendingUp}>
          <div className="space-y-4">
            <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              Riso &amp; Hudson identified 9 levels for each type, from healthiest (Level 1) to most destructive (Level 9). Most people operate between Levels 3–7. These traits show how the type looks at each range.
            </p>
            <div>
              <div className="text-xs font-medium text-emerald-400 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Healthy</div>
              <div className="flex flex-wrap gap-2">
                {type.healthyTraits.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-lg font-medium" style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}>{t}</span>)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-amber-400 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Average</div>
              <div className="flex flex-wrap gap-2">
                {type.averageTraits.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-lg font-medium" style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>{t}</span>)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-rose-400 mb-2 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Unhealthy</div>
              <div className="flex flex-wrap gap-2">
                {type.unhealthyTraits.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-lg font-medium" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>{t}</span>)}
              </div>
            </div>
          </div>
        </ExpandableSection>

        {/* SUBTYPES — Beatrice Chestnut's framework */}
        <ExpandableSection title="Instinctual Subtypes" icon={Flame}>
          <div className="space-y-4">
            <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
              Every type has three versions depending on your dominant survival drive. <strong style={{ color: "rgba(255,255,255,0.82)" }}>Self-Preservation (SP)</strong> = focused on safety, resources, and the body. <strong style={{ color: "rgba(255,255,255,0.82)" }}>Social (SO)</strong> = focused on belonging and group dynamics. <strong style={{ color: "rgba(255,255,255,0.82)" }}>Sexual/One-to-One (SX)</strong> = focused on intensity and deep connection. One of these colors your whole type. Based on Beatrice Chestnut&apos;s <em>The Complete Enneagram</em> and Naranjo&apos;s framework. The <span className="font-medium" style={{ color: "#a78bfa" }}>countertype</span> is the subtype that looks least like the core type.
            </p>
            {typeSubtypes.map((sub) => (
              <div key={sub.instinct} className="p-5 rounded-xl" style={sub.isCountertype ? { background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" } : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs font-mono font-bold rounded" style={
                    sub.instinct === "sp" ? { background: "rgba(34,197,94,0.15)", color: "#4ade80" } :
                    sub.instinct === "sx" ? { background: "rgba(239,68,68,0.15)", color: "#f87171" } :
                    { background: "rgba(14,165,233,0.15)", color: "#38bdf8" }
                  }>{sub.instinct.toUpperCase()}</span>
                  <span className="font-serif font-semibold text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{sub.name}</span>
                  {sub.isCountertype && (
                    <span className="px-2 py-0.5 text-[10px] font-medium rounded" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}>COUNTERTYPE</span>
                  )}
                </div>
                <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Chestnut: &ldquo;{sub.chestnutName}&rdquo;</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>{sub.description}</p>
                <div className="space-y-1.5 mb-3">
                  {sub.keyPatterns.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.25)" }} />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg mb-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>How this differs</div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{sub.howTheyDiffer}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: "rgba(34,197,94,0.08)" }}>
                  <div className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider mb-1">Growth Path</div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{sub.growthPath}</p>
                </div>
              </div>
            ))}
          </div>
        </ExpandableSection>

        {/* Growth Path */}
        <ExpandableSection title="Integration & Growth" icon={Lightbulb}>
          <div className="space-y-4">
            <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              When you&apos;re growing, you take on the positive qualities of another type (your <strong style={{ color: "rgba(255,255,255,0.7)" }}>integration line</strong>). Under stress, you take on the unhealthy qualities of a different type (your <strong style={{ color: "rgba(255,255,255,0.7)" }}>disintegration line</strong>). These are automatic shifts, not choices.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl text-center" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)" }}>
                <div className="text-xs text-emerald-400 mb-1">Integration (Growth)</div>
                <div className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>→ Type {type.integrationLine}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{enneagramTypes.find(t => t.number === type.integrationLine)?.name}</div>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <div className="text-xs text-rose-400 mb-1">Disintegration (Stress)</div>
                <div className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>→ Type {type.disintegrationLine}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{enneagramTypes.find(t => t.number === type.disintegrationLine)?.name}</div>
              </div>
            </div>
            <div className="space-y-2">
              {type.growthTips.map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5" style={{ background: "rgba(14,165,233,0.2)", color: "#38bdf8" }}>{i + 1}</div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </ExpandableSection>

        {/* Tritypes */}
        <ExpandableSection title="Tritypes Involving This Type" icon={Layers}>
          <div className="space-y-3">
            <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
              Your tritype is a combination of three types, one from each intelligence center: <strong style={{ color: "rgba(255,255,255,0.75)" }}>Head</strong> (5, 6, or 7), <strong style={{ color: "rgba(255,255,255,0.75)" }}>Heart</strong> (2, 3, or 4), and <strong style={{ color: "rgba(255,255,255,0.75)" }}>Gut</strong> (8, 9, or 1). You lead with your core type but draw on the others in different situations. Below are tritypes involving Type {type.number}.
            </p>
            <div className="grid gap-3">
              {relatedTritypes.slice(0, 12).map((tri) => (
                <div key={tri.code} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono font-bold text-sm" style={{ color: "#38bdf8" }}>{tri.code}</span>
                    <span className="font-serif font-semibold text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{tri.archetype}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{tri.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] font-medium text-emerald-400 mb-1">Strengths</div>
                      {tri.strengths.map((s, i) => (
                        <div key={i} className="text-[11px] flex items-start gap-1" style={{ color: "rgba(255,255,255,0.5)" }}><span className="text-emerald-400 mt-0.5">+</span> {s}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-amber-400 mb-1">Challenges</div>
                      {tri.challenges.map((c, i) => (
                        <div key={i} className="text-[11px] flex items-start gap-1" style={{ color: "rgba(255,255,255,0.5)" }}><span className="text-amber-400 mt-0.5">-</span> {c}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ExpandableSection>

        {/* DEEP PSYCHOLOGY — Naranjo Framework */}
        {(() => {
          const naranjo = naranjoFramework.find(n => n.type === type.number);
          if (!naranjo) return null;
          return (
            <ExpandableSection title="Deep Psychology (Naranjo/Ichazo)" icon={Brain}>
              <div className="space-y-4">
                <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>From Claudio Naranjo&apos;s <em>Character and Neurosis</em> and Oscar Ichazo&apos;s protoanalysis. These are the deep structural patterns beneath the surface behaviors.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
                    <div className="text-xs font-medium text-rose-400 mb-1">Passion (Vice)</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>{naranjo.passion}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{naranjo.passionDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.18)" }}>
                    <div className="text-xs font-medium text-amber-400 mb-1">Fixation (Cognitive Distortion)</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>{naranjo.fixation}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{naranjo.fixationDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)" }}>
                    <div className="text-xs font-medium text-emerald-400 mb-1">Virtue (Transformation)</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>{naranjo.virtue}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{naranjo.virtueDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.18)" }}>
                    <div className="text-xs font-medium text-sky-400 mb-1">Holy Idea (Ichazo)</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>{naranjo.holyIdea}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{naranjo.holyIdeaDescription}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)" }}>
                    <div className="text-xs font-medium text-violet-400 mb-1">Trap</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>{naranjo.trap}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{naranjo.trapDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Defense Mechanism</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>{naranjo.defenseM}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{naranjo.defenseMDescription}</p>
                  </div>
                </div>
              </div>
            </ExpandableSection>
          );
        })()}

        {/* Original Teachers — Ichazo, Naranjo, Riso-Hudson */}
        <TeacherPerspectivesSection typeNumber={type.number} />

        {/* Misidentification — Common Confusions */}
        {(() => {
          const misids = misidentifications.filter(m => m.types.includes(type.number));
          if (misids.length === 0) return null;
          return (
            <ExpandableSection title="Am I Actually This Type?" icon={Eye}>
              <div className="space-y-3">
                <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Sometimes people misidentify their type because two types can look similar on the surface. Here&apos;s how to tell if you&apos;re actually a different type, and the key question to ask yourself.</p>
                {misids.map((m, i) => {
                  const otherType = m.types[0] === type.number ? m.types[1] : m.types[0];
                  return (
                    <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>Type {type.number} vs Type {otherType}</span>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>({enneagramTypes[otherType - 1]?.name})</span>
                      </div>
                      <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.55)" }}><strong style={{ color: "rgba(255,255,255,0.72)" }}>Why confused:</strong> {m.whyConfused}</div>
                      <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.55)" }}><strong style={{ color: "rgba(255,255,255,0.72)" }}>Key difference:</strong> {m.keyDifference}</div>
                      <div className="p-3 rounded-lg" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}>
                        <div className="text-[10px] font-medium text-sky-400 mb-1">Ask Yourself</div>
                        <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.72)" }}>{m.testQuestion}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ExpandableSection>
          );
        })()}

        {/* Triadic Groups */}
        <ExpandableSection title="Triadic Groupings" icon={Users}>
          <div className="space-y-4">
            <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              The Enneagram groups types in three different ways. Each grouping reveals a pattern you share with certain other types, useful for understanding why you might relate to types beyond your core number. Based on Karen Horney, Riso-Hudson, and Object Relations theory.
            </p>
            {(() => {
              const hornevian = hornevianGroups.find(g => g.types.includes(type.number));
              const harmonic = harmonicGroups.find(g => g.types.includes(type.number));
              const objRel = objectRelationsGroups.find(g => g.types.includes(type.number));
              return (
                <div className="space-y-3">
                  {hornevian && (
                    <div className="p-4 rounded-xl" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)" }}>
                      <div className="text-xs font-medium mb-1" style={{ color: "#a5b4fc" }}>Hornevian: {hornevian.name}</div>
                      <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Types {hornevian.types.join(", ")} · Strategy: {hornevian.strategy}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{hornevian.description}</p>
                    </div>
                  )}
                  {harmonic && (
                    <div className="p-4 rounded-xl" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)" }}>
                      <div className="text-xs font-medium text-emerald-400 mb-1">Harmonic: {harmonic.name}</div>
                      <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Types {harmonic.types.join(", ")} · Response: {harmonic.response}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{harmonic.description}</p>
                    </div>
                  )}
                  {objRel && (
                    <div className="p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)" }}>
                      <div className="text-xs font-medium text-violet-400 mb-1">Object Relations: {objRel.name}</div>
                      <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Types {objRel.types.join(", ")} · {objRel.relationship}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{objRel.psychodynamics}</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </ExpandableSection>

        {/* Journal Prompts */}
        <ExpandableSection title="Journal Prompts" icon={Feather}>
          <div className="space-y-3">
            {type.journalPrompts.map((prompt, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.15)" }}>
                <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.75)" }}>&ldquo;{prompt}&rdquo;</p>
              </div>
            ))}
          </div>
        </ExpandableSection>

        {/* Deep Psychology Dropdown Sections — from enneagram.ts dropdownSections */}
        {type.dropdownSections && type.dropdownSections.length > 0 && (
          <>
            <div className="text-xs font-mono uppercase tracking-wider mb-1 mt-2" style={{ color: "rgba(167,139,250,0.6)" }}>
              Deep Psychology
            </div>
            {type.dropdownSections.map((section, i) => (
              <ExpandableSection key={i} title={section.title} icon={BookOpen}>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{section.content}</p>
              </ExpandableSection>
            ))}
          </>
        )}

        {/* Myth vs Reality Flip Cards */}
        <MythRealitySection typeNumber={type.number} typeColor={type.color} />

        {/* Type in Action */}
        <TypeInAction typeNumber={type.number} typeColor={type.color} />

        {/* AI Type Nuance */}
        <AiTypeNuanceCard typeNumber={type.number} />
      </div>
    </div>
  );
}

function LearnContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const [selectedType, setSelectedType] = useState<number | null>(typeParam ? parseInt(typeParam) : null);
  const [learnTab, setLearnTab] = useState<"types" | "instincts" | "stackings" | "tritypes" | "deepsystems">("types");
  const [advUnlocked, setAdvUnlocked] = useState(false);
  const { profile } = useProfile();
  const myType = profile.enneagramType ?? null; // reactive, updates when type changes

  // Mark "Enneagram Basics" as complete when this page is visited
  useEffect(() => {
    markTopicComplete("enneagram-basics");
    try {
      setAdvUnlocked(localStorage.getItem(ENNEAGRAM_ADV_UNLOCK_KEY) === "true");
    } catch {}
  }, []);

  // Auto-load user's type from profile if no URL param
  useEffect(() => {
    if (typeParam) {
      setSelectedType(parseInt(typeParam));
      setLearnTab("types");
    } else {
      try {
        const raw = localStorage.getItem("psyche-profile");
        if (raw) {
          const p = JSON.parse(raw);
          const savedType = p.enneagramType ?? p.enneagramCore;
          if (savedType) setSelectedType(savedType);
        }
      } catch {}
    }
  }, [typeParam]);

  return (
    <div className="min-h-screen py-12" style={{ background: "#0f0a1e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>Learn the Enneagram</h1>
              <p style={{ color: "rgba(255,255,255,0.5)" }}>Explore types, subtypes, instinctual stackings, tritypes, and deep psychology.</p>
            </div>
            {selectedType && (
              <Link href="/daily" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)", color: "#fb923c" }}>
                Daily Practice, quiz + insight →
              </Link>
            )}
          </div>
        </div>

        {/* Top-level tabs — same for everyone */}
        <div className="flex gap-1 p-1 rounded-xl w-fit mb-8 flex-wrap" style={{ background: "rgba(255,255,255,0.06)" }}>
          {[
            { key: "types" as const, label: "9 Types", premium: false },
            { key: "instincts" as const, label: "Instinctual Variants", premium: false },
            { key: "stackings" as const, label: "Stackings", premium: true },
            { key: "tritypes" as const, label: "Tritypes", premium: true },
            { key: "deepsystems" as const, label: "Deep Systems", premium: true },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setLearnTab(tab.key)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5"
              style={learnTab === tab.key
                ? { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)" }
                : { color: "rgba(255,255,255,0.45)" }
              }>
              {tab.label}
              {tab.premium && !advUnlocked && <Lock className="w-3 h-3 opacity-50" />}
            </button>
          ))}
        </div>
        {/* Hint when no type selected */}
        {learnTab === "types" && !selectedType && (
          <div className="flex flex-col gap-3 p-4 rounded-2xl mb-6 max-w-xl" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.18)" }}>
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm" style={{ color: "rgba(186,230,253,0.9)" }}>
                Not sure where to start? Pick any type that sounds familiar, or{" "}
                <Link href="/enneagram/assess" className="font-semibold underline underline-offset-2">take the assessment</Link>{" "}
                to discover your type.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center mt-1">
              {[1,2,3,4,5,6,7,8,9].map(t => (
                <button key={t} onClick={() => setSelectedType(t)}
                  className="w-9 h-9 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Types Tab */}
        {learnTab === "types" && (
          <>
            {/* What is the Enneagram explainer — shown when no type selected */}
            {!selectedType && (
              <div className="max-w-2xl mb-8 p-6 rounded-3xl" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.14)" }}>
                <h3 className="font-serif font-bold text-lg mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>What is the Enneagram?</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                  The Enneagram is a map of 9 personality types, each driven by a different core motivation and fear. Unlike surface-level tests, it describes <em>why</em> you do what you do, not just what you do. It&apos;s a tool for self-understanding, not a label.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto mb-1.5" style={{ background: "rgba(14,165,233,0.15)" }}>
                      <Lightbulb className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div className="font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Core Motivation</div>
                    <div>The deep &ldquo;why&rdquo; behind your actions</div>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto mb-1.5" style={{ background: "rgba(239,68,68,0.15)" }}>
                      <Shield className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                    <div className="font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Core Fear</div>
                    <div>What you&apos;re unconsciously trying to avoid</div>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto mb-1.5" style={{ background: "rgba(34,197,94,0.15)" }}>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Growth Path</div>
                    <div>How each type develops and heals</div>
                  </div>
                </div>
                <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>Pick any type below to start, or take the <Link href="/enneagram/assess" className="font-medium underline underline-offset-2" style={{ color: "#38bdf8" }}>assessment</Link> to find yours.</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mb-10 items-end">
              {enneagramTypes.map((type) => {
                const isSelected = selectedType === type.number;
                const isMyType = myType === type.number;
                return (
                  <div key={type.number} className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => setSelectedType(type.number)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isSelected
                          ? "text-white shadow-lg scale-105"
                          : isMyType
                          ? "border-2 shadow-sm hover:scale-105"
                          : "border hover:border-sky-500/40"
                      }`}
                    style={
                      isSelected
                        ? { backgroundColor: type.color }
                        : isMyType
                        ? { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)", borderColor: type.color, boxShadow: `0 0 0 1px ${type.color}22, 0 2px 8px ${type.color}22` }
                        : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.65)", borderColor: "rgba(255,255,255,0.1)" }
                    }
                    >
                      <span className="text-xs">{type.icon}</span>
                      {type.number}. {type.name.split("The ")[1]}
                    </button>
                    {isMyType && (
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white leading-none"
                        style={{ backgroundColor: type.color }}
                      >
                        My Type
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {selectedType ? (
              (() => { const t = enneagramTypes.find((et) => et.number === selectedType); return t ? <TypeDetail key={selectedType} type={t} /> : <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Type not found.</p>; })()
            ) : null}
          </>
        )}

        {/* Instinctual Variants Tab */}
        {learnTab === "instincts" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              The three instinctual variants, Self-Preservation (SP), Sexual/One-to-One (SX), and Social (SO), are biological drives that shape how each Enneagram type expresses itself. Beatrice Chestnut&apos;s research identifies 27 distinct subtypes (3 per type), each with a countertype that looks least like the core type.
            </p>
            {instinctualVariants.map((iv) => (
              <div key={iv.code} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-sm font-mono font-bold rounded-lg" style={
                    iv.code === "sp" ? { background: "rgba(34,197,94,0.15)", color: "#4ade80" } :
                    iv.code === "sx" ? { background: "rgba(239,68,68,0.15)", color: "#f87171" } :
                    { background: "rgba(14,165,233,0.15)", color: "#38bdf8" }
                  }>{iv.code.toUpperCase()}</span>
                  <h3 className="font-serif font-semibold text-lg" style={{ color: "rgba(255,255,255,0.88)" }}>{iv.fullName}</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>{iv.description}</p>
                <div className="p-3 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>Core Drive</div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{iv.coreDrive}</p>
                </div>
                <div className="mb-4">
                  <div className="text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>Focus Areas</div>
                  <div className="space-y-1.5">
                    {iv.focus.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400/60 mt-2 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl" style={{ background: "rgba(34,197,94,0.07)" }}>
                    <div className="text-xs font-medium text-emerald-400 mb-2">Strengths</div>
                    <div className="space-y-1">
                      {iv.strengths.map((s) => <div key={s} className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{s}</div>)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.07)" }}>
                    <div className="text-xs font-medium text-amber-400 mb-2">Blind Spots</div>
                    <div className="space-y-1">
                      {iv.blindSpots.map((b) => <div key={b} className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{b}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stackings Tab */}
        {learnTab === "stackings" && (
          <AdvancedContentGate>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Your instinctual stacking is the order of priority of your three instincts. Your dominant instinct shapes your primary focus, your secondary supports it, and your blind spot is the instinct you neglect most. There are six possible stackings.
            </p>
            {instinctualStackings.map((stack) => (
              <div key={stack.code} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono font-bold text-lg" style={{ color: "#38bdf8" }}>{stack.code}</span>
                  <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{stack.name}</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>{stack.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-3 rounded-xl text-center" style={{ background: "rgba(34,197,94,0.08)" }}>
                    <div className="text-[10px] text-emerald-400 font-medium">Dominant</div>
                    <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.78)" }}>{stack.dominant}</div>
                  </div>
                  <div className="p-3 rounded-xl text-center" style={{ background: "rgba(14,165,233,0.08)" }}>
                    <div className="text-[10px] text-sky-400 font-medium">Secondary</div>
                    <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.78)" }}>{stack.secondary}</div>
                  </div>
                  <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>Blind Spot</div>
                    <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{stack.blind}</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {stack.characteristics.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400/60 mt-2 shrink-0" />{c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </AdvancedContentGate>
        )}

        {/* Tritypes Tab */}
        {learnTab === "tritypes" && (
          <AdvancedContentGate>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Katherine Fauvre&apos;s Tritype theory proposes that each person uses one type from each of the three centers of intelligence. Your tritype (e.g., 531) shows your dominant strategy in Head (5/6/7), Heart (2/3/4), and Gut (8/9/1). Combined with your instinctual stacking, this creates a highly specific personality profile (e.g., sx/so 531 INTJ).
            </p>

            {/* Centers */}
            <div className="grid gap-4">
              {tritypeCenters.map((center) => (
                <div key={center.name} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h3 className="font-serif font-semibold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>{center.name}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>{center.description}</p>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(14,165,233,0.08)" }}>
                    <div className="text-xs font-medium text-sky-400 mb-1">Key Question</div>
                    <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.72)" }}>{center.question}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* All Tritypes */}
            <h3 className="font-serif font-semibold text-lg mt-8" style={{ color: "rgba(255,255,255,0.88)" }}>All Tritype Thyselfs</h3>
            <div className="grid gap-3">
              {tritypes.map((tri) => (
                <div key={tri.code} className="p-4 rounded-xl transition" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono font-bold" style={{ color: "#38bdf8" }}>{tri.code}</span>
                    <span className="font-serif font-semibold text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{tri.archetype}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{tri.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] font-medium text-emerald-400 mb-1">Strengths</div>
                      {tri.strengths.map((s, i) => (
                        <div key={i} className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>+ {s}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-amber-400 mb-1">Challenges</div>
                      {tri.challenges.map((c, i) => (
                        <div key={i} className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>- {c}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </AdvancedContentGate>
        )}

        {/* Deep Systems Tab */}
        {learnTab === "deepsystems" && (
          <AdvancedContentGate>
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Beyond the 9 types, the Enneagram contains several meta-systems that reveal deeper patterns. These groupings come from Karen Horney&apos;s psychoanalytic framework, Don Riso &amp; Russ Hudson&apos;s research, and object relations theory.
            </p>

            {/* Centers of Intelligence */}
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4" style={{ color: "rgba(255,255,255,0.88)" }}>Centers of Intelligence</h3>
              <div className="space-y-4">
                {centersOfIntelligence.map((center) => (
                  <div key={center.name} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{center.name}</h4>
                      <span className="px-2 py-0.5 text-xs rounded font-medium" style={{ background: "rgba(239,68,68,0.12)", color: "#f87171" }}>Core: {center.coreEmotion}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>{center.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}><span style={{ color: "rgba(255,255,255,0.4)" }}>Core type:</span> <span className="font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>{center.dominantType}</span></div>
                      <div className="p-2 rounded-lg" style={{ background: "rgba(34,197,94,0.07)" }}><span className="text-emerald-400">Over-expressed:</span> <span className="font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>{center.overExpressed}</span></div>
                      <div className="p-2 rounded-lg" style={{ background: "rgba(245,158,11,0.07)" }}><span className="text-amber-400">Under-expressed:</span> <span className="font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>{center.underExpressed}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The Horney Triads — expanded teaching section */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-serif font-semibold text-lg" style={{ color: "rgba(255,255,255,0.88)" }}>The Horney Triads</h3>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc" }}>Karen Horney · Riso-Hudson</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                Karen Horney (1945) identified three fundamental strategies for managing anxiety and getting needs met in a world that feels threatening. Don Riso and Russ Hudson adapted these into the Enneagram as the Hornevian groups — revealing the social strategy layer beneath each type&apos;s surface behavior. These groupings cut across the three intelligence centers, showing that even within the same center, types can have radically different orientations to the world.
              </p>
              <div className="space-y-5 mb-8">
                {/* Moving Toward (Compliant) */}
                <CollapsibleDeepCard
                  border="1px solid rgba(16,185,129,0.2)"
                  headerBg="rgba(16,185,129,0.08)"
                  headerContent={
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>Moving Toward (Compliant)</h4>
                        <div className="flex gap-1.5">
                          {[1, 2, 6].map((n) => (
                            <span key={n} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: [, "#E74C3C", "#27AE60", , , , "#2C3E50"][n] }}>{n}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "#6ee7b7" }}>Types 1, 2, 6 · Strategy: earn safety through duty, service, and compliance</p>
                    </>
                  }
                >
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Horney&apos;s &ldquo;moving toward&rdquo; strategy describes people who manage anxiety by orienting toward others — making themselves dutiful, indispensable, or perfectly aligned with authority. In the Enneagram, this corresponds to Types 1, 2, and 6, which Riso and Hudson call the Compliant group. These types are superego-driven: they&apos;ve internalized external standards, expectations, or demands so completely that they experience them as their own moral code, sense of responsibility, or commitment to loyalty.
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Ones earn safety by being right and morally above reproach — the perfect compliance with one&apos;s own inner standard. Twos earn safety by being needed — making others so dependent on their care that abandonment becomes impossible. Sixes earn safety through loyalty to trusted authority — outsourcing their own guidance to something or someone they can depend on. All three types have a difficult relationship with genuine autonomy: asserting their own will, beyond what&apos;s expected of them, feels transgressive or dangerous.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.67)" }}>
                    The shadow of this group is resentment — the cost of perpetual compliance. When the compliance stops working, or when the authority figure fails them, Compliant types are often blindsided by the force of their own suppressed anger. Growth for this group means developing genuine autonomy: learning to identify and act from their own inner authority rather than from duty, need to be needed, or fear of being unsupported.
                  </p>
                </CollapsibleDeepCard>

                {/* Moving Against (Aggressive) */}
                <CollapsibleDeepCard
                  border="1px solid rgba(239,68,68,0.2)"
                  headerBg="rgba(239,68,68,0.08)"
                  headerContent={
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>Moving Against (Aggressive)</h4>
                        <div className="flex gap-1.5">
                          {[3, 7, 8].map((n) => (
                            <span key={n} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: [, , , "#F39C12", , , , "#E67E22", "#C0392B"][n] }}>{n}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "#fca5a5" }}>Types 3, 7, 8 · Strategy: get needs met by expanding and going after what you want</p>
                    </>
                  }
                >
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Horney&apos;s &ldquo;moving against&rdquo; strategy describes people who manage anxiety by becoming more forceful, dominant, and expansive than the threats around them. Riso and Hudson identify this as the Assertive group: Types 3, 7, and 8. These are ego-expansive types — they grow themselves to fill space, to outpace or outmaneuver whatever feels threatening. Where Compliant types try to become smaller and more acceptable, Assertive types try to become larger and more powerful.
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Threes assert through achievement and image — by becoming the most successful, most polished version of themselves, they ensure they can&apos;t be overlooked or dismissed. Sevens assert through constant forward momentum — by staying ahead of pain, boredom, and limitation, they maintain the sense that they are in control of their experience. Eights assert through force and confrontation — by being the most powerful entity in the room, they ensure no one can betray or control them.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.67)" }}>
                    The shadow of this group is vulnerability — the cost of perpetual expansion. These types have the most difficulty with genuine receptivity: being helped, being moved, sitting with difficulty without making it into something. They tend to resist acknowledging that they need others. Growth means developing genuine openness: the capacity to receive rather than always pursue, and to be affected rather than always affecting.
                  </p>
                </CollapsibleDeepCard>

                {/* Moving Away (Withdrawn) */}
                <CollapsibleDeepCard
                  border="1px solid rgba(99,102,241,0.2)"
                  headerBg="rgba(99,102,241,0.08)"
                  headerContent={
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>Moving Away (Withdrawn)</h4>
                        <div className="flex gap-1.5">
                          {[4, 5, 9].map((n) => (
                            <span key={n} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: [, , , , "#8E44AD", "#3498DB", , , , "#1ABC9C"][n] }}>{n}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "#a5b4fc" }}>Types 4, 5, 9 · Strategy: manage needs by retreating inward and meeting them there</p>
                    </>
                  }
                >
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Horney&apos;s &ldquo;moving away&rdquo; strategy describes people who manage anxiety by reducing engagement with the external world and retreating into a rich inner life. Riso and Hudson call this the Withdrawn group: Types 4, 5, and 9. Where Compliant types reach toward others and Assertive types expand outward, Withdrawn types pull inward — not out of weakness, but as a fundamentally different architecture for managing the world&apos;s demands.
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Fours withdraw into emotion and imagination, constructing a rich private world of feeling and longing that substitutes for the connection they find elusive in reality. Fives withdraw into intellect, building elaborate internal systems of understanding as a substitute for — and protection against — the depleting demands of engagement. Nines withdraw through self-erasure and numbing, merging into the environment rather than asserting a distinct self that could be in conflict with it.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.67)" }}>
                    The shadow of this group is disengagement — the cost of perpetual retreat. These types struggle most with decisive, sustained engagement with external reality: taking action, asserting their perspective, and maintaining presence even when it&apos;s difficult. Growth means developing the capacity to remain in contact with the world without being overwhelmed by it — discovering that presence doesn&apos;t have to mean dissolution.
                  </p>
                </CollapsibleDeepCard>

                {/* Citation */}
                <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Sources: Horney, <em>Our Inner Conflicts</em> (1945) · Riso &amp; Hudson, <em>Personality Types</em> (1987); <em>Wisdom of the Enneagram</em> (1999)
                  </p>
                </div>
              </div>
            </div>

            {/* Harmonic Groups — expanded */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-serif font-semibold text-lg" style={{ color: "rgba(255,255,255,0.88)" }}>Harmonic Groups</h3>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#fcd34d" }}>Riso-Hudson</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                Where the Horney Triads describe how types pursue their needs in the world, the Harmonic Groups describe how types handle frustration, conflict, and disappointment — the inevitable moments when the world doesn&apos;t give them what they want. Riso and Hudson identified three fundamentally different responses to this experience, each representing a kind of emotional strategy for surviving difficulty.
              </p>
              <div className="space-y-5 mb-8">
                {/* Positive Outlook */}
                <CollapsibleDeepCard
                  border="1px solid rgba(245,158,11,0.2)"
                  headerBg="rgba(245,158,11,0.08)"
                  headerContent={
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>Positive Outlook</h4>
                        <div className="flex gap-1.5">
                          {[2, 7, 9].map((n) => (
                            <span key={n} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: [, , "#27AE60", , , , , "#E67E22", , "#1ABC9C"][n] }}>{n}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "#fcd34d" }}>Types 2, 7, 9 · Handle difficulty by reframing or suppressing the negative</p>
                    </>
                  }
                >
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Types 2, 7, and 9 manage conflict and disappointment by maintaining — or restoring — a positive emotional atmosphere. This isn&apos;t simple optimism; it&apos;s a defensive strategy. Each of these types has learned that dwelling in negativity is dangerous: for Twos, expressing their own pain threatens the relationships they depend on; for Sevens, staying with pain risks being trapped in a deprivation they can&apos;t escape; for Nines, any conflict or negativity threatens the peace they&apos;ve carefully cultivated.
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    As a result, these types suppress, minimize, or reframe their own negative experience. Twos focus on others&apos; needs, keeping their own pain out of awareness. Sevens reframe everything: &ldquo;This difficult situation is actually full of possibility.&rdquo; Nines smooth things over, going along to avoid disruption. The effect in relationships is often experienced by others as a kind of unavailability: the Positive Outlook type is present, warm, and engaged — but not fully contact-able in their pain.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Shadow work for this group involves learning to stay with negative emotion without immediately transforming it: to feel the disappointment fully, to let the grief land, to allow the conflict to exist without rushing toward resolution. This is genuinely difficult, because these types have built elaborate and sophisticated defenses against exactly this experience.
                  </p>
                </CollapsibleDeepCard>

                {/* Competency */}
                <CollapsibleDeepCard
                  border="1px solid rgba(14,165,233,0.2)"
                  headerBg="rgba(14,165,233,0.08)"
                  headerContent={
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>Competency</h4>
                        <div className="flex gap-1.5">
                          {[1, 3, 5].map((n) => (
                            <span key={n} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: [, "#E74C3C", , "#F39C12", , "#3498DB"][n] }}>{n}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "#7dd3fc" }}>Types 1, 3, 5 · Handle difficulty by setting feelings aside and finding solutions</p>
                    </>
                  }
                >
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Types 1, 3, and 5 manage conflict and disappointment by setting feelings aside and solving the problem. These are the types who, when something goes wrong, immediately shift into rational problem-solving mode — identifying what needs to be fixed, what standard needs to be met, what more efficient path forward exists. Emotion is treated as noise that interferes with the signal. The Competency group believes, at a structural level, that feelings are obstacles to functioning rather than information about it.
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Ones apply standards: the correct response to difficulty is to do the right thing, even if it&apos;s hard. Threes perform: they shift into efficient, outcome-oriented mode, adjusting and adapting to succeed. Fives analyze: they step back, process the situation intellectually, and arrive at the objectively correct response — often days later, via email. Each strategy keeps the person functional while bypassing genuine emotional contact with the difficulty.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Shadow work for this group involves allowing themselves to feel incompetent, messy, and emotionally affected. These types often don&apos;t know how to be comforted — they&apos;d rather have their problem solved or their competence confirmed. Learning to receive emotional support, rather than analysis or solutions, is often their central relational challenge.
                  </p>
                </CollapsibleDeepCard>

                {/* Reactive */}
                <CollapsibleDeepCard
                  border="1px solid rgba(236,72,153,0.2)"
                  headerBg="rgba(236,72,153,0.08)"
                  headerContent={
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>Reactive (Emotional Realness)</h4>
                        <div className="flex gap-1.5">
                          {[4, 6, 8].map((n) => (
                            <span key={n} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: [, , , , "#8E44AD", , "#2C3E50", , "#C0392B"][n] }}>{n}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "#f9a8d4" }}>Types 4, 6, 8 · Handle difficulty by having a strong emotional reaction that needs to be witnessed</p>
                    </>
                  }
                >
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Types 4, 6, and 8 manage conflict and disappointment by having a strong emotional reaction — and needing others to engage with that reaction. Where Positive Outlook types suppress their feelings and Competency types bypass them, Reactive types lead with them. They are not interested in managing their emotional state for the sake of social comfort; they are interested in authentic engagement with what is actually happening, including what it feels like. This gives these types an emotional directness that can be arresting or overwhelming, depending on your own type.
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Fours express hurt and need empathy: &ldquo;This has wounded me, and I need you to understand that.&rdquo; Sixes express anxiety and need reassurance: &ldquo;I&apos;m scared this will go wrong, and I need you to help me think it through.&rdquo; Eights express anger and need direct engagement: &ldquo;This is wrong, and I need you to either stand your ground or acknowledge it.&rdquo; In each case, the emotional reality must be seen and responded to before the person can move forward.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.67)" }}>
                    Shadow work for this group involves self-soothing rather than requiring external emotional processing — developing the capacity to regulate their own emotional experience without needing others to bear witness first. This doesn&apos;t mean suppressing; it means building enough inner resources that the emotional reality can be metabolized internally, not only through relationship.
                  </p>
                </CollapsibleDeepCard>

                {/* Citation */}
                <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Sources: Riso &amp; Hudson, <em>Personality Types</em> (1987); <em>Wisdom of the Enneagram</em> (1999)
                  </p>
                </div>
              </div>
            </div>

            {/* Object Relations */}
            <div>
              <h3 className="font-serif font-semibold text-lg mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>Object Relations Groups</h3>
              <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>How each type relates to their primary attachment figures, based on object relations theory and Riso-Hudson&apos;s research.</p>
              <div className="space-y-3">
                {objectRelationsGroups.map((group) => (
                  <CollapsibleDeepCard
                    key={group.name}
                    border="1px solid rgba(255,255,255,0.08)"
                    headerBg="rgba(255,255,255,0.04)"
                    headerContent={
                      <>
                        <h4 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{group.name}</h4>
                        <div className="text-xs text-sky-400 mt-0.5">Types {group.types.join(", ")} · {group.relationship}</div>
                      </>
                    }
                  >
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>{group.description}</p>
                    <div className="p-3 rounded-xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}>
                      <div className="text-[10px] font-medium text-violet-400 mb-1">Psychodynamics</div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{group.psychodynamics}</p>
                    </div>
                  </CollapsibleDeepCard>
                ))}
              </div>
            </div>
          </div>
          </AdvancedContentGate>
        )}

        {/* Next Step Banners — shown at the natural end of each tab */}
        {learnTab === "types" && (
          <NextStepBanner
            href="/daily"
            label="Start your daily practice"
            sublabel="Quiz, insight, and growth challenge, personalized to your type"
            icon={<Flame className="w-5 h-5" />}
            color="#f97316"
            dismissKey="enneagram-learn-types-daily"
          />
        )}
        {learnTab === "instincts" && (
          <NextStepBanner
            href="/enneagram"
            label="See how instincts affect your type"
            sublabel="Explore all 9 types and their instinctual variants on the hub"
            icon={<CompassIcon className="w-5 h-5" />}
            color="#0ea5e9"
            dismissKey="enneagram-learn-instincts-hub"
          />
        )}
        {(learnTab === "stackings" || learnTab === "tritypes" || learnTab === "deepsystems") && (
          <NextStepBanner
            href="/compare"
            label="Compare your type with someone"
            sublabel="See how your type's dynamics interact with another person's"
            icon={<Users2 className="w-5 h-5" />}
            color="#8b5cf6"
            dismissKey="enneagram-learn-compare"
          />
        )}
      </div>
    </div>
  );
}

export default function EnneagramLearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}><div style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</div></div>}>
      <LearnContent />
    </Suspense>
  );
}
