-- The ownership foreign key added in pro_schema_hardening covers
-- (account_id, user_id), but the only index was on account_id alone. Deleting
-- an account cascades to its trades, and without a matching index that lookup
-- scans the table. The composite index also serves every query the old one did,
-- since account_id leads.

drop index public.trades_account;
create index trades_account_user on public.trades (account_id, user_id);
