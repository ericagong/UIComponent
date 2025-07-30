import { RefObject, useRef } from 'react';
import cx from '../cx';
import useAutoPlacement from '@/components/hook/useAutoPlacement';

const menuPosition = {
  top: 39,
  bottom: 'calc(100% - 5px)',
  left: 8,
  right: 8,
};

// TODO Trigger 내부로 가져오기
// TODO children 받아 li 처리하기
const Popover = ({
  id,
  close,
  anchorRef,
}: {
  id: string;
  close: () => void;
  anchorRef: RefObject<HTMLElement>;
}) => {
  const floatingRef = useRef<HTMLUListElement>(null);
  const style = useAutoPlacement(anchorRef, floatingRef, menuPosition);

  return (
    <div className={cx('popover')} onClick={close}>
      <ul
        className={cx('panel')}
        ref={floatingRef}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <li className={cx('content')}>#{id}</li>
        <li className={cx('content')}>스레드의 댓글</li>
        <li className={cx('content')}>메시지 전달</li>
        <li className={cx('content')}>나중을 위해 저장</li>
        <li className={cx('content')}>읽지 않음으로 표시</li>
        <li className={cx('content')}>삭제</li>
      </ul>
    </div>
  );
};

export default Popover;
