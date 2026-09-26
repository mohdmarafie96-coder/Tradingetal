import { useEffect, useState } from 'react';
import {
  BookOpen,
  Calculator,
  ChevronRight,
  FileText,
  KeyRound,
  Shield,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import Logo from './Logo';
import { hrefFor } from '../lib/router';
import { useStrings, type Lang } from '../lib/i18n';
import { courseFor } from '../content/manifest';
import { PRO_OPEN } from '@/lib/launch';

interface Props {
  lang: Lang;
  activeId: string;
  completed: Set<string>;
  open: boolean;
  onNavigate: () => void;
}

function Sidebar({ lang, activeId, completed, open, onNavigate }: Props) {
  const { t } = useStrings(lang);
  const course = courseFor(lang);
  const activeModule = course.modules.find((m) => m.pages.includes(activeId))?.id ?? null;
  const [expanded, setExpanded] = useState<string | null>(activeModule ?? 'm00');

  useEffect(() => {
    if (activeModule) setExpanded(activeModule);
  }, [activeModule]);

  const doneCount = course.modules.reduce(
    (total, m) => total + m.pages.filter((p) => completed.has(p)).length,
    0
  );
  const pct = course.totalLessons ? Math.round((doneCount / course.totalLessons) * 100) : 0;

  const badgeFor = (kind: string) =>
    kind === 'quiz' ? t.quiz : kind === 'overview' ? t.start : null;

  return (
    <aside className={`sidebar${open ? ' is-open' : ''}`} aria-label={t.modules}>
      <div className="sidebar-head">
        <a href={hrefFor(lang, '')} className="brand" onClick={onNavigate}>
          <Logo variant="primary" size={168} />
        </a>
        <div className="brand-sub">{t.brandSub}</div>

        <div className="progress-wrap">
          <div className="progress-row">
            <span>{t.progress}</span>
            <span className="num">
              {doneCount}/{course.totalLessons}
            </span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t.progress}
          >
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <nav className="nav">
        <a
          href={hrefFor(lang, 'risk')}
          className={`nav-link${activeId === 'risk' ? ' is-active' : ''}`}
          onClick={onNavigate}
        >
          <ShieldAlert size={14} />
          <span className="nav-link-text">{t.riskDisclosure}</span>
        </a>
        <a
          href={hrefFor(lang, 'calculator')}
          className={`nav-link${activeId === 'calculator' ? ' is-active' : ''}`}
          onClick={onNavigate}
        >
          <Calculator size={14} />
          <span className="nav-link-text">{t.calculator}</span>
        </a>

        <div className="nav-section">{t.modules}</div>
        {course.modules.map((mod) => {
          const isOpen = expanded === mod.id;
          const done = mod.pages.filter((p) => completed.has(p)).length;
          const allDone = done === mod.pages.length && mod.pages.length > 0;
          return (
            <div className="mod" key={mod.id}>
              <button
                className={`mod-btn${isOpen ? ' is-open' : ''}`}
                onClick={() => setExpanded(isOpen ? null : mod.id)}
                aria-expanded={isOpen}
              >
                <ChevronRight size={13} className={`chev${isOpen ? ' is-open' : ''}`} />
                <span className="mod-num">{mod.number}</span>
                <span className="mod-title">{mod.title}</span>
                <span className={`mod-count${allDone ? ' is-done' : ''}`}>
                  {done}/{mod.pages.length}
                </span>
              </button>

              {isOpen && (
                <div className="mod-pages">
                  {mod.pages.map((pageId) => {
                    const page = course.pageById.get(pageId);
                    if (!page) return null;
                    const badge = badgeFor(page.kind);
                    return (
                      <a
                        key={pageId}
                        href={hrefFor(lang, pageId)}
                        className={`nav-link${activeId === pageId ? ' is-active' : ''}`}
                        onClick={onNavigate}
                      >
                        <span
                          className={`dot${completed.has(pageId) ? ' is-done' : ''}`}
                          aria-hidden="true"
                        />
                        <span className="nav-link-text">{page.title}</span>
                        {badge && <span className="nav-badge">{badge}</span>}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <div className="nav-section">{t.reference}</div>
        {course.referencePages.map((page) => (
          <a
            key={page.id}
            href={hrefFor(lang, page.id)}
            className={`nav-link${activeId === page.id ? ' is-active' : ''}`}
            onClick={onNavigate}
          >
            <BookOpen size={14} />
            <span className="nav-link-text">{page.title}</span>
          </a>
        ))}

        <div className="nav-section">{t.templates}</div>
        {course.templatePages.map((page) => (
          <a
            key={page.id}
            href={hrefFor(lang, page.id)}
            className={`nav-link${activeId === page.id ? ' is-active' : ''}`}
            onClick={onNavigate}
          >
            <FileText size={14} />
            <span className="nav-link-text">{page.title}</span>
          </a>
        ))}

        {/* Also in the top bar, which has no room for them on a phone. */}
        <div className="nav-section">{t.account}</div>
        <a href={`/pro/${lang}`} className="nav-link" aria-label={t.proLinkLabel}>
          <Sparkles size={14} />
          <span className="nav-link-text">{t.proLink}</span>
          {!PRO_OPEN && <span className="soon-badge">{t.proSoon}</span>}
        </a>
        <a
          href={hrefFor(lang, 'password')}
          className={`nav-link${activeId === 'password' ? ' is-active' : ''}`}
          onClick={onNavigate}
        >
          <KeyRound size={14} />
          <span className="nav-link-text">{t.changePassword}</span>
        </a>
        <a href={`/privacy/${lang}`} className="nav-link">
          <Shield size={14} />
          <span className="nav-link-text">{t.privacyLink}</span>
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
