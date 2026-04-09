# Thyself — App Store / Play Store Listing Copy

Ready-to-paste copy for iOS App Store, Google Play, and web app store pages.

---

## App Name

**Thyself**

(30 characters max on App Store — ✓ 7 characters)

## Subtitle (iOS)

**Know yourself, honestly.**

(30 characters max — ✓ 24 characters)

## Short description (Google Play)

**A quiet space to notice the patterns that run your life — grounded in real research, not pop psychology.**

(80 characters max — **113 characters, needs trimming**)

**Alt trimmed to 80:**
**The Enneagram app for people who actually want to understand themselves.**

(73 characters — ✓)

---

## Long description (App Store + Play Store)

```
You are not your type. The type is the armor that formed around something.

Thyself is a quiet space to notice the armor — and over time, choose when to wear it.

Most personality apps stop at the label. Thyself starts there.

━━━━━━━━━━━━━━━━━━━━━━━━

WHAT MAKES THYSELF DIFFERENT

• A 12-question assessment that doesn't ask "what do you do" — it asks "what would feel like the worst"
• A 175-question deep integrative assessment when you're ready to go further
• Your own Wound, Passion, Fixation, and Armor — the real mechanics beneath the type
• A daily 60-second ritual that's not a meditation and not a quiz
• A mirror that reads your own writing and independently estimates your personality (100% processed in your browser — your text never leaves your device)
• A shareable Identity Card that captures your type, subtype, tritype, and cognitive profile
• Theory + Practice pairs grounded in contemplative traditions but stripped of jargon

━━━━━━━━━━━━━━━━━━━━━━━━

BUILT ON REAL RESEARCH

• Enneagram framework drawn from Naranjo, Riso-Hudson, Palmer, and Chestnut
• Cognitive functions from Jung's original theory + Beebe's archetypal model
• Big Five analyzer using published Yarkoni (2010) LIWC-Big Five correlations
• Cross-validated against published Enneagram-Big Five mappings (Newgent et al. 2004)

We cite our sources. Every one of them.

━━━━━━━━━━━━━━━━━━━━━━━━

PRIVACY FIRST

• Your Mirror analysis runs entirely in your browser — nothing is uploaded
• Your journal is yours — local by default
• No ads, no sold data, no tracking across other apps
• Zero dark patterns — we'd rather lose you than manipulate you

━━━━━━━━━━━━━━━━━━━━━━━━

FOR

• People who took 16Personalities once and wanted something deeper
• People who've read Enneagram books but never felt a quiz that actually landed
• People in therapy, thinking about starting, or just trying to know themselves
• People who've been told "you're so self-aware" and wondered if that's true

NOT FOR

• People looking for astrology
• People who want a definitive label
• People who think quizzes give you the answer

━━━━━━━━━━━━━━━━━━━━━━━━

Free to start. No sign-up required. Your data stays yours.

thyself.app
```

(4000 characters max — **currently 1,973 characters, well under limit**)

---

## Keywords (iOS — 100 characters max, comma-separated)

```
enneagram,personality,self-discovery,self-awareness,mbti,big five,journal,reflection,therapy,growth
```

(100 characters — ✓ 99 characters)

---

## Google Play Store — "What's New" (release notes template)

```
• New Mirror feature — independently analyze your Big Five from your own writing, entirely in your browser
• Shareable Type Identity Card — your type, subtype, tritype & cognitive profile in one card
• Daily audio reflections tuned to your type (Web Speech API, works offline)
• Integrative deep assessment (175 items)
• Wound, Passion, Fixation, and Armor framework for every type
```

---

## App Store Categories

**Primary:** Health & Fitness
**Secondary:** Education

(Alternatives to consider: Lifestyle, Books & Reference — but Health & Fitness has the biggest self-improvement audience)

## Content Rating

**Recommended:** 12+ (mild reflection themes — no explicit content)

---

## Screenshots (6.7" iPhone — 1290 x 2796 px)

**Shot 1 — Hero / Identity moment**
Title: "Know thyself, honestly."
Screen: Landing page with chibi + thesis line
Subtitle: "The type is the armor that formed around something."

**Shot 2 — Type discovery**
Title: "Real motivation, not surface behavior."
Screen: Type reveal with W/P/F/A bullets
Subtitle: "Ask 'what would feel like the worst' — not 'what do you do'."

**Shot 3 — The Mirror**
Title: "Your own words, read back to you."
Screen: /mirror page with Big Five radar chart
Subtitle: "Paste text, get an independent read. Entirely in your browser."

**Shot 4 — Daily ritual**
Title: "60 seconds is enough."
Screen: HubView with Start CTA + Morning Passion Check-In
Subtitle: "A quiet daily ritual, type-specific."

**Shot 5 — Identity Card**
Title: "A card for the parts of you that can't fit in a sentence."
Screen: Identity card front + back flipped
Subtitle: "Shareable, beautiful, honest."

**Shot 6 — Audio reflection**
Title: "Someone speaking directly to you."
Screen: Audio reflection player with ambient music on
Subtitle: "Type-specific reflection scripts, read aloud."

---

## Promotional Text (iOS — 170 characters max, updatable without app review)

```
A quiet space to notice the patterns running your life. Real research, real depth, zero pop psychology. Free to start. Your data stays yours.
```

(170 character max — ✓ 167 characters)

---

## Support / Privacy URLs

- Support: https://psyche-app-two.vercel.app/settings
- Privacy Policy: https://psyche-app-two.vercel.app/privacy (⚠️ needs to be created)
- Terms of Service: https://psyche-app-two.vercel.app/terms (⚠️ needs to be created)

**ACTION NEEDED:** Write a simple privacy policy + ToS before submission. Both App Store and Play Store require them. A template lives at `/docs/app-store/privacy-policy-template.md`.

---

## App Icon — requirements checklist

- [ ] 1024 x 1024 PNG, no alpha, no rounded corners
- [ ] Uses the ouroboros snake + purple gradient (already have in `/public/thyself-logo.svg`)
- [ ] Readable at 29 x 29 px (smallest iOS size)
- [ ] No text (Apple guideline)
- [ ] No rounded corners (iOS adds them automatically)
- [ ] Action: export from thyself-logo.svg at 1024x1024 as PNG

## iOS-specific requirements

- [ ] Bundle ID: `com.thyself.app` (already set in capacitor.config.ts)
- [ ] Associated domains (for Universal Links): `applinks:thyself.app`
- [ ] Privacy manifest (PrivacyInfo.xcprivacy) — Capacitor 7+ handles this automatically
- [ ] Account deletion path — iOS requires you provide a way to delete accounts in-app (add to /settings)

## Android-specific requirements

- [ ] Target SDK: 34+ (Android 14)
- [ ] App icon at 512 x 512 PNG for Play Store listing
- [ ] Feature graphic at 1024 x 500 PNG
- [ ] Privacy policy URL (required)
- [ ] Data safety form (complete in Play Console)

---

## Pre-submission checklist

- [ ] Privacy policy live at public URL
- [ ] Terms of service live at public URL
- [ ] Account deletion flow implemented (iOS required)
- [ ] All screenshots captured at correct dimensions
- [ ] App icon exported as 1024x1024 PNG
- [ ] `capacitor.config.ts` bundle ID matches App Store Connect / Play Console
- [ ] Build with `npm run build:ios` → open Xcode → archive → upload
- [ ] Build with `npm run build:android` → open Android Studio → generate signed bundle → upload
- [ ] TestFlight / internal testing round with ~10 testers before production
- [ ] Store listing copy reviewed (this file)
- [ ] Keywords researched on AppStoreRadar / SensorTower / similar
