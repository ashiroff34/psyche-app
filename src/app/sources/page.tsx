"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ExternalLink, AlertTriangle, GraduationCap, Lightbulb, ArrowRight } from "lucide-react";

const primarySources = [
  {
    author: "Carl Gustav Jung",
    title: "Psychological Types",
    year: "1921",
    description: "The foundational work defining the eight cognitive functions and the introverted/extraverted attitudes. This is the original source for the entire cognitive function framework used in this app.",
    category: "Cognitive Functions",
  },
  {
    author: "Claudio Naranjo",
    title: "Character and Neurosis: An Integrative View",
    year: "1994",
    description: "Naranjo bridges the Enneagram with clinical psychology, mapping each type to specific personality disorders, defense mechanisms, and neurotic patterns. His passion/fixation/virtue framework is central to this app.",
    category: "Enneagram",
  },
  {
    author: "Beatrice Chestnut",
    title: "The Complete Enneagram: 27 Paths to Greater Self-Knowledge",
    year: "2013",
    description: "The definitive resource on the 27 subtypes (instinctual variants). Chestnut systematically describes how each Enneagram type manifests differently depending on instinctual stacking, including counter-types.",
    category: "Subtypes",
  },
  {
    author: "Don Richard Riso & Russ Hudson",
    title: "Personality Types: Using the Enneagram for Self-Discovery",
    year: "1996",
    description: "Introduces the 9 Levels of Development for each type, from healthy integration to average functioning to unhealthy disintegration. A key framework for understanding type dynamics.",
    category: "Enneagram",
  },
  {
    author: "John Beebe",
    title: "Energies and Patterns in Psychological Type",
    year: "2017",
    description: "Beebe's archetypal model maps all 8 cognitive functions to Jungian archetypes (Hero, Parent, Child, Anima, Nemesis, Critical Parent, Trickster, Demon). This is the basis for the shadow function model used here.",
    category: "Shadow Functions",
  },
  {
    author: "Oscar Ichazo",
    title: "Letters to the School (Arica Institute)",
    year: "1988",
    description: "Ichazo originated the modern Enneagram of personality, defining the Holy Ideas, passions, fixations, and virtues for each type. His framework underpins all subsequent Enneagram theory.",
    category: "Enneagram",
  },
];

const additionalSources = [
  { author: "Sandra Maitri", title: "The Spiritual Dimension of the Enneagram", year: "2000", category: "Enneagram" },
  { author: "A.H. Almaas", title: "Facets of Unity: The Enneagram of Holy Ideas", year: "1998", category: "Enneagram" },
  { author: "Dario Nardi", title: "Neuroscience of Personality", year: "2011", category: "Cognitive Functions" },
  { author: "Linda Berens", title: "Understanding Yourself and Others: An Introduction to Interaction Styles", year: "2006", category: "Interaction Styles" },
  { author: "Mark Hunziker", title: "Depth Typology: C.G. Jung, Isabel Myers, John Beebe, and the Guide Map to Becoming Who We Are", year: "2016", category: "Cognitive Functions" },
  { author: "Marie-Louise von Franz", title: "Lectures on Jung's Typology", year: "1971", category: "Cognitive Functions" },
  { author: "Naomi Quenk", title: "Was That Really Me? How Everyday Stress Brings Out Our Hidden Personality", year: "2002", category: "Grip/Inferior Function" },
  { author: "David Daniels & Virginia Price", title: "The Essential Enneagram", year: "2000", category: "Enneagram" },
  { author: "Helen Palmer", title: "The Enneagram: Understanding Yourself and Others in Your Life", year: "1988", category: "Enneagram" },
  { author: "Jerome Wagner", title: "The Enneagram Spectrum of Personality Styles", year: "1996", category: "Enneagram" },
];

export default function SourcesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 text-sky-400 text-xs font-medium mb-4" style={{ background: "rgba(14,165,233,0.1)" }}>
            <BookOpen className="w-3 h-3" /> Research & Sources
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.95)" }}>Sources & Further Reading</h1>
          <p className="max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>Every framework in Thyself is grounded in published clinical and academic research. Here are the primary sources that inform our content.</p>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-3xl mb-10" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(245,158,11,0.2)" }}>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif font-semibold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>A Note on Scientific Validity</h3>
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                <p>
                  <strong>On Cognitive Functions:</strong> The type system used here is based on <strong>Carl Jung&apos;s original cognitive function theory</strong> from Psychological Types (1921), not the commercial MBTI instrument or the 16Personalities website. The four-letter type codes (INTJ, ENFP, etc.) are used as convenient shorthand for <em>cognitive function stacks</em>, not as fixed personality labels.
                </p>
                <p>
                  <strong>16Personalities is not Jungian typology.</strong> The popular 16Personalities website uses Big Five personality traits repackaged with MBTI-like labels. It does not assess cognitive functions at all. Our app focuses on the functions themselves, how you perceive and judge information, which is the actual substance of Jung&apos;s theory.
                </p>
                <p>
                  <strong>On the Enneagram:</strong> The Enneagram as used here draws primarily from Naranjo&apos;s clinical framework, which maps personality patterns to established psychological constructs (defense mechanisms, attachment theory, DSM correlates). While the Enneagram lacks the same level of empirical validation as Big Five, its clinical utility has been demonstrated in psychotherapy contexts.
                </p>
                <p>
                  <strong>This is a self-discovery tool, not a clinical diagnostic instrument.</strong> Personality frameworks are maps, not territories. Use them as lenses for self-understanding, not rigid labels.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What Makes This Different */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-6 rounded-3xl mb-10" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(99,102,241,0.2)" }}>
              <Lightbulb className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-serif font-semibold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>Jung&apos;s Typology vs. MBTI&reg; vs. 16Personalities</h3>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="text-xs font-mono text-emerald-400 mb-1">WHAT WE USE</div>
                  <h4 className="font-semibold text-sm mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>Jung&apos;s Cognitive Functions</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>8 mental processes (Ni, Ne, Si, Se, Ti, Te, Fi, Fe) describing how you perceive and judge. Based on Psychological Types (1921) and expanded by Beebe, Nardi, and Berens.</p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="text-xs font-mono text-amber-400 mb-1">NOT THE SAME</div>
                  <h4 className="font-semibold text-sm mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>Myers-Briggs (MBTI)</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>A commercial instrument by Isabel Myers and Katharine Briggs. Uses dichotomies (E/I, S/N, T/F, J/P) which don&apos;t fully capture function dynamics. Has mixed empirical support.</p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="text-xs font-mono text-red-400 mb-1">PSEUDOSCIENCE</div>
                  <h4 className="font-semibold text-sm mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>16Personalities</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>A popular website that uses Big Five traits repackaged with type labels. Not based on cognitive functions at all. Results correlate with Big Five, not Jung&apos;s typology.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary Sources */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.95)" }}>
            <GraduationCap className="w-6 h-6 text-sky-400" /> Primary Sources
          </h2>
          <div className="space-y-4 mb-12">
            {primarySources.map((source, i) => (
              <motion.div key={i} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05 }} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] rounded-lg text-sky-400 font-medium" style={{ background: "rgba(14,165,233,0.15)" }}>{source.category}</span>
                    <h3 className="font-serif font-semibold mt-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                      {source.title} <span className="font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>({source.year})</span>
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{source.author}</p>
                    <p className="text-sm mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{source.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Sources */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "rgba(255,255,255,0.95)" }}>Additional Reading</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-12">
            {additionalSources.map((source, i) => (
              <div key={i} className="p-4 rounded-xl transition" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="px-2 py-0.5 text-[10px] rounded font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>{source.category}</span>
                <h4 className="font-medium text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.85)" }}>{source.title}</h4>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{source.author} ({source.year})</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Online Resources */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: "rgba(255,255,255,0.95)" }}>Trusted Online Resources</h2>
          <div className="space-y-3 mb-12">
            {[
              { name: "Personality Database (PDB)", desc: "Community-driven database of personality typings using cognitive functions and Enneagram, with detailed analysis and discussion." },
              { name: "Enneagram Institute", desc: "Founded by Riso & Hudson. Comprehensive type descriptions, levels of development, and integration/disintegration pathways." },
              { name: "The Chestnut Paes Enneagram Academy", desc: "Beatrice Chestnut's educational platform for deep subtype work and clinical Enneagram." },
              { name: "Cognitive Type", desc: "Research project combining brain imaging with Jungian function theory to identify neurological correlates of cognitive functions." },
            ].map((resource, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h4 className="font-medium text-sm flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {resource.name} <ExternalLink className="w-3 h-3" style={{ color: "rgba(255,255,255,0.3)" }} />
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{resource.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to app */}
        <div className="text-center py-8">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium hover:shadow-lg transition-all">
            Back to Thyself <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
