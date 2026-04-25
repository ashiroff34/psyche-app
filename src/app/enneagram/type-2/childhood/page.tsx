import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 2;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonicalUrl = `https://thyself.app/enneagram/type-${typeNum}/childhood`;

export const metadata: Metadata = {
  title: "Enneagram Type 2 Childhood — The Helper's Core Wound | Thyself",
  description:
    "Explore the developmental patterns associated with Enneagram Type 2: the early caretaker role, the equation of giving with love, and the lost childhood message that shapes the Helper's adult life.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Enneagram Type 2 Childhood — The Helper's Core Wound",
    description:
      "Developmental patterns and the lost childhood message for the Helper, grounded in Naranjo and Riso-Hudson.",
    url: canonicalUrl,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 2 Childhood — The Helper's Core Wound",
  description:
    "Developmental patterns associated with Enneagram Type 2, the lost childhood message, and how early experience carries into adult life.",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  author: { "@type": "Organization", name: "Thyself" },
  publisher: {
    "@type": "Organization",
    name: "Thyself",
    url: "https://thyself.app",
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
};

export default function Type2ChildhoodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-white text-neutral-900">
        <header
          className="px-6 py-16 sm:py-20"
          style={{ backgroundColor: color }}
        >
          <div className="mx-auto max-w-3xl text-white">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider">
              Childhood Patterns
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Type {typeNum} &mdash; Childhood Patterns
            </h1>
            <p className="mt-3 text-lg opacity-90">
              The {typeName} pattern often takes shape in childhoods where being
              needed felt safer than simply being. Understanding that origin
              opens the door to receiving as fully as the Two has learned to
              give.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-semibold">The Childhood Context</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Type 2 pattern tends to develop in childhood environments where
            the child&apos;s needs were less central than the needs of others
            &mdash; where love felt contingent on being helpful, warm, and
            emotionally attuned to the family&apos;s demands. This did not
            require explicit neglect; it often emerged more subtly, as the
            child learned that being needed was the most reliable path to
            connection and security.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Two child often became emotionally skilled early &mdash;
            reading the room, managing parents&apos; feelings, being the one
            who made things smoother. This skill was genuinely valued by the
            family, which reinforced it. But the cost was a gradual
            disconnection from the child&apos;s own emotional life, which was
            less consistently attended to.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <div
            className="rounded-2xl border-l-4 bg-neutral-50 p-6"
            style={{ borderLeftColor: color }}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Lost Childhood Message
            </p>
            <p className="mt-3 text-xl font-medium text-neutral-900">
              &ldquo;You are wanted.&rdquo;
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              From Riso-Hudson&apos;s framing of the nine types. This is the
              message the Two did not consistently receive &mdash; not the
              cause of the type, but the developmental ache it organizes
              around.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">
            What Childhood Often Looked Like
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            These are patterns, not deterministic stories. Many Twos recognize
            some or all of these in their early life.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Emotional caretaker of the family
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Sensitive to parents&apos; moods and working &mdash; often
                without being asked &mdash; to manage them.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">Giving as connection</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Learning that giving got them love in ways that simply being
                present did not.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Own needs hard to find
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Not because they were forbidden, but because attention had been
                directed outward for so long.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">
            What Carried Into Adulthood
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Giving equals love
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The Two gives to stay connected, even when it costs them more
                than they can afford.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Difficulty receiving
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                They have learned to be the one who provides, not the one who
                is provided for.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">An unspoken ledger</h3>
              <p className="mt-2 text-sm text-neutral-700">
                The accumulated debt of giving that is not reciprocated &mdash;
                often surfacing as resentment when it overflows.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Pride in self-sufficiency
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The conviction that needing is a vulnerability &mdash; and that
                they, of all people, do not need.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">Working With the Origin</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-xl border-l-4 bg-neutral-50 p-5"
              style={{ borderLeftColor: color }}
            >
              <h3 className="text-base font-semibold">What helps</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Practices that return attention to their own experience
                &mdash; therapy, somatic work, and relationships where their
                needs are explicitly attended to without them having to perform
                for the care.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-neutral-300 bg-neutral-50 p-5">
              <h3 className="text-base font-semibold">What keeps it active</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Relationships where giving continues to be the primary currency
                of connection, and environments where the Two&apos;s
                needfulness is ignored.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">Continue exploring Type 2</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/enneagram/type-${typeNum}`}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Type {typeNum} Overview
            </Link>
            <Link
              href={`/enneagram/type-${typeNum}/growth`}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Growth Path
            </Link>
            <Link
              href={`/enneagram/type-${typeNum}/stress`}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Under Stress
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-20">
          <div
            className="rounded-2xl p-8 text-white"
            style={{ backgroundColor: color }}
          >
            <h2 className="text-xl font-semibold sm:text-2xl">
              Wondering if Type 2 fits you?
            </h2>
            <p className="mt-2 text-white/90">
              Take the Thyself Enneagram Assessment to find your type and read
              the patterns that match your own developmental story.
            </p>
            <Link
              href="/assessments"
              className="mt-5 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
            >
              Start the assessment
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
