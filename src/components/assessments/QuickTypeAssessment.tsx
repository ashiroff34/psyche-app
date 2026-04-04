"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, BookOpen } from "lucide-react";

// ─── Theory ──────────────────────────────────────────────────────────────────
// Oscar Ichazo (triadic centers, passions, fixations)
// Claudio Naranjo (character structure, 9 core fixations)
// Don Riso & Russ Hudson (Levels of Development, core fears/desires)
// Helen Palmer (awareness-through-recognition method)
// David Daniels & Virginia Price (Essential Enneagram / Stanford)
// ─────────────────────────────────────────────────────────────────────────────

type Triad = "gut" | "heart" | "head" | null;

interface Option {
  text: string;
  detail?: string;
  learn: string;          // expandable theory content
  triad?: Triad;
  types?: number[];
  weight?: number;
}

interface Question {
  id: string;
  phase: "triage" | "gut" | "heart" | "head";
  text: string;
  sub?: string;
  options: Option[];
}

// ─── Questions ────────────────────────────────────────────────────────────────

const triageQuestions: Question[] = [
  {
    id: "t1",
    phase: "triage",
    text: "When life gets hard, what do you most want?",
    sub: "Go with your gut — not what you should want",
    options: [
      {
        text: "To feel safe and prepared",
        detail: "Knowing what's coming and having a plan",
        triad: "head",
        learn: "Oscar Ichazo, who first systematized the Enneagram of personality at his Arica School in Chile, identified Fear as the underlying emotion of the Head center. Types 5, 6, and 7 share a common anxiety about the future and a need to mentally orient themselves before they can act. Under pressure, their attention moves inward to the mind: gathering information, building contingency plans, or imagining alternative scenarios.\n\nClaudio Naranjo, who brought Ichazo's system to the West in the early 1970s, described head types as fundamentally living 'in the head' — using thought, analysis, and mental simulation as their primary way of coping with an uncertain world.\n\nRiso & Hudson ('The Wisdom of the Enneagram') call this the 'support' triad: these types seek frameworks — intellectual, institutional, or imaginative — to feel secure. They are often the most gifted planners and analysts, because their attention naturally orients toward understanding and anticipating.",
      },
      {
        text: "To feel loved and valued",
        detail: "To know people truly see and appreciate you",
        triad: "heart",
        learn: "Ichazo identified Shame as the underlying emotion of the Heart center, governing Types 2, 3, and 4. These types share a preoccupation with self-image and how they appear to others — not vanity, but a deep structural question: 'Am I worthy of love? Do I matter to the people around me?'\n\nNaranjo described heart types as especially attuned to 'the human field' — the emotional and social atmosphere of any room. They instinctively read how they and others are coming across, and much of their energy goes into managing this.\n\nRiso & Hudson note that the Heart center is concerned with identity: who you are in relation to others, and whether you are seen and valued for it. Helen Palmer observed that heart types often struggle to know themselves outside of relationship — their sense of self is fundamentally relational.",
      },
      {
        text: "To feel in control and respected",
        detail: "Not to be pushed around or ignored",
        triad: "gut",
        learn: "Ichazo placed Anger as the underlying emotion of the Gut/Body center, governing Types 8, 9, and 1. These types share a visceral need for autonomy, integrity, and a sense of solid ground. Their instinctive reaction to being overwhelmed or threatened is somatic — felt in the body before it is thought.\n\nClaudio Naranjo described gut types as having a more immediate, embodied engagement with reality: they respond first and reflect later. Their relationship to anger — whether they express it, suppress it, or redirect it — is one of the key distinguishing features between the three gut types.\n\nRiso & Hudson write that gut types are concerned with 'maintaining their autonomy and resisting outside influences.' They want to feel powerful and in control of their own lives, and their core anxiety is about having that autonomy threatened, removed, or simply never established.",
      },
    ],
  },
  {
    id: "t2",
    phase: "triage",
    text: "When you make a mistake, what hits first?",
    sub: "Before you can even think — what do you feel?",
    options: [
      {
        text: "Fear",
        detail: "Worry about what might go wrong because of it",
        triad: "head",
        learn: "In Ichazo's original Arica work, Fear was identified as the structural emotion of the Head center — not a temporary feeling, but an ongoing orientation to the world as uncertain and potentially threatening. Head types don't necessarily feel consciously afraid all the time, but their attention is structurally organized around anticipating what could go wrong.\n\nDavid Daniels and Virginia Price (Stanford's Essential Enneagram research) found that Head types respond to mistakes by immediately scanning consequences and contingencies: 'What does this mean for the future? What do I need to do now to protect myself?' The mistake triggers a mental chain reaction of 'what ifs.'\n\nNaranjo noted that the head center's relationship to fear is paradoxical: they think about danger to feel more in control of it, but the thinking itself can amplify the fear rather than resolve it.",
      },
      {
        text: "Shame",
        detail: "A sting of embarrassment about how you look",
        triad: "heart",
        learn: "Ichazo taught that Shame is the structural affect of the Heart center — a painful, automatic awareness of one's standing in the eyes of others. This isn't just embarrassment; it's a deep question about whether the self is acceptable and lovable.\n\nHelen Palmer described it this way: Heart types experience mistakes as inherently public events — the first hit is not 'what went wrong?' but 'what does this say about me, and do people still value me?' The error threatens the image, and the image is closely tied to the sense of self.\n\nRiso & Hudson note that all three Heart types share a fundamental uncertainty about their own identity and worth — the shame response is the ego's alarm system activating when that uncertainty is triggered by failure.",
      },
      {
        text: "Anger",
        detail: "Frustration at yourself or the situation",
        triad: "gut",
        learn: "Ichazo identified Anger as the core structural emotion of the Gut/Body center — not just the experience of being mad, but a somatic sense of being violated, thwarted, or out of alignment with how things should be. This anger is often pre-verbal: it hits the body before the mind processes it.\n\nClaudio Naranjo described how the three gut types relate to this anger very differently: Type 1 redirects it inward as self-criticism and resentment; Type 8 expresses it outward with intensity and directness; Type 9 suppresses it and goes numb to maintain harmony. But all three are working with the same underlying energy.\n\nThis is why gut types often have a powerful physical presence — they are living in, and through, the body in a way that head and heart types typically are not.",
      },
    ],
  },
  {
    id: "t3",
    phase: "triage",
    text: "People who know you well would say you're...",
    options: [
      {
        text: "Analytical and careful",
        detail: "You think things through, prepare, and question",
        triad: "head",
        learn: "Riso & Hudson describe the Head center as the seat of mental perception and strategy. Types here are gifted at analysis, forethought, and systematic thinking — they tend to research before acting, build mental models, and look for the flaw in the plan before it becomes a real problem.\n\nThis isn't neurosis, though it can tip into it. At its best, it is extraordinary clarity, foresight, and intellectual depth. Helen Palmer noted that head types are often the most interesting conversationalists — they have thought about things that others haven't gotten around to yet.\n\nNaranjo observed that the head center's gift is its capacity to step back from immediate sensation and see patterns — but its shadow is using thinking as a way to avoid feeling, acting, or trusting.",
      },
      {
        text: "Feeling and image-aware",
        detail: "You notice how things land emotionally and socially",
        triad: "heart",
        learn: "The Heart center governs emotional intelligence, empathy, and self-presentation. Heart types are often the most interpersonally attuned people in any room — they instinctively track the emotional temperature, notice subtle shifts in how people are relating, and are acutely aware of how they and others are coming across.\n\nNaranjo described heart types as oriented toward 'the human field' — their attention moves naturally into relationship, connection, and social dynamics. This is a real gift: heart types can read people, build rapport, and create warmth in ways that other types often can't.\n\nRiso & Hudson note that the shadow side is a preoccupation with image and identity — heart types can lose touch with an authentic self beneath the relational performance, and spend enormous energy managing how they appear rather than simply being.",
      },
      {
        text: "Action-oriented and direct",
        detail: "You just do — instinct first, reflect later",
        triad: "gut",
        learn: "Ichazo placed instinct and somatic knowing in the Gut center. Gut types experience the world through the body — they respond to situations physically and instinctively, often before they have words for what they're reacting to. Their relationship to anger, power, territory, and control is felt in the body first.\n\nNaranjo described gut types as having the most immediate, embodied engagement with reality of the three centers. They don't need a lot of information to act — they trust their gut read of a situation, move, and sort out the details later.\n\nRiso & Hudson describe this as the 'instinctive center' — the source of vitality, gut knowing, and the will to act. At its best, gut types are decisive, grounded, and powerful. At its worst, the instinctive reactions override reflection and create conflict.",
      },
    ],
  },
];

const gutQuestions: Question[] = [
  {
    id: "g1",
    phase: "gut",
    text: "Your anger usually shows up as...",
    sub: "Anger is the core passion of the Gut center — Ichazo",
    options: [
      {
        text: "A quiet inner critic",
        detail: "Resentment that things aren't how they should be",
        types: [1], weight: 2,
        learn: "Ichazo named Type 1's passion as Anger, but Naranjo made an important refinement: 1s don't experience their anger as anger — they experience it as resentment, irritability, and righteous frustration. The anger is always aimed at the gap between how things are and how they should be.\n\nRiso & Hudson describe this as the Superego turned outward onto the world: the same inner critic that judges the 1 also judges everyone and everything else. The constant measuring of reality against an ideal creates a low-grade friction that can feel like a permanent state.\n\nNaranjo noted that 1s often aren't aware of how angry they are — they experience themselves as simply caring about quality and correctness. The anger only surfaces in moments of frustration, then gets quickly controlled.",
      },
      {
        text: "Hot and direct",
        detail: "You confront — you don't hide when you're furious",
        types: [8], weight: 2,
        learn: "Ichazo named Type 8's passion as Lust — not primarily sexual, but an excess of vital energy, intensity, and appetite. Naranjo described 8s as having a 'counter-dependency': they push back instinctively against anything that feels controlling, manipulative, or weak. The anger is immediate, clean, and loud.\n\nUnlike Type 1, who controls and redirects anger, and Type 9, who buries it, Type 8 has a direct pipeline to their anger and uses it as information about the world. Riso & Hudson note that 8s see their anger as a form of honesty — 'at least I'm being real about what I feel.'\n\nNaranjo wrote that 8s have a 'lust for life' that expresses through the full range of experience — including conflict. They don't avoid confrontation; they lean into it.",
      },
      {
        text: "Mostly suppressed",
        detail: "You go numb, merge, avoid the conflict",
        types: [9], weight: 2,
        learn: "Ichazo named Type 9's passion as Sloth — not physical laziness, but a kind of spiritual inertia: a deadening to one's own priorities, needs, and feelings, including anger. Naranjo called this 'narcotization' — the 9 merges with others and the environment, and their own anger gets dissolved in the process.\n\nThis suppression is often completely unconscious. 9s don't feel themselves getting angry — they feel a vague discomfort, then a kind of blankness, then a desire to just let it go and keep things smooth. Only in retrospect, or under extreme pressure, does the anger surface.\n\nRiso & Hudson point out that the 9's suppressed anger can be the most dangerous of all the gut types precisely because it accumulates quietly and can emerge in unexpected ways — passive resistance, sudden withdrawal, or a rare but explosive outburst.",
      },
    ],
  },
  {
    id: "g2",
    phase: "gut",
    text: "What you want most is...",
    options: [
      {
        text: "To be good and do the right thing",
        detail: "To live with integrity and have things be correct",
        types: [1], weight: 2,
        learn: "Riso & Hudson identify Type 1's core desire as 'to be good, to have integrity, to be balanced.' This is not a mild preference — it is a deep structural need. 1s feel a moral imperative that most other types simply don't experience with the same intensity.\n\nIchazo's Holy Idea for Type 1 is Perfection — not as an impossible standard, but as an appreciation that reality is already complete and whole. The healthy 1 sees this. The average 1's ego, however, takes this intuition and turns it into a project: if I work hard enough and correct enough things, I can make reality match the ideal.\n\nNaranjo described this as the 'perfectionist' character structure — a person organized around the belief that there is a right way to do things, and that failing to do things the right way is a moral failure, not just an inconvenience.",
      },
      {
        text: "To be strong and self-reliant",
        detail: "To never be controlled, to protect what matters",
        types: [8], weight: 2,
        learn: "Type 8's core desire, per Riso & Hudson, is 'to protect themselves, to determine their own course in life, to be in control of their own destiny.' Weakness, dependency, and vulnerability are what Type 8 most fears — so the desire for strength is not arrogance but a survival response.\n\nNaranjo described 8s as having experienced a formative recognition that the world is tough and you have to be tougher. This creates a character structure built around power, self-reliance, and the refusal to be dominated. Whether or not the world is actually as harsh as the 8 perceives it, they act from this belief.\n\nRiso & Hudson point out that behind the 8's strength is a deep tenderness they rarely show — the very vulnerability they deny in themselves. Their protective energy often extends to those they care about, making them fierce allies.",
      },
      {
        text: "To have peace and harmony",
        detail: "To be okay, to merge, to avoid disruption",
        types: [9], weight: 2,
        learn: "Ichazo's Holy Idea for Type 9 is Love — not romantic love, but a sense of cosmic union with all of existence, a feeling that everything is connected and okay. The 9's ego translates this into merging with others and the environment, seeking an inner peace through the absence of conflict.\n\nRiso & Hudson describe 9s as the type most identified with the Enneagram's center position — they contain elements of all the other types, which is both their gift (enormous empathy) and their challenge (difficulty knowing themselves). Their central agenda is maintaining inner stability, even at the cost of their own desires.\n\nNaranjo wrote that 9s engage in a kind of 'self-forgetting' — they merge so thoroughly with others' agendas and preferences that they can genuinely lose track of what they themselves want. The peace they seek is real, but it comes at the cost of presence.",
      },
    ],
  },
  {
    id: "g3",
    phase: "gut",
    text: "Your deepest fear is...",
    options: [
      {
        text: "Being corrupt, wrong, or bad",
        detail: "Violating your own principles",
        types: [1], weight: 3,
        learn: "Riso & Hudson identify Type 1's core fear as 'being corrupt, evil, or defective.' This isn't a fear of being judged by others — it's an internal moral terror. The 1's most threatening scenario is doing something that violates their own principles, because it means they are the problem, not the world.\n\nIchazo's ego-fixation for Type 1 is Resentment — a chronic dissatisfaction with reality's failure to meet the ideal. This resentment and the core fear feed each other: the 1 fears being bad, so they work tirelessly to be good, but the world keeps falling short of the standard, which produces resentment, which must itself be controlled because it doesn't feel 'good.'\n\nNaranjo noted that 1s often feel a background guilt or unease even when they haven't done anything wrong — as if the standard is always there, watching.",
      },
      {
        text: "Being controlled or harmed by others",
        detail: "Being weak or betrayed",
        types: [8], weight: 3,
        learn: "Type 8's core fear, per Riso & Hudson, is 'being harmed or controlled by others, of being violated.' Vulnerability — emotional, physical, or situational — is what the 8 has organized their entire personality around avoiding. To be controlled is to be in danger; to be weak is to invite harm.\n\nNaranjo described 8s as having a kind of counter-phobic relationship to vulnerability: they go toward threatening things aggressively so those things can never catch them off guard. The 8 would rather be the one doing the confronting than the one being confronted.\n\nRiso & Hudson point out that this core fear often stems from a childhood experience — real or perceived — in which the 8 concluded that the only way to be safe was to be strong. The tenderness beneath the armor is real, but showing it feels like handing someone a weapon.",
      },
      {
        text: "Loss and separation",
        detail: "The world falling apart, nothing mattering",
        types: [9], weight: 3,
        learn: "Riso & Hudson identify Type 9's core fear as 'loss and separation, of annihilation' — a fear so deep it is often unconscious. The 9's merger strategy is designed to prevent this: as long as you're blending with others and keeping the peace, nothing can be truly lost.\n\nNaranjo described the 9's deepest avoidance not as external conflict but as their own inner existence — to fully feel their desires, their anger, their separateness would mean becoming a distinct self, and that self might face real loss and rejection. Staying merged feels safer.\n\nRiso & Hudson write that 9s are the type most at risk of losing themselves in accommodation. Their gift for going along and seeing all sides can become a way of never being anywhere — present to everything, but fully committed to nothing.",
      },
    ],
  },
];

const heartQuestions: Question[] = [
  {
    id: "h1",
    phase: "heart",
    text: "Your sense of self mostly comes from...",
    sub: "Shame is the core passion of the Heart center — Ichazo",
    options: [
      {
        text: "Being needed and appreciated",
        detail: "Knowing people value you for what you give",
        types: [2], weight: 2,
        learn: "Ichazo's passion for Type 2 is Pride — not arrogance or superiority, but a particular form of inflation: the 2 believes they know what others need and that they are uniquely positioned to provide it. Being needed is not just nice; it is the source of the 2's sense of worth.\n\nNaranjo described 2s as 'other-referencing' by structure — their attention moves toward others first, and their sense of self is built through the response they receive. When someone is grateful, the 2 feels real. When no one needs them, there is an uncomfortable void.\n\nRiso & Hudson call this the 'Giving stance' — but they note that the giving is rarely fully free. Beneath the generosity is an implicit transaction: 'If I give enough, I will be loved.' When the return doesn't come, the 2's warmth can curdle into resentment.",
      },
      {
        text: "What you achieve and how you're seen",
        detail: "Your image, status, and accomplishments",
        types: [3], weight: 2,
        learn: "Ichazo's passion for Type 3 is Deceit — not lying to others, but a self-deception so complete that the 3 often doesn't know it's happening. The persona — the successful, efficient, appealing self — becomes so fused with identity that the 3 genuinely can't locate a self beneath it.\n\nNaranjo described 3s as having a 'marketing orientation': your value is your presentation, and you adapt the presentation to whatever the current audience most rewards. This makes 3s extraordinarily effective in most environments — and often deeply confused about who they actually are.\n\nRiso & Hudson observe that 3s often only discover their interior life when something stops working — a failure, a loss, a relationship that demands more than performance. At that point, the real work of the 3 begins.",
      },
      {
        text: "Your unique identity and depth",
        detail: "Being authentic, different, emotionally real",
        types: [4], weight: 2,
        learn: "Ichazo's passion for Type 4 is Envy — not simple jealousy, but a structural longing: the sense that others have something essential that the 4 is missing. This missing 'something' is vague but felt deeply — an ordinariness, an incompleteness, a sense that one was somehow not given the full package.\n\nNaranjo described 4s as constructing their identity around uniqueness and authenticity as a defense against this feeling. If I am special, different, and emotionally real in ways others aren't, then the missing thing is not a defect — it's what makes me who I am.\n\nRiso & Hudson call this 'the identity type' — 4s are more explicitly concerned with the question 'who am I?' than any other type. The search for self is their central project, and it produces both their extraordinary creative and emotional depth and their tendency toward melancholy.",
      },
    ],
  },
  {
    id: "h2",
    phase: "heart",
    text: "What would devastate you most?",
    options: [
      {
        text: "Being seen as selfish or uncaring",
        detail: "People thinking you only help for yourself",
        types: [2], weight: 2,
        learn: "Type 2's core fear, per Riso & Hudson, is 'being unwanted, being unloved, being thought unworthy of love.' Being seen as selfish is particularly devastating because it inverts the 2's entire self-concept: they build their identity on caring, so to be perceived as caring only for themselves is an existential collapse.\n\nNaranjo identified a pattern he called 'giving to receive' — the 2's generosity has an implicit condition: love me back. This is usually unconscious. The 2 genuinely experiences themselves as selflessly helpful. The selfishness accusation, therefore, feels not just wrong but incomprehensible.\n\nRiso & Hudson note that the shadow side of the 2's care is a subtle possessiveness — they can become controlling through helpfulness, creating dependencies that serve the 2's need to be needed as much as the other person's actual need.",
      },
      {
        text: "Being exposed as a failure or fraud",
        detail: "Your accomplishments falling apart publicly",
        types: [3], weight: 2,
        learn: "Type 3's core fear is 'being a failure or being worthless without anything to show for it,' per Riso & Hudson. Because the 3's identity is so fused with their performance and achievements, failure doesn't just feel bad — it feels like annihilation. Without the accomplishments, what's left?\n\nNaranjo described this as the deepest wound of the 3: they work extraordinarily hard, succeed by almost any external measure, and still feel the anxiety that if the next thing doesn't work, it will all fall apart. The fear of exposure as a fraud is the fear that the self behind the image will be found wanting.\n\nRiso & Hudson observe that the path for the 3 is learning to distinguish between doing and being — discovering that there is a self worth loving that isn't contingent on achievement.",
      },
      {
        text: "Having no identity — being ordinary",
        detail: "Being unseen, generic, without depth",
        types: [4], weight: 2,
        learn: "Type 4's core fear, per Riso & Hudson, is 'having no identity or personal significance — of being without meaning.' The 4's elaborate construction of a unique, authentic self is a response to this fear: if I am special, I am not nothing.\n\nNaranjo described 4s as having an almost aristocratic relationship to ordinariness — they can't tolerate being confused with the crowd, can't accept being unspecial. But this is not simple vanity; it is a defense against the terror of meaninglessness.\n\nRiso & Hudson point out the painful paradox: in searching so hard for a unique identity, the 4 can become defined by the search itself, and the feeling of missing something essential becomes a permanent companion — fueling their creativity even as it sustains their suffering.",
      },
    ],
  },
  {
    id: "h3",
    phase: "heart",
    text: "In relationships, you most naturally...",
    options: [
      {
        text: "Focus on what the other person needs",
        detail: "Tuning in to them, often before yourself",
        types: [2], weight: 2,
        learn: "Naranjo described Type 2s as fundamentally 'other-referencing' — their attention moves naturally and automatically toward what others need, feel, and want. This isn't a practice or a discipline; it's how they are oriented by default. They enter a room and begin reading people before they're fully through the door.\n\nHelen Palmer noted that 2s build connection through this attunement — they make people feel genuinely seen and cared for, often more effectively than any other type. The relational intelligence of the 2 is real and deep.\n\nThe cost, as Riso & Hudson observe, is that 2s can become so focused on others that they lose contact with their own interior — what they need, what they feel, what they want. Self-awareness becomes a practice that doesn't come naturally, because the natural attention direction is always outward.",
      },
      {
        text: "Put your best self forward",
        detail: "Presenting your competence and appeal",
        types: [3], weight: 2,
        learn: "Riso & Hudson describe 3s as naturally adapting their self-presentation to what will be most admired in a given context. In relationships, this shows up as a tendency to lead with competence, energy, and appeal — the version of themselves that is most likely to succeed.\n\nNaranjo noted that 3s often don't experience this as performance — the persona has become so fused with identity that presenting it feels entirely authentic. Only in moments of intimacy or failure does the gap between the image and the interior become visible.\n\nRiso & Hudson write that the relational challenge for 3s is learning to be seen rather than merely admired — to allow the imperfect, vulnerable, uncertain self to show up without immediately managing how that lands.",
      },
      {
        text: "Look for deep, authentic connection",
        detail: "Or pull back when it feels too surface",
        types: [4], weight: 2,
        learn: "Helen Palmer wrote that 4s are powerfully oriented toward depth and authenticity in relationship — they become genuinely restless, even contemptuous, with what feels superficial, conventional, or emotionally shallow. The 4 wants to go somewhere real in a conversation, or would rather not have it.\n\nRiso & Hudson note a painful paradox: 4s long intensely for deep connection, but often withdraw when it gets close. The fear of being truly seen — and found defective — can make the longing itself safer than the fulfillment.\n\nNaranjo described this as an 'approach-avoidance' dynamic: the 4 idealizes connection, becomes disappointed when reality doesn't match the ideal, withdraws, then longs again. The search for the perfect, fully understanding relationship can prevent the 4 from inhabiting the imperfect but real ones they have.",
      },
    ],
  },
];

const headQuestions: Question[] = [
  {
    id: "hd1",
    phase: "head",
    text: "When you're anxious, your mind...",
    sub: "Fear is the core passion of the Head center — Ichazo",
    options: [
      {
        text: "Goes deep on one thing",
        detail: "Researching, analyzing, pulling away to think",
        types: [5], weight: 2,
        learn: "Ichazo's passion for Type 5 is Avarice — not greed for money or possessions, but a hoarding of the interior: energy, time, knowledge, privacy, and the self. When anxious, the 5 does not reach out; they pull inward, retreating to the one domain where they feel competent and safe: the mind.\n\nNaranjo described 5s as going deeper rather than wider when threatened — rather than seeking social support or distracting themselves, they intensify their focus on whatever they are already mastering. The anxiety is managed by becoming more of an expert.\n\nRiso & Hudson call this 'the investigative mode': the belief that if you understand something thoroughly enough, it cannot harm you. This makes 5s often extraordinarily learned and perceptive — and, at their worst, isolated behind a wall of knowledge that keeps them from needing to feel.",
      },
      {
        text: "Scans for what could go wrong",
        detail: "Questioning, anticipating threats, seeking reassurance",
        types: [6], weight: 2,
        learn: "Ichazo's passion for Type 6 is Fear — not a temporary feeling, but a structural orientation to the world as uncertain and potentially dangerous. The 6's attention is perpetually scanning: What is this person's real motive? What could go wrong here? Who can I actually trust?\n\nNaranjo described this as a 'paranoid' character structure — not in the clinical sense, but in the sense of a mind that is always tracking the gap between what is shown and what is real. 6s are often extraordinarily accurate readers of hidden agendas because they are always looking for them.\n\nRiso & Hudson note that this vigilance produces the 6's greatest gift: loyal, committed, thorough, and trustworthy. When a 6 is on your side, they have already thought through every way things could go wrong — and prepared for it.",
      },
      {
        text: "Jumps to future possibilities",
        detail: "Planning, reframing, imagining what's next",
        types: [7], weight: 2,
        learn: "Ichazo's passion for Type 7 is Gluttony — not for food, but for experience, stimulation, options, and the future. When anxious, 7s don't go inward (like 5s) or scan for threat (like 6s); they move forward, into imagination, planning, and anticipation. The future is always more interesting than the present problem.\n\nNaranjo described this as 'escapism upward' — 7s use the positive possibilities of the future to escape the weight of the present. Reframing is their instinctive survival tool: they can turn almost any painful situation into a story about how it will eventually lead somewhere good.\n\nRiso & Hudson call this 'anticipatory thinking' and note that it is both the 7's great strength — optimism, resilience, creativity, possibility-thinking — and their great limitation: the inability to stay with difficulty long enough for it to teach them something.",
      },
    ],
  },
  {
    id: "hd2",
    phase: "head",
    text: "What do you most protect?",
    options: [
      {
        text: "Your private inner world and energy",
        detail: "You need alone time to think and recharge",
        types: [5], weight: 2,
        learn: "Riso & Hudson identify Type 5's core desire as 'to be capable and competent — to be able to understand the world.' The way 5s protect this is by managing their exposure and energy output with care. They don't give themselves to most situations freely; they evaluate whether the investment is worth the depletion.\n\nNaranjo wrote about 5s building a wall around themselves — not a wall of hostility, but of privacy. They give out very little of themselves: opinions, emotions, time, and self are all carefully rationed. The interior world is where they feel most real and most safe.\n\nRiso & Hudson note that this creates both the 5's great strength — an extraordinarily rich inner life, unusual perspective, and depth of knowledge — and their great difficulty: the wall that protects also isolates, and the 5 can spend their life on the periphery of human experience, watching but not fully participating.",
      },
      {
        text: "Your security and trusted alliances",
        detail: "Knowing who you can count on, having backup plans",
        types: [6], weight: 2,
        learn: "Type 6's core desire, per Riso & Hudson, is 'to have security and support — to have certainty and reassurance.' The thing 6s most protect is the network of people and structures that make the world feel less threatening. Knowing who is reliable and who isn't is not paranoia for the 6; it is wisdom.\n\nNaranjo described 6s as building alliances carefully and testing loyalty over time — not because they are unfair, but because they have learned (or believe) that trust is not something to give away freely. Once earned, however, the 6's loyalty is fierce and often lifelong.\n\nHelen Palmer observed that 6s often have a strong sense of duty to the groups, institutions, or people that have given them security. This produces the 6's remarkable reliability and commitment — and can also create the 6's characteristic struggle with authority: they need it, test it, and sometimes resent it simultaneously.",
      },
      {
        text: "Your freedom and options",
        detail: "Not being trapped, keeping the future open",
        types: [7], weight: 2,
        learn: "Type 7's core desire, per Riso & Hudson, is 'to be satisfied and content — to find fulfillment and to be happy.' What 7s most protect is their sense of possibility: the feeling that the future is wide open and full of exciting options. Commitment to one path is experienced as the death of all the others.\n\nNaranjo described 7s as having a 'Peter Pan' quality — a resistance to limitation, to settling, to the weight of adult responsibility and constraint. This is not immaturity; it is a genuine terror of being trapped in limitation with no exit.\n\nRiso & Hudson note that the 7's relationship to freedom is complicated: they seek it desperately, but no amount of options actually satisfies the underlying anxiety. The freedom that 7s are ultimately seeking is an interior one — freedom from the pain and fear that drive the restless motion outward.",
      },
    ],
  },
  {
    id: "hd3",
    phase: "head",
    text: "Your deepest fear is...",
    options: [
      {
        text: "Being incompetent or without resources",
        detail: "Not knowing enough, being depleted",
        types: [5], weight: 3,
        learn: "Riso & Hudson identify Type 5's core fear as 'being helpless, useless, incapable — without the knowledge and resources they need.' The accumulation of knowledge and competence is not just interesting to the 5; it is a survival strategy. If you understand enough, you cannot be caught off guard and made helpless.\n\nIchazo's ego-fixation for Type 5 is Stinginess — a withholding of the self rooted in the sense that inner resources are finite and must be carefully guarded. The 5 fears being 'used up' — drained of energy, knowledge, or time — and left with nothing to function on.\n\nNaranjo noted that this fear creates the 5's characteristic detachment: they observe rather than participate, watch rather than engage, because participation costs something. The detachment protects the limited resource pool — but at the cost of lived experience.",
      },
      {
        text: "Being without support or guidance",
        detail: "Being alone in a dangerous world",
        types: [6], weight: 3,
        learn: "Type 6's core fear, per Riso & Hudson, is 'being without support and guidance — of being unable to survive on their own.' This is the fear beneath the vigilance, the alliance-building, the testing. The 6 is not paranoid for its own sake; they are trying to ensure they are not left alone with a dangerous world and no backup.\n\nNaranjo identified what he called the 6's 'ambivalence toward authority': they seek authority for reassurance (if a trusted person or institution says it's okay, it's okay), but they also question it (what if the authority is wrong, or corrupt, or fails?). This creates a push-pull relationship to leadership, institutions, and guidance figures.\n\nRiso & Hudson observe that the 6's underlying question is: 'Can I trust? Can I be supported?' The answer they need is not just intellectual — it must be felt, demonstrated, tested. This is why 6s build trust slowly and hold it fiercely once established.",
      },
      {
        text: "Being trapped in pain or missing out",
        detail: "Being limited, bored, or deprived of joy",
        types: [7], weight: 3,
        learn: "Riso & Hudson identify Type 7's core fear as 'being deprived and in pain — of being limited and bored.' This is the engine beneath the 7's relentless motion toward new experiences, options, and positive reframes: the present is always at risk of becoming a trap.\n\nNaranjo described 7s as having a counter-phobic relationship to limitation — they don't sit with it, they flee from it forward, into plans, possibilities, and the next exciting thing. This makes 7s extraordinarily generative and optimistic, and also keeps them from developing the depth that only comes from staying somewhere long enough to go through it.\n\nRiso & Hudson observe that the pain the 7 is running from is often not external — it is an interior emptiness or anxiety that no amount of stimulation actually fills. The 7's greatest work is learning that the satisfaction they seek in the future is available in the present, if they can be still long enough to find it.",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeResult(scores: Record<number, number>) {
  const entries = Object.entries(scores)
    .map(([k, v]) => ({ type: Number(k), score: v }))
    .sort((a, b) => b.score - a.score);
  const top = entries[0];
  const second = entries[1];
  const total = entries.reduce((s, e) => s + e.score, 0);
  return {
    type: top.type,
    confidence: total > 0 ? Math.round((top.score / total) * 100) : 0,
    runnerUp: second?.type ?? top.type,
  };
}

const typeNames: Record<number, string> = {
  1: "Perfectionist", 2: "Helper", 3: "Achiever",
  4: "Individualist", 5: "Investigator", 6: "Loyalist",
  7: "Enthusiast", 8: "Challenger", 9: "Peacemaker",
};
const typeColors: Record<number, string> = {
  1: "#e11d48", 2: "#f97316", 3: "#eab308",
  4: "#a855f7", 5: "#3b82f6", 6: "#14b8a6",
  7: "#22c55e", 8: "#ef4444", 9: "#94a3b8",
};
const typeTaglines: Record<number, string> = {
  1: "The voice that says things can be better — and won't rest until they are.",
  2: "The heart that gives freely, and aches to be truly seen in return.",
  3: "The achiever who shapes an image to match what the world rewards.",
  4: "The soul searching for what's real — even when it hurts.",
  5: "The observer who retreats to understand before they act.",
  6: "The loyal skeptic who prepares for the worst while hoping for the best.",
  7: "The optimist who keeps the future bright so the present stays bearable.",
  8: "The force that refuses to be controlled or pushed aside.",
  9: "The peacemaker who merges with the world to keep the peace within.",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function QuickTypeAssessment({
  onComplete,
}: {
  onComplete: (result: { type: number; confidence: number; runnerUp: number }) => void;
}) {
  const [triadScores, setTriadScores] = useState<Record<string, number>>({ gut: 0, heart: 0, head: 0 });
  const [typeScores, setTypeScores] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<"triage" | "gut" | "heart" | "head" | "result">("triage");
  const [qIdx, setQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [expandedLearn, setExpandedLearn] = useState<number | null>(null);
  const [result, setResult] = useState<{ type: number; confidence: number; runnerUp: number } | null>(null);

  const phaseQuestions = phase === "gut" ? gutQuestions : phase === "heart" ? heartQuestions : headQuestions;
  const currentQ = phase === "triage" ? triageQuestions[qIdx] : phaseQuestions[qIdx];

  const totalQ = triageQuestions.length + phaseQuestions.length;
  const answeredCount = phase === "triage" ? qIdx : triageQuestions.length + qIdx;
  const progress = (answeredCount / totalQ) * 100;

  function handleSelect(optIdx: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    setExpandedLearn(null);

    setTimeout(() => {
      const opt = currentQ.options[optIdx];

      if (phase === "triage") {
        const ns = { ...triadScores };
        if (opt.triad) ns[opt.triad] = (ns[opt.triad] || 0) + 1;

        if (qIdx < triageQuestions.length - 1) {
          setTriadScores(ns);
          setQIdx(qIdx + 1);
          setSelectedOption(null);
        } else {
          const dominant = Object.entries(ns).sort(([, a], [, b]) => b - a)[0][0] as Triad;
          setPhase(dominant!);
          setQIdx(0);
          setSelectedOption(null);
        }
      } else {
        const ns = { ...typeScores };
        (opt.types || []).forEach((t) => { ns[t] = (ns[t] || 0) + (opt.weight || 1); });

        if (qIdx < phaseQuestions.length - 1) {
          setTypeScores(ns);
          setQIdx(qIdx + 1);
          setSelectedOption(null);
        } else {
          setResult(computeResult(ns));
          setPhase("result");
        }
      }
    }, 380);
  }

  function toggleLearn(e: React.MouseEvent, idx: number) {
    e.stopPropagation();
    setExpandedLearn(expandedLearn === idx ? null : idx);
  }

  // ── Result screen ──────────────────────────────────────────────────────────
  if (phase === "result" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto py-10 px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
          className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl font-serif font-bold"
          style={{ backgroundColor: typeColors[result.type], boxShadow: `0 16px 48px ${typeColors[result.type]}50` }}
        >
          {result.type}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.92)" }}>
            Type {result.type}: {typeNames[result.type]}
          </h2>
          <p className="text-sm italic mb-6 max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            "{typeTaglines[result.type]}"
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: `${typeColors[result.type]}25`, color: typeColors[result.type] }}>
              {result.confidence}% match
            </div>
            {result.runnerUp !== result.type && (
              <div className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
                Also consider: Type {result.runnerUp}
              </div>
            )}
          </div>

          <button
            onClick={() => onComplete(result)}
            className="w-full py-4 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-xl"
            style={{ background: `linear-gradient(135deg, ${typeColors[result.type]}, ${typeColors[result.type]}aa)` }}
          >
            <Check className="w-4 h-4" />
            Save My Type &amp; See Profile
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // ── Question screen ────────────────────────────────────────────────────────
  const progressLabel = phase === "triage"
    ? `Finding your center · ${qIdx + 1} of ${triageQuestions.length}`
    : `Narrowing your type · ${qIdx + 1} of ${phaseQuestions.length}`;

  return (
    <div className="max-w-lg mx-auto py-6 px-4">
      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>{progressLabel}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${phase}-${qIdx}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.2 }}
        >
          {/* Question text */}
          <div className="mb-5">
            <h2 className="text-xl font-serif font-semibold leading-snug mb-1"
              style={{ color: "rgba(255,255,255,0.9)" }}>
              {currentQ.text}
            </h2>
            {currentQ.sub && (
              <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.35)" }}>{currentQ.sub}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isLearnOpen = expandedLearn === i;
              const isDimmed = selectedOption !== null && !isSelected;

              return (
                <motion.div
                  key={i}
                  animate={{ opacity: isDimmed ? 0.35 : 1 }}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    border: isSelected
                      ? "2px solid rgba(139,92,246,0.7)"
                      : "2px solid rgba(255,255,255,0.08)",
                    background: isSelected
                      ? "rgba(139,92,246,0.12)"
                      : "rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Tap-to-select row */}
                  <button
                    onClick={() => handleSelect(i)}
                    className="w-full text-left px-4 pt-4 pb-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isSelected ? "border-violet-400 bg-violet-500" : ""
                      }`}
                        style={!isSelected ? { borderColor: "rgba(255,255,255,0.25)" } : {}}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.88)" }}>
                          {opt.text}
                        </p>
                        {opt.detail && (
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                            {opt.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expand toggle */}
                  <button
                    onClick={(e) => toggleLearn(e, i)}
                    className="w-full flex items-center gap-1.5 px-4 pb-3"
                    style={{ color: "rgba(139,92,246,0.6)" }}
                  >
                    <BookOpen className="w-3 h-3 shrink-0" />
                    <span className="text-xs font-medium">{isLearnOpen ? "Collapse" : "Expand"}</span>
                    <motion.div
                      animate={{ rotate: isLearnOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-auto"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.div>
                  </button>

                  {/* Expandable theory */}
                  <AnimatePresence>
                    {isLearnOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                            {opt.learn}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
