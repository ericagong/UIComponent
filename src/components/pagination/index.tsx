import cx from './cx';
import { useMemo } from 'react';
import { clamp } from '../utils';

const Pagination = ({
  totalPages,
  currentIndex,
  visibleCount,
  handleMove,
}: {
  totalPages: number;
  currentIndex: number;
  visibleCount?: number;
  handleMove: (index: number) => void;
}) => {
  const totalPageIndexes = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i),
    [totalPages],
  );

  const viewCount = Math.min(visibleCount || totalPages, totalPages);
  const halfCount = Math.floor(viewCount / 2);
  const visibleMin = clamp(currentIndex - halfCount, 0, totalPages - viewCount);
  // [visibleMin, visibleMin + viewCount) 범위의 페이지 인덱스
  const paginationIndexes = totalPageIndexes.slice(
    visibleMin,
    visibleMin + viewCount,
  );

  return (
    <div className={cx('Pagination')}>
      <ul className={cx('pages')}>
        {paginationIndexes.map((pageIndex) => (
          <li
            key={pageIndex}
            className={cx('pageMoveTrigger', {
              current: currentIndex === pageIndex,
            })}
          >
            <button onClick={() => handleMove(pageIndex)}>
              {pageIndex + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
