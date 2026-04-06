export interface TypeRelationshipDynamics {
  struggles: Array<{
    withType: number;
    why: string;
  }>;
  thrives: Array<{
    withType: number;
    why: string;
  }>;
}

// Pattern-based dynamics — not deterministic. Individual health and context always matter more than type.
export const relationshipDynamics: Record<number, TypeRelationshipDynamics> = {
  1: {
    struggles: [
      { withType: 7, why: "The Seven's spontaneity and disregard for rules can feel irresponsible to the One, while the One's criticism and rigidity frustrate the Seven's need for freedom." },
      { withType: 4, why: "Both are sensitive to falling short of their ideals, but in different directions — the One externalizes standards, the Four internalizes them. Criticism from a One lands especially hard on a Four's sense of identity." },
      { withType: 9, why: "The Nine's resistance to urgency and tendency to accommodate rather than address problems directly can feel like complicity in wrongness to the One, who needs things to be addressed and corrected." },
    ],
    thrives: [
      { withType: 7, why: "When both are healthy, the Seven loosens the One's grip on perfection and brings joy, while the One grounds the Seven's scattered enthusiasm into something real and lasting." },
      { withType: 2, why: "Ones and Twos share a genuine orientation toward making the world better — one through standards, one through service. At their best, they balance principled structure with human warmth." },
    ],
  },
  2: {
    struggles: [
      { withType: 5, why: "The Five's preference for privacy, emotional distance, and self-sufficiency can feel like rejection to the Two, whose identity is bound up in being needed and connected." },
      { withType: 8, why: "Eights can experience the Two's warmth as manipulative, and the Two can experience the Eight's directness as dismissive. Each needs to feel genuinely seen in ways the other struggles to offer." },
      { withType: 3, why: "Two Twos or a Two with a Three can become a competition of helpfulness — both giving strategically rather than freely, neither fully admitting their own needs." },
    ],
    thrives: [
      { withType: 4, why: "The Four's emotional depth and appreciation for being truly known resonates with the Two's desire for genuine connection. Fours tend to appreciate the Two's care without taking it for granted." },
      { withType: 9, why: "Twos and Nines share warmth, attunement to others, and a desire for harmony. They can create deeply supportive environments, though both need to practice expressing their own needs." },
    ],
  },
  3: {
    struggles: [
      { withType: 6, why: "Sixes often distrust polished presentations, and Threes can read as inauthentic to Sixes who are scanning for what's real. Threes may find the Six's anxiety and questioning exhausting." },
      { withType: 9, why: "The Nine's easygoing pace and resistance to urgency clashes with the Three's drive to achieve. Nines may feel pressured; Threes may feel unsupported." },
      { withType: 4, why: "Fours detect inauthenticity quickly, which puts Threes — who are often running on automatic adaptation — on edge. Each type carries a wound around not being genuinely seen." },
    ],
    thrives: [
      { withType: 8, why: "Both value competence, directness, and getting things done. Eights appreciate the Three's drive; Threes respect the Eight's unwillingness to be managed. They can build remarkable things together." },
      { withType: 1, why: "Ones provide the ethical framework that helps Threes connect their drive to something genuinely worthwhile. Threes help Ones loosen perfectionism and celebrate wins." },
    ],
  },
  4: {
    struggles: [
      { withType: 3, why: "Fours prize authenticity; Threes prize effectiveness. The Four may read the Three as shallow or inauthentic, while the Three may find the Four's emotional intensity draining or impractical." },
      { withType: 1, why: "Both hold an image of how things should be, but Ones apply that standard to behavior and the world, Fours apply it to emotional experience. The One's criticism of the Four's 'excessive' emotions creates deep shame." },
      { withType: 7, why: "The Seven's relentless optimism and avoidance of difficulty can feel invalidating to the Four, who finds meaning through depth and difficulty. The Four may feel dismissed; the Seven may feel pulled under." },
    ],
    thrives: [
      { withType: 5, why: "Both types value depth, authenticity, and inner life. Fives offer the Four intellectual engagement without emotional demand; Fours help Fives access emotional range. A natural pairing for deep, unusual connection." },
      { withType: 9, why: "Nines can receive the Four's emotional intensity without flinching, and the Four's depth helps the Nine access their own interiority. The Nine's steadiness is grounding; the Four's aliveness is energizing." },
    ],
  },
  5: {
    struggles: [
      { withType: 2, why: "The Two's emotional attunement and desire for reciprocal connection can feel intrusive to the Five, who guards inner space carefully. The Two may feel perpetually shut out; the Five may feel perpetually pressured." },
      { withType: 6, why: "Both are anxiety-prone, but in different directions — Fives withdraw, Sixes project. The Six may find the Five's detachment frustrating; the Five may find the Six's need for reassurance exhausting." },
      { withType: 8, why: "The Eight's intensity and tendency to dominate space can feel violating to the Five's need for sanctuary. Eights may read the Five's withdrawal as disrespect." },
    ],
    thrives: [
      { withType: 4, why: "Fours and Fives share a love of depth and an outsider sensibility. Both appreciate intellectual and emotional complexity without needing to simplify it. They tend to give each other genuine room." },
      { withType: 8, why: "When healthy, the Five's depth and the Eight's power create a formidable combination. Each respects competence and directness; neither expects the other to perform warmth they don't feel." },
    ],
  },
  6: {
    struggles: [
      { withType: 3, why: "Sixes are attuned to inauthenticity and quickly distrust slick presentations. Threes' natural shape-shifting reads as untrustworthy to the vigilant Six." },
      { withType: 7, why: "Sevens move away from discomfort just as Sixes need to stay with it and process it. The Seven's 'just be positive' response to the Six's anxiety feels dismissive and invalidating." },
      { withType: 1, why: "Both can be highly critical — Ones of external standards, Sixes of potential threats. This can create a spiral of mutual fault-finding that leaves both feeling unaccepted." },
    ],
    thrives: [
      { withType: 9, why: "Nines offer the steady, non-reactive presence that Sixes find genuinely calming. Sixes appreciate the Nine's loyalty and the Nine's absence of hidden agenda. Sixes help Nines access urgency and purpose." },
      { withType: 2, why: "Sixes and Twos share warmth, loyalty, and genuine care for community. Both show up for the people they love. The risk is codependency — each sacrificing their own needs in service of connection." },
    ],
  },
  7: {
    struggles: [
      { withType: 1, why: "The One's critical standards and insistence on responsibility clash with the Seven's need for freedom and positive framing. Each sees the other as getting something fundamentally wrong about how to live." },
      { withType: 4, why: "The Seven avoids depth and difficulty; the Four lives there. The Seven's optimism feels superficial to the Four; the Four's emotional weight feels like a trap to the Seven." },
      { withType: 5, why: "Both are withdrawn types but in different directions — Fives retreat into inner space, Sevens expand outward. The Seven may find the Five's withdrawal frustrating; the Five may find the Seven's stimulation-seeking exhausting." },
    ],
    thrives: [
      { withType: 8, why: "Sevens and Eights share high energy, appetite for experience, and a refusal to be controlled. Both are expansive. The Eight provides direction and commitment; the Seven provides lightness and range." },
      { withType: 9, why: "Nines enjoy the Seven's enthusiasm and freedom without being threatened by it. Sevens appreciate the Nine's easygoing nature. The risk is both avoiding the difficult conversations that deepen intimacy." },
    ],
  },
  8: {
    struggles: [
      { withType: 2, why: "The Two's indirect expressions of need and care-giving can feel manipulative to the Eight, who respects directness above almost anything. The Eight's bluntness can devastate the Two." },
      { withType: 5, why: "The Eight's intensity and space-taking conflicts with the Five's need for sanctuary and careful energy management. Each may feel the other is being deliberately withholding." },
      { withType: 6, why: "The Eight tests loyalty through confrontation; the Six experiences confrontation as threat. This can create a loop where the Eight escalates and the Six either collapses or counter-attacks." },
    ],
    thrives: [
      { withType: 3, why: "Eights and Threes share drive, competence, and a clear-eyed orientation toward results. Both respect each other's effectiveness. When healthy, they build remarkable things and push each other to higher standards." },
      { withType: 7, why: "Eights and Sevens share appetite, energy, and refusal to be contained. The Eight provides the decisiveness and commitment the Seven sometimes lacks; the Seven provides the lightness the Eight sometimes loses." },
    ],
  },
  9: {
    struggles: [
      { withType: 3, why: "The Three's urgency and achievement focus can feel like pressure to the Nine, who values peace over productivity. The Nine's easygoing pace can frustrate the Three's drive toward goals." },
      { withType: 8, why: "The Eight's intensity and directness can trigger the Nine's withdrawal and passive resistance — the stubborn wall that surprises people who only see the Nine's agreeableness. Both can dig in." },
      { withType: 1, why: "The One's need to correct and improve can feel relentless to the Nine, who needs peace to function. Nines can become increasingly numb and withdrawn under constant One-style criticism." },
    ],
    thrives: [
      { withType: 6, why: "Nines and Sixes both value loyalty, warmth, and genuine connection. The Nine's steadiness calms the Six's anxiety; the Six's vigilance helps the Nine engage with rather than avoid difficulty." },
      { withType: 4, why: "The Nine's quiet steadiness gives the Four a genuinely safe container for their emotional depth. The Four's aliveness and intensity helps the Nine access their own inner life rather than merging with others." },
    ],
  },
};
