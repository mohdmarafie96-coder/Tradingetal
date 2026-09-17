# Module 06 — Risk Management

**Time:** ~6 hours · **Prerequisites:** Modules 03–05

The most important module in the course.

Entry signals are what beginners study and what the industry sells. Risk management is
what determines whether an account survives long enough for any edge to express itself.
A mediocre strategy with excellent risk management can survive indefinitely. An excellent
strategy with poor risk management is destroyed by its first ordinary losing streak.

## Lessons

1. [Position sizing](01-position-sizing.md) — the central calculation
2. [Risk-reward and expectancy](02-expectancy.md) — whether a strategy makes money
3. [Drawdown and risk of ruin](03-drawdown.md) — surviving losing streaks
4. [Correlation and portfolio risk](04-correlation.md) — when positions fail together

## Learning outcomes

By the end of this module you can:

- Size any position from a fixed risk budget and a stop distance
- Calculate expectancy in currency and in R, and state whether a strategy is viable
- Compute the break-even win rate for any reward-to-risk ratio
- Explain why a 10-loss streak is expected, not exceptional, at a 45% win rate
- Compute the gain required to recover any drawdown
- Identify correlated positions and calculate true aggregate risk
- Set and enforce daily, weekly and monthly loss limits

## The central principle

> **Decide what you are willing to lose. Then let that determine your position size.**
>
> Never decide the position size first and discover the loss afterwards.

Everything in this module follows from reversing that order of operations.

## Key formulas

```
Position size    = risk budget / (stop distance × value per point per unit)
Expectancy       = (win rate × avg win) − (loss rate × avg loss)
Break-even WR    = 1 / (1 + reward-to-risk)
Recovery gain    = 1 / (1 − drawdown) − 1
Effective lev.   = total notional / equity
```

## Quiz

[Module 06 quiz](quiz.md) — 12 questions.
