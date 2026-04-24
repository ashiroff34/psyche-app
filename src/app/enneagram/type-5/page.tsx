import type { Metadata } from "next";
import EnneagramTypePage from "@/components/seo/EnneagramTypePage";

export const metadata: Metadata = {
  title: "Enneagram Type 5: The Investigator — Traits, Growth & Psychology | Thyself",
  description: "A deep guide to Enneagram Type 5 — the core motivation, avarice, withdrawal, wings (5w4 and 5w6), integration toward Type 8, stress toward Type 7, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 5: The Investigator",
    description: "The Investigators A deep guide to Enneagram Type 5 — the core motivation, avarice, withdrawal, win...",
    url: "https://thyself.app/enneagram/type-5",
    type: "article",
    siteName: "Thyself",
    images: [
      {
        url: "https://thyself.app/og/enneagram-type-5.png",
        width: 1200,
        height: 630,
        alt: "Enneagram Type 5: The Investigator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Type 5: The Investigator | Thyself",
    description: "A deep guide to Enneagram Type 5 — the core motivation, avarice, withdrawal, wings (5w4 and 5w6), integration toward Typ...",
    images: ["https://thyself.app/og/enneagram-type-5.png"],
  },
  alternates: {
    canonical: "https://thyself.app/enneagram/type-5",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 5: The Investigator — Traits, Growth & Psychology",
  description: "A deep guide to Enneagram Type 5 — the core motivation, avarice, withdrawal, wings (5w4 and 5w6), integration toward Type 8, stress toward Type 7, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-5",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-5" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
      { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
      { "@type": "ListItem", position: 3, name: "Type 5: The Investigator", item: "https://thyself.app/enneagram/type-5" },
    ],
  },
};

export default function EnneagramType5Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnneagramTypePage typeNum={5} />
    </>
  );
}
