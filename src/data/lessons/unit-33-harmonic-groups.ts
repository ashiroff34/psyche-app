// ─────────────────────────────────────────────────────────────────────────────
// Unit 33. Harmonic Groups
// Based on Riso & Hudson, "The Wisdom of the Enneagram" (1999), pp. 50–53.
// How each type responds when they don't get what they want.
// 4 lessons × 6 exercises each. xpReward: 15.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: The Harmonic Response ──────────────────────────────────────────

const lesson1: Lesson = {
  id: "u33-l1",
  unitId: "harmonic-groups",
  order: 1,
  title: "The Harmonic Response",
  subtitle: "What happens when reality fails to meet expectation",
  xpReward: 15,
  exercises: [
    {
      id: "u33-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "When You Don't Get What You Want",
        body: "According to Riso and Hudson in 'The Wisdom of the Enneagram' (1999), one of the most revealing questions in personality psychology is: what do you do when reality fails to meet your expectations? Three fundamental coping strategies emerge — the Positive Outlook group, the Competency group, and the Reactive group. These are the Harmonic Groups.",
        highlight: "Harmonic Groups",
      },
    },
    {
      id: "u33-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Three Harmonic Strategies",
        body: "The Positive Outlook group (2, 7, 9) reframes pain as positive and minimizes difficulty. The Competency group (1, 3, 5) sets aside feelings and relies on objective standards and logic. The Reactive group (4, 6, 8) amplifies emotional reactions to communicate distress and force a response from the environment. Each strategy has strengths and a predictable shadow side.",
        highlight: "three harmonic strategies",
      },
    },
    {
      id: "u33-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The Harmonic Groups describe:",
        options: [
          "Which types are most harmonious in romantic relationships",
          "How each Enneagram type responds when they don't get what they want",
          "The natural musical abilities associated with each type",
          "Which types form the most stable group friendships",
        ],
        correctIndex: 1,
        explanation:
          "According to Riso and Hudson, the Harmonic Groups categorize the nine types based on how they cope when reality fails to meet their expectations — a fundamental window into each type's defensive structure.",
      },
    },
    {
      id: "u33-l1-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which three types make up the Competency Harmonic Group?",
        options: [
          "Types 2, 7, and 9",
          "Types 4, 6, and 8",
          "Types 1, 3, and 5",
          "Types 1, 4, and 6",
        ],
        correctIndex: 2,
        explanation:
          "Riso and Hudson place Types 1, 3, and 5 in the Competency group. These types respond to difficulty by setting aside feelings and relying on objective standards, logic, and systems.",
      },
    },
    {
      id: "u33-l1-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Three friends receive the same bad news: their collaborative project has been rejected by a funding committee. Sofia (Type 2) immediately says, 'It's okay! We learned so much from this — it'll make us stronger.' Daniel (Type 1) says, 'Okay. Let's analyze exactly where the proposal was weak and rebuild it according to the committee's stated criteria.' Marcus (Type 4) says nothing for a while, then says quietly, 'I feel like this is personal. Like we were seen and rejected. I need to sit with that.'",
        question: "Which Harmonic Group does each response represent?",
        options: [
          "Sofia: Competency. Daniel: Reactive. Marcus: Positive Outlook.",
          "Sofia: Positive Outlook. Daniel: Competency. Marcus: Reactive.",
          "Sofia: Reactive. Daniel: Positive Outlook. Marcus: Competency.",
          "All three are demonstrating the Positive Outlook strategy.",
        ],
        correctIndex: 1,
        explanation:
          "Sofia (Type 2) uses Positive Outlook — reframing the rejection as a learning experience. Daniel (Type 1) uses Competency — setting aside emotion and focusing on objective analysis. Marcus (Type 4) uses the Reactive strategy — amplifying the emotional meaning of the experience and needing to feel it fully.",
      },
    },
    {
      id: "u33-l1-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which types form the Reactive Harmonic Group?",
        options: [
          "Types 3, 6, and 9",
          "Types 2, 4, and 8",
          "Types 4, 6, and 8",
          "Types 1, 5, and 9",
        ],
        correctIndex: 2,
        explanation:
          "Riso and Hudson place Types 4, 6, and 8 in the Reactive group. These types amplify their emotional responses when they don't get what they want, needing to know where they stand and demanding a response from the environment.",
      },
    },
  ],
};

// ── Lesson 2: Positive Outlook Group (2, 7, 9) ────────────────────────────────

const lesson2: Lesson = {
  id: "u33-l2",
  unitId: "harmonic-groups",
  order: 2,
  title: "Positive Outlook Group",
  subtitle: "Types 2, 7, and 9: reframing pain as positive",
  xpReward: 15,
  exercises: [
    {
      id: "u33-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Maintaining the Good Feeling",
        body: "Riso and Hudson describe the Positive Outlook group (2, 7, 9) as types that respond to difficulty by reframing it in a positive light. They minimize pain, avoid negativity, and maintain an optimistic attitude — not because they are dishonest, but because the ego structure of these types cannot easily tolerate being in a state of suffering or conflict without finding a silver lining.",
        highlight: "reframing pain as positive",
      },
    },
    {
      id: "u33-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Three Variations of Positive Outlook",
        body: "Each type uses this strategy differently. Type 2 focuses on others' needs to avoid their own pain — if they can help someone else, their discomfort recedes. Type 7 reframes difficulty as an adventure or opportunity, planning their way out of pain. Type 9 merges with a sense of universal okayness — telling themselves that ultimately everything is fine and will work out.",
        highlight: "three variations",
      },
    },
    {
      id: "u33-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core strategy of the Positive Outlook Harmonic Group?",
        options: [
          "Set aside feelings and solve problems through logic and objective standards",
          "Amplify emotional reactions to communicate distress and demand a response",
          "Reframe difficulty as positive and minimize pain to maintain an optimistic outlook",
          "Withdraw inward and process emotions privately before re-engaging",
        ],
        correctIndex: 2,
        explanation:
          "The Positive Outlook group (2, 7, 9) manages difficulty by reframing pain as positive and minimizing difficulty. This preserves their sense of optimism and emotional wellbeing, though it can lead to avoidance of genuine problems.",
      },
    },
    {
      id: "u33-l2-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "What is the shadow side of the Positive Outlook strategy?",
        options: [
          "These types become overly logical and cold under stress",
          "By reframing everything positively, real problems may go unaddressed and genuine emotions get suppressed",
          "These types become more reactive and emotionally explosive over time",
          "There is no shadow side — positive thinking is universally helpful",
        ],
        correctIndex: 1,
        explanation:
          "While the Positive Outlook strategy can be genuinely resilient, its shadow is avoidance. Real problems can go unaddressed, genuine negative feelings get suppressed rather than processed, and others may feel that their concerns aren't being taken seriously.",
      },
    },
    {
      id: "u33-l2-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Elena is a Type 9. Her long-term partner has just told her they need to talk about serious problems in the relationship. Elena listens carefully, then says, 'I think we're both just stressed from work. Things will naturally settle down. We love each other — that's what matters.' Her partner feels deeply unheard.",
        question: "What does Elena's response illustrate about the Positive Outlook strategy?",
        options: [
          "Elena is using the Competency strategy — analyzing the relationship systematically",
          "Elena is being intentionally dismissive and unkind",
          "Elena's Positive Outlook strategy is minimizing a real problem to preserve harmony — a pattern Riso-Hudson identify as characteristic of Type 9",
          "Elena is demonstrating healthy conflict resolution by staying calm",
        ],
        correctIndex: 2,
        explanation:
          "Elena's response is a classic Type 9 Positive Outlook pattern: merge with a sense of ultimate okayness and minimize the problem's severity to preserve peace. This is not malicious — it reflects the Type 9 ego structure's deep discomfort with sustained conflict or negativity.",
      },
    },
    {
      id: "u33-l2-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following responses to a job loss most clearly illustrates the Positive Outlook strategy?",
        options: [
          "'I need to figure out exactly what I did wrong and build a rigorous plan to prevent it in the future.'",
          "'This is devastating. I'm furious and I need people to understand how serious this is.'",
          "'Honestly, this might be a blessing in disguise. I've been wanting to try something new — let's see what else is out there!'",
          "'I need to spend some time alone to really sit with how I feel about this.'",
        ],
        correctIndex: 2,
        explanation:
          "The Positive Outlook response reframes the loss as an opportunity. This is the characteristic move of Types 2, 7, and 9: find the silver lining, minimize the pain, and maintain forward-looking optimism.",
      },
    },
  ],
};

// ── Lesson 3: Competency Group (1, 3, 5) ─────────────────────────────────────

const lesson3: Lesson = {
  id: "u33-l3",
  unitId: "harmonic-groups",
  order: 3,
  title: "Competency Group",
  subtitle: "Types 1, 3, and 5: setting feelings aside to solve the problem",
  xpReward: 15,
  exercises: [
    {
      id: "u33-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Logic Over Feeling",
        body: "According to Riso and Hudson, the Competency group (1, 3, and 5) responds to difficulty by setting aside feelings and relying on objective standards, logic, and systems. Where the Positive Outlook group finds a silver lining and the Reactive group amplifies emotion, the Competency group essentially says: 'Feelings are not useful right now. Let's analyze the situation and solve the problem correctly.'",
        highlight: "setting aside feelings",
      },
    },
    {
      id: "u33-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Three Variations of Competency",
        body: "Each Competency type applies the strategy differently. Type 1 relies on objective moral and procedural standards — doing things the right way. Type 3 sets aside feelings to focus on efficiency and image — doing things the effective way. Type 5 relies on detached analysis and the accumulation of knowledge — understanding the situation fully before acting. All three suppress emotional experience in favor of function.",
        highlight: "suppress emotional experience",
      },
    },
    {
      id: "u33-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which response to difficulty best represents the Competency Harmonic Group?",
        options: [
          "'Let's focus on what went wrong, analyze it carefully, and build a better system.'",
          "'It'll be okay — everything works out in the end!'",
          "'I need everyone to know how unfair and painful this is.'",
          "'I just need to be alone with my feelings for a while.'",
        ],
        correctIndex: 0,
        explanation:
          "The Competency group (1, 3, 5) responds by setting aside emotion and focusing on objective analysis, systems, and correct procedures. The first response is the clearest example of this strategy.",
      },
    },
    {
      id: "u33-l3-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "What is the shadow side of the Competency strategy?",
        options: [
          "These types become overly emotional and reactive under stress",
          "By setting feelings aside, they can lose touch with their own emotional needs and appear cold or dismissive to others",
          "These types become dependent on others' approval to feel competent",
          "The strategy always leads to better outcomes, so there is no real shadow",
        ],
        correctIndex: 1,
        explanation:
          "The shadow of the Competency strategy is emotional disconnection. By habitually setting feelings aside to function, these types can lose contact with their own emotional lives — and others may experience them as cold, robotic, or unavailable.",
      },
    },
    {
      id: "u33-l3-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Hiroshi is a Type 3. His business partner and close friend of ten years has just announced she's leaving the company. Hiroshi feels shaken but doesn't show it. In the meeting, he immediately shifts into logistics: 'Okay. We need to figure out your equity stake, the transition timeline, client handoffs, and who takes your seat on the board.' His friend looks hurt that he hasn't said anything personal.",
        question: "What does Hiroshi's response illustrate about the Competency strategy?",
        options: [
          "Hiroshi is being cruel and deliberately avoiding connection",
          "Hiroshi is using the Positive Outlook strategy to avoid feeling sad",
          "Hiroshi is demonstrating the Competency response — setting aside personal feelings to focus on what can be managed, measured, and solved",
          "Hiroshi is being reactive — amplifying his distress by focusing on logistics",
        ],
        correctIndex: 2,
        explanation:
          "Hiroshi's immediate pivot to logistics is a textbook Competency response. Rather than sitting with grief or expressing it (Reactive), or reframing the situation positively (Positive Outlook), he sets aside feelings and focuses on what can be objectively handled — a characteristic Type 3 pattern.",
      },
    },
    {
      id: "u33-l3-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "How does the Competency group differ from the Reactive group in responding to disappointment?",
        options: [
          "Competency types express feelings openly; Reactive types suppress them",
          "Competency types set feelings aside and rely on logic; Reactive types amplify emotional reactions to communicate their state and demand a response",
          "Competency types are always correct in their analysis; Reactive types are always wrong",
          "There is no meaningful difference between these two groups",
        ],
        correctIndex: 1,
        explanation:
          "The key distinction: Competency types (1, 3, 5) respond by suppressing emotion in favor of objective analysis and systems. Reactive types (4, 6, 8) do the opposite — they amplify emotional reactions, needing the environment to feel the impact of what happened.",
      },
    },
  ],
};

// ── Lesson 4: Reactive Group (4, 6, 8) ────────────────────────────────────────

const lesson4: Lesson = {
  id: "u33-l4",
  unitId: "harmonic-groups",
  order: 4,
  title: "Reactive Group",
  subtitle: "Types 4, 6, and 8: amplifying emotion to be heard",
  xpReward: 15,
  exercises: [
    {
      id: "u33-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Emotion as Signal",
        body: "Riso and Hudson describe the Reactive group (4, 6, and 8) as types that respond to difficulty by amplifying their emotional reactions. When they don't get what they want, they need to know where they stand — and they use the intensity of their emotional response to signal distress, demand clarity, and force a reaction from the environment. For these types, emotion is not something to be managed or reframed; it is information that must be expressed.",
        highlight: "amplifying emotional reactions",
      },
    },
    {
      id: "u33-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Three Reactive Patterns",
        body: "Each Reactive type amplifies differently. Type 4 intensifies their emotional experience — feeling the wound deeply and needing others to witness it. Type 6 amplifies through anxiety and worst-case thinking — voicing fears to test whether others will stay. Type 8 amplifies through confrontation and anger — pushing hard to see who will hold their ground. All three need clarity and a genuine response; vagueness or false reassurance only increases their reactivity.",
        highlight: "need clarity and a genuine response",
      },
    },
    {
      id: "u33-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the defining characteristic of the Reactive Harmonic Group?",
        options: [
          "They reframe difficulty positively to maintain optimism",
          "They set aside feelings and focus on objective problem-solving",
          "They amplify emotional reactions to communicate distress and demand a real response from the environment",
          "They withdraw inward and process emotions in private",
        ],
        correctIndex: 2,
        explanation:
          "The Reactive group (4, 6, 8) responds to difficulty by amplifying emotional reactions. They need to know where they stand and use emotional intensity to signal distress and demand genuine engagement from others.",
      },
    },
    {
      id: "u33-l4-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Why does vague reassurance often make things worse for Reactive types?",
        options: [
          "Reactive types prefer silence to any verbal response",
          "Reactive types need genuine clarity — false reassurance or minimizing responses signal that they are not being taken seriously, which increases anxiety and intensity",
          "Reactive types distrust all positive communication on principle",
          "Vague reassurance is perfectly effective for Reactive types in most situations",
        ],
        correctIndex: 1,
        explanation:
          "Reactive types (4, 6, 8) amplify emotion precisely because they need a real response. Vague reassurance ('everything is fine, don't worry') doesn't give them the clarity they need — it signals that the other person is not engaging honestly, which typically escalates rather than calms the reaction.",
      },
    },
    {
      id: "u33-l4-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Andre is a Type 8. He discovers that his business partner has been making major decisions without consulting him. In the next meeting, Andre doesn't minimize the situation or analyze it calmly — he confronts his partner directly and forcefully, expressing exactly how serious a breach of trust this is. His partner tries to say 'I didn't think it was a big deal.' Andre gets louder.",
        question: "What does Andre's escalation illustrate about the Reactive Harmonic strategy?",
        options: [
          "Andre is losing control and behaving irrationally",
          "Andre is using the Positive Outlook strategy to force optimism in the situation",
          "Andre is amplifying his reaction because he needs his partner to feel the weight of what happened — vague minimizing makes the Reactive type push harder",
          "Andre is using the Competency strategy — confronting the problem directly and logically",
        ],
        correctIndex: 2,
        explanation:
          "Andre's escalation is the Reactive pattern in action. His partner's attempt to minimize ('not a big deal') is exactly the response that intensifies a Reactive type's response. He needs clarity, acknowledgment, and genuine engagement — not reassurance. This is characteristic of Type 8's form of reactivity.",
      },
    },
    {
      id: "u33-l4-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following correctly summarizes all three Harmonic Groups?",
        options: [
          "Positive Outlook (2,7,9): reframe. Competency (1,3,5): logic. Reactive (4,6,8): amplify emotion.",
          "Positive Outlook (1,3,5): reframe. Competency (2,7,9): logic. Reactive (4,6,8): amplify emotion.",
          "Positive Outlook (4,6,8): reframe. Competency (1,3,5): logic. Reactive (2,7,9): amplify emotion.",
          "Positive Outlook (2,7,9): amplify emotion. Competency (1,3,5): reframe. Reactive (4,6,8): logic.",
        ],
        correctIndex: 0,
        explanation:
          "The correct groupings per Riso and Hudson: Positive Outlook = Types 2, 7, 9 (reframe pain as positive). Competency = Types 1, 3, 5 (set feelings aside, use logic). Reactive = Types 4, 6, 8 (amplify emotional reactions to demand a genuine response).",
      },
    },
  ],
};

// ── Export ────────────────────────────────────────────────────────────────────

export const unit33Lessons: Lesson[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
];
