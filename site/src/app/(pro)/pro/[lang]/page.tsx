import { redirect } from 'next/navigation';
import { currentUser, supabaseServer } from '@/lib/supabase/server';
import { stringsFor, type Lang } from '@/lib/i18n';
import Shell from '@/components/Shell';
import { proHref } from '@/lib/paths';

export default async function Dashboard({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const user = await currentUser();
  if (!user) redirect(proHref(lang, 'signin'));

  const t = stringsFor(lang);
  const supabase = await supabaseServer();

  // The profile row is created here rather than by a trigger on auth.users, so
  // that a fault in Pro can never stop someone signing up for the free course.
  await supabase.from('profiles').upsert({ id: user.id, lang }, { onConflict: 'id' });

  const { data: accounts } = await supabase
    .from('trading_accounts')
    .select('id, name, currency, balance, leverage, default_risk_pct')
    .order('created_at');

  return (
    <Shell lang={lang} email={user.email}>
      <div className="panel">
        <h1>{t.dashboardTitle}</h1>
        {accounts && accounts.length > 0 ? (
          <ul>
            {accounts.map((a) => (
              <li key={a.id}>
                {a.name} — <span className="num">{a.balance}</span> {a.currency}
              </li>
            ))}
          </ul>
        ) : (
          <p className="note">{t.noAccountYet}</p>
        )}
      </div>
    </Shell>
  );
}
