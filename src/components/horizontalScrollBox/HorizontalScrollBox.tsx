import cx from './cx';
import { useRef, useState, useCallback, useEffect } from 'react';
import useIO from '@/components/hook/useIO';

type Direction = 'prev' | 'next';
type ItemElemType = HTMLLIElement | null;
const DefaultButtonState = { prev: true, next: true };

const getVisibleItemsOnEdge = (
  $list: HTMLUListElement,
  $items: ItemElemType[],
) => {
  const { left: listLeft, right: listRight } = $list.getBoundingClientRect();
  const isVisible = ($item: ItemElemType) => {
    const { left, right } = $item?.getBoundingClientRect() || {
      left: 0,
      right: 0,
    };
    // 애매하게 걸친 경우까지 인정하는 조건: left <= listRight && right >= listLeft
    return left <= listRight && right >= listLeft; // 애매하게 보이는 경우까지 모두 포함시킴.
  };
  const leftIndex = Math.max($items.findIndex(isVisible), 0);
  const rightIndex = Math.min(
    $items.findLastIndex(isVisible),
    $items.length - 1,
  );
  return {
    $leftItem: $items[leftIndex],
    $rightItem: $items[rightIndex],
  };
};

const HorizontalScrollBox = <T extends { id: string }>({
  list,
  Item,
}: {
  list: T[];
  Item: React.ComponentType<T>;
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<ItemElemType[]>([]);
  const targetsRef = useRef<ItemElemType[]>([]);
  const { visibleEntries } = useIO(targetsRef);
  const [buttonEnabled, setButtonEnabled] = useState(DefaultButtonState);

  const handleOnClick = useCallback((direction: Direction) => {
    if (!listRef.current || !itemsRef.current) return;
    const { $leftItem, $rightItem } = getVisibleItemsOnEdge(
      listRef.current,
      itemsRef.current,
    );
    const $targetItem = direction === 'prev' ? $leftItem : $rightItem;
    $targetItem?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: direction === 'prev' ? 'end' : 'start',
    });
  }, []);

  useEffect(() => {
    if (!visibleEntries.length) {
      setButtonEnabled(DefaultButtonState);
    }
    setButtonEnabled((prev) => {
      const newState = { ...prev };

      visibleEntries.forEach((e) => {
        const direction = (e.target as HTMLLIElement).dataset
          .direction as Direction;
        newState[direction] = false;
      });

      return newState;
    });
  }, [visibleEntries]);

  return (
    <div className={cx('scrollBox')}>
      <ul ref={listRef} className={cx('list')}>
        {/* observer가 아니라 sentinel로 이름 바꿔야할지도 */}
        <li
          className={cx('observer')}
          ref={(r) => (targetsRef.current[0] = r)}
          data-direction='prev'
        />
        {list.map((item, idx) => (
          <li
            key={item.id}
            className={cx('item')}
            ref={(r) => (itemsRef.current[idx] = r)}
          >
            <Item {...item} />
          </li>
        ))}
        <li
          className={cx('observer')}
          ref={(r) => (targetsRef.current[1] = r)}
          data-direction='next'
        />
      </ul>
      <button
        className={cx('nav-button', 'prev', { on: buttonEnabled.prev })}
        onClick={() => handleOnClick('prev')}
      />
      <button
        className={cx('nav-button', 'next', { on: buttonEnabled.next })}
        onClick={() => handleOnClick('next')}
      />
    </div>
  );
};

export default HorizontalScrollBox;
