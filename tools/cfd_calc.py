#!/usr/bin/env python3
"""
cfd_calc — arithmetic helpers for the CFD trading fundamentals course.

Dependency-free. Python 3.8+.

This tool exists to CHECK arithmetic you have already done by hand. Reaching for
it before attempting a calculation defeats its purpose: in live trading you need
to recognise a wrong position size immediately, and that only comes from having
done the sums yourself many times.

Run `python3 cfd_calc.py --help` for the command list, or
`python3 cfd_calc.py <command> --help` for a single command.

All figures are illustrative. Verify every input against your own broker's
contract specification. Nothing here is financial advice.
"""

from __future__ import annotations

import argparse
import math
import sys

STANDARD_LOT = 100_000.0


# ---------------------------------------------------------------------------
# Core calculations
# ---------------------------------------------------------------------------

def notional(units: float, price: float) -> float:
    """Notional (economic) exposure of a position."""
    return units * price


def pip_value(units: float, pip_size: float, price: float = None,
              base_is_account: bool = False, quote_rate: float = None) -> float:
    """
    Value of one pip, expressed in the account currency.

    Three cases (Module 03.2):
      1. Quote currency IS the account currency  -> pip_size * units
      2. Base currency IS the account currency   -> (pip_size * units) / price
         (pass base_is_account=True and the current price)
      3. Neither                                 -> (pip_size * units) * quote_rate
         (quote_rate = one unit of the quote currency in account currency)
    """
    raw = pip_size * units
    if base_is_account:
        if not price:
            raise ValueError("--price is required with --base-is-account")
        return raw / price
    if quote_rate is not None:
        return raw * quote_rate
    return raw


def margin_required(units: float, price: float, leverage: float = None,
                    margin_pct: float = None) -> float:
    """Margin reserved against a position. Give leverage OR margin_pct."""
    if leverage is None and margin_pct is None:
        raise ValueError("give either --leverage or --margin-pct")
    if leverage is not None and margin_pct is not None:
        raise ValueError("give --leverage or --margin-pct, not both")
    notion = notional(units, price)
    if leverage is not None:
        if leverage <= 0:
            raise ValueError("leverage must be positive")
        return notion / leverage
    if not 0 < margin_pct <= 100:
        raise ValueError("margin-pct must be between 0 and 100")
    return notion * (margin_pct / 100.0)


def margin_level(equity: float, used_margin: float) -> float:
    """Margin level as a percentage. Undefined with no open positions."""
    if used_margin <= 0:
        raise ValueError("used margin must be positive")
    return (equity / used_margin) * 100.0


def position_size(balance: float, risk_pct: float, entry: float, stop: float,
                  pip_size: float = 0.0001, pip_value_per_lot: float = 10.0,
                  step: float = 0.01, lot_size: float = STANDARD_LOT) -> dict:
    """
    Position size from a risk budget and a stop distance (Module 06.1).

    Always rounds DOWN to the platform step: rounding up breaches the risk limit,
    and a risk limit only works if it is never breached.
    """
    if entry == stop:
        raise ValueError("entry and stop must differ")
    if pip_size <= 0 or pip_value_per_lot <= 0 or step <= 0:
        raise ValueError("pip size, pip value and step must be positive")

    risk_amount = balance * (risk_pct / 100.0)
    stop_distance_price = abs(entry - stop)
    stop_pips = stop_distance_price / pip_size

    exact_lots = risk_amount / (stop_pips * pip_value_per_lot)
    lots = math.floor(exact_lots / step) * step
    # Guard against binary float dust producing e.g. 0.13999999999999999
    lots = round(lots, 10)

    actual_risk = lots * stop_pips * pip_value_per_lot

    return {
        "risk_amount": risk_amount,
        "stop_distance_price": stop_distance_price,
        "stop_pips": stop_pips,
        "exact_lots": exact_lots,
        "lots": lots,
        "units": lots * lot_size,
        "pip_value": lots * pip_value_per_lot,
        "actual_risk": actual_risk,
        "actual_risk_pct": (actual_risk / balance * 100.0) if balance else 0.0,
        "below_minimum": lots < step,
    }


def expectancy(win_rate: float, avg_win: float, avg_loss: float,
               cost: float = 0.0) -> dict:
    """
    Expectancy per trade (Module 06.2).

    avg_win and avg_loss are POSITIVE magnitudes, in the same unit (R or currency).
    cost is subtracted per trade, in that same unit.
    """
    if not 0.0 <= win_rate <= 1.0:
        raise ValueError("win rate must be between 0 and 1")
    if avg_win < 0 or avg_loss < 0:
        raise ValueError("avg win and avg loss are magnitudes; use positive values")

    gross = (win_rate * avg_win) - ((1.0 - win_rate) * avg_loss)
    net = gross - cost
    rr = (avg_win / avg_loss) if avg_loss else float("inf")
    breakeven_wr = (1.0 / (1.0 + rr)) if avg_loss else 0.0

    return {
        "gross_expectancy": gross,
        "net_expectancy": net,
        "reward_to_risk": rr,
        "breakeven_win_rate": breakeven_wr,
        "viable": net > 0,
    }


def breakeven_win_rate(reward_to_risk: float) -> float:
    """Win rate below which a given reward-to-risk ratio loses money."""
    if reward_to_risk <= 0:
        raise ValueError("reward-to-risk must be positive")
    return 1.0 / (1.0 + reward_to_risk)


def recovery_gain(drawdown_pct: float) -> float:
    """Percentage gain needed to recover a given percentage drawdown."""
    if not 0 <= drawdown_pct < 100:
        raise ValueError("drawdown must be between 0 and 100 (exclusive)")
    d = drawdown_pct / 100.0
    return (1.0 / (1.0 - d) - 1.0) * 100.0


def streak_loss(risk_pct: float, losses: int) -> dict:
    """Account remaining after N consecutive losses at a fixed fractional risk."""
    if not 0 < risk_pct < 100:
        raise ValueError("risk-pct must be between 0 and 100")
    if losses < 0:
        raise ValueError("losses cannot be negative")
    remaining = (1.0 - risk_pct / 100.0) ** losses
    dd = (1.0 - remaining) * 100.0
    return {
        "remaining_pct": remaining * 100.0,
        "drawdown_pct": dd,
        "recovery_gain_pct": recovery_gain(dd) if dd < 100 else float("inf"),
    }


def streak_probability(win_rate: float, streak: int, trades: int) -> float:
    """
    Approximate probability of at least one losing streak of the given length
    within a sequence of `trades` trades (Module 06.3).

    Uses the standard approximation 1 - (1 - p^k(1-p))^(n-k+1), which is close
    enough for the point being made and errs slightly low.
    """
    if not 0.0 < win_rate < 1.0:
        raise ValueError("win rate must be strictly between 0 and 1")
    if streak < 1 or trades < streak:
        raise ValueError("need streak >= 1 and trades >= streak")
    p = 1.0 - win_rate
    per_start = (p ** streak) * (1.0 - p)
    return 1.0 - (1.0 - per_start) ** (trades - streak + 1)


def financing(units: float, price: float, annual_rate_pct: float,
              markup_pct: float = 0.0, direction: str = "long",
              day_count: int = 365, nights: int = 1) -> dict:
    """
    Overnight financing on an index/share/commodity CFD (Module 03.4).

    Long pays benchmark + markup. Short receives benchmark - markup, which is
    negative (i.e. the short also pays) whenever markup exceeds the benchmark.
    """
    if direction not in ("long", "short"):
        raise ValueError("direction must be 'long' or 'short'")
    if day_count <= 0 or nights < 0:
        raise ValueError("day count must be positive and nights non-negative")

    notion = notional(units, price)
    if direction == "long":
        rate = -(annual_rate_pct + markup_pct)
    else:
        rate = annual_rate_pct - markup_pct

    per_night = notion * (rate / 100.0) / day_count
    return {
        "notional": notion,
        "effective_annual_rate_pct": rate,
        "per_night": per_night,
        "total": per_night * nights,
        "nights": nights,
    }


def cost_ratio(total_cost: float, risk_amount: float) -> dict:
    """Round-trip cost as a proportion of risk per trade (Module 03.4)."""
    if risk_amount <= 0:
        raise ValueError("risk amount must be positive")
    ratio = total_cost / risk_amount * 100.0
    if ratio < 10:
        verdict = "sustainable"
    elif ratio < 25:
        verdict = "meaningful drag; needs a genuine edge"
    elif ratio < 50:
        verdict = "fighting the cost structure"
    else:
        verdict = "position size, holding period or account size is wrong"
    return {"cost_ratio_pct": ratio, "verdict": verdict}


def kelly(win_rate: float, reward_to_risk: float) -> dict:
    """
    Kelly fraction, plus the fractional-Kelly values actually used in practice.

    Full Kelly is correct only if your estimates are exact, which they are not.
    Overestimating your edge under full Kelly produces ruin.
    """
    if not 0.0 <= win_rate <= 1.0:
        raise ValueError("win rate must be between 0 and 1")
    if reward_to_risk <= 0:
        raise ValueError("reward-to-risk must be positive")
    f = win_rate - (1.0 - win_rate) / reward_to_risk
    return {
        "full_kelly_pct": f * 100.0,
        "half_kelly_pct": f * 50.0,
        "quarter_kelly_pct": f * 25.0,
        "tenth_kelly_pct": f * 10.0,
        "has_edge": f > 0,
    }


def stop_out_move(balance: float, units: float, price: float, leverage: float,
                  pip_size: float, pip_value: float,
                  close_out_pct: float = 50.0) -> dict:
    """
    Adverse pip move that triggers the mandatory margin close-out (Module 04.3),
    solved allowing for margin being recalculated as price moves.

    Long position. Let P = pips lost:
        equity      = balance - P * pip_value
        used margin = units * (price - P * pip_size) / leverage
    Solve equity = (close_out_pct/100) * used margin.
    """
    if leverage <= 0 or pip_size <= 0 or pip_value <= 0:
        raise ValueError("leverage, pip size and pip value must be positive")
    k = close_out_pct / 100.0

    # balance - P*pv = k * (units*price - P*units*pip_size) / leverage
    # balance - P*pv = (k*units*price)/lev - P*(k*units*pip_size)/lev
    # P * ((k*units*pip_size)/lev - pv) = (k*units*price)/lev - balance
    a = (k * units * pip_size) / leverage - pip_value
    b = (k * units * price) / leverage - balance
    if a == 0:
        raise ValueError("degenerate inputs: no solution")
    pips = b / a
    if pips < 0:
        raise ValueError("already at or beyond close-out with these inputs")

    loss = pips * pip_value
    initial_margin = notional(units, price) / leverage
    return {
        "initial_margin": initial_margin,
        "margin_level_pct": (balance / initial_margin) * 100.0,
        "effective_leverage": notional(units, price) / balance if balance else float("inf"),
        "pips_to_close_out": pips,
        "loss_at_close_out": loss,
        "loss_pct_of_account": loss / balance * 100.0 if balance else float("inf"),
        "pct_move_of_price": (pips * pip_size) / price * 100.0,
    }


# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------

def _fmt(value) -> str:
    if isinstance(value, bool):
        return "yes" if value else "no"
    if isinstance(value, float):
        if value == float("inf"):
            return "infinite"
        if abs(value) >= 1000:
            return f"{value:,.2f}"
        if abs(value) >= 1:
            return f"{value:,.4f}".rstrip("0").rstrip(".")
        return f"{value:.6f}".rstrip("0").rstrip(".")
    return str(value)


def _show(title: str, rows: dict) -> None:
    print(f"\n{title}")
    print("-" * len(title))
    width = max(len(k) for k in rows)
    for key, value in rows.items():
        label = key.replace("_", " ")
        print(f"  {label:<{width}}  {_fmt(value)}")
    print()


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="cfd_calc",
        description="Arithmetic helpers for the CFD trading fundamentals course. "
                    "Use it to check calculations you have already done by hand.",
        epilog="All figures illustrative. Not financial advice.",
    )
    sub = p.add_subparsers(dest="command", metavar="<command>")

    s = sub.add_parser("notional", help="notional exposure = units x price")
    s.add_argument("--units", type=float, required=True)
    s.add_argument("--price", type=float, required=True)

    s = sub.add_parser("pip-value", help="value of one pip in the account currency")
    s.add_argument("--units", type=float, required=True)
    s.add_argument("--pip-size", type=float, default=0.0001,
                   help="0.0001 for most FX pairs, 0.01 for JPY pairs")
    s.add_argument("--price", type=float,
                   help="current price; required with --base-is-account")
    s.add_argument("--base-is-account", action="store_true",
                   help="set when the BASE currency is your account currency (e.g. USD/JPY on a USD account)")
    s.add_argument("--quote-rate", type=float,
                   help="one unit of the quote currency in your account currency (e.g. GBP/USD for EUR/GBP on a USD account)")

    s = sub.add_parser("margin", help="margin reserved against a position")
    s.add_argument("--units", type=float, required=True)
    s.add_argument("--price", type=float, required=True)
    s.add_argument("--leverage", type=float)
    s.add_argument("--margin-pct", type=float)

    s = sub.add_parser("margin-level", help="margin level = equity / used margin")
    s.add_argument("--equity", type=float, required=True)
    s.add_argument("--used-margin", type=float, required=True)

    s = sub.add_parser("position-size", help="position size from risk budget and stop distance")
    s.add_argument("--balance", type=float, required=True)
    s.add_argument("--risk-pct", type=float, required=True)
    s.add_argument("--entry", type=float, required=True)
    s.add_argument("--stop", type=float, required=True)
    s.add_argument("--pip-size", type=float, default=0.0001)
    s.add_argument("--pip-value-per-lot", "--pip-value", dest="pip_value_per_lot",
                   type=float, default=10.0,
                   help="value of one pip on ONE standard lot (default 10.0)")
    s.add_argument("--step", type=float, default=0.01, help="platform lot step")
    s.add_argument("--lot-size", type=float, default=STANDARD_LOT)

    s = sub.add_parser("expectancy", help="expectancy per trade")
    s.add_argument("--win-rate", type=float, required=True, help="as a decimal, e.g. 0.40")
    s.add_argument("--avg-win", type=float, required=True, help="positive magnitude")
    s.add_argument("--avg-loss", type=float, required=True, help="positive magnitude")
    s.add_argument("--cost", type=float, default=0.0, help="cost per trade, same unit")

    s = sub.add_parser("breakeven", help="break-even win rate for a reward-to-risk ratio")
    s.add_argument("--rr", type=float, required=True)

    s = sub.add_parser("recovery", help="gain needed to recover a drawdown")
    s.add_argument("--drawdown-pct", type=float, required=True)

    s = sub.add_parser("streak", help="effect of N consecutive losses at a fixed risk")
    s.add_argument("--risk-pct", type=float, required=True)
    s.add_argument("--losses", type=int, required=True)

    s = sub.add_parser("streak-probability",
                       help="approximate chance of a losing streak within N trades")
    s.add_argument("--win-rate", type=float, required=True)
    s.add_argument("--streak", type=int, required=True)
    s.add_argument("--trades", type=int, required=True)

    s = sub.add_parser("financing", help="overnight financing on a CFD position")
    s.add_argument("--units", type=float, required=True)
    s.add_argument("--price", type=float, required=True)
    s.add_argument("--rate", dest="annual_rate_pct", type=float, required=True,
                   help="benchmark annual rate, percent")
    s.add_argument("--markup", dest="markup_pct", type=float, default=0.0)
    s.add_argument("--direction", choices=["long", "short"], default="long")
    s.add_argument("--day-count", type=int, default=365)
    s.add_argument("--nights", type=int, default=1)

    s = sub.add_parser("cost-ratio", help="round-trip cost as a share of risk per trade")
    s.add_argument("--cost", dest="total_cost", type=float, required=True)
    s.add_argument("--risk", dest="risk_amount", type=float, required=True)

    s = sub.add_parser("kelly", help="Kelly fraction and the fractions actually used")
    s.add_argument("--win-rate", type=float, required=True)
    s.add_argument("--rr", type=float, required=True)

    s = sub.add_parser("stop-out", help="adverse move that triggers margin close-out")
    s.add_argument("--balance", type=float, required=True)
    s.add_argument("--units", type=float, required=True)
    s.add_argument("--price", type=float, required=True)
    s.add_argument("--leverage", type=float, required=True)
    s.add_argument("--pip-size", type=float, default=0.0001)
    s.add_argument("--pip-value", type=float, required=True,
                   help="value of one pip on THIS position")
    s.add_argument("--close-out-pct", type=float, default=50.0)

    return p


def main(argv=None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if not args.command:
        parser.print_help()
        return 1

    try:
        if args.command == "notional":
            _show("Notional exposure", {
                "units": args.units,
                "price": args.price,
                "notional": notional(args.units, args.price),
            })

        elif args.command == "pip-value":
            value = pip_value(args.units, args.pip_size, args.price,
                              args.base_is_account, args.quote_rate)
            _show("Pip value", {
                "units": args.units,
                "pip_size": args.pip_size,
                "pip_value_account_ccy": value,
            })

        elif args.command == "margin":
            m = margin_required(args.units, args.price, args.leverage, args.margin_pct)
            _show("Margin required", {
                "notional": notional(args.units, args.price),
                "margin_required": m,
            })

        elif args.command == "margin-level":
            _show("Margin level", {
                "equity": args.equity,
                "used_margin": args.used_margin,
                "free_margin": args.equity - args.used_margin,
                "margin_level_pct": margin_level(args.equity, args.used_margin),
            })

        elif args.command == "position-size":
            r = position_size(args.balance, args.risk_pct, args.entry, args.stop,
                              args.pip_size, args.pip_value_per_lot,
                              args.step, args.lot_size)
            _show("Position size", r)
            if r["below_minimum"]:
                print("  WARNING: calculated size is below the platform minimum.")
                print("  Do NOT raise your risk percentage to make the trade fit.")
                print("  Use a different instrument, a wider stop, or do not trade.\n")

        elif args.command == "expectancy":
            _show("Expectancy", expectancy(args.win_rate, args.avg_win,
                                           args.avg_loss, args.cost))

        elif args.command == "breakeven":
            _show("Break-even win rate", {
                "reward_to_risk": args.rr,
                "breakeven_win_rate": breakeven_win_rate(args.rr),
                "breakeven_win_rate_pct": breakeven_win_rate(args.rr) * 100.0,
            })

        elif args.command == "recovery":
            _show("Drawdown recovery", {
                "drawdown_pct": args.drawdown_pct,
                "gain_required_pct": recovery_gain(args.drawdown_pct),
            })

        elif args.command == "streak":
            _show("Losing streak", streak_loss(args.risk_pct, args.losses))

        elif args.command == "streak-probability":
            p = streak_probability(args.win_rate, args.streak, args.trades)
            _show("Losing streak probability", {
                "win_rate": args.win_rate,
                "streak_length": args.streak,
                "over_n_trades": args.trades,
                "probability": p,
                "probability_pct": p * 100.0,
            })

        elif args.command == "financing":
            _show("Overnight financing", financing(
                args.units, args.price, args.annual_rate_pct, args.markup_pct,
                args.direction, args.day_count, args.nights))

        elif args.command == "cost-ratio":
            _show("Cost ratio", cost_ratio(args.total_cost, args.risk_amount))

        elif args.command == "kelly":
            _show("Kelly fraction", kelly(args.win_rate, args.rr))

        elif args.command == "stop-out":
            _show("Margin close-out", stop_out_move(
                args.balance, args.units, args.price, args.leverage,
                args.pip_size, args.pip_value, args.close_out_pct))

    except ValueError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
