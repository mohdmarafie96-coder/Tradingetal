-- Pro schema hardening, from review of 20260922120000_pro_schema.sql.
--
-- 1. A trade could reference somebody else's trading account.
--    RLS on trades checked only the trade's own user_id, and a foreign-key
--    check runs as the table owner, so user A could insert a trade stamped
--    with A's id but pointing at B's account_id. Nothing leaked on read, but
--    B deleting that account cascaded A's trade away, and any per-account
--    figure computed server-side would have counted A's trade in B's numbers.
--    Fix: the foreign key now covers (account_id, user_id), so a trade can
--    only point at an account owned by the same user.
--
-- 2. Every policy called auth.uid() bare, which Postgres re-evaluates for
--    each row. Wrapped in a scalar subquery it is evaluated once per
--    statement. Irrelevant on empty tables; not on trades, which analytics
--    will scan in bulk. Course tables are deliberately left alone.

-- ------------------------------------------------ 1. account ownership

alter table public.trading_accounts
  add constraint trading_accounts_id_user unique (id, user_id);

alter table public.trades
  drop constraint trades_account_id_fkey;

alter table public.trades
  add constraint trades_account_owned
  foreign key (account_id, user_id)
  references public.trading_accounts (id, user_id)
  on delete cascade;

-- ------------------------------------------------ 2. policies, evaluated once

drop policy profiles_select_own on public.profiles;
drop policy profiles_insert_own on public.profiles;
drop policy profiles_update_own on public.profiles;

create policy profiles_select_own on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy profiles_insert_own on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy profiles_update_own on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy trading_accounts_select_own on public.trading_accounts;
drop policy trading_accounts_insert_own on public.trading_accounts;
drop policy trading_accounts_update_own on public.trading_accounts;
drop policy trading_accounts_delete_own on public.trading_accounts;

create policy trading_accounts_select_own on public.trading_accounts
  for select to authenticated using ((select auth.uid()) = user_id);
create policy trading_accounts_insert_own on public.trading_accounts
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy trading_accounts_update_own on public.trading_accounts
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy trading_accounts_delete_own on public.trading_accounts
  for delete to authenticated using ((select auth.uid()) = user_id);

drop policy instruments_select on public.instruments;
drop policy instruments_insert_own on public.instruments;
drop policy instruments_update_own on public.instruments;
drop policy instruments_delete_own on public.instruments;

create policy instruments_select on public.instruments
  for select to authenticated using (user_id is null or (select auth.uid()) = user_id);
create policy instruments_insert_own on public.instruments
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy instruments_update_own on public.instruments
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy instruments_delete_own on public.instruments
  for delete to authenticated using ((select auth.uid()) = user_id);

drop policy trades_select_own on public.trades;
drop policy trades_insert_own on public.trades;
drop policy trades_update_own on public.trades;
drop policy trades_delete_own on public.trades;

create policy trades_select_own on public.trades
  for select to authenticated using ((select auth.uid()) = user_id);
create policy trades_insert_own on public.trades
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy trades_update_own on public.trades
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy trades_delete_own on public.trades
  for delete to authenticated using ((select auth.uid()) = user_id);
