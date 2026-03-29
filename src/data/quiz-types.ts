export interface TypeQuizQuestion {
  id: number;
  type: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  track1Day: number;
  track2Day: number;
  category: string;
  question: string;
  options: { letter: "A" | "B" | "C" | "D"; text: string }[];
  answer: "A" | "B" | "C" | "D";
  explanation: string;
}
