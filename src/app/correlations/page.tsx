"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeftRight, Brain, Compass, ChevronDown, ChevronUp, Info, BarChart3, Sparkles, Users } from "lucide-react";
import NextStepBanner from "@/components/NextStepBanner";

// Correlation data based on Personality Database (PDB) research and statistical patterns
// These represent OBSERVED CORRELATIONS, not deterministic mappings
const enneagramToCognitiveCorrelations: Record<string, { types: { code: string; percentage: number; note: string }[]; insight: string }> = {
  "1": {
    types: [
      { code: "ISTJ", percentage: 28, note: "Si-Te: Duty-oriented, systematic adherence to standards" },
      { code: "INTJ", percentage: 18, note: "Ni-Te: Principled visionary perfectionism" },
      { code: "ESTJ", percentage: 15, note: "Te-Si: External order and structural reform" },
      { code: "INFJ", percentage: 10, note: "Ni-Fe: Idealistic moral vision" },
      { code: "ISFJ", percentage: 8, note: "Si-Fe: Dutiful service and traditional values" },
    ],
    insight: "Type 1s strongly correlate with Te and Si functions — the drive for correctness maps to systematic external organization (Te) and adherence to established standards (Si). The inner critic aligns with strong judging function preference."
  },
  "2": {
    types: [
      { code: "ESFJ", percentage: 30, note: "Fe-Si: Warm, traditional caregiving" },
      { code: "ENFJ", percentage: 22, note: "Fe-Ni: Visionary people-developing" },
      { code: "ISFJ", percentage: 15, note: "Si-Fe: Quiet, devoted service" },
      { code: "ENFP", percentage: 10, note: "Ne-Fi: Enthusiastic emotional connection" },
      { code: "INFJ", percentage: 8, note: "Ni-Fe: Deep empathic insight" },
    ],
    insight: "Type 2s overwhelmingly correlate with Fe (Extraverted Feeling) — the core motivation to be loved maps directly to attunement to others' emotional needs. Fe-dominant types make up over 50% of observed 2s."
  },
  "3": {
    types: [
      { code: "ENTJ", percentage: 25, note: "Te-Ni: Strategic achievement and leadership" },
      { code: "ESTJ", percentage: 18, note: "Te-Si: Efficient, results-driven management" },
      { code: "ESTP", percentage: 14, note: "Se-Ti: Pragmatic, image-conscious action" },
      { code: "ENFJ", percentage: 12, note: "Fe-Ni: Charismatic inspiring leadership" },
      { code: "ENTP", percentage: 8, note: "Ne-Ti: Versatile, entrepreneurial innovation" },
    ],
    insight: "Type 3s correlate strongly with Te and Se — achievement orientation maps to Te's drive for measurable results, while image-consciousness maps to Se's awareness of external presentation. Extraverted types dominate."
  },
  "4": {
    types: [
      { code: "INFP", percentage: 35, note: "Fi-Ne: Deep authenticity and creative imagination" },
      { code: "INFJ", percentage: 20, note: "Ni-Fe: Profound emotional depth and symbolic meaning" },
      { code: "ISFP", percentage: 15, note: "Fi-Se: Aesthetic authenticity in the moment" },
      { code: "ENFP", percentage: 10, note: "Ne-Fi: Expressive emotional exploration" },
      { code: "INTJ", percentage: 5, note: "Ni-Te: 4w5 — intense, withdrawn intellectual depth" },
    ],
    insight: "Type 4s correlate overwhelmingly with Fi (Introverted Feeling) — the core drive for authenticity and unique identity maps directly to Fi's internal value system. INFPs make up the largest single group of 4s in PDB data."
  },
  "5": {
    types: [
      { code: "INTP", percentage: 30, note: "Ti-Ne: Theoretical frameworks and analytical depth" },
      { code: "INTJ", percentage: 28, note: "Ni-Te: Strategic, detached, systems-thinking" },
      { code: "ISTP", percentage: 12, note: "Ti-Se: Practical analytical competence" },
      { code: "INFJ", percentage: 8, note: "Ni-Fe: Withdrawn insightful observation (5w4)" },
      { code: "ISTJ", percentage: 7, note: "Si-Te: Methodical, detail-oriented mastery" },
    ],
    insight: "Type 5s correlate strongly with Ti and Ni — the drive for competence and understanding maps to Ti's analytical precision and Ni's deep pattern recognition. Introverted types dominate overwhelmingly (90%+). Your type — INTJ 5 — is one of the most common pairings."
  },
  "6": {
    types: [
      { code: "ISFJ", percentage: 20, note: "Si-Fe: Security through tradition and community" },
      { code: "ISTJ", percentage: 18, note: "Si-Te: Security through structure and reliability" },
      { code: "INFJ", percentage: 12, note: "Ni-Fe: Anticipatory anxiety and deep loyalty" },
      { code: "ESFJ", percentage: 10, note: "Fe-Si: Community-oriented security seeking" },
      { code: "INTP", percentage: 8, note: "Ti-Ne: Counterphobic intellectual questioning (6w5)" },
    ],
    insight: "Type 6 shows the widest distribution across cognitive types — anxiety and loyalty are not function-specific. However, Si correlates strongly with the phobic subtype (security through precedent), while counterphobic 6s show more diverse function stacks."
  },
  "7": {
    types: [
      { code: "ENFP", percentage: 28, note: "Ne-Fi: Enthusiastic possibility exploration" },
      { code: "ENTP", percentage: 25, note: "Ne-Ti: Intellectual curiosity and variety" },
      { code: "ESTP", percentage: 12, note: "Se-Ti: Sensory adventure and quick thinking" },
      { code: "ESFP", percentage: 10, note: "Se-Fi: Joyful sensory experience" },
      { code: "ENFJ", percentage: 7, note: "Fe-Ni: Social enthusiasm with vision" },
    ],
    insight: "Type 7s correlate overwhelmingly with Ne and Se — the drive to avoid pain through stimulation maps to Ne's possibility-seeking and Se's sensory engagement. Extraverted Perceiving dominates. The 'gluttony' of 7 manifests as cognitive appetite for Ne-doms and sensory appetite for Se-doms."
  },
  "8": {
    types: [
      { code: "ENTJ", percentage: 25, note: "Te-Ni: Commanding strategic power" },
      { code: "ESTP", percentage: 22, note: "Se-Ti: Forceful, direct, pragmatic action" },
      { code: "ESTJ", percentage: 15, note: "Te-Si: Authoritative structural control" },
      { code: "INTJ", percentage: 10, note: "Ni-Te: Quiet, intense strategic control (8w9 or sp8)" },
      { code: "ISTP", percentage: 8, note: "Ti-Se: Independent, self-sufficient competence" },
    ],
    insight: "Type 8s correlate with Te and Se — the drive for control and autonomy maps to Te's executive function and Se's physical assertiveness. The lust/intensity of 8 manifests as decisive action (Te) or visceral force (Se). Thinking types dominate."
  },
  "9": {
    types: [
      { code: "INFP", percentage: 20, note: "Fi-Ne: Gentle, harmonious inner world" },
      { code: "ISFP", percentage: 18, note: "Fi-Se: Peaceful, present-moment acceptance" },
      { code: "ISFJ", percentage: 15, note: "Si-Fe: Supportive, accommodating stability" },
      { code: "INFJ", percentage: 12, note: "Ni-Fe: Merging with others' perspectives" },
      { code: "INTP", percentage: 8, note: "Ti-Ne: Withdrawn, easygoing intellectual (9w5)" },
    ],
    insight: "Type 9s show a strong preference for Introverted and Feeling functions — the drive to maintain inner peace maps to Fi's gentle value system and Si's stability-seeking. The 'sloth' of 9 (self-forgetting) appears as lost access to the dominant function's assertiveness."
  },
};

const cognitiveToEnneagramCorrelations: Record<string, { types: { num: number; percentage: number; note: string }[]; insight: string }> = {
  "INTJ": {
    types: [
      { num: 5, percentage: 35, note: "Ni-Te aligns with 5's drive for competence and detachment" },
      { num: 1, percentage: 20, note: "Te standards-setting aligns with 1's perfectionism" },
      { num: 3, percentage: 12, note: "Te efficiency aligns with 3's achievement drive" },
      { num: 8, percentage: 10, note: "Ni-Te strategic control aligns with 8's autonomy" },
      { num: 4, percentage: 8, note: "Tertiary Fi depth aligns with 4's identity focus (rare but distinct)" },
    ],
    insight: "INTJs are most commonly Type 5 (the classic 'detached strategist') or Type 1 (the 'principled architect'). The Ni-Te stack naturally serves both competence-seeking (5) and perfectionism (1). sx/so 5w6 INTJ is a particularly common and distinct pattern."
  },
  "INFP": {
    types: [
      { num: 4, percentage: 40, note: "Fi-Ne maps perfectly to 4's authenticity and imaginative depth" },
      { num: 9, percentage: 20, note: "Fi gentleness maps to 9's harmony-seeking" },
      { num: 6, percentage: 10, note: "Ne anxiety and Fi loyalty map to 6's questioning" },
      { num: 5, percentage: 8, note: "Withdrawn INFPs sometimes identify as 5w4" },
      { num: 2, percentage: 7, note: "Fi empathy can express as 2's helping drive" },
    ],
    insight: "INFPs are the type most commonly associated with Enneagram 4 — Fi's drive for authenticity maps directly to 4's identity fixation. However, the INFP 9 combination is underappreciated and produces a distinctly gentle, accommodating pattern."
  },
  "ENTP": {
    types: [
      { num: 7, percentage: 35, note: "Ne's possibility-seeking maps to 7's stimulation drive" },
      { num: 5, percentage: 15, note: "Ti's analytical depth in a 7w6 or withdrawn ENTP" },
      { num: 3, percentage: 12, note: "Ne-Ti versatility serves 3's image adaptation" },
      { num: 8, percentage: 10, note: "Assertive ENTPs often type as 8 or 7w8" },
      { num: 6, percentage: 8, note: "Ti questioning and Ne pattern-scanning serve 6's vigilance" },
    ],
    insight: "ENTPs overwhelmingly type as 7 — Ne's hunger for possibilities is the cognitive equivalent of 7's gluttony. The ENTP 7w8 is the classic 'entrepreneurial visionary' pattern."
  },
  "INFJ": {
    types: [
      { num: 4, percentage: 22, note: "Ni depth and Fe empathy create the 'deep emotional seer'" },
      { num: 1, percentage: 18, note: "Ni vision and moral intensity create the 'principled idealist'" },
      { num: 5, percentage: 15, note: "Ni withdrawal creates the 'detached prophet' (5w4)" },
      { num: 9, percentage: 12, note: "Fe's merging tendency maps to 9's self-forgetting" },
      { num: 2, percentage: 10, note: "Fe caregiving maps to 2's helping drive" },
      { num: 6, percentage: 8, note: "Ni anticipation maps to 6's anxiety and foresight" },
    ],
    insight: "INFJs show the most diverse Enneagram distribution of any cognitive type — Ni-Fe serves multiple core motivations equally well. The INFJ 4w5 and INFJ 1w9 are both extremely common and produce very different personalities despite the same cognitive stack."
  },
  "ENFP": {
    types: [
      { num: 7, percentage: 30, note: "Ne excitement maps to 7's enthusiasm and possibility-seeking" },
      { num: 4, percentage: 20, note: "Fi depth maps to 4's identity and emotional intensity" },
      { num: 2, percentage: 15, note: "Ne-Fi warmth and connection maps to 2's love drive" },
      { num: 9, percentage: 10, note: "Fi gentleness with Ne adaptability maps to 9's peacemaking" },
      { num: 6, percentage: 8, note: "Ne-Fi questioning and loyalty map to 6's pattern" },
    ],
    insight: "ENFPs split between 7 (Ne-dominant enthusiasm) and 4 (Fi-auxiliary depth). An ENFP 7w6 vs ENFP 4w3 can appear like entirely different types despite the same function stack — highlighting how Enneagram and cognitive functions capture different dimensions."
  },
  "INTP": {
    types: [
      { num: 5, percentage: 38, note: "Ti-Ne maps to 5's drive for competence and autonomous understanding" },
      { num: 9, percentage: 16, note: "Ti detachment and Ne flexibility map to 9's easygoing withdrawal" },
      { num: 4, percentage: 12, note: "Withdrawn INTPs with strong Fi inferior may present as 4w5" },
      { num: 6, percentage: 10, note: "Ti skepticism and Ne pattern-scanning map to 6's vigilant questioning" },
      { num: 1, percentage: 8, note: "Perfectionist Ti standards can align with 1's inner critic" },
    ],
    insight: "INTPs are the type most commonly associated with Enneagram 5 alongside INTJs — Ti's drive for internal logical mastery maps directly to 5's hoarding of knowledge. The INTP 5w4 is particularly distinctive: analytical depth with emotional intensity."
  },
  "ENTJ": {
    types: [
      { num: 3, percentage: 28, note: "Te's results-drive aligns with 3's achievement and image" },
      { num: 8, percentage: 22, note: "Ni-Te strategic commanding power aligns with 8's control" },
      { num: 1, percentage: 16, note: "Te standards and Ni vision align with 1's principled drive" },
      { num: 5, percentage: 10, note: "Ni depth with Te efficiency creates the 5's competence drive" },
      { num: 6, percentage: 7, note: "Strategic Te anticipation aligns with 6's preparation" },
    ],
    insight: "ENTJs cluster around 3 and 8 — Te's drive for measurable results and Ni's strategic authority serve both archetypes. The ENTJ 8w7 is the classic 'commanding general' while ENTJ 3w4 produces the 'strategic visionary achiever.'"
  },
  "ENFJ": {
    types: [
      { num: 2, percentage: 26, note: "Fe caregiving maps to 2's drive to be loved and needed" },
      { num: 1, percentage: 18, note: "Ni vision and Fe idealism create the 1's moral reformer" },
      { num: 3, percentage: 14, note: "Fe charisma and Ni focus serve 3's inspirational leadership" },
      { num: 4, percentage: 12, note: "Ni depth and Fe feeling create the 4's emotional authenticity" },
      { num: 9, percentage: 8, note: "Fe merging tendency maps to 9's self-forgetting harmony" },
    ],
    insight: "ENFJs concentrate in types 1, 2, and 3 — all sharing a strong relational orientation. Fe's attunement to others' needs serves the Helper's love drive (2), the Reformer's social idealism (1), and the Achiever's interpersonal performance (3)."
  },
  "ISFJ": {
    types: [
      { num: 6, percentage: 25, note: "Si-Fe security-seeking through loyalty and tradition aligns with 6" },
      { num: 2, percentage: 20, note: "Fe caregiving and Si reliability create devoted helper patterns" },
      { num: 1, percentage: 15, note: "Si-Fe duty and standards align with 1's principled service" },
      { num: 9, percentage: 12, note: "Si stability and Fe accommodation map to 9's peacekeeping" },
      { num: 4, percentage: 6, note: "Introspective ISFJs with strong anima may identify with 4" },
    ],
    insight: "ISFJs cluster in types 6 and 2 — Si's deep need for familiar security maps to 6's loyalty and anxiety, while Fe's warm caregiving maps to 2's drive to be needed. The ISFJ 6w7 produces the steadfast loyal friend archetype."
  },
  "ESFJ": {
    types: [
      { num: 2, percentage: 32, note: "Fe warmth and Si reliability create the quintessential Helper" },
      { num: 6, percentage: 18, note: "Fe community focus and Si tradition map to 6's loyal security" },
      { num: 1, percentage: 12, note: "Fe social standards and Si duty align with 1's responsible reformer" },
      { num: 3, percentage: 10, note: "Fe social image and Si performance create 3's people-oriented achiever" },
      { num: 9, percentage: 8, note: "Fe harmony-seeking and Si accommodation map to 9's peacekeeping" },
    ],
    insight: "ESFJs are the most common Type 2 cognitive type — Fe dominant caregiving is the cognitive signature of 2's love and approval drive. Si's attachment to traditional community adds a layer of loyalty and reliability that deepens both 2 and 6 patterns."
  },
  "ISTJ": {
    types: [
      { num: 1, percentage: 30, note: "Si-Te: systematic duty and internal standards align with 1's perfectionism" },
      { num: 6, percentage: 22, note: "Si security through precedent and Te structure align with 6's vigilance" },
      { num: 5, percentage: 12, note: "Si knowledge-hoarding and Te efficiency serve 5's competence drive" },
      { num: 3, percentage: 10, note: "Te efficiency and Si reliability create 3's dependable achiever" },
      { num: 9, percentage: 8, note: "Si routine and Te steady delivery align with 9's easygoing stability" },
    ],
    insight: "ISTJs cluster around types 1 and 6 — Si's reverence for established standards and Te's drive for correctness align with both 1's perfectionism and 6's security through structure. The ISTJ 1w9 is the classic 'reliable pillar of integrity.'"
  },
  "ESTJ": {
    types: [
      { num: 1, percentage: 28, note: "Te external order and Si tradition align with 1's principled reform" },
      { num: 3, percentage: 20, note: "Te achievement drive and Si performance align with 3's results focus" },
      { num: 6, percentage: 16, note: "Te structure and Si tradition serve 6's security through reliability" },
      { num: 8, percentage: 12, note: "Te decisiveness and authority align with 8's commanding control" },
      { num: 2, percentage: 6, note: "Warm ESTJs may identify with 2's service drive" },
    ],
    insight: "ESTJs concentrate in types 1, 3, and 6 — Te's drive for external systems and results serves all three. Si's attachment to proven methods amplifies both 1's standards and 6's traditional security. The ESTJ 8w7 creates the decisive executive archetype."
  },
  "ISTP": {
    types: [
      { num: 5, percentage: 30, note: "Ti analytical detachment maps to 5's competence-hoarding" },
      { num: 9, percentage: 20, note: "Ti-Se equanimity and present-moment flow map to 9's independence" },
      { num: 8, percentage: 14, note: "Se-Ti direct action and independence align with 8's autonomy" },
      { num: 4, percentage: 10, note: "Introspective ISTPs with Fe anima may identify with 4's depth" },
      { num: 6, percentage: 8, note: "Ti skepticism and Se vigilance can map to 6's counterphobic pattern" },
    ],
    insight: "ISTPs cluster in types 5 and 9 — Ti's detached mastery maps to 5's knowledge hoarding, while Se-Ti's present-moment equanimity maps to 9's peaceful independence. The ISTP 9w8 produces the archetype of the quiet, self-sufficient craftsman."
  },
  "ESTP": {
    types: [
      { num: 8, percentage: 28, note: "Se-Ti direct action and force align with 8's power and autonomy" },
      { num: 7, percentage: 20, note: "Se stimulation-seeking maps to 7's gluttony for experience" },
      { num: 3, percentage: 16, note: "Se image-awareness and Ti pragmatism serve 3's performance drive" },
      { num: 6, percentage: 10, note: "Se vigilance and Ti pattern-testing align with 6's counterphobic scanning" },
      { num: 9, percentage: 7, note: "Easygoing ESTPs can present as 9w8's low-key assertiveness" },
    ],
    insight: "ESTPs cluster around types 8 and 7 — Se's direct physical engagement maps to 8's commanding force, while Se's stimulation-seeking maps to 7's experiential hunger. The ESTP 8w7 is the archetype of raw, energetic dominance."
  },
  "ISFP": {
    types: [
      { num: 9, percentage: 25, note: "Fi-Se gentle acceptance and present-moment peace align with 9" },
      { num: 4, percentage: 22, note: "Fi authenticity and aesthetic depth map to 4's identity" },
      { num: 2, percentage: 12, note: "Fi warmth expressed through physical care maps to 2's devotion" },
      { num: 6, percentage: 10, note: "Fi loyalty and Se caution can map to 6's devoted security" },
      { num: 1, percentage: 7, note: "Strong Fi values in ISFPs can present as 1's principled integrity" },
    ],
    insight: "ISFPs cluster in types 9 and 4 — Fi's quiet depth serves 4's identity-seeking, while Fi-Se's present-moment gentleness maps to 9's peaceful flow. The ISFP 4w5 produces the introverted artist archetype; ISFP 9w8 the serene but quietly assertive loner."
  },
  "ESFP": {
    types: [
      { num: 7, percentage: 28, note: "Se-Fi enthusiasm and sensory joy map to 7's experiential gluttony" },
      { num: 2, percentage: 22, note: "Fi warmth and Se engagement create 2's expressive love" },
      { num: 3, percentage: 14, note: "Se presence and Fi warmth serve 3's socially charming performer" },
      { num: 9, percentage: 10, note: "Fi-Se present-moment acceptance maps to 9's easygoing harmony" },
      { num: 4, percentage: 7, note: "Emotionally intense ESFPs with strong Fi may identify with 4" },
    ],
    insight: "ESFPs cluster around types 7 and 2 — Se's sensory joy maps to 7's gluttony for experience, while Fi's genuine warmth maps to 2's drive to love and be loved. The ESFP 7w6 is the archetypal party host; the ESFP 2w3 the warm, giving performer."
  },
};

const typeColors: Record<number, string> = {
  1: "#E74C3C", 2: "#27AE60", 3: "#F39C12", 4: "#8E44AD", 5: "#3498DB",
  6: "#2C3E50", 7: "#E67E22", 8: "#C0392B", 9: "#1ABC9C",
};

export default function CorrelationsPage() {
  const [direction, setDirection] = useState<"enn-to-cog" | "cog-to-enn">("enn-to-cog");
  const [selectedEnn, setSelectedEnn] = useState<string | null>(null);
  const [selectedCog, setSelectedCog] = useState<string | null>(null);

  const ennData = selectedEnn ? enneagramToCognitiveCorrelations[selectedEnn] : null;
  const cogData = selectedCog ? cognitiveToEnneagramCorrelations[selectedCog] : null;

  const availableCogTypes = Object.keys(cognitiveToEnneagramCorrelations);

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-medium mb-4">
            <ArrowLeftRight className="w-3 h-3" /> Cross-System Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">Type Correlations</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">How do Enneagram types and cognitive function stacks correlate? Based on Personality Database research and observed patterns.</p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100/50 mb-8 flex items-start gap-3">
          <Info className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            These correlations reflect <strong>observed statistical patterns</strong>, not deterministic rules. Any Enneagram type can pair with any cognitive function stack. These percentages are approximate and based on community typing data from PDB and research literature.
          </p>
        </motion.div>

        {/* Direction Toggle */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit mx-auto mb-10">
          <button onClick={() => { setDirection("enn-to-cog"); setSelectedCog(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${direction === "enn-to-cog" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}>
            <Compass className="w-4 h-4" /> Enneagram → Cognitive
          </button>
          <button onClick={() => { setDirection("cog-to-enn"); setSelectedEnn(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${direction === "cog-to-enn" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}>
            <Brain className="w-4 h-4" /> Cognitive → Enneagram
          </button>
        </div>

        {direction === "enn-to-cog" && (
          <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-lg font-serif font-semibold text-slate-800 mb-4 text-center">
              Select an Enneagram type to see its most common cognitive function pairings
            </h2>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {[1,2,3,4,5,6,7,8,9].map(num => (
                <button key={num} onClick={() => setSelectedEnn(String(num))}
                  className={`w-14 h-14 rounded-2xl text-lg font-serif font-bold transition-all ${selectedEnn === String(num) ? "text-white shadow-lg scale-110" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"}`}
                  style={selectedEnn === String(num) ? { backgroundColor: typeColors[num] } : undefined}>
                  {num}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {ennData && (
                <motion.div key={selectedEnn} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  {/* Bar Chart */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <h3 className="font-serif font-semibold text-slate-800 mb-1 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-sky-500" />
                      Most Common Cognitive Types for Type {selectedEnn}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">Approximate distribution based on PDB data</p>
                    <div className="space-y-4">
                      {ennData.types.map((t, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono font-bold text-sm text-slate-800">{t.code}</span>
                            <span className="text-xs text-slate-400">{t.percentage}%</span>
                          </div>
                          <div className="h-8 bg-slate-50 rounded-xl overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${t.percentage}%` }}
                              transition={{ duration: 0.6, delay: i * 0.1 }}
                              className="h-full rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 flex items-center justify-end pr-3"
                              style={{ minWidth: "80px" }}
                            >
                              <span className="text-[10px] text-white font-medium truncate">{t.note.split(":")[0]}</span>
                            </motion.div>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">{t.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insight */}
                  <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700 leading-relaxed">{ennData.insight}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {direction === "cog-to-enn" && (
          <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-lg font-serif font-semibold text-slate-800 mb-4 text-center">
              Select a Jungian type to see its most common Enneagram pairings
            </h2>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {availableCogTypes.map(code => (
                <button key={code} onClick={() => setSelectedCog(code)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-mono font-medium transition-all ${selectedCog === code ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200"}`}>
                  {code}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {cogData && (
                <motion.div key={selectedCog} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <h3 className="font-serif font-semibold text-slate-800 mb-1 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-sky-500" />
                      Most Common Enneagram Types for {selectedCog}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">Approximate distribution based on PDB data</p>
                    <div className="space-y-4">
                      {cogData.types.map((t, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-serif font-bold text-sm" style={{ color: typeColors[t.num] }}>Type {t.num}</span>
                            <span className="text-xs text-slate-400">{t.percentage}%</span>
                          </div>
                          <div className="h-8 bg-slate-50 rounded-xl overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${t.percentage}%` }}
                              transition={{ duration: 0.6, delay: i * 0.1 }}
                              className="h-full rounded-xl flex items-center justify-end pr-3"
                              style={{ backgroundColor: typeColors[t.num], minWidth: "80px" }}
                            >
                              <span className="text-[10px] text-white font-medium truncate">{t.percentage}%</span>
                            </motion.div>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">{t.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700 leading-relaxed">{cogData.insight}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Link to Sources */}
        <div className="mt-12 text-center">
          <Link href="/sources" className="text-sm text-sky-600 hover:text-sky-700 font-medium transition">
            View all sources & methodology →
          </Link>
        </div>

        <NextStepBanner
          href="/compare"
          label="Compare two types side by side"
          sublabel="See compatibility, growth dynamics, and relationship insights"
          icon={<Users className="w-5 h-5" />}
          color="#ec4899"
        />
      </div>
    </div>
  );
}
