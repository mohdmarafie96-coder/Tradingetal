#!/usr/bin/env node
// Derives every human-readable quiz artifact from the question bank in quiz/*.json.
//
// The bank is the single source of truth. Three representations are generated from
// it, in both languages, so none of them can drift from the others:
//
//   modules/<dir>/quiz.md              closed-book paper, questions and options only
//   modules/11-capstone/02-assessment.md  the same, for the final assessment
//   reference/quiz-answers.md          answers with explanations
//
// Run with: node scripts/build-quiz-md.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WRAP = 90;

const LOCALES = [
  { lang: 'en', prefix: '', rtl: false },
  { lang: 'ar', prefix: 'ar/', rtl: true },
];

// Option letters. Arabic uses the abjadi sequence, which is what the printed
// Arabic edition already used for its multiple-choice options.
const LETTERS = {
  en: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  ar: ['أ', 'ب', 'ج', 'د', 'هـ', 'و', 'ز', 'ح'],
};

// Final-assessment question ids are part-lettered (A1, B2 ...); the Arabic
// edition numbers them with the same abjadi letters.
const PART_LETTER = { A: 'أ', B: 'ب', C: 'ج', D: 'د', E: 'هـ' };

const T = {
  en: {
    closedBook: 'Closed book.',
    calculator: 'Calculator permitted.',
    usdAccount: 'Assume a USD account unless stated otherwise.',
    tickOne: 'Tick one answer per question unless the question says otherwise.',
    selectAll: 'select all that apply',
    answersLink: (href) => `[Answers](${href})`,
    answersNote: (link) => `${link} unlock once you have submitted the quiz.`,
    scoring: 'Scoring:',
    passMark: (pct) => `**Pass mark: ${pct}%.**`,
    answersTitle: '# Quiz Answers',
    answersIntro: [
      'Work the questions before reading these. Explanations are given for every answer, because the reasoning matters more than the result.',
      'Arithmetic in this file has been checked against `tools/cfd_calc.py`.',
    ],
    moduleHeading: (n) => `## Module ${n}`,
    finalHeading: '## Final assessment',
    partHeading: (id, title, modules) => `### Part ${id} — ${title} (${modules})`,
    partHeadingH2: (id, title, modules) => `## Part ${id} — ${title} (${modules})`,
    answer: 'Answer:',
    scoringHeading: '## Scoring',
    tableHead: '| Part | Questions | Weight |',
    tableRow: (id, short, n, w) => `| ${id} — ${short} | ${n} | ${w}% |`,
    belowPass: (pct) =>
      `**Below ${pct}%:** identify which part you are weakest in and reread that module before proceeding to the decision.`,
    partCFloor: (pct) =>
      `**Part C below ${pct}%:** do not proceed. Risk management is not optional and the arithmetic must be automatic.`,
    assessmentTitle: '# 11.2 — Final Assessment',
    assessmentAnswers: (href) => `Answers and full workings: [quiz answers](${href}).`,
    assessmentPass: (pct) =>
      `**Pass mark: ${pct}%.** Below that, revisit the modules indicated against the questions you missed. This assessment exists so that you find the gaps now rather than with money at risk.`,
    next: 'Next: [11.3 — The decision](03-decision.md)',
  },
  ar: {
    closedBook: 'كتاب مغلق.',
    calculator: 'والآلة الحاسبة مسموحة.',
    usdAccount: 'وافترض حسابًا بالدولار الأمريكي ما لم يُذكر غير ذلك.',
    tickOne: 'أشِّر على إجابة واحدة لكل سؤال ما لم ينصّ السؤال على غير ذلك.',
    selectAll: 'اختر كل ما ينطبق',
    answersLink: (href) => `[الإجابات](${href})`,
    answersNote: (link) => `${link} تُفتح بعد تسليمك الاختبار.`,
    scoring: 'التقييم:',
    passMark: (pct) => `**درجة النجاح: ${pct}%.**`,
    answersTitle: '# إجابات الاختبارات',
    answersIntro: [
      'اعمل على الأسئلة قبل قراءة هذه الإجابات. وتُعطى شروح لكل إجابة، لأن التعليل أهمّ من النتيجة.',
      'وقد فُحصت الحسابات في هذا الملف في مواجهة `tools/cfd_calc.py`.',
    ],
    moduleHeading: (n) => `## الوحدة ${n}`,
    finalHeading: '## التقييم النهائي',
    partHeading: (id, title, modules) => `### الجزء ${id} — ${title} (${modules})`,
    partHeadingH2: (id, title, modules) => `## الجزء ${id} — ${title} (${modules})`,
    answer: 'الإجابة:',
    scoringHeading: '## التقييم',
    tableHead: '| الجزء | الأسئلة | الوزن |',
    tableRow: (id, short, n, w) => `| ${id} — ${short} | ${n} | ${w}% |`,
    belowPass: (pct) =>
      `**دون ${pct}%:** حدّد أضعف أجزائك وأعد قراءة تلك الوحدة قبل الانتقال إلى القرار.`,
    partCFloor: (pct) =>
      `**والجزء ج دون ${pct}%:** لا تواصل. فإدارة المخاطر ليست اختيارية والحسابات يجب أن تكون تلقائية.`,
    assessmentTitle: '# 11.2 — التقييم النهائي',
    assessmentAnswers: (href) => `الإجابات والحلول الكاملة: [إجابات الاختبارات](${href}).`,
    assessmentPass: (pct) =>
      `**درجة النجاح: ${pct}%.** ودونها، عد إلى الوحدات المشار إليها بإزاء الأسئلة التي أخطأت فيها. وهذا التقييم موجود لتجد الثغرات الآن لا ومالك في خطر.`,
    next: 'التالي: [11.3 — القرار](03-decision.md)',
  },
};

/** Soft-wrap a paragraph at WRAP columns. Both scripts break on spaces. */
function wrap(text, indent = '') {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w;
    if (candidate.length + indent.length > WRAP && line) {
      lines.push(indent + line);
      line = w;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(indent + line);
  return lines.join('\n');
}

function questionNumber(q, index, lang) {
  if (!q.part) return String(index + 1);
  const n = q.id.slice(1);
  return lang === 'ar' ? `${PART_LETTER[q.part]}${n}` : q.id;
}

/** One question as it appears on the closed-book paper: prompt plus tick boxes. */
function paperQuestion(q, index, lang) {
  const t = T[lang];
  const letters = LETTERS[lang];
  const num = questionNumber(q, index, lang);
  const multi = q.type === 'multi' ? ` (${t.selectAll})` : '';
  const out = [wrap(`**${num}.** ${q.prompt[lang]}${multi}`), ''];
  q.options.forEach((opt, i) => {
    out.push(`- [ ] ${letters[i]}) ${opt.text[lang]}`);
  });
  return out.join('\n');
}

/** One question as it appears in the answer key: correct options plus explanation. */
function keyQuestion(q, index, lang) {
  const t = T[lang];
  const letters = LETTERS[lang];
  const num = questionNumber(q, index, lang);
  const chosen = q.correct.map((id) => {
    const i = q.options.findIndex((o) => o.id === id);
    if (i < 0) throw new Error(`${q.id}: correct option "${id}" is not in the option list`);
    return `**${letters[i]})** ${q.options[i].text[lang]}`;
  });
  const sep = lang === 'ar' ? '؛ ' : '; ';
  const answer = wrap(`**${num}.** ${t.answer} ${chosen.join(sep)}`);
  return [answer, '', wrap(q.explanation[lang])].join('\n');
}

function moduleQuiz(bank, lang) {
  const t = T[lang];
  const n = bank.meta.anchor.en.replace('module-', '');
  const href = `../../reference/quiz-answers.md#${bank.meta.anchor[lang]}`;
  const rubric = [t.closedBook, bank.meta.calculator ? t.calculator : null, t.tickOne]
    .filter(Boolean)
    .join(' ');
  const out = [
    `# ${bank.title[lang]}`,
    '',
    wrap(rubric),
    '',
    wrap(t.answersNote(t.answersLink(href))),
    '',
  ];
  bank.questions.forEach((q, i) => {
    out.push(paperQuestion(q, i, lang), '');
  });
  out.push('---', '', wrap(`**${t.scoring}** ${bank.meta.scoring[lang]}`), '');
  return out.join('\n');
}

function assessment(bank, lang) {
  const t = T[lang];
  const pct = Math.round(bank.passMark * 100);
  const href = `../../reference/quiz-answers.md#${bank.meta.anchor[lang]}`;
  const rubric = [t.closedBook, t.calculator, t.usdAccount].join(' ');
  const out = [
    t.assessmentTitle,
    '',
    wrap(rubric),
    '',
    wrap(t.tickOne),
    '',
    wrap(t.assessmentAnswers(href)),
    '',
    wrap(t.assessmentPass(pct)),
    '',
    '---',
    '',
  ];
  for (const part of bank.parts) {
    const qs = bank.questions.filter((q) => q.part === part.id);
    const id = lang === 'ar' ? PART_LETTER[part.id] : part.id;
    out.push(t.partHeadingH2(id, part.title[lang], part.modules[lang]), '');
    qs.forEach((q) => out.push(paperQuestion(q, 0, lang), ''));
    out.push('---', '');
  }
  out.push(t.scoringHeading, '', t.tableHead, '|---|---|---|');
  for (const part of bank.parts) {
    const qs = bank.questions.filter((q) => q.part === part.id);
    const id = lang === 'ar' ? PART_LETTER[part.id] : part.id;
    out.push(t.tableRow(id, part.short[lang], qs.length, Math.round(part.weight * 100)));
  }
  out.push('');
  out.push(wrap(t.belowPass(pct)), '');
  const partC = bank.parts.find((p) => p.minScore);
  if (partC) out.push(wrap(t.partCFloor(Math.round(partC.minScore * 100))), '');
  out.push('---', '', t.next, '');
  return out.join('\n');
}

function answerKey(banks, lang) {
  const t = T[lang];
  const out = [t.answersTitle, ''];
  for (const p of t.answersIntro) out.push(wrap(p), '');
  out.push('---', '');
  for (const bank of banks) {
    if (bank.id === 'final') continue;
    out.push(t.moduleHeading(bank.meta.anchor.en.replace('module-', '')), '');
    bank.questions.forEach((q, i) => out.push(keyQuestion(q, i, lang), ''));
    out.push('---', '');
  }
  const final = banks.find((b) => b.id === 'final');
  out.push(t.finalHeading, '');
  for (const part of final.parts) {
    const id = lang === 'ar' ? PART_LETTER[part.id] : part.id;
    out.push(t.partHeading(id, part.title[lang], part.modules[lang]), '');
    final.questions
      .filter((q) => q.part === part.id)
      .forEach((q) => out.push(keyQuestion(q, 0, lang), ''));
  }
  return out.join('\n').replace(/\n+$/, '\n');
}

const files = readdirSync(join(ROOT, 'quiz')).filter((f) => f.endsWith('.json')).sort();
const banks = files.map((f) => JSON.parse(readFileSync(join(ROOT, 'quiz', f), 'utf8')));
const modules = banks.filter((b) => b.kind === 'quiz');
const final = banks.find((b) => b.kind === 'assessment');

let written = 0;
for (const { lang, prefix } of LOCALES) {
  for (const bank of modules) {
    const path = join(ROOT, `${prefix}modules/${bank.meta.dir}/quiz.md`);
    writeFileSync(path, moduleQuiz(bank, lang));
    written += 1;
  }
  const apath = join(ROOT, `${prefix}modules/${final.meta.dir}/${final.meta.file}`);
  writeFileSync(apath, assessment(final, lang));
  const kpath = join(ROOT, `${prefix}reference/quiz-answers.md`);
  writeFileSync(kpath, answerKey([...modules, final], lang));
  written += 2;
}

const total = banks.reduce((n, b) => n + b.questions.length, 0);
console.log(`quiz bank: ${banks.length} papers, ${total} questions -> ${written} files`);
