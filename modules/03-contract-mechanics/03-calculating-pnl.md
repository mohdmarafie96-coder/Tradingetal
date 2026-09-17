# 03.3 — Calculating Profit and Loss

## The core formulas

> **Long:** P&L = (exit price − entry price) × units
> **Short:** P&L = (entry price − exit price) × units

Both are in the quote currency, and both are **gross** — before costs.

Equivalently, in pip terms:

> **P&L = pips gained × pip value**

Use whichever is convenient. The unit-based form generalises to any instrument; the pip
form is faster mentally for FX.

## Using the correct prices

The single most common error in P&L calculation is using the same price on both sides.
You do not. Recall Module 01.2:

| | Open at | Close at |
|---|---|---|
| Long | **Ask** | **Bid** |
| Short | **Bid** | **Ask** |

If you calculate using mid prices, your answer will be optimistic by exactly one spread.
Most platforms display entry and exit at the prices you actually got, so the spread is
already inside the numbers. When working by hand, be explicit about which price you are
using.

## Worked example: a long trade

Long 0.4 lots EUR/USD, USD account.

| | |
|---|---|
| Units | 40,000 |
| Entry (ask) | 1.08520 |
| Exit (bid) | 1.08890 |
| Price change | +0.00370 = +37 pips |
| Pip value | 0.0001 × 40,000 = $4.00 |

Gross P&L, two ways:

```
(1.08890 − 1.08520) × 40,000 = 0.00370 × 40,000 = $148.00
37 pips × $4.00                                  = $148.00
```

Now costs. Commission $3.50 per lot per side; held 2 nights at −$2.10 per night for this
size.

| Item | Amount |
|---|---|
| Gross P&L | +$148.00 |
| Commission in (0.4 × $3.50) | −$1.40 |
| Commission out | −$1.40 |
| Financing, 2 nights | −$4.20 |
| **Net P&L** | **+$141.00** |

Costs consumed 4.7% of the gross profit. On a smaller winner the proportion is much
larger, and on a 10-pip scalp it can exceed 100%.

## Worked example: a short trade

Short 0.25 lots GBP/USD, USD account.

| | |
|---|---|
| Units | 25,000 |
| Entry (bid) | 1.26800 |
| Exit (ask) | 1.26450 |
| Price change | −0.00350, favourable = +35 pips |
| Pip value | 0.0001 × 25,000 = $2.50 |

```
Gross P&L = (1.26800 − 1.26450) × 25,000 = 0.00350 × 25,000 = $87.50
            35 pips × $2.50                                  = $87.50
```

Costs: commission $3.50/lot/side, and a **positive** swap of +$0.55 per night for 3
nights because you are short the lower-yielding currency.

| Item | Amount |
|---|---|
| Gross P&L | +$87.50 |
| Commission both sides (0.25 × $3.50 × 2) | −$1.75 |
| Financing, 3 nights at +$0.55 | +$1.65 |
| **Net P&L** | **+$87.40** |

## Worked example: a losing trade

This is the one to study, because losses are the majority of trades for almost everyone.

Long 0.6 lots USD/JPY at 149.80, stopped out at 149.35. USD account.

| | |
|---|---|
| Units | 60,000 |
| Price change | −0.45 = −45 pips |
| Pip value in JPY | 0.01 × 60,000 = ¥600 |
| Pip value in USD at exit price 149.35 | 600 / 149.35 = $4.018 |

```
Gross P&L in JPY = (149.35 − 149.80) × 60,000 = −¥27,000
Gross P&L in USD = −27,000 / 149.35            = −$180.78
```

Note that the conversion uses the rate at **close**, because that is when the JPY loss is
converted. Platforms handle this automatically; when working by hand, use the closing
rate.

| Item | Amount |
|---|---|
| Gross P&L | −$180.78 |
| Commission both sides | −$4.20 |
| Financing, 1 night | −$2.90 |
| **Net loss** | **−$187.88** |

The loss is 3.9% larger than the raw price move suggests. Costs make losses bigger and
winners smaller, always, in both directions. Any strategy evaluated on gross price moves
is being evaluated optimistically.

## Non-FX examples

**Index.** Long 4 CFDs US 500. Entry 5,118.0 (ask), exit 5,144.5 (bid).
Move = +26.5 points. Point value = 4 × $1 = $4.00.
Gross P&L = 26.5 × 4 = **+$106.00**.

**Share.** Short 300 share CFDs. Entry $64.20 (bid), exit $61.95 (ask).
Move = −$2.25, favourable.
Gross P&L = 2.25 × 300 = **+$675.00**.
Then: commission (often 0.1% of notional per side, minimum charge), financing, and a
dividend debit if held over an ex-date.

**Gold.** Long 0.05 lots at $2,395.00, exit $2,388.50. Contract 100 oz, so 5 oz.
Move = −$6.50. Gross P&L = −6.50 × 5 = **−$32.50**.

## Unrealised versus realised

**Unrealised (floating) P&L** is the value of open positions marked to the price at which
you could close right now. It moves every tick. It is not money you have.

**Realised P&L** is locked in when the position closes. It is money.

Two things follow from this distinction.

First, **equity, not balance, is what matters** while positions are open:

```
Equity = Balance + Unrealised P&L
```

Margin calculations in Module 4 all use equity. A trader watching balance while equity
collapses is watching the wrong number.

Second, unrealised profit is psychologically treated as owned, which is why giving back
an open profit feels like a loss rather than a smaller gain. Module 9 covers this.

## Percentage returns and the asymmetry of recovery

A loss requires a larger percentage gain to recover than the percentage lost:

| Loss | Gain needed to recover |
|---|---|
| 10% | 11.1% |
| 20% | 25% |
| 30% | 42.9% |
| 50% | **100%** |
| 70% | 233% |
| 90% | **900%** |

The formula:

```
Recovery gain = 1 / (1 − loss fraction) − 1
```

This is arithmetic, not psychology, and it is the central argument for small position
sizes. Capital preservation is not caution; it is the only thing that keeps the required
recovery in the realm of the possible.

Module 6.4 develops this into a full treatment of drawdown.

## Key points

- Long P&L = (exit − entry) × units; short P&L = (entry − exit) × units
- Long opens at ask and closes at bid; short opens at bid and closes at ask
- P&L is in the quote currency and must be converted, at the closing rate
- Costs shrink winners and enlarge losses, without exception
- Equity = balance + unrealised P&L, and equity is what margin is measured against
- Recovering a 50% loss requires a 100% gain

## Exercise 03.3

Calculate gross P&L, total costs and net P&L. Assume a USD account and $3.50 per lot per
side commission unless stated.

**(a)** Long 0.8 lots EUR/USD, entry 1.09140, exit 1.09455, held 1 night at −$4.30.

**(b)** Short 0.35 lots GBP/USD, entry 1.27200, exit 1.27640, held 2 nights at −$1.85 per
night. (Note the direction of the move carefully.)

**(c)** Long 1.2 lots USD/JPY, entry 148.90, exit 149.72, held 4 nights at +$6.10 per
night.

**(d)** Short 6 CFDs of Germany 40, entry 18,420, exit 18,338, EUR/USD at 1.0880. No
commission; financing −$3.20 total.

**(e)** Long 500 share CFDs at $31.80, exit $30.95. Commission 0.10% of notional per side
with a $10 minimum. Held 5 nights at −$2.75 per night, and the stock went ex-dividend
during the hold with a net dividend of $0.22.

**(f)** Your account is $5,000. You lose 8%, then 12%, then 15% in consecutive months.
What is your balance? What percentage gain returns you to $5,000?

**(g)** A strategy averages +18 pips on winners and −12 pips on losers, winning 45% of
the time, trading 0.2 lots. Round-trip costs are $1.40 commission plus a 1.1 pip spread.
What is the expected value per trade, gross and net? How many trades per month before
costs alone exceed a $200 monthly profit target?

---

Next: [03.4 — The full cost of a trade](04-costs.md)
