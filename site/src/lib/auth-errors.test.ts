import { describe, expect, it } from 'vitest';
import { classifyAuthError } from '@course/lib/auth-errors';

describe('classifyAuthError', () => {
  it('reads a reused password as its own cause, not a weak one', () => {
    // Supabase's wording contains "password should be", the weak-password
    // phrase, so the order of the checks matters.
    expect(
      classifyAuthError('New password should be different from the old password.', 422),
    ).toBe('same-password');
  });

  it('still reads a short password as weak', () => {
    expect(classifyAuthError('Password should be at least 8 characters.', 422)).toBe(
      'weak-password',
    );
  });

  it('reads a rate limit from the status alone', () => {
    expect(classifyAuthError('Too many requests', 429)).toBe('rate-limited');
  });

  it('reads wrong credentials', () => {
    expect(classifyAuthError('Invalid login credentials', 400)).toBe('bad-credentials');
  });

  it('falls back to a generic failure', () => {
    expect(classifyAuthError('Something unexpected', 500)).toBe('failed');
  });
});
