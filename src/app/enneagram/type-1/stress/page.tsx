import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 1 Under Stress — When the Reformer Disintegrates | Thyself",
  description:
    "What happens to Type 1 under stress: the shift toward Type 4 patterns, melancholy, withdrawal, and the inner critic turned inward. How to recognize it and work with it.",
  alternates: {
    canonical: "https://thyself.app/enneagram/type-1/stress",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 1 Under Stress — When the Reformer Disintegrates",
  description:
    "What happens to Type 1 under stress: the shift toward Type 4 patterns, melancholy, withdrawal, and the inner critic turned inward.",
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
    "@id": "https://thyself.app/enneagram/type-1/stress",
  },
};

export default function Type1StressPage() {
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
              Under significant stress, the One&apos;s relentless self-correction
              stops being productive and turns inward into despair. The inner
              critic, which normally drives the One toward improvement, becomes
              a voice of fundamental deficiency &mdash; not &ldquo;you could do
              better&rdquo; but &ldquo;you are broken.&rdquo; They withdraw into
              a private suffering that looks, from the outside, like a sudden
              personality change.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              The Stress Direction
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              The One under stress moves toward the unhealthy aspects of Type 4.
              The principled engagement with the world drops away, replaced by a
              sense of deep personal flawedness &mdash; a conviction that they
              are not only imperfect but irreparably so. Envy appears: why does
              it seem so easy for others to relax and enjoy themselves when the
              One is so burdened?
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Withdrawal follows. The One may become uncharacteristically
              self-absorbed, ruminating on their failures and finding nothing to
              redeem them. The shift can be jarring to people who know the One
              as composed and capable: what surfaces is the melancholic
              underside of a temperament that has been holding itself to an
              impossible standard for a long time.
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
                <h3 className="mb-2 font-semibold text-gray-900">Withdrawal</h3>
                <p className="text-gray-700">
                  Withdrawing from the people and projects they normally engage
                  with fully.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Self-condemnation
                </h3>
                <p className="text-gray-700">
                  A sudden shift from self-correction to self-condemnation
                  &mdash; from &ldquo;I should do better&rdquo; to &ldquo;I am
                  fundamentally wrong.&rdquo;
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Emotional surfacing
                </h3>
                <p className="text-gray-700">
                  Unusual emotionality, often emerging suddenly in contexts
                  where the One normally maintains composure.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">Envy</h3>
                <p className="text-gray-700">
                  Envy of people who seem to live without the burden of
                  standards the One cannot put down.
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
                  Taking the inner critic seriously enough to question it rather
                  than obey it. The One&apos;s self-condemnation feels like
                  truth under stress, but it is the critic speaking &mdash; not
                  reality. Physical activity, genuine rest, and permission to be
                  ordinary help interrupt the spiral. Telling someone
                  trustworthy what is actually happening helps enormously.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  What makes it worse
                </h3>
                <p className="leading-relaxed text-gray-700">
                  Increased self-discipline (trying to correct their way out of
                  the stress), isolation, and the conviction that this state is
                  evidence of the fundamental flaw they have always feared they
                  have.
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
