# 09.1 — Cognitive Biases

These are not character flaws. They are standard features of human cognition that happen to
be expensive in markets. Knowing about a bias does not remove it — the effect persists in
people who study it professionally — but it does let you build structures that route around
it.

## Loss aversion and the disposition effect

Losses feel roughly twice as bad as equivalent gains feel good. The consequence in trading
is the **disposition effect**: traders **sell winners too early and hold losers too long**.

The mechanism: closing a winner converts an uncertain gain into a certain one, which feels
good. Closing a loser converts an unrealised loss into a realised one, which is the moment
of pain. So people defer it.

**Why this is fatal:** it inverts the profile you need. Expectancy depends on large winners
and small losses. The disposition effect produces small winners and large losses, which is
exactly Strategy C from Module 06.2 — the 80% win rate that loses money.

It is, quantitatively, the single most damaging bias in retail trading.

**Countermeasures:**
- Pre-set stops and targets as bracket orders at entry
- Never widen a stop, ever, with no exception clause
- Journal R-multiples so the pattern becomes visible in the data
- Use a mechanical trailing rule rather than deciding when to exit a winner

## Confirmation bias

Once you hold a view, you notice evidence supporting it and discount evidence against it.
Once you hold a *position*, this intensifies sharply, because the evidence now has money
attached.

The symptom is that your analysis after entry is consistently more bullish than your
analysis before it.

**Countermeasures:**
- Write your invalidation condition **before** entering, and treat it as binding
- Explicitly state the strongest case against your trade before placing it
- Read analysis opposing your position, on purpose
- Notice when you are searching for reasons rather than evidence

## Sunk cost fallacy

Continuing because of what you have already committed. "I've held this for three weeks, I
can't close it now."

The money already lost is gone regardless of what you do next. The only relevant question
is whether the position is worth holding **from here**, judged as if you had no position
at all.

**Countermeasure:** ask "would I open this position right now, at this price, knowing what
I know?" If no, close it. This question is genuinely useful and takes five seconds.

## Recency bias

Overweighting recent events. Three losses and the strategy feels broken. Three wins and it
feels excellent. Module 06.3 established that neither is informative.

**Countermeasures:**
- Evaluate over 100+ trades, never over the last handful
- Never change a rule within 48 hours of a loss
- Keep the metrics visible so recent experience is contextualised by the full record

## Overconfidence

Traders systematically overestimate their skill and the precision of their estimates. It
increases after a winning streak, precisely when position sizes should not be increasing.

There is also a specific form worth naming: **attributing wins to skill and losses to bad
luck.** This makes learning from outcomes nearly impossible, because only one category of
outcome ever generates a lesson.

**Countermeasures:**
- Fix position sizing by rule so confidence cannot influence it
- Record confidence at entry and check whether it correlates with outcomes (Exercise 08.3f)
- Attribute outcomes explicitly: was this process or luck?

## Gambler's fallacy and the hot hand

Believing that past independent outcomes affect future ones. "Five losses in a row, the
next one must win." "I'm on a streak, I should size up."

If your trades are approximately independent, the previous outcome carries no information
about the next.

**Countermeasure:** fixed fractional sizing with no discretionary adjustment. This removes
the decision entirely.

## Anchoring

Fixing on a reference price. Your entry price, a recent high, a round number. The market
does not know your entry price, and it is not a meaningful level to anyone but you.

The specific damage: holding a loser "until it gets back to break-even". Break-even is a
fact about your account, not about the market.

**Countermeasure:** evaluate positions on current structure only. The question is always
"what would I do here with no position?"

## Outcome bias

Judging a decision by its result rather than by its quality. A reckless trade that won was
still a bad decision, and treating it as validated is how a destructive habit gets
reinforced.

This is the most insidious bias in trading, because randomness means that bad process
regularly produces good outcomes in the short term, and the reinforcement schedule is
therefore actively training the wrong behaviour.

**Countermeasure:** the process-compliance flag in your journal, and grading trades on the
four-cell grid from Module 05.4 rather than on P&L.

## Narrative fallacy

Constructing a causal story from noise. "The market fell because of the jobs data" is
usually a story assembled after the fact. Markets move for many overlapping reasons, most
of which are unobservable, and a satisfying explanation is not evidence of understanding.

The danger is that a coherent narrative produces confidence, and confidence produces size.

**Countermeasure:** notice when you are explaining rather than observing. Your journal
should record what happened and what your rules said, not why you think the market did it.

## Survivorship bias in what you consume

The trading content you see is filtered. Successful traders post; the 70–85% who lost do
not. Screenshots of winning trades are free to produce and self-select. Courses are sold by
people whose income comes from selling courses.

This distorts your sense of the base rate, which is the specific thing Module 00 was trying
to correct.

**Countermeasure:** anchor on the regulator-mandated disclosure, which is the only
unfiltered sample you have access to.

## Seeing them in your own journal

The value of this lesson is diagnostic. Look for these signatures:

| Journal signature | Likely bias |
|---|---|
| Average win well below average loss | Disposition effect |
| Losses beyond −1R | Stops widened or not honoured; loss aversion |
| Rule changes clustered after losses | Recency bias |
| Size increases after wins | Overconfidence, hot hand |
| Positions held "until break-even" | Anchoring, sunk cost |
| Wins attributed to skill, losses to conditions | Self-attribution |
| High confidence uncorrelated with outcome | Overconfidence |

Each of these is visible in data you already have, if you journal properly. That is the
argument for Module 08.3.

## Key points

- Biases are standard cognition, not character flaws, and knowing about them does not
  remove them
- The disposition effect — small winners, large losers — is the most damaging
- Confirmation bias intensifies once money is attached to a view
- Outcome bias means randomness actively trains bad habits
- The countermeasure to every bias here is structural, not motivational
- Your journal makes biases visible as data

## Exercise 09.1

**(a)** Review your last 20 trades. For each loss, record whether you held past your
planned exit. For each win, record whether you closed before your target. Compute the
percentage for each. This measures your own disposition effect.

**(b)** For your last five trades, write the strongest argument *against* the position you
took. Note how difficult this was, and whether you had considered any of it at the time.

**(c)** Find a trade where you told yourself "it will come back". What happened? What was
the eventual cost compared to closing at your planned stop?

**(d)** Check whether your position sizes varied across your last 30 trades. If they did,
what drove the variation? Was it rule-based or confidence-based?

**(e)** Identify which two biases from this lesson affect you most, with evidence from your
journal. Write a structural countermeasure for each — something that changes the situation,
not something you intend to do better.

---

Next: [09.2 — Emotional states and tilt](02-tilt.md)
