# 08.4 — Testing

## Three stages

Before risking money, a strategy passes through three stages. Skipping stages is the
normal behaviour and the reason most strategies are funded before anyone knows whether they
work.

1. **Backtest** — apply the rules to historical data
2. **Forward test** — apply them to live data on demo, in real time
3. **Live, minimum size** — real money, smallest position that satisfies your risk rule

## Backtesting

Applying your rules to historical price data and recording what would have happened.

### Manual backtesting

Scroll a chart forward candle by candle, applying your rules, recording each trade. Slow —
100 trades takes several hours — and far more valuable than automated testing for a
beginner.

The reason it is more valuable: you see every candle, so you learn what your strategy
actually experiences. You discover that your setup appears only twice a month, or that the
rules are ambiguous in ways you had not noticed, or that you cannot bring yourself to take
the entry when it appears. None of that shows up in a summary statistic.

**Method:**

1. Choose a period you have not studied in detail, ideally at least a year
2. Hide the right side of the chart; most platforms have a bar replay mode
3. Advance one candle at a time
4. When the setup appears, record the trade fully, as if live
5. Advance until the trade resolves
6. Never look ahead, and never go back and change an entry

### Automated backtesting

Code the rules and run them over data. Faster and capable of much larger samples, but it
requires programming and is far easier to fool yourself with, because the feedback loop
between changing a parameter and seeing a better result is measured in seconds.

If you go this route, the discipline in the next section matters more, not less.

### Sources of self-deception

These are the reasons most backtests are wrong, roughly in order of frequency.

**Look-ahead bias.** Using information not available at the time. Entering at a price that
had already passed; using a candle's close to trigger an entry within that same candle;
using an indicator value that includes future data.

**Survivorship bias.** Testing only instruments that still exist. Delisted companies and
discontinued instruments are missing, and they are disproportionately the failures.

**Over-fitting.** Adjusting parameters until historical performance looks good. The result
describes the past, not the market. **Test: does performance degrade smoothly as parameters
change, or does it collapse?** A strategy that works at 48, 50 and 52 periods is more
plausible than one that works only at 50.

**Ignoring costs.** The most common single error. Include the spread, commission, financing
and a realistic slippage assumption. A strategy that is profitable gross and unprofitable
net is very common and is what the cost ratio in Module 03.4 was designed to catch.

**Cherry-picking the period.** A trend-following strategy tested over a strongly trending
year will look excellent. Test over varied conditions: trending, ranging, high and low
volatility, and at least one period of market stress.

**Ignoring execution reality.** Assuming every limit order fills, no stop slips, and
everything executes at the displayed price. None of these is true.

**Hindsight in rule application.** The subtle one in manual backtesting. You know what
happened next, so you take the setup slightly more readily when you remember the move
worked. Bar replay mode and strict candle-by-candle advancement help, but you cannot fully
eliminate it, which is why forward testing exists.

### What makes a usable backtest

- **100+ trades minimum**; 300+ preferred
- **At least one full year**, ideally two or three
- **Varied market conditions** including a stress period
- **All costs included**, plus realistic slippage
- **Fixed parameters** set before the test, not adjusted during it
- **Out-of-sample validation:** develop on one period, test on a different, untouched one.
  If performance collapses out of sample, you fitted noise. This is the single most
  informative test available, and it is the one people skip.

## Forward testing

Running the strategy on demo, in real time, on data that did not exist when you wrote the
rules.

**Why it is necessary even after a good backtest:**

- No look-ahead bias is possible
- Real spreads, real slippage, real execution
- You discover whether you can actually **follow** the rules, which a backtest cannot test
- You find out whether the frequency is compatible with your life

**How long:** at least 50 trades, ideally 100, over at least two months. On a daily
timeframe that may mean six months. That is the correct duration, and the impatience it
produces is itself useful information about your temperament.

**What to measure:** everything in Lesson 08.3, plus the comparison between forward-test
results and backtest results. Substantial divergence means the backtest was flawed, usually
through cost assumptions or look-ahead bias.

## Going live

Only when all of these are true:

- [ ] Backtest over 100+ trades with positive expectancy after costs
- [ ] Out-of-sample validation held up
- [ ] Forward test over 50+ trades with positive expectancy after costs
- [ ] Plan compliance above 95% during the forward test
- [ ] Maximum drawdown within your stated limit
- [ ] A written plan you have not amended in the last 30 trades
- [ ] Capital you can lose entirely without material harm
- [ ] Risk limits with physical enforcement mechanisms

**Then start at the smallest size your risk rule permits**, and expect performance to be
worse than demo. It always is. Real money changes execution, and the gap between demo
discipline and live discipline is the largest single surprise in trading.

Trade live at minimum size for at least 50 trades before increasing. If live expectancy
holds up over those 50, increase risk gradually — 0.5% to 0.75%, not 0.5% to 2%.

## What failure looks like, and what to do

**Backtest negative.** Good. You learned this for free. Revise the hypothesis or abandon
it. Do not tune parameters until it turns positive; that is over-fitting with extra steps.

**Backtest positive, forward test negative.** The backtest was flawed. Find the reason
before doing anything else. Costs and look-ahead bias account for most cases.

**Forward test positive, live negative.** Almost always execution. Compare your live plan
compliance to your demo compliance. It will be lower. Return to demo until it is not.

**Everything positive, then a drawdown.** Expected. Check it against your plan's limits. If
it is within them, continue. If it exceeds them, follow your own rule.

## The uncomfortable possibility

You may test several ideas and find none of them has positive expectancy after costs.

**This is a normal and successful outcome of testing.** It is what testing is for. The
alternative — funding an untested idea — costs money to learn the same thing.

If that happens, the honest options are: test further ideas; accept that you have not found
an edge and do not trade; or trade a very small amount as a paid hobby with no expectation
of profit.

All three are more sensible than trading a strategy you know has not passed. Most people
choose a fourth option, which is to trade it anyway and hope, and that choice is what the
70–85% statistic is measuring.

## Key points

- Backtest, then forward test on demo, then live at minimum size
- Manual backtesting teaches more than automated testing for a beginner
- The main errors are look-ahead bias, over-fitting, ignoring costs, and cherry-picked periods
- Out-of-sample validation is the most informative test and the most commonly skipped
- Forward testing is the only way to test whether you can follow your own rules
- Expect live performance to be worse than demo
- Finding that you have no edge is a successful test result

## Exercise 08.4

**(a)** Manually backtest your plan over at least 50 trades using bar replay. Record every
trade fully. Note how long it took and how many rule ambiguities you found.

**(b)** Compute expectancy, profit factor and maximum drawdown from your backtest. Include
realistic costs and 1 pip of slippage on every stop.

**(c)** Split your backtest period in two. Compute metrics separately for each half. Do
they agree? What does the answer tell you?

**(d)** Change one parameter by ±20% (for example, a 50-EMA to 40 and 60) and rerun. Does
performance degrade smoothly or collapse? What does that suggest about over-fitting?

**(e)** Begin a forward test on demo. Commit to 50 trades minimum with no rule changes.
Record the start date and the earliest permissible review date.

**(f)** Write your own go-live checklist based on the list above, with the specific
thresholds you will require. Sign and date it.

---

Next: [Module 08 quiz](quiz.md), then [Module 09 — Trading Psychology](../09-trading-psychology/)
