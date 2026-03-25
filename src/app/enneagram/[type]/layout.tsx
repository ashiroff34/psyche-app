// Generate all 9 type pages at build time for static export
export function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({ type: String(i + 1) }));
}

export default function TypeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
