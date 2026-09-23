import { redirect } from 'next/navigation';
import { currentUser, supabaseServer } from '@/lib/supabase/server';
import { proHref } from '@/lib/paths';
import type { Lang } from '@/lib/i18n';

/**
 * For every Pro page other than the dashboard: signed out goes to sign-in, and
 * signed in without Pro goes to the dashboard, which shows the upgrade page.
 */
export async function requirePro(lang: Lang) {
  const user = await currentUser();
  if (!user) redirect(proHref(lang, 'signin'));
  const supabase = await supabaseServer();
  const { data } = await supabase.rpc('has_pro');
  if (data !== true) redirect(proHref(lang));
  return { user, supabase };
}
