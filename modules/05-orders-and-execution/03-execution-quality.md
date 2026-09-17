# 05.3 — Slippage, Gaps and Rejections

The gap between the price on your screen and the price in your statement. It is small in
normal conditions, large in the conditions you care about, and it is asymmetric.

## Slippage

**Slippage** is the difference between the expected price of an order and the price at
which it actually fills.

It can be **positive** (a better fill) or **negative** (worse). Brokers with symmetric
execution pass both on. Some pass on only the negative, which is worth checking in the
execution policy.

### Why it happens

1. **Price moved** between your click and the broker's execution. Latency is tens to
   hundreds of milliseconds, and in a fast market that is enough.
2. **Insufficient size at the best price.** Your order walks the book. Rare at retail
   size, common in thin conditions.
3. **Spread widened** between your decision and execution.
4. **A gap** — no price existed at your level.

### When it is worst

The pattern is reliable and it is the same list as spread widening, because they share a
cause:

| Condition | Typical slippage |
|---|---|
| Liquid session, normal conditions | 0 to 0.5 pips |
| Session open | 1 to 3 pips |
| Scheduled data release | 5 to 50+ pips |
| Unscheduled news | Unbounded |
| Weekend gap | Unbounded |
| Illiquid instrument, any time | Persistently poor |

### The asymmetry

In a fast market, slippage is **systematically against you**, and the mechanism is
structural rather than malicious.

When price is moving down hard and your sell stop triggers, everyone else's sell stops are
triggering too. Every one of you is a seller into the same thin bid. There is no
corresponding rush of buyers. The fills are worse than the trigger price for everybody.

This is why **stop losses slip more than take profits**. A take profit is a limit order:
it fills at your price or better, or not at all. A stop loss is a market order in exactly
the conditions where market orders fill badly. Your losses are systematically larger than
planned and your wins are not systematically larger than planned.

Build that asymmetry into your expectations. If you model a strategy assuming stops fill
at your price, you are modelling a better strategy than the one you have.

## Requotes

Mostly historical, but still present on some dealing-desk platforms. You click, and
instead of a fill you are offered a new price to accept or reject.

Frequent requotes, particularly ones that are always worse and always arrive when you are
trying to close a profitable position, are a sign of a broker you should leave.

## Rejections

Your order does not execute at all. Common reasons:

- **Insufficient margin.** Free margin does not cover the requirement.
- **Market closed.** Instrument outside trading hours.
- **Invalid price.** Stop or limit placed on the wrong side of the market, or inside the
  broker's minimum distance.
- **Size limits.** Below minimum or above maximum.
- **Instrument restricted.** Some brokers restrict opening new positions in specific
  instruments around events, or close-only during extreme conditions.

The dangerous one is the last. During genuine market stress, some instruments go
**close-only**, meaning you cannot open new positions. If your plan relies on hedging an
existing position during a crisis, it may not be executable at the moment you need it.

## Minimum stop distance

Brokers enforce a minimum distance between the current price and any stop or limit order,
typically a few pips on majors and wider on volatile instruments. It exists to prevent
orders being placed inside the spread.

Two practical effects. Placing a stop very close to the market may be rejected. And
minimum distances are often **widened during volatile conditions**, which can prevent you
tightening a stop exactly when you want to.

## Execution models

Worth understanding because it determines whose interest your fill serves.

**Dealing desk / market maker.** The broker quotes its own prices and is the counterparty.
Fills come from the broker. Possible conflicts: requotes, asymmetric slippage, widened
spreads at inconvenient moments.

**STP (straight through processing).** Orders passed to liquidity providers. The broker
earns spread markup or commission. Less conflict.

**ECN.** Orders placed into a pool where multiple providers compete. Raw spreads,
commission-based, generally the best execution available at retail.

Most retail CFD brokers are hybrids. The execution policy document is legally required to
describe the model; it is dry, usually short, and almost never read.

## Measuring your own execution

Do not trust marketing. Measure it.

For twenty demo or live trades, record:

| Field | Note |
|---|---|
| Intended price | The price when you clicked |
| Fill price | From the statement |
| Slippage | Difference, signed |
| Time of day | |
| Was news scheduled within 5 minutes? | |
| Order type | |

Then compute: average slippage on entries, average slippage on stop losses, percentage of
fills with **positive** slippage, and worst single slippage.

What the results tell you:

- **Positive slippage should be roughly as common as negative** in normal conditions. If
  it essentially never happens, execution is asymmetric and that is a cost.
- **Average stop loss slippage** should be added to your assumed risk per trade. If it is
  2 pips, your 25-pip stop is a 27-pip stop in expectation.
- **Concentration around news** tells you whether your trading times need to change.

This exercise takes twenty minutes and almost nobody does it. It is one of the few places
where a small amount of measurement produces a directly actionable number.

## Reducing the damage

1. **Avoid market orders around scheduled news.** The economic calendar is free. Check it
   before entering.
2. **Use limit orders for entries** where your strategy allows. You give up certainty of
   execution for certainty of price, and for entries that is usually the right trade.
3. **Trade liquid instruments** during liquid sessions. Most slippage is a liquidity
   problem.
4. **Size so that slippage is survivable.** If 5 pips of slippage on a 20-pip stop
   materially changes your risk, your position is too large.
5. **Add expected slippage to your risk calculation.** Use your measured average, not zero.
6. **Consider guaranteed stops** where gap risk is the dominant concern.

## Key points

- Slippage is the gap between expected and actual fill price
- It is systematically against you in fast markets, because everyone's stops trigger together
- Stop losses slip; take profits do not, because one is a market order and the other a limit
- Rejections during stress can include close-only restrictions on whole instruments
- Minimum stop distances widen exactly when you want to tighten a stop
- Measure your own slippage over twenty trades and add the average to your risk model

## Exercise 05.3

**(a)** Explain in two sentences why a stop loss slips more than a take profit.

**(b)** Your average measured stop slippage is 2.5 pips. Your strategy uses a 20-pip stop
and you risk 1% of a $4,000 account per trade. What is your actual average risk per trade
in dollars and as a percentage? How should position sizing change to bring true risk back
to 1%?

**(c)** On demo, place a market order five minutes before a high-impact release and
another during a quiet period, same size and instrument. Record intended price, fill and
slippage for each. Note that demo slippage understates live slippage, and state why that
matters for interpreting your result.

**(d)** Find your broker's order execution policy. Record: execution model, whether
positive slippage is passed on, minimum stop distances on your instrument, and the
circumstances under which instruments go close-only.

**(e)** Run the twenty-trade execution measurement described above on your demo account.
Report the four summary statistics and state what, if anything, you will change.

---

Next: [05.4 — Managing a position](04-position-management.md)
