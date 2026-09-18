/**
 * Icon set. Tabler-style outline glyphs at one weight, per the brand spec's
 * module iconography table. Kept local so the whole set shares a stroke width
 * and nothing drifts toward a second visual language.
 */
interface IconProps {
  size?: number;
  className?: string;
}

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
    focusable: 'false' as const,
  };
}

export function BookOpen({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3 5.5h6a2.5 2.5 0 0 1 2.5 2.5v11A2 2 0 0 0 9.5 17H3z" />
      <path d="M21 5.5h-6A2.5 2.5 0 0 0 12.5 8v11a2 2 0 0 1 2-2H21z" />
    </svg>
  );
}

export function Calculator({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  );
}

export function ShieldAlert({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
      <path d="M12 9v3.5M12 16h.01" />
    </svg>
  );
}

export function ChartCandle({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="5" y="8" width="3.5" height="8" rx="1" />
      <path d="M6.75 4v4M6.75 16v4" />
      <rect x="15.5" y="6" width="3.5" height="7" rx="1" />
      <path d="M17.25 3v3M17.25 13v4" />
    </svg>
  );
}

export function Checkbox({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  );
}

export function Bulb({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M9.5 16a5.5 5.5 0 1 1 5 0v1.5h-5z" />
      <path d="M10 20.5h4" />
    </svg>
  );
}

export function FileText({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

export function AlertTriangle({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M10.3 4.3 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
      <path d="M12 9.5v4M12 17h.01" />
    </svg>
  );
}

export function Info({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function ArrowRight({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}
