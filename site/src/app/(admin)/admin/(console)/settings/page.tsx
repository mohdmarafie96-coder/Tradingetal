import { requireAdmin } from '@/admin/guard';
import { SettingsForm } from '@/admin/actions';

export default async function Settings() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from('site_settings').select('key, value');
  const byKey = new Map((data ?? []).map((s) => [s.key, s.value]));
  const price = (byKey.get('pro_price') ?? { amount: null, currency: 'USD', period: 'month' }) as {
    amount: number | null;
    currency: string;
    period: string;
  };
  const instructions = (byKey.get('payment_instructions') ?? {}) as { en?: string; ar?: string };

  return (
    <>
      <h1 className="console-title">Settings</h1>
      <p className="hint">
        What students see on the upgrade page. Write the instructions exactly as they should read — bank name,
        account, IBAN, what to put in the transfer reference. Leave the price empty to hide it.
      </p>
      <section className="card">
        <SettingsForm price={price} instructions={instructions} />
      </section>
    </>
  );
}
