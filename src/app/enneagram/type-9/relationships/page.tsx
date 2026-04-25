import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 9;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 9 in Relationships — The Peacemaker as a Partner | Thyself",
  description:
    "How Enneagram Type 9 shows up in relationships: their gift for acceptance and harmony, the pattern of self-erasure and passive conflict, and what they need to show up as themselves. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 9 in Relationships — The Peacemaker as a Partner",
    description:
      "The Type 9 brings acceptance, calm, and a genuine gift for making people feel at home. The challenge is showing up as a full person — with preferences, needs, and the willingness to have a self that takes up space.",
    url: "https://thyself.app/enneagram/type-9/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-9/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 9 in Relationships — The Peacemaker as a Partner",
  description:
    "How the Enneagram Type 9 shows up in relationships: acceptance and harmony, self-erasure patterns, and what they need to show up as a full self.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-9/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-9/relationships" },
};

export default function Type9Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 9</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Peacemaker in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 9s are deeply accepting partners — warm, patient, and genuinely easy to be with. They create a quality of peace in their relationships that is rare and very nourishing. The challenge is that they can love their partners so fully that they disappear into that love, losing track of their own needs, preferences, and distinct presence in the relationship.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 9 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 9s are among the most accepting and genuinely peaceful partners on the Enneagram. They do not keep score, they do not bring agendas, and they have a genuine capacity to receive their partner exactly as they are without needing to change them. This unconditional quality of acceptance can be profoundly healing for partners who have spent their lives being managed, improved, or judged.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Nine&apos;s ability to see multiple perspectives — to genuinely understand and hold different points of view simultaneously — makes them skilled mediators in conflict and genuinely curious about their partner&apos;s experience. They do not fight to win; they fight, when they fight at all, to understand. This orientation toward understanding rather than victory can make the Nine&apos;s relationship one of the most genuinely equitable and mutually respectful on the Enneagram.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Nines also bring a quality of steadiness and groundedness that is deeply stabilizing. They do not create drama; they tend to absorb it. In a relationship, this means a baseline of calm that allows for genuine rest — the sense that being home is actually restorative.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "To be invited to show up",
                  body: "Nines often need explicit invitation before they will occupy space. They are accustomed to making room for others and can easily defer indefinitely if a partner never actively asks \"what do you want?\" and then waits — genuinely waits — for an answer. The partner who actively creates space for the Nine&apos;s preferences, feelings, and perspectives is giving them permission to exist as a full person in the relationship.",
                },
                {
                  title: "Low-conflict resolution",
                  body: "Nines can handle conflict when it is approached gently and directly. What they cannot easily handle is escalating, high-intensity confrontation — the kind that feels like an assault on the peace of the relationship rather than a navigation of an issue within it. A partner who can raise difficult things without flooding, without ultimatums, and with genuine openness to the Nine&apos;s perspective will find the Nine far more engaged than a partner who defaults to emotional intensity.",
                },
                {
                  title: "Recognition of their quieter contributions",
                  body: "Nines contribute in ways that are easy to overlook — the consistent presence, the patient listening, the maintenance of harmony, the small practical acts of care. These contributions often go unacknowledged because they do not call attention to themselves. Nines need their quieter contributions to be seen and appreciated specifically, rather than taken for granted as the background of the relationship.",
                },
                {
                  title: "Space to develop their own priorities",
                  body: "The Nine&apos;s most fundamental developmental need — and one of the most important things a partner can offer — is encouragement and genuine curiosity about what the Nine wants for themselves, independently of the relationship. The Nine who has a full life, clear priorities, and a sense of their own direction is a more present and satisfying partner than the Nine who has subsumed their agenda into someone else&apos;s.",
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Self-Erasure Pattern</h2>
            <p className="leading-relaxed text-gray-700">
              The Nine&apos;s most characteristic relational difficulty is self-erasure — the gradual, often unconscious loss of their own preferences, priorities, and distinct presence in the relationship. It begins subtly: the Nine defers on small decisions because it is easier. They go along with plans that are not quite what they would have chosen. They accommodate their partner&apos;s preferences without protest. None of this feels like a problem in the moment; it feels like being a good partner.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Over time, however, the self-erasure accumulates. The Nine who has been going along for months or years may find that they have lost track of what they actually want. They have merged so thoroughly with the relationship that they have difficulty experiencing themselves as a separate person with separate preferences. And beneath this, quiet resentment can begin to build — not the sharp resentment of a Type 1 or the dramatic resentment of a Type 4, but a slow, diffuse sense that something important has been given away.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Nine&apos;s growth in relationship involves developing what they call in Enneagram work the capacity to take up space. To say "I want this" rather than "whatever you want." To disagree directly rather than through passive resistance. To bring their full self into the relationship — opinions, preferences, needs, the whole of it — rather than the accommodating version that feels safer.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 9 who has developed genuine self-presence — who brings their full self into the relationship rather than disappearing into it — is one of the most accepting and deeply peaceful partners available. Their warmth, their patience, their genuine interest in the other person, their capacity for harmony without requiring sameness — these are extraordinary gifts to a relationship and to a life.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Nine&apos;s growth edge is learning that their presence — their distinct, opinionated, preference-having self — is not a disruption to the relationship&apos;s harmony but the very thing that makes genuine intimacy possible. You cannot love someone who has disappeared. Showing up as themselves is the Nine&apos;s most important contribution to the relationship, and their most challenging act of love.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 9 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 9s often describe a quality of ease and acceptance that is deeply restorative — the sense of being genuinely welcome, not managed, not judged, just received. It can also involve a gradual realization that the Nine is not quite there in the way the partner had assumed — that the ease has been partly accommodation, and that there is a whole person underneath it who has not yet shown up fully.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Loving a Nine well involves actively creating space for them to show up. This means asking and waiting — not filling in the silence with your own preferences when the Nine hesitates, but holding the question open: "No, really. What do you want?" It means treating the Nine&apos;s preferences, when they finally arrive, as important rather than negotiable. And it means noticing when the Nine has not shown up and gently saying so: "I want you here too. Not just your accommodation — you."
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              It also means being a partner who can handle the Nine&apos;s occasional stubbornness and passive resistance without treating these as character flaws. When the Nine becomes entrenched — refusing to move, not quite saying no but absolutely not moving — it is usually a sign that they have been accommodating past their limit. The partner who can receive this as information rather than defiance is much better positioned to actually work with it.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 — The Peacemaker</Link>
              <Link href="/enneagram/9w8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">9w8 — The Referee</Link>
              <Link href="/enneagram/9w1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">9w1 — The Dreamer</Link>
              <Link href="/enneagram/subtypes/sp-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 9</Link>
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
