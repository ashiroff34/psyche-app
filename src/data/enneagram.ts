export interface EnneagramType {
  number: number;
  name: string;
  alias: string;
  brief: string;
  description: string;
  coreMotivation: string;
  coreFear: string;
  coreDesire: string;
  // ── Ichazo / Naranjo theoretical constructs ──────────────────────────────
  // passion: the emotional excess that drives the type at the ego level (Ichazo, Arica 1970)
  // fixation: the mental habit / ego fixation (Ichazo; elaborated by Naranjo in Character & Neurosis)
  // holyIdea: the higher cognitive virtue. what the type glimpses in integration (Ichazo)
  // virtue: what emerges when the passion is transformed through self-awareness (Naranjo / Riso & Hudson)
  passion: string;
  fixation: string;
  holyIdea: string;
  virtue: string;
  // ── Riso & Hudson: defense mechanism (from The Wisdom of the Enneagram) ──
  defenseM: string;
  keyTraits: string[];
  healthyTraits: string[];
  averageTraits: string[];
  unhealthyTraits: string[];
  wings: { left: string; right: string };
  integrationLine: number;
  disintegrationLine: number;
  growthTips: string[];
  journalPrompts: string[];
  color: string;
  icon: string;
  // ── Expanded content fields ──────────────────────────────────────────────
  fullDescription?: string;
  dropdownSections?: { title: string; content: string }[];
  // ── Wing deep-dive descriptions (Riso-Hudson / Naranjo / Chestnut) ───────
  wingDescriptions?: {
    left: { name: string; description: string };
    right: { name: string; description: string };
  };
  // ── Riso-Hudson Levels of Development ────────────────────────────────────
  levels?: {
    healthy: { level: number; title: string; description: string }[];
    average: { level: number; title: string; description: string }[];
    unhealthy: { level: number; title: string; description: string }[];
  };
  // ── Riso-Hudson Horney/Harmonic groups ───────────────────────────────────
  // horneyGroup: Riso-Hudson's adaptation of Horney's social strategies
  //   compliant (Moving Toward): 1, 2, 6. earn safety through compliance/duty
  //   withdrawn (Moving Away):   4, 5, 9. manage needs by retreating inward
  //   aggressive (Moving Against): 3, 7, 8. get needs met by going after them
  horneyGroup?: 'compliant' | 'withdrawn' | 'aggressive';
  // harmonicGroup: Riso-Hudson. how the type handles conflict and disappointment
  //   positive_outlook: 2, 7, 9. suppress negative emotions, reframe positively
  //   competency:       1, 3, 5. suppress feelings, solve problems objectively
  //   reactive:         4, 6, 8. express emotions fully, need others to respond
  harmonicGroup?: 'positive_outlook' | 'competency' | 'reactive';
}

/**
 * Canonical Enneagram type color map. Import from here — do NOT redefine locally.
 * Keys are type numbers 1-9.
 */
export const TYPE_COLORS: Record<number, string> = {
  1: "#B85C38",
  2: "#C4607A",
  3: "#C9921A",
  4: "#7B5AAD",
  5: "#2980B9",
  6: "#27AE60",
  7: "#1ABC9C",
  8: "#9B2C2C",
  9: "#8B7355",
};

export const enneagramTypes: EnneagramType[] = [
  {
    number: 1,
    name: "The Reformer",
    alias: "The Perfectionist",
    brief: "Ones are driven by an unrelenting inner standard. not perfectionism for its own sake, but a bone-deep need to be good, correct, and beyond reproach. Their resentment simmers quietly beneath a composed surface, fueled by a world that perpetually falls short of what it could be.",
    description: "Ones are conscientious and ethical, with a strong sense of right and wrong. They are teachers, crusaders, and advocates for change: always striving to improve things, but afraid of making a mistake. Well-organized, orderly, and fastidious, they try to maintain high standards, but can slip into being critical and perfectionistic. They typically have problems with resentment and impatience.",
    coreMotivation: "To be right, to strive higher and improve everything, to be consistent with their ideals, to justify themselves, to be beyond criticism.",
    coreFear: "Of being corrupt, evil, or defective.",
    coreDesire: "To be good, to have integrity, to be balanced.",
    passion: "Anger (Ichazo) — manifests as chronic resentment toward what falls short (Naranjo/Riso-Hudson). A Continuous Sensitivity to the Gap Between What Is and What Could Be. an internal awareness that naturally measures the present against a standard of how things ought to be. For the 1, this isn't experienced as negativity. it's a genuine attunement to quality, integrity, and getting things right. The noticing doesn't switch off easily. (Ichazo; elaborated by Naranjo in Character & Neurosis)",
    fixation: "Attention That Automatically Notices What Needs Correcting. an involuntary orientation toward errors, imprecisions, and deviations from the right way of doing things. The 1's focus naturally goes to what could be improved. not as external judgment, but as an automatic attunement to accuracy and proper order. (Ichazo / Naranjo)",
    holyIdea: "The Recognition That What Is Here Is Already in Right Order. the higher cognitive shift in which the compulsion to correct and improve settles, and what's present is experienced as already whole and sufficient. The measuring relaxes without effort. (Ichazo)",
    virtue: "Accepting What Is Without Requiring It to Be Different. a spacious relationship with the present in which things don't need to be fixed or improved before they can be received. The internal pressure toward correction eases into serenity. (Naranjo / Riso & Hudson)",
    defenseM: "Expressing the Opposite of What Is Actually Felt Internally. unconsciously converting inner impulses that feel unacceptable into their moral opposite: the urge to do nothing becomes compulsive productivity; the urge to be selfish becomes rigid self-sacrifice. The original impulse isn't experienced. only its inversion. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Principled", "Orderly", "Self-disciplined", "Ethical", "Responsible"],
    healthyTraits: ["Wise", "Discerning", "Realistic", "Noble", "Morally heroic"],
    averageTraits: ["Orderly", "Impersonal", "Rigid", "Critical", "Judgmental"],
    unhealthyTraits: ["Intolerant", "Obsessive", "Contradictory", "Punitive", "Self-righteous"],
    wings: { left: "1w9, The Idealist", right: "1w2, The Advocate" },
    integrationLine: 7,
    disintegrationLine: 4,
    growthTips: [
      "Learn to relax and let go of the need for perfection.",
      "Practice self-compassion when you make mistakes.",
      "Channel your critical voice toward constructive feedback rather than judgment.",
      "Allow yourself to experience joy and spontaneity (integration to 7).",
      "Recognize that your inner critic is not the voice of truth."
    ],
    journalPrompts: [
      "What standard am I holding myself to right now? Is it realistic?",
      "When did I last allow myself to be imperfect without guilt?",
      "What would it look like to approach today with curiosity instead of critique?",
      "How can I show myself the same compassion I show others?",
      "What brings me genuine joy when I let go of the need to improve it?"
    ],
    color: "#B85C38",
    icon: "",
    horneyGroup: 'compliant',
    harmonicGroup: 'competency',
    fullDescription: `The One's entire psyche is organized around an internal measuring instrument that never stops running. Every experience, every action, every choice is assessed against an ideal standard. not because Ones are cold or mechanistic, but because they feel, at the most fundamental level, that something crucial is at stake in getting things right. The core motivation is moral: Ones need to be good people, to act from integrity, to be beyond reproach. This drive is experienced not as ambition but as obligation, a weight they carry everywhere.

The core fear is being corrupt, flawed, or wrong in a way they can't correct. This manifests as a relentless inner critic. a voice that catches every error, every imprecision, every gap between what is and what should be. The One often experiences this critic as an external voice rather than their own, which is part of what makes it so relentless: it doesn't feel like something they can simply choose to turn off. Resentment (Ichazo's passion for the One) builds when the world, other people, and the One themselves continually fail to meet the standard.

At their best. integrating toward Type 7. Ones access genuine joy, spontaneity, and the ability to receive life without the need to improve it first. They become the wise discerner rather than the harsh judge: principled without being rigid, ethical without being punitive. Healthy Ones have a profound capacity for moral courage, for standing up for what is right even at personal cost.

Under stress. disintegrating toward Type 4. Ones can become moody, withdrawn, and envious, comparing themselves unfavorably to others and sinking into melancholy. The inner critic turns especially harsh, and what was productive rigor becomes self-flagellation. They may feel misunderstood, special in their suffering, and resentful that their efforts aren't recognized.

In relationships, Ones are devoted, loyal, and deeply caring. but can be experienced as critical, withholding of warmth, or emotionally controlled. They love through acts of service and holding high standards, but may struggle to express tenderness spontaneously. The partner often feels they are perpetually falling short. Ones need partners who help them access self-compassion and who won't simply agree with every criticism.

Growth for Ones lies in learning serenity. the capacity to accept what is without requiring it to be different first. This is not resignation but a genuine settling of the need to correct and improve. It begins with turning the compassion they extend to others inward. When the One can hold their own imperfection with the same understanding they'd offer a friend, the inner critic begins to quiet, and something genuinely alive and spontaneous emerges in its place.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Ones typically came from environments where anger was dangerous or unacceptable. where good behavior was demanded and mistakes were treated as moral failures rather than natural learning. The child internalized the critical parent as an internal voice, believing: 'If I am not perfect, I will be judged, unloved, or punished.' They learned to police themselves before anyone else could, turning the critic inward as a pre-emptive strategy. The wound is: I am not allowed to be imperfect. I must correct myself before the world corrects me."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo identified the One's deep structure as 'anger that cannot be expressed directly.' Because expressing anger felt unacceptable. even immoral. it was transformed via reaction formation into its opposite: compulsive productivity, rigid self-discipline, and an appearance of perfect composure. The resentment that accumulates from years of suppressed anger leaks out as sarcasm, cold correctness, or sudden explosions that seem out of character. The One isn't primarily trying to improve the world. they are managing an internal state of near-constant irritation at the gap between what is and what should be, while maintaining the appearance of equanimity."
      },
      {
        title: "In Relationships",
        content: "Ones are among the most devoted and loyal partners in the Enneagram. they take commitment seriously, show up consistently, and invest deeply in making things work. The challenge is that they often express love through correction: pointing out what could be better, suggesting improvements, holding the partner to a high standard. This lands as criticism even when it's intended as care. Ones also struggle to show physical warmth spontaneously; it can feel frivolous or earned rather than freely given. Partners need to understand that underneath the composure is often deep feeling. and that the One's harshest critic is always themselves, not the partner."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 7, healthy Ones become joyful, spontaneous, and genuinely playful. qualities that can surprise people who've only seen the composed, correct version. They retain their principled clarity and ethical depth while releasing the need for things to be different before they can be enjoyed. At their healthiest, Ones are morally heroic: people who stand up for what is right not from rigidity but from genuine wisdom, who can discern with precision while extending generosity to human imperfection. The serenity they access is not passive. it is a deeply active acceptance of what is."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 4, stressed Ones become uncharacteristically moody, withdrawn, and self-pitying. The inner critic. which normally drives effort. turns into something more corrosive: a voice that says the One is fundamentally defective, not just behaviorally wrong. They may compare themselves unfavorably to others, romanticize their suffering, and feel that no one understands the burden they carry. Resentment, usually kept tightly controlled, can erupt in melodramatic ways. They may become more concerned with their own feelings than with external standards. a disorienting reversal of their usual posture."
      },
      {
        title: "The Growth Path",
        content: "The One's growth begins with one practice: noticing the inner critic without identifying with it. The voice that says 'that wasn't good enough' is not the voice of truth. it is a habituated pattern, a ghost of an old wound. Ones benefit from: (1) Body-based practices that interrupt intellectual over-control. movement, dance, anything that lets the body be imperfect and alive. (2) Practices of self-compassion. specifically the kind they would extend to a struggling friend. (3) Finding 'good enough' as a genuine resting point, not a failure of standards. (4) Learning to express anger directly and cleanly before it accumulates as resentment. The virtue Ones are growing toward is serenity. a spacious, non-reactive acceptance of what is, which paradoxically makes their genuine discernment more effective and more trustworthy."
      }
    ],
    wingDescriptions: {
      left: {
        name: "1w9, The Idealist",
        description: "The Nine wing softens the One's relentless inner critic with a quality of detachment and acceptance drawn from Nine's natural equanimity. Where the pure One is driven by urgent moral correcting, the 1w9 tends toward philosophical idealism. they hold their standards at a slight remove, making them appear calmer, more contemplative, and less reactive than their 1w2 counterpart. Naranjo observed that this wing adds introversion and a tendency toward abstract principled thinking. The 1w9 is more likely to embody their ethics quietly through personal conduct than to advocate loudly. They can seem like the composed professor or the principled hermit. deeply committed but not pushy. The shadow side is a risk of emotional withdrawal and passive-aggression: their resentment goes underground rather than expressing even as gentle correction. They may become so absorbed in an ideal vision that they lose practical contact with messy human reality. Growth calls the 1w9 to bring their inner standards into warm, relational contact rather than keeping them at philosophical arm's length."
      },
      right: {
        name: "1w2, The Advocate",
        description: "The Two wing brings the One's principled energy into interpersonal warmth and active service. Where the 1w9 is contemplative, the 1w2 is engaged, even crusading. Riso and Hudson noted that this subtype identifies strongly with being good for others: they channel their inner critic into reforming not just themselves but the people and institutions around them. The 1w2 is warmer, more emotionally expressive, and more relationally invested than the 1w9. they make excellent teachers, advocates, and community leaders because they genuinely care about the people they're trying to improve. The shadow: this wing amplifies the risk of being preachy, intrusive, or self-righteous. Because they believe they're helping, the 1w2 can impose their standards on others without recognizing it as control. Their giving can become conditional. support offered only if done the right way. Growth for the 1w2 means learning that love and improvement are not always the same thing, and that people are allowed to be imperfect without correction."
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Wise Realist", description: "At their healthiest, Ones transcend the inner critic entirely and become genuinely wise. They accept reality as it is with clear-eyed discernment and act from genuine moral clarity rather than compulsion. Their standards serve life rather than constrain it, and they inspire others by embodying what they believe." },
        { level: 2, title: "The Reasonable Person", description: "Conscientious and fair-minded, Ones at this level balance high standards with genuine self-acceptance. They hold their own imperfections with the same understanding they extend to others. The inner critic is present but not tyrannical. a helpful voice rather than a relentless judge." },
        { level: 3, title: "The Principled Teacher", description: "Orderly, responsible, and deeply ethical, these Ones channel their drive to improve into genuine service. They teach and model their values without lecturing, demonstrate consistency between belief and conduct, and experience real satisfaction working toward meaningful improvement." },
      ],
      average: [
        { level: 4, title: "The Idealistic Reformer", description: "Standards begin to feel non-negotiable rather than chosen. Ones see the world through the lens of how it should be, becoming increasingly critical of whatever falls short. They are still principled and productive, but the inner critic is gaining momentum and starting to color their relationships." },
        { level: 5, title: "The Orderly Person", description: "The need for control and order intensifies as resentment builds beneath the surface. Ones become rigid about rules and routines, suppressing their anger as inappropriate while it accumulates. They may become impersonal and hard to satisfy, holding others to standards they've never communicated." },
        { level: 6, title: "The Judgmental Perfectionist", description: "Self-righteousness sets in as Ones begin to see themselves as clearly right and others as clearly wrong. They become preachy and moralizing, finding it genuinely difficult to see validity in opposing views. Their resentment may leak out as sarcasm or cold correctness even as they maintain composure." },
      ],
      unhealthy: [
        { level: 7, title: "The Self-Righteous Critic", description: "Ones at this level condemn others with a certainty that feels entirely justified from the inside. They have split the world into the righteous and the corrupt, placing themselves firmly in the first category. Their judgment is relentless, experienced as moral clarity rather than cruelty." },
        { level: 8, title: "The Obsessive Hypocrite", description: "The gap between the One's stated values and their actual behavior widens as they impose rigid standards on others that they secretly cannot meet. Obsessive-compulsive patterns may emerge. They are capable of significant cruelty toward those they've deemed defective, blind to the same flaws in themselves." },
        { level: 9, title: "The Punitive Avenger", description: "Complete breakdown of the One's moral framework into a vehicle for punishment. They may become capable of real harm toward those they've deemed irredeemably corrupt, acting from a conviction that they are instruments of righteous correction. Their own capacity for destruction remains entirely outside their awareness." },
      ],
    },
  },
  {
    number: 2,
    name: "The Helper",
    alias: "The Giver",
    brief: "Twos orient their entire identity around being needed and loved. their giving is genuine and often extraordinary, but beneath it runs a terror of being unwanted if they showed up with needs of their own. Pride, in the Ichazo sense, means they know what others need better than they know what they themselves feel.",
    description: "Twos are empathetic, sincere, and warm-hearted. They are friendly, generous, and self-sacrificing, but can also be sentimental, flattering, and people-pleasing. They are well-meaning and driven to be close to others, but can slip into doing things for others in order to be needed. They typically have problems with possessiveness and with acknowledging their own needs.",
    coreMotivation: "To feel loved, to express their feelings for others, to be needed and appreciated.",
    coreFear: "Of being unwanted, unworthy of being loved.",
    coreDesire: "To feel loved and wanted.",
    passion: "Pride (Ichazo). Finding Identity and Meaning Through Being Needed. a deep orientation toward others in which being genuinely important to specific people is the primary way of knowing oneself. For the 2, giving and caring don't feel like performance. they feel like the most natural expression of who they are. (Ichazo; elaborated by Naranjo in Character & Neurosis)",
    fixation: "Attention That Flows Outward Toward What Others Require. a natural attunement to other people's emotional states, needs, and gaps that takes precedence over noticing one's own. The 2's inner radar is consistently oriented outward, and this feels like care, not like a sacrifice of self-awareness. (Ichazo / Naranjo)",
    holyIdea: "Care That Doesn't Require Being Needed in Return. the higher recognition that genuine love flows freely, without the need to be the one who provides it or without requiring that others depend on you. Giving from wholeness rather than from the need to be needed. (Ichazo)",
    virtue: "Recognizing Your Own Needs as Equally Valid. the capacity to know what you want, feel what you feel, and ask for what you need. without those needs feeling like they threaten the care you have for others. (Naranjo / Riso & Hudson)",
    defenseM: "Personal Needs and Frustrations Remaining Outside of Awareness. the process by which one's own unfulfilled desires, resentments, and emotional needs stay at the edge of consciousness rather than being acknowledged, preserving the felt sense of being purely caring and self-sufficient in one's giving. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Caring", "Interpersonal", "Generous", "Warm", "Empathetic"],
    healthyTraits: ["Unconditionally loving", "Altruistic", "Giving", "Nurturing", "Joyful"],
    averageTraits: ["People-pleasing", "Possessive", "Intrusive", "Demonstrative", "Hovering"],
    unhealthyTraits: ["Manipulative", "Self-deceptive", "Entitled", "Coercive", "Victimized"],
    wings: { left: "2w1, The Servant", right: "2w3, The Host" },
    integrationLine: 4,
    disintegrationLine: 8,
    growthTips: [
      "Practice identifying and expressing your own needs.",
      "Notice when you're giving to get something in return.",
      "Set healthy boundaries without feeling guilty.",
      "Connect with your own emotions (integration to 4).",
      "Remember that your worth isn't dependent on being needed."
    ],
    journalPrompts: [
      "What do I need right now that I haven't asked for?",
      "Am I helping because I genuinely want to, or because I want to feel valued?",
      "What boundary could I set this week that would serve my wellbeing?",
      "How do I feel when someone doesn't need my help?",
      "What would self-love look like for me today?"
    ],
    color: "#C4607A",
    icon: "",
    horneyGroup: 'compliant',
    harmonicGroup: 'positive_outlook',
    fullDescription: `The Two's entire psychological structure is built around other people's needs. For the Two, love is something that must be earned and continually re-earned through giving, caring, anticipating, and making themselves essential to the people they attach to. The core motivation is to feel loved and needed. not loved abstractly, but loved by specific people who genuinely require their presence. This is not mere people-pleasing; it is an existential strategy for survival. If I am needed, I cannot be abandoned. If I am giving, I am safe.

The core fear is being unwanted. unloved not because of something they did, but because of who they are when stripped of their giving. This is why Twos are often more comfortable in the role of helper than in the role of recipient: receiving care reverses the power dynamic and exposes the need they've spent years denying. Repression (the Two's defense mechanism) keeps their own unmet needs and resentments outside of awareness, preserving the felt sense of being purely generous.

At their best. integrating toward Type 4. Twos access genuine emotional honesty and self-awareness. They develop an inner life that is genuinely their own, separate from others' needs, and they learn to love from wholeness rather than from need. Healthy Twos have extraordinary warmth, genuine empathy, and an unconditional generosity that comes from abundance rather than from the terror of being unloved.

Under stress. disintegrating toward Type 8. Twos can become surprisingly aggressive and domineering, asserting the needs they've suppressed for years in a sudden, forceful eruption. The accommodating helper disappears and something much more demanding appears in its place: a person who insists on getting what they've been denied while unconsciously punishing others for not having provided it.

In relationships, Twos are warm, attentive, and genuinely caring. They are often the emotional anchor of the relationship and invest deeply in their partner's wellbeing. The challenge is that this investment is rarely fully mutual: the Two gives abundantly while expecting the partner to somehow know, without being asked, what the Two needs in return. When those unspoken needs go unmet, the Two's warmth can curdle into manipulation, martyrdom, or explosive resentment.

Growth for Twos lies in humility. the recognition that they are not actually exempt from the human condition of having needs. The transformation begins when the Two can name what they want, feel what they feel, and ask for what they need without the request feeling like a betrayal of their identity. The irony is that when Twos stop giving in order to be needed and start giving from genuine care, their relationships become far more nourishing. for both parties.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Twos typically grew up in environments where love felt conditional. where being good, helpful, and needed was more reliable than simply being oneself. The child learned that needs were burdensome to others, that showing neediness risked rejection or abandonment, and that being indispensable was a safer strategy than being vulnerable. The wound is: I am not lovable as I am. I must earn love by being needed. This becomes the organizing principle of the entire personality: identity is built not from inside out but from outside in. from the faces of those who depend on the Two."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo identified the Two's deep structure as 'pride'. not vanity, but a specific inflation: the belief that they know what others need better than others know themselves, and that their giving places them in a position of special value. This pride is largely unconscious; Twos genuinely experience their helping as selfless. But underneath, there is an unspoken transaction: I give to you, and you need me, and this means I matter. When the transaction breaks down. when people don't acknowledge the giving, don't need the Two as much as expected, or fail to reciprocate. the result is often rage that the Two has no framework for, because they've defined themselves as beyond that kind of feeling."
      },
      {
        title: "In Relationships",
        content: "Twos are powerfully present partners. attentive, warm, emotionally available, and invested in the relationship's health. They often intuit their partner's needs before the partner articulates them. The difficulty is that this attentiveness can shade into intrusiveness: the Two may project needs onto partners, manage their emotional states uninvited, or become hurt when their help isn't wanted. The deeper challenge is asymmetry: Twos are often far more present to their partner's needs than their own, which creates a structural imbalance that eventually produces resentment. Healthy relationships for Twos require learning to ask directly, receive gracefully, and allow others to give without turning it into a power struggle."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 4, healthy Twos develop genuine self-knowledge and emotional depth. They can identify and articulate their own feelings, needs, and limits. They give not because they fear rejection but because generosity is genuinely satisfying when it isn't driven by terror. At their healthiest, Twos are among the most unconditionally loving people in the Enneagram. capable of a warmth that neither demands reciprocation nor withdraws when unacknowledged. They become genuine allies to the people they love: standing with them rather than managing them."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 8, stressed Twos become aggressive, demanding, and domineering in ways that can feel completely out of character. The accommodating warmth disappears and a very direct, forceful, and often entitled energy appears. This is the accumulated weight of years of unacknowledged need finally breaking through the surface. The Two under extreme stress may make punishing demands, become controlling, and express anger in ways that leave people around them genuinely confused. This is one of the Enneagram's most dramatic stress shifts. the helper becoming the demander."
      },
      {
        title: "The Growth Path",
        content: "Twos grow by learning to locate themselves. their own feelings, needs, preferences, and limits. as a distinct, valid presence in every relationship. Concrete practices: (1) Daily check-ins: 'What do I feel right now? What do I need right now?' without immediately redirecting to others. (2) Practicing saying no without the need to soften it with an immediate substitute offer. (3) Noticing the difference between giving from genuine care and giving to manage anxiety about being needed. (4) Learning to receive. to accept care, compliments, and help without immediately deflecting or reciprocating. The virtue Twos are growing toward is humility. not self-deprecation, but an accurate, grounded recognition of their own humanity: they have needs, feelings, and limits just like everyone they care for."
      }
    ],
    wingDescriptions: {
      left: {
        name: "2w1, The Servant",
        description: "The One wing brings principled conscience and ethical structure to the Two's natural warmth. Where the pure Two gives freely to feel needed, the 2w1 gives with a sense of duty and moral obligation. their helping feels almost selfless in a more formal sense. Naranjo observed that this wing introduces a self-critical, improving quality: the 2w1 holds themselves to high standards of goodness and can feel genuine guilt when they fall short. They are less emotionally effusive than the 2w3 and more likely to express care through consistent, reliable service than through charm or social performance. Chestnut notes that the 2w1 can be harder on themselves than on others, and their resentment. when it appears. tends to be quiet and moral rather than dramatic. They may suppress their own needs even more than the typical Two, believing that any focus on self is selfish. Growth for the 2w1 means learning that caring for themselves is not a betrayal of their values, and that principled service is healthiest when it flows from genuine fullness rather than duty-driven self-erasure."
      },
      right: {
        name: "2w3, The Host",
        description: "The Three wing supercharges the Two's social capacity, adding charm, energy, and image-awareness to an already other-focused type. The 2w3 is typically the most visibly warm and engaging person in any room. they are excellent hosts, connectors, and relationship builders who combine genuine care with a performer's instinct for what others want to see. Riso and Hudson noted that this wing introduces ambition into the helper role: the 2w3 wants to be not just loved but admired, not just needed but celebrated. They are more conscious of their impact and appearance than the 2w1, and their giving often has a relational sophistication. they know how to make people feel special in ways that cement loyalty. The shadow: the Three wing adds a layer of strategic image management that can make the 2w3's generosity feel slightly performative on close inspection. They may find it harder than the 2w1 to acknowledge neediness because it would undermine the competent, generous persona. Growth invites them to give without an audience, and to discover that love doesn't require performance.",
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Disinterested Altruist", description: "At their healthiest, Twos give with no strings attached whatsoever. Love flows freely from a place of genuine fullness rather than need, and there is no unconscious ledger tracking what has been given. They are among the most unconditionally generous people in the Enneagram, able to receive care as gracefully as they give it." },
        { level: 2, title: "The Caring Person", description: "Warmly empathetic and genuinely attuned to others, Twos at this level give from authentic care while remaining aware of their own needs and feelings. Their helping is freely offered rather than compulsive, and they maintain a clear sense of their own identity separate from the roles they play for others." },
        { level: 3, title: "The Nurturing Helper", description: "Supportive, encouraging, and practically helpful, these Twos invest meaningfully in others' wellbeing. They remain attuned to their own limits and can step back when appropriate. Their nurturing is warm and specific rather than diffuse or possessive, meeting people where they actually are." },
      ],
      average: [
        { level: 4, title: "The Effusive Friend", description: "Giving becomes more strategic as Twos begin helping in order to be liked and needed. They grow more attuned to others' emotional states. and more focused on managing their own impression. Flattery and ingratiating behavior emerge as tools for securing closeness." },
        { level: 5, title: "The Possessive Intimate", description: "The Two's giving becomes increasingly intrusive as they seek to create dependency in the people they care about. They give to control the relationship, become hurt when help isn't wanted, and start building a silent account of what they are owed." },
        { level: 6, title: "The Self-Important Saint", description: "Self-righteousness about their own selflessness sets in. Twos see themselves as uniquely caring, more devoted than others could understand, and feel entitled to gratitude and special recognition. Martyrdom begins to color their helping." },
      ],
      unhealthy: [
        { level: 7, title: "The Self-Justifying Manipulator", description: "Giving is now primarily a vehicle for emotional manipulation. The Two uses guilt, emotional pressure, and implied debt to extract the love and recognition they need. They have little conscious awareness of how controlling their 'care' has become." },
        { level: 8, title: "The Domineering Coercive", description: "The accommodating helper gives way to an openly aggressive demander. Years of suppressed resentment erupt as the Two insists on receiving what they have been denied, using whatever coercive means are available. They become domineering in ways that genuinely shock those who knew only their warm exterior." },
        { level: 9, title: "The Psychosomatic Victim", description: "Complete psychological collapse as the strategy of earning love through giving finally fails. Physical symptoms may emerge as expressions of unmet needs. The Two may regress into helplessness, adopting illness or crisis as a way of compelling the care they could never ask for directly." },
      ],
    },
  },
  {
    number: 3,
    name: "The Achiever",
    alias: "The Performer",
    brief: "Threes are masters of becoming whatever version of themselves will be most valued in a given context. the efficiency is real, the charm is genuine, but the self underneath has often gone missing. Vanity here isn't ego; it's an identity built entirely from the outside in, from achievement and recognition rather than from within.",
    description: "Threes are self-assured, attractive, and charming. Ambitious, competent, and energetic, they can also be status-conscious and highly driven for advancement. They are diplomatic and poised, but can also be overly concerned with their image and what others think of them. They typically have problems with workaholism and competitiveness.",
    coreMotivation: "To be affirmed, to distinguish themselves from others, to have attention, to be admired.",
    coreFear: "Of being worthless or without inherent value apart from achievements.",
    coreDesire: "To feel valuable and worthwhile.",
    passion: "Vanity (Ichazo) — elaborated as self-deceit by Naranjo. Shaping Presentation to Match What Each Situation Values. a natural adaptability in which how you come across is continuously adjusted to fit what will be recognized and rewarded in a given context. For the 3, this doesn't feel like performance. it feels like effectiveness, like knowing how to be the right person for the moment. (Ichazo; elaborated by Naranjo in Character & Neurosis)",
    fixation: "Attention Tracking How You Are Coming Across and Being Received. a continuous orientation toward the social feedback loop: reading the room, adjusting in real time, monitoring whether the presentation is landing as intended. (Ichazo / Naranjo)",
    holyIdea: "Value That Exists Independent of What You Accomplish. the higher recognition that worth is intrinsic and doesn't need to be earned through achievement or recognition. Something real is already there before any performance begins. (Ichazo)",
    virtue: "Expressing What's Actually There Rather Than What's Expected. the capacity to be seen as you genuinely are rather than as the version that will be most valued; feeling from the inside out rather than adjusting from the outside in. (Naranjo / Riso & Hudson)",
    defenseM: "Absorbing a Role Until It Becomes Indistinguishable From Identity. taking on a persona, goal, or social position so completely that the distinction between the role and the self disappears. The 3 isn't consciously pretending. they have genuinely become the role. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Adaptable", "Ambitious", "Competent", "Energetic", "Driven"],
    healthyTraits: ["Authentic", "Self-accepting", "Charitable", "Genuine", "Inspiring"],
    averageTraits: ["Image-conscious", "Competitive", "Calculating", "Self-promoting", "Grandiose"],
    unhealthyTraits: ["Deceptive", "Narcissistic", "Vindictive", "Exploitative", "Malicious"],
    wings: { left: "3w2, The Charmer", right: "3w4, The Professional" },
    integrationLine: 6,
    disintegrationLine: 9,
    growthTips: [
      "Practice being authentic even when it doesn't serve your image.",
      "Slow down and notice what you actually feel versus what you project.",
      "Develop loyalty and commitment to others (integration to 6).",
      "Learn that your worth exists independent of your achievements.",
      "Allow yourself to be vulnerable with trusted people."
    ],
    journalPrompts: [
      "Who am I when no one is watching?",
      "What achievement am I chasing right now, and what's really driving it?",
      "When did I last do something purely for enjoyment, not accomplishment?",
      "What would I do differently if I knew nobody would judge me?",
      "How can I show up authentically in my relationships today?"
    ],
    color: "#C9921A",
    icon: "",
    horneyGroup: 'aggressive',
    harmonicGroup: 'competency',
    fullDescription: `The Three's psychology centers on a fundamental equation: I am what I achieve. This isn't narcissism in the clinical sense. it's the internalization of an environment that rewarded performance over presence, that loved the achievement more than the achiever. The Three absorbed this message and built an entire personality around producing what will be recognized and valued. The result is often extraordinary: Threes can be magnetic, effective, and genuinely skilled. because they've spent their lives learning how to succeed.

The core fear is worthlessness. the terror that beneath the accomplishments and the image, there is nothing of value. This is why Threes keep moving: slowing down means risking the discovery that the self underneath isn't enough. Deceit (Ichazo's passion for the Three, also rendered as vanity) operates at a level below conscious awareness. the Three doesn't feel like they're performing, they genuinely become the version of themselves that the context rewards. Identification (the defense mechanism) means the role and the self merge completely.

At their best. integrating toward Type 6. Threes develop genuine commitment, loyalty, and the ability to be vulnerable with others. They discover that connection requires showing up as who they actually are, not who will be most effective. Healthy Threes can be inspiring in the deepest sense: people who have found authentic purpose and channel their considerable drive in its service, who achieve because it matters rather than to prove their worth.

Under stress. disintegrating toward Type 9. Threes become disengaged, apathetic, and disconnected from their usual drive. The performing mode breaks down and a kind of numbness or drift takes its place. This is often deeply disorienting for people around the Three who rely on their energy and effectiveness.

In relationships, Threes are charming, attentive partners who bring genuine energy and presence. The challenge is authenticity: Threes often present the version of themselves they think the partner wants rather than who they actually are. They can struggle to sit with a partner's difficult emotions without redirecting toward solutions, and they may prioritize the image of the relationship over its actual depth.

Growth for Threes lies in authenticity. learning to feel from the inside out rather than performing from the outside in. The path begins with slowing down enough to ask: 'What do I actually feel right now? What do I actually want, separate from what will be recognized?' This is genuinely frightening for Threes, because the answer might be 'I don't know'. which feels like failure. But in that not-knowing lives the authentic self they've been running from.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Threes typically grew up in environments where love was conditional on performance. where being successful, impressive, or admirable was more reliably rewarded than simply being oneself. The child learned that their genuine feelings, struggles, and ordinary moments were less interesting to the adults around them than their achievements. Over time, the authentic self was set aside in favor of whatever version of the self produced the most positive response. The wound is: I am not lovable as I am. I must become someone worth loving. The tragedy is that the very strategy the Three uses to earn love makes it impossible to know whether they are actually loved or merely admired."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo described the Three's deep structure as 'vanity'. but this is not ordinary self-love. It is the conviction that the performing self is more real and more valuable than whatever is underneath. Threes don't experience themselves as pretending; the identification with the role is total. What makes this a passion in Ichazo's sense is that it operates automatically: the Three shapes themselves to fit the evaluative context without consciously deciding to do so. The deeper mechanism is deceit. not deliberate lying, but a kind of ontological confusion about where the self ends and the performance begins. The Three often genuinely doesn't know what they feel, because feeling has long been secondary to performing."
      },
      {
        title: "In Relationships",
        content: "Threes are often compelling, attentive, and energetically present partners. They are genuinely invested in the relationship's success. but success can be defined in terms of how it looks rather than how it feels. They may struggle to be genuinely vulnerable because vulnerability requires showing the self that exists underneath the competence, and that self feels dangerously unproven. Partners of Threes often sense that they are with someone impressive but not fully known. Growth in relationship means the Three choosing, repeatedly, to show what is actually happening inside. even when, especially when, it doesn't look good."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 6, healthy Threes develop the capacity for genuine commitment, loyalty, and self-disclosure. They stop needing every interaction to be efficient and start being willing to just be with people. Their drive becomes purposeful rather than compulsive. they work hard because the work genuinely matters to them, not because stopping would mean confronting the emptiness. At their healthiest, Threes are inspiring in the truest sense: people who have integrated authenticity and effectiveness, who model what it looks like to be both capable and real, both ambitious and genuinely caring about others."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 9, stressed Threes become disengaged, numb, and strangely passive. a jarring shift for people who rely on their relentless energy. The performing mode breaks down and a kind of flat, purposeless drift takes its place. Threes under extreme stress may lose contact with their goals entirely, going through motions without engagement, or retreating into distraction. This disintegration is particularly destabilizing because the Three's sense of self is so tied to forward movement and achievement; when that goes, it can feel like identity collapse."
      },
      {
        title: "The Growth Path",
        content: "Threes grow by developing what Riso-Hudson call 'authenticity' and Ichazo called 'hope'. the recognition that there is something real underneath the performing self that doesn't need to be earned. Concrete practices: (1) Regular pauses to ask 'What do I actually feel right now?'. not what is strategically appropriate to feel. (2) Deliberately doing things they're not good at, in contexts where failure is possible, to discover that they exist apart from competence. (3) Slowing down in relationships: sitting with difficulty rather than solving it. (4) Finding one thing they do purely because it matters to them, not for any external recognition. The virtue Threes are growing toward is authenticity. the capacity to be seen as who they actually are, which requires first discovering who that is."
      }
    ],
    wingDescriptions: {
      left: {
        name: "3w2, The Charmer",
        description: "The Two wing infuses the Three's ambition with genuine warmth and relational intelligence. The 3w2 is typically the most socially magnetic combination in the Enneagram. they pursue success through people rather than despite them, and their image management includes a carefully cultivated persona of generous likeability. Riso and Hudson observed that this wing makes the Three more emotionally expressive and relationship-focused than the 3w4, and more concerned with being loved than just admired. Naranjo noted that the 3w2 can blur the boundary between genuine care and strategic relatedness. they may not always be certain themselves whether their warmth is authentic or tactical. They excel in roles that require both social charm and driven performance: sales, leadership, public service, performance. The shadow is that the Two wing adds a layer of people-pleasing that can make it harder for the 3w2 to make unpopular decisions or acknowledge genuine conflict. Growth invites them to value real relationships over image-relationships, and to discover that vulnerability doesn't undermine their appeal. it deepens it."
      },
      right: {
        name: "3w4, The Professional",
        description: "The Four wing introduces depth, aesthetic sensitivity, and a hunger for authentic self-expression into the Three's achievement drive. The 3w4 is less concerned with broad social approval and more focused on being genuinely excellent, uniquely recognized, and artistically or professionally distinguished. Chestnut notes that this wing produces one of the most capable and image-conscious types in the whole Enneagram. they combine Three's drive with Four's aesthetic refinement and emotional complexity. They are often found in creative professions, design, architecture, or any field where craft and achievement intersect. Unlike the 3w2, the 3w4 is more introverted and more internally conflicted. the Four's pull toward authenticity creates friction with the Three's adaptive performing. They may struggle more visibly with identity questions: 'Who am I really?' rather than 'How am I perceived?' Growth for the 3w4 means integrating the Four's depth with the Three's capacity for action, producing genuine creative achievement that is both excellent and authentically expressive.",
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Authentic Person", description: "At their healthiest, Threes achieve from genuine self-expression and care about the work for its own sake. Success emerges as a natural byproduct of being fully themselves rather than a goal pursued for validation. They are humble about their accomplishments and deeply invested in the wellbeing of those around them." },
        { level: 2, title: "The Admirable Person", description: "Talented, competent, and genuinely accomplished, Threes at this level are self-accepting and able to celebrate others' success without feeling threatened. Their confidence comes from real ability rather than image management, and they bring out the best in those around them." },
        { level: 3, title: "The Outstanding Paragon", description: "Energetic, goal-oriented, and effective, these Threes bring exceptional drive to meaningful pursuits. They inspire others through their genuine competence and the authenticity with which they show up. Their achievements have real value that goes beyond the recognition they receive." },
      ],
      average: [
        { level: 4, title: "The Competitive Status-Seeker", description: "Achievement becomes increasingly about image and status. Threes at this level compete for admiration and adapt their persona to maximize favorable impressions. They are still productive and capable, but the performing mode is gaining the upper hand over authentic self-expression." },
        { level: 5, title: "The Image-Conscious Pragmatist", description: "Self-promotion takes precedence over genuine contribution. Threes may exaggerate accomplishments, strategically manage relationships for career advantage, and become calculating about where to invest energy. The self is increasingly identified with the performance." },
        { level: 6, title: "The Self-Promoting Narcissist", description: "The Three has largely lost track of who they are beneath the performance. They deceive themselves and others about their motivations and accomplishments, becoming genuinely unable to distinguish authentic feeling from strategic expression. Exploitation of others for personal advancement begins." },
      ],
      unhealthy: [
        { level: 7, title: "The Unprincipled Opportunist", description: "Threes at this level use people instrumentally for advancement without remorse. They betray trust when it becomes inconvenient and justify this through elaborate rationalizations. The authentic self has been so thoroughly suppressed that they may not experience the exploitation as wrong." },
        { level: 8, title: "The Deceptive Manipulator", description: "Deliberate deception and manipulation in service of maintaining image and status. The Three lies without the internal friction that typically accompanies dishonesty, having identified completely with the performance. They may destroy others' reputations to protect their own." },
        { level: 9, title: "The Vindictive Psychopath", description: "Complete dissolution of moral constraint in service of image-protection or revenge against those who have exposed them. The Three at this level may become capable of genuinely harmful acts toward those who threaten the constructed persona they have built their entire sense of self around." },
      ],
    },
  },
  {
    number: 4,
    name: "The Individualist",
    alias: "The Romantic",
    brief: "Fours live in the gap between what is and what could be, between who they are and who they sense they ought to be. a gap that feels simultaneously their wound and their most precious possession. Envy is not jealousy of what others have; it is the aching certainty that others possess a wholeness and belonging that the Four alone seems to lack.",
    description: "Fours are self-aware, sensitive, and reserved. They are emotionally honest, creative, and personal, but can also be moody and self-conscious. Withholding themselves from others due to feeling vulnerable and defective, they can also feel disdainful and exempt from ordinary ways of living. They typically have problems with melancholy, self-indulgence, and self-pity.",
    coreMotivation: "To express themselves and their individuality, to create and surround themselves with beauty, to maintain certain moods and feelings.",
    coreFear: "Of having no identity or personal significance.",
    coreDesire: "To find themselves and their significance, to create an identity.",
    passion: "Envy (Ichazo). A Persistent Sense That Something Essential Is Missing. an ongoing awareness that others seem to have access to a completeness, ease, or belonging that feels just out of reach from the inside. For the 4, this isn't simply sadness. it feels like something specific and real about who they are, something that makes their inner life more vivid and particular than others'. (Ichazo; elaborated by Naranjo in Character & Neurosis)",
    fixation: "Attention That Returns to What Is Absent, Lost, or Longed For. a natural orientation toward the gap between what is here and what is missing; toward the idealized, the unreachable, and the past. What's present tends to feel less vivid and significant than what isn't. (Ichazo / Naranjo)",
    holyIdea: "The Self as Already Complete Without Needing to Be Constructed. the higher recognition that identity doesn't need to be built through suffering, differentiation, or searching for what's missing. What's real and genuine in you is already there. (Ichazo)",
    virtue: "A Stable Relationship With Feeling. Present Without Being Overtaken. the capacity to feel deeply and authentically without being defined by any particular emotional state; to be moved by life without being swept away by it. (Naranjo / Riso & Hudson)",
    defenseM: "Taking External Experience Into the Self to Feel More Whole. identifying with other people's qualities, emotional states, or experiences and absorbing them inward as a way of adding to the felt sense of who you are. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Creative", "Sensitive", "Introspective", "Expressive", "Authentic"],
    healthyTraits: ["Inspired", "Creative", "Self-renewing", "Transformative", "Profound"],
    averageTraits: ["Self-absorbed", "Temperamental", "Melancholic", "Envious", "Withdrawn"],
    unhealthyTraits: ["Depressive", "Alienated", "Self-destructive", "Emotionally turbulent", "Hopeless"],
    wings: { left: "4w3, The Aristocrat", right: "4w5, The Bohemian" },
    integrationLine: 1,
    disintegrationLine: 2,
    growthTips: [
      "Channel your emotional depth into disciplined creative practice (integration to 1).",
      "Recognize that ordinary moments can be just as meaningful as peak experiences.",
      "Practice gratitude to counter the pull toward melancholy.",
      "Build consistent routines that ground your emotional life.",
      "Remember that your identity doesn't depend on being different."
    ],
    journalPrompts: [
      "What emotion am I holding onto right now? What would happen if I let it go?",
      "What ordinary moment brought me unexpected beauty today?",
      "Am I comparing my inner world to others' outer appearances?",
      "What would my life look like if I stopped searching for what's missing?",
      "How can I use my sensitivity as a strength rather than a burden?"
    ],
    color: "#7B5AAD",
    icon: "",
    horneyGroup: 'withdrawn',
    harmonicGroup: 'reactive',
    fullDescription: `The Four's inner world is richer, more vivid, and more painful than most. They feel everything at greater amplitude than average. beauty is more beautiful, loss is more devastating, longing is more acute. This depth of feeling is not pathology; it is how Fours actually experience life. But organized around the conviction that something essential is missing from their very being. that others got something they didn't, some fundamental sense of belonging or completeness. this richness becomes a source of chronic longing rather than fullness.

The core fear is having no identity, no personal significance. of being ordinary, ordinary in the sense of being indistinguishable, unmemorable, just another face. This is why Fours often emphasize their uniqueness, their depth, their emotional complexity: these are not affectations but strategies for establishing that they exist, that they are real and particular and irreplaceable. Envy (Ichazo's passion for the Four) is not jealousy of possessions. it is ontological envy, the sense that others simply are in a way that the Four is not.

At their best. integrating toward Type 1. Fours channel their emotional depth and creative vision into disciplined, structured work. They move from yearning to creating, from identifying with the wound to bringing beauty out of it. Healthy Fours are among the most authentically alive, empathically present, and creatively profound people in the Enneagram. people who have transformed suffering into genuine art, whether literal or relational.

Under stress. disintegrating toward Type 2. Fours can become surprisingly other-focused, seeking validation and connection with an almost desperate intensity, losing touch with their usual interiority. They may become clingy or self-sacrificing in ways that are completely at odds with their normal independence.

In relationships, Fours are intensely present, deeply romantic, and capable of a quality of emotional intimacy that few other types can match. The challenge is the search for perfect attunement. the feeling that the partner truly sees and understands the Four's uniqueness. which can never quite be satisfied. Fours may idealize partners before meeting them, then feel disappointed by ordinary reality.

Growth for Fours lies in equanimity. learning to be present to whatever feeling is here without needing it to be the definitive, final feeling that proves something essential about who they are. The path involves building a more stable relationship with the present moment, learning that the ordinary is not lesser than the ideal, and gradually discovering that they already possess what they have spent their lives searching for.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Fours typically experienced something in early life that felt like an abandonment, a loss, or an inexplicable deficiency. something that left them with the felt sense that something essential was missing from their foundational experience. This may have been literal (loss of a parent, significant separation) or more subtle (a sense of not fitting in, of being fundamentally different from family members, of not being fully understood). What matters is not the external event but the Four's interpretation: 'Something happened to me, or is wrong with me, that means I will always be incomplete.' This becomes the lens through which all subsequent experience is filtered."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo described the Four's deep structure as the cultivation of a specific emotional identity. an attachment to the feeling of longing, loss, and incompleteness that gives the Four their felt sense of being particular and real. The tragedy is that this orientation keeps the Four perpetually focused on what is absent rather than what is present. The attention naturally moves toward the distant, the idealized, the unattainable. because what is actually here seems less vivid, less real, less meaningful by comparison. Introjection (the defense mechanism) means the Four absorbs others' qualities or experiences as a way of feeling more whole, without recognizing this as a strategy."
      },
      {
        title: "In Relationships",
        content: "Fours are among the most romantically intense partners in the Enneagram. They want to be truly known. not the surface version of themselves but the full complexity, including the difficult parts. They offer this same attunement in return, and the connection they create when they trust can feel genuinely rare. The difficulty is the idealization-disappointment cycle: Fours tend to idealize what they don't have and feel the gap acutely when the real person shows up with all their ordinariness. They may push partners away to test whether they'll return, or withdraw when feeling unseen. Partners need to offer consistent, honest presence. not performance of perfect understanding, which the Four will sense as hollow."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 1, healthy Fours bring discipline and structure to their emotional depth and creative vision. They stop waiting for the perfect feeling before acting and start translating their inner richness into form: art, work, relationship, practice. The melancholy becomes meaningful rather than consuming. At their healthiest, Fours are emotionally honest in a way that creates genuine safety for others, deeply empathic, and capable of holding the full range of human experience. including others'. without flinching. They become transformative in the lives of people they touch."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 2, stressed Fours lose their characteristic interiority and independence, becoming unusually focused on others' needs and reactions, seeking connection and validation with an almost compulsive intensity. The usual self-sufficiency disappears and something more clinging and people-pleasing takes its place. This can feel deeply confusing to the Four, who normally identifies with their uniqueness and emotional independence. Under extreme stress, they may completely lose contact with their own internal compass."
      },
      {
        title: "The Growth Path",
        content: "Fours grow by developing equanimity. a stable, non-reactive relationship with their emotional life that allows them to feel fully without being defined by any single feeling. Concrete practices: (1) Noticing when attention moves toward what is absent and deliberately bringing it back to what is actually here. (2) Building consistent creative and somatic practices that ground the emotional richness in tangible form. (3) Distinguishing between the feeling and the identity. 'I am feeling sad' rather than 'I am a sad person.' (4) Practicing gratitude for the ordinary, which the Four tends to skip past in search of the extraordinary. The virtue Fours are growing toward is equanimity. not flatness, but a spacious, stable relationship with feeling that allows them to be moved without being swept away."
      }
    ],
    wingDescriptions: {
      left: {
        name: "4w3, The Aristocrat",
        description: "The Three wing gives the Four's emotional depth an outward, image-conscious expression. Where the pure Four is primarily interior, the 4w3 is oriented toward being seen. they want the world to recognize their uniqueness, not just feel it privately. Riso and Hudson describe this wing as combining artistic sensitivity with competitive drive: the 4w3 is ambitious about their creative output and often more concerned with recognition and aesthetic impact than the 4w5. Chestnut notes that this wing makes the Four more socially engaged and performance-oriented, capable of extraordinary creative achievement that is both deeply personal and publicly compelling. They tend to dress with distinctive style, cultivate a recognizable persona, and measure their success partly through the quality of others' response. The shadow: the Three wing adds a layer of image management that can conflict with the Four's longing for authentic rawness. they may oscillate between self-display and self-criticism. They are prone to envy of peers who seem to achieve greater recognition. Growth for the 4w3 means integrating the desire to be seen with the willingness to be imperfect and unfinished in public."
      },
      right: {
        name: "4w5, The Bohemian",
        description: "The Five wing deepens the Four's already rich interiority, adding intellectual curiosity, theoretical complexity, and a preference for solitude and observation. The 4w5 is often the most withdrawn and eccentric combination in the Enneagram. they inhabit a private inner world of extraordinary richness but have less drive for external recognition than the 4w3. Naranjo observed that this wing produces a type who can become so absorbed in the internal landscape that they lose practical connection to the world outside. The 4w5 is typically more uncomfortable with social performance and less concerned with their audience's response. they create, observe, and think for the intrinsic value of the process rather than for acclaim. They are often found in philosophy, literature, art theory, or solitary creative practices. Chestnut notes that the Five wing amplifies the risk of emotional isolation: the 4w5 can be genuinely alone in ways that are painful without being obvious to others. Growth invites the 4w5 to bring their extraordinary inner world into contact with others, allowing their depth to be received rather than only privately inhabited.",
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Inspired Creator", description: "At their healthiest, Fours transform personal depth and emotional experience into universal meaning. Their suffering has been transmuted into wisdom, and they give their gifts freely. They are genuinely present, connected, and able to hold the full range of human experience with equanimity." },
        { level: 2, title: "The Self-Aware Intuitive", description: "Deeply self-aware and emotionally honest, Fours at this level can hold their own complexity without being overwhelmed by it. Their authenticity creates genuine connection rather than isolation, and they bring unusual empathy to their relationships. able to meet people in their pain without flinching." },
        { level: 3, title: "The Self-Revealing Individual", description: "Expressive, creative, and empathetic, these Fours give authentic shape to their inner world in ways that resonate with others. They are present in their relationships, offering genuine depth and the rare gift of being truly known." },
      ],
      average: [
        { level: 4, title: "The Imaginative Introvert", description: "Fours at this level begin withdrawing into fantasy and introspection, testing others' care and holding back to protect from anticipated rejection. Emotional experiences intensify and become harder to regulate. They are still creative, but self-absorption is increasing." },
        { level: 5, title: "The Self-Absorbed Romantic", description: "Fantasy and melancholy serve as refuges from action and engagement. The Four wallows in feeling rather than channeling it, becomes more envious of what others seem to have, and increasingly alienates the people they most want connection with." },
        { level: 6, title: "The Self-Indulgent Exception", description: "Chronic feelings of deficiency and a sense of being exempt from ordinary expectations. The Four uses emotional intensity as a substitute for genuine engagement with life, and their relationships suffer from volatility, withdrawal, and the push-pull of need and rejection." },
      ],
      unhealthy: [
        { level: 7, title: "The Alienated Depressive", description: "Complete withdrawal from engagement with life or relationships. The Four believes they are beyond redemption, understanding, or genuine connection. Depression is profound and may be unconsciously valued as proof of their unique depth." },
        { level: 8, title: "The Emotionally Disturbed Person", description: "Self-destructive behavior as a way of managing emotional overwhelm. The Four may use substances, dangerous relationships, or crisis-seeking to feel something real. Emotional turbulence becomes genuinely destabilizing and frightening." },
        { level: 9, title: "The Self-Destructive Person", description: "Complete hopelessness and the dissolution of any sense that life can be worth living. The Four's search for identity and meaning collapses into a conviction that genuine connection and fulfillment are permanently unavailable to them specifically." },
      ],
    },
  },
  {
    number: 5,
    name: "The Investigator",
    alias: "The Observer",
    brief: "Fives manage the world by retreating from it. not from coldness, but from the conviction that direct engagement depletes something essential and finite inside them. Avarice here is not greed for money but a hoarding of inner resources: energy, attention, and emotional presence are carefully rationed against a felt sense that there will never be quite enough.",
    description: "Fives are alert, insightful, and curious. They are able to concentrate and focus on developing complex ideas and skills. Independent, innovative, and inventive, they can also become preoccupied with their thoughts and imaginary constructs. They become detached, yet high-strung and intense. They typically have problems with eccentricity, nihilism, and isolation.",
    coreMotivation: "To possess knowledge, to understand the environment, to have everything figured out as a way of defending the self from threats.",
    coreFear: "Of being useless, helpless, or incapable.",
    coreDesire: "To be capable and competent.",
    passion: "Avarice (Ichazo). A Careful Economy of Inner Resources. a persistent awareness that energy, attention, and emotional presence are finite, and that engagement draws on them. The 5 naturally calibrates how much of themselves to bring to any situation based on what it will require. not out of withdrawal, but out of a felt need to have enough left. (Ichazo; elaborated by Naranjo in Character & Neurosis)",
    fixation: "Limiting Exposure to Preserve Inner Capacity. a natural tendency to contain personal footprint: minimizing one's own stated needs, keeping feeling separate from thinking, and managing how much of oneself enters any given exchange. Attention naturally tracks what things require rather than what they might open. (Ichazo / Naranjo)",
    holyIdea: "Understanding That Comes Through Engagement Rather Than Observation. the higher recognition that genuine knowledge doesn't accumulate from a safe distance; that participating in life, rather than watching it, is what opens real comprehension. (Ichazo)",
    virtue: "Moving Through the World Without Needing to Hold On. the capacity to engage fully, share freely, and let knowledge and resources flow through rather than containing them; discovering that genuine connection replenishes rather than depletes. (Naranjo / Riso & Hudson)",
    defenseM: "Keeping Thought and Feeling Separate to Maintain Clarity. organizing inner experience so that emotional states don't interfere with thinking, and analysis can proceed without being disrupted by the personal. This keeps intellectual functioning clear and protected from being overwhelmed. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Analytical", "Perceptive", "Innovative", "Independent", "Cerebral"],
    healthyTraits: ["Visionary", "Pioneering", "Perceptive", "Mindful", "Open-minded"],
    averageTraits: ["Detached", "Provocative", "Cerebral", "Eccentric", "Isolated"],
    unhealthyTraits: ["Nihilistic", "Reclusive", "Unstable", "Delusional", "Schizoid"],
    wings: { left: "5w4, The Iconoclast", right: "5w6, The Problem Solver" },
    integrationLine: 8,
    disintegrationLine: 7,
    growthTips: [
      "Practice stepping into action rather than endless preparation (integration to 8).",
      "Share your knowledge and inner world with trusted people.",
      "Engage your body through physical activity to balance cerebral tendencies.",
      "Set limits on information gathering, act on what you know.",
      "Allow yourself to need others without seeing it as weakness."
    ],
    journalPrompts: [
      "What am I avoiding by retreating into my mind?",
      "When did I last share something personal with someone I trust?",
      "What would it feel like to act on my knowledge rather than just accumulating more?",
      "How can I be more present in my body today?",
      "What's one way I could engage with the world that excites me?"
    ],
    color: "#3D6B9C",
    icon: "",
    horneyGroup: 'withdrawn',
    harmonicGroup: 'competency',
    fullDescription: `The Five's world is organized around the management of limited inner resources against an environment that feels inherently demanding and intrusive. The core conviction is that engagement costs something. energy, attention, emotional presence. and that these resources are finite and not easily replenished. The result is a careful economy: the Five calibrates how much of themselves to bring into any situation based on what it will require, maintaining an inner reserve that feels essential to survival. This is not laziness or coldness; it is an adaptive strategy organized around the felt sense that the world asks for more than the Five can give.

The core fear is being helpless, useless, or incapable. unable to manage the demands of life. This is why Fives invest so heavily in knowledge and competence: understanding the world is a way of feeling prepared for it, of building enough inner capacity that engagement becomes survivable. Avarice (Ichazo's passion) operates as an accumulation of knowledge and a hoarding of inner resources. maintaining the compartments of life separate, minimizing needs so that the demand on the inner supply remains manageable.

At their best. integrating toward Type 8. Fives move into action, directness, and embodied engagement with the world. They stop observing and start participating. Healthy Fives have extraordinary intellectual depth, genuine visionary capability, and a quality of focused attention that allows them to see what others miss. They become pioneers in the truest sense: people who have gone into unexplored territories of knowledge and come back with maps.

Under stress. disintegrating toward Type 7. Fives can become uncharacteristically scattered, hyperactive, and impulsive, moving erratically between ideas and activities without the focused concentration that normally characterizes them. The careful inner economy breaks down and something more anxious and dispersed takes its place.

In relationships, Fives are deeply loyal and genuinely interested in the people they choose to be close to. but they need significant alone time even within close relationships, and they may struggle to give emotional support in the ways their partners need. Their love is expressed through presence and thought rather than warmth and physical contact. Partners need to understand the Five's withdrawal as self-regulation, not rejection.

Growth for Fives lies in non-attachment. discovering that sharing, giving, and participating in life doesn't deplete them in the way they fear. The radical realization is that genuine engagement replenishes rather than drains. When Fives risk real contact. with their own feelings, with other people, with the physical world. they often discover that the inner resources they've been hoarding are in fact renewable.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Fives typically experienced early environments as intrusive, overwhelming, or simply too demanding. where the demands on them exceeded their felt capacity to meet them. This may have been an emotionally intense family where the child couldn't process the emotions directed at them, or an environment that required more presence than the child felt able to provide. The child's adaptive response was to retreat into the mind. to become an observer rather than a participant, to build an inner world rich enough to substitute for the overwhelming outer one. The wound is: engaging with the world takes more than I have. I must conserve myself or be overwhelmed."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo identified the Five's deep structure as 'retention'. a comprehensive strategy of minimizing what enters and controlling what exits. This operates across multiple dimensions: minimizing stated needs so as not to create obligation, keeping emotional life separate from intellectual life so that feelings don't disrupt thinking, maintaining compartments between different areas and people, and rationing presence in any engagement. Isolation of affect (the defense mechanism) keeps the emotional dimension of experience separate from the cognitive, allowing the Five to think clearly without being disrupted by what they're actually feeling."
      },
      {
        title: "In Relationships",
        content: "Within the small circle of people they trust, Fives are extraordinarily loyal, genuinely curious, and capable of a quality of focused attention that their partners often experience as rare and precious. The challenge is the asymmetry between the Five's need for privacy and autonomy and the partner's need for emotional presence and connection. Fives often struggle to provide real-time emotional engagement. they process feelings hours or days later, after significant alone time. Partners need to understand that the Five's withdrawal is self-regulation, not rejection of them specifically."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 8, healthy Fives move into direct engagement with the world. not as observers but as actors. They bring their extraordinary intellectual depth and vision into embodied, forceful contact with reality. The hesitation and infinite preparation give way to confident action. At their healthiest, Fives are genuine visionaries: people who have thought longer, more carefully, and more originally than almost anyone, and who are willing to share what they've found. They become pioneers. willing to act on incomplete information, to engage before they feel fully ready."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 7, stressed Fives become surprisingly scattered, impulsive, and hyperactive. The focused concentration that normally characterizes them disappears and something much more anxious and dispersed takes its place. They may leap between ideas and activities without completing any, seek stimulation in ways that feel uncharacteristic, and lose touch with the careful inner economy that usually governs them. This stress state is often disorienting both for the Five and for people who know them."
      },
      {
        title: "The Growth Path",
        content: "Fives grow by discovering non-attachment. the recognition that their inner resources are not as finite as they fear, that sharing doesn't deplete and engagement doesn't overwhelm, at least when they choose the conditions. Concrete practices: (1) Deliberate experiments with engagement: speaking in group settings, sharing work before it's perfect, being physically present with others. (2) Somatic practices that connect the Five to bodily experience and interrupt the tendency to live entirely in the head. (3) Allowing emotional experience to happen in real time rather than processing it privately hours later. (4) Noticing when 'I need to know more before I act' is genuine preparation versus avoidance. The virtue Fives are growing toward is non-attachment. the capacity to engage, share, and give without calculating what it costs."
      }
    ],
    wingDescriptions: {
      left: {
        name: "5w4, The Iconoclast",
        description: "The Four wing draws the Five's intellectual depth toward aesthetic, emotional, and existential concerns. Where the pure Five is motivated primarily by the accumulation and protection of knowledge, the 5w4 is also drawn to beauty, meaning, and original self-expression. Naranjo observed that this wing produces a type particularly prone to a certain kind of creative isolation. they can produce extraordinary original work in literature, philosophy, or art, but may become lost in the labyrinth of their own inner world. Chestnut notes that the 5w4 is more emotionally complex and more aware of their own inner life than the 5w6. they feel the absence of connection more acutely, even as they engineer that absence. They tend to be more unconventional, counter-cultural, and aesthetically distinctive. The Four wing also intensifies the Five's tendency toward melancholy and existential preoccupation. The 5w4 is often less practically functional than the 5w6. they sacrifice utility for meaning. Growth for the 5w4 involves learning to move from observation into participation, from witnessing life to actually inhabiting it."
      },
      right: {
        name: "5w6, The Problem Solver",
        description: "The Six wing brings loyalty, duty, and anxiety into the Five's analytical framework, producing one of the most practically capable and intellectually rigorous types in the Enneagram. Where the 5w4 is oriented toward meaning and aesthetics, the 5w6 is oriented toward systems, problems, and reliable knowledge. Riso and Hudson note that this wing makes the Five more connected to other people. loyalty and belonging matter here in a way they don't for the 5w4. The 5w6 tends to be more systematically productive, more focused on problem-solving and technical mastery, and more oriented toward proving their competence within established frameworks. Chestnut observes that the Six wing adds a quality of responsible, collaborative focus: the 5w6 often builds expertise in service of a team, institution, or cause rather than in pure solitary pursuit. The shadow includes the Six wing's characteristic anxiety and worst-case thinking, which can amplify the Five's natural caution. They may spend enormous energy preparing for scenarios that never materialize. Growth invites them to trust their own competence enough to act without perfect preparation.",
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Pioneering Visionary", description: "At their healthiest, Fives contribute breakthrough insights that genuinely advance human understanding. Fully present and engaged, they share their inner world generously, discovering that participation replenishes rather than depletes. Their knowledge becomes a gift to the world rather than a fortress." },
        { level: 2, title: "The Perceptive Observer", description: "Combining extraordinary insight with genuine openness, Fives at this level engage meaningfully with the world while maintaining their characteristic depth. They can communicate their understanding clearly, connect intellectually with others, and step into action from their solid knowledge base." },
        { level: 3, title: "The Expert", description: "Deep, focused knowledge offered in genuine service of others. These Fives bring mastery to their chosen domains and can translate expertise into practical value. They maintain productive relationships and find that their inner life is enriched rather than threatened by engagement." },
      ],
      average: [
        { level: 4, title: "The Studious Specialist", description: "Fives at this level withdraw from emotional demands to focus on intellectual pursuits. They become more observer than participant, intellectualizing experiences as a way of processing them safely. Social eccentricity begins to increase as the gap between their inner world and ordinary life widens." },
        { level: 5, title: "The Detached Cynic", description: "Increasingly narrow in focus and disconnected from ordinary social reality. The Five becomes attached to their mental world as a refuge, developing contrarian positions partly as a way of maintaining distance. Emotional engagement feels increasingly threatening and depleting." },
        { level: 6, title: "The Provocative Contrarian", description: "The Five uses intellectual provocations and nihilistic positions as a way of testing others and maintaining control over the emotional temperature of interactions. They may feel increasingly persecuted or misunderstood, even as their behavior contributes to their isolation." },
      ],
      unhealthy: [
        { level: 7, title: "The Isolated Nihilist", description: "The Five at this level believes nothing has value and no genuine connection is possible. They have retreated so far from the world that even their inner life has become a prison rather than a refuge. Detachment from care or consequence is nearly complete." },
        { level: 8, title: "The Delusional Schizoid", description: "Paranoid and psychologically unstable, the Five's elaborate inner world becomes increasingly divorced from shared reality. They may develop fixed delusions about persecution or special knowledge. The boundary between creative inner life and delusional thinking dissolves." },
        { level: 9, title: "The Imploding Schizophrenic", description: "Complete withdrawal from shared reality and possible breakdown of coherent mental functioning. The Five's extraordinary mind turns against itself without the ballast of genuine connection. Psychological fragmentation becomes the final expression of the strategy of retreat." },
      ],
    },
  },
  {
    number: 6,
    name: "The Loyalist",
    alias: "The Skeptic",
    brief: "Sixes are perpetually running a background threat-detection system. checking for inconsistencies, testing loyalty, scanning for what could go wrong. Their anxiety is not weakness; it is the cost of having a finely calibrated alarm system that was built for a world where trust had to be earned repeatedly and authority couldn't be assumed.",
    description: "Sixes are reliable, hard-working, responsible, and trustworthy. Excellent troubleshooters, they foresee problems and foster cooperation, but can also become defensive, evasive, and anxious, running on stress while complaining about it. They can be cautious and indecisive, but also reactive, defiant, and rebellious. They typically have problems with self-doubt and suspicion.",
    coreMotivation: "To have security and support, to have certainty and reassurance, to test the attitudes of others toward them.",
    coreFear: "Of being without support and guidance, of being unable to survive on their own.",
    coreDesire: "To have security and support.",
    passion: "Fear/Cowardice (Ichazo). An Ongoing Orientation Toward What Could Go Wrong. a natural attentiveness to potential threats, inconsistencies, and reasons for caution that operates continuously in the background. For the 6, this doesn't feel like anxiety. it feels like being realistic, prepared, and responsible. The world genuinely does contain real risks worth tracking. (Ichazo; also rendered as 'Cowardice' in some translations, pointing to avoidance of one's own inner authority; elaborated by Naranjo)",
    fixation: "Questioning Conclusions Before Acting on Them. a habitual checking and rechecking of both external information and internal judgment, making it difficult to feel fully settled on a decision. The mind naturally generates counterarguments, alternative readings, and reasons to keep investigating. (Ichazo / Naranjo)",
    holyIdea: "An Inner Capacity That Doesn't Depend on External Certainty. the higher recognition that the ground being sought in structures, authorities, and reassurances is actually available from within; that the ability to meet what comes doesn't require having predicted it. (Ichazo)",
    virtue: "Moving Forward on Your Own Judgment. the capacity to trust your own perception and act on it without waiting for external confirmation; finding that inner authority is a more reliable guide than the certainty sought outside. (Naranjo / Riso & Hudson)",
    defenseM: "Locating Internal Concerns in the External Environment. unconsciously attributing one's own fears and concerns to the outside world, so that what feels threatening from within becomes experienced as a threat coming from others or from circumstances. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Loyal", "Responsible", "Vigilant", "Committed", "Courageous"],
    healthyTraits: ["Self-reliant", "Courageous", "Trusting", "Cooperative", "Stable"],
    averageTraits: ["Anxious", "Suspicious", "Indecisive", "Reactive", "Defensive"],
    unhealthyTraits: ["Paranoid", "Panicky", "Punitive", "Divisive", "Self-defeating"],
    wings: { left: "6w5, The Defender", right: "6w7, The Buddy" },
    integrationLine: 9,
    disintegrationLine: 3,
    growthTips: [
      "Practice trusting yourself and your own inner guidance.",
      "Notice when anxiety is driving your decisions rather than wisdom.",
      "Cultivate inner peace and acceptance (integration to 9).",
      "Challenge worst-case-scenario thinking with evidence.",
      "Build self-reliance by taking small risks and celebrating courage."
    ],
    journalPrompts: [
      "What am I afraid of right now? Is this fear based on reality or projection?",
      "When did I last trust myself fully on a decision?",
      "What would courage look like for me today?",
      "How can I distinguish between healthy caution and anxiety?",
      "What support system am I grateful for, and how can I lean into self-trust?"
    ],
    color: "#7A8FA6",
    icon: "",
    horneyGroup: 'compliant',
    harmonicGroup: 'reactive',
    fullDescription: `The Six's psychological world is organized around a fundamental question that never fully resolves: Can I trust this? Can I trust you? Can I trust myself? This chronic uncertainty is not paranoia; it emerged from environments where the ground was unstable, where authority figures were inconsistent or betraying, and where vigilance was genuinely protective. The Six learned to outsource trust to structures, systems, or people outside themselves, because trusting their own inner guidance felt too risky. the inner voice had been wrong before, or had been overridden, or had led them somewhere that ended badly.

The core fear is being without support and unable to survive on their own. not just practically, but psychologically. Sixes fear being abandoned to their own devices in a world that feels fundamentally dangerous. This is why they invest so deeply in loyalty: building trustworthy relationships and systems is a hedge against the terror of being alone with an uncertain inner compass. Fear (Ichazo's passion, also rendered as cowardice, pointing to the avoidance of one's own authority) operates as a continuous scanning process: the Six's attention habitually moves toward potential threats, inconsistencies, and reasons for caution.

At their best. integrating toward Type 9. Sixes access genuine inner peace and trust. The threat-detection system quiets, not because the world has become safer but because the Six has discovered that they have the inner resources to meet whatever comes. Healthy Sixes are courageous in the deepest sense. not fearless, but people who feel fear clearly and move through it anyway. They become extraordinary allies: loyal, committed, and genuinely trustworthy.

Under stress. disintegrating toward Type 3. Sixes can become competitive, image-conscious, and performative in ways that are completely at odds with their usual cooperative nature. The anxiety gets channeled into drive for recognition and status, which temporarily quiets the doubt.

In relationships, Sixes are among the most loyal, caring, and genuinely committed partners in the Enneagram. Once trust is established, they invest completely. The challenge is the period before trust is established. the testing behavior, the need for repeated reassurance, the tendency to interpret ambiguity as threat. Partners need consistency above everything else, and must understand that the Six's vigilance is not distrust of them specifically but the default operating mode of a system built to be careful.

Growth for Sixes lies in developing genuine courage. the capacity to trust their own inner authority and act on their own judgment without waiting for external validation. This doesn't mean ignoring the legitimate information that comes from vigilance; it means learning to distinguish between the alarm system doing its job and the alarm system running on old programming that no longer serves.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Sixes typically grew up in environments where safety was unreliable. where authority figures were inconsistent, where the ground could shift without warning, or where the Six was genuinely exposed to situations that required vigilance to survive. The child learned that trusting their own inner authority was risky: better to check with others, to build systems of support, to remain alert. The wound is: I cannot trust myself to navigate this alone. I need reliable external guidance and support. This creates a fundamental dependency on others' approval and certainty, even as the Six simultaneously resents this dependency and tests whether it's real."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo identified the Six's deep structure as a fundamental distrust of inner experience. specifically, a distrust of their own inner authority. This is why Sixes can be so skilled at seeing through the pretensions of external authority (the skeptical dimension) while simultaneously seeking it: they know external authority can fail them, but they don't trust themselves either. Projection (the defense mechanism) means the Six's own fears and anxieties get located in the external world. the threat is 'out there,' not inside. This makes the anxiety feel more manageable but also harder to address directly, since the source keeps appearing to be external."
      },
      {
        title: "In Relationships",
        content: "Within established trust, Sixes are among the most devoted, warm, and genuinely supportive partners in the Enneagram. They show up consistently, they remember what matters to their people, and they invest deeply in the relationship's health. The difficulty is the process of establishing that trust, which involves testing. sometimes overtly, sometimes indirectly. to verify that the partner's commitment is real and consistent. Partners need to understand that the Six's need for reassurance is not insecurity about the partner specifically but about the fundamental trustworthiness of the world, including relationships. Consistency over time is the only real antidote."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 9, healthy Sixes access genuine inner peace. the recognition that they have what they need to meet what comes, without needing to have predicted or prepared for it. The background vigilance quiets and something more spacious takes its place. They retain their extraordinary capacity for loyalty, commitment, and trustworthiness while releasing the chronic anxiety that makes relationships and decisions so laborious. At their healthiest, Sixes are courageous allies: people whose loyalty has been tested and proved, whose commitment is bone-deep, and whose concern for others comes from genuine care rather than from the fear of abandonment."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 3, stressed Sixes become competitive, status-seeking, and image-conscious in ways that feel completely unlike their usual cooperative nature. The generosity and warmth disappear and something more strategically self-promoting takes their place. Anxiety gets channeled into driven performance. trying to build enough security through achievement and recognition to finally feel safe. This is one of the more confusing stress shifts in the Enneagram, because the Six can suddenly seem like a very different person."
      },
      {
        title: "The Growth Path",
        content: "Sixes grow by developing genuine inner authority. the capacity to trust their own perceptions, judgments, and capabilities without constant external validation. Concrete practices: (1) Noticing when the threat-detection system is running on old programming. fears based on past experience rather than present reality. and gently updating the threat assessment. (2) Taking small risks on their own judgment, noting what happens, building evidence for inner reliability. (3) Working with the body: the Six's anxiety is often held somatically, and somatic practices can interrupt the cognitive catastrophizing spiral. (4) Learning to distinguish between healthy caution (genuine signal) and anxious rumination (noise). The virtue Sixes are growing toward is courage. not fearlessness, but the willingness to act from their own authority even when certainty isn't available."
      }
    ],
    wingDescriptions: {
      left: {
        name: "6w5, The Defender",
        description: "The Five wing brings intellectual depth, analytical rigor, and a quality of deliberate self-containment to the Six's vigilance. Where the pure Six manages anxiety through social connection and reassurance-seeking, the 6w5 manages it through knowledge, expertise, and private preparation. Riso and Hudson observed that this wing makes the Six more introverted, more self-reliant in their intellectual framework, and less dependent on external approval. though no less anxious underneath. Naranjo noted that the 6w5 combines the Six's characteristic doubt with the Five's preference for private intellectual processing, producing a type that is often deeply knowledgeable but guarded about expressing uncertainty in public. They tend to be more systematic, serious, and focused on competence than the 6w7, and their loyalty to chosen systems and people runs very deep. The shadow includes a risk of intellectual isolation and guardedness that prevents genuine trust: they may over-rely on information as a substitute for the relational presence that would actually resolve their anxiety. Growth for the 6w5 involves discovering that genuine inner authority doesn't require having all the answers first."
      },
      right: {
        name: "6w7, The Buddy",
        description: "The Seven wing brings optimism, warmth, and playful energy into the Six's vigilant framework, producing one of the most reliably engaging and socially warm combinations in the Enneagram. The 6w7 tends to be more outwardly cheerful and socially comfortable than the 6w5, managing anxiety through humor, connection, and reframing rather than through withdrawal and analysis. Chestnut notes that this wing produces the most relationally oriented Sixes. they build loyalty through warmth and genuine enjoyment of others, not just through duty. Where the 6w5 may seem reserved or serious, the 6w7 often appears lighter and more accessible, which can obscure the significant anxiety running beneath the surface. The Seven wing also adds a tendency to seek adventure and variety as anxiety management. when things feel heavy or threatening, the 6w7 reaches for distraction or levity. The shadow: the Seven wing can make it harder to sit with genuine difficulty. Growth invites the 6w7 to develop the courage to stay present with anxiety rather than deflecting it, discovering that their warmth and connection are enough of a foundation.",
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Valiant Hero", description: "At their healthiest, Sixes act courageously from genuine inner authority rather than in spite of fear. They have developed real trust in their own judgment and in the fundamental reliability of life, and their loyalty and commitment come from a centered place rather than from anxiety. They inspire courage in others precisely because it cost them something." },
        { level: 2, title: "The Committed Worker", description: "Dependable, supportive, and reliably present, Sixes at this level contribute steadily to the people and causes they believe in. They maintain their own inner authority while building genuine trust with others. Their cooperation is freely chosen rather than compelled by the need for security." },
        { level: 3, title: "The Engaging Friend", description: "Hard-working, committed, and cooperative, these Sixes are deeply valuable team members and friends. They manage anxiety productively through genuine competence and preparation rather than through constant reassurance-seeking. Their loyalty is one of the Enneagram's most reliable gifts." },
      ],
      average: [
        { level: 4, title: "The Dutiful Loyalist", description: "Security becomes paramount as inner authority weakens. Sixes at this level seek structures, authority figures, and proven systems to provide the certainty they can't generate internally. Their dutiful compliance alternates with reactive defiance when the structure doesn't deliver." },
        { level: 5, title: "The Ambivalent Pessimist", description: "Chronic anxiety and worst-case thinking become dominant. The Six vigilantly scans for threats, tests others' loyalty persistently, and finds it increasingly difficult to trust even people who have proven themselves reliable. Suspicion and self-doubt intensify." },
        { level: 6, title: "The Authoritarian Rebel", description: "The Six oscillates between submission to authority and defiant rebellion against it, unable to find genuine inner ground. They may become divisive, paranoid about hidden motives, and increasingly reactive. Their anxiety now colors every relationship and decision." },
      ],
      unhealthy: [
        { level: 7, title: "The Overreacting Dependent", description: "The Six at this level has developed a persecution complex and sees threats where there are none. They act preemptively against imagined enemies, potentially creating the conflict they most feared. Their vigilance is no longer calibrated to reality." },
        { level: 8, title: "The Paranoid Hysteric", description: "Frantic, self-defeating behavior driven by panic. The Six acts against their own interests as anxiety overwhelms the capacity for realistic threat assessment. They may become aggressive in their self-protection, harming the very relationships they most depend on." },
        { level: 9, title: "The Self-Defeating Masochist", description: "The Six brings on the feared disaster themselves, confirming their worst beliefs about the world's unreliability. Complete surrender to the feared outcome becomes the final expression of a lifetime of anxious self-protection that paradoxically generated the catastrophe it sought to prevent." },
      ],
    },
  },
  {
    number: 7,
    name: "The Enthusiast",
    alias: "The Epicure",
    brief: "Sevens are running from pain with extraordinary creativity and velocity. the optimism is real, but it is also a strategy, a perpetual reframe away from the terrifying possibility of being trapped in deprivation with no exit. Gluttony here is not appetite for food; it is insatiable hunger for options, for stimulation, for the future that promises to finally be enough.",
    description: "Sevens are extroverted, optimistic, versatile, and spontaneous. Playful, high-spirited, and practical, they can also misapply their many talents, becoming over-extended, scattered, and undisciplined. They constantly seek new and exciting experiences, but can become distracted and exhausted by staying on the go. They typically have problems with impatience and impulsiveness.",
    coreMotivation: "To maintain their freedom and happiness, to avoid missing out on worthwhile experiences, to keep themselves excited and occupied.",
    coreFear: "Of being deprived and trapped in pain.",
    coreDesire: "To be satisfied and content, to have their needs fulfilled.",
    passion: "Gluttony (Ichazo). A Strong Drive Toward Experience, Options, and New Possibility. a natural orientation toward breadth, stimulation, and keeping the future open. For the 7, this isn't restlessness. it's the way life feels most alive: full of potential, ideas, and what might come next. The world is genuinely interesting and there's a lot of it to engage with. (Ichazo; elaborated by Naranjo in Character & Neurosis)",
    fixation: "Attention That Lives Ahead of the Present Moment. a natural tendency to inhabit anticipated experiences and future scenarios rather than what's actually here. The mind is already generating options and next steps before the current thing has fully resolved. (Ichazo / Naranjo)",
    holyIdea: "Fulfillment Found in What Is Here Rather Than What Comes Next. the higher recognition that the satisfaction being sought in the next experience is already available in this one; that depth in a single thing can be as nourishing as breadth across many. (Ichazo)",
    virtue: "Staying Present With One Thing Fully. the capacity to remain with an experience, commitment, or feeling as it actually is. including its difficult dimensions. without redirecting toward something more appealing. Also described as Constancy: following through rather than moving on. (Naranjo / Riso & Hudson)",
    defenseM: "Finding the Positive Dimension of Difficult Experiences. a natural tendency to reframe challenging or limiting situations in terms of their upside, opportunity, or what can be learned from them. This keeps the emotional register comfortable and forward-moving, though it can mean difficult experiences aren't fully absorbed. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Enthusiastic", "Versatile", "Spontaneous", "Optimistic", "Adventurous"],
    healthyTraits: ["Joyful", "Grateful", "Accomplished", "Satisfied", "Present"],
    averageTraits: ["Scattered", "Acquisitive", "Excessive", "Restless", "Distracted"],
    unhealthyTraits: ["Impulsive", "Escapist", "Manic", "Addictive", "Reckless"],
    wings: { left: "7w6, The Entertainer", right: "7w8, The Realist" },
    integrationLine: 5,
    disintegrationLine: 1,
    growthTips: [
      "Practice staying with one thing deeply rather than moving to the next (integration to 5).",
      "Allow yourself to sit with discomfort instead of distracting from it.",
      "Cultivate gratitude for what you have rather than craving what's next.",
      "Develop focus and follow-through on commitments.",
      "Recognize that true fulfillment comes from depth, not breadth."
    ],
    journalPrompts: [
      "What am I running from by staying so busy?",
      "What would happen if I sat still with my thoughts for 10 minutes?",
      "What commitment have I been avoiding, and what's really holding me back?",
      "What do I already have that I haven't fully appreciated?",
      "When was the last time I felt truly present and satisfied in a moment?"
    ],
    color: "#5B8FD0",
    icon: "",
    horneyGroup: 'aggressive',
    harmonicGroup: 'positive_outlook',
    fullDescription: `The Seven's entire psyche is organized around keeping the future open, stimulating, and full of possibility. The present moment is always already en route to the next experience, the next idea, the next adventure. not because Sevens are shallow, but because the present moment can only be trusted if it's heading somewhere better. The core conviction is that deprivation, limitation, and pain are real threats, and that the best defense is a continuously generating supply of options and excitement. Gluttony (Ichazo's passion) operates not as greed for food but as an insatiable orientation toward more: more experiences, more ideas, more possibilities, more future.

The core fear is being trapped in pain. not just experiencing pain, but being locked into it with no exit available. This is why Sevens keep generating options: as long as there are alternatives, there is an escape route. Rationalization (the defense mechanism) works by finding the positive dimension of every difficult experience. not through dishonesty but through an almost automatic reframing that makes it genuinely difficult for Sevens to fully absorb what went wrong or what they've lost.

At their best. integrating toward Type 5. Sevens develop the capacity for sustained, deep focus. They stop moving and allow themselves to be fully present in a single thing, discovering a depth of engagement they couldn't access while constantly in motion. Healthy Sevens are joyful in the genuine sense: not running from pain but genuinely delighting in life from a place of sufficiency rather than scarcity. They become extraordinarily generative. people whose creative energy and enthusiasm is genuinely infectious and genuinely committed.

Under stress. disintegrating toward Type 1. Sevens become critical, rigid, and perfectionistic in ways that are completely at odds with their usual buoyancy. The inner critic that Ones live with becomes suddenly audible for the Seven, fixating on everything that is wrong rather than everything that could be exciting.

In relationships, Sevens are playful, engaged, and genuinely fun partners who bring creativity and adventure. The challenge is depth: the Seven may struggle to stay with a partner's pain, or with sustained relational difficulty, without redirecting toward something more comfortable. Commitment requires the Seven to stay when the present isn't exciting, which directly confronts their deepest anxiety.

Growth for Sevens lies in sobriety. learning to be present with one thing fully, including when that thing is difficult or ordinary. The radical discovery is that depth in a single experience can be as nourishing as breadth across many, and that the satisfaction they've been chasing has always been available in the present moment rather than the next one.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Sevens typically experienced early environments where genuine comfort and sufficiency were unreliable. where the child couldn't be certain that their emotional or physical needs would be met, or where something was lost that felt irreplaceable. The child's adaptive response was to turn toward the future: toward what might come next, toward fantasized satisfaction, toward keeping options open. The wound is: I cannot depend on being taken care of. I must generate my own abundance, my own stimulation, my own reasons to feel okay. This becomes a perpetual orientation toward the horizon rather than the present."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo described the Seven's deep structure as the avoidance of pain through the pursuit of pleasure. but this is not hedonism in the simple sense. The Seven is running a continuous escape-from-deprivation algorithm. Every time the present moment begins to feel limited, heavy, or insufficient, the mind automatically generates a better option. a plan, a fantasy, a reframe, an escape. Rationalization makes this process invisible: the Seven doesn't experience it as avoidance but as optimism. This is why Sevens often have genuine difficulty seeing what they're running from: the defense works so well that the thing being defended against never fully comes into view."
      },
      {
        title: "In Relationships",
        content: "Sevens are among the most energetically present, playful, and genuinely fun partners. They bring excitement and possibility into relationships, and their enthusiasm for their partner and the relationship can be genuinely moving. The challenge is staying. staying with boredom, staying with conflict, staying with a partner's pain without immediately reframing it. Sevens often need to be reminded that commitment means choosing the present person even when the present moment isn't exciting. Partners need to understand that the Seven's deflection from difficult feeling isn't rejection. it is their default anxiety-management system, and it requires patient, consistent invitation to stay."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 5, healthy Sevens develop the capacity for sustained, deep engagement with a single subject, person, or project. They discover that depth is not the opposite of joy. it is its fullest expression. The perpetual forward motion slows into genuine presence. At their healthiest, Sevens are genuinely joyful. not the performed positivity of someone managing anxiety, but a real delight in life that comes from having allowed themselves to fully inhabit the present. They become people whose enthusiasm is matched by follow-through, whose creativity is grounded in genuine depth."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 1, stressed Sevens become perfectionistic, critical, and rigid in ways that are jarring after their usual buoyancy. The inner critic. normally kept quiet by the Seven's constant forward motion. suddenly becomes very loud. They fixate on what's wrong, what should be different, what has failed. The optimism and reframing capacity temporarily collapses and something more punitive takes its place. This is often triggered by being forced to stay with something that isn't working, which directly confronts the Seven's fundamental avoidance of limitation."
      },
      {
        title: "The Growth Path",
        content: "Sevens grow by developing sobriety. the capacity to be present with what is actually here, including when it is difficult, ordinary, or insufficient. Concrete practices: (1) Choosing one thing and staying with it: one project, one relationship, one practice. learning what depth in a single commitment feels like. (2) Sitting with difficult feelings rather than immediately reframing them. allowing the grief, frustration, or fear to complete before moving past it. (3) Noticing when the forward motion is genuine excitement versus when it is escape. (4) Developing a contemplative practice that trains the mind to stay in the present rather than leaping ahead. The virtue Sevens are growing toward is sobriety. not abstinence but a grounded, satisfied relationship with the present, which paradoxically makes genuine joy more available, not less."
      }
    ],
    wingDescriptions: {
      left: {
        name: "7w6, The Entertainer",
        description: "The Six wing brings loyalty, warmth, and relational depth into the Seven's expansive energy. Where the pure Seven tends to move through life with a certain freewheeling independence, the 7w6 is more anchored to specific people, communities, and commitments. Riso and Hudson observed that this wing makes the Seven more genuinely caring and socially responsible. they aren't just seeking the next experience but are building something with others. Naranjo noted that the Six wing introduces anxiety into the Seven's usual optimism: the 7w6 can be more worried, self-doubting, and relationship-conscious than the 7w8, experiencing the tension between wanting freedom and fearing the consequences of impermanence. They are often the most entertaining and relationally warm of the Seven subtypes. funny, engaging, and capable of genuine loyalty. The shadow: the Six wing's anxiety can appear as an undercurrent of worry that the Seven's usual optimism tries to outrun, creating an internal tension between enthusiasm and doubt. Growth invites the 7w6 to develop the Six's courage. the willingness to stay present with difficulty rather than escaping into novelty."
      },
      right: {
        name: "7w8, The Realist",
        description: "The Eight wing gives the Seven's enthusiasm a harder, more forceful edge. adding assertiveness, directness, and a capacity for confrontation that the 7w6 typically lacks. The 7w8 is typically more decisive, less concerned with social approval, and more willing to pursue what they want without apologizing for it. Chestnut observed that this wing produces a Seven who combines restless seeking with entrepreneurial drive: they don't just want experiences, they want to make things happen on a large scale. They tend to be more confident, impactful, and willing to take up space than the 7w6. Where the 7w6 manages anxiety through social connection, the 7w8 manages it through action, control, and sheer forward momentum. The shadow includes the Eight wing's tendencies toward excess and insensitivity: the 7w8 can become demanding, impulsive, and oblivious to impact in their pursuit of the next adventure or conquest. They may run roughshod over others' needs without noticing. Growth for the 7w8 involves developing the Eight's capacity for genuine vulnerability. slowing down enough to feel the costs of the relentless forward motion.",
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Ecstatic Appreciator", description: "At their healthiest, Sevens are deeply satisfied in the present moment with no need to move to the next thing. Joy comes from depth of engagement rather than novelty, and they bring a genuine exuberance to the full range of human experience, including its difficulties. Their gratitude is profound and authentic." },
        { level: 2, title: "The Freely Joyous Person", description: "Enthusiastic, creative, and genuinely present, Sevens at this level bring real joy and vision to their pursuits. They accomplish substantial things through focused enthusiasm and can stay with commitments long enough to bring them to completion. Their optimism is grounded rather than escapist." },
        { level: 3, title: "The Accomplished Generalist", description: "Versatile, energetic, and action-oriented, these Sevens channel their wide-ranging interests into genuine accomplishment. They are productive and capable across multiple domains, and their range and creativity genuinely enrich the people around them." },
      ],
      average: [
        { level: 4, title: "The Experienced Sophisticate", description: "Sevens begin accumulating experiences as a strategy for managing the fear of missing out. They compare options rather than committing, become restless when stimulation fades, and find it harder to stay present with anything that doesn't provide immediate engagement." },
        { level: 5, title: "The Hyperactive Escapist", description: "Scattered, impulsive, and over-stimulated, the Seven avoids anything that requires sustained discomfort. They become excessive in stimulation-seeking, scattered across too many commitments, and quietly anxious about whether anything will ever be enough." },
        { level: 6, title: "The Excessive Hedonist", description: "The Seven demands that their needs for stimulation and variety be met immediately and without constraint. They become demanding, entitled about getting what they want, and genuinely incapable of tolerating deprivation or limitation." },
      ],
      unhealthy: [
        { level: 7, title: "The Impulsive Escapist", description: "Reckless and impulsive, the Seven at this level pursues stimulation that harms themselves and others without meaningful pause for consequences. The flight from pain has become so desperate that nothing is off limits as long as it provides escape." },
        { level: 8, title: "The Manic Compulsive", description: "Manic behavior and addictive patterns emerge as the Seven's strategies for avoiding pain spiral into compulsion. They may use substances, extreme behavior, or compulsive activity to maintain stimulation and ward off the terror of stillness." },
        { level: 9, title: "The Panic-Stricken Hysteric", description: "When all escape routes close, the terror the Seven has spent a lifetime running from finally catches up. The breakdown is complete and often stunning in its intensity. the positive, expansive persona collapses entirely into the panic that was always underneath." },
      ],
    },
  },
  {
    number: 8,
    name: "The Challenger",
    alias: "The Protector",
    brief: "Eights move through the world at full force. direct, intense, protective, and fiercely independent. guarding a tenderness so ferocious they learned early to armor it completely. Lust here is not sexual excess but a preference for full contact with life: more intensity, more truth, more energy rather than less.",
    description: "Eights are self-confident, strong, and assertive. Protective, resourceful, straight-talking, and decisive, but can also be ego-centric and domineering. Eights feel they must control their environment, especially people, sometimes becoming confrontational and intimidating. They typically have problems with their tempers and with allowing themselves to be vulnerable.",
    coreMotivation: "To protect themselves, to determine their own course in life, to be strong and resist weakness.",
    coreFear: "Of being harmed or controlled by others.",
    coreDesire: "To protect themselves and be in control of their own life.",
    passion: "Lust/Excess (Ichazo). Bringing Full Intensity to Engagement. a high threshold for stimulation and a preference for direct, full contact with life: more energy, more truth, more presence rather than less. For the 8, this is simply how being alive feels. meeting the world at full force rather than at a careful remove. (Ichazo; also rendered as 'Excess'; elaborated by Naranjo)",
    fixation: "Tracking Where Power Lies and How It Is Being Used. a natural awareness of force dynamics in any situation: who holds authority, who is in a more vulnerable position, and whether power is being exercised fairly. This orientation shapes how the 8 reads every room, not as suspicion but as orientation. (Ichazo / Naranjo)",
    holyIdea: "Strength That Includes the Capacity for Openness. the higher recognition that force and tenderness are not opposites; that being fully powerful and being genuinely open to others are both part of honest, complete engagement with life. (Ichazo)",
    virtue: "Bringing Strength Into the Service of Others. the transformation of intensity into generosity: using one's capacity not to control outcomes but to protect and support the people and things one cares about. (Naranjo / Riso & Hudson)",
    defenseM: "Moving Forward Without Registering Emotional Impact. the process by which vulnerability, hurt, or being affected by others doesn't reach awareness before the 8 has already moved past it. This isn't a conscious suppression. these signals simply don't present as relevant information in the moment. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Powerful", "Decisive", "Protective", "Direct", "Self-confident"],
    healthyTraits: ["Magnanimous", "Heroic", "Merciful", "Forbearing", "Courageous"],
    averageTraits: ["Domineering", "Confrontational", "Intimidating", "Combative", "Willful"],
    unhealthyTraits: ["Ruthless", "Dictatorial", "Destructive", "Vengeful", "Megalomaniacal"],
    wings: { left: "8w7, The Maverick", right: "8w9, The Bear" },
    integrationLine: 2,
    disintegrationLine: 5,
    growthTips: [
      "Practice vulnerability with people you trust.",
      "Channel your power into caring for others (integration to 2).",
      "Notice when you're using control to avoid feeling vulnerable.",
      "Develop patience and listen before reacting.",
      "Recognize that true strength includes tenderness."
    ],
    journalPrompts: [
      "What am I protecting myself from right now?",
      "When did I last let someone see my vulnerable side?",
      "How can I use my strength to empower others today?",
      "What would gentleness look like in my current situation?",
      "Am I controlling because I'm strong, or because I'm afraid?"
    ],
    color: "#9B2C2C",
    icon: "",
    horneyGroup: 'aggressive',
    harmonicGroup: 'reactive',
    fullDescription: `The Eight's entire psychology is built around one foundational wound: vulnerability was weaponized against them. At some point, being soft or needy or open led to being hurt, controlled, or betrayed. and the Eight learned, with the characteristic thoroughness of this type, that this would never happen again. The result is a personality defined by force, directness, and an almost total intolerance for weakness in themselves: an armored system that protects an inner tenderness so fierce and so deep that even the Eight often doesn't fully know it's there.

The core motivation is to be strong and self-determining. to be in control of one's own life and to never be at the mercy of others. The core fear is of being harmed, controlled, or betrayed. Lust (Ichazo's passion) operates as an orientation toward intensity and full contact: Eights prefer direct engagement, high stakes, and the feeling of full force over anything careful or managed. They have a high threshold for stimulation. not because they are callous, but because ordinary levels of intensity feel flat.

At their best. integrating toward Type 2. Eights access genuine tenderness, warmth, and the desire to give without conditions. The force becomes protective rather than dominating. Healthy Eights use their extraordinary power in the service of others: championing the vulnerable, holding space for people who can't protect themselves, bringing their decisiveness and courage to causes larger than themselves. The innocence they access in integration is not naivety; it is a quality of full-hearted openness that the Eight's armor had been protecting all along.

Under stress. disintegrating toward Type 5. Eights can withdraw completely, becoming reclusive and secretive in ways that are completely at odds with their usual directness. The force and confrontation disappear and something much more private and withdrawn takes their place.

In relationships, Eights are among the most fiercely loyal and protective partners in the Enneagram. When they love, they love with their whole being. with generosity, protection, and a depth of commitment that can feel overwhelming. The challenge is the armor: Eights struggle to show vulnerability, to admit being hurt, or to let the partner see the soft places. They may push hard to see if the partner will push back, and respect only those who do.

Growth for Eights lies in innocence. a quality of open-hearted engagement with life that doesn't require armor, because it is grounded in something deeper than force. This is not weakness; it is the Eight discovering that strength and tenderness are not opposites, that being genuinely open is not the same as being vulnerable in the dangerous sense they learned as children.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Eights typically experienced early environments where being vulnerable or needy led to being hurt, controlled, or betrayed. This may have been a parent who punished softness, an environment where force was the only thing that was respected, or a specific experience of betrayal at a moment of genuine openness. The child's response was decisive: I will not let this happen again. I will be strong enough, direct enough, and powerful enough that no one can hurt me this way. The wound is: Softness is dangerous. Only force and self-sufficiency are safe. This conviction becomes the operating system that runs everything."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo identified the Eight's deep structure as 'lust'. a passion for intensity and full contact that operates as both a pleasure and a defense. The Eight's threshold for stimulation is higher than average: ordinary levels of engagement feel flat, and the Eight continually pushes toward more. more directness, more energy, more truth, more force. to feel fully alive. Denial (the defense mechanism) means the Eight genuinely doesn't register vulnerability or emotional impact as relevant information in real time. This isn't conscious suppression. the signal simply doesn't enter awareness before the Eight has already moved through and past the moment."
      },
      {
        title: "In Relationships",
        content: "Eights are among the most deeply loyal and fiercely protective partners in the Enneagram. Their love is total. they back the people they love with everything they have. The challenge is that this love is often expressed through protection and force rather than tenderness and vulnerability, and the softness that partners need may be inaccessible to the Eight, not because it doesn't exist but because showing it feels dangerous. Eights respect people who stand their ground. partners who defer endlessly lose their respect, while partners who push back and hold their own can earn a depth of trust that the Eight gives to very few."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 2, healthy Eights discover the enormous satisfaction of using their power in service of others. not to dominate but to protect and support. The force becomes generous rather than defensive. They access a warmth and tenderness that surprises people who've only seen the confrontational side. At their healthiest, Eights are genuinely magnanimous: people whose power creates safety for others, who use their extraordinary willpower and directness to champion those who can't protect themselves, who back their people without conditions and fight for what is right with a fierceness that is genuinely moving."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 5, stressed Eights withdraw completely. becoming reclusive, secretive, and private in ways that are shocking to people who know their usual directness. The force and confrontation disappear and something much more isolated and contained takes their place. The Eight retreats to a private inner world and cuts off contact, sometimes for extended periods. This is particularly confusing for people close to the Eight, who expect conflict resolution through direct engagement and instead get stonewalling and absence."
      },
      {
        title: "The Growth Path",
        content: "Eights grow by discovering innocence. Ichazo's term for the Eight's virtue, which describes a quality of open-hearted engagement that doesn't require armor. This is not naivety or passivity; it is the recognition that genuine strength doesn't require protection, that being open is different from being vulnerable in the dangerous sense they learned as children. Concrete practices: (1) Deliberately practicing vulnerability with people they trust. saying 'I was hurt' or 'I'm scared' when those are true, rather than immediately converting these feelings into force. (2) Sitting with others' experiences without immediately moving to fix or confront. (3) Noticing the tenderness that arises when the armor comes off in moments of genuine safety. (4) Learning to channel force in service of others rather than in service of self-protection. The virtue Eights are growing toward is innocence. a full-hearted, open engagement with life that is the opposite of armored, and that paradoxically makes them more powerful, not less."
      }
    ],
    wingDescriptions: {
      left: {
        name: "8w7, The Maverick",
        description: "The Seven wing adds restless energy, entrepreneurial drive, and visionary expansiveness to the Eight's raw power. The 8w7 combines the Eight's force and directness with the Seven's appetite for new experiences, new ideas, and new conquests. Riso and Hudson observed that this wing makes the Eight more outwardly engaging and less purely confrontational. they want to build empires and experience everything, not just dominate. Chestnut notes that the 8w7 is typically more charming, more playful, and more idealistic than the 8w9, leading with vision and enthusiasm as much as with force. They are natural entrepreneurs, innovators, and change agents who prefer motion to stability. The shadow: the Seven wing amplifies the Eight's tendencies toward excess and self-indulgence. the 8w7 can become scattered, impulsive, and oblivious to the emotional toll of their relentless forward drive. They may resist the slowing down that genuine intimacy or accountability requires. Growth for the 8w7 involves discovering depth: the willingness to stop expanding long enough to fully inhabit what has already been built, and to allow vulnerability to coexist with power."
      },
      right: {
        name: "8w9, The Bear",
        description: "The Nine wing brings a quality of quiet, patient, grounded strength to the Eight's intensity. Where the 8w7 is visibly forceful and expansive, the 8w9 is more understated, more stable, and paradoxically more naturally powerful precisely because they don't need to assert themselves constantly. Naranjo described this combination as producing a steady, massive, unhurried quality. like a mountain. They are capable of great patience, deep loyalty, and a kind of contained authority that commands respect without demanding it. Chestnut notes that the 8w9 is more comfortable with stillness and routine than the 8w7, and their protective instincts are typically directed toward specific people and communities rather than toward world domination. The Nine wing also introduces a risk of stubbornness and passive resistance: the 8w9 can dig in very quietly and be immovable without overt confrontation. They may use Nine's inertia as a subtle form of control. Growth for the 8w9 involves learning to be vulnerable in relational terms. showing up fully present rather than just reliably formidable.",
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Magnanimous Leader", description: "At their healthiest, Eights use their power and strength genuinely in service of others. Magnanimous, merciful, and courageous, they protect the vulnerable with the same force they once used for self-protection. Their tenderness is as formidable as their strength, and they inspire extraordinary loyalty." },
        { level: 2, title: "The Decisive Hero", description: "Authoritative, generous, and genuinely protective, Eights at this level lead with both clarity and care. They make decisions well, follow through on their commitments, and bring out strength in those around them rather than dominating them. They are genuinely inspiring leaders." },
        { level: 3, title: "The Enterprising Powerhouse", description: "Resourceful, self-reliant, and direct, these Eights take initiative and lead effectively in challenging circumstances. They bring real energy and capability to their pursuits and are genuinely invested in the wellbeing of those in their care." },
      ],
      average: [
        { level: 4, title: "The Domineering Tough Guy", description: "Power becomes increasingly self-serving as the Eight's protective instinct turns into control. They begin managing others rather than empowering them, and their directness shades into intimidation. The gap between protecting and dominating is narrowing." },
        { level: 5, title: "The Confrontational Adversary", description: "Anticipating resistance and responding aggressively, Eights at this level see every interaction through the lens of potential challenge. They intimidate without intending to, test others' strength as a matter of habit, and have difficulty tolerating what they perceive as weakness." },
        { level: 6, title: "The Intimidating Bully", description: "Dominating others without mercy to maintain control. The Eight's force is now primarily directed toward ensuring that no one can threaten or constrain them. They may justify their behavior as necessary strength, unable to see the harm they are causing." },
      ],
      unhealthy: [
        { level: 7, title: "The Ruthless Tyrant", description: "Total domination through fear and force. The Eight at this level uses others as instruments of their will, unable to acknowledge any perspective but their own. Their terror of weakness and vulnerability has become so extreme that they have eliminated any check on their own destructiveness." },
        { level: 8, title: "The Omnipotent Megalomaniac", description: "Grandiose conviction in their own power and right to rule. The Eight believes they are entitled to whatever they can take, that their vision justifies any cost to others, and that those who suffer from their actions simply weren't strong enough to deserve better." },
        { level: 9, title: "The Violent Destroyer", description: "If unable to control, they destroy. The Eight's force turns wholly destructive when the compulsion to dominate can no longer be satisfied through ordinary means. This is the Eight's deepest shadow: the protector becomes the threat they most feared encountering." },
      ],
    },
  },
  {
    number: 9,
    name: "The Peacemaker",
    alias: "The Mediator",
    brief: "Nines have learned to dissolve their own will so thoroughly that they often can't locate what they actually want. the peace they create is genuine, but it comes at the cost of their own presence. Sloth here is not laziness but a deep, habituated self-forgetting so complete that asserting their own agenda can feel like an act of violence against harmony.",
    description: "Nines are accepting, trusting, and stable. They are usually creative, optimistic, and supportive, but can also be too willing to go along with others to keep the peace. They want everything to go smoothly and be without conflict, but they can also tend to be complacent, simplifying problems and minimizing anything upsetting. They typically have problems with inertia and stubbornness.",
    coreMotivation: "To have inner stability, peace of mind, to create harmony in their environment, to avoid conflict.",
    coreFear: "Of loss and separation, of annihilation.",
    coreDesire: "To have inner stability and peace of mind.",
    passion: "Sloth/Indolence (Ichazo). A Natural Orientation Toward Peace and Continuity With What's Around. an easy attunement to the people, environments, and rhythms nearby that creates a stable, comfortable sense of things. For the 9, this feels like being adaptable, easy to be around, and genuinely attuned to others. a way of moving through the world that prioritizes harmony and steadiness. (Ichazo; elaborated by Naranjo in Character & Neurosis)",
    fixation: "Attention That Spreads Outward Rather Than Concentrating Inward. a natural tendency for awareness to move toward what's around. other people, shared activities, familiar patterns. rather than converging on one's own priorities, preferences, or needs. (Ichazo / Naranjo)",
    holyIdea: "Genuine Connection That Includes Rather Than Erases the Self. the higher recognition that real harmony and unity don't require disappearing into the background; that being distinctly present as yourself is not a disruption to peace but its fullest expression. (Ichazo)",
    virtue: "Directed Movement Toward What Matters Most. the capacity to know what is genuinely important to you and move toward it consistently, rather than letting attention and energy diffuse across what's comfortable, familiar, or already established. (Naranjo / Riso & Hudson)",
    defenseM: "Maintaining a Comfortable State Through Familiar Routines and Activities. a natural reliance on habitual patterns, repetitive comforts, and background activities that keep inner experience in a steady, low-friction register. What is unfamiliar, demanding, or self-directed tends to receive less attention than what is already established and comfortable. (Riso & Hudson, The Wisdom of the Enneagram)",
    keyTraits: ["Peaceful", "Easygoing", "Receptive", "Agreeable", "Supportive"],
    healthyTraits: ["Self-possessed", "Dynamic", "Healing", "Serene", "Connected"],
    averageTraits: ["Complacent", "Passive-aggressive", "Disengaged", "Stubborn", "Numb"],
    unhealthyTraits: ["Neglectful", "Dissociated", "Helpless", "Depersonalized", "Obstinate"],
    wings: { left: "9w8, The Referee", right: "9w1, The Dreamer" },
    integrationLine: 3,
    disintegrationLine: 6,
    growthTips: [
      "Practice asserting your own needs and preferences.",
      "Take action on your goals rather than merging with others' agendas (integration to 3).",
      "Notice when you're numbing out or going on autopilot.",
      "Develop your own passions and sense of purpose.",
      "Recognize that healthy conflict can lead to deeper connection."
    ],
    journalPrompts: [
      "What do I actually want, separate from what others want for me?",
      "Where in my life am I on autopilot?",
      "What conflict am I avoiding, and what would happen if I addressed it?",
      "What goal have I been putting off that matters to me?",
      "How can I show up more fully and energetically today?"
    ],
    color: "#8B7355",
    icon: "",
    horneyGroup: 'withdrawn',
    harmonicGroup: 'positive_outlook',
    fullDescription: `The Nine's psychology is built around a fundamental self-erasure that feels, from the inside, like equanimity. The Nine has learned. so thoroughly that it operates entirely below the level of choice. to merge with their environment, to take on the coloring of whoever they're with, to minimize their own presence in the service of maintaining peace. This is not passivity in the simple sense; it is an active, continuous process of self-forgetting that keeps the Nine out of the center, out of conflict, and out of contact with the disruptive energy of their own distinct wants and needs.

The core motivation is to have inner peace and to maintain harmony in their environment. not because Nines are conflict-averse in a fearful way, but because disruption to the connection between themselves and others feels existentially threatening. The core fear is of loss and separation, of annihilation. the terror that asserting themselves will cost them the connection that makes existence feel stable and real. Sloth (Ichazo's passion) is not laziness but a specific indolence toward the self: the Nine's energy flows outward toward others and shared activities and familiar patterns, while the work of discerning and pursuing their own priorities receives almost none.

At their best. integrating toward Type 3. Nines become dynamic, self-directed, and genuinely effective. They discover that having goals and moving toward them with their own energy doesn't destroy harmony. it creates a more vital, genuine connection than the self-erasure they've been practicing. Healthy Nines are among the most genuinely healing presences in the Enneagram: people whose peace is real rather than performed, who are completely accepting without being absent.

Under stress. disintegrating toward Type 6. Nines can become anxious, hypervigilant, and suspicious, suddenly alert to all the potential threats they'd been successfully ignoring. The numbness and autopilot break down and something much more reactive and worried takes their place.

In relationships, Nines are warm, accommodating, and genuinely easy to be with. the most naturally receptive type, able to hold space for others with remarkable grace. The challenge is their presence: the Nine can be in a relationship for years without their partner truly knowing what the Nine wants, fears, or feels. Partners can feel that they're connecting with a mirror rather than a distinct person. Growth in relationship requires the Nine learning that their own preferences, desires, and disagreements are not disruptive. they are the necessary ingredients of genuine intimacy.

Growth for Nines lies in right action. taking directed, purposeful action toward what genuinely matters to them, which requires first doing the often frightening work of locating what that is. The Nine's growth is not about becoming more forceful or confrontational; it is about becoming more present, more distinctly themselves, which paradoxically enriches rather than disrupts the connections they care so deeply about.`,
    dropdownSections: [
      {
        title: "The Core Wound",
        content: "Nines typically grew up in environments where their presence. their distinctive wants, feelings, and perspectives. didn't seem to matter much, or where asserting themselves caused disruption that felt dangerous to the connection they needed. The child learned that being easy, accommodating, and undemanding was the safest way to maintain belonging. Over time, the habit of self-forgetting became so automatic that the Nine genuinely lost contact with their own preferences, needs, and inner life. The wound is: My presence and my preferences are a disruption. I must disappear into the background to maintain connection. The tragedy is that this strategy, while effective at preventing overt conflict, creates a deeper loneliness: being with people while not being truly seen by them."
      },
      {
        title: "What They're Really Doing",
        content: "Naranjo identified the Nine's deep structure as psychic laziness. a specific indolence toward the self's own agenda. The Nine's energy flows freely toward others, toward shared activities, toward maintaining the established peace. but when it comes to discerning and pursuing what the Nine themselves want, a strange friction appears. Narcotization (the defense mechanism) keeps the Nine comfortable and undisturbed through familiar routines, background activities, and habitual patterns that maintain a low-friction inner state. This isn't conscious avoidance; the Nine genuinely experiences these patterns as satisfying, because they are familiar and because they don't require the Nine to locate and assert their own agenda."
      },
      {
        title: "In Relationships",
        content: "Nines are among the most genuinely accepting and accommodating partners. they don't project, they don't demand, and they hold space for their partners with real grace. The challenge is their presence: over time, partners may feel they're with someone who agrees with everything and initiates nothing, who supports but never leads, who accommodates but never asserts. This can produce a subtle loneliness in the partner who wants to know what the Nine actually wants, actually feels, and actually thinks. Growth requires the Nine to risk their presence. to say what they want, what bothers them, and what they need, even when doing so feels disruptive."
      },
      {
        title: "At Their Best",
        content: "Integrating toward Type 3, healthy Nines become dynamic, purposeful, and genuinely self-directed. They discover that having their own goals and pursuing them with real energy doesn't destroy harmony. it creates a more vital, genuine connection than the self-erasure they'd been practicing. The peace they access is no longer the peace of self-absence but the peace of genuine presence: a person who is distinctly themselves while remaining deeply connected to the people and environments they love. At their healthiest, Nines are profoundly healing to be with. people who are completely accepting without being absent, completely present without being demanding."
      },
      {
        title: "Under Stress",
        content: "Disintegrating toward Type 6, stressed Nines become anxious, hypervigilant, and worried in ways that are jarring after their usual stability. The numbness and self-forgetting that normally keep the Nine comfortable give way to sudden awareness of all the threats they'd been successfully tuning out. They may become suspicious, reactive, and dependent in ways that seem completely unlike the easygoing person they usually present. This disintegration often happens when the Nine has been pushed too far to maintain the self-erasure, and the accumulated anxiety of years of unaddressed needs suddenly becomes visible."
      },
      {
        title: "The Growth Path",
        content: "Nines grow by developing right action. the capacity to locate what genuinely matters to them and move toward it with consistent, directed energy. This requires the often frightening work of asking 'What do I actually want?' and tolerating the discomfort of discovering the answer. Concrete practices: (1) Daily self-check-ins that interrupt the automatic outward flow of attention: What do I feel right now? What do I need today? What is important to me this week? (2) Practicing saying what they want and what bothers them in low-stakes situations, building tolerance for the friction of self-assertion. (3) Noticing when they've merged with another person's agenda and gently returning to their own. (4) Physical practices that connect the Nine to their body and interrupt the numbing autopilot. The virtue Nines are growing toward is right action. taking purposeful, self-directed steps toward what matters, which paradoxically deepens rather than disrupts the harmony they value so deeply."
      }
    ],
    wingDescriptions: {
      left: {
        name: "9w8, The Referee",
        description: "The Eight wing gives the Nine's natural peacemaking a quality of quiet, contained force that most people never see coming. The 9w8 is not the typical accommodating Nine. they can hold ground, assert themselves, and when genuinely pushed, respond with a directness and even fierceness that surprises those who have only experienced their easygoing exterior. Riso and Hudson describe this wing as combining the Nine's receptive presence with a physical groundedness and instinctual forcefulness that the 9w1 typically lacks. Chestnut notes that the 9w8 tends to be more hedonistic, more physically present, and more comfortable with direct confrontation when they reach their limit. They often have a natural authority and earthy solidity that makes others feel protected. The shadow: the Eight wing can make the 9w8's eventual anger more explosive. all the accumulated self-forgetting of the Nine combined with the Eight's capacity for force. They may oscillate between long stretches of accommodation and sudden, surprising assertion. Growth invites the 9w8 to develop the Eight's virtue of directness as a regular practice, not just a last resort."
      },
      right: {
        name: "9w1, The Dreamer",
        description: "The One wing brings idealism, principled ethics, and a quality of moral sensitivity to the Nine's peaceful acceptance. Where the 9w8 grounds the Nine's energy in physicality and instinctual force, the 9w1 elevates it toward vision, structure, and a quietly maintained standard of how things should be. Naranjo observed that this wing produces a type with genuine inner refinement. the 9w1 tends to be more aesthetically sensitive, more conscientious, and more privately perfectionistic than the 9w8. They often have clear values and a quiet commitment to those values that can look like passive indifference from outside but is actually principled non-engagement with what violates their sense of rightness. They are less confrontational than the 9w8 but can be more stubborn in a principled way. Chestnut notes that the 9w1 is more self-critical than is typical for Nines. the One's inner critic operates quietly beneath the Nine's characteristic calm. Growth for the 9w1 involves learning to bring their clear inner standards into active self-expression rather than passive ideal-maintenance: to assert, to create, to take up space with what they actually believe.",
      },
    },
    levels: {
      healthy: [
        { level: 1, title: "The Self-Possessed Guide", description: "At their healthiest, Nines are fully present and distinctly themselves while remaining genuinely open to others. Their peace is dynamic rather than passive. they bring a quality of settled, grounded presence that genuinely heals and orients those around them. They can engage conflict and difficulty without losing themselves." },
        { level: 2, title: "The Receptive Person", description: "Open, supportive, and genuinely present, Nines at this level create a quality of acceptance and safety that allows others to be fully themselves. They maintain their own perspective and preferences while remaining authentically responsive to those they care about." },
        { level: 3, title: "The Supportive Peacemaker", description: "Easygoing, reassuring, and skilled at bringing people together, these Nines are genuinely stabilizing presences in any group. They bring real equanimity to conflict and difficulty, and their acceptance creates space for genuine resolution rather than superficial peace." },
      ],
      average: [
        { level: 4, title: "The Accommodating Role-Player", description: "Self-forgetting accelerates as the Nine begins merging with others' agendas and priorities. They become increasingly passive and conflict-averse, losing track of their own preferences in the process of accommodating everyone else's. Inner numbness begins to replace genuine peace." },
        { level: 5, title: "The Disengaged Participant", description: "Stubborn inertia and passive resistance to change. The Nine goes through the motions of participation without genuine engagement. They may appear calm while being deeply disconnected from their own life, using familiar routines to maintain the appearance of function." },
        { level: 6, title: "The Resigned Fatalist", description: "Numbed out through habitual routines and background activities, the Nine has become genuinely dissociated from their own experience. They accept poor circumstances without complaint, not from equanimity but from an inability to locate the energy of self-advocacy." },
      ],
      unhealthy: [
        { level: 7, title: "The Dissociating Automaton", description: "Complete disengagement from responsibility, aliveness, and genuine presence. The Nine at this level allows harm through inaction, unable to mobilize the energy required for genuine engagement. The self has become so thoroughly erased that nothing feels worth responding to." },
        { level: 8, title: "The Neglectful Depressive", description: "Losing the sense of a self altogether as the strategy of self-erasure finally collapses inward. Anxiety and depression erupt as the numbing fails. The Nine may become genuinely catatonic or so passive that they require others to manage basic functions of their life." },
        { level: 9, title: "The Dissociated Multiple", description: "Complete dissolution of the integrated self. The Nine at this final level may develop significant dissociative symptoms as the accumulated weight of a lifetime of self-forgetting finally overwhelms the psychological system. The personality fragments without the coherent self to hold it together." },
      ],
    },
  }
];

// Questionnaire based on discriminating constructs from Riso-Hudson (RHETI validation),
// Naranjo's character & neurosis, and Wagner Enneagram Personality Style Scales (WEPSS).
// Items target core motivations, defense mechanisms, and fixations rather than
// surface behaviors, which reduces social desirability bias and cross-type contamination.
export const enneagramQuestions = [
  {
    id: 1,
    text: "When you look honestly at what drives most of your behavior, which is closest?",
    options: [
      { text: "A need to avoid being wrong, corrupt, or falling short of my own standards", scores: { 1: 3 } },
      { text: "A need to feel that specific people love and need me personally", scores: { 2: 3 } },
      { text: "A need to feel valuable through what I accomplish and how I'm perceived", scores: { 3: 3 } },
      { text: "A need to find and express my authentic identity, distinct from everyone else", scores: { 4: 3 } }
    ]
  },
  {
    id: 2,
    text: "Continuing, which of these core drives feels most honest?",
    options: [
      { text: "A need to understand how things work so I feel prepared for the world", scores: { 5: 3 } },
      { text: "A need for certainty, security, and knowing where I stand", scores: { 6: 3 } },
      { text: "A need to stay free, stimulated, and never trapped in pain or deprivation", scores: { 7: 3 } },
      { text: "A need to be strong, autonomous, and never at the mercy of others", scores: { 8: 3 } }
    ]
  },
  {
    id: 3,
    text: "When you are most stressed, which pattern do you fall into?",
    options: [
      { text: "I become rigidly critical, of myself and everyone around me", scores: { 1: 3 } },
      { text: "I become possessive and intrusive, I need to be needed more intensely", scores: { 2: 3 } },
      { text: "I merge with others' agendas and go numb to my own desires and anger", scores: { 9: 3 } },
      { text: "I become scattered and impulsive, I grab at whatever promises relief", scores: { 7: 3 } }
    ]
  },
  {
    id: 4,
    text: "Which inner experience feels most chronically present for you?",
    options: [
      { text: "A constant inner evaluator comparing what IS to what SHOULD BE", scores: { 1: 3 } },
      { text: "A sense that others have something essential that I'm missing", scores: { 4: 3 } },
      { text: "A scanning vigilance, checking for hidden threats or inconsistencies", scores: { 6: 3 } },
      { text: "A feeling that the world is intrusive and I must protect my inner resources", scores: { 5: 3 } }
    ]
  },
  {
    id: 5,
    text: "Which describes your relationship with anger most honestly?",
    options: [
      { text: "I experience anger as simmering resentment that I try to control because expressing it feels wrong", scores: { 1: 3 } },
      { text: "I express anger directly and forcefully, I'd rather be too much than too weak", scores: { 8: 3 } },
      { text: "I rarely feel angry, I tend to go along with things and avoid rocking the boat", scores: { 9: 3 } },
      { text: "My anger comes out as anxious reactivity, I get defensive before I realize I'm angry", scores: { 6: 3 } }
    ]
  },
  {
    id: 6,
    text: "When you receive criticism, what is your deepest internal response?",
    options: [
      { text: "I feel shame that I wasn't good enough and redouble my effort to be beyond reproach", scores: { 1: 3 } },
      { text: "I feel hurt that my giving and caring wasn't recognized or valued", scores: { 2: 3 } },
      { text: "I feel threatened, is this person trustworthy? What are they really after?", scores: { 6: 3 } },
      { text: "I feel exposed, like they've seen something deficient in me that I can't fix", scores: { 4: 3 } }
    ]
  },
  {
    id: 7,
    text: "Which defense mechanism do you recognize most in yourself?",
    options: [
      { text: "Transforming unacceptable impulses into their opposite, wanting to be lazy but becoming compulsively productive", scores: { 1: 3 } },
      { text: "Pushing my own needs out of awareness so I can focus on being there for others", scores: { 2: 3 } },
      { text: "Becoming so identified with my role or image that I lose track of my actual feelings", scores: { 3: 3 } },
      { text: "Separating my thinking from my feeling, I can analyze emotions without actually experiencing them", scores: { 5: 3 } }
    ]
  },
  {
    id: 8,
    text: "Which defense mechanism do you recognize most in yourself?",
    options: [
      { text: "Absorbing emotional experiences and making them part of my identity rather than processing and releasing them", scores: { 4: 3 } },
      { text: "Attributing my own inner states onto others, seeing my fears or aggression as coming from them", scores: { 6: 3 } },
      { text: "Using mental agility to reframe negatives as positives, finding silver linings to avoid sitting with pain", scores: { 7: 3 } },
      { text: "Refusing to acknowledge vulnerability, tenderness, or the impact of my intensity on others", scores: { 8: 3 } }
    ]
  },
  {
    id: 9,
    text: "Which statement about your self-image is most true?",
    options: [
      { text: "I see myself as a reasonable, principled person who maintains higher standards than most", scores: { 1: 3 } },
      { text: "I see myself as a generous, caring person who is more attuned to others' needs than most people are", scores: { 2: 3 } },
      { text: "I see myself as a competent, effective person who can succeed at whatever I set my mind to", scores: { 3: 3 } },
      { text: "I see myself as a unique, emotionally complex person who experiences life more deeply than most", scores: { 4: 3 } }
    ]
  },
  {
    id: 10,
    text: "Which statement about your self-image is most true?",
    options: [
      { text: "I see myself as a perceptive, independent thinker who understands things others miss", scores: { 5: 3 } },
      { text: "I see myself as a loyal, responsible person who anticipates problems before they happen", scores: { 6: 3 } },
      { text: "I see myself as an enthusiastic, versatile person who makes the most of life's possibilities", scores: { 7: 3 } },
      { text: "I see myself as a strong, direct person who protects the people and causes I believe in", scores: { 8: 3 } }
    ]
  },
  {
    id: 11,
    text: "What happens when you feel overwhelmed?",
    options: [
      { text: "I detach emotionally and retreat into my mind to analyze the situation from a safe distance", scores: { 5: 3 } },
      { text: "I numb out through comfortable routines, food, TV, sleep, anything to avoid the intensity", scores: { 9: 3 } },
      { text: "I get busy, I channel the overwhelm into productive action so I don't have to feel it", scores: { 3: 3 } },
      { text: "I seek out someone who can absorb my emotional intensity and hold space for me", scores: { 4: 2, 6: 1 } }
    ]
  },
  {
    id: 12,
    text: "What is the deepest fear you avoid confronting?",
    options: [
      { text: "That I am fundamentally flawed or corrupt at my core", scores: { 1: 3 } },
      { text: "That without my helpfulness, nobody would actually want me around", scores: { 2: 3 } },
      { text: "That beneath my accomplishments, I have no inherent value as a person", scores: { 3: 3 } },
      { text: "That I am fundamentally deficient, that everyone else got something I was denied", scores: { 4: 3 } }
    ]
  },
  {
    id: 13,
    text: "What is the deepest fear you avoid confronting?",
    options: [
      { text: "That the world will overwhelm and deplete me if I don't vigilantly guard my resources", scores: { 5: 3 } },
      { text: "That I can't trust my own judgment and am unable to survive on my own", scores: { 6: 3 } },
      { text: "That if I stop moving and face my inner experience, I'll be trapped in unbearable pain", scores: { 7: 3 } },
      { text: "That showing vulnerability will allow others to control or destroy me", scores: { 8: 3 } }
    ]
  },
  {
    id: 14,
    text: "Which describes your experience of personal identity most accurately?",
    options: [
      { text: "I have a strong moral identity, I know what's right, and that certainty defines me", scores: { 1: 3 } },
      { text: "My identity shifts depending on context, I become what the situation needs me to be", scores: { 3: 2, 9: 1 } },
      { text: "My identity is built on being different, authentic, and emotionally deep", scores: { 4: 3 } },
      { text: "I sometimes feel like I don't have a clear identity at all, I merge with others' perspectives", scores: { 9: 3 } }
    ]
  },
  {
    id: 15,
    text: "How do you relate to the concept of 'enough'?",
    options: [
      { text: "Nothing is ever quite good enough, there's always a way it could be better", scores: { 1: 3 } },
      { text: "I never give enough, I could always do more for the people I care about", scores: { 2: 3 } },
      { text: "I never achieve enough, there's always the next level to reach", scores: { 3: 3 } },
      { text: "I never have enough depth, ordinary experience feels insufficient", scores: { 4: 3 } }
    ]
  },
  {
    id: 16,
    text: "How do you relate to the concept of 'enough'?",
    options: [
      { text: "I never know enough, there's always more I need to understand before I can act", scores: { 5: 3 } },
      { text: "I'm never certain enough, there's always another variable I haven't accounted for", scores: { 6: 3 } },
      { text: "I never have enough options, closing a door feels like losing a possibility forever", scores: { 7: 3 } },
      { text: "Nothing is ever intense enough, I keep pushing for more impact, more life, more everything", scores: { 8: 3 } }
    ]
  },
  {
    id: 17,
    text: "When a close relationship ends, what is your most immediate internal response?",
    options: [
      { text: "I analyze what went wrong, where did I fail to live up to the standard?", scores: { 1: 2, 5: 1 } },
      { text: "I feel abandoned and unlovable, clearly I wasn't needed enough", scores: { 2: 3 } },
      { text: "I immediately start building a narrative about what I lost, the beautiful tragedy of it", scores: { 4: 3 } },
      { text: "I distract myself quickly, I don't want to sit in this pain", scores: { 7: 2, 3: 1 } }
    ]
  },
  {
    id: 18,
    text: "When a close relationship ends, what is your most immediate internal response?",
    options: [
      { text: "I withdraw and need extensive alone time to process, people are exhausting right now", scores: { 5: 3 } },
      { text: "I question everything, was this person ever really trustworthy?", scores: { 6: 3 } },
      { text: "I get angry, no one walks away from me without consequences", scores: { 8: 3 } },
      { text: "I feel the loss but try to be okay with it, getting upset won't help anyone", scores: { 9: 3 } }
    ]
  },
];

