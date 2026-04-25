import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 3;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 3 Under Stress — When the Achiever Disintegrates | Thyself",
  description:
    "What happens to Type 3 under stress: the shift toward Type 9 patterns, inertia, numbing, and the strange flatness of a type that has temporarily lost its drive. How to recognize it and work with it.",
  alternates: {
    canonical: "https://thyself.app/enneagram/type-3/stress",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 3 Under Stress — When the Achiever Disintegrates",
  description:
    "What happens to Type 3 under stress: the shift toward Type 9 patterns, inertia, numbing, and the strange flatness of a type that has temporarily lost its drive.",
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
    "@id": "https://thyself.app/enneagram/type-3/stress",
  },
};

export default function Type3StressPage() {
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
              Under significant stress, the Three&apos;s extraordinary drive
              stalls. The engine that has been running continuously &mdash;
              producing, performing, optimizing &mdash; loses its fuel. What
              replaces it is not rest but a strange flatness: an inability to
              access the motivation that normally makes the Three feel most
              alive. They may become uncharacteristically passive, unfocused,
              and disconnected from the goals that usually organize their
              identity.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              The Stress Direction
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              The Three under stress moves toward the unhealthy aspects of Type
              9. The achievement orientation collapses into inertia. They may
              spend hours doing nothing &mdash; not resting, which would be
              productive, but numbing: scrolling, watching, existing without
              purpose. The image management that normally runs automatically
              goes offline.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              They stop performing and don&apos;t know who they are without the
              performance. This state can cycle rapidly with bursts of frenetic
              activity as the Three tries to restart the engine before the
              numbness takes hold again. The contrast between their normal pace
              and this stalled state is itself disturbing to them &mdash;
              evidence, they fear, that the drive was the only thing holding
              the self together.
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
                  Unusual passivity
                </h3>
                <p className="text-gray-700">
                  Unusual passivity and inability to initiate &mdash; the Three
                  who always has a plan suddenly has none.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">Numbing</h3>
                <p className="text-gray-700">
                  Numbing behaviors that look out of character: excessive screen
                  time, substance use, or any activity that allows them to
                  disappear without actually resting.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Loss of contact with goals
                </h3>
                <p className="text-gray-700">
                  Loss of contact with goals they normally care about &mdash; a
                  disturbing inability to remember why any of it matters.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Image slipping
                </h3>
                <p className="text-gray-700">
                  Difficulty maintaining the image presentation that normally
                  comes automatically &mdash; appearing disheveled, disengaged,
                  or visibly depleted.
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
                  Permission to be unproductive without it meaning anything
                  about their worth. Small, concrete activities that rebuild
                  momentum without requiring performance. Connection with
                  people who know them outside their achievements.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  What makes it worse
                </h3>
                <p className="leading-relaxed text-gray-700">
                  Trying to force productivity through willpower when the engine
                  is empty, social comparison, and interpreting the collapse as
                  evidence that their &ldquo;real self&rdquo; is worthless
                  without achievement.
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
