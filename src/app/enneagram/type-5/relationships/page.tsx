import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 5 in Relationships — The Investigator as a Partner | Thyself",
  description:
    "How Enneagram Type 5 shows up in relationships: their need for privacy and space, the pattern of emotional withdrawal, and what they need to open up without losing themselves. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 5 in Relationships — The Investigator as a Partner",
    description:
      "The Type 5 loves with discretion and depth. They give their partners access to a rich interior world — but access must be earned, and the terms are theirs to set.",
    url: "https://thyself.app/enneagram/type-5/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-5/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 5 in Relationships — The Investigator as a Partner",
  description:
    "How the Enneagram Type 5 shows up in relationships: privacy needs, emotional withdrawal patterns, and what they need to open up without losing themselves.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-5/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-5/relationships" },
};

export default function Type5Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 5</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Investigator in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 5s love with a quiet intensity that their partners often have to learn to read. They do not wear their attachment on their surface — they keep it carefully, in a well-protected interior where it is safe from the demands and intrusions that exhaust them. When they give you access to that interior, it means something.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 5 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 5s are deeply loyal and intellectually enlivening partners. They bring a quality of focused attention — when a Five is interested in you, they become interested in you with their full capacity for inquiry, which is considerable. They observe carefully, remember what matters, and develop a nuanced understanding of their partner that can feel like being genuinely known rather than just observed.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Five&apos;s independence is also a gift to a relationship. They do not need constant reassurance, do not require their partner&apos;s attention to feel okay, and do not generate emotional demands that exhaust the other person. A relationship with a Five has a quality of spaciousness — both people have room to be themselves, to pursue their own interests, to exist as separate individuals who choose each other.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Fives also tend to be calm under pressure, thoughtful in conflict, and non-reactive in ways that can be enormously stabilizing for more emotionally volatile partners. They do not escalate; they tend to withdraw and think, which is frustrating in one way and containing in another.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Privacy and solitude",
                  body: "For Type 5s, solitude is not a luxury — it is a necessity. They need regular time alone to replenish the energy that social and emotional engagement depletes. A partner who treats this need as a personal rejection will consistently destabilize the relationship. A partner who respects it — and does not require the Five to justify or apologize for it — creates the conditions for genuine closeness.",
                },
                {
                  title: "Intellectual engagement",
                  body: "Fives are energized by ideas, by learning, by the exchange of knowledge and perspective. A relationship that does not contain regular intellectual engagement — conversations that go somewhere interesting, shared curiosity, genuine exploration of ideas — will feel to the Five like something important is missing. Partners who engage with the Five&apos;s interests and bring their own are more compelling than partners who defer to whatever the Five wants to talk about.",
                },
                {
                  title: "No emotional flooding",
                  body: "Fives find intense emotional demands genuinely depleting. They have a limited budget for emotional energy, and when that budget is overwhelmed — by a partner who needs constant reassurance, by conflicts that escalate to high emotional intensity, by unrelenting emotional demands — they shut down and withdraw. This is not coldness; it is a coping mechanism for a system that has run out of resource.",
                },
                {
                  title: "Advance notice and predictability",
                  body: "Fives like to prepare for social and emotional demands. They do better with a partner who can signal what is coming — \"I need to talk about something important tonight\" rather than ambushing them with a difficult conversation when they have not had time to prepare. This is not about control; it is about having enough resource to actually show up.",
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Withdrawal Pattern</h2>
            <p className="leading-relaxed text-gray-700">
              The Five&apos;s most characteristic relational difficulty is withdrawal — not in the sense of leaving, but in the sense of retreating behind their interior walls when the relationship&apos;s emotional demands feel too great. This can leave partners feeling shut out, unseen, and unable to make contact with the person they love. The Five is there, physically present, but not available in the way the partner needs.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              What partners often do not understand is that the Five&apos;s withdrawal is usually not about the partner — it is about the Five&apos;s need to manage their energy. When a Five becomes emotionally depleted, they do not have the option of pushing through and staying present; they genuinely have nothing left. The withdrawal is self-protection, not rejection.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Five&apos;s growth in this area involves recognizing that emotional engagement, while depleting, is also replenishing — that real connection with their partner restores as well as costs. Learning to stay present through discomfort, to signal what is happening rather than simply disappearing, and to re-engage after a period of withdrawal without having to be coaxed back are all important developments.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 5 who has learned to stay present — who has developed the willingness to show up emotionally even when it costs them — is one of the most quietly devoted partners on the Enneagram. Their loyalty is genuine, their understanding is deep, and their presence — when they are truly present — has a quality of concentrated attention that is rare and very nourishing.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Five&apos;s growth edge in relationship is learning that emotional engagement is not the same as depletion. The intimacy they have been protecting themselves from is also the thing that can most replenish them. Staying in contact — not always, not without limit, but enough — allows the relationship to become the resource they feared it would drain.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 5 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 5s often describe a relationship that requires learning a different language for love — one where presence does not always look like warmth, where withdrawal is not always distance, and where the deepest intimacy is often quiet and intellectual rather than emotionally saturated. It requires patience, and a confidence in one&apos;s own value that does not depend on the Five&apos;s constant affirmation.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Loving a Five well means respecting their solitude as a genuine need rather than a statement about the relationship. It means engaging seriously with their ideas rather than just tolerating them. It means creating enough emotional safety that the Five can choose to emerge from behind their walls without feeling like the relationship will overwhelm them if they do.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              It also means paying attention to the quieter ways the Five shows their love — the practical help, the remembered details, the careful attention — rather than waiting for emotional expressiveness that may not arrive in the forms the partner is used to expecting.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/5w4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">5w4 — The Iconoclast</Link>
              <Link href="/enneagram/5w6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">5w6 — The Problem Solver</Link>
              <Link href="/enneagram/subtypes/sp-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 5</Link>
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
