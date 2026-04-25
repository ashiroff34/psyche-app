import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 8;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 8 as a Parent — The Challenger's Parenting Style | Thyself",
  description:
    "How Enneagram Type 8 parents raise children: the protection and strength of a powerful parent, the challenge of softening for vulnerability, and what Eight parents need to grow.",
  openGraph: {
    title: "Enneagram Type 8 as a Parent",
    description: "The Type 8 parent brings fierce protection and absolute commitment to raising children — and must learn to make space for tenderness alongside strength.",
    url: "https://thyself.app/enneagram/type-8/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-8/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 8 as a Parent — The Challenger's Parenting Style",
  description: "How Type 8 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-8/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-8/parenting" },
};

export default function Type8ParentingPage() {
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
              The Eight parent is a powerful, protective, and deeply committed presence in their child's life. Children of Eights know they are defended absolutely. The growth edge is learning to modulate the force — to let the child be vulnerable, uncertain, and ordinary without feeling they need to meet a standard of toughness.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Eight Parent's Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The Eight parent brings fierce protectiveness to parenting that is among the most formidable available. They will advocate, fight, and place themselves between their child and whatever threatens them without hesitation. Their love is real and total — and they show it through action far more than through words.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The challenge is that the Eight's relationship to vulnerability — their own and others' — can make emotional parenting difficult. Softness feels unsafe to the Eight, and they may inadvertently communicate that it is unsafe to their children too. Children who are emotionally sensitive may feel unseen or toughened up before they are ready. And the Eight's directness, which is genuine respect among adults, can be overwhelming for a child.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Absolute protection and fierce advocacy", body: "Eight parents bring a kind of guardian energy that is unmistakable. Their children grow up knowing that their parent will go to the wall for them — an unshakable foundation that creates real psychological safety." },
                { title: "Models genuine strength and directness", body: "Children of Eights see what it looks like to take up space, speak plainly, and refuse to be diminished. This is a powerful counterweight to a culture that often teaches children to make themselves smaller." },
                { title: "Children know exactly where they stand", body: "The Eight parent does not play games. Their approval, displeasure, and love are all expressed directly. Children can trust what they hear and do not have to decode hidden messages." },
                { title: "Follows through on commitments without exception", body: "When the Eight parent says something will happen, it happens. Their word is worth what they say it is, and their children develop a strong sense of what reliability looks like in practice." },
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
                { title: "May inadvertently communicate that vulnerability is weakness", body: "The Eight's discomfort with softness can register to children as disapproval of their own tenderness. Sensitive children may learn early to hide what they are actually feeling and to perform a toughness that does not match their interior." },
                { title: "Directness that is appropriate for adults can be overwhelming for children", body: "Eights speak plainly because they respect their interlocutor. With children, the same directness can land as harsh. The Eight parent must learn to modulate their force for the size of the person they are speaking to." },
                { title: "Difficulty modulating force in emotional situations", body: "When the Eight parent is angry, frustrated, or emphatic, the intensity is real. Children, especially smaller ones, can feel genuinely overwhelmed by this even when no harm is intended." },
                { title: "The home can carry a quality of intensity that sensitive children find hard to metabolize", body: "Eight households tend to run hot — opinions are strong, emotions are big, conflicts are direct. For children with quieter temperaments, this can feel like living inside a storm even when the storm is benign." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the Eight Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Eight parent who has developed their tender register creates a home where children feel both protected AND free to be vulnerable. Their strength becomes a container for softness rather than a replacement for it.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core ask is to let the child be fully human — uncertain, emotional, tender, and sometimes weak — without needing to armor them against it. The Eight who can do this gives their child one of the greatest gifts: a powerful parent who is not afraid of their feelings.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 8</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 Overview</Link>
              <Link href="/enneagram/type-8/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 in Relationships</Link>
              <Link href="/enneagram/type-8/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 at Work</Link>
              <Link href="/enneagram/type-8/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 Growth</Link>
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
