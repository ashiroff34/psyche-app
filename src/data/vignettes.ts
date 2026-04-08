export interface TypeVignette {
  typeNumber: number;
  healthy: { title: string; story: string };
  average: { title: string; story: string };
  stress: { title: string; story: string };
  relationship: { title: string; story: string };
}

export const typeVignettes: TypeVignette[] = [
  {
    typeNumber: 1,
    healthy: {
      title: "At Their Best",
      story: `She's in the Wednesday staff meeting when she notices the error. a figure in the report that's off by a decimal point. She mentions it once, plainly. "I think that number might be 2.7, not 27." The conversation moves on. She doesn't repeat herself, doesn't append a sigh, doesn't silently catalog it alongside seventeen other imprecisions she's noticed this week. The correction was necessary; it's been made. She moves her attention back to the present. On the drive home she stops for groceries and spends an extra five minutes choosing tomatoes. not anxiously, but with genuine pleasure in the small act of selecting something good. There is no voice behind her thoughts telling her she should be doing something more important. The world is improvable and she improves what she can, and then she rests.`,
    },
    average: {
      title: "The Daily Grind",
      story: `He reads his colleague's email for the third time. The phrasing is imprecise. "we'll try to get this done soon". and he has already drafted two responses. The first was too sharp; he deleted it. The second was careful but still communicates what he actually thinks, which is that "soon" is not a plan. He deletes that one too. He types a third version. He knows, on some level, that this email does not matter as much as his nervous system is insisting it does. But there is a right way to say things and a wrong way, and the gap between them is not nothing. He sends the third version. It is professional, clear, slightly clipped. He has an awareness. never quite settling. that the world contains more imprecision than he can correct for, and that this is somehow his problem to manage.`,
    },
    stress: {
      title: "Under Pressure",
      story: `She is rewriting the email for the fourth time. She knows this is excessive. The inner critic does not care. The first draft was unkind; the second was sycophantic; the third was technically correct but somehow still wrong in a way she can feel but can't locate. There's a tightness across her chest that she associates with failure. not dramatic failure, just the low-grade failure of being a person who makes errors, who isn't quite good enough, who sees the gap between what is and what should be so clearly that merely existing in the gap is exhausting. She knows other people don't feel this. She finds it difficult to understand how. She sends the fourth draft. She will think about whether it was right for the next two days.`,
    },
    relationship: {
      title: "In Relationship",
      story: `Her partner leaves the dishes in the drying rack for two days. She has mentioned before that she prefers to put them away immediately. She didn't make a rule of it, but she said it. She finds herself returning to this small fact throughout the day. noting it, contextualing it, assigning it a weight that shifts each time she looks. By evening she has said nothing and feels a quiet, bitter clarity: this is what she means when she says she does more than her share. Her partner notices she is quieter than usual and asks if everything is fine. She says yes, which is nearly true. What she cannot say is that what feels wrong is not the dishes but the distance between how carefully she attends to others and how rarely that attention is returned in kind.`,
    },
  },
  {
    typeNumber: 2,
    healthy: {
      title: "At Their Best",
      story: `She brings soup to her neighbor without needing it to become a whole thing. She knocks, leaves it on the step with a note, and walks back to her own apartment. She doesn't wait to be thanked. She doesn't engineer a conversation out of it, doesn't mention it at dinner so someone else can remark how thoughtful she is. It was a simple act from a genuine impulse, and it asked for nothing in return. Later, when a friend calls and asks how she is, she actually tells them. not the curated version, not "I'm fine, but how are you" as a pivot away from herself, but something real and slightly unguarded. She has been practicing this: the uncomfortable art of receiving care as gracefully as she gives it.`,
    },
    average: {
      title: "The Daily Grind",
      story: `He has agreed to help plan four events this month. He said yes to all of them within hours of being asked, before he had time to consult his actual capacity. He's also covering a shift at work for someone who didn't ask him directly. he offered, before they could ask, because anticipating needs is a reflex. He's good at it. He doesn't entirely resent it. But there is a growing arithmetic in the back of his mind: a silent ledger that tracks what he's given and what has come back. He doesn't say anything about it, because to say anything would be to admit that his generosity has a cost, and somehow that feels like a betrayal of who he is supposed to be.`,
    },
    stress: {
      title: "Under Pressure",
      story: `She can feel the irritation before she can name it. The dinner was her idea, she did most of the cooking, and the conversation has circled entirely around other people's problems for two hours. She participated warmly, as she always does. She asked the follow-up questions. She remembered the details from last time. No one has asked how she is. She tells herself it doesn't matter. She tells herself she doesn't need it. Then her friend mentions, casually, that she's started seeing a different therapist, someone her other friend had recommended, and something tightens inside her. She had offered. She had been available. She manages to smile. The ledger turns a page.`,
    },
    relationship: {
      title: "In Relationship",
      story: `He rearranged his whole Tuesday to be free when she mentioned, in passing, that she might want company at the appointment. She didn't ask. He volunteered. immediately, before she could protest. because he could see she was scared even though she wasn't saying it. At the appointment, he waited outside and sent her a meme every fifteen minutes so she'd know he was there. Afterward, she was distracted and mostly talked about logistics. He drove home replaying the silence, wondering whether he had misread the situation, whether it had mattered as much to her as it had to him. He won't bring it up. He decides, again, that it's enough simply to show up. He is not sure he believes this.`,
    },
  },
  {
    typeNumber: 3,
    healthy: {
      title: "At Their Best",
      story: `She finishes the presentation and something is different. The work landed. she could feel it in the room. but what she notices most is that she didn't perform the landing. She had been too engaged in the actual problem to monitor how she was coming across. Afterward her colleague asks a question she doesn't know the answer to, and she says so directly, without spin. She suggests following up. On the drive home she calls her sister and they talk about something completely unrelated to her career for an hour. She doesn't find a way to mention the presentation. She is inhabiting her own life rather than narrating it to an imagined audience, and this feels, unusually, like rest.`,
    },
    average: {
      title: "The Daily Grind",
      story: `He refreshes the analytics again. The post has done well, objectively, but he's already thinking about the next one. how to frame it, what image will signal the right things, how to make the next success feel more like this one but bigger. His friend texts asking if he wants to grab food this week. He says yes, Thursday works, and immediately begins thinking about whether Thursday's lunch could be anywhere that photographs well. He does not notice he's doing this. He has gotten very good at making his calculated choices feel natural, and even better at forgetting he's making them.`,
    },
    stress: {
      title: "Under Pressure",
      story: `The project hasn't come together the way she said it would and the deadline is in three days. She is working longer hours than anyone on her team and still she can feel the gap between what she promised and what exists. She doesn't know if the gap is actually visible yet or only internal. the surveillance between those two possibilities is where most of her attention lives. She rewrites the project brief to be slightly vaguer. She adds a qualifier to the timeline. She prepares three versions of how she will explain what happened if it goes wrong. She is not trying to deceive anyone. She is just trying to maintain the appearance of being the person she told everyone she was, long enough to become that person again.`,
    },
    relationship: {
      title: "In Relationship",
      story: `He loves her, he's sure of that. But there are moments in the relationship where he can feel himself switching. from presence to performance, from genuine engagement to managing how he's coming across. Last night she told him something that frightened her and instead of just sitting with her in it, he noticed himself arranging his response. He gave her something reassuring and articulate. She seemed comforted. He felt vaguely fraudulent. He knows there is a version of himself beneath the constructed self but doesn't always know how to get there without the scaffolding collapsing. It is the loneliest part of being him, and also the part he never tells anyone about.`,
    },
  },
  {
    typeNumber: 4,
    healthy: {
      title: "At Their Best",
      story: `She paints for three hours on a Sunday afternoon and doesn't stop to evaluate what she's making. The work has an ugly middle. it always does. and she moves through it without the familiar need to either abandon it or declare it significant. There's pleasure in the constraint of the canvas, in color doing something unexpected. When she texts a friend a photo of the painting later, she's not seeking validation, exactly. it's more like sharing a sighting. Her friend says it's beautiful and she receives this without dismay or deflation. Ordinary Sunday, ordinary meal, ordinary ending: she notices, as she falls asleep, that she is content in a way that doesn't require explanation.`,
    },
    average: {
      title: "The Daily Grind",
      story: `He sits in the meeting and has the familiar feeling of watching through glass. Everyone else seems to occupy the room differently. more comfortably, more fully. He can't tell if this is perception or fact, and the uncertainty is a familiar weight. He has a thought worth saying and almost says it, then doesn't. He's been told before that he comes across as intense, and he can never predict which version of himself the room will receive. By the time the meeting ends he has rehearsed an imaginary version where he spoke and was understood perfectly, and it is more real to him than what actually happened. He goes home and writes about it. This part, at least, he knows how to do.`,
    },
    stress: {
      title: "Under Pressure",
      story: `Her partner said he'd be back by seven and it's now eight-fifteen and she has constructed, in the silence of the apartment, an elaborate internal narrative about what this means. She knows, intellectually, that traffic exists, that phones run out of battery, that nothing sinister is implied. But she doesn't live in the intellectual register right now; she lives in the one that is scanning for evidence, and everything feels like evidence. When he walks in apologetic and tired she can hear the distance in her own voice. She is not punishing him. she is simply already somewhere else, somewhere below the present moment, where the question being asked is not "where were you" but "do you actually see me at all."`,
    },
    relationship: {
      title: "In Relationship",
      story: `He said something casual at dinner. an offhand remark about her being "a lot" sometimes. and she knew he meant it lightly, the way people say things lightly, but she is still sitting with it at midnight. Not because she's fragile; she's experienced enough to know when her reaction exceeds the input. But there is something in "a lot" that reaches into a specific place: the place that has always suspected she is too much and not enough simultaneously, that whatever makes her herself is also the thing that will eventually drive people away. She runs her fingers over the thought the way you press a bruise. She doesn't wake him. In the morning she will be fine. She will just be a little more careful.`,
    },
  },
  {
    typeNumber: 5,
    healthy: {
      title: "At Their Best",
      story: `He gives the lecture and something unusual happens: he's not watching himself from a distance. He's simply there, in the material, following the logic where it leads, letting the students' questions change direction. Afterward a student lingers to argue with him about a claim and the argument is genuinely good. she has a point. and he changes his position in real time, in front of a class, without feeling that this constitutes loss. He goes home energized rather than depleted. He has dinner with his partner and finds himself wanting to talk, wanting to share what happened, not because he has rehearsed anything but because the day had real content and he wants company in it. He stays up too late but for once doesn't mind.`,
    },
    average: {
      title: "The Daily Grind",
      story: `She is supposed to go to the party. She agreed two weeks ago when it seemed abstract and manageable. Now it is seven-thirty and the thought of entering a room of people who will make small talk for three hours feels genuinely intolerable. She texts to say she isn't feeling well. This is partly true. She settles into her apartment with a book and the specific relief of a withdrawn commitment. By ten she is absorbed in a research thread she didn't plan to go down, cross-referencing three sources, and has forgotten the party entirely. She knows she should see people more. She will plan something intentional, something with a defined endpoint. Next week.`,
    },
    stress: {
      title: "Under Pressure",
      story: `His lease renewal is in two weeks and he has not responded to the landlord's emails. He tells himself he'll deal with it but each time he opens the inbox the friction of beginning is enough to close it again. There are four other things also in this holding pattern. He's been reading about all of them extensively. he knows more about his options than he'll ever act on. but the knowledge is somehow a substitute for movement rather than a precursor to it. He is running a quiet calculation: if he understands the situation completely enough, he won't have to feel the uncertainty of engaging with it. He is aware this is not working. He goes back to reading.`,
    },
    relationship: {
      title: "In Relationship",
      story: `She brings something up after dinner. something that has been bothering her about the relationship for a while. He listens. He understands. He says intelligent things. She says "yes, but how do you feel about it" and he notices that he genuinely doesn't know, or can't locate it quickly enough to speak without translating it through thought first. The pause grows and she reads it as distance. He is not distant. he is somewhere internal, locating the feeling the way you locate a file in a deep cabinet, and by the time he finds it the conversational moment has passed. He says something precise and it lands wrong. He doesn't entirely understand why connecting something he knows so clearly should still feel like crossing a river in the dark.`,
    },
  },
  {
    typeNumber: 6,
    healthy: {
      title: "At Their Best",
      story: `She has been dreading the difficult conversation with her manager for two weeks. This morning she schedules it. She prepares not by anticipating every possible bad outcome. her old method. but by getting clear on what she actually needs to say. In the meeting she is direct. She states the problem, proposes a solution, and doesn't perform certainty she doesn't have or manufacture anxiety she's worked past. Her manager responds better than she expected, though even if he hadn't, she would have been okay. She drives home noticing something she used to confuse with anxiety but now recognizes as alertness. the sensation of being present in her own life, navigating rather than bracing.`,
    },
    average: {
      title: "The Daily Grind",
      story: `He has read the situation three times now and still can't decide. The evidence runs both ways. If he does it, something might go wrong in this specific manner. If he doesn't, something else might go wrong in a different manner. He presents both scenarios to his partner, to his friend, to his colleague in passing. They all have opinions. None of the opinions resolve the discomfort, because the discomfort is not really about information. it's about trust. His own judgment feels like a foundation that shifts when he tests it. The decisions he makes most easily are the ones where the authority is external, where someone else has already decided and he is deciding to agree. He doesn't love this about himself.`,
    },
    stress: {
      title: "Under Pressure",
      story: `The company is being restructured. The announcement was deliberately vague, the way announcements always are, and she is now scanning every slack message, every meeting invite, every tone shift in her manager's voice for information that hasn't been given to her. She knows she is pattern-matching into anxiety. she's done this before, she's even right sometimes, and being right is what makes stopping difficult. She has two scenarios mapped in her head: the one where it's fine, which she can't fully believe, and the one where it isn't, which she has prepared for down to contingency plans. Her husband says she's catastrophizing. She says she's being realistic. Both are slightly true.`,
    },
    relationship: {
      title: "In Relationship",
      story: `She loves him and she keeps testing it. Not consciously, exactly. she would be horrified if she saw it clearly. but she asks the same question with different phrasing across weeks, waiting for an answer that doesn't match the last one. She calls when she said she wouldn't, just to see how he picks up. She mentions a hypothetical difficult scenario to gauge his reaction. Each test that passes should reassure her. Instead she already has the next test ready, because if you wait long enough everything that seems solid eventually reveals itself as conditional. She doesn't think she does this. She thinks she is simply paying attention.`,
    },
  },
  {
    typeNumber: 7,
    healthy: {
      title: "At Their Best",
      story: `He commits to the camping trip before he has a backup plan. This is unusual for him. Usually he keeps the itinerary loose, maintains optionality, makes sure there's somewhere else to go if this place turns out to be disappointing. This time he drives the four hours, sets up the tent in the rain, cooks a mediocre meal on a camp stove, and stays. The second day the sky clears and the light on the water is extraordinary and he realizes that the thing he almost avoided. the inconvenience of it. was also the thing that made it land. He stays an extra night. He reads the same book two evenings in a row without feeling like he should be reading something more interesting.`,
    },
    average: {
      title: "The Daily Grind",
      story: `She is planning four things simultaneously: a weekend trip, a career pivot, a ceramics class she signed up for, and a dinner party that keeps getting postponed because she keeps finding reasons to schedule something more interesting instead. She loves the planning phase. the moment when something is still possible, when the version in her mind is still better than the version that will actually happen. She's not sure all four things will happen. Some of them have been in the planning phase for eight months. She starts a new note with a fresh list. The new list has the same items plus two more. This is fine. Movement is fine.`,
    },
    stress: {
      title: "Under Pressure",
      story: `His mother is sick and the information is real and present and he can't think his way around it. He is doing what he always does when something hurts: he is moving quickly. He has researched five treatment centers, called three friends for distraction, booked a trip he won't go on, started a new project at work, and suggested to his sister that they plan something fun for the family "to keep spirits up." He is genuinely being helpful. He is also genuinely outrunning something. On the drive to the hospital he puts on a podcast. He turns it off halfway through. The silence that follows is not comfortable but it is, for once, something he lets stay.`,
    },
    relationship: {
      title: "In Relationship",
      story: `She can feel the conversation turning heavy and her instinct is to lighten it. a joke, a pivot, a suggestion that they do something. She does this and her partner stops mid-sentence and says, quietly, that she always does that. She is surprised. She didn't think she was doing anything. She was trying to help. Her partner says the help is a door closing right when things get real. She sits with this. She wants to explain that she's not avoiding, that she cares, that she's just trying to make things better. Then she notices that explaining is also a kind of moving. She stops moving. She lets the difficult thing be in the room. It is uncomfortable in a way that doesn't feel like the world ending.`,
    },
  },
  {
    typeNumber: 8,
    healthy: {
      title: "At Their Best",
      story: `She sees that her employee is struggling and does something she's been learning to do: she asks before she acts. Not "here's what we're going to do". the solution already assembled in her head before the problem has been fully heard. She asks. She listens for longer than feels natural. When the employee pauses, uncertain whether to continue, she says "keep going" and means it. The solution that emerges from the conversation is not the one she had in mind. It is better. She drives home thinking about power. specifically about how she spent most of her life believing that being powerful meant being autonomous, and is only now beginning to understand it can also mean making room.`,
    },
    average: {
      title: "The Daily Grind",
      story: `He has said the same thing three different ways and the committee still hasn't moved. He can feel himself getting louder, not in volume but in some other dimension. the force of him increasing as if he can press clarity into the room by sheer will. The frustration is not about ego, or not entirely. He genuinely believes this is the right direction and cannot understand why the obvious thing requires this much friction to pass. Afterward a colleague tells him that two people in the room felt steamrolled and he listens, he does listen, but he also privately thinks that sometimes being steamrolled is just what it feels like to be wrong.`,
    },
    stress: {
      title: "Under Pressure",
      story: `She finds out the deal fell through on a Tuesday afternoon and by Wednesday morning she has already lined up two alternatives, identified the person she believes is responsible, drafted two emails she hasn't sent yet, and told her assistant to clear her afternoon. She is not in distress. She is in motion. This is how she handles distress. Later, alone, there's a moment where she sits down too quickly and something surfaces. not anger but something underneath it, something that has the texture of being let down, of having extended trust and had it not held. She closes the feeling the way you close a tab. She reopens the alternatives.`,
    },
    relationship: {
      title: "In Relationship",
      story: `He doesn't say he loves her every day, but he rebuilt her car engine on a weekend when she couldn't afford the shop, he called the insurance company four times until they reversed the claim, he shows up. He tells himself this is love, which is true. What he's less sure about is whether he can love her in the quiet way. without the project, without something to fix or defend. When nothing needs doing and she just wants him present, he sometimes doesn't know what to do with his hands. She has started saying "I don't need you to fix this, I just want you to sit with me." He is learning what sitting with someone means when it isn't tactical.`,
    },
  },
  {
    typeNumber: 9,
    healthy: {
      title: "At Their Best",
      story: `She disagrees with the direction in the meeting and she says so. This still surprises her. not the opinion, she's had opinions all along. but the saying of it. The conversation shifts slightly. Her point is taken seriously. No one leaves. The room doesn't collapse. Afterward, a colleague says he's glad she pushed back. She notices, cycling home, that nothing bad happened as a result of being present. She makes dinner without turning on the TV, just to see what the quiet is like without it being filled. It's fine. She is fine. She texts a friend with a plan she made herself, specific and slightly out of her comfort zone. She doesn't add "unless you'd prefer something else."`,
    },
    average: {
      title: "The Daily Grind",
      story: `He has been meaning to work on the project for three weeks. He sits down to start and finds he has reorganized his desk, made coffee twice, read four articles tangentially related to the topic, and watched a documentary that had nothing to do with any of it. It's not laziness, though he'd tell you it was. It's something more like friction at the threshold. a slight, persistent resistance to the moment of full engagement, as if beginning would require him to commit to a version of himself that might be disappointing. He will work on it this weekend. He is aware he says this every week.`,
    },
    stress: {
      title: "Under Pressure",
      story: `The family conflict has been building for months and she is managing it the way she manages most things: by not quite being present to it. She's the one everyone comes to, the one who listens to both sides, the one who reflects each person's reality back to them so smoothly that no one notices she's never said what she actually thinks. She doesn't entirely know what she thinks. She has been a mirror in this family for so long that locating a solid opinion feels like trying to find the bottom of still water. Then one evening, at the dinner table, someone says something genuinely unfair to her sister and she feels something uncomplicate in her chest and she speaks. The words are direct and a little clumsy. No one is more surprised than she is.`,
    },
    relationship: {
      title: "In Relationship",
      story: `Her partner asks where she wants to go for their anniversary and she says "anywhere's fine." This is both completely true and a kind of absence. She would genuinely be happy anywhere. She would also have a preference, if she stayed with the question long enough. a place she's seen in a magazine, a type of food she's been thinking about. But the habit of deference is faster than the habit of knowing her own mind, and by the time her partner offers options she's already shaped herself around them. They go somewhere she doesn't dislike. He asks if she's happy. She says yes, and she mostly means it. Underneath the yes is a smaller, quieter voice that's been trying to tell her something about what it costs to always be easy.`,
    },
  },
];
