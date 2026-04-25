import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 8;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram 8 and 8 Compatibility — Two Challengers in Relationship | Thyself",
  description:
    "How two Enneagram Type 8s work as a couple: the intensity of power meeting power, the mutual respect that comes from genuine equality, and what two Challengers need to build depth rather than just force. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 8 and 8 Compatibility — Two Challengers",
    description:
      "Two Type 8s create the most intense same-type pairing on the Enneagram — total mutual respect, genuine equality, and the challenge of two people who are both armored against vulnerability.",
    url: "https://thyself.app/compatibility/enneagram-8/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-8/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 8 and 8 Compatibility — Two Challengers in Relationship",
  description: "How two Enneagram Type 8s relate: power dynamics, mutual respect, vulnerability armor, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-8/enneagram-8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-8/enneagram-8" },
};

export default function Compatibility8and8Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>8</span>
              <span className="text-2xl font-light opacity-60">+</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>8</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Two {typeName}s</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two Eights create the most intense same-type pairing on the Enneagram — a relationship of raw, genuine equality, where neither partner is managing the other&apos;s force because neither needs to. The mutual respect that emerges when two people recognize genuine strength in each other is real and sustaining. The challenge is that both are armored against vulnerability in the same way, and both are waiting to see whether it is safe to put the armor down.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Eights Attract</h2>
            <p className="leading-relaxed text-gray-700">
              Two Eights are drawn to each other by genuine recognition. The Eight spends much of their social life managing their force — calibrating it so it does not overwhelm, so others do not feel threatened, so the relationship can function without the Eight&apos;s full weight landing on it. With another Eight, this management is not required. The other Eight can take it. More than that — they respect it.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The directness is also a powerful draw. Both Eights say what they mean and mean what they say. There is no need to decode, no need to interpret politeness as concealment, no need to worry about whether the surface and the interior match. They are entirely what they appear to be. With each other, the relief of that directness is immediate and real.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                { title: "Total mutual respect", body: "Two Eights who have found each other and established genuine regard create a foundation of respect that is among the most solid available. Neither is managing the other, neither is deferring, and neither is performing. What is there between them is real — and real is what the Eight values most." },
                { title: "Genuine equality", body: "The Eight needs a partner who can hold their own. With another Eight, this is not a worry: both partners are fully capable, both occupy their own ground, and the relationship has a quality of genuine partnership between equals that the Eight finds profoundly satisfying. No one is pulling their punches, no one is smaller than they actually are." },
                { title: "Straightforward communication", body: "Two Eights deal with problems directly. There is no passive aggression, no escalation of small grievances into unexplained coldness, no waiting for the other to figure out what is wrong. If something needs to be said, one of them says it. The conflict may be intense, but it is honest — and honesty is something both Eights can work with." },
                { title: "Shared protectiveness", body: "Two Eights together protect their shared domain — family, close people, values, way of life — with an intensity that is formidable. They are a genuinely powerful team when they face external threats, and both feel the depth of the other&apos;s commitment to what they have built together." },
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
                { title: "Power struggle for control of the relationship", body: "When two Eights disagree about direction — whose vision for the shared life prevails, whose priorities take precedence — the conflict can become about power rather than about the issue itself. Both Eights are accustomed to having things their way. Neither has much experience with genuine equals who will not ultimately defer. Learning to share authority in a relationship rather than competing for it is the central practical challenge." },
                { title: "Both armored against vulnerability", body: "The Eight&apos;s armor against vulnerability is a response to early experiences that made softness dangerous. In a relationship with a partner who is less defended, the Eight may gradually lower the armor in response to the other&apos;s openness. With another Eight, both are waiting for the other to go first — and both have the same reasons not to. The intimacy the relationship could reach may be limited by the depth of two equivalent armors." },
                { title: "Conflicts that escalate to full intensity", body: "When two Eights fight, both bring their full force. Neither backs down easily, neither apologizes first, and neither is naturally inclined to de-escalate. The conflict can reach an intensity that is difficult to repair from — not because either Eight is actually threatening the relationship, but because the intensity of the fight can make that unclear to both parties in the moment." },
                { title: "Difficulty with sustained tenderness", body: "The Eight&apos;s softness is real and deep — but it is protected. In a relationship with another Eight, neither partner may feel consistently safe enough to sustain the tender register of the relationship over time. Both may pull back into their strength rather than maintaining the vulnerability that real intimacy requires." },
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
                  Two Eights who have each done the work of learning to be vulnerable — who have found in each other a safe enough place to put down the armor — create one of the most remarkable relationships available. Their love has a quality of total commitment, genuine equality, and fierce mutual protection that is essentially unshakeable. They are real partners in the deepest sense — both fully present, both fully invested, both fully themselves.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  One Eight must go first. The Eight who takes the risk of showing their softness — who allows the armor to come down in the presence of someone who has never seen them without it — is making the bravest possible gesture toward the relationship. When that Eight sees that the other responds with care rather than exploitation, the door opens. The relationship becomes something neither Eight has ever experienced: a place where full strength and full vulnerability can coexist.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Compatibility Pages</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
              <Link href="/enneagram/type-8/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 in Relationships</Link>
              <Link href="/compatibility/enneagram-7/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">7 + 8 Compatibility</Link>
              <Link href="/compatibility/enneagram-8/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">8 + 9 Compatibility</Link>
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
