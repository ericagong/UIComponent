import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import useThrottle from '@/components/hook/useThrottle';
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
    const imgRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => setIsLoading(false);

    const handleLazyLoad = () => {
      const $img = imgRef.current;
      // 이미 로드된 target 미처리
      if (!$img || $img.getAttribute('src')) return;

      const rect = $img.getBoundingClientRect();
      // target 일부라도 viewport에 보이는 경우
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        $img.setAttribute('src', src);
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        handleLazyLoad,
      }),
      [src],
    );

    return (
      <img
        ref={imgRef}
        className={cx({ loading: isLoading })}
        data-src={src}
        width={width}
        height={height}
        alt=''
        onLoad={handleLoad}
      />
    );
  },
);

const WIDTH = 600;
const HEIGHT = 320;
const DELAY = 1000; // ms

const LazyLoading = () => {
  const imgRefs = useRef<(LazyImageHandle | null)[]>([]);

  const handleImages = () => {
    imgRefs.current.forEach((ref) => {
      ref?.handleLazyLoad();
    });
  };

  const throttledHandleImages = useThrottle(handleImages, DELAY);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleImages);
    window.addEventListener('resize', throttledHandleImages);

    // 최초 렌더링
    throttledHandleImages();

    return () => {
      window.removeEventListener('scroll', throttledHandleImages);
      window.removeEventListener('resize', throttledHandleImages);
    };
  }, [throttledHandleImages]);

  return (
    <>
      <h2>지연 로딩</h2>
      <h3>#1. Scroll Event + Throttle 기반 구현</h3>
      {data.map((src, index) => (
        <LazyImage
          key={index}
          ref={(el) => {
            imgRefs.current[index] = el;
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
