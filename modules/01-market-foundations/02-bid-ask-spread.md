# 01.2 — Bid, Ask and Spread

## The two-sided quote

Every tradable instrument shows two prices:

```
EUR/USD    1.08472  /  1.08485
            BID         ASK
```

The rule that trips up every beginner at least once:

> **You buy at the ask. You sell at the bid.**
> You always transact at the worse of the two prices for you.

Memorise it in the form that makes it obvious: *the market buys from you low and sells
to you high.* The two prices are named from the market maker's perspective, not yours —
the bid is what they bid to pay you, the ask is what they ask from you.

## The spread

**Spread = Ask − Bid**

For the quote above: 1.08485 − 1.08472 = 0.00013, which is 1.3 pips.

The spread is the most important cost in CFD trading, because it is charged on every
single position with no exceptions.

## The immediate consequence: you start every trade at a loss

Open a long position at the ask of 1.08485. To value your position, the platform marks
it at the price you could close at, which is the bid, 1.08472. So the instant your order
fills, your unrealised P&L is negative by exactly the spread.

This is not a glitch and not a fee taken from you separately. It is the mechanical
result of buying at one price and being valued at the other.

**Price must move in your favour by at least the spread before you break even.**

For a long position:

- Break-even bid = entry ask (you need the bid to rise to your entry price)
- In pips: price must rise by the spread just to reach zero

For a short position:

- You sell at the bid, and close by buying at the ask
- Break-even ask = entry bid; price must fall by the spread to reach zero

## Costing the spread

**Spread cost = spread in price terms × position size in units**

Worked example, one standard lot of EUR/USD:

| | |
|---|---|
| Position size | 100,000 units (1 standard lot) |
| Spread | 1.3 pips = 0.00013 |
| Spread cost | 100,000 × 0.00013 = **$13.00** |

So a round trip on one standard lot costs $13 before anything else. Some brokers quote
raw spreads near zero and charge commission instead, typically around $3.50 per lot per
side, $7 round trip. Module 3.4 compares the two models properly; the total is what
matters, never the headline spread.

### Scaling the intuition

On a $2,000 account risking 1% ($20) per trade, a $13 spread cost is **65% of your risk
budget per trade**. That single fact ends more strategies than any chart pattern. It is
why frequent trading on a small account is close to mathematically hopeless, and it is
the argument for smaller position sizes and longer holding periods on a small account.

## Fixed and variable spreads

**Variable (floating) spreads** move with market conditions. Tight when liquid, wide when
not. Most brokers, most instruments.

**Fixed spreads** are held constant by the broker. Usually wider on average, and often
widened or suspended anyway during genuinely disorderly conditions, which is precisely
when you wanted the guarantee.

Advertised spreads are typically "from" figures or averages measured during the most
liquid hours. Your actual average will be worse. Measure it yourself: Exercise 01.2.

## When spreads widen, predictably

Spread widening is not random. It is driven by liquidity and uncertainty, and the timing
is largely knowable in advance.

1. **Around scheduled economic releases.** Non-farm payrolls, CPI, central bank rate
   decisions. Spreads can widen by a factor of five to twenty for seconds to minutes,
   both just before and just after.
2. **At market open and close**, and at the daily rollover point (commonly 21:00 or
   22:00 UTC depending on broker), when liquidity providers step back.
3. **Outside the main session for the instrument.** EUR/USD at 03:00 UTC is
   meaningfully wider than at 13:00 UTC.
4. **Weekends and holidays**, at the Friday close and Sunday open.
5. **During genuine stress** — unscheduled news, geopolitical shocks, flash crashes.

Two practical implications. First, entering a market order seconds before a scheduled
release is a decision to pay an unknown, possibly very large, cost. Second, spread
widening can trigger your stop loss even when the mid price never reached your level,
because a long position's stop triggers off the bid and the bid falls when the spread
widens, independently of the mid. Module 5.3 covers this in full.

## Worked example: the full round trip

Long 1 standard lot EUR/USD. Buy at ask 1.08485. Spread 1.3 pips throughout.

| Event | Bid | Ask | Unrealised P&L |
|---|---|---|---|
| Fill (bought at ask) | 1.08472 | 1.08485 | −$13.00 |
| Market unchanged | 1.08472 | 1.08485 | −$13.00 |
| Market +1.3 pips | 1.08485 | 1.08498 | $0.00 |
| Market +10 pips | 1.08572 | 1.08585 | +$87.00 |
| Close (sold at bid 1.08572) | | | **+$87.00 realised** |

The raw move from 1.08485 to 1.08585 is 10 pips, worth $100. You received $87. The $13
difference is the spread, and it is the broker's revenue on the trade.

## Key points

- Buy at the ask, sell at the bid; always the worse price for you
- Spread = Ask − Bid; it is charged on every position without exception
- Every position opens at an unrealised loss equal to the spread
- Spread cost = spread × units; compare it to your per-trade risk budget, not to the account
- Spreads widen predictably around news, at session boundaries and in thin conditions
- Advertised spreads are best-case; measure your own

## Exercise 01.2

**(a)** GBP/USD is quoted 1.26430 / 1.26449. State the spread in pips, and the cost of
a round trip on 0.5 lots (50,000 units).

**(b)** You go short 0.2 lots of EUR/USD at a bid of 1.08472 with a 1.3 pip spread. To
what ask price must the market fall for you to break even? What is your P&L if you close
at an ask of 1.08300?

**(c)** Open your demo platform and record the spread on one FX pair at four times: your
local morning, midday, the London/New York overlap (roughly 13:00–16:00 UTC), and late
evening. Then record it immediately before and after a scheduled economic release. Write
down the ratio between the tightest and widest readings. Most people find it is larger
than they expected.

---

Next: [01.3 — Liquidity, volatility and participants](03-liquidity-and-participants.md)
