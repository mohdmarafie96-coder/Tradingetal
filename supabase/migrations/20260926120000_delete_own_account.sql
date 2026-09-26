-- Readers can delete their own account (course → Account → Delete account).
--
-- Everything tied to the account goes with it through the existing ON DELETE
-- CASCADE keys: course progress and quiz attempts, profile, trading accounts,
-- instruments, trades and membership. Sign-in sessions and linked Google
-- identities go with auth.users itself.
--
-- The exception is payments. The privacy policy says payment records are kept
-- for as long as the law requires financial records, even after an account
-- is deleted. So a payment now outlives its account: the payer's email is
-- copied onto the row first, then user_id becomes null.

-- ------------------------------------------------ payments outlive accounts

alter table public.payments add column payer_email text;

alter table public.payments alter column user_id drop not null;

alter table public.payments drop constraint payments_user_id_fkey;

alter table public.payments
  add constraint payments_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete set null;

-- --------------------------------------------------------- the deletion

create or replace function public.delete_own_account(p_confirm_email text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  uid uuid := (select auth.uid());
  address text;
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;

  -- The reader types their own email address to confirm. Checked here, not
  -- only in the browser, so a stray call cannot delete an account.
  select email into address from auth.users where id = uid;
  if address is null
     or lower(btrim(coalesce(p_confirm_email, ''))) <> lower(address) then
    raise exception 'confirmation does not match' using errcode = '22023';
  end if;

  -- An admin removing themselves could leave the console with nobody to run
  -- it. Admins are removed from public.admins first, deliberately.
  if exists (select 1 from public.admins where user_id = uid) then
    raise exception 'admin accounts cannot be deleted here' using errcode = '42501';
  end if;

  update public.payments set payer_email = address where user_id = uid;

  delete from auth.users where id = uid;
end;
$$;

revoke execute on function public.delete_own_account(text) from public, anon, authenticated;
grant execute on function public.delete_own_account(text) to authenticated;

-- --------------------------------- the admin's payments list keeps them

create or replace function public.admin_payments(p_limit int default 500)
returns table (
  id uuid, user_id uuid, email text, amount numeric, currency text, method text,
  reference text, note text, paid_at timestamptz, recorded_by text
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  perform public.assert_admin();
  return query
  select p.id, p.user_id, coalesce(u.email::text, p.payer_email), p.amount, p.currency,
         p.method, p.reference, p.note, p.paid_at, a.username
  from public.payments p
  left join auth.users u on u.id = p.user_id
  left join public.admins a on a.user_id = p.recorded_by
  order by p.paid_at desc
  limit least(greatest(coalesce(p_limit, 500), 1), 5000);
end;
$$;

revoke execute on function public.admin_payments(int) from public, anon, authenticated;
grant execute on function public.admin_payments(int) to authenticated;
