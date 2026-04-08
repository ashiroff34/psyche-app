"use client";

/**
 * useVerifiedShare
 *
 * Wraps navigator.share() with token-award logic.
 *
 * Verification method:
 *   navigator.share() resolves ONLY when the user actually completes a share.
 *   If they dismiss the share sheet without sharing, it rejects with AbortError.
 *   This is the OS-level signal that a share happened — no backend required.
 *
 * Token policy:
 *   - Real share via navigator.share() → tokens awarded (verified)
 *   - Clipboard copy → no tokens (unverifiable); user is shown a prompt to share for tokens
 *
 * Per-share-point deduplication:
 *   Each share point (e.g. "profile-referral", "streak-card", "type-result") has its own
 *   localStorage key. A given point can only award tokens once per 24h.
 *
 * Usage:
 *   const { share, copy, status, tokensAwarded } = useVerifiedShare({
 *     shareId: "profile-referral",
 *     tokensPerShare: 25,
 *     title: "Discover your type",
 *     text: "...",
 *     url: "https://thyself.app/r?code=...",
 *     onVerified: () => { ... } // optional: called after confirmed share
 *   });
 */

import { useState, useCallback } from "react";

export type ShareStatus =
  | "idle"
  | "sharing"        // navigator.share() is open
  | "verified"       // share completed, tokens awarded
  | "cancelled"      // user dismissed share sheet
  | "copied"         // clipboard copy (not verified for tokens)
  | "copy-prompt"    // after clipboard copy, prompt to use share button
  | "error";

const SHARE_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours per share point

function getShareKey(shareId: string) {
  return `psyche-share-verified-${shareId}`;
}

function canAwardTokens(shareId: string): boolean {
  try {
    const raw = localStorage.getItem(getShareKey(shareId));
    if (!raw) return true;
    const { lastAwardedAt } = JSON.parse(raw);
    return Date.now() - lastAwardedAt > SHARE_COOLDOWN_MS;
  } catch {
    return true;
  }
}

function recordShareAward(shareId: string, tokensAwarded: number) {
  try {
    localStorage.setItem(
      getShareKey(shareId),
      JSON.stringify({ lastAwardedAt: Date.now(), tokensAwarded })
    );
  } catch {}
}

function awardTokens(amount: number) {
  try {
    const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
    gs.tokens = (gs.tokens ?? 0) + amount;
    localStorage.setItem("psyche-game-state", JSON.stringify(gs));
    // Broadcast so the nav chip updates immediately
    window.dispatchEvent(new CustomEvent("psyche-profile-change"));
  } catch {}
}

interface UseVerifiedShareOptions {
  shareId: string;
  tokensPerShare?: number;
  title?: string;
  text?: string;
  url: string;
  onVerified?: (tokensAwarded: number) => void;
  onCopy?: () => void;
}

export function useVerifiedShare({
  shareId,
  tokensPerShare = 25,
  title,
  text,
  url,
  onVerified,
  onCopy,
}: UseVerifiedShareOptions) {
  const [status, setStatus] = useState<ShareStatus>("idle");
  const [tokensAwarded, setTokensAwarded] = useState(0);

  const share = useCallback(async () => {
    if (!navigator.share) {
      // Fallback to copy if Web Share API unavailable
      try {
        await navigator.clipboard.writeText(url);
        setStatus("copy-prompt");
        onCopy?.();
        setTimeout(() => setStatus("idle"), 3500);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 2000);
      }
      return;
    }

    setStatus("sharing");
    try {
      await navigator.share({ title, text, url });
      // navigator.share() resolved — the OS confirmed a share happened
      const eligible = canAwardTokens(shareId);
      let awarded = 0;
      if (eligible && tokensPerShare > 0) {
        awardTokens(tokensPerShare);
        recordShareAward(shareId, tokensPerShare);
        awarded = tokensPerShare;
        setTokensAwarded(tokensPerShare);
      }
      setStatus("verified");
      onVerified?.(awarded);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: unknown) {
      const isAbort =
        err instanceof Error &&
        (err.name === "AbortError" || err.message?.includes("cancel"));
      setStatus(isAbort ? "cancelled" : "error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  }, [shareId, tokensPerShare, title, text, url, onVerified, onCopy]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copy-prompt");
      onCopy?.();
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }, [url, onCopy]);

  const canEarn = canAwardTokens(shareId) && tokensPerShare > 0;

  return {
    share,
    copy,
    status,
    tokensAwarded,
    canEarn,
    isSharing: status === "sharing",
    isVerified: status === "verified",
    isCopied: status === "copied" || status === "copy-prompt",
    showCopyPrompt: status === "copy-prompt",
  };
}
