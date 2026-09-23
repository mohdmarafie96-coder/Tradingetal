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

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Implicit, as the course has always used: a confirmation or OAuth link
    // returns the session in the URL fragment, which works when the link is
    // opened on a different device from the one that signed up. PKCE (the
    // library default) needs the original browser's stored verifier.
    flowType: 'implicit',
  },
});
