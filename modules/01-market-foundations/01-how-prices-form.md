# 01.1 — How Prices Form

## There is no such thing as "the price"

A beginner's mental model is that an asset has a price, the way an object has a mass,
and the market reports it. This is wrong in a way that matters for everything else.

What exists is a set of **offers to transact**. At any moment, some people are willing
to buy at certain prices and some are willing to sell at certain prices. What gets
reported as "the price" is either the most recent transaction or the current best pair
of offers. Neither is a property of the asset. Both are summaries of what people are
currently prepared to do.

This matters because it explains three things that otherwise seem arbitrary: why you
cannot always transact at the price you see, why there are always two prices, and why
price can move without any news at all.

## The limit order book

On a centralised exchange, resting orders are collected in a **limit order book**. Each
entry is a price and a quantity.

Consider a simplified book for a share:

```
          SELLERS (asks)
  Price     Quantity
  101.06      1,800
  101.05      2,400
  101.04        900   <- best ask
  ------------------------
  101.02      1,200   <- best bid
  101.01      3,000
  101.00      5,500
          BUYERS (bids)
```

The highest price a buyer will pay is 101.02. The lowest price a seller will accept is
101.04. Nothing trades between them, because no buyer will pay what any seller demands.
That two-cent gap is the **spread**, and the region is sometimes called the touch.

Two ways to participate:

- **A limit order** adds to the book. "Buy 500 at 101.02" joins the bid queue and waits.
  You might get filled, you might not. You control your price, not your execution.
- **A market order** removes from the book. "Buy 500" immediately takes the best ask,
  filling at 101.04. You control your execution, not your price.

That trade-off never goes away. It reappears in Module 5 as the choice between limit and
market orders, and it is the origin of slippage.

## Why price moves

Price moves when the book changes. That happens for two distinct reasons, and confusing
them is common.

**Orders get executed.** A large market buy consumes the 900 units at 101.04, then the
2,400 at 101.05, then part of 101.06. The best ask is now 101.06. Price has risen
because buying pressure exhausted the available supply at lower prices.

**Orders get added, cancelled or moved.** No transaction is required. If every seller
below 101.20 cancels, the best ask jumps to 101.20 instantly, with zero volume traded.
Price rose because supply was withdrawn.

The second mechanism is why prices can move violently in thin conditions on tiny volume,
and why a price can gap between one moment and the next with nothing trading in between.
It is also why "there was no news, why did it move?" has a real answer: participants
changed their minds about what they were willing to do, which is not a news event.

## Markets without a central book

Not everything trades on a central exchange. **Foreign exchange** is the important case:
there is no single FX exchange. It is a decentralised network of banks, brokers,
electronic communication networks and liquidity providers, each quoting their own prices.

Consequences:

- There is no single official price for EUR/USD. There is a tight consensus, because
  arbitrage punishes divergence, but different venues genuinely show slightly different
  numbers at the same instant.
- There is no consolidated volume figure. Volume shown on an FX chart is your broker's
  or data provider's tick count, not market-wide traded volume.
- Your broker's quote is its own, derived from its liquidity providers plus its own
  adjustment.

That last point is central to CFDs and Module 2 returns to it.

## Where a CFD price comes from

You do not trade the underlying market. You trade **your broker's quote**, which is
derived from it.

The chain, roughly:

1. The underlying market (exchange, or a network of FX liquidity providers) produces
   prices.
2. Your broker aggregates feeds from one or more liquidity providers.
3. The broker derives its own bid and ask, typically by taking the aggregate and adding
   a markup.
4. That derived quote is what appears on your platform and what your P&L is calculated
   from.

So your CFD price tracks the underlying closely but is not identical to it, and the
difference is part of how the broker is paid. It also means the quality of your broker's
price feed is a real cost that does not appear on any statement.

## Key points

- "The price" is a summary of current willingness to transact, not a property of the asset
- A limit order book holds resting orders; market orders consume them
- Limit orders control price but not execution; market orders control execution but not price
- Price moves both from executions and from orders being added or withdrawn
- FX has no central exchange, so there is no single official price or volume figure
- A CFD price is your broker's derived quote, not the underlying market's price

## Exercise 01.1

Using the order book above, work out the average fill price for a market order to buy
4,000 units, and how far the best ask has moved afterwards. Then do the same for a
market order to sell 4,000 units. Compare the two average prices and explain the
difference to yourself in one sentence.

---

Next: [01.2 — Bid, ask and spread](02-bid-ask-spread.md)
