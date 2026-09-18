#!/usr/bin/env node
// Splits the question bank in two.
//
// The browser is sent prompts and options only; the correct answers and the
// explanations are compiled into the backend, which marks a submission and
// returns the key with the result. That is what makes the closed-book rule and
// the per-module answer-key unlock real rather than cosmetic — the answers are
// not in the bundle for a reader to open the console and read.
//
// This file is committed because the backend is deployed from the source
// snapshot, not built from the repository. Run it after editing quiz/*.json:
//   node scripts/build-quiz-key.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'web/backend/quiz-key.ts');

const banks = readdirSync(join(ROOT, 'quiz'))
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => JSON.parse(readFileSync(join(ROOT, 'quiz', f), 'utf8')));

const key = {};
const pageToQuiz = {};

for (const bank of banks) {
  key[bank.id] = {
    passMark: bank.passMark,
    parts: bank.parts
      ? bank.parts.map((p) => ({ id: p.id, weight: p.weight, minScore: p.minScore ?? null }))
      : null,
    questions: bank.questions.map((q) => ({
      id: q.id,
      part: q.part ?? null,
      type: q.type,
      correct: q.correct,
      explanation: q.explanation,
    })),
  };
  pageToQuiz[
    bank.kind === 'assessment' ? 'm11/02-assessment' : `${bank.id}/quiz`
  ] = bank.id;
}

const src = `// Generated from quiz/*.json by scripts/build-quiz-key.mjs. Do not edit by hand.

export interface KeyQuestion {
  id: string;
  part: string | null;
  type: 'single' | 'multi';
  correct: string[];
  explanation: { en: string; ar: string };
}

export interface KeyPart {
  id: string;
  weight: number;
  /** A floor this part must clear on its own, or null when it has none. */
  minScore: number | null;
}

export interface KeyQuiz {
  passMark: number;
  parts: KeyPart[] | null;
  questions: KeyQuestion[];
}

/** Answers and explanations, by quiz id. */
export const QUIZ_KEY: Record<string, KeyQuiz> = ${JSON.stringify(key, null, 2)};

/** Course page id to quiz id, so a route can be marked without a second table. */
export const PAGE_TO_QUIZ: Record<string, string> = ${JSON.stringify(pageToQuiz, null, 2)};

/** Quiz id to the module whose answer key it unlocks. */
export function quizIds(): string[] {
  return Object.keys(QUIZ_KEY);
}
`;

writeFileSync(OUT, src);
const n = banks.reduce((a, b) => a + b.questions.length, 0);
console.log(`quiz key: ${banks.length} quizzes, ${n} questions -> web/backend/quiz-key.ts`);
