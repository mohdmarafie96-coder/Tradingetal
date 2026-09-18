import { AlertTriangle, Languages, LogIn } from 'lucide-react';
import Logo from './Logo';
import { useStrings, type Lang } from '../lib/i18n';
import type { SignInError } from '../lib/auth';

interface Props {
  lang: Lang;
  busy: boolean;
  error: SignInError;
  onSignIn: () => void;
  onSwitchLang: () => void;
}

/**
 * The public face of the course. Everything past this point needs an account,
 * so the loss statistic every regulator requires a broker to publish is stated
 * here, where a visitor reads it before deciding to sign in — not behind the
 * account where only enrolled readers would ever see it.
 */
function SignIn({ lang, busy, error, onSignIn, onSwitchLang }: Props) {
  const { t } = useStrings(lang);

  const message =
    error === 'blocked'
      ? t.signInBlocked
      : error === 'closed'
        ? t.signInClosed
        : error === 'failed'
          ? t.signInFailed
          : null;

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

        {message && (
          <p className="signin-error" role="alert">
            {message}
          </p>
        )}

        <div className="gate-actions">
          <button className="btn btn-primary" onClick={onSignIn} disabled={busy}>
            <LogIn size={16} />
            {busy ? t.signInBusy : error ? t.signInRetry : t.signInButton}
          </button>
          <button className="btn" onClick={onSwitchLang}>
            <Languages size={16} />
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <p className="signin-providers">{t.signInProviders}</p>
        <p className="gate-foot">{t.gateFoot}</p>
      </div>
    </div>
  );
}

export default SignIn;
