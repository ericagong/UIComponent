import cx from './cx';
import TransitionImageSlide from './1_transition';
import ScrollSnapImageSlide from './2_scrollSnap';

// TODO headless로 리팩토링 시, Pagination 추가한 이미지 슬라이드 구현 추가
const ImageSlide = () => {
  return (
    <div className={cx('ImageSlides')}>
      <h2>이미지 슬라이드</h2>
      <TransitionImageSlide />
      <ScrollSnapImageSlide />
    </div>
  );
};

export default ImageSlide;
