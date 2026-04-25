import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 4;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 4 as a Parent — The Individualist's Parenting Style | Thyself",
  description:
    "How Enneagram Type 4 parents raise children: the depth and authenticity of an emotionally attuned parent, the challenge of providing consistent structure, and what Four parents need to grow.",
  openGraph: {
    title: "Enneagram Type 4 as a Parent",
    description: "The Type 4 parent brings depth, beauty, and emotional honesty to raising children — and must learn to provide the daily consistency that depth alone cannot.",
    url: "https://thyself.app/enneagram/type-4/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-4/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 4 as a Parent — The Individualist's Parenting Style",
  description: "How Type 4 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-4/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-4/parenting" },
};

export default function Type4ParentingPage() {
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
              The Four parent creates a home of beauty, depth, and emotional authenticity. Their children grow up knowing it is safe to feel everything, and that their inner life matters. The growth edge is providing the stability and routine that children also need, alongside the depth.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Four Parent's Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The Four parent brings genuine emotional attunement to parenting — they honor their child's feelings, encourage authentic self-expression, and create an atmosphere where the inner life is treated as important. This is a profound gift. Children of Fours often grow up with unusual emotional intelligence and a strong sense of their own identity.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The challenge is that the Four parent's emotional life is large, and children can feel caught in it. The Four's periods of melancholy or withdrawal can be confusing for children who need consistent presence. And the Four's aversion to the ordinary and routine can leave children without the daily structure that also shapes healthy development.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Deep emotional attunement", body: "Four parents take their children's emotional experience seriously in a way few other types do. The full range of feeling — sadness, anger, longing, joy — is welcomed rather than rushed past, and children learn that their inner life is worth attending to." },
                { title: "Homes that honor creativity and self-expression", body: "The Four parent creates an environment rich with art, music, language, and beauty. Children grow up with permission to express themselves authentically and the materials to do so." },
                { title: "Takes the child's inner life seriously", body: "Whatever the child is feeling or imagining, the Four parent treats as real and significant. Children of Fours rarely feel that their interior world is being dismissed as drama or phase." },
                { title: "Models what it looks like to engage deeply with experience", body: "The Four parent shows their children how to be present to life with full feeling — not skating across the surface, but actually meeting what is happening. This is a rare and valuable orientation to pass on." },
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
                { title: "Emotional variability that children find hard to predict", body: "The Four's natural shifts in mood — sometimes radiant, sometimes withdrawn — can be genuinely confusing for children who need stable emotional weather. Children may begin tracking the parent's state instead of attending to their own." },
                { title: "Difficulty providing consistent routine", body: "The ordinary structures of daily family life — bedtimes, meal patterns, weekly rhythms — can feel deadening to the Four. But these structures are exactly what children need to feel safe and oriented in time." },
                { title: "May project emotional meaning onto the child's experiences", body: "The Four parent can interpret the child's ordinary moments through the lens of their own emotional history — assuming depths or wounds that aren't actually there. The child can feel scripted into the parent's narrative rather than seen for who they actually are." },
                { title: "Periods of withdrawal when the Four needs to tend to their own interior", body: "When the Four parent retreats into their own inner world, the child can experience it as abandonment or as the result of something they did. Without explanation, these withdrawals are particularly hard for younger children to make sense of." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the Four Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Four parent who has developed their own stability creates an extraordinary home — one where children feel emotionally known AND held by consistent, reliable structure.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core ask is to show up in the ordinary moments with the same presence they bring to the emotionally significant ones. Consistency, not just depth, is what children need from their parents.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 4</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 Overview</Link>
              <Link href="/enneagram/type-4/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 in Relationships</Link>
              <Link href="/enneagram/type-4/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 at Work</Link>
              <Link href="/enneagram/type-4/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 Growth</Link>
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
