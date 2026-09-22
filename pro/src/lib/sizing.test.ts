import { describe, expect, it } from 'vitest';
import { sizePosition, stopDistance } from '@course/lib/sizing';

/**
 * Tests for the position-size calculation the course teaches and both apps run.
 * Every expected figure is worked by hand in the comment beside it.
 */

describe('sizePosition', () => {
  it('matches the course worked example', () => {
    // 5000 x 1% = 50 at risk. 35 pips x 10 per pip = 350 per lot.
    // 50 / 350 = 0.1428… -> rounds down to 0.14. Actual risk 0.14 x 350 = 49.
    const r = sizePosition({ balance: 5000, riskPct: 1, stopPips: 35, pipValue: 10 });
    expect(r.risk).toBe(50);
    expect(r.lots).toBe(0.14);
    expect(r.actualRisk).toBeCloseTo(49, 9);
    expect(r.units).toBeCloseTo(14000, 6);
  });

  it('keeps an exact answer exact instead of losing a step to float error', () => {
    // 29 / (10 x 10) = 0.29 exactly. In binary 0.29 / 0.01 = 28.999999999999996,
    // which a bare floor turned into 0.28.
    expect(sizePosition({ balance: 2900, riskPct: 1, stopPips: 10, pipValue: 10 }).lots).toBe(0.29);
    expect(sizePosition({ balance: 5700, riskPct: 1, stopPips: 10, pipValue: 10 }).lots).toBe(0.57);
    expect(sizePosition({ balance: 11500, riskPct: 1, stopPips: 10, pipValue: 10 }).lots).toBe(1.15);
  });

  it('never returns a size whose risk exceeds the budget, for any clean case', () => {
    // Every exact multiple of 0.01 from 0.01 to 5.00: the size must equal the
    // exact figure, and its risk must never be above the budget.
    for (let cents = 1; cents <= 500; cents++) {
      // Risk `cents` money units (1% of cents x 100). The stop costs 10 pips x
      // 10 per pip = 100 per lot, so the exact size is cents / 100 lots.
      const r = sizePosition({ balance: cents * 100, riskPct: 1, stopPips: 10, pipValue: 10 });
      expect(r.lots).toBeCloseTo(cents / 100, 9);
      expect(r.actualRisk).toBeLessThanOrEqual(r.risk + 1e-9);
    }
  });

  it('rounds a genuine fraction down, not to nearest', () => {
    // 50 / (30 x 10) = 0.1666… -> 0.16, not 0.17. Rounding up would risk 51.
    const r = sizePosition({ balance: 5000, riskPct: 1, stopPips: 30, pipValue: 10 });
    expect(r.lots).toBe(0.16);
    expect(r.actualRisk).toBeLessThanOrEqual(r.risk);
  });

  it('reports a stop too wide to size rather than returning a size', () => {
    // 50 / (9000 x 10) = 0.00055… -> below the 0.01 minimum.
    const r = sizePosition({ balance: 5000, riskPct: 1, stopPips: 9000, pipValue: 10 });
    expect(r.lots).toBe(0);
    expect(r.belowMinimum).toBe(true);
  });

  it('returns nothing for invalid input instead of dividing by zero', () => {
    for (const bad of [
      { balance: 5000, riskPct: 1, stopPips: 0, pipValue: 10 },
      { balance: 5000, riskPct: 1, stopPips: 35, pipValue: 0 },
      { balance: 0, riskPct: 1, stopPips: 35, pipValue: 10 },
      { balance: 5000, riskPct: 0, stopPips: 35, pipValue: 10 },
    ]) {
      const r = sizePosition(bad);
      expect(r.lots).toBe(0);
      expect(r.belowMinimum).toBe(false);
      expect(Number.isFinite(r.actualPct)).toBe(true);
    }
  });

  it('computes cost as a share of the money actually at risk', () => {
    // 49 at risk (the worked example), 2.5 round-trip: 2.5 / 49 = 5.10%.
    const r = sizePosition({ balance: 5000, riskPct: 1, stopPips: 35, pipValue: 10, cost: 2.5 });
    expect(r.costRatio).toBeCloseTo(5.102, 3);
  });
});

describe('stopDistance', () => {
  it('measures a standard pair in pips', () => {
    // 1.0880 - 1.0845 = 0.0035 = 35 pips of 0.0001.
    expect(stopDistance(1.088, 1.0845, 0.0001)).toBeCloseTo(35, 9);
  });

  it('measures a JPY pair in its 0.01 pips', () => {
    // 150.20 - 149.85 = 0.35 = 35 pips of 0.01.
    expect(stopDistance(150.2, 149.85, 0.01)).toBeCloseTo(35, 9);
  });

  it('is the same for a short, where the stop sits above entry', () => {
    expect(stopDistance(1.0845, 1.088, 0.0001)).toBeCloseTo(35, 9);
  });

  it('returns zero rather than infinity for a zero pip size', () => {
    expect(stopDistance(1.088, 1.0845, 0)).toBe(0);
  });
});
