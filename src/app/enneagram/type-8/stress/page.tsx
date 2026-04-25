import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 8;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 8 Under Stress — When the Challenger Disintegrates | Thyself",
  description:
    "What happens to Type 8 under stress: the shift toward Type 5 patterns, withdrawal, secretiveness, and the disconnection of a type that is normally fully engaged with the world. How to recognize it.",
  alternates: {
    canonical: "https://thyself.app/enneagram/type-8/stress",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 8 Under Stress — When the Challenger Disintegrates",
  description:
    "What happens to Type 8 under stress: the shift toward Type 5 patterns, withdrawal, secretiveness, and the disconnection of a type that is normally fully engaged with the world.",
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
    "@id": "https://thyself.app/enneagram/type-8/stress",
  },
};

export default function Type8StressPage() {
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
              Under significant stress, the Eight&apos;s characteristic
              engagement with the world reverses. The type that is normally
              most fully present &mdash; the one in the room whose energy
              fills it &mdash; begins to withdraw. They become secretive,
              suspicious, and unavailable in ways that are alarming to people
              who are used to their directness and force. The Eight disappears,
              and what remains is a defended perimeter.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              The Stress Direction
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              The Eight under stress moves toward the unhealthy aspects of Type
              5. They cut themselves off from the engagement that normally
              gives them energy &mdash; withdrawing from relationships, from
              projects, from the social world they typically dominate. They
              become information-hoarding: sharing less, trusting less,
              protecting their inner state with a vigilance that looks paranoid
              from the outside.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              The softness that was always their most vulnerable quality gets
              locked away more thoroughly than ever. People who have known the
              Eight as a force of presence find themselves talking to a closed
              door &mdash; not in conflict, just gone. This withdrawal is
              itself a form of self-protection the Eight cannot easily explain,
              even to themselves.
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
                  Unusual withdrawal from people and situations they would
                  normally engage with directly.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Secretiveness
                </h3>
                <p className="text-gray-700">
                  Secretiveness &mdash; sharing less, being cagey about their
                  whereabouts and activities in ways that feel like a sudden
                  personality change.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Intellectual over-functioning
                </h3>
                <p className="text-gray-700">
                  Intellectual over-functioning &mdash; reading, researching,
                  preparing obsessively for threats they cannot quite identify.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">Suspicion</h3>
                <p className="text-gray-700">
                  Suspicion of people who have previously been trusted &mdash; a
                  sense that everyone is working against them.
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
                  A single trusted person who can reach them without feeling
                  threatening &mdash; someone whose loyalty is beyond question.
                  Physical engagement with the world: the Eight&apos;s body is
                  their anchor, and movement helps re-engage them with the life
                  they have withdrawn from. Short-term, clear commitments that
                  bring them back into contact with what they actually care
                  about.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  What makes it worse
                </h3>
                <p className="leading-relaxed text-gray-700">
                  Forcing the Eight to socialize or engage before they are
                  ready, interpreting the withdrawal as rejection, and any
                  experience that confirms their suspicion that the world
                  cannot be trusted.
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
