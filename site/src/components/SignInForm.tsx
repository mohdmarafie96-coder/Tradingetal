'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import { stringsFor, type Lang } from '@/lib/i18n';
import { classifyAuthError } from '@course/lib/auth-errors';
import { proHref } from '@/lib/paths';

export default function SignInForm({ lang }: { lang: Lang }) {
  const t = stringsFor(lang);
  const router = useRouter();
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    // Checked here so the obvious case costs no round trip; Supabase enforces
    // its own minimum server-side regardless.
    if (password.length < 8) {
      setError(t.passwordTooShort);
      return;
    }

    setBusy(true);
    const supabase = supabaseBrowser();
    // Trimmed: a pasted or autofilled address often carries a trailing space,
    // which Supabase rejects as an invalid email.
    const address = email.trim();
    const result =
      mode === 'in'
        ? await supabase.auth.signInWithPassword({ email: address, password })
        : await supabase.auth.signUp({
            email: address,
            password,
            // Without this the confirmation link goes to the project's default
            // site URL, which is the course — a new Pro user would confirm
            // their address and land somewhere else. Supabase only honours it
            // if this origin is on the project's redirect allow-list.
            options: { emailRedirectTo: `${window.location.origin}${proHref(lang, 'signin')}` },
          });
    setBusy(false);

    if (result.error) {
      // Supabase answers in English prose; the course's classifier turns that
      // into a cause, which is then said in the reader's language.
      setError(t.authErrors[classifyAuthError(result.error.message, result.error.status)]);
      return;
    }
    if (mode === 'up' && !result.data.session) {
      setNotice(t.checkEmail);
      setMode('in');
      return;
    }
    router.replace(proHref(lang));
    router.refresh();
  }

  return (
    <form className="form" onSubmit={submit}>
      {notice && <p className="notice">{notice}</p>}

      <label htmlFor="email">{t.email}</label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        required
        dir="ltr"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">{t.password}</label>
      <input
        id="password"
        type="password"
        autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
        required
        dir="ltr"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button className="btn btn-primary" type="submit" disabled={busy}>
        {mode === 'in' ? t.signInAction : t.signUpAction}
      </button>

      <button
        type="button"
        className="linklike"
        onClick={() => {
          setMode(mode === 'in' ? 'up' : 'in');
          setError(null);
        }}
      >
        {mode === 'in' ? t.signInSwitchToUp : t.signInSwitchToIn}
      </button>
    </form>
  );
}
