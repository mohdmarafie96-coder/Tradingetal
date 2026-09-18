import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@appdeploy/client';

/** One sitting of a paper, as the backend keeps it. */
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
  explanation: Record<'en' | 'ar', string>;
}

export interface Marked {
  attempt: Attempt;
  marks: Mark[];
  parts: PartScore[] | null;
  passMark: number;
  state: QuizState;
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
  /** Set when a write did not reach the server, so the UI can say so. */
  failed: boolean;
  toggle: (pageId: string) => void;
  submit: (quizId: string, answers: Record<string, string[]>) => Promise<Marked>;
  reload: () => Promise<void>;
}

/**
 * The reader's state, held by the backend and keyed to their account. Page
 * completion is written optimistically — a tick that waits on a round trip
 * feels broken — while quiz submission waits, because it is being marked.
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
    const { data } = await api.get('/api/state');
    apply(data as UserState);
  }, [apply]);

  useEffect(() => {
    if (!signedIn) {
      setReady(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const local = merged.current ? [] : readLocal();
        const { data } = local.length
          ? await api.post('/api/progress/merge', { completed: local })
          : await api.get('/api/state');
        if (cancelled) return;
        if (local.length) {
          merged.current = true;
          clearLocal();
          await reload();
        } else {
          apply(data as UserState);
        }
        setFailed(false);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signedIn, apply, reload]);

  const toggle = useCallback(
    (pageId: string) => {
      const done = !completed.has(pageId);
      setCompleted((prev) => {
        const next = new Set(prev);
        if (done) next.add(pageId);
        else next.delete(pageId);
        return next;
      });
      api.put('/api/progress', { pageId, done }).then(
        () => setFailed(false),
        () => setFailed(true)
      );
    },
    [completed]
  );

  const submit = useCallback(async (quizId: string, answers: Record<string, string[]>) => {
    const { data } = await api.post('/api/attempts', { quizId, answers });
    const marked = data as Marked;
    setQuizzes((prev) => ({ ...prev, [quizId]: marked.state }));
    return marked;
  }, []);

  return { ready, completed, quizzes, failed, toggle, submit, reload };
}
