import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 6;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 6 as a Parent — The Loyalist's Parenting Style | Thyself",
  description:
    "How Enneagram Type 6 parents raise children: the loyalty and protection of a devoted parent, the challenge of transmitted anxiety, and what Six parents need to grow.",
  openGraph: {
    title: "Enneagram Type 6 as a Parent",
    description: "The Type 6 parent brings absolute loyalty and fierce protection to raising children — and must learn to teach trust in the world, not only suspicion of it.",
    url: "https://thyself.app/enneagram/type-6/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-6/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 6 as a Parent — The Loyalist's Parenting Style",
  description: "How Type 6 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-6/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-6/parenting" },
};

export default function Type6ParentingPage() {
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
              The Six parent is loyal, protective, and deeply committed. Their children know without question that their parent would move mountains for them. The growth edge is ensuring that protective vigilance creates safety rather than fear — teaching children to trust the world, not only to suspect it.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Six Parent's Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The Six parent is fiercely loyal and genuinely protective. They show up, they follow through, and their children know that the relationship can be counted on absolutely. When something threatens the child, the Six parent becomes a formidable force — they advocate, they prepare, and they stand between the child and whatever threatens them.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The challenge is that the Six's vigilance can transmit anxiety to children. A parent who is always scanning for threats, who assumes the worst, who rehearses catastrophes, can produce children who learn to see the world as dangerous rather than navigable. The Six must consciously balance their protective instinct with the message that the child is equipped to handle what comes.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Absolute loyalty that children can count on", body: "Six parents show up. They follow through on what they say. Their children grow up with an unshakable sense that their parent is on their side and will not abandon them — a foundation that serves every other developmental task." },
                { title: "Consistent presence and follow-through", body: "The Six parent does not flake. They are at the events, at the appointments, in the small consistent ways that build a child's trust over time. This reliability is foundational to attachment." },
                { title: "Prepares children practically for real challenges", body: "Six parents teach their children how to think ahead, what to watch for, and how to handle the situations that life will actually throw at them. This practical wisdom is a real gift when offered without overwhelming the child." },
                { title: "Fierce advocacy when the child needs it", body: "When the school, the system, or another adult is failing the child, the Six parent shows up with full force. Their children know they will not be left to navigate institutional failures alone." },
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
                { title: "Anxiety that can be transmitted to children", body: "The Six parent's scanning for threats is rarely silent. Children pick up the worry — in the warnings, in the body language, in the parent's habit of preparing for the worst — and absorb it as the appropriate stance toward a frightening world." },
                { title: "Over-protection that limits the child's developing autonomy", body: "When every situation is filtered through worst-case thinking, the child gets fewer chances to take the small risks that build competence. Over time, this can produce children who feel unsafe acting on their own." },
                { title: "Difficulty trusting the child to handle situations without intervention", body: "The Six parent's instinct is to step in. Letting the child stumble, fail, and recover without rescue is genuinely hard — and yet that is exactly what builds the child's trust in their own capacity." },
                { title: "Worst-case thinking that shapes the family's emotional atmosphere", body: "The household can take on a quality of low-grade vigilance, where every plan is preceded by what could go wrong. Children growing up in this air can find it hard to access optimism or trust later in life." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the Six Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Six parent who has developed inner ground becomes a model of genuine courage — not the absence of fear, but the capacity to act well in spite of it. Their children learn that the world is uncertain AND survivable.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core ask is to trust — in the child's developing competence, in the world's basic survivability, and in their own capacity to respond when things actually go wrong, rather than preemptively.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 6</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 Overview</Link>
              <Link href="/enneagram/type-6/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 in Relationships</Link>
              <Link href="/enneagram/type-6/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 at Work</Link>
              <Link href="/enneagram/type-6/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 Growth</Link>
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
