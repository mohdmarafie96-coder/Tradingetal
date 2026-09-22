-- Trading et al. Pro — Phase 1 schema.
--
-- Additive only. The four course tables (progress, quiz_meta, quiz_key,
-- attempts) are not touched, and nothing here is on the course's read path, so
-- a fault in this migration cannot stop a lesson loading.
--
-- Deliberately NO trigger on auth.users. A profile row is created lazily by Pro
-- on first visit instead: a trigger that raised would break sign-up for course
-- readers who will never open Pro, and the course must not be able to fail
-- because of a Pro defect.

-- ---------------------------------------------------------------- profiles

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  lang text not null default 'en' check (lang in ('en', 'ar')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);
create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- -------------------------------------------------------- trading_accounts

create table public.trading_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null default 'Main',
  currency text not null default 'USD' check (char_length(currency) = 3),
  -- Money is numeric, never float: a balance that drifts by a cent because of
  -- binary rounding is a support ticket and a loss of trust.
  balance numeric(18, 2) not null default 0 check (balance >= 0),
  leverage integer not null default 30 check (leverage between 1 and 1000),
  default_risk_pct numeric(6, 3) not null default 1 check (default_risk_pct > 0 and default_risk_pct <= 100),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index trading_accounts_user on public.trading_accounts (user_id);

-- At most one default account per user.
create unique index trading_accounts_one_default
  on public.trading_accounts (user_id) where is_default;

alter table public.trading_accounts enable row level security;

create policy trading_accounts_select_own on public.trading_accounts
  for select using (auth.uid() = user_id);
create policy trading_accounts_insert_own on public.trading_accounts
  for insert with check (auth.uid() = user_id);
create policy trading_accounts_update_own on public.trading_accounts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy trading_accounts_delete_own on public.trading_accounts
  for delete using (auth.uid() = user_id);

-- ------------------------------------------------------------- instruments
--
-- One table holds both the shipped catalogue and each user's corrections.
-- user_id null  = catalogue row, readable by everyone, writable by no one.
-- user_id set   = that user's row. If its symbol matches a catalogue row it
--                 overrides it; if it does not, it is an instrument we never
--                 shipped and the user added themselves.
--
-- Overrides are not a nicety. Contract size and point size genuinely differ
-- between brokers — index CFDs most of all — and a wrong contract size makes
-- every position size, every risk figure and every R-multiple wrong.

create table public.instruments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  symbol text not null check (symbol = upper(symbol)),
  display_name text not null,
  kind text not null check (kind in ('forex', 'index', 'commodity', 'stock', 'crypto')),

  -- Money per point per lot, in the quote currency, is contract_size *
  -- point_size. One standard FX lot: 100000 * 0.0001 = 10 quote units a pip.
  contract_size numeric(18, 6) not null check (contract_size > 0),
  point_size numeric(18, 10) not null check (point_size > 0),

  quote_currency text not null check (char_length(quote_currency) = 3),
  -- Forex only. Null for an index or a commodity, which have no base leg.
  base_currency text check (base_currency is null or char_length(base_currency) = 3),

  min_lot numeric(12, 4) not null default 0.01 check (min_lot > 0),
  lot_step numeric(12, 4) not null default 0.01 check (lot_step > 0),
  -- Decimal places to show a price to. EUR/USD quotes a pipette, so 5.
  price_precision smallint not null default 5 check (price_precision between 0 and 10),
  trading_hours text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One catalogue row per symbol, and one row per symbol per user.
create unique index instruments_catalogue_symbol
  on public.instruments (symbol) where user_id is null;
create unique index instruments_user_symbol
  on public.instruments (user_id, symbol) where user_id is not null;

alter table public.instruments enable row level security;

-- Everyone signed in reads the catalogue plus their own rows. Writes are
-- restricted to their own: the catalogue is maintained by us, not by users.
create policy instruments_select on public.instruments
  for select to authenticated using (user_id is null or auth.uid() = user_id);
create policy instruments_insert_own on public.instruments
  for insert to authenticated with check (auth.uid() = user_id);
create policy instruments_update_own on public.instruments
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy instruments_delete_own on public.instruments
  for delete to authenticated using (auth.uid() = user_id);

-- ------------------------------------------------------------------ trades
--
-- Raw facts only. Pips, R-multiple and trading session are all derived from
-- these columns plus the instrument spec, so they are computed on read rather
-- than stored — a stored derivative goes stale the moment a user corrects a
-- contract size, and silently.

create table public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  account_id uuid not null references public.trading_accounts (id) on delete cascade,

  symbol text not null check (symbol = upper(symbol)),
  direction text not null check (direction in ('long', 'short')),
  lot_size numeric(12, 4) not null check (lot_size > 0),

  entry_price numeric(18, 8) not null check (entry_price > 0),
  -- Nullable on purpose. A missing stop is not missing data: it is the single
  -- most important thing the rules engine has to report, so it must be
  -- recordable rather than rejected at entry.
  stop_loss numeric(18, 8) check (stop_loss is null or stop_loss > 0),
  take_profit numeric(18, 8) check (take_profit is null or take_profit > 0),

  opened_at timestamptz not null,
  closed_at timestamptz,
  close_price numeric(18, 8) check (close_price is null or close_price > 0),
  -- What the broker actually paid or took, which is ground truth: it carries
  -- the slippage and the swap that a theoretical figure would miss.
  result_money numeric(18, 2),
  fees numeric(18, 2) not null default 0,

  notes text,
  emotion text check (emotion is null or emotion in ('calm', 'fearful', 'greedy', 'revenge', 'fomo')),
  screenshot_url text,

  source text not null default 'manual' check (source in ('manual', 'csv')),
  -- The broker's ticket number. Re-importing the same statement is a normal
  -- thing to do by accident, and it must not double the journal.
  external_id text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint trades_closed_together check (
    (closed_at is null and close_price is null)
    or (closed_at is not null and close_price is not null)
  ),
  constraint trades_closed_after_open check (closed_at is null or closed_at >= opened_at)
);

create index trades_user_opened on public.trades (user_id, opened_at desc);
create index trades_account on public.trades (account_id);
create unique index trades_user_external
  on public.trades (user_id, external_id) where external_id is not null;

alter table public.trades enable row level security;

create policy trades_select_own on public.trades
  for select using (auth.uid() = user_id);
create policy trades_insert_own on public.trades
  for insert with check (auth.uid() = user_id);
create policy trades_update_own on public.trades
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy trades_delete_own on public.trades
  for delete using (auth.uid() = user_id);

-- ------------------------------------------------------- updated_at upkeep

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger trading_accounts_touch before update on public.trading_accounts
  for each row execute function public.touch_updated_at();
create trigger instruments_touch before update on public.instruments
  for each row execute function public.touch_updated_at();
create trigger trades_touch before update on public.trades
  for each row execute function public.touch_updated_at();
