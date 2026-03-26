"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import type { EquippedItems } from "@/hooks/usePetState";

export type PetMood = "thriving" | "happy" | "okay" | "hungry" | "sad" | "sick" | "dead" | "idle";

// Maps equipped item IDs → shop PNG filenames
const HAT_FILE: Record<string, string> = {
  "crown":        "hat-crown",
  "wizard-hat":   "hat-wizard",
  "flower-crown": "hat-flower",
  "santa-hat":    "hat-santa",
  "cat-ears":     "hat-catears",
};

function moodFilter(mood?: PetMood): React.CSSProperties {
  switch (mood) {
    case "thriving":
    case "happy":
      return { filter: "brightness(1.08) saturate(1.15)" };
    case "hungry":
    case "sad":
      return { filter: "brightness(0.85) saturate(0.7)" };
    case "sick":
      return { filter: "brightness(0.8) sepia(0.3) hue-rotate(300deg)" };
    case "dead":
      return { filter: "grayscale(1) brightness(0.6)", transform: "rotate(15deg)" };
    default:
      return {};
  }
}

interface AnimatedPetProps {
  type: number;
  size?: number;
  mood?: PetMood;
  equippedItems?: EquippedItems;
  className?: string;
}

export default function AnimatedPet({
  type,
  size = 96,
  mood,
  equippedItems,
  className = "",
}: AnimatedPetProps) {
  const petSrc = assetPath(`/pets/pet-${type}.png`);
  const filter = moodFilter(mood);

  const hatFile = equippedItems?.hat ? HAT_FILE[equippedItems.hat] : null;
  const hatSrc = hatFile ? assetPath(`/shop/${hatFile}.png`) : null;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Pet */}
      <Image
        src={petSrc}
        alt={`Pet type ${type}`}
        width={size}
        height={size}
        style={{
          objectFit: "contain",
          transition: "filter 0.4s ease, transform 0.4s ease",
          position: "relative",
          zIndex: 2,
          ...filter,
        }}
        priority
      />

      {/* Hat — sits at top center, overlays the pet's head */}
      {hatSrc && (
        <Image
          src={hatSrc}
          alt="hat"
          width={size}
          height={size}
          style={{
            position: "absolute",
            top: "-12%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            height: "90%",
            objectFit: "contain",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
