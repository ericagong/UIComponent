import {
  EventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
  Dispatch,
  useRef,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import Snackbar from './Snackbar';

type SnackbarStatus = 'open' | 'close' | null;
type SnackbarProps = {
  children: ReactNode;
  status: SnackbarStatus;
  setStatus: Dispatch<SetStateAction<SnackbarStatus>>;
  onMouseEnter?: EventHandler<any>;
  onMouseLeave?: EventHandler<any>;
};

const SNACKBAR_DURATION = 3000;
const useSnackbar = (children: ReactNode) => {
  const timeoutId = useRef<number | null>(null);
  const [status, setStatus] = useState<SnackbarStatus>(null);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  const startAutoCloseTimer = () =>
    window.setTimeout(() => {
      setStatus('close');
    }, SNACKBAR_DURATION);

  const openSnackbar = useCallback(() => {
    setStatus('open');
    timeoutId.current = startAutoCloseTimer();
  }, []);

  const removeTimer = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
  };

  const resetTimer = () => {
    timeoutId.current = startAutoCloseTimer();
  };

  useEffect(() => {
    const $snackbarsRoot = document.querySelector(
      '#snackbars-root',
    ) as HTMLDivElement | null;
    if ($snackbarsRoot) setRoot($snackbarsRoot);
  }, []);

  const $snackbarEl =
    root && status
      ? createPortal(
          <Snackbar
            status={status}
            setStatus={setStatus}
            onMouseEnter={removeTimer}
            onMouseLeave={resetTimer}
          >
            {children}
          </Snackbar>,
          root,
        )
      : null;

  return {
    $snackbarEl,
    openSnackbar,
  };
};

export default useSnackbar;
export type { SnackbarProps };
