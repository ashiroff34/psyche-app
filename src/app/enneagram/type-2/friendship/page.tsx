import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 2;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonical = "https://thyself.app/enneagram/type-2/friendship";

export const metadata: Metadata = {
  title: "Enneagram Type 2 in Friendship — The Helper as a Friend | Thyself",
  description:
    "How the Enneagram Type 2 shows up in friendship: what they bring, the patterns they fall into, and what helps a friendship with a Two thrive.",
  alternates: { canonical },
  openGraph: {
    title: "Enneagram Type 2 in Friendship — The Helper as a Friend",
    description:
      "How the Two shows up as a friend, the gifts they bring, the challenges, and what helps these friendships flourish.",
    url: canonical,
    type: "article",
  },
};

const traits = [
  {
    title: "Remembers what matters to you",
    body: "Uses that knowledge to make you feel seen.",
  },
  {
    title: "Shows up practically",
    body: "The Two friend brings food when you are sick, helps you move, and is there before you ask.",
  },
  {
    title: "Creates warmth and intimacy",
    body: "Being around them feels like being genuinely liked.",
  },
  {
    title: "Advocates for you to others",
    body: "The Two is a fierce supporter of the people they love.",
  },
];

const challenges = [
  {
    title: "Difficulty receiving in return",
    body: "May deflect care or appreciation without realizing it.",
  },
  {
    title: "Unspoken expectations attached to giving",
    body: "When it goes unreciprocated, the Two may feel quietly resentful without saying so.",
  },
  {
    title: "Merging into the friend's life",
    body: "Can take on their problems as their own, losing their independent perspective at the expense of their own.",
  },
];

export default function Type2FriendshipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Enneagram Type 2 in Friendship — The Helper as a Friend",
    description:
      "How the Enneagram Type 2 shows up in friendship, the gifts and challenges they bring, and what helps these friendships thrive.",
    datePublished: "2026-04-25",
    dateModified: "2026-04-25",
    author: { "@type": "Organization", name: "Thyself" },
    publisher: {
      "@type": "Organization",
      name: "Thyself",
      url: "https://thyself.app",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <section
          className="px-6 py-16 sm:py-20"
          style={{ backgroundColor: color }}
        >
          <div className="mx-auto max-w-3xl text-white">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
              {typeNum}
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Type {typeNum} in Friendship
            </h1>
            <p className="mt-2 text-xl text-white/90">{typeName}</p>
            <p className="mt-6 text-lg leading-relaxed text-white/95">
              The Two is among the most devoted and attentive friends you will
              find — remembering the things that matter, showing up before you
              ask, and creating a quality of warmth that makes people feel
              genuinely cared for.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              What Type {typeNum} Brings to Friendship
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Twos bring attunement to friendship that is unusual in its depth
                — they track how you are doing, remember what is important to
                you, and find ways to make you feel seen in the ordinary moments
                as much as the major ones. The quality of being genuinely
                received by a Two friend is hard to replicate.
              </p>
              <p>
                The challenge in Two friendship is that the giving is not
                entirely free. The Two gives because it is their nature and
                their deepest satisfaction — but also because giving is how they
                ensure the relationship stays intact. When a Two friend feels
                taken for granted, or when the care is not reciprocated, the
                resentment that builds can come as a surprise to both parties.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              As a Friend, Type {typeNum}...
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {traits.map((t) => (
                <div
                  key={t.title}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <h3
                    className="text-lg font-semibold"
                    style={{ color }}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-3 text-gray-700">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Friendship Challenges
            </h2>
            <div className="mt-8 space-y-5">
              {challenges.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-gray-700">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Friendship Growth
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3
                  className="text-lg font-semibold"
                  style={{ color }}
                >
                  At their best
                </h3>
                <p className="mt-3 text-gray-700">
                  The Two who has developed genuine inner independence becomes a
                  deeply free giver — their care for their friends is not
                  conditional, not transactional, and not at their own expense.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  What helps
                </h3>
                <p className="mt-3 text-gray-700">
                  Friends who reciprocate actively and who ask the Two what they
                  need, so the friendship flows in both directions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">Keep exploring</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link
                href={`/enneagram/type-${typeNum}`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Type overview</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum}: {typeName}
                </div>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/relationships`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Relationships</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum} in Relationships
                </div>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/communication`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Communication</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum} Communication Style
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl">
            <div
              className="rounded-3xl p-8 text-center text-white sm:p-12"
              style={{ backgroundColor: color }}
            >
              <h2 className="text-3xl font-bold">
                Not sure if you&apos;re a Type {typeNum}?
              </h2>
              <p className="mt-3 text-lg text-white/95">
                Take the Thyself Enneagram Assessment to find your type.
              </p>
              <Link
                href="/assessments"
                className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold transition hover:bg-white/90"
                style={{ color }}
              >
                Take the assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
