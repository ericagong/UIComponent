import { useCallback, useEffect, useRef } from 'react';

// useEvent hook은 React 18.3 이상 (React Canary / experimental build에서만 사용 가능)
// useStable 직접 구현: 최신 fn을 참조하면서도, 함수 참조는 변하지 않는 안전한 콜백 반환

const useStable = <T extends (...args: unknown[]) => unknown>(fn: T): T => {
  // 최신 함수 참조
  const fnRef = useRef<T>(fn);

  // 리렌더마다 최신 함수 갱신
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // 함수 참조가 변하지 않는 안정적인 콜백 반환
  const stableFn = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return fnRef.current(...args) as ReturnType<T>;
  }, []);

  return stableFn as T;
};

export default useStable;
