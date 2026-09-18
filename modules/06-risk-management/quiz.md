# Module 06 Quiz

Closed book. Calculator permitted. Tick one answer per question unless the question says
otherwise.

[Answers](../../reference/quiz-answers.md#module-06) unlock once you have submitted the
quiz.

**1.** Why must position size be calculated last rather than chosen first?

- [ ] a) It does not matter; the order of the calculation is arbitrary
- [ ] b) So the maximum loss is fixed first and the size falls out of it
- [ ] c) Because the spread is only known once the position is open
- [ ] d) Because brokers recalculate the margin requirement after the fill

**2.** $6,000 account, 1% risk, EUR/USD entry 1.0930, stop 1.0888. Calculate the position
size in lots, rounded down, and the actual risk.

- [ ] a) 0.42 lots, risk $176.40
- [ ] b) 1.43 lots, risk $600.60
- [ ] c) 0.14 lots, risk $58.80
- [ ] d) 0.15 lots, risk $63.00

**3.** What is R, and why is journaling in R more useful than journaling in currency?

- [ ] a) R is the reward-to-risk ratio you targeted when entering the trade
- [ ] b) R is your return percentage, which normalises for account growth
- [ ] c) R is the round-trip cost of the trade expressed as a multiple
- [ ] d) R is one unit of risk, so trades compare across sizes and instruments

**4.** Calculate the break-even win rate for a 2.5:1 reward-to-risk ratio.

- [ ] a) 25.0%
- [ ] b) 28.6%
- [ ] c) 40.0%
- [ ] d) 50.0%

**5.** A strategy wins 72% of the time with an average win of 0.35R. Calculate expectancy,
then recompute with costs of 0.06R per trade.

- [ ] a) −0.028R gross, −0.088R net — not viable
- [ ] b) +0.252R gross, +0.192R net — viable
- [ ] c) +0.35R gross, +0.29R net — viable
- [ ] d) +0.072R gross, +0.012R net — marginal but viable

**6.** Why does a 90% win rate tell you nothing about whether a strategy is profitable?

- [ ] a) Because costs always consume more than 10% of gross trading profit
- [ ] b) Because expectancy weighs the size of wins and losses, not just frequency
- [ ] c) Because a 90% win rate is not statistically achievable in any market
- [ ] d) Because brokers systematically overstate the win rates they publish

**7.** Your account falls from a peak of $14,000 to $9,800. Calculate the drawdown and the
gain required to recover.

- [ ] a) 70% drawdown, 143% gain to recover
- [ ] b) 42.9% drawdown, 30% gain to recover
- [ ] c) 30% drawdown, 42.9% gain to recover
- [ ] d) 30% drawdown, 30% gain to recover

**8.** At a 45% win rate, roughly what is the probability of at least five consecutive
losses in any 100 trades, and what should you conclude from such a streak?

- [ ] a) About 12% — the strategy is probably broken
- [ ] b) About 50% — reduce risk by half
- [ ] c) About 30% — pause and revise the plan
- [ ] d) About 89% — conclude nothing; it carries essentially no evidence

**9.** You risk 5% per trade and lose ten in a row. What percentage of your account
remains, and what gain is needed to recover?

- [ ] a) 59.9% remains, 67.0% gain needed
- [ ] b) 50% remains, 100% gain needed
- [ ] c) 90% remains, 11.1% gain needed
- [ ] d) 40.1% remains, 149% gain needed

**10.** Why should position size be reduced, not increased, during a drawdown?

- [ ] a) Because brokers raise the margin requirement during a drawdown
- [ ] b) Because increasing raises the recovery needed and the variance at once
- [ ] c) Because win rates statistically decline while a drawdown is running
- [ ] d) It should be increased, so the account recovers in fewer trades

**11.** You hold long EUR/USD, long GBP/USD and short USD/CHF, each at 1% risk. What is
your true exposure to a dollar rally?

- [ ] a) 2%, because the short USD/CHF hedges one of the longs
- [ ] b) 1%, because each position is independently sized
- [ ] c) 3%, because all three are short the US dollar — one position in three costumes
- [ ] d) 0%, because the positions offset

**12.** Why is correlations rising during a crisis the opposite of what a diversified
portfolio needs, and what is the practical response?

- [ ] a) It affects institutional portfolios only; retail needs no response at all
- [ ] b) Higher correlation means clearer signals; the response is to trade larger
- [ ] c) Correlations actually fall in a crisis; the response is more instruments
- [ ] d) One factor drives everything at once; group by factor and cap each group

---

**Scoring:** Below 10/12, reread. This is the module that determines whether you survive.
