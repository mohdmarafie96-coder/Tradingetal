# 04.4 — Gap Risk and Negative Balance Protection

## The assumption that fails

Every risk calculation so far has assumed one thing: **that you can exit at your stop
loss price**. Position sizing, margin level, stop-out distance — all of it presumes price
moves continuously through your stop and you get filled at or near it.

That assumption fails in exactly the circumstances where it matters most.

## What a gap is

A **gap** is a discontinuity: price moves from one level to another with no trading in
between. There is no price at which to fill you, because no price existed.

Consequence: **a stop loss is not a guarantee of exit price.** It is an instruction to
close at market once a level is reached. If the market has jumped past that level, you
are closed at the first available price, wherever that is.

## When gaps occur

**1. Weekends.** FX closes Friday evening and reopens Sunday evening. Anything happening
in between — elections, geopolitical events, policy announcements — is priced in at the
open. Weekend gaps of 20 to 50 pips in majors are ordinary; 200+ pips happens around
major events.

**2. Overnight in exchange-traded instruments.** Share and index CFDs follow their
exchange's session. A share that closes at $50 can open at $42 the next morning. There
were sixteen hours in which you could not act.

**3. Earnings and scheduled company news.** Deliberately released outside trading hours.
A 10% to 20% gap on an earnings surprise is unremarkable. This is why holding an
individual share CFD through earnings is a distinct decision requiring its own
justification.

**4. Unscheduled events.** Central bank interventions, geopolitical shocks, flash
crashes. These can gap intraday, within an otherwise continuously trading session.

**5. Scheduled high-impact data.** Non-farm payrolls, CPI, rate decisions. Not true gaps
but functionally similar: price can traverse 50 pips in under a second with a widened
spread and no fillable liquidity in between.

## Worked example: a weekend gap

Friday close: you are long 0.5 lots EUR/USD at 1.0900, stop at 1.0850 (50 pips, $250 risk
at $5 per pip). You have sized correctly at 1% of a $25,000 account. Your analysis is
sound. You have done everything this course has asked.

Over the weekend, a surprise election result in a major eurozone economy.

Sunday open: **1.0720**.

Your stop at 1.0850 triggers immediately, but the best available price is 1.0720.

| | |
|---|---|
| Intended exit | 1.0850 |
| Actual fill | 1.0720 |
| Slippage | 130 pips |
| Intended loss | $250 (1.0%) |
| **Actual loss** | **$900 (3.6%)** |

You lost **3.6 times your intended risk** and there was nothing you could have done once
the position was open. The stop worked exactly as designed; the design does not cover
discontinuities.

## Worked example: an earnings gap

Long 400 share CFDs at $62.00, stop at $59.00. Risk = $1,200 at 20% margin ($4,960
posted).

The company reports after the close and misses badly. It opens at **$48.50**.

| | |
|---|---|
| Intended loss | $1,200 |
| Actual loss | (62.00 − 48.50) × 400 = **$5,400** |
| Multiple of intended risk | **4.5x** |
| Versus margin posted | Exceeds it |

On a $15,000 account this is a 36% loss from a single position that was "risking 8%".
Share CFDs held through earnings are the highest-gap-risk position available to a retail
trader, and the risk is entirely foreseeable because earnings dates are published.

## Negative balance protection

When a gap is severe enough, losses can exceed your entire account balance.

**Negative balance protection** means the broker must write off the deficit. Your account
goes to zero, not below. Mandatory for retail clients in the UK, EU and Australia.

### Why it exists: the Swiss franc, January 2015

The Swiss National Bank had maintained a floor of 1.20 on EUR/CHF, buying euros to
defend it. On 15 January 2015 it abandoned the floor with no warning.

EUR/CHF fell from 1.20 to roughly **0.85 within minutes**, with essentially no
transactable liquidity through the move — a 30% discontinuity in the most stable-seeming
major pair on the board.

Retail traders long EUR/CHF at leverage had stops at 1.19, 1.18, 1.15. None were fillable.
Positions were closed at whatever was eventually available.

The results:

- Retail clients ended owing brokers sums far in excess of their deposits, in cases
  running to six figures for individuals
- **Alpari UK** entered insolvency
- **FXCM** required a $300 million emergency loan to survive
- Several brokers pursued clients for negative balances; some wrote them off; the
  difference depended on the firm, not on the client

Regulators introduced mandatory negative balance protection in direct response. It is the
single most valuable retail protection in the product, and it is the one you give up by
accepting professional client status.

### What it does not do

- **It does not cap your loss at your stop.** You can still lose your entire account in
  one gap.
- **It does not apply per position.** All positions net against the whole account.
- **It does not apply offshore.** Many non-EU/UK/AU brokers do not offer it. Check.
- **It does not apply to professional clients.** By definition.

Negative balance protection means the worst case is zero, not that the worst case is
small.

## Managing gap risk

You cannot eliminate it. You can reduce your exposure to it.

**1. Reduce or close size before known gap events.** Weekends, earnings, elections,
referendums, central bank decisions. All are on a calendar. Holding through them is a
choice; make it a deliberate one.

**2. Size for the gap, not for the stop.** The useful question is not "what if I'm stopped
out?" but **"what if this gaps 5% against me overnight?"** If that answer is
unsurvivable, the position is too large regardless of where the stop sits.

**3. Use guaranteed stop losses where available.** A GSL is honoured at your exact price
regardless of gaps. It costs a premium, charged either up front or on trigger. For
overnight share positions, and for holding through a scheduled event, that premium is
often the cheapest insurance available. Check the cost and the restrictions — minimum
distances usually apply.

**4. Prefer instruments that trade closer to continuously.** Major FX trades 24 hours,
five days, so the only scheduled gap is the weekend. Share CFDs gap every single night.

**5. Reduce weekend exposure.** Many retail traders flatten on Friday. It costs you the
weekend move in both directions, and it removes a category of risk you cannot manage
while the market is shut. On a small account that is a reasonable trade.

**6. Never hold a leveraged position through a binary event without a defined plan.**
Referendums, elections, rate decisions with a genuinely uncertain outcome. The
distribution is not continuous; it is bimodal, and your stop sits in the gap.

## The general lesson

Every risk model in this course is an approximation that assumes continuity. Reality is
discontinuous at precisely the moments that matter, and those moments are when
correlations converge, liquidity disappears, and every position moves the same way at
once.

The practical response is not a better model. It is a margin of safety large enough that
being wrong about the model is survivable. That is what conservative position sizing buys
you, and it is why the risk percentages in Module 6 are lower than they first appear to
need to be.

## Key points

- A gap is a price discontinuity; a stop loss cannot be filled at a price that did not exist
- Stops give you an exit instruction, not an exit price
- Weekends, earnings, exchange overnight sessions and unscheduled events all produce gaps
- Negative balance protection caps your loss at zero, not at your stop
- The 2015 Swiss franc de-peg is why that protection exists
- Size for a plausible gap, not for your stop distance
- Guaranteed stops are the only instrument that removes gap risk, and they cost money

## Exercise 04.4

**(a)** Long 0.8 lots GBP/USD at 1.2700, stop at 1.2640. The market reopens Sunday at
1.2515. Calculate intended loss, actual loss, and the multiple of intended risk.

**(b)** Short 250 share CFDs at $88.00, stop at $92.00. The company announces a takeover
at $110.00 and opens there. Calculate the loss. On a $20,000 account, what percentage is
that? What would your position have needed to be for this to be survivable?

**(c)** For your chosen instrument, look up the largest single-session gap in the last two
years. Calculate what that gap would have done to a position sized at 1% risk with a
typical stop distance. Then size a position such that the gap would have cost no more
than 5% of your account.

**(d)** Price your broker's guaranteed stop on one overnight share position. Express the
premium as a percentage of the position's risk. Under what circumstances is it worth
paying?

**(e)** Write a one-page gap risk policy for your own trading: what you will and will not
hold overnight, over weekends, and through scheduled events. Be specific enough that it
is checkable. Keep it; it goes into your trading plan in Module 8.

---

Next: [Module 04 quiz](quiz.md), then [Module 05 — Orders and Execution](../05-orders-and-execution/)
