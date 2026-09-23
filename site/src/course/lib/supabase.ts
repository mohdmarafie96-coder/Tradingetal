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
 * A password-reset link lands with the session itself in the fragment
 * (`#access_token=...&type=recovery`); see requestPasswordReset below. The
 * client cannot read that form, since @supabase/ssr only accepts PKCE
 * landings and would reject it. So the tokens are taken here and the
 * fragment is cleared before the client is created; setSession installs them
 * further down.
 */
const fragment = new URLSearchParams(landing?.hash.replace(/^#/, '') ?? '');
const recoveryTokens =
  fragment.get('type') === 'recovery' && fragment.get('access_token') && fragment.get('refresh_token')
    ? { access_token: fragment.get('access_token')!, refresh_token: fragment.get('refresh_token')! }
    : null;
if (landing && recoveryTokens) {
  window.history.replaceState(window.history.state, '', `${landing.pathname}${landing.search}`);
}

/**
 * @supabase/ssr always uses the PKCE flow, whatever flowType is passed. The
 * client swaps a link's `?code=` for a session using a secret it stored when
 * the link was requested. So a PKCE link signs the reader in only in the
 * browser that asked for it. Opened anywhere else, a confirmation link still
 * confirms the address, and the reader then signs in by hand.
 */
export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Whether this page load came from a password-reset link.
 * - A link from requestPasswordReset carries its tokens in the fragment, read
 *   above.
 * - A PKCE reset link (one the client library asked for) is announced with
 *   PASSWORD_RECOVERY while the client starts up, which can be before any
 *   component is listening. So this listener is attached here, synchronously,
 *   before start-up can finish.
 * The app reads the result once linkSettled has resolved.
 */
let recoveryLanding = !!recoveryTokens;
supabase.auth.onAuthStateChange((event) => {
  if (event === 'PASSWORD_RECOVERY') recoveryLanding = true;
});
export function landedFromResetLink(): boolean {
  return recoveryLanding;
}

/** Resolves once a reset link's session, if there is one, is in place. */
export const linkSettled: Promise<void> = recoveryTokens
  ? supabase.auth.setSession(recoveryTokens).then(({ error }) => {
      if (error) recoveryLanding = false;
    })
  : Promise.resolve();

/**
 * Asks Supabase to email a password-reset link.
 *
 * This deliberately bypasses the client library. The library sends a PKCE
 * challenge (@supabase/ssr forces it), and the link it gets back only works in
 * the browser that asked for it. People often ask on a computer and open the
 * email on their phone. Without a challenge, Supabase uses the implicit flow:
 * the link carries the session in its fragment and works on any device.
 */
export async function requestPasswordReset(
  email: string,
  redirectTo: string,
): Promise<{ message: string; status?: number } | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`,
      {
        method: 'POST',
        headers: { apikey: SUPABASE_PUBLISHABLE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      },
    );
    if (response.ok) return null;
    const body = await response.json().catch(() => ({}));
    return {
      message: body.msg ?? body.message ?? body.error_description ?? '',
      status: response.status,
    };
  } catch {
    return { message: 'Failed to fetch' };
  }
}
