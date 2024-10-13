// sections.ts

export interface BaseSection {
  id: string;
  title: string;
  order_id: number;
  data: any;
  onComplete: () => void;
}

export interface QuizSection extends BaseSection {
  type: "quiz";
  data: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
}

export interface TextSection extends BaseSection {
  type: "text";
  data: {
    content: string;
  };
}

export interface ResourceManagerGameSection extends BaseSection {
  type: "resourceManagerGame";
  data: {};
}

export interface FlashcardGameSection extends BaseSection {
  type: "flashcards";
  data: {
    title: string;
    cardPairs: { id: number; concept: string; details: string }[];
  };
}

export type Section =
  | QuizSection
  | TextSection
  | ResourceManagerGameSection
  | FlashcardSection;
