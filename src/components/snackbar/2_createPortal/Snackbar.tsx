import { useEffect,useRef, useState } from 'react';

import cx from '../cx';
import type { SnackbarProps } from './useSnackbar';

const Snackbar = ({
  status,
  setStatus,
  children,
  onMouseEnter,
  onMouseLeave,
}: SnackbarProps) => {
  const snackbarRef = useRef<HTMLDivElement>(null);
  // [enter] -> [show] -> [show, exit] -> remove action
  const [animationClass, setAnimationClass] = useState<string[]>([]);

  const remove = () => {
    if (snackbarRef.current?.className.includes('enter')) {
      setAnimationClass(['show']);
    } else {
      setStatus(null);
    }
  };

  useEffect(() => {
    setAnimationClass(status === 'open' ? ['enter'] : ['show', 'exit']);
  }, [status]);

  return (
    <div
      className={cx('snackbar', ...animationClass)}
      ref={snackbarRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onAnimationEnd={remove}
    >
      <button
        className={cx('close-trigger')}
        aria-label='닫기'
        onClick={remove}
      />
      {children}
    </div>
  );
};

export default Snackbar;
