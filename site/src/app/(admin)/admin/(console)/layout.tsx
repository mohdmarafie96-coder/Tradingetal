import Link from 'next/link';
import { requireAdmin } from '@/admin/guard';
import AdminSignOut from '@/admin/AdminSignOut';

const NAV = [
  ['/admin', 'Overview'],
  ['/admin/users', 'Users'],
  ['/admin/payments', 'Payments'],
  ['/admin/settings', 'Settings'],
  ['/admin/instruments', 'Instruments'],
  ['/admin/audit', 'Audit log'],
] as const;

export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return (
    <div className="console">
      <aside className="console-nav">
        <div className="console-brand">
          Trading <em>et al.</em> <span className="brand-pro">Admin</span>
        </div>
        <nav>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="console-foot">
          <a href="/">View the site</a>
          <span className="console-who">{user.email}</span>
          <AdminSignOut />
        </div>
      </aside>
      <main className="console-main">{children}</main>
    </div>
  );
}
