-- Instrument catalogue (user_id null = shipped row, readable by all).
--
-- contract_size * point_size = money per point, per lot, in the quote currency.
-- One standard FX lot is 100000 units, so a 0.0001 pip is 10 quote units; a JPY
-- pip is 0.01, so 1000 yen.
--
-- Index specifications vary more between brokers than anything else here — 1
-- lot is one contract at one currency unit per point with most retail CFD
-- brokers, but not all. That is what the per-user override exists for, and the
-- UI tells users to check these against their own broker.

insert into public.instruments
  (user_id, symbol, display_name, kind, contract_size, point_size,
   quote_currency, base_currency, min_lot, lot_step, price_precision, trading_hours)
values
  (null, 'EURUSD', 'EUR/USD', 'forex', 100000, 0.0001, 'USD', 'EUR', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'GBPUSD', 'GBP/USD', 'forex', 100000, 0.0001, 'USD', 'GBP', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'AUDUSD', 'AUD/USD', 'forex', 100000, 0.0001, 'USD', 'AUD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'NZDUSD', 'NZD/USD', 'forex', 100000, 0.0001, 'USD', 'NZD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'USDCAD', 'USD/CAD', 'forex', 100000, 0.0001, 'CAD', 'USD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'USDCHF', 'USD/CHF', 'forex', 100000, 0.0001, 'CHF', 'USD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'USDJPY', 'USD/JPY', 'forex', 100000, 0.01, 'JPY', 'USD', 0.01, 0.01, 3, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'EURGBP', 'EUR/GBP', 'forex', 100000, 0.0001, 'GBP', 'EUR', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'EURJPY', 'EUR/JPY', 'forex', 100000, 0.01, 'JPY', 'EUR', 0.01, 0.01, 3, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'EURCHF', 'EUR/CHF', 'forex', 100000, 0.0001, 'CHF', 'EUR', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'EURAUD', 'EUR/AUD', 'forex', 100000, 0.0001, 'AUD', 'EUR', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'EURCAD', 'EUR/CAD', 'forex', 100000, 0.0001, 'CAD', 'EUR', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'EURNZD', 'EUR/NZD', 'forex', 100000, 0.0001, 'NZD', 'EUR', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'GBPJPY', 'GBP/JPY', 'forex', 100000, 0.01, 'JPY', 'GBP', 0.01, 0.01, 3, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'GBPAUD', 'GBP/AUD', 'forex', 100000, 0.0001, 'AUD', 'GBP', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'GBPCAD', 'GBP/CAD', 'forex', 100000, 0.0001, 'CAD', 'GBP', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'GBPCHF', 'GBP/CHF', 'forex', 100000, 0.0001, 'CHF', 'GBP', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'GBPNZD', 'GBP/NZD', 'forex', 100000, 0.0001, 'NZD', 'GBP', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'AUDJPY', 'AUD/JPY', 'forex', 100000, 0.01, 'JPY', 'AUD', 0.01, 0.01, 3, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'AUDNZD', 'AUD/NZD', 'forex', 100000, 0.0001, 'NZD', 'AUD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'AUDCAD', 'AUD/CAD', 'forex', 100000, 0.0001, 'CAD', 'AUD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'AUDCHF', 'AUD/CHF', 'forex', 100000, 0.0001, 'CHF', 'AUD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'NZDJPY', 'NZD/JPY', 'forex', 100000, 0.01, 'JPY', 'NZD', 0.01, 0.01, 3, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'NZDCAD', 'NZD/CAD', 'forex', 100000, 0.0001, 'CAD', 'NZD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'NZDCHF', 'NZD/CHF', 'forex', 100000, 0.0001, 'CHF', 'NZD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'CADJPY', 'CAD/JPY', 'forex', 100000, 0.01, 'JPY', 'CAD', 0.01, 0.01, 3, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'CADCHF', 'CAD/CHF', 'forex', 100000, 0.0001, 'CHF', 'CAD', 0.01, 0.01, 5, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'CHFJPY', 'CHF/JPY', 'forex', 100000, 0.01, 'JPY', 'CHF', 0.01, 0.01, 3, 'Sunday 22:00 - Friday 22:00 UTC'),
  (null, 'XAUUSD', 'Gold', 'commodity', 100, 0.01, 'USD', null, 0.01, 0.01, 2, 'Sunday 23:00 - Friday 22:00 UTC, daily break'),
  (null, 'XAGUSD', 'Silver', 'commodity', 5000, 0.001, 'USD', null, 0.01, 0.01, 3, 'Sunday 23:00 - Friday 22:00 UTC, daily break'),
  (null, 'XTIUSD', 'WTI Crude Oil', 'commodity', 1000, 0.01, 'USD', null, 0.01, 0.01, 2, 'Sunday 23:00 - Friday 21:00 UTC, daily break'),
  (null, 'XBRUSD', 'Brent Crude Oil', 'commodity', 1000, 0.01, 'USD', null, 0.01, 0.01, 2, 'Sunday 23:00 - Friday 21:00 UTC, daily break'),
  (null, 'US30', 'Dow Jones 30', 'index', 1, 1, 'USD', null, 0.01, 0.01, 2, 'Sunday 23:00 - Friday 21:00 UTC, daily break'),
  (null, 'NAS100', 'Nasdaq 100', 'index', 1, 1, 'USD', null, 0.01, 0.01, 2, 'Sunday 23:00 - Friday 21:00 UTC, daily break'),
  (null, 'SPX500', 'S&P 500', 'index', 1, 1, 'USD', null, 0.01, 0.01, 2, 'Sunday 23:00 - Friday 21:00 UTC, daily break'),
  (null, 'GER40', 'DAX 40', 'index', 1, 1, 'EUR', null, 0.01, 0.01, 2, 'Monday - Friday 06:00 - 20:00 UTC'),
  (null, 'UK100', 'FTSE 100', 'index', 1, 1, 'GBP', null, 0.01, 0.01, 2, 'Monday - Friday 07:00 - 20:00 UTC'),
  (null, 'FRA40', 'CAC 40', 'index', 1, 1, 'EUR', null, 0.01, 0.01, 2, 'Monday - Friday 06:00 - 20:00 UTC'),
  (null, 'JP225', 'Nikkei 225', 'index', 1, 1, 'JPY', null, 0.01, 0.01, 0, 'Monday - Friday 23:00 - 21:00 UTC, daily break'),
  (null, 'AUS200', 'ASX 200', 'index', 1, 1, 'AUD', null, 0.01, 0.01, 1, 'Monday - Friday 23:50 - 20:00 UTC, daily break');
