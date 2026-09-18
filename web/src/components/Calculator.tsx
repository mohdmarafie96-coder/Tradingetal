import { useMemo, useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

type Tab = 'size' | 'margin' | 'expectancy' | 'drawdown';

const TABS: { id: Tab; label: string }[] = [
  { id: 'size', label: 'Position size' },
  { id: 'margin', label: 'Margin' },
  { id: 'expectancy', label: 'Expectancy' },
  { id: 'drawdown', label: 'Drawdown' },
];

function num(value: string, fallback = 0): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function money(value: number): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function trim(value: number, places = 2): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: places });
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  step?: string;
}

function Field({ label, value, onChange, hint, step }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={`f-${label}`}>{label}</label>
      <input
        id={`f-${label}`}
        type="number"
        inputMode="decimal"
        step={step ?? 'any'}
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
}: {
  label: string;
  value: string;
  tone?: 'warn' | 'ok' | 'danger';
}) {
  return (
    <div className="result-row">
      <dt>{label}</dt>
      <dd className={tone}>{value}</dd>
    </div>
  );
}

function PositionSize() {
  const [balance, setBalance] = useState('5000');
  const [riskPct, setRiskPct] = useState('1');
  const [entry, setEntry] = useState('1.0880');
  const [stop, setStop] = useState('1.0845');
  const [pipSize, setPipSize] = useState('0.0001');
  const [pipValue, setPipValue] = useState('10');
  const [cost, setCost] = useState('2.5');

  const r = useMemo(() => {
    const bal = num(balance);
    const risk = bal * (num(riskPct) / 100);
    const ps = num(pipSize, 0.0001);
    const pv = num(pipValue, 10);
    const distance = Math.abs(num(entry) - num(stop));
    const stopPips = ps > 0 ? distance / ps : 0;
    const valid = stopPips > 0 && pv > 0 && risk > 0;
    const exactLots = valid ? risk / (stopPips * pv) : 0;
    const lots = valid ? Math.floor(exactLots / 0.01) * 0.01 : 0;
    const rounded = Math.round(lots * 100) / 100;
    const actualRisk = rounded * stopPips * pv;
    const costRatio = actualRisk > 0 ? (num(cost) / actualRisk) * 100 : 0;
    return {
      risk,
      stopPips,
      lots: rounded,
      units: rounded * 100000,
      pipValueOnPosition: rounded * pv,
      actualRisk,
      actualPct: bal > 0 ? (actualRisk / bal) * 100 : 0,
      costRatio,
      belowMinimum: valid && rounded < 0.01,
      valid,
    };
  }, [balance, riskPct, entry, stop, pipSize, pipValue, cost]);

  const costTone = r.costRatio >= 25 ? 'danger' : r.costRatio >= 10 ? 'warn' : 'ok';

  return (
    <>
      <div className="field-grid">
        <Field label="Account equity" value={balance} onChange={setBalance} />
        <Field label="Risk %" value={riskPct} onChange={setRiskPct} hint="0.5–1% while learning" />
        <Field label="Entry price" value={entry} onChange={setEntry} />
        <Field label="Stop price" value={stop} onChange={setStop} />
        <Field label="Pip size" value={pipSize} onChange={setPipSize} hint="0.0001, or 0.01 for JPY" />
        <Field label="Pip value per lot" value={pipValue} onChange={setPipValue} hint="10 for USD-quoted FX" />
        <Field label="Round-trip cost" value={cost} onChange={setCost} hint="Spread + commission" />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">Position size</div>
          <div className="result-head-value">{trim(r.lots, 2)} lots</div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row label="Risk budget" value={money(r.risk)} />
          <Row label="Stop distance" value={`${trim(r.stopPips, 1)} pips`} />
          <Row label="Units" value={trim(r.units, 0)} />
          <Row label="Pip value on this position" value={money(r.pipValueOnPosition)} />
          <Row label="Actual risk" value={money(r.actualRisk)} />
          <Row label="Actual risk as % of equity" value={`${trim(r.actualPct, 2)}%`} />
          <Row label="Cost ratio" value={`${trim(r.costRatio, 1)}%`} tone={costTone} />
        </dl>
      </div>

      {r.belowMinimum && (
        <div className="callout callout-warn">
          <AlertTriangle size={16} />
          <div>
            The calculated size is below the usual 0.01 lot minimum. Use a different
            instrument, a longer timeframe with a wider stop, or do not take the trade.{' '}
            <strong>Never raise the risk percentage to make a trade fit.</strong>
          </div>
        </div>
      )}

      {r.costRatio >= 25 && !r.belowMinimum && (
        <div className="callout callout-warn">
          <AlertTriangle size={16} />
          <div>
            A cost ratio above 25% means you are fighting the cost structure. The position
            is too small relative to its fixed costs, the stop is too tight, or the account
            is too small for this instrument.
          </div>
        </div>
      )}

      <div className="callout callout-info">
        <Info size={16} />
        <div>
          Size is always rounded <strong>down</strong>. Rounding up breaches the risk limit,
          and a risk limit only works if it is never breached. See{' '}
          <a href="#/m06/01-position-sizing">Module 06.1</a>.
        </div>
      </div>
    </>
  );
}

function Margin() {
  const [balance, setBalance] = useState('5000');
  const [units, setUnits] = useState('100000');
  const [price, setPrice] = useState('1.0900');
  const [leverage, setLeverage] = useState('30');

  const r = useMemo(() => {
    const bal = num(balance);
    const lev = num(leverage, 1);
    const notional = num(units) * num(price);
    const margin = lev > 0 ? notional / lev : 0;
    const effective = bal > 0 ? notional / bal : 0;
    const level = margin > 0 ? (bal / margin) * 100 : 0;
    return {
      notional,
      margin,
      marginPct: lev > 0 ? 100 / lev : 0,
      free: bal - margin,
      effective,
      level,
      wipeout: lev > 0 ? 100 / lev : 0,
    };
  }, [balance, units, price, leverage]);

  const levTone =
    r.effective > 10 ? 'danger' : r.effective > 5 ? 'warn' : r.effective > 0 ? 'ok' : undefined;
  const classification =
    r.effective > 20
      ? 'Ruin is a matter of when'
      : r.effective > 10
        ? 'A single ordinary day can do severe damage'
        : r.effective > 5
          ? 'Aggressive'
          : r.effective > 2
            ? 'Moderate'
            : 'Conservative';

  return (
    <>
      <div className="field-grid">
        <Field label="Account equity" value={balance} onChange={setBalance} />
        <Field label="Units" value={units} onChange={setUnits} hint="1 standard lot = 100,000" />
        <Field label="Price" value={price} onChange={setPrice} />
        <Field label="Leverage (x:1)" value={leverage} onChange={setLeverage} hint="30 majors, 5 shares" />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">Effective leverage</div>
          <div className="result-head-value">{trim(r.effective, 1)} : 1</div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row label="Classification" value={classification} tone={levTone} />
          <Row label="Notional exposure" value={money(r.notional)} />
          <Row label="Margin required" value={money(r.margin)} />
          <Row label="Margin requirement" value={`${trim(r.marginPct, 2)}%`} />
          <Row label="Free margin" value={money(r.free)} tone={r.free < 0 ? 'danger' : undefined} />
          <Row label="Margin level" value={`${trim(r.level, 0)}%`} tone={r.level < 200 ? 'warn' : 'ok'} />
          <Row label="Adverse move that eliminates margin" value={`${trim(r.wipeout, 2)}%`} />
        </dl>
      </div>

      <div className="callout callout-info">
        <Info size={16} />
        <div>
          Leverage does not determine your risk. <strong>Position size does.</strong> The
          leverage setting only caps the size available to you. See{' '}
          <a href="#/m04/01-leverage">Module 04.1</a>.
        </div>
      </div>
    </>
  );
}

function Expectancy() {
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
        <Field label="Win rate %" value={winRate} onChange={setWinRate} />
        <Field label="Average win (R)" value={avgWin} onChange={setAvgWin} />
        <Field label="Average loss (R)" value={avgLoss} onChange={setAvgLoss} hint="Normally about 1" />
        <Field label="Cost per trade (R)" value={cost} onChange={setCost} />
        <Field label="Trades" value={trades} onChange={setTrades} />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">Net expectancy per trade</div>
          <div className="result-head-value">
            {r.net >= 0 ? '+' : ''}
            {trim(r.net, 3)}R
          </div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row
            label="Verdict"
            value={r.viable ? 'Positive after costs' : 'Loses money after costs'}
            tone={r.viable ? 'ok' : 'danger'}
          />
          <Row label="Gross expectancy" value={`${r.gross >= 0 ? '+' : ''}${trim(r.gross, 3)}R`} />
          <Row label="Reward-to-risk" value={`${trim(r.rr, 2)} : 1`} />
          <Row label="Break-even win rate" value={`${trim(r.breakeven, 1)}%`} />
          <Row
            label={`Total over ${trim(num(trades), 0)} trades`}
            value={`${r.over >= 0 ? '+' : ''}${trim(r.over, 1)}R`}
            tone={r.over >= 0 ? 'ok' : 'danger'}
          />
        </dl>
      </div>

      <div className="callout callout-info">
        <Info size={16} />
        <div>
          Win rate alone means nothing. A 90% win rate loses money if the losses are ten
          times the wins. You need 100+ trades before this estimate says anything, and 300+
          to be reasonably confident. See <a href="#/m06/02-expectancy">Module 06.2</a>.
        </div>
      </div>
    </>
  );
}

function Drawdown() {
  const [drawdown, setDrawdown] = useState('30');
  const [riskPct, setRiskPct] = useState('1');
  const [losses, setLosses] = useState('10');

  const r = useMemo(() => {
    const d = Math.min(Math.max(num(drawdown), 0), 99.99) / 100;
    const remainingAfterStreak = Math.pow(1 - num(riskPct) / 100, Math.max(0, num(losses)));
    const streakDd = (1 - remainingAfterStreak) * 100;
    return {
      recovery: (1 / (1 - d) - 1) * 100,
      remainingAfterStreak: remainingAfterStreak * 100,
      streakDd,
      streakRecovery: streakDd < 100 ? (1 / (1 - streakDd / 100) - 1) * 100 : Infinity,
    };
  }, [drawdown, riskPct, losses]);

  const tone = num(drawdown) >= 30 ? 'danger' : num(drawdown) >= 15 ? 'warn' : 'ok';

  return (
    <>
      <div className="field-grid">
        <Field label="Drawdown %" value={drawdown} onChange={setDrawdown} />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">Gain required to recover</div>
          <div className="result-head-value">{trim(r.recovery, 1)}%</div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row
            label="Assessment"
            value={
              num(drawdown) >= 50
                ? 'Recovery requires doubling what remains'
                : num(drawdown) >= 30
                  ? 'Recovery becomes very difficult from here'
                  : 'Recoverable with a working process'
            }
            tone={tone}
          />
        </dl>
      </div>

      <h2 style={{ fontSize: 18, marginTop: 34, marginBottom: 14 }}>Losing streak</h2>

      <div className="field-grid">
        <Field label="Risk per trade %" value={riskPct} onChange={setRiskPct} />
        <Field label="Consecutive losses" value={losses} onChange={setLosses} />
      </div>

      <div className="result">
        <div className="result-head">
          <div className="result-head-label">Account remaining</div>
          <div className="result-head-value">{trim(r.remainingAfterStreak, 1)}%</div>
        </div>
        <dl style={{ margin: 0 }}>
          <Row label="Drawdown from the streak" value={`${trim(r.streakDd, 1)}%`} />
          <Row
            label="Gain needed to recover"
            value={Number.isFinite(r.streakRecovery) ? `${trim(r.streakRecovery, 1)}%` : '—'}
            tone={r.streakDd >= 30 ? 'danger' : r.streakDd >= 15 ? 'warn' : 'ok'}
          />
        </dl>
      </div>

      <div className="callout callout-info">
        <Info size={16} />
        <div>
          At a 45% win rate, a five-loss streak occurs in about 89% of any 100-trade
          sequence. Streaks of ordinary length are not evidence that a strategy has failed.
          See <a href="#/m06/03-drawdown">Module 06.3</a>.
        </div>
      </div>
    </>
  );
}

function Calculator() {
  const [tab, setTab] = useState<Tab>('size');

  return (
    <article className="article">
      <div className="eyebrow">
        <a href="#/">Course</a>
        <span aria-hidden="true">/</span>
        <span>Tools</span>
      </div>

      <h1 className="page-title">Calculator</h1>
      <div className="page-meta">
        The arithmetic from Modules 3, 4 and 6. Work it by hand first &mdash; this is for
        checking, not for replacing.
      </div>

      <div className="calc-tabs" role="tablist" aria-label="Calculator">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`calc-tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'size' && <PositionSize />}
      {tab === 'margin' && <Margin />}
      {tab === 'expectancy' && <Expectancy />}
      {tab === 'drawdown' && <Drawdown />}
    </article>
  );
}

export default Calculator;
