"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BookOpen, Feather, GitCompare, ChevronDown, ChevronUp, Brain, Lock } from "lucide-react";
import { cognitiveFunctions, mbtiTypes } from "@/data/cognitive-functions";
import { useProfile } from "@/hooks/useProfile";
import { markTopicComplete } from "@/hooks/useGameState";
import GuidedJourney from "@/components/GuidedJourney";
import NextStepBanner from "@/components/NextStepBanner";

// ─── Beebe Thyself Data ────────────────────────────────────────────────────

const archetypeNames = ["Hero", "Good Parent", "Divine Child", "Anima/Animus", "Opposing", "Critical Parent", "Trickster", "Demon"];

const beebeData: Record<string, { function: string; archetype: string; description: string }[]> = {
  INTJ: [
    { function: "Ni", archetype: "Hero", description: "Your primary mode of operation. Ni as Hero means you lead with visionary foresight, reading patterns others miss. Your identity is built around your capacity to see the future before it arrives." },
    { function: "Te", archetype: "Good Parent", description: "Te as auxiliary supports and structures your Ni visions. You nurture others through efficiency, competence, and clear systems. A reliable source of strength you offer the world." },
    { function: "Fi", archetype: "Divine Child", description: "Fi as tertiary gives you a deep but often private value system. It can be naive or childlike, intensely felt but less reliable than your dominant functions. It awakens more fully in midlife." },
    { function: "Se", archetype: "Anima/Animus", description: "Se as inferior is your gateway to the unconscious. You may be drawn to rich sensory experiences but overwhelmed by them. In stress, Se can erupt as overindulgence or compulsive physical behavior." },
    { function: "Ne", archetype: "Opposing", description: "Ne as Nemesis makes external brainstorming and possibility-generation feel threatening. You may dismiss others' ideas defensively when your singular Ni vision is challenged." },
    { function: "Ti", archetype: "Critical Parent", description: "Ti as Critical Parent creates a harsh inner critic around logical frameworks. You may brutally critique internal consistency, in yourself and in others' arguments." },
    { function: "Fe", archetype: "Trickster", description: "Fe as Trickster can manipulate social situations in ways you're not fully aware of. You may use group dynamics instinctively but poorly, with unintended consequences for relationships." },
    { function: "Si", archetype: "Demon", description: "Si as Demon is your most unconscious function. When stressed beyond limits, you may become obsessively focused on past mistakes or physical sensations in a rigid, compulsive way." },
  ],
  INFJ: [
    { function: "Ni", archetype: "Hero", description: "Ni as Hero means your identity is built around deep intuitive insights and seeing patterns in human behavior. You operate from a powerful sense of how things will unfold for people." },
    { function: "Fe", archetype: "Good Parent", description: "Fe as auxiliary nurtures your Ni visions through empathy and social awareness. You care for others through emotional attunement and working to create genuine harmony." },
    { function: "Ti", archetype: "Divine Child", description: "Ti as tertiary gives you analytical depth that surprises others. It can be playfully precise or childishly obsessive with getting internal logic exactly right." },
    { function: "Se", archetype: "Anima/Animus", description: "Se as inferior draws you toward sensory experience but can overwhelm you. Under stress, you may either ignore your body completely or indulge in sensory pleasures as escape." },
    { function: "Ne", archetype: "Opposing", description: "Ne as Nemesis makes you feel defensive when others offer too many external possibilities that distract from your singular Ni vision of how things truly are." },
    { function: "Fi", archetype: "Critical Parent", description: "Fi as Critical Parent creates harsh self-judgment around personal values and authenticity. You may feel you are not living up to your deepest values or your own ideals." },
    { function: "Te", archetype: "Trickster", description: "Te as Trickster means you can accidentally misuse external logic systems, getting details wrong or applying frameworks incorrectly in ways that backfire on you." },
    { function: "Si", archetype: "Demon", description: "Si as Demon may emerge in deepest stress as obsessive attention to past details, physical symptoms, or repetitive routines that feel inescapable and consuming." },
  ],
  ENTJ: [
    { function: "Te", archetype: "Hero", description: "Te as Hero means you lead with decisive, external logic. You naturally see how systems should be organized and feel compelled to impose order and efficiency on the world." },
    { function: "Ni", archetype: "Good Parent", description: "Ni as auxiliary gives your Te goals visionary direction. You are not just efficient, you are efficient toward a meaningful future vision. This combination is powerfully strategic." },
    { function: "Se", archetype: "Divine Child", description: "Se as tertiary gives you energy for action and engagement with the physical world. It can be playfully bold but is less reliable than your top two functions." },
    { function: "Fi", archetype: "Anima/Animus", description: "Fi as inferior means personal values and inner emotional life are your gateway to the unconscious. Under extreme stress, you may become uncharacteristically emotional or rigidly principled." },
    { function: "Ti", archetype: "Opposing", description: "Ti as Nemesis makes purely internal logical consistency feel frustrating. You may dismiss those who over-analyze without producing concrete, measurable results." },
    { function: "Ne", archetype: "Critical Parent", description: "Ne as Critical Parent can make you harshly dismiss divergent thinking or open-ended brainstorming that lacks your strategic focus and direction." },
    { function: "Si", archetype: "Trickster", description: "Si as Trickster means you may inadvertently misapply past precedents or traditional methods in ways that subtly undermine your goals." },
    { function: "Fe", archetype: "Demon", description: "Fe as Demon can emerge in extreme stress as overwhelming emotionality, sudden extreme care about social approval, or ruthless manipulation of group dynamics." },
  ],
  ENFJ: [
    { function: "Fe", archetype: "Hero", description: "Fe as Hero means you lead with social and emotional intelligence. You naturally sense group dynamics, read others' needs, and create harmony and inspiration around you." },
    { function: "Ni", archetype: "Good Parent", description: "Ni as auxiliary gives your Fe leadership visionary depth. You do not just respond to others' immediate needs, you see where they need to grow long-term." },
    { function: "Se", archetype: "Divine Child", description: "Se as tertiary gives you a playful engagement with the physical world and presence in the moment that can be infectious and energizing for those around you." },
    { function: "Ti", archetype: "Anima/Animus", description: "Ti as inferior means internal logical analysis is your unconscious function. Under stress, you may suddenly become hyper-analytical or brutally critical of others' reasoning." },
    { function: "Fi", archetype: "Opposing", description: "Fi as Nemesis makes purely personal, subjective emotional needs feel threatening when they conflict with group harmony and collective wellbeing." },
    { function: "Ne", archetype: "Critical Parent", description: "Ne as Critical Parent may create a harsh inner voice about not exploring enough possibilities or missing creative connections that matter." },
    { function: "Si", archetype: "Trickster", description: "Si as Trickster means past patterns may mislead you, applying precedents from memory that do not quite fit the current situation in important ways." },
    { function: "Te", archetype: "Demon", description: "Te as Demon can manifest in extreme stress as cold, harsh efficiency that shocks those who know your warmth, or as complete inability to make practical decisions." },
  ],
  INTP: [
    { function: "Ti", archetype: "Hero", description: "Ti as Hero means you lead with an obsessive need for internal logical precision. Your identity is built around your capacity for rigorous, impartial, thorough analysis." },
    { function: "Ne", archetype: "Good Parent", description: "Ne as auxiliary generates the possibilities and connections your Ti analyzes. You nurture others through novel ideas and helping them see connections they had missed." },
    { function: "Si", archetype: "Divine Child", description: "Si as tertiary gives you detailed memory and appreciation for certain traditions or reliable systems. It can be nostalgic and precise in unexpected, endearing ways." },
    { function: "Fe", archetype: "Anima/Animus", description: "Fe as inferior means social harmony and emotional connection are your unconscious domain. Under stress, you may suddenly become hypersensitive to others' approval and belonging." },
    { function: "Te", archetype: "Opposing", description: "Te as Nemesis makes purely external efficiency feel threatening. You may resist systems that do not pass your rigorous internal logical standards first." },
    { function: "Ni", archetype: "Critical Parent", description: "Ni as Critical Parent creates harsh self-criticism when your visions seem unclear or when you fail to have a singular, confident long-term direction." },
    { function: "Se", archetype: "Trickster", description: "Se as Trickster means you may misjudge physical or sensory reality, acting on sensory information in ways that backfire unexpectedly in the real world." },
    { function: "Fi", archetype: "Demon", description: "Fi as Demon can emerge in deepest stress as an overwhelming personal values crisis or extreme emotional reactions that seem completely out of character to everyone." },
  ],
  ENTP: [
    { function: "Ne", archetype: "Hero", description: "Ne as Hero means you lead with relentless external possibility generation. You energetically explore ideas, alternatives, and connections, making you a natural innovator and provocateur." },
    { function: "Ti", archetype: "Good Parent", description: "Ti as auxiliary provides the logical framework to evaluate your Ne's infinite ideas. You nurture through helping others develop more rigorous and precise thinking." },
    { function: "Fe", archetype: "Divine Child", description: "Fe as tertiary gives you social charisma and emotional attunement that can appear suddenly. You can be surprisingly empathetic in a playful, childlike way." },
    { function: "Si", archetype: "Anima/Animus", description: "Si as inferior means past experience, routine, and bodily needs are your least conscious area. Under stress, you may become obsessively nostalgic or hyperfocused on one rigid routine." },
    { function: "Ni", archetype: "Opposing", description: "Ni as Nemesis makes singular, convergent thinking feel threatening. You may resist conclusions or visions that seem to close off the expansive possibilities you love." },
    { function: "Te", archetype: "Critical Parent", description: "Te as Critical Parent creates a harsh inner voice about productivity and efficiency, feeling you should be more organized, systematic, and results-oriented." },
    { function: "Fi", archetype: "Trickster", description: "Fi as Trickster means personal value conflicts can unexpectedly derail your plans, acting on values you were not fully aware of having until they surface." },
    { function: "Se", archetype: "Demon", description: "Se as Demon can emerge in extreme stress as sensory overwhelm, compulsive impulsive action, or complete inability to engage with immediate physical reality." },
  ],
  ISFJ: [
    { function: "Si", archetype: "Hero", description: "Si as Hero means you lead with careful attention to past experience, tradition, and reliable details. Your identity is built around being the keeper of what matters and what works." },
    { function: "Fe", archetype: "Good Parent", description: "Fe as auxiliary makes you a warm caregiver who uses social awareness to serve others' needs. You nurture through deep attention to how people are feeling moment to moment." },
    { function: "Ti", archetype: "Divine Child", description: "Ti as tertiary gives you a quiet analytical side that can appear in precise logical thinking or systematic organization that surprises those who know only your warmth." },
    { function: "Ne", archetype: "Anima/Animus", description: "Ne as inferior means novel possibilities and future speculation are your unconscious domain. Under stress, you may catastrophize about all the bad things that could happen." },
    { function: "Se", archetype: "Opposing", description: "Se as Nemesis makes immediate sensory action and spontaneous presence-in-the-moment feel challenging or threatening to your sense of security." },
    { function: "Fi", archetype: "Critical Parent", description: "Fi as Critical Parent creates harsh self-judgment about whether you are truly living according to your deepest personal values and authentic self." },
    { function: "Te", archetype: "Trickster", description: "Te as Trickster may lead you to misapply logical systems or efficiency frameworks in ways that feel off or produce results that surprise and disappoint you." },
    { function: "Ni", archetype: "Demon", description: "Ni as Demon can emerge in extreme stress as disturbing visions or premonitions, or a crushing sense of inevitability about negative outcomes you cannot escape." },
  ],
  ESFJ: [
    { function: "Fe", archetype: "Hero", description: "Fe as Hero means you lead with warm social intelligence and a deep need for harmony. Creating genuine connection and making people feel cared for is central to your identity." },
    { function: "Si", archetype: "Good Parent", description: "Si as auxiliary gives your Fe warmth a grounding in tradition, reliability, and familiar comfort. You care for others by preserving and honoring what has worked before." },
    { function: "Ne", archetype: "Divine Child", description: "Ne as tertiary gives you bursts of creative playfulness and novel thinking, though less reliably developed than your top two functions." },
    { function: "Ti", archetype: "Anima/Animus", description: "Ti as inferior means internal logical analysis is your unconscious domain. Under stress, you may become hyper-analytical or get stuck obsessively finding inconsistencies." },
    { function: "Fi", archetype: "Opposing", description: "Fi as Nemesis makes purely personal emotional authenticity feel threatening, especially when it conflicts with group harmony and social expectations you uphold." },
    { function: "Se", archetype: "Critical Parent", description: "Se as Critical Parent may create harsh self-judgment around physical action or sensory presence, feeling you are not quick or action-oriented enough." },
    { function: "Ni", archetype: "Trickster", description: "Ni as Trickster may produce sudden strong hunches about the future that misfire, leading you to make confident claims about what will happen that do not pan out." },
    { function: "Te", archetype: "Demon", description: "Te as Demon can emerge in extreme stress as cold, impersonal decision-making completely at odds with your warmth, or complete inability to make any logical decisions." },
  ],
  ISTJ: [
    { function: "Si", archetype: "Hero", description: "Si as Hero means you lead with reliable attention to past experience and concrete detail. Your identity is built around being thorough, responsible, and deeply consistent." },
    { function: "Te", archetype: "Good Parent", description: "Te as auxiliary makes you a systematic organizer who nurtures through building and maintaining reliable structures and getting important things done efficiently." },
    { function: "Fi", archetype: "Divine Child", description: "Fi as tertiary gives you a quiet, deep value system that operates in the background, sometimes emerging with surprising intensity in matters of personal moral importance." },
    { function: "Ne", archetype: "Anima/Animus", description: "Ne as inferior means novel possibilities are your unconscious domain. Under stress, you may spiral into catastrophizing all the ways things could go terribly wrong." },
    { function: "Se", archetype: "Opposing", description: "Se as Nemesis makes purely reactive, in-the-moment sensory engagement challenging. You prefer careful preparation over spontaneous action and reaction." },
    { function: "Ti", archetype: "Critical Parent", description: "Ti as Critical Parent creates a harsh inner voice around whether your logical frameworks are internally consistent and truly rigorous." },
    { function: "Fe", archetype: "Trickster", description: "Fe as Trickster may cause you to misread group emotional dynamics or make social gaffes despite your very best intentions to connect well." },
    { function: "Ni", archetype: "Demon", description: "Ni as Demon can emerge in extreme stress as disturbing premonitions or a crushing sense of inevitability about deeply negative future outcomes." },
  ],
  ESTJ: [
    { function: "Te", archetype: "Hero", description: "Te as Hero means you lead with decisive external logic and systems thinking. You are naturally oriented toward making things work efficiently and producing tangible results." },
    { function: "Si", archetype: "Good Parent", description: "Si as auxiliary grounds your Te in reliable tradition and past experience. You nurture through maintaining time-tested systems and proven approaches that work." },
    { function: "Ne", archetype: "Divine Child", description: "Ne as tertiary gives you occasional bursts of creative thinking and ability to see alternatives, though less reliably developed than your core functions." },
    { function: "Fi", archetype: "Anima/Animus", description: "Fi as inferior means personal values and authentic emotional life are your gateway to the unconscious. Under stress, you may erupt with uncharacteristic emotional intensity." },
    { function: "Ti", archetype: "Opposing", description: "Ti as Nemesis makes purely internal logical analysis feel inefficient and self-indulgent. You may dismiss thinking that does not produce tangible, measurable results." },
    { function: "Ni", archetype: "Critical Parent", description: "Ni as Critical Parent creates harsh self-judgment about not being strategic or forward-thinking enough in your planning and leadership." },
    { function: "Se", archetype: "Trickster", description: "Se as Trickster means you may misjudge immediate physical situations or act on sensory information in ways that backfire unexpectedly." },
    { function: "Fe", archetype: "Demon", description: "Fe as Demon can emerge in extreme stress as overwhelming social pressure sensitivity or sudden complete collapse of all concern for others' feelings." },
  ],
  INFP: [
    { function: "Fi", archetype: "Hero", description: "Fi as Hero means you lead with deep personal values and authentic feeling. Your identity is built around your capacity for profound inner truth and emotional depth." },
    { function: "Ne", archetype: "Good Parent", description: "Ne as auxiliary gives your Fi values creative expression and exploratory range. You nurture through helping others see new possibilities and discover deeper personal meanings." },
    { function: "Si", archetype: "Divine Child", description: "Si as tertiary gives you a nostalgic, detail-oriented side, finding meaning in particular memories, aesthetics, and sensory details that resonate personally with you." },
    { function: "Te", archetype: "Anima/Animus", description: "Te as inferior means external logic and systematic organization are your least conscious domain. Under stress, you may become uncharacteristically controlling or harshly logical." },
    { function: "Fe", archetype: "Opposing", description: "Fe as Nemesis makes social harmony and group expectations feel threatening to your authenticity when they conflict with your deeply held personal values." },
    { function: "Ni", archetype: "Critical Parent", description: "Ni as Critical Parent creates a harsh inner voice about whether you are living toward your deepest purpose or long-term vision with enough commitment." },
    { function: "Se", archetype: "Trickster", description: "Se as Trickster means physical reality and immediate sensory engagement can catch you off guard, acting impulsively in ways that surprise even yourself." },
    { function: "Ti", archetype: "Demon", description: "Ti as Demon can emerge in extreme stress as brutal internal logic that systematically tears apart your values or identity, a harsh critic unlike your usual gentle self." },
  ],
  ENFP: [
    { function: "Ne", archetype: "Hero", description: "Ne as Hero means you lead with enthusiastic exploration of possibilities, connections, and meanings. Your identity is built around your capacity for imaginative, expansive vision." },
    { function: "Fi", archetype: "Good Parent", description: "Fi as auxiliary gives your Ne a values-based compass. You nurture others through helping them connect with their authentic selves and their deepest personal values." },
    { function: "Te", archetype: "Divine Child", description: "Te as tertiary gives you a practical, results-oriented side that can emerge with surprising effectiveness, especially when you care deeply about an outcome." },
    { function: "Si", archetype: "Anima/Animus", description: "Si as inferior means bodily needs, routine, and detailed past tracking are your least conscious area. Under stress, you may ignore these entirely or become obsessively fixated on them." },
    { function: "Ni", archetype: "Opposing", description: "Ni as Nemesis makes convergent, singular-vision thinking feel threatening. You may resist when others try to narrow your expansive explorations to one conclusion." },
    { function: "Fe", archetype: "Critical Parent", description: "Fe as Critical Parent creates a harsh voice about social responsibility, feeling you should care more about group harmony or be more attuned to others' feelings." },
    { function: "Ti", archetype: "Trickster", description: "Ti as Trickster means you may apply internal logical frameworks in clever but ultimately flawed ways that you do not recognize as incorrect until too late." },
    { function: "Se", archetype: "Demon", description: "Se as Demon can emerge in extreme stress as hyper-reactive engagement with immediate physical reality or complete sensory overwhelm and shutdown." },
  ],
  ISTP: [
    { function: "Ti", archetype: "Hero", description: "Ti as Hero means you lead with precise internal logical analysis. You have an uncompromising need to understand exactly how things work on their own terms." },
    { function: "Se", archetype: "Good Parent", description: "Se as auxiliary grounds your Ti in direct sensory engagement. You learn by doing and experiencing, your thinking is always connected to physical, testable reality." },
    { function: "Ni", archetype: "Divine Child", description: "Ni as tertiary gives you occasional flashes of insight and strategic vision that can seem prescient, a deeper pattern recognition that surprises those around you." },
    { function: "Fe", archetype: "Anima/Animus", description: "Fe as inferior means social attunement and emotional expression are your unconscious domain. Under stress, you may shut down entirely or become unexpectedly, overwhelmingly expressive." },
    { function: "Te", archetype: "Opposing", description: "Te as Nemesis makes purely external systematic thinking feel reductive, you may bristle when forced to follow someone else's imposed logical framework." },
    { function: "Si", archetype: "Critical Parent", description: "Si as Critical Parent creates a harsh inner voice about traditional methods and established standards, feeling you should do things the proven, conventional way." },
    { function: "Ne", archetype: "Trickster", description: "Ne as Trickster means you may occasionally generate possibilities that seem logical but miss the bigger picture in ways you are not aware of." },
    { function: "Fi", archetype: "Demon", description: "Fi as Demon can emerge in extreme stress as an overwhelming personal values crisis or sudden explosive emotional reaction completely at odds with your cool exterior." },
  ],
  ESTP: [
    { function: "Se", archetype: "Hero", description: "Se as Hero means you lead with immediate sensory engagement and real-time response to the physical world. You are fully alive and sharp in the present moment." },
    { function: "Ti", archetype: "Good Parent", description: "Ti as auxiliary gives your Se action a precise logical framework. You understand exactly how things work and can troubleshoot systems in real time under pressure." },
    { function: "Fe", archetype: "Divine Child", description: "Fe as tertiary gives you social charm and a playful ability to read and engage groups, you can be unexpectedly empathetic and entertaining when you let it emerge." },
    { function: "Ni", archetype: "Anima/Animus", description: "Ni as inferior means long-term vision and meaning-making are your unconscious domain. Under stress, you may become suddenly consumed by dark premonitions or existential anxiety." },
    { function: "Si", archetype: "Opposing", description: "Si as Nemesis makes relying on past experience or tradition feel constraining. You may actively resist being bound by precedent or conventional methods." },
    { function: "Te", archetype: "Critical Parent", description: "Te as Critical Parent creates self-criticism about efficiency and systematic organization, feeling you should be more structured and goal-directed in your approach." },
    { function: "Fi", archetype: "Trickster", description: "Fi as Trickster means personal values may unexpectedly drive behavior in ways you were not aware of, surprising yourself with sudden ethical stances." },
    { function: "Ne", archetype: "Demon", description: "Ne as Demon can emerge in extreme stress as overwhelming possibilities-thinking or anxious catastrophizing about everything that could potentially go wrong." },
  ],
  ISFP: [
    { function: "Fi", archetype: "Hero", description: "Fi as Hero means you lead with deep personal values and authentic emotional truth. You have a profound inner compass that quietly guides all your decisions and actions." },
    { function: "Se", archetype: "Good Parent", description: "Se as auxiliary grounds your Fi in direct sensory experience, you express your values through action, art, craft, and physical engagement with the living world." },
    { function: "Ni", archetype: "Divine Child", description: "Ni as tertiary gives you occasional moments of powerful insight and long-term vision that can seem emotionally prescient and deeply meaningful to you." },
    { function: "Te", archetype: "Anima/Animus", description: "Te as inferior means systematic organization and external logic are your unconscious domain. Under stress, you may become uncharacteristically demanding or harshly critical." },
    { function: "Fe", archetype: "Opposing", description: "Fe as Nemesis makes social expectations and group harmony feel threatening when they require compromising your authentic values and personal integrity." },
    { function: "Si", archetype: "Critical Parent", description: "Si as Critical Parent creates a harsh voice about whether you are being sufficiently responsible, reliable, and consistent with established traditions." },
    { function: "Ne", archetype: "Trickster", description: "Ne as Trickster means you may occasionally generate ideas that feel deeply meaningful but miss important practical connections in the external world." },
    { function: "Ti", archetype: "Demon", description: "Ti as Demon can emerge in extreme stress as brutal self-critical logic that systematically deconstructs your values and sense of personal identity." },
  ],
  ESFP: [
    { function: "Se", archetype: "Hero", description: "Se as Hero means you lead with joyful, immediate engagement with life. You are fully present, energized by direct experience and connection with people and the vibrant world." },
    { function: "Fi", archetype: "Good Parent", description: "Fi as auxiliary gives your Se a warm values core. You do not just experience, you care deeply, nurturing others through genuine emotional presence and personal authenticity." },
    { function: "Te", archetype: "Divine Child", description: "Te as tertiary gives you practical problem-solving ability that can appear with surprising effectiveness when you care about getting real results." },
    { function: "Ni", archetype: "Anima/Animus", description: "Ni as inferior means long-term vision is your unconscious domain. Under stress, you may be suddenly flooded with dark premonitions or existential questions about meaning and purpose." },
    { function: "Si", archetype: "Opposing", description: "Si as Nemesis makes relying on past patterns or tradition feel constraining and deadening to your present-moment vitality and joy." },
    { function: "Fe", archetype: "Critical Parent", description: "Fe as Critical Parent creates self-judgment about whether you are being socially responsible enough and sufficiently attuned to what others actually need from you." },
    { function: "Ti", archetype: "Trickster", description: "Ti as Trickster means internal logical frameworks may occasionally lead you astray in ways you do not notice, applying reasoning that seems right but has hidden flaws." },
    { function: "Ne", archetype: "Demon", description: "Ne as Demon can emerge in extreme stress as overwhelming anxiety about future possibilities, producing a flood of catastrophic what-if thinking entirely at odds with your usual joy." },
  ],
};

// ─── Type-specific function position descriptions ────────────────────────────

const functionPositionDescriptions: Record<string, string[]> = {
  INTJ: [
    "As your dominant function, Ni is your primary lens on the world. You operate from a near-constant stream of future visions and pattern syntheses that arrive pre-verbally. You often know things without being able to explain why, and you are usually right.",
    "Te as your auxiliary structures and externalizes your Ni visions. You have a natural compulsion toward systems, plans, and measurable results. This is how your inner knowing becomes outer reality.",
    "Fi is quieter in you, a deep personal value system that runs beneath the surface. Others may not see it, but it guides your choices. It often becomes more prominent and important in your 30s and beyond.",
    "Se is your most unconscious function, the place where you are least comfortable. You may feel clumsy in purely sensory, spontaneous situations. In stress, Se erupts as overindulgence or compulsive physical behavior.",
  ],
  INFJ: [
    "Ni as your dominant function gives you an almost uncanny ability to perceive patterns in human behavior and foresee how situations will develop. Your insights about people often feel more like knowing than reasoning.",
    "Fe as auxiliary makes you acutely attuned to the emotional atmosphere around you. You often absorb others' feelings and feel responsible for the emotional wellbeing of those you care about.",
    "Ti in the tertiary position gives you an analytical backup system. When your Ni insights need justification, Ti provides the logical scaffolding, though it can be unreliable under pressure.",
    "Se as inferior makes the immediate physical world feel simultaneously alluring and overwhelming. You may neglect your body, then swing to sensory indulgence when stressed.",
  ],
  ENTJ: [
    "Te as your dominant function means you naturally lead by organizing, deciding, and executing. You think in terms of goals, efficiency, and outcomes. Ambiguity and inefficiency feel personally offensive to you.",
    "Ni as auxiliary provides the strategic vision that makes your Te purposeful. Without Ni, Te is just busywork. With it, you are one of the most powerfully strategic types, you see the endgame and know how to get there.",
    "Se as tertiary keeps you grounded in physical and tactical reality. It gives you an appreciation for action and presence that complements your long-range planning.",
    "Fi as inferior is your emotional blind spot, the place where you are most likely to be ambushed by your own feelings. Deep personal values and emotional vulnerability are your unconscious frontier.",
  ],
  ENFJ: [
    "Fe as your dominant function makes you exceptionally attuned to group dynamics, emotional undercurrents, and what others need. You naturally create harmony and inspire people, it is not performance, it is your native mode.",
    "Ni as auxiliary gives your empathy a visionary depth. You do not just feel what others feel, you see where they need to grow and what they are capable of becoming. This makes you a natural mentor.",
    "Se as tertiary gives you a physical presence and engagement with the world that makes your warmth tangible and immediate rather than abstract.",
    "Ti as inferior means your inner logical critic is often underdeveloped. Under stress, it erupts as cold, unexpected analytical harshness that shocks those who know your warmth.",
  ],
  INTP: [
    "Ti as your dominant function means you are in a constant state of internal analysis. You need to understand the precise logical structure of everything. Inconsistency, in ideas, in people, in systems, is deeply unsettling.",
    "Ne as auxiliary generates the raw material for your Ti to analyze. It scans for connections, anomalies, and novel possibilities, keeping your thinking dynamic and exploratory rather than rigid.",
    "Si as tertiary gives you an accumulated archive of past analyses and reliable knowledge. It provides depth and continuity to your intellectual life, though it can also produce a preference for known methods.",
    "Fe as inferior is the function that most humbles you. Social harmony, emotional expression, and the desire to be liked are your unconscious frontier, they surface unexpectedly, especially under stress.",
  ],
  ENTP: [
    "Ne as your dominant function means your mind is in constant generative motion, producing connections, alternatives, and possibilities at high speed. You are energized by ideas and novelty, and you find most people's thinking too narrow.",
    "Ti as auxiliary provides the analytical filter for your Ne's output. It is what distinguishes your best insights from interesting noise, Ti tests whether your ideas actually hold up under logical scrutiny.",
    "Fe as tertiary gives you social charm that can appear suddenly and powerfully. You are often more attuned to group dynamics than you realize, and you can be surprisingly empathetic when you engage this function.",
    "Si as inferior means routine, physical consistency, and detailed past-tracking are your least developed areas. Under stress, you may swing to obsessive nostalgic attachment or compulsive single-routine fixation.",
  ],
  ISFJ: [
    "Si as your dominant function means you live in rich continuity with your past experience. You notice details, remember how things felt, and use that accumulated knowledge to navigate the present with care and reliability.",
    "Fe as auxiliary makes you deeply attuned to others' needs and feelings. You are a natural caregiver who anticipates what people need before they ask, and you feel genuine discomfort when those around you are suffering.",
    "Ti as tertiary gives you a quiet precision in certain domains, you can be surprisingly logical and systematic in your areas of expertise, even though this is not your primary mode.",
    "Ne as inferior means open-ended possibility thinking and uncertainty feel threatening. Under stress, your mind generates worst-case scenarios and catastrophizes about what could go wrong.",
  ],
  ESFJ: [
    "Fe as your dominant function makes social harmony not just a preference but a genuine need. You are constantly aware of the emotional atmosphere, and you feel personally responsible for the wellbeing of your group.",
    "Si as auxiliary grounds your Fe in reliable tradition, proven methods, and accumulated experience. You care for others by preserving and honoring what has worked, you are the keeper of meaningful rituals and continuity.",
    "Ne as tertiary gives you occasional creative insights and openness to new possibilities, though this is less developed and less reliable than your warmth and tradition-keeping.",
    "Ti as inferior means logical analysis and internal consistency are your unconscious frontier. Under stress, your Ti erupts as surprisingly harsh, cutting criticism, of others or of yourself.",
  ],
  ISTJ: [
    "Si as your dominant function means you are a thoroughgoing empiricist of your own experience. What has worked before is your most reliable guide. You approach life with careful attention to what is proven, reliable, and concrete.",
    "Te as auxiliary gives your Si-gathered knowledge a systematic, organized expression. You are not just thorough, you are organized. You build and maintain the structures that keep things running reliably.",
    "Fi as tertiary operates quietly beneath your dutiful exterior, a deep personal value system that occasionally surfaces with surprising intensity, especially around moral matters that touch your integrity.",
    "Ne as inferior means novel, open-ended possibility thinking is your least comfortable territory. Under sustained stress, it erupts as catastrophizing, your mind generating all the terrible things that could happen.",
  ],
  ESTJ: [
    "Te as your dominant function means you naturally think in terms of systems, procedures, and measurable outcomes. You see inefficiency and feel compelled to fix it. You are one of the most naturally organized and decisive of all types.",
    "Si as auxiliary grounds your Te in reliable precedent and proven methods. You trust what has been tested by time and experience, and you use this accumulated wisdom to build structures that actually work.",
    "Ne as tertiary gives you occasional creative flexibility and openness to alternatives, though your default is to trust the proven path over the novel one.",
    "Fi as inferior means deep personal feeling and individual values are your unconscious frontier. Under extreme stress, your inferior Fi surfaces as overwhelming emotional intensity that surprises even you.",
  ],
  INFP: [
    "Fi as your dominant function means you live by an intensely personal inner compass. Your sense of what is right, beautiful, authentic, and meaningful is your primary guide, and compromising it feels like a betrayal of self.",
    "Ne as auxiliary gives your values creative and exploratory expression. Your Fi knows what matters; your Ne explores all the ways it might manifest, the possibilities it opens, and the connections it makes.",
    "Si as tertiary gives you a fondness for certain memories, aesthetics, and sensory details that feel personally resonant. Your past is a living source of meaning, not just history.",
    "Te as inferior means external organization, logic, and systems are your least conscious domain. Under stress, Te erupts as uncharacteristic harshness, rigidity, or an obsessive need to control and organize.",
  ],
  ENFP: [
    "Ne as your dominant function means you perceive the world through a lens of infinite possibility and connection. You find meaning everywhere, see potential in everyone, and are energized by exploring what could be.",
    "Fi as auxiliary gives your expansive Ne a personal values core. You are not just exploring possibilities, you are searching for what is authentic, meaningful, and true to who you are. Fi is your compass.",
    "Te as tertiary can emerge with surprising effectiveness when you are motivated. You can be remarkably practical and goal-oriented when you care deeply about an outcome, it surprises those who know your dreamy exterior.",
    "Si as inferior means physical routine, bodily needs, and detailed past-tracking are your unconscious frontier. Under stress, you may completely neglect your physical needs or suddenly become obsessively attached to one rigid routine.",
  ],
  ISTP: [
    "Ti as your dominant function means you have an uncompromising need to understand exactly how things work at their most fundamental level. You build precise internal models through direct engagement and testing.",
    "Se as auxiliary connects your Ti directly to physical reality. You are not an armchair analyst, you test your models through hands-on engagement, and your understanding is always grounded in concrete, observable reality.",
    "Ni as tertiary gives you occasional flashes of strategic insight, a sense of where things are heading that goes beyond your immediate analysis. These intuitions can be remarkably accurate.",
    "Fe as inferior means the social and emotional world is your least developed territory. You often find it unpredictable and confusing. Under extreme stress, Fe surfaces as either complete emotional shutdown or sudden overwhelming emotional expression.",
  ],
  ESTP: [
    "Se as your dominant function means you are fully, brilliantly present in the moment. You perceive the physical world with extraordinary acuity, every detail, every shift in energy, every opportunity registers instantly.",
    "Ti as auxiliary gives your sensory engagement a powerful analytical framework. You can rapidly process what you observe and calculate the optimal response, this combination makes you formidable in any real-time situation.",
    "Fe as tertiary gives you social savvy and charm that operates in the background. You can read and influence social dynamics with a naturalness that others find magnetic, even when you are not consciously trying.",
    "Ni as inferior means long-term vision and abstract future-thinking are your unconscious frontier. Under extreme stress, Ni erupts as dark, fatalistic premonitions and an uncharacteristic brooding quality.",
  ],
  ISFP: [
    "Fi as your dominant function gives you a profound, quiet inner compass. Your sense of what is authentic, beautiful, and personally meaningful runs deep and guides every significant choice you make.",
    "Se as auxiliary brings your inner world into direct contact with physical reality. You express your values through action, craft, art, and sensory engagement, you are always reaching through the body to touch what is true.",
    "Ni as tertiary gives you occasional moments of deep, meaningful insight that seem to come from beyond your immediate experience, a sense of larger patterns and deeper significance that can be startling.",
    "Te as inferior means external systems, organization, and assertive management are your least conscious territory. Under stress, Te surfaces as harsh criticism, rigid efficiency demands, or an uncharacteristic need to control.",
  ],
  ESFP: [
    "Se as your dominant function means you inhabit the present moment more fully than almost any other type. The world comes to you in vivid sensory richness, and you respond to it with an immediacy and joy that is genuinely infectious.",
    "Fi as auxiliary gives your sensory engagement authentic emotional depth. You are not just experiencing, you are experiencing with your whole self, filtered through a personal value system that makes each moment genuinely meaningful.",
    "Te as tertiary gives you practical problem-solving capacity that can emerge when stakes are high. You can be more organized and results-focused than your playful exterior suggests when you truly care about something.",
    "Ni as inferior means abstract future-thinking and long-term vision are your least developed territory. Under stress, Ni erupts as suddenly overwhelming dark premonitions or existential anxiety about where your life is heading.",
  ],
};

// ─── Loop Data ────────────────────────────────────────────────────────────────

const loopData: Record<string, {
  functions: string[];
  bypasses: string;
  behavior: string;
  warnings: string[];
  breakOut: string;
}> = {
  INTJ: {
    functions: ["Ni", "Fi"],
    bypasses: "Te",
    behavior: "You develop elaborate internal narratives about what will happen and how you feel about it, without testing any of it against external reality. You become increasingly certain of a negative vision while withdrawing from the structured action that would actually address it.",
    warnings: ["Increasingly paranoid or fatalistic thinking", "Withdrawing from plans and commitments", "Certainty about negative outcomes with no action taken", "Dismissing all external feedback"],
    breakOut: "Force yourself to take one concrete external action. Use Te deliberately, make a plan, organize something, measure something. Tell someone your concerns and actually listen to their response.",
  },
  INFJ: {
    functions: ["Ni", "Ti"],
    bypasses: "Fe",
    behavior: "You retreat into internal theorizing, constructing elaborate logical explanations for your intuitive visions without checking them against the social world. You may develop conspiratorial or cynical frameworks that feel airtight but are completely disconnected from other people.",
    warnings: ["Increasing isolation and withdrawal", "Developing complex theories no one else can access", "Cold detachment replacing your usual warmth", "Certainty about ideas that have never been tested with others"],
    breakOut: "Reach out to someone you trust. Share your thinking and genuinely listen. Use Fe deliberately, ask how someone is doing and focus entirely on them rather than your internal world.",
  },
  ENTJ: {
    functions: ["Te", "Se"],
    bypasses: "Ni",
    behavior: "You become obsessively busy, controlling, organizing, and optimizing at a tactical level without any guiding strategic vision. You micromanage, pursue short-term wins that undermine long-term goals, and become tyrannically focused on immediate measurable results with no sense of direction.",
    warnings: ["Constant busyness with no clear purpose", "Micromanaging others", "Dismissing long-term planning as impractical", "Exhausting yourself with activity that feels meaningless"],
    breakOut: "Stop doing and start thinking strategically. Ask yourself what this activity is actually serving. Reconnect with your Ni by sitting quietly and letting yourself vision where things are actually heading.",
  },
  ENFJ: {
    functions: ["Fe", "Se"],
    bypasses: "Ni",
    behavior: "You become a reactive social performer, reading and responding to immediate emotional cues while staying completely engaged with the physical and social scene, but with no deeper vision or sense of where you are guiding yourself or others. You exhaust yourself managing other people's present feelings.",
    warnings: ["Feeling drained by constant social responsiveness", "No sense of personal direction or purpose", "Over-involvement in others' immediate problems", "Losing your sense of vision and long-term guidance"],
    breakOut: "Deliberately spend time alone. Ask yourself what you actually envision for your own life and the lives of those you care about. Reconnect with Ni through journaling, meditation, or contemplative time.",
  },
  INTP: {
    functions: ["Ti", "Si"],
    bypasses: "Ne",
    behavior: "You obsessively re-analyze the same past data through an increasingly rigid logical framework. Instead of exploring new possibilities, you review, categorize, and re-categorize what you already know, seeking a logical closure that never arrives. Your thinking becomes narrow and circular.",
    warnings: ["Obsessively revisiting the same analysis", "No new ideas or approaches emerging", "Feeling intellectually stuck or stagnant", "Dismissing new information as irrelevant"],
    breakOut: "Deliberately seek something new, a book you have never read, a conversation with someone outside your usual circle, a problem domain you have never explored. Force Ne engagement by brainstorming without judgment.",
  },
  ENTP: {
    functions: ["Ne", "Ni"],
    bypasses: "Ti",
    behavior: "Your Ne generates possibilities at its usual rapid pace, but instead of running them through Ti's logical filter, you jump directly to Ni's convergent conclusions. You become convinced of big-picture patterns and future scenarios without doing the rigorous analytical work to evaluate them.",
    warnings: ["Making grand pronouncements without evidence", "Skipping analysis to reach conclusions", "Feeling certain about things you have not actually thought through", "Others pointing out logical gaps you cannot see"],
    breakOut: "Slow down and actually analyze one idea all the way through. Use Ti deliberately, look for the flaw in your favorite theory. Make yourself steelman a position you disagree with.",
  },
  ISFJ: {
    functions: ["Si", "Ti"],
    bypasses: "Fe",
    behavior: "You retreat into detailed analysis of past data through a rigid logical framework, losing your usual warmth and social attunement. You become focused on what happened and what the rules say, without any felt sense of how people are actually affected right now.",
    warnings: ["Becoming cold or detached from those you normally care for", "Obsessive focus on rules and past precedent", "Logical justification of actions that hurt people", "Withdrawing from emotional engagement"],
    breakOut: "Reconnect with someone you care about. Ask them how they are feeling and really listen. Let yourself be moved by their experience rather than analyzing it.",
  },
  ESFJ: {
    functions: ["Fe", "Ne"],
    bypasses: "Si",
    behavior: "You become anxiously attuned to every possible social threat, scanning for potential relational problems and reacting emotionally to each one without drawing on past experience to assess whether the threat is real. You generate emotional responses to imagined problems.",
    warnings: ["Social paranoia and anxiety spiraling", "Convinced relationships are failing without evidence", "Exhausting yourself reacting to imagined threats", "Unable to draw on past successful experiences for reassurance"],
    breakOut: "Ground yourself in what you actually know from experience. Si anchor: remember a time this situation resolved well. Ask yourself: has this actually happened before, or am I imagining it?",
  },
  ISTJ: {
    functions: ["Si", "Fi"],
    bypasses: "Te",
    behavior: "You become absorbed in detailed memories and past experiences filtered through intensely personal feelings, losing your usual systematic, organized approach. You feel strongly about things based on personal history but take no organized action to address them.",
    warnings: ["Dwelling on past grievances without taking action", "Strong personal feelings with no constructive outlet", "Abandoning your usual organizational systems", "Feeling victimized by past events"],
    breakOut: "Move into Te deliberately: make a list, create a plan, organize something concrete. Channel your feelings into structured action rather than rumination.",
  },
  ESTJ: {
    functions: ["Te", "Si"],
    bypasses: "Ni",
    behavior: "You become rigidly procedural, executing established systems through aggressive external management with no strategic vision for where any of it is heading. You enforce rules and procedures without any sense of their larger purpose.",
    warnings: ["Enforcing rules without understanding their purpose", "Busyness that feels hollow", "Rigidly applying past solutions to new problems", "Dismissing strategic thinking as impractical"],
    breakOut: "Ask yourself why. Why does this system exist? Where is this going? Force yourself to think strategically about the purpose behind your actions and reconnect with Ni.",
  },
  INFP: {
    functions: ["Fi", "Si"],
    bypasses: "Ne",
    behavior: "You become absorbed in intensely personal feelings about past experiences, retreating into nostalgic or grieving rumination that feels deeply meaningful but generates no new possibilities or ways forward. You feel everything very intensely but see no path.",
    warnings: ["Endless rumination on past pain", "Feeling deeply but seeing no way forward", "Nostalgia that traps rather than inspires", "Cutting yourself off from new experiences or ideas"],
    breakOut: "Force yourself to explore something genuinely new, a place, idea, or creative project. Engage Ne deliberately: brainstorm, wonder, explore possibilities without judging them.",
  },
  ENFP: {
    functions: ["Ne", "Si"],
    bypasses: "Fi",
    behavior: "You generate endless possibilities and compare them obsessively against what has worked before, without any grounding in your personal values and authentic sense of what actually matters to you. You become anxiously indecisive and unmoored.",
    warnings: ["Generating possibilities with no sense of which matters", "Obsessive comparison of options without resolution", "Feeling disconnected from what you actually want", "Nostalgic idealization of past phases of your life"],
    breakOut: "Stop exploring and ask yourself: what do I actually value? What would feel authentic regardless of what others think or what has worked before? Let Fi speak.",
  },
  ISTP: {
    functions: ["Ti", "Ni"],
    bypasses: "Se",
    behavior: "You construct internal theories about how things work and project them into convergent visions of the future without testing any of it against physical reality. You become increasingly certain about conclusions that have never been reality-tested.",
    warnings: ["Developing theories disconnected from physical evidence", "Increasing certainty without real-world testing", "Paranoid analysis of hidden patterns", "Withdrawing from hands-on engagement"],
    breakOut: "Do something physical and concrete. Engage Se deliberately, work with your hands, exercise, engage directly with the physical world. Let reality test your theories.",
  },
  ESTP: {
    functions: ["Se", "Fe"],
    bypasses: "Ti",
    behavior: "You pursue immediate sensory experiences to generate social approval and admiration, without any analytical evaluation of whether these pursuits are wise or sustainable. You become a sensation-seeking social performer who escalates risks to maintain attention.",
    warnings: ["Taking escalating risks for social approval", "No analytical filter on your actions", "Feeling empty despite constant activity and stimulation", "Others concerned about reckless behavior"],
    breakOut: "Stop and think before acting. Use Ti deliberately: analyze what you are actually doing and whether it makes sense. Ask yourself if you are acting from real desire or just for effect.",
  },
  ISFP: {
    functions: ["Fi", "Ni"],
    bypasses: "Se",
    behavior: "You become moodily certain about the significance and meaning of events filtered through deeply personal values, without grounding any of it in present-moment sensory reality. You develop intensely felt convictions about the future that you cannot test or articulate.",
    warnings: ["Brooding certainty about events without grounding", "Fatalistic emotional stance about the future", "Withdrawing from sensory and physical engagement", "Intense feelings you cannot explain or express"],
    breakOut: "Engage physically with the world around you right now. Create something with your hands, go somewhere beautiful, do something. Let Se reconnect you to the present moment.",
  },
  ESFP: {
    functions: ["Se", "Te"],
    bypasses: "Fi",
    behavior: "You fill every moment with activity and measure it by productivity, losing touch with your authentic personal values and the genuine feeling that normally animates your engagement with the world. You become busy but hollow, doing everything, feeling nothing.",
    warnings: ["Feeling hollow despite constant activity", "No sense of what personally matters anymore", "Measuring life by productivity metrics", "Disconnected from your authentic emotional life"],
    breakOut: "Stop doing and feel. Ask yourself: what do I actually care about? What feels genuinely meaningful, not just stimulating? Let Fi speak before acting.",
  },
};

// ─── Grip Data ────────────────────────────────────────────────────────────────

const gripData: Record<string, {
  inferiorFunction: string;
  triggers: string[];
  symptoms: string[];
  recovery: string;
}> = {
  INTJ: {
    inferiorFunction: "Se",
    triggers: ["Prolonged high-stress or burnout", "Loss of control over important outcomes", "Major plans failing or being invalidated", "Feeling unseen or underestimated for too long"],
    symptoms: ["Uncharacteristic overindulgence in food, drink, or shopping", "Hypersensitivity to physical environment, noise, mess, discomfort", "Impulsive, reckless actions completely unlike your usual caution", "Fixation on immediate sensory details at the expense of all planning"],
    recovery: "Remove yourself from the stressor if possible. Give yourself permission to rest without forcing planning or productivity. Accept that a period of reduced effectiveness is normal. Gentle physical activity such as walking or swimming can help ground the Se energy constructively.",
  },
  INFJ: {
    inferiorFunction: "Se",
    triggers: ["Emotional exhaustion from over-giving to others", "Feeling invisible or profoundly misunderstood", "Loss of meaningful connection or purpose", "Accumulated physical neglect"],
    symptoms: ["Impulsive sensory indulgence, overeating, drinking, reckless behavior", "Sudden hyperfocus on physical appearance or environment", "Making rash decisions based on immediate physical desire", "Sensory overwhelm in normally manageable situations"],
    recovery: "Honor your body's needs directly and without guilt. Reduce emotional demands from others temporarily. Gentle sensory experience, nature, music, physical movement, can help integrate rather than suppress the inferior function.",
  },
  ENTJ: {
    inferiorFunction: "Fi",
    triggers: ["Feeling profoundly unappreciated or personally betrayed", "Major failure in a project that defined your identity", "Deep loneliness despite surface success", "Moral conflict where no efficient solution exists"],
    symptoms: ["Overwhelming sense of personal worthlessness", "Feeling deeply unloved in a way that paralyzes action", "Hypersensitivity to criticism that would normally be processed and dismissed", "Explosive, self-righteous emotional confrontations"],
    recovery: "Create space away from performance and productivity demands. Allow yourself to feel without needing to solve. Trusted confidants who can witness your emotional experience without judgment are invaluable. This is temporary.",
  },
  ENFJ: {
    inferiorFunction: "Ti",
    triggers: ["Feeling deeply unappreciated despite constant giving", "Moral dilemma with no clear relational solution", "Intellectual humiliation or being publicly proven wrong", "Loss of the harmonious environment you work so hard to create"],
    symptoms: ["Sudden cold, analytical criticism of people you normally support", "Brutal logical dissection of others' reasoning or behavior", "Harsh self-critical analysis of your own caring as inadequate", "Cold detachment that alienates the people who depend on your warmth"],
    recovery: "Step back from social roles temporarily. Give yourself permission not to care for a while. Engage in solo analytical activity such as reading or writing that channels Ti constructively without targeting people.",
  },
  INTP: {
    inferiorFunction: "Fe",
    triggers: ["Sustained social rejection or isolation", "Feeling intellectually dismissed by those whose regard matters", "Total inability to connect meaningfully with anyone", "Prolonged failure with no logical explanation"],
    symptoms: ["Uncharacteristic emotional outbursts or tearfulness", "Desperate need for social approval and fear of rejection", "Interpreting neutral interactions as personal slights", "Heavy-handed emotional gestures to create harmony that backfire"],
    recovery: "Allow yourself to feel without analyzing the feelings to death. Reach out to someone safe, not to solve anything, just to connect. Accept that your need for belonging is human, not a logical failure.",
  },
  ENTP: {
    inferiorFunction: "Si",
    triggers: ["Prolonged chaos with no stability or ground", "Feeling permanently unmoored with no safe harbor", "Physical exhaustion or health crisis forcing bodily attention", "Everything new failing simultaneously"],
    symptoms: ["Obsessive nostalgic attachment to a past time that felt safe", "Compulsive fixation on one rigid routine as an anchor", "Hyperfocus on physical symptoms and health anxiety", "Inability to generate any new ideas, complete creative shutdown"],
    recovery: "Establish one simple, reliable daily routine. Honor your body's needs for rest, food, and basic physical comfort. Contact someone from your past who represents safety. Stability before creativity.",
  },
  ISFJ: {
    inferiorFunction: "Ne",
    triggers: ["Feeling completely out of control of your environment", "Multiple reliable routines disrupted simultaneously", "Loss of a key relationship you depended on", "Too many changes happening too fast with no preparation"],
    symptoms: ["Catastrophizing about every possible bad outcome", "Seeing danger and threat in neutral situations", "Inability to access past knowledge as reassurance", "Overwhelming anxiety about imagined future disasters"],
    recovery: "Return to one thing that is reliable and familiar. Contact someone safe. Ground yourself in what you actually know, not what you are imagining. Physical comforts from your established routines can anchor you.",
  },
  ESFJ: {
    inferiorFunction: "Ti",
    triggers: ["Public humiliation or social rejection", "Feeling that all your caring has been for nothing", "Relational betrayal by someone you deeply trusted", "Prolonged inability to create harmony despite effort"],
    symptoms: ["Caustic, cutting logical criticism of others completely unlike your warmth", "Harsh analytical self-judgment about your own worth and adequacy", "Cold detachment from those who need your care", "Building elaborate logical arguments for your own failure"],
    recovery: "Allow yourself to be on the receiving end of care from a trusted person. Step back from social responsibilities temporarily. Channel the analytical energy into structured writing, journaling your feelings can help integrate Ti without weaponizing it.",
  },
  ISTJ: {
    inferiorFunction: "Ne",
    triggers: ["Loss of established structures or routines", "Being forced to operate without clear rules or precedent", "Major unexpected change with no preparation time", "Feeling completely out of control of outcomes"],
    symptoms: ["Spiral of catastrophizing about every bad possibility", "Inability to access past reliable experience as comfort", "Seeing threats and dangers everywhere", "Overwhelming anxiety about the unknowable future"],
    recovery: "Re-establish one concrete, reliable routine immediately. Make a list, any list. Organize one thing. Reconnect with what you actually know from experience, and let that knowledge reassure you rather than focusing on what you do not know.",
  },
  ESTJ: {
    inferiorFunction: "Fi",
    triggers: ["Feeling profoundly disrespected despite doing everything right", "Major failure in a domain central to your identity", "Moral situation where no efficient solution preserves your integrity", "Deep loneliness beneath surface competence"],
    symptoms: ["Overwhelming emotional intensity that paralyzes your usual decisiveness", "Feeling fundamentally unworthy or unloved", "Hypersensitivity to personal criticism that would normally roll off", "Eruptions of value-based anger at perceived injustice"],
    recovery: "Allow yourself to feel without needing to immediately solve. Trusted relationships, not professional ones, are essential here. This is not weakness; it is the part of you that was never given space to develop. Be patient with yourself.",
  },
  INFP: {
    inferiorFunction: "Te",
    triggers: ["Prolonged inability to make your values real in the world", "Feeling utterly ineffective despite deep caring", "External chaos that feels beyond all control", "Being dismissed or ignored over a long period"],
    symptoms: ["Uncharacteristic controlling, organizing behavior", "Harsh, blunt criticism of others' competence and logic", "Obsessive list-making and system-building", "Rigid, efficiency-driven thinking completely unlike your usual warmth"],
    recovery: "Step back from the control-seeking behavior and return to what you actually value. Gentle creative expression, writing, art, can reconnect you to your Fi without triggering the Te grip response.",
  },
  ENFP: {
    inferiorFunction: "Si",
    triggers: ["Prolonged instability with no anchor", "Physical exhaustion from neglecting basic needs too long", "Feeling completely unmoored from any stable identity", "Everything that was exciting turning hollow simultaneously"],
    symptoms: ["Obsessive fixation on a past time that felt safe and meaningful", "Compulsive attachment to one rigid routine as a lifeline", "Physical health anxiety and hyperfocus on body symptoms", "Complete loss of enthusiasm and generative energy"],
    recovery: "Honor basic physical needs without guilt, sleep, food, rest. Establish one small reliable routine. Contact someone who represents continuity and safety in your life. The generative energy will return once you have a stable foundation.",
  },
  ISTP: {
    inferiorFunction: "Fe",
    triggers: ["Social rejection or isolation sustained over time", "Being profoundly misunderstood by people who matter", "Prolonged inability to make your competence visible", "Complete loss of control in an important relationship"],
    symptoms: ["Uncharacteristic emotional volatility or tearfulness", "Hypersensitivity to perceived social rejection", "Desperate seeking of emotional connection through clumsy gestures", "People-pleasing behavior entirely at odds with your usual independence"],
    recovery: "Give yourself space to feel without self-judgment. Reach out to one trusted person. Physical activity that reconnects you to your competent body can help ground the experience. This will pass.",
  },
  ESTP: {
    inferiorFunction: "Ni",
    triggers: ["Actions catching up with you in ways you did not foresee", "Feeling that your life lacks any deeper meaning", "A major failure you cannot solve through action", "Prolonged inability to find the next exciting challenge"],
    symptoms: ["Dark, fatalistic visions of inevitable catastrophe", "Uncharacteristic brooding and withdrawal from action", "Obsessive search for hidden meaning in ordinary events", "Conspiracy-minded thinking and tunnel vision"],
    recovery: "Reconnect with physical, concrete reality through Se. Take action on something, anything, rather than remaining in the brooding internal space. Trusted friends who know your natural energy can help pull you back to the present.",
  },
  ISFP: {
    inferiorFunction: "Te",
    triggers: ["Prolonged feeling of ineffectiveness in making your values real", "External chaos you cannot control", "Being dismissed or not seen over a long period", "Accumulated responsibilities that conflict with authenticity"],
    symptoms: ["Harsh, demanding criticism of others' incompetence", "Compulsive organizing and efficiency-seeking completely unlike you", "Rigid insistence on external metrics of success", "Blunt, critical behavior that shocks those who know your gentleness"],
    recovery: "Return to beauty and creative expression. Give yourself permission to create without any productivity goal. Reconnect with what genuinely moves you aesthetically and emotionally, let the values come before the efficiency.",
  },
  ESFP: {
    inferiorFunction: "Ni",
    triggers: ["Actions finally catching up with you in significant ways", "Feeling your joyful energy is hollow or masking something", "A relationship ending that made you feel truly alive", "Prolonged inability to find genuine joy in present experience"],
    symptoms: ["Dark, ominous sense that something terrible is coming", "Seeing symbolic warning signs in ordinary events", "Withdrawal from sensory engagement that normally sustains you", "Paranoid interpretation of others' behavior"],
    recovery: "Ground yourself in immediate, pleasant sensory experience without pressure. Trusted friends who can accompany you in presence rather than analysis are most helpful. The brooding will lift when you return to physical reality and genuine connection.",
  },
};

// ─── Growth / Inferior Function Development ──────────────────────────────────

const inferiorDevelopmentStages: Record<string, {
  function: string;
  stage1: { name: string; description: string };
  stage2: { name: string; description: string };
  stage3: { name: string; description: string };
  practices: string[];
}> = {
  Se: {
    function: "Se, Extraverted Sensing",
    stage1: { name: "Avoidance", description: "The sensory world feels overwhelming, distracting, or beneath your depth. You may dismiss physical pleasure, neglect your body, or treat sensory experience as something that interferes with your real thinking." },
    stage2: { name: "Fascination and Excess", description: "Se begins breaking through in uncontrolled bursts, overindulgence, impulsive physical decisions, sudden intense interest in aesthetics or physical experience. The function is awakening but not yet integrated." },
    stage3: { name: "Integration", description: "You develop a genuine, sustained relationship with sensory experience. You can be fully present in your body, appreciate beauty, engage physically, and let the immediate moment be real, without losing your long-range orientation." },
    practices: ["Schedule one purely sensory experience weekly, cooking, nature walks, art, with no agenda", "Practice five-minute body scan meditations to develop present-moment physical awareness", "Learn one physical skill such as an instrument, craft, or sport that requires sustained sensory attention", "Eat at least one meal per day slowly and with full sensory attention, without screens", "Spend time in nature regularly, deliberately noticing what you see, hear, smell, and feel"],
  },
  Fi: {
    function: "Fi, Introverted Feeling",
    stage1: { name: "Avoidance", description: "Personal values and inner emotional life feel soft, irrelevant, or dangerously subjective. You may dismiss your own feelings as noise that interferes with clear thinking or effective action." },
    stage2: { name: "Eruption", description: "Fi breaks through in dramatic, uncontrolled emotional episodes, sudden overwhelming sensitivity to criticism, unexpected value-based fury, or episodes of feeling profoundly unloved or worthless." },
    stage3: { name: "Integration", description: "You develop a genuine and stable relationship with your inner emotional life. You know what you value, why you value it, and you can act from those values rather than from pure external logic or efficiency." },
    practices: ["Journal about what you personally value, not what you should value, but what genuinely moves and matters to you", "Practice noticing your emotional reactions before analyzing them away", "Allow yourself one relationship where you share vulnerability rather than competence", "Ask yourself regularly what you actually feel about this, and wait for an honest answer", "Read or watch art that moves you emotionally, and let yourself be moved without critique"],
  },
  Te: {
    function: "Te, Extraverted Thinking",
    stage1: { name: "Avoidance", description: "External systems, organization, and measurable results feel cold, inauthentic, or threatening to your inner world. You may dismiss practical logistics as beneath your depth or incompatible with genuine living." },
    stage2: { name: "Eruption", description: "Te breaks through in controlling, demanding, or harshly critical episodes, suddenly insisting on efficiency and logic in situations where you would normally be gentle or fluid." },
    stage3: { name: "Integration", description: "You develop the ability to organize, plan, and execute in the external world without abandoning your authentic inner life. You learn that structure can serve values rather than destroy them." },
    practices: ["Practice completing one concrete external project from start to finish", "Create and maintain one simple organizational system such as a planner or filing system", "Set one clear, measurable goal per month and track it honestly", "Practice stating your needs or opinions directly rather than hinting or withdrawing", "Find one domain where external efficiency genuinely serves what you value most"],
  },
  Fe: {
    function: "Fe, Extraverted Feeling",
    stage1: { name: "Avoidance", description: "Social harmony, emotional expression, and others' feelings feel like external pressure that threatens your autonomous thinking. You may dismiss emotional needs as irrational interference." },
    stage2: { name: "Eruption", description: "Fe breaks through in clumsy, desperate, or overwhelmingly needy emotional episodes, sudden hunger for belonging, sensitivity to rejection, or heavy-handed attempts to create harmony." },
    stage3: { name: "Integration", description: "You develop a genuine capacity for social attunement and emotional connection that enriches rather than threatens your independent thinking. You can care for others and yourself simultaneously." },
    practices: ["Practice asking someone how they are and actually listening to the full answer", "Attend a social event with the intention of contributing to others' comfort rather than your own stimulation", "Share a genuine positive feeling with someone close to you, appreciation, gratitude, warmth", "Practice facial and vocal expressiveness in low-stakes situations", "Join a group activity that requires sustained cooperation and mutual consideration"],
  },
  Ne: {
    function: "Ne, Extraverted Intuition",
    stage1: { name: "Avoidance", description: "Open-ended possibilities and abstract speculation feel threatening to your reliable, experience-grounded approach. Uncertainty and novelty may feel irresponsible or unsafe." },
    stage2: { name: "Eruption", description: "Ne breaks through as catastrophizing, your mind suddenly generates all the terrible things that could go wrong, treating each possibility as equally real and equally threatening." },
    stage3: { name: "Integration", description: "You develop the ability to explore possibilities with genuine curiosity rather than anxiety. You can hold open questions without needing immediate closure, and you can see what is new without it threatening what is established." },
    practices: ["Practice brainstorming without immediately evaluating, generate ten ideas before judging any", "Read one book per month in a completely unfamiliar domain", "Ask what-if questions deliberately in low-stakes situations", "Practice tolerating open questions: note when you rush to close and gently resist", "Spend time with creative, exploratory people who are comfortable with uncertainty"],
  },
  Si: {
    function: "Si, Introverted Sensing",
    stage1: { name: "Avoidance", description: "Routine, tradition, and detailed past experience feel constraining or deadening to your forward-moving energy. You may neglect your body's established needs and dismiss the wisdom in what has already worked." },
    stage2: { name: "Eruption", description: "Si breaks through as obsessive nostalgia for a past that felt safe, compulsive attachment to one rigid routine as an anchor, or hyperfocus on physical symptoms and health anxiety." },
    stage3: { name: "Integration", description: "You develop genuine appreciation for continuity, embodied learning from experience, and the stability that reliable routines provide. You can honor the past without being trapped by it." },
    practices: ["Establish one morning or evening routine and maintain it for 30 days", "Keep a simple record of what works in your daily life, sleep, food, practices, and consult it", "Reconnect with one meaningful tradition from your past and engage it intentionally", "Practice noticing and responding to your body's recurring signals before they become crises", "Interview an elder about what they have learned, practice the value of accumulated experience"],
  },
  Ni: {
    function: "Ni, Introverted Intuition",
    stage1: { name: "Avoidance", description: "Long-term vision and abstract pattern-recognition feel impractical or irrelevant compared to the concrete, immediate reality you navigate so effectively. Singular commitments may feel like closing off possibilities." },
    stage2: { name: "Eruption", description: "Ni breaks through as dark premonitions, a crushing sense of inevitable negative outcomes, or sudden obsessive fixation on one symbolic interpretation of events." },
    stage3: { name: "Integration", description: "You develop the capacity to perceive patterns over time and sustain a meaningful long-term vision without losing your present-moment acuity. You can commit to where you are going without losing the richness of where you are." },
    practices: ["Write a five-year vision for your life once per quarter, not a plan, a vision", "Practice sitting with one question for a week without resolving it, let insights arrive", "Study one subject deeply for a sustained period rather than sampling broadly", "Meditate on what this situation is really about beneath the surface", "Seek one trusted mentor who thinks strategically and learn from how they hold long arcs"],
  },
  Ti: {
    function: "Ti, Introverted Thinking",
    stage1: { name: "Avoidance", description: "Internal logical analysis feels cold, disconnected, or threatening to your warmth and relational harmony. You may dismiss precise thinking as pedantic or unkind." },
    stage2: { name: "Eruption", description: "Ti breaks through as sudden cold, cutting analytical criticism that shocks those who know your warmth, a harsh inner or outer critic that finds and exposes logical inconsistencies with painful precision." },
    stage3: { name: "Integration", description: "You develop genuine analytical precision that enriches your warmth rather than threatening it. You can think clearly about people and situations without losing your care for them." },
    practices: ["Spend time weekly with a challenging intellectual problem that has nothing to do with people", "Practice identifying the logical structure of your favorite beliefs, where are the assumptions?", "Read one rigorous analytical text per month, philosophy, logic, or systems thinking", "Practice the discipline of finishing one idea completely before moving to the next", "Learn to distinguish between what you feel is true and what you can demonstrate is true"],
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

function ResultsContent() {
  const searchParams = useSearchParams();
  const scoresParam = searchParams.get("scores");
  // allScores is now the full 8-function stack ordered by score (from buildFunctionStack)
  let allScores: { func: string; score: number; percentage: number }[] = [];
  try { if (scoresParam) allScores = JSON.parse(scoresParam); } catch { allScores = []; }

  // Normalize: support both old {key} format and new {func} format
  const normalizedScores = allScores.map(s => ({ key: (s as any).key ?? (s as any).func, score: s.score, percentage: s.percentage }));

  const topFunctions = normalizedScores.slice(0, 4).map(s => s.key);
  const bestType = mbtiTypes.find(t => t.stack[0] === topFunctions[0]) || mbtiTypes[0];
  const dominantFunc = cognitiveFunctions.find(f => f.code === bestType.stack[0]);

  // Confidence and consistency from new scoring (MBTI Form M IRT methodology)
  const confidence = parseInt(searchParams.get("confidence") ?? "70");
  const consistencyScore = parseInt(searchParams.get("consistencyScore") ?? "100");
  let inconsistentAxes: string[] = [];
  try { inconsistentAxes = JSON.parse(searchParams.get("inconsistentAxes") ?? "[]"); } catch {}

  const [activeTab, setActiveTab] = useState<"functions" | "shadow" | "loops" | "growth">("functions");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const { updateProfile, addXP } = useProfile();

  useEffect(() => {
    if (bestType && allScores.length > 0) {
      updateProfile({
        cognitiveType: bestType.code,
        mbtiType: bestType.code,
        dominantFunction: bestType.stack[0],
        savedAt: new Date().toISOString(),
      });
      addXP(100, "Type Explorer");
      // Mark learning path progress
      markTopicComplete("cognitive-intro");
      markTopicComplete("function-stack");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestType.code]);

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const positionLabels = ["Dominant", "Auxiliary", "Tertiary", "Inferior"];
  const typeBeebe = beebeData[bestType.code] || beebeData["INTJ"];
  const typeFuncDescriptions = functionPositionDescriptions[bestType.code] || functionPositionDescriptions["INTJ"];
  const typeLoop = loopData[bestType.code] || loopData["INTJ"];
  const typeGrip = gripData[bestType.code] || gripData["INTJ"];
  const inferiorFunc = bestType.stack[3];
  const inferiorDev = inferiorDevelopmentStages[inferiorFunc as keyof typeof inferiorDevelopmentStages];

  const axes = [
    { pair: ["Ni", "Se"], label: "Introverted Intuition \u2194 Extraverted Sensing" },
    { pair: ["Ne", "Si"], label: "Extraverted Intuition \u2194 Introverted Sensing" },
    { pair: ["Ti", "Fe"], label: "Introverted Thinking \u2194 Extraverted Feeling" },
    { pair: ["Te", "Fi"], label: "Extraverted Thinking \u2194 Introverted Feeling" },
  ];

  const tabs = [
    { id: "functions", label: "Functions" },
    { id: "shadow", label: "Shadow" },
    { id: "loops", label: "Loops & Grips" },
    { id: "growth", label: "Growth" },
  ] as const;

  return (
    <div className="min-h-screen py-12" style={{ background: "#0f0a1e" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Your Cognitive Profile</p>
          <div className="font-mono text-7xl font-bold mb-3 tracking-tight" style={{ color: bestType.color }}>
            {bestType.code}
          </div>
          <h1 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.95)" }}>{bestType.name}</h1>
          <p className="text-sm mb-5 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>{bestType.brief}</p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
            style={{ backgroundColor: `${dominantFunc?.color}18`, color: dominantFunc?.color, border: `1px solid ${dominantFunc?.color}30` }}>
            <span className="font-mono font-bold">{bestType.stack[0]}</span>
            <span>&middot;</span>
            <span>Dominant function: {dominantFunc?.alias}</span>
          </div>

          {/* Confidence + Consistency badges. MBTI Form M IRT methodology */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${
              confidence >= 65
                ? "border-emerald-500/30 text-emerald-400"
                : confidence >= 40
                ? "border-amber-500/30 text-amber-400"
                : "border-rose-500/30 text-rose-400"
            }`} style={{ background: "rgba(255,255,255,0.05)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
              {confidence >= 65 ? "Clear preference" : confidence >= 40 ? "Moderate preference" : "Unclear preference"} · {confidence}%
            </div>
            {consistencyScore < 100 && (
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${
                consistencyScore >= 75
                  ? "border-sky-500/30 text-sky-400"
                  : "border-amber-500/30 text-amber-400"
              }`} style={{ background: "rgba(255,255,255,0.05)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                Consistency: {consistencyScore}%
                {inconsistentAxes.length > 0 && ` · ${inconsistentAxes.join(", ")} inconsistent`}
              </div>
            )}
          </div>

          {/* Low confidence guidance */}
          {confidence < 45 && (
            <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl border border-amber-500/30 text-left" style={{ background: "rgba(245,158,11,0.1)" }}>
              <p className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">Low preference clarity</p>
              <p className="text-sm text-amber-300 leading-relaxed">
                Your results show a weaker preference on one or more axes. This is common, some people are genuinely
                close to the middle of an axis. Consider the full 8-function stack below rather than focusing only on
                the type label. Taking the full assessment may produce a clearer result.
              </p>
            </div>
          )}

          {/* Consistency warning */}
          {consistencyScore < 75 && (
            <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl border border-rose-500/30 text-left" style={{ background: "rgba(239,68,68,0.1)" }}>
              <p className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">Response inconsistency detected</p>
              <p className="text-sm text-rose-300 leading-relaxed">
                Some of your answers to similar questions were inconsistent. This can happen when questions are ambiguous
                or when your preference is genuinely in the middle. Treat your results as directional rather than definitive.
              </p>
            </div>
          )}

          {/* Full 8-function stack. per Nardi methodology: show all functions, not just type label */}
          {normalizedScores.length > 0 && (
            <div className="max-w-lg mx-auto space-y-2.5">
              <p className="text-xs font-mono uppercase tracking-wider mb-4 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                Full 8-Function Stack
              </p>
              {normalizedScores.map((score, i) => {
                const func = cognitiveFunctions.find(f => f.code === score.key);
                const isConsciousStack = bestType.stack.slice(0, 4).includes(score.key);
                return (
                  <div key={score.key} className="flex items-center gap-3">
                    <div className="w-8 font-mono text-xs font-bold text-right" style={{ color: func?.color ?? "#94a3b8" }}>{score.key}</div>
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${score.percentage}%` }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: isConsciousStack ? (func?.color || "#94a3b8") : `${func?.color || "#94a3b8"}60` }} />
                    </div>
                    <div className="w-8 text-right text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{score.percentage}%</div>
                    {isConsciousStack && (
                      <div className="w-16 text-left text-[10px] font-mono hidden sm:block" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {["dom", "aux", "tert", "inf"][bestType.stack.slice(0, 4).indexOf(score.key)]}
                      </div>
                    )}
                  </div>
                );
              })}
              <p className="text-xs text-center mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                Solid bars = conscious stack (Dom/Aux/Tert/Inf) · Faded = shadow functions
              </p>
            </div>
          )}
        </motion.div>

        {/* ── Tab Navigation ── */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex gap-1 rounded-2xl p-1.5 mb-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id ? "text-white shadow-sm" : "hover:text-white/80"
              }`}
              style={activeTab === tab.id ? { backgroundColor: bestType.color } : { color: "rgba(255,255,255,0.5)" }}>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">

          {/* ── TAB 1: FUNCTIONS ── */}
          {activeTab === "functions" && (
            <motion.div key="functions" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <h2 className="font-serif font-bold text-lg mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>Your Conscious Stack</h2>
              <div className="space-y-4 mb-10">
                {bestType.stack.map((fCode, i) => {
                  const func = cognitiveFunctions.find(f => f.code === fCode);
                  const cardId = `func-${fCode}`;
                  const isExpanded = expandedCards[cardId];
                  return (
                    <motion.div key={fCode} initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                      className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-xl text-white shadow-sm"
                            style={{ backgroundColor: func?.color || bestType.color }}>
                            {fCode}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-medium px-2 py-0.5 rounded-md"
                                style={{ backgroundColor: `${func?.color}15`, color: func?.color }}>
                                {positionLabels[i]}
                              </span>
                              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Position {i + 1}</span>
                            </div>
                            <h3 className="font-serif font-semibold text-base" style={{ color: "rgba(255,255,255,0.9)" }}>{func?.name}</h3>
                            <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{func?.alias}</p>
                            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{typeFuncDescriptions[i]}</p>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => toggleCard(cardId)}
                        className="w-full px-6 py-3 flex items-center justify-between text-xs font-medium transition-colors hover:opacity-80"
                        style={{ color: func?.color, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <span>What this looks like in you</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <div className="px-6 pb-5 pt-2" style={{ borderTop: `1px solid ${func?.color}15` }}>
                              <ul className="space-y-2">
                                {(func?.characteristics || []).slice(0, 4).map((c, ci) => (
                                  <li key={ci} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: func?.color }} />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              <h2 className="font-serif font-bold text-lg mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>Your Function Axes</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {axes.map(({ pair, label }) => {
                  const preferred = bestType.fullStack?.find(f => pair.includes(f));
                  const notPreferred = pair.find(f => f !== preferred);
                  const prefFunc = cognitiveFunctions.find(f => f.code === preferred);
                  const otherFunc = cognitiveFunctions.find(f => f.code === notPreferred);
                  return (
                    <div key={label} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 text-center p-3 rounded-xl"
                          style={{ backgroundColor: `${prefFunc?.color}15`, border: `1.5px solid ${prefFunc?.color}40` }}>
                          <div className="font-mono font-bold text-lg" style={{ color: prefFunc?.color }}>{preferred}</div>
                          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Preferred</div>
                        </div>
                        <span className="font-light text-lg" style={{ color: "rgba(255,255,255,0.3)" }}>&#8596;</span>
                        <div className="flex-1 text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <div className="font-mono font-bold text-lg" style={{ color: "rgba(255,255,255,0.4)" }}>{notPreferred}</div>
                          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Less developed</div>
                        </div>
                      </div>
                      {otherFunc && <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{otherFunc.brief}</p>}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── TAB 2: SHADOW ── */}
          {activeTab === "shadow" && (
            <motion.div key="shadow" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <div className="mb-6">
                <h2 className="font-serif font-bold text-lg mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>The 8-Function Model (John Beebe)</h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>Jungian analyst John Beebe mapped all 8 cognitive functions to archetypal positions. The first 4 are conscious; the last 4 are shadow functions that emerge in stress, projection, and growth. Each position carries its own archetypal energy and psychological significance.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: bestType.color }} />
                    <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>Conscious Functions</h3>
                  </div>
                  <div className="space-y-3">
                    {typeBeebe.slice(0, 4).map((item, i) => {
                      const func = cognitiveFunctions.find(f => f.code === item.function);
                      const cardId = `beebe-${i}`;
                      const isExpanded = expandedCards[cardId];
                      return (
                        <div key={i} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm text-white"
                                style={{ backgroundColor: func?.color || bestType.color }}>
                                {item.function}
                              </div>
                              <div>
                                <div className="font-medium text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{item.archetype}</div>
                                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Position {i + 1} &middot; {func?.name}</div>
                              </div>
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{item.description}</p>
                          </div>
                          <button onClick={() => toggleCard(cardId)}
                            className="w-full px-4 py-2 flex items-center justify-between text-xs hover:opacity-80 transition-colors"
                            style={{ color: func?.color, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <span>Thyself details</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                <div className="px-4 pb-3 pt-2 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                  {i === 0 && <p>The Hero function is your ego&apos;s primary tool, the function through which you assert yourself in the world. Overdeveloping this function without developing the others creates imbalance.</p>}
                                  {i === 1 && <p>The Good Parent is supportive, reliable, and nurturing. This function serves and supports the Hero, providing the ground from which your dominant function can operate safely.</p>}
                                  {i === 2 && <p>The Divine Child is eternal, playful, and potentially naive. This function has both a gifted and a shadow side, when developed, it brings creativity; when immature, it can be unreliable.</p>}
                                  {i === 3 && <p>The Anima/Animus is your gateway to the unconscious, the place where growth happens and where you are most vulnerable. This function often projects onto others and appears in dreams.</p>}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
                    <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>Shadow Functions</h3>
                  </div>
                  <div className="space-y-3">
                    {typeBeebe.slice(4, 8).map((item, i) => {
                      const func = cognitiveFunctions.find(f => f.code === item.function);
                      const cardId = `beebe-shadow-${i}`;
                      const isExpanded = expandedCards[cardId];
                      const shadowColors = ["#64748b", "#475569", "#334155", "#1e293b"];
                      return (
                        <div key={i} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm text-white"
                                style={{ backgroundColor: shadowColors[i] }}>
                                {item.function}
                              </div>
                              <div>
                                <div className="font-medium text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item.archetype}</div>
                                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Position {i + 5} &middot; {func?.name}</div>
                              </div>
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.description}</p>
                          </div>
                          <button onClick={() => toggleCard(cardId)}
                            className="w-full px-4 py-2 flex items-center justify-between text-xs hover:opacity-80 transition-colors"
                            style={{ color: "rgba(255,255,255,0.4)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <span>Thyself details</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                <div className="px-4 pb-3 pt-2 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                  {i === 0 && <p><span className="font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>The Opposing / Nemesis:</span> This function resists and opposes your Hero. Where you feel most defensively triggered, your Nemesis is usually operating. Learning to recognize it creates remarkable freedom.</p>}
                                  {i === 1 && <p><span className="font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>The Critical Parent / Senex:</span> This function operates as a harsh inner critic. It judges you and others by impossibly high standards in its domain. Developing awareness of this voice is a key psychological task.</p>}
                                  {i === 2 && <p><span className="font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>The Trickster:</span> This function operates in an uncontrolled, double-binding way. It can be both playful and deceptive, leading you to act in ways that undermine your own intentions without awareness.</p>}
                                  {i === 3 && <p><span className="font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>The Demon / Daimon:</span> The deepest shadow function, capable of great destruction or, when integrated, profound creative power. This is the function Jung associated with the deepest levels of the unconscious.</p>}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <h3 className="font-serif font-semibold mb-4 text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>Your Complete 8-Function Stack</h3>
                <div className="grid grid-cols-8 gap-1.5">
                  {typeBeebe.map((item, i) => {
                    const func = cognitiveFunctions.find(f => f.code === item.function);
                    const isConscious = i < 4;
                    return (
                      <div key={i} className="text-center">
                        <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{i + 1}</div>
                        <div className={`w-full aspect-square rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white ${!isConscious ? "opacity-50" : ""}`}
                          style={{ backgroundColor: isConscious ? (func?.color || bestType.color) : "#94a3b8" }}>
                          {item.function}
                        </div>
                        <div className="text-xs mt-1 leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>{archetypeNames[i].split("/")[0]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 3: LOOPS & GRIPS ── */}
          {activeTab === "loops" && (
            <motion.div key="loops" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <div className="mb-8">
                <h2 className="font-serif font-bold text-lg mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>The Loop</h2>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>A loop occurs when the dominant function bypasses the auxiliary and connects directly to the tertiary, creating a self-reinforcing closed system. Without the balancing influence of the auxiliary, the loop feels coherent but is actually a form of psychological avoidance.</p>

                <div className="rounded-2xl p-6 mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="flex items-center gap-3 mb-5 flex-wrap">
                    {typeLoop.functions.map((fCode, i) => {
                      const func = cognitiveFunctions.find(f => f.code === fCode);
                      return (
                        <div key={fCode} className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-xl text-white shadow-sm mb-1"
                              style={{ backgroundColor: func?.color || bestType.color }}>
                              {fCode}
                            </div>
                            <div className="text-xs font-medium" style={{ color: func?.color }}>{i === 0 ? "Dominant" : "Tertiary"}</div>
                          </div>
                          {i === 0 && (
                            <div className="flex flex-col items-center">
                              <span className="text-lg" style={{ color: "rgba(255,255,255,0.3)" }}>&#8596;</span>
                              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>loop</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div className="flex-1 min-w-32 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Bypasses</div>
                      {(() => {
                        const bypassFunc = cognitiveFunctions.find(f => f.code === typeLoop.bypasses);
                        return (
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-base" style={{ color: "rgba(255,255,255,0.4)" }}>{typeLoop.bypasses}</span>
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{bypassFunc?.name}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.7)" }}>{typeLoop.behavior}</p>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>Warning Signs</h4>
                      <ul className="space-y-2">
                        {typeLoop.warnings.map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-amber-400" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>How to Break Out</h4>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{typeLoop.breakOut}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <h4 className="font-medium text-sm mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>The {bestType.code} Loop in Depth</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{bestType.loopPattern.description}</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif font-bold text-lg mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>The Grip</h2>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>The grip occurs when the inferior function (position 4) temporarily hijacks the personality under extreme or prolonged stress. It produces behavior that is completely out of character, the least developed part of the psyche suddenly takes over. Understanding your grip experience is one of the most practically valuable things in psychological typology.</p>

                <div className="rounded-2xl p-6 mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {(() => {
                    const infFunc = cognitiveFunctions.find(f => f.code === inferiorFunc);
                    return (
                      <div className="flex items-center gap-4 mb-5 p-4 rounded-xl" style={{ backgroundColor: `${bestType.color}08`, border: `1px solid ${bestType.color}20` }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-xl text-white shadow-sm flex-shrink-0"
                          style={{ backgroundColor: infFunc?.color || bestType.color }}>
                          {inferiorFunc}
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Inferior Function (Position 4)</div>
                          <div className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>{infFunc?.name}</div>
                          <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{infFunc?.alias}</div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="grid sm:grid-cols-3 gap-5">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>Triggers</h4>
                      <ul className="space-y-2">
                        {typeGrip.triggers.map((t, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-red-400" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>Symptoms</h4>
                      <ul className="space-y-2">
                        {typeGrip.symptoms.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-orange-400" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>Recovery</h4>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{typeGrip.recovery}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <h4 className="font-medium text-sm mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>The {bestType.code} Grip in Depth</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{bestType.gripDescription}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 4: GROWTH ── */}
          {activeTab === "growth" && (
            <motion.div key="growth" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>

              {inferiorDev && (
                <div className="mb-8">
                  <h2 className="font-serif font-bold text-lg mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>Inferior Function Development</h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>Jung taught that individuation, the lifelong journey toward psychological wholeness, centers on developing a conscious relationship with the inferior function. It is your greatest weakness and, ultimately, your greatest source of growth.</p>

                  {(() => {
                    const infFunc = cognitiveFunctions.find(f => f.code === inferiorFunc);
                    return (
                      <div className="flex items-center gap-4 p-5 rounded-2xl mb-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-bold text-2xl text-white shadow-sm flex-shrink-0"
                          style={{ backgroundColor: infFunc?.color || bestType.color }}>
                          {inferiorFunc}
                        </div>
                        <div>
                          <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Your Inferior Function</div>
                          <div className="font-serif font-bold text-lg" style={{ color: "rgba(255,255,255,0.9)" }}>{infFunc?.name}</div>
                          <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{infFunc?.alias} &middot; {inferiorDev.function}</div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="grid sm:grid-cols-3 gap-4 mb-5">
                    {[inferiorDev.stage1, inferiorDev.stage2, inferiorDev.stage3].map((stage, i) => (
                      <div key={i} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : "#22c55e" }}>
                            {i + 1}
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>{stage.name}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{stage.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <h3 className="font-serif font-semibold mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>5 Practices for Developing Your Inferior</h3>
                    <div className="space-y-3">
                      {inferiorDev.practices.map((p, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: bestType.color }}>
                            {i + 1}
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="font-serif font-bold text-lg mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>Your Integration Path</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: bestType.color }} />
                      Natural Strengths
                    </h4>
                    <ul className="space-y-2">
                      {bestType.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: bestType.color }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Growth Areas
                    </h4>
                    <ul className="space-y-2">
                      {bestType.growthAreas.map((g, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-amber-400" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <h4 className="font-medium text-sm mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>How Your Mind Works</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{bestType.cognitiveWiring}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-serif font-bold text-lg mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>Reflective Prompts</h2>
                <div className="space-y-3">
                  {bestType.journalPrompts.map((prompt, i) => (
                    <div key={i} className="rounded-2xl p-5 flex items-start gap-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${bestType.color}15` }}>
                        <Feather className="w-4 h-4" style={{ color: bestType.color }} />
                      </div>
                      <p className="text-sm leading-relaxed pt-0.5 italic" style={{ color: "rgba(255,255,255,0.7)" }}>&ldquo;{prompt}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-serif font-bold text-lg mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>Temperament &amp; Interaction Style</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Temperament</div>
                    <div className="font-serif font-bold text-lg mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>{bestType.temperament}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {bestType.temperament.includes("NT") && "The NT Rational temperament is driven by the pursuit of knowledge, competence, and strategic mastery. Rationals are natural theorists and systems-thinkers who feel most alive when solving complex problems."}
                      {bestType.temperament.includes("NF") && "The NF Idealist temperament is oriented toward meaning, authenticity, and human potential. Idealists are drawn to understanding people deeply and helping them grow into their fullest selves."}
                      {bestType.temperament.includes("SJ") && "The SJ Guardian temperament is driven by responsibility, reliability, and preserving what works. Guardians are the stabilizing force in any community, dependable, thorough, and deeply committed to serving others."}
                      {bestType.temperament.includes("SP") && "The SP Artisan temperament is oriented toward freedom, action, and immediate engagement with life. Artisans are at their best when they can respond spontaneously to what is happening right now."}
                    </p>
                  </div>
                  <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Interaction Style</div>
                    <div className="font-serif font-bold text-lg mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>{bestType.interactionStyle}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {bestType.interactionStyle === "Chart the Course" && "You prefer to have a clear goal and plan in mind before engaging. You work best when you can direct your energy toward a defined outcome, and you tend to lead from behind, setting direction rather than pushing from the front."}
                      {bestType.interactionStyle === "Behind the Scenes" && "You prefer to work carefully and thoroughly, often influencing situations through thoughtful preparation rather than direct assertion. You tend to process deeply before acting and prefer quality of engagement over speed."}
                      {bestType.interactionStyle === "In Charge" && "You naturally move into leadership and direction when a situation requires it. You are comfortable making decisions, taking responsibility, and keeping things moving efficiently toward a goal."}
                      {bestType.interactionStyle === "Get Things Going" && "You are energized by engaging others and getting collective momentum building. You bring enthusiasm and responsiveness to interactions and are skilled at initiating and sustaining collaboration."}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif font-bold text-lg mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>Continue Exploring</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Link href={`/cognitive/learn?type=${bestType.code}`} className="p-5 rounded-2xl card-hover group" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <BookOpen className="w-5 h-5 mb-3" style={{ color: bestType.color }} />
                    <h4 className="font-medium text-sm mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>Deep Dive</h4>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Learn everything about {bestType.code}</p>
                  </Link>
                  <Link href="/compare" className="p-5 rounded-2xl card-hover group" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <GitCompare className="w-5 h-5 text-violet-400 mb-3" />
                    <h4 className="font-medium text-sm mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>Compare Types</h4>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>See how you relate to other types</p>
                  </Link>
                  <Link href="/journal" className="p-5 rounded-2xl card-hover group" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Feather className="w-5 h-5 text-emerald-400 mb-3" />
                    <h4 className="font-medium text-sm mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>Inner Work</h4>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Personalized prompts for your type</p>
                  </Link>
                </div>
              </div>

              {/* Guided Journey */}
              <GuidedJourney source="cognitive" typeCode={bestType.code} />

              <NextStepBanner
                href="/cognitive/learn"
                label="Explore your cognitive function stack"
                sublabel="Deep-dive into each function's role in your type"
                icon={<Brain className="w-5 h-5" />}
                color="#6366f1"
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CognitiveResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsUnlocked(localStorage.getItem("psyche-cognitive-unlocked") === "true");
  }, []);

  if (!mounted) return <div style={{ minHeight: "100vh", background: "#0f0a1e" }} />;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0f0a1e" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
          <Lock className="w-7 h-7" style={{ color: "#a78bfa" }} />
        </div>
        <h1 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>Full Cognitive Path</h1>
        <p className="text-sm mb-8 max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Unlock the Jungian function stack, your cognitive type, and deep-dive learning.</p>
        <Link href="/store" className="px-6 py-3 rounded-2xl font-bold text-white mb-4" style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
          Unlock in Store
        </Link>
        <Link href="/assessments" className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Back to Assessments</Link>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading results...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
