import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 7;
const wingNum = 8;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 7w8 — The Realist: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 7w8 — 'The Realist.' How the Eight wing shapes the Enthusiast: more assertive, direct, and results-oriented — enthusiasm backed by real force and a refusal to be constrained. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 7w8 — The Realist",
    description:
      "The 7w8 combines the Seven's appetite for experience and possibility with the Eight's strength and directness. More assertive and goal-oriented than the 7w6 — the Realist wants a big life and has the force to build one.",
    url: "https://thyself.app/enneagram/7w8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/7w8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 7w8 — The Realist: Traits, Growth & Identity",
  description: "How the Eight wing shapes Enneagram Type 7: more assertive, direct, and results-oriented in their pursuit of experience and possibility.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/7w8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/7w8" },
};

export default function Page7w8() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>7</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>8</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Realist</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 7w8 brings the Seven&apos;s appetite for experience and possibility together with the Eight&apos;s strength, directness, and refusal to be contained. More assertive and action-oriented than the 7w6, the Realist does not just imagine a big life — they build one, and they do so with considerable force.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Eight Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Eight wing gives the Seven&apos;s enthusiasm a harder edge and more decisive follow-through. Where the 7w6 might generate many ideas and rely on enthusiasm and social connection to move them forward, the 7w8 has the Eight&apos;s capacity for direct action and willingness to push through obstacles. They are not just excited about possibilities — they execute on them with force.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Eight wing also makes the 7w8 more comfortable with confrontation and power than the 7w6. They do not need everyone to be happy with their choices. They are more willing to be disliked in service of their goals, more willing to occupy space confidently, and more willing to assert themselves when something they want is being blocked. The Seven&apos;s natural charm and the Eight&apos;s natural authority combine into a particularly effective and sometimes formidable presence.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Eight wing also introduces a pragmatic, results-oriented quality to the Seven&apos;s idealism. The 7w8 does not just want the experience — they want it to produce something real. They tend to be more willing than the pure Seven to make hard choices, cut losses, and move on when something is not working.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 7w8</h2>
            <div className="space-y-4">
              {[
                { title: "Assertive and action-oriented", body: "The 7w8 does not wait for permission or consensus. They identify what they want and move toward it with the Eight&apos;s direct, no-nonsense energy. The Seven&apos;s optimism is backed by real force." },
                { title: "Risk-tolerant", body: "The combination of the Seven&apos;s appetite for experience and the Eight&apos;s refusal to be constrained by fear makes the 7w8 highly comfortable with risk. They tend to make bold moves and recover quickly from setbacks." },
                { title: "Direct and blunt", body: "The Eight wing removes much of the Seven&apos;s tendency to soften their message for social harmony. The 7w8 says what they think, sometimes more bluntly than they realize. They are not interested in elaborate social management." },
                { title: "Independent", body: "The 7w8 places a very high value on freedom — both the Seven&apos;s freedom from constraint and the Eight&apos;s autonomy from control. They resist being managed, directed, or told what to do in ways that feel limiting to their agenda." },
                { title: "Can overwhelm others", body: "The 7w8&apos;s combination of energy, directness, and force can be genuinely overwhelming — particularly in intimate relationships where the other person needs gentleness or patience. The 7w8 may not always recognize how much space they take up." },
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
                <p className="text-sm leading-relaxed text-gray-700">The 7w8 is often among the most effective and impactful of all the Seven subtypes. They combine vision and enthusiasm with the force and directness to actually build things. Entrepreneurial, bold, and resilient — they genuinely tend to create the big lives they envision.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 7w8&apos;s combination of the Seven&apos;s avoidance of pain and the Eight&apos;s armoring against vulnerability produces someone who can be very difficult to reach emotionally. They can move through life generating enormous impact while remaining largely untouched by the people in it. Growth involves slowing down enough to genuinely feel — including the difficult feelings the Seven most wants to escape.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
              <Link href="/enneagram/7w6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">7w6 — The Entertainer</Link>
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
