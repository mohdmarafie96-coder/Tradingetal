-- The site owner's account becomes the first admin, signing in to /admin with
-- this username and their own account password. No password appears here or
-- anywhere in the repository: the check runs against the password the owner
-- set on their Supabase account.
--
-- Further admins are added the same way, by migration, never from the website.

insert into public.admins (user_id, username)
select id, 'mohdmarafie1996'
from auth.users
where lower(email) = 'mohdmarafie96@gmail.com'
on conflict (user_id) do update set username = excluded.username;
