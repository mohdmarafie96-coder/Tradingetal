-- Reading progress -----------------------------------------------------------

create or replace function public.set_progress(p_page_id text, p_done boolean)
returns text[]
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();
  v_completed text[];
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;
  if p_page_id is null or length(p_page_id) = 0 or length(p_page_id) > 120 then
    raise exception 'a page id is required' using errcode = '22023';
  end if;

  insert into public.progress (user_id, completed)
  values (v_user, case when p_done then array[p_page_id] else '{}' end)
  on conflict (user_id) do update
    set completed = case
          when p_done then (
            select array_agg(distinct page order by page)
            from unnest(public.progress.completed || array[p_page_id]) as page
          )
          else array_remove(public.progress.completed, p_page_id)
        end,
        updated_at = now()
  returning completed into v_completed;

  return v_completed;
end;
$$;

-- Whatever a signed-out visit had already ticked, carried over on first sign-in.
create or replace function public.merge_progress(p_pages text[])
returns text[]
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();
  v_completed text[];
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  insert into public.progress (user_id, completed)
  values (v_user, coalesce(p_pages, '{}'))
  on conflict (user_id) do update
    set completed = (
          select coalesce(array_agg(distinct page order by page), '{}')
          from unnest(public.progress.completed || coalesce(p_pages, '{}')) as page
        ),
        updated_at = now()
  returning completed into v_completed;

  return v_completed;
end;
$$;

-- Marking --------------------------------------------------------------------

-- Marks a submitted paper, records the attempt and returns the marked paper.
-- Security definer, because public.quiz_key is readable by nothing else.
create or replace function public.submit_attempt(p_quiz_id text, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();
  v_pass_mark double precision;
  v_parts jsonb;
  v_marks jsonb;
  v_correct int;
  v_total int;
  v_score double precision;
  v_part_scores jsonb;
  v_passed boolean;
  v_answers jsonb;
  v_created timestamptz;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select pass_mark, parts into v_pass_mark, v_parts
  from public.quiz_meta where quiz_id = p_quiz_id;
  if not found then
    raise exception 'no such quiz' using errcode = '22023';
  end if;

  if p_answers is null or jsonb_typeof(p_answers) <> 'object' then
    raise exception 'answers are required' using errcode = '22023';
  end if;

  -- Mark each question. An answer counts only as an exact set match, so a
  -- select-all question is not half right for a subset.
  with marked as (
    select
      k.question_id,
      k.part,
      k.position,
      k.correct,
      coalesce((
        select array_agg(distinct a.v order by a.v)
        from jsonb_array_elements_text(
          case
            when jsonb_typeof(p_answers -> k.question_id) = 'array'
            then p_answers -> k.question_id
            else '[]'::jsonb
          end
        ) as a(v)
      ), '{}'::text[]) as chosen
    from public.quiz_key k
    where k.quiz_id = p_quiz_id
  ),
  scored as (
    select
      question_id, part, position, correct, chosen,
      (cardinality(chosen) > 0 and chosen = correct) as is_correct
    from marked
  )
  select
    jsonb_agg(
      jsonb_build_object(
        'id', question_id,
        'part', part,
        'chosen', to_jsonb(chosen),
        'answer', to_jsonb(correct),
        'correct', is_correct
      ) order by position
    ),
    count(*) filter (where is_correct),
    count(*),
    jsonb_object_agg(question_id, to_jsonb(chosen))
  into v_marks, v_correct, v_total, v_answers
  from scored;

  if v_total = 0 then
    raise exception 'no such quiz' using errcode = '22023';
  end if;

  v_score := v_correct::double precision / v_total;

  -- A part with a floor of its own fails the whole paper when it is missed,
  -- whatever the total.
  if v_parts is not null then
    select jsonb_agg(
      jsonb_build_object(
        'id', p ->> 'id',
        'correct', s.got,
        'total', s.n,
        'score', case when s.n = 0 then 0 else s.got::double precision / s.n end,
        'met', case
                 when p -> 'min_score' is null or jsonb_typeof(p -> 'min_score') = 'null' then true
                 when s.n = 0 then false
                 else s.got::double precision / s.n >= (p ->> 'min_score')::double precision
               end
      ) order by p ->> 'id'
    )
    into v_part_scores
    from jsonb_array_elements(v_parts) as p
    cross join lateral (
      select
        count(*) filter (where (m ->> 'correct')::boolean) as got,
        count(*) as n
      from jsonb_array_elements(v_marks) as m
      where m ->> 'part' = p ->> 'id'
    ) as s;
  end if;

  v_passed := v_score >= v_pass_mark
    and (
      v_part_scores is null
      or not exists (
        select 1 from jsonb_array_elements(v_part_scores) as ps
        where (ps ->> 'met')::boolean is not true
      )
    );

  insert into public.attempts (user_id, quiz_id, score, correct, total, passed, parts, answers)
  values (v_user, p_quiz_id, v_score, v_correct, v_total, v_passed, v_part_scores, v_answers)
  returning created_at into v_created;

  return jsonb_build_object(
    'attempt', jsonb_build_object(
      'at', v_created,
      'score', v_score,
      'correct', v_correct,
      'total', v_total,
      'passed', v_passed
    ),
    'marks', v_marks,
    'parts', v_part_scores,
    'passMark', v_pass_mark
  );
end;
$$;

-- The answer key for one quiz, released only once that quiz has been sat.
create or replace function public.quiz_answers(p_quiz_id text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();
  v_sat boolean;
  v_answers jsonb;
  v_pass_mark double precision;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select pass_mark into v_pass_mark from public.quiz_meta where quiz_id = p_quiz_id;
  if not found then
    raise exception 'no such quiz' using errcode = '22023';
  end if;

  select exists (
    select 1 from public.attempts
    where user_id = v_user and quiz_id = p_quiz_id
  ) into v_sat;

  if not v_sat then
    return jsonb_build_object('quizId', p_quiz_id, 'unlocked', false, 'answers', null);
  end if;

  select jsonb_agg(
    jsonb_build_object('id', question_id, 'part', part, 'correct', to_jsonb(correct))
    order by position
  )
  into v_answers
  from public.quiz_key
  where quiz_id = p_quiz_id;

  return jsonb_build_object(
    'quizId', p_quiz_id,
    'unlocked', true,
    'passMark', v_pass_mark,
    'answers', v_answers
  );
end;
$$;

-- Everything the app needs on load: pages read, and every quiz's history.
create or replace function public.user_state()
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  return jsonb_build_object(
    'completed', to_jsonb(coalesce(
      (select completed from public.progress where user_id = v_user), '{}'::text[]
    )),
    'quizzes', coalesce((
      select jsonb_object_agg(q.quiz_id, q.state)
      from (
        select
          a.quiz_id,
          jsonb_build_object(
            'attempts', (
              select jsonb_agg(
                jsonb_build_object(
                  'at', h.created_at, 'score', h.score, 'correct', h.correct,
                  'total', h.total, 'passed', h.passed
                ) order by h.created_at
              )
              from public.attempts h
              where h.user_id = v_user and h.quiz_id = a.quiz_id
            ),
            'best', max(a.score),
            'latest', (
              select jsonb_build_object(
                'at', l.created_at, 'score', l.score, 'correct', l.correct,
                'total', l.total, 'passed', l.passed,
                'answers', l.answers, 'parts', l.parts
              )
              from public.attempts l
              where l.user_id = v_user and l.quiz_id = a.quiz_id
              order by l.created_at desc
              limit 1
            )
          ) as state
        from public.attempts a
        where a.user_id = v_user
        group by a.quiz_id
      ) q
    ), '{}'::jsonb)
  );
end;
$$;

revoke all on function public.submit_attempt(text, jsonb) from public, anon;
revoke all on function public.quiz_answers(text) from public, anon;
grant execute on function public.set_progress(text, boolean) to authenticated;
grant execute on function public.merge_progress(text[]) to authenticated;
grant execute on function public.submit_attempt(text, jsonb) to authenticated;
grant execute on function public.quiz_answers(text) to authenticated;
grant execute on function public.user_state() to authenticated;
