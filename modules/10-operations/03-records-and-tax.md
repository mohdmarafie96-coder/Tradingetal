# 10.3 — Records, Costs and Tax

> **This lesson is not tax advice.** Tax treatment of CFDs varies by country, by your
> personal circumstances, by whether trading is considered a business, and it changes.
> Consult a qualified professional in your jurisdiction. What follows is about record
> keeping, which is your responsibility regardless of the rules that apply to you.

## Why records matter

Three separate reasons, and the first is the one people underestimate:

1. **Tax compliance.** Most jurisdictions require you to declare trading profits. You need
   records to do that accurately, and the obligation exists whether or not your broker
   reports anything on your behalf.
2. **Performance analysis.** Module 08.3. You cannot improve without data.
3. **Dispute resolution.** If a trade is executed incorrectly, contemporaneous records are
   what support a complaint.

## What to keep

**For every trade:**
- Date and time of entry and exit
- Instrument, direction, size
- Entry and exit prices
- Gross P&L
- All costs, itemised: spread, commission, financing, conversion
- Net P&L
- Currency, and the conversion rate applied if not your account currency

**For the account:**
- Monthly statements, exported and stored yourself
- All deposits and withdrawals with dates and amounts
- Annual summary of realised P&L
- All fees charged: inactivity, withdrawal, data

**Retention:** most jurisdictions require records to be retained for five to seven years.
Check yours and keep them longer than you think you need. Brokers do not retain history
indefinitely and access ends if you close the account.

**Storage:** export monthly to a location you control. A broker's web interface is not a
record-keeping system.

## Costs you will forget

These regularly go unrecorded and therefore silently inflate your apparent performance:

| Cost | Where it appears |
|---|---|
| Overnight financing | Separate account entries, not on the trade ticket |
| Currency conversion | Embedded in the converted P&L; often invisible |
| Inactivity fees | A monthly account entry |
| Withdrawal fees | Deducted from the withdrawal |
| Dividend adjustments | Separate entries around ex-dates |
| Triple swap | One night per week at three times the rate |

**Reconcile monthly:** take your platform's realised P&L for the month, compare to the sum
of your journal's net P&L. If they differ, the difference is almost always financing.

A trader who tracks only entry and exit prices will systematically overstate performance.
The gap is often the entire difference between a profitable and unprofitable year.

## Tax treatment: the general shape

**These are general patterns, not advice, and they change.**

**United Kingdom.** CFD profits are generally subject to Capital Gains Tax. Losses can
generally be offset against gains. Spread betting is generally exempt from CGT and stamp
duty, because it is treated as a bet — with the corollary that spread betting losses are
generally not relievable. There is an annual CGT exempt amount, which has been reduced
substantially in recent years.

**European Union.** Varies entirely by member state. Some treat it as capital gains, some
as ordinary income, some have flat rates on investment income. Loss offset rules differ
widely.

**Australia.** CFD profits are generally assessable income. Whether it is treated as a
business or as investment affects how losses are handled.

**United States.** CFDs are not available to retail clients. Regulated retail forex has its
own regime under sections 988 and 1256 of the tax code, with an election available between
them.

**Everywhere:** if trading is your main activity, treatment may change from investment to
business income, with different rules on losses, expenses and social contributions.

## Practical steps

1. **Find out the rules for your jurisdiction** before you start, not at year end.
2. **Keep records from the first trade**, including demo if it helps you build the habit.
3. **Report in your local currency**, using the rate rules your jurisdiction specifies.
4. **Understand loss relief** — whether losses can be offset, against what, and whether
   they carry forward.
5. **Know what is deductible** if anything: data fees, platform costs, education.
6. **Set aside tax as you go** if you are profitable. A tax bill arriving after a losing
   quarter is a common and avoidable problem.
7. **Get professional advice** once amounts become material. The cost is small relative to
   the cost of getting it wrong.

## A record-keeping system

Minimal and sufficient:

```
trading/
  journal.csv             ← every trade, all fields
  statements/
    2026-01.pdf
    2026-02.pdf
    ...
  plan/
    trading-plan-v1.md
    trading-plan-v2.md    ← dated versions, previous retained
  reviews/
    2026-01-weekly.md
    2026-01-monthly.md
  tax/
    2026-summary.xlsx
```

Update the journal at every trade. Export statements monthly. Reconcile monthly. Compile a
summary annually.

Twenty minutes a month. Less than the cost of one avoidable error.

## Key points

- Record keeping is your responsibility regardless of what the broker provides
- Keep every trade with itemised costs, plus monthly statements you export yourself
- Financing and conversion costs are the ones most often missed
- Reconcile journal against platform monthly; the difference is usually financing
- Tax treatment varies by jurisdiction and circumstance; find out before you start
- Retain records five to seven years or as your jurisdiction requires
- Set tax aside as you go if profitable

## Exercise 10.3

**(a)** Research the tax treatment of CFD trading in your jurisdiction. Record: what it is
taxed as, the rate, whether losses are relievable and against what, and the reporting
deadline. Cite the official source.

**(b)** Set up the record-keeping folder structure above. Export your first statement.

**(c)** For one month of demo trading, reconcile your journal against the platform's
statement. Report every discrepancy and its cause.

**(d)** Calculate your total costs for that month, broken down by category. Express each as
a percentage of total costs and of gross P&L. Which category was largest?

**(e)** Write a one-page summary of your jurisdiction's requirements and keep it with your
trading plan.

---

Next: [10.4 — Scams and red flags](04-scams.md)
