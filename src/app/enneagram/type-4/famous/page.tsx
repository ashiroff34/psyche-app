import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 4;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 4s — The Individualist in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 4: the Individualist's emotional depth, unique self-expression, longing for authenticity, and relationship to suffering visible in their work.",
  openGraph: {
    title: "Famous Enneagram Type 4s — The Individualist",
    description:
      "Public figures who exemplify the Type 4 pattern: emotionally deep, aesthetically distinctive, and oriented toward authenticity over approval.",
    url: "https://thyself.app/enneagram/type-4/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-4/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 4s — The Individualist in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 4 and what their lives reveal about the Individualist pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-4/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-4/famous" },
};

const examples = [
  {
    name: "Prince",
    years: "1958–2016",
    body: "Prince is one of the most frequently cited Type 4 examples in popular Enneagram discussion. His refusal to conform to any industry expectation, his insistence on owning his art at enormous personal and professional cost, his aesthetic that was entirely his own, and the emotional range of his work — from the erotic to the devotional without any apparent contradiction — reflect the Four's relationship to self-expression as identity. He did not want to be like anyone. He needed to be himself, distinctly and completely.",
  },
  {
    name: "Alanis Morissette",
    years: "b. 1974",
    body: "Morissette has been open in interviews about her Enneagram type and identifies as a Four. Her work — particularly the raw emotional directness of Jagged Little Pill — exemplifies the Four's willingness to go to the painful interior and bring it outward. The anger in that album is not a performance; it is documentation. She has spent much of her public career exploring the relationship between emotional experience and self-understanding, which is the Four's central project.",
  },
  {
    name: "Virginia Woolf",
    years: "1882–1941",
    body: "Woolf's work is among the most sustained explorations of inner experience in Western literature — and her life was a Four's life in many of its essential features: the sense of being fundamentally different, the oscillation between profound beauty and dark despair, the construction of an aesthetic entirely her own, and the attempt to build from her particularity a kind of universality. Her stream-of-consciousness technique was not a literary experiment; it was a philosophical commitment to the primacy of subjective experience.",
  },
  {
    name: "Frida Kahlo",
    years: "1907–1954",
    body: "Kahlo made herself the subject of almost all her paintings — not out of vanity but out of the Four's conviction that the inner life, examined honestly, is universal. Her work transforms personal suffering (chronic pain, a troubled marriage, political exile) into symbolic image. She created a visual language entirely her own, insisted on her distinctiveness even within a marriage to a more famous artist, and lived with the intensity that the Four brings to both love and suffering.",
  },
];

export default function Type4FamousPage() {
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
              Type 4s in public life are recognizable by the distinctiveness of their self-expression, their willingness to go to emotional depths that others avoid, and the quality of authenticity that their work carries even when the work is highly constructed. They do not try to appeal to everyone — and this is often what makes them unforgettable.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 4 pattern in public figures tends to show up as: an aesthetic that is distinctively their own and could not be attributed to anyone else; a body of work that returns repeatedly to themes of longing, loss, identity, and the gap between the world as it is and how it should feel; a public persona that maintains some essential privacy or mystery; and a relationship to their own suffering that is neither victimhood nor stoicism but transformation.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Four&apos;s integration direction is toward Type 1 — at their best, they move beyond pure feeling toward the discipline and principled engagement with the world that allows their gifts to become something lasting. Their disintegration direction is toward Type 2 — under stress, the Four can lose themselves in others&apos; needs as a way of escaping their own interior.
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
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 4 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 4</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 Overview</Link>
              <Link href="/enneagram/type-4/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 in Relationships</Link>
              <Link href="/enneagram/type-4/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 at Work</Link>
              <Link href="/enneagram/subtypes/sp-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 Subtypes</Link>
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
