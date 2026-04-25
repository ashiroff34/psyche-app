import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 2;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 2 in Relationships — The Helper as a Partner | Thyself",
  description:
    "How Enneagram Type 2 shows up in relationships: their profound capacity for care, the pattern of giving that breeds resentment, and what they need to stop losing themselves in love. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 2 in Relationships — The Helper as a Partner",
    description:
      "The Type 2 loves generously and fiercely — and often loses track of their own needs in the process. Understanding their pattern of giving is essential to understanding how to love them back.",
    url: "https://thyself.app/enneagram/type-2/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-2/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 2 in Relationships — The Helper as a Partner",
  description:
    "How the Enneagram Type 2 shows up in relationships: their profound capacity for care, giving patterns, and what they need to avoid losing themselves in love.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-2/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-2/relationships" },
};

export default function Type2Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 2</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Helper in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 2s are among the most attuned and giving partners on the Enneagram. They notice what you need before you say it, show up when it matters, and love with a wholeness that few types can match. The hidden cost is a pattern of self-abandonment — giving so much that their own needs disappear, and then wondering why they feel so empty.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 2 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 2s are extraordinary partners — deeply attuned, emotionally generous, and genuinely invested in the other person&apos;s wellbeing. They remember the things that matter to you. They show up in practical ways when life gets hard. They create warmth and connection with an ease that is genuinely rare. Their emotional intelligence gives them access to layers of a relationship that other types simply do not perceive.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Two&apos;s capacity for care is not conditional on reciprocity — at least not consciously. They give because it feels right, because they genuinely want to, because love is the medium through which they experience themselves as real and worthy. This is both their great strength and their central vulnerability: their sense of self is so thoroughly tied to being loved and needed that it can collapse when those needs go unmet.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              In practical terms, the Two brings warmth, attentiveness, social connection, and a genuine desire to make the relationship work. They are often the emotional architects of their partnerships — the ones who remember the anniversary, track how the other person is doing, and initiate the difficult conversations about how the relationship is going.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "To feel loved for themselves",
                  body: "The Two&apos;s deepest fear is being unloved — not for what they do, but for who they are beneath the giving. They need a partner who actively, explicitly loves them back. Not just the caring, not just the helper — them, their needs, their interior life. Without this, the Two loses themselves in service to the other.",
                },
                {
                  title: "To have their needs recognized",
                  body: "Type 2s are extraordinarily skilled at attending to others&apos; needs and remarkably poor at naming their own. A partner who actively asks — \"what do you need?\" and then waits for a real answer — gives the Two something they rarely receive: permission to have needs at all. This is profoundly nourishing.",
                },
                {
                  title: "Appreciation and acknowledgment",
                  body: "The Two needs to know that their care is noticed and valued. They are not looking for excessive praise — they are looking for simple recognition: \"I see what you do, and it matters.\" A partner who takes their giving for granted will discover that the Two&apos;s warmth has quietly become something else.",
                },
                {
                  title: "Space to receive",
                  body: "Most Twos find it genuinely difficult to receive care gracefully. Being on the receiving end of love feels unfamiliar, even uncomfortable. A patient partner who continues to offer care without requiring the Two to immediately reciprocate creates space for the Two to learn what being loved actually feels like.",
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Giving-Resentment Cycle</h2>
            <p className="leading-relaxed text-gray-700">
              The Two&apos;s most characteristic relational pattern is what can be called the giving-resentment cycle. They give generously — often without being asked, often beyond what the other person needed or wanted — and then, unconsciously, wait for a return. When it does not come in the form they expected, resentment builds quietly. The Two rarely names this resentment directly; instead it emerges as hurt feelings, passive withdrawal, or the kind of emotional injury that seems disproportionate to what triggered it.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The deeper issue is that Twos are often giving from a place of unacknowledged need rather than from genuine abundance. The giving is not free — it carries an implicit expectation of love in return. This is not manipulation in the ordinary sense; it is an unconscious structure. The Two genuinely believes they are giving freely. The problem is that what they are actually giving is a bid for love, and when the love does not arrive in the right form, the bid feels rejected.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Breaking this cycle requires the Two to develop the capacity to name their needs directly — to say "I need this" rather than giving something in hopes that the other person will figure out what to give back. Partners can help by making space for this: asking, listening, and responding to the Two&apos;s real needs rather than just the needs the Two presents as the other person&apos;s.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 2 who has developed genuine self-regard — who has learned to receive as well as give, to name their own needs, to love from fullness rather than from hunger — is an extraordinary partner. Their attunement, their warmth, their capacity for real intimacy are among the deepest on the Enneagram. They see people in a way that makes those people feel genuinely known.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Two&apos;s growth edge in relationship is learning that love does not have to be earned through service. They are lovable as they are — not for what they do, not for how needed they make themselves, but for who they are beneath the giving. The deepest challenge is to stay in relationship as a whole person, rather than disappearing into the role of the one who takes care of everyone else.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 2 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 2s often feel extraordinarily cared for — sometimes uncomfortably so. The Two&apos;s attention can feel like sunshine: warm and enveloping and wonderful until it becomes too much, too focused, too needing-something-back. The partner&apos;s job is not to manage the Two&apos;s giving, but to actively participate in the relationship as a two-way system rather than a one-way service arrangement.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The most important thing a partner of a Two can do is make their love for the Two explicit, frequent, and unconditional. Twos need to hear it. They need to see it in action. And they need to feel that the love is for them — not for their giving, not for their helpfulness, not for how much they do — but for the person underneath all of that.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Also essential: noticing when the Two is giving from obligation rather than desire, and gently creating space for them to stop. A Two who feels permission to stop giving — who is loved when they are tired, when they have nothing to offer, when they need to receive — begins to discover what love actually feels like from the inside.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 — The Helper</Link>
              <Link href="/enneagram/2w1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">2w1 — The Servant</Link>
              <Link href="/enneagram/2w3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">2w3 — The Host</Link>
              <Link href="/enneagram/subtypes/sp-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 2</Link>
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
