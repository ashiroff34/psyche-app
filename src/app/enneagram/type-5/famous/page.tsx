import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 5s — The Investigator in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 5: the Investigator's intellectual depth, private nature, systems thinking, and insatiable curiosity visible in their work.",
  openGraph: {
    title: "Famous Enneagram Type 5s — The Investigator",
    description:
      "Public figures who exemplify the Type 5 pattern: intellectually intense, privacy-valuing, systems-oriented, and driven by the need to understand.",
    url: "https://thyself.app/enneagram/type-5/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-5/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 5s — The Investigator in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 5 and what their lives reveal about the Investigator pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-5/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-5/famous" },
};

const examples = [
  {
    name: "Albert Einstein",
    years: "1879–1955",
    body: "Einstein is among the most-cited Five examples in Enneagram literature. His mode of working — long periods of private thought, the thought experiment as primary tool, the radical compartmentalization of his personal and professional life — reflects the Five's characteristic management of energy and engagement. He was notoriously difficult to reach emotionally, and his personal relationships suffered from the same withdrawal that allowed his intellectual life to flourish. His work was also deeply Five: not incremental improvement but total reconceptualization of how the universe works.",
  },
  {
    name: "Stephen Hawking",
    years: "1942–2018",
    body: "Hawking's life is a study in the Five's relationship to the body as a container for the mind. As his physical capacities diminished, his intellectual life intensified rather than contracted — he continued working through means that would have stopped almost anyone else. His relationship to fame was characteristically Five: he used public recognition instrumentally, to fund research and reach audiences, but his actual engagement with the world remained filtered through his work. The wit in his public appearances was real; the intimacy was not.",
  },
  {
    name: "Bill Gates",
    years: "b. 1955",
    body: "Gates is frequently cited as a Type 5 — the relentless informational appetite, the systems orientation, the discomfort in social contexts that require warmth rather than intelligence, and the later pivot to using accumulated resources to solve complex global problems all reflect the Five's pattern. His famous 'Think Weeks' — periods of total isolation with only books and papers — are a pure expression of the Five's need to withdraw from engagement in order to process and replenish.",
  },
  {
    name: "Nikola Tesla",
    years: "1856–1943",
    body: "Tesla lived the Five's life in its most uncompromising form. He had essentially no personal life; his relationships were with his ideas. He worked in isolation, disclosed his findings reluctantly and incompletely, and died alone in a hotel room having given most of his patents away. The Five's characteristic pattern of hoarding knowledge — keeping it internal until it is complete — meant that much of his work was not understood in his lifetime. His legacy required others to piece together what he had kept to himself.",
  },
];

export default function Type5FamousPage() {
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
              Type 5s in public life are recognizable by the quality of their thinking, the privacy they maintain even in fame, and the way their public work tends to be the product of long interior preparation rather than spontaneous output. They give the world what they have worked out privately — and rarely what they are still working through.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 5 pattern in public figures tends to show up as: a body of work characterized by depth rather than breadth, or by the attempt to synthesize enormous breadth into a unified system; a personal life that is deliberately shielded from public view; a public persona that is notably more comfortable with ideas than with emotional intimacy; and a relationship to knowledge as the primary source of security and identity.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Five&apos;s integration direction is toward Type 8 — at their best, they bring their intellectual resources into engaged action in the world, speaking and acting with the authority their preparation earns. Their disintegration direction is toward Type 7 — under stress, the orderly inner world can fragment into scattered, anxious activity.
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
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 5 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 5</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 Overview</Link>
              <Link href="/enneagram/type-5/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 in Relationships</Link>
              <Link href="/enneagram/type-5/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 at Work</Link>
              <Link href="/enneagram/subtypes/sp-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 Subtypes</Link>
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
