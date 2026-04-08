"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Flame,
  Shield,
  Users,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Heart,
  BookOpen,
  Star,
  Lightbulb,
  AlertTriangle,
  Activity,
  MessageSquare,
  Eye,
} from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import { subtypes } from "@/data/subtypes";
import { useProfile } from "@/hooks/useProfile";
import { typeVignettes } from "@/data/vignettes";
import TypeVignetteSection from "@/components/TypeVignette";
import { relationshipDynamics } from "@/data/relationshipDynamics";

// ─── Famous examples data per type ───────────────────────────────────────────
const famousExamples: Record<
  number,
  {
    real: { name: string; field: string; reason: string }[];
    fictional: { name: string; source: string; reason: string }[];
  }
> = {
  1: {
    real: [
      { name: "Nelson Mandela", field: "Activist & Statesman", reason: "Lived by an uncompromising moral code, endured 27 years in prison rather than compromise his principles, and dedicated his life to the ideal of justice." },
      { name: "Mahatma Gandhi", field: "Political Leader", reason: "Defined by his fierce ethical standards, insistence on nonviolence as the only morally acceptable path, and relentless pursuit of a more just world." },
      { name: "Tina Fey", field: "Writer & Comedian", reason: "Known for her high standards, perfectionism, sharp critical voice, and the way she channels moral commentary into satirical comedy." },
      { name: "Meryl Streep", field: "Actor", reason: "Legendary for her meticulous preparation, commitment to craft, and the exacting standards she holds herself and her work to." },
      { name: "Noam Chomsky", field: "Linguist & Activist", reason: "A paradigmatic One: a rigorous thinker whose life is organized around moral and intellectual integrity, consistent principles, and critiquing what he sees as wrong in the world." },
      { name: "Pope Francis", field: "Religious Leader", reason: "Embodies the reforming, principled energy of a healthy One, working to improve his institution from within while modeling simplicity and moral clarity." },
    ],
    fictional: [
      { name: "Atticus Finch", source: "To Kill a Mockingbird", reason: "The quintessential One: a man who does what is right regardless of social pressure, holding to moral principles even at great personal cost." },
      { name: "Hermione Granger", source: "Harry Potter", reason: "Rule-following, perfectionistic, always doing the homework, Hermione's core drive is to be correct and to improve herself and others." },
      { name: "Captain America / Steve Rogers", source: "Marvel", reason: "Driven by an unwavering moral compass; when everyone else compromises, Cap refuses, embodying the One's unyielding sense of right and wrong." },
      { name: "Lisa Simpson", source: "The Simpsons", reason: "A clear One: moralistic, idealistic, deeply critical of the world's imperfections, and perpetually disappointed when reality falls short of her standards." },
    ],
  },
  2: {
    real: [
      { name: "Mother Teresa", field: "Humanitarian", reason: "Dedicated her life entirely to the service of others, defining herself through acts of giving, the archetypal Two at their most self-sacrificing." },
      { name: "Dolly Parton", field: "Singer & Philanthropist", reason: "Known for her extraordinary generosity, warmth, and the way she uses her success to take care of others, classic Two helper energy." },
      { name: "Princess Diana", field: "Royal & Humanitarian", reason: "Defined by her empathy, her need to connect personally with those who were suffering, and her identity built around loving and being loved." },
      { name: "Bishop Desmond Tutu", field: "Activist & Clergyman", reason: "Embodied the healthy Two's expansive care, warm, joyful, deeply attuned to others' suffering, always oriented toward connection and healing." },
      { name: "Nancy Reagan", field: "First Lady", reason: "Organized her entire life around her husband's needs and success, exemplifying the Two's self-definition through the relationships they support." },
      { name: "Stevie Wonder", field: "Musician", reason: "Known for his warmth, generosity of spirit, and the way his music is primarily oriented toward love, connection, and uplifting others." },
    ],
    fictional: [
      { name: "Monica Geller", source: "Friends", reason: "Expresses love through cooking, hosting, and taking care of everyone, needs to feel needed and struggles when her help isn't wanted." },
      { name: "Samwise Gamgee", source: "Lord of the Rings", reason: "The purest Two in fiction: his entire arc is organized around supporting and caring for Frodo, asking nothing for himself in return." },
      { name: "Peeta Mellark", source: "The Hunger Games", reason: "Defines himself through love and loyalty; his gifts are in connection, support, and warmth, and he gives them freely even at risk to himself." },
      { name: "Beth March", source: "Little Women", reason: "Gentle, selfless, oriented entirely toward the comfort and happiness of others, the Two's care expressed in its quietest, most sincere form." },
    ],
  },
  3: {
    real: [
      { name: "Oprah Winfrey", field: "Media Mogul", reason: "Built an empire through sheer achievement orientation and image mastery, while also pushing toward authentic connection, the Three's full range." },
      { name: "Tom Cruise", field: "Actor", reason: "An exemplary Three: relentlessly driven, highly image-conscious, shaped his public persona with extraordinary discipline and control." },
      { name: "Taylor Swift", field: "Musician", reason: "Meticulously crafts her public narrative and image, adapts her style across eras, and is driven by achievement and public recognition." },
      { name: "Bill Clinton", field: "Politician", reason: "Classic Three: charismatic, achievement-oriented, able to read rooms and adapt perfectly, and famously focused on his legacy and image." },
      { name: "Muhammad Ali", field: "Athlete", reason: "Literally performed his own greatness, Ali's persona was as carefully crafted as his boxing, and achievement was the primary lens of his identity." },
      { name: "Reese Witherspoon", field: "Actor & Producer", reason: "Known for her relentless drive, brand-building, and capacity to achieve across multiple domains while projecting an aspirational, polished image." },
    ],
    fictional: [
      { name: "Jay Gatsby", source: "The Great Gatsby", reason: "The tragic Three: invents an entire persona built on image and achievement, chasing external validation to fill an inner void." },
      { name: "Rachel Berry", source: "Glee", reason: "Achievement-obsessed, relentlessly ambitious, defined by accomplishments and the recognition she believes she deserves." },
      { name: "Tony Stark / Iron Man", source: "Marvel", reason: "Charismatic, driven, image-conscious, and using achievement to construct an identity, his arc toward vulnerability is classic Three growth." },
      { name: "Tom Ripley", source: "The Talented Mr. Ripley", reason: "The dark side of the Three: shape-shifts his identity for status and belonging, with no stable self beneath the performance." },
    ],
  },
  4: {
    real: [
      { name: "Frédéric Chopin", field: "Composer", reason: "His music is the emotional autobiography of a Four, melancholic, deeply personal, aching with longing and the search for beauty in suffering." },
      { name: "Sylvia Plath", field: "Poet & Author", reason: "The Four's struggle made literature: intense self-examination, the search for authentic experience, and a deep sense of being fundamentally different." },
      { name: "Virginia Woolf", field: "Author", reason: "Wrote from the inside of consciousness, obsessed with the ineffable quality of experience, the search for the self, and the beauty within melancholy." },
      { name: "Nick Cave", field: "Musician", reason: "His body of work is a masterclass in Four energy, dark, searingly personal, obsessed with beauty, loss, and the redemptive quality of suffering." },
      { name: "Amy Winehouse", field: "Musician", reason: "Her music and her life exemplified the Four's emotional intensity, refusal to hide her inner world, and the tragic pull toward self-destruction." },
      { name: "Michael Jackson", field: "Musician & Performer", reason: "Driven by an extraordinary need to be unique and transcendent, while simultaneously carrying deep wounds about belonging and identity." },
    ],
    fictional: [
      { name: "Hamlet", source: "Shakespeare", reason: "The quintessential Four: preoccupied with identity, authenticity, and meaning; unable to act because feeling and analyzing take precedence over doing." },
      { name: "Anne of Green Gables", source: "L.M. Montgomery", reason: "Dreamy, emotionally intense, desperately wants to be understood as special and different, and turns every experience into poetry." },
      { name: "Don Draper", source: "Mad Men", reason: "A Four with a Three wing: obsessed with creating an identity, haunted by his origins, searching for authenticity beneath his crafted persona." },
      { name: "Elphaba", source: "Wicked", reason: "The outsider who can't hide her difference, yearning to belong while fiercely proud of what makes her unique, the Four's core struggle." },
    ],
  },
  5: {
    real: [
      { name: "Albert Einstein", field: "Physicist", reason: "Withdrawn, deeply interior, spent vast periods alone in thought, his inner world was the primary site of his life, with the physical world as secondary." },
      { name: "Friedrich Nietzsche", field: "Philosopher", reason: "The Five's mind taken to its extremity: immense intellectual output, radical independence, complete withdrawal from convention, and eventual dissolution." },
      { name: "Bill Gates", field: "Technologist", reason: "Famously retreats for 'Think Weeks' alone with books; built his empire through mastery of information and the Five's characteristic focus and depth." },
      { name: "Stanley Kubrick", field: "Director", reason: "Reclusive, obsessively researching every film, wanting complete control over a perfectly understood world, a classic Five creative." },
      { name: "Jane Goodall", field: "Primatologist", reason: "Driven by the Five's need to understand through direct observation and immersion; spent years alone in the field, observing before drawing conclusions." },
      { name: "David Bowie", field: "Musician", reason: "The Five's intellectual range and emotional detachment, Bowie studied and then embodied ideas and personas like a scientist experimenting with identity." },
    ],
    fictional: [
      { name: "Sherlock Holmes", source: "Arthur Conan Doyle", reason: "The Five made fiction: lives entirely in his mind, finds human emotion inefficient, and defines himself through the depth and precision of his knowledge." },
      { name: "Hermione Granger (5w4)", source: "Harry Potter", reason: "While she can be typed as a One, her intense knowledge-hoarding, her comfort in libraries over people, and her analytical detachment suggest strong Five." },
      { name: "Dr. Gregory House", source: "House M.D.", reason: "The Five's extreme: antisocial, lives for the puzzle, avoids emotional engagement, and uses intellectual superiority as armor against intimacy." },
      { name: "Tyrion Lannister", source: "Game of Thrones", reason: "Reads obsessively, uses knowledge as his weapon, and narrates his life with the detached observational quality of someone watching from a distance." },
    ],
  },
  6: {
    real: [
      { name: "Sigmund Freud", field: "Psychologist", reason: "The Six's mind applied to the world: suspicious, constantly looking for hidden motives, building systems to explain what lies beneath the surface." },
      { name: "Mark Twain", field: "Author", reason: "A counterphobic Six: challenged authority through sharp satire, questioned everything, and expressed both the Six's anxiety and its defiant courage." },
      { name: "Malala Yousafzai", field: "Activist", reason: "Embodies the Six's fierce loyalty to a cause and community, willing to face down fear when her values and people are threatened." },
      { name: "Ellen DeGeneres", field: "Comedian & Host", reason: "The Six's warmth, anxiety, and loyalty, built her career on relatability and the Six's gift for creating community and making people feel safe." },
      { name: "Tom Hanks", field: "Actor", reason: "Universally trusted and relatable; his brand is reliability, warmth, and loyalty, hallmarks of the healthy Six at their best." },
      { name: "Princess Diana", field: "Royal", reason: "The Six's anxiety about belonging, fierce loyalty to her children and causes, and courage that emerged when those she loved were threatened." },
    ],
    fictional: [
      { name: "Samwise Gamgee", source: "Lord of the Rings", reason: "Loyal to a fault, anxious but brave when it counts, oriented toward protection and safety, Sam embodies the Six's deepest gifts." },
      { name: "Donna Moss", source: "The West Wing", reason: "Devoted, competent, anxious, and defined by loyalty to a mentor and team, the Six finding meaning through faithful service." },
      { name: "George Costanza", source: "Seinfeld", reason: "The unhealthy Six: chronic anxiety, suspicious of everyone's motives, self-sabotaging, and oscillating between cowardice and reactive defiance." },
      { name: "Ron Weasley", source: "Harry Potter", reason: "Loyal, anxious about being outshone, prone to self-doubt, but courageous when his people need him, classic Six energy." },
    ],
  },
  7: {
    real: [
      { name: "Robin Williams", field: "Comedian & Actor", reason: "The Seven's light and shadow: extraordinary creative energy, need for stimulation, charming avoidance of pain, and the difficulty of staying still." },
      { name: "Richard Branson", field: "Entrepreneur", reason: "Endlessly launching new ventures, constantly seeking the next adventure, and building an empire through the Seven's characteristic versatility." },
      { name: "Mozart", field: "Composer", reason: "Restless, prolific, playful, and struggling to stay with one thing, his life and work embody the Seven's creative range and difficulty with limits." },
      { name: "Jim Carrey", field: "Comedian & Actor", reason: "Boundless energy, shape-shifting humor, and a life story of using comedy to outrun early pain, Seven energy in its most visible form." },
      { name: "Amelia Earhart", field: "Aviator", reason: "Driven by the Seven's hunger for freedom, new experiences, and refusal to accept the limits placed on her by convention." },
      { name: "Elton John", field: "Musician", reason: "Extraordinary creative range, excess and flamboyance in his prime, and a life story of learning to stay present enough to grow." },
    ],
    fictional: [
      { name: "Willy Wonka", source: "Charlie and the Chocolate Factory", reason: "The Seven taken to its whimsical extreme: endless imagination, a world built around pleasure, and an underlying darkness that fun papers over." },
      { name: "Peter Pan", source: "J.M. Barrie", reason: "The Seven's core wound mythologized: refusal to grow up, to stay in the pain and responsibility of adult reality, choosing endless adventure instead." },
      { name: "Ferris Bueller", source: "Ferris Bueller's Day Off", reason: "Spontaneous, charming, certain the next experience will be the best one, and gifted at making everyone complicit in his avoidance." },
      { name: "Barney Stinson", source: "How I Met Your Mother", reason: "Maximizes pleasure, avoids commitment, uses humor to deflect pain, and lives in an elaborate fantasy of his own creating." },
    ],
  },
  8: {
    real: [
      { name: "Martin Luther King Jr.", field: "Civil Rights Leader", reason: "The healthy Eight: used their power and confrontational energy not for dominance but to protect the vulnerable and challenge unjust authority." },
      { name: "Winston Churchill", field: "Prime Minister", reason: "Defiant, commanding, unyielding, Churchill's wartime leadership embodied the Eight's refusal to submit and conviction that will can determine outcomes." },
      { name: "Toni Morrison", field: "Author", reason: "A quietly powerful Eight: unflinching in confronting truth, protective of her community's story, and refusing to make her work comfortable for those in power." },
      { name: "Serena Williams", field: "Athlete", reason: "Powerful, direct, protective of herself and her family, unyielding in the face of challenge, she embodies the Eight's force and dignity." },
      { name: "Steve Jobs", field: "Technologist", reason: "The Eight's demanding energy in a business context: controlling, confrontational, certain of his vision, and using power to create and destroy." },
      { name: "Queen Latifah", field: "Musician & Actor", reason: "Commands authority, refuses to diminish herself, and brings the Eight's natural protectiveness to her community and public presence." },
    ],
    fictional: [
      { name: "Tony Soprano", source: "The Sopranos", reason: "The Eight's unhealthy poles: the protective loyalty of a father and the raw domination of a man who cannot allow himself to be vulnerable." },
      { name: "Daenerys Targaryen", source: "Game of Thrones", reason: "The Eight's arc compressed: begins as a protective, justice-seeking leader and deteriorates into dominance and destruction when growth fails." },
      { name: "Miranda Priestly", source: "The Devil Wears Prada", reason: "The Eight's armor perfected: absolute authority, zero tolerance for weakness, and a terrifying certainty in her own standards and will." },
      { name: "Harvey Specter", source: "Suits", reason: "Power-driven, direct, strategically dominant, and using strength to protect loyalists while crushing anyone who threatens his world." },
    ],
  },
  9: {
    real: [
      { name: "Abraham Lincoln", field: "President", reason: "The Nine's gift for holding opposing sides together, his patience, and his capacity to absorb conflict without being destroyed by it." },
      { name: "Carl Jung", field: "Psychologist", reason: "Built a psychology of synthesis and wholeness; his life's work was integrating opposites, the Nine's deepest calling expressed through genius." },
      { name: "Morgan Freeman", field: "Actor & Narrator", reason: "Embodies peace and presence; his voice and manner communicate the Nine's reassuring stillness and capacity to make everyone feel seen." },
      { name: "Barack Obama", field: "President", reason: "The Nine's consensus-building, his refusal to take extreme positions, his calm under pressure, and his orientation toward unity over conflict." },
      { name: "Audrey Hepburn", field: "Actor & Humanitarian", reason: "Gentle, accommodating, with a deep inner world kept largely private, the Nine's grace and desire to bring people together." },
      { name: "Keanu Reeves", field: "Actor", reason: "Known for his groundedness, humility, generosity, and the sense that he simply doesn't need the ego of celebrity, classic Nine energy." },
    ],
    fictional: [
      { name: "Frodo Baggins", source: "Lord of the Rings", reason: "The Nine's journey: a reluctant hero who must learn to assert himself and claim his agency in a world that would rather he disappeared." },
      { name: "Aang", source: "Avatar: The Last Airbender", reason: "The healthy Nine in motion: a peacemaker at heart who must learn to embrace conflict and his own power to fulfill his purpose." },
      { name: "Forrest Gump", source: "Forrest Gump", reason: "Moves through life with extraordinary acceptance, absorbs everything without being changed by it, and embodies the Nine's gentle, unassuming presence." },
      { name: "Marge Simpson", source: "The Simpsons", reason: "Accommodating, conflict-averse, holding the family together through quiet endurance, and occasionally erupting when pushed past her extraordinary patience." },
    ],
  },
};

// ─── Relationship data per type ───────────────────────────────────────────────
const relationshipData: Record<
  number,
  {
    friendship: string;
    romantic: string;
    work: string;
    communicationStyle: string;
    needsFromOthers: string[];
    whatTheyOffer: string[];
    watchOutFor: string[];
    wing1RelStyle: string;
    wing2RelStyle: string;
  }
> = {
  1: {
    friendship: "Ones are devoted, dependable friends who show up consistently and expect the same in return. They take friendships seriously and appreciate depth over breadth. They can be slow to forgive perceived slights but are fiercely loyal to those who earn their trust.",
    romantic: "In romantic relationships, Ones bring dedication, reliability, and a strong desire to build something good together. They hold high standards for themselves and their partners, which can create friction when their inner critic turns outward. Learning to separate love from evaluation is their core relational work.",
    work: "Exceptionally reliable and thorough colleagues who set high standards and deliver consistently. They can struggle with delegation if they feel work won't meet their standards, and may become critical when colleagues take shortcuts. Thriving in environments with clear values and merit-based recognition.",
    communicationStyle: "Direct, precise, and values-driven. Ones communicate with clarity and purpose. They prefer honest feedback over flattery and can deliver criticism that, while accurate, may feel harsh. They appreciate when others engage with the substance of ideas rather than social niceties.",
    needsFromOthers: [
      "Patience with their inner critic, they're harder on themselves than anyone else",
      "Recognition that their standards come from care, not judgment",
      "Space to express frustration without it meaning the relationship is damaged",
      "Partners who share their values and take commitments seriously",
    ],
    whatTheyOffer: [
      "Unwavering loyalty and follow-through on promises",
      "Honest, thoughtful feedback that makes the relationship and work better",
      "A stabilizing presence that holds things together when others can't",
      "Deep integrity, what you see is what you get",
    ],
    watchOutFor: [
      "Resentment that builds silently rather than being expressed directly",
      "Holding others to internal standards they've never communicated",
      "The inner critic projecting onto partners in moments of stress",
      "Difficulty receiving love that doesn't come in the form they expect",
    ],
    wing1RelStyle: "1w9: More introverted and reserved, with a quiet perfectionism. Their standards are deeply internal and they're less likely to express criticism openly, though it burns privately.",
    wing2RelStyle: "1w2: Warmer and more people-oriented. Their idealism extends into caring for others, and they're more likely to vocalize concern while maintaining their principled core.",
  },
  2: {
    friendship: "Twos are warm, attentive friends who remember birthdays, notice when something is wrong, and show up without being asked. Their friendships can become unbalanced over time if they aren't receiving care in return, leading to subtle resentment they rarely express directly.",
    romantic: "In romance, Twos love deeply and expressively. They can lose themselves in their partner's world, making their partner's needs their own. The challenge is distinguishing genuine love from the need to be needed, healthy Two relationships are partnerships, not rescues.",
    work: "Indispensable team members who keep morale high and attend to the human dimension of work. They can over-commit and burn out, and may struggle to say no even when overwhelmed. They work best in environments that appreciate the relational glue they provide.",
    communicationStyle: "Warm, personal, and attentive. Twos listen closely and remember details about the people they care about. They prefer relational conversation over abstract discussion. When distressed, they may communicate indirectly, hinting at needs rather than stating them.",
    needsFromOthers: [
      "Explicit appreciation, not assumed, actually said",
      "Partners who actively reciprocate care without needing to be asked",
      "Permission to say no without guilt",
      "Help identifying and expressing their own needs",
    ],
    whatTheyOffer: [
      "Extraordinary warmth and attunement to others' emotional states",
      "A relationship that makes people feel genuinely seen and known",
      "Remarkable support during difficulties",
      "The gift of making others feel like the most important person in the room",
    ],
    watchOutFor: [
      "Help offered with invisible strings attached",
      "Martyrdom when they feel unappreciated",
      "Passive-aggression when direct expression of needs feels too vulnerable",
      "Over-involvement in others' problems as a way of avoiding their own",
    ],
    wing1RelStyle: "2w1: More restrained and principled in their giving. Less likely to be effusive; more focused on doing what's genuinely right for others. Service is their love language.",
    wing2RelStyle: "2w3: More ambitious and charming. Their helping has a social dimension, they give in ways that also position them as indispensable and admired.",
  },
  3: {
    friendship: "Threes are energizing, inspiring friends who make you want to be your best self. They're excellent at practical support and encouragement. However, they can be poor at slowing down into the emotional depths of friendship, and may keep even close relationships somewhat surface-level.",
    romantic: "Romance for a Three involves real vulnerability, the challenge of being loved for who they are, not what they achieve. They can shape-shift for a partner and lose themselves in image management. Their deepest growth is allowing a partner to see behind the persona.",
    work: "Driven, efficient, and effective colleagues who raise the level of any team. They can struggle with sharing credit, being vulnerable about difficulties, and working in environments without clear metrics of success. They excel when given agency and recognition.",
    communicationStyle: "Confident, efficient, and goal-oriented. Threes cut to the chase and can grow impatient with meandering discussions. They communicate to accomplish; vulnerability in communication is something they learn over time, not a natural default.",
    needsFromOthers: [
      "Love that is clearly unconditional, not contingent on performance",
      "Partners who value who they are, not just what they accomplish",
      "Patience when they don't know who they are outside their roles",
      "Slow, unstructured time that isn't optimized for anything",
    ],
    whatTheyOffer: [
      "Infectious drive and the ability to make those around them believe in themselves",
      "Competent, reliable execution in shared projects",
      "A partner who genuinely celebrates your wins as if they were their own",
      "Social grace and the ability to navigate almost any situation",
    ],
    watchOutFor: [
      "Substituting achievement for intimacy",
      "Managing how the relationship looks rather than how it feels",
      "Difficulty staying present when there's nothing to accomplish",
      "Cutting conversations short when they become emotionally uncomfortable",
    ],
    wing1RelStyle: "3w2: The Charmer, relationship-oriented and warm, bringing care and social intelligence alongside ambition. More likely to invest in the emotional texture of relationships.",
    wing2RelStyle: "3w4: The Professional, more introspective and individualistic. Brings depth and authenticity-seeking to relationships, though also more withdrawn.",
  },
  4: {
    friendship: "Fours offer rare depth in friendship, they want to know your shadow side, not just your highlight reel. They remember the emotional nuances of conversations and take relationships personally. They can withdraw when hurt and may idealize friendships until they inevitably disappoint.",
    romantic: "Romance is where the Four lives. They bring extraordinary depth, passion, and a desire for the relationship to feel meaningful and unique. The challenge is the pull toward longing, idealizing when someone is absent, finding fault when they're present.",
    work: "Brings creativity, authenticity, and unusual perspectives to any team. Can struggle with routine tasks and environments that reward conformity. Needs work that feels meaningful and connected to their identity. Relationships at work must feel genuine or they disengage.",
    communicationStyle: "Rich, emotionally nuanced, and personal. Fours communicate with depth and may expect others to read between the lines. They express themselves through metaphor, story, and feeling. Direct, transactional communication can feel alienating to them.",
    needsFromOthers: [
      "Partners who can sit in emotional depth without trying to fix it",
      "Consistent presence, showing up reliably, not just intensely",
      "Recognition of their unique gifts without making them feel like a project",
      "The freedom to be melancholy without others panicking",
    ],
    whatTheyOffer: [
      "A relationship that goes genuinely deep, not just pleasant and surface",
      "The ability to hold space for others' pain without flinching",
      "Creative transformation of shared experiences into meaning",
      "Fierce loyalty to those who truly see them",
    ],
    watchOutFor: [
      "Withdrawing when hurt and expecting the other to come find them",
      "Romanticizing what's absent while devaluing what's present",
      "Emotional volatility that exhausts partners who aren't similarly wired",
      "Testing love by making themselves difficult to love",
    ],
    wing1RelStyle: "4w3: The Aristocrat, brings ambition and social awareness alongside depth. More likely to channel emotional intensity into creative output and public expression.",
    wing2RelStyle: "4w5: The Bohemian, more withdrawn, cerebral, and iconoclastic. Brings intellectual depth and radical authenticity, but may be harder to reach emotionally.",
  },
  5: {
    friendship: "Fives are fiercely loyal to a small circle of trusted friends, though they need substantial alone time between interactions. Their friendships are often built on shared intellectual passion. They may seem detached, but to those inside their circle, they offer quiet, steady devotion.",
    romantic: "Romantic relationships require Fives to share the inner world they normally guard carefully. They fall deeply but slowly, and once committed, bring tremendous loyalty and depth. The challenge is bridging the gap between their rich inner life and the expressed intimacy their partner needs.",
    work: "Exceptional individual contributors who can go deep on complex problems. They need autonomy and struggle in environments with constant interruption, small talk, or emotional demands. They do their best work when given clear scope and space to disappear into it.",
    communicationStyle: "Precise, measured, and idea-focused. Fives often communicate asynchronously by preference (email, writing) over real-time conversation. They say less than they're thinking, and their emotional communication tends to lag behind the internal experience.",
    needsFromOthers: [
      "Respect for their need for solitude, it isn't rejection",
      "Patience for a slower pace of emotional opening",
      "Intellectual engagement that meets them in the world of ideas",
      "Partners who don't drain their limited energy reserves",
    ],
    whatTheyOffer: [
      "Unwavering loyalty once genuine trust is built",
      "The experience of being truly understood at a deep level",
      "A relationship that grows richer over time as layers are revealed",
      "Unusual perspective and expertise that genuinely enriches those around them",
    ],
    watchOutFor: [
      "Disappearing for days of processing without explanation",
      "Substituting intellectual engagement for emotional presence",
      "Withholding feelings until they become insurmountable",
      "Making partners feel they have to earn access to the real person",
    ],
    wing1RelStyle: "5w4: The Iconoclast, more emotionally expressive and creative. Brings romantic depth and aesthetic sensibility to relationships alongside the Five's characteristic distance.",
    wing2RelStyle: "5w6: The Problem Solver, more grounded and practical. Brings reliability and problem-solving energy to relationships, with slightly more social orientation.",
  },
  6: {
    friendship: "Sixes are among the most loyal friends anyone can have, they show up, they remember, and they defend their people fiercely. The challenge is their anxiety, which can manifest as testing loyalty or worrying about the relationship's stability even when it's solid.",
    romantic: "In romance, Sixes seek security and are willing to build it carefully. Once committed, they are extraordinarily devoted. The shadow is the anxiety that can make them seek constant reassurance or, conversely, act out against the very security they need.",
    work: "Excellent team members who are reliable, thorough, and excellent at anticipating problems. They can become anxious in unstable environments and may spend more energy worrying about what could go wrong than acting. They excel with clear roles, trusted leadership, and consistent expectations.",
    communicationStyle: "Often questioning and probing, Sixes want to understand motivations and test the reliability of information and people. They communicate with genuine warmth but can become reactive under stress. They appreciate directness and are suspicious of too-smooth delivery.",
    needsFromOthers: [
      "Consistency, words that match actions, reliably over time",
      "Partners who don't punish them for their anxiety",
      "Reassurance offered genuinely, not formulaically",
      "Help distinguishing real threats from projected ones",
    ],
    whatTheyOffer: [
      "Loyalty that doesn't waver under pressure",
      "The ability to anticipate problems before they happen",
      "Warmth and care that builds genuine community",
      "Courage that shows up precisely when it's hardest",
    ],
    watchOutFor: [
      "Testing partners' loyalty in ways that strain the relationship",
      "Anxiety-driven reactivity that reads like attack",
      "Projecting worst-case scenarios onto perfectly stable situations",
      "Oscillating between clinging and pushing away",
    ],
    wing1RelStyle: "6w5: The Defender, more introverted and analytical. Brings careful, methodical loyalty with slightly more skepticism and independence.",
    wing2RelStyle: "6w7: The Buddy, warmer and more sociable. Brings humor, charm, and social ease to their loyalty and care.",
  },
  7: {
    friendship: "Sevens are the most fun and stimulating friends around, they create experiences, generate enthusiasm, and make everyone feel like the party is here. The challenge is depth: they may struggle to stay present through the harder, slower, more boring moments of long friendship.",
    romantic: "Romance for Sevens begins with excitement and can fade as the inevitable dailiness of a relationship sets in. Their growth is learning that commitment deepens pleasure rather than limiting it, that staying through difficulty is how the real intimacy is built.",
    work: "Creative, energizing colleagues who generate ideas faster than anyone can implement them. They struggle with sustained focus on one project and may abandon initiatives when the novelty fades. They thrive in dynamic environments with variety and minimal micromanagement.",
    communicationStyle: "Quick, enthusiastic, and generative. Sevens can have three ideas before they finish a sentence and may move faster than others can follow. They communicate with optimism and reframing and can struggle to stay in difficult conversations without pivoting to a silver lining.",
    needsFromOthers: [
      "Partners who can match their energy without enabling avoidance",
      "Gentle accountability for follow-through",
      "The freedom to bring excitement and spontaneity to the relationship",
      "Help sitting in the difficult without being made to feel broken for struggling with it",
    ],
    whatTheyOffer: [
      "Joy, energy, and the ability to make any moment feel alive",
      "Creative abundance, they bring more ideas than a relationship can use",
      "Optimism that genuinely helps partners through difficult times",
      "The gift of making people feel seen in their best, most vital selves",
    ],
    watchOutFor: [
      "Using humor and plans to avoid genuine emotional conversation",
      "Promising more than they can deliver in the follow-through",
      "Treating the relationship as one option among many",
      "Running from depth at the first sign that it requires sitting with discomfort",
    ],
    wing1RelStyle: "7w6: The Entertainer, warmer and more relationally focused. Brings loyalty and care alongside the Seven's characteristic energy and humor.",
    wing2RelStyle: "7w8: The Realist, more assertive and action-oriented. Less charming small talk, more direct and purposeful in pursuing what they want.",
  },
  8: {
    friendship: "Eights are fiercely loyal to those they've chosen to protect. They are direct, honest, and make you feel genuinely safe in a world they know can be harsh. The challenge is that their directness can read as aggression, and their control can crowd out others' agency.",
    romantic: "Love is the domain where Eights' vulnerability lives, they protect it fiercely, and revealing it is an act of profound trust. Partners who earn that trust get a loyalty and passion unmatched in the enneagram. Partners who betray it experience the full force of the Eight's wrath.",
    work: "Commanding presence and decisive leadership make Eights natural for high-stakes environments. They can steamroll quieter voices and struggle with consensus-building. They respect competence and directness; they lose patience with what they perceive as weakness or political maneuvering.",
    communicationStyle: "Direct, assertive, and unambiguous. Eights say what they mean and expect the same. They can read social softening as dishonesty and prefer the clean clarity of a direct 'no' over polite deflection. Under stress, their directness becomes confrontational.",
    needsFromOthers: [
      "Partners who can hold their own without collapsing, Eights test strength instinctively",
      "The experience of being safe to be vulnerable without being seen as weak",
      "Directness, don't manage them, tell them the truth",
      "Loyalty that doesn't waver when they're difficult",
    ],
    whatTheyOffer: [
      "Protection that is absolute, they will stand between their people and harm",
      "Honesty that, while sometimes hard to hear, is never manipulative",
      "The experience of being with someone who makes you feel genuinely safe",
      "Energy and passion that make shared pursuits feel important and alive",
    ],
    watchOutFor: [
      "Dominance that is control masquerading as leadership",
      "Protecting so fiercely that partners lose their own agency",
      "Intensity that reads as aggression even when it isn't meant that way",
      "Testing love by escalating conflict to see if the other will stay",
    ],
    wing1RelStyle: "8w7: The Maverick, more energetic, expansive, and pleasure-seeking. Brings charisma and adventure alongside power. Less interested in control, more in freedom.",
    wing2RelStyle: "8w9: The Bear, calmer, more patient, more genuinely protective. Brings steadiness and warmth. Their force is more contained, their loyalty quieter and deeper.",
  },
  9: {
    friendship: "Nines are among the most accepting and soothing friends available, they create an atmosphere where people feel they can be exactly who they are. The challenge is their tendency to go along: they may not express what they actually want, leading to quiet resentment over time.",
    romantic: "In romance, Nines can lose themselves entirely in their partner's world, taking on their preferences and priorities. The deepest relational work for a Nine is maintaining a separate self, having preferences, expressing them, and sometimes creating healthy friction.",
    work: "Stabilizing, unifying presence in any team. Excellent mediators who can see all sides. The challenge is asserting their own perspective and completing things when there's no external urgency. They can be quietly obstinate when pushed, a stubbornness that surprises people who see only their agreeableness.",
    communicationStyle: "Warm, indirect, and conflict-averse. Nines often communicate in the key of yes even when they mean no. They are excellent listeners who can hold space for multiple perspectives. Learning to assert 'I think differently' without framing it as conflict is their communication growth edge.",
    needsFromOthers: [
      "Partners who actively draw out their preferences and perspectives",
      "Encouragement to assert themselves, not praise for always agreeing",
      "Patience when they move more slowly than the situation demands",
      "Recognition that their acceptance is a gift, not a lack of personality",
    ],
    whatTheyOffer: [
      "An acceptance so genuine it creates safety for others to be fully themselves",
      "The rare gift of truly listening without agenda",
      "A stabilizing, peaceful presence that holds groups together",
      "Love that doesn't ask you to be different than you are",
    ],
    watchOutFor: [
      "Passive-aggression when they can't say no directly",
      "Disappearing into routines rather than engaging with relationship issues",
      "Stubborn inertia disguised as easygoing acceptance",
      "Waking up in a life they chose by never saying what they actually wanted",
    ],
    wing1RelStyle: "9w8: The Referee, more assertive and direct. Their peace-seeking has teeth. They're willing to intervene and can be surprisingly stubborn when pushed too far.",
    wing2RelStyle: "9w1: The Dreamer, more idealistic and principled. Brings a quiet moral clarity to their acceptance and is more likely to hold values-based positions.",
  },
};

// ─── Levels of Development per type ───────────────────────────────────────────
const levelsOfDevelopment: Record<
  number,
  {
    healthy: [string, string, string];
    average: [string, string, string];
    unhealthy: [string, string, string];
  }
> = {
  1: {
    healthy: [
      "Level 1, Wise Realism: Accepts themselves and the world as imperfect yet workable. Their discernment becomes wisdom; they inspire by being rather than correcting.",
      "Level 2, Principled Reform: Channels the inner critic toward genuine improvement. Their standards serve others; they lead by example with grace.",
      "Level 3, The Conscientious Idealist: Orderly, responsible, and reliable. Works hard toward meaningful improvement while maintaining self-compassion.",
    ],
    average: [
      "Level 4, The Judgmental Perfectionist: Standards shift from self to others. Begins critiquing people and situations, becoming impersonal and rigid.",
      "Level 5, The Orderly Person: Becomes rule-bound and inflexible. Suppresses anger; resentment builds as the inner critic intensifies.",
      "Level 6, The Contradictory Critic: Hypocritical, judges others for things they allow themselves. Preachy, self-righteous, and hard to satisfy.",
    ],
    unhealthy: [
      "Level 7, The Intolerant Perfectionist: Condemning and punishing. Sees themselves as completely righteous and others as irredeemably flawed.",
      "Level 8, The Obsessive Controller: Overwhelmed by imperfection everywhere. May develop anxiety disorders, OCD, or become oppressive in their correction.",
      "Level 9, The Punishing Presence: Cruel, merciless self-condemnation and condemnation of others. Complete breakdown of their moral framework.",
    ],
  },
  2: {
    healthy: [
      "Level 1, The Unconditional Lover: Gives freely without need for return. Love flows from abundance; they are genuinely altruistic and joyful.",
      "Level 2, The Caring Giver: Warm, empathetic, and genuinely helpful. Their care is freely given and they can also receive it well.",
      "Level 3, The Nurturing Friend: Supportive and encouraging. Truly attuned to others' needs and motivated by genuine care.",
    ],
    average: [
      "Level 4, The People-Pleaser: Begins helping to be liked and needed. Attuned to others' preferences, they start adjusting themselves accordingly.",
      "Level 5, The Possessive Helper: Becomes intrusive and controlling. Gives to create dependency; feels resentful when help isn't appreciated.",
      "Level 6, The Flattering Manipulator: Uses emotional tactics to maintain closeness. Ingratiating, then passive-aggressive when manipulation fails.",
    ],
    unhealthy: [
      "Level 7, The Entitled Victim: Feels owed for past sacrifice. Begins playing the victim to extract care they can no longer earn through giving.",
      "Level 8, The Coercive Manipulator: Controlling through guilt and emotional manipulation. Their giving becomes a weapon.",
      "Level 9, The Hysteric: Emotional collapse when the image of the selfless giver shatters completely.",
    ],
  },
  3: {
    healthy: [
      "Level 1, The Authentic Self: Achieves from genuine self-expression; success is a byproduct of being fully themselves. Inspiring and humble.",
      "Level 2, The Admirable Person: Talented, competent, and genuinely accomplished. Self-accepting and able to celebrate others without competition.",
      "Level 3, The Motivated Achiever: Energetic, goal-oriented, and effective. Brings out the best in others through enthusiasm and competence.",
    ],
    average: [
      "Level 4, The Calculating Image-Maker: Achievement becomes about image. Competes for status; adapts persona to maximize admiration.",
      "Level 5, The Pragmatic Promoter: Self-promotion takes over. Exaggerates accomplishments; becomes calculating and expedient.",
      "Level 6, The Self-Deceived Narcissist: Loses track of who they actually are beneath the performance. Deceptive with themselves and others.",
    ],
    unhealthy: [
      "Level 7, The Exploitative Opportunist: Uses people instrumentally for advancement. Betrays when convenient.",
      "Level 8, The Malicious Deceiver: Lies and manipulates without remorse. Will destroy others' reputations to maintain their own.",
      "Level 9, The Vindictive Failure: When the image collapses, may become violent or destructive to those who witnessed it.",
    ],
  },
  4: {
    healthy: [
      "Level 1, The Inspired Creator: Transforms personal experience into universal meaning. Their depth becomes a gift to the world.",
      "Level 2, The Introspective Truthteller: Deeply self-aware and authentic. Their emotional honesty creates real connection and genuine art.",
      "Level 3, The Sensitive Person: Expressive, creative, and empathetic. Moves others through their authenticity and willingness to feel deeply.",
    ],
    average: [
      "Level 4, The Temperamental Individual: Begins withholding, testing others' care. Self-absorbed and moody; emotional experiences intensify.",
      "Level 5, The Self-Indulgent Dreamer: Wallows in feeling. Fantasy and melancholy serve as refuges from action and engagement.",
      "Level 6, The Tormented Artist: Chronic feelings of deficiency. Envious and alienated, pushing others away while craving connection.",
    ],
    unhealthy: [
      "Level 7, The Alienated Depressive: Complete withdrawal. Believes they are beyond redemption or understanding.",
      "Level 8, The Emotionally Turbulent: Self-destructive. May use substances or extreme behavior to manage emotional overwhelm.",
      "Level 9, The Despairing Self: Complete hopelessness and potential self-harm as the Four's search for identity collapses.",
    ],
  },
  5: {
    healthy: [
      "Level 1, The Visionary Pioneer: Breakthrough insights that genuinely advance human understanding. Present and engaged, sharing their inner world.",
      "Level 2, The Perceptive Observer: Combines extraordinary insight with genuine openness. Engages with the world while maintaining depth.",
      "Level 3, The Thoughtful Expert: Deep and focused knowledge offered in service of others. Can step into action from their knowledge base.",
    ],
    average: [
      "Level 4, The Analytical Retreater: Withdraws from emotional demands. Becomes observer rather than participant; intellectualizes everything.",
      "Level 5, The Eccentric Specialist: Increasingly narrow in focus. Social eccentricity grows; becomes attached to their mental world.",
      "Level 6, The Isolated Thinker: Completely disengaged from social reality. High-strung and provocative; may begin to feel persecuted.",
    ],
    unhealthy: [
      "Level 7, The Nihilistic Cynic: Believes nothing has value. Detached from care or consequence.",
      "Level 8, The Delusional Recluse: Paranoid and unstable. The elaborate inner world becomes increasingly divorced from consensus reality.",
      "Level 9, The Schizoid Collapse: Complete withdrawal from shared reality; possible breakdown of coherent mental functioning.",
    ],
  },
  6: {
    healthy: [
      "Level 1, The Courageously Trusting: Faces fear directly; acts despite uncertainty. Genuine faith in themselves and life as workable.",
      "Level 2, The Stable Loyalist: Dependable and supportive while also self-reliant. Finds inner authority alongside external trust.",
      "Level 3, The Responsible Person: Hard-working, committed, and cooperative. Manages anxiety productively through competent preparation.",
    ],
    average: [
      "Level 4, The Dutiful Dependent: Seeks authority figures to replace inner certainty. Conformist, reactive, and anxiety-driven.",
      "Level 5, The Suspicious Worrier: Vigilant, reactive, and defensive. Sees threats everywhere and tests loyalty persistently.",
      "Level 6, The Reactive Rebel: Alternates between submission and defiance. Anxious reactivity and increasing divisiveness.",
    ],
    unhealthy: [
      "Level 7, The Paranoid Thinker: Persecution complex. Sees enemies where there are none and acts preemptively against imagined threats.",
      "Level 8, The Panicky Aggressor: Frantic and self-defeating. Acts against their own interests in panic.",
      "Level 9, The Self-Defeating Masochist: Brings on the feared disaster themselves, confirming their worst beliefs about the world.",
    ],
  },
  7: {
    healthy: [
      "Level 1, The Joyfully Present: Deeply satisfied in the present moment. Joy comes from depth of engagement, not novelty.",
      "Level 2, The Enthusiastic Visionary: Brings genuine joy and creativity. Accomplishes substantial things through focused enthusiasm.",
      "Level 3, The Productive Achiever: Enthusiastic, versatile, and action-oriented. Channels their energy into real accomplishment.",
    ],
    average: [
      "Level 4, The Experience-Seeker: Begins accumulating experiences to avoid missing out. Restless and comparative.",
      "Level 5, The Hyperactive Escapist: Scattered, impulsive, and over-stimulated. Excessive and distracted; avoids anything that requires sustained discomfort.",
      "Level 6, The Demanding Infantile: Demanding of others; entitled about getting their needs for stimulation met immediately.",
    ],
    unhealthy: [
      "Level 7, The Manic Escapist: Reckless and impulsive. Pursues stimulation that harms themselves and others.",
      "Level 8, The Addictive Personality: Uses substances or addictive behaviors to maintain stimulation and avoid pain.",
      "Level 9, The Panic Attack: When all escape routes close, terror and breakdown emerge from the pain that has been running from them.",
    ],
  },
  8: {
    healthy: [
      "Level 1, The Heroic Leader: Uses power in genuine service of others. Magnanimous, merciful, and courageous in protection of the vulnerable.",
      "Level 2, The Decisive Provider: Authoritative and generous. Protects and empowers those in their care with genuine investment.",
      "Level 3, The Confident Self-Asserter: Resourceful, self-reliant, and direct. Takes initiative and leads effectively.",
    ],
    average: [
      "Level 4, The Domineering Controller: Power becomes self-serving. Begins controlling others rather than protecting them.",
      "Level 5, The Confrontational Challenger: Intimidating and combative. Anticipates resistance and responds aggressively.",
      "Level 6, The Ruthless Adversary: Sees everyone as a potential threat. Dominating without mercy to maintain control.",
    ],
    unhealthy: [
      "Level 7, The Dictatorial Tyrant: Total domination. Uses fear and force; others are instruments of their will.",
      "Level 8, The Megalomaniac: Grandiose belief in their own power and right to rule. Others' wellbeing is irrelevant.",
      "Level 9, The Destructive Force: If unable to control, they destroy. The Eight's shadow turned wholly outward.",
    ],
  },
  9: {
    healthy: [
      "Level 1, The Serene Presence: Fully self-possessed while remaining connected. Their peace is dynamic, not passive, it heals those around them.",
      "Level 2, The Receptive Healer: Open, supportive, and genuinely present. Their acceptance creates genuine safety for others.",
      "Level 3, The Supportive Mediator: Easygoing and reassuring. Skilled at bringing people together; stable and grounded.",
    ],
    average: [
      "Level 4, The Complacent Accommodator: Begins merging with others' agendas. Passive and conflict-averse; losing track of own priorities.",
      "Level 5, The Passive Resister: Stubborn inertia. Resists change passively; goes through motions without genuine engagement.",
      "Level 6, The Disengaged Sleepwalker: Numbs out through habits and routines. Dissociated from their own life.",
    ],
    unhealthy: [
      "Level 7, The Neglectful Presence: Complete disengagement from responsibility. Allows harm through inaction.",
      "Level 8, The Depersonalized Self: Losing the sense of a self altogether. Anxiety erupts as the numbing fails.",
      "Level 9, The Dissociated Collapse: Complete dissolution of self; potential breakdown from the accumulated weight of unlived life.",
    ],
  },
};

// ─── Myths per type ────────────────────────────────────────────────────────────
const myths: Record<number, [string, string, string]> = {
  1: [
    "Ones are joyless and never have fun, In reality, healthy Ones experience deep, genuine joy. Their capacity for appreciation of what is truly good is extraordinary; they simply don't manufacture false positivity.",
    "Ones are only critical of others, The inner critic is directed primarily inward. Most Ones are harder on themselves than on anyone else, and many work hard to keep their criticism to themselves.",
    "Ones want perfection in everything, Ones have a strong sense of which things matter. Many are perfectly comfortable with messiness in low-stakes areas; it's the things they care about where standards kick in.",
  ],
  2: [
    "Twos are selfless and never want anything, Twos have needs like everyone else. What's unusual is their trained difficulty in acknowledging and expressing them directly.",
    "Twos are only warm and sweet, Unhealthy Twos can be manipulative, controlling, and even vindictive when they feel their care is unappreciated. The warmth is real, but so is the shadow.",
    "Twos give without expecting anything, Most Twos give with implicit expectations, even if they can't admit this to themselves. Growth involves making those expectations conscious and explicit.",
  ],
  3: [
    "Threes are shallow and only care about appearances, Healthy Threes are deeply genuine, generous, and caring. The image-focus is a coping mechanism developed around a wound, not the core of who they are.",
    "Threes always know what they want, Threes can be deeply out of touch with their own authentic desires, having spent so much energy shaping themselves for others' approval.",
    "Threes are always confident, The three's confidence is often performed. Inside, many Threes carry profound anxiety about their worth, always aware that performance might fail.",
  ],
  4: [
    "Fours are always sad and dramatic, Fours have a rich emotional range. They can be extraordinarily joyful, funny, and playful. Their emotional range includes the heights as well as the depths.",
    "Fours are self-absorbed, Fours are actually capable of extraordinary empathy precisely because they've explored the depth of their own experience. Their self-focus is a search for identity, not selfishness.",
    "Fours want to be miserable, What Fours actually want is to be authentic. They resist performing happiness they don't feel, which can look like choosing misery but is actually choosing truth.",
  ],
  5: [
    "Fives don't have emotions, Fives have rich emotional lives. What's unusual is their tendency to experience emotions with a delay, processing them privately and internally before (if ever) expressing them.",
    "Fives are antisocial and hate people, Fives value select relationships intensely. Their apparent coldness is often shyness, energy management, or a high bar for authentic connection rather than misanthropy.",
    "Fives are only interested in data and not people, Many Fives are deeply interested in people, as subjects of study, as appreciated intimates, as fascinating puzzles. Their approach to people is just more analytical.",
  ],
  6: [
    "Sixes are cowards, Sixes are often extraordinarily courageous precisely because they act in spite of fear rather than in the absence of it. Courage without awareness of danger is easy; Six courage is the real thing.",
    "Sixes just need to relax and trust, The Six's anxiety runs at a structural level and isn't solved by reassurance or advice to calm down. What helps is building genuine inner authority over time.",
    "Sixes can't make decisions, Sixes are actually decisive when they trust themselves. The indecision appears when anxiety is high and self-trust is low, which is variable, not constant.",
  ],
  7: [
    "Sevens are happy all the time, Sevens run from pain; that doesn't mean they don't experience it. Underneath the brightness is often significant anxiety, grief, or a sense of deprivation they're unable to sit with.",
    "Sevens can't commit, Healthy Sevens commit deeply to the things and people that genuinely matter to them. The issue is commitment to things that feel like obligation or limitation rather than expansion.",
    "Sevens are shallow and irresponsible, Sevens at their best are brilliant, creative, and accomplished. Their range and speed of thought can look scattered when they're avoiding something; it can look like genius when they're engaged.",
  ],
  8: [
    "Eights are bullies, The Eight's directness and intensity can read as aggression, but healthy Eights are among the most protective, generous, and just people you will ever meet. Their energy is a strength, not a flaw.",
    "Eights don't have feelings, Eights have intense feelings. What they avoid is vulnerability, not because they're unfeeling, but because being vulnerable has historically felt dangerous.",
    "Eights just want to control everything, Eights want to avoid being controlled. Their drive for control is defensive, not megalomaniacal. They relax when they feel genuinely safe.",
  ],
  9: [
    "Nines have no personality, Nines have rich inner worlds, deep convictions, and strong preferences. What they often lack is the habit of asserting these into relationships and the world. They are frequently the most interesting person in the room who never quite showed up.",
    "Nines are always agreeable and never get angry, Nines experience anger. It often comes out indirectly through passive resistance, forgetting, procrastination, or occasional explosive outbursts that surprise everyone.",
    "Nines are simple and easy, Nines are among the most complex of the types. Their merging quality, their layered inner world, and their capacity to hold contradictions without forcing resolution make them fascinatingly hard to know.",
  ],
};

// ─── Growth content per type ───────────────────────────────────────────────────
const growthContent: Record<
  number,
  {
    thrivingDescription: string;
    strugglingDescription: string;
    integrationDescription: string;
    disintegrationDescription: string;
  }
> = {
  1: {
    thrivingDescription: "When thriving, the One radiates a quiet moral authority that inspires without lecturing. Their discernment becomes wisdom, their standards become service. They can work hard, rest without guilt, and experience genuine joy in ordinary moments. The inner critic becomes a trusted advisor rather than a relentless judge.",
    strugglingDescription: "When struggling, the One becomes rigidly self-critical and extends that critic outward. Resentment builds silently as they measure the gap between how things are and how they should be. Small imperfections loom large; they struggle to receive love because they can't accept being imperfect themselves.",
    integrationDescription: "Moving toward Type 7: The One begins to access spontaneous joy, playfulness, and the freedom to engage with life without every experience being evaluated. They discover that imperfection can be delightful, not just tolerated.",
    disintegrationDescription: "Moving toward Type 4: Under severe stress, Ones become moody, withdrawn, and self-pitying. They may feel profoundly misunderstood and begin dramatizing their inner pain rather than suppressing it. The controlled surface breaks down.",
  },
  2: {
    thrivingDescription: "When thriving, the Two gives freely from genuine abundance, without keeping score or building resentment. They're in touch with their own needs and can ask for what they want. Their warmth creates real connection rather than dependency, and they receive love as gracefully as they give it.",
    strugglingDescription: "When struggling, the Two gives to get and rarely admits it. Resentment builds as they pour out without receiving in return. They may become manipulative, using guilt and emotional pressure to extract the care they need but can't ask for directly.",
    integrationDescription: "Moving toward Type 4: The Two accesses their own inner world, their feelings, needs, and authentic self beyond the helping role. They discover that they exist as a full person even when they're not needed.",
    disintegrationDescription: "Moving toward Type 8: Under stress, Twos become domineering, aggressive, and openly controlling. The warm helper disappears; what emerges is someone demanding recognition for everything they've given and willing to use force to get it.",
  },
  3: {
    thrivingDescription: "When thriving, the Three achieves from the inside out, their success is a byproduct of living authentically and caring about the work for its own sake. They're generous with their success, good at slowing down into intimacy, and in touch with what they actually feel and want.",
    strugglingDescription: "When struggling, the Three becomes a polished, frantic shell. Every relationship is managed for impression; every achievement is calculated for maximum recognition. They've lost track of who they are beneath the performance and may not even notice.",
    integrationDescription: "Moving toward Type 6: The Three develops genuine loyalty, commitment, and the ability to be vulnerable within trusted relationships. They stop performing and start collaborating, discovering that trust and connection are more satisfying than admiration.",
    disintegrationDescription: "Moving toward Type 9: Under severe stress, Threes slow down and zone out, avoiding the mounting awareness of their inauthenticity. They become listless, disengaged, and may numb out rather than face what the pace of performance has cost them.",
  },
  4: {
    thrivingDescription: "When thriving, the Four channels their emotional depth into creative work and genuine connection. They're present without clinging, creative without melodrama, and able to appreciate ordinary moments without feeling that something essential is missing. Their uniqueness is expressed, not defended.",
    strugglingDescription: "When struggling, the Four spirals inward. They compare their inside to others' outsides and always come up lacking. They idealize what they don't have, devalue what they do, and push away the very connection they're craving through emotional volatility.",
    integrationDescription: "Moving toward Type 1: The Four develops discipline, follow-through, and the ability to channel their emotional richness into consistent creative work. They discover that structure and craft serve expression rather than limiting it.",
    disintegrationDescription: "Moving toward Type 2: Under stress, Fours become clingy, intrusive, and emotionally manipulative. They reach for connection through intensity and need, demanding attention and care rather than cultivating it naturally.",
  },
  5: {
    thrivingDescription: "When thriving, the Five is a genuine pioneer, sharing their extraordinary inner world generously, engaging with others without feeling depleted, and acting from their deep knowledge rather than endlessly accumulating more. They're present, connected, and surprisingly warm.",
    strugglingDescription: "When struggling, the Five retreats completely into their mind. They parse information without engaging the world, pull back from all emotional demands, and begin building elaborate systems of thought as a substitute for living. Isolation deepens.",
    integrationDescription: "Moving toward Type 8: The Five steps into decisive action, leadership, and physical presence. They discover that their knowledge is powerful when applied, not just catalogued, and that engaging the world doesn't deplete them the way they feared.",
    disintegrationDescription: "Moving toward Type 7: Under severe stress, Fives become uncharacteristically scattered, impulsive, and hyperactive. They flit between stimuli without deepening anything, a frantic version of their usual focused withdrawal.",
  },
  6: {
    thrivingDescription: "When thriving, the Six has developed genuine inner authority alongside their relational loyalty. They act courageously despite fear, trust their own judgment, and bring people together with warmth that isn't driven by anxiety. Their preparation serves rather than paralyzes.",
    strugglingDescription: "When struggling, the Six is dominated by worst-case thinking. They test loyalty incessantly, read neutral situations as threatening, and oscillate between anxious compliance and defiant rebellion. Their anxiety becomes self-fulfilling as it strains the very relationships it's trying to protect.",
    integrationDescription: "Moving toward Type 9: The Six finds genuine inner peace and the ability to trust without needing certainty. They discover that the security they've been seeking outside themselves is available internally, and that letting go is less dangerous than they thought.",
    disintegrationDescription: "Moving toward Type 3: Under stress, Sixes become calculating, competitive, and image-focused. They start performing competence to compensate for inner doubt and may become surprisingly arrogant as their anxiety drives ambitious overcompensation.",
  },
  7: {
    thrivingDescription: "When thriving, the Seven is present in a way that's genuinely profound, fully inhabiting a single moment rather than scanning for the next one. Their joy comes from depth, not novelty. They follow through on commitments and discover that limitation is where meaning lives.",
    strugglingDescription: "When struggling, the Seven is never quite there. They're always planning the next thing, spinning five projects simultaneously, using humor and plans to avoid sitting with any real difficulty. They feel vaguely dissatisfied despite having everything.",
    integrationDescription: "Moving toward Type 5: The Seven discovers the deep pleasure of going into one thing completely. They develop focus, patience, and the capacity to know something fully rather than knowing many things partially.",
    disintegrationDescription: "Moving toward Type 1: Under stress, Sevens become uncharacteristically critical, perfectionistic, and rigid. They find fault where they usually see possibility, and their impatience crystallizes into judgment.",
  },
  8: {
    thrivingDescription: "When thriving, the Eight is a force for genuine good in the world, using their power to protect, to challenge injustice, to create structures that allow others to thrive. Their vulnerability is available to trusted intimates, and their directness is in service of connection rather than control.",
    strugglingDescription: "When struggling, the Eight uses control as armor. They dominate conversations and environments, experience tenderness as weakness to be hidden, and may become genuinely frightening to people who have done nothing wrong.",
    integrationDescription: "Moving toward Type 2: The Eight accesses genuine tenderness and the ability to care for others from a place of love rather than protection. They discover that opening to vulnerability makes them stronger, not weaker, and that being needed is actually deeply satisfying.",
    disintegrationDescription: "Moving toward Type 5: Under extreme stress, Eights withdraw, become paranoid, and disconnect from their usual engagement. They plot from a distance rather than engaging directly, a departure from their characteristic frontal approach.",
  },
  9: {
    thrivingDescription: "When thriving, the Nine is a dynamic, self-possessed presence, fully engaged with their own life, asserting their needs and perspectives, and bringing their gift of peace to others from a place of fullness rather than self-erasure. Their acceptance heals those around them.",
    strugglingDescription: "When struggling, the Nine disappears into routines and the agendas of others. They forget what they want, avoid the conflicts that would clarify their needs, and wake up in a life they didn't quite choose, wondering why nothing feels quite real.",
    integrationDescription: "Moving toward Type 3: The Nine develops focus, ambition, and the energy to pursue their own goals rather than supporting everyone else's. They discover that self-assertion doesn't destroy peace, it creates a more authentic version of it.",
    disintegrationDescription: "Moving toward Type 6: Under stress, Nines become uncharacteristically anxious, suspicious, and reactive. The calm surface breaks as anxiety they've been merging into everything finally rises into awareness.",
  },
};

// ─── Component: Tab Button ─────────────────────────────────────────────────────
function TabButton({
  active,
  onClick,
  children,
  accentColor,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accentColor: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
        active ? "text-white shadow-md" : "hover:text-violet-400"
      }`}
      style={active ? { backgroundColor: accentColor } : { color: "rgba(255,255,255,0.5)" }}
    >
      {children}
    </button>
  );
}

// ─── Component: DNA Card ───────────────────────────────────────────────────────
function DnaCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="p-5 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: `${accent}18` }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
        {label}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{value}</p>
    </div>
  );
}

// ─── Component: Level row (structured) ────────────────────────────────────────
function LevelRow({
  level,
  color,
  index,
}: {
  level: string;
  color: string;
  index: number;
}) {
  const [title, ...rest] = level.split(": ");
  const desc = rest.join(": ");
  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-3 items-start"
    >
      <div
        className="w-3 h-3 rounded-full mt-1 shrink-0"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{title}</p>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Component: Structured Level Card ─────────────────────────────────────────
function StructuredLevelCard({
  item,
  color,
  bgColor,
  borderColor,
}: {
  item: { level: number; title: string; description: string };
  color: string;
  bgColor: string;
  borderColor: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left"
    >
      <div
        className="rounded-xl px-4 py-3 transition-all"
        style={{ background: bgColor, border: `1px solid ${borderColor}` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
            style={{ backgroundColor: color, color: "#fff" }}
          >
            {item.level}
          </div>
          <p className="flex-1 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
            {item.title}
          </p>
          <ChevronRight
            className="w-4 h-4 shrink-0 transition-transform"
            style={{
              color: "rgba(255,255,255,0.3)",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm leading-relaxed mt-3 pl-10" style={{ color: "rgba(255,255,255,0.55)" }}>
                {item.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

// ─── Component: Subtype Card ───────────────────────────────────────────────────
function SubtypeCard({
  subtype,
  accent,
}: {
  subtype: (typeof subtypes)[0];
  accent: string;
}) {
  const instinctIcons = {
    sp: <Shield className="w-4 h-4" />,
    sx: <Flame className="w-4 h-4" />,
    so: <Users className="w-4 h-4" />,
  };
  const instinctLabels = { sp: "Self-Pres", sx: "Sexual", so: "Social" };
  return (
    <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${accent}18`,
                color: accent,
              }}
            >
              {instinctIcons[subtype.instinct]}
              {instinctLabels[subtype.instinct]}
            </span>
            {subtype.isCountertype && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium text-amber-400" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
                Countertype
              </span>
            )}
          </div>
          <h3 className="text-lg font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
            {subtype.chestnutName}
          </h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
        {subtype.description}
      </p>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          Key Patterns
        </p>
        <ul className="space-y-1">
          {subtype.keyPatterns.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span
                className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                style={{ backgroundColor: accent }}
              />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
          How They Differ
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{subtype.howTheyDiffer}</p>
      </div>
      <div className="mt-3 p-3 rounded-xl border" style={{ borderColor: `${accent}30`, backgroundColor: `${accent}06` }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: accent }}>
          Growth Path
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{subtype.growthPath}</p>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function TypeDeepDivePage() {
  const params = useParams();
  const typeNum = parseInt(String(params.type), 10);
  const { profile, loaded } = useProfile();

  const typeData = enneagramTypes.find((t) => t.number === typeNum);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [typeNum]);

  if (!typeData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <p style={{ color: "rgba(255,255,255,0.35)" }}>Type not found.</p>
      </div>
    );
  }

  const prevType = typeNum === 1 ? 9 : typeNum - 1;
  const nextType = typeNum === 9 ? 1 : typeNum + 1;
  const isUsersType = loaded && profile.enneagramType === typeNum;

  const typeSubtypes = subtypes.filter((s) => s.type === typeNum);
  const integrationType = enneagramTypes.find(
    (t) => t.number === typeData.integrationLine
  );
  const disintegrationType = enneagramTypes.find(
    (t) => t.number === typeData.disintegrationLine
  );

  const levels = levelsOfDevelopment[typeNum];
  const relData = relationshipData[typeNum];
  const famous = famousExamples[typeNum];
  const growthInfo = growthContent[typeNum];
  const typeMythsList = myths[typeNum];

  const accent = typeData.color;

  const tabs = [
    "Overview",
    "3 Subtypes",
    "Relationships",
    "Growth Path",
    "Famous Examples",
    "Portraits",
  ];

  const vignette = typeVignettes.find((v) => v.typeNumber === typeNum);

  return (
    <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
      {/* ── Breadcrumb ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          <Link href="/enneagram" className="hover:text-violet-400 transition-colors" style={{ color: "rgba(255,255,255,0.35)" }}>
            Enneagram
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
            Type {typeData.number}
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-5"
          style={{ backgroundColor: accent }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 opacity-10"
          style={{ backgroundColor: accent }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-6 flex-wrap">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-serif font-bold shrink-0 shadow-lg"
                style={{ backgroundColor: accent }}
              >
                {typeData.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="text-4xl sm:text-5xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                    {typeData.name}
                  </h1>
                  {isUsersType && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: `${accent}15`,
                        color: accent,
                        borderColor: `${accent}30`,
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      This is your type
                    </span>
                  )}
                </div>
                <p className="text-lg mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{typeData.alias}</p>
                <p
                  className="text-base font-medium"
                  style={{ color: accent }}
                >
                  {typeData.coreMotivation}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Navigation arrows ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/enneagram/${prevType}`}
            className="flex items-center gap-2 text-sm transition-colors hover:text-violet-400"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Type {prevType}
          </Link>
          <Link
            href="/compare"
            className="text-xs transition-colors underline underline-offset-2 hover:text-violet-400"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Compare with another type
          </Link>
          <Link
            href={`/enneagram/${nextType}`}
            className="flex items-center gap-2 text-sm transition-colors hover:text-violet-400"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Type {nextType}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 p-1 rounded-xl overflow-x-auto mb-8 scrollbar-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
          {tabs.map((tab, i) => (
            <TabButton
              key={tab}
              active={activeTab === i}
              onClick={() => setActiveTab(i)}
              accentColor={accent}
            >
              {tab}
            </TabButton>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="overview"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* In a nutshell */}
              <div className="p-6 rounded-2xl shadow-sm mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                  In a Nutshell
                </p>
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {typeData.description}
                </p>
              </div>

              {/* Horney + Harmonic Group Badges */}
              {(typeData.horneyGroup || typeData.harmonicGroup) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {typeData.horneyGroup && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: typeData.horneyGroup === 'compliant'
                          ? "rgba(16,185,129,0.12)" : typeData.horneyGroup === 'aggressive'
                          ? "rgba(239,68,68,0.12)" : "rgba(99,102,241,0.12)",
                        border: typeData.horneyGroup === 'compliant'
                          ? "1px solid rgba(16,185,129,0.25)" : typeData.horneyGroup === 'aggressive'
                          ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(99,102,241,0.25)",
                        color: typeData.horneyGroup === 'compliant'
                          ? "#6ee7b7" : typeData.horneyGroup === 'aggressive'
                          ? "#fca5a5" : "#a5b4fc",
                      }}
                    >
                      Horney:{" "}
                      {typeData.horneyGroup === 'compliant'
                        ? "Moving Toward"
                        : typeData.horneyGroup === 'aggressive'
                        ? "Moving Against"
                        : "Moving Away"}
                    </span>
                  )}
                  {typeData.harmonicGroup && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: typeData.harmonicGroup === 'positive_outlook'
                          ? "rgba(245,158,11,0.12)" : typeData.harmonicGroup === 'competency'
                          ? "rgba(14,165,233,0.12)" : "rgba(236,72,153,0.12)",
                        border: typeData.harmonicGroup === 'positive_outlook'
                          ? "1px solid rgba(245,158,11,0.25)" : typeData.harmonicGroup === 'competency'
                          ? "1px solid rgba(14,165,233,0.25)" : "1px solid rgba(236,72,153,0.25)",
                        color: typeData.harmonicGroup === 'positive_outlook'
                          ? "#fcd34d" : typeData.harmonicGroup === 'competency'
                          ? "#7dd3fc" : "#f9a8d4",
                      }}
                    >
                      Harmonic:{" "}
                      {typeData.harmonicGroup === 'positive_outlook'
                        ? "Positive Outlook"
                        : typeData.harmonicGroup === 'competency'
                        ? "Competency"
                        : "Reactive"}
                    </span>
                  )}
                </div>
              )}

              {/* DNA Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <DnaCard
                  label="Core Fear"
                  value={typeData.coreFear}
                  icon={<AlertTriangle className="w-5 h-5" />}
                  accent={accent}
                />
                <DnaCard
                  label="Core Desire"
                  value={typeData.coreDesire}
                  icon={<Heart className="w-5 h-5" />}
                  accent={accent}
                />
                <DnaCard
                  label="Core Motivation"
                  value={typeData.coreMotivation}
                  icon={<Activity className="w-5 h-5" />}
                  accent={accent}
                />
                <DnaCard
                  label="Superpower"
                  value={typeData.healthyTraits.join(", ")}
                  icon={<Sparkles className="w-5 h-5" />}
                  accent={accent}
                />
                <DnaCard
                  label="Fatal Flaw"
                  value={typeData.unhealthyTraits.slice(0, 3).join(", ")}
                  icon={<Eye className="w-5 h-5" />}
                  accent={accent}
                />
                <DnaCard
                  label="Wings"
                  value={`${typeData.wings.left} · ${typeData.wings.right}`}
                  icon={<BookOpen className="w-5 h-5" />}
                  accent={accent}
                />
              </div>

              {/* Wing Deep-Dive */}
              {typeData.wingDescriptions && (
                <div className="mb-8">
                  <h2 className="text-xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
                    Wing Deep-Dive
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[typeData.wingDescriptions.left, typeData.wingDescriptions.right].map((wing) => (
                      <div key={wing.name} className="p-5 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>{wing.name}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{wing.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Relationship Dynamics */}
              {(() => {
                const dynamics = relationshipDynamics[typeData.number];
                if (!dynamics) return null;
                return (
                  <div className="mb-8">
                    <h2 className="text-xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.93)" }}>
                      Common Relationship Dynamics
                    </h2>
                    <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Pattern recognition, not prediction. Context and individual health always matter more.
                    </p>
                    <div className="space-y-3">
                      {dynamics.struggles.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(239,68,68,0.7)" }}>
                            Common challenges
                          </p>
                          <div className="space-y-2">
                            {dynamics.struggles.map((item) => {
                              const otherType = enneagramTypes.find(t => t.number === item.withType);
                              return (
                                <div
                                  key={item.withType}
                                  className="flex gap-3 p-3.5 rounded-xl"
                                  style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}
                                >
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                                    style={{ backgroundColor: otherType?.color ?? "#666" }}
                                  >
                                    {item.withType}
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                                      with {otherType?.name ?? `Type ${item.withType}`}
                                    </p>
                                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                                      {item.why}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {dynamics.thrives.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-2 mt-4" style={{ color: "rgba(16,185,129,0.7)" }}>
                            Natural affinities
                          </p>
                          <div className="space-y-2">
                            {dynamics.thrives.map((item) => {
                              const otherType = enneagramTypes.find(t => t.number === item.withType);
                              return (
                                <div
                                  key={item.withType}
                                  className="flex gap-3 p-3.5 rounded-xl"
                                  style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}
                                >
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                                    style={{ backgroundColor: otherType?.color ?? "#666" }}
                                  >
                                    {item.withType}
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                                      with {otherType?.name ?? `Type ${item.withType}`}
                                    </p>
                                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                                      {item.why}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Levels of Development */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                    Levels of Development
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                    Riso-Hudson
                  </span>
                </div>
                {typeData.levels ? (
                  <div className="space-y-3">
                    {/* Healthy band */}
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
                      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(16,185,129,0.08)" }}>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                        <p className="text-sm font-semibold text-emerald-400">Healthy. Levels 1–3</p>
                        <p className="text-xs ml-auto" style={{ color: "rgba(255,255,255,0.3)" }}>Tap to expand</p>
                      </div>
                      <div className="px-3 pb-3 pt-1 space-y-1.5" style={{ background: "rgba(16,185,129,0.03)" }}>
                        {typeData.levels.healthy.map((item) => (
                          <StructuredLevelCard
                            key={item.level}
                            item={item}
                            color="#10b981"
                            bgColor="rgba(16,185,129,0.07)"
                            borderColor="rgba(16,185,129,0.15)"
                          />
                        ))}
                      </div>
                    </div>
                    {/* Average band */}
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(245,158,11,0.2)" }}>
                      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(245,158,11,0.08)" }}>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                        <p className="text-sm font-semibold text-amber-400">Average. Levels 4–6</p>
                      </div>
                      <div className="px-3 pb-3 pt-1 space-y-1.5" style={{ background: "rgba(245,158,11,0.03)" }}>
                        {typeData.levels.average.map((item) => (
                          <StructuredLevelCard
                            key={item.level}
                            item={item}
                            color="#f59e0b"
                            bgColor="rgba(245,158,11,0.07)"
                            borderColor="rgba(245,158,11,0.15)"
                          />
                        ))}
                      </div>
                    </div>
                    {/* Unhealthy band */}
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
                      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(239,68,68,0.08)" }}>
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                        <p className="text-sm font-semibold text-red-400">Unhealthy. Levels 7–9</p>
                      </div>
                      <div className="px-3 pb-3 pt-1 space-y-1.5" style={{ background: "rgba(239,68,68,0.03)" }}>
                        {typeData.levels.unhealthy.map((item) => (
                          <StructuredLevelCard
                            key={item.level}
                            item={item}
                            color="#ef4444"
                            bgColor="rgba(239,68,68,0.07)"
                            borderColor="rgba(239,68,68,0.15)"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Healthy */}
                    <div className="p-5 rounded-2xl shadow-sm" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <p className="text-sm font-semibold text-emerald-400">Healthy (Levels 1–3)</p>
                      </div>
                      <div className="space-y-4">
                        {levels.healthy.map((l, i) => (
                          <LevelRow key={i} level={l} color="#10b981" index={i} />
                        ))}
                      </div>
                    </div>
                    {/* Average */}
                    <div className="p-5 rounded-2xl shadow-sm" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <p className="text-sm font-semibold text-amber-400">Average (Levels 4–6)</p>
                      </div>
                      <div className="space-y-4">
                        {levels.average.map((l, i) => (
                          <LevelRow key={i} level={l} color="#f59e0b" index={i} />
                        ))}
                      </div>
                    </div>
                    {/* Unhealthy */}
                    <div className="p-5 rounded-2xl shadow-sm" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <p className="text-sm font-semibold text-red-400">Unhealthy (Levels 7–9)</p>
                      </div>
                      <div className="space-y-4">
                        {levels.unhealthy.map((l, i) => (
                          <LevelRow key={i} level={l} color="#ef4444" index={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Traits Cloud */}
              <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <h2 className="text-xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
                  Trait Signature
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    ...typeData.keyTraits,
                    ...typeData.healthyTraits,
                    ...typeData.averageTraits,
                    ...typeData.unhealthyTraits,
                  ].map((trait, i) => {
                    const isHealthy = typeData.healthyTraits.includes(trait);
                    const isUnhealthy = typeData.unhealthyTraits.includes(trait);
                    const bgColor = isHealthy
                      ? "#10b981"
                      : isUnhealthy
                      ? "#ef4444"
                      : accent;
                    return (
                      <span
                        key={`${trait}-${i}`}
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: bgColor, opacity: 0.85 }}
                      >
                        {trait}
                      </span>
                    );
                  })}
                </div>
                <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Green = healthy · Type accent = average · Red = unhealthy
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="subtypes"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                  The 3 Subtypes of Type {typeData.number}
                </h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Each type expresses differently based on which of the three
                  instincts, Self-Preservation, Sexual, or Social, is
                  dominant. One subtype is typically a "countertype" that can
                  look quite different from the classic type description.
                </p>
              </div>
              <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
                {typeSubtypes.map((st) => (
                  <SubtypeCard key={st.instinct} subtype={st} accent={accent} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="relationships"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="space-y-6">
                {/* Relationship contexts */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "In Friendships",
                      text: relData.friendship,
                      icon: <Users className="w-5 h-5" />,
                    },
                    {
                      label: "In Romance",
                      text: relData.romantic,
                      icon: <Heart className="w-5 h-5" />,
                    },
                    {
                      label: "At Work",
                      text: relData.work,
                      icon: <Activity className="w-5 h-5" />,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-5 rounded-2xl shadow-sm"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${accent}18` }}
                      >
                        <span style={{ color: accent }}>{item.icon}</span>
                      </div>
                      <h3 className="font-serif font-semibold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                        {item.label}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Communication style */}
                <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="w-5 h-5" style={{ color: accent }} />
                    <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                      Communication Style
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {relData.communicationStyle}
                  </p>
                </div>

                {/* Needs & Offers */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <h3 className="font-serif font-semibold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
                      What They Need from Others
                    </h3>
                    <ul className="space-y-2">
                      {relData.needsFromOthers.map((need) => (
                        <li
                          key={need}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: accent }}
                          />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <h3 className="font-serif font-semibold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
                      What They Offer
                    </h3>
                    <ul className="space-y-2">
                      {relData.whatTheyOffer.map((offer) => (
                        <li
                          key={offer}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: "#10b981" }}
                          />
                          {offer}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Watch out for */}
                <div
                  className="p-6 rounded-2xl border shadow-sm"
                  style={{
                    backgroundColor: `${accent}06`,
                    borderColor: `${accent}25`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle
                      className="w-5 h-5"
                      style={{ color: accent }}
                    />
                    <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                      Watch Out For
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {relData.watchOutFor.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Wing comparison */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      label: typeData.wings.left,
                      text: relData.wing1RelStyle,
                    },
                    {
                      label: typeData.wings.right,
                      text: relData.wing2RelStyle,
                    },
                  ].map((wing) => (
                    <div
                      key={wing.label}
                      className="p-5 rounded-2xl shadow-sm"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wide mb-2"
                        style={{ color: accent }}
                      >
                        {wing.label}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {wing.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div
              key="growth"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="space-y-6">
                {/* Integration / Disintegration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl" style={{ background: "rgba(16,185,129,0.12)" }}>
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                          Growth / Integration
                        </p>
                        <p className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                          Moving toward Type {integrationType?.number}{" "}
                          {integrationType && `${integrationType.name}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {growthInfo.integrationDescription}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl" style={{ background: "rgba(239,68,68,0.12)" }}>
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-red-400">
                          Stress / Disintegration
                        </p>
                        <p className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                          Moving toward Type {disintegrationType?.number}{" "}
                          {disintegrationType &&
                            `${disintegrationType.name}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {growthInfo.disintegrationDescription}
                    </p>
                  </div>
                </div>

                {/* Thriving vs Struggling */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-emerald-400" />
                      <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                        When You're Thriving
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {growthInfo.thrivingDescription}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                        When You're Struggling
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {growthInfo.strugglingDescription}
                    </p>
                  </div>
                </div>

                {/* Daily Practices */}
                <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5" style={{ color: accent }} />
                    <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                      5 Daily Practices for Type {typeData.number}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {typeData.growthTips.map((tip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-4"
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: accent }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed pt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {tip}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Journal Prompts */}
                <div
                  className="p-6 rounded-2xl border shadow-sm"
                  style={{
                    backgroundColor: `${accent}06`,
                    borderColor: `${accent}25`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5" style={{ color: accent }} />
                    <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                      Journal Prompts
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {typeData.journalPrompts.map((prompt, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span
                          className="text-lg font-serif font-bold shrink-0 leading-none mt-0.5"
                          style={{ color: accent }}
                        >
                          "
                        </span>
                        <p className="text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Myths */}
                <div className="p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <h3 className="font-serif font-semibold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
                    3 Myths About Type {typeData.number}
                  </h3>
                  <div className="space-y-4">
                    {typeMythsList.map((myth, i) => {
                      const [claim, ...explanation] = myth.split(", ");
                      return (
                        <div key={i} className="flex items-start gap-4">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                            style={{
                              backgroundColor: `${accent}18`,
                              color: accent,
                            }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-sm font-semibold line-through" style={{ color: "rgba(255,255,255,0.5)" }}>
                              Myth: {claim}
                            </p>
                            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                              Reality: {explanation.join(", ")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 4 && (
            <motion.div
              key="famous"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="space-y-8">
                {/* Real People */}
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
                    Real People
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {famous.real.map((person, i) => (
                      <motion.div
                        key={person.name}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="p-5 rounded-2xl shadow-sm"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-serif font-bold shrink-0"
                            style={{ backgroundColor: accent }}
                          >
                            {person.name[0]}
                          </div>
                          <div>
                            <p className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                              {person.name}
                            </p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{person.field}</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {person.reason}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Fictional Characters */}
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
                    Fictional Characters
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {famous.fictional.map((char, i) => (
                      <motion.div
                        key={char.name}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="p-5 rounded-2xl shadow-sm"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border-2"
                            style={{
                              borderColor: accent,
                              color: accent,
                              backgroundColor: `${accent}12`,
                            }}
                          >
                            {char.name[0]}
                          </div>
                          <div>
                            <p className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>
                              {char.name}
                            </p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{char.source}</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {char.reason}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Note: Enneagram typings of public figures are interpretive and based on widely documented analyses. No typing is definitive without first-person confirmation.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 5 && (
            <motion.div
              key="portraits"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                  Portraits
                </h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Narrative snapshots showing Type {typeData.number} psychology in everyday life.
                </p>
              </div>
              {vignette ? (
                <TypeVignetteSection vignette={vignette} />
              ) : (
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Portraits not available for this type yet.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

