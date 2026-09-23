import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import Logo from './Logo';
import { useStrings, type Lang } from '../lib/i18n';
import type { AuthError } from '../lib/auth';

interface Props {
  lang: Lang;
  busy: boolean;
  error: AuthError;
  done: boolean;
  /** 'reset' after a reset link; 'change' when a signed-in reader chose to. */
  mode: 'reset' | 'change';
  onSave: (password: string) => void;
  onContinue: () => void;
  /** Change mode only: leave without changing anything. */
  onCancel?: () => void;
}

/**
 * Sets a new password for the signed-in reader. It serves two routes in:
 * - a reset link, which has already signed the reader in;
 * - "Change password", for a reader who is signed in and wants a password,
 *   for instance one who has only ever used Google.
 */
function SetPassword({ lang, busy, error, done, mode, onSave, onContinue, onCancel }: Props) {
  const { t } = useStrings(lang);
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [mismatch, setMismatch] = useState(false);

  const messages: Record<NonNullable<AuthError>, string> = {
    'bad-credentials': t.errBadCredentials,
    'already-registered': t.errAlreadyRegistered,
    'weak-password': t.errWeakPassword,
    'same-password': t.errSamePassword,
    'invalid-email': t.errInvalidEmail,
    'rate-limited': t.errRateLimited,
    'provider-disabled': t.errProviderDisabled,
    network: t.errNetwork,
    failed: t.errFailed,
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (password !== again) {
      setMismatch(true);
      return;
    }
    setMismatch(false);
    onSave(password);
  };

  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-logo">
          <Logo variant="primary" size={180} />
        </div>

        <h1>
          {done
            ? t.newPasswordDoneTitle
            : mode === 'change'
              ? t.changePasswordTitle
              : t.newPasswordTitle}
        </h1>

        {done ? (
          <>
            <div className="signin-confirm" role="status">
              <Check size={18} />
              <div>
                <p>{t.newPasswordDoneBody}</p>
              </div>
            </div>
            <button className="btn btn-primary btn-wide signin-continue" onClick={onContinue}>
              {t.newPasswordContinue}
            </button>
          </>
        ) : (
          <form className="signin-form" onSubmit={submit}>
            <p className="signin-reset-lede">
              {mode === 'change' ? t.changePasswordLede : t.newPasswordLede}
            </p>

            <label className="field">
              <span className="field-label">{t.newPassword}</span>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="field-hint">{t.authPasswordHint}</span>
            </label>

            <label className="field">
              <span className="field-label">{t.newPasswordConfirm}</span>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={again}
                onChange={(e) => setAgain(e.target.value)}
              />
            </label>

            {(mismatch || error) && (
              <p className="signin-error" role="alert">
                {mismatch ? t.newPasswordMismatch : messages[error!]}
              </p>
            )}

            <button className="btn btn-primary btn-wide" type="submit" disabled={busy}>
              {busy ? t.signInBusy : t.newPasswordSubmit}
            </button>

            {onCancel && (
              <button type="button" className="signin-switch" onClick={onCancel}>
                {t.changePasswordCancel}
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default SetPassword;
