import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 9;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 9 at Work — The Peacemaker in the Workplace | Thyself",
  description:
    "How Enneagram Type 9 operates professionally: their gift for mediation and consensus, the pattern of inertia and conflict avoidance, leadership style, and where they thrive at work. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 9 at Work — The Peacemaker in the Workplace",
    description:
      "The Type 9 creates harmony and sees all sides. The professional challenge is claiming their own agenda — and doing the hard work of leadership that requires saying no, making calls, and having conflict.",
    url: "https://thyself.app/enneagram/type-9/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-9/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 9 at Work — The Peacemaker in the Workplace",
  description: "How the Enneagram Type 9 operates professionally: mediation gifts, inertia patterns, leadership style, and ideal environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-9/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-9/work" },
};

export default function Type9Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 9</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Peacemaker at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 9s bring something to professional environments that most types cannot easily produce: genuine harmony. They see all sides, they de-escalate conflict, they hold diverse perspectives without needing to win. The challenge is claiming enough of their own agenda to lead with genuine authority — rather than deferring to the consensus and calling it leadership.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 9 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              In professional environments, Type 9s are often the most trusted colleagues in the room — not because they are the most powerful or the most visible, but because everyone feels heard in their presence. Their capacity to genuinely hold multiple perspectives without collapsing into any of them makes them exceptional mediators, facilitators, and consensus-builders. In team environments, they are often the person who makes collaboration actually work rather than devolving into conflict or faction.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Nine also brings steadiness and groundedness to professional environments. They do not create drama. They do not escalate. They maintain a quality of calm even under pressure that can be enormously stabilizing for teams and organizations operating in difficult conditions. The Nine who has shown up in a crisis and simply held steady — not solved everything, but not panicked — has provided something that is very difficult to quantify and very easy to miss until it is absent.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The professional challenge is inertia — the Nine&apos;s tendency to stay with what is, to avoid the conflict that change requires, and to defer to the agenda of others rather than claiming and advancing their own. A Nine who has not done their inner work can become professionally passive — present, pleasant, reliable, but not actually driving anything forward. This pattern is particularly costly in leadership roles, where the Nine&apos;s consensus-orientation can read as absence of direction.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Exceptional mediator and facilitator", body: "The Nine&apos;s ability to hold multiple perspectives simultaneously — to genuinely see what is valid in competing positions without immediately collapsing into one — makes them among the most skilled facilitators and mediators available. They create the conditions for real dialogue because they are actually interested in everyone&apos;s perspective, not just their own." },
                { title: "Highly collaborative and team-oriented", body: "Nines work well with others. They do not compete for credit, they share information generously, and they are genuinely invested in the team&apos;s success rather than their own advancement. Teams with strong Nines tend to have better internal relationships and more genuine collaboration than teams without them." },
                { title: "Patient and non-reactive", body: "The Nine does not escalate. In high-pressure professional environments — tense negotiations, difficult client situations, organizational conflict — the Nine&apos;s ability to stay calm and non-reactive is a practical asset. They can hear difficult feedback, hold tense conversations, and respond rather than react in ways that more reactive types cannot sustain." },
                { title: "Inertia and procrastination", body: "The Nine&apos;s most characteristic professional liability is inertia. They can find themselves doing the comfortable and familiar rather than the necessary and difficult. Tasks that require confrontation, difficult decisions, or sustained effort in the face of resistance are ones the Nine tends to defer — sometimes indefinitely. This procrastination often has a passive quality: the Nine does not refuse, they simply do not quite start." },
                { title: "Struggle to assert and prioritize their own agenda", body: "Nines often lose their own agenda in the noise of everyone else&apos;s. They defer to what the group wants, they accommodate the priorities of colleagues and leadership, and they find it genuinely difficult to say \"no, my priorities take precedence here.\" This professional selflessness is admirable in moderation and costly in excess." },
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
                  Type 9 leaders create the most genuinely inclusive and psychologically safe team environments of any type. Their teams feel heard, they communicate openly, and they trust that their leader will not dismiss their concerns. The challenge is direction — the Nine who defers to consensus rather than setting direction can leave their team without a clear path, and their conflict avoidance can allow problems to persist long past the point where they should have been addressed. Growing as a leader means claiming the authority that comes with the role, even when it requires conflict.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 9s thrive in collaborative, low-conflict environments where their relational intelligence is valued and where the pace allows for thoughtful engagement rather than reactive decision-making. They struggle in environments of constant conflict, high pressure for decisive unilateral action, or cultures where winning and dominance are the primary professional values. Respect, genuine collaboration, clear but non-combative leadership, and meaningful work are the conditions under which the Nine does their best.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 9s are found across a wide range of professional fields, but tend toward roles where their capacity for harmony and their ability to hold multiple perspectives is directly useful: counseling and psychotherapy, mediation and conflict resolution, diplomatic and international relations work, human resources, organizational development, teaching, social work, nursing, religious ministry, and roles within nonprofits where mission-alignment and collaborative culture matter more than competitive performance.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 — The Peacemaker</Link>
              <Link href="/enneagram/type-9/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 in Relationships</Link>
              <Link href="/enneagram/9w8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">9w8 — The Referee</Link>
              <Link href="/enneagram/9w1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">9w1 — The Dreamer</Link>
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
