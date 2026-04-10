// Personality Archaeology: Formation Map
//
// Based on Millon's evolutionary personality model, Mikulincer & Shaver 2007,
// and Riso-Hudson's childhood wound theory. Each type has a characteristic
// developmental pathway from early environment to current defense structure.
//
// This data provides the type-specific "formation hypothesis" that the
// app generates from the user's attachment data + type.

export interface FormationHypothesis {
  childhoodWound: string; // what the child experienced
  adaptiveStrategy: string; // what the child developed in response
  adultManifestation: string; // how it shows up now
  consolidationAge: string; // typical age range when the pattern solidified
  attachmentConnection: string; // how attachment style interacts
  somaticSignature: string; // where the pattern lives in the body
  liberationInsight: string; // the reframe that begins to loosen the pattern
}

export const TYPE_FORMATION: Record<number, FormationHypothesis> = {
  1: {
    childhoodWound: "The child learned that love was conditional on being good. Mistakes were not tolerated, or the child internalized a standard higher than anyone explicitly set. The message, spoken or unspoken: 'You are loved when you get it right.'",
    adaptiveStrategy: "Develop an internal critic that catches mistakes before anyone else does. Become self-correcting, responsible, principled. The critic is a preemptive defense: if I fix myself first, no one can criticize me.",
    adultManifestation: "Chronic self-monitoring. Difficulty relaxing. A sense that things are never quite right. The anger that comes from holding everyone (especially yourself) to a standard the world will never meet.",
    consolidationAge: "6 to 10. The inner critic typically solidifies during early school years when external evaluation systems (grades, rules, authority) reinforce the pattern.",
    attachmentConnection: "Anxious attachment amplifies the critic (fear of rejection if imperfect). Avoidant attachment channels it into self-sufficiency (I will handle my own corrections).",
    somaticSignature: "Jaw, shoulders, lower back. The tension of holding yourself together. The body of someone who never fully relaxes.",
    liberationInsight: "The critic was built to keep you safe. It worked. You can thank it and loosen its grip without abandoning your values. Integrity does not require suffering.",
  },
  2: {
    childhoodWound: "The child learned that their own needs were less important than others'. Love flowed toward the child who helped, who was sweet, who made others feel good. The message: 'You are loved when you are useful.'",
    adaptiveStrategy: "Become attuned to others' needs before your own. Develop an emotional radar for what people want. Give before being asked. Make yourself indispensable.",
    adultManifestation: "Difficulty identifying your own needs. Resentment that builds silently. The exhaustion of being everyone's support system. The belief that asking for help is selfish.",
    consolidationAge: "4 to 8. The helping pattern often starts very early, especially in families where a parent needed emotional support from the child.",
    attachmentConnection: "Anxious attachment intensifies the helping (if I stop giving, they will leave). Avoidant attachment creates the counter-type (I give strategically to maintain control).",
    somaticSignature: "Chest, arms, upper back. The body of someone who reaches out constantly. Tension in the heart center.",
    liberationInsight: "You existed before you were useful. Your being is not earned through giving. The love you seek by helping is already available without the transaction.",
  },
  3: {
    childhoodWound: "The child learned that love was given for what they achieved, not who they were. Performance was rewarded. Being was not enough. The message: 'You are loved when you succeed.'",
    adaptiveStrategy: "Become highly adaptive. Learn to read what each audience values and shape-shift accordingly. Achievement becomes identity. The performance becomes the self.",
    adultManifestation: "The gap between the image and the person widens. Difficulty knowing who you are without an audience. Rest feels like failure. The fear that underneath the performance, there is nothing.",
    consolidationAge: "6 to 12. The pattern solidifies when achievement systems (school, sports, social hierarchy) begin rewarding the adaptive performance.",
    attachmentConnection: "Anxious attachment channels achievement toward winning approval. Avoidant attachment channels it toward independence (I will succeed alone).",
    somaticSignature: "Heart center, but often disconnected from it. The body moves efficiently, performing. The chest may feel hollow or numb during stillness.",
    liberationInsight: "You were someone before the first gold star. The person behind the performance is not empty. They are just unpracticed at being seen without a costume.",
  },
  4: {
    childhoodWound: "The child felt that something essential was missing, that they were not seen for who they really were. There may have been a sense of abandonment, or of being different from the rest of the family. The message: 'Something is wrong with you that others do not have.'",
    adaptiveStrategy: "Develop a rich inner world to compensate for what feels absent outside. Amplify emotional intensity to feel real. Make the difference a source of identity: if I cannot belong, I will be unique.",
    adultManifestation: "Chronic longing for what is absent. Comparison and envy. The belief that real life is happening somewhere else. Depth that sometimes becomes suffering worn as identity.",
    consolidationAge: "5 to 9. Often triggered by a disruption in attachment: divorce, move, sibling birth, or simply the felt sense of not being mirrored by the primary caregiver.",
    attachmentConnection: "Anxious attachment amplifies the longing and push-pull. Avoidant attachment creates the counter-type (withdraw into aesthetic self-sufficiency).",
    somaticSignature: "Chest and throat. The ache of unspoken feeling. The body of someone who feels too much and has nowhere to put it.",
    liberationInsight: "The ordinary life you dismiss is the one that actually fits. You are not missing something essential. You are already connected. The longing itself is evidence of the connection.",
  },
  5: {
    childhoodWound: "The child felt overwhelmed by the world's demands, invaded by others' needs or stimulation. Privacy and inner space were not respected. The message: 'The world takes more than it gives.'",
    adaptiveStrategy: "Retreat into the mind. Minimize needs. Hoard resources (time, energy, knowledge). Build a wall between the inner world and the outer one. Knowledge becomes armor.",
    adultManifestation: "Social withdrawal. Difficulty with emotional engagement. The belief that contact depletes. A rich intellectual life that substitutes for lived experience.",
    consolidationAge: "4 to 8. Often the youngest child, the quiet one, or the child in a chaotic household who found safety in observation rather than participation.",
    attachmentConnection: "Avoidant attachment is the natural pairing (retreat from closeness). Anxious attachment creates the counter-type (craving intimacy but fearing the cost).",
    somaticSignature: "Head, neck, eyes. Shallow breathing. The body of someone who lives above the neck. Tension from vigilant observation.",
    liberationInsight: "Contact replenishes as often as it depletes. The wall that protects you is also the wall that isolates you. You can afford to let someone in.",
  },
  6: {
    childhoodWound: "The child could not trust the authority figures to be consistent or safe. The ground felt unstable. Rules changed without warning. The message: 'You cannot count on the world to be predictable.'",
    adaptiveStrategy: "Develop vigilance. Scan for danger constantly. Build allegiances with trustworthy people. Prepare for worst cases. Create systems of certainty in an uncertain world.",
    adultManifestation: "Chronic anxiety (or its counter-phobic opposite: recklessness as a defense against fear). Difficulty trusting your own judgment. The search for authority that will never feel secure enough.",
    consolidationAge: "5 to 10. Often linked to an unpredictable parent (inconsistent discipline, mood swings) or a destabilizing event (move, divorce, trauma).",
    attachmentConnection: "Anxious attachment amplifies the scanning (constant checking). Avoidant attachment creates the counter-phobic 6 (push through fear instead of running from it).",
    somaticSignature: "Gut and shoulders. The body of someone bracing for impact. Shallow breathing. Chronic tension that never fully releases.",
    liberationInsight: "The danger you are scanning for has usually already passed. Your vigilance was adaptive once. Now it is running on old software. You can trust yourself more than you think.",
  },
  7: {
    childhoodWound: "The child experienced pain, deprivation, or limitation and learned that the way to survive was to escape into possibility. The message: 'Pain is avoidable if you keep moving.'",
    adaptiveStrategy: "Develop a future-oriented mind that is always planning the next experience. Reframe negative events positively. Maintain options. Avoid limitation, boredom, and suffering.",
    adultManifestation: "Difficulty staying with discomfort. Scattered energy. The belief that the next thing will be better. Relationships that start exciting and end when they become routine.",
    consolidationAge: "4 to 8. Often the child who learned to entertain themselves, who compensated for early deprivation with imagination, or who grew up too fast.",
    attachmentConnection: "Avoidant attachment channels the escape outward (avoid closeness). Anxious attachment creates the counter-type (seek closeness but flee when it gets real).",
    somaticSignature: "Shallow, quick breathing. Restless legs. The body of someone who is always about to leave. Energy concentrated in the upper body.",
    liberationInsight: "The freedom you seek by moving is also available by staying. Depth lives inside the boredom you keep escaping. One experience, fully lived, contains everything.",
  },
  8: {
    childhoodWound: "The child experienced a harsh or unjust environment where vulnerability was punished. They learned that the only safe position is the powerful one. The message: 'If you are soft, you will be destroyed.'",
    adaptiveStrategy: "Develop armor. Become strong, direct, dominant. Control the environment before it controls you. Protect the vulnerable parts by making them invisible.",
    adultManifestation: "Difficulty with vulnerability. Relationships defined by dominance. The belief that softness equals weakness. The tender child inside the fortress, whom no one is allowed to see.",
    consolidationAge: "5 to 9. Often the child who witnessed injustice (parental conflict, bullying, poverty) and decided they would never be the one who gets hurt.",
    attachmentConnection: "Avoidant attachment is the natural pairing (armor up, push away). Anxious attachment creates the counter-type (control through intensity of connection).",
    somaticSignature: "Jaw, chest, fists. The body of someone who is always ready. Dense musculature. Tension that reads as strength but is actually vigilance.",
    liberationInsight: "The softness you protect is the strongest thing about you. Vulnerability is not weakness. It is the only doorway to the intimacy you actually want.",
  },
  9: {
    childhoodWound: "The child learned that their presence, their desires, their anger would disrupt the family system. They learned to minimize themselves to keep the peace. The message: 'You do not matter enough to cause a disruption.'",
    adaptiveStrategy: "Merge with others. Suppress your own preferences. Go along. Numb out. Find comfort in routine and physical pleasures. Avoid conflict at all costs.",
    adultManifestation: "Not knowing what you want. Passive resistance. The anger that went underground and shows up as stubbornness. The feeling of being invisible in your own life.",
    consolidationAge: "4 to 8. Often the middle child, the peacemaker, or the one in a loud family who survived by becoming quiet.",
    attachmentConnection: "Anxious attachment creates the merging 9 (disappear into the other person). Avoidant attachment creates the withdrawn 9 (disappear into comfort and routine).",
    somaticSignature: "Diffuse, low-energy. The body of someone who is not fully here. Weight, softness, or a sense of being ungrounded. Tension held in the belly (suppressed anger).",
    liberationInsight: "Your anger is not dangerous. It is information about what matters to you. Your voice belongs in the room. Peace that requires you to disappear is not peace.",
  },
};
