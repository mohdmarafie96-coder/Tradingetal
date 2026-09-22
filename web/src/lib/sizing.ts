/**
 * Position sizing — the one calculation the course is built around.
 *
 * It lives here rather than inside the calculator screen because the home page
 * now runs it too. Two copies of this arithmetic would eventually disagree, and
 * the number a visitor is shown before signing up has to be the same number the
 * course teaches them to work out by hand.
 */

export interface SizingInput {
  /** Account equity in the account currency. */
  balance: number;
  /** Percentage of equity to put at risk on the trade. */
  riskPct: number;
  /** Distance from entry to stop, in pips. */
  stopPips: number;
  /** Money per pip for one standard lot — 10 for USD-quoted FX. */
  pipValue: number;
  /** Spread plus commission for the round trip. Optional: the home page omits it. */
  cost?: number;
}

export interface Sizing {
  /** What the risk percentage comes to in money. */
  risk: number;
  stopPips: number;
  /** Rounded down to the broker's 0.01 lot step — never up. */
  lots: number;
  units: number;
  pipValueOnPosition: number;
  /** What the rounded position actually risks, which is at or below the budget. */
  actualRisk: number;
  actualPct: number;
  /** Round-trip cost as a share of the money at risk. */
  costRatio: number;
  /** The position rounds to nothing: the stop is too wide for this equity. */
  belowMinimum: boolean;
}

/** Units in one standard lot. */
const LOT = 100_000;

/** The smallest increment brokers deal in. */
const LOT_STEP = 0.01;

export function sizePosition({
  balance,
  riskPct,
  stopPips,
  pipValue,
  cost = 0,
}: SizingInput): Sizing {
  const risk = balance * (riskPct / 100);
  const valid = stopPips > 0 && pipValue > 0 && risk > 0;

  const exactLots = valid ? risk / (stopPips * pipValue) : 0;

  // Rounded down, always. Rounding up would quietly push the trade past the
  // risk budget the trader just set, which is the whole point of the exercise.
  //
  // The epsilon is not optional. In binary floating point 0.29 / 0.01 is
  // 28.999999999999996, so a bare floor turns an exact 0.29 lots into 0.28 —
  // one step in eight of the clean answers between 0.01 and 5.00 came out a
  // step short of the figure the course teaches students to work by hand.
  // 1e-9 of a step is far below anything a broker can deal in, so it rescues
  // exact multiples without ever rounding a genuine fraction up.
  const lots = valid
    ? Math.round(Math.floor(exactLots / LOT_STEP + 1e-9) * LOT_STEP * 100) / 100
    : 0;

  const actualRisk = lots * stopPips * pipValue;

  return {
    risk,
    stopPips,
    lots,
    units: lots * LOT,
    pipValueOnPosition: lots * pipValue,
    actualRisk,
    actualPct: balance > 0 ? (actualRisk / balance) * 100 : 0,
    costRatio: actualRisk > 0 ? (cost / actualRisk) * 100 : 0,
    belowMinimum: valid && lots < LOT_STEP,
  };
}

/** Pips between two prices, given the instrument's pip size. */
export function stopDistance(entry: number, stop: number, pipSize: number): number {
  return pipSize > 0 ? Math.abs(entry - stop) / pipSize : 0;
}
