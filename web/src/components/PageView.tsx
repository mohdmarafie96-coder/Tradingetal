import { useEffect, useRef, useState } from 'react';
import { Check, Circle, Clock } from 'lucide-react';
import { Info } from './icons';
import { getCached, loadChunk, type Page } from '../content/loader';
import { courseFor } from '../content/manifest';
import { hrefFor } from '../lib/router';
import { useStrings, type Lang } from '../lib/i18n';

interface Props {
  lang: Lang;
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

function PageView({ lang, pageId, anchor, completed, onToggleComplete }: Props) {
  const { t } = useStrings(lang);
  const course = courseFor(lang);
  const meta = course.pageById.get(pageId);
  const [page, setPage] = useState<Page | null>(() =>
    meta ? (getCached(lang, meta.chunk)?.[pageId] ?? null) : null
  );
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meta) return;
    let cancelled = false;
    const cached = getCached(lang, meta.chunk)?.[pageId];
    if (cached) {
      setPage(cached);
      return;
    }
    setPage(null);
    loadChunk(lang, meta.chunk).then((chunk) => {
      if (!cancelled) {
        setPage(chunk[pageId] ?? { html: `<p>${t.pageLoadFailed}</p>`, headings: [] });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [lang, meta, pageId, t]);

  useEffect(() => {
    if (!page) return;
    if (anchor) {
      const target = articleRef.current?.querySelector(`#${CSS.escape(anchor)}`);
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [page, anchor, pageId]);

  if (!meta) {
    return (
      <article className="article">
        <h1 className="page-title">{t.notFound}</h1>
        <p className="hero-lede">
          {t.notFoundBody} <a href={hrefFor(lang, '')}>{t.backToCourse}</a>.
        </p>
      </article>
    );
  }

  const mod = course.modules.find((m) => m.id === meta.moduleId);
  const index = course.readingOrder.indexOf(pageId);
  const prev = index > 0 ? course.pageById.get(course.readingOrder[index - 1]) : undefined;
  const next =
    index >= 0 && index < course.readingOrder.length - 1
      ? course.pageById.get(course.readingOrder[index + 1])
      : undefined;
  const isDone = completed.has(pageId);
  const trackable = meta.moduleId !== null;
  const headings = page?.headings ?? [];

  return (
    <>
      <article className="article">
        <div className="eyebrow">
          <a href={hrefFor(lang, '')}>{t.course}</a>
          {mod && (
            <>
              <span aria-hidden="true">/</span>
              <a href={hrefFor(lang, `${mod.id}/index`)}>
                {t.module} {mod.number} &middot; {mod.title}
              </a>
            </>
          )}
          {!mod && meta.kind === 'reference' && (
            <>
              <span aria-hidden="true">/</span>
              <span>{t.reference}</span>
            </>
          )}
          {!mod && meta.kind === 'template' && (
            <>
              <span aria-hidden="true">/</span>
              <span>{t.templates}</span>
            </>
          )}
        </div>

        <h1 className="page-title">{meta.title}</h1>

        <div className="page-meta">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Clock size={13} />
            <span className="num">{meta.minutes}</span> {t.minRead}
          </span>
          {trackable && (
            <button
              className={`complete-btn${isDone ? ' is-done' : ''}`}
              onClick={() => onToggleComplete(pageId)}
              aria-pressed={isDone}
            >
              {isDone ? <Check size={13} /> : <Circle size={13} />}
              {isDone ? t.completed : t.markComplete}
            </button>
          )}
        </div>

        {meta.pending && (
          <div className="callout callout-info" style={{ marginBottom: 24 }}>
            <Info size={16} />
            <div>
              <strong>{t.pendingTitle}.</strong> {t.pendingBody}{' '}
              <a href={hrefFor(lang === 'ar' ? 'en' : 'ar', pageId)}>{t.pendingCta}</a>.
            </div>
          </div>
        )}

        {!page ? (
          <Skeleton />
        ) : (
          <div
            className="prose"
            ref={articleRef}
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        )}

        {(prev || next) && (
          <nav className="pagenav" aria-label={t.course}>
            {prev && (
              <a className="pagenav-link" href={hrefFor(lang, prev.id)}>
                <div className="pagenav-dir">{t.previous}</div>
                <div className="pagenav-name">{prev.title}</div>
              </a>
            )}
            {next && (
              <a className="pagenav-link next" href={hrefFor(lang, next.id)}>
                <div className="pagenav-dir">{t.next}</div>
                <div className="pagenav-name">{next.title}</div>
              </a>
            )}
          </nav>
        )}
      </article>

      {headings.length > 1 && (
        <nav className="toc" aria-label={t.onThisPage}>
          <div className="toc-head">{t.onThisPage}</div>
          {headings.map((h) => (
            <a
              key={h.id}
              href={hrefFor(lang, pageId, h.id)}
              className={h.depth === 3 ? 'depth-3' : undefined}
            >
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}

export default PageView;
