import data from './data';
// import { LazyImage } from '../lazyLoading/4_polyfill';
import cx from './cx';
import { useRef } from 'react';
import useButtonEnabled from './hooks/useButtonEnabled';
import useScrollToEdge from './hooks/useScrollToEdge';

// TODO : LazyImage 컴포넌트로 변경
const WIDTH = 200;
const HEIGHT = 400;
const Item = ({
  id,
  imgUrl,
  description,
}: {
  id: string;
  imgUrl: string;
  description: string;
}) => {
  return (
    <>
      <img src={imgUrl} width={WIDTH} height={HEIGHT} />
      <span>{description}</span>
    </>
  );
};

const HorizontalScrollBox = <T extends { id: string }>({
  list,
  Item,
}: {
  list: T[];
  Item: React.ComponentType<T>;
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleOnClick = useScrollToEdge(listRef, itemsRef);
  const { prevEnabled, nextEnabled } = useButtonEnabled(targetsRef);

  return (
    <div className={cx('scrollBox')}>
      <ul ref={listRef} className={cx('list')}>
        <li
          ref={(r) => (targetsRef.current[0] = r)}
          className={cx('target')}
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
          ref={(r) => (targetsRef.current[1] = r)}
          className={cx('target')}
          data-direction='next'
        />
      </ul>
      <button
        className={cx('scroll-button', 'prev', { on: prevEnabled })}
        onClick={() => handleOnClick('prev')}
      />
      <button
        className={cx('scroll-button', 'next', { on: nextEnabled })}
        onClick={() => handleOnClick('next')}
      />
    </div>
  );
};

const ScrollBox = () => {
  return (
    <>
      <h2>Vertical Scroll Box</h2>
      <h3> #1. IO 기반 구현</h3>
      <HorizontalScrollBox list={data} Item={Item} />
    </>
  );
};

export default ScrollBox;
