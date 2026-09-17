# 03.1 — Contract Size, Lots and Units

## The problem this solves

"I bought 2 lots of EUR/USD" tells you nothing about the size of the bet until you know
what a lot is. Contract size is the bridge between the number you type into the platform
and the amount of money actually at risk.

Getting this wrong is the most common catastrophic beginner error, and it is entirely
avoidable arithmetic.

## FX lot sizes

| Name | Units of base currency | Common platform notation |
|---|---|---|
| Standard lot | 100,000 | 1.00 |
| Mini lot | 10,000 | 0.10 |
| Micro lot | 1,000 | 0.01 |
| Nano lot | 100 | 0.001 (not all brokers) |

**Units = lots × 100,000** for standard FX.

The first thing to check on any new platform: does the size field take lots or units?
Typing "10000" into a field expecting lots is a 10,000-lot order — a billion units. It
will be rejected, but the reverse error is not always caught, and typing "1" into a field
expecting lots when you meant 1,000 units is a 100x oversize that will be accepted.

## Notional value

**Notional value = units × current price**

This is the real economic exposure. It is the number to think in, not lots.

| Position | Units | Price | Notional |
|---|---|---|---|
| 1.00 lot EUR/USD | 100,000 | 1.0850 | $108,500 |
| 0.10 lot EUR/USD | 10,000 | 1.0850 | $10,850 |
| 0.01 lot EUR/USD | 1,000 | 1.0850 | $1,085 |
| 1.00 lot USD/JPY | 100,000 | 150.00 | $100,000 |

Note the USD/JPY row. When USD is the **base** currency, the notional in USD is simply
the units, because you are buying or selling 100,000 dollars. When USD is the **quote**
currency, as in EUR/USD, notional in USD is units × price.

### The sanity check that prevents disasters

Before every trade, ask: **what is my notional exposure, and how does it compare to my
account balance?**

On a $2,000 account, one standard lot of EUR/USD is $108,500 of exposure. That is **54
times your account**. A 1.85% adverse move in the underlying takes your entire account to
zero.

The platform will let you do this. The margin requirement at 30:1 is only $3,617, which
you do not have, so in practice it would be rejected — but 0.05 lots is permitted, and
that is still $5,425 of exposure on a $2,000 account, or 2.7x leverage.

Do this calculation before every trade until it is automatic.

## Non-FX contract sizes

Contract size varies by instrument and by broker. There is no convention to rely on; you
must read the specification.

Common patterns:

| Instrument type | Typical contract size | Notes |
|---|---|---|
| Index CFD | 1 CFD = 1 × index point | 1 CFD of US 500 at 5,000 = $5,000 notional |
| Gold (XAU/USD) | 1 lot = 100 troy ounces | At $2,400, 1 lot = $240,000 |
| Silver (XAG/USD) | 1 lot = 5,000 troy ounces | At $30, 1 lot = $150,000 |
| WTI crude | 1 lot = 1,000 barrels | At $78, 1 lot = $78,000 |
| Share CFD | 1 CFD = 1 share | Simple, but check for ADR ratios |

Gold catches people out constantly. A "1 lot" gold position sounds comparable to a 1 lot
FX position. At 100 ounces and $2,400 an ounce, it is $240,000 of notional — more than
twice a standard EUR/USD lot. Minimum sizes of 0.01 lots exist for exactly this reason.

## Minimum and maximum sizes

Every instrument has a minimum trade size and a step increment. Typical minimums are 0.01
lots for FX, and either 0.1 or 1 CFD for indices and shares.

This constrains small accounts in a way that is not obvious until you hit it. Suppose you
have $500 and want to risk 1% ($5) per trade with a 30-pip stop. The required position
size is $5 / (30 pips × pip value per unit). At 0.01 lots, pip value is $0.10, so a 30-pip
stop risks $3.00 — workable. At 0.1 lots the same stop risks $30, which is 6% of the
account.

**On a small account, the minimum trade size may make correct position sizing impossible
for some instruments.** When that happens the answer is a different instrument or a
larger stop distance, never a larger risk percentage. Module 6 returns to this.

Maximum sizes also exist, usually far above anything relevant to a retail account, and
sometimes reduced during volatile conditions.

## Worked examples

**Example 1.** You buy 0.25 lots of GBP/USD at 1.2650.
Units = 0.25 × 100,000 = 25,000.
Notional = 25,000 × 1.2650 = **$31,625**.

**Example 2.** You buy 3 CFDs of Germany 40 at 18,400. Contract size is 1 CFD per index
point, quoted in EUR.
Notional = 3 × 18,400 = **€55,200**.
With a USD account at EUR/USD 1.0850, that is €55,200 × 1.0850 = **$59,892**.

**Example 3.** You short 0.05 lots of gold at $2,410. Contract size 100 oz.
Units = 0.05 × 100 = 5 ounces.
Notional = 5 × 2,410 = **$12,050**.

**Example 4.** You buy 150 share CFDs at $87.40.
Notional = 150 × 87.40 = **$13,110**.
At 20% margin, you post $2,622.

## The pre-trade size check

Three numbers, every time, before you click:

1. **Units** — lots × contract size
2. **Notional** — units × price, converted to your account currency
3. **Notional ÷ account balance** — your effective leverage on this one position

If number 3 is above 5, you should have a specific reason. If it is above 10, you almost
certainly do not.

## Key points

- Standard FX lot is 100,000 units; mini 10,000; micro 1,000
- Notional = units × price, and notional is the number that matters
- Non-FX contract sizes vary wildly; gold at 100 oz per lot is the classic trap
- Minimum trade sizes can make correct sizing impossible on small accounts
- Always compute notional and compare it to your balance before trading

## Exercise 03.1

Compute units and notional for each. Convert to USD where needed.

**(a)** 0.40 lots EUR/USD at 1.0920
**(b)** 1.5 lots USD/JPY at 149.30
**(c)** 0.02 lots gold at $2,385 (100 oz per lot)
**(d)** 8 CFDs of UK 100 at 8,150, quoted in GBP, with GBP/USD at 1.2700
**(e)** 320 share CFDs at $54.75
**(f)** 0.10 lots WTI crude at $79.20 (1,000 barrels per lot)

**(g)** You have a $3,000 account. For each position above, state the effective leverage
(notional ÷ balance). Which are defensible for a beginner and which are not?

Check your answers with:
```bash
python3 ../../tools/cfd_calc.py notional --units 40000 --price 1.0920
```

---

Next: [03.2 — Pip value and tick value](02-pip-value.md)
