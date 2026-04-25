import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 9;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 9s — The Peacemaker in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 9: the Peacemaker's gentle strength, inclusive presence, conflict avoidance, and capacity to hold many perspectives visible in their work.",
  openGraph: {
    title: "Famous Enneagram Type 9s — The Peacemaker",
    description:
      "Public figures who exemplify the Type 9 pattern: peaceful, accommodating, inclusive, and possessed of a quiet strength that becomes visible under pressure.",
    url: "https://thyself.app/enneagram/type-9/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-9/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 9s — The Peacemaker in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 9 and what their lives reveal about the Peacemaker pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-9/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-9/famous" },
};

const examples = [
  {
    name: "Abraham Lincoln",
    years: "1809–1865",
    body: "Lincoln is cited by Riso and Hudson as a Type 9. His political genius was the Nine's gift: the capacity to hold multiple positions in genuine empathy without losing his own ground. His 'malice toward none, charity for all' was not political calculation — it was a Nine's actual experience of the opposing camps in the Civil War. He was slow to anger, patient with opponents, and capable of listening to positions he disagreed with without dismissing them. When he finally acted — on emancipation, on the prosecution of the war — he acted with the quiet decisiveness of the Nine who has found their ground.",
  },
  {
    name: "Audrey Hepburn",
    years: "1929–1993",
    body: "Hepburn is one of the most frequently cited Type 9 examples in popular Enneagram discussion. The quality of her presence — the stillness, the absence of ego-performance, the genuine warmth — is characteristic. She was a public figure who seemed genuinely uninterested in being a public figure; her later years as a UNICEF ambassador reflected the Nine's orientation toward quiet service rather than continued visibility. She spoke about her own needs and preferences rarely. She spoke about others constantly.",
  },
  {
    name: "Carl Jung",
    years: "1875–1961",
    body: "Jung the man is frequently cited as a Nine even as he built a psychology that illuminated every type. His comprehensive system — which attempted to hold every psychological school in a larger synthesis — reflects the Nine's characteristic move of finding what is true in each position rather than dismissing any of them. His introversion, his long periods of interior life, his ability to be genuinely present with people very different from himself, and his late-life insistence on living simply at Bollingen all reflect the Nine's essential character.",
  },
  {
    name: "Barack Obama",
    years: "b. 1961",
    body: "Obama is frequently discussed in Enneagram contexts as a likely Nine, with some educators also suggesting a One wing. His political style — the emphasis on finding common ground, the discomfort with direct conflict, the measured pace of response to provocation, and the ability to articulate multiple perspectives with genuine empathy — are Nine qualities. His critics sometimes read these as evasiveness; more accurately, they reflect a type that genuinely sees the validity of positions it does not ultimately share, and finds the language of either/or inadequate.",
  },
];

export default function Type9FamousPage() {
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
              Type 9s in public life are recognizable by the quality of their listening, their ability to make others feel genuinely received, and the way their strength tends to be quiet until it is needed. They often become symbolic figures for an era or a community — not because they sought that role, but because something in their presence invited it.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 9 pattern in public figures tends to show up as: a public persona that is warm and accessible without being self-revealing; a capacity to hold opposing perspectives in genuine empathy without losing their own position; a slowness to conflict that can look like passivity from the outside; and a strength that becomes fully visible only when something genuinely important is at stake.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Nine&apos;s integration direction is toward Type 3 — at their best, they develop genuine self-assertion, the ability to identify and pursue their own goals with energy and focus. Their disintegration direction is toward Type 6 — under stress, the accommodating Nine can become anxious, reactive, and caught in cycles of doubt about what they actually want.
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
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 9 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 9</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 Overview</Link>
              <Link href="/enneagram/type-9/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 in Relationships</Link>
              <Link href="/enneagram/type-9/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 at Work</Link>
              <Link href="/enneagram/subtypes/sp-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 Subtypes</Link>
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
