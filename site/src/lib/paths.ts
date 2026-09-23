import type { Lang } from '@/lib/i18n';

/** Pro lives under /pro on the one site; the course is at / with hash routes. */
export function proHref(lang: Lang, path = ''): string {
  return `/pro/${lang}${path ? `/${path.replace(/^\//, '')}` : ''}`;
}

export function courseHref(lang: Lang, page = ''): string {
  return page ? `/#/${lang}/${page}` : `/#/${lang}`;
}
