import { stringsFor, type Lang } from '@/lib/i18n';
import { formatAmount, type Access } from '@/lib/membership';
import RequestProForm from './RequestProForm';

/**
 * What a signed-in reader without Pro sees instead of Pro: the price, how to
 * pay, and a form to quote their payment reference. Once they have asked, it
 * says so and waits for the admin.
 */
export default function Upgrade({ lang, access }: { lang: Lang; access: Access }) {
  const t = stringsFor(lang);
  const { status, reference, price, instructions } = access;

  if (status === 'requested') {
    return (
      <div className="panel panel-narrow">
        <h1>{t.pendingTitle}</h1>
        <p className="lede">{t.pendingBody}</p>
        {reference && (
          <p className="note">
            {t.yourReference}: <span className="num">{reference}</span>
          </p>
        )}
        <RequestProForm lang={lang} initial={reference ?? ''} label={t.updateReference} />
      </div>
    );
  }

  return (
    <div className="panel panel-narrow">
      <h1>{t.upgradeTitle}</h1>
      <p className="lede">{t.upgradeLede}</p>

      {status === 'rejected' && <p className="notice-warn">{t.rejectedNote}</p>}
      {status === 'revoked' && <p className="notice-warn">{t.revokedNote}</p>}

      <dl className="facts">
        <div>
          <dt>{t.priceLabel}</dt>
          <dd>
            {price.amount != null ? (
              <>
                <span className="num price">{formatAmount(price.amount, price.currency)}</span>{' '}
                {t.pricePer[price.period] ?? ''}
              </>
            ) : (
              <span className="muted">{t.priceUnset}</span>
            )}
          </dd>
        </div>
      </dl>

      <h2 className="subhead">{t.howToPay}</h2>
      {instructions ? (
        <p className="instructions">{instructions}</p>
      ) : (
        <p className="note">{t.noInstructions}</p>
      )}

      <RequestProForm lang={lang} initial="" label={t.requestAction} />
    </div>
  );
}
