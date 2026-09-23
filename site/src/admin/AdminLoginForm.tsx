'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

/**
 * Username and password. The database confirms both before it names the
 * account's email (admin_login_email), then the ordinary Supabase sign-in runs
 * with that email and the same password. Nothing about the account is revealed
 * to someone who only knows the username.
 */
export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const supabase = supabaseBrowser();

    const { data: email, error: lookup } = await supabase.rpc('admin_login_email', {
      p_username: username,
      p_password: password,
    });

    if (lookup) {
      setBusy(false);
      setError(
        lookup.message.includes('locked')
          ? 'Too many attempts. Wait fifteen minutes and try again.'
          : 'Could not reach the server. Try again.',
      );
      return;
    }
    if (!email) {
      setBusy(false);
      setError('Username or password is incorrect.');
      return;
    }

    const { error: signIn } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signIn) {
      setError('Username or password is incorrect.');
      return;
    }
    router.replace('/admin');
    router.refresh();
  }

  return (
    <form className="form" onSubmit={submit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={busy}>
        Sign in
      </button>
    </form>
  );
}
