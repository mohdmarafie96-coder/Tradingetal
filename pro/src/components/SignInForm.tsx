'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import { stringsFor, type Lang } from '@/lib/i18n';

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
    const result =
      mode === 'in'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setBusy(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (mode === 'up' && !result.data.session) {
      setNotice(t.checkEmail);
      setMode('in');
      return;
    }
    router.replace(`/${lang}`);
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
