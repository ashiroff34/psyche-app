import type { Metadata } from "next";
import EnneagramTypePage from "@/components/seo/EnneagramTypePage";

export const metadata: Metadata = {
  title: "Enneagram Type 9: The Peacemaker — Traits, Growth & Psychology | Thyself",
  description: "A deep guide to Enneagram Type 9 — the core motivation, sloth, self-forgetting, wings (9w8 and 9w1), integration toward Type 3, stress toward Type 6, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 9: The Peacemaker",
    description: "The Peacemakers A deep guide to Enneagram Type 9 — the core motivation, sloth, self-forgetting, ...",
    url: "https://thyself.app/enneagram/type-9",
    type: "article",
    siteName: "Thyself",
    images: [
      {
        url: "https://thyself.app/og/enneagram-type-9.png",
        width: 1200,
        height: 630,
        alt: "Enneagram Type 9: The Peacemaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Type 9: The Peacemaker | Thyself",
    description: "A deep guide to Enneagram Type 9 — the core motivation, sloth, self-forgetting, wings (9w8 and 9w1), integration toward ...",
    images: ["https://thyself.app/og/enneagram-type-9.png"],
  },
  alternates: {
    canonical: "https://thyself.app/enneagram/type-9",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 9: The Peacemaker — Traits, Growth & Psychology",
  description: "A deep guide to Enneagram Type 9 — the core motivation, sloth, self-forgetting, wings (9w8 and 9w1), integration toward Type 3, stress toward Type 6, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-9",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-9" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
      { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
      { "@type": "ListItem", position: 3, name: "Type 9: The Peacemaker", item: "https://thyself.app/enneagram/type-9" },
    ],
  },
};

export default function EnneagramType9Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnneagramTypePage typeNum={9} />
    </>
  );
}
