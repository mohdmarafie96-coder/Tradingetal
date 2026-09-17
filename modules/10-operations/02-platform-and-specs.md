# 10.2 — Platform and Contract Specifications

## The contract specification

Every instrument has one. It is the authoritative source for every number in Modules 3 and
4, and almost nobody reads it.

### What it contains

| Field | Why it matters |
|---|---|
| Contract size | Units per lot. Determines notional and pip value. |
| Minimum trade size | Whether correct position sizing is possible |
| Step size | The increment you can adjust by |
| Maximum trade size | Rarely binding, occasionally reduced in volatile conditions |
| Spread (typical / minimum) | Cost per round trip |
| Commission | Cost per side |
| Margin requirement | Capital reserved; implies maximum leverage |
| Swap long / swap short | Nightly financing, per lot |
| Triple swap day | Which night carries three days |
| Trading hours | Including daily break and rollover time |
| Minimum stop distance | How close a stop can be placed |
| Expiry / rollover | Whether the instrument expires, and what happens |
| Currency of denomination | Whether conversion applies |

### Reading one: a worked example

EUR/USD on a hypothetical broker:

```
Contract size:        100,000 EUR
Minimum size:         0.01 lots
Step:                 0.01 lots
Typical spread:       0.9 pips
Commission:           $3.50 per lot per side
Margin:               3.33%
Swap long:            −$7.85 per lot per night
Swap short:           +$1.20 per lot per night
Triple swap:          Wednesday
Trading hours:        Sun 22:05 – Fri 21:55 UTC, daily break 21:55–22:05
Min stop distance:    0 pips
Denomination:         USD
```

What you can derive immediately:

- 1 lot = 100,000 units; pip value = **$10.00**
- 0.01 lot minimum means minimum pip value is $0.10, so a 30-pip stop risks $3.00. Usable
  on a small account.
- Round trip on 0.1 lots: spread 10,000 × 0.00009 = $0.90, plus commission $0.70 =
  **$1.60**
- Margin on 0.1 lots at 1.0900: $10,900 × 3.33% = **$363**
- Holding 0.1 lots long for a week: 7 nights, one of which is triple, so 9 days ×
  $0.785 = **$7.07**. Compare that to the $1.60 round trip: financing dominates on a
  week-long hold.
- Short pays +$1.20 per lot, so 0.1 lots receives $0.12 per night. Positive, but small.

That is five useful numbers from one screen, and each of them changes a decision.

### What to check before trading any new instrument

- [ ] Contract size and therefore pip or point value
- [ ] Minimum size and whether correct sizing is possible on your account
- [ ] Total round-trip cost at your intended size
- [ ] Margin requirement and resulting effective leverage
- [ ] Swap in both directions, and the triple swap day
- [ ] Trading hours, including breaks
- [ ] Whether it expires or rolls, and what happens to open positions
- [ ] Denomination currency and conversion cost

## Platform setup

### Chart configuration

Keep it minimal, per Module 07.3.

- One instrument per chart
- Candlesticks
- Your two or three indicators, no more
- Marked levels, five maximum
- A clock showing UTC and your local time, since all schedules are published in various
  timezones

### Account information display

Have these visible at all times:

- Equity (not just balance)
- Used margin
- Free margin
- Margin level
- Total open positions

If your platform does not show these together, put them on a monitored panel or write them
down each session.

### Order defaults

Check and set these deliberately, because the defaults are frequently wrong for you:

- Default order size — set it to your minimum, so a mis-click is harmless
- Default stop and target — off, so you must set them consciously
- One-click trading — **off**. It removes the confirmation step that prevents errors.
- Deviation/slippage tolerance — set a maximum for market orders where supported

**One-click trading deserves emphasis.** It exists to reduce friction. Module 09.3
explained why friction is your ally. Turn it off.

### Alerts

Price alerts are more useful than watching charts. Set an alert at your setup level, close
the platform, and return when it fires. This directly addresses the boredom problem from
Module 09.2.

## Order history and exports

You need your trade history in a form you can analyse. Every platform can export to CSV or
HTML.

Export weekly and reconcile against your journal. Two reasons:

1. **Costs are often not visible on the trade ticket.** Financing charges in particular
   appear as separate account entries and are easy to miss when totalling your P&L.
2. **Your journal will have errors**, and reconciliation finds them.

Check specifically that your recorded net P&L matches the platform's, including every
financing entry and commission line. Traders who do not reconcile routinely overstate their
performance by the amount of the financing they forgot about.

## Backups and account security

- Two-factor authentication on the trading account and on the email linked to it
- A unique password
- Keep your own records; do not rely on the broker retaining history indefinitely
- Export statements monthly and store them
- Be aware that most brokers will not process a withdrawal to an account in a different
  name, so your funding source and withdrawal destination should match

## Key points

- The contract specification is the authoritative source for every calculation
- Check contract size, minimum size, costs, margin, swaps and hours before trading anything new
- Keep charts minimal and account metrics visible
- Turn one-click trading off
- Use price alerts instead of watching charts
- Export and reconcile trade history weekly, including financing entries
- Enable two-factor authentication and keep your own records

## Exercise 10.2

**(a)** Complete the full specification checklist for three instruments on your platform:
your chosen instrument, one index, and one share.

**(b)** For your chosen instrument, derive from the specification: pip value at 0.1 lots,
round-trip cost at 0.1 lots, margin at 0.1 lots, and the cost of holding 0.1 lots long for
one week. Show your working.

**(c)** Configure your platform per the guidance above. Screenshot the result. Confirm
one-click trading is off.

**(d)** Export your trade history and reconcile it against your journal. Report any
discrepancies, and note specifically whether you had accounted for all financing charges.

**(e)** Find one instrument on your platform that expires rather than rolls. Record the
expiry date and what your broker does to open positions at expiry.

---

Next: [10.3 — Records, costs and tax](03-records-and-tax.md)
