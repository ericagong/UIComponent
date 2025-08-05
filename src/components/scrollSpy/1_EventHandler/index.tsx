import { forwardRef, Ref, useRef } from 'react';

import cx from '../cx';
import data from '../data';
import useScrollSpy from './useScrollSpy';

const ContentItem = forwardRef(
  (
    {
      id,
      index,
      title,
      description,
    }: {
      id: string;
      index: number;
      title: string;
      description: string;
    },
    ref: Ref<HTMLLIElement>,
  ) => {
    const lines = description.split('\r\n');
    const number = index + 1;

    return (
      <li id={id} data-index={index} ref={ref}>
        <h4>
          <strong>
            {number}. {title}
          </strong>
        </h4>
        <div>
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </li>
    );
  },
);

const ScrollSpy = () => {
  const contentItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const {
    navigationBarRef,
    navigationItemsRef,
    currentIndex,
    handleNavigationItemClick,
  } = useScrollSpy(contentItemsRef);

  return (
    <div className={cx('ScrollSpy')}>
      <header className={cx('floating-header')}>
        <h2 className={cx('title')}>Scroll Spy</h2>
        <h3 className={cx('sub-title')}>
          #1. Event Handler + Resize Observer 기반 구현
        </h3>
        <ul className={cx('navigation-bar')} ref={navigationBarRef}>
          {data.map(({ id, index }) => (
            <li
              key={id}
              className={cx('navigation-item', {
                current: currentIndex === index,
              })}
              ref={($el) => {
                if ($el) {
                  navigationItemsRef.current[index] = $el;
                }
              }}
            >
              <button onClick={() => handleNavigationItemClick(index)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </header>
      <ul className={cx('content-items')}>
        {data.map((item) => (
          <ContentItem
            key={item.id}
            ref={($el) => {
              if ($el) {
                contentItemsRef.current[item.index] = $el;
              }
            }}
            {...item}
          />
        ))}
      </ul>
    </div>
  );
};

export default ScrollSpy;
