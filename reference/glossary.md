# Glossary

Every term used in the course. Module references point to where the term is developed.

---

**A-book** — A broker model in which client positions are hedged in the underlying market
or with a liquidity provider. Contrast B-book. *(01.3)*

**ADX (Average Directional Index)** — An indicator estimating trend strength. Above about
25 suggests a trend; below 20 suggests a range. *(07.2)*

**Ask (Offer)** — The price at which you can buy. The higher of the two quoted prices.
*(01.2)*

**ATR (Average True Range)** — The average of the true range over N periods, measuring
volatility. The most useful indicator in this course because it feeds directly into stop
placement and position sizing. *(07.3)*

**B-book** — A broker model in which client positions are internalised rather than hedged,
so the client's loss is the broker's gain. Legal, disclosed, and a conflict of interest
worth knowing about. *(01.3)*

**Backtest** — Applying a strategy's rules to historical data to estimate how it would have
performed. *(08.4)*

**Balance** — Realised cash in the account. Changes only when a position closes or funds
move. Misleading while positions are open; watch equity instead. *(04.2)*

**Base currency** — The first currency in a pair. In EUR/USD, the euro. *(01.4)*

**Bid** — The price at which you can sell. The lower of the two quoted prices. *(01.2)*

**Bracket order** — An entry with a stop loss and take profit attached at placement, so the
position is never unprotected. *(05.1)*

**Break-even win rate** — The win rate below which a given reward-to-risk ratio loses money.
Equals `1 / (1 + R:R)`. *(06.2)*

**Breakout** — Price moving beyond an established range boundary or level. *(07.2)*

**CFD (Contract for Difference)** — An agreement with a broker to exchange the difference in
an asset's price between opening and closing, without owning the asset. *(02.1)*

**Close-out (margin close-out)** — Mandatory automatic closing of positions when equity
falls to 50% of required initial margin, under UK/EU/AU retail rules. *(04.3)*

**Commission** — A per-trade charge, typically per lot per side on FX or a percentage of
notional on shares. *(03.4)*

**Contract size** — The units of the underlying per lot or per CFD. 100,000 for a standard
FX lot; 100 ounces for gold. *(03.1)*

**Correlation** — How two instruments move relative to each other, from −1 to +1. Rises
toward 1 in a crisis, exactly when diversification is needed. *(06.4)*

**COT report** — The CFTC's weekly Commitments of Traders positioning data. *(07.4)*

**Counterparty** — The other side of a contract. For a CFD, your broker. *(02.1)*

**Cost ratio** — Round-trip cost divided by risk per trade. Above 25% means something is
wrong with the setup. *(03.4)*

**Disposition effect** — The tendency to sell winners early and hold losers, which inverts
the profile expectancy requires. The most damaging bias in retail trading. *(09.1)*

**Divergence** — Price making a new extreme while an indicator does not. *(07.3)*

**Drawdown** — Decline from a peak in equity to a subsequent trough, as a percentage.
*(06.3)*

**ECN** — An execution model where orders enter a pool of competing liquidity providers.
Raw spreads plus commission. *(05.3)*

**Edge** — A repeatable reason to expect positive expectancy after costs. *(08.1)*

**EMA (Exponential Moving Average)** — A moving average weighting recent periods more
heavily. *(07.3)*

**Equity** — Balance plus unrealised P&L. The account's real current value, and the number
margin is measured against. *(04.2)*

**Ex-dividend date** — The date from which a share trades without entitlement to the
declared dividend. Long CFDs are credited the net amount; shorts are debited the gross.
*(01.4, 02.3)*

**Exotic pair** — A major currency against a smaller or emerging-market currency. Wide
spreads, sharp moves. *(01.4)*

**Expectancy** — Average expected result per trade: `(win rate × avg win) − (loss rate ×
avg loss)`. The only measure that determines whether a strategy makes money. *(06.2)*

**Effective leverage** — Total notional of open positions divided by equity. The single best
one-glance summary of account risk. *(04.1)*

**Fixed fractional sizing** — Risking a fixed percentage of current equity per trade, so
position size shrinks automatically in a drawdown. *(06.1)*

**Forward test** — Running a strategy on demo, in real time, on data that did not exist when
the rules were written. *(08.4)*

**Free margin** — Equity minus used margin. Available for new positions or to absorb losses.
*(04.2)*

**FSCS** — The UK Financial Services Compensation Scheme, covering up to £85,000 per person.
*(02.4)*

**Gap** — A price discontinuity, where price moves from one level to another with no trading
in between. A stop loss cannot be filled at a price that did not exist. *(04.4)*

**GSL (Guaranteed Stop Loss)** — A stop honoured at your exact price regardless of gaps, for
a premium. The only instrument that removes gap risk. *(05.2)*

**GTC (Good Till Cancelled)** — An order that remains active until filled or cancelled. The
common default; review stale orders weekly. *(05.1)*

**Hedging account** — A platform mode permitting simultaneous long and short positions in
one instrument. Usually worse than simply closing. *(02.3)*

**Heikin-Ashi** — Smoothed candles using averaged values. The prices shown are not tradable
prices. *(07.1)*

**Kelly criterion** — The bet size maximising long-run geometric growth: `W − (1−W)/R`. Use
a tenth to a quarter of it. *(06.2)*

**Leverage** — The ratio of notional exposure to margin required. Does not determine your
risk; position size does. *(04.1)*

**Limit order** — An order to execute at a specified price or better. Controls price, not
execution. *(05.1)*

**Liquidity** — The ability to transact size without moving the price much. Distinct from
volatility. *(01.3)*

**Long** — A position profiting if price rises. Opens at the ask, closes at the bid. *(02.3)*

**Lot** — A standard contract quantity. 100,000 units for a standard FX lot; 10,000 mini;
1,000 micro. *(03.1)*

**Major pair** — An FX pair involving USD and another large economy. *(01.4)*

**Margin** — Capital reserved as collateral against an open position. Reserved, not spent.
*(04.2)*

**Margin call** — A warning that margin level has fallen to a threshold, commonly 100%. Not
guaranteed to be sent. *(04.3)*

**Margin level** — `(equity / used margin) × 100%`. The account health metric. *(04.2)*

**Market order** — An order to execute immediately at the best available price. Controls
execution, not price. *(05.1)*

**Negative balance protection** — A regulatory requirement that you cannot lose more than
the money in your account. Introduced after the 2015 Swiss franc de-peg. Lost if you accept
professional client status. *(04.4)*

**Notional value** — `units × price`. Real economic exposure, and the number to think in.
*(03.1)*

**OCO (One Cancels the Other)** — Linked orders where filling one cancels the other. How a
stop and target are held together. *(05.1)*

**Over-fitting** — Tuning parameters until historical performance looks good, producing a
description of the past rather than a strategy. *(08.4)*

**Overnight financing (swap, rollover)** — The nightly charge or credit for holding a
leveraged position. Frequently negative in both directions. *(03.4)*

**Pip** — The standard smallest quoted increment for an FX pair. 0.0001 for most pairs,
0.01 for JPY pairs. *(03.2)*

**Pipette** — One tenth of a pip, the fifth decimal place on most pairs. Misreading it as a
pip produces a 10x sizing error. *(01.4, 03.2)*

**Pip value** — The money value of one pip on a position: `pip size × units`, in the quote
currency. *(03.2)*

**Position sizing** — Calculating position size from a risk budget and a stop distance. The
central risk control. *(06.1)*

**Professional client** — An elective classification offering higher leverage in exchange
for surrendering negative balance protection, leverage caps, compensation scheme
eligibility and ombudsman access. Decline it. *(02.4)*

**Profit factor** — `gross profit / gross loss`. Above 1.3 is decent; above 3 suggests an
error or too small a sample. *(08.3)*

**Quote currency** — The second currency in a pair. In EUR/USD, the dollar. *(01.4)*

**R** — One unit of risk: the amount lost if a trade hits its stop. Journal in R, not
currency. *(06.2)*

**Range** — A market oscillating between support and resistance rather than trending.
Markets range more often than they trend. *(07.2)*

**Requote** — Being offered a new price instead of a fill. Frequent requotes indicate a
broker to leave. *(05.3)*

**Resistance** — A level where price has previously stopped rising. *(07.2)*

**Reward-to-risk (R:R)** — `(target − entry) / (entry − stop)` for a long. *(06.2)*

**Risk of ruin** — The probability of losing a defined proportion of capital. Certain, given
enough trades, with no edge. *(06.3)*

**RSI (Relative Strength Index)** — A bounded oscillator, usually 14 periods. Overbought
does not mean sell. *(07.3)*

**Short** — A position profiting if price falls. Opens at the bid, closes at the ask. Loss
is unbounded in principle. *(02.3)*

**Short squeeze** — Forced buying by shorts driving price sharply higher in a feedback loop.
*(02.3)*

**Slippage** — The difference between the expected and actual fill price. Systematically
against you in fast markets. *(05.3)*

**SMA (Simple Moving Average)** — An equally weighted average of closing prices. *(07.3)*

**Spread** — `ask − bid`. Charged on every position without exception, and the reason every
trade opens at an unrealised loss. *(01.2)*

**Spread betting** — A UK and Ireland product, mechanically near-identical to a CFD, sized
per point and taxed differently. *(02.2)*

**Stop entry** — A stop order used to enter on a breakout. Buy stops sit above the market,
sell stops below. *(05.1)*

**Stop loss** — An order closing a position at a level where your thesis is invalidated.
Guarantees exit, not price. *(05.2)*

**Stop-limit** — A stop that becomes a limit order. Unsuitable for stop losses, because it
fails in exactly the conditions it is meant to protect against. *(05.1)*

**Stop-out** — See close-out. *(04.3)*

**STP (Straight Through Processing)** — Orders passed to liquidity providers rather than
internalised. *(05.3)*

**Support** — A level where price has previously stopped falling. *(07.2)*

**Swing high / swing low** — A candle whose high (low) exceeds those of the candles either
side. The building block of trend definition. *(07.2)*

**Take profit** — A limit order closing a position at a target. *(05.2)*

**Tick / point** — The smallest price increment for a non-FX instrument. *(03.2)*

**Tilt** — A state in which decisions serve emotion rather than expectancy. *(09.2)*

**Trailing stop** — A stop that follows price in your favour and never moves against you.
Needs ATR-based room or it converts winners into scratches. *(05.2)*

**Trend** — Successive higher highs and higher lows (up) or lower highs and lower lows
(down). Ends by definition when the pattern breaks. *(07.2)*

**Triple swap** — Three days of financing charged on one night per week, usually Wednesday
for FX, because spot settles two business days forward. *(03.4)*

**Unrealised P&L** — The floating value of open positions. Not money you have. *(03.3)*

**Used margin** — The total margin reserved against all open positions. *(04.2)*

**Volatility** — How much price moves. Distinct from liquidity, and frequently confused with
it. *(01.3)*
