# 05.4 — Managing a Position

The lifecycle of a trade, from the decision to enter to the decision to stop reviewing it.
Most trading education stops at entry. Everything after entry is where the outcome is
determined.

## Before entry

**Every one of these is answered before you click.** Writing the answers down is the
difference between a trade and a gamble.

| Question | Must be answered |
|---|---|
| Why this trade? | The setup, stated in one sentence |
| Where is the entry? | Exact price or trigger condition |
| Where is the stop? | Exact price, structurally justified |
| Where is the target? | Exact price, or the exit rule if trailing |
| What is R? | Risk in currency, and as % of account |
| What is the reward-to-risk? | Computed, not estimated |
| What is the position size? | Calculated from risk ÷ stop distance |
| What is the round-trip cost? | And the cost ratio |
| What is my effective leverage after this? | Including existing positions |
| Any scheduled events before my target? | News, earnings, rollover, weekend |
| Correlated exposure? | Does this duplicate a position I already have? |

Use the [pre-trade checklist](../../templates/pre-trade-checklist.md). It takes ninety
seconds and it is the single highest-value habit in this course.

If you cannot answer all of these, you do not have a trade. You have an opinion.

## At entry

1. Place the order **with the stop attached** as a bracket. Never enter and add the stop
   afterwards. The interval between entry and stop placement is unbounded risk, and it is
   exactly when the market punishes people.
2. Confirm the fill price. If slippage was significant, recompute your actual risk. A fill
   3 pips worse on a 20-pip stop is 15% more risk than planned.
3. Record it in the journal immediately, including your reasoning, while it is fresh.
   Reasoning reconstructed after the outcome is known is worthless.

## While the position is open

The default action is **nothing**. You defined the plan before entry precisely so that
in-flight decisions would not be required. Most intervention is noise-driven and reduces
expectancy.

Legitimate reasons to act:

**Move the stop toward profit.** Only in the profitable direction, only per your rules,
and only once the trade has moved a meaningful multiple of R.

**Take a partial profit** at a pre-defined level, per your rules.

**Close early on invalidation.** Not because price moved against you — that is what the
stop is for — but because the *reason* for the trade has been falsified. You were long on
an expected earnings beat and the company pre-announced a miss. The thesis is dead; the
stop is now irrelevant. This is legitimate and distinct from panic, and the test is
whether you can name the specific fact that changed.

**Reduce before a scheduled event** you had not accounted for.

Illegitimate reasons, which cover the majority of real-world interventions:

- It feels like it is about to reverse
- It has been open a while and nothing is happening
- You are up a bit and would like to keep it
- You are down a bit and would like it to go away
- Someone on the internet said something
- You want to widen the stop

**Watching the position tick is not management.** For most retail traders on daily or
4-hour timeframes, checking once or twice a day is sufficient and produces better
decisions than watching continuously. Continuous observation generates interventions, and
interventions cost money.

## At exit

However it ends — target, stop, trail, or manual — do three things:

1. **Record the actual exit price and the actual P&L**, including all costs.
2. **Record the reason** for the exit in the categories: target hit, stop hit, trailed out,
   invalidated, manual override.
3. **Note, without judging yet, whether you followed your plan.** A losing trade that
   followed the plan is a good trade. A winning trade that violated the plan is a bad
   trade that happened to pay. Grading on outcome instead of process is how people learn
   the wrong lesson from randomness.

That last distinction is worth stating plainly, because it is counterintuitive and it is
the foundation of Module 8:

| | Followed plan | Violated plan |
|---|---|---|
| **Won** | Good trade | **Dangerous** — reinforces a bad habit |
| **Lost** | **Good trade** — the plan will have losers | Bad trade |

Over a small number of trades, outcome tells you almost nothing about decision quality.
Process compliance tells you a great deal. Track the thing that carries signal.

## After exit

**Do not immediately look for the next trade.** The urge to re-enter is strongest right
after a loss, and it is the mechanism that turns a bad trade into a bad day. Module 9
covers this.

Review the closed trade against the plan at your scheduled review, not in the moment.

## A worked lifecycle

**Setup.** EUR/USD has been in an uptrend, pulling back to a prior resistance level at
1.0850 that should now act as support. Account $5,000, risk 1% = $50.

**Pre-trade:**

| | |
|---|---|
| Entry | Buy limit 1.0855 |
| Stop | 1.0820 (below the swing low at 1.0828) |
| Stop distance | 35 pips |
| Target | 1.0940 (prior high) |
| Reward | 85 pips |
| Reward-to-risk | 2.43 : 1 |
| Position size | 50 / (35 × 0.0001) = 14,286 → **0.14 lots** |
| Actual risk | 35 × $1.40 = $49.00 (0.98%) |
| Notional | $15,197 |
| Effective leverage | 3.0:1 |
| Round-trip cost | ~$2.50 |
| Cost ratio | 5.1% |
| Events before target | ECB speech in 3 days — acceptable |

**Entry.** Limit fills at 1.0855, no slippage. Bracket places stop at 1.0820 and limit at
1.0940. Journal entry written.

**Day 2.** Price at 1.0872. Unrealised +$24. **Action: none.** Below the 1.5R threshold
for moving the stop.

**Day 3.** Price at 1.0910, +$77, about 1.6R. **Action: per plan, move stop to 1.0856**,
just above entry and just above a minor structural low at 1.0852. Risk is now removed.

**Day 4.** Price spikes to 1.0938, two pips short of target, then falls back to 1.0895.
**Action: none.** The target was not hit. The urge to "take it while it's there" is
exactly the in-flight decision the plan exists to prevent.

**Day 5.** Price reaches 1.0940. Limit fills. **+85 pips, +$119, net $116.50 after costs.
2.38R.**

**Journal:** target hit, plan followed in full, no overrides. Noted for review: the day-4
spike to within 2 pips of target — is the target 2 pips too ambitious, or was this a
single-sample coincidence? Flagged to check across the next twenty trades rather than
adjusted immediately.

That last line is the habit worth copying. One trade is never enough evidence to change a
rule.

## Key points

- Answer every pre-trade question before clicking; an unanswered question is not a trade
- Enter with the stop attached as a bracket, always
- The default action on an open position is nothing
- Legitimate interventions are rule-based or thesis-invalidation; the rest is noise
- Grade trades on process compliance, not outcome
- A winning trade that broke the plan is the most dangerous outcome available
- One trade is never enough evidence to change a rule

## Exercise 05.4

**(a)** Take the [pre-trade checklist](../../templates/pre-trade-checklist.md) and complete
it in full for a real setup on your chosen instrument. Do not place the trade. Just
complete the checklist and note how long it took and which questions you could not answer.

**(b)** Review your last ten demo trades. Classify each into the four-cell process/outcome
grid above. How many wins came from violating the plan? What habit would those wins have
reinforced?

**(c)** For one week, record every impulse to intervene in an open position, whether or
not you acted. Note the trigger and what happened afterwards. Most traders find that the
interventions they did not make would have cost them money.

**(d)** Write your own position management rules: when you move a stop, when you take
partials, what counts as invalidation, and how often you will check open positions. These
go into your trading plan in Module 8.

---

Next: [Module 05 quiz](quiz.md), then [Module 06 — Risk Management](../06-risk-management/)
