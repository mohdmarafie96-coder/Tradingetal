# 00.3 — Setting Up a Demo Account

## Why a demo account, specifically

You need a platform to practise in for two reasons. First, several lessons require you
to actually place orders and watch what happens. Second, the contract specification
screen on a real platform is where the numbers in Modules 3 and 4 come from, and reading
your own broker's specification is a skill in itself.

## Choosing where to open one

For course purposes, almost any regulated broker's demo will do. Prefer one that is:

- **Regulated in your jurisdiction** — FCA (UK), CySEC or a national EEA regulator (EU),
  ASIC (Australia), MAS (Singapore), FSCA (South Africa). Module 10.1 covers how to
  verify a licence rather than trusting a badge on a website.
- **Offering a demo without a deposit** and without requiring a phone call.
- **Publishing full contract specifications** — contract size, minimum size, spread,
  commission, swap rates, margin requirement per instrument.

Do not treat opening a demo as choosing a broker. You are borrowing a practice
environment. Module 10 covers selection properly, and you should expect to reconsider.

## Expect marketing contact

Opening a demo puts you on a sales list. You will get emails and probably calls
encouraging you to fund a live account, often with a bonus or a "dedicated account
manager". Anticipate it and decide now that the answer is no until you have finished
Module 11.

A note on account managers: a person who calls you to suggest trades, encourages larger
positions, or offers to trade on your behalf is a salesperson compensated on your
activity, not an adviser acting for you. Regulated firms are restricted in what they can
do here; unregulated ones are not. Module 10.4 covers this properly.

## Configure the demo to resemble reality

The default demo account is usually $50,000 or $100,000 of fake money. That is actively
harmful for learning, because position sizes that feel reasonable on $100,000 will be
ruinous on the account you would actually open.

**Set the demo balance to the amount you would realistically fund**, or if the platform
will not let you, mentally scale everything and record trades against your real intended
figure. If you would fund $2,000, practise on $2,000. Risk on a $2,000 account at 1% is
$20 per trade, and discovering what $20 of risk buys you in position size is one of the
most useful shocks in this course.

Also set:

- **Leverage** to the maximum your jurisdiction allows for retail clients, so your margin
  arithmetic matches what you would really face.
- **Account currency** to your real one.

## What a demo simulates well

- Order types, order placement, and order management
- Price movement and volatility
- Margin and P&L arithmetic
- Platform mechanics and contract specifications
- Whether your rules survive contact with a live chart

## What a demo does not simulate

This list matters, because demo success followed by live failure is one of the most
common patterns in trading.

- **Execution quality.** Demo fills are often better than live: less slippage, no
  rejections, idealised fills at the quoted price during news.
- **Financing precision.** Swap charges may be simplified or omitted entirely.
- **Emotional load.** This is the big one. Nothing about a demo replicates the feeling of
  a real position moving against real money. Traders who are disciplined on demo and
  reckless live are the rule, not the exception.
- **Liquidity constraints** at larger sizes.

Treat good demo results as evidence that your rules are *coherent*, not as evidence that
they are *profitable* or that you can *follow them under pressure*.

## Setup checklist

- [ ] Demo account opened with a broker regulated in your jurisdiction
- [ ] Balance set to a realistic figure, not the default
- [ ] Leverage set to your jurisdiction's retail cap
- [ ] Account currency set correctly
- [ ] Contract specification screen located and bookmarked
- [ ] Located: spread, commission, swap long, swap short, contract size, minimum size,
      and margin requirement for one FX pair, one index, and one share
- [ ] Trade journal file created from [the template](../../templates/trade-journal-template.csv)
- [ ] Confusion log file created

## Exercise 00.3

Open your demo platform and fill in this table for three instruments — one major FX
pair, one major index, and one individual share. Every number comes from the broker's
contract specification, not from a web search.

| | EUR/USD | (an index) | (a share) |
|---|---|---|---|
| Contract size (1 lot) | | | |
| Minimum trade size | | | |
| Typical spread | | | |
| Commission per side | | | |
| Margin requirement % | | | |
| Implied max leverage | | | |
| Swap long (per lot per night) | | | |
| Swap short (per lot per night) | | | |
| Trading hours | | | |

You will use this table repeatedly in Modules 3 and 4. Keep it.

Two things usually surprise people doing this for the first time. The margin
requirement on the individual share is far higher than on the FX pair, often 20% against
3.33%. And at least one of the swap figures is negative in both directions, meaning you
pay to hold the position whether you are long or short.

---

Next: [Module 00 quiz](quiz.md), then [Module 01 — Market Foundations](../01-market-foundations/)
