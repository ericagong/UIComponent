import { LazyImage as LazyImageNative } from '../3_loadingAttribiute';
import { LazyImage as LazyImageIO } from '../2_intersectionObserver';
import cx from '../cx';
import data from '../data';
import { useEffect, useState } from 'react';
import { LazyImageProps } from '../types';

const IOOptions: IntersectionObserverInit = {
  threshold: 0,
};

export const LazyImage = (props: LazyImageProps) => {
  const [supportLazy, setSupportLazy] = useState<boolean | null>(null);

  useEffect(() => {
    const supported = 'loading' in HTMLImageElement.prototype;
    setSupportLazy(supported);
  }, []);

  if (supportLazy === null) {
    return <div className={cx('spinner')} />;
  }

  return supportLazy ? (
    <LazyImageNative {...props} />
  ) : (
    <LazyImageIO {...props} />
  );
};

const WIDTH = 600;
const HEIGHT = 320;

const LazyLoading = () => {
  return (
    <>
      <h2>지연 로딩</h2>
      <h3>#4. loading=lazy 속성 + Intersection Observer 폴리필 기반 구현</h3>
      {data.map((url, index) => (
        <LazyImage src={url} key={index} width={WIDTH} height={HEIGHT} />
      ))}
    </>
  );
};

export default LazyLoading;
