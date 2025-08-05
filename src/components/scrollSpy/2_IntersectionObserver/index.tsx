import cx from '../cx';
import data from '../data';
import ContentItem from './ContentItem';
import useScrollSpy from './useScrollSpy';

const ScrollSpy = () => {
  const {
    navigationBarRef,
    navigationItemsRef,
    contentItemsRef,
    currentIndex,
    handleNavigationItemClick,
  } = useScrollSpy();

  return (
    <div className={cx('ScrollSpy')}>
      <header className={cx('floating-header')}>
        <h2 className={cx('title')}>Scroll Spy</h2>
        <h3 className={cx('sub-title')}>
          #2. IntersectionObserver + ScrollTo 기반 구현
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
