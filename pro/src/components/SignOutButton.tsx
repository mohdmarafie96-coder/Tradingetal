'use client';

import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import type { Lang } from '@/lib/i18n';

export default function SignOutButton({ lang, label }: { lang: Lang; label: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="linklike"
      onClick={async () => {
        await supabaseBrowser().auth.signOut();
        router.replace(`/${lang}/signin`);
        router.refresh();
      }}
    >
      {label}
    </button>
  );
}
