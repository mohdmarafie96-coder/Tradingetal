import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIR, isLang, type Lang } from '@/lib/i18n';
import { courseHref } from '@/lib/paths';
import { POLICY, UPDATED } from '@/lib/privacy';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: `${POLICY[lang].title} · Trading et al.`,
    alternates: { languages: { en: '/privacy/en', ar: '/privacy/ar' } },
  };
}

/** Static: the policy is the same for everyone and needs no sign-in. */
export const dynamic = 'force-static';

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const p = POLICY[lang];
  const other: Lang = lang === 'en' ? 'ar' : 'en';

  return (
    <div className="shell" dir={DIR[lang]}>
      <header className="bar">
        <a href={courseHref(lang)} className="brand">
          <span>
            Trading <em>et al.</em>
          </span>
        </a>
        <nav className="bar-nav">
          <a href={courseHref(lang)}>{p.backToCourse}</a>
          <a href={`/privacy/${other}`} hrefLang={other}>
            {p.switchLang}
          </a>
        </nav>
      </header>

      <main className="main">
        <article className="legal">
          <h1>{p.title}</h1>
          <p className="legal-updated">
            {p.updatedLabel}: <time dateTime={UPDATED}>{p.updated}</time>
          </p>
          {p.intro.map((text) => (
            <p key={text}>{text}</p>
          ))}

          {p.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              )}
              {section.after?.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}
