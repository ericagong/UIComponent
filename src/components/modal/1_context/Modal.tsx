import { ReactNode } from 'react';

import { useSetModals } from '@/context/ModalContextProvider';

import cx from '../cx';

const Modal = ({
  id,
  closeOnClickOutside = false,
  children,
}: {
  id: string;
  closeOnClickOutside?: boolean;
  children: ReactNode;
}) => {
  const { closeModal } = useSetModals();
  const close = () => closeModal(id);

  return (
    <div
      key={id}
      className={cx('modal')}
      onClick={closeOnClickOutside ? close : undefined}
    >
      <div className={cx('panel')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
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
