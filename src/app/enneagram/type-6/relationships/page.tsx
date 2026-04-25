import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 6;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 6 in Relationships — The Loyalist as a Partner | Thyself",
  description:
    "How Enneagram Type 6 shows up in relationships: their fierce loyalty and testing behavior, the anxiety that drives ambivalence, and what they need to find real security in love. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 6 in Relationships — The Loyalist as a Partner",
    description:
      "The Type 6 is among the most devoted partners on the Enneagram — once they trust you. The challenge is earning and sustaining that trust through the anxiety and testing that precede it.",
    url: "https://thyself.app/enneagram/type-6/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-6/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 6 in Relationships — The Loyalist as a Partner",
  description:
    "How the Enneagram Type 6 shows up in relationships: fierce loyalty, testing patterns, anxiety dynamics, and what they need to find real security in love.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-6/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-6/relationships" },
};

export default function Type6Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 6</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Loyalist in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 6s are among the most genuinely loyal partners on the Enneagram — they will stay, they will show up, they will work hard at the relationship even when it is difficult. The challenge is the anxiety and ambivalence that can make the path to that loyalty complicated, and the testing behavior that precedes real trust.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 6 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 6s are extraordinarily reliable and devoted partners. When a Six commits, the commitment is real — not contingent on the relationship staying easy or comfortable, but genuine and sustained through difficulty. They bring a quality of steadiness and follow-through that their partners can genuinely count on. A Six who has chosen you has made a considered choice, and they will not abandon it at the first sign of trouble.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Six&apos;s practical intelligence is also a real asset. They are acutely aware of what could go wrong, and this awareness — which can be anxiety-producing when turned inward — makes them excellent planners, problem-anticipators, and collaborators when turned outward. They help the relationship navigate difficulty by thinking through contingencies that more optimistic types would overlook.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Sixes also bring warmth, humor, and a quality of genuine engagement with other people&apos;s reality that makes them deeply relatable. When they feel secure, they are fun, playful, and often very funny — a completely different person from the anxious, scanning Six of their less secure moments.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Consistency and reliability",
                  body: "Type 6s need a partner who does what they say, who is where they said they would be, who follows through consistently enough that the Six&apos;s nervous system can relax. Inconsistency — even well-intentioned, even explained — feeds the Six&apos;s anxiety and keeps them vigilant when they most want to trust.",
                },
                {
                  title: "Transparency",
                  body: "Sixes are highly attuned to hidden agendas, mixed signals, and inconsistency between what people say and what they do. They need a partner who is direct and honest — who does not manage information, does not soften things beyond recognition, and does not say what the Six wants to hear rather than what is true. Gentle honesty is far more reassuring than careful management.",
                },
                {
                  title: "Patience with their anxiety",
                  body: "The Six&apos;s anxiety is not a personal failing — it is a structural feature of how they orient to the world. A partner who treats the Six&apos;s worrying as excessive, irrational, or irritating will add shame to the anxiety rather than helping to quiet it. A partner who can receive the anxiety without trying to argue it away — who can say \"I hear that you&apos;re worried; let&apos;s think about this together\" — is offering the Six exactly what they need.",
                },
                {
                  title: "To trust without evidence",
                  body: "This is the Six&apos;s deepest developmental need: to learn that they can trust without certainty, that security comes from within rather than from external confirmation. A partner can support this by being consistently reliable, but they cannot provide it. The Six must develop it themselves.",
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Testing Pattern</h2>
            <p className="leading-relaxed text-gray-700">
              One of the Six&apos;s most characteristic relational patterns is testing — often without being fully conscious that they are doing it. The test might be a small provocation to see if the partner will stay. Or a challenge to the relationship that, if the partner responds with reassurance, the Six dismisses as too easy. Or a period of ambivalence and coolness designed to see whether the partner will pursue them when they pull back.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The painful paradox is that no test result is ever quite sufficient. The Six who is testing for reliability is operating from a premise that the partner is not reliable — so any evidence of reliability can be reframed as a performance, or as reliable-only-so-far, or as not-yet-tested-in-the-circumstances-that-really-matter. The anxiety generates the test; the test generates evidence; the evidence does not quite satisfy; the anxiety generates another test.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Partners who understand this pattern are in a better position to respond to it: not by passing the tests more convincingly, but by naming the pattern directly and compassionately, and by not taking the Six&apos;s ambivalence personally. The Six does not need their partner to be more reliable — they need to develop the capacity to recognize reliability when it is present.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 6 who has developed genuine inner security — who has found a center that holds even when the external world is uncertain — is among the most deeply trustworthy partners available. Their loyalty is real, their commitment is sustained, and their genuine care for the other person is not contingent on how the relationship is going. They stay.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Six&apos;s growth edge is learning that the security they are searching for outside cannot be found there. No amount of consistency from a partner will resolve the anxiety that lives inside the Six; that requires the Six&apos;s own work. Learning to trust their own perception, to recognize reliability when it is present, and to stay with uncertainty rather than managing it away — these are the movements that open the Six to the relationship they most want.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 6 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 6s often describe the experience of being fiercely loved — and occasionally baffled by the anxiety and ambivalence that surface alongside that love. The key is not to take the ambivalence personally, and not to interpret the testing as evidence that the Six does not love them. The testing is precisely because the Six cares so much — the stakes are high enough to worry about.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Loving a Six well requires a kind of unshakeable groundedness. The Six needs a partner who does not get destabilized by their anxious phases, who does not retaliate to the testing, and who continues to be present and reliable even when the Six is pushing to see whether they will leave. The partner who can hold steady without becoming rigid — warm and firm at the same time — gives the Six exactly the container they need.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Also essential: being honest rather than reassuring. A Six who senses they are being managed — told what they want to hear rather than what is true — will trust less, not more. Honest, transparent communication, even when it is uncomfortable, builds more real trust than careful emotional management.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/6w5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">6w5 — The Defender</Link>
              <Link href="/enneagram/6w7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">6w7 — The Buddy</Link>
              <Link href="/enneagram/subtypes/sp-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 6</Link>
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
