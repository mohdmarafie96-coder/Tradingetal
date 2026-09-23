import { requireAdmin, when } from '@/admin/guard';

interface Row {
  at: string;
  admin: string | null;
  action: string;
  target_email: string | null;
  details: unknown;
}

export default async function Audit() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.rpc('admin_audit_log', { p_limit: 500 });
  const rows = (data ?? []) as Row[];

  return (
    <>
      <h1 className="console-title">Audit log</h1>
      <p className="hint">Every change made from this console, newest first. Entries cannot be edited or deleted.</p>
      {rows.length > 0 ? (
        <table className="table">
          <thead><tr><th>When</th><th>Admin</th><th>Action</th><th>User</th><th>Details</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{when(r.at)}</td>
                <td>{r.admin ?? '—'}</td>
                <td>{r.action}</td>
                <td>{r.target_email ?? '—'}</td>
                <td className="num small">{JSON.stringify(r.details)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty">Nothing yet.</p>
      )}
    </>
  );
}
