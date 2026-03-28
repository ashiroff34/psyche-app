"use client";

import { useState, useEffect, Suspense } from "react";
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
   TYPE NUANCE CARD — static deep insights per type
   ═══════════════════════════════════════════════════════════════════ */
const TYPE_NUANCES: Record<number, string> = {
  1: "Ones are often misread as simply perfectionistic, but the deeper drive is a desperate need to be good in a morally absolute sense. The inner critic isn't external — it is the One's own voice turned inward with relentless intensity. Healthy Ones learn that goodness isn't earned through flawlessness; it is expressed through acceptance of imperfection, both in themselves and the world.",
  2: "Twos are not merely helpful — they are often running from the terror of being unwanted if they show up with needs of their own. The generosity can be genuine and the manipulation unconscious. The core wound isn't about love being withheld; it's about the belief that love must be earned through service. Growth for Twos means discovering they are allowed to receive.",
  3: "Threes don't just want success — they want to become the image of success so completely that they lose track of who they actually are underneath. The efficiency and charm are real, but they often function as armor. The deepest fear isn't failure; it's being exposed as worthless without the achievements. Healthy Threes develop an identity that exists independently of performance.",
  4: "Fours are not simply emotional — they are acutely attuned to the gap between what is and what could be, and they live in that gap. The longing isn't just romantic; it's ontological. They feel something essential is missing from their very being. The irony is that this intense focus on what's absent causes them to overlook the depth they already possess.",
  5: "Fives aren't cold — they are protecting an inner world that feels easily overwhelmed and depleted by contact. The retreat into knowledge is often a substitute for the aliveness they're afraid to fully inhabit. The core fear isn't about being incompetent; it's about being incapable of surviving the demands of life. Healthy Fives discover that engagement doesn't drain them — it restores them.",
  6: "Sixes don't simply worry — they are running an ongoing threat-detection system shaped by a foundational distrust of their own inner guidance. The loyalty they offer is a form of outsourcing authority to trusted sources. What looks like doubt is often a deep, unacknowledged competence that the Six refuses to rely on. Growth means learning to trust what they already know.",
  7: "Sevens aren't just optimistic — they are running from pain with extraordinary creativity and speed. The mental leaping between possibilities isn't purely joyful; it's often an escape from the present moment's limitations. The deepest fear isn't being bored; it's being trapped in suffering with no exit. Healthy Sevens discover that staying with difficulty doesn't destroy them — it deepens them.",
  8: "Eights don't simply want control — they are guarding a tenderness so fierce they learned early to armour it completely. The aggression and intensity are real, but underneath is often a profound protectiveness toward those they love. The core fear isn't weakness; it's betrayal — being vulnerable and then abandoned. Healthy Eights learn that their softness is their greatest strength.",
  9: "Nines don't merely avoid conflict — they have learned to dissolve their own will so completely that they sometimes can't locate what they actually want. The peace they create is often real, but it comes at the cost of their own presence. The deepest pattern isn't laziness; it's a habit of self-forgetting so thorough that asserting their own perspective feels like an act of aggression. Growth means showing up as themselves.",
};

function AiTypeNuanceCard({ typeNumber }: { typeNumber: number }) {
  const insight = TYPE_NUANCES[typeNumber] || "";

  if (!insight) return null;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50/80 via-violet-50/60 to-sky-50/80 p-6"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400/10 to-violet-400/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-100/40 to-transparent rounded-bl-full pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-sm shadow-indigo-200/50">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-indigo-700">Deep Nuance: Type {typeNumber}</div>
            <div className="text-[10px] text-indigo-400">What most people miss about this type</div>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed text-sm font-serif">{insight}</p>
      </div>
    </motion.div>
  );
}

function ExpandableSection({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/50 transition">
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-sky-500" />
          <span className="font-medium text-slate-800">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
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

// ── Myth vs Reality data ─────────────────────────────────────────────────────
const MYTHS: Record<number, { myth: string; reality: string }[]> = {
  1: [
    { myth: "Ones are controlling perfectionists who boss people around.", reality: "Ones direct their inner critic inward — they judge themselves far more harshly than others. Their standards are primarily a burden they carry, not a weapon." },
    { myth: "Ones are rigid and can't relax.", reality: "Healthy Ones are principled AND joyful. Integration to Seven lets them access spontaneity and genuine delight." },
    { myth: "Ones always follow the rules.", reality: "Ones follow their own internalized moral code — which sometimes puts them at odds with conventional rules when those rules feel unjust." },
  ],
  2: [
    { myth: "Twos are just nice, selfless people.", reality: "Twos have deep needs for love and approval. Their giving is often unconsciously strategic — a way to feel indispensable and loved." },
    { myth: "Twos are doormats.", reality: "Twos can be fierce advocates and even manipulative when their need to be needed is threatened. They can be quite assertive about being needed." },
    { myth: "Twos don't have needs.", reality: "Twos have enormous emotional needs they often can't admit to themselves. Their growth involves learning to ask for what they need directly." },
  ],
  3: [
    { myth: "Threes are shallow status-seekers.", reality: "Threes genuinely believe their worth comes from what they achieve. The performing isn't cynical — it's how they try to earn love." },
    { myth: "Threes know exactly who they are.", reality: "Threes often have no idea who they are beneath the image. 'Who am I when I'm not performing?' is a genuinely terrifying question for them." },
    { myth: "Threes are confident.", reality: "Threes avoid failure precisely because deep down they fear they have no value without success. The confidence is often a performance." },
  ],
  4: [
    { myth: "Fours are just dramatic and self-pitying.", reality: "Fours have an exceptional capacity to feel — and to hold emotional complexity that others deny. This depth is a genuine gift, not just drama." },
    { myth: "Fours want to be miserable.", reality: "Fours romanticize suffering not because they enjoy it, but because they're more comfortable with intense feeling than with the flat ordinary." },
    { myth: "Fours are always sad.", reality: "Healthy Fours are among the most creatively alive, empathically present, and deeply authentic people you'll meet." },
  ],
  5: [
    { myth: "Fives are cold and emotionless.", reality: "Fives feel deeply but experience emotions as overwhelming. Their emotional world is private and intense — not absent." },
    { myth: "Fives are antisocial.", reality: "Fives deeply value their few close relationships. They withdraw to protect their energy, not because they dislike people." },
    { myth: "Fives just want to be left alone.", reality: "Fives want to connect — but on their own terms and timeline. Forced social interaction depletes; chosen connection nourishes." },
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
    { myth: "Nines don't have strong opinions.", reality: "Nines do have opinions — they just struggle to prioritize them. When they finally wake up to their own position, they can be immovable." },
    { myth: "Nines are peaceful because they're content.", reality: "Nines have numbed themselves to inner conflict to avoid disruption. The peace is a practiced avoidance, not genuine equanimity." },
  ],
};

// ── Type in Action data ──────────────────────────────────────────────────────
const TYPE_IN_ACTION: Record<number, { conflict: string; love: string; work: string; stress: string }> = {
  1: { conflict: "Becomes precise and critical; lays out exactly what went wrong. May lecture or repeat their point. Often represses anger and expresses it as icy correctness or biting sarcasm.", love: "Highly devoted but can be critical of the partner. Shows love through acts of service and improvement. Struggles to express warmth spontaneously.", work: "Sets high standards, catches errors others miss, leads by example. Can become resentful when others don't match their effort.", stress: "Becomes anxious and scattered, suddenly acting impulsive or self-indulgent in ways very unlike their usual self (moves to 4, then 7 under extreme stress)." },
  2: { conflict: "Withdraws hurt feelings while continuing to help, then eventually explodes. May guilt-trip or become martyr-like. Rarely names what they actually need.", love: "Highly attentive and caring; intuits their partner's needs. Can become possessive or manipulative if their own love needs go unmet.", work: "Builds strong relationships; becomes the person everyone trusts. Can overextend, struggle to say no, or become resentful of being taken for granted.", stress: "Becomes aggressive and domineering, suddenly asserting needs they've suppressed for too long. Can shift to controlling or demanding (moves to 8)." },
  3: { conflict: "Becomes more promotional of their position; frames the conflict in terms of outcomes. May dismiss emotional aspects as inefficient. Avoids looking bad.", love: "Highly attentive initially; may be more focused on the relationship's image than its depth. Struggles to be genuinely vulnerable with partners.", work: "Drives results, adapts communication style to each audience, thrives in competitive environments. Can shade truth to maintain image.", stress: "Becomes disengaged, apathetic, and melancholic — suddenly losing motivation and withdrawing from the performing mode (moves to 9)." },
  4: { conflict: "Feels the emotional wound intensely; may withdraw or respond with dramatic language. Focuses on the meaning behind the conflict, not just the facts.", love: "Deeply romantic and intense; idealizes partners then feels devastated by ordinary relationship reality. Needs to feel truly seen and special.", work: "Brings exceptional creativity and originality; can struggle with routine tasks. Needs work that feels meaningful and authentic.", stress: "Becomes hyperactive and scattered, throwing themselves into busyness to escape the pain (moves to 2, or overworks like a 1)." },
  5: { conflict: "Retreats internally; needs time to process before responding. Hates being ambushed with emotional demands. May respond days later with a well-formulated email.", love: "Extremely loyal and devoted within chosen relationships. Needs significant alone time even in close relationships. Shows love through presence and thought.", work: "Thrives in deep focus work; the go-to expert. Struggles with open-office environments, constant meetings, and interpersonal politics.", stress: "Becomes hyperactive and impulsive, suddenly acting out in ways completely out of character, scattered and disorganized (moves to 7)." },
  6: { conflict: "Tests the relationship; may become aggressive to see if the other person will stay. Looks for proof of loyalty. Can be accusatory or suspicious.", love: "Among the most loyal partners when trust is established. Takes commitment seriously; needs consistent reassurance early on. Extremely warm once safe.", work: "Builds strong team loyalty, anticipates problems, excellent at risk assessment. Can be slow to decide due to worst-case thinking.", stress: "Becomes competitive, arrogant, and aggressive — temporarily acting out the opposite of their usual cooperative style (moves to 3 or 9 under extreme stress)." },
  7: { conflict: "Reframes the conflict as fixable and moves quickly past it. May minimize the other person's hurt. Has a strong aversion to sustained negative feeling.", love: "Highly playful and fun partners; bring joy and adventure. Can struggle with sustained depth, commitment, or sitting with partner's pain.", work: "Generates ideas prolifically, keeps team energy high, makes tedious work fun. Struggles to finish projects, follow through on details.", stress: "Becomes perfectionistic and self-critical, suddenly fixating on what's wrong rather than what's possible (moves to 1)." },
  8: { conflict: "Confronts directly and immediately. Respects others who stand their ground. Tests whether you'll fight back or fold. Forgives quickly once it's out.", love: "Fiercely protective and generous with people they love. Needs to feel trusted, not managed. Reveals tenderness only to the very few they trust.", work: "Takes charge naturally; makes things happen. Can dominate meetings, steamroll others' ideas, or see subtlety as weakness.", stress: "Withdraws, becomes reclusive and secretive, isolating in an uncharacteristic way (moves to 5)." },
  9: { conflict: "Avoids it as long as possible. Uses passive resistance — agreeing but not following through. Can suddenly explode after prolonged suppression of a position.", love: "Highly accommodating and supportive partner. Can lose their own identity in the relationship. Needs to be encouraged to voice their true preferences.", work: "Excellent mediator and team player. Can struggle with deadlines, taking initiative, or saying no to additional requests.", stress: "Becomes anxious, hypervigilant, and worry-prone — suddenly alert to all the problems they'd been ignoring (moves to 6)." },
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
        <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-rose-200 flex items-center justify-center flex-shrink-0">
              <span className="text-rose-600 text-[10px] font-bold">X</span>
            </div>
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Myth</span>
          </div>
          <p className="text-sm text-rose-800 leading-relaxed font-medium">{myth}</p>
          <div className="text-[10px] text-rose-400 mt-3">Tap to reveal reality</div>
        </div>
      ) : (
        <div className="rounded-2xl border p-4" style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}30` }}>
              <span className="text-[10px] font-bold" style={{ color }}>OK</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>Reality</span>
          </div>
          <p className="text-sm leading-relaxed font-medium text-slate-800">{reality}</p>
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
      <p className="text-xs text-slate-400 mb-4">Tap each card to reveal what's actually true.</p>
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
    { label: "In Conflict", content: data.conflict, color: "bg-rose-50 border-rose-100", labelColor: "text-rose-600" },
    { label: "In Love", content: data.love, color: "bg-pink-50 border-pink-100", labelColor: "text-pink-600" },
    { label: "At Work", content: data.work, color: "bg-sky-50 border-sky-100", labelColor: "text-sky-600" },
    { label: "Under Stress", content: data.stress, color: "bg-amber-50 border-amber-100", labelColor: "text-amber-600" },
  ];
  return (
    <ExpandableSection title="Type in Action" icon={Zap}>
      <div className="grid sm:grid-cols-2 gap-3">
        {scenarios.map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 ${s.color}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${s.labelColor}`}>{s.label}</div>
            <p className="text-sm text-slate-700 leading-relaxed">{s.content}</p>
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
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-violet-50/60 border border-violet-100 mb-5">
        <BookOpen className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-violet-800 leading-relaxed font-mono">
          Sources: Naranjo, <em>Character &amp; Neurosis</em> (1994) · Ichazo protoanalysis · Chestnut, <em>The Complete Enneagram</em> (2013) · Riso-Hudson, <em>Wisdom of the Enneagram</em> (1999) · Horney, <em>Our Inner Conflicts</em> (1945)
        </div>
      </div>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm mb-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-serif font-bold shrink-0" style={{ backgroundColor: type.color }}>
            {type.number}
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">{type.name}</h2>
            <p className="text-sm text-slate-400 mb-3">{type.alias}</p>
            <p className="text-slate-600 leading-relaxed text-sm">{type.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {type.keyTraits.map((trait) => (
                <span key={trait} className="px-3 py-1 text-xs rounded-lg font-medium" style={{ backgroundColor: `${type.color}15`, color: type.color }}>{trait}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wings */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white border border-slate-100">
          <div className="text-xs text-slate-400 mb-1">Left Wing</div>
          <div className="text-sm font-medium text-slate-700">{type.wings.left}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-100">
          <div className="text-xs text-slate-400 mb-1">Right Wing</div>
          <div className="text-sm font-medium text-slate-700">{type.wings.right}</div>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-3">
        <ExpandableSection title="Core Motivation & Fears" icon={Heart} defaultOpen>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="text-xs font-medium text-emerald-600 mb-1">Core Desire</div>
              <p className="text-sm text-slate-700">{type.coreDesire}</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
              <div className="text-xs font-medium text-rose-600 mb-1">Core Fear</div>
              <p className="text-sm text-slate-700">{type.coreFear}</p>
            </div>
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
              <div className="text-xs font-medium text-sky-600 mb-1">Core Motivation</div>
              <p className="text-sm text-slate-700">{type.coreMotivation}</p>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection title="Levels of Development" icon={TrendingUp}>
          <div className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Riso &amp; Hudson identified 9 levels for each type — from healthiest (Level 1) to most destructive (Level 9). Most people operate between Levels 3–7. These traits show how the type looks at each range.
            </p>
            <div>
              <div className="text-xs font-medium text-emerald-600 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Healthy</div>
              <div className="flex flex-wrap gap-2">
                {type.healthyTraits.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">{t}</span>)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-amber-600 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Average</div>
              <div className="flex flex-wrap gap-2">
                {type.averageTraits.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-lg bg-amber-50 text-amber-700 border border-amber-100">{t}</span>)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-rose-600 mb-2 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Unhealthy</div>
              <div className="flex flex-wrap gap-2">
                {type.unhealthyTraits.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-lg bg-rose-50 text-rose-700 border border-rose-100">{t}</span>)}
              </div>
            </div>
          </div>
        </ExpandableSection>

        {/* SUBTYPES — Beatrice Chestnut's framework */}
        <ExpandableSection title="Instinctual Subtypes" icon={Flame}>
          <div className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed mb-2">
              Every type has three versions depending on your dominant survival drive. <strong className="text-slate-700">Self-Preservation (SP)</strong> = focused on safety, resources, and the body. <strong className="text-slate-700">Social (SO)</strong> = focused on belonging and group dynamics. <strong className="text-slate-700">Sexual/One-to-One (SX)</strong> = focused on intensity and deep connection. One of these colors your whole type. Based on Beatrice Chestnut&apos;s <em>The Complete Enneagram</em> and Naranjo&apos;s framework. The <span className="text-violet-600 font-medium">countertype</span> is the subtype that looks least like the core type.
            </p>
            {typeSubtypes.map((sub) => (
              <div key={sub.instinct} className={`p-5 rounded-xl border ${sub.isCountertype ? "border-violet-200 bg-violet-50/30" : "border-slate-100 bg-white"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                    sub.instinct === "sp" ? "bg-emerald-100 text-emerald-700" :
                    sub.instinct === "sx" ? "bg-rose-100 text-rose-700" :
                    "bg-sky-100 text-sky-700"
                  }`}>{sub.instinct.toUpperCase()}</span>
                  <span className="font-serif font-semibold text-slate-800 text-sm">{sub.name}</span>
                  {sub.isCountertype && (
                    <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-violet-100 text-violet-700">COUNTERTYPE</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-2">Chestnut: &ldquo;{sub.chestnutName}&rdquo;</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{sub.description}</p>
                <div className="space-y-1.5 mb-3">
                  {sub.keyPatterns.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-slate-50 mb-2">
                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">How this differs</div>
                  <p className="text-xs text-slate-600">{sub.howTheyDiffer}</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50/50">
                  <div className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider mb-1">Growth Path</div>
                  <p className="text-xs text-slate-600">{sub.growthPath}</p>
                </div>
              </div>
            ))}
          </div>
        </ExpandableSection>

        {/* Growth Path */}
        <ExpandableSection title="Integration & Growth" icon={Lightbulb}>
          <div className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              When you&apos;re growing, you take on the positive qualities of another type (your <strong className="text-slate-600">integration line</strong>). Under stress, you take on the unhealthy qualities of a different type (your <strong className="text-slate-600">disintegration line</strong>). These are automatic shifts, not choices.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                <div className="text-xs text-emerald-600 mb-1">Integration (Growth)</div>
                <div className="font-serif font-semibold text-slate-800">→ Type {type.integrationLine}</div>
                <div className="text-xs text-slate-500 mt-0.5">{enneagramTypes.find(t => t.number === type.integrationLine)?.name}</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-center">
                <div className="text-xs text-rose-600 mb-1">Disintegration (Stress)</div>
                <div className="font-serif font-semibold text-slate-800">→ Type {type.disintegrationLine}</div>
                <div className="text-xs text-slate-500 mt-0.5">{enneagramTypes.find(t => t.number === type.disintegrationLine)?.name}</div>
              </div>
            </div>
            <div className="space-y-2">
              {type.growthTips.map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-sm text-slate-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </ExpandableSection>

        {/* Tritypes */}
        <ExpandableSection title="Tritypes Involving This Type" icon={Layers}>
          <div className="space-y-3">
            <p className="text-xs text-slate-500 leading-relaxed mb-2">
              Your tritype is a combination of three types — one from each intelligence center: <strong className="text-slate-600">Head</strong> (5, 6, or 7), <strong className="text-slate-600">Heart</strong> (2, 3, or 4), and <strong className="text-slate-600">Gut</strong> (8, 9, or 1). You lead with your core type but draw on the others in different situations. Below are tritypes involving Type {type.number}.
            </p>
            <div className="grid gap-3">
              {relatedTritypes.slice(0, 12).map((tri) => (
                <div key={tri.code} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono font-bold text-sky-600 text-sm">{tri.code}</span>
                    <span className="font-serif font-semibold text-slate-800 text-sm">{tri.archetype}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{tri.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] font-medium text-emerald-600 mb-1">Strengths</div>
                      {tri.strengths.map((s, i) => (
                        <div key={i} className="text-[11px] text-slate-500 flex items-start gap-1"><span className="text-emerald-400 mt-0.5">+</span> {s}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-amber-600 mb-1">Challenges</div>
                      {tri.challenges.map((c, i) => (
                        <div key={i} className="text-[11px] text-slate-500 flex items-start gap-1"><span className="text-amber-400 mt-0.5">-</span> {c}</div>
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
                <p className="text-xs text-slate-400 leading-relaxed mb-2">From Claudio Naranjo&apos;s <em>Character and Neurosis</em> and Oscar Ichazo&apos;s protoanalysis. These are the deep structural patterns beneath the surface behaviors.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
                    <div className="text-xs font-medium text-rose-600 mb-1">Passion (Vice)</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{naranjo.passion}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{naranjo.passionDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                    <div className="text-xs font-medium text-amber-600 mb-1">Fixation (Cognitive Distortion)</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{naranjo.fixation}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{naranjo.fixationDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="text-xs font-medium text-emerald-600 mb-1">Virtue (Transformation)</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{naranjo.virtue}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{naranjo.virtueDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
                    <div className="text-xs font-medium text-sky-600 mb-1">Holy Idea (Ichazo)</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{naranjo.holyIdea}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{naranjo.holyIdeaDescription}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
                    <div className="text-xs font-medium text-violet-600 mb-1">Trap</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{naranjo.trap}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{naranjo.trapDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-medium text-slate-600 mb-1">Defense Mechanism</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{naranjo.defenseM}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{naranjo.defenseMDescription}</p>
                  </div>
                </div>
              </div>
            </ExpandableSection>
          );
        })()}

        {/* Misidentification — Common Confusions */}
        {(() => {
          const misids = misidentifications.filter(m => m.types.includes(type.number));
          if (misids.length === 0) return null;
          return (
            <ExpandableSection title="Am I Actually This Type?" icon={Eye}>
              <div className="space-y-3">
                <p className="text-xs text-slate-400 mb-2">Sometimes people misidentify their type because two types can look similar on the surface. Here&apos;s how to tell if you&apos;re actually a different type — and the key question to ask yourself.</p>
                {misids.map((m, i) => {
                  const otherType = m.types[0] === type.number ? m.types[1] : m.types[0];
                  return (
                    <div key={i} className="p-4 rounded-xl bg-white border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-slate-800">Type {type.number} vs Type {otherType}</span>
                        <span className="text-xs text-slate-400">({enneagramTypes[otherType - 1]?.name})</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2"><strong className="text-slate-600">Why confused:</strong> {m.whyConfused}</div>
                      <div className="text-xs text-slate-500 mb-2"><strong className="text-slate-600">Key difference:</strong> {m.keyDifference}</div>
                      <div className="p-3 rounded-lg bg-sky-50/50 border border-sky-100/50">
                        <div className="text-[10px] font-medium text-sky-600 mb-1">Ask Yourself</div>
                        <p className="text-xs text-slate-700 italic">{m.testQuestion}</p>
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
            <p className="text-xs text-slate-400 mb-2">
              The Enneagram groups types in three different ways. Each grouping reveals a pattern you share with certain other types — useful for understanding why you might relate to types beyond your core number. Based on Karen Horney, Riso-Hudson, and Object Relations theory.
            </p>
            {(() => {
              const hornevian = hornevianGroups.find(g => g.types.includes(type.number));
              const harmonic = harmonicGroups.find(g => g.types.includes(type.number));
              const objRel = objectRelationsGroups.find(g => g.types.includes(type.number));
              return (
                <div className="space-y-3">
                  {hornevian && (
                    <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                      <div className="text-xs font-medium text-indigo-600 mb-1">Hornevian: {hornevian.name}</div>
                      <div className="text-xs text-slate-500 mb-1">Types {hornevian.types.join(", ")} · Strategy: {hornevian.strategy}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{hornevian.description}</p>
                    </div>
                  )}
                  {harmonic && (
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                      <div className="text-xs font-medium text-emerald-600 mb-1">Harmonic: {harmonic.name}</div>
                      <div className="text-xs text-slate-500 mb-1">Types {harmonic.types.join(", ")} · Response: {harmonic.response}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{harmonic.description}</p>
                    </div>
                  )}
                  {objRel && (
                    <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                      <div className="text-xs font-medium text-violet-600 mb-1">Object Relations: {objRel.name}</div>
                      <div className="text-xs text-slate-500 mb-1">Types {objRel.types.join(", ")} · {objRel.relationship}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{objRel.psychodynamics}</p>
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
              <div key={i} className="p-4 rounded-xl bg-sky-50/50 border border-sky-100/50">
                <p className="text-sm text-slate-700 italic">&ldquo;{prompt}&rdquo;</p>
              </div>
            ))}
          </div>
        </ExpandableSection>

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
  const { profile } = useProfile();
  const myType = profile.enneagramType ?? null; // reactive — updates when type changes

  // Mark "Enneagram Basics" as complete when this page is visited
  useEffect(() => {
    markTopicComplete("enneagram-basics");
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Learn the Enneagram</h1>
              <p className="text-slate-500">Explore types, subtypes, instinctual stackings, tritypes, and deep psychology.</p>
            </div>
            {selectedType && (
              <a href="/daily" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 text-orange-600 rounded-xl text-xs font-medium hover:bg-orange-100 transition">
                Daily Practice — quiz + insight →
              </a>
            )}
          </div>
        </div>

        {/* Top-level tabs — same for everyone */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit mb-8 flex-wrap">
          {[
            { key: "types" as const, label: "9 Types" },
            { key: "instincts" as const, label: "Instinctual Variants" },
            { key: "stackings" as const, label: "Stackings" },
            { key: "tritypes" as const, label: "Tritypes" },
            { key: "deepsystems" as const, label: "Deep Systems" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setLearnTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${learnTab === tab.key ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              {tab.label}
            </button>
          ))}
        </div>
        {/* Hint when no type selected */}
        {learnTab === "types" && !selectedType && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50 border border-sky-100 mb-6 max-w-xl">
            <Info className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-sky-800">
              Not sure where to start? Pick any type that sounds familiar, or{" "}
              <a href="/enneagram/assess" className="font-semibold underline underline-offset-2">take the assessment</a>{" "}
              to discover your type.
            </p>
          </div>
        )}

        {/* Types Tab */}
        {learnTab === "types" && (
          <>
            {/* What is the Enneagram explainer — shown when no type selected */}
            {!selectedType && (
              <div className="max-w-2xl mb-8 p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100">
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">What is the Enneagram?</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  The Enneagram is a map of 9 personality types — each driven by a different core motivation and fear. Unlike surface-level tests, it describes <em>why</em> you do what you do, not just what you do. It&apos;s a tool for self-understanding, not a label.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-500">
                  <div className="p-3 bg-white/70 rounded-xl">
                    <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center mx-auto mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                    </div>
                    <div className="font-medium text-slate-700">Core Motivation</div>
                    <div>The deep &ldquo;why&rdquo; behind your actions</div>
                  </div>
                  <div className="p-3 bg-white/70 rounded-xl">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center mx-auto mb-1.5">
                      <Shield className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                    <div className="font-medium text-slate-700">Core Fear</div>
                    <div>What you&apos;re unconsciously trying to avoid</div>
                  </div>
                  <div className="p-3 bg-white/70 rounded-xl">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="font-medium text-slate-700">Growth Path</div>
                    <div>How each type develops and heals</div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">Pick any type below to start — or take the <a href="/enneagram/assess" className="text-sky-600 font-medium underline underline-offset-2">assessment</a> to find yours.</p>
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
                          ? "bg-white text-slate-700 border-2 shadow-sm hover:scale-105"
                          : "bg-white text-slate-600 border border-slate-200 hover:border-sky-200 hover:bg-sky-50/50"
                      }`}
                      style={
                        isSelected
                          ? { backgroundColor: type.color }
                          : isMyType
                          ? { borderColor: type.color, boxShadow: `0 0 0 1px ${type.color}22, 0 2px 8px ${type.color}22` }
                          : undefined
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
              {(() => { const t = enneagramTypes.find((t) => t.number === selectedType); return t ? <TypeDetail key={selectedType} type={t} /> : <p className="text-sm text-slate-400">Type not found.</p>; })()}
            ) : null}
          </>
        )}

        {/* Instinctual Variants Tab */}
        {learnTab === "instincts" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-slate-500 leading-relaxed">
              The three instinctual variants — Self-Preservation (SP), Sexual/One-to-One (SX), and Social (SO) — are biological drives that shape how each Enneagram type expresses itself. Beatrice Chestnut&apos;s research identifies 27 distinct subtypes (3 per type), each with a countertype that looks least like the core type.
            </p>
            {instinctualVariants.map((iv) => (
              <div key={iv.code} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 text-sm font-mono font-bold rounded-lg ${
                    iv.code === "sp" ? "bg-emerald-100 text-emerald-700" :
                    iv.code === "sx" ? "bg-rose-100 text-rose-700" :
                    "bg-sky-100 text-sky-700"
                  }`}>{iv.code.toUpperCase()}</span>
                  <h3 className="font-serif font-semibold text-lg text-slate-800">{iv.fullName}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{iv.description}</p>
                <div className="p-3 rounded-xl bg-slate-50 mb-4">
                  <div className="text-xs font-medium text-slate-700 mb-1">Core Drive</div>
                  <p className="text-sm text-slate-600">{iv.coreDrive}</p>
                </div>
                <div className="mb-4">
                  <div className="text-xs font-medium text-slate-500 mb-2">Focus Areas</div>
                  <div className="space-y-1.5">
                    {iv.focus.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-300 mt-2 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50/50">
                    <div className="text-xs font-medium text-emerald-600 mb-2">Strengths</div>
                    <div className="space-y-1">
                      {iv.strengths.map((s) => <div key={s} className="text-xs text-slate-600">{s}</div>)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/50">
                    <div className="text-xs font-medium text-amber-600 mb-2">Blind Spots</div>
                    <div className="space-y-1">
                      {iv.blindSpots.map((b) => <div key={b} className="text-xs text-slate-600">{b}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stackings Tab */}
        {learnTab === "stackings" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-slate-500 leading-relaxed">
              Your instinctual stacking is the order of priority of your three instincts. Your dominant instinct shapes your primary focus, your secondary supports it, and your blind spot is the instinct you neglect most. There are six possible stackings.
            </p>
            {instinctualStackings.map((stack) => (
              <div key={stack.code} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono font-bold text-lg text-sky-600">{stack.code}</span>
                  <h3 className="font-serif font-semibold text-slate-800">{stack.name}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{stack.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-50 text-center">
                    <div className="text-[10px] text-emerald-600 font-medium">Dominant</div>
                    <div className="text-sm font-medium text-slate-700">{stack.dominant}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50 text-center">
                    <div className="text-[10px] text-sky-600 font-medium">Secondary</div>
                    <div className="text-sm font-medium text-slate-700">{stack.secondary}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 text-center">
                    <div className="text-[10px] text-slate-400 font-medium">Blind Spot</div>
                    <div className="text-sm font-medium text-slate-400">{stack.blind}</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {stack.characteristics.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-300 mt-2 shrink-0" />{c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tritypes Tab */}
        {learnTab === "tritypes" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-slate-500 leading-relaxed">
              Katherine Fauvre&apos;s Tritype theory proposes that each person uses one type from each of the three centers of intelligence. Your tritype (e.g., 531) shows your dominant strategy in Head (5/6/7), Heart (2/3/4), and Gut (8/9/1). Combined with your instinctual stacking, this creates a highly specific personality profile (e.g., sx/so 531 INTJ).
            </p>

            {/* Centers */}
            <div className="grid gap-4">
              {tritypeCenters.map((center) => (
                <div key={center.name} className="p-5 rounded-2xl bg-white border border-slate-100">
                  <h3 className="font-serif font-semibold text-slate-800 mb-2">{center.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{center.description}</p>
                  <div className="p-3 rounded-xl bg-sky-50/50">
                    <div className="text-xs font-medium text-sky-600 mb-1">Key Question</div>
                    <p className="text-sm text-slate-700 italic">{center.question}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* All Tritypes */}
            <h3 className="font-serif font-semibold text-lg text-slate-800 mt-8">All Tritype Thyselfs</h3>
            <div className="grid gap-3">
              {tritypes.map((tri) => (
                <div key={tri.code} className="p-4 rounded-xl bg-white border border-slate-100 hover:border-sky-200 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono font-bold text-sky-600">{tri.code}</span>
                    <span className="font-serif font-semibold text-slate-800 text-sm">{tri.archetype}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{tri.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] font-medium text-emerald-600 mb-1">Strengths</div>
                      {tri.strengths.map((s, i) => (
                        <div key={i} className="text-[11px] text-slate-500">+ {s}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-amber-600 mb-1">Challenges</div>
                      {tri.challenges.map((c, i) => (
                        <div key={i} className="text-[11px] text-slate-500">- {c}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deep Systems Tab */}
        {learnTab === "deepsystems" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-sm text-slate-500 leading-relaxed">
              Beyond the 9 types, the Enneagram contains several meta-systems that reveal deeper patterns. These groupings come from Karen Horney&apos;s psychoanalytic framework, Don Riso &amp; Russ Hudson&apos;s research, and object relations theory.
            </p>

            {/* Centers of Intelligence */}
            <div>
              <h3 className="font-serif font-semibold text-lg text-slate-800 mb-4">Centers of Intelligence</h3>
              <div className="space-y-4">
                {centersOfIntelligence.map((center) => (
                  <div key={center.name} className="p-5 rounded-2xl bg-white border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-serif font-semibold text-slate-800">{center.name}</h4>
                      <span className="px-2 py-0.5 text-xs rounded bg-rose-50 text-rose-600 font-medium">Core: {center.coreEmotion}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{center.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-50"><span className="text-slate-400">Core type:</span> <span className="text-slate-600 font-medium">{center.dominantType}</span></div>
                      <div className="p-2 rounded-lg bg-emerald-50/50"><span className="text-emerald-500">Over-expressed:</span> <span className="text-slate-600 font-medium">{center.overExpressed}</span></div>
                      <div className="p-2 rounded-lg bg-amber-50/50"><span className="text-amber-500">Under-expressed:</span> <span className="text-slate-600 font-medium">{center.underExpressed}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hornevian Groups */}
            <div>
              <h3 className="font-serif font-semibold text-lg text-slate-800 mb-4">Hornevian Groups (Karen Horney)</h3>
              <p className="text-xs text-slate-400 mb-4">How each type responds to getting their needs met, based on Karen Horney&apos;s three fundamental strategies.</p>
              <div className="space-y-4">
                {hornevianGroups.map((group) => (
                  <div key={group.name} className="p-5 rounded-2xl bg-white border border-slate-100">
                    <h4 className="font-serif font-semibold text-slate-800 mb-1">{group.name}</h4>
                    <div className="text-xs text-sky-500 mb-2">Types {group.types.join(", ")} · {group.strategy}</div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{group.description}</p>
                    <div className="p-3 rounded-xl bg-slate-50">
                      <p className="text-xs text-slate-500 italic">{group.horneyDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Harmonic Groups */}
            <div>
              <h3 className="font-serif font-semibold text-lg text-slate-800 mb-4">Harmonic Groups (Riso-Hudson)</h3>
              <p className="text-xs text-slate-400 mb-4">How each type handles conflict and difficulty.</p>
              <div className="space-y-4">
                {harmonicGroups.map((group) => (
                  <div key={group.name} className="p-5 rounded-2xl bg-white border border-slate-100">
                    <h4 className="font-serif font-semibold text-slate-800 mb-1">{group.name}</h4>
                    <div className="text-xs text-sky-500 mb-2">Types {group.types.join(", ")} · {group.response}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{group.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Object Relations */}
            <div>
              <h3 className="font-serif font-semibold text-lg text-slate-800 mb-4">Object Relations Groups</h3>
              <p className="text-xs text-slate-400 mb-4">How each type relates to their primary attachment figures, based on object relations theory and Riso-Hudson&apos;s research.</p>
              <div className="space-y-4">
                {objectRelationsGroups.map((group) => (
                  <div key={group.name} className="p-5 rounded-2xl bg-white border border-slate-100">
                    <h4 className="font-serif font-semibold text-slate-800 mb-1">{group.name}</h4>
                    <div className="text-xs text-sky-500 mb-2">Types {group.types.join(", ")} · {group.relationship}</div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{group.description}</p>
                    <div className="p-3 rounded-xl bg-violet-50/30 border border-violet-100/50">
                      <div className="text-[10px] font-medium text-violet-600 mb-1">Psychodynamics</div>
                      <p className="text-xs text-slate-600">{group.psychodynamics}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Next Step Banners — shown at the natural end of each tab */}
        {learnTab === "types" && (
          <NextStepBanner
            href="/daily"
            label="Start your daily practice"
            sublabel="Quiz, insight, and growth challenge — personalized to your type"
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <LearnContent />
    </Suspense>
  );
}
