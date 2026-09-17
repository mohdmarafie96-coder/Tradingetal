# 01.4 — Asset Classes

CFD brokers typically offer several thousand instruments across six broad classes. They
behave very differently, and the differences determine cost, risk and what kind of
analysis is even relevant.

## Foreign exchange

Currencies quoted in pairs: **EUR/USD** means the price of one euro in US dollars. The
first currency is the **base**, the second the **quote**. Buying EUR/USD means buying
euros and selling dollars. Every FX position is simultaneously long one currency and
short another, which is why there is no such thing as "cash" in FX — you always hold a
view on two economies.

**Majors** — pairs involving USD with another large economy: EUR/USD, USD/JPY, GBP/USD,
USD/CHF, AUD/USD, USD/CAD, NZD/USD. Tightest spreads, deepest liquidity.

**Minors / crosses** — major currencies without USD: EUR/GBP, EUR/JPY, GBP/JPY. Wider,
often more volatile.

**Exotics** — a major against a smaller or emerging-market currency: USD/TRY, USD/ZAR,
USD/MXN. Wide spreads, sharp moves, sensitive to politics and capital controls. Not a
beginner instrument, regardless of how attractive the volatility looks.

Pip convention: one pip is **0.0001** for most pairs and **0.01** for JPY pairs. Many
platforms quote a fifth (or third) decimal place, the **pipette**, which is a tenth of a
pip. Misreading a pipette as a pip is a standard beginner error that produces a position
ten times the intended size.

Main drivers: interest rate differentials and central bank policy, inflation, growth
data, trade balances, and risk sentiment.

## Indices

A CFD on a stock index: **US 500** (S&P 500), **US 30** (Dow), **US Tech 100** (Nasdaq
100), **UK 100** (FTSE), **Germany 40** (DAX), **Japan 225** (Nikkei). Broker naming
differs for licensing reasons; the underlying is the same.

Note what you are actually tracking. Most index CFDs are priced off the index **future**,
not the cash index, especially outside the home session. This has consequences: the CFD
can diverge from the headline cash index number you see on the news, and some brokers
apply a dividend adjustment when constituent shares go ex-dividend (credited to longs,
debited from shorts) because the future does not carry the dividend.

Indices are popular with beginners because a single instrument gives broad exposure and
individual company news is diversified away. They are still leveraged, and index moves
of 2% to 3% in a day are ordinary during stress.

## Commodities

**Energy** — crude oil (WTI and Brent), natural gas. Driven by supply decisions (OPEC+),
inventories, geopolitics and weather. Natural gas in particular is extraordinarily
volatile and regularly moves 10%+ in a day.

**Metals** — gold (XAU/USD), silver (XAG/USD), copper, platinum. Gold responds to real
interest rates, the dollar and risk sentiment. Silver behaves like a higher-beta gold
with industrial demand attached.

**Agricultural** — wheat, corn, soy, coffee, sugar. Weather and harvest driven.

Most commodity CFDs reference a **futures contract**, which expires. Brokers handle this
either by rolling to the next contract (with a cash adjustment to your account to
neutralise the price difference) or by expiring the CFD and closing your position. **You
must know which your broker does**, because an unexpected expiry closing a position is a
genuinely unpleasant surprise. It is in the contract specification.

## Shares

CFDs on individual equities. Exposure to a single company: earnings, guidance,
management, litigation, product cycles.

Characteristics that distinguish them:

- **Much higher margin requirements.** Retail caps are typically 20% (5:1 leverage)
  versus 3.33% (30:1) for major FX.
- **Restricted hours.** The underlying exchange's session only. Positions held overnight
  are exposed to gaps you cannot trade through, and earnings are usually released outside
  the session deliberately.
- **Gap risk is the defining hazard.** A stock can open 15% below the previous close on
  an earnings miss. Your stop loss does not protect you across a gap; it becomes a market
  order at the open. Module 5.3 covers this.
- **Dividends are adjusted.** Long positions are credited roughly the net dividend,
  short positions debited roughly the gross. You receive an economic equivalent, but you
  have no shareholder rights: no voting, no ownership, no entitlement in an insolvency.
- **Commission is common** on share CFDs, charged as a percentage of notional with a
  minimum, in addition to the spread.

## Cryptocurrencies

CFDs on BTC, ETH and others. Available in some jurisdictions and prohibited or
restricted in others; UK retail clients, for example, cannot access crypto derivatives.

Where available: the tightest leverage caps (typically 2:1 for retail), the widest
spreads, financing costs that are often punitive in both directions, and volatility that
makes everything else on this list look sedate. 10% daily moves are unremarkable.

Traded 24/7 in the underlying, though your broker may not quote continuously.

## Bonds and interest rates

CFDs on government bond futures — Bund, Gilt, US Treasury notes. Driven by central bank
policy and inflation expectations. Less common among retail traders and generally
requiring a good grasp of the inverse relationship between yields and prices. If you do
not already know why a rate rise pushes bond prices down, do not trade these.

## Comparison

Indicative retail figures under UK/EU rules. **Verify against your broker.**

| Class | Max retail leverage | Margin | Typical spread | Hours | Gap risk |
|---|---|---|---|---|---|
| Major FX | 30:1 | 3.33% | 0.6–1.5 pips | 24/5 | Weekend only |
| Minor FX | 20:1 | 5% | 1.5–4 pips | 24/5 | Weekend |
| Exotic FX | 20:1 | 5% | 10–100+ pips | Varies | High |
| Major indices | 20:1 | 5% | 0.4–2 points | Extended | Moderate |
| Other indices | 10:1 | 10% | Wider | Exchange | Moderate |
| Gold | 20:1 | 5% | 0.2–0.5 | 24/5 | Weekend |
| Other commodities | 10:1 | 10% | Varies | Varies | High |
| Shares | 5:1 | 20% | Varies | Exchange only | **Very high** |
| Crypto | 2:1 | 50% | Wide | Varies | **Extreme** |

The leverage cap is a reasonable proxy for how dangerous the regulator considers the
instrument. It is worth reading the table in that light rather than as a menu of
opportunity.

## What to trade while learning

**One instrument.** Preferably a major FX pair or a major index.

The argument is simple. Learning to trade means learning the personality of a market:
its typical range, how it behaves at session boundaries, which news moves it, how it
opens after a weekend. That knowledge is instrument-specific and takes months. Spreading
attention across twelve instruments gets you a shallow acquaintance with all of them and
competence in none, while multiplying your costs and your correlated exposure.

Pick one. Stay with it through the whole course.

## Key points

- FX pairs are always two simultaneous positions; pip is 0.0001, or 0.01 for JPY pairs
- A pipette is a tenth of a pip and misreading it produces a 10x sizing error
- Index and commodity CFDs usually track futures, not the cash market, and may roll or expire
- Share CFDs carry the highest margin, the worst gap risk, and no ownership rights
- Leverage caps are a rough regulatory ranking of instrument danger
- Trade one instrument while learning

## Exercise 01.4

**(a)** For EUR/USD, USD/JPY, Germany 40, gold and one share on your platform, record
from the contract specification: contract size, margin %, implied leverage, typical
spread, trading hours, and whether the instrument rolls or expires.

**(b)** Choose your single course instrument and write one paragraph justifying the
choice against: spread cost relative to a realistic account, trading hours you can
actually observe, volatility relative to your intended stop distances, and whether you
have any interest in its drivers. Boredom is a real risk factor; you will not study an
instrument you find dull.

**(c)** Find one instrument on your platform with a negative swap in **both** directions.
Calculate the annualised cost of holding one lot of it, both long and short. Note that
there is no direction in which time is on your side.

---

Next: [Module 01 quiz](quiz.md), then [Module 02 — What a CFD Actually Is](../02-what-is-a-cfd/)
