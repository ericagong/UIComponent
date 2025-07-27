import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import useLoadIntersected from './useLoadIntersected';
import useThrottle from '@/components/hook/useThrottle';
import useLoading from '@/components/hook/useLoading';
import data from '../data';
import cx from '../cx';
import { LazyImageProps } from '../types';

type LazyImageHandle = {
  handleLoad: () => void;
};

const LazyImage = forwardRef<LazyImageHandle, LazyImageProps>(
  ({ src, ...rest }, ref) => {
    const targetRef = useRef<HTMLImageElement>(null);
    const { loading, setLoaded } = useLoading(true);
    const handleLoad = useLoadIntersected(targetRef);

    useImperativeHandle(
      ref,
      () => ({
        handleLoad,
      }),
      [src],
    );

    return (
      <img
        ref={targetRef}
        className={cx({ loading: loading })}
        data-src={src}
        onLoad={setLoaded}
        {...rest}
      />
    );
  },
);

const WIDTH = 600;
const HEIGHT = 320;
const DELAY = 1000; // ms

const LazyLoading = () => {
  const targetRefs = useRef<(LazyImageHandle | null)[]>([]);

  const handleImages = () => {
    targetRefs.current.forEach((ref) => {
      ref?.handleLoad();
    });
  };

  const throttledHandleImages = useThrottle(handleImages, DELAY);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleImages);
    window.addEventListener('resize', throttledHandleImages);

    // 최초 렌더링 시 트리거
    throttledHandleImages();

    return () => {
      window.removeEventListener('scroll', throttledHandleImages);
      window.removeEventListener('resize', throttledHandleImages);
    };
  }, [throttledHandleImages]);

  return (
    <>
      <h2>지연 로딩</h2>
      <h3>#1. EventHandler(Scroll, Resize) + Throttle 기반 구현</h3>
      {data.map((src, index) => (
        <LazyImage
          key={index}
          ref={(el) => {
            targetRefs.current[index] = el;
          }}
          src={src}
          alt=''
          width={WIDTH}
          height={HEIGHT}
        />
      ))}
    </>
  );
};

export default LazyLoading;
