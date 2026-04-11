"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Coins, Crown, Zap, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import ReactConfetti from "react-confetti";

type Status = "loading" | "success" | "already_claimed" | "error";

interface PurchaseResult {
  packId: string;
  tokens: number;
  label: string;
  isPro: boolean;
  customerEmail: string | null;
  amountTotal: number;
  currency: string;
}

const CLAIMED_KEY = "psyche-claimed-sessions";

function getClaimedSessions(): Set<string> {
  try {
    const raw = localStorage.getItem(CLAIMED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function markSessionClaimed(sessionId: string) {
  try {
    const claimed = getClaimedSessions();
    claimed.add(sessionId);
    // Keep only the last 50 session IDs to avoid unbounded growth
    const arr = Array.from(claimed).slice(-50);
    localStorage.setItem(CLAIMED_KEY, JSON.stringify(arr));
  } catch {}
}

function grantTokensLocally(tokens: number) {
  try {
    const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
    gs.tokens = (gs.tokens ?? 0) + tokens;
    localStorage.setItem("psyche-game-state", JSON.stringify(gs));
    window.dispatchEvent(new CustomEvent("psyche-profile-change"));
  } catch {}
}

function grantProLocally() {
  try {
    localStorage.setItem("psyche-pro-unlocked", "true");
    const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
    gs.tokens = (gs.tokens ?? 0) + 500; // Pro monthly bonus
    localStorage.setItem("psyche-game-state", JSON.stringify(gs));
    window.dispatchEvent(new CustomEvent("psyche-profile-change"));
  } catch {}
}

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";
  const packId    = searchParams.get("pack") ?? "";

  const [status,    setStatus]   = useState<Status>("loading");
  const [result,    setResult]   = useState<PurchaseResult | null>(null);
  const [errorMsg,  setErrorMsg] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("No session ID found. If you completed a purchase, please contact support.");
      return;
    }

    // Idempotency: already claimed on this device
    if (getClaimedSessions().has(sessionId)) {
      setStatus("already_claimed");
      return;
    }

    async function verify() {
      try {
        const ctrl = new AbortController();
        const timeout = setTimeout(() => ctrl.abort(), 15000);
        const res = await fetch(`/api/verify-purchase?session_id=${sessionId}`, { signal: ctrl.signal });
        clearTimeout(timeout);
        const data = await res.json() as PurchaseResult & { ok?: boolean; error?: string };

        if (!res.ok || !data.ok) {
          throw new Error(data.error ?? "Payment could not be verified");
        }

        // Credit locally
        if (data.isPro) {
          grantProLocally();
        } else {
          grantTokensLocally(data.tokens);
        }

        markSessionClaimed(sessionId);
        setResult(data);
        setStatus("success");

        // Fire confetti
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);

        // Send receipt email (fire and forget)
        if (data.customerEmail) {
          fetch("/api/send-receipt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email:       data.customerEmail,
              packLabel:   data.label,
              tokens:      data.tokens,
              amountTotal: data.amountTotal,
              currency:    data.currency,
              isPro:       data.isPro,
            }),
          }).catch(() => {});
        }
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      }
    }

    verify();
  }, [sessionId, packId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin" style={{ color: "#a78bfa" }} />
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Confirming your purchase...</p>
        </div>
      </div>
    );
  }

  if (status === "already_claimed") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2">Already activated</h1>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            This purchase has already been applied to your account on this device.
          </p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
          >
            Back to Store <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2">Purchase verification failed</h1>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            {errorMsg || "We could not verify your payment. Your card was not charged."}
          </p>
          <p className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
            If you were charged, please email us at support@thyself.app with your receipt and we will sort it out right away.
          </p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  // Success
  const isPro = result?.isPro ?? false;

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={180}
          colors={["#fbbf24", "#f97316", "#a78bfa", "#34d399", "#60a5fa"]}
          recycle={false}
          className="fixed inset-0 pointer-events-none z-50"
        />
      )}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative w-full max-w-sm text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: isPro
              ? "linear-gradient(135deg, #6366f1, #7c3aed)"
              : "linear-gradient(135deg, #f59e0b, #f97316)",
            boxShadow: isPro
              ? "0 12px 40px rgba(99,102,241,0.5)"
              : "0 12px 40px rgba(245,158,11,0.5)",
          }}
        >
          {isPro ? (
            <Crown className="w-10 h-10 text-white" />
          ) : (
            <Coins className="w-10 h-10 text-white" />
          )}
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          {isPro ? "Welcome to Pro!" : "Tokens added!"}
        </h1>
        <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          {isPro
            ? "Your Thyself Pro subscription is active. The Inner Work Lab is now unlocked."
            : `${(result?.tokens ?? 0).toLocaleString()} tokens have been added to your balance.`}
        </p>

        {/* Details pill */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl mb-8"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {isPro ? (
            <><Crown className="w-4 h-4" style={{ color: "#a78bfa" }} /><span className="font-semibold text-white text-sm">{result?.label}</span></>
          ) : (
            <><Coins className="w-4 h-4" style={{ color: "#fbbf24" }} /><span className="font-extrabold text-sm" style={{ color: "#fbbf24" }}>+{(result?.tokens ?? 0).toLocaleString()} tokens</span></>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href={isPro ? "/enneagram/learn" : "/daily"}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm"
            style={{
              background: isPro
                ? "linear-gradient(135deg, #6366f1, #7c3aed)"
                : "linear-gradient(135deg, #f59e0b, #f97316)",
              boxShadow: isPro
                ? "0 8px 24px rgba(99,102,241,0.4)"
                : "0 8px 24px rgba(245,158,11,0.35)",
            }}
          >
            {isPro ? "Explore Inner Work Lab" : "Start earning more tokens"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/store"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Back to Store
          </Link>
        </div>

        {result?.customerEmail && (
          <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Receipt sent to {result.customerEmail}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default function StoreSucessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: "#a78bfa" }} />
      </div>
    }>
      <SuccessInner />
    </Suspense>
  );
}
