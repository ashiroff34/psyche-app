import type { Metadata } from "next";
import EnneagramTypePage from "@/components/seo/EnneagramTypePage";

export const metadata: Metadata = {
  title: "Enneagram Type 6: The Loyalist — Traits, Growth & Psychology | Thyself",
  description: "A deep guide to Enneagram Type 6 — the core motivation, fear, scanning for threat, wings (6w5 and 6w7), integration toward Type 9, stress toward Type 3, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 6: The Loyalist",
    description: "The Loyalists A deep guide to Enneagram Type 6 — the core motivation, fear, scanning for threa...",
    url: "https://thyself.app/enneagram/type-6",
    type: "article",
    siteName: "Thyself",
    images: [
      {
        url: "https://thyself.app/og/enneagram-type-6.png",
        width: 1200,
        height: 630,
        alt: "Enneagram Type 6: The Loyalist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Type 6: The Loyalist | Thyself",
    description: "A deep guide to Enneagram Type 6 — the core motivation, fear, scanning for threat, wings (6w5 and 6w7), integration towa...",
    images: ["https://thyself.app/og/enneagram-type-6.png"],
  },
  alternates: {
    canonical: "https://thyself.app/enneagram/type-6",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 6: The Loyalist — Traits, Growth & Psychology",
  description: "A deep guide to Enneagram Type 6 — the core motivation, fear, scanning for threat, wings (6w5 and 6w7), integration toward Type 9, stress toward Type 3, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-6",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-6" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
      { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
      { "@type": "ListItem", position: 3, name: "Type 6: The Loyalist", item: "https://thyself.app/enneagram/type-6" },
    ],
  },
};

export default function EnneagramType6Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnneagramTypePage typeNum={6} />
    </>
  );
}
