# Rive Pet Animation Spec — Thyself App

This document is the exact blueprint for creating the 9 `.riv` pet files.
Drop finished files into `/public/rive/` — the app picks them up automatically.

---

## Files to create

| File | Pet | Type |
|------|-----|------|
| `pet-1.riv` | Athena | Owl 🦉 |
| `pet-2.riv` | Clover | Bunny 🐰 |
| `pet-3.riv` | Blaze | Phoenix 🐦‍🔥 |
| `pet-4.riv` | Luna | Moon Moth 🪲 |
| `pet-5.riv` | Corvus | Raven 🐦‍⬛ |
| `pet-6.riv` | Scout | Dog 🐕 |
| `pet-7.riv` | Zippy | Hummingbird 🐦 |
| `pet-8.riv` | Ember | Dragon 🐲 |
| `pet-9.riv` | Mochi | Cat 🐱 |

Put them in: `/public/rive/pet-1.riv`, `/public/rive/pet-2.riv`, etc.

---

## State Machine

Name your state machine exactly: **`PetMachine`**

The React code looks for this name. If you name it anything else, the app falls back to PNG sprites.

---

## Inputs (all Number type)

Create these 6 Number inputs on the `PetMachine` state machine:

### `instinct` — which instinct subtype variant to show
| Value | Variant |
|-------|---------|
| 0 | Self-Preservation (sp) |
| 1 | Social (so) |
| 2 | Sexual/Intimate (sx) |

Use this to swap color palette or small visual differences between subtypes.
If you want all 3 subtypes identical, you can ignore this input (just set it up so the state machine accepts it without crashing).

---

### `mood` — pet animation state
| Value | State | When |
|-------|-------|------|
| 0 | Idle | Default, pet is "okay" |
| 1 | Happy | Pet is "happy" or "thriving" |
| 2 | Sad | Pet is "hungry" or "sad" |
| 3 | Hurt | Pet is "sick" |
| 4 | Sleeping | (reserved for future use) |
| 5 | Dead | Pet health = 0 |

---

### `hatIndex` — which hat is equipped
| Value | Hat |
|-------|-----|
| 0 | None (no hat visible) |
| 1 | Crown 👑 |
| 2 | Wizard Hat 🪄 |
| 3 | Flower Crown 🌺 |
| 4 | Santa Hat 🎅 |
| 5 | Cat Ears 😸 |

---

### `outfitIndex` — which outfit/frame is equipped
| Value | Outfit |
|-------|--------|
| 0 | None |
| 1 | Galaxy Frame (indigo → purple → pink) |
| 2 | Golden Aura (amber → yellow glow) |
| 3 | Rainbow Border (full spectrum) |
| 4 | Ice Crystal Frame (cyan → blue) |
| 5 | Shadow Veil (dark grey/purple mist) |

---

### `accessoryIndex` — floating accessory around the pet
| Value | Accessory |
|-------|-----------|
| 0 | None |
| 1 | Sparkle Trail ✨ |
| 2 | Floating Hearts 💕 |
| 3 | Musical Notes 🎵 |
| 4 | Lightning Bolts ⚡ |
| 5 | Star Cluster 🌠 |

---

### `backgroundIndex` — animated background behind the pet
| Value | Background |
|-------|-----------|
| 0 | None (transparent / default) |
| 1 | Sunset (orange-pink) |
| 2 | Northern Lights (green → teal → purple) |
| 3 | Cherry Blossoms (soft pink, falling petals) |
| 4 | Starfield (deep space, twinkling stars) |
| 5 | Forest Glow (emerald, fireflies) |

---

## Layer structure (recommended)

Build your Rive artboard with these layers from bottom to top:

```
[7] Accessory layer    ← floats around the pet, driven by accessoryIndex
[6] Hat layer          ← sits on pet's head, driven by hatIndex
[5] Pet body           ← the character itself, animated by mood
[4] Outfit / aura      ← glow/frame effect around pet, driven by outfitIndex
[3] Background         ← scene behind everything, driven by backgroundIndex
[2] (base/floor)
[1] Canvas
```

---

## Animations to include per pet

Minimum required animations (create as clips in your timeline):

| Clip name | Description |
|-----------|-------------|
| `idle` | Gentle float/bob, blinking. Loops. |
| `happy` | Bouncing or spinning, big eyes. Loops while mood=1. |
| `sad` | Slow droop, ears/head down. Loops while mood=2. |
| `hurt` | Shake/tremble, wincing. Loops while mood=3. |
| `dead` | Limp, tilted, desaturated. Loops while mood=5. |

Optional but great:
- `eat` — plays once when fed (can trigger via a boolean trigger input `onFeed`)
- `play` — plays once when played with (trigger input `onPlay`)
- `revive` — celebration animation when pet is brought back to life

---

## How to set up state machine transitions

1. Create one state per mood value (idle, happy, sad, hurt, dead)
2. Use a transition condition: `mood == [value]` to move between states
3. For outfits/hats/accessories/backgrounds, use **Nested Artboards** or **boolean layers**:
   - Each hat is a nested artboard that's only visible when `hatIndex == [its value]`
   - Same pattern for outfits, accessories, backgrounds

---

## React integration (already done)

The React code in `src/components/RivePet.tsx` automatically:
- Loads `/public/rive/pet-{type}.riv`
- Connects all 6 inputs to the live pet state
- Falls back to the existing PNG chibi sprite if the `.riv` file doesn't exist yet
- Fires `onRiveReady(true)` when Rive loads, which hides the CSS fallback overlays

You don't need to touch any React code — just drop in the `.riv` files.

---

## How to get started in Rive

1. Go to **rive.app** → sign up free
2. Browse **rive.app/community** → search "chibi" or "character" for free rigged base files
3. Fork a file you like, add your outfit layers
4. Name your state machine `PetMachine` and add the 6 inputs above
5. Export as `.riv` and put it in `/public/rive/`

Community files to look for:
- "chibi character creator" — has full interactivity already
- "avatar outfit swap" — shows exactly how to build the layer switching system
- "tamagotchi" / "virtual pet" — mood state machine examples
