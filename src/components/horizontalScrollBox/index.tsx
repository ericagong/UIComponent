import HorizontalScrollBox from './HorizontalScrollBox';
import data from './data';
import { LazyImage } from '../lazyLoading/4_polyfill';

const WIDTH = 200;
const HEIGHT = 400;
const Item = ({
  id,
  imgUrl,
  description,
}: {
  id: string;
  imgUrl: string;
  description: string;
}) => {
  return (
    <>
      <img src={imgUrl} width={WIDTH} height={HEIGHT} />
      <span>{description}</span>
    </>
  );
};

const ScrollBox = () => {
  return (
    <>
      <h2>Vertical Scroll Box</h2>
      <h3> #1. IO 기반 구현</h3>
      <HorizontalScrollBox list={data} Item={Item} />
    </>
  );
};

export default ScrollBox;
