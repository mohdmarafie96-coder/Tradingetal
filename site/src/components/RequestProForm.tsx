'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import { stringsFor, type Lang } from '@/lib/i18n';

/**
 * Sends the payment reference through request_pro(). The database decides what
 * that means — a user cannot mark themselves active from here or anywhere else.
 */
export default function RequestProForm({
  lang,
  initial,
  label,
}: {
  lang: Lang;
  initial: string;
  label: string;
}) {
  const t = stringsFor(lang);
  const router = useRouter();
  const [reference, setReference] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await supabaseBrowser().rpc('request_pro', {
      p_reference: reference.trim().slice(0, 200),
    });
    setBusy(false);
    if (err) {
      setError(t.requestFailed);
      return;
    }
    router.refresh();
  }

  return (
    <form className="form" onSubmit={submit}>
      <label htmlFor="reference">{t.referenceLabel}</label>
      <input
        id="reference"
        dir="ltr"
        maxLength={200}
        autoComplete="off"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
      />
      <span className="hint">{t.referenceHint}</span>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {label}
      </button>
    </form>
  );
}
