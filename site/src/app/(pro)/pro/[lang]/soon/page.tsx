import { redirect } from 'next/navigation';
import { stringsFor, type Lang } from '@/lib/i18n';
import { PRO_OPEN } from '@/lib/launch';
import { courseHref, proHref } from '@/lib/paths';
import Shell from '@/components/Shell';

/**
 * What everyone but an admin sees at any Pro address while Pro is not open.
 * The proxy rewrites to this page, so the address bar keeps the address that
 * was asked for.
 */
export default async function ComingSoon({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  if (PRO_OPEN) redirect(proHref(lang));

  const t = stringsFor(lang);
  return (
    <Shell lang={lang}>
      <div className="panel panel-narrow">
        <p className="soon-kicker">{t.soonKicker}</p>
        <h1>{t.soonTitle}</h1>
        <p className="lede">{t.soonLede}</p>
        <p className="note">{t.soonNote}</p>
        <a className="btn btn-primary" href={courseHref(lang)}>
          {t.soonAction}
        </a>
      </div>
    </Shell>
  );
}
