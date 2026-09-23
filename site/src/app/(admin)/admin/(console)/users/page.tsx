import Link from 'next/link';
import { requireAdmin, when } from '@/admin/guard';
import StatusTag from '@/admin/StatusTag';

interface Row {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  confirmed: boolean;
  membership: string | null;
  is_admin: boolean;
  pages_done: number;
  quiz_attempts: number;
  trades: number;
}

export default async function Users({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.rpc('admin_users', { p_search: q ?? null });
  const rows = (data ?? []) as Row[];

  return (
    <>
      <h1 className="console-title">Users</h1>
      <form className="search-row" method="get">
        <input name="q" defaultValue={q ?? ''} placeholder="Search by email" aria-label="Search by email" />
        <button className="btn btn-sm" type="submit">
          Search
        </button>
        <span className="hint">{rows.length} shown</span>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Pro</th>
            <th>Lessons done</th>
            <th>Quizzes</th>
            <th>Trades</th>
            <th>Joined</th>
            <th>Last sign-in</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.id}>
              <td>
                <Link href={`/admin/users/${u.id}`}>{u.email}</Link>
                {u.is_admin && <span className="tag">admin</span>}
                {!u.confirmed && <span className="tag tag-muted">unconfirmed</span>}
              </td>
              <td>
                <StatusTag status={u.membership} />
              </td>
              <td className="num">{u.pages_done}</td>
              <td className="num">{u.quiz_attempts}</td>
              <td className="num">{u.trades}</td>
              <td>{when(u.created_at)}</td>
              <td>{when(u.last_sign_in_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
