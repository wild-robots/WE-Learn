
export type Language = 'EN' | 'HE' | 'ES' | 'FR' | 'DE' | 'IT' | 'PT' | 'RU' | 'ZH' | 'JA' | 'AR';

export type View = 'landing' | 'cohort-detail';

export interface TranslationSet {
  hero_title: string;
  hero_subtitle: string;
  search_placeholder: string;
  btn_start: string;
  btn_create: string;
  section_active: string;
  section_upcoming: string;
  stat_completion: string;
  stat_response: string;
  stat_ai: string;
  stat_guarantee: string;
  cta_title: string;
  cta_subtitle: string;
  cta_btn: string;
  register_now: string;
  tutor: string;
  success_rate: string;
  duration: string;
  members: string;
  starts: string;
  highlights: string;
  back_to_cohorts: string;
  active_now: string;
  overview: string;
  syllabus: string;
  community: string;
}

export interface SyllabusModule {
  id: number;
  title: string;
  items: string[];
  deliverable: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  online: boolean;
}

export interface Cohort {
  id: string;
  title: string;
  category: string;
  description: string;
  tutor: string;
  members: number;
  maxMembers: number;
  duration: string;
  successRate: string;
  schedule: string;
  startDate: string;
  progress: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  highlights?: string[];
  syllabus?: SyllabusModule[];
  communityMembers?: Member[];
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  isTranslating: boolean;
  t: (key: keyof TranslationSet) => string;
  isRTL: boolean;
  translationProgress: number;
  translationStatus: string;
}
