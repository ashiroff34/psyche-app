// ─────────────────────────────────────────────────────────────────────────────
// Cognitive Functions Assessment Questions
//
// Methodology:
// - MBTI Form M (Myers-Briggs Type Indicator, Form M) from CAPT — the most
//   validated version with 50+ years of peer-reviewed validity studies.
// - Dario Nardi's neuroscience research (Neuroscience of Personality) which
//   maps EEG patterns to cognitive function usage — providing biological
//   grounding for function descriptions.
// - IPIP (International Personality Item Pool) by Lewis Goldberg — fully
//   open-source, peer-reviewed personality items that map to MBTI dimensions.
//
// Key methodological principles:
// - Form M uses Item Response Theory (IRT) scoring, not simple counts.
//   Higher-discrimination questions receive more weight in the final score.
// - Questions ask about PREFERENCE (natural lean), not ABILITY (skill level).
//   "Which do you prefer" not "which are you better at."
// - Axis-based forced choice avoids self-report bias (people can excel at
//   both sides of an axis but must identify which they naturally prefer).
// - 4 validity/consistency check questions repeat earlier items in different
//   wording. Wildly inconsistent responses flag low-reliability results.
// - Results show the full 8-function stack with percentage scores, not just
//   the type label.
//
// Format: Axis-based forced-choice between opposing cognitive functions
// Standard: 32 questions (8 per axis) + 4 validity checks
// Full: 64 questions (16 per axis) + 4 validity checks
// ─────────────────────────────────────────────────────────────────────────────

export interface AxisQuestion {
  id: number;
  axis: "Ni-Se" | "Ne-Si" | "Ti-Fe" | "Fi-Te";
  depth: "standard" | "full";
  scenario: string;
  optionA: { text: string; func: string };
  optionB: { text: string; func: string };
}

// ── STANDARD SET: 32 questions, 8 per axis ───────────────────────────────────

export const standardCognitiveQuestions: AxisQuestion[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // Ni vs Se — Vision vs. Presence (8 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 101,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "When you're stuck on a difficult problem, you tend to:",
    optionA: { func: "Ni", text: "Step back and wait for a sudden insight to crystallize — you trust that the answer will emerge if you give it space" },
    optionB: { func: "Se", text: "Try different physical approaches until something clicks — experimentation and hands-on action are how you find answers" },
  },
  {
    id: 102,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "Your relationship with the future is best described as:",
    optionA: { func: "Ni", text: "You often know where things are headed before others do — you pick up on subtle patterns that point to what's coming" },
    optionB: { func: "Se", text: "You'd rather be fully present in the now than speculate — the future is abstract, the moment is real" },
  },
  {
    id: 103,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "When you're creating something new, you:",
    optionA: { func: "Ni", text: "Start with a vision and work toward it even when the path is unclear — you trust the internal picture" },
    optionB: { func: "Se", text: "Respond to the materials and let the creation emerge through action — you discover what it is by making it" },
  },
  {
    id: 104,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "When you remember a meaningful experience, you typically recall:",
    optionA: { func: "Ni", text: "The insight or symbolic meaning it left you with — the 'essence' of what the experience meant to you" },
    optionB: { func: "Se", text: "Vivid sensory details — what things looked, sounded, felt, and tasted like in that moment" },
  },
  {
    id: 105,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "When something unexpected happens in your environment, you:",
    optionA: { func: "Ni", text: "Quickly synthesize what it means — you connect it to a larger pattern or implication almost automatically" },
    optionB: { func: "Se", text: "React swiftly to what's actually in front of you — your senses are sharp and you respond to the literal situation" },
  },
  {
    id: 106,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "When you read fiction, you tend to:",
    optionA: { func: "Ni", text: "Read for the deeper themes, symbols, and what the work is 'really about' beneath the surface" },
    optionB: { func: "Se", text: "Immerse yourself in the world — the action, the vivid details, the physical experience of the story" },
  },
  {
    id: 107,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "In conversations, you tend to:",
    optionA: { func: "Ni", text: "Listen for the underlying meaning — you often understand what someone means before they've finished saying it" },
    optionB: { func: "Se", text: "Engage fully with what's being said right now — you're responsive to tone, energy, and the dynamic in the room" },
  },
  {
    id: 108,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "People who know you well would say you are more:",
    optionA: { func: "Ni", text: "Prophetic — you seem to know where things are heading before anyone else, even if you can't explain how" },
    optionB: { func: "Se", text: "Present — you notice everything happening around you and respond with impressive speed and awareness" },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Ne vs Si — Possibility vs. Experience (8 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 201,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "At a gathering with many people, you're more likely to:",
    optionA: { func: "Ne", text: "Jump between conversations following interesting idea threads — you love the unpredictability of where a discussion might go" },
    optionB: { func: "Si", text: "Have one deep conversation with someone you already know well — familiar connections feel more rewarding than novelty" },
  },
  {
    id: 202,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "When learning something new, you prefer:",
    optionA: { func: "Ne", text: "Exploring how it connects to everything else you know — the web of associations is more interesting than the topic itself" },
    optionB: { func: "Si", text: "Getting a solid foundation before branching out — you want to understand the core material thoroughly first" },
  },
  {
    id: 203,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "When someone shares a problem with you, your mind first goes to:",
    optionA: { func: "Ne", text: "A cascade of possible solutions and creative angles — 'What if you tried this? Or this? What about combining these two ideas?'" },
    optionB: { func: "Si", text: "Similar situations from your experience — 'I remember when something like this happened, and here's what worked'" },
  },
  {
    id: 204,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "On a vacation, you'd prefer to:",
    optionA: { func: "Ne", text: "Explore spontaneously — no strict itinerary, follow interesting leads, discover hidden gems you didn't plan for" },
    optionB: { func: "Si", text: "Visit places you've researched or that come highly recommended — you enjoy knowing what to expect and savoring anticipated experiences" },
  },
  {
    id: 205,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "Which frustrates you more?",
    optionA: { func: "Ne", text: "Being told 'That's how we've always done it' when you can see a better possibility right there" },
    optionB: { func: "Si", text: "People constantly reinventing the wheel when there's already a proven, reliable method that works perfectly well" },
  },
  {
    id: 206,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "Your workspace tends to look like:",
    optionA: { func: "Ne", text: "Organized chaos — multiple projects visible, books open to different pages, sticky notes with interconnected ideas everywhere" },
    optionB: { func: "Si", text: "A system that works for you — things have their place, your routines are established, and you know where everything is" },
  },
  {
    id: 207,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "When telling a story or explaining something, you tend to:",
    optionA: { func: "Ne", text: "Tangent into related ideas — the story branches, each detail reminds you of another connection, it becomes a web of associations" },
    optionB: { func: "Si", text: "Recount it in sequence with rich specific details — you remember exactly what was said, what happened, the precise chain of events" },
  },
  {
    id: 208,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "When deciding whether to try something new, you tend to:",
    optionA: { func: "Ne", text: "Focus on the potential upside and interesting possibilities — what could this open up?" },
    optionB: { func: "Si", text: "Weigh it against your past experiences — how does this compare to what you've done and what worked before?" },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Ti vs Fe — Logic vs. Harmony (8 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 301,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "When a friend is upset, your first instinct is to:",
    optionA: { func: "Ti", text: "Help them analyze what's actually causing the problem — you think through the situation with them to find the real issue" },
    optionB: { func: "Fe", text: "Make them feel understood and less alone — they need to know you're with them before anything else" },
  },
  {
    id: 302,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "In a group decision-making process, you're most concerned with:",
    optionA: { func: "Ti", text: "Whether the logic holds up under scrutiny — you want to make sure the reasoning is sound before committing" },
    optionB: { func: "Fe", text: "Whether everyone feels heard and included — a decision that leaves people feeling dismissed isn't actually a good decision" },
  },
  {
    id: 303,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "When someone makes an argument with a logical flaw, you:",
    optionA: { func: "Ti", text: "Feel compelled to point out the inconsistency — getting the logic right matters, even when it's uncomfortable" },
    optionB: { func: "Fe", text: "Weigh whether pointing it out is worth the social cost — maintaining the group's cohesion matters too" },
  },
  {
    id: 304,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "When you're working on a complex problem alone, you:",
    optionA: { func: "Ti", text: "Go deep into the internal logic — building a precise, complete model of how the pieces fit together" },
    optionB: { func: "Fe", text: "Think about how the answer will land with others — what solution will work for the people involved?" },
  },
  {
    id: 305,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "If you discovered a closely held belief of yours was factually wrong, you'd most likely:",
    optionA: { func: "Ti", text: "Feel a strange satisfaction — finding the truth, even when it overturns your own thinking, is deeply rewarding" },
    optionB: { func: "Fe", text: "Think about the implications for your relationships and shared values — how does this affect the people connected to this belief?" },
  },
  {
    id: 306,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "In a debate, you're more naturally inclined to:",
    optionA: { func: "Ti", text: "Play devil's advocate to stress-test ideas — you enjoy finding weaknesses in any argument, including your own" },
    optionB: { func: "Fe", text: "Build consensus — you naturally seek common ground and help people find the shared values they can agree on" },
  },
  {
    id: 307,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "When you're trying to learn something deeply, you feel most satisfied when you:",
    optionA: { func: "Ti", text: "Understand the underlying principles so thoroughly that you could derive everything else from first principles yourself" },
    optionB: { func: "Fe", text: "Can explain it clearly to others and see the 'aha' moment on their faces — shared understanding feels complete" },
  },
  {
    id: 308,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "When making a decision that affects others, you prioritize:",
    optionA: { func: "Ti", text: "What makes the most logical sense given the facts — the right answer is the right answer, even if some people are unhappy" },
    optionB: { func: "Fe", text: "Everyone's feelings and needs — a solution that leaves people feeling dismissed or hurt is missing something important" },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Fi vs Te — Values vs. Efficiency (8 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 401,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "When you disagree with someone, you:",
    optionA: { func: "Fi", text: "Feel it as a personal conviction — this matters to you at a values level, and the feeling is hard to ignore even without argument" },
    optionB: { func: "Te", text: "Immediately start marshaling evidence and logical arguments — you want to demonstrate why your position is more defensible" },
  },
  {
    id: 402,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "You feel most productive when:",
    optionA: { func: "Fi", text: "You're working on something that genuinely feels meaningful to you — purpose fuels you more than structure does" },
    optionB: { func: "Te", text: "You have a clear system and measurable goals — you know what success looks like and you're tracking toward it" },
  },
  {
    id: 403,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "A coworker's approach to a project is clearly inefficient. You:",
    optionA: { func: "Fi", text: "Consider whether it matters to them and what meaning they find in their approach — maybe efficiency isn't what this is about" },
    optionB: { func: "Te", text: "Directly suggest a more efficient process — results matter, and there's clearly a better way to do this" },
  },
  {
    id: 404,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "When evaluating whether something is 'good work', you look for:",
    optionA: { func: "Fi", text: "Whether it's authentic and meaningful — does it resonate with something real? Does it have integrity and honesty?" },
    optionB: { func: "Te", text: "Measurable outcomes — did it achieve the goal? Was it delivered on time? Can you see the results?" },
  },
  {
    id: 405,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "Your approach to personal growth tends to be:",
    optionA: { func: "Fi", text: "Deeply personal and intuitive — you grow by staying true to yourself, understanding your inner world, honoring what matters" },
    optionB: { func: "Te", text: "Strategic and measurable — set clear goals, track progress, optimize your systems and habits" },
  },
  {
    id: 406,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "When choosing a career or major project, you weight more heavily:",
    optionA: { func: "Fi", text: "Authenticity and personal meaning — does this work align with who you truly are and what you deeply care about?" },
    optionB: { func: "Te", text: "Competence, impact, and advancement — where can you be most effective and produce the most measurable value?" },
  },
  {
    id: 407,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "In a moral dilemma, you tend to:",
    optionA: { func: "Fi", text: "Consult your internal moral compass — you have a deep sense of right and wrong that guides you even when logic is ambiguous" },
    optionB: { func: "Te", text: "Analyze the situation objectively — weigh the costs and benefits, consider the evidence, find the rational solution" },
  },
  {
    id: 408,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "When you disagree with an authority figure:",
    optionA: { func: "Fi", text: "You feel it deeply as a values conflict — something inside says 'this is wrong' even when you can't fully articulate why" },
    optionB: { func: "Te", text: "You challenge them with evidence and logic — if their position doesn't hold up to scrutiny, it should change" },
  },
];

// ── FULL SET: 64 questions, 16 per axis ──────────────────────────────────────

export const fullCognitiveQuestions: AxisQuestion[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // Ni vs Se — 16 questions
  // ═══════════════════════════════════════════════════════════════════════════
  ...standardCognitiveQuestions.filter(q => q.axis === "Ni-Se"),
  {
    id: 109,
    axis: "Ni-Se",
    depth: "full",
    scenario: "When you're walking through a new city for the first time, you:",
    optionA: { func: "Ni", text: "Find yourself seeing the city as a metaphor — noticing how the architecture reflects the culture, imagining its future trajectory" },
    optionB: { func: "Se", text: "Are completely absorbed in the sights, sounds, and smells — the street food, the colors of the buildings, the energy of the crowd" },
  },
  {
    id: 110,
    axis: "Ni-Se",
    depth: "full",
    scenario: "A friend tells you about a business idea they're excited about:",
    optionA: { func: "Ni", text: "You immediately see where this is heading long-term — the trajectory clicks into place and you share your vision of how it'll unfold" },
    optionB: { func: "Se", text: "You get energized and want to jump into action — let's prototype it, try it now, see what happens in practice" },
  },
  {
    id: 111,
    axis: "Ni-Se",
    depth: "full",
    scenario: "In a meeting that's going nowhere, you're most likely to:",
    optionA: { func: "Ni", text: "Quietly synthesize everything said so far into a single clarifying insight that reframes the whole discussion" },
    optionB: { func: "Se", text: "Read the room's energy and make a bold, decisive move to break the stalemate and get things moving" },
  },
  {
    id: 112,
    axis: "Ni-Se",
    depth: "full",
    scenario: "When making a major life decision, you tend to:",
    optionA: { func: "Ni", text: "Wait for an internal 'click' — a deep knowing that emerges after letting your unconscious process the information" },
    optionB: { func: "Se", text: "Trust your real-time read of the situation — act on what feels right in the moment based on what's concretely in front of you" },
  },
  {
    id: 113,
    axis: "Ni-Se",
    depth: "full",
    scenario: "When someone describes their vision or dream to you, you:",
    optionA: { func: "Ni", text: "Immediately understand what they're trying to express — you can see the whole picture even when they're still finding the words" },
    optionB: { func: "Se", text: "Ask grounding questions about the specifics — what does this look like in practice? What are the concrete next steps?" },
  },
  {
    id: 114,
    axis: "Ni-Se",
    depth: "full",
    scenario: "How do you tend to experience time?",
    optionA: { func: "Ni", text: "As a continuous flow pointing somewhere — you live oriented toward a sense of where things are heading" },
    optionB: { func: "Se", text: "As a series of vivid present moments — each experience is complete and real in itself" },
  },
  {
    id: 115,
    axis: "Ni-Se",
    depth: "full",
    scenario: "When you're in a high-pressure situation, you:",
    optionA: { func: "Ni", text: "Go inward — you find a still point and trust that the right move will become clear" },
    optionB: { func: "Se", text: "Engage directly with what's happening — your energy rises and you respond quickly to what's actually in front of you" },
  },
  {
    id: 116,
    axis: "Ni-Se",
    depth: "full",
    scenario: "Your relationship to your physical body and appearance is:",
    optionA: { func: "Ni", text: "Secondary — your inner world is where the real action is; your body is more of a vehicle than an identity" },
    optionB: { func: "Se", text: "Important — you're attuned to physical sensations, how you feel, and the immediate experience of being embodied" },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Ne vs Si — 16 questions
  // ═══════════════════════════════════════════════════════════════════════════
  ...standardCognitiveQuestions.filter(q => q.axis === "Ne-Si"),
  {
    id: 209,
    axis: "Ne-Si",
    depth: "full",
    scenario: "When reading a book or article, you're more likely to:",
    optionA: { func: "Ne", text: "Get excited by how the ideas connect to completely different fields — suddenly you're down a rabbit hole of related concepts" },
    optionB: { func: "Si", text: "Compare what you're reading against your existing knowledge — does this match or contradict what you've seen?" },
  },
  {
    id: 210,
    axis: "Ne-Si",
    depth: "full",
    scenario: "When something goes differently than expected, you tend to:",
    optionA: { func: "Ne", text: "See it as an interesting development — maybe it opens something you hadn't considered" },
    optionB: { func: "Si", text: "Notice the deviation from what you expected — you compare it carefully against what you know from past experience" },
  },
  {
    id: 211,
    axis: "Ne-Si",
    depth: "full",
    scenario: "In conversations, you often:",
    optionA: { func: "Ne", text: "Make unexpected connections that surprise people — 'how did you get from X to Y so fast?'" },
    optionB: { func: "Si", text: "Draw on relevant past experiences — your memory for detail is good and you use it to add context" },
  },
  {
    id: 212,
    axis: "Ne-Si",
    depth: "full",
    scenario: "When someone asks your opinion on something you haven't thought about yet, you:",
    optionA: { func: "Ne", text: "Start thinking out loud — the process of talking through possibilities is how you generate ideas" },
    optionB: { func: "Si", text: "Draw on what you know from experience first — you're more comfortable offering a considered view than speculating" },
  },
  {
    id: 213,
    axis: "Ne-Si",
    depth: "full",
    scenario: "Which describes your relationship to routines?",
    optionA: { func: "Ne", text: "You resist them — even good routines feel like a cage after a while, and you often abandon them for something new" },
    optionB: { func: "Si", text: "You rely on them — good routines are deeply comforting and make life feel manageable and grounded" },
  },
  {
    id: 214,
    axis: "Ne-Si",
    depth: "full",
    scenario: "When starting a new project, you:",
    optionA: { func: "Ne", text: "Get energized by the possibilities — you generate a lot of ideas quickly and enjoy the brainstorming phase most" },
    optionB: { func: "Si", text: "Look for proven frameworks — you want to understand what's worked before and build from there" },
  },
  {
    id: 215,
    axis: "Ne-Si",
    depth: "full",
    scenario: "Your memory tends to be better for:",
    optionA: { func: "Ne", text: "Concepts, connections, and the gist of things — you remember what things meant more than exact details" },
    optionB: { func: "Si", text: "Specifics — exact words, sequences of events, sensory details, how things actually were" },
  },
  {
    id: 216,
    axis: "Ne-Si",
    depth: "full",
    scenario: "When a plan changes at the last minute, you:",
    optionA: { func: "Ne", text: "Often find it energizing — new circumstances bring new possibilities, and you're good at adapting" },
    optionB: { func: "Si", text: "Feel unsettled at first — you had prepared for what was expected, and unexpected change takes readjustment" },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Ti vs Fe — 16 questions
  // ═══════════════════════════════════════════════════════════════════════════
  ...standardCognitiveQuestions.filter(q => q.axis === "Ti-Fe"),
  {
    id: 309,
    axis: "Ti-Fe",
    depth: "full",
    scenario: "When you're trying to convince someone of something, you:",
    optionA: { func: "Ti", text: "Present the logical case — lay out the reasoning step by step so they can see why your conclusion is correct" },
    optionB: { func: "Fe", text: "Appeal to shared values and feelings — help them feel why this matters, not just understand it intellectually" },
  },
  {
    id: 310,
    axis: "Ti-Fe",
    depth: "full",
    scenario: "When you've made a mistake that affected others, you feel:",
    optionA: { func: "Ti", text: "Focused on understanding the root cause — why did this happen and how do you prevent it next time?" },
    optionB: { func: "Fe", text: "Most concerned about repairing the relationship and making sure the people affected feel okay" },
  },
  {
    id: 311,
    axis: "Ti-Fe",
    depth: "full",
    scenario: "In a heated disagreement between others, you tend to:",
    optionA: { func: "Ti", text: "Listen critically to identify where the logic breaks down on each side — you want to get to the truth of the matter" },
    optionB: { func: "Fe", text: "Read the emotional dynamics and work to de-escalate — what does each person need to feel heard?" },
  },
  {
    id: 312,
    axis: "Ti-Fe",
    depth: "full",
    scenario: "When you're in a good conversation, it's most satisfying when:",
    optionA: { func: "Ti", text: "Ideas are being sharpened, refined, and stress-tested — precision and intellectual rigor feel like respect" },
    optionB: { func: "Fe", text: "There's genuine warmth and connection — you feel attuned to the other person and they feel attuned to you" },
  },
  {
    id: 313,
    axis: "Ti-Fe",
    depth: "full",
    scenario: "When you're in a group that's making a bad decision, you:",
    optionA: { func: "Ti", text: "Speak up about the logical flaws — you can't stay silent when the reasoning is clearly wrong" },
    optionB: { func: "Fe", text: "Think carefully about how to raise concerns without destroying the group's energy or dynamics" },
  },
  {
    id: 314,
    axis: "Ti-Fe",
    depth: "full",
    scenario: "When evaluating a theory or claim, you're most interested in:",
    optionA: { func: "Ti", text: "Internal consistency — does it hold together logically? Does it contradict itself anywhere?" },
    optionB: { func: "Fe", text: "Its effects on people — what does this mean for communities, relationships, and human wellbeing?" },
  },
  {
    id: 315,
    axis: "Ti-Fe",
    depth: "full",
    scenario: "Other people would say that in conflict, you tend to:",
    optionA: { func: "Ti", text: "Stay detached and analytical — you don't take things personally and focus on the argument rather than the relationship" },
    optionB: { func: "Fe", text: "Be sensitive to the emotional temperature — you track how people are feeling and that affects how you engage" },
  },
  {
    id: 316,
    axis: "Ti-Fe",
    depth: "full",
    scenario: "When you feel judged or criticized, your instinctive response is to:",
    optionA: { func: "Ti", text: "Evaluate whether the criticism is logically valid — if it's not, you feel no obligation to take it on" },
    optionB: { func: "Fe", text: "Register it emotionally first — even if you ultimately disagree, you feel the social impact of being criticized" },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Fi vs Te — 16 questions
  // ═══════════════════════════════════════════════════════════════════════════
  ...standardCognitiveQuestions.filter(q => q.axis === "Fi-Te"),
  {
    id: 409,
    axis: "Fi-Te",
    depth: "full",
    scenario: "When you're working in a group that's heading in a direction you don't believe in, you:",
    optionA: { func: "Fi", text: "Feel a strong internal resistance — it doesn't feel right to contribute to something that violates your sense of integrity" },
    optionB: { func: "Te", text: "Redirect the group toward a more effective approach — you focus on outcomes and push for what will actually work" },
  },
  {
    id: 410,
    axis: "Fi-Te",
    depth: "full",
    scenario: "When you're trying to motivate yourself for a difficult task, you rely more on:",
    optionA: { func: "Fi", text: "Connecting to why it matters — you need to feel the meaning in the work or it's hard to sustain effort" },
    optionB: { func: "Te", text: "External structure — deadlines, systems, accountability, and visible progress keep you on track" },
  },
  {
    id: 411,
    axis: "Fi-Te",
    depth: "full",
    scenario: "When giving feedback to someone, you tend to:",
    optionA: { func: "Fi", text: "Be gentle and consider their feelings carefully — you don't want your words to damage someone's self-perception" },
    optionB: { func: "Te", text: "Be direct and specific — you respect people by treating them as capable of handling honest, actionable feedback" },
  },
  {
    id: 412,
    axis: "Fi-Te",
    depth: "full",
    scenario: "When a social norm conflicts with your own sense of what's right, you:",
    optionA: { func: "Fi", text: "Quietly follow your own values — your internal compass is the final authority, regardless of external pressure" },
    optionB: { func: "Te", text: "Evaluate which approach produces better outcomes — norms exist for reasons, but so does clear-eyed pragmatism" },
  },
  {
    id: 413,
    axis: "Fi-Te",
    depth: "full",
    scenario: "When you're in a role of leadership or responsibility, you tend to:",
    optionA: { func: "Fi", text: "Lead by example through authenticity — people follow you because you embody what you stand for" },
    optionB: { func: "Te", text: "Set clear systems and expectations — you think about what structures will produce the best results" },
  },
  {
    id: 414,
    axis: "Fi-Te",
    depth: "full",
    scenario: "When you consume art, music, or literature, you primarily respond to:",
    optionA: { func: "Fi", text: "Emotional and personal resonance — does it touch something true in you? Does it move you?" },
    optionB: { func: "Te", text: "Craft and execution — you appreciate technical mastery, purposeful structure, and the skill required to produce it" },
  },
  {
    id: 415,
    axis: "Fi-Te",
    depth: "full",
    scenario: "When someone does something that violates your values, you feel:",
    optionA: { func: "Fi", text: "A strong personal reaction — it's not just wrong in the abstract, it matters to you at a felt, identity level" },
    optionB: { func: "Te", text: "A desire to address the inefficiency or irrationality of the behavior — you want to correct it or at least note that it doesn't work" },
  },
  {
    id: 416,
    axis: "Fi-Te",
    depth: "full",
    scenario: "When others make decisions that affect you, you're most upset when:",
    optionA: { func: "Fi", text: "They didn't consider the values at stake or your sense of what matters — the decision feels disconnected from what's meaningful" },
    optionB: { func: "Te", text: "They made an irrational or inefficient choice — there was clearly a better way to handle it and they ignored it" },
  },
];

// ── VALIDITY / CONSISTENCY CHECK QUESTIONS ───────────────────────────────────
// These 4 questions re-probe earlier items with different wording.
// They are interleaved into the assessment by getCognitiveQuestions().
// Inconsistent responses (answering opposite to the original item) reduce
// the confidence score for the final result per MBTI Form M IRT principles.
// Each check has a `checksId` pointing to the original question it mirrors.

export interface ValidityQuestion extends AxisQuestion {
  checksId: number; // id of the original question this mirrors
  isValidityCheck: true;
}

export const validityCheckQuestions: ValidityQuestion[] = [
  // Mirrors q101 (Ni-Se: "stuck on a problem" — wait for insight vs. experiment)
  {
    id: 9001,
    axis: "Ni-Se",
    depth: "standard",
    scenario: "When you can't find a solution, you prefer to:",
    optionA: { func: "Ni", text: "Let it sit and trust that clarity will arrive on its own — forcing it rarely works for you" },
    optionB: { func: "Se", text: "Keep trying different approaches in practice — action and experimentation move you forward" },
    checksId: 101,
    isValidityCheck: true,
  },
  // Mirrors q201 (Ne-Si: gathering with people — follow ideas vs. familiar connections)
  {
    id: 9002,
    axis: "Ne-Si",
    depth: "standard",
    scenario: "In social situations, you naturally gravitate toward:",
    optionA: { func: "Ne", text: "New conversations with unfamiliar people — the unknown is interesting and you like following where ideas lead" },
    optionB: { func: "Si", text: "Deepening existing connections — you'd rather go deep with someone familiar than wide with strangers" },
    checksId: 201,
    isValidityCheck: true,
  },
  // Mirrors q301 (Ti-Fe: friend is upset — analyze vs. make them feel understood)
  {
    id: 9003,
    axis: "Ti-Fe",
    depth: "standard",
    scenario: "A friend is struggling with a hard situation. Your instinct is to:",
    optionA: { func: "Ti", text: "Help them think it through clearly — getting to the root of the problem is genuinely helpful" },
    optionB: { func: "Fe", text: "Be there for them emotionally — they need to feel supported before anything else" },
    checksId: 301,
    isValidityCheck: true,
  },
  // Mirrors q401 (Fi-Te: disagreement — personal conviction vs. marshal evidence)
  {
    id: 9004,
    axis: "Fi-Te",
    depth: "standard",
    scenario: "When you strongly disagree with someone, you:",
    optionA: { func: "Fi", text: "Feel it in your gut as something important — it's a values matter that matters to you at a felt level" },
    optionB: { func: "Te", text: "Want to make the case logically — you start organizing evidence and reasoning to support your position" },
    checksId: 401,
    isValidityCheck: true,
  },
];

// ── ALL questions combined ────────────────────────────────────────────────────
export const allCognitiveQuestions = [...standardCognitiveQuestions, ...fullCognitiveQuestions.filter(q => q.depth === "full")];

// Get questions for a mode — interleaves validity checks at even intervals
export function getCognitiveQuestions(mode: "standard" | "full"): AxisQuestion[] {
  const base = mode === "standard" ? standardCognitiveQuestions : fullCognitiveQuestions;
  // Interleave validity checks at ~25%, 50%, 75%, 100% of base length
  const result = [...base];
  const interval = Math.floor(result.length / 4);
  const insertPositions = [interval, interval * 2, interval * 3, result.length];
  validityCheckQuestions.forEach((vq, i) => {
    result.splice(insertPositions[i] + i, 0, vq);
  });
  return result;
}

// Check validity/consistency of responses
// Returns a consistency score 0–100 (100 = fully consistent)
// and flags which axes had inconsistencies
export function checkResponseConsistency(
  answers: Record<number, "A" | "B">,
): { consistencyScore: number; inconsistentAxes: string[] } {
  let consistent = 0;
  let total = 0;
  const inconsistentAxes: string[] = [];

  for (const vq of validityCheckQuestions) {
    const originalAnswer = answers[vq.checksId];
    const validityAnswer = answers[vq.id];
    if (originalAnswer !== undefined && validityAnswer !== undefined) {
      total++;
      // Both choose the same function pole = consistent
      const originalFunc = originalAnswer === "A" ? (standardCognitiveQuestions.find(q => q.id === vq.checksId)?.optionA.func) : (standardCognitiveQuestions.find(q => q.id === vq.checksId)?.optionB.func);
      const validityFunc = validityAnswer === "A" ? vq.optionA.func : vq.optionB.func;
      if (originalFunc === validityFunc) {
        consistent++;
      } else {
        if (!inconsistentAxes.includes(vq.axis)) {
          inconsistentAxes.push(vq.axis);
        }
      }
    }
  }

  const consistencyScore = total > 0 ? Math.round((consistent / total) * 100) : 100;
  return { consistencyScore, inconsistentAxes };
}

// All 16 types with their cognitive function stacks
export const TYPE_STACKS: { code: string; dom: string; aux: string; tert: string; inf: string }[] = [
  { code: "INTJ", dom: "Ni", aux: "Te", tert: "Fi", inf: "Se" },
  { code: "INFJ", dom: "Ni", aux: "Fe", tert: "Ti", inf: "Se" },
  { code: "ENTJ", dom: "Te", aux: "Ni", tert: "Se", inf: "Fi" },
  { code: "ENFJ", dom: "Fe", aux: "Ni", tert: "Se", inf: "Ti" },
  { code: "INTP", dom: "Ti", aux: "Ne", tert: "Si", inf: "Fe" },
  { code: "INFP", dom: "Fi", aux: "Ne", tert: "Si", inf: "Te" },
  { code: "ENTP", dom: "Ne", aux: "Ti", tert: "Fe", inf: "Si" },
  { code: "ENFP", dom: "Ne", aux: "Fi", tert: "Te", inf: "Si" },
  { code: "ISTJ", dom: "Si", aux: "Te", tert: "Fi", inf: "Ne" },
  { code: "ISFJ", dom: "Si", aux: "Fe", tert: "Ti", inf: "Ne" },
  { code: "ESTJ", dom: "Te", aux: "Si", tert: "Ne", inf: "Fi" },
  { code: "ESFJ", dom: "Fe", aux: "Si", tert: "Ne", inf: "Ti" },
  { code: "ISTP", dom: "Ti", aux: "Se", tert: "Ni", inf: "Fe" },
  { code: "ISFP", dom: "Fi", aux: "Se", tert: "Ni", inf: "Te" },
  { code: "ESTP", dom: "Se", aux: "Ti", tert: "Fe", inf: "Ni" },
  { code: "ESFP", dom: "Se", aux: "Fi", tert: "Te", inf: "Ni" },
];

function getOpposite(func: string): string {
  const opposites: Record<string, string> = {
    Ni: "Se", Se: "Ni", Ne: "Si", Si: "Ne",
    Ti: "Fe", Fe: "Ti", Te: "Fi", Fi: "Te",
  };
  return opposites[func] || func;
}

export function determineCognitiveType(scores: Record<string, number>): string {
  let bestType = "INTJ";
  let bestScore = -Infinity;

  for (const type of TYPE_STACKS) {
    const domScore = scores[type.dom] || 0;
    const auxScore = scores[type.aux] || 0;
    const tertScore = scores[type.tert] || 0;
    const infScore = scores[type.inf] || 0;

    // IRT-inspired weighting: dominant function weighted most heavily,
    // inferior function lightly penalized (preference clarity matters)
    const fit = (domScore * 4) + (auxScore * 3) + (tertScore * 1.5) - (infScore * 1);

    const axisDiff = domScore - infScore;
    const auxAxisDiff = auxScore - (scores[getOpposite(type.aux)] || 0);
    const coherenceBonus = (axisDiff > 0 ? axisDiff * 0.5 : 0) + (auxAxisDiff > 0 ? auxAxisDiff * 0.3 : 0);

    const total = fit + coherenceBonus;
    if (total > bestScore) {
      bestScore = total;
      bestType = type.code;
    }
  }

  return bestType;
}

// Build the full 8-function stack with percentage scores for display
// Returns all 8 functions ordered by score, highest first
// This is the format described in the methodology — show the full stack,
// not just the type label (per Nardi's neuroscience research approach)
export function buildFunctionStack(
  scores: Record<string, number>
): { func: string; score: number; percentage: number }[] {
  const allFunctions = ["Ni", "Ne", "Si", "Se", "Ti", "Te", "Fi", "Fe"];
  const maxScore = Math.max(...allFunctions.map(f => scores[f] || 0), 1);

  return allFunctions
    .map(f => ({
      func: f,
      score: scores[f] || 0,
      percentage: Math.round(((scores[f] || 0) / maxScore) * 100),
    }))
    .sort((a, b) => b.score - a.score);
}

// Compute cognitive type confidence: how clearly differentiated the
// dominant type is. Low confidence suggests the assessment result
// should be treated with caution.
export function computeCognitiveConfidence(scores: Record<string, number>): number {
  const type = TYPE_STACKS.find(t => t.code === determineCognitiveType(scores));
  if (!type) return 50;

  const domScore = scores[type.dom] || 0;
  const oppScore = scores[getOpposite(type.dom)] || 0;
  const maxPossible = domScore + oppScore;
  if (maxPossible === 0) return 50;

  // How strongly did the person prefer the dominant function over its opposite?
  const clarity = (domScore - oppScore) / maxPossible;
  return Math.round(Math.max(0, Math.min(100, 50 + clarity * 50)));
}

// Axis axis label map
export const AXIS_LABELS: Record<string, string> = {
  "Ni-Se": "Perception: Vision vs. Presence",
  "Ne-Si": "Perception: Possibility vs. Experience",
  "Ti-Fe": "Judging: Logic vs. Harmony",
  "Fi-Te": "Judging: Values vs. Efficiency",
};
