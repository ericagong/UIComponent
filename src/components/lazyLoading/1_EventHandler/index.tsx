import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import useLazyLoadHandler from './useLazyLoadHandler';
import useThrottle from '@/components/hook/useThrottle';
import useLoading from '@/components/hook/useLoading';
import data from '../data';
import cx from '../cx';

type LoadImageProps = {
  src: string;
  width: number;
  height: number;
};

type LazyImageHandle = {
  handleLazyLoad: () => void;
};

const LazyImage = forwardRef<LazyImageHandle, LoadImageProps>(
  ({ src, width, height }, ref) => {
    const targetRef = useRef<HTMLImageElement>(null);
    const { loading, setLoaded } = useLoading(true);
    const { handleLazyLoad } = useLazyLoadHandler(targetRef);

    useImperativeHandle(
      ref,
      () => ({
        handleLazyLoad,
      }),
      [src],
    );

    return (
      <img
        ref={targetRef}
        className={cx({ loading: loading })}
        data-src={src}
        width={width}
        height={height}
        alt=''
        onLoad={setLoaded}
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
      ref?.handleLazyLoad();
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
          width={WIDTH}
          height={HEIGHT}
        />
      ))}
    </>
  );
};

export default LazyLoading;
