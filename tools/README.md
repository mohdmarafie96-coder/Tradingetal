# Tools

A dependency-free Python calculator for the arithmetic taught in Modules 3, 4 and 6.
Python 3.8 or later. No installation, no packages.

> **Use it to check work you have already done by hand.** Reaching for it before
> attempting a calculation defeats its purpose. In live trading you need to recognise a
> wrong position size immediately, and that recognition only comes from having done the
> arithmetic yourself many times.

## Running

```bash
python3 tools/cfd_calc.py --help
python3 tools/cfd_calc.py <command> --help
```

## Commands

### notional — economic exposure

```bash
python3 tools/cfd_calc.py notional --units 40000 --price 1.0920
```

### pip-value — value of one pip in your account currency

Three cases, per Module 03.2.

```bash
# Quote currency is your account currency (EUR/USD, USD account)
python3 tools/cfd_calc.py pip-value --units 25000 --pip-size 0.0001

# Base currency is your account currency (USD/JPY, USD account)
python3 tools/cfd_calc.py pip-value --units 100000 --pip-size 0.01 \
    --price 151.20 --base-is-account

# Neither (EUR/GBP, USD account, GBP/USD at 1.2700)
python3 tools/cfd_calc.py pip-value --units 100000 --pip-size 0.0001 \
    --quote-rate 1.2700
```

### margin — capital reserved against a position

```bash
python3 tools/cfd_calc.py margin --units 100000 --price 1.0850 --leverage 30
python3 tools/cfd_calc.py margin --units 100000 --price 1.0850 --margin-pct 3.33
```

### margin-level — account health

```bash
python3 tools/cfd_calc.py margin-level --equity 5000 --used-margin 1817
```

### position-size — the central calculation

`--pip-value-per-lot` (aliased `--pip-value`) is the value of one pip on **one standard
lot**, so 10.0 for a USD-quoted FX pair on a USD account. Always rounds down.

```bash
python3 tools/cfd_calc.py position-size --balance 5000 --risk-pct 1 \
    --entry 1.0880 --stop 1.0845 --pip-size 0.0001 --pip-value-per-lot 10
```

Warns when the result falls below the platform minimum. When that happens, use a
different instrument, a wider stop, or do not trade. Never raise the risk percentage to
make a trade fit.

### expectancy — whether a strategy makes money

`--avg-win` and `--avg-loss` are positive magnitudes in the same unit, R or currency.
`--cost` is subtracted per trade in that same unit.

```bash
python3 tools/cfd_calc.py expectancy --win-rate 0.40 --avg-win 2.5 --avg-loss 1.0
python3 tools/cfd_calc.py expectancy --win-rate 0.65 --avg-win 0.6 --avg-loss 1.0 --cost 0.07
```

### breakeven — win rate needed for a given reward-to-risk

```bash
python3 tools/cfd_calc.py breakeven --rr 2.5
```

### recovery — gain needed to undo a drawdown

```bash
python3 tools/cfd_calc.py recovery --drawdown-pct 35
```

### streak — effect of consecutive losses

```bash
python3 tools/cfd_calc.py streak --risk-pct 2 --losses 10
```

### streak-probability — how normal is that losing run?

```bash
python3 tools/cfd_calc.py streak-probability --win-rate 0.45 --streak 5 --trades 100
```

### financing — overnight cost

```bash
python3 tools/cfd_calc.py financing --units 5 --price 5120 \
    --rate 5.0 --markup 2.5 --direction long --nights 30
```

### cost-ratio — cost as a share of your risk budget

```bash
python3 tools/cfd_calc.py cost-ratio --cost 9.50 --risk 25
```

### kelly — optimal fraction, and the fractions actually used

```bash
python3 tools/cfd_calc.py kelly --win-rate 0.45 --rr 2.0
```

Full Kelly is correct only if your estimates are exact. They are not. Use a tenth to a
quarter.

### stop-out — the adverse move that closes you out

Solved allowing for margin being recalculated as price moves.

```bash
python3 tools/cfd_calc.py stop-out --balance 5000 --units 100000 \
    --price 1.0900 --leverage 30 --pip-size 0.0001 --pip-value 10
```

## Tests

```bash
python3 -m unittest discover -s tools -v
```

57 tests. Several pin the exact figures quoted in the lessons, so the tool and the course
text cannot drift apart.

## Using it as a library

```python
import sys
sys.path.insert(0, "tools")
import cfd_calc

result = cfd_calc.position_size(balance=5000, risk_pct=1.0,
                                entry=1.0880, stop=1.0845)
print(result["lots"], result["actual_risk"])
```

## Caveats

- Every figure is illustrative. Verify against your broker's contract specification.
- Financing is a simplified model. FX swaps are quoted directly by brokers and should be
  read from the specification rather than derived.
- The streak probability is a standard approximation and errs slightly low.
- Nothing here is financial advice.
