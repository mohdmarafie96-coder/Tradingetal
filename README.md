# Trading et al — CFD Trading Fundamentals

A complete, self-paced course covering the basics of trading Contracts for Difference
(CFDs): what the contract is, how the arithmetic works, what it costs, how leverage and
margin behave, how to manage risk, and how to build and test a trading plan.

> ### Read this first
> **[RISK-DISCLOSURE.md](RISK-DISCLOSURE.md)** — 70% to 85% of retail CFD accounts lose
> money. CFDs are not available to retail clients in the United States. This course is
> education, not financial advice, and it will not make you money. Read the disclosure
> in full before Module 1.

**Read it in the browser:** <https://cfd-trading-fundamentals-hnvntf.v2.appdeploy.ai/>

The web version renders these same files with sidebar navigation, progress tracking,
full-text search and an interactive calculator. Source in [`web/`](web/).

---

## Who this course is for

Someone who has heard of CFD trading, is considering it, and wants an honest,
numerate explanation before risking anything. No prior trading experience is assumed.
You need arithmetic, a calculator, and patience.

You do **not** need money to take this course. Every practical exercise runs on a free
demo account.

## What you will be able to do at the end

1. Explain what a CFD is, how it differs from owning the underlying asset, and who the
   counterparty is.
2. Calculate position size, margin requirement, pip value, profit and loss, and total
   round-trip cost for any CFD trade, by hand.
3. Predict what happens to your account at a given adverse price move, including when a
   margin call and stop-out occur.
4. Place and manage orders, and explain what slippage and gapping do to a stop loss.
5. Size positions from a fixed risk budget rather than from a leverage figure.
6. Read a price chart, describe market structure, and use a small number of indicators
   without over-reading them.
7. Write a trading plan with defined entry, exit, sizing and review rules, and test it
   without risking money.
8. Judge whether CFD trading is a reasonable activity for you, with reasons.

## Course structure

Twelve modules, each with an overview, three or four lessons, worked examples, exercises
and a quiz. Estimated total time is **35 to 45 hours** of study, plus an 8-week practice
programme in the capstone.

| # | Module | Focus | Time |
|---|--------|-------|------|
| 00 | [Before You Start](modules/00-before-you-start/) | Risk, expectations, setup | 1h |
| 01 | [Market Foundations](modules/01-market-foundations/) | Prices, spreads, participants | 3h |
| 02 | [What a CFD Actually Is](modules/02-what-is-a-cfd/) | The contract, long and short | 4h |
| 03 | [Contract Mechanics](modules/03-contract-mechanics/) | Sizing, pip value, P&L, costs | 5h |
| 04 | [Leverage and Margin](modules/04-leverage-and-margin/) | Margin, equity, stop-out | 5h |
| 05 | [Orders and Execution](modules/05-orders-and-execution/) | Order types, slippage, gaps | 4h |
| 06 | [Risk Management](modules/06-risk-management/) | Position sizing, expectancy, drawdown | 6h |
| 07 | [Market Analysis](modules/07-market-analysis/) | Charts, structure, indicators, news | 5h |
| 08 | [Building a Trading Plan](modules/08-trading-plan/) | Edge, rules, journaling, testing | 5h |
| 09 | [Trading Psychology](modules/09-trading-psychology/) | Biases, discipline, tilt | 3h |
| 10 | [Operations](modules/10-operations/) | Brokers, platforms, records, scams | 4h |
| 11 | [Capstone](modules/11-capstone/) | Your plan, 8-week demo programme | 8h+ |

## Reference material

- **[Glossary](reference/glossary.md)** — every term used in the course, defined.
- **[Formula sheet](reference/formula-sheet.md)** — every calculation on one page.
- **[Worked examples](reference/worked-examples.md)** — ten full trades, start to finish.
- **[Quiz answers](reference/quiz-answers.md)** — answers and explanations for all quizzes.
- **[Further reading](reference/further-reading.md)** — books, regulators, primary sources.

## Templates

Copy these into your own working folder and fill them in.

- **[Trading plan template](templates/trading-plan-template.md)**
- **[Trade journal template](templates/trade-journal-template.csv)**
- **[Pre-trade checklist](templates/pre-trade-checklist.md)**
- **[Weekly review template](templates/weekly-review-template.md)**
- **[Monthly review template](templates/monthly-review-template.md)**

## Tools

A dependency-free Python calculator for the arithmetic taught in Modules 3, 4 and 6.

```bash
python3 tools/cfd_calc.py position-size --balance 10000 --risk-pct 1 \
    --entry 1.0850 --stop 1.0800 --pip-value 10 --pip-size 0.0001

python3 tools/cfd_calc.py margin --units 100000 --price 1.0850 --leverage 30

python3 tools/cfd_calc.py expectancy --win-rate 0.40 --avg-win 300 --avg-loss 100
```

See [tools/README.md](tools/README.md) for the full command list. Run the test suite
with `python3 -m unittest discover -s tools -v`.

## How to use this course

Work through the modules in order. The arithmetic in Modules 3 and 4 is load-bearing for
everything after it; do not skip it because it looks tedious.

For each module:

1. Read the module overview.
2. Read each lesson and work the examples **with a calculator in hand**. Reading a
   worked example is not the same as being able to produce one.
3. Do the exercises before looking at the answers.
4. Take the quiz. If you score below 80%, reread the lesson rather than moving on.
5. Log anything you did not understand. Unresolved confusion compounds.

Pace yourself at one module per week. Rushing this material is the cheapest mistake
available to you and almost nobody takes it.

## Conventions used throughout

- Prices are given in the instrument's own quote convention.
- Currency examples use USD and EUR unless the point depends on something else.
- Account currency is assumed to be USD unless stated; where it matters, it is stated.
- **All numbers are illustrative.** Spreads, financing rates, leverage caps and contract
  sizes differ by broker, instrument and jurisdiction, and they change. Always check
  your own broker's contract specification.
- Worked examples state their assumptions explicitly so you can substitute your own.

## Licence and status

Educational material, provided as-is with no warranty. Not financial advice. See
[RISK-DISCLOSURE.md](RISK-DISCLOSURE.md).
