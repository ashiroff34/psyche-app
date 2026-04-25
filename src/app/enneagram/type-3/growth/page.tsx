import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 3;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const integrationNum = 6;
const integrationName = TYPE_NAMES[integrationNum];
const integrationColor = TYPE_COLORS[integrationNum];

export const metadata: Metadata = {
  title: `Enneagram Type 3 Growth — How the ${typeName} Develops | Thyself`,
  description: `How Enneagram Type 3 grows: integration toward Type 6, developing genuine connection over performance, and learning to value relationships above achievement. Grounded in Riso-Hudson and Naranjo.`,
  openGraph: {
    title: `Enneagram Type 3 Growth — How the ${typeName} Develops`,
    description: `The Type 3's path of growth moves toward Type 6 — committed, unperformative presence, and the discovery that being known is more satisfying than being admired.`,
    url: "https://thyself.app/enneagram/type-3/growth",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-3/growth" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 3 Growth — How the ${typeName} Develops`,
  description: `The path of growth for Type 3s: integration toward Type 6, developing genuine connection, and the move from performance to presence.`,
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-3/growth",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-3/growth" },
};

export default function Type3GrowthPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                {typeNum}
              </span>
              <p className="text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 3</p>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Type {typeNum} Growth</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Growth for the {typeName} is not about abandoning ambition. It is about developing the inner life that makes achievement feel meaningful rather than empty — and discovering that being genuinely known is more satisfying than being admired.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Growth Direction</h2>
            <p className="leading-relaxed text-gray-700">
              The {typeName}&apos;s growth is toward genuine connection — developing loyalty to people and communities rather than to performance and image. The integrated Three begins to value relationships for what they are rather than for what they signal, and discovers that being genuinely known is more satisfying than being admired. They develop the Six&apos;s capacity for committed, unperformative presence.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              In Enneagram theory, this movement is called integration — and for Type 3, it points toward{" "}
              <Link href={`/enneagram/type-${integrationNum}`} className="font-medium underline" style={{ color: integrationColor }}>
                Type {integrationNum}, the {integrationName}
              </Link>
              . This does not mean Threes become Sixes. It means they have access, in moments of health and security, to the Six&apos;s loyalty and the willingness to stay rather than perform — to be reliable to particular people and communities even when there is no audience watching.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">What Growth Actually Means</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Stay in the difficult conversation",
                  body: "Resist the pivot to solutions, reframes, or productive next steps. Stay with the discomfort of an unresolved feeling — yours or someone else&apos;s. The Three&apos;s instinct to move forward is often a way of leaving the moment.",
                },
                {
                  title: "Tell the truth before vetting it",
                  body: "Say what you actually feel before you have determined whether it is acceptable to feel it. The reflexive editing for image is the habit. Growth begins when the unfiltered version makes it out of your mouth.",
                },
                {
                  title: "Choose relationships over opportunities",
                  body: "When the two conflict — and they will — practice choosing the person. The opportunity will return; the message you send by leaving someone behind for it will not be unsent.",
                },
                {
                  title: "Notice what you actually value",
                  body: "Slow down enough to distinguish between what you have learned to want and what you genuinely care about. Strip away the audience and ask: would I still pursue this if no one would ever know?",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border-l-4 bg-gray-50 p-5" style={{ borderLeftColor: color }}>
                  <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">What Growth Doesn&apos;t Mean</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border-2 p-5" style={{ borderColor: color }}>
                <h3 className="mb-2 font-semibold text-gray-900">At their best</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  Integrated Threes become genuinely committed people — they care about causes, people, and communities in ways that are not strategic. Their competence, which was always real, is placed in service of something larger than their own advancement.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-5">
                <h3 className="mb-2 font-semibold text-gray-900">A common misconception</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  Growth for a Three does not mean abandoning ambition or productivity. It means developing the inner life that makes those achievements feel meaningful rather than empty.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Continue Exploring Type {typeNum}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href={`/enneagram/type-${typeNum}`} className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400">
                <p className="font-medium text-gray-900">Type {typeNum} Overview</p>
                <p className="text-sm text-gray-600">Core motivations, fears, and patterns</p>
              </Link>
              <Link href={`/enneagram/type-${typeNum}/relationships`} className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400">
                <p className="font-medium text-gray-900">In Relationships</p>
                <p className="text-sm text-gray-600">How the {typeName} loves and is loved</p>
              </Link>
              <Link href={`/enneagram/type-${typeNum}/work`} className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400">
                <p className="font-medium text-gray-900">At Work</p>
                <p className="text-sm text-gray-600">Professional patterns and ideal environments</p>
              </Link>
              <Link href={`/enneagram/type-${typeNum}/famous`} className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400">
                <p className="font-medium text-gray-900">Famous Examples</p>
                <p className="text-sm text-gray-600">Recognizable people who fit the pattern</p>
              </Link>
            </div>
          </section>

          <section className="rounded-2xl p-8 text-center text-white" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Not sure if you&apos;re a Type {typeNum}?</h2>
            <p className="mb-6 text-white/90">
              Take the Thyself Enneagram Assessment to find your type and start your growth path.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-full bg-white px-8 py-3 font-semibold transition hover:bg-white/90"
              style={{ color }}
            >
              Find My Type
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
