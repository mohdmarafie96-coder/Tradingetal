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
 * Whether "Continue with Google" is live. Turn this on once the Google
 * provider has been given a client ID and secret in the Supabase dashboard
 * (Authentication → Providers → Google); until then the button is shown
 * disabled rather than failing when it is pressed.
 */
export const GOOGLE_ENABLED = false;

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // The app is hash-routed, so an OAuth redirect comes back with its own
    // fragment; letting the client consume it keeps it out of the course route.
    detectSessionInUrl: true,
  },
});
