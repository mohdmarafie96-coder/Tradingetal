import { useCallback, useEffect, useState } from 'react';

const KEY = 'cfd-course:theme';
export type Theme = 'light' | 'dark';

function read(): Theme {
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* storage unavailable: use the default */
  }
  // Dark is the brand, so it is the default rather than the system setting.
  // Light is the reading mode, one tap away, and a stored choice always wins.
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(KEY, next);
      } catch {
        /* storage unavailable: the choice still applies for this session */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
