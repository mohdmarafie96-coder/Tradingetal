/**
 * Every piece of Supabase configuration lives here, and nowhere else.
 *
 * The course, Pro and the admin console share one origin, so one session
 * cookie covers all three.
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
 * Optional. Set to a parent domain, e.g. '.tradingetal.com', only if the site
 * is ever split across subdomains. Unset, the cookie stays on the site's own
 * origin, which is all one origin needs.
 */
export const SESSION_COOKIE_DOMAIN = process.env.NEXT_PUBLIC_SESSION_COOKIE_DOMAIN || undefined;
