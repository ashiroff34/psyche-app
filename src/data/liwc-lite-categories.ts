// LIWC-Lite Word Categories
//
// A lightweight, browser-side dictionary of word categories used for
// personality prediction. Based on published LIWC category structure
// (Pennebaker et al.) and Empath categories (Stanford, Fast et al. 2016).
//
// Each category contains ~20-50 high-frequency, prototype words.
// This is intentionally a coarse approximation — full LIWC has 6,400+
// words across 66 categories. We cover the ~20 categories that have
// published correlations with Big Five traits (per Yarkoni 2010).
//
// Sources:
//   - Yarkoni, T. (2010). Personality in 100,000 words. Journal of Research in Personality.
//   - Pennebaker, J. W., Boyd, R. L., Jordan, K., & Blackburn, K. (2015). LIWC2015 manual.
//   - Fast, E., Chen, B., & Bernstein, M. (2016). Empath (Stanford).

export type CategoryName =
  | "pronoun_i"          // I, me, my, mine, myself
  | "pronoun_we"         // we, us, our, ours, ourselves
  | "pronoun_you"        // you, your, yours
  | "pronoun_they"       // they, them, their
  | "articles"           // a, an, the
  | "prepositions"       // to, of, in, for, with, on, at, by, from...
  | "negations"          // no, not, never, don't, won't, can't, nothing...
  | "quantifiers"        // all, some, few, many, most...
  | "pos_emotion"        // happy, love, good, great, joy, wonderful...
  | "neg_emotion"        // sad, bad, hate, wrong, terrible, awful...
  | "anxiety"            // worry, anxious, nervous, afraid, scared...
  | "anger"              // angry, hate, furious, mad, rage, annoyed...
  | "sadness"            // sad, cry, lonely, miss, grief, hurt...
  | "social"             // people, friend, family, meet, talk, share...
  | "family"             // mom, dad, mother, father, brother, sister...
  | "friend"             // friend, buddy, pal, mate, neighbor...
  | "sexual"             // sex, love, kiss, intimate, desire, passion...
  | "cognitive"          // think, know, believe, consider, wonder...
  | "insight"            // realize, understand, see, notice, figure...
  | "causation"          // because, cause, reason, since, therefore...
  | "certainty"          // always, never, definitely, sure, certain...
  | "tentative"          // maybe, perhaps, guess, seems, might...
  | "achievement"        // win, success, achieve, accomplish, earn, goal...
  | "swear"              // (curated common list)
  | "body"               // body, face, hands, eyes, heart, skin...
  | "work"               // work, job, boss, office, career, paycheck...
  | "leisure"            // play, game, movie, music, fun, hobby...
  | "time"               // today, now, soon, later, yesterday, morning...
  | "future_focus"       // will, gonna, plan, next, soon, later...
  | "past_focus";        // was, had, used to, back then, before, then...

export const LIWC_LITE: Record<CategoryName, string[]> = {
  pronoun_i: [
    "i", "me", "my", "mine", "myself", "i'm", "i've", "i'd", "i'll",
  ],
  pronoun_we: [
    "we", "us", "our", "ours", "ourselves", "we're", "we've", "we'd", "we'll",
  ],
  pronoun_you: [
    "you", "your", "yours", "yourself", "yourselves", "you're", "you've", "you'd", "you'll",
  ],
  pronoun_they: [
    "they", "them", "their", "theirs", "themselves", "they're", "they've",
  ],
  articles: [
    "a", "an", "the",
  ],
  prepositions: [
    "to", "of", "in", "for", "on", "with", "at", "by", "from", "up", "about",
    "into", "over", "after", "beneath", "under", "above", "between", "through",
    "during", "before", "beside", "beyond", "across", "against", "among",
  ],
  negations: [
    "no", "not", "never", "none", "nothing", "nobody", "nowhere",
    "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "cannot",
    "couldn't", "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't",
    "hadn't", "shouldn't", "mustn't",
  ],
  quantifiers: [
    "all", "some", "few", "many", "most", "several", "every", "each", "any",
    "much", "more", "less", "enough", "lots", "plenty",
  ],
  pos_emotion: [
    "happy", "happiness", "joy", "joyful", "love", "loved", "loving", "good",
    "great", "wonderful", "amazing", "awesome", "beautiful", "nice", "fine",
    "glad", "grateful", "thankful", "blessed", "proud", "excited", "cheerful",
    "delighted", "pleased", "smile", "laugh", "fun", "enjoy", "enjoyed", "warm",
    "bright", "light", "peaceful", "calm", "content", "safe",
  ],
  neg_emotion: [
    "sad", "bad", "hate", "hated", "wrong", "terrible", "awful", "horrible",
    "worst", "ugly", "stupid", "annoying", "hurt", "pain", "painful", "lost",
    "broken", "tired", "exhausted", "drained", "miserable", "fail", "failure",
    "lose", "loss", "regret", "guilt", "ashamed", "ugly", "gross", "cold",
    "dark", "heavy", "stuck", "trapped",
  ],
  anxiety: [
    "worry", "worried", "worrying", "anxious", "anxiety", "nervous", "afraid",
    "scared", "fear", "fearful", "frightened", "terrified", "panic", "dread",
    "uneasy", "tense", "stressed", "stress", "overwhelmed", "nervous",
    "restless", "paranoid", "uncertain", "unsure",
  ],
  anger: [
    "angry", "anger", "furious", "mad", "rage", "annoyed", "irritated", "hate",
    "hated", "hostile", "frustrated", "frustration", "pissed", "upset",
    "resent", "resentful", "bitter", "outraged", "fuming", "livid",
  ],
  sadness: [
    "sad", "sadness", "cry", "crying", "tears", "lonely", "loneliness", "miss",
    "missed", "grief", "grieving", "mourn", "depressed", "depression", "hurt",
    "hurts", "ache", "aching", "heavy", "empty", "numb", "alone", "alone",
    "hopeless", "lost",
  ],
  social: [
    "people", "person", "someone", "everyone", "others", "friend", "friends",
    "family", "group", "community", "team", "together", "meet", "meeting",
    "talk", "talking", "share", "sharing", "conversation", "connect",
    "connection", "relationship", "social", "gathering", "party", "dinner",
    "visit", "visiting",
  ],
  family: [
    "mom", "mother", "dad", "father", "parent", "parents", "brother", "sister",
    "siblings", "son", "daughter", "child", "children", "kids", "baby",
    "grandma", "grandpa", "grandmother", "grandfather", "aunt", "uncle",
    "cousin", "nephew", "niece", "husband", "wife", "spouse", "family",
    "relative",
  ],
  friend: [
    "friend", "friends", "friendship", "buddy", "buddies", "pal", "mate",
    "mates", "bestie", "bff", "neighbor", "colleague", "coworker", "roommate",
  ],
  sexual: [
    "sex", "sexy", "sexual", "love", "lover", "intimate", "intimacy", "desire",
    "passion", "passionate", "kiss", "kissing", "naked", "touch", "body",
    "beautiful", "attractive", "gorgeous", "hot", "chemistry",
  ],
  cognitive: [
    "think", "thinking", "thought", "thoughts", "know", "knew", "known",
    "believe", "believed", "understand", "understood", "consider", "wonder",
    "wondering", "imagine", "reason", "idea", "ideas", "mind", "brain",
    "reflect", "ponder", "analyze",
  ],
  insight: [
    "realize", "realized", "understand", "understood", "see", "saw", "notice",
    "noticed", "figure", "figured", "recognize", "recognized", "aware",
    "awareness", "clarity", "clear", "obvious", "discover", "discovered",
    "learn", "learned", "insight",
  ],
  causation: [
    "because", "cause", "caused", "causing", "reason", "reasons", "since",
    "therefore", "so", "thus", "hence", "consequently", "result", "results",
    "effect", "affect", "due", "owing", "lead", "leads",
  ],
  certainty: [
    "always", "never", "definitely", "certainly", "sure", "surely", "certain",
    "absolutely", "totally", "completely", "entirely", "truly", "really",
    "actually", "clearly", "obviously", "undoubtedly", "guarantee", "exactly",
  ],
  tentative: [
    "maybe", "perhaps", "guess", "seems", "seem", "seemed", "might", "may",
    "could", "would", "possibly", "probably", "likely", "unlikely", "suppose",
    "assume", "appear", "appeared", "sort", "kind", "somewhat", "rather",
  ],
  achievement: [
    "win", "won", "winning", "success", "successful", "succeed", "achieve",
    "achieved", "accomplish", "accomplished", "earn", "earned", "goal", "goals",
    "ambition", "ambitious", "best", "top", "first", "compete", "competition",
    "work", "worked", "effort", "try", "tried",
  ],
  swear: [
    "damn", "hell", "crap", "sucks", "shit", "fuck", "ass", "bitch", "bastard",
    "piss", "pissed", "dammit",
  ],
  body: [
    "body", "face", "head", "hand", "hands", "eye", "eyes", "heart", "chest",
    "skin", "hair", "mouth", "lips", "throat", "stomach", "back", "legs",
    "feet", "arm", "arms", "shoulders", "neck", "breath", "breathing",
  ],
  work: [
    "work", "worked", "working", "job", "jobs", "career", "boss", "office",
    "coworker", "colleague", "meeting", "project", "deadline", "task", "tasks",
    "paycheck", "salary", "employer", "employee", "business", "company",
    "corporate",
  ],
  leisure: [
    "play", "playing", "game", "games", "movie", "movies", "film", "music",
    "song", "songs", "dance", "dancing", "fun", "hobby", "hobbies", "book",
    "books", "read", "reading", "tv", "show", "shows", "party", "vacation",
    "travel", "traveling", "relax", "relaxed",
  ],
  time: [
    "today", "now", "soon", "later", "yesterday", "tomorrow", "morning",
    "afternoon", "evening", "night", "day", "days", "week", "weeks", "month",
    "months", "year", "years", "hour", "hours", "minute", "minutes", "moment",
    "always", "never", "sometimes", "often", "rarely",
  ],
  future_focus: [
    "will", "gonna", "going", "plan", "plans", "planning", "next", "soon",
    "later", "tomorrow", "eventually", "someday", "upcoming", "future",
    "hopefully", "expect", "expecting", "looking", "forward",
  ],
  past_focus: [
    "was", "were", "had", "used", "then", "before", "ago", "back", "once",
    "previously", "past", "earlier", "remembered", "remembering", "remembered",
    "yesterday", "childhood", "history", "history", "memory", "memories",
  ],
};

// Total word count across all categories (for sanity check + UI display)
export const TOTAL_WORDS = Object.values(LIWC_LITE).reduce((sum, arr) => sum + arr.length, 0);
