import { AlertTriangle, ArrowRight, BookOpen, Calculator, FileText, ShieldAlert } from 'lucide-react';
import { modules, pageById, referencePages, templatePages, totalLessons } from '../content/manifest';

interface Props {
  completed: Set<string>;
}

function Home({ completed }: Props) {
  const doneCount = modules.reduce(
    (total, m) => total + m.pages.filter((p) => completed.has(p)).length,
    0
  );

  const nextPage =
    modules.flatMap((m) => m.pages).find((id) => !completed.has(id)) ?? 'm00/index';
  const nextMeta = pageById.get(nextPage);
  const started = doneCount > 0;

  return (
    <article className="article" style={{ maxWidth: 820 }}>
      <div className="hero">
        <h1>CFD Trading Fundamentals</h1>
        <p className="hero-lede">
          A complete, self-paced course on Contracts for Difference: what the contract is,
          how the arithmetic works, what it costs, how leverage and margin behave, and how
          to build and test a trading plan. No prior experience assumed. No money required.
        </p>
      </div>

      <div className="riskcard">
        <div className="riskcard-title">
          <AlertTriangle size={16} />
          Before anything else
        </div>
        <p>
          <strong>70% to 85% of retail CFD accounts lose money.</strong> That figure is
          audited and legally required to be published by regulated brokers in the UK, EU
          and Australia, and it is stable across rising and falling markets.
        </p>
        <p>
          This course is education, not financial advice, and it will not make you money.
          CFDs are not available to retail clients in the United States.{' '}
          <a href="#/risk">Read the full risk disclosure</a>.
        </p>
      </div>

      <div className="btn-row">
        <a className="btn btn-primary" href={`#/${started ? nextPage : 'risk'}`}>
          {started ? `Continue: ${nextMeta?.title ?? 'next lesson'}` : 'Start the course'}
          <ArrowRight size={16} />
        </a>
        <a className="btn" href="#/calculator">
          <Calculator size={16} />
          Open the calculator
        </a>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">12</div>
          <div className="stat-label">Modules</div>
        </div>
        <div className="stat">
          <div className="stat-value">{totalLessons}</div>
          <div className="stat-label">Lessons and quizzes</div>
        </div>
        <div className="stat">
          <div className="stat-value">~40h</div>
          <div className="stat-label">Study time</div>
        </div>
        <div className="stat">
          <div className="stat-value">
            {doneCount}
            <span style={{ fontSize: 15, color: 'var(--text-faint)' }}>/{totalLessons}</span>
          </div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <h2 className="section-head">Curriculum</h2>
      <div className="modcards">
        {modules.map((mod) => {
          const done = mod.pages.filter((p) => completed.has(p)).length;
          const pct = Math.round((done / mod.pages.length) * 100);
          return (
            <a className="modcard" href={`#/${mod.id}/index`} key={mod.id}>
              <div className="modcard-top">
                <span className="modcard-num">{mod.number}</span>
                <span className="modcard-time">{mod.time}</span>
              </div>
              <div className="modcard-title">{mod.title}</div>
              <div className="modcard-foot">
                <div className="modcard-bar">
                  <span style={{ width: `${pct}%` }} />
                </div>
                <span className="modcard-count">
                  {done}/{mod.pages.length}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <h2 className="section-head">Reference</h2>
      <div className="linkgrid">
        <a className="linkcard" href="#/risk">
          <ShieldAlert size={16} />
          Risk Disclosure
        </a>
        {referencePages.map((page) => (
          <a className="linkcard" href={`#/${page.id}`} key={page.id}>
            <BookOpen size={16} />
            {page.title}
          </a>
        ))}
      </div>

      <h2 className="section-head">Templates</h2>
      <div className="linkgrid">
        {templatePages.map((page) => (
          <a className="linkcard" href={`#/${page.id}`} key={page.id}>
            <FileText size={16} />
            {page.title}
          </a>
        ))}
      </div>

      <div className="callout callout-info" style={{ marginTop: 8 }}>
        <BookOpen size={16} />
        <div>
          Work the modules in order. The arithmetic in Modules 3 and 4 carries everything
          after it. If you read only one module, read{' '}
          <a href="#/m06/index">Module 06 on risk management</a> &mdash; it determines
          whether an account survives long enough for anything else to matter.
        </div>
      </div>
    </article>
  );
}

export default Home;
