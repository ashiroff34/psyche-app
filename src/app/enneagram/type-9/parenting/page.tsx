import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 9;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 9 as a Parent — The Peacemaker's Parenting Style | Thyself",
  description:
    "How Enneagram Type 9 parents raise children: the calm and acceptance of a peaceful parent, the challenge of self-presence and direction, and what Nine parents need to grow.",
  openGraph: {
    title: "Enneagram Type 9 as a Parent",
    description: "The Type 9 parent brings deep peace and acceptance to raising children — and must learn to lead from a defined center, not just hold the center steady.",
    url: "https://thyself.app/enneagram/type-9/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-9/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 9 as a Parent — The Peacemaker's Parenting Style",
  description: "How Type 9 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-9/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-9/parenting" },
};

export default function Type9ParentingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum} — Parenting</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              The {typeName} as a Parent
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              The Nine parent creates one of the most peaceful and accepting homes available. Children feel received exactly as they are. The growth edge is developing enough self-presence to provide not just warmth but direction — a parent who knows what they want for the family and can lead the household from that place.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Nine Parent's Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The Nine parent is a genuinely restorative presence for children — calm, accepting, and free of the ambient tension that other types can generate. Their home is peaceful. Their children feel received without judgment. The Nine's ability to hold all sides of a conflict makes them unusually good at mediating between siblings and at not taking sides in ways that create loyalty splits.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The challenge is self-presence. The Nine parent's tendency to merge with the family system — to accommodate, to go along, to not take up space — can leave the household without a clear center of gravity. Children actually need their parents to have opinions, to set direction, and to be someone rather than simply an accommodating presence. When the Nine parent disappears into everyone else's agendas, children can feel unsupported even within an ostensibly peaceful home.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Creates a genuinely peaceful and accepting home atmosphere", body: "Nine households often feel like a held breath finally exhaled. The ambient calm is real, and children get to grow up in an emotional environment that is restorative rather than draining." },
                { title: "Non-reactive in conflict", body: "When children push, test, or melt down, the Nine parent rarely escalates. Their steady presence in the face of intensity is genuinely regulating for children whose emotions are larger than they can handle alone." },
                { title: "Children feel received without judgment", body: "Whatever the child is — quiet, loud, ambitious, lazy, conventional, weird — the Nine parent tends to receive it without trying to change it. This is a profound experience of being loved as one is." },
                { title: "Excellent at holding multiple children's needs simultaneously", body: "The Nine's ability to see all sides makes them unusually fair across siblings. Children rarely feel that the parent is favoring one over another or that the family system is rigged against them." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Challenges</h2>
            <div className="space-y-4">
              {[
                { title: "May not provide enough direction and leadership", body: "Children need to feel that someone is steering. When the Nine parent defers, accommodates, and avoids taking a position, the child can experience the household as unmoored — peaceful but rudderless." },
                { title: "Difficulty asserting priorities for the family", body: "The Nine parent often struggles to say what they actually want for the family — the values, the rules, the direction. Without their voice in the mix, the family's shape can be set entirely by louder members." },
                { title: "Tends to defer to the children's preferences rather than leading from their own", body: "When the Nine parent abdicates the parental role to keep the peace, children end up with more decision-making weight than is appropriate for their age. This often produces anxiety rather than the freedom it was meant to confer." },
                { title: "May be slow to address problems that are quietly accumulating", body: "The Nine's instinct to let things settle rather than name them can mean that real issues — academic struggles, relational tension, behavior patterns — go unaddressed until they become bigger than they needed to be." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the Nine Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Nine parent who has developed self-presence creates a home that combines genuine peace with genuine leadership. Their children feel both accepted and guided — held by a parent who knows who they are and where the family is going.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core ask is to show up as a person with opinions, preferences, and direction — not just as a peaceful container. This is the Nine's lifetime work, and it matters nowhere more than in parenting.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 9</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 Overview</Link>
              <Link href="/enneagram/type-9/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 in Relationships</Link>
              <Link href="/enneagram/type-9/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 at Work</Link>
              <Link href="/enneagram/type-9/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 Growth</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Know your type before you parent from it</h2>
            <p className="mb-6 text-base opacity-90">Understanding your Enneagram type is one of the most useful things a parent can do. Take the free Thyself assessment.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
