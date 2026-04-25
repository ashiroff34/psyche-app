import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 1s — The Reformer in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 1: the Reformer's principled drive, exacting standards, and crusade for a better world visible in their work and lives.",
  openGraph: {
    title: "Famous Enneagram Type 1s — The Reformer",
    description:
      "Public figures who exemplify the Type 1 pattern: integrity-driven, exacting, and committed to making the world more correct.",
    url: "https://thyself.app/enneagram/type-1/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-1/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 1s — The Reformer in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 1 and what their lives reveal about the Reformer pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-1/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-1/famous" },
};

const examples = [
  {
    name: "Nelson Mandela",
    years: "1918–2013",
    body: "Few lives demonstrate the mature Type 1 more clearly than Mandela's. His 27-year imprisonment did not erode his principled commitment to nonviolent resistance — it refined it. He emerged without the bitterness that would have been understandable, guided instead by a moral framework so internally consistent that it could absorb enormous suffering without breaking. His insistence on due process, reconciliation over revenge, and the long-arc vision of justice over immediate satisfaction are hallmarks of the integrated One.",
  },
  {
    name: "Al Gore",
    years: "b. 1948",
    body: "Gore's four-decade commitment to climate science — continuing through political defeats, ridicule, and shifting public attention — reflects the One's relationship to a mission that feels morally non-negotiable. He is a figure who genuinely believes that being right matters more than being popular, and who has organized his public life around a cause he experiences as an ethical imperative rather than a career choice. The perfectionism in how he has curated and presented climate data over the years is also characteristic.",
  },
  {
    name: "Michelle Obama",
    years: "b. 1964",
    body: "Obama is frequently cited by Enneagram educators as a Type 1 for her emphasis on standards, discipline, and doing things the right way. Her memoir and public speeches return repeatedly to themes of integrity, of meeting high expectations without shortcuts, and of the responsibility that comes with privilege. The 'when they go low, we go high' formulation is quintessentially One: maintaining moral high ground not out of strategic calculation but out of a felt sense of what integrity requires.",
  },
  {
    name: "Plato",
    years: "428–348 BC",
    body: "The philosopher who gave Western thought the concept of ideal forms — perfect, unchanging archetypes against which all earthly reality falls short — was articulating a fundamentally One worldview. Plato's Republic envisions a perfectly ordered society governed by philosopher-kings whose commitment to truth qualifies them to rule. His entire philosophical project can be read as the One's attempt to close the gap between the imperfect world as it is and the ideal world as it should be.",
  },
];

export default function Type1FamousPage() {
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
              Type 1s in public life are recognizable by their principled consistency, the moral seriousness they bring to their work, and their commitment to standards that do not bend under pressure. They often take on reform as a life project — not for recognition, but because they cannot see what is wrong and not act on it.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 1 pattern in public figures tends to show up as: a long-term commitment to a principled position that has not shifted for reasons of convenience; an exacting attention to the quality and accuracy of their work; a reform impulse — the sense that things can and should be better; and an underlying moral seriousness that others sometimes experience as rigidity.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The One&apos;s integration direction is toward Type 7 — at their best and most expansive, they become more spontaneous, joyful, and open to the imperfection of ordinary life. Their disintegration direction is toward Type 4 — under stress, they can become withdrawn, despairing, and fixated on a sense of grievance.
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
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 1 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 1</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 Overview</Link>
              <Link href="/enneagram/type-1/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 in Relationships</Link>
              <Link href="/enneagram/type-1/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 at Work</Link>
              <Link href="/enneagram/subtypes/sp-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 Subtypes</Link>
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
