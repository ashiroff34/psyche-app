import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const integrationNum = 5;
const integrationName = TYPE_NAMES[integrationNum];
const integrationColor = TYPE_COLORS[integrationNum];

export const metadata: Metadata = {
  title: `Enneagram Type 7 Growth — How the ${typeName} Develops | Thyself`,
  description: `How Enneagram Type 7 grows: integration toward Type 5, learning to stay with one experience long enough for it to become rich rather than merely stimulating. Grounded in Riso-Hudson and Naranjo.`,
  openGraph: {
    title: `Enneagram Type 7 Growth — How the ${typeName} Develops`,
    description: `The Type 7's path of growth moves toward Type 5 — depth over breadth, the capacity to stay, and the discovery that presence to difficulty produces a quality of joy stimulation cannot.`,
    url: "https://thyself.app/enneagram/type-7/growth",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-7/growth" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 7 Growth — How the ${typeName} Develops`,
  description: `The path of growth for Type 7s: integration toward Type 5, learning to stay long enough for experience to deepen.`,
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-7/growth",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-7/growth" },
};

export default function Type7GrowthPage() {
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
              <p className="text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 7</p>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Type {typeNum} Growth</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Growth for the {typeName} is not about becoming serious or giving up pleasure. It is about discovering that genuine presence — including presence to difficulty — produces a quality of joy that constant stimulation cannot.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Growth Direction</h2>
            <p className="leading-relaxed text-gray-700">
              The {typeName}&apos;s growth is toward depth — learning to stay in one place long enough for the experience to become rich rather than merely stimulating. The integrated Seven discovers that there is more available in depth than in breadth, and that the things they have been running from — limitation, pain, boredom — are often the doorway to the meaning they have been running toward.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              In Enneagram theory, this movement is called integration — and for Type 7, it points toward{" "}
              <Link href={`/enneagram/type-${integrationNum}`} className="font-medium underline" style={{ color: integrationColor }}>
                Type {integrationNum}, the {integrationName}
              </Link>
              . This does not mean Sevens become Fives. It means they have access, in moments of health and security, to the Five&apos;s capacity for sustained focus and depth — the willingness to stay with something long enough to actually know it.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">What Growth Actually Means</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Finish before moving on",
                  body: "Complete the project, the conversation, the experience — before reaching for the next. The Seven&apos;s habit of leaving things half-finished keeps life broad but shallow. Completion is the practice.",
                },
                {
                  title: "Sit with discomfort",
                  body: "Stay with what feels uncomfortable for long enough to discover what is underneath, rather than reframing it immediately. The reframe arrives so quickly the Seven rarely meets the original feeling.",
                },
                {
                  title: "Develop one area of depth",
                  body: "Choose a single domain — a craft, a relationship, a body of knowledge — and commit to going deep rather than perpetually adding new ones. Depth is what gives breadth meaning.",
                },
                {
                  title: "Notice the reframe",
                  body: "Catch the moment a difficult thing becomes a learning opportunity in your narration. Ask: is this reframe honest, or is it a comfortable exit? Sometimes it is both. Notice when it is mostly the second.",
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
                  Integrated Sevens bring the joy and curiosity that have always been their gift into genuine depth of engagement. Their experience becomes rich rather than merely full — they are present enough to actually receive what life is offering rather than consuming it in transit.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-5">
                <h3 className="mb-2 font-semibold text-gray-900">A common misconception</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  Growth for a Seven does not mean becoming serious or giving up pleasure. It means discovering that genuine presence — including presence to difficulty — produces a quality of joy that constant stimulation cannot.
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
