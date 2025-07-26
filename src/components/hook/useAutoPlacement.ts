import { useViewportRectContext } from '@/context/ViewportRectContextProvider';
import { RefObject, useState, useLayoutEffect } from 'react';

type Direction = 'top' | 'right' | 'bottom' | 'left';
type PreferredPosition = Partial<Record<Direction, string | number>>;
type CSSPositionStyle = Partial<Record<Direction, number>>;

const useAutoPlacement = (
  anchorRef: RefObject<HTMLElement>, // 기준이 되는 요소
  floatingRef: RefObject<HTMLElement>, // 띄울 요소
  preferredPosition: PreferredPosition, // 기본적으로 원하는 위치값
): CSSPositionStyle => {
  const viewport = useViewportRectContext();

  const [style, setStyle] = useState<CSSPositionStyle>({});

  useLayoutEffect(() => {
    if (!anchorRef.current || !floatingRef.current) return;
    console.log(viewport);
    const anchor = anchorRef.current.getBoundingClientRect();
    const floating = floatingRef.current.getBoundingClientRect();

    // 수직 방향: 아래쪽으로 띄워도 충분한 공간이 있으면 아래쪽(top 기준)
    const hasVerticalSpace = anchor.bottom + floating.height < viewport.height;
    const verticalPlacement: Direction = hasVerticalSpace ? 'top' : 'bottom';

    // 수평 방향: 오른쪽으로 띄워도 충분한 공간이 있으면 오른쪽(left 기준)
    const hasHorizontalSpace = anchor.right + floating.width < viewport.width;
    const horizontalPlacement: Direction = hasHorizontalSpace
      ? 'left'
      : 'right';

    setStyle({
      [verticalPlacement]: preferredPosition[verticalPlacement] || 0,
      [verticalPlacement === 'top' ? 'bottom' : 'top']: 'auto',
      [horizontalPlacement]: preferredPosition[horizontalPlacement] || 0,
      [horizontalPlacement === 'left' ? 'right' : 'left']: 'auto',
    });
  }, [viewport, anchorRef, floatingRef, preferredPosition]);

  return style;
};

export default useAutoPlacement;
