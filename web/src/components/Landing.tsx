import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Languages, LogIn } from 'lucide-react';
import Logo from './Logo';
import { courseFor } from '../content/manifest';
import { QUIZZES } from '../content/quiz';
import { useStrings, type Lang } from '../lib/i18n';
import { sizePosition } from '../lib/sizing';

interface Props {
  lang: Lang;
  onSignIn: () => void;
  onCreate: () => void;
  onSwitchLang: () => void;
}

/**
 * The public front door.
 *
 * The brand is a reference work rather than a brokerage — the name is a
 * citation — so the page is set like a manual: a margin rail of section marks,
 * hairline rules instead of boxes, and figures that carry captions and a
 * source. The course is behind an account, so the one number a visitor most
 * needs is stated here, before the first call to action, with its provenance
 * attached.
 */
function Landing({ lang, onSignIn, onCreate, onSwitchLang }: Props) {
  const { t } = useStrings(lang);
  const course = courseFor(lang);
  const questions = QUIZZES.reduce((n, q) => n + q.count, 0);
  const root = useRef<HTMLDivElement>(null);

  // One orchestrated reveal as each band is reached. Deliberately additive:
  // the bands are visible in the stylesheet and only hidden once this effect
  // has marked the page as animating, so a reader who jumps to the bottom, or
  // whose JavaScript fails, never meets an empty section.
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const bands = Array.from(node.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    node.classList.add('is-animating');
    const reveal = () => {
      const limit = window.innerHeight * 0.88;
      let pending = false;
      bands.forEach((el) => {
        if (el.classList.contains('is-in')) return;
        if (el.getBoundingClientRect().top < limit) el.classList.add('is-in');
        else pending = true;
      });
      if (!pending) {
        window.removeEventListener('scroll', reveal);
        window.removeEventListener('resize', reveal);
      }
    };

    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal);
    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', reveal);
    };
  }, []);

  const outcomes = [t.landOutcome1, t.landOutcome2, t.landOutcome3, t.landOutcome4];

  return (
    <div className="land" ref={root}>
      <header className="land-bar">
        <a className="land-brand" href={`#/${lang}`} aria-label="Trading et al.">
          <Logo variant="primary" size={158} />
        </a>
        <nav className="land-bar-actions">
          <button
            className="btn btn-ghost btn-sm lang-toggle"
            onClick={onSwitchLang}
            aria-label={t.switchLang}
          >
            <Languages size={16} />
            <span className="lang-label">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
          <button className="btn btn-sm btn-primary" onClick={onSignIn}>
            <LogIn size={15} />
            {t.authTabSignIn}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero: the thesis on the left, the number that governs it on the right. */}
        <section className="band band-hero" data-reveal>
          <div className="band-rail" aria-hidden="true" />
          <div className="band-body hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t.landKicker}</p>
              <h1 className="display">{t.heroTitle}</h1>
              <p className="lede">{t.heroLede}</p>
              <div className="cta-row">
                <button className="btn btn-primary btn-lg" onClick={onCreate}>
                  {t.landCtaCreate}
                  <ArrowRight size={17} />
                </button>
                <button className="btn btn-lg btn-ghost" onClick={onSignIn}>
                  {t.authTabSignIn}
                </button>
              </div>
            </div>

            <figure className="plate plate-stat">
              <div className="plate-figure">
                <span className="stat-huge">{t.gateStatNum}</span>
                <p className="stat-read">{t.gateStatText}</p>
              </div>
              <figcaption className="plate-cap">
                <span className="cap-rule" aria-hidden="true" />
                {t.landSourceNote}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* What the reader can do afterwards. A list, not a card grid. */}
        <section className="band" data-reveal>
          <div className="band-rail" aria-hidden="true">
            <span className="mark-num">01</span>
          </div>
          <div className="band-body">
            <h2 className="head">{t.landOutcomesTitle}</h2>
            <ol className="outcomes">
              {outcomes.map((text, i) => (
                <li key={i}>
                  <span className="outcome-num num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="outcome-text">{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The figure the whole course turns on. Arithmetic, not a forecast. */}
        <section className="band band-fig" data-reveal>
          <div className="band-rail" aria-hidden="true">
            <span className="mark-num">02</span>
          </div>
          <div className="band-body">
            <figure className="plate plate-chart">
              <div className="plate-head">
                <span className="plate-label">{t.landFigLabel}</span>
                <h2 className="plate-title">{t.landFigTitle}</h2>
              </div>
              <RecoveryCurve t={t} />
              <figcaption className="plate-cap">
                <span className="cap-rule" aria-hidden="true" />
                {t.landFigCaption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* The course's own arithmetic, working, before the account wall. A
            visitor can check the claim instead of being asked to trust it. */}
        <section className="band band-fig" data-reveal>
          <div className="band-rail" aria-hidden="true">
            <span className="mark-num">03</span>
          </div>
          <div className="band-body">
            <TrySizing t={t} />
          </div>
        </section>

        {/* The curriculum is genuinely a sequence, so it is numbered. */}
        <section className="band" data-reveal>
          <div className="band-rail" aria-hidden="true">
            <span className="mark-num">04</span>
          </div>
          <div className="band-body">
            <h2 className="head">{t.curriculum}</h2>
            <p className="note">{t.landCurriculumLede}</p>
            <ol className="land-toc">
              {course.modules.map((mod) => (
                <li key={mod.id}>
                  <span className="land-toc-num num">{mod.number}</span>
                  <span className="land-toc-title">{mod.title}</span>
                  <span className="land-toc-dots" aria-hidden="true" />
                  <span className="land-toc-time num">{mod.time}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The colophon: what the thing physically contains. */}
        <section className="band" data-reveal>
          <div className="band-rail" aria-hidden="true">
            <span className="mark-num">05</span>
          </div>
          <div className="band-body colophon-grid">
            <div>
              <h2 className="head">{t.landColophon}</h2>
              <p className="note">{t.landContentsNote}</p>
            </div>
            <dl className="spec">
              <div>
                <dt>{t.statModules}</dt>
                <dd className="num">{course.modules.length}</dd>
              </div>
              <div>
                <dt>{t.statLessons}</dt>
                <dd className="num">{course.totalLessons}</dd>
              </div>
              <div>
                <dt>{t.landStatQuestions}</dt>
                <dd className="num">{questions}</dd>
              </div>
              <div>
                <dt>{t.landStatLanguages}</dt>
                <dd className="num">2</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* What it is not — stated plainly, because everything else in this
            market is the opposite. */}
        <section className="band" data-reveal>
          <div className="band-rail" aria-hidden="true">
            <span className="mark-num">06</span>
          </div>
          <div className="band-body">
            <h2 className="head">{t.landNotTitle}</h2>
            <ul className="nots">
              <li>{t.landNot1}</li>
              <li>{t.landNot2}</li>
              <li>{t.landNot3}</li>
            </ul>
          </div>
        </section>

        <section className="band band-close" data-reveal>
          <div className="band-rail" aria-hidden="true" />
          <div className="band-body">
            <p className="closing">{t.landClosing}</p>
            <div className="cta-row">
              <button className="btn btn-primary btn-lg" onClick={onCreate}>
                {t.landCtaCreate}
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="land-foot">
        <div className="land-foot-inner">
          <Logo variant="mark" size={32} />
          <p>{t.gateFoot}</p>
        </div>
      </footer>
    </div>
  );
}

type T = ReturnType<typeof useStrings>['t'];

function fig(value: number, places = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  });
}

/**
 * The position-size calculation, live on the public page.
 *
 * The rest of the site asks to be believed; this asks to be used. It runs the
 * same sizePosition() the course's calculator runs, so a visitor who checks the
 * number here and again after signing up gets the same answer.
 *
 * Four fields rather than the calculator's seven: the stop is taken straight in
 * pips instead of being derived from an entry, a stop price and a pip size. A
 * front door is not the place to explain what a pip size is.
 */
function TrySizing({ t }: { t: T }) {
  const [balance, setBalance] = useState('5000');
  const [riskPct, setRiskPct] = useState('1');
  const [stopPips, setStopPips] = useState('35');
  const [pipValue, setPipValue] = useState('10');

  const n = (v: string) => {
    const parsed = Number.parseFloat(v);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const r = useMemo(
    () =>
      sizePosition({
        balance: n(balance),
        riskPct: n(riskPct),
        stopPips: n(stopPips),
        pipValue: n(pipValue),
      }),
    [balance, riskPct, stopPips, pipValue],
  );

  // Anything over 2% is where an ordinary losing run stops being survivable, so
  // the page says so at the moment the reader types it rather than in a lesson
  // they have not reached.
  const heavy = n(riskPct) > 2;

  const fields: Array<[string, string, (v: string) => void, string?]> = [
    [t.fAccountEquity, balance, setBalance],
    [t.fRiskPct, riskPct, setRiskPct, t.fRiskPctHint],
    [t.landTryStopPips, stopPips, setStopPips, t.landTryStopPipsHint],
    [t.fPipValue, pipValue, setPipValue, t.fPipValueHint],
  ];

  return (
    <figure className="plate plate-try">
      <div className="plate-head">
        <span className="plate-label">{t.landTryLabel}</span>
        <h2 className="plate-title">{t.landTryTitle}</h2>
        <p className="plate-lede">{t.landTryLede}</p>
      </div>

      <div className="try-grid">
        {fields.map(([label, value, set, hint]) => {
          const id = `try-${label.replace(/[^a-zA-Z]+/g, '-')}`;
          return (
            <div className="try-field" key={label}>
              <label htmlFor={id}>{label}</label>
              <input
                id={id}
                type="number"
                inputMode="decimal"
                step="any"
                value={value}
                onChange={(e) => set(e.target.value)}
              />
              {hint && <span className="try-hint">{hint}</span>}
            </div>
          );
        })}
      </div>

      <div className="try-out" aria-live="polite">
        <div className="try-answer">
          {/* Keyed on the value so the highlight replays whenever it changes:
              the reader should see that their edit moved the number. */}
          <span className="try-lots num" key={r.lots}>
            {fig(r.lots, 2)}
          </span>
          <span className="try-lots-unit">{t.rLots}</span>
        </div>
        <dl className="try-rows">
          <div>
            <dt>{t.rRiskBudget}</dt>
            <dd className="num">{fig(r.risk)}</dd>
          </div>
          <div>
            <dt>{t.rActualRisk}</dt>
            <dd className="num">{fig(r.actualRisk)}</dd>
          </div>
          <div>
            <dt>{t.rPipValueOnPosition}</dt>
            <dd className="num">{fig(r.pipValueOnPosition)}</dd>
          </div>
        </dl>
      </div>

      {r.belowMinimum && <p className="try-warn">{t.landTryTooWide}</p>}
      {heavy && !r.belowMinimum && <p className="try-warn">{t.landTryHeavy}</p>}

      <figcaption className="plate-cap">
        <span className="cap-rule" aria-hidden="true" />
        {t.landTryCaption}
      </figcaption>
    </figure>
  );
}

/**
 * Recovery required against drawdown taken: r = d / (1 − d). Plotted because
 * the shape is the argument — it is flat where people expect it to be flat and
 * vertical where they assume they can still trade their way back.
 */
function RecoveryCurve({ t }: { t: T }) {
  const pad = { l: 58, r: 26, t: 26, b: 42 };
  const w = 640;
  const h = 300;
  const maxD = 0.7;
  const maxR = 2.5;
  const x = (d: number) => pad.l + (d / maxD) * (w - pad.l - pad.r);
  const y = (r: number) => h - pad.b - (r / maxR) * (h - pad.t - pad.b);

  const points: Array<[number, number]> = [];
  for (let d = 0; d <= maxD + 0.0001; d += 0.025) {
    points.push([d, d / (1 - d)]);
  }
  const path = points.map(([d, r], i) => `${i === 0 ? 'M' : 'L'}${x(d).toFixed(1)},${y(r).toFixed(1)}`).join(' ');

  const gridR = [0.5, 1, 1.5, 2, 2.5];
  const gridD = [0, 0.2, 0.4, 0.6];
  const mx = x(0.3);
  const my = y(0.429);

  return (
    <div className="chart-wrap" dir="ltr">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="chart"
        role="img"
        aria-label={`${t.landFigTitle}. ${t.landMarker}.`}
      >
        {gridR.map((r) => (
          <g key={r}>
            <line className="grid" x1={pad.l} x2={w - pad.r} y1={y(r)} y2={y(r)} />
            <text className="tick" x={pad.l - 10} y={y(r) + 4} textAnchor="end">
              {Math.round(r * 100)}%
            </text>
          </g>
        ))}
        {gridD.map((d) => (
          <text key={d} className="tick" x={x(d)} y={h - pad.b + 20} textAnchor="middle">
            {Math.round(d * 100)}%
          </text>
        ))}

        <line className="axis" x1={pad.l} x2={w - pad.r} y1={y(0)} y2={y(0)} />
        <line className="axis" x1={pad.l} x2={pad.l} y1={pad.t} y2={y(0)} />

        <path className="curve" d={path} pathLength={1} />

        <line className="marker-line" x1={mx} x2={mx} y1={my} y2={y(0)} />
        <circle className="marker-dot" cx={mx} cy={my} r={4.5} />
        <text className="marker-text" x={mx + 12} y={my - 10}>
          {t.landMarker}
        </text>

      </svg>
      <div className="chart-axes">
        <span>{t.landAxisDrawdown}</span>
        <span>{t.landAxisRecovery}</span>
      </div>
    </div>
  );
}

export default Landing;
