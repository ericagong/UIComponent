import useModal from './useModal';
import { AlertModal, ConfirmModal, FormModal } from './ModalComponents';
import { ReactNode, useState } from 'react';
import ModalsRoot from '../ModalsRoot';
import Placeholders from '../Placeholders';

const AlertTrigger = ({ id, content }: { id: string; content: string }) => {
  const { modalRef, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>Alert Modal 열기</button>
      <AlertModal
        id={id}
        modalRef={modalRef}
        close={closeModal}
        content={content}
      />
    </>
  );
};

const ConfirmTrigger = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { modalRef, openModal, closeModal } = useModal();
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);

  const handleConfirm = () => {
    setIsConfirmed(true);
    closeModal();
  };

  const handleCancel = () => {
    setIsConfirmed(false);
    closeModal();
  };

  return (
    <>
      <button onClick={openModal}>
        Confirm Modal 열기: {isConfirmed ? '확인됨' : '확인 안됨'}
      </button>
      <ConfirmModal
        id={id}
        modalRef={modalRef}
        isConfirmed={isConfirmed}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        close={closeModal}
      >
        {children}
      </ConfirmModal>
    </>
  );
};

const FormTrigger = ({ id }: { id: string }) => {
  const { modalRef, openModal, closeModal } = useModal();

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', Array.from(data));
  };

  return (
    <>
      <button onClick={openModal}>Form Modal 열기</button>
      <FormModal
        id={id}
        onSubmit={handleSubmit}
        modalRef={modalRef}
        close={closeModal}
      >
        {/* Form fields go here */}
        <input type='text' name='product' placeholder='상품명' />
        <input type='number' name='price' placeholder='가격' />
        <label>
          품절
          <input type='checkbox' name='soldOut' />
        </label>
      </FormModal>
    </>
  );
};

const Modals = () => {
  return (
    <>
      <h3>#3. Dialog 태그 기반 구현</h3>
      <h4>alert 모달</h4>
      <AlertTrigger id='1' content='1번 alert message 입니다.' />
      <AlertTrigger id='2' content='2번 alert message 입니다.' />
      <AlertTrigger id='3' content='3번 alert message 입니다.' />
      <Placeholders />
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
      <ModalsRoot />
    </>
  );
};

export default Modals;
