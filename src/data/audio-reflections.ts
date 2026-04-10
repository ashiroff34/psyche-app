// Audio Reflections
//
// Type-specific reflection scripts designed to be read aloud via the
// browser's Web Speech API (SpeechSynthesis). Each reflection is written
// in second-person ("You...") to feel like someone speaking directly to
// the listener. ~120,150 words each, so reading time is ~45,60 seconds
// at normal speech rate.
//
// Scripts are written in the voice of a thoughtful coach, not a
// meditation teacher, not a therapist, just a steady voice naming
// patterns with care.

export interface AudioReflection {
  title: string;
  duration: string;  // estimated read time
  script: string;    // read aloud
  theme: string;     // one-word emotional anchor
}

export const AUDIO_REFLECTIONS: Record<number, AudioReflection> = {
  1: {
    title: "For the one who holds the standard",
    duration: "≈1 minute",
    theme: "enough",
    script: `Take a breath. Notice the critic in the room, the voice that's been tracking everything you did today, measuring it against what it should have been. That voice is doing its job. It thinks it's protecting you. You don't have to fight it. You just have to know it's there, and know it isn't the whole of you. Somewhere underneath the standard is the person who wanted to do the thing in the first place. Not to be correct. Just because it mattered. Come back to that person for a moment. Let good enough be good enough. The world does not need you to be perfect. It needs you to be here.`,
  },
  2: {
    title: "For the one who gives without asking",
    duration: "≈1 minute",
    theme: "permission",
    script: `Take a breath. Notice how many people you carried today. Notice how you read every room, anticipated every need, showed up before anyone had to ask. That attunement is real, it's a gift. But it has a cost, and the cost is that you learned to look outside yourself before looking in. So for the next minute, you are allowed to be the one receiving. Not helping. Not earning. Just here. What do you actually need right now? Not what would be useful to say. What's true. Let the answer come. Let it matter. You don't have to give today to be worthy of rest.`,
  },
  3: {
    title: "For the one who's always on",
    duration: "≈1 minute",
    theme: "unperformed",
    script: `Take a breath. Notice that you are not performing right now. No one is watching, no one is grading, no one needs a version of you that lands well. It's just you. That's a stranger feeling than it should be, isn't it? The self that shows up when the room is empty is the self you've spent years building around, optimizing for approval, tuning for the moment. But that self under the performance, it's still there. It's been waiting. It's fine if you can't find it immediately. Notice the space where it would be. That's enough for today. Being unobserved is not the same as failing. It's where you actually live.`,
  },
  4: {
    title: "For the one who feels too much",
    duration: "≈1 minute",
    theme: "presence",
    script: `Take a breath. You've been holding a feeling today, probably more than one, probably one that didn't have a clear name. That's not a problem. That's how you know you're paying attention. Most people walk past what you stay with. But notice this: the feeling is pointing at something, and sometimes the pointing is more useful than going inside the feeling itself. What is the feeling asking you to see? Not what is it expressing, what is it for? Let it speak briefly, and then let it rest. You don't have to perform the depth. You already are the depth. You're allowed to let something be enough without making it beautiful.`,
  },
  5: {
    title: "For the one who protects their inner world",
    duration: "≈1 minute",
    theme: "emergence",
    script: `Take a breath. You've been doing the thing you do, rationing yourself carefully, watching from a step back, deciding what's worth coming out for. That's not avoidance. That's how you've kept something important alive. But notice: the world did not take everything from you today. You still have enough. Maybe more than enough. For a moment, consider what it would feel like to come all the way into the room. Not to give everything. Just to be present without the calculation running underneath. The mind is safe. The body is safe. You're allowed to show up without needing to manage how much of you is visible.`,
  },
  6: {
    title: "For the one who's been scanning for threat",
    duration: "≈1 minute",
    theme: "ground",
    script: `Take a breath. Notice the background hum of vigilance, the part of your mind that's been rehearsing what could go wrong, testing the ground, checking the exits. That part is not paranoid. It's the part that has kept you alive, kept your people safe, stayed loyal when other people walked away. But it doesn't need to work right now. Right now, in this moment, nothing is asking you to prepare for anything. You can set down the watch for sixty seconds. The ground will hold. The people you trust are still there. Your perception is better than you've been giving it credit for. Let one thing be okay without needing to check it.`,
  },
  7: {
    title: "For the one who's always reaching forward",
    duration: "≈1 minute",
    theme: "stillness",
    script: `Take a breath. Notice how fast your mind wants to move, the next plan, the next idea, the thing that would be more interesting than this. That's not a flaw. That's the engine that makes your life full. But notice: the engine is running because standing still feels like something. Don't run from that something. Just for a minute, let the next thing wait. What's underneath the motion right now? You don't have to fix it. You don't have to reframe it into a lesson. Just let it exist. The stillness won't trap you. It will give you something the movement couldn't, the chance to know what you actually want, not just what's next.`,
  },
  8: {
    title: "For the one who carries everyone",
    duration: "≈1 minute",
    theme: "softness",
    script: `Take a breath. You have spent your day being strong, protecting what matters, pushing back where it needed pushing, taking up the space other people wouldn't. That's not a mask. That's real. But the armor is not the whole of you, and you know that. Underneath is something you protect more fiercely than anything else because it is more precious than anything else. Not weakness. Tenderness. For a minute, let the armor rest. Nothing can get in unless you let it in. The people you care about are safe. You are allowed to be soft without losing anything. That softness is the thing you've been protecting all along.`,
  },
  9: {
    title: "For the one who kept the peace",
    duration: "≈1 minute",
    theme: "voice",
    script: `Take a breath. Notice how much of today you spent merging with what was needed, adapting, smoothing, going along. That's not nothing. It's a real gift, and the people around you felt it. But notice this question: what did you actually want today? Not what was easiest. Not what would keep things smooth. What did you want. Let the answer come slowly. You're allowed to want things. You're allowed to take up space in your own life. The peace you're looking for is not the absence of your voice. It's the peace that comes when your voice is in the room along with everyone else's.`,
  },
};

export function getAudioReflection(type: number): AudioReflection | null {
  return AUDIO_REFLECTIONS[type] ?? null;
}
