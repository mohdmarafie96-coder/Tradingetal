import { useState, type FormEvent } from 'react';
import { AlertTriangle, ArrowLeft, Languages, Mail } from 'lucide-react';
import Logo from './Logo';
import { GOOGLE_ENABLED } from '../lib/supabase';
import { useStrings, type Lang } from '../lib/i18n';
import type { AuthError } from '../lib/auth';

interface Props {
  lang: Lang;
  busy: boolean;
  error: AuthError;
  awaitingConfirmation: boolean;
  /** Which tab opens first: the sign-up link on the home page opens "up". */
  initialMode: 'in' | 'up';
  /** Why the reader is here, when they arrived by following a course link. */
  prompt: string | null;
  onSignIn: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
  onGoogle: () => void;
  onSwitchLang: () => void;
  onClearError: () => void;
  onHome: () => void;
}

/**
 * The public face of the course. Everything past this point needs an account,
 * so the loss statistic every regulator requires a broker to publish is stated
 * here, where a visitor reads it before deciding to sign up — not behind the
 * account where only enrolled readers would ever see it.
 */
function SignIn({
  lang,
  busy,
  error,
  awaitingConfirmation,
  initialMode,
  prompt,
  onSignIn,
  onSignUp,
  onGoogle,
  onSwitchLang,
  onClearError,
  onHome,
}: Props) {
  const { t } = useStrings(lang);
  const [mode, setMode] = useState<'in' | 'up'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const messages: Record<NonNullable<AuthError>, string> = {
    'bad-credentials': t.errBadCredentials,
    'already-registered': t.errAlreadyRegistered,
    'weak-password': t.errWeakPassword,
    'invalid-email': t.errInvalidEmail,
    'rate-limited': t.errRateLimited,
    'provider-disabled': t.errProviderDisabled,
    network: t.errNetwork,
    failed: t.errFailed,
  };

  const switchMode = (next: 'in' | 'up') => {
    setMode(next);
    onClearError();
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) return;
    if (mode === 'in') onSignIn(email, password);
    else onSignUp(email, password);
  };

  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-logo">
          <Logo variant="primary" size={180} />
        </div>

        <div className="gate-kicker">
          <AlertTriangle size={14} />
          {t.gateKicker}
        </div>

        <h1>{t.heroTitle}</h1>

        {prompt && <p className="signin-prompt">{prompt}</p>}

        <div className="gate-stat">
          <div className="gate-stat-num">{t.gateStatNum}</div>
          <p className="gate-stat-text">{t.gateStatText}</p>
        </div>

        <p className="gate-lede">{t.signInLede}</p>

        <div className="signin-why">
          <div className="signin-why-head">{t.signInWhyTitle}</div>
          <ul>
            <li>{t.signInWhy1}</li>
            <li>{t.signInWhy2}</li>
            <li>{t.signInWhy3}</li>
          </ul>
        </div>

        {awaitingConfirmation ? (
          <div className="signin-confirm" role="status">
            <Mail size={18} />
            <div>
              <strong>{t.authConfirmTitle}</strong>
              <p>{t.authConfirmBody}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="signin-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={mode === 'in'}
                className={mode === 'in' ? 'is-active' : undefined}
                onClick={() => switchMode('in')}
              >
                {t.authTabSignIn}
              </button>
              <button
                role="tab"
                aria-selected={mode === 'up'}
                className={mode === 'up' ? 'is-active' : undefined}
                onClick={() => switchMode('up')}
              >
                {t.authTabSignUp}
              </button>
            </div>

            <form className="signin-form" onSubmit={submit}>
              <label className="field">
                <span className="field-label">{t.authEmail}</span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="field">
                <span className="field-label">{t.authPassword}</span>
                <input
                  type="password"
                  autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {mode === 'up' && <span className="field-hint">{t.authPasswordHint}</span>}
              </label>

              {error && (
                <p className="signin-error" role="alert">
                  {messages[error]}
                </p>
              )}

              <button className="btn btn-primary btn-wide" type="submit" disabled={busy}>
                {busy ? t.signInBusy : mode === 'in' ? t.authSubmitSignIn : t.authSubmitSignUp}
              </button>
            </form>

            <button className="signin-switch" onClick={() => switchMode(mode === 'in' ? 'up' : 'in')}>
              {mode === 'in' ? t.authSwitchToSignUp : t.authSwitchToSignIn}
            </button>

            <div className="signin-divider">
              <span>{t.authOr}</span>
            </div>

            <button
              className="btn btn-wide"
              onClick={onGoogle}
              disabled={!GOOGLE_ENABLED || busy}
              title={GOOGLE_ENABLED ? undefined : t.authGoogleSoon}
            >
              <GoogleMark />
              {t.authGoogle}
            </button>
            {!GOOGLE_ENABLED && <p className="signin-providers">{t.authGoogleSoon}</p>}
          </>
        )}

        <div className="gate-actions signin-lang">
          <button className="btn" onClick={onHome}>
            <ArrowLeft size={16} />
            {t.landBackHome}
          </button>
          <button className="btn" onClick={onSwitchLang}>
            <Languages size={16} />
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <p className="gate-foot">{t.gateFoot}</p>
      </div>
    </div>
  );
}

/** Google's mark, inline so the button does not depend on a remote asset. */
function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

export default SignIn;
