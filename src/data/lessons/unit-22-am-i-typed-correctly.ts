// Unit 22: Am I Typed Correctly?
//
// An exploratory unit with NO right or wrong answers. Every exercise is a
// socratic-prompt or free-recall, never multiple-choice. The goal is to help
// the user sit with ambiguity, question their initial typing, and notice
// where the description fits and where it doesn't.
//
// Grounded in Enneagram: Riso-Hudson explicitly warn against premature
// self-typing and recommend 6-12 months of self-observation. This unit
// is the structured version of that advice.
//
// Important framing: the Enneagram type is not something you choose or
// grow out of. It is a core motivational pattern that stays with you.
// What changes is your relationship to it, your awareness of its pull,
// and how much it runs you vs. you running it.

import type { Lesson } from "@/types/lessons";

export const unit22Lessons: Lesson[] = [
  {
    id: "explore-fit",
    unitId: "am-i-typed-correctly",
    order: 1,
    title: "Where it fits",
    subtitle: "What resonates and what doesn't",
    xpReward: 30,
    exercises: [
      {
        id: "e22-1-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Your type is a hypothesis, not a verdict",
          body: "A short quiz points a direction. Real self-knowledge comes from months of self-observation. In this unit, there are no right or wrong answers. You are the expert on your own experience. We are just asking better questions.",
        },
      },
      {
        id: "e22-1-mc1",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "When reading a type description that fits you, what is the most reliable signal that it is actually YOUR type and not just a flattering portrait?",
          options: [
            "The positive traits sound like you on a good day",
            "The core fear, even if you rarely admit it, rings uncomfortably true",
            "People who know you well say it sounds accurate",
            "You scored highest on that type in three different tests",
          ],
          correctIndex: 1,
          explanation: "Surface behaviors and positive traits can be performed or aspired to. The core fear is harder to fake — it operates below conscious preference. When the fear description makes you slightly uncomfortable because it is too accurate, that discomfort is the signal.",
        },
      },
      {
        id: "e22-1-sort1",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Sort these pieces of evidence into two categories: stronger signals that you have found your type, or weaker signals that need more exploration.",
          categories: ["Stronger signal", "Weaker signal"],
          items: [
            { text: "The core fear description makes you wince because it is too accurate", categoryIndex: 0 },
            { text: "You scored this type on every online test you took", categoryIndex: 1 },
            { text: "Your automatic reaction under stress matches the type's disintegration pattern", categoryIndex: 0 },
            { text: "The type's strengths sound like compliments you have received", categoryIndex: 1 },
            { text: "The childhood wound description matches something you have never said out loud", categoryIndex: 0 },
            { text: "A friend read the description and said 'this is so you'", categoryIndex: 1 },
          ],
        },
      },
      {
        id: "e22-1-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You read two type descriptions back to back. One makes you feel seen and a little exposed. The other makes you feel good about yourself — confident, validated, like someone finally understands your best qualities.",
          question: "Which type description is more likely pointing to your actual type?",
          options: [
            "The one that makes you feel good, because resonance feels positive",
            "The one that makes you feel seen and slightly exposed",
            "Both are equally valid signals and should be weighed together",
            "Neither — emotional reactions are unreliable indicators of type",
          ],
          correctIndex: 1,
          explanation: "Feeling good about a description often means you are reading your idealized self-image, not your structure. The slight discomfort of being seen — the 'how did they know that' feeling — is what recognition actually feels like. It is not always comfortable.",
        },
      },
      {
        id: "e22-1-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Write about one part of your type description that does NOT feel like you. What about it feels off? Be specific — is it the behavior, the motivation, or the fear that doesn't land?",
          keyTerms: ["doesn't fit", "not me", "sometimes", "depends", "only when", "motivation", "fear"],
          minWords: 20,
          modelAnswer: "There is no right answer here. The parts that don't fit are often the most useful: they either point to a subtype variation, a wing influence, or a genuine mistype worth exploring. The motivation vs. behavior distinction is especially important — you may do the behavior for a completely different reason than the type description assumes.",
        },
      },
    ],
  },
  {
    id: "explore-mistype",
    unitId: "am-i-typed-correctly",
    order: 2,
    title: "The usual suspects",
    subtitle: "Types that look like yours but aren't",
    xpReward: 30,
    exercises: [
      {
        id: "e22-2-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Every type has a doppelganger",
          body: "Some types look nearly identical from the outside but are driven by completely different motivations. 1s and 6s both worry. 2s and 9s both accommodate. 3s and 7s both avoid negativity. The surface is not the structure.",
        },
      },
      {
        id: "e22-2-fib1",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "When two types look alike from the outside, the most reliable way to tell them apart is to examine their core ___.",
          options: ["behaviors", "fears", "relationships", "strengths"],
          correctIndex: 1,
          explanation: "Two people can do the same thing — work hard, avoid conflict, seek connection — for completely different reasons. The fear underneath the behavior is what distinguishes types that look identical on the surface. A 1 works hard to avoid being wrong; a 3 works hard to avoid being seen as a failure. Same action, different engine.",
        },
      },
      {
        id: "e22-2-match1",
        difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction: "Match each commonly confused type pair with the key motivational distinction that separates them.",
          pairs: [
            { left: "1 vs. 6", right: "Inner critic vs. scanning for external threat" },
            { left: "2 vs. 9", right: "Helping to be needed vs. merging to keep peace" },
            { left: "3 vs. 7", right: "Succeeding to be valued vs. moving fast to avoid pain" },
            { left: "4 vs. 9", right: "Longing to be uniquely seen vs. longing to disappear into comfort" },
            { left: "5 vs. 1", right: "Withdrawing to preserve energy vs. controlling to maintain order" },
            { left: "8 vs. 3", right: "Dominating to stay safe vs. performing to win admiration" },
          ],
        },
      },
      {
        id: "e22-2-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "Someone who identifies as a Type 2 realizes they also relate strongly to Type 9. Both types are warm, accommodating, and conflict-avoidant. A friend suggests they might actually be a 9.",
          question: "What is the most useful question to ask to distinguish a 2 from a 9 in this situation?",
          options: [
            "'Do I prefer lots of social time or more solitude?'",
            "'When I help others, is it to feel needed, or to keep things harmonious?'",
            "'Do I feel more connected to heart or gut instincts?'",
            "'Which type description has more sentences that feel accurate?'",
          ],
          correctIndex: 1,
          explanation: "Both 2s and 9s help and accommodate. The distinction is the internal engine: 2s help because giving makes them feel essential and loved; 9s accommodate because harmony and the absence of friction is what they need. The motivation under the identical surface behavior is the diagnostic question.",
        },
      },
      {
        id: "e22-2-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "If you had to pick a second type that almost fits you, which would it be? What about its core fear resonates — not its behavior, its fear?",
          reflection: "The runner-up type is important. Sometimes it is the real type and the first was the performance. The fear is usually more telling than any behavior.",
          revealLabel: "What runners-up reveal",
          conceptTitle: "The runner-up signal",
          conceptBody: "Your runner-up type often shares surface behavior with your actual type but has a different engine underneath. If you cannot decide between two types, try reading their core fear descriptions aloud. The one that makes you slightly defensive — 'that's not really me, I'm not THAT bad' — is often the real one. Defensiveness is recognition wearing a mask.",
        },
      },
    ],
  },
  {
    id: "explore-under-stress",
    unitId: "am-i-typed-correctly",
    order: 3,
    title: "When the mask slips",
    subtitle: "Your type under pressure",
    xpReward: 30,
    exercises: [
      {
        id: "e22-3-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Stress reveals the structure",
          body: "At your best, you can look like almost any type. Under sustained pressure, the real pattern shows. Your type is not who you are on a good day. It is who you are when the good day breaks down.",
        },
      },
      {
        id: "e22-3-mc1",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "The Enneagram describes how each type moves to a different type under stress. What makes this 'stress arrow' useful for verifying your type?",
          options: [
            "It tells you which type you will become if you keep deteriorating",
            "It predicts behavior you didn't choose — the pattern that shows up before you can manage it",
            "It proves your type is real because the movement is involuntary",
            "It gives you a second type identity to explore when the first feels uncertain",
          ],
          correctIndex: 1,
          explanation: "The stress arrow is useful not as prophecy but as verification: if your stress behavior reliably matches the arrow for a given type, that is evidence you have the right type. It reveals the structure because stress bypasses your managed self-presentation. You cannot perform the stress arrow — it just happens.",
        },
      },
      {
        id: "e22-3-fib1",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "Under chronic stress, a Type 7's usual optimism and future-focus collapses into the ___-like rigidity and self-criticism of their stress arrow.",
          options: ["Type 4", "Type 1", "Type 5", "Type 6"],
          correctIndex: 1,
          explanation: "Type 7 moves to Type 1 under stress — the normally spontaneous, possibility-oriented 7 becomes rigid, perfectionistic, and hypercritical. This is one of the Enneagram's most counterintuitive patterns, and it tends to surprise 7s when they first encounter it. If this describes your worst days, it is strong evidence for a 7 structure.",
        },
      },
      {
        id: "e22-3-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "Under two weeks of intense work pressure, someone who normally presents as warm, collaborative, and upbeat becomes uncharacteristically withdrawn, secretive, and detached — stockpiling information rather than sharing it, canceling plans, and going quiet.",
          question: "Which type structure does this stress pattern most strongly suggest?",
          options: [
            "Type 2, moving to Type 8 under stress",
            "Type 7, moving to Type 5 under stress",
            "Type 3, moving to Type 9 under stress",
            "Type 6, moving to Type 3 under stress",
          ],
          correctIndex: 1,
          explanation: "Type 7 moves to Type 5 under stress — the normally warm, high-engagement 7 withdraws, hoards energy and information, and cuts off. This pattern is so counterintuitive that 7s often do not recognize it as their own behavior until someone names it. The contrast between their 'on' state and their stress state is one of the largest in the Enneagram.",
        },
      },
      {
        id: "e22-3-sort1",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Sort these stress behaviors into the type structure they most likely reveal. Some patterns point to multiple types, but choose the best fit.",
          categories: ["Heart types (2, 3, 4)", "Head types (5, 6, 7)", "Body types (8, 9, 1)"],
          items: [
            { text: "Becomes hypervigilant, starts preparing for worst-case scenarios", categoryIndex: 1 },
            { text: "Explodes in rage then feels immediate shame about losing control", categoryIndex: 2 },
            { text: "Becomes dramatic, convinced no one truly understands them", categoryIndex: 0 },
            { text: "Withdraws completely, stops answering messages, goes underground", categoryIndex: 1 },
            { text: "Starts performing and image-managing even harder than usual", categoryIndex: 0 },
            { text: "Becomes passive and immovable, refuses to engage with the problem", categoryIndex: 2 },
          ],
        },
      },
    ],
  },
  {
    id: "explore-childhood",
    unitId: "am-i-typed-correctly",
    order: 4,
    title: "The earliest version of you",
    subtitle: "How your type showed up before you knew the word",
    xpReward: 30,
    exercises: [
      {
        id: "e22-4-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Your type is not something you developed. It is something you are.",
          body: "Most Enneagram teachers agree: your core type is present from very early childhood. It is not caused by your parents, though your environment shaped how it expressed. Looking at who you were at 7 or 8 often reveals the pattern more clearly than who you are now, because adult life adds layers of compensation.",
        },
      },
      {
        id: "e22-4-mc1",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "Why do Enneagram teachers often ask you to remember yourself at age 8 or 9, rather than focusing on who you are now?",
          options: [
            "Because personality is fixed by age 8 and stops developing after that",
            "Because childhood memories are more emotionally vivid and easier to access",
            "Because adult life adds coping layers that can make the core pattern harder to see",
            "Because children cannot hide their personalities the way adults learn to",
          ],
          correctIndex: 2,
          explanation: "By adulthood, most people have built sophisticated adaptations on top of their core structure — skills, strategies, social personas. These adaptations can obscure the pattern. At age 8, the coping architecture was simpler. The want was closer to the surface. What you organized your world around then is usually still what you organize it around now, just with more sophisticated tools.",
        },
      },
      {
        id: "e22-4-sort1",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Sort these childhood experiences and orientations into the type cluster they most likely point toward.",
          categories: ["More likely heart center (2, 3, 4)", "More likely head center (5, 6, 7)", "More likely body center (8, 9, 1)"],
          items: [
            { text: "Child who felt most alive when making other people feel special or helped", categoryIndex: 0 },
            { text: "Child who preferred to watch and understand things before participating", categoryIndex: 1 },
            { text: "Child who needed things to be fair and would speak up when they weren't", categoryIndex: 2 },
            { text: "Child who always had a backup plan and imagined alternative futures", categoryIndex: 1 },
            { text: "Child who felt different from peers, like they were seeing something others missed", categoryIndex: 0 },
            { text: "Child who would rather give in than fight and felt physically relieved when conflict ended", categoryIndex: 2 },
          ],
        },
      },
      {
        id: "e22-4-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "As a child, whenever there was conflict between family members, this person would physically leave the room, find something absorbing to do alone, and wait until everything was calm before coming back. They were not scared of the fighting. They just felt it had nothing to do with them and preferred to be somewhere else entirely.",
          question: "This childhood pattern is most consistent with which type's core structure?",
          options: [
            "Type 4, who withdraws to protect their sensitivity",
            "Type 9, who physically and psychologically removes themselves from conflict",
            "Type 5, who retreats to conserve energy and avoid intrusion",
            "Type 6, who avoids confrontation out of anxiety about the outcome",
          ],
          correctIndex: 1,
          explanation: "The 9's relationship to conflict is distinctive: it is not fear (6), sensitivity (4), or energy conservation (5). It is a kind of deep disengagement — conflict simply does not register as something that concerns them, so they leave. The physical ease of leaving, and the sense that the conflict is not really about them, points to 9 structure more precisely than the other options.",
        },
      },
      {
        id: "e22-4-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Describe a memory from before age 12 where you felt most like yourself — most real, most comfortable, most in your own skin. What were you doing? What does that memory tell you about what you most needed, even then?",
          keyTerms: ["remember", "felt", "myself", "real", "comfortable", "needed", "wanted"],
          minWords: 25,
          modelAnswer: "There is no wrong answer. The memory itself is data. What it reveals about what mattered to you before the world taught you what should matter is often the clearest window into core type. Notice especially what was absent from the memory — what stress or pressure was not there — because that absence often names your core desire.",
        },
      },
    ],
  },
  {
    id: "explore-settling",
    unitId: "am-i-typed-correctly",
    order: 5,
    title: "Sitting with uncertainty",
    subtitle: "What to do when you're still not sure",
    xpReward: 30,
    exercises: [
      {
        id: "e22-5-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Not knowing is fine",
          body: "Some people identify their type in minutes. Others take months or years. Both are valid. The Enneagram is a self-observation practice, not a label generator. If you are still unsure, you are doing it right. The exploration IS the practice.",
        },
      },
      {
        id: "e22-5-fib1",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "Riso and Hudson observed that people often have the strongest ___ reaction to accurate descriptions of their own type.",
          options: ["positive", "negative", "nostalgic", "confused"],
          correctIndex: 1,
          explanation: "It sounds counterintuitive, but accurate type descriptions often produce defensiveness rather than delight. The description is too close, too specific about things you would rather not see. The negative reaction — 'that is definitely not me' said too quickly, too firmly — is itself a signal worth sitting with. What you defend against is often what you most need to look at.",
        },
      },
      {
        id: "e22-5-match1",
        difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction: "Match each common reason for feeling uncertain about your type with the most useful next step for that specific uncertainty.",
          pairs: [
            { left: "Two types both feel accurate", right: "Compare their core fears, not their behaviors" },
            { left: "Your type changes depending on context", right: "Look for the motivation that stays constant across contexts" },
            { left: "You relate to all nine descriptions", right: "Notice which one makes you slightly defensive" },
            { left: "You have changed a lot in recent years", right: "Look at your patterns before age 25, the coping was simpler" },
            { left: "People disagree about your type", right: "Their view is data about your presentation, not your structure" },
          ],
        },
      },
      {
        id: "e22-5-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "After months of exploration, someone still cannot decide between two types. They have read every book, taken every test, and gotten different answers each time. A friend suggests they just 'pick one and commit.'",
          question: "What does the Enneagram tradition actually recommend in this situation?",
          options: [
            "Pick one and commit — living as that type will reveal whether it fits",
            "Work with both types as equally valid until something clicks definitively",
            "Accept that you may never know your type and use the system without a fixed number",
            "Seek an expert typing interview, because self-typing has inherent limitations",
          ],
          correctIndex: 1,
          explanation: "Riso and Hudson recommend holding both types as working hypotheses and using self-observation over time — not committing prematurely. Committing to the wrong type out of frustration can close off useful exploration. Working with both keeps you curious. And some people legitimately take years. The uncertainty itself can be the most honest position.",
        },
      },
      {
        id: "e22-5-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "Right now, what is your best guess at your type — and what is the one thing about that type that you still resist or cannot fully claim?",
          reflection: "What you resist about your type is often the most accurate part. The Enneagram describes structure, not flattering portrait. The uncomfortable pieces are usually the real ones.",
          revealLabel: "One more thing",
          conceptTitle: "The type that offends you",
          conceptBody: "If a type description makes you defensive — 'that is definitely not me' — it is worth spending more time with that discomfort rather than leaving it. The defense is not proof, but it is information. Your core motivation is not always something you are proud of. The type system does not require you to like what you find. It only requires honesty.",
        },
      },
    ],
  },
];
