import type { Lang } from '../lib/i18n';

export interface Page {
  html: string;
  headings: { id: string; text: string; depth: number }[];
}

export type Chunk = Record<string, Page>;

const cache = new Map<string, Chunk>();
const inFlight = new Map<string, Promise<Chunk>>();

const loaders: Record<Lang, Record<string, () => Promise<{ default: Chunk }>>> = {
  en: {
    m00: () => import('./chunks/en/m00'),
    m01: () => import('./chunks/en/m01'),
    m02: () => import('./chunks/en/m02'),
    m03: () => import('./chunks/en/m03'),
    m04: () => import('./chunks/en/m04'),
    m05: () => import('./chunks/en/m05'),
    m06: () => import('./chunks/en/m06'),
    m07: () => import('./chunks/en/m07'),
    m08: () => import('./chunks/en/m08'),
    m09: () => import('./chunks/en/m09'),
    m10: () => import('./chunks/en/m10'),
    m11: () => import('./chunks/en/m11'),
    misc: () => import('./chunks/en/misc'),
    reference: () => import('./chunks/en/reference'),
    templates: () => import('./chunks/en/templates'),
  },
  ar: {
    m00: () => import('./chunks/ar/m00'),
    m01: () => import('./chunks/ar/m01'),
    m02: () => import('./chunks/ar/m02'),
    m03: () => import('./chunks/ar/m03'),
    m04: () => import('./chunks/ar/m04'),
    m05: () => import('./chunks/ar/m05'),
    m06: () => import('./chunks/ar/m06'),
    m07: () => import('./chunks/ar/m07'),
    m08: () => import('./chunks/ar/m08'),
    m09: () => import('./chunks/ar/m09'),
    m10: () => import('./chunks/ar/m10'),
    m11: () => import('./chunks/ar/m11'),
    misc: () => import('./chunks/ar/misc'),
    reference: () => import('./chunks/ar/reference'),
    templates: () => import('./chunks/ar/templates'),
  },
};

export function getCached(lang: Lang, chunk: string): Chunk | null {
  return cache.get(`${lang}:${chunk}`) ?? null;
}

export async function loadChunk(lang: Lang, chunk: string): Promise<Chunk> {
  const key = `${lang}:${chunk}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const pending = inFlight.get(key);
  if (pending) return pending;

  const loader = loaders[lang]?.[chunk];
  if (!loader) throw new Error(`Unknown content chunk: ${key}`);

  const promise = loader().then((mod) => {
    cache.set(key, mod.default);
    inFlight.delete(key);
    return mod.default;
  });
  inFlight.set(key, promise);
  return promise;
}
