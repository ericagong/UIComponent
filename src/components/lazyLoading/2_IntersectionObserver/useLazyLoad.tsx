import type { RefObject } from 'react';
import { useEffect } from 'react';
import useIntersectionObserver from '@/components/hook/useIntersectionObserver';

const IOOptions: IntersectionObserverInit = { threshold: 0 };

const useLazyLoad = (imgRef: RefObject<HTMLImageElement>, src: string) => {
  const { observerRef, visibleEntries } = useIntersectionObserver(
    imgRef,
    IOOptions,
  );

  useEffect(() => {
    const entry = visibleEntries[0];
    if (entry?.isIntersecting) {
      const $img = imgRef.current;
      if ($img) {
        $img.setAttribute('src', src);
        observerRef.current?.disconnect();
      }
    }
  }, [src, visibleEntries]);
};

export default useLazyLoad;
