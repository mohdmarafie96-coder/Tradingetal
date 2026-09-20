import { createClient } from '@supabase/supabase-js';

/**
 * The project URL and the publishable key are public by design: they identify
 * the project and nothing more. What protects the data is row level security,
 * which scopes every row to the signed-in user, and the marking functions,
 * which are the only thing in the system that can read the answer key.
 */
const SUPABASE_URL = 'https://xlwmtkavrpcqwffyuwzv.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_p2IbYG3wAO5fFRSFmOuskg_IV-1ePS_';

/**
 * Whether "Continue with Google" is live.
 *
 * Driven by an environment variable rather than a constant, so switching it on
 * is a deploy setting rather than a code change: once the Google provider has
 * a client ID and secret in the Supabase dashboard (Authentication → Providers
 * → Google), set VITE_GOOGLE_ENABLED=true in the Vercel project and redeploy.
 * Until then the button is shown disabled rather than failing when pressed.
 */
export const GOOGLE_ENABLED = import.meta.env.VITE_GOOGLE_ENABLED === 'true';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // The app is hash-routed, so an OAuth redirect comes back with its own
    // fragment; letting the client consume it keeps it out of the course route.
    detectSessionInUrl: true,
  },
});
