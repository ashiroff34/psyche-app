import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 1;
const wingNum = 9;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 1w9 — The Idealist: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 1w9 — 'The Idealist.' How the Nine wing shapes the Reformer: more withdrawn, philosophical, and visionary — with a quieter expression of the One's perfectionism and moral drive. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 1w9 — The Idealist",
    description:
      "The 1w9 combines the One's ethical drive and perfectionism with the Nine's calm, philosophical perspective. More inward and visionary than the 1w2, the Idealist holds high standards quietly rather than imposing them outwardly.",
    url: "https://thyself.app/enneagram/1w9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/1w9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1w9 — The Idealist: Traits, Growth & Identity",
  description: "How the Nine wing shapes Enneagram Type 1: more withdrawn, philosophical, and quietly principled.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/1w9",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/1w9" },
};

export default function Page1w9() {
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
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Idealist</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 1w9 holds the One&apos;s deep ethical conviction alongside the Nine&apos;s calm, philosophical perspective. More inward and visionary than the 1w2, this subtype holds high standards quietly, guided by an internal compass rather than external reform.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Nine Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Nine wing softens the One&apos;s edge. Where the 1w2 is more active in their attempts to improve situations and people around them, the 1w9 tends to lead by example and quiet presence. They have the One&apos;s standards and moral seriousness, but the Nine wing tempers the urgency — there is more patience, more willingness to let things unfold, more ability to hold their ideals without needing to immediately impose them on the world.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Nine wing also adds a more philosophical dimension. Many 1w9s are drawn to questions of ethics, meaning, and principle at the level of ideas, not just action. They think carefully about what is right before acting on it. They are often studious, systematic, and genuinely interested in understanding the foundations of their convictions rather than just holding them.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Nine wing can also help the 1w9 avoid the One&apos;s most acute trap: the relentless self-criticism. The Nine&apos;s intrinsic sense that things are fundamentally okay — or at least survivable — can give the 1w9 a slightly gentler relationship with their own imperfection than the 1w2 typically has.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 1w9</h2>
            <div className="space-y-4">
              {[
                { title: "Philosophically oriented", body: "The 1w9 often thinks deeply about ethical questions, principles, and ideals. They are interested in the why behind what is right, not just the what. Many are drawn to philosophy, theology, law, or other fields that involve systematic moral thinking." },
                { title: "Leads by example rather than correction", body: "Unlike the more outwardly reforming 1w2, the 1w9 tends to embody their ideals rather than pushing others toward them. They can be quietly inspiring without being preachy — their example does the work their words might not." },
                { title: "More withdrawn and introverted", body: "The Nine wing pulls the One&apos;s energy inward. The 1w9 may need significant solitude to process and maintain their inner equilibrium. They are not typically as socially active as the 1w2." },
                { title: "Conflict-avoidant despite strong standards", body: "The 1w9 can hold firm convictions while being quite uncomfortable with direct conflict. They may tolerate violations of their standards longer than the 1w2 before they address them — and when they do address them, it is often in a measured, calm way rather than a confrontational one." },
                { title: "Calm under pressure", body: "The Nine wing&apos;s steadiness combines with the One&apos;s discipline to produce someone who can maintain composure in difficult situations. The 1w9 tends not to panic or become reactive — they stay grounded and principled even when things are hard." },
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
                <p className="text-sm leading-relaxed text-gray-700">The 1w9&apos;s combination of principled conviction and genuine calm produces leaders, teachers, and thinkers who inspire without intimidating. Their integrity is visible and their wisdom is often hard-earned rather than performed.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 1w9 can become passive in the face of wrongs they care about — knowing what should be done without taking action, waiting for the right moment that never arrives. The Nine wing&apos;s tendency toward inertia can prevent the One&apos;s drive toward improvement from ever becoming concrete.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 — The Reformer</Link>
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 — The Peacemaker</Link>
              <Link href="/enneagram/1w2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">1w2 — The Advocate</Link>
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
