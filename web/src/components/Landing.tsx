import { AlertTriangle, ArrowRight, Check, Languages, LogIn } from 'lucide-react';
import Logo from './Logo';
import { courseFor } from '../content/manifest';
import { QUIZZES } from '../content/quiz';
import { useStrings, type Lang } from '../lib/i18n';

interface Props {
  lang: Lang;
  onSignIn: () => void;
  onCreate: () => void;
  onSwitchLang: () => void;
}

/**
 * The public front door. The course itself is behind an account, so this page
 * carries the one number a visitor most needs before deciding anything: the
 * proportion of retail accounts that lose money. It is stated before the first
 * call to action, not after it.
 */
function Landing({ lang, onSignIn, onCreate, onSwitchLang }: Props) {
  const { t } = useStrings(lang);
  const course = courseFor(lang);
  const questions = QUIZZES.reduce((n, q) => n + q.count, 0);

  return (
    <div className="land">
      <header className="land-bar">
        <Logo variant="primary" size={168} />
        <div className="land-bar-actions">
          <button className="btn btn-sm" onClick={onSwitchLang}>
            <Languages size={15} />
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <button className="btn btn-sm btn-primary" onClick={onSignIn}>
            <LogIn size={15} />
            {t.authTabSignIn}
          </button>
        </div>
      </header>

      <main className="land-main">
        <section className="land-hero">
          <p className="land-kicker">{t.landKicker}</p>
          <h1>{t.heroTitle}</h1>
          <p className="land-lede">{t.heroLede}</p>
          <div className="land-cta">
            <button className="btn btn-primary" onClick={onCreate}>
              {t.landCtaCreate}
              <ArrowRight size={16} />
            </button>
            <button className="btn" onClick={onSignIn}>
              {t.authTabSignIn}
            </button>
          </div>
        </section>

        <section className="land-risk">
          <div className="land-risk-fig">
            <span className="gate-stat-num">{t.gateStatNum}</span>
          </div>
          <div className="land-risk-body">
            <div className="gate-kicker">
              <AlertTriangle size={14} />
              {t.gateKicker}
            </div>
            <p>{t.gateStatText}</p>
            <p className="land-risk-note">{t.riskCardBody2}</p>
          </div>
        </section>

        <section className="land-section">
          <h2 className="section-head">{t.landOutcomesTitle}</h2>
          <ul className="land-outcomes">
            <li>
              <Check size={16} />
              {t.landOutcome1}
            </li>
            <li>
              <Check size={16} />
              {t.landOutcome2}
            </li>
            <li>
              <Check size={16} />
              {t.landOutcome3}
            </li>
            <li>
              <Check size={16} />
              {t.landOutcome4}
            </li>
          </ul>
        </section>

        <section className="land-section">
          <h2 className="section-head">{t.landInsideTitle}</h2>
          <div className="stats">
            <div className="stat">
              <div className="stat-value">
                <span className="num">{course.modules.length}</span>
              </div>
              <div className="stat-label">{t.statModules}</div>
            </div>
            <div className="stat">
              <div className="stat-value">
                <span className="num">{course.totalLessons}</span>
              </div>
              <div className="stat-label">{t.statLessons}</div>
            </div>
            <div className="stat">
              <div className="stat-value">
                <span className="num">{questions}</span>
              </div>
              <div className="stat-label">{t.landStatQuestions}</div>
            </div>
            <div className="stat">
              <div className="stat-value">
                <span className="num">2</span>
              </div>
              <div className="stat-label">{t.landStatLanguages}</div>
            </div>
          </div>
        </section>

        <section className="land-section">
          <h2 className="section-head">{t.curriculum}</h2>
          <p className="land-note">{t.landCurriculumLede}</p>
          <ol className="land-modules">
            {course.modules.map((mod) => (
              <li key={mod.id}>
                <span className="land-mod-num num">{mod.number}</span>
                <span className="land-mod-title">{mod.title}</span>
                <span className="land-mod-time">{mod.time}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="land-section">
          <h2 className="section-head">{t.landNotTitle}</h2>
          <ul className="land-nots">
            <li>{t.landNot1}</li>
            <li>{t.landNot2}</li>
            <li>{t.landNot3}</li>
          </ul>
        </section>

        <section className="land-close">
          <p>{t.landClosing}</p>
          <div className="land-cta">
            <button className="btn btn-primary" onClick={onCreate}>
              {t.landCtaCreate}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      <footer className="land-foot">
        <Logo variant="mark" size={28} />
        <p>{t.gateFoot}</p>
      </footer>
    </div>
  );
}

export default Landing;
