import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Thyself",
  description: "Choose your depth. Free gets you far. Pro unlocks shadow work, advanced assessments, and priority features.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
