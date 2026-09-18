import { useEffect, useState } from 'react';

export interface Route {
  /** Page id with no leading separator. Empty string means the course home. */
  pageId: string;
  anchor: string | null;
}

function parse(): Route {
  const raw = window.location.hash.replace(/^#/, '');
  const [path, query] = raw.split('?');
  const anchor = query ? new URLSearchParams(query).get('h') : null;
  const pageId = (path ?? '').replace(/^\/+/, '').replace(/\/+$/, '');
  return { pageId, anchor };
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

export function navigate(pageId: string): void {
  const next = `#/${pageId}`;
  if (window.location.hash === next) return;
  window.location.hash = next;
}
