import { useRef } from 'react';
import useLoading from '@/components/hook/useLoading';
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
  const { loading, setLoaded } = useLoading(true);

  return (
    <img
      ref={imgRef}
      className={cx({ loading: loading })}
      alt=''
      width={width}
      height={height}
      src={src}
      loading='lazy'
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
      <h3>#3. loading = lazy 속성 기반 구현</h3>
      {data.map((url, index) => (
        <LazyImage src={url} key={index} width={WIDTH} height={HEIGHT} />
      ))}
    </>
  );
};

export default LazyLoading;
