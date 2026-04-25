import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 7s — The Enthusiast in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 7: the Enthusiast's restless energy, appetite for experience, reframing ability, and joy-seeking visible in their work and lives.",
  openGraph: {
    title: "Famous Enneagram Type 7s — The Enthusiast",
    description:
      "Public figures who exemplify the Type 7 pattern: energetic, curious, spontaneous, and relentlessly oriented toward what is possible and pleasurable.",
    url: "https://thyself.app/enneagram/type-7/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-7/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 7s — The Enthusiast in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 7 and what their lives reveal about the Enthusiast pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-7/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-7/famous" },
};

const examples = [
  {
    name: "Robin Williams",
    years: "1951–2014",
    body: "Williams is the most frequently cited Type 7 in Enneagram discussion. His extraordinary range — from manic improvisation to genuine dramatic depth — and the speed at which his mind moved were Seven qualities operating at maximum intensity. His energy in performance reflected the Seven's characteristic orientation: filling space with stimulus as a way of staying ahead of something darker. His death revealed what the Seven's brightness can conceal: a profound suffering that the performance both expressed and covered. At his best — Good Will Hunting, The Fisher King — he showed the Seven's integration toward Five: depth, stillness, genuine presence.",
  },
  {
    name: "Benjamin Franklin",
    years: "1706–1790",
    body: "Franklin exemplifies the Seven's characteristic breadth: statesman, inventor, printer, diplomat, scientist, humorist, and philosopher — simultaneously, not sequentially. His inability to commit to a single domain was not a lack of seriousness but the Seven's constitutive relationship to possibility: each new domain opened rather than closed the range of experience available. His wit — which pervades everything he wrote — is also quintessentially Seven: a light touch that made serious ideas more available without diminishing them.",
  },
  {
    name: "Jim Carrey",
    years: "b. 1962",
    body: "Carrey's career reflects the Seven's trajectory from pure stimulus-seeking toward something deeper. His early work (Ace Ventura, The Mask) was almost entirely kinetic — energy as content, movement as meaning. His later work (The Truman Show, Eternal Sunshine, Man on the Moon) engaged with darkness and limitation in ways that required staying when everything in him wanted to run. His public spiritual seeking — Eckhart Tolle, meditation, painting — reflects a Seven who has done enough of the inner work to know that running does not resolve what is being run from.",
  },
  {
    name: "Richard Feynman",
    years: "1918–1988",
    body: "Feynman is a Seven whose domain happened to be physics. His approach to science — curious, playful, deeply suspicious of any orthodoxy including his own, delighted by the strangeness of reality — was a Seven's approach applied with unusual rigor. He picked locks, played bongo drums, taught himself to paint, and lectured in strip clubs. He was also, by all accounts, genuinely incapable of sustaining boredom: any situation that stopped being interesting was immediately abandoned for one that wasn't.",
  },
];

export default function Type7FamousPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              Famous {typeName}s
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 7s in public life are recognizable by the quality of their energy, the breadth of their interests, and the way they make enthusiasm contagious. They are often the most memorable person in the room — not the most powerful or the most wise, but the most alive.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 7 pattern in public figures tends to show up as: an extraordinary breadth of engagement (polymaths are often Sevens); a lightness of touch even when dealing with serious subjects; a career that has changed direction multiple times, each time toward something more interesting rather than more profitable; and a humor that is quick, generative, and slightly reckless.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Seven&apos;s integration direction is toward Type 5 — at their best, they develop the capacity for depth, stillness, and focused engagement that their nature tends to resist. Their disintegration direction is toward Type 1 — under stress, the free-spirited Seven can become irritable, critical, and convinced that everything is being done wrong.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Cited Examples</h2>
            <div className="space-y-6">
              {examples.map(({ name, years, body }) => (
                <div key={name} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-baseline gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                    <span className="text-sm text-gray-400">{years}</span>
                  </div>
                  <p className="leading-relaxed text-gray-700 text-sm">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border-l-4 bg-gray-50 p-6" style={{ borderColor: color }}>
            <h2 className="mb-3 text-lg font-bold text-gray-900">A Note on Typing Public Figures</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 7 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 7</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 Overview</Link>
              <Link href="/enneagram/type-7/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 in Relationships</Link>
              <Link href="/enneagram/type-7/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 at Work</Link>
              <Link href="/enneagram/subtypes/sp-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 Subtypes</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find your own type</h2>
            <p className="mb-6 text-base opacity-90">Recognition through famous examples is a starting point. The Thyself assessment goes deeper — uncovering the motivational structure beneath the behavior.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
