// Daily Type Observations
// First-person self-observation in the type's voice, grounded in Naranjo's methodology.
// Each type has 4 rotating observations. Selected by (dayOfYear % 4).
// "Explore" = journal prompt. "Practice" = micro-exercise toward integration direction.

export interface TypeObservation {
  text: string;
  explorePrompt: string;
  practiceInstruction: string;
}

export interface DailyObservationSet {
  typeName: string;
  typeAlias: string;
  // Integration direction (Riso-Hudson): the type this one moves toward in growth
  integrationType: number;
  observations: TypeObservation[];
}

const observations: Record<number, DailyObservationSet> = {
  1: {
    typeName: "Reformer",
    typeAlias: "The Reformer",
    integrationType: 7,
    observations: [
      {
        text: "I noticed today how quickly I scan for what's wrong — in a conversation, a room, my own work. The standard arrives before I do. I'm not sure I chose it; it just seems to be there, waiting.",
        explorePrompt: "Where did today's internal standard come from? Was it yours, or did you inherit it from someone else?",
        practiceInstruction: "Name one thing today that was genuinely good enough. Don't qualify it. Just let it be complete.",
      },
      {
        text: "There's a particular tension between knowing the right way to do something and watching it be done differently. I manage the impulse to correct. Sometimes I manage it successfully.",
        explorePrompt: "When you hold back a correction, what are you protecting — the other person, the relationship, or your image of yourself as patient?",
        practiceInstruction: "Do one small thing today with deliberate imprecision. Notice what happens in your body.",
      },
      {
        text: "The resentment is often quiet. It accumulates in the gap between the effort I put in and what others seem to put in. I rarely say it directly. It lives in the quality of my silence.",
        explorePrompt: "What would you need to express directly to someone today to release some of what you're carrying quietly?",
        practiceInstruction: "Find something genuinely enjoyable to do for ten minutes — not productive, not improving anything. Just pleasurable.",
      },
      {
        text: "I catch myself editing in real time: the email, the sentence, the plan. There's a version in my head that the actual never quite reaches. I wonder if the gap is the point.",
        explorePrompt: "What is the ideal in your head protecting you from? What would you have to accept if the gap closed?",
        practiceInstruction: "Send the next message or email without rereading it. Trust the first version.",
      },
    ],
  },

  2: {
    typeName: "Helper",
    typeAlias: "The Helper",
    integrationType: 4,
    observations: [
      {
        text: "I found myself rearranging what I said to make it more useful to them. There was a moment — brief — where I noticed I'd left out the part that was actually true. I moved on before I could examine it.",
        explorePrompt: "What did you leave unsaid today in order to be more palatable or helpful? What were you afraid would happen if you said it?",
        practiceInstruction: "Ask one person today what you need from them — not what they need from you.",
      },
      {
        text: "The anticipation of their needs arrived before the needs did. I'd already prepared the solution. It's efficient, I tell myself. But sometimes I wonder if I'm responding to them or to my idea of them.",
        explorePrompt: "Whose needs are you most confident you understand? How recently did you actually ask them instead of assuming?",
        practiceInstruction: "Notice the next time you offer help before it's been requested. Pause. Let the moment pass without filling it.",
      },
      {
        text: "There's a satisfaction in being needed that I don't always admit to myself. It's not selfish exactly — it just means the giving isn't purely for them. I'm not sure what to do with that.",
        explorePrompt: "What do you receive from being helpful that you rarely name directly?",
        practiceInstruction: "Do something today that is only for you — not to model self-care for others, not to recharge for more giving. Just for you.",
      },
      {
        text: "I kept track today — not consciously, but the ledger was running. Who responded, who thanked me, who seemed to take without noticing. I don't like that I do this.",
        explorePrompt: "When do you feel unappreciated? What are you giving that you haven't acknowledged wanting recognition for?",
        practiceInstruction: "Write down three things you genuinely feel — not think, not want for others. Just your own interior state right now.",
      },
    ],
  },

  3: {
    typeName: "Achiever",
    typeAlias: "The Achiever",
    integrationType: 6,
    observations: [
      {
        text: "I caught myself constructing the answer before understanding the question. The image of competence arrived faster than competence itself. I wonder sometimes which one I've actually developed.",
        explorePrompt: "In what area of your life are you performing confidence rather than feeling it? What would change if you admitted that?",
        practiceInstruction: "In one conversation today, say 'I don't know' — and don't follow it immediately with a recovery.",
      },
      {
        text: "The task was finished but I moved immediately to the next one. There was no pause, no acknowledgment. The completion only existed as a platform for the next thing.",
        explorePrompt: "What would it mean to actually rest in a completed thing? What are you afraid would happen in the pause?",
        practiceInstruction: "Before you move to the next task today, take two minutes to sit with the one you just finished. Nothing more.",
      },
      {
        text: "I adapted to the room — the tone, the vocabulary, the level of certainty. I do it well enough that I'm not always sure afterward what my actual position was.",
        explorePrompt: "Where do you end and the role begin? What do you know about yourself that doesn't depend on anyone else's perception?",
        practiceInstruction: "Name one belief you hold that you know would not be popular in your current professional or social context. Write it down privately.",
      },
      {
        text: "Someone asked how I was doing and I gave them the professional version. It was true. It was also a performance. Both of those things were happening at the same time.",
        explorePrompt: "When did you last tell someone how you were actually doing — without optimizing it?",
        practiceInstruction: "Tell one trusted person something true about how you're doing that isn't impressive.",
      },
    ],
  },

  4: {
    typeName: "Individualist",
    typeAlias: "The Individualist",
    integrationType: 1,
    observations: [
      {
        text: "Something in me resists ordinary satisfaction. Even pleasant things carry a note of what they're not. I don't always know if I'm feeling more deeply or just at a different frequency than the room.",
        explorePrompt: "What would it mean for something to be simply good — not laced with longing, not compared to an ideal? Can you think of one example?",
        practiceInstruction: "Choose one ordinary task today and do it with full attention — not as a practice in enduring the mundane, but as if it were exactly what you're supposed to be doing.",
      },
      {
        text: "I pulled away from them before they could leave. The withdrawal felt like self-protection. I'm not always sure it isn't also a test — to see if they notice, if they follow.",
        explorePrompt: "When you withdraw, what are you hoping the other person will do? What would it mean if they did it?",
        practiceInstruction: "Make one clear, direct request of someone today without wrapping it in ambiguity or making them guess.",
      },
      {
        text: "The feeling came, and I stayed with it longer than I needed to. I've always trusted the depth of an emotion as evidence of its importance. I'm less certain of that now.",
        explorePrompt: "Is there a feeling you've been sustaining that might be ready to complete? What would it take to let it finish?",
        practiceInstruction: "Do one small thing today that is concrete and useful — that moves something forward in the external world, not the internal one.",
      },
      {
        text: "I compared myself again. Not to people in general — to specific people who seem to have what I'm missing. The comparison is always slightly asymmetrical in their favor.",
        explorePrompt: "What does the person you're comparing yourself to have that you most want? Is that something you can actually build, or is it a proxy for something else?",
        practiceInstruction: "Write down two things that are already present and real in your life — not what you're working toward. What's actually here.",
      },
    ],
  },

  5: {
    typeName: "Investigator",
    typeAlias: "The Investigator",
    integrationType: 8,
    observations: [
      {
        text: "I calculated the energy cost before the conversation started. A familiar habit: assess the drain, decide the minimum viable presence. The irony is that understanding everything often requires actually engaging with it.",
        explorePrompt: "What have you been observing from a distance that you actually need to step into? What's the real cost of staying outside it?",
        practiceInstruction: "Engage with one situation today without preparing. Enter it without your usual research buffer.",
      },
      {
        text: "I had the knowledge but withheld it. Not strategically — instinctively. Sharing it would have created a dependency, a follow-up, a relationship I hadn't accounted for.",
        explorePrompt: "What are you withholding from someone that they could genuinely use? What is the actual risk of giving it?",
        practiceInstruction: "Share something you know — freely, without tracking what they do with it.",
      },
      {
        text: "I retreated to think. The thinking was real; the retreat was also partly a delay. I've noticed that understanding something and being ready to act on it are different timelines in me.",
        explorePrompt: "What have you understood for long enough that further thinking is no longer preparation — it's avoidance?",
        practiceInstruction: "Take one action today that you have enough information to take. Don't wait for more certainty.",
      },
      {
        text: "My attention is unequally distributed. The subjects I've chosen to master take almost everything. Everything else gets the minimum. I call it specialization. Sometimes it's just scarcity thinking.",
        explorePrompt: "What are you neglecting by over-investing in understanding? What part of your life is getting the minimum viable attention?",
        practiceInstruction: "Spend time today with a person, not a subject. No agenda. No information exchange. Just presence.",
      },
    ],
  },

  6: {
    typeName: "Loyalist",
    typeAlias: "The Loyalist",
    integrationType: 9,
    observations: [
      {
        text: "I rehearsed both sides of the disagreement before the meeting. Not to be fair — to be safe. The preparation felt reasonable. It always does.",
        explorePrompt: "What were you specifically afraid would happen in that meeting if you hadn't prepared both sides? How likely was it actually?",
        practiceInstruction: "In one situation today, act on your first assessment without running the contrary scenario. Trust yourself for one decision.",
      },
      {
        text: "I questioned my own read on the situation even after three people confirmed it. The doubt isn't about them — it's about whether my perception itself can be trusted.",
        explorePrompt: "When did you first learn not to trust your own perceptions? What does that history have to do with today?",
        practiceInstruction: "Write down what you actually think about one situation before consulting anyone. Then keep it.",
      },
      {
        text: "The authority seemed reliable and then did something that didn't fit. I felt the dissonance more sharply than the situation warranted. Betrayal arrives faster than trust was built.",
        explorePrompt: "What makes someone reliable to you? Have you ever applied that standard to yourself as a source of guidance?",
        practiceInstruction: "Make one decision today based solely on your own judgment — without checking with anyone else first.",
      },
      {
        text: "The worst case ran on a loop. I knew it was unlikely; I ran it anyway. There's a kind of preparedness in it that feels like control. I'm not sure it is.",
        explorePrompt: "What would change if the worst case didn't come? What would you be responsible for if the threat wasn't there?",
        practiceInstruction: "Notice the next threat scenario your mind generates. Write it down, then write what you would actually do if it happened. The plan usually fits on one line.",
      },
    ],
  },

  7: {
    typeName: "Enthusiast",
    typeAlias: "The Enthusiast",
    integrationType: 5,
    observations: [
      {
        text: "I noticed the restlessness arrive at the moment of completion. The project isn't done and I'm already moving. I don't know if this is enthusiasm or avoidance.",
        explorePrompt: "What would it mean to fully finish something — to sit with it as done, not as a launching pad? What are you moving away from?",
        practiceInstruction: "Complete one thing today and then do nothing for ten minutes. Don't plan the next thing during those ten minutes.",
      },
      {
        text: "The reframe came quickly. Pain arrived and I converted it to possibility before I'd actually felt it. I'm fast at this. I'm not sure speed is the point.",
        explorePrompt: "What are you reframing right now that might need to be felt as it actually is, before it becomes something better?",
        practiceInstruction: "Let one difficult feeling exist today without converting it into a plan, a lesson, or a silver lining.",
      },
      {
        text: "I overpromised — not maliciously, but because everything felt achievable in the moment of imagining it. The future version of me seems to have more capacity than the present one.",
        explorePrompt: "What commitments are you currently carrying that the present version of you doesn't have the energy for? What would honoring yourself look like?",
        practiceInstruction: "Say no to one thing today — or renegotiate a commitment. Without offering three alternatives.",
      },
      {
        text: "The new thing arrived and I gave it more attention than the existing thing deserved to lose. The pattern is consistent enough that I've started to recognize it by the quality of my interest.",
        explorePrompt: "What existing thing in your life deserves more of your sustained attention? What keeps pulling you away from it?",
        practiceInstruction: "Spend a focused hour today on something you've already started but haven't finished. No new inputs.",
      },
    ],
  },

  8: {
    typeName: "Challenger",
    typeAlias: "The Challenger",
    integrationType: 2,
    observations: [
      {
        text: "I pushed harder than the situation asked for. There's a satisfaction in it that I can't entirely explain — something about knowing where the boundary is by finding it. Other people find this confusing.",
        explorePrompt: "What were you actually testing in that situation? What would it have meant if the resistance held?",
        practiceInstruction: "In one interaction today, let someone else set the pace and direction. Don't redirect it.",
      },
      {
        text: "Vulnerability arrived and I converted it into action. Something needed to be done, decided, confronted. Later I noticed the vulnerable feeling hadn't gone anywhere — I'd just moved past it.",
        explorePrompt: "What are you carrying that you've been converting into productivity? What does it actually feel like when you stop moving?",
        practiceInstruction: "Tell one person today something that is true and costs you something to say.",
      },
      {
        text: "I read the room for weakness — not predatorily, but to know where the actual power is. Who's protecting whom, who's performing confidence. It's useful information. I'm aware it also keeps me at a distance.",
        explorePrompt: "What would it mean to enter a room without assessing it first? What are you protecting yourself from by reading it?",
        practiceInstruction: "Be deliberately vulnerable with one person today. Not as strategy. As actual vulnerability.",
      },
      {
        text: "I overrode my own tiredness. The body was done and I continued anyway. I've done it so many times I'm not sure I trust the signal anymore.",
        explorePrompt: "What are you afraid will happen if you stop when you're tired? What would you have to feel if you rested?",
        practiceInstruction: "Stop today when you're tired. Don't finish the thing. Rest before you're forced to.",
      },
    ],
  },

  9: {
    typeName: "Peacemaker",
    typeAlias: "The Peacemaker",
    integrationType: 3,
    observations: [
      {
        text: "I agreed before I'd checked whether I actually agreed. The friction of a 'no' seemed larger than whatever I was giving up. Later I couldn't remember what that was.",
        explorePrompt: "What did you give up today by agreeing before you thought? What would you have said if the other person had been able to handle a 'no'?",
        practiceInstruction: "Before agreeing to the next thing asked of you, pause and check: do I actually want this? Then answer from that.",
      },
      {
        text: "I merged with the room. My preferences became negotiable, then optional, then invisible. I was present but I couldn't have told you what I was actually feeling for most of it.",
        explorePrompt: "When did you last have a strong preference and act on it directly? What does it feel like when you do?",
        practiceInstruction: "Name your preference in one situation today before asking anyone else what they think.",
      },
      {
        text: "The problem has been there for a while. I know this. I've arranged things so it doesn't require immediate action. The arrangement is comfortable and the problem remains.",
        explorePrompt: "What are you maintaining inertia around? What would it cost you to move?",
        practiceInstruction: "Take one concrete step today on something you've been postponing. Not a plan — an actual step.",
      },
      {
        text: "I disappeared into something comfortable — a routine, a screen, a task that didn't need to be done. Not laziness exactly. More like an anesthetic.",
        explorePrompt: "What were you numbing? What was there before you reached for the comfortable thing?",
        practiceInstruction: "Name one thing that matters to you — to you specifically, not to anyone else — and spend thirty minutes on it today.",
      },
    ],
  },
};

export function getDailyObservation(typeNumber: number): TypeObservation | null {
  const set = observations[typeNumber];
  if (!set) return null;
  const dayOfYear = (() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    return Math.floor((now.getTime() - start.getTime()) / 86400000);
  })();
  return set.observations[dayOfYear % set.observations.length];
}

export function getObservationSet(typeNumber: number): DailyObservationSet | null {
  return observations[typeNumber] ?? null;
}
