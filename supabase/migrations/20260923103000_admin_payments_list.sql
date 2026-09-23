-- Every payment, newest first, for the admin's payments page.

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
  select p.id, p.user_id, u.email::text, p.amount, p.currency, p.method,
         p.reference, p.note, p.paid_at, a.username
  from public.payments p
  join auth.users u on u.id = p.user_id
  left join public.admins a on a.user_id = p.recorded_by
  order by p.paid_at desc
  limit least(greatest(coalesce(p_limit, 500), 1), 5000);
end;
$$;

revoke execute on function public.admin_payments(int) from public, anon, authenticated;
grant execute on function public.admin_payments(int) to authenticated;
