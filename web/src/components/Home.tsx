import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bulb,
  Calculator as CalcIcon,
  Check,
  FileText,
  ShieldAlert,
} from './icons';
import Logo from './Logo';
import { hrefFor } from '../lib/router';
import { useStrings, type Lang } from '../lib/i18n';
import { courseFor } from '../content/manifest';

interface Props {
  lang: Lang;
  completed: Set<string>;
}

function Home({ lang, completed }: Props) {
  const { t } = useStrings(lang);
  const course = courseFor(lang);

  const doneCount = course.modules.reduce(
    (total, m) => total + m.pages.filter((p) => completed.has(p)).length,
    0
  );

  const nextPage =
    course.modules.flatMap((m) => m.pages).find((id) => !completed.has(id)) ?? 'm00/index';
  const nextMeta = course.pageById.get(nextPage);
  const started = doneCount > 0;

  return (
    <article className="article" style={{ maxWidth: 840 }}>
      <div className="hero">
        <div className="hero-logo">
          <Logo variant="stacked" size={260} />
        </div>
        <h1>{t.heroTitle}</h1>
        <p className="hero-lede">{t.heroLede}</p>
      </div>

      <div className="riskcard">
        <div className="riskcard-title">
          <AlertTriangle size={16} />
          {t.riskCardTitle}
        </div>
        <p>
          <strong>{t.riskCardBody1}</strong>
        </p>
        <p>
          {t.riskCardBody2} <a href={hrefFor(lang, 'risk')}>{t.readFullDisclosure}</a>.
        </p>
      </div>

      <div className="btn-row">
        <a className="btn btn-primary" href={hrefFor(lang, started ? nextPage : 'risk')}>
          {started ? `${t.continueAt}: ${nextMeta?.title ?? ''}` : t.startCourse}
          <ArrowRight size={16} />
        </a>
        <a className="btn" href={hrefFor(lang, 'calculator')}>
          <CalcIcon size={16} />
          {t.openCalculator}
        </a>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value"><span className="num">{course.modules.length}</span></div>
          <div className="stat-label">{t.statModules}</div>
        </div>
        <div className="stat">
          <div className="stat-value"><span className="num">{course.totalLessons}</span></div>
          <div className="stat-label">{t.statLessons}</div>
        </div>
        <div className="stat">
          <div className="stat-value"><span className="num">{t.studyTime}</span></div>
          <div className="stat-label">{t.statTime}</div>
        </div>
        <div className="stat">
          <div className="stat-value">
            <span className="num">{doneCount}</span>
            <span className="num" style={{ fontSize: 15, color: 'var(--ink-muted)' }}>
              /{course.totalLessons}
            </span>
          </div>
          <div className="stat-label">{t.statCompleted}</div>
        </div>
      </div>

      <h2 className="section-head">{t.curriculum}</h2>
      <div className="modcards">
        {course.modules.map((mod) => {
          const done = mod.pages.filter((p) => completed.has(p)).length;
          const total = mod.pages.length || 1;
          const pct = Math.round((done / total) * 100);
          const state = done === 0 ? '' : done >= total ? ' is-done' : ' is-progress';
          return (
            <a className="modcard" href={hrefFor(lang, `${mod.id}/index`)} key={mod.id}>
              <span className={`modbadge${state}`} aria-hidden="true">
                {done >= total ? <Check size={20} /> : mod.number}
              </span>
              <span className="modcard-body">
                <span className="modcard-top">
                  <span className="modcard-title">{mod.title}</span>
                  <span className="modcard-time">{mod.time}</span>
                </span>
                <span className="modcard-foot">
                  <span className="modcard-bar">
                    <span style={{ width: `${pct}%` }} />
                  </span>
                  <span className="modcard-count">
                    {done}/{mod.pages.length}
                  </span>
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <h2 className="section-head">{t.reference}</h2>
      <div className="linkgrid">
        <a className="linkcard" href={hrefFor(lang, 'risk')}>
          <span className="icon-tile">
            <ShieldAlert size={20} />
          </span>
          {t.riskDisclosure}
        </a>
        {course.referencePages.map((page) => (
          <a className="linkcard" href={hrefFor(lang, page.id)} key={page.id}>
            <span className="icon-tile">
              <BookOpen size={20} />
            </span>
            {page.title}
          </a>
        ))}
      </div>

      <h2 className="section-head">{t.templates}</h2>
      <div className="linkgrid">
        {course.templatePages.map((page) => (
          <a className="linkcard" href={hrefFor(lang, page.id)} key={page.id}>
            <span className="icon-tile">
              <FileText size={20} />
            </span>
            {page.title}
          </a>
        ))}
      </div>

      <div className="callout callout-info" style={{ marginTop: 8 }}>
        <Bulb size={16} />
        <div>
          {t.homeFooter1}{' '}
          <a href={hrefFor(lang, 'm06/index')}>
            {t.module} 06 &middot; {course.modules[6]?.title ?? ''}
          </a>{' '}
          {t.homeFooter2}
        </div>
      </div>
    </article>
  );
}

export default Home;
