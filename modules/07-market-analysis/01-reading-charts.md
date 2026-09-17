# 07.1 — Reading a Chart

## What a chart is

A price chart is a record of transactions over time. That is all it is. It contains no
information about the future, and every pattern in it is a description of what has already
happened.

This matters because the language of technical analysis constantly implies otherwise:
support "holds", a level "rejects" price, a pattern "signals" a move. These are compact
descriptions of past behaviour, not forces acting on the market. Keeping that distinction
clear is what separates useful chart reading from superstition.

## Candlesticks

The standard representation. Each candle summarises one period.

```
        │  ← high (upper wick)
      ┌─┴─┐
      │   │  ← body: open to close
      │   │
      └─┬─┘
        │  ← low (lower wick)
```

Four values per candle: **open, high, low, close**.

- **Bullish candle** (usually green or hollow): close above open
- **Bearish candle** (usually red or filled): close below open
- **Body** length: the net movement over the period
- **Wicks**: the extremes reached but not held

A candle with a long upper wick and small body says price rose during the period and was
pushed back down before it ended. That is a description, not a prediction, and it is
worth stating that explicitly because a great deal of candlestick teaching blurs the two.

### Candlestick patterns

You will encounter dozens: doji, hammer, engulfing, morning star, three black crows. Each
has a story attached about what buyers and sellers were doing.

The honest assessment: **individual candlestick patterns have weak and inconsistent
predictive power in isolation.** Studies that test them systematically generally find
small effects that do not survive transaction costs.

What is more defensible is **context**: a long lower wick at a level that has mattered
before, in a market that has been trending up, during a liquid session, is more meaningful
than the same candle appearing at random. The candle is not the signal. The confluence of
the candle with location and condition is what you would test.

Use them as one input. Do not build a strategy on them alone.

## Other chart types

**Line chart.** Closing prices joined. Strips out noise, useful for seeing overall
direction and for drawing long-term levels.

**Bar (OHLC) chart.** Same four values as a candle, different visual. Common in the US.

**Heikin-Ashi.** Smoothed candles using averaged values. Makes trends look cleaner. The
critical caveat: **the prices shown are not real prices.** You cannot enter or exit at a
Heikin-Ashi value. Useful for visual trend assessment, dangerous for placing orders.

**Renko, point-and-figure, range bars.** Remove or alter the time axis. Specialised; not
needed for this course.

Stay with standard candlesticks while learning.

## Timeframes

Each candle represents a fixed period. Common ones: M1, M5, M15, M30, H1, H4, D1, W1, MN.

### Choosing one

Your timeframe must be consistent with three things: your holding period, your stop
distance, and the time you can actually spend watching.

| Timeframe | Typical hold | Typical stop | Attention required |
|---|---|---|---|
| M1 – M5 | Minutes | 5 – 15 pips | Constant |
| M15 – M30 | Hours | 15 – 30 pips | Frequent |
| H1 – H4 | Hours to days | 30 – 80 pips | A few checks daily |
| D1 | Days to weeks | 80 – 200 pips | Once daily |
| W1 | Weeks to months | 200+ pips | Weekly |

**Recommendation for beginners: H4 or D1.**

The reasons are practical rather than aesthetic:

- **Costs matter less.** A 1.5-pip spread against a 100-pip stop is 1.5% of risk. Against
  a 10-pip stop it is 15%. Lower timeframes are dominated by costs.
- **Fewer decisions.** Fewer opportunities to make an emotional error.
- **Compatible with a job.** You can check a daily chart in ten minutes each evening.
- **Noise is lower.** Much of what appears on an M5 chart is spread, liquidity gaps and
  order flow that has no informational content at all.

Lower timeframes are not more advanced. They are harder, more expensive, and more
punishing of small errors. Beginners gravitate to them because they offer more action and
faster feedback, which are the two properties least helpful to learning.

### Multiple timeframe analysis

Standard practice is three timeframes:

1. **Higher** (4x to 6x your trading timeframe) — overall direction and context
2. **Trading** — where you identify setups and place orders
3. **Lower** (1/4 of trading) — entry timing, optional

Trading H4? Check D1 for direction, H4 for the setup, H1 for entry timing.

The rule that makes this useful: **do not take trades against the higher timeframe
direction while learning.** It halves your opportunities and removes a large fraction of
your worst trades.

## Reading a chart systematically

A repeatable routine, in order. Order matters: forming a directional opinion before
looking at structure is how you end up seeing what you wanted to see.

1. **Zoom out first.** Look at the weekly and daily before anything shorter. Where is
   price in its longer-term range?
2. **Identify the condition.** Trending or ranging? (Lesson 07.2.)
3. **Mark the obvious levels.** Prior highs and lows, round numbers, the levels that have
   clearly mattered.
4. **Note the volatility.** What is the current ATR versus its recent average? This sets
   your stop distances.
5. **Check the calendar.** Any scheduled events before your intended exit?
6. **Only now** form a view, and write it as a falsifiable statement: "I expect price to
   rise to X; I am wrong if it trades below Y."

That last step is the discipline. A view that cannot be wrong is not a view.

## What charts cannot tell you

- **The future.** Every pattern is a description of the past.
- **Why price moved.** Charts show the result of decisions, never the reasons.
- **What others will do.** Patterns are widely known, which changes how they behave.
- **Whether a pattern is real.** Random walks produce convincing head-and-shoulders
  patterns, trendlines and support levels. Humans are extraordinarily good at finding
  structure in noise, and there is no visual test that distinguishes the two.

That last point is worth dwelling on. Generate a few hundred random price series and you
will find textbook patterns in most of them, some of which will be followed by the
"expected" move purely by chance. Your eye cannot tell the difference. Only out-of-sample
testing can, which is Module 08.

## Key points

- A chart records transactions; it contains no information about the future
- Candles show open, high, low and close; patterns are weak signals without context
- Heikin-Ashi prices are not tradable prices
- H4 or D1 suits beginners: lower costs, fewer decisions, less noise
- Use three timeframes and avoid trading against the higher one while learning
- Follow a fixed reading routine, and state your view in falsifiable terms
- Random data produces convincing patterns; only testing separates signal from noise

## Exercise 07.1

**(a)** Open a daily chart of your instrument. For the last ten candles, write down open,
high, low, close, and describe each in one sentence without interpretation.

**(b)** Apply the six-step reading routine to your instrument. Write the output, ending
with a falsifiable statement of your view.

**(c)** View the same 20-day period on D1, H4 and M15. Note how many potential setups you
see on each, and estimate the total round-trip cost of trading all of them. Compare.

**(d)** Find a chart of a random walk (generate one in a spreadsheet: start at 100 and add
a random value between −1 and +1 each step, for 300 steps). Identify three "support
levels" and one classic chart pattern. Reflect on what this means for your confidence in
patterns you find on real charts.

---

Next: [07.2 — Market structure](02-market-structure.md)
