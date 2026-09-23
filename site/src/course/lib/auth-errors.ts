/**
 * Supabase auth errors, sorted into causes a screen can act on.
 *
 * Supabase returns English prose. Showing it raw leaves an Arabic reader with an
 * English sentence, and a message nobody can tell the cause of. Both apps run
 * the same classifier and translate the code, so they cannot disagree about
 * what an error means. No imports: the Pro app pulls this in directly.
 */

/** Distinguishable causes, so the screen can say what to do about each. */
export type AuthError =
  | 'bad-credentials'
  | 'already-registered'
  | 'weak-password'
  | 'invalid-email'
  | 'rate-limited'
  | 'provider-disabled'
  | 'network'
  | 'failed'
  | null;

export function classifyAuthError(message: string, status?: number): Exclude<AuthError, null> {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return 'bad-credentials';
  if (m.includes('already registered') || m.includes('already been registered')) {
    return 'already-registered';
  }
  if (m.includes('password should be') || m.includes('weak password')) return 'weak-password';
  if (m.includes('invalid email') || m.includes('unable to validate email')) return 'invalid-email';
  if (m.includes('rate limit') || status === 429) return 'rate-limited';
  if (m.includes('provider is not enabled') || m.includes('not enabled')) return 'provider-disabled';
  if (m.includes('failed to fetch') || m.includes('network')) return 'network';
  return 'failed';
}
