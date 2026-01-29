
export enum ExamType {
  IELTS = 'IELTS',
  TOEFL = 'TOEFL'
}

export enum Language {
  EN = 'en',
  TR = 'tr'
}

export interface GradingCriteria {
  score: number;
  label: string;
  feedback: string;
}

export interface WritingFeedback {
  bandScore: number;
  overallFeedback: string;
  criteria: {
    taskResponse: GradingCriteria;
    coherenceCohesion: GradingCriteria;
    lexicalResource: GradingCriteria;
    grammaticalRange: GradingCriteria;
  };
  correctedText: string;
}

export interface SpeakingFeedback {
  bandScore: number;
  overallFeedback: string;
  strengths: string[];
  weaknesses: string[];
  transcription: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
