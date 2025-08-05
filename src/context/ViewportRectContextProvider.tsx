import { createContext, useContext,useSyncExternalStore } from 'react';

type Rect = Pick<DOMRect, 'left' | 'top' | 'width' | 'height'> & {
  scrollHeight: number;
};

const DefaultRect: Rect = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};

const rectKeys: (keyof Rect)[] = [
  'left',
  'top',
  'width',
  'height',
  'scrollHeight',
];

const isEqualRect = (prev: Rect, next: Rect): boolean => {
  return rectKeys.every((key) => prev?.[key] === next?.[key]);
};

const createViewportRectGetter = () => {
  let rect: Rect = DefaultRect;

  return () => {
    const $scrollingElem =
      typeof document !== 'undefined' && document.scrollingElement;
    if (!$scrollingElem) return rect;

    const { left, top, width, height } = $scrollingElem.getBoundingClientRect();
    const newRect = {
      left,
      top,
      width,
      height,
      scrollHeight: $scrollingElem.scrollHeight,
    };

    if (newRect && !isEqualRect(rect, newRect)) {
      rect = newRect;
    }

    return rect;
  };
};

const subscribe = (cbFunc: () => void) => {
  const resizeObserver = new ResizeObserver(cbFunc);
  resizeObserver.observe(document.body);
  window.addEventListener('scroll', cbFunc);
  return () => {
    resizeObserver.disconnect();
    window.removeEventListener('scroll', cbFunc);
  };
};

const ViewportRectContext = createContext<Rect>(DefaultRect);
const ViewportRectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getViewportRectSnapshot = createViewportRectGetter();
  const viewportRect = useSyncExternalStore(subscribe, getViewportRectSnapshot);
  return (
    <ViewportRectContext.Provider value={viewportRect}>
      {children}
    </ViewportRectContext.Provider>
  );
};

const useViewportRectContext = () => useContext(ViewportRectContext);

export default ViewportRectContextProvider;

export { useViewportRectContext };
