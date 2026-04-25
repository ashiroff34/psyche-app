import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 7 as a Parent — The Enthusiast's Parenting Style | Thyself",
  description:
    "How Enneagram Type 7 parents raise children: the joy and adventure of an enthusiastic parent, the challenge of staying with difficulty, and what Seven parents need to grow.",
  openGraph: {
    title: "Enneagram Type 7 as a Parent",
    description: "The Type 7 parent brings joy, energy, and adventure to raising children — and must learn to stay present with the hard moments instead of redirecting away from them.",
    url: "https://thyself.app/enneagram/type-7/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-7/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 7 as a Parent — The Enthusiast's Parenting Style",
  description: "How Type 7 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-7/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-7/parenting" },
};

export default function Type7ParentingPage() {
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
              The Seven parent is the most fun parent in the room — and often the most memorable. They make childhood an adventure. The growth edge is showing up for the difficult moments with the same presence they bring to the joyful ones.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Seven Parent's Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The Seven parent is genuinely wonderful company for children — enthusiastic, inventive, and fully engaged when they are engaged. They create magical experiences, turn ordinary days into adventures, and model what it looks like to approach life with joy and curiosity. Children of Sevens often remember their childhood as genuinely fun.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The challenge is consistency and containment. The Seven parent's natural mode is expansive and forward-moving. They are less comfortable with the limiting, containing work of parenting — holding a boundary, staying in a difficult conversation, being present with a child's sadness rather than immediately redirecting toward something more pleasant. Difficult emotions, in a Seven household, can go unprocessed.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Creates an atmosphere of joy and adventure", body: "Seven parents bring a sense of expansive possibility to family life. Trips become quests, ordinary weekends become adventures, and children grow up feeling that life is full of fascinating things to discover." },
                { title: "Highly engaging and inventive", body: "The Seven parent is rarely boring. They generate ideas, games, and experiences that keep their children mentally stimulated and emotionally engaged in ways that few other types match." },
                { title: "Models enthusiasm and curiosity", body: "Children of Sevens absorb their parent's orientation toward the world — that life is interesting, that experiences are worth pursuing, and that approaching new things with eagerness is a real way to live." },
                { title: "Flexible and fun-oriented in ways children love", body: "The Seven parent rolls with the changes, says yes when other parents say no, and brings a quality of play to parenting that children find genuinely delightful." },
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
                { title: "Difficulty holding consistent limits", body: "The Seven parent's aversion to constraint extends to the limits they need to set with their own children. Saying no, holding a rule against pushback, enduring the child's disappointment — these can be genuinely uncomfortable for the Seven, and limits often weaken as a result." },
                { title: "Avoidance of the containing and limiting work of parenting", body: "Parenting includes a lot of unglamorous, repetitive, restraining work. The Seven parent may unconsciously delegate this to a co-parent or skip it entirely, leaving children without the structure they actually need." },
                { title: "May redirect away from difficult emotions rather than sitting with them", body: "When a child is sad, angry, or in pain, the Seven's instinct is often to cheer them up, reframe the situation, or move on to something more pleasant. The child can learn that hard feelings are not welcome in the household." },
                { title: "Can be inconsistent in follow-through", body: "Plans, promises, and commitments can shift as the Seven's attention moves. Children, who depend on consistency to feel safe, may experience this as unreliability even when the Seven's love is unwavering." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the Seven Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Seven parent who has developed their capacity for presence creates a home that is both genuinely joyful AND safe for the full range of experience — including the hard parts. Their children get the best of the Seven without the avoidance.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core ask is to stay — to be present with the difficult moment without reframing or redirecting it. This is the hardest thing for a Seven, and the most important thing a Seven parent can do.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 7</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 Overview</Link>
              <Link href="/enneagram/type-7/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 in Relationships</Link>
              <Link href="/enneagram/type-7/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 at Work</Link>
              <Link href="/enneagram/type-7/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 Growth</Link>
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
