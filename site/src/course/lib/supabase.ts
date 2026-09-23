import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/lib/supabase/config';

/**
 * The course's Supabase client.
 *
 * It keeps its session in cookies rather than localStorage, the same way the
 * Pro and admin pages do. Everything lives on one origin, so one sign-in covers
 * the course, Pro and the admin page, and the server can see who is signed in.
 *
 * The URL and the publishable key are public by design: they identify the
 * project and nothing more. What protects the data is row level security and
 * the security-definer functions, which scope every row to the signed-in user.
 */

/**
 * Whether "Continue with Google" is live. A deploy setting rather than a code
 * change: NEXT_PUBLIC_GOOGLE_ENABLED=true (or the older VITE_GOOGLE_ENABLED,
 * mapped in next.config.ts) once the provider is configured in Supabase.
 */
export const GOOGLE_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === 'true';

/**
 * Email links (sign-up confirmation, password reset) and Google sign-in return
 * to the site carrying either a one-time `?code=` or, when they failed, an
 * `error_code`. This is read here, before the client is created, because the
 * client consumes the URL as it signs the reader in.
 */
const landing = typeof window === 'undefined' ? null : new URL(window.location.href);
export const ARRIVED_FROM_LINK =
  !!landing &&
  (landing.searchParams.has('code') ||
    /(^|[#&?])(error_code|access_token)=/.test(landing.search + landing.hash));

/**
 * @supabase/ssr always uses the PKCE flow, whatever flowType is passed. The
 * client swaps a link's `?code=` for a session using a secret it stored when
 * the link was requested. So a link signs the reader in only in the browser
 * that asked for it. Opened anywhere else, a confirmation link still confirms
 * the address, and the reader then signs in by hand.
 */
export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Whether this page load came from a password-reset link. The client announces
 * that with PASSWORD_RECOVERY while it starts up, which can be before any
 * component is listening. So this listener is attached here, synchronously,
 * before start-up can finish, and the app reads the result once start-up is
 * done.
 */
let recoveryLanding = false;
supabase.auth.onAuthStateChange((event) => {
  if (event === 'PASSWORD_RECOVERY') recoveryLanding = true;
});
export function landedFromResetLink(): boolean {
  return recoveryLanding;
}
