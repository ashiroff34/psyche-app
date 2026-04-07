import ReferralClient from "./ReferralClient";

// For GitHub Pages static export: return [] so no referral pages are pre-built.
// (Referral codes are user-generated at runtime — impossible to enumerate at build time.)
// On Vercel (SSR), this route renders on demand for any /r/[code].
export function generateStaticParams() {
  return [];
}

export default async function ReferralPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <ReferralClient initialCode={code} />;
}
