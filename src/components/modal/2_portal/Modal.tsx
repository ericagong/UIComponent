import { ReactNode, useEffect,useState } from 'react';
import { createPortal } from 'react-dom';

import cx from '../cx';

const Modal = ({
  id,
  closeOnClickOutside = false,
  children,
  isOpen,
  close,
}: {
  id: string;
  closeOnClickOutside?: boolean;
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}) => {
  const [root, setRoot] = useState<Element | null>(null);

  useEffect(() => {
    const $modalsRoot = document.body.querySelector(
      '#modals-root',
    );
    if ($modalsRoot) setRoot($modalsRoot);
  }, []);

  return isOpen && root
    ? createPortal(
        <div
          key={id}
          className={cx('modal')}
          onClick={closeOnClickOutside ? close : undefined}
        >
          <div className={cx('panel')} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        root,
      )
    : null;
};

const ModalHeader = ({
  title,
  children,
  close,
}: {
  title?: string;
  children?: ReactNode;
  close?: () => void;
}) => {
  return (
    <div className={cx('modal-header')}>
      <div className={cx('title')}>{title}</div>
      {children}
      <button className={cx('close-trigger')} onClick={close} />
    </div>
  );
};

const ModalContent = ({ children }: { children: ReactNode }) => {
  return <div className={cx('modal-content')}>{children}</div>;
};

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className={cx('modal-footer')}>{children}</div>;
};

// Compound Component structure
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
