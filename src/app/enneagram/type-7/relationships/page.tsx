import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 7 in Relationships — The Enthusiast as a Partner | Thyself",
  description:
    "How Enneagram Type 7 shows up in relationships: their gift for joy and possibility, the pattern of reframing and avoidance, and what they need to develop real depth and commitment. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 7 in Relationships — The Enthusiast as a Partner",
    description:
      "The Type 7 makes relationships feel alive and full of possibility. The challenge is staying present through the difficult stretches — when the excitement fades and the depth is required.",
    url: "https://thyself.app/enneagram/type-7/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-7/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 7 in Relationships — The Enthusiast as a Partner",
  description:
    "How the Enneagram Type 7 shows up in relationships: the gift for joy, avoidance patterns, and what they need to develop real depth and commitment.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-7/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-7/relationships" },
};

export default function Type7Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 7</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Enthusiast in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 7s make their relationships feel alive. They bring enthusiasm, warmth, spontaneity, and an infectious sense that this — right here — is worth being present for. The challenge is depth: the willingness to stay present through the painful, the boring, and the unresolvable, rather than moving toward the next thing that promises to feel better.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 7 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 7s are genuinely delightful partners — curious, generous, imaginative, and deeply committed to making their relationship an experience of aliveness rather than obligation. They create the conditions for joy. They resist the relationship becoming routine in ways that keep it interesting and enlivening. Their energy and their pleasure in living are contagious, and their partners often feel more alive in their presence.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Seven also brings a fundamental generosity of spirit. They are not naturally competitive with their partner, not interested in power dynamics, not in relationship to manage or control. They want a good time, they want connection, they want their partner to be happy — and they will work genuinely hard at producing these things.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Their optimism — even their tendency to reframe difficulty in more positive terms — can be a real asset in a relationship. The Seven who has developed genuine discernment can help their partner see past catastrophizing, reconnect with what is working, and maintain a forward orientation when the relationship is going through difficulty.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Freedom and adventure",
                  body: "Type 7s need a relationship that does not feel like a cage. They need room to pursue their interests, to explore, to try new things — ideally with their partner, but also independently. A partner who is threatened by the Seven&apos;s need for novelty and freedom will find that the Seven becomes increasingly restless and emotionally absent.",
                },
                {
                  title: "A partner who can match their energy",
                  body: "Sevens are energized by engagement, enthusiasm, and shared excitement. They do not do well with a partner who is consistently deflating — who responds to every idea with a problem, who drains the energy from a room rather than adding to it. They need a partner who can play, who can be excited, who brings something to the table rather than just responding to what the Seven brings.",
                },
                {
                  title: "Space to be positive",
                  body: "Sevens experience their optimism as genuine — it is not a performance, and it is not denial. They need a partner who does not pathologize their positive orientation, who does not insist that they must be suppressing something darker, who can receive the Seven&apos;s joy without suspicion. The Seven who is constantly told their happiness is a cover for pain will eventually find a partner who does not do that.",
                },
                {
                  title: "Permission to go deep",
                  body: "This may seem counterintuitive, but Sevens often need a partner who invites them to go deeper — who creates enough safety that the Seven can stop moving and actually feel what is underneath the activity. The partner who models emotional depth, who does not require the Seven to be entertaining, and who can be present with the Seven in their quieter, more vulnerable moments gives them access to themselves that they cannot easily reach alone.",
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Reframing and Avoidance Pattern</h2>
            <p className="leading-relaxed text-gray-700">
              The Seven&apos;s most characteristic relational difficulty is the avoidance of pain — not in the dramatic sense, but in the subtle, pervasive way that the Seven&apos;s attention consistently moves away from what is difficult toward what is more pleasant. When the relationship is in a hard stretch, the Seven&apos;s natural response is to reframe it — to find the positive angle, to remind everyone what is working, to suggest something new that might change the energy. This is not dishonest; it is how the Seven experiences the world.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The problem is that some things in a relationship require being sat with rather than reframed. Grief requires being grieved, not redirected. Conflict requires being worked through, not papered over with optimism. A partner who is hurting needs to be with someone who can stay in that hurt alongside them, not someone who is already looking for the lesson or the silver lining.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Seven&apos;s growth in relationship involves developing the capacity to be present with difficulty without immediately seeking the exit — to allow pain to be what it is, to stay in a hard conversation rather than lightening it too soon, and to discover that their relationship deepens precisely in the moments they most want to escape.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 7 who has developed genuine presence — who can stay through the difficult as well as the joyful, who has learned that depth does not threaten their aliveness but deepens it — is an extraordinary partner. Their capacity for joy becomes more authentic, their commitment becomes more real, and the relationship gains the stability that the Seven&apos;s energy alone cannot provide.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Seven&apos;s growth edge is learning that the sobriety they avoid — the willingness to stay with what is difficult, incomplete, and unresolvable — does not lead to the deprivation they fear. Real depth is found precisely in the moments the Seven most wants to escape. Staying for the difficult parts is how the relationship becomes the thing the Seven has always wanted it to be.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 7 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 7s often describe the experience as exhilarating and occasionally exhausting — the Seven brings so much energy, so many ideas, so much momentum, that simply keeping up can feel like a full-time project. The challenge is creating enough stillness that the relationship can be more than an ongoing adventure.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Loving a Seven well means not pathologizing their joy. It means creating space for the adventure alongside the depth, not instead of it. A partner who invites the Seven to slow down — to be present with what is actually here, rather than with what might be next — does so from a place of warmth and genuine interest rather than frustration or demand.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              It also means not abandoning the Seven when they are reframing something painful into something positive — but gently, without judgment, reflecting what you actually see: "I hear you finding the bright side. I wonder if we could just stay with the harder part for a minute." This kind of gentle groundedness gives the Seven something they cannot quite do for themselves: a reason to stay.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
              <Link href="/enneagram/7w6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">7w6 — The Entertainer</Link>
              <Link href="/enneagram/7w8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">7w8 — The Realist</Link>
              <Link href="/enneagram/subtypes/sp-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 7</Link>
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
