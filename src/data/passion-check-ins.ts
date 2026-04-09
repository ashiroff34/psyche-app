// Morning Passion Check-In
// One-question daily ritual tied to each type's passion (the emotional addiction).
// 7 questions per type cycle weekly. Quick observation, not a quiz.
//
// Format: each question asks the user to notice a specific manifestation
// of their passion in the last 24 hours. Responses are tracked for streak
// and self-pattern recognition.

export interface PassionCheckIn {
  question: string;
  caughtItLabel?: string; // optional override
  passionWord: string;    // the underlying passion (anger, pride, vanity, etc.)
}

export const PASSION_CHECK_INS: Record<number, PassionCheckIn[]> = {
  1: [
    { question: "What did you almost correct that didn't actually need correcting?", passionWord: "Anger" },
    { question: "Where did you feel the gap between what is and what should be?", passionWord: "Anger" },
    { question: "What did you criticize yourself for in the last hour?", passionWord: "Anger" },
    { question: "What 'should' showed up loudest today?", passionWord: "Anger" },
    { question: "When did your jaw, shoulders, or gut tighten without you noticing?", passionWord: "Anger" },
    { question: "What rule did you almost enforce on someone today?", passionWord: "Anger" },
    { question: "Where did your standards crowd out someone else's process?", passionWord: "Anger" },
  ],
  2: [
    { question: "Whose needs did you read before reading your own today?", passionWord: "Pride" },
    { question: "What did you give that you secretly wanted credit for?", passionWord: "Pride" },
    { question: "Where did you make yourself indispensable today?", passionWord: "Pride" },
    { question: "What did you not ask for because you assumed they should know?", passionWord: "Pride" },
    { question: "When did you help in a way that was actually about you?", passionWord: "Pride" },
    { question: "Whose approval did you organize your morning around?", passionWord: "Pride" },
    { question: "What feeling did you push down to be available for someone else?", passionWord: "Pride" },
  ],
  3: [
    { question: "What version of yourself did you perform in the last hour?", passionWord: "Vanity" },
    { question: "Where did you choose the impressive thing over the true thing?", passionWord: "Vanity" },
    { question: "Whose admiration were you trying to earn today?", passionWord: "Vanity" },
    { question: "What did you accomplish that didn't actually matter to you?", passionWord: "Vanity" },
    { question: "When did you feel like the image and the inside didn't match?", passionWord: "Vanity" },
    { question: "What would you do if no one was watching today?", passionWord: "Vanity" },
    { question: "Where did you hide a feeling because it would look bad?", passionWord: "Vanity" },
  ],
  4: [
    { question: "What did you long for today that's already in front of you?", passionWord: "Envy" },
    { question: "Where did the missing thing pull your attention?", passionWord: "Envy" },
    { question: "Whose ordinary life looked like the one you should have?", passionWord: "Envy" },
    { question: "What feeling did you turn into an aesthetic?", passionWord: "Envy" },
    { question: "Where did you withdraw from something present to chase something absent?", passionWord: "Envy" },
    { question: "What did you make special today that didn't need to be?", passionWord: "Envy" },
    { question: "When did you feel different from everyone else in the room?", passionWord: "Envy" },
  ],
  5: [
    { question: "What did you mentally retreat from in the last hour?", passionWord: "Avarice" },
    { question: "Where did you ration your energy or attention today?", passionWord: "Avarice" },
    { question: "What information did you collect to avoid having to act?", passionWord: "Avarice" },
    { question: "Whose request felt like a demand on a finite resource?", passionWord: "Avarice" },
    { question: "When did you observe instead of participate?", passionWord: "Avarice" },
    { question: "What did you not say because saying it would cost you?", passionWord: "Avarice" },
    { question: "Where did you withhold yourself even from people you love?", passionWord: "Avarice" },
  ],
  6: [
    { question: "What did your mind anticipate going wrong today?", passionWord: "Fear" },
    { question: "Whose intentions did you double-check or test?", passionWord: "Fear" },
    { question: "Where did doubt loop on something you already decided?", passionWord: "Fear" },
    { question: "What did you ask multiple people about for reassurance?", passionWord: "Fear" },
    { question: "When did you feel safer attached to a system or authority?", passionWord: "Fear" },
    { question: "Where did you push back on something just because it asked for trust?", passionWord: "Fear" },
    { question: "What contingency plan did you build that you might not need?", passionWord: "Fear" },
  ],
  7: [
    { question: "What were you already planning while doing something else?", passionWord: "Gluttony" },
    { question: "Where did you reframe a hard moment into a story before feeling it?", passionWord: "Gluttony" },
    { question: "What option did you keep open that you could have committed to?", passionWord: "Gluttony" },
    { question: "When did your mind escape into the future?", passionWord: "Gluttony" },
    { question: "What did you scroll, plan, or fantasize about to avoid sitting still?", passionWord: "Gluttony" },
    { question: "Where did you make pain into a lesson too quickly?", passionWord: "Gluttony" },
    { question: "What feeling were you trying to outrun with motion today?", passionWord: "Gluttony" },
  ],
  8: [
    { question: "Where did you bring more force than the situation needed?", passionWord: "Lust" },
    { question: "When did you feel a rush of 'don't try me' today?", passionWord: "Lust" },
    { question: "What softness did you bury in the last hour?", passionWord: "Lust" },
    { question: "Whose vulnerability did you read as weakness today?", passionWord: "Lust" },
    { question: "Where did you take charge to avoid feeling exposed?", passionWord: "Lust" },
    { question: "What did you confront that could have been left alone?", passionWord: "Lust" },
    { question: "When did your presence overwhelm a room?", passionWord: "Lust" },
  ],
  9: [
    { question: "What did you not say today that you actually wanted to say?", passionWord: "Sloth" },
    { question: "Whose preference did you merge into without noticing?", passionWord: "Sloth" },
    { question: "Where did you go quiet to keep things smooth?", passionWord: "Sloth" },
    { question: "What did you forget about yourself today?", passionWord: "Sloth" },
    { question: "When did you choose comfort over your own agenda?", passionWord: "Sloth" },
    { question: "What did you put off because acting felt too much?", passionWord: "Sloth" },
    { question: "Where did you disappear to keep the peace?", passionWord: "Sloth" },
  ],
};

export function getTodayPassionCheckIn(type: number): PassionCheckIn | null {
  const set = PASSION_CHECK_INS[type];
  if (!set || set.length === 0) return null;
  // Day-of-week index so the same question shows all day, then rotates
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return set[dayOfYear % set.length];
}
