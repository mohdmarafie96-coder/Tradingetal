import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { loadPaper, loadWhy, type Paper, type Question, type Why } from '../content/quiz';
import { useStrings, type Lang } from '../lib/i18n';
import { fetchAnswers, type Mark, type Marked, type QuizState } from '../lib/store';

interface Props {
  lang: Lang;
  quizId: string;
  state: QuizState | undefined;
  onSubmit: (quizId: string, answers: Record<string, string[]>) => Promise<Marked>;
}

type Phase = 'loading' | 'error' | 'summary' | 'answering' | 'review';

/** Option letters, matching the printed papers in each edition. */
const LETTERS: Record<Lang, string[]> = {
  en: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  ar: ['أ', 'ب', 'ج', 'د', 'هـ', 'و', 'ز', 'ح'],
};

const PART_LETTER: Record<string, string> = { A: 'أ', B: 'ب', C: 'ج', D: 'د', E: 'هـ' };

function pct(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function numberFor(q: Question, index: number, lang: Lang): string {
  if (!q.part) return String(index + 1);
  return lang === 'ar' ? `${PART_LETTER[q.part] ?? q.part}${q.id.slice(1)}` : q.id;
}

function Quiz({ lang, quizId, state, onSubmit }: Props) {
  const { t, fmt } = useStrings(lang);
  const [paper, setPaper] = useState<Paper | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [marks, setMarks] = useState<Mark[] | null>(null);
  // Explanations are a separate chunk, fetched only once a paper is marked.
  const [why, setWhy] = useState<Why>({});
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const attempts = state?.attempts ?? [];
  const latest = state?.latest ?? null;

  useEffect(() => {
    let cancelled = false;
    setPhase('loading');
    setMarks(null);
    setWhy({});
    setAnswers({});
    loadPaper(quizId).then(
      (loaded) => {
        if (cancelled) return;
        setPaper(loaded);
        setPhase(attempts.length > 0 ? 'summary' : 'answering');
      },
      () => {
        if (!cancelled) setPhase('error');
      }
    );
    return () => {
      cancelled = true;
    };
    // The summary is the entry point only when arriving at the page; submitting
    // moves the phase on without reloading the paper.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const choose = useCallback((q: Question, optionId: string) => {
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      if (q.type === 'single') return { ...prev, [q.id]: [optionId] };
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [q.id]: next };
    });
  }, []);

  const unanswered = useMemo(() => {
    if (!paper) return 0;
    return paper.questions.filter((q) => (answers[q.id]?.length ?? 0) === 0).length;
  }, [paper, answers]);

  const send = useCallback(async () => {
    if (!paper) return;
    setBusy(true);
    setSaveError(false);
    try {
      const [marked, prose] = await Promise.all([onSubmit(quizId, answers), loadWhy(quizId)]);
      setWhy(prose);
      setMarks(marked.marks);
      setPhase('review');
      window.scrollTo(0, 0);
    } catch {
      setSaveError(true);
    } finally {
      setBusy(false);
    }
  }, [answers, onSubmit, paper, quizId]);

  // Reviewing an earlier attempt: the answers were kept, the key is fetched.
  const review = useCallback(async () => {
    setBusy(true);
    setSaveError(false);
    try {
      const [key, prose] = await Promise.all([fetchAnswers(quizId), loadWhy(quizId)]);
      if (!key.unlocked || !key.answers || !latest) {
        setSaveError(true);
        return;
      }
      setWhy(prose);
      const given = latest.answers ?? {};
      setMarks(
        key.answers.map((a) => {
          const chosen = given[a.id] ?? [];
          const same =
            chosen.length === a.correct.length && chosen.every((c) => a.correct.includes(c));
          return { id: a.id, part: a.part, chosen, answer: a.correct, correct: same };
        })
      );
      setAnswers(given);
      setPhase('review');
      window.scrollTo(0, 0);
    } catch {
      setSaveError(true);
    } finally {
      setBusy(false);
    }
  }, [latest, quizId]);

  const retake = useCallback(() => {
    setAnswers({});
    setMarks(null);
    setSaveError(false);
    setPhase('answering');
    window.scrollTo(0, 0);
  }, []);

  if (phase === 'loading') return <p className="quiz-note">{t.quizLoading}</p>;
  if (phase === 'error' || !paper) {
    return (
      <p className="quiz-note" role="alert">
        {t.quizLoadFailed}
      </p>
    );
  }

  const letters = LETTERS[lang];
  const partTitle = (id: string) => paper.parts?.find((p) => p.id === id)?.title[lang] ?? id;

  const scoreCard = (attempt: { score: number; correct: number; total: number; passed: boolean }) => (
    <div className={`quiz-score${attempt.passed ? ' is-pass' : ''}`}>
      <div className="quiz-score-main">
        <div className="quiz-score-num num">{pct(attempt.score)}</div>
        <div className="quiz-score-side">
          <div className="quiz-score-verdict">{attempt.passed ? t.quizPassed : t.quizNotPassed}</div>
          <div className="quiz-score-detail">
            <span className="num">{attempt.correct}</span> / <span className="num">{attempt.total}</span>
            {' · '}
            {t.quizPassMark} <span className="num">{pct(paper.passMark)}</span>
          </div>
        </div>
      </div>
      {attempts.length > 1 && (
        <div className="quiz-score-history">
          {t.quizAttempts} <span className="num">{attempts.length}</span>
          {' · '}
          {t.quizBest} <span className="num">{pct(state?.best ?? attempt.score)}</span>
        </div>
      )}
    </div>
  );

  const partTable = (parts: { id: string; correct: number; total: number; score: number; met: boolean }[]) => (
    <div className="quiz-parts">
      <div className="quiz-parts-head">{t.quizPartTable}</div>
      <table>
        <tbody>
          {parts.map((p) => {
            const floor = paper.parts?.find((x) => x.id === p.id)?.minScore ?? null;
            return (
              <tr key={p.id} className={p.met ? undefined : 'is-short'}>
                <td>{partTitle(p.id)}</td>
                <td>
                  <span className="num">{p.correct}</span>/<span className="num">{p.total}</span>
                </td>
                <td>
                  <span className="num">{pct(p.score)}</span>
                </td>
                <td>{floor !== null ? fmt(t.quizPartFloor, Math.round(floor * 100)) : ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  if (phase === 'summary' && latest) {
    return (
      <div className="quiz">
        {scoreCard(latest)}
        {latest.parts && partTable(latest.parts)}
        <p className="quiz-note">{t.quizAttemptsNote}</p>
        {saveError && (
          <p className="quiz-error" role="alert">
            {t.quizSaveFailed}
          </p>
        )}
        <div className="quiz-actions">
          <button className="btn btn-primary" onClick={review} disabled={busy}>
            {t.quizShowPaper}
          </button>
          <button className="btn" onClick={retake} disabled={busy}>
            <RotateCcw size={15} />
            {t.quizRetake}
          </button>
        </div>
      </div>
    );
  }

  const reviewing = phase === 'review' && marks !== null;
  const marksById = new Map((marks ?? []).map((m) => [m.id, m]));

  let currentPart: string | null = null;

  return (
    <div className="quiz">
      {reviewing ? (
        <>
          {latest && scoreCard(latest)}
          {latest?.parts && partTable(latest.parts)}
          {latest?.parts?.some((p) => !p.met) && (
            <p className="quiz-note quiz-note-warn">{t.quizPartFloorMissed}</p>
          )}
          <h2 className="quiz-heading">{t.quizReview}</h2>
        </>
      ) : (
        <p className="quiz-rubric">
          {t.quizClosedBook}
          {paper.calculator ? ` ${t.quizCalculatorNote}` : ''}{' '}
          <span className="num">{paper.questions.length}</span> {t.quizQuestions} · {t.quizPassMark}{' '}
          <span className="num">{pct(paper.passMark)}</span>
        </p>
      )}

      <ol className="quiz-list">
        {paper.questions.map((q, index) => {
          const mark = marksById.get(q.id);
          const chosen = new Set(answers[q.id] ?? []);
          const header =
            q.part && q.part !== currentPart ? ((currentPart = q.part), partTitle(q.part)) : null;

          return (
            <li key={q.id} className="quiz-q">
              {header && <h3 className="quiz-part-head">{header}</h3>}

              <div className="quiz-prompt">
                <span className="quiz-num num">{numberFor(q, index, lang)}</span>
                <span>{q.prompt[lang]}</span>
              </div>

              <div className="quiz-kind">
                {q.type === 'multi' ? t.quizSelectAll : t.quizSelectOne}
                {mark && (
                  <span className={`quiz-verdict${mark.correct ? ' is-right' : ' is-wrong'}`}>
                    {mark.correct ? <Check size={13} /> : <X size={13} />}
                    {mark.correct ? t.quizCorrectLabel : t.quizIncorrectLabel}
                  </span>
                )}
              </div>

              <div className="quiz-options" role={q.type === 'single' ? 'radiogroup' : 'group'}>
                {q.options.map((o, i) => {
                  const picked = chosen.has(o.id);
                  const isAnswer = mark?.answer.includes(o.id) ?? false;
                  const classes = ['quiz-option'];
                  if (picked) classes.push('is-picked');
                  if (mark) {
                    if (isAnswer) classes.push('is-answer');
                    else if (picked) classes.push('is-wrong');
                  }
                  return (
                    <label key={o.id} className={classes.join(' ')}>
                      <input
                        type={q.type === 'single' ? 'radio' : 'checkbox'}
                        name={`${quizId}-${q.id}`}
                        checked={picked}
                        disabled={Boolean(mark)}
                        onChange={() => choose(q, o.id)}
                      />
                      <span className="quiz-letter">{letters[i]}</span>
                      <span className="quiz-option-text">{o.text[lang]}</span>
                    </label>
                  );
                })}
              </div>

              {mark && (
                <div className="quiz-explain">
                  <div className="quiz-explain-head">{t.quizWhy}</div>
                  <p>{why[q.id]?.[lang] ?? ''}</p>
                  {mark.chosen.length === 0 && <p className="quiz-explain-note">{t.quizNoAnswer}</p>}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {saveError && (
        <p className="quiz-error" role="alert">
          {t.quizSaveFailed}
        </p>
      )}

      {reviewing ? (
        <div className="quiz-actions">
          <button className="btn btn-primary" onClick={retake}>
            <RotateCcw size={15} />
            {t.quizRetake}
          </button>
        </div>
      ) : (
        <div className="quiz-actions">
          <button className="btn btn-primary" onClick={send} disabled={busy || unanswered > 0}>
            {busy ? t.quizSubmitting : t.quizSubmit}
          </button>
          {unanswered > 0 && (
            <span className="quiz-remaining">{fmt(t.quizUnanswered, unanswered)}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
