#!/usr/bin/env python3
"""
Tests for cfd_calc.

Run from the repository root:
    python3 -m unittest discover -s tools -v

Several tests pin the exact figures quoted in the course lessons, so that the
tool and the text cannot drift apart.
"""

import unittest

import cfd_calc as c


class TestNotional(unittest.TestCase):
    def test_basic(self):
        self.assertAlmostEqual(c.notional(100_000, 1.0850), 108_500.0)

    def test_lesson_03_1_example_1(self):
        # 0.25 lots GBP/USD at 1.2650 -> $31,625
        self.assertAlmostEqual(c.notional(25_000, 1.2650), 31_625.0)


class TestPipValue(unittest.TestCase):
    def test_quote_is_account_currency(self):
        # EUR/USD, 1 standard lot, USD account -> $10
        self.assertAlmostEqual(c.pip_value(100_000, 0.0001), 10.0)

    def test_micro_lot(self):
        self.assertAlmostEqual(c.pip_value(1_000, 0.0001), 0.10)

    def test_base_is_account_currency(self):
        # USD/JPY at 150.00, 1 lot, USD account -> ~$6.67 (Module 03.2)
        self.assertAlmostEqual(c.pip_value(100_000, 0.01, price=150.00,
                                           base_is_account=True), 6.6667, places=4)

    def test_neither_currency_is_account(self):
        # EUR/GBP, 1 lot, USD account, GBP/USD 1.2700 -> $12.70
        self.assertAlmostEqual(c.pip_value(100_000, 0.0001, quote_rate=1.2700), 12.70)

    def test_base_is_account_requires_price(self):
        with self.assertRaises(ValueError):
            c.pip_value(100_000, 0.01, base_is_account=True)


class TestMargin(unittest.TestCase):
    def test_leverage(self):
        self.assertAlmostEqual(c.margin_required(100_000, 1.0900, leverage=30),
                               3_633.3333, places=4)

    def test_margin_pct_equivalent_to_leverage(self):
        by_lev = c.margin_required(50_000, 2.0, leverage=20)
        by_pct = c.margin_required(50_000, 2.0, margin_pct=5.0)
        self.assertAlmostEqual(by_lev, by_pct)

    def test_requires_one_of_the_two(self):
        with self.assertRaises(ValueError):
            c.margin_required(1_000, 1.0)
        with self.assertRaises(ValueError):
            c.margin_required(1_000, 1.0, leverage=30, margin_pct=5)

    def test_rejects_bad_leverage(self):
        with self.assertRaises(ValueError):
            c.margin_required(1_000, 1.0, leverage=0)


class TestMarginLevel(unittest.TestCase):
    def test_basic(self):
        self.assertAlmostEqual(c.margin_level(5_000, 1_817), 275.1788, places=3)

    def test_zero_used_margin_raises(self):
        with self.assertRaises(ValueError):
            c.margin_level(5_000, 0)


class TestPositionSize(unittest.TestCase):
    def test_lesson_06_1_worked_example(self):
        # $5,000, 1%, 1.0880 -> 1.0845 (35 pips) should give 0.14 lots, $49 risk
        r = c.position_size(5_000, 1.0, 1.0880, 1.0845)
        self.assertAlmostEqual(r["stop_pips"], 35.0, places=6)
        self.assertAlmostEqual(r["lots"], 0.14)
        self.assertAlmostEqual(r["units"], 14_000.0)
        self.assertAlmostEqual(r["actual_risk"], 49.0, places=6)
        self.assertLess(r["actual_risk_pct"], 1.0)

    def test_always_rounds_down(self):
        r = c.position_size(5_000, 1.0, 1.0880, 1.0845)
        self.assertLessEqual(r["lots"], r["exact_lots"])
        self.assertLessEqual(r["actual_risk"], r["risk_amount"])

    def test_readme_example(self):
        r = c.position_size(10_000, 1.0, 1.0850, 1.0800)
        self.assertAlmostEqual(r["stop_pips"], 50.0, places=6)
        self.assertAlmostEqual(r["lots"], 0.20)
        self.assertAlmostEqual(r["actual_risk"], 100.0, places=6)

    def test_direction_does_not_matter(self):
        long_side = c.position_size(5_000, 1.0, 1.0880, 1.0845)
        short_side = c.position_size(5_000, 1.0, 1.0845, 1.0880)
        self.assertAlmostEqual(long_side["lots"], short_side["lots"])

    def test_below_minimum_flagged(self):
        # Tiny account, wide stop -> below the 0.01 lot step
        r = c.position_size(100, 1.0, 1.0900, 1.0500)
        self.assertTrue(r["below_minimum"])
        self.assertEqual(r["lots"], 0.0)

    def test_equal_entry_and_stop_raises(self):
        with self.assertRaises(ValueError):
            c.position_size(5_000, 1.0, 1.0900, 1.0900)

    def test_no_float_dust_in_lots(self):
        r = c.position_size(5_000, 1.0, 1.0880, 1.0845)
        self.assertEqual(len(str(r["lots"]).split(".")[-1]), 2)


class TestExpectancy(unittest.TestCase):
    def test_strategy_a_from_lesson_06_2(self):
        r = c.expectancy(0.40, 2.5, 1.0)
        self.assertAlmostEqual(r["gross_expectancy"], 0.40, places=10)
        self.assertTrue(r["viable"])

    def test_strategy_c_wins_often_and_loses_money(self):
        r = c.expectancy(0.80, 0.2, 1.0)
        self.assertAlmostEqual(r["gross_expectancy"], -0.04, places=10)
        self.assertFalse(r["viable"])

    def test_costs_can_flip_a_marginal_strategy(self):
        r = c.expectancy(0.65, 0.6, 1.0, cost=0.07)
        self.assertGreater(r["gross_expectancy"], 0)
        self.assertLess(r["net_expectancy"], 0)
        self.assertFalse(r["viable"])

    def test_rejects_negative_magnitudes(self):
        with self.assertRaises(ValueError):
            c.expectancy(0.5, 2.0, -1.0)

    def test_rejects_out_of_range_win_rate(self):
        with self.assertRaises(ValueError):
            c.expectancy(1.5, 2.0, 1.0)


class TestBreakevenWinRate(unittest.TestCase):
    def test_one_to_one(self):
        self.assertAlmostEqual(c.breakeven_win_rate(1.0), 0.50)

    def test_two_to_one(self):
        self.assertAlmostEqual(c.breakeven_win_rate(2.0), 1.0 / 3.0)

    def test_three_to_one(self):
        self.assertAlmostEqual(c.breakeven_win_rate(3.0), 0.25)

    def test_rejects_zero(self):
        with self.assertRaises(ValueError):
            c.breakeven_win_rate(0)


class TestRecovery(unittest.TestCase):
    def test_fifty_percent_needs_one_hundred(self):
        self.assertAlmostEqual(c.recovery_gain(50), 100.0)

    def test_twenty_percent_needs_twenty_five(self):
        self.assertAlmostEqual(c.recovery_gain(20), 25.0)

    def test_ninety_percent_needs_nine_hundred(self):
        self.assertAlmostEqual(c.recovery_gain(90), 900.0, places=6)

    def test_rejects_total_loss(self):
        with self.assertRaises(ValueError):
            c.recovery_gain(100)


class TestStreak(unittest.TestCase):
    def test_ten_losses_at_one_percent(self):
        r = c.streak_loss(1.0, 10)
        self.assertAlmostEqual(r["remaining_pct"], 90.4382, places=3)

    def test_ten_losses_at_five_percent(self):
        r = c.streak_loss(5.0, 10)
        self.assertAlmostEqual(r["remaining_pct"], 59.8737, places=3)
        self.assertAlmostEqual(r["recovery_gain_pct"], 67.0, places=1)

    def test_zero_losses_is_no_change(self):
        r = c.streak_loss(1.0, 0)
        self.assertAlmostEqual(r["remaining_pct"], 100.0)

    def test_probability_matches_lesson_06_3_table(self):
        # 45% win rate, 100 trades: 5+ losses ~89%, 8+ ~30%, 10+ ~10%
        self.assertAlmostEqual(c.streak_probability(0.45, 5, 100), 0.889, places=2)
        self.assertAlmostEqual(c.streak_probability(0.45, 8, 100), 0.296, places=2)
        self.assertAlmostEqual(c.streak_probability(0.45, 10, 100), 0.099, places=2)

    def test_probability_rises_with_more_trades(self):
        few = c.streak_probability(0.45, 6, 50)
        many = c.streak_probability(0.45, 6, 500)
        self.assertLess(few, many)

    def test_probability_rejects_impossible_inputs(self):
        with self.assertRaises(ValueError):
            c.streak_probability(0.45, 20, 10)


class TestFinancing(unittest.TestCase):
    def test_lesson_03_4_long_index(self):
        # 5 CFDs US 500 at 5,120; 5.0% benchmark + 2.5% markup -> ~-$5.26/night
        r = c.financing(5, 5_120, 5.0, 2.5, "long", 365, 1)
        self.assertAlmostEqual(r["notional"], 25_600.0)
        self.assertAlmostEqual(r["per_night"], -5.2603, places=4)

    def test_short_receives_benchmark_minus_markup(self):
        r = c.financing(5, 5_120, 5.0, 2.5, "short", 365, 1)
        self.assertAlmostEqual(r["per_night"], 1.7534, places=4)

    def test_short_pays_when_markup_exceeds_benchmark(self):
        r = c.financing(5, 5_120, 1.0, 2.5, "short", 365, 1)
        self.assertLess(r["per_night"], 0)

    def test_nights_multiply(self):
        one = c.financing(5, 5_120, 5.0, 2.5, "long", 365, 1)
        thirty = c.financing(5, 5_120, 5.0, 2.5, "long", 365, 30)
        self.assertAlmostEqual(thirty["total"], one["per_night"] * 30)

    def test_rejects_bad_direction(self):
        with self.assertRaises(ValueError):
            c.financing(5, 5_120, 5.0, 2.5, "sideways")


class TestCostRatio(unittest.TestCase):
    def test_sustainable(self):
        self.assertEqual(c.cost_ratio(5, 100)["verdict"], "sustainable")

    def test_severe(self):
        r = c.cost_ratio(60, 100)
        self.assertAlmostEqual(r["cost_ratio_pct"], 60.0)
        self.assertIn("wrong", r["verdict"])

    def test_rejects_zero_risk(self):
        with self.assertRaises(ValueError):
            c.cost_ratio(5, 0)


class TestKelly(unittest.TestCase):
    def test_lesson_06_2_example(self):
        # 45% win rate at 2R -> 17.5% full Kelly
        r = c.kelly(0.45, 2.0)
        self.assertAlmostEqual(r["full_kelly_pct"], 17.5, places=6)
        self.assertAlmostEqual(r["tenth_kelly_pct"], 1.75, places=6)
        self.assertTrue(r["has_edge"])

    def test_no_edge_gives_negative_fraction(self):
        r = c.kelly(0.30, 1.0)
        self.assertLess(r["full_kelly_pct"], 0)
        self.assertFalse(r["has_edge"])


class TestStopOut(unittest.TestCase):
    def test_lesson_04_3_oversized_position(self):
        # $5,000, 1.0 lot EUR/USD at 1.0900, 30:1 -> ~324 pips, ~65% of account
        r = c.stop_out_move(5_000, 100_000, 1.0900, 30, 0.0001, 10.0)
        self.assertAlmostEqual(r["initial_margin"], 3_633.33, places=2)
        self.assertAlmostEqual(r["margin_level_pct"], 137.61, places=2)
        self.assertAlmostEqual(r["pips_to_close_out"], 323.73, places=2)
        self.assertAlmostEqual(r["loss_pct_of_account"], 64.75, places=2)

    def test_lesson_04_3_margin_call_at_100_pct(self):
        r = c.stop_out_move(5_000, 100_000, 1.0900, 30, 0.0001, 10.0,
                            close_out_pct=100.0)
        self.assertAlmostEqual(r["pips_to_close_out"], 141.38, places=2)

    def test_correct_sizing_pushes_close_out_out_of_reach(self):
        # Same account sized at ~1% risk: close-out needs a move that does not occur
        r = c.stop_out_move(5_000, 16_000, 1.0900, 30, 0.0001, 1.60)
        self.assertGreater(r["pips_to_close_out"], 2_500)
        self.assertLess(r["effective_leverage"], 4)

    def test_rejects_bad_leverage(self):
        with self.assertRaises(ValueError):
            c.stop_out_move(5_000, 100_000, 1.09, 0, 0.0001, 10.0)


class TestCLI(unittest.TestCase):
    def test_no_command_returns_usage_code(self):
        self.assertEqual(c.main([]), 1)

    def test_valid_command_succeeds(self):
        self.assertEqual(c.main(["notional", "--units", "1000", "--price", "1.09"]), 0)

    def test_invalid_input_returns_error_code(self):
        self.assertEqual(
            c.main(["margin", "--units", "1000", "--price", "1.09",
                    "--leverage", "0"]), 2)

    def test_pip_value_alias_accepted(self):
        # --pip-value is an accepted alias for --pip-value-per-lot
        self.assertEqual(
            c.main(["position-size", "--balance", "10000", "--risk-pct", "1",
                    "--entry", "1.0850", "--stop", "1.0800",
                    "--pip-value", "10", "--pip-size", "0.0001"]), 0)


if __name__ == "__main__":
    unittest.main()
