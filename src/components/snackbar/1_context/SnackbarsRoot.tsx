import {
  useSetSnackbar,
  useSnackbars,
} from '@/context/SnackbarsContextProvider';
import type { SnackbarProps } from '@/context/SnackbarsContextProvider';
import cx from '../cx';
import { useRef, useState, useEffect } from 'react';

const Snackbar = ({
  id,
  isOpen,
  children,
  onMouseEnter,
  onMouseLeave,
}: SnackbarProps) => {
  const { removeSnackbar } = useSetSnackbar();
  const snackbarRef = useRef<HTMLDivElement>(null);
  // [enter] -> [show] -> [show, exit] -> remove action
  const [animationClass, setAnimationClass] = useState<string[]>([]);

  const remove = () => {
    const $snackbar = snackbarRef.current;
    if ($snackbar?.className.includes('enter')) {
      setAnimationClass(['show']);
    } else {
      removeSnackbar(id);
    }
  };

  useEffect(() => {
    setAnimationClass(isOpen ? ['enter'] : ['show', 'exit']);
  }, [isOpen]);

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

const SnackbarsRoot = () => {
  const snackbars = useSnackbars();

  return (
    <div className={cx('snackbars-root')}>
      {snackbars.map((snackbar) => (
        <Snackbar key={snackbar.id} {...snackbar} />
      ))}
    </div>
  );
};

export default SnackbarsRoot;
