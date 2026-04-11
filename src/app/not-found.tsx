import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0a0614" }}>
      <p className="text-6xl font-bold mb-4 opacity-20">404</p>
      <h1 className="text-2xl font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>Page not found</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/daily"
        className="px-6 py-3 rounded-2xl font-semibold text-white text-sm"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
      >
        Back to daily practice
      </Link>
    </div>
  );
}
