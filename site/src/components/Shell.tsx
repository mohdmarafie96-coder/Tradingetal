import Link from 'next/link';
import { courseHref, proHref } from '@/lib/paths';
import { DIR, LANG_LABEL, stringsFor, type Lang } from '@/lib/i18n';
import SignOutButton from './SignOutButton';

/**
 * The frame every signed-in page sits in. Kept server-side so the header knows
 * who is signed in without a loading flicker.
 */
export default function Shell({
  lang,
  email,
  children,
}: {
  lang: Lang;
  email?: string | null;
  children: React.ReactNode;
}) {
  const t = stringsFor(lang);
  const other: Lang = lang === 'en' ? 'ar' : 'en';

  return (
    <div className="shell" dir={DIR[lang]}>
      <header className="bar">
        <Link href={proHref(lang)} className="brand">
          <span>
            Trading <em>et al.</em>
          </span>
          <span className="brand-pro">Pro</span>
        </Link>
        <nav className="bar-nav">
          <a href={courseHref(lang)}>{t.backToCourse}</a>
          <Link href={proHref(other)} aria-label={t.switchLang}>
            {LANG_LABEL[other]}
          </Link>
          {email && <SignOutButton lang={lang} label={t.signOut} />}
        </nav>
      </header>

      <main className="main">{children}</main>

      <footer className="foot">
        <p>{t.notAdvice}</p>
      </footer>
    </div>
  );
}
