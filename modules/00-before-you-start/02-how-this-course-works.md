# 00.2 — How This Course Works

## Structure

Twelve modules. Each has an overview, three or four lessons, worked examples, exercises
and a quiz. Modules build on each other in order, and the order is not cosmetic:

- **Modules 1 and 2** establish what you are actually trading.
- **Modules 3 and 4** are the arithmetic. Everything after depends on them.
- **Module 5** covers how orders behave in reality rather than in theory.
- **Module 6** is risk management and is, in practice, the most important module.
- **Modules 7 and 8** cover analysis and turning it into a written plan.
- **Module 9** covers why people abandon plans.
- **Modules 10 and 11** cover operating in the real world and a structured practice
  programme.

If you read only three modules, read 3, 4 and 6. If you read only one, read 6.

## Study method

The failure mode with material like this is recognition mistaken for competence. You
read a worked example, it makes sense, you move on, and two weeks later you cannot
reproduce it. Guard against that:

**Work every example by hand first.** Cover the solution. Compute it yourself. Then
compare. The gap between "I follow this" and "I can produce this" is the whole point.

**Use the calculator tool to check, not to replace.** `tools/cfd_calc.py` exists so you
can verify your own arithmetic. If you reach for it before attempting the calculation,
it is doing you harm.

**Keep a confusion log.** One file, append-only. Every time something does not quite
land, write the question down rather than continuing past it. Revisit it at the end of
each module. Unresolved confusion in Module 3 becomes a blown account in Module 11.

**Do the quizzes closed-book.** Below 80% means reread, not proceed.

## Pacing

One module per week is a sensible default. That puts the course at about three months,
which is roughly the right order of magnitude for genuinely absorbing it.

You can go faster. The risk of going faster is that the arithmetic in Modules 3 and 4
never becomes automatic, and you spend the rest of the course doing it slowly and
occasionally wrong, which in live trading means mis-sized positions.

## Practice environment

Everything practical in this course runs on a **demo account**. You will not fund a live
account during the course. Module 00.3 covers setup.

The demo is not optional and it is not a formality. Modules 5, 7, 8 and 11 have
exercises that require you to place, manage and close real orders in a real platform
against real price data.

## Notation and conventions

| Symbol | Meaning |
|--------|---------|
| Bid | Price at which you can sell; the lower of the two quotes |
| Ask (or Offer) | Price at which you can buy; the higher of the two quotes |
| Spread | Ask − Bid |
| Pip | Standard smallest quoted increment for an FX pair (0.0001 for most; 0.01 for JPY pairs) |
| Point / Tick | Smallest price increment for non-FX instruments |
| Lot | Standard contract quantity; 100,000 units for standard FX lots |
| P&L | Profit and loss |
| R | One unit of risk — the amount you lose if a trade hits its stop |

All currency examples use USD as the account currency unless stated otherwise. Where the
account currency changes the answer, the lesson says so and shows the conversion.

**Every number in this course is illustrative.** Spreads, financing rates, contract sizes
and leverage caps vary by broker, instrument, account type and jurisdiction, and they
change over time. The method is what transfers; the numbers are not.

## What is deliberately not covered

- Specific broker recommendations. Module 10 teaches you how to evaluate one instead.
- Specific strategies presented as profitable. Module 8 teaches you to build and test
  your own, because a strategy handed to you is one you cannot evaluate or repair.
- Automated trading and algorithmic execution. Out of scope for a fundamentals course.
- Options, futures, spread betting and other derivatives, except where a comparison
  clarifies what a CFD is.
- Tax. Jurisdiction-specific and personal. Module 10 covers record keeping only.

---

Next: [00.3 — Setting up a demo account](03-demo-account-setup.md)
