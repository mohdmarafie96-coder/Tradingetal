import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { courseFor } from '../content/manifest';
import { useStrings, type Lang } from '../lib/i18n';
import type { SearchDoc } from '../content/search-index';

interface Props {
  lang: Lang;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

interface Hit {
  id: string;
  title: string;
  crumb: string;
  snippet: { text: string; hit: boolean }[];
  score: number;
}

function buildSnippet(text: string, term: string): { text: string; hit: boolean }[] {
  const lower = text.toLowerCase();
  const at = lower.indexOf(term);
  if (at === -1) return [{ text: text.slice(0, 160), hit: false }];
  const start = Math.max(0, at - 70);
  const end = Math.min(text.length, at + term.length + 110);
  const parts: { text: string; hit: boolean }[] = [];
  if (start > 0) parts.push({ text: '…', hit: false });
  parts.push({ text: text.slice(start, at), hit: false });
  parts.push({ text: text.slice(at, at + term.length), hit: true });
  parts.push({ text: text.slice(at + term.length, end), hit: false });
  if (end < text.length) parts.push({ text: '…', hit: false });
  return parts;
}

function SearchPanel({ lang, onClose, onNavigate }: Props) {
  const { t } = useStrings(lang);
  const course = courseFor(lang);
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    let cancelled = false;
    import('../content/search-index').then((mod) => {
      if (!cancelled) setDocs(mod.default(lang));
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const crumbFor = (id: string): string => {
    const meta = course.pageById.get(id);
    if (!meta) return '';
    const mod = course.modules.find((m) => m.id === meta.moduleId);
    if (mod) return `${t.module} ${mod.number} · ${mod.title}`;
    if (meta.kind === 'reference') return t.reference;
    if (meta.kind === 'template') return t.templates;
    return t.course;
  };

  const hits = useMemo<Hit[]>(() => {
    const term = query.trim().toLowerCase();
    if (!docs || term.length < 2) return [];
    const results: Hit[] = [];
    for (const doc of docs) {
      const titleAt = doc.title.toLowerCase().indexOf(term);
      const bodyAt = doc.text.toLowerCase().indexOf(term);
      if (titleAt === -1 && bodyAt === -1) continue;
      let score = 0;
      if (titleAt === 0) score += 100;
      else if (titleAt > -1) score += 60;
      if (bodyAt > -1) score += Math.max(1, 30 - Math.floor(bodyAt / 400));
      results.push({
        id: doc.id,
        title: doc.title,
        crumb: crumbFor(doc.id),
        snippet: buildSnippet(doc.text, term),
        score,
      });
    }
    return results.sort((a, b) => b.score - a.score).slice(0, 25);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docs, query, lang]);

  useEffect(() => setCursor(0), [query]);

  const choose = (id: string) => {
    onNavigate(id);
    onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((c) => Math.min(c + 1, Math.max(hits.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (event.key === 'Enter' && hits[cursor]) {
      event.preventDefault();
      choose(hits[cursor].id);
    }
  };

  const term = query.trim();

  return (
    <div
      className="overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="search-panel" role="dialog" aria-modal="true" aria-label={t.search}>
        <div className="search-input-row">
          <Search size={17} />
          <input
            ref={inputRef}
            className="search-input"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            aria-label={t.search}
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <div className="search-results">
          {term.length < 2 && <div className="search-empty">{t.searchHint}</div>}
          {term.length >= 2 && !docs && <div className="search-empty">{t.searchLoading}</div>}
          {term.length >= 2 && docs && hits.length === 0 && (
            <div className="search-empty">
              {t.searchNoResults} &ldquo;{term}&rdquo;.
            </div>
          )}
          {hits.map((hit, i) => (
            <button
              key={hit.id}
              className={`search-result${i === cursor ? ' is-cursor' : ''}`}
              onClick={() => choose(hit.id)}
              onMouseEnter={() => setCursor(i)}
            >
              <div className="search-result-title">{hit.title}</div>
              <div className="search-result-crumb">{hit.crumb}</div>
              <div className="search-result-snip">
                {hit.snippet.map((part, j) =>
                  part.hit ? <mark key={j}>{part.text}</mark> : <span key={j}>{part.text}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;
