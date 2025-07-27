import cx from '../cx';
import { Datum } from '../useMockFetchAPI';
import useInfiniteScroll from './useInfiniteScroll';

const ListItem = ({
  number,
  title,
  description,
}: Datum & { number: number }) => {
  return (
    <li>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>{description}</div>
    </li>
  );
};

const DATA_PER_PAGE = 10;
const InfiniteScroll = () => {
  const { moreRef, status, data } = useInfiniteScroll();

  return (
    <>
      <h2>무한 스크롤</h2>
      <h3>#2. IO 기반 구현</h3>
      <ul>
        {data.map((page, pageIdx) =>
          page.map((item: Datum, idx: number) => (
            <ListItem
              key={item.id}
              number={pageIdx * DATA_PER_PAGE + idx + 1}
              {...item}
            />
          )),
        )}
      </ul>
      <div className={cx('fetchMore')} ref={moreRef} />
      {status === 'LOADING' && <div className={cx('spinner')} />}
    </>
  );
};

export default InfiniteScroll;
