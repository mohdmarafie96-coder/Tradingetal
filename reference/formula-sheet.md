# Formula Sheet

Every calculation in the course, on one page. Print it.

---

## Contract mechanics (Module 03)

| Quantity | Formula |
|---|---|
| Units from lots | `units = lots × contract size` (100,000 for standard FX) |
| Notional value | `notional = units × price` |
| Spread | `spread = ask − bid` |
| Spread cost | `cost = spread (price terms) × units` |

### Pip value, in the account currency

| Case | Formula |
|---|---|
| Quote ccy **is** account ccy (EUR/USD, USD acct) | `pip size × units` |
| Base ccy **is** account ccy (USD/JPY, USD acct) | `(pip size × units) / price` |
| Neither (EUR/GBP, USD acct) | `(pip size × units) × quote→account rate` |

Pip size: **0.0001** for most FX pairs, **0.01** for JPY pairs.

### Profit and loss

| Quantity | Formula |
|---|---|
| Long P&L | `(exit − entry) × units` |
| Short P&L | `(entry − exit) × units` |
| In pips | `pips gained × pip value` |

Long opens at the **ask**, closes at the **bid**. Short opens at the **bid**, closes at the
**ask**. P&L arrives in the quote currency and is converted at the **closing** rate.

### Costs

| Quantity | Formula |
|---|---|
| Daily financing (index/share/commodity) | `notional × (benchmark ± markup) / day count` |
| — long | pays `benchmark + markup` |
| — short | receives `benchmark − markup` (negative when markup exceeds benchmark) |
| Cost ratio | `total round-trip cost / risk per trade` |

Day count is 365 for most equity-linked instruments, 360 for many others. Triple swap is
charged one night per week, usually Wednesday for FX.

**Cost ratio guide:** under 10% sustainable · 10–25% meaningful drag · 25–50% fighting the
cost structure · over 50% something is wrong.

---

## Leverage and margin (Module 04)

| Quantity | Formula |
|---|---|
| Leverage | `notional / margin required` |
| Margin percentage | `1 / leverage` |
| Margin required | `notional / leverage` = `notional × margin %` |
| **Equity** | `balance + unrealised P&L` |
| Free margin | `equity − used margin` |
| **Margin level** | `(equity / used margin) × 100%` |
| Effective leverage | `total notional / equity` |
| Move that eliminates margin | `1 / leverage` |

### Retail leverage caps (UK/EU/AU)

| Instrument | Leverage | Margin |
|---|---|---|
| Major FX | 30:1 | 3.33% |
| Non-major FX, major indices, gold | 20:1 | 5% |
| Other commodities, non-major indices | 10:1 | 10% |
| Individual shares | 5:1 | 20% |
| Cryptocurrencies | 2:1 | 50% |

**Mandatory close-out at 50% of required initial margin.**

### Close-out point, solving for the adverse pip move

With margin recalculated as price moves, for a long position:

```
balance − P × pip value = (k / leverage) × units × (price − P × pip size)
```

where `k` is the close-out threshold as a decimal (0.5 for the 50% rule) and `P` is the
pip move. Rearranged:

```
P = [ (k × units × price / leverage) − balance ] / [ (k × units × pip size / leverage) − pip value ]
```

**Effective leverage guide:** under 2:1 conservative · 2–5:1 moderate · 5–10:1 aggressive ·
over 10:1 a single ordinary day can do severe damage.

---

## Risk management (Module 06)

| Quantity | Formula |
|---|---|
| **Position size** | `risk budget / (stop distance × value per point per unit)` |
| FX position size | `units = risk / (stop pips × pip size)` |
| Risk budget | `equity × risk %` |
| **R** | one unit of risk; the loss if the stop is hit |
| Reward-to-risk | `(target − entry) / (entry − stop)` for a long |
| **Break-even win rate** | `1 / (1 + reward-to-risk)` |
| **Expectancy** | `(win rate × avg win) − (loss rate × avg loss)` |
| Expectancy in R | `(W × avg win in R) − (1 − W)` |
| Profit factor | `gross profit / gross loss` |
| Drawdown | `(peak equity − current equity) / peak equity` |
| **Recovery gain** | `1 / (1 − drawdown) − 1` |
| After N losses | `remaining = (1 − risk %)^N` |
| Kelly fraction | `f* = W − (1 − W) / R` — use a tenth to a quarter |

**Always round position size DOWN.**

### Break-even win rates

| R:R | Break-even |
|---|---|
| 0.5 : 1 | 66.7% |
| 1 : 1 | 50.0% |
| 1.5 : 1 | 40.0% |
| 2 : 1 | 33.3% |
| 3 : 1 | 25.0% |
| 5 : 1 | 16.7% |

### Drawdown recovery

| Drawdown | Gain needed |
|---|---|
| 10% | 11.1% |
| 20% | 25.0% |
| 30% | 42.9% |
| 50% | 100% |
| 75% | 300% |
| 90% | 900% |

### Consecutive losses

| Risk | 5 | 8 | 10 | 15 |
|---|---|---|---|---|
| 0.5% | −2.5% | −3.9% | −4.9% | −7.2% |
| 1% | −4.9% | −7.7% | −9.6% | −14.0% |
| 2% | −9.6% | −14.9% | −18.3% | −26.1% |
| 5% | −22.6% | −33.7% | −40.1% | −53.7% |
| 10% | −41.0% | −56.9% | −65.1% | −79.4% |

### Losing streak probability, within N trades

Approximate: `P ≈ 1 − (1 − p^k(1−p))^(N−k+1)` where `p` is the loss probability, `k` the
streak length.

At a **45% win rate over 100 trades**: 5+ losses ≈ 89% · 6+ ≈ 70% · 7+ ≈ 48% · 8+ ≈ 30% ·
10+ ≈ 10%.

---

## Portfolio (Module 06.4)

| Quantity | Method |
|---|---|
| True group risk | Sum the risks of same-direction positions within a factor group |
| Total open risk | Sum across groups |
| Effective leverage | `total notional / equity` |

**Suggested limits:** 1% per trade · 2% per correlation group · 4–6% total open risk ·
5:1 maximum effective leverage · 3–5 simultaneous positions while learning.

---

## Quick sanity checks, before every trade

1. **Notional ÷ balance** — effective leverage on this one position
2. **Risk in currency** and as a percentage of equity
3. **Cost ratio** — round-trip cost ÷ risk
4. **Reward-to-risk** — computed, not estimated
5. **Total open risk** across all positions, grouped by factor
6. **Margin level** after this trade

---

## Checking your arithmetic

```bash
python3 tools/cfd_calc.py <command> --help
```

Do it by hand first.
