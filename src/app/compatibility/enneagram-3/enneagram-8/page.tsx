import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 3;
const typeB = 8;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 3 and 8 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 3 and 8 relationship. How the Achiever and the Challenger attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 3 and 8 Compatibility",
    description:
      "Two of the Enneagram's most driven and commanding types: one who achieves through image and strategy, one who achieves through direct power. Shared ambition, diverging methods.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3 and 8 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 3 and Type 8 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-8" },
};

export default function Compatibility3and8Page() {
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
              Type 3 and Type 8
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two of the Enneagram&apos;s most driven and self-assured types: one who leads through strategic image and polish, one who leads through direct power and intensity. When they align on a goal, they are a formidable force. When they diverge, the question of what authentic success actually looks like becomes the heart of the conflict.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 3 — The Achiever</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Threes are driven by a need to succeed and to be seen as successful. They read what each context values and adapt to deliver it, projecting competence and confidence as a primary mode of engagement. Their core fear is being worthless or without value. In relationship, they offer effectiveness, drive, and the social intelligence to open almost any door — but can struggle with authenticity, with separating their image from their actual identity, and with vulnerability.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 8 — The Challenger</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Eights are driven by a need for control, autonomy, and the freedom to act with full force. They engage the world directly and without apology, testing others for strength and respecting those who do not back down. Their core fear is being controlled or betrayed. In relationship, they offer fierce protection, honesty, and an intensity of commitment that leaves no doubt — but can dominate, bulldoze, and find it very difficult to access the vulnerability that intimacy requires.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 3–8 pairing begins with mutual recognition of strength. Both types are commanding presences — the Three through social effectiveness and polished delivery, the Eight through raw presence and direct power. Each recognizes in the other someone who can actually handle themselves, which is not something either type takes for granted.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three is drawn to the Eight&apos;s genuine power. The Three, who sometimes achieves through strategic management of appearances, finds the Eight&apos;s unmanaged directness simultaneously attractive and slightly alarming. Here is someone who gets results without worrying about how it looks. The Eight does not perform; the Eight simply acts. This no-filter quality appeals to a Three who is aware that they have spent significant energy managing impressions.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Eight is drawn to the Three&apos;s effectiveness and social intelligence. The Eight, who can be blunt to the point of social cost, sees in the Three someone who navigates the human landscape with unusual skill. The Three opens doors the Eight might break down; the Three reads rooms the Eight barely notices. For an Eight who values results, the Three&apos;s capacity to produce them through strategy is genuinely useful and worthy of respect. The Eight&apos;s integration direction toward Type 2 — toward care and warmth — also responds to something the Three offers: the Three&apos;s people-orientation is a window into the Eight&apos;s own growth.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared drive and ambition",
                  body: "Both types are genuinely motivated by achievement and impact. Neither coasts; neither settles for mediocrity in the domains they care about. Their shared ambition creates a relationship where both people are pulling hard in the same direction — and where both have genuine respect for the other's commitment to getting things done.",
                },
                {
                  title: "Complementary power styles",
                  body: "The Three exercises power through influence, positioning, and social effectiveness. The Eight exercises power through direct force, confrontation, and willingness to take up space. Together they cover the full range: the Three moves through doors the Eight might never find; the Eight moves through walls the Three might never challenge. As a team, they are rarely stopped.",
                },
                {
                  title: "Capacity for leadership",
                  body: "Both types naturally command rooms, mobilize people, and make decisions without excessive deliberation. They understand each other's leadership instinct — neither needs to explain to the other why stepping up matters, why letting a moment pass is a form of failure. The mutual recognition of leadership capacity creates genuine respect.",
                },
                {
                  title: "Eight's honesty opens the Three",
                  body: "The Eight is constitutionally incapable of the kind of impression management the Three practices. The Eight says what they see, without softening it for palatability. Over time, the Three who can receive the Eight's unfiltered perception — rather than deflecting or defending — gains access to a quality of honest feedback that is genuinely rare and that the Three privately needs to grow.",
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
              The 3–8 pairing&apos;s central challenge lives in the difference between the Three&apos;s image-management and the Eight&apos;s raw authenticity. The Three carefully constructs the story of their success; the Eight has no interest in the story and considerable interest in the reality.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Image vs. reality",
                  body: "The Three achieves through strategic narrative — they frame their successes and manage how their failures are perceived. The Eight is interested only in what is actually true and will say so directly, even when the Three has constructed a more favorable version. The Three experiences the Eight's bluntness as a threat to their carefully maintained narrative; the Eight experiences the Three's image management as a form of dishonesty that prevents real engagement.",
                },
                {
                  title: "Strategy vs. force",
                  body: "The Three's instinct is to find the path of least resistance — to read the situation, identify what is required, and produce it efficiently. The Eight's instinct is to apply direct force to whatever is in the way. These approaches can feel mutually alien: the Three's strategic patience looks to the Eight like excessive calculation; the Eight's confrontational directness looks to the Three like costly unnecessary conflict.",
                },
                {
                  title: "The Three's authenticity question",
                  body: "The Eight's core demand — conscious or not — is that the people they are close to be genuinely themselves rather than performing. The Three, whose entire adaptive strategy involves presenting the right version for the context, may find the Eight's implicit demand for authenticity either the most growth-inducing thing in their relationship or the most threatening. The Eight will not pretend not to see the gap between who the Three is and who they are presenting.",
                },
                {
                  title: "Vulnerability in two defended types",
                  body: "Both types have well-developed defenses against vulnerability. The Three avoids vulnerability by keeping things moving and presenting well. The Eight avoids vulnerability by leading with strength and testing others before showing any softness. Together, neither type's defense is naturally dismantled by the other. Without deliberate effort, the relationship can remain a partnership between two competent people who never fully let each other in.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Three</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Three&apos;s growth in this relationship involves letting the Eight&apos;s unfiltered perception reach them. The Eight cannot be managed; the Eight will see what is actually there. The Three who can drop the self-presentation in the Eight&apos;s presence — who can say &ldquo;I don&apos;t actually know&rdquo; or &ldquo;I was performing there and you&apos;re right&rdquo; — discovers that the Eight&apos;s respect deepens dramatically. The Three&apos;s integration toward Type 6 invites genuine loyalty and commitment: being faithful to the Eight not because it looks good but because the relationship is real. This requires the Three to know who they actually are beneath the image.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Eight</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Eight&apos;s growth involves recognizing that the Three&apos;s image management is not simply dishonesty — it is a highly developed form of social intelligence that the Eight genuinely lacks and needs. The Three navigates human dynamics with a skill the Eight respects in every other domain. The Eight who can see the Three&apos;s adaptability as expertise rather than inauthenticity gives the Three room to actually be strategic rather than defensive. The Eight&apos;s integration toward Type 2 also invites genuine care and warmth — and the Three, who is sensitive to how they are regarded, responds deeply when the Eight offers genuine appreciation rather than only respect.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 3–8 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/3 + sx/8",
                  body: "The sexual-instinct Three is fiercely image-focused and oriented toward being the most impressive person in the eyes of whoever matters to them. The sexual-instinct Eight is the most confrontationally intense and energetically alive of the Eight subtypes. Together this is a high-voltage combination — highly charged, potentially highly competitive, and the version of this pairing where both the attraction and the conflict are most acute.",
                },
                {
                  label: "sp/3 + sp/8",
                  body: "Both self-preservation subtypes are practical and security-oriented. The sp/3 is focused on building material security through success; the sp/8 is focused on controlling the resources and territory needed for self-sufficiency. This is a practical, effective pairing for building a shared life — both are capable, neither is passive. The risk is a relationship that is very functional and lacks genuine emotional depth.",
                },
                {
                  label: "so/3 + so/8",
                  body: "The social Three is status-oriented within the group and a natural community leader; the social Eight channels their power into protecting and leading the group. Together they can be a highly effective and commanding public presence. Both are invested in impact at a community level, and their complementary power styles — the Three's influence and the Eight's force — make them a natural leadership pair.",
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
                When the Three and Eight are both growing, this pairing becomes one of the most genuinely powerful and authentic combinations on the Enneagram. The Three has stopped performing for the Eight and started being real — has learned that the Eight&apos;s directness is not a threat to their image but an invitation to something deeper and more valuable than image. The Three who can be seen without a performance is, paradoxically, more impressive to the Eight than any carefully constructed narrative.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                The Eight has learned to offer genuine care alongside the directness — to protect and invest in the Three not only with power but with warmth, acknowledgment, and the explicit recognition that the Three deeply needs. At their best, they are a formidable pair who knows how to move in the world effectively and who has found, in each other, someone they do not need to perform for. The Three&apos;s strategic intelligence and the Eight&apos;s direct power, aimed together and grounded in genuine mutual respect, is a force that is difficult to match.
              </p>
            </div>
          </section>

          {/* Practical suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {[
                {
                  key: "eights-recognition",
                  tip: "Eights: practice offering explicit appreciation rather than only respect. The Three needs to hear 'what you did there was genuinely impressive' and 'I value you' — not because they are vain, but because recognition is the primary language through which they feel loved. Your appreciation means more than most because you so rarely offer it.",
                },
                {
                  key: "threes-authenticity",
                  tip: "Threes: practice being caught not knowing or not winning in front of the Eight. Vulnerability that the Eight witnesses without the Three managing it is the fastest path to the depth of connection this pairing is capable of. The Eight respects the person who can be real more than the person who is always impressive.",
                },
                {
                  key: "both-alignment",
                  tip: "Both: get aligned on shared goals before taking action. Both types are natural movers, but in different directions. A brief explicit conversation about what you are actually trying to accomplish together — before each person charges off in their preferred direction — prevents the energy expenditure of working at cross purposes.",
                },
                {
                  key: "both-vulnerability",
                  tip: "Both: build an explicit practice of vulnerability in private. Neither type accesses this naturally. Agree that once a week, each person shares one thing they are actually uncertain or afraid about — not as a performance of vulnerability, but as genuine contact. This is the practice that prevents the relationship from becoming a partnership between two impenetrable fortresses.",
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
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
            </div>
          </section>

          {/* More compatibility guides */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-2/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 8</Link>
              <Link href="/compatibility/enneagram-3/enneagram-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 + Type 6</Link>
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
