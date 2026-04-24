import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 3;
const typeB = 4;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 3 and 4 Compatibility — The Achiever & The Individualist | Thyself",
  description:
    "Explore the Enneagram Type 3 and Type 4 compatibility. Wing neighbors in the heart triad — performance meets depth. Full analysis of their charged attraction, the authenticity tension, and how this pairing catalyzes real growth in both types.",
  openGraph: {
    title: "Enneagram 3 and 4 Compatibility — The Achiever & The Individualist",
    description: "Type 3 performs; Type 4 longs to be genuine. Wing neighbors whose values seem opposed — explore the electric attraction, the realness tension, and what each awakens in the other.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-4",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-4" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3 and 4 Compatibility — The Achiever & The Individualist",
  description: "A full analysis of the Enneagram Type 3 and Type 4 relationship: heart triad wing connection, performance vs. authenticity dynamic, charged attraction, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-4",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-4" },
};

export default function Enneagram3and4Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>3</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>4</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 3 &amp; Type 4</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Wing neighbors in the heart triad — both oriented toward identity and image, but in opposite directions. The Three asks: how do I appear? The Four asks: who am I really? Their values seem opposed, yet the attraction is electric. Each carries what the other secretly wants.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 3</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Threes adapt to what their environment values and become the most successful version of that. They are efficient, energetic, and gifted at inspiring others. Their shadow: they can lose access to who they actually are beneath the performance. Authenticity — knowing and showing the self beneath the image — is the Three&rsquo;s primary growing edge.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 4</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Fours search for authentic identity and resist anything that feels generic or performed. They live in the emotional interior and are acutely attuned to what is real versus what is surface. Their gift is emotional depth and a refusal to accept mediocrity. Their shadow: they can become absorbed in longing and self-definition, losing ground in ordinary life.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">As wing neighbors, Three and Four share a proximity on the Enneagram that means they already carry traces of each other. The Three with a strong 4-wing has emotional depth beneath the achievement; the Four with a strong 3-wing has genuine ambition beneath the introspection. They recognize something familiar in each other.</p>
            <p className="leading-relaxed text-gray-700">The Three is drawn to the Four&rsquo;s depth, aesthetic sensibility, and emotional authenticity — the Four doesn&rsquo;t perform, and the Three finds this simultaneously threatening and deeply attractive. The Four is drawn to the Three&rsquo;s confidence, capability, and ability to act rather than just feel. The Three gets things done; the Four generates the meaning that makes getting things done feel worth it. They see in each other the qualities they most need to develop.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Creative Power", body: "The Three&rsquo;s capacity for execution meets the Four&rsquo;s capacity for vision and meaning. Together they can create things that are both excellent and significant — neither purely functional (Three alone) nor purely expressive (Four alone). This is a genuinely powerful creative partnership when both are healthy." },
                { title: "Heart Triad Recognition", body: "Both types live in the heart center — both care deeply about identity, image, and emotional life. They share a sensitivity and depth of feeling that makes early intimacy feel remarkably fluent. Neither is confused by the other&rsquo;s emotional intensity or need for relational meaning." },
                { title: "Wing Proximity", body: "As wing neighbors, Three and Four already carry traces of each other&rsquo;s qualities. The 3w4 has aesthetic sensibility and emotional depth; the 4w3 has ambition and action-orientation. This shared territory creates a recognition that goes deeper than most pairings — each sees the version of themselves they might have been." },
                { title: "Mutual Inspiration", body: "The Three inspires the Four to act, achieve, and engage with the world rather than retreating into the interior. The Four inspires the Three to go beneath the surface, to find out who they actually are, to create something genuinely meaningful rather than just successful. Both leave the relationship more developed than they entered." },
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
                { title: "Performance vs. Authenticity", body: "The Four&rsquo;s radar for inauthenticity is acute — and the Three&rsquo;s natural mode is to adapt and present the optimized self. When the Four senses the Three performing, they feel they&rsquo;re not in relationship with a real person. The Three experiences this as perpetual suspicion and an impossible standard. Neither can fully relax into the dynamic until the Three learns to be genuinely rather than just skillfully." },
                { title: "Success vs. Meaning", body: "The Three measures life by achievement and external recognition. The Four measures it by depth, authenticity, and significance. These values clash in how they spend time, what they celebrate, and what the relationship is for. The Four may experience the Three&rsquo;s success-focus as shallow. The Three may experience the Four&rsquo;s depth-focus as impractical or self-indulgent." },
                { title: "Action vs. Feeling", body: "The Three moves toward action and away from feelings that slow things down. The Four moves toward feelings and can be derailed by their intensity. In conflict, the Three wants to resolve and move forward; the Four needs to process and understand. The Three experiences the Four as endlessly dwelling; the Four experiences the Three as never actually arriving at what matters." },
                { title: "Wallowing and Performing", body: "The Three&rsquo;s private criticism of the Four: &ldquo;too much self-pity, too little action.&rdquo; The Four&rsquo;s private criticism of the Three: &ldquo;all surface, no soul.&rdquo; When both types are under stress, these shadow judgments can surface — and because both types are acutely attuned to image, being accurately criticized by the other is particularly stinging." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 3 grows by</p>
                <ul className="space-y-3">
                  {["Using the Four&rsquo;s authenticity radar as a developmental mirror: where the Four senses performance, something real is being withheld", "Practicing genuine rather than polished sharing — bringing what&rsquo;s hard and uncertain, not just the highlight reel", "Allowing the Four&rsquo;s emotional depth to slow them down — not every difficulty is a problem to be solved efficiently", "Discovering who they actually are beneath the achievement: the Four can help them find this if they allow it"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 4 grows by</p>
                <ul className="space-y-3">
                  {["Distinguishing the Three&rsquo;s image-management from dishonesty — performance is a defense mechanism, not necessarily deception", "Using the Three&rsquo;s action-orientation as a model: practicing engagement with the world even when the inner conditions don&rsquo;t feel perfect", "Receiving the Three&rsquo;s achievements as real — the Three&rsquo;s accomplishments are also expressions of who they are", "Directing their emotional perceptiveness toward the Three&rsquo;s hidden vulnerabilities rather than their visible performance"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 3 and SP 4 are both relatively private. The SP 3&rsquo;s achievement focus is quieter and more personal; the SP 4&rsquo;s suffering is inward rather than dramatic. This can be a productive pairing — both self-sufficient, both capable. The depth the Four needs may be harder to access with a SP 3 who keeps achievement and emotion in separate compartments." },
                { label: "Social", body: "Social 3 and social 4 both care about their place in the world — the Three through status, the Four through cultural significance and unique contribution. In creative or professional contexts this pairing shines: the Three provides execution and reach; the Four provides vision and meaning. Tension: who is recognized and for what." },
                { label: "Sexual / One-to-One", body: "SX 3 wants to be the most impressive and significant person in the beloved&rsquo;s eyes; SX 4 wants total authentic depth of contact. This is the most electrically charged and volatile version of the pairing. Both want something transcendent from the relationship. The SX 4&rsquo;s hunger for realness meets the SX 3&rsquo;s hunger for significance — and the Four&rsquo;s authenticity radar is at its most acute with someone they love this intensely." },
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
            <p className="leading-relaxed text-gray-700">When both types are growing, the 3+4 pairing becomes one of the most creatively and personally generative combinations on the Enneagram. The Three has found in the Four someone who calls them out of performance into genuine being — a mirror that refuses to accept the polished presentation and asks for the real person underneath. The Four has found in the Three someone who models that feelings can be the beginning of action rather than a substitute for it — that depth and accomplishment can coexist. Together they create and love and work with a quality that neither could achieve alone: real and excellent at once. The Three is more themselves. The Four is more present in the world. And the work they make together carries both signatures.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Three: share something unpolished", body: "Once a week, bring something to the Four that isn&rsquo;t optimized — a fear, a failure, an uncertainty. Not as a performance of vulnerability, but as a genuine experiment in showing up before you&rsquo;ve figured out how to look good doing it. The Four will meet this with more warmth than you expect." },
                { num: "02", title: "Four: receive the Three&rsquo;s capable love", body: "The Three shows love through doing: organizing the trip, solving the problem, making things happen. This is real care, not just competence. Practice receiving it as affection rather than evaluating whether it meets the standard of emotional depth you&rsquo;re looking for. The Three&rsquo;s acts of service are also declarations." },
                { num: "03", title: "Create shared work", body: "Both types thrive in creative collaboration where the Three&rsquo;s execution and the Four&rsquo;s vision have genuine input. Find a project — a home, a business, a creative work — where both matter equally. Shared external work often becomes the medium through which this pairing discovers their deepest intimacy." },
                { num: "04", title: "Name the mirror each offers", body: "Tell each other explicitly: &ldquo;I see you performing right now — what&rsquo;s actually going on?&rdquo; / &ldquo;I notice you&rsquo;re in the feeling instead of moving — what needs to happen next?&rdquo; Build a relationship where calling each other out is a form of love rather than an attack. This requires safety, built incrementally." },
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
              {[{ label: "Type 3 — The Achiever", href: "/enneagram/type-3" }, { label: "Type 4 — The Individualist", href: "/enneagram/type-4" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }, { label: "2 + 4", href: "/compatibility/enneagram-2/enneagram-4" }].map((link) => (
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
