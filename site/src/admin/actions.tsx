'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

/**
 * The console's write controls. Each one calls an admin_* function; the
 * database refuses non-admins and records every change in the audit log.
 */

function useAction() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function run(fn: string, args: Record<string, unknown>) {
    setBusy(true);
    setError(null);
    const { error: err } = await supabaseBrowser().rpc(fn, args);
    setBusy(false);
    if (err) {
      setError(err.message);
      return false;
    }
    router.refresh();
    return true;
  }
  return { busy, error, run };
}

export function MembershipActions({ userId, status }: { userId: string; status: string | null }) {
  const { busy, error, run } = useAction();
  const [note, setNote] = useState('');
  const set = (s: 'active' | 'rejected' | 'revoked') =>
    run('admin_set_membership', { p_user: userId, p_status: s, p_note: note || null }).then(
      (ok) => ok && setNote(''),
    );

  return (
    <div className="action-block">
      <input
        className="inline-input"
        placeholder="Note (optional, shown in the audit log)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={1000}
      />
      <div className="action-row">
        {status !== 'active' && (
          <button className="btn btn-primary btn-sm" disabled={busy} onClick={() => set('active')}>
            Approve Pro
          </button>
        )}
        {status === 'requested' && (
          <button className="btn btn-sm" disabled={busy} onClick={() => set('rejected')}>
            Reject
          </button>
        )}
        {status === 'active' && (
          <button className="btn btn-danger btn-sm" disabled={busy} onClick={() => set('revoked')}>
            Revoke Pro
          </button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export function QuickDecision({ userId }: { userId: string }) {
  const { busy, error, run } = useAction();
  return (
    <span className="action-row">
      <button
        className="btn btn-primary btn-sm"
        disabled={busy}
        onClick={() => run('admin_set_membership', { p_user: userId, p_status: 'active', p_note: null })}
      >
        Approve
      </button>
      <button
        className="btn btn-sm"
        disabled={busy}
        onClick={() => run('admin_set_membership', { p_user: userId, p_status: 'rejected', p_note: null })}
      >
        Reject
      </button>
      {error && <span className="error-inline">{error}</span>}
    </span>
  );
}

export function RecordPayment({
  userId,
  currency,
  amount,
  reference,
}: {
  userId: string;
  currency: string;
  amount: number | null;
  reference: string | null;
}) {
  const { busy, error, run } = useAction();
  const [form, setForm] = useState({
    amount: amount != null ? String(amount) : '',
    currency,
    method: 'bank_transfer',
    reference: reference ?? '',
    note: '',
  });
  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = Number(form.amount);
    if (!Number.isFinite(value) || value < 0) return;
    const ok = await run('admin_record_payment', {
      p_user: userId,
      p_amount: value,
      p_currency: form.currency,
      p_method: form.method,
      p_reference: form.reference || null,
      p_note: form.note || null,
      p_paid_at: null,
    });
    if (ok) setForm({ ...form, note: '' });
  }

  return (
    <form className="grid-form" onSubmit={submit}>
      <label>
        Amount
        <input inputMode="decimal" required value={form.amount} onChange={upd('amount')} />
      </label>
      <label>
        Currency
        <input required maxLength={3} value={form.currency} onChange={upd('currency')} />
      </label>
      <label>
        Method
        <input required maxLength={40} value={form.method} onChange={upd('method')} />
      </label>
      <label>
        Reference
        <input maxLength={200} value={form.reference} onChange={upd('reference')} />
      </label>
      <label className="span-2">
        Note
        <input maxLength={1000} value={form.note} onChange={upd('note')} />
      </label>
      <div className="span-2 action-row">
        <button className="btn btn-primary btn-sm" disabled={busy} type="submit">
          Record payment
        </button>
        {error && <span className="error-inline">{error}</span>}
      </div>
    </form>
  );
}

export function DeletePayment({ paymentId }: { paymentId: string }) {
  const { busy, run } = useAction();
  return (
    <button
      className="linklike danger"
      disabled={busy}
      onClick={() => {
        if (window.confirm('Delete this payment record? The deletion is kept in the audit log.')) {
          run('admin_delete_payment', { p_payment: paymentId });
        }
      }}
    >
      Delete
    </button>
  );
}

export function SettingsForm({
  price,
  instructions,
}: {
  price: { amount: number | null; currency: string; period: string };
  instructions: { en?: string; ar?: string };
}) {
  const { busy, error, run } = useAction();
  const [saved, setSaved] = useState(false);
  const [p, setP] = useState({
    amount: price.amount != null ? String(price.amount) : '',
    currency: price.currency,
    period: price.period,
  });
  const [ins, setIns] = useState({ en: instructions.en ?? '', ar: instructions.ar ?? '' });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    const amount = p.amount.trim() === '' ? null : Number(p.amount);
    if (amount !== null && (!Number.isFinite(amount) || amount < 0)) return;
    const a = await run('admin_update_setting', {
      p_key: 'pro_price',
      p_value: { amount, currency: p.currency.trim().toUpperCase().slice(0, 3), period: p.period },
    });
    const b = a && (await run('admin_update_setting', { p_key: 'payment_instructions', p_value: ins }));
    setSaved(Boolean(a && b));
  }

  return (
    <form className="grid-form" onSubmit={submit}>
      <label>
        Price
        <input inputMode="decimal" placeholder="Not published" value={p.amount} onChange={(e) => setP({ ...p, amount: e.target.value })} />
      </label>
      <label>
        Currency
        <input maxLength={3} required value={p.currency} onChange={(e) => setP({ ...p, currency: e.target.value })} />
      </label>
      <label>
        Billed
        <select value={p.period} onChange={(e) => setP({ ...p, period: e.target.value })}>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
          <option value="once">Once</option>
        </select>
      </label>
      <span />
      <label className="span-2">
        Payment instructions — English
        <textarea rows={6} value={ins.en} onChange={(e) => setIns({ ...ins, en: e.target.value })} />
      </label>
      <label className="span-2">
        Payment instructions — Arabic
        <textarea rows={6} dir="rtl" lang="ar" value={ins.ar} onChange={(e) => setIns({ ...ins, ar: e.target.value })} />
      </label>
      <div className="span-2 action-row">
        <button className="btn btn-primary btn-sm" disabled={busy} type="submit">
          Save settings
        </button>
        {saved && <span className="ok-inline">Saved. Students see it on the upgrade page now.</span>}
        {error && <span className="error-inline">{error}</span>}
      </div>
    </form>
  );
}

export function InstrumentEditor({
  id,
  contractSize,
  pointSize,
  minLot,
  lotStep,
}: {
  id: string;
  contractSize: number;
  pointSize: number;
  minLot: number;
  lotStep: number;
}) {
  const { busy, error, run } = useAction();
  const [v, setV] = useState({
    contract_size: String(contractSize),
    point_size: String(pointSize),
    min_lot: String(minLot),
    lot_step: String(lotStep),
  });
  const dirty =
    Number(v.contract_size) !== contractSize ||
    Number(v.point_size) !== pointSize ||
    Number(v.min_lot) !== minLot ||
    Number(v.lot_step) !== lotStep;

  return (
    <>
      {(['contract_size', 'point_size', 'min_lot', 'lot_step'] as const).map((k) => (
        <td key={k}>
          <input className="cell-input num" inputMode="decimal" value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
        </td>
      ))}
      <td>
        <button
          className="btn btn-sm"
          disabled={busy || !dirty}
          onClick={() =>
            run('admin_update_instrument', {
              p_id: id,
              p_fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, Number(x)])),
            })
          }
        >
          Save
        </button>
        {error && <span className="error-inline">{error}</span>}
      </td>
    </>
  );
}
