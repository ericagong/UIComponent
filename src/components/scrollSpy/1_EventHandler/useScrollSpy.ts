import { useRef, useState, useEffect, useCallback } from 'react';

type ItemRecord = {
  index: number;
  top: number;
  height: number;
} | null;

const STICKY_HEADER_HEIGHT = 50; // px = .navigation-bar height
const DEFAULT_CURRENT_ITEM_INDEX = 0;

const useScrollSpy = (
  contentItemsRef: React.RefObject<(HTMLLIElement | null)[]>,
) => {
  const navigationBarRef = useRef<HTMLUListElement>(null);
  const navigationItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const itemsRecordRef = useRef<ItemRecord[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number | null>(
    DEFAULT_CURRENT_ITEM_INDEX,
  );

  const handleNavigationItemClick = useCallback((index: number) => {
    const itemRecord = itemsRecordRef.current[index];
    if (!itemRecord) return;

    const targetTop = itemRecord.top - STICKY_HEADER_HEIGHT;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (
      currentIndex === null ||
      !navigationBarRef.current ||
      !navigationItemsRef.current
    )
      return;

    const navigationBar = navigationBarRef.current;
    const targetItem = navigationItemsRef.current[currentIndex];

    const targetLeft = targetItem?.offsetLeft || 0;
    const barWidth = navigationBar.offsetWidth;
    const targetWidth = targetItem?.offsetWidth || 0;

    const scrollLeft = targetLeft - barWidth / 2 + targetWidth / 2;
    navigationBar.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  });

  const calculateItems = () => {
    const scrollTop = document.scrollingElement?.scrollTop || 0;
    contentItemsRef.current?.forEach(($item, index) => {
      if (!$item) return;
      const { top, height } = $item.getBoundingClientRect();

      itemsRecordRef.current[index] = {
        index,
        top: top + scrollTop,
        height: height,
      };
    });
    console.log('calculateItems', itemsRecordRef.current);
  };

  const handleScroll = () => {
    calculateItems();

    const viewportTop = document.scrollingElement?.scrollTop || 0;
    const adjustedViewportTop = viewportTop + STICKY_HEADER_HEIGHT;
    const targetItem = itemsRecordRef.current.find((itemRecord) => {
      return (
        itemRecord &&
        itemRecord.top <= adjustedViewportTop &&
        itemRecord.top + itemRecord.height > adjustedViewportTop
      );
    });
    if (targetItem) {
      setCurrentIndex(targetItem.index);
    }
  };

  useEffect(() => {
    calculateItems();

    window.addEventListener('scroll', handleScroll);
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(document.scrollingElement!);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return {
    navigationBarRef,
    navigationItemsRef,
    currentIndex,
    handleNavigationItemClick,
  };
};

export default useScrollSpy;
