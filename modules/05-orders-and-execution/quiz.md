# Module 05 Quiz

Closed book. Tick one answer per question unless the question says otherwise.

[Answers](../../reference/quiz-answers.md#module-05) unlock once you have submitted the
quiz.

**1.** What does a market order guarantee, and what does a limit order guarantee?

- [ ] a) A market order guarantees price; a limit order guarantees execution
- [ ] b) A market order guarantees execution, not price; a limit the price, not a fill
- [ ] c) Neither guarantees anything; both are best-efforts instructions
- [ ] d) Both guarantee execution; only the limit order guarantees a price

**2.** EUR/USD is at 1.0880. You want to enter long only if price breaks above 1.0920.
What order type and price?

- [ ] a) Sell stop at 1.0920
- [ ] b) Market order once it reaches 1.0920
- [ ] c) Buy stop at 1.0920
- [ ] d) Buy limit at 1.0920

**3.** What is the difference between a buy limit and a buy stop, including where each
sits relative to the current price?

- [ ] a) They are the same order with different names
- [ ] b) Both sit below the market; only the fill logic differs
- [ ] c) Buy limit sits above the market and expresses momentum; buy stop sits below and expresses mean reversion
- [ ] d) Buy limit sits below the market and expresses mean reversion; buy stop sits above and expresses momentum

**4.** Why is a stop-limit order a poor choice for a stop loss?

- [ ] a) It fills only at your limit or better, so a fast market leaves you unprotected
- [ ] b) It triggers too early in volatile conditions and exits good trades
- [ ] c) It costs more in commission than a plain stop loss order does
- [ ] d) Brokers do not support stop-limit orders on FX instruments

**5.** You are long EUR/USD with a stop at 1.0850. The mid price is 1.08560 and the spread
widens from 1.2 pips to 9 pips. Is your stop triggered?

- [ ] a) Yes — stops trigger off the ask for a long position
- [ ] b) No — the bid is 1.08515, still 1.5 pips above the stop
- [ ] c) No — stops trigger off the mid price, which is unchanged
- [ ] d) Yes — the bid is 1.08515, below the stop

**6.** Why do stop losses experience more slippage than take profit orders?

- [ ] a) Take profits are filled internally from the broker's own book
- [ ] b) They do not; slippage is symmetric between stops and take profits
- [ ] c) A stop becomes a market order into a thin book as everyone's stops trigger
- [ ] d) Brokers prioritise the orders that are profitable for the client

**7.** Your measured average stop slippage is 3 pips and your stop distance is 25 pips. By
what percentage does this increase your actual risk per trade?

- [ ] a) 3%
- [ ] b) 12%
- [ ] c) 25%
- [ ] d) 33%

**8.** Under what circumstance is moving a stop loss acceptable, and in which direction?

- [ ] a) Either direction, provided total risk stays under 2%
- [ ] b) Away from price, once before news
- [ ] c) Away from price, when volatility rises
- [ ] d) Toward profit only, in line with your written rules — never widened

**9.** A trade lost money while following your plan exactly. Another made money after you
widened the stop. Which is the better trade?

- [ ] a) The loss that followed the plan; one outcome says little about the decision
- [ ] b) The winner, provided the stop was widened by less than 1R
- [ ] c) The winner, because profit is the only measure that ultimately matters
- [ ] d) Neither; over a single trade the two are exactly equivalent

**10.** Select the questions that must be answered before placing any trade. (select all
that apply)

- [ ] a) Position size calculated from the risk budget
- [ ] b) Round-trip cost and the cost ratio
- [ ] c) How confident you feel about the direction
- [ ] d) Where the stop goes and why, structurally
- [ ] e) Scheduled events before the expected exit
- [ ] f) Which defined setup is present

---

**Scoring:** Below 8/10, reread. Module 06 assumes this material.
