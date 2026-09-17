# 11.1 — The Eight-Week Programme

## Before week 1

- [ ] Modules 00–10 completed, all quizzes at 80% or above
- [ ] Demo account funded to a realistic figure, not the default
- [ ] One instrument chosen
- [ ] Journal set up from the template
- [ ] Confusion log reviewed and outstanding items resolved

## Week 1 — Write the plan

**Deliverable:** a complete trading plan, version 1.0, dated.

Use the [template](../../templates/trading-plan-template.md). Every section. Do not leave
anything as "to be decided".

**Tasks:**
- [ ] Objectives, capital, time available, stop-trading conditions
- [ ] Instrument and timeframes
- [ ] Setup definitions, precise enough for another person to apply
- [ ] Entry trigger
- [ ] Stop placement rules, including the rule for moving them
- [ ] Targets and exit rules
- [ ] Position sizing rule and a printed sizing table
- [ ] Risk limits with physical enforcement mechanisms
- [ ] Event policy
- [ ] Daily, weekly and monthly routines
- [ ] Amendment rules

**Test before proceeding:** hand the plan to someone else. Ask them to identify any rule
that could be read two ways. Rewrite those. Repeat until none remain.

**No trading this week.**

## Week 2 — Backtest

**Deliverable:** at least 100 backtested trades with full metrics.

**Tasks:**
- [ ] Choose a historical period of at least one year that you have not studied closely
- [ ] Use bar replay, advancing one candle at a time
- [ ] Record every trade in full: entry, stop, target, size, exit, R-multiple
- [ ] Include realistic costs: spread, commission, financing, and 1 pip of stop slippage
- [ ] Do not change any rule during the test
- [ ] Compute: win rate, expectancy, profit factor, average win, average loss, maximum
      drawdown, R-multiple distribution

**Then:**
- [ ] Split the period in half and compute metrics for each. Do they agree?
- [ ] Change one parameter by ±20% and rerun. Does performance degrade smoothly or
      collapse?

**Decision point.** If expectancy is negative after costs, do not proceed to the forward
test with this strategy. Revise the hypothesis and backtest again. Do not tune parameters
until the number turns positive; that is over-fitting.

## Weeks 3–10 — Forward test

**Deliverable:** at least 40 live-data demo trades over eight weeks, with weekly reviews.

**Rules for the entire period:**

- **No rule changes.** None. Write down anything you want to change and address it at the
  end.
- **Every trade journaled** at entry, before the outcome is known.
- **Process-compliance flag** on every trade.
- **Full routine** every session, including on days with no setups.
- **Risk limits enforced** with your stated mechanisms.

**Each week:**
- [ ] Trade the plan
- [ ] Journal every trade
- [ ] Complete a [weekly review](../../templates/weekly-review-template.md)
- [ ] Record compliance percentage

**At weeks 4 and 8:**
- [ ] Complete a [monthly review](../../templates/monthly-review-template.md)
- [ ] Compute all metrics
- [ ] Compare forward-test metrics against backtest metrics

### Week-by-week focus

Each week has one thing to pay particular attention to. Everything else continues as normal.

| Week | Focus |
|---|---|
| 3 | **Execution.** Did you place every trade your rules generated? Did you place any they did not? |
| 4 | **Sizing.** Was every position sized correctly and rounded down? Any breaches? |
| 5 | **Patience.** Count the setups you passed on correctly. That number is a skill measure. |
| 6 | **Losses.** How did you behave after each loss? Any tilt indicators from 09.2? |
| 7 | **Costs.** Reconcile against the platform statement. Was your cost estimate accurate? |
| 8 | **Boredom.** How many trades were taken outside the rules during quiet periods? |
| 9 | **Consistency.** Compare this week's process to week 3. What has changed? |
| 10 | **Honesty.** Review every journal entry. Are any reasoning fields written after the fact? |

## Week 11 — Analysis

**Deliverable:** a complete written analysis.

- [ ] All metrics computed over the full forward test
- [ ] R-multiple histogram plotted
- [ ] Per-setup breakdown if you trade more than one
- [ ] Compliance percentage over the full period, and the trend across weeks
- [ ] Every compliance violation listed with its trigger
- [ ] Forward test compared to backtest; explain any large divergence
- [ ] Every cost category totalled, as a percentage of gross P&L
- [ ] Maximum drawdown compared to your stated limit
- [ ] The list of rule changes you wanted to make, now considered with evidence

## Week 12 — The decision

See [11.3 — The decision](03-decision.md).

## If it goes wrong

**You hit your drawdown limit.** Stop, per your plan. Analyse. This is the system working.

**Compliance is poor.** The strategy result is uninterpretable, because you did not trade
it. Restart the forward test after addressing the discipline problem with the structures
from Module 09.3.

**Too few setups.** Fewer than 20 trades in eight weeks means either your rules are too
restrictive or your timeframe is too high for the sample you need. Extend the forward test
rather than loosening the rules.

**You broke the no-changes rule.** Start the eight weeks again. This is not punishment; the
data is genuinely not usable, because you tested two different strategies and can attribute
the results to neither.

## Key points

- Write the plan first, in full, with no undecided sections
- Backtest 100+ trades before any forward testing
- Negative backtest expectancy stops the process; do not tune until it passes
- Eight weeks of forward testing with no rule changes
- Journal at entry, flag compliance, review weekly
- Poor compliance makes the result uninterpretable

---

Next: [11.2 — Final assessment](02-assessment.md)
