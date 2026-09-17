# 02.3 — Going Long and Going Short

## Long

To go **long** is to open a position that profits if price rises.

- You open by **buying at the ask**
- You close by **selling at the bid**
- Profit per unit = closing bid − opening ask

Worked example. Long 0.5 lots (50,000 units) EUR/USD.

| | |
|---|---|
| Entry (ask) | 1.08500 |
| Exit (bid) | 1.08750 |
| Move | +0.00250 = 25 pips |
| Units | 50,000 |
| Gross P&L | 50,000 × 0.00250 = **+$125.00** |

Then subtract costs. With a 1.2 pip spread already reflected in trading ask-to-bid, and
say $3.50 per lot per side commission:

| | |
|---|---|
| Gross P&L | +$125.00 |
| Commission (0.5 lots × $3.50 × 2 sides) | −$3.50 |
| Financing (2 nights, say −$1.80/night per 0.5 lot) | −$3.60 |
| **Net P&L** | **+$117.90** |

## Short

To go **short** is to open a position that profits if price falls. In a CFD this requires
no borrowing, no locate, and no additional permission. You simply open in the other
direction.

- You open by **selling at the bid**
- You close by **buying at the ask**
- Profit per unit = opening bid − closing ask

Worked example. Short 0.5 lots EUR/USD.

| | |
|---|---|
| Entry (bid) | 1.08500 |
| Exit (ask) | 1.08250 |
| Move | −0.00250 = 25 pips in your favour |
| Gross P&L | 50,000 × 0.00250 = **+$125.00** |

Mechanically symmetrical. The arithmetic is a mirror image.

**Why shorting a CFD is easy when shorting shares is hard.** With real shares you must
borrow stock from a holder, pay a borrow fee, and accept that the lender can recall it at
any time, forcing you to close. There is no share to borrow in a CFD, because there is no
share at all. You are simply on the other side of a contract with the broker.

This is one of the genuinely useful features of the product, and one of the few places
where a retail trader gets something structurally comparable to an institution.

## Where the symmetry breaks

The arithmetic is symmetrical. The risk is not. Four asymmetries matter.

### 1. Unbounded loss on the short side

A long position's worst case is the asset going to zero. Buy at $50, the company fails,
you lose $50 per unit. Bad, but bounded.

A short position has no upper bound. Short at $50, and the stock can go to $80, $200,
$500. Your loss is unbounded in principle.

In practice, margin close-out and negative balance protection (02.4) limit what you
actually lose to your account balance. But the position can be destroyed far faster from
the short side, because the loss per unit of adverse move is not capped.

### 2. Short squeezes

When a heavily shorted asset rises, shorts are forced to buy to close, which pushes it
higher, forcing more shorts to close. The feedback loop produces moves that are
disconnected from any fundamental value. Several well-publicised episodes have seen
stocks rise multiples in days on this mechanism alone.

There is no equivalent forced-buying dynamic on the long side of comparable violence.

### 3. Asymmetric price behaviour

Markets, particularly equity markets, tend to fall faster than they rise. Declines are
driven by fear and forced liquidation and are compressed in time; advances are driven by
accumulation and are more gradual.

This cuts both ways: shorts get faster payoffs when right, and longs get more violent
losses when wrong. It is a real statistical property, not folklore, and it interacts with
stop placement.

### 4. Financing and dividend asymmetry

Long positions usually pay financing. Short positions receive the benchmark rate minus
the markup, which in a low-rate environment is negative, so shorts pay too. Check your
own instrument rather than assuming.

On share CFDs, dividends are the sharper asymmetry. Long positions are credited roughly
the **net** dividend. Short positions are debited roughly the **gross** dividend. The
short pays more than the long receives, and this is a real, predictable cost. Holding a
short share CFD over an ex-dividend date is a scheduled charge, not a risk.

## Long and short are not opinions about the world

A useful reframing: going short is not "betting against" a company, an economy or a
market in any moral sense, and going long is not support for one. They are positions with
defined payoff profiles. Traders who attach identity to direction — permanent bulls,
permanent bears — make worse decisions, because they need the market to validate them.

Module 9 covers this properly. For now: the position is a tool, not a belief.

## Naming conventions worth knowing

| Phrase | Meaning |
|---|---|
| Long / going long / buying | Position profits if price rises |
| Short / going short / selling | Position profits if price falls |
| Closing a long | Selling to flatten; not the same as going short |
| Closing a short | Buying to flatten; not the same as going long |
| Flat / square | No position |
| Netting account | Long and short in one instrument offset to a single position |
| Hedging account | Long and short in one instrument held simultaneously |

That last distinction matters on some platforms. On a **hedging** account you can hold a
long and a short in the same instrument at once. It feels like risk reduction and is
almost always worse than simply closing: you pay two spreads, two sets of financing, and
your net exposure is zero anyway. It is usually a way of avoiding realising a loss, which
is a psychological problem rather than a strategic one.

## Key points

- Long: buy at ask, sell at bid; short: sell at bid, buy at ask
- Shorting a CFD is mechanically symmetrical and requires no stock borrow
- Loss on a long is bounded at zero; loss on a short is unbounded in principle
- Short squeezes, faster declines, and dividend debits all skew risk against the short
- Short share CFDs pay gross dividends; long positions receive net
- Holding offsetting long and short positions is almost always worse than closing

## Exercise 02.3

**(a)** Short 0.3 lots of GBP/USD at a bid of 1.26500, closed at an ask of 1.26180.
Commission is $3.50 per lot per side, and swap is +$0.40 per 0.1 lot per night held for
three nights. Calculate gross P&L, total costs, and net P&L.

**(b)** You are short 500 share CFDs in a company trading at $40. It announces a $0.60
gross dividend with an ex-date next week, and the stock is 18% short interest. Describe
every cost and risk you face over the coming two weeks, and quantify what you can.

**(c)** On demo, open a long and a short of equal size in the same instrument. Hold for
three days. Record the total cost. Then explain in writing why this was worse than
holding nothing.

---

Next: [02.4 — Regulation and jurisdiction](04-regulation.md)
