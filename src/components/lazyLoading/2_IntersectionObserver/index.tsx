import { useRef } from 'react';

import useLoading from '@/components/hook/useLoading';

import cx from '../cx';
import data from '../data';
import { LazyImageProps } from '../types';
import useLazyLoad from './useLazyLoad';

export const LazyImage = ({ src, ...rest }: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useLazyLoad(imgRef, src);
  const { loading, setLoaded } = useLoading(true);

  return (
    <img
      ref={imgRef}
      className={cx({ loading })}
      onLoad={setLoaded}
      {...rest}
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
        <LazyImage key={index} src={url} alt='' width={WIDTH} height={HEIGHT} />
      ))}
    </>
  );
};

export default LazyLoading;
