# 03.2 — Pip Value and Tick Value

## What a pip is

A **pip** is the standard smallest quoted increment for an FX pair.

| Pair type | Pip size | Example |
|---|---|---|
| Most pairs | 0.0001 | EUR/USD 1.0850 → 1.0851 is 1 pip |
| JPY pairs | 0.01 | USD/JPY 150.20 → 150.21 is 1 pip |

Most platforms quote one extra decimal — a **pipette**, one tenth of a pip. EUR/USD shown
as 1.08505 has a pipette digit at the end.

This causes real errors. A trader intending a 20-pip stop who reads the platform's fifth
decimal as pips sets a 2-pip stop. Read the digits carefully: for a standard pair, the
pip is the **fourth** decimal place.

For non-FX instruments the equivalent unit is a **point** or **tick**: one index point,
one cent on a share, one cent on a barrel of crude.

## Why pip value matters

A pip is a price increment. Pip value converts it into money.

> **Pip value = pip size × units**, in the quote currency.

Once you know what one pip is worth, everything else follows: P&L is pips × pip value,
and position sizing is risk budget ÷ (stop distance in pips × pip value).

## Case 1: quote currency is your account currency

The easy case, and the reason so many examples use EUR/USD with a USD account.

EUR/USD, 1 standard lot, USD account:

```
Pip value = 0.0001 × 100,000 = $10.00
```

The familiar numbers follow directly:

| Position | Units | Pip value |
|---|---|---|
| 1.00 lot | 100,000 | $10.00 |
| 0.10 lot | 10,000 | $1.00 |
| 0.01 lot | 1,000 | $0.10 |

Anything quoted in USD against a USD account works the same way: GBP/USD, AUD/USD,
NZD/USD all give $10 per pip per standard lot.

## Case 2: base currency is your account currency

USD/JPY with a USD account. The pip value arrives in JPY and must be converted back.

```
Pip value in JPY = 0.01 × 100,000 = ¥1,000
Pip value in USD = ¥1,000 / 150.00 = $6.67
```

General form:

> **Pip value (account ccy) = (pip size × units) / current price**
> when the base currency is your account currency.

Two consequences worth noticing:

- Pip value for USD/JPY is **not** $10. It is about $6.67 at 150.00.
- Pip value **changes as price moves**. At USD/JPY 140.00, it is $7.14; at 160.00, $6.25.
  Your risk per pip drifts while the position is open.

## Case 3: neither currency is your account currency

EUR/GBP with a USD account. The pip value arrives in GBP and must be converted to USD via
GBP/USD.

```
Pip value in GBP = 0.0001 × 100,000 = £10.00
GBP/USD = 1.2700
Pip value in USD = £10.00 × 1.2700 = $12.70
```

General form:

> **Pip value (account ccy) = (pip size × units) × (quote ccy → account ccy rate)**

Get the direction of that conversion right. If the rate is quoted as GBP/USD (dollars per
pound) you **multiply** to go from pounds to dollars. If it were quoted as USD/GBP you
would divide. When unsure, sanity-check the magnitude: £10 should be worth more than $10
when a pound buys more than a dollar.

## The universal formula

All three cases are one formula:

> **Pip value (account ccy) = pip size × units × (1 unit of quote currency, expressed in
> account currency)**

- Quote currency **is** the account currency → that factor is 1
- Quote currency is foreign → that factor is the current exchange rate

Every platform displays pip value for you. Learn the formula anyway, because you need it
to size a position **before** you have entered one, which is exactly when the platform's
display is least helpful.

## Tick value for non-FX instruments

Same idea, different names.

**Index CFDs.** Usually 1 CFD = 1 index point.
US 500 at 5,120, 2 CFDs: a 1-point move is worth 2 × $1 = $2.00.
A 25-point move is worth $50.

**Share CFDs.** 1 CFD = 1 share; a tick is normally 1 cent.
400 CFDs, $0.01 move = $4.00.
A $1.50 move = $600.

**Gold.** Contract size 100 oz, tick usually $0.01.
0.10 lots = 10 oz. A $1.00 move = $10.00.

**Crude oil.** Contract size 1,000 barrels.
0.20 lots = 200 barrels. A $0.50 move = $100.00.

For non-USD-denominated instruments, convert exactly as in Case 3. A Germany 40 CFD is
quoted in euros, so the point value is in euros and must be converted for a USD account.

## Worked examples

**Example 1.** 0.30 lots EUR/USD, USD account.
Units = 30,000. Pip value = 0.0001 × 30,000 = **$3.00**.

**Example 2.** 0.50 lots USD/JPY at 148.50, USD account.
Units = 50,000. Pip value in JPY = 0.01 × 50,000 = ¥500.
In USD = 500 / 148.50 = **$3.37**.

**Example 3.** 0.20 lots EUR/GBP, USD account, GBP/USD = 1.2650.
Units = 20,000. Pip value in GBP = 0.0001 × 20,000 = £2.00.
In USD = 2.00 × 1.2650 = **$2.53**.

**Example 4.** 5 CFDs of Germany 40, USD account, EUR/USD = 1.0900.
Point value in EUR = 5 × €1 = €5.00.
In USD = 5.00 × 1.0900 = **$5.45**.

**Example 5.** 0.04 lots gold, USD account. Contract 100 oz.
Units = 4 oz. A $1.00 move = **$4.00**. A $0.10 move = $0.40.

## Why this is the gateway to position sizing

Module 6 builds everything on one rearrangement:

> **Position size = risk budget ÷ (stop distance in pips × pip value per unit)**

You risk $20. Your stop is 25 pips away. On EUR/USD, pip value per unit is 0.0001, so:

```
Units = 20 / (25 × 0.0001) = 20 / 0.0025 = 8,000 units = 0.08 lots
```

That is the whole method. It requires pip value, which requires this lesson. If pip value
is shaky, position sizing will be wrong, and position sizing is what determines whether
you survive.

## Key points

- Pip = 0.0001 for most FX pairs, 0.01 for JPY pairs; the fifth decimal is a pipette
- Pip value = pip size × units, in the **quote** currency
- Convert to account currency: multiply by the quote-to-account rate (or divide by price
  when the base is your account currency)
- When the base currency is your account currency, pip value drifts as price moves
- Non-FX instruments use point or tick value with identical logic
- Position sizing is a rearrangement of the pip value formula

## Exercise 03.2

Calculate pip or point value in USD for a USD account.

**(a)** 1.00 lot GBP/USD
**(b)** 0.25 lots EUR/USD
**(c)** 1.00 lot USD/JPY at 151.20
**(d)** 0.60 lots USD/CHF at 0.8850
**(e)** 0.15 lots EUR/JPY at 162.40, with USD/JPY at 150.10
**(f)** 12 CFDs US 500
**(g)** 3 CFDs UK 100 with GBP/USD at 1.2700
**(h)** 0.08 lots gold, per $1.00 move
**(i)** 250 share CFDs, per $0.01 move

**(j)** Using (b), how many pips of adverse movement would cost you $50?

**(k)** You have $40 to risk and a 32-pip stop on EUR/USD. What position size, in lots,
rounded down to the nearest 0.01?

Check with:
```bash
python3 ../../tools/cfd_calc.py pip-value --units 25000 --pip-size 0.0001
python3 ../../tools/cfd_calc.py pip-value --units 100000 --pip-size 0.01 --price 151.20 --base-is-account
```

---

Next: [03.3 — Calculating profit and loss](03-calculating-pnl.md)
