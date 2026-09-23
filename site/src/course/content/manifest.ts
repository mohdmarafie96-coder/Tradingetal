// Placeholder. `npm run build` regenerates this file from the course markdown
// before Vite runs; see scripts/generate-content.mjs. It exists so that static
// imports resolve during linting and type-checking.
import type { Lang } from '../lib/i18n';

export type PageKind = 'overview' | 'lesson' | 'quiz' | 'reference' | 'template' | 'page';

export interface PageMeta {
  id: string;
  chunk: string;
  title: string;
  kind: PageKind;
  moduleId: string | null;
  minutes: number;
  /** True while this page still awaits translation in this edition. */
  pending: boolean;
}

export interface ModuleMeta {
  id: string;
  number: string;
  title: string;
  time: string;
  pages: string[];
}

export interface Course {
  modules: ModuleMeta[];
  pages: PageMeta[];
  pageById: Map<string, PageMeta>;
  referencePages: PageMeta[];
  templatePages: PageMeta[];
  readingOrder: string[];
  totalLessons: number;
  totalWords: number;
}

function build(modules: ModuleMeta[], pages: PageMeta[]): Course {
  return {
    modules,
    pages,
    pageById: new Map(pages.map((p) => [p.id, p])),
    referencePages: pages.filter((p) => p.kind === 'reference'),
    templatePages: pages.filter((p) => p.kind === 'template'),
    readingOrder: ['risk', ...modules.flatMap((m) => m.pages)],
    totalLessons: pages.filter(
      (p) => p.kind === 'lesson' || p.kind === 'quiz' || p.kind === 'overview'
    ).length,
    totalWords: 0,
  };
}

export const courses: Record<Lang, Course> = {
  en: build([], []),
  ar: build([], []),
};

export function courseFor(lang: Lang): Course {
  return courses[lang];
}
