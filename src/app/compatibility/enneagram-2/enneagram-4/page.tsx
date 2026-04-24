import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 2;
const typeB = 4;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 2 and 4 Compatibility — The Helper & The Individualist | Thyself",
  description:
    "Explore the Enneagram Type 2 and Type 4 compatibility. Both live in the heart triad — both are oriented toward emotional life and identity. Full analysis of their empathic connection, the giving vs. receiving dynamic, and how this pairing deepens.",
  openGraph: {
    title: "Enneagram 2 and 4 Compatibility — The Helper & The Individualist",
    description: "Type 2 gives love outward; Type 4 longs to be deeply known. Both heart triad types — explore the empathic bond, the smothering risk, and what genuine emotional depth looks like between them.",
    url: "https://thyself.app/compatibility/enneagram-2/enneagram-4",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-2/enneagram-4" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2 and 4 Compatibility — The Helper & The Individualist",
  description: "A full analysis of the Enneagram Type 2 and Type 4 relationship: shared heart triad dynamics, the giving vs. receiving tension, the smothering risk, and how both grow in this pairing.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-2/enneagram-4",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-2/enneagram-4" },
};

export default function Enneagram2and4Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>4</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 2 &amp; Type 4</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Both types live in the heart triad — both are oriented toward emotional life, identity, and the question of love. The Two gives love outward; the Four longs to be deeply received and known. When it works, the Two&rsquo;s attentiveness meets the Four&rsquo;s depth in a way that feels genuinely seen. When it doesn&rsquo;t, the Two&rsquo;s giving smothers the Four&rsquo;s need for space.
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
                <p className="text-sm leading-relaxed opacity-90">Twos are driven by a need to be needed and to give love. They are warm, perceptive about others&rsquo; emotional states, and generous with their attention. Their core difficulty: they suppress their own needs while becoming indispensable to others. Pride — the belief that they know what others need — can slide into manipulation when the underlying need for love goes unmet.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 4</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Fours are driven by a search for authentic identity and deep emotional truth. They long to be known for who they really are — not the surface, but the depth. They are emotionally articulate and drawn to what is meaningful, melancholic, or beautifully complex. Their core difficulty: they can become absorbed in the emotions of the moment and lose the ground beneath them.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Two is exceptionally good at seeing and reflecting people&rsquo;s specialness — and the Four needs to be seen as uniquely valuable more than almost any other type. The Two&rsquo;s attentiveness, warmth, and genuine interest in the Four&rsquo;s inner world can feel like finally being truly met.</p>
            <p className="leading-relaxed text-gray-700">The Four is drawn to the Two&rsquo;s emotional intelligence and warm generosity. The Two doesn&rsquo;t flinch at the Four&rsquo;s intensity and is genuinely interested in emotional depth — a rarity the Four values. Both types are profoundly oriented toward the relational and the emotional. They speak a shared language of feeling that makes the initial connection feel remarkably fluent.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Heart Triad Language", body: "Both types operate primarily from the heart center — both are oriented toward emotional truth, interpersonal connection, and the question of love and identity. They share a relational fluency that makes early intimacy feel easy and natural. Both are genuinely interested in emotional depth rather than surface-level exchange." },
                { title: "Two Sees the Four", body: "The Two&rsquo;s particular gift is seeing and reflecting what is special in others. For the Four — who fears being fundamentally ordinary — being truly seen and affirmed in their uniqueness by the Two is a profound experience. The Two offers what the Four most needs: genuine recognition." },
                { title: "Creative and Aesthetic Resonance", body: "Both types have strong aesthetic sensibilities and are drawn to what is beautiful, meaningful, and real. They can build a shared world rich in artistic appreciation, creative projects, and the particular kind of life that refuses to be merely functional. Both find the ordinary insufficient and reach for what is significant." },
                { title: "Emotional Presence", body: "Neither type retreats from emotional complexity — both can sit with difficulty, ambiguity, and intensity without needing it to resolve quickly. This creates a relationship with genuine emotional presence rather than the managed surface many people present in close relationships." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Giving vs. Space", body: "The Two expresses love through giving, attentiveness, and presence. The Four needs space for their inner world — when someone is constantly attending to them, the Four can feel smothered, unable to access the interior distance that feeds their creative and emotional life. The Two experiences this need for space as rejection; the Four experiences the Two&rsquo;s constant giving as a quiet demand." },
                { title: "Four&rsquo;s Emotional Volatility", body: "The Four&rsquo;s emotional weather can be intense and unpredictable — waves of melancholy, longing, or withdrawal. The Two, who wants to fix what&rsquo;s painful, may exhaust themselves trying to manage or resolve the Four&rsquo;s inner storms. The Four may feel that their feelings are being treated as problems to solve rather than experiences to share." },
                { title: "Manipulation and Pride", body: "When unhealthy, the Two can become indirectly manipulative — giving strategically, withdrawing warmth when needs go unmet, maintaining an image of selflessness while engineering situations. The Four, with their radar for inauthenticity, can detect this dynamic acutely — and it activates their deepest fear of not being genuinely loved for who they are." },
                { title: "Who Cares for Whom", body: "The Two is the caregiver; the Four often needs care. This asymmetry can become fixed — the Two gives, the Four receives — and over time the Two&rsquo;s suppressed resentment accumulates. The Four, absorbed in their own emotional world, may not notice the Two&rsquo;s unmet needs until the Two erupts. Both are then surprised." },
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
                  {["Recognizing the Four&rsquo;s need for space as care-with-distance, not rejection", "Naming their own needs directly rather than giving in hopes of receiving in return", "Allowing the Four&rsquo;s emotional life to be present without immediately trying to fix or soothe it", "Receiving the Four&rsquo;s depth and attention when it comes without deflecting"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 4 grows by</p>
                <ul className="space-y-3">
                  {["Actively noticing and naming the Two&rsquo;s unmet needs — turning their perceptiveness toward the giver", "Receiving the Two&rsquo;s care without converting it into evidence of something missing or inadequate", "Practicing showing up for the Two even on the difficult emotional days — presence as reciprocity", "Distinguishing the Two&rsquo;s genuine care from manipulation — not every offering is a transaction"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Self-Preservation", body: "SP 2 and SP 4 are both relatively introverted. The SP 2&rsquo;s caregiving is quieter and more personal; the SP 4 suffers inwardly rather than dramatically. This can be a warm and contained pairing — but the SP 4&rsquo;s unexpressed suffering may not register with the SP 2 whose antennae are tuned to explicit emotional signals." },
                { label: "Social", body: "Social 2 and social 4 both care about community and culture — the Two through service and recognition, the Four through creative contribution and meaning. They can build impressive shared commitments. The tension: the Two&rsquo;s social warmth and the Four&rsquo;s need to stand out and be recognized as uniquely significant." },
                { label: "Sexual / One-to-One", body: "SX 2 is passionately giving and can become possessive; SX 4 is intensely hungry for deep authentic connection. This is perhaps the most electrically charged and potentially consuming version of this pairing. Both want total contact. The risk: the Two&rsquo;s giving becomes an unconscious control; the Four&rsquo;s longing becomes a bottomless demand." },
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
            <p className="leading-relaxed text-gray-700">When both types are growing, the 2+4 pairing reaches a rare quality of emotional fluency and genuine mutual care. The Two has learned to receive — to ask for what they need and to allow the Four&rsquo;s depth and attention to land without deflecting. The Four has learned to turn their emotional perceptiveness outward — to notice the Two&rsquo;s needs and show up for them with the same fullness they bring to their own inner life. Both people are seen. Both feel loved for who they actually are. The heart triad dynamic that drives both types — the question of whether they are lovable — has found a tentative, earned answer: yes.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Two: ask before giving", body: "The Four often needs space more than they need help. Before offering care, ask: &ldquo;Do you want me to be with you in this, or do you need space?&rdquo; This one question transforms the dynamic — the Four feels respected rather than managed, and the Two&rsquo;s giving becomes a genuine offering rather than a quiet demand." },
                { num: "02", title: "Four: notice the Two", body: "Make a practice of actively noticing the Two&rsquo;s state and asking about it. &ldquo;How are you actually doing today?&rdquo; The Four&rsquo;s depth of emotional perception is one of their greatest gifts — direct it toward the person who is always directing it at everyone else. This is one of the most healing things a Four can do in this relationship." },
                { num: "03", title: "Build asymmetry into giving", body: "The relationship tends toward a fixed pattern — Two gives, Four receives. Deliberately invert it periodically. Designate a week where the Four takes the lead in acts of care: making plans, expressing appreciation, offering comfort. This redistributes the relational weight and surprises both people." },
                { num: "04", title: "Stay with the Four&rsquo;s emotional weather", body: "When the Four is in a difficult emotional state, the Two&rsquo;s instinct is to fix it. Try instead: &ldquo;I&rsquo;m here. Tell me what it&rsquo;s like.&rdquo; The Four&rsquo;s emotional states pass faster when they feel truly witnessed rather than managed. Presence without agenda is the Four&rsquo;s deepest need." },
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
              {[{ label: "Type 2 — The Helper", href: "/enneagram/type-2" }, { label: "Type 4 — The Individualist", href: "/enneagram/type-4" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }, { label: "2 + 9", href: "/compatibility/enneagram-2/enneagram-9" }].map((link) => (
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
