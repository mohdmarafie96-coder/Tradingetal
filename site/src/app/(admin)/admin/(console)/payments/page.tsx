import Link from 'next/link';
import { requireAdmin, when, money } from '@/admin/guard';
import { DeletePayment } from '@/admin/actions';

interface Row {
  id: string;
  user_id: string;
  email: string;
  amount: number;
  currency: string;
  method: string;
  reference: string | null;
  note: string | null;
  paid_at: string;
  recorded_by: string | null;
}

export default async function Payments() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.rpc('admin_payments', { p_limit: 500 });
  const rows = (data ?? []) as Row[];
  const totals = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.currency] = (acc[r.currency] ?? 0) + Number(r.amount);
    return acc;
  }, {});

  return (
    <>
      <h1 className="console-title">Payments</h1>
      <p className="hint">
        Total: {Object.keys(totals).length ? Object.entries(totals).map(([c, v]) => money(v, c)).join(' · ') : '—'}.
        To record a payment, open the user it belongs to.
      </p>
      {rows.length > 0 ? (
        <table className="table">
          <thead>
            <tr><th>Paid</th><th>User</th><th>Amount</th><th>Method</th><th>Reference</th><th>Note</th><th>Recorded by</th><th /></tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{when(p.paid_at)}</td>
                <td><Link href={`/admin/users/${p.user_id}`}>{p.email}</Link></td>
                <td className="num">{money(p.amount, p.currency)}</td>
                <td>{p.method}</td>
                <td className="num">{p.reference ?? '—'}</td>
                <td>{p.note ?? ''}</td>
                <td>{p.recorded_by ?? '—'}</td>
                <td><DeletePayment paymentId={p.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty">No payments recorded yet.</p>
      )}
    </>
  );
}
