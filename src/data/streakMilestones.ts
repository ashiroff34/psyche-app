export interface StreakMilestone {
  days: number;
  title: string;
  messages: Record<number, string>; // type number → personalized message
  genericMessage: string;           // fallback if no type set
}

export const streakMilestones: StreakMilestone[] = [
  {
    days: 7,
    title: "One Week In",
    genericMessage: "You've shown up every day for a week. Most people open an app once and forget it exists. You didn't. That's not nothing. it's the start of a real pattern. What made this week feel worth it?",
    messages: {
      1: "One week of showing up. For a One, consistency often comes with an internal ledger. tracking what was 'good enough,' what fell short. But you're still here. What if this week wasn't about being perfect at it. what if just returning was the whole point?",
      2: "Seven days in. Twos often invest energy into everyone else's growth before their own. This streak is evidence of something directed inward. toward you. What does it feel like to tend to yourself this consistently?",
      3: "A week of practice, unattached to an outcome anyone else will see. For a Three, that's quietly radical. doing something for its own sake. What have you noticed about yourself when there's no performance involved?",
      4: "You've been here for a week. Fours often struggle when the feeling of the practice fades and it starts to feel routine rather than meaningful. What has kept you returning even on the days it felt ordinary?",
      5: "Seven days. For a Five, sustained engagement with emotional or reflective practice can feel draining rather than energizing. And yet you kept coming back. What did you find worth the energy expenditure?",
      6: "One week. Sixes often navigate a quiet tension between commitment and doubt. 'Am I doing this right? Will I keep this up?' You've kept this up. What does it feel like to trust yourself for seven days straight?",
      7: "A full week in. Sevens often feel the pull toward the next thing before this thing has fully landed. You stayed. What has surprised you about returning to the same practice day after day?",
      8: "Seven days of showing up. For an Eight, sustained inner work can feel counterintuitive. vulnerability and reflection aren't typically where Eights seek strength. What have you found in this practice that's worth protecting?",
      9: "You've shown up every day for a week. Nines often lose momentum on things that only serve themselves. the inner pull toward what others need is stronger. This streak is yours. What has it been like to prioritize your own growth this consistently?",
    },
  },
  {
    days: 30,
    title: "30 Days",
    genericMessage: "A full month of daily practice. You've built something real here. not just a habit, but a relationship with your own inner life. What has shifted in how you see yourself over the last 30 days?",
    messages: {
      1: "Thirty days of practice without the promise of perfection. The One's inner critic may have had opinions about every session. But you kept going despite that commentary. What have you learned about the difference between doing something well and doing something consistently?",
      2: "A month. For a Two, thirty days of self-directed practice is a quiet act of self-respect. sustained investment in your own development rather than someone else's. What do you know about yourself now that you couldn't have seen a month ago?",
      3: "30 days. You've stayed with this practice even when it couldn't be converted into a result or a credential. For a Three, that kind of sustained engagement with the unmeasurable is genuinely meaningful. What has this month revealed about what you actually value?",
      4: "Thirty days of showing up. Type 4s often struggle with consistency when things feel routine rather than meaningful. You found a way through that. What made this practice feel worth returning to, even on the days it felt flat?",
      5: "A month of practice. Fives tend to prefer knowledge that can be fully processed and contained. But thirty days of lived reflection is different. it accumulates in ways that resist neat categorization. What has emerged that surprised you?",
      6: "30 days. Sixes build trust slowly and test it constantly. You've now tested yourself for a month. and you passed. What does it mean to have kept a commitment to yourself for this long?",
      7: "30 days. For a Seven, staying with one thing this long is genuinely difficult. your mind is wired to scan for what's next. What has surprised you about this practice? What has deepened that wouldn't have if you'd moved on?",
      8: "A month of daily inner work. Eights often build stamina for external challenges. endurance in the world. This is a different kind of stamina: the capacity to stay with yourself. What has sustained you?",
      9: "Thirty days of showing up for yourself. For a Nine, this kind of sustained self-attention can feel unfamiliar. even slightly uncomfortable. Something in you has been directing inward for a month. What has it been like to take your own growth this seriously?",
    },
  },
  {
    days: 60,
    title: "Two Months",
    genericMessage: "Two months. This is no longer a streak. it's become part of who you are. The practice has had time to work on you in ways you can't fully see yet. What are you different about now that you couldn't have predicted?",
    messages: {
      1: "Two months of showing up. not perfectly, but consistently. For a One, there's something quietly profound in the difference between those two things. You didn't have to do this perfectly to keep doing it. What has this practice taught you about the relationship between discipline and self-compassion?",
      2: "Sixty days of tending to yourself. Twos are often the ones who sustain everyone else's growth. This streak is evidence that you've turned that same sustained care inward. What has this practice given you that helping others couldn't?",
      3: "Two months. You've built something that has no audience, no credential attached, no external validation. And you kept building it anyway. For a Three, that's not nothing. it's a profound act of authenticity. What do you know about your real self now that sixty days ago you might not have?",
      4: "Two months of returning. Fours often move toward what feels new and alive, and away from what has become familiar. You stayed with the familiar here. What has revealed itself through repetition that could only have been found by staying?",
      5: "Sixty days. For a Five, two months of sustained reflective practice is a significant commitment of inner resources. The question is no longer whether you can do it. you've demonstrated that. The question is: what do you do with what you've found?",
      6: "Two months. Sixes can spend enormous energy managing anxiety about commitment. will they follow through, will it be worth it, what if it falls apart? You've answered those questions. What does it feel like to have been that trustworthy to yourself?",
      7: "Sixty days. This is genuinely rare for a Seven. staying with one thing long enough for it to accrue meaning beneath the surface. What has depth revealed that variety never could? What do you see now that sixty sessions of showing up has made visible?",
      8: "Two months of looking inward with the same intensity you bring to the outer world. Eights often have extraordinary access to strength and little patience for vulnerability. Sixty days of inner work is evidence of both. What has this practice made you stronger in ways you didn't expect?",
      9: "Two months of showing up. Nines often lose themselves in other people's rhythms. This streak is evidence of something directed inward. yours. What have you noticed about yourself that you couldn't have seen before? And what do you want to do with what you now know?",
    },
  },
  {
    days: 90,
    title: "The Pattern Sees Itself",
    genericMessage: "Ninety days. Something shifted and you may not be able to name exactly what. The pattern hasn't changed. You are still the same type, the same core motivation, the same fear underneath it all. But your relationship to the pattern has changed. You catch it faster. You hold it lighter. The defense that once ran you is now something you see. Seeing it is the whole practice.",
    messages: {
      1: "Ninety days. Your inner critic is still here. it will always be here. But somewhere in the last three months, you started hearing it as a voice instead of as the truth. That distinction, the moment you notice it's a voice rather than reality, is the entire practice. The pattern stays. The grip loosens.",
      2: "Three months. The impulse to give before being asked is still there. It will always be there. But you've spent ninety days learning to see it happen in real time. That seeing is not a cure. It is something better: awareness. You still care deeply. You just know more about what the caring is doing.",
      3: "Ninety days of practice that no one can see. For you, that's the hardest kind. The performance instinct is still there. It will always be there. But you've been doing this without an audience for three months, and that is evidence of something your pattern says doesn't exist: intrinsic worth.",
      4: "Three months. The longing hasn't disappeared. It won't. But something about how you hold it has shifted. You can feel the pull toward 'somewhere else, something more' and recognize it as a pattern, not a prophecy. The depth you sought was here all along. You just needed ninety days to slow down enough to see it.",
      5: "Ninety days. The retreat to the mind is still your first move under pressure. It always will be. But you have spent three months practicing the return, stepping back into contact after withdrawing. That return is the growth, not the retreat. The pattern stays. The recovery gets faster.",
      6: "Three months. The scanning is still happening. It will always happen. But somewhere in the last ninety days, you started catching the scan before it completed. That catch, the moment you notice you're looking for danger that isn't there, is everything. Trust doesn't mean the doubt stops. It means you act anyway.",
      7: "Ninety days. The pull toward the next thing is still there. It will always be there. But you have stayed with one practice for three months, and that is a kind of proof your pattern says is impossible: depth from repetition. The freedom you sought in variety was hiding in stillness all along.",
      8: "Three months of looking inward. The armor is still there. It will always be there. But you've spent ninety days practicing something your pattern calls weakness: being open without being threatened. That practice hasn't made you weaker. It has made your strength more precise.",
      9: "Ninety days. The merging impulse is still there. It will always be there. But you have spent three months directing attention inward, toward your own preferences, your own voice. That voice hasn't gotten louder. It has gotten clearer. The difference is everything.",
    },
  },
];
