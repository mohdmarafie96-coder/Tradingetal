# Course web app

The deployed version of the course.

**Live:** https://cfd-trading-fundamentals-hnvntf.v2.appdeploy.ai/

A React single-page app that renders the markdown in this repository as a
browsable course, with progress tracking, full-text search and an interactive
calculator.

## How the content gets in

The course lives in this repository as ~80 markdown files. The app does **not**
vendor a second copy of them. Instead `scripts/generate-content.mjs` runs as the
first half of `npm run build`: it fetches the markdown from a pinned commit of
the public repository, renders it to HTML with `marked`, rewrites every internal
link to a hash route, and writes:

- `src/content/manifest.ts` — page and module metadata, headings, reading times
- `src/content/chunks/*.ts` — the rendered HTML, one module per chunk

Those files are committed as **placeholders** so that static imports resolve
during linting and type-checking. Every build overwrites them. To change the
course, edit the markdown and update `REF` in the generator.

## Commands

```bash
npm install
npm run generate   # fetch and render the course content
npm run dev        # local dev server
npm run build      # generate + build
npm run preview    # serve the production build
```

## Structure

| Path | Purpose |
|---|---|
| `src/App.tsx` | Shell, hash routing, layout |
| `src/lib/router.ts` | Hash-based routing (no router dependency) |
| `src/lib/progress.ts` | Lesson completion, persisted to localStorage |
| `src/lib/gate.ts` | Risk-disclosure acknowledgement |
| `src/lib/theme.ts` | Light and dark theme |
| `src/components/RiskGate.tsx` | The mandatory opening disclosure |
| `src/components/Sidebar.tsx` | Module tree and progress |
| `src/components/PageView.tsx` | Lesson rendering, prev/next, completion |
| `src/components/SearchPanel.tsx` | Full-text search over the course |
| `src/components/Calculator.tsx` | Position size, margin, expectancy, drawdown |
| `src/content/loader.ts` | Lazy per-module chunk loading |
| `src/content/search-index.ts` | Search index derived from the chunks |

Content is code-split one chunk per module, so opening a lesson downloads only
that module. The search index is built from those same chunks rather than
shipping the text twice.

## Calculator

The four tabs reproduce the arithmetic in `tools/cfd_calc.py`, and the defaults
match the worked examples in the course:

| Tab | Default result | Source |
|---|---|---|
| Position size | 0.14 lots, $49 risk | Module 06.1 |
| Margin | 21.8:1 effective leverage | Module 04.3 |
| Expectancy | +0.33R net | Module 06.2 |
| Drawdown | 42.9% to recover 30% | Module 06.3 |
