import data from '../data';
import cx from '../cx';
import { LazyImage } from '@/components/lazyLoading/4_polyfill';
import { useState, useRef, useCallback } from 'react';

type Direction = 'left' | 'right';
const slideLength = data.length;
const SLIDE_WIDTH = 600;

const ImageSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rootElementRef = useRef<HTMLDivElement>(null);
  const onTransitionRef = useRef(false);

  const move = useCallback((direction: Direction) => {
    if (onTransitionRef.current) return;

    onTransitionRef.current = true;
    setCurrentIndex((prevIndex) => {
      const moveBy = direction === 'right' ? 1 : -1;
      const nextIndex = (prevIndex + moveBy + slideLength) % slideLength;
      return nextIndex;
    });
  }, []);

  const endTransition = () => {
    onTransitionRef.current = false;
  };

  return (
    <>
      <h3>#1. transform 기반 이동 이미지 슬라이드</h3>
      <div className={cx('imageSlide')} ref={rootElementRef}>
        <ul
          className={cx('track', 'transformTrack')}
          style={{ transform: `translateX(-${currentIndex * SLIDE_WIDTH}px)` }}
          onTransitionEnd={endTransition}
        >
          {data.map((url, index) => (
            <li key={index} className={cx('slide')}>
              <LazyImage
                className={cx('content')}
                src={url}
                width={SLIDE_WIDTH}
                height={320}
                rootElementRef={rootElementRef}
              />
              <span className={cx('label')}>#{index + 1}</span>
            </li>
          ))}
        </ul>
        <button
          className={cx('moveTrigger', 'moveLeft')}
          onClick={() => move('left')}
          disabled={currentIndex === 0}
        />
        <button
          className={cx('moveTrigger', 'moveRight')}
          onClick={() => move('right')}
          disabled={currentIndex === slideLength - 1}
        />
      </div>
    </>
  );
};

export default ImageSlide;
