import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 3;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 3 as a Parent — The Achiever's Parenting Style | Thyself",
  description:
    "How Enneagram Type 3 parents raise children: the energy and ambition of an invested parent, the challenge of love-as-achievement, and what Three parents need to grow.",
  openGraph: {
    title: "Enneagram Type 3 as a Parent",
    description: "The Type 3 parent brings genuine investment and energy to raising children — and must learn to love the child they have, not the potential they see.",
    url: "https://thyself.app/enneagram/type-3/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-3/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 3 as a Parent — The Achiever's Parenting Style",
  description: "How Type 3 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-3/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-3/parenting" },
};

export default function Type3ParentingPage() {
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
              The Three parent is energetic, encouraging, and genuinely invested in their child's success. They are the parent cheering at every game, pushing toward every goal. The growth edge is ensuring the child knows they are loved for who they are, not only for what they achieve.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Three Parent's Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The Three parent brings their characteristic competence to parenting — they research, they organize, they show up. Their children tend to have rich opportunities and feel genuinely supported in their ambitions. The Three's pride in their child's achievements is real.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The shadow is that achievement can become the primary language of love. The Three parent may communicate approval through engagement with the child's successes and inadvertently communicate less engagement when the child fails, retreats, or simply wants to be ordinary for a while. The message children can receive is that the relationship is contingent on performance.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Energetic and engaged", body: "Three parents bring genuine energy to family life. They are present at the events, involved in the activities, and visibly invested in what their children are doing. Children of Threes rarely feel that their parent is checked out." },
                { title: "Advocates effectively for their children", body: "When their child needs something — from a teacher, a coach, a system — the Three parent gets it done. They know how to navigate institutions, how to ask the right questions, and how to make things happen on their child's behalf." },
                { title: "Enthusiastic support for the child's projects and ambitions", body: "Whatever the child is interested in, the Three parent backs it with real enthusiasm and resources. Children grow up feeling that their goals are worth pursuing and that their parent is firmly on their side." },
                { title: "Models what hard work and competence look like", body: "The Three parent shows their children, through daily example, what it means to set a goal and pursue it skillfully. Children absorb this orientation toward effort and capability in ways that serve them throughout life." },
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
                { title: "May communicate love primarily through achievement", body: "The Three's natural language is performance, and approval can become bound up with the child's wins. Children learn to chase the parent's praise, which feels available when they succeed and harder to access when they don't." },
                { title: "Difficulty being present with a child who is struggling without pivoting to solutions", body: "When the child is hurting or failing, the Three's instinct is to fix — strategize, optimize, suggest the next move. This bypasses the child's need to simply be met in the difficulty before being moved out of it." },
                { title: "The home can become about performance and results", body: "Family life can take on the texture of a high-functioning project. The schedule is full, the goals are tracked, the productivity is real — but the unstructured, purposeless time children also need can get squeezed out." },
                { title: "May push their own ambitions onto the child's trajectory", body: "The Three parent's drive can express itself as expectations the child has not chosen — sports, schools, careers that reflect the parent's vision more than the child's actual interests. The child can feel cast in a role rather than seen for who they are." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the Three Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Three parent who has done their work learns to be fully present with the unproductive, ordinary moments of childhood — and the child experiences being loved simply for existing in their parent's life.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core ask is to love the child they have, not the potential they see. This requires the Three to discover that their worth as a parent is not the child's achievements — it is the quality of the relationship.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 3</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 Overview</Link>
              <Link href="/enneagram/type-3/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 in Relationships</Link>
              <Link href="/enneagram/type-3/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 at Work</Link>
              <Link href="/enneagram/type-3/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 Growth</Link>
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
