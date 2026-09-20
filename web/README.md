# Course web app

The deployed version of the course: a React single-page app that renders the
markdown in this repository as a browsable course, with accounts, saved
progress, marked quizzes, full-text search and an interactive calculator.

Hosted on Vercel. Accounts and data are Supabase; there is no server of our
own, because there is nothing for one to do — see below.

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
| `src/lib/supabase.ts` | Supabase client, and the Google sign-in switch |
| `src/lib/auth.ts` | Sign up, sign in, sign out, and readable failures |
| `src/lib/store.ts` | Saved progress and quiz attempts, via database functions |
| `src/lib/gate.ts` | Risk-disclosure acknowledgement |
| `src/lib/theme.ts` | Light and dark theme |
| `src/components/SignIn.tsx` | The public screen: risk statistic, then sign-in |
| `src/components/RiskGate.tsx` | The mandatory opening disclosure |
| `src/components/Quiz.tsx` | Closed-book tick-box papers and the marked review |
| `src/components/AnswerKey.tsx` | The answer key, released module by module |
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

## Accounts, progress and marking

Readers sign in with an email address and password, or with Google once that
provider has been given credentials in the Supabase dashboard. Google is a
deploy setting rather than a code change: set `VITE_GOOGLE_ENABLED=true` in the
Vercel project and redeploy. Until then the button is shown disabled, with a
line saying so, rather than failing when it is pressed. Everything past the
sign-in screen needs an account, so the loss statistic regulators require
brokers to publish is stated on the sign-in screen itself, where a visitor
reads it before deciding to sign up.

There is no backend of our own. Postgres does the work:

| Function | What it does |
|---|---|
| `user_state()` | Pages read, and every quiz's attempts, best and latest |
| `set_progress()` / `merge_progress()` | Mark a page read; carry over a signed-out visit |
| `submit_attempt()` | Marks a paper, records the attempt, returns the marked paper |
| `quiz_answers()` | The answer key for one quiz, once that quiz has been sat |

Which options are correct lives in `public.quiz_key`, a table with row level
security on and **no read policy**: no client can select from it, and nothing
but the marking function can see it. `public.attempts` has no insert policy
either, so a reader cannot award themselves a pass — only `submit_attempt()`
writes there. That is what makes "closed book" and the per-module answer unlock
real rather than cosmetic.

The schema is in `../supabase/migrations`, and the marking key is generated
from the question bank by `../scripts/build-quiz-seed.mjs`.

## Deploying

Vercel builds this directory. `npm run build` fetches the course content from
the pinned commit and produces `dist/`; `vercel.json` rewrites every path to
`index.html` so a deep link survives a reload.
