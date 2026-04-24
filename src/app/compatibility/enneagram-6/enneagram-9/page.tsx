import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 6;
const typeB = 9;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 6 and 9 Compatibility — The Loyalist & The Peacemaker | Thyself",
  description:
    "Explore the Enneagram Type 6 and Type 9 compatibility. Both types are warm, loyal, and oriented toward security and belonging. Full analysis of their shared community instincts, the anxiety vs. inertia tension, and how both grow in this steady pairing.",
  openGraph: {
    title: "Enneagram 6 and 9 Compatibility — The Loyalist & The Peacemaker",
    description: "Type 6 and Type 9 are both loyal, warm, and oriented toward safety. One is alert and questioning; one is steady and accepting — explore how their complementary security strategies build a grounded relationship.",
    url: "https://thyself.app/compatibility/enneagram-6/enneagram-9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-6/enneagram-9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 6 and 9 Compatibility — The Loyalist & The Peacemaker",
  description: "A full analysis of the Enneagram Type 6 and Type 9 relationship: shared loyalty and community values, anxiety vs. inertia tension, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-6/enneagram-9",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-6/enneagram-9" },
};

export default function Enneagram6and9Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>6</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 6 &amp; Type 9</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Both types are loyal, warm, and oriented toward belonging and security. The Six brings alert questioning and protective vigilance; the Nine brings easy acceptance and steady calm. They are searching for the same thing — a place and person they can truly trust — and they often find it in each other.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 6</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Sixes seek safety through loyalty, preparation, and trusted relationships. They are responsible, perceptive about hidden motives, and deeply committed to those who earn their trust. Anxiety drives them to scan for threats and test reliability before granting trust. Their gift is a courageous loyalty and an ability to see what others miss. Their shadow: doubt can become chronic, turning trusted people into potential threats.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 9</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Nines seek peace through accommodation and acceptance. They are warm, easy-going, and genuinely comfortable with the present moment. Inertia keeps them from rocking boats or asserting needs that might disturb the harmony. Their gift is an encompassing acceptance that can receive even the Six&rsquo;s anxiety without alarm. Their shadow: they can go to sleep on their own life and disappear into comfort and routine.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Six is drawn to the Nine&rsquo;s steadiness and genuine calm. The Nine doesn&rsquo;t have a hidden agenda; they aren&rsquo;t trying to use or outmaneuver the Six. For a type that spends considerable energy scanning for deception and threat, being around someone who is simply and genuinely present is profoundly settling. The Nine passes the Six&rsquo;s reliability tests not by being impressive but by being real and consistent.</p>
            <p className="leading-relaxed text-gray-700">The Nine is drawn to the Six&rsquo;s loyalty and warmth — the Six is one of the most fiercely committed types once trust is established, and the Nine finds this devotion grounding and moving. The Six also brings a quality of questioning and engagement that gently pulls the Nine out of comfortable inertia. Both types want a safe harbor and a person they can truly count on — and they recognize that quality in each other.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Loyalty and Commitment", body: "Both types are among the most loyal on the Enneagram. Once committed, the Six will stand by the Nine through difficulties that would scatter less devoted types. The Nine, once merged with someone they love, stays with extraordinary steadiness. Together they build a relationship of remarkable durability." },
                { title: "The Nine Calms the Six", body: "The Six&rsquo;s anxiety is soothed by the Nine&rsquo;s genuine equanimity. The Nine doesn&rsquo;t escalate when the Six expresses worry — they receive it without alarm, which is precisely what the Six needs. Being around a calm, non-reactive Nine helps the Six&rsquo;s nervous system learn that not everything is a threat." },
                { title: "Community and Belonging", body: "Both types value community, shared belonging, and being part of something larger than themselves. They make natural friends, neighbors, and community members — together they build the kind of relational network that both types need. Their shared investment in others creates a genuinely supportive outer life." },
                { title: "Warmth and Safety", body: "Neither type is flashy, and neither is seeking status or drama. They value warmth, reliability, and the comfort of someone familiar. Together they create a home environment that is genuinely safe — the Six&rsquo;s vigilance keeps real threats managed; the Nine&rsquo;s ease makes the home feel restful rather than fortified." },
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
                { title: "Anxiety vs. Inertia", body: "The Six&rsquo;s hypervigilance and chronic doubt can exhaust the Nine&rsquo;s preference for ease and settled calm. The Nine may experience the Six&rsquo;s questioning and worry as a perpetual disruption of peace. The Six may experience the Nine&rsquo;s easy acceptance as naivety — a failure to take seriously what genuinely needs attending." },
                { title: "Questioning and Testing", body: "The Six tests trust before granting it — and continues testing even after trust is established. The Nine&rsquo;s low-maintenance, agreeable nature is generally reassuring, but the Nine may eventually grow weary of the Six&rsquo;s periodic doubt-spirals and quiet tests. The Nine wants to be simply trusted; the Six may find simple trust impossible." },
                { title: "Nine&rsquo;s Conflict Avoidance", body: "When the Six needs to process a worry or work through a concern together, the Nine may go quiet or accommodate rather than engaging directly. The Six experiences this as abandonment or avoidance — the very unreliability they feared. The Nine experiences the Six&rsquo;s persistent processing as exhausting and never-ending." },
                { title: "Stagnation", body: "Both types can be resistant to change — the Six out of anxiety about what change might bring, the Nine out of inertia and preference for the comfortable familiar. Together, without external pressure, this pairing can stagnate in situations that need to change: careers, living arrangements, relationship dynamics that have run their course." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 6 grows by</p>
                <ul className="space-y-3">
                  {["Using the Nine&rsquo;s genuine steadiness as evidence — practicing receiving their calm as trustworthy rather than scanning for what might be wrong", "Distinguishing the Nine&rsquo;s inertia from evasion — the Nine isn&rsquo;t hiding something; they&rsquo;re genuinely at rest", "Practicing trust before certainty: with the Nine, waiting for complete proof before committing may mean waiting forever and missing something real", "Letting the Nine&rsquo;s ease model a different relationship to anxiety — not as something to solve, but as something to set down"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 9 grows by</p>
                <ul className="space-y-3">
                  {["Engaging the Six&rsquo;s worry directly rather than smoothing it over — the Six needs to feel heard, not soothed away", "Recognizing the Six&rsquo;s questioning as love: the Six is testing because the relationship matters to them, not because they don&rsquo;t trust", "Using the Six&rsquo;s alertness as a useful signal — the Six often spots real issues the Nine&rsquo;s comfort-orientation misses", "Developing and voicing their own preferences and concerns rather than deferring to whatever keeps the Six reassured"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 6 and SP 9 are both private and oriented toward personal security. This pairing builds a very stable, reliable domestic life. Both are risk-averse and comfort-seeking. The risk: both may over-focus on security and comfort, and avoid the productive risks that growth requires." },
                { label: "Social", body: "Social 6 and social 9 are both community-oriented — the Six through loyalty to groups and causes, the Nine through belonging and harmony. Together they are natural community builders. The Six provides the vigilance and structure; the Nine provides the warmth and inclusion." },
                { label: "Sexual / One-to-One", body: "SX 6 brings intensity and an almost relentless testing of the beloved; SX 9 merges completely with whoever they love. This can be a deeply bonded but also destabilizing combination. The Six&rsquo;s intensity of attachment and doubt tests the Nine&rsquo;s capacity for self-presence under pressure." },
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
            <p className="leading-relaxed text-gray-700">When both types are growing, the 6+9 pairing becomes one of the Enneagram&rsquo;s most genuinely secure and steadfastly loyal bonds. The Six has found a person whose steadiness is real — not performed, not fragile, not conditional. The accumulated evidence of the Nine&rsquo;s consistency has finally quieted the anxiety enough for the Six to rest in genuine trust. The Nine has found a person whose loyalty calls them forward — the Six&rsquo;s committed presence makes the Nine feel it&rsquo;s worth waking up to their own life, their own preferences, their own needs. Both are safer with each other than they&rsquo;ve been before. Both are also more themselves.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Nine: engage the worry directly", body: "When the Six expresses anxiety, resist the impulse to smooth it over with reassurance. Instead: &ldquo;Tell me more about what you&rsquo;re worried about.&rdquo; The Six needs to feel heard, not managed. Genuine engagement with the concern builds more trust than reassurance that the concern is unfounded." },
                { num: "02", title: "Six: name what you&rsquo;re testing", body: "When you find yourself watching to see what the Nine will do — make it explicit: &ldquo;I notice I&rsquo;m waiting to see if you&rsquo;ll follow through on this. I&rsquo;d rather just tell you that&rsquo;s what I need.&rdquo; Naming the test replaces the exhausting guessing game with direct communication." },
                { num: "03", title: "Build in change as a shared practice", body: "Both types can stagnate without external pressure. Build a standing practice of intentional change — a yearly review of what&rsquo;s working and what needs to shift, a commitment to trying one new thing per quarter. This makes change familiar rather than threatening to the Six and urgent rather than avoidable for the Nine." },
                { num: "04", title: "Celebrate the ordinary loyalty", body: "Both types express love through reliability and presence — things easy to take for granted. Name it regularly: &ldquo;I notice you did that again, and it matters to me.&rdquo; For both types, having their ordinary devotion seen and appreciated is one of the most nourishing things their partner can offer." },
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
              {[{ label: "Type 6 — The Loyalist", href: "/enneagram/type-6" }, { label: "Type 9 — The Peacemaker", href: "/enneagram/type-9" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "9 + 1", href: "/compatibility/enneagram-9/enneagram-1" }, { label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }, { label: "7 + 9", href: "/compatibility/enneagram-7/enneagram-9" }].map((link) => (
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
