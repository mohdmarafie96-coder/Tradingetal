#!/usr/bin/env node
// Emits the marking key as SQL, for the Supabase database behind the course.
//
// Which options are correct is the one thing the browser is never sent. It
// lives in public.quiz_key, a table with row level security on and no read
// policy, so nothing but the marking function can see it. That is what makes
// the closed-book rule and the per-module answer unlock real rather than
// cosmetic: the answers are not in the bundle, and no API call returns them
// before the paper has been submitted.
//
// Run after editing quiz/*.json, then apply supabase/seed-quiz-key.sql:
//   node scripts/build-quiz-seed.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'supabase/seed-quiz-key.sql');

const banks = readdirSync(join(ROOT, 'quiz'))
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => JSON.parse(readFileSync(join(ROOT, 'quiz', f), 'utf8')));

const sqlText = (value) => `'${String(value).replace(/'/g, "''")}'`;

const metaRows = banks.map((bank) => {
  const parts = bank.parts
    ? sqlText(
        JSON.stringify(
          bank.parts.map((p) => ({ id: p.id, weight: p.weight, min_score: p.minScore ?? null }))
        )
      ) + '::jsonb'
    : 'null';
  return `  (${sqlText(bank.id)},${bank.passMark},${parts})`;
});

const keyRows = [];
for (const bank of banks) {
  bank.questions.forEach((q, i) => {
    const part = q.part ? sqlText(q.part) : 'null';
    // Stored sorted, so marking can compare arrays directly.
    const correct = sqlText(`{${[...q.correct].sort().join(',')}}`);
    keyRows.push(
      `  (${sqlText(bank.id)},${sqlText(q.id)},${i + 1},${part},${sqlText(q.type)},${correct})`
    );
  });
}

const sql = `-- Generated from quiz/*.json by scripts/build-quiz-seed.mjs. Do not edit by hand.
-- \`correct\` is stored sorted so marking can compare arrays directly.

insert into public.quiz_meta (quiz_id, pass_mark, parts) values
${metaRows.join(',\n')}
on conflict (quiz_id) do update
  set pass_mark = excluded.pass_mark, parts = excluded.parts;

insert into public.quiz_key (quiz_id, question_id, position, part, qtype, correct) values
${keyRows.join(',\n')}
on conflict (quiz_id, question_id) do update
  set position = excluded.position, part = excluded.part,
      qtype = excluded.qtype, correct = excluded.correct;

-- Questions removed from the bank are removed here too, so the key cannot
-- outlive the paper it marks.
delete from public.quiz_key k
where not exists (
  select 1 from (values
${keyRows.map((r) => r.replace(/^ {2}\(/, '    (').replace(/,\d+,(?:'[^']*'|null),'[^']*','\{[^}]*\}'\)$/, ')')).join(',\n')}
  ) as kept (quiz_id, question_id)
  where kept.quiz_id = k.quiz_id and kept.question_id = k.question_id
);
`;

writeFileSync(OUT, sql);
const n = banks.reduce((a, b) => a + b.questions.length, 0);
console.log(`quiz seed: ${banks.length} quizzes, ${n} questions -> supabase/seed-quiz-key.sql`);
