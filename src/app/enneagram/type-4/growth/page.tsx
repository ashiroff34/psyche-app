import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 4;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const integrationNum = 1;
const integrationName = TYPE_NAMES[integrationNum];
const integrationColor = TYPE_COLORS[integrationNum];

export const metadata: Metadata = {
  title: `Enneagram Type 4 Growth — How the ${typeName} Develops | Thyself`,
  description: `How Enneagram Type 4 grows: integration toward Type 1, moving emotional energy into disciplined action, and learning to finish what they start. Grounded in Riso-Hudson and Naranjo.`,
  openGraph: {
    title: `Enneagram Type 4 Growth — How the ${typeName} Develops`,
    description: `The Type 4's path of growth moves toward Type 1 — principled action, structure, and the capacity to produce something lasting from the depth of inner experience.`,
    url: "https://thyself.app/enneagram/type-4/growth",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-4/growth" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 4 Growth — How the ${typeName} Develops`,
  description: `The path of growth for Type 4s: integration toward Type 1, moving emotional energy into structured engagement, and learning to finish what they start.`,
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-4/growth",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-4/growth" },
};

export default function Type4GrowthPage() {
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
              <p className="text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 4</p>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Type {typeNum} Growth</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Growth for the {typeName} is not about suppressing depth or pretending to be ordinary. It is about developing the structure that allows their depth to become productive rather than consuming — moving the enormous emotional energy of their inner life outward into disciplined work.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Growth Direction</h2>
            <p className="leading-relaxed text-gray-700">
              The {typeName}&apos;s growth is toward principled action — moving the enormous emotional energy of their inner life outward into disciplined, structured engagement with the world. The integrated Four discovers that the gap between what is and what should be is not only a source of longing but a call to work. They develop the capacity to function consistently and produce something lasting rather than only feeling deeply.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              In Enneagram theory, this movement is called integration — and for Type 4, it points toward{" "}
              <Link href={`/enneagram/type-${integrationNum}`} className="font-medium underline" style={{ color: integrationColor }}>
                Type {integrationNum}, the {integrationName}
              </Link>
              . This does not mean Fours become Ones. It means they have access, in moments of health and security, to the One&apos;s discipline and steady principled engagement — the willingness to keep working when the inspiration has passed.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">What Growth Actually Means</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Build daily structure",
                  body: "Create routines that hold you when emotion is pulling in a different direction. The structure is not the enemy of depth — it is the container that lets depth become productive rather than dissolving into mood.",
                },
                {
                  title: "Finish what you start",
                  body: "Bring projects to completion rather than abandoning them when the initial feeling fades. The work that has lost its glow and still needs finishing is exactly the work that builds the Four&apos;s capacity.",
                },
                {
                  title: "Practice equanimity in the ordinary",
                  body: "Resist the urge to amplify ordinary experience into something dramatic. The Tuesday afternoon does not need to feel epic. Growth is the willingness to let an unremarkable moment be unremarkable.",
                },
                {
                  title: "Interrupt the idealize-devalue cycle",
                  body: "Notice in relationships when someone moves from extraordinary to disappointing in your perception. The pattern is the type, not the person. Interrupting it before it completes is how Fours stay in real relationship.",
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
                  Integrated Fours bring the depth and originality of their inner life into contact with the discipline of sustained effort. The result is creative work of genuine substance — not the performance of intensity, but something that lives in the world and serves others.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-5">
                <h3 className="mb-2 font-semibold text-gray-900">A common misconception</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  Growth for a Four does not mean suppressing depth or pretending to be ordinary. It means developing the structure that allows their depth to become productive rather than consuming.
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
