"use client";

import { assetPath } from "@/lib/assetPath";

/**
 * Ouroboros (snake eating its tail), the Thyself app logo.
 * Uses the user's exact traced SVG paths from their custom icon.
 * Rendered as white on the gradient background.
 */
export default function OuroborosLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  // Use the SVG logo which has a built-in gradient background
  return (
    <img
      src={assetPath("/thyself-logo.svg")}
      alt="Thyself logo"
      width={size}
      height={size}
      className={`rounded-[22%] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Full logo mark. ouroboros icon + "Thyself" text */
export function PsycheLogo({ iconSize = 32, showText = true, textClass = "" }: { iconSize?: number; showText?: boolean; textClass?: string }) {
  return (
    <div className="flex items-center gap-2">
      <OuroborosLogo size={iconSize} />
      {showText && (
        <span className={`text-lg font-serif font-semibold text-slate-800 tracking-tight ${textClass}`}>
          Thyself
        </span>
      )}
    </div>
  );
}
