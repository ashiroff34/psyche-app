"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NextStepBanner from "@/components/NextStepBanner";
import { markTopicComplete } from "@/hooks/useGameState";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Zap,
  AlertTriangle,
  Eye,
  Brain,
  Layers,
  ArrowLeftRight,
  Ghost,
  RefreshCw,
  Users,
  Sparkles,
  Heart,
  Shield,
  Flame,
  Moon,
  Sun,
  Baby,
  GraduationCap,
  User,
  Activity,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Orbit,
  Skull,
  Swords,
  Crown,
  Wand2,
  Lock,
} from "lucide-react";
import {
  cognitiveFunctions,
  mbtiTypes,
  type CognitiveFunction,
  type MBTIType,
} from "@/data/cognitive-functions";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";
import {
  functionAxes,
  shadowPositions,
  functionLoops,
  gripExperiences,
} from "@/data/deep-cognitive";
import { keirseyTemperaments, getTemperamentDataForType } from "@/data/keirseyTemperaments";

// ============================================================
// DATA MAPS & HELPERS
// ============================================================

const funcMap: Record<string, CognitiveFunction> = {};
cognitiveFunctions.forEach((f) => (funcMap[f.code] = f));

const typeMap: Record<string, MBTIType> = {};
mbtiTypes.forEach((t) => (typeMap[t.code] = t));

// Shadow stack calculator - given the ego stack, produce the full 8-function stack
function getFullStack(egoStack: string[]): string[] {
  const attitudeFlip: Record<string, string> = {
    Ni: "Ne", Ne: "Ni", Si: "Se", Se: "Si",
    Ti: "Te", Te: "Ti", Fi: "Fe", Fe: "Fi",
  };
  return [
    ...egoStack,
    ...egoStack.map((f) => attitudeFlip[f] || f),
  ];
}

const positionLabels = [
  "Hero", "Parent", "Child", "Anima/Animus",
  "Nemesis", "Critical Parent", "Trickster", "Demon",
];

const positionColors = [
  "#6366f1", "#0ea5e9", "#f59e0b", "#ec4899",
  "#ef4444", "#7c3aed", "#f97316", "#1e293b",
];

// Jungian deep descriptions per function (hardcoded rich content)
const jungianDescriptions: Record<string, string> = {
  Ni: "Jung described Introverted Intuition as perceiving the 'background processes' of consciousness itself. The Ni user does not merely see possibilities; they perceive the archetypal patterns beneath surface reality. Their perception is convergent -- many streams of unconscious data crystallize into a singular image, symbol, or 'knowing.' Jung compared it to a prophetic vision that arrives unbidden from the collective unconscious. Ni-dominant types often report that their insights feel received rather than constructed.",
  Ne: "Jung characterized Extraverted Intuition as the function that perceives 'possibilities inherent in the objective situation.' Ne does not see things as they are but as they could become. It is the function of the prophet-inventor who senses latent potential in people, objects, and ideas. Where Se sees a seed, Ne sees the tree it might become, the forest it might spawn, and the civilization that might grow around it. It is divergent and generative -- one perception spawning many.",
  Si: "For Jung, Introverted Sensing was the most misunderstood function. It does not simply 'remember' -- it filters present sensory experience through a deeply personal subjective lens, creating impressions that are richer and more layered than the original stimulus. The Si user experiences the present overlaid with the resonance of every similar past experience. Jung wrote that this function creates an internal sensory world as vivid and real as the external one, where impressions accumulate into a 'psychic mirror-world.'",
  Se: "Jung described Extraverted Sensing as the function of 'absolute reality' -- the capacity to experience the world with maximal fidelity and presence. Se perceives objects in their full sensory richness without the filters of memory, expectation, or interpretation. It is the function of the artist who sees the precise shade of light on a leaf, the athlete who reads the field in real time, and the craftsman who feels the grain of wood under their hands. For Jung, strong Se represents the most direct contact with the objective world that human consciousness can achieve.",
  Ti: "Jung described Introverted Thinking as thinking guided by the 'subjective factor' -- an internal logical architecture that the individual constructs and refines throughout their life. Ti does not accept external authorities or consensus as proof; it must rebuild every logical structure from first principles within its own framework. Jung noted that this function can produce brilliantly original theoretical systems but risks becoming so internally self-referential that it loses contact with empirical reality. The Ti user's ultimate aim is a perfectly coherent internal model of truth.",
  Te: "For Jung, Extraverted Thinking was thinking oriented by the 'objective factor' -- external evidence, measurable outcomes, and empirical data. Te trusts what can be demonstrated, quantified, and replicated. It naturally organizes the external world into efficient systems, hierarchies, and procedures. Jung observed that this function drives the scientific method, organizational management, and any domain where thinking must produce tangible results. The Te user's standard is not internal coherence but external effectiveness.",
  Fi: "Jung described Introverted Feeling as a still, deep water -- invisible from the surface but vast in its depths. Fi creates an intensely personal value system that evaluates everything according to 'Is this good or bad for me? Does this align with who I truly am?' Unlike Fe, which harmonizes with external values, Fi holds to its own inner compass regardless of social pressure. Jung warned that this function can be so deep and private that even its possessor struggles to articulate it -- they know what they value but may be unable to explain why.",
  Fe: "Jung described Extraverted Feeling as the function that attunes to the 'objective factor' in the realm of values -- the shared emotional atmosphere, social norms, and collective sentiments. Fe does not just perceive others' emotions; it resonates with them, amplifies them, and actively shapes the group's emotional field. Jung noted that Fe can be a powerful force for social cohesion and collective well-being, but risks losing the individual's own emotional truth in the process of harmonizing with others.",
};

// Development stages per function
const developmentStages: Record<string, { childhood: string; adolescence: string; adulthood: string }> = {
  Ni: {
    childhood: "As a child, Ni manifests as vivid daydreaming, an uncanny sense of 'just knowing' things, and fascination with symbols and hidden meanings. Ni-dominant children may seem old beyond their years, often staring into space as they process internal imagery. They may struggle to explain their insights to adults.",
    adolescence: "In adolescence, Ni sharpens into strategic thinking and future planning. The teenager begins to trust their 'gut feelings' and may develop intense interests in philosophy, psychology, or mysticism. They start recognizing patterns in human behavior and social dynamics that peers miss.",
    adulthood: "In mature adulthood, Ni becomes a powerful tool for long-range vision and deep pattern recognition. The individual learns to trust their unconscious synthesis while also testing insights against reality. At its best, Ni provides a near-prophetic capacity for understanding where things are headed.",
  },
  Ne: {
    childhood: "Ne children are the 'why?' children -- endlessly curious, making unexpected connections, and bursting with imaginative play. They may jump from idea to idea so quickly that adults find them exhausting. Every object becomes something else; every situation contains hidden possibilities.",
    adolescence: "Adolescent Ne becomes more sophisticated -- the teenager begins connecting ideas across different domains, developing a talent for creative problem-solving and debate. They may rebel against conventional thinking and seek out novel experiences and subcultures.",
    adulthood: "Mature Ne becomes a powerful engine of innovation and insight. The individual learns to channel their divergent thinking productively, balancing exploration with follow-through. At its best, Ne sees revolutionary possibilities that reshape fields and paradigms.",
  },
  Si: {
    childhood: "Si children develop strong attachments to familiar routines, objects, and sensory experiences. They may have remarkably detailed memories of past events and notice when things are 'different from last time.' They find comfort in repetition and may be particular about sensory details like food textures or clothing.",
    adolescence: "Adolescent Si deepens into a rich internal library of accumulated experience. The teenager begins to draw consciously on past patterns to navigate new situations. They may develop strong traditions with friends and become the group's 'historian.'",
    adulthood: "Mature Si provides a wealth of experiential wisdom and practical knowledge. The individual has built a comprehensive internal reference library that allows rapid, accurate assessment of new situations by comparing them to stored impressions. At its best, Si offers the stability and depth of accumulated wisdom.",
  },
  Se: {
    childhood: "Se children are kinesthetic and physically engaged -- they learn by touching, moving, and experiencing. They are often athletic, fearless with physical exploration, and intensely aware of their sensory environment. They live completely in the present moment.",
    adolescence: "Adolescent Se sharpens into quick reflexes, aesthetic sensitivity, and a hunger for intense experience. The teenager may be drawn to sports, performance, adventure, or any domain that demands physical presence and real-time responsiveness.",
    adulthood: "Mature Se becomes a masterful capacity for presence, timing, and environmental awareness. The individual reads situations instantly and responds with precision. At its best, Se provides an unmatched ability to be fully alive in the present moment -- the flow state that athletes, performers, and artists describe.",
  },
  Ti: {
    childhood: "Ti children are the ones who take things apart to see how they work. They ask probing questions, resist accepting explanations that don't make internal logical sense, and may argue with teachers over logical inconsistencies. They build elaborate mental models of how systems work.",
    adolescence: "Adolescent Ti becomes increasingly sophisticated -- the teenager constructs complex logical frameworks for understanding the world. They may be drawn to programming, philosophy, mathematics, or any domain that rewards precise analytical thinking. They often feel alienated by social norms that seem logically arbitrary.",
    adulthood: "Mature Ti provides extraordinary analytical precision and the capacity to see through flawed reasoning instantly. The individual has refined their internal logical framework over decades and can troubleshoot complex systems with ease. At its best, Ti produces original theoretical insights that reveal hidden truths.",
  },
  Te: {
    childhood: "Te children naturally organize their environment -- lining up toys, creating systems, and telling other children what to do. They respond well to clear rules and measurable goals. They may be impatient with unstructured play and gravitate toward games with clear winning conditions.",
    adolescence: "Adolescent Te manifests as goal-oriented drive and organizational skill. The teenager excels in structured environments, takes leadership roles, and evaluates everything by its results. They may become frustrated with peers who seem inefficient or aimless.",
    adulthood: "Mature Te is a formidable executive function -- the capacity to organize complex systems, lead teams, and execute plans with precision. The individual has learned to balance efficiency with wisdom, knowing when to push for results and when to adapt the plan. At its best, Te builds systems that serve both productivity and human flourishing.",
  },
  Fi: {
    childhood: "Fi children have an early and intense awareness of authenticity and fairness. They may become deeply upset when they witness injustice, even in stories. They develop strong personal likes and dislikes that resist social pressure, and they may have invisible imaginary inner worlds rich with emotional meaning.",
    adolescence: "Adolescent Fi deepens into a powerful moral compass and identity formation. The teenager may become passionate about causes, develop intense artistic expression, and resist any attempt to make them be someone they are not. Their inner emotional world becomes increasingly complex and nuanced.",
    adulthood: "Mature Fi provides a rock-solid internal value system and deep empathic understanding. The individual knows who they are with a clarity that is unshakeable. At its best, Fi offers moral courage -- the willingness to stand alone for what is right -- combined with profound compassion for individual human experience.",
  },
  Fe: {
    childhood: "Fe children are social barometers -- they sense the emotional atmosphere of a room instantly and adjust their behavior accordingly. They may try to cheer up sad adults, mediate between fighting playmates, and organize group activities. They seek harmony and become distressed by interpersonal conflict.",
    adolescence: "Adolescent Fe develops into sophisticated social intelligence. The teenager reads group dynamics with precision, navigates complex social hierarchies, and may become a leader through consensus-building. They often sacrifice personal preferences for group harmony.",
    adulthood: "Mature Fe is a powerful force for community building and social cohesion. The individual can orchestrate group dynamics, inspire collective action, and create environments where people feel seen and valued. At its best, Fe serves the genuine wellbeing of all -- not just surface harmony, but deep collective flourishing.",
  },
};

// Healthy vs unhealthy manifestations
const healthyUnhealthy: Record<string, { healthy: string[]; unhealthy: string[] }> = {
  Ni: {
    healthy: ["Clear, actionable strategic vision", "Ability to see meaningful patterns without paranoia", "Trust in intuition balanced with reality-testing", "Communicating insights in ways others can understand", "Patient development of long-term goals"],
    unhealthy: ["Tunnel vision and refusal to consider alternatives", "Mystical thinking detached from reality", "Paranoid pattern-finding (seeing conspiracies everywhere)", "Arrogance about predictive abilities", "Complete disconnection from present sensory experience"],
  },
  Ne: {
    healthy: ["Creative innovation grounded in feasibility", "Seeing possibilities while committing to action", "Connecting ideas across domains productively", "Inspiring others with vision while following through", "Comfortable with ambiguity without becoming paralyzed"],
    unhealthy: ["Scattered, unable to commit to any single path", "Manic ideation without grounding", "Using novelty as escape from present-moment difficulty", "Overwhelming others with tangential ideas", "Chronic restlessness and inability to be present"],
  },
  Si: {
    healthy: ["Rich experiential wisdom informing present choices", "Detailed memory serving practical competence", "Healthy routines providing stability and wellbeing", "Drawing on the past without being imprisoned by it", "Noticing when something is 'off' based on pattern familiarity"],
    unhealthy: ["Rigid clinging to 'how things have always been done'", "Nostalgia distorting present reality", "Hypochondria and excessive body-monitoring", "Resistance to all change and innovation", "Using routine as avoidance of necessary growth"],
  },
  Se: {
    healthy: ["Full, alive presence in the current moment", "Quick, accurate reading of environmental cues", "Graceful physical competence and aesthetic sense", "Spontaneous responsiveness balanced with wisdom", "Experiencing sensory pleasure without compulsion"],
    unhealthy: ["Impulsive risk-taking and thrill-seeking", "Inability to plan or consider consequences", "Sensory over-indulgence (food, substances, spending)", "Dominating others through physical presence or force", "Complete dismissal of abstract or future-oriented thinking"],
  },
  Ti: {
    healthy: ["Precise, original logical analysis", "Ability to see through flawed reasoning", "Building useful conceptual frameworks", "Independent thinking balanced with openness", "Communicating complex ideas clearly"],
    unhealthy: ["Analysis paralysis -- endlessly refining without acting", "Cold dismissal of all emotional considerations", "Arrogant certainty in own logic", "Detached from human impact of conclusions", "Building elaborate frameworks disconnected from reality"],
  },
  Te: {
    healthy: ["Effective organization serving meaningful goals", "Evidence-based decision-making with humility", "Leadership that empowers others", "Efficiency balanced with human consideration", "Clear communication of expectations and rationale"],
    unhealthy: ["Ruthless efficiency at the expense of human wellbeing", "Bulldozing others' feelings to get results", "Measuring everything's value only by productivity", "Controlling and domineering behavior", "Dismissing all subjective experience as irrelevant"],
  },
  Fi: {
    healthy: ["Unshakeable moral courage and authenticity", "Deep empathy for individual suffering", "Clear personal boundaries maintained with grace", "Living in alignment with one's deepest values", "Emotional self-awareness and self-acceptance"],
    unhealthy: ["Self-righteous moral superiority", "Inability to compromise on anything", "Emotional withdrawal at any perceived threat", "Using authenticity as excuse for inconsiderate behavior", "Believing personal feelings are universal moral truths"],
  },
  Fe: {
    healthy: ["Creating genuine warmth and belonging", "Mediating conflict with true understanding", "Inspiring collective action toward shared good", "Balancing others' needs with personal integrity", "Expressing emotions authentically and inviting connection"],
    unhealthy: ["People-pleasing at the cost of personal truth", "Emotional manipulation to maintain harmony", "Losing all sense of personal identity in group consensus", "Becoming resentful from chronic over-giving", "Weaponizing social pressure and guilt"],
  },
};

// Shadow manifestations per function
const shadowManifestations: Record<string, string> = {
  Ni: "When Ni operates from the shadow, it manifests as paranoid pattern-finding, ominous 'premonitions' driven by fear rather than genuine insight, and a dark conviction that catastrophe is inevitable. The individual may experience intrusive visions of worst-case scenarios or develop conspiracy-like thinking patterns that feel 'prophetic' but are actually projections of unconscious anxiety.",
  Ne: "Shadow Ne produces catastrophic imagining -- an eruption of terrifying possibilities that overwhelms the psyche. Instead of creative brainstorming, shadow Ne generates anxiety spirals: 'What if this goes wrong? And what if THAT goes wrong?' It can also manifest as a scattered, chaotic energy that disrupts rather than innovates.",
  Si: "Shadow Si manifests as obsessive nostalgia, hypochondria, or a sudden compulsive fixation on physical symptoms and bodily sensations. It may also produce rigid adherence to arbitrary routines as a defense against anxiety, or an overwhelming flood of negative past memories that distort present perception.",
  Se: "When Se operates from the shadow, it erupts as impulsive sensory over-indulgence -- binge eating, reckless physical behavior, substance abuse, or aggressive domination of the physical environment. The normally unconscious Se suddenly demands immediate, intense sensory experience, often in destructive ways.",
  Ti: "Shadow Ti manifests as cold, hypercritical analysis that dissects rather than understands. It produces a withering inner critic that finds logical flaws in everything, including the individual's own beliefs and relationships. Shadow Ti can also create a paralyzing need to 'figure everything out' before acting.",
  Te: "Shadow Te erupts as harsh, judgmental criticism of others' competence and efficiency. The individual becomes uncharacteristically bossy, controlling, and focused on 'getting things done right.' It may also manifest as compulsive list-making, aggressive organizing, or an overwhelming sense that everything is broken and needs fixing.",
  Fi: "Shadow Fi produces overwhelming, unprocessed emotions that the individual cannot understand or articulate. It may manifest as hypersensitivity, moral outrage disproportionate to the situation, or a deep sense of personal worthlessness. The individual may become self-absorbed in their suffering without the Fi-user's normal capacity for emotional self-understanding.",
  Fe: "Shadow Fe manifests as emotional manipulation, guilt-tripping, or a sudden overwhelming need for others' approval and harmony. The individual may become passive-aggressive, project their feelings onto others, or attempt to control the emotional atmosphere through subtle social pressure. It can also erupt as an uncontrollable emotional display that overwhelms both the individual and those around them.",
};

// Body/somatic connection per function
const bodyConnections: Record<string, string> = {
  Ni: "Ni is often experienced in the body as a 'gut knowing' -- a deep sensation in the abdomen or solar plexus that signals insight is arriving. Ni users frequently report a feeling of 'convergence' or 'clicking into place' when an insight crystallizes. The eyes may lose focus or gaze into the middle distance. The body becomes still and internally focused. Brain imaging (Nardi) shows Ni-dominant types exhibiting whole-brain synchronization during insight moments -- a state sometimes called 'zen-like.'",
  Ne: "Ne lives in the body as restless energy -- bouncing legs, animated gestures, and eyes that dart around noticing connections. Ne users often need to move while thinking and may pace, fidget, or gesture expansively during brainstorming. The body feels 'buzzy' and energized when Ne is active. Nardi's brain scans show Ne-dominant types lighting up multiple brain regions simultaneously, creating a 'Christmas tree' pattern of neural activity.",
  Si: "Si connects deeply to the body's internal state -- gut feelings, muscle tension, temperature, and the subtle signals of physical comfort or discomfort. Si users may have strong physical reactions to memories (smelling a scent that instantly transports them to childhood). The body serves as an archive of past experience. Si users often have refined proprioception and may notice subtle changes in their physical state before others would.",
  Se: "Se IS the body -- it's the function of pure physical presence and environmental awareness. Se users feel most alive when physically engaged: muscles moving, senses sharp, reflexes primed. The body is their primary instrument of perception. High Se types often have excellent hand-eye coordination, spatial awareness, and a natural grace in physical movement. They experience the world through the body first and process cognitively second.",
  Ti: "Ti manifests physically as stillness and internal concentration -- a furrowed brow, slight tension in the jaw, and a withdrawn quality as attention turns inward. Ti users may unconsciously hold their breath while working through complex logic. The body becomes almost invisible to the Ti user during deep analysis. Some Ti users report a 'clicking' sensation in the head when logical pieces fit together, or a physical discomfort when encountering logical inconsistency.",
  Te: "Te connects to the body through purposeful, directed action. Te users often carry tension in their shoulders and jaw -- the physical expression of 'getting things done.' Their body language is typically direct and assertive: firm handshakes, upright posture, decisive movements. Te energy is projected outward through the body, and Te users often feel physical restlessness when forced to be passive or inefficient.",
  Fi: "Fi is experienced deep in the chest -- a warmth or ache centered around the heart space. Fi users have a rich internal emotional landscape that they experience as physical sensation: a tightness when values are violated, a warmth when something resonates as authentic, a hollowness when disconnected from meaning. Strong Fi may manifest as a visible flush, tears that arrive before conscious understanding, or a physical recoil from inauthenticity.",
  Fe: "Fe lives in the body as emotional resonance -- literally feeling others' emotions as physical sensations. Fe users may experience tightness in their chest when someone nearby is distressed, warmth spreading through their body when a group connects, or nausea when interpersonal tension is present. The face is especially active: Fe users are typically highly expressive, their features naturally mirroring the emotions of those around them.",
};

// Loop self-check questions
const loopSelfCheck: { question: string; ifYes: string }[] = [
  { question: "Have I been making decisions entirely inside my own head without getting outside input?", ifYes: "You may be bypassing your extraverted functions. Seek external feedback." },
  { question: "Do I feel stuck repeating the same thought patterns without reaching resolution?", ifYes: "This is a classic loop sign. The auxiliary function, which provides balance, is being skipped." },
  { question: "Have I been avoiding social interaction or external engagement more than usual?", ifYes: "For introverted dominant types, this may indicate a loop into the tertiary function." },
  { question: "Am I being uncharacteristically reactive, impulsive, or externally focused?", ifYes: "For extraverted dominant types, this may indicate a loop that bypasses the introverted auxiliary." },
  { question: "Would someone who knows me well say I'm 'not acting like myself'?", ifYes: "This is one of the strongest indicators of a loop or grip state." },
  { question: "Am I clinging to a single perspective while feeling increasingly anxious or unsettled?", ifYes: "The discomfort comes from the auxiliary function trying to reassert itself. Let it in." },
];

// Types that use each axis
const axisTypes: Record<string, { dominant: string[]; auxiliary: string[] }> = {
  "Ti, Fe": { dominant: ["INTP", "ISTP", "ENFJ", "ESFJ"], auxiliary: ["ENTP", "ESTP", "INFJ", "ISFJ"] },
  "Te, Fi": { dominant: ["ENTJ", "ESTJ", "INFP", "ISFP"], auxiliary: ["INTJ", "ISTJ", "ENFP", "ESFP"] },
  "Ni, Se": { dominant: ["INTJ", "INFJ", "ESTP", "ESFP"], auxiliary: ["ENTJ", "ENFJ", "ISTP", "ISFP"] },
  "Ne, Si": { dominant: ["ENTP", "ENFP", "ISTJ", "ISFJ"], auxiliary: ["INTP", "INFP", "ESTJ", "ESFJ"] },
};

// Common mistypes for each type
const commonMistypes: Record<string, string[]> = {
  INTJ: ["INTP", "INFJ", "ISTJ", "ENTJ"],
  INTP: ["INTJ", "INFP", "ISTP", "ENTP"],
  ENTJ: ["INTJ", "ESTJ", "ENTP", "ENFJ"],
  ENTP: ["ENFP", "INTP", "ENTJ", "ESTP"],
  INFJ: ["INFP", "INTJ", "ISFJ", "ENFJ"],
  INFP: ["INFJ", "ISFP", "INTP", "ENFP"],
  ENFJ: ["ENFP", "ESFJ", "INFJ", "ENTJ"],
  ENFP: ["ENFJ", "INFP", "ENTP", "ESFP"],
  ISTJ: ["INTJ", "ISFJ", "ESTJ", "ISTP"],
  ISFJ: ["INFJ", "ISTJ", "ESFJ", "ISFP"],
  ESTJ: ["ENTJ", "ISTJ", "ESFJ", "ESTP"],
  ESFJ: ["ENFJ", "ISFJ", "ESTJ", "ESFP"],
  ISTP: ["INTP", "ISTJ", "ISFP", "ESTP"],
  ISFP: ["INFP", "ISTP", "ISFJ", "ESFP"],
  ESTP: ["ENTP", "ISTP", "ESFP", "ESTJ"],
  ESFP: ["ENFP", "ISFP", "ESTP", "ESFJ"],
};

// Interaction styles
const interactionStyles: Record<string, { style: string; temperament: string }> = {
  INTJ: { style: "Chart-the-Course", temperament: "NT Rational" },
  INTP: { style: "Behind-the-Scenes", temperament: "NT Rational" },
  ENTJ: { style: "In-Charge", temperament: "NT Rational" },
  ENTP: { style: "Get-Things-Going", temperament: "NT Rational" },
  INFJ: { style: "Chart-the-Course", temperament: "NF Idealist" },
  INFP: { style: "Behind-the-Scenes", temperament: "NF Idealist" },
  ENFJ: { style: "In-Charge", temperament: "NF Idealist" },
  ENFP: { style: "Get-Things-Going", temperament: "NF Idealist" },
  ISTJ: { style: "Chart-the-Course", temperament: "SJ Guardian" },
  ISFJ: { style: "Behind-the-Scenes", temperament: "SJ Guardian" },
  ESTJ: { style: "In-Charge", temperament: "SJ Guardian" },
  ESFJ: { style: "Get-Things-Going", temperament: "SJ Guardian" },
  ISTP: { style: "Chart-the-Course", temperament: "SP Artisan" },
  ISFP: { style: "Behind-the-Scenes", temperament: "SP Artisan" },
  ESTP: { style: "In-Charge", temperament: "SP Artisan" },
  ESFP: { style: "Get-Things-Going", temperament: "SP Artisan" },
};

// Growth path (developing inferior function)
const inferiorGrowth: Record<string, string> = {
  INTJ: "Your growth edge is Extraverted Sensing (Se) -- learning to fully inhabit the present moment. Practice grounding: physical exercise, cooking, art-making, nature immersion. Your deepest integration comes when your strategic vision is informed by vivid present-moment awareness. You don't need to become Se-dominant; you need to let Se inform your Ni.",
  INTP: "Your growth edge is Extraverted Feeling (Fe) -- learning to connect authentically with others' emotional reality. Practice expressing how you feel (not just what you think), actively attending to social dynamics, and offering warmth without logical justification. Integration means your brilliant analyses serve human connection, not just intellectual curiosity.",
  ENTJ: "Your growth edge is Introverted Feeling (Fi) -- learning to access your own deep, personal emotional truth. Practice stillness, journaling about what matters to you personally (not just professionally), and allowing vulnerability. Integration means your powerful leadership is guided by genuine personal values, not just effectiveness.",
  ENTP: "Your growth edge is Introverted Sensing (Si) -- learning to honor the body, routine, and accumulated experience. Practice consistency, tend to your physical health, and learn from history rather than dismissing it. Integration means your innovations are grounded in practical wisdom and sustainable habits.",
  INFJ: "Your growth edge is Extraverted Sensing (Se) -- learning to be fully present in your body and the physical world. Practice mindfulness, physical activity, art-making, and allowing yourself to enjoy pure sensory pleasure without needing it to 'mean something.' Integration means your deep vision is grounded in embodied, present-moment reality.",
  INFP: "Your growth edge is Extraverted Thinking (Te) -- learning to organize, execute, and measure results in the external world. Practice making plans, setting deadlines, and evaluating ideas by their practical outcomes. Integration means your beautiful inner values actually manifest as change in the real world.",
  ENFJ: "Your growth edge is Introverted Thinking (Ti) -- learning to analyze with detachment and build your own logical frameworks independent of others' feelings. Practice solitary study, logical analysis without social context, and questioning your own beliefs rigorously. Integration means your empathic leadership is supported by clear, independent reasoning.",
  ENFP: "Your growth edge is Introverted Sensing (Si) -- learning to honor routine, follow through, and draw on accumulated experience. Practice finishing projects, maintaining healthy habits, and reflecting on past lessons. Integration means your creative possibilities become reliable realities.",
  ISTJ: "Your growth edge is Extraverted Intuition (Ne) -- learning to embrace novelty, possibility, and the unknown. Practice brainstorming without judgment, exploring unfamiliar ideas, and saying 'what if?' more often. Integration means your practical wisdom can adapt to unprecedented situations.",
  ISFJ: "Your growth edge is Extraverted Intuition (Ne) -- learning to see possibilities beyond established patterns. Practice exploring new perspectives, entertaining unconventional ideas, and stepping outside comfort zones. Integration means your devoted care extends into creative, forward-thinking territory.",
  ESTJ: "Your growth edge is Introverted Feeling (Fi) -- learning to access deep personal emotions and values. Practice vulnerability, listening to your inner emotional signals, and asking what you truly want (not just what's efficient). Integration means your leadership serves your authentic self, not just the system.",
  ESFJ: "Your growth edge is Introverted Thinking (Ti) -- learning to analyze independently without reference to social consensus. Practice questioning why you believe what you believe, studying logic, and forming opinions before checking what others think. Integration means your social warmth is supported by genuine independent conviction.",
  ISTP: "Your growth edge is Extraverted Feeling (Fe) -- learning to engage with the social-emotional world openly. Practice expressing feelings verbally, actively participating in social situations, and allowing yourself to care about group harmony. Integration means your brilliant problem-solving serves human connection.",
  ISFP: "Your growth edge is Extraverted Thinking (Te) -- learning to organize, assert, and execute in the external world. Practice setting clear goals, being direct about your needs, and creating structures that support your creative vision. Integration means your authentic artistic expression reaches a wider audience.",
  ESTP: "Your growth edge is Introverted Intuition (Ni) -- learning to perceive deeper patterns and envision long-term trajectories. Practice reflection, meditation, and asking 'what does this mean?' rather than just 'what should I do?' Integration means your tactical brilliance serves a larger strategic purpose.",
  ESFP: "Your growth edge is Introverted Intuition (Ni) -- learning to look beneath surface experience for deeper meaning. Practice reflection, journaling, and paying attention to recurring patterns in your life. Integration means your joyful presence in the moment is enriched by deeper purpose and vision.",
};

// Cognitive wiring descriptions per type
const cognitiveWiring: Record<string, string> = {
  INTJ: "The INTJ's mind operates like a chess engine -- Ni constantly runs background simulations of 'where is this heading?' while Te selects the most efficient path forward. Their cognition is convergent-then-executive: first, they perceive the singular most likely future, then they build systematic plans to reach it. Fi adds quiet personal conviction, and Se provides occasional grounding in concrete reality. The INTJ's characteristic confidence comes from the Ni-Te loop where vision and execution reinforce each other.",
  INTP: "The INTP's mind is an infinite logical playground -- Ti constructs elaborate internal models while Ne feeds it fresh data from every possible angle. Their cognition is analytical-then-expansive: they build precise frameworks, then test them against novel possibilities. Si provides a library of accumulated knowledge, while Fe dimly signals how others are responding. The INTP's characteristic 'lost in thought' quality comes from Ti's insatiable need to refine understanding.",
  ENTJ: "The ENTJ's mind is a command center -- Te constantly scans the environment for inefficiencies to optimize while Ni provides strategic direction. Their cognition is executive-then-visionary: they organize the external world first, then check it against their internal vision. Se provides tactical awareness, and Fi whispers about personal meaning beneath the ambition. The ENTJ's characteristic decisiveness comes from Te's bias toward action informed by Ni's strategic clarity.",
  ENTP: "The ENTP's mind is an idea factory -- Ne generates a constant stream of possibilities while Ti rapidly evaluates their logical merit. Their cognition is expansive-then-analytical: they see many possibilities, then stress-test them against internal logic. Fe provides social awareness, while Si dimly reminds them of practical constraints. The ENTP's characteristic quick-wittedness comes from Ne and Ti working in rapid alternation.",
  INFJ: "The INFJ's mind operates like a compassionate oracle -- Ni perceives deep patterns and future trajectories while Fe ensures these insights serve human wellbeing. Their cognition is visionary-then-empathic: they perceive what is coming, then evaluate its impact on people. Ti provides analytical structure, while Se grounds them in physical reality. The INFJ's characteristic depth comes from Ni's archetypal perception filtered through Fe's interpersonal warmth.",
  INFP: "The INFP's mind is an inner universe of meaning -- Fi maintains a deep, values-based map of emotional truth while Ne opens doors to new imaginative possibilities. Their cognition is evaluative-then-explorative: they check every experience against their core values, then imagine how it could be different. Si anchors them in personal history, while Te whispers about practical execution. The INFP's characteristic idealism comes from Fi's uncompromising authenticity paired with Ne's vision of what could be.",
  ENFJ: "The ENFJ's mind is a social resonance field -- Fe reads and shapes the emotional atmosphere while Ni sees where relationships and communities are heading. Their cognition is harmonizing-then-visionary: they attune to collective needs, then envision how to guide the group toward growth. Se keeps them engaged with present reality, while Ti provides occasional analytical clarity. The ENFJ's characteristic charisma comes from Fe's warmth guided by Ni's insight into human potential.",
  ENFP: "The ENFP's mind is a kaleidoscope of meaningful possibilities -- Ne sees connections and potential everywhere while Fi evaluates which possibilities resonate with authentic personal values. Their cognition is explorative-then-evaluative: they generate endless possibilities, then feel which ones truly matter. Te provides intermittent organizational energy, while Si dimly recalls past lessons. The ENFP's characteristic enthusiasm comes from Ne discovering possibilities that Fi finds genuinely meaningful.",
  ISTJ: "The ISTJ's mind is a comprehensive archive -- Si maintains detailed records of past experience while Te organizes them into reliable, efficient systems. Their cognition is referential-then-executive: they compare the present to stored experience, then apply proven methods. Fi provides quiet personal values, while Ne dimly perceives possibilities. The ISTJ's characteristic reliability comes from Si's accumulated wisdom organized by Te's systematic efficiency.",
  ISFJ: "The ISFJ's mind is a detailed tapestry of care -- Si stores vivid impressions of past experiences while Fe uses this knowledge to serve and protect others. Their cognition is referential-then-harmonizing: they draw on past experience to anticipate others' needs. Ti provides quiet analytical support, while Ne dimly suggests possibilities. The ISFJ's characteristic devotion comes from Si's rich memory of what people need, deployed through Fe's desire to help.",
  ESTJ: "The ESTJ's mind is an operational command post -- Te organizes the external world into efficient systems while Si provides institutional knowledge and proven procedures. Their cognition is executive-then-referential: they take charge of situations using established methods. Ne adds some openness to new approaches, while Fi quietly holds personal convictions. The ESTJ's characteristic authority comes from Te's organizational drive supported by Si's respect for what has worked before.",
  ESFJ: "The ESFJ's mind is a social coordination center -- Fe reads and manages the group's emotional dynamics while Si draws on detailed knowledge of people's histories and preferences. Their cognition is harmonizing-then-referential: they create warmth using intimate knowledge of what each person needs. Ne adds some creative adaptability, while Ti provides occasional logical grounding. The ESFJ's characteristic warmth comes from Fe's social attunement informed by Si's detailed memory of relationships.",
  ISTP: "The ISTP's mind is a precision engineering lab -- Ti builds exact logical models while Se provides real-time data from the physical environment. Their cognition is analytical-then-tactical: they understand how things work, then manipulate them with hands-on skill. Ni provides occasional flashes of insight, while Fe dimly registers social dynamics. The ISTP's characteristic calm competence comes from Ti's logical clarity applied through Se's physical precision.",
  ISFP: "The ISFP's mind is an aesthetic sanctuary -- Fi maintains a deep personal value system while Se immerses them in the vivid sensory present. Their cognition is evaluative-then-experiential: they feel what matters, then express it through present-moment engagement. Ni adds depth of meaning, while Te whispers about practical considerations. The ISFP's characteristic gentle authenticity comes from Fi's personal truth expressed through Se's sensory awareness.",
  ESTP: "The ESTP's mind is a tactical response unit -- Se reads the environment in real-time while Ti rapidly analyzes the best course of action. Their cognition is experiential-then-analytical: they perceive what's happening, then figure out the most logical response. Fe provides social awareness, while Ni dimly perceives longer-term patterns. The ESTP's characteristic quick thinking comes from Se's environmental awareness processed by Ti's logical precision.",
  ESFP: "The ESFP's mind is a celebration of the present -- Se immerses them fully in immediate experience while Fi evaluates it through personal values and authentic emotional response. Their cognition is experiential-then-evaluative: they engage with the world directly, then feel what it means to them. Te provides intermittent organizational skill, while Ni dimly perceives deeper patterns. The ESFP's characteristic vivacity comes from Se's full engagement with life filtered through Fi's authentic emotional response.",
};

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const fadeIn = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: "easeOut" as const },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const staggerItem = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

function ExpandableSection({
  icon,
  title,
  children,
  defaultOpen = false,
  accentColor = "#6366f1",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between transition-colors"
      >
        <span className="flex items-center gap-2.5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
          <span style={{ color: accentColor }}>{icon}</span>
          {title}
        </span>
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pill({ children, color = "#6366f1" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="px-3 py-1 text-xs rounded-lg font-medium"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>{children}</h3>;
}

// ============================================================
// TAB 1: THE 8 FUNCTIONS
// ============================================================

function Tab8Functions() {
  const [selectedFunc, setSelectedFunc] = useState<string | null>(null);
  const currentFunc = selectedFunc ? funcMap[selectedFunc] : null;

  // Get user's type stack for highlighting (reactive, updates when profile changes)
  const { profile } = useProfile();
  const userCode = profile.cognitiveType ?? profile.mbtiType;
  const myStack = userCode && typeMap[userCode] ? typeMap[userCode].stack : [];

  const stackPositionMap: Record<string, string> = {};
  const stackLabels = ["Dominant", "Auxiliary", "Tertiary", "Inferior"];
  myStack.forEach((f, i) => { stackPositionMap[f] = stackLabels[i]; });

  return (
    <div>
      {/* Your stack callout */}
      {myStack.length > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
          <span className="text-xs font-medium text-violet-400">Your stack:</span>
          <div className="flex gap-2">
            {myStack.map((f, i) => (
              <span key={f} className="text-xs font-mono font-bold text-violet-300">
                {f} <span className="font-normal" style={{ color: "rgba(139,92,246,0.7)" }}>({stackLabels[i]})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Function Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {cognitiveFunctions.map((f) => {
          const isSelected = selectedFunc === f.code;
          const isInStack = stackPositionMap[f.code];
          return (
            <button
              key={f.code}
              onClick={() => setSelectedFunc(isSelected ? null : f.code)}
              className={`relative p-4 rounded-2xl text-left transition-all ${isSelected ? "text-white shadow-lg" : ""}`}
              style={isSelected
                ? { backgroundColor: f.color, border: "1px solid transparent" }
                : isInStack
                ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(139,92,246,0.4)" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }
              }
            >
              {/* Stack position badge */}
              {isInStack && !isSelected && (
                <div className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[9px] font-bold rounded-lg text-white shadow-sm" style={{ background: "#8b5cf6" }}>
                  {isInStack}
                </div>
              )}
              <div className="font-mono font-bold text-lg">{f.code}</div>
              <div className="text-xs mt-0.5" style={{ color: isSelected ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)" }}>
                {f.name}
              </div>
              <div className="text-[10px] mt-1" style={{ color: isSelected ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)" }}>
                {f.alias}
              </div>
              <div className="flex gap-1 mt-2">
                <span
                  className="px-1.5 py-0.5 text-[9px] rounded"
                  style={isSelected ? { background: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)" } : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
                >
                  {f.attitude}
                </span>
                <span
                  className="px-1.5 py-0.5 text-[9px] rounded"
                  style={isSelected ? { background: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)" } : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
                >
                  {f.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Function Detail */}
      <AnimatePresence mode="wait">
        {currentFunc ? (
          <motion.div key={currentFunc.code} {...fadeIn} className="space-y-4">
            {/* Layer 1: Overview */}
            <div className="p-8 rounded-3xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <div className="flex items-start gap-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-xl shrink-0"
                  style={{ backgroundColor: currentFunc.color }}
                >
                  {currentFunc.code}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                    {currentFunc.name}
                  </h2>
                  <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>{currentFunc.alias}</p>
                  <div className="flex gap-2 mt-2 mb-4">
                    <Pill color={currentFunc.color}>{currentFunc.attitude}</Pill>
                    <Pill color={currentFunc.color}>{currentFunc.category}</Pill>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{currentFunc.brief}</p>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.6)" }}>{currentFunc.description}</p>
                </div>
              </div>
              {/* Characteristics */}
              <div className="mt-6">
                <h4 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Key Characteristics
                </h4>
                <div className="space-y-2">
                  {currentFunc.characteristics.map((c, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5"
                        style={{ backgroundColor: `${currentFunc.color}20`, color: currentFunc.color }}
                      >
                        {i + 1}
                      </div>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
              {/* Strengths & Blind Spots */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <h4 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Strengths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentFunc.strengths.map((s) => (
                      <span key={s} className="px-3 py-1 text-xs rounded-lg text-emerald-300" style={{ background: "rgba(16,185,129,0.12)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
                  <h4 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Blind Spots
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentFunc.blindSpots.map((b) => (
                      <span key={b} className="px-3 py-1 text-xs rounded-lg text-amber-300" style={{ background: "rgba(245,158,11,0.12)" }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* In Daily Life */}
              <div className="p-4 rounded-xl mt-4" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}>
                <h4 className="text-xs font-medium text-sky-400 mb-2">In Daily Life</h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{currentFunc.inDaily}</p>
              </div>
            </div>

            {/* Layer 2: Jung's Description */}
            <ExpandableSection
              icon={<Eye className="w-4 h-4" />}
              title="Jung's Description"
              accentColor={currentFunc.color}
            >
              <p className="text-sm leading-relaxed pt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                {jungianDescriptions[currentFunc.code] || currentFunc.description}
              </p>
            </ExpandableSection>

            {/* Layer 3: Development */}
            <ExpandableSection
              icon={<GraduationCap className="w-4 h-4" />}
              title="Development Across the Lifespan"
              accentColor={currentFunc.color}
            >
              <div className="space-y-4 pt-3">
                {[
                  { label: "Childhood", icon: <Baby className="w-4 h-4" />, key: "childhood" as const, color: "#f59e0b" },
                  { label: "Adolescence", icon: <GraduationCap className="w-4 h-4" />, key: "adolescence" as const, color: "#6366f1" },
                  { label: "Adulthood", icon: <User className="w-4 h-4" />, key: "adulthood" as const, color: "#10b981" },
                ].map((stage) => (
                  <div key={stage.key} className="p-4 rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ color: stage.color }}>{stage.icon}</span>
                      <h5 className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{stage.label}</h5>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {developmentStages[currentFunc.code]?.[stage.key] || "Development data not yet available."}
                    </p>
                  </div>
                ))}
              </div>
            </ExpandableSection>

            {/* Layer 4: Healthy vs Unhealthy */}
            <ExpandableSection
              icon={<Heart className="w-4 h-4" />}
              title="Healthy vs. Unhealthy Expression"
              accentColor={currentFunc.color}
            >
              <div className="grid sm:grid-cols-2 gap-4 pt-3">
                <div>
                  <h5 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Healthy
                  </h5>
                  <div className="space-y-2">
                    {(healthyUnhealthy[currentFunc.code]?.healthy || []).map((h, i) => (
                      <div key={i} className="p-3 rounded-xl text-sm" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.12)", color: "rgba(255,255,255,0.7)" }}>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-red-400 mb-3 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Unhealthy
                  </h5>
                  <div className="space-y-2">
                    {(healthyUnhealthy[currentFunc.code]?.unhealthy || []).map((u, i) => (
                      <div key={i} className="p-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.12)", color: "rgba(255,255,255,0.7)" }}>
                        {u}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ExpandableSection>

            {/* Layer 5: In the Shadow */}
            <ExpandableSection
              icon={<Ghost className="w-4 h-4" />}
              title="In the Shadow"
              accentColor={currentFunc.color}
            >
              <p className="text-sm leading-relaxed pt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                {shadowManifestations[currentFunc.code] || "Shadow data not yet available."}
              </p>
            </ExpandableSection>

            {/* Layer 6: Body Connection */}
            <ExpandableSection
              icon={<Activity className="w-4 h-4" />}
              title="Body Connection (Somatic Experience)"
              accentColor={currentFunc.color}
            >
              <p className="text-sm leading-relaxed pt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                {bodyConnections[currentFunc.code] || "Body connection data not yet available."}
              </p>
            </ExpandableSection>
          </motion.div>
        ) : (
          <motion.div key="empty" {...fadeIn} className="text-center py-20">
            <Brain className="w-10 h-10 mx-auto mb-4" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="text-lg font-serif" style={{ color: "rgba(255,255,255,0.4)" }}>Select a function above to explore</p>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>Each function unfolds into six layers of understanding</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// TAB 2: FUNCTION AXES
// ============================================================

function TabFunctionAxes() {
  const [selectedAxis, setSelectedAxis] = useState<number | null>(null);
  const axis = selectedAxis !== null ? functionAxes[selectedAxis] : null;

  const axisVisuals: { gradient: string; leftColor: string; rightColor: string }[] = [
    { gradient: "from-sky-500 to-rose-500", leftColor: "#0ea5e9", rightColor: "#f43f5e" },
    { gradient: "from-violet-500 to-pink-500", leftColor: "#8b5cf6", rightColor: "#ec4899" },
    { gradient: "from-indigo-500 to-red-500", leftColor: "#6366f1", rightColor: "#ef4444" },
    { gradient: "from-amber-500 to-emerald-500", leftColor: "#f59e0b", rightColor: "#10b981" },
  ];

  return (
    <div>
      <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
        Every cognitive function exists on an axis with its opposite. These axes form the fundamental tensions within the psyche. Click an axis to explore.
      </p>

      {/* Axis selector cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {functionAxes.map((a, i) => {
          const vis = axisVisuals[i];
          const isSelected = selectedAxis === i;
          return (
            <motion.button
              key={a.axis}
              onClick={() => setSelectedAxis(isSelected ? null : i)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative p-5 rounded-2xl text-left transition-all overflow-hidden"
              style={isSelected
                ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 4px 20px rgba(139,92,246,0.1)" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }
              }
            >
              {/* Gradient bar */}
              <div className={`h-1.5 rounded-full bg-gradient-to-r ${vis.gradient} mb-4`} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm" style={{ color: vis.leftColor }}>
                    {a.functions[0]}
                  </span>
                  <ArrowLeftRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.2)" }} />
                  <span className="font-mono font-bold text-sm" style={{ color: vis.rightColor }}>
                    {a.functions[1]}
                  </span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${isSelected ? "rotate-90" : ""}`}
                  style={{ color: "rgba(255,255,255,0.25)" }}
                />
              </div>
              <p className="text-xs mt-2 line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                {funcMap[a.functions[0]]?.name} vs. {funcMap[a.functions[1]]?.name}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded axis detail */}
      <AnimatePresence mode="wait">
        {axis && selectedAxis !== null && (
          <motion.div key={axis.axis} {...fadeIn} className="space-y-4">
            <div className="p-8 rounded-3xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-mono font-bold"
                    style={{ backgroundColor: axisVisuals[selectedAxis].leftColor }}
                  >
                    {axis.functions[0]}
                  </div>
                  <div className="flex flex-col items-center">
                    <ArrowLeftRight className="w-5 h-5" style={{ color: "rgba(255,255,255,0.2)" }} />
                    <span className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>axis</span>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-mono font-bold"
                    style={{ backgroundColor: axisVisuals[selectedAxis].rightColor }}
                  >
                    {axis.functions[1]}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>{axis.axis}</h2>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {funcMap[axis.functions[0]]?.name} / {funcMap[axis.functions[1]]?.name}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>{axis.description}</p>

              {/* Tension */}
              <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
                <h4 className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5" /> The Tension
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{axis.tension}</p>
              </div>

              {/* Healthy Integration */}
              <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                <h4 className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Healthy Integration
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{axis.healthyIntegration}</p>
              </div>

              {/* Spectrum visual */}
              <div className="mb-6">
                <h4 className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Spectrum: Which Types Use This Axis
                </h4>
                <div className="relative">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${axisVisuals[selectedAxis].gradient} mb-6`}
                  />
                  <div className="flex justify-between text-[10px] -mt-4 mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                    <span className="font-mono" style={{ color: axisVisuals[selectedAxis].leftColor }}>
                      {axis.functions[0]}-dominant
                    </span>
                    <span className="font-mono" style={{ color: axisVisuals[selectedAxis].rightColor }}>
                      {axis.functions[1]}-dominant
                    </span>
                  </div>
                </div>
              </div>

              {/* Types using this axis */}
              {axisTypes[axis.axis] && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Dominant Axis Users
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {axisTypes[axis.axis].dominant.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-xs rounded-lg font-mono font-medium"
                          style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Auxiliary Axis Users
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {axisTypes[axis.axis].auxiliary.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-xs rounded-lg font-mono font-medium"
                          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.09)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedAxis === null && (
        <motion.div {...fadeIn} className="text-center py-16">
          <ArrowLeftRight className="w-10 h-10 mx-auto mb-4" style={{ color: "rgba(255,255,255,0.15)" }} />
          <p className="text-lg font-serif" style={{ color: "rgba(255,255,255,0.4)" }}>Select an axis above to explore</p>
          <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>Discover the fundamental tensions that shape cognition</p>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================
// TAB 3: THE SHADOW (Beebe's 8-Function Model)
// ============================================================

function TabShadow() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const type = selectedType ? typeMap[selectedType] : null;
  const fullStack = type ? getFullStack(type.stack) : [];

  const positionIcons = [
    <Crown key="crown" className="w-4 h-4" />,
    <Shield key="shield" className="w-4 h-4" />,
    <Baby key="baby" className="w-4 h-4" />,
    <Moon key="moon" className="w-4 h-4" />,
    <Swords key="swords" className="w-4 h-4" />,
    <Skull key="skull" className="w-4 h-4" />,
    <Wand2 key="wand" className="w-4 h-4" />,
    <Flame key="flame" className="w-4 h-4" />,
  ];

  return (
    <div>
      <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
        John Beebe extended Jung&apos;s model to show that every person uses all 8 cognitive functions. The first four form the conscious &ldquo;ego&rdquo; stack; the second four form the unconscious &ldquo;shadow.&rdquo; Each position carries an archetypal energy.
      </p>

      {/* Type selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {mbtiTypes.map((t) => (
          <button
            key={t.code}
            onClick={() => { setSelectedType(t.code === selectedType ? null : t.code); setSelectedPosition(null); }}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all"
            style={selectedType === t.code
              ? { backgroundColor: t.color, color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid transparent" }
              : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.09)" }
            }
          >
            {t.code}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {type && fullStack.length === 8 ? (
          <motion.div key={type.code} {...fadeIn} className="space-y-4">
            {/* 8-position stack */}
            <div className="p-6 rounded-3xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <h3 className="text-lg font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.93)" }}>
                {type.code}: Full 8-Function Stack
              </h3>
              <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>Click any position to learn more</p>

              <div className="space-y-2">
                {fullStack.map((funcCode, i) => {
                  const func = funcMap[funcCode];
                  const shadow = shadowPositions[i];
                  const isShadow = i >= 4;
                  const isSelected = selectedPosition === i;

                  return (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedPosition(isSelected ? null : i)}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                      style={isSelected
                        ? { background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)" }
                        : isShadow
                        ? { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }
                      }
                    >
                      {/* Position number */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          backgroundColor: `${positionColors[i]}15`,
                          color: positionColors[i],
                        }}
                      >
                        {i + 1}
                      </div>

                      {/* Function badge */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-mono font-bold text-sm shrink-0"
                        style={{
                          backgroundColor: func?.color || "#94a3b8",
                          opacity: isShadow ? 0.7 : 1,
                        }}
                      >
                        {funcCode}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                            {func?.name || funcCode}
                          </span>
                          {isShadow && (
                            <span className="px-1.5 py-0.5 text-[9px] rounded" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
                              SHADOW
                            </span>
                          )}
                        </div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {shadow?.role || positionLabels[i]}
                        </div>
                      </div>

                      {/* Thyself icon */}
                      <span style={{ color: isSelected ? "#a78bfa" : "rgba(255,255,255,0.2)" }}>
                        {positionIcons[i]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Position detail */}
            <AnimatePresence mode="wait">
              {selectedPosition !== null && (
                <motion.div key={selectedPosition} {...fadeIn}>
                  <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span style={{ color: positionColors[selectedPosition] }}>
                        {positionIcons[selectedPosition]}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                          Position {selectedPosition + 1}: {shadowPositions[selectedPosition]?.archetype}
                        </h4>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {fullStack[selectedPosition]}: {funcMap[fullStack[selectedPosition]]?.name || fullStack[selectedPosition]}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {shadowPositions[selectedPosition]?.description}
                    </p>
                    <div className="p-3 rounded-xl" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                      <h5 className="text-xs font-medium text-violet-400 mb-1">How It Feels</h5>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {shadowPositions[selectedPosition]?.experienceDescription}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl mt-3" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}>
                      <h5 className="text-xs font-medium text-sky-400 mb-1">For {type.code}</h5>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                        As an {type.code}, your {positionLabels[selectedPosition]} function is{" "}
                        <strong className="font-mono" style={{ color: funcMap[fullStack[selectedPosition]]?.color }}>
                          {fullStack[selectedPosition]}
                        </strong>{" "}
                        ({funcMap[fullStack[selectedPosition]]?.name || fullStack[selectedPosition]}).
                        {selectedPosition < 4
                          ? " This is part of your conscious ego stack -- you have relatively good access to it."
                          : " This operates from your unconscious shadow -- it may feel alien, uncomfortable, or emerge in distorted ways."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="empty" {...fadeIn} className="text-center py-16">
            <Ghost className="w-10 h-10 mx-auto mb-4" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="text-lg font-serif" style={{ color: "rgba(255,255,255,0.4)" }}>Select a type to see its full 8-function stack</p>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>Explore the ego and shadow positions with Beebe&apos;s archetypes</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// TAB 4: LOOPS & GRIPS
// ============================================================

function TabLoopsGrips() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showSelfCheck, setShowSelfCheck] = useState(false);
  const [selfCheckAnswers, setSelfCheckAnswers] = useState<Record<number, boolean>>({});

  const loop = selectedType ? functionLoops.find((l) => l.type === selectedType) : null;
  const grip = selectedType ? gripExperiences.find((g) => g.type === selectedType) : null;
  const type = selectedType ? typeMap[selectedType] : null;

  const yesCount = Object.values(selfCheckAnswers).filter(Boolean).length;

  return (
    <div>
      <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
        Under stress, we can fall into <strong>loops</strong> (bypassing the auxiliary function) or{" "}
        <strong>grips</strong> (our inferior function erupting). Both are signals that the psyche needs rebalancing.
      </p>

      {/* Type selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {mbtiTypes.map((t) => (
          <button
            key={t.code}
            onClick={() => { setSelectedType(t.code === selectedType ? null : t.code); setSelfCheckAnswers({}); setShowSelfCheck(false); }}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all"
            style={selectedType === t.code
              ? { backgroundColor: t.color, color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid transparent" }
              : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.09)" }
            }
          >
            {t.code}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {type && (loop || grip) ? (
          <motion.div key={type.code} {...fadeIn} className="space-y-4">
            {/* Loop */}
            {loop && (
              <div className="p-6 rounded-3xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.12)" }}>
                    <RefreshCw className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                      {type.code} Loop: {loop.loop}
                    </h3>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                      When {funcMap[type.stack[1]]?.name || type.stack[1]} (auxiliary) is bypassed
                    </p>
                  </div>
                </div>

                {/* Visual: Dom -> (skip aux) -> Tertiary */}
                <div className="flex items-center justify-center gap-2 py-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-mono font-bold"
                    style={{ backgroundColor: funcMap[loop.functions[0]]?.color }}
                  >
                    {loop.functions[0]}
                  </div>
                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-5 h-5 text-amber-400" />
                    <ArrowRight className="w-5 h-5 text-amber-400 rotate-180 -mt-1" />
                  </div>
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white/30 font-mono font-bold border-2 border-dashed"
                      style={{ borderColor: funcMap[type.stack[1]]?.color || "#94a3b8", backgroundColor: `${funcMap[type.stack[1]]?.color || "#94a3b8"}20` }}
                    >
                      {type.stack[1]}
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-5 h-5 text-amber-400" />
                    <ArrowRight className="w-5 h-5 text-amber-400 rotate-180 -mt-1" />
                  </div>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-mono font-bold"
                    style={{ backgroundColor: funcMap[loop.functions[1]]?.color }}
                  >
                    {loop.functions[1]}
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>{loop.description}</p>

                {/* Signs */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-2">
                    Warning Signs
                  </h4>
                  <div className="space-y-2">
                    {loop.signs.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <h4 className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">
                    Recovery Strategy
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{loop.resolution}</p>
                </div>
              </div>
            )}

            {/* Grip */}
            {grip && (
              <div className="p-6 rounded-3xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.12)" }}>
                    <Flame className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                      {type.code} Grip: Inferior {grip.inferiorFunction} Eruption
                    </h3>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                      When {funcMap[grip.inferiorFunction]?.name || grip.inferiorFunction} takes over
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>{grip.description}</p>

                {/* Triggers */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-red-400 uppercase tracking-wider mb-2">Triggers</h4>
                  <div className="space-y-2">
                    {grip.triggers.map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <Zap className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manifestation */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    How It Manifests
                  </h4>
                  <div className="space-y-2">
                    {grip.manifestation.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.12)", color: "rgba(255,255,255,0.6)" }}>
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recovery */}
                <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <h4 className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">Recovery</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{grip.recovery}</p>
                </div>
              </div>
            )}

            {/* Self-Check */}
            <div className="p-6 rounded-3xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <button
                onClick={() => setShowSelfCheck(!showSelfCheck)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.12)" }}>
                    <HelpCircle className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>Am I in a Loop?</h3>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Quick self-check assessment</p>
                  </div>
                </div>
                <motion.div animate={{ rotate: showSelfCheck ? 90 : 0 }}>
                  <ChevronRight className="w-5 h-5" style={{ color: "rgba(255,255,255,0.25)" }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {showSelfCheck && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-3">
                      {loopSelfCheck.map((q, i) => (
                        <div key={i} className="p-4 rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)" }}>
                          <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>{q.question}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelfCheckAnswers((prev) => ({ ...prev, [i]: true }))}
                              className="px-4 py-1.5 rounded-lg text-xs font-medium transition"
                              style={selfCheckAnswers[i] === true
                                ? { background: "rgba(245,158,11,0.2)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }
                                : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.09)" }
                              }
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setSelfCheckAnswers((prev) => ({ ...prev, [i]: false }))}
                              className="px-4 py-1.5 rounded-lg text-xs font-medium transition"
                              style={selfCheckAnswers[i] === false
                                ? { background: "rgba(16,185,129,0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }
                                : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.09)" }
                              }
                            >
                              No
                            </button>
                          </div>
                          {selfCheckAnswers[i] === true && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs mt-2 p-2 rounded-lg"
                              style={{ color: "#fbbf24", background: "rgba(245,158,11,0.1)" }}
                            >
                              {q.ifYes}
                            </motion.p>
                          )}
                        </div>
                      ))}

                      {/* Summary */}
                      {Object.keys(selfCheckAnswers).length === loopSelfCheck.length && (
                        <motion.div {...fadeIn} className="p-4 rounded-xl" style={{ border: "1px solid rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.08)" }}>
                          <h5 className="text-sm font-medium text-violet-400 mb-2">Assessment</h5>
                          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                            {yesCount === 0 && "You appear to be in a balanced cognitive state. Your auxiliary function seems to be operating healthily."}
                            {yesCount === 1 && "Mild imbalance detected. Worth paying attention to, but likely manageable with awareness."}
                            {yesCount === 2 && "Moderate imbalance. You may be entering a loop. Consider actively engaging your auxiliary function."}
                            {yesCount >= 3 && yesCount <= 4 && "Significant imbalance. You are likely in a cognitive loop. Actively re-engage your auxiliary function and seek outside perspective."}
                            {yesCount >= 5 && "Strong indicators of a loop or grip state. This is a signal to pause, seek support, and deliberately engage the functions you've been bypassing."}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : selectedType && !loop && !grip ? (
          <motion.div key="no-data" {...fadeIn} className="text-center py-16">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Loop and grip data for {selectedType} is not yet in the database.</p>
          </motion.div>
        ) : (
          <motion.div key="empty" {...fadeIn} className="text-center py-16">
            <RefreshCw className="w-10 h-10 mx-auto mb-4" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="text-lg font-serif" style={{ color: "rgba(255,255,255,0.4)" }}>Select a type to explore loops and grips</p>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>Understand what happens when cognitive balance breaks down</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// TAB 5: 16 TYPES (Deep Profile)
// ============================================================

function Tab16Types() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const type = selectedType ? typeMap[selectedType] : null;
  const fullStack = type ? getFullStack(type.stack) : [];

  // Auto-select user's type from profile
  const [myType, setMyType] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const p = JSON.parse(raw);
        const code = p.cognitiveType ?? p.mbtiType;
        if (code && typeMap[code]) {
          setMyType(code);
          if (!selectedType) setSelectedType(code);
        }
      }
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Group types by temperament
  const temperamentGroups = [
    { label: "NT Rationals", codes: ["INTJ", "INTP", "ENTJ", "ENTP"], color: "#6366f1" },
    { label: "NF Idealists", codes: ["INFJ", "INFP", "ENFJ", "ENFP"], color: "#ec4899" },
    { label: "SJ Guardians", codes: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"], color: "#10b981" },
    { label: "SP Artisans", codes: ["ISTP", "ISFP", "ESTP", "ESFP"], color: "#f59e0b" },
  ];

  return (
    <div>
      {/* Type Grid by Temperament */}
      <div className="space-y-4 mb-8">
        {temperamentGroups.map((group) => (
          <div key={group.label}>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-2 pl-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              {group.label}
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {group.codes.map((code) => {
                const t = typeMap[code];
                if (!t) return null;
                const isSelected = selectedType === code;
                const isMyType = myType === code;
                return (
                  <div key={code} className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => setSelectedType(isSelected ? null : code)}
                      className="w-full p-3 rounded-xl text-center transition-all"
                      style={
                        isSelected
                          ? { backgroundColor: t.color, color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid transparent" }
                          : isMyType
                          ? { background: "rgba(255,255,255,0.08)", border: `2px solid ${t.color}`, boxShadow: `0 0 0 1px ${t.color}22` }
                          : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }
                      }
                    >
                      <div className="font-mono font-bold text-sm">{code}</div>
                      <div className="text-[10px] mt-0.5" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" }}>
                        {t.name}
                      </div>
                    </button>
                    {isMyType && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: t.color }}>
                        My Type
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Deep type profile */}
      <AnimatePresence mode="wait">
        {type ? (
          <motion.div key={type.code} {...fadeIn} className="space-y-4">
            {/* Header */}
            <div className="p-8 rounded-3xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-xl shrink-0"
                  style={{ backgroundColor: type.color }}
                >
                  {type.code}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>{type.name}</h2>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>{type.brief}</p>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const kTemp = getTemperamentDataForType(type.code);
                      return kTemp ? (
                        <Pill color={kTemp.color}>
                          Temperament: {kTemp.id} {kTemp.name}
                        </Pill>
                      ) : (
                        <Pill color={type.color}>
                          {interactionStyles[type.code]?.temperament || "Unknown"}
                        </Pill>
                      );
                    })()}
                    <Pill color={type.color}>
                      {interactionStyles[type.code]?.style || "Unknown"}
                    </Pill>
                  </div>
                </div>
              </div>

              {/* 8-function stack visualization */}
              <h4 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                Complete 8-Function Stack
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
                {fullStack.map((funcCode, i) => {
                  const func = funcMap[funcCode];
                  const isShadow = i >= 4;
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-xl text-center ${isShadow ? "opacity-60" : ""}`}
                      style={{ backgroundColor: `${func?.color || "#94a3b8"}10` }}
                    >
                      <div className="text-[9px] mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{positionLabels[i]}</div>
                      <div className="font-mono font-bold text-sm" style={{ color: func?.color }}>
                        {funcCode}
                      </div>
                      <div className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {func?.name?.split(" ")[1] || ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cognitive Wiring */}
            <ExpandableSection
              icon={<Brain className="w-4 h-4" />}
              title="Cognitive Wiring"
              accentColor={type.color}
              defaultOpen
            >
              <p className="text-sm leading-relaxed pt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                {cognitiveWiring[type.code] || type.description}
              </p>
            </ExpandableSection>

            {/* Strengths & Growth */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <h4 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Strengths
                </h4>
                <div className="space-y-1.5">
                  {type.strengths.map((s) => (
                    <div key={s} className="text-sm flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <h4 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Growth Areas
                </h4>
                <div className="space-y-1.5">
                  {type.growthAreas.map((g) => (
                    <div key={g} className="text-sm flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loop & Grip */}
            {(functionLoops.some((l) => l.type === type.code) ||
              gripExperiences.some((g) => g.type === type.code)) && (
              <ExpandableSection
                icon={<RefreshCw className="w-4 h-4" />}
                title="Loop & Grip Patterns"
                accentColor={type.color}
              >
                <div className="space-y-4 pt-3">
                  {functionLoops
                    .filter((l) => l.type === type.code)
                    .map((loop) => (
                      <div key={loop.loop} className="p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
                        <h5 className="text-sm font-medium text-amber-400 mb-2">
                          Loop: {loop.loop}
                        </h5>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{loop.description}</p>
                        <div className="mt-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs text-emerald-400 font-medium mb-1">Resolution:</p>
                          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{loop.resolution}</p>
                        </div>
                      </div>
                    ))}
                  {gripExperiences
                    .filter((g) => g.type === type.code)
                    .map((grip) => (
                      <div key={grip.inferiorFunction} className="p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.12)" }}>
                        <h5 className="text-sm font-medium text-red-400 mb-2">
                          Grip: Inferior {grip.inferiorFunction}
                        </h5>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{grip.description}</p>
                        <div className="mt-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs text-emerald-400 font-medium mb-1">Recovery:</p>
                          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{grip.recovery}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </ExpandableSection>
            )}

            {/* Common Mistypes */}
            <ExpandableSection
              icon={<Users className="w-4 h-4" />}
              title="Common Mistypes"
              accentColor={type.color}
            >
              <div className="pt-3">
                <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {type.code}s are most commonly mistyped as:
                </p>
                <div className="flex flex-wrap gap-2">
                  {(commonMistypes[type.code] || []).map((mt) => {
                    const mistype = typeMap[mt];
                    return (
                      <button
                        key={mt}
                        onClick={() => setSelectedType(mt)}
                        className="px-4 py-2 rounded-xl transition text-left"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
                      >
                        <span className="font-mono font-bold text-sm" style={{ color: mistype?.color }}>
                          {mt}
                        </span>
                        <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.4)" }}>{mistype?.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </ExpandableSection>

            {/* Interaction Style & Temperament */}
            <ExpandableSection
              icon={<Orbit className="w-4 h-4" />}
              title="Interaction Style & Temperament"
              accentColor={type.color}
            >
              <div className="grid sm:grid-cols-2 gap-4 pt-3">
                <div className="p-4 rounded-xl" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  <h5 className="text-xs font-medium text-violet-400 uppercase tracking-wider mb-2">
                    Interaction Style
                  </h5>
                  <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {interactionStyles[type.code]?.style || "Unknown"}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {interactionStyles[type.code]?.style === "Chart-the-Course" &&
                      "Focused, deliberate, patient. Works toward a defined outcome with a planned approach."}
                    {interactionStyles[type.code]?.style === "Behind-the-Scenes" &&
                      "Patient, accommodating, integrating. Prefers to support and refine rather than direct."}
                    {interactionStyles[type.code]?.style === "In-Charge" &&
                      "Direct, decisive, results-oriented. Takes command and drives toward outcomes."}
                    {interactionStyles[type.code]?.style === "Get-Things-Going" &&
                      "Engaging, expressive, persuasive. Energizes and motivates others into action."}
                  </p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}>
                  <h5 className="text-xs font-medium text-sky-400 uppercase tracking-wider mb-2">
                    Temperament
                  </h5>
                  <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {interactionStyles[type.code]?.temperament || "Unknown"}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {interactionStyles[type.code]?.temperament === "NT Rational" &&
                      "Driven by competence, knowledge, and strategic thinking. Values logic and mastery."}
                    {interactionStyles[type.code]?.temperament === "NF Idealist" &&
                      "Driven by personal growth, authenticity, and meaningful connection. Values identity and purpose."}
                    {interactionStyles[type.code]?.temperament === "SJ Guardian" &&
                      "Driven by responsibility, stability, and belonging. Values duty and tradition."}
                    {interactionStyles[type.code]?.temperament === "SP Artisan" &&
                      "Driven by freedom, action, and making an impact. Values skill and experience."}
                  </p>
                </div>
              </div>
            </ExpandableSection>

            {/* Growth Path */}
            <ExpandableSection
              icon={<Sun className="w-4 h-4" />}
              title="Growth Path: Developing the Inferior Function"
              accentColor={type.color}
            >
              <div className="pt-3">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-mono font-bold text-sm"
                    style={{ backgroundColor: funcMap[type.stack[3]]?.color }}
                  >
                    {type.stack[3]}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                      Inferior: {funcMap[type.stack[3]]?.name || type.stack[3]}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Your greatest vulnerability and growth edge</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {inferiorGrowth[type.code] || "Growth path data not yet available."}
                </p>
              </div>
            </ExpandableSection>

            {/* Journal Prompts */}
            <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <h4 className="text-sm font-medium text-sky-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Journal Prompts
              </h4>
              <div className="space-y-2">
                {type.journalPrompts.map((p, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl text-sm italic"
                    style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.12)", color: "rgba(255,255,255,0.6)" }}
                  >
                    &ldquo;{p}&rdquo;
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="empty" {...fadeIn} className="text-center py-16">
            <Users className="w-10 h-10 mx-auto mb-4" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="text-lg font-serif" style={{ color: "rgba(255,255,255,0.4)" }}>Select a type to explore</p>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>Deep profiles with full cognitive stacks, loops, grips, and growth paths</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// TAB: KEIRSEY TEMPERAMENTS
// ============================================================

function TabKeirsey() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { profile } = useProfile();
  const userCode = profile.cognitiveType ?? profile.mbtiType;
  const userTemperament = userCode ? getTemperamentDataForType(userCode) : null;

  return (
    <div>
      {/* Intro */}
      <div className="p-5 rounded-2xl mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <h3 className="text-base font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
          Keirsey&apos;s Four Temperaments
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          David Keirsey reorganized Jung&apos;s 16 types into four temperaments based on patterns of need,
          value, and self-image that remain stable across a person&apos;s entire life. Where MBTI focuses on
          cognitive preferences, Keirsey focused on behavioral patterns and core drives. His two foundational
          books. <em>Please Understand Me</em> (1978) and <em>Please Understand Me II</em> (1998). are among
          the most widely read works in personality psychology.
        </p>
        {userTemperament && (
          <div className="mt-3 px-3 py-2 rounded-xl inline-flex items-center gap-2 text-xs font-semibold"
            style={{ background: userTemperament.bg, border: `1px solid ${userTemperament.border}`, color: userTemperament.color }}>
            Your temperament: {userTemperament.id} {userTemperament.name}
          </div>
        )}
      </div>

      {/* Temperament Cards */}
      <div className="space-y-4">
        {keirseyTemperaments.map((temp) => {
          const isOpen = expanded === temp.id;
          const isMyTemp = userTemperament?.id === temp.id;
          return (
            <div
              key={temp.id}
              className="rounded-2xl overflow-hidden transition-all"
              style={isMyTemp
                ? { background: temp.bg, border: `1.5px solid ${temp.border}` }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Header */}
              <button
                onClick={() => setExpanded(isOpen ? null : temp.id)}
                className="w-full p-5 flex items-center justify-between transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: temp.bg, color: temp.color, border: `1px solid ${temp.border}` }}>
                    {temp.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                        {temp.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: temp.bg, color: temp.color }}>
                        {temp.subtitle}
                      </span>
                      {isMyTemp && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white"
                          style={{ backgroundColor: temp.color }}>
                          Your Temperament
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {temp.types.map((t) => (
                        <span key={t} className="text-xs font-mono px-1.5 py-0.5 rounded font-medium"
                          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      {/* Core needs */}
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Core Need
                          </p>
                          <p className="text-xs" style={{ color: temp.color }}>{temp.coreNeed}</p>
                        </div>
                        <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Core Value
                          </p>
                          <p className="text-xs" style={{ color: temp.color }}>{temp.coreValue}</p>
                        </div>
                        <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Self-Image
                          </p>
                          <p className="text-xs" style={{ color: temp.color }}>{temp.coreFeeling}</p>
                        </div>
                      </div>

                      {/* Full description */}
                      <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                          {temp.description}
                        </p>
                      </div>

                      {/* Enneagram correlations */}
                      <div className="p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: "#a78bfa" }}>
                          Enneagram Correlations
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {temp.enneagramCorrelations}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Attribution */}
      <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          Based on David Keirsey&apos;s <em>Please Understand Me</em> (1978) and <em>Please Understand Me II</em> (1998).
          Temperament correlations with Enneagram are observational patterns, not empirical findings.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

const tabs = [
  { id: "functions" as const, label: "The 8 Functions", icon: <Brain className="w-4 h-4" /> },
  { id: "axes" as const, label: "Function Axes", icon: <ArrowLeftRight className="w-4 h-4" /> },
  { id: "shadow" as const, label: "The Shadow", icon: <Ghost className="w-4 h-4" /> },
  { id: "loops" as const, label: "Loops & Grips", icon: <RefreshCw className="w-4 h-4" /> },
  { id: "types" as const, label: "16 Types", icon: <Users className="w-4 h-4" /> },
  { id: "keirsey" as const, label: "Temperaments", icon: <GraduationCap className="w-4 h-4" /> },
];

type TabId = (typeof tabs)[number]["id"];

function CognitiveLearnContent() {
  const searchParams = useSearchParams();
  const funcParam = searchParams.get("func");
  const typeParam = searchParams.get("type");

  const [activeTab, setActiveTab] = useState<TabId>(
    typeParam ? "types" : funcParam ? "functions" : "functions"
  );

  // Mark "Cognitive Intro" as complete when this page is visited
  useEffect(() => {
    markTopicComplete("cognitive-intro");
  }, []);

  // All tabs visible for everyone
  const visibleTabs = tabs;

  return (
    <div className="min-h-screen py-12" style={{ background: "#0f0a1e" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
            Learn Cognitive Functions
          </h1>
          <p className="max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
            Discover the 8 mental tools we all use to think and make decisions, and which ones come most naturally to you.
          </p>

          {/* Intro card */}
          <div className="mt-4 p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(14,165,233,0.08))", border: "1px solid rgba(139,92,246,0.2)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>What are cognitive functions?</h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
              Carl Jung identified 8 mental processes, ways the mind perceives information and makes decisions. Everyone uses all 8, but in a specific order. Your top 4 are your &ldquo;ego stack&rdquo; and shape how you naturally think, communicate, and process the world.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
                <span className="font-medium text-violet-400">Perceiving (P):</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}> How you take in info</span>
                <div className="mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Ni · Ne · Si · Se</div>
              </div>
              <div className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
                <span className="font-medium text-sky-400">Judging (J):</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}> How you make decisions</span>
                <div className="mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Ti · Te · Fi · Fe</div>
              </div>
            </div>
          </div>

          {/* Jungian Typology Disclaimer */}
          <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              <strong>A note on typology:</strong> This system is based on Carl Jung&apos;s original <em>Psychological Types</em> (1921), not the commercial MBTI&reg; instrument.
              The 16 type codes (INTJ, ENFP, etc.) are used as convenient shorthand for cognitive function stacks. What matters is the functions themselves.
              16Personalities is <em>not</em> the same as Jungian typology.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-1 p-1 rounded-xl w-fit min-w-fit" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap"
                style={activeTab === tab.id
                  ? { background: "rgba(139,92,246,0.25)", color: "rgba(255,255,255,0.93)" }
                  : { color: "rgba(255,255,255,0.5)" }
                }
              >
                <span style={{ color: activeTab === tab.id ? "#a78bfa" : "rgba(255,255,255,0.35)" }}>
                  {tab.icon}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ").pop()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div key={activeTab}>
            {activeTab === "functions" && <Tab8Functions />}
            {activeTab === "axes" && <TabFunctionAxes />}
            {activeTab === "shadow" && <TabShadow />}
            {activeTab === "loops" && <TabLoopsGrips />}
            {activeTab === "types" && <Tab16Types />}
            {activeTab === "keirsey" && <TabKeirsey />}
        </div>

        {/* Next Step Banner */}
        <NextStepBanner
          href="/cognitive/assess"
          label="Take the cognitive assessment"
          sublabel="Find your cognitive function stack, dominant, auxiliary, shadow, and more"
          icon={<Brain className="w-5 h-5" />}
          color="#6366f1"
          dismissKey="cognitive-learn-assess"
        />
      </div>
    </div>
  );
}

export default function CognitiveLearnPage() {
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
          <div style={{ color: "rgba(255,255,255,0.35)" }}>Loading...</div>
        </div>
      }
    >
      <CognitiveLearnContent />
    </Suspense>
  );
}
