-- Membership, manual payments and the admin console.
--
-- The rule this schema exists to enforce: a user can never grant themselves
-- Pro. Every table a user could use to do that (memberships, payments, admins)
-- has no write policy at all. The only ways in are:
--   request_pro()       a signed-in user asks for Pro and quotes a payment reference
--   admin_* functions   each checks is_admin() first and writes an audit row
--
-- The four course tables are not altered. The admin reads them through
-- security-definer functions instead of new policies, so a student's own
-- access to their own rows is exactly what it was.

-- ------------------------------------------------------------ memberships

create table public.memberships (
  user_id uuid primary key references auth.users (id) on delete cascade,
  status text not null check (status in ('requested', 'active', 'rejected', 'revoked')),
  -- What the student quotes from their bank transfer, so the admin can match it.
  payment_reference text check (char_length(payment_reference) <= 200),
  requested_at timestamptz,
  decided_at timestamptz,
  decided_by uuid references auth.users (id) on delete set null,
  note text check (char_length(note) <= 1000),
  updated_at timestamptz not null default now()
);

alter table public.memberships enable row level security;

create policy memberships_select_own on public.memberships
  for select to authenticated using ((select auth.uid()) = user_id);
-- No insert, update or delete policy: see request_pro() and admin_set_membership().

create trigger memberships_touch before update on public.memberships
  for each row execute function public.touch_updated_at();

-- --------------------------------------------------------------- payments
-- Recorded by the admin when money arrives. Manual for now; a card provider's
-- webhook will write here later without the rest changing.

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null check (char_length(currency) = 3 and currency = upper(currency)),
  method text not null default 'bank_transfer' check (char_length(method) between 1 and 40),
  reference text check (char_length(reference) <= 200),
  note text check (char_length(note) <= 1000),
  paid_at timestamptz not null default now(),
  recorded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index payments_user on public.payments (user_id, paid_at desc);

alter table public.payments enable row level security;

create policy payments_select_own on public.payments
  for select to authenticated using ((select auth.uid()) = user_id);

-- ------------------------------------------------------------------ admins
-- No policies at all: invisible and unwritable through the API. Admins are
-- added by migration, never from the website.

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9_.-]{3,40}$'),
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- ------------------------------------------------------------- audit log

create table public.admin_audit (
  id bigint generated always as identity primary key,
  admin_id uuid references auth.users (id) on delete set null,
  action text not null,
  target_user uuid references auth.users (id) on delete set null,
  details jsonb not null default '{}'::jsonb,
  at timestamptz not null default now()
);

create index admin_audit_at on public.admin_audit (at desc);

alter table public.admin_audit enable row level security;

-- ---------------------------------------------------- admin login throttle

create table public.admin_login_attempts (
  id bigint generated always as identity primary key,
  username text not null,
  ok boolean not null,
  at timestamptz not null default now()
);

create index admin_login_attempts_recent on public.admin_login_attempts (username, at desc);

alter table public.admin_login_attempts enable row level security;

-- ---------------------------------------------------------- site settings
-- Readable by everyone (the price and payment instructions are shown on the
-- upgrade page); written only through admin_update_setting().

create table public.site_settings (
  key text primary key check (key in ('pro_price', 'payment_instructions')),
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.site_settings enable row level security;

create policy site_settings_read on public.site_settings
  for select to anon, authenticated using (true);

insert into public.site_settings (key, value) values
  ('pro_price', '{"amount": null, "currency": "USD", "period": "month"}'),
  ('payment_instructions', '{"en": "", "ar": ""}');

-- ================================================================ functions

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- Pro is open to approved members and to admins.
create or replace function public.has_pro()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.is_admin()
      or exists (
        select 1 from public.memberships
        where user_id = (select auth.uid()) and status = 'active'
      );
$$;

-- A signed-in student asks for Pro, quoting their payment reference.
create or replace function public.request_pro(p_reference text)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  uid uuid := auth.uid();
  ref text := nullif(btrim(coalesce(p_reference, '')), '');
  current_status text;
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;
  if ref is not null and char_length(ref) > 200 then
    raise exception 'reference too long' using errcode = '22001';
  end if;

  select status into current_status from public.memberships where user_id = uid;
  if current_status = 'active' then
    return 'active';
  end if;

  insert into public.memberships (user_id, status, payment_reference, requested_at)
  values (uid, 'requested', ref, now())
  on conflict (user_id) do update
    set status = 'requested',
        payment_reference = excluded.payment_reference,
        requested_at = now(),
        decided_at = null,
        decided_by = null;

  return 'requested';
end;
$$;

-- Admin sign-in by username.
--
-- Returns the account's email only when the username belongs to an admin AND
-- the password matches, so typing a username reveals nothing. The comparison
-- runs even for an unknown username (against a fresh salt) so the response
-- time does not reveal which usernames exist. Five failures for one username
-- in fifteen minutes lock it for the rest of that window.
create or replace function public.admin_login_email(p_username text, p_password text)
returns text
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  uname text := lower(btrim(coalesce(p_username, '')));
  failures int;
  stored text;
  found_email text;
begin
  delete from public.admin_login_attempts where at < now() - interval '1 day';

  select count(*) into failures
  from public.admin_login_attempts
  where username = uname and not ok and at > now() - interval '15 minutes';

  if failures >= 5 then
    raise exception 'locked' using errcode = '28000';
  end if;

  select u.encrypted_password, u.email into stored, found_email
  from public.admins a
  join auth.users u on u.id = a.user_id
  where a.username = uname;

  if stored is not null
     and stored = extensions.crypt(coalesce(p_password, ''), stored) then
    insert into public.admin_login_attempts (username, ok) values (uname, true);
    return found_email;
  end if;

  -- An unknown username still pays for one bcrypt round (against a fresh
  -- salt at the cost Supabase uses), so it takes as long as a wrong password.
  if stored is null then
    perform extensions.crypt(coalesce(p_password, ''), extensions.gen_salt('bf', 10));
  end if;
  insert into public.admin_login_attempts (username, ok) values (uname, false);
  return null;
end;
$$;

-- Every admin function starts here.
create or replace function public.assert_admin()
returns void
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorised' using errcode = '42501';
  end if;
end;
$$;

create or replace function public.admin_log(p_action text, p_target uuid, p_details jsonb)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  insert into public.admin_audit (admin_id, action, target_user, details)
  values ((select auth.uid()), p_action, p_target, coalesce(p_details, '{}'::jsonb));
$$;

create or replace function public.admin_overview()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  perform public.assert_admin();
  return jsonb_build_object(
    'users', (select count(*) from auth.users),
    'users_7d', (select count(*) from auth.users where created_at > now() - interval '7 days'),
    'pro_active', (select count(*) from public.memberships where status = 'active'),
    'requests', (select count(*) from public.memberships where status = 'requested'),
    'quiz_attempts', (select count(*) from public.attempts),
    'trades', (select count(*) from public.trades),
    'revenue', coalesce((
      select jsonb_object_agg(currency, total)
      from (select currency, sum(amount) as total from public.payments group by currency) t
    ), '{}'::jsonb)
  );
end;
$$;

create or replace function public.admin_users(p_search text default null)
returns table (
  id uuid,
  email text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  confirmed boolean,
  membership text,
  is_admin boolean,
  pages_done int,
  quiz_attempts int,
  trades int
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  perform public.assert_admin();
  return query
  select
    u.id,
    u.email::text,
    u.created_at,
    u.last_sign_in_at,
    u.email_confirmed_at is not null,
    m.status,
    exists (select 1 from public.admins a where a.user_id = u.id),
    coalesce((select cardinality(p.completed) from public.progress p where p.user_id = u.id), 0),
    (select count(*)::int from public.attempts at where at.user_id = u.id),
    (select count(*)::int from public.trades tr where tr.user_id = u.id)
  from auth.users u
  left join public.memberships m on m.user_id = u.id
  where p_search is null
     or btrim(p_search) = ''
     or u.email ilike '%' || btrim(p_search) || '%'
  order by u.created_at desc;
end;
$$;

create or replace function public.admin_user_detail(p_user uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  perform public.assert_admin();
  return jsonb_build_object(
    'user', (
      select jsonb_build_object(
        'id', u.id, 'email', u.email, 'created_at', u.created_at,
        'last_sign_in_at', u.last_sign_in_at, 'confirmed', u.email_confirmed_at is not null,
        'lang', (select lang from public.profiles where id = u.id),
        'is_admin', exists (select 1 from public.admins a where a.user_id = u.id)
      )
      from auth.users u where u.id = p_user
    ),
    'membership', (select to_jsonb(m) from public.memberships m where m.user_id = p_user),
    'payments', coalesce((
      select jsonb_agg(to_jsonb(p) order by p.paid_at desc) from public.payments p where p.user_id = p_user
    ), '[]'::jsonb),
    'progress', coalesce((select to_jsonb(p.completed) from public.progress p where p.user_id = p_user), '[]'::jsonb),
    'attempts', coalesce((
      select jsonb_agg(jsonb_build_object(
        'quiz_id', a.quiz_id, 'correct', a.correct, 'total', a.total,
        'score', a.score, 'passed', a.passed, 'created_at', a.created_at
      ) order by a.created_at desc)
      from public.attempts a where a.user_id = p_user
    ), '[]'::jsonb),
    'accounts', coalesce((
      select jsonb_agg(to_jsonb(ta) order by ta.created_at) from public.trading_accounts ta where ta.user_id = p_user
    ), '[]'::jsonb),
    'trades', coalesce((
      select jsonb_agg(to_jsonb(t) order by t.opened_at desc)
      from (select * from public.trades where user_id = p_user order by opened_at desc limit 200) t
    ), '[]'::jsonb),
    'audit', coalesce((
      select jsonb_agg(jsonb_build_object('action', l.action, 'details', l.details, 'at', l.at) order by l.at desc)
      from public.admin_audit l where l.target_user = p_user
    ), '[]'::jsonb)
  );
end;
$$;

create or replace function public.admin_requests()
returns table (user_id uuid, email text, payment_reference text, requested_at timestamptz, paid numeric)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  perform public.assert_admin();
  return query
  select m.user_id, u.email::text, m.payment_reference, m.requested_at,
         coalesce((select sum(p.amount) from public.payments p where p.user_id = m.user_id), 0)
  from public.memberships m
  join auth.users u on u.id = m.user_id
  where m.status = 'requested'
  order by m.requested_at;
end;
$$;

create or replace function public.admin_set_membership(p_user uuid, p_status text, p_note text default null)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  previous text;
begin
  perform public.assert_admin();
  if p_status not in ('active', 'rejected', 'revoked') then
    raise exception 'invalid status' using errcode = '22023';
  end if;
  if not exists (select 1 from auth.users where id = p_user) then
    raise exception 'no such user' using errcode = '22023';
  end if;

  select status into previous from public.memberships where user_id = p_user;

  insert into public.memberships (user_id, status, decided_at, decided_by, note)
  values (p_user, p_status, now(), (select auth.uid()), nullif(btrim(coalesce(p_note, '')), ''))
  on conflict (user_id) do update
    set status = excluded.status,
        decided_at = excluded.decided_at,
        decided_by = excluded.decided_by,
        note = excluded.note;

  perform public.admin_log('membership.' || p_status, p_user,
    jsonb_build_object('from', previous, 'note', p_note));
end;
$$;

create or replace function public.admin_record_payment(
  p_user uuid,
  p_amount numeric,
  p_currency text,
  p_method text default 'bank_transfer',
  p_reference text default null,
  p_note text default null,
  p_paid_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  new_id uuid;
begin
  perform public.assert_admin();
  insert into public.payments (user_id, amount, currency, method, reference, note, paid_at, recorded_by)
  values (p_user, p_amount, upper(btrim(p_currency)), coalesce(nullif(btrim(p_method), ''), 'bank_transfer'),
          nullif(btrim(coalesce(p_reference, '')), ''), nullif(btrim(coalesce(p_note, '')), ''),
          coalesce(p_paid_at, now()), (select auth.uid()))
  returning id into new_id;

  perform public.admin_log('payment.record', p_user,
    jsonb_build_object('payment', new_id, 'amount', p_amount, 'currency', upper(btrim(p_currency)),
                       'method', p_method, 'reference', p_reference));
  return new_id;
end;
$$;

create or replace function public.admin_delete_payment(p_payment uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  removed public.payments;
begin
  perform public.assert_admin();
  delete from public.payments where id = p_payment returning * into removed;
  if removed.id is null then
    raise exception 'no such payment' using errcode = '22023';
  end if;
  perform public.admin_log('payment.delete', removed.user_id, to_jsonb(removed));
end;
$$;

create or replace function public.admin_update_setting(p_key text, p_value jsonb)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  previous jsonb;
begin
  perform public.assert_admin();
  select value into previous from public.site_settings where key = p_key;
  if previous is null then
    raise exception 'unknown setting' using errcode = '22023';
  end if;
  update public.site_settings
     set value = p_value, updated_at = now(), updated_by = (select auth.uid())
   where key = p_key;
  perform public.admin_log('setting.' || p_key, null, jsonb_build_object('from', previous, 'to', p_value));
end;
$$;

create or replace function public.admin_audit_log(p_limit int default 200)
returns table (at timestamptz, admin text, action text, target_email text, details jsonb)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  perform public.assert_admin();
  return query
  select l.at, a.username, l.action, u.email::text, l.details
  from public.admin_audit l
  left join public.admins a on a.user_id = l.admin_id
  left join auth.users u on u.id = l.target_user
  order by l.at desc
  limit least(greatest(coalesce(p_limit, 200), 1), 1000);
end;
$$;

create or replace function public.admin_update_instrument(p_id uuid, p_fields jsonb)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  previous public.instruments;
begin
  perform public.assert_admin();
  select * into previous from public.instruments where id = p_id and user_id is null;
  if previous.id is null then
    raise exception 'no such catalogue instrument' using errcode = '22023';
  end if;
  update public.instruments set
    display_name    = coalesce(p_fields->>'display_name', display_name),
    contract_size   = coalesce((p_fields->>'contract_size')::numeric, contract_size),
    point_size      = coalesce((p_fields->>'point_size')::numeric, point_size),
    min_lot         = coalesce((p_fields->>'min_lot')::numeric, min_lot),
    lot_step        = coalesce((p_fields->>'lot_step')::numeric, lot_step),
    price_precision = coalesce((p_fields->>'price_precision')::smallint, price_precision),
    trading_hours   = coalesce(p_fields->>'trading_hours', trading_hours)
  where id = p_id;
  perform public.admin_log('instrument.update', null,
    jsonb_build_object('symbol', previous.symbol, 'changes', p_fields));
end;
$$;

-- ================================================================== grants
-- Supabase grants EXECUTE on new public functions to anon by default. Take it
-- back everywhere, then give each function only to the role that needs it.

revoke execute on function
  public.is_admin(), public.has_pro(), public.request_pro(text),
  public.admin_login_email(text, text), public.assert_admin(),
  public.admin_log(text, uuid, jsonb), public.admin_overview(), public.admin_users(text),
  public.admin_user_detail(uuid), public.admin_requests(),
  public.admin_set_membership(uuid, text, text),
  public.admin_record_payment(uuid, numeric, text, text, text, text, timestamptz),
  public.admin_delete_payment(uuid), public.admin_update_setting(text, jsonb),
  public.admin_audit_log(int), public.admin_update_instrument(uuid, jsonb)
from public, anon, authenticated;

-- Before sign-in: only the username check.
grant execute on function public.admin_login_email(text, text) to anon, authenticated;

-- Signed in: the student functions, and the admin functions, which refuse
-- anyone who is not an admin.
grant execute on function
  public.is_admin(), public.has_pro(), public.request_pro(text),
  public.admin_overview(), public.admin_users(text), public.admin_user_detail(uuid),
  public.admin_requests(), public.admin_set_membership(uuid, text, text),
  public.admin_record_payment(uuid, numeric, text, text, text, text, timestamptz),
  public.admin_delete_payment(uuid), public.admin_update_setting(text, jsonb),
  public.admin_audit_log(int), public.admin_update_instrument(uuid, jsonb)
to authenticated;
-- assert_admin() and admin_log() are internal: callable only from the functions above.
