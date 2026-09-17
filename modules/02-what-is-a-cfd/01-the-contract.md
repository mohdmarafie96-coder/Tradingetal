# 02.1 — The Contract

## Definition

> A **Contract for Difference** is an agreement between two parties to exchange the
> difference in the price of an underlying asset between the time the contract is opened
> and the time it is closed.

Unpack each part, because each one carries consequences.

**"An agreement between two parties."** You and your broker. Not you and another trader,
not you and an exchange. The broker is your **counterparty**. If the broker fails, your
claim is against the broker, not against any asset. This is counterparty risk and it is
covered in 02.4.

**"To exchange the difference."** Only the price change is settled, in cash. Nothing is
delivered. You never receive euros, barrels of oil or shares.

**"In the price of an underlying asset."** The contract *references* an asset. The
reference is what gives it economic meaning, but the reference is all it is.

**"Between the time the contract is opened and closed."** There is no fixed expiry on a
standard CFD. You choose when it ends. This is why financing is charged: the position is
open-ended, so the funding must be charged as it accrues.

## What actually happens when you trade

Suppose you buy 100 CFDs on a share at $50.00 and close at $53.00.

1. **Open.** You and the broker agree a contract referencing 100 shares at $50.00. No
   shares are bought. No $5,000 changes hands. The broker requires **margin** — say 20%,
   so $1,000 — set aside from your balance as collateral. It is not a payment; it is
   still your money, reserved.
2. **While open.** The position is marked to market continuously. Your unrealised P&L
   moves with the price. If the share goes ex-dividend, an adjustment is applied. Each
   night the position is held, financing is charged.
3. **Close.** You close at $53.00. The difference, $3.00 × 100 = $300, is credited to
   your account in cash. The margin is released. Costs are deducted.

Net effect: you had $5,000 of economic exposure using $1,000 of your capital, made $300,
and never touched a share.

## What you own

**Nothing.** This is the single most important structural fact about the product.

| | Share | Share CFD |
|---|---|---|
| Legal ownership | Yes | No |
| Voting rights | Yes | No |
| Entitlement in issuer insolvency | Yes (residual) | No |
| Dividends | Received directly | Cash adjustment from broker |
| Can transfer to another broker | Yes | No |
| Claim if **broker** fails | Shares are yours, held in custody | Unsecured creditor claim |

That last row deserves emphasis. If you own shares through a broker and the broker
collapses, the shares are held in custody and are generally identifiable as yours. If you
hold CFDs and the broker collapses, you hold a contract with an insolvent company. Client
money rules and compensation schemes exist in regulated jurisdictions and materially
improve this position, but the starting point is different in kind.

## Why the product exists

CFDs offer four things that are genuinely useful and that shares do not:

1. **Leverage.** Exposure larger than your capital.
2. **Symmetrical shorting.** Going short is exactly as easy as going long, with no stock
   borrow to arrange.
3. **Breadth from one account.** FX, indices, commodities, shares and bonds through a
   single interface and a single margin pool.
4. **Fractional sizing.** You can take 0.01 lots, or exposure to a fraction of a share.

They also offer a fifth thing, which is not a feature: **the ability to take a position
far larger than is prudent, instantly, with no friction.** Every genuine benefit above is
the same mechanism that produces the loss statistics.

## Financing: the cost of an open-ended leveraged contract

A long CFD is economically a borrow. The broker is providing you exposure to $5,000 of
stock while you have posted $1,000. The $4,000 difference is funded, and you pay for it
nightly.

Rough shape of the charge:

```
Daily financing ≈ (position notional × (benchmark rate + broker markup)) / 365
```

with the markup typically 2% to 3% annualised each way, the day count varying by
instrument (360 for many FX and commodity conventions, 365 for equities and indices), and
triple charges applied on one night per week to cover the weekend.

Short positions receive the benchmark rate minus the markup, which means in a low-rate
environment shorts often **pay** too. The important practical point: **when the markup
exceeds the benchmark rate, both directions cost money.** You verified this yourself in
Exercise 01.4(c).

Module 3.4 does the arithmetic properly. For now, take the principle: a CFD is not a
buy-and-hold instrument. Financing compounds against you, and over months it can exceed
the price move you were hoping for.

## A worked contrast

You are bullish on a $50 share and want $5,000 of exposure for six months. It rises to
$55, a 10% gain.

| | Buy shares | Buy CFDs |
|---|---|---|
| Capital required | $5,000 | $1,000 margin |
| Gross gain | $500 | $500 |
| Commission | ~$10 round trip | ~$10 round trip |
| Financing (6 months @ 6.5%) | $0 | ~$163 |
| Net gain | ~$490 | ~$327 |
| Return on capital deployed | 9.8% | **32.7%** |
| Capital free for other use | $0 | $4,000 |

The CFD produces a far higher return on capital deployed. Now run the same comparison
with the share falling to $45:

| | Buy shares | Buy CFDs |
|---|---|---|
| Gross loss | −$500 | −$500 |
| Financing | $0 | −$163 |
| Net | −$510 | −$673 |
| Loss vs capital deployed | −10.2% | **−67.3%** |
| Position status | Still held; may recover | **Margin call territory** |

Same view, same market, same outcome in the underlying. The shareholder is down 10% and
can wait. The CFD trader is down 67% of deployed capital and, with only $1,000 posted,
is at risk of being closed out before any recovery.

That asymmetry — identical analysis, radically different survival — is the entire
subject of Module 4.

## Key points

- A CFD is a cash-settled contract with your broker to exchange a price difference
- You own nothing and have no rights in the underlying
- Your counterparty is the broker; broker failure is a real risk category
- No expiry, hence nightly financing on open positions
- Financing often costs money in both directions
- CFDs raise return on capital deployed and raise the risk of ruin by the same mechanism

## Exercise 02.1

**(a)** In one sentence each, without looking back: what is a CFD, who is your
counterparty, and what do you own?

**(b)** Rerun the comparison table above with a 3% benchmark rate and a 2.5% markup, held
for 12 months, on a share that finishes unchanged at $50. What is the CFD position's P&L?
What is the shareholder's? State the general principle this illustrates.

**(c)** Find your broker's client money / client asset disclosure and its compensation
scheme membership. Note the maximum compensation per client and what events it covers.
Most traders never read this and discover it matters only when it is too late.

---

Next: [02.2 — CFDs versus owning the asset](02-vs-owning.md)
