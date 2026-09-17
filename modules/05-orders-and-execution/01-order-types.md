# 05.1 — Order Types

## The fundamental trade-off

From Module 01.1:

> **Market orders control execution but not price. Limit orders control price but not
> execution.**

Every order type is a variation on that trade-off. Deciding which one to use is deciding
which of those two things you are willing to give up.

## Market order

Execute immediately at the best available price.

- **Guarantees:** execution (in normal conditions)
- **Does not guarantee:** price

Use when getting in or out matters more than the exact level: exiting a position that has
invalidated, entering a fast-moving market you have decided to join, or any situation
where missing the trade is worse than paying a few points.

Do not use immediately before or after scheduled high-impact news. Spreads are widest and
slippage worst precisely then, and you are handing over an unknown amount of money.

## Limit order

Execute **at a specified price or better**, never worse.

- **Guarantees:** price (or better)
- **Does not guarantee:** execution

The word "or better" matters. A buy limit at 1.0850 fills at 1.0850 or lower. A sell
limit at 1.0900 fills at 1.0900 or higher.

Two uses:

**Limit entry** — you want to buy a dip or sell a rally. Price is at 1.0880; you place a
buy limit at 1.0850. If price falls to 1.0850, you are filled. If it rallies instead, you
are not in the trade.

**Limit exit (take profit)** — you are long at 1.0850 and want out at 1.0920. A sell limit
at 1.0920 closes the position if reached.

The risk of a limit entry is being left behind. The market does the thing you predicted,
without you, because it did not come back the last two pips. This is a genuine and
frequent cost.

## Stop order

Execute **once price reaches a specified level**, becoming a market order at that point.

- **Guarantees:** nothing about price
- **Triggers:** at your level, then fills at whatever is available

The counterintuitive part: a **buy stop** is placed **above** current price, and a **sell
stop** is **below**. This is the opposite of a limit order, and confusing the two produces
immediate, expensive errors.

| Order | Placed relative to market | Intention |
|---|---|---|
| Buy limit | Below | Buy cheaper |
| Sell limit | Above | Sell dearer |
| Buy stop | **Above** | Buy if it breaks higher |
| Sell stop | **Below** | Sell if it breaks lower |

Two uses:

**Stop entry** — breakout trading. Price is at 1.0880 and you want to buy only if it
breaks 1.0920. A buy stop at 1.0920 enters on confirmation of the move.

**Stop loss** — you are long at 1.0880 and want out if it falls to 1.0840. A sell stop at
1.0840 closes the position.

Both are the same order type doing different jobs.

## Stop-limit order

Triggers at a stop level, then places a **limit** order rather than a market order.

- Protects you from a terrible fill
- Risks not filling at all

For a stop loss this is dangerous. The scenario it protects against — a fast market — is
exactly the scenario in which the limit will not be reached, leaving you with an open
losing position and no protection.

**Do not use stop-limit for stop losses.** Its legitimate use is entries where a bad fill
makes the trade not worth taking.

## The four entry orders, side by side

Market at 1.0880.

| Order | Level | Fills when | You are betting |
|---|---|---|---|
| Buy limit | 1.0850 | Price falls to 1.0850 | It dips, then rises |
| Buy stop | 1.0920 | Price rises to 1.0920 | It breaks out and continues |
| Sell limit | 1.0910 | Price rises to 1.0910 | It rallies, then falls |
| Sell stop | 1.0840 | Price falls to 1.0840 | It breaks down and continues |

Limit orders express **mean reversion**: price will come back to me. Stop orders express
**momentum**: price will keep going once it moves. They are opposite views of the market,
and which you use should follow from your strategy, not from convenience.

## Order duration

| Type | Meaning |
|---|---|
| **GTC** (good till cancelled) | Stays until filled or cancelled. Common default. |
| **Day** | Expires at the end of the trading day |
| **GTD** (good till date) | Expires on a date you set |
| **IOC** (immediate or cancel) | Fill what is available now, cancel the rest |
| **FOK** (fill or kill) | Fill entirely and immediately, or cancel |

Retail CFD platforms typically default to GTC. This matters: a forgotten GTC entry order
can trigger weeks later, in a market you have stopped watching, on a thesis that has
expired. **Review and cancel stale pending orders as a weekly routine.**

## OCO and bracket orders

**OCO (one cancels the other)** links two orders so that filling one cancels the other.
This is how a stop loss and take profit are held together: hit either, and the other
disappears. Without this, you would be left with a stray order that could open a new
position in the wrong direction.

**Bracket order** attaches a stop loss and take profit to an entry at the moment of
placement, so the position is never unprotected.

> **Use brackets. Always.** The habit of attaching a stop at the moment of entry, rather
> than "after I see how it goes", is one of the few process changes that reliably improves
> outcomes. A position without a stop is a position whose maximum loss is undefined.

## Choosing

| Situation | Order |
|---|---|
| Must exit now | Market |
| Entering a level you have pre-identified | Limit |
| Entering on a breakout | Stop |
| Protecting an open position | Stop loss (as a stop, not stop-limit) |
| Taking profit at a target | Limit |
| Entry with pre-set exits | Bracket (entry + OCO stop and limit) |

## Key points

- Market orders guarantee execution, not price; limit orders the reverse
- Buy limits go below the market, buy stops above; confusing them is costly
- A stop order becomes a market order when triggered, so it has no price guarantee
- Stop-limit orders are unsuitable for stop losses
- Limit entries express mean reversion; stop entries express momentum
- GTC is usually the default, so stale orders need weekly review
- Attach a stop at the moment of entry, every time

## Exercise 05.1

**(a)** EUR/USD is at 1.0875. State the order type and price for each intention:
- Buy if it drops to 1.0840
- Buy if it breaks above 1.0910
- Sell short if it falls below 1.0830
- Sell short if it rallies to 1.0920
- Close a long at 1.0950 for profit
- Close a long at 1.0835 to limit loss

**(b)** Explain in one sentence why a stop-limit is a poor choice for a stop loss, naming
the specific scenario in which it fails.

**(c)** You place a GTC buy limit 200 pips below the market and forget about it. Six weeks
later it fills during a sharp decline. Describe everything wrong with the resulting
position.

**(d)** On demo, place one of each of the four entry order types. Record where the
platform allows you to place them and what error messages appear if you get the direction
wrong. Then place a bracket order and confirm the stop and target are linked as OCO by
closing one and checking the other cancels.

---

Next: [05.2 — Stops, targets and trailing stops](02-stops-and-targets.md)
