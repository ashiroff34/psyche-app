import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const integrationNum = 7;
const integrationName = TYPE_NAMES[integrationNum];
const integrationColor = TYPE_COLORS[integrationNum];

export const metadata: Metadata = {
  title: `Enneagram Type 1 Growth — How the ${typeName} Develops | Thyself`,
  description: `How Enneagram Type 1 grows: integration toward Type 7, releasing the inner critic, and discovering joy without abandoning standards. Grounded in Riso-Hudson and Naranjo.`,
  openGraph: {
    title: `Enneagram Type 1 Growth — How the ${typeName} Develops`,
    description: `The Type 1's path of growth moves toward Type 7 — genuine lightness, play, and the discovery that joy and integrity are not in conflict.`,
    url: "https://thyself.app/enneagram/type-1/growth",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-1/growth" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 1 Growth — How the ${typeName} Develops`,
  description: `The path of growth for Type 1s: integration toward Type 7, releasing the inner critic, and discovering that joy and integrity coexist.`,
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-1/growth",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-1/growth" },
};

export default function Type1GrowthPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                {typeNum}
              </span>
              <p className="text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 1</p>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Type {typeNum} Growth</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Growth for the {typeName} is not about lowering standards or pretending the world is fine as it is. It is about reclaiming the energy locked inside the inner critic and redirecting it toward genuine engagement with life. The integrated One discovers that joy and integrity were never in conflict.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Growth Direction</h2>
            <p className="leading-relaxed text-gray-700">
              The {typeName}&apos;s growth is toward genuine lightness — not the abandonment of standards, but the discovery that joy and integrity are not in conflict. The integrated One begins to relax their grip on how things should be and discovers that the world remains intact even when it is imperfect. They access spontaneity, play, and the genuine pleasure of experience without the inner critic narrating everything.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              In Enneagram theory, this movement is called integration — and for Type 1, it points toward{" "}
              <Link href={`/enneagram/type-${integrationNum}`} className="font-medium underline" style={{ color: integrationColor }}>
                Type {integrationNum}, the {integrationName}
              </Link>
              . This does not mean Ones become Sevens. It means they have access, in moments of health and security, to the Seven&apos;s genuine appetite for life — the openness, the spontaneity, the trust that good things are available without having to be earned through correction.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">What Growth Actually Means</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Practice gratitude for what is",
                  body: "Notice what is already working — in the day, in the relationship, in yourself — rather than cataloguing what falls short. The inner critic always finds something. Growth is choosing where to place attention.",
                },
                {
                  title: "Allow genuine rest",
                  body: "Rest as a right, not as a reward earned by completing the list. The list will never be done. Practicing rest before it is deserved retrains the nervous system that worth is not contingent on output.",
                },
                {
                  title: "Choose curiosity over correction",
                  body: "When you catch yourself correcting internally — a person, a situation, yourself — pause and ask what you are curious about instead. Curiosity opens the same data the critic was working with, but the relationship to it changes.",
                },
                {
                  title: "Let small things be imperfect",
                  body: "The unwashed dish, the uncrossed t, the slightly off email. Practice noticing the urge to address it and choosing not to. Each small surrender weakens the compulsion and proves the world holds.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border-l-4 bg-gray-50 p-5" style={{ borderLeftColor: color }}>
                  <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">What Growth Doesn&apos;t Mean</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border-2 p-5" style={{ borderColor: color }}>
                <h3 className="mb-2 font-semibold text-gray-900">At their best</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  When aligned with their growth direction, Ones become genuinely joyful — they hold their values lightly enough to enjoy the life they are living, rather than only approving the life they have constructed. Their principled engagement with the world becomes generative rather than corrective.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-5">
                <h3 className="mb-2 font-semibold text-gray-900">A common misconception</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  Growth for a One does not mean lowering standards or becoming indifferent to quality. It means freeing the energy that has been locked in the inner critic and redirecting it toward genuine engagement with what is.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Continue Exploring Type {typeNum}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href={`/enneagram/type-${typeNum}`} className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400">
                <p className="font-medium text-gray-900">Type {typeNum} Overview</p>
                <p className="text-sm text-gray-600">Core motivations, fears, and patterns</p>
              </Link>
              <Link href={`/enneagram/type-${typeNum}/relationships`} className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400">
                <p className="font-medium text-gray-900">In Relationships</p>
                <p className="text-sm text-gray-600">How the {typeName} loves and is loved</p>
              </Link>
              <Link href={`/enneagram/type-${typeNum}/work`} className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400">
                <p className="font-medium text-gray-900">At Work</p>
                <p className="text-sm text-gray-600">Professional patterns and ideal environments</p>
              </Link>
              <Link href={`/enneagram/type-${typeNum}/famous`} className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-400">
                <p className="font-medium text-gray-900">Famous Examples</p>
                <p className="text-sm text-gray-600">Recognizable people who fit the pattern</p>
              </Link>
            </div>
          </section>

          <section className="rounded-2xl p-8 text-center text-white" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Not sure if you&apos;re a Type {typeNum}?</h2>
            <p className="mb-6 text-white/90">
              Take the Thyself Enneagram Assessment to find your type and start your growth path.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-full bg-white px-8 py-3 font-semibold transition hover:bg-white/90"
              style={{ color }}
            >
              Find My Type
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
