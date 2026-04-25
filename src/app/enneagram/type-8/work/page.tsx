import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 8;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 8 at Work — The Challenger in the Workplace | Thyself",
  description:
    "How Enneagram Type 8 operates professionally: their force and decisive leadership, the pattern of dominating and controlling, and what environments bring out their best. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 8 at Work — The Challenger in the Workplace",
    description:
      "The Type 8 builds things, moves organizations, and takes the ground no one else would claim. The professional challenge is the difference between leading and dominating — and knowing when to stop.",
    url: "https://thyself.app/enneagram/type-8/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-8/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 8 at Work — The Challenger in the Workplace",
  description: "How the Enneagram Type 8 operates professionally: force, decisive leadership, control patterns, and ideal environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-8/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-8/work" },
};

export default function Type8Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 8</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Challenger at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 8s are builders, movers, and decision-makers. They take occupying space seriously — in meetings, in organizations, in the direction of a project or company. Their professional impact is large, sometimes disproportionately so, and the question is whether that impact is being deployed in service of genuine purpose or in service of the Eight&apos;s need to be in control.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 8 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              In professional environments, Type 8s are forces of nature. They make decisions quickly, they take action where others deliberate, and they are willing to claim territory and responsibility that more cautious types leave unclaimed. Organizations that are stuck — that need someone to make a call, to push through resistance, to take on the difficult situation that no one else wants — often discover that their Eight is the person who moves first.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Eight&apos;s directness is a significant professional asset. They say what they think, they do not waste time on political maneuvering, and they deal with problems directly rather than letting them fester. Colleagues who learn to receive the Eight&apos;s bluntness as honest engagement rather than aggression often find them among the most reliable and useful partners they have.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The professional challenge is the Eight&apos;s relationship to power and control. They have a strong impulse to be in charge — not because they are particularly interested in status, but because being in control means they cannot be hurt or betrayed by someone else&apos;s decisions. This impulse, when not conscious, can make the Eight an extraordinarily difficult person to work with: dominating meetings, overriding others&apos; input, and treating collaborative processes as obstacles to the decisions they have already made.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Decisive under pressure", body: "The Eight makes decisions when others freeze. In genuine crises — organizational, market, operational — the Eight&apos;s ability to absorb the situation and act decisively is one of the most valuable professional qualities available. They do not need certainty to move; they move and adjust as the situation develops." },
                { title: "High impact and strong presence", body: "Type 8s take up professional space with an authority that is difficult to ignore. Their opinions carry weight, their direction gets followed, and their endorsement or opposition of a project changes the trajectory of the conversation. This presence is valuable when deployed constructively and problematic when used to suppress input the Eight does not want to hear." },
                { title: "Champion of the underdog", body: "Eights are often fierce advocates for people they perceive as being treated unjustly — particularly those without power in the organizational hierarchy. They will intervene on behalf of someone being mistreated in ways that many managers will not. This protective instinct can make them genuinely beloved leaders, particularly by those who have experienced their protection firsthand." },
                { title: "Low tolerance for bureaucracy and process", body: "Eights find organizational processes that slow decision-making genuinely frustrating. They want to act, and anything between them and action feels like an obstacle. This can make them effective change agents in bureaucratic organizations — and disruptive forces in organizations that need careful process for legitimate reasons." },
                { title: "Struggle with vulnerability and asking for help", body: "The Eight&apos;s professional self-sufficiency can lead to professional isolation. They do not ask for help easily, do not share uncertainty, and may not communicate to their teams when they need support. This can create the impression of invulnerability that prevents their teams from developing, since the Eight&apos;s implicit message is often that strength and solitude are the same thing." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Leadership Style and Work Environment</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>As a leader</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 8 leaders are impact leaders — they set direction, make things happen, and take responsibility for outcomes in a way that inspires confidence. Their teams know where they stand. The challenge is creating the conditions for their teams to function independently — to develop and grow rather than becoming dependent on the Eight&apos;s direction for every decision. An Eight who develops genuine respect for others&apos; authority and judgment builds something that will last beyond their tenure. One who does not builds something that collapses when they leave.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 8s thrive in environments where they have real authority and real stakes — where the decisions they make matter and where their force can translate into actual impact. They struggle in environments that are excessively hierarchical, politically constrained, or where their authority is nominal rather than real. Autonomy, genuine responsibility, the ability to move fast, and colleagues who can match their directness are the conditions under which the Eight is most effective.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 8s gravitate toward roles where authority and impact are real: executive leadership, entrepreneurship, law (particularly litigation), military and law enforcement leadership, politics, labor organizing, real estate and development, sports leadership, and any field where making things happen at scale is the primary deliverable. Many of the most transformative organizational leaders — the people who genuinely change institutions — are Eights who have learned to deploy their force in service of something beyond themselves.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
              <Link href="/enneagram/type-8/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 in Relationships</Link>
              <Link href="/enneagram/8w7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">8w7 — The Maverick</Link>
              <Link href="/enneagram/8w9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">8w9 — The Bear</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find out your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — understand what drives you at work and everywhere else.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
