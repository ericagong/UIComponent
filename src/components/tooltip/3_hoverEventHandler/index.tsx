import { useRef } from 'react';

import useAutoPlacement from '@/components/hook/useAutoPlacement';
import useHover from '@/components/hook/useHover';
import ViewportRectContextProvider from '@/context/ViewportRectContextProvider';

import cx from '../cx';
import data from '../data';

const preferredTooltipPosition = {
  top: '100%',
  right: 0,
  bottom: 20,
  left: 0,
};

const TIME_DELAY = 150;
const HoverTooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const style = useAutoPlacement(
    anchorRef,
    floatingRef,
    preferredTooltipPosition,
  );

  const isHovered = useHover([triggerRef, floatingRef], TIME_DELAY);

  return (
    <div className={cx('provider')} ref={anchorRef}>
      <div>
        <span>{title}</span>
        <button
          className={cx('trigger')}
          ref={triggerRef}
          aria-describedby={`tooltip-${id}`}
        >
          <span className={cx('screen-reader-only')}>상세 설명</span>
        </button>
      </div>
      {isHovered && (
        <div
          className={cx('content')}
          ref={floatingRef}
          style={style}
          role='tooltip'
          id={`tooltip-${id}`}
        >
          {description}
        </div>
      )}
    </div>
  );
};

const Tooltips = () => {
  return (
    <ViewportRectContextProvider>
      <>
        <h3>#3. Hover 이벤트 기반 툴팁 (상태 기반 구현)</h3>
        {data.map((d) => (
          <HoverTooltip key={d.id} {...d} />
        ))}
      </>
    </ViewportRectContextProvider>
  );
};

export default Tooltips;
