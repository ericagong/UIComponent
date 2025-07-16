import { useRef, useEffect, useCallback } from 'react';
import useStable from '@/components/hook/useStable';

export default function useThrottle(fn: () => void, delay: number = 1000) {
  const stableFn = useStable(fn);
  const lastCallRef = useRef(0);

  const throttledFn = useCallback(() => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      stableFn();
    }
  }, [delay]);

  return throttledFn;
}
