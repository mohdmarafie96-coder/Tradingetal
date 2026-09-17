# 04.1 — What Leverage Actually Does

## Definition

**Leverage** is the ratio of your position's notional value to the capital required to
hold it.

```
Leverage = notional value / margin required
```

At 30:1, controlling $30,000 of exposure requires $1,000 of margin. At 5:1, the same
exposure requires $6,000.

Expressed the other way, as a **margin requirement**:

```
Margin % = 1 / leverage
```

| Leverage | Margin % | Notional per $1,000 margin |
|---|---|---|
| 2:1 | 50% | $2,000 |
| 5:1 | 20% | $5,000 |
| 10:1 | 10% | $10,000 |
| 20:1 | 5% | $20,000 |
| 30:1 | 3.33% | $30,000 |
| 100:1 | 1% | $100,000 |
| 500:1 | 0.2% | $500,000 |

## What it multiplies

Leverage multiplies your **return on capital deployed**, in both directions, by exactly
the leverage factor.

$1,000 of capital, a 1% move in the underlying:

| Leverage | Notional | P&L on 1% move | Return on capital |
|---|---|---|---|
| 1:1 | $1,000 | $10 | 1% |
| 5:1 | $5,000 | $50 | 5% |
| 10:1 | $10,000 | $100 | 10% |
| 30:1 | $30,000 | $300 | 30% |
| 100:1 | $100,000 | $1,000 | **100%** |

At 100:1, a 1% move doubles your money or eliminates it. Read the last row in both
directions, because the market does not care which one you were hoping for.

## The move that wipes you out

The most useful way to think about leverage is in reverse: **how far can price move
against me before my margin is gone?**

```
Adverse move to lose 100% of margin = 1 / leverage
```

| Leverage | Adverse move that eliminates margin |
|---|---|
| 5:1 | 20% |
| 10:1 | 10% |
| 20:1 | 5% |
| 30:1 | **3.33%** |
| 100:1 | **1%** |
| 500:1 | **0.2%** |

Now put that against real market behaviour. EUR/USD routinely moves 0.5% to 1% in a day.
An index can move 3% on an ordinary bad day and 7% on a genuinely bad one. An individual
share can gap 15% on earnings.

At 30:1 on a major index, an ordinary 3% down day eliminates the margin on a fully
leveraged position. Not a crash. A Tuesday.

At 500:1, offered by unregulated brokers as a feature, a 0.2% move does it. EUR/USD moves
0.2% before most people have finished their coffee.

## The misconception that costs the most money

Beginners typically believe:

> "I'll use lower leverage so I'm taking less risk."

This is wrong in a way that matters, and correcting it is the point of this lesson.

**Leverage does not determine your risk. Position size does.**

Consider two traders, each with a $5,000 account, each buying 0.1 lots of EUR/USD
(10,000 units, $10,850 notional) with a 25-pip stop.

| | Trader A | Trader B |
|---|---|---|
| Account leverage setting | 30:1 | 5:1 |
| Position size | 0.1 lots | 0.1 lots |
| Notional | $10,850 | $10,850 |
| Margin required | $362 | $2,170 |
| Free margin | $4,638 | $2,830 |
| Pip value | $1.00 | $1.00 |
| Loss if stopped out | **$25** | **$25** |
| Risk as % of account | **0.5%** | **0.5%** |

**Identical risk.** The leverage setting changed how much capital was reserved. It
changed nothing about how much money they lose if the trade fails.

What the leverage setting actually controls is the **maximum position size available to
you**. Trader A can open a far larger position than Trader B. Whether that is dangerous
depends entirely on whether Trader A chooses to.

So the correct framing is:

- **High leverage is not risk. It is permission to take risk.**
- **Risk is created when you use that permission to size up.**
- **The defence is sizing from a risk budget**, which is Module 6, not from a leverage
  figure.

That said, there is a behavioural argument for setting leverage lower than the maximum:
it removes the temptation, and a constraint you cannot override is more reliable than one
you must choose not to use. That is a legitimate reason, and it is a psychological
control rather than a mathematical one. Be clear about which you are using.

## Effective leverage: the number that matters

The leverage setting on your account is a maximum. **Effective leverage** is what you are
actually using:

```
Effective leverage = total notional of open positions / account equity
```

| Effective leverage | Interpretation |
|---|---|
| Under 2:1 | Conservative |
| 2:1 – 5:1 | Moderate; typical of a well-run retail account |
| 5:1 – 10:1 | Aggressive |
| Over 10:1 | A single ordinary day can do severe damage |
| Over 20:1 | Ruin is a matter of when |

**Track this number.** It is the single best one-glance summary of whether your account
is in a survivable state, and it accounts for the fact that five positions at 2:1 each
add up to 10:1.

## Worked examples

**Example 1.** $4,000 account, 0.3 lots EUR/USD at 1.0900, 30:1.
Notional = 30,000 × 1.0900 = $32,700.
Margin = 32,700 / 30 = **$1,090**.
Effective leverage = 32,700 / 4,000 = **8.2:1**. Aggressive.

**Example 2.** $10,000 account, 200 share CFDs at $45, 5:1 (20% margin).
Notional = $9,000. Margin = **$1,800**.
Effective leverage = 9,000 / 10,000 = **0.9:1**. Conservative.

**Example 3.** $3,000 account, three simultaneous positions: 0.2 lots EUR/USD ($21,800),
0.15 lots GBP/USD ($19,050), and 2 CFDs US 500 ($10,300).
Total notional = **$51,150**.
Effective leverage = 51,150 / 3,000 = **17:1**. Each position looks modest. Together they
are not. This is why the aggregate number is the one to watch.

## Key points

- Leverage = notional / margin; margin % = 1 / leverage
- Leverage multiplies return on capital in both directions
- The adverse move that eliminates your margin is 1 / leverage
- Leverage does not set your risk; position size does
- The leverage setting caps the position size available to you, nothing more
- Effective leverage (total notional / equity) is the number to monitor

## Exercise 04.1

**(a)** Calculate margin required for: 0.7 lots EUR/USD at 1.0880 at 30:1; 12 CFDs
US 500 at 5,180 at 20:1; 400 share CFDs at $28.50 at 5:1; 0.03 lots gold at $2,390 at
20:1 (100 oz per lot).

**(b)** For each of those, state the percentage adverse move that would eliminate the
margin posted.

**(c)** Two traders both hold 0.2 lots of GBP/USD with a 30-pip stop on $8,000 accounts.
One is set to 30:1, the other to 10:1. Which loses more if stopped out? Explain in one
sentence why the answer surprises most beginners.

**(d)** Your account equity is $6,500. You hold: 0.25 lots EUR/USD at 1.0910, 0.1 lots
USD/JPY at 150.40, and 5 CFDs Germany 40 at 18,300 with EUR/USD at 1.0910. Calculate
total notional in USD and your effective leverage. Classify it using the table above.

**(e)** You want to keep effective leverage below 5:1 on a $2,500 account. What is your
maximum total notional? Express that as a maximum lot size on EUR/USD at 1.0900.

---

Next: [04.2 — Margin, equity and margin level](02-margin-mechanics.md)
