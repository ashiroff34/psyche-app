"use client";

import { useEffect, useState } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { assetPath } from "@/lib/assetPath";
import ChibiSprite from "./ChibiSprite";
import type { EquippedItems, PetStatus } from "@/hooks/usePetState";

// ─── State Machine Name ────────────────────────────────────────────────────────
// This must match the state machine name you set in the Rive editor.

const STATE_MACHINE = "PetMachine";

// ─── Input Maps ───────────────────────────────────────────────────────────────
// These map your usePetState item IDs → the numeric value sent to Rive.
// 0 always means "none / unequipped".
// The numbers match the layer order in your Rive file (see RIVE-SPEC.md).

const HAT_INDEX: Record<string, number> = {
  "crown": 1,
  "wizard-hat": 2,
  "flower-crown": 3,
  "santa-hat": 4,
  "cat-ears": 5,
};

const OUTFIT_INDEX: Record<string, number> = {
  "galaxy-frame": 1,
  "golden-aura": 2,
  "rainbow-border": 3,
  "ice-crystal": 4,
  "shadow-veil": 5,
};

const ACCESSORY_INDEX: Record<string, number> = {
  "sparkle-trail": 1,
  "floating-hearts": 2,
  "musical-notes": 3,
  "lightning-bolts": 4,
  "star-cluster": 5,
};

const BG_INDEX: Record<string, number> = {
  "sunset-bg": 1,
  "northern-lights": 2,
  "cherry-blossoms": 3,
  "starfield": 4,
  "forest-glow": 5,
};

const INSTINCT_INDEX: Record<string, number> = { sp: 0, so: 1, sx: 2 };

// Maps pet status → mood number in the Rive state machine
// 0 = idle, 1 = happy, 2 = sad, 3 = hurt/sick, 4 = sleeping, 5 = dead
const MOOD_INDEX: Record<PetStatus | "idle", number> = {
  idle: 0,
  thriving: 1,
  happy: 1,
  okay: 0,
  hungry: 2,
  sad: 2,
  sick: 3,
  dead: 5,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface RivePetProps {
  type: number;              // enneagram type 1–9
  instinct: string;          // "sp" | "so" | "sx"
  equippedItems: EquippedItems;
  petStatus: PetStatus | "idle";
  size?: number;
  className?: string;
  onClick?: () => void;
  /** Fires once the Rive runtime has resolved — true if Rive loaded, false if falling back to PNG */
  onRiveReady?: (riveActive: boolean) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RivePet({
  type,
  instinct,
  equippedItems,
  petStatus,
  size = 256,
  className = "",
  onClick,
  onRiveReady,
}: RivePetProps) {
  const [riveLoadFailed, setRiveLoadFailed] = useState(false);
  const inst = instinct?.toLowerCase().slice(0, 2) || "sp";

  // Each pet type has its own .riv file: /public/rive/pet-1.riv … pet-9.riv
  const riveSrc = assetPath(`/rive/pet-${type}.riv`);

  const { rive, RiveComponent } = useRive({
    src: riveSrc,
    stateMachines: STATE_MACHINE,
    autoplay: true,
    onLoad: () => {
      onRiveReady?.(true);
    },
    onLoadError: () => {
      setRiveLoadFailed(true);
      onRiveReady?.(false);
    },
  });

  // ── Wire inputs whenever props or rive instance changes ─────────────────────

  const instinctInput   = useStateMachineInput(rive, STATE_MACHINE, "instinct");
  const moodInput       = useStateMachineInput(rive, STATE_MACHINE, "mood");
  const hatInput        = useStateMachineInput(rive, STATE_MACHINE, "hatIndex");
  const outfitInput     = useStateMachineInput(rive, STATE_MACHINE, "outfitIndex");
  const accessoryInput  = useStateMachineInput(rive, STATE_MACHINE, "accessoryIndex");
  const backgroundInput = useStateMachineInput(rive, STATE_MACHINE, "backgroundIndex");

  useEffect(() => {
    if (!rive) return;
    if (instinctInput)   instinctInput.value   = INSTINCT_INDEX[inst]                         ?? 0;
    if (moodInput)       moodInput.value       = MOOD_INDEX[petStatus]                        ?? 0;
    if (hatInput)        hatInput.value        = HAT_INDEX[equippedItems.hat        ?? ""]    ?? 0;
    if (outfitInput)     outfitInput.value     = OUTFIT_INDEX[equippedItems.outfit  ?? ""]    ?? 0;
    if (accessoryInput)  accessoryInput.value  = ACCESSORY_INDEX[equippedItems.accessory ?? ""] ?? 0;
    if (backgroundInput) backgroundInput.value = BG_INDEX[equippedItems.background ?? ""]    ?? 0;
  }, [
    rive, inst, petStatus, equippedItems,
    instinctInput, moodInput, hatInput, outfitInput, accessoryInput, backgroundInput,
  ]);

  // ── Fallback: PNG chibi sprite ───────────────────────────────────────────────
  // Shown whenever the .riv file hasn't been added to /public/rive/ yet.

  if (riveLoadFailed) {
    const chibiState =
      petStatus === "dead"                        ? "hurt"
      : petStatus === "sick" || petStatus === "sad" ? "hurt"
      : petStatus === "happy" || petStatus === "thriving" ? "happy"
      : "idle";

    return (
      <ChibiSprite
        type={type}
        instinct={inst}
        size={size}
        state={chibiState}
        className={className}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <RiveComponent style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
