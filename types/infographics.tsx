import { ReactNode } from 'react';


export interface Section {
  id: string;
  type: 'portrait3Horizontal' | 'mediumLengthHeading' | 'quizSection'; // Added 'quizSection'
  title: string;
  content?: any;
}

export interface Target {
  number: string;
  title: string;
  description: string;
}

export interface TargetsData {
  title: string;
  subtitle: string;
  targets: Target[];
  iconSrc?: string;
}



export interface HeaderData {
  newsTitle: string;
  newsContent: string;
  mainTitle: string;
  mainSubtitle: string;
  backgroundColor?: string;
  newsBannerColor?: string;
  illustrationComponent?: ReactNode | string;
}


export interface QuizQuestion {
  type: "single" | "multiple";
  question: string;
  correctAnswers: string[];
  options: string[];
}