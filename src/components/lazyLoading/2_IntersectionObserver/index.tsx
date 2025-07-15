import useIntersectionObserver from '@/components/hook/useIntersectionObserver';
import { useRef, useState, useEffect } from 'react';
import cx from '../cx';
import data from '../data';

const IOOptions: IntersectionObserverInit = { threshold: 0 };

export const LazyImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { observerRef, entries } = useIntersectionObserver(imgRef, IOOptions);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => setIsLoading(false);

  useEffect(() => {
    const isVisible = entries[0]?.isIntersecting;
    // 보이는 순간 src 속성 설정
    if (isVisible) {
      imgRef.current!.setAttribute('src', src);
      console.log('here');
      observerRef.current?.disconnect();
    }
  }, [src, entries]);

  return (
    <img
      ref={imgRef}
      className={cx({ loading: isLoading })}
      alt=''
      width={width}
      height={height}
      onLoad={handleLoad}
    />
  );
};

const WIDTH = 600;
const HEIGHT = 320;

const LazyLoading = () => {
  return (
    <>
      <h2>지연 로딩</h2>
      <h3>#2. Intersection Observer 기반 구현</h3>
      {data.map((url, index) => (
        <LazyImage src={url} key={index} width={WIDTH} height={HEIGHT} />
      ))}
    </>
  );
};

export default LazyLoading;
