// Wound / Passion / Fixation / Armor framework
// Plain-language descriptions grounded in Naranjo, Ichazo, and Riso-Hudson
// but written for accessibility, not academia.

export interface WPFA {
  wound: string;
  passion: string;
  fixation: string;
  armor: string;
}

export const WPFA_DEFINITIONS = {
  wound: "What happened early that made you decide the world works a certain way. Not necessarily one big trauma — more like a conclusion you reached so early you don't even remember reaching it.",
  passion: "The feeling that conclusion left you with that you've been chasing or running from ever since. It's so constant it doesn't even feel like a feeling anymore.",
  fixation: "The thought that keeps the feeling making sense. The story your brain tells on loop that makes the whole thing feel logical rather than like a pattern you're stuck in.",
  armor: "Everything you built on top of all of that. Your personality, your habits, your strengths even. It's real, it's yours, but it was built to protect something rather than to express something.",
};

export const TYPE_WPFA: Record<number, WPFA> = {
  1: {
    wound: "I am only safe if I am good, correct, and beyond criticism.",
    passion: "Constant low hum of anger at everything that falls short — including themselves.",
    fixation: "Brain runs the comparison between what is and what should be on loop, automatically.",
    armor: "The perfectionist. Highest standards in the room. Holds themselves to it hardest.",
  },
  2: {
    wound: "I am only lovable if I am needed.",
    passion: "Pride in being the one who gives and is depended on — masks terror of own needs.",
    fixation: "Brain constantly scans every room for what people need and how to provide it.",
    armor: "The helper. Shows up for everyone. Quietly resents no one shows up the same way back.",
  },
  3: {
    wound: "I am only lovable if I am succeeding.",
    passion: "Vanity — deep replacement of actual identity with whatever image gets the most approval.",
    fixation: "Brain constantly manages perception, constructs the version that lands best in any room.",
    armor: "The achiever. Always on, always impressive. No idea who they are when the room is empty.",
  },
  4: {
    wound: "Something is fundamentally missing in me that everyone else has naturally.",
    passion: "Envy — chronic painful awareness of the gap between who they are and who they feel they should be.",
    fixation: "Brain keeps returning to what's absent, what's lost, what's longed for.",
    armor: "The depth, the aesthetic intensity. Turns pain into something beautiful to make it mean something.",
  },
  5: {
    wound: "The world is too demanding and I don't have enough inside to meet it.",
    passion: "Avarice — hoarding the self, withholding presence because there might not be enough to go around.",
    fixation: "Brain keeps rationing — calculating what can be given and what needs to be kept back.",
    armor: "The observer. Understands everything deeply from a safe distance. Only comes out when fully resourced.",
  },
  6: {
    wound: "The world is not safe and I cannot trust my own perception of it.",
    passion: "Fear — constant background hum of threat assessment. What could go wrong. Who can be trusted.",
    fixation: "Brain keeps doubting itself, seeking confirmation, testing the ground before every step.",
    armor: "Either the loyal rule-follower who finds safety in systems, or the counterphobic rebel who attacks the threat first.",
  },
  7: {
    wound: "What I need won't be there when I need it, so I have to generate it myself.",
    passion: "Gluttony — insatiable hunger for experience and possibility. Stopping means feeling what's underneath.",
    fixation: "Brain lives in the future, always planning the next scenario to avoid present pain.",
    armor: "The enthusiast. Reframes everything into a lesson or story. Makes pain look like growth before they even feel it.",
  },
  8: {
    wound: "Vulnerability gets you hurt. The world takes from the weak. I will never be weak.",
    passion: "Lust — excess of intensity, aggressive aliveness, needs to feel everything at full volume.",
    fixation: "Brain always tracking power and violation — who has it, who's using it wrong.",
    armor: "The protector. Buried softness completely. Leads with force because force kept them safe when tenderness didn't.",
  },
  9: {
    wound: "My presence and needs create problems. The safest thing is to disappear.",
    passion: "Sloth — deep numbing of own desire and agenda, chronic forgetting of what they actually want.",
    fixation: "Brain drifts toward whatever keeps things comfortable, away from asserting own presence.",
    armor: "The peacemaker. Everyone loves them, no one really knows them. Loses the thread of themselves adapting to others.",
  },
};

// Center-level descriptions (for triage questions)
export const CENTER_WPFA = {
  gut: {
    emotion: "Anger",
    plain: "Gut types (1, 8, 9) share a visceral relationship with anger — whether they redirect it inward, express it outward, or bury it completely. Their wound is about autonomy: being controlled, being bad, or being invisible.",
  },
  heart: {
    emotion: "Shame",
    plain: "Heart types (2, 3, 4) share a deep uncertainty about their own worth. Their wound is about identity: Am I lovable? Am I enough? Do I even exist without the performance?",
  },
  head: {
    emotion: "Fear",
    plain: "Head types (5, 6, 7) share a background anxiety about safety and certainty. Their wound is about adequacy: Do I have enough inside to handle what's coming? Can I trust what I think I know?",
  },
};
