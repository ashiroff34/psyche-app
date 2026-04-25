import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 8;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonicalUrl = `https://thyself.app/enneagram/type-${typeNum}/childhood`;

export const metadata: Metadata = {
  title: "Enneagram Type 8 Childhood — The Challenger's Core Wound | Thyself",
  description:
    "Explore the developmental patterns associated with Enneagram Type 8: the early armoring against vulnerability, the read on power, and the lost childhood message that shapes the Challenger's adult life.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Enneagram Type 8 Childhood — The Challenger's Core Wound",
    description:
      "Developmental patterns and the lost childhood message for the Challenger, grounded in Naranjo and Riso-Hudson.",
    url: canonicalUrl,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 8 Childhood — The Challenger's Core Wound",
  description:
    "Developmental patterns associated with Enneagram Type 8, the lost childhood message, and how early experience carries into adult life.",
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

export default function Type8ChildhoodPage() {
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
              The {typeName} pattern often takes shape in childhoods where
              vulnerability got punished. Understanding that origin opens the
              door to setting the armor down in the relationships that have
              earned it.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-semibold">The Childhood Context</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Type 8 pattern tends to develop in childhood environments where
            the child experienced that vulnerability was dangerous &mdash;
            that being soft, needing, or showing uncertainty invited hurt,
            betrayal, or exploitation. This often involved an environment
            where strength was the only thing that was respected, or where
            the child was exposed to genuine threat and discovered that force
            was the most reliable defense.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Eight child often became tougher, faster, and more independent
            than their years warranted &mdash; armoring against the
            vulnerability that experience had taught them was a liability.
            The gentleness that is as real as the strength was driven
            underground, available only to those who passed a rigorous test
            of trustworthiness.
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
              &ldquo;You will not be betrayed.&rdquo;
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              From Riso-Hudson&apos;s framing of the nine types. This is the
              message the Eight did not consistently receive &mdash; not the
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
            These are patterns, not deterministic stories. Many Eights
            recognize some or all of these in their early life.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Early self-sufficiency
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Learning not to depend on others for what they could do for
                themselves &mdash; often well before the age that was age
                appropriate.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Armor against vulnerability
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The child who stopped crying, stopped asking for help, stopped
                showing what could be used against them.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">A read on power</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Early and accurate awareness of who had it, who was using it,
                and how to position themselves accordingly.
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
              <h3 className="text-base font-semibold">The armor</h3>
              <p className="mt-2 text-sm text-neutral-700">
                The protective structure that keeps vulnerability inaccessible
                &mdash; functional, costly, and often invisible to the Eight
                themselves.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Distrust of those with power
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The Eight&apos;s characteristic resistance to being controlled,
                directed, or condescended to.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Protectiveness of the vulnerable
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                They know what it is to be unprotected &mdash; and they will
                stand between the small thing and what threatens it.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">Difficulty surrendering</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Putting the armor down even in relationships where it would be
                safe to do so &mdash; the body has learned not to.
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
                Relationships where vulnerability is genuinely safe &mdash;
                where the Eight tests the relationship and finds that it
                holds. Therapy that is direct enough to be credible to the
                Eight while gentle enough to make vulnerability possible.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-neutral-300 bg-neutral-50 p-5">
              <h3 className="text-base font-semibold">What keeps it active</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Environments that confirm the wisdom of the armor, and
                betrayal &mdash; which writes itself onto the Eight as fresh
                proof of an old conclusion.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">Continue exploring Type 8</h2>
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
              Wondering if Type 8 fits you?
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
