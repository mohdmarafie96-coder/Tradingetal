/**
 * Course backend: saved progress and closed-book marking.
 *
 * Two things live here rather than in the browser. Progress is per user, so it
 * follows the reader between devices instead of sitting in one browser's local
 * storage. And marking is server-side: which options are correct is in
 * quiz-key.ts and is never shipped to the browser, so a paper has to be
 * submitted before its answers come back — for that quiz only.
 */

import { router, json, error, requireAuth, db } from '@appdeploy/sdk';
import { QUIZ_KEY, PAGE_TO_QUIZ, type KeyQuiz } from './quiz-key';

/** One attempt, as kept in the history. Answers are held for the latest only. */
interface Attempt {
  at: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
}

interface LatestAttempt extends Attempt {
  answers: Record<string, string[]>;
  parts: PartScore[] | null;
}

interface PartScore {
  id: string;
  correct: number;
  total: number;
  score: number;
  /** False when the part has its own floor and this attempt is under it. */
  met: boolean;
}

interface QuizState {
  attempts: Attempt[];
  best: number;
  latest: LatestAttempt | null;
}

interface UserState {
  completed: string[];
  quizzes: Record<string, QuizState>;
  updatedAt: string;
}

/** Every attempt is kept, up to this many, newest last. */
const HISTORY_LIMIT = 25;

const EMPTY: UserState = { completed: [], quizzes: {}, updatedAt: '' };

/**
 * One record per user, in a table of its own. Reads stay a single bounded call
 * however many readers the course has, because the table name carries the user.
 */
function tableFor(userId: string): string {
  return `state:${userId}`;
}

async function loadState(userId: string): Promise<{ id: string | null; state: UserState }> {
  const { items } = await db.list<UserState>(tableFor(userId), { limit: 1 });
  if (items.length === 0) return { id: null, state: { ...EMPTY, quizzes: {} } };
  const row = items[0];
  return {
    id: row.id,
    state: {
      completed: Array.isArray(row.completed) ? row.completed : [],
      quizzes: row.quizzes && typeof row.quizzes === 'object' ? row.quizzes : {},
      updatedAt: typeof row.updatedAt === 'string' ? row.updatedAt : '',
    },
  };
}

async function saveState(userId: string, id: string | null, state: UserState): Promise<void> {
  const record = { ...state, updatedAt: new Date().toISOString() };
  if (id) {
    const [ok] = await db.update(tableFor(userId), [{ id, record }]);
    if (!ok) throw new Error('Could not save progress');
    return;
  }
  const [created] = await db.add(tableFor(userId), [record]);
  if (!created) throw new Error('Could not save progress');
}

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every((v) => set.has(v));
}

function markPaper(key: KeyQuiz, answers: Record<string, string[]>) {
  const marks = key.questions.map((q) => {
    const chosen = Array.isArray(answers[q.id]) ? answers[q.id].filter((v) => typeof v === 'string') : [];
    return {
      id: q.id,
      part: q.part,
      chosen,
      answer: q.correct,
      correct: chosen.length > 0 && sameSet(chosen, q.correct),
    };
  });

  const correct = marks.filter((m) => m.correct).length;
  const total = marks.length;
  const score = total === 0 ? 0 : correct / total;

  let parts: PartScore[] | null = null;
  if (key.parts) {
    parts = key.parts.map((p) => {
      const inPart = marks.filter((m) => m.part === p.id);
      const got = inPart.filter((m) => m.correct).length;
      const partScore = inPart.length === 0 ? 0 : got / inPart.length;
      return {
        id: p.id,
        correct: got,
        total: inPart.length,
        score: partScore,
        met: p.minScore === null ? true : partScore >= p.minScore,
      };
    });
  }

  const passed = score >= key.passMark && (parts === null || parts.every((p) => p.met));
  return { marks, correct, total, score, parts, passed };
}

export const handler = router({
  'GET /api/state': [
    requireAuth(),
    async (ctx) => {
      const { state } = await loadState(ctx.user!.userId);
      return json(state);
    },
  ],

  // Marking a page read or unread. The page id is opaque to the backend; the
  // course manifest is the frontend's business.
  'PUT /api/progress': [
    requireAuth(),
    async (ctx) => {
      const body = ctx.body as { pageId?: unknown; done?: unknown };
      if (typeof body?.pageId !== 'string' || !body.pageId || body.pageId.length > 120) {
        return error('A pageId is required', 400);
      }
      const userId = ctx.user!.userId;
      const { id, state } = await loadState(userId);
      const set = new Set(state.completed);
      if (body.done === false) set.delete(body.pageId);
      else set.add(body.pageId);
      if (set.size > 500) return error('Too many completed pages', 400);
      state.completed = [...set];
      await saveState(userId, id, state);
      return json({ completed: state.completed });
    },
  ],

  // First sign-in carries over whatever the reader had already marked in this
  // browser, so switching to an account does not look like lost progress.
  'POST /api/progress/merge': [
    requireAuth(),
    async (ctx) => {
      const body = ctx.body as { completed?: unknown };
      const incoming = Array.isArray(body?.completed)
        ? body.completed.filter((v): v is string => typeof v === 'string' && v.length <= 120)
        : [];
      const userId = ctx.user!.userId;
      const { id, state } = await loadState(userId);
      const set = new Set([...state.completed, ...incoming]);
      if (set.size > 500) return error('Too many completed pages', 400);
      state.completed = [...set];
      await saveState(userId, id, state);
      return json({ completed: state.completed });
    },
  ],

  'POST /api/attempts': [
    requireAuth(),
    async (ctx) => {
      const body = ctx.body as { quizId?: unknown; answers?: unknown };
      const quizId = typeof body?.quizId === 'string' ? body.quizId : '';
      const key = QUIZ_KEY[quizId];
      if (!key) return error('No such quiz', 404);

      const raw = body?.answers;
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return error('Answers are required', 400);
      }
      const answers: Record<string, string[]> = {};
      for (const q of key.questions) {
        const given = (raw as Record<string, unknown>)[q.id];
        if (Array.isArray(given)) {
          answers[q.id] = given.filter((v): v is string => typeof v === 'string').slice(0, 8);
        }
      }

      const result = markPaper(key, answers);
      const userId = ctx.user!.userId;
      const { id, state } = await loadState(userId);

      const attempt: Attempt = {
        at: new Date().toISOString(),
        score: result.score,
        correct: result.correct,
        total: result.total,
        passed: result.passed,
      };

      const previous = state.quizzes[quizId];
      const history = [...(previous?.attempts ?? []), attempt].slice(-HISTORY_LIMIT);
      state.quizzes[quizId] = {
        attempts: history,
        best: Math.max(previous?.best ?? 0, attempt.score),
        latest: { ...attempt, answers, parts: result.parts },
      };

      await saveState(userId, id, state);

      return json({
        attempt,
        marks: result.marks,
        parts: result.parts,
        passMark: key.passMark,
        state: state.quizzes[quizId],
      });
    },
  ],

  // The answer key, one quiz at a time, and only once that quiz has been sat.
  'GET /api/answers/:quizId': [
    requireAuth(),
    async (ctx) => {
      const quizId = ctx.params.quizId;
      const key = QUIZ_KEY[quizId];
      if (!key) return error('No such quiz', 404);

      const { state } = await loadState(ctx.user!.userId);
      const sat = (state.quizzes[quizId]?.attempts.length ?? 0) > 0;
      if (!sat) return json({ quizId, unlocked: false, answers: null });

      return json({
        quizId,
        unlocked: true,
        passMark: key.passMark,
        answers: key.questions.map((q) => ({
          id: q.id,
          part: q.part,
          correct: q.correct,
        })),
      });
    },
  ],

  // Which module answer keys are open, for the reference page's index.
  'GET /api/answers': [
    requireAuth(),
    async (ctx) => {
      const { state } = await loadState(ctx.user!.userId);
      const unlocked = Object.entries(state.quizzes)
        .filter(([, q]) => q.attempts.length > 0)
        .map(([id]) => id);
      return json({ unlocked, pages: PAGE_TO_QUIZ });
    },
  ],
});
