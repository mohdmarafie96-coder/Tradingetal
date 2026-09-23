'use client';

import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function AdminSignOut() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="linklike"
      onClick={async () => {
        await supabaseBrowser().auth.signOut();
        router.replace('/admin/login');
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}
