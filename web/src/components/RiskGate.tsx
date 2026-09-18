import { AlertTriangle, Languages } from 'lucide-react';
import Logo from './Logo';
import { useStrings, type Lang } from '../lib/i18n';

interface Props {
  lang: Lang;
  onAcknowledge: () => void;
  onSwitchLang: () => void;
}

function RiskGate({ lang, onAcknowledge, onSwitchLang }: Props) {
  const { t } = useStrings(lang);

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate-card">
        <div className="gate-logo">
          <Logo variant="primary" size={180} />
        </div>

        <div className="gate-kicker">
          <AlertTriangle size={14} />
          {t.gateKicker}
        </div>

        <h1 id="gate-title">{t.gateTitle}</h1>

        <div className="gate-stat">
          <div className="gate-stat-num">{t.gateStatNum}</div>
          <p className="gate-stat-text">{t.gateStatText}</p>
        </div>

        <ul className="gate-list">
          <li>
            <strong>{t.gateP1a}</strong>
            {t.gateP1b}
          </li>
          <li>
            <strong>{t.gateP2a}</strong>
            {t.gateP2b}
          </li>
          <li>
            <strong>{t.gateP3a}</strong>
            {t.gateP3b}
          </li>
          <li>
            <strong>{t.gateP4a}</strong>
            {t.gateP4b}
          </li>
        </ul>

        <div className="gate-actions">
          <button className="btn btn-primary" onClick={onAcknowledge}>
            {t.gateButton}
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

export default RiskGate;
