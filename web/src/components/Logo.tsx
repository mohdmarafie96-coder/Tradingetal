/**
 * Trading et al. logo, per the brand spec.
 *
 * Rendered inline rather than loaded from /logo so the mono variant can inherit
 * currentColor and the lockups need no extra request. The files in public/logo
 * are the exportable masters; these are the same geometry.
 *
 * Locked: the mark's corner radius is 14 at 64px (--radius-mark) and scales
 * proportionally. Do not set the wordmark in sans, and recolour the mark only
 * through --logo-plate / --logo-knockout, which the themes own.
 */

type Variant = 'primary' | 'stacked' | 'mark' | 'mono';

interface Props {
  variant?: Variant;
  /** Rendered width in px. Minimum 120 for the lockups, 16 for the mark. */
  size?: number;
  title?: string;
  className?: string;
}

// The mark is printed matter: an ink plate, a paper knockout, brass for the
// chart line. The plate and knockout swap in dark mode — the card is still
// paper at night, and an ink block on a near-black page is no block at all.
// Each is a token with the literal as its fallback, so the lockup still comes
// out right when it is exported, embedded in an email, or dropped on a
// background we do not own.
const PLATE = 'var(--logo-plate, #17130E)';
const KNOCKOUT = 'var(--logo-knockout, #FBF8F1)';
const BRASS = 'var(--brass, #B98B3C)';

function MarkShapes({ mono = false }: { mono?: boolean }) {
  const lineColor = mono ? 'currentColor' : KNOCKOUT;
  const chartColor = mono ? 'currentColor' : BRASS;
  return (
    <>
      {!mono && <rect width="64" height="64" rx="14" fill={PLATE} />}
      {mono && (
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      )}
      <g stroke={lineColor} strokeWidth="3" strokeLinecap="round">
        <line x1="16" y1="16" x2="48" y2="16" />
        <line x1="16" y1="23" x2="43" y2="23" />
        <line x1="16" y1="30" x2="36" y2="30" />
      </g>
      <polyline
        points="16,50 24,45 32,47 40,40 48,36"
        fill="none"
        stroke={chartColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** The wordmark is always latin and always left-to-right, including in Arabic. */
interface WordmarkProps {
  x: number;
  y: number;
  size: number;
  anchor?: 'middle';
}

function Wordmark({ x, y, size, anchor }: WordmarkProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      direction="ltr"
      fontFamily="'Newsreader',Georgia,serif"
      fontSize={size}
      fill="var(--ink)"
    >
      <tspan fontWeight="600">Trading</tspan>
      <tspan fontWeight="400" fontStyle="italic" dx={size * 0.28}>
        et al.
      </tspan>
    </text>
  );
}

function Logo({ variant = 'primary', size, title = 'Trading et al.', className }: Props) {
  const common = {
    role: 'img' as const,
    'aria-label': title,
    className,
    focusable: 'false' as const,
  };

  if (variant === 'mark' || variant === 'mono') {
    const w = size ?? 40;
    return (
      <svg {...common} width={w} height={w} viewBox="0 0 64 64">
        <MarkShapes mono={variant === 'mono'} />
      </svg>
    );
  }

  if (variant === 'stacked') {
    const w = size ?? 300;
    return (
      <svg {...common} width={w} height={(w * 168) / 340} viewBox="0 0 340 168">
        <g transform="translate(142 8) scale(0.875)">
          <MarkShapes />
        </g>
        <Wordmark x={170} y={112} size={34} anchor="middle" />
        <text
          x={170}
          y={140}
          textAnchor="middle"
          direction="ltr"
          fontFamily="'Inter Tight',system-ui,sans-serif"
          fontSize={13}
          fontWeight="500"
          letterSpacing="1.6"
          fill="var(--ink-secondary)"
        >
          MANUALS · CALCULATORS · RISK
        </text>
      </svg>
    );
  }

  const w = size ?? 200;
  return (
    <svg {...common} width={w} height={(w * 64) / 252} viewBox="0 0 252 64">
      <g transform="translate(0 10) scale(0.6875)">
        <MarkShapes />
      </g>
      <Wordmark x={60} y={42} size={29} />
    </svg>
  );
}

export default Logo;
