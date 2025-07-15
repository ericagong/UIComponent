import { RefObject, useRef, useState, useEffect } from 'react';

type Elem = Element | null;

const DefaultIOOptions: IntersectionObserverInit = {
  threshold: 0,
};
const useIO = (
  targetsRef: RefObject<Elem | Elem[]>,
  options: IntersectionObserverInit = DefaultIOOptions,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleEntries, setVisibleEntries] = useState<
    IntersectionObserverEntry[]
  >([]);

  useEffect(() => {
    if (!targetsRef.current) return;

    const handleIntersect = (newEntries: IntersectionObserverEntry[]) => {
      setVisibleEntries((prev) => {
        const duplicableEntries = [...prev, ...newEntries];

        const entryMap = new Map(duplicableEntries.map((e) => [e.target, e]));

        const uniqueEntries = Array.from(entryMap.values());

        const visibleEntries = uniqueEntries.filter((e) => e.isIntersecting);

        return visibleEntries;
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observerRef.current = observer;

    const targets = Array.isArray(targetsRef.current)
      ? targetsRef.current
      : [targetsRef.current]; // 단일 요소도 배열로 감싸서 일관되게 처리

    targets.forEach(($target) => {
      if ($target) {
        observer.observe($target);
      }
    });
  }, [targetsRef, options]);

  return {
    observerRef,
    visibleEntries,
  };
};

export default useIO;
