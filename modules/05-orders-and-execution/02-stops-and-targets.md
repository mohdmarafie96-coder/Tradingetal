# 05.2 — Stops, Targets and Trailing Stops

## The stop loss

A stop loss is an order to close your position if price reaches a level that means you
were wrong.

That definition contains the whole discipline. **A stop is placed where your reason for
being in the trade stops being true**, not where the loss reaches an amount you find
uncomfortable. Those are different places, and the difference is most of what separates a
plan from a hope.

### What it guarantees and what it does not

**Guarantees:** the position will be closed once the level trades.

**Does not guarantee:** the price. Once triggered, it becomes a market order. In a gap or
a fast market, the fill can be far worse. Module 04.4 covered the extreme case.

### Which price triggers it

This catches people, and the arithmetic is simple once seen.

| Position | Closed by | Triggers off the |
|---|---|---|
| Long | Selling | **Bid** |
| Short | Buying | **Ask** |

So a long position's stop triggers when the **bid** reaches your level, and a short's when
the **ask** does.

**Consequence: a spread widening can trigger your stop with no change in the mid price at
all.**

Long EUR/USD with a stop at 1.0840. Normal spread 1.2 pips:

| | Bid | Ask | Mid | Stop triggered? |
|---|---|---|---|---|
| Normal | 1.08412 | 1.08424 | 1.08418 | No |
| Spread widens to 8 pips, mid unchanged | 1.08378 | 1.08458 | 1.08418 | **Yes** |

The mid price never reached your stop. The bid did, because the spread expanded around it.
This is a real and common occurrence around news and at the daily rollover.

**Practical implication:** do not place stops a tiny distance beyond an obvious level, and
avoid holding tight stops through scheduled news unless you accept this outcome.

### Where to place a stop

Four approaches, in rough order of quality:

**1. Structural.** Beyond the level that invalidates your thesis: below the swing low for
a long, above the swing high for a short, beyond a trendline or range boundary. This is
the right default, because it is tied to your actual reason for the trade.

**2. Volatility-based.** A multiple of Average True Range, typically 1.5 to 3 ATR. This
adapts automatically to conditions, so the same rule gives a 20-pip stop in quiet markets
and a 70-pip stop in volatile ones. Combine with structural: place it at the structural
level, then check it is at least 1.5 ATR away.

**3. Time-based.** Exit if the trade has not worked within a defined period. Useful as a
supplement, since a trade that does nothing is consuming margin and financing.

**4. Fixed distance.** Always 20 pips. Simple, and wrong: it ignores both structure and
volatility, so it is too tight in fast markets and too loose in slow ones. Acceptable only
as a placeholder while learning.

**Never:** a stop placed to make the loss a round number you are comfortable with. That is
sizing the stop to the position instead of sizing the position to the stop, which is
backwards. Module 6 fixes the order of operations.

### Stop hunting

Traders often believe brokers deliberately trigger their stops. The reality is more
mundane and more useful.

Stops cluster at obvious levels: just below round numbers, just below yesterday's low,
just beyond the day's range. Everyone reads the same chart. When price reaches those
clusters, the triggered stops themselves generate a burst of orders, which pushes price
slightly further, which triggers more. The move overshoots, then reverts.

No manipulation is required to explain this. It is the mechanical result of predictable
order placement. Larger participants are aware of where the clusters sit, and that
awareness influences behaviour, but the clustering is the primary cause.

**The practical response:** do not place stops where everyone else places theirs. If the
obvious level is 1.0800, a stop at 1.0798 sits inside the cluster. Give it room — beyond
the noise, not adjacent to it — and size down to keep your risk constant.

### Guaranteed stop losses

A GSL is honoured at your exact price regardless of gaps or slippage. The broker absorbs
the difference.

- **Cost:** a premium, charged either up front or only if triggered
- **Restrictions:** minimum distance from market, not available on all instruments, and
  sometimes withdrawn before major events
- **Worth it:** overnight share positions, holding through earnings or a binary event, and
  any position where a gap would do serious damage

Price it before dismissing it. For a share CFD held through earnings, a GSL premium is
usually a small fraction of the gap risk it removes.

## The take profit

A limit order closing your position at a target.

The argument for using one: it removes an in-the-moment decision at the exact point where
greed is loudest. The argument against: it caps a winner that might have run much further,
and large winners are where a positive expectancy usually comes from.

A reasonable middle path is **partial exits**: close half at the first target, move the
stop to break-even, let the remainder run with a trailing stop. You bank something, you
remove the risk, and you keep exposure to the tail.

### Setting targets

**Structural.** The next resistance for a long, support for a short. Most defensible.

**Measured move.** Project the size of a prior leg or pattern from the breakout point.

**Risk multiple.** Target 2R or 3R, where R is your risk. Simple and useful for planning,
but it ignores what is actually in the way. A 3R target with a wall of resistance at 1.5R
is not a plan.

**Volatility-based.** A multiple of ATR, so targets scale with conditions.

Whatever the method, **the reward-to-risk ratio must be computed before entry.** If the
nearest sensible target is closer than your stop, the trade needs a very high win rate to
be worth taking, and you should know that before clicking rather than after.

## Trailing stops

A stop that follows price in your favour and never moves against you.

Long at 1.0850 with a 30-pip trail:

| Price | Trailing stop | Note |
|---|---|---|
| 1.0850 | 1.0820 | Initial |
| 1.0880 | 1.0850 | Moved up, now at break-even |
| 1.0910 | 1.0880 | Locking in 30 pips |
| 1.0895 | 1.0880 | **Does not move down** |
| 1.0880 | 1.0880 | Triggered, +30 pips |

### The trade-off

**For:** locks in profit automatically, removes the decision to exit, and lets a strong
trend run indefinitely.

**Against:** a trail tight enough to protect profit is usually tight enough to be hit by
ordinary noise. In a choppy market a trailing stop converts a series of decent winners
into a series of scratches.

**Sizing the trail.** Use ATR, not a fixed number. A trail of 2 to 3 ATR on your trading
timeframe gives price room to breathe while still protecting a meaningful move. A trail
tighter than 1 ATR will be hit by normal fluctuation almost every time.

### Break-even stops

Moving the stop to entry once the trade is profitable by some amount, often 1R.

**For:** removes the risk of the position entirely.

**Against:** break-even is not a meaningful price to the market; it is meaningful only to
you. Moving a stop there often places it inside the noise band, and the result is a
scratch on a trade that would have worked. Many traders move to break-even far too early
and systematically destroy their own winners.

If you use it, wait until the trade has moved a genuine multiple of its risk — 1.5R or
more — and place the stop just beyond a structural level near entry rather than exactly at
entry.

## Never widen a stop

This is the one rule with no exceptions.

Moving a stop further away because price is approaching it is not risk management. It is
the refusal to accept a loss, and it converts a defined, planned, survivable loss into an
undefined one. Every account destroyed by a single trade involved a stop that was moved.

**Stops move in one direction only: toward profit.**

If you find yourself wanting to widen a stop, the information you are acting on is
emotional, not analytical. The trade is at the level where you said you would be wrong.
You are wrong. Take it.

## Key points

- A stop goes where your thesis is invalidated, not where the loss feels bad
- A long's stop triggers off the bid, a short's off the ask; spread widening alone can
  trigger a stop
- Structural and volatility-based placement beat fixed distances
- Stop clusters at obvious levels produce overshoot without any manipulation
- Guaranteed stops remove gap risk for a premium and are worth pricing
- Trailing stops need ATR-based room or they convert winners into scratches
- Break-even stops moved too early destroy good trades
- Never widen a stop

## Exercise 05.2

**(a)** Long EUR/USD at 1.0900 with a stop at 1.0860. The bid is 1.08615 and the spread
widens from 1.2 to 6 pips with the mid unchanged. Is your stop triggered? Show the
arithmetic.

**(b)** For your chosen instrument, calculate the 14-period ATR on your trading timeframe.
Propose a structural stop for a recent setup, then check whether it is at least 1.5 ATR
from entry. If not, what should change: the stop, the entry, or the position size?

**(c)** A trade has a 25-pip stop and the nearest structural target is 20 pips away. State
the reward-to-risk ratio and the minimum win rate required to break even, ignoring costs.
Then recompute including a 1.5-pip round-trip cost. Would you take this trade?

**(d)** Take ten recent trades from your demo journal. For each, record where a 1 ATR
trailing stop, a 2 ATR trailing stop, and a fixed target at 2R would have exited. Compare
the total outcomes. Which performed best on your instrument, and does the sample size
justify any conclusion?

**(e)** Write down, in one sentence, what you will do the next time you want to widen a
stop. Put it somewhere you will see it while trading.

---

Next: [05.3 — Slippage, gaps and rejections](03-execution-quality.md)
