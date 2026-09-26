import { useCallback, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import {
  ARRIVED_FROM_LINK,
  landedFromResetLink,
  linkSettled,
  requestPasswordReset,
  supabase,
} from './supabase';
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
  /** True from a reset link's landing until the reader has set a new password. */
  recovering: boolean;
  /**
   * True when the page was opened from an email link that did not sign the
   * reader in: expired, already used, or opened in another browser.
   */
  linkFailed: boolean;
  /** True once a reset link has been requested. */
  resetSent: boolean;
  /** True once the new password has been saved. */
  passwordUpdated: boolean;
  /** Why the last attempt to delete the account failed, if it did. */
  deleteError: DeleteError;
  /** True from a successful deletion until the reader leaves the goodbye screen. */
  accountDeleted: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendReset: (email: string) => Promise<void>;
  setNewPassword: (password: string) => Promise<void>;
  finishRecovery: () => void;
  deleteAccount: (confirmEmail: string) => Promise<void>;
  leaveDeleted: () => void;
  clearError: () => void;
}

/** 'mismatch': the typed address is not the account's; 'admin': admins cannot. */
export type DeleteError = 'mismatch' | 'admin' | 'network' | 'failed' | null;

/** Supabase reports failures as prose; this maps them to something actionable. */
export function useAuth(): Auth {
  const [status, setStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError>(null);
  const [busy, setBusy] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [recovering, setRecovering] = useState(false);
  const [linkFailed, setLinkFailed] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [deleteError, setDeleteError] = useState<DeleteError>(null);
  const [accountDeleted, setAccountDeleted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe = () => {};

    // Nothing is read until a reset link's session is in place. Otherwise the
    // page would flash as signed out and then as signed in.
    linkSettled.then(() => {
      if (cancelled) return;

      // getSession waits for the client to finish starting up, which includes
      // swapping a link's code for a session.
      supabase.auth.getSession().then(({ data }) => {
        if (cancelled) return;
        if (landedFromResetLink()) setRecovering(true);
        if (ARRIVED_FROM_LINK && !data.session) setLinkFailed(true);
        apply(data.session);
      });

      // Covers sign-in, sign-out, token refresh and the OAuth redirect landing.
      // A PKCE reset link also signs the reader in, and says so with
      // PASSWORD_RECOVERY.
      const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
        if (cancelled) return;
        if (event === 'PASSWORD_RECOVERY') setRecovering(true);
        apply(session);
      });
      unsubscribe = () => sub.subscription.unsubscribe();
    });

    function apply(session: Session | null) {
      setUser(session?.user ?? null);
      setStatus(session?.user ? 'signed-in' : 'signed-out');
    }

    return () => {
      cancelled = true;
      unsubscribe();
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

  const sendReset = useCallback(async (email: string) => {
    setBusy(true);
    setError(null);
    // The link signs the reader in on the course and opens the new-password
    // screen, on whichever device it is opened (see requestPasswordReset). The
    // origin is already on Supabase's redirect allow-list, since the Google
    // sign-in returns to it too. Supabase answers the same way whether or not
    // the address has an account, so this cannot be used to probe for one.
    const err = await requestPasswordReset(email.trim(), window.location.origin);
    if (err) setError(classify(err.message, err.status));
    else setResetSent(true);
    setBusy(false);
  }, []);

  const setNewPassword = useCallback(async (password: string) => {
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) setError(classify(err.message, err.status));
    else setPasswordUpdated(true);
    setBusy(false);
  }, []);

  // The database deletes the account and everything in it
  // (delete_own_account); here the reader is then signed out of this browser.
  // The server session no longer exists, so the sign-out is local only.
  const deleteAccount = useCallback(async (confirmEmail: string) => {
    setBusy(true);
    setDeleteError(null);
    const { error: err } = await supabase.rpc('delete_own_account', {
      p_confirm_email: confirmEmail,
    });
    if (err) {
      setDeleteError(
        err.code === '22023'
          ? 'mismatch'
          : err.code === '42501'
            ? 'admin'
            : classify(err.message) === 'network'
              ? 'network'
              : 'failed',
      );
      setBusy(false);
      return;
    }
    setAccountDeleted(true);
    await supabase.auth.signOut({ scope: 'local' });
    setUser(null);
    setStatus('signed-out');
    setBusy(false);
  }, []);

  const leaveDeleted = useCallback(() => setAccountDeleted(false), []);

  const finishRecovery = useCallback(() => {
    setRecovering(false);
    setPasswordUpdated(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setAwaitingConfirmation(false);
    setResetSent(false);
    setDeleteError(null);
  }, []);

  return {
    status,
    user,
    error,
    busy,
    awaitingConfirmation,
    recovering,
    linkFailed,
    resetSent,
    passwordUpdated,
    deleteError,
    accountDeleted,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    sendReset,
    setNewPassword,
    finishRecovery,
    deleteAccount,
    leaveDeleted,
    clearError,
  };
}
