import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 9;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const integrationNum = 3;
const integrationName = TYPE_NAMES[integrationNum];
const integrationColor = TYPE_COLORS[integrationNum];

export const metadata: Metadata = {
  title: `Enneagram Type 9 Growth — How the ${typeName} Develops | Thyself`,
  description: `How Enneagram Type 9 grows: integration toward Type 3, developing self-assertion, and discovering that their presence and priorities matter. Grounded in Riso-Hudson and Naranjo.`,
  openGraph: {
    title: `Enneagram Type 9 Growth — How the ${typeName} Develops`,
    description: `The Type 9's path of growth moves toward Type 3 — self-assertion, embodied direction, and the willingness to take up space without apologizing.`,
    url: "https://thyself.app/enneagram/type-9/growth",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-9/growth" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 9 Growth — How the ${typeName} Develops`,
  description: `The path of growth for Type 9s: integration toward Type 3, developing self-assertion, and the willingness to be present.`,
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-9/growth",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-9/growth" },
};

export default function Type9GrowthPage() {
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
              <p className="text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 9</p>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Type {typeNum} Growth</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Growth for the {typeName} is not about becoming competitive or aggressive. It is about developing enough self-presence that their peace is chosen rather than defaulted into — and that their presence in the world begins to count.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Growth Direction</h2>
            <p className="leading-relaxed text-gray-700">
              The {typeName}&apos;s growth is toward self-assertion — developing the capacity to identify their own priorities, claim them openly, and pursue them with energy rather than accommodating them away. The integrated Nine discovers that their presence in the world — their actual preferences, desires, and direction — matters and is worth taking up space for.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              In Enneagram theory, this movement is called integration — and for Type 9, it points toward{" "}
              <Link href={`/enneagram/type-${integrationNum}`} className="font-medium underline" style={{ color: integrationColor }}>
                Type {integrationNum}, the {integrationName}
              </Link>
              . This does not mean Nines become Threes. It means they have access, in moments of health and security, to the Three&apos;s focused energy and willingness to act on their own behalf — the capacity to set a direction and move toward it.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">What Growth Actually Means</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Complete one personal thing daily",
                  body: "Finish one thing each day that is meaningful to you and not in service of anyone else&apos;s agenda. The act of completing your own thing — however small — is how the Nine builds the muscle of mattering to themselves.",
                },
                {
                  title: "Notice &ldquo;I don&apos;t mind&rdquo;",
                  body: "When you hear yourself say &ldquo;I don&apos;t mind&rdquo; or &ldquo;whatever you want,&rdquo; pause and ask if it is actually true. Often the Nine has not checked. Checking is the practice that recovers the preference that was about to be forfeited.",
                },
                {
                  title: "Bring disagreements into the open",
                  body: "When you disagree, say so directly rather than letting it convert into passive resistance. The Nine&apos;s anger does not disappear when buried; it leaks. Direct disagreement is the cleaner alternative.",
                },
                {
                  title: "Move your body",
                  body: "Exercise is often the Nine&apos;s first point of contact with their own energy and will. Walking, lifting, running, dancing — anything that puts you in contact with your aliveness rebuilds the connection between you and your own movement.",
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
                  Integrated Nines become a genuinely embodied presence in the world — they show up with direction, energy, and the willingness to occupy their own place without apologizing for it. Their peace becomes the peace of someone who is fully present, not absent.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 p-5">
                <h3 className="mb-2 font-semibold text-gray-900">A common misconception</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  Growth for a Nine does not mean becoming competitive or aggressive. It means developing enough self-presence that their peace is chosen rather than defaulted into.
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
