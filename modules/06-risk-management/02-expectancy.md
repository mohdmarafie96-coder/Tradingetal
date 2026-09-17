# 06.2 — Risk-Reward and Expectancy

## R: the unit that makes everything comparable

**R is one unit of risk** — the amount you lose if a trade hits its stop.

Expressing results in R rather than currency lets you compare trades of different sizes,
across different instruments, on different account balances. A +2R trade is a +2R trade
whether it made $40 or $4,000.

- Stopped out: **−1R**
- Closed at twice your risk: **+2R**
- Closed at half your risk: **+0.5R**

Journal everything in R. It is the only way to see whether a strategy works independently
of how much money you happened to have at the time.

## Reward-to-risk ratio

> **R:R = (target − entry) / (entry − stop)** for a long

Entry 1.0880, stop 1.0845, target 1.0950:

```
Risk   = 35 pips
Reward = 70 pips
R:R    = 2.0 : 1
```

## Break-even win rate

For any R:R there is a win rate below which you lose money:

> **Break-even win rate = 1 / (1 + R:R)**

| R:R | Break-even win rate |
|---|---|
| 0.5 : 1 | 66.7% |
| 1 : 1 | 50.0% |
| 1.5 : 1 | 40.0% |
| 2 : 1 | 33.3% |
| 3 : 1 | 25.0% |
| 5 : 1 | 16.7% |

This table dismantles the most persistent beginner belief, which is that a high win rate
is the objective. At 3:1, you can be wrong three times out of four and break even. At
0.5:1, you must be right two times out of three merely to tread water.

**Neither win rate nor R:R means anything alone.** A 90% win rate is a losing system if
the losers are ten times the winners. A 20% win rate is excellent if the winners are ten
times the losers. Only the combination matters, and the combination is expectancy.

## Expectancy

> **Expectancy = (win rate × average win) − (loss rate × average loss)**

In R terms, where the average loss is 1R by construction:

> **Expectancy (R) = (W × average win in R) − (1 − W)**

### Worked examples

**Strategy A.** 40% win rate, average win 2.5R.

```
E = (0.40 × 2.5) − (0.60 × 1) = 1.00 − 0.60 = +0.40R per trade
```

**Strategy B.** 65% win rate, average win 0.6R.

```
E = (0.65 × 0.6) − (0.35 × 1) = 0.39 − 0.35 = +0.04R per trade
```

**Strategy C.** 80% win rate, average win 0.2R.

```
E = (0.80 × 0.2) − (0.20 × 1) = 0.16 − 0.20 = −0.04R per trade
```

Strategy C wins four trades out of five and loses money. It feels excellent. It is a
losing system, and it is the most common shape of losing system in retail trading, because
cutting winners early and letting losers run produces exactly this profile.

Strategy A loses more often than it wins and is ten times better than Strategy B.

### Converting to money

At 1% risk per trade on a $10,000 account, 1R = $100.

| | Expectancy | Per trade | 100 trades |
|---|---|---|---|
| A | +0.40R | +$40 | +$4,000 |
| B | +0.04R | +$4 | +$400 |
| C | −0.04R | −$4 | −$400 |

(Ignoring compounding, which helps A considerably and does not rescue C.)

## Expectancy after costs

Costs are not an afterthought. Convert them into R and subtract.

Strategy with a 25-pip stop, 0.2 lots, so 1R = 25 × $2 = $50. Round-trip cost $3.50.

```
Cost in R = 3.50 / 50 = 0.07R per trade
```

| | Gross | Net |
|---|---|---|
| Strategy A | +0.40R | +0.33R |
| Strategy B | +0.04R | **−0.03R** |
| Strategy C | −0.04R | −0.11R |

**Strategy B was profitable gross and is a loser net.** This is the single most common way
a strategy that "works" fails in practice, and it is why Module 3.4 insisted on the cost
ratio.

Notice also that costs hurt the low-expectancy strategy proportionally far more.
High-frequency, small-target strategies have the highest cost-to-R ratios and the least
margin for error. That is why they are hard, not why they are sophisticated.

## Sample size

A crucial and unwelcome point: **you cannot determine expectancy from a small number of
trades.**

Take a genuinely positive strategy, 45% win rate at 2R. True expectancy is +0.35R. Over
20 trades, outcomes ranging from −7R to +15R are entirely ordinary. A trader who evaluates
after 20 trades will conclude almost anything.

Rough guidance:

| Trades | What you can say |
|---|---|
| Under 30 | Essentially nothing |
| 30 – 100 | A weak signal; large confidence interval |
| 100 – 300 | A usable estimate |
| Over 300 | Reasonably reliable, if conditions have not changed |

Two consequences that people resist:

1. **Do not abandon a tested plan after a losing week.** You do not have the evidence.
2. **Do not scale up after a winning week.** You do not have that evidence either.

Most retail strategy-hopping is driven by reading noise as signal. The trader changes the
system after every drawdown, never accumulates a sample on anything, and therefore never
learns whether any of it worked.

## Kelly, and why to use a fraction of it

The **Kelly criterion** gives the bet size that maximises long-run geometric growth:

```
f* = W − (1 − W) / R
```

For a 45% win rate at 2R:

```
f* = 0.45 − 0.55/2 = 0.45 − 0.275 = 0.175 → 17.5% of capital per trade
```

**Do not do this.** Full Kelly is correct only if your estimates of W and R are exact,
which they are not, and it produces drawdowns of 50% or more as a routine occurrence.
Overestimating your edge even slightly under full Kelly produces ruin.

Practitioners use a fraction, typically one tenth to one quarter of Kelly. A tenth of
17.5% is 1.75%, which is roughly the standard 1% to 2% risk range. The conventional advice
and the mathematics converge, which is mildly reassuring.

The useful takeaway is not the formula. It is that **optimal sizing is much smaller than
intuition suggests**, and that the penalty for oversizing is asymmetric and severe.

## Improving expectancy

Four levers, in order of how much they are usually worth:

1. **Increase average win.** Let winners run; use structural targets rather than fixed
   small ones; avoid moving stops to break-even too early. Usually the largest available
   improvement, because most retail traders truncate their winners.
2. **Reduce average loss.** Tighter structural stops where justified; exit on thesis
   invalidation rather than waiting for the stop; never widen a stop.
3. **Reduce costs.** Fewer trades, better account type, cheaper instruments, longer holds
   relative to cost. Immediate and certain.
4. **Increase win rate.** The hardest, most heavily marketed, and least reliable lever.
   Better filtering and fewer marginal trades help; better indicators generally do not.

The ordering matters. Beginners spend essentially all their effort on lever 4 and almost
none on levers 1 to 3, which is backwards.

## Key points

- R is one unit of risk; journal everything in R
- Break-even win rate = 1 / (1 + R:R)
- Win rate alone means nothing; expectancy is the only measure that matters
- Expectancy = (W × avg win) − (1 − W) × avg loss
- Subtract costs in R; a marginal strategy is usually a losing strategy net
- You need 100+ trades to say anything, and 300+ to be reasonably confident
- Kelly-optimal sizing is far smaller than intuition, and a fraction of Kelly is correct
- Improve average win and reduce costs before chasing win rate

## Exercise 06.2

**(a)** Calculate R:R for: entry 1.0880, stop 1.0850, target 1.0965.

**(b)** State the break-even win rate for R:R of 1.2, 2.5 and 4.

**(c)** Calculate expectancy in R for:
- 55% win rate, average win 1.1R
- 35% win rate, average win 3.2R
- 70% win rate, average win 0.45R
- 48% win rate, average win 1.9R

**(d)** For each in (c), recompute net expectancy with costs of 0.08R per trade. Which
survive?

**(e)** Your last 60 demo trades: 27 wins averaging +1.7R, 33 losses averaging −0.95R
(some exited before the stop). Calculate win rate, expectancy, and total R. Then state
honestly what you can and cannot conclude from 60 trades.

**(f)** A strategy has 42% win rate and 2.2R average win. Calculate full Kelly, then state
what fraction you would actually use and why. Convert your answer to a risk percentage
and compare it to the recommendation in 06.1.

**(g)** You are tempted to move stops to break-even at +0.5R. Using a spreadsheet or your
journal, estimate how this would change your win rate and your average win, and therefore
your expectancy. Most traders find the effect is negative.

---

Next: [06.3 — Drawdown and risk of ruin](03-drawdown.md)
