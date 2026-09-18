// Placeholder, regenerated at build time by scripts/generate-content.mjs from
// quiz/*.json. It exists so imports and types resolve before the build runs.
import type { Lang } from '../../lib/i18n';

export interface Option {
  id: string;
  text: Record<Lang, string>;
}

export interface Question {
  id: string;
  part: string | null;
  type: 'single' | 'multi';
  prompt: Record<Lang, string>;
  options: Option[];
}

export interface Part {
  id: string;
  title: Record<Lang, string>;
  weight: number;
  minScore: number | null;
}

export interface Paper {
  id: string;
  kind: 'quiz' | 'assessment';
  title: Record<Lang, string>;
  passMark: number;
  calculator: boolean;
  parts: Part[] | null;
  questions: Question[];
}

export interface QuizMeta {
  id: string;
  pageId: string;
  moduleId: string;
  title: Record<Lang, string>;
  passMark: number;
  count: number;
}

export const QUIZZES: QuizMeta[] = [];

export const QUIZ_BY_PAGE = new Map<string, QuizMeta>();

export async function loadPaper(id: string): Promise<Paper> {
  throw new Error('No such quiz: ' + id);
}

export function cachedPaper(_id: string): Paper | null {
  return null;
}
