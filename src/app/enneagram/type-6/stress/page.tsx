import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 6;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 6 Under Stress — When the Loyalist Disintegrates | Thyself",
  description:
    "What happens to Type 6 under stress: the shift toward Type 3 patterns, image consciousness, competitive striving, and the loss of the authentic self beneath the performance. How to recognize it.",
  alternates: {
    canonical: "https://thyself.app/enneagram/type-6/stress",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 6 Under Stress — When the Loyalist Disintegrates",
  description:
    "What happens to Type 6 under stress: the shift toward Type 3 patterns, image consciousness, competitive striving, and the loss of the authentic self beneath the performance.",
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
    "@id": "https://thyself.app/enneagram/type-6/stress",
  },
};

export default function Type6StressPage() {
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
              Under significant stress, the Six&apos;s characteristic loyalty,
              humor, and questioning mind give way to something more
              performance-oriented. The anxiety that drives the Six normally
              pushes them toward alliance-building and preparation; under
              extreme stress, it pushes them toward image management and
              competitive self-promotion &mdash; a mode that feels deeply
              foreign to the Six who is paying attention.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              The Stress Direction
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              The Six under stress moves toward the unhealthy aspects of Type
              3. The genuine warmth and self-deprecating honesty that make
              Sixes trustworthy recedes, replaced by a focus on how they appear
              to others. They may become competitive in contexts where they
              normally root for everyone.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              They begin performing competence rather than actually having it
              &mdash; which accelerates the anxiety, since the Six cannot trust
              performances the way they trust genuine capacity. The result is a
              compounding loop: the more they perform, the less grounded they
              feel, and the more performing seems necessary to stay safe.
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
                  Status concern
                </h3>
                <p className="text-gray-700">
                  Unusual concern with status or recognition from people whose
                  approval they don&apos;t normally seek.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Self-promotion
                </h3>
                <p className="text-gray-700">
                  Self-promotion that feels out of character &mdash; talking up
                  accomplishments in ways that feel inauthentic.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Competitiveness
                </h3>
                <p className="text-gray-700">
                  Competitiveness in relationships or contexts that are
                  normally safe and collaborative.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Going through motions
                </h3>
                <p className="text-gray-700">
                  A sense of going through the motions &mdash; performing a
                  role without feeling like themselves inside it.
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
                  Returning to the things that are genuinely theirs &mdash;
                  their actual skills, their real relationships, their honest
                  opinions. Being seen by someone who knows them outside the
                  performance helps interrupt the cycle. Any activity that is
                  valued for its process rather than its result.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  What makes it worse
                </h3>
                <p className="leading-relaxed text-gray-700">
                  Doubling down on the performance, seeking reassurance from
                  the same sources that triggered the stress, and treating the
                  image management as the solution rather than part of the
                  problem.
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
