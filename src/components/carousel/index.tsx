import cx from './cx';
import SingleSlideCarousel from './1_singleSlide';
import CloneSlideCarousel from './2_clone';

const Carousels = () => {
  return (
    <div className={cx('Carousels')}>
      <h2>캐러셀</h2>
      <SingleSlideCarousel />
      <CloneSlideCarousel />
    </div>
  );
};

export default Carousels;
