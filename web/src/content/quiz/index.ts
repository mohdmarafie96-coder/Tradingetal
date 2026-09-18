// Generated at build time from quiz/*.json. Do not edit by hand.
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

/** Explanations, by question id. Loaded only after a paper has been marked. */
export type Why = Record<string, Record<Lang, string>>;

export const QUIZZES: QuizMeta[] = [{"id":"m00","pageId":"m00/quiz","moduleId":"m00","title":{"en":"Module 00 Quiz","ar":"اختبار الوحدة 00"},"passMark":0.8,"count":6},{"id":"m01","pageId":"m01/quiz","moduleId":"m01","title":{"en":"Module 01 Quiz","ar":"اختبار الوحدة 01"},"passMark":0.8,"count":10},{"id":"m02","pageId":"m02/quiz","moduleId":"m02","title":{"en":"Module 02 Quiz","ar":"اختبار الوحدة 02"},"passMark":0.8,"count":10},{"id":"m03","pageId":"m03/quiz","moduleId":"m03","title":{"en":"Module 03 Quiz","ar":"اختبار الوحدة 03"},"passMark":0.8,"count":12},{"id":"m04","pageId":"m04/quiz","moduleId":"m04","title":{"en":"Module 04 Quiz","ar":"اختبار الوحدة 04"},"passMark":0.8,"count":12},{"id":"m05","pageId":"m05/quiz","moduleId":"m05","title":{"en":"Module 05 Quiz","ar":"اختبار الوحدة 05"},"passMark":0.8,"count":10},{"id":"m06","pageId":"m06/quiz","moduleId":"m06","title":{"en":"Module 06 Quiz","ar":"اختبار الوحدة 06"},"passMark":0.8,"count":12},{"id":"m07","pageId":"m07/quiz","moduleId":"m07","title":{"en":"Module 07 Quiz","ar":"اختبار الوحدة 07"},"passMark":0.8,"count":10},{"id":"m08","pageId":"m08/quiz","moduleId":"m08","title":{"en":"Module 08 Quiz","ar":"اختبار الوحدة 08"},"passMark":0.8,"count":10},{"id":"m09","pageId":"m09/quiz","moduleId":"m09","title":{"en":"Module 09 Quiz","ar":"اختبار الوحدة 09"},"passMark":0.75,"count":8},{"id":"m10","pageId":"m10/quiz","moduleId":"m10","title":{"en":"Module 10 Quiz","ar":"اختبار الوحدة 10"},"passMark":0.8,"count":10},{"id":"final","pageId":"m11/02-assessment","moduleId":"m11","title":{"en":"Final Assessment","ar":"التقييم النهائي"},"passMark":0.8,"count":33}];

export const QUIZ_BY_PAGE = new Map(QUIZZES.map((q) => [q.pageId, q]));

const loaders: Record<string, () => Promise<{ default: Paper }>> = {
  "m00": () => import('./m00'),
  "m01": () => import('./m01'),
  "m02": () => import('./m02'),
  "m03": () => import('./m03'),
  "m04": () => import('./m04'),
  "m05": () => import('./m05'),
  "m06": () => import('./m06'),
  "m07": () => import('./m07'),
  "m08": () => import('./m08'),
  "m09": () => import('./m09'),
  "m10": () => import('./m10'),
  "final": () => import('./final'),
};

const cache = new Map<string, Paper>();

/** Papers are code-split: a quiz is only downloaded when it is opened. */
export async function loadPaper(id: string): Promise<Paper> {
  const cached = cache.get(id);
  if (cached) return cached;
  const load = loaders[id];
  if (!load) throw new Error('No such quiz: ' + id);
  const paper = (await load()).default;
  cache.set(id, paper);
  return paper;
}

export function cachedPaper(id: string): Paper | null {
  return cache.get(id) ?? null;
}

const whyLoaders: Record<string, () => Promise<{ default: Why }>> = {
  "m00": () => import('./why-m00'),
  "m01": () => import('./why-m01'),
  "m02": () => import('./why-m02'),
  "m03": () => import('./why-m03'),
  "m04": () => import('./why-m04'),
  "m05": () => import('./why-m05'),
  "m06": () => import('./why-m06'),
  "m07": () => import('./why-m07'),
  "m08": () => import('./why-m08'),
  "m09": () => import('./why-m09'),
  "m10": () => import('./why-m10'),
  "final": () => import('./why-final'),
};

const whyCache = new Map<string, Why>();

/**
 * The explanations for a paper. Deliberately a separate chunk from the paper
 * itself: it is only requested once the answers have been submitted and marked.
 */
export async function loadWhy(id: string): Promise<Why> {
  const cached = whyCache.get(id);
  if (cached) return cached;
  const load = whyLoaders[id];
  if (!load) throw new Error('No such quiz: ' + id);
  const why = (await load()).default;
  whyCache.set(id, why);
  return why;
}
