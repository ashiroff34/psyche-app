import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 4;
const wingNum = 3;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 4w3 — The Aristocrat: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 4w3 — 'The Aristocrat.' How the Three wing shapes the Individualist: more outward, image-aware, and achievement-oriented, while still driven by the search for authentic self-expression. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 4w3 — The Aristocrat",
    description:
      "The 4w3 combines the Four's longing for authentic identity with the Three's drive for recognition and success. More extroverted and achievement-oriented than the 4w5 — and more aware of how they appear to others.",
    url: "https://thyself.app/enneagram/4w3",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/4w3" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 4w3 — The Aristocrat: Traits, Growth & Identity",
  description:
    "How the Three wing shapes Enneagram Type 4: more extroverted, achievement-oriented, and image-aware, while still driven by authentic self-expression.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/4w3",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/4w3" },
};

export default function Page4w3() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>4</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>3</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              The Aristocrat
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 4w3 combines Type Four&apos;s search for an authentic, irreplaceable self with Type Three&apos;s drive for accomplishment and recognition. More extroverted and goal-oriented than the 4w5, the Aristocrat wants to be known — but insists on being known for something real.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* What the wing adds */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Three Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">
              The Three wing pulls the Four&apos;s inward focus outward. Where the 4w5 retreats into solitary depth, the 4w3 wants their inner world to have an audience. They are concerned not only with who they are, but with how that self registers — in their appearance, their creative output, their professional accomplishments, and their social presence.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              This wing creates a productive tension. The Four in them insists on authenticity: they are repelled by performance for its own sake and deeply uncomfortable with inauthenticity in themselves. The Three in them wants success, recognition, and the external markers of achievement. The result is someone who works hard to succeed — but who cannot sustain success that does not feel genuinely theirs. The 4w3 is often the artist who also manages their career, the writer who cares about their platform, the performer who needs both the stage and the private creative process that feeds it.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three wing also brings more energy and adaptability than the 4w5. The 4w3 can engage the social world more fluently, adjust their presentation to different contexts, and sustain effort toward external goals in a way the more withdrawn 4w5 typically cannot. They are still Fours — feeling is primary, longing is present, the sense of missing something essential never fully goes away — but they move through the world with more Three-like momentum.
            </p>
          </section>

          {/* Core traits */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 4w3</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Image-conscious without abandoning authenticity",
                  body: "The 4w3 cares deeply about how they appear — their aesthetic, their personal brand, the impression they make. But unlike a Three, they cannot fully commit to an image that does not feel true. This creates an ongoing internal negotiation between presentation and integrity.",
                },
                {
                  title: "Achievement-driven",
                  body: "The Three wing brings genuine ambition. Many 4w3s are highly productive and career-oriented — not because they are motivated by conventional success, but because creating and accomplishing things is one of the primary ways they prove to themselves (and the world) that they exist and matter.",
                },
                {
                  title: "Emotionally expressive",
                  body: "More extroverted than the 4w5, the 4w3 often shares their inner world through their work, their style, and their direct emotional communication. They are less likely to internalize silently and more likely to channel feeling into visible expression.",
                },
                {
                  title: "Competitive",
                  body: "The Three wing introduces a competitive streak that the pure Four rarely has. The 4w3 wants to be not just authentic, but distinctively, irreplaceably good at what they do. Being derivative, average, or easily replaced is a genuine source of distress.",
                },
                {
                  title: "Torn between depth and success",
                  body: "The central internal conflict of the 4w3 is the pull between the Four&apos;s desire for genuine depth and the Three&apos;s desire for recognition. Sometimes these feel compatible; sometimes the 4w3 finds themselves making compromises that leave a bad taste — taking the more commercially viable path when the more authentic one would have been less recognized.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Growth */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>Strength</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The 4w3 is often able to translate their deep inner world into tangible external achievement — art, writing, performance, or professional work that is both personally meaningful and publicly resonant. They have a gift for making their interiority legible to others without flattening it.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The 4w3&apos;s shadow involves the risk of performing authenticity rather than actually inhabiting it. When the Three wing is running the show, the 4w3 can become a highly polished presentation of sensitivity and depth that has lost genuine contact with the feelings underneath. This is a particular trap for 4w3s who have become professionally successful: the persona can eventually crowd out the person.
                </p>
              </div>
            </div>
          </section>

          {/* How to identify */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How to Identify a 4w3</h2>
            <p className="leading-relaxed text-gray-700">
              The 4w3 is often mistyped as a Three, particularly in professional settings where their ambition and presentation awareness dominate. The distinction is in the underlying motivation: the Three wants to be admired; the 4w3 wants to be known. The Three can more easily decouple their sense of self from their feelings; the 4w3 cannot. When the 4w3 is alone — when there is no audience — they are still deeply occupied with questions of identity, meaning, and authenticity. The Three at rest tends to feel empty; the 4w3 at rest feels full of something unresolved.
            </p>
          </section>

          {/* Navigation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/4w5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">4w5 — The Bohemian</Link>
              <Link href="/compatibility/enneagram-3/enneagram-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 + Type 4 Compatibility</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Discover your Enneagram type and wing</h2>
            <p className="mb-6 text-base opacity-90">
              Wing subtypes are most meaningful when you know your core type with confidence. Take the free Thyself Enneagram Assessment to find out where you actually land.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color }}
            >
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
