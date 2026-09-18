import { useCallback, useEffect, useState } from 'react';

const KEY = 'cfd-course:completed';
const EVENT = 'cfd-course:progress-change';

function read(): Set<string> {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.filter((x): x is string => typeof x === 'string')) : new Set();
  } catch {
    return new Set();
  }
}

function write(value: Set<string>): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...value]));
  } catch {
    /* private mode, blocked storage: progress is a convenience, not a requirement */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(read);

  useEffect(() => {
    const sync = () => setCompleted(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const next = read();
    if (next.has(id)) next.delete(id);
    else next.add(id);
    write(next);
  }, []);

  const reset = useCallback(() => write(new Set()), []);

  return { completed, toggle, reset };
}
