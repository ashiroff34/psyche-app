// Attachment Theory Data
// Sources: Bowlby (1969, 1973). Attachment and Loss;
// Ainsworth, Blehar, Waters & Wall (1978). Patterns of Attachment;
// Bartholomew & Horowitz (1991). Attachment styles among young adults;
// Main & Solomon (1986). Disorganized/disoriented attachment

export type AttachmentStyle = 'secure' | 'anxious' | 'dismissive' | 'fearful';

export interface AttachmentResult {
  style: AttachmentStyle;
  title: string;
  description: string;
  corePattern: string;
  inRelationships: string;
  growthEdge: string;
}

export const attachmentStyles: Record<AttachmentStyle, AttachmentResult> = {
  secure: {
    style: 'secure',
    title: 'Secure',
    description: "Secure attachment reflects a positive internal working model of both self and others. Bowlby's foundational insight from his 1969 work. You feel fundamentally worthy of love and expect others to be reliably available. Closeness and independence coexist comfortably: you can depend on others without fear of engulfment, and be alone without fear of abandonment. Ainsworth's Strange Situation studies found that securely attached individuals used their attachment figure as a genuine safe base from which to explore. which in adult life becomes the capacity to be emotionally present and take relational risks without constant self-protection.",
    corePattern: "You move between intimacy and autonomy fluidly, without needing to brace against either. When conflict or distance arises in relationships, you can tolerate the discomfort without catastrophizing or shutting down.",
    inRelationships: "You communicate needs directly and can also tolerate a partner's differing needs without it threatening the relationship. You're capable of genuine vulnerability. not because vulnerability feels safe in an abstract sense, but because your internal sense of worth doesn't depend on any single response. Conflict is workable, not existential. Partners often experience you as warm, reliable, and non-reactive.",
    growthEdge: "Even secure attachment has edges. Notice whether 'security' sometimes masks complacency. failing to attend to a partner's deeper emotional needs, or assuming wellbeing without checking in. Growth means moving from passive security into active attunement.",
  },
  anxious: {
    style: 'anxious',
    title: 'Anxious-Preoccupied',
    description: "Anxious-Preoccupied attachment reflects a negative model of self combined with a positive model of others. Bartholomew and Horowitz's 1991 four-category model captures this precisely. You crave closeness intensely, but an underlying fear of abandonment drives you to hyperactivate your attachment system: scanning for signs of rejection, seeking frequent reassurance, and amplifying emotional signals to ensure the other person doesn't pull away. Bowlby described this as a strategy that made adaptive sense in an environment where the caregiver was inconsistently available. strong enough emotional signaling, and the caregiver sometimes responds. In adulthood, the strategy persists even when it's no longer necessary.",
    corePattern: "You tend to merge with partners' emotional states and interpret distance as potential abandonment. The pursuit of closeness can inadvertently push people away, which confirms the fear and intensifies the pursuit. a self-reinforcing loop.",
    inRelationships: "You're emotionally attuned and deeply caring, but jealousy, clinginess, and difficulty with temporary distance can strain relationships. You may minimize your own needs to avoid conflict, then erupt when resentment builds. Reassurance helps short-term but doesn't touch the underlying anxiety. Partners often feel pressure to regulate your emotional state, which can become exhausting over time.",
    growthEdge: "The core work is developing an internal secure base. a stable sense of self-worth that doesn't depend on the current state of any relationship. Practices that develop self-soothing, tolerance of uncertainty, and self-trust will shift the attachment pattern more reliably than finding the 'right' partner.",
  },
  dismissive: {
    style: 'dismissive',
    title: 'Dismissive-Avoidant',
    description: "Dismissive-Avoidant attachment reflects a positive model of self paired with a negative or devalued model of others. Bartholomew and Horowitz's complement to the Anxious style. Rather than hyperactivating the attachment system, you deactivate it: minimizing the importance of relationships, suppressing attachment needs, and cultivating a sense of independence that functions as armor. Bowlby observed that children with consistently unresponsive caregivers learned to stop signaling need, because signaling produced either nothing or rejection. In adulthood, this becomes a characterological self-sufficiency. not a preference for solitude, but a learned defense against the pain of needing and not being met.",
    corePattern: "You tend to intellectualize emotions rather than feel them fully, maintain emotional distance even in close relationships, and exit or emotionally withdraw when intimacy deepens. The self-narrative emphasizes strength and independence; dependence is experienced as weakness or threat.",
    inRelationships: "You're often described as emotionally unavailable, though you may not feel this from the inside. you simply don't sense that closeness is particularly important. Partners may feel shut out, unimportant, or perpetually chasing. You're capable of loyalty and care, but they tend to be expressed through action rather than emotional presence. Conflict typically triggers withdrawal rather than engagement.",
    growthEdge: "The attachment needs haven't disappeared. they've been suppressed. Growth means slowly tolerating the vulnerability of needing others: noticing what's present when closeness arises, sitting with it rather than moving away, and allowing others to matter without that feeling like a loss of self.",
  },
  fearful: {
    style: 'fearful',
    title: 'Fearful-Avoidant',
    description: "Fearful-Avoidant attachment, also called disorganized attachment, reflects a negative model of both self and others. the most complex of Bartholomew and Horowitz's four styles. You simultaneously desire closeness and fear it: relationships feel both necessary and dangerous. Main and Solomon's 1986 research identified disorganized attachment in children whose attachment figure was also a source of fear. creating an impossible bind where the source of safety is simultaneously the source of threat. In adulthood, this manifests as oscillation: approaching intimacy, then retreating; wanting connection and simultaneously dreading it. The attachment system has no coherent strategy.",
    corePattern: "Relationships tend to follow a pursue-withdraw cycle. you may seek closeness until it becomes real, then pull back or sabotage it. Emotional experiences can feel overwhelming, uncontrollable, or dangerous. Trust is profoundly difficult; both getting close and staying distant feel like losing.",
    inRelationships: "Partners often experience you as unpredictable. warm and withdrawn, intense and distant in rapid alternation. This isn't manipulation; it's the unresolved conflict between needing connection and expecting it to hurt. You may be deeply empathic and attuned when not in a triggered state, and genuinely loving when you feel safe. But the window of safety is narrow and easily closed.",
    growthEdge: "Fearful-avoidant attachment responds well to earned security. built slowly through consistent, safe, predictable experiences with trustworthy people (including therapists). The work involves processing early relational experiences, building a coherent autobiographical narrative, and developing a stable enough self to tolerate intimacy without expecting catastrophe.",
  },
};

// Enneagram-Attachment Cross-Map
// Grounded in convergent patterns from Riso-Hudson, Chestnut, and attachment research
// These are probabilistic tendencies, not deterministic maps. every type can embody any style
export const enneagramAttachmentCorrelations: Record<number, {
  primary: AttachmentStyle;
  secondary?: AttachmentStyle;
  explanation: string;
}> = {
  1: {
    primary: 'anxious',
    secondary: 'dismissive',
    explanation: "Ones carry a profound anxiety about being wrong or imperfect. a hypervigilance that maps closely to anxious attachment's negative self-model. Their inner critic functions like an internalized harsh caregiver. However, the One's characteristic emotional suppression and reaction formation also produce dismissive-avoidant features: they deactivate vulnerability and express love through corrective action rather than closeness, creating a distinctive anxious-compulsive hybrid."
  },
  2: {
    primary: 'anxious',
    explanation: "Twos are among the clearest expressions of anxious-preoccupied attachment in the Enneagram. Their core strategy. earning love through indispensable helpfulness. directly reflects Bowlby's concept of a hyperactivated attachment system in response to an inconsistently available caregiver. The Two's negative self-model (I am only lovable if I give) alongside their intense focus on others' needs and states maps precisely onto Bartholomew and Horowitz's anxious category."
  },
  3: {
    primary: 'dismissive',
    explanation: "Threes suppress their authentic emotional experience in favor of performance. a dismissive-avoidant pattern where the 'self' being protected is actually a constructed image. Their positive self-model is contingent on achievement, and relationships are often instrumental rather than intrinsically valued. The Three's deactivation of attachment needs (I don't need connection; I need recognition) mirrors the dismissive strategy's characteristic suppression of vulnerability in favor of self-sufficiency."
  },
  4: {
    primary: 'fearful',
    secondary: 'anxious',
    explanation: "Fours occupy the fearful-avoidant position more than any other type: they simultaneously long for deep connection and expect it to disappoint them. Their negative models of both self (I am fundamentally deficient) and others (no one can truly understand me) mirror Bartholomew's fearful quadrant exactly. The Four's characteristic oscillation between pursuit of intimacy and painful withdrawal, and their expectation that closeness will reveal their unworthiness, are textbook fearful-avoidant dynamics."
  },
  5: {
    primary: 'dismissive',
    explanation: "Fives are the Enneagram's clearest expression of dismissive-avoidant attachment: they systematically minimize the importance of relationship and retreat into the self-sufficiency of their inner world. The deactivation of attachment needs. 'I don't need people; I need knowledge and privacy'. is the defining feature of Bowlby's deactivating strategy. Fives aren't unfeeling, but they've learned to experience attachment needs as threatening to their survival, and intellectual mastery as the only reliable comfort."
  },
  6: {
    primary: 'anxious',
    secondary: 'fearful',
    explanation: "Sixes are perhaps the most transparent expression of anxious attachment: their core structure is organized around managing threat, seeking trusted guidance when internal guidance fails, and testing relationship loyalty because consistency cannot be assumed. The Six's hyperactivated threat-detection system and difficulty trusting their own inner guidance closely parallel the anxious-preoccupied style. Counter-phobic Sixes also show fearful-avoidant features. approaching what is feared rather than fleeing it, as a paradoxical defensive strategy."
  },
  7: {
    primary: 'dismissive',
    secondary: 'secure',
    explanation: "Sevens use a distinctive variation of dismissive-avoidant attachment: rather than suppressing needs through withdrawal, they outrun them through perpetual stimulation and positivity. The Seven's strategy. if I stay in motion, pain can't catch me. is a deactivating strategy in disguise, maintaining an apparent self-sufficiency and emotional brightness that keeps attachment needs at bay. Healthy Sevens, however, can access genuine security through their capacity for joy and connection."
  },
  8: {
    primary: 'fearful',
    secondary: 'dismissive',
    explanation: "Eights present a counter-intuitive but psychologically coherent case for fearful-avoidant attachment. Their early experience often included environments where vulnerability led directly to harm, producing the Eight's armoring of their tender interior. The simultaneous desire for intensity and deep loyalty, alongside terror of being controlled or betrayed, mirrors the fearful quadrant's dual negative models. Many Eights also show strong dismissive features: externalizing threat and maintaining dominant control as a substitute for the vulnerability they cannot risk."
  },
  9: {
    primary: 'dismissive',
    secondary: 'secure',
    explanation: "Nines paradoxically combine the surface appearance of security with the deeper structure of dismissive avoidance: they merge with others rather than developing genuine intimacy, self-erasing in a way that deactivates their own attachment needs before they can be disappointed. The Nine's characteristic numbing of desire and self-forgetting closely parallel the dismissive deactivation of the attachment system. not through self-sufficiency but through self-dissolution. Healthy Nines can develop genuine secure attachment as they learn to remain present as themselves."
  },
};
