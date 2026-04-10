// Type Wisdom Feed
//
// Curated passages from literature by or about people who share the
// user's type. Not user-generated. Sourced from philosophy, psychology,
// memoir, poetry. Rotating weekly.
//
// Matz & Kosinski 2017: type-matched content produces 40-50% engagement lift.

export interface TypeWisdomEntry {
  text: string;
  source: string;
}

export const TYPE_WISDOM: Record<number, TypeWisdomEntry[]> = {
  1: [
    { text: "Have patience with everything unresolved in your heart and try to love the questions themselves.", source: "Rainer Maria Rilke" },
    { text: "The perfect is the enemy of the good.", source: "Voltaire" },
    { text: "Ring the bells that still can ring. Forget your perfect offering. There is a crack in everything. That's how the light gets in.", source: "Leonard Cohen" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", source: "Ralph Waldo Emerson" },
  ],
  2: [
    { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", source: "Attributed to various contemplative traditions" },
    { text: "The most terrifying thing is to accept oneself completely.", source: "C.G. Jung" },
    { text: "When I loved myself enough, I began leaving whatever wasn't healthy.", source: "Kim McMillen" },
    { text: "Caring for myself is not self-indulgence, it is self-preservation.", source: "Audre Lorde" },
  ],
  3: [
    { text: "Almost everything will work again if you unplug it for a few minutes. Including you.", source: "Anne Lamott" },
    { text: "We are what we pretend to be, so we must be careful about what we pretend to be.", source: "Kurt Vonnegut" },
    { text: "The privilege of a lifetime is to become who you truly are.", source: "C.G. Jung" },
    { text: "How we spend our days is, of course, how we spend our lives.", source: "Annie Dillard" },
  ],
  4: [
    { text: "The wound is the place where the Light enters you.", source: "Rumi" },
    { text: "I must be willing to give up what I am in order to become what I will be.", source: "Albert Einstein" },
    { text: "Perhaps all the dragons in our lives are princesses who are only waiting to see us act, just once, with beauty and courage.", source: "Rainer Maria Rilke" },
    { text: "I am not what happened to me, I am what I choose to become.", source: "C.G. Jung" },
  ],
  5: [
    { text: "The only true wisdom is in knowing you know nothing.", source: "Socrates" },
    { text: "In the middle of difficulty lies opportunity.", source: "Albert Einstein" },
    { text: "Knowledge speaks, but wisdom listens.", source: "Jimi Hendrix" },
    { text: "The mind is not a vessel to be filled, but a fire to be kindled.", source: "Plutarch" },
  ],
  6: [
    { text: "Life shrinks or expands in proportion to one's courage.", source: "Anais Nin" },
    { text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.", source: "Eleanor Roosevelt" },
    { text: "Doubt is not a pleasant condition, but certainty is absurd.", source: "Voltaire" },
    { text: "Security is mostly a superstition. Life is either a daring adventure or nothing.", source: "Helen Keller" },
  ],
  7: [
    { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", source: "Thich Nhat Hanh" },
    { text: "Attention is the rarest and purest form of generosity.", source: "Simone Weil" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", source: "Attributed to contemplative traditions" },
    { text: "Boredom is the dream bird that hatches the egg of experience.", source: "Walter Benjamin" },
  ],
  8: [
    { text: "Vulnerability is the birthplace of love, belonging, joy, courage, empathy, and creativity.", source: "Brene Brown" },
    { text: "Nothing is so strong as gentleness, nothing so gentle as real strength.", source: "Francis de Sales" },
    { text: "The strongest people are not those who show strength in front of us, but those who win battles we know nothing about.", source: "Jonathan Harnisch" },
    { text: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.", source: "Rumi" },
  ],
  9: [
    { text: "Your silence will not protect you.", source: "Audre Lorde" },
    { text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.", source: "Albert Camus" },
    { text: "What you do makes a difference, and you have to decide what kind of difference you want to make.", source: "Jane Goodall" },
    { text: "Until you make the unconscious conscious, it will direct your life and you will call it fate.", source: "C.G. Jung" },
  ],
};

export function getWeeklyWisdom(type: number): TypeWisdomEntry | null {
  const entries = TYPE_WISDOM[type];
  if (!entries?.length) return null;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return entries[week % entries.length];
}
