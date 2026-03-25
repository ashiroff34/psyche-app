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
    description: "Introduces the 9 Levels of Development for each type — from healthy integration to average functioning to unhealthy disintegration. A key framework for understanding type dynamics.",
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-medium mb-4">
            <BookOpen className="w-3 h-3" /> Research & Sources
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">Sources & Further Reading</h1>
          <p className="text-slate-500 max-w-2xl mb-10">Every framework in Thyself is grounded in published clinical and academic research. Here are the primary sources that inform our content.</p>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/50 mb-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-slate-800 mb-2">A Note on Scientific Validity</h3>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>On Cognitive Functions:</strong> The type system used here is based on <strong>Carl Jung&apos;s original cognitive function theory</strong> from Psychological Types (1921) — NOT the commercial MBTI instrument or the 16Personalities website. The four-letter type codes (INTJ, ENFP, etc.) are used as convenient shorthand for <em>cognitive function stacks</em>, not as fixed personality labels.
                </p>
                <p>
                  <strong>16Personalities is not Jungian typology.</strong> The popular 16Personalities website uses Big Five personality traits repackaged with MBTI-like labels. It does not assess cognitive functions at all. Our app focuses on the functions themselves — how you perceive and judge information — which is the actual substance of Jung&apos;s theory.
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
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100/50 mb-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-slate-800 mb-2">Jung&apos;s Typology vs. MBTI&reg; vs. 16Personalities</h3>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-100">
                  <div className="text-xs font-mono text-emerald-600 mb-1">WHAT WE USE</div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-2">Jung&apos;s Cognitive Functions</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">8 mental processes (Ni, Ne, Si, Se, Ti, Te, Fi, Fe) describing how you perceive and judge. Based on Psychological Types (1921) and expanded by Beebe, Nardi, and Berens.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100">
                  <div className="text-xs font-mono text-amber-600 mb-1">NOT THE SAME</div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-2">Myers-Briggs (MBTI)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">A commercial instrument by Isabel Myers and Katharine Briggs. Uses dichotomies (E/I, S/N, T/F, J/P) which don&apos;t fully capture function dynamics. Has mixed empirical support.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100">
                  <div className="text-xs font-mono text-red-600 mb-1">PSEUDOSCIENCE</div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-2">16Personalities</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">A popular website that uses Big Five traits repackaged with type labels. Not based on cognitive functions at all. Results correlate with Big Five, not Jung&apos;s typology.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary Sources */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-sky-600" /> Primary Sources
          </h2>
          <div className="space-y-4 mb-12">
            {primarySources.map((source, i) => (
              <motion.div key={i} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05 }} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] rounded-lg bg-sky-50 text-sky-600 font-medium">{source.category}</span>
                    <h3 className="font-serif font-semibold text-slate-800 mt-2">
                      {source.title} <span className="text-slate-400 font-normal">({source.year})</span>
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">{source.author}</p>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">{source.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Sources */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Additional Reading</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-12">
            {additionalSources.map((source, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-100 hover:border-sky-200 transition">
                <span className="px-2 py-0.5 text-[10px] rounded bg-slate-50 text-slate-500 font-medium">{source.category}</span>
                <h4 className="font-medium text-slate-800 text-sm mt-1.5">{source.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{source.author} ({source.year})</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Online Resources */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Trusted Online Resources</h2>
          <div className="space-y-3 mb-12">
            {[
              { name: "Personality Database (PDB)", desc: "Community-driven database of personality typings using cognitive functions and Enneagram, with detailed analysis and discussion." },
              { name: "Enneagram Institute", desc: "Founded by Riso & Hudson. Comprehensive type descriptions, levels of development, and integration/disintegration pathways." },
              { name: "The Chestnut Paes Enneagram Academy", desc: "Beatrice Chestnut's educational platform for deep subtype work and clinical Enneagram." },
              { name: "Cognitive Type", desc: "Research project combining brain imaging with Jungian function theory to identify neurological correlates of cognitive functions." },
            ].map((resource, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-100">
                <h4 className="font-medium text-slate-800 text-sm flex items-center gap-1.5">
                  {resource.name} <ExternalLink className="w-3 h-3 text-slate-300" />
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{resource.desc}</p>
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
