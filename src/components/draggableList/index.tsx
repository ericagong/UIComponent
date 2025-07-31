import { DragEvent, ForwardedRef, forwardRef, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

type DraggableItem = {
  id: string;
  number: number;
  text: string;
};

const DraggableItem = (
  {
    id,
    number,
    text,
    isDragging,
    handleMouseDown,
    handleDragStart,
  }: DraggableItem & {
    isDragging: boolean;
    handleMouseDown: () => void;
    handleDragStart: (e: DragEvent) => void;
  },
  ref: ForwardedRef<HTMLLIElement>,
) => {
  return (
    <li
      data-id={id}
      className={cx('draggableItem', { dragging: isDragging })}
      draggable={isDragging}
      onDragStart={handleDragStart}
      ref={ref}
    >
      <div className={cx('content')}>
        #{number} {text}
      </div>
      <i
        className={cx('dragTrigger')}
        onMouseDown={handleMouseDown}
        data-drag-trigger
      />
    </li>
  );
};

const ForwardedDraggableItem = forwardRef(DraggableItem);

const DraggableList = () => {
  const [list, setList] = useState<DraggableItem[]>(data);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const cachedListRef = useRef<DraggableItem[]>(data);

  const handleDragStart = (e: DragEvent) => {
    cachedListRef.current = list;
    e.dataTransfer.effectAllowed = 'move';
  };

  const isDragTrigger = ($element: HTMLElement) => {
    return !!$element.dataset.dragTrigger;
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();

    const $target = e.target as HTMLElement;
    if (!isDragTrigger($target)) return;

    const { clientY } = e;

    // 마우스 위치보다 아래 있는 리스트 항목 중 첫 번째 요소 찾기
    const $dropTargetElement = itemsRef.current!.find(
      (el) => el && el.offsetTop - el.offsetHeight / 2 >= clientY,
    );

    if ($dropTargetElement) {
      const draggedIndex = list.findIndex((item) => item.id === draggingId);
      const draggedItem = list[draggedIndex];

      const dropTargetIndex = list.findIndex(
        (item) => item.id === $dropTargetElement.dataset.id,
      );

      setList((prevList) => {
        const nextList = prevList.filter((item) => item !== draggedItem);
        nextList.splice(dropTargetIndex - 1, 0, draggedItem);
        return nextList;
      });
    }
  };

  const handleDragEnd = (e: DragEvent) => {
    if (e.dataTransfer.dropEffect === 'none') setList(cachedListRef.current);
    setDraggingId(null);
  };

  return (
    <ul
      className={cx('DraggableList')}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {list.map((item, i) => (
        <ForwardedDraggableItem
          {...item}
          key={item.id}
          isDragging={draggingId === item.id}
          handleMouseDown={() => setDraggingId(item.id)}
          handleDragStart={handleDragStart}
          ref={(r) => {
            itemsRef.current[i] = r;
          }}
        />
      ))}
    </ul>
  );
};

export default DraggableList;
