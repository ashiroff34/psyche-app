import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 2;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 2s — The Helper in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 2: the Helper's warmth, giving orientation, relational focus, and the need to be needed visible in their work and lives.",
  openGraph: {
    title: "Famous Enneagram Type 2s — The Helper",
    description:
      "Public figures who exemplify the Type 2 pattern: warm, giving, relationally focused, and oriented toward the needs of others.",
    url: "https://thyself.app/enneagram/type-2/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-2/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 2s — The Helper in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 2 and what their lives reveal about the Helper pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-2/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-2/famous" },
};

const examples = [
  {
    name: "Princess Diana",
    years: "1961–1997",
    body: "Diana is among the most commonly cited Type 2 examples in Enneagram literature. Her public persona was built around connection — reaching out to touch people with AIDS when it was taboo, sitting on the floors of children's wards, making eye contact with the homeless. The warmth appeared to be genuine and not performed. Her suffering within a system that could not meet her relational needs, and the way she channeled that pain into service for others, reflects the Two's characteristic pattern: giving outward what she needed most inward.",
  },
  {
    name: "Dolly Parton",
    years: "b. 1946",
    body: "Parton is one of the most frequently cited living examples of a healthy Two. Her warmth is not a public relations strategy — it appears to be constitutive of who she is. Her philanthropic work (the Imagination Library has donated over 200 million books to children) reflects the Two's orientation toward giving in ways that ask nothing in return. Notably, she funded COVID vaccine research anonymously, only disclosing it when required. The Two who gives without needing credit is the Two at their most integrated.",
  },
  {
    name: "Desmond Tutu",
    years: "1931–2021",
    body: "Tutu's theology of ubuntu — 'I am because we are' — is a philosophical expression of the Two's worldview. His entire public life was organized around reconciliation, the embrace of the other, and the refusal to let systems reduce human beings to categories. His warmth was not softness; it was the engine of serious moral work. The Truth and Reconciliation Commission required exactly the Two's gift: holding the humanity of perpetrators and victims simultaneously, refusing to let either become objects.",
  },
  {
    name: "Mother Teresa",
    years: "1910–1997",
    body: "Teresa is perhaps the archetypal Two in public life — a life entirely organized around service to others, with her own inner suffering largely invisible to the world she served. Her posthumously published letters revealed a decades-long experience of spiritual desolation that she did not share publicly. This is consistent with the Two's pattern: pouring care into others while keeping their own need hidden even from themselves. Her canonization reflects the world's recognition of an extreme form of other-orientation.",
  },
];

export default function Type2FamousPage() {
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
              Type 2s in public life are recognizable by the warmth that precedes their ideas, the ease with which they make others feel seen, and the way their work tends to organize around human needs. They are often the center of a community — not because they seek power, but because people feel cared for by them.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 2 pattern in public figures tends to show up as: an orientation toward relationships over ideas or systems; a warmth that feels personal even in public contexts; a giving that is sometimes accompanied by an unspoken expectation of appreciation; and a tendency to identify themselves through what they do for others rather than who they are independently.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Two&apos;s integration direction is toward Type 4 — at their best, they develop a genuine inner life, the ability to name their own needs, and an authentic self-expression that is not contingent on others&apos; responses. Their disintegration direction is toward Type 8 — under stress, the suppressed anger at unreciprocated giving can emerge as unexpected aggression.
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
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 2 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 2</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 Overview</Link>
              <Link href="/enneagram/type-2/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 in Relationships</Link>
              <Link href="/enneagram/type-2/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 at Work</Link>
              <Link href="/enneagram/subtypes/sp-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 Subtypes</Link>
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
