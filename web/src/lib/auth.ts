import { useCallback, useEffect, useState } from 'react';
import { auth, type AuthUser } from '@appdeploy/client';

export type AuthStatus = 'checking' | 'signed-out' | 'signed-in';

/** Distinguishable causes, so the screen can say what to do about each. */
export type SignInError = 'blocked' | 'closed' | 'failed' | null;

export interface Auth {
  status: AuthStatus;
  user: AuthUser | null;
  signInError: SignInError;
  busy: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAuth(): Auth {
  const [status, setStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [signInError, setSignInError] = useState<SignInError>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // isSignedIn() is synchronous, but the stored token may still need a
    // refresh, so the user is resolved before the course is shown.
    (async () => {
      if (!auth.isSignedIn()) {
        if (!cancelled) setStatus('signed-out');
        return;
      }
      try {
        const current = await auth.getUser();
        if (cancelled) return;
        setUser(current);
        setStatus(current ? 'signed-in' : 'signed-out');
      } catch {
        if (!cancelled) setStatus('signed-out');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async () => {
    setBusy(true);
    setSignInError(null);
    try {
      const result = await auth.signIn();
      setUser(result.user);
      setStatus('signed-in');
    } catch (err) {
      const code = (err as { code?: string })?.code;
      setSignInError(code === 'popup_blocked' ? 'blocked' : code === 'popup_closed' ? 'closed' : 'failed');
    } finally {
      setBusy(false);
    }
  }, []);

  const doSignOut = useCallback(async () => {
    try {
      await auth.signOut();
    } finally {
      setUser(null);
      setStatus('signed-out');
    }
  }, []);

  return { status, user, signInError, busy, signIn, signOut: doSignOut };
}
