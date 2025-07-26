import cx from '../cx';
import data from '../data';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import ViewportRectContextProvider from '@/context/ViewportRectContextProvider';
import SingleActiveItemProvider, {
  useSingleActiveItem,
} from '@/context/SingleActiveItemProvider';
import useAutoPlacement from '@/components/hook/useAutoPlacement';

const preferredTooltipPosition = {
  top: '100%',
  right: 0,
  bottom: 20,
  left: 0,
};

const ClickTooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const tooltipId = `tooltip-${id}`;
  const anchorRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  const [isActive, setActiveId] = useSingleActiveItem(id);
  const style = useAutoPlacement(
    anchorRef,
    floatingRef,
    preferredTooltipPosition,
  );

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const closeAllTooltips = () => setActiveId(null);
    if (isActive) {
      window.addEventListener('click', closeAllTooltips, { once: true });
    }
    return () => {
      window.removeEventListener('click', closeAllTooltips);
    };
  }, [isActive, setActiveId]);

  return (
    <div className={cx('provider')} ref={anchorRef}>
      <div>
        <span>{title}</span>
        <button
          className={cx('trigger')}
          onClick={handleClick}
          aria-controls={tooltipId}
          aria-expanded={isActive}
          aria-describedby={isActive ? tooltipId : undefined}
          tabIndex={0}
        ></button>
      </div>
      {isActive && (
        <div
          className={cx('content')}
          ref={floatingRef}
          style={style}
          onClick={(e) => e.stopPropagation()}
          id={tooltipId}
          role='tooltip'
        >
          {description}
        </div>
      )}
    </div>
  );
};

const Tooltips = () => {
  return (
    <SingleActiveItemProvider>
      <ViewportRectContextProvider>
        <>
          <h3>#1. Click 이벤트 기반 툴팁(state 기반 구현)</h3>
          {data.map((d) => (
            <ClickTooltip {...d} key={d.id} />
          ))}
        </>
      </ViewportRectContextProvider>
    </SingleActiveItemProvider>
  );
};

export default Tooltips;
