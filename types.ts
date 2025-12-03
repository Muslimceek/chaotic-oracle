
export enum OracleState {
  IDLE = 'IDLE',
  LISTENING = 'LISTENING',
  THINKING = 'THINKING',
  REVEALED = 'REVEALED',
  GAMING = 'GAMING',
  ERROR = 'ERROR'
}

export interface Prophecy {
  text: string;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  question: string;
  answer: string;
  timestamp: number;
}

export type LanguageCode = 'en' | 'ru' | 'uz' | 'ky' | 'kk' | 'tg';

export interface LanguageDefinition {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageDefinition[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский' },
  { code: 'uz', label: 'Uzbek', nativeLabel: 'Oʻzbek' },
  { code: 'ky', label: 'Kyrgyz', nativeLabel: 'Кыргызча' },
  { code: 'kk', label: 'Kazakh', nativeLabel: 'Қазақша' },
  { code: 'tg', label: 'Tajik', nativeLabel: 'Тоҷикӣ' },
];

export interface TranslationSet {
  title: string;
  subtitle: string;
  placeholder: string;
  button: string;
  resultTitle: string;
  reset: string;
  error: string;
  footer: string;
  welcome: string;
  energy: string;
  inviteTitle: string;
  inviteDesc: string;
  copy: string;
  copied: string;
  noEnergy: string;
  bonusToast: string;
  topics: {
    love: string;
    career: string;
    luck: string;
    random: string;
    quiz: string; // New
  };
  topicPrompts: {
    love: string;
    career: string;
    luck: string;
    random: string;
  };
  quiz: {
    title: string;
    questionPrefix: string;
    correct: string;
    wrong: string;
    noHistory: string;
    decoys: string[]; // Generic wrong answers if history is empty
  }
}
