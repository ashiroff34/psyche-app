import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 1;
const wingNum = 2;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 1w2 — The Advocate: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 1w2 — 'The Advocate.' How the Two wing shapes the Reformer: warmer, more interpersonally active, and motivated to improve the lives of people they care about. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 1w2 — The Advocate",
    description:
      "The 1w2 combines the One's ethical drive with the Two's warmth and interpersonal investment. More outwardly engaged and people-oriented than the 1w9 — someone who reforms the world by working directly with people.",
    url: "https://thyself.app/enneagram/1w2",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/1w2" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1w2 — The Advocate: Traits, Growth & Identity",
  description: "How the Two wing shapes Enneagram Type 1: warmer, more interpersonally active, and directly engaged with people in their mission to improve things.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/1w2",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/1w2" },
};

export default function Page1w2() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>1</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>2</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Advocate</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 1w2 brings the One&apos;s principled drive and high standards directly into relationship with people. Warmer and more interpersonally engaged than the 1w9, the Advocate wants to make things right — and they want to do it by working with and for the people around them.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Two Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Two wing gives the One&apos;s reforming impulse a human target. Where the 1w9 may focus on ideas, systems, or principles in the abstract, the 1w2 wants to directly improve the lives of people they care about. Their ethical conviction is not only expressed in how they do their work — it is expressed in their relationships, their caregiving, and their advocacy for others.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Two wing also introduces genuine warmth. The 1w2 is not the cold perfectionist that caricatures of the One sometimes suggest. They feel deeply, they care about the people in their lives, and they often give generously — time, counsel, practical help. The One&apos;s standards and the Two&apos;s relational orientation combine to produce someone who both holds high expectations and genuinely wants others to succeed within them.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Two wing can also introduce a subtle manipulation pattern that the 1w9 avoids: the 1w2 may give help as a way of creating relationship or obligation, not always consciously. Their advice can carry a pressure that comes from wanting the other person to actually improve — which can feel uncomfortably like control to the recipient, even when the intention is genuinely caring.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 1w2</h2>
            <div className="space-y-4">
              {[
                { title: "Actively engaged in improvement", body: "The 1w2 does not wait for the world to improve itself. They engage directly — teaching, mentoring, advocating, reforming. Their ethical impulse finds its expression through concrete work with people and systems." },
                { title: "Warm but firm", body: "The Two wing adds genuine warmth and care to the One&apos;s principled approach. The 1w2 can deliver hard feedback with real concern for the other person — they want things to be right and they want you to be okay. This combination can be remarkably effective in leadership and teaching roles." },
                { title: "Interpersonally invested", body: "Unlike the more withdrawn 1w9, the 1w2 wants to be in active relationship with the people they are working to help or improve. They build community around shared values and standards." },
                { title: "Risk of moralizing", body: "The combination of the One&apos;s conviction that there is a right way and the Two&apos;s desire to improve those they love can produce a tendency toward moralizing. The 1w2 may find it difficult to stay out of other people&apos;s choices when they believe those choices are wrong." },
                { title: "High personal standards for relationships", body: "The 1w2 holds their relationships to the same high standards they apply to everything else. They expect honesty, effort, and integrity from people they are close to — and they can be genuinely hurt when those standards are not met." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>Strength</p>
                <p className="text-sm leading-relaxed text-gray-700">The 1w2 is among the most genuinely effective advocates and reformers the Enneagram produces. Their combination of ethical conviction, interpersonal warmth, and relentless follow-through makes them formidable in service of causes and people they believe in.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 1w2&apos;s deepest challenge is distinguishing genuine service from control. The combination of the One&apos;s certainty about what is right and the Two&apos;s desire to improve people they care about can produce a well-intentioned but suffocating dynamic. Growth involves allowing others to be imperfect without needing to fix them.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 — The Reformer</Link>
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 — The Helper</Link>
              <Link href="/enneagram/1w9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">1w9 — The Idealist</Link>
            </div>
          </section>
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Discover your Enneagram type and wing</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment to find out where you actually land.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
