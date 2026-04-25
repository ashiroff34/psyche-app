import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 5 Under Stress — When the Investigator Disintegrates | Thyself",
  description:
    "What happens to Type 5 under stress: the shift toward Type 7 patterns, scattered thinking, hyperactivity, and the fragmentation of the inner world they depend on. How to recognize it and work with it.",
  alternates: {
    canonical: "https://thyself.app/enneagram/type-5/stress",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 5 Under Stress — When the Investigator Disintegrates",
  description:
    "What happens to Type 5 under stress: the shift toward Type 7 patterns, scattered thinking, hyperactivity, and the fragmentation of the inner world they depend on.",
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
    "@id": "https://thyself.app/enneagram/type-5/stress",
  },
};

export default function Type5StressPage() {
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
              Under significant stress, the Five&apos;s orderly inner world
              begins to fragment. The careful management of attention and
              energy that normally allows sustained, deep engagement breaks
              down. What replaces it is a kind of frantic scatter &mdash;
              jumping between ideas, domains, and stimuli without completing
              anything or going deep enough to actually feel better.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              The Stress Direction
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              The Five under stress moves toward the unhealthy aspects of Type
              7. The withdrawal that normally serves them &mdash; allowing them
              to refuel and think &mdash; becomes compulsive isolation combined
              with anxious over-stimulation.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              They may accumulate new interests rapidly, start projects without
              finishing them, consume information without synthesizing it, and
              find themselves in a state that looks productive from the outside
              but feels chaotic from within. The solitude that is normally
              restorative stops working &mdash; the same room, the same desk,
              the same quiet now produces agitation rather than focus.
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
                  Racing thoughts
                </h3>
                <p className="text-gray-700">
                  Racing, fragmented thinking &mdash; the mind moves quickly
                  between subjects without settling anywhere.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Project scatter
                </h3>
                <p className="text-gray-700">
                  Starting multiple projects or lines of inquiry simultaneously
                  without completing any of them.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Unresolved anxiety
                </h3>
                <p className="text-gray-700">
                  Anxiety that is not resolved by their normal strategy of more
                  information or more preparation.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Solitude failing
                </h3>
                <p className="text-gray-700">
                  Over-stimulation from the very solitude that is normally
                  restorative &mdash; being alone feels agitated rather than
                  peaceful.
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
                  Physical containment &mdash; walking, exercise, or anything
                  that returns them to their body and interrupts the mental
                  fragmentation. A single, narrow task with a clear completion
                  point. A trusted person they can speak to without needing to
                  explain everything.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  What makes it worse
                </h3>
                <p className="leading-relaxed text-gray-700">
                  Consuming more information (their natural stress response,
                  which amplifies the scatter), complete isolation with no
                  external structure, and trying to think their way out of a
                  state that requires embodied rather than intellectual
                  intervention.
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
