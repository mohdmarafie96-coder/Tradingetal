# Module 03 — Contract Mechanics

**Time:** ~5 hours · **Prerequisites:** Modules 00–02

This is the arithmetic. Position sizing, pip value, profit and loss, and the full cost of
a round trip. It is the least glamorous module in the course and the one with the highest
return on effort.

A trader who can do this arithmetic quickly and reliably will size positions correctly
under pressure. One who cannot will guess, and guessing about position size is how
accounts are lost.

**Work every example by hand.** Use `tools/cfd_calc.py` only to check your answers.

## Lessons

1. [Contract size, lots and units](01-contract-size.md)
2. [Pip value and tick value](02-pip-value.md)
3. [Calculating profit and loss](03-calculating-pnl.md)
4. [The full cost of a trade](04-costs.md)

## Learning outcomes

By the end of this module you can:

- Convert between lots, units and notional value for any instrument
- Calculate pip value in the quote currency and convert it to your account currency
- Compute gross and net P&L for a long or short position, including all costs
- Calculate spread cost, commission and overnight financing from broker specifications
- Compare a raw-spread-plus-commission account against a spread-only account correctly
- Estimate the total annual cost of holding a position

## Key formulas

Full list in the [formula sheet](../../reference/formula-sheet.md).

```
Notional value   = units × price
Pip value (quote ccy) = pip size × units
P&L (long)       = (exit − entry) × units
P&L (short)      = (entry − exit) × units
Spread cost      = spread × units
Daily financing  ≈ notional × (benchmark ± markup) / day count
```

## Quiz

[Module 03 quiz](quiz.md) — 12 questions, all computational.
