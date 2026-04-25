import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 1 as a Parent — The Reformer's Parenting Style | Thyself",
  description:
    "How Enneagram Type 1 parents raise children: the strengths of principled, structured parenting, the challenge of the inner critic extended to the family, and what One parents need to grow.",
  openGraph: {
    title: "Enneagram Type 1 as a Parent",
    description: "The Type 1 parent brings high standards and genuine integrity to raising children — and must learn to let imperfection be part of the home.",
    url: "https://thyself.app/enneagram/type-1/parenting",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-1/parenting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 1 as a Parent — The Reformer's Parenting Style",
  description: "How Type 1 parents show up for their children: strengths, challenges, and what growth looks like.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-1/parenting",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-1/parenting" },
};

export default function Type1ParentingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum} — Parenting</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              The {typeName} as a Parent
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              The One parent is principled, consistent, and deeply invested in raising children of integrity. Their home has structure and standards. The challenge is ensuring those standards create safety rather than a second inner critic — giving children room to be imperfect without consequence.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The One Parent&apos;s Core Orientation</h2>
            <p className="leading-relaxed text-gray-700">
              The One parent takes the work of parenting seriously — perhaps more seriously than any other type. They bring the same principled commitment to raising children that they bring to everything else: it should be done properly, with care, and in accordance with what is right. This produces homes with genuine structure, clear values, and an environment where honesty and effort are genuinely rewarded.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The complexity for the One parent is that their inner critic does not stay internal. Children, who are naturally imperfect, provide an endless supply of material for correction — and the One&apos;s genuine care for their child&apos;s development can look, from the child&apos;s perspective, like relentless critique. The One must learn to hold the difference between helping a child grow and making them feel they are never quite enough.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Strengths</h2>
            <div className="space-y-4">
              {[
                { title: "Reliable structure and consistency", body: "One parents create homes where the rules are clear and consistently applied. Children know what is expected, what the consequences are, and that their parent&apos;s word can be trusted. This consistency is genuinely stabilizing — many children thrive within predictable structure." },
                { title: "Teaching by example", body: "The One parent lives what they preach. They model integrity, follow-through, and the willingness to do difficult things because they are right rather than because they are comfortable. This is among the most powerful forms of parenting." },
                { title: "High and genuine investment", body: "The One parent is engaged. They care about their child&apos;s education, their friendships, their character. They show up for the things that matter and take the responsibility of parenting seriously. Their children know they are not an afterthought." },
                { title: "Preparation for a complex world", body: "One parents teach children that quality matters, that effort counts, and that how you do something reflects who you are. Children raised this way often carry a baseline of seriousness and conscientiousness that serves them across many contexts." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parenting Challenges</h2>
            <div className="space-y-4">
              {[
                { title: "The inner critic externalizing", body: "The One&apos;s automatic noticing of imperfection, which is so relentless internally, can direct itself outward toward children. A correction offered ten times in a day, even when each one is individually reasonable, creates a cumulative experience for the child of never being quite right." },
                { title: "Difficulty with playful messiness", body: "Play is often messy, inefficient, and without discernible point. The One parent may struggle to fully enter the chaos of imaginative, unstructured play — or to tolerate it in the home without restructuring it into something more orderly." },
                { title: "Expectations that are too high for the age", body: "The One parent&apos;s standards are calibrated to adult judgment. Applied to children, they can be unrealistic. A four-year-old who cannot sit still at dinner is not failing — they are four. The One parent must constantly recalibrate what is actually appropriate to expect." },
                { title: "Forgiveness and repair", body: "The One can hold onto an incident — a lie, a failure of effort, a genuine wrong — longer than the situation requires. Children need to feel that mistakes are survivable and that the relationship is repaired after rupture. The One must actively practice letting things go." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth for the One Parent</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The One parent who has done their own work creates one of the most stable and trustworthy homes available. Their children grow up with a genuine internalized sense of integrity — not because they were criticized into it, but because they were shown what it looks like to live with values. They know their parent means what they say and loves them without condition.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core growth ask for the One parent is to love their child&apos;s imperfect, ordinary, messy self — not the potential they see in the child, not the adult they are trying to raise, but the child who exists right now, exactly as they are. This requires the One to extend to their child the grace they cannot yet extend to themselves.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 1</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 Overview</Link>
              <Link href="/enneagram/type-1/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 in Relationships</Link>
              <Link href="/enneagram/type-1/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 at Work</Link>
              <Link href="/enneagram/type-1/growth" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 Growth</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Know your type before you parent from it</h2>
            <p className="mb-6 text-base opacity-90">Understanding your Enneagram type is one of the most useful things a parent can do. Take the free Thyself assessment.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
