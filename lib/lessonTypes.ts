export type LessonStep = {
  stepTitle: string;
  explanation: string;
  keyPoints: string[];
};

export type LessonQnaItem = {
  question: string;
  answer: string;
};

export type TeachingStyleGuide = {
  tone: string;
  explanationStyle: string;
  structure: string;
};

export type Lesson = {
  title: string;
  steps: LessonStep[];
  keyPoints: string[];
  qna: LessonQnaItem[];
  notes: string[];
  styleGuide?: TeachingStyleGuide;
  // Plain narration text for TTS.
  audioScript: string;
};

