import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 3;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Two Enneagram 3s in Relationship — The Performance Loop | Thyself",
  description:
    "What happens when two Achievers pair up. Mutual drive, image management, the relationship as project, and the difficult work of being seen rather than admired. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 3 + 3 Compatibility",
    description:
      "Two Achievers in relationship: shared ambition and momentum on one side, the risk of performing for each other rather than connecting on the other.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-3",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-3" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Two Enneagram 3s in Relationship — The Performance Loop",
  description:
    "How two Type 3 Achievers relate: attraction, synergies, tensions, growth edges, and what this same-type pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-3",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-3" },
};

export default function Compatibility3and3Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Same-Type Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: color }}>
                <p className="text-3xl font-bold">{typeNum}</p>
                <p className="text-sm opacity-90">{typeName}</p>
              </div>
              <span className="text-3xl font-light opacity-60">+</span>
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: color }}>
                <p className="text-3xl font-bold">{typeNum}</p>
                <p className="text-sm opacity-90">{typeName}</p>
              </div>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              Two Type 3s — The Performance Loop
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two people whose deepest fear is being unseen for what they actually are — paired with someone who has spent a lifetime perfecting the version of themselves that other people admire.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Type 3 at a Glance</h2>
            <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: color }}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 3 — The Achiever</p>
              <p className="leading-relaxed text-gray-700 text-sm">
                Threes are driven by a deep need to be valuable, to succeed, and to be admired. They are unusually adaptive — capable of reading what a context rewards and becoming the version of themselves that earns it. Their core fear is being worthless without their accomplishments. Underneath the polish lives a quieter question they rarely let themselves ask: who am I when no one is watching, when there is nothing to achieve, when the performance stops?
              </p>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Threes Attract</h2>
            <p className="leading-relaxed text-gray-700">
              When two Threes meet, the recognition is fast — and it is admiring. Each sees in the other someone competent, attractive, capable, going somewhere. Threes are drawn to the genuine winners of any room, and another Three often is one. The mutual approval is energizing in a way that few other pairings can match.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a relief in not having to translate. Most relationships ask the Three to slow down, to dial back the ambition, to be less focused on outcomes. With another Three, the drive is shared. They both want to optimize. They both like the win. They both organize their lives around moving forward, and neither asks the other to apologize for it.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              And there is the appeal of being on a winning team. Two Threes can build a life that looks unusually good from the outside — the careers, the home, the social standing, the children who do well. The relationship itself becomes part of the brand both partners are constructing. For a type that draws self-worth from external validation, this can feel like the pairing they have been working toward for years.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Mutual drive and ambition",
                  body: "Both partners are oriented toward growth, achievement, and forward motion. Neither needs to be coaxed into having goals or staying in motion. The relationship runs on shared momentum rather than one partner pulling the other along.",
                },
                {
                  title: "Admiration for each other&apos;s competence",
                  body: "Threes value capability, and they recognize it in another Three immediately. The mutual respect for each other&apos;s skill, work ethic, and effectiveness creates a baseline of esteem that few other pairings achieve so quickly.",
                },
                {
                  title: "Shared forward momentum",
                  body: "Two Threes can accomplish a remarkable amount together — building businesses, raising families, executing on long projects. They make each other more efficient and more ambitious, often producing more in their relationship than either would alone.",
                },
                {
                  title: "Aesthetic and presentational alignment",
                  body: "Both partners care about how things look, how they are presented, and how the life they are building reads to others. They rarely have to argue about the visible texture of the relationship — the home, the photos, the way they show up in public — because both bring the same standard to it.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core tensions */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              The 3+3 relationship&apos;s central risk is structural: the type whose primary defense is image is now paired with the type whose primary defense is image. Both partners are unusually skilled at presenting a polished version of themselves — including, often, to one another. The relationship can run on mutual admiration of the curated self while the actual self of each partner stays quietly out of view.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Competition rather than collaboration",
                  body: "Both partners are practiced at winning, and the unconscious habit can turn the relationship into a contest. Whose career is going better, whose body is in better shape, whose social capital is higher, whose contribution to the household is more impressive. The relationship becomes another arena rather than a refuge.",
                },
                {
                  title: "Image management that prevents real intimacy",
                  body: "Two Threes can spend years presenting their best selves to each other and never actually expose the messier, less impressive parts. Real intimacy requires the willingness to be unimpressive in front of someone — and that is precisely the thing both Threes spent their lives learning to avoid.",
                },
                {
                  title: "Neither willing to be vulnerable first",
                  body: "Vulnerability is a competitive disadvantage in the Three&apos;s internal logic. With another Three, both partners wait for the other to lower the guard first, and neither does. The relationship can stay locked at a polished surface for years.",
                },
                {
                  title: "The relationship as a project to optimize",
                  body: "Threes love a project, and they can turn the relationship into one. Date nights are scheduled and executed. Communication patterns are improved. Therapy is researched and selected. The activity is real and often valuable, but it can substitute for the harder thing: just being together without an agenda for improvement.",
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
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>Strength</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  When two Threes commit to slowing down enough to actually see each other rather than each other&apos;s performance, this pairing becomes a place of unusual mutual recognition. The same drive that fuels the achievement can fuel the inner work of becoming real with each other. Few partners can match a healthy Three&apos;s capacity to actually do the relational work once they decide it matters.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "#888" }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Both partners must risk being unimpressive — must let the other see the version of themselves that is not winning, not polished, not on. This is the central growth ask of the type, and it is doubled in this pairing. The relationship&apos;s deepest possibilities live on the other side of two people consenting, finally, to be ordinary together.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in Two Threes</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) shape how each Type 3 expresses in relationship. Same-type pairings amplify whatever variant each partner carries.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sp/3 + sp/3",
                  body: "Two self-preservation Threes (the &lsquo;security&rsquo; countertype, the most reserved and least overtly image-focused variant) build their lives around competence, hard work, and being good providers. The risk is a relationship organized entirely around productivity, with neither partner permitted to slow down or be inefficient.",
                },
                {
                  label: "sx/3 + sx/3",
                  body: "Two sexual Threes (the &lsquo;charisma&rsquo; subtype, the most attractive and seduction-focused variant) build a relationship around mutual desirability. The risk is constant performance for one another and difficulty being seen as anything other than the appealing version of self.",
                },
                {
                  label: "so/3 + so/3",
                  body: "Two social Threes (the &lsquo;prestige&rsquo; subtype, the most status-conscious and image-driven) build a life optimized for how it reads in public. They make a striking pair from the outside; the risk is that the relationship becomes another arena for status performance and never quite allows either partner to be off-stage.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{label}</p>
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
                When both Threes are doing their inner work — when each has begun the slow work of distinguishing the curated self from the actual self — the 3+3 pairing becomes a place of remarkable mutual recognition. Both have started to ask the underlying question: who am I when there is nothing to win? Both have started to let the other see them at less than their best. Both have discovered that being known is more nourishing than being admired, and that the partner who sees them off-stage is offering something the audience never could.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, two Threes build a life that looks impressive from the outside and is actually inhabited from the inside. The relationship becomes the place where both finally rest from the performance — not because they have stopped achieving, but because they have stopped needing the achievement to know they are loved.
              </p>
            </div>
          </section>

          {/* Practical growth tips */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for Two Threes</h2>
            <ul className="space-y-4">
              {[
                "Practice being together with no agenda — no project, no improvement, no shared goal. Build the muscle of being unproductive in each other&apos;s company.",
                "Take turns being the one who is unimpressive. Tell the other about a failure, an embarrassment, a part of yourself you rarely show. Let them practice loving the version of you that is not winning.",
                "Notice when competition has crept into the relationship — over careers, fitness, social standing, even therapy progress. Name it. The other Three is doing it too.",
                "Distinguish between dates that are content for the brand and dates that are actually for the two of you. Make sure the second category exists.",
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: color }}>{i + 1}</span>
                  <p className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: tip }} />
                </li>
              ))}
            </ul>
          </section>

          {/* Related types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 3</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/type-3/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 in Relationships</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-2/enneagram-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 3</Link>
              <Link href="/compatibility/enneagram-3/enneagram-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 + Type 4</Link>
              <Link href="/compatibility/enneagram-3/enneagram-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 + Type 6</Link>
              <Link href="/compatibility/enneagram-3/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 + Type 9</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Know your type before exploring compatibility</h2>
            <p className="mb-6 text-base opacity-90">
              Compatibility insights are most useful when both people know their actual type — not just their favorite number. Take the free Thyself Enneagram Assessment.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color }}
            >
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
