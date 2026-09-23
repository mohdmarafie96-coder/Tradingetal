import { useEffect, useState } from 'react';
import { isLang, preferredLang, type Lang } from './i18n';

export interface Route {
  lang: Lang;
  /** Page id with no leading separator. Empty string means the course home. */
  pageId: string;
  anchor: string | null;
  /** True when the URL carried no language segment and one was inferred. */
  inferred: boolean;
}

function parse(): Route {
  const raw = window.location.hash.replace(/^#/, '');
  const [path, query] = raw.split('?');
  const anchor = query ? new URLSearchParams(query).get('h') : null;
  const segments = (path ?? '').split('/').filter(Boolean);

  if (segments.length > 0 && isLang(segments[0])) {
    return { lang: segments[0], pageId: segments.slice(1).join('/'), anchor, inferred: false };
  }
  return { lang: preferredLang(), pageId: segments.join('/'), anchor, inferred: true };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function hrefFor(lang: Lang, pageId: string, anchor?: string): string {
  const base = pageId ? `#/${lang}/${pageId}` : `#/${lang}`;
  return anchor ? `${base}?h=${anchor}` : base;
}

export function navigate(lang: Lang, pageId: string): void {
  const next = hrefFor(lang, pageId);
  if (window.location.hash === next) return;
  window.location.hash = next;
}

export function replaceRoute(lang: Lang, pageId: string): void {
  const next = hrefFor(lang, pageId);
  if (window.location.hash === next) return;
  window.location.replace(next);
}
