import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from './supabase';

/** One sitting of a paper, as the database keeps it. */
export interface Attempt {
  at: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
}

export interface PartScore {
  id: string;
  correct: number;
  total: number;
  score: number;
  met: boolean;
}

export interface LatestAttempt extends Attempt {
  answers: Record<string, string[]>;
  parts: PartScore[] | null;
}

export interface QuizState {
  attempts: Attempt[];
  best: number;
  latest: LatestAttempt | null;
}

export interface UserState {
  completed: string[];
  quizzes: Record<string, QuizState>;
}

export interface Mark {
  id: string;
  part: string | null;
  chosen: string[];
  answer: string[];
  correct: boolean;
}

export interface Marked {
  attempt: Attempt;
  marks: Mark[];
  parts: PartScore[] | null;
  passMark: number;
}

/** Progress kept by earlier, signed-out visits, carried over on first sign-in. */
const LOCAL_COMPLETED = 'cfd-course:completed';

function readLocal(): string[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_COMPLETED);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function clearLocal(): void {
  try {
    window.localStorage.removeItem(LOCAL_COMPLETED);
  } catch {
    /* storage unavailable: nothing to carry over */
  }
}

export interface Store {
  ready: boolean;
  completed: Set<string>;
  quizzes: Record<string, QuizState>;
  /** Set when a write did not reach the database, so the UI can say so. */
  failed: boolean;
  toggle: (pageId: string) => void;
  submit: (quizId: string, answers: Record<string, string[]>) => Promise<Marked>;
  reload: () => Promise<void>;
}

/**
 * The reader's state, held in Postgres and scoped to their account by row level
 * security. Page completion is written optimistically — a tick that waits on a
 * round trip feels broken — while a quiz submission waits, because the database
 * is marking it.
 */
export function useStore(signedIn: boolean): Store {
  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [quizzes, setQuizzes] = useState<Record<string, QuizState>>({});
  const [failed, setFailed] = useState(false);
  const merged = useRef(false);

  const apply = useCallback((state: UserState) => {
    setCompleted(new Set(state.completed ?? []));
    setQuizzes(state.quizzes ?? {});
  }, []);

  const reload = useCallback(async () => {
    const { data, error } = await supabase.rpc('user_state');
    if (error) throw error;
    apply(data as UserState);
  }, [apply]);

  useEffect(() => {
    if (!signedIn) {
      setReady(false);
      setCompleted(new Set());
      setQuizzes({});
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const local = merged.current ? [] : readLocal();
        if (local.length) {
          const { error } = await supabase.rpc('merge_progress', { p_pages: local });
          if (error) throw error;
          merged.current = true;
          clearLocal();
        }
        if (cancelled) return;
        await reload();
        if (!cancelled) setFailed(false);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signedIn, reload]);

  const toggle = useCallback(
    (pageId: string) => {
      const done = !completed.has(pageId);
      setCompleted((prev) => {
        const next = new Set(prev);
        if (done) next.add(pageId);
        else next.delete(pageId);
        return next;
      });
      supabase
        .rpc('set_progress', { p_page_id: pageId, p_done: done })
        .then(({ error }) => setFailed(Boolean(error)));
    },
    [completed]
  );

  const submit = useCallback(
    async (quizId: string, answers: Record<string, string[]>) => {
      const { data, error } = await supabase.rpc('submit_attempt', {
        p_quiz_id: quizId,
        p_answers: answers,
      });
      if (error) throw error;
      const marked = data as Marked;
      // The attempt history and best score are recomputed by the database, so
      // the cheapest correct thing is to read them back.
      await reload();
      return marked;
    },
    [reload]
  );

  return { ready, completed, quizzes, failed, toggle, submit, reload };
}

/** The answer key for one quiz. The database returns it only once it is sat. */
export async function fetchAnswers(quizId: string): Promise<{
  unlocked: boolean;
  answers: Array<{ id: string; part: string | null; correct: string[] }> | null;
}> {
  const { data, error } = await supabase.rpc('quiz_answers', { p_quiz_id: quizId });
  if (error) throw error;
  return data as { unlocked: boolean; answers: Array<{ id: string; part: string | null; correct: string[] }> | null };
}
