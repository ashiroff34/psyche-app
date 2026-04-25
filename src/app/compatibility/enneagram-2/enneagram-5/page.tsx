import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 2;
const typeB = 5;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 2 and 5 Compatibility — The Helper & The Investigator | Thyself",
  description: "Explore the Enneagram Type 2 and Type 5 compatibility. The Helper moves toward; the Investigator withdraws. A classic approach-withdrawal tension — full analysis of what draws them together, the overwhelm dynamic, and how both grow.",
  openGraph: {
    title: "Enneagram 2 and 5 Compatibility — The Helper & The Investigator",
    description: "Type 2 moves toward with warmth; Type 5 withdraws to protect resources. Opposites on the approach-withdrawal axis — explore the magnetic pull and the core tension of this challenging pairing.",
    url: "https://thyself.app/compatibility/enneagram-2/enneagram-5",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-2/enneagram-5" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2 and 5 Compatibility — The Helper & The Investigator",
  description: "A full analysis of the Enneagram Type 2 and Type 5 relationship: approach-withdrawal tension, what draws opposites together, the overwhelm dynamic, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-2/enneagram-5",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-2/enneagram-5" },
};

export default function Enneagram2and5Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>5</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 2 &amp; Type 5</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">One of the Enneagram&rsquo;s most distinctly opposite pairings. The Two moves toward people with warmth and giving; the Five withdraws to protect energy and inner resources. Both are drawn to what the other has — and both risk being overwhelmed by it.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 2</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Twos move toward people — giving care, seeking connection, making themselves needed. They are warm, emotionally expressive, and oriented toward relationship as the primary domain of meaning. Their shadow: they become indirectly manipulative when their underlying need for love goes unacknowledged.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 5</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Fives withdraw from people — conserving energy, protecting the inner world, engaging on their own terms. They are perceptive, self-sufficient, and oriented toward knowledge and inner life. Their shadow: they can withhold engagement so thoroughly that real intimacy never develops.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Two is drawn to the Five&rsquo;s quiet depth and self-containment. The Five doesn&rsquo;t need the Two — and for a Two whose giving is often motivated by a need to be needed, encountering someone who manages entirely on their own is both challenging and fascinating. The Five&rsquo;s withholding activates the Two&rsquo;s instinct: there is someone who needs unlocking.</p>
            <p className="leading-relaxed text-gray-700">The Five is drawn to the Two&rsquo;s warmth and emotional intelligence. The Five is often aware of their own emotional limitation, and the Two offers a kind of felt relational life the Five doesn&rsquo;t easily access alone. The Two can reach the Five in ways others can&rsquo;t — patient, non-demanding (at first), and genuinely interested in the Five&rsquo;s interior world.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Complementary Emotional and Intellectual Range", body: "The Two leads with heart; the Five leads with mind. Together they access a wider range than either alone. The Two helps the Five feel; the Five helps the Two think more rigorously and less reactively. In domains where both emotional intelligence and analytical depth are needed, they are a powerful team." },
                { title: "Two Provides Warmth; Five Provides Space", body: "The Two creates relational warmth; the Five creates intellectual space. At their best, the Two doesn&rsquo;t smother and the Five doesn&rsquo;t disappear — they offer each other what each most needs: the Two receives real attention from a perceptive mind; the Five receives genuine care from a warm heart." },
                { title: "Privacy is Shared Language", body: "The Two, despite their giving, also values genuine selective intimacy — they don&rsquo;t share everything with everyone. The Five&rsquo;s selectivity mirrors this at a higher intensity. What they share with each other is earned and real on both sides, which creates a rare quality of genuine trust." },
                { title: "Opposites Teach", body: "Few pairings offer as much developmental potential as 2+5. The Two learns from the Five how to receive without giving; how to be alone without anxiety; how to think before feeling. The Five learns from the Two how to reach toward others; how to be warmer; how presence itself is a form of contribution." },
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
                { title: "Approach-Withdrawal Loop", body: "The Two moves toward; the Five withdraws. The Two&rsquo;s instinct when the Five retreats is to give more — more attention, more care, more presence. But the Five retreats precisely because they feel overwhelmed by the approach. The Two&rsquo;s effort to reconnect accelerates the Five&rsquo;s withdrawal. This loop can become the defining dynamic of the relationship." },
                { title: "Energy and Demand", body: "The Two&rsquo;s emotional expressiveness and relational energy is exactly what the Five finds depleting. The Five has a limited energy budget for emotional engagement; the Two can exhaust it quickly. The Five then withdraws to recover; the Two experiences this as rejection. Neither intends harm, but both are hurt." },
                { title: "Giving and Receiving", body: "The Two gives constantly and needs to receive acknowledgment. The Five conserves and gives on their own terms. The Two&rsquo;s giving can feel like obligation or pressure to the Five; the Five&rsquo;s withholding can feel like ingratitude or coldness to the Two. Both are hurt by what the other is actually doing in good faith." },
                { title: "Emotional Demand", body: "The Two&rsquo;s emotional needs — for connection, recognition, and reciprocal care — can feel like demands to the Five who is already managing their energy carefully. The Five&rsquo;s emotional minimalism — few needs expressed, little emotional display — can feel like absence to the Two who reads love through emotional expressiveness." },
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
                  {["Learning that the Five&rsquo;s withdrawal is a need for energy recovery, not a rejection of love", "Respecting the Five&rsquo;s energy budget — less contact, not more, when the Five retreats", "Developing their own capacity for solitude and intellectual engagement rather than making the Five the primary source of meaning", "Asking for what they need directly rather than giving more in hopes of receiving in return"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 5 grows by</p>
                <ul className="space-y-3">
                  {["Learning that the Two&rsquo;s giving is love — not manipulation or demand — and receiving it without contracting", "Communicating withdrawal explicitly: &ldquo;I need an hour alone and then I&rsquo;m happy to reconnect&rdquo; rather than simply disappearing", "Practicing emotional expression in the relationship — naming feelings, even briefly, as an act of care for the Two", "Recognizing that the Two&rsquo;s emotional needs are not an imposition on their energy but part of what a relationship actually is"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 2 and SP 5 are both relatively private and domestic. This can be the most workable version of this pairing — the SP 2&rsquo;s caregiving is quieter and less intrusive; the SP 5&rsquo;s withdrawal is more territorial than alarming. There&rsquo;s room for two people to coexist with relatively low friction." },
                { label: "Social", body: "Social 2 and social 5 are both engaged with the world, though very differently. The Two through relationship and service; the Five through knowledge and contribution. In shared intellectual or community projects, they can find meaningful common ground. The Two warms the social context; the Five provides the depth." },
                { label: "Sexual / One-to-One", body: "SX 2 brings intense giving and passion; SX 5 brings a rare capacity for one-to-one depth. This can be the most intimately connected version — the SX 5 genuinely wants deep contact, and the SX 2 can provide it. The risk: the SX 2&rsquo;s intensity may activate the SX 5&rsquo;s withdrawal even in the subtype most oriented toward connection." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 2+5 pairing achieves something genuinely rare: a bond between the relational world and the interior world, each enriching the other without overwhelming it. The Two has learned to respect the Five&rsquo;s rhythm — to back off when the Five retreats and trust that return will follow. The Five has learned to communicate their limits explicitly and to reach toward the Two with small but genuine expressions of care that the Two can receive. The Two is less clingy; the Five is less cold. Both are more whole — the Two discovering they can exist outside of giving; the Five discovering they can exist inside of love.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Five: name your withdrawal explicitly", body: "&ldquo;I need an hour alone to recover — I&rsquo;ll be back after that.&rdquo; This one sentence transforms the dynamic. The Two can wait; what they can&rsquo;t manage is ambiguous disappearance that might mean rejection. Explicit withdrawal reads as trustworthy self-knowledge, not abandonment." },
                { num: "02", title: "Two: stop the loop", body: "When the Five withdraws, resist the instinct to give more. Back off instead. The paradox: the less the Two pursues, the sooner the Five returns. Trust this dynamic and practice it — it requires genuine restraint but dramatically changes the pattern." },
                { num: "03", title: "Build agreed-upon connection rituals", body: "Structure relieves both types. A daily 20-minute dinner check-in, a weekly shared intellectual activity. The Five knows exactly what&rsquo;s being asked of them; the Two knows exactly when to expect engagement. Both can relax around the known container." },
                { num: "04", title: "Find shared intellectual terrain", body: "The Two&rsquo;s emotional intelligence and the Five&rsquo;s analytical depth can combine powerfully around ideas both find meaningful. Books, films, problems, concepts — finding this terrain creates an intimacy that feels natural to the Five and meaningful to the Two." },
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
              {[{ label: "Type 2 — The Helper", href: "/enneagram/type-2" }, { label: "Type 5 — The Investigator", href: "/enneagram/type-5" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "5 + 8", href: "/compatibility/enneagram-5/enneagram-8" }, { label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }].map((link) => (
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
