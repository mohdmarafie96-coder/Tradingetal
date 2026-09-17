# 08.3 — Journaling and Metrics

## Why memory is not enough

Human memory of trading is systematically distorted, and the distortions all run the same
way. You remember the big winner and the trade you avoided. You forget the six small losses
and the winner you cut early. You reconstruct your reasoning after knowing the outcome, and
the reconstruction is always more coherent than the original thought.

A journal is the only defence. It is also the only way to compute the metrics that tell you
whether anything is working.

**If you do not journal, you are not learning from your trading.** You are accumulating
impressions.

## What to record

Use the [journal template](../../templates/trade-journal-template.csv). A spreadsheet is
fine and preferable to an app, because you need to compute your own statistics.

### At entry, before the outcome is known

| Field | Why |
|---|---|
| Date and time | Session and timing analysis |
| Instrument | |
| Direction | |
| Setup name | Which rule generated this |
| Entry price (intended) | To measure slippage |
| Entry price (actual) | |
| Stop price | |
| Target price | |
| Stop distance (pips) | |
| Position size | |
| Risk in currency | |
| Risk as % of equity | Compliance check |
| Planned R:R | |
| Account equity at entry | |
| Reason, in one sentence | **Written before the outcome** |
| Screenshot | Chart at entry |
| Confidence, 1–5 | To test whether confidence predicts anything |

**The reason field must be written before you know the outcome.** Reasoning recorded
afterwards is contaminated by the result and is worth nothing.

### At exit

| Field | Why |
|---|---|
| Exit date and time | |
| Exit price | |
| Exit reason | Target, stop, trail, time, invalidation, manual |
| Gross P&L | |
| Costs | Spread, commission, financing, itemised |
| Net P&L | |
| R-multiple achieved | The key number |
| Slippage on entry and exit | Execution quality |
| **Followed the plan?** | Yes/No, with detail if no |
| Notes | What you observed, what you felt |

### The process-compliance flag

The most important field in the journal, and the one most often omitted.

Every trade is classified:

| | Followed plan | Violated plan |
|---|---|---|
| Won | Good | **Dangerous** |
| Lost | **Good** | Bad |

Track the **percentage of trades that followed the plan**. Target: 100%. Below 90% means
your problem is execution, not strategy, and no amount of strategy refinement will help
until that is fixed.

This is the metric most likely to change your behaviour, because it is the only one you
fully control.

## The metrics

Compute these monthly, and only once you have 30+ trades.

### Expectancy

```
Expectancy (R) = (win rate × average win in R) − (loss rate × average loss in R)
```

The headline number. Positive after costs is the whole objective.

### Profit factor

```
Profit factor = gross profit / gross loss
```

| Value | Reading |
|---|---|
| Below 1.0 | Losing |
| 1.0 – 1.3 | Marginal; likely noise |
| 1.3 – 1.6 | Decent |
| Above 1.6 | Strong; verify it is not over-fitted |
| Above 3.0 | Suspect an error or too small a sample |

### Win rate

```
Win rate = winning trades / total trades
```

Informative only alongside average win and loss. Alone it means nothing.

### Average win and average loss, in R

Average loss should be close to −1R. If it is −1.4R, your stops are slipping, you are
exiting worse than planned, or you are not honouring stops. That diagnosis is only
available if you record R-multiples.

### Maximum drawdown

Largest peak-to-trough decline in equity, as a percentage. Compare to the limit in your
plan.

### R-multiple distribution

Plot a histogram of R-multiples across all trades. More informative than any single
statistic.

Healthy shape: a cluster around −1R (stops working correctly), a cluster of small winners,
and a tail of larger winners.

Warning shapes:

- **Losses beyond −1R** — stops not honoured, slipping, or gaps
- **No winners above 2R** — you are truncating winners
- **One enormous winner carrying everything** — the expectancy is an artefact of a single
  trade and will not repeat

### Per-setup breakdown

If you trade more than one setup, compute expectancy for each. Frequently one setup carries
the strategy and another loses steadily, hidden inside the aggregate. You cannot see this
without the breakdown.

### Time and session analysis

Group by day of week, session, and time held. Patterns sometimes emerge — losses
concentrated in one session, or all your damage on Fridays. Treat these cautiously, since
slicing data many ways will produce apparent patterns by chance, but a large and
persistent effect is worth acting on.

## Worked example

40 trades over three months:

| | |
|---|---|
| Total trades | 40 |
| Wins | 16 |
| Losses | 24 |
| Win rate | 40% |
| Average win | +2.3R |
| Average loss | −1.05R |
| Gross profit | 36.8R |
| Gross loss | 25.2R |
| **Expectancy** | (0.40 × 2.3) − (0.60 × 1.05) = **+0.29R** |
| **Profit factor** | 36.8 / 25.2 = **1.46** |
| Total | +11.6R |
| Maximum drawdown | 6.2% |
| Plan compliance | 85% |

**Reading it:**

Expectancy is positive and profit factor is respectable. At 0.5% risk, +11.6R is +5.8% over
three months, which is a good outcome.

Two problems are visible.

**Average loss is −1.05R, not −1.0R.** Small, but it means something is leaking: slippage,
or exits slightly worse than the stop. Worth investigating, because it is a systematic
cost.

**Compliance is 85%.** Six trades violated the plan. That is the most important number
here. Before changing anything about the strategy, find out what those six had in common.
Frequently they are all the same thing: entries taken when no setup was present, after a
period of no signals.

**Sample size caveat:** 40 trades supports a weak conclusion at best. The expectancy could
plausibly be anywhere from slightly negative to +0.6R. Continue; do not scale up.

## Reviewing

**Weekly (20 minutes).** Every trade against the plan. Compliance percentage. One
observation worth carrying forward. No metric computation, no strategy changes.

**Monthly (60 minutes).** All metrics. Per-setup breakdown. R-multiple histogram. Compare
against the plan's limits. Consider amendments only if you have 30+ new trades and evidence.

**Quarterly (2 hours).** Is the strategy still working? Has the market regime changed? Is
the plan still appropriate to your account size and available time? Should anything be
retired?

## Common journaling failures

**Recording only outcomes.** Price in, price out, P&L. This tells you nothing about
decisions. The reasoning and compliance fields are where the value is.

**Writing reasoning after the exit.** Contaminated. Worthless.

**Skipping losing trades.** Common, unconscious, and fatal to the entire exercise.

**Never computing anything.** A journal you do not analyse is a diary.

**Recording in currency rather than R.** Makes trades of different sizes incomparable and
hides the actual distribution.

## Key points

- Memory of trading is systematically distorted toward a flattering account
- Record reasoning at entry, before the outcome is known
- The process-compliance flag is the most important field
- Journal in R-multiples, not currency
- Compute expectancy, profit factor, average win and loss, drawdown, and the R distribution
- Break metrics down per setup; aggregates hide losing components
- Review weekly for compliance, monthly for metrics, quarterly for strategy

## Exercise 08.3

**(a)** Set up your journal from the template. Add columns for anything specific to your
plan.

**(b)** Journal every demo trade for two weeks, with full fields. Note how long it takes
per trade. Most people find it is under three minutes.

**(c)** For your existing demo trades, compute win rate, expectancy, profit factor, average
win, average loss and maximum drawdown. State what you can and cannot conclude given your
sample size.

**(d)** Plot an R-multiple histogram. Compare its shape to the healthy and warning shapes
above. What does yours suggest?

**(e)** Compute your plan compliance percentage. For every violation, write down what the
trigger was. Look for a common factor.

**(f)** Check whether your confidence rating at entry correlates with the R-multiple
achieved. Most traders find no relationship, and some find a negative one. Record your
result.

---

Next: [08.4 — Testing](04-testing.md)
