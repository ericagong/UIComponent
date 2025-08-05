import { ReactNode, SyntheticEvent } from 'react';

import Modal from './Modal';

const AlertModal = ({
  id,
  isOpen,
  close,
  content,
}: {
  id: string;
  isOpen: boolean;
  close: () => void;
  content: string;
}) => {
  return (
    <Modal id={id} isOpen={isOpen} close={close}>
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Footer>
        <button onClick={close}>확인</button>
      </Modal.Footer>
    </Modal>
  );
};

const ConfirmModal = ({
  id,
  isOpen,
  children,
  isConfirmed,
  onConfirm,
  onCancel,
  close,
}: {
  id: string;
  isOpen: boolean;
  children: ReactNode;
  isConfirmed: boolean | null;
  onConfirm: () => void;
  onCancel: () => void;
  close: () => void;
}) => {
  return (
    <Modal id={id} isOpen={isOpen} close={close}>
      <Modal.Header
        title={`#${id}. ${isConfirmed ? '확인된 컨펌' : '확인되지 않은 컨펌'}`}
        close={close}
      />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </Modal.Footer>
    </Modal>
  );
};

const FormModal = ({
  id,
  isOpen,
  children,
  onSubmit,
  onCancel,
  close,
}: {
  id: string;
  isOpen: boolean;
  children: ReactNode;
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
  close: () => void;
}) => {
  const formId = `form-${id}`;

  const handleSumbit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    onSubmit?.(data);
    close();
  };

  const handleClose = () => {
    onCancel?.();
    close();
  };

  return (
    <Modal id={id} isOpen={isOpen} close={close} closeOnClickOutside>
      <Modal.Header close={handleClose} />
      <Modal.Content>
        <form id={formId} onSubmit={handleSumbit}>
          {children}
        </form>
      </Modal.Content>
      <Modal.Footer>
        <button type='submit' form={formId}>
          제출
        </button>
        <button type='button' onClick={handleClose}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export { AlertModal, ConfirmModal, FormModal };
