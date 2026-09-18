// Placeholder. `npm run build` regenerates this file from the course markdown
// before Vite runs; see scripts/generate-content.mjs. It exists so that static
// imports resolve during linting and type-checking.
export type PageKind = 'overview' | 'lesson' | 'quiz' | 'reference' | 'template' | 'page';

export interface Heading {
  id: string;
  text: string;
  depth: number;
}

export interface PageMeta {
  id: string;
  chunk: string;
  title: string;
  kind: PageKind;
  moduleId: string | null;
  minutes: number;
  headings: Heading[];
}

export interface ModuleMeta {
  id: string;
  number: string;
  title: string;
  time: string;
  pages: string[];
}

export const modules: ModuleMeta[] = [];

export const pages: PageMeta[] = [];

export const pageById = new Map(pages.map((p) => [p.id, p]));

export const referencePages = pages.filter((p) => p.kind === 'reference');
export const templatePages = pages.filter((p) => p.kind === 'template');

export const readingOrder: string[] = [];

export const totalLessons = 0;

export const totalWords = 0;
