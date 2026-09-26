import { useState, type FormEvent } from 'react';
import { Check, TriangleAlert } from 'lucide-react';
import Logo from './Logo';
import { useStrings, type Lang } from '../lib/i18n';
import type { DeleteError } from '../lib/auth';

interface Props {
  lang: Lang;
  busy: boolean;
  error: DeleteError;
  /** The account's address, which the reader types back to confirm. */
  email: string;
  onDelete: (confirmEmail: string) => void;
  onCancel: () => void;
}

/**
 * Deletes the signed-in reader's account, after they type its email address.
 * The database checks the address again and does the deleting
 * (delete_own_account), so this screen only asks.
 */
function DeleteAccount({ lang, busy, error, email, onDelete, onCancel }: Props) {
  const { t } = useStrings(lang);
  const [typed, setTyped] = useState('');
  const matches = typed.trim().toLowerCase() === email.toLowerCase();

  const messages: Record<NonNullable<DeleteError>, string> = {
    mismatch: t.deleteMismatch,
    admin: t.deleteAdmin,
    network: t.errNetwork,
    failed: t.errFailed,
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (matches && !busy) onDelete(typed);
  };

  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-logo">
          <Logo variant="primary" size={180} />
        </div>

        <h1>{t.deleteTitle}</h1>

        <form className="signin-form" onSubmit={submit}>
          <div className="delete-warning" role="note">
            <TriangleAlert size={18} />
            <p>{t.deleteLede}</p>
          </div>
          <p className="signin-reset-lede">{t.deleteKept}</p>

          <label className="field">
            <span className="field-label">{t.deleteConfirmLabel}</span>
            <input
              type="email"
              autoComplete="off"
              spellCheck={false}
              dir="ltr"
              placeholder={email}
              required
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
            />
          </label>

          {error && (
            <p className="signin-error" role="alert">
              {messages[error]}
            </p>
          )}

          <button className="btn btn-danger btn-wide" type="submit" disabled={!matches || busy}>
            {busy ? t.signInBusy : t.deleteSubmit}
          </button>

          <button type="button" className="signin-switch" onClick={onCancel}>
            {t.changePasswordCancel}
          </button>
        </form>
      </div>
    </div>
  );
}

/** Shown once the account is gone and the reader has been signed out. */
export function AccountDeleted({ lang, onHome }: { lang: Lang; onHome: () => void }) {
  const { t } = useStrings(lang);
  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-logo">
          <Logo variant="primary" size={180} />
        </div>
        <h1>{t.deleteDoneTitle}</h1>
        <div className="signin-confirm" role="status">
          <Check size={18} />
          <div>
            <p>{t.deleteDoneBody}</p>
          </div>
        </div>
        <button className="btn btn-primary btn-wide signin-continue" onClick={onHome}>
          {t.landBackHome}
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
