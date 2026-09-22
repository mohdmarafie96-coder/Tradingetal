import { useCallback, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { classifyAuthError as classify, type AuthError } from './auth-errors';

export type AuthStatus = 'checking' | 'signed-out' | 'signed-in';

export type { AuthError } from './auth-errors';

export interface Auth {
  status: AuthStatus;
  user: User | null;
  error: AuthError;
  busy: boolean;
  /** True after a signup that still needs the address confirming by email. */
  awaitingConfirmation: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

/** Supabase reports failures as prose; this maps them to something actionable. */
export function useAuth(): Auth {
  const [status, setStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError>(null);
  const [busy, setBusy] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      apply(data.session);
    });

    // Covers sign-in, sign-out, token refresh and the OAuth redirect landing.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) apply(session);
    });

    function apply(session: Session | null) {
      setUser(session?.user ?? null);
      setStatus(session?.user ? 'signed-in' : 'signed-out');
    }

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setBusy(true);
    setError(null);
    setAwaitingConfirmation(false);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (err) setError(classify(err.message, err.status));
    setBusy(false);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setBusy(true);
    setError(null);
    setAwaitingConfirmation(false);
    const { data, error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    if (err) {
      setError(classify(err.message, err.status));
    } else if (!data.session) {
      // The project asks for the address to be confirmed before the first
      // sign-in, so there is nothing to show yet but the instruction.
      setAwaitingConfirmation(true);
    }
    setBusy(false);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    // On success the browser leaves for Google, so only a failure lands here.
    if (err) {
      setError(classify(err.message, err.status));
      setBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setStatus('signed-out');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setAwaitingConfirmation(false);
  }, []);

  return {
    status,
    user,
    error,
    busy,
    awaitingConfirmation,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    clearError,
  };
}
