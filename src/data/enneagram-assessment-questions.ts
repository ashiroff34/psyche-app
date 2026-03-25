// ─────────────────────────────────────────────────────────────────────────────
// Enneagram Assessment Questions
//
// Methodology: iEQ9 (Integrative Enneagram Questionnaire) by Dirk Coupé —
// used in clinical and organizational settings with published validity studies.
// Also draws from Wagner Enneagram Personality Style Scales (WEPSS) by Jerome
// Wagner PhD, and David Daniels & Virginia Price's Essential Enneagram
// (tested for reliability).
//
// Key methodological principles:
// - 5-point Likert agreement scale (iEQ9 format)
// - Questions target core motivation and fear, NOT surface behavior
// - WEPSS cross-validation: both integrated (healthy) and disintegrated
//   (stressed) expressions of each type are included
// - Instinct/variant questions (SP, SO, SX) appended to identify dominant
//   instinct, as measured by the iEQ9
// - Results report top 2 types as "likely matches" per iEQ9 reporting norms
//
// Format: 5-point Likert scale (1 = Not me at all, 5 = Very much me)
// Standard set: 36 questions (4 per type) + 9 instinct questions
// Deep set: 144 questions (16 per type) + 9 instinct questions
// ─────────────────────────────────────────────────────────────────────────────

export interface LikertQuestion {
  id: number;
  text: string;
  type: number; // Enneagram type 1-9
  depth: "standard" | "deep"; // which set it belongs to
}

// ── STANDARD SET: 36 questions, 4 per type ───────────────────────────────────
// Questions target core motivation and fear (iEQ9 methodology), not surface
// behavior. Each question discriminates its type specifically — it should feel
// like a YES for that type and a NOT ME for most others.

export const standardQuestions: LikertQuestion[] = [
  // TYPE 1 — The Reformer
  // Core fear: being bad, wrong, corrupt, or defective
  // Core motivation: to be right, good, ethical, to have integrity
  // Discriminating probe: inner critic voice, sense of wrongness/imperfection,
  //   resentment at disorder, difficulty relaxing until things are "right"
  { id: 101, type: 1, depth: "standard", text: "There is a voice inside me that tells me things are not yet right — and it is rarely fully satisfied, even when others think everything is fine." },
  { id: 102, type: 1, depth: "standard", text: "I feel an inner compulsion to improve, correct, or do things properly — not because I want to, but because I feel I must." },
  { id: 103, type: 1, depth: "standard", text: "Being seen as a good and ethical person matters to me at a core level — the thought of being considered corrupt or dishonest is deeply disturbing." },
  { id: 104, type: 1, depth: "standard", text: "I suppress my own impulses or desires when they feel wrong — and feel guilty when I act on them anyway." },

  // TYPE 2 — The Helper
  // Core fear: being unwanted, unloved, unworthy of love
  // Core motivation: to feel loved, to be needed, to earn love through giving
  // Discriminating probe: pride in giving, difficulty acknowledging own needs,
  //   worth tied to being needed, hidden resentment when unappreciated
  { id: 201, type: 2, depth: "standard", text: "Deep down, I fear that if I stopped being so giving and attentive, people would not want me around." },
  { id: 202, type: 2, depth: "standard", text: "I find it far easier to know what others need than to know what I myself need or want." },
  { id: 203, type: 2, depth: "standard", text: "My sense of worth is tied to feeling needed — when no one needs me, I feel hollow and unsure of my value." },
  { id: 204, type: 2, depth: "standard", text: "I feel a quiet, unexpressed hurt when I give a great deal to people and they do not acknowledge or appreciate it." },

  // TYPE 3 — The Achiever
  // Core fear: being worthless, a failure, having no value
  // Core motivation: to be valuable, admired, successful; to achieve and be recognized
  // Discriminating probe: shape-shifting identity, worth tied to achievement,
  //   difficulty knowing own feelings vs performed feelings, efficiency obsession
  { id: 301, type: 3, depth: "standard", text: "I adjust who I am — my energy, style, and personality — depending on the audience I am with, almost without thinking." },
  { id: 302, type: 3, depth: "standard", text: "When I slow down enough to check in with myself, I sometimes cannot tell whether what I feel is real or whether I am performing a feeling." },
  { id: 303, type: 3, depth: "standard", text: "My sense of worth is tied to what I accomplish — when I fail or look incompetent, it threatens something at my core." },
  { id: 304, type: 3, depth: "standard", text: "I am driven by efficiency: I instinctively cut to what works, set aside what is emotionally messy, and focus on results." },

  // TYPE 4 — The Individualist
  // Core fear: having no identity, no personal significance, being ordinary
  // Core motivation: to find self and significance, to be authentic, to create identity
  // Discriminating probe: something fundamentally missing, longing/melancholy as more
  //   real than happiness, envy of what others have naturally, feeling fundamentally different
  { id: 401, type: 4, depth: "standard", text: "I carry a persistent feeling that something essential is missing in me that other people seem to have naturally — a kind of completeness I cannot quite reach." },
  { id: 402, type: 4, depth: "standard", text: "Longing, melancholy, or aching beauty often feel more real and alive to me than simple happiness or contentment." },
  { id: 403, type: 4, depth: "standard", text: "I envy qualities or experiences in others that feel out of reach for me — not envious in a petty way, but with a deep ache of wanting." },
  { id: 404, type: 4, depth: "standard", text: "Feeling ordinary, generic, or like everyone else is one of my deeper fears — I need to know I am meaningfully distinct and irreplaceable." },

  // TYPE 5 — The Investigator
  // Core fear: being useless, incapable, overwhelmed, depleted
  // Core motivation: to be capable, competent, knowledgeable; to have enough resources
  // Discriminating probe: energy protection/withdrawal, observation before participation,
  //   compartmentalization, discomfort with emotional demands, hoarding knowledge/time
  { id: 501, type: 5, depth: "standard", text: "I guard my time and energy carefully — being around people, even people I like, often depletes me, and I need time alone to restore." },
  { id: 502, type: 5, depth: "standard", text: "I minimize my own needs so that I do not have to depend on others or expose how much I actually require from the world." },
  { id: 503, type: 5, depth: "standard", text: "I feel I must fully understand something before I can feel confident enough to act on it or speak about it publicly." },
  { id: 504, type: 5, depth: "standard", text: "Having unexpected demands placed on me — especially emotional ones — feels genuinely distressing, like an intrusion I was not prepared for." },

  // TYPE 6 — The Loyalist
  // Core fear: being without support, guidance, or security
  // Core motivation: to have security, support, certainty; to feel safe in an uncertain world
  // Discriminating probe: mental rehearsal of worst cases, testing trustworthiness,
  //   second-guessing own decisions, ambivalence toward authority
  { id: 601, type: 6, depth: "standard", text: "I mentally rehearse worst-case scenarios not out of pessimism but because thinking through what could go wrong makes me feel safer and more prepared." },
  { id: 602, type: 6, depth: "standard", text: "I test people's reliability and trustworthiness — sometimes through small tests — before I feel safe enough to fully trust them." },
  { id: 603, type: 6, depth: "standard", text: "I second-guess my own decisions and often seek outside perspective or reassurance before I feel confident in my choice." },
  { id: 604, type: 6, depth: "standard", text: "I have a complicated relationship with authority: part of me wants its guidance and security, while another part distrusts it and wants to push back." },

  // TYPE 7 — The Enthusiast
  // Core fear: being trapped in pain, deprivation, or limitation
  // Core motivation: to be satisfied, happy, free; to maintain positive experience
  // Discriminating probe: reframing pain as opportunity, keeping options open,
  //   future-orientation, difficulty staying with discomfort, rationalizing escape
  { id: 701, type: 7, depth: "standard", text: "When something painful or uncomfortable arises, I instinctively reframe it, find the silver lining, or redirect my attention toward something more stimulating." },
  { id: 702, type: 7, depth: "standard", text: "I keep my options open — committing fully to one path is difficult because it means closing off other possibilities that might be better." },
  { id: 703, type: 7, depth: "standard", text: "Underneath my energy and enthusiasm, there is sometimes a fear of being trapped in something painful, boring, or depriving with no way out." },
  { id: 704, type: 7, depth: "standard", text: "My anxiety shows up as restlessness and the urge to plan, move, and generate new possibilities — not as dread or worry." },

  // TYPE 8 — The Challenger
  // Core fear: being controlled, manipulated, or harmed by others
  // Core motivation: to be self-reliant, in control, to protect oneself and those one cares for
  // Discriminating probe: direct confrontation preference, discomfort with vulnerability,
  //   respect only for those who stand ground, instinct to dominate or take charge
  { id: 801, type: 8, depth: "standard", text: "Being controlled, manipulated, or deceived is one of my deepest aversions — I would rather have a direct confrontation than let dishonesty or weakness slide." },
  { id: 802, type: 8, depth: "standard", text: "I show my tenderness and vulnerability only to people I trust completely — and even then it is difficult to let them see that side of me." },
  { id: 803, type: 8, depth: "standard", text: "I instinctively move toward control and leadership in unclear situations — not because I need the title, but because I cannot stand the drift." },
  { id: 804, type: 8, depth: "standard", text: "I only truly respect people who stand their ground with me — those who back down or try to please me lose my respect quickly." },

  // TYPE 9 — The Peacemaker
  // Core fear: loss of connection, fragmentation, conflict destroying harmony
  // Core motivation: peace, harmony, avoiding conflict, maintaining inner and outer stability
  // Discriminating probe: losing track of own priorities, merging with others' agendas,
  //   conflict avoidance even when self-destructive, forgetting own desires
  { id: 901, type: 9, depth: "standard", text: "I lose track of what I myself want — my preferences seem to dissolve when I am around others, and I end up going along with their agenda." },
  { id: 902, type: 9, depth: "standard", text: "Avoiding disruption and maintaining peace feels almost like a survival instinct — conflict, even necessary conflict, creates a kind of inner alarm." },
  { id: 903, type: 9, depth: "standard", text: "I sometimes realize afterward that I agreed to something I did not actually want, simply to keep the peace in the moment." },
  { id: 904, type: 9, depth: "standard", text: "I experience a comfortable numbness or pleasant disengagement when difficulty arises — it is easier to drift into routine than to confront what is wrong." },
];

// ── INSTINCT / VARIANT QUESTIONS ─────────────────────────────────────────────
// Based on iEQ9 instinct subscale methodology.
// Three instincts: Self-Preservation (SP), Social (SO), Sexual/One-to-One (SX)
// 3 questions per instinct = 9 total
// Note: IDs use 9xxx range to avoid collision with deep question IDs

export interface InstinctQuestion {
  id: number;
  instinct: "SP" | "SO" | "SX";
  text: string;
}

export const instinctQuestions: InstinctQuestion[] = [
  // Self-Preservation (SP) — attention goes to physical security, resources, health,
  // comfort, and maintaining routines. Worries most about: having enough, staying healthy,
  // practical stability.
  { id: 9001, instinct: "SP", text: "My attention naturally goes to practical concerns — food, health, finances, safety, warmth — in a way that feels more urgent and primary than it seems to for most people." },
  { id: 9002, instinct: "SP", text: "When I am stressed or unsettled, I instinctively return to routines, creature comforts, and tending to my physical needs before addressing anything social or relational." },
  { id: 9003, instinct: "SP", text: "I feel a low-level anxiety about having enough — enough money, enough security, enough resources — and this concern shapes many of my decisions." },

  // Social (SO) — attention goes to belonging, group dynamics, roles, social standing,
  // and collective meaning. Worries most about: where I fit, my contribution to the group,
  // being included or excluded.
  { id: 9004, instinct: "SO", text: "I am acutely aware of group dynamics — where I stand, who has influence, who is in or out, and whether I belong — in a way that feels constant and important." },
  { id: 9005, instinct: "SO", text: "Participating in communities, movements, or shared causes gives me a sense of meaning and place that I do not find as easily in one-on-one connection or solitude." },
  { id: 9006, instinct: "SO", text: "I am highly aware of social rules, hierarchies, and the unspoken expectations of groups — adapting to them feels natural and important for my sense of security." },

  // Sexual / One-to-One (SX) — attention goes to intensity, merger with select others,
  // magnetic attraction, and aliveness. Worries most about: depth of connection, missing
  // intensity, being fully alive.
  { id: 9007, instinct: "SX", text: "I crave intense, deep one-to-one connection more than wide social circles or material security — a bond that feels total and magnetic is what I am most drawn to." },
  { id: 9008, instinct: "SX", text: "I am drawn to people, experiences, and ideas that carry a particular charge of aliveness, intensity, or magnetism — ordinary pleasantness does not hold my attention for long." },
  { id: 9009, instinct: "SX", text: "My energy and attention focus intensely on whatever person or project has captured me — everything else fades into the background." },
];

// ── DEEP SET: 144 questions, 16 per type ─────────────────────────────────────
// Covers core motivation, fear, passion (Naranjo), fixation, integration,
// and disintegration patterns (WEPSS). Questions probe wings, integration/
// disintegration dynamics, and subtype expressions.
// All questions are motivation-based per iEQ9 principles — they target WHY,
// not WHAT. Note: Type 5 deep IDs use 50xx range to avoid collision with
// instinct question IDs (90xx).

export const deepQuestions: LikertQuestion[] = [
  // ── TYPE 1 — The Reformer (16 questions) ──────────────────────────────────
  // Probes: inner critic, resentment at imperfection, suppressed anger,
  //   integrity fixation, integration to 7, disintegration to 4,
  //   wing toward 9 (idealistic) vs wing toward 2 (crusading)
  { id: 1001, type: 1, depth: "deep", text: "I carry an internal judge that evaluates almost everything — my actions, others' actions, the state of the world — and the verdict is rarely fully satisfactory." },
  { id: 1002, type: 1, depth: "deep", text: "I feel a persistent low-grade frustration about the gap between how things are and how they ought to be — and I feel responsible for closing that gap." },
  { id: 1003, type: 1, depth: "deep", text: "I have difficulty relaxing into the present moment when I know something is unfinished, wrong, or not yet done properly." },
  { id: 1004, type: 1, depth: "deep", text: "I hold myself to higher standards than I hold most other people — and feel resentful when others do not seem to try as hard as I do." },
  { id: 1005, type: 1, depth: "deep", text: "There is anger inside me that I rarely express directly — instead it becomes tightness, criticism, or quiet withdrawal when things are wrong." },
  { id: 1006, type: 1, depth: "deep", text: "I genuinely feel responsible for upholding standards that I believe others are neglecting — it is not just preference, it feels like moral duty." },
  { id: 1007, type: 1, depth: "deep", text: "When I make a mistake, I replay it in detail, dissecting what I should have done differently — self-forgiveness does not come naturally." },
  { id: 1008, type: 1, depth: "deep", text: "Under significant stress, I can become moody, withdrawn, or prone to sudden emotional pain — a surprising depth of feeling breaks through my usual control." },
  { id: 1009, type: 1, depth: "deep", text: "When I am growing and healthy, I find myself relaxing my grip on 'the right way' — I become lighter, more spontaneous, and more genuinely joyful." },
  { id: 1010, type: 1, depth: "deep", text: "I suppress impulses that feel wrong or self-indulgent, replacing them with what I believe I should be doing — and feel guilty when the impulse wins." },
  { id: 1011, type: 1, depth: "deep", text: "I believe the world would be significantly better if people simply tried harder, did things correctly, and took their ethical responsibilities seriously." },
  { id: 1012, type: 1, depth: "deep", text: "I struggle to enjoy something I know has an obvious flaw — the flaw distracts me from what is good." },
  { id: 1013, type: 1, depth: "deep", text: "I can become rigid, rule-bound, and inflexible under stress, even when flexibility would clearly serve me better." },
  { id: 1014, type: 1, depth: "deep", text: "I am more comfortable with warmth and personal connection than most people expect from someone with my high standards — the idealism coexists with genuine care." },
  { id: 1015, type: 1, depth: "deep", text: "The thought of being seen as dishonest, corrupt, or irresponsible troubles me at a level that other people's negative opinions do not." },
  { id: 1016, type: 1, depth: "deep", text: "My inner voice is more critical than encouraging — it notices what is wrong before it acknowledges what is right." },

  // ── TYPE 2 — The Helper (16 questions) ────────────────────────────────────
  // Probes: pride in giving, hidden manipulation through helpfulness, resentment
  //   when unappreciated, integration to 4, disintegration to 8,
  //   wing toward 1 (principled helper) vs wing toward 3 (image-conscious helper)
  { id: 2001, type: 2, depth: "deep", text: "I take genuine pride in knowing what people need and providing it — it gives me a sense of value and specialness to be the one who truly understands." },
  { id: 2002, type: 2, depth: "deep", text: "I feel most valuable and secure when I am actively needed by someone I care about — when no one needs me, I feel uncertain of my worth." },
  { id: 2003, type: 2, depth: "deep", text: "I have difficulty asking for help or admitting need — it is much easier, and feels safer, to be the one who gives." },
  { id: 2004, type: 2, depth: "deep", text: "I sometimes give to others as a way of managing my own loneliness or need for connection — the giving fills a space in me, not just in them." },
  { id: 2005, type: 2, depth: "deep", text: "I can feel deeply hurt, even betrayed, when I give a great deal and receive little acknowledgment in return — though I rarely say this directly." },
  { id: 2006, type: 2, depth: "deep", text: "I adjust my behavior to match what each person needs from me — sometimes so thoroughly that I lose my own sense of what I want." },
  { id: 2007, type: 2, depth: "deep", text: "I feel guilty when I prioritize my own needs over someone who needs something from me — even when my own needs are legitimate." },
  { id: 2008, type: 2, depth: "deep", text: "Under sustained frustration, I can become demanding, confrontational, and insistent in a way that surprises people who know me as only warm and giving." },
  { id: 2009, type: 2, depth: "deep", text: "When I am growing and healthy, I can give without needing to be needed — and I start accessing my own emotional depth and creative inner life more fully." },
  { id: 2010, type: 2, depth: "deep", text: "I am good at making people feel special, seen, and cared for — this comes naturally and is something I genuinely enjoy doing." },
  { id: 2011, type: 2, depth: "deep", text: "I sometimes use giving as a subtle way of creating obligation — a way of ensuring that people stay connected to me." },
  { id: 2012, type: 2, depth: "deep", text: "I am more comfortable sitting with other people's difficult emotions than with my own — my feelings often stay unexamined beneath my attention to others." },
  { id: 2013, type: 2, depth: "deep", text: "I fear that people only want me for what I do for them — and that if I stopped giving, they would leave." },
  { id: 2014, type: 2, depth: "deep", text: "I struggle to believe that I am loved simply for who I am, apart from what I provide or contribute." },
  { id: 2015, type: 2, depth: "deep", text: "I hold myself to a high standard of goodness and generosity — and feel ashamed when I act out of self-interest." },
  { id: 2016, type: 2, depth: "deep", text: "I have strong intuitions about people's emotional states — often knowing what someone feels before they have said anything." },

  // ── TYPE 3 — The Achiever (16 questions) ──────────────────────────────────
  // Probes: identity-performance merger, suppressed feelings for efficiency,
  //   fear of failure/exposure, integration to 6, disintegration to 9,
  //   wing toward 2 (charming achiever) vs wing toward 4 (image-sensitive achiever)
  { id: 3001, type: 3, depth: "deep", text: "I have learned to calibrate my identity to whatever the audience values most — not cynically, but almost automatically, as a kind of survival skill." },
  { id: 3002, type: 3, depth: "deep", text: "My sense of who I am is tightly bound to what I have achieved — without accomplishment, I feel an unsettling emptiness about my identity." },
  { id: 3003, type: 3, depth: "deep", text: "I am skilled at presenting myself in a way that impresses or inspires confidence — I am aware of how I land on others and I manage that impression deliberately." },
  { id: 3004, type: 3, depth: "deep", text: "I can bypass my genuine feelings and keep moving when feelings would slow me down — and I can do this so efficiently that I often do not notice I have done it." },
  { id: 3005, type: 3, depth: "deep", text: "Failure — including appearing incompetent, amateur, or ordinary — triggers something close to existential dread rather than simple disappointment." },
  { id: 3006, type: 3, depth: "deep", text: "I shape what I want and what I pursue based on what seems achievable and admirable in a given context — my desires are not always fully my own." },
  { id: 3007, type: 3, depth: "deep", text: "I am efficient and action-oriented in a way that sometimes runs past emotions, relationships, and rest — productivity can feel like the only legitimate state." },
  { id: 3008, type: 3, depth: "deep", text: "Under significant stress, I can become disengaged, unfocused, and passively resistant — going through the motions rather than truly showing up." },
  { id: 3009, type: 3, depth: "deep", text: "When I am growing and healthy, I become more genuinely cooperative, more willing to share credit, and more honest about my uncertainty and vulnerability." },
  { id: 3010, type: 3, depth: "deep", text: "There is a version of me I perform in public and a more uncertain, less polished self underneath that I rarely let people see." },
  { id: 3011, type: 3, depth: "deep", text: "I care about what others think of me more than I typically admit — not just for vanity, but because their regard feels tied to my value." },
  { id: 3012, type: 3, depth: "deep", text: "I am good at reading a room and adjusting my approach to produce the response I want — this happens quickly and almost unconsciously." },
  { id: 3013, type: 3, depth: "deep", text: "I can feel genuinely moved by beauty, depth, and the emotional complexity of things — it surprises people who see me as purely achievement-focused." },
  { id: 3014, type: 3, depth: "deep", text: "I find it difficult to truly rest without the background pressure that I should be doing something productive." },
  { id: 3015, type: 3, depth: "deep", text: "I feel most alive and real when I am working toward something meaningful and being recognized for my contribution to it." },
  { id: 3016, type: 3, depth: "deep", text: "At my core, I am not sure who I am apart from what I do — the question of identity without achievement is genuinely unsettling." },

  // ── TYPE 4 — The Individualist (16 questions) ─────────────────────────────
  // Probes: deficiency feeling, envy, pushing away then longing, identity through
  //   suffering, integration to 1, disintegration to 2,
  //   wing toward 3 (image-conscious 4) vs wing toward 5 (withdrawn 4)
  { id: 4001, type: 4, depth: "deep", text: "There is a foundational sense in me that something essential is missing — a completeness or ease that others seem to have but I can never quite locate in myself." },
  { id: 4002, type: 4, depth: "deep", text: "I am drawn to beauty, authenticity, and depth — things that carry emotional truth feel more real and valuable to me than things that are merely pleasant or comfortable." },
  { id: 4003, type: 4, depth: "deep", text: "I feel genuinely misunderstood by most people — the full complexity of what I experience and feel seems impossible to fully communicate." },
  { id: 4004, type: 4, depth: "deep", text: "Melancholy, longing, or bittersweet feeling often carry a depth that feels more honest than happiness — I sometimes distrust straightforward contentment." },
  { id: 4005, type: 4, depth: "deep", text: "I am intensely aware of my own emotional states — more aware than most people around me seem to be of theirs." },
  { id: 4006, type: 4, depth: "deep", text: "I romanticize what I do not have — the absent or unattainable person, life, or version of myself can feel more vivid and real than what is actually present." },
  { id: 4007, type: 4, depth: "deep", text: "I push people away when I feel they cannot truly see me, then feel a longing for closeness once the distance is established." },
  { id: 4008, type: 4, depth: "deep", text: "I feel an ache when I observe qualities in others that seem to come naturally to them but feel unavailable to me — a longing rather than a competitive edge." },
  { id: 4009, type: 4, depth: "deep", text: "I need to feel that my existence is meaningful and irreplaceable — being ordinary or easily replaceable is one of my deeper fears." },
  { id: 4010, type: 4, depth: "deep", text: "When I am growing and healthy, I become more grounded, disciplined, and capable of sustained effort — I can bring my inner world into form rather than just feeling it." },
  { id: 4011, type: 4, depth: "deep", text: "Under stress, I can become intrusive, emotionally demanding, or needy in ways that push people away — then feel abandoned when they go." },
  { id: 4012, type: 4, depth: "deep", text: "I can become absorbed in my internal emotional landscape for long periods — time and practical responsibilities blur when I am deep in feeling." },
  { id: 4013, type: 4, depth: "deep", text: "I have a strong aesthetic sense and feel a deep affinity for art, music, or literature that captures difficult emotional truth without resolving it neatly." },
  { id: 4014, type: 4, depth: "deep", text: "I can access and work with emotional depth and analytical rigor together — the emotional and intellectual are not separate for me." },
  { id: 4015, type: 4, depth: "deep", text: "I sometimes feel cut off from an ordinary sense of ease and happiness that other people seem to access without effort." },
  { id: 4016, type: 4, depth: "deep", text: "My identity feels most real in contrast to others — knowing how I am different from the people around me is part of how I know who I am." },

  // ── TYPE 5 — The Investigator (16 questions) ──────────────────────────────
  // Probes: energy scarcity model, pre-living in imagination, emotional
  //   detachment as protection, integration to 8, disintegration to 7,
  //   wing toward 4 (creative 5) vs wing toward 6 (dutiful 5)
  // Note: IDs in 50xx range to avoid collision with instinct question IDs (90xx)
  { id: 5001, type: 5, depth: "deep", text: "I live with an underlying sense that my energy and inner resources are limited — I cannot afford to spend them carelessly, and I track them closely." },
  { id: 5002, type: 5, depth: "deep", text: "I tend to observe and analyze a situation before I enter it — watching from a distance gives me information and a sense of control I cannot get in the middle of things." },
  { id: 5003, type: 5, depth: "deep", text: "I am careful about how much of myself I reveal — sharing feels like giving something away, and I prefer to keep a private reserve." },
  { id: 5004, type: 5, depth: "deep", text: "I feel more at home in my mind — with ideas, concepts, and systems — than in my body, my emotions, or in spontaneous social interaction." },
  { id: 5005, type: 5, depth: "deep", text: "I need to develop real competence and understanding before I feel legitimate speaking about something publicly — guessing or approximating is deeply uncomfortable." },
  { id: 5006, type: 5, depth: "deep", text: "I protect my energy by keeping social commitments minimal — even interactions I enjoy tend to cost something that I need to recover from alone." },
  { id: 5007, type: 5, depth: "deep", text: "I often pre-live experiences in imagination or thought before they happen — this gives me a sense of having had them without the cost of the actual encounter." },
  { id: 5008, type: 5, depth: "deep", text: "Social obligations and emotional demands feel draining at a level that goes beyond introversion — they threaten a scarcity of inner resources that I must protect." },
  { id: 5009, type: 5, depth: "deep", text: "I detach from my emotions during difficult situations, processing them intellectually from a distance rather than feeling them in real time." },
  { id: 5010, type: 5, depth: "deep", text: "I keep the different compartments of my life — work, relationships, interests — largely separate from one another, which gives me a sense of control and privacy." },
  { id: 5011, type: 5, depth: "deep", text: "When I am growing and healthy, I become more physically present, more willing to act decisively, and more able to engage with the world without excessive preparation." },
  { id: 5012, type: 5, depth: "deep", text: "Under stress, I can scatter into too many interests at once, becoming restless and mentally jumping from idea to idea without the usual depth or focus." },
  { id: 5013, type: 5, depth: "deep", text: "I minimize my needs partly so that the world cannot hold them over me — self-sufficiency is both a comfort and a defense." },
  { id: 5014, type: 5, depth: "deep", text: "I have areas of deep, sustained interest that I pursue with an intensity others sometimes find surprising given how private and reserved I usually appear." },
  { id: 5015, type: 5, depth: "deep", text: "Being intruded upon without warning — emotionally, physically, or socially — triggers a strong aversive reaction, almost a sense of violation." },
  { id: 5016, type: 5, depth: "deep", text: "I carry a rich emotional and aesthetic inner world that few people have access to — not because I do not have deep feeling, but because I rarely offer it unprompted." },

  // ── TYPE 6 — The Loyalist (16 questions) ──────────────────────────────────
  // Probes: ambivalence toward authority, courage through fear (counterphobic),
  //   projection of anxiety, loyalty as security strategy, integration to 9,
  //   disintegration to 3, wing toward 5 (cerebral 6) vs wing toward 7 (positive 6)
  { id: 6001, type: 6, depth: "deep", text: "I mentally rehearse worst-case scenarios not to be pessimistic but because preparation makes the uncertain feel more manageable and safe." },
  { id: 6002, type: 6, depth: "deep", text: "Before trusting someone, I test them — sometimes consciously, sometimes not — watching for inconsistency, hidden agendas, or signs they will not be there when I need them." },
  { id: 6003, type: 6, depth: "deep", text: "I second-guess my own judgments and often want to check with someone I trust before fully committing — my inner authority does not feel reliable enough." },
  { id: 6004, type: 6, depth: "deep", text: "My relationship with authority is genuinely ambivalent: part of me looks to it for security and guidance; another part questions, tests, and pushes back against it." },
  { id: 6005, type: 6, depth: "deep", text: "Once I commit to a person, group, or cause, my loyalty is deep and enduring — I take seriously the obligations that come with belonging." },
  { id: 6006, type: 6, depth: "deep", text: "I am suspicious of people who seem too smooth, too confident, or too consistently positive — I wonder what they are concealing." },
  { id: 6007, type: 6, depth: "deep", text: "I feel a persistent underlying anxiety — a background hum of wariness — even in circumstances that are objectively safe and stable." },
  { id: 6008, type: 6, depth: "deep", text: "I cope with fear by sometimes moving toward it — doing the scary thing deliberately rather than backing down — as a way of proving to myself I can handle it." },
  { id: 6009, type: 6, depth: "deep", text: "When I am growing and healthy, I feel more relaxed, present, and trusting — I stop scanning for threats and start enjoying what is actually here." },
  { id: 6010, type: 6, depth: "deep", text: "Under stress, I can become self-promotional and outwardly confident in a way that masks my inner doubt — performing competence as a defense." },
  { id: 6011, type: 6, depth: "deep", text: "I have a questioning, skeptical mind that wants to understand the reasoning behind things — I do not accept claims on authority alone." },
  { id: 6012, type: 6, depth: "deep", text: "I am drawn to people and systems that feel genuinely trustworthy and reliable — and I am careful about which of those I give my full loyalty to." },
  { id: 6013, type: 6, depth: "deep", text: "I identify with underdogs and am acutely sensitive to the misuse of power — injustice at the institutional level provokes a deep moral response in me." },
  { id: 6014, type: 6, depth: "deep", text: "I can be remarkably courageous when something I believe in is at stake — fear does not always stop me; sometimes it propels me." },
  { id: 6015, type: 6, depth: "deep", text: "I care deeply about 'my people' — the group, team, or community I have given my loyalty to — and would sacrifice for them in ways I would not for strangers." },
  { id: 6016, type: 6, depth: "deep", text: "The question of who and what I can really trust feels genuinely important to me — not an abstract concern but a lived, ongoing challenge." },

  // ── TYPE 7 — The Enthusiast (16 questions) ────────────────────────────────
  // Probes: gluttony as defense against pain, rationalization of escape,
  //   the synthetic positive re-frame, integration to 5, disintegration to 1,
  //   wing toward 6 (security-seeking 7) vs wing toward 8 (assertive 7)
  { id: 7001, type: 7, depth: "deep", text: "When I am unhappy or in pain, I instinctively seek something interesting, stimulating, or pleasurable to shift my attention — staying with the discomfort does not feel safe." },
  { id: 7002, type: 7, depth: "deep", text: "I keep many options, projects, and possibilities alive simultaneously — having a rich field of potential feels vital, and narrowing feels like loss." },
  { id: 7003, type: 7, depth: "deep", text: "I am skilled at reframing difficulty as opportunity, finding the silver lining, or spinning a frustrating situation into something more interesting — this happens almost automatically." },
  { id: 7004, type: 7, depth: "deep", text: "I experience anxiety as restlessness and the urge to plan, generate, or move — not as dread or paralysis — and it drives a constant forward momentum." },
  { id: 7005, type: 7, depth: "deep", text: "Beneath the surface of my enthusiasm and activity, there is sometimes a quiet fear that if I stopped moving, I would encounter something painful that I cannot escape." },
  { id: 7006, type: 7, depth: "deep", text: "Boredom and constraint feel almost physically intolerable — situations without options, exits, or variety create a kind of internal panic." },
  { id: 7007, type: 7, depth: "deep", text: "I am good at synthesizing ideas from multiple domains and making connections that others do not immediately see — my mind is fast, associative, and generative." },
  { id: 7008, type: 7, depth: "deep", text: "I use humor, optimism, and future-planning as ways of staying above difficult emotional realities that I do not want to descend into." },
  { id: 7009, type: 7, depth: "deep", text: "I struggle to commit fully to one path because commitment closes off other possibilities that might turn out to be better — the cost of choosing feels too high." },
  { id: 7010, type: 7, depth: "deep", text: "I tend to justify my choices through elaborate reasoning that makes constraints feel like freedoms and limitations feel like preferences — I am good at convincing myself." },
  { id: 7011, type: 7, depth: "deep", text: "When I am growing and healthy, I become more focused, more willing to sit with difficulty, and more capable of sustained depth rather than broad exploration." },
  { id: 7012, type: 7, depth: "deep", text: "Under stress, I can become perfectionistic, harsh in self-criticism, and fault-finding in a way that is totally at odds with my usual positivity." },
  { id: 7013, type: 7, depth: "deep", text: "I have started more projects than I have finished — the initial burst of enthusiasm is easier to sustain than the slow, difficult middle of anything." },
  { id: 7014, type: 7, depth: "deep", text: "I genuinely enjoy learning across many domains, not just one — intellectual variety and the pleasure of discovery feel more natural to me than deep specialization." },
  { id: 7015, type: 7, depth: "deep", text: "I am more emotionally vulnerable than my energy and positivity suggest — I just process it quickly and redirect outward before most people see it." },
  { id: 7016, type: 7, depth: "deep", text: "I can feel trapped when a situation has no clear exit or alternative — being locked in, even to something good, creates unease." },

  // ── TYPE 8 — The Challenger (16 questions) ────────────────────────────────
  // Probes: denial of vulnerability, lust for intensity/aliveness, protection
  //   of inner tenderness, integration to 2, disintegration to 5,
  //   wing toward 7 (expansive 8) vs wing toward 9 (bearlike 8)
  { id: 8001, type: 8, depth: "deep", text: "I go after what I want directly — I have little patience for indirection, manipulation, or the kind of soft maneuvering some people use to avoid confrontation." },
  { id: 8002, type: 8, depth: "deep", text: "I genuinely respect people who push back and hold their ground with me — those who back down or try to please me lose my regard quickly." },
  { id: 8003, type: 8, depth: "deep", text: "I protect a tender, vulnerable inner world behind a commanding exterior — very few people are allowed to see that softness." },
  { id: 8004, type: 8, depth: "deep", text: "I have strong, quick-forming instincts about who to trust and who not to — and these readings have proven reliable enough that I take them seriously." },
  { id: 8005, type: 8, depth: "deep", text: "I carry a strong physical and social presence — I tend to fill a room, and people take notice when I enter or assert myself." },
  { id: 8006, type: 8, depth: "deep", text: "I can see through pretense and manipulation quickly — dishonesty, weakness disguised as sweetness, and power games provoke a fast, strong reaction in me." },
  { id: 8007, type: 8, depth: "deep", text: "I naturally assume leadership or control in ambiguous situations — not for glory, but because drift, indecision, and lack of direction feel intolerable." },
  { id: 8008, type: 8, depth: "deep", text: "I am fiercely protective of the people I love — I would go to significant and unconventional lengths to defend them." },
  { id: 8009, type: 8, depth: "deep", text: "I sometimes push too hard without meaning to — my intensity, directness, and pace can overwhelm people before I have registered the impact." },
  { id: 8010, type: 8, depth: "deep", text: "Injustice — especially the powerful preying on the weak — makes me genuinely angry and compelled to act, not just theoretically bothered." },
  { id: 8011, type: 8, depth: "deep", text: "When I am growing and healthy, I become more genuinely caring, more able to show my tenderness, and more willing to support others without needing to be in charge." },
  { id: 8012, type: 8, depth: "deep", text: "Under stress, I can withdraw, become secretive, and over-accumulate resources or information as protection — a kind of hoarding against anticipated attack." },
  { id: 8013, type: 8, depth: "deep", text: "Being controlled, deceived, or manipulated is one of my deepest aversions — I would rather take a direct hit than be handled or managed." },
  { id: 8014, type: 8, depth: "deep", text: "I have a high tolerance for intensity — conflict, pressure, and high stakes do not destabilize me the way they do many people; they sharpen me." },
  { id: 8015, type: 8, depth: "deep", text: "I sometimes push people deliberately — not maliciously, but to see if they will stand their ground, which tells me whether they can be trusted and respected." },
  { id: 8016, type: 8, depth: "deep", text: "I carry a deep sense of justice — I want the world to be fair and I am willing to use my power to make it more so, even at personal cost." },

  // ── TYPE 9 — The Peacemaker (16 questions) ────────────────────────────────
  // Probes: self-forgetting, merging with others' agendas, sloth of self (not
  //   of body), anger that goes underground, integration to 3, disintegration to 6,
  //   wing toward 8 (assertive 9) vs wing toward 1 (principled 9)
  { id: 90001, type: 9, depth: "deep", text: "I can see all sides of a disagreement with equal clarity — this makes me a good mediator but a poor advocate for my own position." },
  { id: 90002, type: 9, depth: "deep", text: "When I am around strong personalities, my own preferences and priorities can simply evaporate — I merge into their world without quite meaning to." },
  { id: 90003, type: 9, depth: "deep", text: "I avoid conflict even when standing up for myself would genuinely help me — the anticipated disruption feels like a worse outcome than staying quiet." },
  { id: 90004, type: 9, depth: "deep", text: "I can be swept along by other people's agendas, plans, and needs without noticing until I am well into something I did not fully choose." },
  { id: 90005, type: 9, depth: "deep", text: "My inner peace is the thing I am most protective of — disruption, pressure, and conflict threaten something I experience as fundamental to my stability." },
  { id: 90006, type: 9, depth: "deep", text: "I struggle to feel a strong, clear sense of my own priorities and desires when I am with other people — the question of what I want can feel genuinely hard to answer." },
  { id: 90007, type: 9, depth: "deep", text: "I procrastinate on tasks that require me to assert myself, disagree, or potentially create tension — inertia is easier than the discomfort of self-assertion." },
  { id: 90008, type: 9, depth: "deep", text: "I comfort myself through small routines, simple pleasures, and familiar patterns — they create a kind of stable, reassuring baseline when life feels pressured." },
  { id: 90009, type: 9, depth: "deep", text: "I feel most comfortable and at ease when everyone in my world is getting along — conflict between people I care about feels personally destabilizing." },
  { id: 90010, type: 9, depth: "deep", text: "My anger tends to disappear underground — instead of expressing it directly, it surfaces as passive resistance, subtle withdrawal, or sudden stubborn immobility." },
  { id: 90011, type: 9, depth: "deep", text: "When I am growing and healthy, I become more purposeful, more willing to self-assert, and more able to pursue my own goals with real energy and direction." },
  { id: 90012, type: 9, depth: "deep", text: "Under stress, I can become anxious, worried, and doubting — projecting threats onto the future and seeking reassurance from people I trust." },
  { id: 90013, type: 9, depth: "deep", text: "In close relationships, I can merge with another person's worldview so completely that I temporarily lose my own perspective and preferences." },
  { id: 90014, type: 9, depth: "deep", text: "I have a strong underlying desire to feel connected to something larger — nature, community, a shared purpose — that holds me without demanding." },
  { id: 90015, type: 9, depth: "deep", text: "I am slower to get started on things than I would like, but once I find genuine momentum I can be steady and thorough in a way others admire." },
  { id: 90016, type: 9, depth: "deep", text: "The question of what I truly want — apart from what others want, apart from what would keep the peace — can feel genuinely difficult and somewhat frightening to answer." },
];

// All questions merged for convenience
export const allEnneagramQuestions = [...standardQuestions, ...deepQuestions];

// Get questions for a given assessment length
export function getAssessmentQuestions(mode: "standard" | "deep"): LikertQuestion[] {
  if (mode === "standard") return standardQuestions;
  // Deep mode: use all 144 deep questions
  return deepQuestions;
}

// Score responses and return ranked types
// Models iEQ9-style normalized scoring: average per question per type,
// then ranked. Results include top 2 types as "likely matches" per iEQ9
// reporting norms.
export function scoreEnneagramResponses(
  answers: Record<number, number>, // questionId -> 1-5 rating
  questions: LikertQuestion[]
): { type: string; score: number; percentage: number }[] {
  const typeScores: Record<number, number> = {};
  const typeCounts: Record<number, number> = {};

  for (let t = 1; t <= 9; t++) {
    typeScores[t] = 0;
    typeCounts[t] = 0;
  }

  for (const q of questions) {
    const rating = answers[q.id];
    if (rating !== undefined) {
      typeScores[q.type] += rating;
      typeCounts[q.type]++;
    }
  }

  // Normalize to average score per question for each type
  const averaged: { type: number; avg: number }[] = [];
  for (let t = 1; t <= 9; t++) {
    if (typeCounts[t] > 0) {
      averaged.push({ type: t, avg: typeScores[t] / typeCounts[t] });
    }
  }

  averaged.sort((a, b) => b.avg - a.avg);
  const maxAvg = averaged[0]?.avg || 1;

  return averaged.map((entry) => ({
    type: String(entry.type),
    score: Math.round(entry.avg * 10) / 10,
    percentage: Math.round((entry.avg / maxAvg) * 100),
  }));
}

// Score instinct/variant responses and return dominant instinct
// Returns SP, SO, or SX with averaged scores
export function scoreInstinctResponses(
  answers: Record<number, number>, // questionId -> 1-5 rating
): { instinct: "SP" | "SO" | "SX"; score: number; label: string }[] {
  const instinctScores: Record<"SP" | "SO" | "SX", number> = { SP: 0, SO: 0, SX: 0 };
  const instinctCounts: Record<"SP" | "SO" | "SX", number> = { SP: 0, SO: 0, SX: 0 };

  for (const q of instinctQuestions) {
    const rating = answers[q.id];
    if (rating !== undefined) {
      instinctScores[q.instinct] += rating;
      instinctCounts[q.instinct]++;
    }
  }

  const labels: Record<"SP" | "SO" | "SX", string> = {
    SP: "Self-Preservation",
    SO: "Social",
    SX: "Sexual / One-to-One",
  };

  const result = (["SP", "SO", "SX"] as const).map((inst) => ({
    instinct: inst,
    score: Math.round((instinctCounts[inst] > 0 ? instinctScores[inst] / instinctCounts[inst] : 0) * 10) / 10,
    label: labels[inst],
  }));

  result.sort((a, b) => b.score - a.score);
  return result;
}

// Compute confidence score: how differentiated the #1 type is from #2
// Low confidence (< 30) = recommend taking the longer version or
// considering both top types equally (per iEQ9 reporting norms)
export function computeConfidence(results: { type: string; score: number; percentage: number }[]): number {
  if (results.length < 2) return 100;
  const first = results[0].score;
  const second = results[1].score;
  if (first === 0) return 0;
  const diff = (first - second) / first;
  return Math.round(Math.min(100, diff * 250));
}

// Returns true if confidence is low enough that top 2 types should be
// shown as equal matches (per iEQ9 reporting convention)
export function shouldShowTwoTypes(confidence: number): boolean {
  return confidence < 35;
}
