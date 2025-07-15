import { LazyImage as LazyImageNative } from '../3_loadingAttribiute';
import { LazyImage as LazyImageIO } from '../2_IntersectionObserver';
import data from '../data';

const IOOptions: IntersectionObserverInit = {
  threshold: 0,
};

export const LazyImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  const supportLazyLoading =
    typeof window !== 'undefined' && 'loading' in HTMLImageElement.prototype;

  if (supportLazyLoading) {
    return <LazyImageNative src={src} width={width} height={height} />;
  } else {
    return <LazyImageIO src={src} width={width} height={height} />;
  }
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
