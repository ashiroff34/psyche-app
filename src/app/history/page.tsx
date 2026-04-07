"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BookOpen,
  Clock,
  Users,
  Brain,
  Heart,
  Compass,
  Sparkles,
  ChevronRight,
  Quote,
  AlertTriangle,
  Layers,
  Eye,
  Star,
  Lightbulb,
  ArrowRight,
  Zap,
  Trophy,
  CheckCircle,
  XCircle,
  ArrowLeftRight,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";
import NextStepBanner from "@/components/NextStepBanner";
import AssessmentHistory from "@/components/AssessmentHistory";
import { stableShuffleOptions } from "@/lib/shuffleOptions";

/* ───────────────────────────────────────────
   Knowledge Check Quizzes, earn XP for learning!
   ─────────────────────────────────────────── */

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const enneagramHistoryQuiz: QuizQuestion[] = [
  { question: "Who brought the Enneagram to mainstream psychology in the 1970s?", options: ["Oscar Ichazo", "Claudio Naranjo", "Helen Palmer", "George Gurdjieff"], correct: 1, explanation: "Claudio Naranjo brought the Enneagram from Ichazo's Arica School to Esalen Institute in California, connecting it to clinical psychology." },
  { question: "What are the 9 Levels of Development?", options: ["Oscar Ichazo's framework", "Riso and Hudson's framework", "Naranjo's passions system", "Chestnut's subtype model"], correct: 1, explanation: "Don Riso and Russ Hudson developed the 9 Levels of Development, describing a spectrum from healthy to unhealthy for each type." },
  { question: "How many subtypes did Beatrice Chestnut describe in detail?", options: ["9", "18", "27", "36"], correct: 2, explanation: "Chestnut described 27 subtypes, 3 instinctual variants (sp, sx, so) for each of the 9 types." },
  { question: "What did Oscar Ichazo contribute to the Enneagram?", options: ["The geometric symbol", "Holy Ideas, fixations, and virtues", "The Levels of Development", "The 27 subtypes"], correct: 1, explanation: "Ichazo developed the Holy Ideas, fixations, virtues, and the mapping of passions to the nine points at his Arica School." },
];

const jungHistoryQuiz: QuizQuestion[] = [
  { question: "When did Jung publish Psychological Types?", options: ["1905", "1913", "1921", "1943"], correct: 2, explanation: "Carl Jung published Psychological Types in 1921, introducing the 8 cognitive functions that form the basis of the type system." },
  { question: "Who developed the 8-function shadow model with archetypal positions?", options: ["Carl Jung", "Isabel Myers", "John Beebe", "Dario Nardi"], correct: 2, explanation: "John Beebe extended Jung's model by assigning archetypal roles (Hero, Parent, Child, Anima, Nemesis, Critical Parent, Trickster, Demon) to all 8 functions." },
  { question: "What does 16Personalities actually measure?", options: ["Jung's cognitive functions", "Big Five personality traits", "Enneagram types", "Beebe archetypes"], correct: 1, explanation: "Despite using MBTI-like labels, 16Personalities actually measures Big Five personality traits (OCEAN), it does not assess cognitive functions." },
  { question: "What did Dario Nardi contribute to the field?", options: ["The MBTI instrument", "EEG brain pattern research on cognitive functions", "The 8-function model", "The inferior function concept"], correct: 1, explanation: "Dario Nardi used EEG technology to study how different cognitive function preferences correlate with distinct brain activation patterns." },
];

function KnowledgeCheck({ quiz, sectionName }: { quiz: QuizQuestion[]; sectionName: string }) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { addXP, markQuizComplete, profile } = useProfile();

  const q = quiz[current];

  // Stable shuffle per question so options don't jump on re-renders
  const { shuffled: shuffledOptions, newCorrectIndex } = useMemo(
    () => stableShuffleOptions(q.options, q.correct, q.question),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q.question]
  );

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === newCorrectIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current < quiz.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setFinished(true);
      const xpEarned = score * 25;
      addXP(xpEarned, `history-${sectionName}`);
      markQuizComplete(`history-${sectionName}`);
    }
  };

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 rounded-2xl"
        style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.12)" }}>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>Knowledge Check</h3>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Test what you&apos;ve learned, earn up to {quiz.length * 25} XP!</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setStarted(true)}
          className="mt-2 px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-medium shadow-lg shadow-amber-200/50 hover:bg-amber-600 transition"
        >
          Start Quiz ({quiz.length} questions)
        </motion.button>
      </motion.div>
    );
  }

  if (finished) {
    const perfect = score === quiz.length;
    return (
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-8 p-6 rounded-2xl text-center"
        style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: perfect ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : score >= quiz.length / 2 ? "linear-gradient(135deg,#34d399,#10b981)" : "linear-gradient(135deg,#60a5fa,#6366f1)" }}>
          {perfect ? <Trophy className="w-6 h-6 text-white" /> : score >= quiz.length / 2 ? <Star className="w-6 h-6 text-white" /> : <BookOpen className="w-6 h-6 text-white" />}
        </div>
        <h3 className="text-xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.93)" }}>
          {perfect ? "Perfect Score!" : score >= quiz.length / 2 ? "Nice work!" : "Keep learning!"}
        </h3>
        <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{score}/{quiz.length} correct, earned {score * 25} XP</p>
        <div className="flex justify-center gap-1.5 mt-3">
          {quiz.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < score ? "bg-emerald-400" : "bg-white/10"}`} />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-2xl shadow-sm"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{current + 1}/{quiz.length}</span>
        <span className="text-xs font-medium text-amber-400">+25 XP each</span>
      </div>
      <h4 className="text-sm sm:text-base font-medium mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>{q.question}</h4>
      <div className="space-y-2">
        {shuffledOptions.map((opt, idx) => {
          const isCorrect = idx === newCorrectIndex;
          const isSelected = idx === selected;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              className={`w-full text-left p-3 rounded-xl text-sm transition-all border-2`}
              style={revealed
                ? isCorrect
                  ? { borderColor: "rgba(16,185,129,0.5)", background: "rgba(16,185,129,0.08)", color: "#6ee7b7" }
                  : isSelected
                  ? { borderColor: "rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.06)", color: "#fca5a5" }
                  : { borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }
                : { borderColor: "rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.7)" }}
            >
              <div className="flex items-center gap-2">
                {revealed && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                {revealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                {opt}
              </div>
            </button>
          );
        })}
      </div>
      {revealed && (
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
          <p className="text-xs leading-relaxed p-3 rounded-lg" style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.05)" }}>{q.explanation}</p>
          <button
            onClick={handleNext}
            className="mt-3 px-5 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition"
          >
            {current < quiz.length - 1 ? "Next →" : "See Results"}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   DATA, Enneagram Timeline
   ─────────────────────────────────────────── */

interface TimelineNode {
  id: string;
  era: string;
  year: string;
  title: string;
  initials: string;
  color: string;
  summary: string;
  details: string;
  quote?: string;
  quoteAttribution?: string;
  books?: string[];
  contributions: string[];
}

const enneagramTimeline: TimelineNode[] = [
  {
    id: "ancient",
    era: "Ancient Roots",
    year: "c. 300 BCE, 900 CE",
    title: "Geometric & Mystical Origins",
    initials: "SR",
    color: "#8B6914",
    summary:
      "The nine-pointed geometric symbol has deep roots in ancient mathematical and spiritual traditions.",
    details:
      "The Enneagram symbol itself is a geometric figure combining a triangle and a hexad within a circle. Its mathematical properties were studied by Pythagorean traditions, and the number nine held sacred significance across many ancient cultures. Sufi mystics, particularly within the Naqshbandi order, are believed to have used nine-pointed figures in their spiritual teaching methods. The desert fathers of early Christianity also worked with lists of chief passions that would later map onto Enneagram types. However, it is important to note that the modern Enneagram of personality is a 20th-century development; the ancient symbol was not used as a personality typology.",
    contributions: [
      "Nine-pointed geometric figure with unique mathematical properties",
      "Pythagorean sacred geometry and the significance of the number 9",
      "Sufi mystical traditions and the Naqshbandi order's use of sacred symbols",
      "Desert fathers' lists of chief passions (Evagrius Ponticus, 4th century)",
    ],
  },
  {
    id: "gurdjieff",
    era: "Early Modern",
    year: "1910s, 1940s",
    title: "G.I. Gurdjieff",
    initials: "GG",
    color: "#6B4C9A",
    summary:
      "The Armenian-Greek mystic who introduced the Enneagram symbol to the Western world as a process model.",
    details:
      "George Ivanovich Gurdjieff (c. 1866-1949) introduced the Enneagram symbol to his students in Moscow and later at his Institute for the Harmonious Development of Man near Paris. Crucially, Gurdjieff did NOT use the symbol as a personality typology. For him, it was a dynamic process model representing the laws of creation (the Law of Three and the Law of Seven). He taught the Enneagram through sacred dances and movements. His student P.D. Ouspensky documented these teachings. The connection between Gurdjieff's process Enneagram and the modern personality Enneagram remains a subject of scholarly debate.",
    quote: "Man is a machine. He does not do anything. Everything happens to him.",
    quoteAttribution: "G.I. Gurdjieff",
    books: [
      "Beelzebub's Tales to His Grandson (1950)",
      "P.D. Ouspensky, In Search of the Miraculous (1949)",
    ],
    contributions: [
      "Introduced the Enneagram symbol to the Western world",
      "Used it as a process model, not a personality typology",
      "Law of Three and Law of Seven encoded in the symbol",
      "Sacred dances (Movements) as embodied teaching of the Enneagram",
    ],
  },
  {
    id: "ichazo",
    era: "Modern Foundation",
    year: "1950s, 1970s",
    title: "Oscar Ichazo",
    initials: "OI",
    color: "#2563EB",
    summary:
      "The Bolivian-born philosopher who created the Enneagram of personality by mapping nine ego fixations to the symbol.",
    details:
      "Oscar Ichazo (1931-2020) is the originator of the Enneagram of personality as we know it today. Working in La Paz, Bolivia and later in Arica, Chile, Ichazo developed a comprehensive system mapping nine ego fixations, nine passions (emotional habits), nine Holy Ideas (higher cognitive virtues), and nine virtues to the nine points of the Enneagram symbol. He founded the Arica School in 1968 and led an intensive training program in Arica, Chile in 1970 that included Claudio Naranjo among its participants. Ichazo's framework treats the Enneagram as a map of ego structure and spiritual development, not merely a personality classification.",
    quote:
      "We have to distinguish between a man as he is in essence, and as he is in ego or personality.",
    quoteAttribution: "Oscar Ichazo",
    books: [
      "Letters to the School (Arica Institute, 1988)",
      "Between Metaphysics and Protoanalysis (1982)",
    ],
    contributions: [
      "Created the Enneagram of Personality, mapped ego types to the nine-pointed symbol",
      "Defined the nine Holy Ideas (higher cognitive states)",
      "Defined the nine Passions (emotional fixations) and nine Fixations (cognitive distortions)",
      "Established the nine Virtues as paths of liberation from ego",
      "Founded the Arica School (1968)",
    ],
  },
  {
    id: "naranjo",
    era: "Clinical Integration",
    year: "1970s, 2000s",
    title: "Claudio Naranjo",
    initials: "CN",
    color: "#059669",
    summary:
      "The Chilean psychiatrist who brought the Enneagram from Ichazo's school to Western psychology and Esalen Institute.",
    details:
      "Claudio Naranjo (1932-2019) was a Chilean psychiatrist who studied with Ichazo in Arica, Chile and subsequently brought the Enneagram of personality to the Esalen Institute in Big Sur, California and to his Seekers After Truth (SAT) groups in Berkeley. Naranjo made the critical contribution of mapping the nine Enneagram types to clinical psychology, correlating them with DSM personality disorders, defense mechanisms, and character structures from the psychoanalytic tradition. He also linked the types to specific subtypes based on the three instinctual drives: self-preservation, social, and sexual (one-to-one). His work transformed the Enneagram from a spiritual school's teaching tool into a psychological framework recognized by clinicians.",
    quote:
      "The understanding of character is the most important thing in psychology.",
    quoteAttribution: "Claudio Naranjo",
    books: [
      "Character and Neurosis: An Integrative View (1994)",
      "Ennea-type Structures: Self-Analysis for the Seeker (1990)",
      "Transformation through Insight (1997)",
    ],
    contributions: [
      "Brought the Enneagram from Ichazo's Arica School to Esalen and Western psychology",
      "Mapped nine types to clinical personality disorders and defense mechanisms",
      "Developed the character structure descriptions used widely today",
      "Integrated instinctual subtypes (self-preservation, social, sexual) with type descriptions",
      "Founded the SAT Program for psychological and spiritual integration",
    ],
  },
  {
    id: "palmer",
    era: "Mainstream Emergence",
    year: "1980s, 1990s",
    title: "Helen Palmer",
    initials: "HP",
    color: "#7C3AED",
    summary:
      "Pioneered the Narrative Tradition, bringing the Enneagram to mainstream audiences through storytelling and panel interviews.",
    details:
      "Helen Palmer (born 1946) was among those who learned the Enneagram through the oral tradition emanating from Naranjo's Berkeley groups. She developed the Narrative Tradition, a teaching methodology based on panel interviews where people of each type share their inner experiences in their own words. This approach emphasized phenomenological understanding over theoretical abstraction. Palmer brought the Enneagram to a wide audience through her bestselling books and her teaching at Stanford University and JFK University. Together with David Daniels, MD, she co-founded the Enneagram Professional Training Program and helped establish the Enneagram as a tool for business consulting and personal development.",
    quote:
      "The gift of the Enneagram is that we learn to observe ourselves without judgment.",
    quoteAttribution: "Helen Palmer",
    books: [
      "The Enneagram: Understanding Yourself and Others in Your Life (1988)",
      "The Enneagram in Love and Work (1995)",
    ],
    contributions: [
      "Created the Narrative Tradition, learning types through first-person panel interviews",
      "Brought the Enneagram to mainstream audiences and bestseller lists",
      "Co-founded the Enneagram Professional Training Program with David Daniels",
      "Taught at Stanford University, validating the system in academic settings",
    ],
  },
  {
    id: "riso-hudson",
    era: "Systematic Framework",
    year: "1990s, 2010s",
    title: "Don Riso & Russ Hudson",
    initials: "RH",
    color: "#DC2626",
    summary:
      "Created the Levels of Development, nine levels of health per type, and built the most systematic modern Enneagram framework.",
    details:
      "Don Richard Riso (1946-2012) and Russ Hudson (born 1960) together created the most comprehensive and systematic modern Enneagram framework. Their signature contribution is the Levels of Development: nine distinct levels of psychological health for each type, ranging from Level 1 (healthiest, most liberated) to Level 9 (most destructive, most fixated). This framework solved a major problem in Enneagram theory, the fact that two people of the same type can look radically different depending on their level of health. Riso and Hudson also developed the Riso-Hudson Enneagram Type Indicator (RHETI), one of the most validated Enneagram assessment instruments, and co-founded The Enneagram Institute. Their detailed type descriptions remain the standard reference for many practitioners.",
    quote:
      "Personality is not a fixed entity but a dynamic process that shifts along a continuum of health.",
    quoteAttribution: "Don Riso & Russ Hudson",
    books: [
      "Personality Types: Using the Enneagram for Self-Discovery (1996)",
      "The Wisdom of the Enneagram (1999)",
      "Understanding the Enneagram (2000)",
    ],
    contributions: [
      "Created the 9 Levels of Development for each type (healthy, average, unhealthy)",
      "Developed the RHETI, Riso-Hudson Enneagram Type Indicator",
      "Co-founded The Enneagram Institute",
      "Wrote the most detailed and systematic type descriptions available",
      "Integrated growth/stress lines (integration/disintegration arrows) with Levels",
    ],
  },
  {
    id: "chestnut",
    era: "Subtypes & Clinical Depth",
    year: "2000s, Present",
    title: "Beatrice Chestnut",
    initials: "BC",
    color: "#EA580C",
    summary:
      "The leading authority on the 27 subtypes, bringing clinical depth to instinctual variant theory.",
    details:
      "Beatrice Chestnut, PhD is a licensed psychotherapist and the foremost authority on the 27 Enneagram subtypes. Building on the work of Naranjo (with whom she studied directly), Chestnut has provided the most detailed and clinically grounded descriptions of how each Enneagram type manifests differently depending on the dominant instinctual drive (self-preservation, social, or sexual/one-to-one). Her key insight is the concept of counter-types: one subtype of each Enneagram type that looks least like the core type because the instinctual drive runs counter to the type's passion. This explains many misidentifications. Chestnut's work has made the 27 subtypes accessible and practically useful for therapists and individuals seeking precise self-understanding.",
    quote:
      "Knowing your subtype is just as important as knowing your type. It tells you the specific way your passion plays out.",
    quoteAttribution: "Beatrice Chestnut",
    books: [
      "The Complete Enneagram: 27 Paths to Greater Self-Knowledge (2013)",
      "The 9 Types of Leadership (2017, with David Daniels)",
    ],
    contributions: [
      "Definitive descriptions of all 27 subtypes (9 types x 3 instincts)",
      "Clarified counter-types, the subtype that looks least like the core type",
      "Clinical applications of Enneagram subtypes in psychotherapy",
      "Studied directly with Naranjo, preserving the clinical tradition",
      "Made instinctual variant theory accessible and practically useful",
    ],
  },
];

/* ───────────────────────────────────────────
   DATA, Jung & Cognitive Functions Timeline
   ─────────────────────────────────────────── */

interface JungNode {
  id: string;
  era: string;
  year: string;
  title: string;
  initials: string;
  color: string;
  summary: string;
  details: string;
  quote?: string;
  quoteAttribution?: string;
  books?: string[];
  contributions: string[];
}

const jungTimeline: JungNode[] = [
  {
    id: "jung-early",
    era: "The Beginning",
    year: "1875, 1912",
    title: "Carl Jung: Early Life & Freud",
    initials: "CJ",
    color: "#1E3A5F",
    summary:
      "From Swiss psychiatrist to Freud's heir apparent, and the rupture that changed psychology.",
    details:
      "Carl Gustav Jung (1875-1961) was born in Kesswil, Switzerland to a pastor father and a mother with mediumistic experiences. He studied medicine at the University of Basel and became a psychiatrist at the Burgholzli clinic in Zurich under Eugen Bleuler. In 1906 he began a correspondence with Sigmund Freud, and for several years was seen as Freud's chosen successor, even serving as the first president of the International Psychoanalytic Association. However, fundamental theoretical disagreements emerged. Jung rejected Freud's insistence that all neurosis stemmed from repressed sexuality, arguing instead for a broader conception of psychic energy (libido) and the role of spiritual and archetypal dimensions of the psyche. Their painful break in 1912-1913 precipitated Jung's period of intense introspection documented in The Red Book, and ultimately led to his development of analytical psychology as a distinct school.",
    quote:
      "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed.",
    quoteAttribution: "Carl Jung",
    books: [
      "Studies in Word Association (1906)",
      "The Psychology of the Unconscious (1912, revised as Symbols of Transformation)",
    ],
    contributions: [
      "Developed word association tests for detecting unconscious complexes",
      "Coined the term 'complex' in its modern psychological sense",
      "Broke with Freud over the nature of libido and the unconscious",
      "Began developing a broader, non-reductive depth psychology",
    ],
  },
  {
    id: "psych-types",
    era: "The Foundation",
    year: "1921",
    title: "Psychological Types",
    initials: "PT",
    color: "#2563EB",
    summary:
      "Jung's masterwork defining the 8 cognitive functions: the theoretical foundation for everything that follows.",
    details:
      "Psychological Types (Psychologische Typen) published in 1921 is Jung's foundational theoretical work and the origin of the cognitive function framework. In it, Jung proposed that people differ fundamentally in how they orient their consciousness along two axes. First, the attitude axis: Extraversion (energy oriented toward the external world of objects and people) vs. Introversion (energy oriented toward the inner world of subjective experience). Second, the function axis: four basic psychological functions, Thinking (logical analysis), Feeling (value-based evaluation), Sensation (concrete sensory experience), and Intuition (perception of patterns and possibilities). Each function can be used in either an extraverted or introverted attitude, yielding eight distinct cognitive functions: Te, Ti, Fe, Fi, Se, Si, Ne, Ni. Jung theorized that each person has a dominant function that characterizes their primary mode of consciousness, with auxiliary, tertiary, and inferior functions playing supporting roles.",
    quote:
      "Every individual is an exception to the rule.",
    quoteAttribution: "Carl Jung, Psychological Types",
    books: [
      "Psychological Types (1921), Collected Works, Volume 6",
    ],
    contributions: [
      "Defined Extraversion and Introversion as fundamental attitudes of consciousness",
      "Identified four basic psychological functions: Thinking, Feeling, Sensation, Intuition",
      "Combined attitudes x functions to describe 8 cognitive functions (Te, Ti, Fe, Fi, Se, Si, Ne, Ni)",
      "Proposed a hierarchy: dominant, auxiliary, tertiary, and inferior functions",
      "Established the theoretical basis for all subsequent Jungian type theory",
    ],
  },
  {
    id: "jung-later",
    era: "Depth Psychology",
    year: "1930s, 1961",
    title: "Thyselfs & the Collective Unconscious",
    initials: "CJ",
    color: "#6B4C9A",
    summary:
      "Jung's broader contributions: the collective unconscious, archetypes, individuation, and shadow work.",
    details:
      "Beyond typology, Jung developed a rich body of theory about the deep structure of the psyche. He proposed the collective unconscious, a layer of the unconscious shared by all humans, containing universal patterns or archetypes (the Self, the Shadow, the Anima/Animus, the Persona, the Hero, the Wise Old Man, the Great Mother, the Trickster, and many others). These archetypes manifest in myths, dreams, religions, and individual psychology across all cultures. The process of individuation, becoming a more complete, integrated Self by confronting and integrating unconscious contents, especially the Shadow (repressed qualities) and the Anima/Animus (contrasexual inner figure), became the central goal of Jungian analysis. These broader concepts would later be integrated with type theory by John Beebe.",
    quote:
      "One does not become enlightened by imagining figures of light, but by making the darkness conscious.",
    quoteAttribution: "Carl Jung",
    books: [
      "The Thyselfs and the Collective Unconscious (CW 9i, 1959)",
      "Aion (CW 9ii, 1951)",
      "Memories, Dreams, Reflections (autobiography, 1961)",
    ],
    contributions: [
      "Theorized the collective unconscious, shared psychic heritage of humanity",
      "Identified universal archetypes: Shadow, Anima/Animus, Self, Persona, and more",
      "Defined individuation as the central goal of psychological development",
      "Shadow work: integrating rejected aspects of the personality",
      "Influenced mythological studies (Joseph Campbell), literature, art therapy, and religion",
    ],
  },
  {
    id: "myers-briggs",
    era: "Operationalization",
    year: "1940s, 1960s",
    title: "Isabel Myers & Katharine Briggs",
    initials: "MB",
    color: "#059669",
    summary:
      "Mother and daughter who created a practical assessment instrument to operationalize Jung's theory.",
    details:
      "Katharine Cook Briggs (1875-1968) had been studying personality differences independently before encountering Jung's Psychological Types, which provided a theoretical framework for her observations. Her daughter, Isabel Briggs Myers (1897-1980), was motivated by World War II, she wanted to help people find work suited to their natural psychological preferences. Together, they developed the Myers-Briggs Type Indicator, a forced-choice self-report questionnaire designed to sort people into Jung's type categories. They added a fourth dichotomy (Judging/Perceiving) not present in Jung's original theory. It is essential to understand that the theory of cognitive functions is Jung's work (1921); what Myers and Briggs created was an instrument, a practical tool to measure those preferences. They were not theorists but instrumentalists. The indicator became the most widely administered personality assessment in the world, though it has been criticized by academic psychologists for issues with test-retest reliability and the forced dichotomy model.",
    quote:
      "Whatever the circumstances of your life, whatever your personal ties, work, and responsibilities, the understanding of type can make your perceptions clearer.",
    quoteAttribution: "Isabel Briggs Myers",
    books: [
      "Isabel Briggs Myers, Gifts Differing (1980)",
      "Katharine D. Myers & Isabel Myers, Type Indicator Manual (1962)",
    ],
    contributions: [
      "Created a practical assessment instrument to measure Jung's type preferences",
      "Added the Judging/Perceiving dichotomy to Jung's framework",
      "Made Jungian type accessible to the general public and organizations",
      "NOTE: The THEORY is Jung's (1921); the INSTRUMENT was their contribution",
    ],
  },
  {
    id: "beebe",
    era: "Archetypal Model",
    year: "1980s, Present",
    title: "John Beebe",
    initials: "JB",
    color: "#DC2626",
    summary:
      "Mapped all 8 cognitive functions to Jungian archetypes, creating the shadow function model.",
    details:
      "John Beebe, MD (born 1939) is a Jungian analyst in San Francisco who made a groundbreaking contribution by integrating Jung's type theory with Jung's archetype theory. Beebe proposed that each person uses all eight cognitive functions, not just the four in the classical model, and that each function occupies a specific archetypal position in the psyche. The first four functions (the ego-syntonic stack) are associated with the Hero/Heroine (dominant), the Good Parent (auxiliary), the Eternal Child (tertiary), and the Anima/Animus (inferior). The last four functions (the shadow stack) mirror the first four and are associated with the Opposing Personality (5th), the Critical/Senex Parent (6th), the Trickster (7th), and the Demon/Daimon (8th). This eight-function model explains why certain cognitive functions feel threatening or destabilizing, they are associated with shadow archetypes. Beebe's model is the primary framework used in depth typology today.",
    quote:
      "Type is not just about preference. It's about which archetypes carry which functions in your psyche.",
    quoteAttribution: "John Beebe",
    books: [
      "Energies and Patterns in Psychological Type (2017)",
      "Integrity in Depth (1992)",
    ],
    contributions: [
      "Created the 8-function archetypal model (Hero, Parent, Child, Anima + 4 shadow positions)",
      "Integrated type theory with archetype theory, a major synthesis",
      "Explained why shadow functions feel threatening: they carry shadow archetypes",
      "Named the shadow positions: Opposing Personality, Critical Parent, Trickster, Demon/Daimon",
      "Provided the standard model used in modern depth typology",
    ],
  },
  {
    id: "nardi",
    era: "Neuroscience",
    year: "2010s, Present",
    title: "Dario Nardi",
    initials: "DN",
    color: "#EA580C",
    summary:
      "Pioneered the neuroscience of cognitive functions using EEG brain pattern research at UCLA.",
    details:
      "Dario Nardi, PhD is a professor at UCLA who has conducted groundbreaking research using quantitative electroencephalography (qEEG) to study the brain activity patterns associated with different Jungian cognitive functions. Using a 20-channel EEG cap, Nardi measured the neocortical activity of hundreds of participants while they performed cognitive tasks. His findings suggest that people who share the same dominant cognitive function show similar, distinctive brain activation patterns. For example, those who lead with Introverted Intuition (Ni) tend to show a whole-brain synchronization pattern when processing complex problems, while Extraverted Sensing (Se) dominant individuals show real-time responsiveness across motor and sensory cortex regions. While his sample sizes are still relatively small and more peer review is needed, Nardi's work represents the first systematic attempt to ground Jungian type theory in neuroscience, potentially moving it from a purely psychological model to one with biological correlates.",
    quote:
      "Each cognitive function corresponds to a distinct pattern of neural activity that we can actually observe and measure.",
    quoteAttribution: "Dario Nardi",
    books: [
      "Neuroscience of Personality (2011)",
      "The Magic Diamond (2020)",
    ],
    contributions: [
      "Used quantitative EEG to map brain activation patterns for each cognitive function",
      "Found distinct neocortical patterns for Ni, Ne, Si, Se, Ti, Te, Fi, Fe",
      "Conducted research at UCLA with hundreds of participants",
      "Began building a neuroscience foundation for cognitive function theory",
      "Work is preliminary but represents the first systematic effort of its kind",
    ],
  },
];

/* ───────────────────────────────────────────
   COMPONENTS
   ─────────────────────────────────────────── */

const tabs = [
  { id: "enneagram", label: "The Enneagram Through Time", icon: Clock },
  { id: "jung", label: "Carl Jung & Cognitive Functions", icon: Brain },
  { id: "intersection", label: "Where They Meet", icon: Layers },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* Animated Timeline Node */
function TimelineItem({
  node,
  index,
  isExpanded,
  onToggle,
}: {
  node: TimelineNode | JungNode;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, x: 0 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-10 sm:pl-14 pb-10 last:pb-0"
    >
      {/* Vertical line */}
      <div className="absolute left-[18px] sm:left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-sky-200 via-indigo-200 to-transparent" />

      {/* Node dot */}
      <motion.div
        className="absolute left-2 sm:left-3 top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[3px] shadow-md cursor-pointer z-10"
        style={{ borderColor: "rgba(15,10,30,1)", backgroundColor: node.color }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      />

      {/* Card */}
      <div
        className={`group cursor-pointer rounded-2xl sm:rounded-3xl transition-all duration-300`}
        style={isExpanded
          ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(139,92,246,0.3)" }
          : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
        onClick={onToggle}
      >
        {/* Header — always visible */}
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Portrait placeholder */}
            <div
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-serif font-bold text-base sm:text-lg shrink-0 shadow-sm"
              style={{ backgroundColor: node.color }}
            >
              {node.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] sm:text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                  {node.year}
                </span>
                <span className="text-[11px] sm:text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{node.era}</span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold mt-1" style={{ color: "rgba(255,255,255,0.93)" }}>
                {node.title}
              </h3>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {node.summary}
              </p>
            </div>
            <ChevronRight
              className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 ${
                isExpanded ? "rotate-90" : ""
              }`}
              style={{ color: "rgba(255,255,255,0.2)" }}
            />
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-4">
                <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                {/* Detailed text */}
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {node.details}
                </p>

                {/* Quote */}
                {node.quote && (
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
                    <div className="flex gap-2 sm:gap-3">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                          &ldquo;{node.quote}&rdquo;
                        </p>
                        {node.quoteAttribution && (
                          <p className="text-[11px] sm:text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {node.quoteAttribution}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key contributions */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                    Key Contributions
                  </h4>
                  <ul className="space-y-1.5">
                    {node.contributions.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        <Star className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Books */}
                {node.books && node.books.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                      Key Works
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {node.books.map((b, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-violet-300 text-[11px] sm:text-xs"
                          style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}
                        >
                          <BookOpen className="w-3 h-3" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* Venn Diagram for "Where They Meet" */
function VennDiagram() {
  return (
    <div className="relative w-full max-w-lg mx-auto h-72 sm:h-80">
      {/* Left circle — Enneagram */}
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-2 sm:left-4 top-4 w-48 h-48 sm:w-60 sm:h-60 rounded-full flex items-center justify-center"
        style={{ border: "2px solid rgba(251,113,133,0.4)", background: "rgba(244,63,94,0.08)" }}
      >
        <div className="text-center -ml-8 sm:-ml-10">
          <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-rose-400 mx-auto mb-1" />
          <p className="font-serif font-bold text-rose-300 text-sm sm:text-base">Enneagram</p>
          <p className="text-[10px] sm:text-xs text-rose-400 mt-1 max-w-[100px] mx-auto">
            WHY you do what you do
          </p>
        </div>
      </motion.div>

      {/* Right circle — Cognitive Functions */}
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute right-2 sm:right-4 top-4 w-48 h-48 sm:w-60 sm:h-60 rounded-full flex items-center justify-center"
        style={{ border: "2px solid rgba(56,189,248,0.4)", background: "rgba(14,165,233,0.08)" }}
      >
        <div className="text-center ml-8 sm:ml-10">
          <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400 mx-auto mb-1" />
          <p className="font-serif font-bold text-sky-300 text-sm sm:text-base">
            Cognitive Functions
          </p>
          <p className="text-[10px] sm:text-xs text-sky-400 mt-1 max-w-[100px] mx-auto">
            HOW you process information
          </p>
        </div>
      </motion.div>

      {/* Intersection label */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute left-0 right-0 top-[90px] sm:top-[100px] flex flex-col items-center justify-center text-center z-10"
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400 mx-auto mb-1" />
        <p className="font-serif font-bold text-violet-300 text-xs sm:text-sm">
          Complete Map
        </p>
      </motion.div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-0 right-0 text-center"
      >
        <p className="text-xs sm:text-sm italic" style={{ color: "rgba(255,255,255,0.35)" }}>
          Together: motivation + cognition = the most complete personality map available
        </p>
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────
   MAIN PAGE
   ─────────────────────────────────────────── */

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>("enneagram");
  const [expandedEnneagram, setExpandedEnneagram] = useState<string | null>(null);
  const [expandedJung, setExpandedJung] = useState<string | null>(null);
  const { profile } = useProfile();
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsUnlocked(localStorage.getItem("psyche-cognitive-unlocked") === "true");
  }, []);

  if (!mounted) return <div style={{ minHeight: "100vh", background: "#0f0a1e" }} />;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0f0a1e" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
          <Lock className="w-7 h-7" style={{ color: "#a78bfa" }} />
        </div>
        <h1 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>Type History</h1>
        <p className="text-sm mb-8 max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Your full assessment history and type evolution over time.</p>
        <Link href="/store" className="px-6 py-3 rounded-2xl font-bold text-white mb-4" style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
          Unlock in Store
        </Link>
        <Link href="/profile" className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Back to Profile</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-16" style={{ background: "#0f0a1e" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sky-300 text-xs font-medium mb-4" style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}>
            <Clock className="w-3 h-3" /> History &amp; Origins
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
            The History Behind Thyself
          </h1>
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Two powerful traditions of understanding the human mind, the
            Enneagram and Jungian Cognitive Functions, each with a rich history
            of brilliant thinkers. Explore how they developed, who shaped them,
            and why they complement each other.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 sm:mt-10 flex flex-wrap gap-2"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200`}
                style={isActive
                  ? { background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.35)" }
                  : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === "enneagram"
                    ? "Enneagram"
                    : tab.id === "jung"
                    ? "Jung"
                    : "Intersection"}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <div className="mt-8 sm:mt-10">
          <AnimatePresence mode="wait">
            {/* ─── SECTION 1: Enneagram Timeline ─── */}
            {activeTab === "enneagram" && (
              <motion.div
                key="enneagram"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                    The Enneagram Through Time
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
                    From ancient geometric symbols to modern clinical psychology,
                    the Enneagram of personality has been shaped by a lineage of
                    thinkers who each added crucial layers of understanding.
                    Click any node to learn more.
                  </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                  {enneagramTimeline.map((node, i) => (
                    <TimelineItem
                      key={node.id}
                      node={node}
                      index={i}
                      isExpanded={expandedEnneagram === node.id}
                      onToggle={() =>
                        setExpandedEnneagram(
                          expandedEnneagram === node.id ? null : node.id
                        )
                      }
                    />
                  ))}
                </div>
                <KnowledgeCheck quiz={enneagramHistoryQuiz} sectionName="enneagram-history" />
              </motion.div>
            )}

            {/* ─── SECTION 2: Jung & Cognitive Functions ─── */}
            {activeTab === "jung" && (
              <motion.div
                key="jung"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                    Carl Jung &amp; Cognitive Functions
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
                    A visual journey through the development of cognitive function
                    theory, from Jung's foundational work through archetypal
                    models to modern neuroscience.
                  </p>
                </div>

                {/* Disclaimer */}
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-8"
                  style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(245,158,11,0.12)" }}>
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-amber-300 mb-1">
                        Important Distinction
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                        Thyself uses Jung's original cognitive function theory
                        (1921), <strong>NOT</strong> the simplified MBTI instrument
                        or 16Personalities (which uses Big Five traits, not
                        cognitive functions). The cognitive function framework
                        describes eight distinct modes of consciousness, a far
                        richer model than four-letter codes or dichotomy-based
                        sorting.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                  {jungTimeline.map((node, i) => (
                    <TimelineItem
                      key={node.id}
                      node={node}
                      index={i}
                      isExpanded={expandedJung === node.id}
                      onToggle={() =>
                        setExpandedJung(
                          expandedJung === node.id ? null : node.id
                        )
                      }
                    />
                  ))}
                </div>
                <KnowledgeCheck quiz={jungHistoryQuiz} sectionName="jung-history" />
              </motion.div>
            )}

            {/* ─── SECTION 3: Where They Meet ─── */}
            {activeTab === "intersection" && (
              <motion.div
                key="intersection"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                    Where They Meet
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
                    The Enneagram and Cognitive Functions are not competing
                    systems, they illuminate different dimensions of personality.
                    Together, they offer something neither can alone.
                  </p>
                </div>

                {/* Venn Diagram */}
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="p-6 sm:p-10 rounded-3xl shadow-sm mb-8"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <VennDiagram />
                </motion.div>

                {/* Three columns */}
                <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
                  {/* Enneagram column */}
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl"
                    style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
                  >
                    <Heart className="w-6 h-6 text-rose-400 mb-3" />
                    <h3 className="font-serif font-bold text-rose-300 mb-2">
                      Enneagram
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-300 leading-relaxed mb-3">
                      Answers <strong>WHY</strong> you do what you do.
                    </p>
                    <ul className="space-y-2 text-xs text-rose-300/70">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        Core motivation and core fear
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        Emotional passion (habitual emotional pattern)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        Cognitive fixation (distorted thinking pattern)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        Virtue and Holy Idea (paths of growth)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        Defense mechanisms and character structure
                      </li>
                    </ul>
                  </motion.div>

                  {/* Cognitive Functions column */}
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl"
                    style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}
                  >
                    <Brain className="w-6 h-6 text-sky-400 mb-3" />
                    <h3 className="font-serif font-bold text-sky-300 mb-2">
                      Cognitive Functions
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-300 leading-relaxed mb-3">
                      Answers <strong>HOW</strong> you process information and
                      make decisions.
                    </p>
                    <ul className="space-y-2 text-xs text-sky-300/70">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        Dominant mode of consciousness
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        Perceiving: how you take in information (Se, Si, Ne, Ni)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        Judging: how you evaluate and decide (Te, Ti, Fe, Fi)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        Shadow functions and archetypal positions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        Neuroscience-backed brain activation patterns
                      </li>
                    </ul>
                  </motion.div>

                  {/* Together column */}
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl"
                    style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}
                  >
                    <Sparkles className="w-6 h-6 text-violet-400 mb-3" />
                    <h3 className="font-serif font-bold text-violet-300 mb-2">
                      Together
                    </h3>
                    <p className="text-xs sm:text-sm text-violet-300 leading-relaxed mb-3">
                      The most <strong>complete personality map</strong>{" "}
                      available.
                    </p>
                    <ul className="space-y-2 text-xs text-violet-300/70">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        Motivation (Enneagram) + cognition (Jung) = full picture
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        Explains both the inner drive and the outer process
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        Two people of the same Enneagram type can have very
                        different cognitive stacks, and vice versa
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        Growth paths from both systems complement each other
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        Neither system alone captures the full complexity of a
                        person
                      </li>
                    </ul>
                  </motion.div>
                </div>

                {/* Example */}
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(139,92,246,0.15)" }}>
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.93)" }}>
                        Practical Example
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                        Consider two Enneagram Type 5 individuals. Both share the
                        same core motivation (the need to be competent and
                        self-sufficient) and the same passion (avarice, hoarding
                        energy and knowledge). But one might lead with
                        Introverted Thinking (Ti), building elaborate internal
                        logical models, while the other leads with Introverted
                        Intuition (Ni), synthesizing patterns into singular
                        visions. Same motivation, radically different cognitive
                        processing. Understanding both dimensions gives you a
                        far more precise and useful self-map.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Assessment Journey */}
        {profile.assessmentHistory && profile.assessmentHistory.length > 0 && (
          <div style={{ padding: "0 16px 24px" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "20px 20px 8px",
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Assessment Journey</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
                Track how your type identification has evolved over time.
              </div>
              <AssessmentHistory history={profile.assessmentHistory} />
            </div>
          </div>
        )}

        <NextStepBanner
          href="/correlations"
          label="See how the systems connect"
          sublabel="Explore correlations between Enneagram types and cognitive function stacks"
          icon={<ArrowLeftRight className="w-5 h-5" />}
          color="#14b8a6"
        />
      </div>
    </div>
  );
}
