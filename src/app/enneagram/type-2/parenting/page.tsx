import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 2;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 2 as a Parent — The Helper's Parenting Style | Thyself",
  description:
    "How Enneagram Type 2 parents raise children: the warmth and attunement of devoted love, the challenge of needing to be needed, and what Two parents need to grow.",
  openGraph: {
    title: "Enneagram Type 2 as a Parent",
    description: "The Type 2 parent brings deep warmth and attunement to raising children — and must learn to give without needing to be needed in return.",
    url: "https://thyself.app/enneagram/type-2/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-2/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 2 as a Parent — The Helper's Parenting Style",
  description: "How Type 2 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-2/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-2/parenting" },
};

export default function Type2ParentingPage() {
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
              The Two parent is warm, attuned, and genuinely devoted. Their children feel loved, seen, and cared for with an intensity that is real. The growth edge is learning to parent without needing to be needed — giving children the autonomy that grows them even when it means being needed less.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Two Parent's Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The Two parent's love is enormous and largely unconditional — or so it appears. In practice, the Two parent's giving has a relational cost: they need to be needed, appreciated, and central to their child's world. When the child moves toward independence, the Two parent may experience this as loss rather than success.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Two parent also struggles with boundaries. They may find it genuinely difficult to hold a limit with a child who is sad or disappointed, because the Two's instinct is always to relieve the other person's pain. This can produce children who learn quickly that emotional distress gets them what rules would not.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Attunement to the child's emotional state", body: "Two parents read their children with unusual accuracy. They notice the small shifts in mood, the unspoken hurt, the moment when something is off — and they respond. Children of Twos rarely feel emotionally invisible." },
                { title: "Creating homes where children feel deeply loved", body: "The Two parent generates a household atmosphere of warmth and care. Children grow up in an environment where love is openly expressed, freely given, and woven into the daily texture of family life." },
                { title: "Warmth that makes children feel safe to bring their real selves", body: "Two parents tend to be receptive and embracing. Children learn early that they can come to their parent with the full range of what they are feeling and experiencing — and be met with warmth rather than judgment." },
                { title: "Practical care and presence", body: "The Two parent is genuinely present in the daily logistics of parenting. They show up to the school pickup, they remember the favorite snack, they know the friends' names. Their care is visible in a thousand small acts." },
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
                { title: "Difficulty allowing children to struggle when struggle is what develops them", body: "The Two parent's instinct to relieve discomfort can short-circuit the productive struggle children need to grow. A child who is never allowed to figure something out hard does not develop the muscle of figuring things out at all." },
                { title: "Needs to be needed in ways that can impair a child's autonomy development", body: "When a parent's sense of self is bound up in being needed, the child's movement toward independence becomes threatening rather than celebrated. The Two parent must consciously resist the pull to keep the child close in ways that no longer serve the child." },
                { title: "Holding limits when the child is upset", body: "Saying no to a sad or angry child is genuinely difficult for the Two — the impulse to soothe overrides the discipline of the limit. Over time, children can learn that intensity of distress is a reliable way to override structure." },
                { title: "The giving that carries an unspoken expectation of appreciation", body: "Two parents often say their love is unconditional, but the underlying expectation of being appreciated and acknowledged is real. When the child fails to express gratitude, the Two parent can feel hurt or resentful in ways that confuse the child." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the Two Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Two parent who has done their work becomes a genuinely free giver — their love is not contingent on being needed. They hold their children with warmth AND allow them to grow away from that warmth without interpreting it as rejection.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core ask is to celebrate their child's independence as the fruit of their love rather than the end of their role. The Two who can do this gives their child something invaluable: a secure base that does not require them to stay small.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 2</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 Overview</Link>
              <Link href="/enneagram/type-2/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 in Relationships</Link>
              <Link href="/enneagram/type-2/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 at Work</Link>
              <Link href="/enneagram/type-2/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 Growth</Link>
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
