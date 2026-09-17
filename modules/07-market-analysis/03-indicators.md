# 07.3 — Indicators

## What an indicator is

**An indicator is a formula applied to price and volume data.** It contains no information
that is not already in the price series. It is a transformation, not a source.

That single sentence resolves most confusion about indicators. A moving average is an
average of prices you can already see. RSI is a ratio of recent gains to recent losses,
computed from prices you can already see. No indicator adds data.

What indicators do provide is genuinely useful:

- **Objectivity.** "The 50-period average is rising" is checkable; "it looks bullish" is
  not.
- **Quantification.** ATR turns "it's volatile today" into a number you can size against.
- **Consistency.** The same rule applied the same way every time, which is a precondition
  for testing anything.

What they cannot provide is prediction. Every indicator is computed from past prices and
therefore lags. This is not a defect to be engineered away; it is what the formula is.

## Moving averages

The average closing price over N periods, recalculated each period.

**Simple (SMA):** equal weight to all N periods.
**Exponential (EMA):** more weight to recent periods, so it responds faster and whipsaws
more.

Common periods: 20 (short), 50 (medium), 200 (long). These are conventional rather than
optimal, and their significance is partly self-fulfilling because so many participants
watch them.

**Uses:**

- **Trend direction.** Price above a rising 200-period average is a simple, objective
  uptrend definition.
- **Dynamic support and resistance.** Price often pulls back to an average in a trend.
  Treat this as an observation to test, not a law.
- **Crossovers.** A short average crossing a long one. Widely taught, and the single most
  over-rated signal in retail trading: it lags badly and whipsaws in ranges, which is where
  markets spend most of their time.

**Limitations.** Lag is proportional to period. A 200-period average on D1 tells you about
the last 200 days, and it will confirm a trend change months after it happened. In a range,
crossovers generate a continuous stream of losing signals.

## RSI

**Relative Strength Index**, usually 14 periods, bounded 0 to 100. Measures the ratio of
average gains to average losses.

Conventional reading: above 70 "overbought", below 30 "oversold".

**The misuse that costs the most money:** treating overbought as a sell signal.

In a strong uptrend, RSI can sit above 70 for weeks while price continues rising. Selling
because RSI is 75 means shorting strength, which is a reliable way to lose money in a
trending market. The indicator is doing exactly what it should; the interpretation is
wrong.

**More defensible uses:**

- **As a filter, not a trigger.** In an established uptrend, buy pullbacks when RSI dips
  to 40 to 50. You are using it to time entries within a direction you established
  elsewhere.
- **Divergence.** Price makes a higher high while RSI makes a lower high. Suggests
  weakening momentum. Worth noting, frequently wrong, and never sufficient alone.

## ATR

**Average True Range.** The average of the true range over N periods, usually 14, where
true range is the greatest of: current high minus low, current high minus previous close,
or previous close minus current low.

**ATR is the most useful indicator in this course for one reason: it is the only one that
feeds directly into risk management.** It measures volatility, not direction, and makes no
prediction at all.

**Uses:**

**1. Stop distance.** Place stops at 1.5 to 3 ATR from entry. This adapts automatically:
in a quiet market your stop tightens, in a volatile one it widens, and your risk stays
constant because position size adjusts.

**2. Position sizing.** Combine with Module 06.1:

```
Stop distance = 2 × ATR
Position size = risk budget / (2 × ATR × value per point)
```

EUR/USD, ATR(14) on D1 = 70 pips. $5,000 account, 1% risk = $50.

```
Stop = 2 × 70 = 140 pips
Size = 50 / (140 × 0.0001) = 3,571 units → 0.03 lots
```

Note how much smaller that is than the 0.14 lots from the 35-pip example in Module 06.1.
A daily-timeframe trade needs a much wider stop and therefore a much smaller position. This
is correct, and it is one of the main reasons daily timeframes suit small accounts: the
cost per trade becomes trivial relative to the stop.

**3. Volatility regime.** Current ATR against its own 50-period average tells you whether
conditions are unusually quiet or unusually active. Useful for deciding whether to trade at
all.

**4. Targets.** Setting targets in ATR multiples keeps reward-to-risk consistent across
conditions.

## MACD, Bollinger Bands, stochastics, and the rest

Briefly, because the pattern repeats:

**MACD** — difference between two EMAs, plus a signal line. A momentum and
trend-following indicator. Same lag and whipsaw issues as any moving average system.

**Bollinger Bands** — a moving average with bands at ±2 standard deviations. Useful for
visualising volatility expansion and contraction. The common error is identical to RSI:
price touching the upper band is not a sell signal, and in a trend it will ride the band.

**Stochastics** — another bounded oscillator. Same overbought/oversold misuse.

**Volume** — genuinely informative on exchange-traded instruments. On FX charts it is
tick count from your broker's feed, not market volume, so treat FX "volume" with
considerable scepticism.

## The problems with indicators

**1. Lag.** All are computed from past prices. A signal arrives after the move has begun,
by construction.

**2. Whipsaw in ranges.** Trend indicators generate false signals in ranges, and markets
range most of the time.

**3. Over-fitting.** With enough parameters you can make any indicator look profitable on
any historical period. A 14-period RSI does not work but a 17-period does? You have fitted
noise. The test is out-of-sample performance, and it usually collapses.

**4. Redundancy.** RSI, stochastics, MACD and momentum are all computed from the same price
series and are heavily correlated. Stacking them feels like confirmation and is closer to
asking the same question four times.

**5. The illusion of rigour.** A chart covered in indicators looks analytical. It is
usually a sign of uncertainty rather than insight, and it makes decisions slower and less
consistent.

## How many to use

**Two or three. Maximum.**

A defensible minimal set:

1. **One trend filter** — a moving average, or pure swing structure
2. **ATR** — for stop distance and sizing
3. **Optionally one timing tool** — RSI used as a pullback filter within an established
   direction

Everything else is optional and most of it is noise.

**Test:** if you removed an indicator, would any of your decisions change? If not, remove
it. Most traders can remove most of what is on their chart with no effect on results, and
a positive effect on clarity.

## Key points

- An indicator is a transformation of price; it adds no information
- Indicators provide objectivity and consistency, not prediction
- All lag, by construction
- Overbought does not mean sell; in a trend, oscillators stay extreme for long periods
- ATR is the most useful indicator because it feeds risk management directly
- Stop = 1.5 to 3 ATR adapts position size to conditions automatically
- Over-fitting is the main danger; out-of-sample testing is the only defence
- Use two or three indicators; remove anything that does not change a decision

## Exercise 07.3

**(a)** Calculate the 14-period ATR for your instrument on D1 and on H4. Using 2 ATR stops
and 1% risk on your account, calculate the position size for each. Comment on the
difference and on which is more compatible with your account size.

**(b)** Find a period in your instrument's history where RSI stayed above 70 for more than
ten consecutive periods. What would have happened to a short taken on the first reading
above 70? Size it at 1% and calculate the actual loss.

**(c)** Apply a 50/200 moving average crossover to two years of daily data. Count the
signals, count how many were profitable using a 2 ATR stop, and calculate the expectancy.
Then state honestly whether the sample size supports any conclusion.

**(d)** Take your current chart setup. Remove every indicator. Add back only those that
would change a decision you actually make. How many remain?

**(e)** Compute current ATR against its 50-period average for your instrument. Is the
market currently in a high or low volatility regime? What does that imply for your stop
distances and position sizes this week?

---

Next: [07.4 — Fundamentals and the calendar](04-fundamentals.md)
