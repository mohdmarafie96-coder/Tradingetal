# 08.2 — Writing the Plan

## Why it must be written

A plan that exists only in your head is not a plan. It is a set of intentions that will be
revised, unconsciously and in your favour, at exactly the moments when revision is most
costly.

Writing it down does three things:

1. **Forces specificity.** You cannot write "buy when it looks good" without noticing.
2. **Creates a reference** you can check compliance against.
3. **Separates the deciding from the doing.** Decisions made calmly, in advance, applied
   mechanically in the moment.

## The components

Use the [trading plan template](../../templates/trading-plan-template.md). Each section
below explains what goes in it.

### 1. Objectives and constraints

- What you are trying to achieve, in specific terms
- Capital allocated, and confirmation that its total loss is survivable
- Time available per day and per week
- Your review schedule
- What would make you stop trading entirely

Be concrete. "Make money" is not an objective. "Achieve positive expectancy over 200 trades
on demo, then trade £1,000 of risk capital with a maximum 20% drawdown" is.

### 2. Markets and timeframes

- Which instruments you trade, and only those
- Which timeframes: higher for context, trading, and entry
- Which sessions you trade and which you avoid

**One instrument while learning.** Adding instruments multiplies your costs, your
correlated exposure and your cognitive load, and divides your attention.

### 3. Setup definition

The market conditions that must be present before you look for an entry. Objective and
checkable.

Example:

> **Setup A — trend pullback (long)**
> - H4 chart
> - 50-EMA above 200-EMA
> - 50-EMA rising over the last 10 candles
> - Price has retraced to within 0.5 ATR of the 50-EMA
> - No high-impact release for EUR or USD within 60 minutes
> - London or New York session only

### 4. Entry trigger

The specific event that causes you to place an order.

> **Trigger:** A candle closes above the previous candle's high, with the close in the
> upper half of the candle's range.
> **Entry:** Market order at the open of the next candle.

### 5. Stop loss

Where it goes, how it is calculated, and the rules for moving it.

> **Initial stop:** Below the lowest low of the last 5 candles, with a minimum of 1.5 ATR
> from entry. If the structural level is closer than 1.5 ATR, use 1.5 ATR.
> **Moving:** No movement until +1.5R. At +1.5R, move to entry plus the spread. Beyond
> +2R, trail at 3 ATR.
> **Never widened.** Under any circumstances.

### 6. Exit and targets

> **Target:** 2.5R, placed as a limit order at entry.
> **Partial:** Close half at +1.5R, trail the remainder.
> **Time stop:** Close any position that has not reached +1R within 20 H4 candles.
> **Invalidation:** Close immediately if the 50-EMA crosses below the 200-EMA.

### 7. Position sizing

> Risk 0.5% of current equity per trade while on demo, 0.5% for the first 100 live trades,
> 1% thereafter if expectancy over those 100 trades is positive.
> Size = risk / (stop distance × pip value). Always rounded down.
> If the calculated size is below the platform minimum, the trade is not taken.

### 8. Risk limits

| Limit | Value | Enforcement |
|---|---|---|
| Per trade | 0.5% | Calculated before every entry |
| Per correlation group | 1.5% | Checked before every entry |
| Total open risk | 3% | Checked before every entry |
| Maximum effective leverage | 5:1 | Checked before every entry |
| Daily loss limit | 2% or 3 consecutive losses | Platform closed for the day |
| Weekly loss limit | 4% | No trading until the weekly review |
| Monthly loss limit | 8% | Full strategy review before resuming |
| Maximum drawdown | 15% | Stop. Return to demo. |
| Maximum simultaneous positions | 3 | Checked before every entry |

### 9. Event policy

> - No new positions within 60 minutes either side of a high-impact release for my
>   instrument's currencies.
> - Positions open into a high-impact release are reduced by half.
> - No positions held over a weekend while account equity is below its starting value.
> - No share CFDs held through earnings.

### 10. Routine

**Pre-session (10 minutes):**
- Check the economic calendar
- Check open positions and existing orders
- Cancel stale pending orders
- Note current ATR and volatility regime
- Confirm account state: equity, used margin, margin level, total open risk

**Per trade:**
- Complete the [pre-trade checklist](../../templates/pre-trade-checklist.md)
- Place the order as a bracket
- Journal immediately

**End of session (10 minutes):**
- Record all closed trades
- Note any plan violations
- Note anything unclear, for the weekly review

**Weekly:**
- Review every trade against the plan
- Compute the metrics from Lesson 08.3
- Note any rule that was hard to follow, and why

**Monthly:**
- Full metric review
- Consider whether any rule should change, and record the evidence
- Verify risk limits are still appropriate for account size

### 11. Review and amendment rules

This section prevents the plan from being edited in the heat of the moment.

> - The plan may only be amended at a scheduled monthly review.
> - No amendment may be made while a position is open.
> - No amendment may be made within 48 hours of a loss.
> - Any amendment must cite evidence from at least 30 trades.
> - All amendments are dated and the previous version retained.

That third rule is the one that matters most. Almost every destructive plan change is made
within a day of a painful loss.

## A complete worked example

A short, complete plan for a beginner, in the format above.

---

**Trader:** [name] · **Version:** 1.0 · **Date:** [date]

**Objective.** Achieve positive expectancy over 200 demo trades before risking capital.
Learn to execute a defined strategy consistently. No monetary target.

**Capital.** Demo $2,000, mirroring the £1,500 I would fund. Loss of that amount would be
unwelcome and not materially harmful.

**Time.** 30 minutes per evening, one hour at the weekend.

**Instrument.** EUR/USD only.

**Timeframes.** D1 for context, H4 for setups and entries.

**Session.** Evaluate at 21:00 local, after the H4 close. No intraday monitoring.

**Setup A — trend pullback long.** On H4: 50-EMA above 200-EMA; 50-EMA higher than it was
10 candles ago; price within 0.5 ATR of the 50-EMA; no high-impact EUR or USD release in
the next 12 hours.

**Setup B — trend pullback short.** The mirror image.

**Trigger.** A completed H4 candle closing back above (long) or below (short) the 50-EMA,
with the close in the upper (lower) half of its range.

**Entry.** Market at the next H4 open.

**Stop.** Beyond the extreme of the last 5 candles, minimum 1.5 ATR(14) H4.

**Target.** Limit at 2.5R. No partials in version 1.0, to keep the data clean.

**Stop movement.** None before +1.5R. At +1.5R, move to break-even plus 2 pips. No other
movement. Never widened.

**Time stop.** Close at 20 H4 candles if not at +1R.

**Sizing.** 0.5% of current equity. Size = risk / (stop pips × pip value), rounded down to
0.01 lots. Below 0.01 lots, no trade.

**Risk limits.** Per trade 0.5%. Maximum 2 open positions. Total open risk 1%. Daily limit
2 losses. Weekly limit 2%. Stop and review at 10% drawdown.

**Events.** No new positions within 12 hours of a high-impact EUR or USD release. Open
positions held, because the stop is wide relative to typical release moves and version 1.0
is testing the base rules. Reviewed after 50 trades.

**Journal.** Every trade logged at entry with a screenshot, and at exit with the outcome
and a process-compliance flag.

**Review.** Weekly compliance check. Monthly metric review. No amendments before 50 trades.

---

That plan is short, testable, and boring. All three are features. A plan you can state in
one page is a plan you can follow.

## Common failures

**Too vague.** If it cannot be checked, it cannot be followed or tested.

**Too complex.** Nine setups and twelve filters cannot be executed consistently and cannot
accumulate a meaningful sample on any one of them.

**No risk limits.** The most common and most expensive omission.

**No review schedule.** Without review, mistakes repeat indefinitely.

**No stop-trading condition.** Without one, a failing strategy is traded until the money
is gone.

**Amended after every loss.** The plan becomes a record of your emotional history rather
than a strategy.

## Key points

- A plan must be written; an unwritten plan is revised silently in your favour
- Specify setups precisely enough for another person to replicate
- Include risk limits with concrete enforcement mechanisms
- Include an event policy and a routine
- Include amendment rules that prevent editing in the heat of the moment
- Short and boring beats comprehensive and unfollowable

## Exercise 08.2

**(a)** Write your complete trading plan using the
[template](../../templates/trading-plan-template.md). Every section. This is the main
deliverable of the module.

**(b)** Give your plan to someone else, ideally another trader. Ask them to identify any
rule they could interpret in more than one way. Rewrite those rules.

**(c)** Take the last 20 candles on your instrument and apply your plan mechanically. How
many trades does it generate? Is that a workable frequency for your available time?

**(d)** For each risk limit in your plan, write the specific physical enforcement
mechanism. "I will be disciplined" is not a mechanism. "I close the platform and log out"
is.

**(e)** Write your amendment rules and commit to them. Then note today's date and the date
of your first permitted review.

---

Next: [08.3 — Journaling and metrics](03-journaling.md)
