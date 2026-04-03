// ─────────────────────────────────────────────────────────────────────────────
// Unit 15, Extraverted Feeling (Fe)
// Social thermostat, group emotional dynamics, interpersonal harmony
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "fe";

// ── Lesson 1: What IS Fe? ─────────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u15-l1",
  unitId: UNIT_ID,
  order: 1,
  title: "The Social Thermostat",
  subtitle: "What Extraverted Feeling feels like from the inside",
  xpReward: 20,
  exercises: [
    {
      id: "u15-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is Extraverted Feeling?",
        body: "Fe is a social-emotional radar that reads, manages, and responds to group dynamics. It asks: 'What does the group need right now? How is everyone feeling?' Fe instinctively tunes into the emotional atmosphere of any room it enters.",
        highlight: "social-emotional radar",
      },
    },
    {
      id: "u15-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fe Is NOT Just 'Being Nice'",
        body: "A huge misconception: Fe is not about being pleasant or people-pleasing. It's about social-emotional AWARENESS. An Fe user can be blunt, confrontational, or demanding, what makes it Fe is that they're reading and managing the group's emotional field to achieve a social goal.",
        highlight: "awareness, not niceness",
      },
    },
    {
      id: "u15-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core question Fe asks?",
        options: [
          "How do I personally feel about this?",
          "What does the group need right now?",
          "What is the most efficient approach?",
          "What patterns do I see emerging?",
        ],
        correctIndex: 1,
        explanation: "Fe is oriented outward toward the group. It constantly monitors social-emotional dynamics and asks what the collective needs, comfort, direction, honesty, celebration, or intervention.",
      },
    },
    {
      id: "u15-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is it WRONG to say 'Fe = being nice'?",
        options: [
          "Because Fe users are actually mean",
          "Because Fe is about social-emotional awareness, which can include being blunt or confrontational when the group needs it",
          "Because Fe is a thinking function, not a feeling function",
          "Because only Fi users can be nice",
        ],
        correctIndex: 1,
        explanation: "Fe reads what the social situation requires. Sometimes that means soothing. Sometimes it means saying the hard truth that everyone is avoiding. The tool is social awareness, niceness is just one possible output.",
      },
    },
    {
      id: "u15-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Fe is classified as a _____ function.",
        options: [
          "Perceiving, Introverted",
          "Judging, Extraverted",
          "Perceiving, Extraverted",
          "Judging, Introverted",
        ],
        correctIndex: 1,
        explanation: "Fe is a Judging function (it evaluates and makes decisions) with an Extraverted attitude (it references external, social criteria rather than internal personal values).",
      },
    },
    {
      id: "u15-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Fe characteristic to its description.",
        pairs: [
          { left: "Social Thermostat", right: "Reads and adjusts group emotional temperature" },
          { left: "Emotional Mirroring", right: "Naturally reflects others' feelings back to them" },
          { left: "Group Facilitation", right: "Ensures everyone feels included in conversation" },
          { left: "Social Calibration", right: "Adjusts tone and approach to fit the audience" },
          { left: "Conflict Mediation", right: "Steps in when group tension needs resolution" },
        ],
      },
    },
    {
      id: "u15-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fe instinctively tunes into the emotional ___ of any room, often before consciously registering what's happening.",
        options: ["atmosphere", "logic", "history", "efficiency"],
        correctIndex: 0,
        explanation: "Fe users often describe 'walking into a room and immediately knowing something is off.' They absorb the emotional atmosphere automatically, like a sponge soaking up water.",
      },
    },
    {
      id: "u15-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fe makes decisions based on ___ values and social dynamics, while Fi makes decisions based on ___ values.",
        options: ["shared / personal", "personal / shared", "logical / emotional", "external / no"],
        correctIndex: 0,
        explanation: "The key distinction: Fe orients toward shared, communal values, what the group considers good. Fi orients toward personal, individual values, what the self considers authentic.",
      },
    },
    {
      id: "u15-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "During a team meeting, Maya notices that the new intern hasn't spoken once and looks increasingly uncomfortable. Without drawing attention to the intern's silence, Maya naturally redirects the conversation: 'Actually, I'd love to hear different perspectives, Jamie, what's your take on this?'",
        question: "What Fe skill is Maya demonstrating?",
        options: [
          "Logical analysis of meeting efficiency",
          "Social-emotional awareness and subtle group facilitation",
          "Personal value assertion",
          "Pattern recognition about meeting dynamics",
        ],
        correctIndex: 1,
        explanation: "Maya read the emotional state of a group member (awareness), then subtly intervened to include them without causing embarrassment (facilitation). This is Fe at its finest, managing group dynamics with social intelligence.",
      },
    },
    {
      id: "u15-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "An ENFJ teacher notices one student bullying another. Instead of being 'nice' about it, she firmly says in front of the class: 'That behavior is not acceptable in this room. We treat each other with respect here.' Her voice is warm but uncompromising.",
        question: "Is this Fe even though she's being confrontational?",
        options: [
          "No, Fe would try to smooth things over gently",
          "Yes, Fe is managing the group's emotional safety, which sometimes requires firmness",
          "No, this is Te enforcing rules",
          "No, this is Fi asserting personal values",
        ],
        correctIndex: 1,
        explanation: "Absolutely Fe. She's establishing and enforcing social-emotional norms for the GROUP ('we treat each other with respect HERE'). Fe can be warm and firm simultaneously, it's not about being passive.",
      },
    },
    {
      id: "u15-l1-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Fe expressions vs. NOT Fe expressions.",
        categories: ["Fe Expression", "Not Fe"],
        items: [
          { text: "Reading the mood of a room instantly", categoryIndex: 0 },
          { text: "Building a logical framework from first principles", categoryIndex: 1 },
          { text: "Adjusting your communication style for your audience", categoryIndex: 0 },
          { text: "Refusing to compromise on a personal value", categoryIndex: 1 },
          { text: "Mediating a conflict between two friends", categoryIndex: 0 },
          { text: "Organizing files for maximum retrieval efficiency", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u15-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Fe as their DOMINANT function?",
        options: [
          "INFP and ISFP",
          "ENFJ and ESFJ",
          "INTP and ISTP",
          "ENTJ and ESTJ",
        ],
        correctIndex: 1,
        explanation: "ENFJ (Fe-Ni-Se-Ti) and ESFJ (Fe-Si-Ne-Ti) lead with Fe as their dominant function. Social-emotional dynamics are their primary mode of engaging with the world.",
      },
    },
  ],
};

// ── Lesson 2: Fe in Different Stack Positions ──────────────────────────────

const lesson2: Lesson = {
  id: "u15-l2",
  unitId: UNIT_ID,
  order: 2,
  title: "Fe in Your Stack",
  subtitle: "How Fe looks as dominant, auxiliary, tertiary, or inferior",
  xpReward: 25,
  exercises: [
    {
      id: "u15-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Dominant Fe: The Natural Host",
        body: "Fe-dominant types (ENFJ, ESFJ) are natural social orchestrators. They instinctively create environments where people feel welcomed and connected. Their identity is deeply tied to their ability to read and serve the group's emotional needs.",
        highlight: "social orchestrators",
      },
    },
    {
      id: "u15-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Inferior Fe: The Social Blind Spot",
        body: "Fe-inferior types (INTP, ISTP) often feel clumsy in emotional-social situations. They may fear being judged for their social skills, avoid group emotional dynamics, or swing between cold detachment and sudden, awkward attempts at social connection.",
        highlight: "social blind spot",
      },
    },
    {
      id: "u15-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does dominant Fe (ENFJ/ESFJ) typically show up?",
        options: [
          "As a quiet internal compass for personal decisions",
          "As a constant, automatic reading of social dynamics that guides all interactions",
          "As an occasional social awareness that supplements logic",
          "As anxiety about social situations",
        ],
        correctIndex: 1,
        explanation: "Dominant Fe is always 'on', it's the primary lens through which ENFJs and ESFJs experience the world. They are constantly, automatically reading social-emotional dynamics.",
      },
    },
    {
      id: "u15-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Fe as their INFERIOR function?",
        options: [
          "ENFJ and ESFJ",
          "INFJ and ISFJ",
          "INTP and ISTP",
          "ENTP and ENFP",
        ],
        correctIndex: 2,
        explanation: "INTP (Ti-Ne-Si-Fe) and ISTP (Ti-Se-Ni-Fe) have Fe in the inferior position. Social-emotional dynamics are their least conscious, most vulnerable area.",
      },
    },
    {
      id: "u15-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When Fe is auxiliary (second function), as in INFJ and ISFJ, how does it typically work?",
        options: [
          "It dominates all social interactions",
          "It supports the dominant perceiving function by adding social awareness and warmth",
          "It creates anxiety about group dynamics",
          "It operates identically to dominant Fe",
        ],
        correctIndex: 1,
        explanation: "Auxiliary Fe in INFJs supports their Ni insights by giving them social awareness and communication skills. In ISFJs, it supports Si by adding warmth and care to their detailed memory of others' needs.",
      },
    },
    {
      id: "u15-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to how Fe manifests.",
        pairs: [
          { left: "Dominant (ENFJ/ESFJ)", right: "Identity built around social orchestration" },
          { left: "Auxiliary (INFJ/ISFJ)", right: "Warm social skills supporting inner perception" },
          { left: "Tertiary (ENTP/ESTP)", right: "Developing charm and social savvy" },
          { left: "Inferior (INTP/ISTP)", right: "Social awkwardness, fear of emotional situations" },
        ],
      },
    },
    {
      id: "u15-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "An INTP under stress may experience inferior Fe as sudden ___ about whether people like them, despite normally seeming indifferent to social approval.",
        options: ["intense anxiety", "logical analysis", "creative inspiration", "physical restlessness"],
        correctIndex: 0,
        explanation: "When inferior Fe erupts in Ti-dominant types, it often manifests as overwhelming social anxiety, 'Does everyone hate me? Did I say something wrong?', which feels completely alien to their usual logical composure.",
      },
    },
    {
      id: "u15-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Tertiary Fe (in ENTPs and ESTPs) often shows up as developing ___, a growing ability to charm and connect, though less naturally than in Fe-dominant types.",
        options: ["social savvy", "logical precision", "value clarity", "sensory awareness"],
        correctIndex: 0,
        explanation: "Tertiary Fe develops through life experience. ENTPs and ESTPs often become surprisingly charming and socially skilled as they mature, though it remains a supporting function rather than their primary mode.",
      },
    },
    {
      id: "u15-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Chris, an ISTP mechanic, attends a coworker's retirement party. He stands in the corner, unsure what to say. When someone starts crying during the farewell speech, Chris freezes. Later he tells a friend, 'I wanted to say something supportive but I literally couldn't find the words. I just stood there like an idiot.'",
        question: "What is happening with Chris's Fe?",
        options: [
          "Chris doesn't have Fe at all",
          "Chris's inferior Fe makes emotional group situations feel overwhelming and disorienting",
          "Chris is using Te instead of Fe",
          "Chris is demonstrating healthy Fe by staying quiet",
        ],
        correctIndex: 1,
        explanation: "Classic inferior Fe. Chris WANTS to connect socially (Fe is still in his stack) but lacks the developed skill to navigate emotional group dynamics. The desire is there; the execution feels paralyzed.",
      },
    },
    {
      id: "u15-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Compare two hosts at separate dinner parties. Host A (ESFJ) seamlessly manages the conversation, ensures no one is left out, and reads the room to know when to shift topics. Host B (INTP) prepared an elaborate meal but keeps retreating to the kitchen, and when asked 'Are you okay?' says, 'I'm fine, I just... groups are a lot.'",
        question: "How does stack position explain their different hosting experiences?",
        options: [
          "Host A is just more social by nature, nothing to do with functions",
          "Host A's dominant Fe makes group facilitation effortless; Host B's inferior Fe makes it draining and anxiety-producing",
          "Host B is using more Fe by cooking for everyone",
          "Host A is using Te to organize, not Fe",
        ],
        correctIndex: 1,
        explanation: "Same function, opposite experiences. Fe-dominant types find social orchestration energizing and natural. Fe-inferior types find it exhausting and anxiety-producing, even when they genuinely care about their guests.",
      },
    },
    {
      id: "u15-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Dominant Fe vs. Inferior Fe.",
        categories: ["Dominant Fe", "Inferior Fe"],
        items: [
          { text: "Effortlessly reads the emotional needs of a room", categoryIndex: 0 },
          { text: "Freezes in emotionally charged social situations", categoryIndex: 1 },
          { text: "Identity is tied to being a social connector", categoryIndex: 0 },
          { text: "Sudden anxiety: 'Does everyone secretly hate me?'", categoryIndex: 1 },
          { text: "Naturally shifts tone to match what the audience needs", categoryIndex: 0 },
          { text: "Overcompensates with awkward people-pleasing under stress", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u15-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "True or false: Inferior Fe means the person doesn't care about social connection.",
        options: [
          "True, they genuinely don't care about people",
          "False, they often deeply desire connection but struggle with the social-emotional skills to achieve it",
          "True, thinking types are anti-social",
          "False, but only because society forces them to care",
        ],
        correctIndex: 1,
        explanation: "Inferior Fe doesn't mean absence of social desire, it means the SKILL of navigating social-emotional dynamics is underdeveloped. INTPs and ISTPs often crave meaningful connection but feel clumsy in achieving it.",
      },
    },
  ],
};

// ── Lesson 3: Fe in Real Life ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u15-l3",
  unitId: UNIT_ID,
  order: 3,
  title: "Fe in the Wild",
  subtitle: "Relationships, work, stress, and the shadow side of Fe",
  xpReward: 25,
  exercises: [
    {
      id: "u15-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fe in Relationships",
        body: "Fe users show love by creating emotional environments. They remember what you need, anticipate your feelings, and create rituals that bind people together. Their shadow side: they can lose themselves in others' needs, neglecting their own identity.",
        highlight: "emotional environments",
      },
    },
    {
      id: "u15-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fe Under Stress & the Ti Grip",
        body: "Under stress, Fe users may become emotionally manipulative or martyr-like ('After everything I've done for you...'). In extreme stress, Fe-dominant types can flip to their inferior Ti, becoming coldly logical, hyper-critical, and cutting in ways that shock everyone.",
        highlight: "Ti grip",
      },
    },
    {
      id: "u15-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Fe typically show love?",
        options: [
          "Through quiet, private gestures only the recipient would notice",
          "By creating warm social environments, remembering needs, and building shared rituals",
          "Through logical problem-solving for the other person",
          "By giving the other person complete independence and space",
        ],
        correctIndex: 1,
        explanation: "Fe love is environmental and communal. Fe users create warmth around them, holiday traditions, group dinners, remembering how you take your coffee, making sure your birthday is celebrated.",
      },
    },
    {
      id: "u15-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the shadow side of Fe in relationships?",
        options: [
          "Being too logical and cold",
          "Losing their own identity by merging with others' emotional needs",
          "Being too focused on personal values",
          "Ignoring social dynamics completely",
        ],
        correctIndex: 1,
        explanation: "Fe's biggest risk is self-erasure. In their drive to serve others' emotional needs, Fe users can forget to ask: 'But what do I actually need?' This is why healthy Fe development requires integrating some Fi.",
      },
    },
    {
      id: "u15-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What happens to an ENFJ in a 'Ti grip' (extreme stress)?",
        options: [
          "They become withdrawn and cold, making cutting logical criticisms",
          "They become more social and people-pleasing",
          "They start obsessing over physical sensations",
          "They generate endless new ideas",
        ],
        correctIndex: 0,
        explanation: "The ENFJ's inferior Ti erupts as harsh, cold logic. The normally warm social connector becomes biting and critical, pointing out logical flaws in everyone around them in ways that feel cruel and out of character.",
      },
    },
    {
      id: "u15-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each life domain to how Fe shows up.",
        pairs: [
          { left: "Relationships", right: "Creating warmth and anticipating emotional needs" },
          { left: "Work", right: "Team building, morale management, conflict resolution" },
          { left: "Stress", right: "Martyr complex or emotional manipulation" },
          { left: "Extreme Stress", right: "Flipping to cold, harsh logical criticism (Ti grip)" },
          { left: "Parenting", right: "Creating family rituals and emotional safety" },
        ],
      },
    },
    {
      id: "u15-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fe users at work often naturally become the team's ___, managing interpersonal dynamics even when it's not in their job description.",
        options: ["emotional glue", "logical analyst", "quiet observer", "independent contributor"],
        correctIndex: 0,
        explanation: "Fe users gravitate toward social-emotional roles in any group. They become the person everyone goes to for interpersonal issues, the one who organizes team events, and the one who notices when someone is struggling.",
      },
    },
    {
      id: "u15-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "The unhealthy Fe pattern of 'After everything I've done for you...' is called the ___ complex.",
        options: ["martyr", "hero", "victim", "savior"],
        correctIndex: 0,
        explanation: "The Fe martyr complex emerges when Fe users give and give without setting boundaries, then build resentment when others don't reciprocate. It's a sign of unhealthy Fe that hasn't learned to advocate for its own needs.",
      },
    },
    {
      id: "u15-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Robin, an ESFJ manager, stays late every night to help struggling team members, organizes every birthday celebration, and mediates every interpersonal conflict. One day Robin's partner says, 'You give everything to your team and have nothing left for us. Who even ARE you outside of taking care of other people?'",
        question: "What Fe pattern is Robin caught in?",
        options: [
          "Healthy Fe leadership",
          "Self-erasure through over-identification with others' needs",
          "Ti grip behavior",
          "Normal extrovert behavior",
        ],
        correctIndex: 1,
        explanation: "Robin has lost herself in Fe's outward orientation. When Fe is unhealthy, the person's entire identity becomes 'the one who takes care of everyone.' The partner's question, 'Who are you outside of this?', points to the missing Fi integration.",
      },
    },
    {
      id: "u15-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "On social media, you notice someone who always adjusts their posts to match what will get the best response from their audience. They share uplifting quotes for some followers, edgy humor for others, and political content only when it aligns with their followers' views. A friend calls this 'fake.'",
        question: "Is this person being fake, or is this Fe in action?",
        options: [
          "Definitely fake, authentic people are the same everywhere",
          "This is Fe social calibration, adjusting presentation for the audience. Whether it's healthy depends on whether a core self exists underneath",
          "This is Te organizing their social media strategy",
          "This is Ni predicting what content will perform best",
        ],
        correctIndex: 1,
        explanation: "Fe naturally calibrates social presentation. This isn't inherently fake, everyone code-switches. The question is whether there's a stable identity underneath the social adaptation (healthy) or whether the person has lost themselves in the performance (unhealthy).",
      },
    },
    {
      id: "u15-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Healthy Fe vs. Unhealthy Fe.",
        categories: ["Healthy Fe", "Unhealthy Fe"],
        items: [
          { text: "Creating inclusive environments while maintaining boundaries", categoryIndex: 0 },
          { text: "Keeping score of favors and expecting reciprocation", categoryIndex: 1 },
          { text: "Giving honest feedback with warmth and care", categoryIndex: 0 },
          { text: "Guilt-tripping others for not appreciating your sacrifices", categoryIndex: 1 },
          { text: "Reading social dynamics to help everyone participate", categoryIndex: 0 },
          { text: "Manipulating group emotions to get your way", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u15-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does healthy Fe development require?",
        options: [
          "Eliminating all personal needs in service of others",
          "Learning to balance service to others with awareness of one's own needs (Fi integration)",
          "Becoming completely self-focused",
          "Suppressing all emotional awareness",
        ],
        correctIndex: 1,
        explanation: "Healthy Fe integrates some Fi, the ability to ask 'What do I need?' alongside 'What does the group need?' Without this balance, Fe users burn out or become resentful.",
      },
    },
  ],
};

// ── Lesson 4: Spotting Fe & Common Confusions ──────────────────────────────

const lesson4: Lesson = {
  id: "u15-l4",
  unitId: UNIT_ID,
  order: 4,
  title: "Fe vs. the Imposters",
  subtitle: "Spotting Fe in others and distinguishing it from similar functions",
  xpReward: 30,
  exercises: [
    {
      id: "u15-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fe vs. Fi: The Mirror vs. The Compass",
        body: "Fe mirrors the group, it adapts its expression to serve social harmony. Fi is a compass, it stays true to internal values regardless of social context. Fe asks 'What do WE feel?' Fi asks 'What do I feel?' Both are valid; neither is superior.",
        highlight: "mirror vs. compass",
      },
    },
    {
      id: "u15-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fe vs. Social Anxiety",
        body: "Fe is often confused with social anxiety, but they're very different. Fe users are socially SKILLED, they read rooms effortlessly. People with social anxiety may be hyperaware of social dynamics but lack confidence. You can have Fe without anxiety and anxiety without Fe.",
        highlight: "skilled, not anxious",
      },
    },
    {
      id: "u15-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Person A changes their behavior based on who they're with. Person B stays exactly the same in every social context. Which is using Fe?",
        options: [
          "Person B, consistency shows social awareness",
          "Person A, Fe naturally calibrates to the social context",
          "Neither, this has nothing to do with functions",
          "Both, everyone uses Fe sometimes",
        ],
        correctIndex: 1,
        explanation: "Fe users naturally adjust their communication style, energy level, and topics based on who they're with. This isn't being fake, it's social intelligence. Fi users are more likely to stay consistent regardless of context.",
      },
    },
    {
      id: "u15-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which statement is an Fe perspective on group conflict?",
        options: [
          "'Everyone needs to figure out their own feelings about this'",
          "'We need to clear the air, this tension is affecting the whole team'",
          "'Let me analyze the logical roots of this disagreement'",
          "'I need to sit with this privately before I can respond'",
        ],
        correctIndex: 1,
        explanation: "Fe sees conflict as a GROUP problem that needs GROUP resolution. The Fe user focuses on the social-emotional impact ('affecting the whole team') and wants to actively manage the dynamic ('clear the air').",
      },
    },
    {
      id: "u15-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "An Fe user and an Fi user both care deeply about a friend who is struggling. How do their approaches differ?",
        options: [
          "Fe creates a supportive environment; Fi offers deep personal understanding",
          "Fe doesn't actually care; Fi does",
          "Fi creates a supportive environment; Fe offers deep personal understanding",
          "There's no difference in how they help",
        ],
        correctIndex: 0,
        explanation: "Fe helps by managing the emotional environment, organizing support, rallying friends, creating comfort. Fi helps by deeply understanding the individual, sitting with them, validating their unique experience, honoring their feelings.",
      },
    },
    {
      id: "u15-l4-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these responses to a friend's breakup into Fe vs. Fi.",
        categories: ["Fe Response", "Fi Response"],
        items: [
          { text: "Organizes a girls' night to lift their spirits", categoryIndex: 0 },
          { text: "Sits with them in silence, just being present", categoryIndex: 1 },
          { text: "Rallies the friend group: 'We all need to be there for them'", categoryIndex: 0 },
          { text: "'I know exactly how this kind of pain feels'", categoryIndex: 1 },
          { text: "Makes sure the friend isn't alone for the next few weeks", categoryIndex: 0 },
          { text: "'You don't have to pretend to be okay with me'", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u15-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fe can be confused with social anxiety, but the key difference is that Fe is social ___ while anxiety is social ___.",
        options: ["skill / fear", "fear / skill", "avoidance / engagement", "thinking / feeling"],
        correctIndex: 0,
        explanation: "Fe users are socially capable, they read rooms, manage dynamics, and facilitate groups effectively. Social anxiety involves fear and avoidance of social situations regardless of actual social skill.",
      },
    },
    {
      id: "u15-l4-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each 'Fe confusion' to why it's wrong.",
        pairs: [
          { left: "Fe = people-pleasing", right: "Wrong: Fe can be blunt when the group needs honesty" },
          { left: "Fe = weakness", right: "Wrong: managing group dynamics requires enormous skill" },
          { left: "Fe = fake", right: "Wrong: social calibration is intelligence, not deception" },
          { left: "Fe = no logic", right: "Wrong: Fe makes logical social calculations constantly" },
        ],
      },
    },
    {
      id: "u15-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two managers handle a underperforming employee differently. Manager A (Fe-dom) says: 'I've noticed you seem stressed lately. The team's counting on you and I want to help you get back on track. What do you need from me?' Manager B (Te-dom) says: 'Your numbers are down 30%. Here's a performance improvement plan with specific targets and deadlines.'",
        question: "How do Fe and Te differ in addressing the same problem?",
        options: [
          "Fe ignores the problem; Te addresses it",
          "Fe addresses it through social-emotional dynamics and relationships; Te addresses it through measurable outcomes and systems",
          "Fe is better at management; Te is worse",
          "Te shows genuine concern; Fe is just performing",
        ],
        correctIndex: 1,
        explanation: "Both managers are addressing the problem effectively through their dominant function. Fe frames it as a relational, emotional issue. Te frames it as a measurable performance issue. Neither is inherently better, they work for different situations and people.",
      },
    },
    {
      id: "u15-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're trying to determine whether someone uses Fe or is a highly empathetic Fi user. Both seem to care deeply about people. Both cry at movies. Both are described as 'warm' by friends.",
        question: "What's the BEST question to distinguish Fe from empathetic Fi?",
        options: [
          "'Do you cry at sad movies?' (emotional sensitivity)",
          "'When there's tension in a group, do you feel compelled to fix the group dynamic, or do you focus on how it affects you personally?'",
          "'Are you an introvert or extrovert?'",
          "'Do you care about other people?'",
        ],
        correctIndex: 1,
        explanation: "The key distinguisher is DIRECTION. Fe feels compelled to manage the GROUP dynamic. Fi feels the impact on SELF and others as individuals. Both can be equally warm, caring, and empathetic, the orientation is what differs.",
      },
    },
    {
      id: "u15-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "In a heated political discussion online, Person A says: 'You're hurting people with that opinion and you need to consider the impact on marginalized communities.' Person B says: 'That opinion conflicts with what I know to be morally right, and I won't pretend otherwise.'",
        question: "Which person is more likely using Fe and which Fi?",
        options: [
          "Person A = Fi, Person B = Fe",
          "Person A = Fe (referencing community impact), Person B = Fi (referencing personal moral conviction)",
          "Both are using Fe",
          "Both are using Fi",
        ],
        correctIndex: 1,
        explanation: "Person A frames the issue in terms of impact on the GROUP (community, marginalized people), Fe orientation. Person B frames it as a PERSONAL moral stand (what I know to be right), Fi orientation. Same topic, different feeling orientations.",
      },
    },
    {
      id: "u15-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick review: Fe is best described as...",
        options: [
          "An internal compass that evaluates against personal values",
          "A social thermostat that reads and manages group emotional dynamics",
          "A logic engine that builds internal frameworks",
          "A pattern synthesizer that converges on insights",
        ],
        correctIndex: 1,
        explanation: "Fe is the social thermostat. It reads the emotional temperature of groups and actively works to manage, adjust, and serve the collective emotional needs.",
      },
    },
  ],
};

export const feLessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
