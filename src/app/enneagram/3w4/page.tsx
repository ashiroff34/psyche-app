import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 3;
const wingNum = 4;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 3w4 — The Professional: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 3w4 — 'The Professional.' How the Four wing shapes the Achiever: more image-conscious, inward, and concerned with authenticity and craft — success must feel genuinely theirs. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 3w4 — The Professional",
    description:
      "The 3w4 combines the Three's drive for achievement with the Four's concern for authentic self-expression. More inward, self-aware, and quality-conscious than the 3w2 — success means nothing if it doesn't feel real.",
    url: "https://thyself.app/enneagram/3w4",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/3w4" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3w4 — The Professional: Traits, Growth & Identity",
  description: "How the Four wing shapes Enneagram Type 3: more inward, quality-conscious, and concerned with authenticity alongside achievement.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/3w4",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/3w4" },
};

export default function Page3w4() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>3</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>4</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Professional</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 3w4 pursues achievement with the Four&apos;s insistence on authenticity and quality alongside it. Success matters to the Professional — but it must be genuinely theirs, built from real craft and real effort, not merely the performance of success.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Four Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Four wing introduces self-awareness and concern for authenticity that complicates the Three&apos;s relationship with success. Where the pure Three or 3w2 can adapt their image fluidly to whatever the situation rewards, the 3w4 has a Four&apos;s sensitivity to inauthenticity. They notice when they are performing rather than being. They care whether their success feels genuinely earned and genuinely theirs. This creates a more complex interior life than the 3w2 typically has.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Four wing also brings depth and concern for quality. The 3w4 does not just want to win — they want to win with something real. Many are drawn to creative, intellectual, or craft-based fields where achievement requires genuine mastery rather than just effective self-promotion. They are often more patient with the process than the 3w2, because the Four wing cares about doing things well for its own sake.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Four wing also introduces a more melancholic dimension to the Three&apos;s otherwise forward-facing personality. The 3w4 can have periods of genuine self-doubt, introspection, and questioning of whether their achievements mean what they thought they would. This is uncomfortable for the Three in them — and deeply valuable for their development.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 3w4</h2>
            <div className="space-y-4">
              {[
                { title: "Quality-conscious", body: "The 3w4 cares about doing things well — not just successfully. The Four wing brings a standard of craft and authenticity that prevents the Three from cutting corners in ways that would undermine the work&apos;s integrity." },
                { title: "Image awareness with a Four&apos;s twist", body: "The 3w4 is aware of their image, but they also want that image to be an accurate representation of something real. Being seen as more successful than they actually are feels hollow. Being seen as less than what they have genuinely achieved also feels like a failure." },
                { title: "More inward than the 3w2", body: "The Four wing makes the 3w4 more self-reflective and less purely social. They need time alone, process experience deeply, and may be more reserved in large groups than the more extroverted 3w2." },
                { title: "Prone to self-comparison", body: "The Four wing introduces a tendency to compare themselves to others — not just in terms of achievement (which all Threes do) but in terms of authenticity, depth, and meaning. The 3w4 may feel they are not as genuinely deep as the Fours they know, or not as successfully effective as the Threes." },
                { title: "Drawn to craft and mastery", body: "More than other Three subtypes, the 3w4 values genuine expertise and mastery. They are likely to specialize, to develop real depth in their field, and to take their craft seriously as an end in itself rather than purely as a vehicle for recognition." },
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
                <p className="text-sm leading-relaxed text-gray-700">The 3w4 often produces genuinely excellent work — achievement that is backed by real craft and real depth. Their combination of Three&apos;s effectiveness and Four&apos;s insistence on quality means that when they succeed, they have usually built something worth being proud of.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 3w4 can get stuck between two incompatible needs — the Three&apos;s desire to be seen as successful and the Four&apos;s need to feel genuinely authentic. This tension can produce paralysis, perfectionism, or a chronic sense that their achievements do not mean what they hoped. Growth involves accepting that genuine success and genuine self-expression are not mutually exclusive.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/3w2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">3w2 — The Charmer</Link>
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
