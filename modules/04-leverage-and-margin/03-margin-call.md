# 04.3 — Margin Call and Stop-Out

## What they are

**Margin call** is a warning. Your margin level has fallen to a threshold — commonly 100%
— and the broker notifies you. You can deposit funds, close positions, or do nothing. In
modern retail CFD trading it is often just a notification and sometimes nothing at all,
so do not rely on receiving one.

**Stop-out (margin close-out)** is not a warning. The broker closes your positions
automatically, without asking, usually starting with the largest loser. Under UK, EU and
Australian retail rules this is mandatory at **50% of required initial margin**.

Read that threshold carefully, because it is widely misunderstood:

> Close-out triggers when **equity falls to 50% of the total initial margin required for
> your open positions** — not when you have lost 50% of your account.

Those diverge enormously. Worked below.

## Worked example: an oversized position

$5,000 account. Long **1.0 lot** EUR/USD at 1.0900, 30:1.

| | |
|---|---|
| Notional | 100,000 × 1.0900 = $109,000 |
| Initial margin | 109,000 / 30 = $3,633 |
| Pip value | $10.00 |
| Equity | $5,000 |
| Free margin | $1,367 |
| Margin level | 5,000 / 3,633 = **138%** |
| Effective leverage | **21.8:1** |

### Margin call at 100%

Margin level hits 100% when equity equals used margin. Used margin shrinks slightly as
price falls, so solve properly:

```
Equity        = 5,000 − 10P             (P = pips lost)
Used margin   = 100,000 × (1.0900 − 0.0001P) / 30
              = (109,000 − 10P) / 30

Set equal:    5,000 − 10P = (109,000 − 10P) / 30
              150,000 − 300P = 109,000 − 10P
              41,000 = 290P
              P = 141 pips
```

**A 141-pip adverse move triggers the margin call.** That is a 1.3% move in EUR/USD.
Ordinary.

### Stop-out at 50%

```
5,000 − 10P = 0.5 × (109,000 − 10P) / 30
300,000 − 600P = 109,000 − 10P
191,000 = 590P
P = 324 pips
```

**A 324-pip move closes you out.** That is a 3% move in EUR/USD — uncommon in a day, but
a completely routine move over a week, and achievable in an afternoon around a central
bank decision.

At stop-out:

| | |
|---|---|
| Loss | 324 × $10 = **$3,237** |
| Remaining equity | $1,763 |
| **Percentage of account lost** | **65%** |

You did not lose 50%. You lost 65%, because the close-out threshold is measured against
margin, not against your account. And from $1,763 you need a **184% gain** to get back to
$5,000.

One trade. No crash. A 3% move in the most liquid market on earth.

## The same account, correctly sized

$5,000 account, risking 1% ($50) with a 30-pip stop.

```
Position size = 50 / (30 × 0.0001) = 16,667 units ≈ 0.16 lots
```

| | |
|---|---|
| Notional | 16,000 × 1.0900 = $17,440 |
| Initial margin | $581 |
| Pip value | $1.60 |
| Equity | $5,000 |
| Margin level | 5,000 / 581 = **861%** |
| Effective leverage | **3.5:1** |
| Loss if stopped out | **$48** (1.0% of account) |

For stop-out to occur, equity must fall to $291, meaning a loss of $4,709, meaning a
**2,943-pip adverse move** — a 27% move in EUR/USD. The pair has not moved that far in a
year, let alone a day.

| | Oversized | Correctly sized |
|---|---|---|
| Position | 1.0 lot | 0.16 lots |
| Effective leverage | 21.8:1 | 3.5:1 |
| Margin level | 138% | 861% |
| Move to margin call | 141 pips | 2,573 pips |
| Move to stop-out | 324 pips | 2,943 pips |
| Loss at stop-out | 65% of account | Effectively unreachable |

Same account. Same instrument. Same market. The only variable is position size, and it
changes the outcome from "one bad week ends me" to "stop-out is not a realistic event".

**This comparison is the most important table in the course.** If you remember one thing
from Module 4, remember that stop-out is not a risk control. It is what happens when your
risk control was absent.

## Multiple positions

Close-out is computed on the aggregate, and the broker chooses what to close — usually
the largest loser first, though the order is set out in the terms.

$10,000 account:

| Position | Notional | Margin |
|---|---|---|
| 0.6 lots EUR/USD | $65,400 | $2,180 |
| 0.4 lots GBP/USD | $50,800 | $1,693 |
| 8 CFDs US 500 | $41,200 | $2,060 |
| **Total** | **$157,400** | **$5,933** |

Margin level = 10,000 / 5,933 = 169%. Effective leverage = 15.7:1.

Close-out at 50% requires equity of $2,967, a cumulative loss of **$7,033** — just 4.5% of
total notional. If a risk-off session moves all three against you simultaneously, and
these three are correlated enough that it will, 4.5% is one bad day.

**Correlation is the trap.** Three positions feel like diversification. If EUR/USD,
GBP/USD and US 500 all fall on a strong dollar and risk-off move, you hold one position in
three costumes. Module 6.5 covers this.

## What close-out actually feels like

Mechanically:

1. Positions are closed at market, at whatever price is available.
2. In a fast market, fills are worse than the quoted price.
3. It happens at the worst moment, by construction — peak adverse movement.
4. Closure is often immediately followed by a reversal, because forced liquidation is
   itself a source of the final push.

That last point deserves emphasis. Being stopped out at the low and watching the market
recover is not bad luck. Forced liquidations cluster at extremes, and you were part of
the cluster. Sizing that puts you in that cluster is the problem, not the timing.

## Preventing it

Close-out should be a theoretical concept you never encounter. Four controls:

1. **Size from a risk budget**, never from available margin. Module 6.
2. **Keep effective leverage under 5:1** while learning. Below 2:1 is better.
3. **Use stop losses on every position**, placed where your analysis is invalidated, not
   where the loss becomes uncomfortable.
4. **Maintain free margin well above used margin.** Margin level above 300% at all times.

If you ever see a margin call, treat it as a serious failure of process, not a market
event. Close everything, and do not reopen until you have found the sizing error.

## Key points

- Margin call is a warning; stop-out is automatic and forced
- Close-out is at 50% of required **initial margin**, not 50% of your account
- An oversized position can lose 65% of the account before close-out triggers
- Correct sizing pushes stop-out into the realm of moves that do not occur
- Close-out is computed across all positions, and correlated positions fail together
- Forced liquidation happens at the worst available price, often near a reversal

## Exercise 04.3

**(a)** $8,000 account, long 1.5 lots EUR/USD at 1.0900 at 30:1. Calculate margin, margin
level, the pip move to a 100% margin call, and the pip move to 50% stop-out. State the
loss at stop-out in dollars and as a percentage of the account.

**(b)** Repeat for the same account sized at 1% risk with a 40-pip stop. Compare the two
sets of figures in a table and write one sentence summarising the difference.

**(c)** $15,000 account: 1.0 lot EUR/USD at 1.0880, 0.8 lots USD/CHF at 0.8820, 12 CFDs
US 500 at 5,160. Build the margin table, state margin level and effective leverage, and
calculate the cumulative loss that triggers close-out.

**(d)** For (c), identify the correlation risk. Which of these three would you expect to
move together in a strong-dollar risk-off session, and in which direction?

**(e)** You are stopped out and left with 35% of your account. Calculate the gain required
to return to break-even. Then calculate how many consecutive 1%-risk winning trades at 2:1
reward-to-risk that represents.

**(f)** On demo, deliberately open an oversized position — something near 20:1 effective
leverage — with no stop loss. Watch the margin level as it moves. Close it before any real
damage. Write down what you observed about how fast margin level falls relative to price.
Do this once, on demo, so that you never need to learn it live.

---

Next: [04.4 — Gap risk and negative balance protection](04-gap-risk.md)
