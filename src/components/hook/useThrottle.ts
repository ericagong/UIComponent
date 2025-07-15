import { useRef, useEffect, useCallback } from 'react';

export default function useThrottle(fn: () => void, delay: number = 1000) {
  const fnRef = useRef(fn);
  const lastCallRef = useRef(0);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const throttledFn = useCallback(() => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      fnRef.current();
    }
  }, [delay]);

  return throttledFn;
}
