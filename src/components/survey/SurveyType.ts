// Question type
export type QuestionType = 'Text' | 'SingleChoice' | 'MultipleChoice';

// Question option
export interface QuestionOption {
  label: String;
  childQuestions: Question[];
}

// Question
export interface Question {
  qsType: QuestionType;
  question: String;
  required: boolean;
  options: QuestionOption[];
}

// Group
export interface Group {
  group: String;
  questions: Question[];
}