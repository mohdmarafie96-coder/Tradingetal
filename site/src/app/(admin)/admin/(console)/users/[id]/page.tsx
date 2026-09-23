import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin, when, money } from '@/admin/guard';
import { DeletePayment, MembershipActions, RecordPayment } from '@/admin/actions';
import StatusTag from '@/admin/StatusTag';

type J = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export default async function UserDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { supabase } = await requireAdmin();
  const [{ data: d }, { data: settings }] = await Promise.all([
    supabase.rpc('admin_user_detail', { p_user: id }),
    supabase.from('site_settings').select('value').eq('key', 'pro_price').maybeSingle(),
  ]);
  if (!d?.user) notFound();

  const u = d.user as J;
  const m = (d.membership ?? null) as J | null;
  const payments = d.payments as J[];
  const progress = d.progress as string[];
  const attempts = d.attempts as J[];
  const accounts = d.accounts as J[];
  const trades = d.trades as J[];
  const audit = d.audit as J[];
  const price = (settings?.value ?? { amount: null, currency: 'USD' }) as { amount: number | null; currency: string };

  return (
    <>
      <p className="crumb">
        <Link href="/admin/users">Users</Link> /
      </p>
      <h1 className="console-title">
        {u.email} {u.is_admin && <span className="tag">admin</span>}
      </h1>
      <dl className="kv">
        <div><dt>Joined</dt><dd>{when(u.created_at)}</dd></div>
        <div><dt>Last sign-in</dt><dd>{when(u.last_sign_in_at)}</dd></div>
        <div><dt>Email confirmed</dt><dd>{u.confirmed ? 'yes' : 'no'}</dd></div>
        <div><dt>Language</dt><dd>{u.lang ?? '—'}</dd></div>
        <div><dt>User id</dt><dd className="num small">{u.id}</dd></div>
      </dl>

      <section className="card">
        <h2 className="console-sub">Pro membership</h2>
        <dl className="kv">
          <div><dt>Status</dt><dd><StatusTag status={m?.status ?? null} /></dd></div>
          <div><dt>Payment reference</dt><dd className="num">{m?.payment_reference ?? '—'}</dd></div>
          <div><dt>Requested</dt><dd>{when(m?.requested_at)}</dd></div>
          <div><dt>Decided</dt><dd>{when(m?.decided_at)}</dd></div>
          {m?.note && <div><dt>Note</dt><dd>{m.note}</dd></div>}
        </dl>
        <MembershipActions userId={u.id} status={m?.status ?? null} />
      </section>

      <section className="card">
        <h2 className="console-sub">Payments</h2>
        {payments.length > 0 ? (
          <table className="table">
            <thead><tr><th>Paid</th><th>Amount</th><th>Method</th><th>Reference</th><th>Note</th><th /></tr></thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{when(p.paid_at)}</td>
                  <td className="num">{money(p.amount, p.currency)}</td>
                  <td>{p.method}</td>
                  <td className="num">{p.reference ?? '—'}</td>
                  <td>{p.note ?? ''}</td>
                  <td><DeletePayment paymentId={p.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty">No payments recorded.</p>
        )}
        <h3 className="console-sub3">Record a payment</h3>
        <RecordPayment userId={u.id} currency={price.currency} amount={price.amount} reference={m?.payment_reference ?? null} />
      </section>

      <section className="card">
        <h2 className="console-sub">Course</h2>
        <p className="hint">{progress.length} lessons marked complete.</p>
        {attempts.length > 0 ? (
          <table className="table">
            <thead><tr><th>Quiz</th><th>Score</th><th>Result</th><th>Taken</th></tr></thead>
            <tbody>
              {attempts.map((a, i) => (
                <tr key={i}>
                  <td className="num">{a.quiz_id}</td>
                  <td className="num">{a.correct}/{a.total} ({Math.round(Number(a.score) * 100)}%)</td>
                  <td><span className={`tag ${a.passed ? 'tag-active' : 'tag-rejected'}`}>{a.passed ? 'passed' : 'not passed'}</span></td>
                  <td>{when(a.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty">No quiz attempts.</p>
        )}
        {progress.length > 0 && (
          <details className="details">
            <summary>Lessons completed</summary>
            <p className="num small">{progress.join(' · ')}</p>
          </details>
        )}
      </section>

      <section className="card">
        <h2 className="console-sub">Trading accounts and journal</h2>
        {accounts.length > 0 ? (
          <table className="table">
            <thead><tr><th>Account</th><th>Balance</th><th>Leverage</th><th>Default risk</th></tr></thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}{a.is_default && <span className="tag">default</span>}</td>
                  <td className="num">{money(a.balance, a.currency)}</td>
                  <td className="num">1:{a.leverage}</td>
                  <td className="num">{a.default_risk_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty">No trading accounts.</p>
        )}
        {trades.length > 0 ? (
          <table className="table">
            <thead><tr><th>Opened</th><th>Symbol</th><th>Side</th><th>Lots</th><th>Entry</th><th>Stop</th><th>Close</th><th>Result</th></tr></thead>
            <tbody>
              {trades.map((t) => (
                <tr key={t.id}>
                  <td>{when(t.opened_at)}</td>
                  <td className="num">{t.symbol}</td>
                  <td>{t.direction}</td>
                  <td className="num">{t.lot_size}</td>
                  <td className="num">{t.entry_price}</td>
                  <td className="num">{t.stop_loss ?? <span className="warn-text">none</span>}</td>
                  <td className="num">{t.close_price ?? 'open'}</td>
                  <td className={`num ${Number(t.result_money) > 0 ? 'gain' : Number(t.result_money) < 0 ? 'loss' : ''}`}>
                    {t.result_money ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty">No trades logged.</p>
        )}
      </section>

      <section className="card">
        <h2 className="console-sub">Admin history for this user</h2>
        {audit.length > 0 ? (
          <table className="table">
            <thead><tr><th>When</th><th>Action</th><th>Details</th></tr></thead>
            <tbody>
              {audit.map((l, i) => (
                <tr key={i}>
                  <td>{when(l.at)}</td>
                  <td>{l.action}</td>
                  <td className="num small">{JSON.stringify(l.details)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty">No admin actions yet.</p>
        )}
      </section>
    </>
  );
}
