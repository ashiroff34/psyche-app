import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 6;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram 6 and 6 Compatibility — Two Loyalists in Relationship | Thyself",
  description:
    "How two Enneagram Type 6s work as a couple: mutual loyalty and shared security-building, the risk of anxiety amplification, and what two Loyalists need to find genuine trust rather than mutual vigilance. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 6 and 6 Compatibility — Two Loyalists",
    description:
      "Two Type 6s are profoundly loyal to each other — and face the challenge of a relationship where both are scanning for threats, both are anxious about security, and both need the other to be the certainty they cannot find within themselves.",
    url: "https://thyself.app/compatibility/enneagram-6/enneagram-6",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-6/enneagram-6" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 6 and 6 Compatibility — Two Loyalists in Relationship",
  description: "How two Enneagram Type 6s relate: mutual loyalty, anxiety amplification, testing patterns, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-6/enneagram-6",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-6/enneagram-6" },
};

export default function Compatibility6and6Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>6</span>
              <span className="text-2xl font-light opacity-60">+</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>6</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Two {typeName}s</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two Sixes create a partnership of extraordinary mutual loyalty — once trust is established. They understand each other&apos;s anxiety, they do not dismiss each other&apos;s concerns, and they build something together that has the quality of a genuine alliance. The challenge is that neither can provide the other with the inner security that the Six most needs, and a relationship between two anxious people can amplify rather than resolve the anxiety.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Sixes Attract</h2>
            <p className="leading-relaxed text-gray-700">
              Two Sixes are drawn together by the recognition of shared values — loyalty, reliability, genuine commitment — and by the experience of being with someone who takes the relationship&apos;s security as seriously as they do. For a type that is often hypervigilant to inconsistency and unreliability in partners, finding someone who is genuinely trustworthy — who does what they say, who shows up, who takes commitment seriously — is deeply stabilizing.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The shared humor also draws two Sixes together. Sixes, when they feel secure, are often genuinely funny — the anxiety that drives their vigilance also produces a sharp, self-aware humor about the absurdity of their own worrying. Two Sixes who recognize this in each other often experience a quality of playful, warm connection that is very real.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                { title: "Deep mutual loyalty", body: "Two Sixes, once they have genuinely established trust with each other, create a bond of loyalty that is nearly unshakeable. They are committed to the relationship and to each other in a way that produces real security over time. The trust, once built, becomes one of the most solid foundations available." },
                { title: "Shared preparedness and practical intelligence", body: "Both Sixes take the future seriously and both think about what could go wrong. This shared contingency orientation makes them excellent practical partners — they plan carefully, they anticipate problems, and they rarely get blindsided by things that a more optimistic couple would have missed." },
                { title: "Mutual validation of concerns", body: "Neither Six will dismiss the other&apos;s anxiety as excessive or irrational. Both understand from personal experience what it is to worry about something that has not happened yet — and to need that worry to be taken seriously rather than argued away. This validation is genuinely nourishing." },
                { title: "Warmth and genuine team orientation", body: "When two Sixes feel secure with each other, they are warm, funny, and genuinely good teammates. They support each other, they celebrate each other&apos;s successes, and they show up for each other in practical ways that produce a quality of daily partnership that is very real." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <div className="space-y-4">
              {[
                { title: "Mutual anxiety amplification", body: "Two anxious people can amplify each other&apos;s anxiety in ways that are difficult to interrupt. One Six voices a worry; the other takes it seriously and adds a related worry; the first Six&apos;s concern deepens. Without one partner who can provide genuine steadiness, the shared anxiety can spiral in ways that neither person is able to interrupt from within." },
                { title: "Testing from both sides simultaneously", body: "If both Sixes are in their testing pattern at the same time — each pushing to see whether the other will stay, each interpreting the other&apos;s testing as evidence of unreliability — the relationship can become very destabilizing. The tests are designed to reveal whether the partner is trustworthy; when both are testing, neither is passing, and both conclude that the relationship may not be safe." },
                { title: "Neither can provide the security the other needs", body: "The Six&apos;s search for external security is ultimately a search for something that no partner can provide. When both partners have the same need, neither is well-positioned to meet it. Two Sixes can create a relationship that is stable and trustworthy — and still find that the deeper anxiety persists, because it was never about the partner." },
                { title: "Catastrophizing in the face of real difficulties", body: "When the relationship faces a genuine challenge, both Sixes may amplify the threat — each worst-case scenario feeding the other&apos;s. The ability to say &quot;this is hard, but we can handle it&quot; requires at least one partner who can provide equanimity. When neither can, the difficulty can feel larger than it actually is." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Two Sixes who have each developed genuine inner security — who have done the work of finding their own ground rather than requiring the partner to provide it — create a relationship of extraordinary loyalty and practical partnership. Their commitment to each other is real and sustained, their preparedness is an asset, and the trust they have built is one of the most solid foundations available.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Both Sixes must develop the capacity to be a steady presence for each other — to provide the equanimity that neither naturally has by developing it internally. This requires each Six to do their own inner work rather than expecting the relationship to resolve their anxiety. When both make this commitment, the relationship transforms: instead of two people seeking security from each other, there are two people who have found enough security within themselves to genuinely offer it to each other.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Compatibility Pages</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/type-6/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 in Relationships</Link>
              <Link href="/compatibility/enneagram-5/enneagram-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">5 + 6 Compatibility</Link>
              <Link href="/compatibility/enneagram-6/enneagram-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">6 + 7 Compatibility</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Understand your type in relationship</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — discover what drives you and how you connect.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
