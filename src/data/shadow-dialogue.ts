// Shadow Dialogue (Hermans 2001 Dialogical Self + IFS Schwartz 1995)
//
// Structured conversation between the user's dominant type voice and
// their integration type voice. The user chooses which to speak as.
// Tracking which voice they gravitate toward reveals identification patterns.

import { INTEGRATION_TYPE } from "./integration-messages";

export interface DialogueTurn {
  speaker: "type" | "integration";
  text: string;
}

export interface DialogueScript {
  topic: string;
  turns: DialogueTurn[];
  choiceAfter: number; // after this many turns, user picks which voice to continue as
}

export const SHADOW_DIALOGUES: Record<number, DialogueScript[]> = {
  1: [
    { topic: "When something is not done right",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "This is wrong. Someone needs to fix it." },
        { speaker: "integration", text: "What if it does not need to be fixed right now?" },
        { speaker: "type", text: "That is how standards slip. If I do not hold the line, no one will." },
        { speaker: "integration", text: "What if the line is not where you think it is? What if good enough is actually fine?" },
        { speaker: "type", text: "Good enough is how mediocrity wins." },
        { speaker: "integration", text: "Or it is how you finally exhale. When was the last time you let something be imperfect and nothing bad happened?" },
      ],
    },
  ],
  2: [
    { topic: "When someone does not need your help",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "They look like they are struggling. I should step in." },
        { speaker: "integration", text: "What if their struggle is theirs to hold?" },
        { speaker: "type", text: "But I can see what they need. It would be selfish to just watch." },
        { speaker: "integration", text: "Is it selfish? Or is it respectful? What do YOU need right now?" },
        { speaker: "type", text: "I... do not know. I usually do not ask that question." },
        { speaker: "integration", text: "That is the most important thing you have said. Start there." },
      ],
    },
  ],
  3: [
    { topic: "When there is no audience",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "I should use this time productively. I am falling behind." },
        { speaker: "integration", text: "Behind what? Who is keeping score?" },
        { speaker: "type", text: "Everyone. The world. Myself." },
        { speaker: "integration", text: "What if no one is watching right now? What would you do if it did not count?" },
        { speaker: "type", text: "I genuinely do not know." },
        { speaker: "integration", text: "That blankness is not emptiness. It is the space before something real. Stay in it." },
      ],
    },
  ],
  4: [
    { topic: "When life feels ordinary",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "Everyone else seems fine with this. I feel like I am suffocating in normality." },
        { speaker: "integration", text: "What if the ordinary is not the enemy of depth?" },
        { speaker: "type", text: "It feels like it. This flatness, this routine. Where is the meaning?" },
        { speaker: "integration", text: "What if the meaning is in the flatness? What if paying attention to this moment, right now, is the depth you are looking for?" },
        { speaker: "type", text: "That sounds like settling." },
        { speaker: "integration", text: "Or it sounds like arriving. You have been searching for something that was here the whole time." },
      ],
    },
  ],
  5: [
    { topic: "When someone wants more from you",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "I need space. This is too much contact. I am running out of energy." },
        { speaker: "integration", text: "What if engagement gives energy instead of taking it?" },
        { speaker: "type", text: "That has not been my experience." },
        { speaker: "integration", text: "When was the last time you actually tested that? Not thought about it. Tested it." },
        { speaker: "type", text: "I... would rather think about it a bit more first." },
        { speaker: "integration", text: "That is the pattern talking. What if you just said yes and found out?" },
      ],
    },
  ],
  6: [
    { topic: "When you cannot be certain",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "I need more information. I cannot decide without knowing what could go wrong." },
        { speaker: "integration", text: "What if you already know enough?" },
        { speaker: "type", text: "But what if I am wrong? The consequences..." },
        { speaker: "integration", text: "You have survived being wrong before. Every time. What would trust feel like right now?" },
        { speaker: "type", text: "Terrifying." },
        { speaker: "integration", text: "Yes. And also: free." },
      ],
    },
  ],
  7: [
    { topic: "When the excitement fades",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "This is getting boring. There must be something better I could be doing." },
        { speaker: "integration", text: "What if there is not? What if this is it?" },
        { speaker: "type", text: "That is a depressing thought." },
        { speaker: "integration", text: "Only if depth requires novelty. What if depth requires the opposite? What if the thing you are dismissing contains everything?" },
        { speaker: "type", text: "I want to move on to the next thing." },
        { speaker: "integration", text: "I know. That is the pattern. What happens if you stay for 5 more minutes?" },
      ],
    },
  ],
  8: [
    { topic: "When vulnerability surfaces",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "I cannot show this. If I do, they will use it against me." },
        { speaker: "integration", text: "What if they would not? What if the person in front of you is safe?" },
        { speaker: "type", text: "No one is entirely safe." },
        { speaker: "integration", text: "True. But the armor that protects you from danger also protects you from love. Which is costing you more right now?" },
        { speaker: "type", text: "...the armor." },
        { speaker: "integration", text: "Then put it down. Not forever. Just for this conversation." },
      ],
    },
  ],
  9: [
    { topic: "When you have an opinion you are not saying",
      choiceAfter: 4,
      turns: [
        { speaker: "type", text: "It is fine. I do not need to say anything. It will work out." },
        { speaker: "integration", text: "Will it? Or will you just absorb whatever happens and call it peace?" },
        { speaker: "type", text: "Is there a difference?" },
        { speaker: "integration", text: "Yes. Peace that requires you to disappear is not peace. What do you actually think?" },
        { speaker: "type", text: "I think... I disagree. But saying it feels like it will cause problems." },
        { speaker: "integration", text: "It might. But silence is causing a different kind of problem. Your voice belongs in the room." },
      ],
    },
  ],
};

export function getDialogue(type: number): DialogueScript | null {
  const scripts = SHADOW_DIALOGUES[type];
  if (!scripts?.length) return null;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return scripts[dayOfYear % scripts.length];
}

export { INTEGRATION_TYPE as DIALOGUE_INTEGRATION_TYPE };
