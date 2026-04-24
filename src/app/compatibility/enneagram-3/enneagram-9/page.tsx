import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 3;
const typeB = 9;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 3 and 9 Compatibility — The Achiever & The Peacemaker | Thyself",
  description:
    "Explore the Enneagram Type 3 and Type 9 compatibility. The Achiever and the Peacemaker attract through complementary energy — the Three drives, the Nine supports. Full analysis of the pace mismatch, the enabling risk, and the authentic growth this pairing catalyzes.",
  openGraph: {
    title: "Enneagram 3 and 9 Compatibility — The Achiever & The Peacemaker",
    description: "Type 3 pursues success at pace; Type 9 finds contentment in the present. A naturally complementary pairing — explore what draws them together, the enabling risk, and how authenticity becomes the shared growth edge.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3 and 9 Compatibility — The Achiever & The Peacemaker",
  description: "A full analysis of the Enneagram Type 3 and Type 9 relationship: complementary energies, the enabling dynamic, pace mismatch, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-9",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-9" },
};

export default function Enneagram3and9Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 3 &amp; Type 9</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              The Three drives toward achievement at pace; the Nine flows along in accepting ease. On the surface this is complementary — the Three leads, the Nine supports. The deeper question: does the Nine&rsquo;s acceptance help the Three become more real, or simply enable the Three to keep performing?
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
                <p className="text-sm leading-relaxed opacity-90">Threes are driven by a need to succeed and be admired. They are adaptable, efficient, and goal-oriented — gifted at achieving and inspiring. Their shadow: they adapt so thoroughly to what their environment values that they can lose track of who they actually are beneath the performance. Authenticity is the Three&rsquo;s growing edge.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 9</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Nines seek peace through accommodation and merging. They are warm, easygoing, and genuinely content with the present moment. Their shadow: they can merge so completely with others that their own agenda, preferences, and needs disappear. The Nine&rsquo;s growing edge is self-presence — knowing and expressing what they want.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Three is drawn to the Nine&rsquo;s ease, warmth, and non-competitive presence. Being around a Nine lets the Three relax the constant performance — the Nine accepts the Three before they&rsquo;ve achieved anything, which is a genuinely healing experience for a type whose sense of worth is tightly bound to accomplishment.</p>
            <p className="leading-relaxed text-gray-700">The Nine is drawn to the Three&rsquo;s confidence, capability, and sense of direction. The Three models a way of moving through the world with clarity and purpose that the Nine often admires but doesn&rsquo;t easily access. The Three makes things happen; the Nine finds this attractive and grounding. Together they often feel like they balance each other effortlessly — at least initially.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Drive and Support", body: "The Three provides direction, energy, and ambition; the Nine provides steady support, warmth, and a lack of competition. Together they can build toward shared goals with the Three leading and the Nine sustaining. The Nine&rsquo;s acceptance creates a genuinely restful base camp for the Three&rsquo;s perpetual forward movement." },
                { title: "Social Ease", body: "Both types are socially skilled — the Three through adaptability and performance, the Nine through warmth and inclusion. Together they make a socially formidable pair. People feel comfortable with them: the Three impresses; the Nine makes everyone feel included." },
                { title: "Non-Threatening Dynamic", body: "The Nine is genuinely non-competitive — they have no interest in outshining the Three. For the Three, who often experiences others as rivals, the Nine&rsquo;s lack of competitive energy is a profound relief. The Three can simply be — or simply perform — without the constant social calculation of who is winning." },
                { title: "Comfort and Accomplishment", body: "The Three brings achievement and momentum; the Nine brings ease and contentment. They represent complementary goods — a life that both moves and rests. At their best, neither has to sacrifice their core orientation: the Three achieves and the Nine accepts, and both feel appreciated for it." },
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
                { title: "The Enabling Risk", body: "The Nine&rsquo;s acceptance and lack of challenge can enable the Three&rsquo;s inauthenticity. When the Three performs rather than being real, the Nine — not wanting conflict — accepts the performance without calling it out. The Three never gets the mirror they need for growth. The relationship becomes comfortable but developmentally stagnant." },
                { title: "Pace and Inertia", body: "The Three lives at high velocity; the Nine moves at their own unhurried pace. In daily life this produces friction: the Three experiences the Nine as dragging behind; the Nine experiences the Three as relentlessly driving toward the next thing. Neither feels fully met by the other&rsquo;s relationship to time." },
                { title: "Nine&rsquo;s Vanishing Self", body: "The Nine merges with whoever they love — and in a Three-led relationship, the Nine may adopt the Three&rsquo;s priorities, social world, and definition of success so thoroughly that their own self disappears. Over time the Three may discover they&rsquo;re with a mirror rather than a person — and lose respect for the Nine as a distinct other." },
                { title: "Success vs. Contentment", body: "The Three measures life by achievement and external recognition; the Nine measures it by inner peace and present-moment ease. These value systems diverge in how they spend time, money, and energy. The Three may push for more growth; the Nine may resist the disruption of what&rsquo;s already comfortable." },
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
                  {["Letting the Nine&rsquo;s acceptance invite authenticity rather than enabling continued performance", "Slowing down enough to discover what the Nine actually wants — not just assuming agreement", "Using the Nine&rsquo;s ease as a model for resting in the present without needing to achieve anything", "Actively drawing out the Nine&rsquo;s preferences, opinions, and desires — treating the Nine as a distinct person rather than a supportive backdrop"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 9 grows by</p>
                <ul className="space-y-3">
                  {["Developing and voicing their own agenda rather than simply flowing into the Three&rsquo;s", "Practicing gentle challenge — naming when the Three seems to be performing rather than being real", "Using the Three&rsquo;s purposeful energy as a model for engaging their own dormant goals and desires", "Recognizing that their distinct personhood is not a threat to the relationship but the thing that makes it real"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 3 and SP 9 are both oriented toward security and practical functioning. This pairing builds a reliable, competent domestic life. The Three achieves; the Nine maintains comfort. The risk: productivity replaces depth, and neither addresses the question of who they actually are beneath their roles." },
                { label: "Social", body: "Social 3 and social 9 are both community-oriented — the Three through visibility and status, the Nine through belonging. In social settings they complement each other naturally. The tension: the Three&rsquo;s need to stand out meets the Nine&rsquo;s preference to blend in." },
                { label: "Sexual / One-to-One", body: "SX 3 brings intense desire to be the most significant person in the beloved&rsquo;s eyes; SX 9 merges completely with their partner. This combination can be intensely bonded. The SX 9&rsquo;s complete receptivity to the Three feels intoxicating — until the Three needs a real other to push back on." },
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
            <p className="leading-relaxed text-gray-700">When both types are growing, the 3+9 pairing becomes deeply nourishing in both directions. The Three has found a companion whose acceptance finally allows them to stop performing — to discover who they are when they&rsquo;re not succeeding at anything. The Nine has found someone whose purposefulness calls out their own dormant desires and goals — and who genuinely wants to know what the Nine thinks, wants, and is. Both are more themselves in the other&rsquo;s presence. The Three is more real. The Nine is more present. The relationship moves with direction and rests with ease — neither has to sacrifice the thing they value most.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Three: drop the pitch once a week", body: "Designate a time — a walk, a meal, a drive — where you&rsquo;re not presenting the optimized version of yourself. Talk about what&rsquo;s hard, what&rsquo;s uncertain, what hasn&rsquo;t worked. The Nine&rsquo;s acceptance is most healing when the Three brings what&rsquo;s real rather than what&rsquo;s impressive." },
                { num: "02", title: "Nine: practice preference-naming", body: "Once a day, voice one preference out loud — dinner, weekend plans, what you&rsquo;d actually like to do. Make it small if that&rsquo;s easier. Each articulation is a vote for your own existence in the relationship and keeps the dynamic from defaulting entirely to the Three&rsquo;s agenda." },
                { num: "03", title: "Build non-achievement time together", body: "Create contexts where nothing is being accomplished — walks, museums, quiet evenings, travel with no schedule. These are the Nine&rsquo;s native territory, and they are where the Three can discover who they are when they&rsquo;re not performing. The Nine brings the Three home to themselves." },
                { num: "04", title: "Nine: offer gentle mirror", body: "The Nine sees the Three clearly — more clearly than the Three sees themselves. Practice naming what you see, gently: &ldquo;I notice you seem to be in performance mode right now. What&rsquo;s actually going on?&rdquo; This is one of the most valuable things the Nine can offer — and the Three, in a genuinely safe relationship, can receive it." },
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
              {[{ label: "Type 3 — The Achiever", href: "/enneagram/type-3" }, { label: "Type 9 — The Peacemaker", href: "/enneagram/type-9" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }, { label: "3 + 4", href: "/compatibility/enneagram-3/enneagram-4" }, { label: "4 + 9", href: "/compatibility/enneagram-4/enneagram-9" }].map((link) => (
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
