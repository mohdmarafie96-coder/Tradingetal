/**
 * Every piece of Supabase configuration lives here, and nowhere else.
 *
 * Pro and the course sit on different origins until a custom domain is bought,
 * so a signed-in course reader signs in again here. When the domain arrives,
 * making the session shared is a change to this one file (a cookie scoped to
 * the parent domain) plus a redeploy — not a rewrite.
 *
 * The publishable key is designed to be public and is already in the course's
 * JavaScript bundle. Row Level Security, not this key, is what protects the
 * data. The secret key never appears in code that reaches a browser.
 */

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://xlwmtkavrpcqwffyuwzv.supabase.co';

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  'sb_publishable_p2IbYG3wAO5fFRSFmOuskg_IV-1ePS_';


/**
 * Set once the two apps share a parent domain, e.g. '.tradingetal.com'. Until
 * then the session cookie stays on Pro's own origin.
 */
export const SESSION_COOKIE_DOMAIN = process.env.NEXT_PUBLIC_SESSION_COOKIE_DOMAIN || undefined;
