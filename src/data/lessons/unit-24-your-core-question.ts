// Unit 24: Your Core Question
//
// Type-specific philosophical exploration. Each type gets a different
// central question and 2 concept lessons that speak to it.
// Personalized by Enneagram type. Labels are never shown.
//
// Key grounding: you do not outgrow your type. The pattern stays.
// What changes is your capacity to hold it, see it, and choose
// around it. These concepts are tools for that, not exits.

import type { Lesson } from "@/types/lessons";

// All 9 type paths. The app filters to the user's type at render time.
// Each lesson has personalized: true and personalizeFor: "enneagramType"

const TYPE_QUESTIONS: Record<number, { question: string; lessons: Lesson[] }> = {
  1: {
    question: "How do I act rightly in an imperfect world?",
    lessons: [
      {
        id: "cq-1a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "What you can and cannot control",
        subtitle: "The distinction that creates peace",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq1a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "The oldest useful distinction",
              body: "Some things are up to you: your judgments, your effort, your responses. Some things are not: other people, outcomes, the past. Most suffering comes from treating the second category as if it were the first."
            }
          },
          {
            id: "cq1a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "You have prepared a presentation with great care. A colleague edits it the morning it goes live, changing your wording without asking. The meeting goes well. What is most worth examining here?",
              options: [
                "Whether your standards are too high if the outcome was good anyway",
                "Whether your discomfort is about the outcome or about not being in control of the process",
                "Whether you should have locked the document so no one could edit it",
                "Whether you should trust this colleague less going forward"
              ],
              correctIndex: 1,
              explanation: "The outcome was fine — which means the discomfort points to something else: the loss of control over the process itself. Your type cares deeply about getting things right. The growth is in distinguishing the care from the need for control."
            }
          },
          {
            id: "cq1a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each item into whether it is within your control or outside it.",
              categories: ["Within your control", "Outside your control"],
              items: [
                { text: "The effort you put into a task", categoryIndex: 0 },
                { text: "How others judge the result", categoryIndex: 1 },
                { text: "Whether you act from your values", categoryIndex: 0 },
                { text: "Whether the world is fair", categoryIndex: 1 },
                { text: "Your response to something going wrong", categoryIndex: 0 },
                { text: "Other people changing their minds", categoryIndex: 1 }
              ]
            }
          },
          {
            id: "cq1a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "You spent a weekend volunteering for an organization you believe in. The event was disorganized, the leaders made decisions you disagreed with, and some of the work you did was redone by someone else afterward. You feel frustrated and a little hollow.",
              question: "What would it mean to hold this experience with your values intact but your need for control loosened?",
              options: [
                "Conclude this organization is not worth your time if they won't do things properly",
                "Accept that you cannot expect good outcomes if systems are broken",
                "Recognize that your contribution was real even though you could not control how it landed",
                "Decide to take a leadership role next time so this does not happen again"
              ],
              correctIndex: 2,
              explanation: "Your type's integrity lives in the effort, not the result. The contribution was real. The disorganization was real too. Both can be true. The practice is letting go of the result without losing the care."
            }
          },
          {
            id: "cq1a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "In your own words: what is the difference between having high standards and needing the world to meet them?",
              keyTerms: ["standards", "control", "let go", "accept", "enough"],
              minWords: 20,
              modelAnswer: "High standards are a strength. The suffering comes when the standard becomes a demand on reality. Your type will always care about getting it right. The growth is in how you hold the caring."
            }
          },
        ],
      },
      {
        id: "cq-1b", unitId: "your-core-question", order: 2, xpReward: 30,
        title: "Good enough as a radical act",
        subtitle: "The middle path is itself a skill",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern B: concept-intro → fill-in-blank → matching-pairs → scenario → socratic-prompt
          {
            id: "cq1b-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "Between too much and not enough",
              body: "There is a point between excess and deficiency that is not a compromise but a skill. Finding it requires more wisdom than hitting either extreme. 'Good enough' is not mediocrity. It is the recognition that perfection is a direction, not a destination."
            }
          },
          {
            id: "cq1b-fib", difficulty: 2,
            content: {
              type: "fill-in-blank",
              sentence: "Perfection is a ___, not a destination — which means the standard never fully arrives.",
              options: ["direction", "failure", "reward"],
              correctIndex: 0,
              explanation: "Treating perfection as a direction reframes the inner critic's demand. You can move toward better without requiring arrival. The standard stays high; the suffering decreases."
            }
          },
          {
            id: "cq1b-mp", difficulty: 2,
            content: {
              type: "matching-pairs",
              instruction: "Match each perfectionistic pattern to what it actually costs.",
              pairs: [
                { left: "Redoing something until it is right", right: "Time and energy that cannot be recovered" },
                { left: "Criticizing others' standards", right: "Connection and goodwill in relationships" },
                { left: "Postponing 'done' indefinitely", right: "The ability to ship, complete, and move on" },
                { left: "Making everything equally important", right: "The ability to know what actually matters" },
              ]
            }
          },
          {
            id: "cq1b-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "You are finishing a report that is due tomorrow. It is thorough and accurate. You notice three places where the language could be sharper. It is already 11pm. You have a full day tomorrow.",
              question: "Which response reflects genuine discernment rather than compulsion?",
              options: [
                "Stay up and fix all three — submitting anything less than your best would be wrong",
                "Fix the one that actually changes meaning; let the other two go",
                "Submit as-is and tell yourself quality is overrated",
                "Ask for an extension so you can do it properly"
              ],
              correctIndex: 1,
              explanation: "Discernment means directing your standards where they matter most. Fixing the change that affects meaning is high standards applied with precision. Fixing all three at 11pm regardless of impact is the pattern, not the standard."
            }
          },
          {
            id: "cq1b-s", difficulty: 3,
            content: {
              type: "socratic-prompt",
              question: "When was the last time 'good enough' felt like a relief instead of a failure?",
              reflection: "Your type will always feel the pull toward getting it exactly right. The practice is not killing that pull. It is choosing when to follow it.",
              revealLabel: "The practice",
              conceptTitle: "Imperfection as practice",
              conceptBody: "Deliberately letting something be imperfect — not because you don't care but because you recognize the cost of perfecting it — is one of the hardest things for your pattern. Each time you do it, the grip loosens slightly. The type stays. The grip changes."
            }
          },
        ],
      },
    ],
  },
  2: {
    question: "Who am I when I am not needed?",
    lessons: [
      {
        id: "cq-2a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "You exist before you are useful",
        subtitle: "Being is not earned through giving",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq2a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "You were here before you helped",
              body: "There is a version of you that exists independent of what you give to others. Not the helper, not the connector, not the one who holds the room together. Just you, sitting alone, with nothing to offer and no one to take care of. That version is not empty. It is the foundation."
            }
          },
          {
            id: "cq2a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "A close friend calls to say they are doing well — no crisis, no need. They just wanted to hear your voice. You feel glad but also faintly restless, unsure what to do with the call. What does this restlessness most likely signal?",
              options: [
                "You are not as close to this friend as you thought",
                "You have built your sense of connection around being needed, and presence alone feels unfamiliar",
                "You are more introverted than you realized",
                "The relationship is too one-sided and you give more than you receive"
              ],
              correctIndex: 1,
              explanation: "When you feel most alive in moments of being needed, pure connection without a helping role can feel disorienting. The restlessness is the pattern revealing itself — not a problem with the friendship."
            }
          },
          {
            id: "cq2a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each activity by whether it is driven by a genuine desire for it or by a need to be useful to someone.",
              categories: ["Genuinely for yourself", "Rooted in being needed"],
              items: [
                { text: "Reading a book you chose purely because it interests you", categoryIndex: 0 },
                { text: "Checking in on a friend 'just to make sure they are okay'", categoryIndex: 1 },
                { text: "Taking a long walk with no destination", categoryIndex: 0 },
                { text: "Offering to help with something before being asked", categoryIndex: 1 },
                { text: "Cooking a meal that only you will eat", categoryIndex: 0 },
                { text: "Staying late to make sure a colleague is not overwhelmed", categoryIndex: 1 }
              ]
            }
          },
          {
            id: "cq2a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "Everyone you love is genuinely fine this week — no one is struggling, no one needs advice, no one is going through anything difficult. You have a free Saturday with no obligations.",
              question: "What is the most revealing thing you could do with that day?",
              options: [
                "Reach out to people to see if there is anyone who might need something",
                "Feel a little lost and distract yourself with errands",
                "Do something — anything — that has no utility for anyone but you",
                "Use the time to get ahead on giving: plan future support for people in your life"
              ],
              correctIndex: 2,
              explanation: "The hardest thing for your type is not the giving. It is being with yourself when giving is not possible or needed. That Saturday is an experiment in existing without a function. The self is there. It just needs practice being visible."
            }
          },
          {
            id: "cq2a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "Describe one thing you enjoy that has nothing to do with another person.",
              keyTerms: ["enjoy", "alone", "myself", "just", "me"],
              minWords: 15,
              modelAnswer: "If this was hard to answer, that is the most important data point in this lesson. Your type does not lack a self. It buries the self under service. The self is still there. It just needs practice being visible."
            }
          },
        ],
      },
    ],
  },
  3: {
    question: "Am I what I achieve, or is there something underneath?",
    lessons: [
      {
        id: "cq-3a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "What happens when you stop performing",
        subtitle: "The person behind the image",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq3a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "You have been playing a character",
              body: "There is a difference between who you are and who you present. Everyone does this to some degree. But for your pattern, the gap can become so large that you lose track of which one is real. The performance becomes the identity, and the real person waits behind it."
            }
          },
          {
            id: "cq3a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "You reach a major goal you have been working toward for two years. The day after the celebration, you feel strangely empty rather than satisfied. What is this emptiness most accurately pointing to?",
              options: [
                "You set the wrong goal and should pursue something more meaningful",
                "Success requires more celebration to feel real",
                "Identity built on achievement has no floor — the next goal begins immediately to fill the gap",
                "You are someone who is fundamentally hard to satisfy, and that will not change"
              ],
              correctIndex: 2,
              explanation: "The emptiness after achievement is not a personal failure. It is the pattern revealing its logic: the self is defined by doing, so when the doing is done, the self temporarily disappears. The question is not how to celebrate better. It is what is there when the doing stops."
            }
          },
          {
            id: "cq3a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each self-description into whether it is based on doing or on being.",
              categories: ["Who I am (being)", "What I do (doing)"],
              items: [
                { text: "I care about honesty even when it costs me", categoryIndex: 0 },
                { text: "I have closed more deals than anyone on my team", categoryIndex: 1 },
                { text: "I feel genuine curiosity about most things I encounter", categoryIndex: 0 },
                { text: "I have three degrees and two certifications", categoryIndex: 1 },
                { text: "I show up for people when they are struggling", categoryIndex: 0 },
                { text: "I built a company from nothing", categoryIndex: 1 }
              ]
            }
          },
          {
            id: "cq3a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "A respected mentor asks you, in a quiet moment: 'Who are you when no one is watching and there's nothing to prove?' You open your mouth to answer and realize the response that comes naturally is a list of things you have done.",
              question: "What does this moment reveal, and what would a genuine answer require?",
              options: [
                "You are someone who expresses identity through action — that is valid and you should own it",
                "The question is unfair because identity is always expressed through action",
                "The natural list reveals how deeply achievement has become substituted for identity — answering genuinely requires turning attention inward rather than to your resume",
                "You should share your accomplishments more humbly to seem less self-focused"
              ],
              correctIndex: 2,
              explanation: "The instinct to answer with a list of achievements is the pattern in action. A genuine answer would reach for something beneath the doing: what you value, what moves you, who you are in stillness. That is the growth edge."
            }
          },
          {
            id: "cq3a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "Write one sentence about who you are that does not mention anything you have done or accomplished.",
              keyTerms: ["I am", "feel", "care", "value"],
              minWords: 10,
              modelAnswer: "If this was difficult, you have found the growth edge. Your type builds identity on output. The practice is discovering that identity also exists in stillness."
            }
          },
        ],
      },
    ],
  },
  4: {
    question: "Why does meaning keep slipping away?",
    lessons: [
      {
        id: "cq-4a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "Depth lives in the ordinary",
        subtitle: "What if the mundane is not the enemy of meaning",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq4a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "The ordinary is not the absence of depth",
              body: "There is a belief your pattern carries: that the real, meaningful experience is somewhere else — in the past, in the future, in someone else's life. But the people who report the deepest lives are usually the ones who found depth in what was already here. Not by making it special. By paying attention."
            }
          },
          {
            id: "cq4a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "You are reading an interview with someone whose life seems saturated with meaning — deep relationships, significant work, a rich inner world. You feel a familiar pull of longing and also a subtle dread. What is this combination most likely telling you?",
              options: [
                "Your life is genuinely less meaningful and you need to change it",
                "You idealize others' experiences in ways that make your own feel insufficient by comparison",
                "You are more sensitive than most people, which makes meaning harder to access",
                "The person in the interview has suffered more than you, and suffering creates depth"
              ],
              correctIndex: 1,
              explanation: "Your type tends to see others' lives as more real, more saturated, more significant. This idealization is not perception — it is a pattern. The longing points at what you already have but cannot fully inhabit, not at what is missing."
            }
          },
          {
            id: "cq4a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each experience into whether your type tends to dismiss it as ordinary or recognize it as meaningful.",
              categories: ["Tends to dismiss", "Tends to recognize as meaningful"],
              items: [
                { text: "A quiet Tuesday evening at home with tea", categoryIndex: 0 },
                { text: "An intense conversation about loss with a stranger", categoryIndex: 1 },
                { text: "A routine morning walk", categoryIndex: 0 },
                { text: "A piece of music that breaks something open", categoryIndex: 1 },
                { text: "Cooking the same meal you cook every week", categoryIndex: 0 },
                { text: "A relationship that is painful but feels deep", categoryIndex: 1 }
              ]
            }
          },
          {
            id: "cq4a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "A close friend describes a walk they took by themselves last week as one of the most peaceful, full moments they have had in months. They are not a particularly 'deep' person by your usual measure. You find yourself slightly irritated — partly envious, partly dismissive.",
              question: "What would it mean to take that irritation seriously as data?",
              options: [
                "Your friend found peace because they don't think as deeply as you do — simplicity has its advantages",
                "The irritation reveals that depth is available in ordinary moments, and part of you knows it — the pattern just keeps moving you past them",
                "You need to find more meaningful experiences to match what your friend described",
                "You and your friend have different needs and this comparison is not useful"
              ],
              correctIndex: 1,
              explanation: "The irritation is the tell. Something in you recognized that your friend accessed something real. The pattern says the ordinary is not enough. But the ordinary your friend experienced was full. The difference was attention, not content."
            }
          },
          {
            id: "cq4a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "Describe one moment from this week that was completely ordinary but, if you are honest, meant something to you.",
              keyTerms: ["ordinary", "moment", "small", "noticed", "meant"],
              minWords: 20,
              modelAnswer: "These moments are everywhere. Your type is wired to see them but also to dismiss them as 'not enough.' Collecting them, deliberately, is the counter-practice."
            }
          },
        ],
      },
    ],
  },
  5: {
    question: "Can I engage with the world without being depleted?",
    lessons: [
      {
        id: "cq-5a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "Understanding must become participation",
        subtitle: "The map is never the territory",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq5a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "Knowledge that stays in your head is not knowledge",
              body: "There is a point where more information does not help. It just postpones the moment of contact. Your type gathers understanding as a way to feel prepared. But preparation without action is a loop, not a path."
            }
          },
          {
            id: "cq5a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "You have been researching a subject for six months. You know more about it than almost anyone you know. A friend suggests you share what you have learned at a small gathering. You feel unexpectedly reluctant. What is the reluctance most likely about?",
              options: [
                "You still do not know enough to share — six months is not very long",
                "Teaching what you know would reduce it somehow, making it feel less yours",
                "The gathering from observation to participation feels like exposure — and exposure costs energy your type guards closely",
                "Your friend does not understand what you have been studying and cannot properly appreciate it"
              ],
              correctIndex: 2,
              explanation: "The reluctance is not about readiness — you are ready. It is about the move from inner to outer, from knowing to showing. That transition feels costly to your type in a way that is hard to explain. The practice is making the move and noticing what actually happens versus what you predicted."
            }
          },
          {
            id: "cq5a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each activity into whether it is engagement with the world or preparation for engagement.",
              categories: ["Actual engagement", "Preparation (staying in observation)"],
              items: [
                { text: "Reading three more books on a topic before acting", categoryIndex: 1 },
                { text: "Sending the email you have been drafting for two weeks", categoryIndex: 0 },
                { text: "Taking notes on a conversation you plan to have someday", categoryIndex: 1 },
                { text: "Attending the gathering even though you are not fully ready", categoryIndex: 0 },
                { text: "Thinking through all the ways a project could fail before starting", categoryIndex: 1 },
                { text: "Starting the project with what you have and adjusting as you go", categoryIndex: 0 }
              ]
            }
          },
          {
            id: "cq5a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "You have been considering joining a community of people who share one of your deepest interests. You have read everything about them, attended one event online, and could probably answer most questions about what they do. You have not yet introduced yourself.",
              question: "What is the most accurate description of where you are?",
              options: [
                "You are not ready yet — you need to know more before you can contribute meaningfully",
                "You have been preparing long enough that the preparation has become a substitute for participation",
                "You are an observer by nature and this community may not be the right fit",
                "You should wait until you have something genuinely worth contributing before introducing yourself"
              ],
              correctIndex: 1,
              explanation: "You passed readiness some time ago. The continued preparation is the loop, not the path. Contact replenishes in ways that observation does not. The practice is crossing the threshold once and noticing what survives it."
            }
          },
          {
            id: "cq5a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "Describe one area where you could stop researching and start doing. What is the smallest possible step?",
              keyTerms: ["do", "start", "try", "step", "enough"],
              minWords: 15,
              modelAnswer: "The smallest step is always the right one for your type. Grand action is overwhelming. One email, one conversation, one attempt. The practice is not 'engage more.' It is 'engage once, and notice that you survived.'"
            }
          },
        ],
      },
    ],
  },
  6: {
    question: "How do I act when I cannot be certain?",
    lessons: [
      {
        id: "cq-6a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "Inhabiting doubt skillfully",
        subtitle: "Uncertainty is a condition, not a problem",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq6a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "Doubt is not the enemy",
              body: "Your type treats uncertainty as a problem to solve: if you think hard enough, prepare well enough, consult the right people, certainty will arrive. But certainty rarely arrives. The people who act well under uncertainty are not the ones who found answers. They are the ones who learned to move without them."
            }
          },
          {
            id: "cq6a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "You are facing a decision with significant stakes and incomplete information. You have consulted three people you trust, done extensive research, and laid out the options. You still feel like you do not have enough to decide. What is most likely true?",
              options: [
                "You genuinely need more information — the feeling is reliable data about readiness",
                "The uncertainty has shifted from informational to existential — you know enough, but trusting yourself to decide feels unsafe",
                "The decision is objectively too difficult and you should ask someone else to make it",
                "The three people you consulted gave conflicting advice, which means no right answer exists"
              ],
              correctIndex: 1,
              explanation: "The shift from 'I don't have enough information' to 'I don't trust myself to use the information I have' is the pattern's move. More research will not close this gap. Acting on your own judgment — and finding out what happens — is the only thing that does."
            }
          },
          {
            id: "cq6a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each source of reassurance into whether it builds genuine inner authority or temporarily relieves anxiety.",
              categories: ["Builds inner authority", "Temporarily relieves anxiety"],
              items: [
                { text: "Acting on your own judgment and seeing what happens", categoryIndex: 0 },
                { text: "Asking a fourth person what they would do", categoryIndex: 1 },
                { text: "Noticing you have navigated uncertainty before and survived", categoryIndex: 0 },
                { text: "Finding a rule or guideline that tells you what to do", categoryIndex: 1 },
                { text: "Making the decision at 70% certainty and adjusting as needed", categoryIndex: 0 },
                { text: "Postponing the decision until you feel more sure", categoryIndex: 1 }
              ]
            }
          },
          {
            id: "cq6a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "You have been offered an opportunity that aligns with your values and would be good for you. The organization seems solid, the terms are fair, and the people seem trustworthy. You have a nagging sense that something might be wrong — you cannot name what. You have been sitting with this decision for three weeks.",
              question: "What is the most useful way to work with the nagging sense?",
              options: [
                "Take it seriously as a warning sign — your instincts exist for a reason and should not be overridden",
                "Ignore it — anxiety is not the same as insight and you should not let it run you",
                "Investigate whether the nagging points to a real concern or is the pattern generating doubt in the face of something good",
                "Wait until the feeling resolves on its own before deciding"
              ],
              correctIndex: 2,
              explanation: "Your type's vigilance is genuinely useful. It catches things others miss. But it also generates doubt where none is warranted, especially when something good appears. The skill is in learning to distinguish signal from static — asking what specifically the nagging is pointing to."
            }
          },
          {
            id: "cq6a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "Describe one decision you have been postponing because you are not sure enough. What would 'good enough certainty' look like?",
              keyTerms: ["decision", "postpone", "enough", "trust", "act"],
              minWords: 15,
              modelAnswer: "Good enough certainty is not 100%. It is usually around 70%. Your type waits for 95% and it never comes. Acting at 70% and adjusting is not reckless. It is how most people operate. Your type can learn to do it too, without losing the careful thinking that makes you valuable."
            }
          },
        ],
      },
    ],
  },
  7: {
    question: "What am I avoiding when I reach for the next thing?",
    lessons: [
      {
        id: "cq-7a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "The difference between pain and suffering",
        subtitle: "Contact with reality is not the same as a story about it",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq7a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "Pain is the signal. Suffering is the story.",
              body: "There is a difference between the raw feeling — the sadness, the fear, the boredom — and the narrative you wrap around it. Pain says: something is happening. Suffering says: this should not be happening, I need to escape, what is the next option. Your type moves to the story very quickly. The practice is staying with the signal."
            }
          },
          {
            id: "cq7a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "You are in the middle of a conversation that has become heavier than you expected — a friend is sharing something painful and sitting in the discomfort with them. You notice yourself scanning for a way to reframe it, make it lighter, find the silver lining. What is this impulse most accurately about?",
              options: [
                "You are a naturally optimistic person and this is a strength in difficult moments",
                "The friend needs encouragement and your instinct to provide it is appropriate",
                "The reframe is partly for them but also for you — staying in difficulty costs something your type moves away from",
                "Heavy conversations are genuinely not productive and lightening them is a service"
              ],
              correctIndex: 2,
              explanation: "The impulse to reframe can be genuine care. It can also be an exit from discomfort. Your type often cannot tell the difference in the moment. The question is: whose need is being served — theirs or yours?"
            }
          },
          {
            id: "cq7a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each response to a difficult emotion into whether it involves staying with the feeling or moving away from it.",
              categories: ["Staying with the feeling", "Moving away from it"],
              items: [
                { text: "Sitting with boredom for five minutes without picking up your phone", categoryIndex: 0 },
                { text: "Making a new plan when the current one feels disappointing", categoryIndex: 1 },
                { text: "Letting a sad feeling be there without trying to explain it away", categoryIndex: 0 },
                { text: "Finding three things you are excited about when anxiety shows up", categoryIndex: 1 },
                { text: "Asking yourself what the feeling is actually about", categoryIndex: 0 },
                { text: "Calling someone to get out of your head when things feel heavy", categoryIndex: 1 }
              ]
            }
          },
          {
            id: "cq7a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "You finish a project you have put months of energy into. It is done and good. Instead of feeling satisfied, you feel oddly flat — a low-level restlessness you cannot name. Within an hour you have started sketching out what comes next.",
              question: "What would it mean to stay with the flatness rather than immediately moving to the next thing?",
              options: [
                "Forcing yourself to feel satisfied when you don't is inauthentic and unhelpful",
                "The flatness signals that the project was not meaningful enough and you should choose better next time",
                "Staying with it would reveal what the pattern moves past — possibly grief, possibly the fear of being without a forward motion to hold onto",
                "Productive people always think about what comes next; this is a feature, not a problem"
              ],
              correctIndex: 2,
              explanation: "The move to 'what's next' is the pattern's signature. It works well — until you want to know what you are actually feeling. Staying with the flatness, even briefly, is the practice of contact. What is under it usually turns out to be survivable."
            }
          },
          {
            id: "cq7a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "Describe a time when you stayed with something uncomfortable instead of escaping it. What happened?",
              keyTerms: ["stayed", "uncomfortable", "felt", "through", "instead"],
              minWords: 20,
              modelAnswer: "The stay is the practice. Your type will always want to move. That energy is valuable. The growth is in choosing when to move and when to stay, instead of the movement choosing for you."
            }
          },
        ],
      },
    ],
  },
  8: {
    question: "How do I stay strong without hardening?",
    lessons: [
      {
        id: "cq-8a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "The river and the wall",
        subtitle: "Power through softness",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq8a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "Softness is not weakness. It is precision.",
              body: "A wall stops everything. A river moves around obstacles and still reaches the ocean. Both are powerful. But the river is more adaptable, more sustainable, and harder to destroy. Your type defaults to the wall. The practice is learning the river."
            }
          },
          {
            id: "cq8a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "A member of your team makes a significant error. You feel the familiar heat — the impulse to confront directly, to make sure they understand the gravity of it. You say what needs to be said and it lands hard. They shut down. The issue does not get resolved. What does this outcome reveal?",
              options: [
                "They are not resilient enough for honest feedback and that is their problem",
                "You were right about the issue but the delivery closed the door to actually fixing it — strength without softness can become counterproductive",
                "Direct feedback is always right even when it does not work; people need to learn to handle it",
                "You should soften your standards so people feel more comfortable making mistakes"
              ],
              correctIndex: 1,
              explanation: "Your directness is a genuine strength. The cost appears when the delivery is so forceful that the other person cannot receive it. The river finds a way through. The wall just creates more wall on both sides."
            }
          },
          {
            id: "cq8a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each approach to conflict or difficulty into whether it reflects the wall (hardening) or the river (strength with adaptability).",
              categories: ["The river (strength with adaptability)", "The wall (hardening)"],
              items: [
                { text: "Confronting a problem directly but adjusting when the approach is not working", categoryIndex: 0 },
                { text: "Refusing to show any uncertainty even when you have doubts", categoryIndex: 1 },
                { text: "Letting someone know you were affected by something they did", categoryIndex: 0 },
                { text: "Escalating force when you sense any softening will be read as weakness", categoryIndex: 1 },
                { text: "Telling the truth and then staying curious about how it lands", categoryIndex: 0 },
                { text: "Treating any pushback as a challenge to be overcome", categoryIndex: 1 }
              ]
            }
          },
          {
            id: "cq8a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "Someone you care about tells you that they sometimes feel afraid of your anger. Not that you have ever hurt them. Just that the intensity of it makes them careful about what they say around you. You feel an initial flash of defensiveness.",
              question: "What would strength look like in this moment?",
              options: [
                "Explain that your anger is not dangerous and they should not confuse intensity with threat",
                "Reassure them and then privately dismiss their concern as hypersensitivity",
                "Sit with the discomfort of being told your strength has a cost, and get curious about what they have been holding",
                "Dial back all emotional expression going forward so people feel safer"
              ],
              correctIndex: 2,
              explanation: "The wall response is to defend. The river response is to stay — to let the feedback land without collapsing or counterattacking. Your type is not afraid of hard truths. This is a hard truth about you. The strength is in receiving it."
            }
          },
          {
            id: "cq8a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "Describe one relationship where you could afford to be softer. What would that look like, specifically?",
              keyTerms: ["softer", "let", "show", "trust", "open"],
              minWords: 15,
              modelAnswer: "Your type will always be strong. Strength is not the issue. The issue is whether strength is the only tool available. Adding softness to the toolkit does not replace the strength. It makes it more precise."
            }
          },
        ],
      },
    ],
  },
  9: {
    question: "Do I matter enough to take up space?",
    lessons: [
      {
        id: "cq-9a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "Your anger is information",
        subtitle: "It tells you what matters",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
          {
            id: "cq9a-i", difficulty: 1,
            content: {
              type: "concept-intro",
              title: "Anger is not dangerous. It is a signal.",
              body: "Your type has a complicated relationship with anger. You might not even feel it as anger. It shows up as inertia, stubbornness, passive withdrawal, or a vague sense that things are not right. But underneath all of that is a signal: something matters to you, and it is not being honored."
            }
          },
          {
            id: "cq9a-mc", difficulty: 2,
            content: {
              type: "multiple-choice",
              question: "A group decision goes in a direction you disagreed with but did not push back on. Later you find yourself disengaged from the project — slow to respond, mildly resistant, going through the motions. What is most likely happening?",
              options: [
                "You are genuinely too busy and your energy is spread thin",
                "You do not care about this project as much as you thought",
                "Your unexpressed disagreement has become passive resistance — anger that had nowhere to go found another door",
                "The group made the wrong decision and the work quality reflects that"
              ],
              correctIndex: 2,
              explanation: "Your type's anger does not usually come out directly. When it is not expressed, it tends to express itself sideways: through slowing down, pulling back, disengaging. The inertia is not laziness. It is unexpressed caring that had no outlet."
            }
          },
          {
            id: "cq9a-so", difficulty: 2,
            content: {
              type: "sorting",
              instruction: "Sort each experience into whether it is likely a disguised form of anger or a genuine preference.",
              categories: ["Likely disguised anger", "Genuine preference or need"],
              items: [
                { text: "Suddenly losing interest in a project after being overruled", categoryIndex: 0 },
                { text: "Preferring quiet time after a long social day", categoryIndex: 1 },
                { text: "Agreeing to plans and then 'forgetting' about them", categoryIndex: 0 },
                { text: "Needing time to think before giving your opinion", categoryIndex: 1 },
                { text: "Going along with a decision and then feeling vaguely resentful", categoryIndex: 0 },
                { text: "Choosing not to engage in a conflict because it genuinely is not important to you", categoryIndex: 1 }
              ]
            }
          },
          {
            id: "cq9a-sc", difficulty: 2,
            content: {
              type: "scenario",
              scenario: "A friend group is planning a trip and the decisions keep getting made without your input — partly because you have not offered it. The destination is somewhere you do not actually want to go. You say nothing. The trip gets booked.",
              question: "At what point did you have the most power in this situation, and what would exercising it have required?",
              options: [
                "Once the trip was booked, it was too late — this is what happens when you are conflict-avoidant",
                "Before the trip was booked, when your preference was still relevant — exercising it would have required believing your preference deserved to be in the room",
                "You should have simply gone along happily — preferences this small are not worth creating conflict over",
                "Your friends should have asked for your input — the fault lies with them"
              ],
              correctIndex: 1,
              explanation: "The moment of most power was early, when a simple preference stated aloud could have changed the outcome. Your type often skips that moment not from lack of preference but from a deep, old belief that your preference is less important than the group's peace. That belief is worth examining."
            }
          },
          {
            id: "cq9a-f", difficulty: 3,
            content: {
              type: "free-recall",
              prompt: "Write down one opinion you have that you usually keep to yourself. Just write it. No one will see this.",
              keyTerms: ["think", "believe", "feel", "want", "opinion"],
              minWords: 10,
              modelAnswer: "Writing it is the first step. Your type does not lack opinions. It lacks practice voicing them. Each time you say what you actually think, even just to yourself, the muscle strengthens."
            }
          },
        ],
      },
    ],
  },
};

// Export all type lessons as a flat array. The app filters by user's type.
export const unit24Lessons: Lesson[] = Object.values(TYPE_QUESTIONS).flatMap(t => t.lessons);

// Export the question map for use in UI headers
export const TYPE_CORE_QUESTIONS: Record<number, string> = Object.fromEntries(
  Object.entries(TYPE_QUESTIONS).map(([k, v]) => [Number(k), v.question])
);
