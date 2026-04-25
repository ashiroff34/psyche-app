import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 5 as a Parent — The Investigator's Parenting Style | Thyself",
  description:
    "How Enneagram Type 5 parents raise children: the calm and respect of a thoughtful parent, the challenge of emotional initiation, and what Five parents need to grow.",
  openGraph: {
    title: "Enneagram Type 5 as a Parent",
    description: "The Type 5 parent brings calm, knowledge, and respect to raising children — and must learn to reach toward the child rather than waiting to be reached.",
    url: "https://thyself.app/enneagram/type-5/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-5/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 5 as a Parent — The Investigator's Parenting Style",
  description: "How Type 5 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-5/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-5/parenting" },
};

export default function Type5ParentingPage() {
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
              The Five parent is knowledgeable, calm, and deeply respectful of their child's individuality. They create homes of quiet and intellectual substance. The growth edge is learning to be emotionally available in ways that feel unnatural — not just present, but warm and initiating.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Five Parent's Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The Five parent brings preparation and genuine intelligence to parenting. They research the developmental stages, they respect their child's autonomy, and they take the child's thinking seriously in ways that are unusual and deeply validating. Their homes are often quiet, orderly, and full of books.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The challenge is emotional availability. The Five parent is present — but their presence can feel more observational than warm. Children need not just a parent who is there but a parent who initiates connection, comfort, and affection. The Five must actively develop the capacity to reach toward the child rather than waiting for the child to come to them.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Deep respect for the child's individuality and inner world", body: "Five parents do not impose themselves on their children. They give the child space to be who they are, develop their own interests, and form their own conclusions — a kind of respect many children rarely experience." },
                { title: "Brings genuine knowledge to developmental questions", body: "When something comes up — a developmental concern, a school issue, a question about the child's temperament — the Five parent has often already read the literature. Their decisions are grounded in real understanding." },
                { title: "Calm and unruffled under pressure", body: "When the household is in crisis, the Five parent tends to stay even-keeled. Their capacity to stay analytical when others are panicking is a real asset, especially in genuine emergencies." },
                { title: "Models what intellectual engagement looks like", body: "Children of Fives grow up watching their parent take ideas seriously, follow curiosity wherever it leads, and treat thinking as worth time. This orientation often becomes a lifelong gift." },
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
                { title: "Emotional initiation does not come naturally", body: "The Five parent rarely starts the emotional contact. They wait to be approached. For young children, who need their parents to initiate hugs, comfort, and connection, this can register as coolness even when the love is real." },
                { title: "May seem more comfortable as observer than as active participant in the child's life", body: "The Five parent often watches from the side rather than entering the play. The child may experience the parent as interested but distant — present in the room but not quite in the moment with them." },
                { title: "Energy limits can make prolonged engagement with a demanding child genuinely depleting", body: "Children require enormous amounts of energy and attention, and the Five's reserves are real but finite. The Five parent can become depleted in ways that lead to retreat at exactly the moment the child most needs presence." },
                { title: "Difficulty with the non-rational, non-intellectual demands of early childhood", body: "Toddlers and young children operate in a register that is intensely physical, emotional, and unreasonable. The Five parent, oriented toward the cognitive and orderly, may find this developmental phase particularly hard to meet." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the Five Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Five parent who has developed their capacity for emotional initiation creates a home where children feel both intellectually respected and genuinely held. Their calm is an enormous asset in a crisis.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core ask is to reach toward the child rather than waiting to be reached. For a Five, this is an act of will — and one of the most important things they can do for their child.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 5</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 Overview</Link>
              <Link href="/enneagram/type-5/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 in Relationships</Link>
              <Link href="/enneagram/type-5/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 at Work</Link>
              <Link href="/enneagram/type-5/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 Growth</Link>
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
