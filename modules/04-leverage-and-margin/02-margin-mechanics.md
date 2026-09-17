# 04.2 — Margin, Equity and Margin Level

## The five numbers on your platform

Every CFD platform displays these. Most beginners watch the wrong one.

| Term | Meaning |
|---|---|
| **Balance** | Realised cash. Only changes when a position closes or you deposit/withdraw. |
| **Equity** | Balance + unrealised P&L. Your account's real value right now. |
| **Used margin** | Capital reserved against open positions. Not spent, but not available. |
| **Free margin** | Equity − used margin. What is available for new positions or to absorb losses. |
| **Margin level** | (Equity / used margin) × 100%. The health metric. |

```
Equity       = Balance + Unrealised P&L
Free margin  = Equity − Used margin
Margin level = (Equity / Used margin) × 100%
```

**Balance is the number beginners watch and the least informative one.** With open
positions, balance is stale. It does not move while your account is being destroyed.
Equity is the truth.

## Margin is reserved, not spent

A common misunderstanding: margin is not a payment. It remains your money. It is
ring-fenced as collateral while the position is open and released in full when it closes.

What you actually lose is P&L. Margin is the accounting mechanism that ensures you have
enough equity to cover plausible losses.

## Margin level, step by step

Start with a $5,000 account, no positions.

| | |
|---|---|
| Balance | $5,000 |
| Equity | $5,000 |
| Used margin | $0 |
| Free margin | $5,000 |
| Margin level | undefined (no positions) |

**Open 0.5 lots EUR/USD at 1.0900**, 30:1 leverage. Notional = 50,000 × 1.0900 = $54,500.
Margin = 54,500 / 30 = $1,817. Pip value = $5.00.

| | |
|---|---|
| Balance | $5,000 |
| Unrealised P&L | $0 (ignoring spread for clarity) |
| Equity | $5,000 |
| Used margin | $1,817 |
| Free margin | $3,183 |
| Margin level | 5,000 / 1,817 = **275%** |

**Price falls 40 pips** to 1.0860. Loss = 40 × $5 = $200.

| | |
|---|---|
| Balance | $5,000 (unchanged — nothing closed) |
| Unrealised P&L | −$200 |
| Equity | $4,800 |
| Used margin | $1,810 (recalculated at the new price) |
| Free margin | $2,990 |
| Margin level | 4,800 / 1,810 = **265%** |

Notice the balance did not move. A trader watching balance sees nothing wrong.

**Price falls a further 200 pips** to 1.0660. Cumulative loss = 240 × $5 = $1,200.

| | |
|---|---|
| Balance | $5,000 |
| Unrealised P&L | −$1,200 |
| Equity | $3,800 |
| Used margin | $1,777 |
| Free margin | $2,023 |
| Margin level | 3,800 / 1,777 = **214%** |

Still healthy. Now consider what happens with a much larger position, which is the
scenario that actually destroys accounts.

## The same account, oversized

Same $5,000, but **2.5 lots** EUR/USD at 1.0900. Notional = 250,000 × 1.0900 = $272,500.
Margin = $9,083 — more than the account, so this would be rejected.

Try **2.0 lots**. Notional = $218,000. Margin = $7,267. Still rejected.

**1.3 lots.** Notional = $141,700. Margin = $4,723. Just fits.

| | |
|---|---|
| Equity | $5,000 |
| Used margin | $4,723 |
| Free margin | $277 |
| Margin level | **106%** |
| Pip value | $13.00 |
| Effective leverage | 141,700 / 5,000 = **28:1** |

A 20-pip adverse move costs $260 and takes free margin to near zero. A 21-pip move takes
margin level below 100%.

**Twenty-one pips.** EUR/USD covers that in a quiet hour.

This is what "using the maximum leverage available" means in practice, and it is why the
platform permitting a trade is not evidence that the trade is sane.

## Margin level thresholds

| Margin level | State |
|---|---|
| Above 500% | Comfortable |
| 200% – 500% | Normal for a well-sized account |
| 100% – 200% | Elevated; no capacity for new positions |
| At 100% | Equity equals used margin; usually no new positions permitted |
| **At 50%** | **Mandatory close-out begins (UK/EU/AU retail)** |

Note what the close-out rule is: **not** 50% of your account, but 50% of the **initial
margin required for your open positions**. Those are very different numbers, and mixing
them up is a common error. Lesson 04.3 works through it.

## Margin on multiple positions

Used margin is the sum across positions. Margin level is computed on the aggregate.

$8,000 account holding:

| Position | Notional | Margin % | Margin |
|---|---|---|---|
| 0.4 lots EUR/USD at 1.0900 | $43,600 | 3.33% | $1,452 |
| 0.2 lots GBP/USD at 1.2700 | $25,400 | 3.33% | $846 |
| 6 CFDs US 500 at 5,150 | $30,900 | 5% | $1,545 |
| 150 share CFDs at $42 | $6,300 | 20% | $1,260 |
| **Total** | **$106,200** | | **$5,103** |

| | |
|---|---|
| Equity (no unrealised P&L yet) | $8,000 |
| Used margin | $5,103 |
| Free margin | $2,897 |
| Margin level | **157%** |
| Effective leverage | **13.3:1** |

Each individual position looks reasonable. The aggregate is not. Margin level at 157%
means a cumulative unrealised loss of about $5,450 triggers close-out — roughly 5% of
total notional, which several of these instruments can produce in a single session,
especially if they move together.

**Hedged positions may net.** On many platforms, a long and a short in the same
instrument require margin on the net exposure rather than both legs. This is one of the
few genuine arguments for hedging rather than closing, and it is usually outweighed by
the doubled spread and financing.

## Margin is recalculated continuously

Two things change used margin while a position is open:

1. **Price movement.** Notional changes, so margin changes. A long position that moves
   against you requires slightly less margin, which mildly softens the decline in margin
   level. A long that moves in your favour requires more.
2. **Broker changes.** Brokers may raise margin requirements ahead of known risk events —
   elections, referendums, major central bank decisions — sometimes at short notice, and
   sometimes on existing positions.

That second point catches people. A margin increase from 5% to 10% before an election
doubles your used margin, halves your margin level, and can force you to close positions
at an unfavourable moment. Check for margin change notices before holding through a
scheduled event.

## What to monitor

Two numbers, glanced at regularly:

1. **Margin level** — above 300% during normal operation. Below 200% means you are
   oversized.
2. **Effective leverage** — total notional / equity. Under 5:1 while learning.

If you find yourself needing to check margin level frequently, that is itself the signal.
A correctly sized account sits at a margin level so high it is uninteresting.

## Key points

- Equity = balance + unrealised P&L; equity is the real number, balance is stale
- Used margin is reserved, not spent, and is returned when the position closes
- Margin level = equity / used margin × 100%, and it governs close-out
- Close-out is at 50% of **required initial margin**, not 50% of your account
- Used margin aggregates across positions, and so does the risk
- Brokers can raise margin requirements, including on open positions, before known events

## Exercise 04.2

**(a)** $6,000 account. Open 0.8 lots EUR/USD at 1.0850 at 30:1. Calculate notional,
margin, free margin and margin level.

**(b)** Price moves to 1.0790. Recalculate unrealised P&L, equity, used margin, free
margin and margin level.

**(c)** $12,000 account holding: 0.5 lots GBP/USD at 1.2680; 10 CFDs Germany 40 at 18,250
with EUR/USD 1.0900; 300 share CFDs at $37.20. Build the full margin table and state
effective leverage.

**(d)** For the account in (c), how much cumulative unrealised loss brings margin level to
100%? Express it as a percentage of total notional.

**(e)** Your broker announces that margin on Germany 40 rises from 5% to 10% tomorrow,
ahead of an election. Using the account in (c), what is your new margin level? What are
your options?

**(f)** On your demo account, open a position and record balance, equity, used margin,
free margin and margin level. Leave it open overnight and record all five again. Explain
every number that changed and why.

---

Next: [04.3 — Margin call and stop-out](03-margin-call.md)
