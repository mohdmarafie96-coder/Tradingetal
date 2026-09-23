import { useMemo, useState } from 'react';
import { AlertTriangle, Info } from './icons';
import { hrefFor } from '../lib/router';
import { useStrings, type Lang } from '../lib/i18n';
import { sizePosition, stopDistance } from '../lib/sizing';

type Tab = 'size' | 'margin' | 'expectancy' | 'drawdown';

function num(value: string, fallback = 0): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Figures are always rendered with Western digits and a dot separator, which
 *  is what broker platforms show in both language editions. */
function money(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function trim(value: number, places = 2): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: places });
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

function Field({ label, value, onChange, hint }: FieldProps) {
  const id = `f-${label.replace(/\s+/g, '-')}`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step="any"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

function Row({
  label,
  value,
  tone,
  numeric = true,
}: {
  label: string;
  value: string;
  tone?: 'warn' | 'ok' | 'danger';
  /** False for verdicts and classifications, which are words, not figures. */
  numeric?: boolean;
}) {
  return (
    <div className="result-row">
      <dt>{label}</dt>
      <dd className={tone}>{numeric ? <span className="num">{value}</span> : value}</dd>
    </div>
  );
}

function PositionSize({ lang }: { lang: Lang }) {
  const { t } = useStrings(lang);
  const [balance, setBalance] = useState('5000');
  const [riskPct, setRiskPct] = useState('1');
  const [entry, setEntry] = useState('1.0880');
  const [stop, setStop] = useState('1.0845');
  const [pipSize, setPipSize] = useState('0.0001');
  const [pipValue, setPipValue] = useState('10');
  const [cost, setCost] = useState('2.5');

  const r = useMemo(
    () =>
      sizePosition({
        balance: num(balance),
        riskPct: num(riskPct),
        stopPips: stopDistance(num(entry), num(stop), num(pipSize, 0.0001)),
        pipValue: num(pipValue, 10),
        cost: num(cost),
      }),
    [balance, riskPct, entry, stop, pipSize, pipValue, cost],
  );

  const costTone = r.costRatio >= 25 ? 'danger' : r.costRatio >= 10 ? 'warn' : 'ok';

  return (
    <>
      <div className="field-grid">
        <Field label={t.fAccountEquity} value={balance} onChange={setBalance} />
        <Field label={t.fRiskPct} value={riskPct} onChange={setRiskPct} hint={t.fRiskPctHint} />
        <Field label={t.fEntry} value={entry} onChange={setEntry} />
        <Field label={t.fStop} value={stop} onChange={setStop} />
        <Field label={t.fPipSize} value={pipSize} onChange={setPipSize} hint={t.fPipSizeHint} />
        <Field label={t.fPipValue} value={pipValue} onChange={setPipValue} hint={t.fPipValueHint} />
        <Field label={t.fCost} value={cost} onChange={setCost} hint={t.fCostHint} />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">{t.rPositionSize}</div>
          <div className="result-head-value">
            <span className="num">{trim(r.lots, 2)}</span> {t.rLots}
          </div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row label={t.rRiskBudget} value={money(r.risk)} />
          <Row label={t.rStopDistance} value={trim(r.stopPips, 1)} />
          <Row label={t.rUnits} value={trim(r.units, 0)} />
          <Row label={t.rPipValueOnPosition} value={money(r.pipValueOnPosition)} />
          <Row label={t.rActualRisk} value={money(r.actualRisk)} />
          <Row label={t.rActualRiskPct} value={`${trim(r.actualPct, 2)}%`} />
          <Row label={t.rCostRatio} value={`${trim(r.costRatio, 1)}%`} tone={costTone} />
        </dl>
      </div>

      {r.belowMinimum && (
        <div className="callout callout-warn">
          <AlertTriangle size={16} />
          <div>{t.warnBelowMin}</div>
        </div>
      )}

      {r.costRatio >= 25 && !r.belowMinimum && (
        <div className="callout callout-warn">
          <AlertTriangle size={16} />
          <div>{t.warnCostRatio}</div>
        </div>
      )}

      <div className="callout callout-info">
        <Info size={16} />
        <div>
          {t.infoRoundDown} {t.seeModule}{' '}
          <a href={hrefFor(lang, 'm06/01-position-sizing')}>{t.module} 06.1</a>.
        </div>
      </div>
    </>
  );
}

function Margin({ lang }: { lang: Lang }) {
  const { t } = useStrings(lang);
  const [balance, setBalance] = useState('5000');
  const [units, setUnits] = useState('100000');
  const [price, setPrice] = useState('1.0900');
  const [leverage, setLeverage] = useState('30');

  const r = useMemo(() => {
    const bal = num(balance);
    const lev = num(leverage, 1);
    const notional = num(units) * num(price);
    const margin = lev > 0 ? notional / lev : 0;
    return {
      notional,
      margin,
      marginPct: lev > 0 ? 100 / lev : 0,
      free: bal - margin,
      effective: bal > 0 ? notional / bal : 0,
      level: margin > 0 ? (bal / margin) * 100 : 0,
      wipeout: lev > 0 ? 100 / lev : 0,
    };
  }, [balance, units, price, leverage]);

  const levTone =
    r.effective > 10 ? 'danger' : r.effective > 5 ? 'warn' : r.effective > 0 ? 'ok' : undefined;
  const classification =
    r.effective > 20
      ? t.clsRuin
      : r.effective > 10
        ? t.clsSevere
        : r.effective > 5
          ? t.clsAggressive
          : r.effective > 2
            ? t.clsModerate
            : t.clsConservative;

  return (
    <>
      <div className="field-grid">
        <Field label={t.fAccountEquity} value={balance} onChange={setBalance} />
        <Field label={t.fUnits} value={units} onChange={setUnits} hint={t.fUnitsHint} />
        <Field label={t.fPrice} value={price} onChange={setPrice} />
        <Field label={t.fLeverage} value={leverage} onChange={setLeverage} hint={t.fLeverageHint} />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">{t.rEffectiveLeverage}</div>
          <div className="result-head-value"><span className="num">{trim(r.effective, 1)} : 1</span></div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row label={t.rClassification} value={classification} tone={levTone} numeric={false} />
          <Row label={t.rNotional} value={money(r.notional)} />
          <Row label={t.rMarginRequired} value={money(r.margin)} />
          <Row label={t.rMarginRequirement} value={`${trim(r.marginPct, 2)}%`} />
          <Row
            label={t.rFreeMargin}
            value={money(r.free)}
            tone={r.free < 0 ? 'danger' : undefined}
          />
          <Row
            label={t.rMarginLevel}
            value={`${trim(r.level, 0)}%`}
            tone={r.level < 200 ? 'warn' : 'ok'}
          />
          <Row label={t.rWipeout} value={`${trim(r.wipeout, 2)}%`} />
        </dl>
      </div>

      <div className="callout callout-info">
        <Info size={16} />
        <div>
          {t.infoLeverage} {t.seeModule}{' '}
          <a href={hrefFor(lang, 'm04/01-leverage')}>{t.module} 04.1</a>.
        </div>
      </div>
    </>
  );
}

function Expectancy({ lang }: { lang: Lang }) {
  const { t } = useStrings(lang);
  const [winRate, setWinRate] = useState('40');
  const [avgWin, setAvgWin] = useState('2.5');
  const [avgLoss, setAvgLoss] = useState('1');
  const [cost, setCost] = useState('0.07');
  const [trades, setTrades] = useState('100');

  const r = useMemo(() => {
    const w = num(winRate) / 100;
    const win = Math.abs(num(avgWin));
    const loss = Math.abs(num(avgLoss, 1));
    const gross = w * win - (1 - w) * loss;
    const net = gross - Math.abs(num(cost));
    const rr = loss > 0 ? win / loss : 0;
    return {
      gross,
      net,
      rr,
      breakeven: rr > 0 ? (1 / (1 + rr)) * 100 : 0,
      over: net * num(trades),
      viable: net > 0,
    };
  }, [winRate, avgWin, avgLoss, cost, trades]);

  return (
    <>
      <div className="field-grid">
        <Field label={t.fWinRate} value={winRate} onChange={setWinRate} />
        <Field label={t.fAvgWin} value={avgWin} onChange={setAvgWin} />
        <Field label={t.fAvgLoss} value={avgLoss} onChange={setAvgLoss} hint={t.fAvgLossHint} />
        <Field label={t.fCostR} value={cost} onChange={setCost} />
        <Field label={t.fTrades} value={trades} onChange={setTrades} />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">{t.rNetExpectancy}</div>
          <div className="result-head-value">
            <span className="num">
              {r.net >= 0 ? '+' : ''}
              {trim(r.net, 3)}R
            </span>
          </div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row
            label={t.rVerdict}
            value={r.viable ? t.rViable : t.rNotViable}
            tone={r.viable ? 'ok' : 'danger'}
            numeric={false}
          />
          <Row
            label={t.rGrossExpectancy}
            value={`${r.gross >= 0 ? '+' : ''}${trim(r.gross, 3)}R`}
          />
          <Row label={t.rRewardToRisk} value={`${trim(r.rr, 2)} : 1`} />
          <Row label={t.rBreakeven} value={`${trim(r.breakeven, 1)}%`} />
          <Row
            label={`${t.rTotalOver} ${trim(num(trades), 0)}`}
            value={`${r.over >= 0 ? '+' : ''}${trim(r.over, 1)}R`}
            tone={r.over >= 0 ? 'ok' : 'danger'}
          />
        </dl>
      </div>

      <div className="callout callout-info">
        <Info size={16} />
        <div>
          {t.infoWinRate} {t.seeModule}{' '}
          <a href={hrefFor(lang, 'm06/02-expectancy')}>{t.module} 06.2</a>.
        </div>
      </div>
    </>
  );
}

function Drawdown({ lang }: { lang: Lang }) {
  const { t } = useStrings(lang);
  const [drawdown, setDrawdown] = useState('30');
  const [riskPct, setRiskPct] = useState('1');
  const [losses, setLosses] = useState('10');

  const r = useMemo(() => {
    const d = Math.min(Math.max(num(drawdown), 0), 99.99) / 100;
    const remaining = Math.pow(1 - num(riskPct) / 100, Math.max(0, num(losses)));
    const streakDd = (1 - remaining) * 100;
    return {
      recovery: (1 / (1 - d) - 1) * 100,
      remaining: remaining * 100,
      streakDd,
      streakRecovery: streakDd < 100 ? (1 / (1 - streakDd / 100) - 1) * 100 : Infinity,
    };
  }, [drawdown, riskPct, losses]);

  const tone = num(drawdown) >= 30 ? 'danger' : num(drawdown) >= 15 ? 'warn' : 'ok';

  return (
    <>
      <div className="field-grid">
        <Field label={t.fDrawdownPct} value={drawdown} onChange={setDrawdown} />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">{t.rRecoveryGain}</div>
          <div className="result-head-value"><span className="num">{trim(r.recovery, 1)}%</span></div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row
            label={t.rAssessment}
            value={
              num(drawdown) >= 50 ? t.ddDouble : num(drawdown) >= 30 ? t.ddHard : t.ddOk
            }
            tone={tone}
            numeric={false}
          />
        </dl>
      </div>

      <h2 className="section-head" style={{ marginTop: 34 }}>
        {t.rLosingStreak}
      </h2>

      <div className="field-grid">
        <Field label={t.fRiskPct} value={riskPct} onChange={setRiskPct} />
        <Field label={t.fLosses} value={losses} onChange={setLosses} />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">{t.rRemaining}</div>
          <div className="result-head-value"><span className="num">{trim(r.remaining, 1)}%</span></div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row label={t.rStreakDrawdown} value={`${trim(r.streakDd, 1)}%`} />
          <Row
            label={t.rGainToRecover}
            value={Number.isFinite(r.streakRecovery) ? `${trim(r.streakRecovery, 1)}%` : '—'}
            tone={r.streakDd >= 30 ? 'danger' : r.streakDd >= 15 ? 'warn' : 'ok'}
          />
        </dl>
      </div>

      <div className="callout callout-info">
        <Info size={16} />
        <div>
          {t.infoStreak} {t.seeModule}{' '}
          <a href={hrefFor(lang, 'm06/03-drawdown')}>{t.module} 06.3</a>.
        </div>
      </div>
    </>
  );
}

function Calculator({ lang }: { lang: Lang }) {
  const { t } = useStrings(lang);
  const [tab, setTab] = useState<Tab>('size');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'size', label: t.tabSize },
    { id: 'margin', label: t.tabMargin },
    { id: 'expectancy', label: t.tabExpectancy },
    { id: 'drawdown', label: t.tabDrawdown },
  ];

  return (
    <article className="article">
      <div className="eyebrow">
        <a href={hrefFor(lang, '')}>{t.course}</a>
        <span aria-hidden="true">/</span>
        <span>{t.tools}</span>
      </div>

      <h1 className="page-title">{t.calculator}</h1>
      <div className="page-meta">{t.calcIntro}</div>

      <div className="calc-tabs" role="tablist" aria-label={t.calculator}>
        {tabs.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={tab === item.id}
            className={`calc-tab${tab === item.id ? ' is-active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'size' && <PositionSize lang={lang} />}
      {tab === 'margin' && <Margin lang={lang} />}
      {tab === 'expectancy' && <Expectancy lang={lang} />}
      {tab === 'drawdown' && <Drawdown lang={lang} />}
    </article>
  );
}

export default Calculator;
