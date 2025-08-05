import { forwardRef, useRef,useState } from 'react';

import cx from '../cx';
import data from '../data';

const Tab = forwardRef<
  HTMLButtonElement,
  {
    title: string;
    current: boolean;
    handleClick: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  }
>(({ title, current, handleClick, handleKeyDown }, ref) => {
  return (
    <button
      ref={ref}
      className={cx('tabTrigger', { current })}
      role='tab'
      aria-selected={current}
      tabIndex={current ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type='button'
    >
      {title}
    </button>
  );
});

const TabPanel = ({
  id,
  content,
  current,
}: {
  id: string;
  content: string;
  current: boolean;
}) => {
  return (
    <div
      className={cx('tabPanel', { current })}
      id={`panel-${id}`}
      role='tabpanel'
      aria-hidden={!current}
    >
      {content}
    </div>
  );
};

const TabMenu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusNextTab = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

    const moveBy = e.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + moveBy + data.length) % data.length;

    setCurrentIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <>
      <h3>#1. button 기반 탭 + 접근성 최적화</h3>
      <div className={cx('container')}>
        <div role='tablist' className={cx('tabList')}>
          {data.map((d, idx) => (
            <Tab
              key={d.id}
              ref={(el) => (tabRefs.current[idx] = el)}
              title={d.title}
              current={currentIndex === idx}
              handleClick={() => setCurrentIndex(idx)}
              handleKeyDown={(e) => focusNextTab(e, idx)}
            />
          ))}
        </div>
        <TabPanel
          id={data[currentIndex].id}
          content={data[currentIndex].content}
          current
        />
      </div>
    </>
  );
};

export default TabMenu;
