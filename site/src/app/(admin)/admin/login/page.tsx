import { redirect } from 'next/navigation';
import { currentUser, supabaseServer } from '@/lib/supabase/server';
import AdminLoginForm from '@/admin/AdminLoginForm';

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const { denied } = await searchParams;
  const user = await currentUser();
  if (user && !denied) {
    const supabase = await supabaseServer();
    const { data } = await supabase.rpc('is_admin');
    if (data === true) redirect('/admin');
  }

  return (
    <main className="admin-login">
      <div className="panel panel-narrow">
        <p className="admin-kicker">Trading et al.</p>
        <h1>Admin</h1>
        {denied && (
          <p className="notice-warn">
            That account is not an admin. Sign in with the admin username.
          </p>
        )}
        <AdminLoginForm />
      </div>
    </main>
  );
}
