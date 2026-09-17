# 01.3 — Liquidity, Volatility and Participants

## Liquidity

**Liquidity is the ability to transact size without moving the price much.**

A liquid market has many resting orders at closely spaced prices. A market order of
normal size consumes a little of the book and barely moves the best price. An illiquid
market has sparse orders at scattered prices, and the same order walks several levels
up, filling badly.

Three observable symptoms of liquidity:

| | Liquid | Illiquid |
|---|---|---|
| Spread | Tight | Wide |
| Depth (size at each level) | Deep | Thin |
| Reaction to a normal-size order | Minimal | Significant |

For you as a retail trader, liquidity determines execution quality: how close your fill
is to the price you saw, and how badly a stop loss can be filled in a fast move.

### Liquidity varies through the day

FX is a 24-hour market, but it is not uniformly liquid. The major sessions overlap in a
predictable pattern (times in UTC, shifting by an hour with daylight saving):

| Session | Approx. hours (UTC) | Character |
|---|---|---|
| Sydney | 22:00 – 07:00 | Thin; AUD and NZD relatively more active |
| Tokyo | 00:00 – 09:00 | Moderate; JPY pairs most active |
| London | 08:00 – 17:00 | Highest volume overall; EUR and GBP |
| New York | 13:00 – 22:00 | High; USD pairs |
| **London/NY overlap** | **13:00 – 17:00** | **Deepest liquidity, tightest spreads** |

The overlap is where the tightest spreads and most consistent execution live. The
Sydney-only window is where the widest spreads and thinnest books live. Trading the same
strategy in those two windows is not the same activity.

Non-FX instruments follow their exchange. Index and share CFDs are most liquid during
their home exchange's cash session. Many brokers quote index CFDs out of hours, but those
prices are derived from futures and are thinner and wider than they look.

## Volatility

**Volatility is how much price moves, not how easily you can transact.**

Liquidity and volatility are different and frequently confused. They are correlated in
practice — a shock usually raises volatility and drains liquidity at the same time — but
they are distinct properties, and you can have either without the other.

- **High volatility, high liquidity:** major news in a major pair. Big moves, still
  transactable, spreads wider than usual but functional.
- **High volatility, low liquidity:** exotic currency during a political crisis. Big
  moves, and terrible fills. The dangerous quadrant.
- **Low volatility, high liquidity:** a quiet midweek afternoon in EUR/USD. Easy to
  transact, nothing to transact on.
- **Low volatility, low liquidity:** a minor instrument in a dead session. Drifting on
  wide spreads.

Volatility matters for position sizing. A fixed 20-pip stop is a wildly different bet in
a market averaging 40 pips of daily range than in one averaging 200. Module 6 uses
**Average True Range (ATR)** to size stops in proportion to volatility rather than
picking round numbers, and this is one of the highest-value techniques in the course.

## Who is in the market

You are not trading against a symmetrical opponent. Knowing the population helps you
form realistic expectations about what you are competing with.

**Central banks.** Set interest rates and occasionally intervene directly in FX. They are
not profit-seeking, they are enormous, and they move markets more than anything else on
this list. Rate decisions are the single most reliable source of volatility in FX.

**Commercial and investment banks.** Provide liquidity, make markets, execute client
flow, and trade their own positions. The largest banks see a substantial share of global
FX flow, which is genuine information you do not have.

**Hedge funds and asset managers.** Large directional and relative-value positions.
Technologically sophisticated.

**Corporates.** Non-speculative. An exporter converting revenue is transacting because
it must, not because it has a view. Corporate flow is one reason price moves without any
apparent informational cause.

**High-frequency and market-making firms.** Operating at microsecond timescales on
spreads and short-lived inefficiencies. You are not competing with them on speed and
should not construct a strategy that requires you to.

**Retail traders.** You. A small share of volume in most markets, with the slowest
information, the worst prices, and the highest costs per unit traded.

### The realistic conclusion

You have no edge in speed, information, capital or cost. Any edge available to you is in
**selection and discipline**: choosing not to trade most of the time, sizing so that a
losing run does not end you, and executing rules consistently. That is a narrow edge and
it is the only one on offer.

Anyone telling you otherwise is selling something.

## Your broker as counterparty

One more participant matters specifically for CFDs: the broker.

When you buy a CFD, the broker is the other side of your contract. Two broad models:

- **A-book / STP:** the broker hedges your position in the underlying market or with a
  liquidity provider, and earns the spread and commission. Its revenue is your volume.
- **B-book / market making:** the broker internalises the position and does not hedge it.
  Your loss is directly its gain.

Most brokers run a hybrid, internalising flow that nets off against other clients and
hedging the residual. This is legal, disclosed in the terms, and standard practice.

It does create a conflict of interest that is worth naming plainly: on internalised flow,
the firm profits when you lose. Regulation constrains the behaviour that can follow from
this, and reputable brokers manage it properly, but you should know it exists. Module
10.1 covers what to look for.

## Key points

- Liquidity is transacting size without moving price; volatility is how much price moves
- They are distinct, correlated, and often confused
- FX liquidity peaks in the London/New York overlap and troughs in the Sydney-only window
- Index and share CFDs are most liquid during their home exchange's cash session
- You compete with central banks, banks, funds and HFT firms; your only available edge is
  selection and discipline
- Your broker is your counterparty, and may profit directly from your losses

## Exercise 01.3

**(a)** For each, state whether liquidity is high or low and volatility is high or low:
EUR/USD at 14:00 UTC on a quiet Wednesday; USD/TRY during an unscheduled central bank
announcement; a FTSE 100 CFD at 03:00 UTC; gold in the minute after a US CPI release.

**(b)** Pick one instrument. Record its high-minus-low range over each of the last ten
trading days from your platform. Compute the average. Now consider a strategy using a
fixed 15-pip stop: over those ten days, how many would have seen intraday movement
comfortably exceeding that stop in both directions? What does that tell you about fixed
stop distances?

**(c)** Find your demo broker's terms of business and locate the section describing
whether it acts as principal (counterparty) to your trades. Note the wording. Most
retail CFD brokers act as principal on every trade, and the sentence saying so is
usually short and easy to miss.

---

Next: [01.4 — Asset classes](04-asset-classes.md)
