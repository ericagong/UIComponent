import ModalContextProvider, {
  useSetModals,
} from '@/context/ModalContextProvider';
import { AlertModal, ConfirmModal, FormModal } from './ModalComponents';
import { ReactNode, useState } from 'react';
import Placeholders from '../Placeholders';

const AlertTrigger = ({ id, content }: { id: string; content: string }) => {
  const { openModal } = useSetModals();
  const openAlertModal = () => {
    openModal(id, <AlertModal id={id} content={content} />);
  };

  return <button onClick={openAlertModal}>Alert Modal 열기</button>;
};

const ConfirmTrigger = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { openModal, closeModal } = useSetModals();
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);
  const close = () => closeModal(id);

  const handleConfirm = () => {
    setIsConfirmed(true);
    close();
  };

  const handleCancel = () => {
    setIsConfirmed(false);
    close();
  };

  const openConfirmModal = () => {
    openModal(
      id,
      <ConfirmModal
        id={id}
        isConfirmed={isConfirmed}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        close={close}
      >
        {children}
      </ConfirmModal>,
    );
  };

  return (
    <button onClick={openConfirmModal}>
      Confirm Modal 열기: {isConfirmed ? '확인됨' : '확인 안됨'}
    </button>
  );
};

const FormTrigger = ({ id }: { id: string }) => {
  const { openModal } = useSetModals();

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', Array.from(data));
  };

  const openFormModal = () => {
    openModal(
      id,
      <FormModal id={id} onSubmit={handleSubmit}>
        {/* Form fields go here */}
        <input type='text' name='product' placeholder='상품명' />
        <input type='number' name='price' placeholder='가격' />
        <label>
          품절
          <input type='checkbox' name='soldOut' />
        </label>
      </FormModal>,
    );
  };

  return <button onClick={openFormModal}>Form Modal 열기</button>;
};

const Modals = () => {
  return (
    <ModalContextProvider>
      <h3>#1. Context API 기반 구현</h3>
      <Placeholders />
      <AlertTrigger id='1' content='1번 alert message 입니다.' />
      <AlertTrigger id='2' content='2번 alert message 입니다.' />
      <AlertTrigger id='3' content='3번 alert message 입니다.' />
      <h4>confirm 모달</h4>
      <h5>단일 모달</h5>
      <ConfirmTrigger id='4'>
        <p>정말 진행하시겠습니까?</p>
      </ConfirmTrigger>
      <Placeholders />
      <h5>중첩 모달</h5>
      <ConfirmTrigger id='5'>
        <>
          <p>정말 진행하시겠습니까?</p>
          <ConfirmTrigger id='6'>
            <>
              <p>정말 진행하시겠습니까?</p>
              <ConfirmTrigger id='7'>
                <p>정말 진행하시겠습니까?</p>
              </ConfirmTrigger>
            </>
          </ConfirmTrigger>
        </>
      </ConfirmTrigger>
      <Placeholders />
      <h4>form 모달</h4>
      <FormTrigger id='8' />
      <Placeholders />
    </ModalContextProvider>
  );
};

export default Modals;
