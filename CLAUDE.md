# Trading et al. — project notes

Working notes for anyone (human or agent) picking this repository up. Kept
current as decisions are made; the decision log at the bottom is append-only.

## What this is

One website, one Next.js app in `site/`, one Supabase project, one brand. It
has three parts, each a route group with its own root layout:

| | **Course** (free) | **Pro** (paid) | **Admin** |
|---|---|---|---|
| Route | `/` (hash routes `#/en/m03/...`) | `/pro/{en,ar}/...` | `/admin` |
| Route group | `site/src/app/(course)` | `site/src/app/(pro)` | `site/src/app/(admin)` |
| Who | Anyone, no account needed | Members approved by an admin | Rows in `public.admins` |
| Language | EN + AR | EN + AR | English only |

URL: https://tradingetal.vercel.app. The old Pro address,
`tradingetal-pro.*`, is retired: `site/src/proxy.ts` answers it with a 308 to
the main site.

**The hard constraint: never break or remove the free course.** It stays fully
free and readable without an account. Pro is additive, always.

## The course (`/`)

- The course is still the single-page app it always was. Its source lives in
  `site/src/course/`. `site/src/course/Mount.tsx` loads it client-side only,
  through `next/dynamic` with `ssr: false`.
- **Routing is hash-based** (`#/en/m03/02-pip-value`). The hash never reaches
  the server. Lesson URLs may be bookmarked or shared, so they do not change.
- **Content is compiled in at build time.** Lessons are markdown files:
  English in `modules/`, Arabic in `ar/`, question papers in `quiz/`.
  `site/scripts/generate-content.mjs` fetches them from a pinned commit and
  writes `site/src/course/content/**`. `npm run build` runs it first.
- The generated files are committed as placeholders. **Always run
  `git checkout -- site/src/course/content` before committing**, or the
  placeholders get overwritten with build output.
- The course has a "Pro" link in its header and on its home page. It points
  at `/pro/{lang}`.
- **Tests:**
  - Vitest covers the financial maths (`npm test` in `site/`).
  - The browser checks for the course run with Playwright against a local
    production build.

## One sign-in

Every part of the site uses `@supabase/ssr`, which keeps the session in a
cookie. That means one sign-in covers the course, Pro and the admin console,
and server code can see who is signed in.

- `@supabase/ssr` always uses the PKCE flow and ignores a `flowType` option.
  An email link (sign-up confirmation, password reset) returns with a one-time
  `?code=`, which only the browser that asked for the link can exchange for a
  session.
  - Opened anywhere else, a confirmation link still confirms the address, and
    the reader signs in by hand.
  - A reset link opened anywhere else cannot be used. The site sends the reader
    to the reset form with an explanation.
- **Password reset** happens in the course: `#/{lang}/reset`, or "Forgot
  password?" on the sign-in form. The Pro and admin sign-in pages link to it.
  - The link lands on `/?code=...`. `landedFromResetLink()` in
    `site/src/course/lib/supabase.ts` records the client's PASSWORD_RECOVERY
    event, and the app then shows the new-password screen before anything else.
  - A failed link (`error_code`, or a code that did not sign anyone in) opens
    the reset form with an explanation.
- Readers who were signed in under the old static course kept their session
  in localStorage, so they sign in once more after the merge.
- `site/src/proxy.ts` is Next 16's name for middleware. It does four things:
  - refreshes the session;
  - sends `/pro` to `/pro/{lang}`;
  - sends the old bare `/en` and `/ar` paths to `/pro/...`;
  - redirects the retired host.

## Membership, payments and the admin

- **How a student gets Pro:**
  1. The student opens Pro and sees the upgrade page. It shows the price and
     payment instructions from `site_settings`.
  2. They pay off-site and quote their payment reference. This calls
     `request_pro()`, which sets their membership to `requested`.
  3. An admin records the payment and approves them, which sets the
     membership to `active`.
- **The gate:**
  - `has_pro()` is true for an active membership, and for any admin.
  - `site/src/lib/requirePro.ts` sends signed-out users to sign-in and
    non-members to the upgrade page.
- **Admin sign-in** (`/admin/login`) takes a username and the admin's own
  account password.
  - `admin_login_email()` checks the password against
    `auth.users.encrypted_password` inside Postgres, and returns the email
    only when it matches. The browser then signs in normally with that email.
  - An unknown username still costs a bcrypt round, so timing reveals
    nothing.
  - Five failures in 15 minutes locks the username.
  - **No password is stored anywhere outside Supabase Auth.** Do not add one
    to code, migrations or environment variables.
- **The first admin** is username `mohdmarafie1996`, linked to the account
  mohdmarafie96@gmail.com (migration `20260923100500_first_admin.sql`). To add
  another admin, insert a row into `public.admins`.
- **Admin data access:**
  - Every read and write goes through an `admin_*` security-definer function.
    Each one calls `assert_admin()` first.
  - Every write is recorded in `admin_audit`.
  - The admin reads course data (progress, attempts) through these functions
    and never alters the course tables.

## Supabase

Project `xlwmtkavrpcqwffyuwzv`. One `auth.users` table covers the whole site.

**Course schema** (the first migrations in `supabase/migrations/`):

- Tables: `progress`, `quiz_meta`, `quiz_key`, `attempts`. RLS is enabled on
  all four.
- `quiz_key` has **no read policy** and `attempts` has **no insert policy**.
  Marking runs inside Postgres via `submit_attempt()`, so the answer key cannot
  be read from the browser and an attempt cannot be forged.
- RPCs: `user_state()`, `set_progress()`, `merge_progress()`,
  `submit_attempt()`, `quiz_answers()`. All are `security definer` with
  `set search_path = public, pg_temp`.

**Pro schema:**

- `profiles`, `trading_accounts`, `instruments` (40 seeded), `trades`.

**Membership schema:**

- `memberships`, `payments`, `admins`, `admin_audit`,
  `admin_login_attempts`, `site_settings`.
- Most of these have RLS on and no policies, so they are reachable only
  through the definer functions. Supabase's advisor flags that pattern; here
  it is intentional.

**Rules for new database code:**

- Additive only. Never alter the four course tables.
- A new definer function must revoke EXECUTE from `public`, `anon` and
  `authenticated`, then grant only what it needs. Supabase grants `anon` by
  default.

## Shared code

- `site/src/course/lib/sizing.ts` has `sizePosition()`, the position-size calculation
  the course teaches. The course calculator, the public home page and Pro all
  call it.
  - It rounds **down** to the 0.01 lot step, never up. Rounding up would put
    the trade past the risk budget the trader just set.
  - It has 11 unit tests, in `site/src/lib/sizing.test.ts`.
- `site/src/course/lib/auth-errors.ts` has `classifyAuthError()`, which sorts
  Supabase's English error messages into causes. Each part of the site
  translates the cause.
- `site/src/course/tokens.css` holds the palette and type scale. The course
  and Pro both import it.
  - The fonts are self-hosted through `next/font` (`site/src/app/fonts.ts`).
  - The font-family names point at the CSS variables `next/font` generates.
- Import alias: `@/*` maps to `site/src/*`, and `@course/*` maps to
  `site/src/course/*`.

### Design system

"Trading floor" (chosen 2026-09-22, replacing "Ledger").

- **Dark is the default.**
  - Colours: night `#0A0F1C`, cards `#131C2E`, text `#EAF0FA`.
  - Pro and the admin console are dark only.
  - The course has a sun/moon toggle that switches to a light **reading
    mode** (`[data-theme="light"]`). A stored choice wins.
  - An inline script in the course layout applies a stored light choice
    before the first paint.
- **One accent:** electric blue, `#4D8DFF` in dark and `#1D55E0` in light.
  Every control, link, chart line and the live answer figure use it.
- **Semantic colour is for data and warnings only**, never for chrome:
  - gain `#3CCB8A`;
  - loss `#FF6B78`;
  - risk amber `#F5B544`;
  - each has a darker equivalent in light mode.
- **Contrast:** every text pairing is 4.5:1 or better in both themes. The
  lowest is `--ink-muted` on `--surface` at 6.7:1. Check new colours before
  adding them.
- **Fonts:**
  - Space Grotesk for headings.
  - IBM Plex Sans for reading and the interface.
  - IBM Plex Mono for figures.
  - IBM Plex Sans Arabic for all Arabic text.
  - Space Grotesk has no italic, so the wordmark sets "et al." in Plex Sans
    italic.
- **Arabic:**
  - Letter-spacing is off.
  - Labels set in the mono font switch to the Arabic interface font, because
    the mono has no Arabic glyphs.
- **The mark** is a blue plate with the lines knocked out in the page colour.

### Vercel

Team `team_RxoEKaU4lAMgQ44tWZ8UBiuR`. There are two projects on the same
repository, and both deploy production from `main`:

- **`tradingetal`** (`prj_9Qmhx4dO61QXUpLFo47dqYCvsY9s`) serves the site.
  - Root directory `site`, framework Next.js; `site/vercel.json` pins it.
- **`tradingetal-pro`** (`prj_MZEdpntLxSKbpkTNLDNBQNF55FoF`) is retired.
  - Its root directory also points at `site`, so its address serves the
    proxy's redirect to the main site.
  - It can be deleted once nobody uses the old address.

## Pro — what it is and is not

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
5. **2026-09-23 — One website: the course, Pro and an admin console merged
   into one Next.js app.** This reverses decisions 1 and 2. The user asked for
   one site in which Pro needs a payment plus an admin's approval.
   - **Why it no longer breaks the course:**
     - Next.js serves the course as a static page, and the course code is
       unchanged.
     - One origin means one sign-in.
     - The browser checks for the course passed on the merged build.
   - **Payment is manual for now** (the user's choice). The student pays
     off-site and quotes a reference; the admin records the payment and
     approves. Card payments are still Phase 5.
   - **The admin signs in with a username** and their own Supabase account
     password. The user posted a password in chat; it was deliberately not
     used, stored or committed.

## Open questions

- Seller country and main customer countries — decides Stripe vs Paddle vs
  Lemon Squeezy (merchant of record handles VAT). Needed by Phase 5.
- Subscription price.
- Market data provider (needs to cover forex **and** CFDs — indices, gold, oil).
  Built behind an interface so the source can be swapped. Options presented in Phase 2.
- A real MT4/MT5 history export to test the CSV importer against.
- **Pro price and payment instructions.** The admin sets them in
  /admin/settings. Until then, the upgrade page says the price is not set.
- **Supabase redirect allow-list:** nothing to do. The site is one origin, so
  confirmation links already return to it.
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
   - ✅ Merged into one site (decision 5), with membership gating, manual
     payments and the admin console at /admin.
   - ⏳ Account settings, instruments screen, trade entry, CSV import, trade list.
2. Calculations: position size, volatility, risk rules, pre-trade check. Full unit tests.
3. Analytics and dashboard.
4. AI coach.
5. Payments and upgrade funnel. The manual flow is live; card payments are
   still to do.
6. Launch. Checklist so far:
   - Delete the retired `tradingetal-pro` Vercel project once nobody uses the
     old address.

## Conventions

- Commit after each working step, with a message saying what changed and why.
- Financial maths gets unit tests. Verified, not assumed.
- Every new table gets Row Level Security.
- Validate all user input on the server.
- Keep UI text in the translation files, never hard-coded.
- Never commit a secret. Never put one in a chat message or a deploy parameter.
