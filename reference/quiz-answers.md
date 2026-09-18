# Quiz Answers

Work the questions before reading these. Explanations are given for every answer, because
the reasoning matters more than the result.

Arithmetic in this file has been checked against `tools/cfd_calc.py`.

---

## Module 00

**1.** Answer: **c)** 70–85%

This is a regulator-mandated disclosure, audited and published by every CFD broker in the
UK, EU and Australia. It is stable across market conditions because the losses are driven
by the product's structure, not by market direction.

**2.** Answer: **a)** Spread, commission and overnight financing

All three are charged regardless of whether the trade wins. A strategy that is break-even
on raw price movement is a losing strategy after costs.

**3.** Answer: **b)** No; CFDs are not permitted for US retail clients

The CFTC and SEC do not permit CFDs for US retail clients. A firm offering them to a US
resident is operating outside US law.

**4.** Answer: **c)** Position sizes that feel reasonable on a large balance are ruinous
on a small one

Learning to size on $100,000 teaches nothing transferable to the $2,000 you would actually
fund.

**5.** Answer: **d)** Execution quality and emotional pressure

Demo fills are often better than live, and nothing about a demo replicates the feeling of
real money moving against you.

**6.** Answer: **a)** Capital under pressure to perform produces worse decisions, and the
base rates do not support it

Needing a specific result by a specific date is the condition under which every risk rule
gets abandoned.

---

## Module 01

**1.** Answer: **b)** 1.09155, spread 1.5 pips

You buy at the ask, 1.09155. Spread = 1.09155 − 1.09140 = 0.00015 = 1.5 pips. Being filled
at the bid, 1.09140, is the classic error; reading 15 pips misreads the fifth decimal as a
pip; and you never transact at the mid, 1.091475.

**2.** Answer: **c)** Controls execution but not price

A market order consumes resting liquidity at whatever price is available.

**3.** Answer: **d)** Yes — if every seller below a level cancels, the best ask jumps on
zero volume

Price moves when the book changes, and orders can be added, cancelled or withdrawn with no
transaction occurring. This is why prices move violently in thin conditions and why "there
was no news" has a real answer.

**4.** Answer: **a)** −$12.00

1 standard lot is 100,000 units; 1.2 pips = 0.00012; 100,000 × 0.00012 = $12. You buy at
the ask and are marked at the bid, so the position opens at an unrealised loss of exactly
the spread.

**5.** Answer: **b)** London/New York overlap

Roughly 13:00–17:00 UTC. Deepest liquidity, tightest spreads.

**6.** Answer: **c)** No — an exotic pair in a political crisis has high volatility and
low liquidity

Liquidity is the ability to transact size without moving price; volatility is how much
price moves. An exotic currency during a political crisis has high volatility and low
liquidity — large moves and terrible fills. A quiet EUR/USD afternoon has low volatility
and high liquidity.

**7.** Answer: **d)** At the first available price after the gap, roughly 12% below the
previous close

A stop cannot be filled at a price that did not exist. Your loss is far larger than the
stop implied.

**8.** Answer: **a)** They are priced off the index future, which carries cost of carry
and no dividends

Most index CFDs are priced off the index future, not the cash index, particularly outside
the home session. The future carries cost of carry and no dividend entitlement, so it can
sit above or below the cash index.

**9.** Answer: **b)** Internalises your position, so your loss is its gain

Legal, disclosed in the terms, and standard practice, but a conflict of interest worth
knowing about.

**10.** Answer: **c)** 5 pipettes, which is 0.5 pips

The fifth decimal place is a tenth of a pip. The risk is a 10x error in either direction:
a stop intended at 20 pips set at 20 pipettes is a 2-pip stop, and a position sized for a
2-pip stop when you meant 20 is ten times too large.

---

## Module 02

**1.** Answer: **d)** A cash-settled agreement with your broker to exchange the price
difference between open and close

Your counterparty is your broker, not an exchange and not another trader.

**2.** Answer: **a)** None — you own no shares; your contract is with the broker

You own no shares and have no claim on the company. If the broker also fails, you are an
unsecured creditor of the broker, mitigated by client money segregation and any
compensation scheme.

**3.** Answer: **b)** Because the broker funds exposure far larger than your margin, and
charges nightly

A CFD has no expiry and is leveraged. A share bought outright is fully paid, so there is
nothing to fund.

**4.** Answer: **c)** 30:1, implying 3.33% margin

Margin % = 1 / leverage. 20:1 and 5% is the cap for non-major FX, major indices and gold,
not for major pairs.

**5.** Answer: **c)** 50%

50% of required initial margin — not 50% of your account. The two are very different
numbers.

**6.** Answer: **d)** The Swiss National Bank removing the EUR/CHF 1.20 floor in January
2015

Negative balance protection means you cannot lose more than the money in your account; any
deficit must be written off. On 15 January 2015 EUR/CHF fell about 30% in minutes with no
transactable liquidity. Retail clients ended owing brokers sums far exceeding their
deposits, and Alpari UK entered insolvency.

**7.** Answer: **b)** Negative balance protection; **d)** Retail leverage caps; **e)**
Compensation scheme eligibility

You lose negative balance protection, leverage caps, compensation scheme eligibility,
ombudsman access, standardised risk warnings and the appropriateness assessment. The
ability to place stop loss orders and the segregation of client money are unaffected. The
correct answer to the offer is no.

**8.** Answer: **a)** $160 debited

Short positions are debited the gross dividend: 200 × $0.80 = $160 debited. Longs are
credited the net, $0.68, so the short pays more than the long receives.

**9.** Answer: **b)** The 50% margin close-out and negative balance protection, which cap
the loss at your account balance

A long's worst case is the asset going to zero, bounding the loss at entry price × units.
A short has no upper bound on price, so the loss is unbounded in principle. The close-out
and negative balance protection cap the actual loss at zero — which is a cap, not a small
number.

**10.** Answer: **c)** The firm is outside UK/EU/AU regimes; clients discover a
trading-volume requirement blocking withdrawal

Bonuses to retail clients are prohibited under UK, EU and Australian rules, and 400:1 is
far above every retail cap. The usual discovery is at withdrawal: the bonus carries a
trading-volume requirement, often hundreds of times its value, and costs alone will
consume the account first.

---

## Module 03

**1.** Answer: **b)** 35,000

0.35 × 100,000 = 35,000 units.

**2.** Answer: **d)** $101,920

0.8 lots = 80,000 units. Notional = 80,000 × 1.2740 = $101,920. Answering $127,400 uses a
full lot; $62,794 divides by the price instead of multiplying.

**3.** Answer: **b)** $4.50

0.45 lots = 45,000 units. Pip value = 0.0001 × 45,000 = $4.50.

**4.** Answer: **a)** $6.58

USD is the base, so the pip value arrives in JPY and must be divided by the price. 0.01 ×
100,000 = ¥1,000. ¥1,000 / 152.00 = $6.58. Answering $10.00 is the error of assuming every
standard lot is $10 per pip; $1,000.00 leaves the answer in yen.

**5.** Answer: **b)** $12.00

0.12 lots × 100 oz = 12 ounces. A $1.00 move = $12.00.

**6.** Answer: **c)** +$204.00

0.6 lots = 60,000 units. (1.08790 − 1.08450) = 0.00340 × 60,000 = +$204.00.

**7.** Answer: **d)** −$102.50, a loss

Short, and price rose, so this is a loss. (1.26900 − 1.27310) = −0.00410 × 25,000 =
−$102.50.

**8.** Answer: **c)** 53.85%

1 / (1 − 0.35) − 1 = 1 / 0.65 − 1 = 53.85%. Answering 35% is the symmetry error the whole
lesson exists to correct.

**9.** Answer: **c)** $4.23

Notional = 4 × 5,150 = $20,600. Annual rate = 5.0% + 2.5% = 7.5%. 20,600 × 0.075 / 365 =
$4.23 per night. Answering $2.82 uses the benchmark alone; $1.41 uses the markup alone.

**10.** Answer: **a)** Wednesday, because spot settles two days forward, so the roll spans
the weekend

Three days of financing are charged on that one night. Every other weekday rollover is one
day, and there is no rollover at the weekend because the market is closed.

**11.** Answer: **b)** Account B, by $1.50

At 0.5 lots (50,000 units): A = spread 1.2 pips × 50,000 = $6.00, commission $0, total
$6.00. B = spread 0.2 pips × 50,000 = $1.00, commission 0.5 × $3.50 × 2 = $3.50, total
$4.50. B is cheaper by $1.50. The answer would flip at a small enough size, so run it at
your own typical size.

**12.** Answer: **c)** 38% — you are fighting the cost structure

Cost ratio = 9.50 / 25 = 38%, which sits in the "fighting the cost structure" band. The
trade would need an unusually good reward-to-risk to be worth taking, and the underlying
problem is that the position is too small relative to its fixed costs, the account is too
small for this instrument, or the holding period is too short.

---

## Module 04

**1.** Answer: **d)** Margin % = 1 / leverage, so 20:1 is 5%

Margin % = 1 / leverage. 20:1 → 5%.

**2.** Answer: **c)** 3.33%

1 / 30 = 3.33%. Put that against real behaviour: an index can move 3% on an ordinary bad
day.

**3.** Answer: **a)** Neither — the loss is identical

Both lose 30 pips × the pip value of a 0.2-lot position. Leverage determines how much
capital is reserved as margin, not how much you lose. This surprises beginners because the
platform presents leverage as a risk setting; it is a permission setting.

**4.** Answer: **b)** Equity = balance + unrealised P&L; free margin = equity − used
margin; margin level = (equity / used margin) × 100%

Used margin is capital reserved against open positions — reserved, not spent. Note that
the version dividing used margin by equity inverts the margin level ratio.

**5.** Answer: **c)** It is realised cash, so it does not move while equity falls on open
positions

A trader watching balance during a losing position sees nothing happening. Equity is the
truth.

**6.** Answer: **d)** 50%, measured against required initial margin

Not 50% of the account. The two are very different numbers, and confusing them is the most
common error in this module.

**7.** Answer: **a)** $4,360 and 137.6%

1.2 lots = 120,000 units. Notional = 120,000 × 1.0900 = $130,800. Used margin = 130,800 /
30 = $4,360. Margin level = 6,000 / 4,360 = 137.6%. Answering 45.9% inverts the ratio.

**8.** Answer: **b)** About 324 pips, a 64.7% loss

Solving with margin recalculated as price falls gives 323.7 pips, a loss of $3,885, which
is 64.7% of the account. Note that this is a 2.97% move in EUR/USD — uncommon in a day,
entirely routine over a week. Answering about 250 pips and a 50% loss is the 100% margin
call level, not the close-out.

**9.** Answer: **c)** Total notional of open positions / equity; keep it under 5:1

Under 5:1 while learning; under 2:1 is better. It is the single best one-glance summary of
account risk because it accounts for five positions at 2:1 each adding up to 10:1.

**10.** Answer: **d)** It triggers at your level and becomes a market order, so a gap
fills you lower

No price existed at your level to fill against. A stop gives you an exit instruction, not
an exit price.

**11.** Answer: **a)** You cannot lose more than your account balance; it does not cap
loss at your stop

The deficit is written off. The worst case is zero, not small. It also does not apply per
position, offshore, or to professional clients.

**12.** Answer: **a)** Close or substantially reduce the position before the announcement;
**b)** Use a guaranteed stop loss, honoured at your price regardless of the gap

The stop cannot protect you across a gap, and earnings are deliberately released outside
the trading session, so the share can open well below your stop and you are filled at the
open. Tightening the stop does nothing about a gap, and averaging down increases the loss.

---

## Module 05

**1.** Answer: **b)** A market order guarantees execution, not price; a limit the price,
not a fill

Every order type is a variation on that trade-off; choosing one is choosing which of the
two you give up.

**2.** Answer: **c)** Buy stop at 1.0920

Stop orders to buy are placed above the current price. A buy limit at 1.0920 would fill
immediately and worse, since it sits above the market.

**3.** Answer: **d)** Buy limit sits below the market and expresses mean reversion; buy
stop sits above and expresses momentum

Confusing them produces immediate and expensive errors.

**4.** Answer: **a)** It fills only at your limit or better, so a fast market leaves you
unprotected

The scenario it protects against is exactly the scenario in which it fails. Its legitimate
use is entries where a bad fill makes the trade not worth taking.

**5.** Answer: **b)** No — the bid is 1.08515, still 1.5 pips above the stop

A long's stop triggers off the bid. At a 9-pip spread with a mid of 1.08560, the bid is
1.08560 − 0.00045 = 1.08515. The stop at 1.08500 is not triggered — but only by 1.5 pips.
A slightly wider spread would trigger it with no change in the mid at all. That mechanism
is the point, not the specific answer.

**6.** Answer: **c)** A stop becomes a market order into a thin book as everyone's stops
trigger

Your losses therefore run larger than planned while your wins do not run larger than
planned. Build that asymmetry into your expectations.

**7.** Answer: **b)** 12%

3 / 25 = 12% more risk than planned. A 25-pip stop is a 28-pip stop in expectation, so a
"1% risk" trade is really 1.12%.

**8.** Answer: **d)** Toward profit only, in line with your written rules — never widened

Moving a stop further away converts a defined, planned, survivable loss into an undefined
one. Every account destroyed by a single trade involved a stop that was moved.

**9.** Answer: **a)** The loss that followed the plan; one outcome says little about the
decision

A win that came from violating the plan is the most dangerous outcome available, because
it reinforces the habit that will eventually be very expensive.

**10.** Answer: **a)** Position size calculated from the risk budget; **b)** Round-trip
cost and the cost ratio; **d)** Where the stop goes and why, structurally; **e)**
Scheduled events before the expected exit; **f)** Which defined setup is present

How confident you feel is not a pre-trade check — confidence is uncorrelated with
accuracy, and sizing by conviction is explicitly warned against. The others all appear on
the pre-trade checklist.

---

## Module 06

**1.** Answer: **b)** So the maximum loss is fixed first and the size falls out of it

That reversal is how risk rules get abandoned without ever being consciously broken. Size
= risk budget / (stop distance × value per point per unit).

**2.** Answer: **c)** 0.14 lots, risk $58.80

Risk = $60. Stop = 42 pips. Units = 60 / (42 × 0.0001) = 14,286 → 0.14 lots rounded down.
Actual risk = 42 × $1.40 = $58.80 (0.98%). Rounding up to 0.15 lots gives $63.00, which
breaches the limit.

**3.** Answer: **d)** R is one unit of risk, so trades compare across sizes and
instruments

You can then see whether the strategy works independently of how much money you happened
to have at the time.

**4.** Answer: **b)** 28.6%

1 / (1 + 2.5) = 28.6%. Answering 40.0% is 1 / 2.5, the common slip.

**5.** Answer: **a)** −0.028R gross, −0.088R net — not viable

E = (0.72 × 0.35) − (0.28 × 1) = 0.252 − 0.28 = −0.028R. Not viable, despite winning 72%
of the time. With costs: −0.088R, worse. This is the classic shape of a losing system that
feels excellent.

**6.** Answer: **b)** Because expectancy weighs the size of wins and losses, not just
frequency

Expectancy is (0.9 × 1) − (0.1 × 10) = −0.1 per trade: a 90% win rate with losses ten
times the size of wins loses money. Only the combination matters, and the combination is
expectancy.

**7.** Answer: **c)** 30% drawdown, 42.9% gain to recover

Drawdown = (14,000 − 9,800) / 14,000 = 30%. Recovery = 1 / 0.70 − 1 = 42.9%. Answering 30%
for both is the symmetry error.

**8.** Answer: **d)** About 89% — conclude nothing; it carries essentially no evidence

At a 45% win rate a five-loss streak is close to certain within any hundred trades. A
trader who abandons a plan after five losses will abandon every plan they ever adopt.

**9.** Answer: **a)** 59.9% remains, 67.0% gain needed

0.95^10 = 0.5987, so 59.9% remains, a 40.1% drawdown. Recovery = 1 / 0.5987 − 1 = 67.0%.
Answering that 50% remains is the error of multiplying 5% × 10 linearly.

**10.** Answer: **b)** Because increasing raises the recovery needed and the variance at
once

Fixed fractional sizing on falling equity does this automatically, which is what makes
ruin asymptotically unreachable. The instinct to size up in a drawdown is exactly
inverted.

**11.** Answer: **c)** 3%, because all three are short the US dollar — one position in
three costumes

Long EUR/USD, long GBP/USD and short USD/CHF all profit from dollar weakness. Being long
EUR/USD and long USD/CHF would be the same bet twice, not a hedge — the pairs are inverse.

**12.** Answer: **d)** One factor drives everything at once; group by factor and cap each
group

The diversification you measured in calm markets is not the diversification you have when
you need it.

---

## Module 07

**1.** Answer: **a)** Open, high, low, close

The body is the net movement over the period; the wicks are the extremes reached but not
held.

**2.** Answer: **a)** A fixed spread is a much smaller fraction of a wide stop; **b)**
Higher timeframes generate far fewer trades, so total cost is lower; **d)** Fewer
decisions means fewer opportunities for emotional error

A 1.5-pip spread is 1.5% of a 100-pip stop but 15% of a 10-pip stop. The misconception is
that lower timeframes are technically more advanced: they are not, they are harder, more
expensive and more punishing of small errors.

**3.** Answer: **b)** Higher highs and higher lows; it ends when a lower low is made

That is a change in description, not a forecast — it does not mean price will fall, only
that any rule conditioned on "uptrend" no longer applies.

**4.** Answer: **b)** Treat levels as zones, not lines; **c)** Use at least two touches;
**e)** Prefer levels visible on a higher timeframe

Fewer is better — three to five on a chart. Drawing as many as possible makes levels
unfalsifiable and useless; redrawing a level after price passes it is curve-fitting your
own chart in real time.

**5.** Answer: **c)** False — an indicator is a formula applied to the price series itself

What indicators provide is objectivity, quantification and consistency — not information
and not prediction.

**6.** Answer: **d)** In a trend RSI can hold above 70 for weeks while price keeps rising

RSI is better used as a filter within a direction established elsewhere — for example,
buying pullbacks to RSI 40–50 in an established uptrend.

**7.** Answer: **a)** 0.06 lots

2 ATR = 120 pips. Risk = $80. Units = 80 / (120 × 0.0001) = 6,667 → 0.06 lots. Actual risk
= 120 × $0.60 = $72. Answering 0.13 lots uses 1 ATR instead of 2.

**8.** Answer: **b)** Because the two averages cross back and forth, generating false
signals

Since markets range most of the time, that is the dominant experience of a crossover
system.

**9.** Answer: **c)** The rise was smaller than expected, or already fully priced in

Markets price expectations and react to surprises — actual versus forecast, not actual
versus previous.

**10.** Answer: **d)** The release lands outside the session, so price can gap past your
stop

Two actions address it: close or substantially reduce before the announcement, or use a
guaranteed stop loss.

---

## Module 08

**1.** Answer: **a)** A repeatable reason to expect positive expectancy after costs;
"after costs" eliminates most candidates

"After costs" eliminates them quietly, because they look profitable right up until the
spread, commission and financing are subtracted.

**2.** Answer: **a)** Patience and selectivity; **b)** Risk management; **d)** Timeframe
flexibility — no benchmark, no clients, no obligation to be invested

None of the real sources involves better analysis, because a retail trader has no
advantage in speed, information, capital or cost. Indicator settings are available to
everyone with the same defaults. The remaining advantages are behavioural.

**3.** Answer: **b)** Because its terms are undefined, so two people place different
trades

It is a style, not a strategy. A style cannot be tested.

**4.** Answer: **c)** Whether another person following your rules places the same trades

If not, the rules are not specified.

**5.** Answer: **a)** Risk limits with physical enforcement mechanisms; **b)** Amendment
rules governing when the plan may be changed; **c)** Stop loss rules, including the rule
for moving them; **e)** Position sizing rule; **f)** Setup definitions precise enough to
replicate

A monthly profit target in currency is not a plan component — it is the pressure that
causes rules to be abandoned. Objectives should be process-based, not outcome-based.

**6.** Answer: **d)** Because destructive changes are made within a day of a painful loss

They prevent the plan becoming a record of your emotional history rather than a strategy.

**7.** Answer: **a)** Because reasoning written afterwards is contaminated by the result

Only reasoning recorded in advance is evidence about your decision-making.

**8.** Answer: **a)** Gaps taking you past the stop; **b)** Exiting worse than the planned
level; **c)** Stops being widened or not honoured; **d)** Slippage on stops

A low win rate does not affect the size of the average loss — those are independent
statistics. The diagnosis is only available because you recorded R-multiples, which is the
argument for doing so.

**9.** Answer: **b)** Entering on a candle's close but recording the fill at its open

Look-ahead bias is using information that was not available at the time of the decision.
Testing only the instruments that still exist is survivorship bias, tuning a parameter
until performance improves is over-fitting, and omitting commission is ignoring costs —
all real errors, but different ones.

**10.** Answer: **c)** The backtest was flawed; find the specific error and do not fund it

The divergence has a cause and it is usually locatable. Re-optimising the parameters is
over-fitting with extra steps.

---

## Module 09

**1.** Answer: **d)** Selling winners early and holding losers; it inverts your expectancy

Driven by loss aversion: closing a winner feels good, closing a loser is the moment of
pain, so it is deferred. It is quantitatively the most damaging bias in retail trading.

**2.** Answer: **a)** Because noise lets bad process produce good short-term outcomes

The reckless trade that happened to win gets recorded as validation. The countermeasure is
the process-compliance flag and grading on the four-cell grid rather than on P&L.

**3.** Answer: **b)** At the recovery urge, before size and emotion make stopping unlikely

Steps 1 and 2 are normal and unavoidable. The whole spiral typically completes within a
single session — most accounts that are destroyed are destroyed in one sitting, not by
gradual attrition.

**4.** Answer: **c)** Prudence names a rule; diffuse fear usually means the size is too
large

The test: can you name the specific rule or condition causing hesitation? If yes, it is
analysis. If no, it is fear — reduce your size until the hesitation disappears.

**5.** Answer: **d)** Empty screen time generates unplanned trades; do not sit at the
platform

A strategy producing four signals a month leaves a great deal of empty time. A large share
of rule violations happen in tedium rather than distress, so the response is structural
rather than motivational: use price alerts and fixed review times, and do not sit in front
of the platform between them.

**6.** Answer: **a)** The market has no memory of your loss and owes you no recovery

It is dangerous because it is a coherent-sounding goal that has nothing to do with the
market. Each trade is independent; the previous loss is a sunk cost.

**7.** Answer: **a)** Bracket orders placed at entry, instead of "I won't move my stop";
**b)** A broker-level daily loss limit with a cooling-off period, instead of "I'll stop
after losses"; **c)** A printed sizing table calculated before the session, instead of
"I'll stick to my size"; **e)** Platform closed outside defined review times, instead of
"I won't overtrade"

Reminding yourself each morning to be disciplined is a willpower control wearing the
costume of a system. A structure changes the situation; an intention does not.

**8.** Answer: **a)** You are trading to change how you feel; **b)** You hit your maximum
drawdown limit; **c)** Plan compliance stays below 80% despite structural countermeasures;
**d)** It is affecting your sleep, work, relationships or health

Three losing trades in a row is ordinary variance, not a stop condition — at a 45% win
rate it is close to certain within any hundred trades. Also stop if you are trading money
you cannot afford to lose, or hiding your trading from people close to you.

---

## Module 10

**1.** Answer: **b)** Regulation, total cost, spread, platform features

Regulation comes first because it determines whether you can get your money back at all,
and whether you can lose more than you deposited. A broker with the tightest spreads and
no meaningful regulation is not cheap; it is a risk of total loss with a small discount
attached.

**2.** Answer: **c)** A brand running an onshore and an offshore entity, onboarding to
either

The website, platform and staff are identical. The entity name is stated in plain text in
your client agreement — read it before depositing.

**3.** Answer: **a)** Inactivity and withdrawal fees; **b)** Overnight financing; **c)**
Commission; **e)** Currency conversion markup

Advertised spreads are best-case averages measured in the most liquid hours, often quoted
as "from" figures. There is no separately disclosed profit margin — the broker's margin is
inside the spread and commission.

**4.** Answer: **d)** Withdrawal — deposit a small amount, trade a little, then withdraw
it

A firm that makes deposits instant and withdrawals difficult is telling you something
important, cheaply. It is also the most common complaint pattern for problematic firms.

**5.** Answer: **a)** Minimum and step size; **b)** Margin requirement; **c)** Contract
size; **d)** Trading hours and minimum stop distance; **f)** Swap long and short, and the
triple swap day

Also expiry or rollover behaviour and denomination currency. There is no such thing as an
instrument's historical win rate — that is a property of a strategy, not an instrument.

**6.** Answer: **a)** It removes the confirmation step that catches order-entry errors

Reducing friction on the decision to trade reliably increases the number of trades that
are not in your plan.

**7.** Answer: **b)** Overnight financing — it posts as separate account entries

A journal built from entry and exit prices omits it entirely. Traders who do not reconcile
routinely overstate their performance by the amount of financing they forgot about.

**8.** Answer: **c)** Bonuses are banned in the UK, EU and Australia, so the firm is
outside them

The volume requirement is often hundreds of times the bonus amount, and costs alone will
consume the account before it can be reached.

**9.** Answer: **d)** If they worked, trading them would pay far more than selling them

The economics of selling signals only work when the signals do not. Published results are
typically selectively reported, include only closed winners, or come from an account that
does not exist.

**10.** Answer: **a)** This is the standard pattern of investment fraud; stop sending
money

A contact you have never met in person, an unregistered platform, and a small successful
early withdrawal are the signature. This category takes more money from individuals than
all the others combined. Stop sending money, document everything, contact your bank at
once and report it: chargebacks are sometimes possible if you act quickly, and any later
recovery offer is the second phase of the same fraud.

---

## Final assessment

### Part A — Contract mechanics (Module 03)

**A1.** Answer: **a)** 45,000 units, $57,060

0.45 × 100,000 = 45,000 units. Notional = 45,000 × 1.2680 = $57,060.

**A2.** Answer: **b)** $4.62

USD is the base currency, so divide by the price. 0.7 lots = 70,000 units. 0.01 × 70,000 =
¥700. ¥700 / 151.40 = $4.62.

**A3.** Answer: **c)** $3.80

Neither currency is the account currency, so convert via GBP/USD. 0.3 lots = 30,000 units.
0.0001 × 30,000 = £3.00. £3.00 × 1.2650 = $3.80. Dividing by GBP/USD instead of
multiplying gives $2.37.

**A4.** Answer: **d)** $280.20

Short, and price fell, so this is a profit. Gross = (1.09240 − 1.08810) × 60,000 =
$258.00. Commission = 0.6 × $3.50 × 2 = −$4.20. Swap = +$1.10 × 6 × 4 = +$26.40. Net =
$280.20. The positive swap materially improved the trade — check your own instrument
rather than assuming financing is always a cost.

**A5.** Answer: **a)** $5.02 per night, $150.74 over 30 nights

Notional = 5 × 5,240 = $26,200. Rate = 4.5% + 2.5% = 7.0%. Per night = 26,200 × 0.07 / 365
= $5.02. Over 30 nights = $150.74. Using the benchmark alone gives $3.23 a night and the
markup alone $1.79; $50.23 is a factor-of-ten slip.

**A6.** Answer: **b)** 7 days

The position survives five rollovers — Tuesday, Wednesday, Thursday, Friday and Monday —
and the Wednesday rollover counts as three. 4 + 3 = 7. There is no weekend rollover,
because the market is closed and the weekend is what the Wednesday triple covers.

### Part B — Leverage and margin (Module 04)

**B1.** Answer: **c)** $3,276

0.9 lots = 90,000 units. Notional = 90,000 × 1.0920 = $98,280. Margin = 98,280 / 30 =
$3,276.

**B2.** Answer: **d)** 8.7 : 1 — aggressive

78,000 / 9,000 = 8.7 : 1, which is aggressive — a single ordinary session can do real
damage, and it is well above the 5:1 ceiling recommended while learning.

**B3.** Answer: **a)** $5,086.67 and 137.6%

1.4 lots = 140,000 units. Notional = 140,000 × 1.0900 = $152,600. Used margin = 152,600 /
30 = $5,086.67. Margin level = 7,000 / 5,086.67 = 137.6%.

**B4.** Answer: **b)** 323.7 pips, 64.7% of the account

323.7 pips, a loss of $4,532, which is 64.7% of the account. That is a 2.97% move in
EUR/USD.

**B5.** Answer: **c)** Because the threshold measures equity against margin, not the
account

The "50% rule" describes the margin ratio, not your losses. Equity starts at 137.6% of
required margin and must fall to 50% of it, and on this over-leveraged account margin is a
large fraction of the balance — so that decline amounts to 64.7% of the balance.

**B6.** Answer: **d)** $300 intended, $1,050 actual, 3.5×

0.5 lots = 50,000 units, pip value $5. Intended: 60 pips × $5 = $300. Actual: 210 pips ×
$5 = $1,050 — 3.5 times the intended risk. The stop worked exactly as designed; the design
does not cover discontinuities.

### Part C — Risk management (Module 06)

**C1.** Answer: **a)** 0.13 lots, $62.40

Risk = $63.75. Stop = 48 pips. Units = 63.75 / (48 × 0.0001) = 13,281 → 0.13 lots. Actual
risk = 48 × $1.30 = $62.40 (0.73%). Rounding up to 0.14 lots gives $67.20 and breaches the
limit.

**C2.** Answer: **b)** 45 CFDs, $660.60 margin

Risk = $150. Stop = $3.30. CFDs = 150 / 3.30 = 45.45 → 45. Actual risk = $148.50. Notional
= 45 × 73.40 = $3,303. Margin at 20% = $660.60. Quoting $3,303 as the margin states the
notional as if it were the margin.

**C3.** Answer: **c)** +0.444R gross, +0.354R net

E = (0.38 × 2.8) − (0.62 × 1) = 1.064 − 0.62 = +0.444R. With costs: +0.354R. Viable, and
note it wins fewer than four trades in ten. Answering +1.064R omits the loss term
entirely.

**C4.** Answer: **d)** 35.7%

1 / (1 + 1.8) = 35.7%. Answering 55.6% is 1 / 1.8, the common slip.

**C5.** Answer: **a)** 30% drawdown, 42.9% gain

Drawdown = (22,000 − 15,400) / 22,000 = 30%. Recovery = 1 / 0.70 − 1 = 42.9%.

**C6.** Answer: **b)** 76.0% remains, 31.5% gain

0.97^9 = 0.7602, so 76.0% remains, a 24.0% drawdown. Recovery = 31.5%. Answering 73.0%
subtracts 3% × 9 = 27% linearly.

**C7.** Answer: **c)** 4% — all four lose together, with AUD/USD in both risk groups

Long EUR/USD, short USD/CHF and long AUD/USD are all short USD (3%). Long AUD/USD and long
US 500 are both long risk (2%). AUD/USD appears in both, which makes it the most exposed
of the four. In a strong-dollar risk-off move all four lose together, so the realistic
figure is the full 4%, not the 1% each position was sized to.

### Part D — Execution and analysis (Modules 05, 07)

**D1.** Answer: **d)** Buy limit at 1.0855; sell stop at 1.0840

Buying on a fall to a level is a limit (below the market, mean reversion). Selling on a
break below a level is a stop (below the market, momentum).

**D2.** Answer: **a)** Yes — the bid is 1.07995, below the stop; the spread widening alone
triggered it

The bid is 1.08055 − 0.00060 = 1.07995, below the 1.08000 stop. At the normal 1.2-pip
spread the bid would have been 1.08049 and the stop would not have triggered. The spread
widening alone triggered it, with no move in the mid price.

**D3.** Answer: **b)** A stop becomes a market order into a thin book as stops trigger

Your losses therefore run larger than planned while your wins do not.

**D4.** Answer: **c)** 0.03 lots

2 ATR = 170 pips. Risk = $60. Units = 60 / (170 × 0.0001) = 3,529 → 0.03 lots. Actual risk
= 170 × $0.30 = $51. Answering 0.07 lots uses 1 ATR instead of 2.

**D5.** Answer: **d)** Successive higher highs and higher lows; ends when a lower low is
made

It is a definition, not a forecast. The moving-average version and the higher-highs-only
version are useful filters, but neither is the structural definition.

**D6.** Answer: **a)** The cut was smaller than expected, or already fully priced in

Markets react to the surprise relative to expectations, not to the direction of the change
itself.

### Part E — Judgement (Modules 02, 08, 09, 10)

**E1.** Answer: **b)** A cash-settled agreement with your broker; you own nothing
underlying

The counterparty is the broker, and you own nothing.

**E2.** Answer: **c)** No — you would lose negative balance protection and leverage caps

You also lose ombudsman access and standardised risk warnings. There is no version of a
beginner's situation in which removing negative balance protection on a leveraged product
is correct.

**E3.** Answer: **d)** You have made an error; find it before funding anything at all

A genuine retail edge produces expectancy in the region of +0.1R to +0.3R, not +1.8R, and
an 85% win rate alongside it is not a plausible combination.

**E4.** Answer: **a)** The result is uninterpretable; fix the execution, then retest

You did not trade the strategy, so the data cannot be attributed to it. Do not adjust the
strategy on data produced by not following it.

**E5.** Answer: **b)** Stop. The plan says three and asking is itself the warning sign

The daily limit exists precisely to intervene at that point. A limit you can override is
not a limit.

**E6.** Answer: **a)** A deposit bonus — prohibited under every major retail regime and
usually carrying a volume requirement that locks your balance; **b)** 400:1 leverage — a
0.25% move eliminates your margin; **c)** Offshore-only regulation — no leverage caps, no
negative balance protection, no compensation scheme, no effective recourse; **d)** An
account manager suggesting trades — a salesperson compensated on your activity, not an
adviser acting for you

Every element is a red flag, and any one of them is sufficient reason to decline.

**E7.** Answer: **c)** Because it compounds to about 152% a year, which nobody sustains

8% a month compounds to roughly 152% a year; sustained for ten years, £10,000 becomes over
£60 million, and over twenty it exceeds the value of most large companies. Nobody has
achieved this, so the claim is either a lie or a scheme paying early investors with later
investors' money. The claim is not that someone is a skilled trader.

**E8.** Answer: **d)** That 70–85% of retail CFD accounts lose money: losing is the
default

It is the only unfiltered sample you have access to in an information environment
otherwise dominated by self-selected success. Every decision in the course — position
sizing, cost analysis, testing before funding — follows from taking that number seriously.
