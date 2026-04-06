export interface InstinctualQuestion {
  id: number;
  optionA: { text: string; instinct: "sp" | "sx" | "so" };
  optionB: { text: string; instinct: "sp" | "sx" | "so" };
}

// 30 forced-choice questions: 10 sp vs sx, 10 sp vs so, 10 sx vs so
export const instinctualQuestions: InstinctualQuestion[] = [
  // ── SP vs SX (10 questions) ──────────────────────────────────────────────
  {
    id: 1,
    optionA: { text: "I feel most settled when my finances, health, and home are in order.", instinct: "sp" },
    optionB: { text: "I feel most alive when I have an intense, charged connection with someone.", instinct: "sx" },
  },
  {
    id: 2,
    optionA: { text: "I regularly check in on my physical energy and make sure I'm not running on empty.", instinct: "sp" },
    optionB: { text: "I chase experiences that feel electric and alive, even if they're destabilizing.", instinct: "sx" },
  },
  {
    id: 3,
    optionA: { text: "Having a stocked fridge, a safe home, and money in the bank genuinely calms me.", instinct: "sp" },
    optionB: { text: "A deep, resonant conversation with one person is more fulfilling than any practical comfort.", instinct: "sx" },
  },
  {
    id: 4,
    optionA: { text: "I tend to think carefully about risks to my health, safety, or resources before acting.", instinct: "sp" },
    optionB: { text: "I'm drawn to people and situations that have a magnetic, almost irresistible pull.", instinct: "sx" },
  },
  {
    id: 5,
    optionA: { text: "I'm more focused on making sure my daily life is stable and comfortable than on exciting connections.", instinct: "sp" },
    optionB: { text: "I'd rather have one deeply intimate relationship than a stable but emotionally flat life.", instinct: "sx" },
  },
  {
    id: 6,
    optionA: { text: "I notice when I'm getting tired, hungry, or uncomfortable, and I take care of it promptly.", instinct: "sp" },
    optionB: { text: "I notice immediately when there's chemistry or tension between myself and someone else.", instinct: "sx" },
  },
  {
    id: 7,
    optionA: { text: "Self-sufficiency — being able to take care of myself — is a core value for me.", instinct: "sp" },
    optionB: { text: "Merging fully with another person or experience — losing the boundary — is something I crave.", instinct: "sx" },
  },
  {
    id: 8,
    optionA: { text: "I plan ahead for my material needs: food, rest, finances, health appointments.", instinct: "sp" },
    optionB: { text: "I tend to fixate on one person or pursuit with a kind of obsessive intensity.", instinct: "sx" },
  },
  {
    id: 9,
    optionA: { text: "I feel restless and anxious when my physical environment feels unsafe or unstable.", instinct: "sp" },
    optionB: { text: "I feel restless and anxious when there's no intense connection or spark in my life.", instinct: "sx" },
  },
  {
    id: 10,
    optionA: { text: "I'm most at peace when I've handled the practical basics and things feel under control.", instinct: "sp" },
    optionB: { text: "I'm most at peace when I feel deeply seen and wanted by someone who matters to me.", instinct: "sx" },
  },

  // ── SP vs SO (10 questions) ──────────────────────────────────────────────
  {
    id: 11,
    optionA: { text: "I prioritize my own physical wellbeing and comfort over fitting into group expectations.", instinct: "sp" },
    optionB: { text: "I care deeply about how I'm perceived and what role I play in my community.", instinct: "so" },
  },
  {
    id: 12,
    optionA: { text: "I'd rather be self-reliant and take care of my own needs than depend on a group for support.", instinct: "sp" },
    optionB: { text: "I feel more secure when I know my place within a group and feel like I belong.", instinct: "so" },
  },
  {
    id: 13,
    optionA: { text: "My home and personal space are important sanctuaries I invest a lot of care into.", instinct: "sp" },
    optionB: { text: "Being known and respected within my social circle matters deeply to me.", instinct: "so" },
  },
  {
    id: 14,
    optionA: { text: "I focus on getting my own material life in order before worrying about contributing to others.", instinct: "sp" },
    optionB: { text: "I'm attuned to group dynamics and I naturally read what a room needs from me.", instinct: "so" },
  },
  {
    id: 15,
    optionA: { text: "A quiet life of physical comfort and private stability appeals to me more than a public one.", instinct: "sp" },
    optionB: { text: "I want to contribute something meaningful to a community or cause larger than myself.", instinct: "so" },
  },
  {
    id: 16,
    optionA: { text: "I keep close track of my health, sleep, and nutrition as part of my regular routine.", instinct: "sp" },
    optionB: { text: "I keep close track of social dynamics: who's in, who's out, how I'm being perceived.", instinct: "so" },
  },
  {
    id: 17,
    optionA: { text: "I prefer to handle my own problems privately rather than bring them to a group.", instinct: "sp" },
    optionB: { text: "I prefer to solve problems collaboratively and I naturally involve others in decisions.", instinct: "so" },
  },
  {
    id: 18,
    optionA: { text: "Physical safety and material security are the foundation everything else is built on.", instinct: "sp" },
    optionB: { text: "Social standing and community belonging are the foundation everything else is built on.", instinct: "so" },
  },
  {
    id: 19,
    optionA: { text: "I can go a long time without socializing as long as my personal needs are met.", instinct: "sp" },
    optionB: { text: "I feel lost and directionless when I don't have a clear role or place in a group.", instinct: "so" },
  },
  {
    id: 20,
    optionA: { text: "I'm more motivated by personal comfort and security than by status or recognition.", instinct: "sp" },
    optionB: { text: "I'm more motivated by my reputation and standing in the eyes of others than by comfort.", instinct: "so" },
  },

  // ── SX vs SO (10 questions) ──────────────────────────────────────────────
  {
    id: 21,
    optionA: { text: "I'd rather have one extraordinary, all-consuming connection than a wide social network.", instinct: "sx" },
    optionB: { text: "I'd rather be well-connected in a community and known by many than intensely bonded with one person.", instinct: "so" },
  },
  {
    id: 22,
    optionA: { text: "Chemistry between myself and another person is something I'm constantly reading for.", instinct: "sx" },
    optionB: { text: "Group chemistry and whether I fit into a social setting is something I'm constantly reading for.", instinct: "so" },
  },
  {
    id: 23,
    optionA: { text: "I'm drawn to people who feel magnetic or irresistible to me, even if they're difficult.", instinct: "sx" },
    optionB: { text: "I'm drawn to groups and communities where I can contribute and be recognized.", instinct: "so" },
  },
  {
    id: 24,
    optionA: { text: "The most important thing in a relationship is depth, intensity, and real intimacy.", instinct: "sx" },
    optionB: { text: "The most important thing in a relationship is a sense of shared values and belonging.", instinct: "so" },
  },
  {
    id: 25,
    optionA: { text: "I'd rather be deeply, passionately seen by one person than vaguely liked by many.", instinct: "sx" },
    optionB: { text: "I'd rather be broadly respected and valued across my community than intensely bonded with one person.", instinct: "so" },
  },
  {
    id: 26,
    optionA: { text: "I often experience a kind of hunger or longing that feels hard to name — a search for the right connection.", instinct: "sx" },
    optionB: { text: "I often feel restless until I know my role and contribution within a group are secure.", instinct: "so" },
  },
  {
    id: 27,
    optionA: { text: "I can lose track of time in an intense one-on-one conversation or experience.", instinct: "sx" },
    optionB: { text: "I can lose track of time when I'm fully engaged in a group activity or community project.", instinct: "so" },
  },
  {
    id: 28,
    optionA: { text: "Being deeply desired or chosen by someone specific matters more to me than broad social approval.", instinct: "sx" },
    optionB: { text: "Being respected and valued by my broader community matters more than intense one-on-one passion.", instinct: "so" },
  },
  {
    id: 29,
    optionA: { text: "I notice immediately when the energy between me and another person shifts — even subtly.", instinct: "sx" },
    optionB: { text: "I notice immediately when the social dynamics in a room shift and how it affects my place in it.", instinct: "so" },
  },
  {
    id: 30,
    optionA: { text: "What I want most from life is to experience profound, transformative closeness with another.", instinct: "sx" },
    optionB: { text: "What I want most from life is to belong, to contribute, and to be genuinely known in my community.", instinct: "so" },
  },
];
