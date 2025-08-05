import { ReactNode, RefObject, SyntheticEvent, useCallback } from 'react';

import cx from '../cx';

const Modal = ({
  className,
  id,
  modalRef,
  closeOnClickOutside = false,
  children,
  close,
  onClose,
}: {
  className?: string;
  id: string;
  modalRef: RefObject<HTMLDialogElement>;
  closeOnClickOutside?: boolean;
  children: ReactNode;
  close: () => void;
  onClose?: (...args: any[]) => void;
}) => {
  const closeModal = useCallback(
    (e: SyntheticEvent) => {
      if (closeOnClickOutside && e.target === modalRef.current) {
        onClose?.();
        close();
      }
    },
    [closeOnClickOutside, modalRef, onClose, close],
  );

  return (
    <dialog
      className={cx('dialog', className)}
      key={id}
      ref={modalRef}
      onClick={closeModal}
    >
      {children}
    </dialog>
  );
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
