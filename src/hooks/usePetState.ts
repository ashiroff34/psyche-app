"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface EquippedItems {
  hat?: string;
  outfit?: string;
  accessory?: string;
  background?: string;
}

export interface PetState {
  name: string;
  type: number; // enneagram type 1-9
  health: number; // 0-100
  happiness: number; // 0-100
  hunger: number; // 0-100
  lastFed: string; // ISO date
  lastPlayed: string; // ISO date
  lastLogin: string; // ISO date
  isAlive: boolean;
  revivalDaysCompleted: number;
  revivalStartDate: string | null;
  equippedItems: EquippedItems;
  ownedItems: string[];
  createdAt: string;
  totalDaysAlive: number;
  // Companion XP / Evolution
  companionXP: number;
  companionLevel: number;
  lastCompanionXPDate: string;
}

// ─── Subtype Names (Beatrice Chestnut) ───────────────────────────────────────

export const SUBTYPE_NAMES: Record<string, string> = {
  "sp1": "Anxiety (Worry)",
  "so1": "Non-Adaptability (Rigidity)",
  "sx1": "Zeal (Jealousy)",
  "sp2": "Privilege (Me First)",
  "so2": "Ambition (Vain Ambition)",
  "sx2": "Seduction (Aggression)",
  "sp3": "Security (Workaholism)",
  "so3": "Prestige (Image)",
  "sx3": "Charisma (Masculinity/Femininity)",
  "sp4": "Tenacity (Dauntless)",
  "so4": "Shame (Suffering)",
  "sx4": "Competition (Hatred)",
  "sp5": "Castle (Refuge)",
  "so5": "Totem (Emblem)",
  "sx5": "Confidence (Confidentiality)",
  "sp6": "Warmth (Affection)",
  "so6": "Duty (Obedience)",
  "sx6": "Strength (Beauty)",
  "sp7": "Defenders (Keepers)",
  "so7": "Sacrifice (Martyr)",
  "sx7": "Suggestibility (Fascination)",
  "sp8": "Satisfaction (Survival)",
  "so8": "Solidarity (Friendship)",
  "sx8": "Possession (Surrender)",
  "sp9": "Appetite (Collector)",
  "so9": "Participation (Belonging)",
  "sx9": "Union (Fusion)",
};

// Friendlier display names for the avatar page
export const SUBTYPE_DISPLAY_NAMES: Record<string, string> = {
  "sp1": "The Perfectionist",
  "so1": "The Reformer",
  "sx1": "The Zealot",
  "sp2": "The Nurturer",
  "so2": "The Ambassador",
  "sx2": "The Enchanter",
  "sp3": "The Workaholic",
  "so3": "The Star",
  "sx3": "The Charmer",
  "sp4": "The Dauntless",
  "so4": "The Bohemian",
  "sx4": "The Fierce Individualist",
  "sp5": "The Hermit",
  "so5": "The Sage",
  "sx5": "The Alchemist",
  "sp6": "The Guardian",
  "so6": "The Loyalist",
  "sx6": "The Warrior",
  "sp7": "The Epicure",
  "so7": "The Utopian",
  "sx7": "The Adventurer",
  "sp8": "The Survivor",
  "so8": "The Leader",
  "sx8": "The Maverick",
  "sp9": "The Comfort Seeker",
  "so9": "The Peacekeeper",
  "sx9": "The Dreamer",
};

// ─── Pet Definitions ─────────────────────────────────────────────────────────

export interface PetDefinition {
  type: number;
  name: string;
  emoji: string;
  description: string;
  color: string; // tailwind text color
}

export const PET_DEFINITIONS: PetDefinition[] = [
  { type: 1, name: "Athena", emoji: "\u{1F989}", description: "A small white owl of wisdom and precision", color: "text-slate-100" },
  { type: 2, name: "Clover", emoji: "\u{1F430}", description: "A fluffy pink bunny, warm and nurturing", color: "text-pink-300" },
  { type: 3, name: "Blaze", emoji: "\u{1F426}\u200D\u{1F525}", description: "A golden phoenix chick, ambitious and radiant", color: "text-amber-400" },
  { type: 4, name: "Luna", emoji: "\u{1FAB6}", description: "A purple moon moth, unique and beautiful", color: "text-purple-400" },
  { type: 5, name: "Corvus", emoji: "\u{1F426}\u200D\u2B1B", description: "A dark blue raven, wise and observant", color: "text-blue-800" },
  { type: 6, name: "Scout", emoji: "\u{1F415}", description: "A loyal brown dog, protective and steadfast", color: "text-amber-700" },
  { type: 7, name: "Zippy", emoji: "\u{1F426}", description: "A rainbow hummingbird, joyful and energetic", color: "text-emerald-400" },
  { type: 8, name: "Ember", emoji: "\u{1F432}", description: "A red baby dragon, powerful and fierce", color: "text-red-500" },
  { type: 9, name: "Mochi", emoji: "\u{1F408}", description: "A sleepy grey cat, peaceful and content", color: "text-slate-400" },
];

// ─── Outfit Shop Items ───────────────────────────────────────────────────────

export type OutfitCategory = "hat" | "outfit" | "accessory" | "background";

export interface OutfitItem {
  id: string;
  name: string;
  category: OutfitCategory;
  cost: number;
  description: string;
  emoji: string; // preview emoji
  cssClass: string; // visual representation class
  gradient?: string; // for backgrounds
  png?: string; // shop/shop PNG filename (without extension), e.g. "hat-crown"
}

export const OUTFIT_ITEMS: OutfitItem[] = [
  // Hats
  { id: "crown", name: "Crown", category: "hat", cost: 50, description: "A golden crown for royalty", emoji: "\u{1F451}", cssClass: "hat-crown", png: "hat-crown" },
  { id: "wizard-hat", name: "Wizard Hat", category: "hat", cost: 40, description: "Mystical purple wizard hat", emoji: "\u{1FA84}", cssClass: "hat-wizard", png: "hat-wizard" },
  { id: "flower-crown", name: "Flower Crown", category: "hat", cost: 30, description: "A delicate ring of flowers", emoji: "\u{1F33A}", cssClass: "hat-flowers", png: "hat-flower" },
  { id: "santa-hat", name: "Santa Hat", category: "hat", cost: 60, description: "Ho ho ho! Seasonal special", emoji: "\u{1F385}", cssClass: "hat-santa", png: "hat-santa" },
  { id: "cat-ears", name: "Cat Ears", category: "hat", cost: 25, description: "Kawaii cat ear headband", emoji: "\u{1F63B}", cssClass: "hat-cat-ears", png: "hat-catears" },

  // Outfits (borders/frames)
  { id: "galaxy-frame", name: "Galaxy Frame", category: "outfit", cost: 80, description: "Swirling cosmic border", emoji: "\u{1F30C}", cssClass: "frame-galaxy", gradient: "from-indigo-600 via-purple-600 to-pink-500" },
  { id: "golden-aura", name: "Golden Aura", category: "outfit", cost: 100, description: "Radiant golden glow effect", emoji: "\u2728", cssClass: "frame-golden", gradient: "from-amber-300 via-yellow-400 to-amber-500" },
  { id: "rainbow-border", name: "Rainbow Border", category: "outfit", cost: 60, description: "Colorful rainbow frame", emoji: "\u{1F308}", cssClass: "frame-rainbow", gradient: "from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400" },
  { id: "ice-crystal", name: "Ice Crystal Frame", category: "outfit", cost: 70, description: "Frosted crystal edges", emoji: "\u2744\uFE0F", cssClass: "frame-ice", gradient: "from-cyan-200 via-blue-300 to-indigo-400" },
  { id: "shadow-veil", name: "Shadow Veil", category: "outfit", cost: 90, description: "Mysterious dark mist", emoji: "\u{1F32B}\uFE0F", cssClass: "frame-shadow", gradient: "from-gray-800 via-purple-900 to-gray-900" },

  // Accessories
  { id: "sparkle-trail", name: "Sparkle Trail", category: "accessory", cost: 35, description: "Leave sparkles wherever you go", emoji: "\u2728", cssClass: "acc-sparkle" },
  { id: "floating-hearts", name: "Floating Hearts", category: "accessory", cost: 30, description: "Love is in the air", emoji: "\u{1F495}", cssClass: "acc-hearts" },
  { id: "musical-notes", name: "Musical Notes", category: "accessory", cost: 25, description: "Always in harmony", emoji: "\u{1F3B5}", cssClass: "acc-music" },
  { id: "lightning-bolts", name: "Lightning Bolts", category: "accessory", cost: 40, description: "Electrifying energy", emoji: "\u26A1", cssClass: "acc-lightning" },
  { id: "star-cluster", name: "Star Cluster", category: "accessory", cost: 45, description: "Celestial companion stars", emoji: "\u{1F320}", cssClass: "acc-stars" },

  // Backgrounds
  { id: "sunset-bg", name: "Sunset", category: "background", cost: 50, description: "Warm orange-pink gradient", emoji: "\u{1F305}", cssClass: "bg-sunset", gradient: "from-orange-400 via-pink-400 to-rose-500" },
  { id: "northern-lights", name: "Northern Lights", category: "background", cost: 75, description: "Aurora borealis effect", emoji: "\u{1F30C}", cssClass: "bg-aurora", gradient: "from-green-400 via-teal-500 to-purple-600" },
  { id: "cherry-blossoms", name: "Cherry Blossoms", category: "background", cost: 60, description: "Falling sakura petals", emoji: "\u{1F338}", cssClass: "bg-sakura", gradient: "from-pink-200 via-pink-300 to-rose-300" },
  { id: "starfield", name: "Starfield", category: "background", cost: 55, description: "Deep space with twinkling stars", emoji: "\u{1F303}", cssClass: "bg-stars", gradient: "from-slate-900 via-indigo-950 to-slate-900" },
  { id: "forest-glow", name: "Forest Glow", category: "background", cost: 65, description: "Enchanted forest with fireflies", emoji: "\u{1F332}", cssClass: "bg-forest", gradient: "from-emerald-800 via-green-700 to-teal-800" },
];

// ─── Companion XP Helpers ────────────────────────────────────────────────────

export const COMPANION_XP_PER_LEVEL = 100;

/** Returns companion level from accumulated XP (100 XP per level) */
export function getCompanionLevel(xp: number): number {
  return Math.floor(xp / COMPANION_XP_PER_LEVEL);
}

/** XP needed for the next level */
export function xpToNextLevel(xp: number): { current: number; needed: number; pct: number } {
  const level = getCompanionLevel(xp);
  const base = level * COMPANION_XP_PER_LEVEL;
  const current = xp - base;
  const needed = COMPANION_XP_PER_LEVEL;
  return { current, needed, pct: Math.round((current / needed) * 100) };
}

// ─── Pet Status Helpers ──────────────────────────────────────────────────────

export type PetStatus = "thriving" | "happy" | "okay" | "hungry" | "sad" | "sick" | "dead";

export function getPetStatusLabel(state: PetState): { status: PetStatus; label: string; color: string } {
  if (!state.isAlive) return { status: "dead", label: "Dead", color: "text-gray-500" };
  if (state.health < 20) return { status: "sick", label: "Sick", color: "text-red-500" };
  if (state.happiness < 30) return { status: "sad", label: "Sad", color: "text-blue-400" };
  if (state.hunger < 30) return { status: "hungry", label: "Hungry", color: "text-orange-500" };
  if (state.health > 80 && state.happiness > 80 && state.hunger > 80) return { status: "thriving", label: "Thriving", color: "text-emerald-500" };
  if (state.health > 50 && state.happiness > 50 && state.hunger > 50) return { status: "happy", label: "Happy", color: "text-green-500" };
  return { status: "okay", label: "Okay", color: "text-yellow-500" };
}

export function getPetEmoji(type: number): string {
  return PET_DEFINITIONS.find((p) => p.type === type)?.emoji ?? "\u{1F431}";
}

export function getDefaultPetName(type: number): string {
  return PET_DEFINITIONS.find((p) => p.type === type)?.name ?? "Buddy";
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "psyche-pet-state";

// Decay rates per 24 hours without login
const HUNGER_DECAY_PER_DAY = 25;        // empty in 4 days
const HAPPINESS_DECAY_PER_DAY = 20;     // empty in 5 days
const HEALTH_DECAY_PER_DAY = 20;        // base health loss per day (was 10)
const EXTRA_HEALTH_DECAY_WHEN_STARVING = 30; // extra per day when hunger = 0 (was 15)

// Action costs & effects
export const PET_ACTIONS = {
  feed: { cost: 10, hungerGain: 30, happinessGain: 10, healthGain: 0 },
  play: { cost: 5, hungerGain: 0, happinessGain: 20, healthGain: 5 },
  medicine: { cost: 25, hungerGain: 0, happinessGain: 0, healthGain: 50 },
  reviveTokens: { cost: 100 },
  reviveDays: 7,
};

// ─── Helper ──────────────────────────────────────────────────────────────────

function getToday(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA).getTime();
  const b = new Date(dateB).getTime();
  return Math.max(0, Math.floor(Math.abs(b - a) / 86400000));
}

function createDefaultPetState(type: number): PetState {
  const today = getToday();
  return {
    name: getDefaultPetName(type),
    type,
    health: 100,
    happiness: 100,
    hunger: 100,
    lastFed: today,
    lastPlayed: today,
    lastLogin: today,
    isAlive: true,
    revivalDaysCompleted: 0,
    revivalStartDate: null,
    equippedItems: {},
    ownedItems: [],
    createdAt: today,
    totalDaysAlive: 0,
    companionXP: 0,
    companionLevel: 0,
    lastCompanionXPDate: "",
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function usePetState(enneagramType?: number) {
  const [petState, setPetState] = useState<PetState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const saveRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PetState;
        // Migrate older saves that lack companion fields
        if (parsed.companionXP === undefined) parsed.companionXP = 0;
        if (parsed.companionLevel === undefined) parsed.companionLevel = 0;
        if (parsed.lastCompanionXPDate === undefined) parsed.lastCompanionXPDate = "";
        setPetState(parsed);
      } else if (enneagramType) {
        // Auto-create pet if user has a type but no pet yet
        const newPet = createDefaultPetState(enneagramType);
        setPetState(newPet);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPet));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, [enneagramType]);

  // Save helper (debounced)
  const save = useCallback((state: PetState) => {
    if (saveRef.current) clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    }, 100);
  }, []);

  const update = useCallback(
    (updater: (prev: PetState) => PetState) => {
      setPetState((prev) => {
        if (!prev) return prev;
        const next = updater(prev);
        save(next);
        return next;
      });
    },
    [save]
  );

  // ── Check pet status on load (decay calculation) ────────────────────────────

  const checkPetStatus = useCallback(() => {
    update((prev) => {
      const today = getToday();
      if (prev.lastLogin === today) return prev; // already checked today

      const daysSinceLogin = daysBetween(prev.lastLogin, today);
      if (daysSinceLogin === 0) return prev;

      if (!prev.isAlive) {
        // If doing daily revival, track consecutive days
        if (prev.revivalStartDate) {
          const yesterdayDate = new Date();
          yesterdayDate.setDate(yesterdayDate.getDate() - 1);
          const yesterday = new Intl.DateTimeFormat("en-CA").format(yesterdayDate);
          if (prev.lastLogin === yesterday) {
            const newDays = prev.revivalDaysCompleted + 1;
            if (newDays >= PET_ACTIONS.reviveDays) {
              // Revived!
              return {
                ...prev,
                isAlive: true,
                health: 50,
                happiness: 50,
                hunger: 50,
                lastLogin: today,
                revivalDaysCompleted: 0,
                revivalStartDate: null,
              };
            }
            return { ...prev, lastLogin: today, revivalDaysCompleted: newDays };
          } else {
            // Missed a day, reset revival progress
            return { ...prev, lastLogin: today, revivalDaysCompleted: 0, revivalStartDate: null };
          }
        }
        return { ...prev, lastLogin: today };
      }

      // Calculate decay
      let hungerLoss = HUNGER_DECAY_PER_DAY * daysSinceLogin;
      let happinessLoss = HAPPINESS_DECAY_PER_DAY * daysSinceLogin;
      let healthLoss = HEALTH_DECAY_PER_DAY * daysSinceLogin;

      const newHunger = Math.max(0, prev.hunger - hungerLoss);
      const newHappiness = Math.max(0, prev.happiness - happinessLoss);

      // Extra health decay when starving
      const starvingDays = newHunger === 0 ? Math.max(0, daysSinceLogin - Math.floor(prev.hunger / HUNGER_DECAY_PER_DAY)) : 0;
      healthLoss += EXTRA_HEALTH_DECAY_WHEN_STARVING * starvingDays;
      // Additional health decay when very unhappy (sadness hurts health)
      const unhappyDays = newHappiness < 20 ? Math.max(0, daysSinceLogin - Math.floor((prev.happiness - 20) / HAPPINESS_DECAY_PER_DAY)) : 0;
      healthLoss += 10 * unhappyDays;
      const newHealth = Math.max(0, prev.health - healthLoss);
      const isAlive = newHealth > 0;

      return {
        ...prev,
        hunger: newHunger,
        happiness: newHappiness,
        health: newHealth,
        isAlive,
        lastLogin: today,
        totalDaysAlive: isAlive ? prev.totalDaysAlive + daysSinceLogin : prev.totalDaysAlive,
      };
    });
  }, [update]);

  // Auto-check on load
  useEffect(() => {
    if (loaded && petState) {
      checkPetStatus();
    }
  // checkPetStatus is stable (memoized with [update])
  }, [loaded, checkPetStatus]);

  // ── Actions ─────────────────────────────────────────────────────────────────

  const feedPet = useCallback(
    (spendTokensFn: (amount: number) => boolean): boolean => {
      const cost = PET_ACTIONS.feed.cost;
      if (!spendTokensFn(cost)) return false;
      update((prev) => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + PET_ACTIONS.feed.hungerGain),
        happiness: Math.min(100, prev.happiness + PET_ACTIONS.feed.happinessGain),
        lastFed: getToday(),
      }));
      return true;
    },
    [update]
  );

  const playWithPet = useCallback(
    (spendTokensFn: (amount: number) => boolean): boolean => {
      const cost = PET_ACTIONS.play.cost;
      if (!spendTokensFn(cost)) return false;
      update((prev) => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + PET_ACTIONS.play.happinessGain),
        health: Math.min(100, prev.health + PET_ACTIONS.play.healthGain),
        lastPlayed: getToday(),
      }));
      return true;
    },
    [update]
  );

  const giveMedicine = useCallback(
    (spendTokensFn: (amount: number) => boolean): boolean => {
      const cost = PET_ACTIONS.medicine.cost;
      if (!spendTokensFn(cost)) return false;
      update((prev) => ({
        ...prev,
        health: Math.min(100, prev.health + PET_ACTIONS.medicine.healthGain),
      }));
      return true;
    },
    [update]
  );

  const revivePet = useCallback(
    (method: "tokens" | "daily", spendTokensFn?: (amount: number) => boolean): boolean => {
      if (method === "tokens") {
        if (!spendTokensFn?.(PET_ACTIONS.reviveTokens.cost)) return false;
        update((prev) => ({
          ...prev,
          isAlive: true,
          health: 50,
          happiness: 50,
          hunger: 50,
          lastLogin: getToday(),
          lastFed: getToday(),
          lastPlayed: getToday(),
          revivalDaysCompleted: 0,
          revivalStartDate: null,
        }));
        return true;
      } else {
        // Start daily revival process
        update((prev) => ({
          ...prev,
          revivalStartDate: getToday(),
          revivalDaysCompleted: 1,
          lastLogin: getToday(),
        }));
        return true;
      }
    },
    [update]
  );

  const renamePet = useCallback(
    (name: string) => {
      update((prev) => ({ ...prev, name: name.slice(0, 20) }));
    },
    [update]
  );

  // ── Cosmetic System ─────────────────────────────────────────────────────────

  const buyItem = useCallback(
    (itemId: string, spendTokensFn: (amount: number) => boolean): boolean => {
      const item = OUTFIT_ITEMS.find((i) => i.id === itemId);
      if (!item) return false;
      if (petState?.ownedItems.includes(itemId)) return false; // already owned
      if (!spendTokensFn(item.cost)) return false;
      update((prev) => ({
        ...prev,
        ownedItems: [...prev.ownedItems, itemId],
      }));
      return true;
    },
    [update, petState?.ownedItems]
  );

  const equipItem = useCallback(
    (itemId: string) => {
      const item = OUTFIT_ITEMS.find((i) => i.id === itemId);
      if (!item) return;
      update((prev) => {
        if (!prev.ownedItems.includes(itemId)) return prev;
        return {
          ...prev,
          equippedItems: { ...prev.equippedItems, [item.category]: itemId },
        };
      });
    },
    [update]
  );

  const unequipItem = useCallback(
    (slot: OutfitCategory) => {
      update((prev) => {
        const newEquipped = { ...prev.equippedItems };
        delete newEquipped[slot];
        return { ...prev, equippedItems: newEquipped };
      });
    },
    [update]
  );

  // ── Companion XP ────────────────────────────────────────────────────────────

  const gainCompanionXP = useCallback(
    (amount: number) => {
      update((prev) => {
        const newXP = (prev.companionXP ?? 0) + amount;
        const newLevel = getCompanionLevel(newXP);
        return { ...prev, companionXP: newXP, companionLevel: newLevel };
      });
    },
    [update]
  );

  /** Award companion XP once per day when the daily goal is met */
  const awardDailyGoalXP = useCallback(() => {
    const today = getToday();
    update((prev) => {
      if (prev.lastCompanionXPDate === today) return prev; // already awarded today
      const newXP = (prev.companionXP ?? 0) + 50;
      const newLevel = getCompanionLevel(newXP);
      return { ...prev, companionXP: newXP, companionLevel: newLevel, lastCompanionXPDate: today };
    });
  }, [update]);

  // ── Initialize pet when type is discovered ─────────────────────────────────

  const initializePet = useCallback(
    (type: number) => {
      if (petState) return; // already exists
      const newPet = createDefaultPetState(type);
      setPetState(newPet);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPet));
      } catch {}
    },
    [petState]
  );

  return {
    petState,
    loaded,
    // Actions
    feedPet,
    playWithPet,
    giveMedicine,
    revivePet,
    renamePet,
    // Companion XP
    gainCompanionXP,
    awardDailyGoalXP,
    // Cosmetics
    buyItem,
    equipItem,
    unequipItem,
    // Setup
    initializePet,
    checkPetStatus,
  };
}
