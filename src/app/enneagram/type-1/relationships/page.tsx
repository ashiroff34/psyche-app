import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 1 in Relationships — The Reformer as a Partner | Thyself",
  description:
    "How Enneagram Type 1 shows up in relationships: their need for integrity and shared values, patterns of criticism and resentment, and what they need to thrive in partnership. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 1 in Relationships — The Reformer as a Partner",
    description:
      "The Type 1 brings high standards, deep commitment, and a genuine desire to do right by their partner. Understanding their inner critic is the key to loving them well.",
    url: "https://thyself.app/enneagram/type-1/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-1/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 1 in Relationships — The Reformer as a Partner",
  description:
    "How the Enneagram Type 1 shows up in relationships: their need for integrity, patterns of criticism, and what they need to thrive as a partner.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-1/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-1/relationships" },
};

export default function Type1Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 1</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Reformer in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 1s are among the most devoted and conscientious partners on the Enneagram. They bring integrity, deep commitment, and a genuine desire to build something good together. The challenge is the inner critic — a voice that turns its standards not just inward but onto the relationship itself.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 1 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 1s are extraordinarily reliable partners. They mean what they say, follow through on what they promise, and take the relationship seriously in a way that their partners can genuinely count on. Their ethical clarity is not performative — it is a lived standard they hold themselves to first and foremost. They are honest, often to a fault, and their partners rarely have to guess where they stand.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Type 1s are also deeply principled in how they love. They want to be the best partner they can be, and they will work hard at the relationship rather than giving up when things get difficult. This commitment is one of their greatest strengths: a Type 1 who has chosen you has made a considered, serious choice, and they will not walk away easily.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Their attentiveness to what is right and fair means they are often the ones who notice when something has gone wrong — when a dynamic has become lopsided, when something important has been left unsaid, when the relationship has drifted from its values. They are natural advocates for the relationship&apos;s integrity.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared values",
                  body: "Type 1s need to feel that their partner is operating from the same basic ethical foundation. This does not mean identical beliefs — but it means agreement on what matters, on fairness, on honesty. A partner who dismisses their standards as excessive or uptight will quickly find themselves on the receiving end of the One&apos;s quiet withdrawal.",
                },
                {
                  title: "To be seen as good",
                  body: "Beneath the criticism and the standards, Type 1s carry a deep fear that they are not good enough — that their inner corruption or imperfection will be found out. In relationships, they need a partner who recognizes their effort and their genuine goodness, not just their failures. Criticism without acknowledgment lands very hard.",
                },
                {
                  title: "Space to relax",
                  body: "The One&apos;s inner critic never fully stops. In relationship, they need permission — unspoken or explicit — to stop being perfect. Partners who can introduce lightness, play, and genuine acceptance create conditions for the One to soften in ways they rarely allow themselves otherwise.",
                },
                {
                  title: "Reliability and fairness",
                  body: "Type 1s are quietly keeping score — not from pettiness, but because fairness matters to them at a structural level. They need a partner who pulls their weight, who does what they say, and who takes the relationship&apos;s responsibilities as seriously as they do.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Pattern of Criticism and Resentment</h2>
            <p className="leading-relaxed text-gray-700">
              The most common relational difficulty for Type 1s is the accumulation of quiet resentment that comes from holding themselves — and, unconsciously, their partners — to standards that cannot always be met. The One&apos;s anger is one of the most suppressed emotions on the Enneagram. They rarely express it directly; instead it emerges as an edge in their voice, an increase in correcting comments, a withdrawal of warmth, or the kind of sighing impatience that partners learn to recognize as a storm signal.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              This suppression happens because Type 1s believe that expressing anger is wrong — it is an indulgence, an imperfection. So the anger goes underground and accumulates. By the time it surfaces, it can feel disproportionate to the triggering event, because it is carrying everything that came before it. Partners who can gently create space for the One&apos;s frustration — who can say "you seem upset; tell me" rather than treating their irritation as a character flaw — help break this cycle.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The criticism is almost always more about the One&apos;s inner critic than it is about their partner. When a One points out what someone else did wrong, they are often unconsciously externalizing the voice that is already talking to them about themselves. Understanding this does not mean that partners need to accept being criticized — it means that addressing the pattern is more productive than defending against individual incidents.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 1 who has done their inner work is one of the most genuinely trustworthy partners on the Enneagram. Their commitment is real, their honesty is reliable, and their love is not a performance. They will do the difficult work of relationship repair, face hard conversations, and stay when others would leave. Their discernment — turned constructively — makes the relationship cleaner and more honest over time.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The One&apos;s growth edge in relationship is learning that love is not a project to be perfected. The relationship does not need to be optimized — it needs to be inhabited. Accepting imperfection in their partner (and in themselves) as the condition of real intimacy, rather than evidence of failure, is the work that opens the relationship to the depth the One most wants.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 1 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 1s often describe the experience of being deeply cared for — meticulously, thoughtfully — but sometimes feeling that the caring comes with invisible conditions. Learning to receive a One&apos;s love means recognizing that their attention to what needs to be done better is not a statement about your adequacy. It is their love language, expressed through their orientation toward improvement.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Loving a Type 1 well involves affirming their goodness directly. They need to hear — explicitly, regularly — that they are doing well, that they are enough, that their efforts are seen and valued. Generic praise lands weakly; specific acknowledgment of their integrity, their follow-through, their genuine care lands deeply. They need to be caught doing something right.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Creating moments of play and relaxation — where the standards are explicitly suspended — is also a gift. The One rarely gives themselves permission to drop the responsibility. A partner who can invite that, who makes it safe to be imperfect and still loved, helps them access the ease that is their deepest longing.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 — The Reformer</Link>
              <Link href="/enneagram/1w9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">1w9 — The Idealist</Link>
              <Link href="/enneagram/1w2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">1w2 — The Advocate</Link>
              <Link href="/enneagram/subtypes/sp-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 1</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find out your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — understand the patterns that shape how you love.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
