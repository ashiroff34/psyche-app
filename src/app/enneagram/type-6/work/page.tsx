import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 6;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 6 at Work — The Loyalist in the Workplace | Thyself",
  description:
    "How Enneagram Type 6 operates professionally: their commitment and contingency thinking, the pattern of anxiety and second-guessing, leadership style, and ideal work environments. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 6 at Work — The Loyalist in the Workplace",
    description:
      "The Type 6 is the most alert to risk of any Enneagram type — and the most reliable when they trust the system. Understanding their anxiety is the key to getting the best from them professionally.",
    url: "https://thyself.app/enneagram/type-6/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-6/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 6 at Work — The Loyalist in the Workplace",
  description: "How the Enneagram Type 6 operates professionally: commitment, contingency thinking, anxiety patterns, and ideal environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-6/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-6/work" },
};

export default function Type6Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 6</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Loyalist at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 6s are the people who will still be there when the project has run into difficulty, when the organization is under pressure, and when everyone else is looking for an exit. Their loyalty is deep and genuine — and their ability to anticipate problems, identify risks, and prepare for contingencies is one of the most practically valuable contributions in any professional environment.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 6 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              In professional environments, Type 6s are defined by their reliability and their alertness. They take their responsibilities seriously, they follow through on what they commit to, and they are highly attuned to the landscape of risk and danger that most people in an organization are simply not paying attention to. The Six is the person who asks "but what happens if this goes wrong?" — and whose question, while occasionally inconvenient, is often the most important one in the room.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              This combination of reliability and risk-awareness makes Sixes invaluable in roles that require both — project management, operations, legal and compliance, safety and quality assurance, military and law enforcement, emergency services, and any field where the consequences of overlooked risks are serious. The Six does not miss things. They have already thought through the failure mode that the rest of the team is assuming won&apos;t happen.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Six also brings a quality of team loyalty and organizational commitment that is difficult to replicate. They invest in the institutions they are part of, they defend the organization from threats, and they create a quality of trust and reliability in their teams that is the foundation of effective collaboration. They are not people who will throw their colleagues under the bus when things go wrong.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Exceptional risk identification", body: "The Six&apos;s hypervigilance — a liability in many personal contexts — becomes a genuine professional asset in risk management. They identify threats, anticipate failure modes, and build contingency plans with a thoroughness that more optimistic types cannot sustain. This makes them the person who saves the organization from disasters that never happened because the Six caught them first." },
                { title: "Deep organizational loyalty", body: "Sixes invest in the organizations and teams they belong to. They are committed to the institution&apos;s success, they defend it against external criticism, and they take the organization&apos;s problems personally in a way that drives sustained effort rather than detachment. This loyalty is one of the most practically valuable qualities in a professional context." },
                { title: "Struggle with authority ambivalence", body: "The Six has a complex relationship with authority: they want guidance from trustworthy leadership, but they are also alert to the possibility that authority will let them down. This can produce a pattern of alternating compliance and skepticism toward leaders and organizations — initially deferential, then questioning as trust develops, and highly loyal once earned." },
                { title: "Decisive under clear conditions, hesitant under ambiguity", body: "Sixes perform well when the situation is clear, the rules are established, and the authority structure is trustworthy. They struggle more with open-ended, ambiguous situations where there is no established playbook and the risk assessment is unclear. The uncertainty activates their anxiety in ways that can lead to second-guessing, over-preparation, and decision paralysis." },
                { title: "Strong collaborators and team builders", body: "Type 6s are excellent teammates. They share information, support their colleagues, and are genuinely invested in collective success rather than individual advancement. Teams with strong Sixes tend to have excellent internal communication and a culture of genuine mutual support — because the Six creates this naturally by modeling it." },
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
                  Type 6 leaders build teams through trust and transparency. They are highly protective of their people, share information openly, and create cultures of genuine mutual accountability. Their leadership can be cautious in ways that slow decision-making, but their teams consistently report feeling genuinely supported and informed. The Six leader&apos;s challenge is learning to act decisively with incomplete information — to move forward despite uncertainty rather than waiting for the certainty that may never come.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 6s thrive in environments with trustworthy leadership, clear expectations, and genuine institutional integrity. They need to feel that the organization has their back — that the commitments made to them will be honored, that the leadership can be trusted, and that their contributions are recognized and protected. They struggle in environments of high political unpredictability, frequent reorganization, and leadership that operates through hidden agendas.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 6s are drawn to roles where reliability and vigilance matter and where institutional membership provides a sense of security and shared mission: law enforcement, military, emergency services, legal and compliance, project management, operations, social work, union organizing, labor advocacy, risk management, accounting, and public service. Many Sixes are also found in advocacy work where their loyalty to a cause and their alertness to threat translate into sustained organizational commitment.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/type-6/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 in Relationships</Link>
              <Link href="/enneagram/6w5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">6w5 — The Defender</Link>
              <Link href="/enneagram/6w7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">6w7 — The Buddy</Link>
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
