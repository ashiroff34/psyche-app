import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 4;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonicalUrl = `https://thyself.app/enneagram/type-${typeNum}/childhood`;

export const metadata: Metadata = {
  title: "Enneagram Type 4 Childhood — The Individualist's Core Wound | Thyself",
  description:
    "Explore the developmental patterns associated with Enneagram Type 4: the early sense of being different, the rich inner life, and the lost childhood message that shapes the Individualist's adult life.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Enneagram Type 4 Childhood — The Individualist's Core Wound",
    description:
      "Developmental patterns and the lost childhood message for the Individualist, grounded in Naranjo and Riso-Hudson.",
    url: canonicalUrl,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 4 Childhood — The Individualist's Core Wound",
  description:
    "Developmental patterns associated with Enneagram Type 4, the lost childhood message, and how early experience carries into adult life.",
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

export default function Type4ChildhoodPage() {
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
              child felt seen but not quite seen accurately. Understanding that
              origin loosens the grip of the longing that has organized so
              much of adult life.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-semibold">The Childhood Context</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Type 4 pattern tends to develop in childhood environments where
            the child experienced a sense of not quite fitting &mdash; of
            being somehow different from the family or the surrounding world
            in ways that were not fully understood or welcomed. This could
            involve an actual rupture (loss, abandonment, family disruption)
            or a subtler sense of being seen but not quite seen accurately
            &mdash; known as a role or a function but not as who they actually
            were.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            The Four child often responded to this sense of difference by
            turning inward &mdash; developing a rich inner life that became
            both sanctuary and identity. The longing for someone to truly see
            and accept them became one of the defining emotional currents of
            their development.
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
              &ldquo;You are seen for who you are.&rdquo;
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              From Riso-Hudson&apos;s framing of the nine types. This is the
              message the Four did not consistently receive &mdash; not the
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
            These are patterns, not deterministic stories. Many Fours recognize
            some or all of these in their early life.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">A sense of difference</h3>
              <p className="mt-2 text-sm text-neutral-700">
                From siblings, from peers, from the family&apos;s expectations
                &mdash; felt intensely even if others didn&apos;t notice it.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                A rich inner life early
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Fantasy, imagination, emotional depth that exceeded what the
                outer environment could hold or reflect back.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                A search for true connection
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The desire to be completely known &mdash; often disappointed,
                often idealized in its absence.
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
                The sense of being different
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                A core experience that can be a source of both suffering and
                identity &mdash; both sanctuary and prison.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                The longing for recognition
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                The feeling of being truly seen, which the Four pursues and
                often experiences as just out of reach.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                The idealize-devalue pattern
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Elevating what is absent and finding fault with what is
                present &mdash; love that is far away always feels truer.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold">
                Suffering as meaningful
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                Pain that has been so thoroughly inhabited becomes part of how
                the Four understands themselves &mdash; sometimes hard to set
                down even when life softens.
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
                Therapy that works with the longing directly &mdash; helping
                the Four find that what they are seeking is not permanently
                absent but present in a different form. Completion of things.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-neutral-300 bg-neutral-50 p-5">
              <h3 className="text-base font-semibold">What keeps it active</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Environments that confirm the sense of difference without
                offering genuine connection, and relationships that become the
                screen for idealization.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">Continue exploring Type 4</h2>
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
              Wondering if Type 4 fits you?
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
