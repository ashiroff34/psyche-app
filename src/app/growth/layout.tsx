import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth | Thyself",
  description: "Type-specific growth tools: predictive self, shadow dialogue, personality archaeology, perspective swap, growth edges, and the living mirror.",
};

export default function GrowthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
