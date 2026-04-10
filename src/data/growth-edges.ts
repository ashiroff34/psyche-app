// Growth Edges Inventory
//
// Type-specific growth areas derived from Enneagram literature
// (Riso-Hudson, Chestnut, Naranjo). Users self-report which edges
// they've explored. Feeds from Practice of the Opposite completions.
//
// Burke et al. 2011 meta-analysis: self-monitoring is one of the
// strongest predictors of behavior change.

export interface GrowthEdge {
  id: string;
  label: string;
  description: string;
}

export const TYPE_GROWTH_EDGES: Record<number, GrowthEdge[]> = {
  1: [
    { id: "1-imperfection", label: "Tolerating imperfection", description: "Letting things be good enough without the inner critic demanding more." },
    { id: "1-anger", label: "Acknowledging anger", description: "Recognizing anger as a real emotion, not just 'frustration' or 'standards.'" },
    { id: "1-play", label: "Playfulness without purpose", description: "Doing something purely for fun with no productive value." },
    { id: "1-flexibility", label: "Flexibility in principles", description: "Recognizing that multiple valid approaches exist." },
    { id: "1-self-compassion", label: "Self-compassion", description: "Treating yourself with the gentleness you extend to others." },
    { id: "1-body", label: "Body awareness", description: "Noticing where tension lives and learning to release it." },
  ],
  2: [
    { id: "2-receiving", label: "Receiving without giving back", description: "Accepting help, compliments, or care without reciprocating immediately." },
    { id: "2-needs", label: "Naming your own needs", description: "Saying what you need directly instead of hinting or helping to earn it." },
    { id: "2-alone", label: "Being alone comfortably", description: "Spending time with yourself without orienting toward others." },
    { id: "2-boundaries", label: "Setting boundaries", description: "Saying no without guilt or over-explaining." },
    { id: "2-identity", label: "Identity beyond service", description: "Knowing who you are when no one needs you." },
    { id: "2-pride", label: "Seeing your pride", description: "Recognizing the hidden belief that others need your help specifically." },
  ],
  3: [
    { id: "3-stillness", label: "Stillness without productivity", description: "Resting without calling it 'recharging for more output.'" },
    { id: "3-authenticity", label: "Dropping the image", description: "Letting people see who you are without managing their perception." },
    { id: "3-failure", label: "Sharing a failure", description: "Telling someone about something that didn't work without spinning it." },
    { id: "3-feelings", label: "Feeling your feelings", description: "Staying with an emotion instead of bypassing it with action." },
    { id: "3-intrinsic", label: "Intrinsic motivation", description: "Doing something because it matters, not because anyone will see." },
    { id: "3-listening", label: "Deep listening", description: "Hearing someone without thinking about how you come across." },
  ],
  4: [
    { id: "4-ordinary", label: "Embracing the ordinary", description: "Finding depth in the mundane instead of dismissing it." },
    { id: "4-action", label: "Action before inspiration", description: "Starting something without waiting for the perfect emotional state." },
    { id: "4-comparison", label: "Releasing comparison", description: "Noticing envy without following it into a narrative about your deficiency." },
    { id: "4-equanimity", label: "Emotional equanimity", description: "Feeling deeply without being destroyed by it." },
    { id: "4-belonging", label: "Ordinary belonging", description: "Letting yourself be part of a group without needing to be different within it." },
    { id: "4-gratitude", label: "Present gratitude", description: "Appreciating what is here instead of longing for what is absent." },
  ],
  5: [
    { id: "5-engagement", label: "Engagement over observation", description: "Participating instead of watching from a distance." },
    { id: "5-sharing", label: "Sharing before ready", description: "Offering an unfinished thought or incomplete idea." },
    { id: "5-body", label: "Body presence", description: "Staying in physical sensation instead of retreating to the mind." },
    { id: "5-generosity", label: "Generosity with time/energy", description: "Giving more than you think you can afford." },
    { id: "5-emotion", label: "Emotional access", description: "Feeling emotions in real time instead of analyzing them later." },
    { id: "5-connection", label: "Being reachable", description: "Responding promptly, accepting invitations, showing up." },
  ],
  6: [
    { id: "6-trust", label: "Trusting inner authority", description: "Acting on your own judgment without external validation." },
    { id: "6-uncertainty", label: "Acting in uncertainty", description: "Making decisions with imperfect information." },
    { id: "6-calm", label: "Calm without vigilance", description: "Allowing safety to exist without scanning for threats." },
    { id: "6-courage", label: "Feeling the fear, acting anyway", description: "Moving forward without waiting for the fear to pass." },
    { id: "6-loyalty", label: "Conscious loyalty", description: "Choosing whom to trust deliberately instead of reflexively." },
    { id: "6-body", label: "Grounding in the body", description: "Using physical sensation to counter mental spiraling." },
  ],
  7: [
    { id: "7-staying", label: "Staying with discomfort", description: "Sitting with an unpleasant feeling without escaping or reframing." },
    { id: "7-depth", label: "Depth over breadth", description: "Going deeper into one thing instead of starting something new." },
    { id: "7-boredom", label: "Tolerating boredom", description: "Letting a boring moment exist without filling it." },
    { id: "7-grief", label: "Allowing grief", description: "Letting sadness or loss have space instead of moving past it." },
    { id: "7-commitment", label: "Following through", description: "Completing something even after the excitement fades." },
    { id: "7-limitation", label: "Freedom in constraint", description: "Finding richness within limitations instead of resisting them." },
  ],
  8: [
    { id: "8-vulnerability", label: "Showing vulnerability", description: "Letting someone see the soft part without armor." },
    { id: "8-softness", label: "Leading with softness", description: "Approaching a situation with gentleness instead of force." },
    { id: "8-control", label: "Releasing control", description: "Letting someone else lead without taking over." },
    { id: "8-asking", label: "Asking for help", description: "Requesting support without positioning yourself as strong." },
    { id: "8-patience", label: "Patience with process", description: "Allowing things to unfold without forcing an outcome." },
    { id: "8-tenderness", label: "Tenderness with self", description: "Being gentle with yourself when you are hurting." },
  ],
  9: [
    { id: "9-voice", label: "Speaking your opinion", description: "Stating what you actually think, even if it creates tension." },
    { id: "9-anger", label: "Accessing anger", description: "Feeling and expressing anger as information, not as threat." },
    { id: "9-choosing", label: "Making active choices", description: "Deciding what you want instead of defaulting to what is easy." },
    { id: "9-conflict", label: "Engaging conflict", description: "Entering a disagreement instead of smoothing it over." },
    { id: "9-priority", label: "Self-prioritization", description: "Putting your own needs first without guilt." },
    { id: "9-presence", label: "Full presence", description: "Showing up completely instead of numbing or zoning out." },
  ],
};
