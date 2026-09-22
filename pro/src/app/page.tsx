import { sizePosition } from '@course/lib/sizing';

/**
 * Placeholder front page. Its only job this step is to prove the wiring: Pro
 * renders with the course's tokens and calls the course's arithmetic, from a
 * separate app and a separate deploy.
 */
export default function Page() {
  const example = sizePosition({ balance: 5000, riskPct: 1, stopPips: 35, pipValue: 10 });

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '64px 16px' }}>
      <h1 style={{ fontSize: '1.75rem' }}>Trading et al. Pro</h1>
      <p style={{ color: 'var(--ink-secondary)' }}>
        Phase 1 scaffold. Shares the course&rsquo;s palette, type and arithmetic.
      </p>
      <p>
        A 5,000 account risking 1% on a 35-pip stop:{' '}
        <strong className="num">{example.lots.toFixed(2)}</strong> lots.
      </p>
    </main>
  );
}
