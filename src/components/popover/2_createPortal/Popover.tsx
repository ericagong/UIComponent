import { RefObject, useEffect,useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import useAutoPlacement from '@/components/hook/useAutoPlacement';

import cx from '../cx';

const menuPosition = {
  top: -4,
  bottom: -4,
  left: 8,
  right: 8,
};

// TODO Trigger 내부로 가져오기
// TODO children 받아 li 처리하기
// TODO style 최초 {} 이슈 해결
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
  const style = useAutoPlacement(
    anchorRef,
    floatingRef,
    menuPosition,
    'absolute',
  );
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const $popoversRoot = document.getElementById('popovers-root');
    if ($popoversRoot) {
      setRoot($popoversRoot);
    }
  }, []);

  return (
    root &&
    createPortal(
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
      </div>,
      root,
    )
  );
};

export default Popover;
