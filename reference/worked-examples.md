# Worked Examples

Ten complete trades and scenarios, start to finish, with every number shown. Work each one
yourself before reading the solution.

All figures are illustrative. A USD account is assumed throughout. Costs use $3.50 per lot
per side commission on FX unless stated.

---

## 1. A textbook winner

**Setup.** $5,000 account, 0.5% risk. EUR/USD in an uptrend on H4, pulling back to a prior
resistance level now acting as support.

**Sizing**

| | |
|---|---|
| Risk budget | $5,000 × 0.5% = **$25.00** |
| Entry (ask) | 1.0855 |
| Stop (below the swing low at 1.0828) | 1.0820 |
| Stop distance | 35 pips |
| Units | 25 / (35 × 0.0001) = 7,142 → **0.07 lots** |
| Pip value | $0.70 |
| **Actual risk** | 35 × 0.70 = **$24.50 (0.49%)** |
| Target (prior high) | 1.0940 |
| Reward | 85 pips |
| **Reward-to-risk** | **2.43 : 1** |
| Notional | 7,000 × 1.0855 = $7,598 |
| Margin at 30:1 | $253 |
| **Effective leverage** | **1.5 : 1** |

**Costs**

| | |
|---|---|
| Commission (0.07 × $3.50 × 2) | −$0.49 |
| Financing, 3 nights (0.07 × $7.85) | −$1.65 |
| **Total** | **−$2.14** |
| Cost ratio | 2.14 / 24.50 = **8.7%** — sustainable |

**Outcome.** Target hit on day 3.

| | |
|---|---|
| Gross | 85 × $0.70 = +$59.50 |
| Costs | −$2.14 |
| **Net** | **+$57.36** |
| **R-multiple** | **+2.34R** |

**Note.** The R-multiple is 2.34, not the planned 2.43, because costs are paid on both the
risk and the reward. Always journal the achieved R, not the planned one.

---

## 2. A textbook loser

The trade that matters more, because most trades lose.

**Setup.** Same $5,000 account, 0.5% risk. GBP/USD, short from range resistance.

| | |
|---|---|
| Risk budget | $25.00 |
| Entry (bid) | 1.2680 |
| Stop (above the range high) | 1.2722 |
| Stop distance | 42 pips |
| Units | 25 / (42 × 0.0001) = 5,952 → **0.05 lots** |
| Pip value | $0.50 |
| Planned risk | 42 × 0.50 = **$21.00** |

**Outcome.** Stopped out on day 2, with 1 pip of slippage.

| | |
|---|---|
| Actual exit (ask) | 1.2723 |
| Actual distance | 43 pips |
| Gross | −$21.50 |
| Commission | −$0.35 |
| Financing, 2 nights (positive swap on this short) | +$0.02 |
| **Net** | **−$21.83** |
| **R-multiple** | **−1.04R** |

**Note.** A "−1R" trade is really −1.04R once slippage and commission are included. Across a
hundred trades that difference is roughly 4R, which on a marginal strategy is the whole
edge. This is why the average loss in your journal should be checked against −1.0R.

---

## 3. Financing over a week

**Setup.** $10,000 account, 1% risk. Long US 500 index CFD, held through a weekend.

| | |
|---|---|
| Risk budget | $100.00 |
| Entry | 5,150 |
| Stop | 5,105 (45 points) |
| Point value | $1 per CFD |
| Size | 100 / 45 = 2.22 → **2 CFDs** |
| Actual risk | 45 × 2 = **$90.00** |
| Notional | 2 × 5,150 = $10,300 |
| Margin at 5% | $515 |
| Effective leverage | 1.03 : 1 |
| Target | 5,240 (90 points) |

**Financing.** Benchmark 5.0% + markup 2.5% = 7.5%, 365-day count.

```
Per night = 10,300 × 0.075 / 365 = $2.12
Held Monday to the following Monday = 7 days charged
Total = $14.81
```

**Outcome.** Target hit.

| | |
|---|---|
| Gross | 90 × $2 = +$180.00 |
| Financing | −$14.81 |
| **Net** | **+$165.19** |
| **R-multiple** | **+1.84R** |

**Note.** Financing consumed **8% of the gross profit in one week**. Over a quarter it would
have consumed most of it. This is the structural reason CFDs are a short-horizon instrument.

---

## 4. An earnings gap

The scenario every share CFD trader must understand before holding one overnight.

**Setup.** $20,000 account, 1% risk. Long a share at $62.00, stop $59.00. Earnings are
announced after the close on day 3.

| | |
|---|---|
| Risk budget | $200.00 |
| Stop distance | $3.00 |
| Size | 200 / 3.00 = 66.7 → **66 CFDs** |
| Planned risk | **$198.00** |
| Notional | 66 × 62 = $4,092 |
| Margin at 20% | $818 |

**Outcome.** Earnings miss. The share opens at **$48.50**, far below the stop.

| | |
|---|---|
| Fill price | $48.50 |
| Gross | (62.00 − 48.50) × 66 = **−$891.00** |
| Commission (0.1% per side, $10 minimum, both sides) | −$20.00 |
| Financing, 3 nights | −$2.52 |
| **Net** | **−$913.52** |
| **R-multiple** | **−4.61R** |
| As % of account | **−4.6%** |

**Note.** A position sized to risk 1% lost 4.6%. The stop did not fail; it was never
reachable. Earnings dates are published in advance, which makes this a **foreseeable and
avoidable** risk. The available responses were: close before the announcement, reduce size,
or pay for a guaranteed stop.

---

## 5. Volatility-based sizing, and the minimum size problem

**Setup.** Gold, ATR(14) on D1 = $24.00. Stop at 2 ATR. Contract size 100 oz per lot,
minimum 0.01 lots.

**Case A — $10,000 account, 0.5% risk**

| | |
|---|---|
| Risk budget | $50.00 |
| Entry | $2,395 |
| Stop (2 ATR) | $2,347 — **$48.00 away** |
| Ounces | 50 / 48 = 1.04 oz |
| Minimum tradable | 0.01 lots = 1 oz |
| Size | **0.01 lots** |
| Actual risk | 48 × 1 = **$48.00 (0.48%)** |

Fits, just.

**Case B — $8,000 account, 0.5% risk**

| | |
|---|---|
| Risk budget | $40.00 |
| Minimum position risk | $48.00 |
| Risk as % of account | **0.60%** |

**The minimum trade size makes correct sizing impossible.** The 0.6% figure exceeds the
budget by 20%.

The correct responses are: trade a different instrument, use a longer timeframe where a
wider stop means the same risk buys a smaller position, or do not take the trade. **The
response that is never correct is raising the risk percentage to make it fit**, because that
converts a constraint into an abandoned rule.

---

## 6. When the base currency is your account currency

**Setup.** $6,000 account, 1% risk. Long USD/JPY at 149.80.

Pip value here is **not** $10 per lot and it **drifts as price moves**.

| | |
|---|---|
| Risk budget | $60.00 |
| Entry | 149.80 |
| Stop | 149.35 (45 pips) |
| Pip value per unit | 0.01 / 149.80 = $0.00006676 |
| Units | 60 / (45 × 0.00006676) = 19,973 → **0.19 lots** |
| Pip value at 0.19 lots | (0.01 × 19,000) / 149.80 = **$1.268** |
| Actual risk | 45 × 1.268 = **$57.07 (0.95%)** |
| Target | 150.70 (+90 pips) |

**Outcome.** Target hit on day 3.

| | |
|---|---|
| Gross, in JPY | 0.90 × 19,000 = ¥17,100 |
| Converted at the closing rate of 150.70 | **+$113.47** |
| Commission (0.19 × $3.50 × 2) | −$1.33 |
| Financing, 3 nights (positive swap, long USD/JPY) | +$1.82 |
| **Net** | **+$113.96** |
| **R-multiple** | **+2.00R** |

**Note two things.** The JPY P&L is converted at the **closing** rate, not the entry rate.
And pip value rose from $1.268 to $1.272 as price rose, so your risk per pip drifted slightly
while the position was open. Both are specific to pairs where your account currency is the
base.

---

## 7. A scalping strategy destroyed by costs

**Setup.** $2,000 account, 1% risk. EUR/USD, 8-pip stop, 12-pip target, 30 trades a month.

| | |
|---|---|
| Risk budget | $20.00 |
| Units | 20 / (8 × 0.0001) = 25,000 → **0.25 lots** |
| Pip value | $2.50 |
| Planned risk | **$20.00** |
| Reward-to-risk | 1.5 : 1 |

**Costs per round trip**

| | |
|---|---|
| Spread, 1.0 pip | 25,000 × 0.0001 = $2.50 |
| Commission (0.25 × $3.50 × 2) | $1.75 |
| **Total** | **$4.25** |
| **Cost ratio** | 4.25 / 20 = **21%** |

**Effect on outcomes**

| | Gross | Net |
|---|---|---|
| Winner | +$30.00 (+1.50R) | +$25.75 (**+1.29R**) |
| Loser | −$20.00 (−1.00R) | −$24.25 (**−1.21R**) |

**Break-even win rate**

```
Gross: 1 / (1 + 1.5)                          = 40.0%
Net:   25.75W = 24.25(1 − W)  →  W = 24.25/50 = 48.5%
```

**Costs raise the required win rate from 40% to 48.5%**, which is an enormous difference in
how good the strategy has to be.

**Annual cost**

```
30 trades × $4.25 = $127.50 per month
                  = $1,530 per year
                  = 76.5% of the $2,000 account, per year, in costs alone
```

**Note.** The strategy is not obviously bad. The combination of a small account, a tight
stop and a high trade frequency is what makes it unviable. The same rules on a daily
timeframe, with a 100-pip stop and four trades a month, would have a cost ratio under 3%.

---

## 8. A correlated portfolio on a bad day

**Setup.** $10,000 account. Three positions, each looking reasonable on its own.

| Position | Notional | Margin |
|---|---|---|
| Long 0.6 lots EUR/USD at 1.0900 | $65,400 | $2,180 |
| Long 0.4 lots GBP/USD at 1.2700 | $50,800 | $1,693 |
| Long 8 CFDs US 500 at 5,150 | $41,200 | $2,060 |
| **Total** | **$157,400** | **$5,933** |

| | |
|---|---|
| Margin level | 10,000 / 5,933 = **169%** |
| **Effective leverage** | **15.7 : 1** |
| Risk factor | All three are short USD and/or long risk |

**Day 1.** Strong dollar, risk-off.

| Position | Move | P&L |
|---|---|---|
| EUR/USD | −120 pips at $6.00/pip | −$720 |
| GBP/USD | −150 pips at $4.00/pip | −$600 |
| US 500 | −90 points at $8.00/point | −$720 |
| **Total** | | **−$2,040** |

| | |
|---|---|
| Equity | $7,960 |
| Used margin (recalculated) | ~$5,884 |
| **Margin level** | **135%** |

**Day 2.** The move continues at similar magnitude: another −$2,000.

| | |
|---|---|
| Equity | $5,960 |
| **Margin level** | **~101%** — no new positions permitted |

**Day 3.** Close-out territory.

**Note.** Three positions felt like diversification. They were one bet on a weak dollar and
risk-on sentiment, expressed three ways, at 15.7:1 effective leverage. **A 2.6% adverse move
across the portfolio produced a 20% account loss in two days**, and none of the individual
positions was unusual.

---

## 9. A month of results

**Setup.** $5,000 account, 0.5% risk. 1R = $25. Twenty trades.

**Wins (8):** +2.4R, +1.8R, +3.1R, +2.0R, +1.2R, +2.6R, +0.8R, +2.2R = **+16.1R**

**Losses (12):** −1.0R × 9, −1.05R, −1.10R, −0.60R (exited early on invalidation) = **−11.75R**

| Metric | Value |
|---|---|
| Trades | 20 |
| Win rate | 40% |
| Average win | 16.1 / 8 = **+2.01R** |
| Average loss | 11.75 / 12 = **−0.98R** |
| **Expectancy** | (0.40 × 2.01) − (0.60 × 0.98) = **+0.22R** |
| **Profit factor** | 16.1 / 11.75 = **1.37** |
| Total | **+4.35R = $108.75** |
| Return | **+2.2%** |

**Reading it.**

The strategy loses 60% of the time and makes money, which is exactly what the break-even
table predicts at a 2R average win.

Average loss is −0.98R rather than −1.00R, which is healthy — the early invalidation exit at
−0.60R pulled it below 1, and there are no losses beyond −1.1R, so stops are being honoured.

**Sample size: 20 trades supports no conclusion at all.** The true expectancy could
plausibly be anywhere from slightly negative to +0.6R. Continue; do not scale up; do not
change anything.

---

## 10. Account type comparison over a year

**Setup.** Average size 0.4 lots, 20 round trips per month.

**Account A — standard, 1.3 pip spread, no commission**

```
Spread per round trip = 40,000 × 0.00013 = $5.20
Monthly = 20 × 5.20                      = $104.00
Annual                                    = $1,248
```

**Account B — raw, 0.3 pip spread, $3.50 per lot per side**

```
Spread    = 40,000 × 0.00003        = $1.20
Commission = 0.4 × 3.50 × 2          = $2.80
Per round trip                       = $4.00
Monthly = 20 × 4.00                  = $80.00
Annual                               = $960
```

**Difference: $288 per year.** On a $5,000 account that is **5.8% of the account annually**,
which is larger than many strategies' entire edge.

**Note.** The answer depends on your size. At 0.1 lots the commission is $0.70 and the
spread saving is $1.00, so B still wins but by less. At very small sizes fixed minimums can
reverse it. **Run the comparison with your own numbers**, and remember that neither headline
spread told you the answer.

---

## Checking your work

```bash
python3 tools/cfd_calc.py position-size --balance 5000 --risk-pct 0.5 \
    --entry 1.0855 --stop 1.0820

python3 tools/cfd_calc.py expectancy --win-rate 0.40 --avg-win 2.01 --avg-loss 0.98

python3 tools/cfd_calc.py financing --units 2 --price 5150 \
    --rate 5.0 --markup 2.5 --nights 7
```

Do the arithmetic by hand first.
