import { useCallback, useEffect, useState } from 'react';
import { ChevronDown, Lock, Unlock } from 'lucide-react';
import { api } from '@appdeploy/client';
import { QUIZZES, loadPaper, loadWhy, type Paper, type Why } from '../content/quiz';
import { hrefFor } from '../lib/router';
import { useStrings, type Lang } from '../lib/i18n';
import type { QuizState } from '../lib/store';

interface Props {
  lang: Lang;
  quizzes: Record<string, QuizState>;
}

interface KeyEntry {
  id: string;
  correct: string[];
}

const LETTERS: Record<Lang, string[]> = {
  en: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  ar: ['أ', 'ب', 'ج', 'د', 'هـ', 'و', 'ز', 'ح'],
};

const PART_LETTER: Record<string, string> = { A: 'أ', B: 'ب', C: 'ج', D: 'د', E: 'هـ' };

/**
 * The answer key, one module at a time. A module opens once its quiz has been
 * submitted, which is the whole point of a closed-book paper: the reasoning is
 * only worth reading after you have committed to an answer.
 */
function AnswerKey({ lang, quizzes }: Props) {
  const { t } = useStrings(lang);
  const [open, setOpen] = useState<string | null>(null);
  const [paper, setPaper] = useState<Paper | null>(null);
  const [key, setKey] = useState<KeyEntry[] | null>(null);
  const [why, setWhy] = useState<Why>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setBusy(true);
    setPaper(null);
    setKey(null);
    Promise.all([loadPaper(open), loadWhy(open), api.get(`/api/answers/${open}`)]).then(
      ([loaded, prose, res]) => {
        if (cancelled) return;
        const body = res.data as { unlocked: boolean; answers: KeyEntry[] | null };
        setPaper(loaded);
        setWhy(prose);
        setKey(body.unlocked ? body.answers : null);
        setBusy(false);
      },
      () => {
        if (!cancelled) setBusy(false);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [open]);

  const toggle = useCallback((id: string) => {
    setOpen((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="keylist">
      <p className="hero-lede">{t.keyIntro}</p>

      {QUIZZES.map((quiz) => {
        const sat = (quizzes[quiz.id]?.attempts.length ?? 0) > 0;
        const isOpen = open === quiz.id;

        return (
          <section key={quiz.id} className={`keycard${sat ? '' : ' is-locked'}`}>
            <div className="keycard-head">
              <span className="keycard-icon">
                {sat ? <Unlock size={15} /> : <Lock size={15} />}
              </span>
              <span className="keycard-title">{quiz.title[lang]}</span>
              {sat ? (
                <button
                  className="btn btn-sm"
                  onClick={() => toggle(quiz.id)}
                  aria-expanded={isOpen}
                >
                  <ChevronDown size={14} className={isOpen ? 'is-open' : undefined} />
                  {isOpen ? t.keyHide : t.keyShow}
                </button>
              ) : (
                <a className="btn btn-sm" href={hrefFor(lang, quiz.pageId)}>
                  {t.keyOpenQuiz}
                </a>
              )}
            </div>

            {!sat && <p className="keycard-note">{t.keyLockedBody}</p>}

            {isOpen && busy && <p className="keycard-note">{t.keyLoading}</p>}

            {isOpen && !busy && paper && key && (
              <ol className="keyanswers">
                {paper.questions.map((q, index) => {
                  const entry = key.find((k) => k.id === q.id);
                  if (!entry) return null;
                  const number = q.part
                    ? lang === 'ar'
                      ? `${PART_LETTER[q.part] ?? q.part}${q.id.slice(1)}`
                      : q.id
                    : String(index + 1);
                  const chosen = entry.correct.map((id) => {
                    const i = q.options.findIndex((o) => o.id === id);
                    return { letter: LETTERS[lang][i] ?? id, text: q.options[i]?.text[lang] ?? '' };
                  });

                  return (
                    <li key={q.id} className="keyanswer">
                      <div className="keyanswer-q">
                        <span className="quiz-num num">{number}</span>
                        <span>{q.prompt[lang]}</span>
                      </div>
                      <div className="keyanswer-a">
                        {chosen.map((c) => (
                          <div key={c.letter}>
                            <span className="quiz-letter">{c.letter}</span>
                            <span>{c.text}</span>
                          </div>
                        ))}
                      </div>
                      <p className="keyanswer-why">{why[q.id]?.[lang] ?? ''}</p>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default AnswerKey;
