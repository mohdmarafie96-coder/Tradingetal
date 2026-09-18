#!/usr/bin/env node
// Compiles the marking key for the backend.
//
// Which options are correct is the one thing the browser is never sent. The
// backend marks a submission and reports what was right, so the score is not
// something the page can decide for itself, and the answer key is released one
// module at a time — only once that module's paper has been submitted.
//
// The explanatory prose is not here. It is shipped with the app in a deferred
// chunk that is only loaded once a paper has been marked (see
// web/scripts/generate-content.mjs), which keeps this file small enough to
// deploy inline.
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

/** Which options are correct, by quiz id. */
export const QUIZ_KEY: Record<string, KeyQuiz> = {
${Object.entries(key)
  .map(
    ([id, quiz]) =>
      `  ${JSON.stringify(id)}: {\n` +
      `    passMark: ${quiz.passMark},\n` +
      `    parts: ${JSON.stringify(quiz.parts)},\n` +
      `    questions: [\n` +
      quiz.questions.map((q) => `      ${JSON.stringify(q)},`).join('\n') +
      `\n    ],\n  },`
  )
  .join('\n')}
};

/** Course page id to quiz id, so a route can be marked without a second table. */
export const PAGE_TO_QUIZ: Record<string, string> = ${JSON.stringify(pageToQuiz, null, 2)};
`;

writeFileSync(OUT, src);
const n = banks.reduce((a, b) => a + b.questions.length, 0);
console.log(`quiz key: ${banks.length} quizzes, ${n} questions -> web/backend/quiz-key.ts`);
