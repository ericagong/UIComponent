import { RefObject, useEffect, useLayoutEffect, useState } from 'react';

import { useViewportRectContext } from '@/context/ViewportRectContextProvider';

type Direction = 'top' | 'right' | 'bottom' | 'left';
type PreferredPosition = Partial<Record<Direction, string | number>>;
type PositionAttribute = 'absolute' | 'relative';
type CSSPositionStyle = Partial<Record<Direction, number>>;

const useAutoPlacement = (
  anchorRef: RefObject<HTMLElement>, // 기준이 되는 요소
  floatingRef: RefObject<HTMLElement>, // 띄울 요소
  preferredPosition: PreferredPosition, // 기본적으로 원하는 위치값
  positionAttribute: PositionAttribute = 'relative', // 위치 속성
): CSSPositionStyle => {
  const viewportRect = useViewportRectContext();

  const [style, setStyle] = useState<CSSPositionStyle>({});

  useLayoutEffect(() => {
    if (!anchorRef.current || !floatingRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const floatingRect = floatingRef.current.getBoundingClientRect();

    // 수직 방향: 아래쪽으로 띄워도 충분한 공간이 있으면 아래쪽(top 기준)
    const hasVerticalSpace =
      anchorRect.bottom + floatingRect.height < viewportRect.height;
    const verticalPlacement: Direction = hasVerticalSpace ? 'top' : 'bottom';

    // 수평 방향: 오른쪽으로 띄워도 충분한 공간이 있으면 오른쪽(left 기준)
    const hasHorizontalSpace =
      anchorRect.right + floatingRect.width < viewportRect.width;
    const horizontalPlacement: Direction = hasHorizontalSpace
      ? 'left'
      : 'right';

    if (positionAttribute === 'absolute') {
      const anchorAbsoluteTop = anchorRect.top - viewportRect.top;

      setStyle({
        [verticalPlacement]:
          verticalPlacement === 'top'
            ? anchorAbsoluteTop +
              anchorRect.height +
              +(preferredPosition.top ?? 0)
            : viewportRect.height -
              anchorAbsoluteTop +
              +(preferredPosition.bottom ?? 0),
        [verticalPlacement === 'top' ? 'bottom' : 'top']: 'auto',
        [horizontalPlacement]:
          horizontalPlacement === 'left'
            ? anchorRect.left - +(preferredPosition.left ?? 0)
            : viewportRect.width -
              anchorRect.right +
              +(preferredPosition.right ?? 0),
        [horizontalPlacement === 'left' ? 'right' : 'left']: 'auto',
      });
    } else {
      // positionAttribute = 'relative'
      setStyle({
        [verticalPlacement]: preferredPosition[verticalPlacement] ?? 0,
        [verticalPlacement === 'top' ? 'bottom' : 'top']: 'auto',
        [horizontalPlacement]: preferredPosition[horizontalPlacement] ?? 0,
        [horizontalPlacement === 'left' ? 'right' : 'left']: 'auto',
      });
    }
  }, [
    viewportRect,
    anchorRef,
    floatingRef,
    preferredPosition,
    positionAttribute,
  ]);

  useEffect(() => {
    console.warn('useAutoPlacement style:', style); // Debugging log
  }, [style]);

  return style;
};

export default useAutoPlacement;
