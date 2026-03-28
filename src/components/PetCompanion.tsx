"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PetCompanionProps {
  type: number;
  size?: number;
  className?: string;
  /** Animation state: idle = gentle bob, happy = excited bounce */
  state?: "idle" | "happy";
}

export default function PetCompanion({ type, size = 64, state = "idle", className }: PetCompanionProps) {
  const safeType = type >= 1 && type <= 9 ? type : 4;

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      animate={
        state === "happy"
          ? { y: [0, -10, 0], scale: [1, 1.05, 1] }
          : { y: [0, -4, 0] }
      }
      transition={
        state === "happy"
          ? { duration: 0.5, repeat: 3 }
          : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <Image
        src={`/pets/pet-${safeType}.png`}
        alt={`Type ${safeType} pet companion`}
        width={size}
        height={size}
        className="object-contain"
        unoptimized
      />
    </motion.div>
  );
}
