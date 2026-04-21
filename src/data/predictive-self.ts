// Predictive Self (Mischel CAPS 1995 + Gollwitzer 1999)
//
// Generates type-specific predictions for upcoming situations.
// Each type has characteristic if-then patterns under different
// situation categories. The prediction shows the habitual path
// AND the integration alternative, with the specific choice point.

import { INTEGRATION_TYPE } from "./integration-messages";

export type SituationCategory = "conflict" | "performance" | "intimacy" | "uncertainty" | "loss";

export interface Prediction {
  habitualPattern: string;
  integrationAlternative: string;
  choicePoint: string;
}

// Predictions keyed by type then situation category
const PREDICTIONS: Record<number, Record<SituationCategory, Prediction>> = {
  1: {
    conflict: {
      habitualPattern: "You will focus on who is right and who is wrong. The inner critic will assign blame (probably to yourself first, then to them). You will feel a surge of controlled anger that comes out as clipped sentences and moral reasoning.",
      integrationAlternative: "Your integration toward 7 says: what if this does not need to be resolved perfectly? What if you could be playful about it? What if being right matters less than being connected?",
      choicePoint: "The moment you feel the urge to correct or explain why they are wrong. That is the fork.",
    },
    performance: {
      habitualPattern: "You will over-prepare. The inner critic will rehearse every possible flaw before it happens. You will hold yourself to a standard that guarantees disappointment regardless of how it goes.",
      integrationAlternative: "What if good enough is the goal? What if preparation has a stopping point, and you have already passed it?",
      choicePoint: "The moment you think 'one more pass' at something that is already done. That is the fork.",
    },
    intimacy: {
      habitualPattern: "You will show your principled, responsible side. The parts of you that are messy, impulsive, or wrong will stay hidden. You will be present but contained.",
      integrationAlternative: "What if they want the messy version? What would spontaneity look like here?",
      choicePoint: "The moment you edit yourself before speaking. That is the fork.",
    },
    uncertainty: {
      habitualPattern: "You will try to impose order on the situation. Rules, plans, principles. The discomfort of not knowing will translate into rigidity.",
      integrationAlternative: "What if not knowing is not a problem? What if you could hold the ambiguity with curiosity instead of control?",
      choicePoint: "The moment you reach for a rule or principle to anchor yourself. That is the fork.",
    },
    loss: {
      habitualPattern: "You will process loss through the lens of fairness. This should not have happened. Someone is responsible. The grief will come out as judgment.",
      integrationAlternative: "What if the loss is just loss? Not fair or unfair. Just real. What would it feel like to grieve without needing someone to blame?",
      choicePoint: "The moment you start assigning responsibility for the loss. That is the fork.",
    },
  },
  2: {
    conflict: {
      habitualPattern: "You will focus on the relationship, not the issue. You will try to make the other person feel understood before stating your own position. You may never state your own position.",
      integrationAlternative: "Integration toward 4: what do YOU actually feel about this? Not what they feel. What is YOUR authentic response?",
      choicePoint: "The moment you start managing their emotions instead of expressing your own.",
    },
    performance: {
      habitualPattern: "You will think about the audience before the task. Who is watching? What do they need from me? Your performance will be shaped by who is in the room.",
      integrationAlternative: "What if no one is watching? What would you do differently if approval were not at stake?",
      choicePoint: "The moment you scan the room before starting.",
    },
    intimacy: {
      habitualPattern: "You will give. You will attune to what they need. You will make yourself indispensable. Your own needs will wait.",
      integrationAlternative: "What if you received first? What if you said what you actually need before asking what they need?",
      choicePoint: "The moment you ask 'what do you need?' before checking in with yourself.",
    },
    uncertainty: {
      habitualPattern: "You will find someone to help. Helping others in uncertain times gives you a role, a purpose, a way to feel needed. It also means you never have to face your own uncertainty.",
      integrationAlternative: "What if you sat with the uncertainty without finding someone to rescue? What would your own feelings tell you?",
      choicePoint: "The moment you reach for someone else's problem to solve.",
    },
    loss: {
      habitualPattern: "You will take care of everyone else who is grieving. Your own grief will wait until everyone else is okay. It may never come.",
      integrationAlternative: "What if you let someone take care of you? What if your grief is not less important than theirs?",
      choicePoint: "The moment you start comforting someone else before you have felt your own loss.",
    },
  },
  3: {
    conflict: { habitualPattern: "You will try to win. Or you will try to look like the reasonable one. Either way, the image comes first.", integrationAlternative: "Integration toward 6: what if you asked for help instead of performing competence? What if vulnerability is the move here?", choicePoint: "The moment you start managing how you look in the conflict." },
    performance: { habitualPattern: "You will execute brilliantly. The performance will be polished. Whether you feel anything real underneath it is a separate question.", integrationAlternative: "What if the performance mattered less than the presence? What if being real outperformed being impressive?", choicePoint: "The moment you choose polish over honesty." },
    intimacy: { habitualPattern: "You will shape-shift to match what they want. The real you waits backstage.", integrationAlternative: "What would happen if you showed up without the costume?", choicePoint: "The moment you adjust yourself for the other person's expectations." },
    uncertainty: { habitualPattern: "You will act. Action is how you manage not knowing. The doing will feel productive but the feeling underneath will stay unprocessed.", integrationAlternative: "What if you stopped and felt the uncertainty instead of powering through it?", choicePoint: "The moment you reach for a task to avoid a feeling." },
    loss: { habitualPattern: "You will move on quickly. Grieving feels like failing. The loss will get reframed as a lesson or an opportunity.", integrationAlternative: "What if the loss is just a loss? Not a lesson. Not fuel. Just something to feel.", choicePoint: "The moment you start spinning the loss into a narrative of growth." },
  },
  4: {
    conflict: { habitualPattern: "You will feel misunderstood before the conversation starts. You will interpret their tone as dismissive. You may withdraw into hurt instead of stating what you need.", integrationAlternative: "Integration toward 1: focus on the specific request, not the feeling. State the boundary clearly. Let their response be their response.", choicePoint: "The moment their tone shifts and you feel the pull to retreat." },
    performance: { habitualPattern: "You will wait for inspiration. If it does not come, you will either force something that feels inauthentic or not show up at all.", integrationAlternative: "What if you started without feeling ready? What if discipline produced its own kind of depth?", choicePoint: "The moment you wait for the feeling before acting." },
    intimacy: { habitualPattern: "You will test whether they really see you. The testing will feel like authenticity but it is actually a filter: only people who pass the depth test get in.", integrationAlternative: "What if you let them in without the test?", choicePoint: "The moment you withhold something to see if they ask." },
    uncertainty: { habitualPattern: "You will turn the uncertainty into a feeling. The feeling will become your identity. You will suffer beautifully but not act.", integrationAlternative: "What is the one practical step you could take right now, regardless of how you feel?", choicePoint: "The moment the feeling becomes more interesting than the situation." },
    loss: { habitualPattern: "You will feel it deeply. Perhaps more deeply than the situation warrants. The loss will confirm something you already believed about yourself.", integrationAlternative: "What if the loss does not mean what you think it means? What if it is just a thing that happened?", choicePoint: "The moment the loss becomes evidence for an old story about yourself." },
  },
  5: {
    conflict: { habitualPattern: "You will retreat to analyze. The retreat will feel like wisdom but it is also a way to avoid the messy emotional reality of the conflict.", integrationAlternative: "Integration toward 8: what if you engaged directly instead of analyzing from a distance? What would boldness look like here?", choicePoint: "The moment you pull back to think instead of staying in the conversation." },
    performance: { habitualPattern: "You will over-prepare and under-share. The work will be thorough but invisible.", integrationAlternative: "What if you shared it before it was perfect?", choicePoint: "The moment you decide to revise one more time instead of showing it." },
    intimacy: { habitualPattern: "You will be present but contained. The boundary between you and the other person will feel necessary but it will also prevent the depth you want.", integrationAlternative: "What if you let them past the boundary? Just once. Just a little.", choicePoint: "The moment you choose to withhold instead of reveal." },
    uncertainty: { habitualPattern: "You will research. The research will feel productive but it is actually a way to postpone acting.", integrationAlternative: "You already know enough. What is the smallest action you could take right now?", choicePoint: "The moment you open another browser tab instead of doing the thing." },
    loss: { habitualPattern: "You will withdraw to process alone. The processing may take a very long time.", integrationAlternative: "What if you let someone in on the grief? What if shared grief is less depleting than you think?", choicePoint: "The moment you close the door to grieve alone." },
  },
  6: {
    conflict: { habitualPattern: "You will scan for the worst case. Your mind will generate scenarios of how this could go badly. You may either freeze or attack preemptively.", integrationAlternative: "Integration toward 9: what if you trusted that it will be okay? What would calm look like here?", choicePoint: "The moment the scanning begins." },
    performance: { habitualPattern: "You will doubt yourself before, during, and after. The doubt will feel like responsibility but it is actually the pattern running.", integrationAlternative: "What if you trusted your preparation? You have done enough.", choicePoint: "The moment you think 'but what if I missed something?'" },
    intimacy: { habitualPattern: "You will test them. Not obviously. But you will watch for signs that they are trustworthy or not. The watching never fully stops.", integrationAlternative: "What if trust is a choice you make, not evidence you collect?", choicePoint: "The moment you look for proof instead of just being present." },
    uncertainty: { habitualPattern: "You will seek authority. An expert, a rule, a person who knows. The uncertainty itself feels dangerous.", integrationAlternative: "What if you are the authority here? What do you already know?", choicePoint: "The moment you reach for someone else's certainty." },
    loss: { habitualPattern: "You will catastrophize about what else might go wrong. The loss will trigger the vigilance system.", integrationAlternative: "What if this loss is just this loss? Not a pattern. Not a warning. Just a thing that happened.", choicePoint: "The moment the loss becomes a sign of more danger to come." },
  },
  7: {
    conflict: { habitualPattern: "You will reframe, deflect, or charm your way out. Sitting in the discomfort of real conflict is the thing you most want to avoid.", integrationAlternative: "Integration toward 5: what if you stayed with the discomfort and listened deeply instead of redirecting?", choicePoint: "The moment you feel the urge to lighten the mood." },
    performance: { habitualPattern: "You will be energetic and engaging. The surface will sparkle. Whether anything was said of real substance is a different question.", integrationAlternative: "What if you went deep instead of wide? What would focused, concentrated effort look like?", choicePoint: "The moment you reach for another example instead of developing the first one." },
    intimacy: { habitualPattern: "You will keep it exciting. The relationship will be full of plans, possibilities, and novelty. Sitting still with one person in ordinary time is the hardest thing.", integrationAlternative: "What if this ordinary moment contains everything you are looking for?", choicePoint: "The moment you suggest a plan instead of being present." },
    uncertainty: { habitualPattern: "You will generate options. Many options. The options will feel like freedom but they are also a way to avoid committing to any single path.", integrationAlternative: "What if you chose one path and went deep?", choicePoint: "The moment you start brainstorming instead of deciding." },
    loss: { habitualPattern: "You will move past it quickly. 'Everything happens for a reason.' The grief will get reframed into something positive before it has been felt.", integrationAlternative: "What if you felt the loss fully, without reframing it?", choicePoint: "The moment you reach for the silver lining." },
  },
  8: {
    conflict: { habitualPattern: "You will escalate. The intensity will feel like honesty but it is also armor. You will control the temperature of the conversation.", integrationAlternative: "Integration toward 2: what if you softened? What would tenderness look like here?", choicePoint: "The moment you feel the urge to raise your voice or assert dominance." },
    performance: { habitualPattern: "You will take charge. The performance will be powerful and direct. Whether anyone else had space to contribute is another question.", integrationAlternative: "What if you made space for someone else to lead?", choicePoint: "The moment you feel the urge to take over." },
    intimacy: { habitualPattern: "You will protect yourself. The armor goes on before the conversation starts. Vulnerability feels like an invitation to be hurt.", integrationAlternative: "What if you let them see the soft part? Just once.", choicePoint: "The moment you harden in response to closeness." },
    uncertainty: { habitualPattern: "You will impose control. If the situation is uncertain, you will make it certain through force of will.", integrationAlternative: "What if you sat with the not-knowing? What would surrender look like?", choicePoint: "The moment you start controlling the outcome." },
    loss: { habitualPattern: "You will harden. The grief will go underground. It will come out as anger later.", integrationAlternative: "What if the grief is not weakness? What if feeling it is the strongest thing you could do?", choicePoint: "The moment you clench instead of letting the tears come." },
  },
  9: {
    conflict: { habitualPattern: "You will merge with their position. Your own opinion will dissolve. You will 'go along' and call it peace.", integrationAlternative: "Integration toward 3: what if you stated your position clearly and directly? What would decisive engagement look like?", choicePoint: "The moment you feel the urge to agree before you have checked in with yourself." },
    performance: { habitualPattern: "You will show up but not fully. Part of you will be present. Part will be somewhere else, diffused, unfocused, not quite here.", integrationAlternative: "What if you brought 100% of your attention to this? What would full presence change?", choicePoint: "The moment you feel your attention start to wander." },
    intimacy: { habitualPattern: "You will merge with the other person's energy. Their preferences will become yours. What you actually want will be unclear, even to you.", integrationAlternative: "What do YOU want from this? Not what would keep the peace. What is your desire?", choicePoint: "The moment you start mirroring instead of expressing." },
    uncertainty: { habitualPattern: "You will numb. The uncertainty will feel like too much, so you will check out: TV, food, scrolling, sleep. Anything but sitting with the not-knowing.", integrationAlternative: "What if you stayed awake to the uncertainty? What would alert presence feel like?", choicePoint: "The moment you reach for the numbing agent." },
    loss: { habitualPattern: "You will minimize. 'It is not that bad.' The grief will be muted, diffused, turned into a low hum instead of a sharp cry.", integrationAlternative: "What if you let the loss be as big as it actually is?", choicePoint: "The moment you tell yourself it is not a big deal." },
  },
};

export function getPrediction(type: number, category: SituationCategory): Prediction | null {
  return PREDICTIONS[type]?.[category] ?? null;
}

export const SITUATION_CATEGORIES: Array<{ id: SituationCategory; label: string; description: string }> = [
  { id: "conflict", label: "A difficult conversation", description: "Disagreement, confrontation, boundaries" },
  { id: "performance", label: "Something I need to deliver", description: "Presentation, deadline, being evaluated" },
  { id: "intimacy", label: "Getting closer to someone", description: "Vulnerability, connection, opening up" },
  { id: "uncertainty", label: "Something I can't control", description: "Waiting, ambiguity, not knowing" },
  { id: "loss", label: "Something I'm losing", description: "Grief, endings, letting go" },
];
