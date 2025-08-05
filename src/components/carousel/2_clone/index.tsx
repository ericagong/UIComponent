import { useRef,useState } from 'react';

import cx from '../cx';
import data from '../data';

const SLIDE_WIDTH = 600;

const Carousel = ({ images }: { images: string[] }) => {
  const totalSlides = images.length;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

  const extendedSlides = [
    images[images.length - 1], // 맨 뒤 요소를 맨 앞에 클론
    ...images,
    images[0], // 맨 앞 요소를 맨 뒤에 클론
  ];

  const move = (direction: 'left' | 'right') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (direction === 'right' ? prev + 1 : prev - 1));
  };

  const jumpWithoutTransition = (targetIndex: number) => {
    const $track = trackRef.current!;
    $track.style.transition = 'none';
    setCurrentIndex(targetIndex);
    requestAnimationFrame(() => {
      $track.style.transition = 'transform 0.5s ease-in-out';
    });
  };

  const isAtFrontClone = currentIndex === 0;
  const isAtRearClone = currentIndex === totalSlides + 1;

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (isAtFrontClone) {
      // 맨 앞 clone → 마지막 실제 슬라이드로 점프
      jumpWithoutTransition(totalSlides);
    } else if (isAtRearClone) {
      // 맨 뒤 clone → 첫 번째 실제 슬라이드로 점프
      jumpWithoutTransition(1);
    }
  };

  return (
    <>
      <h3>#2. Extended 캐러셀(맨 첫, 끝 요소 clone)</h3>
      <div className={cx('carousel')}>
        <ul
          className={cx('track', 'cloneTrack')}
          ref={trackRef}
          style={{
            width: `${extendedSlides.length * SLIDE_WIDTH}px`,
            transform: `translateX(-${currentIndex * SLIDE_WIDTH}px)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((url, index) => (
            <li key={index} className={cx('slide')}>
              <img src={url} width={SLIDE_WIDTH} height='320' />
              <span className={cx('label')}>
                #{((index - 1 + totalSlides) % totalSlides) + 1}
              </span>
            </li>
          ))}
        </ul>
        <button
          className={cx('moveTrigger', 'moveLeft')}
          onClick={() => move('left')}
        />
        <button
          className={cx('moveTrigger', 'moveRight')}
          onClick={() => move('right')}
        />
      </div>
    </>
  );
};

const CarouselExample = () => <Carousel images={data} />;

export default CarouselExample;
