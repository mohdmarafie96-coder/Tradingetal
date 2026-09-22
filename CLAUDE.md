# Trading et al. — project notes

Working notes for anyone (human or agent) picking this repository up. Kept
current as decisions are made; the decision log at the bottom is append-only.

## What this is

Two products, one repository, one Supabase project, one brand.

| | **Course** (live, free) | **Pro** (in build, paid) |
|---|---|---|
| Folder | `web/` | `pro/` |
| What it is | Self-paced CFD trading course, EN + AR | Coaching and risk-analysis tool |
| Stack | Vite + React 19 + TypeScript, static | Next.js App Router + TypeScript |
| Server code | None — static files only | Route handlers (AI, webhooks, cron) |
| URL | https://tradingetal.vercel.app | https://tradingetal-pro.vercel.app |
| Status | Shipped | Phase 1 |

**The hard constraint: never break or remove the free course.** It stays fully
free and readable without an account. Pro is additive, always.

## The course (`web/`)

Static single-page app. Nothing runs on a server when a reader visits.

- **Routing is hash-based** — `#/en/m03/02-pip-value`. Never reaches a server.
  Lesson URLs may be bookmarked or shared, so they do not change.
- **Content is compiled in at build time.** Lessons are markdown in `modules/`
  (English), `ar/` (Arabic), `quiz/` (question papers). `web/scripts/generate-content.mjs`
  fetches them from a pinned commit and emits `web/src/content/chunks/**`.
  Those generated files are committed as placeholders — **always
  `git checkout -- web/src/content` before committing**, or the placeholders get
  overwritten with build output.
- **Deployment**: root `vercel.json` builds `web/` into `web/dist`. Vercel reads
  `vercel.json` from a project's configured root directory, so this file governs
  the course project only. Pro gets its own at `pro/vercel.json`.
- **No test runner** was installed for the course. Vitest arrives with Pro.

### Design system

Tokens live in `web/src/tokens.css`, imported by both apps. The "Trading floor"
direction (chosen 2026-09-22, replacing "Ledger").

- **Dark is the default** in both apps: night `#0A0F1C`, cards `#131C2E`, text
  `#EAF0FA`. Pro is dark only. The course keeps a sun/moon toggle that switches
  to a light **reading mode** (`[data-theme="light"]`); a stored choice wins.
  `web/src/lib/theme.ts` defaults to dark, and an inline script in
  `web/index.html` applies a stored light choice before first paint.
- **One accent:** electric blue `#4D8DFF` (dark) / `#1D55E0` (light) for every
  control, link, chart line and the live answer figure.
- Semantic colour means data and warnings only, never chrome: gain `#3CCB8A`,
  loss `#FF6B78`, risk amber `#F5B544` (darker equivalents in light mode).
- Every text pairing is 4.5:1 or better in both themes; lowest is `--ink-muted`
  on `--surface` at 6.7:1. Check new colours before adding them.
- Space Grotesk (`--font-display`, headings), IBM Plex Sans (`--font-prose` and
  `--font-ui`, reading and interface), IBM Plex Mono (`--font-num`, figures).
  IBM Plex Sans Arabic for all Arabic text. Space Grotesk has no italic, so the
  wordmark sets "et al." in Plex Sans italic.
- The mark is a blue plate with the lines knocked out in the page colour.
- Tracking is off for Arabic, and mono-set labels switch to the Arabic UI face
  in Arabic, since the mono has no Arabic glyphs.

## Supabase (shared by both apps)

Project `xlwmtkavrpcqwffyuwzv`. One `auth.users` table serves both products — a
course account **is** a Pro-capable account. No migration, no second sign-up.

Existing course schema (`supabase/migrations/`):

- `progress`, `quiz_meta`, `quiz_key`, `attempts` — RLS enabled on all four.
- `quiz_key` has **no read policy** and `attempts` has **no insert policy**.
  Marking runs inside Postgres via `submit_attempt()`, so the answer key cannot
  be read from the browser and an attempt cannot be forged.
- RPCs: `user_state()`, `set_progress()`, `merge_progress()`, `submit_attempt()`,
  `quiz_answers()`. All `security definer` with `set search_path = public, pg_temp`.

Pro adds its own tables. Additive only — never alter the four above.

## Shared code

Pro imports from the course rather than copying. Copies drift.

- `web/src/lib/sizing.ts` — `sizePosition()`, the position-size calculation the
  course teaches. Rounds **down** to the 0.01 lot step, never up: rounding up
  puts the trade past the risk budget the trader just set. The course
  calculator, the public home page and Pro all call it.
- `web/src/lib/auth-errors.ts` — `classifyAuthError()`, which sorts Supabase's
  English error prose into causes. Both apps translate the cause. No imports,
  so Pro can pull it in without the course's Vite-only code.
- `web/src/tokens.css` — the palette and type scale. Both apps `@import` it.
  Pro repoints the family names at the variables `next/font` generates, because
  it self-hosts the faces rather than linking them from Google.

Cross-app imports need `experimental.externalDir` in `pro/next.config.ts`; the
`@course/*` path alias maps to `web/src/*`.

### Vercel

Two projects in team `team_RxoEKaU4lAMgQ44tWZ8UBiuR`, both on the same repo and
both deploying production from `main`:

- `tradingetal` — root directory is the repo root, builds `web/`.
- `tradingetal-pro` (`prj_MZEdpntLxSKbpkTNLDNBQNF55FoF`) — root directory `pro/`.
  "Skip deployments when the root directory has not changed" is deliberately
  **off**: Pro imports from `web/`, and Vercel's change detection would skip a
  build that was actually needed. A wasted build is cheaper than a stale deploy.
  Vercel Authentication is **on**, so the `*.vercel.app` URL asks for a Vercel
  login — fine while Pro is unfinished, must be turned off before launch.

## Pro (`pro/`) — what it is and is not

A coaching and risk-analysis tool. **Not** an auto-trading system. It never
places, modifies or closes trades, and never gives buy/sell signals or price
predictions.

**The AI never calculates numbers.** Code computes every figure and passes it to
Claude as structured JSON. Claude interprets, explains and coaches — nothing else.

Model: `claude-sonnet-5`, set via `ANTHROPIC_MODEL`. All secrets in environment
variables; never committed.

## Decision log

Append-only. Newest last.

1. **2026-09-22 — Pro is a separate app in the same repository** (Option B,
   refined), deployed as its own Vercel project. Rejected Option A (build inside
   the course) because the course is a static Vite SPA with no server, while Pro
   needs one for the Claude key, payment webhooks and scheduled jobs; and because
   every Pro deploy would have redeployed the course, against the hard constraint.
   Rejected a separate repository because the sizing maths, tokens, logo and
   translations would drift apart.
2. **2026-09-22 — `*.vercel.app` for now, custom domain deferred.** Consequence
   accepted: browsers scope a login session to one origin, so until the two apps
   share a parent domain a user signs in separately on each. Supabase session
   handling goes behind one config module so adding a domain later is a config
   change, not a rewrite.
3. **2026-09-22 — AI plan governs process and risk limits, not instrument or
   timing selection.** A paid, personalised plan naming which instruments to
   trade sits close to a *personal recommendation*, a regulated activity under
   the FCA, MiFID II and ASIC. Coaching on the user's own behaviour is a
   materially safer design. Flagged for legal review before Phase 5; not legal
   advice.
4. **2026-09-22 — Rebrand to "Trading floor"**, replacing "Ledger" (warm paper,
   oxblood, Newsreader). The user asked for a livelier look with better colours
   and chose this from three rendered directions (the others: bright cobalt,
   navy and gold). Dark became the default rather than following the system
   setting, since the system setting would have shown most visitors the light
   theme and hidden the look they chose.

## Open questions

- Seller country and main customer countries — decides Stripe vs Paddle vs
  Lemon Squeezy (merchant of record handles VAT). Needed by Phase 5.
- Subscription price.
- Market data provider (needs to cover forex **and** CFDs — indices, gold, oil).
  Built behind an interface so the source can be swapped. Options presented in Phase 2.
- A real MT4/MT5 history export to test the CSV importer against.
- **Deferred to launch (user's choice, 2026-09-22):** add
  `https://tradingetal-pro.vercel.app/**` (or the custom domain) to Supabase →
  Authentication → URL Configuration → Redirect URLs. Until then Supabase ignores
  Pro's `emailRedirectTo` and confirmation links go to the course, same as a
  course sign-up; a Pro user then returns to Pro to sign in. Harmless while Pro
  is not public; must be done in Phase 6.
- Supabase's advisor flags leaked-password protection as disabled. Turning it on
  checks new passwords against HaveIBeenPwned. It would also apply to course
  sign-ups, so it is the user's call.

## Phases

0. ✅ Inspect and plan — done, decisions 1–3 above.
1. ⏳ Auth, bilingual foundation, trade journal.
   - ✅ Pro scaffolded, shared tokens and sizing, self-hosted fonts.
   - ✅ Schema: profiles, trading_accounts, instruments (40 seeded), trades. RLS
     verified against the live database with two real user ids.
   - ✅ Auth, bilingual routing with RTL, sign-in screen.
   - ✅ Review pass (2026-09-22): fixed sizing losing a lot step to float error
     (live in the course too), duplicate Arabic field ids on the home-page plate,
     trades able to reference another user's account, per-row RLS evaluation,
     untranslated auth errors, missing email redirect, unstyled 404. Sizing now
     has 11 unit tests.
   - ⏳ Account settings, instruments screen, trade entry, CSV import, trade list.
2. Calculations: position size, volatility, risk rules, pre-trade check. Full unit tests.
3. Analytics and dashboard.
4. AI coach.
5. Payments and upgrade funnel.
6. Launch. Checklist so far: turn off Vercel Authentication on `tradingetal-pro`;
   add Pro's address to Supabase's redirect allow-list.

## Conventions

- Commit after each working step, with a message saying what changed and why.
- Financial maths gets unit tests. Verified, not assumed.
- Every new table gets Row Level Security.
- Validate all user input on the server.
- Keep UI text in the translation files, never hard-coded.
- Never commit a secret. Never put one in a chat message or a deploy parameter.
