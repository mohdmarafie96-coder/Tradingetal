# 08.1 — What an Edge Is

## Definition

> **An edge is a repeatable reason to expect positive expectancy after costs.**

Every word is load-bearing.

**Repeatable** — it must be a rule you can state and apply identically every time, not a
judgement you exercise well on good days.

**Reason** — there must be a mechanism. A pattern that works with no explanation is
probably curve-fitted, and you will have no way to tell when it stops working.

**Positive expectancy** — over many trades, not the last few.

**After costs** — spread, commission, financing, slippage. This clause kills most
candidate edges, and it kills them quietly.

## What is not an edge

**An indicator.** Every retail trader has access to the same indicators with the same
default settings. A signal available to everyone, that everyone can act on simultaneously,
is priced in.

**A pattern you noticed on a chart.** Until it is defined precisely and tested over a large
sample, it is an observation about a small number of cases you happened to see.

**Being right about direction.** Module 02.1 showed a trader correct about direction losing
money to financing and leverage. Direction is one input among several.

**Conviction.** Confidence is uncorrelated with accuracy. Traders are typically most
confident about their worst trades, because conviction grows with narrative coherence
rather than with evidence.

**A signal service or a guru.** If someone had a reliable edge, the profit-maximising use
of it would be to trade it with as much capital as they could raise, not to sell it at
£99 a month. The economics of selling signals only work when the signals do not work.

**Working hard.** Effort is necessary and not sufficient. The market does not pay for
effort.

## Realistic sources of edge for a retail trader

You have no advantage in speed, information, capital or cost. What remains is genuinely
narrow, and it is worth being precise about it.

**1. Patience and selectivity.** Most participants trade too much. Being able to wait for a
specific, well-defined condition and pass on everything else is a real advantage, because
it is available to everyone and almost nobody does it.

**2. Risk management.** Surviving drawdowns that force others out. This does not generate
returns directly; it preserves your ability to be present when returns are available, which
amounts to the same thing over time.

**3. Discipline.** Executing rules consistently, especially when they are uncomfortable.
Most strategies fail in the hands of their owners rather than in the market.

**4. Timeframe flexibility.** You have no benchmark, no clients, no redemptions and no
obligation to be invested. You can sit in cash for a month. Institutions frequently cannot.
This is a genuine structural advantage and it is under-used.

**5. Niche instruments.** Markets too small for institutional attention sometimes retain
inefficiencies. This cuts against the beginner advice to trade major instruments, so treat
it as an advanced option rather than a starting point.

**6. Behavioural persistence.** Some patterns persist because they are driven by
predictable human behaviour rather than by information: momentum, mean reversion after
extremes, and seasonal or session-based effects. These are documented, they are weak, and
they erode as they become known. They are nonetheless the most defensible technical edges
available.

Notice that four of the six are about behaviour rather than analysis. That is the honest
shape of retail edge.

## How to tell whether you have one

**A hypothesis is not an edge.** "Buying pullbacks in an uptrend works" is a hypothesis.
It becomes a candidate edge when it is:

1. **Defined precisely enough for someone else to apply it identically.** If two people
   reading your rules would place different trades, the rules are not specified.
2. **Tested over 100+ trades** covering varied market conditions.
3. **Profitable after realistic costs** including slippage.
4. **Robust to small parameter changes.** If a 20-period average works and a 22-period
   average fails, you have fitted noise.
5. **Supported by a mechanism** you can articulate.

Fail any of these and you have a hypothesis, which is fine — that is where everything
starts. Just do not fund it.

## Specificity

The difference between a hypothesis and a rule is specificity. Compare:

**Vague:**
> "Buy when the trend is up and price pulls back to support."

Unanswerable questions: what is a trend? what is a pullback? what is support? how far?
buy where exactly? stop where?

**Specific:**
> **Setup:** On the H4 chart, the 50-period EMA is above the 200-period EMA, and the
> 50-EMA slope over the last 10 candles is positive.
>
> **Trigger:** Price retraces to within 0.5 ATR of the 50-EMA, then closes a candle above
> the previous candle's high.
>
> **Entry:** Market order at the open of the next candle.
>
> **Stop:** Below the lowest low of the last 5 candles, minimum 1.5 ATR from entry.
>
> **Target:** 2.5R, or trail at 3 ATR once 1.5R is reached.
>
> **Filter:** No entry within 60 minutes of a high-impact release for either currency.
>
> **Size:** 1% of equity risk, rounded down.

The second version can be tested, applied identically by two people, and debugged when it
stops working. The first cannot.

**The test:** could someone else follow your rules and place exactly the trades you would?
If not, you do not have a strategy. You have a style, and a style cannot be tested.

## Edges decay

An edge is not permanent. Market conditions change, participants adapt, and published
patterns erode as they become widely known.

Consequences for how you operate:

- **Monitor performance continuously.** A strategy that worked for 200 trades and has
  produced −2R over the last 40 may be degrading, or may be in a normal drawdown. You need
  the data to tell the difference, and you need the threshold defined in advance.
- **Define in advance what would make you stop.** "If expectancy over the last 50 trades
  is below zero, I pause and review." Decide this while calm, and write it down.
- **Do not over-optimise.** A strategy tuned to the last two years is fitted to conditions
  that will not repeat exactly.

## A realistic expectation

A genuine retail edge is small. Expectancy of +0.1R to +0.3R per trade is a good outcome.
At 1% risk and 100 trades a year, that is a 10% to 30% annual return before compounding,
with drawdowns of 10% to 20% along the way.

That is a good result and it will feel unimpressive, because the marketing you have been
exposed to describes outcomes that are not real.

**If your backtest shows +2R per trade with a 90% win rate, you have made an error.** The
most common are look-ahead bias, ignoring costs, and over-fitting. Find it before you fund
it.

## Key points

- An edge is a repeatable reason to expect positive expectancy after costs
- Indicators, patterns, conviction and signal services are not edges
- Realistic retail edges are behavioural: patience, discipline, risk control, timeframe
  freedom
- A strategy must be specified precisely enough for someone else to replicate exactly
- Test over 100+ trades, after realistic costs, and check robustness to parameter changes
- Edges decay; define in advance what would make you stop
- A real edge is small; extraordinary backtest results indicate an error

## Exercise 08.1

**(a)** Write down a trading idea in your own words. Then rewrite it with enough
specificity that another person could apply it identically. Note every ambiguity you had to
resolve.

**(b)** For your idea, state the mechanism: why should this produce positive expectancy?
Who is on the other side and why are they willing to take it?

**(c)** List your own realistic edges from the six sources above. Be honest. Most beginners
have none yet, and "none yet, working on discipline and patience" is the correct answer at
this stage.

**(d)** Find a trading strategy being sold online. Evaluate it against the five criteria
for a candidate edge. Note which are unverifiable from the marketing material alone, and
what that tells you.

**(e)** Write your stop-trading condition: the specific, checkable measurement that would
tell you your strategy has stopped working. It must be computable from your journal.

---

Next: [08.2 — Writing the plan](02-writing-the-plan.md)
