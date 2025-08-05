import type { RefObject } from 'react';
import { useEffect } from 'react';

import useIntersectionObserver from '@/components/hook/useIntersectionObserver';

const IOOptions: IntersectionObserverInit = { threshold: 0 };

const useLazyLoad = (
  imgRef: RefObject<HTMLImageElement>,
  src: string,
  rootElementRef?: RefObject<HTMLElement>,
) => {
  IOOptions.root = rootElementRef?.current ?? null;

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
  }, [src, visibleEntries, imgRef, observerRef]);
};

export default useLazyLoad;
