import { useCallback, useState } from 'react';

const KEY = 'cfd-course:risk-acknowledged';

function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) === 'yes';
  } catch {
    return false;
  }
}

export function useRiskGate() {
  const [acknowledged, setAcknowledged] = useState<boolean>(read);

  const acknowledge = useCallback(() => {
    try {
      window.localStorage.setItem(KEY, 'yes');
    } catch {
      /* storage unavailable: the acknowledgement applies for this session only */
    }
    setAcknowledged(true);
  }, []);

  return { acknowledged, acknowledge };
}
