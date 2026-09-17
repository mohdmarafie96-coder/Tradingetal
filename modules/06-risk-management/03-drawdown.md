# 06.3 — Drawdown and Risk of Ruin

## Drawdown

**Drawdown** is the decline from a peak in account equity to a subsequent trough,
expressed as a percentage of the peak.

```
Drawdown = (peak equity − current equity) / peak equity
```

Account runs $10,000 → $13,000 → $9,800 → $14,000.

- Peak was $13,000, trough $9,800
- **Maximum drawdown = (13,000 − 9,800) / 13,000 = 24.6%**

Note that the account ended higher than it started. Drawdown measures the worst
peak-to-trough experience along the way, not the final result, and it is what you actually
have to live through.

## The recovery asymmetry

The central arithmetic fact of capital management:

> **Recovery gain required = 1 / (1 − drawdown) − 1**

| Drawdown | Gain required to recover |
|---|---|
| 5% | 5.3% |
| 10% | 11.1% |
| 20% | 25.0% |
| 30% | 42.9% |
| 40% | 66.7% |
| 50% | **100%** |
| 60% | 150% |
| 75% | 300% |
| 90% | **900%** |

Losses and gains are not symmetric because they compound on different bases. Lose 50% and
you need to double what remains just to get back.

Beyond about 30%, recovery stops being a matter of trading well and becomes a matter of
trading *exceptionally* well for a long time, usually while demoralised and tempted to
take larger risks. That combination is why deep drawdowns so often become terminal ones:
the arithmetic problem and the psychological problem arrive together.

## Losing streaks are normal

Traders treat a losing streak as evidence that something is broken. Usually it is evidence
that probability is working as advertised.

At a **45% win rate**, over any 100 trades:

| Streak of consecutive losses | Approximate probability of occurring |
|---|---|
| 5 or more | **89%** |
| 6 or more | 70% |
| 7 or more | 48% |
| 8 or more | 30% |
| 10 or more | 10% |

Read the first row again. At a win rate that produces a perfectly good strategy when
paired with 2R winners, a **five-loss streak is nearly certain** within any hundred
trades, and a seven-loss streak is close to a coin flip.

This has a direct implication for how you should feel about it: a five-loss streak is not
information. It carries essentially no evidence that your strategy has stopped working. A
trader who abandons a plan after five losses will abandon every plan they ever adopt.

### What a streak costs

| Risk per trade | 5 losses | 8 losses | 10 losses | 15 losses |
|---|---|---|---|---|
| 0.5% | −2.5% | −3.9% | −4.9% | −7.2% |
| 1% | −4.9% | −7.7% | −9.6% | −14.0% |
| 2% | −9.6% | −14.9% | −18.3% | −26.1% |
| 5% | −22.6% | −33.7% | −40.1% | −53.7% |
| 10% | −41.0% | −56.9% | −65.1% | −79.4% |

At 0.5% and 1%, every cell is survivable and recoverable. At 5%, a ten-loss streak needs a
67% gain to undo. At 10%, an eight-loss streak — which has a 30% chance of happening in
any hundred trades — has already effectively ended the account.

**Choose the row you want to be in before you start.** That choice is made once, in
advance, and it determines whether ordinary bad luck is an inconvenience or a catastrophe.

## Risk of ruin

**Risk of ruin** is the probability of losing a defined proportion of capital before any
edge can express itself.

The exact formula depends on assumptions about the distribution of outcomes, and precision
is not the point. The pattern is:

| Risk per trade | Edge | Approx. risk of losing 50% |
|---|---|---|
| 1% | Positive (+0.3R) | Very low |
| 2% | Positive (+0.3R) | Low |
| 5% | Positive (+0.3R) | Moderate |
| 10% | Positive (+0.3R) | High |
| Any | Zero or negative | **Certain, given enough trades** |

Two conclusions, both important.

**First: with no edge, ruin is certain.** Not likely. Certain, given enough trades,
because costs guarantee negative expectancy and repeated negative-expectancy bets converge
on zero. No position sizing rescues a negative-expectancy strategy; smaller sizing only
makes the descent slower and more comfortable.

**Second: with a genuine edge, ruin is driven mainly by position size.** The same
strategy is safe at 1% and dangerous at 10%. Sizing is the variable you control completely
and it is where nearly all of your risk-of-ruin exposure lives.

## Loss limits

Position sizing controls single-trade risk. Loss limits control aggregate risk, and they
are what protect you from yourself on a bad day.

| Limit | Typical value | Purpose |
|---|---|---|
| Per trade | 0.5% – 1% | Single-trade risk |
| Per day | 3% or 3 consecutive losses | Stops tilt-driven spirals |
| Per week | 6% | Forces a pause and a review |
| Per month | 10% | Triggers a full strategy review |
| Maximum total | 20% – 25% | Stop trading; reassess everything |

**The daily limit is the most important one**, because it addresses the specific failure
mode that destroys accounts fastest: revenge trading. The sequence is well documented and
always the same. Take a loss. Take a second. Feel the need to make it back. Take a larger
position. Lose. Take a much larger position. Lose everything.

A hard daily limit interrupts the sequence at step three. It works because it is decided
in advance, when you are calm, and applied in the moment, when you are not.

**Enforcement matters more than the number.** A limit you can override is not a limit.
Practical enforcement:

- Close the platform and log out
- Write the limits in your plan and review compliance weekly
- Have a physical checklist you must complete before placing any trade after a loss
- Some brokers offer self-imposed deposit or loss limits with a cooling-off period. Use
  them.

## Reducing size in a drawdown

Fixed fractional sizing does this automatically, but many traders add a deliberate,
steeper reduction:

| Drawdown from peak | Risk per trade |
|---|---|
| 0 – 5% | Normal (1%) |
| 5 – 10% | 0.75% |
| 10 – 15% | 0.5% |
| 15 – 20% | 0.25% |
| Over 20% | Stop. Review before resuming. |

This is the opposite of the instinct, which is to size up to recover faster. The instinct
is exactly wrong: increasing size during a drawdown is the mechanism that converts a
recoverable decline into a terminal one, because it raises the required recovery and the
variance simultaneously.

Reducing size costs you some of the recovery speed. It buys you the near-certainty of
still having an account when conditions improve. That is a good trade.

## Key points

- Drawdown is peak-to-trough decline; recovery requires a larger percentage than was lost
- Beyond 30%, recovery becomes very difficult mathematically and psychologically
- At a 45% win rate, a five-loss streak occurs in about 89% of any 100-trade sequence
- Streaks of ordinary length are not evidence that a strategy has failed
- With no edge, ruin is certain; with an edge, position size determines ruin risk
- Daily, weekly and monthly loss limits protect against the revenge-trading spiral
- Reduce size in a drawdown; never increase it

## Exercise 06.3

**(a)** Your account peaks at $18,400 and falls to $13,100. Calculate the drawdown and the
gain required to recover.

**(b)** You risk 2% per trade and suffer 11 consecutive losses. What is your remaining
balance as a percentage of the start, and what gain returns you to break-even?

**(c)** At a 40% win rate, calculate the probability of at least five consecutive losses
within a 50-trade sequence. (Approximate: use 1 − (1 − p^5(1−p))^46, where p is the loss
probability.) Comment on whether you would have abandoned your strategy.

**(d)** Write your own loss limits: per trade, per day, per week, per month, and maximum
total. For each, state the specific enforcement mechanism — what physically stops you, not
what you intend to do.

**(e)** Build a drawdown-response table like the one above, adapted to your risk
percentage. State at what drawdown you stop trading entirely and what has to happen before
you resume. Be specific enough that a third party could check it.

**(f)** Look back at your worst demo losing streak. How many consecutive losses? How did
you feel by the end, and what did you do differently on the next trade? Write it down.
That record is more useful than any number in this lesson, because it is about you.

---

Next: [06.4 — Correlation and portfolio risk](04-correlation.md)
