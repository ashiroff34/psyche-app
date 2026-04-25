import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 4;
const wingNum = 5;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 4w5 — The Bohemian: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 4w5 — 'The Bohemian.' How the Five wing shapes the Individualist: deeper introversion, intellectual intensity, and the search for a self built from original thought and aesthetic vision. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 4w5 — The Bohemian",
    description:
      "The 4w5 combines the Four's longing for authentic self-expression with the Five's drive for knowledge and self-sufficiency. The result is one of the Enneagram's most inward, original, and intellectually intense subtypes.",
    url: "https://thyself.app/enneagram/4w5",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/4w5" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 4w5 — The Bohemian: Traits, Growth & Identity",
  description:
    "How the Five wing shapes Enneagram Type 4: deeper introversion, intellectual depth, and original aesthetic vision.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/4w5",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/4w5" },
};

export default function Page4w5() {
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
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>5</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              The Bohemian
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 4w5 combines Type Four&apos;s hunger for authentic self-expression with Type Five&apos;s drive for knowledge, self-sufficiency, and original thought. The result is one of the Enneagram&apos;s most inwardly rich, intellectually intense, and genuinely individualistic subtypes.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* What the wing adds */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Five Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">
              Where the 4w3 reaches outward for recognition, the 4w5 turns further inward. The Five wing amplifies the Four&apos;s natural withdrawal, adding a layer of intellectual self-sufficiency and a deep preference for solitude over performance. These individuals do not only feel deeply — they analyze, theorize, and attempt to construct meaning from their inner world with the rigor of a researcher.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Five wing brings a powerful need to understand: not just to feel, but to know why they feel it. The 4w5 may spend years developing a personal philosophy, an aesthetic system, or a creative language that is entirely their own — not borrowed, not performed, but built from original encounter with ideas and experience. They resist influence and imitation more intensely than other Four subtypes. To be derivative feels almost like a violation of self.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Five wing also tempers some of the Four&apos;s emotional volatility. Where a 4w3 might push their feelings outward through drama or aesthetic display, the 4w5 tends to internalize. The emotional experience is no less intense — it is simply contained, processed privately, and often sublimated into creative or intellectual output rather than expressed directly in relationship.
            </p>
          </section>

          {/* Core traits */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 4w5</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Deeply introverted",
                  body: "More withdrawn than any other Four subtype. The 4w5 may have a very small circle of genuine intimacy and a large reserve of private interior life that most people never access. They recharge alone and find sustained social interaction draining in a way that the Five wing amplifies significantly.",
                },
                {
                  title: "Intellectually serious",
                  body: "The Five wing brings a commitment to ideas, theory, and depth of knowledge. Many 4w5s develop areas of deep expertise — often in philosophy, art history, literature, psychology, or other domains that blend intellectual and aesthetic inquiry. They are not interested in shallow or performative knowledge.",
                },
                {
                  title: "Aesthetically original",
                  body: "The 4w5 does not want to create within established traditions — they want to build something that could only have come from them. Their creative output, whether visual, written, musical, or conceptual, tends to have an unmistakable personal signature. Originality is not a preference; it is a compulsion.",
                },
                {
                  title: "Self-sufficient in their interior world",
                  body: "Like Fives, the 4w5 develops an internal world that is rich enough to sustain them. They do not need constant external input or validation to know who they are. This is both a strength — genuine independence — and a potential isolation, as the inner world can become a substitute for the relational connection they actually long for.",
                },
                {
                  title: "Sensitive to intrusion",
                  body: "Both Type Four and Type Five place a high value on psychological privacy. The 4w5 can feel invaded by unwanted demands on their time, energy, or emotional availability. They may be slow to form close bonds and quick to withdraw if a relationship feels demanding or unsafe.",
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
                  The 4w5&apos;s integration of feeling and thought produces extraordinary creative and intellectual depth. These individuals often generate work that is both emotionally resonant and intellectually rigorous — a combination that is genuinely rare. Their independence from social approval means their vision is rarely compromised by the need to please.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The double-withdrawal pattern — Four&apos;s emotional withdrawal and Five&apos;s energetic withdrawal — can create profound isolation. The 4w5 may retreat so deeply into their interior world that genuine intimacy becomes increasingly difficult. The longing that defines Type Four never goes away; it simply goes unmet. Growth involves moving toward the world, not only the mind.
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="mb-2 font-semibold text-gray-900">Integration toward Type One</p>
              <p className="text-sm leading-relaxed text-gray-700">
                At their integration point (Type One), the 4w5 moves from self-absorbed withdrawal into principled, organized engagement with the world. The creative vision that has existed only internally finds structure and discipline. The self-understanding they have carefully built becomes something they can stand behind and act from — not just contemplate.
              </p>
            </div>
          </section>

          {/* How to identify */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How to Identify a 4w5</h2>
            <p className="leading-relaxed text-gray-700">
              The 4w5 is often mistaken for a Type Five, particularly in social settings where their reserve and intellectual orientation can look more like Five than Four. The distinction is in what motivates the inwardness: the Five withdraws to manage energy and build competence; the 4w5 withdraws to protect and cultivate a sense of irreplaceable self. The Four&apos;s core longing — to be known, to matter, to find what is uniquely theirs — is always present beneath the Five wing&apos;s intellectual surface.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              You will rarely encounter a 4w5 performing their inner life for an audience. They are not interested in being seen being sensitive — they are interested in actually being who they are, in private, and occasionally sharing that self with someone they trust. Their creativity tends to surface in written work, visual art, music, or philosophy — rarely in high-energy performance contexts.
            </p>
          </section>

          {/* Navigation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/4w3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">4w3 — The Aristocrat</Link>
              <Link href="/compatibility/enneagram-4/enneagram-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 5 Compatibility</Link>
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
