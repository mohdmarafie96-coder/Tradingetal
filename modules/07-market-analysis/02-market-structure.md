# 07.2 — Market Structure

## Two conditions

Markets are usefully described as being in one of two conditions:

- **Trending** — making progress in one direction
- **Ranging** — oscillating within a band

The distinction matters because strategies that work in one fail in the other, and the
majority of retail losses come from applying a trend strategy in a range or a range
strategy in a trend.

**Markets range far more often than they trend.** Estimates vary by instrument and
timeframe, but something like 70% of the time is a reasonable working assumption. A trend
strategy therefore spends most of its life producing small losses, punctuated by the
occasional large winner that pays for all of them. That profile is mathematically fine and
psychologically brutal, and knowing it in advance is most of what makes it survivable.

## Defining a trend

The standard definition, and a useful one because it is mechanical rather than subjective:

- **Uptrend:** successive **higher highs** and **higher lows**
- **Downtrend:** successive **lower highs** and **lower lows**
- **Range:** neither pattern holds

```
UPTREND                          DOWNTREND
          HH                     HH
         /  \      HH             \  /\
        /    \    /  \             \/  \    LH
   HL  /      \  /    \             HL  \  /  \
  /  \/        HL      ...               \/    \  LL
 /                                              \/
```

A **swing high** is a candle whose high exceeds those of the candles on either side. A
**swing low** is the inverse. Requiring two or three candles on each side filters noise;
the exact number is a parameter you should fix and stick to rather than adjust per chart.

**A trend ends when the pattern breaks.** An uptrend making a lower low is no longer an
uptrend. That is a definition, not a prediction — it does not mean price will fall, only
that your description has changed and any strategy conditioned on "uptrend" no longer
applies.

## Support and resistance

**Support** is a level where price has previously stopped falling. **Resistance** is where
it has previously stopped rising.

Why levels matter at all, mechanically: resting orders cluster at prices where something
happened before. Traders who bought at a level and watched price fall want out at
break-even. Traders who missed the move want a second chance. Stop losses sit just beyond
prior extremes. None of this is mystical; it is order placement responding to memory.

### Drawing levels honestly

The failure mode is drawing so many levels that price is always near one, which makes them
unfalsifiable and useless.

**Rules for a defensible level:**

1. **Use at least two touches.** One touch is a price, not a level.
2. **Prefer levels visible on a higher timeframe.** Daily and weekly levels matter more
   than 15-minute levels.
3. **Treat levels as zones, not lines.** Price is not precise; a zone of 5 to 15 pips
   depending on instrument and volatility is realistic.
4. **Fewer is better.** Three to five levels on a chart. If you have fifteen, you have
   none.
5. **Do not redraw to fit.** If you find yourself moving a level after price passed it,
   you are curve-fitting your own chart in real time.

### Types worth marking

**Horizontal levels** — prior swing highs and lows. The most reliable and the easiest to
identify objectively.

**Round numbers** — 1.1000 on EUR/USD, 5,000 on an index, $2,000 on gold. Genuinely
significant because option strikes, stop clusters and psychological anchoring all
concentrate there.

**Prior day/week/month high and low** — widely watched, and therefore self-reinforcing.

**Trendlines** — connecting successive lows in an uptrend or highs in a downtrend. Use
with caution: trendlines have a great deal of drawing freedom and are the easiest tool to
fool yourself with. Require at least three touches, and accept that a trendline you had to
try three times to draw is not a level.

### Role reversal

Broken resistance frequently acts as support, and vice versa. The mechanism is
straightforward: traders who sold at resistance and were wrong now have losses to manage
at that price, and traders who missed the breakout treat a return to the level as an entry.

This is one of the more robust observations in technical analysis and is the basis of the
common "break and retest" setup.

## Ranges

A range is bounded by support below and resistance above.

**Trading a range** means selling near resistance and buying near support, with stops
beyond the boundary and targets at the opposite side. The reward-to-risk is naturally
defined by the range width.

**The hazard:** ranges end. Every range eventually breaks, and range strategies lose money
precisely when the trend begins. A range strategy needs a rule for when to stop applying
it, and that rule should be defined in advance.

**Breakouts and false breakouts.** Price leaving a range is a breakout. Price leaving and
immediately returning is a false breakout, and false breakouts are common because stop
clusters sit just beyond range boundaries — triggering them generates exactly the burst of
volume that makes a break look convincing.

Two approaches, both legitimate:

- **Trade the breakout** on a close beyond the boundary, accepting frequent false signals
  in exchange for catching real moves early
- **Wait for a retest** of the broken boundary, accepting missed moves in exchange for
  fewer false signals

Choose one and test it. Alternating between them based on how each chart feels is how a
strategy becomes unmeasurable.

## Identifying the condition

Practical tests, in rough order of usefulness:

1. **Swing structure.** Higher highs and higher lows, or not. The primary test.
2. **Moving average slope.** A rising 50-period average suggests an uptrend; a flat one
   suggests a range. Lagging, but objective.
3. **ADX.** Average Directional Index above roughly 25 suggests a trend; below 20 suggests
   a range. A rough filter, not a precise instrument.
4. **Visual.** Zoom out. Trends are usually obvious at a glance; if you have to argue for
   it, it probably is not one.

None of these is reliable at the turning point, which is exactly when it would be most
valuable. Accept that you will identify a trend some way into it and identify its end some
way after it. That is a structural limitation of all trend identification, not a flaw in
your method.

## Structure and stop placement

The practical payoff of this lesson, and the reason it comes before indicators:
**structure tells you where your stop belongs.**

- Long in an uptrend → stop **below the most recent higher low**. If that low breaks, the
  uptrend has broken and your reason for being long is gone.
- Short in a downtrend → stop **above the most recent lower high**.
- Long from range support → stop **below the range low**.
- Long on a breakout → stop **below the broken resistance**, which should now be support.

In every case the stop marks the point where your thesis is falsified, which is exactly
what Module 05.2 required. This is the connection between analysis and risk management:
analysis identifies the level, risk management sizes the position so that being wrong at
that level costs you 1%.

## Key points

- Markets trend or range; range conditions are the more common
- An uptrend is higher highs and higher lows, by definition
- A trend ends when the swing structure breaks; that is a definition, not a forecast
- Levels need at least two touches, and fewer levels are better than more
- Treat levels as zones; broken levels often reverse role
- False breakouts are common because stop clusters sit beyond range boundaries
- Structure determines where the stop belongs, which determines position size

## Exercise 07.2

**(a)** On a daily chart of your instrument over the last six months, mark every swing high
and swing low using a fixed definition (two candles either side). Label the condition of
each segment as uptrend, downtrend or range. What proportion of the time was it trending?

**(b)** Draw no more than five horizontal levels on the same chart. For each, state the
number of touches and the timeframe on which it is visible. Delete any that do not meet
the two-touch rule.

**(c)** Find one clear example each of: a trend continuation after a pullback, a range,
a genuine breakout, and a false breakout. Screenshot each and write one sentence on what
would have happened to a trade taken at the obvious entry.

**(d)** For three recent setups on your instrument, state where a structural stop belongs
and why. Then calculate the position size at 1% risk for each.

**(e)** Over the last 100 candles, count how many times price broke a marked level and
continued, versus broke it and reversed within three candles. What does the ratio suggest
about breakout versus retest entries on your instrument?

---

Next: [07.3 — Indicators](03-indicators.md)
