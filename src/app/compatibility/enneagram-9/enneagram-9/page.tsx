import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 9;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram 9 and 9 Compatibility — Two Peacemakers in Relationship | Thyself",
  description:
    "How two Enneagram Type 9s work as a couple: the profound peace and acceptance of a low-conflict home, the risk of shared inertia, and what two Peacemakers need to build a life with genuine direction. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 9 and 9 Compatibility — Two Peacemakers",
    description:
      "Two Type 9s create the most peaceful partnership on the Enneagram — and must work against the comfortable drift that can leave them a wonderful couple who never quite decides anything.",
    url: "https://thyself.app/compatibility/enneagram-9/enneagram-9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-9/enneagram-9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 9 and 9 Compatibility — Two Peacemakers in Relationship",
  description: "How two Enneagram Type 9s relate: shared peace, inertia patterns, conflict avoidance, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-9/enneagram-9",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-9/enneagram-9" },
};

export default function Compatibility9and9Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>9</span>
              <span className="text-2xl font-light opacity-60">+</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Two {typeName}s</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two Nines create the most genuinely peaceful partnership on the Enneagram — a home of warmth, acceptance, and quiet. Neither partner creates drama, neither escalates, and neither makes the other feel judged or managed. The challenge is the drift: two people who are both oriented toward accommodation and both inclined to let things slide can find that the relationship is very comfortable and not quite going anywhere.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Nines Attract</h2>
            <p className="leading-relaxed text-gray-700">
              Two Nines are drawn together by the immediate ease of each other&apos;s company. For a type that is exquisitely sensitive to tension, judgment, and the feeling of being managed or pushed, finding a partner who simply accepts — who does not have a project for you, who does not need you to be different, who is genuinely easy to be with — is profoundly restoring.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The mutual recognition of the other&apos;s way of being is also significant. Two Nines understand each other&apos;s pace, their relationship to conflict, their need for a certain quality of quiet in ordinary life. There is no friction between their fundamental orientations, which makes the early stages of the relationship feel effortless.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                { title: "Profound mutual acceptance", body: "Two Nines bring an extraordinary quality of acceptance to each other. Neither is running a self-improvement project for the other. Neither is constantly noticing what could be different. They are genuinely received as they are — which for the Nine, who has so often been invisible or accommodating, is a profoundly nourishing experience." },
                { title: "Peace as a baseline", body: "The home of two Nines has a quality of genuine calm. There is no ambient tension, no waiting for the next conflict, no navigating the other&apos;s moods. The ordinary life of the relationship is genuinely restful — which is what both Nines most need from their most intimate relationship." },
                { title: "Low conflict and high cooperation", body: "When disagreements arise between two Nines, they tend to be navigated gently and resolved through genuine mutual accommodation. Neither Nine is invested in winning. Both are oriented toward the harmony of the relationship as a whole, which produces a quality of collaborative problem-solving that is genuinely pleasant to experience." },
                { title: "Shared values and easy lifestyle alignment", body: "Two Nines tend to want similar things from their shared life — comfort, connection, a certain quality of ease. They align naturally on the kind of life they are building, which removes the significant source of friction that comes from partners who want fundamentally different things." },
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
                { title: "The drift problem: no one sets direction", body: "The Nine&apos;s relationship to their own priorities is complex — they have them, but they often do not claim them, and they tend to accommodate the other&apos;s agenda at the expense of their own. In a relationship with a partner who is doing the same, neither is setting direction. The relationship may drift pleasantly for years without making the choices — about where to live, what to build, what to change — that give a life shape and meaning." },
                { title: "Conflict avoidance that allows real problems to persist", body: "Both Nines are disinclined to introduce conflict into the relationship, which means real problems go unaddressed. The leaky roof, the unmet need, the slowly growing resentment — these things that require a difficult conversation are consistently deferred. Over time, the comfort of the relationship can conceal a significant accumulation of things neither partner has said." },
                { title: "Two selves merging into one formless whole", body: "The Nine&apos;s tendency to merge with their environment — to lose their own priorities in the other&apos;s — can produce, in a two-Nine relationship, a blurring of both partners&apos; individuality. Who wants what? Whose preferences are actually being expressed? What does each person actually think, separately from the other? These questions can become genuinely difficult to answer." },
                { title: "Passive resistance as the only form of disagreement", body: "Neither Nine is likely to say directly &quot;I don&apos;t want to do that.&quot; Instead, the disagreement comes out as passive resistance — a subtle not-quite-moving, a slowness in execution, a forgetting. In a two-Nine relationship, both partners may be communicating their disagreement through passive resistance simultaneously, and neither one is sure what is actually happening." },
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
                  Two Nines who have each developed genuine self-presence — who each bring clear priorities, real opinions, and the willingness to take up space — create a relationship of rare depth and genuine warmth. Their peace is real rather than the absence of conflict. Their acceptance of each other is grounded in genuine knowledge of who the other person actually is. They make each other more fully themselves rather than less.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Both Nines must develop the practice of claiming their agenda and bringing it to the relationship — saying &quot;I want this&quot; rather than waiting to see what the other person wants and accommodating it. One Nine who has learned to do this gives the other explicit permission to do the same. When both show up as full people with real preferences, the relationship gains the direction and vitality it was missing — and the peace of it becomes more real, because it is the peace of two whole people, not the peace of two people who have accommodated themselves out of existence.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Compatibility Pages</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 — The Peacemaker</Link>
              <Link href="/enneagram/type-9/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 in Relationships</Link>
              <Link href="/compatibility/enneagram-8/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">8 + 9 Compatibility</Link>
              <Link href="/compatibility/enneagram-9/enneagram-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">9 + 1 Compatibility</Link>
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
