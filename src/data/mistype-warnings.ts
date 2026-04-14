// ─────────────────────────────────────────────────────────────────────────────
// Mistype Warning Cards
// Source: Riso & Hudson "Wisdom of the Enneagram" (2000);
//         Claudio Naranjo "Character and Neurosis" (1994)
// ─────────────────────────────────────────────────────────────────────────────

export interface MistypeWarning {
  typeId: number;
  commonMistypes: {
    mistakenFor: number;
    distinguishingFactor: string;
    keyQuestion: string;
  }[];
}

export const MISTYPE_WARNINGS: MistypeWarning[] = [
  {
    typeId: 1,
    commonMistypes: [
      {
        mistakenFor: 6,
        distinguishingFactor:
          "1s are driven by an inner standard of correctness and experience resentment when things fall short. 6s are motivated by safety and allegiance to authority — their anxiety is about external threats, not internal imperfection.",
        keyQuestion:
          "Is your primary discomfort about things being *wrong or flawed*, or about something being *unsafe or unreliable*?",
      },
      {
        mistakenFor: 3,
        distinguishingFactor:
          "1s strive to be good and right; they are uncomfortable with praise that is unearned. 3s strive to be successful and admired, adapting their image to win approval. The 1 has a strong inner critic; the 3's self-criticism is more about performance than morality.",
        keyQuestion:
          "Do you work hard because *you hold yourself to a moral standard*, or because *you need to appear impressive and successful*?",
      },
      {
        mistakenFor: 5,
        distinguishingFactor:
          "1s engage with the world to improve it, confronting imperfections directly. 5s withdraw to understand and analyze. The 1's anger is near the surface; the 5's dominant emotion is more like guardedness or emptiness.",
        keyQuestion:
          "Do you feel an urge to *fix and correct* what you see, or to *withdraw and understand* it from a distance?",
      },
    ],
  },
  {
    typeId: 2,
    commonMistypes: [
      {
        mistakenFor: 9,
        distinguishingFactor:
          "2s help in order to feel loved and avoid rejection — there is an agenda, even if unconscious. 9s accommodate to keep the peace and avoid conflict; their self-forgetting is about maintaining harmony, not securing affection.",
        keyQuestion:
          "When you do something kind for someone, is it because *you fear they won't love you if you don't*, or because you genuinely *don't want any waves*?",
      },
      {
        mistakenFor: 4,
        distinguishingFactor:
          "2s focus outward — they identify with others' needs and derive their sense of self from relationships. 4s focus inward — they are preoccupied with what is missing inside and seek to express their unique identity.",
        keyQuestion:
          "Is your emotional life mostly about *other people's feelings and what they need*, or about *your own inner world and what you're missing*?",
      },
      {
        mistakenFor: 7,
        distinguishingFactor:
          "2s seek connection and approval through warmth. 7s seek pleasure, stimulation, and freedom from pain. The 2's positive energy is relational; the 7's is expansive and self-referential.",
        keyQuestion:
          "Is your optimism mainly about *making others feel good and building connection*, or about *keeping your own options open and avoiding boredom*?",
      },
    ],
  },
  {
    typeId: 3,
    commonMistypes: [
      {
        mistakenFor: 1,
        distinguishingFactor:
          "3s adapt their presentation to win admiration — they may appear principled when it serves their image. 1s hold standards regardless of audience because their inner critic demands correctness. 3s are less interested in being right; they want to be seen as excellent.",
        keyQuestion:
          "Would you cut corners to succeed if you knew no one would find out, or would your *own inner standards* prevent it even then?",
      },
      {
        mistakenFor: 7,
        distinguishingFactor:
          "Both types are energetic and future-oriented. 3s focus on specific goals and outcomes; they need to be seen succeeding. 7s are more scattered, fearing limitation, and care more about experience and options than about being admired.",
        keyQuestion:
          "Do you fear *failing to impress others* most, or *being stuck, bored, or deprived of good experiences*?",
      },
      {
        mistakenFor: 8,
        distinguishingFactor:
          "3s lead by projecting competence and winning admiration. 8s lead through force of will and direct power. The 3 adjusts their approach strategically; the 8 confronts head-on regardless of how they look.",
        keyQuestion:
          "Do you care deeply about *how others perceive your effectiveness*, or do you primarily care about *getting results and maintaining control*?",
      },
    ],
  },
  {
    typeId: 4,
    commonMistypes: [
      {
        mistakenFor: 9,
        distinguishingFactor:
          "4s know exactly what is missing and feel it intensely — there is a vivid, painful sense of deficiency. 9s merge with others and lose track of their own preferences; their pain is duller, a kind of numbness or inertia rather than longing.",
        keyQuestion:
          "Is there an *acute, specific longing* for something you feel is missing from you, or do you mostly feel *comfortable as long as there's no conflict*?",
      },
      {
        mistakenFor: 2,
        distinguishingFactor:
          "4s look inward, focused on their own emotional depth and what makes them unique. 2s look outward, focused on others' needs and building connection. 4s can seem self-absorbed; 2s can seem selfless to a fault.",
        keyQuestion:
          "Are most of your emotional thoughts about *your own inner world and identity*, or about *how to be important to the people around you*?",
      },
      {
        mistakenFor: 5,
        distinguishingFactor:
          "4s feel deeply and express through aesthetics, emotion, and identity. 5s observe and analyze, preferring to minimize emotional output and conserve energy. The 4's pain is about identity; the 5's is about intrusion and depletion.",
        keyQuestion:
          "Is your withdrawal about *protecting a rich inner emotional life*, or about *conserving limited resources and avoiding demands on your time and energy*?",
      },
    ],
  },
  {
    typeId: 5,
    commonMistypes: [
      {
        mistakenFor: 1,
        distinguishingFactor:
          "5s withdraw to analyze; 1s engage to improve. The 5's core fear is incompetence and depletion; the 1's is being wrong or corrupt. The 5 is more detached and conservation-minded; the 1 is more engaged and judgmental.",
        keyQuestion:
          "When you see something done incorrectly, do you want to *fix it* (1), or do you want to *understand why* from a safe distance (5)?",
      },
      {
        mistakenFor: 4,
        distinguishingFactor:
          "Both types can be withdrawn and introspective, but for different reasons. 5s withdraw to conserve energy and avoid intrusion. 4s withdraw because they feel different from others and seek emotional depth. The 5's inner life is more conceptual; the 4's is more emotional.",
        keyQuestion:
          "Is your inner world primarily filled with *ideas, systems, and frameworks*, or with *feelings, aesthetics, and a sense of personal meaning*?",
      },
      {
        mistakenFor: 9,
        distinguishingFactor:
          "5s minimize their needs actively and withdraw into a world of competence. 9s go along with others passively and avoid conflict. The 5's detachment is strategic; the 9's is more like a deep forgetting of their own agenda.",
        keyQuestion:
          "Are you withdrawn because *you want to protect your private inner world*, or because you *don't really have strong preferences and don't want to rock the boat*?",
      },
    ],
  },
  {
    typeId: 6,
    commonMistypes: [
      {
        mistakenFor: 1,
        distinguishingFactor:
          "6s look for danger and seek trustworthy authority outside themselves. 1s trust their own inner standards and feel responsibility to reform the world. The 6 doubts and tests; the 1 judges and corrects.",
        keyQuestion:
          "Do you primarily doubt *yourself* and look for reassurance from trusted systems or people, or do you trust your own inner sense of right and wrong?",
      },
      {
        mistakenFor: 4,
        distinguishingFactor:
          "Both can be emotionally reactive and doubt-prone, but the 6's anxiety is about external safety and trust, while the 4's pain is about inner identity and what feels missing. The 6 asks 'Can I trust this?'; the 4 asks 'Who am I really?'",
        keyQuestion:
          "Is your emotional turbulence mainly about *whether you can trust the situation or the people around you*, or about *your own sense of who you truly are*?",
      },
      {
        mistakenFor: 9,
        distinguishingFactor:
          "6s are alert, questioning, and vigilant — anxiety keeps them scanning for threats. 9s are comfortable and avoiding — sloth keeps them from engaging with threats. The 6 worries; the 9 numbs.",
        keyQuestion:
          "Do you spend a lot of mental energy *thinking about what could go wrong*, or do you tend to *not think much about it and hope things work out*?",
      },
    ],
  },
  {
    typeId: 7,
    commonMistypes: [
      {
        mistakenFor: 3,
        distinguishingFactor:
          "7s want happiness, stimulation, and freedom from pain. 3s want admiration and success. Both are energetic and future-oriented, but 7s are motivated by pleasure and variety, not by status or recognition.",
        keyQuestion:
          "Do you mainly want others to *see you as successful*, or do you mainly want to *experience as much as possible and avoid feeling limited*?",
      },
      {
        mistakenFor: 4,
        distinguishingFactor:
          "7s reframe negative experiences into positive ones and move on quickly. 4s are drawn into negative feelings and find meaning in longing and depth. The 7 avoids pain; the 4 almost seeks it as proof of depth.",
        keyQuestion:
          "When something painful happens, do you quickly reframe it and move on, or do you sit with it because it feels *meaningful* to you?",
      },
      {
        mistakenFor: 2,
        distinguishingFactor:
          "7s are warm and generous but the motivation is their own enjoyment and freedom. 2s are warm because they need to be needed and to feel loved. 7s don't usually worry much about whether people appreciate them.",
        keyQuestion:
          "Does your generosity mostly come from *genuinely enjoying the giving*, or from a *need to be important to that person*?",
      },
    ],
  },
  {
    typeId: 8,
    commonMistypes: [
      {
        mistakenFor: 3,
        distinguishingFactor:
          "8s lead through raw power and direct confrontation; they don't care much how they look. 3s lead through projected competence and care deeply about their image. The 8 would rather be feared than misunderstood; the 3 wants to be admired.",
        keyQuestion:
          "Do you care deeply about *how people perceive your effectiveness and success*, or do you mainly care about *being powerful and in control*?",
      },
      {
        mistakenFor: 6,
        distinguishingFactor:
          "Counterphobic 6s can look like 8s — both confront danger. But 6s are testing for trustworthiness and feel underlying anxiety; 8s are asserting dominance and feel underlying invulnerability. The 6 doubts themselves; the 8 rarely does.",
        keyQuestion:
          "Underneath your boldness, is there *real doubt and anxiety* you're pushing through, or do you genuinely feel *certain and unafraid most of the time*?",
      },
      {
        mistakenFor: 7,
        distinguishingFactor:
          "Both types are intense, energetic, and pleasure-seeking. 8s are driven by power, protection, and impact. 7s are driven by stimulation and avoiding pain. The 8 can be menacing; the 7 is rarely threatening.",
        keyQuestion:
          "Is your intensity primarily about *enjoying everything life has to offer*, or about *asserting your will and ensuring no one limits you*?",
      },
    ],
  },
  {
    typeId: 9,
    commonMistypes: [
      {
        mistakenFor: 4,
        distinguishingFactor:
          "9s lose track of their own agenda and merge with whatever is comfortable. 4s have an acute, focused awareness of what is missing inside them. The 9's emotional flatness comes from numbing; the 4's comes from absorbing depth.",
        keyQuestion:
          "Is your inner life mostly *quiet and undisturbed* (even pleasantly numb), or is there an *intense awareness of something missing* within you?",
      },
      {
        mistakenFor: 5,
        distinguishingFactor:
          "9s avoid conflict and seek comfort; they don't necessarily seek knowledge or expertise. 5s withdraw to master a domain and conserve energy. The 9's withdrawal is about peace; the 5's is about competence.",
        keyQuestion:
          "When you withdraw, is it to *be comfortable and avoid tension*, or to *think, study, and build expertise*?",
      },
      {
        mistakenFor: 2,
        distinguishingFactor:
          "9s accommodate to avoid conflict and maintain peace — not primarily to be loved. 2s help in order to feel needed and to secure affection. The 9 often doesn't know what they want; the 2 wants to be wanted.",
        keyQuestion:
          "Do you go along with others mainly because *you genuinely don't have a strong preference either way*, or because *you need them to appreciate and value you*?",
      },
    ],
  },
];

/**
 * Get the mistype warning for a given type ID.
 */
export function getMistypeWarning(typeId: number): MistypeWarning | undefined {
  return MISTYPE_WARNINGS.find((w) => w.typeId === typeId);
}
