import Link from 'next/link';
import { headers } from 'next/headers';
import { isLang, stringsFor, type Lang } from '@/lib/i18n';
import Shell from '@/components/Shell';

/**
 * Rendered inside the language root layout, so a missing page keeps the
 * brand, the direction and the reader's language instead of falling through to
 * Next's unstyled English default. not-found receives no params, so the
 * language is read back from the path.
 */
export default async function NotFound() {
  const path = (await headers()).get('x-pathname') ?? '';
  const first = path.split('/')[1] ?? '';
  const lang: Lang = isLang(first) ? first : 'en';
  const t = stringsFor(lang);

  return (
    <Shell lang={lang}>
      <div className="panel panel-narrow">
        <h1>{t.notFoundTitle}</h1>
        <p className="lede">{t.notFoundBody}</p>
        <Link className="btn btn-primary" href={`/${lang}`}>
          {t.notFoundHome}
        </Link>
      </div>
    </Shell>
  );
}
