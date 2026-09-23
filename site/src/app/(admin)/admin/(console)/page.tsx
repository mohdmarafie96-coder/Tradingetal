import Link from 'next/link';
import { requireAdmin, when, money } from '@/admin/guard';
import { QuickDecision } from '@/admin/actions';

export default async function Overview() {
  const { supabase } = await requireAdmin();
  const [{ data: o }, { data: requests }, { data: settings }] = await Promise.all([
    supabase.rpc('admin_overview'),
    supabase.rpc('admin_requests'),
    supabase.from('site_settings').select('key, value'),
  ]);
  const byKey = new Map((settings ?? []).map((s) => [s.key, s.value]));
  const price = byKey.get('pro_price') as { amount: number | null } | undefined;
  const ins = byKey.get('payment_instructions') as { en?: string; ar?: string } | undefined;
  const revenue = Object.entries((o?.revenue ?? {}) as Record<string, number>);

  return (
    <>
      <h1 className="console-title">Overview</h1>

      {(price?.amount == null || !ins?.en || !ins?.ar) && (
        <p className="notice-warn">
          Students cannot see how to pay yet:{' '}
          {[price?.amount == null && 'no price', !ins?.en && 'no English instructions', !ins?.ar && 'no Arabic instructions']
            .filter(Boolean)
            .join(', ')}
          . <Link href="/admin/settings">Set them in Settings</Link>.
        </p>
      )}

      <div className="stat-grid">
        <Stat label="Users" value={o?.users} sub={`${o?.users_7d ?? 0} in the last 7 days`} />
        <Stat label="Pro members" value={o?.pro_active} />
        <Stat label="Awaiting approval" value={o?.requests} tone={o?.requests ? 'accent' : undefined} />
        <Stat
          label="Payments received"
          value={revenue.length ? revenue.map(([c, v]) => money(v, c)).join(' · ') : '—'}
        />
        <Stat label="Quiz attempts" value={o?.quiz_attempts} />
        <Stat label="Journal trades" value={o?.trades} />
      </div>

      <h2 className="console-sub">Awaiting approval</h2>
      {requests && requests.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Payment reference</th>
              <th>Requested</th>
              <th>Recorded paid</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {requests.map((r: { user_id: string; email: string; payment_reference: string | null; requested_at: string; paid: number }) => (
              <tr key={r.user_id}>
                <td>
                  <Link href={`/admin/users/${r.user_id}`}>{r.email}</Link>
                </td>
                <td className="num">{r.payment_reference ?? '—'}</td>
                <td>{when(r.requested_at)}</td>
                <td className="num">{Number(r.paid) > 0 ? Number(r.paid).toFixed(2) : 'none yet'}</td>
                <td>
                  <QuickDecision userId={r.user_id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty">No requests waiting.</p>
      )}
      <p className="hint">
        Check the money has arrived before approving. To record the amount, open the user and use Record payment.
      </p>
    </>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: unknown; sub?: string; tone?: 'accent' }) {
  return (
    <div className={`stat${tone ? ` stat-${tone}` : ''}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value num">{value === undefined || value === null ? '—' : String(value)}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
