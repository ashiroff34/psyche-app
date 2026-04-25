import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 7 Under Stress — When the Enthusiast Disintegrates | Thyself",
  description:
    "What happens to Type 7 under stress: the shift toward Type 1 patterns, irritability, criticism, perfectionism, and the collapse of the optimism that normally sustains them. How to recognize it.",
  alternates: {
    canonical: "https://thyself.app/enneagram/type-7/stress",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 7 Under Stress — When the Enthusiast Disintegrates",
  description:
    "What happens to Type 7 under stress: the shift toward Type 1 patterns, irritability, criticism, perfectionism, and the collapse of the optimism that normally sustains them.",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  author: { "@type": "Organization", name: "Thyself" },
  publisher: {
    "@type": "Organization",
    name: "Thyself",
    url: "https://thyself.app",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://thyself.app/enneagram/type-7/stress",
  },
};

export default function Type7StressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <section
          className="px-6 py-16 text-white"
          style={{ backgroundColor: color }}
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
              {typeNum}
            </div>
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              Type {typeNum} Under Stress
            </h1>
            <p className="mb-2 text-lg opacity-90">The {typeName}</p>
            <p className="text-lg leading-relaxed opacity-95">
              Under significant stress, the Seven&apos;s characteristic
              lightness and forward momentum curdle into something sharp and
              critical. The type that normally finds the positive angle,
              reframes difficulty, and keeps things moving becomes suddenly
              intolerant &mdash; of imperfection, of people who do things
              wrong, of a world that is not meeting a standard they cannot
              quite articulate but feel intensely.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              The Stress Direction
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              The Seven under stress moves toward the unhealthy aspects of Type
              1. The optimism that normally makes the Seven buoyant is replaced
              by irritability and a relentless noticing of everything that is
              falling short. They become perfectionistic in ways that are
              deeply foreign to their usual mode &mdash; fixating on details,
              unable to tolerate the slippage they would normally laugh off.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              The anger that has no place in the Seven&apos;s self-concept
              surfaces as criticism, judgment, and a conviction that everyone
              around them is doing it wrong. This is jarring for the Seven
              themselves, who experience the change as a kind of personality
              hijack &mdash; they don&apos;t recognize the voice that&apos;s
              suddenly coming out of them.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Signs You&apos;re in the Stress Pattern
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Irritability
                </h3>
                <p className="text-gray-700">
                  Irritability and short temper &mdash; snapping at people over
                  minor issues in ways that are uncharacteristic.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Sudden perfectionism
                </h3>
                <p className="text-gray-700">
                  Sudden perfectionism &mdash; fixating on details and standards
                  they normally bypass entirely.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Moralizing criticism
                </h3>
                <p className="text-gray-700">
                  Critical commentary on others&apos; behavior that has a moral
                  edge: this is not just annoying, it&apos;s wrong.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Reframe failure
                </h3>
                <p className="text-gray-700">
                  A loss of the capacity to reframe &mdash; the mental move
                  that normally makes things feel manageable stops working.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Working with Stress
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div
                className="rounded-lg border-2 p-6"
                style={{ borderColor: color }}
              >
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  What helps
                </h3>
                <p className="leading-relaxed text-gray-700">
                  Acknowledging that they are struggling rather than reframing
                  the struggle away. Physical activity that discharges the
                  edginess. A conversation with someone they trust where they
                  can say what is actually wrong without managing their tone.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  What makes it worse
                </h3>
                <p className="leading-relaxed text-gray-700">
                  Doubling down on positivity (the reframe that isn&apos;t
                  working), making major decisions while in the critical
                  headspace, and interpreting the irritability as evidence that
                  they are secretly a judgmental person (rather than a stressed
                  Seven).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Continue exploring Type {typeNum}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href={`/enneagram/type-${typeNum}`}
                className="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <p className="font-semibold text-gray-900">
                  Type {typeNum} overview
                </p>
                <p className="text-sm text-gray-600">
                  The full picture of the {typeName}
                </p>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/relationships`}
                className="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <p className="font-semibold text-gray-900">
                  Type {typeNum} in relationships
                </p>
                <p className="text-sm text-gray-600">
                  How the {typeName} loves and connects
                </p>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/work`}
                className="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <p className="font-semibold text-gray-900">
                  Type {typeNum} at work
                </p>
                <p className="text-sm text-gray-600">
                  Professional patterns and growth edges
                </p>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/growth`}
                className="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <p className="font-semibold text-gray-900">
                  Type {typeNum} growth
                </p>
                <p className="text-sm text-gray-600">
                  Pathways toward integration
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 py-16" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">
              Not sure if you&apos;re a Type {typeNum}?
            </h2>
            <p className="mb-6 text-lg opacity-95">
              Take the Thyself Enneagram Assessment and discover your core type,
              wing, and instinctual variant.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Take the assessment
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
