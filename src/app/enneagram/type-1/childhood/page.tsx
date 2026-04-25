import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonicalUrl = `https://thyself.app/enneagram/type-${typeNum}/childhood`;

export const metadata: Metadata = {
  title: "Enneagram Type 1 Childhood — The Reformer's Core Wound | Thyself",
  description:
    "Explore the developmental patterns associated with Enneagram Type 1: the inner critic, the early sense of responsibility, and the lost childhood message that shapes the Reformer's adult life.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Enneagram Type 1 Childhood — The Reformer's Core Wound",
    description:
      "Developmental patterns and the lost childhood message for the Reformer, grounded in Naranjo and Riso-Hudson.",
    url: canonicalUrl,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 1 Childhood — The Reformer's Core Wound",
  description:
    "Developmental patterns associated with Enneagram Type 1, the lost childhood message, and how early experience carries into adult life.",
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

export default function Type1ChildhoodPage() {
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
              good felt like the basis of belonging. Understanding that origin is
              the first step toward unhooking from the inner critic that grew up
              alongside it.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-semibold">The Childhood Context</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Type 1 pattern tends to develop in childhood environments where
            the child experienced themselves as responsible for being good
            &mdash; where right behavior, correctness, or meeting a standard was
            the primary basis for acceptance and security. This did not require
            an explicitly punitive environment; it could emerge from a parent&apos;s
            anxiety about rules, from a child&apos;s own sensitivity to displeasure,
            or from a family culture where certain behaviors were simply not
            acceptable.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            What the One child typically internalized was not that they were
            being punished but that there was a correct way to be &mdash; and
            that deviating from it carried costs. The inner critic that becomes
            so defining in adulthood is the internalization of that judgment:
            initially external, eventually indistinguishable from the child&apos;s
            own voice.
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
              &ldquo;You are good and have integrity.&rdquo;
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              From Riso-Hudson&apos;s framing of the nine types. This is the
              message the One did not consistently receive &mdash; not the cause
              of the type, but the developmental ache it organizes around.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">
            What Childhood Often Looked Like
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            These are patterns, not deterministic stories. Many Ones recognize
            some or all of these in their early life.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">Early responsibility</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Being the &ldquo;good&rdquo; child, following rules carefully,
                often becoming an early voice of conscience among siblings.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Sensitivity to criticism
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Even minor correction could feel devastating &mdash; the gap
                between what was and what should be was felt intensely.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Suppressed spontaneity
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The child who was afraid to be caught wanting something they
                shouldn&apos;t want &mdash; impulse pushed underground.
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
              <h3 className="text-base font-semibold">The inner critic</h3>
              <p className="mt-2 text-sm text-neutral-700">
                The internalized judge that evaluates everything against an
                ideal &mdash; constantly running, often unnoticed.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                A deep need to be right and good
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Not for approval but as the fundamental condition of being
                acceptable to themselves.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Difficulty with imperfection
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                A low threshold for noticing when things fall short &mdash;
                their own work, others, the world.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">Suppressed anger</h3>
              <p className="mt-2 text-sm text-neutral-700">
                The emotion that was most unacceptable in childhood and
                therefore most hidden &mdash; often leaking out as resentment
                or tension.
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
                Therapy that works with the inner critic directly &mdash;
                helping the One develop an observer relationship to it rather
                than identifying with it. Self-compassion practices.
                Environments where imperfection is not only tolerated but
                warmly received.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-neutral-300 bg-neutral-50 p-5">
              <h3 className="text-base font-semibold">What keeps it active</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Perfectionistic environments, criticism from authority figures,
                situations where standards are unclear or inconsistently
                applied.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">Continue exploring Type 1</h2>
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
              Wondering if Type 1 fits you?
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
