import { useEffect, useState } from 'react';
import { BookOpen, Calculator, ChevronRight, FileText, ShieldAlert } from 'lucide-react';
import {
  modules,
  pageById,
  referencePages,
  templatePages,
  totalLessons,
} from '../content/manifest';

interface Props {
  activeId: string;
  completed: Set<string>;
  open: boolean;
  onNavigate: () => void;
}

const KIND_BADGE: Record<string, string> = {
  quiz: 'Quiz',
  overview: 'Start',
};

function Sidebar({ activeId, completed, open, onNavigate }: Props) {
  const activeModule = modules.find((m) => m.pages.includes(activeId))?.id ?? null;
  const [expanded, setExpanded] = useState<string | null>(activeModule ?? 'm00');

  useEffect(() => {
    if (activeModule) setExpanded(activeModule);
  }, [activeModule]);

  const doneCount = modules.reduce(
    (total, m) => total + m.pages.filter((p) => completed.has(p)).length,
    0
  );
  const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;

  return (
    <aside className={`sidebar${open ? ' is-open' : ''}`} aria-label="Course navigation">
      <div className="sidebar-head">
        <a href="#/" className="brand" onClick={onNavigate}>
          CFD Trading Fundamentals
        </a>
        <div className="brand-sub">12 modules &middot; 72,000 words</div>

        <div className="progress-wrap">
          <div className="progress-row">
            <span>Progress</span>
            <span>
              {doneCount}/{totalLessons}
            </span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Course progress"
          >
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <nav className="nav">
        <a
          href="#/risk"
          className={`nav-link${activeId === 'risk' ? ' is-active' : ''}`}
          onClick={onNavigate}
        >
          <ShieldAlert size={14} />
          <span className="nav-link-text">Risk disclosure</span>
        </a>
        <a
          href="#/calculator"
          className={`nav-link${activeId === 'calculator' ? ' is-active' : ''}`}
          onClick={onNavigate}
        >
          <Calculator size={14} />
          <span className="nav-link-text">Calculator</span>
        </a>

        <div className="nav-section">Modules</div>
        {modules.map((mod) => {
          const isOpen = expanded === mod.id;
          const done = mod.pages.filter((p) => completed.has(p)).length;
          const allDone = done === mod.pages.length;
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
                    const page = pageById.get(pageId);
                    if (!page) return null;
                    const badge = KIND_BADGE[page.kind];
                    return (
                      <a
                        key={pageId}
                        href={`#/${pageId}`}
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

        <div className="nav-section">Reference</div>
        {referencePages.map((page) => (
          <a
            key={page.id}
            href={`#/${page.id}`}
            className={`nav-link${activeId === page.id ? ' is-active' : ''}`}
            onClick={onNavigate}
          >
            <BookOpen size={14} />
            <span className="nav-link-text">{page.title}</span>
          </a>
        ))}

        <div className="nav-section">Templates</div>
        {templatePages.map((page) => (
          <a
            key={page.id}
            href={`#/${page.id}`}
            className={`nav-link${activeId === page.id ? ' is-active' : ''}`}
            onClick={onNavigate}
          >
            <FileText size={14} />
            <span className="nav-link-text">{page.title}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
