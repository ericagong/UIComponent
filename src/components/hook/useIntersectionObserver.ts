import { RefObject, useRef, useState, useEffect } from 'react';

type Target = Element | null;

const useIntersectionObserver = (
  targetRef: RefObject<Target>,
  options: IntersectionObserverInit = {
    threshold: 0,
  },
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const $target = targetRef.current;
    if (!$target) return;

    observerRef.current = new IntersectionObserver(setEntries, options);
    observerRef.current.observe($target);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [targetRef, options]);

  return {
    observerRef,
    entries,
  };
};

export default useIntersectionObserver;
