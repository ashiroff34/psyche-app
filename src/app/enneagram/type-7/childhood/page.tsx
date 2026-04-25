import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonicalUrl = `https://thyself.app/enneagram/type-${typeNum}/childhood`;

export const metadata: Metadata = {
  title: "Enneagram Type 7 Childhood — The Enthusiast's Core Wound | Thyself",
  description:
    "Explore the developmental patterns associated with Enneagram Type 7: the early avoidance of pain, the forward orientation, and the lost childhood message that shapes the Enthusiast's adult life.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Enneagram Type 7 Childhood — The Enthusiast's Core Wound",
    description:
      "Developmental patterns and the lost childhood message for the Enthusiast, grounded in Naranjo and Riso-Hudson.",
    url: canonicalUrl,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 7 Childhood — The Enthusiast's Core Wound",
  description:
    "Developmental patterns associated with Enneagram Type 7, the lost childhood message, and how early experience carries into adult life.",
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

export default function Type7ChildhoodPage() {
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
              The {typeName} pattern often takes shape in childhoods where pain
              didn&apos;t get held by the adults around. Understanding that
              origin makes it possible to begin staying for the difficult
              moment instead of moving past it.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-semibold">The Childhood Context</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Type 7 pattern tends to develop in childhood environments where
            painful experiences &mdash; loss, deprivation, fear, or simply the
            ordinary disappointments of childhood &mdash; were not
            sufficiently held by the adults around them. The child discovered
            early that the way to survive difficult experience was to move on
            from it &mdash; to redirect toward what was good, possible, and
            pleasurable.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Seven child often became the one who kept things light
            &mdash; who found the game, generated the excitement, and moved
            the family&apos;s mood in a more positive direction. This was not
            manipulation; it was the child&apos;s genuinely adaptive response
            to an environment where pain did not get processed. The cost was a
            gradually deepening avoidance of the interior that held the
            painful thing.
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
              &ldquo;You will be taken care of.&rdquo;
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              From Riso-Hudson&apos;s framing of the nine types. This is the
              message the Seven did not consistently receive &mdash; not the
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
            These are patterns, not deterministic stories. Many Sevens
            recognize some or all of these in their early life.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">A forward orientation</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Finding the next good thing as a way of leaving the difficult
                thing behind.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Source of energy and lightness
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Becoming the one who made things more fun &mdash; the
                family&apos;s spark, often valued precisely for that role.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">Sophisticated reframing</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Finding the positive angle that allowed movement through
                difficulty &mdash; an early and skilled mental capacity.
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
              <h3 className="text-base font-semibold">The avoidance of pain</h3>
              <p className="mt-2 text-sm text-neutral-700">
                The Seven&apos;s characteristic redirection away from whatever
                is difficult, heavy, or not moving.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">The restlessness</h3>
              <p className="mt-2 text-sm text-neutral-700">
                The sense that if they slow down, what is being avoided will
                catch up with them.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">The over-planning</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Filling the future with possibility as a way of managing the
                present.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">Difficulty staying</h3>
              <p className="mt-2 text-sm text-neutral-700">
                In difficult conversations, in painful emotional states, in
                relationships that require sustained presence through hard
                times.
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
                Practices that develop tolerance for staying &mdash;
                meditation, somatic work, therapy that moves through rather
                than around the difficult material. Relationships where the
                Seven is held gently in the difficult moment rather than
                joined in the exit from it.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-neutral-300 bg-neutral-50 p-5">
              <h3 className="text-base font-semibold">What keeps it active</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Environments that reward the positive spin and punish
                authentic expression of difficulty.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">Continue exploring Type 7</h2>
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
              Wondering if Type 7 fits you?
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
