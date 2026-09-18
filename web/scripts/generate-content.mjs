#!/usr/bin/env node
/**
 * Build step: fetch the course markdown from its public repository and render it
 * into the TypeScript modules the app imports, once per language edition.
 *
 * The course lives in git as markdown — English at the repository root, Arabic
 * under ar/. Rather than vendoring a second copy into this app, the content is
 * pulled at build time from a pinned commit, so the repository stays the single
 * source of truth and the editions cannot drift.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const OWNER = 'mohdmarafie96-coder';
const REPO = 'Tradingetal';
const REF = '55114c1f424546b7e2656a7a21de376123dc958a';

const SOURCES = [
  (p) => `https://raw.githubusercontent.com/${OWNER}/${REPO}/${REF}/${p}`,
  (p) => `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@${REF}/${p}`,
];

/** Language editions. `prefix` is where that edition's markdown lives. */
const LOCALES = [
  { lang: 'en', prefix: '' },
  { lang: 'ar', prefix: 'ar/' },
];

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const CONTENT_DIR = path.join(ROOT, 'src/content');
const CHUNK_DIR = path.join(CONTENT_DIR, 'chunks');
const QUIZ_DIR = path.join(CONTENT_DIR, 'quiz');

const MODULES = [
  { id: 'm00', dir: 'modules/00-before-you-start', time: { en: '1h', ar: 'ساعة' }, title: { en: 'Before You Start', ar: 'قبل أن تبدأ' }, lessons: ['01-is-this-for-you.md', '02-how-this-course-works.md', '03-demo-account-setup.md'], quiz: true },
  { id: 'm01', dir: 'modules/01-market-foundations', time: { en: '3h', ar: '٣ ساعات' }, title: { en: 'Market Foundations', ar: 'أسس الأسواق' }, lessons: ['01-how-prices-form.md', '02-bid-ask-spread.md', '03-liquidity-and-participants.md', '04-asset-classes.md'], quiz: true },
  { id: 'm02', dir: 'modules/02-what-is-a-cfd', time: { en: '4h', ar: '٤ ساعات' }, title: { en: 'What a CFD Actually Is', ar: 'ما هو عقد الفروقات حقًّا' }, lessons: ['01-the-contract.md', '02-vs-owning.md', '03-long-and-short.md', '04-regulation.md'], quiz: true },
  { id: 'm03', dir: 'modules/03-contract-mechanics', time: { en: '5h', ar: '٥ ساعات' }, title: { en: 'Contract Mechanics', ar: 'آليات العقد' }, lessons: ['01-contract-size.md', '02-pip-value.md', '03-calculating-pnl.md', '04-costs.md'], quiz: true },
  { id: 'm04', dir: 'modules/04-leverage-and-margin', time: { en: '5h', ar: '٥ ساعات' }, title: { en: 'Leverage and Margin', ar: 'الرافعة المالية والهامش' }, lessons: ['01-leverage.md', '02-margin-mechanics.md', '03-margin-call.md', '04-gap-risk.md'], quiz: true },
  { id: 'm05', dir: 'modules/05-orders-and-execution', time: { en: '4h', ar: '٤ ساعات' }, title: { en: 'Orders and Execution', ar: 'الأوامر والتنفيذ' }, lessons: ['01-order-types.md', '02-stops-and-targets.md', '03-execution-quality.md', '04-position-management.md'], quiz: true },
  { id: 'm06', dir: 'modules/06-risk-management', time: { en: '6h', ar: '٦ ساعات' }, title: { en: 'Risk Management', ar: 'إدارة المخاطر' }, lessons: ['01-position-sizing.md', '02-expectancy.md', '03-drawdown.md', '04-correlation.md'], quiz: true },
  { id: 'm07', dir: 'modules/07-market-analysis', time: { en: '5h', ar: '٥ ساعات' }, title: { en: 'Market Analysis', ar: 'تحليل السوق' }, lessons: ['01-reading-charts.md', '02-market-structure.md', '03-indicators.md', '04-fundamentals.md'], quiz: true },
  { id: 'm08', dir: 'modules/08-trading-plan', time: { en: '5h', ar: '٥ ساعات' }, title: { en: 'Building a Trading Plan', ar: 'بناء خطة تداول' }, lessons: ['01-edge.md', '02-writing-the-plan.md', '03-journaling.md', '04-testing.md'], quiz: true },
  { id: 'm09', dir: 'modules/09-trading-psychology', time: { en: '3h', ar: '٣ ساعات' }, title: { en: 'Trading Psychology', ar: 'سيكولوجيا التداول' }, lessons: ['01-biases.md', '02-tilt.md', '03-discipline.md'], quiz: true },
  { id: 'm10', dir: 'modules/10-operations', time: { en: '4h', ar: '٤ ساعات' }, title: { en: 'Operations', ar: 'الجوانب التشغيلية' }, lessons: ['01-choosing-a-broker.md', '02-platform-and-specs.md', '03-records-and-tax.md', '04-scams.md'], quiz: true },
  { id: 'm11', dir: 'modules/11-capstone', time: { en: '8h+', ar: '٨ ساعات+' }, title: { en: 'Capstone', ar: 'المشروع الختامي' }, lessons: ['01-programme.md', '02-assessment.md', '03-decision.md'], quiz: false },
];

const REFERENCE = [
  ['reference/glossary.md', { en: 'Glossary', ar: 'المسرد' }],
  ['reference/formula-sheet.md', { en: 'Formula Sheet', ar: 'صفحة المعادلات' }],
  ['reference/worked-examples.md', { en: 'Worked Examples', ar: 'أمثلة محلولة' }],
  ['reference/quiz-answers.md', { en: 'Quiz Answers', ar: 'إجابات الاختبارات' }],
  ['reference/further-reading.md', { en: 'Further Reading', ar: 'قراءات إضافية' }],
];

const TEMPLATES = [
  ['templates/trading-plan-template.md', { en: 'Trading Plan', ar: 'خطة التداول' }],
  ['templates/pre-trade-checklist.md', { en: 'Pre-Trade Checklist', ar: 'قائمة ما قبل الصفقة' }],
  ['templates/weekly-review-template.md', { en: 'Weekly Review', ar: 'المراجعة الأسبوعية' }],
  ['templates/monthly-review-template.md', { en: 'Monthly Review', ar: 'المراجعة الشهرية' }],
];

const FIXED = {
  risk: { en: 'Risk Disclosure', ar: 'إفصاح المخاطر' },
  overview: { en: 'Overview', ar: 'نظرة عامة' },
  quiz: { en: 'Quiz', ar: 'اختبار' },
  journal: { en: 'Trade Journal', ar: 'سجل الصفقات' },
};

const JOURNAL_CSV = 'templates/trade-journal-template.csv';

const JOURNAL_COPY = {
  en: {
    intro: (n) =>
      `<p>The journal has ${n} columns. Record the entry fields <strong>before</strong> the outcome is known, and set the compliance flag on every trade.</p><p>Copy the header row below into a spreadsheet.</p>`,
    colHead: 'Column',
    headingText: 'Header row',
  },
  ar: {
    intro: (n) =>
      `<p>يحتوي السجل على ${n} عمودًا. سجّل حقول الدخول <strong>قبل</strong> أن تعرف النتيجة، وضع علامة الالتزام بالخطة على كل صفقة.</p><p>انسخ صف العناوين أدناه إلى جدول بيانات.</p>`,
    colHead: 'العمود',
    headingText: 'صف العناوين',
  },
};

// ------------------------------------------------------------------ fetch

async function fetchText(repoPath) {
  const failures = [];
  for (const build of SOURCES) {
    const url = build(repoPath);
    try {
      const res = await fetch(url);
      if (res.ok) return await res.text();
      failures.push(`${res.status} ${url}`);
    } catch (error) {
      failures.push(`${error.message} ${url}`);
    }
  }
  throw new Error(`Could not fetch ${repoPath}: ${failures.join(' | ')}`);
}

async function fetchAll(paths, concurrency = 8) {
  const out = new Map();
  let cursor = 0;
  const workers = Array.from({ length: Math.min(concurrency, paths.length) }, async () => {
    while (cursor < paths.length) {
      const repoPath = paths[cursor++];
      out.set(repoPath, await fetchText(repoPath));
    }
  });
  await Promise.all(workers);
  return out;
}

// -------------------------------------------------------------- page index

/** Logical paths, shared by every edition. Only the fetch prefix differs. */
function buildPages(lang) {
  const pathToId = new Map();
  const pages = [];

  const add = (id, chunk, title, kind, moduleId, srcPath) => {
    pages.push({ id, chunk, title, kind, moduleId, srcPath });
    if (srcPath) pathToId.set(srcPath, id);
  };

  add('risk', 'misc', FIXED.risk[lang], 'page', null, 'RISK-DISCLOSURE.md');
  pathToId.set('README.md', 'home');

  for (const mod of MODULES) {
    add(`${mod.id}/index`, mod.id, FIXED.overview[lang], 'overview', mod.id, `${mod.dir}/README.md`);
    pathToId.set(mod.dir, `${mod.id}/index`);
    for (const file of mod.lessons) {
      add(`${mod.id}/${file.replace(/\.md$/, '')}`, mod.id, '', 'lesson', mod.id, `${mod.dir}/${file}`);
    }
    if (mod.quiz) add(`${mod.id}/quiz`, mod.id, FIXED.quiz[lang], 'quiz', mod.id, `${mod.dir}/quiz.md`);
  }

  for (const [p, title] of REFERENCE) {
    add(`reference/${path.basename(p, '.md')}`, 'reference', title[lang], 'reference', null, p);
  }
  for (const [p, title] of TEMPLATES) {
    add(`templates/${path.basename(p, '.md')}`, 'templates', title[lang], 'template', null, p);
  }
  add('templates/trade-journal', 'templates', FIXED.journal[lang], 'template', null, null);
  pathToId.set(JOURNAL_CSV, 'templates/trade-journal');
  pathToId.set('tools/README.md', 'calculator');
  pathToId.set('tools/cfd_calc.py', 'calculator');
  pathToId.set('tools/test_cfd_calc.py', 'calculator');

  return { pages, pathToId };
}

// ---------------------------------------------------------------- helpers

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

function htmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function makeRenderer(lang, srcPath, pathToId, headings) {
  const renderer = new marked.Renderer();

  const resolveLink = (target) => {
    const [rawPath, anchor] = target.split('#');
    if (!rawPath) return anchor ? `#${anchor}` : '#';
    const resolved = path.normalize(path.join(path.dirname(srcPath), rawPath)).replace(/\/+$/, '');
    const id = pathToId.get(resolved);
    if (!id) return null;
    const route = id === 'home' ? `#/${lang}` : `#/${lang}/${id}`;
    return anchor ? `${route}?h=${anchor}` : route;
  };

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plain = text.replace(/<[^>]*>/g, '');
    const id = slugify(plain) || `h${headings.length + 1}`;
    if (depth === 2 || depth === 3) headings.push({ id, text: plain, depth });
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  renderer.link = function ({ href, tokens }) {
    const text = this.parser.parseInline(tokens);
    if (/^https?:|^mailto:/.test(href)) {
      return `<a href="${htmlEscape(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
    const route = resolveLink(href);
    if (!route) return text;
    return `<a href="${htmlEscape(route)}" data-internal="1">${text}</a>`;
  };

  renderer.table = function (token) {
    const cell = (c, i, tag) => {
      const align = token.align[i];
      const style = align ? ` style="text-align:${align}"` : '';
      return `<${tag}${style}>${this.parser.parseInline(c.tokens)}</${tag}>`;
    };
    const header = '<tr>' + token.header.map((c, i) => cell(c, i, 'th')).join('') + '</tr>';
    const body = token.rows
      .map((row) => '<tr>' + row.map((c, i) => cell(c, i, 'td')).join('') + '</tr>')
      .join('\n');
    return `<div class="table-wrap"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>\n`;
  };

  renderer.checkbox = function ({ checked }) {
    return `<span class="md-check${checked ? ' is-checked' : ''}" aria-hidden="true"></span>`;
  };

  return renderer;
}

function plainText(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^[#>\-*|]+/gm, ' ')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstHeading(md) {
  const match = md.match(/^#\s+(.+)$/m);
  if (!match) return null;
  return match[1]
    .replace(/^\d+\.\d+\s+—\s+/, '')
    .replace(/^Module \d+ — /, '')
    .replace(/^الوحدة\s+\d+\s+—\s+/, '')
    .trim();
}

// ------------------------------------------------------------------ build

fs.mkdirSync(CHUNK_DIR, { recursive: true });

const courses = {};

for (const { lang, prefix } of LOCALES) {
  const { pages, pathToId } = buildPages(lang);
  const wanted = pages.filter((p) => p.srcPath).map((p) => p.srcPath).concat(JOURNAL_CSV);

  process.stdout.write(`[${lang}] fetching ${wanted.length} files from ${prefix || '/'}\n`);
  const sources = await fetchAll(wanted.map((p) => prefix + p));
  const read = (logicalPath) => sources.get(prefix + logicalPath);

  const chunks = new Map();
  let totalWords = 0;

  for (const page of pages) {
    if (!page.srcPath) continue;
    const md = read(page.srcPath);
    const heading = firstHeading(md);
    if (page.kind === 'lesson' && heading) page.title = heading;
    if (!page.title && heading) page.title = heading;

    const headings = [];
    const renderer = makeRenderer(lang, page.srcPath, pathToId, headings);
    const html = marked
      .parse(md, { renderer, gfm: true, breaks: false, async: false })
      .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/, '');

    const words = plainText(md).split(/\s+/).filter(Boolean).length;
    totalWords += words;
    page.minutes = Math.max(1, Math.round(words / 200));
    // Pages still carrying the translation placeholder are marked so the app can
    // offer the English original instead of presenting a stub as finished work.
    page.pending = md.includes('\u0642\u064a\u062f \u0627\u0644\u062a\u0631\u062c\u0645\u0629');

    if (!chunks.has(page.chunk)) chunks.set(page.chunk, {});
    chunks.get(page.chunk)[page.id] = { html, headings };
  }

  // Trade journal, rendered from the CSV header row.
  {
    const copy = JOURNAL_COPY[lang];
    const cols = read(JOURNAL_CSV).split('\n')[0].split(',');
    const rows = cols
      .map((c, i) => `<tr><td>${i + 1}</td><td><code>${htmlEscape(c)}</code></td></tr>`)
      .join('\n');
    const page = pages.find((p) => p.id === 'templates/trade-journal');
    page.minutes = 2;
    chunks.get('templates')[page.id] = {
      html:
        copy.intro(cols.length) +
        `<div class="table-wrap"><table><thead><tr><th>#</th><th>${copy.colHead}</th></tr></thead>` +
        `<tbody>${rows}</tbody></table></div>` +
        `<h2 id="header-row">${copy.headingText}</h2><pre><code>${htmlEscape(cols.join(','))}</code></pre>`,
      headings: [{ id: 'header-row', text: copy.headingText, depth: 2 }],
    };
  }

  const dir = path.join(CHUNK_DIR, lang);
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, map] of chunks) {
    const body = Object.entries(map)
      .map(([id, page]) => `  ${JSON.stringify(id)}: ${JSON.stringify(page)},`)
      .join('\n');
    fs.writeFileSync(
      path.join(dir, `${name}.ts`),
      `// Generated at build time from the course markdown. Do not edit by hand.\n` +
        `import type { Chunk } from '../../loader';\n\n` +
        `const pages: Chunk = {\n${body}\n};\n\nexport default pages;\n`
    );
  }

  const untitled = pages.filter((p) => !p.title);
  if (untitled.length) {
    throw new Error(`[${lang}] pages with no title: ${untitled.map((p) => p.id).join(', ')}`);
  }

  courses[lang] = {
    modules: MODULES.map((mod, i) => ({
      id: mod.id,
      number: String(i).padStart(2, '0'),
      title: mod.title[lang],
      time: mod.time[lang],
      pages: pages.filter((p) => p.moduleId === mod.id).map((p) => p.id),
    })),
    pages: pages.map((p) => ({
      id: p.id,
      chunk: p.chunk,
      title: p.title,
      kind: p.kind,
      moduleId: p.moduleId,
      minutes: p.minutes ?? 1,
      pending: p.pending ?? false,
    })),
    totalWords,
  };

  process.stdout.write(`[${lang}] ${pages.length} pages, ${chunks.size} chunks, ${totalWords} words\n`);
}

// -------------------------------------------------------------- quiz bank

/**
 * The question bank, split three ways. The paper — prompts and options — is a
 * chunk the browser loads to sit the quiz. Which options are correct goes only
 * to the backend (scripts/build-quiz-key.mjs), so a paper has to be marked
 * server-side. The explanations are a separate chunk, loaded only once a paper
 * has been marked, so nothing that discusses an answer is fetched by a reader
 * who is still answering.
 */
{
  const ids = ['m00', 'm01', 'm02', 'm03', 'm04', 'm05', 'm06', 'm07', 'm08', 'm09', 'm10', 'final'];
  process.stdout.write(`[quiz] fetching ${ids.length} question papers\n`);
  const raw = await fetchAll(ids.map((id) => `quiz/${id}.json`));

  fs.mkdirSync(QUIZ_DIR, { recursive: true });
  const meta = [];

  for (const id of ids) {
    const bank = JSON.parse(raw.get(`quiz/${id}.json`));
    const paper = {
      id: bank.id,
      kind: bank.kind,
      title: bank.title,
      passMark: bank.passMark,
      calculator: bank.meta.calculator,
      parts: bank.parts
        ? bank.parts.map((p) => ({ id: p.id, title: p.title, weight: p.weight, minScore: p.minScore ?? null }))
        : null,
      questions: bank.questions.map((q) => ({
        id: q.id,
        part: q.part ?? null,
        type: q.type,
        prompt: q.prompt,
        options: q.options.map((o) => ({ id: o.id, text: o.text })),
      })),
    };
    fs.writeFileSync(
      path.join(QUIZ_DIR, `${id}.ts`),
      `// Generated at build time from quiz/${id}.json. Do not edit by hand.\n` +
        `import type { Paper } from './index';\n\n` +
        `const paper: Paper = ${JSON.stringify(paper)};\n\nexport default paper;\n`
    );

    const why = Object.fromEntries(bank.questions.map((q) => [q.id, q.explanation]));
    fs.writeFileSync(
      path.join(QUIZ_DIR, `why-${id}.ts`),
      `// Generated at build time from quiz/${id}.json. Do not edit by hand.\n` +
        `import type { Why } from './index';\n\n` +
        `const why: Why = ${JSON.stringify(why)};\n\nexport default why;\n`
    );
    meta.push({
      id: bank.id,
      pageId: bank.kind === 'assessment' ? 'm11/02-assessment' : `${bank.id}/quiz`,
      moduleId: bank.kind === 'assessment' ? 'm11' : bank.id,
      title: bank.title,
      passMark: bank.passMark,
      count: bank.questions.length,
    });
  }

  const loaders = ids.map((id) => `  ${JSON.stringify(id)}: () => import('./${id}'),`).join('\n');
  const whyLoaders = ids
    .map((id) => `  ${JSON.stringify(id)}: () => import('./why-${id}'),`)
    .join('\n');

  fs.writeFileSync(
    path.join(QUIZ_DIR, 'index.ts'),
    `// Generated at build time from quiz/*.json. Do not edit by hand.
import type { Lang } from '../../lib/i18n';

export interface Option {
  id: string;
  text: Record<Lang, string>;
}

export interface Question {
  id: string;
  part: string | null;
  type: 'single' | 'multi';
  prompt: Record<Lang, string>;
  options: Option[];
}

export interface Part {
  id: string;
  title: Record<Lang, string>;
  weight: number;
  minScore: number | null;
}

export interface Paper {
  id: string;
  kind: 'quiz' | 'assessment';
  title: Record<Lang, string>;
  passMark: number;
  calculator: boolean;
  parts: Part[] | null;
  questions: Question[];
}

export interface QuizMeta {
  id: string;
  pageId: string;
  moduleId: string;
  title: Record<Lang, string>;
  passMark: number;
  count: number;
}

/** Explanations, by question id. Loaded only after a paper has been marked. */
export type Why = Record<string, Record<Lang, string>>;

export const QUIZZES: QuizMeta[] = ${JSON.stringify(meta)};

export const QUIZ_BY_PAGE = new Map(QUIZZES.map((q) => [q.pageId, q]));

const loaders: Record<string, () => Promise<{ default: Paper }>> = {
${loaders}
};

const cache = new Map<string, Paper>();

/** Papers are code-split: a quiz is only downloaded when it is opened. */
export async function loadPaper(id: string): Promise<Paper> {
  const cached = cache.get(id);
  if (cached) return cached;
  const load = loaders[id];
  if (!load) throw new Error('No such quiz: ' + id);
  const paper = (await load()).default;
  cache.set(id, paper);
  return paper;
}

export function cachedPaper(id: string): Paper | null {
  return cache.get(id) ?? null;
}

const whyLoaders: Record<string, () => Promise<{ default: Why }>> = {
${whyLoaders}
};

const whyCache = new Map<string, Why>();

/**
 * The explanations for a paper. Deliberately a separate chunk from the paper
 * itself: it is only requested once the answers have been submitted and marked.
 */
export async function loadWhy(id: string): Promise<Why> {
  const cached = whyCache.get(id);
  if (cached) return cached;
  const load = whyLoaders[id];
  if (!load) throw new Error('No such quiz: ' + id);
  const why = (await load()).default;
  whyCache.set(id, why);
  return why;
}
`
  );

  const total = meta.reduce((n, m) => n + m.count, 0);
  process.stdout.write(`[quiz] ${meta.length} papers, ${total} questions\n`);
}

// ------------------------------------------------------------------- emit

const entries = Object.entries(courses)
  .map(
    ([lang, c]) =>
      `  ${lang}: build(\n    ${JSON.stringify(c.modules)},\n    ${JSON.stringify(c.pages)},\n    ${c.totalWords}\n  ),`
  )
  .join('\n');

fs.writeFileSync(
  path.join(CONTENT_DIR, 'manifest.ts'),
  `// Generated at build time from the course markdown. Do not edit by hand.
import type { Lang } from '../lib/i18n';

export type PageKind = 'overview' | 'lesson' | 'quiz' | 'reference' | 'template' | 'page';

export interface PageMeta {
  id: string;
  chunk: string;
  title: string;
  kind: PageKind;
  moduleId: string | null;
  minutes: number;
  /** True while this page still awaits translation in this edition. */
  pending: boolean;
}

export interface ModuleMeta {
  id: string;
  number: string;
  title: string;
  time: string;
  pages: string[];
}

export interface Course {
  modules: ModuleMeta[];
  pages: PageMeta[];
  pageById: Map<string, PageMeta>;
  referencePages: PageMeta[];
  templatePages: PageMeta[];
  readingOrder: string[];
  totalLessons: number;
  totalWords: number;
}

function build(modules: ModuleMeta[], pages: PageMeta[], totalWords: number): Course {
  return {
    modules,
    pages,
    pageById: new Map(pages.map((p) => [p.id, p])),
    referencePages: pages.filter((p) => p.kind === 'reference'),
    templatePages: pages.filter((p) => p.kind === 'template'),
    readingOrder: ['risk', ...modules.flatMap((m) => m.pages)],
    totalLessons: pages.filter(
      (p) => p.kind === 'lesson' || p.kind === 'quiz' || p.kind === 'overview'
    ).length,
    totalWords,
  };
}

export const courses: Record<Lang, Course> = {
${entries}
};

export function courseFor(lang: Lang): Course {
  return courses[lang];
}
`
);

process.stdout.write('manifest written\n');
