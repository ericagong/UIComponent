import { useRef } from 'react';
import useLoading from '@/components/hook/useLoading';
import useLazyLoad from './useLazyLoad';
import cx from '../cx';
import data from '../data';

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
  useLazyLoad(imgRef, src);
  const { loading, setLoaded } = useLoading(true);

  return (
    <img
      ref={imgRef}
      className={cx({ loading })}
      alt=''
      width={width}
      height={height}
      onLoad={setLoaded}
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
        <LazyImage key={index} src={url} width={WIDTH} height={HEIGHT} />
      ))}
    </>
  );
};

export default LazyLoading;
