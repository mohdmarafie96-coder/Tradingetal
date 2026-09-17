# 03.4 — The Full Cost of a Trade

Costs are the only certainty in trading. Price movement is uncertain; the spread is not.
Traders spend enormous effort on entry signals and almost none on cost, which is exactly
backwards, because cost is the part you can actually control.

There are five. Most beginners know about one.

## 1. Spread

Charged on every position, without exception. Covered in Module 01.2.

```
Spread cost = spread (in price terms) × units
```

1 standard lot EUR/USD at a 1.2 pip spread: 100,000 × 0.00012 = **$12.00** per round trip.

## 2. Commission

Charged by raw-spread or ECN-style accounts, usually in place of a marked-up spread.

**FX:** typically $3.00 to $7.00 per standard lot **per side**. Scales linearly with size,
so 0.1 lots costs a tenth.

**Shares:** typically a percentage of notional, around 0.08% to 0.10% per side, with a
minimum charge of $8 to $15. The minimum is what hurts small positions: 100 CFDs at $30
is $3,000 notional, 0.1% of which is $3, so you pay the $10 minimum instead — an
effective rate of 0.33% per side.

**Indices and commodities:** usually commission-free, with the cost in the spread.

### Comparing account types correctly

| | Standard account | Raw / ECN account |
|---|---|---|
| Typical EUR/USD spread | 1.2 pips | 0.2 pips |
| Commission per lot per side | $0 | $3.50 |
| Spread cost per lot round trip | $12.00 | $2.00 |
| Commission per lot round trip | $0.00 | $7.00 |
| **Total per lot round trip** | **$12.00** | **$9.00** |

The raw account wins here, but only because the spread difference (1.0 pip = $10) exceeds
the commission ($7). Run the comparison with your own broker's actual figures, in your own
typical size, rather than assuming.

> **Only the total matters.** A headline "0.0 pip spread" tells you nothing on its own,
> and it is advertised precisely because it sounds like zero cost.

## 3. Overnight financing (swap / rollover)

A CFD is a funded leveraged position. Hold it past the daily rollover point and you are
charged, or occasionally paid, for that funding.

### Index, commodity and share CFDs

```
Daily financing = notional × (benchmark rate ± markup) / day count
```

- **Long:** pay benchmark **+** markup
- **Short:** receive benchmark **−** markup
- Markup is typically 2% to 3% annualised per side
- Day count is 365 for most equity-linked instruments, 360 for many others

**Worked example.** Long 5 CFDs US 500 at 5,120. Notional = $25,600. Benchmark 5.0%,
markup 2.5%.

```
Annual rate  = 5.0% + 2.5% = 7.5%
Daily charge = 25,600 × 0.075 / 365 = $5.26 per night
```

Over a month (~30 nights, with weekend triple charges roughly evened out): **about $158**.
On a position with $1,280 of margin posted at 5% (20:1), that is **12.3% of your margin
per month** in financing alone, before the market does anything.

The short side, same position: receives 5.0% − 2.5% = 2.5%, or $1.75 per night. Note the
asymmetry: the long pays $5.26 and the short receives $1.75. The broker keeps the
difference regardless of which side you take.

### FX swaps

FX financing works differently, from the **interest rate differential** between the two
currencies, adjusted via the tom-next market, plus the broker's markup.

Long EUR/USD means long euros, short dollars. You earn the euro rate and pay the dollar
rate. If dollar rates exceed euro rates, you pay the difference plus markup.

Brokers publish swaps as points or as a currency amount per lot per night, one figure for
long and one for short. **Read them from the specification rather than calculating**, and
check them periodically, because they change with rates.

The important pattern, which you verified in Exercise 01.4(c): **the markup frequently
makes both directions negative.** When it does, there is no direction in which time helps
you.

### Triple swap

Spot FX settles two business days forward. A Wednesday position rolls to Monday, so
**three days of financing are charged on Wednesday night** for most FX pairs. Some
instruments use Friday instead. Check the specification.

A trader holding through Wednesday without knowing this sees a charge three times the
expected size and assumes an error.

### The compounding point

Financing accrues nightly. Over months it becomes the dominant cost and can exceed the
price move entirely.

Long 1 lot EUR/USD (~$108,500 notional) at −$8 per night:

| Hold period | Financing | Pips needed to offset |
|---|---|---|
| 1 night | $8 | 0.8 |
| 1 week | $56 | 5.6 |
| 1 month | $240 | 24 |
| 6 months | $1,460 | 146 |
| 1 year | $2,920 | **292** |

You need a 292-pip favourable move over a year simply to break even on financing. This is
the structural reason CFDs are not a long-term holding instrument, and it is why a trader
who is right about direction over a year can still lose money.

## 4. Currency conversion

If an instrument is denominated in a currency other than your account currency, P&L is
converted, and brokers typically apply a markup of 0.3% to 0.5% on the conversion rate.

Long 10 CFDs of Germany 40 with a USD account, making €500 profit. At a mid EUR/USD of
1.0900 that is $545. With a 0.5% conversion markup you receive about $542.30 — a $2.70
cost, invisible unless you look for it.

Small per trade. Meaningful in aggregate, and entirely avoidable by trading instruments
denominated in your account currency while learning.

## 5. Everything else

- **Inactivity fees** — commonly $10 to $20 per month after 3 to 12 months of no trading.
  A dormant funded account bleeds.
- **Withdrawal fees** — often waived above a threshold, charged below it.
- **Deposit fees** — some payment methods.
- **Guaranteed stop premium** — a surcharge for a stop that cannot slip. Charged either
  up front or only when triggered, depending on the broker. See Module 5.2.
- **Dividend adjustments** — economically neutral-ish for longs, a genuine net cost for
  shorts (gross out, net in).
- **Data fees** — rare in retail CFDs, common for share-level depth.

## Putting it together

Long 0.5 lots EUR/USD held 4 nights, raw-spread account.

| Item | Calculation | Amount |
|---|---|---|
| Spread | 50,000 × 0.00002 | −$1.00 |
| Commission in | 0.5 × $3.50 | −$1.75 |
| Commission out | 0.5 × $3.50 | −$1.75 |
| Financing, 4 nights | 4 × $4.10 | −$16.40 |
| **Total cost** | | **−$20.90** |

Break-even move = $20.90 / $5.00 per pip = **4.2 pips**.

Now compare that cost to your risk budget. On a $2,000 account risking 1% ($20) per
trade, this single trade's cost **slightly exceeds the entire amount you were willing to
lose**. The trade cannot be justified at this size on this account.

That calculation, run before entry, eliminates more bad trades than any indicator.

## The cost ratio test

> **Cost ratio = total round-trip cost ÷ intended risk per trade**

- **Below 10%** — sustainable
- **10% to 25%** — a meaningful drag; the strategy needs a genuine edge
- **25% to 50%** — you are fighting the cost structure
- **Above 50%** — the position size, holding period or account size is wrong

Compute it before every trade during this course. It is the single most useful
pre-trade number after position size.

## Key points

- Five cost categories: spread, commission, financing, conversion, and fees
- Only total cost matters; headline spreads are marketing
- Financing is charged nightly, is asymmetric between long and short, and compounds
- Triple swap applies one night a week, usually Wednesday for FX
- Conversion markups apply to any instrument not in your account currency
- Cost ratio (cost ÷ risk per trade) above 25% means something is wrong with the setup

## Exercise 03.4

**(a)** Calculate the total round-trip cost of: long 0.3 lots GBP/USD, 1.4 pip spread, no
commission, held 6 nights at −$2.20 per night. Express it in pips.

**(b)** Compare, for a trader placing 20 round trips per month at an average 0.4 lots:
Standard account, 1.3 pip spread, no commission.
Raw account, 0.3 pip spread, $3.50 per lot per side.
Which is cheaper, and by how much per year?

**(c)** Long 8 CFDs US 500 at 5,200. Benchmark 4.75%, markup 2.5%, 365-day count.
Calculate the nightly financing, the monthly cost, and the annual cost. Express the annual
cost as a percentage of the margin posted at 5%.

**(d)** You open a position on Tuesday and close it the following Monday. How many nights
of financing are you charged, and why is the answer not five?

**(e)** Your account is $1,500 and you risk 1% per trade. Using your own broker's real
spread and commission, what is the largest position size at which your cost ratio stays
below 20%? What stop distance does that imply for a $15 risk?

**(f)** A strategy targets 12 pips per trade with a 10-pip stop, 30 trades per month, at
0.5 lots. Round-trip cost is 1.5 pips. What win rate is required to break even net of
costs? Compare it to the win rate required gross. Comment on whether this strategy is
viable.

---

Next: [Module 03 quiz](quiz.md), then [Module 04 — Leverage and Margin](../04-leverage-and-margin/)
