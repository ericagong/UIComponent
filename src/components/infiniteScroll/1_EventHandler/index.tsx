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
  const { status, data } = useInfiniteScroll();

  return (
    <>
      <h2>무한 스크롤</h2>
      <h3>#1. EventHandler(Scroll, Resize) + Throttle 기반 구현</h3>
      <ul>
        {data.map((page, pageIdx) =>
          page.map((item: Datum, idx: number) => (
            <ListItem
              {...item}
              key={item.id}
              number={pageIdx * DATA_PER_PAGE + idx + 1}
            />
          )),
        )}
      </ul>
      {status === 'LOADING' && <div className={cx('spinner')} />}
    </>
  );
};

export default InfiniteScroll;
