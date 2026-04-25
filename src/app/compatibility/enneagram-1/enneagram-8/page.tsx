import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 1;
const typeB = 8;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 1 and 8 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 1 and 8 relationship. How the Reformer and the Challenger attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 1 and 8 Compatibility",
    description:
      "Two of the Enneagram's most intense and conviction-driven types: one who controls anger through rigid principle, one who expresses it as direct power.",
    url: "https://thyself.app/compatibility/enneagram-1/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-1/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1 and 8 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 1 and Type 8 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-1/enneagram-8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-1/enneagram-8" },
};

export default function Compatibility1and8Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: colorA }}>
                <p className="text-3xl font-bold">{typeA}</p>
                <p className="text-sm opacity-90">{nameA}</p>
              </div>
              <span className="text-3xl font-light opacity-60">+</span>
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: colorB }}>
                <p className="text-3xl font-bold">{typeB}</p>
                <p className="text-sm opacity-90">{nameB}</p>
              </div>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              Type 1 and Type 8
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two of the Enneagram&apos;s most conviction-driven types: one who channels intensity into rigorous principle, one who expresses it as direct power. Both are strong, both are certain, both refuse to be pushed around. The question between them is whether their shared strength will be aimed at the same target — or at each other.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 1 — The Reformer</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Ones are driven by a need to be right, good, and consistent with their moral standard. They hold themselves to exacting internal criteria, guided by an inner critic that measures every action against an ideal. Their anger is present but controlled — expressed as cold judgment, resentment, or an edge of criticism rather than overt confrontation. Their core fear is being flawed or corrupt. They offer reliability and genuine ethical commitment; their shadow is rigidity and the difficulty of being wrong.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 8 — The Challenger</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Eights are driven by a need for control, self-reliance, and the freedom to act without constraint. They engage the world with intensity and directness, expressing their anger immediately and fully rather than suppressing it. Their core fear is being controlled, harmed, or betrayed. In relationship, they offer fierce protection, directness, and genuine loyalty to those who have earned their trust — but can dominate, intimidate, and struggle with the vulnerability required for real intimacy.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 1–8 pairing rests on a foundation of mutual strength. Both types are in or adjacent to the body triad — the gut types oriented toward anger, instinct, and action. The One is the gut type whose anger is controlled and redirected into principled reform; the Eight is the gut type whose anger is fully expressed as direct power. They are, in a sense, two versions of the same basic energy, pointing in different directions.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The One is drawn to the Eight&apos;s directness and strength of conviction. Here is someone who does not equivocate, who says what they mean, who is not intimidated by anything and uses their power in service of what they believe. The Eight&apos;s refusal to be pushed around resonates with the One&apos;s own commitment to standing for something real. The One sees in the Eight someone whose intensity is genuine — not performed.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Eight is drawn to the One&apos;s principled integrity and moral backbone. The Eight has no patience for people who lack conviction or who change their position to avoid confrontation. The One never does this. The One holds their standard regardless of pressure, regardless of cost, regardless of what the Eight thinks about it. For an Eight who tests everyone for weakness, the One who does not back down earns profound respect. The Eight&apos;s integration direction is toward Type 2 — toward care and heart — and the One&apos;s ethical orientation hints at that development.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared intensity and strength of conviction",
                  body: "Neither type is half-hearted. Both commit fully, hold their positions with genuine conviction, and refuse to be dislodged by social pressure. This shared intensity creates a relationship with unusual substance — neither person is going through the motions. When they are aligned, they are formidable; when they are in conflict, the conflict is real and worth having.",
                },
                {
                  title: "Mutual respect for people who don't back down",
                  body: "The Eight respects strength; the One respects principle. What they have in common is that both respect the person who holds their position under pressure. They each have this quality. The Eight does not intimidate the One into capitulation; the One does not moralize the Eight into compliance. Genuine mutual respect can develop from this shared refusal to fold.",
                },
                {
                  title: "Complementary integration directions",
                  body: "The One integrates toward Type 7 — toward lightness, joy, and freedom from self-criticism. The Eight integrates toward Type 2 — toward care, warmth, and genuine vulnerability. In each other, they can find someone who models part of their own growth path. The Eight&apos;s directness and lack of self-criticism shows the One something about freedom; the One&apos;s principled care shows the Eight something about the heart beneath power.",
                },
                {
                  title: "Capacity to handle honest conflict",
                  body: "Both types can have a real fight — a disagreement where both sides are fully represented, where no one is managing the other&apos;s feelings at the expense of truth. This is rarer in couples than it sounds. Many relationships are maintained by one person swallowing their honest reaction. The 1–8 pairing can actually say what is true, fight about it, and come to something genuine on the other side.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color: colorA }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core tensions */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              The 1–8 pairing&apos;s central challenge lives in the different ways both types handle anger and power. The One controls anger through reaction formation — it becomes principled correction, rigid standards, cold disapproval. The Eight expresses anger directly and immediately, without apology. These two styles collide.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Controlled anger vs. expressed anger",
                  body: "The One&apos;s anger is present but converted — it comes out as criticism, judgment, and the edge of moral superiority. The Eight&apos;s anger is immediate and direct. When the One disapproves, they get cold and correct; when the Eight disapproves, they say so loudly. The One finds the Eight&apos;s direct confrontation overwhelming and inappropriate; the Eight finds the One&apos;s cold judgment passive-aggressive and dishonest. Both are experiencing the other person&apos;s anger style as inferior to their own.",
                },
                {
                  title: "Principle vs. territory",
                  body: "The One wants to improve everything, including the Eight. The Eight wants to control their own territory and will fight anyone who tries to change them. The One&apos;s corrective impulse — however principled — registers to the Eight as an attempt to dominate and diminish them. The Eight&apos;s resistance — however principled about autonomy — registers to the One as a refusal to be accountable. Both feel the other is the problem.",
                },
                {
                  title: "Inner critic vs. self-satisfaction",
                  body: "The One carries relentless self-criticism and applies the same standard to those around them. The Eight is largely free of self-criticism — they act, accept the consequences, and move forward. The One finds the Eight&apos;s lack of self-scrutiny morally suspect; the Eight finds the One&apos;s constant self-correction exhausting and anxiety-producing. The One&apos;s inner critic is running all the time; the Eight has essentially no inner critic at all.",
                },
                {
                  title: "Two confrontational types in conflict",
                  body: "When this pairing is under stress, both types can escalate. The One becomes more critical, more rigid, more coldly judgmental. The Eight becomes more dominating, more directly aggressive, more insistent on having the last word. Neither backs down naturally. Conflicts can become pitched battles that are harmful rather than productive, and neither type easily makes the first move toward repair.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-900">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Growth edges */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth Edges</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorA }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the One</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The One&apos;s growth in this relationship involves recognizing that the Eight&apos;s directness is not an attack — it is the Eight&apos;s form of honesty. The Eight says what they mean; there is no hidden agenda in the confrontation. The One who can receive the Eight&apos;s directness without escalating into moral counter-attack — who can stay curious rather than immediately corrective — discovers that the Eight responds to honest engagement rather than principled instruction. The One also benefits from examining their own anger more honestly: the cold judgment is still anger, and naming it as such often lands better with the Eight than the moral framing does.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Eight</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Eight&apos;s growth involves recognizing that the One&apos;s principled standards are not an attempt to control — they are genuinely held convictions. The Eight who can distinguish the One&apos;s moral framework from an attack on their autonomy — who can hear &ldquo;I think that was wrong&rdquo; as a sincere statement rather than a power move — stops fighting a battle that does not need to be fought. The Eight&apos;s integration toward Type 2 invites them toward care and genuine warmth, which the principled One deeply needs to feel. The Eight who can offer this — not as weakness, but as the strength it actually is — changes the entire tenor of the relationship.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 1–8 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/1 + sx/8",
                  body: "This is the most intense version of the pairing. The sexual-instinct One is idealistic and focused on reforming the beloved; the sexual-instinct Eight is the most energetically alive and directly confrontational of the Eight subtypes. Together, this is a high-voltage combination — potentially very alive, potentially very explosive. Both types at maximum intensity in close range. The love and the conflict are both at their fullest.",
                },
                {
                  label: "sp/1 + sp/8",
                  body: "Both self-preservation subtypes are security-oriented and practical. The sp/1 is anxious about doing things correctly; the sp/8 is focused on material security and self-sufficiency. This can be a highly functional pairing in building a stable life — both are responsible and capable. The conflict, when it arises, tends to be about territory and control in the domestic domain rather than ideology.",
                },
                {
                  label: "so/1 + so/8",
                  body: "The social One is concerned with community standards and reform; the social Eight channels their power into leadership and community protection. This can be a powerful public pairing — two people who both show up, lead, and hold others accountable. The tension is between the One&apos;s orientation toward correct process and the Eight&apos;s orientation toward results regardless of process.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color: colorA }}>{label}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* At their best */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">At Their Best</h2>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="leading-relaxed text-gray-700">
                When the One and Eight are both growing, this pairing becomes one of the Enneagram&apos;s most powerful and genuinely principled combinations. The One has learned to express anger more directly — to say &ldquo;I am angry&rdquo; rather than converting it into cold moral judgment — which the Eight finds more honest and easier to actually respond to. The Eight has learned to offer genuine care and warmth alongside their directness — to protect and commit with the full force of their character, including its tender dimension.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, they are a formidable team: principled and powerful, honest and caring, capable of real conflict and real repair. The One&apos;s integrity grounds the Eight&apos;s power; the Eight&apos;s directness frees the One from the anxious moral control. Both become more whole. The relationship has the quality of two strong people who have chosen each other fully — not despite each other&apos;s intensity, but because of it.
              </p>
            </div>
          </section>

          {/* Practical suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {[
                {
                  key: "ones-anger",
                  tip: "Ones: practice saying 'I am angry about this' directly before the anger converts into moral critique. The Eight responds to honest emotional expression better than to principled correction — the former is an invitation to real engagement, the latter is a battle.",
                },
                {
                  key: "eights-care",
                  tip: "Eights: practice offering appreciation and care without prompting. The One needs to know that the Eight&apos;s respect includes genuine warmth — not just tolerance or protection, but acknowledgment. Small, direct acts of recognition go further with the One than the Eight might expect.",
                },
                {
                  key: "both-repair",
                  tip: "Both: develop an explicit repair protocol for after major conflicts. Neither type naturally makes the first move toward reconciliation. Agreeing in advance that after a certain cooling period one person will open the door — regardless of who is 'right' — prevents the relationship from stalling in mutual stubbornness.",
                },
                {
                  key: "both-alignment",
                  tip: "Both: identify where your convictions actually align and invest that shared energy into a common project. This pairing is most alive when both people are moving in the same direction — their combined intensity is a genuine force. The shared mission is what converts the potential conflict energy into something productive.",
                },
              ].map(({ key, tip }) => (
                <li key={key} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: colorA }}>•</span>
                  <p className="leading-relaxed text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Related types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore the Individual Types</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 — The Reformer</Link>
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
            </div>
          </section>

          {/* More compatibility guides */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-1/enneagram-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 + Type 7</Link>
              <Link href="/compatibility/enneagram-2/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 8</Link>
              <Link href="/compatibility/enneagram-8/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 + Type 9</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: colorA }}>
            <h2 className="mb-3 text-2xl font-bold">Know your type before exploring compatibility</h2>
            <p className="mb-6 text-base opacity-90">
              Compatibility insights are most useful when both people know their actual type — not just their favorite number. Take the free Thyself Enneagram Assessment.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color: colorA }}
            >
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
