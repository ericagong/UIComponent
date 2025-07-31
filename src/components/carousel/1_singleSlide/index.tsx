import data from '../data';
import cx from '../cx';
import { useState, useRef, useCallback } from 'react';

type Direction = 'left' | 'right';
const slideLength = data.length;
const SLIDE_WIDTH = 600;

const getDirection = (
  current: number,
  next: number,
  total: number,
  manualDirection?: Direction,
): Direction => {
  if (manualDirection) return manualDirection;
  if (current === total - 1 && next === 0) return 'right';
  if (current === 0 && next === total - 1) return 'left';
  return next > current ? 'right' : 'left';
};

const Carousel = ({
  images,
  initialIndex = 0,
}: {
  images: string[];
  initialIndex?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const slidesRef = useRef<(HTMLLIElement | null)[]>([]);

  const replaceSlideTo = useCallback(
    (nextIndex: number, direction?: Direction) => {
      const $currentSlide = slidesRef.current[currentIndex] as HTMLLIElement;
      const $nextSlide = slidesRef.current[nextIndex] as HTMLLIElement;

      const moveTo = getDirection(
        currentIndex,
        nextIndex,
        slideLength,
        direction,
      );

      const handleAnimationEnd = () => {
        $currentSlide.className = cx('slide');
        $nextSlide.className = cx('slide', 'current');
        $currentSlide.removeEventListener('animationend', handleAnimationEnd);
        setCurrentIndex(nextIndex);
      };

      $currentSlide.addEventListener('animationend', handleAnimationEnd);
      $currentSlide.classList.add(cx(`${moveTo}_current`));
      $nextSlide.classList.add(cx(`${moveTo}_next`));
    },
    [currentIndex],
  );

  const move = useCallback(
    (direction: Direction) => {
      const moveBy = direction === 'right' ? 1 : -1;
      const nextIndex = (currentIndex + moveBy + slideLength) % slideLength;
      replaceSlideTo(nextIndex);
    },
    [images, currentIndex],
  );

  return (
    <>
      <h3>#1. 단일 Slide 기반 캐러셀(애니메이션으로 캐러셀처럼 처리)</h3>
      <div className={cx('carousel')}>
        <ul className={cx('track')}>
          {images.map((url, index) => (
            <li
              key={index}
              className={cx('singleSlide', {
                current: index === currentIndex,
              })}
              ref={(el) => (slidesRef.current[index] = el)}
            >
              <img
                className={cx('content')}
                src={url}
                width={SLIDE_WIDTH}
                height='320'
              />
              <span className={cx('label')}>#{index + 1}</span>
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

const CarouselExample = () => {
  return <Carousel images={data} initialIndex={0} />;
};

export default CarouselExample;
