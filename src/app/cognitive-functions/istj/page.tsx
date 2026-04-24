import type { Metadata } from "next";
import Link from "next/link";
import { mbtiTypes } from "@/data/cognitive-functions";

const type = mbtiTypes.find((t) => t.code === "ISTJ")!;

export const metadata: Metadata = {
  title: "ISTJ Personality Type — Cognitive Functions, Traits & Growth | Thyself",
  description:
    "The complete guide to the ISTJ cognitive function stack (Si-Te-Fi-Ne). Understand dominant Introverted Sensing, auxiliary Extraverted Thinking, the Si-Fi loop, grip stress, common mistypes, and the ISTJ growth path. Grounded in Jungian theory.",
  openGraph: {
    title: "ISTJ: Cognitive Functions, Traits & Growth",
    description:
      "ISTJs lead with Introverted Sensing — maintaining a detailed archive of proven experience — supported by Extraverted Thinking. A complete guide to the ISTJ cognitive function stack and growth path.",
    url: "https://thyself.app/cognitive-functions/istj",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/cognitive-functions/istj" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ISTJ Personality Type — Cognitive Functions, Traits & Growth",
  description:
    "The complete guide to the ISTJ cognitive function stack (Si-Te-Fi-Ne), loop patterns, grip stress, and growth path. Grounded in Jungian theory.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/cognitive-functions/istj",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/cognitive-functions/istj" },
};

const ALL_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

const FUNCTION_LABELS: Record<string, string> = {
  Ni: "Introverted Intuition",
  Ne: "Extraverted Intuition",
  Si: "Introverted Sensing",
  Se: "Extraverted Sensing",
  Ti: "Introverted Thinking",
  Te: "Extraverted Thinking",
  Fi: "Introverted Feeling",
  Fe: "Extraverted Feeling",
};

const STACK_ROLES = ["Dominant", "Auxiliary", "Tertiary", "Inferior"];

export default function ISTJPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: type.color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-80">Cognitive Type</p>
            <h1 className="mb-2 text-5xl font-bold">{type.code}</h1>
            <p className="mb-4 text-xl font-semibold opacity-90">{type.name}</p>
            <p className="text-lg leading-relaxed opacity-90">{type.brief}</p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Cognitive Function Stack</h2>
            <p className="mb-6 text-sm text-gray-500">
              Grounded in Carl Jung&apos;s <em>Psychological Types</em> (1921) and Beebe&apos;s 8-function model.
              The four primary functions shape the type&apos;s characteristic perception and judgment.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {type.stack.map((fn, i) => (
                <div key={fn} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: type.color }}>{i + 1}</span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{STACK_ROLES[i]}</span>
                      <p className="font-bold text-gray-900">{fn} — {FUNCTION_LABELS[fn]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How the ISTJ Mind Works</h2>
            <p className="leading-relaxed text-gray-700">{type.cognitiveWiring}</p>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Overview</h2>
            <p className="leading-relaxed text-gray-700">{type.description}</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Strengths and Growth Areas</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">Strengths</p>
                <ul className="space-y-2">
                  {type.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: type.color }} />{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">Growth Areas</p>
                <ul className="space-y-2">
                  {type.growthAreas.map((g) => (
                    <li key={g} className="flex items-start gap-2 text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />{g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The {type.loopPattern.functions[0]}-{type.loopPattern.functions[1]} Loop</h2>
            <p className="mb-3 text-sm text-gray-500">A &ldquo;loop&rdquo; occurs when the dominant function bypasses the auxiliary and connects directly to the tertiary — creating an unhealthy inward cycle that can be mistaken for the type&apos;s normal functioning.</p>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="leading-relaxed text-gray-700">{type.loopPattern.description}</p>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Inferior Function Grip: {type.stack[3]}</h2>
            <p className="mb-3 text-sm text-gray-500">Under extreme or prolonged stress, the inferior function can &ldquo;grip&rdquo; the personality — taking over in ways that feel alien and out of control.</p>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="leading-relaxed text-gray-700">{type.gripDescription}</p>
            </div>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Classification</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Temperament (Keirsey)</p>
                <p className="font-semibold text-gray-900">{type.temperament}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Interaction Style (Berens)</p>
                <p className="font-semibold text-gray-900">{type.interactionStyle}</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Mistypes</h2>
            <p className="mb-4 text-gray-700 text-sm leading-relaxed">ISTJs are frequently mistyped as other types because cognitive function stacks overlap in surface behavior. Mistyping is best resolved by examining the dominant function rather than behavioral descriptors.</p>
            <div className="flex flex-wrap gap-3">
              {type.commonMistypes.map((m) => (
                <Link key={m} href={`/cognitive-functions/${m.toLowerCase()}`} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{m}</Link>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">All 16 Types</h2>
            <div className="flex flex-wrap gap-2">
              {ALL_TYPES.map((t) => (
                <Link key={t} href={`/cognitive-functions/${t.toLowerCase()}`} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${t === type.code ? "border-transparent text-white" : "border-gray-200 text-gray-700 hover:border-gray-400"}`} style={t === type.code ? { backgroundColor: type.color } : {}}>{t}</Link>
              ))}
            </div>
          </section>
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: type.color }}>
            <h2 className="mb-3 text-2xl font-bold">Discover your cognitive type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Type Index. 10 minutes, no email required. Grounded in Jungian cognitive function theory — not pop-psychology quizzes.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color: type.color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
