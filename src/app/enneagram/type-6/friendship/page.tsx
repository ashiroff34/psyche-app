import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 6;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonical = "https://thyself.app/enneagram/type-6/friendship";

export const metadata: Metadata = {
  title: "Enneagram Type 6 in Friendship — The Loyalist as a Friend | Thyself",
  description:
    "How the Enneagram Type 6 shows up in friendship: what they bring, the patterns they fall into, and what helps a friendship with a Six thrive.",
  alternates: { canonical },
  openGraph: {
    title: "Enneagram Type 6 in Friendship — The Loyalist as a Friend",
    description:
      "How the Six shows up as a friend, the gifts they bring, the challenges, and what helps these friendships flourish.",
    url: canonical,
    type: "article",
  },
};

const traits = [
  {
    title: "Loyalty that is real",
    body: "The Six friend shows up in the difficult moments and does not make it about themselves.",
  },
  {
    title: "Humor and warmth",
    body: "In safe contexts, the Six in a trusted friendship is often genuinely funny.",
  },
  {
    title: "Attentiveness that catches things",
    body: "They are good at noticing when something is off before you have named it.",
  },
  {
    title: "Commitment to the friendship as a whole",
    body: "They invest in making it work over time.",
  },
];

const challenges = [
  {
    title: "Testing behavior in early stages",
    body: "The Six needs to know the friendship is safe before fully opening.",
  },
  {
    title: "Anxiety that can be transmitted",
    body: "The Six's worst-case orientation can pull the friendship into catastrophizing.",
  },
  {
    title: "Difficulty trusting between check-ins",
    body: "The friendship can feel intact one day and uncertain the next, even when nothing has actually changed.",
  },
];

export default function Type6FriendshipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Enneagram Type 6 in Friendship — The Loyalist as a Friend",
    description:
      "How the Enneagram Type 6 shows up in friendship, the gifts and challenges they bring, and what helps these friendships thrive.",
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
              The Six is among the most loyal friends available — once trust is
              established, their commitment is total and their support is
              genuine. Friendship with a Six is something you can actually count
              on.
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
                Sixes bring genuine loyalty to friendship — they remember, they
                show up, and they do not disappear when things get difficult.
                Their humor, which is often sharp and self-aware, makes them
                wonderful company. And their attentiveness to threat means they
                notice things for their friends that others miss.
              </p>
              <p>
                The challenge is that Six friendship can take time to fully
                open. The Six&apos;s testing pattern — the probing, the
                questioning, the watching to see whether the friend will remain
                consistent — can make the early stages of friendship feel
                effortful. But the trust, once earned, is one of the most solid
                foundations available.
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
                  The Six who has developed inner security becomes a deeply
                  sustaining friend — loyal, funny, and genuinely present
                  without the anxiety.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  What helps
                </h3>
                <p className="mt-3 text-gray-700">
                  Consistency and follow-through from friends, and explicit
                  reassurance that the friendship is secure.
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
