import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/supabase/server';
import { stringsFor, type Lang } from '@/lib/i18n';
import Shell from '@/components/Shell';
import SignInForm from '@/components/SignInForm';

export default async function SignInPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  if (await currentUser()) redirect(`/${lang}`);

  const t = stringsFor(lang);
  return (
    <Shell lang={lang}>
      <div className="panel panel-narrow">
        <h1>{t.signInTitle}</h1>
        <p className="lede">{t.signInLede}</p>
        <p className="note">{t.courseAccountNote}</p>
        <SignInForm lang={lang} />
      </div>
    </Shell>
  );
}
