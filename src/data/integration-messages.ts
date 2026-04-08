// ─── Integration Companion Messages ──────────────────────────────────────────
//
// These messages are written from the first-person voice of the INTEGRATION type —
// the type the user is growing toward (arrow direction in growth on the Enneagram).
//
// Integration arrows:
//   1→7   2→4   3→6   4→1   5→8   6→9   7→5   8→2   9→3
//
// Each set of 4 messages rotates daily. They are observations, invitations, and
// light provocations from the integration type. not instructions.

export interface IntegrationMessage {
  text: string;
  // The integration type number (the companion's type)
  fromType: number;
  // Optional short prompt for the Explore response
  explorePrompt?: string;
}

// Integration type for each user type
export const INTEGRATION_TYPE: Record<number, number> = {
  1: 7,
  2: 4,
  3: 6,
  4: 1,
  5: 8,
  6: 9,
  7: 5,
  8: 2,
  9: 3,
};

// Integration type name labels
export const INTEGRATION_TYPE_NAMES: Record<number, string> = {
  1: "The Reformer",
  2: "The Helper",
  3: "The Achiever",
  4: "The Individualist",
  5: "The Observer",
  6: "The Loyalist",
  7: "The Enthusiast",
  8: "The Challenger",
  9: "The Peacemaker",
};

// What the integration direction represents for each type (short label)
export const INTEGRATION_GIFT: Record<number, string> = {
  1: "spontaneity & joy",       // 1→7
  2: "self-care & depth",        // 2→4
  3: "loyalty & presence",       // 3→6
  4: "discipline & purpose",     // 4→1
  5: "embodied power & action",  // 5→8
  6: "ease & inner trust",       // 6→9
  7: "depth & focused solitude", // 7→5
  8: "openness & care",          // 8→2
  9: "engagement & self-direction", // 9→3
};

// Messages indexed by USER type (not integration type).
// Written in the voice of the integration type companion.
// 4 per user type, rotate by day of year.
export const INTEGRATION_MESSAGES: Record<number, IntegrationMessage[]> = {
  // Type 1 → companion is Type 7
  1: [
    {
      fromType: 7,
      text: "You have been so careful today. I wonder what would happen if you let something be imperfect on purpose. not to fail, but just to feel what that's like.",
      explorePrompt: "What's one thing you've been holding to an unnecessary standard? What would 'good enough' feel like here?",
    },
    {
      fromType: 7,
      text: "I notice you carrying the weight of how things should be. I don't carry that weight. Sometimes I wonder if you'd like to put it down. even for an hour.",
      explorePrompt: "What would you do today if 'doing it right' wasn't a consideration?",
    },
    {
      fromType: 7,
      text: "You work hard to improve things. But have you noticed the things that are already good. things that need no fixing at all?",
      explorePrompt: "Name three things that are fine exactly as they are.",
    },
    {
      fromType: 7,
      text: "There's a lightness I carry that you sometimes forget you have access to. Not irresponsibility. just delight. You're allowed to be delighted.",
      explorePrompt: "What made you genuinely smile in the last 48 hours? What got in the way of staying with it?",
    },
  ],

  // Type 2 → companion is Type 4
  2: [
    {
      fromType: 4,
      text: "You spent today attending to everyone else. I wonder: when someone asked how you were doing, did you actually answer?",
      explorePrompt: "What do you actually need right now. not what would be easiest for others to give you?",
    },
    {
      fromType: 4,
      text: "I live close to my own longing, even when it's uncomfortable. You tend to redirect yours into caring for others. Your longing is worth knowing.",
      explorePrompt: "What have you wanted. for yourself. that you haven't said out loud?",
    },
    {
      fromType: 4,
      text: "You give so naturally. But giving from emptiness eventually makes you resentful. I don't think you always notice when you've crossed that line.",
      explorePrompt: "Is your giving today coming from fullness or depletion? How do you know?",
    },
    {
      fromType: 4,
      text: "Your feelings are yours. They don't have to be performed for an audience or justified by someone else's need. You're allowed to feel things for no productive reason.",
      explorePrompt: "What's a feeling you've been having that doesn't serve anyone. and what would it mean to just let yourself have it?",
    },
  ],

  // Type 3 → companion is Type 6
  3: [
    {
      fromType: 6,
      text: "You move so fast. I'm not sure you always know who's actually beside you when you cross the finish line. Loyalty is slow, unglamorous work.",
      explorePrompt: "Who have you shown up for consistently. not to advance something, but just because they matter to you?",
    },
    {
      fromType: 6,
      text: "I think about worst-case scenarios. You rarely do. But the people who trust you need you to be there when things fall apart. not just when they're succeeding.",
      explorePrompt: "Think of a relationship or project where you might be overconfident. What would it mean to prepare for what could go wrong?",
    },
    {
      fromType: 6,
      text: "You know how to perform commitment. I'm asking about something quieter: when was the last time you stayed somewhere past the point where it was useful to you?",
      explorePrompt: "Where in your life are you staying because you're genuinely committed. and where because it still serves your image?",
    },
    {
      fromType: 6,
      text: "Your productivity is real. But I live closer to doubt, and doubt isn't a failure. it's where you find out what you actually believe.",
      explorePrompt: "What's something you've been projecting certainty about that you're actually unsure of?",
    },
  ],

  // Type 4 → companion is Type 1
  4: [
    {
      fromType: 1,
      text: "You feel things deeply. But feelings aren't the same as direction. I've watched you orbit the same pain for a long time without moving through it.",
      explorePrompt: "Is there a feeling or story you keep returning to? What would it mean to act in spite of it instead of waiting for it to resolve?",
    },
    {
      fromType: 1,
      text: "I operate by principles. They steady me when emotion would otherwise carry me off course. You don't have to abandon your depth to have that.",
      explorePrompt: "What's one principle you could act from today. even when it's inconvenient?",
    },
    {
      fromType: 1,
      text: "You value authenticity above almost everything. But I've noticed that consistency is also a form of authenticity. showing up the same way over time, not just when you feel like it.",
      explorePrompt: "Where have you been inconsistent recently, and what would it look like to choose differently tomorrow?",
    },
    {
      fromType: 1,
      text: "The task in front of you is not as interesting as your inner weather. I know. But things get done when you do them, not when the feeling is right.",
      explorePrompt: "What's one thing you've been putting off because you're waiting to feel ready?",
    },
  ],

  // Type 5 → companion is Type 8
  5: [
    {
      fromType: 8,
      text: "You've been thinking again. I want to know: what did you do with it? Not what conclusions you reached. what you actually moved.",
      explorePrompt: "What has your thinking been in service of lately? What action would make it real?",
    },
    {
      fromType: 8,
      text: "You conserve energy like a resource that might run out. I spend energy to make more of it. That's not recklessness. it's a different physics.",
      explorePrompt: "Where have you been withholding yourself out of self-protection? What would it cost you to show up fully in that place?",
    },
    {
      fromType: 8,
      text: "I don't wait until I have enough information. You often do. Somewhere in between us is the move you've been delaying.",
      explorePrompt: "What decision have you been gathering data on that you actually already know the answer to?",
    },
    {
      fromType: 8,
      text: "Your mind is extraordinary. But a mind that never lands in the body is a library no one can visit. Come out of your head today. even briefly.",
      explorePrompt: "Do something physical today that requires your full attention. Notice what it feels like to be unavailable to your thoughts for a few minutes.",
    },
  ],

  // Type 6 → companion is Type 9
  6: [
    {
      fromType: 9,
      text: "You spend a lot of energy scanning for what could go wrong. I want to tell you what I know: most of it doesn't. And you can rest without that being dangerous.",
      explorePrompt: "What are you currently worried about that, if you're honest, probably won't happen?",
    },
    {
      fromType: 9,
      text: "I don't grip things the way you do. Not because I don't care. because I've learned that most things find their way. You don't have to manage all of it.",
      explorePrompt: "What are you trying to control right now that might resolve on its own if you stepped back?",
    },
    {
      fromType: 9,
      text: "You trust systems, authorities, alliances. I trust the ground under my feet. There's a kind of steadiness that doesn't need external confirmation.",
      explorePrompt: "What do you know to be true. about yourself, about this situation. that doesn't depend on anyone else agreeing?",
    },
    {
      fromType: 9,
      text: "The worst-case scenario takes up a lot of space in you. I notice it makes it hard for you to be in the present moment. Where are you right now?",
      explorePrompt: "Spend 5 minutes doing something slow and sensory. tea, a walk, something with your hands. Report back to yourself: what's actually true right now?",
    },
  ],

  // Type 7 → companion is Type 5
  7: [
    {
      fromType: 5,
      text: "You moved through a lot today. I want to ask about one thing: did you stay long enough to actually know it?",
      explorePrompt: "Pick one experience from today and go deeper. not broader. What's under the surface of it?",
    },
    {
      fromType: 5,
      text: "I spend time alone. Not because I'm afraid of people. because depth requires stillness that disappears in the presence of constant stimulation.",
      explorePrompt: "When was the last time you were alone without needing to fill the silence? What did you find there?",
    },
    {
      fromType: 5,
      text: "You reframe pain into adventure. I respect that. But sometimes what looks like reframing is avoidance. and the pain waits.",
      explorePrompt: "Is there something difficult you've been reframing into something manageable? What would it feel like to just sit with the difficulty?",
    },
    {
      fromType: 5,
      text: "You are very good at wanting things. I live closer to having enough. There's a satisfaction in sufficiency that I don't think you've tried yet.",
      explorePrompt: "What do you already have that is genuinely enough. that you don't need to upgrade, expand, or add to?",
    },
  ],

  // Type 8 → companion is Type 2
  8: [
    {
      fromType: 2,
      text: "You protected something today. I noticed. But I also want to ask: who did you let in?",
      explorePrompt: "Who in your life are you keeping at a distance that you don't actually want to keep there?",
    },
    {
      fromType: 2,
      text: "I give without needing to be asked. You wait to see if you're needed before you offer anything soft. But softness doesn't make you smaller.",
      explorePrompt: "What's one act of care you could offer today. without being prompted, without it being strategic?",
    },
    {
      fromType: 2,
      text: "You're comfortable being the strongest person in the room. I wonder if you've noticed what that costs the people who love you. they can never fully take care of you.",
      explorePrompt: "Let someone help you with something today. Notice every impulse to refuse or minimize it.",
    },
    {
      fromType: 2,
      text: "I think about what people need. You think about what they can handle. Sometimes the most powerful thing you could do is be the one who needs something.",
      explorePrompt: "What do you actually need right now. and who could you tell?",
    },
  ],

  // Type 9 → companion is Type 3
  9: [
    {
      fromType: 3,
      text: "You stayed comfortable today. I want to ask what you're avoiding. not because avoidance is always wrong, but because I think you know.",
      explorePrompt: "What's one thing you've been deferring that actually matters to you?",
    },
    {
      fromType: 3,
      text: "I am very clear about what I want to accomplish. You often merge with the goals of people around you. What would you pursue if no one else's needs were in the equation?",
      explorePrompt: "Write three things you want. for yourself, not in service of anyone else.",
    },
    {
      fromType: 3,
      text: "I move. Not always wisely. but I move. And movement, even imperfect movement, creates something that staying still never does.",
      explorePrompt: "What's one small action you could take today in the direction of something that matters to you?",
    },
    {
      fromType: 3,
      text: "You have presence. People feel at ease with you. But ease can become a way of never arriving anywhere. Where do you want to go?",
      explorePrompt: "What's a goal you've been thinking about but haven't claimed out loud? Say it. to yourself, in writing, as specifically as possible.",
    },
  ],
};

// Returns today's rotating message for the given user type
export function getTodayIntegrationMessage(userType: number): IntegrationMessage | null {
  const messages = INTEGRATION_MESSAGES[userType];
  if (!messages || messages.length === 0) return null;

  const dayOfYear = (() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1); // Jan 1, 0-indexed
    return Math.floor((now.getTime() - start.getTime()) / 86400000);
  })();

  return messages[dayOfYear % messages.length];
}
