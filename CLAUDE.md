# Thyself — Project Instructions for Claude

## Strategic Context (read first)

**Goal:** Acquire within 18–30 months. Primary target: The Myers-Briggs Company ($8–35M). Secondary: Duolingo ($30–150M at 500K+ MAU), Truity ($3–15M).

**Guiding question for every decision:** Does this make Thyself more legible, measurable, or defensible to an acquirer's diligence team? If no, defer.

**Dev priority order** (founder-directed, April 2026):
1. Analytics (PostHog) — first, always
2. Streak mechanic (Supabase user_streaks, StreakSaver, push notifications)
3. Proprietary assessments ("Thyself Type Index" + "Thyself Enneagram Assessment")
4. Compatibility feature (relationships table, invite deep links, shareable cards)
5. Journal (encrypted client-side, journal_prompts, RLS)
6. SEO landing pages (1,000 pages by month 12)
7. Paywall (RevenueCat: $7.99/mo, $49.99/yr, $149.99 lifetime)

**TRADEMARK WARNING — non-negotiable:**
- NEVER use MBTI®, Myers-Briggs®, or RHETI® in assessment names, UI copy, or branding
- Use "Thyself Type Index" (16-type) and "Thyself Enneagram Assessment" (9-type) instead
- Violation is an existential problem for any acquisition deal

**No new features rule:** Polish, fix, refactor only. Do NOT build autonomously from the priority list above — surface to Arianna and await explicit instruction per priority.

**Founder context:** Solo founder. Pfizer internship May–Aug 2026 (limited dev time). Prioritize ruthlessly.

---

## Content Accuracy & Learning Standards

### Psychological Content Must Be Accurate

- **Enneagram**: All type descriptions, instinctual subtypes (sp/sx/so), tritypes, wing theory, integration/disintegration lines, and growth tips must reflect established sources — primarily Riso & Hudson (*Wisdom of the Enneagram*), Claudio Naranjo, and Don Riso's work. Do not invent type traits or misattribute motivations.
- **Jungian / Cognitive Functions**: All descriptions of cognitive functions (Ne, Ni, Se, Si, Te, Ti, Fe, Fi), MBTI types, and shadow functions must align with Carl Jung's original theory (*Psychological Types*, 1921) and the work of Isabel Briggs Myers. Do not conflate MBTI with pop-psychology stereotypes.
- **No pseudoscience framing**: Present these frameworks as psychological models and self-knowledge tools, not as scientifically validated personality tests. Avoid claiming predictive accuracy or making definitive claims about someone's behaviour based on type alone.
- **Double-check before writing**: If unsure whether a fact about a type, function, or instinct is accurate, do not guess — flag it or look it up.

### Learning Design Follows Duolingo Principles

- **Start simple**: Begin with recall-level questions (Tier 2) before application (Tier 3) and analysis (Tier 4). Never surface hard questions to beginners.
- **Spaced repetition mindset**: Revisit core concepts across multiple sessions rather than front-loading everything in one go.
- **Positive reinforcement**: Celebrate progress (streaks, XP, tokens) — never shame the user for wrong answers. Feedback should feel encouraging.
- **Bite-sized**: Each lesson node should be completable in under 5 minutes.
- **Immediate feedback**: Always explain *why* an answer is correct or incorrect — don't just show right/wrong.
- **Progressive difficulty**: Unlock harder questions only after foundational knowledge is demonstrated, mirroring Duolingo's level-gated content model.
