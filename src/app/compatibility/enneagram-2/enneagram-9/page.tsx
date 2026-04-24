import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 2;
const typeB = 9;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 2 and 9 Compatibility — The Helper & The Peacemaker | Thyself",
  description:
    "Explore the Enneagram Type 2 and Type 9 compatibility. Both types belong to the positive outlook triad — both redirect attention away from their own needs. Full analysis of their natural warmth, the codependency risk, and how this pairing grows.",
  openGraph: {
    title: "Enneagram 2 and 9 Compatibility — The Helper & The Peacemaker",
    description:
      "Type 2 gives love outward; Type 9 absorbs it inward. Both avoid acknowledging their own needs — a pairing of remarkable warmth and a quiet codependency risk.",
    url: "https://thyself.app/compatibility/enneagram-2/enneagram-9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-2/enneagram-9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2 and 9 Compatibility — The Helper & The Peacemaker",
  description:
    "A full analysis of the Enneagram Type 2 and Type 9 relationship: shared positive outlook stance, how they nourish each other, the codependency trap, and where both types grow.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-2/enneagram-9",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-2/enneagram-9" },
};

export default function Enneagram2and9Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>2</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 2 &amp; Type 9</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Both types belong to the positive outlook triad — both deflect attention from their own needs, both present a warm and agreeable face to the world. Together they create an extraordinarily nurturing environment. The risk: no one is getting their needs met.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 2</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Twos are driven by a need to be needed and to give love. They are warm, perceptive about others&rsquo; feelings, and often the first to offer support. Their core difficulty: they suppress their own needs and feel unworthy of receiving care without first earning it. Pride — the belief that they alone know what others need — is their passion.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 9</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Nines seek peace and avoid conflict by merging with others and going along. They are warm, accepting, and easy to be with. Their core difficulty: they lose themselves in others&rsquo; agendas and fail to act on their own. Sloth — a kind of spiritual inertia — keeps them from waking up to their own life.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Two and Nine share a warmth and relational ease that makes their initial connection feel effortless. Both types are oriented toward others — the Two actively moves toward, the Nine receives and merges — and this creates a feeling of mutual availability that is immediately comforting.</p>
            <p className="leading-relaxed text-gray-700">The Two is drawn to the Nine&rsquo;s unconditional acceptance. The Nine doesn&rsquo;t impose expectations or demands — a relief for a Two who often quietly resents the transactional quality of their own giving. The Nine, in turn, is drawn to the Two&rsquo;s attentiveness and warmth. Being seen and cared for by a Two feels like being truly held. Neither threatens the other. Both feel at home.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Warmth and Generosity", body: "Both types lead with care. Socially, this pairing radiates warmth — both are attuned to others&rsquo; comfort and skilled at creating welcoming environments. Friendships, gatherings, and family relationships all benefit from their shared instinct to put others at ease." },
                { title: "Positive Outlook Stance", body: "Both types reframe difficulties optimistically rather than confronting them directly. This shared stance means conflict rarely escalates — both prefer harmony and both are quick to soothe. In mild-stress situations, this smooths friction; in high-stress ones, it can prevent necessary reckoning." },
                { title: "Low-Conflict Baseline", body: "Neither type is naturally combative. They both prefer to absorb tension rather than escalate it. This creates a genuinely peaceful domestic environment where disagreements are rare and the emotional temperature stays moderate." },
                { title: "Emotional Attunement", body: "The Two&rsquo;s sensitivity to others&rsquo; emotional states pairs well with the Nine&rsquo;s capacity to merge and resonate. Both can read a room and respond to unspoken needs. Their home life tends to feel emotionally intelligent — people feel seen when they visit." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "The Codependency Trap", body: "Both types suppress their own needs and orient around others. In this pairing, each may be waiting for the other to voice a need first. Neither does. The Two gives without asking to receive; the Nine goes along without asserting what they want. Warmth runs high; actual self-disclosure runs low. The relationship can feel loving but curiously intimate-yet-distant." },
                { title: "Two&rsquo;s Hidden Resentment", body: "When the Two gives and gives without receiving, resentment eventually surfaces — often explosively, in ways the Nine finds frightening and confusing. The Nine&rsquo;s characteristic response to emotional volatility is to withdraw further. This withdrawal confirms the Two&rsquo;s fear of being unloved, escalating the cycle." },
                { title: "Merged Identity", body: "The Nine merges with whoever they love. In a Two-led relationship, the Nine may adopt the Two&rsquo;s priorities, social world, and emotional rhythms so fully that their own self becomes hard to find. Over time, the Two may discover they&rsquo;re in relationship with their own reflection — and lose respect for the Nine as a distinct other." },
                { title: "Avoidance of Real Conflict", body: "Both types avoid direct confrontation. Problems that need addressing — resentments, unmet needs, important decisions — get smoothed over or deferred indefinitely. Without a container for real conflict, the relationship can stagnate at a comfortable but shallow level of intimacy." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-red-100 bg-red-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth Edges</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 2 grows by</p>
                <ul className="space-y-3">
                  {["Articulating their own needs directly rather than waiting for the Nine to intuit them", "Allowing the Nine to give care in their own way rather than redirecting it", "Recognizing that the Nine&rsquo;s calm is love — not indifference", "Sitting with the discomfort of receiving without immediately deflecting or reciprocating"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 9 grows by</p>
                <ul className="space-y-3">
                  {["Voicing preferences and needs before the Two exhausts themselves trying to guess", "Staying present when the Two becomes emotionally intense rather than retreating into numbness", "Recognizing that their acceptance is a genuine contribution — not a passive absence", "Developing their own identity independent of the Two&rsquo;s agenda and social world"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <p className="mb-6 text-sm text-gray-500">The instinctual subtype significantly changes how this pairing experiences each other.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Self-Preservation", body: "SP 2 and SP 9 are both relatively contained and domestic. This can be a deeply comfortable pairing — quietly devoted, steady, and warm. The risk is over-focusing on comfort and practical care while emotional depth remains unexplored." },
                { label: "Social", body: "Social 2 is highly engaged with community; social 9 values group belonging. This is a natural pairing for community-building — both thrive in relational networks. The shadow: both can over-extend outward and under-invest in the dyad." },
                { label: "Sexual / One-to-One", body: "SX 2 is passionately giving and can become possessive; SX 9 merges deeply. This combination is intensely bonded but risks enmeshment. The Two may feel suffocated by the Nine&rsquo;s passivity; the Nine may feel engulfed by the Two&rsquo;s emotional intensity." },
              ].map((card) => (
                <div key={card.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">{card.label}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">At Their Best</h2>
            <p className="leading-relaxed text-gray-700">When both types are growing, the 2+9 pairing becomes one of the most genuinely nourishing combinations on the Enneagram. The Two has learned to receive — to ask for what they need and trust that the Nine&rsquo;s steady presence is a real form of love. The Nine has found their voice — expressing preferences, asserting a distinct self, and staying present through difficulty rather than merging and disappearing. Together they build a relationship of remarkable warmth that doesn&rsquo;t require either person to disappear into it. Both people exist, both feel cared for, and the home they create becomes a resource for everyone around them.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Practice asking directly", body: "Both types avoid making explicit requests. Make it a relationship practice: once a day, each person names one thing they want — from dinner plans to emotional reassurance. The act of asking is the growth, not just the fulfillment." },
                { num: "02", title: "Two: let the Nine care for you their way", body: "The Nine shows love through presence, steadiness, and small acts of service. Resist the urge to redirect their care or tell them how to give it better. Receiving in the Nine&rsquo;s language is its own practice." },
                { num: "03", title: "Nine: disagree once a week", body: "Healthy relationships need friction. Practice voicing a different preference or gentle disagreement at least once a week. It doesn&rsquo;t need to be big — just real. This keeps the Nine&rsquo;s distinct self present and prevents the Two from unknowingly dominating by default." },
                { num: "04", title: "Build in a check-in ritual", body: "Because both types avoid surfacing discomfort, grievances accumulate silently. A weekly five-minute check-in where each person says something they noticed and something they appreciate creates a safe container for the friction that would otherwise go underground." },
              ].map((item) => (
                <div key={item.num} className="flex gap-5 rounded-2xl border border-gray-100 p-6">
                  <span className="shrink-0 text-2xl font-bold text-gray-200">{item.num}</span>
                  <div><h3 className="mb-1 font-bold text-gray-900">{item.title}</h3><p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: item.body }} /></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore These Types</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "Type 2 — The Helper", href: "/enneagram/type-2" }, { label: "Type 9 — The Peacemaker", href: "/enneagram/type-9" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }, { label: "9 + 1", href: "/compatibility/enneagram-9/enneagram-1" }, { label: "4 + 9", href: "/compatibility/enneagram-4/enneagram-9" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: colorA }}>
            <h2 className="mb-3 text-2xl font-bold">Understand your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment. 15 minutes, no email required. Grounded in Ichazo and Naranjo&rsquo;s original framework.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color: colorA }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
