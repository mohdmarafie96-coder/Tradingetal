import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lang } from '@/lib/i18n';

export type MembershipStatus = 'requested' | 'active' | 'rejected' | 'revoked' | null;

export interface Price {
  amount: number | null;
  currency: string;
  period: 'month' | 'year' | 'once';
}

export interface Access {
  /** True for approved members and for admins. Decided by the database. */
  hasPro: boolean;
  status: MembershipStatus;
  reference: string | null;
  price: Price;
  instructions: string;
}

/**
 * Everything the Pro gate and the upgrade page need, read as the signed-in user.
 *
 * has_pro() is the single source of truth: it is the same check the database
 * would apply, so the page cannot disagree with it.
 */
export async function readAccess(supabase: SupabaseClient, lang: Lang): Promise<Access> {
  const [pro, membership, settings] = await Promise.all([
    supabase.rpc('has_pro'),
    supabase.from('memberships').select('status, payment_reference').maybeSingle(),
    supabase.from('site_settings').select('key, value'),
  ]);

  const byKey = new Map((settings.data ?? []).map((row) => [row.key as string, row.value]));
  const price = (byKey.get('pro_price') ?? { amount: null, currency: 'USD', period: 'month' }) as Price;
  const instructions = (byKey.get('payment_instructions') ?? {}) as Partial<Record<Lang, string>>;

  return {
    hasPro: pro.data === true,
    status: (membership.data?.status ?? null) as MembershipStatus,
    reference: membership.data?.payment_reference ?? null,
    price,
    // Fall back to the other language rather than showing nothing.
    instructions: instructions[lang] || instructions[lang === 'en' ? 'ar' : 'en'] || '',
  };
}

/** Formats a price with Western digits, as broker platforms do in both editions. */
export function formatAmount(amount: number, currency: string): string {
  const figure = amount.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${figure} ${currency}`;
}
