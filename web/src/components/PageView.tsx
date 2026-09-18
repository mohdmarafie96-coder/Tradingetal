import { useEffect, useRef, useState } from 'react';
import { Check, Circle, Clock } from 'lucide-react';
import { modules, pageById, readingOrder } from '../content/manifest';
import { getCached, loadChunk } from '../content/loader';

interface Props {
  pageId: string;
  anchor: string | null;
  completed: Set<string>;
  onToggleComplete: (id: string) => void;
}

function Skeleton() {
  return (
    <div className="skeleton" aria-hidden="true">
      <div style={{ width: '92%' }} />
      <div style={{ width: '98%' }} />
      <div style={{ width: '74%' }} />
      <div style={{ width: '88%', marginTop: 28 }} />
      <div style={{ width: '95%' }} />
      <div style={{ width: '61%' }} />
    </div>
  );
}

function PageView({ pageId, anchor, completed, onToggleComplete }: Props) {
  const meta = pageById.get(pageId);
  const [html, setHtml] = useState<string | null>(() =>
    meta ? getCached(meta.chunk)?.[pageId] ?? null : null
  );
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meta) return;
    let cancelled = false;
    const cached = getCached(meta.chunk)?.[pageId];
    if (cached) {
      setHtml(cached);
      return;
    }
    setHtml(null);
    loadChunk(meta.chunk).then((chunk) => {
      if (!cancelled) setHtml(chunk[pageId] ?? '<p>This page could not be loaded.</p>');
    });
    return () => {
      cancelled = true;
    };
  }, [meta, pageId]);

  useEffect(() => {
    if (html === null) return;
    if (anchor) {
      const target = articleRef.current?.querySelector(`#${CSS.escape(anchor)}`);
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [html, anchor, pageId]);

  if (!meta) {
    return (
      <article className="article">
        <h1 className="page-title">Page not found</h1>
        <p className="hero-lede">
          That page does not exist. <a href="#/">Return to the course overview</a>.
        </p>
      </article>
    );
  }

  const mod = modules.find((m) => m.id === meta.moduleId);
  const index = readingOrder.indexOf(pageId);
  const prev = index > 0 ? pageById.get(readingOrder[index - 1]) : undefined;
  const next =
    index >= 0 && index < readingOrder.length - 1
      ? pageById.get(readingOrder[index + 1])
      : undefined;
  const isDone = completed.has(pageId);
  const trackable = meta.moduleId !== null;

  return (
    <article className="article">
      <div className="eyebrow">
        <a href="#/">Course</a>
        {mod && (
          <>
            <span aria-hidden="true">/</span>
            <a href={`#/${mod.id}/index`}>
              Module {mod.number} &middot; {mod.title}
            </a>
          </>
        )}
        {!mod && meta.kind === 'reference' && (
          <>
            <span aria-hidden="true">/</span>
            <span>Reference</span>
          </>
        )}
        {!mod && meta.kind === 'template' && (
          <>
            <span aria-hidden="true">/</span>
            <span>Templates</span>
          </>
        )}
      </div>

      <h1 className="page-title">{meta.title}</h1>

      <div className="page-meta">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <Clock size={13} />
          {meta.minutes} min read
        </span>
        {trackable && (
          <button
            className={`complete-btn${isDone ? ' is-done' : ''}`}
            onClick={() => onToggleComplete(pageId)}
            aria-pressed={isDone}
          >
            {isDone ? <Check size={13} /> : <Circle size={13} />}
            {isDone ? 'Completed' : 'Mark complete'}
          </button>
        )}
      </div>

      {html === null ? (
        <Skeleton />
      ) : (
        <div
          className="prose"
          ref={articleRef}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {(prev || next) && (
        <nav className="pagenav" aria-label="Lesson navigation">
          {prev && (
            <a className="pagenav-link" href={`#/${prev.id}`}>
              <div className="pagenav-dir">Previous</div>
              <div className="pagenav-name">{prev.title}</div>
            </a>
          )}
          {next && (
            <a className="pagenav-link next" href={`#/${next.id}`}>
              <div className="pagenav-dir">Next</div>
              <div className="pagenav-name">{next.title}</div>
            </a>
          )}
        </nav>
      )}
    </article>
  );
}

export default PageView;
