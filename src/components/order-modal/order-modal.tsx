import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '@components';
import { OrderInfo } from '@components';

type TOrderModalProps = {
  onClose: () => void;
};

export const OrderModal: FC<TOrderModalProps> = ({ onClose }) => {
  const { number } = useParams();

  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};
