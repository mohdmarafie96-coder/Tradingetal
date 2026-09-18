-- Trading et al. — saved progress and closed-book marking.
--
-- The answer key lives in a table with row level security on and no policy
-- granting anyone a read, so no client can select from it. Marking happens in
-- a security definer function, which is the only thing that can see it. That
-- is what makes the closed-book rule and the per-module answer unlock real:
-- the answers are not in the bundle, and they are not fetchable by an API call
-- either.

-- Pages the reader has marked as read. One row per user.
create table public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  completed text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

create policy progress_select_own on public.progress
  for select using (auth.uid() = user_id);
create policy progress_insert_own on public.progress
  for insert with check (auth.uid() = user_id);
create policy progress_update_own on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Per-quiz rules: the pass mark, and for the final assessment the parts and
-- the floor a part has to clear on its own.
create table public.quiz_meta (
  quiz_id text primary key,
  pass_mark double precision not null,
  parts jsonb
);

alter table public.quiz_meta enable row level security;
-- No policy: readable only by the security definer functions below.

-- Which options are correct. `correct` is stored sorted so a marked answer can
-- be compared with plain array equality.
create table public.quiz_key (
  quiz_id text not null references public.quiz_meta (quiz_id) on delete cascade,
  question_id text not null,
  position int not null,
  part text,
  qtype text not null check (qtype in ('single', 'multi')),
  correct text[] not null,
  primary key (quiz_id, question_id)
);

alter table public.quiz_key enable row level security;
-- No policy, deliberately. This table is the one thing a reader must not read.

-- Every sitting of a paper. Written only by submit_attempt(), never directly:
-- a reader who could insert here could award themselves a pass.
create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  quiz_id text not null references public.quiz_meta (quiz_id) on delete cascade,
  score double precision not null,
  correct int not null,
  total int not null,
  passed boolean not null,
  parts jsonb,
  answers jsonb not null,
  created_at timestamptz not null default now()
);

create index attempts_user_quiz_idx on public.attempts (user_id, quiz_id, created_at);

alter table public.attempts enable row level security;

create policy attempts_select_own on public.attempts
  for select using (auth.uid() = user_id);
-- No insert, update or delete policy: only submit_attempt() writes here.

revoke insert, update, delete on public.attempts from anon, authenticated;
revoke all on public.quiz_key from anon, authenticated;
revoke all on public.quiz_meta from anon, authenticated;
