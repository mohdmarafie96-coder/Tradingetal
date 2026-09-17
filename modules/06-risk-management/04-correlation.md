# 06.4 — Correlation and Portfolio Risk

## The illusion of diversification

You hold four positions, each risking 1%. You believe you are risking 4%.

You are long EUR/USD, long GBP/USD, long AUD/USD and short USD/JPY.

Every one of those is **short the US dollar**. You do not hold four positions. You hold one
position, sized at 4%, wearing four costumes. When the dollar strengthens, all four lose
together.

This is the most common way a disciplined position-sizing rule is defeated without ever
being broken. Each trade obeyed the 1% rule. The portfolio did not.

## Correlation

**Correlation** measures how two instruments move relative to each other, from −1 to +1.

| Coefficient | Meaning |
|---|---|
| +1.0 | Move identically |
| +0.7 to +1.0 | Strongly positive; treat as near-duplicates |
| +0.3 to +0.7 | Moderately positive |
| −0.3 to +0.3 | Weak; approximately independent |
| −0.7 to −0.3 | Moderately negative |
| −1.0 to −0.7 | Strongly negative; opposite positions duplicate each other |

### Common relationships

These are typical, not fixed. Correlations drift and sometimes invert.

**Strongly positive:**
- EUR/USD and GBP/USD — both against the dollar
- AUD/USD and NZD/USD — commodity-linked, similar drivers
- Gold and silver
- Major equity indices — S&P 500, DAX, FTSE all move together in risk-off

**Strongly negative:**
- EUR/USD and USD/CHF — nearly mirror images
- Any XXX/USD and USD/XXX pair
- Equity indices and safe-haven assets, during stress

**The critical point about negative correlation:** being long EUR/USD and long USD/CHF is
not a hedge. It is **the same directional bet twice**, because the pairs are inverse. Both
positions profit from a weak dollar.

### Correlations rise in a crisis

The dangerous property: **correlations converge toward 1 exactly when you need
diversification most.**

In normal conditions, a portfolio of equity indices, commodity currencies and emerging
market exposure has genuine diversification. In a genuine risk-off event, everything except
safe-haven assets falls together, because the driver stops being individual fundamentals
and becomes a single factor — the global appetite for risk.

The diversification you measured in calm markets is not the diversification you have in a
crisis. Size for the crisis case.

## Calculating true portfolio risk

The practical method, which is conservative and takes thirty seconds:

1. Group positions by their dominant risk factor
2. Within each group, **add** the risks of same-direction positions
3. Treat groups as independent (they are not entirely, but this is a workable
   approximation)
4. Cap risk per group, not just per trade

### Worked example

$20,000 account, five positions, each risking 1% ($200):

| Position | Direction | Dominant factor |
|---|---|---|
| Long EUR/USD | Short USD | USD |
| Long GBP/USD | Short USD | USD |
| Short USD/CHF | Short USD | USD |
| Long US 500 | Long risk | Equity/risk |
| Long gold | Long gold / short real rates | Metals |

**Naive view:** 5 positions × 1% = 5% risk.

**Grouped view:**

| Group | Positions | Aggregate risk |
|---|---|---|
| Short USD | 3 | **3%** |
| Long equity risk | 1 | 1% |
| Gold | 1 | 1% |

A dollar rally alone costs 3%, not 1%. And in a strong-dollar risk-off move, the equity
position and quite possibly gold move against you too, so the realistic bad-day figure is
closer to **5%** — meaning all five positions lose simultaneously, which the naive view
treated as impossible.

## Correlation limits

Set explicit rules and write them into your plan:

| Rule | Typical value |
|---|---|
| Maximum risk per single trade | 1% |
| Maximum aggregate risk per correlation group | 2% |
| Maximum total open risk across all positions | 4% – 6% |
| Maximum simultaneous positions | 3 – 5 while learning |
| Maximum effective leverage | 5:1 |

The group limit is the one that does the real work, because it is the one the per-trade
rule does not cover.

## Practical grouping

For a retail trader, a workable set of factor groups:

1. **USD direction** — everything quoted against the dollar
2. **Risk sentiment** — equity indices, commodity currencies (AUD, NZD, CAD),
   high-yielding currencies, most crypto
3. **Safe havens** — JPY, CHF, gold, government bonds
4. **Energy** — crude, natural gas, and CAD to a meaningful degree
5. **Metals** — gold, silver, copper, with copper leaning toward the risk group
6. **Single-name equity** — individual shares, which also carry sector correlation

Note that groups 2 and 3 are usually *inversely* related, so a long in group 2 and a short
in group 3 is a doubled bet, not a hedge.

## Checking correlation yourself

Do not rely on remembered rules of thumb. Measure.

**Free correlation matrices** are published by several charting platforms and broker
research pages, usually over 1-month, 3-month and 1-year windows. Check more than one
window, because a pair correlated at 0.85 over a year may be at 0.2 over the last month.

**Manual method:** record daily closes for two instruments over 30 days, compute daily
percentage changes, and calculate the correlation coefficient. A spreadsheet does this in
one function. Doing it once by hand for your own instruments is worth the twenty minutes.

**Visual method:** overlay two charts. If they look like the same shape, they are the same
trade. This is crude and catches most of the damage.

## Hedging

**A genuine hedge** reduces exposure to a specific risk. Long a basket of European shares
and short a Europe index CFD: you retain the stock-specific view and remove the market
direction.

**A fake hedge** is holding a long and a short in the same instrument on a hedging
account. Net exposure is zero, you pay two spreads and two financing charges, and margin
may be reduced but rarely enough to justify it. It is almost always a way of avoiding
realising a loss, not a risk decision.

**Test:** if the answer to "why not just close the position?" is anything about how it
would feel, it is not a hedge.

## Key points

- Positions sharing a risk factor are one position, however many tickets they occupy
- Inverse pairs held in opposite directions duplicate exposure rather than hedging it
- Correlations converge toward 1 in a crisis, when diversification matters most
- Group positions by factor, add same-direction risks within groups, and cap per group
- Set an explicit maximum total open risk, typically 4% to 6%
- Measure correlation over multiple windows rather than trusting rules of thumb
- Holding offsetting positions in one instrument is not a hedge

## Exercise 06.4

**(a)** Group these and state the true aggregate risk if each is sized at 1%: long
EUR/USD, short USD/CAD, long AUD/JPY, long US Tech 100, short gold.

**(b)** You are long EUR/USD at 1% and considering long USD/CHF at 1%. Explain what this
combination actually is, and what happens to both positions if the dollar rallies.

**(c)** Find a correlation matrix for your chosen instrument against four others. Record
the 1-month and 1-year figures. Note any pair where the two windows disagree materially
and suggest why.

**(d)** Write your own correlation rules: your factor groups, maximum risk per group,
maximum total open risk, and maximum simultaneous positions. Add them to your trading plan.

**(e)** Review your demo trading history. Find a day where multiple positions lost
together. Identify the shared factor. Was it visible in advance?

**(f)** Design a genuine hedge for this situation: you hold a share CFD you want to keep
for a company-specific reason, but you expect a broad market decline over the next two
weeks. State the instrument, direction, size and the residual risks that remain.

---

Next: [Module 06 quiz](quiz.md), then [Module 07 — Market Analysis](../07-market-analysis/)
