#!/usr/bin/env node
/**
 * Build step: fetch the course markdown from its public repository and render it
 * into the TypeScript modules the app imports.
 *
 * The course lives in git as ~80 markdown files. Rather than vendoring a second
 * copy into this app, the content is pulled at build time from a pinned commit,
 * so the repository stays the single source of truth and the two can never drift.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const OWNER = 'mohdmarafie96-coder';
const REPO = 'Tradingetal';
const REF = '04f75bf3f7652e95fc405ed6a8cf90b0e355f15a';

const SOURCES = [
  (p) => `https://raw.githubusercontent.com/${OWNER}/${REPO}/${REF}/${p}`,
  (p) => `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@${REF}/${p}`,
];

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const CONTENT_DIR = path.join(ROOT, 'src/content');
const CHUNK_DIR = path.join(CONTENT_DIR, 'chunks');

// --------------------------------------------------------------- structure

const MODULES = [
  { id: 'm00', dir: 'modules/00-before-you-start', title: 'Before You Start', time: '1h', lessons: ['01-is-this-for-you.md', '02-how-this-course-works.md', '03-demo-account-setup.md'], quiz: true },
  { id: 'm01', dir: 'modules/01-market-foundations', title: 'Market Foundations', time: '3h', lessons: ['01-how-prices-form.md', '02-bid-ask-spread.md', '03-liquidity-and-participants.md', '04-asset-classes.md'], quiz: true },
  { id: 'm02', dir: 'modules/02-what-is-a-cfd', title: 'What a CFD Actually Is', time: '4h', lessons: ['01-the-contract.md', '02-vs-owning.md', '03-long-and-short.md', '04-regulation.md'], quiz: true },
  { id: 'm03', dir: 'modules/03-contract-mechanics', title: 'Contract Mechanics', time: '5h', lessons: ['01-contract-size.md', '02-pip-value.md', '03-calculating-pnl.md', '04-costs.md'], quiz: true },
  { id: 'm04', dir: 'modules/04-leverage-and-margin', title: 'Leverage and Margin', time: '5h', lessons: ['01-leverage.md', '02-margin-mechanics.md', '03-margin-call.md', '04-gap-risk.md'], quiz: true },
  { id: 'm05', dir: 'modules/05-orders-and-execution', title: 'Orders and Execution', time: '4h', lessons: ['01-order-types.md', '02-stops-and-targets.md', '03-execution-quality.md', '04-position-management.md'], quiz: true },
  { id: 'm06', dir: 'modules/06-risk-management', title: 'Risk Management', time: '6h', lessons: ['01-position-sizing.md', '02-expectancy.md', '03-drawdown.md', '04-correlation.md'], quiz: true },
  { id: 'm07', dir: 'modules/07-market-analysis', title: 'Market Analysis', time: '5h', lessons: ['01-reading-charts.md', '02-market-structure.md', '03-indicators.md', '04-fundamentals.md'], quiz: true },
  { id: 'm08', dir: 'modules/08-trading-plan', title: 'Building a Trading Plan', time: '5h', lessons: ['01-edge.md', '02-writing-the-plan.md', '03-journaling.md', '04-testing.md'], quiz: true },
  { id: 'm09', dir: 'modules/09-trading-psychology', title: 'Trading Psychology', time: '3h', lessons: ['01-biases.md', '02-tilt.md', '03-discipline.md'], quiz: true },
  { id: 'm10', dir: 'modules/10-operations', title: 'Operations', time: '4h', lessons: ['01-choosing-a-broker.md', '02-platform-and-specs.md', '03-records-and-tax.md', '04-scams.md'], quiz: true },
  { id: 'm11', dir: 'modules/11-capstone', title: 'Capstone', time: '8h+', lessons: ['01-programme.md', '02-assessment.md', '03-decision.md'], quiz: false },
];

const REFERENCE = [
  ['reference/glossary.md', 'Glossary'],
  ['reference/formula-sheet.md', 'Formula Sheet'],
  ['reference/worked-examples.md', 'Worked Examples'],
  ['reference/quiz-answers.md', 'Quiz Answers'],
  ['reference/further-reading.md', 'Further Reading'],
];

const TEMPLATES = [
  ['templates/trading-plan-template.md', 'Trading Plan'],
  ['templates/pre-trade-checklist.md', 'Pre-Trade Checklist'],
  ['templates/weekly-review-template.md', 'Weekly Review'],
  ['templates/monthly-review-template.md', 'Monthly Review'],
];

const JOURNAL_CSV = 'templates/trade-journal-template.csv';

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
  throw new Error(`Could not fetch ${repoPath}\n  ${failures.join('\n  ')}`);
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

// ------------------------------------------------------------- page index

const pathToId = new Map();
const pages = [];

function register(id, chunk, title, kind, moduleId, srcPath) {
  pages.push({ id, chunk, title, kind, moduleId, srcPath });
  if (srcPath) pathToId.set(srcPath, id);
}

register('risk', 'misc', 'Risk Disclosure', 'page', null, 'RISK-DISCLOSURE.md');
pathToId.set('README.md', 'home');

for (const mod of MODULES) {
  register(`${mod.id}/index`, mod.id, 'Overview', 'overview', mod.id, `${mod.dir}/README.md`);
  pathToId.set(mod.dir, `${mod.id}/index`);
  for (const file of mod.lessons) {
    register(`${mod.id}/${file.replace(/\.md$/, '')}`, mod.id, '', 'lesson', mod.id, `${mod.dir}/${file}`);
  }
  if (mod.quiz) register(`${mod.id}/quiz`, mod.id, 'Quiz', 'quiz', mod.id, `${mod.dir}/quiz.md`);
}

for (const [p, title] of REFERENCE) {
  register(`reference/${path.basename(p, '.md')}`, 'reference', title, 'reference', null, p);
}
for (const [p, title] of TEMPLATES) {
  register(`templates/${path.basename(p, '.md')}`, 'templates', title, 'template', null, p);
}
register('templates/trade-journal', 'templates', 'Trade Journal', 'template', null, null);
pathToId.set(JOURNAL_CSV, 'templates/trade-journal');
pathToId.set('tools/README.md', 'calculator');
pathToId.set('tools/cfd_calc.py', 'calculator');
pathToId.set('tools/test_cfd_calc.py', 'calculator');

// ---------------------------------------------------------------- helpers

function slugify(value) {
  return value.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

function htmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveLink(srcPath, target) {
  const [rawPath, anchor] = target.split('#');
  if (!rawPath) return anchor ? `#${anchor}` : '#';
  const resolved = path.normalize(path.join(path.dirname(srcPath), rawPath)).replace(/\/+$/, '');
  const id = pathToId.get(resolved);
  if (!id) return null;
  const route = id === 'home' ? '#/' : `#/${id}`;
  return anchor ? `${route}?h=${anchor}` : route;
}

function render(srcPath, md) {
  const headings = [];
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plain = text.replace(/<[^>]*>/g, '');
    const id = slugify(plain);
    if (depth === 2 || depth === 3) headings.push({ id, text: plain, depth });
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  renderer.link = function ({ href, tokens }) {
    const text = this.parser.parseInline(tokens);
    if (/^https?:|^mailto:/.test(href)) {
      return `<a href="${htmlEscape(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
    const route = resolveLink(srcPath, href);
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

  const html = marked
    .parse(md, { renderer, gfm: true, breaks: false, async: false })
    .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/, '');
  return { html, headings };
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
  return match[1].replace(/^\d+\.\d+\s+—\s+/, '').replace(/^Module \d+ — /, '').trim();
}

// ------------------------------------------------------------------ build

const wanted = pages.filter((p) => p.srcPath).map((p) => p.srcPath).concat(JOURNAL_CSV);
process.stdout.write(`Fetching ${wanted.length} course files from ${OWNER}/${REPO}@${REF.slice(0, 7)}…\n`);
const sources = await fetchAll(wanted);

const chunks = new Map();
let totalWords = 0;

for (const page of pages) {
  if (!page.srcPath) continue;
  const md = sources.get(page.srcPath);
  const heading = firstHeading(md);
  if (!page.title && heading) page.title = heading;
  if (page.kind === 'lesson' && heading) page.title = heading;

  const { html, headings } = render(page.srcPath, md);
  page.headings = headings;
  const words = plainText(md).split(/\s+/).filter(Boolean).length;
  totalWords += words;
  page.minutes = Math.max(1, Math.round(words / 200));

  if (!chunks.has(page.chunk)) chunks.set(page.chunk, {});
  chunks.get(page.chunk)[page.id] = html;
}

// Trade journal: rendered from the CSV header row.
{
  const cols = sources.get(JOURNAL_CSV).split('\n')[0].split(',');
  const rows = cols
    .map((c, i) => `<tr><td>${i + 1}</td><td><code>${htmlEscape(c)}</code></td></tr>`)
    .join('\n');
  const page = pages.find((p) => p.id === 'templates/trade-journal');
  page.minutes = 2;
  page.headings = [{ id: 'header-row', text: 'Header row', depth: 2 }];
  chunks.get('templates')[page.id] =
    `<p>The journal has ${cols.length} columns. Record the entry fields <strong>before</strong> ` +
    `the outcome is known, and set the compliance flag on every trade.</p>` +
    `<p>Copy the header row below into a spreadsheet.</p>` +
    `<div class="table-wrap"><table><thead><tr><th>#</th><th>Column</th></tr></thead>` +
    `<tbody>${rows}</tbody></table></div>` +
    `<h2 id="header-row">Header row</h2><pre><code>${htmlEscape(cols.join(','))}</code></pre>`;
}

// ------------------------------------------------------------------ emit

fs.mkdirSync(CHUNK_DIR, { recursive: true });

for (const [name, map] of chunks) {
  const body = Object.entries(map)
    .map(([id, html]) => `  ${JSON.stringify(id)}: ${JSON.stringify(html)},`)
    .join('\n');
  fs.writeFileSync(
    path.join(CHUNK_DIR, `${name}.ts`),
    `// Generated at build time from the course markdown. Do not edit by hand.\n` +
      `const pages: Record<string, string> = {\n${body}\n};\n\nexport default pages;\n`
  );
}

const modules = MODULES.map((mod, i) => ({
  id: mod.id,
  number: String(i).padStart(2, '0'),
  title: mod.title,
  time: mod.time,
  pages: pages.filter((p) => p.moduleId === mod.id).map((p) => p.id),
}));

const manifestPages = pages.map((p) => ({
  id: p.id,
  chunk: p.chunk,
  title: p.title,
  kind: p.kind,
  moduleId: p.moduleId,
  minutes: p.minutes ?? 1,
  headings: p.headings ?? [],
}));

fs.writeFileSync(
  path.join(CONTENT_DIR, 'manifest.ts'),
  `// Generated at build time from the course markdown. Do not edit by hand.
export type PageKind = 'overview' | 'lesson' | 'quiz' | 'reference' | 'template' | 'page';

export interface Heading {
  id: string;
  text: string;
  depth: number;
}

export interface PageMeta {
  id: string;
  chunk: string;
  title: string;
  kind: PageKind;
  moduleId: string | null;
  minutes: number;
  headings: Heading[];
}

export interface ModuleMeta {
  id: string;
  number: string;
  title: string;
  time: string;
  pages: string[];
}

export const modules: ModuleMeta[] = ${JSON.stringify(modules, null, 2)};

export const pages: PageMeta[] = ${JSON.stringify(manifestPages, null, 2)};

export const pageById = new Map(pages.map((p) => [p.id, p]));

export const referencePages = pages.filter((p) => p.kind === 'reference');
export const templatePages = pages.filter((p) => p.kind === 'template');

export const readingOrder: string[] = [
  'risk',
  ...modules.flatMap((m) => m.pages),
];

export const totalLessons = pages.filter(
  (p) => p.kind === 'lesson' || p.kind === 'quiz' || p.kind === 'overview'
).length;

export const totalWords = ${totalWords};
`
);

const untitled = pages.filter((p) => !p.title);
if (untitled.length) {
  throw new Error(`Pages with no title: ${untitled.map((p) => p.id).join(', ')}`);
}

process.stdout.write(
  `Generated ${pages.length} pages across ${chunks.size} chunks (${totalWords.toLocaleString()} words).\n`
);
