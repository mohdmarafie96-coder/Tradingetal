# Quiz Answers

Work the questions before reading these. Explanations are given for every answer, because
the reasoning matters more than the result.

Arithmetic in this file has been checked against `tools/cfd_calc.py`.

---

## Module 00

**1. c) 70–85%.** This is a regulator-mandated disclosure, audited and published by every
CFD broker in the UK, EU and Australia. It is stable across market conditions because the
losses are driven by the product's structure, not by market direction.

**2. c) Spread, commission and overnight financing.** All three are charged regardless of
whether the trade wins. A strategy that is break-even on raw price movement is a losing
strategy after costs.

**3. c) No.** The CFTC and SEC do not permit CFDs for US retail clients. A firm offering
them to a US resident is operating outside US law.

**4. b) Position sizes that feel reasonable on a large balance are ruinous on a small one.**
Learning to size on $100,000 teaches nothing transferable to the $2,000 you would actually
fund.

**5. c) Execution quality and emotional pressure.** Demo fills are often better than live,
and nothing about a demo replicates the feeling of real money moving against you.

**6. b) Capital under pressure to perform produces worse decisions, and the timeframe
presumes an outcome the base rates do not support.** Needing a specific result by a
specific date is the condition under which every risk rule gets abandoned.

---

## Module 01

**1.** You buy at the **ask, 1.09155**. Spread = 1.09155 − 1.09140 = 0.00015 = **1.5 pips**.

**2. b) Controls execution but not price.** A market order consumes resting liquidity at
whatever price is available.

**3. True.** Price moves when the book changes, and orders can be added, cancelled or
withdrawn with no transaction occurring. If every seller below a level cancels, the best ask
jumps instantly on zero volume. This is why prices can move violently in thin conditions
and why "there was no news" has a real answer.

**4. −$12.00.** 1 standard lot is 100,000 units; 1.2 pips = 0.00012; 100,000 × 0.00012 =
$12. You buy at the ask and are marked at the bid, so the position opens at an unrealised
loss of exactly the spread.

**5. c) The London/New York overlap** (roughly 13:00–17:00 UTC). Deepest liquidity, tightest
spreads.

**6. False.** Liquidity is the ability to transact size without moving price; volatility is
how much price moves. Example: an exotic currency during a political crisis has high
volatility and low liquidity — large moves and terrible fills. A quiet EUR/USD afternoon has
low volatility and high liquidity.

**7.** You are filled at the **first available price after the gap**, roughly 12% below the
previous close, not at your stop. A stop cannot be filled at a price that did not exist. Your
loss is far larger than the stop implied.

**8.** Because most index CFDs are priced off the index **future**, not the cash index,
particularly outside the home session. The future carries cost of carry and no dividend
entitlement, so it can sit above or below the cash index.

**9. b) Internalises your position, so your loss is its gain.** Legal, disclosed in the
terms, and standard practice, but a conflict of interest worth knowing about.

**10.** You measured **5 pipettes, which is 0.5 pips**. The fifth decimal place is a tenth of
a pip. The risk is a 10x error in either direction: a stop intended at 20 pips set at 20
pipettes is a 2-pip stop, and a position sized for a 2-pip stop when you meant 20 is ten
times too large.

---

## Module 02

**1.** A CFD is a cash-settled agreement to exchange the difference in an underlying asset's
price between opening and closing. **Your counterparty is your broker**, not an exchange and
not another trader.

**2. None.** You own no shares and have no claim on the company. Your contract is with the
broker. If the broker also fails, you are an unsecured creditor of the broker, mitigated by
client money segregation and any compensation scheme.

**3.** Because a CFD has no expiry and is leveraged: the broker is funding exposure far
larger than the margin you posted, and charges for that funding nightly. A share bought
outright is fully paid, so there is nothing to fund.

**4. 30:1, implying 3.33% margin.**

**5. c) 50%** of required initial margin.

**6.** Negative balance protection means you cannot lose more than the money in your account;
any deficit must be written off by the broker. The event that produced it was the **Swiss
National Bank's removal of the EUR/CHF 1.20 floor on 15 January 2015**, when the pair fell
about 30% in minutes with no transactable liquidity. Retail clients ended owing brokers sums
far exceeding their deposits, and Alpari UK entered insolvency.

**7.** Any three of: negative balance protection, leverage caps, compensation scheme
eligibility, ombudsman access, standardised risk warnings, the firm's appropriateness
assessment. **The correct answer to the offer is no.**

**8.** Short positions are debited the **gross** dividend: 200 × $0.80 = **$160 debited**
from your account. Longs are credited the net, $0.68, so the short pays more than the long
receives.

**9.** A long's worst case is the asset going to zero, bounding the loss at entry price ×
units. A short has no upper bound on price, so the loss is unbounded in principle. In a
regulated retail account, the **50% margin close-out and negative balance protection** limit
the actual loss to your account balance — which is a cap at zero, not a small number.

**10.** Bonuses to retail clients are prohibited under UK, EU and Australian rules, and 400:1
is far above every retail cap, so the firm is **not operating under any of those regimes**.
The usual discovery is at withdrawal: the bonus carries a trading-volume requirement, often
hundreds of times its value, that must be met before any funds can be withdrawn, and costs
alone will consume the account first.

---

## Module 03

**1.** 0.35 × 100,000 = **35,000 units**.

**2.** 0.8 lots = 80,000 units. Notional = 80,000 × 1.2740 = **$101,920**.

**3.** 0.45 lots = 45,000 units. Pip value = 0.0001 × 45,000 = **$4.50**.

**4.** USD is the base, so the pip value arrives in JPY and must be divided by the price.
0.01 × 100,000 = ¥1,000. ¥1,000 / 152.00 = **$6.58**.

**5.** 0.12 lots × 100 oz = 12 ounces. A $1.00 move = **$12.00**.

**6.** 0.6 lots = 60,000 units. (1.08790 − 1.08450) = 0.00340. × 60,000 = **+$204.00**.

**7.** Short, and price **rose**, so this is a loss. (1.26900 − 1.27310) = −0.00410 × 25,000 =
**−$102.50**.

**8.** 1 / (1 − 0.35) − 1 = 1 / 0.65 − 1 = **53.85%**.

**9.** Notional = 4 × 5,150 = $20,600. Annual rate = 5.0% + 2.5% = 7.5%.
20,600 × 0.075 / 365 = **$4.23 per night**.

**10.** Spot FX settles two business days forward. A position held over **Wednesday's**
rollover rolls from Friday settlement to Monday settlement — a three-day roll — so three days
of financing are charged on that one night. Every other weekday rollover is one day, and there
is no rollover at the weekend because the market is closed.

**11.** At 0.5 lots (50,000 units):
Account A: spread 1.2 pips × 50,000 = $6.00; commission $0. **Total $6.00.**
Account B: spread 0.2 pips × 50,000 = $1.00; commission 0.5 × $3.50 × 2 = $3.50.
**Total $4.50.**
**Account B is cheaper by $1.50 per round trip.** Note that the answer would flip at a small
enough size, because the commission scales with size while the per-pip saving also does — run
it at your own typical size rather than assuming.

**12.** Cost ratio = 9.50 / 25 = **38%**. That sits in the "fighting the cost structure" band.
The trade would need an unusually good reward-to-risk to be worth taking, and the underlying
problem is that the position is too small relative to its fixed costs, or the account is too
small for this instrument, or the holding period is too short.

---

## Module 04

**1.** Margin % = 1 / leverage. 20:1 → **5%**.

**2.** 1 / 30 = **3.33%**.

**3.** **Neither — the loss is identical.** Both lose 30 pips × the pip value of a 0.2-lot
position. Leverage determines how much capital is reserved as margin, not how much you lose.
This surprises beginners because the platform presents leverage as a risk setting; it is a
permission setting.

**4.**
- **Equity** = balance + unrealised P&L. The account's real current value.
- **Used margin** = capital reserved against open positions.
- **Free margin** = equity − used margin.
- **Margin level** = (equity / used margin) × 100%.

**5.** Balance is realised cash and only changes when a position closes. With positions open,
it does not move while equity falls. A trader watching balance during a losing position sees
nothing happening.

**6. 50% of required initial margin** — not 50% of the account. The two are very different
numbers.

**7.** 1.2 lots = 120,000 units. Notional = 120,000 × 1.0900 = $130,800.
Used margin = 130,800 / 30 = **$4,360**. Margin level = 6,000 / 4,360 = **137.6%**.

**8.** Solving with margin recalculated as price falls: **323.7 pips**, a loss of
**$3,885**, which is **64.7% of the account**. Note that this is a 2.97% move in EUR/USD —
uncommon in a day, entirely routine over a week.

**9. Effective leverage = total notional of open positions / equity.** Keep it **under 5:1**
while learning; under 2:1 is better.

**10.** A stop triggers at a level and then becomes a **market order**. If price gapped past
your level, no price existed there to fill against, so you are filled at the first available
price after the gap.

**11.** Negative balance protection means you cannot lose more than the money in your account
— the deficit is written off. **It does not cap your loss at your stop.** You can still lose
the entire account in a single gap. The worst case is zero, not small.

**12.** The stop cannot protect you across a gap, and earnings are deliberately released
outside the trading session, so the share can open well below your stop and you are filled at
the open. Two actions: **close or substantially reduce the position before the announcement**,
or **use a guaranteed stop loss**, which is honoured at your price regardless of the gap.

---

## Module 05

**1.** A **market** order guarantees execution but not price. A **limit** order guarantees
price (or better) but not execution.

**2. Buy stop at 1.0920.** Stop orders to buy are placed above the current price.

**3.** A **buy limit** sits **below** the market and expresses mean reversion: you want to
buy cheaper. A **buy stop** sits **above** the market and expresses momentum: you want to buy
only if it breaks higher. Confusing them produces immediate and expensive errors.

**4.** Because a stop-limit only fills at your limit price or better. In a fast market — the
exact scenario the stop exists for — price blows through the limit and no fill occurs, leaving
you holding an unprotected losing position.

**5.** A long's stop triggers off the **bid**. At a 9-pip spread with a mid of 1.08560, the
bid is 1.08560 − 0.00045 = **1.08515**. The stop at 1.08500 is **not triggered** — but only by
1.5 pips. A slightly wider spread or a small move in the mid would trigger it, with no
corresponding change in the mid price. This is the mechanism to understand, not the specific
answer.

**6.** A stop loss becomes a **market order** at exactly the moment everyone else's stops are
triggering into a thin book, so fills are systematically worse than the trigger price. A take
profit is a **limit order**: it fills at your price or better, or not at all. Your losses
therefore run larger than planned while your wins do not run larger than planned.

**7.** 3 / 25 = **12% more risk than planned**. A 25-pip stop is a 28-pip stop in expectation,
so a "1% risk" trade is really 1.12%.

**8.** Only **toward profit**, in line with your written rules. **Never widened**, under any
circumstances.

**9.** The **loss that followed the plan** is the better trade. Over small samples, outcome
carries almost no information about decision quality, while process compliance carries a great
deal. A win that came from violating the plan is the most dangerous outcome available, because
it reinforces the habit that will eventually be very expensive.

**10.** Any five: which defined setup is present; entry price or trigger; stop price and its
structural justification; target and reward-to-risk; position size calculated from risk;
risk in currency and as a percentage; round-trip cost and cost ratio; effective leverage after
the trade; total open and correlated risk; scheduled events before the expected exit.

---

## Module 06

**1.** `size = risk budget / (stop distance × value per point per unit)`. Size is calculated
**last** so that the maximum loss is fixed in advance and the size is the output. Choosing
size first means discovering the loss afterwards, which is how risk rules are abandoned
without ever being consciously broken.

**2.** Risk = $6,000 × 1% = $60. Stop = 1.0930 − 1.0888 = 0.0042 = 42 pips.
Units = 60 / (42 × 0.0001) = 14,286 → **0.14 lots** (rounded down).
Actual risk = 42 × $1.40 = **$58.80 (0.98%)**.

**3.** **R is one unit of risk** — the amount lost if the stop is hit. Journaling in R makes
trades comparable across different position sizes, instruments and account balances, so you
can see whether the strategy works independently of how much money you happened to have.

**4.** 1 / (1 + 2.5) = **28.6%**.

**5.** E = (0.72 × 0.35) − (0.28 × 1) = 0.252 − 0.28 = **−0.028R**. **Not viable**, despite
winning 72% of the time. With costs of 0.06R: **−0.088R**, worse. This is the classic shape of
a losing system that feels excellent.

**6.** Because expectancy depends on the **size** of wins relative to losses as well as their
frequency. A 90% win rate with losses ten times the size of wins loses money:
(0.9 × 1) − (0.1 × 10) = −0.1 per trade.

**7.** Drawdown = (14,000 − 9,800) / 14,000 = **30%**. Recovery = 1 / 0.70 − 1 = **42.9%**.

**8.** Approximately **89%**. You should conclude **nothing**. At a 45% win rate a five-loss
streak is close to certain within any hundred trades, so it carries essentially no evidence
about whether the strategy is working. A trader who abandons a plan after five losses will
abandon every plan they ever adopt.

**9.** 0.95^10 = 0.5987, so **59.9% remains**, a 40.1% drawdown. Recovery = 1 / 0.5987 − 1 =
**67.0%**.

**10.** Because fixed fractional sizing on falling equity automatically reduces risk and slows
the decline, which is what makes ruin asymptotically unreachable. Increasing size raises both
the required recovery and the variance at the same time, converting a recoverable drawdown
into a terminal one. The instinct to size up in a drawdown is exactly inverted.

**11.** All three positions are **short the US dollar**: long EUR/USD, long GBP/USD and short
USD/CHF all profit from dollar weakness. Your true exposure to a dollar rally is **3%, not
1%**, because they are one position in three costumes.

**12.** Diversification depends on positions not moving together. In a crisis the driver stops
being individual fundamentals and becomes a single factor — global risk appetite — so
everything except safe havens falls at once. The diversification you measured in calm markets
is not the diversification you have when you need it. Practical response: group positions by
risk factor, add same-direction risk within each group, cap risk per group, and size for the
crisis case rather than the calm one.

---

## Module 07

**1. Open, high, low and close.**

**2.** Cost: a fixed spread is a much smaller fraction of a wide stop, so a 1.5-pip spread is
1.5% of a 100-pip stop but 15% of a 10-pip stop; and higher timeframes generate far fewer
trades, so total cost is lower. Psychology: fewer decisions means fewer opportunities for
emotional error, and a daily chart can be reviewed in ten minutes alongside a job.

**3.** An uptrend is **successive higher highs and higher lows**. It ends, **by definition**,
when a lower low is made. That is a change in description, not a forecast — it does not mean
price will fall, only that any rule conditioned on "uptrend" no longer applies.

**4.** Any three: at least two touches; prefer levels visible on a higher timeframe; treat
them as zones rather than lines; keep the total number small, around three to five; never
redraw a level to fit what price has already done.

**5. False.** An indicator is a formula applied to the price series. It contains no data that
is not already in the price. What it provides is objectivity, quantification and consistency
— not information and not prediction.

**6.** In a trending market RSI can remain above 70 for weeks while price continues rising, so
selling on that basis means shorting strength. RSI is better used as a **filter within a
direction established elsewhere** — for example, buying pullbacks to RSI 40–50 in an
established uptrend.

**7.** 2 ATR = 120 pips. Risk = $8,000 × 1% = $80.
Units = 80 / (120 × 0.0001) = 6,667 → **0.06 lots**. Actual risk = 120 × $0.60 = $72.

**8.** Because crossovers lag by construction, and in a range the two averages cross back and
forth repeatedly, generating a stream of false signals. Since markets range most of the time,
that is the dominant experience of a crossover system.

**9.** The rise was smaller than expected, was already fully priced in, or the accompanying
guidance implied fewer future rises. **Markets price expectations and react to surprises** —
actual versus forecast, not actual versus previous.

**10.** Earnings are released outside the trading session, so the share can gap far below your
stop; the stop becomes a market order at the open and you are filled wherever the market
reopens. Two actions: close or substantially reduce before the announcement, or use a
guaranteed stop loss.

---

## Module 08

**1.** An edge is **a repeatable reason to expect positive expectancy after costs**. The
phrase **"after costs"** eliminates most candidate strategies, and it eliminates them quietly,
because they look profitable right up until the spread, commission and financing are
subtracted.

**2.** Any three of: patience and selectivity; risk management; discipline; timeframe
flexibility; niche instruments; behavioural persistence. None involves better analysis because
a retail trader has no advantage in speed, information, capital or cost — the remaining
advantages are behavioural.

**3.** Because "trend", "pullback" and "support" are undefined. Two people reading it would
place different trades, so it cannot be applied consistently, cannot be tested, and cannot be
debugged when it stops working. It is a style, not a strategy.

**4.** **Could another person follow your written rules and place exactly the trades you would
place?** If not, the rules are not specified.

**5.** Any five: objectives and constraints; markets and timeframes; setup definitions; entry
trigger; stop loss rules including movement; targets and exits; position sizing; risk limits
with enforcement; event policy; daily and review routines; amendment rules.

**6.** Because almost every destructive plan change is made within a day of a painful loss.
Amendment rules move the decision to a scheduled review, when you are calm and have evidence,
and prevent the plan becoming a record of your emotional history.

**7.** Because reasoning reconstructed after the outcome is contaminated by knowing the
result. It will be more coherent than the original thought, and it will systematically justify
whatever happened. Only reasoning recorded in advance is evidence about your decision-making.

**8.** Possible explanations: slippage on stops; exiting worse than the planned level; stops
being widened or not honoured; gaps taking you past the stop; or stops placed inside the
minimum distance and adjusted. The diagnosis is only available because you recorded
R-multiples, which is the argument for doing so.

**9.** Using information that was not available at the time of the decision. Concrete example:
triggering an entry on a candle's close and then recording the entry at the open of that same
candle, or using an indicator whose value at a point incorporates data from after that point.

**10.** The **backtest was flawed** — most commonly through unrealistic cost assumptions or
look-ahead bias. Find the specific error before doing anything else. Do not fund the strategy,
and do not conclude that live markets are simply harder; the divergence has a cause and it is
usually locatable.

---

## Module 09

**1.** The disposition effect is the tendency to **sell winners early and hold losers**,
driven by loss aversion: closing a winner feels good, closing a loser is the moment of pain,
so it is deferred. It is fatal because expectancy depends on large winners and small losses,
and the disposition effect produces exactly the opposite profile.

**2.** Because markets are noisy, so bad process regularly produces good short-term outcomes.
Judging decisions by results therefore means the reinforcement schedule is actively training
the wrong behaviour: the reckless trade that happened to win gets recorded as validation.

**3.** Loss → second loss → **recovery urge** → a rule bends → a larger loss → escalation → a
large loss. Intervention is realistic at the **recovery urge**, step three, because that is
where attention shifts from the plan to making money back. By step five the position sizes and
the emotional state make voluntary stopping unlikely, and the whole sequence typically
completes within a single session.

**4.** **Prudence is specific and articulable** — you can name the rule or condition causing
the hesitation, such as ATR being double its normal level. **Fear is diffuse** and unconnected
to any rule. Fear of a valid setup usually indicates that the **position size is too large**;
reduce it until the hesitation disappears.

**5.** Because empty time in front of a trading platform reliably generates trades that are
not in the plan, and a strategy producing four signals a month leaves a great deal of empty
time. A large share of rule violations happen in tedium rather than distress. The structural
response is not motivational: **do not be in front of the platform.** Use price alerts and
fixed review times.

**6.** The market has no memory of your loss and offers no compensating opportunity. Framing a
goal in terms of recovering a specific amount changes nothing about what the market will do
and changes only one thing about you: your willingness to take worse trades to reach the
number.

**7.** Any three, for example: platform closed outside defined review times, rather than "I
won't overtrade"; a printed sizing table calculated before the session, rather than "I'll
stick to my size"; bracket orders placed at entry, rather than "I won't move my stop"; a
broker-level daily loss limit with a cooling-off period, rather than "I'll stop after losses".

**8.** Any four: your maximum drawdown limit is hit; plan compliance stays below 80% despite
structural countermeasures; you are trading to change how you feel; you are trading money you
cannot afford to lose; it is affecting your sleep, work, relationships or health; you are
hiding your trading from people close to you.

---

## Module 10

**1.** **Regulation, total cost, spread, platform features.** Regulation comes first because
it determines whether you can get your money back at all, and whether you can lose more than
you deposited. A broker with the tightest spreads and no meaningful regulation is not cheap;
it is a risk of total loss with a small discount attached.

**2.** Entity switching is a brand operating both an onshore regulated entity and a separate
offshore one, and onboarding clients to whichever suits. The website, platform and staff are
identical. **The protections you receive depend entirely on which legal entity is named on
your client agreement**, and it is stated there in plain text.

**3.** Because advertised spreads are best-case averages measured in the most liquid hours,
often quoted as "from" figures. Three other costs: commission, overnight financing, and
currency conversion markup. Inactivity and withdrawal fees also apply.

**4.** **Withdrawal.** Deposit a small amount, trade a little, withdraw it, and record how
long it took and what documentation was demanded. A firm that makes deposits instant and
withdrawals difficult is telling you something important, cheaply.

**5.** Any six: contract size; minimum and step size; typical spread; commission; margin
requirement; swap long and short; triple swap day; trading hours; minimum stop distance;
expiry or rollover behaviour; denomination currency.

**6.** Because it removes the confirmation step that prevents order-entry errors, and because
friction is a deliberate discipline control. Reducing friction on the decision to trade
reliably increases the number of trades that are not in your plan.

**7.** **Overnight financing.** It appears as separate account entries rather than on the trade
ticket, so a journal built from entry and exit prices omits it entirely. Traders who do not
reconcile routinely overstate their performance by the amount of financing they forgot about.

**8.** Bonuses to retail clients are **prohibited** under UK, EU and Australian rules, so the
firm is not operating under any of those regimes. The usual catch is a **trading-volume
requirement** — often hundreds of times the bonus amount — that must be met before any
withdrawal is permitted, which costs alone will consume before it can be reached.

**9.** If the signals genuinely worked, the profit-maximising use of them would be to trade
them with as much capital as could be raised, not to sell them for a monthly subscription.
The economics of selling signals only work when the signals do not.

**10.** This is the standard pattern of **online investment fraud**: a contact you have never
met in person, an unregistered platform, and a small successful early withdrawal specifically
designed to build confidence before a larger deposit. Actions: stop sending money immediately;
document everything; contact your bank or card issuer at once, since recalls are sometimes
possible if you act quickly; report to your national regulator and fraud service; and **ignore
any subsequent recovery offers**, which are the second phase of the same fraud.

---

## Final assessment

### Part A — Contract mechanics

**A1.** 0.45 × 100,000 = **45,000 units**. Notional = 45,000 × 1.2680 = **$57,060**.

**A2.** USD is the base currency, so divide by the price.
0.7 lots = 70,000 units. 0.01 × 70,000 = ¥700. ¥700 / 151.40 = **$4.62**.

**A3.** Neither currency is the account currency, so convert via GBP/USD.
0.3 lots = 30,000 units. 0.0001 × 30,000 = £3.00. £3.00 × 1.2650 = **$3.80**.

**A4.** Short, and price fell, so this is a profit.
Gross = (1.09240 − 1.08810) × 60,000 = 0.00430 × 60,000 = **$258.00**.
Commission = 0.6 × $3.50 × 2 = −$4.20.
Swap = +$1.10 × 6 (0.6 lots = six 0.1-lot units) × 4 nights = **+$26.40**.
**Net = $280.20.** Note that the positive swap materially improved the trade; check your own
instrument rather than assuming financing is always a cost.

**A5.** Notional = 5 × 5,240 = $26,200. Rate = 4.5% + 2.5% = 7.0%.
Per night = 26,200 × 0.07 / 365 = **$5.02**. Over 30 nights = **$150.74**.

**A6.** **7 days.** The position survives five rollovers — Tuesday, Wednesday, Thursday,
Friday and Monday — and the Wednesday rollover counts as three. There is no weekend rollover,
because the market is closed and the weekend is what the Wednesday triple covers.

### Part B — Leverage and margin

**B1.** 0.9 lots = 90,000 units. Notional = 90,000 × 1.0920 = $98,280.
Margin = 98,280 / 30 = **$3,276**.

**B2.** 78,000 / 9,000 = **8.7 : 1**. **Aggressive** — a single ordinary session can do real
damage, and it is well above the 5:1 ceiling recommended while learning.

**B3.** 1.4 lots = 140,000 units. Notional = 140,000 × 1.0900 = $152,600.
Used margin = 152,600 / 30 = **$5,086.67**. Margin level = 7,000 / 5,086.67 = **137.6%**.

**B4.** **323.7 pips**, a loss of **$4,532**, which is **64.7% of the account**. That is a
2.97% move in EUR/USD.

**B5.** Because the threshold is measured against **required initial margin, not against your
account**. Equity starts at 137.6% of margin and must fall to 50% of margin — a decline of
87.6 percentage points of margin. Since margin is a large fraction of this over-leveraged
account, that decline amounts to 64.7% of the balance. The "50% rule" describes the margin
ratio, not your losses.

**B6.** 0.5 lots = 50,000 units, pip value $5.
Intended: 60 pips × $5 = **$300**.
Actual: (1.2700 − 1.2490) = 210 pips × $5 = **$1,050**.
**3.5 times the intended risk.** The stop worked exactly as designed; the design does not
cover discontinuities.

### Part C — Risk management

**C1.** Risk = $8,500 × 0.75% = $63.75. Stop = 48 pips.
Units = 63.75 / (48 × 0.0001) = 13,281 → **0.13 lots**.
Actual risk = 48 × $1.30 = **$62.40 (0.73%)**.

**C2.** Risk = $150. Stop = 73.40 − 70.10 = $3.30.
CFDs = 150 / 3.30 = 45.45 → **45 CFDs**. Actual risk = **$148.50**.
Notional = 45 × 73.40 = $3,303. Margin at 20% = **$660.60**.

**C3.** E = (0.38 × 2.8) − (0.62 × 1) = 1.064 − 0.62 = **+0.444R**.
With costs of 0.09R: **+0.354R**. Viable, and note that it wins fewer than four trades in ten.

**C4.** 1 / (1 + 1.8) = **35.7%**.

**C5.** Drawdown = (22,000 − 15,400) / 22,000 = **30%**. Recovery = **42.9%**.

**C6.** 0.97^9 = 0.7602, so **76.0% remains**, a 24.0% drawdown.
Recovery required = **31.5%**.

**C7.** Grouping:

| Position | USD factor | Risk factor |
|---|---|---|
| Long EUR/USD | short USD | — |
| Short USD/CHF | short USD | — |
| Long AUD/USD | short USD | long risk |
| Long US 500 | — | long risk |

**Short-USD group: 3%.** **Long-risk group: 2%.** AUD/USD appears in both, which is why it is
the most exposed position of the four. In a strong-dollar risk-off move **all four lose
together**, so the realistic bad-day figure is the full **4%**, not the 1% each position was
sized to.

### Part D — Execution and analysis

**D1.** Long on a fall to 1.0855: **buy limit at 1.0855**.
Short on a break below 1.0840: **sell stop at 1.0840**.

**D2.** The bid is 1.08055 − 0.00060 = **1.07995**, which is below the 1.08000 stop, so the
stop **is triggered**. At the normal 1.2-pip spread the bid would have been 1.08049 and the
stop would not have triggered. **The spread widening alone triggered it**, with no move in the
mid price.

**D3.** A stop loss becomes a market order at the moment everyone else's stops are triggering
into a thin book, so fills are systematically worse than the trigger price. A take profit is a
limit order and fills at your price or better, or not at all.

**D4.** 2 ATR = 170 pips. Risk = $6,000 × 1% = $60.
Units = 60 / (170 × 0.0001) = 3,529 → **0.03 lots**. Actual risk = 170 × $0.30 = $51.

**D5.** An uptrend is successive **higher highs and higher lows**. It ends by definition when
a **lower low** is made.

**D6.** The cut was smaller than markets expected, was already fully priced in, or the
accompanying guidance implied fewer future cuts. Markets react to the surprise relative to
expectations, not to the direction of the change itself.

### Part E — Judgement

**E1.** A CFD is a cash-settled agreement with your **broker** to exchange the difference in an
underlying asset's price between opening and closing. **You own nothing** and have no rights in
the underlying.

**E2.** You would lose negative balance protection, leverage caps, and compensation scheme
eligibility (also ombudsman access and standardised risk warnings). **The answer is no.** There
is no version of a beginner's situation in which removing negative balance protection on a
leveraged product is correct.

**E3.** **You have made an error.** A genuine retail edge produces expectancy in the region of
+0.1R to +0.3R, not +1.8R, and an 85% win rate alongside it is not a plausible combination. The
likely causes, in order: look-ahead bias, omitted or understated costs, and over-fitting. Find
the specific error before doing anything else, and do not fund it.

**E4.** **The strategy result is uninterpretable**, because you did not trade the strategy —
roughly a quarter of the trades were something else. The correct next step is to address the
execution problem with the structural countermeasures from Module 09.3, then **restart the
forward test**. Do not adjust the strategy on data produced by not following it.

**E5.** **You stop. The plan says three; you have taken four.** The fact that you are asking is
itself the signal — it indicates the recovery urge at step three of the tilt spiral, which is
precisely the point at which the daily limit exists to intervene. Close the platform.

**E6.** Every element is a red flag. Offshore regulation means no leverage caps, no negative
balance protection, no compensation scheme and no effective recourse. 400:1 leverage means a
0.25% move eliminates your margin. A deposit bonus is prohibited under every major retail
regime and usually carries a volume requirement that locks your balance. An account manager
suggesting trades is a salesperson compensated on your activity, not an adviser acting for
you. Any one of these is sufficient reason to decline.

**E7.** 8% per month compounds to roughly **152% per year**. Sustained for ten years, £10,000
becomes over £60 million; for twenty years, it exceeds the value of most large companies.
Since nobody has achieved this, the claim is not that someone is a skilled trader. It is
either a lie or a description of an arrangement paying early investors with later investors'
money.

**E8.** **That 70% to 85% of retail CFD accounts lose money.** Its significance is that it is
the only unfiltered, audited, regulator-mandated statistic you have access to in an
information environment otherwise dominated by self-selected success. It means that **losing is
the default outcome of this activity**, not the result of insufficient effort, and every
decision in the course — position sizing, cost analysis, testing before funding — follows from
taking that number seriously.
