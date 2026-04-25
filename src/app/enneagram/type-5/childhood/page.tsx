import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonicalUrl = `https://thyself.app/enneagram/type-${typeNum}/childhood`;

export const metadata: Metadata = {
  title: "Enneagram Type 5 Childhood — The Investigator's Core Wound | Thyself",
  description:
    "Explore the developmental patterns associated with Enneagram Type 5: the early withdrawal, the equation of knowledge with safety, and the lost childhood message that shapes the Investigator's adult life.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Enneagram Type 5 Childhood — The Investigator's Core Wound",
    description:
      "Developmental patterns and the lost childhood message for the Investigator, grounded in Naranjo and Riso-Hudson.",
    url: canonicalUrl,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 5 Childhood — The Investigator's Core Wound",
  description:
    "Developmental patterns associated with Enneagram Type 5, the lost childhood message, and how early experience carries into adult life.",
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

export default function Type5ChildhoodPage() {
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
              The {typeName} pattern often takes shape in childhoods where the
              outer world felt more depleting than nourishing. Understanding
              that origin makes it possible to test, gently, whether contact is
              still as costly as it once was.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-semibold">The Childhood Context</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Type 5 pattern tends to develop in childhood environments where
            the child experienced the outer world as intrusive, overwhelming,
            or depleting &mdash; and discovered that withdrawal, observation,
            and the accumulation of understanding were reliable ways to manage
            that experience. This often involved a family system that either
            made too many demands on the child&apos;s energy or was emotionally
            chaotic in ways that made retreat the most functional response.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Five child often became a keen observer early &mdash; watching
            more than participating, developing their interior world as a
            refuge from what felt like the unmanageable demands of the social
            world. The discovery that knowledge provided a kind of control and
            security became the organizing principle of their development.
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
              &ldquo;Your needs are not a problem.&rdquo;
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              From Riso-Hudson&apos;s framing of the nine types. This is the
              message the Five did not consistently receive &mdash; not the
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
            These are patterns, not deterministic stories. Many Fives recognize
            some or all of these in their early life.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Withdrawal as a strategy
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Finding ways to reduce the demands of the outer world by
                limiting engagement with it.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                A rich and detailed inner world
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Thinking as sanctuary, knowledge as control &mdash; the
                interior built up because the exterior was too much.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                A sense of limited resources
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The conviction that they had only so much energy and that
                contact would deplete it.
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
                Energy through limitation of contact
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The Five&apos;s characteristic rationing of engagement &mdash;
                conserving rather than spending.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Knowledge as security
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                More information as a way of managing what feels threatening
                &mdash; preparation as a hedge against vulnerability.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Difficulty with emotional demand
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Emotions experienced as something that happens to you rather
                than something you inhabit.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">Needing as dangerous</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Because need requires contact, and contact has been registered
                as depleting since childhood.
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
                Graduated exposure to engagement in low-stakes contexts.
                Therapy that gently challenges the belief that contact is
                always depleting. Physical practices that rebuild a
                relationship with the body.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-neutral-300 bg-neutral-50 p-5">
              <h3 className="text-base font-semibold">What keeps it active</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Environments that confirm the sense of being overwhelmed, and
                relationships that demand more than the Five has decided they
                can give.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">Continue exploring Type 5</h2>
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
              Wondering if Type 5 fits you?
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
