import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 3;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 3s — The Achiever in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 3: the Achiever's drive, image-consciousness, adaptability, and relentless pursuit of success visible in their work and lives.",
  openGraph: {
    title: "Famous Enneagram Type 3s — The Achiever",
    description:
      "Public figures who exemplify the Type 3 pattern: image-conscious, success-oriented, adaptable, and driven to excel and be seen excelling.",
    url: "https://thyself.app/enneagram/type-3/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-3/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 3s — The Achiever in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 3 and what their lives reveal about the Achiever pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-3/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-3/famous" },
};

const examples = [
  {
    name: "Oprah Winfrey",
    years: "b. 1954",
    body: "Oprah is one of the most-cited Type 3 examples in Enneagram literature, though some educators place her at Type 2. What makes the Three reading compelling is the scope and consistency of her achievement orientation — she has built and rebuilt her brand across decades, moving from talk show host to media mogul to wellness authority with each iteration calibrated for maximum impact. The ability to read what an audience needs and shape oneself to deliver it is a hallmark of the adaptive Three.",
  },
  {
    name: "Tom Cruise",
    years: "b. 1962",
    body: "Riso and Hudson cite Cruise as a Type 3 in their work. His career reflects the Three's orientation with unusual clarity: the relentless physical preparation for roles, the brand management, the image that has been carefully maintained across four decades, and the discomfort — visible in public moments — when his controlled presentation slips. The Three is not simply ambitious; they have merged their identity with their achievement so thoroughly that a setback to the career feels like a threat to the self.",
  },
  {
    name: "Muhammad Ali",
    years: "1942–2016",
    body: "Ali understood that in his era, a Black heavyweight champion needed more than skill — he needed a persona so compelling that it could not be ignored or diminished. He created that persona deliberately and inhabited it so fully that the line between performance and person eventually dissolved. 'I am the greatest' was not just boast; it was a Three's intuition that declaring a reality is part of creating it. His later activism demonstrates the Three's growth direction toward Six — moving beyond personal glory toward genuine solidarity.",
  },
  {
    name: "Madonna",
    years: "b. 1958",
    body: "Madonna's career is a masterclass in the Three's adaptive capacity. She has reinvented her image at least eight times across five decades, each reinvention timed precisely to the cultural moment, and each one adopted so completely that it is hard to see where strategy ends and authentic self begins. For the Three, this is not inauthenticity — it is the natural result of a self that is built from the outside in, from the image backward toward the interior.",
  },
];

export default function Type3FamousPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              Famous {typeName}s
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 3s in public life are recognizable by the quality of their self-presentation, the relentlessness of their drive, and the way success appears to fuel rather than satisfy them. They excel at reading what a moment requires and becoming it — which makes them compelling public figures and sometimes puzzling private people.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 3 pattern in public figures tends to show up as: an ability to adapt their presentation to what the moment demands; an achievement record that reflects not just talent but sustained, strategic effort; image-consciousness that is often invisible from the inside (Threes frequently believe they are being entirely authentic); and a relationship to success that looks from the outside like confidence and from the inside like a need that success cannot quite fill.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three&apos;s integration direction is toward Type 6 — at their best, they move away from individual achievement and toward genuine commitment to a group or cause. Their disintegration direction is toward Type 9 — under stress, the relentless drive can stall into a kind of numb flatness, a temporary inability to perform.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Cited Examples</h2>
            <div className="space-y-6">
              {examples.map(({ name, years, body }) => (
                <div key={name} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-baseline gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                    <span className="text-sm text-gray-400">{years}</span>
                  </div>
                  <p className="leading-relaxed text-gray-700 text-sm">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border-l-4 bg-gray-50 p-6" style={{ borderColor: color }}>
            <h2 className="mb-3 text-lg font-bold text-gray-900">A Note on Typing Public Figures</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 3 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 3</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 Overview</Link>
              <Link href="/enneagram/type-3/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 in Relationships</Link>
              <Link href="/enneagram/type-3/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 at Work</Link>
              <Link href="/enneagram/subtypes/sp-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 Subtypes</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find your own type</h2>
            <p className="mb-6 text-base opacity-90">Recognition through famous examples is a starting point. The Thyself assessment goes deeper — uncovering the motivational structure beneath the behavior.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
