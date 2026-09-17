# 06.1 — Position Sizing

## The order of operations

Almost every beginner does this:

1. Decide to trade
2. Pick a position size that "feels about right", or that the margin allows
3. Place a stop somewhere
4. Discover afterwards what the loss would be

This is backwards, and reversing it is the single highest-value change available to you:

1. Decide the **maximum loss** you accept on this trade, in currency
2. Determine where the stop belongs, from **structure and volatility**
3. **Calculate** the position size that makes those two consistent
4. If the result is below the minimum trade size, **do not take the trade**

Step 4 is the one people skip, and skipping it is how a risk rule gets quietly abandoned.

## The formula

> **Position size (units) = risk budget / (stop distance × value per point per unit)**

For FX, "value per point per unit" is simply the pip size:

> **Units = risk budget / (stop distance in pips × pip size)**

### Worked example

$5,000 account. Risk 1% = $50. EUR/USD, entry 1.0880, structural stop at 1.0845.

```
Stop distance = 1.0880 − 1.0845 = 0.0035 = 35 pips
Units = 50 / (35 × 0.0001) = 50 / 0.0035 = 14,286 units
Round down to the platform step: 0.14 lots (14,000 units)
Actual risk = 35 pips × $1.40 per pip = $49.00 (0.98%)
```

**Always round down.** Rounding up breaches your risk limit, and the limit only works if
it is never breached.

### Non-FX instruments

Same formula, different point value.

**Index.** $8,000 account, risk 1% = $80. US 500 entry 5,150, stop 5,118. Point value $1
per CFD.

```
Stop distance = 32 points
Size = 80 / (32 × 1) = 2.5 CFDs → round down to 2 CFDs
Actual risk = 32 × 2 = $64 (0.8%)
```

**Share.** $12,000 account, risk 1% = $120. Entry $47.20, stop $45.10.

```
Stop distance = $2.10
Size = 120 / 2.10 = 57.1 → 57 CFDs
Actual risk = 2.10 × 57 = $119.70 (1.0%)
Notional = 57 × 47.20 = $2,690; margin at 20% = $538
```

**Gold.** $6,000 account, risk 1% = $60. Entry $2,395, stop $2,381. Contract 100 oz.

```
Stop distance = $14.00
Ounces = 60 / 14 = 4.29 oz → 4 oz = 0.04 lots
Actual risk = 14 × 4 = $56 (0.93%)
```

## Choosing the risk percentage

| Risk per trade | Assessment |
|---|---|
| 0.25% – 0.5% | Conservative. Correct while learning. |
| 1% | The standard reference point. Reasonable for an established, tested plan. |
| 2% | Aggressive. A 10-loss streak costs 18% of the account. |
| 3% – 5% | A losing streak of ordinary length is severely damaging. |
| Over 5% | Ruin is a matter of time, not of skill. |

**Recommendation for this course: 0.5% while learning, never above 1%.**

The arithmetic behind the recommendation, using Module 06.3's material: at a 45% win rate,
an eight-trade losing streak has roughly a 30% chance of occurring within any 100 trades,
and a five-trade streak is close to certain. These are not tail events. They are what a
perfectly healthy strategy does on the way to making money.

| Risk per trade | Account after 10 consecutive losses | Gain needed to recover |
|---|---|---|
| 0.5% | 95.1% | 5.1% |
| 1% | 90.4% | 10.6% |
| 2% | 81.7% | 22.4% |
| 5% | 59.9% | 67.0% |
| 10% | 34.9% | 186.6% |

At 1%, a ten-loss streak is an inconvenience you trade through. At 5%, it is an
account-threatening event requiring a 67% gain to undo. At 10%, it is effectively fatal.

The difference between these rows is not skill, analysis, or market conditions. It is one
number chosen before any trading occurred.

## Fixed fractional sizing

Risk a **fixed percentage of current equity**, recalculated each trade.

$10,000 at 1% risks $100. After losing to $9,000, 1% risks $90. After growing to $12,000,
$120.

Properties, and both matter:

- **Position size shrinks automatically in a drawdown**, which slows the decline. This is
  the mechanism that makes ruin asymptotically unreachable.
- **Position size grows in an uptrend**, compounding gains.

This is the default recommendation. Use current equity, not the starting balance, and not
the high-water mark.

## Fixed monetary sizing

Risk a fixed currency amount regardless of balance: always $50.

Simpler, and appropriate for small accounts where percentage sizing produces amounts below
the minimum trade size. Its weakness is that it does not de-risk in a drawdown: as the
account falls, $50 becomes a progressively larger fraction, accelerating the decline
exactly when you want it slowed.

If you use it, review the amount monthly and reduce it after a drawdown.

## What not to do

**Sizing by margin.** "I have $2,000 free margin, so I'll open the largest position it
allows." Margin has no relationship to risk. This is how accounts are destroyed, and it is
the default behaviour of the platform interface, which shows you maximum size rather than
appropriate size.

**Sizing by conviction.** "I'm very confident, so I'll go bigger." Confidence is not
calibrated. The trades people feel most certain about are not measurably more likely to
win, and doubling down on conviction concentrates losses in your most emotionally invested
positions. If you want to vary size by setup quality, do it with tested statistics on
setup grades, not with feelings.

**Sizing by recent results.** Increasing after wins is chasing; increasing after losses to
"make it back" is martingale, and martingale ends in ruin with certainty given a finite
bankroll. Both are emotional responses wearing the costume of a system.

**Round-number sizing.** "I'll do 1 lot" bears no relation to your stop distance or your
account. The size should be a calculated output, and it will rarely be a round number.

## The small account problem

$500 account, 1% risk = $5. EUR/USD with a 30-pip stop:

```
Units = 5 / (30 × 0.0001) = 1,667 units = 0.017 lots
```

Minimum size is typically 0.01 lots, so 0.01 is available. Risk = 30 × $0.10 = $3.00
(0.6%). Workable, though the round-trip cost of roughly $0.30 is 10% of the risk.

Now a 12-pip stop on a scalping strategy:

```
Units = 5 / (12 × 0.0001) = 4,167 units = 0.042 lots → 0.04 lots
Risk = 12 × $0.40 = $4.80. Fine.
But round-trip cost ≈ $1.20, which is 25% of risk.
```

And on an index where the minimum is 1 CFD with a 30-point stop, minimum risk is $30 —
**6% of a $500 account**. That instrument is simply unavailable to you at responsible
sizing.

**When correct sizing is impossible, the answer is one of:**

- Choose a different instrument with a smaller minimum
- Use a wider stop on a longer timeframe, which reduces size for the same risk
- Trade less frequently so costs matter less
- Add capital
- Do not trade

**Never:** increase the risk percentage to make the trade fit. That converts a
constraint-driven problem into an account-destroying one, and it is exactly how the risk
rule gets abandoned in practice. The rule is not that you risk 1%; it is that you never
risk more than 1%, which sometimes means not trading.

## Using the calculator

```bash
python3 tools/cfd_calc.py position-size \
    --balance 5000 --risk-pct 1 \
    --entry 1.0880 --stop 1.0845 \
    --pip-size 0.0001 --pip-value-per-lot 10
```

Do the arithmetic yourself first. The tool is a check, not a substitute — in live trading
you need to recognise immediately when a size is wrong, and that recognition only comes
from having done it by hand many times.

## Key points

- Risk budget and stop distance determine position size; never the reverse
- Units = risk / (stop distance × value per point per unit)
- Always round down
- 0.5% while learning, never above 1%
- Fixed fractional sizing on current equity de-risks automatically in a drawdown
- Never size by available margin, conviction, or recent results
- When minimum size makes correct risk impossible, the trade is unavailable, not the rule

## Exercise 06.1

Calculate position size, in lots or CFDs, rounded down.

**(a)** $3,000 account, 1% risk, EUR/USD entry 1.0920, stop 1.0885
**(b)** $7,500 account, 0.5% risk, GBP/USD entry 1.2740, stop 1.2805 (a short)
**(c)** $10,000 account, 1% risk, US 500 entry 5,180, stop 5,142, $1 per point
**(d)** $25,000 account, 0.75% risk, share entry $118.40, stop $113.90
**(e)** $4,000 account, 1% risk, gold entry $2,402, stop $2,378, 100 oz per lot
**(f)** $1,200 account, 1% risk, EUR/USD entry 1.0900, stop 1.0885

For (f), state the actual risk achieved and the cost ratio at a 1.2 pip spread. Is the
trade worth taking?

**(g)** Your account is $2,000 and you want to trade an index with a minimum size of 1 CFD
at $1 per point. Your strategy uses a 45-point stop. What is the minimum risk you can
take, in dollars and as a percentage? What are your options?

**(h)** Build a sizing table for your own account: for stop distances of 10, 20, 30, 50
and 80 pips on your chosen instrument, state the position size at your chosen risk
percentage. Keep it next to your screen. Most sizing errors happen under time pressure,
and a lookup table removes the arithmetic from the moment of decision.

---

Next: [06.2 — Risk-reward and expectancy](02-expectancy.md)
