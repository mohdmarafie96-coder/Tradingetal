import { redirect } from 'next/navigation';
import { currentUser, supabaseServer } from '@/lib/supabase/server';

/**
 * Every console page starts here. Signed out goes to the admin login; signed in
 * but not an admin gets nothing. The database checks again inside every admin
 * function, so this is the first lock on the door, not the only one.
 */
export async function requireAdmin() {
  const user = await currentUser();
  if (!user) redirect('/admin/login');
  const supabase = await supabaseServer();
  const { data } = await supabase.rpc('is_admin');
  if (data !== true) redirect('/admin/login?denied=1');
  return { user, supabase };
}

export function when(value: string | null | undefined): string {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }) + ' UTC';
}

export function money(amount: number | string, currency: string): string {
  const n = typeof amount === 'string' ? Number(amount) : amount;
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}
